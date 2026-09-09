// Dependency-free phrase-readiness policy shared by Train, saved-state
// normalization and the debug curriculum graph. A stage is derived from
// auditable evidence; an old counter can never masquerade as productive recall.

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const PHRASE_PROGRESS_VERSION = 2
export const PHRASE_MIN_INTERVENING_ROUNDS = 1
export const PHRASE_INITIAL_REVIEW_GAP = 4
export const PHRASE_MAX_REVIEW_GAP = 64

export const PHRASE_STAGE_DEFINITIONS = deepFreeze({
  production: [
    {
      skill: 'production', tier: 0, id: 'focused-cloze', label: 'foundation',
      mode: 'cloze', typeScope: 'word',
      variant: { distractors: 3 },
      gate: { kind: 'distinct-focus-retrieval', wins: 2, distinctWherePossible: true },
      transition: { correct: 'record-focus-proof', gatePending: 0, gateMet: 1, wrongRemediation: 0 },
      remediation: { wrong: 0, mode: 'cloze', afterDisjointRound: true },
    },
    {
      skill: 'production', tier: 1, id: 'whole-arrangement', label: 'guided production',
      mode: 'arrange', typeScope: 'phrase',
      variant: { distractors: 3 },
      gate: { kind: 'whole-phrase-arrangement', wins: 1 },
      transition: { correct: 'record-arrangement-proof', gateMet: 2, wrongRemediation: 0 },
      remediation: { wrong: 0, mode: 'cloze', afterDisjointRound: true },
    },
    {
      skill: 'production', tier: 2, id: 'focus-spelling', label: 'word spelling',
      mode: 'type', typeScope: 'word', answerTolerance: 'beginner',
      gate: { kind: 'all-reviewed-focuses', winsPerFocus: 1 },
      transition: { correct: 'record-focus-spelling-proof', gatePending: 2, gateMet: 3, wrongRemediation: 0 },
      remediation: { wrong: 0, mode: 'cloze', afterDisjointRound: true },
    },
    {
      skill: 'production', tier: 3, id: 'independent-production', label: 'independent production',
      mode: 'type', typeScope: 'phrase', answerTolerance: 'beginner',
      gate: { kind: 'whole-phrase-recall', wins: 1 },
      transition: { correct: 'record-independent-proof', gateMet: 4, wrongRemediation: 'diagnostic' },
      remediation: { word: 2, order: 1, broad: 1, afterDisjointRound: true },
    },
    {
      skill: 'production', tier: 4, id: 'strict-retention', label: 'mastered production',
      mode: 'type', typeScope: 'phrase', answerTolerance: 'strict',
      gate: { kind: 'spaced-retention', initialGapRounds: PHRASE_INITIAL_REVIEW_GAP, multiplier: 2 },
      transition: { correct: 'expand-review-gap', gateMet: 4, lapseRemediation: 'diagnostic' },
      remediation: { word: 2, order: 1, broad: 3, afterDisjointRound: true },
    },
  ],
  listening: [
    {
      skill: 'listening', tier: 0, id: 'guided-listening', label: 'guided listening', mode: 'listen',
      variant: { distractors: 2 }, gate: { kind: 'correct-completion', wins: 1 },
      transition: { correct: 1, wrong: 0 },
    },
    {
      skill: 'listening', tier: 1, id: 'independent-listening', label: 'independent listening', mode: 'listen',
      variant: { distractors: 3 }, gate: { kind: 'correct-completion', wins: 1 },
      transition: { correct: 2, wrong: 1 },
    },
    {
      skill: 'listening', tier: 2, id: 'mastered-listening', label: 'mastered listening', mode: 'listen',
      variant: { distractors: 5 }, gate: { kind: 'retention-repetition', wins: 1 },
      transition: { correct: 2, wrong: 2, maxTierRepeat: true },
    },
  ],
  matching: [
    {
      skill: 'matching', tier: 0, id: 'guided-matching', label: 'guided matching', mode: 'match',
      variant: { pairs: 2 }, gate: { kind: 'correct-completion', wins: 1 },
      availability: { kind: 'same-tier-board', pairCountFrom: 'variant.pairs' },
      transition: { correct: 1, wrong: 0 },
    },
    {
      skill: 'matching', tier: 1, id: 'independent-matching', label: 'independent matching', mode: 'match',
      variant: { pairs: 3 }, gate: { kind: 'correct-completion', wins: 1 },
      availability: { kind: 'same-tier-board', pairCountFrom: 'variant.pairs' },
      transition: { correct: 2, wrong: 1 },
    },
    {
      skill: 'matching', tier: 2, id: 'mastered-matching', label: 'mastered matching', mode: 'match',
      variant: { pairs: 4 }, gate: { kind: 'retention-repetition', wins: 1 },
      availability: { kind: 'same-tier-board', pairCountFrom: 'variant.pairs' },
      transition: { correct: 2, wrong: 2, maxTierRepeat: true },
    },
  ],
})

export const PHRASE_PROGRESSION_POLICY = deepFreeze({
  version: PHRASE_PROGRESS_VERSION,
  principle: 'Harder recall is unlocked by phrase-specific evidence, never by general ability or old totals.',
  productionOrder: PHRASE_STAGE_DEFINITIONS.production.map(({ id }) => id),
  cloze: { wins: 2, distinctFocusesWherePossible: true },
  arrangement: { wins: 1 },
  spelling: { everyReviewedFocus: true },
  independentProduction: { phraseSpecificPrerequisites: true },
  crossSkillUnlock: {
    productionStage: 2,
    rationale: 'Listening and matching join the rotation only after this exact phrase has passed focused cloze and whole-phrase arrangement.',
  },
  retention: {
    initialGapRounds: PHRASE_INITIAL_REVIEW_GAP,
    maximumGapRounds: PHRASE_MAX_REVIEW_GAP,
    correctMultiplier: 2,
    lapseReturnsToTier: 3,
  },
  remediation: { delayedByDisjointRounds: PHRASE_MIN_INTERVENING_ROUNDS },
  caveat: 'Research motivates per-skill evidence, graduated retrieval, feedback and spacing. These exact thresholds are a transparent product policy pending player telemetry, not a universal SOTA constant.',
})

export const PHRASE_SKILL_MAX_TIER = Object.freeze({
  production: PHRASE_STAGE_DEFINITIONS.production.length - 1,
  listening: PHRASE_STAGE_DEFINITIONS.listening.length - 1,
  matching: PHRASE_STAGE_DEFINITIONS.matching.length - 1,
})

export function phraseSkillTier(value, skill = 'production') {
  const max = PHRASE_SKILL_MAX_TIER[skill] ?? 0
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isSafeInteger(numeric) ? Math.max(0, Math.min(max, numeric)) : 0
}

const safeCount = (value) => {
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isSafeInteger(numeric) && numeric > 0 ? numeric : 0
}

const safeRound = (value) => Math.max(0, safeCount(value))
const safeFocusIds = (focusIds) => [...new Set((focusIds || []).filter((id) => typeof id === 'string' && id))]
const safeProofs = (proofs, focusIds) => {
  const allowed = new Set(safeFocusIds(focusIds))
  return [...new Set((Array.isArray(proofs) ? proofs : []).filter((id) => allowed.has(id)))]
}

export function emptyPhraseProductionProgress() {
  return {
    clozeWins: 0,
    clozeProofs: [],
    arrangeWins: 0,
    spellingProofs: [],
    independentWins: 0,
    strictWins: 0,
    dueAfterRound: 0,
    reviewGap: PHRASE_INITIAL_REVIEW_GAP,
    lastAttemptKey: null,
    lastAttemptRound: 0,
    remediation: null,
  }
}

const normalizedRemediation = (value, focusIds, currentRound) => {
  if (!value || typeof value !== 'object') return null
  const stage = phraseSkillTier(value.stage, 'production')
  if (![0, 1, 2, 3].includes(stage)) return null
  const definition = PHRASE_STAGE_DEFINITIONS.production[stage]
  const focusId = safeFocusIds(focusIds).includes(value.focusId) ? value.focusId : null
  if ((stage === 0 || stage === 2) && !focusId) return null
  return {
    stage,
    mode: definition.mode,
    typeScope: definition.typeScope,
    focusId,
    reason: ['missing-word', 'word-form', 'word-order', 'broad-recall', 'retention-lapse'].includes(value.reason)
      ? value.reason
      : 'broad-recall',
    dueAfterRound: Math.max(currentRound, safeRound(value.dueAfterRound)),
  }
}

export function normalizePhraseProductionProgress(value, focusIds, currentRound = 0) {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const reviewGap = Math.max(
    PHRASE_INITIAL_REVIEW_GAP,
    Math.min(PHRASE_MAX_REVIEW_GAP, safeCount(source.reviewGap) || PHRASE_INITIAL_REVIEW_GAP),
  )
  const normalized = {
    clozeWins: safeCount(source.clozeWins),
    clozeProofs: safeProofs(source.clozeProofs, focusIds),
    arrangeWins: safeCount(source.arrangeWins),
    spellingProofs: safeProofs(source.spellingProofs, focusIds),
    independentWins: safeCount(source.independentWins),
    strictWins: safeCount(source.strictWins),
    dueAfterRound: safeRound(source.dueAfterRound),
    reviewGap,
    lastAttemptKey: typeof source.lastAttemptKey === 'string' && source.lastAttemptKey
      ? source.lastAttemptKey.slice(0, 200)
      : null,
    lastAttemptRound: safeRound(source.lastAttemptRound),
    remediation: null,
  }
  normalized.remediation = normalizedRemediation(source.remediation, focusIds, currentRound)
  return normalized
}

const clozeRequirement = (focusIds) => Math.min(2, Math.max(1, safeFocusIds(focusIds).length))

export function phraseProductionStage(progress, focusIds) {
  const ids = safeFocusIds(focusIds)
  const state = normalizePhraseProductionProgress(progress, ids)
  if (state.clozeWins < 2 || state.clozeProofs.length < clozeRequirement(ids)) return 0
  if (state.arrangeWins < 1) return 1
  if (ids.some((id) => !state.spellingProofs.includes(id))) return 2
  if (state.independentWins < 1) return 3
  return 4
}

const firstUnproved = (focusIds, proofs) => safeFocusIds(focusIds).find((id) => !proofs.includes(id)) || safeFocusIds(focusIds)[0] || null

export function phraseProductionPlan(progress, focusIds, currentRound = 0) {
  const ids = safeFocusIds(focusIds)
  if (!ids.length) return null
  const state = normalizePhraseProductionProgress(progress, ids, currentRound)
  const baseStage = phraseProductionStage(state, ids)
  const repair = state.remediation
  const stage = repair?.stage ?? baseStage
  const definition = PHRASE_STAGE_DEFINITIONS.production[stage]
  const dueAfterRound = repair?.dueAfterRound ?? state.dueAfterRound
  const due = currentRound >= dueAfterRound
  const focusId = repair?.focusId || (stage === 0
    ? firstUnproved(ids, state.clozeProofs)
    : stage === 2
      ? firstUnproved(ids, state.spellingProofs)
      : null)
  return {
    skill: 'production',
    stage,
    tier: stage,
    baseStage,
    mode: definition.mode,
    typeScope: definition.typeScope,
    answerTolerance: definition.answerTolerance,
    difficultyLabel: definition.label,
    focusId,
    due,
    dueAfterRound,
    remediation: Boolean(repair),
    remediationReason: repair?.reason || null,
  }
}

const resultMatchesPlan = (result, plan) => (
  result?.skill === plan.skill &&
  result?.tier === plan.tier &&
  result?.mode === plan.mode &&
  result?.typeScope === plan.typeScope &&
  (plan.focusId == null || result?.focusId === plan.focusId)
)

const remediationForFailure = (plan, result, focusIds, nextRound) => {
  const ids = safeFocusIds(focusIds)
  const reportedFocus = ids.includes(result?.diagnostic?.focusId)
    ? result.diagnostic.focusId
    : ids.includes(plan.focusId) ? plan.focusId : ids[0]
  if (plan.stage <= 1) return {
    stage: 0,
    focusId: reportedFocus,
    reason: 'missing-word',
    dueAfterRound: nextRound + PHRASE_MIN_INTERVENING_ROUNDS,
  }
  if (plan.stage === 2) return {
    stage: 0,
    focusId: reportedFocus,
    reason: 'word-form',
    dueAfterRound: nextRound + PHRASE_MIN_INTERVENING_ROUNDS,
  }
  const diagnosticKind = result?.diagnostic?.kind
  if (diagnosticKind === 'word') return {
    stage: 2,
    focusId: reportedFocus,
    reason: 'word-form',
    dueAfterRound: nextRound + PHRASE_MIN_INTERVENING_ROUNDS,
  }
  if (diagnosticKind === 'order') return {
    stage: 1,
    focusId: null,
    reason: 'word-order',
    dueAfterRound: nextRound + PHRASE_MIN_INTERVENING_ROUNDS,
  }
  return {
    stage: plan.stage === 4 ? 3 : 1,
    focusId: null,
    reason: plan.stage === 4 ? 'retention-lapse' : 'broad-recall',
    dueAfterRound: nextRound + PHRASE_MIN_INTERVENING_ROUNDS,
  }
}

// Apply one completed production question. The supplied question metadata must
// match the plan that was due, making saved evidence resistant to stale or
// duplicated UI events and preventing callers from skipping a gate.
export function advancePhraseProduction(progress, focusIds, currentRound = 0, result = {}) {
  const ids = safeFocusIds(focusIds)
  const state = normalizePhraseProductionProgress(progress, ids, currentRound)
  const plan = phraseProductionPlan(state, ids, currentRound)
  const questionKey = typeof result.questionKey === 'string' ? result.questionKey.slice(0, 200) : ''
  if (!plan || !plan.due) return { accepted: false, reason: 'not-due', progress: state, plan }
  if (!questionKey) return { accepted: false, reason: 'missing-question-key', progress: state, plan }
  if (questionKey === state.lastAttemptKey) return { accepted: false, reason: 'duplicate-question', progress: state, plan }
  if (!resultMatchesPlan(result, plan)) return { accepted: false, reason: 'plan-mismatch', progress: state, plan }

  const nextRound = Math.max(safeRound(currentRound), safeRound(result.round))
  const next = {
    ...state,
    lastAttemptKey: questionKey,
    lastAttemptRound: nextRound,
  }

  if (!result.correct) {
    if (plan.stage === 4) {
      next.independentWins = 0
      next.reviewGap = Math.max(PHRASE_INITIAL_REVIEW_GAP, Math.floor(next.reviewGap / 2))
    }
    next.remediation = remediationForFailure(plan, result, ids, nextRound)
    next.dueAfterRound = next.remediation.dueAfterRound
    return {
      accepted: true,
      progress: normalizePhraseProductionProgress(next, ids, nextRound),
      plan,
    }
  }

  if (plan.remediation) {
    next.remediation = null
    next.dueAfterRound = nextRound + PHRASE_MIN_INTERVENING_ROUNDS
  } else if (plan.stage === 0) {
    next.clozeWins += 1
    next.clozeProofs = safeProofs([...next.clozeProofs, plan.focusId], ids)
    next.dueAfterRound = nextRound + PHRASE_MIN_INTERVENING_ROUNDS
  } else if (plan.stage === 1) {
    next.arrangeWins += 1
    next.dueAfterRound = nextRound + PHRASE_MIN_INTERVENING_ROUNDS
  } else if (plan.stage === 2) {
    next.spellingProofs = safeProofs([...next.spellingProofs, plan.focusId], ids)
    next.dueAfterRound = nextRound + PHRASE_MIN_INTERVENING_ROUNDS
  } else if (plan.stage === 3) {
    next.independentWins += 1
    next.dueAfterRound = nextRound + next.reviewGap
  } else {
    next.strictWins += 1
    next.reviewGap = Math.min(PHRASE_MAX_REVIEW_GAP, next.reviewGap * 2)
    next.dueAfterRound = nextRound + next.reviewGap
  }

  return {
    accepted: true,
    progress: normalizePhraseProductionProgress(next, ids, nextRound),
    plan,
  }
}

const proofEvidenceFor = (stage, progress, focusIds) => {
  const ids = safeFocusIds(focusIds)
  if (stage === 0) return {
    wins: progress.clozeWins,
    winsRequired: 2,
    focuses: progress.clozeProofs,
    focusesRequired: clozeRequirement(ids),
  }
  if (stage === 1) return { wins: progress.arrangeWins, winsRequired: 1 }
  if (stage === 2) return {
    focuses: progress.spellingProofs,
    focusesRequired: ids,
    complete: ids.every((id) => progress.spellingProofs.includes(id)),
  }
  if (stage === 3) return { wins: progress.independentWins, winsRequired: 1 }
  return {
    wins: progress.strictWins,
    dueAfterRound: progress.dueAfterRound,
    reviewGap: progress.reviewGap,
  }
}

export function phraseProgressionSnapshot({
  phraseId,
  progress,
  focusIds,
  currentRound = 0,
  listeningTier = 0,
  matchingTier = 0,
} = {}) {
  const ids = safeFocusIds(focusIds)
  const state = normalizePhraseProductionProgress(progress, ids, currentRound)
  const currentStage = phraseProductionStage(state, ids)
  const next = phraseProductionPlan(state, ids, currentRound)
  const crossSkillEligible = currentStage >= PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage
  return {
    phraseId,
    focusIds: ids,
    currentStage,
    currentDefinition: PHRASE_STAGE_DEFINITIONS.production[currentStage],
    due: Boolean(next?.due),
    next,
    evidence: state,
    gates: PHRASE_STAGE_DEFINITIONS.production.map((definition) => ({
      ...definition,
      status: definition.tier < currentStage ? 'passed' : definition.tier === currentStage ? 'current' : 'locked',
      evidence: proofEvidenceFor(definition.tier, state, ids),
    })),
    listening: {
      tier: phraseSkillTier(listeningTier, 'listening'),
      definition: PHRASE_STAGE_DEFINITIONS.listening[phraseSkillTier(listeningTier, 'listening')],
      eligible: crossSkillEligible,
      status: crossSkillEligible ? 'eligible' : 'locked',
    },
    matching: {
      tier: phraseSkillTier(matchingTier, 'matching'),
      definition: PHRASE_STAGE_DEFINITIONS.matching[phraseSkillTier(matchingTier, 'matching')],
      eligible: crossSkillEligible,
      status: crossSkillEligible ? 'eligible' : 'locked',
    },
  }
}
