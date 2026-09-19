import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildDebugTrainActivity } from '../src/game/debugTrainActivity.js'
import { reviewedFormTargets } from '../src/game/formInventory.js'
import { newRun, normalizeSavedState, reducer } from '../src/game/gameState.js'
import { trainMissConsequence } from '../src/game/consequenceBuilders.js'
import { buildNounEndingRefresher } from '../src/game/nounEndingRefresher.js'
import { trainCorrectWillRestoreHeart, trainHealthPlanForQuestion, trainExposureKeysForQuestion } from '../src/game/trainHealthPolicy.js'
import { trainQuestionWordKeys } from '../src/game/phrasePractice.js'
import { reviewedNounFormMatchingPlan, NOUN_FORM_MATCHING_VARIANT } from '../src/game/nounFormMatching.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import { wordAspectEvidenceKey } from '../src/game/wordLearningAspects.js'

const forms = reviewedFormTargets('fshat')
const discoveredIds = [...new Set(forms.flatMap(({ context }) => context?.requires || []))]
const target = forms.find(({ role }) => role === 'defNom')
const progress = {
  wins: { 'meaning-recognition': 2 },
  activeFormKey: target.key,
  formProofs: {
    [target.key]: { wins: { 'reviewed-form-contrast': 1, 'grammatical-form-odd-one-out': 1 } },
  },
}

const plan = reviewedNounFormMatchingPlan(forms, discoveredIds, { currentRound: 10 })
assert.ok(plan, 'a complete reviewed fshat board cannot be built with every supporting word saved')
assert.equal(plan.rows.length, NOUN_FORM_MATCHING_VARIANT.pairCount)
assert.equal(new Set(plan.rows.map(({ formKey }) => formKey)).size, 5)
assert.equal(new Set(plan.rows.map(({ roleLabel }) => roleLabel)).size, 5,
  'a board has two indistinguishable grammatical-job answers')
assert.ok(plan.rows.every(({ formKey }) => forms.some((form) => form.key === formKey && form.id === 'fshat')),
  'a board mixed grammatical forms from more than one noun root')
assert.ok(plan.rows.every(({ context, surface, targetTokenIndex }) => {
  const token = context.split(/\s+/u)[targetTokenIndex]
  return token?.replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '')
    .localeCompare(surface, 'sq', { sensitivity: 'base' }) === 0
}), 'a matching context does not mark its exact noun occurrence')

assert.equal(
  reviewedNounFormMatchingPlan(forms, ['fshat'], { currentRound: 10 }),
  null,
  'a board exposed an Albanian supporting word that the learner has not saved',
)

const question = buildWordQuestion({
  discoveredIds,
  targetId: 'fshat',
  wordProgress: { fshat: progress },
  currentRound: 10,
  rng: () => 0.271828,
})
assert.ok(question, 'the real word builder cannot schedule same-root grammar matching')
assert.equal(question.wordStageId, 'noun-paradigm-matching')
assert.equal(question.variantId, NOUN_FORM_MATCHING_VARIANT.id)
assert.equal(question.formExerciseMode, 'same-root-grammar-matching')
assert.equal(question.kind, 'forms')
assert.equal(question.pairs.length, 5)
assert.deepEqual(question.rewardIds, ['fshat'], 'the five-pair board awards more than one target-word token')
assert.ok(question.pairs.every((pair) => !('english' in pair) && !('en' in pair)),
  'an active matching pair exposes a fluent English sentence translation')
assert.deepEqual(new Set(question.left.map(({ id }) => id)), new Set(question.right.map(({ id }) => id)))
assert.equal(question.aspectTargets.filter(({ evidenceMode }) => evidenceMode === 'write')[0]?.aspectId, 'noun-paradigm-matching')

let state = newRun()
for (const id of discoveredIds) state = reducer(state, { type: 'DISCOVER', id })
state = { ...state, trainRound: 10, wordProgress: { ...state.wordProgress, fshat: progress } }
const next = reducer(state, {
  type: 'PRACTICE_WORD_RESULT',
  correct: true,
  id: 'fshat',
  tier: question.tier,
  mode: question.mode,
  direction: question.dir,
  wordStageId: question.wordStageId,
  variantId: question.variantId,
  targetFormKey: null,
  aspectTargets: question.aspectTargets,
  questionKey: question.questionKey,
  wordKeys: [],
  attemptedAtMs: Date.now(),
  responseDurationMs: 1500,
})
assert.notStrictEqual(next, state, 'the reducer rejected the exact matching activity emitted by the builder')
assert.equal(next.wordProgress.fshat.aspectProofs[wordAspectEvidenceKey('noun-paradigm-matching')].wins, 1)
assert.equal(next.mana.fshat, (state.mana.fshat || 0) + 1)

const inspector = buildDebugTrainActivity(question, state)
assert.equal(inspector.family.id, 'word-forms')
assert.equal(inspector.question.variantId, NOUN_FORM_MATCHING_VARIANT.id)
assert.ok(inspector.occurrences.length >= 10, 'debug inspector omitted words from the five Albanian contexts')
assert.equal(inspector.question.distractorPolicy, question.distractorPolicy)

const component = readFileSync(new URL('../src/components/NounFormMatchingQuestion.jsx', import.meta.url), 'utf8')
const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
// Exercise the actual UI completion callback, including its source identifier,
// rather than duplicating a valid consequence that the UI might never send.
const completionBody = practice.match(/const onNounFormMatchComplete = useCallback\(\(result\) => \{([\s\S]*?)\n  \}, \[dispatch, q, scheduleNextQuestion, state\]\)/)?.[1]
assert.ok(completionBody, 'cannot exercise the production noun-matching completion handler')
const complete = new Function('result', 'state', 'q', 'dispatch', 'scheduleNextQuestion',
  'setAwaitingRecoveryContinue', 'trainCorrectWillRestoreHeart', 'trainHealthPlanForQuestion',
  'trainQuestionWordKeys', 'trainMissConsequence', 'buildNounEndingRefresher', completionBody)
const plakForms = reviewedFormTargets('plak')
const plakIds = [...new Set(plakForms.flatMap(({ context }) => context?.requires || []))]
const plakForm = plakForms.find(({ role }) => role === 'defNom')
const plakProgress = {
  ...progress,
  activeFormKey: plakForm.key,
  formProofs: { [plakForm.key]: { wins: { 'reviewed-form-contrast': 1, 'grammatical-form-odd-one-out': 1 } } },
}
const plakQuestion = buildWordQuestion({
  discoveredIds: plakIds, targetId: 'plak', wordProgress: { plak: plakProgress },
  currentRound: 10, rng: () => 0.271828,
})
assert.equal(plakQuestion?.formExerciseMode, 'same-root-grammar-matching')
let plakState = newRun()
for (const id of plakIds) plakState = reducer(plakState, { type: 'DISCOVER', id })
plakState = { ...plakState, trainRound: 10, wordProgress: { ...plakState.wordProgress, plak: plakProgress } }
const missCases = [{ question, state }, { question: plakQuestion, state: plakState }]
for (const { question, state } of missCases) {
  for (const exposed of [false, true]) {
    for (const correction of question.pairs) {
      const wrong = question.pairs.find(({ id }) => id !== correction.id)
      const before = {
        ...state,
        trainCorrectCombo: 8,
        trainStageExposures: exposed
          ? Object.fromEntries(trainExposureKeysForQuestion(question).map((key) => [key, 1]))
          : {},
      }
      let after = before
      const scheduled = []
      complete({
        correct: false, correction,
        selectedTargetId: correction.id, selectedOptionId: wrong.id,
        attempted: { context: correction.context, surface: correction.surface, roleLabel: wrong.roleLabel },
        attemptedAtMs: Date.now(), responseDurationMs: 1500,
      }, before, question, (action) => { after = reducer(after, action) },
      (delay) => scheduled.push(delay), () => {}, trainCorrectWillRestoreHeart,
      trainHealthPlanForQuestion, trainQuestionWordKeys, trainMissConsequence, buildNounEndingRefresher)
      assert.notStrictEqual(after, before, `${correction.id}: miss rejected, leaving the board locked`)
      assert.equal(after.hearts, before.hearts - (exposed ? 1 : 0))
      assert.equal(after.trainRound, before.trainRound + 1)
      assert.equal(after.trainCorrectCombo, 0)
      assert.deepEqual(after.mana, before.mana, 'a mismatch awarded a token')
      assert.equal(after.pendingHeartConsequence.attempted.en, wrong.roleLabel)
      assert.equal(after.pendingHeartConsequence.correction.al, correction.context)
      assert.equal(after.pendingHeartConsequence.correction.en, correction.roleLabel)
      assert.ok(after.pendingHeartConsequence.grammar.rows.length)
      assert.deepEqual(scheduled, [0], 'a miss did not request advancement after acknowledgement')
      const restored = normalizeSavedState(JSON.parse(JSON.stringify(after)), newRun())
      assert.deepEqual(restored.pendingHeartConsequence, after.pendingHeartConsequence)
      assert.strictEqual(reducer(restored, { type: 'SET_VIEW', view: 'story' }), restored)
      const resumed = reducer(restored, {
        type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: restored.pendingHeartConsequence.eventId,
      })
      assert.equal(resumed.pendingHeartConsequence, null)
      assert.equal(resumed.hearts, after.hearts)
    }
  }
}
assert.match(component, /Match each use of/)
assert.match(component, /targetTokenIndex/)
assert.match(component, /<mark/)
assert.match(component, /q\.surface/)
assert.doesNotMatch(component, /\.en\b|English sentence/,
  'the player-facing board renders a fluent English sentence answer')
assert.match(practice, /PRACTICE_WORD_RESULT/)
assert.match(practice, /wrong-noun-form-job-match/)
assert.match(practice, /buildNounEndingRefresher/)

console.log('✓ one-root noun grammar matching uses five reviewed contextual roles, one lemma proof, one reward and an exact correction path')
