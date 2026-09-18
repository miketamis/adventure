// World continuity through real choices. Only vocabulary/practice resources
// and ordinary carried goods are supplied; no branch, NPC or job proof is set.
import assert from 'node:assert/strict'
import { STORY, lineOf } from '../src/game/content.js'
import {
  canChoose, currentStoryState, durationHoursOf, hasCond, isOptionRevealed,
  newRun, normalizeSavedState, npcNodeOf, reducer, storyScenePresentationForState,
  timeOfDay, trainablePhraseSenses, weatherOf,
} from '../src/game/gameState.js'
import { albanianTextOf } from '../src/game/language.js'
import { canonicalPlayerActionId } from '../src/game/playerActionRuntime.js'
import { NPCS } from '../src/game/npcs.js'
import { resolveRevealLine } from '../src/game/revealResolver.js'
import { ORDINARY_WORK_WAGE, ROAD_TICKET_PRICE } from '../src/game/economy.js'
import { initialNpcTravelWindow } from '../src/game/npcRouteTiming.js'
import { loadNpcAppearancePartitions } from './lib/loadnpcappearances.mjs'

await loadNpcAppearancePartitions()
const reload = (state) => normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
const prose = (state) => storyScenePresentationForState(state).normalEntries
  .map(({ line }) => albanianTextOf(line)).join('\n')
const optionTo = (state, to) => STORY[state.nodeId].options.find((option) => !option.confuser && option.to === to)
const ready = (state, option) => {
  const source = option.reveal ? resolveRevealLine(STORY[state.nodeId].text.map(lineOf), option).line : []
  const ids = new Set([...trainablePhraseSenses(option.text), ...trainablePhraseSenses(source || [])])
  const discovered = { ...state.discovered }, mana = { ...state.mana }, practiced = { ...state.practiced }
  for (const id of ids) {
    discovered[id] = true
    mana[id] = Math.max(30, mana[id] || 0)
    practiced[id] = Math.max(mana[id], practiced[id] || 0)
  }
  return { ...state, discovered, mana, practiced }
}
let choices = 0
const take = (input, option) => {
  assert.ok(option, `${input.nodeId}: missing canonical option`)
  const state = ready(input, option)
  const id = canonicalPlayerActionId(state.nodeId, option)
  assert.ok(isOptionRevealed(currentStoryState(state), option), `${id}: its exact source is absent`)
  assert.ok(canChoose(currentStoryState(state), option), `${id}: canonical action is unavailable at ${state.clock}`)
  const next = reducer(state, { type: 'CHOOSE', option, targetNode: STORY[option.to],
    fromNodeId: state.nodeId, fromTurn: state.turn })
  assert.notEqual(next, state, `${id}: reducer rejected the walk`)
  assert.equal(next.nodeId, option.to)
  assert.equal(next.actionSpeech?.al, albanianTextOf(option.text), `${id}: accepted phrase lost its playback request`)
  choices++
  return next
}
const go = (state, to) => take(state, optionTo(state, to))
const initial = (nodeId, clock) => ({ ...newRun(), nodeId, clock,
  inventory: { lek: 5000, cader: 1, shisheUje: 1 } })
const departure = STORY.udhaUdhetari.options[0]
const follow = STORY.rrugaDetit.options[0]
const route = NPCS.seaRoadTraveller
assert.deepEqual(route.route, ['udhaUdhetari', 'udhaUdhetari', 'rrugaDetit', 'lamtumira'])
assert.equal(route.stepHours, 1)
assert.equal(route.once, true)
assert.equal(route.settlesAt, undefined)
assert.equal(route.activePhases, undefined)
assert.equal(durationHoursOf(departure, 'udhaUdhetari'), 2)
assert.equal(durationHoursOf(follow, 'rrugaDetit'), 1)
const hoursOf = (nodeId, option) => durationHoursOf(option, nodeId)
assert.deepEqual(initialNpcTravelWindow('seaRoadTraveller', route, STORY, hoursOf), {
  from: 'udhaUdhetari', to: 'rrugaDetit', hours: 2, lastSourceIndex: 1,
})
for (const badDeparture of [{ ...departure, startsNpc: undefined }, { ...departure, durationHours: 1 }, { ...departure, time: 'night' }]) {
  const changed = { ...STORY, udhaUdhetari: { ...STORY.udhaUdhetari,
    options: STORY.udhaUdhetari.options.map((option) => option === departure ? badDeparture : option) } }
  assert.equal(initialNpcTravelWindow('seaRoadTraveller', route, changed, hoursOf), null,
    'an unproven departure interval bypassed normal route speed checks')
}
assert.equal(initialNpcTravelWindow('seaRoadTraveller', route, {
  ...STORY, fshehur: { ...STORY.fshehur, startsNpc: 'seaRoadTraveller' },
}, hoursOf), null, 'a competing node arrival must invalidate the exact initial travel window')

const approachHours = durationHoursOf(STORY.fshehur.options.find((o) => o.to === 'qytetiUdhetar'), 'fshehur') +
  durationHoursOf(STORY.qytetiUdhetar.options[0], 'qytetiUdhetar') + 2
const roadAt = (clock) => {
  let state = initial('fshehur', clock)
  state = go(state, 'qytetiUdhetar')
  state = go(state, 'udhaUdhetari')
  assert.match(prose(state), /Gjakova është brenda/)
  const start = state.clock
  state = take(state, departure)
  assert.equal(state.clock, start + 2)
  assert.equal(state.npcStarted.seaRoadTraveller, start)
  assert.equal(state.rendezvous.seaRoadWalk.dueAtClock, start + 3)
  assert.equal(state.rendezvous.seaRoadWalk.leaveAfterHours, 0)
  assert.equal(state.inventory.lek, 5000 - ROAD_TICKET_PRICE)
  assert.equal(npcNodeOf(state, 'seaRoadTraveller'), 'rrugaDetit')
  assert.ok(hasCond(state, 'rendezvous:seaRoadWalk:known'))
  return state
}
const clockFor = (predicate) => {
  for (let clock = 0; clock < 500; clock++) {
    const state = { ...newRun(), nodeId: 'rrugaDetit', clock: clock + approachHours }
    if (predicate(state)) return clock
  }
  throw new Error('No production weather/time fixture found')
}
let completedRoad
// Every civil-hour departure, including midnight and phase crossings, must
// preserve the same +2/+1 schedule through real accepted choices.
for (let clock = 0; clock < 24; clock++) {
  const road = roadAt(clock)
  const arrival = take(road, follow)
  assert.equal(arrival.clock, road.clock + 1)
  assert.equal(npcNodeOf(arrival, 'seaRoadTraveller'), 'lamtumira')
  assert.equal(arrival.rendezvous.seaRoadWalk.outcome, 'on-time')
}
for (const [label, predicate, actionId] of [
  ['rain umbrella', (s) => weatherOf(s) === 'rain', 'world-item:open-umbrella-rruga-detit-rain'],
  ['bottle', () => true, 'world-item:drink-bottle-rruga-detit'],
  ['night observation', (s) => timeOfDay(s) === 'night', 'observation:old-road-sea'],
]) {
  let state = roadAt(clockFor(predicate))
  const clock = state.clock
  state = reload(state)
  assert.equal(state.actionSpeech, null, `${label}: reload replayed the departure`)
  const action = STORY.rrugaDetit.options.find((o) => canonicalPlayerActionId('rrugaDetit', o) === actionId)
  state = take(state, action)
  assert.equal(state.clock, clock, `${label}: instant action moved the companion`)
  assert.equal(state.cameFrom, 'rrugaDetit')
  assert.equal(npcNodeOf(state, 'seaRoadTraveller'), 'rrugaDetit')
  assert.match(prose(state), /udhëtari ecën përpara dhe flet/)
  state = reload(state)
  state = take(state, follow)
  assert.equal(state.clock, clock + 1)
  assert.equal(npcNodeOf(state, 'seaRoadTraveller'), 'lamtumira')
  assert.equal(state.rendezvous.seaRoadWalk.outcome, 'on-time')
  const arrival = prose(state)
  assert.match(arrival, /ti vjen me udhëtarin/)
  assert.doesNotMatch(arrival, /udhëtari ecën poshtë/)
  const bread = STORY.lamtumira.options[0]
  // The standing offer depends on the present actor, not on stale arrival
  // narration. This is a context boundary probe, not a fabricated walk.
  const localContext = { ...state, cameFrom: 'lamtumira', choiceIndex: null }
  assert.match(prose(localContext), /udhëtari thotë: unë të jap pak bukë/)
  assert.ok(canChoose(currentStoryState(ready(localContext, bread)), bread))
  assert.doesNotMatch(prose(localContext), /ti vjen me udhëtarin|ulu, mik/)
  const beforeDiscovery = state.clock
  state = reducer(state, { type: 'DISCOVER', id: 'buke' })
  assert.equal(state.clock, beforeDiscovery, 'saving a word advanced the farewell clock')
  assert.equal(npcNodeOf(state, 'seaRoadTraveller'), 'lamtumira')
  state = take(state, bread)
  assert.equal(state.clock, clock + 1, 'taking offered bread delayed the farewell')
  assert.match(prose(state), /ti merr bukën nga udhëtari/)
  assert.doesNotMatch(prose(state), /ti vjen me udhëtarin|ulu, mik/,
    'the bread self-loop replayed arrival or the spoken greeting')
  state = go(state, 'guriUdhes')
  assert.equal(npcNodeOf(state, 'seaRoadTraveller'), null)
  completedRoad = reload(state)
}

let missed = roadAt(3)
missed = go(missed, 'udhaShenja')
assert.ok(hasCond(missed, 'rendezvous:seaRoadWalk:missed'))
missed = go(missed, 'rrugaDetit')
assert.equal(npcNodeOf(missed, 'seaRoadTraveller'), null)
assert.match(prose(missed), /Udhëtari ka shkuar përpara/)
assert.equal(canChoose(ready(missed, follow), follow), false)
const beforeRejected = ready(missed, follow)
assert.equal(reducer(beforeRejected, { type: 'CHOOSE', option: follow, targetNode: STORY.lamtumira,
  fromNodeId: 'rrugaDetit', fromTurn: beforeRejected.turn }), beforeRejected)
missed = go(missed, 'guriUdhes')

// Direct boundary and migration probes supplement, rather than replace, walks.
for (const state of [completedRoad, missed]) {
  for (const nodeId of ['fshehur', 'qytetiUdhetar', 'udhaUdhetari']) {
    const returned = { ...state, nodeId, cameFrom: null, choiceIndex: null }
    assert.doesNotMatch(prose(returned), /udhëtari (?:pret|flet|thotë|jep)|nisemi pas pak|një udhëtar rri jashtë/)
    if (nodeId === 'udhaUdhetari') {
      assert.match(prose(returned), /Gjakova është brenda/,
        'the city exit lost its visible location when the traveller departed')
      assert.equal(canChoose(ready(returned, departure), departure), false)
      const exit = STORY.udhaUdhetari.options.find((o) => o.requires === 'rendezvous:seaRoadWalk:known')
      take(returned, exit) // normal city exit remains usable
    }
  }
}
const legacy = reload({ ...initial('rrugaDetit', 75), cameFrom: 'udhaUdhetari', choiceIndex: 0 })
assert.equal(legacy.npcStarted.seaRoadTraveller, undefined, 'migration fabricated a departure clock')
assert.equal(legacy.rendezvous.seaRoadWalk, undefined, 'migration fabricated a promise')
assert.equal(canChoose(ready(legacy, follow), follow), false)
assert.doesNotMatch(prose(legacy), /udhëtari (?:ecën|vendos|thotë)/)
go(legacy, 'guriUdhes')
const legacyGate = reload({ ...initial('udhaUdhetari', 75), visited: { lamtumira: true } })
const legacyExit = STORY.udhaUdhetari.options.find((o) => o.requires === 'visited:lamtumira')
take(legacyGate, legacyExit)
assert.equal(hasCond({ ...newRun(), rendezvous: { seaRoadWalk: {} } }, 'rendezvous:seaRoadWalk:known'), false)
for (const clock of [completedRoad.npcStarted.seaRoadTraveller + 2, completedRoad.npcStarted.seaRoadTraveller + 3,
  completedRoad.npcStarted.seaRoadTraveller + 4]) {
  const state = { ...completedRoad, clock }
  assert.equal(npcNodeOf(state, 'seaRoadTraveller'), ['rrugaDetit', 'lamtumira', null][clock - completedRoad.npcStarted.seaRoadTraveller - 2])
}
const resetRoad = reducer(completedRoad, { type: 'RESET' })
assert.equal(resetRoad.npcStarted.seaRoadTraveller, undefined)
assert.equal(resetRoad.rendezvous.seaRoadWalk, undefined)

const work = STORY.mulli1.options.find((o) => o.earns === 'mill-work')
assert.equal(STORY.mulli1.options.indexOf(work), 3, 'paid action address changed')
const source = resolveRevealLine(STORY.mulli1.text.map(lineOf), work).line
assert.equal(albanianTextOf(source), 'Plaku thotë: ka punë për ty brenda mullirit.')
for (const nodeId of ['fushaMulli', 'mulli1']) {
  let state = initial(nodeId, 3)
  const accept = STORY[nodeId].options.find((o) => o.effects?.some((e) => e.id === 'millWorkAccepted'))
  state = take(state, accept)
  assert.equal(state.inventory.lek, 5000)
  assert.equal(state.clock, 3)
  assert.equal(state.visited.punaMulli, undefined)
  if (nodeId !== 'mulli1') state = go(state, 'mulli1')
  state = reload(state)
  assert.ok(isOptionRevealed(currentStoryState(ready(state, work)), work), `${nodeId}: accepted work has no standing signpost`)
  state = take(state, work)
  assert.equal(state.inventory.lek, 5000 + ORDINARY_WORK_WAGE)
  assert.equal(state.visited.punaMulli, true)
  state = go(state, 'mulli1')
  assert.match(prose(state), /ti e ke bërë punën/)
  assert.doesNotMatch(prose(state), /ti merr punën nga plaku|ti nuk e ke bërë ende/)
  for (let clock = 0; clock < 24; clock++) {
    const night = { ...state, clock, cameFrom: null, choiceIndex: null }
    if (timeOfDay(night) === 'night') assert.doesNotMatch(prose(night), /Plaku thotë: ti e ke bërë punën/,
      'the completed-work acknowledgement invented an old man in the empty night mill')
  }
  state = go(state, 'lumiMjeshter')
  state = go(state, 'fushaMulli')
  state = reload(state)
  assert.match(prose(state), /ti e ke bërë punën/)
  assert.doesNotMatch(prose(state), /nuk ka filluar ende/)
  state = go(state, 'mulli1')
  state = take(state, work)
  assert.equal(state.inventory.lek, 5000 + 2 * ORDINARY_WORK_WAGE)
  const reset = reducer(state, { type: 'RESET' })
  assert.equal(reset.flags.millWorkAccepted, undefined)
  assert.equal(reset.visited.punaMulli, undefined)
}
console.log(`Road/mill continuity passed: ${choices} real choices, exact NPC timing, zero-time continuity, missed route, reload/reset and both mill acceptances.`)
