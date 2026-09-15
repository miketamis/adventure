// Optional, local-only research instrumentation. The event builder accepts a
// fixed non-content schema; learner answers, prompt text, audio, transcripts,
// names and free-form values have no route into the persisted log.

export const LEARNING_TELEMETRY_VERSION = 1
export const LEARNING_TELEMETRY_POLICY = Object.freeze({
  version: LEARNING_TELEMETRY_VERSION,
  defaultConsent: false,
  localOnly: true,
  maximumEvents: 512,
  timestampPrecision: 'minute',
  forbiddenContent: Object.freeze(['answer text', 'prompt text', 'audio', 'transcript', 'open response', 'name', 'phone number']),
})

const TRACKS = new Set(['word', 'form', 'word-matching', 'phrase-production', 'phrase-listening', 'phrase-matching'])
const safeId = (value, max = 160) => typeof value === 'string' && /^[a-z0-9][a-z0-9:_-]*$/i.test(value)
  ? value.slice(0, max) : null
const safeCount = (value) => Number.isSafeInteger(Number(value)) && Number(value) >= 0
  ? Number(value) : 0

export function emptyLearningTelemetryState() {
  return {
    learningTelemetryVersion: LEARNING_TELEMETRY_VERSION,
    learningResearchConsent: false,
    learningTelemetrySequence: 0,
    learningTelemetryEvents: [],
  }
}

export function normalizeLearningTelemetryState(value = {}) {
  const consent = value.learningResearchConsent === true
  const sequence = safeCount(value.learningTelemetrySequence)
  const events = consent && Array.isArray(value.learningTelemetryEvents)
    ? value.learningTelemetryEvents.slice(-LEARNING_TELEMETRY_POLICY.maximumEvents).flatMap(normalizeLearningEvent)
    : []
  return {
    learningTelemetryVersion: LEARNING_TELEMETRY_VERSION,
    learningResearchConsent: consent,
    learningTelemetrySequence: Math.max(sequence, ...events.map(({ sequence: item }) => item), 0),
    learningTelemetryEvents: events,
  }
}

function normalizeLearningEvent(event) {
  if (!event || typeof event !== 'object' || Array.isArray(event)) return []
  const track = TRACKS.has(event.track) ? event.track : null
  const targetId = safeId(event.targetId)
  const stageId = safeId(event.stageId)
  if (!track || !targetId || !stageId || !['correct', 'wrong'].includes(event.outcome)) return []
  return [{
    version: LEARNING_TELEMETRY_VERSION,
    sequence: safeCount(event.sequence),
    atMinute: safeCount(event.atMinute),
    track,
    targetId,
    stageId,
    variantId: safeId(event.variantId),
    tier: Math.max(0, Math.min(12, safeCount(event.tier))),
    outcome: event.outcome,
    responseBand: ['under-3s', '3-10s', '10-30s', '30-90s', 'over-90s', 'unknown'].includes(event.responseBand)
      ? event.responseBand : 'unknown',
    support: event.support === true,
  }]
}

const responseBand = (durationMs) => {
  if (!Number.isFinite(Number(durationMs)) || Number(durationMs) < 0) return 'unknown'
  if (durationMs < 3000) return 'under-3s'
  if (durationMs < 10000) return '3-10s'
  if (durationMs < 30000) return '10-30s'
  if (durationMs < 90000) return '30-90s'
  return 'over-90s'
}

export function learningTelemetryEvent({
  track,
  targetId,
  stageId,
  variantId = null,
  tier = 0,
  correct,
  attemptedAtMs = 0,
  responseDurationMs,
  support = false,
} = {}) {
  const candidate = normalizeLearningEvent({
    sequence: 0,
    atMinute: Number.isFinite(Number(attemptedAtMs)) && Number(attemptedAtMs) > 0
      ? Math.floor(Number(attemptedAtMs) / 60000) : 0,
    track,
    targetId,
    stageId,
    variantId,
    tier,
    outcome: correct === true ? 'correct' : correct === false ? 'wrong' : null,
    responseBand: responseBand(responseDurationMs),
    support,
  })
  return candidate[0] || null
}

export function appendLearningTelemetryEvent(state, event) {
  const current = normalizeLearningTelemetryState(state)
  if (!current.learningResearchConsent || !event) return current
  const normalized = normalizeLearningEvent(event)[0]
  if (!normalized) return current
  const sequence = current.learningTelemetrySequence + 1
  return {
    ...current,
    learningTelemetrySequence: sequence,
    learningTelemetryEvents: [
      ...current.learningTelemetryEvents,
      { ...normalized, sequence },
    ].slice(-LEARNING_TELEMETRY_POLICY.maximumEvents),
  }
}

export function setLearningResearchConsent(state, consent) {
  const current = normalizeLearningTelemetryState(state)
  if (consent !== true) return emptyLearningTelemetryState()
  return { ...current, learningResearchConsent: true }
}
