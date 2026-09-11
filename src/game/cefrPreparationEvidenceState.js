// Task-bank-free persistence for guided CEFR preparation. The normal game
// reducer stores only stable identifiers and bounded counters; the deferred
// preparation layer verifies those identifiers against the current registry
// before they can unlock anything.

export const CEFR_PREPARATION_VERSION = 2
const LEGACY_CEFR_PREPARATION_VERSION = 1

const safeRecord = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {}
const boundedId = (value) => typeof value === 'string' && /^a[12]-[a-z0-9-]+$/.test(value) && value.length <= 100

export const emptyCefrPreparationState = () => ({
  cefrPreparationVersion: CEFR_PREPARATION_VERSION,
  cefrPreparationPasses: {},
  cefrPreparationAttempts: {},
  cefrPreparationAttemptSequence: 0,
  cefrPreparationLastAttemptId: null,
  cefrPreparationSupportExposure: {},
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

const normalizeSequence = (value) => {
  const whole = Math.floor(Number(value))
  return Number.isSafeInteger(whole) && whole > 0 ? Math.min(whole, 999999) : 0
}

const normalizeSupportExposure = (value, sequence) => Object.fromEntries(
  Object.entries(safeRecord(value)).flatMap(([activityId, exposedAt]) => {
    const whole = normalizeSequence(exposedAt)
    return boundedId(activityId) && whole > 0 && whole <= sequence ? [[activityId, whole]] : []
  }),
)

// Preparation saves contain only compact completion counters and support-
// exposure receipts. Answers, typed drafts, recordings and object URLs never
// cross this boundary.
export function normalizeCefrPreparationState(saved) {
  const current = saved?.cefrPreparationVersion === CEFR_PREPARATION_VERSION
  const legacy = saved?.cefrPreparationVersion === LEGACY_CEFR_PREPARATION_VERSION
  if (!current && !legacy) {
    return emptyCefrPreparationState()
  }
  const attempts = normalizeAttempts(saved.cefrPreparationAttempts)
  const sequence = current
    ? normalizeSequence(saved.cefrPreparationAttemptSequence)
    : Math.min(999999, Object.values(attempts).reduce((sum, count) => sum + count, 0))
  const lastAttemptId = current && boundedId(saved.cefrPreparationLastAttemptId)
    ? saved.cefrPreparationLastAttemptId
    : null
  return {
    cefrPreparationVersion: CEFR_PREPARATION_VERSION,
    cefrPreparationPasses: normalizePasses(saved.cefrPreparationPasses),
    cefrPreparationAttempts: attempts,
    cefrPreparationAttemptSequence: sequence,
    cefrPreparationLastAttemptId: lastAttemptId,
    cefrPreparationSupportExposure: current
      ? normalizeSupportExposure(saved.cefrPreparationSupportExposure, sequence)
      : {},
  }
}

export function recordCefrPreparationAttempt(state, activityId, mechanicId, passed, supportRevealed = false) {
  if (!boundedId(activityId) || !boundedId(mechanicId) || typeof passed !== 'boolean' || typeof supportRevealed !== 'boolean') {
    return normalizeCefrPreparationState(state)
  }
  const normalized = normalizeCefrPreparationState(state)
  const nextSequence = Math.min(999999, normalized.cefrPreparationAttemptSequence + 1)
  const next = {
    ...normalized,
    cefrPreparationAttemptSequence: nextSequence,
    cefrPreparationLastAttemptId: activityId,
    cefrPreparationAttempts: {
      ...normalized.cefrPreparationAttempts,
      [activityId]: Math.min(999, (normalized.cefrPreparationAttempts[activityId] || 0) + 1),
    },
    cefrPreparationSupportExposure: supportRevealed
      ? { ...normalized.cefrPreparationSupportExposure, [activityId]: nextSequence }
      : normalized.cefrPreparationSupportExposure,
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
