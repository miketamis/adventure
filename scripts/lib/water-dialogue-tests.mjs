import assert from 'node:assert/strict'
import { STORY, lineOf } from '../../src/game/content.js'
import { HYDROLOGY_FACTS, hydrologyFromFacts } from '../../src/game/environment.js'
import { albanianTextOf } from '../../src/game/language.js'
import { canonicalPlayerActionId } from '../../src/game/playerActionRuntime.js'
import {
  canChoose, currentStoryState, hasCond, newRun, normalizeSavedState, reducer,
  storyLearningTaskForState, storyScenePresentationForState, trainablePhraseSenses,
} from '../../src/game/gameState.js'

const reload = (state) => normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
const prose = (state) => storyScenePresentationForState(state).normalEntries.map(({ line }) => albanianTextOf(line)).join('\n')
const prepare = (input) => {
  const state = { ...input, discovered: { ...input.discovered }, mana: { ...input.mana } }
  for (const line of [...STORY[state.nodeId].text.map(lineOf), ...STORY[state.nodeId].options.map(({ text }) => text)]) {
    for (const id of trainablePhraseSenses(line)) { state.discovered[id] = true; state.mana[id] = 50 }
  }
  return state
}
const choose = (input, predicate) => {
  const state = prepare(input)
  const choices = STORY[state.nodeId].options.filter((option) => !option.confuser && predicate(option) && canChoose(currentStoryState(state), option))
  assert.equal(choices.length, 1, `${state.nodeId}: expected one available action`)
  const option = choices[0]
  const next = reducer(state, { type: 'CHOOSE', option, targetNode: STORY[option.to], fromNodeId: state.nodeId, fromTurn: state.turn })
  assert.notEqual(next, state, `${state.nodeId}: real action rejected`)
  return next
}
const topic = (state, id) => choose(state, (option) => option.conversationHub?.questionId === id)
const at = (state, nodeId) => ({ ...state, nodeId, cameFrom: null, cameFromPhase: null, familiar: false, storyLearningScene: null, actionSpeech: null })
const learningPass = (state) => {
  const id = 'guest-water-news'
  const base = { encounterId: id, fromNodeId: state.nodeId, fromTurn: state.turn, fromRun: state.storyRunSequence }
  const started = reducer(state, { type: 'BEGIN_STORY_LEARNING', ...base })
  const task = storyLearningTaskForState(started, id)
  assert.ok(task?.episode, 'news task did not begin')
  return reducer(started, { type: 'SUBMIT_STORY_LEARNING', ...base, attemptId: task.episode.attemptId,
    response: { selections: Object.fromEntries(task.questions.map((question) => [question.id, question.correctId])) } })
}

export function checkWaterDialogue(check) {
  check('derived water predicates use exact canonical facts and never persisted shadow values', () => {
    for (const [id, facts] of Object.entries(HYDROLOGY_FACTS)) {
      for (const fact of facts) {
        const state = { ...newRun(), worldFacts: { [fact]: { atClock: 0, source: 'condition-test' } } }
        assert.equal(hasCond(state, `hydrology:${id}`), true)
        assert.equal(hasCond(reload(state), `hydrology:${id}`), true)
      }
      assert.equal(hasCond({ ...newRun(), flags: { [id]: true }, inventory: { [id]: 1 } }, `hydrology:${id}`), false)
    }
    for (const id of ['unknown', 'toString', '__proto__', 'villageWellsRestored:forged']) assert.equal(hasCond(newRun(), `hydrology:${id}`), false)
    assert.deepEqual(hydrologyFromFacts({ binoshetRiverRestored: true }), { riversRestored: false, villageWellsRestored: false, fieldsWatered: false })
  })

  check('current guest and elder conversations distinguish water, hearths and the main monster', () => {
    const factCases = [[], ['villageWellsRestored'], ['droughtBroken'], ['kulshedraDefeated'], ['hearthsRelit'],
      ['villageWellsRestored', 'hearthsRelit'], ['villageWellsRestored', 'kulshedraDefeated'],
      ['riverRestored'], ['fieldsWatered'], ['rainReturned'], ['binoshetRiverRestored'], ['krujeKulshedraDefeated']]
    const states = factCases.map((ids) => ({ label: ids.join('+') || 'initial', state: { ...newRun(), clock: 4,
      worldFacts: Object.fromEntries(ids.map((id) => [id, { atClock: 4, source: 'independence-fixture' }])) } }))
    // Effects are applied by the actual return reducer, never copied from a guessed outcome.
    for (const ending of Object.values(STORY).filter((node) => node.worldEffects?.includes('villageWellsRestored'))) {
      const state = reducer({ ...newRun(), nodeId: ending.id, clock: 4, ended: ending.end }, { type: 'RETURN_TO_WORLD' })
      assert.ok(state.worldFacts.villageWellsRestored, `${ending.id}: actual return lost its water effect`)
      states.push({ label: ending.id, state })
    }
    for (const { label, state: original } of states) {
      const state = reload(original)
      const water = hydrologyFromFacts(state.worldFacts).villageWellsRestored
      const dead = Boolean(state.worldFacts.kulshedraDefeated)
      const hearths = Boolean(state.worldFacts.hearthsRelit)
      let guest = topic(at(state, 'sofraMikut2'), 'news')
      const guestText = prose(guest)
      const task = storyLearningTaskForState(guest, 'guest-water-news')
      assert.equal(Boolean(task?.sourceAvailable), !dead, `${label}: obsolete/live news availability`)
      assert.equal(guestText.includes('ka vdekur.'), dead, `${label}: monster report`)
      assert.equal(guestText.includes('pusi ka ujë përsëri.'), water, `${label}: well report`)
      assert.equal(guestText.includes('pusi i thatë'), false, `${label}: stale dry-well advice`)
      assert.equal(prose(reload(guest)), guestText, `${label}: news changed after reload`)
      assert.ok(canChoose(prepare(guest), STORY.sofraMikut2.options.find((option) => option.conversationHub?.kind === 'exit')))
      if (!dead) {
        assert.equal(task.sourceLines.length, 4)
        guest = learningPass(guest)
        const firstResult = guest.storyLearningEvidence['guest-water-news'].firstResult
        for (const destination of ['sofraVendimPlaka', 'sofraVendimPusi']) {
          const result = choose(guest, (option) => option.to === destination)
          assert.deepEqual(result.storyLearningEvidence['guest-water-news'].firstResult, firstResult, 'opinion was scored')
          assert.equal(prose(result).includes('i thatë'), false)
          const moved = choose(result, (option) => option.to === 'pusiThate')
          assert.equal(moved.nodeId, 'pusiThate')
          assert.equal(moved.actionSpeech?.al, 'shko te pusi.')
          assert.equal(prose(reload(moved)), prose(moved))
        }
      } else {
        for (const option of STORY.sofraMikut2.options.filter((option) => option.learningEncounter === 'guest-water-news')) {
          assert.equal(canChoose(prepare(guest), option), false)
        }
      }
      const oldWoman = prose(at(state, 'plaka'))
      assert.equal(oldWoman.includes('ka vdekur.'), dead)
      assert.equal(oldWoman.includes('ka ende Bukurën.'), water && !dead)
      assert.equal(oldWoman.includes('ka ujë dhe Bukurën.'), !water && !dead)
      let elder = topic(at(state, 'sheshiPlak'), 'villagePast')
      const past = prose(elder)
      assert.match(past, /djali im është larg, nëntë vjet, por motrat e tij rrinë këtu\./)
      assert.equal(past.includes('vatra janë të ftohta.'), !hearths, `${label}: hearth independence`)
      assert.equal(past.includes('vatra ka zjarr përsëri.'), hearths, `${label}: restored hearths`)
      assert.equal(past.includes('pusi ka ujë përsëri.'), water, `${label}: current water in family history`)
      elder = topic(elder, 'elderMemory')
      const memory = prose(elder)
      assert.equal(memory.includes('akoma nuk kemi ujë'), !water)
      assert.equal(memory.includes('tani kemi ujë përsëri'), water)
      assert.equal(memory.includes('sikur ajo kohë kthehet'), false)
      assert.equal(prose(reload(elder)), memory)
    }
  })

  check('old clarification responses retire with their water-state questions', () => {
    for (const id of ['meaning', 'clarify']) {
      let state = topic({ ...newRun(), nodeId: 'sheshiPlak', clock: 4 }, 'well')
      state = topic(state, id)
      const response = STORY.sheshiPlak.text.find((entry) => entry.conversationHub?.questionId === id)
      assert.ok(storyScenePresentationForState(state).sourceLines.includes(lineOf(response)))
      for (const fact of ['villageWellsRestored', 'droughtBroken']) {
        const restored = reload({ ...state, worldFacts: { [fact]: { atClock: 4, source: 'return' } } })
        assert.equal(storyScenePresentationForState(restored).sourceLines.includes(lineOf(response)), false)
        const option = STORY.sheshiPlak.options.find((option) => option.conversationHub?.questionId === id)
        assert.equal(canChoose(prepare(restored), option), false)
      }
    }
  })

  check('neutral well directions preserve exact saved action identities', () => {
    for (const [nodeId, index] of [['sofraVendimPlaka', 1], ['sofraVendimPusi', 0]]) {
      const option = STORY[nodeId].options[index]
      assert.equal(canonicalPlayerActionId(nodeId, option), `${nodeId.toLowerCase()}:shko-tek-pus-i-art-thate`)
      assert.equal(albanianTextOf(option.text), 'shko te pusi.')
    }
  })
}
