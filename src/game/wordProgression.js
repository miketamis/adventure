// Dependency-free lexical progression shared by Train, saved-state
// normalization and the debug curriculum graph. Recognition is not treated as
// production evidence: every harder stage has its own explicit proof.

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const WORD_PROGRESS_VERSION = 2
export const WORD_MIN_INTERVENING_ROUNDS = 1
export const WORD_INITIAL_REVIEW_GAP = 6
export const WORD_MAX_REVIEW_GAP = 64

export const WORD_STAGE_DEFINITIONS = deepFreeze([
  {
    tier: 0,
    id: 'independent-word-recognition',
    label: 'independent recognition',
    familyId: 'word-meaning',
    mode: 'choice',
    direction: 'al2en',
    variant: { distractors: 3 },
    gate: { wins: 2 },
    proves: 'recognises this Albanian sense among several plausible meanings',
    transition: { correct: 1, wrong: 0 },
  },
  {
    tier: 1,
    id: 'guided-word-selection',
    label: 'guided production',
    familyId: 'word-meaning',
    mode: 'choice',
    direction: 'en2al',
    variant: { distractors: 1 },
    gate: { wins: 1 },
    proves: 'selects the Albanian word from a two-choice English cue',
    transition: { correct: 2, wrongRemediation: 0 },
  },
  {
    tier: 2,
    id: 'independent-word-selection',
    label: 'independent production',
    familyId: 'word-meaning',
    mode: 'choice',
    direction: 'en2al',
    variant: { distractors: 3 },
    gate: { wins: 2 },
    proves: 'selects the Albanian word among several plausible forms',
    transition: { correct: 3, wrongRemediation: 1 },
  },
  {
    tier: 3,
    id: 'supported-word-spelling',
    label: 'supported spelling',
    familyId: 'word-spelling',
    mode: 'type',
    direction: 'en2al',
    answerTolerance: 'beginner',
    gate: { wins: 1 },
    proves: 'recalls and types the word; beginner orthography leeway is allowed',
    transition: { correct: 4, wrongRemediation: 1 },
  },
  {
    tier: 4,
    id: 'retained-word-spelling',
    label: 'retained spelling',
    familyId: 'word-spelling',
    mode: 'type',
    direction: 'en2al',
    answerTolerance: 'strict',
    gate: { kind: 'spaced-retention', initialGapRounds: WORD_INITIAL_REVIEW_GAP, multiplier: 2 },
    proves: 'recalls and spells the word exactly after an expanding review gap',
    transition: { correct: 4, wrongRemediation: 1, maxTierRepeat: true },
  },
])

export const WORD_SKILL_MAX_TIER = WORD_STAGE_DEFINITIONS.length - 1

export const WORD_PROGRESSION_POLICY = deepFreeze({
  version: WORD_PROGRESS_VERSION,
  principle: 'Saving a word completes guided recognition; Train begins with independent recognition, while receptive evidence never skips productive selection or spelling.',
  stageOrder: WORD_STAGE_DEFINITIONS.map(({ id }) => id),
  contextVariant: 'A sense with an authored context uses that context during Albanian-to-English recognition; it does not reveal a fluent translation.',
  formUnlock: {
    afterStage: 3,
    requiredBaseStage: 4,
    rationale: 'Reviewed inflections enter only after the learner has independently produced and typed the lemma.',
  },
  remediation: {
    delayedByDisjointRounds: WORD_MIN_INTERVENING_ROUNDS,
    rule: 'A miss schedules one easier supported retrieval without deleting earlier proofs; success returns to the durable stage.',
  },
  evidenceBoundary: {
    proves: ['word-meaning recognition', 'controlled Albanian selection', 'typed word spelling'],
    doesNotProve: ['listening comprehension', 'spoken interaction', 'free writing', 'CEFR attainment'],
  },
})

const safeCount = (value) => {
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isSafeInteger(numeric) && numeric > 0 ? numeric : 0
}
const safeRound = (value) => Math.max(0, safeCount(value))

export function emptyWordProgress() {
  return {
    wins: {},
    strictWins: 0,
    dueAfterRound: 0,
    reviewGap: WORD_INITIAL_REVIEW_GAP,
    lastAttemptKey: null,
    lastAttemptRound: 0,
    remediation: null,
  }
}

const normalizedWins = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(WORD_STAGE_DEFINITIONS.slice(0, -1).flatMap((definition) => {
    const count = Math.min(definition.gate.wins, safeCount(value[definition.id]))
    return count ? [[definition.id, count]] : []
  }))
}

const normalizedRemediation = (value, currentRound) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const stage = Number(value.stage)
  const returnStage = Number(value.returnStage)
  if (!Number.isInteger(stage) || !Number.isInteger(returnStage) ||
      stage < 0 || stage >= returnStage || returnStage > WORD_SKILL_MAX_TIER) return null
  return {
    stage,
    returnStage,
    reason: ['recognition-miss', 'selection-miss', 'spelling-miss', 'retention-lapse'].includes(value.reason)
      ? value.reason
      : 'recognition-miss',
    dueAfterRound: Math.max(currentRound, safeRound(value.dueAfterRound)),
  }
}

// Version 1 included a redundant two-choice recognition stage at tier 0.
// Existing proof keys remain valid because they are stage IDs, while an active
// remediation stores numeric tiers and therefore needs an explicit remap.
const WORD_STAGE_IDS_V1 = Object.freeze([
  'guided-word-recognition',
  'independent-word-recognition',
  'guided-word-selection',
  'independent-word-selection',
  'supported-word-spelling',
  'retained-word-spelling',
])
const currentTierForStageId = (id) => WORD_STAGE_DEFINITIONS.find(({ id: stageId }) => stageId === id)?.tier

export function migrateWordProgressV1(value, currentRound = 0) {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const remediation = source.remediation && typeof source.remediation === 'object'
    ? source.remediation
    : null
  if (!remediation) return normalizeWordProgress(source, currentRound)

  const stageId = WORD_STAGE_IDS_V1[Number(remediation.stage)]
  const returnStageId = WORD_STAGE_IDS_V1[Number(remediation.returnStage)]
  const stage = currentTierForStageId(stageId)
  const returnStage = currentTierForStageId(returnStageId)
  // Entry support is already supplied by the save-to-vocabulary interaction.
  // Drop only that obsolete repair; the durable gate and its due round remain.
  const migratedRemediation = Number.isInteger(stage) && Number.isInteger(returnStage) && stage < returnStage
    ? { ...remediation, stage, returnStage }
    : null
  return normalizeWordProgress({ ...source, remediation: migratedRemediation }, currentRound)
}

export function normalizeWordProgress(value, currentRound = 0) {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const reviewGap = Math.max(
    WORD_INITIAL_REVIEW_GAP,
    Math.min(WORD_MAX_REVIEW_GAP, safeCount(source.reviewGap) || WORD_INITIAL_REVIEW_GAP),
  )
  const normalized = {
    wins: normalizedWins(source.wins),
    strictWins: safeCount(source.strictWins),
    dueAfterRound: safeRound(source.dueAfterRound),
    reviewGap,
    lastAttemptKey: typeof source.lastAttemptKey === 'string' && source.lastAttemptKey
      ? source.lastAttemptKey.slice(0, 200)
      : null,
    lastAttemptRound: safeRound(source.lastAttemptRound),
    remediation: null,
  }
  normalized.remediation = normalizedRemediation(source.remediation, currentRound)
  return normalized
}

export function wordProgressStage(value) {
  const progress = normalizeWordProgress(value)
  for (const definition of WORD_STAGE_DEFINITIONS.slice(0, -1)) {
    if ((progress.wins[definition.id] || 0) < definition.gate.wins) return definition.tier
  }
  return WORD_SKILL_MAX_TIER
}

export function wordProgressPlan(value, currentRound = 0) {
  const progress = normalizeWordProgress(value, currentRound)
  const baseStage = wordProgressStage(progress)
  const repair = progress.remediation
  const stage = repair?.stage ?? baseStage
  const definition = WORD_STAGE_DEFINITIONS[stage]
  const dueAfterRound = repair?.dueAfterRound ?? progress.dueAfterRound
  return {
    stage,
    tier: stage,
    baseStage,
    definition,
    mode: definition.mode,
    direction: definition.direction,
    answerTolerance: definition.answerTolerance,
    difficultyLabel: definition.label,
    dueAfterRound,
    due: currentRound >= dueAfterRound,
    remediation: Boolean(repair),
    remediationReason: repair?.reason || null,
  }
}

const resultMatchesPlan = (result, plan) => result?.tier === plan.tier &&
  result?.mode === plan.mode && result?.direction === plan.direction

const remediationForFailure = (plan, nextRound) => {
  if (plan.stage === 0) return null
  const guidedSelectionStage = currentTierForStageId('guided-word-selection')
  const stage = plan.stage >= 3 ? guidedSelectionStage : plan.stage - 1
  return {
    stage,
    returnStage: plan.baseStage,
    reason: plan.stage === WORD_SKILL_MAX_TIER
      ? 'retention-lapse'
      : plan.mode === 'type'
        ? 'spelling-miss'
        : plan.direction === 'en2al' ? 'selection-miss' : 'recognition-miss',
    dueAfterRound: nextRound + WORD_MIN_INTERVENING_ROUNDS,
  }
}

// Apply one completed lexical question. Exact plan metadata and a unique key
// prevent stale UI events or forged higher-tier results from skipping gates.
export function advanceWordProgress(value, currentRound = 0, result = {}) {
  const progress = normalizeWordProgress(value, currentRound)
  const plan = wordProgressPlan(progress, currentRound)
  const questionKey = typeof result.questionKey === 'string' ? result.questionKey.slice(0, 200) : ''
  if (!plan.due) return { accepted: false, reason: 'not-due', progress, plan }
  if (!questionKey) return { accepted: false, reason: 'missing-question-key', progress, plan }
  if (questionKey === progress.lastAttemptKey) {
    return { accepted: false, reason: 'duplicate-question', progress, plan }
  }
  if (!resultMatchesPlan(result, plan)) {
    return { accepted: false, reason: 'plan-mismatch', progress, plan }
  }

  const nextRound = Math.max(safeRound(currentRound), safeRound(result.round))
  const next = {
    ...progress,
    wins: { ...progress.wins },
    lastAttemptKey: questionKey,
    lastAttemptRound: nextRound,
  }

  if (!result.correct) {
    if (!plan.remediation && plan.stage < WORD_SKILL_MAX_TIER) {
      // A two-proof gate requires two successful attempts without an
      // intervening miss, but already completed easier gates remain intact.
      delete next.wins[plan.definition.id]
    }
    if (plan.stage === WORD_SKILL_MAX_TIER) {
      next.reviewGap = Math.max(WORD_INITIAL_REVIEW_GAP, Math.floor(next.reviewGap / 2))
    }
    next.remediation = remediationForFailure(plan, nextRound)
    next.dueAfterRound = next.remediation?.dueAfterRound ?? nextRound + WORD_MIN_INTERVENING_ROUNDS
    return { accepted: true, progress: normalizeWordProgress(next, nextRound), plan }
  }

  if (plan.remediation) {
    next.remediation = null
    next.dueAfterRound = nextRound + WORD_MIN_INTERVENING_ROUNDS
  } else if (plan.stage < WORD_SKILL_MAX_TIER) {
    next.wins[plan.definition.id] = Math.min(
      plan.definition.gate.wins,
      (next.wins[plan.definition.id] || 0) + 1,
    )
    next.dueAfterRound = nextRound + (
      wordProgressStage(next) === WORD_SKILL_MAX_TIER
        ? next.reviewGap
        : WORD_MIN_INTERVENING_ROUNDS
    )
  } else {
    next.strictWins += 1
    next.reviewGap = Math.min(WORD_MAX_REVIEW_GAP, next.reviewGap * 2)
    next.dueAfterRound = nextRound + next.reviewGap
  }
  return { accepted: true, progress: normalizeWordProgress(next, nextRound), plan }
}

export function wordProgressionSnapshot(value, currentRound = 0) {
  const progress = normalizeWordProgress(value, currentRound)
  const plan = wordProgressPlan(progress, currentRound)
  return {
    progress,
    next: plan,
    stages: WORD_STAGE_DEFINITIONS.map((definition) => {
      const wins = definition.tier === WORD_SKILL_MAX_TIER
        ? progress.strictWins
        : progress.wins[definition.id] || 0
      const status = definition.tier < plan.baseStage
        ? 'passed'
        : definition.tier === plan.stage ? 'current' : 'locked'
      return {
        definition,
        wins,
        winsRequired: definition.gate.wins ?? null,
        status,
        remediation: plan.remediation && definition.tier === plan.stage,
        due: definition.tier === plan.stage && plan.due,
      }
    }),
  }
}

export function completedWordProgress(currentRound = 0) {
  return normalizeWordProgress({
    wins: Object.fromEntries(WORD_STAGE_DEFINITIONS.slice(0, -1).map(
      (definition) => [definition.id, definition.gate.wins],
    )),
    dueAfterRound: currentRound + WORD_INITIAL_REVIEW_GAP,
  }, currentRound)
}
