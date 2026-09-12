import {
  ITEMS,
  STORY,
  itemAffordancesOf,
} from './content.js'
import { NPCS } from './npcs.js'
import {
  TIMED_WORLD_FIXTURES,
  fixtureStageAt,
} from './worldFixtures.js'
import {
  PLACE_META,
} from '../components/placeMeta.js'
import {
  PLACE_NODES,
  PLACE_OF,
} from '../components/nodePositions.js'
import { choiceIntentOf } from './choiceSemantics.js'
import { optionEffectsOf } from './stateMechanics.js'

// A small typed world model over the game's existing canonical authorities.
// It does not introduce a parser or duplicate mutable state: places remain
// nodeId, carried objects remain inventory, people remain clock-projected NPCs,
// observations remain observations, and timed fixtures remain fixtures.
export const WORLD_ENTITY_SCHEMA_VERSION = 1

export const WORLD_ENTITY_KINDS = Object.freeze([
  'actor',
  'place',
  'portable',
  'companion',
  'fixture',
  'perception',
])

export const SPATIAL_RELATIONS = Object.freeze([
  'at',
  'carried-by',
  'contains',
  'connects-to',
])

export const WORLD_STATE_AUTHORITIES = Object.freeze([
  'nodeId',
  'inventory',
  'npc-projection',
  'fixtures',
  'observations',
])

const entity = (definition) => Object.freeze({ ...definition })
const placeEntityId = (nodeId) => PLACE_OF[nodeId] ? `place:${PLACE_OF[nodeId]}` : null

function placeName(anchor) {
  return PLACE_META[anchor]?.name || anchor
}
function observedOptions() {
  const byId = new Map()
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      const observation = option.observation || option.contextObservation
      if (!observation?.id || byId.has(observation.id)) continue
      byId.set(observation.id, { nodeId, observation })
    }
  }
  return byId
}

export function buildWorldEntityRegistry() {
  const entries = []
  entries.push(entity({
    id: 'actor:player', kind: 'actor', name: 'the traveller',
    authority: Object.freeze({ channel: 'nodeId' }),
    affordances: Object.freeze(['move', 'speak', 'look', 'carry', 'use']),
  }))

  for (const [anchor, nodes] of Object.entries(PLACE_NODES)) {
    entries.push(entity({
      id: `place:${anchor}`, kind: 'place', name: placeName(anchor),
      authority: Object.freeze({ channel: 'nodeId', key: anchor }),
      nodes: Object.freeze([...nodes]),
      affordances: Object.freeze(['enter', 'leave', 'observe']),
    }))
  }

  for (const item of Object.values(ITEMS)) {
    entries.push(entity({
      id: `item:${item.id}`,
      kind: item.companion ? 'companion' : 'portable',
      name: item.name,
      authority: Object.freeze({ channel: 'inventory', key: item.id }),
      tags: Object.freeze([...(item.tags || [])]),
      affordances: itemAffordancesOf(item),
    }))
  }

  for (const [npcId, npc] of Object.entries(NPCS)) {
    entries.push(entity({
      id: `npc:${npcId}`, kind: 'actor', name: npc.name,
      authority: Object.freeze({ channel: 'npc-projection', key: npcId }),
      route: Object.freeze(npc.route.map((nodeId) => placeEntityId(nodeId))),
      affordances: Object.freeze(['speak', 'observe']),
    }))
  }

  for (const [fixtureId, fixture] of Object.entries(TIMED_WORLD_FIXTURES)) {
    entries.push(entity({
      id: `fixture:${fixtureId}`, kind: 'fixture', name: fixtureId,
      authority: Object.freeze({ channel: 'fixtures', key: fixtureId }),
      relations: Object.freeze([{ type: 'at', target: placeEntityId(fixture.nodeId) }]),
      states: Object.freeze(fixture.stages.map((stage) => stage.id)),
      affordances: Object.freeze([...fixture.actions]),
    }))
  }

  for (const [observationId, { nodeId, observation }] of observedOptions()) {
    entries.push(entity({
      id: `perception:${observationId}`, kind: 'perception', name: observation.beat,
      authority: Object.freeze({ channel: 'observations', key: observationId }),
      relations: Object.freeze([{ type: 'at', target: placeEntityId(nodeId) }]),
      affordances: Object.freeze([observation.kind]),
    }))
  }

  return Object.freeze(Object.fromEntries(entries.map((entry) => [entry.id, entry])))
}

export const WORLD_ENTITIES = buildWorldEntityRegistry()

export function worldEntityRegistryIssues(registry = WORLD_ENTITIES) {
  const issues = []
  const ids = new Set(Object.keys(registry || {}))
  for (const [id, entry] of Object.entries(registry || {})) {
    const at = (message) => issues.push(`${id}: ${message}`)
    if (entry.id !== id) at('registry key and entity id differ')
    if (!WORLD_ENTITY_KINDS.includes(entry.kind)) at(`unknown kind '${entry.kind}'`)
    if (!WORLD_STATE_AUTHORITIES.includes(entry.authority?.channel)) {
      at(`unknown canonical authority '${entry.authority?.channel}'`)
    }
    if (!Array.isArray(entry.affordances) || new Set(entry.affordances).size !== entry.affordances.length) {
      at('affordances must be a unique array')
    }
    for (const relation of entry.relations || []) {
      if (!SPATIAL_RELATIONS.includes(relation.type)) at(`unknown relation '${relation.type}'`)
      if (!ids.has(relation.target)) at(`relation targets unknown entity '${relation.target}'`)
    }
    for (const target of entry.route || []) if (!ids.has(target)) at(`route targets unknown place '${target}'`)
  }
  return issues
}

export function worldRelationsForState(state, { npcNodeOf, clock } = {}) {
  const relations = []
  const currentPlace = placeEntityId(state?.nodeId)
  if (currentPlace) relations.push(Object.freeze({ subject: 'actor:player', type: 'at', target: currentPlace }))

  for (const [itemId, count] of Object.entries(state?.inventory || {})) {
    if (!ITEMS[itemId] || !Number.isSafeInteger(count) || count <= 0) continue
    relations.push(Object.freeze({
      subject: `item:${itemId}`, type: 'carried-by', target: 'actor:player', count,
    }))
  }

  if (typeof npcNodeOf === 'function') {
    for (const npcId of Object.keys(NPCS)) {
      const nodeId = npcNodeOf(state, npcId)
      const target = placeEntityId(nodeId)
      if (target) relations.push(Object.freeze({ subject: `npc:${npcId}`, type: 'at', target }))
    }
  }

  const fixtureClock = Number.isFinite(clock) ? clock : state?.conditionClock ?? state?.clock
  for (const [fixtureId, fixture] of Object.entries(TIMED_WORLD_FIXTURES)) {
    const target = placeEntityId(fixture.nodeId)
    const stage = fixtureStageAt(fixtureId, state?.fixtures?.[fixtureId], fixtureClock)
    if (target && stage) relations.push(Object.freeze({
      subject: `fixture:${fixtureId}`, type: 'at', target, state: stage,
    }))
  }
  return Object.freeze(relations)
}

export function perceivableEntitiesAt(state, nodeId = state?.nodeId, adapters = {}) {
  const placeId = placeEntityId(nodeId)
  if (!placeId) return Object.freeze([])
  const related = new Set([placeId])
  for (const relation of worldRelationsForState(state, adapters)) {
    if (relation.target === placeId) related.add(relation.subject)
    if (relation.target === 'actor:player' && relation.type === 'carried-by') related.add(relation.subject)
  }
  for (const entry of Object.values(WORLD_ENTITIES)) {
    if (entry.relations?.some((relation) => relation.type === 'at' && relation.target === placeId)) related.add(entry.id)
  }
  return Object.freeze([...related].map((id) => WORLD_ENTITIES[id]).filter(Boolean))
}

export function worldActionOfOption(fromNodeId, option) {
  const effects = optionEffectsOf(option)
  const fromPlace = placeEntityId(fromNodeId)
  const toPlace = placeEntityId(option?.to)
  const observation = option?.observation || option?.contextObservation
  const fixtureEffects = effects.filter((effect) => effect?.type === 'fixture')
  const itemEffects = effects.filter((effect) => effect?.type === 'inventory')
  const targets = []
  if (toPlace && fromPlace !== toPlace) targets.push(toPlace)
  if (observation?.id) targets.push(`perception:${observation.id}`)
  for (const effect of fixtureEffects) targets.push(`fixture:${effect.id}`)
  for (const effect of itemEffects) targets.push(`item:${effect.id}`)
  return Object.freeze({
    intent: choiceIntentOf(option),
    from: fromPlace,
    to: toPlace,
    targets: Object.freeze([...new Set(targets)]),
    effects: Object.freeze(effects.map(({ legacy: _legacy, ...effect }) => Object.freeze(effect))),
  })
}

export function worldActionIssues(fromNodeId, option) {
  const issues = []
  const action = worldActionOfOption(fromNodeId, option)
  if (!action.from) issues.push('source node has no canonical physical place')
  if (option?.to && !action.to) issues.push('destination node has no canonical physical place')
  for (const target of action.targets) if (!WORLD_ENTITIES[target]) issues.push(`unknown entity target '${target}'`)
  if (action.intent === 'observation' && action.from !== action.to) {
    issues.push('observation action leaves its physical place')
  }
  for (const effect of action.effects.filter((entry) => entry.type === 'fixture')) {
    const fixture = WORLD_ENTITIES[`fixture:${effect.id}`]
    if (fixture?.relations?.[0]?.target !== action.from) {
      issues.push(`fixture '${effect.id}' is not at the action's place`)
    }
    if (!fixture?.affordances?.includes(effect.action)) {
      issues.push(`fixture '${effect.id}' does not afford '${effect.action}'`)
    }
  }
  return issues
}
