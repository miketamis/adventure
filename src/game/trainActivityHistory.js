// Keep the persisted Train format history independent from the lazy scheduler.
// Startup state code needs only these small validation helpers.

export const TRAIN_ACTIVITY_BALANCE_POLICY = Object.freeze({
  version: 2,
  historyWindow: 24,
  recordAt: 'question-presented',
  distribution: 'least-represented currently eligible activity type',
  immediateRepeat: 'fallback only when no different due activity type can be built',
  unavailableAlternative: 'use a disjoint target in the same activity type',
  tieBreak: 'random among tied activity types; existing learner-priority weights choose the target within that type',
})

export const TRAIN_TARGET_BALANCE_POLICY = Object.freeze({
  historyWindow: 10,
  distribution: 'least-represented eligible target after cooldowns',
  exactWordInterveningTargets: 4,
  surfaceInterveningTargets: 2,
  maximumSurfaceAppearances: 2,
})

const safeActivityTypeId = (value) => typeof value === 'string' &&
  /^[a-z0-9][a-z0-9:-]{0,159}$/.test(value) ? value : null

export function normalizeTrainActivityHistory(value) {
  if (!Array.isArray(value)) return []
  return value
    .map(safeActivityTypeId)
    .filter(Boolean)
    .slice(-TRAIN_ACTIVITY_BALANCE_POLICY.historyWindow)
}

export function recordTrainActivity(history, activityTypeId) {
  const safeTypeId = safeActivityTypeId(activityTypeId)
  if (!safeTypeId) return normalizeTrainActivityHistory(history)
  return normalizeTrainActivityHistory([
    ...normalizeTrainActivityHistory(history),
    safeTypeId,
  ])
}

const safeTargetKey = (value) => typeof value === 'string' &&
  /^(?:word|phrase|surface):[\p{L}\p{M}\p{N}][\p{L}\p{M}\p{N}:_-]{0,159}$/u.test(value) ? value : null

export function normalizeTrainTargetHistory(value) {
  if (!Array.isArray(value)) return []
  const entries = value
    .map((entry) => Array.isArray(entry)
      ? [...new Set(entry.map(safeTargetKey).filter(Boolean))].slice(0, 16)
      : [])
    .filter((entry) => entry.length > 0)
  const recent = entries.slice(-TRAIN_TARGET_BALANCE_POLICY.historyWindow)
  if (recent.some((entry) => entry.some((key) => key.startsWith('phrase:')))) return recent
  const previousPhrase = [...entries]
    .reverse()
    .find((entry) => entry.some((key) => key.startsWith('phrase:')))
  return previousPhrase
    ? [previousPhrase.filter((key) => key.startsWith('phrase:')), ...recent]
    : recent
}

export function recordTrainTargets(history, targetKeys) {
  const normalized = normalizeTrainTargetHistory(history)
  const presented = normalizeTrainTargetHistory([targetKeys])[0]
  if (!presented) return normalized
  return normalizeTrainTargetHistory([...normalized, presented])
}

export function latestTrainTargetEntry(history, prefix) {
  if (typeof prefix !== 'string' || !prefix) return []
  return [...normalizeTrainTargetHistory(history)]
    .reverse()
    .find((entry) => entry.some((key) => key.startsWith(prefix))) || []
}
