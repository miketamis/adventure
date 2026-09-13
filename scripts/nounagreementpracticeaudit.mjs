import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  NOUN_GRAMMAR_ACTIVITY_VARIANTS,
  REVIEWED_NOUN_AGREEMENT_FRAMES,
  buildDemonstrativeWholeChoice,
  reviewedNounAgreementGate,
  validateReviewedNounAgreementFrame,
} from '../src/game/nounAgreementPractice.js'
import { buildNounAgreementQuestion } from '../src/game/formPractice.js'
import { wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import {
  advanceWordProgress,
  normalizeWordProgress,
  wordProgressPlan,
} from '../src/game/wordProgression.js'
import { TRAIN_EXERCISE_FAMILIES } from '../src/game/trainingProgression.js'
import { TRAIN_EXERCISE_EXAMPLES } from '../src/game/trainingExampleRegistry.js'

const discoveredIds = [
  ...REVIEWED_NOUN_AGREEMENT_FRAMES.map(({ nounId }) => nounId),
  'ky', 'kjo', 'i_art', 'e_art', 'mire',
]

assert.ok(REVIEWED_NOUN_AGREEMENT_FRAMES.length >= 8)
assert.ok(REVIEWED_NOUN_AGREEMENT_FRAMES.some(({ gender }) => gender === 'masculine'))
assert.ok(REVIEWED_NOUN_AGREEMENT_FRAMES.some(({ gender }) => gender === 'feminine'))
for (const frame of REVIEWED_NOUN_AGREEMENT_FRAMES) {
  assert.deepEqual(validateReviewedNounAgreementFrame(frame), [], `${frame.nounId} has an invalid reviewed agreement frame`)
  assert.equal(reviewedNounAgreementGate(frame, discoveredIds, 'demonstrative').eligible, true)
  assert.equal(reviewedNounAgreementGate(frame, discoveredIds, 'adjective').eligible, true)
}
assert.equal(
  reviewedNounAgreementGate(REVIEWED_NOUN_AGREEMENT_FRAMES[0], ['ky', 'kjo'], 'adjective').eligible,
  false,
  'adjective agreement did not fail closed when support words were unknown',
)

const whole = buildDemonstrativeWholeChoice({
  answerId: 'liber', candidateIds: discoveredIds, optionCount: 2, rng: () => 0.25,
})
assert.equal(whole.promptText, 'this book')
assert.equal(whole.options.length, 2)
assert.equal(whole.optionLabels.liber, 'ky libër')
assert.equal(whole.grammarVariantId, NOUN_GRAMMAR_ACTIVITY_VARIANTS.demonstrativeWholeChoice.id)
assert.deepEqual(NOUN_GRAMMAR_ACTIVITY_VARIANTS.demonstrativeWholeChoice.choiceRange, [2, 4])

const expandedWhole = buildDemonstrativeWholeChoice({
  answerId: 'liber', candidateIds: discoveredIds, optionCount: 4, rng: () => 0.25,
})
assert.equal(expandedWhole.options.length, 4, 'expanded controlled retrieval did not retain natural grammar chunks')

const aspectProof = (aspectId, wins = 1) => [`lemma|${aspectId}`, {
  wins, attempts: wins, correctAttempts: wins, dueAfterRound: 0,
  lastAttemptKey: null, lastAttemptRound: 0, temporal: {},
}]
const options = { ...wordProgressionOptionsForSense('liber'), reviewedForms: [] }
let progress = normalizeWordProgress({ aspectProofs: Object.fromEntries([
  aspectProof('lexical-meaning-recognition', 2),
  aspectProof('auditory-surface-recognition'),
  aspectProof('auditory-meaning-recognition'),
  aspectProof('controlled-lemma-retrieval', 3),
]) })
let plan = wordProgressPlan(progress, 10, options)
assert.equal(plan.stageId, 'demonstrative-noun-agreement')
const demonstrative = buildNounAgreementQuestion({
  answerId: 'liber', plan, candidateIds: discoveredIds, currentRound: 10, rng: () => 0.25,
})
assert.equal(demonstrative.kind, TRAIN_EXERCISE_FAMILIES.wordForms.kind)
assert.equal(demonstrative.phaseQuestions['choose-demonstrative'].answerValue, 'ky')
assert.equal(demonstrative.phaseQuestions['choose-noun'].answerValue, 'liber')
assert.deepEqual(demonstrative.phaseAspectTargets['choose-demonstrative'].filter(({ evidenceMode }) => evidenceMode === 'write'), [])
assert.deepEqual(
  demonstrative.phaseAspectTargets['choose-noun'].filter(({ evidenceMode }) => evidenceMode === 'write').map(({ aspectId }) => aspectId),
  ['demonstrative-noun-agreement'],
)
const advanced = advanceWordProgress(progress, 10, {
  correct: true,
  stageId: demonstrative.wordStageId,
  tier: demonstrative.tier,
  mode: demonstrative.mode,
  direction: demonstrative.dir,
  variantId: demonstrative.variantId,
  targetFormKey: null,
  aspectTargets: demonstrative.phaseAspectTargets['choose-noun'],
  questionKey: demonstrative.questionKey,
  round: 11,
}, options)
assert.equal(advanced.accepted, true)
assert.equal(advanced.progress.aspectProofs['lemma|demonstrative-noun-agreement'].wins, 1)

progress = normalizeWordProgress({ aspectProofs: Object.fromEntries([
  aspectProof('lexical-meaning-recognition', 2),
  aspectProof('auditory-surface-recognition'),
  aspectProof('auditory-meaning-recognition'),
  aspectProof('controlled-lemma-retrieval', 3),
  aspectProof('demonstrative-noun-agreement'),
]) })
plan = wordProgressPlan(progress, 10, options)
assert.equal(plan.stageId, 'adjective-linking-article-agreement')
const adjective = buildNounAgreementQuestion({
  answerId: 'liber', plan, candidateIds: discoveredIds, currentRound: 10, rng: () => 0.25,
})
assert.equal(adjective.phaseQuestions['identify-agreement-noun'].prompt, 'libri i mirë')
assert.equal(adjective.phaseQuestions['identify-agreement-noun'].answerValue, 'liber')
assert.equal(adjective.phaseQuestions['choose-linking-article'].prompt, 'libri __ mirë')
assert.equal(adjective.phaseQuestions['choose-linking-article'].answerValue, 'i')
assert.equal(adjective.phaseQuestions['choose-linking-article'].prompt.includes('book'), false)
assert.equal(adjective.phaseQuestions['choose-linking-article'].cue, undefined)
assert.equal(adjective.phaseQuestions['identify-linking-article-job'].prompt, 'libri i mirë')
assert.equal(adjective.phaseQuestions['identify-linking-article-job'].answerValue, 'i_art')
assert.deepEqual(adjective.phaseAspectTargets['identify-agreement-noun'].filter(({ evidenceMode }) => evidenceMode === 'write'), [])
assert.deepEqual(adjective.phaseAspectTargets['choose-linking-article'].filter(({ evidenceMode }) => evidenceMode === 'write'), [])
assert.deepEqual(
  adjective.phaseAspectTargets['identify-linking-article-job'].filter(({ evidenceMode }) => evidenceMode === 'write').map(({ aspectId }) => aspectId),
  ['adjective-linking-article-agreement'],
)

for (const id of [
  'demonstrative-noun-whole-choice',
  'demonstrative-noun-agreement',
  'demonstrative-noun-split-choice',
  'adjective-linking-article-agreement',
  'adjective-linking-article-staged',
]) assert.ok(TRAIN_EXERCISE_EXAMPLES[id], `Debug Learning lacks ${id}`)

const viewSource = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
assert.match(viewSource, /grammarPhaseQuestion/)
assert.match(viewSource, /q\.optionLabels\?\.\[id\] \|\| senseText/)
assert.match(viewSource, /train-noun-agreement/)
const inspectorSource = readFileSync(new URL('../src/game/debugTrainActivity.js', import.meta.url), 'utf8')
assert.match(inspectorSource, /stagedGrammarOccurrences/)

console.log(`✓ ${REVIEWED_NOUN_AGREEMENT_FRAMES.length} reviewed noun frames support whole-bundle retrieval, split demonstrative agreement and meaning-first i\/e adjective agreement.`)
