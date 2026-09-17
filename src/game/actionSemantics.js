// Structured semantic continuity for player actions. A choice may presuppose
// people, objects, posture/motion, an opportunity, or durable world state. The
// source scene/state must establish those prerequisites before selection, and
// the destination must preserve the relevant identity and show the immediate
// consequence. New semantic kinds reuse this fact/evidence schema.

import { resolveRevealLine } from './revealResolver.js'
import {
  ACTION_SEMANTIC_KINDS,
  SEMANTIC_FACT_KINDS,
} from './actionSemanticsRuntime.js'
export {
  ACTION_SEMANTIC_KINDS,
  SEMANTIC_FACT_KINDS,
  accompanimentSemantics,
  semanticFact,
  sharedActionSemantics,
  transportSemantics,
  withSemanticFacts,
} from './actionSemanticsRuntime.js'

const MOVEMENT_TOKEN_IDS = new Set([
  'ec', 'vjen', 'shko', 'dil', 'ngjit', 'kthehu', 'ik', 'zbrit', 'kalo', 'nisem',
  'fluturo', 'lundro', 'hip', 'vrapo', 'udhetoj', 'kerce', 'ndiq', 'ndjek',
  'shoqeron', 'hyr',
])

export const NAVIGATION_AFFORDANCE_EVIDENCE_KINDS = Object.freeze([
  'visible-current-scene-cue',
  'canonical-current-place-exit',
  'genuine-recent-backtrack',
  'learned-persistent-route',
])

// These are grammatical or route-shape words, not named destinations. Keeping
// the distinction in Albanian token ids means the release gate does not depend
// on mutable English readings or a hand-maintained list of translated labels.
const NAVIGATION_GRAMMAR_TOKEN_IDS = new Set([
  'ti', 'ju', 'une', 'ne_we', 'nje', 'e_art', 'i_art', 'e_link', 'i_link', 'te_link', 'te_obj',
  'te_subj', 'dhe', 'ose', 'me', 'ne', 'nga', 'tek', 'per', 'pa', 'tani',
  'pak', 'drejt', 'perpara', 'majtas', 'djathtas', 'lart', 'poshte', 'larg',
  'shpejt', 'ngadale', 'jashte', 'brenda', 'rruge', 'vetem', 'bashke',
  ...MOVEMENT_TOKEN_IDS,
])
const SOLO_NAVIGATION_LEAD_IDS = new Set([
  'ec', 'shko', 'dil', 'ngjit', 'kthehu', 'ik', 'zbrit', 'kalo', 'nisem',
  'fluturo', 'lundro', 'hip', 'vrapo', 'udhetoj', 'hyr', 'ndiq', 'ndjek',
])
const PERSISTENT_ROUTE_PREFIXES = Object.freeze(['visited:', 'heard:', 'knows:'])
const navigationGraphCache = new WeakMap()

const ACCOMPANIMENT_READING = /(?:\bfollow\b|\baccompan(?:y|ies|ied|ying)\b|\bjoin\b|\bgo\b[^.!?]*\balongside\b|\bset out\b[^.!?]*\bbeside\b|\b(?:go|walk|come|climb|leave|return|fly|sail|ride|run|travel|cross|descend|ascend)\b[^.!?]*(?:\bwith\b|\btogether\b)|(?:\bwith\b|\btogether\b)[^.!?]*\b(?:go|walk|come|climb|leave|return|fly|sail|ride|run|travel|cross|descend|ascend)\b)/i
const NON_ACCOMPANIMENT_JOIN_READING = /\bjoin\b[^.!?]*\b(?:dance|fight|battle|game|song|feast|circle)\b/i
const SPOKEN_DEPARTURE_AGREEMENT_READING = /\bI\s+(?:(?:am|'m)\s+|(?:will|'ll)\s+)?(?:come|coming|go|going|walk|walking|follow|following|join|joining|accompany|accompanying|leave|leaving|travel|travelling|traveling)\b/i
const ACQUISITION_READING = /^(?:take|pick up|collect|gather|receive|keep)\b/i
const ACQUISITION_TOKEN_IDS = new Set(['merr', 'mbledh'])
const NON_TARGET_TOKEN_IDS = new Set([
  'ti', 'ju', 'une', 'nje', 'e_art', 'i_art', 'te_link', 'te_obj', 'te_subj',
  'ne', 'nga', 'tek', 'me', 'dhe', 'ose', 'tani', 'pak', 'shume',
  ...ACQUISITION_TOKEN_IDS,
])
const REQUIRED_ACCOMPANIMENT_READING = ACCOMPANIMENT_READING
const ACCOMPANIMENT_MOVEMENT_TOKEN_IDS = new Set(['ec', 'vjen', 'shko', 'kthehu', 'ik', 'udhetoj', 'ndiq', 'ndjek', 'shoqeron'])
const TEMPORAL_AFTER_TOKEN_IDS = new Set(['pak', 'moment', 'ore', 'dite', 'jave', 'muaj', 'vit', 'agim', 'muzg', 'nate', 'neser'])

const unique = (values) => [...new Set(values)]
const factKey = (fact) => `${fact?.kind || ''}:${fact?.id || ''}`
const conditionsOf = (entry) => [].concat(entry?.cond || [])
const lineOf = (entry) => (Array.isArray(entry) ? entry : entry?.line)
const tokenIdsOf = (line) => new Set((line || []).map((token) => token?.id).filter(Boolean))

export function accompanimentLeadReview(option) {
  if (!option || option.confuser) return Object.freeze({ lead: false, resolution: 'confuser' })
  const ids = tokenIdsOf(option.text)
  const moves = [...ids].some((id) => MOVEMENT_TOKEN_IDS.has(id))
  const reviewedEnglish = option.text?.optionReading || option.text?.reading || ''
  const readingLead = ACCOMPANIMENT_READING.test(reviewedEnglish)
    && !NON_ACCOMPANIMENT_JOIN_READING.test(reviewedEnglish)
  const tokenIds = [...ids]
  const afterIndex = tokenIds.indexOf('pas')
  const actorAfterLead = afterIndex >= 0
    && afterIndex < tokenIds.length - 1
    && !TEMPORAL_AFTER_TOKEN_IDS.has(tokenIds[afterIndex + 1])
  const structuralLead = moves && (
    ids.has('me')
    || ids.has('bashke')
    || actorAfterLead
    || ids.has('ndiq')
    || ids.has('ndjek')
    || ids.has('shoqeron')
  )
  // Scheduling a future follow rendezvous is not itself movement. The later
  // physical choice must carry the lead wording and structured continuity.
  const lead = readingLead || structuralLead
  if (!lead) return Object.freeze({ lead: false, resolution: 'not-a-lead' })
  if (option.actionSemantics) return Object.freeze({ lead: true, resolution: 'actionSemantics' })
  // Speech metadata alone cannot reclassify a physical lead. Only wording that
  // is itself a first-person promise/consent remains speech; the later explicit
  // departure or follow choice owns the physical accompaniment.
  const speechOnlyIntent = option.intent === 'speech'
    || (Array.isArray(option.playerIntents) && option.playerIntents.length === 1 && option.playerIntents[0] === 'speech')
  if (speechOnlyIntent && SPOKEN_DEPARTURE_AGREEMENT_READING.test(reviewedEnglish)) {
    return Object.freeze({ lead: true, resolution: 'speech-only' })
  }
  return Object.freeze({ lead: true, resolution: 'unresolved' })
}

export function isAccompanimentCandidate(option) {
  const review = accompanimentLeadReview(option)
  return review.lead && review.resolution !== 'speech-only'
}

const requiresAccompanimentKind = (option) => {
  if (option?.actionSemantics?.kind === 'transport') return false
  const ids = tokenIdsOf(option?.text)
  const reading = option?.text?.optionReading || option?.text?.reading || ''
  const tokenIds = [...ids]
  const afterIndex = tokenIds.indexOf('pas')
  const actorAfterLead = afterIndex >= 0
    && afterIndex < tokenIds.length - 1
    && !TEMPORAL_AFTER_TOKEN_IDS.has(tokenIds[afterIndex + 1])
  return (REQUIRED_ACCOMPANIMENT_READING.test(reading) && !NON_ACCOMPANIMENT_JOIN_READING.test(reading))
    || ([...ids].some((id) => ACCOMPANIMENT_MOVEMENT_TOKEN_IDS.has(id))
      && (ids.has('me') || actorAfterLead || ids.has('bashke') || ids.has('ndiq') || ids.has('ndjek') || ids.has('shoqeron')))
}

function factOccurrences(node) {
  const occurrences = new Map()
  for (const [lineIndex, entry] of (node?.text || []).entries()) {
    const line = lineOf(entry)
    for (const fact of line?.semanticFacts || []) {
      const key = factKey(fact)
      const values = occurrences.get(key) || []
      values.push({ fact, entry, line, lineIndex })
      occurrences.set(key, values)
    }
  }
  return occurrences
}

function routeIncludes(entry, sourceId) {
  return conditionsOf(entry).some((condition) =>
    String(condition).startsWith('from:') && String(condition).slice(5).split('|').includes(sourceId))
}

function visibilityConditions(entry) {
  if (Array.isArray(entry)) return { required: [], excluded: [] }
  const cond = [].concat(entry?.cond || []).filter(Boolean)
  return {
    required: entry?.negate ? [] : cond,
    excluded: [
      ...(entry?.negate ? cond : []),
      ...[].concat(entry?.none || []).filter(Boolean),
    ],
  }
}

function optionEntailsLine(option, entry) {
  if (lineOf(entry)?.scenePriority === 'ambient') return false
  const lineConditions = visibilityConditions(entry)
  const optionRequired = new Set([].concat(option?.requires || []).filter(Boolean))
  const optionExcluded = new Set([].concat(option?.unless || []).filter(Boolean))
  return lineConditions.required.every((id) => optionRequired.has(id))
    && lineConditions.excluded.every((id) => optionExcluded.has(id))
}

const navigationTargetIdsOf = (option) => unique(
  (option?.text || [])
    .map((token) => token?.id)
    .filter((id) => id && !NAVIGATION_GRAMMAR_TOKEN_IDS.has(id)),
)

function isSoloNavigationCandidate(option) {
  if (!option || option.confuser || option.actionSemantics?.kind === 'accompaniment') return false
  if (option.intent === 'speech' || option.playerIntents?.includes('speech')) return false
  const ids = (option.text || []).map((token) => token?.id).filter(Boolean)
  const firstActionId = ids.find((id) => id !== 'ti' && id !== 'ju' && id !== 'une')
  return option.playerIntents?.includes('movement') || SOLO_NAVIGATION_LEAD_IDS.has(firstActionId)
}

function validRevealSourceEntry(node, option) {
  if (!option?.reveal) return null
  const resolution = resolveRevealLine((node?.text || []).map(lineOf), option)
  if (!['unique', 'selected'].includes(resolution.status)) return null
  return node.text[resolution.index]
}

function sourceLineGuaranteedByIngress(story, nodeId, option, entry) {
  if (Array.isArray(entry) || entry.negate || [].concat(entry.none || []).length) return false
  const required = [].concat(entry.cond || []).filter(Boolean)
  const fromCondition = required.find((condition) => String(condition).startsWith('from:'))
  if (!fromCondition) return false
  const otherConditions = required.filter((condition) => condition !== fromCondition)
  if (otherConditions.some((condition) => ![].concat(option?.requires || []).includes(condition))) return false
  const allowedSources = new Set(String(fromCondition).slice(5).split('|'))
  const incomingSources = unique(Object.entries(story || {}).flatMap(([sourceId, candidate]) =>
    (candidate?.options || []).some((candidateOption) => !candidateOption.confuser && candidateOption.to === nodeId)
      ? [sourceId]
      : []))
  return incomingSources.length > 0 && incomingSources.every((sourceId) => allowedSources.has(sourceId))
}

function sourceCueEvidence(story, nodeId, node, option, targetIds) {
  const revealEntry = validRevealSourceEntry(node, option)
  const candidateIds = targetIds.length ? targetIds : [option?.reveal].filter(Boolean)
  const matches = []
  for (const [lineIndex, entry] of (node?.text || []).entries()) {
    const lineIds = tokenIdsOf(lineOf(entry))
    const witnesses = candidateIds.filter((id) => lineIds.has(id))
    if (!witnesses.length) continue
    const matchingEntries = (node?.text || []).filter((candidate) =>
      tokenIdsOf(lineOf(candidate)).has(witnesses[0]))
    const complementaryCoverage = matchingEntries.some((candidate) => {
      if (candidate === entry || candidate?.negate === entry?.negate) return false
      const left = [].concat(entry?.cond || []).filter(Boolean)
      const right = [].concat(candidate?.cond || []).filter(Boolean)
      return left.length === right.length && left.every((id) => right.includes(id))
    })
    const retiresIntoLearnedRoute = !Array.isArray(entry)
      && entry.negate
      && [].concat(entry.cond || []).includes(`visited:${option?.to}`)
    if (entry === revealEntry
      || optionEntailsLine(option, entry)
      || complementaryCoverage
      || retiresIntoLearnedRoute
      || sourceLineGuaranteedByIngress(story, nodeId, option, entry)) {
      matches.push(Object.freeze({ lineIndex, witnessIds: Object.freeze(witnesses) }))
    }
  }
  return Object.freeze(matches)
}

function persistentRouteConditions(option) {
  const required = [].concat(option?.requires || []).filter(Boolean)
  const declared = option?.navigationAffordance?.learnedRouteCondition
  const conditions = required.filter((condition) =>
    PERSISTENT_ROUTE_PREFIXES.some((prefix) => String(condition).startsWith(prefix)))
  if (declared && required.includes(declared)) conditions.push(declared)
  return unique(conditions)
}

function retiredCueRouteConditions(node, option, targetIds) {
  return unique((node?.text || []).flatMap((entry) => {
    if (Array.isArray(entry) || !entry.negate) return []
    const lineIds = tokenIdsOf(lineOf(entry))
    if (!targetIds.some((id) => lineIds.has(id))) return []
    return [].concat(entry.cond || []).filter((condition) => condition === `visited:${option?.to}`)
  }))
}

function navigationGraphOf(story) {
  if (!story || typeof story !== 'object') return null
  const cached = navigationGraphCache.get(story)
  if (cached) return cached
  const nodeIds = Object.keys(story)
  const adjacency = new Map(nodeIds.map((id) => [id, []]))
  const incoming = new Map(nodeIds.map((id) => [id, 0]))
  for (const [sourceId, node] of Object.entries(story)) {
    for (const option of node?.options || []) {
      if (!option?.to || !story[option.to]) continue
      adjacency.get(sourceId).push(option.to)
      incoming.set(option.to, (incoming.get(option.to) || 0) + 1)
    }
  }
  const roots = unique([
    ...(story.start ? ['start'] : []),
    ...nodeIds.filter((id) => incoming.get(id) === 0),
  ])
  const graph = { nodeIds, adjacency, roots, reachability: new Map() }
  navigationGraphCache.set(story, graph)
  return graph
}

function reachableWithout(graph, excluded) {
  const key = [...excluded].sort().join('|')
  const cached = graph.reachability.get(key)
  if (cached) return cached
  const reached = new Set()
  const queue = graph.roots.filter((id) => !excluded.has(id))
  while (queue.length) {
    const nodeId = queue.shift()
    if (reached.has(nodeId) || excluded.has(nodeId)) continue
    reached.add(nodeId)
    for (const destinationId of graph.adjacency.get(nodeId) || []) {
      if (!reached.has(destinationId) && !excluded.has(destinationId)) queue.push(destinationId)
    }
  }
  graph.reachability.set(key, reached)
  return reached
}

function graphLearnedRouteCondition(story, nodeId, option, placeOf) {
  const sourcePlace = placeOf?.[nodeId] || nodeId
  const destinationPlace = placeOf?.[option?.to] || option?.to
  if (!destinationPlace || sourcePlace === destinationPlace) return null
  const graph = navigationGraphOf(story)
  if (!graph) return null
  const globallyReachable = reachableWithout(graph, new Set())
  if (!globallyReachable.has(nodeId)) return null
  const destinationNodes = new Set(graph.nodeIds.filter((id) => (placeOf?.[id] || id) === destinationPlace))
  if (!destinationNodes.size || reachableWithout(graph, destinationNodes).has(nodeId)) return null
  return `visited-place:${destinationPlace}`
}

function recentBacktrackConditions(option) {
  return [].concat(option?.requires || []).filter((condition) => {
    if (!String(condition).startsWith('from:')) return false
    return String(condition).slice(5).split('|').includes(option?.to)
  })
}

function canonicalCurrentPlaceExit(story, nodeId, option, placeOf, targetIds) {
  const sourceAnchor = placeOf?.[nodeId]
  if (sourceAnchor && sourceAnchor !== nodeId && option?.to === sourceAnchor) return true
  if (sourceAnchor && sourceAnchor !== nodeId) {
    const anchorNode = story?.[sourceAnchor]
    const inheritedExit = (anchorNode?.options || []).find((anchorOption) =>
      !anchorOption.confuser && anchorOption.to === option?.to)
    if (inheritedExit) {
      const inheritedTargets = navigationTargetIdsOf(inheritedExit)
      if (!inheritedTargets.length
        || sourceCueEvidence(story, sourceAnchor, anchorNode, inheritedExit, inheritedTargets).length) return true
    }
  }
  // A direction-only departure introduces no unseen landmark. Named places,
  // people, and objects remain targets and must be visible or already known.
  return targetIds.length === 0
}

export function soloNavigationAffordanceReview(story, nodeId, option, { placeOf = {} } = {}) {
  if (!isSoloNavigationCandidate(option)) {
    return Object.freeze({ candidate: false, evidenceKinds: Object.freeze([]), issues: Object.freeze([]) })
  }

  const node = story?.[nodeId]
  const targetIds = navigationTargetIdsOf(option)
  const cueEvidence = sourceCueEvidence(story, nodeId, node, option, targetIds)
  const learnedConditions = unique([
    ...persistentRouteConditions(option),
    ...retiredCueRouteConditions(node, option, targetIds),
    ...[graphLearnedRouteCondition(story, nodeId, option, placeOf)].filter(Boolean),
  ])
  const backtrackConditions = recentBacktrackConditions(option)
  const runtimeRecentBacktrackFallback = Boolean(option?.reveal)
  const canonicalExit = canonicalCurrentPlaceExit(story, nodeId, option, placeOf, targetIds)
  const evidenceKinds = []
  if (cueEvidence.length) evidenceKinds.push('visible-current-scene-cue')
  if (canonicalExit) evidenceKinds.push('canonical-current-place-exit')
  if (backtrackConditions.length || runtimeRecentBacktrackFallback) evidenceKinds.push('genuine-recent-backtrack')
  if (learnedConditions.length) evidenceKinds.push('learned-persistent-route')

  const issues = []
  if (!option?.to || !story?.[option.to]) issues.push('navigation choice has no valid destination node')
  if (!targetIds.length && !canonicalExit && !backtrackConditions.length && !learnedConditions.length) {
    issues.push('navigation choice has no identifiable route cue or structured exit evidence')
  }
  const hasForwardEvidence = cueEvidence.length
    || canonicalExit
    || backtrackConditions.length
    || learnedConditions.length
  if (!hasForwardEvidence) {
    issues.push(`navigation affordance is unsupported: establish ${targetIds.join(', ') || 'its route'} in visible source prose, make it a canonical current-place exit, gate it as a genuine recent backtrack, or require a learned persistent route`)
  }
  if (option?.navigationAffordance) {
    const declared = option.navigationAffordance
    if (!declared || typeof declared !== 'object' || Array.isArray(declared)) {
      issues.push('navigationAffordance must be a record')
    } else {
      const fields = Object.keys(declared)
      if (fields.some((field) => field !== 'learnedRouteCondition')) {
        issues.push('navigationAffordance has unknown fields')
      }
      if (declared.learnedRouteCondition && ![].concat(option.requires || []).includes(declared.learnedRouteCondition)) {
        issues.push(`learned route condition '${declared.learnedRouteCondition}' is not an exact choice requirement`)
      }
    }
  }

  return Object.freeze({
    candidate: true,
    targetIds: Object.freeze(targetIds),
    evidenceKinds: Object.freeze(evidenceKinds),
    cueEvidence,
    learnedConditions: Object.freeze(learnedConditions),
    backtrackConditions: Object.freeze(backtrackConditions),
    runtimeRecentBacktrackFallback,
    issues: Object.freeze(issues),
  })
}

function conditionEntailed(condition, conditions, sourceId) {
  if (String(condition).startsWith('from:')) {
    return String(condition).slice(5).split('|').includes(sourceId)
  }
  if (conditions.has(condition)) return true
  const rendezvous = String(condition).match(/^rendezvous:([^:]+):(fulfilled|on-time)$/)
  return Boolean(rendezvous && conditions.has(`rendezvous:${rendezvous[1]}:scheduled`))
}

function destinationLineEntailed(option, entry, sourceId) {
  if (lineOf(entry)?.scenePriority === 'ambient') return false
  const lineConditions = visibilityConditions(entry)
  const required = new Set([].concat(option?.requires || []).filter(Boolean))
  const excluded = new Set([].concat(option?.unless || []).filter(Boolean))
  for (const effect of option?.effects || []) {
    if (effect?.type === 'flag') {
      const id = String(effect.id || '')
      if (effect.value === false) excluded.add(id.startsWith('flag:') ? id : `flag:${id}`)
      else required.add(id.startsWith('flag:') ? id : `flag:${id}`)
    }
    if (effect?.type === 'inventory' && effect.delta > 0) required.add(effect.id)
    if (effect?.type === 'inventory' && effect.delta < 0) excluded.add(effect.id)
  }
  if (option?.grant) required.add(option.grant)
  if (option?.consumes) excluded.add(option.consumes)
  return lineConditions.required.every((id) => conditionEntailed(id, required, sourceId))
    && lineConditions.excluded.every((id) => excluded.has(id))
}

function sceneVisiblyEstablishesTarget(node, option, targetId) {
  return (node?.text || []).some((entry) =>
    tokenIdsOf(lineOf(entry)).has(targetId) && optionEntailsLine(option, entry))
}

function destinationVisiblyEstablishesTarget(story, destinationId, destination, option, sourceId, targetId) {
  const incomingSources = unique(Object.entries(story || {}).flatMap(([candidateSourceId, candidate]) =>
    (candidate?.options || []).some((candidateOption) => !candidateOption.confuser && candidateOption.to === destinationId)
      ? [candidateSourceId]
      : []))
  const exclusiveArrival = destinationId !== sourceId
    && incomingSources.length === 1
    && incomingSources[0] === sourceId
  return (destination?.text || []).some((entry) =>
    tokenIdsOf(lineOf(entry)).has(targetId)
      && destinationLineEntailed(option, entry, sourceId)
      && (
        routeIncludes(entry, sourceId)
        || exclusiveArrival
        || (destinationId === sourceId && conditionsOf(entry).length > 0)
      ))
}

function optionHasCanonicalAcquisitionEffect(option) {
  if (option?.grant) return true
  return (option?.effects || []).some((effect) =>
    effect?.type === 'inventory' && Number(effect.delta) > 0)
}

function genericAffordanceIssues(label, nodeId, node, option, story) {
  if (!option || option.confuser) return []
  if (option.intent === 'speech' || option.playerIntents?.includes('speech')) return []
  const reading = option.text?.optionReading || option.text?.reading || ''
  const ids = [...tokenIdsOf(option.text)]
  const acquisition = ACQUISITION_READING.test(reading) || ids.some((id) => ACQUISITION_TOKEN_IDS.has(id))
  if (!acquisition) return []
  const targets = ids.filter((id) => !NON_TARGET_TOKEN_IDS.has(id))
  if (!targets.length) return [`${label}: acquisition choice has no identifiable object target`]
  const stateIds = new Set([].concat(option.requires || []).filter(Boolean))
  if (!targets.some((id) => sceneVisiblyEstablishesTarget(node, option, id) || stateIds.has(id))) {
    return [`${label}: acquisition target is not established by visible scene evidence or canonical state`]
  }
  const isCanonicalInventoryAcquisition = Boolean(option.grant)
    || (option.effects || []).some((effect) => effect?.type === 'inventory' && Number(effect.delta) > 0)
    || option.playerIntents?.includes('acquisition')
  if (isCanonicalInventoryAcquisition) {
    const destination = story?.[option.to]
    const consequenceEstablished = optionHasCanonicalAcquisitionEffect(option)
      || targets.some((id) =>
        destinationVisiblyEstablishesTarget(story, option.to, destination, option, nodeId, id))
    if (!consequenceEstablished) {
      return [`${label}: acquisition target has no canonical inventory effect or routed visible consequence`]
    }
  }
  return []
}

function schemaIssuesAt(label, semantic) {
  const issues = []
  const at = (message) => issues.push(`${label}: ${message}`)
  if (!semantic || typeof semantic !== 'object' || Array.isArray(semantic)) {
    at('actionSemantics must be a record')
    return issues
  }
  if (!ACTION_SEMANTIC_KINDS.includes(semantic.kind)) {
    at(`actionSemantics.kind must be one of ${ACTION_SEMANTIC_KINDS.join(', ')}`)
  }
  for (const field of ['prerequisites', 'consequences']) {
    const facts = semantic[field]
    if (!Array.isArray(facts) || !facts.length) {
      at(`actionSemantics.${field} must be a non-empty array`)
      continue
    }
    const keys = facts.map(factKey)
    if (new Set(keys).size !== keys.length) at(`actionSemantics.${field} contains duplicate facts`)
    for (const fact of facts) {
      if (!SEMANTIC_FACT_KINDS.includes(fact?.kind)) at(`${field} has unknown fact kind '${fact?.kind}'`)
      if (typeof fact?.id !== 'string' || !fact.id.trim()) at(`${field} has a fact without an id`)
      const expectedEvidence = field === 'prerequisites' ? ['scene', 'state'] : ['destination']
      if (!expectedEvidence.includes(fact?.evidence)) at(`${field} fact '${factKey(fact)}' has invalid evidence '${fact?.evidence}'`)
      if (fact?.evidence === 'state' && (typeof fact.condition !== 'string' || !fact.condition)) {
        at(`${field} state fact '${factKey(fact)}' has no canonical condition`)
      }
    }
  }
  if (semantic.kind === 'accompaniment') {
    const participants = semantic.participantIds
    if (!Array.isArray(participants) || !participants.length || new Set(participants).size !== participants.length) {
      at('accompaniment requires unique participantIds')
    }
    if (typeof semantic.journeyId !== 'string' || !semantic.journeyId.trim()) at('accompaniment requires journeyId')
    for (const participantId of participants || []) {
      if (!semantic.prerequisites?.some((fact) => fact.kind === 'participant' && fact.id === participantId && fact.evidence === 'scene')) {
        at(`accompaniment participant '${participantId}' is not required in the source scene`)
      }
      if (!semantic.consequences?.some((fact) => fact.kind === 'participant' && fact.id === participantId && fact.evidence === 'destination')) {
        at(`accompaniment participant '${participantId}' is not preserved at the destination`)
      }
    }
    if (!semantic.prerequisites?.some((fact) => fact.kind === 'opportunity' && fact.id === semantic.journeyId && fact.evidence === 'scene')) {
      at(`accompaniment opportunity '${semantic.journeyId}' is not established before selection`)
    }
    if (!semantic.consequences?.some((fact) => fact.kind === 'motion' && fact.id === semantic.journeyId && fact.evidence === 'destination')) {
      at(`accompaniment motion '${semantic.journeyId}' is not shown at the destination`)
    }
  }
  if (semantic.kind === 'shared-action') {
    const participants = semantic.participantIds
    if (!Array.isArray(participants) || !participants.length || new Set(participants).size !== participants.length) {
      at('shared-action requires unique participantIds')
    }
    if (typeof semantic.actionId !== 'string' || !semantic.actionId.trim()) at('shared-action requires actionId')
    for (const participantId of participants || []) {
      if (!semantic.prerequisites?.some((fact) => fact.kind === 'participant' && fact.id === participantId && fact.evidence === 'scene')) {
        at(`shared-action participant '${participantId}' is not required in the source scene`)
      }
      if (!semantic.consequences?.some((fact) => fact.kind === 'participant' && fact.id === participantId && fact.evidence === 'destination')) {
        at(`shared-action participant '${participantId}' is not preserved at the destination`)
      }
    }
    if (!semantic.prerequisites?.some((fact) => fact.kind === 'opportunity' && fact.id === semantic.actionId && fact.evidence === 'scene')) {
      at(`shared-action opportunity '${semantic.actionId}' is not established before selection`)
    }
    if (!semantic.consequences?.some((fact) => fact.kind === 'state' && fact.id === semantic.actionId && fact.evidence === 'destination')) {
      at(`shared-action result '${semantic.actionId}' is not shown at the destination`)
    }
  }
  if (semantic.kind === 'transport') {
    const objects = semantic.objectIds
    if (!Array.isArray(objects) || !objects.length || new Set(objects).size !== objects.length) {
      at('transport requires unique objectIds')
    }
    if (typeof semantic.journeyId !== 'string' || !semantic.journeyId.trim()) at('transport requires journeyId')
    for (const objectId of objects || []) {
      if (!semantic.prerequisites?.some((fact) => fact.kind === 'object' && fact.id === objectId && fact.evidence === 'scene')) {
        at(`transport object '${objectId}' is not required in the source scene`)
      }
      if (!semantic.consequences?.some((fact) => fact.kind === 'object' && fact.id === objectId && fact.evidence === 'destination')) {
        at(`transport object '${objectId}' is not preserved at the destination`)
      }
    }
    if (!semantic.prerequisites?.some((fact) => fact.kind === 'opportunity' && fact.id === semantic.journeyId && fact.evidence === 'scene')) {
      at(`transport opportunity '${semantic.journeyId}' is not established before selection`)
    }
    if (!semantic.consequences?.some((fact) => fact.kind === 'motion' && fact.id === semantic.journeyId && fact.evidence === 'destination')) {
      at(`transport motion '${semantic.journeyId}' is not shown at the destination`)
    }
  }
  return issues
}

export function actionSemanticContinuityIssues(story, {
  requireRoutedConsequences = true,
  placeOf = {},
} = {}) {
  const issues = []
  for (const [nodeId, node] of Object.entries(story || {})) {
    const sourceFacts = factOccurrences(node)
    for (const [lineIndex, entry] of (node?.text || []).entries()) {
      const line = lineOf(entry)
      const ids = tokenIdsOf(line)
      const facts = line?.semanticFacts || []
      const keys = facts.map(factKey)
      if (new Set(keys).size !== keys.length) issues.push(`${nodeId}.text[${lineIndex}]: duplicate semantic facts`)
      for (const fact of facts) {
        if (!SEMANTIC_FACT_KINDS.includes(fact?.kind)) issues.push(`${nodeId}.text[${lineIndex}]: unknown semantic fact kind '${fact?.kind}'`)
        if (typeof fact?.id !== 'string' || !fact.id.trim()) issues.push(`${nodeId}.text[${lineIndex}]: semantic fact has no id`)
        if (!Array.isArray(fact?.witnesses) || !fact.witnesses.length) {
          issues.push(`${nodeId}.text[${lineIndex}]: semantic fact '${factKey(fact)}' has no visible token witnesses`)
        } else {
          const missing = fact.witnesses.filter((id) => !ids.has(id))
          if (missing.length) issues.push(`${nodeId}.text[${lineIndex}]: semantic fact '${factKey(fact)}' has missing witnesses ${missing.join(', ')}`)
        }
      }
    }
    for (const [optionIndex, option] of (node?.options || []).entries()) {
      const label = `${nodeId}.options[${optionIndex}]`
      const leadReview = accompanimentLeadReview(option)
      const candidate = isAccompanimentCandidate(option)
      const semantic = option?.actionSemantics
      issues.push(...genericAffordanceIssues(label, nodeId, node, option, story))
      const navigationReview = soloNavigationAffordanceReview(story, nodeId, option, { placeOf })
      issues.push(...navigationReview.issues.map((issue) => `${label}: ${issue}`))
      if (option.semanticLeadClassification) {
        issues.push(`${label}: inline semantic lead classifications are forbidden; use canonical intent or structured actionSemantics`)
      }
      if (candidate && !semantic) {
        issues.push(`${label}: accompaniment candidate lacks actionSemantics`)
        continue
      }
      if (!semantic) continue
      issues.push(...schemaIssuesAt(label, semantic))
      if (requiresAccompanimentKind(option) && semantic.kind !== 'accompaniment') {
        issues.push(`${label}: accompaniment candidate must use accompaniment actionSemantics`)
      }
      if (semantic.kind === 'accompaniment' && !candidate) {
        issues.push(`${label}: stale accompaniment metadata on a non-accompaniment choice`)
      }
      const destination = story?.[option.to]
      const destinationFacts = factOccurrences(destination)
      for (const requirement of semantic.prerequisites || []) {
        if (requirement.evidence === 'state') {
          if (![].concat(option.requires || []).includes(requirement.condition)) {
            issues.push(`${label}: state prerequisite '${factKey(requirement)}' is not gated by '${requirement.condition}'`)
          }
          continue
        }
        const matches = sourceFacts.get(factKey(requirement)) || []
        if (!matches.length) {
          issues.push(`${label}: source scene does not visibly establish '${factKey(requirement)}'`)
        } else if (!matches.some(({ entry }) => optionEntailsLine(option, entry))) {
          issues.push(`${label}: source fact '${factKey(requirement)}' is conditional and not guaranteed when the choice is visible`)
        }
      }
      for (const consequence of semantic.consequences || []) {
        const matches = destinationFacts.get(factKey(consequence)) || []
        if (!matches.length) {
          issues.push(`${label}: destination does not visibly establish '${factKey(consequence)}'`)
        } else if (requireRoutedConsequences && !matches.some(({ entry }) =>
          routeIncludes(entry, nodeId) && destinationLineEntailed(option, entry, nodeId))) {
          issues.push(`${label}: destination fact '${factKey(consequence)}' is not guaranteed on the routed arrival from '${nodeId}'`)
        }
      }
    }
  }
  return Object.freeze(issues)
}
