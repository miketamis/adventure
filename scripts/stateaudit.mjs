// Runtime world-state audit. This complements worldaudit/mapaudit by proving
// that the canonical structure is actually used by the reducer and survives
// save/restart boundaries.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { ITEMS, STORY } from '../src/game/content.js'
import {
  FESTIVAL_IDS,
  START_CLOCK,
  TIME_PHASES,
  arrivalOptionOf,
  applyOptionEffects,
  applyWorldEffects,
  advanceToCivilHour,
  canAfford,
  canUseItem,
  effectAvailabilityForOption,
  environmentSnapshot,
  civilHourAtClock,
  durationHoursOf,
  hasCond,
  hasRequiredItem,
  interactionAvailabilityForOption,
  newRun,
  normalizeSavedState,
  npcNodeOf,
  optionEffectsAreValid,
  optionNpcStartsAreValid,
  optionTimingIsValid,
  phaseAtCivilHour,
  phaseAtClock,
  phraseSenses,
  projectedClockForOption,
  rendezvousAvailabilityForOption,
  reconcileWorldFacts,
  reducer,
  timePassageForOption,
  weatherOf,
  worldEffectsForEnding,
  WORLD_FACT_INCOMPATIBLE,
  WORLD_EFFECTS_BY_ENDING,
} from '../src/game/gameState.js'
import {
  canApplyOptionEffects,
  interactionAvailability,
  interactionSpecOf,
  itemUseEffectsOption,
  optionEffectAvailability,
  optionEffectsOf,
  optionLekAvailability,
  recordInteractionUse,
  recordRendezvousArrivals,
  rendezvousAvailability,
  rendezvousDueClock,
  rendezvousSpecOf,
  rendezvousStatusOf,
  scheduleRendezvous,
} from '../src/game/stateMechanics.js'
import { NPCS } from '../src/game/npcs.js'
import coreVillageNpcs from '../src/game/data/npcs/core-village.js'
import {
  knowsNpcIdentity,
  npcIdentityConditionId,
  npcIdentityKnowledgeId,
  npcIdentityReference,
  npcIdentityRevealEffect,
  npcIdentitySpec,
} from '../src/game/npcIdentity.js'
import {
  WORLD_FACT_PRESENTATION,
  advanceToFestival,
  calendarAtClock,
  greetingPeriodAtClock,
  festivalIdsAtClock,
  hydrologyFromFacts,
  weatherAtClock,
  worldMemoriesFromFacts,
} from '../src/game/environment.js'
import { REGIONS } from '../src/game/regions.js'
import { embodimentOptionAccess } from '../src/game/embodiment.js'
import { fixtureStageAt } from '../src/game/worldFixtures.js'
import { isDistantLineVisible, routeForChoice, sightlinesFrom, transitionInfo } from '../src/game/worldModel.js'

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push({ name, ok: true })
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
  }
}

const stateAt = (nodeId, clock = START_CLOCK, extra = {}) => ({
  nodeId,
  clock,
  cameFrom: null,
  cameFromPhase: null,
  familiar: false,
  heard: {},
  rumor: false,
  trail: [],
  discovered: {},
  inventory: {},
  flags: {},
  knowledge: {},
  interactions: {},
  rendezvous: {},
  mana: {},
  practiced: {},
  visited: {},
  earned: {},
  eligible: {},
  attempts: {},
  dismissedTests: {},
  pendingTest: null,
  hearts: 3,
  healedAt: {},
  turn: 1,
  fixtures: {},
  npcStarted: {},
  worldFacts: {},
  view: 'story',
  ended: null,
  embodying: null,
  debug: false,
  loreFocus: null,
  ...extra,
})

check('discoverable NPC identity is generic, authored knowledge that survives saves and resets', () => {
  const spec = npcIdentitySpec('elira')
  assert.deepEqual(spec, {
    npcId: 'elira',
    name: 'Elira',
    descriptor: 'the woman from the bridge',
    knowledgeId: 'npcName:elira',
  })
  assert.deepEqual(coreVillageNpcs.elira.identity, NPCS.elira.identity,
    'NPC catalog and runtime identity metadata drifted')
  assert.deepEqual(npcIdentitySpec('gruaUji'), {
    npcId: 'gruaUji',
    name: 'Mira',
    descriptor: 'the woman carrying water',
    knowledgeId: 'npcName:gruaUji',
  })
  assert.deepEqual(coreVillageNpcs.gruaUji.identity, NPCS.gruaUji.identity,
    'water-carrier catalog and runtime identity metadata drifted')
  assert.equal(npcIdentityKnowledgeId('missing'), null)
  assert.equal(npcIdentityConditionId('missing'), null)
  assert.throws(() => npcIdentityRevealEffect('missing'), /no discoverable identity contract/)

  const fresh = newRun()
  assert.equal(knowsNpcIdentity(fresh, 'elira'), false)
  assert.equal(npcIdentityReference(fresh, 'elira'), 'the woman from the bridge')
  assert.equal(hasCond(fresh, npcIdentityConditionId('elira')), false)

  const learned = applyOptionEffects(
    fresh,
    { effects: [npcIdentityRevealEffect('elira')] },
    { atClock: 19, source: 'identity-audit' },
  )
  assert.equal(knowsNpcIdentity(learned, 'elira'), true)
  assert.equal(npcIdentityReference(learned, 'elira'), 'Elira')
  assert.equal(hasCond(learned, npcIdentityConditionId('elira')), true)
  assert.deepEqual(learned.knowledge[npcIdentityKnowledgeId('elira')], {
    atClock: 19,
    source: 'identity-audit',
  })

  const restored = normalizeSavedState(JSON.parse(JSON.stringify(learned)), newRun())
  assert.equal(knowsNpcIdentity(restored, 'elira'), true, 'save/reload forgot a learned identity')
  const reset = reducer(restored, { type: 'RESET' })
  assert.equal(reset.nodeId, 'start')
  assert.equal(knowsNpcIdentity(reset, 'elira'), true, 'reset forgot a learned identity')
  assert.equal(npcIdentityReference(reset, 'elira'), 'Elira')

  const knowsMira = applyOptionEffects(
    fresh,
    { effects: [npcIdentityRevealEffect('gruaUji')] },
    { atClock: 20, source: 'conversation-hub' },
  )
  assert.equal(knowsNpcIdentity(knowsMira, 'gruaUji'), true)
  assert.equal(npcIdentityReference(knowsMira, 'gruaUji'), 'Mira')
  assert.equal(hasCond(knowsMira, npcIdentityConditionId('gruaUji')), true)
})

check('typed effects compose while legacy choice fields keep their behavior', () => {
  const before = stateAt('start', 40, {
    inventory: { buke: 2, lek: 9 },
    flags: { oldRoad: true },
    hearts: 2,
    fixtures: { campfire: 38 },
  })
  const option = {
    effects: [
      { type: 'item', id: 'buke', delta: -2 },
      { type: 'inventory', id: 'barishte', delta: 3 },
      { type: 'flag', id: 'metMiller' },
      { type: 'flag', id: 'oldRoad', value: false },
      { type: 'learn', id: 'millShortcut' },
      { type: 'resource', id: 'lek', delta: -4 },
      { type: 'resource', id: 'hearts', set: 3 },
      { type: 'resource', id: 'hearts', delta: -1 },
      { type: 'fixture', id: 'campfire', action: 'clear' },
      { type: 'fixture', id: 'millLamp' },
    ],
  }
  assert.equal(optionEffectsAreValid(option, (id) => ['campfire', 'millLamp'].includes(id)), true)
  assert.equal(canApplyOptionEffects(
    before,
    option,
    (id) => ['campfire', 'millLamp'].includes(id),
    { fixtureClock: 41 },
  ), true)
  const after = applyOptionEffects(before, option, {
    atClock: 42,
    fixtureClock: 41,
    maxHearts: 3,
    source: 'audit-choice',
    isFixture: (id) => ['campfire', 'millLamp'].includes(id),
  })
  assert.deepEqual(after.inventory, { buke: 0, lek: 5, barishte: 3 })
  assert.deepEqual(after.flags, { metMiller: true })
  assert.deepEqual(after.knowledge, { millShortcut: { atClock: 42, source: 'audit-choice' } })
  assert.deepEqual(after.fixtures, { campfire: 33, millLamp: 41 })
  assert.equal(fixtureStageAt('campfire', after.fixtures.campfire, 41), 'out')
  assert.equal(after.hearts, 2)
  assert.deepEqual(before.inventory, { buke: 2, lek: 9 }, 'effect resolver mutated its input')

  const legacy = { consumes: 'buke', grant: 'kripe', lek: -2, hearts: 1, activateFixture: 'campfire' }
  const typed = {
    effects: [
      { type: 'inventory', id: 'buke', delta: -1 },
      { type: 'inventory', id: 'kripe', delta: 1 },
      { type: 'resource', id: 'lek', delta: -2 },
      { type: 'resource', id: 'hearts', delta: 1 },
      { type: 'fixture', id: 'campfire', action: 'activate' },
    ],
  }
  const legacyBefore = { ...before, fixtures: {} }
  const context = { fixtureClock: 44, maxHearts: 3, isFixture: (id) => id === 'campfire' }
  const legacyResult = applyOptionEffects(legacyBefore, legacy, context)
  const typedResult = applyOptionEffects(legacyBefore, typed, context)
  assert.deepEqual(
    { inventory: legacyResult.inventory, hearts: legacyResult.hearts, fixtures: legacyResult.fixtures },
    { inventory: typedResult.inventory, hearts: typedResult.hearts, fixtures: typedResult.fixtures },
  )

  assert.equal(canApplyOptionEffects(before, { effects: [{ type: 'item', id: 'buke', delta: -3 }] }), false)
  assert.equal(canApplyOptionEffects(
    { ...before, inventory: {} },
    { consumes: 'buke' },
  ), false, 'legacy consumption could drive inventory below zero without a redundant requires gate')
  assert.equal(canApplyOptionEffects(
    { ...before, inventory: {} },
    { effects: [
      { type: 'item', id: 'buke', delta: -1 },
      { type: 'item', id: 'buke', delta: 1 },
    ] },
  ), false, 'later grants incorrectly paid an earlier item cost')
  const combinedItems = applyOptionEffects(
    { ...before, inventory: { buke: 3 } },
    {
      consumes: 'buke',
      grant: 'kripe',
      effects: [
        { type: 'item', id: 'buke', delta: -1 },
        { type: 'item', id: 'kripe', delta: 1 },
      ],
    },
  )
  assert.deepEqual(combinedItems.inventory, { buke: 1, kripe: 2 })

  const resourceSets = applyOptionEffects(
    { ...before, inventory: { lek: 7 }, hearts: 1 },
    {
      effects: [
        { type: 'resource', id: 'lek', set: 12 },
        { type: 'resource', id: 'lek', delta: -3 },
        { type: 'resource', id: 'hearts', delta: 9 },
      ],
    },
    { maxHearts: 3 },
  )
  assert.equal(resourceSets.inventory.lek, 9)
  assert.equal(resourceSets.hearts, 3)
  assert.equal(optionEffectsAreValid({ effects: [{ type: 'resource', id: 'peak', delta: 1 }] }), false)
  assert.equal(optionEffectsAreValid({ effects: 'not-an-array' }), false)
  assert.equal(optionEffectsAreValid({ effects: [{ type: 'fixture', id: 'invented' }] }, () => false), false)
  assert.equal(canAfford(before, { effects: [{ type: 'resource', id: 'lek', set: 0 }] }), true)
  assert.equal(canAfford(before, {
    lek: -5,
    effects: [{ type: 'resource', id: 'lek', delta: -5 }],
  }), false, 'combined legacy and typed prices were not totaled')

  const spendAfterSet = {
    effects: [
      { type: 'resource', id: 'lek', set: 2 },
      { type: 'resource', id: 'lek', delta: -3 },
    ],
  }
  assert.deepEqual(
    optionLekAvailability(before, spendAfterSet),
    { ok: false, reason: 'insufficient-lek', have: 2, need: 1 },
  )
  assert.equal(canAfford(before, spendAfterSet), false, 'a pre-cost set bypassed affordability')
  assert.equal(optionEffectAvailability(before, spendAfterSet).reason, 'insufficient-lek')
  assert.equal(canAfford(
    { ...before, inventory: {} },
    { effects: [
      { type: 'resource', id: 'lek', set: 12 },
      { type: 'resource', id: 'lek', delta: -3 },
    ] },
  ), true, 'an earlier authored set did not fund a later cost')
  assert.equal(canAfford(before, {
    effects: [
      { type: 'resource', id: 'lek', delta: -10 },
      { type: 'resource', id: 'lek', set: 20 },
    ],
  }), false, 'a later set retroactively funded an earlier cost')

  for (const malformed of [
    { effects: [{ type: 'inventory', id: 'buke', delta: 1.5 }] },
    { effects: [{ type: 'inventory', id: 'lek', delta: 1 }] },
    { effects: [{ type: 'resource', id: 'lek', delta: -1.5 }] },
    { effects: [{ type: 'flag', id: 'x', value: 'false' }] },
    { effects: [{ type: 'flag', id: 'x', value: null }] },
    { effects: [{ type: 'fixture', id: 'campfire', action: null }] },
    { effects: [{ type: 'flag', id: '__proto__' }] },
    { effects: [{ type: 'flag', id: ' padded ' }] },
    { lek: -1.5 },
  ]) assert.equal(optionEffectsAreValid(malformed), false, 'malformed effect was accepted')

  const fixtureContext = (clock) => ({
    fixtureClock: clock,
    isFixture: (id) => id === 'campfire',
  })
  const activate = { effects: [{ type: 'fixture', id: 'campfire', action: 'relight' }] }
  const refuel = { effects: [{ type: 'fixture', id: 'campfire', action: 'reset' }] }
  const extinguish = { effects: [{ type: 'fixture', id: 'campfire', action: 'deactivate' }] }
  let fixtureState = { ...before, fixtures: {} }
  assert.equal(canApplyOptionEffects(fixtureState, activate, (id) => id === 'campfire', fixtureContext(20)), true)
  fixtureState = applyOptionEffects(fixtureState, activate, fixtureContext(20))
  assert.equal(fixtureState.fixtures.campfire, 20)
  assert.equal(canApplyOptionEffects(fixtureState, activate, (id) => id === 'campfire', fixtureContext(21)), false)
  assert.equal(canApplyOptionEffects(fixtureState, refuel, (id) => id === 'campfire', fixtureContext(23)), true)
  fixtureState = applyOptionEffects(fixtureState, refuel, fixtureContext(23))
  assert.equal(fixtureState.fixtures.campfire, 23)
  fixtureState = applyOptionEffects(fixtureState, extinguish, fixtureContext(25))
  assert.equal(fixtureState.fixtures.campfire, 17)
  assert.equal(fixtureStageAt('campfire', fixtureState.fixtures.campfire, 25), 'out')

  const remoteFixture = effectAvailabilityForOption(
    stateAt('start', 40),
    { text: [], to: 'start', effects: [{ type: 'fixture', id: 'campfire', action: 'activate' }] },
  )
  assert.deepEqual(
    { ok: remoteFixture.ok, reason: remoteFixture.reason, fixtureId: remoteFixture.fixtureId },
    { ok: false, reason: 'fixture-out-of-reach', fixtureId: 'campfire' },
  )
})

check('item uses are canonical, atomic typed-effect transactions', () => {
  const item = ITEMS.buke
  const ids = phraseSenses(item.use.phrase)
  const before = stateAt('start', 40, {
    inventory: { buke: 1 },
    hearts: 1,
    discovered: Object.fromEntries(ids.map((id) => [id, true])),
    mana: Object.fromEntries(ids.map((id) => [id, 2])),
  })
  assert.equal(canUseItem(before, item).ok, true)
  const used = reducer(before, {
    type: 'USE_ITEM',
    item: { ...item, use: { ...item.use, effect: { hearts: 99 } } },
    expectedCount: 1,
  })
  assert.equal(used.inventory.buke, 0)
  assert.equal(used.hearts, 3, 'forged item metadata bypassed the canonical catalog')
  assert.equal(used.mana[ids[0]], 1)
  assert.equal(canUseItem(used, item).ok, false)

  const twoCopies = { ...before, inventory: { buke: 2 } }
  const staleAction = { type: 'USE_ITEM', item, expectedCount: 2 }
  const firstUse = reducer(twoCopies, staleAction)
  assert.equal(firstUse.inventory.buke, 1)
  assert.strictEqual(reducer(firstUse, staleAction), firstUse, 'a stale item action consumed a second copy')
  assert.strictEqual(
    reducer(twoCopies, { type: 'USE_ITEM', item }),
    twoCopies,
    'an unbound item action omitted its observed count',
  )
  for (const blocked of [
    { ...before, ended: 'bad' },
    { ...before, timePassage: { id: 'active' } },
    { ...before, pendingEmbodiment: { taleId: 'test' } },
    { ...before, hearts: 0 },
  ]) {
    assert.equal(canUseItem(blocked, item).ok, false)
    assert.strictEqual(
      reducer(blocked, { type: 'USE_ITEM', item, expectedCount: 1 }),
      blocked,
      'item use mutated state behind a blocking surface',
    )
  }

  const pricedUse = {
    id: 'audit-priced-item',
    use: {
      phrase: item.use.phrase,
      effects: [{ type: 'resource', id: 'lek', delta: -4 }],
    },
  }
  const pricedState = { ...before, inventory: { 'audit-priced-item': 1, lek: 3 } }
  const pricedAvailability = canUseItem(pricedState, pricedUse).effectAvailability
  assert.deepEqual(
    { ok: pricedAvailability.ok, reason: pricedAvailability.reason, need: pricedAvailability.need },
    { ok: false, reason: 'insufficient-lek', need: 1 },
    'item-use prices bypassed the canonical resource transaction',
  )

  const doubleConsume = {
    ...item,
    use: { ...item.use, effects: [{ type: 'inventory', id: 'buke', delta: -1 }] },
  }
  assert.equal(canUseItem(before, doubleConsume).effectAvailability.reason, 'missing-item')

  const migrated = applyOptionEffects(
    { ...before, inventory: { buke: 1 }, hearts: 0 },
    itemUseEffectsOption({
      ...item,
      use: {
        ...item.use,
        effects: [{ type: 'resource', id: 'hearts', delta: 1 }],
        effect: { hearts: 3 },
      },
    }),
    { maxHearts: 3 },
  )
  assert.equal(migrated.hearts, 1, 'typed item effects were combined with their retired legacy adapter')
})

check('flags and learned knowledge are separate, save-safe state', () => {
  const state = stateAt('start', 30, {
    inventory: { legacyMarker: 1, buke: 1 },
    flags: { gateOpened: true },
    knowledge: { riverName: { atClock: 22, source: 'elder' } },
  })
  assert.equal(hasCond(state, 'flag:gateOpened'), true)
  assert.equal(hasCond(state, 'flag:legacyMarker'), true, 'explicit flags did not bridge an old inventory marker')
  assert.equal(hasCond(state, 'gateOpened'), true, 'bare flag compatibility was lost')
  assert.equal(hasCond(state, 'knows:riverName'), true)
  assert.equal(hasCond(state, 'itemTag:food'), true)
  assert.equal(hasCond(state, 'affords:eat'), true)
  assert.equal(hasCond(state, 'itemTag:light-source'), false)
  assert.equal(hasCond(state, 'affords:illuminate'), false)
  assert.equal(hasCond(state, 'fact:riverName'), false, 'learner knowledge leaked into physical world facts')
  assert.equal(hasCond(state, 'flag:constructor'), false, 'prototype property became a story flag')
  assert.equal(hasCond(state, 'knows:toString'), false, 'prototype property became learned knowledge')
  assert.equal(hasCond(state, null), false, 'malformed condition crashed or became truthy')

  const fresh = stateAt('start', 30)
  const normalized = normalizeSavedState({
    ...state,
    flags: { gateOpened: true, falseFlag: false },
    knowledge: {
      riverName: { atClock: 999, source: 'elder' },
      oldBooleanShape: true,
      forgotten: false,
    },
  }, fresh)
  assert.deepEqual(normalized.flags, { gateOpened: true })
  assert.deepEqual(normalized.knowledge, {
    riverName: { atClock: 30, source: 'elder' },
    oldBooleanShape: { atClock: 0, source: null },
  })

  const migratedRoleFlag = normalizeSavedState({
    ...fresh,
    nodeId: 'tsBeteje',
    embodying: 'tomor-shpirag',
    embodimentFocusNode: 'tsBeteje',
    inventory: { jamShpirag: 1, shkop: 1 },
    embodimentInventorySnapshot: {},
    embodimentInventoryIsolated: true,
  }, fresh)
  assert.equal(migratedRoleFlag.flags.jamShpirag, true)
  assert.equal(migratedRoleFlag.inventory.jamShpirag, undefined)
  assert.equal(hasCond(migratedRoleFlag, 'flag:jamShpirag'), true)
  assert.equal(hasRequiredItem(
    migratedRoleFlag,
    STORY.tsBeteje.options.find((option) => option.to === 'shpiragFund'),
  ), true, 'legacy Shpirag save could not reach its canonical ending')

  const unsafe = normalizeSavedState({
    ...fresh,
    inventory: JSON.parse('{"__proto__": 2, "constructor": 1, " padded ": 1, "boolean": true, "buke": 1, "dust": 0.5}'),
    flags: JSON.parse('{"__proto__": true, "constructor": true, "safe": true}'),
    knowledge: JSON.parse('{"__proto__": true, "constructor": true, "safe": true}'),
    interactions: JSON.parse('{"__proto__": {"run":{"uses":1,"lastAtClock":1}}, "safe":{"run":{"uses":1,"lastAtClock":1}}}'),
  }, fresh)
  assert.deepEqual(unsafe.inventory, { buke: 1 })
  assert.deepEqual(unsafe.flags, { safe: true })
  assert.deepEqual(unsafe.knowledge, { safe: { atClock: 0, source: null } })
  assert.deepEqual(unsafe.interactions, { safe: { run: { uses: 1, lastAtClock: 1 } } })

  const roleEnding = stateAt('shpiragFund', 40, {
    ended: 'secret',
    embodying: 'tomor-shpirag',
    embodimentFocusNode: 'shpiragFund',
    embodimentInventorySnapshot: { buke: 1 },
    embodimentInventoryIsolated: true,
    embodimentFlagsSnapshot: { forestThunderMark: true },
    embodimentHeartsSnapshot: 2,
    flags: { forestThunderMark: true, jamShpirag: true },
    inventory: { shkop: 1 },
  })
  const returned = reducer(roleEnding, { type: 'RETURN_TO_WORLD' })
  assert.deepEqual(returned.flags, { forestThunderMark: true }, 'role-local branch flag leaked into a replay')
  assert.deepEqual(returned.inventory, { buke: 1 })
  assert.equal(returned.embodimentFlagsSnapshot, null)

  const reset = reducer(state, { type: 'RESET' })
  assert.deepEqual(reset.knowledge, state.knowledge)
  assert.deepEqual(reset.flags, {})
  assert.deepEqual(reset.interactions, {})
  const badId = Object.keys(STORY).find((id) => STORY[id].end === 'bad')
  const continued = reducer({ ...state, nodeId: badId, ended: 'bad' }, { type: 'CONTINUE' })
  assert.deepEqual(continued.knowledge, state.knowledge)
  assert.deepEqual(continued.flags, {})
})

check('identified interactions enforce scene, day, tale, run, cooldown, and reducer limits', () => {
  // Scene means authored-node lifetime within this run, not a transient visit.
  // Leaving and returning to the same node must not silently reset it.
  const oncePerScene = { interaction: { id: 'ask-elder', scope: 'scene', once: true } }
  const firstScene = interactionAvailability({}, oncePerScene, { clock: 30, nodeId: 'start' })
  const sceneLedger = recordInteractionUse({}, firstScene, 30)
  assert.equal(interactionAvailability(sceneLedger, oncePerScene, { clock: 31, nodeId: 'start' }).reason, 'max-uses')
  assert.equal(interactionAvailability(sceneLedger, oncePerScene, { clock: 90, nodeId: 'start' }).reason, 'max-uses')
  assert.equal(interactionAvailability(sceneLedger, oncePerScene, { clock: 31, nodeId: 'lendina' }).ok, true)
  assert.equal(interactionAvailability({}, oncePerScene, { clock: 31 }).reason, 'unbound-scene')

  const daily = { interaction: { id: 'mill-work', scope: 'day', maxUses: 2, cooldownHours: 2 } }
  let availability = interactionAvailability({}, daily, { clock: 25, nodeId: 'mulli' })
  let ledger = recordInteractionUse({}, availability, 25)
  assert.equal(interactionAvailability(ledger, daily, { clock: 26, nodeId: 'mulli' }).reason, 'cooldown')
  assert.equal(interactionAvailability(ledger, daily, { clock: 26, nodeId: 'mulli' }).remainingHours, 1)
  availability = interactionAvailability(ledger, daily, { clock: 27, nodeId: 'mulli' })
  ledger = recordInteractionUse(ledger, availability, 27)
  assert.equal(interactionAvailability(ledger, daily, { clock: 28, nodeId: 'mulli' }).reason, 'max-uses')
  assert.equal(interactionAvailability(ledger, daily, { clock: 48, nodeId: 'mulli' }).ok, true)
  const midnightDaily = { interaction: { id: 'midnight-market', scope: 'day', once: true } }
  const beforeMidnight = interactionAvailability({}, midnightDaily, { clock: 17, nodeId: 'shesh' })
  const beforeMidnightLedger = recordInteractionUse({}, beforeMidnight, 17)
  assert.equal(interactionAvailability(beforeMidnightLedger, midnightDaily, { clock: 17, nodeId: 'shesh' }).reason, 'max-uses')
  assert.equal(interactionAvailability(beforeMidnightLedger, midnightDaily, { clock: 18, nodeId: 'shesh' }).ok, true, 'day scope did not reset at civil midnight')

  const tale = { interaction: { id: 'tale-oath', scope: 'tale', once: true } }
  assert.equal(interactionAvailability({}, tale, { clock: 1, nodeId: 'start' }).reason, 'unbound-tale')
  availability = interactionAvailability({}, tale, { clock: 1, nodeId: 'a', taleId: 'maro' })
  ledger = recordInteractionUse({}, availability, 1)
  assert.equal(interactionAvailability(ledger, tale, { clock: 20, nodeId: 'b', taleId: 'maro' }).reason, 'max-uses')
  assert.equal(interactionAvailability(ledger, tale, { clock: 20, nodeId: 'b', taleId: 'gjizar' }).ok, true)
  assert.equal(interactionAvailability({}, { interaction: { id: 'unlimited' } }, {
    clock: 1, nodeId: 'start',
  }).reason, 'invalid', 'an interaction with no actual limit was accepted')
  for (const interaction of [
    { id: 'typo', scope: 'daily', once: true },
    { id: 'conflict', once: true, maxUses: 2 },
    { id: 'misbound', scope: 'run', once: true, taleId: 'maro' },
    { id: 'fractional-uses', scope: 'run', maxUses: 1.5 },
    { id: 'fractional-cooldown', scope: 'run', cooldownHours: 1.5 },
    { id: '__proto__', scope: 'run', once: true },
    { id: 'null-scope', scope: null, once: true },
    { id: 'null-limit', scope: 'run', maxUses: null },
  ]) {
    assert.equal(interactionAvailability({}, { interaction }, { clock: 1, nodeId: 'start' }).reason, 'invalid')
  }

  const normalized = normalizeSavedState({
    ...stateAt('start', 30),
    interactions: {
      work: {
        run: { uses: 2, lastAtClock: 999 },
        'day:1': { uses: 0, lastAtClock: 20 },
        malformed: { uses: 4, lastAtClock: 20 },
      },
      broken: 'not-a-ledger',
    },
  }, stateAt('start', 30))
  assert.deepEqual(normalized.interactions, {
    work: { run: { uses: 2, lastAtClock: 30 } },
  })

  // Exercise the actual reducer boundary with a harmless authored self-loop;
  // restore the imported content object even if an assertion fails.
  const repeat = STORY.pazariPerserit.options.find((option) => option.to === 'pazariPerserit')
  const prior = repeat.interaction
  try {
    repeat.interaction = { id: 'audit-repeat', scope: 'run', once: true }
    const ids = phraseSenses(repeat.text)
    const ready = stateAt('pazariPerserit', 30, {
      discovered: Object.fromEntries(ids.map((id) => [id, true])),
      mana: Object.fromEntries(ids.map((id) => [id, 2])),
    })
    assert.equal(interactionAvailabilityForOption(ready, repeat).ok, true)
    const action = {
      type: 'CHOOSE', option: repeat, targetNode: STORY.pazariPerserit,
      fromNodeId: ready.nodeId, fromTurn: ready.turn,
    }
    const chosen = reducer(ready, action)
    assert.notStrictEqual(chosen, ready)
    assert.equal(chosen.interactions['audit-repeat'].run.uses, 1)
    const replay = reducer(chosen, { ...action, fromTurn: chosen.turn })
    assert.strictEqual(replay, chosen, 'reducer allowed an exhausted interaction')
  } finally {
    if (prior === undefined) delete repeat.interaction
    else repeat.interaction = prior
  }
})

check('rendezvous promises keep their clock, classify arrivals, walk real NPCs, and survive saves', () => {
  const followOption = {
    rendezvous: {
      id: 'audit-follow',
      npcId: 'auditRendezvousNpc',
      placeId: 'fshatiLumi',
      kind: 'follow',
      dueInHours: 1,
      graceHours: 0,
      leaveAfterHours: 2,
    },
  }
  const spec = rendezvousSpecOf(followOption)
  assert.equal(rendezvousDueClock(13, spec), 14)
  const availability = rendezvousAvailability({ rendezvous: {} }, followOption, {
    clock: 13,
    isNpc: (id) => id === 'auditRendezvousNpc',
    isPlace: (id) => id === 'fshatiLumi',
  })
  assert.equal(availability.ok, true)
  const scheduled = scheduleRendezvous({}, availability)
  assert.equal(rendezvousStatusOf(scheduled, 'audit-follow', 13), 'scheduled')
  assert.equal(rendezvousStatusOf(scheduled, 'audit-follow', 14), 'waiting')
  assert.equal(rendezvousStatusOf(scheduled, 'audit-follow', 15), 'late')
  assert.equal(rendezvousStatusOf(scheduled, 'audit-follow', 17), 'missed')

  const early = recordRendezvousArrivals(scheduled, {
    nodeId: 'fshatiLumi', clock: 13, npcNodeOf: () => 'fshatiLumi',
  })
  assert.strictEqual(early, scheduled, 'an early co-location fulfilled a promise before its agreed time')
  const absent = recordRendezvousArrivals(scheduled, {
    nodeId: 'fshatiLumi', clock: 14, npcNodeOf: () => 'start',
  })
  assert.strictEqual(absent, scheduled, 'a promise resolved without the NPC being physically present')
  const onTime = recordRendezvousArrivals(scheduled, {
    nodeId: 'fshatiLumi', clock: 14, npcNodeOf: () => 'fshatiLumi',
  })
  assert.equal(onTime['audit-follow'].outcome, 'on-time')
  assert.equal(onTime['audit-follow'].metAtClock, 14)
  assert.equal(rendezvousStatusOf(onTime, 'audit-follow', 99), 'on-time')
  const late = recordRendezvousArrivals(scheduled, {
    nodeId: 'fshatiLumi', clock: 15, npcNodeOf: () => 'fshatiLumi',
  })
  assert.equal(late['audit-follow'].outcome, 'late')
  const missed = recordRendezvousArrivals(scheduled, {
    nodeId: 'fshatiLumi', clock: 17, npcNodeOf: () => 'fshatiLumi',
  })
  assert.equal(missed['audit-follow'].outcome, 'missed')

  const tomorrow = rendezvousSpecOf({
    rendezvous: {
      id: 'audit-tomorrow', npcId: 'auditRendezvousNpc', placeId: 'fshatiSheshi',
      kind: 'meeting', atHour: 7, dayOffset: 1, graceHours: 1, leaveAfterHours: 3,
    },
  })
  assert.equal(rendezvousDueClock(13, tomorrow), 25, 'tomorrow 07:00 drifted across the civil-day boundary')
  const pastToday = rendezvousAvailability({ rendezvous: {} }, {
    rendezvous: {
      id: 'audit-past', npcId: 'auditRendezvousNpc', placeId: 'fshatiSheshi',
      kind: 'meeting', atHour: 18, dayOffset: 0, graceHours: 1, leaveAfterHours: 3,
    },
  }, { clock: 13 })
  assert.equal(pastToday.reason, 'past-due')
  assert.equal(rendezvousSpecOf({ rendezvous: { ...followOption.rendezvous, dueInHours: 1, atHour: 7 } }), false)
  assert.equal(rendezvousAvailability({ rendezvous: scheduled }, followOption, { clock: 13 }).reason, 'already-scheduled')

  const npcId = 'auditRendezvousNpc'
  NPCS[npcId] = {
    name: 'audit walker', glyph: '•', once: true, stepHours: 1,
    route: ['start', 'fshatiLumi'], settlesAt: 'fshatiLumi',
  }
  const agreement = {
    ...followOption,
    text: STORY.start.options[0].text,
    to: 'start',
    durationHours: 0,
    startsNpc: npcId,
  }
  STORY.start.options.push(agreement)
  try {
    const crossing = STORY.start.options.find((option) => option.to === 'fshatiLumi')
    const ids = new Set([...phraseSenses(agreement.text), ...phraseSenses(crossing.text)])
    let state = stateAt('start', 13, {
      discovered: Object.fromEntries([...ids].map((id) => [id, true])),
      mana: Object.fromEntries([...ids].map((id) => [id, 3])),
    })
    assert.equal(optionNpcStartsAreValid(agreement), true)
    assert.equal(rendezvousAvailabilityForOption(state, agreement).ok, true)
    state = reducer(state, { type: 'CHOOSE', option: agreement, targetNode: STORY.start })
    assert.equal(state.nodeId, 'start', 'agreeing to a rendezvous moved the player')
    assert.equal(state.clock, 13, 'agreeing to a rendezvous advanced the player clock')
    assert.equal(state.npcStarted[npcId], 13)
    assert.equal(npcNodeOf(state, npcId), 'start')
    state = reducer(state, { type: 'CHOOSE', option: crossing, targetNode: STORY.fshatiLumi })
    assert.equal(state.nodeId, 'fshatiLumi')
    assert.equal(state.clock, 14)
    assert.equal(npcNodeOf(state, npcId), 'fshatiLumi')
    assert.equal(state.rendezvous['audit-follow'].outcome, 'on-time')
    assert.equal(hasCond(state, 'rendezvous:audit-follow:fulfilled'), true)
    assert.equal(hasCond(state, 'rendezvous:audit-follow:on-time'), true)
    assert.equal(npcNodeOf({ ...state, clock: 40 }, npcId), 'fshatiLumi', 'one-shot NPC did not settle')

    const normalized = normalizeSavedState({
      ...stateAt('start', 30),
      rendezvous: {
        valid: {
          id: 'valid', npcId, placeId: 'start', kind: 'meeting',
          agreedAtClock: 20, dueAtClock: 40, graceHours: 1, leaveAfterHours: 3,
          metAtClock: null, outcome: null,
        },
        badOutcome: {
          id: 'badOutcome', npcId, placeId: 'start', kind: 'meeting',
          agreedAtClock: 20, dueAtClock: 22, graceHours: 1, leaveAfterHours: 3,
          metAtClock: 22, outcome: 'late',
        },
        unknownNpc: {
          id: 'unknownNpc', npcId: 'missing', placeId: 'start', kind: 'meeting',
          agreedAtClock: 20, dueAtClock: 22, graceHours: 1, leaveAfterHours: 3,
          metAtClock: null, outcome: null,
        },
      },
    }, stateAt('start', 30))
    assert.deepEqual(Object.keys(normalized.rendezvous), ['valid'])
    assert.equal(normalized.rendezvous.valid.dueAtClock, 40, 'a valid future promise was clamped away')
  } finally {
    STORY.start.options.pop()
    delete NPCS[npcId]
  }
})

check('embodied detours reject every generalized state mutation', () => {
  const travel = STORY.start.options.find((option) => option.to === 'fshatiLumi')
  assert.ok(travel, 'audit needs the opening public road')
  const roleState = stateAt('start', 30, {
    embodying: 'aga-ymer',
    embodimentPaused: true,
    embodimentFocusNode: 'agaYmer2',
  })
  assert.equal(embodimentOptionAccess(roleState, travel, STORY.fshatiLumi).kind, 'detour')
  assert.equal(embodimentOptionAccess(
    roleState,
    { ...travel, effects: [{ type: 'flag', id: 'forgedDetourEffect' }] },
    STORY.fshatiLumi,
  ).ok, false, 'typed effect crossed the suspended-role boundary')
  assert.equal(embodimentOptionAccess(
    roleState,
    { ...travel, interaction: { id: 'forgedDetourInteraction', scope: 'run', once: true } },
    STORY.fshatiLumi,
  ).ok, false, 'interaction ledger mutation crossed the suspended-role boundary')
  assert.equal(embodimentOptionAccess(
    roleState,
    travel,
    { ...STORY.fshatiLumi, worldEffects: ['forgedDetourWorldEffect'] },
  ).ok, false, 'target world effect crossed the suspended-role boundary')
})

check('playable content exercises limits, hidden knowledge, and fixture actions through the reducer', () => {
  const authored = Object.entries(STORY).flatMap(([nodeId, node]) =>
    (node.options || []).filter((option) => !option.confuser).map((option) => ({ nodeId, option })))

  const paidDaily = authored.find(({ option }) =>
    option.interaction?.scope === 'day' && (option.lek || 0) > 0)
  assert.ok(paidDaily, 'no paid daily interaction is playable')
  const wageIds = phraseSenses(paidDaily.option.text)
  const wageBefore = stateAt(paidDaily.nodeId, 27, {
    inventory: { lahute: 1 },
    observations: paidDaily.option.attentionGate
      ? { [paidDaily.option.attentionGate.id]: { atClock: 27, nodeId: paidDaily.nodeId } }
      : {},
    discovered: Object.fromEntries(wageIds.map((id) => [id, true])),
    mana: Object.fromEntries(wageIds.map((id) => [id, 2])),
  })
  const wageAfter = reducer(wageBefore, {
    type: 'CHOOSE', option: paidDaily.option, targetNode: STORY[paidDaily.option.to],
    fromNodeId: paidDaily.nodeId, fromTurn: wageBefore.turn,
  })
  assert.equal(wageAfter.inventory.lek, paidDaily.option.lek)
  assert.equal(arrivalOptionOf(wageAfter), paidDaily.option,
    'arrival prose lost the exact canonical choice that changed the purse')
  const wageReloaded = normalizeSavedState(wageAfter, stateAt(wageAfter.nodeId, wageAfter.clock))
  assert.equal(arrivalOptionOf(wageReloaded), paidDaily.option,
    'a valid transaction arrival did not survive reload')
  assert.equal(arrivalOptionOf(normalizeSavedState({
    ...wageAfter,
    choiceIndex: 99_999,
  }, stateAt(wageAfter.nodeId, wageAfter.clock))), null,
  'a forged transaction option survived save normalization')
  assert.equal(interactionAvailabilityForOption(
    { ...wageAfter, nodeId: paidDaily.nodeId }, paidDaily.option,
  ).reason, 'max-uses')
  assert.equal(interactionAvailabilityForOption(
    { ...wageAfter, nodeId: paidDaily.nodeId, clock: 51 }, paidDaily.option,
  ).ok, true, 'daily wage did not reopen on the next civil day')

  const hiddenKnowledge = authored.find(({ option }) =>
    (option.effects || []).some((effect) => effect.type === 'flag') &&
    (option.effects || []).some((effect) => effect.type === 'learn') &&
    [].concat(option.requires || []).some((id) => id.startsWith?.('itemTag:')))
  assert.ok(hiddenKnowledge, 'no item-capability discovery learns durable lore and sets a process flag')
  const discoveryIds = phraseSenses(hiddenKnowledge.option.text)
  const discoveryBefore = stateAt(hiddenKnowledge.nodeId, 15, {
    inventory: { pishtar: 1 },
    discovered: Object.fromEntries(discoveryIds.map((id) => [id, true])),
    mana: Object.fromEntries(discoveryIds.map((id) => [id, 2])),
  })
  const discoveryAfter = reducer(discoveryBefore, {
    type: 'CHOOSE', option: hiddenKnowledge.option, targetNode: STORY[hiddenKnowledge.option.to],
    fromNodeId: hiddenKnowledge.nodeId, fromTurn: discoveryBefore.turn,
  })
  const learned = hiddenKnowledge.option.effects.find((effect) => effect.type === 'learn').id
  const flag = hiddenKnowledge.option.effects.find((effect) => effect.type === 'flag').id
  assert.equal(hasCond(discoveryAfter, `knows:${learned}`), true)
  assert.equal(hasCond(discoveryAfter, `flag:${flag}`), true)

  const fixtureAction = authored.find(({ option }) =>
    (option.effects || []).some((effect) => effect.type === 'fixture' && effect.action === 'refuel'))
  assert.ok(fixtureAction, 'no typed refuel action is playable')
  const fixtureEffect = fixtureAction.option.effects.find((effect) => effect.type === 'fixture')
  const fixtureIds = phraseSenses(fixtureAction.option.text)
  const fixtureBefore = stateAt(fixtureAction.nodeId, 15, {
    fixtures: { [fixtureEffect.id]: 10 },
    discovered: Object.fromEntries(fixtureIds.map((id) => [id, true])),
    mana: Object.fromEntries(fixtureIds.map((id) => [id, 2])),
  })
  const fixtureAfter = reducer(fixtureBefore, {
    type: 'CHOOSE', option: fixtureAction.option, targetNode: STORY[fixtureAction.option.to],
    fromNodeId: fixtureAction.nodeId, fromTurn: fixtureBefore.turn,
  })
  assert.equal(fixtureAfter.fixtures[fixtureEffect.id], projectedClockForOption(fixtureBefore, fixtureAction.option))
  assert.equal(fixtureStageAt(fixtureEffect.id, fixtureAfter.fixtures[fixtureEffect.id], fixtureAfter.clock), 'bright')
})

check('ordinary choices use canonical route hours', () => {
  let compared = 0
  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.confuser || !STORY[option.to] || option.date || option.time || Number.isFinite(option.durationHours)) continue
      const start = 240
      const route = transitionInfo(from, option)
      if (!route.valid) continue // placement audits own unmapped story-internal beats
      assert.equal(projectedClockForOption(stateAt(from, start), option), start + route.hours, `${from}->${option.to}`)
      compared++
    }
  }
  assert.ok(compared >= 750, `only ${compared} ordinary choices compared`)

  const accompaniedWalk = STORY.eliraBreg.options.find((option) => (
    !option.confuser && option.to === 'fshatiSheshi' && option.durationHours === 2
  ))
  assert.ok(accompaniedWalk, 'the river-bank walk to the village disappeared')
  const accompaniedRoute = routeForChoice('eliraBreg', accompaniedWalk)
  assert.equal(accompaniedRoute.verb, 'po_yes', 'movement test no longer begins with a non-movement clause')
  assert.equal(accompaniedRoute.movementVerbId, 'vjen', 'movement inside a multi-clause choice was not found')
  assert.equal(accompaniedRoute.kind, 'journey', 'a narrated accompanied walk was classified as a hidden scene shift')
})

check('exact civil hours compose with routes, dates, phases, tale clocks, and saves', () => {
  // The narrative cycle starts at dawn, but authored/displayed hours are
  // civil: internal 0 is 06:00 and the civil date turns at internal 18.
  assert.deepEqual(
    [calendarAtClock(0).month, calendarAtClock(0).day, civilHourAtClock(0), phaseAtClock(0)],
    [3, 13, 6, 'dawn'],
  )
  assert.deepEqual(
    [calendarAtClock(17).day, civilHourAtClock(17), phaseAtClock(17)],
    [13, 23, 'night'],
  )
  assert.deepEqual(
    [calendarAtClock(18).day, civilHourAtClock(18), phaseAtClock(18)],
    [14, 0, 'night'],
  )
  assert.equal(phaseAtCivilHour(0), 'night')
  assert.equal(phaseAtCivilHour(6), 'dawn')
  assert.equal(advanceToCivilHour(12, 18), 12, 'an already exact arrival gained a day')
  assert.equal(advanceToCivilHour(13, 18), 36, 'a missed civil hour did not reach its next occurrence')
  for (const malformed of [-1, 24, 1.5, '6', NaN, Infinity]) {
    assert.equal(advanceToCivilHour(10, malformed), 10, `malformed hour ${String(malformed)} changed the clock`)
  }

  const routeThenHour = { text: [], to: 'start', durationHours: 4, atHour: 18 }
  const routeStart = stateAt('start', 5) // 11:00 civil
  const exactArrival = projectedClockForOption(routeStart, routeThenHour)
  assert.equal(durationHoursOf(routeThenHour, 'start'), 4)
  assert.ok(exactArrival >= routeStart.clock + 4, 'exact hour replaced the authored journey')
  assert.equal(exactArrival, 12)
  assert.equal(civilHourAtClock(exactArrival), 18)

  const exactTwoDays = { text: [], to: 'start', durationHours: 48, atHour: 5, time: 'night' }
  const beforeDawn = stateAt('start', 23) // 05:00 civil
  assert.equal(projectedClockForOption(beforeDawn, exactTwoDays), 71, 'an exact 48-hour span gained a hidden day')

  const exactFestival = { text: [], to: 'start', date: 'ditaVeres', atHour: 23, time: 'night' }
  const festivalArrival = projectedClockForOption(stateAt('start', 0), exactFestival)
  assert.deepEqual(
    [calendarAtClock(festivalArrival).month, calendarAtClock(festivalArrival).day, civilHourAtClock(festivalArrival), phaseAtClock(festivalArrival)],
    [3, 14, 23, 'night'],
  )
  const missedFestivalHour = projectedClockForOption(stateAt('start', festivalArrival + 1), exactFestival)
  assert.ok(missedFestivalHour - festivalArrival > 300 * 24)
  assert.equal(civilHourAtClock(missedFestivalHour), 23)
  assert.ok(festivalIdsAtClock(missedFestivalHour).includes('ditaVeres'))

  for (const malformed of [
    { durationHours: 1.5 }, { durationHours: -1 }, { durationHours: Infinity },
    { atHour: -1 }, { atHour: 24 }, { atHour: 5.5 }, { atHour: '0' },
    { time: 'dawn', atHour: 0 }, { time: 'night', atHour: 6 },
    { time: 'midnight' }, { date: 'invented-feast' },
  ]) assert.equal(optionTimingIsValid(malformed), false, `accepted malformed timing ${JSON.stringify(malformed)}`)
  assert.equal(optionTimingIsValid({ durationHours: 48, time: 'night', atHour: 5 }), true)
  assert.equal(optionTimingIsValid({ date: 'ditaVeres', time: 'dawn', atHour: 6 }), true)

  // Tale projection owns the target hour; the living world receives precisely
  // the same elapsed delta and persisted passage endpoints retain both clocks.
  const taleOption = {
    text: [], to: 'start', durationHours: 1, atHour: 0, time: 'night',
    timePassage: {
      title: 'Midnight crossing', label: 'arrive at midnight',
      segments: [{ label: 'One final hour', detail: 'The road reaches midnight.', hours: 1 }],
    },
  }
  const taleState = stateAt('start', 100, { conditionClock: 17 }) // tale 23:00
  const taleArrival = projectedClockForOption(taleState, taleOption)
  const worldArrival = taleState.clock + (taleArrival - taleState.conditionClock)
  const passage = timePassageForOption(taleState, taleOption, taleArrival, {
    clockKind: 'tale', worldFromClock: taleState.clock, worldToClock: worldArrival,
  })
  assert.equal(taleArrival, 18)
  assert.equal(civilHourAtClock(taleArrival), 0)
  assert.equal(passage.clockKind, 'tale')
  assert.deepEqual(
    [passage.fromClock, passage.toClock, passage.worldFromClock, passage.worldToClock, passage.elapsedHours],
    [17, 18, 100, 101, 1],
  )
  assert.deepEqual(JSON.parse(JSON.stringify(passage)), passage, 'exact-hour passage was not save-safe')

  const fresh = stateAt('start', START_CLOCK)
  const reloadedMidnight = normalizeSavedState({ ...fresh, clock: 18 }, fresh)
  assert.equal(reloadedMidnight.clock, 18)
  assert.deepEqual([calendarAtClock(reloadedMidnight.clock).day, civilHourAtClock(reloadedMidnight.clock)], [14, 0])

  let authoredExactHours = 0
  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.atHour == null || option.confuser) continue
      authoredExactHours++
      for (const start of [0, 5, 17, 18, 23, 39, 365 * 24 + 22]) {
        const arrival = projectedClockForOption(stateAt(from, start), option)
        assert.ok(arrival >= start + durationHoursOf(option, from), `${from}->${option.to}: exact hour replaced route time`)
        assert.equal(civilHourAtClock(arrival), option.atHour, `${from}->${option.to}: missed authored civil hour`)
        if (option.time) assert.equal(phaseAtClock(arrival), option.time, `${from}->${option.to}: exact hour disagrees with phase`)
        if (option.date) assert.ok(festivalIdsAtClock(arrival).includes(option.date), `${from}->${option.to}: exact hour left its observance`)
      }
    }
  }
  assert.ok(authoredExactHours >= 5, `only ${authoredExactHours} playable exact-hour routes`)
})

check('phase and festival waits include the road before the wait', () => {
  let compared = 0
  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.confuser || (!option.time && !option.date) || Number.isFinite(option.durationHours)) continue
      const start = 255 // night: catches a target-night road that could otherwise collapse to one hour
      const routeHours = transitionInfo(from, { ...option, time: undefined, date: undefined }).hours
      assert.equal(transitionInfo(from, option).hours, routeHours, `${from}->${option.to}: route note hid travel time`)
      assert.ok(projectedClockForOption(stateAt(from, start), option) >= start + routeHours, `${from}->${option.to}: target wait replaced its journey`)
      compared++
    }
  }
  assert.ok(compared >= 10, `only ${compared} phase/calendar roads compared`)
})

check('authored long waits advance the narrated interval', () => {
  const gjizarWait = STORY.gjizarUdha.options.find((option) => option.to === 'gjizarPallat')
  assert.equal(gjizarWait.durationHours, 2161)
  const gjizarArrival = projectedClockForOption(stateAt('gjizarUdha', 240), gjizarWait)
  assert.ok(gjizarArrival >= 240 + 2161 && gjizarArrival < 240 + 2161 + 24)
  assert.equal(phaseAtClock(gjizarArrival), 'night', 'the 90-day flight no longer finds the sleeping palace at night')

  for (const from of ['maroIkja', 'maroMesnata']) {
    const weddingWait = STORY[from].options.find((option) => option.to === 'maroKrushqit')
    assert.equal(weddingWait.durationHours, 2 * 30 * 24, `${from}: the source's “about two months” preparation was not represented`)
  }
  const familyWait = STORY.maroKrushqit.options.find((option) => option.to === 'maroPallati')
  assert.equal(familyWait.durationHours, 2 * 30 * 24, 'Maro brought her family near without representing the source\'s approximate two-month wait')
  const needleWait = STORY.maroPallati.options.find((option) => option.to === 'maroGjilpera')
  assert.equal(needleWait.durationHours, 10 * 24, "the sorceress's source-specified ten days were collapsed")

  const maroStart = 240
  const maroArrival = projectedClockForOption(stateAt('maroIkja', maroStart), STORY.maroIkja.options[0])
  const familyArrival = projectedClockForOption(stateAt('maroKrushqit', maroArrival), familyWait)
  const needleReady = projectedClockForOption(stateAt('maroPallati', familyArrival), needleWait)
  assert.equal(needleReady - maroStart, (2 + 2) * 30 * 24 + 10 * 24)

  const vigilFirst = STORY.kopshtMermer2.options.find((option) => option.to === 'mermerZgjim')
  const vigilLast = STORY.mermerZgjim.options.find((option) => option.to === 'mermerTradheti')
  assert.equal(vigilFirst.durationHours, 17 * 24)
  assert.equal(vigilLast.durationHours, 7 * 24)
  const vigilHandoff = projectedClockForOption(stateAt('kopshtMermer2', 240), vigilFirst)
  const kingWakes = projectedClockForOption(stateAt('mermerZgjim', vigilHandoff), vigilLast)
  assert.equal(kingWakes - 240, 24 * 24, 'the marble king did not wake after the scroll\'s three days/nights plus three weeks')

  // Schirò's closing clock has three separate claims: Handa reaches
  // Bardhakuqja on the promised day; Zjerma sees the sword the following
  // dawn; only after the fire ordeal do Zjerma and Bardhakuqja spend three
  // tale-months with his mother and ride back to the river kingdom.
  const promisedInterval = 365 * 24 + 30 * 24 + 24
  const promiseDeparture = 243 // daytime, so the same hour 396 days later is also daytime
  const promisedRoute = [
    ['binoshetFund', 'binoshetKasollja'],
    ['binoshetKasollja', 'binoshetKopshtiZanave'],
    ['binoshetKopshtiZanave', 'binoshetGardhiHanda'],
    ['binoshetGardhiHanda', 'binoshetGardhiZjerma'],
    ['binoshetGardhiZjerma', 'binoshetZambak'],
    ['binoshetZambak', 'binoshetDasma'],
    ['binoshetDasma', 'binoshetKuvendi'],
    ['binoshetKuvendi', 'binoshetLuftaFillon'],
    ['binoshetLuftaFillon', 'binoshetLuftaZgjat'],
    ['binoshetLuftaZgjat', 'binoshetLuftaFund'],
    ['binoshetLuftaFund', 'binoshetKurora'],
    ['binoshetKurora', 'binoshetShpata'],
  ]
  const feast = STORY.binoshetDasma.options.find((option) => option.to === 'binoshetKuvendi')
  const roadToWar = STORY.binoshetKuvendi.options.find((option) => option.to === 'binoshetLuftaFillon')
  const firstCampaignMonth = STORY.binoshetLuftaFillon.options.find((option) => option.to === 'binoshetLuftaZgjat')
  const remainingCampaign = STORY.binoshetLuftaZgjat.options.find((option) => option.to === 'binoshetLuftaFund')
  const ordinaryRoadHours = transitionInfo('binoshetKuvendi', { ...roadToWar, durationHours: undefined }).hours
  assert.equal(feast.durationHours, 9 * 24, 'Binoshët no longer gives the feast its exact nine days')
  assert.equal(roadToWar.durationHours, ordinaryRoadHours, 'Binoshët council-to-war road no longer matches the mapped journey')
  assert.equal(firstCampaignMonth.durationHours + remainingCampaign.durationHours, 3 * 30 * 24, 'Binoshët no longer makes its approximate several-month campaign visible')
  assert.equal(feast.durationHours + roadToWar.durationHours + firstCampaignMonth.durationHours + remainingCampaign.durationHours, 2384)

  const deadlineWait = STORY.binoshetKurora.options.find((option) => option.to === 'binoshetShpata')
  const preDeadlineHours = promisedRoute.slice(0, -1).reduce((sum, [from, to]) => {
    const option = STORY[from].options.find((candidate) => candidate.to === to)
    return sum + projectedClockForOption(stateAt(from, 0), option)
  }, 0)
  assert.equal(deadlineWait.durationHours, promisedInterval - preDeadlineHours, 'the residual wait no longer lands on the exact promised day')

  let promisedClock = promiseDeparture
  for (const [from, to] of promisedRoute) {
    const option = STORY[from].options.find((candidate) => candidate.to === to)
    assert.ok(option, `${from}->${to}: Binoshët promised route is broken`)
    promisedClock = projectedClockForOption(stateAt(from, promisedClock), option)
  }
  assert.equal(promisedClock - promiseDeparture, promisedInterval, 'Handa did not reach Bardhakuqja after exactly one year, one month and one day')

  const eveningWait = STORY.binoshetShpata.options.find((option) => option.to === 'binoshetNata')
  const swordClock = projectedClockForOption(stateAt('binoshetShpata', promisedClock), eveningWait)
  assert.equal(phaseAtClock(swordClock), 'night', 'Handa was put to bed before evening on the promised day')
  assert.ok(swordClock > promisedClock && swordClock - promisedClock < 24, 'the promised-day welcome did not reach that evening')

  const dawnWait = STORY.binoshetNata.options.find((option) => option.to === 'binoshetZjarri')
  const ordinaryRecognitionRide = transitionInfo('binoshetNata', { ...dawnWait, durationHours: undefined, time: undefined }).hours
  assert.equal(dawnWait.durationHours, ordinaryRecognitionRide, 'Zjerma\'s dawn ride ignored the physical bridge distance')
  const recognitionClock = projectedClockForOption(stateAt('binoshetNata', swordClock), dawnWait)
  assert.equal(phaseAtClock(recognitionClock), 'dawn', 'Zjerma reached the sword-and-fire recognition before the following dawn')
  assert.ok(recognitionClock > swordClock && recognitionClock - swordClock <= 12, 'the following-dawn recognition was not the next dawn')

  const motherJourney = STORY.binoshetZjarri.options.find((option) => option.to === 'binoshetTeNena')
  const motherArrival = projectedClockForOption(stateAt('binoshetZjarri', recognitionClock), motherJourney)
  const crownReturn = STORY.binoshetTeNena.options.find((option) => option.to === 'binoshetDyKurorat')
  const ordinaryReturnHours = transitionInfo('binoshetTeNena', { ...crownReturn, durationHours: undefined }).hours
  assert.equal(crownReturn.durationHours, 3 * 30 * 24 + ordinaryReturnHours, 'the three-month stay or return journey was collapsed')
  assert.equal(projectedClockForOption(stateAt('binoshetTeNena', motherArrival), crownReturn) - motherArrival, 3 * 30 * 24 + ordinaryReturnHours)
})

check('every multi-day or calendar jump has a sourced, semantically honest passage', () => {
  const validFidelity = new Set([
    'source-exact', 'source-exact-calendar-model', 'source-approximate', 'simulation-approximation',
    'map-derived', 'computed-deadline', 'calendar-exact', 'clock-exact',
  ])
  let covered = 0
  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if ((option.durationHours ?? 0) < 24 && !option.date) continue
      const passage = option.timePassage
      const edge = `${from}->${option.to}`
      assert.ok(passage, `${edge}: long/calendar jump has no player-facing time passage`)
      assert.ok(typeof passage.title === 'string' && passage.title.length > 0, `${edge}: passage has no title`)
      assert.ok(typeof passage.label === 'string' && passage.label.length > 0, `${edge}: passage has no semantic label`)
      assert.ok(Array.isArray(passage.segments) && passage.segments.length > 0, `${edge}: passage has no intervening moments`)
      assert.match(passage.source?.url || '', /^https:\/\//, `${edge}: passage has no linked source`)
      for (const segment of passage.segments) {
        assert.ok(segment.label && segment.detail, `${edge}: incomplete passage segment`)
        assert.ok(validFidelity.has(segment.fidelity), `${edge}: unknown fidelity '${segment.fidelity}'`)
      }
      if (Number.isFinite(option.durationHours)) {
        assert.ok(passage.segments.every((segment) => Number.isFinite(segment.hours) && segment.hours >= 0), `${edge}: timed segment has no mechanical hour allocation`)
        assert.equal(
          passage.segments.reduce((sum, segment) => sum + segment.hours, 0),
          option.durationHours,
          `${edge}: passage segments do not sum to durationHours`,
        )
      }
      covered++
    }
  }
  assert.ok(covered >= 18, `long/calendar passage coverage fell below the reviewed baseline: ${covered}`)

  const feast = STORY.binoshetDasma.options.find((option) => option.to === 'binoshetKuvendi')
  const firstCampaignMonth = STORY.binoshetLuftaFillon.options.find((option) => option.to === 'binoshetLuftaZgjat')
  const remainingCampaign = STORY.binoshetLuftaZgjat.options.find((option) => option.to === 'binoshetLuftaFund')
  assert.match(feast.timePassage.label, /nine complete days/i)
  assert.equal(feast.timePassage.segments.reduce((sum, segment) => sum + segment.hours, 0), 9 * 24)
  assert.match(firstCampaignMonth.timePassage.label, /several months/i)
  assert.match(remainingCampaign.timePassage.label, /several months/i)
  assert.doesNotMatch(`${firstCampaignMonth.timePassage.label} ${remainingCampaign.timePassage.label}`, /three months/i)
  assert.match(`${firstCampaignMonth.timePassage.estimateNote} ${remainingCampaign.timePassage.estimateNote}`, /witness/i)

  // “Three months” is exact in both witnesses; 90 dated days is our calendar
  // model. The badge must disclose both truths instead of calling the derived
  // dates source-exact.
  const exactMonthModels = [
    STORY.binoshetTeNena.options.find((option) => option.to === 'binoshetDyKurorat'),
    STORY.gjizarUdha.options.find((option) => option.to === 'gjizarPallat'),
  ]
  for (const option of exactMonthModels) {
    const monthSegment = option.timePassage.segments.find((segment) => /month/i.test(segment.label))
    assert.equal(monthSegment.fidelity, 'source-exact-calendar-model')
    assert.match(option.timePassage.estimateNote, /30 days|30-day/i)
  }

  const birdFlight = STORY.maroZogu.options.find((option) => option.to === 'maroKopshti')
  const birdStart = stateAt('maroZogu', 13)
  const birdPassage = timePassageForOption(birdStart, birdFlight)
  assert.ok(birdPassage.elapsedHours > birdFlight.durationHours, 'daylight wait after the three-day model was hidden')
  assert.equal(phaseAtClock(birdPassage.toClock), 'day')

  const festival = STORY.fshatiSheshi.options.find((option) => option.date === 'ditaVeres')
  const lateFestivalStart = stateAt('fshatiSheshi', 39)
  const festivalPassage = timePassageForOption(lateFestivalStart, festival)
  assert.equal(festivalPassage.toClock, projectedClockForOption(lateFestivalStart, festival))
  assert.ok(festivalPassage.elapsedHours > 300 * 24, 'next-year festival wait did not disclose its full elapsed span')

  const speechIds = phraseSenses(feast.text)
  const advanced = reducer(stateAt('binoshetDasma', 240, {
    discovered: Object.fromEntries(speechIds.map((id) => [id, true])),
    mana: Object.fromEntries(speechIds.map((id) => [id, 1])),
  }), {
    type: 'CHOOSE', option: feast, targetNode: STORY.binoshetKuvendi,
  })
  assert.equal(advanced.nodeId, 'binoshetKuvendi')
  assert.equal(advanced.timePassage?.fromClock, 240)
  assert.equal(advanced.timePassage?.toClock, 240 + feast.durationHours)
  assert.equal(reducer(advanced, {
    type: 'DISMISS_TIME_PASSAGE',
    passageId: advanced.timePassage.id,
    expectedStep: advanced.timePassage.step,
  }).timePassage, null)
})

check('dawn narration is reached at dawn', () => {
  for (const option of STORY.udheLugat.options.filter((candidate) => candidate.to === 'udheOra')) {
    const arrival = projectedClockForOption(stateAt('udheLugat', 20), option)
    assert.equal(phaseAtClock(arrival), 'dawn', 'the Ora scene claimed daybreak before dawn')
    assert.ok(arrival > 20)
  }
  for (const option of STORY.ngjitja2.options.filter((candidate) => candidate.to === 'ngjitja3')) {
    const arrival = projectedClockForOption(stateAt('ngjitja2', 20), option)
    assert.equal(phaseAtClock(arrival), 'dawn', 'the eagle ascent claimed the night ended before dawn')
    assert.ok(arrival > 20)
  }
  const millWait = STORY.xhindMulli.options.find((candidate) => candidate.to === 'xhindMulliFund')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('xhindMulli', 20), millWait)), 'dawn')
  const allNightSong = STORY.lahuta1.options.find((candidate) => candidate.to === 'lahutaFund')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('lahuta1', 20), allNightSong)), 'dawn')
  const flaxLitany = STORY.maroLitani2.options.find((candidate) => candidate.to === 'maroLitani3')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('maroLitani2', 20), flaxLitany)), 'dawn')
  const morningStar = STORY.uji.options.find((candidate) => candidate.to === 'prende1')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('uji', 5), morningStar)), 'dawn')
})

check('night narration is reached at night', () => {
  const serpentWedding = STORY.gjarperOrigin.options.find((option) => option.to === 'gjarperBurr1')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('gjarperOrigin', 5), serpentWedding)), 'night')
  for (const option of STORY.skender1.options.filter((candidate) => !candidate.confuser)) {
    assert.equal(phaseAtClock(projectedClockForOption(stateAt('skender1', 5), option)), 'night')
  }
  const coffeeTalk = STORY.kafeneja.options.find((option) => option.to === 'kafeneja2')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('kafeneja', 5), coffeeTalk)), 'night')
  const mountainWatch = STORY.tsNuse.options.find((option) => option.to === 'tsRoje')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('tsNuse', 5), mountainWatch)), 'night')
  const fates = STORY.djepi1.options.find((option) => option.to === 'djepi2')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('djepi1', 5), fates)), 'night')
  const revenant = STORY.udheNate.options.find((option) => option.to === 'udheLugat')
  assert.equal(phaseAtClock(projectedClockForOption(stateAt('udheNate', 5), revenant)), 'night')
})

check('social greetings follow the current civil period at every hour', () => {
  const greetingIds = ['mirmengjes', 'mirdita', 'mirembrema']
  const periods = ['morning', 'day', 'evening', 'night']
  const greetingForPeriod = {
    morning: 'mirmengjes',
    day: 'mirdita',
    evening: 'mirembrema',
    night: 'mirembrema',
  }
  const alwaysOpenScenes = ['tregtari', 'bujtina', 'sheruesi', 'udhetariHuaj']

  for (let clock = 0; clock < 24; clock++) {
    const period = greetingPeriodAtClock(clock)
    const civilHour = civilHourAtClock(clock)
    const expectedGreeting = greetingForPeriod[period]

    const activePeriods = periods.filter((candidate) =>
      hasCond(stateAt('tregtari', clock), `greeting:${candidate}`),
    )
    assert.deepEqual(activePeriods, [period], `${civilHour}:00 exposes contradictory greeting periods`)

    for (const nodeId of alwaysOpenScenes) {
      const state = stateAt(nodeId, clock)
      const spoken = STORY[nodeId].text
        .filter((entry) => typeof entry?.cond === 'string' && entry.cond.startsWith('greeting:') && hasCond(state, entry.cond))
        .map((entry) => entry.line.find((token) => greetingIds.includes(token.id))?.id)
        .filter(Boolean)
      assert.deepEqual(spoken, [expectedGreeting], `${nodeId} at ${civilHour}:00 speaks a contradictory greeting`)

      const choices = STORY[nodeId].options.filter((option) =>
        option.contextGreeting && hasRequiredItem(state, option),
      )
      assert.equal(choices.length, 4, `${nodeId} at ${civilHour}:00 does not expose four greeting choices`)
      const correct = choices.filter((option) => !option.confuser)
      assert.equal(correct.length, 1, `${nodeId} at ${civilHour}:00 does not expose exactly one right greeting`)
      assert.equal(correct[0].contextGreeting.period, period, `${nodeId} at ${civilHour}:00 accepts the wrong civil period`)
      assert.equal(correct[0].contextGreeting.response, expectedGreeting, `${nodeId} at ${civilHour}:00 accepts a contradictory greeting`)
    }

    // The spring conversation is deliberately unavailable at night, but every
    // reachable civil period follows the same state contract as the all-day
    // social scenes above.
    if (period !== 'night') {
      const state = stateAt('kroiGrate2', clock)
      const correct = STORY.kroiGrate2.options.filter((option) =>
        option.contextGreeting && !option.confuser && hasRequiredItem(state, option),
      )
      assert.equal(correct.length, 1, `kroiGrate2 at ${civilHour}:00 does not expose exactly one right greeting`)
      assert.equal(correct[0].contextGreeting.period, period, `kroiGrate2 at ${civilHour}:00 accepts the wrong civil period`)
      assert.equal(correct[0].contextGreeting.response, expectedGreeting, `kroiGrate2 at ${civilHour}:00 accepts a contradictory greeting`)
    }
  }
})

check('embodiment starts after declared backstory spans', () => {
  for (const nodeId of ['aliBajr1', 'halilGarria1', 'osmaniBurg', 'balozMotra', 'uraVellezerit', 'uraArtes1']) {
    const elapsed = STORY[nodeId].text.find((line) => Array.isArray(line) && line.some((token) => token.al === 'kanë kaluar'))
    assert.ok(elapsed, `${nodeId}: elapsed backstory reads as an unadvanced active wait`)
  }
})

check('arrival-sensitive night gates close before dawn', () => {
  const option = { text: [], to: 'start', requires: 'night' }
  assert.equal(hasRequiredItem(stateAt('start', 22), option), true)
  assert.equal(hasRequiredItem(stateAt('start', 23), option), false)
})

check('festival waits satisfy date and phase together', () => {
  // Clock 39 is the night of the opening Dita e Veres. A request for that
  // festival by day must move to the next valid annual observance, not dawn
  // after the feast has already ended.
  const clock = projectedClockForOption(stateAt('fshatiSheshi', 39), {
    text: [],
    to: 'veraDite1',
    date: 'ditaVeres',
    time: 'day',
  })
  assert.equal(festivalIdsAtClock(clock).includes('ditaVeres'), true)
  assert.equal(phaseAtClock(clock), 'day')
  assert.ok(clock > 39)

  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.date) assert.ok(FESTIVAL_IDS.includes(option.date), `${from}->${option.to}: unknown festival ${option.date}`)
      if (option.time) assert.ok(TIME_PHASES.includes(option.time), `${from}->${option.to}: unknown phase ${option.time}`)
      if (option.durationHours != null) {
        assert.ok(Number.isSafeInteger(option.durationHours) && option.durationHours >= 0, `${from}->${option.to}: invalid duration`)
      }
      if (option.atHour != null) assert.ok(Number.isInteger(option.atHour) && option.atHour >= 0 && option.atHour <= 23, `${from}->${option.to}: invalid civil hour`)
      assert.equal(optionTimingIsValid(option), true, `${from}->${option.to}: contradictory or malformed timing`)
      if (!option.date) continue
      for (const start of [0, 39, 365 * 24 + 23]) {
        const arrival = projectedClockForOption(stateAt(from, start), option)
        assert.ok(festivalIdsAtClock(arrival).includes(option.date), `${from}->${option.to}: missed ${option.date}`)
        if (option.time) assert.equal(phaseAtClock(arrival), option.time, `${from}->${option.to}: wrong arrival phase`)
      }
    }
  }
})

check('folk-calendar observances use the right civil and Orthodox dates', () => {
  const openingFestival = calendarAtClock(18)
  assert.deepEqual([openingFestival.year, openingFestival.month, openingFestival.day, openingFestival.hour], [2026, 3, 14, 0])
  assert.ok(openingFestival.festivals.includes('ditaVeres'))

  // Rusicat is Orthodox Mid-Pentecost (the 25th day counting Pascha), not
  // Western Pentecost. Orthodox Pascha was 12 Apr 2026, so this is Wed 6 May.
  const rusicaClock = advanceToFestival(0, 'nenaDiellit', 'day')
  const rusica = calendarAtClock(rusicaClock)
  assert.deepEqual([rusica.year, rusica.month, rusica.day, rusica.weekday], [2026, 5, 6, 'wednesday'])

  const shengjergj = calendarAtClock(advanceToFestival(0, 'shengjergj', 'day'))
  assert.deepEqual([shengjergj.month, shengjergj.day], [5, 6])
  const tomorri = calendarAtClock(advanceToFestival(0, 'tomorriPilgrimage', 'day'))
  assert.deepEqual([tomorri.month, tomorri.day], [8, 20])
  assert.ok(tomorri.festivals.includes('tomorriPilgrimage'))
  assert.equal(advanceToFestival(123, 'not-a-festival', 'day'), 123)
  assert.equal(advanceToFestival(123, 'ditaVeres', 'not-a-phase'), 123)

  // A request made after the target phase on the feast must advance to the
  // next annual observance, never spill into a non-festival morning.
  const feastNight = advanceToFestival(0, 'ditaVeres', 'night', 23)
  const nextFeastDay = advanceToFestival(feastNight, 'ditaVeres', 'day')
  assert.ok(nextFeastDay - feastNight > 300 * 24)
  assert.ok(festivalIdsAtClock(nextFeastDay).includes('ditaVeres'))
})

check('calendar and weather are deterministic', () => {
  const facts = { rainReturned: { atClock: 100, source: 'audit' } }
  assert.deepEqual(environmentSnapshot(stateAt('start', 106, { worldFacts: facts })), environmentSnapshot(stateAt('start', 106, { worldFacts: facts })))
  assert.equal(weatherAtClock(106, facts, 'forest'), 'rain')
  assert.equal(weatherAtClock(106, facts, 'underworld'), 'clear')

  // Hail-averted records one saved storm, not a permanent end to weather.
  let storm = null
  for (let clock = 0; clock < 4 * 366 * 24; clock += 24) {
    if (weatherAtClock(clock, {}, 'village') === 'storm') { storm = clock; break }
  }
  assert.notEqual(storm, null)
  assert.equal(weatherAtClock(storm, { hailAverted: { atClock: storm, source: 'audit' } }, 'village'), 'cloud')
  let laterStorm = null
  for (let clock = storm + 24; clock < storm + 4 * 366 * 24; clock += 24) {
    if (weatherAtClock(clock, {}, 'village') === 'storm') { laterStorm = clock; break }
  }
  assert.notEqual(laterStorm, null)
  assert.equal(weatherAtClock(laterStorm, { hailAverted: { atClock: storm, source: 'audit' } }, 'village'), 'storm')

  // Surface weather must genuinely evolve with the calendar rather than only
  // printing a changing date beside a frozen condition. Conversely, a save in
  // the world below must never acquire surface rain or snow.
  for (const region of REGIONS) {
    const year = new Set()
    for (let day = 0; day < 366; day++) {
      const midnight = 18 + day * 24
      const opening = weatherAtClock(midnight, {}, region.key)
      assert.equal(weatherAtClock(midnight + 23, {}, region.key), opening, `${region.key}: unsourced weather changed within one civil day`)
      year.add(opening)
    }
    if (region.key === 'underworld') assert.deepEqual([...year], ['clear'])
    else assert.ok(year.size >= 4, `${region.key}: only ${year.size} weather states occur in a full year`)
  }
})

check('authored scene weather overrides only with canonical weather ids', () => {
  const state = stateAt('start', 106)
  assert.equal(weatherOf(state, { sceneWeather: 'storm' }), 'storm')
  assert.equal(weatherOf(state, { sceneWeather: 'snow' }), 'snow')
  assert.equal(weatherOf(state, { sceneWeather: 'invented' }), weatherAtClock(106, {}, 'village'))
  assert.equal(weatherOf(state, { sceneWeather: null }), weatherAtClock(106, {}, 'village'))
  for (const [id, node] of Object.entries(STORY)) {
    if (node.sceneWeather == null) continue
    assert.ok(['clear', 'cloud', 'rain', 'storm', 'snow'].includes(node.sceneWeather), `${id}: invalid sceneWeather`)
    assert.equal(weatherOf(stateAt(id, 106)), node.sceneWeather, `${id}: authored scene weather was ignored`)
  }
})

check('ending effects are attributable and idempotent', () => {
  assert.ok(Object.keys(WORLD_EFFECTS_BY_ENDING).length >= 12)
  const first = applyWorldEffects({}, ['riverRestored'], 90, 'audit-ending')
  const again = applyWorldEffects(first, ['riverRestored'], 140, 'other-ending')
  assert.strictEqual(again, first)
  assert.deepEqual(first.riverRestored, { atClock: 90, source: 'audit-ending' })

  const binoshet = applyWorldEffects({}, WORLD_EFFECTS_BY_ENDING.binoshetDyKurorat, 100, 'binoshetDyKurorat')
  assert.deepEqual(worldEffectsForEnding('binoshetFund'), WORLD_EFFECTS_BY_ENDING.binoshetDyKurorat, 'oldest Binoshët save no longer receives the completed arc effects')
  assert.deepEqual(worldEffectsForEnding('binoshetShpata'), WORLD_EFFECTS_BY_ENDING.binoshetDyKurorat, 'former Binoshët ending save no longer receives the completed arc effects')
  assert.ok(binoshet.binoshetKulshedraDefeated && binoshet.binoshetRiverRestored)
  assert.ok(binoshet.binoshetBardhakuqjaFreed && binoshet.binoshetKingdomRestored)
  assert.equal(hydrologyFromFacts(binoshet).riversRestored, false, "Binoshët's tale-city changed the main river")
  assert.equal(binoshet.kulshedraDefeated, undefined, "Binoshët's Kulshedra overwrote the main quest monster")
})

check('alternate endings cannot leave contradictory world memories', () => {
  for (const [id, conflicts] of Object.entries(WORLD_FACT_INCOMPATIBLE)) {
    for (const other of conflicts) {
      assert.ok(WORLD_FACT_INCOMPATIBLE[other]?.includes(id), `${id}/${other}: conflict is not symmetric`)
    }
  }
  for (const [ending, effects] of Object.entries(WORLD_EFFECTS_BY_ENDING)) {
    for (const id of effects) {
      assert.equal(
        effects.some((other) => WORLD_FACT_INCOMPATIBLE[id]?.includes(other)),
        false,
        `${ending}: one ending applies mutually exclusive facts together`,
      )
    }
  }

  const preserved = applyWorldEffects({}, ['prespaTownPreserved'], 40, 'prespaLiri')
  const flooded = applyWorldEffects(preserved, ['prespaFlooded', 'prespaLakeFormed'], 80, 'prespaFund')
  assert.equal(flooded.prespaTownPreserved, undefined)
  assert.ok(flooded.prespaFlooded && flooded.prespaLakeFormed)

  const preservedAgain = applyWorldEffects(flooded, ['prespaTownPreserved'], 120, 'prespaLiri')
  assert.ok(preservedAgain.prespaTownPreserved)
  assert.equal(preservedAgain.prespaFlooded, undefined)
  assert.equal(preservedAgain.prespaLakeFormed, undefined)

  const repaired = reconcileWorldFacts({
    prespaTownPreserved: { atClock: 40, source: 'old-save' },
    prespaFlooded: { atClock: 80, source: 'old-save' },
    prespaLakeFormed: { atClock: 80, source: 'old-save' },
  })
  assert.equal(repaired.prespaTownPreserved, undefined)
  assert.ok(repaired.prespaFlooded && repaired.prespaLakeFormed)
})

check('every authored world effect has a specific ambient consumer', () => {
  const authored = [...new Set(Object.values(WORLD_EFFECTS_BY_ENDING).flat())].sort()
  const presented = Object.keys(WORLD_FACT_PRESENTATION).sort()
  assert.deepEqual(presented, authored)
  const validRegions = new Set(REGIONS.map((region) => region.key))
  const texts = new Set()
  for (const id of authored) {
    const presentation = WORLD_FACT_PRESENTATION[id]
    assert.ok(presentation.text && presentation.icon, `${id}: missing visible memory text/icon`)
    assert.ok(Array.isArray(presentation.regions) && presentation.regions.length > 0, `${id}: no affected region`)
    assert.ok(presentation.regions.every((region) => validRegions.has(region)), `${id}: invalid region`)
    assert.ok(!texts.has(presentation.text), `${id}: duplicate generic memory text`)
    texts.add(presentation.text)
  }
  const facts = Object.fromEntries(authored.map((id, index) => [id, { atClock: index, source: 'audit' }]))
  const memories = worldMemoriesFromFacts(facts, 'village')
  assert.deepEqual(new Set(memories.map((memory) => memory.id)), new Set(authored))
  assert.ok(memories.some((memory) => memory.regional))

  // Guard the final integration point as well as the data mapping: all mapped
  // memories must actually reach the live story UI and its expandable ledger.
  const component = readFileSync(fileURLToPath(new URL('../src/components/WorldContext.jsx', import.meta.url)), 'utf8')
  assert.match(component, /memories\.find/)
  assert.match(component, /memories\.map/)
})

check('lasting outcomes survive return, continue, and hard restart', () => {
  const facts = { riverRestored: { atClock: 90, source: 'audit-ending' } }
  const endingState = stateAt('binoshetFund', 90, { worldFacts: facts, ended: 'good' })
  const returned = reducer(endingState, { type: 'RETURN_TO_WORLD' }).worldFacts
  assert.deepEqual(returned.riverRestored, facts.riverRestored)
  assert.ok(returned.binoshetKulshedraDefeated, 'migration-safe return did not apply the ending effect')
  assert.ok(returned.binoshetRiverRestored, 'migration-safe return did not preserve the tale-city outcome')
  assert.deepEqual(reducer(endingState, { type: 'CONTINUE' }).worldFacts.riverRestored, facts.riverRestored)
  assert.deepEqual(reducer(endingState, { type: 'RESET' }).worldFacts.riverRestored, facts.riverRestored)
})

check('old and partial saves are normalized before play', () => {
  const fresh = stateAt('start', START_CLOCK, { earned: { priorEnding: true }, debug: true })
  const normalized = normalizeSavedState({
    nodeId: 'start',
    clock: 'broken',
    turn: -4,
    hearts: 99,
    inventory: null,
    visited: [],
    worldFacts: 'broken',
    trail: ['lendina', 'missing-node', 'lendina', 'start'],
    fireLit: Infinity,
    view: 'unknown',
  }, fresh)
  assert.deepEqual(normalized.inventory, {})
  assert.deepEqual(normalized.visited, {})
  assert.deepEqual(normalized.worldFacts, {})
  assert.deepEqual(normalized.earned, { priorEnding: true })
  assert.deepEqual(normalized.trail, ['lendina'])
  assert.equal(normalized.clock, START_CLOCK)
  assert.equal(normalized.turn, 1)
  assert.equal(normalized.hearts, 3)
  assert.deepEqual(normalized.fixtures, {})
  assert.equal(normalized.view, 'story')

  const normalAtlasSave = normalizeSavedState(
    { nodeId: 'start', view: 'map', debug: false },
    stateAt('start'),
  )
  assert.equal(normalAtlasSave.view, 'story', 'a normal-mode save resumed on the debug atlas')
  const debugAtlasSave = normalizeSavedState(
    { nodeId: 'start', view: 'map', debug: true },
    stateAt('start'),
  )
  assert.equal(debugAtlasSave.view, 'map', 'a debug save lost its atlas location')
  const normalDebugSave = normalizeSavedState(
    { nodeId: 'start', view: 'debug', debug: false },
    stateAt('start'),
  )
  assert.equal(normalDebugSave.view, 'story', 'a normal-mode save resumed on diagnostics')
  const debugScreenSave = normalizeSavedState(
    { nodeId: 'start', view: 'debug', debug: true },
    stateAt('start'),
  )
  assert.equal(debugScreenSave.view, 'debug', 'a debug save lost its diagnostic screen')
})

check('damage cannot push hearts below zero', () => {
  const state = stateAt('maroZogu', 100, { hearts: 0 })
  const option = { text: [], to: 'maroZogu', hearts: -1 }
  assert.equal(reducer(state, { type: 'CHOOSE', option, targetNode: STORY.maroZogu }).hearts, 0)
})

check('self-loops cannot farm permanent state without a cost or exit', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.confuser || option.to !== nodeId) continue
      const effects = optionEffectsOf(option)
      const netItems = new Map()
      let netLek = 0
      let damagesHearts = false
      for (const effect of effects) {
        if (effect?.type === 'inventory') {
          netItems.set(effect.id, (netItems.get(effect.id) || 0) + effect.delta)
        } else if (effect?.type === 'resource' && effect.id === 'lek' && effect.set == null) {
          netLek += effect.delta
        } else if (effect?.type === 'resource' && effect.id === 'hearts' && (effect.delta || 0) < 0) {
          damagesHearts = true
        }
      }
      const hasFiniteCost = [...netItems.values()].some((delta) => delta < 0) || netLek < 0
      const additiveGain = [...netItems.values()].some((delta) => delta > 0) || netLek > 0
      const bounded = Boolean(option.unless || interactionSpecOf(option))
      if (additiveGain && !hasFiniteCost) {
        assert.ok(bounded, `${nodeId}: repeatable self-loop has an unbounded inventory or lek gain`)
      }
      if (damagesHearts) {
        assert.ok(bounded, `${nodeId}: damage self-loop can repeat below the authored consequence`)
      }
    }
  }
  const waitForNight = STORY.tsNuse.options.find((option) => option.to === 'tsNuse' && option.time === 'night')
  assert.equal(waitForNight.unless, 'night')
})

check('distant prose responds to phase and weather', () => {
  const lakeSightline = ['larg', 'liqen']
  assert.equal(isDistantLineVisible('lumi', lakeSightline, { phase: 'day', weather: 'clear', season: 'spring' }), true)
  assert.equal(isDistantLineVisible('lumi', lakeSightline, { phase: 'day', weather: 'storm', season: 'spring' }), false)
  assert.equal(isDistantLineVisible('lumi', lakeSightline, { phase: 'night', weather: 'clear', season: 'spring' }), false)
  // A nearby named light remains perceptible after dark even when a distant,
  // unlit landform does not.
  assert.equal(isDistantLineVisible('start', ['larg', 'fshat', 'drite', 'vogel'], { phase: 'night', weather: 'clear', season: 'spring' }), true)
  const underground = sightlinesFrom('bota1', { phase: 'day', weather: 'clear', season: 'spring' })
  assert.equal(underground.some((sightline) => sightline.visible && sightline.key !== 'underworld'), false)
})

const failures = checks.filter((entry) => !entry.ok)
for (const entry of checks) console.log(`${entry.ok ? '✅' : '❌'} ${entry.name}${entry.error ? ` — ${entry.error}` : ''}`)
console.log(`\n${failures.length ? `❌ ${failures.length} state check(s) failed` : `✅ all ${checks.length} runtime world-state checks pass`}`)
process.exitCode = failures.length ? 1 : 0
