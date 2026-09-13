import { EVERYDAY_PHRASE_DRILLS } from './everydayAlbanian.js'
import { phraseProductionFocusIds } from './phraseFocus.js'
import { buildPhraseProgressionSnapshot } from './phrasePractice.js'
import { normalizePhraseProductionProgress, normalizePhraseSkillProgress } from './phraseProgression.js'
import { wordProgressionOptionsForSense } from './formInventory.js'
import { lexicalTrainability } from './lexicalTrainability.js'
import { normalizeWordProgress, wordCapabilitySnapshot } from './wordProgression.js'
import { wordExposureFor } from './wordExposure.js'

export const LEARNING_INSPECTOR_PHRASE_ID = 'going-village'
export const LEARNING_INSPECTOR_WORDS = Object.freeze([
  { id: 'po_prog', surface: 'po' },
  { id: 'shko', surface: 'shkoj' },
  { id: 'ne', surface: 'në' },
  { id: 'fshat', surface: 'fshat' },
])

export function buildLearningEvidenceInspector(state = {}, nowMs = 0) {
  const phrase = EVERYDAY_PHRASE_DRILLS.find(({ id }) => id === LEARNING_INSPECTOR_PHRASE_ID)
  const currentRound = Number.isSafeInteger(state.trainRound) ? state.trainRound : 0
  const focusIds = phraseProductionFocusIds(phrase)
  const production = normalizePhraseProductionProgress(state.phraseProductionProgress?.[phrase.id], focusIds, currentRound)
  const listeningTier = state.phraseListeningMastery?.[phrase.id] || 0
  const matchingTier = state.phraseMatchingMastery?.[phrase.id] || 0
  const listening = normalizePhraseSkillProgress(
    state.phraseListeningProgress?.[phrase.id] ?? { tier: listeningTier },
    'listening',
  )
  const matching = normalizePhraseSkillProgress(
    state.phraseMatchingProgress?.[phrase.id] ?? { tier: matchingTier },
    'matching',
  )
  const phraseSnapshot = buildPhraseProgressionSnapshot(phrase, production, {
    currentRound,
    listeningTier,
    matchingTier,
    listeningProgress: listening,
    matchingProgress: matching,
    nowMs,
  })
  const phrasePersisted = {
    production,
    listening: { ...listening, due: phraseSnapshot.listening.due, adaptation: phraseSnapshot.listening.adaptation },
    matching: { ...matching, due: phraseSnapshot.matching.due, adaptation: phraseSnapshot.matching.adaptation },
    totals: {
      correct: state.phrasePracticed?.[phrase.id] || 0,
      mistakes: state.phraseMistakes?.[phrase.id] || 0,
    },
    lastQuestionKey: state.trainLastQuestionKey || null,
  }

  const words = LEARNING_INSPECTOR_WORDS.map((mapping) => {
    const options = wordProgressionOptionsForSense(mapping.id)
    const forms = options.reviewedForms
    const trainability = options.trainability
    const progress = normalizeWordProgress(state.wordProgress?.[mapping.id], currentRound)
    const snapshot = wordCapabilitySnapshot(progress, currentRound, { ...options, nowMs })
    const persisted = {
      discovered: Boolean(state.discovered?.[mapping.id]),
      saved: Boolean(state.discovered?.[mapping.id]),
      tokens: state.mana?.[mapping.id] || 0,
      practiceRewards: state.practiced?.[mapping.id] || 0,
      reviewedFormRewards: Object.fromEntries(Object.entries(state.formPracticed || {})
        .filter(([key]) => key.startsWith(`${mapping.id}::`))),
      progress,
      passiveExposure: wordExposureFor(state, mapping.id),
    }
    return {
      ...mapping,
      trainability,
      reviewedForms: forms,
      persisted,
      snapshot,
      currentStageId: snapshot.currentStageId,
      nextStageId: snapshot.nextStageId,
    }
  })

  const identityExample = lexicalTrainability('elira')
  return {
    mode: 'live-current-save',
    deterministicWalkthroughIndependent: true,
    currentRound,
    evaluatedAtMs: nowMs,
    researchTelemetry: {
      consent: state.learningResearchConsent === true,
      localOnly: true,
      eventCount: Array.isArray(state.learningTelemetryEvents) ? state.learningTelemetryEvents.length : 0,
      lastEvent: Array.isArray(state.learningTelemetryEvents) ? state.learningTelemetryEvents.at(-1) || null : null,
    },
    phrase: {
      id: phrase.id,
      al: phrase.al,
      en: phrase.en,
      mapping: LEARNING_INSPECTOR_WORDS,
      focusIds,
      eligible: phrase.requires.filter((id) => lexicalTrainability(id).trainable).every((id) => state.discovered?.[id]),
      currentStageId: phraseSnapshot.currentDefinition.id,
      nextStageId: phraseSnapshot.next?.stage == null
        ? null
        : phraseSnapshot.gates.find((gate) => gate.tier === phraseSnapshot.next.stage)?.id || null,
      due: phraseSnapshot.due,
      snapshot: phraseSnapshot,
      persisted: phrasePersisted,
    },
    words,
    identityExample: {
      id: 'elira',
      ...identityExample,
      status: identityExample.trainable ? 'trainable' : 'not trainable: identity/proper name',
    },
  }
}
