import { DICT, DEFS } from './content.js'
import { EVERYDAY_PHRASE_DRILLS } from './everydayAlbanian.js'
import {
  PLAYABLE_FORM_INVENTORY,
  formTrackForSense,
  playableFormUsage,
  reviewedContextEligibilityForSense,
  reviewedFormTargets,
  wordProgressionOptionsForSense,
} from './formInventory.js'
import { lexicalTrainability } from './lexicalTrainability.js'
import { phraseProductionFocusIds } from './phraseFocus.js'
import { buildPhraseProgressionSnapshot, phraseWords } from './phrasePractice.js'
import {
  normalizePhraseProductionProgress,
  normalizePhraseSkillProgress,
} from './phraseProgression.js'
import {
  TRAIN_EXERCISE_FAMILIES,
  TRAIN_QUESTION_MIX_POLICY,
  TRAIN_SCHEDULER_SAFEGUARDS,
} from './trainingProgression.js'
import { normalizeTrainActivityHistory } from './trainActivityHistory.js'
import {
  normalizeWordProgress,
  wordCapabilitySnapshot,
} from './wordProgression.js'
import { WORD_SPELLING_SUPPORT_POLICY } from './wordSpellingPolicy.js'
import {
  WORD_ASPECT_REGISTRY_VERSION,
  WORD_LEARNING_ASPECTS,
  WORD_STAGE_ASPECT_BINDINGS,
} from './wordLearningAspects.js'
import { wordExposureFor } from './wordExposure.js'
import {
  TRAIN_HEALTH_POLICY,
  normalizeTrainHealingStreak,
  normalizeTrainStageExposures,
  trainHealthPlanForQuestion,
} from './trainHealthPolicy.js'
import { normalizeWordMatchingProgress } from './wordMatchingProgress.js'

const lower = (value) => String(value || '').normalize('NFC').toLocaleLowerCase('sq')
const cleanSurface = (value) => lower(value).replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '')

const senseIdsForSurface = (surface) => {
  const key = cleanSurface(surface)
  if (!key) return []
  return Object.entries(DICT).flatMap(([id, entry]) => {
    if (cleanSurface(entry.al) === key) return [id]
    return entry.forms?.some((form) => cleanSurface(form.al) === key) ? [id] : []
  })
}

const definitionSurface = (tokens) => (tokens || []).map((token) => token.paren ? token.en : token.al)
  .join(' ')
  .replace(/\s+([,.;!?])/g, '$1')

const serializedUsage = (id) => [...playableFormUsage(id).entries()].map(([surfaceKey, value]) => ({
  surfaceKey,
  al: value.al,
  count: value.count,
  glossCounts: Object.fromEntries(value.glossCounts || []),
  examples: value.examples || [],
}))

const phraseById = Object.freeze(Object.fromEntries(EVERYDAY_PHRASE_DRILLS.map((phrase) => [phrase.id, phrase])))

const phraseSenseIdAt = (phrase, surfaces, index) => {
  const surface = cleanSurface(surfaces[index])
  const exact = phrase.requires.find((id) => {
    const entry = DICT[id]
    if (!entry) return false
    if (cleanSurface(entry.al) === surface) return true
    return entry.forms?.some((form) => cleanSurface(form.al) === surface)
  })
  return exact || (phrase.requires.length === surfaces.length ? phrase.requires[index] : null)
}

const phraseSenseOccurrences = (phrase) => {
  if (!phrase || !Array.isArray(phrase.requires)) return []
  const surfaces = phraseWords(phrase.al)
  return surfaces.map((surface, index) => ({
    id: phraseSenseIdAt(phrase, surfaces, index),
    index,
    surface,
  }))
}

function phraseOccurrences(phrase, source) {
  return phraseSenseOccurrences(phrase).map(({ id, index, surface }) => ({
    source,
    role: 'phrase word',
    index,
    surface,
    id,
    candidateIds: id ? [id] : senseIdsForSurface(surface),
    resolution: id ? 'reviewed phrase mapping' : 'unresolved phrase surface',
  }))
}

function genericTextOccurrences(text, source, { targetId = null, targetSurface = null } = {}) {
  return phraseWords(text).map((surface, index) => {
    const exactTarget = targetId && targetSurface && cleanSurface(surface) === cleanSurface(targetSurface)
    const candidateIds = exactTarget ? [targetId] : senseIdsForSurface(surface)
    return {
      source,
      role: exactTarget ? 'exact target occurrence' : 'visible Albanian context word',
      index,
      surface,
      id: candidateIds.length === 1 ? candidateIds[0] : exactTarget ? targetId : null,
      candidateIds,
      resolution: exactTarget
        ? 'question target metadata'
        : candidateIds.length === 1
          ? 'unique dictionary/form surface'
          : candidateIds.length > 1
            ? 'ambiguous spelling; every candidate is shown'
            : 'no dictionary/form surface recorded',
    }
  })
}

function explicitOptionOccurrences(question) {
  if (!Array.isArray(question?.options)) return []
  if (typeof question.options[0] === 'string') {
    return question.options.flatMap((id, index) => DICT[id] ? [{
      source: 'answer options',
      role: id === question.answerId ? 'correct sense option' : 'distractor sense option',
      index,
      surface: DICT[id].al,
      id,
      candidateIds: [id],
      resolution: 'answer option sense id',
    }] : [])
  }
  return question.options.flatMap((option, index) => {
    const id = option.value === question.answerId || String(option.value || '').startsWith(`${question.answerId}::`)
      ? question.answerId
      : null
    const surface = option.surface || (question.field === 'al' ? option.label : null)
    if (!surface) return []
    const candidateIds = id ? [id] : senseIdsForSurface(surface)
    return [{
      source: 'answer options',
      role: option.value === question.answerValue ? 'correct form option' : 'distractor form option',
      index,
      surface,
      id: id || (candidateIds.length === 1 ? candidateIds[0] : null),
      candidateIds,
      resolution: id ? 'question form target metadata' : 'surface lookup',
    }]
  })
}

function lexicalCheckOccurrences(question) {
  if (!Array.isArray(question?.lexicalCheck?.options)) return []
  return question.lexicalCheck.options.flatMap((id, index) => DICT[id] ? [{
    source: 'meaning phase options',
    role: id === question.lexicalCheck.answerId ? 'correct sense option' : 'distractor sense option',
    index,
    surface: DICT[id].al,
    id,
    candidateIds: [id],
    resolution: 'meaning phase option sense id',
  }] : [])
}

function stagedGrammarOccurrences(question) {
  if (!question?.grammarBundle || !question.phaseQuestions) return []
  return Object.entries(question.phaseQuestions).flatMap(([phaseId, phase]) => {
    const promptOccurrences = phase.promptLang === 'sq'
      ? genericTextOccurrences(phase.prompt, `grammar phase:${phaseId}`, {
          targetId: question.answerId,
          targetSurface: phase.markSurface || question.surface,
        })
      : []
    const optionOccurrences = (phase.options || []).flatMap((option, index) => {
      if (option.lang !== 'sq') return []
      const candidateIds = senseIdsForSurface(option.label)
      const id = DICT[option.value] ? option.value : candidateIds.length === 1 ? candidateIds[0] : null
      return [{
        source: `grammar phase:${phaseId} options`,
        role: option.value === phase.answerValue ? 'correct Albanian option' : 'distractor Albanian option',
        index,
        surface: option.label,
        id,
        candidateIds: id ? [id] : candidateIds,
        resolution: id ? 'reviewed grammar-phase option metadata' : 'surface lookup',
      }]
    })
    return [...promptOccurrences, ...optionOccurrences]
  })
}

export function trainActivityWordOccurrences(question) {
  if (!question) return []
  const occurrences = []
  if (question.kind === TRAIN_EXERCISE_FAMILIES.wordMatching.kind) {
    for (const [index, pair] of (question.pairs || []).entries()) {
      occurrences.push({
        source: 'word matching board',
        role: pair.difficultyBand || 'matching pair',
        index,
        surface: pair.al,
        id: pair.id,
        candidateIds: [pair.id],
        resolution: 'matching pair sense id',
      })
    }
    return occurrences
  }
  if (question.kind === TRAIN_EXERCISE_FAMILIES.phrase.kind) {
    const phrases = question.mode === 'match' ? question.phrases || [] : [question.target].filter(Boolean)
    for (const phrase of phrases) occurrences.push(...phraseOccurrences(phrase, `phrase:${phrase.id}`))
    for (const [index, tile] of (question.bank || []).entries()) {
      if (tile.answerIndex != null) continue
      const candidateIds = tile.senseId ? [tile.senseId] : senseIdsForSurface(tile.text)
      occurrences.push({
        source: 'word bank',
        role: 'distractor tile',
        index,
        surface: tile.text,
        id: tile.senseId || (candidateIds.length === 1 ? candidateIds[0] : null),
        candidateIds,
        resolution: tile.senseId ? 'distractor metadata' : 'surface lookup',
      })
    }
    return occurrences
  }

  const targetSurface = question.formTarget?.surface || question.surface || question.ctx?.target || DICT[question.answerId]?.al
  if (question.ctx?.authoredAl || question.ctx?.al) {
    const contextPhrase = question.contextPhraseId && phraseById[question.contextPhraseId]
    if (contextPhrase) occurrences.push(...phraseOccurrences(contextPhrase, `reviewed-context:${contextPhrase.id}`))
    else occurrences.push(...genericTextOccurrences(question.ctx.authoredAl || question.ctx.al, 'reviewed context', {
      targetId: question.answerId,
      targetSurface,
    }))
  } else if (question.context?.al) {
    occurrences.push(...genericTextOccurrences(question.context.al, 'reviewed form context', {
      targetId: question.answerId,
      targetSurface,
    }))
  } else if (DICT[question.answerId]) {
    occurrences.push({
      source: 'question target',
      role: 'tested word',
      index: 0,
      surface: targetSurface,
      id: question.answerId,
      candidateIds: [question.answerId],
      resolution: 'question answer id',
    })
  }
  occurrences.push(...lexicalCheckOccurrences(question))
  occurrences.push(...explicitOptionOccurrences(question))
  occurrences.push(...stagedGrammarOccurrences(question))
  return occurrences
}

const relevantFormRewards = (state, id) => Object.fromEntries(Object.entries(state.formPracticed || {})
  .filter(([key]) => key.startsWith(`${id}::`)))

function wordRecord(id, occurrences, state, currentRound, nowMs) {
  const entry = DICT[id]
  const definition = DEFS[id] || null
  const progressionOptions = wordProgressionOptionsForSense(id)
  const normalizedProgress = normalizeWordProgress(state.wordProgress?.[id], currentRound)
  return {
    id,
    surfacesInActivity: [...new Set(occurrences.map(({ surface }) => surface))],
    occurrenceCount: occurrences.length,
    occurrences,
    dictionary: entry,
    albanianDefinition: definition ? {
      rendered: definitionSurface(definition),
      tokens: definition,
    } : null,
    trainability: lexicalTrainability(id),
    formTrack: formTrackForSense(id),
    playableFormInventory: PLAYABLE_FORM_INVENTORY[id] || [],
    playableUsageBySurface: serializedUsage(id),
    reviewedFormTargets: reviewedFormTargets(id),
    reviewedContextEligibility: reviewedContextEligibilityForSense(id),
    progressionOptions,
    learner: {
      discovered: Boolean(state.discovered?.[id]),
      tokens: state.mana?.[id] || 0,
      practiceRewards: state.practiced?.[id] || 0,
      reviewedFormRewards: relevantFormRewards(state, id),
      wordMatching: normalizeWordMatchingProgress(state.wordMatchingProgress).words[id] || null,
      persistedProgress: state.wordProgress?.[id] || null,
      normalizedProgress,
      capabilitySnapshot: wordCapabilitySnapshot(normalizedProgress, currentRound, { ...progressionOptions, nowMs }),
      passiveExposure: wordExposureFor(state, id),
    },
  }
}

function phraseRecord(phrase, state, currentRound, nowMs) {
  const focusIds = phraseProductionFocusIds(phrase)
  const production = normalizePhraseProductionProgress(
    state.phraseProductionProgress?.[phrase.id],
    focusIds,
    currentRound,
  )
  const listening = normalizePhraseSkillProgress(
    state.phraseListeningProgress?.[phrase.id] ?? { tier: state.phraseListeningMastery?.[phrase.id] || 0 },
    'listening',
  )
  const matching = normalizePhraseSkillProgress(
    state.phraseMatchingProgress?.[phrase.id] ?? { tier: state.phraseMatchingMastery?.[phrase.id] || 0 },
    'matching',
  )
  return {
    authored: phrase,
    wordMapping: phraseSenseOccurrences(phrase),
    focusIds,
    persisted: {
      correct: state.phrasePracticed?.[phrase.id] || 0,
      mistakes: state.phraseMistakes?.[phrase.id] || 0,
      production,
      listening,
      matching,
    },
    progressionSnapshot: buildPhraseProgressionSnapshot(phrase, production, {
      currentRound,
      listeningTier: state.phraseListeningMastery?.[phrase.id] || 0,
      matchingTier: state.phraseMatchingMastery?.[phrase.id] || 0,
      listeningProgress: listening,
      matchingProgress: matching,
      nowMs,
    }),
  }
}

const familyForQuestion = (question) => Object.values(TRAIN_EXERCISE_FAMILIES)
  .find(({ id }) => id === question?.familyId) || Object.values(TRAIN_EXERCISE_FAMILIES)
  .find(({ kind }) => kind === question?.kind) || null

export function buildDebugTrainActivity(question, state = {}, nowMs = Date.now()) {
  const currentRound = Number.isSafeInteger(state.trainRound) ? state.trainRound : 0
  const occurrences = trainActivityWordOccurrences(question)
  const resolvedIds = [...new Set(occurrences.flatMap(({ id, candidateIds }) => id ? [id] : candidateIds || []))]
    .filter((id) => DICT[id])
  const byId = new Map(resolvedIds.map((id) => [id, []]))
  for (const occurrence of occurrences) {
    const ids = occurrence.id ? [occurrence.id] : occurrence.candidateIds || []
    for (const id of ids) byId.get(id)?.push(occurrence)
  }
  const phrases = question?.kind === TRAIN_EXERCISE_FAMILIES.phrase.kind
    ? (question.mode === 'match' ? question.phrases || [] : [question.target].filter(Boolean))
    : question?.contextPhraseId && phraseById[question.contextPhraseId]
      ? [phraseById[question.contextPhraseId]]
      : []
  const schedulerReason = question?.debugSelection?.scheduler?.reason ||
    question?.debugSelection?.selected?.reason ||
    'No debug decision trace was requested when this activity was built.'
  return {
    mode: 'debug-current-train-activity',
    evaluatedAtMs: nowMs,
    currentRound,
    schedulerReason,
    family: familyForQuestion(question),
    question: {
      key: question?.questionKey || null,
      kind: question?.kind || null,
      mode: question?.mode || null,
      skill: question?.skill || null,
      tier: question?.tier ?? null,
      wordStageId: question?.wordStageId || null,
      variantId: question?.variantId || null,
      difficultyLabel: question?.difficultyLabel || null,
      answerId: question?.answerId || null,
      answerValue: question?.answerValue ?? null,
      rewardIds: question?.rewardIds || (question?.answerId ? [question.answerId] : []),
      targetFormKey: question?.targetFormKey || null,
      focusId: question?.focusId || null,
      answerTolerance: question?.answerTolerance || null,
      remediation: question?.remediation || null,
      distractorPolicy: question?.distractorPolicy || null,
      phasePlan: question?.phasePlan || null,
      phaseAspectTargets: question?.phaseAspectTargets || null,
      aspectTargets: question?.aspectTargets || [],
      aspectRegistryVersion: question?.aspectRegistryVersion || WORD_ASPECT_REGISTRY_VERSION,
      lexicalCheck: question?.lexicalCheck || null,
      targetReference: question?.targetReference || null,
      audioSurface: question?.audioSurface || question?.target?.al || null,
      stimulusMode: question?.stimulusMode || null,
      requiresCompletedAudio: question?.requiresCompletedAudio === true,
      spellingSupportPolicy: question?.answerTolerance
        ? {
            ...WORD_SPELLING_SUPPORT_POLICY,
            activeTolerance: question.answerTolerance,
          }
        : null,
      trainHealth: trainHealthPlanForQuestion(state, question),
    },
    selectionTrace: question?.debugSelection || null,
    distractorPlan: question?.debugSelection?.distractors || question?.lexicalCheck?.distractorPlan || null,
    occurrences,
    unresolvedOccurrences: occurrences.filter(({ candidateIds }) => candidateIds.length !== 1),
    words: resolvedIds.map((id) => wordRecord(id, byId.get(id), state, currentRound, nowMs)),
    phrases: phrases.map((phrase) => phraseRecord(phrase, state, currentRound, nowMs)),
    registries: {
      family: familyForQuestion(question),
      mixPolicy: TRAIN_QUESTION_MIX_POLICY,
      safeguards: TRAIN_SCHEDULER_SAFEGUARDS,
      wordAspectRegistry: WORD_LEARNING_ASPECTS,
      wordStageAspectBindings: WORD_STAGE_ASPECT_BINDINGS,
      trainHealthPolicy: TRAIN_HEALTH_POLICY,
      wordSpellingSupportPolicy: WORD_SPELLING_SUPPORT_POLICY,
    },
    relevantPersistedState: {
      trainRound: currentRound,
      trainLastWords: state.trainLastWords || [],
      trainLastQuestionKey: state.trainLastQuestionKey || null,
      trainActivityHistory: normalizeTrainActivityHistory(state.trainActivityHistory),
      trainStageExposures: normalizeTrainStageExposures(state.trainStageExposures),
      trainHealingStreak: normalizeTrainHealingStreak(state.trainHealingStreak),
      wordMatchingProgress: normalizeWordMatchingProgress(state.wordMatchingProgress),
    },
    rawQuestion: question,
  }
}
