import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DICT } from '../src/game/content.js'
import { buildFormQuestion } from '../src/game/formPractice.js'
import { trainCompletionPhrases } from '../src/game/trainCompletion.js'
import { reviewedFormTargets, wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { isTrainableSense } from '../src/game/lexicalTrainability.js'
import { WORD_CONTEXT_LATE_PROOF, wordProgressPlan } from '../src/game/wordProgression.js'

const lower = (value) => value.normalize('NFC').toLocaleLowerCase('sq')
const baseWins = Object.freeze({
  'meaning-recognition': 2,
  'auditory-surface-recognition': 1,
  'auditory-surface-discrimination': 1,
  'auditory-meaning-recognition': 1,
  'controlled-lemma-retrieval': 3,
  'demonstrative-noun-agreement': 1,
  'adjective-linking-article-agreement': 1,
  'linked-noun-agreement-cloze': 1,
})
let lanes = 0
let exactTargets = 0
let skipped = 0

const earlyFshat = wordProgressPlan(
  { wins: { 'meaning-recognition': 2 } },
  3,
  wordProgressionOptionsForSense('fshat'),
)
assert.equal(earlyFshat.stageId, 'reviewed-form-contrast',
  'form-role practice waits beyond two successful base-word recognitions')
assert.equal(buildFormQuestion({
  answerId: 'fshat',
  plan: earlyFshat,
  candidateIds: ['fshat'],
  currentRound: 3,
  rng: () => 0.271,
}), null, 'a reviewed form question exposed unknown supporting Albanian context')

for (const [id, entry] of Object.entries(DICT)) {
  if (!isTrainableSense(id)) continue
  const options = wordProgressionOptionsForSense(id)
  const targets = options.reviewedForms
  if (!targets.length) {
    skipped += 1
    const plan = wordProgressPlan({ wins: baseWins, contextWins: { [WORD_CONTEXT_LATE_PROOF]: 1 } }, 50, options)
    assert.equal(plan.stageId, 'auditory-word-construction', `${id}: unavailable form lane did not skip to listening-led spelling`)
    continue
  }
  lanes += 1
  assert.ok(new Set(targets.map(({ surface }) => lower(surface))).size >= 2, `${id}: form lane has no surface contrast`)
  if (entry.formTrack !== 'noun') {
    assert.ok(entry.forms?.length, `${id}: raw playable occurrences entered nonnoun form practice without reviewed declarations`)
  }

  for (const target of targets) {
    exactTargets += 1
    assert.ok(lower(target.context?.al).includes(lower(target.surface)), `${id}/${target.key}: target absent from natural context`)
    assert.ok(target.context?.alGap.includes('__'), `${id}/${target.key}: context has no exact gap`)
    assert.ok(target.context?.en, `${id}/${target.key}: context lacks reviewed English cue`)
    assert.ok(Array.isArray(target.context?.requires), `${id}/${target.key}: context lacks explicit sense requirements`)
    assert.ok(target.context.requires.includes(id), `${id}/${target.key}: context requirements omit the target sense`)
    assert.ok(target.context.requires.every((senseId) => DICT[senseId]), `${id}/${target.key}: context names an unknown sense`)
    assert.ok(['reviewed-noun-template', 'reviewed-line-reading'].includes(target.context.provenance),
      `${id}/${target.key}: learner-facing English came from an unreviewed word-gloss join`)
    if (entry.formTrack !== 'noun') assert.equal(target.context.provenance, 'reviewed-line-reading')

    const contrastProgress = {
      wins: baseWins,
      contextWins: { [WORD_CONTEXT_LATE_PROOF]: 1 },
      activeFormKey: target.key,
    }
    const contrastPlan = wordProgressPlan(contrastProgress, 50, options)
    assert.equal(contrastPlan.stageId, 'reviewed-form-contrast', `${id}/${target.key}: role contrast is not first`)
    assert.equal(contrastPlan.targetFormKey, target.key)
    const contrast = buildFormQuestion({ answerId: id, plan: contrastPlan, candidateIds: target.context.requires, currentRound: 50, rng: () => 0.271 })
    assert.ok(contrast, `${id}/${target.key}: reviewed contrast cannot build`)
    assert.deepEqual(trainCompletionPhrases(contrast), [target.context.al])
    assert.equal(contrast.kind, 'forms')
    assert.equal(contrast.targetTokenIndices.length, 1,
      `${id}/${target.key}: reviewed contrast does not mark exactly one target form`)
    const markedToken = contrast.context.al.split(/\s+/)[contrast.targetTokenIndices[0]]
      .replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '')
    assert.equal(lower(markedToken), lower(target.surface),
      `${id}/${target.key}: marked token is not the reviewed target surface`)
    assert.equal(contrast.answerValue, target.key)
    assert.strictEqual(contrast.phasePlan, contrastPlan.definition.variant.phases,
      `${id}/${target.key}: the question copied or replaced the shared staged-activity plan`)
    assert.deepEqual(contrast.phasePlan.map(({ task }) => task), ['meaning-identification', 'grammatical-role'])
    assert.equal(contrast.lexicalCheck.answerId, id)
    assert.equal(contrast.lexicalCheck.options.length, 4)
    assert.ok(contrast.lexicalCheck.options.includes(id))
    assert.equal(new Set(contrast.lexicalCheck.options.map((optionId) => contrast.lexicalCheck.optionLabels[optionId])).size, 4,
      `${id}/${target.key}: meaning phase has duplicate learner-facing answers`)
    assert.ok(contrast.lexicalCheck.options.every((optionId) =>
      contrast.lexicalCheck.optionLabels[optionId] === (DICT[optionId].enAll ?? DICT[optionId].en)),
    `${id}/${target.key}: meaning option is not an English-only dictionary meaning`)
    assert.ok(contrast.options.length >= 2 && contrast.options.length <= 4)
    assert.equal(new Set(contrast.options.map(({ label }) => label)).size, contrast.options.length)
    assert.ok(contrast.options.some(({ value }) => value === target.key))
    assert.equal(contrast.formSelectionCheck, undefined,
      `${id}/${target.key}: the meaning-and-job card still contains a sentence-gap form-selection phase`)

    // The scored grammatical phase is Albanian-only. English meanings are
    // confined to the prior marked-form meaning options and may never be
    // rendered beside the role question as an article/number clue.
    assert.equal(contrast.roleEnglishCue, undefined)
    assert.equal(contrast.learnerMeaning, undefined)

    if (!target.endingPractice) continue

    const selectionProgress = {
      ...contrastProgress,
      formProofs: { [target.key]: { wins: {
        'reviewed-form-contrast': 1,
        'grammatical-form-odd-one-out': 1,
      } } },
    }
    const selectionPlan = wordProgressPlan(selectionProgress, 50, options)
    assert.equal(selectionPlan.stageId, 'contextual-form-selection')
    const selection = buildFormQuestion({ answerId: id, plan: selectionPlan, candidateIds: target.context.requires, currentRound: 50, rng: () => 0.271 })
    assert.ok(selection, `${id}/${target.key}: contextual form selection cannot build`)
    assert.deepEqual(trainCompletionPhrases(selection), [target.context.al])
    assert.equal(selection.kind, 'forms')
    assert.equal(selection.formExerciseMode, 'ending-choice')
    assert.equal(selection.endingPrompt.split('__').length - 1, 1,
      `${id}/${target.key}: ending selection does not show exactly one target gap`)
    assert.equal(selection.answerValue, target.endingPractice.answer)
    assert.ok(selection.options.length >= 2 && selection.options.length <= 4)
    assert.ok(selection.options.every(({ value }) => target.endingPractice.options.some((option) => option.value === value)))

    const recallProgress = {
      ...selectionProgress,
      formProofs: { [target.key]: { wins: {
        'reviewed-form-contrast': 1,
        'grammatical-form-odd-one-out': 1,
        'contextual-form-selection': 1,
      } } },
    }
    const recallPlan = wordProgressPlan(recallProgress, 50, options)
    assert.equal(recallPlan.stageId, 'reviewed-ending-recall')
    const recall = buildFormQuestion({ answerId: id, plan: recallPlan, candidateIds: target.context.requires, currentRound: 50, rng: () => 0.271 })
    assert.ok(recall, `${id}/${target.key}: typed ending recall cannot build`)
    assert.deepEqual(trainCompletionPhrases(recall), [target.context.al])
    assert.equal(recall.kind, 'forms')
    assert.equal(recall.formExerciseMode, 'ending-type')
    assert.equal(recall.typingAnswer, target.endingPractice.answer)
    assert.equal(recall.endingPrompt.split('__').length - 1, 1)
    assert.equal(recall.context.en === recall.endingPrompt, false)

    const constructionProgress = {
      ...recallProgress,
      formProofs: { [target.key]: { wins: {
        'reviewed-form-contrast': 1,
        'grammatical-form-odd-one-out': 1,
        'contextual-form-selection': 1,
        'reviewed-ending-recall': 1,
        'auditory-word-construction': 1,
        'auditory-word-spelling': 1,
      } } },
    }
    const constructionPlan = wordProgressPlan(constructionProgress, 50, options)
    assert.equal(constructionPlan.stageId, 'word-form-construction')
    const construction = buildFormQuestion({ answerId: id, plan: constructionPlan, candidateIds: target.context.requires, currentRound: 50, rng: () => 0.271 })
    assert.ok(construction, `${id}/${target.key}: construction cannot build`)
    assert.deepEqual(trainCompletionPhrases(construction), [target.context.al])
    assert.equal(construction.kind, 'word-construction')
    assert.equal(construction.targetReference?.valid, true,
      `${id}/${target.key}: construction has no valid target reference`)
    assert.equal(construction.targetReference.referenceMode, 'single-gap-with-meaning-cue')
    assert.equal(construction.context.alGap.split('__').length - 1, 1,
      `${id}/${target.key}: construction does not show exactly one target gap`)
    assert.ok(construction.construction.pieces.some(({ distractor }) => distractor), `${id}/${target.key}: no distractor chunk`)
    const assembled = construction.construction.answerPieceIds.map((pieceId) =>
      construction.construction.pieces.find(({ id: candidate }) => candidate === pieceId)?.text || '',
    ).join('')
    assert.equal(assembled, lower(target.surface), `${id}/${target.key}: exact reviewed surface cannot be constructed`)
    assert.deepEqual(construction.rewardIds, [id], `${id}/${target.key}: construction rewards anything beyond its target`)
  }
}

const fshat = reviewedFormTargets('fshat')
assert.ok(fshat.filter(({ surface }) => lower(surface) === 'fshat').length >= 2, 'syncretic fshat roles were collapsed')
assert.equal(new Set(fshat.filter(({ surface }) => lower(surface) === 'fshat').map(({ key }) => key)).size, 2)
const indefiniteObject = fshat.find(({ role }) => role === 'indefAcc')
assert.equal(indefiniteObject.context.al, 'Shoh një fshat.')
assert.equal(indefiniteObject.context.alGap, 'Shoh një __.')

const tabakBase = reviewedFormTargets('tabak').find(({ role }) => role === 'indefNom')
assert.ok(tabakBase, 'tabak/base-indefinite regression fixture is missing')
const tabakPlan = wordProgressPlan({ wins: baseWins, activeFormKey: tabakBase.key }, 50, wordProgressionOptionsForSense('tabak'))
const tabakQuestion = buildFormQuestion({
  answerId: 'tabak',
  plan: tabakPlan,
  candidateIds: [...new Set([...tabakBase.context.requires, 'fshat', 'ure', 'lume'])],
  currentRound: 50,
  rng: () => 0.271,
})
assert.ok(tabakQuestion, 'tabak/base-indefinite staged form card cannot build')
assert.deepEqual(tabakQuestion.phasePlan.map(({ id }) => id), [
  'identify-form-meaning',
  'identify-marked-form-job',
])
assert.equal(tabakQuestion.context.al, 'një tabak')
assert.equal(tabakQuestion.roleEnglishCue, undefined, 'tabak role phase exposes its “a tanner” answer')
const practiceSource = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
assert.doesNotMatch(practiceSource, /q\.context\.en/, 'form UI can render the completed English form gloss beside a scored grammar phase')

console.log(`✓ ${exactTargets} exact reviewed form/role targets across ${lanes} lanes keep the staged card answer-safe; reviewed noun endings add choice then typed recall before construction; ${skipped} senses skip safely.`)
