import { DICT } from './content.js'
import { EVERYDAY_CORE_SENSE_SET } from './everydayAlbanian.js'
import {
  containsExcludedPhraseWord,
  phraseWordKeys,
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
import {
  isReviewedProductionContext,
  playableContextForSense,
  wordProgressionOptionsForSense,
} from './formInventory.js'
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

const mergedReviewedContext = (base, variant = null) => {
  if (!variant) return base
  const { variants: _variants, retrievalEn, ...variantFields } = variant
  return {
    ...base,
    ...variantFields,
    retrieval: {
      ...base.retrieval,
      en: retrievalEn,
      reviewed: true,
    },
  }
}

export function eligibleReviewedContexts(answerId, discoveredIds = []) {
  const base = DICT[answerId]?.ctx
  if (!base) return []
  const variants = Array.isArray(base.variants) && base.variants.length
    ? base.variants.map((variant) => mergedReviewedContext(base, variant))
    : [base]
  const discovered = new Set(discoveredIds)
  return variants.filter((context) => !Array.isArray(context.requires) ||
    context.requires.every((id) => id === answerId || discovered.has(id)))
}

const reviewedContextForRound = (answerId, discoveredIds, currentRound, lastAttemptKey) => {
  const eligible = eligibleReviewedContexts(answerId, discoveredIds)
  if (!eligible.length) return null
  const previousId = typeof lastAttemptKey === 'string'
    ? eligible.find(({ id }) => lastAttemptKey.includes(`:context-${id}:`))?.id
    : null
  const fresh = eligible.length > 1 ? eligible.filter(({ id }) => id !== previousId) : eligible
  return fresh[currentRound % fresh.length]
}

const wordWeight = ({ id, plan }, mana) => {
  const held = mana[id] || 0
  const need = held === 0 ? TRAIN_QUESTION_MIX_POLICY.zeroTokenWeight : 1 / (held + 1)
  const practical = EVERYDAY_CORE_SENSE_SET.has(id)
    ? TRAIN_QUESTION_MIX_POLICY.practicalWordWeight
    : 1
  // Within the due pool, earlier lexical stages stay slightly ahead of
  // retention work without starving an older word.
  const foundation = 1 + Math.max(0, 3 - plan.baseStage) * 0.3
  return { held, need, practical, foundation, weight: need * practical * foundation }
}

const weightedPick = (entries, mana, rng, trace = null) => {
  const breakdowns = entries.map((entry) => ({ id: entry.id, ...wordWeight(entry, mana) }))
  const weights = breakdowns.map(({ weight }) => weight)
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  const random = rng()
  let roll = random * total
  const initialRoll = roll
  for (let index = 0; index < entries.length; index++) {
    roll -= weights[index]
    if (roll <= 0) {
      if (trace) trace.weightedSelection = {
        formula: 'token need × practical-language priority × earlier-stage priority',
        random,
        totalWeight: total,
        roll: initialRoll,
        candidates: breakdowns,
        selectedId: entries[index].id,
      }
      return entries[index]
    }
  }
  if (trace) trace.weightedSelection = {
    formula: 'token need × practical-language priority × earlier-stage priority',
    random,
    totalWeight: total,
    roll: initialRoll,
    candidates: breakdowns,
    selectedId: entries.at(-1)?.id || null,
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
  { contextual = false, debugTrace = null } = {},
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
  if (debugTrace) debugTrace.distractors = {
    policy: contextual ? 'reviewed contextual contrast rank' : 'distinct incompatible sense ranked by lexical contrast',
    requested: count,
    rankedCandidates: ranked,
    selectedIds: [...distractors],
  }
  return distractors
}

const contextSurfaces = (authored, plan) => {
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

function buildContextQuestion(answerId, plan, authored, excludeWords, rng, debugTrace = null) {
  const { field } = DIRECTION[plan.direction]
  const count = plan.contextVariant.choiceDistractors === 'from-stage'
    ? plan.variant.distractors
    : plan.contextVariant.choiceDistractors
  const defensibleAlternatives = new Set(Object.keys(
    authored.defensibleAlternativeRationales?.[plan.direction] || {},
  ))
  const authoredDistractors = (plan.direction === 'al2en' ? authored.distractorIds || [] : []).filter((id, index, ids) =>
    DICT[id] && id !== answerId && ids.indexOf(id) === index && !defensibleAlternatives.has(id),
  ).slice(0, count)
  const distractors = plan.direction === 'al2en'
    ? authoredDistractors
    : (authored.retrieval.distractorIds || []).filter((id, index, ids) =>
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
  if (debugTrace) debugTrace.distractors = {
    policy: plan.direction === 'al2en'
      ? 'editor-reviewed context-specific sense contrasts'
      : 'editor-reviewed Albanian retrieval contrasts',
    requested: count,
    authoredIds: [...distractors],
    defensibleAlternativesExcluded: [...defensibleAlternatives],
  }
  const promptProfile = contextualPromptProfile(answerId, {
    contextPresentation: plan.targetPresentation,
  })
  const ctx = contextSurfaces(authored, plan)
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
    authored.distractorLabels?.[plan.direction]?.[id] || (plan.direction === 'al2en'
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
    contextSourceId: authored.id || null,
    contextPhraseId: authored.phraseId || null,
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
    audioSurface: authored.audio === true ? authored.al : null,
    lexicalSurfaces: [authored.al],
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
  nowMs = 0,
  targetId = null,
  excludeWords = [],
  rng = Math.random,
  debugTrace = false,
} = {}) {
  const trace = debugTrace ? {
    builder: 'word',
    request: {
      discoveredIds: [...(discoveredIds || [])],
      targetId,
      currentRound,
      nowMs,
      excludedWordKeys: phraseWordKeys((excludeWords || []).join(' ')),
    },
    candidates: [],
  } : null
  const due = []
  for (const id of discoveredIds || []) {
    const candidate = trace ? { id, status: 'rejected', reasons: [] } : null
    if (targetId && id !== targetId) {
      candidate?.reasons.push(`forced target is ${targetId}`)
      if (candidate) trace.candidates.push(candidate)
      continue
    }
    if (!DICT[id]) {
      candidate?.reasons.push('missing dictionary entry')
      if (candidate) trace.candidates.push(candidate)
      continue
    }
    if (!isTrainableSense(id)) {
      candidate?.reasons.push('sense is classified as non-trainable')
      if (candidate) trace.candidates.push(candidate)
      continue
    }
    const progressionOptions = wordProgressionOptionsForSense(id)
    candidate && (candidate.trainability = progressionOptions.trainability)
    if (!progressionOptions.trainability.trainable) {
      candidate?.reasons.push(progressionOptions.trainability.reason || 'progression options reject this sense')
      if (candidate) trace.candidates.push(candidate)
      continue
    }
    const progress = normalizeWordProgress(wordProgress[id], currentRound)
    const context = reviewedContextForRound(id, discoveredIds, currentRound, progress.lastAttemptKey)
    candidate && (candidate.reviewedContextId = context?.id || null)
    if (progressionOptions.context && !context) {
      candidate?.reasons.push('no reviewed context is eligible with the currently discovered supporting words')
      if (candidate) trace.candidates.push(candidate)
      continue
    }
    const surface = context?.al || DICT[id].al
    candidate && (candidate.scheduledSurface = surface)
    if (containsExcludedPhraseWord(surface, excludeWords)) {
      candidate?.reasons.push('shares an Albanian word with the preceding Train activity')
      if (candidate) trace.candidates.push(candidate)
      continue
    }
    const plan = wordProgressPlan(progress, currentRound, { ...progressionOptions, context, nowMs })
    candidate && (candidate.plan = plan)
    // An inflecting word can advance from its lemma to a different reviewed
    // surface while keeping the same sense ID. Apply the no-repeat boundary to
    // that exact scheduled surface too; otherwise the weighted picker may
    // select a form that the form builder must reject, hiding other legal,
    // disjoint due words behind a false caught-up result.
    if (plan.formTarget?.surface && containsExcludedPhraseWord(plan.formTarget.surface, excludeWords)) {
      candidate?.reasons.push('scheduled reviewed form shares a word with the preceding Train activity')
      if (candidate) trace.candidates.push(candidate)
      continue
    }
    if (!plan.due) {
      candidate?.reasons.push('current stage is not due by round/elapsed-spacing policy')
      if (candidate) trace.candidates.push(candidate)
      continue
    }
    candidate && Object.assign(candidate, {
      status: 'eligible',
      reasons: ['discovered, trainable, disjoint from the last activity, and due'],
    })
    if (candidate) trace.candidates.push(candidate)
    due.push({ id, plan, context })
  }
  if (!due.length) return null

  const { id: answerId, plan, context } = weightedPick(due, mana, rng, trace)
  if (trace) trace.selected = {
    answerId,
    stageId: plan.stageId,
    variantId: plan.variantId || plan.contextVariantId || null,
    due: plan.due,
    remediation: plan.remediation,
    reason: 'selected from the eligible due pool by the recorded weighting calculation',
  }
  const finish = (question, buildPath, extra = {}) => {
    if (!question || !trace) return question
    return {
      ...question,
      debugSelection: {
        ...trace,
        build: { path: buildPath, ...extra },
      },
    }
  }
  if (!plan.contextReview && (['reviewed-form-contrast', 'contextual-form-selection'].includes(plan.stageId) ||
      (plan.stageId === 'word-form-construction' && plan.targetFormKey))) {
    return finish(
      buildFormQuestion({ answerId, plan, excludeWords, currentRound, rng }),
      'reviewed-form-builder',
      { targetFormKey: plan.targetFormKey },
    )
  }
  const contextKey = context?.id ? `context-${context.id}` : 'isolated'
  const questionKey = `${answerId}:word:${currentRound}:${plan.tier}:${plan.mode}:${plan.variantId || plan.contextVariantId || 'isolated'}:${contextKey}:${questionSequence++}`
  const productionSurface = plan.formTarget?.surface || DICT[answerId].al
  const productionContext = plan.formTarget?.context || playableContextForSense(answerId, productionSurface)
  // A sentence-shaped English production cue must be a reviewed whole-line
  // reading. If no such context exists, the later builders use the concise
  // dictionary meaning instead of exposing an interlinear gloss collage.
  const reviewedProductionContext = isReviewedProductionContext(productionContext)
    ? productionContext
    : null
  if (!plan.contextReview && plan.stageId === 'word-form-construction') {
    const targetReference = wordProductionTargetReference({
      mode: 'construction',
      meaningCue: reviewedProductionContext?.en || senseText(answerId, 'en'),
      context: reviewedProductionContext,
    })
    if (!targetReference.valid) return null
    return finish({
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
      context: reviewedProductionContext,
      targetReference,
      construction: buildConstructionPieces(productionSurface, {
        distractorCount: plan.definition.variant.distractorChunks,
        rng,
      }),
      answerValue: productionSurface.normalize('NFC').toLocaleLowerCase('sq'),
      rewardIds: [answerId],
      lexicalSurfaces: [productionSurface],
    }, 'word-or-form-construction', { targetSurface: productionSurface })
  }
  if (plan.mode === 'type') {
    const typingCue = reviewedProductionContext?.en || senseText(answerId, 'en')
    const targetReference = wordProductionTargetReference({
      mode: 'spelling',
      meaningCue: typingCue,
      context: reviewedProductionContext,
    })
    if (!targetReference.valid) return null
    return finish({
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
      typingContext: reviewedProductionContext,
      targetReference,
      typingAnswer: productionSurface,
      lexicalSurfaces: [productionSurface],
    }, 'contextual-typed-recall', { targetSurface: productionSurface, answerTolerance: plan.answerTolerance })
  }

  const { field, promptField } = DIRECTION[plan.direction]
  // Authored context can express the same gap in either direction. Unsafe or
  // malformed alignments fall back to the isolated stage rather than guessing
  // which Albanian surface should be hidden or left unmarked.
  if (plan.contextVariant) {
    const contextQuestion = buildContextQuestion(
      answerId,
      plan,
      context,
      excludeWords,
      rng,
      trace,
    )
    return finish(contextQuestion ? { ...contextQuestion, questionKey } : null, 'reviewed-context-question', {
      contextId: context?.id || null,
      direction: plan.direction,
    })
  }

  const distractors = distractorIds(
    answerId,
    due.map(({ id }) => id),
    field,
    promptField,
    plan.variant.distractors,
    excludeWords,
    rng,
    { debugTrace: trace },
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
  return finish({
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
  }, 'isolated-word-meaning', { direction: plan.direction })
}
