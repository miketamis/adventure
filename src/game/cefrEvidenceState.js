// Compact, task-bank-free persistence for CEFR readiness evidence.
//
// The game-state reducer is part of the first-play bundle, while the held-out
// task bank is needed only after the learner opens the readiness journey. Keep
// this boundary structural: the core accepts only the small public evidence
// schema and preserves the first result for each form. `cefrAssessment.js`
// applies the stricter current-task-bank check before any record can count.

export const CEFR_EVIDENCE_VERSION = 1

const LEVEL_IDS = new Set(['A1', 'A2'])
const MODE_IDS = new Set([
  'listening',
  'reading',
  'spokenInteraction',
  'spokenProduction',
  'writtenInteraction',
  'writtenProduction',
  'mediation',
])
const RECEPTION_MODES = new Set(['listening', 'reading'])
const SPOKEN_MODES = new Set(['spokenInteraction', 'spokenProduction'])
const RUBRIC_DIMENSIONS = Object.freeze([
  'taskFulfilment',
  'comprehensibility',
  'range',
  'control',
  'cohesion',
])

const finiteInteger = (value, fallback = 0) => {
  const number = Number(value)
  return Number.isFinite(number) ? Math.floor(number) : fallback
}

const boundedId = (value) => typeof value === 'string' && value.length > 0 && value.length <= 200

export const clampCefrRubric = (rubric) => Object.fromEntries(
  RUBRIC_DIMENSIONS.map((dimension) => [
    dimension,
    Math.max(0, Math.min(3, finiteInteger(rubric?.[dimension]))),
  ]),
)

export function cefrEvidenceKey(event) {
  return [event?.level, event?.mode, event?.taskFamily, event?.variantId, event?.windowId]
    .join('|')
}

export function normalizeStoredCefrEvent(raw) {
  if (!raw || typeof raw !== 'object' || raw.heldOut !== true) return null
  if (!LEVEL_IDS.has(raw.level) || !MODE_IDS.has(raw.mode)) return null
  if (![raw.taskFamily, raw.taskId, raw.variantId, raw.windowId].every(boundedId)) return null

  const shared = {
    level: raw.level,
    mode: raw.mode,
    taskFamily: raw.taskFamily,
    taskId: raw.taskId,
    variantId: raw.variantId,
    windowId: raw.windowId,
    heldOut: true,
  }
  if (RECEPTION_MODES.has(raw.mode)) {
    if (!['gist', 'detail'].includes(raw.questionKind) || typeof raw.correct !== 'boolean') return null
    return {
      ...shared,
      questionKind: raw.questionKind,
      correct: raw.correct,
      attempt: Math.max(1, finiteInteger(raw.attempt, 1)),
    }
  }

  const spoken = SPOKEN_MODES.has(raw.mode)
  return {
    ...shared,
    rubric: clampCefrRubric(raw.rubric),
    pronunciationPass: spoken
      ? raw.pronunciationPass === true && raw.recordingCaptured === true
      : undefined,
    recordingCaptured: spoken ? raw.recordingCaptured === true : undefined,
    attempt: Math.max(1, finiteInteger(raw.attempt, 1)),
  }
}

export function normalizeStoredCefrEvidence(value) {
  if (!Array.isArray(value)) return []
  const byKey = new Map()
  for (const raw of value) {
    const event = normalizeStoredCefrEvent(raw)
    if (!event) continue
    const key = cefrEvidenceKey(event)
    if (!byKey.has(key)) byKey.set(key, event)
  }
  return [...byKey.values()].slice(-300)
}

export function mergeStoredCefrEvidence(current, additions) {
  const previous = normalizeStoredCefrEvidence(current)
  const normalizedAdditions = normalizeStoredCefrEvidence(additions)
  const byKey = new Map(previous.map((event) => [cefrEvidenceKey(event), event]))
  for (const event of normalizedAdditions) {
    const key = cefrEvidenceKey(event)
    // Once the learner sees a held-out form, later rehearsal cannot replace
    // its first result. The task-aware layer independently verifies whether
    // this structural record belongs to the current assessment bank.
    if (!byKey.has(key)) byKey.set(key, event)
  }
  return [...byKey.values()].slice(-300)
}

export const emptyCefrState = () => ({
  cefrEvidenceVersion: CEFR_EVIDENCE_VERSION,
  cefrEvidence: [],
})

export function normalizeStoredCefrState(saved) {
  const currentVersion = saved?.cefrEvidenceVersion === CEFR_EVIDENCE_VERSION
  return {
    cefrEvidenceVersion: CEFR_EVIDENCE_VERSION,
    cefrEvidence: currentVersion ? normalizeStoredCefrEvidence(saved?.cefrEvidence) : [],
  }
}
