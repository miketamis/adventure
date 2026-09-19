import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  DISTRACTOR_PLAN_CALIBRATION,
  DISTRACTOR_PLAN_VERSION,
  planSenseDistractors,
  createDistractorLearnerLookup,
} from '../src/game/distractorPlanning.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import { DICT } from '../src/game/dictionary.js'
import { isTrainableSense } from '../src/game/lexicalTrainability.js'
import { seededTrainRng } from '../src/game/trainCandidateContract.js'

const evidence = {
  discoveredIds: ['mund', 'eshte', 'di', 'rri', 'shko', 'fshat', 'rruge'],
  mana: { eshte: 1, di: 1, rri: 1, shko: 1, fshat: 1, rruge: 1 },
  practiced: { eshte: 1, di: 1, rri: 1, shko: 1, fshat: 1, rruge: 1 },
  wordProgress: Object.fromEntries(['eshte', 'di', 'rri', 'shko', 'fshat', 'rruge'].map((id) => [id, {
    wins: { 'meaning-recognition': 2 },
  }])),
  wordExposure: { eshte: { total: 8 }, di: { total: 2 } },
}

const foundation = planSenseDistractors({
  answerId: 'mund', candidateIds: ['eshte', 'di', 'rri', 'shko', 'fshat', 'rruge'], fallbackIds: [], count: 2,
  difficultyBand: 'foundation', rng: () => 0.25, ...evidence,
})
assert.equal(foundation.complete, true)
assert.equal(foundation.trace.version, DISTRACTOR_PLAN_VERSION)
assert.equal(foundation.trace.calibration, DISTRACTOR_PLAN_CALIBRATION)
assert.ok(foundation.trace.selected.every(({ targetDifficultyBand }) => targetDifficultyBand === 'foundation'))
assert.ok(foundation.trace.selected.every(({ relation }) => relation.confusability.band !== 'near'),
  'foundation distractors did not preserve easier, farther elimination')

const challenge = planSenseDistractors({
  answerId: 'mund', candidateIds: ['eshte', 'di', 'rri', 'shko', 'fshat', 'rruge'], fallbackIds: [], count: 2,
  difficultyBand: 'challenge', rng: () => 0.25, ...evidence,
})
assert.equal(challenge.complete, true)
assert.deepEqual(new Set(challenge.selectedIds), new Set(['eshte', 'di']))
assert.ok(challenge.trace.selected.every(({ relation }) => relation.type === 'editor-reviewed-hard-contrast'))
assert.ok(challenge.trace.selected.every(({ relation }) => relation.editorialHardContrast?.source === 'i-p'))
assert.ok(challenge.trace.selected.every(({ relation }) => relation.editorialHardContrast?.reason))

const knownBeatsUnknown = planSenseDistractors({
  answerId: 'mund', candidateIds: ['eshte', 'di'], fallbackIds: [], count: 1,
  field: 'al', difficultyBand: 'challenge', discoveredIds: ['mund', 'eshte'],
  mana: { eshte: 1 }, wordProgress: { eshte: { wins: { 'meaning-recognition': 1 } } }, rng: () => 0.5,
})
assert.deepEqual(knownBeatsUnknown.selectedIds, ['eshte'], 'an unknown Albanian option outranked a known legal distractor')
assert.equal(knownBeatsUnknown.trace.rejected.find(({ id }) => id === 'di').learnerEvidence.familiarity, 'unseen')

const ambiguous = planSenseDistractors({
  answerId: 'po_turn', candidateIds: ['dhe'], fallbackIds: [], count: 1,
  difficultyBand: 'challenge', useHardContrastRegistry: false, rng: () => 0,
})
assert.equal(ambiguous.complete, false)
assert.match(ambiguous.trace.rejected[0].validity.rejectionReasons.join(' '), /defensible alternative/)

const passiveOnly = planSenseDistractors({
  answerId: 'mund', candidateIds: ['eshte'], fallbackIds: [], count: 1,
  field: 'al', discoveredIds: ['mund'], wordExposure: { eshte: { total: 99 } }, rng: () => 0,
})
assert.equal(passiveOnly.trace.selected[0].learnerEvidence.familiarity, 'unseen')
assert.equal(passiveOnly.trace.selected[0].learnerEvidence.passiveExposureCountsAsMastery, false)

const debugQuestion = buildWordQuestion({
  discoveredIds: ['po_prog', 'shko', 'ne', 'fshat'], targetId: 'fshat', currentRound: 0,
  mana: { fshat: 1 }, practiced: { fshat: 1 }, debugTrace: true, rng: () => 0.3,
})
assert.ok(debugQuestion?.debugSelection?.distractors, 'debug word question lost the real distractor plan')
for (const row of debugQuestion.debugSelection.distractors.selected) {
  assert.ok(row.selection.reason)
  assert.ok(row.relation.type)
  assert.ok(row.relation.confusability.band)
  assert.ok(row.targetDifficultyBand)
  assert.ok(row.learnerEvidence.familiarity)
  assert.deepEqual(row.validity.rejectionReasons, [])
}
const ordinaryQuestion = buildWordQuestion({
  discoveredIds: ['po_prog', 'shko', 'ne', 'fshat'], targetId: 'fshat', currentRound: 0,
  mana: { fshat: 1 }, practiced: { fshat: 1 }, rng: () => 0.3,
})
assert.equal(ordinaryQuestion?.debugSelection, undefined, 'ordinary Train leaked the debug distractor trace')

// The optimized ordinary path must select exactly the same options, evidence,
// and relationships as exhaustive authoring mode over the complete dictionary.
// This guards the lower-bound pruning against a subtle difficulty, duplicate
// label, fairness, or seeded tie-break change.
const wholeBankIds = Object.keys(DICT).filter(isTrainableSense)
const evidenceReads = new Map()
const sharedEvidence = createDistractorLearnerLookup({
  ...evidence,
  wordProgress: new Proxy(evidence.wordProgress, {
    get(target, id) { evidenceReads.set(id, (evidenceReads.get(id) || 0) + 1); return target[id] },
  }),
})
for (const difficultyBand of ['foundation', 'developing', 'challenge']) {
  const options = { ...evidence, answerId: 'mund', count: 3, difficultyBand, field: 'al', debugTrace: false }
  const reused = planSenseDistractors({ ...options, learnerLookup: sharedEvidence, rng: seededTrainRng(difficultyBand) })
  const independent = planSenseDistractors({ ...options, rng: seededTrainRng(difficultyBand) })
  assert.deepEqual(reused, independent, `${difficultyBand}: sharing the learner snapshot changed a distractor plan`)
}
assert.ok(evidenceReads.size >= wholeBankIds.length, 'the shared learner lookup omitted unseen fallback senses')
assert.ok([...evidenceReads.values()].every((count) => count === 1), 'multiple proposals reread the same learner evidence')
const compareOptimizedPlan = (options, seed) => {
  const exhaustive = planSenseDistractors({ ...options, rng: seededTrainRng(seed), debugTrace: true })
  const optimized = planSenseDistractors({ ...options, rng: seededTrainRng(seed), debugTrace: false })
  assert.equal(optimized.complete, exhaustive.complete, `${seed}: buildability changed`)
  assert.deepEqual(optimized.selectedIds, exhaustive.selectedIds, `${seed}: selected options changed`)
  assert.deepEqual(optimized.trace.selected, exhaustive.trace.selected, `${seed}: selected evidence changed`)
  assert.equal(optimized.trace.candidateCount, exhaustive.trace.candidateCount)
}
for (const answerId of wholeBankIds) {
  for (const difficultyBand of ['foundation', 'developing', 'challenge']) {
    compareOptimizedPlan({ answerId, count: 3, difficultyBand }, `whole-bank:${difficultyBand}:${answerId}`)
  }
}
for (const count of [0, 1, 4]) {
  for (const difficultyBand of ['foundation', 'developing', 'challenge']) {
    compareOptimizedPlan({ answerId: 'fshat', count, difficultyBand }, `option-count:${difficultyBand}:${count}`)
  }
}
for (const answerId of ['mund', 'i_art', 'po_prog', 'fshat', 'rruge']) {
  for (const difficultyBand of ['foundation', 'developing', 'challenge']) {
    for (const field of ['en', 'al']) {
      compareOptimizedPlan({
        ...evidence, answerId, count: 3, difficultyBand, field,
        contextual: answerId === 'i_art' || answerId === 'po_prog',
        source: 'editor-reviewed-parity-fixture',
      }, `mixed-evidence:${answerId}:${difficultyBand}:${field}`)
    }
  }
}

const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
const inspector = readFileSync(new URL('../src/components/DebugTrainActivityInspector.jsx', import.meta.url), 'utf8')
const contextQuestionPresentation = readFileSync(new URL('../src/game/contextQuestionPresentation.js', import.meta.url), 'utf8')
assert.match(practice, /q\.promptProfile\?\.contextPresentation === CONTEXT_TARGET_PRESENTATION\.namedMarked/,
  'a named contextual target is not using the shared named-and-marked presentation')
assert.doesNotMatch(contextQuestionPresentation, /locate-then-analyse|First tap/,
  'the fake named-target locate phase is still present')
assert.match(inspector, /data-debug-distractor-plan/)
assert.match(inspector, /Learner-aware distractor decision/)
assert.match(inspector, /Registry link:/)

console.log('✓ learner-aware distractors move from known far elimination to known reviewed near-neighbours, reject defensible answers, disclose non-mastery exposure, and expose a debug-only decision trace.')
