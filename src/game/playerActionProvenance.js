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
      if (effect.value === false) excluded.add(condition)
      else established.add(condition)
    }
    if (effect?.type === 'inventory' && effect.delta > 0) established.add(effect.id)
    if (effect?.type === 'inventory' && effect.delta < 0) excluded.add(effect.id)
  }
  if (option?.grant) established.add(option.grant)
  if (option?.consumes) excluded.add(option.consumes)
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

function subsetOf(left, right) {
  const rightSet = new Set(right)
  return left.every((value) => rightSet.has(value))
}

function sameSemanticAction(left, right) {
  if (primaryActionSignature(left) !== primaryActionSignature(right)) return false
  const leftSurface = semanticActionSurface(left)
  const rightSurface = semanticActionSurface(right)
  return subsetOf(leftSurface, rightSurface) || subsetOf(rightSurface, leftSurface)
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
