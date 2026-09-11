import { DICT } from './dictionary.js'
import { reviewedFormTargets } from './formInventory.js'
import { containsExcludedPhraseWord, shuffleWith } from './phrasePractice.js'
import { TRAIN_EXERCISE_FAMILIES } from './trainingProgression.js'
import { isTrainableSense } from './lexicalTrainability.js'
import { choiceSetIsValid } from './practiceAnswerValidity.js'
import { wordProductionTargetReference } from './contextQuestionPresentation.js'

let formQuestionSequence = 0
const lower = (value) => value.normalize('NFC').toLocaleLowerCase('sq')

const targetTokenIndices = (text, surface) => {
  const target = lower(surface)
  return String(text || '').split(/\s+/).flatMap((word, index) =>
    lower(word).replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '') === target ? [index] : [],
  )
}

const uniqueBy = (values, keyOf) => {
  const seen = new Set()
  return values.filter((value) => {
    const key = keyOf(value)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const targetForPlan = (forms, plan) => forms.find((form) => form.key === plan?.targetFormKey) || null

const questionBase = (answerId, target, plan, currentRound) => ({
  questionKey: `${answerId}:word:${currentRound}:${plan.tier}:${plan.variantId || plan.stageId}:${encodeURIComponent(target.key)}:${formQuestionSequence++}`,
  answerId,
  dir: plan.direction,
  mode: plan.mode,
  tier: plan.tier,
  wordStageId: plan.stageId,
  variantId: plan.variantId,
  difficultyLabel: plan.difficultyLabel,
  remediation: plan.remediation,
  targetFormKey: target.key,
  surface: target.surface,
  formTarget: target,
  lexicalSurfaces: [target.surface],
})

const contrastOptions = (forms, target, rng) => {
  const nounRoles = target.wordClass === 'noun'
  const rows = uniqueBy([target, ...shuffleWith(forms.filter((form) => form.key !== target.key), rng)], (form) =>
    nounRoles ? form.roleLabel : form.learnerMeaning,
  ).slice(0, 4)
  return rows.map((form) => ({
    value: form.key,
    label: nounRoles ? form.roleLabel : form.learnerMeaning,
    surface: form.surface,
  }))
}

const surfaceOptions = (forms, target, rng) => uniqueBy(
  [target, ...shuffleWith(forms.filter((form) => form.key !== target.key), rng)],
  (form) => lower(form.surface),
).slice(0, 4).map((form) => ({ value: form.surface, label: form.surface }))

const ALBANIAN_CHUNKS = Object.freeze([
  'dh', 'gj', 'll', 'nj', 'rr', 'sh', 'th', 'xh', 'zh',
  'a', 'b', 'c', 'ç', 'd', 'e', 'ë', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z',
])
const DIGRAPHS = new Set(ALBANIAN_CHUNKS.filter((chunk) => chunk.length === 2))

export function albanianConstructionChunks(surface) {
  const letters = [...surface.normalize('NFC').toLocaleLowerCase('sq').trim()]
  const chunks = []
  for (let index = 0; index < letters.length;) {
    const pair = `${letters[index] || ''}${letters[index + 1] || ''}`
    if (DIGRAPHS.has(pair)) {
      chunks.push(pair)
      index += 2
    } else {
      if (/\p{L}/u.test(letters[index])) chunks.push(letters[index])
      else if (/\s/u.test(letters[index]) && chunks.at(-1) !== ' ') chunks.push(' ')
      else if (/['’-]/u.test(letters[index])) chunks.push(letters[index])
      index += 1
    }
  }
  return chunks
}

export function buildConstructionPieces(surface, { distractorCount = 3, rng = Math.random } = {}) {
  const answerChunks = albanianConstructionChunks(surface)
  const answerPieces = answerChunks.map((text, index) => ({ id: `answer-${index}`, text, label: text === ' ' ? 'space' : text, distractor: false }))
  const used = new Set(answerChunks)
  const nearby = ALBANIAN_CHUNKS
    .map((text) => ({ text, distance: Math.abs(text.codePointAt(0) - (answerChunks[0]?.codePointAt(0) || 97)) }))
    .filter(({ text }) => !used.has(text))
    .sort((left, right) => left.distance - right.distance || left.text.localeCompare(right.text, 'sq'))
  const distractors = shuffleWith(nearby.slice(0, 12), rng).slice(0, distractorCount)
    .map(({ text }, index) => ({ id: `distractor-${index}`, text, label: text, distractor: true }))
  return {
    answer: answerChunks.join(''),
    answerPieceIds: answerPieces.map(({ id }) => id),
    pieces: shuffleWith([...answerPieces, ...distractors], rng),
  }
}

// Pure exact-form builder. It never guesses an ending: target, grammatical
// role and context all come from `reviewedFormTargets`, the same inventory used
// by progression snapshots and audits.
export function buildFormQuestion({
  answerId,
  plan,
  excludeWords = [],
  currentRound = 0,
  rng = Math.random,
} = {}) {
  if (!DICT[answerId] || !isTrainableSense(answerId)) return null
  const forms = reviewedFormTargets(answerId)
  const target = targetForPlan(forms, plan)
  if (!target || containsExcludedPhraseWord(target.surface, excludeWords)) return null
  const targetIndices = targetTokenIndices(target.context?.al, target.surface)
  if (targetIndices.length !== 1 || String(target.context?.alGap || '').split('__').length - 1 !== 1) return null
  const base = questionBase(answerId, target, plan, currentRound)

  if (plan.stageId === 'reviewed-form-contrast') {
    const options = contrastOptions(forms, target, rng)
    if (options.length < 2 || !choiceSetIsValid({
      answerValue: target.key,
      optionValues: options.map(({ value }) => value),
      labelOf: (value) => options.find((option) => option.value === value)?.label,
      expectedOptionCount: options.length,
    })) return null
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
      promptKind: target.wordClass === 'noun' ? 'noun-role-in-context' : 'reviewed-use-in-context',
      context: target.context,
      targetTokenIndices: targetIndices,
      options,
      answerValue: target.key,
      distractorPolicy: target.wordClass === 'noun' ? 'same-noun-reviewed-roles' : 'same-word-reviewed-uses',
    }
  }

  if (plan.stageId === 'contextual-form-selection') {
    const options = surfaceOptions(forms, target, rng)
    if (options.length < 2 || !choiceSetIsValid({
      answerValue: target.surface,
      optionValues: options.map(({ value }) => value),
      labelOf: (value) => value,
      expectedOptionCount: options.length,
      locale: 'sq',
    })) return null
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordFormContext.kind,
      context: target.context,
      options,
      answerValue: target.surface,
      distractorPolicy: 'same-word-reviewed-surfaces',
    }
  }

  if (plan.stageId === 'word-form-construction') {
    const targetReference = wordProductionTargetReference({
      mode: 'construction',
      meaningCue: target.context.en,
      context: target.context,
    })
    if (!targetReference.valid) return null
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordConstruction.kind,
      context: target.context,
      targetReference,
      construction: buildConstructionPieces(target.surface, {
        distractorCount: plan.definition.variant.distractorChunks,
        rng,
      }),
      answerValue: lower(target.surface),
      rewardIds: [answerId],
    }
  }

  return null
}
