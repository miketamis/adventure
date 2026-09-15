// Dependency-free description of the production planner. Progression and
// debug registries can expose this contract without eagerly loading the full
// dynamic-programming implementation and its balancing dependencies.

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const TRAIN_FUTURE_PLANNER_POLICY = deepFreeze({
  version: 1,
  algorithm: 'state-deduplicated beam dynamic programming with iterative horizon expansion',
  execution: 'plan as far as the explicit budgets permit, present one activity, observe its outcome, then replan',
  outcomes: ['correct', 'miss'],
  outcomeAggregation: 'a miss only adds a remediation route, so dominance pruning uses the correct branch as the robust lower bound and separately plans the miss branch',
  maximumDepth: 24,
  minimumUsefulDepth: 2,
  runtime: {
    maximumStates: 24000,
    maximumMilliseconds: 32,
    branchLimitAfterRoot: 14,
    beamWidth: 64,
    rootIncludesEveryEligibleCandidate: true,
  },
  hardConstraints: [
    'builder-certified question',
    'no consecutive shared Albanian word',
    'no consecutive shared target',
    'phrase target cannot repeat its preceding phrase activity',
    'exact-word and shared-surface cooldowns',
    'remediation may return only after a disjoint round',
    'a missing story-action word receives a token opportunity within every eight completed activities',
  ],
  lexicographicObjectives: [
    'shortest safe completion of the requested story action within its grind budget',
    'maximum robust reachable depth',
    'serve due remediation',
    'preserve the smallest future branching reserve',
    'distinct tested targets',
    'distinct Albanian surfaces and words',
    'distinct learning aspects',
    'distinct evidence tracks',
    'distinct modalities',
    'distinct activity families',
    'distinct activity formats',
    'distinct difficulty bands',
    'diminishing-return novelty across every dimension',
    'estimated forgetting risk',
    'deterministic seeded tie-break',
  ],
  caughtUpProof: 'every certified proposal must carry an explicit hard-constraint rejection when no root activity is legal',
})
