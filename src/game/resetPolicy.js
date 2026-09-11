// One explicit boundary between a story run and the learner who plays it.
// Reducers, migrations, and audits consume these lists rather than maintaining
// separate hand-written carry-over spreads that inevitably drift.

const TRAINING_SESSION_DEFAULTS = Object.freeze({
  practiceTarget: null,
  trainLastWords: Object.freeze([]),
  trainLastQuestionKey: null,
  pendingHeartConsequence: null,
})

export const STORY_RUN_RESET_POLICY = Object.freeze({
  learnerProfile: Object.freeze([
    'discovered',
    'mana',
    'practiced',
    'wordProgressVersion',
    'wordProgress',
    'formPracticed',
    'phrasePracticed',
    'phraseMistakes',
    'phraseProgressVersion',
    'phraseProductionProgress',
    'phraseMastery',
    'phraseListeningMastery',
    'phraseMatchingMastery',
    'trainRound',
    'cefrEvidenceVersion',
    'cefrEvidence',
    'cefrPreparationVersion',
    'cefrPreparationPasses',
    'cefrPreparationAttempts',
  ]),
  durableChronicle: Object.freeze([
    'visited',
    'heard',
    'earned',
    'eligible',
    'attempts',
    'worldFacts',
    'knowledge',
    'npcPortraitsSeen',
  ]),
  preferences: Object.freeze(['debug']),
  clearTrainingSession: Object.freeze(Object.keys(TRAINING_SESSION_DEFAULTS)),
})

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
