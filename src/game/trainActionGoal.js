// A Train session opened from a locked story action has an explicit destination:
// earn one token for each still-unfunded word in that exact Albanian action.
// The future planner uses this contract before general diversity objectives so
// variety never turns a focused hand-off into an indefinite grind.

import { isTrainableSense } from './lexicalTrainability.js'
import { resolveTrainingTarget } from './trainingTarget.js'

export const TRAIN_ACTION_GOAL_POLICY = Object.freeze({
  version: 1,
  priority: 'shortest safe path to fund the exact requested story action, then diversity',
  tokenRequirement: 'one available token for every distinct trainable sense in the action',
  minimumInterveningActivities: 1,
  maximumDiversionsBetweenProgress: 2,
  budgetRule: 'at most two non-contributing bridge activities between token gains; misses replan without extending a hidden fixed queue',
  completion: 'the existing canonical canSpeak and practice-return checks remain authoritative',
})

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
    maximumDiversionRounds: Math.max(
      TRAIN_ACTION_GOAL_POLICY.maximumDiversionsBetweenProgress,
      remainingWordIds.length * TRAIN_ACTION_GOAL_POLICY.maximumDiversionsBetweenProgress,
    ),
  }
}

export const trainActionGoalContribution = (goal, rewardIds = []) => goal
  ? [...new Set(rewardIds || [])].filter((id) => goal.remainingWordIds.includes(id))
  : []
