// Live learning is an exact permission for a canonical action, never a token,
// CEFR capstone pass, payment, appointment or story movement by itself.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { STORY, lineOf } from '../src/game/content.js'
import { STORY_LEARNING_ENCOUNTERS, STORY_LEARNING_BY_ID, storyLearningBindingForOption, storyLearningSourceIds } from '../src/game/storyLearning.js'
import { CEFR_PREPARATION_MECHANICS } from '../src/game/cefrPreparation.js'
import { npcIdentityKnowledgeId } from '../src/game/npcIdentity.js'
import {
  canChoose, choiceLanguageAvailability, isOptionRevealed, newRun, normalizeSavedState, reducer,
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
const authoredSources = Object.entries(STORY).flatMap(([nodeId, node]) => node.text.flatMap((authored) => {
  const source = lineOf(authored).storyLearningSource
  if (!source) return []
  const entry = STORY_LEARNING_BY_ID[source.encounterId]
  assert.equal(entry?.nodeId, nodeId, `${nodeId}: orphan or misplaced learning source ${source.encounterId}`)
  assert.ok(entry.sourceIds.includes(source.sourceId), `${nodeId}: unknown source ${source.sourceId}`)
  return [`${source.encounterId}:${source.sourceId}`]
}))
assert.equal(new Set(authoredSources).size, authoredSources.length, 'authored learning source IDs are not unique')
assert.deepEqual(authoredSources.sort(), STORY_LEARNING_ENCOUNTERS.flatMap((entry) =>
  entry.sourceIds.map((id) => `${entry.id}:${id}`)).sort(), 'a declared learning source is absent')

for (const entry of STORY_LEARNING_ENCOUNTERS) {
  assert.deepEqual(entry.sourceIds, entry.sourceSlots.flat(), `${entry.id}: source IDs drifted from slots`)
  assert.equal(entry.minimumSourceLines, entry.sourceSlots.length, `${entry.id}: source count drifted from slots`)
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

// The visible source variant, not merely the authored bank or line count,
// owns a scene permission. Historical practice is immutable across changes.
let sourceCases = 0
{
  const id = 'guest-water-news'
  const entry = STORY_LEARNING_BY_ID[id]
  const original = { ...freshFixture(id, 'sofraMikut2', 8), worldFacts: {} }
  const variants = [
    [{}, false, ['news-unknown', 'elder-knows', 'traveller-advice', 'elira-advice']],
    [{}, true, ['news-known', 'elder-knows', 'traveller-advice', 'elira-advice']],
    [{ villageWellsRestored: true }, false, ['news-restored-unknown', 'elder-knows-restored', 'traveller-advice', 'elira-advice']],
    [{ villageWellsRestored: true }, true, ['news-restored-known', 'elder-knows-restored', 'traveller-advice', 'elira-advice']],
    [{ droughtBroken: true }, false, ['news-restored-unknown', 'elder-knows-restored', 'traveller-advice', 'elira-advice']],
    [{ droughtBroken: true }, true, ['news-restored-known', 'elder-knows-restored', 'traveller-advice', 'elira-advice']],
  ]
  for (const [worldFacts, named, expectedIds] of variants) {
    const state = { ...original, worldFacts, knowledge: { ...original.knowledge,
      ...(named ? { [npcIdentityKnowledgeId('gjonMik')]: true } : {}) } }
    const task = storyLearningTaskForState(state, id)
    assert.deepEqual(storyLearningSourceIds(entry, task.sourceLines), expectedIds, 'wrong live water-news slots')
    const completed = pass(state, id)
    assert.deepEqual(worldOf(completed), worldOf(state), 'water-news response changed the world or learner proofs')
    for (const index of [8, 9]) {
      const option = STORY.sofraMikut2.options[index]
      assert.equal(choiceLanguageAvailability(completed, option).ok, true,
        'understanding restored-water news scored the player’s opinion')
      assert.equal(isOptionRevealed(completed, option), true, `${expectedIds[0]}: opinion points at a hidden source variant`)
      const destination = commitProjectedOption(completed, option)
      assert.notEqual(destination, completed, `${expectedIds[0]}: actual opinion choice was rejected`)
      assert.equal(destination.nodeId, option.to, `${expectedIds[0]}: opinion went to the wrong consequence`)
      assert.ok(destination.actionSpeech, `${expectedIds[0]}: accepted opinion skipped its recorded speech`)
    }
    assert.equal(storyLearningTaskForState(normalizeSavedState(clone(completed), newRun()), id).episode?.phase, 'complete',
      'unchanged visible water-news variant lost valid completion on reload')
    sourceCases++
  }
  const started = begin(original, id)
  const task = storyLearningTaskForState(started, id)
  const correct = answers(task)
  const wrong = { ...correct, problem: 'road-closed' }
  const failed = submit(started, id, wrong)
  const helped = reducer(started, event(started, id, 'REVEAL_STORY_LEARNING_SUPPORT', { supportId: 'word-help' }))
  const debugged = begin(reducer(reducer(original, { type: 'TOGGLE_DEBUG' }), { type: 'TOGGLE_DEBUG' }), id)
  const legacySave = clone(original)
  delete legacySave.storyLearningVersion
  const legacy = begin(normalizeSavedState(legacySave, newRun()), id)
  const phases = [started, helped, debugged, legacy, failed, submit(started, id, correct), pass(failed, id)]
  const changes = [
    ['restored', (state) => ({ ...state, worldFacts: { ...state.worldFacts, villageWellsRestored: true } }), false],
    ['legacy restoration', (state) => ({ ...state, worldFacts: { ...state.worldFacts, droughtBroken: true } }), false],
    ['known speaker', (state) => ({ ...state, knowledge: { ...state.knowledge, [npcIdentityKnowledgeId('gjonMik')]: true } }), false],
    ['resolved', (state) => ({ ...state, worldFacts: { ...state.worldFacts, kulshedraDefeated: true } }), true],
    ['restored and resolved', (state) => ({ ...state, worldFacts: { ...state.worldFacts, villageWellsRestored: true, kulshedraDefeated: true } }), true],
  ]
  for (const phase of phases) for (const [label, change, retired] of changes) {
    const staleSubmit = event(phase, id, 'SUBMIT_STORY_LEARNING', { response: { selections: correct } })
    const history = clone(phase.storyLearningEvidence)
    for (const reload of [false, true]) {
      const changed = change(phase)
      const state = reload ? normalizeSavedState(clone(changed), newRun()) : changed
      const live = storyLearningTaskForState(state, id)
      assert.equal(live.episode, null, `${label}: an old phase survived changed source${reload ? ' and reload' : ''}`)
      assert.equal(live.sourceAvailable, !retired, `${label}: wrong source availability`)
      assert.equal(reducer(state, staleSubmit), state, `${label}: stale submit changed state`)
      for (const index of [8, 9]) {
        assert.equal(choiceLanguageAvailability(state, STORY.sofraMikut2.options[index]).kind, 'encounter')
        assert.equal(canChoose(state, STORY.sofraMikut2.options[index]), false, `${label}: stale permission opened an opinion`)
        assert.equal(commitProjectedOption(state, STORY.sofraMikut2.options[index]), state, `${label}: stale choice committed`)
      }
      assert.deepEqual(state.storyLearningEvidence, history, `${label}: invalidation rewrote durable history`)
      if (reload) assert.equal(state.storyLearningScene, null, `${label}: reload retained stale scene permission`)
      if (retired) {
        assert.equal(live.sourceLines.length, 0, `${label}: retired crisis kept tagged source material`)
        assert.equal(reducer(state, event(state, id, 'BEGIN_STORY_LEARNING')), state, `${label}: retired task began`)
        assert.ok(storyLearningTaskForState(state, 'guest-bread-request').sourceAvailable, `${label}: retirement erased bread practice`)
      } else {
        const restarted = begin(state, id)
        const current = storyLearningTaskForState(restarted, id)
        assert.notEqual(current.episode.attemptId, staleSubmit.attemptId, `${label}: new context reused an old attempt`)
        assert.equal(reducer(restarted, staleSubmit), restarted, `${label}: old event scored the fresh attempt`)
        assert.deepEqual(current.episode.previousSelections, {}, `${label}: stale answers leaked into the new source`)
        const completed = submit(restarted, id, answers(current))
        if (history[id].firstResult) assert.deepEqual(completed.storyLearningEvidence[id].firstResult, history[id].firstResult,
          `${label}: later source rewrote the first result`)
        assert.equal(completed.storyLearningEvidence[id].independentCorrect, history[id].firstResult
          ? history[id].independentCorrect : completed.storyLearningEvidence[id].firstResult.mode === 'independent' ? 1 : 0,
        `${label}: a new variant manufactured another independent proof`)
        for (const supportId of history[id].supportIds) assert.ok(completed.storyLearningEvidence[id].supportIds.includes(supportId),
          `${label}: source change erased ${supportId} support history`)
      }
      sourceCases++
    }
  }
  const completed = submit(started, id, correct)
  for (const fact of ['hearthsRelit', 'riverRestored', 'fieldsWatered', 'rainReturned', 'binoshetKulshedraDefeated', 'krujeKulshedraDefeated']) {
    const state = { ...completed, worldFacts: { ...completed.worldFacts, [fact]: true } }
    assert.equal(storyLearningTaskForState(state, id).contextKey, storyLearningTaskForState(completed, id).contextKey,
      `${fact}: unrelated fact changed the same news context`)
    assert.equal(storyLearningTaskForState(state, id).episode?.phase, 'complete', `${fact}: unrelated fact erased permission`)
    sourceCases++
  }
  const oldContext = clone(completed)
  oldContext.storyLearningScene.episodes[id].contextKey = `${id}:v1:prior-authored-content:reported-water:elira-elder-first`
  oldContext.storyLearningEvidence[id].firstResult.contextKey = oldContext.storyLearningScene.episodes[id].contextKey
  const oldHistory = clone(oldContext.storyLearningEvidence)
  const oldReload = normalizeSavedState(oldContext, newRun())
  assert.equal(oldReload.storyLearningScene, null, 'pre-edit context survived new source binding')
  assert.deepEqual(oldReload.storyLearningEvidence, oldHistory, 'pre-edit permission invalidation erased historical context or history')

  // Direct malformed projections exercise the shared production validator;
  // the following authored mutations also exercise warm runtime caches.
  const lines = task.sourceLines
  const known = STORY.sofraMikut2.text.map(lineOf).find((line) => line.storyLearningSource?.sourceId === 'news-known')
  for (const malformed of [null, [], lines.slice(1), [...lines, lines[0]],
    [lines[0], lines[0], lines[2], lines[3]], [lines[0], known, lines[2], lines[3]],
    [lines[1], lines[0], lines[2], lines[3]], [Array.from(lines[0]), ...lines.slice(1)]]) {
    assert.equal(storyLearningSourceIds(entry, malformed), null, 'malformed projected passage passed source slots')
    sourceCases++
  }
  for (const sourceSlots of [[], [null], [['news-unknown'], ['news-unknown']], [['unknown-source']]]) {
    assert.equal(storyLearningSourceIds({ ...entry, sourceSlots }, lines), null, 'malformed slot registry accepted a source')
  }
  const node = STORY.sofraMikut2
  const authored = node.text
  const sourceIdOf = (line) => lineOf(line).storyLearningSource?.sourceId
  const copyTagged = (sourceId) => {
    const line = Object.assign(lines[0].map((token) => ({ ...token })), {
      storyLearningSource: { encounterId: id, sourceId },
    })
    line[0].al += ' different-authored-variant'
    return { cond: 'flag:audit-hidden-source', line }
  }
  const mutations = [
    ['duplicate hidden ID', () => [...authored, copyTagged('news-unknown')]],
    ['unknown hidden ID', () => [...authored, copyTagged('unknown-source')]],
    ['missing declared ID', () => authored.filter((line) => sourceIdOf(line) !== 'news-known')],
    ['missing visible slot', () => authored.map((line) => sourceIdOf(line) === 'elder-knows'
      ? { cond: 'flag:audit-hidden-source', line: lineOf(line) } : line)],
    ['four lines in wrong slots', () => authored.map((line) => ['news-unknown', 'news-known'].includes(sourceIdOf(line))
      ? lineOf(line) : sourceIdOf(line) === 'elder-knows' ? { cond: 'flag:audit-hidden-source', line: lineOf(line) } : line)],
    ['fifth visible line', () => authored.map((line) => sourceIdOf(line) === 'news-known' ? lineOf(line) : line)],
    ['wrong source order', () => {
      const changed = [...authored]
      const first = changed.findIndex((line) => sourceIdOf(line) === 'traveller-advice')
      const second = changed.findIndex((line) => sourceIdOf(line) === 'elira-advice')
      const prior = changed[first]
      changed[first] = changed[second]
      changed[second] = prior
      return changed
    }],
  ]
  for (const [label, mutate] of mutations) {
    assert.equal(storyLearningTaskForState(completed, id).episode?.phase, 'complete', `${label}: fixture was not warm`)
    try {
      node.text = mutate()
      for (const state of [completed, { ...completed }]) {
        const invalid = storyLearningTaskForState(state, id)
        assert.equal(invalid.sourceAvailable, false, `${label}: malformed source was available`)
        assert.equal(invalid.contextKey, null, `${label}: malformed source had context`)
        assert.equal(invalid.episode, null, `${label}: warm cache retained completed permission`)
        assert.equal(reducer(state, event(state, id, 'BEGIN_STORY_LEARNING')), state, `${label}: malformed source began an attempt`)
        assert.equal(reducer(state, event(completed, id, 'SUBMIT_STORY_LEARNING', { response: { selections: correct } })), state,
          `${label}: malformed source accepted a response`)
        assert.equal(commitProjectedOption(state, STORY.sofraMikut2.options[8]), state, `${label}: malformed source authorized an action`)
        assert.deepEqual(state.storyLearningEvidence, completed.storyLearningEvidence, `${label}: malformed source altered history`)
      }
      sourceCases++
    } finally { node.text = authored }
  }
  assert.equal(storyLearningTaskForState(completed, id).episode?.phase, 'complete', 'restored authored source failed warm-cache recovery')
  // An equal authored replacement has the same content identity but must not
  // leave the projection or task cache pointing at a retired line array.
  const replacement = Object.assign([...lines[0]], lines[0])
  try {
    node.text = authored.map((line) => lineOf(line) === lines[0]
      ? Array.isArray(line) ? replacement : { ...line, line: replacement } : line)
    const refreshed = storyLearningTaskForState(completed, id)
    assert.equal(refreshed.sourceLines[0], replacement, 'equal source replacement retained a retired cached array')
    assert.equal(refreshed.episode?.phase, 'complete', 'equal source replacement lost the same content permission')
    sourceCases++
  } finally { node.text = authored }
  assert.equal(storyLearningTaskForState(completed, id).sourceLines[0], lines[0], 'source cache failed exact-array restoration')
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
console.log(`Story learning: ${checked} encounters, 5 canonical actions, ${sourceCases} source-context cases, exact responses, world constraints, retries, save and reset passed.`)
