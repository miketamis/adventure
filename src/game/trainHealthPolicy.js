// One policy owns Train protection, stage exposure, and earned recovery.
// Builders attach the plan produced here, the UI explains it before an
// attempt, and the reducer derives the same exposure keys from the accepted
// result rather than trusting presentation metadata.

export const TRAIN_HEALTH_POLICY_VERSION = 2

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const TRAIN_HEALTH_POLICY = deepFreeze({
  version: TRAIN_HEALTH_POLICY_VERSION,
  protectedAttemptsPerStep: 1,
  recoveryCorrectCompletions: 7,
  maximumHearts: 3,
  protectionRule: 'The first completed attempt at each exact target, aspect, level, form, and activity configuration is protected; success or failure consumes it.',
  recoveryRule: 'Seven consecutive completed correct Train rounds restore one heart, up to the maximum; any miss resets the streak.',
})

const canonicalHearts = (value, maximumHearts = TRAIN_HEALTH_POLICY.maximumHearts) => {
  const maximum = Number.isSafeInteger(maximumHearts) && maximumHearts > 0
    ? maximumHearts
    : TRAIN_HEALTH_POLICY.maximumHearts
  const numeric = Number(value)
  return {
    maximum,
    hearts: Number.isSafeInteger(numeric) ? Math.max(0, Math.min(maximum, numeric)) : 0,
  }
}

const safePart = (value) => typeof value === 'string' && value.trim()
  ? encodeURIComponent(value.trim().slice(0, 200))
  : null

const unique = (values) => [...new Set(values.filter(Boolean))]

export const normalizeTrainAspectTargets = (value) => (Array.isArray(value) ? value : []).flatMap((entry) => {
  if (!entry || typeof entry !== 'object') return []
  const targetId = safePart(entry.targetId)
  const aspectId = safePart(entry.aspectId)
  const level = safePart(String(entry.level ?? ''))
  return targetId && aspectId && level ? [{
    targetId: decodeURIComponent(targetId),
    aspectId: decodeURIComponent(aspectId),
    level: decodeURIComponent(level),
  }] : []
})

export function trainAspectExposureKeys(aspectTargets) {
  return unique(normalizeTrainAspectTargets(aspectTargets).map(({ targetId, aspectId, level }) =>
    `aspect:${safePart(targetId)}:${safePart(aspectId)}:${safePart(level)}`))
}

export const normalizeTrainStageExposures = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value).flatMap(([key, count]) => {
    const numeric = Number(count)
    return typeof key === 'string' && key.length <= 700 && Number.isSafeInteger(numeric) && numeric > 0
      ? [[key, numeric]]
      : []
  }))
}

export const normalizeTrainHealingStreak = (value) => {
  const numeric = Number(value)
  return Number.isSafeInteger(numeric) && numeric >= 0
    ? Math.min(numeric, TRAIN_HEALTH_POLICY.recoveryCorrectCompletions - 1)
    : 0
}

// Player-facing health and recovery copy consumes this projection rather than
// re-deriving either the heart delta or the combo threshold in a component.
export function trainRecoveryPlanForState(state, maximumHearts = TRAIN_HEALTH_POLICY.maximumHearts) {
  const { hearts, maximum } = canonicalHearts(state?.hearts, maximumHearts)
  const correctStreak = normalizeTrainHealingStreak(state?.trainHealingStreak)
  return {
    hearts,
    maximumHearts: maximum,
    correctStreak,
    recoveryCorrectCompletions: TRAIN_HEALTH_POLICY.recoveryCorrectCompletions,
    correctUntilRecovery: TRAIN_HEALTH_POLICY.recoveryCorrectCompletions - correctStreak,
    canRecoverHeart: hearts < maximum,
    atMaximumHearts: hearts >= maximum,
  }
}

export function trainRecoveryStatusText(plan) {
  if (!plan) return ''
  if (plan.atMaximumHearts) {
    return `Correct combo: ${plan.correctStreak}/${plan.recoveryCorrectCompletions} · hearts are full.`
  }
  const rounds = plan.correctUntilRecovery
  return `Correct combo: ${plan.correctStreak}/${plan.recoveryCorrectCompletions} · ${rounds} more correct ${rounds === 1 ? 'round' : 'rounds'} restores one heart.`
}

export function trainHeartRiskText(plan) {
  if (!plan) return ''
  const held = `${plan.hearts} of ${plan.maximumHearts} ${plan.maximumHearts === 1 ? 'heart' : 'hearts'} left.`
  if (plan.protectedAttempt) return `${held} New skill step protected — a wrong answer will not cost a heart.`
  if (plan.missEndsRun) return `${held} A wrong answer costs one heart and ends this run.`
  return `${held} A wrong answer costs one heart; ${plan.heartsAfterWrong} would remain.`
}

export function trainCorrectWillRestoreHeart(plan) {
  return Boolean(
    plan?.canRecoverHeart &&
    plan.correctStreak + 1 >= plan.recoveryCorrectCompletions,
  )
}

export function wordTrainExposureKeys({ id, wordStageId, variantId, targetFormKey } = {}) {
  const target = safePart(id)
  const stage = safePart(wordStageId)
  if (!target || !stage) return []
  return [`word:${target}:${stage}:${safePart(variantId) || 'base'}:${safePart(targetFormKey) || 'lemma'}`]
}

export function wordTrainAspectTargets({ id, wordStageId, variantId, targetFormKey } = {}) {
  return id && wordStageId ? [{
    targetId: id,
    aspectId: wordStageId,
    level: [variantId || 'base', targetFormKey || 'lemma'].join(':'),
  }] : []
}

export function phraseTrainExposureKeys({ phraseIds, skill, tier, mode, typeScope, focusId } = {}) {
  const safeSkill = safePart(skill)
  const safeMode = safePart(mode)
  const safeTier = Number.isSafeInteger(tier) && tier >= 0 ? tier : null
  if (!safeSkill || !safeMode || safeTier == null) return []
  const step = `${safeSkill}:${safeTier}:${safeMode}:${safePart(typeScope) || 'whole'}:${safePart(focusId) || 'whole'}`
  return unique((phraseIds || []).map((id) => {
    const phraseId = safePart(id)
    return phraseId ? `phrase:${phraseId}:${step}` : null
  }))
}

export function phraseTrainAspectTargets({ phraseIds, skill, tier, mode, typeScope, focusId } = {}) {
  if (!skill || !mode || !Number.isSafeInteger(tier) || tier < 0) return []
  return (phraseIds || []).map((targetId) => ({
    targetId,
    aspectId: `phrase-${skill}`,
    level: [mode, typeScope || 'whole', focusId || 'whole', tier].join(':'),
  }))
}

export function wordMatchingTrainExposureKeys({ variantId } = {}) {
  const variant = safePart(variantId)
  return variant ? [`word-matching:${variant}`] : []
}

export function wordMatchingTrainAspectTargets({ variantId } = {}) {
  return variantId ? [{
    targetId: 'saved-word-board',
    aspectId: 'meaning-matching',
    level: variantId,
  }] : []
}

export function trainExposureKeysForQuestion(question) {
  if (!question || typeof question !== 'object') return []
  const explicit = trainAspectExposureKeys(question.aspectTargets)
  if (explicit.length) return explicit
  if (question.kind === 'word-match') return wordMatchingTrainExposureKeys(question)
  if (question.kind === 'everyday-phrase') return phraseTrainExposureKeys(question)
  return wordTrainExposureKeys({
    id: question.answerId,
    wordStageId: question.wordStageId,
    variantId: question.variantId,
    targetFormKey: question.targetFormKey,
  })
}


export function trainAspectTargetsForQuestion(question, phaseId = null) {
  const phaseTargets = typeof phaseId === 'string'
    ? normalizeTrainAspectTargets(question?.phaseAspectTargets?.[phaseId])
    : []
  if (phaseTargets.length) return phaseTargets
  const explicit = normalizeTrainAspectTargets(question?.aspectTargets)
  if (explicit.length) return explicit
  if (question?.kind === 'word-match') return wordMatchingTrainAspectTargets(question)
  if (question?.kind === 'everyday-phrase') return phraseTrainAspectTargets(question)
  if (question?.answerId && question?.wordStageId) return wordTrainAspectTargets({ ...question, id: question.answerId })
  return []
}

export function trainHealthPlanForQuestion(state, question, { phaseId = null } = {}) {
  const aspectTargets = trainAspectTargetsForQuestion(question, phaseId)
  const exposureKeys = trainAspectExposureKeys(aspectTargets)
  const exposures = normalizeTrainStageExposures(state?.trainStageExposures)
  const protectedAttempt = exposureKeys.length > 0 && exposureKeys.some((key) =>
    (exposures[key] || 0) < TRAIN_HEALTH_POLICY.protectedAttemptsPerStep)
  const recovery = trainRecoveryPlanForState(state)
  const wrongAnswerHeartCost = protectedAttempt ? 0 : 1
  const heartsAfterWrong = Math.max(0, recovery.hearts - wrongAnswerHeartCost)
  return {
    policyVersion: TRAIN_HEALTH_POLICY_VERSION,
    aspectTargets,
    exposureKeys,
    protectedAttempt,
    wrongAnswerHeartCost,
    heartsAfterWrong,
    missEndsRun: wrongAnswerHeartCost > 0 && heartsAfterWrong === 0,
    ...recovery,
    // Retained for saved debug traces written by v1 of this contract.
    healingStreak: recovery.correctStreak,
  }
}

export function applyTrainHealthResult(state, {
  exposureKeys,
  correct,
  questionKey,
  maximumHearts = TRAIN_HEALTH_POLICY.maximumHearts,
} = {}) {
  const keys = unique(exposureKeys || [])
  if (!keys.length || (correct !== true && correct !== false)) return null
  const exposures = normalizeTrainStageExposures(state?.trainStageExposures)
  const protectedAttempt = keys.some((key) =>
    (exposures[key] || 0) < TRAIN_HEALTH_POLICY.protectedAttemptsPerStep)
  for (const key of keys) exposures[key] = (exposures[key] || 0) + 1

  if (!correct) {
    return {
      state: {
        ...state,
        trainHealthPolicyVersion: TRAIN_HEALTH_POLICY_VERSION,
        trainStageExposures: exposures,
        trainHealingStreak: 0,
        trainRecoveryEvent: null,
      },
      protectedAttempt,
      healed: false,
    }
  }

  const nextStreak = normalizeTrainHealingStreak(state?.trainHealingStreak) + 1
  const completedRecovery = nextStreak >= TRAIN_HEALTH_POLICY.recoveryCorrectCompletions
  const safeMaximum = Number.isSafeInteger(maximumHearts) && maximumHearts > 0 ? maximumHearts : 3
  const canHeal = completedRecovery && (state.hearts || 0) < safeMaximum
  const hearts = canHeal ? Math.min(safeMaximum, (state.hearts || 0) + 1) : state.hearts
  return {
    state: {
      ...state,
      hearts,
      trainHealthPolicyVersion: TRAIN_HEALTH_POLICY_VERSION,
      trainStageExposures: exposures,
      trainHealingStreak: completedRecovery ? 0 : nextStreak,
      trainRecoveryEvent: canHeal && typeof questionKey === 'string'
        ? { questionKey: questionKey.slice(0, 200), hearts }
        : null,
    },
    protectedAttempt: false,
    healed: canHeal,
  }
}
