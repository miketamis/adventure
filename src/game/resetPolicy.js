// One explicit boundary between a story run and the learner who plays it.
// Reducers, migrations, and audits consume these lists rather than maintaining
// separate hand-written carry-over spreads that inevitably drift.

const TRAINING_SESSION_DEFAULTS = Object.freeze({
  practiceTarget: null,
  trainGoalSession: null,
  trainLastWords: Object.freeze([]),
  trainLastQuestionKey: null,
  pendingHeartConsequence: null,
  trainHealingStreak: 0,
  trainCorrectCombo: 0,
  trainRecoveryEvent: null,
})

export const STORY_RUN_RESET_POLICY = Object.freeze({
  learnerProfile: Object.freeze([
    'discovered',
    'deathUnsavedWords',
    'mana',
    'practiced',
    'wordProgressVersion',
    'wordProgress',
    'wordExposureVersion',
    'wordExposure',
    'formPracticed',
    'phrasePracticed',
    'phraseMistakes',
    'phraseProgressVersion',
    'phraseProductionProgress',
    'phraseMastery',
    'phraseListeningMastery',
    'phraseMatchingMastery',
    'phraseListeningProgress',
    'phraseMatchingProgress',
    'trainRound',
    'trainActivityHistory',
    'trainTargetHistory',
    'trainHealthPolicyVersion',
    'trainStageExposures',
    'wordMatchingProgressVersion',
    'wordMatchingProgress',
    'storyLearningVersion',
    'storyLearningEvidence',
    'cefrEvidenceVersion',
    'cefrEvidence',
    'cefrPreparationVersion',
    'cefrPreparationPasses',
    'cefrPreparationAttempts',
    'learningTelemetryVersion',
    'learningResearchConsent',
    'learningTelemetrySequence',
    'learningTelemetryEvents',
  ]),
  durableChronicle: Object.freeze([
    'heard',
    'earned',
    'eligible',
    'attempts',
    'achievementReadings',
    'worldFacts',
    'knowledge',
    'npcPortraitsSeen',
  ]),
  preferences: Object.freeze(['debug']),
  clearTrainingSession: Object.freeze(Object.keys(TRAINING_SESSION_DEFAULTS)),
})

// Death creates a small, recoverable vocabulary consequence without destroying
// learning. Passing the opening two-recognition gate is enough to secure a
// saved word; the lifetime-practice fallback protects evidence migrated from
// older capability profiles and words repeatedly practised inside complete phrases.
export const DEATH_WORD_RETENTION_POLICY = Object.freeze({
  meaningRecognitionWins: 2,
  lifetimeCorrectPractice: 3,
})

export const deathVocabularyResetPlan = (state) => {
  const discovered = { ...(state?.discovered || {}) }
  const deathUnsavedWords = { ...(state?.deathUnsavedWords || {}) }
  for (const id of Object.keys(discovered)) {
    const meaningWins = state?.wordProgress?.[id]?.wins?.['meaning-recognition'] || 0
    const lifetimeCorrect = state?.practiced?.[id] || 0
    if (
      meaningWins >= DEATH_WORD_RETENTION_POLICY.meaningRecognitionWins ||
      lifetimeCorrect >= DEATH_WORD_RETENTION_POLICY.lifetimeCorrectPractice
    ) continue
    delete discovered[id]
    deathUnsavedWords[id] = true
  }
  return { discovered, deathUnsavedWords }
}

const carryFields = Object.freeze([
  ...STORY_RUN_RESET_POLICY.learnerProfile,
  ...STORY_RUN_RESET_POLICY.durableChronicle,
  ...STORY_RUN_RESET_POLICY.preferences,
])

export const storyRunCarryover = (state) => Object.fromEntries(
  carryFields.flatMap((field) => state?.[field] === undefined ? [] : [[field, state[field]]]),
)

export const clearStoryRunTrainingSession = (state) => ({
  ...state,
  ...TRAINING_SESSION_DEFAULTS,
  // Never put the frozen policy sentinel itself into mutable game state.
  trainLastWords: [],
})
