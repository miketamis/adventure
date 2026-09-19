// Import the complete authored module before and after token factoring. Workers
// isolate content's conversation registries; no source module is overwritten.
// This supplements bundleaudit's emitted STORY/deferred-reading checks with
// exact public-export, descriptor, reference, Map and runtime-builder parity.
import assert from 'node:assert/strict'
import { createHash, randomUUID } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const SELF = fileURLToPath(import.meta.url)
const ROOT = fileURLToPath(new URL('../../', import.meta.url))
const CONTENT = resolve(ROOT, 'src/game/content.js')

// JSON.stringify alone loses Map entries, undefined, sparse indices and array
// metadata. Stream a typed object graph with own descriptors and alias edges.
function fingerprint(value) {
  const hash = createHash('sha256')
  const seen = new Map()
  const counts = { objects: 0, arrays: 0, maps: 0, sets: 0, functions: 0, extraArrayProperties: 0 }
  const put = (part) => hash.update(`${JSON.stringify(part)}\n`)
  const visit = (entry) => {
    if (entry === null) return put(['null'])
    const type = typeof entry
    if (!['object', 'function'].includes(type)) {
      if (type === 'symbol') throw new Error('Unreviewed symbol in public content')
      return put([type, type === 'number' && !Number.isFinite(entry) ? String(entry)
        : type === 'number' && Object.is(entry, -0) ? '-0'
          : type === 'bigint' ? String(entry) : entry])
    }
    if (seen.has(entry)) return put(['reference', seen.get(entry)])
    const id = seen.size
    seen.set(entry, id)
    counts.objects++
    const prototype = Object.getPrototypeOf(entry)
    const kind = type === 'function' ? 'function' : Array.isArray(entry) ? 'array'
      : entry instanceof Map ? 'map' : entry instanceof Set ? 'set'
        : prototype === null ? 'null-object' : prototype === Object.prototype ? 'object' : null
    assert.ok(kind, 'Unreviewed public-export object prototype')
    if (kind === 'function') counts.functions++
    if (kind === 'array') counts.arrays++
    put([kind, id, Object.isExtensible(entry), Object.isSealed(entry), Object.isFrozen(entry)])
    if (kind === 'map') {
      counts.maps++
      put(['entries', entry.size])
      for (const [key, child] of entry) { visit(key); visit(child) }
    }
    if (kind === 'set') {
      counts.sets++
      put(['entries', entry.size])
      for (const child of entry) visit(child)
    }
    const keys = Reflect.ownKeys(entry)
    put(['own-keys', keys])
    for (const key of keys) {
      assert.equal(typeof key, 'string', 'Unreviewed symbol-keyed public metadata')
      if (kind === 'array' && key !== 'length' && !/^(0|[1-9]\d*)$/.test(key)) counts.extraArrayProperties++
      const descriptor = Object.getOwnPropertyDescriptor(entry, key)
      put([key, descriptor.enumerable, descriptor.configurable, descriptor.writable])
      assert.ok('value' in descriptor, `Unreviewed accessor in public content: ${key}`)
      // Function source necessarily changes when an observation action's wf()
      // becomes a fresh-token factory. Its callable output is compared below.
      visit(descriptor.value)
    }
  }
  visit(value)
  return { sha256: hash.digest('hex'), ...counts }
}

function checkFingerprintSensitivity() {
  const digest = (value) => fingerprint(value).sha256
  assert.notEqual(digest(new Map([['form', 1]])), digest(new Map([['form', 2]])))
  assert.notEqual(digest(new Map([['a', 1], ['b', 2]])), digest(new Map([['b', 2], ['a', 1]])))
  assert.notEqual(digest([, 'word']), digest([undefined, 'word']))
  assert.notEqual(digest(Object.assign([], { reading: 'one' })), digest(Object.assign([], { reading: 'two' })))
  const enumerable = { reading: 'same' }
  const hidden = Object.defineProperty({}, 'reading', { value: 'same', writable: true, configurable: true })
  assert.notEqual(digest(enumerable), digest(hidden))
  assert.notEqual(digest({ a: undefined }), digest({}))
  assert.notEqual(digest(-0), digest(0))
  const shared = {}
  assert.notEqual(digest([shared, shared]), digest([{}, {}]))
  assert.notEqual(digest(Object.freeze([])), digest([]))
}

function runtimeResults(content) {
  const c = content
  const results = {}
  const exercised = new Set()
  const record = (name, run) => {
    assert.equal(typeof c[name], 'function', `Missing public builder: ${name}`)
    results[name] = run()
    exercised.add(name)
  }
  const capture = (run) => {
    try { return { value: run() } } catch (error) { return { error: [error.name, error.message] } }
  }
  const line = () => c.Q('parity-quote', c.w('ti'), c.w('je'), c.p('.'))
  const dictionaryIds = Object.keys(c.DICT)
  record('w', () => dictionaryIds.map((id) => c.w(id)))
  record('wf', () => ({
    forms: dictionaryIds.map((id) => [id, [c.DICT[id].al, ...(c.DICT[id].forms || []).map(({ al }) => al)]
      .map((al) => [capture(() => c.wf(id, al)), capture(() => c.wf(id, al, null))])]),
    errors: [() => c.wf('__parity_unknown__', 'word'), () => c.wf('grua', '__invalid_form__'),
      () => c.wf('ne', 'në', '__invalid_gloss__')].map(capture),
    defaults: [c.wf('lek', 'lekë'), c.wf('lek', 'lekë', null), c.wf('lek', 'lekë', 'lek')],
    fresh: (() => { const first = c.wf('lek', 'lekë'); const next = c.wf('lek', 'lekë'); first.al = 'changed'; return first !== next && next.al === 'lekë' })(),
  }))
  record('p', () => ['.', '?', '', '…'].map(c.p))
  record('Q', () => c.Q('parity-quote', c.w('ti'), c.p('.')))
  record('R', () => {
    const original = line(); const wrapped = c.R('You are.', original)
    return { direct: c.R('You.', c.w('ti'), c.p('.')), wrapped, sameLine: wrapped === original }
  })
  for (const name of ['when', 'unless']) record(name, () => ['flag:a', ['flag:a', 'flag:b'], []].map((condition) => c[name](condition, line())))
  record('whenUnless', () => c.whenUnless(['flag:a'], ['flag:b'], line()))
  for (const name of ['from', 'notFrom', 'became', 'notBecame', 'until']) record(name, () => ['start', ['start', 'lumi']].map((ids) => c[name](ids, line())))
  for (const name of ['first', 'again']) record(name, () => c[name](line()))
  record('lineOf', () => {
    const original = line()
    return [c.lineOf(original), c.lineOf(c.when('flag:a', original)), c.lineOf(original) === original,
      c.lineOf(c.when('flag:a', original)) === original]
  })
  record('ambient', () => [c.ambient(line(), 'parity-ambient'), c.ambient(c.when('flag:a', line()))])
  record('describesEnvironment', () => ['time', 'season', 'weather'].map((dimension) => c.describesEnvironment(dimension, line())))
  record('npcIdentityLine', () => [false, true].map((known) => c.npcIdentityLine('elira', known, line(), { required: ['flag:a'], excluded: ['flag:b'] })))
  record('npcIdentityOption', () => [false, true].map((known) => c.npcIdentityOption('elira', known,
    { text: line(), to: 'start', requires: ['flag:a'], unless: ['flag:b'] })))
  record('lekTokens', () => ({
    amounts: [100, 200, 300, 500, 600, 800, 1000, 1500, 2000, 5000, 100000].map((amount) => c.lekTokens(amount)),
    invalid: capture(() => c.lekTokens(37)),
  }))
  const options = Object.values(c.STORY).flatMap((node) => node.options)
  record('moneyOutcomeLinesOf', () => options.map(c.moneyOutcomeLinesOf))
  record('moneyOutcomeLineOf', () => options.map((option) => {
    const conditions = [null, ...(option.moneyOutcome?.variants || []).map(({ when }) => when)]
    return conditions.map((condition) => c.moneyOutcomeLineOf(option, (id) => condition === id))
  }))
  record('visibleLines', () => Object.values(c.STORY).map((node) => {
    const conditions = new Set(node.text.flatMap((entry) => Array.isArray(entry) ? [] : [...[].concat(entry.cond || []), ...[].concat(entry.none || [])]))
    return [c.visibleLines(node, () => false), c.visibleLines(node, () => true),
      ...[...conditions].map((condition) => c.visibleLines(node, (id) => id === condition))]
  }))
  const items = Object.keys(c.ITEMS).flatMap((id) => [id, c.ITEMS[id]])
  items.push(null, '__missing_item__')
  for (const name of ['itemKindOf', 'itemAffordancesOf', 'itemConfuserActionOf', 'itemUseEffectsOf']) record(name, () => items.map(c[name]))
  record('itemHasTag', () => items.map((item) => [...c.ITEM_TAGS, '__unknown_tag__'].map((tag) => c.itemHasTag(item, tag))))
  record('itemHasAffordance', () => {
    const affordances = new Set(items.flatMap(c.itemAffordancesOf))
    return items.map((item) => [...affordances, '__unknown_affordance__'].map((affordance) => c.itemHasAffordance(item, affordance)))
  })
  record('frequentForms', () => [...dictionaryIds, '__missing_sense__'].map((id) =>
    [{}, { min: 2 }, { cap: 1 }, { min: 1, cap: 4 }].map((options) => c.frequentForms(id, options))))
  const callbacks = []
  results.observationActions = c.STORY_OBSERVATION_BEATS.map((beat) => {
    assert.equal(typeof beat.action, 'function', `${beat.id}: missing observation action builder`)
    callbacks.push(beat.action)
    const first = beat.action(), second = beat.action()
    return { id: beat.id, first, second, freshLine: first !== second,
      freshTokens: first.every((token, index) => token !== second[index]) }
  })
  assert.deepEqual([...exercised].sort(), Object.keys(c).filter((key) => typeof c[key] === 'function').sort(),
    'An exported runtime builder lacks a parity exercise')
  return { results, exercised: [...exercised].sort(), callbackCount: callbacks.length }
}

async function snapshot(modulePath) {
  const content = await import(pathToFileURL(modulePath))
  const values = {}
  for (const [name, value] of Object.entries(content)) {
    if (typeof value !== 'function') values[name] = fingerprint(value)
  }
  // Retain one cross-export graph as well: a shared authored token or array
  // must not become copied/pooled at a different public boundary.
  const publicGraph = fingerprint(Object.fromEntries(Object.entries(content).filter(([, value]) => typeof value !== 'function')))
  const runtime = runtimeResults(content)
  const builders = Object.fromEntries(Object.entries(runtime.results).map(([name, value]) => [name, fingerprint(value)]))
  const { CONVERSATION_HUBS } = await import('../../src/game/conversationHub.js')
  return {
    exportNames: Object.keys(content), values, publicGraph, builders,
    conversationHubs: fingerprint(CONVERSATION_HUBS),
    exercised: runtime.exercised, observationCallbacks: runtime.callbackCount,
    counts: { scenes: Object.keys(content.STORY).length, senses: Object.keys(content.DICT).length,
      definitions: Object.keys(content.DEFS).length, items: Object.keys(content.ITEMS).length,
      observations: content.STORY_OBSERVATION_BEATS.length, formMaps: Object.keys(content.FORM_FREQ).length },
  }
}

function runWorker(modulePath) {
  const result = spawnSync(process.execPath, [SELF, '--snapshot', modulePath], {
    cwd: ROOT, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024, timeout: 60_000,
  })
  assert.ifError(result.error)
  assert.equal(result.signal, null, `Parity worker terminated by ${result.signal}: ${result.stderr}`)
  assert.equal(result.status, 0, `Parity worker failed (${result.status}): ${result.stderr}`)
  return JSON.parse(result.stdout)
}

async function main() {
  checkFingerprintSensitivity()
  const { parseAst } = await import('vite')
  const { factorStoryTokens } = await import('./factor-story-tokens.mjs')
  const source = readFileSync(CONTENT, 'utf8')
  const transformed = factorStoryTokens(source, parseAst(source))
  assert.ok(transformed.stats.factories > 0 && transformed.stats.replacedCalls > 0,
    'The whole-module parity test did not exercise any token factoring')
  assert.notEqual(transformed.code, source, 'The whole-module transform was an identity operation')
  const temporary = resolve(ROOT, `src/game/.story-token-parity-${randomUUID()}.mjs`)
  let original, factored
  try {
    writeFileSync(temporary, transformed.code, { flag: 'wx' })
    original = runWorker(CONTENT)
    factored = runWorker(temporary)
  } finally {
    rmSync(temporary, { force: true })
  }
  assert.deepEqual(factored.exportNames, original.exportNames, 'Token factoring changed the public export surface')
  for (const [name, value] of Object.entries(original.values)) {
    assert.deepEqual(factored.values[name], value, `${name}: token factoring changed public data/descriptors/reference topology`)
  }
  assert.deepEqual(factored.publicGraph, original.publicGraph, 'Token factoring changed aliases between public exports')
  for (const [name, value] of Object.entries(original.builders)) {
    assert.deepEqual(factored.builders[name], value, `${name}: token factoring changed runtime builder output`)
  }
  assert.deepEqual(factored.conversationHubs, original.conversationHubs, 'Token factoring changed installed conversation metadata')
  assert.deepEqual(factored.counts, original.counts)
  assert.equal(original.values.FORM_FREQ.maps, original.counts.formMaps, 'Every form-frequency Map must be inspected')
  assert.ok(original.values.STORY.extraArrayProperties > 0, 'STORY array metadata coverage is empty')
  assert.ok(original.values.DEFS.arrays > 0 && original.values.HEART_LEVELS.arrays > 0, 'Non-STORY token coverage is empty')
  assert.equal(original.observationCallbacks, original.counts.observations, 'Every observation action must be executed')
  console.log(`Story-token export parity passed: ${original.counts.scenes} scenes, ${original.counts.senses} senses, ${original.counts.formMaps} Maps, ${Object.keys(original.values).length} data exports, ${original.exercised.length} public builders, ${original.observationCallbacks} observation builders.`)
}

if (process.argv[2] === '--snapshot') {
  assert.ok(process.argv[3], 'Snapshot requires an explicit module path')
  process.stdout.write(JSON.stringify(await snapshot(process.argv[3])))
} else {
  await main()
}
