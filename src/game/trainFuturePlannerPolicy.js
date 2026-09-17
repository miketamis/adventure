// Dependency-free description of the production planner. Progression and
// debug registries can expose this contract without eagerly loading the full
// dynamic-programming implementation and its balancing dependencies.

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const TRAIN_FUTURE_PLANNER_POLICY = deepFreeze({
  version: 4,
  algorithm: 'state-deduplicated beam dynamic programming with iterative horizon expansion and a bounded exhaustive oracle',
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
  exactOracle: {
    purpose: 'exhaustively verify planner choice and lexicographic regret on small complete state spaces',
    maximumCandidates: 9,
    maximumDepth: 10,
    maximumStates: 250000,
    maximumMilliseconds: 1000,
    use: 'audit and debug verification; larger live pools retain the rolling-horizon beam budget',
  },
  hardConstraints: [
    'builder-certified question',
    'no consecutive shared Albanian word',
    'no consecutive shared target',
    'phrase target cannot repeat its preceding phrase activity',
    'exact-word and shared-surface cooldowns',
    'remediation may return only after a disjoint round',
    'when alternatives exist, two non-goal activities precede each missing story-action token opportunity',
    'a missing story-action word receives a token opportunity within every eight completed activities',
  ],
  lexicographicObjectives: [
    'after the bounded practice floor, shortest safe completion of the requested story action, then another same-node action whose words are saved',
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
    'local expected learning gain',
    'local uncertainty reduction',
    'estimated forgetting risk',
    'deterministic seeded tie-break',
  ],
  scoreVectorObjectives: [
    'goal-complete', 'goal-progress', 'goal-deadline', 'rounds-to-goal',
    'first-goal-progress', 'first-alternate-action-progress', 'robust-depth', 'remediation', 'branching-reserve',
    'distinct-targets', 'distinct-words', 'distinct-aspects', 'distinct-evidence-tracks',
    'distinct-modalities', 'distinct-families', 'distinct-activity-types',
    'distinct-difficulties', 'novelty', 'expected-learning-gain',
    'uncertainty-reduction', 'forgetting-risk', 'avoid-repeated-activities',
  ],
  personalization: {
    source: 'local per-capability attempts, correctness, lapses, elapsed time, support and difficulty only',
    policy: 'soft late objective after goal safety and diversity; never proof, never a prerequisite, and never a hard-constraint override',
    expectedGain: 'four times estimated recall times one minus estimated recall',
    uncertaintyValues: { high: 1, medium: 0.55, lower: 0.2, unknown: 0 },
  },
  caughtUpProof: 'every certified proposal must carry an explicit hard-constraint rejection when no root activity is legal',
})
