import assert from 'node:assert/strict'
import {
  TRAIN_FUTURE_PLANNER_POLICY,
  eligibleTrainCandidates,
  initialTrainPlanningState,
  planTrainFutureExact,
  planTrainFuture,
  trainPlanConstraintReport,
  trainCandidateEligibility,
  trainPlannerOracleReport,
  transitionTrainPlanningState,
} from '../src/game/trainFuturePlanner.js'
import { TRAIN_ACTION_GOAL_POLICY } from '../src/game/trainActionGoal.js'

const proposal = (id, {
  words = [id],
  targets = [`word:${id}`, `surface:${id}`],
  activity = `activity:${id}`,
  family = 'word',
  modality = 'choice',
  evidence = 'recognition',
  aspects = [`aspect:${id}`],
  remediation = false,
  forgettingRisk = 0,
  expectedLearningGain = 0,
  uncertaintyReduction = 0,
} = {}) => ({
  candidateId: id,
  route: family === 'phrase' ? 'phrase' : 'word',
  familyId: family,
  activityTypeId: activity,
  targetKeys: targets,
  rewardIds: targets.filter((target) => target.startsWith('word:')).map((target) => target.slice(5)),
  wordKeys: words,
  aspectIds: aspects,
  evidenceTrack: evidence,
  modality,
  difficulty: { tier: 0, label: 'test', variantId: id },
  remediation,
  urgency: { remediation, forgettingRisk, expectedLearningGain, uncertaintyReduction },
  buildabilityCertificate: { valid: true },
  outcomeDeltas: {
    correct: { clearsRemediationFor: targets, advancesRound: 1 },
    miss: { schedulesRemediationFor: targets, afterDisjointRounds: 1, advancesRound: 1 },
  },
  materialize: () => ({ questionKey: id }),
})

assert.equal(TRAIN_FUTURE_PLANNER_POLICY.algorithm, 'state-deduplicated beam dynamic programming with iterative horizon expansion and a bounded exhaustive oracle')
assert.equal(TRAIN_FUTURE_PLANNER_POLICY.maximumDepth, 24)
assert.deepEqual(TRAIN_FUTURE_PLANNER_POLICY.outcomes, ['correct', 'miss'])
assert.equal(TRAIN_ACTION_GOAL_POLICY.maximumActivitiesPerTokenOpportunity, 8)
assert.equal(TRAIN_ACTION_GOAL_POLICY.minimumNonGoalActivitiesBeforeTokenOpportunity, 6)
assert.equal(TRAIN_ACTION_GOAL_POLICY.maximumNonGoalActivitiesBeforeForcedOpportunity, 7)

const initial = initialTrainPlanningState()
const isolatedTrap = proposal('trap', { words: ['b', 'c'], activity: 'activity:tempting', forgettingRisk: 1 })
const bridgeB = proposal('b', { words: ['b'], activity: 'activity:same' })
const bridgeC = proposal('c', { words: ['c'], activity: 'activity:same' })
const planned = planTrainFuture({
  proposals: [isolatedTrap, bridgeB, bridgeC],
  planningState: initial,
  seed: 'future-not-greedy',
  maximumDepth: 3,
  maximumMilliseconds: 1000,
  maximumStates: 10000,
  branchLimit: 10,
})
assert.notEqual(planned.candidate.candidateId, 'trap', 'the planner chose a locally urgent card that destroys every continuation')
assert.equal(planned.plan.length, 2)
assert.equal(planned.trace.completedDepth, 2)
assert.equal(planned.trace.stopReason, 'natural-exhaustion')
assert.ok(planned.outcomePlans.correct.path.length >= 1)
assert.ok(planned.outcomePlans.miss.path.length >= 1)

const exactTrap = planTrainFutureExact({
  proposals: [isolatedTrap, bridgeB, bridgeC],
  planningState: initial,
  seed: 'future-not-greedy',
  maximumDepth: 3,
})
assert.equal(exactTrap.available, true)
assert.notEqual(exactTrap.candidate.candidateId, 'trap')
const trapOracleReport = trainPlannerOracleReport(planned, exactTrap, initial)
assert.equal(trapOracleReport.firstChoiceMatch, true)
assert.equal(trapOracleReport.scoreParity, true)
assert.equal(trapOracleReport.hardConstraintsValid, true)
assert.equal(trapOracleReport.avoidableCaughtUp, false)
assert.equal(exactTrap.trace.memoHits, 0, 'the exact oracle merged path-dependent novelty states')

const deliberatelyNarrow = planTrainFuture({
  proposals: [isolatedTrap, bridgeB, bridgeC],
  planningState: initial,
  seed: 'future-not-greedy',
  maximumDepth: 3,
  maximumMilliseconds: 1000,
  maximumStates: 10000,
  branchLimit: 1,
  beamWidth: 1,
})
const narrowReport = trainPlannerOracleReport(deliberatelyNarrow, exactTrap, initial)
assert.equal(narrowReport.hardConstraintsValid, true)
assert.equal(narrowReport.avoidableCaughtUp, false)
assert.equal(narrowReport.firstChoiceMatch, false)
assert.equal(narrowReport.scoreComparable, false,
  'plans with different completed horizons were incorrectly compared as equal-length scores')
const lowerScore = {
  ...exactTrap.score,
  distinctTargets: exactTrap.score.distinctTargets - 1,
  vector: [...exactTrap.score.vector],
}
lowerScore.vector[9] -= 1
const regretReport = trainPlannerOracleReport({
  candidate: exactTrap.candidate,
  plan: exactTrap.plan,
  score: lowerScore,
  trace: { completedDepth: exactTrap.trace.completedDepth },
}, exactTrap, initial)
assert.equal(regretReport.lexicographicRegret.objective, 'distinct-targets')
const horizonMismatchReport = trainPlannerOracleReport(planTrainFuture({
  proposals: [isolatedTrap, bridgeB, bridgeC],
  planningState: initial,
  seed: 'future-not-greedy',
  maximumDepth: 1,
  maximumMilliseconds: 1000,
}), exactTrap, initial)
assert.equal(horizonMismatchReport.scoreComparable, false)
assert.equal(horizonMismatchReport.scoreParity, null)
assert.equal(horizonMismatchReport.lexicographicRegret, null)
assert.equal(horizonMismatchReport.diversityDelta, null)

const selectedState = transitionTrainPlanningState(initial, bridgeB, 'miss')
assert.equal(selectedState.pendingRemediations.length, 1)
assert.equal(trainCandidateEligibility(selectedState, bridgeB).eligible, false,
  'a miss repeated without its required disjoint round')
const disjointState = transitionTrainPlanningState(selectedState, bridgeC, 'correct')
const repairedEligibility = trainCandidateEligibility(disjointState, bridgeB)
assert.equal(repairedEligibility.eligible, true)
assert.equal(repairedEligibility.projectedRemediation, true)

const repeatedWordState = initialTrainPlanningState({ lastWordKeys: ['same'] })
const repeatedWord = proposal('repeat-word', { words: ['same'] })
assert.deepEqual(trainCandidateEligibility(repeatedWordState, repeatedWord).reasons,
  ['shares-word-with-previous-activity'])

const sameFormatA = proposal('same-a', { activity: 'activity:same', words: ['a'] })
const sameFormatB = proposal('same-b', { activity: 'activity:same', words: ['b'] })
const afterSameA = transitionTrainPlanningState(initial, sameFormatA, 'correct')
assert.equal(trainCandidateEligibility(afterSameA, sameFormatB).eligible, true,
  'same-format, disjoint-target fallback was lost in the future planner')

const phrase = proposal('phrase-a', {
  family: 'phrase',
  targets: ['phrase:a'],
  words: ['një'],
})
const afterPhraseThenWord = transitionTrainPlanningState(
  transitionTrainPlanningState(initial, phrase, 'correct'),
  proposal('word-between', { words: ['dy'] }),
  'correct',
)
assert.ok(trainCandidateEligibility(afterPhraseThenWord, phrase).reasons.includes('repeats-previous-phrase-target'))

const caughtUp = planTrainFuture({
  proposals: [repeatedWord],
  planningState: repeatedWordState,
  maximumDepth: 4,
})
assert.equal(caughtUp.candidate, null)
assert.equal(caughtUp.trace.rejectionProof['shares-word-with-previous-activity'], 1)
assert.equal(caughtUp.trace.rejectionProof.byCandidate.length, 1)

const pool = Array.from({ length: 12 }, (_, index) => proposal(`wide-${index}`, {
  activity: `activity:${index % 4}`,
  family: `family:${index % 3}`,
  modality: ['choice', 'listening', 'typing'][index % 3],
  evidence: `track:${index % 4}`,
  aspects: [`aspect:${index % 5}`],
}))
const deep = planTrainFuture({
  proposals: pool,
  planningState: initial,
  seed: 'iterative-depth',
  maximumDepth: 8,
  maximumMilliseconds: 2000,
  maximumStates: 100000,
  branchLimit: 12,
})
const deepAgain = planTrainFuture({
  proposals: pool,
  planningState: initial,
  seed: 'iterative-depth',
  maximumDepth: 8,
  maximumMilliseconds: 2000,
  maximumStates: 100000,
  branchLimit: 12,
})
assert.equal(deep.trace.completedDepth, 8)
assert.equal(deep.plan.length, 8)
assert.deepEqual(deep.plan.map(({ candidateId }) => candidateId), deepAgain.plan.map(({ candidateId }) => candidateId))
assert.ok(deep.score.distinctTargets >= 8)
assert.ok(deep.score.distinctActivityTypes >= 4)
assert.ok(deep.score.distinctModalities >= 3)
assert.equal(eligibleTrainCandidates(initial, pool).eligible.length, pool.length)
const exactDiversity = planTrainFutureExact({
  proposals: pool.slice(0, 6),
  planningState: initial,
  seed: 'iterative-depth',
  maximumDepth: 6,
})
assert.equal(exactDiversity.available, true)
assert.equal(trainPlanConstraintReport(exactDiversity.plan, initial).valid, true)
const diversityApproximation = planTrainFuture({
  proposals: pool.slice(0, 6),
  planningState: initial,
  seed: 'iterative-depth',
  maximumDepth: 6,
  maximumMilliseconds: 1000,
  maximumStates: 100000,
  branchLimit: 6,
  beamWidth: 100000,
})
const diversityOracleReport = trainPlannerOracleReport(diversityApproximation, exactDiversity, initial)
assert.equal(diversityOracleReport.scoreParity, true)
assert.equal(diversityOracleReport.firstChoiceMatch, true)

const personalizedLow = proposal('personalized-low', {
  expectedLearningGain: 0.2,
  uncertaintyReduction: 0.2,
})
const personalizedHigh = proposal('personalized-high', {
  expectedLearningGain: 0.9,
  uncertaintyReduction: 1,
})
const personalized = planTrainFuture({
  proposals: [personalizedLow, personalizedHigh],
  planningState: initial,
  seed: 'local-personalization-tie',
  maximumDepth: 1,
  maximumMilliseconds: 1000,
})
assert.equal(personalized.candidate.candidateId, 'personalized-high',
  'local expected gain did not break an otherwise equal diversity tie')
assert.equal(
  trainCandidateEligibility(initialTrainPlanningState({ lastWordKeys: ['personalized-high'] }), personalizedHigh).eligible,
  false,
  'a personalization signal overrode the consecutive-word constraint',
)

const goal = proposal('goal', { words: ['goal'], targets: ['word:goal', 'surface:goal'] })
const tempting = proposal('tempting', {
  words: ['tempting'],
  activity: 'activity:different',
  family: 'different-family',
  modality: 'listening',
  evidence: 'different-track',
  aspects: ['different-aspect'],
  forgettingRisk: 1,
  expectedLearningGain: 1,
  uncertaintyReduction: 1,
})
const practiceDiversions = [tempting, ...Array.from({ length: 5 }, (_, index) =>
  proposal(`practice-diversion-${index + 2}`))]
const secondDiversion = practiceDiversions[1]
const pacedGoal = planTrainFuture({
  proposals: [...practiceDiversions, goal],
  planningState: initialTrainPlanningState({
    goalRemaining: ['goal'],
    goalMaximumDiversionRounds: 7,
  }),
  seed: 'goal-after-practice-floor',
  maximumDepth: 7,
  maximumMilliseconds: 1000,
})
assert.notEqual(pacedGoal.candidate.candidateId, 'goal', 'the first Train activity skipped the action-token practice floor')
assert.deepEqual(pacedGoal.plan.map(({ candidateId }) => candidateId).slice(6), ['goal'])
assert.equal(pacedGoal.score.goalComplete, true)
assert.equal(pacedGoal.score.roundsToGoal, 7)
assert.ok(trainCandidateEligibility(initialTrainPlanningState({
  goalRemaining: ['goal'],
  goalMaximumDiversionRounds: 7,
}), goal).reasons.includes('goal-practice-floor'))

const goalCooldown = initialTrainPlanningState({
  targetHistory: [['word:goal', 'surface:goal']],
  lastWordKeys: ['goal'],
  goalRemaining: ['goal'],
  goalMaximumDiversionRounds: 2,
})
const bridgeToGoal = planTrainFuture({
  proposals: [tempting, secondDiversion, goal],
  planningState: goalCooldown,
  seed: 'one-safe-bridge',
  maximumDepth: 3,
  maximumMilliseconds: 1000,
})
assert.notEqual(bridgeToGoal.candidate.candidateId, 'goal')
assert.equal(bridgeToGoal.plan[2].candidateId, 'goal')
assert.equal(bridgeToGoal.score.roundsToGoal, 3)
const exhaustedGoal = transitionTrainPlanningState(
  transitionTrainPlanningState(goalCooldown, tempting, 'miss'),
  proposal('second-diversion', { words: ['second'] }),
  'miss',
)
assert.ok(trainCandidateEligibility(exhaustedGoal, proposal('third-diversion', { words: ['third'] })).reasons
  .includes('goal-grind-budget-exhausted'))

const emergencyGoalState = initialTrainPlanningState({
  targetHistory: [
    ['word:goal', 'surface:goal'],
    ['word:other', 'surface:other'],
  ],
  lastWordKeys: ['other'],
  goalRemaining: ['goal'],
  goalMaximumDiversionRounds: TRAIN_ACTION_GOAL_POLICY.maximumNonGoalActivitiesBeforeForcedOpportunity,
  goalDiversionsUsed: TRAIN_ACTION_GOAL_POLICY.maximumNonGoalActivitiesBeforeForcedOpportunity,
})
const emergencyPlan = planTrainFuture({
  proposals: [tempting, goal],
  planningState: emergencyGoalState,
  seed: 'eighth-activity-guarantee',
  maximumDepth: 3,
  maximumMilliseconds: 1000,
})
assert.equal(emergencyPlan.candidate.candidateId, 'goal',
  'the eighth activity did not override ordinary cooldown/diversity for the missing action word')
assert.equal(trainCandidateEligibility(emergencyGoalState, tempting).eligible, false)
assert.equal(trainCandidateEligibility(emergencyGoalState, goal).goalEmergency, true)
assert.equal(
  transitionTrainPlanningState(emergencyGoalState, goal, 'miss').goalDiversionsUsed,
  0,
  'a missed token opportunity did not begin a fresh eight-activity window',
)

let twoTokenState = initialTrainPlanningState({
  goalRemaining: ['goal-a', 'goal-b'],
  goalMaximumDiversionRounds: TRAIN_ACTION_GOAL_POLICY.maximumNonGoalActivitiesBeforeForcedOpportunity,
})
const twoTokenPool = [
  proposal('goal-a', { targets: ['word:goal-a', 'surface:goal-a'] }),
  proposal('goal-b', { targets: ['word:goal-b', 'surface:goal-b'] }),
  ...Array.from({ length: 10 }, (_, index) => proposal(`diversion-${index}`)),
]
let completedActivities = 0
const opportunityRounds = []
while (twoTokenState.goalRemaining.length && completedActivities < 16) {
  const turn = planTrainFuture({
    proposals: twoTokenPool,
    planningState: twoTokenState,
    seed: `two-token-bound:${completedActivities}`,
    maximumDepth: 8,
    maximumMilliseconds: 1000,
    maximumStates: 100000,
  })
  assert.ok(turn.candidate, 'the two-token guarantee reached a false caught-up state')
  completedActivities++
  if (turn.candidate.rewardIds.some((id) => twoTokenState.goalRemaining.includes(id))) {
    opportunityRounds.push(completedActivities)
  }
  twoTokenState = transitionTrainPlanningState(twoTokenState, turn.candidate, 'correct')
}
assert.deepEqual(twoTokenState.goalRemaining, [])
assert.equal(opportunityRounds.length, 2)
assert.ok(opportunityRounds[0] >= 7 && opportunityRounds[1] - opportunityRounds[0] >= 7,
  `needed tokens bypassed the six-activity practice floor: ${opportunityRounds.join(', ')}`)
assert.ok(opportunityRounds[0] <= 8 && opportunityRounds[1] <= 16,
  `two missing goal tokens were not offered inside 16 activities: ${opportunityRounds.join(', ')}`)

const oracleGuard = planTrainFutureExact({ proposals: pool, planningState: initial })
assert.equal(oracleGuard.available, false)
assert.equal(oracleGuard.reason, 'candidate-limit')

console.log(`✓ robust dynamic programming planned ${deep.plan.length} rounds ahead across correct/miss branches; the bounded exhaustive oracle measured hard-constraint parity, diversity regret, caught-up safety, and the eight-activity token guarantee.`)
