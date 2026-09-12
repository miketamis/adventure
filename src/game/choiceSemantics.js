import { optionEffectsOf } from './stateMechanics.js'

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

// `intent` is the coarse, backwards-compatible primary action used by the
// runtime. `playerIntents` is the authoring contract for the independently
// meaningful things a player believes one button will do. Most choices have
// exactly one. Keeping this separate from effects matters: receiving a quest
// advance after accepting a task is a consequence, not a hidden second
// intention, while accepting a task and following its giver really is two
// independently reversible decisions.
export const PLAYER_INTENTS = Object.freeze([
  'speech',
  'movement',
  'observation',
  'acquisition',
  'transfer',
  'use',
  'transaction',
  'commitment',
  'wait',
  'physical',
  'other',
])

const SPEECH_OPENING = /^(?:say|tell|ask|answer|reply|greet|wish|call out|i\b|i['’]m\b|i am\b|i will\b|i['’]ll\b|we\b|we['’]ll\b|my\b|yes\b|no\b|hello\b|good (?:morning|evening|night)\b|thank|thanks|please\b|sorry\b|what\b|who\b|where\b|when\b|why\b|how\b|do you\b|can you\b|may i\b|will you\b|have you\b|are you\b|is there\b|of course\b|all right\b)/i
const MOVEMENT_OPENING = /^(?:(?:go|walk|ride|run|climb|descend|cross|enter|leave|return|follow|come to|step|swim|sail|fly)\b|take the (?:road|path|track|way)\b|head (?:to|toward)\b|set out\b)/i
const WAIT_OPENING = /^(?:wait|rest|sleep|stay|sit|stand still)/i
const TRANSACTION_OPENING = /^(?:buy|sell|pay|give .* lek|take the bill)/i
const ACQUISITION_OPENING = /^(?:take|pick up|collect|gather|receive|keep)\b/i
const TRANSFER_OPENING = /^(?:give|hand|offer|pay|sell)\b/i
const USE_OPENING = /^(?:use|light|extinguish|refuel|unlock|open|close|put|throw|wash|dry|bandage|drink|eat|strike|cut)\b/i
const OBSERVATION_OPENING = /^(?:look|listen|inspect|examine|watch|read|smell|feel|search)\b/i
const COMMITMENT_OPENING = /^(?:accept|agree|promise|swear|choose|decide|yes\b|no\b|not now\b|all right\b)/i

const FOLLOWUP_INTENT_MENTIONS = Object.freeze({
  speech: /(?:\bthen\b|[.;]|\band\b)\s*(?:i (?:will |shall )?)?(?:say|tell|ask|answer|reply|greet|call out)\b/i,
  movement: /(?:\bthen\b|[.;]|\band\b)\s*(?:i (?:will |shall )?|let us )?(?:go|walk|ride|run|climb|descend|cross|enter|leave|return|follow|come|step|swim|sail|fly|head toward|set out)\b/i,
  observation: /(?:\bthen\b|[.;]|\band\b)\s*(?:i (?:will |shall )?)?(?:look|listen|inspect|examine|watch|read|smell|feel|search)\b/i,
  acquisition: /(?:\bthen\b|[.;]|\band\b)\s*(?:i (?:will |shall )?)?(?:take|pick up|collect|gather|receive|keep)\b/i,
  transfer: /(?:\bthen\b|[.;]|\band\b)\s*(?:i (?:will |shall )?)?(?:give|hand|offer|pay|sell)\b/i,
  use: /(?:\bthen\b|[.;]|\band\b)\s*(?:i (?:will |shall )?)?(?:use|light|extinguish|refuel|unlock|open|close|put|throw|wash|dry|bandage|drink|eat|strike|cut)\b/i,
  commitment: /(?:\bthen\b|[.;]|\band\b)\s*(?:i (?:will |shall )?)?(?:accept|agree|promise|swear|choose|decide)\b/i,
  wait: /(?:\bthen\b|[.;]|\band\b)\s*(?:i (?:will |shall )?)?(?:wait|rest|sleep|stay|sit|stand still)\b/i,
})

const readingOf = (option) => String(
  option?.choiceReading || option?.text?.optionReading || option?.text?.reading || '',
).trim()

export function explicitChoiceIntentOf(option) {
  return CHOICE_INTENTS.includes(option?.intent) ? option.intent : null
}

export function explicitPlayerIntentsOf(option) {
  if (!Array.isArray(option?.playerIntents)) return Object.freeze([])
  return Object.freeze(option.playerIntents.filter((intent) => PLAYER_INTENTS.includes(intent)))
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

const coarseIntentOfPlayerIntent = (intent) => ({
  speech: 'speech',
  movement: 'movement',
  observation: 'observation',
  acquisition: 'transaction',
  transfer: 'transaction',
  use: 'physical',
  transaction: 'transaction',
  commitment: 'other',
  wait: 'wait',
  physical: 'physical',
  other: 'other',
})[intent] || null

export const choiceIntentOf = (option) =>
  explicitChoiceIntentOf(option) ||
  coarseIntentOfPlayerIntent(explicitPlayerIntentsOf(option)[0]) ||
  inferredChoiceIntentOf(option)

export const isSpokenChoice = (option) => choiceIntentOf(option) === 'speech'

export function choiceSemanticsIssues(option) {
  const issues = []
  if (option?.intent != null && !CHOICE_INTENTS.includes(option.intent)) {
    issues.push(`unknown explicit intent '${option.intent}'`)
  }
  if (option?.playerIntents != null) {
    if (!Array.isArray(option.playerIntents) || option.playerIntents.length === 0) {
      issues.push('playerIntents must be a non-empty array')
    } else {
      const unknown = option.playerIntents.filter((intent) => !PLAYER_INTENTS.includes(intent))
      if (unknown.length) issues.push(`unknown player intent '${unknown[0]}'`)
      if (new Set(option.playerIntents).size !== option.playerIntents.length) {
        issues.push('playerIntents must not contain duplicates')
      }
    }
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
      const declared = explicitPlayerIntentsOf(option)
      if (declared.length < 2) {
        issues.push('inseparableAct requires every bundled player intention in playerIntents')
      }
      if (declared.some((intent) => ['speech', 'observation', 'commitment', 'wait'].includes(intent))) {
        issues.push('speech, observation, commitment, and waiting are never inseparable physical acts')
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

const FORBIDDEN_COMPOUND_PAIRS = Object.freeze(new Set([
  'acquisition+movement',
  'acquisition+observation',
  'acquisition+speech',
  'acquisition+wait',
  'commitment+movement',
  'commitment+observation',
  'commitment+wait',
  'movement+observation',
  'movement+speech',
  'movement+transfer',
  'movement+use',
  'movement+wait',
  'observation+transfer',
  'observation+use',
  'observation+wait',
  'speech+transfer',
  'speech+use',
  'speech+wait',
  'transfer+wait',
  'use+wait',
]))

const pairKey = (left, right) => [left, right].sort().join('+')
const isForbiddenPair = (left, right) => FORBIDDEN_COMPOUND_PAIRS.has(pairKey(left, right))
const unique = (values) => [...new Set(values)]

function allPairs(intents) {
  const pairs = []
  for (let left = 0; left < intents.length; left++) {
    for (let right = left + 1; right < intents.length; right++) {
      pairs.push(pairKey(intents[left], intents[right]))
    }
  }
  return unique(pairs)
}

function lexicalPlayerIntents(option) {
  const reading = readingOf(option)
  const intents = []
  // These are editorial leads, never the sole basis of a release failure. The
  // durable gate uses explicit metadata and structural state transitions.
  if (SPEECH_OPENING.test(reading)) intents.push('speech')
  if (MOVEMENT_OPENING.test(reading)) intents.push('movement')
  if (WAIT_OPENING.test(reading)) intents.push('wait')
  if (OBSERVATION_OPENING.test(reading)) intents.push('observation')
  if (ACQUISITION_OPENING.test(reading)) intents.push('acquisition')
  if (TRANSFER_OPENING.test(reading)) intents.push('transfer')
  if (USE_OPENING.test(reading)) intents.push('use')
  if (COMMITMENT_OPENING.test(reading)) intents.push('commitment')
  for (const [intent, pattern] of Object.entries(FOLLOWUP_INTENT_MENTIONS)) {
    if (pattern.test(reading)) intents.push(intent)
  }
  return unique(intents)
}

function structuralPlayerIntents(fromNodeId, option, placeOf) {
  const intents = []
  if (choiceMovesBetweenPlaces(fromNodeId, option, placeOf)) intents.push('movement')
  if (option?.observation || option?.contextObservation) intents.push('observation')
  if (['accept', 'decline', 'abandon'].includes(option?.questAction?.action)) intents.push('commitment')
  if (option?.questAction?.action === 'turn-in') intents.push('transfer')
  return unique(intents)
}

function effectPlayerIntentEvidence(option) {
  const intents = []
  for (const effect of optionEffectsOf(option)) {
    if (effect?.type === 'inventory' && effect.delta > 0) intents.push('acquisition')
    if (effect?.type === 'inventory' && effect.delta < 0) intents.push('transfer')
    if (effect?.type === 'fixture') intents.push('use')
  }
  return unique(intents)
}

function intentPairs(intents) {
  const pairs = []
  for (let left = 0; left < intents.length; left++) {
    for (let right = left + 1; right < intents.length; right++) {
      if (isForbiddenPair(intents[left], intents[right])) pairs.push(pairKey(intents[left], intents[right]))
    }
  }
  return unique(pairs)
}

// Definite issues are based on explicit author declarations or structural
// world transitions. English editorial readings only create non-blocking
// review candidates, so an unusual translation cannot silently break a build.
export function compoundIntentReview(fromNodeId, option, placeOf) {
  const explicit = explicitPlayerIntentsOf(option)
  const structural = structuralPlayerIntents(fromNodeId, option, placeOf)
  const effects = effectPlayerIntentEvidence(option)
  const lexical = lexicalPlayerIntents(option)
  const hasReviewedSingleIntent = explicit.length === 1 && choiceSemanticsIssues(option).length === 0
  const hardPerceptualOrSpeech = unique([...explicit, ...structural])
    .filter((intent) => ['observation', 'speech'].includes(intent))
  const definitePairs = unique([
    ...allPairs(explicit),
    ...intentPairs(unique([...explicit, ...structural])),
    ...(hasReviewedSingleIntent ? [] : intentPairs(unique([...hardPerceptualOrSpeech, ...effects]))),
  ])
  // A valid, explicit single intention is the editor's reviewed statement that
  // grants, costs, or wording detected by heuristics are consequences of that
  // one action. Real structural facts remain authoritative: declaring speech
  // cannot excuse a cross-place transition, or a quest acceptance that moves.
  const candidateEvidence = hasReviewedSingleIntent
    ? unique([...explicit, ...structural])
    : unique([...explicit, ...structural, ...effects, ...lexical])
  const candidatePairs = intentPairs(candidateEvidence)
    .filter((pair) => !definitePairs.includes(pair))

  // The established speech classifier is intentionally retained as a hard
  // compatibility guard until all story choices have explicit metadata.
  // Other lexical combinations remain editorial candidates.
  const legacySpeechMovement = speechMovementIssue(fromNodeId, option, placeOf)
  if (legacySpeechMovement && !definitePairs.includes('movement+speech')) {
    definitePairs.push('movement+speech')
  }

  const exception = option?.inseparableAct && choiceSemanticsIssues(option).length === 0
  const unresolvedDefinite = exception ? [] : definitePairs
  const unresolvedCandidates = exception ? [] : candidatePairs
  return Object.freeze({
    explicit: Object.freeze(explicit),
    structural: Object.freeze(structural),
    effects: Object.freeze(effects),
    lexical: Object.freeze(lexical),
    definitePairs: Object.freeze(unresolvedDefinite),
    candidatePairs: Object.freeze(unresolvedCandidates),
  })
}

export function compoundIntentIssues(fromNodeId, option, placeOf) {
  const review = compoundIntentReview(fromNodeId, option, placeOf)
  return review.definitePairs.map((pair) =>
    `choice combines independently reversible player intentions (${pair}); split them into separate choices`)
}
