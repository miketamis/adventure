// The opening acquaintance is a real person moving through a real world, not
// a dialogue menu which teleports the player. These reducer-level journeys pin
// the follow/meeting clocks, physical locations, name knowledge and save data.
import assert from 'node:assert/strict'
import { STORY, lineOf, visibleLines } from '../src/game/content.js'
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
import { englishReadingOf } from '../src/game/language.js'
import { resolveRevealLine } from '../src/game/revealResolver.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import { completeProjectedStoryEncounter } from './lib/story-projections.mjs'
import {
  ELIRA_BREAD_SALT_QUEST_ID,
  offerQuests,
  questStatusOf,
} from '../src/game/quests.js'
import {
  knowsNpcIdentity,
  npcIdentityConditionId,
  npcIdentityKnowledgeId,
  npcIdentityReference,
} from '../src/game/npcIdentity.js'

const ELIRA_IDENTITY_CONDITION = npcIdentityConditionId('elira')
const ELIRA_KNOWLEDGE_ID = npcIdentityKnowledgeId('elira')
const ELIRA_QUEST_ID = ELIRA_BREAD_SALT_QUEST_ID

const albanian = (line) => (line || []).map((token) => token.al || token.en || '').join(' ')
  .replace(/\s+([.,!?;:])/g, '$1')

const ready = (state, option) => {
  const revealLine = option.reveal
    ? resolveRevealLine(STORY[state.nodeId]?.text?.map(lineOf), option).line
    : null
  const ids = [...new Set([
    ...phraseSenses(option.text),
    ...phraseSenses(revealLine || []),
  ])]
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
  const playable = completeProjectedStoryEncounter(ready(state, option), option)
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
const isErrandRepair = (option) => albanian(option.text) === 'nuk kuptoj. fol ngadalë, të lutem.'

const visibleIdentityReadings = (state) => [
  ...visibleLines(STORY[state.nodeId], (id) => hasCond(state, id)).map(englishReadingOf),
  ...STORY[state.nodeId].options
    .filter((option) => !option.confuser && hasRequiredItem(state, option))
    .map((option) => englishReadingOf(option.text)),
].filter((reading) => /\b(?:Elira|woman)\b/i.test(reading))

const assertEliraNaming = (state, known, context) => {
  const readings = visibleIdentityReadings(state)
  assert.ok(readings.length, `${context}: no visible Elira identity reference was exercised`)
  if (known) {
    assert.ok(readings.some((reading) => /\bElira\b/.test(reading)), `${context}: learned name is not shown`)
    assert.deepEqual(readings.filter((reading) => /\bwoman\b/i.test(reading)), [],
      `${context}: learned Elira reverted to an anonymous descriptor`)
  } else {
    assert.deepEqual(readings.filter((reading) => /\bElira\b/.test(reading)), [],
      `${context}: Elira's name leaked before the authored reveal`)
    assert.ok(readings.some((reading) => /\bwoman\b/i.test(reading)), `${context}: anonymous descriptor is absent`)
  }
}

const opening = () => {
  let state = { ...newRun(), clock: START_CLOCK }
  assertEliraNaming(state, false, 'initial bridge scene')
  state = choose(state, 'bisedaUra1')
  assertEliraNaming(state, false, 'first bridge exchange')
  state = choose(state, 'bisedaUra2')
  assertEliraNaming(state, false, 'second bridge exchange')
  state = choose(state, 'bisedaUra3')
  assertEliraNaming(state, false, 'travel-plan exchange')
  return state
}

const beginFollow = () => {
  let state = opening()
  const comingNow = atChoice(state, 'bisedaFollowAgree')
  assert.equal(albanian(comingNow?.text), 'po vij tani.', 'the early journey lost its explicit coming-now update')
  assert.deepEqual(comingNow.playerIntents, ['speech'], 'the coming-now update is not one focused speech act')
  state = choose(state, 'bisedaFollowAgree')
  state = choose(state, 'bisedaShesh')
  assert.equal(state.clock, START_CLOCK, 'agreeing to follow consumed travel time')
  assert.equal(npcNodeOf(state, 'elira'), 'start', 'Elira did not begin at the bridge')
  assert.equal(state.rendezvous.eliraFollow.dueAtClock, START_CLOCK + 1)
  return state
}

{
  let state = opening()
  state = choose(state, 'bisedaUra3', (option) =>
    option.conversationHub?.hubId === 'bridge-core'
      && option.conversationHub?.questionId === 'identity')
  assertEliraNaming(state, true, 'authored bridge introduction')
  state = choose(state, 'bisedaFollowAgree')
  assert.doesNotMatch(visibleText(state), /qëndro/, 'agreeing to follow still tells the player to wait before leaving')
  state = choose(state, 'bisedaShesh')
  assertEliraNaming(state, true, 'named follow departure')
  assert.match(visibleText(state), /Elira/, 'the bridge narration forgot Elira’s learned name')
  state = choose(state, 'bisedaShesh', (option) => option.to === 'bisedaShesh')
  assertEliraNaming(state, true, 'named follow waiting beat')
  assert.match(visibleText(state), /Elira/, 'Elira became an unnamed pronoun while waiting across the bridge')
}

{
  let state = beginFollow()
  state = choose(state, 'fshatiLumi')
  assert.equal(state.clock, START_CLOCK + 1)
  assert.equal(state.rendezvous.eliraFollow.outcome, 'on-time')
  assert.equal(npcNodeOf(state, 'elira'), 'fshatiLumi')
  assertEliraNaming(state, false, 'anonymous on-time river reunion')
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
  assertEliraNaming(state, false, 'anonymous late river reunion')
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
  assertEliraNaming(state, false, 'anonymous missed-follow village reunion')
  state = choose(state, 'eliraShesh')
  assertEliraNaming(state, false, 'anonymous missed-follow conversation')
  assert.match(visibleText(state), /ndodhi.*mendova.*vije pas meje/, 'the missed-follow reaction disappeared')
}

const scheduleMeeting = () => {
  let state = opening()
  const reschedule = atChoice(state, 'bisedaKroi')
  assert.equal(albanian(reschedule?.text), 'nuk mund të vij tani. takohemi nesër?',
    'the early journey lost its explicit inability and tomorrow proposal')
  assert.deepEqual(reschedule.playerIntents, ['speech'], 'the reschedule is not one focused speech act')
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
  assertEliraNaming(state, false, 'anonymous on-time appointment')
  assert.ok(atChoice(state, 'eliraShesh'), 'on-time meeting cannot continue as a conversation')
}

for (const [arrivalClock, expected] of [[28, 'late'], [31, 'missed']]) {
  let state = scheduleMeeting()
  state = { ...state, nodeId: 'fshatiLumi', clock: arrivalClock, conditionClock: arrivalClock }
  state = choose(state, 'fshatiSheshi')
  assert.equal(state.rendezvous.eliraSquare.outcome, expected, `${expected} appointment reaction drifted`)
  assertEliraNaming(state, false, `anonymous ${expected} appointment arrival`)
  state = choose(state, 'eliraShesh')
  assertEliraNaming(state, false, `anonymous ${expected} appointment conversation`)
  assert.match(
    visibleText(state),
    expected === 'late'
      ? /u vonove.*prita/
      : /u vonove kaq shumë.*mendova se kishim një takim/,
  )
  if (expected === 'late') {
    assert.doesNotMatch(visibleText(state), /a mund të më ndihmosh/,
      'a late arrival receives the request before the player answers Elira')
    const apology = atChoice(state, 'eliraShesh', (option) =>
      albanian(option.text) === 'më fal. kam gabuar.')
    assert.ok(apology, 'a late arrival has no explicit apology response')
    state = choose(state, 'eliraShesh', (option) => option === apology)
    assert.match(visibleText(state), /mos u shqetëso.*a mund të më ndihmosh/,
      'Elira does not acknowledge the chosen apology before asking for help')
  } else {
    assert.match(visibleText(state), /a mund të më ndihmosh/,
      'a missed appointment does not continue to the help request')
  }
}

{
  let state = opening()
  assert.equal(hasCond(state, ELIRA_IDENTITY_CONDITION), false)
  assert.equal(knowsNpcIdentity(state, 'elira'), false)
  assert.equal(npcIdentityReference(state, 'elira'), 'the woman from the bridge')
  state = choose(state, 'bisedaUra3', (option) =>
    option.conversationHub?.hubId === 'bridge-core'
      && option.conversationHub?.questionId === 'identity')
  assert.equal(hasCond(state, ELIRA_IDENTITY_CONDITION), true, 'asking did not learn Elira’s name')
  assert.equal(knowsNpcIdentity(state, 'elira'), true)
  assert.equal(npcIdentityReference(state, 'elira'), 'Elira')
  assert.equal(state.knowledge[ELIRA_KNOWLEDGE_ID].source, 'bisedaUra3->bisedaUra3',
    'the authored identity reveal lost its provenance')
  assert.match(visibleText(state), /Elira/)
  const restored = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
  assert.equal(hasCond(restored, ELIRA_IDENTITY_CONDITION), true, 'Elira’s learned name did not survive save/reload')
  assertEliraNaming(restored, true, 'save/reload after introduction')

  let restarted = reducer(restored, { type: 'RESET' })
  assert.equal(restarted.nodeId, 'start')
  assert.equal(hasCond(restarted, ELIRA_IDENTITY_CONDITION), true, 'Elira’s learned name did not survive reset')
  assertEliraNaming(restarted, true, 'new run after introduction')
  restarted = choose(restarted, 'bisedaUra1')
  assertEliraNaming(restarted, true, 'known first bridge exchange after reset')
  restarted = choose(restarted, 'bisedaUra2')
  assertEliraNaming(restarted, true, 'known second bridge exchange after reset')
  restarted = choose(restarted, 'bisedaUra3')
  assertEliraNaming(restarted, true, 'known travel-plan exchange after reset')
  assert.equal(STORY.bisedaUra3.options.some((option) =>
    option.conversationHub?.questionId === 'identity' && hasRequiredItem(restarted, option)), false,
    'the player can ask Elira’s name again after that identity persisted')
}

assert.equal(npcNodeOf({ ...newRun(), clock: 99, npcStarted: { elira: START_CLOCK } }, 'elira'), 'fshatiSheshi',
  'Elira did not remain a village resident after her walk')

const offeredErrandState = ({ nodeId = 'eliraShesh', lek = 0, knowsElira = false } = {}) => {
  const fresh = newRun()
  return {
    ...fresh,
    nodeId,
    inventory: { ...fresh.inventory, lek },
    quests: offerQuests(fresh.quests, [ELIRA_QUEST_ID], fresh.clock, 'opening-journey-audit'),
    knowledge: knowsElira
      ? { ...fresh.knowledge, [ELIRA_KNOWLEDGE_ID]: { atClock: fresh.clock, source: 'audit' } }
      : fresh.knowledge,
  }
}

const acceptErrand = (input = {}) => {
  const state = offeredErrandState(input)
  const option = STORY[state.nodeId].options.find((candidate) => (
    candidate.questAction?.id === ELIRA_QUEST_ID && candidate.questAction.action === 'accept'
  ))
  return choose(state, option.to, (candidate) => candidate === option)
}

const asksErrandQuestion = (id) => (option) =>
  option.effects?.some((effect) => effect.type === 'flag' && effect.id === id && effect.value !== false)

const ERRAND_QUESTIONS = [
  { asked: 'eliraErrandAskedGuest', response: 'eliraErrandResponseGuest', answer: /udhëtar nga Gjakovë/ },
  { asked: 'eliraErrandAskedMarket', response: 'eliraErrandResponseMarket', answer: /tregu është pranë pusit/ },
  { asked: 'eliraErrandAskedGuestRoom', response: 'eliraErrandResponseGuestRoom', answer: /drejt përpara, pastaj djathtas/ },
]

const permutations = ([first, ...rest]) => first == null
  ? [[]]
  : [first, ...rest].flatMap((entry) =>
      permutations([first, ...rest].filter((candidate) => candidate !== entry))
        .map((tail) => [entry, ...tail]))

for (const nodeId of ['eliraBreg', 'eliraEmriBreg', 'eliraShesh', 'eliraEmriShesh']) {
  const option = STORY[nodeId].options.find((candidate) => (
    candidate.questAction?.id === ELIRA_QUEST_ID && candidate.questAction.action === 'accept'
  ))
  assert.ok(option, `${nodeId}: no registered errand acceptance`)
  assert.equal(option.lek, undefined, `${nodeId}: acceptance bypasses the quest registry with a legacy reward`)
  assert.equal(PLACE_OF[nodeId], PLACE_OF[option.to], `${nodeId}: speaking acceptance also moved the player`)
  assert.equal(option.durationHours, 0, `${nodeId}: speaking acceptance advanced travel time`)
  if (nodeId.endsWith('Breg')) {
    assert.doesNotMatch(albanian(option.text), /(?:shko|vij).*(?:fshat|shesh)/,
      `${nodeId}: acceptance still promises or performs travel`)
  } else {
    assert.equal(option.to, 'fshatiSheshi', `${nodeId}: square acceptance did not return ordinary free roam`)
  }

  for (const lek of [0, 8, 600]) {
    const accepted = acceptErrand({ nodeId, lek, knowsElira: nodeId.includes('Emri') })
    assert.equal(accepted.nodeId, option.to, `${nodeId}/${lek}: acceptance did not resolve at the spoken location`)
    assert.equal(accepted.inventory.lek, lek + 800, `${nodeId}/${lek}: wrong canonical advance`)
    assert.equal(questStatusOf(accepted, ELIRA_QUEST_ID), 'active', `${nodeId}/${lek}: quest is not active`)
    if (nodeId.endsWith('Breg')) {
      const choices = STORY[accepted.nodeId].options.filter((choice) => !choice.confuser && hasRequiredItem(accepted, choice))
      assert.ok(choices.some((choice) => choice.to === 'fshatiSheshi'),
        `${nodeId}/${lek}: no separate choice remains to travel to the village`)
      assert.ok(choices.some((choice) => PLACE_OF[choice.to] === PLACE_OF[nodeId]),
        `${nodeId}/${lek}: the player cannot remain at the river after accepting`)
    } else {
      assert.ok(STORY.fshatiSheshi.options.filter((choice) => !choice.confuser).length >= 10,
        `${nodeId}/${lek}: free-roam square has collapsed into a quest path`)
    }
    const restored = normalizeSavedState(JSON.parse(JSON.stringify(accepted)), newRun())
    assert.equal(restored.inventory.lek, lek + 800, `${nodeId}/${lek}: save/reload changed the advance`)
    assert.equal(questStatusOf(restored, ELIRA_QUEST_ID), 'active', `${nodeId}/${lek}: save/reload lost the quest`)
  }
}

// Optional information remains a conversation the player deliberately opens
// from free roam. Questions can be asked in any order, left at any point, and
// survive save/reload without becoming the quest itself.
const activeConversation = (knowsElira) => {
  const accepted = acceptErrand({ nodeId: knowsElira ? 'eliraEmriShesh' : 'eliraShesh', lek: 8, knowsElira })
  return {
    ...accepted,
    nodeId: 'eliraBanore',
  }
}

assert.deepEqual(Object.keys(STORY).filter((id) => id.startsWith('porosiaPyet')), [],
  'optional errand questions expanded into separate story paths')
for (const knowsElira of [false, true]) {
  for (const order of permutations(ERRAND_QUESTIONS)) {
    let state = activeConversation(knowsElira)
    const [firstQuestion, ...remainingOrder] = order
    const openConversation = atChoice(state, 'porosiaShesh')
    assert.ok(openConversation, `${firstQuestion.asked}: no optional route into the information conversation`)
    state = choose(state, 'porosiaShesh', (option) => option === openConversation)
    const openQuestions = atChoice(state, 'porosiaShesh', asksErrandQuestion(firstQuestion.asked))
    assert.ok(openQuestions, `${firstQuestion.asked}: question is unavailable after opening the conversation`)
    state = choose(state, 'porosiaShesh', (option) => option === openQuestions)
    const conversationClock = state.clock
    assert.equal(state.inventory.lek, 808, 'opening optional information changed the quest advance')
    assertEliraNaming(state, knowsElira, `${knowsElira ? 'known' : 'anonymous'} optional information`)
    assert.match(visibleText(state), firstQuestion.answer, `${firstQuestion.asked}: opening answer is not visible`)
    assert.equal(hasCond(state, `flag:${firstQuestion.asked}`), true,
      `${firstQuestion.asked}: opening question did not persist`)

    const repair = atChoice(state, 'porosiaShesh', isErrandRepair)
    assert.ok(repair, 'the learner cannot ask Elira to repeat the errand slowly')
    state = choose(state, 'porosiaShesh', isErrandRepair)
    assert.equal(state.clock, conversationClock, 'conversation repair advanced time')
    assert.match(visibleText(state), /përsërit ngadalë/, 'Elira did not answer the repair request slowly')
    assert.equal(Boolean(atChoice(state, 'porosiaShesh', isErrandRepair)), false,
      'one-shot conversation repair remained available after its answer')
    for (const candidate of ERRAND_QUESTIONS) {
      assert.equal(hasCond(state, `flag:${candidate.response}`), false,
        `conversation repair left stale response ${candidate.response} visible`)
    }

    const immediateSquareExit = choose(state, 'fshatiSheshi')
    assert.equal(immediateSquareExit.clock, conversationClock, 'leaving optional information spent time')
    assert.equal(questStatusOf(immediateSquareExit, ELIRA_QUEST_ID), 'active', 'leaving optional information closed the quest')

    const asked = new Set([firstQuestion.asked])
    for (const question of remainingOrder) {
      assert.equal(Boolean(atChoice(state, 'pazariFshatit')), false,
        'information conversation exposed a direct market shortcut')
      assert.ok(atChoice(state, 'fshatiSheshi'), 'free-roam exit disappeared before all questions were asked')
      assert.ok(atChoice(state, 'porosiaShesh', asksErrandQuestion(question.asked)),
        `${question.asked}: unasked option is unavailable`)
      state = choose(state, 'porosiaShesh', asksErrandQuestion(question.asked))
      asked.add(question.asked)
      assert.equal(state.clock, conversationClock, `${question.asked}: same-place question advanced time`)
      assert.equal(state.inventory.lek, 808, `${question.asked}: question duplicated or lost the advance`)
      assertEliraNaming(state, knowsElira, `${question.asked}/${knowsElira ? 'known' : 'anonymous'}`)
      assert.match(visibleText(state), question.answer, `${question.asked}: selected answer is not visible`)
      for (const candidate of ERRAND_QUESTIONS) {
        assert.equal(hasCond(state, `flag:${candidate.response}`), candidate === question,
          `${question.asked}: stale response ${candidate.response} remained visible`)
        assert.equal(Boolean(atChoice(state, 'porosiaShesh', asksErrandQuestion(candidate.asked))),
          !asked.has(candidate.asked),
          `${question.asked}: asked/unasked option availability drifted for ${candidate.asked}`)
      }

      const restored = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
      assert.match(visibleText(restored), question.answer, `${question.asked}: save/reload lost the latest answer`)
      assert.equal(questStatusOf(restored, ELIRA_QUEST_ID), 'active', `${question.asked}: save/reload lost the open quest`)
      assert.ok(atChoice(restored, 'fshatiSheshi'), `${question.asked}: save/reload lost the free-roam exit`)
      state = restored
    }

    const remaining = STORY.porosiaShesh.options.filter((option) =>
      !option.confuser && hasRequiredItem(state, option))
    assert.deepEqual(remaining.map((option) => option.to), ['fshatiSheshi'],
      'completed optional questions leave extra branches or a dead end')

    // The answers are applied through the physical world. The market clue
    // leads via the well, while the oda clue becomes straight-then-right. A
    // plausible left turn reaches the homes and never enters the confuser or
    // heart-loss path.
    const square = choose(state, 'fshatiSheshi')
    const well = choose(square, 'pusiThate')
    const market = choose(well, 'pazariFshatit')
    const marketExit = choose(market, 'pusiThate')
    const squareAgain = choose(marketExit, 'fshatiSheshi')
    const odaRoad = choose(squareAgain, 'rrugaOdes')
    const homes = choose(odaRoad, 'fshatiJeta')
    assert.equal(homes.hearts, state.hearts, 'a plausible left turn cost a heart')
    const squareAfterWrongTurn = choose(homes, 'fshatiSheshi')
    const retriedRoad = choose(squareAfterWrongTurn, 'rrugaOdes')
    const oda = choose(retriedRoad, 'oda1')
    assert.equal(PLACE_OF[oda.nodeId], PLACE_OF.oda1, 'straight-then-right did not reach the oda')
  }
}

console.log('✅ opening journey: movement, identity, open quest, optional information and persistence are coherent')
