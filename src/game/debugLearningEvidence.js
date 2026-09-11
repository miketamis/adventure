import { EVERYDAY_PHRASE_DRILLS } from './everydayAlbanian.js'
import { phraseProductionFocusIds } from './phraseFocus.js'
import { buildPhraseProgressionSnapshot } from './phrasePractice.js'
import { normalizePhraseProductionProgress } from './phraseProgression.js'
import { wordProgressionOptionsForSense } from './formInventory.js'
import { lexicalTrainability } from './lexicalTrainability.js'
import { normalizeWordProgress, wordCapabilitySnapshot } from './wordProgression.js'

export const LEARNING_INSPECTOR_PHRASE_ID = 'going-village'
export const LEARNING_INSPECTOR_WORDS = Object.freeze([
  { id: 'po_prog', surface: 'po' },
  { id: 'shko', surface: 'shkoj' },
  { id: 'ne', surface: 'në' },
  { id: 'fshat', surface: 'fshat' },
])

const absent = (reason = 'not stored for this evidence track') => ({ status: 'absent', reason })

export function buildLearningEvidenceInspector(state = {}) {
  const phrase = EVERYDAY_PHRASE_DRILLS.find(({ id }) => id === LEARNING_INSPECTOR_PHRASE_ID)
  const currentRound = Number.isSafeInteger(state.trainRound) ? state.trainRound : 0
  const focusIds = phraseProductionFocusIds(phrase)
  const production = normalizePhraseProductionProgress(state.phraseProductionProgress?.[phrase.id], focusIds, currentRound)
  const listeningTier = state.phraseListeningMastery?.[phrase.id] || 0
  const matchingTier = state.phraseMatchingMastery?.[phrase.id] || 0
  const phraseSnapshot = buildPhraseProgressionSnapshot(phrase, production, { currentRound, listeningTier, matchingTier })
  const phrasePersisted = {
    production,
    listening: {
      tier: listeningTier,
      wins: absent('listening currently persists a normalized mastery tier, not a separate win ledger'),
      proofs: absent('listening proof keys are not persisted separately'),
      spacing: absent('listening spacing is not persisted separately'),
      due: phraseSnapshot.listening.eligible,
      remediation: absent('listening remediation is represented by its retained tier'),
      lastAttempt: absent('no listening-specific last-attempt key is persisted'),
    },
    matching: {
      tier: matchingTier,
      wins: absent('matching currently persists a normalized mastery tier, not a separate win ledger'),
      proofs: absent('matching proof keys are not persisted separately'),
      spacing: absent('matching spacing is not persisted separately'),
      due: phraseSnapshot.matching.eligible,
      remediation: absent('matching remediation is represented by its retained tier'),
      lastAttempt: absent('no matching-specific last-attempt key is persisted'),
    },
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
    const snapshot = wordCapabilitySnapshot(progress, currentRound, options)
    const persisted = {
      discovered: Boolean(state.discovered?.[mapping.id]),
      saved: Boolean(state.discovered?.[mapping.id]),
      tokens: state.mana?.[mapping.id] || 0,
      practiceRewards: state.practiced?.[mapping.id] || 0,
      reviewedFormRewards: Object.fromEntries(Object.entries(state.formPracticed || {})
        .filter(([key]) => key.startsWith(`${mapping.id}::`))),
      progress,
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
