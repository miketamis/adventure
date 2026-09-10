// Task-bank-free persistence for guided CEFR preparation. The normal game
// reducer stores only stable identifiers and bounded counters; the deferred
// preparation layer verifies those identifiers against the current registry
// before they can unlock anything.

export const CEFR_PREPARATION_VERSION = 1

const safeRecord = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {}
const boundedId = (value) => typeof value === 'string' && /^a[12]-[a-z0-9-]+$/.test(value) && value.length <= 100

export const emptyCefrPreparationState = () => ({
  cefrPreparationVersion: CEFR_PREPARATION_VERSION,
  cefrPreparationPasses: {},
  cefrPreparationAttempts: {},
})

const normalizeAttempts = (value) => Object.fromEntries(
  Object.entries(safeRecord(value)).flatMap(([activityId, count]) => {
    const whole = Math.floor(Number(count))
    return boundedId(activityId) && Number.isSafeInteger(whole) && whole > 0
      ? [[activityId, Math.min(whole, 999)]]
      : []
  }),
)

const normalizePasses = (value) => Object.fromEntries(
  Object.entries(safeRecord(value)).flatMap(([mechanicId, activityIds]) => {
    if (!boundedId(mechanicId) || !Array.isArray(activityIds)) return []
    const valid = [...new Set(activityIds.filter(boundedId))]
    return valid.length ? [[mechanicId, valid]] : []
  }),
)

// Preparation saves contain only compact completion counters. Answers, typed
// drafts, recordings and object URLs never cross this boundary.
export function normalizeCefrPreparationState(saved) {
  if (saved?.cefrPreparationVersion !== CEFR_PREPARATION_VERSION) {
    return emptyCefrPreparationState()
  }
  return {
    cefrPreparationVersion: CEFR_PREPARATION_VERSION,
    cefrPreparationPasses: normalizePasses(saved.cefrPreparationPasses),
    cefrPreparationAttempts: normalizeAttempts(saved.cefrPreparationAttempts),
  }
}

export function recordCefrPreparationAttempt(state, activityId, mechanicId, passed) {
  if (!boundedId(activityId) || !boundedId(mechanicId) || typeof passed !== 'boolean') {
    return normalizeCefrPreparationState(state)
  }
  const normalized = normalizeCefrPreparationState(state)
  const next = {
    ...normalized,
    cefrPreparationAttempts: {
      ...normalized.cefrPreparationAttempts,
      [activityId]: Math.min(999, (normalized.cefrPreparationAttempts[activityId] || 0) + 1),
    },
  }
  if (!passed) return next
  next.cefrPreparationPasses = {
    ...normalized.cefrPreparationPasses,
    [mechanicId]: [...new Set([
      ...(normalized.cefrPreparationPasses[mechanicId] || []),
      activityId,
    ])],
  }
  return next
}
