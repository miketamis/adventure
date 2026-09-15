// Dependency-free policy shared by the scheduler, progression registry, and
// goal-state reducer. Keeping it separate prevents debug/progression metadata
// from pulling the complete story graph into the state-mechanics chunk.

export const TRAIN_ACTION_GOAL_POLICY = Object.freeze({
  version: 2,
  priority: 'fund the exact requested story action, then other same-node actions with saved words, then diversity',
  tokenRequirement: 'one available token for every distinct trainable sense in the action',
  minimumInterveningActivities: 1,
  maximumActivitiesPerTokenOpportunity: 8,
  maximumNonGoalActivitiesBeforeForcedOpportunity: 7,
  zeroTokenFallback: 'missing words from the requested action and then other same-node actions remain eligible before Train asks the player to add words',
  terminalMessage: 'Add more words in Story to keep training.',
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
