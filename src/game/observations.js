// Progressive perception is authored as a small, reusable story contract.
// A scene may keep one or two coherent details behind an attention action;
// choosing it records one observation and reveals its related lines in place.
// The contract deliberately carries no story/dictionary imports, so content,
// reducer validation, presentation and audits can all consume the same rules.

const UNSAFE_IDS = new Set(['__proto__', 'prototype', 'constructor'])
const safeId = (value) => typeof value === 'string' && value.trim() === value &&
  value.length > 0 && !UNSAFE_IDS.has(value)

export const OBSERVATION_CONDITION_PREFIX = 'observed:'

export const OBSERVATION_POLICY = Object.freeze({
  maxActionsPerScene: 2,
  minLinesPerBeat: 1,
  maxLinesPerBeat: 2,
  durationHours: 0,
  stateScope: 'run',
  entryPrinciple: 'Show immediate footing, danger and ordinary exits; let attention reveal optional detail in place.',
})

export const SCENE_LINE_ROLES = Object.freeze({
  immediate: 'immediate-essential',
  ambient: 'optional-ambient',
  observation: 'observation-gated',
})

export const observationConditionId = (id) =>
  safeId(id) ? `${OBSERVATION_CONDITION_PREFIX}${id}` : null

export const isObservationConditionId = (id) =>
  typeof id === 'string' && id.startsWith(OBSERVATION_CONDITION_PREFIX) &&
  safeId(id.slice(OBSERVATION_CONDITION_PREFIX.length))

export const observationIdFromCondition = (id) =>
  isObservationConditionId(id) ? id.slice(OBSERVATION_CONDITION_PREFIX.length) : null

export const observationIdOfLine = (line) => safeId(line?.observation?.id)
  ? line.observation.id
  : null

export const sceneLineRoleOf = (entry) => {
  const line = Array.isArray(entry) ? entry : entry?.line
  if (observationIdOfLine(line)) return SCENE_LINE_ROLES.observation
  if (line?.scenePriority === 'ambient') return SCENE_LINE_ROLES.ambient
  return SCENE_LINE_ROLES.immediate
}

export function markObservationLine(line, { id, beat, index, total }) {
  if (!Array.isArray(line) || !safeId(id) || !safeId(beat) ||
      !Number.isSafeInteger(index) || !Number.isSafeInteger(total) ||
      index < 0 || total < 1 || index >= total) {
    throw new Error('markObservationLine(): invalid observation metadata')
  }
  if (line.scenePriority === 'ambient') {
    throw new Error(`markObservationLine('${id}'): a line cannot be both ambient and observation-gated`)
  }
  Object.assign(line, {
    observation: Object.freeze({ id, beat, index, total }),
    sceneRole: SCENE_LINE_ROLES.observation,
  })
  return line
}

const addCondition = (value, condition) => {
  const values = value == null ? [] : Array.isArray(value) ? value : [value]
  return [...new Set([...values, condition])]
}

const albanianText = (tokens) => tokens
  .map((token) => token?.id ? token.al : token?.en)
  .join(' ')
  .replace(/\s+([.!?:,;])/g, '$1')
  .replace(/\s+/g, ' ')
  .trim()

export function buildObservationOption({ id, beat, nodeId, text, reading, kind = 'look', option = {} }) {
  const condition = observationConditionId(id)
  if (!condition || !safeId(beat) || !safeId(nodeId) || !Array.isArray(text) || !text.length ||
      typeof reading !== 'string' || !reading.trim()) {
    throw new Error('buildObservationOption(): incomplete observation action')
  }
  if (!['look', 'listen', 'inspect', 'ask'].includes(kind)) {
    throw new Error(`buildObservationOption('${id}'): unsupported attention kind '${kind}'`)
  }
  Object.assign(text, {
    optionReading: reading.trim(),
    optionReadingAlbanian: albanianText(text),
    optionReadingReview: 'generated-observation',
  })
  return {
    ...option,
    text,
    to: nodeId,
    durationHours: OBSERVATION_POLICY.durationHours,
    unless: addCondition(option.unless, condition),
    effects: [...(option.effects || []), { type: 'observe', id }],
    observation: Object.freeze({ id, beat, kind }),
    contextObservation: Object.freeze({ id, beat, kind }),
  }
}

export function installObservationBeats(story, beats) {
  const seen = new Set()
  for (const spec of beats || []) {
    const { id, nodeId, lineIndices, optionIndices = [] } = spec || {}
    const node = story?.[nodeId]
    if (!safeId(id) || seen.has(id)) throw new Error(`duplicate or invalid observation id '${id}'`)
    if (!node || !Array.isArray(lineIndices) ||
        lineIndices.length < OBSERVATION_POLICY.minLinesPerBeat ||
        lineIndices.length > OBSERVATION_POLICY.maxLinesPerBeat ||
        new Set(lineIndices).size !== lineIndices.length ||
        !Array.isArray(optionIndices) || new Set(optionIndices).size !== optionIndices.length) {
      throw new Error(`observation '${id}' has no valid 1–2 line beat in '${nodeId}'`)
    }
    const lines = lineIndices.map((index) => {
      const entry = node.text?.[index]
      const line = Array.isArray(entry) ? entry : entry?.line
      if (!Array.isArray(line)) throw new Error(`observation '${id}' points at missing ${nodeId}.text[${index}]`)
      return line
    })
    lines.forEach((line, index) => markObservationLine(line, {
      id,
      beat: spec.beat,
      index,
      total: lines.length,
    }))
    const condition = observationConditionId(id)
    for (const index of optionIndices) {
      const option = node.options?.[index]
      if (!Number.isSafeInteger(index) || index < 0 || !option || option.confuser) {
        throw new Error(`observation '${id}' points at invalid ${nodeId}.options[${index}]`)
      }
      option.requires = addCondition(option.requires, condition)
      option.attentionGate = Object.freeze({ id, beat: spec.beat })
    }
    node.options.push(buildObservationOption({ ...spec, text: spec.action() }))
    seen.add(id)
  }
  return story
}

export function normalizeObservations(value, maxClock = Infinity) {
  const next = {}
  if (!value || typeof value !== 'object' || Array.isArray(value)) return next
  for (const [id, raw] of Object.entries(value)) {
    if (!safeId(id) || raw == null || raw === false) continue
    const record = raw && typeof raw === 'object' && !Array.isArray(raw) ? raw : {}
    const atClock = Number.isFinite(record.atClock)
      ? Math.max(0, Math.min(maxClock, Math.floor(record.atClock)))
      : 0
    const nodeId = safeId(record.nodeId) ? record.nodeId : null
    next[id] = { atClock, nodeId }
  }
  return next
}

export function recordObservation(observations, id, { atClock = 0, nodeId = null } = {}) {
  if (!safeId(id) || Object.hasOwn(observations || {}, id)) return observations || {}
  return {
    ...(observations || {}),
    [id]: {
      atClock: Math.max(0, Number.isFinite(atClock) ? Math.floor(atClock) : 0),
      nodeId: safeId(nodeId) ? nodeId : null,
    },
  }
}
