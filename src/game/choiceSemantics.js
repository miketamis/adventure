// Shared choice-intent contract. The game stays choice-driven, but authoring
// tools and release audits still need to know whether a button is speech,
// travel, an observation, or a physical act. Explicit metadata wins; the
// conservative English-reading classifier keeps the existing corpus covered
// while content is migrated gradually.

export const CHOICE_INTENTS = Object.freeze([
  'speech',
  'movement',
  'observation',
  'physical',
  'transaction',
  'wait',
  'other',
])

const SPEECH_OPENING = /^(?:say|tell|ask|answer|reply|greet|wish|call out|i\b|i['’]m\b|i am\b|i will\b|i['’]ll\b|we\b|we['’]ll\b|my\b|yes\b|no\b|hello\b|good (?:morning|evening|night)\b|thank|thanks|please\b|sorry\b|what\b|who\b|where\b|when\b|why\b|how\b|do you\b|can you\b|may i\b|will you\b|have you\b|are you\b|is there\b|of course\b|all right\b)/i
const MOVEMENT_OPENING = /^(?:go|walk|ride|run|climb|descend|cross|enter|leave|return|follow|come to|step|swim|sail|fly|take the (?:road|path|track|way)|head (?:to|toward)|set out)/i
const WAIT_OPENING = /^(?:wait|rest|sleep|stay|sit|stand still)/i
const TRANSACTION_OPENING = /^(?:buy|sell|pay|give .* lek|take the bill)/i

const readingOf = (option) => String(
  option?.choiceReading || option?.text?.optionReading || option?.text?.reading || '',
).trim()

export function explicitChoiceIntentOf(option) {
  return CHOICE_INTENTS.includes(option?.intent) ? option.intent : null
}
export function inferredChoiceIntentOf(option) {
  if (option?.observation || option?.contextObservation) return 'observation'
  const reading = readingOf(option)
  if (SPEECH_OPENING.test(reading)) return 'speech'
  if (TRANSACTION_OPENING.test(reading)) return 'transaction'
  if (WAIT_OPENING.test(reading)) return 'wait'
  if (MOVEMENT_OPENING.test(reading)) return 'movement'
  if (option?.contextItemAction || option?.effects?.length || option?.grant || option?.consumes) return 'physical'
  return 'other'
}

export const choiceIntentOf = (option) =>
  explicitChoiceIntentOf(option) || inferredChoiceIntentOf(option)

export const isSpokenChoice = (option) => choiceIntentOf(option) === 'speech'

export function choiceSemanticsIssues(option) {
  const issues = []
  if (option?.intent != null && !CHOICE_INTENTS.includes(option.intent)) {
    issues.push(`unknown explicit intent '${option.intent}'`)
  }
  if (option?.inseparableAct != null) {
    if (typeof option.inseparableAct !== 'object' || Array.isArray(option.inseparableAct)) {
      issues.push('inseparableAct must be a record')
    } else {
      if (option.inseparableAct.kind !== 'physical-act') {
        issues.push("inseparableAct.kind must be 'physical-act'")
      }
      if (typeof option.inseparableAct.reason !== 'string' || option.inseparableAct.reason.trim().length < 20) {
        issues.push('inseparableAct needs a concrete author rationale')
      }
      if (choiceIntentOf(option) !== 'physical') {
        issues.push('inseparableAct is only valid on an explicitly physical choice')
      }
    }
  }
  return issues
}

export function choiceMovesBetweenPlaces(fromNodeId, option, placeOf) {
  const fromPlace = placeOf?.[fromNodeId]
  const toPlace = placeOf?.[option?.to]
  return Boolean(fromPlace && toPlace && fromPlace !== toPlace)
}

export function speechMovementIssue(fromNodeId, option, placeOf) {
  if (!isSpokenChoice(option) || !choiceMovesBetweenPlaces(fromNodeId, option, placeOf)) return null
  return 'spoken response also relocates the player; keep the reply in place, then offer movement separately'
}
