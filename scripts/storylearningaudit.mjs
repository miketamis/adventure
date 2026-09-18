// Live learning is an exact permission for a canonical action, never a token,
// CEFR capstone pass, payment, appointment or story movement by itself.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { STORY } from '../src/game/content.js'
import { STORY_LEARNING_ENCOUNTERS, storyLearningBindingForOption } from '../src/game/storyLearning.js'
import { CEFR_PREPARATION_MECHANICS } from '../src/game/cefrPreparation.js'
import { npcIdentityKnowledgeId } from '../src/game/npcIdentity.js'
import {
  canChoose, choiceLanguageAvailability, newRun, normalizeSavedState, reducer,
  storyLearningTaskForState,
} from '../src/game/gameState.js'
import {
  commitProjectedOption, feasibleOptionProjection, seedOptionProjection,
} from './lib/story-projections.mjs'
import { loadNpcAppearancePartitions } from './lib/loadnpcappearances.mjs'

await loadNpcAppearancePartitions()

const bindings = [
  ['market-bread-price', 'tregtari', [0]],
  ['guest-bread-request', 'sofraMikut2', [10]],
  ['guest-water-news', 'sofraMikut2', [8, 9]],
  ['elira-later-meeting', 'bisedaKroi', [0]],
]
assert.deepEqual(STORY_LEARNING_ENCOUNTERS.map(({ id }) => id).sort(), bindings.map(([id]) => id).sort(),
  'production encounter registry changed without reviewing whole-bank coverage')
const authoredBindings = Object.entries(STORY).flatMap(([nodeId, node]) => node.options
  .flatMap((option, index) => option.learningEncounter ? [[option.learningEncounter, nodeId, index]] : []))
assert.deepEqual(authoredBindings.map((binding) => binding.join(':')).sort(),
  bindings.flatMap(([id, nodeId, indices]) => indices.map((index) => [id, nodeId, index].join(':'))).sort(),
  'a live learning binding is orphaned or unreviewed')
for (const entry of STORY_LEARNING_ENCOUNTERS) {
  assert.equal(entry.capstoneEligible, false, `${entry.id}: reused story source claims held-out eligibility`)
  for (const mechanicId of entry.preparationMechanicIds) {
    assert.ok(CEFR_PREPARATION_MECHANICS[mechanicId], `${entry.id}: unknown preparation mechanic ${mechanicId}`)
  }
}
const worldOf = (state) => Object.fromEntries(Object.entries(state)
  .filter(([key]) => !key.startsWith('storyLearning')))
const clone = (value) => JSON.parse(JSON.stringify(value))
const event = (state, encounterId, type, extra = {}) => ({
  type, encounterId, fromNodeId: state.nodeId, fromTurn: state.turn,
  fromRun: state.storyRunSequence,
  ...(storyLearningTaskForState(state, encounterId)?.episode?.attemptId
    ? { attemptId: storyLearningTaskForState(state, encounterId).episode.attemptId } : {}),
  ...extra,
})
const answers = (task) => Object.fromEntries(task.questions.map((question) => [question.id, question.correctId]))
const begin = (state, id) => {
  const next = reducer(state, event(state, id, 'BEGIN_STORY_LEARNING'))
  assert.ok(storyLearningTaskForState(next, id)?.episode?.attemptId, `${id}: no canonical attempt`)
  return next
}
const submit = (state, id, selections) => reducer(state, event(state, id, 'SUBMIT_STORY_LEARNING', {
  response: { selections },
}))
const pass = (state, id) => {
  const started = begin(state, id)
  return submit(started, id, answers(storyLearningTaskForState(started, id)))
}
const freshFixture = (id, nodeId, index) => {
  const state = feasibleOptionProjection(nodeId, STORY[nodeId].options[index])
  assert.ok(state, `${id}: no real feasible story context`)
  return {
    ...state,
    mana: {},
    storyLearningScene: null,
    storyLearningEvidence: {},
  }
}

let checked = 0
for (const [id, nodeId, indices] of bindings) {
  const original = freshFixture(id, nodeId, indices[0])
  const task = storyLearningTaskForState(original, id)
  assert.ok(task?.questions?.length, `${id}: missing live objective`)
  assert.ok(task.sourceLines.length, `${id}: no visible source material`)
  for (const index of indices) {
    assert.equal(storyLearningBindingForOption(original, STORY[nodeId].options[index])?.id, id)
    assert.equal(choiceLanguageAvailability(original, STORY[nodeId].options[index]).kind, 'encounter')
    assert.equal(canChoose(original, STORY[nodeId].options[index]), false, `${id}: uncompleted gate opened`)
  }
  const started = begin(original, id)
  assert.deepEqual(worldOf(started), worldOf(original), `${id}: beginning mutated the world or learner proofs`)
  const liveTask = storyLearningTaskForState(started, id)
  const correct = answers(liveTask)
  const helped = reducer(started, event(started, id, 'REVEAL_STORY_LEARNING_SUPPORT', { supportId: 'word-help' }))
  assert.notEqual(helped, started, `${id}: support was not recorded before display`)
  assert.deepEqual(worldOf(helped), worldOf(started), `${id}: support changed unrelated progress`)
  const helpedReload = normalizeSavedState(clone(helped), newRun())
  const helpedPass = submit(helpedReload, id, correct)
  assert.equal(helpedPass.storyLearningEvidence[id].firstResult.mode, 'supported', `${id}: reload erased visible help`)
  const debugShown = reducer(original, { type: 'TOGGLE_DEBUG' })
  const debugHidden = reducer(debugShown, { type: 'TOGGLE_DEBUG' })
  assert.equal(debugHidden.debug, false)
  const debugPass = pass(debugHidden, id)
  assert.equal(debugPass.storyLearningEvidence[id].firstResult.mode, 'supported', `${id}: debug toggle erased answer exposure`)
  const arrivedInDebug = reducer({ ...original, debug: true }, { type: 'TOGGLE_DEBUG' })
  assert.equal(pass(arrivedInDebug, id).storyLearningEvidence[id].firstResult.mode, 'supported',
    `${id}: leaving debug forgot the source already displayed on arrival`)
  const named = { ...original, knowledge: { ...original.knowledge,
    [npcIdentityKnowledgeId('elira')]: true, [npcIdentityKnowledgeId('gjonMik')]: true } }
  assert.equal(storyLearningTaskForState(named, id).sourceLines.length, task.sourceLines.length,
    `${id}: learning an NPC name changed the task's evidence volume`)
  assert.equal(choiceLanguageAvailability(pass(named, id), STORY[nodeId].options[indices[0]]).ok, true,
    `${id}: named speaker variant broke the same task`)
  const legacy = { ...clone(original), visited: {}, nodeId: 'start' }
  delete legacy.storyLearningVersion
  const migrated = normalizeSavedState(legacy, newRun())
  assert.ok(migrated.storyLearningEvidence[id]?.supportIds.includes('legacy-source'),
    `${id}: a reset legacy visit map falsely proved a never-seen source`)

  // Invalid protocols cannot count as attempts or produce a correction that
  // leaks an answer; only a complete declared response is scored.
  const invalidResponses = [null, {}, { ...correct, extra: 'forged' },
    { ...correct, [liveTask.questions[0].id]: 'unknown-choice' }]
  for (const key of Object.keys(correct)) {
    const missing = { ...correct }
    delete missing[key]
    invalidResponses.push(missing)
  }
  for (const selections of invalidResponses) {
    assert.equal(submit(started, id, selections), started, `${id}: malformed selection mutated state`)
  }
  for (const stale of [
    { fromNodeId: 'missing-node' }, { fromTurn: started.turn + 1 },
    { fromRun: started.storyRunSequence + 1 }, { attemptId: 'stale-attempt' },
    { encounterId: 'unknown-encounter' },
  ]) {
    assert.equal(reducer(started, event(started, id, 'SUBMIT_STORY_LEARNING', {
      response: { selections: correct }, ...stale,
    })), started, `${id}: stale or forged submission was accepted`)
  }

  const wrongQuestion = liveTask.questions[0]
  const wrongId = wrongQuestion.options.find((option) => option.id !== wrongQuestion.correctId)?.id
  assert.ok(wrongId, `${id}: objective lacks a genuine alternative`)
  const wrong = submit(started, id, { ...correct, [wrongQuestion.id]: wrongId })
  assert.notEqual(wrong, started, `${id}: valid miss was not recorded`)
  assert.deepEqual(worldOf(wrong), worldOf(started), `${id}: miss cost time, health, money or progression`)
  for (const index of indices) assert.equal(canChoose(wrong, STORY[nodeId].options[index]), false)
  const replayWrong = submit(wrong, id, { ...correct, [wrongQuestion.id]: wrongId })
  assert.equal(replayWrong, wrong, `${id}: duplicate miss counted twice`)
  for (const question of liveTask.questions.slice(1)) {
    const otherWrong = question.options.find((option) => option.id !== question.correctId).id
    const oneFactMissed = submit(started, id, { ...correct, [question.id]: otherWrong })
    assert.equal(canChoose(oneFactMissed, STORY[nodeId].options[indices[0]]), false,
      `${id}: one correct fact bypassed the second required fact`)
  }
  const repaired = pass(wrong, id)
  assert.equal(repaired.storyLearningEvidence[id].firstResult.correct, false, `${id}: repair rewrote first failure`)
  assert.equal(repaired.storyLearningEvidence[id].independentCorrect, 0, `${id}: corrected repetition became independent proof`)
  for (const index of indices) assert.equal(canChoose(repaired, STORY[nodeId].options[index]), true)

  const passed = submit(started, id, correct)
  assert.deepEqual(worldOf(passed), worldOf(started), `${id}: success committed the choice prematurely`)
  assert.equal(submit(passed, id, correct), passed, `${id}: duplicate success counted twice`)
  if (id === 'guest-bread-request') {
    assert.equal(passed.storyLearningEvidence[id].firstResult.mode, 'supported', 'printed request became independent listening')
    assert.equal(passed.storyLearningEvidence[id].audioCompletions, 0, 'reading silently credited audio')
    const wrongAudio = reducer(started, event(started, id, 'STORY_LEARNING_AUDIO_COMPLETE', { audioKey: 'another-recording' }))
    assert.equal(wrongAudio, started, 'a different phrase completed the request recording')
    const heard = reducer(started, event(started, id, 'STORY_LEARNING_AUDIO_COMPLETE', { audioKey: liveTask.audio.key }))
    assert.equal(heard.storyLearningEvidence[id].audioCompletions, 1)
    assert.equal(reducer(heard, event(heard, id, 'STORY_LEARNING_AUDIO_COMPLETE', { audioKey: liveTask.audio.key })), heard,
      'duplicate completion inflated listening exposure')
  }
  for (const index of indices) {
    const option = STORY[nodeId].options[index]
    const availability = choiceLanguageAvailability(passed, option)
    assert.equal(availability.ok, true, `${id}: correct interpretation did not authorize action`)
    assert.deepEqual(availability.spendIds, [], `${id}: duplicate token cost remains`)
    const destination = commitProjectedOption(passed, option)
    assert.notEqual(destination, passed, `${id}: canonical choice rejected the completed encounter`)
    assert.equal(destination.nodeId, option.to, `${id}: choice went to an invented destination`)
    assert.ok(destination.actionSpeech, `${id}: accepted choice bypassed generated action speech`)
    assert.deepEqual(destination.mana, passed.mana, `${id}: choice spent word tokens`)
    assert.equal(reducer(destination, event(passed, id, 'SUBMIT_STORY_LEARNING', {
      response: { selections: correct },
    })), destination, `${id}: departed scene accepted a replay`)
  }

  const reloaded = normalizeSavedState(clone(passed), newRun())
  for (const index of indices) assert.equal(canChoose(reloaded, STORY[nodeId].options[index]), true,
    `${id}: valid saved permission was lost`)
  const editedSource = task.sourceLines[0].find((token) => token.id)
  const originalSurface = editedSource.al
  try {
    editedSource.al = `${originalSurface} editorial-change`
    const changedContext = { ...passed }
    assert.equal(choiceLanguageAvailability(changedContext, STORY[nodeId].options[indices[0]]).ok, false,
      `${id}: an edited source kept an obsolete permission`)
  } finally { editedSource.al = originalSurface }
  for (const dead of [false, true]) {
    const reset = reducer({ ...passed, ...(dead ? { hearts: 0 } : {}) }, { type: 'RESET' })
    assert.deepEqual(reset.storyLearningEvidence, passed.storyLearningEvidence, `${id}: restart erased practice history`)
    assert.equal(reset.storyLearningScene, null, `${id}: restart retained a world permission`)
    assert.ok(reset.storyRunSequence > passed.storyRunSequence)
  }
  checked += 1
}

{
  const id = 'guest-water-news'
  const guestId = 'guest-bread-request'
  const guestOption = STORY.sofraMikut2.options[10]
  const original = freshFixture(id, 'sofraMikut2', 8)
  const withNews = pass(original, id)
  const both = pass(withNews, guestId)
  for (const index of [8, 9, 10]) assert.equal(canChoose(both, STORY.sofraMikut2.options[index]), true,
    'opening a second response discarded a still-valid completed permission')
  const gaveBread = commitProjectedOption(both, guestOption)
  assert.equal(gaveBread.flags.gaveGuestBread, true)
  for (const index of [8, 9]) assert.equal(canChoose(gaveBread, STORY.sofraMikut2.options[index]), true,
    'giving bread forced the identical already-understood news task again')
  assert.deepEqual(gaveBread.storyLearningEvidence, both.storyLearningEvidence,
    'carrying unchanged understanding manufactured a new attempt or proof')
  const drink = STORY.sofraMikut2.options[2]
  const switched = commitProjectedOption(seedOptionProjection(withNews, drink), drink)
  assert.equal(storyLearningTaskForState(switched, id).sourceAvailable, false,
    'another topic left the old news source visible')
  assert.equal(canChoose(switched, STORY.sofraMikut2.options[8]), false,
    'a vanished source retained an actionable permission')
  const question = STORY.sofraMikut2.options[7]
  const reread = commitProjectedOption(seedOptionProjection(switched, question), question)
  assert.notEqual(reread, switched, 'the news could not be requested after another topic')
  assert.equal(storyLearningTaskForState(reread, id).sourceAvailable, true)
  const ready = pass(reread, id)
  for (const index of [8, 9]) assert.equal(canChoose(ready, STORY.sofraMikut2.options[index]), true)
  assert.equal(ready.storyLearningEvidence[id].independentCorrect, 1,
    'rereading a familiar report manufactured another independent proof')
}

{
  const id = 'market-bread-price'
  const option = STORY.tregtari.options[0]
  const original = freshFixture(id, 'tregtari', 0)
  const poor = { ...original, inventory: { ...original.inventory, lek: 99 } }
  assert.equal(canChoose(poor, option), false)
  const exact = { ...original, inventory: { ...original.inventory, lek: 100 } }
  const ready = pass(exact, id)
  const paid = commitProjectedOption(ready, option)
  assert.equal(paid.inventory.lek, 0)
  assert.equal(paid.inventory.buke, (exact.inventory.buke || 0) + 1)
  assert.equal(canChoose({ ...ready, inventory: { ...ready.inventory, lek: 99 } }, option), false,
    'completed reading bypassed money revalidation')
  const started = begin(exact, id)
  const poorer = { ...started, inventory: { ...started.inventory, lek: 99 } }
  assert.equal(submit(poorer, id, answers(storyLearningTaskForState(started, id))), poorer,
    'response accepted after canonical money became unavailable')
  const other = STORY.tregtari.options[1]
  assert.equal(choiceLanguageAvailability(ready, other).kind, 'lexical')
  assert.equal(canChoose(ready, other), false, 'bread permission authorized an unrelated action')
}

{
  const id = 'elira-later-meeting'
  const option = STORY.bisedaKroi.options[0]
  const original = freshFixture(id, 'bisedaKroi', 0)
  const scheduled = commitProjectedOption(pass(original, id), option)
  assert.equal(scheduled.nodeId, 'start', 'appointment comprehension teleported to the meeting')
  assert.equal(scheduled.clock, original.clock, 'appointment comprehension advanced world time')
  assert.equal(scheduled.rendezvous.eliraSquare.placeId, option.rendezvous.placeId)
  assert.equal(scheduled.rendezvous.eliraSquare.metAtClock, null, 'understanding a plan falsely kept the appointment')
  const started = begin(original, id)
  const nextDay = { ...started, clock: started.clock + 24 }
  assert.equal(submit(nextDay, id, answers(storyLearningTaskForState(started, id))), nextDay,
    'a stale relative-day response created a different appointment')
  // Internal hour zero is 06:00, so the civil date changes at clock18,
  // not at a multiple of24. The appointment must use its canonical clock.
  const beforeMidnight = begin({ ...original, clock: 17 }, id)
  const midnight = { ...beforeMidnight, clock: 18 }
  assert.equal(submit(midnight, id, answers(storyLearningTaskForState(beforeMidnight, id))), midnight,
    'crossing actual midnight reused yesterday’s meaning of tomorrow')
  const afterMidnight = pass({ ...original, clock: 18 }, id)
  assert.equal(choiceLanguageAvailability({ ...afterMidnight, clock: 24 }, option).ok, true,
    'internal simulation midnight incorrectly changed the civil appointment date')
}

const ui = readFileSync(new URL('../src/components/StoryLearningTask.jsx', import.meta.url), 'utf8')
assert.match(ui, /<TrainingActivityShell/, 'story encounter abandoned the shared card hierarchy')
assert.doesNotMatch(ui, /CEFR_RECORD_EVIDENCE|CEFR_PREPARATION_ATTEMPT/, 'public task credited held-out or caller-reviewed evidence')
const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
assert.doesNotMatch(app, /SPOKEN_ACTION_TYPES[^\n]*SUBMIT_STORY_LEARNING/, 'answer submission became a spoken world action')
console.log(`Story learning: ${checked} encounters, 5 canonical actions, exact responses, world constraints, retries, save and reset passed.`)
