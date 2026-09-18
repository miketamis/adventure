import { departureContextIssues } from '../src/game/departureContextValidation.js'
import { DEPARTURE_CONTEXTS, isUnchartedStoryNode } from '../src/game/departureContexts.js'
// Typed perceivable-world release gate. This proves the general entity layer
// is a read-only projection of the same state and affordances used by play.
import assert from 'node:assert/strict'
import { ITEMS, STORY } from '../src/game/content.js'
import { newRun, npcNodeOf, storyClockOf } from '../src/game/gameState.js'
import { NPCS } from '../src/game/npcs.js'
import { PLACE_NODES, PLACE_OF } from '../src/components/nodePositions.js'
import { TIMED_WORLD_FIXTURES } from '../src/game/worldFixtures.js'
import {
  WORLD_ENTITIES,
  WORLD_ENTITY_SCHEMA_VERSION,
  perceivableEntitiesAt,
  worldActionIssues,
  worldActionOfOption,
  worldEntityRegistryIssues,
  worldRelationsForState,
} from '../src/game/worldEntities.js'

assert.equal(WORLD_ENTITY_SCHEMA_VERSION, 1)
assert.deepEqual(departureContextIssues(STORY), [])
assert.deepEqual(worldEntityRegistryIssues(), [], 'typed world entity registry is invalid')

for (const anchor of Object.keys(PLACE_NODES)) {
  assert.equal(WORLD_ENTITIES[`place:${anchor}`]?.authority.channel, 'nodeId', `${anchor}: missing place entity`)
}
for (const itemId of Object.keys(ITEMS)) {
  assert.equal(WORLD_ENTITIES[`item:${itemId}`]?.authority.key, itemId, `${itemId}: missing item entity`)
}
for (const npcId of Object.keys(NPCS)) {
  assert.equal(WORLD_ENTITIES[`npc:${npcId}`]?.authority.key, npcId, `${npcId}: missing NPC entity`)
}
for (const fixtureId of Object.keys(TIMED_WORLD_FIXTURES)) {
  assert.equal(WORLD_ENTITIES[`fixture:${fixtureId}`]?.authority.key, fixtureId, `${fixtureId}: missing fixture entity`)
}

let actions = 0
for (const [nodeId, node] of Object.entries(STORY)) {
  assert.ok(PLACE_OF[nodeId] || isUnchartedStoryNode(nodeId), `${nodeId}: no physical place projection`)
  for (const [index, option] of (node.options || []).entries()) {
    assert.deepEqual(worldActionIssues(nodeId, option), [], `${nodeId}.options[${index}] has an invalid entity action`)
    const action = worldActionOfOption(nodeId, option)
    if (option.to && !action.departure && PLACE_OF[nodeId] !== PLACE_OF[option.to]) {
      assert.ok(action.targets.includes(`place:${PLACE_OF[option.to]}`), `${nodeId}->${option.to}: route target absent`)
    }
    actions++
  }
}

const state = {
  ...newRun(),
  inventory: { buke: 2, cader: 1 },
  fixtures: { campfire: storyClockOf(newRun()) },
  nodeId: 'lendina',
}
const relations = worldRelationsForState(state, { npcNodeOf, clock: storyClockOf(state) })
assert.ok(relations.some((entry) => entry.subject === 'actor:player' && entry.target === `place:${PLACE_OF.lendina}`))
assert.ok(relations.some((entry) => entry.subject === 'item:buke' && entry.type === 'carried-by' && entry.count === 2))
assert.ok(relations.some((entry) => entry.subject === 'fixture:campfire' && entry.state === 'bright'))
const visible = perceivableEntitiesAt(state, 'lendina', { npcNodeOf, clock: storyClockOf(state) })
assert.ok(visible.some((entry) => entry.id === 'fixture:campfire'))
assert.ok(visible.some((entry) => entry.id === 'item:cader'))

console.log(`✅ ${Object.keys(WORLD_ENTITIES).length} typed world entities project ${actions} authored choices through canonical state`)

for (const entry of DEPARTURE_CONTEXTS) {
  const choiceIndex = STORY[entry.from].options.findIndex((option) => option.to === entry.to)
  const relations = worldRelationsForState({ nodeId: entry.to, cameFrom: entry.from, choiceIndex })
  assert.equal(relations.some((relation) => relation.subject === 'actor:player' && relation.type === 'at'), false)
  assert.ok(relations.some((relation) => relation.type === 'departed-from' && relation.target === `place:${PLACE_OF[entry.from]}` && relation.departureId === entry.id))
}
