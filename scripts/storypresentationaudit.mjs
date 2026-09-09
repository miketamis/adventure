// Learning-surface prose gate: a scene may contain a long tale, but one card
// must stay readable. Core lines paginate; optional atmosphere can fill spare
// room without creating another page. This also pins the opening's first visual
// beat so it cannot regress into three disconnected database-like facts.

import assert from 'node:assert/strict'
import {
  STORY,
  lineOf,
} from '../src/game/content.js'
import { albanianTextOf, englishReadingOf } from '../src/game/language.js'
import {
  SCENE_PAGE_POLICY,
  planScenePresentation,
  scenePageAllowsActions,
  scenePageWithinBudget,
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

check('the player-facing page budget is explicit and compact', () => {
  assert.deepEqual(SCENE_PAGE_POLICY, {
    maxLines: 8,
    maxLexicalTokens: 72,
    maxAmbientLines: 2,
  })
})

check('long core prose is paged without losing a line', () => {
  const entries = entriesOf(Array.from({ length: 20 }, () => fakeLine(6)))
  const plan = planScenePresentation(entries)
  assert.ok(plan.pages.length > 1)
  assert.equal(plan.pages.flat().length, entries.length)
  assert.ok(plan.pages.every((page) => scenePageWithinBudget(page)))
})

check('optional atmosphere never creates another page', () => {
  const core = Array.from({ length: 8 }, () => fakeLine(6))
  const atmosphere = [fakeLine(4, { scenePriority: 'ambient' }), fakeLine(4, { scenePriority: 'ambient' })]
  const plan = planScenePresentation(entriesOf([...core, ...atmosphere]))
  assert.equal(plan.pages.length, 1)
  assert.equal(plan.pages[0].length, core.length)
  assert.equal(plan.omittedAmbient.length, atmosphere.length)
})

check('a reveal-bearing ambient line is never discarded', () => {
  const ambientReveal = fakeLine(5, { scenePriority: 'ambient' })
  const plan = planScenePresentation(entriesOf([
    ...Array.from({ length: 9 }, () => fakeLine(6)),
    ambientReveal,
  ]), { pinnedLines: [ambientReveal] })
  assert.ok(plan.pages.flat().some((entry) => entry.line === ambientReveal))
  assert.ok(!plan.omittedAmbient.some((entry) => entry.line === ambientReveal))
})

check('Debug retains the complete prose while reporting the normal projection', () => {
  const entries = entriesOf(Array.from({ length: 14 }, () => fakeLine(6)))
  const plan = planScenePresentation(entries, { debug: true })
  assert.equal(plan.pages.length, 1)
  assert.equal(plan.pages[0].length, entries.length)
  assert.ok(plan.normalPages.length > 1)
})

check('actions wait for the final story page while Debug keeps direct access', () => {
  assert.equal(scenePageAllowsActions({ pageIndex: 0, pageCount: 2 }), false)
  assert.equal(scenePageAllowsActions({ pageIndex: 1, pageCount: 2 }), true)
  assert.equal(scenePageAllowsActions({ pageIndex: 0, pageCount: 1 }), true)
  assert.equal(scenePageAllowsActions({ debug: true, pageIndex: 0, pageCount: 3 }), true)
})

check('every authored scene can be presented inside the shared page budget', () => {
  const oversized = []
  const brokenPages = []
  for (const [nodeId, node] of Object.entries(STORY)) {
    const entries = entriesOf(node.text.map(lineOf))
    const plan = planScenePresentation(entries)
    if (plan.oversized.length) oversized.push(nodeId)
    if (plan.pages.some((page) => !scenePageWithinBudget(page))) brokenPages.push(nodeId)
    const ambientKeys = node.text.map(lineOf).filter((line) => line.scenePriority === 'ambient').map((line) => line.ambientKey)
    assert.equal(new Set(ambientKeys).size, ambientKeys.length, `${nodeId}: duplicate ambient key`)
    assert.ok(ambientKeys.every(Boolean), `${nodeId}: optional atmosphere needs a stable ambient key`)
  }
  assert.deepEqual(oversized, [], `single lines exceed the token budget: ${oversized.join(', ')}`)
  assert.deepEqual(brokenPages, [], `pages exceed the shared budget: ${brokenPages.join(', ')}`)
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
