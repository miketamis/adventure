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
  trainActivityBalancePlan,
  trainActivityTypeId,
  trainTargetBalancePlan,
  trainWordTargetKeys,
} from './trainActivityBalance.js'
import {
  normalizeWordProgress,
  wordProgressPlan,
  wordProgressRouteAspectIds,
} from './wordProgression.js'
import {
  contextualChoiceLabel,
  contextualPromptProfile,
} from './practiceContrasts.js'
import { isTrainableSense } from './lexicalTrainability.js'
import {
  isReviewedProductionContext,
  playableContextForSense,
  wordProgressionOptionsForSense,
} from './formInventory.js'
import {
  buildConstructionPieces,
  buildFormQuestion,
  buildNounFormMatchingQuestion,
  buildNounAgreementQuestion,
  reviewedFormContextGate,
} from './formPractice.js'
import {
  buildDemonstrativeWholeChoice,
  reviewedNounAgreementGate,
} from './nounAgreementPractice.js'
import { wordAspectTargetsForPlan } from './wordLearningAspects.js'
import {
  choiceSetIsValid,
  sensesMayShareAnswer,
} from './practiceAnswerValidity.js'
import {
  CONTEXT_TARGET_PRESENTATION,
  contextualTargetReference,
  wordProductionTargetReference,
} from './contextQuestionPresentation.js'
import {
  distractorDifficultyBandForPlan,
  planSenseDistractors,
} from './distractorPlanning.js'
import { reviewedSoundContrastFor } from './wordSoundContrasts.js'

const DIRECTION = Object.freeze({
  al2en: { field: 'en', promptField: 'al' },
  en2al: { field: 'al', promptField: 'en' },
})

const senseText = (id, field) => field === 'en'
  ? DICT[id].enAll ?? DICT[id].en
  : DICT[id][field]

const audioRecognitionChoiceCapacity = (answerId, candidateIds, field, excludeWords) => {
  const answerLabel = senseText(answerId, field)
  const labels = new Set()
  for (const id of [...new Set(candidateIds || [])]) {
    if (id === answerId || !DICT[id] || !isTrainableSense(id) || sensesMayShareAnswer(answerId, id)) continue
    if (containsExcludedPhraseWord(DICT[id].al, excludeWords)) continue
    const label = senseText(id, field)
    if (!label || label === answerLabel) continue
    labels.add(label)
  }
  return labels.size
}

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

export function eligibleReviewedContexts(answerId, discoveredIds = [], {
  allowUndiscoveredSupport = false,
} = {}) {
  const base = DICT[answerId]?.ctx
  if (!base) return []
  const variants = Array.isArray(base.variants) && base.variants.length
    ? base.variants.map((variant) => mergedReviewedContext(base, variant))
    : [base]
  const discovered = new Set(discoveredIds)
  return variants.filter((context) => allowUndiscoveredSupport || !Array.isArray(context.requires) ||
    context.requires.every((id) => id === answerId || discovered.has(id)))
}

export const reviewedContextForRound = (
  answerId,
  discoveredIds,
  currentRound,
  lastAttemptKey,
  { allowUndiscoveredSupport = false } = {},
) => {
  const eligible = eligibleReviewedContexts(answerId, discoveredIds, { allowUndiscoveredSupport })
  if (!eligible.length) return null
  const previousId = typeof lastAttemptKey === 'string'
    ? eligible.find(({ id }) => lastAttemptKey.includes(`:context-${id}:`))?.id
    : null
  const fresh = eligible.length > 1 ? eligible.filter(({ id }) => id !== previousId) : eligible
  return fresh[currentRound % fresh.length]
}

const wordWeight = ({ id, plan }, mana, wordExposure) => {
  const held = mana[id] || 0
  const need = held === 0 ? TRAIN_QUESTION_MIX_POLICY.zeroTokenWeight : 1 / (held + 1)
  const practical = EVERYDAY_CORE_SENSE_SET.has(id)
    ? TRAIN_QUESTION_MIX_POLICY.practicalWordWeight
    : 1
  const selectedAspect = plan.aspectSelection?.candidates?.find(({ aspect }) => aspect.id === plan.aspectId)
  const foundation = 1 + (1 - (selectedAspect?.masteryRatio || 0)) * 0.9
  const passiveExposure = wordExposure?.[id]?.total || 0
  // Repeatedly seeing an unproven word is a useful invitation to retrieve it,
  // never evidence that retrieval is already mastered. The boost is deliberately
  // bounded and fades with the selected aspect's actual proof strength.
  const exposureSignal = Math.min(1, Math.log2(passiveExposure + 1) / 6)
  const retrievalPriorityBoost = 1 + 0.35 * exposureSignal * Math.max(0, 1 - (selectedAspect?.masteryRatio || 0))
  return {
    held,
    need,
    practical,
    foundation,
    passiveExposure,
    exposureSignal,
    retrievalPriorityBoost,
    weight: need * practical * foundation * retrievalPriorityBoost,
  }
}

const weightedPick = (entries, mana, wordExposure, rng, trace = null) => {
  const breakdowns = entries.map((entry) => ({ id: entry.id, ...wordWeight(entry, mana, wordExposure) }))
  const breakdownById = new Map(breakdowns.map((entry) => [entry.id, entry]))
  const groups = [...entries.reduce((result, entry) => {
    const surfaceKey = entry.targetKeys?.find((key) => key.startsWith('surface:')) || `word:${entry.id}`
    const group = result.get(surfaceKey) || { surfaceKey, entries: [] }
    group.entries.push(entry)
    result.set(surfaceKey, group)
    return result
  }, new Map()).values()].map((group) => ({
    ...group,
    weight: Math.max(...group.entries.map(({ id }) => breakdownById.get(id)?.weight || 0)),
  }))
  const weights = groups.map(({ weight }) => weight)
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  const random = rng()
  let roll = random * total
  const initialRoll = roll
  for (let index = 0; index < groups.length; index++) {
    roll -= weights[index]
    if (roll <= 0) {
      const selected = [...groups[index].entries].sort((left, right) => {
        if (Boolean(left.plan?.remediation) !== Boolean(right.plan?.remediation)) {
          return left.plan?.remediation ? -1 : 1
        }
        return (breakdownById.get(right.id)?.weight || 0) - (breakdownById.get(left.id)?.weight || 0)
      })[0]
      if (trace) trace.weightedSelection = {
        formula: 'one canonical Albanian-surface ticket × strongest due sense weight; then remediation and weakest-sense priority inside a homograph group',
        random,
        totalWeight: total,
        roll: initialRoll,
        candidates: breakdowns,
        surfaceGroups: groups.map(({ surfaceKey, entries: grouped, weight }) => ({
          surfaceKey,
          senseIds: grouped.map(({ id }) => id),
          weight,
        })),
        selectedSurfaceKey: groups[index].surfaceKey,
        selectedId: selected.id,
      }
      return selected
    }
  }
  const fallbackGroup = groups.at(-1)
  const fallback = fallbackGroup?.entries[0]
  if (trace) trace.weightedSelection = {
    formula: 'one canonical Albanian-surface ticket × strongest due sense weight; then remediation and weakest-sense priority inside a homograph group',
    random,
    totalWeight: total,
    roll: initialRoll,
    candidates: breakdowns,
    surfaceGroups: groups.map(({ surfaceKey, entries: grouped, weight }) => ({
      surfaceKey,
      senseIds: grouped.map(({ id }) => id),
      weight,
    })),
    selectedSurfaceKey: fallbackGroup?.surfaceKey || null,
    selectedId: fallback?.id || null,
  }
  return fallback
}

const distractorIds = (
  answerId,
  candidateIds,
  field,
  promptField,
  count,
  excludeWords,
  rng,
  {
    contextual = false,
    debugTrace = null,
    difficultyBand = 'developing',
    discoveredIds = [],
    mana = {},
    practiced = {},
    wordProgress = {},
    wordExposure = {},
    strictCandidatePool = false,
  } = {},
) => {
  const choiceText = (id) => contextual && field === 'en'
    ? contextualChoiceLabel(id, senseText(id, field))
    : senseText(id, field)
  const planned = planSenseDistractors({
    answerId,
    candidateIds,
    count,
    field,
    promptField,
    contextual,
    difficultyBand,
    discoveredIds,
    mana,
    practiced,
    wordProgress,
    wordExposure,
    ...(strictCandidatePool ? {
      fallbackIds: [],
      useHardContrastRegistry: false,
      requireReviewedRelation: false,
      source: 'saved-audio-options',
    } : {}),
    excludeReason: (id) => containsExcludedPhraseWord(DICT[id].al, excludeWords)
      ? 'candidate shares an Albanian word with the preceding Train activity'
      : null,
    labelOf: choiceText,
    rng,
  })
  if (debugTrace) debugTrace.distractors = planned.trace
  return planned.complete ? planned.selectedIds : []
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

function buildContextQuestion(answerId, plan, authored, excludeWords, rng, debugTrace = null, learner = {}) {
  const { field } = DIRECTION[plan.direction]
  const count = plan.contextVariant.choiceDistractors === 'from-stage'
    ? plan.variant.distractors
    : plan.contextVariant.choiceDistractors
  const defensibleAlternatives = new Set(Object.keys(
    authored.defensibleAlternativeRationales?.[plan.direction] || {},
  ))
  const authoredDistractors = plan.direction === 'al2en'
    ? authored.distractorIds || []
    : authored.retrieval.distractorIds || []
  const optionLabel = (id) => authored.distractorLabels?.[plan.direction]?.[id] || (plan.direction === 'al2en'
    ? contextualChoiceLabel(id, senseText(id, field))
    : senseText(id, field))
  const plannedDistractors = planSenseDistractors({
    answerId,
    candidateIds: authoredDistractors,
    fallbackIds: [],
    count,
    field,
    promptField: DIRECTION[plan.direction].promptField,
    contextual: true,
    difficultyBand: distractorDifficultyBandForPlan(plan),
    ...learner,
    source: 'editor-reviewed-context-pool',
    excludeReason: (id) => defensibleAlternatives.has(id)
      ? 'editor marks this sense as a defensible alternative'
      : plan.direction === 'en2al' && containsExcludedPhraseWord(DICT[id].al, excludeWords)
        ? 'candidate shares an Albanian word with the preceding Train activity'
        : null,
    labelOf: optionLabel,
    wrongOptionIsValid: (id) => defensibleAlternatives.has(id) ||
      (plan.direction === 'en2al' && sensesMayShareAnswer(answerId, id)),
    rng,
  })
  const distractors = plannedDistractors.selectedIds
  // Context-dependent senses may use only their exact editorially reviewed
  // alternatives. A short or ambiguous list fails closed; falling through to
  // a bare homograph question would erase the very context that identifies the
  // sense being tested.
  if (!plannedDistractors.complete) return null
  if (debugTrace) debugTrace.distractors = plannedDistractors.trace
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
    optionLabel(id),
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
      // guess. The later transfer check remains visibly marked while requiring
      // the learner to interpret the target in a fresh reviewed situation.
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

export function wordQuestionRouteAspectIds({
  discoveredIds = [],
  wordProgress = {},
  currentRound = 0,
  nowMs = 0,
  targetId,
  allowEarlyDueForGoal = false,
} = {}) {
  if (!targetId || !DICT[targetId] || !isTrainableSense(targetId)) return []
  const progressionOptions = wordProgressionOptionsForSense(targetId)
  if (!progressionOptions.trainability.trainable) return []
  const progress = normalizeWordProgress(wordProgress[targetId], currentRound)
  const context = reviewedContextForRound(targetId, discoveredIds, currentRound, progress.lastAttemptKey, {
    // A zero-token action word must remain testable even when the learner has
    // not saved every supporting word in its reviewed situation. The card
    // still uses the exact reviewed, sense-discriminating context and rewards
    // only the requested target; it never falls back to a bare homograph.
    allowUndiscoveredSupport: allowEarlyDueForGoal,
  })
  if (progressionOptions.context && !context) return []
  return wordProgressRouteAspectIds(progress, currentRound, {
    ...progressionOptions,
    context,
    nowMs,
    discoveredIds,
    includeSpaced: allowEarlyDueForGoal,
  })
}

export function buildWordQuestion({
  discoveredIds,
  mana = {},
  practiced = {},
  wordProgress = {},
  wordExposure = {},
  currentRound = 0,
  nowMs = 0,
  targetId = null,
  targetAspectId = null,
  allowEarlyDueForGoal = false,
  excludeWords = [],
  activityHistory = [],
  targetHistory = [],
  rng = Math.random,
  debugTrace = false,
} = {}) {
  const trace = debugTrace ? {
    builder: 'word',
    request: {
      discoveredIds: [...(discoveredIds || [])],
      targetId,
      targetAspectId,
      allowEarlyDueForGoal,
      currentRound,
      nowMs,
      excludedWordKeys: phraseWordKeys((excludeWords || []).join(' ')),
      activityHistory,
      targetHistory,
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
    const context = reviewedContextForRound(id, discoveredIds, currentRound, progress.lastAttemptKey, {
      allowUndiscoveredSupport: allowEarlyDueForGoal && targetId === id,
    })
    candidate && (candidate.reviewedContextId = context?.id || null)
    if (candidate && context) {
      const discovered = new Set(discoveredIds || [])
      candidate.contextSupport = {
        requiredIds: [...(context.requires || [])],
        undiscoveredIds: (context.requires || []).filter((requiredId) =>
          requiredId !== id && !discovered.has(requiredId)),
        goalOverride: allowEarlyDueForGoal && targetId === id,
      }
    }
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
    const plan = wordProgressPlan(progress, currentRound, {
      ...progressionOptions,
      context,
      nowMs,
      discoveredIds,
      targetAspectId,
    })
    candidate && (candidate.plan = plan)
    if (targetAspectId && plan.aspectId !== targetAspectId) {
      candidate?.reasons.push(`requested capability-graph route ${targetAspectId} is not eligible`)
      if (candidate) trace.candidates.push(candidate)
      continue
    }
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
    if (plan.formTarget) {
      const formContextGate = reviewedFormContextGate(plan.formTarget, discoveredIds)
      candidate && (candidate.formContextGate = formContextGate)
      if (!formContextGate.eligible) {
        candidate?.reasons.push(formContextGate.reason)
        if (candidate) trace.candidates.push(candidate)
        continue
      }
    }
    if (['demonstrative-noun-agreement', 'adjective-linking-article-agreement', 'linked-noun-agreement-cloze'].includes(plan.stageId)) {
      const agreementKind = plan.stageId === 'demonstrative-noun-agreement'
        ? 'demonstrative'
        : plan.stageId === 'adjective-linking-article-agreement' ? 'adjective' : 'linked'
      const agreementGate = reviewedNounAgreementGate(plan.nounAgreementFrame, discoveredIds, agreementKind)
      candidate && (candidate.nounAgreementGate = agreementGate)
      if (!agreementGate.eligible) {
        candidate?.reasons.push(agreementGate.reason)
        if (candidate) trace.candidates.push(candidate)
        continue
      }
    }
    if (['auditory-surface-recognition', 'auditory-surface-discrimination', 'auditory-meaning-recognition'].includes(plan.stageId)) {
      const optionField = ['auditory-surface-recognition', 'auditory-surface-discrimination'].includes(plan.stageId) ? 'al' : 'en'
      const soundContrast = plan.stageId === 'auditory-surface-discrimination'
        ? reviewedSoundContrastFor(id, discoveredIds, (surface) => containsExcludedPhraseWord(surface, excludeWords))
        : null
      const neededDistractors = soundContrast ? 1 : plan.variant?.distractors || 3
      const capacity = audioRecognitionChoiceCapacity(id, discoveredIds, optionField, excludeWords)
      candidate && (candidate.audioRecognitionGate = {
        eligible: capacity >= neededDistractors,
        knownDistinctDistractors: capacity,
        neededDistractors,
        subvariantId: soundContrast ? 'reviewed-sound-contrast' : 'saved-word-audio-choice',
        soundContrast,
        reason: capacity >= neededDistractors
          ? soundContrast
            ? 'reviewed sound-contrast partner is saved and disjoint from the preceding activity'
            : 'enough distinct saved senses for an audio-only choice set'
          : 'not enough distinct saved senses for an audio-only choice set',
      })
      if (capacity < neededDistractors) {
        candidate?.reasons.push('not enough distinct saved senses for the four-choice audio recognition card')
        if (candidate) trace.candidates.push(candidate)
        continue
      }
    }
    const goalEmergency = allowEarlyDueForGoal === true && targetId === id
    if (!plan.due && !goalEmergency) {
      candidate?.reasons.push('current stage is not due by round/elapsed-spacing policy')
      if (candidate) trace.candidates.push(candidate)
      continue
    }
    candidate && Object.assign(candidate, {
      status: 'eligible',
      reasons: [goalEmergency && !plan.due
        ? 'discovered, trainable, disjoint from the last activity, and kept eligible for the zero-token story-action fallback'
        : 'discovered, trainable, disjoint from the last activity, and due'],
    })
    if (candidate) trace.candidates.push(candidate)
    due.push({
      id,
      plan,
      context,
      targetKeys: trainWordTargetKeys(id, DICT[id].al),
      activityTypeId: trainActivityTypeId({
        familyId: plan.familyId,
        variantId: plan.contextVariantId || plan.variantId,
        wordStageId: plan.stageId,
        mode: plan.mode,
      }),
    })
  }
  if (!due.length) return null

  const activityBalance = trainActivityBalancePlan(due, activityHistory)
  if (trace) trace.activityBalance = activityBalance
  if (!activityBalance.balanced.length) return null
  const activityBalancedDue = activityBalance.balanced.map(({ candidate }) => candidate)
  const targetBalance = targetId
    ? { balanced: activityBalancedDue.map((candidate) => ({ candidate })), outcome: 'forced-target' }
    : trainTargetBalancePlan(activityBalancedDue, targetHistory)
  if (trace) trace.targetBalance = targetBalance
  if (!targetBalance.balanced.length) return null
  const balancedDue = targetBalance.balanced.map(({ candidate }) => candidate)
  const { id: answerId, plan, context, activityTypeId } = weightedPick(
    balancedDue,
    mana,
    wordExposure,
    rng,
    trace,
  )
  if (trace) trace.selected = {
    answerId,
    stageId: plan.stageId,
    variantId: plan.variantId || plan.contextVariantId || null,
    due: plan.due,
    remediation: plan.remediation,
    reason: 'selected from the eligible due pool by the recorded weighting calculation',
  }
  const finish = (question, buildPath, extra = {}) => {
    if (!question) return question
    const withAspects = {
      ...question,
      activityTypeId,
      goalEmergency: allowEarlyDueForGoal === true && !plan.due,
      targetKeys: trainWordTargetKeys(answerId, DICT[answerId].al),
      aspectTargets: question.aspectTargets || wordAspectTargetsForPlan(answerId, plan),
      aspectRegistryVersion: plan.aspectSelection?.registryVersion || null,
    }
    if (!trace) return withAspects
    return {
      ...withAspects,
      debugSelection: {
        ...trace,
        aspectSelection: plan.aspectSelection,
        build: { path: buildPath, ...extra },
      },
    }
  }
  if (!plan.contextReview && plan.stageId === 'noun-paradigm-matching') {
    return finish(
      buildNounFormMatchingQuestion({ answerId, plan, candidateIds: discoveredIds, excludeWords, currentRound, rng }),
      'same-root-noun-grammar-matching-builder',
      { pairCount: plan.nounFormMatchingPlan?.rows?.length || 0 },
    )
  }
  if (!plan.contextReview && (['reviewed-form-contrast', 'grammatical-form-odd-one-out', 'contextual-form-selection', 'reviewed-ending-recall'].includes(plan.stageId) ||
      (plan.stageId === 'word-form-construction' && plan.targetFormKey))) {
    return finish(
      buildFormQuestion({ answerId, plan, candidateIds: discoveredIds, excludeWords, currentRound, rng }),
      'reviewed-form-builder',
      { targetFormKey: plan.targetFormKey },
    )
  }
  if (!plan.contextReview && ['demonstrative-noun-agreement', 'adjective-linking-article-agreement', 'linked-noun-agreement-cloze'].includes(plan.stageId)) {
    return finish(
      buildNounAgreementQuestion({ answerId, plan, candidateIds: discoveredIds, excludeWords, currentRound, rng }),
      'reviewed-noun-agreement-builder',
      { grammarVariantId: plan.variantId },
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
  if (!plan.contextReview && ['auditory-surface-recognition', 'auditory-surface-discrimination', 'auditory-meaning-recognition'].includes(plan.stageId)) {
    const field = ['auditory-surface-recognition', 'auditory-surface-discrimination'].includes(plan.stageId) ? 'al' : 'en'
    const promptField = field === 'al' ? 'en' : 'al'
    const soundContrast = plan.stageId === 'auditory-surface-discrimination'
      ? reviewedSoundContrastFor(answerId, discoveredIds, (surface) => containsExcludedPhraseWord(surface, excludeWords))
      : null
    const distractors = soundContrast ? [soundContrast.partnerId] : distractorIds(
      answerId,
      discoveredIds,
      field,
      promptField,
      plan.variant.distractors,
      excludeWords,
      rng,
      {
        debugTrace: trace,
        difficultyBand: distractorDifficultyBandForPlan(plan),
        discoveredIds,
        mana,
        practiced,
        wordProgress,
        wordExposure,
        strictCandidatePool: true,
      },
    )
    const options = shuffleWith([answerId, ...distractors], rng)
    const expectedDistractors = soundContrast ? 1 : plan.variant.distractors
    if (!choiceSetIsValid({
      answerValue: answerId,
      optionValues: options,
      labelOf: (id) => senseText(id, field),
      expectedOptionCount: expectedDistractors + 1,
      locale: field === 'al' ? 'sq' : 'en',
      wrongOptionIsValid: (id) => sensesMayShareAnswer(answerId, id),
    })) return null
    return finish({
      kind: TRAIN_EXERCISE_FAMILIES.wordAudioRecognition.kind,
      familyId: TRAIN_EXERCISE_FAMILIES.wordAudioRecognition.id,
      questionKey,
      answerId,
      dir: plan.direction,
      mode: plan.mode,
      tier: plan.tier,
      wordStageId: plan.stageId,
      variantId: plan.variantId,
      audioRecognitionSubvariantId: soundContrast ? 'reviewed-sound-contrast' : 'saved-word-audio-choice',
      soundContrast,
      difficultyLabel: plan.difficultyLabel,
      remediation: plan.remediation,
      targetFormKey: null,
      field,
      options,
      stimulusMode: 'audio-only',
      audioSurface: DICT[answerId].al,
      requiresCompletedAudio: true,
      targetReference: {
        valid: true,
        instruction: field === 'al'
          ? soundContrast
            ? 'Listen carefully, then choose the Albanian word you hear'
            : 'Listen, then choose the written Albanian word'
          : 'Listen, then choose what the Albanian word means',
        presentation: 'audio-only',
      },
      lexicalSurfaces: options.map((id) => DICT[id].al),
      distractorPolicy: soundContrast
        ? `reviewed real-word contrast (${soundContrast.focus}); both options are saved; no transcript before the answer`
        : 'four distinct saved trainable senses; no transcript before the answer',
    }, 'audio-word-recognition', {
      targetSurface: DICT[answerId].al,
      audioRequired: true,
      optionField: field,
      audioRecognitionSubvariantId: soundContrast ? 'reviewed-sound-contrast' : 'saved-word-audio-choice',
      soundContrastId: soundContrast?.id || null,
    })
  }
  if (!plan.contextReview && plan.stageId === 'auditory-word-construction') {
    return finish({
      kind: TRAIN_EXERCISE_FAMILIES.wordAudioConstruction.kind,
      familyId: TRAIN_EXERCISE_FAMILIES.wordAudioConstruction.id,
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
      surface: productionSurface,
      stimulusMode: 'audio-only',
      audioSurface: productionSurface,
      requiresCompletedAudio: true,
      targetReference: {
        valid: true,
        instruction: 'Listen, then build the Albanian word',
        presentation: 'audio-only',
      },
      construction: buildConstructionPieces(productionSurface, {
        distractorCount: plan.definition.variant.distractorChunks,
        rng,
      }),
      answerValue: productionSurface.normalize('NFC').toLocaleLowerCase('sq'),
      rewardIds: [answerId],
      lexicalSurfaces: [productionSurface],
    }, 'audio-word-construction', {
      targetSurface: productionSurface,
      audioRequired: true,
      tileAudio: plan.definition.variant.tileAudio,
    })
  }
  if (!plan.contextReview && plan.stageId === 'auditory-word-spelling') {
    return finish({
      kind: TRAIN_EXERCISE_FAMILIES.wordAudioSpelling.kind,
      familyId: TRAIN_EXERCISE_FAMILIES.wordAudioSpelling.id,
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
      stimulusMode: 'audio-only',
      audioSurface: productionSurface,
      requiresCompletedAudio: true,
      targetReference: {
        valid: true,
        instruction: 'Listen, then type the Albanian word',
        presentation: 'audio-only',
      },
      typingAnswer: productionSurface,
      lexicalSurfaces: [productionSurface],
    }, 'audio-word-spelling', {
      targetSurface: productionSurface,
      audioRequired: true,
      answerTolerance: plan.answerTolerance,
    })
  }
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
      answerTolerance: plan.answerTolerance,
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
      {
        discoveredIds,
        mana,
        practiced,
        wordProgress,
        wordExposure,
      },
    )
    return finish(contextQuestion ? { ...contextQuestion, questionKey } : null, 'reviewed-context-question', {
      contextId: context?.id || null,
      direction: plan.direction,
    })
  }

  // The first two-choice retrieval can carry noun gender incidentally without
  // claiming grammar evidence: the learner chooses one authored `ky/kjo +
  // noun` bundle. The independently scheduled split activity is what later
  // tests and records agreement.
  if (plan.stageId === 'controlled-lemma-retrieval' &&
      ['controlled-retrieval-two-choice', 'controlled-retrieval-four-choice'].includes(plan.variantId) &&
      reviewedNounAgreementGate(plan.nounAgreementFrame, discoveredIds, 'demonstrative').eligible) {
    const bundled = buildDemonstrativeWholeChoice({
      answerId,
      candidateIds: discoveredIds.filter((id) => !containsExcludedPhraseWord(DICT[id]?.al || '', excludeWords)),
      optionCount: plan.variant.distractors + 1,
      rng,
    })
    if (bundled && !bundled.lexicalSurfaces.some((surface) => containsExcludedPhraseWord(surface, excludeWords))) {
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
        targetFormKey: null,
        field: 'al',
        ...bundled,
      }, 'demonstrative-noun-whole-choice', {
        grammarVariantId: bundled.grammarVariantId,
        evidenceBoundary: 'controlled lemma retrieval only; no agreement proof',
      })
    }
  }

  const distractors = distractorIds(
    answerId,
    discoveredIds,
    field,
    promptField,
    plan.variant.distractors,
    excludeWords,
    rng,
    {
      debugTrace: trace,
      difficultyBand: distractorDifficultyBandForPlan(plan),
      discoveredIds,
      mana,
      practiced,
      wordProgress,
      wordExposure,
    },
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
