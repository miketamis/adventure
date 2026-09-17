// Compact constructors consumed while the story graph is built. The heavier
// whole-graph inference and continuity review stays in actionSemantics.js and
// is loaded only by authoring/debug audits.
export const SEMANTIC_FACT_KINDS = Object.freeze([
  'participant',
  'object',
  'posture',
  'motion',
  'opportunity',
  'state',
])

export const ACTION_SEMANTIC_KINDS = Object.freeze([
  'accompaniment',
  'shared-action',
  'transport',
])

const unique = (values) => [...new Set(values)]

export function semanticFact(kind, id, witnesses) {
  return Object.freeze({
    kind,
    id,
    witnesses: Object.freeze(unique([].concat(witnesses || []).filter(Boolean))),
  })
}

export function withSemanticFacts(line, ...facts) {
  return Object.assign(line, {
    semanticFacts: Object.freeze(facts.flat().filter(Boolean)),
  })
}

const sceneRequirement = (kind, id) => Object.freeze({ kind, id, evidence: 'scene' })
const destinationConsequence = (kind, id) => Object.freeze({ kind, id, evidence: 'destination' })

export function accompanimentSemantics(journeyId, participantIds) {
  const participants = unique([].concat(participantIds || []).filter(Boolean))
  return Object.freeze({
    kind: 'accompaniment',
    journeyId,
    participantIds: Object.freeze(participants),
    prerequisites: Object.freeze([
      ...participants.map((id) => sceneRequirement('participant', id)),
      sceneRequirement('opportunity', journeyId),
    ]),
    consequences: Object.freeze([
      ...participants.map((id) => destinationConsequence('participant', id)),
      destinationConsequence('motion', journeyId),
    ]),
  })
}

export function sharedActionSemantics(actionId, participantIds) {
  const participants = unique([].concat(participantIds || []).filter(Boolean))
  return Object.freeze({
    kind: 'shared-action',
    actionId,
    participantIds: Object.freeze(participants),
    prerequisites: Object.freeze([
      ...participants.map((id) => sceneRequirement('participant', id)),
      sceneRequirement('opportunity', actionId),
    ]),
    consequences: Object.freeze([
      ...participants.map((id) => destinationConsequence('participant', id)),
      destinationConsequence('state', actionId),
    ]),
  })
}

export function transportSemantics(journeyId, objectIds) {
  const objects = unique([].concat(objectIds || []).filter(Boolean))
  return Object.freeze({
    kind: 'transport',
    journeyId,
    objectIds: Object.freeze(objects),
    prerequisites: Object.freeze([
      ...objects.map((id) => sceneRequirement('object', id)),
      sceneRequirement('opportunity', journeyId),
    ]),
    consequences: Object.freeze([
      ...objects.map((id) => destinationConsequence('object', id)),
      destinationConsequence('motion', journeyId),
    ]),
  })
}
