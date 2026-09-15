import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildDebugTrainActivity } from '../src/game/debugTrainActivity.js'
import { reviewedFormTargets } from '../src/game/formInventory.js'
import { newRun, reducer } from '../src/game/gameState.js'
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
