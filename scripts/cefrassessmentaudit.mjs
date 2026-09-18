import assert from 'node:assert/strict'
import fs from 'node:fs'
import {
  canAnswerReceptionTask,
  CEFR_IMPLEMENTATION_BY_FAMILY,
  CEFR_SUPPORTED_RESPONSE_KINDS,
  CEFR_SUPPORTED_STIMULUS_KINDS,
  combineOpenResponseTurns,
  cefrProfile,
  cefrWindowIdForTask,
  mergeCefrEvidence,
  normalizeCefrState,
  openResponseMetrics,
  performanceEvidenceFor,
  receptionEvidenceFor,
  cefrListeningCompletionFor,
  cefrReceptionStimulusKey,
  selfReviewedRubric,
} from '../src/game/cefrAssessment.js'
import { evaluateControlledSelections } from '../src/game/controlledResponses.js'
import { CEFR_LEVEL_GATES } from '../src/game/cefrProgression.js'
import { CEFR_TASKS, CEFR_TASKS_BY_FAMILY } from '../src/game/cefrTasks.js'
import {
  mergeStoredCefrEvidence,
  normalizeStoredCefrEvidence,
} from '../src/game/cefrEvidenceState.js'
import { newRun, normalizeSavedState, reducer } from '../src/game/gameState.js'

const component = fs.readFileSync(new URL('../src/components/CefrCapstone.jsx', import.meta.url), 'utf8')
const practice = fs.readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
const gameState = fs.readFileSync(new URL('../src/game/gameState.js', import.meta.url), 'utf8')
const evidenceState = fs.readFileSync(new URL('../src/game/cefrEvidenceState.js', import.meta.url), 'utf8')

// Keep certification runnable on the repository's minimum supported Node 20.
// Map.groupBy is newer than that runtime, so this audit uses the equivalent
// explicit grouping instead of letting a local newer Node hide a CI failure.
const groupBy = (items, keyOf) => {
  const groups = new Map()
  for (const item of items) {
    const key = keyOf(item)
    groups.set(key, [...(groups.get(key) || []), item])
  }
  return groups
}

assert.deepEqual(
  [...new Set(CEFR_TASKS.map((task) => task.stimulus.kind))].sort(),
  [...CEFR_SUPPORTED_STIMULUS_KINDS].sort(),
  'the task bank contains a stimulus kind the capstone renderer has not declared',
)
assert.deepEqual(
  [...new Set(CEFR_TASKS.map((task) => task.response.kind))].sort(),
  [...CEFR_SUPPORTED_RESPONSE_KINDS].sort(),
  'the task bank contains a response kind the capstone renderer has not declared',
)
assert.ok(Object.keys(CEFR_TASKS_BY_FAMILY).every((family) =>
  CEFR_IMPLEMENTATION_BY_FAMILY[family] === 'implemented'),
'a task family was presented as playable before every declared kind was supported')

for (const level of ['A1', 'A2']) {
  for (const mode of ['listening', 'reading']) {
    const tasks = CEFR_TASKS.filter((task) => task.level === level && task.mode === mode)
    const windows = groupBy(tasks, cefrWindowIdForTask)
    assert.equal(windows.size, CEFR_LEVEL_GATES[level].reception.minimumDistinctWindows,
      `${level} ${mode} must use distinct held-out windows`)
    for (const [windowId, forms] of windows) {
      const questionForms = forms.reduce((count, task) => count + task.questions.length, 0)
      assert.ok(questionForms >= CEFR_LEVEL_GATES[level].reception.minimumFormsPerWindow,
        `${windowId} does not contain enough distinct question variants`)
    }
  }
}

const firstListening = CEFR_TASKS.find((task) => task.mode === 'listening')
const correctAnswers = Object.fromEntries(firstListening.questions.map((question) => [
  question.id,
  question.acceptedChoiceIds[0],
]))
const completedListening = cefrListeningCompletionFor(firstListening, true)
const correctReception = receptionEvidenceFor(firstListening, correctAnswers, { listeningCompletion: completedListening })
assert.equal(correctReception.length, firstListening.questions.length,
  'a fully heard, completely answered task lost its reception evidence')
assert.deepEqual(receptionEvidenceFor(firstListening, correctAnswers), [],
  'listening evidence was awarded without whole-clip completion')
for (const incomplete of [false, null, undefined, 'completed', 1]) {
  assert.equal(cefrListeningCompletionFor(firstListening, incomplete), null,
    'a non-completed audio result created listening provenance')
}
for (const completion of [
  null,
  { ...completedListening, completed: false },
  { ...completedListening, taskId: 'another-task' },
  { ...completedListening, audioKey: `${completedListening.audioKey}:stale` },
  Object.create(completedListening),
]) {
  assert.equal(canAnswerReceptionTask(firstListening, completion), false,
    'an incomplete, stale, cross-task or inherited audio receipt opened answers')
  assert.deepEqual(receptionEvidenceFor(firstListening, correctAnswers, { listeningCompletion: completion }), [],
    'invalid audio provenance awarded reception evidence')
}
assert.deepEqual(receptionEvidenceFor({ ...firstListening }, correctAnswers, { listeningCompletion: completedListening }), [],
  'a caller-supplied replacement task was accepted instead of the canonical bank record')
assert.notEqual(cefrReceptionStimulusKey(firstListening), cefrReceptionStimulusKey(CEFR_TASKS.find((task) =>
  task.mode === 'listening' && task.id !== firstListening.id)), 'different listening stimuli reused one completion key')

// Enumerate the production bank through the same closed-choice validator used
// by preparation and story actions. Invalid submissions must not record even
// a partial first-attempt event, which would consume a still-fresh task.
for (const task of CEFR_TASKS.filter((entry) => ['listening', 'reading'].includes(entry.mode))) {
  const selections = Object.fromEntries(task.questions.map((question) => [question.id, question.acceptedChoiceIds[0]]))
  const context = { listeningCompletion: cefrListeningCompletionFor(task, true) }
  assert.deepEqual(evaluateControlledSelections(task.questions, selections), { valid: true, correct: true, incorrectIds: [] }, task.id)
  assert.equal(receptionEvidenceFor(task, selections, context).length, task.questions.length, task.id)
  const [first] = task.questions
  const missing = { ...selections }
  delete missing[first.id]
  const extraHidden = Object.defineProperty({ ...selections }, 'hidden-slot', { value: first.acceptedChoiceIds[0] })
  const extraSymbol = { ...selections, [Symbol('slot')]: first.acceptedChoiceIds[0] }
  let getterReads = 0
  const accessor = Object.defineProperty({ ...selections }, first.id, { get: () => { getterReads += 1; return first.acceptedChoiceIds[0] } })
  for (const malformed of [null, [], 'answer', missing, { ...selections, extra: 'answer' },
    { ...selections, [first.id]: 'not-a-declared-choice' }, { ...selections, [first.id]: undefined },
    Object.create(selections), extraHidden, extraSymbol, accessor]) {
    assert.equal(evaluateControlledSelections(task.questions, malformed).valid, false, `${task.id}: malformed selections accepted`)
    assert.deepEqual(receptionEvidenceFor(task, malformed, context), [], `${task.id}: malformed selections consumed a form`)
  }
  assert.equal(getterReads, 0, `${task.id}: validation invoked a response getter`)
  assert.equal(evaluateControlledSelections(task.questions, Object.assign(Object.create(null), selections)).correct, true,
    `${task.id}: own null-prototype slots were rejected`)
  for (const question of task.questions) {
    const wrong = question.choices.find(({ id }) => !question.acceptedChoiceIds.includes(id))
    if (!wrong) continue
    const incorrect = { ...selections, [question.id]: wrong.id }
    assert.deepEqual(evaluateControlledSelections(task.questions, incorrect),
      { valid: true, correct: false, incorrectIds: [question.id] }, `${task.id}:${question.id}`)
    const evidence = receptionEvidenceFor(task, incorrect, context)
    assert.equal(evidence.filter(({ correct }) => !correct).length, 1, `${task.id}: wrong declared answer was not recorded exactly`)
  }
}
const [sampleQuestion] = firstListening.questions
for (const malformed of [[], [sampleQuestion, sampleQuestion],
  [{ ...sampleQuestion, choices: [] }],
  [{ ...sampleQuestion, choices: [...sampleQuestion.choices, sampleQuestion.choices[0]] }],
  [{ ...sampleQuestion, acceptedChoiceIds: [] }],
  [{ ...sampleQuestion, acceptedChoiceIds: ['undeclared-choice'] }],
  [{ ...sampleQuestion, acceptedChoiceIds: [sampleQuestion.acceptedChoiceIds[0], sampleQuestion.acceptedChoiceIds[0]] }],
  [{ ...sampleQuestion, acceptedChoiceIds: new Array(1) }],
]) assert.equal(evaluateControlledSelections(malformed, correctAnswers).valid, false, 'malformed controlled question schema accepted')
const failedFirst = correctReception.map((event) => ({ ...event, correct: false }))
const immutableFirstAttempt = mergeCefrEvidence(failedFirst, correctReception)
assert.ok(immutableFirstAttempt.every((event) => event.correct === false),
  'a revealed held-out form was able to replace its failed first evidence with a pass')
assert.ok(mergeCefrEvidence([], [...failedFirst, ...correctReception]).every((event) => event.correct === false),
  'duplicate results in one action were able to replace first held-out evidence')
assert.ok(correctReception.every((event) => event.questionKind && event.windowId),
  'reception evidence must carry question kind and stable window id')

const spoken = CEFR_TASKS.find((task) => task.mode === 'spokenProduction')
const passRubric = Object.fromEntries(spoken.rubric.dimensions.map((dimension) => [dimension, 2]))
assert.equal(performanceEvidenceFor(spoken, passRubric, {
  pronunciationPass: true,
  recordingCaptured: false,
})[0].pronunciationPass, false, 'pronunciation passed without a captured recording')
assert.equal(performanceEvidenceFor(spoken, passRubric, {
  pronunciationPass: true,
  recordingCaptured: true,
})[0].pronunciationPass, true, 'a captured, explicitly reviewed recording lost its pronunciation result')

const openTask = CEFR_TASKS.find((task) => task.mode === 'writtenProduction')
const noConceptChecks = selfReviewedRubric(openTask, {
  requirementChecks: {},
  dimensionChecks: Object.fromEntries(openTask.rubric.dimensions.map((dimension) => [dimension, true])),
  structureMet: true,
})
assert.ok(noConceptChecks.taskFulfilment < 2,
  'open production passed by form/keywords without checking its communicative concepts')
const everyRequirementChecked = Object.fromEntries(openTask.requirements.map(({ id }) => [id, true]))
const everyDimensionChecked = Object.fromEntries(openTask.rubric.dimensions.map((dimension) => [dimension, true]))
const oneTokenMetrics = openResponseMetrics('x', openTask.response)
const oneTokenRubric = selfReviewedRubric(openTask, {
  requirementChecks: everyRequirementChecked,
  dimensionChecks: everyDimensionChecked,
  structureMet: oneTokenMetrics.wordFloorMet && oneTokenMetrics.sentenceFloorMet && oneTokenMetrics.turnFloorMet,
})
assert.ok(oneTokenRubric.taskFulfilment < 2,
  'one token passed an A2 writing task by self-checking every box')

const stagedWrittenExchanges = CEFR_TASKS.filter((task) =>
  task.response.kind === 'free-text-exchange' && Number(task.response.requiredTurns) > 1)
assert.ok(stagedWrittenExchanges.length >= 2, 'the held-out bank has no live and reserve responsive written exchange')
for (const task of stagedWrittenExchanges) {
  assert.equal(task.stimulus.kind, 'incoming-note', `${task.id} does not begin from an incoming note`)
  assert.ok(task.stimulus.followUpSq?.length >= 25, `${task.id} has no authored Albanian follow-up`)
  const firstOnly = combineOpenResponseTurns(['Takohemi nesër në shesh.'])
  const completed = combineOpenResponseTurns([firstOnly, 'Po, ora nëntë është mirë.'])
  assert.equal(openResponseMetrics(firstOnly, task.response).turnFloorMet, false,
    `${task.id} passed before its second learner turn`)
  assert.equal(openResponseMetrics(completed, task.response).turnFloorMet, true,
    `${task.id} did not recognise two distinct learner turns`)
}

const allEvidence = CEFR_TASKS.flatMap((task) => {
  if (['listening', 'reading'].includes(task.mode)) {
    return receptionEvidenceFor(task, Object.fromEntries(task.questions.map((question) => [
      question.id,
      question.acceptedChoiceIds[0],
    ])), { listeningCompletion: cefrListeningCompletionFor(task, true) })
  }
  const rubric = Object.fromEntries(task.rubric.dimensions.map((dimension) => [dimension, 2]))
  return performanceEvidenceFor(task, rubric, {
    pronunciationPass: true,
    recordingCaptured: ['spokenInteraction', 'spokenProduction'].includes(task.mode),
  })
})
const fullProfile = cefrProfile(allEvidence)
assert.equal(fullProfile.A1.passed, true, 'complete non-compensatory A1 evidence did not pass A1')
assert.equal(fullProfile.A2.passed, true, 'complete non-compensatory A2 evidence did not pass A2 after A1')
const missingReading = allEvidence.filter((event) => !(event.level === 'A1' && event.mode === 'reading'))
const incompleteProfile = cefrProfile(missingReading)
assert.equal(incompleteProfile.A1.passed, false, 'another strong mode compensated for missing A1 reading')
assert.equal(incompleteProfile.A1.modes.reading.passed, false, 'missing A1 reading mode was marked passed')
assert.equal(incompleteProfile.A2.passed, false, 'A2 opened before its A1 prerequisite')

assert.deepEqual(normalizeCefrState({ cefrEvidenceVersion: -1, cefrEvidence: allEvidence }).cefrEvidence, [],
  'unknown evidence versions must migrate conservatively')
const forged = {
  ...correctReception[0],
  taskId: 'a1-not-a-current-task',
  variantId: 'a1-not-a-current-task:gist',
}
assert.equal(normalizeStoredCefrEvidence([forged]).length, 1,
  'the task-bank-free persistence layer unexpectedly depends on current authored tasks')
assert.deepEqual(normalizeCefrState({
  cefrEvidenceVersion: 1,
  cefrEvidence: [forged],
}).cefrEvidence, [], 'task-aware assessment accepted evidence outside the held-out bank')
assert.equal(mergeStoredCefrEvidence(failedFirst, correctReception)[0].correct, false,
  'the compact persistence merge allowed later practice to replace first evidence')

let persisted = reducer(newRun(), { type: 'CEFR_RECORD_EVIDENCE', evidence: failedFirst })
persisted = reducer(persisted, { type: 'CEFR_RECORD_EVIDENCE', evidence: correctReception })
const reloaded = normalizeSavedState(JSON.parse(JSON.stringify(persisted)), newRun())
assert.ok(normalizeCefrState(reloaded).cefrEvidence.every(({ correct }) => correct === false),
  'reload changed immutable first-attempt evidence')
const restarted = reducer(reloaded, { type: 'RESET' })
assert.ok(normalizeCefrState(restarted).cefrEvidence.every(({ correct }) => correct === false),
  'story reset discarded or rewrote CEFR evidence')

assert.doesNotMatch(gameState, /from ['"]\.\/cefrAssessment\.js['"]/,
  'the first-play game-state module imports the held-out task bank')
assert.match(gameState, /from ['"]\.\/cefrEvidenceState\.js['"]/,
  'game state is not using the compact synchronous CEFR evidence boundary')
assert.doesNotMatch(evidenceState, /from ['"].*(?:cefrAssessment|cefrTasks)|\bCEFR_TASKS\b/,
  'the compact CEFR evidence boundary imports task-bank code')
const cefrReducerBlock = gameState.slice(
  gameState.indexOf("case 'CEFR_RECORD_EVIDENCE'"),
  gameState.indexOf("case 'PRACTICE_PHRASE_RESULT'"),
)
assert.ok(cefrReducerBlock.includes('mergeStoredCefrEvidence') &&
  !/\bhearts\b|\bmana\b|\bpracticed\b/.test(cefrReducerBlock),
'capstone evaluation changed hearts, tokens or ordinary Train progress')

assert.ok(practice.includes('<CefrCapstone') && practice.includes('<CefrEntry'),
  'Train does not expose the separated readiness journey and ordinary entry panel')
assert.ok(component.includes("level === 'A2' && !profile.A1.passed") && component.includes('disabled={locked}'),
  'A2 is not locked behind the live A1 gate')
assert.ok(component.includes('playPhrase(task.stimulus.scriptSq)') &&
  !component.includes('{task.stimulus.scriptSq}') &&
  component.includes('No transcript or translation is revealed.'),
'listening leaks its transcript/translation or does not use continuous audio')
const receptionRenderer = component.slice(component.indexOf('function ReceptionTask('), component.indexOf('function Stimulus('))
assert.match(receptionRenderer, /const selection = evaluateControlledSelections\(task\.questions, answers\)/,
  'reception controls drifted from the shared controlled response validator')
assert.match(receptionRenderer, /const canAnswer = canAnswerReceptionTask\(task, listeningCompletion\)/,
  'reception renderer does not use the same audio completion gate as evidence creation')
assert.match(receptionRenderer, /if \(completed === true\) \{\s*setListeningCompletion\(cefrListeningCompletionFor\(task, completed\)\)/,
  'a playback click or failed playback can open reception answers')
assert.match(receptionRenderer, /\{canAnswer && <div className="cefr-reception-questions">/,
  'listening answers are exposed before successful continuous playback')
assert.match(receptionRenderer, /if \(!selection\.valid \|\| !canAnswer \|\| playing \|\| submitted\) return/,
  'submission can run while audio is incomplete or responses are malformed')
assert.match(receptionRenderer, /disabled=\{!selection\.valid \|\| !canAnswer \|\| playing \|\| submitted\}/,
  'the submit button disagrees with canonical reception eligibility')
assert.match(receptionRenderer, /receptionEvidenceFor\(task, answers, \{ listeningCompletion \}\)/,
  'renderer did not forward its exact completed stimulus provenance')
assert.match(receptionRenderer, /if \(evidence\.length !== task\.questions\.length\) return/,
  'an empty rejected evidence result can masquerade as successful completion')
assert.match(component, /<ReceptionTask key=\{cefrReceptionStimulusKey\(task\)\}/,
  'changing a task or its exact stimulus fails to reset its selections and playback completion')
assert.ok(component.includes('lang="sq">{task.stimulus.textSq}') &&
  component.includes('lang="sq">{stimulus.sourceSq}'),
'reading and mediation do not preserve their Albanian-only source surface')
assert.ok(component.includes('new MediaRecorder(stream)') &&
  component.includes('URL.createObjectURL(blob)') &&
  component.includes('getTracks().forEach((track) => track.stop())') &&
  !component.includes('fetch(') && !component.includes('localStorage'),
'speech capture is not tab-local/private by design')
assert.ok(component.includes('recordingCaptured: recordings.length >= neededRecordings') &&
  component.includes('supportive Albanian listener'),
'spoken evidence is not tied to capture and an explicit intelligibility self-check')
assert.ok(component.includes('setFirstDraft(completedDraft)') &&
  component.indexOf('<ReviewedAlternatives task={task} />') > component.indexOf('submitted &&'),
'reviewed alternatives can contaminate the frozen held-out writing attempt')
assert.ok(component.includes('setSentTurns((current) => [...current, draft.trim()])') &&
  component.includes('task.stimulus.followUpSq') &&
  component.includes("sentTurns.length < requiredTurns - 1"),
'responsive written interaction reveals no authored second turn after the first learner reply')
assert.match(component, /stagedExchange && sentTurns\.length > 0 && \(/,
  'the authored written follow-up is not gated behind the first sent learner turn')
assert.doesNotMatch(component, /sentTurns\.length > 0 && phase === ['"]writing['"] && \(\s*<blockquote className="cefr-written-stimulus cefr-follow-up"/,
  'the interlocutor follow-up disappears before feedback and revision are complete')
assert.ok(component.includes('structureMet: structureTargetsMet'),
  'the open-writing save path ignores its objective structural floor')
assert.ok(component.includes('ref={followUpRef}') && component.includes('ref={feedbackRef}') &&
  component.includes('ref={selfReviewRef}') && component.includes('draftRef.current'),
'phase-changing writing controls do not move focus to the newly available work')
assert.ok(component.includes('{state.debug && <> Debug gate:') &&
  component.includes('Strength in one mode cannot hide a missing mode.') &&
  component.includes('internal all-mode readiness profile'),
'normal readiness UI exposes raw gate counters or fails to explain the all-mode gate')

console.log('=== Aventura Shqip — CEFR assessment engine ===')
console.log(`${CEFR_TASKS.length} held-out tasks · ${Object.keys(CEFR_TASKS_BY_FAMILY).length} rendered families · 7 non-compensatory modes per level`)
console.log('✓ stable reception windows, immutable first evidence and A1-before-A2 gates')
console.log('✓ open responses use communicative self-review, not exact sentence matching')
console.log('✓ speech evidence requires local capture; drafts and audio never enter saved evidence')
console.log('✓ listening remains audio-only before and after the attempt')
console.log('✅ local-first A1/A2 capstone engine is internally coherent')
