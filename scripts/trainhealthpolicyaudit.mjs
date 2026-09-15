import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DICT } from '../src/game/content.js'
import { trainMissConsequence } from '../src/game/consequenceBuilders.js'
import { newRun, normalizeSavedState, reducer } from '../src/game/gameState.js'
import {
  TRAIN_HEALTH_POLICY,
  applyTrainHealthResult,
  trainHealthPlanForQuestion,
  trainHeartRiskText,
  trainRecoveryPlanForState,
  trainRecoveryStatusText,
} from '../src/game/trainHealthPolicy.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import { WORD_MATCHING_POLICY } from '../src/game/wordMatchingPolicy.js'
import { normalizeWordProgress } from '../src/game/wordProgression.js'

const clone = (value) => JSON.parse(JSON.stringify(value))
const missFor = (questionKey, source = 'train-word') => trainMissConsequence({
  source,
  questionKey,
  attemptedEn: 'a deliberately wrong audit answer',
  reasonCode: 'audit-miss',
  reason: 'This answer does not match the exact target in the audit question.',
  correctAl: 'tani',
  correctEn: 'now',
})

let wordState = reducer(newRun(), { type: 'DISCOVER', id: 'tani' })
let wordQuestion = buildWordQuestion({
  discoveredIds: ['tani'],
  wordProgress: wordState.wordProgress,
  currentRound: wordState.trainRound,
  excludeWords: [],
  rng: () => 0.2,
})
const firstPlan = trainHealthPlanForQuestion(wordState, wordQuestion)
assert.equal(firstPlan.protectedAttempt, true)
assert.equal(firstPlan.wrongAnswerHeartCost, 0)
assert.equal(firstPlan.aspectTargets[0].targetId, 'tani')
assert.equal(firstPlan.aspectTargets[0].aspectId, 'lexical-meaning-recognition')
assert.equal(
  trainHeartRiskText(firstPlan),
  '3 of 3 hearts left. New skill step protected — a wrong answer will not cost a heart.',
)

const wordAction = (question, correct) => ({
  type: 'PRACTICE_WORD_RESULT',
  correct,
  id: question.answerId,
  tier: question.tier,
  mode: question.mode,
  direction: question.dir,
  wordStageId: question.wordStageId,
  variantId: question.variantId,
  targetFormKey: question.targetFormKey,
  aspectTargets: question.aspectTargets,
  questionKey: question.questionKey,
  wordKeys: question.lexicalSurfaces,
  ...(!correct ? { consequence: missFor(question.questionKey) } : {}),
})

const firstMiss = reducer(wordState, wordAction(wordQuestion, false))
assert.equal(firstMiss.hearts, wordState.hearts, 'a first exact aspect/level attempt cost health')
assert.equal(firstMiss.pendingHeartConsequence?.protected, true)
assert.equal(firstMiss.pendingHeartConsequence?.loss, 0)
assert.equal(firstMiss.wordProgress.tani.lastAttemptKey, wordQuestion.questionKey,
  'protected miss did not retain real remediation evidence')
assert.equal(firstMiss.trainHealingStreak, 0)
assert.equal(firstMiss.trainStageExposures[firstPlan.exposureKeys[0]], 1)
assert.equal(
  trainHealthPlanForQuestion(firstMiss, wordQuestion).protectedAttempt,
  false,
  'the same exact target/aspect/level/configuration stayed protected after its failed first attempt',
)

const persistedMiss = normalizeSavedState(clone(firstMiss), newRun())
assert.equal(persistedMiss.pendingHeartConsequence?.protected, true)
assert.equal(persistedMiss.trainStageExposures[firstPlan.exposureKeys[0]], 1)

const supportAspect = {
  targetId: 'fshat',
  aspectId: 'lexical-meaning-recognition',
  level: 'reviewed-form-contrast:meaning',
}
const finalAspect = {
  targetId: 'fshat',
  aspectId: 'grammatical-form-recognition',
  level: 'reviewed-form-contrast:form:defNom',
}
const stagedQuestion = {
  aspectTargets: [supportAspect, finalAspect],
  phaseAspectTargets: {
    'identify-form-meaning': [supportAspect],
    'identify-marked-form-job': [supportAspect, finalAspect],
  },
}
const supportExposureKey = trainHealthPlanForQuestion({}, {
  aspectTargets: [supportAspect],
}).exposureKeys[0]
const stagedState = {
  hearts: 2,
  trainStageExposures: { [supportExposureKey]: 1 },
}
assert.equal(trainHealthPlanForQuestion(stagedState, stagedQuestion).protectedAttempt, true,
  'the still-unseen final aspect should protect the eventual final phase')
const supportPhasePlan = trainHealthPlanForQuestion(stagedState, stagedQuestion, {
  phaseId: 'identify-form-meaning',
})
assert.equal(supportPhasePlan.protectedAttempt, false,
  'an already-attempted support phase was incorrectly protected by a later phase')
assert.equal(supportPhasePlan.wrongAnswerHeartCost, 1)
assert.deepEqual(supportPhasePlan.aspectTargets, [supportAspect])

wordState = reducer(firstMiss, {
  type: 'ACKNOWLEDGE_HEART_CONSEQUENCE',
  eventId: firstMiss.pendingHeartConsequence.eventId,
})
wordState = reducer(wordState, {
  type: 'TRAIN_ROUND_COMPLETE',
  questionKey: 'train-health:disjoint',
  wordKeys: ['ujë'],
})
wordQuestion = buildWordQuestion({
  discoveredIds: ['tani'],
  wordProgress: wordState.wordProgress,
  currentRound: wordState.trainRound,
  excludeWords: [],
  rng: () => 0.2,
})
assert.ok(wordQuestion, 'the protected miss did not schedule real remediation')
assert.equal(trainHealthPlanForQuestion(wordState, wordQuestion).protectedAttempt, false)
const damagingMiss = reducer(wordState, wordAction(wordQuestion, false))
assert.equal(damagingMiss.hearts, wordState.hearts - 1)
assert.equal(damagingMiss.pendingHeartConsequence?.protected, undefined)

const matchingIds = ['tani', 'uje', 'buke', 'rruge', 'fshat']
for (const id of matchingIds) assert.ok(DICT[id], `missing matching audit sense ${id}`)
const matchingBase = normalizeSavedState({
  ...newRun(),
  hearts: 1,
  discovered: Object.fromEntries(matchingIds.map((id) => [id, true])),
  wordProgress: Object.fromEntries(matchingIds.map((id) => [id, normalizeWordProgress({
    wins: { [WORD_MATCHING_POLICY.unlock.stageId]: WORD_MATCHING_POLICY.unlock.wins },
  })])),
}, newRun())
const lethalPlan = trainHealthPlanForQuestion({
  ...matchingBase,
  trainStageExposures: { 'aspect:saved-word-board:meaning-matching:adaptive-five-pair': 1 },
}, {
  kind: 'word-match',
  variantId: 'adaptive-five-pair',
  aspectTargets: [{ targetId: 'saved-word-board', aspectId: 'meaning-matching', level: 'adaptive-five-pair' }],
})
assert.equal(lethalPlan.missEndsRun, true)
assert.match(trainHeartRiskText(lethalPlan), /wrong answer costs one heart and ends this run/)
assert.equal(
  trainRecoveryStatusText(trainRecoveryPlanForState({ hearts: 2, trainHealingStreak: 6 })),
  'Correct combo: 6/7 · 1 more correct round restores one heart.',
)
const matchingAction = (correct, index) => ({
  type: 'PRACTICE_WORD_MATCH_RESULT',
  correct,
  variantId: WORD_MATCHING_POLICY.id,
  wordIds: matchingIds,
  wordKeys: matchingIds.map((id) => DICT[id].al),
  questionKey: `train-health:matching:${index}`,
  attemptedAtMs: 1_000 + index,
  responseDurationMs: 250,
  ...(!correct ? { consequence: missFor(`train-health:matching:${index}`, 'train-word-matching') } : {}),
})

const protectedMatchingMiss = reducer(matchingBase, matchingAction(false, 0))
assert.equal(protectedMatchingMiss.hearts, 1)
assert.equal(protectedMatchingMiss.pendingHeartConsequence?.protected, true)
assert.equal(protectedMatchingMiss.wordMatchingProgress.family[WORD_MATCHING_POLICY.id].attempts, 1)
assert.equal(protectedMatchingMiss.wordMatchingProgress.words.tani.attempts, 1)
assert.equal(protectedMatchingMiss.wordMatchingProgress.family[WORD_MATCHING_POLICY.id].temporal.lastAttemptAtMs, 1_000)
assert.equal(protectedMatchingMiss.wordMatchingProgress.words.tani.temporal.lastResponseDurationMs, 250)
assert.equal(protectedMatchingMiss.mana.tani, undefined)

let recovery = matchingBase
for (let index = 1; index <= TRAIN_HEALTH_POLICY.recoveryCorrectCompletions; index++) {
  recovery = reducer(recovery, matchingAction(true, index))
}
assert.equal(recovery.hearts, 2, 'sustained correct Train did not restore one heart')
assert.equal(recovery.trainHealingStreak, 0, 'recovery threshold did not reset the streak')
assert.equal(recovery.trainRecoveryEvent?.questionKey, `train-health:matching:${TRAIN_HEALTH_POLICY.recoveryCorrectCompletions}`)
assert.equal(recovery.mana.tani, TRAIN_HEALTH_POLICY.recoveryCorrectCompletions)
assert.equal(reducer(recovery, matchingAction(true, TRAIN_HEALTH_POLICY.recoveryCorrectCompletions)), recovery,
  'replaying an atomic matching result changed evidence or rewards')

const restarted = reducer({ ...recovery, hearts: 0 }, { type: 'RESET' })
assert.equal(restarted.trainHealingStreak, 0)
assert.equal(restarted.trainRecoveryEvent, null)
assert.deepEqual(restarted.trainStageExposures, recovery.trainStageExposures,
  'aspect/level exposure did not survive story restart')
assert.deepEqual(restarted.wordMatchingProgress, recovery.wordMatchingProgress,
  'matching evidence did not survive story restart')

const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
const heartModal = readFileSync(new URL('../src/components/HeartConsequenceModal.jsx', import.meta.url), 'utf8')
const graph = readFileSync(new URL('../src/components/DebugLearningProgression.jsx', import.meta.url), 'utf8')
assert.match(practice, /trainHeartRiskText\(trainHealth\)/)
assert.match(practice, /trainRecoveryStatusText\(recoveryPlan\)/)
assert.match(practice, /train-risk-protected/)
assert.match(practice, /train-risk-damaging train-risk-pulse-fast/)
assert.match(practice, /train-risk-damaging train-risk-pulse-slow/)
assert.match(practice, /role="progressbar"/)
assert.match(practice, /aria-valuemax=\{recoveryPlan\.recoveryCorrectCompletions\}/)
assert.match(practice, /aria-valuenow=\{recoveryPlan\.correctStreak\}/)
assert.match(styles, /\.train-card\.train-risk-protected/)
assert.match(styles, /\.train-card\.train-risk-pulse-slow \.training-activity-shell/)
assert.match(styles, /\.train-card\.train-risk-pulse-fast \.training-activity-shell/)
assert.match(practice, /trainHealthPlanForQuestion\(state, q, \{ phaseId: formPhase\?\.id \|\| null \}\)/)
assert.match(practice, /one heart restored/)
assert.match(practice, /Continue training/)
assert.match(app, /const HeartConsequenceModal = lazy\(/)
assert.match(heartModal, /Practice miss — no heart lost/)
assert.match(heartModal, /Why the answer was wrong/)
assert.match(graph, /TRAIN_HEALTH_POLICY\.protectionRule/)
assert.match(graph, /TRAIN_HEALTH_POLICY\.recoveryRule/)

// The pure state function also guards the cap and the reset-on-miss rule.
let policyState = { hearts: 3, trainHealingStreak: TRAIN_HEALTH_POLICY.recoveryCorrectCompletions - 1 }
let policyResult = applyTrainHealthResult(policyState, {
  exposureKeys: ['aspect:a:b:c'], correct: true, questionKey: 'full', maximumHearts: 3,
})
assert.equal(policyResult.state.hearts, 3)
assert.equal(policyResult.state.trainHealingStreak, 0)
policyResult = applyTrainHealthResult({ ...policyResult.state, trainHealingStreak: 4 }, {
  exposureKeys: ['aspect:a:b:d'], correct: false, questionKey: 'miss', maximumHearts: 3,
})
assert.equal(policyResult.state.trainHealingStreak, 0)

console.log(`✓ Train health uses one protected attempt per exact aspect/level and restores one heart after ${TRAIN_HEALTH_POLICY.recoveryCorrectCompletions} consecutive correct rounds.`)
