import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { enumerateTrainActivityCandidates } from '../src/game/trainCandidateContract.js'
import { buildWordQuestion, wordQuestionRouteAspectIds } from '../src/game/wordPractice.js'
import {
  WORD_ASPECT_REGISTRY_VERSION,
  WORD_LEARNING_ASPECTS,
  WORD_STAGE_ASPECT_BINDINGS,
  advanceWordProgress,
  normalizeWordProgress,
  wordAspectTargetsForPlan,
  wordProgressionSnapshot,
} from '../src/game/wordProgression.js'
import {
  normalizeWordExposure,
  normalizeWordExposureReceipts,
  recordWordExposure,
  recordWordExposures,
  wordExposureFor,
} from '../src/game/wordExposure.js'

const ids = WORD_LEARNING_ASPECTS.map(({ id }) => id)
assert.equal(new Set(ids).size, ids.length, 'word aspect IDs are not unique')
assert.ok(WORD_ASPECT_REGISTRY_VERSION >= 2, 'branching/audio aspect registry migration is not versioned')
for (const aspect of WORD_LEARNING_ASPECTS) {
  assert.ok(WORD_STAGE_ASPECT_BINDINGS[aspect.stageId], `${aspect.id} lacks an activity binding`)
  for (const requirement of aspect.prerequisites || []) {
    assert.ok(ids.includes(requirement.aspectId), `${aspect.id} requires unknown aspect ${requirement.aspectId}`)
  }
  for (const requirements of Object.values(aspect.conditionalPrerequisites || {})) {
    for (const requirement of requirements) {
      assert.ok(ids.includes(requirement.aspectId), `${aspect.id} conditionally requires unknown aspect ${requirement.aspectId}`)
    }
  }
}

const options = wordProgressionOptionsForSense('fshat')
const foundation = normalizeWordProgress({ wins: { 'meaning-recognition': 2 } })
const branched = wordProgressionSnapshot(foundation, 10, options)
const eligible = branched.aspects.filter(({ eligible }) => eligible).map(({ aspect }) => aspect.id)
for (const id of [
  'grammatical-form-recognition',
  'controlled-lemma-retrieval',
  'contextual-meaning-inference',
]) assert.ok(eligible.includes(id), `${id} was incorrectly hidden behind a global sequence`)
assert.ok(!eligible.includes('auditory-form-construction'), 'whole-form sound construction bypassed exact noun-ending recall')
assert.ok(!eligible.includes('contextual-form-selection'), 'ending choice bypassed exact form/job recognition')
assert.ok(!eligible.includes('reviewed-ending-recall'), 'typed ending bypassed ending selection')
assert.equal(branched.next.aspectSelection.strategy, 'highest scored due weak aspect; registry order breaks exact ties')

const discoveredForGraph = [
  'fshat', 'qytet', 'shtepi', 'treg', 'po_yes', 'jo', 'uje', 'buke',
  'nje', 'sheh', 'prane', 'eshte', 'ketu', 'jam', 'disa', 'pas', 'shume',
  'ky', 'mire', 'i_art',
]
const routeAspectIds = wordQuestionRouteAspectIds({
  discoveredIds: discoveredForGraph,
  wordProgress: { fshat: foundation },
  currentRound: 10,
  targetId: 'fshat',
})
for (const id of [
  'grammatical-form-recognition',
  'noun-paradigm-matching',
  'auditory-surface-recognition',
  'controlled-lemma-retrieval',
  'contextual-meaning-inference',
]) assert.ok(routeAspectIds.includes(id), `${id} was not exposed as a schedulable graph route`)

const enumeration = enumerateTrainActivityCandidates({
  state: {
    trainRound: 10,
    mana: {},
    practiced: {},
    wordExposure: {},
    wordProgress: { fshat: foundation },
    trainActivityHistory: [],
    trainTargetHistory: [],
  },
  discoveredIds: discoveredForGraph,
  debugTrace: true,
})
const fshatRoutes = enumeration.proposals.filter(({ rewardIds }) => rewardIds.includes('fshat'))
assert.ok(fshatRoutes.length >= 5, 'candidate enumeration collapsed fshat back to one selected aspect')
const controlledRoute = fshatRoutes.find(({ aspectIds: routeAspects }) =>
  routeAspects.includes('controlled-lemma-retrieval'))
assert.ok(controlledRoute, 'controlled retrieval was absent from the buildable graph proposals')
const controlledQuestion = controlledRoute.materialize({ debug: true })
const controlledResult = advanceWordProgress(foundation, 10, {
  correct: true,
  stageId: controlledQuestion.wordStageId,
  tier: controlledQuestion.tier,
  mode: controlledQuestion.mode,
  direction: controlledQuestion.dir,
  variantId: controlledQuestion.variantId,
  targetFormKey: controlledQuestion.targetFormKey,
  aspectTargets: controlledQuestion.aspectTargets,
  questionKey: controlledQuestion.questionKey,
  round: 11,
}, { ...options, discoveredIds: discoveredForGraph })
assert.equal(controlledResult.accepted, true, 'reducer rejected the planner-selected non-default graph route')
assert.equal(
  controlledResult.progress.aspectProofs['lemma|controlled-lemma-retrieval'].wins,
  1,
  'non-default graph route did not record its own capability proof',
)
assert.equal(
  controlledResult.progress.aspectProofs['form:fshat::indefNom|grammatical-form-recognition'],
  undefined,
  'one graph route silently filled a different capability branch',
)

const contextDependentOptions = {
  ...wordProgressionOptionsForSense('po_prog'),
  reviewedForms: [],
}
const beforeContextProof = wordProgressionSnapshot({ aspectProofs: {
  'lemma|lexical-meaning-recognition': { wins: 2, attempts: 2, correctAttempts: 2 },
  'lemma|auditory-surface-recognition': { wins: 1, attempts: 1, correctAttempts: 1 },
  'lemma|auditory-surface-discrimination': { wins: 1, attempts: 1, correctAttempts: 1 },
  'lemma|auditory-meaning-recognition': { wins: 1, attempts: 1, correctAttempts: 1 },
  'lemma|controlled-lemma-retrieval': { wins: 3, attempts: 3, correctAttempts: 3 },
  'lemma|auditory-form-construction': { wins: 1, attempts: 1, correctAttempts: 1 },
  'lemma|auditory-typed-recall': { wins: 1, attempts: 1, correctAttempts: 1 },
} }, 20, contextDependentOptions)
const constructionBeforeContext = beforeContextProof.aspects.find(({ aspect }) => aspect.id === 'orthographic-construction')
assert.equal(beforeContextProof.hasReviewedContextLane, true)
assert.equal(constructionBeforeContext.eligible, false,
  'context-dependent construction bypassed independent contextual-meaning proof')
assert.ok(constructionBeforeContext.prerequisites.some(({ aspectId, passed }) =>
  aspectId === 'contextual-meaning-inference' && passed === false))

const afterContextProof = wordProgressionSnapshot({ aspectProofs: {
  ...beforeContextProof.progress.aspectProofs,
  'lemma|contextual-meaning-inference': { wins: 1, attempts: 1, correctAttempts: 1 },
} }, 20, contextDependentOptions)
const constructionAfterContext = afterContextProof.aspects.find(({ aspect }) => aspect.id === 'orthographic-construction')
assert.equal(constructionAfterContext.eligible, true,
  'context-dependent construction remained locked after independent contextual-meaning proof')
assert.ok(wordAspectTargetsForPlan('po_prog', afterContextProof.next).some(({ aspectId, evidenceMode }) =>
  aspectId === 'contextual-meaning-inference' && evidenceMode === 'prerequisite'),
'activity evidence omitted the reviewed-context prerequisite consumed by the scheduler')

const initial = wordProgressionSnapshot(null, 0, options)
const result = advanceWordProgress(null, 0, {
  correct: true,
  stageId: initial.next.stageId,
  tier: initial.next.tier,
  mode: initial.next.mode,
  direction: initial.next.direction,
  variantId: initial.next.contextVariantId || initial.next.variantId,
  targetFormKey: initial.next.targetFormKey,
  aspectTargets: wordAspectTargetsForPlan('fshat', initial.next),
  questionKey: 'aspect-audit-first-proof',
  round: 1,
}, options)
assert.ok(result.accepted)
const writtenProofs = Object.entries(result.progress.aspectProofs).filter(([, proof]) => proof.attempts > 0)
assert.equal(writtenProofs.length, 1, 'one word question updated more than its exercised aspect')
assert.match(writtenProofs[0][0], /lexical-meaning-recognition$/)

const exposureBase = { wordExposure: {}, wordExposureReceipts: {} }
const exposed = recordWordExposure(exposureBase, {
  receipt: 'audit:story:1', source: 'story', occurrences: ['fshat', 'fshat'],
})
assert.equal(exposed.wordExposure.fshat.total, 2)
assert.strictEqual(recordWordExposure(exposed, {
  receipt: 'audit:story:1', source: 'story', occurrences: ['fshat'],
}), exposed, 'replaying an exposure receipt changed familiarity')

// Scene choices arrive together. They must count exactly like serial receipts,
// without copying every older receipt and word record once per visible choice.
const exposureEntries = [
  { receipt: 'audit:story:2', source: 'story', occurrences: ['qytet', 'qytet'] },
  { receipt: 'audit:story:3', source: 'phrase-co-exposure', occurrences: ['qytet'] },
  { receipt: 'audit:story:2', source: 'story', occurrences: ['qytet'] },
]
const batchedExposure = recordWordExposures(exposed, exposureEntries)
const serialExposure = exposureEntries.reduce((state, entry) => recordWordExposure(state, entry) || state, exposed)
assert.deepEqual(batchedExposure, serialExposure, 'batching changed exact passive-exposure counts')
assert.equal(batchedExposure.wordExposure.qytet.total, 3)
assert.strictEqual(batchedExposure.wordExposure.fshat, exposed.wordExposure.fshat,
  'an unrelated exposure rebuilt an existing word record')
assert.strictEqual(recordWordExposures(batchedExposure, exposureEntries), batchedExposure,
  'replaying the scene batch allocated another learner state')
assert.equal(recordWordExposures(exposed, [null, {}, {
  receipt: 'audit:invalid', source: 'story', occurrences: [null, '', 'x'.repeat(201)],
}]), null, 'invalid exposure entries committed a receipt')

// Reading one word must never scan unrelated vocabulary, even on a raw import.
const inspectedExposure = {
  fshat: { total: 999, story: '2', 'phrase-co-exposure': 1 },
  get unrelated() { throw new Error('single-word inspection scanned another word') },
}
assert.deepEqual(wordExposureFor({ wordExposure: inspectedExposure }, 'fshat'),
  { total: 3, story: 2, 'phrase-co-exposure': 1 })
assert.deepEqual(wordExposureFor({ wordExposure: inspectedExposure }, 'constructor'),
  { total: 0, story: 0, 'phrase-co-exposure': 0 })
assert.equal(wordExposureFor({ wordExposure: [{ story: 2 }] }, '0').total, 0,
  'targeted inspection accepted a malformed exposure map')
const rawExposure = { fshat: { story: 2 }, malformed: [] }
const normalizedExposure = normalizeWordExposure(rawExposure)
rawExposure.fshat.story = 50
assert.equal(normalizedExposure.fshat.story, 2, 'normalization retained an untrusted imported record')
assert.deepEqual(normalizeWordExposureReceipts({ good: 'story', bad: 'mastery' }), { good: 'story' })
assert.deepEqual(
  wordProgressionSnapshot(null, 0, options).next.aspectId,
  wordProgressionSnapshot(null, 0, { ...options, wordExposure: exposed.wordExposure }).next.aspectId,
  'passive exposure changed a capability gate',
)

const question = buildWordQuestion({
  discoveredIds: ['fshat'], targetId: 'fshat', wordExposure: exposed.wordExposure,
  currentRound: 0, rng: () => 0.25, debugTrace: true,
})
const weighting = question?.debugSelection?.weightedSelection?.candidates?.[0]
assert.ok(weighting?.retrievalPriorityBoost > 1, 'passive familiarity did not create its bounded retrieval-priority boost')
assert.ok(weighting.retrievalPriorityBoost <= 1.35, 'passive exposure boost escaped its declared cap')

const debugSource = readFileSync(new URL('../src/components/DebugLearningProgression.jsx', import.meta.url), 'utf8')
assert.match(debugSource, /snapshot\.aspects\.map/)
assert.match(debugSource, /data-word-aspect-registry-version/)
assert.doesNotMatch(debugSource, /word ladder/i)
const storySource = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
assert.match(storySource, /scenePresentation\.normalEntries/)
assert.match(storySource, /story-choice:/)
const modelCard = readFileSync(new URL('../docs/adaptive-learning-model-card.md', import.meta.url), 'utf8')
for (const boundary of ['independently evidenced capability graph', 'Passive exposure', 'cannot complete a prerequisite']) {
  assert.ok(modelCard.includes(boundary), `model card omits ${boundary}`)
}

console.log(`✓ ${ids.length} word-learning aspects form a shared branching graph; passive exposure is replay-safe priority evidence, never mastery.`)
