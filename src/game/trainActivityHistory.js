// Keep the persisted Train format history independent from the lazy scheduler.
// Startup state code needs only these small validation helpers.

export const TRAIN_ACTIVITY_BALANCE_POLICY = Object.freeze({
  version: 1,
  historyWindow: 24,
  recordAt: 'question-presented',
  distribution: 'least-represented currently eligible activity type',
  immediateRepeat: 'forbidden',
  unavailableAlternative: 'caught-up',
  tieBreak: 'random among tied activity types; existing learner-priority weights choose the target within that type',
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
