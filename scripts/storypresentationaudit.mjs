// Learning-surface prose gate: every scene is one continuous browser-scroll
// surface. Core lines are never split or discarded; optional atmosphere can
// fill a compact scene without extending an already crowded one. This also
// pins the opening's first visual beat so it cannot regress into three
// disconnected database-like facts.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import {
  STORY,
  lineOf,
} from '../src/game/content.js'
import { albanianTextOf, englishReadingOf } from '../src/game/language.js'
import {
  SCENE_SCROLL_POLICY,
  planScenePresentation,
  sceneFitsAmbientBudget,
} from '../src/game/scenePresentation.js'
import { PLACE_OF } from '../src/components/nodePositions.js'

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push({ name, ok: true })
    console.log(`✓ ${name}`)
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
    console.log(`✗ ${name}: ${error.message}`)
  }
}

const fakeLine = (size, extra = {}) => Object.assign(
  Array.from({ length: size }, (_, index) => ({ id: `word-${index}`, al: 'fjalë', en: 'word' })),
  extra,
)
const entriesOf = (lines) => lines.map((line, index) => ({ key: String(index), line }))

check('the optional-atmosphere budget is explicit and compact', () => {
  assert.deepEqual(SCENE_SCROLL_POLICY, {
    maxLines: 8,
    maxLexicalTokens: 72,
    maxAmbientLines: 2,
  })
})

check('long core prose stays on one complete scroll surface', () => {
  const entries = entriesOf(Array.from({ length: 20 }, () => fakeLine(6)))
  const plan = planScenePresentation(entries)
  assert.deepEqual(plan.entries, entries)
  assert.deepEqual(plan.normalEntries, entries)
  assert.equal('pages' in plan, false)
})

check('optional atmosphere does not extend an already crowded scroll', () => {
  const core = Array.from({ length: 8 }, () => fakeLine(6))
  const atmosphere = [fakeLine(4, { scenePriority: 'ambient' }), fakeLine(4, { scenePriority: 'ambient' })]
  const plan = planScenePresentation(entriesOf([...core, ...atmosphere]))
  assert.equal(plan.entries.length, core.length)
  assert.ok(sceneFitsAmbientBudget(plan.entries))
  assert.equal(plan.omittedAmbient.length, atmosphere.length)
})

check('a reveal-bearing ambient line is never discarded', () => {
  const ambientReveal = fakeLine(5, { scenePriority: 'ambient' })
  const plan = planScenePresentation(entriesOf([
    ...Array.from({ length: 9 }, () => fakeLine(6)),
    ambientReveal,
  ]), { pinnedLines: [ambientReveal] })
  assert.ok(plan.entries.some((entry) => entry.line === ambientReveal))
  assert.ok(!plan.omittedAmbient.some((entry) => entry.line === ambientReveal))
})

check('Debug retains optional prose while reporting the normal scroll projection', () => {
  const entries = entriesOf([
    ...Array.from({ length: 8 }, () => fakeLine(6)),
    fakeLine(4, { scenePriority: 'ambient' }),
  ])
  const plan = planScenePresentation(entries, { debug: true })
  assert.deepEqual(plan.entries, entries)
  assert.equal(plan.normalEntries.length, entries.length - 1)
})

check('every authored scene keeps all core prose on one surface', () => {
  const oversized = []
  for (const [nodeId, node] of Object.entries(STORY)) {
    const entries = entriesOf(node.text.map(lineOf))
    const plan = planScenePresentation(entries)
    if (plan.oversized.length) oversized.push(nodeId)
    const core = entries.filter((entry) => entry.line.scenePriority !== 'ambient')
    assert.ok(core.every((entry) => plan.entries.includes(entry)), `${nodeId}: core prose disappeared`)
    const ambientKeys = node.text.map(lineOf).filter((line) => line.scenePriority === 'ambient').map((line) => line.ambientKey)
    assert.equal(new Set(ambientKeys).size, ambientKeys.length, `${nodeId}: duplicate ambient key`)
    assert.ok(ambientKeys.every(Boolean), `${nodeId}: optional atmosphere needs a stable ambient key`)
  }
  assert.deepEqual(oversized, [], `single lines exceed the token budget: ${oversized.join(', ')}`)
})

check('StoryView has no scene pagination controls or page gate', () => {
  const source = fs.readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.match(source, /scenePresentation\.entries/)
  assert.doesNotMatch(source, /scenePage|scene-pages|aria-label="Story pages"|Scene \{presented/)
})

check('the opening bridge, river and destination read as one visual beat', () => {
  const lines = STORY.start.text.map(lineOf)
  const combined = lines.filter((line) => {
    const ids = new Set(line.filter((token) => token.id).map((token) => token.id))
    return ids.has('ure') && ids.has('lume') && ids.has('fshat')
  })
  assert.equal(combined.length, 1)
  assert.equal(
    englishReadingOf(combined[0]),
    'Ahead of you, a bridge crosses the river and leads to the village.',
  )
  const obsolete = new Set([
    'ti je para një urë.',
    'një lumë është poshtë.',
    'ura shkon në një fshat.',
  ])
  assert.ok(lines.every((line) => !obsolete.has(albanianTextOf(line))))
})

check('non-contributing hunger status is absent from the opening and clearing', () => {
  for (const nodeId of ['start', 'lendina']) {
    const prose = STORY[nodeId].text.map(lineOf).map(albanianTextOf)
    assert.ok(!prose.includes('ti je i uritur.'), `${nodeId}: stale hunger line`)
  }
})

check('the birthday dialogue is a coherent same-place interaction, not hub transcript', () => {
  assert.equal(PLACE_OF.fshatiDitelindje, PLACE_OF.fshatiSheshi)
  assert.equal(PLACE_OF.fshatiDitelindjeUrim, PLACE_OF.fshatiSheshi)
  assert.ok(STORY.fshatiSheshi.options.some((option) => option.to === 'fshatiDitelindje'))
  assert.ok(STORY.fshatiDitelindje.options.some((option) => option.to === 'fshatiDitelindjeUrim'))
  assert.ok(STORY.fshatiDitelindjeUrim.options.some((option) => option.to === 'fshatiSheshi'))
})

const failed = checks.filter((entry) => !entry.ok)
if (failed.length) {
  console.error(`\n${failed.length}/${checks.length} story-presentation checks failed.`)
  process.exit(1)
}
console.log(`\n${checks.length}/${checks.length} story-presentation checks pass.`)
