// Cross-system release gate: each stateful mechanic owns one canonical field.
// This catches shadow copies and partial transactions before a story-specific
// audit has to discover them through one particular route.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ITEMS, STORY } from '../src/game/content.js'
import {
  RETIRED_SHADOW_STATE_KEYS,
  environmentSnapshot,
  hasCond,
  newRun,
  normalizeSavedState,
  reducer,
} from '../src/game/gameState.js'
import {
  applyOptionEffects,
  optionEffectAvailability,
  optionEffectsAreValid,
  optionEffectsOf,
} from '../src/game/stateMechanics.js'
import { QUESTS, QUEST_STATE_VERSION } from '../src/game/quests.js'
import { NPCS } from '../src/game/npcs.js'
import { npcIdentityKnowledgeId } from '../src/game/npcIdentity.js'
import { PLACE_OF } from '../src/components/nodePositions.js'

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push({ name, ok: true })
    console.log(`✓ ${name}`)
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
    console.log(`✗ ${name}: ${error.message}`)
  }
}

check('new runs expose one authority for each durable world mechanic', () => {
  const state = newRun()
  assert.ok(state.inventory && Number.isInteger(state.clock) && typeof state.nodeId === 'string')
  assert.ok(state.knowledge && state.worldFacts && state.quests)
  assert.equal(state.questStateVersion, QUEST_STATE_VERSION)
  for (const key of RETIRED_SHADOW_STATE_KEYS) assert.equal(Object.hasOwn(state, key), false, key)
  assert.equal(Object.hasOwn(state, 'season'), false)
  assert.equal(Object.hasOwn(state, 'weather'), false)
})

check('save normalization removes shadow money, time, location, identity, fact, and quest fields', () => {
  const fresh = newRun()
  const saved = {
    ...fresh,
    nodeId: 'fshatiSheshi', clock: 41,
    inventory: { lek: 275, buke: 1 },
    knowledge: { 'npcName:elira': { atClock: 2, source: 'audit' } },
    worldFacts: { rainReturned: { atClock: 20, source: 'audit' } },
    quests: {},
  }
  for (const key of RETIRED_SHADOW_STATE_KEYS) saved[key] = `stale:${key}`
  const normalized = normalizeSavedState(saved, fresh)
  for (const key of RETIRED_SHADOW_STATE_KEYS) assert.equal(Object.hasOwn(normalized, key), false, key)
  assert.equal(normalized.nodeId, 'fshatiSheshi')
  assert.equal(normalized.clock, 41)
  assert.equal(normalized.inventory.lek, 275)
  assert.equal(normalized.inventory.buke, 1)
  assert.ok(normalized.knowledge['npcName:elira'])
  assert.ok(normalized.worldFacts.rainReturned)
})

check('physical items cannot be forged through the story-flag channel', () => {
  for (const itemId of Object.keys(ITEMS)) {
    const forged = { ...newRun(), inventory: {}, flags: { [itemId]: true } }
    assert.equal(hasCond(forged, itemId), false, `${itemId}: bare item gate accepted a flag`)
    assert.equal(hasCond(forged, `flag:${itemId}`), false, `${itemId}: explicit flag gate accepted an item alias`)
  }
  const normalized = normalizeSavedState({
    ...newRun(), flags: { buke: true, kripe: true, ordinaryStoryFlag: true }, inventory: {},
  }, newRun())
  assert.deepEqual(normalized.flags, { ordinaryStoryFlag: true })
})

check('all authored effects use valid non-overlapping canonical channels', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [optionIndex, option] of node.options.entries()) {
      assert.equal(optionEffectsAreValid(option), true, `${nodeId}.options[${optionIndex}] invalid effects`)
      const effects = optionEffectsOf(option)
      const signatures = effects.map(({ legacy: _legacy, ...effect }) => JSON.stringify(effect))
      assert.equal(new Set(signatures).size, signatures.length,
        `${nodeId}.options[${optionIndex}] applies a canonical effect twice`)
      for (const effect of effects) {
        if (effect.type === 'inventory') assert.ok(ITEMS[effect.id], `${nodeId}: unknown item ${effect.id}`)
        if (effect.type === 'flag') assert.equal(Boolean(ITEMS[effect.id]), false,
          `${nodeId}: physical item ${effect.id} authored as a flag`)
        if (effect.type === 'resource') assert.ok(['lek', 'hearts'].includes(effect.id),
          `${nodeId}: unknown resource ${effect.id}`)
      }
    }
  }
})

check('every authored inventory or money cost is checked and applied as one transaction', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [optionIndex, option] of node.options.entries()) {
      const effects = optionEffectsOf(option)
      const relevant = effects.filter((effect) =>
        (effect.type === 'inventory' || (effect.type === 'resource' && effect.id === 'lek')) &&
        Number.isSafeInteger(effect.delta))
      if (!relevant.some((effect) => effect.delta < 0)) continue

      const required = {}
      const running = {}
      for (const effect of relevant) {
        const id = effect.type === 'resource' ? 'lek' : effect.id
        running[id] = (running[id] || 0) + effect.delta
        required[id] = Math.max(required[id] || 0, -running[id])
      }
      const empty = { ...newRun(), inventory: {} }
      assert.equal(optionEffectAvailability(empty, option).ok, false,
        `${nodeId}.options[${optionIndex}] cost succeeds from an empty inventory`)
      const funded = { ...empty, inventory: { ...required } }
      assert.equal(optionEffectAvailability(funded, option).ok, true,
        `${nodeId}.options[${optionIndex}] rejects its exact required inventory`)
      const after = applyOptionEffects(funded, option, { maxHearts: 3 })
      for (const [id] of Object.entries(required)) {
        assert.ok((after.inventory[id] || 0) >= 0, `${nodeId}.options[${optionIndex}] made ${id} negative`)
      }
    }
  }
})

check('NPC identity is canonical knowledge, never an ad-hoc story flag', () => {
  const ids = Object.keys(NPCS).map(npcIdentityKnowledgeId).filter(Boolean)
  assert.equal(new Set(ids).size, ids.length)
  for (const node of Object.values(STORY)) for (const option of node.options) {
    for (const effect of optionEffectsOf(option)) {
      if (effect.type === 'flag') assert.equal(effect.id.startsWith('npcName:'), false)
    }
  }
})

check('time, weather, season, and physical place remain projections of clock and node id', () => {
  const state = { ...newRun(), nodeId: 'fshatiSheshi', clock: 41 }
  const environment = environmentSnapshot(state)
  assert.equal(typeof environment.season, 'string')
  assert.equal(typeof environment.weather, 'string')
  assert.equal(PLACE_OF[state.nodeId], 'fshatiSheshi')
  const altered = normalizeSavedState({ ...state, season: 'stale', weather: 'stale', location: 'start' }, newRun())
  assert.deepEqual(environmentSnapshot(altered), environment)
  assert.equal(altered.nodeId, 'fshatiSheshi')
})

check('quest state resets per run while learned identity and world consequences persist', () => {
  const state = {
    ...newRun(),
    quests: { [Object.keys(QUESTS)[0]]: { status: 'active', acceptedAtClock: 3 } },
    inventory: { buke: 1, lek: 800 },
    flags: { temporary: true },
    knowledge: { 'npcName:elira': { atClock: 2, source: 'audit' } },
    worldFacts: { rainReturned: { atClock: 4, source: 'audit' } },
  }
  const reset = reducer(state, { type: 'RESET' })
  assert.deepEqual(reset.quests, {})
  assert.deepEqual(reset.inventory, {})
  assert.deepEqual(reset.flags, {})
  assert.ok(reset.knowledge['npcName:elira'])
  assert.ok(reset.worldFacts.rainReturned)
})

check('ordinary player components do not render a quest ledger or canonical-state HUD', () => {
  const storyView = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(storyView, /state\.quests|questStatusOf|QUESTS\[/,
    'StoryView renders a quest ledger instead of authored Albanian consequences')
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(app, /state\.quests|questStatusOf|QUESTS\[/,
    'App renders a quest ledger outside debug mode')
})

const failed = checks.filter((result) => !result.ok)
if (failed.length > 0) {
  console.error(`\n${failed.length} canonical-state audit check(s) failed.`)
  process.exit(1)
}
console.log(`\nCanonical-state audit passed (${checks.length} contracts).`)
