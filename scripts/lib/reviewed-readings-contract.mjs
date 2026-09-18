import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { runInNewContext } from 'node:vm'
import { reviewedReadingPartitionSource } from './reviewed-readings-format.mjs'
import { expandReviewedReadingNodes } from '../../src/game/data/readings/expandReviewedReadingNodes.js'

const reviewsOf = (pairs) => Object.fromEntries(Object.entries(pairs).map(([address, [al, en]]) => [address, { al, en }]))
const evaluated = (source, name) => runInNewContext(source
  .replace(/^import .*\n/m, '').replace(`export const ${name}`, `const ${name}`) + `\n${name}`,
{ expandReviewedReadingNodes })
const entriesByNode = (pairs) => {
  const nodes = new Map()
  for (const entry of Object.entries(pairs)) {
    const node = entry[0].split('.text[')[0]
    if (!nodes.has(node)) nodes.set(node, [])
    nodes.get(node).push(entry)
  }
  return [...nodes]
}

// Exercise the actual sync program, not a second reconciliation algorithm.
// Duplicate Albanian lines have moved; nodes are interleaved; a node spans
// partitions; new authored lines need the existing node-owner/fallback policy.
function assertReconciliationOrder() {
  const scriptUrl = new URL('../reviewedreadingsync.mjs', import.meta.url)
  const program = readFileSync(scriptUrl, 'utf8').replace(/^import .*\n/gm, '')
    .replaceAll('import.meta.url', JSON.stringify(scriptUrl.href))
  const line = (al, reading) => Object.assign([{ al }], reading ? { reading } : {})
  const story = {
    alpha: { text: [line('new', 'New.'), line('same'), line('same'), line('last'), line('added', 'Added.')] },
    beta: { text: [line('beta')] },
    gamma: { text: [line('gamma', 'Gamma.')] },
  }
  const initial = {
    EARLY_READINGS: {
      'alpha.text[0]': ['same', 'First same.'],
      'beta.text[0]': ['beta', 'Beta.'],
      'alpha.text[1]': ['same', 'Second same.'],
    },
    MIDDLE_READINGS: { 'alpha.text[3]': ['last', 'Last.'] },
    LATE_READINGS: {}, FINAL_READINGS: {},
  }
  const grouped = Object.fromEntries(Object.entries(initial).map(([name, pairs]) =>
    [name, evaluated(reviewedReadingPartitionSource(name, Object.entries(reviewsOf(pairs))), name)]))
  const reconcile = (tranches) => {
    const writes = new Map()
    runInNewContext(program, {
      ...tranches, STORY: story, lineOf: (entry) => entry, albanianTextOf: (tokens) => tokens[0].al,
      reviewedReadingPartitionSource, URL, fileURLToPath,
      writeFileSync: (path, source) => writes.set(path, source),
      console: { log() {}, error(message) { throw new Error(message) } },
      process: { argv: ['node', 'sync', '--write'], exit(code) { throw new Error(`sync exited ${code}`) } },
    })
    return [...writes]
  }
  assert.deepEqual(reconcile(grouped), reconcile(initial),
    'node grouping changed real sync duplicate-source movement, tie order, or partition ownership')
}

export function assertReviewedReadingStorage(tranches, story, language) {
  assertReconciliationOrder()
  const before = {}, after = {}
  const seenArrays = new Set()
  for (const [name, pairs] of tranches) {
    const entries = Object.entries(reviewsOf(pairs))
    const source = reviewedReadingPartitionSource(name, entries)
    const rebuilt = evaluated(source, name)
    assert.deepEqual(rebuilt, pairs, `${name}: grouped storage changed an addressed pair`)
    assert.deepEqual(entriesByNode(rebuilt), entriesByNode(pairs), `${name}: source reconciliation order changed within a node`)
    assert.equal(reviewedReadingPartitionSource(name, Object.entries(reviewsOf(rebuilt))), source,
      `${name}: generator is not idempotent`)
    for (const [address, pair] of Object.entries(rebuilt)) {
      assert.deepEqual(Object.getOwnPropertyDescriptors(pair), Object.getOwnPropertyDescriptors(pairs[address]),
        `${address}: own array metadata changed`)
      assert.ok(!seenArrays.has(pair), `${address}: pair array is shared with another address`)
      seenArrays.add(pair)
      assert.ok(!Object.hasOwn(before, address), `${address}: duplicate across partitions`)
      before[address] = { al: pairs[address][0], en: pairs[address][1] }
      after[address] = { al: pair[0], en: pair[1] }
    }
  }
  assert.deepEqual(after, before, 'complete addressed corpus changed')
  // The parser retains STORY order and all own array properties. Removing only
  // readings exercises the same attachment boundary as the production build.
  const first = structuredClone(story), second = structuredClone(story)
  for (const graph of [first, second]) for (const node of Object.values(graph)) for (const entry of node.text) {
    const line = Array.isArray(entry) ? entry : entry.line
    delete line.reading
    delete line.readingReview
  }
  const attached = language.attachReviewedEnglishReadings(first, before)
  assert.ok(attached > 0, 'full hydration fixture contains no deferred readings')
  assert.equal(language.attachReviewedEnglishReadings(second, after), attached)
  assert.deepEqual(second, first, 'grouped order changed hydrated STORY or its deterministic sentence order')
  assert.equal(language.attachReviewedEnglishReadings(second, after), 0, 'hydration is not idempotent')

  const pair = ['po.', 'Yes.']
  const holes = expandReviewedReadingNodes([['start', [[0, pair], [3, pair]]]])
  assert.deepEqual(Object.keys(holes), ['start.text[0]', 'start.text[3]'], 'legitimate text-index gaps were renumbered')
  assert.notEqual(holes['start.text[0]'], holes['start.text[3]'], 'reused input pairs must produce independent arrays')
  holes['start.text[0]'][0] = 'changed'
  assert.equal(holes['start.text[3]'][0], 'po.', 'mutating one address changed another')
  assert.equal(pair[0], 'po.', 'expansion mutated its input pair')
  for (const malformed of [
    {}, new Array(1), [['start', []]], [['start', [[0, pair]]], ['start', [[1, pair]]]],
    [['start', [[0, pair], [0, pair]]]], [['start', new Array(1)]],
    [['start', [[-1, pair]]]], [['start', [[1.5, pair]]]], [['start', [['0', pair]]]],
    [['start', [[0, ['po.', ,]]]]], [['start', [[0, ['po.', 'Yes.', 'extra']]]]],
    [['start', [[0, ['', 'Yes.']]]]], [['start', [[0, pair, 'extra']]]],
    [['start.text[0]', [[0, pair]]]], [['start', [[0, pair]], 'extra']],
    Object.assign([['start', [[0, pair]]]], { extra: true }),
  ]) assert.throws(() => expandReviewedReadingNodes(malformed), /reviewed-reading|Reviewed-reading/)
  for (const entries of [
    [['start.text[0]', { al: 'po.', en: 'Yes.' }], ['start.text[0]', { al: 'po.', en: 'Yes.' }]],
    [['start.text[01]', { al: 'po.', en: 'Yes.' }]], [['start.text[-1]', { al: 'po.', en: 'Yes.' }]],
  ]) assert.throws(() => reviewedReadingPartitionSource('READINGS', entries), /Invalid or duplicate/)
  const tinyStory = { start: { text: [[{ al: 'po' }, { en: '.', paren: true }]] } }
  for (const address of ['unknown.text[0]', 'start.text[999999]']) {
    assert.throws(() => language.attachReviewedEnglishReadings(tinyStory, { [address]: { al: 'po.', en: 'Yes.' } }),
      /points to no story line/)
  }
  return { corpus: after, count: seenArrays.size }
}
