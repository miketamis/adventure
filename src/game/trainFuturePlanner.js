// Future-aware Train scheduler. It performs bounded, memoized dynamic
// programming over the complete buildable proposal pool, plans both correct
// and missed outcomes, commits one card, and is run again from the real state.

import {
  trainTargetBalancePlan,
} from './trainActivityBalance.js'
import {
  normalizeTrainActivityHistory,
  normalizeTrainTargetHistory,
  recordTrainActivity,
  recordTrainTargets,
} from './trainActivityHistory.js'
import { TRAIN_ACTION_GOAL_POLICY } from './trainActionGoalPolicy.js'
import { TRAIN_FUTURE_PLANNER_POLICY } from './trainFuturePlannerPolicy.js'

export { TRAIN_FUTURE_PLANNER_POLICY } from './trainFuturePlannerPolicy.js'

const intersects = (left, right) => {
  const rightSet = right instanceof Set ? right : new Set(right || [])
  return (left || []).some((value) => rightSet.has(value))
}

const pendingKey = (targetKeys) => [...new Set(targetKeys || [])].sort().join('+')

const normalizePendingRemediations = (value) => {
  const byKey = new Map()
  for (const item of value || []) {
    const targetKeys = [...new Set(item?.targetKeys || [])].filter(Boolean).sort()
    if (!targetKeys.length) continue
    byKey.set(pendingKey(targetKeys), {
      targetKeys,
      disjointRounds: Math.max(0, Number(item.disjointRounds) || 0),
    })
  }
  return [...byKey.values()].sort((left, right) => pendingKey(left.targetKeys).localeCompare(pendingKey(right.targetKeys)))
}

export function initialTrainPlanningState({
  currentRound = 0,
  activityHistory = [],
  targetHistory = [],
  lastWordKeys = [],
  pendingRemediations = [],
  goalRemaining = [],
  alternateGoalRemaining = [],
  goalMaximumDiversionRounds = 0,
  goalDiversionsUsed = 0,
} = {}) {
  return {
    currentRound: Math.max(0, Number(currentRound) || 0),
    activityHistory: normalizeTrainActivityHistory(activityHistory),
    targetHistory: normalizeTrainTargetHistory(targetHistory),
    lastWordKeys: [...new Set(lastWordKeys || [])].sort(),
    pendingRemediations: normalizePendingRemediations(pendingRemediations),
    goalRemaining: [...new Set(goalRemaining || [])].filter(Boolean).sort(),
    alternateGoalRemaining: [...new Set(alternateGoalRemaining || [])].filter(Boolean).sort(),
    goalMaximumDiversionRounds: Math.max(0, Number(goalMaximumDiversionRounds) || 0),
    goalDiversionsUsed: Math.max(0, Number(goalDiversionsUsed) || 0),
  }
}

const projectedRemediation = (state, proposal) => state.pendingRemediations.some((pending) =>
  pending.disjointRounds >= 1 && intersects(pending.targetKeys, proposal.targetKeys))

export function trainCandidateEligibility(state, proposal) {
  const reasons = []
  if (!proposal?.buildabilityCertificate?.valid) reasons.push('missing-builder-certificate')
  if (!proposal?.activityTypeId) reasons.push('missing-activity-type')
  if (!proposal?.targetKeys?.length) reasons.push('missing-target-identity')
  if (!proposal?.wordKeys?.length) reasons.push('missing-albanian-surface')
  if (intersects(proposal?.wordKeys, state.lastWordKeys)) reasons.push('shares-word-with-previous-activity')
  const previousTargets = state.targetHistory.at(-1) || []
  if (intersects(proposal?.targetKeys, previousTargets)) reasons.push('shares-target-with-previous-activity')

  const isPhrase = proposal?.route === 'phrase'
  const targetPlan = proposal?.targetKeys?.length
    ? trainTargetBalancePlan([proposal], state.targetHistory, {
        excludePreviousPhrase: isPhrase,
        remediationOf: () => proposal.remediation === true || projectedRemediation(state, proposal),
      })
    : null
  const targetStatus = targetPlan?.candidates?.[0]?.status || null
  const targetDecision = targetPlan?.candidates?.[0] || null
  const contributesToGoal = intersects(proposal?.rewardIds, state.goalRemaining)
  const goalEmergency = state.goalRemaining.length > 0 &&
    state.goalMaximumDiversionRounds > 0 &&
    state.goalDiversionsUsed >= state.goalMaximumDiversionRounds
  const goalBridgeReady = contributesToGoal &&
    targetDecision?.exactWordInterveningTargets >= TRAIN_ACTION_GOAL_POLICY.minimumInterveningActivities &&
    targetDecision?.surfaceInterveningTargets >= TRAIN_ACTION_GOAL_POLICY.minimumInterveningActivities
  if (targetStatus === 'rejected-previous-phrase-activity') reasons.push('repeats-previous-phrase-target')
  if (targetStatus === 'rejected-target-cooldown' && !goalBridgeReady && !goalEmergency) reasons.push('target-cooldown')
  if (
    state.goalRemaining.length &&
    state.goalMaximumDiversionRounds > 0 &&
    goalEmergency &&
    !contributesToGoal
  ) reasons.push('goal-grind-budget-exhausted')

  return {
    eligible: reasons.length === 0,
    reasons,
    targetStatus,
    projectedRemediation: projectedRemediation(state, proposal),
    goalContribution: contributesToGoal,
    goalEmergency,
    goalCooldownOverride: targetStatus === 'rejected-target-cooldown' && (goalBridgeReady || goalEmergency),
  }
}

export function eligibleTrainCandidates(state, proposals) {
  const decisions = (proposals || []).map((proposal) => ({
    proposal,
    eligibility: trainCandidateEligibility(state, proposal),
  }))
  return {
    eligible: decisions.filter(({ eligibility }) => eligibility.eligible),
    decisions,
  }
}

export function transitionTrainPlanningState(state, proposal, outcome) {
  const correct = outcome === 'correct'
  const offersGoalToken = intersects(proposal.rewardIds, state.goalRemaining)
  const nextPending = []
  for (const pending of state.pendingRemediations) {
    if (correct && intersects(pending.targetKeys, proposal.targetKeys)) continue
    nextPending.push({
      ...pending,
      disjointRounds: pending.disjointRounds + (intersects(pending.targetKeys, proposal.targetKeys) ? 0 : 1),
    })
  }
  if (!correct) {
    const key = pendingKey(proposal.targetKeys)
    const existingIndex = nextPending.findIndex((pending) => pendingKey(pending.targetKeys) === key)
    const remediation = { targetKeys: [...proposal.targetKeys], disjointRounds: 0 }
    if (existingIndex >= 0) nextPending[existingIndex] = remediation
    else nextPending.push(remediation)
  }
  return initialTrainPlanningState({
    currentRound: state.currentRound + 1,
    activityHistory: recordTrainActivity(state.activityHistory, proposal.activityTypeId),
    targetHistory: recordTrainTargets(state.targetHistory, proposal.targetKeys),
    lastWordKeys: proposal.wordKeys,
    pendingRemediations: nextPending,
    goalRemaining: correct
      ? state.goalRemaining.filter((id) => !(proposal.rewardIds || []).includes(id))
      : state.goalRemaining,
    alternateGoalRemaining: correct
      ? state.alternateGoalRemaining.filter((id) => !(proposal.rewardIds || []).includes(id))
      : state.alternateGoalRemaining,
    goalMaximumDiversionRounds: state.goalMaximumDiversionRounds,
    goalDiversionsUsed: offersGoalToken ? 0 : state.goalDiversionsUsed + 1,
  })
}

const dimensionValues = (proposal) => ({
  target: proposal.targetKeys || [],
  word: proposal.wordKeys || [],
  aspect: proposal.aspectIds || [],
  evidence: [proposal.evidenceTrack].filter(Boolean),
  modality: [proposal.modality].filter(Boolean),
  family: [proposal.familyId].filter(Boolean),
  activity: [proposal.activityTypeId].filter(Boolean),
  difficulty: [proposal.difficulty?.label || proposal.difficulty?.tier].filter((value) => value != null),
})

const noveltyForPlan = (path, initialState) => {
  const counts = {
    target: initialState.targetHistory.flat().reduce((map, value) => map.set(value, (map.get(value) || 0) + 1), new Map()),
    activity: initialState.activityHistory.reduce((map, value) => map.set(value, (map.get(value) || 0) + 1), new Map()),
  }
  let novelty = 0
  for (const proposal of path) {
    for (const [dimension, values] of Object.entries(dimensionValues(proposal))) {
      const dimensionCounts = counts[dimension] || (counts[dimension] = new Map())
      for (const value of new Set(values)) {
        const count = dimensionCounts.get(value) || 0
        novelty += 1 / (1 + count)
        dimensionCounts.set(value, count + 1)
      }
    }
  }
  return novelty
}

const distinctCount = (path, dimension) => new Set(path.flatMap((proposal) =>
  dimensionValues(proposal)[dimension])).size

const repeatedActivityCount = (path, initialState) => {
  let previous = initialState.activityHistory.at(-1) || null
  let repeats = 0
  for (const proposal of path) {
    if (previous === proposal.activityTypeId) repeats++
    previous = proposal.activityTypeId
  }
  return repeats
}

export function trainPlanScore(path, initialState, minimumBranching = 0) {
  const originalGoal = new Set(initialState.goalRemaining || [])
  const goalRemaining = new Set(originalGoal)
  const alternateGoalRemaining = new Set(initialState.alternateGoalRemaining || [])
  let roundsToGoal = goalRemaining.size ? null : 0
  let firstGoalProgressRound = null
  let firstAlternateGoalProgressRound = null
  let goalProgressRounds = 0
  path.forEach((proposal, index) => {
    const before = goalRemaining.size
    for (const id of proposal.rewardIds || []) goalRemaining.delete(id)
    if (goalRemaining.size < before) {
      goalProgressRounds++
      if (firstGoalProgressRound == null) firstGoalProgressRound = index + 1
    }
    const alternateBefore = alternateGoalRemaining.size
    for (const id of proposal.rewardIds || []) alternateGoalRemaining.delete(id)
    if (alternateGoalRemaining.size < alternateBefore && firstAlternateGoalProgressRound == null) {
      firstAlternateGoalProgressRound = index + 1
    }
    if (roundsToGoal == null && goalRemaining.size === 0) roundsToGoal = index + 1
  })
  const goalActive = originalGoal.size > 0
  const goalProgress = originalGoal.size - goalRemaining.size
  const goalDiversions = goalActive
    ? initialState.goalDiversionsUsed + (roundsToGoal ?? path.length) - goalProgressRounds
    : 0
  const goalExcessDiversions = Math.max(0, goalDiversions - (initialState.goalMaximumDiversionRounds || 0))
  const remediation = path.filter((proposal) => proposal.remediation || proposal.projectedRemediation).length
  const forgettingRisk = path.reduce((sum, proposal) => sum + (proposal.urgency?.forgettingRisk || 0), 0)
  const expectedLearningGain = path.reduce((sum, proposal) => sum + (proposal.urgency?.expectedLearningGain || 0), 0)
  const uncertaintyReduction = path.reduce((sum, proposal) => sum + (proposal.urgency?.uncertaintyReduction || 0), 0)
  const score = {
    goalActive,
    goalComplete: goalActive && goalRemaining.size === 0,
    goalProgress,
    goalRequired: originalGoal.size,
    roundsToGoal,
    firstGoalProgressRound,
    firstAlternateGoalProgressRound,
    goalDiversions,
    goalExcessDiversions,
    robustDepth: path.length,
    remediation,
    minimumBranching,
    distinctTargets: distinctCount(path, 'target'),
    distinctWords: distinctCount(path, 'word'),
    distinctAspects: distinctCount(path, 'aspect'),
    distinctEvidenceTracks: distinctCount(path, 'evidence'),
    distinctModalities: distinctCount(path, 'modality'),
    distinctFamilies: distinctCount(path, 'family'),
    distinctActivityTypes: distinctCount(path, 'activity'),
    distinctDifficulties: distinctCount(path, 'difficulty'),
    novelty: noveltyForPlan(path, initialState),
    expectedLearningGain,
    uncertaintyReduction,
    forgettingRisk,
    repeatedActivities: repeatedActivityCount(path, initialState),
  }
  score.vector = [
    score.goalActive ? (score.goalComplete ? 1 : 0) : 0,
    score.goalActive ? score.goalProgress : 0,
    score.goalActive ? -score.goalExcessDiversions : 0,
    score.goalActive ? -(score.roundsToGoal ?? 1000000) : 0,
    score.goalActive ? -(score.firstGoalProgressRound ?? 1000000) : 0,
    (initialState.alternateGoalRemaining || []).length
      ? -(score.firstAlternateGoalProgressRound ?? 1000000)
      : 0,
    score.robustDepth,
    score.remediation,
    score.minimumBranching,
    score.distinctTargets,
    score.distinctWords,
    score.distinctAspects,
    score.distinctEvidenceTracks,
    score.distinctModalities,
    score.distinctFamilies,
    score.distinctActivityTypes,
    score.distinctDifficulties,
    Math.round(score.novelty * 1e6),
    Math.round(score.expectedLearningGain * 1e6),
    Math.round(score.uncertaintyReduction * 1e6),
    Math.round(score.forgettingRisk * 1e6),
    -score.repeatedActivities,
  ]
  return score
}

const compareVectors = (left, right) => {
  const length = Math.max(left?.length || 0, right?.length || 0)
  for (let index = 0; index < length; index++) {
    const difference = (left?.[index] || 0) - (right?.[index] || 0)
    if (difference) return difference
  }
  return 0
}

const tieRank = (candidateId, seed) => {
  let hash = 2166136261
  for (const character of `${seed}|${candidateId}`) {
    hash ^= character.codePointAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

const compareSolutions = (left, right, seed) => {
  if (!right) return 1
  const scoreDifference = compareVectors(left.score.vector, right.score.vector)
  if (scoreDifference) return scoreDifference
  const leftRank = tieRank(left.path[0]?.candidateId || '', seed)
  const rightRank = tieRank(right.path[0]?.candidateId || '', seed)
  if (leftRank !== rightRank) return rightRank - leftRank
  return String(right.path[0]?.candidateId || '').localeCompare(String(left.path[0]?.candidateId || ''))
}

const stateSignature = (state) => JSON.stringify([
  state.activityHistory,
  state.targetHistory,
  state.lastWordKeys,
  state.pendingRemediations,
  state.goalRemaining,
  state.alternateGoalRemaining,
  state.goalMaximumDiversionRounds,
  state.goalDiversionsUsed,
])

const effectiveProposal = (proposal, eligibility) => eligibility.projectedRemediation
  ? {
      ...proposal,
      remediation: true,
      projectedRemediation: true,
      urgency: { ...proposal.urgency, remediation: true },
    }
  : proposal

const oneStepRank = (proposal, state, seed) => {
  const score = trainPlanScore([proposal], state, 0)
  return { proposal, score, tie: tieRank(proposal.candidateId, seed) }
}

const orderedFrontier = (eligible, state, depthFromRoot, seed, branchLimit) => {
  const ranked = eligible.map(({ proposal, eligibility }) =>
    oneStepRank(effectiveProposal(proposal, eligibility), state, seed))
    .sort((left, right) =>
      compareVectors(right.score.vector, left.score.vector) || left.tie - right.tie ||
      left.proposal.candidateId.localeCompare(right.proposal.candidateId))
  return depthFromRoot === 0 ? ranked : ranked.slice(0, branchLimit)
}

function beamDynamicProgram({
  proposals,
  startState,
  scoreOrigin,
  depth,
  seed,
  budget,
  branchLimit,
  beamWidth,
  rootIncludesEveryCandidate = false,
  deduplicateStates = true,
}) {
  let layer = [{ state: startState, path: [], minimumBranching: Infinity }]
  let best = { path: [], score: trainPlanScore([], scoreOrigin, 0), minimumBranching: 0 }
  let completedDepth = 0
  let stopReason = 'maximum-depth'
  let memoHits = 0

  for (let step = 0; step < depth; step++) {
    if (Date.now() > budget.deadline) {
      stopReason = 'time-budget'
      break
    }
    const nextByState = new Map()
    let anyExpansion = false
    for (const node of layer) {
      const eligibility = eligibleTrainCandidates(node.state, proposals)
      const frontier = orderedFrontier(
        eligibility.eligible,
        node.state,
        rootIncludesEveryCandidate && step === 0 ? 0 : 1,
        seed,
        branchLimit,
      )
      for (const { proposal } of frontier) {
        if (budget.states >= budget.maximumStates) {
          stopReason = 'state-budget'
          break
        }
        if (Date.now() > budget.deadline) {
          stopReason = 'time-budget'
          break
        }
        anyExpansion = true
        budget.states++
        // A miss cannot remove a legal continuation in this scheduling model;
        // it only unlocks a high-priority remediation after one disjoint round.
        // Therefore the correct transition is the robust lower bound. The miss
        // branch is planned separately for the selected root below.
        const nextState = transitionTrainPlanningState(node.state, proposal, 'correct')
        const path = [...node.path, proposal]
        const minimumBranching = Math.min(node.minimumBranching, frontier.length)
        const candidate = {
          state: nextState,
          path,
          minimumBranching,
          score: trainPlanScore(path, scoreOrigin, minimumBranching),
        }
        // Beam search merges equivalent scheduler states to stretch its live
        // horizon. The exact oracle deliberately keeps every distinct path:
        // novelty depends on the complete path, not only the truncated recent
        // histories in the scheduler state.
        const signature = deduplicateStates
          ? stateSignature(nextState)
          : path.map(({ candidateId }) => candidateId).join('\u0000')
        const existing = nextByState.get(signature)
        if (!existing || compareSolutions(candidate, existing, seed) > 0) {
          if (existing) memoHits++
          nextByState.set(signature, candidate)
        } else {
          memoHits++
        }
      }
      if (stopReason !== 'maximum-depth') break
    }
    if (stopReason !== 'maximum-depth') break
    if (!anyExpansion || !nextByState.size) {
      stopReason = 'natural-exhaustion'
      break
    }
    layer = [...nextByState.values()]
      .sort((left, right) => compareSolutions(right, left, seed))
      .slice(0, beamWidth)
    best = layer[0]
    completedDepth = step + 1
  }
  return { solution: best, completedDepth, stopReason, memoHits }
}

export function trainPlanConstraintReport(path = [], planningState = initialTrainPlanningState()) {
  let state = planningState
  const violations = []
  path.forEach((proposal, index) => {
    const eligibility = trainCandidateEligibility(state, proposal)
    if (!eligibility.eligible) violations.push({
      round: index + 1,
      candidateId: proposal?.candidateId || null,
      reasons: eligibility.reasons,
    })
    state = transitionTrainPlanningState(state, proposal, 'correct')
  })
  return { valid: violations.length === 0, violations, finalState: state }
}

export function planTrainFutureExact({
  proposals = [],
  planningState = initialTrainPlanningState(),
  seed = '',
  maximumDepth = TRAIN_FUTURE_PLANNER_POLICY.exactOracle.maximumDepth,
  maximumStates = TRAIN_FUTURE_PLANNER_POLICY.exactOracle.maximumStates,
  maximumMilliseconds = TRAIN_FUTURE_PLANNER_POLICY.exactOracle.maximumMilliseconds,
} = {}) {
  const startedAt = Date.now()
  const policy = TRAIN_FUTURE_PLANNER_POLICY.exactOracle
  if (proposals.length > policy.maximumCandidates) return {
    available: false,
    reason: 'candidate-limit',
    candidate: null,
    plan: [],
    score: null,
    trace: { candidateCount: proposals.length, maximumCandidates: policy.maximumCandidates },
  }
  const depth = Math.max(1, Math.min(policy.maximumDepth, Number(maximumDepth) || policy.maximumDepth))
  const rootEligibility = eligibleTrainCandidates(planningState, proposals)
  if (!rootEligibility.eligible.length) return {
    available: true,
    reason: proposals.length ? 'natural-exhaustion' : 'no-buildable-proposals',
    candidate: null,
    plan: [],
    score: trainPlanScore([], planningState, 0),
    trace: {
      candidateCount: proposals.length,
      rootEligibleCount: 0,
      completedDepth: 0,
      statesExplored: 0,
      elapsedMilliseconds: Date.now() - startedAt,
    },
  }
  const budget = {
    maximumStates: Math.max(1, Math.min(policy.maximumStates, Number(maximumStates) || policy.maximumStates)),
    deadline: startedAt + Math.max(1, Math.min(policy.maximumMilliseconds, Number(maximumMilliseconds) || policy.maximumMilliseconds)),
    states: 0,
  }
  const exact = beamDynamicProgram({
    proposals,
    startState: planningState,
    scoreOrigin: planningState,
    depth,
    seed,
    budget,
    branchLimit: Math.max(1, proposals.length),
    beamWidth: budget.maximumStates,
    rootIncludesEveryCandidate: true,
    deduplicateStates: false,
  })
  const complete = exact.stopReason === 'natural-exhaustion' ||
    (exact.stopReason === 'maximum-depth' && exact.completedDepth === depth)
  return {
    available: complete,
    reason: complete ? 'exact' : exact.stopReason,
    candidate: complete ? exact.solution.path[0] || null : null,
    plan: complete ? exact.solution.path : [],
    score: complete ? exact.solution.score : null,
    trace: {
      candidateCount: proposals.length,
      rootEligibleCount: rootEligibility.eligible.length,
      requestedDepth: depth,
      completedDepth: exact.completedDepth,
      stopReason: exact.stopReason,
      statesExplored: budget.states,
      memoHits: exact.memoHits,
      elapsedMilliseconds: Date.now() - startedAt,
    },
  }
}

export function trainPlannerOracleReport(approximate, oracle, planningState = initialTrainPlanningState()) {
  if (!oracle?.available) return {
    available: false,
    reason: oracle?.reason || 'oracle-unavailable',
  }
  const approximateScore = approximate?.score || trainPlanScore([], planningState, 0)
  const oracleScore = oracle.score || trainPlanScore([], planningState, 0)
  const approximateDepth = approximate?.trace?.completedDepth ?? approximate?.plan?.length ?? 0
  const oracleDepth = oracle?.trace?.completedDepth ?? oracle?.plan?.length ?? 0
  const scoreComparable = approximateDepth === oracleDepth
  const firstDifference = scoreComparable
    ? TRAIN_FUTURE_PLANNER_POLICY.scoreVectorObjectives.findIndex((_, index) =>
      (approximateScore.vector[index] || 0) !== (oracleScore.vector[index] || 0))
    : -1
  const oracleAdvantage = scoreComparable ? compareVectors(oracleScore.vector, approximateScore.vector) : null
  const constraints = trainPlanConstraintReport(approximate?.plan || [], planningState)
  const diversityKeys = [
    'distinctTargets', 'distinctWords', 'distinctAspects', 'distinctEvidenceTracks',
    'distinctModalities', 'distinctFamilies', 'distinctActivityTypes', 'distinctDifficulties',
  ]
  return {
    available: true,
    firstChoiceMatch: (approximate?.candidate?.candidateId || null) === (oracle.candidate?.candidateId || null),
    avoidableCaughtUp: !approximate?.candidate && Boolean(oracle.candidate),
    hardConstraintViolations: constraints.violations,
    hardConstraintsValid: constraints.valid,
    scoreComparable,
    comparedDepth: scoreComparable ? oracleDepth : null,
    approximateDepth,
    oracleDepth,
    scoreParity: scoreComparable ? oracleAdvantage === 0 : null,
    lexicographicRegret: oracleAdvantage > 0 && firstDifference >= 0 ? {
      objective: TRAIN_FUTURE_PLANNER_POLICY.scoreVectorObjectives[firstDifference],
      approximate: approximateScore.vector[firstDifference] || 0,
      oracle: oracleScore.vector[firstDifference] || 0,
      delta: (oracleScore.vector[firstDifference] || 0) - (approximateScore.vector[firstDifference] || 0),
    } : null,
    diversityDelta: scoreComparable ? Object.fromEntries(diversityKeys.map((key) => [key,
      (oracleScore[key] || 0) - (approximateScore[key] || 0)])) : null,
    approximateCandidateId: approximate?.candidate?.candidateId || null,
    oracleCandidateId: oracle.candidate?.candidateId || null,
  }
}

const rejectionSummary = (decisions) => decisions.reduce((summary, { proposal, eligibility }) => {
  for (const reason of eligibility.reasons) summary[reason] = (summary[reason] || 0) + 1
  if (!eligibility.reasons.length) summary.eligible = (summary.eligible || 0) + 1
  summary.byCandidate.push({
    candidateId: proposal.candidateId,
    eligible: eligibility.eligible,
    reasons: eligibility.reasons,
  })
  return summary
}, { byCandidate: [] })

export function planTrainFuture({
  proposals = [],
  planningState = initialTrainPlanningState(),
  seed = '',
  maximumDepth = TRAIN_FUTURE_PLANNER_POLICY.maximumDepth,
  maximumStates = TRAIN_FUTURE_PLANNER_POLICY.runtime.maximumStates,
  maximumMilliseconds = TRAIN_FUTURE_PLANNER_POLICY.runtime.maximumMilliseconds,
  branchLimit = TRAIN_FUTURE_PLANNER_POLICY.runtime.branchLimitAfterRoot,
  beamWidth = TRAIN_FUTURE_PLANNER_POLICY.runtime.beamWidth,
} = {}) {
  const startedAt = Date.now()
  const rootEligibility = eligibleTrainCandidates(planningState, proposals)
  const rejectionProof = rejectionSummary(rootEligibility.decisions)
  if (!rootEligibility.eligible.length) {
    return {
      candidate: null,
      plan: [],
      outcomePlans: null,
      score: trainPlanScore([], planningState, 0),
      trace: {
        policy: TRAIN_FUTURE_PLANNER_POLICY,
        requestedDepth: 0,
        completedDepth: 0,
        stopReason: proposals.length ? 'natural-exhaustion' : 'no-buildable-proposals',
        candidateCount: proposals.length,
        rootEligibleCount: 0,
        rejectionProof,
        statesExplored: 0,
        memoHits: 0,
        elapsedMilliseconds: Date.now() - startedAt,
      },
    }
  }

  const depthLimit = Math.max(1, Math.min(
    TRAIN_FUTURE_PLANNER_POLICY.maximumDepth,
    Number(maximumDepth) || TRAIN_FUTURE_PLANNER_POLICY.maximumDepth,
  ))
  const budget = {
    maximumStates: Math.max(1, Number(maximumStates) || TRAIN_FUTURE_PLANNER_POLICY.runtime.maximumStates),
    deadline: startedAt + Math.max(1, Number(maximumMilliseconds) || TRAIN_FUTURE_PLANNER_POLICY.runtime.maximumMilliseconds),
    states: 0,
    memoHits: 0,
  }
  const robust = beamDynamicProgram({
    proposals,
    startState: planningState,
    scoreOrigin: planningState,
    depth: depthLimit,
    seed,
    budget,
    branchLimit: Math.max(1, Number(branchLimit) || TRAIN_FUTURE_PLANNER_POLICY.runtime.branchLimitAfterRoot),
    beamWidth: Math.max(1, Number(beamWidth) || TRAIN_FUTURE_PLANNER_POLICY.runtime.beamWidth),
    rootIncludesEveryCandidate: true,
  })
  budget.memoHits += robust.memoHits
  let best = robust.solution
  let completedDepth = robust.completedDepth
  let stopReason = robust.stopReason

  // Depth one normally fits before any wider beam work. Retain a deterministic,
  // constraint-valid fallback even on an exceptionally slow device.
  if (!best?.path.length) {
    const fallback = orderedFrontier(rootEligibility.eligible, planningState, 0, seed, 1)[0]?.proposal || null
    best = {
      path: fallback ? [fallback] : [],
      score: trainPlanScore(fallback ? [fallback] : [], planningState, rootEligibility.eligible.length),
    }
    if (fallback) completedDepth = Math.max(1, completedDepth)
  }
  const selected = best.path[0] || null
  const remainingDepth = Math.max(0, completedDepth - 1)
  const correctPath = best.path.slice(1)
  let missPath = []
  let missScore = trainPlanScore([], planningState, 0)
  if (selected && remainingDepth > 0 && Date.now() <= budget.deadline && budget.states < budget.maximumStates) {
    const miss = beamDynamicProgram({
      proposals,
      startState: transitionTrainPlanningState(planningState, selected, 'miss'),
      scoreOrigin: planningState,
      depth: remainingDepth,
      seed: `${seed}|root-miss`,
      budget,
      branchLimit: Math.max(1, Number(branchLimit) || TRAIN_FUTURE_PLANNER_POLICY.runtime.branchLimitAfterRoot),
      beamWidth: Math.max(1, Number(beamWidth) || TRAIN_FUTURE_PLANNER_POLICY.runtime.beamWidth),
    })
    missPath = miss.solution.path
    missScore = trainPlanScore([selected, ...missPath], planningState, miss.solution.minimumBranching)
    budget.memoHits += miss.memoHits
  }
  const outcomePlans = selected ? {
    correct: { path: correctPath, score: trainPlanScore([selected, ...correctPath], planningState, best.minimumBranching) },
    miss: { path: missPath, score: missScore },
    robustOutcome: 'correct',
    dominanceReason: 'miss adds remediation eligibility and never removes a legal activity',
  } : null
  return {
    candidate: selected,
    plan: best.path,
    outcomePlans,
    score: best.score,
    trace: {
      policy: TRAIN_FUTURE_PLANNER_POLICY,
      requestedDepth: depthLimit,
      completedDepth,
      stopReason,
      candidateCount: proposals.length,
      rootEligibleCount: rootEligibility.eligible.length,
      rejectionProof,
      statesExplored: budget.states,
      memoHits: budget.memoHits,
      elapsedMilliseconds: Date.now() - startedAt,
      selectedCandidateId: selected?.candidateId || null,
      robustPlanCandidateIds: best.path.map(({ candidateId }) => candidateId),
      correctPlanCandidateIds: correctPath.map(({ candidateId }) => candidateId),
      missPlanCandidateIds: missPath.map(({ candidateId }) => candidateId),
      score: best.score,
    },
  }
}
