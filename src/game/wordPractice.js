import { DICT } from './content.js'
import { EVERYDAY_CORE_SENSE_SET } from './everydayAlbanian.js'
import {
  containsExcludedPhraseWord,
  shuffleWith,
} from './phrasePractice.js'
import {
  TRAIN_EXERCISE_FAMILIES,
  TRAIN_QUESTION_MIX_POLICY,
} from './trainingProgression.js'
import {
  normalizeWordProgress,
  wordProgressPlan,
} from './wordProgression.js'
import {
  contextualChoiceLabel,
  contextualPromptProfile,
  wordContrastRank,
} from './practiceContrasts.js'
import { isTrainableSense } from './lexicalTrainability.js'
import { playableContextForSense, wordProgressionOptionsForSense } from './formInventory.js'
import { buildConstructionPieces, buildFormQuestion } from './formPractice.js'
import {
  choiceSetIsValid,
  sensesMayShareAnswer,
} from './practiceAnswerValidity.js'
import {
  CONTEXT_TARGET_PRESENTATION,
  contextualTargetReference,
  wordProductionTargetReference,
} from './contextQuestionPresentation.js'

const DIRECTION = Object.freeze({
  al2en: { field: 'en', promptField: 'al' },
  en2al: { field: 'al', promptField: 'en' },
})

const senseText = (id, field) => field === 'en'
  ? DICT[id].enAll ?? DICT[id].en
  : DICT[id][field]

const weightedPick = (entries, mana, rng) => {
  const weights = entries.map(({ id, plan }) => {
    const held = mana[id] || 0
    const need = held === 0 ? TRAIN_QUESTION_MIX_POLICY.zeroTokenWeight : 1 / (held + 1)
    const practical = EVERYDAY_CORE_SENSE_SET.has(id)
      ? TRAIN_QUESTION_MIX_POLICY.practicalWordWeight
      : 1
    // Within the due pool, earlier lexical stages stay slightly ahead of
    // retention work without starving an older word.
    const foundation = 1 + Math.max(0, 3 - plan.baseStage) * 0.3
    return need * practical * foundation
  })
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  let roll = rng() * total
  for (let index = 0; index < entries.length; index++) {
    roll -= weights[index]
    if (roll <= 0) return entries[index]
  }
  return entries.at(-1)
}

const distractorIds = (
  answerId,
  candidateIds,
  field,
  promptField,
  count,
  excludeWords,
  rng,
  { contextual = false } = {},
) => {
  const localFirst = candidateIds.length > count
    ? candidateIds
    : [...candidateIds, ...Object.keys(DICT)]
  const distractors = []
  const choiceText = (id) => contextual && field === 'en'
    ? contextualChoiceLabel(id, senseText(id, field))
    : senseText(id, field)
  const usedText = new Set([choiceText(answerId)])
  const ranked = [...new Set(shuffleWith(localFirst, rng))]
    .map((id) => ({ id, rank: wordContrastRank(answerId, id, { contextual }) }))
    .filter(({ rank }) => Number.isFinite(rank))
    .sort((left, right) => left.rank - right.rank)
  for (const { id } of ranked) {
    if (id === answerId || distractors.includes(id)) continue
    if (containsExcludedPhraseWord(DICT[id].al, excludeWords)) continue
    if (!contextual && sensesMayShareAnswer(answerId, id)) continue
    // A second option with the same prompt or answer text would create two
    // defensible answers in a bare-word question. A contextual sense question
    // deliberately does the opposite: same-surface meanings are its best
    // contrasts because the Albanian context must disambiguate them.
    if (!contextual && DICT[id][promptField] === DICT[answerId][promptField]) continue
    const text = choiceText(id)
    if (usedText.has(text)) continue
    usedText.add(text)
    distractors.push(id)
    if (distractors.length === count) break
  }
  return distractors
}

const contextSurfaces = (answerId, plan) => {
  const authored = DICT[answerId].ctx
  const { targetRange, targetRanges = [] } = plan.alignment
  const tokenIndexAt = (text, characterIndex) => [...text.matchAll(/\S+/gu)]
    .findIndex((match) => characterIndex >= match.index && characterIndex < match.index + match[0].length)
  if (plan.direction === 'en2al') {
    const al = `${authored.al.slice(0, targetRange.start)}__${authored.al.slice(targetRange.end)}`
    return {
      al,
      // Mirrored retrieval is opt-in editorial data. Never manufacture a
      // supposedly fluent English cue from a word-gloss blank.
      en: authored.retrieval.en,
      focus: '__',
      target: authored.focus,
      targetTokenIndices: [tokenIndexAt(al, targetRange.start)],
      authoredAl: authored.al,
      authoredEn: authored.en,
    }
  }
  return {
    ...authored,
    target: authored.focus,
    targetTokenIndices: targetRanges.map(({ start }) => tokenIndexAt(authored.al, start)),
    meaningGapTokenIndex: tokenIndexAt(authored.en, authored.en.indexOf('__')),
    authoredAl: authored.al,
    authoredEn: authored.en,
  }
}

function buildContextQuestion(answerId, plan, excludeWords, rng) {
  const { field } = DIRECTION[plan.direction]
  const count = plan.contextVariant.choiceDistractors === 'from-stage'
    ? plan.variant.distractors
    : plan.contextVariant.choiceDistractors
  const defensibleAlternatives = new Set(Object.keys(
    DICT[answerId].ctx.defensibleAlternativeRationales?.[plan.direction] || {},
  ))
  const authoredDistractors = (plan.direction === 'al2en' ? DICT[answerId].ctx.distractorIds || [] : []).filter((id, index, ids) =>
    DICT[id] && id !== answerId && ids.indexOf(id) === index && !defensibleAlternatives.has(id),
  ).slice(0, count)
  const distractors = plan.direction === 'al2en'
    ? authoredDistractors
    : (DICT[answerId].ctx.retrieval.distractorIds || []).filter((id, index, ids) =>
        DICT[id] && id !== answerId && ids.indexOf(id) === index &&
        !defensibleAlternatives.has(id) &&
        !containsExcludedPhraseWord(DICT[id].al, excludeWords) &&
        senseText(id, field) !== senseText(answerId, field),
      ).slice(0, count)
  // Context-dependent senses may use only their exact editorially reviewed
  // alternatives. A short or ambiguous list fails closed; falling through to
  // a bare homograph question would erase the very context that identifies the
  // sense being tested.
  if (plan.direction === 'en2al' && distractors.length !== count) return null
  const promptProfile = contextualPromptProfile(answerId, {
    contextPresentation: plan.targetPresentation,
  })
  const ctx = contextSurfaces(answerId, plan)
  const targetReference = contextualTargetReference({
    direction: plan.direction,
    targetKind: promptProfile.targetKind,
    presentation: plan.direction === 'en2al'
      ? CONTEXT_TARGET_PRESENTATION.blank
      : plan.targetPresentation,
    targetSurface: ctx.target,
    targetTokenIndices: ctx.targetTokenIndices,
  })
  // A contextual question with zero or multiple possible referents is not a
  // harder exercise; it is an invalid one. Fail closed before it reaches Train.
  if (!targetReference.valid) return null
  const options = shuffleWith([answerId, ...distractors], rng)
  const optionLabels = Object.fromEntries(options.map((id) => [
    id,
    DICT[answerId].ctx.distractorLabels?.[plan.direction]?.[id] || (plan.direction === 'al2en'
      ? contextualChoiceLabel(id, senseText(id, field))
      : senseText(id, field)),
  ]))
  if (!choiceSetIsValid({
    answerValue: answerId,
    optionValues: options,
    labelOf: (id) => optionLabels[id],
    expectedOptionCount: count + 1,
    locale: field === 'al' ? 'sq' : 'en',
  })) return null
  return {
    kind: TRAIN_EXERCISE_FAMILIES.wordContext.kind,
    answerId,
    field,
    ctx,
    targetReference,
    dir: plan.direction,
    mode: plan.mode,
    tier: plan.tier,
    wordStageId: plan.definition.id,
    familyId: plan.familyId,
    exerciseConceptId: plan.exerciseConceptId,
    variantId: plan.contextVariantId,
    evidenceTrack: plan.evidenceTrack,
    contextReview: plan.contextReview,
    difficultyLabel: plan.difficultyLabel,
    remediation: plan.remediation,
    targetFormKey: plan.targetFormKey,
    promptProfile: {
      ...promptProfile,
      // Presentation and direction are progression evidence, not a UI-level
      // guess. In particular, a second recognition win alone cannot unmark a
      // target before the independent Albanian-retrieval proof exists.
      contextPresentation: plan.targetPresentation,
      direction: plan.direction,
      sourceLanguage: plan.contextVariant.sourceLanguage,
      gapLanguage: plan.contextVariant.gapLanguage,
      exerciseConceptId: plan.exerciseConceptId,
      variantId: plan.contextVariantId,
      evidenceTrack: plan.evidenceTrack,
      // On Albanian-to-meaning recognition, the lived Albanian situation is
      // the evidence. Showing the completed English cloze would solve a
      // homonym question before the learner reads the Albanian exchange.
      showEnglishContext: plan.direction === 'en2al',
    },
    options,
    optionLabels,
    audioSurface: DICT[answerId].ctx.audio === true ? DICT[answerId].ctx.al : null,
    lexicalSurfaces: [DICT[answerId].ctx.al],
  }
}

let questionSequence = 0

export function wordHasNoEvidence(value) {
  const progress = normalizeWordProgress(value)
  return Object.keys(progress.wins).length === 0 &&
    Object.keys(progress.contextWins).length === 0 &&
    Object.keys(progress.formProofs).length === 0 &&
    progress.strictWins === 0 && !progress.remediation
}

export function buildWordQuestion({
  discoveredIds,
  mana = {},
  wordProgress = {},
  currentRound = 0,
  excludeWords = [],
  rng = Math.random,
} = {}) {
  const due = (discoveredIds || []).flatMap((id) => {
    if (!DICT[id] || !isTrainableSense(id)) return []
    const progressionOptions = wordProgressionOptionsForSense(id)
    if (!progressionOptions.trainability.trainable) return []
    const surface = progressionOptions.context?.al || DICT[id].al
    if (containsExcludedPhraseWord(surface, excludeWords)) return []
    const progress = normalizeWordProgress(wordProgress[id], currentRound)
    const plan = wordProgressPlan(progress, currentRound, progressionOptions)
    return plan.due ? [{ id, plan }] : []
  })
  if (!due.length) return null

  const { id: answerId, plan } = weightedPick(due, mana, rng)
  if (!plan.contextReview && (['reviewed-form-contrast', 'contextual-form-selection'].includes(plan.stageId) ||
      (plan.stageId === 'word-form-construction' && plan.targetFormKey))) {
    return buildFormQuestion({ answerId, plan, excludeWords, currentRound, rng })
  }
  const questionKey = `${answerId}:word:${currentRound}:${plan.tier}:${plan.mode}:${plan.variantId || plan.contextVariantId || 'isolated'}:${questionSequence++}`
  const productionSurface = plan.formTarget?.surface || DICT[answerId].al
  const productionContext = plan.formTarget?.context || playableContextForSense(answerId, productionSurface)
  if (!plan.contextReview && plan.stageId === 'word-form-construction') {
    const targetReference = wordProductionTargetReference({
      mode: 'construction',
      meaningCue: productionContext?.en || senseText(answerId, 'en'),
      context: productionContext,
    })
    if (!targetReference.valid) return null
    return {
      kind: TRAIN_EXERCISE_FAMILIES.wordConstruction.kind,
      questionKey,
      answerId,
      dir: plan.direction,
      mode: plan.mode,
      tier: plan.tier,
      wordStageId: plan.stageId,
      variantId: plan.variantId,
      difficultyLabel: plan.difficultyLabel,
      remediation: plan.remediation,
      targetFormKey: plan.targetFormKey,
      surface: productionSurface,
      context: productionContext,
      targetReference,
      construction: buildConstructionPieces(productionSurface, {
        distractorCount: plan.definition.variant.distractorChunks,
        rng,
      }),
      answerValue: productionSurface.normalize('NFC').toLocaleLowerCase('sq'),
      rewardIds: [answerId],
      lexicalSurfaces: [productionSurface],
    }
  }
  if (plan.mode === 'type') {
    const typingCue = productionContext?.en || senseText(answerId, 'en')
    const targetReference = wordProductionTargetReference({
      mode: 'spelling',
      meaningCue: typingCue,
      context: productionContext,
    })
    if (!targetReference.valid) return null
    return {
      kind: TRAIN_EXERCISE_FAMILIES.wordSpelling.kind,
      questionKey,
      answerId,
      dir: plan.direction,
      mode: plan.mode,
      tier: plan.tier,
      wordStageId: plan.stageId,
      variantId: plan.variantId,
      difficultyLabel: plan.difficultyLabel,
      remediation: plan.remediation,
      answerTolerance: plan.answerTolerance,
      targetFormKey: plan.targetFormKey,
      typingCue,
      typingContext: productionContext,
      targetReference,
      typingAnswer: productionSurface,
      lexicalSurfaces: [productionSurface],
    }
  }

  const { field, promptField } = DIRECTION[plan.direction]
  // Authored context can express the same gap in either direction. Unsafe or
  // malformed alignments fall back to the isolated stage rather than guessing
  // which Albanian surface should be hidden or left unmarked.
  if (plan.contextVariant) {
    const contextQuestion = buildContextQuestion(
      answerId,
      plan,
      excludeWords,
      rng,
    )
    return contextQuestion ? { ...contextQuestion, questionKey } : null
  }

  const distractors = distractorIds(
    answerId,
    due.map(({ id }) => id),
    field,
    promptField,
    plan.variant.distractors,
    excludeWords,
    rng,
  )
  const options = shuffleWith([answerId, ...distractors], rng)
  if (!choiceSetIsValid({
    answerValue: answerId,
    optionValues: options,
    labelOf: (id) => senseText(id, field),
    expectedOptionCount: plan.variant.distractors + 1,
    locale: field === 'al' ? 'sq' : 'en',
    wrongOptionIsValid: (id) => sensesMayShareAnswer(answerId, id),
  })) return null
  return {
    kind: TRAIN_EXERCISE_FAMILIES.wordMeaning.kind,
    questionKey,
    answerId,
    dir: plan.direction,
    mode: plan.mode,
    tier: plan.tier,
    wordStageId: plan.stageId,
    variantId: plan.variantId,
    difficultyLabel: plan.difficultyLabel,
    remediation: plan.remediation,
    targetFormKey: plan.targetFormKey,
    field,
    promptText: senseText(answerId, promptField),
    options,
    lexicalSurfaces: [DICT[answerId].al],
  }
}
