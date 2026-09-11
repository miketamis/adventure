import assert from 'node:assert/strict'
import fs from 'node:fs'
import {
  CEFR_IMPLEMENTATION_BY_FAMILY,
  CEFR_SUPPORTED_RESPONSE_KINDS,
  CEFR_SUPPORTED_STIMULUS_KINDS,
  cefrProfile,
  cefrWindowIdForTask,
  mergeCefrEvidence,
  normalizeCefrState,
  performanceEvidenceFor,
  receptionEvidenceFor,
  selfReviewedRubric,
} from '../src/game/cefrAssessment.js'
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
const correctReception = receptionEvidenceFor(firstListening, correctAnswers)
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

const allEvidence = CEFR_TASKS.flatMap((task) => {
  if (['listening', 'reading'].includes(task.mode)) {
    return receptionEvidenceFor(task, Object.fromEntries(task.questions.map((question) => [
      question.id,
      question.acceptedChoiceIds[0],
    ])))
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
assert.ok(component.includes('setFirstDraft(draft)') &&
  component.indexOf('<ReviewedAlternatives task={task} />') > component.indexOf('submitted &&'),
'reviewed alternatives can contaminate the frozen held-out writing attempt')
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
