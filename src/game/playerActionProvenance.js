import { englishReadingOf } from './language.js'
import {
  PLAYER_ACTION_CONDITION_PREFIX,
  PLAYER_ACTION_KINDS,
  canonicalPlayerActionId,
  playerActionConditionId,
  playerActionIdFromCondition,
} from './playerActionRuntime.js'
export {
  PLAYER_ACTION_CONDITION_PREFIX,
  PLAYER_ACTION_KINDS,
  authoredPlayerAction,
  canonicalPlayerActionId,
  playerActionConditionId,
  playerActionIdFromCondition,
  withPlayerActionConsequence,
} from './playerActionRuntime.js'

// Player-action provenance joins a choice to the prose that says what the
// player just did. Ordinary, unambiguous edges receive a deterministic id from
// their source node and Albanian action surface. Authors may give an action a
// durable semantic id when that identity must survive a wording change, but an
// id is evidence, never an exemption: actor, action family, destination and
// visibility are still checked against the real graph.

const ACTION_ID = /^[a-z0-9]+(?:[a-z0-9._:-]*[a-z0-9])?$/
const PLAYER_CONSEQUENCE_ACTOR = /^(?:you\b|your (?:weapon|hand|voice)\b)/i
const THIRD_PERSON_OPTION_ACTOR = /^(?:the\s+)?(?:wolf|ora|woman|man|girl|boy|maiden|mother|father|brother|sister|traveller|guard|eagle|bear|dog|horse|ram|bull|beauty|kulshedra|serpent)\b/i

const ACTION_PATTERNS = Object.freeze({
  speech: /\b(?:say|speak|tell|ask|answer|reply|greet|call out|promise|swear)\b/i,
  combat: /\b(?:fight|kill|strike|sever|cut|attack|defend)\b/i,
  transfer: /\b(?:give|hand|offer|sell)\b/i,
  acquisition: /\b(?:take|pick up|collect|gather|receive|keep)\b/i,
  use: /\b(?:grasp|touch|hold|hide|light|extinguish|open|close|break|throw|wash|dry|bandage|unlock|release|free|save|help)\b/i,
  consumption: /\b(?:eat|drink)\b/i,
  observation: /\b(?:listen|inspect|examine|watch|read|search)\b/i,
  performance: /\b(?:sing|dance|play)\b/i,
  commitment: /\b(?:choose|agree|refuse|promise|swear|marry)\b/i,
  transaction: /\b(?:buy|pay|cost)\b/i,
})

const ACTION_TOKEN_IDS = Object.freeze({
  // A promise or oath is both a commitment and a speech act. This overlap is
  // linguistic semantics, not a way for an option to claim an unrelated second
  // intention: it allows "promise" to resolve as spoken assent while a silent
  // commitment still cannot authorize fresh dialogue.
  speech: new Set(['thote', 'tregoj', 'pyet', 'pergjigjet', 'perserit', 'thirr', 'premto', 'betohem']),
  combat: new Set(['lufto', 'vrit', 'godit', 'pre', 'sulmo', 'mbro']),
  transfer: new Set(['jep', 'shes', 'paguaj']),
  acquisition: new Set(['merr', 'mbledh']),
  use: new Set(['prek', 'mbaj', 'fsheh', 'ndiz', 'shuaj', 'hap', 'mbyll', 'hidh', 'laj', 'thaj', 'ndihmo', 'liroj', 'shpetoj', 'kap', 'ngre']),
  consumption: new Set(['ha', 'pi']),
  observation: new Set(['degjo', 'shiko', 'sheh', 'lexo', 'kerko']),
  performance: new Set(['kendo', 'kerce', 'luaj']),
  commitment: new Set(['zgjedh', 'pranoj', 'premto', 'betohem', 'marto']),
  transaction: new Set(['blej', 'paguaj', 'kushton']),
})
const ALL_ACTION_TOKEN_IDS = new Set(Object.values(ACTION_TOKEN_IDS).flatMap((ids) => [...ids]))
const ACTION_SURFACE_FILLERS = new Set([
  'ti', 'ju', 'une', 'ne_we', 'nje', 'e_art', 'i_art', 'te_link', 'te_obj',
  'te_subj', 'dhe', 'ose', 'me', 'ne', 'nga', 'tek', 'per',
])

const unique = (values) => [...new Set(values)]
const lineOf = (entry) => (Array.isArray(entry) ? entry : entry?.line)
const conditionsOf = (entry) => [].concat(entry?.cond || []).filter(Boolean)
const excludedConditionsOf = (entry) => [
  ...(entry?.negate ? conditionsOf(entry) : []),
  ...[].concat(entry?.none || []).filter(Boolean),
]
const requiredConditionsOf = (entry) => entry?.negate ? [] : conditionsOf(entry)
const tokenIdsOf = (line) => (line || []).map((token) => token?.id).filter(Boolean)

const slug = (value) => String(value || '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('en')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

function actionKindsOf(reading, line) {
  const kinds = []
  for (const [kind, pattern] of Object.entries(ACTION_PATTERNS)) {
    if (pattern.test(reading)) kinds.push(kind)
  }
  const tokenIds = new Set(tokenIdsOf(line))
  for (const [kind, ids] of Object.entries(ACTION_TOKEN_IDS)) {
    if ([...ids].some((id) => tokenIds.has(id))) kinds.push(kind)
  }
  return unique(kinds)
}

function consequenceKindsOf(entry) {
  const reading = englishReadingOf(lineOf(entry) || []).trim()
  if (!PLAYER_CONSEQUENCE_ACTOR.test(reading)) return []
  // "Take the road" is locomotion, not acquisition. Movement continuity is
  // governed by the physical-place and arrival contracts instead.
  const normalized = reading.replace(/^You take the (?:road|path|track|way)\b/i, 'You travel')
  const leadingPatterns = {
    speech: /^You (?:say|speak|tell|ask|answer|reply|greet|call out)\b/i,
    combat: /^(?:You (?:fight|kill|strike|sever|cut|attack|defend)\b|Your weapon\b.*\bkill\b)/i,
    transfer: /^You (?:give|hand|offer|sell|pay)\b/i,
    acquisition: /^You (?:take|pick up|collect|gather|receive|keep)\b/i,
    use: /^You (?:grasp|touch|hold|hide|light|extinguish|open|close|break|throw|wash|dry|bandage|unlock|release|free|save|help)\b/i,
    consumption: /^You (?:eat|drink)\b/i,
    observation: /^You listen\b/i,
    performance: /^You (?:sing|dance|play)\b/i,
    commitment: /^You (?:choose|agree|refuse|promise|swear|keep (?:the|your) (?:besa|oath|promise))\b/i,
    transaction: /^You (?:buy|pay)\b/i,
  }
  return Object.entries(leadingPatterns)
    .filter(([, pattern]) => pattern.test(normalized))
    .map(([kind]) => kind)
}

function optionKindsOf(option) {
  const kinds = actionKindsOf(englishReadingOf(option?.text || []), option?.text)
  // Direct-utterance surfaces often contain only the quoted words ("No.",
  // "The stable door.", "Look at the sun."). The reviewed speechAct is the
  // canonical proof that choosing that surface is still a player speech act;
  // requiring an extra Albanian "say" token would change what the player says.
  if (option?.speechAct) kinds.push('speech')
  const declared = [].concat(option?.playerIntents || []).filter(Boolean)
  for (const intent of declared) {
    if (intent === 'physical') kinds.push('use')
    else if (intent === 'wait' || intent === 'movement' || intent === 'other') continue
    else if (PLAYER_ACTION_KINDS.includes(intent)) kinds.push(intent)
  }
  if (option?.grant) kinds.push('acquisition')
  if (option?.consumes) kinds.push('transfer')
  if (Number(option?.lek || 0) !== 0) kinds.push('transaction')
  for (const effect of option?.effects || []) {
    if (effect?.type === 'inventory' && effect.delta > 0) kinds.push('acquisition')
    if (effect?.type === 'inventory' && effect.delta < 0) kinds.push('transfer')
    if (effect?.type === 'fixture') kinds.push('use')
  }
  if (kinds.includes('transaction')) kinds.push('transfer', 'acquisition')
  return unique(kinds)
}

function optionActorId(option) {
  if (typeof option?.playerAction?.actorId === 'string' && option.playerAction.actorId) {
    return option.playerAction.actorId
  }
  const reading = englishReadingOf(option?.text || []).trim()
  return THIRD_PERSON_OPTION_ACTOR.test(reading) ? 'non-player' : 'player'
}

function optionEstablishedConditions(option, sourceNodeId = null) {
  const established = new Set([].concat(option?.requires || []).filter(Boolean))
  const excluded = new Set([].concat(option?.unless || []).filter(Boolean))
  for (const effect of option?.effects || []) {
    if (effect?.type === 'flag') {
      const id = String(effect.id || '')
      const condition = id.startsWith('flag:') ? id : `flag:${id}`
      if (effect.value === false) {
        established.delete(condition)
        excluded.add(condition)
      } else {
        excluded.delete(condition)
        established.add(condition)
      }
    }
    if (effect?.type === 'inventory' && effect.delta > 0) {
      excluded.delete(effect.id)
      established.add(effect.id)
    }
    if (effect?.type === 'inventory' && effect.delta < 0) {
      established.delete(effect.id)
      excluded.add(effect.id)
    }
    if (effect?.type === 'observe' && effect.id) {
      const condition = `observed:${effect.id}`
      excluded.delete(condition)
      established.add(condition)
    }
  }
  if (option?.grant) {
    excluded.delete(option.grant)
    established.add(option.grant)
  }
  if (option?.consumes) {
    established.delete(option.consumes)
    excluded.add(option.consumes)
  }
  if (option?.activateFixture) {
    const condition = `fixture:${option.activateFixture}:live`
    excluded.delete(condition)
    established.add(condition)
  }
  if (Number(option?.lek || 0) !== 0 || option?.moneyOutcome) established.add('arrival:money')
  if (sourceNodeId) {
    established.add(playerActionConditionId(canonicalPlayerActionId(sourceNodeId, option)))
  }
  return { established, excluded }
}

function routeAllowsSource(condition, sourceNodeId) {
  return String(condition).slice(5).split('|').includes(sourceNodeId)
}

function consequenceVisibleAfter(entry, sourceNodeId, option) {
  const { established, excluded } = optionEstablishedConditions(option, sourceNodeId)
  for (const condition of requiredConditionsOf(entry)) {
    if (String(condition).startsWith('from:')) {
      if (!routeAllowsSource(condition, sourceNodeId)) return false
    } else if (!established.has(condition)) {
      return false
    }
  }
  for (const condition of excludedConditionsOf(entry)) {
    if (String(condition).startsWith('from:')) {
      if (routeAllowsSource(condition, sourceNodeId)) return false
    } else if (!excluded.has(condition)) {
      // A negated line may be visible in the default state. It is guaranteed
      // only when the action itself establishes that exclusion.
      return false
    }
  }
  return true
}

function consequenceCanBeVisibleAfter(entry, sourceNodeId, option) {
  const { established, excluded } = optionEstablishedConditions(option, sourceNodeId)
  for (const condition of requiredConditionsOf(entry)) {
    if (String(condition).startsWith('from:')) {
      if (!routeAllowsSource(condition, sourceNodeId)) return false
    } else if (excluded.has(condition)) {
      return false
    }
  }
  for (const condition of excludedConditionsOf(entry)) {
    if (String(condition).startsWith('from:')) {
      if (routeAllowsSource(condition, sourceNodeId)) return false
    } else if (established.has(condition)) {
      return false
    }
  }
  return true
}

function hasBindingCondition(entry) {
  return requiredConditionsOf(entry).some((condition) =>
    String(condition).startsWith('from:')
    || String(condition).startsWith(PLAYER_ACTION_CONDITION_PREFIX)
    || String(condition).startsWith('flag:')
    || condition === 'arrival:money')
}

function isImmediateConsequenceCandidate(entry, destinationNodeId, incomingEdges, possibleEdges) {
  if (entry?.negate) return false
  if (!possibleEdges.length) return false
  const required = requiredConditionsOf(entry)
  if (required.some((condition) =>
    String(condition).startsWith('from:')
    || String(condition).startsWith(PLAYER_ACTION_CONDITION_PREFIX)
    || condition === 'arrival:money')) {
    return true
  }
  if (required.some((condition) => incomingEdges.some(({ sourceNodeId, option }) =>
    sourceNodeId !== destinationNodeId && optionEstablishedConditions(option, sourceNodeId).established.has(condition)))) {
    return true
  }
  const externalIncoming = incomingEdges.filter(({ sourceNodeId }) => sourceNodeId !== destinationNodeId)
  return required.length === 0 && externalIncoming.length >= 1
}

const intersects = (left, right) => left.some((value) => right.includes(value))

function primaryActionSignature(option) {
  const tokenIds = tokenIdsOf(option?.text)
  for (const id of tokenIds) {
    for (const [kind, ids] of Object.entries(ACTION_TOKEN_IDS)) {
      if (ids.has(id)) return `${kind}:${id}`
    }
  }
  return optionKindsOf(option)[0] || 'unclassified'
}

function semanticActionSurface(option) {
  return unique(tokenIdsOf(option?.text).filter((id) => !ACTION_SURFACE_FILLERS.has(id)))
}

function sameSemanticAction(left, right) {
  if (primaryActionSignature(left) !== primaryActionSignature(right)) return false
  const leftSurface = semanticActionSurface(left)
  const rightSurface = semanticActionSurface(right)
  if (leftSurface.length !== rightSurface.length) return false
  const rightSet = new Set(rightSurface)
  return leftSurface.every((value) => rightSet.has(value))
}

function consequenceSemanticallyMatches(option, entry) {
  const optionConversation = option?.conversationHub
  const entryConversation = entry?.conversationHub
  if (optionConversation?.kind === 'question'
      && entryConversation?.kind === 'response'
      && optionConversation.hubId === entryConversation.hubId
      && optionConversation.questionId === entryConversation.questionId) {
    return true
  }
  const line = lineOf(entry) || []
  if (option?.observation?.id && option.observation.id === line?.observation?.id) return true
  const optionEntities = semanticActionSurface(option)
    .filter((id) => !ALL_ACTION_TOKEN_IDS.has(id))
  const consequenceEntities = unique(tokenIdsOf(line)
    .filter((id) => !ACTION_SURFACE_FILLERS.has(id) && !ALL_ACTION_TOKEN_IDS.has(id)))
  const declared = line.playerActionConsequence
  if (option?.playerAction?.id
      && declared?.actorId === 'player'
      && declared.actionIds?.includes(option.playerAction.id)
      && (!optionEntities.length || optionEntities.some((id) => consequenceEntities.includes(id)))) {
    return true
  }
  const optionKinds = optionKindsOf(option)
  let consequenceKinds = consequenceKindsOf(entry)
  const reading = englishReadingOf(line).trim()
  // Some authored consequences lead with the means or obstacle before naming
  // the player ("With the strength, you throw..."). An exact arrival-action
  // binding makes that clause safe to inspect, but the line must still contain
  // a player subject and an action from the same semantic family.
  if (!consequenceKinds.length && /\b(?:you|your)\b/i.test(reading)) {
    consequenceKinds = actionKindsOf(reading, line)
  }
  if (!intersects(optionKinds, consequenceKinds)) return false

  // An action-family match alone is too weak: "give salt" must not satisfy
  // "give bread". Compare the meaningful non-action participants/objects when
  // the option names any; token ids already normalize inflected surfaces.
  if (!optionEntities.length) return true
  return optionEntities.some((id) => consequenceEntities.includes(id))
}

function moneyOutcomeLinesOf(option) {
  const outcome = option?.moneyOutcome
  if (!outcome) return []
  if (Array.isArray(outcome)) return [outcome]
  return (outcome.variants || []).map((variant) => variant?.line).filter(Array.isArray)
}

function isExactConversationResponse(option, entry) {
  const question = option?.conversationHub
  const response = entry?.conversationHub
  if (question?.kind !== 'question'
      || response?.kind !== 'response'
      || question.hubId !== response.hubId
      || question.questionId !== response.questionId) return false
  const producedFlags = new Set((option.effects || [])
    .filter((effect) => effect?.type === 'flag' && effect.value !== false)
    .map((effect) => `flag:${effect.id}`))
  return requiredConditionsOf(entry).some((condition) => producedFlags.has(condition))
}

export function playerActionProvenanceIssues(story) {
  const issues = []
  const incoming = new Map()
  const actionIds = new Map()

  for (const [sourceNodeId, node] of Object.entries(story || {})) {
    for (const [optionIndex, option] of (node?.options || []).entries()) {
      if (!option || option.confuser || !option.to || !story?.[option.to]) continue
      const label = `${sourceNodeId}.options[${optionIndex}]`
      if (option.playerAction != null) {
        if (!option.playerAction || typeof option.playerAction !== 'object' || Array.isArray(option.playerAction)) {
          issues.push(`${label}: playerAction must be a record`)
        } else {
          if (!ACTION_ID.test(String(option.playerAction.id || ''))) {
            issues.push(`${label}: playerAction.id must be a stable lowercase action id`)
          }
          if (option.playerAction.actorId !== 'player') {
            issues.push(`${label}: authored player-owned action must use actorId 'player'`)
          }
        }
      }
      const actionId = canonicalPlayerActionId(sourceNodeId, option)
      const identity = `${sourceNodeId}\u0000${tokenIdsOf(option.text).join('\u0000')}`
      const prior = actionIds.get(actionId)
      if (prior && prior !== identity) issues.push(`${label}: player action id '${actionId}' is not unique`)
      else actionIds.set(actionId, identity)
      const edges = incoming.get(option.to) || []
      edges.push({ sourceNodeId, optionIndex, option, actionId })
      incoming.set(option.to, edges)
    }
  }

  let candidateCount = 0
  for (const [destinationNodeId, node] of Object.entries(story || {})) {
    for (const [lineIndex, entry] of (node?.text || []).entries()) {
      const label = `${destinationNodeId}.text[${lineIndex}]`
      const incomingEdges = incoming.get(destinationNodeId) || []
      const requiredConditionIds = requiredConditionsOf(entry)
      const excludedConditionIds = excludedConditionsOf(entry)
      for (const condition of [...requiredConditionIds, ...excludedConditionIds]) {
        if (!String(condition).startsWith(PLAYER_ACTION_CONDITION_PREFIX)) continue
        const actionId = playerActionIdFromCondition(condition)
        if (!ACTION_ID.test(String(actionId || ''))) {
          issues.push(`${label}: arrival action condition must contain a stable lowercase action id`)
          continue
        }
        if (!incomingEdges.some((edge) => edge.actionId === actionId)) {
          issues.push(`${label}: arrival action condition names stale or unreachable action id '${actionId}'`)
        }
      }
      const consequenceKinds = consequenceKindsOf(entry)
      if (!consequenceKinds.length) continue
      const conditionIds = [...requiredConditionIds, ...excludedConditionIds]
      if (consequenceKinds.includes('speech')
          && conditionIds.some((condition) => String(condition).startsWith('flag:'))
          && !requiredConditionIds.some((condition) => String(condition).startsWith(PLAYER_ACTION_CONDITION_PREFIX))) {
        issues.push(`${label}: player speech is gated only by durable story state; bind it to an exact arrival action so a later return cannot replay old speech`)
      }
      const possibleEdges = incomingEdges
        .filter(({ sourceNodeId, option }) => consequenceVisibleAfter(entry, sourceNodeId, option))
      if (!isImmediateConsequenceCandidate(entry, destinationNodeId, incomingEdges, possibleEdges)) continue
      candidateCount += 1
      const representativeActions = []
      for (const edge of possibleEdges) {
        if (!representativeActions.some((option) => sameSemanticAction(option, edge.option))) {
          representativeActions.push(edge.option)
        }
      }
      if (representativeActions.length > 1 && !hasBindingCondition(entry)) {
        const signatures = representativeActions.map((option) => semanticActionSurface(option).join('-') || primaryActionSignature(option))
        issues.push(`${label}: player-owned consequence is unconditional across distinct incoming actions [${signatures.join(', ')}]; bind it to an exact predecessor or action effect`)
      }
      const compatible = []
      for (const edge of possibleEdges) {
        const actorId = optionActorId(edge.option)
        const kinds = optionKindsOf(edge.option)
        if (actorId !== 'player') {
          issues.push(`${label}: consequence says the player acted but is visible after non-player action ${edge.sourceNodeId}.options[${edge.optionIndex}]`)
          continue
        }
        if (!intersects(consequenceKinds, kinds)) {
          issues.push(`${label}: consequence actions [${consequenceKinds.join(', ')}] do not match ${edge.sourceNodeId}.options[${edge.optionIndex}] actions [${kinds.join(', ') || 'none'}]`)
          continue
        }
        compatible.push(edge)
      }
      const declared = lineOf(entry)?.playerActionConsequence
      if (declared != null) {
        if (!declared || typeof declared !== 'object' || Array.isArray(declared)) {
          issues.push(`${label}: playerActionConsequence must be a record`)
        } else {
          const ids = declared.actionIds
          if (!Array.isArray(ids) || !ids.length || ids.some((id) => !ACTION_ID.test(String(id || '')))) {
            issues.push(`${label}: playerActionConsequence.actionIds must contain stable lowercase action ids`)
          }
          if (new Set(ids || []).size !== (ids || []).length) {
            issues.push(`${label}: playerActionConsequence.actionIds contains duplicates`)
          }
          if (declared.actorId !== 'player') {
            issues.push(`${label}: player-owned consequence must use actorId 'player'`)
          }
          const expectedIds = new Set(compatible.map((edge) => edge.actionId))
          const declaredIds = new Set(ids || [])
          for (const id of expectedIds) if (!declaredIds.has(id)) issues.push(`${label}: consequence omits feasible action id '${id}'`)
          for (const id of declaredIds) if (!expectedIds.has(id)) issues.push(`${label}: consequence declares stale action id '${id}'`)
        }
      }
    }
  }

  return Object.freeze({ issues: Object.freeze(issues), candidateCount })
}

// When player actions all enter the same result node, that result must not
// flatten materially different acts into one generic outcome. Every canonical
// choice action participates, whether or not an author supplied a stable id.
// Each edge needs a semantically matching consequence bound to its exact
// arrival-action receipt. A registered conversation response is the narrow
// persistent equivalent: its question writes one response flag, its metadata
// identifies that exact topic, and choosing another topic clears it. Other
// durable flags, prerequisites, and unrelated prose cannot prove what the
// player just did.
export function sharedActionDestinationIssues(story) {
  const issues = []
  let candidateCount = 0
  const optionsCanAppearTogether = (left, right) => {
    const leftRequired = new Set([].concat(left?.requires || []).filter(Boolean))
    const rightRequired = new Set([].concat(right?.requires || []).filter(Boolean))
    const leftExcluded = new Set([].concat(left?.unless || []).filter(Boolean))
    const rightExcluded = new Set([].concat(right?.unless || []).filter(Boolean))
    return ![...leftRequired].some((condition) => rightExcluded.has(condition))
      && ![...rightRequired].some((condition) => leftExcluded.has(condition))
  }
  for (const [sourceNodeId, node] of Object.entries(story || {})) {
    const byDestination = new Map()
    for (const [optionIndex, option] of (node?.options || []).entries()) {
      if (!option || option.confuser || !option.to || !story[option.to]) continue
      if (optionActorId(option) !== 'player' || !optionKindsOf(option).length) continue
      const edges = byDestination.get(option.to) || []
      edges.push({ sourceNodeId, optionIndex, option, actionId: canonicalPlayerActionId(sourceNodeId, option) })
      byDestination.set(option.to, edges)
    }
    for (const [destinationNodeId, edges] of byDestination) {
      const materiallyDistinctEdges = edges.filter((edge) => edges.some((candidate) =>
        candidate !== edge
        && optionsCanAppearTogether(edge.option, candidate.option)
        && !sameSemanticAction(edge.option, candidate.option)))
      const representatives = []
      for (const edge of materiallyDistinctEdges) {
        if (!representatives.some((candidate) => sameSemanticAction(candidate.option, edge.option))) {
          representatives.push(edge)
        }
      }
      if (representatives.length < 2) continue
      candidateCount += representatives.length
      const destination = story[destinationNodeId]
      for (const edge of representatives) {
        const exactCondition = playerActionConditionId(edge.actionId)
        const hasDestinationConsequence = (destination?.text || []).some((entry) => {
          if (!consequenceCanBeVisibleAfter(entry, sourceNodeId, edge.option)) return false
          if (lineOf(entry)?.scenePriority === 'ambient') return false
          const required = requiredConditionsOf(entry)
          return consequenceSemanticallyMatches(edge.option, entry)
            && (required.includes(exactCondition) || isExactConversationResponse(edge.option, entry))
        })
        // Money outcome prose is selected from the exact arrival option by the
        // renderer, so it already has a stronger edge binding than a durable
        // story flag. It still has to describe the same action: merely paying
        // or receiving money cannot launder unrelated choice prose.
        const hasExactMoneyConsequence = moneyOutcomeLinesOf(edge.option)
          .some((line) => consequenceSemanticallyMatches(edge.option, { line }))
        const hasBoundConsequence = hasDestinationConsequence || hasExactMoneyConsequence
        if (!hasBoundConsequence) {
          issues.push(`${sourceNodeId}.options[${edge.optionIndex}] -> ${destinationNodeId}: distinct shared-destination action '${edge.actionId}' has no exact action-bound semantically matching visible consequence`)
        }
      }
    }
  }
  return Object.freeze({ issues: Object.freeze(issues), candidateCount })
}
