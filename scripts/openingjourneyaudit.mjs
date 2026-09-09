// The opening acquaintance is a real person moving through a real world, not
// a dialogue menu which teleports the player. These reducer-level journeys pin
// the follow/meeting clocks, physical locations, name knowledge and save data.
import assert from 'node:assert/strict'
import { STORY, visibleLines } from '../src/game/content.js'
import {
  START_CLOCK,
  hasCond,
  hasRequiredItem,
  newRun,
  normalizeSavedState,
  npcNodeOf,
  phraseSenses,
  reducer,
} from '../src/game/gameState.js'

const albanian = (line) => (line || []).map((token) => token.al || token.en || '').join(' ')
  .replace(/\s+([.,!?;:])/g, '$1')

const ready = (state, option) => {
  const ids = phraseSenses(option.text)
  return {
    ...state,
    discovered: { ...state.discovered, ...Object.fromEntries(ids.map((id) => [id, true])) },
    mana: { ...state.mana, ...Object.fromEntries(ids.map((id) => [id, 20])) },
  }
}

const choose = (state, to, predicate = () => true) => {
  const option = STORY[state.nodeId].options.find((candidate) =>
    !candidate.confuser && candidate.to === to && predicate(candidate) && hasRequiredItem(state, candidate))
  assert.ok(option, `${state.nodeId}: no available real option to ${to}`)
  const playable = ready(state, option)
  const next = reducer(playable, {
    type: 'CHOOSE', option, fromNodeId: playable.nodeId, fromTurn: playable.turn,
  })
  assert.notEqual(next, playable, `${state.nodeId}->${to}: reducer rejected canonical choice`)
  return next
}

const atChoice = (state, to, predicate = () => true) =>
  STORY[state.nodeId].options.find((option) =>
    !option.confuser && option.to === to && predicate(option) && hasRequiredItem(state, option))

const visibleText = (state) => visibleLines(STORY[state.nodeId], (id) => hasCond(state, id))
  .map(albanian).join(' ')

const opening = () => {
  let state = { ...newRun(), clock: START_CLOCK }
  state = choose(state, 'bisedaUra1')
  state = choose(state, 'bisedaUra2')
  state = choose(state, 'bisedaUra3')
  return state
}

const beginFollow = () => {
  let state = opening()
  state = choose(state, 'bisedaFollowAgree')
  state = choose(state, 'bisedaShesh')
  assert.equal(state.clock, START_CLOCK, 'agreeing to follow consumed travel time')
  assert.equal(npcNodeOf(state, 'elira'), 'start', 'Elira did not begin at the bridge')
  assert.equal(state.rendezvous.eliraFollow.dueAtClock, START_CLOCK + 1)
  return state
}

{
  let state = opening()
  state = choose(state, 'bisedaUraPlan')
  state = choose(state, 'bisedaFollowAgree')
  assert.doesNotMatch(visibleText(state), /qëndro/, 'agreeing to follow still tells the player to wait before leaving')
  state = choose(state, 'bisedaShesh')
  assert.match(visibleText(state), /Elira/, 'the bridge narration forgot Elira’s learned name')
  state = choose(state, 'bisedaShesh', (option) => option.to === 'bisedaShesh')
  assert.match(visibleText(state), /Elira/, 'Elira became an unnamed pronoun while waiting across the bridge')
}

{
  let state = beginFollow()
  state = choose(state, 'fshatiLumi')
  assert.equal(state.clock, START_CLOCK + 1)
  assert.equal(state.rendezvous.eliraFollow.outcome, 'on-time')
  assert.equal(npcNodeOf(state, 'elira'), 'fshatiLumi')
  assert.ok(atChoice(state, 'eliraBreg'), 'the immediately followed woman is not approachable')
}

{
  let state = beginFollow()
  state = choose(state, 'bisedaShesh', (option) => option.to === 'bisedaShesh')
  assert.equal(hasCond(state, 'rendezvous:eliraFollow:waiting'), true)
  assert.equal(npcNodeOf(state, 'elira'), 'fshatiLumi', 'Elira did not wait across the bridge')
  state = choose(state, 'fshatiLumi')
  assert.equal(state.rendezvous.eliraFollow.outcome, 'late')
  assert.equal(npcNodeOf(state, 'elira'), 'fshatiLumi', 'the short-delay meeting missed a waiting Elira')
}

{
  let state = beginFollow()
  state = choose(state, 'bisedaShesh', (option) => option.to === 'bisedaShesh')
  state = choose(state, 'bisedaShesh', (option) => option.to === 'bisedaShesh')
  state = choose(state, 'bisedaShesh', (option) => option.to === 'bisedaShesh')
  assert.equal(hasCond(state, 'rendezvous:eliraFollow:missed'), true)
  assert.equal(npcNodeOf(state, 'elira'), 'fshatiSheshi', 'Elira did not continue to the village')
  state = choose(state, 'fshatiLumi')
  state = choose(state, 'fshatiSheshi')
  assert.equal(state.rendezvous.eliraFollow.outcome, null, 'a missed bank promise was falsely fulfilled in the square')
  state = choose(state, 'eliraShesh')
  assert.match(visibleText(state), /ndodhi.*mendova.*vije pas meje/, 'the missed-follow reaction disappeared')
}

const scheduleMeeting = () => {
  let state = opening()
  state = choose(state, 'bisedaKroi')
  state = choose(state, 'start', (option) => option.rendezvous?.id === 'eliraSquare')
  assert.equal(state.nodeId, 'start', 'agreeing to meet teleported the player')
  assert.equal(state.clock, START_CLOCK, 'agreeing to meet advanced the player clock')
  assert.equal(state.rendezvous.eliraSquare.dueAtClock, 27, 'tomorrow at nine moved')
  return state
}

{
  let state = scheduleMeeting()
  state = choose(state, 'fshatiLumi')
  state = choose(state, 'fshatiSheshi')
  assert.equal(state.clock, 15)
  assert.equal(state.rendezvous.eliraSquare.metAtClock, null, 'early arrival fulfilled the promise')
  assert.equal(hasCond(state, 'rendezvous:eliraSquare:scheduled'), true)
  state = choose(state, 'fshatiSheshi', (option) => option.atHour === 9)
  assert.equal(state.clock, 27)
  assert.equal(state.rendezvous.eliraSquare.outcome, 'on-time')
  assert.ok(atChoice(state, 'eliraShesh'), 'on-time meeting cannot continue as a conversation')
}

for (const [arrivalClock, expected] of [[28, 'late'], [31, 'missed']]) {
  let state = scheduleMeeting()
  state = { ...state, nodeId: 'fshatiLumi', clock: arrivalClock, conditionClock: arrivalClock }
  state = choose(state, 'fshatiSheshi')
  assert.equal(state.rendezvous.eliraSquare.outcome, expected, `${expected} appointment reaction drifted`)
  state = choose(state, 'eliraShesh')
  assert.match(
    visibleText(state),
    expected === 'late'
      ? /u vonove.*prita/
      : /u vonove kaq shumë.*mendova se kishim një takim/,
  )
  assert.match(visibleText(state), /a mund të më ndihmosh/, `${expected} arrival offers help without first asking for it`)
}

{
  let state = opening()
  assert.equal(hasCond(state, 'knows:npcName:elira'), false)
  state = choose(state, 'bisedaUraPlan')
  assert.equal(hasCond(state, 'knows:npcName:elira'), true, 'asking did not learn Elira’s name')
  assert.match(visibleText(state), /Elira/)
  const restored = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
  assert.equal(hasCond(restored, 'knows:npcName:elira'), true, 'Elira’s learned name did not survive save/reload')
}

assert.equal(npcNodeOf({ ...newRun(), clock: 99, npcStarted: { elira: START_CLOCK } }, 'elira'), 'fshatiSheshi',
  'Elira did not remain a village resident after her walk')

console.log('✅ opening journey: physical follow, delay, appointments, identity and persistence are coherent')
