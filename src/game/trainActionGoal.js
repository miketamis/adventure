// A Train session opened from a locked story action has an explicit destination:
// earn one token for each still-unfunded word in that exact Albanian action.
// The future planner uses this contract before general diversity objectives so
// variety never turns a focused hand-off into an indefinite grind.

import { isTrainableSense } from './lexicalTrainability.js'
import { resolveTrainingTarget } from './trainingTarget.js'
import { TRAIN_ACTION_GOAL_POLICY } from './trainActionGoalPolicy.js'

export { TRAIN_ACTION_GOAL_POLICY } from './trainActionGoalPolicy.js'

const safeCount = (value) => Number.isSafeInteger(value) && value >= 0 ? value : 0
const targetIdentity = (target) => target && typeof target === 'object'
  ? `${target.nodeId || ''}|${target.optionIdentity || ''}`
  : ''

export function trainActionGoalForState(state) {
  const option = resolveTrainingTarget(state?.practiceTarget)
  if (!option) return null
  const requiredWordIds = [...new Set((option.text || [])
    .map((token) => token?.id)
    .filter((id) => typeof id === 'string' && isTrainableSense(id)))]
  const remainingWordIds = requiredWordIds.filter((id) => (state?.mana?.[id] || 0) < 1)
  return {
    policyVersion: TRAIN_ACTION_GOAL_POLICY.version,
    target: state.practiceTarget,
    requiredWordIds,
    remainingWordIds,
    fundedWordIds: requiredWordIds.filter((id) => !remainingWordIds.includes(id)),
    requiredTokenCount: requiredWordIds.length,
    remainingTokenCount: remainingWordIds.length,
    complete: remainingWordIds.length === 0,
    // This is a between-progress limit, not a session-wide allowance. It resets
    // after each required token gain and must not grow with the action length.
    maximumDiversionRounds: TRAIN_ACTION_GOAL_POLICY.maximumNonGoalActivitiesBeforeForcedOpportunity,
  }
}

export const trainActionGoalContribution = (goal, rewardIds = []) => goal
  ? [...new Set(rewardIds || [])].filter((id) => goal.remainingWordIds.includes(id))
  : []

export function normalizeTrainActionGoalSession(value, state) {
  const goal = trainActionGoalForState(state)
  if (!goal) return null
  const matchesTarget = value?.policyVersion === TRAIN_ACTION_GOAL_POLICY.version &&
    targetIdentity(value.target) === targetIdentity(goal.target)
  return {
    policyVersion: TRAIN_ACTION_GOAL_POLICY.version,
    target: goal.target,
    startedAtRound: matchesTarget
      ? safeCount(value.startedAtRound)
      : safeCount(state?.trainRound),
    completedRounds: matchesTarget ? safeCount(value.completedRounds) : 0,
    progressRounds: matchesTarget ? safeCount(value.progressRounds) : 0,
    activitiesSinceGoalOpportunity: matchesTarget ? Math.min(
      safeCount(value.activitiesSinceGoalOpportunity),
      TRAIN_ACTION_GOAL_POLICY.maximumNonGoalActivitiesBeforeForcedOpportunity,
    ) : 0,
  }
}

export function beginTrainActionGoalSession(state, target) {
  return normalizeTrainActionGoalSession(null, { ...state, practiceTarget: target })
}

export function trainActionGoalPriorityTargetIds(state) {
  const goal = trainActionGoalForState(state)
  const session = normalizeTrainActionGoalSession(state?.trainGoalSession, state)
  return goal && session ? goal.remainingWordIds : []
}

export function trainActionGoalEmergencyTargetIds(state) {
  const priorityTargetIds = trainActionGoalPriorityTargetIds(state)
  const session = normalizeTrainActionGoalSession(state?.trainGoalSession, state)
  return priorityTargetIds.length && session &&
    session.activitiesSinceGoalOpportunity >= TRAIN_ACTION_GOAL_POLICY.maximumNonGoalActivitiesBeforeForcedOpportunity
    ? priorityTargetIds
    : []
}

// Apply only after a reducer has accepted one complete Train round. Progress is
// derived from the canonical before/after token state. The opportunity target
// is supplied only after that question has passed its normal reducer checks.
export function recordTrainActionGoalRound(previousState, nextState, rewardIds = []) {
  const beforeGoal = trainActionGoalForState(previousState)
  if (!beforeGoal || !nextState) return nextState
  const session = normalizeTrainActionGoalSession(previousState.trainGoalSession, previousState)
  const afterGoal = trainActionGoalForState(nextState)
  if (!session || !afterGoal) return nextState
  const progress = Math.max(0, beforeGoal.remainingTokenCount - afterGoal.remainingTokenCount)
  const offeredGoalToken = trainActionGoalContribution(beforeGoal, rewardIds).length > 0
  return {
    ...nextState,
    trainGoalSession: {
      ...session,
      completedRounds: session.completedRounds + 1,
      progressRounds: session.progressRounds + (progress > 0 ? 1 : 0),
      activitiesSinceGoalOpportunity: offeredGoalToken
        ? 0
        : Math.min(
            TRAIN_ACTION_GOAL_POLICY.maximumNonGoalActivitiesBeforeForcedOpportunity,
            session.activitiesSinceGoalOpportunity + 1,
          ),
    },
  }
}
