// Shared, dependency-free adaptation primitives. These records are learner
// evidence, not research analytics: they are persisted locally so a real delay
// survives reloads even when optional research-event consent is off.

const HOUR_MS = 60 * 60 * 1000
const DAY_MS = 24 * HOUR_MS

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const TEMPORAL_EVIDENCE_VERSION = 1

export const ELAPSED_SPACING_POLICY = deepFreeze({
  version: TEMPORAL_EVIDENCE_VERSION,
  clock: 'unix milliseconds supplied by the caller',
  initialRetentionMs: 4 * HOUR_MS,
  maximumRetentionMs: 30 * DAY_MS,
  correctMultiplier: 2,
  lapseMultiplier: 0.5,
  minimumInterveningRounds: 1,
  dueRule: 'ordinary support uses disjoint rounds; durable retention requires both its round gap and real elapsed interval',
})

// This is deliberately an interpretable cold-start prior. The feature schema
// is suitable for later offline HLR/IRT fitting, but none of these coefficients
// has been calibrated on Albanian learners.
export const COLD_START_ADAPTATION_MODEL = deepFreeze({
  id: 'interpretable-cold-start-v1',
  classification: 'uncalibrated heuristic prior',
  sotaClaim: false,
  targetRecallBand: [0.7, 0.86],
  featureSchema: [
    'log1pElapsedHours',
    'log1pAttempts',
    'smoothedAccuracy',
    'lapseRate',
    'stageDifficulty',
    'supportLevel',
    'modeChoice',
    'modeConstruct',
    'modeType',
    'modeListen',
    'modeMatch',
  ],
  uncertainty: {
    highBelowAttempts: 4,
    mediumBelowAttempts: 10,
    failSoft: 'uncertain estimates may increase support or shorten review intervals, but never skip a registry prerequisite or award mastery',
  },
  calibrationRequirement: 'Fit and validate coefficients only after consented true-beginner data, delayed outcomes, subgroup checks and held-out evaluation exist.',
})

const safeCount = (value) => Number.isSafeInteger(Number(value)) && Number(value) > 0
  ? Number(value) : 0
const safeTime = (value) => Number.isSafeInteger(Number(value)) && Number(value) > 0
  ? Number(value) : 0
const boundedDuration = (value) => Number.isFinite(Number(value)) && Number(value) >= 0
  ? Math.min(60 * 60 * 1000, Math.round(Number(value))) : 0

export function emptyTemporalEvidence() {
  return {
    version: TEMPORAL_EVIDENCE_VERSION,
    attempts: 0,
    correct: 0,
    lapses: 0,
    supportExposures: 0,
    lastAttemptAtMs: 0,
    lastResponseDurationMs: 0,
    dueAtMs: 0,
    reviewIntervalMs: ELAPSED_SPACING_POLICY.initialRetentionMs,
  }
}

export function normalizeTemporalEvidence(value) {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const attempts = safeCount(source.attempts)
  const correct = Math.min(attempts, safeCount(source.correct))
  return {
    version: TEMPORAL_EVIDENCE_VERSION,
    attempts,
    correct,
    lapses: Math.min(attempts, safeCount(source.lapses)),
    supportExposures: Math.min(attempts, safeCount(source.supportExposures)),
    lastAttemptAtMs: safeTime(source.lastAttemptAtMs),
    lastResponseDurationMs: boundedDuration(source.lastResponseDurationMs),
    dueAtMs: safeTime(source.dueAtMs),
    reviewIntervalMs: Math.max(
      ELAPSED_SPACING_POLICY.initialRetentionMs,
      Math.min(
        ELAPSED_SPACING_POLICY.maximumRetentionMs,
        safeTime(source.reviewIntervalMs) || ELAPSED_SPACING_POLICY.initialRetentionMs,
      ),
    ),
  }
}

export function recordTemporalAttempt(value, {
  correct,
  attemptedAtMs,
  responseDurationMs,
  supportExposed = false,
  retention = false,
} = {}) {
  const current = normalizeTemporalEvidence(value)
  const at = safeTime(attemptedAtMs)
  const next = {
    ...current,
    attempts: current.attempts + 1,
    correct: current.correct + (correct === true ? 1 : 0),
    lapses: current.lapses + (correct === false ? 1 : 0),
    supportExposures: current.supportExposures + (supportExposed ? 1 : 0),
    lastAttemptAtMs: at || current.lastAttemptAtMs,
    lastResponseDurationMs: boundedDuration(responseDurationMs),
  }
  if (retention) {
    next.reviewIntervalMs = correct
      ? Math.min(ELAPSED_SPACING_POLICY.maximumRetentionMs, current.reviewIntervalMs * ELAPSED_SPACING_POLICY.correctMultiplier)
      : Math.max(ELAPSED_SPACING_POLICY.initialRetentionMs, Math.floor(current.reviewIntervalMs * ELAPSED_SPACING_POLICY.lapseMultiplier))
    next.dueAtMs = at ? at + next.reviewIntervalMs : 0
  } else {
    // Supported stages continue through the existing disjoint-round ladder.
    // Clearing a stale retention time prevents an easier remediation activity
    // from being blocked by the harder activity's old interval.
    next.dueAtMs = 0
  }
  return normalizeTemporalEvidence(next)
}

export function temporalDue({
  currentRound = 0,
  dueAfterRound = 0,
  nowMs = 0,
  dueAtMs = 0,
  requireElapsed = false,
} = {}) {
  const roundDue = Math.max(0, Number(currentRound) || 0) >= Math.max(0, Number(dueAfterRound) || 0)
  if (!roundDue) return false
  if (!requireElapsed || !safeTime(dueAtMs)) return true
  // A caller that has no trustworthy wall clock fails soft to the existing
  // round policy. Runtime callers always supply Date.now(); deterministic
  // audits can omit it without manufacturing a timestamp.
  return !safeTime(nowMs) || safeTime(nowMs) >= safeTime(dueAtMs)
}

const logistic = (value) => 1 / (1 + Math.exp(-value))
const round = (value, digits = 4) => Number(value.toFixed(digits))

export function coldStartAdaptationSnapshot(value, {
  nowMs = 0,
  stageTier = 0,
  mode = 'choice',
  supportLevel = 0,
} = {}) {
  const evidence = normalizeTemporalEvidence(value)
  const elapsedHours = evidence.lastAttemptAtMs && safeTime(nowMs)
    ? Math.max(0, (safeTime(nowMs) - evidence.lastAttemptAtMs) / HOUR_MS) : 0
  const smoothedAccuracy = (evidence.correct + 1) / (evidence.attempts + 2)
  const lapseRate = evidence.attempts ? evidence.lapses / evidence.attempts : 0
  const features = {
    log1pElapsedHours: round(Math.log1p(elapsedHours)),
    log1pAttempts: round(Math.log1p(evidence.attempts)),
    smoothedAccuracy: round(smoothedAccuracy),
    lapseRate: round(lapseRate),
    stageDifficulty: Math.max(0, Math.min(1, Number(stageTier) / 6 || 0)),
    supportLevel: Math.max(0, Math.min(1, Number(supportLevel) || 0)),
    modeChoice: mode === 'choice' ? 1 : 0,
    modeConstruct: mode === 'construct' ? 1 : 0,
    modeType: mode === 'type' ? 1 : 0,
    modeListen: mode === 'listen' ? 1 : 0,
    modeMatch: mode === 'match' ? 1 : 0,
  }
  const halfLifeHours = Math.max(1, evidence.reviewIntervalMs / HOUR_MS)
  const recallFromHalfLife = Math.pow(2, -elapsedHours / halfLifeHours)
  const challenge = features.stageDifficulty * 0.7 + (features.modeType + features.modeListen) * 0.2
  const irtPrior = logistic((smoothedAccuracy - 0.5) * 4 - challenge + features.supportLevel * 0.45)
  const estimatedRecall = round(Math.max(0.01, Math.min(0.99, recallFromHalfLife * 0.65 + irtPrior * 0.35)))
  const uncertainty = evidence.attempts < COLD_START_ADAPTATION_MODEL.uncertainty.highBelowAttempts
    ? 'high'
    : evidence.attempts < COLD_START_ADAPTATION_MODEL.uncertainty.mediumBelowAttempts ? 'medium' : 'lower'
  const margin = uncertainty === 'high' ? 0.25 : uncertainty === 'medium' ? 0.15 : 0.08
  return {
    modelId: COLD_START_ADAPTATION_MODEL.id,
    calibrated: false,
    features,
    estimate: estimatedRecall,
    interval: [round(Math.max(0.01, estimatedRecall - margin)), round(Math.min(0.99, estimatedRecall + margin))],
    uncertainty,
    recommendation: uncertainty === 'high'
      ? 'keep registry stage; prefer support after a miss and do not accelerate'
      : estimatedRecall < COLD_START_ADAPTATION_MODEL.targetRecallBand[0]
        ? 'review due; use the registry remediation rule if the preceding attempt missed'
        : estimatedRecall > COLD_START_ADAPTATION_MODEL.targetRecallBand[1]
          ? 'retain the registry gate and allow its interval to expand only after correct strict recall'
          : 'inside the cold-start target band; keep the registry plan',
  }
}
