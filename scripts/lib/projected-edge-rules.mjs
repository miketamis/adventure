// Pure checks over concrete reducer-backed edge projections. The release audit
// passes the production story, while focused fixtures can pass a tiny graph
// directly. No rule reads an English gloss or reading: an Albanian movement
// surface, explicit intent, or structured action semantics must carry the fact.

import {
  choiceMovesBetweenPlaces,
  explicitChoiceIntentOf,
  explicitPlayerIntentsOf,
} from '../../src/game/choiceSemantics.js'
import { soloNavigationAffordanceReview } from '../../src/game/actionSemantics.js'
import {
  PLAYER_ACTION_CONDITION_PREFIX,
  canonicalPlayerActionId,
  playerActionConditionId,
} from '../../src/game/playerActionRuntime.js'
import { speechChoiceActOf } from '../../src/game/speechChoices.js'
import { optionEffectsOf } from '../../src/game/stateMechanics.js'

const list = (value) => value == null ? [] : Array.isArray(value) ? value : [value]

const stableObject = (value) => {
  if (Array.isArray(value)) return value.map(stableObject)
  if (!value || typeof value !== 'object') return value
  return Object.fromEntries(Object.entries(value)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, item]) => [key, stableObject(item)]))
}

// This signature deliberately contains only canonical state/consequence data.
// Different labels that commit the same destination and mutations do not
// manufacture agency; different destinations or effects do.
export function projectedChoiceConsequenceSignature(option) {
  return JSON.stringify(stableObject({
    to: option?.to || null,
    effects: optionEffectsOf(option),
    questAction: option?.questAction || null,
    become: option?.become || null,
    interaction: option?.interaction || null,
    rendezvous: option?.rendezvous || null,
    startsNpc: list(option?.startsNpc),
    time: option?.time || null,
    date: option?.date || null,
    atHour: option?.atHour ?? null,
    durationHours: option?.durationHours ?? null,
  }))
}

const requiredConditionsOf = (entry) => Array.isArray(entry) || entry?.negate
  ? []
  : list(entry?.cond).filter(Boolean)

const visiblePlayerActionReceipts = (destination) => (destination?.lines || []).flatMap((line) =>
  list(line?.playerActionConsequence?.actionIds).filter(Boolean))

const visibleArrivalReceiptConditions = (destination) => (destination?.entries || []).flatMap((entry) =>
  requiredConditionsOf(entry).filter((condition) => String(condition).startsWith(PLAYER_ACTION_CONDITION_PREFIX)))

const visibleConversationResponses = (destination) => (destination?.entries || [])
  .map((entry) => entry?.conversationHub)
  .filter((contract) => contract?.kind === 'response')

function canonicalMovementProof(story, nodeId, option, placeOf) {
  const semanticKind = option?.actionSemantics?.kind
  if (semanticKind === 'accompaniment' || semanticKind === 'transport') return true
  // The shared navigation review recognizes its fixed Albanian movement-token
  // grammar and verifies that its route is established. Merely declaring a
  // debug-only movement intent cannot make an unsupported visible phrase a
  // coherent journey, and English route prose is never proof.
  const navigation = soloNavigationAffordanceReview(story, nodeId, option, { placeOf })
  return navigation.candidate && navigation.issues.length === 0
}

function crossPlaceIssues({ story, placeOf, nodeId, option, label }) {
  if (!story || !choiceMovesBetweenPlaces(nodeId, option, placeOf)) return []
  const issues = []
  const speechAct = speechChoiceActOf(option)
  const explicitIntent = explicitChoiceIntentOf(option)
  const playerIntents = explicitPlayerIntentsOf(option)
  const semanticKind = option?.actionSemantics?.kind
  const spoken = Boolean(speechAct)
    || explicitIntent === 'speech'
    || playerIntents.includes('speech')
  if (spoken) {
    issues.push(`${label}: spoken choice changes canonical physical place; resolve speech in place and offer movement separately`)
    return issues
  }

  const explicitNonMovement = (explicitIntent && explicitIntent !== 'movement')
    || (playerIntents.length > 0 && !playerIntents.includes('movement'))
    || (semanticKind && !['accompaniment', 'transport'].includes(semanticKind))
  if (explicitNonMovement) {
    issues.push(`${label}: explicitly non-movement action changes canonical physical place`)
    return issues
  }
  if (!canonicalMovementProof(story, nodeId, option, placeOf)) {
    issues.push(`${label}: cross-place edge lacks a grounded canonical Albanian movement choice or accompaniment/transport semantics`)
  }
  return issues
}

function exactMetadataIssues({ nodeId, option, destination, label }) {
  const issues = []
  const hub = option?.conversationHub
  if (hub?.kind === 'question') {
    const responses = visibleConversationResponses(destination)
    const exact = responses.filter((response) =>
      response.hubId === hub.hubId && response.questionId === hub.questionId)
    if (!exact.length) {
      issues.push(`${label}: conversation question has no exact visible response for ${hub.hubId}/${hub.questionId}`)
    }
    const stale = responses.filter((response) =>
      response.hubId !== hub.hubId || response.questionId !== hub.questionId)
    if (stale.length) {
      issues.push(`${label}: conversation question leaves an unrelated response visible beside ${hub.hubId}/${hub.questionId}`)
    }
  }

  const actionId = canonicalPlayerActionId(nodeId, option)
  const declaredReceipts = visiblePlayerActionReceipts(destination)
  const receiptConditions = visibleArrivalReceiptConditions(destination)
  // A destination that exposes receipt metadata is claiming to bind the
  // arrival. Once it does so, the selected action must be the exact binding;
  // absence of all receipt metadata remains the provenance audit's concern.
  if (declaredReceipts.length > 0 && !declaredReceipts.includes(actionId)) {
    issues.push(`${label}: visible player-action receipt names a different action instead of '${actionId}'`)
  }
  const expectedCondition = playerActionConditionId(actionId)
  if (receiptConditions.length > 0 && !receiptConditions.includes(expectedCondition)) {
    issues.push(`${label}: visible arrival receipt condition does not match '${expectedCondition}'`)
  }
  return issues
}

function agencyIssues({ option, settledAfter, destination, label }) {
  if (settledAfter?.ended) return []
  const choices = (destination?.options || []).filter((candidate) => !candidate?.confuser)
  if (choices.length === 0) {
    return [`${label}: reachable nonterminal projection has no enabled genuine option`]
  }
  const isPaidResult = typeof option?.earns === 'string' && option.earns
    && optionEffectsOf(option).some((effect) =>
      effect?.type === 'resource'
      && effect.id === 'lek'
      && (Number(effect.delta) > 0 || Number(effect.set) > 0))
  if (!isPaidResult) return []

  const consequences = new Set(choices.map(projectedChoiceConsequenceSignature))
  const issues = []
  if (choices.length < 2) {
    issues.push(`${label}: paid work/performance result restores fewer than two genuine choices`)
  } else if (consequences.size < 2) {
    issues.push(`${label}: paid work/performance alternatives do not have consequence-distinct outcomes`)
  }
  return issues
}

export function projectedEdgeIssues(projection, { story = null, placeOf = {} } = {}) {
  const { nodeId, optionIndex, option, settledAfter, destination } = projection
  const label = `${nodeId}.options[${optionIndex}] -> ${settledAfter?.nodeId || option?.to}`
  return Object.freeze([
    ...agencyIssues({ option, settledAfter, destination, label }),
    ...crossPlaceIssues({ story, placeOf, nodeId, option, label }),
    ...exactMetadataIssues({ nodeId, option, destination, label }),
  ])
}
