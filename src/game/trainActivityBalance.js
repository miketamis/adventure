// One shared activity-format identity and balancing policy for the live Train
// scheduler, persistence, audits, and Debug Learning. The history records what
// the learner was actually shown, not what a random family roll attempted.

import {
  TRAIN_ACTIVITY_BALANCE_POLICY,
  TRAIN_TARGET_BALANCE_POLICY,
  latestTrainTargetEntry,
  normalizeTrainActivityHistory,
  normalizeTrainTargetHistory,
} from './trainActivityHistory.js'

export {
  TRAIN_ACTIVITY_BALANCE_POLICY,
  TRAIN_TARGET_BALANCE_POLICY,
} from './trainActivityHistory.js'

const safeActivityTypeId = (value) => typeof value === 'string' &&
  /^[a-z0-9][a-z0-9:-]{0,159}$/.test(value) ? value : null

export function trainActivityTypeId(activity) {
  const explicit = safeActivityTypeId(activity?.activityTypeId)
  if (explicit) return explicit
  if (!activity || typeof activity !== 'object') return null
  if (activity.kind === 'caught-up') return null

  if (activity.kind === 'everyday-phrase' || activity.familyId === 'everyday-phrase') {
    const scope = activity.mode === 'type' && activity.typeScope
      ? `-${activity.typeScope}`
      : ''
    return safeActivityTypeId(`phrase:${activity.mode || activity.skill || 'unknown'}${scope}`)
  }
  if (activity.kind === 'word-match' || activity.familyId === 'word-matching') {
    return 'word:matching-board'
  }

  const family = safeActivityTypeId(activity.familyId) || 'word'
  const variant = safeActivityTypeId(
    activity.contextVariantId || activity.variantId || activity.wordStageId || activity.stageId || activity.mode,
  ) || 'unknown'
  return safeActivityTypeId(`${family}:${variant}`)
}

export function trainActivityBalancePlan(candidates, history = [], {
  excludeImmediate = true,
} = {}) {
  const normalizedHistory = normalizeTrainActivityHistory(history)
  const previousActivityTypeId = normalizedHistory.at(-1) || null
  const counts = normalizedHistory.reduce((result, activityTypeId) => ({
    ...result,
    [activityTypeId]: (result[activityTypeId] || 0) + 1,
  }), {})
  const identified = (candidates || []).flatMap((candidate, index) => {
    const activityTypeId = trainActivityTypeId(candidate)
    return activityTypeId ? [{ candidate, index, activityTypeId }] : []
  })
  const repeatRejected = excludeImmediate && previousActivityTypeId
    ? identified.filter(({ activityTypeId }) => activityTypeId === previousActivityTypeId)
    : []
  const eligible = excludeImmediate && previousActivityTypeId
    ? identified.filter(({ activityTypeId }) => activityTypeId !== previousActivityTypeId)
    : identified
  const minimumRecentCount = eligible.length
    ? Math.min(...eligible.map(({ activityTypeId }) => counts[activityTypeId] || 0))
    : null
  const balanced = eligible.filter(({ activityTypeId }) =>
    (counts[activityTypeId] || 0) === minimumRecentCount)

  return {
    policy: TRAIN_ACTIVITY_BALANCE_POLICY,
    history: normalizedHistory,
    counts,
    previousActivityTypeId,
    candidates: identified.map(({ index, activityTypeId }) => ({
      index,
      activityTypeId,
      recentCount: counts[activityTypeId] || 0,
      status: excludeImmediate && activityTypeId === previousActivityTypeId
        ? 'rejected-immediate-repeat'
        : (counts[activityTypeId] || 0) === minimumRecentCount
          ? 'balanced-eligible'
          : 'deferred-overrepresented',
    })),
    repeatRejected: repeatRejected.map(({ index, activityTypeId }) => ({ index, activityTypeId })),
    eligible,
    balanced,
    minimumRecentCount,
    outcome: balanced.length ? 'eligible' : 'caught-up',
  }
}

export function pickBalancedTrainActivity(candidates, history = [], rng = Math.random) {
  const plan = trainActivityBalancePlan(candidates, history)
  if (!plan.balanced.length) return { candidate: null, activityTypeId: null, plan, randomBoundary: null }
  const randomBoundary = Math.max(0, Math.min(0.999999999, Number(rng()) || 0))
  const selected = plan.balanced[Math.floor(randomBoundary * plan.balanced.length)]
  return {
    candidate: selected.candidate,
    activityTypeId: selected.activityTypeId,
    plan,
    randomBoundary,
  }
}

export function trainTargetBalancePlan(candidates, history = [], {
  targetKeysOf = (candidate) => candidate?.targetKeys || [],
  excludePreviousPhrase = false,
  remediationOf = (candidate) => candidate?.remediation === true || candidate?.plan?.remediation === true,
} = {}) {
  const normalizedHistory = normalizeTrainTargetHistory(history)
  const counts = normalizedHistory.flat().reduce((result, targetKey) => ({
    ...result,
    [targetKey]: (result[targetKey] || 0) + 1,
  }), {})
  const previousPhraseTargetKeys = excludePreviousPhrase
    ? latestTrainTargetEntry(normalizedHistory, 'phrase:').filter((key) => key.startsWith('phrase:'))
    : []
  const previousPhraseSet = new Set(previousPhraseTargetKeys)
  const interveningTargets = (targetKey) => {
    const index = normalizedHistory.findLastIndex((entry) => entry.includes(targetKey))
    return index < 0 ? Infinity : normalizedHistory.length - index - 1
  }
  const identified = (candidates || []).map((candidate, index) => {
    const targetKeys = [...new Set(targetKeysOf(candidate) || [])]
      .filter((key) => typeof key === 'string')
    const wordTargetKey = targetKeys.find((key) => key.startsWith('word:')) || null
    const surfaceTargetKey = targetKeys.find((key) => key.startsWith('surface:')) || null
    const remediation = remediationOf(candidate)
    const exactWordInterveningTargets = wordTargetKey ? interveningTargets(wordTargetKey) : Infinity
    const surfaceInterveningTargets = surfaceTargetKey ? interveningTargets(surfaceTargetKey) : Infinity
    const surfaceAppearances = surfaceTargetKey
      ? normalizedHistory.filter((entry) => entry.includes(surfaceTargetKey)).length
      : 0
    const remediationReady = remediation &&
      exactWordInterveningTargets >= 1 && surfaceInterveningTargets >= 1
    const exactWordCoolingDown = Boolean(wordTargetKey) &&
      exactWordInterveningTargets < TRAIN_TARGET_BALANCE_POLICY.exactWordInterveningTargets
    const surfaceCoolingDown = Boolean(surfaceTargetKey) &&
      surfaceInterveningTargets < TRAIN_TARGET_BALANCE_POLICY.surfaceInterveningTargets
    const surfaceOverCap = Boolean(surfaceTargetKey) &&
      surfaceAppearances >= TRAIN_TARGET_BALANCE_POLICY.maximumSurfaceAppearances
    return {
      candidate,
      index,
      targetKeys,
      recentCount: targetKeys.reduce((sum, key) => sum + (counts[key] || 0), 0),
      repeatsPreviousPhrase: targetKeys.some((key) => previousPhraseSet.has(key)),
      remediation,
      remediationReady,
      exactWordInterveningTargets,
      surfaceInterveningTargets,
      surfaceAppearances,
      coolingDown: !remediationReady && (exactWordCoolingDown || surfaceCoolingDown || surfaceOverCap),
    }
  }).filter(({ targetKeys }) => targetKeys.length > 0)
  const eligible = identified.filter(({ repeatsPreviousPhrase, coolingDown }) =>
    !repeatsPreviousPhrase && !coolingDown)
  const minimumRecentCount = eligible.length
    ? Math.min(...eligible.map(({ recentCount }) => recentCount))
    : null
  const balanced = eligible.filter(({ recentCount }) => recentCount === minimumRecentCount)
  return {
    policy: TRAIN_TARGET_BALANCE_POLICY,
    history: normalizedHistory,
    counts,
    previousPhraseTargetKeys,
    candidates: identified.map(({
      index,
      targetKeys,
      recentCount,
      repeatsPreviousPhrase,
      remediation,
      remediationReady,
      exactWordInterveningTargets,
      surfaceInterveningTargets,
      surfaceAppearances,
      coolingDown,
    }) => ({
      index,
      targetKeys,
      recentCount,
      remediation,
      remediationReady,
      exactWordInterveningTargets,
      surfaceInterveningTargets,
      surfaceAppearances,
      status: repeatsPreviousPhrase
        ? 'rejected-previous-phrase-activity'
        : coolingDown
          ? 'rejected-target-cooldown'
        : recentCount === minimumRecentCount
          ? 'balanced-eligible'
          : 'deferred-overrepresented',
    })),
    eligible,
    balanced,
    minimumRecentCount,
    outcome: balanced.length ? 'eligible' : 'caught-up',
  }
}

export function trainSurfaceTargetKey(surface) {
  const normalized = String(surface || '')
    .normalize('NFC')
    .toLocaleLowerCase('sq')
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 160)
  return normalized ? `surface:${normalized}` : null
}

export function trainWordTargetKeys(id, canonicalSurface) {
  if (typeof id !== 'string' || !id) return []
  return [`word:${id}`, trainSurfaceTargetKey(canonicalSurface)].filter(Boolean)
}

export function trainQuestionTargetKeys(question) {
  if (!question || typeof question !== 'object') return []
  if (Array.isArray(question.targetKeys)) return [...new Set(question.targetKeys)]
  const keys = []
  if (question.kind === 'everyday-phrase') {
    for (const id of question.phraseIds || []) keys.push(`phrase:${id}`)
    if (question.focusId) keys.push(`word:${question.focusId}`)
  } else if (question.kind === 'word-match') {
    for (const pair of question.pairs || []) if (pair?.id) keys.push(`word:${pair.id}`)
  } else if (question.answerId) {
    keys.push(`word:${question.answerId}`)
  }
  return [...new Set(keys)]
}
