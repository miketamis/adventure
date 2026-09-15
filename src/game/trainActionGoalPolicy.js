// Dependency-free policy shared by the scheduler, progression registry, and
// goal-state reducer. Keeping it separate prevents debug/progression metadata
// from pulling the complete story graph into the state-mechanics chunk.

export const TRAIN_ACTION_GOAL_POLICY = Object.freeze({
  version: 2,
  priority: 'shortest safe path to fund the exact requested story action, then diversity',
  tokenRequirement: 'one available token for every distinct trainable sense in the action',
  minimumInterveningActivities: 1,
  maximumActivitiesPerTokenOpportunity: 8,
  maximumNonGoalActivitiesBeforeForcedOpportunity: 7,
  zeroTokenFallback: 'a buildable missing action word remains eligible even when ordinary spacing would otherwise show caught-up',
  budgetRule: 'after seven completed activities without a question that can award a missing action token, the eighth question must target one of those words',
  emergencyOverrides: Object.freeze([
    'elapsed and round due spacing',
    'target cooldown',
    'surface frequency cap',
    'activity-format balance',
    'general diversity score',
  ]),
  emergencyNeverOverrides: Object.freeze([
    'builder validity and reviewed content',
    'no consecutive shared Albanian word',
  ]),
  completion: 'the existing canonical canSpeak and practice-return checks remain authoritative',
})
