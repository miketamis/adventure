// One shared activity-format identity and balancing policy for the live Train
// scheduler, persistence, audits, and Debug Learning. The history records what
// the learner was actually shown, not what a random family roll attempted.

import {
  TRAIN_ACTIVITY_BALANCE_POLICY,
  normalizeTrainActivityHistory,
} from './trainActivityHistory.js'

export { TRAIN_ACTIVITY_BALANCE_POLICY } from './trainActivityHistory.js'

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
