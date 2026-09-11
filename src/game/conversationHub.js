// Stateful conversation hubs keep ordinary NPC talk under the player's control.
// A hub starts with a short lived beat, exposes specific questions in any order,
// shows only the latest answer, and always leaves an explicit way to end the
// conversation. Asked questions retire by default instead of becoming a row of
// dead buttons. The metadata is also the authoring/audit contract: content and
// tests consume the same hub definition rather than duplicating flag names.

const HUBS = {}

const list = (value) => value == null ? [] : Array.isArray(value) ? value : [value]
const rawFlagId = (conditionId) => conditionId.startsWith('flag:')
  ? conditionId.slice('flag:'.length)
  : conditionId

const stablePart = (value, label) => {
  if (typeof value !== 'string' || !/^[a-z][a-zA-Z0-9-]*$/.test(value)) {
    throw new Error(`${label} must be a stable lower-camel/kebab id`)
  }
  return value
}

const defaultAskedCondition = (hubId, questionId) =>
  `flag:conversation:${hubId}:asked:${questionId}`
const defaultResponseCondition = (hubId, questionId) =>
  `flag:conversation:${hubId}:response:${questionId}`

export function defineConversationHub({
  id,
  nodeId,
  npcId,
  questions,
  exitTo,
  substantial = true,
}) {
  stablePart(id, 'conversation hub id')
  stablePart(nodeId, 'conversation hub node id')
  stablePart(npcId, 'conversation hub NPC id')
  stablePart(exitTo, 'conversation hub exit node id')
  if (HUBS[id]) throw new Error(`Duplicate conversation hub id: ${id}`)

  const normalizedQuestions = Object.fromEntries(Object.entries(questions || {}).map(([questionId, spec]) => {
    stablePart(questionId, `${id} question id`)
    return [questionId, Object.freeze({
      id: questionId,
      askedCondition: spec?.askedCondition || defaultAskedCondition(id, questionId),
      responseCondition: spec?.responseCondition || defaultResponseCondition(id, questionId),
      purpose: spec?.purpose || questionId,
    })]
  }))
  if (Object.keys(normalizedQuestions).length < 2) {
    throw new Error(`Conversation hub '${id}' needs at least two optional questions`)
  }

  const hub = Object.freeze({
    id,
    nodeId,
    npcId,
    exitTo,
    substantial: substantial !== false,
    questions: Object.freeze(normalizedQuestions),
  })
  HUBS[id] = hub
  return hub
}

export const CONVERSATION_HUBS = HUBS

export const conversationQuestionSpec = (hub, questionId) => {
  const question = hub?.questions?.[questionId]
  if (!question) throw new Error(`Unknown question '${questionId}' in conversation hub '${hub?.id}'`)
  return question
}

export const conversationResponseCondition = (hub, questionId) =>
  conversationQuestionSpec(hub, questionId).responseCondition

export const clearConversationResponseEffects = (hub) =>
  Object.values(hub.questions).map((question) => ({
    type: 'flag',
    id: rawFlagId(question.responseCondition),
    value: false,
  }))

export function conversationQuestionOption(hub, questionId, text, option = {}) {
  const question = conversationQuestionSpec(hub, questionId)
  return {
    ...option,
    text,
    to: option.to || hub.nodeId,
    durationHours: option.durationHours ?? 0,
    unless: [...list(option.unless), question.askedCondition],
    effects: [
      ...clearConversationResponseEffects(hub),
      { type: 'flag', id: rawFlagId(question.askedCondition) },
      { type: 'flag', id: rawFlagId(question.responseCondition) },
      ...list(option.effects),
    ],
    conversationHub: Object.freeze({ hubId: hub.id, kind: 'question', questionId }),
  }
}

export function conversationResponseLine(hub, questionId, lineOrEntry) {
  const entry = Array.isArray(lineOrEntry) ? { line: lineOrEntry } : lineOrEntry
  return {
    ...entry,
    cond: [...list(entry.cond), conversationResponseCondition(hub, questionId)],
    conversationHub: Object.freeze({ hubId: hub.id, kind: 'response', questionId }),
  }
}

export function conversationExitOption(hub, text, option = {}) {
  return {
    ...option,
    text,
    to: option.to || hub.exitTo,
    durationHours: option.durationHours ?? 0,
    effects: [...clearConversationResponseEffects(hub), ...list(option.effects)],
    conversationHub: Object.freeze({ hubId: hub.id, kind: 'exit' }),
  }
}
