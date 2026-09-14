import assert from 'node:assert/strict'
import { reviewedFormTargets, wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import {
  REVIEWED_FORM_ODD_ONE_OUT_VARIANT,
  reviewedFormOddOneOutPlan,
  reviewedFormOddOneOutPlans,
} from '../src/game/reviewedFormOddOneOut.js'
import { TRAIN_EXERCISE_EXAMPLES } from '../src/game/trainingExampleRegistry.js'
import { buildNounOddOneOutRefresher } from '../src/game/nounEndingRefresher.js'
import { trainMissConsequence } from '../src/game/consequenceBuilders.js'
import { normalizeHeartConsequence } from '../src/game/heartConsequences.js'
import {
  WORD_ASPECT_REGISTRY_VERSION,
  normalizeWordProgress,
} from '../src/game/wordProgression.js'

const forms = reviewedFormTargets('fshat')
const target = forms.find(({ role }) => role === 'indefNom')
const plans = reviewedFormOddOneOutPlans(forms, target)
assert.deepEqual(new Set(plans.map(({ dimension }) => dimension)), new Set(['number', 'definiteness']))
for (const plan of plans) {
  assert.equal(plan.rows.length, 4)
  assert.equal(plan.rows.filter(({ odd }) => odd).length, 1)
  assert.equal(new Set(plan.rows.map(({ surface }) => surface.toLocaleLowerCase('sq'))).size, 4)
  assert.equal(plan.rows.find(({ odd }) => odd).category, plan.targetCategory)
  assert.ok(plan.rows.filter(({ odd }) => !odd).every(({ category }) => category === plan.matchingCategory))
  assert.notEqual(plan.targetCategory, plan.matchingCategory)
}

// `rrugë` is both a reviewed singular and plural surface, so it must not be
// eligible as the scored exception in a number contrast.
const roadForms = reviewedFormTargets('rruge')
const syncreticRoad = roadForms.find(({ surface, role }) => surface === 'rrugë' && role === 'indefNom')
assert.equal(
  reviewedFormOddOneOutPlans(roadForms, syncreticRoad).some(({ dimension }) => dimension === 'number'),
  false,
  'a singular/plural syncretic surface was made an answer-safe number contrast',
)

const progressionOptions = wordProgressionOptionsForSense('fshat')
const activeForm = progressionOptions.reviewedForms.find(({ role }) => role === 'indefNom')
const progress = normalizeWordProgress({
  aspectRegistryVersion: WORD_ASPECT_REGISTRY_VERSION,
  activeFormKey: activeForm.key,
  aspectProofs: {
    'lemma|lexical-meaning-recognition': { wins: 2, attempts: 2, correctAttempts: 2 },
    [`form:${activeForm.key}|grammatical-form-recognition`]: { wins: 1, attempts: 1, correctAttempts: 1 },
  },
})
const discoveredIds = [...new Set(['fshat', ...activeForm.context.requires])]
const question = buildWordQuestion({
  discoveredIds,
  targetId: 'fshat',
  wordProgress: { fshat: progress },
  currentRound: 4,
  rng: () => 0.25,
  debugTrace: true,
})
assert.equal(question.wordStageId, 'grammatical-form-odd-one-out')
assert.equal(question.variantId, REVIEWED_FORM_ODD_ONE_OUT_VARIANT.id)
assert.equal(question.formExerciseMode, 'form-odd-one-out')
assert.equal(question.options.length, 4)
assert.equal(question.options.filter(({ odd }) => odd).length, 1)
assert.equal(question.answerValue, activeForm.key)
assert.match(question.distractorPolicy, new RegExp(question.oddOneOut.dimension))
assert.match(question.distractorPolicy, new RegExp(question.oddOneOut.matchingCategory))
assert.match(question.distractorPolicy, new RegExp(question.oddOneOut.targetCategory))
assert.deepEqual(
  question.aspectTargets.filter(({ evidenceMode }) => evidenceMode === 'write').map(({ aspectId }) => aspectId),
  ['grammatical-form-odd-one-out'],
)
assert.ok(question.options.every(({ role, category }) => role && category), 'an option was not derived from an exact reviewed role')
const chosen = question.options.find(({ odd }) => !odd)
const refresher = buildNounOddOneOutRefresher('fshat', question.oddOneOut, chosen.value)
assert.ok(refresher, 'wrong odd-one-out choice did not build a refresher')
assert.equal(refresher.rows.length, forms.length, 'odd-one-out refresher omitted reviewed form roles')
assert.equal(refresher.rows.filter(({ inQuestion }) => inQuestion).length, 4, 'the four tested forms are not marked')
assert.equal(refresher.rows.filter(({ selected }) => selected).length, 1, 'the learner choice is not marked exactly once')
assert.equal(refresher.rows.find(({ selected }) => selected).category, question.oddOneOut.matchingCategory)
assert.equal(refresher.rows.filter(({ answer }) => answer).length, 1, 'the odd form is not marked exactly once')
assert.equal(refresher.rows.find(({ answer }) => answer).category, question.oddOneOut.targetCategory)
assert.ok(refresher.rows.every(({ role, learnerMeaning }) => role && learnerMeaning), 'complete paradigm rows lack learner explanations')
const consequence = normalizeHeartConsequence(trainMissConsequence({
  source: 'train-form',
  questionKey: question.questionKey,
  attemptedAl: chosen.label,
  reasonCode: 'wrong-grammatical-form-odd-one-out',
  reason: 'The chosen form belongs with the three matching forms.',
  correctAl: question.surface,
  grammarGuide: refresher,
}), 1)
assert.equal(consequence.grammar.rows.length, forms.length, 'the blocking consequence discarded the complete paradigm')
assert.equal(consequence.grammar.test.chosen.al, chosen.label, 'the blocking consequence discarded the learner choice')
assert.equal(consequence.grammar.test.answer.al, question.surface, 'the blocking consequence discarded the correct exception')
for (const id of [
  'grammatical-form-odd-one-out',
  'reviewed-form-odd-one-out',
  'number-odd-one-out',
  'definiteness-odd-one-out',
]) assert.ok(TRAIN_EXERCISE_EXAMPLES[id], `Debug Learning lacks ${id}`)

console.log('✓ reviewed noun-form odd-one-out supports number and definiteness with three matching exact-role surfaces, one opposite surface, and syncretism-safe answer validity.')
