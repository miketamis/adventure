import assert from 'node:assert/strict'
import { DICT } from '../src/game/content.js'
import { buildFormQuestion } from '../src/game/formPractice.js'
import { reviewedFormTargets, wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { isTrainableSense } from '../src/game/lexicalTrainability.js'
import { WORD_CONTEXT_LATE_PROOF, wordProgressPlan } from '../src/game/wordProgression.js'

const lower = (value) => value.normalize('NFC').toLocaleLowerCase('sq')
const baseWins = Object.freeze({ 'meaning-recognition': 2, 'controlled-lemma-retrieval': 3 })
let lanes = 0
let exactTargets = 0
let skipped = 0

for (const [id, entry] of Object.entries(DICT)) {
  if (!isTrainableSense(id)) continue
  const options = wordProgressionOptionsForSense(id)
  const targets = options.reviewedForms
  if (!targets.length) {
    skipped += 1
    const plan = wordProgressPlan({ wins: baseWins, contextWins: { [WORD_CONTEXT_LATE_PROOF]: 1 } }, 50, options)
    assert.equal(plan.stageId, 'word-form-construction', `${id}: unavailable form lane did not skip to construction`)
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
    const contrast = buildFormQuestion({ answerId: id, plan: contrastPlan, currentRound: 50, rng: () => 0.271 })
    assert.ok(contrast, `${id}/${target.key}: reviewed contrast cannot build`)
    assert.equal(contrast.kind, 'forms')
    assert.equal(contrast.answerValue, target.key)
    assert.ok(contrast.options.length >= 2 && contrast.options.length <= 4)
    assert.equal(new Set(contrast.options.map(({ label }) => label)).size, contrast.options.length)
    assert.ok(contrast.options.some(({ value }) => value === target.key))

    const selectionProgress = {
      ...contrastProgress,
      formProofs: { [target.key]: { wins: { 'reviewed-form-contrast': 1 } } },
    }
    const selectionPlan = wordProgressPlan(selectionProgress, 50, options)
    assert.equal(selectionPlan.stageId, 'contextual-form-selection')
    const selection = buildFormQuestion({ answerId: id, plan: selectionPlan, currentRound: 50, rng: () => 0.271 })
    assert.ok(selection, `${id}/${target.key}: contextual form selection cannot build`)
    assert.equal(selection.kind, 'form-context')
    assert.equal(selection.answerValue, target.surface)
    assert.ok(selection.options.length >= 2 && selection.options.length <= 4)
    assert.equal(new Set(selection.options.map(({ label }) => lower(label))).size, selection.options.length)

    const constructionProgress = {
      ...selectionProgress,
      formProofs: { [target.key]: { wins: {
        'reviewed-form-contrast': 1,
        'contextual-form-selection': 1,
      } } },
    }
    const constructionPlan = wordProgressPlan(constructionProgress, 50, options)
    assert.equal(constructionPlan.stageId, 'word-form-construction')
    const construction = buildFormQuestion({ answerId: id, plan: constructionPlan, currentRound: 50, rng: () => 0.271 })
    assert.ok(construction, `${id}/${target.key}: construction cannot build`)
    assert.equal(construction.kind, 'word-construction')
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

console.log(`✓ ${exactTargets} exact reviewed form/role targets across ${lanes} lanes build contrast, contextual selection and target-only construction; ${skipped} senses skip safely.`)
