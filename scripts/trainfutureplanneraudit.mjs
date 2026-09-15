import assert from 'node:assert/strict'
import {
  TRAIN_FUTURE_PLANNER_POLICY,
  eligibleTrainCandidates,
  initialTrainPlanningState,
  planTrainFuture,
  trainCandidateEligibility,
  transitionTrainPlanningState,
} from '../src/game/trainFuturePlanner.js'

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
  urgency: { remediation, forgettingRisk },
  buildabilityCertificate: { valid: true },
  outcomeDeltas: {
    correct: { clearsRemediationFor: targets, advancesRound: 1 },
    miss: { schedulesRemediationFor: targets, afterDisjointRounds: 1, advancesRound: 1 },
  },
  materialize: () => ({ questionKey: id }),
})

assert.equal(TRAIN_FUTURE_PLANNER_POLICY.algorithm, 'state-deduplicated beam dynamic programming with iterative horizon expansion')
assert.equal(TRAIN_FUTURE_PLANNER_POLICY.maximumDepth, 24)
assert.deepEqual(TRAIN_FUTURE_PLANNER_POLICY.outcomes, ['correct', 'miss'])

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

const goal = proposal('goal', { words: ['goal'], targets: ['word:goal', 'surface:goal'] })
const tempting = proposal('tempting', {
  words: ['tempting'],
  activity: 'activity:different',
  family: 'different-family',
  modality: 'listening',
  evidence: 'different-track',
  aspects: ['different-aspect'],
  forgettingRisk: 1,
})
const directGoal = planTrainFuture({
  proposals: [tempting, goal],
  planningState: initialTrainPlanningState({
    goalRemaining: ['goal'],
    goalMaximumDiversionRounds: 2,
  }),
  seed: 'goal-first',
  maximumDepth: 2,
  maximumMilliseconds: 1000,
})
assert.equal(directGoal.candidate.candidateId, 'goal', 'general diversity delayed an immediately reachable story-action token')
assert.equal(directGoal.score.goalComplete, true)
assert.equal(directGoal.score.roundsToGoal, 1)

const goalCooldown = initialTrainPlanningState({
  targetHistory: [['word:goal', 'surface:goal']],
  lastWordKeys: ['goal'],
  goalRemaining: ['goal'],
  goalMaximumDiversionRounds: 2,
})
const bridgeToGoal = planTrainFuture({
  proposals: [tempting, goal],
  planningState: goalCooldown,
  seed: 'one-safe-bridge',
  maximumDepth: 3,
  maximumMilliseconds: 1000,
})
assert.equal(bridgeToGoal.candidate.candidateId, 'tempting')
assert.deepEqual(bridgeToGoal.plan.map(({ candidateId }) => candidateId).slice(0, 2), ['tempting', 'goal'])
assert.equal(bridgeToGoal.score.roundsToGoal, 2)
const exhaustedGoal = transitionTrainPlanningState(
  transitionTrainPlanningState(goalCooldown, tempting, 'miss'),
  proposal('second-diversion', { words: ['second'] }),
  'miss',
)
assert.ok(trainCandidateEligibility(exhaustedGoal, proposal('third-diversion', { words: ['third'] })).reasons
  .includes('goal-grind-budget-exhausted'))

console.log(`✓ robust dynamic programming planned ${deep.plan.length} rounds ahead across correct/miss branches with ${deep.score.distinctTargets} targets and explicit caught-up proofs.`)
