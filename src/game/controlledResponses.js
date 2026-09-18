// One strict contract for authored, closed-choice responses. This module is
// deliberately task-bank-free so story actions can validate the same response
// shape as preparation and assessment without loading either curriculum.
const ownData = (value, key) => {
  const descriptor = Object.getOwnPropertyDescriptor(value, key)
  return descriptor && Object.hasOwn(descriptor, 'value') ? descriptor.value : undefined
}

const record = (value) => value !== null && typeof value === 'object' &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)

const id = (value) => typeof value === 'string' && value.length > 0
const invalid = () => ({ valid: false, correct: false, incorrectIds: [] })

export function evaluateControlledSelections(questions, selections) {
  if (!Array.isArray(questions) || questions.length === 0 || !record(selections)) return invalid()
  const slots = new Map()
  for (const question of questions) {
    if (!record(question)) return invalid()
    const questionId = ownData(question, 'id')
    const choices = ownData(question, 'choices')
    const accepted = ownData(question, 'acceptedChoiceIds')
    if (!id(questionId) || slots.has(questionId) || !Array.isArray(choices) ||
        choices.length === 0 || !Array.isArray(accepted) || accepted.length === 0) return invalid()
    const choiceIds = new Set()
    for (const choice of choices) {
      if (!record(choice)) return invalid()
      const choiceId = ownData(choice, 'id')
      if (!id(choiceId) || choiceIds.has(choiceId)) return invalid()
      choiceIds.add(choiceId)
    }
    if (new Set(accepted).size !== accepted.length) return invalid()
    for (const choiceId of accepted) {
      if (!id(choiceId) || !choiceIds.has(choiceId)) return invalid()
    }
    slots.set(questionId, { choiceIds, accepted })
  }
  const keys = Reflect.ownKeys(selections)
  if (keys.length !== slots.size || keys.some((key) => typeof key !== 'string' || !slots.has(key))) return invalid()
  const incorrectIds = []
  for (const [questionId, { choiceIds, accepted }] of slots) {
    const picked = ownData(selections, questionId)
    if (!id(picked) || !choiceIds.has(picked)) return invalid()
    if (!accepted.includes(picked)) incorrectIds.push(questionId)
  }
  return { valid: true, correct: incorrectIds.length === 0, incorrectIds }
}
