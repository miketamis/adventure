// Guard the local, deterministic open-writing notice layer. Objective response
// floors can constrain task fulfilment; lexical notices cannot judge Albanian.

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { openResponseMetrics, performanceEvidenceFor, selfReviewedRubric } from '../src/game/cefrAssessment.js'
import { CEFR_TASKS } from '../src/game/cefrTasks.js'
import { PLAYABLE_FORM_INVENTORY } from '../src/game/formInventory.js'
import {
  OPEN_RESPONSE_CONNECTORS,
  analyzeOpenResponseFeedback,
  requiresA2WritingRevision,
  supportsOpenResponseFeedback,
  tokenizeOpenResponse,
} from '../src/game/openResponseFeedback.js'

const componentSource = readFileSync(new URL('../src/components/CefrCapstone.jsx', import.meta.url), 'utf8')
const feedbackSource = readFileSync(new URL('../src/game/openResponseFeedback.js', import.meta.url), 'utf8')

assert.deepEqual(tokenizeOpenResponse('MIRE\u0308, ÇANTË!'), ['mirë', 'çantë'],
  'tokenization must NFC-normalize Albanian diacritics and ignore punctuation')
assert.deepEqual(OPEN_RESPONSE_CONNECTORS, ['dhe', 'por', 'sepse'],
  'the connector notice set drifted away from the reviewed basic set')

const task = {
  id: 'audit-free-writing',
  level: 'A2',
  mode: 'writtenProduction',
  response: {
    kind: 'free-text',
    minimumWords: 6,
    minimumSentences: 2,
    minimumTurns: 2,
    focusSenseIds: ['fshat'],
  },
  requirements: [],
}
const response = 'Po shkoj në fshatin tim dhe jam mirë.\n\nPor blorf.'
const feedback = analyzeOpenResponseFeedback(response, task)
const expectedMetrics = openResponseMetrics(response, task.response)

assert.deepEqual(feedback.metrics, expectedMetrics,
  'feedback structure counts drifted from the assessment structure contract')
assert.ok(feedback.recognized.some(({ surface }) => surface === 'fshatin'),
  'a reviewed non-lemma noun form was not recognized')
assert.ok(PLAYABLE_FORM_INVENTORY.fshat.some(({ al }) => al === 'fshatin'),
  'the form-recognition fixture no longer exists in the production inventory')
assert.ok(feedback.unrecognized.some(({ surface }) => surface === 'blorf'),
  'an out-of-inventory spelling was silently treated as reviewed')
assert.equal(feedback.connectors.find(({ surface }) => surface === 'dhe').count, 1)
assert.equal(feedback.connectors.find(({ surface }) => surface === 'por').count, 1)
assert.equal(feedback.connectors.find(({ surface }) => surface === 'sepse').count, 0)
assert.equal(feedback.semanticAnchors.available, true)
assert.equal(feedback.semanticAnchors.anchors.find(({ senseId }) => senseId === 'fshat').present, true,
  'an explicitly authored sense anchor did not accept its reviewed inflected form')

const absentAnchors = analyzeOpenResponseFeedback('Jam këtu.', {
  ...task,
  response: { kind: 'free-text' },
  requirements: [{ acceptedSemanticConcepts: ['location:current'] }],
})
assert.equal(absentAnchors.semanticAnchors.available, false,
  'semantic concepts or prompt language were guessed into lexical anchors')
assert.equal(absentAnchors.semanticAnchors.anchors.length, 0)

const invalidAnchors = analyzeOpenResponseFeedback('Jam këtu.', {
  ...task,
  focusSenseIds: ['not-a-reviewed-sense'],
  response: { kind: 'free-text' },
})
assert.equal(invalidAnchors.semanticAnchors.available, false,
  'an unknown authored sense ID became a learner-facing anchor')
assert.equal(invalidAnchors.semanticAnchors.invalidAuthoredCount, 1)

assert.equal(supportsOpenResponseFeedback(task), true)
assert.equal(requiresA2WritingRevision(task), true)
assert.equal(requiresA2WritingRevision({ ...task, level: 'A1' }), false)
assert.equal(supportsOpenResponseFeedback({ ...task, response: { kind: 'short-relay' } }), false,
  'the new feedback path leaked into response kinds outside its reviewed scope')

const noAutomaticVerdict = JSON.stringify(feedback)
assert.doesNotMatch(noAutomaticVerdict, /"(?:correct|passed|failed|score)"\s*:/,
  'the advisory analyzer emitted an automatic language verdict')
assert.equal(Object.hasOwn(feedback, 'text'), false,
  'the analyzer retained a raw learner-text field')

const assessedTasks = CEFR_TASKS.filter(({ response: taskResponse }) =>
  ['free-text', 'free-text-exchange'].includes(taskResponse.kind))
assert.equal(assessedTasks.length, 20, 'the held-out open-writing bank changed without feedback review')
for (const assessed of assessedTasks) {
  const assessedAnchors = analyzeOpenResponseFeedback('', assessed).semanticAnchors
  assert.equal(assessedAnchors.available, true, `${assessed.id} has no safe authored lexical anchors`)
  assert.equal(assessedAnchors.invalidAuthoredCount, 0, `${assessed.id} exposes an invalid lexical anchor`)
  assert.deepEqual(assessedAnchors.anchors.map(({ senseId }) => senseId), assessed.focusSenseIds,
    `${assessed.id} feedback drifted from its explicitly reviewed anchor set`)
}
const assessedTask = assessedTasks.find(({ level }) => level === 'A2')
assert.ok(assessedTask, 'the held-out bank has no A2 writing task for the revision contract')

const rubric = selfReviewedRubric(assessedTask, {
  requirementChecks: {},
  dimensionChecks: {},
  structureMet: true,
})
const evidence = performanceEvidenceFor(assessedTask, rubric)[0]
assert.equal(JSON.stringify(evidence).includes('Jam këtu.'), false,
  'learner text entered persisted CEFR evidence')
assert.deepEqual(Object.keys(evidence).sort(), [
  'attempt', 'heldOut', 'level', 'mode', 'pronunciationPass', 'recordingCaptured', 'rubric',
  'taskFamily', 'taskId', 'variantId', 'windowId',
].sort(), 'writing evidence gained an unreviewed persistence field')

assert.match(feedbackSource, /import \{ DICT \} from ['"]\.\/dictionary\.js['"]/,
  'the analyzer does not consume the canonical dictionary')
assert.match(feedbackSource, /import \{ PLAYABLE_FORM_INVENTORY \} from ['"]\.\/formInventory\.js['"]/,
  'the analyzer does not consume the canonical reviewed-form inventory')
assert.doesNotMatch(feedbackSource, /\.en\b|acceptedSemanticConcepts|task\.prompt/,
  'the analyzer leaks English answers or guesses meaning from prompts/concept labels')
assert.match(componentSource, /Check, not automatically wrong/,
  'unknown spellings are not explicitly labelled as non-verdicts')
assert.match(componentSource, /No safe prompt-word anchors are authored for this task, so the game does not guess/,
  'the UI hides the current semantic-analysis boundary')
assert.match(componentSource, /requiresA2WritingRevision\(task\)/,
  'A2 writing does not consume the shared revision requirement')
assert.match(componentSource, /setPhase\(['"]first-feedback['"]\)/,
  'A2 writing can bypass its first advisory feedback stage')
assert.match(componentSource, /setPhase\(['"]revising['"]\)/,
  'A2 writing has no explicit revision stage')
assert.match(componentSource, /setRevisionCompleted\(true\)/,
  'finishing an A2 revision does not record the transient revision cycle')
assert.match(componentSource, /revisionRequired && !revisionCompleted/,
  'rubric submission is not guarded by the A2 revision cycle')
assert.ok(componentSource.indexOf('{feedback && <DraftFeedback') < componentSource.indexOf("{phase === 'self-review' && !submitted && ("),
  'draft feedback is not rendered before the self-review rubric')
assert.match(componentSource, /performanceEvidenceFor\(task, rubric\)/,
  'writing evidence is no longer restricted to task and rubric data')
const openResponseSaveBlock = componentSource.slice(
  componentSource.indexOf('const save = () => {', componentSource.indexOf('function OpenResponseTask')),
  componentSource.indexOf('const checkDraft = () => {', componentSource.indexOf('function OpenResponseTask')),
)
assert.doesNotMatch(openResponseSaveBlock, /feedback|metrics/,
  'advisory lexical feedback can pass or fail the CEFR rubric')
assert.match(openResponseSaveBlock, /structureMet: structureTargetsMet/,
  'objective word, sentence and turn floors do not constrain task fulfilment')
const practiceRevisionBlock = componentSource.slice(
  componentSource.indexOf('const startPracticeRevision = () => {'),
  componentSource.indexOf('return (', componentSource.indexOf('const finishPracticeRevision = () => {')),
)
assert.match(practiceRevisionBlock, /setPhase\(['"]practice-revising['"]\)/,
  'post-result revision does not enter an explicit practice-only phase')
assert.match(practiceRevisionBlock, /setAssessedDraft\(draft\)/,
  'practice revision cannot refresh the frozen advisory feedback surface')
assert.match(practiceRevisionBlock, /setPhase\(['"]practice-reviewed['"]\)/,
  'practice revision has no explicit finish-and-recheck state')
assert.doesNotMatch(practiceRevisionBlock, /onComplete|performanceEvidenceFor|dispatch|localStorage|sessionStorage|fetch\(/,
  'practice revision can overwrite gate evidence, persist, or transmit learner text')
assert.ok((componentSource.match(/phase === ['"]practice-revising['"]\s*\? draft/g) || []).length >= 2,
  'practice edits do not refresh both advisory metrics and lexical feedback')
assert.match(componentSource, /Finish and recheck practice revision/)
assert.match(componentSource, /No new readiness evidence was saved\./)
assert.doesNotMatch(componentSource, /performanceEvidenceFor\(task, rubric,\s*\{[^}]*draft/s,
  'the component passed learner text into persisted evidence')
assert.doesNotMatch(componentSource, /localStorage|sessionStorage|fetch\(/,
  'the capstone component stores or transmits learner drafts')

console.log('=== Aventura Shqip — open-response feedback ===')
console.log('✓ NFC reviewed-form and unknown-spelling notices use canonical language inventories')
console.log('✓ objective response floors constrain task fulfilment; lexical notices remain advisory')
console.log('✓ A2 writing requires notice → revision → self-review before rubric evidence')
console.log('✓ no learner text is persisted and no automatic Albanian score is invented')
