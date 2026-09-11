// Release gate for the invariant that every scored Train bank has one
// unequivocal answer in the exact prompt the learner sees.

import assert from 'node:assert/strict'
import { DICT } from '../src/game/content.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { isTrainableSense } from '../src/game/lexicalTrainability.js'
import {
  choiceSetErrors,
  phraseMatchSetErrors,
  sensesMayShareAnswer,
} from '../src/game/practiceAnswerValidity.js'
import { PHRASE_SKILL_MAX_TIER, PHRASE_STAGE_DEFINITIONS } from '../src/game/phraseProgression.js'
import { buildPhraseQuestion } from '../src/game/phrasePractice.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import { advanceWordProgress } from '../src/game/wordProgression.js'

const steadyRng = () => 0.381966
let wordQuestions = 0
let phraseQuestions = 0

assert.ok(choiceSetErrors({
  answerValue: 'shko',
  optionValues: ['shko', 'nisem'],
  wrongOptionIsValid: (id) => sensesMayShareAnswer('shko', id),
}).some((error) => error.includes('defensible alternative')), 'the shared gate does not reject equivalent answers')
assert.ok(choiceSetErrors({
  answerValue: 'yes', optionValues: ['yes', 'no'], labelOf: () => 'same',
}).some((error) => error.includes('labels are not unique')), 'the shared gate does not reject duplicate surfaces')

const validateWordQuestion = (question) => {
  wordQuestions += 1
  if (question.kind === 'normal' && question.mode === 'choice') {
    assert.deepEqual(choiceSetErrors({
      answerValue: question.answerId,
      optionValues: question.options,
      labelOf: (id) => question.field === 'en' ? (DICT[id].enAll ?? DICT[id].en) : DICT[id].al,
      expectedOptionCount: question.options.length,
      locale: question.field === 'al' ? 'sq' : 'en',
      wrongOptionIsValid: (id) => sensesMayShareAnswer(question.answerId, id),
    }), [], `${question.questionKey}: bare word bank has a defensible answer`)
  }
  if (question.kind === 'ctx') {
    assert.deepEqual(choiceSetErrors({
      answerValue: question.answerId,
      optionValues: question.options,
      labelOf: (id) => question.optionLabels[id],
      expectedOptionCount: question.options.length,
      locale: question.field === 'al' ? 'sq' : 'en',
    }), [], `${question.questionKey}: contextual bank is structurally ambiguous`)
    const defended = Object.keys(DICT[question.answerId].ctx.defensibleAlternativeRationales?.[question.dir] || {})
    assert.deepEqual(question.options.filter((id) => defended.includes(id)), [],
      `${question.questionKey}: an explicitly defensible alternative is scored wrong`)
  }
  if (['forms', 'form-context'].includes(question.kind)) {
    assert.deepEqual(choiceSetErrors({
      answerValue: question.answerValue,
      optionValues: question.options.map(({ value }) => value),
      labelOf: (value) => question.options.find((option) => option.value === value)?.label,
      expectedOptionCount: question.options.length,
      locale: question.kind === 'form-context' ? 'sq' : 'en',
    }), [], `${question.questionKey}: form bank has more than one visible answer`)
  }
}

for (const id of Object.keys(DICT).filter(isTrainableSense)) {
  let progress = null
  let round = 0
  const options = wordProgressionOptionsForSense(id)
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const question = buildWordQuestion({
      discoveredIds: [id], wordProgress: { [id]: progress }, currentRound: round, rng: steadyRng,
    })
    assert.ok(question, `${id}: a due word stage could not build an unequivocal question`)
    validateWordQuestion(question)
    const result = advanceWordProgress(progress, round, {
      correct: true,
      stageId: question.wordStageId,
      tier: question.tier,
      mode: question.mode,
      direction: question.dir,
      variantId: question.variantId ?? null,
      targetFormKey: question.targetFormKey ?? null,
      questionKey: `answer-validity:${id}:${attempt}`,
      round: round + 1,
    }, options)
    assert.equal(result.accepted, true, `${id}: ${result.reason}`)
    progress = result.progress
    round = Math.max(round + 1, progress.dueAfterRound)
  }
}

const validatePhraseQuestion = (question) => {
  phraseQuestions += 1
  if (question.mode === 'match') {
    assert.deepEqual(phraseMatchSetErrors(question.phrases, question.phrases.length), [],
      `${question.questionKey}: matching board repeats a visible side`)
    return
  }
  if (question.mode === 'type') {
    assert.ok(question.typingCue, `${question.questionKey}: production has no exact meaning target`)
    assert.ok(question.typingAnswer, `${question.questionKey}: production has no answer`)
    return
  }
  const answerTiles = question.bank.filter(({ answerIndex }) => answerIndex != null)
  const extraTiles = question.bank.filter(({ answerIndex }) => answerIndex == null)
  const answerSurfaces = new Set(answerTiles.map(({ text }) => text.normalize('NFC').toLocaleLowerCase('sq')))
  const extraSurfaces = extraTiles.map(({ text }) => text.normalize('NFC').toLocaleLowerCase('sq'))
  assert.equal(new Set(extraSurfaces).size, extraSurfaces.length,
    `${question.questionKey}: construction repeats a distractor tile`)
  assert.deepEqual(extraSurfaces.filter((surface) => answerSurfaces.has(surface)), [],
    `${question.questionKey}: a distractor duplicates an answer tile`)
  assert.ok(answerTiles.length >= 1, `${question.questionKey}: construction has no answer tile`)
  for (const tile of extraTiles) {
    const targetFocusId = question.mode === 'cloze' ? question.focusId : tile.targetFocusId
    assert.ok(tile.senseId && targetFocusId, `${question.questionKey}: distractor lacks semantic alignment metadata`)
    assert.equal(sensesMayShareAnswer(targetFocusId, tile.senseId), false,
      `${question.questionKey}: ${tile.text} is a defensible alternative for ${targetFocusId}`)
  }
  if (question.mode === 'cloze') {
    assert.ok(question.meaningCue, `${question.questionKey}: cloze has no exact learner-visible meaning cue`)
    assert.equal(answerTiles.length, 1, `${question.questionKey}: cloze has more than one answer tile`)
  }
}

for (const target of EVERYDAY_PHRASE_DRILLS) {
  for (let tier = 0; tier <= PHRASE_SKILL_MAX_TIER.production; tier += 1) {
    const mode = PHRASE_STAGE_DEFINITIONS.production[tier].mode
    const question = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, {}, {}, {
      targetId: target.id, mode, tier, distractorPool: EVERYDAY_PHRASE_DRILLS, rng: steadyRng,
    })
    assert.ok(question, `${target.id}/${mode}/${tier}: phrase builder did not fail closed cleanly`)
    validatePhraseQuestion(question)
  }
  for (const [skill, mode] of [['listening', 'listen'], ['matching', 'match']]) {
    for (let tier = 0; tier <= PHRASE_SKILL_MAX_TIER[skill]; tier += 1) {
      const question = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, {}, {}, {
        targetId: target.id, mode, tier, distractorPool: EVERYDAY_PHRASE_DRILLS, rng: steadyRng,
      })
      assert.ok(question, `${target.id}/${mode}/${tier}: phrase builder did not produce a reviewed bank`)
      validatePhraseQuestion(question)
    }
  }
}

console.log(`✓ ${wordQuestions} staged word/form/context questions and ${phraseQuestions} phrase questions have one defensible scored answer.`)
