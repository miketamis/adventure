// Release gate for reusable overworld quests and the migrated Elira errand.
import assert from 'node:assert/strict'
import { STORY, visibleLines } from '../src/game/content.js'
import { albanianTextOf } from '../src/game/language.js'
import {
  ELIRA_BREAD_SALT_QUEST_ID,
  QUESTS,
  QUEST_STATE_VERSION,
  applyQuestAction,
  normalizeQuestLedger,
  offerQuests,
  questActionAvailability,
  questActionEffectsOf,
  questDefinitionIssues,
  questStatusOf,
} from '../src/game/quests.js'
import {
  START_CLOCK,
  canChoose,
  hasCond,
  hasRequiredItem,
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
} from '../src/game/gameState.js'
import { optionEffectsOf } from '../src/game/stateMechanics.js'

const Q = ELIRA_BREAD_SALT_QUEST_ID
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

const offeredLedger = (clock = START_CLOCK) => offerQuests({}, [Q], clock, 'audit:offer')
const stateAt = (nodeId, extra = {}) => ({
  ...newRun(),
  nodeId,
  clock: START_CLOCK,
  flags: { eliraOpeningResolved: true },
  quests: offeredLedger(),
  ...extra,
})
const teachOption = (state, option) => {
  const ids = phraseSenses(option.text)
  return {
    ...state,
    discovered: { ...state.discovered, ...Object.fromEntries(ids.map((id) => [id, true])) },
    mana: { ...state.mana, ...Object.fromEntries(ids.map((id) => [id, 20])) },
  }
}
const choose = (state, option) => reducer(teachOption(state, option), {
  type: 'CHOOSE',
  option,
  targetNode: STORY[option.to],
  fromNodeId: state.nodeId,
  fromTurn: state.turn,
})
const actionOption = (nodeId, action) => STORY[nodeId].options.find(
  (option) => option.questAction?.id === Q && option.questAction.action === action,
)
const activeEntry = Object.freeze({
  status: 'active', offeredAtClock: 1, acceptedAtClock: 2,
  updatedAtClock: 2, acceptanceCount: 1, source: 'audit:accept',
})
const activeState = (inventory = {}, extra = {}) => stateAt('eliraBanore', {
  inventory,
  quests: { [Q]: { ...activeEntry } },
  ...extra,
})

check('quest definitions have stable ids and valid canonical predicates', () => {
  assert.deepEqual(questDefinitionIssues(), [])
  assert.equal(QUESTS[Q].id, Q)
  assert.equal(QUESTS[Q].rewardTiming, 'advance-on-acceptance')
  assert.equal(QUESTS[Q].itemPolicy, 'consume-on-turn-in')
  assert.equal(QUESTS[Q].abandonPolicy, 'retain-items-and-close')
})

check('all authored quest offers and actions reference the production registry', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const questId of node.questOffers || []) {
      assert.ok(QUESTS[questId], `${nodeId}: unknown offered quest ${questId}`)
    }
    for (const [optionIndex, option] of node.options.entries()) {
      if (!option.questAction) continue
      assert.ok(QUESTS[option.questAction.id], `${nodeId}.options[${optionIndex}]: unknown quest`)
      assert.notEqual(questActionAvailability(stateAt(nodeId), option).reason, 'invalid-action',
        `${nodeId}.options[${optionIndex}]: invalid quest action`)
    }
  }
})

check('the concurrent ledger and lifecycle generalize to a future registered quest', () => {
  const future = Object.freeze({
    id: 'audit-future-quest', issuerNpcId: 'audit-npc', debugTitle: 'Audit quest',
    objectives: Object.freeze([
      Object.freeze({ id: 'water', predicate: Object.freeze({ type: 'inventory', id: 'uje', atLeast: 1 }) }),
    ]),
    acceptEffects: Object.freeze([]), turnInEffects: Object.freeze([]),
    rewardTiming: 'no-reward', itemPolicy: 'retain-on-turn-in',
    declinePolicy: 'reoffer-on-next-conversation', abandonPolicy: 'retain-items-and-close',
  })
  const registry = Object.freeze({ ...QUESTS, [future.id]: future })
  assert.deepEqual(questDefinitionIssues(registry), [])
  let ledger = offerQuests({}, [Q, future.id], 4, 'audit:two-offers', registry)
  assert.deepEqual(Object.keys(ledger).sort(), [Q, future.id].sort())
  const futureOption = { questAction: { id: future.id, action: 'accept' } }
  const availability = questActionAvailability({ quests: ledger, inventory: {} }, futureOption, registry)
  ledger = applyQuestAction(ledger, availability, 5, 'audit:future-accept')
  assert.equal(ledger[future.id].status, 'active')
  assert.equal(ledger[Q].status, 'offered', 'one quest transition overwrote another quest')
  assert.deepEqual(Object.keys(normalizeQuestLedger(ledger, 5, {}, registry)).sort(), [Q, future.id].sort())
})

check('every Elira acceptance is one atomic 800-lek activation and exits to free roam', () => {
  for (const nodeId of ['eliraBreg', 'eliraEmriBreg', 'eliraShesh', 'eliraEmriShesh']) {
    const option = actionOption(nodeId, 'accept')
    assert.ok(option, `${nodeId}: no quest acceptance`)
    assert.equal(option.to, 'fshatiSheshi', `${nodeId}: acceptance did not land in ordinary free roam`)
    assert.equal(option.lek, undefined, `${nodeId}: reward leaked through the legacy scalar channel`)
    assert.doesNotMatch(albanianTextOf(option.text), /lek|tetëqind|800/i,
      `${nodeId}: the choice previews its advance`)
    if (nodeId.endsWith('Breg')) assert.match(albanianTextOf(option.text), /vij me ty në fshat/)
    const before = stateAt(nodeId, { inventory: { lek: 75 } })
    const after = choose(before, option)
    assert.equal(after.nodeId, 'fshatiSheshi')
    assert.equal(after.inventory.lek, 875)
    assert.equal(after.quests[Q].acceptanceCount, 1)
    assert.equal(questStatusOf(after, Q), 'active')
    const duplicate = reducer(after, {
      type: 'CHOOSE', option, targetNode: STORY[option.to],
      fromNodeId: before.nodeId, fromTurn: before.turn,
    })
    assert.equal(duplicate, after, `${nodeId}: a stale duplicate acceptance mutated state`)
    assert.equal(duplicate.inventory.lek, 875)
  }
})

check('pre-acquired items satisfy objectives and readiness disappears if either is consumed', () => {
  const accept = actionOption('eliraShesh', 'accept')
  const accepted = choose(stateAt('eliraShesh', { inventory: { buke: 1, kripe: 1 } }), accept)
  assert.equal(questStatusOf(accepted, Q), 'objectives-ready')
  assert.equal(hasCond(accepted, `quest:${Q}:objectives-ready`), true)
  const spent = { ...accepted, inventory: { ...accepted.inventory, buke: 0 } }
  assert.equal(questStatusOf(spent, Q), 'active')
  assert.equal(hasCond(spent, `quest:${Q}:objectives-ready`), false)
})

check('partial returns give the matching contextual reminder and always permit leaving', () => {
  const cases = [
    [{}, /still waiting for the bread and salt/i],
    [{ buke: 1 }, /still need salt/i],
    [{ kripe: 1 }, /still need bread/i],
  ]
  for (const [inventory, expected] of cases) {
    const state = activeState(inventory)
    const readings = visibleLines(STORY.eliraBanore, (id) => hasCond(state, id))
      .map((line) => line.reading || '')
    assert.ok(readings.some((reading) => expected.test(reading)), `${JSON.stringify(inventory)}: wrong reminder`)
    assert.ok(STORY.eliraBanore.options.some((option) => option.to === 'fshatiSheshi' && hasRequiredItem(state, option)),
      `${JSON.stringify(inventory)}: reminder traps the player`)
    assert.equal(hasRequiredItem(state, actionOption('eliraBanore', 'turn-in')), false)
  }
})

check('turn-in consumes exact items, completes once, and pays no second reward', () => {
  const option = actionOption('eliraBanore', 'turn-in')
  const before = activeState({ buke: 2, kripe: 3, lek: 800 })
  assert.equal(canChoose(teachOption(before, option), option), true)
  const after = choose(before, option)
  assert.equal(after.nodeId, 'sofraMikut')
  assert.equal(after.inventory.buke, 1)
  assert.equal(after.inventory.kripe, 2)
  assert.equal(after.inventory.lek, 800)
  assert.equal(questStatusOf(after, Q), 'completed')
  assert.equal(after.quests[Q].completedAtClock, after.quests[Q].turnedInAtClock)
  assert.equal(questActionEffectsOf(option).some((effect) => effect.type === 'resource'), false)
  const duplicate = reducer(after, { type: 'CHOOSE', option, targetNode: STORY[option.to] })
  assert.equal(duplicate, after)
  assert.equal(duplicate.inventory.buke, 1)
  assert.equal(duplicate.inventory.kripe, 2)
})

check('decline can be reoffered; abandonment retains items and closes without another advance', () => {
  const decline = actionOption('eliraShesh', 'decline')
  const declined = choose(stateAt('eliraShesh'), decline)
  assert.equal(questStatusOf(declined, Q), 'declined')
  const reoffered = offerQuests(declined.quests, [Q], declined.clock, 'arrive:eliraBanore')
  assert.equal(reoffered[Q].status, 'offered')

  const abandon = actionOption('eliraBanore', 'abandon')
  const before = activeState({ buke: 1, lek: 800 })
  const abandoned = choose(before, abandon)
  assert.equal(questStatusOf(abandoned, Q), 'abandoned')
  assert.deepEqual(abandoned.inventory, before.inventory)
  const closed = offerQuests(abandoned.quests, [Q], abandoned.clock, 'arrive:eliraBanore')
  assert.equal(closed[Q].status, 'abandoned')
  assert.equal(closed[Q].acceptanceCount, 1)
})

check('save, legacy migration, and reset preserve one canonical quest truth', () => {
  const ready = activeState({ buke: 1, kripe: 1 })
  const restored = normalizeSavedState(JSON.parse(JSON.stringify(ready)), newRun())
  assert.equal(restored.questStateVersion, QUEST_STATE_VERSION)
  assert.equal(questStatusOf(restored, Q), 'objectives-ready')

  const legacy = normalizeSavedState({
    ...newRun(), flags: { porosiaMikut: true, sofraGati: true }, inventory: {},
  }, newRun())
  assert.equal(questStatusOf(legacy, Q), 'active')
  assert.equal(legacy.inventory.buke, undefined, 'legacy readiness invented bread')
  assert.equal(legacy.inventory.kripe, undefined, 'legacy readiness invented salt')
  assert.equal(legacy.flags.porosiaMikut, undefined)
  assert.equal(legacy.flags.sofraGati, undefined)

  const reset = reducer(restored, { type: 'RESET' })
  assert.deepEqual(reset.quests, {}, 'new run did not reset per-run quest state')
  assert.equal(reset.questStateVersion, QUEST_STATE_VERSION)
})

check('bread and salt come from canonical inventory sources, never readiness flags', () => {
  const grants = (nodeId, itemId) => STORY[nodeId].options.filter((option) =>
    optionEffectsOf(option).some((effect) => effect?.type === 'inventory' && effect.id === itemId && effect.delta > 0))
  assert.ok(grants('plaka', 'buke').length > 0, 'the old woman does not grant real bread')
  assert.ok(grants('oda1', 'kripe').length > 0, 'the oda does not grant real salt')
  assert.ok(grants('tregtari', 'buke').length > 0, 'the trader does not separately sell bread')
  assert.ok(grants('tregtari', 'kripe').length > 0, 'the trader does not separately sell salt')
  assert.ok(grants('pazariFshatit', 'buke').length > 0 && grants('pazariFshatit', 'kripe').length > 0,
    'the village-market purchase still grants a shadow readiness flag')
  const authored = JSON.stringify(STORY)
  assert.doesNotMatch(authored, /porosiaMikut|sofraGati/)
})

check('guest-room follow-through respects learned Elira identity', () => {
  const completed = { ...activeState(), quests: { [Q]: { ...activeEntry, status: 'completed' } } }
  for (const nodeId of ['sofraMikut', 'sofraMikut2']) {
    const unknown = visibleLines(STORY[nodeId], (id) => hasCond(completed, id)).map((line) => line.reading || '')
    const knownState = {
      ...completed,
      knowledge: { 'npcName:elira': { atClock: 1, source: 'audit' } },
    }
    const known = visibleLines(STORY[nodeId], (id) => hasCond(knownState, id)).map((line) => line.reading || '')
    assert.ok(unknown.some((reading) => /the woman/i.test(reading)), `${nodeId}: no unknown-identity narration`)
    assert.ok(known.some((reading) => /Elira/.test(reading)), `${nodeId}: learned name not used`)
    assert.equal(known.some((reading) => /^The woman/i.test(reading)), false,
      `${nodeId}: known Elira reverted to a generic speaker tag`)
  }
})

check('registry effects share the atomic authored-effect transaction in a deterministic order', () => {
  const accept = actionOption('eliraShesh', 'accept')
  assert.deepEqual(optionEffectsOf(accept).map(({ type, id, delta }) => ({ type, id, delta })), [
    { type: 'resource', id: 'lek', delta: 800 },
    { type: 'flag', id: 'eliraOpeningResolved', delta: undefined },
  ])
  const turnIn = actionOption('eliraBanore', 'turn-in')
  assert.deepEqual(optionEffectsOf(turnIn).map(({ type, id, delta }) => ({ type, id, delta })), [
    { type: 'inventory', id: 'buke', delta: -1 },
    { type: 'inventory', id: 'kripe', delta: -1 },
  ])
})

const failed = checks.filter((result) => !result.ok)
if (failed.length > 0) {
  console.error(`\n${failed.length} quest audit check(s) failed.`)
  process.exit(1)
}
console.log(`\nQuest audit passed (${checks.length} contracts).`)
