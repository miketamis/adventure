import { PHRASE_STAGE_DEFINITIONS } from './phraseProgression.js'
import { WORD_PROGRESSION_POLICY } from './wordProgression.js'

export { WORD_PROGRESSION_POLICY, WORD_STAGE_DEFINITIONS } from './wordProgression.js'

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

// The builders and the debug graph consume this same registry. A quiz kind or
// variant must be registered here before it can enter Train, which makes the
// curriculum inspectable instead of leaving behavior hidden in JSX branches.
export const TRAIN_EXERCISE_FAMILIES = deepFreeze({
  wordMeaning: {
    id: 'word-meaning', kind: 'normal', label: 'Word meaning', role: 'progression',
    variants: [
      { id: 'al2en', label: 'Albanian → English' },
      { id: 'en2al', label: 'English → Albanian' },
    ],
  },
  wordContext: {
    id: 'word-context', kind: 'ctx', label: 'Meaning in context', role: 'conditional',
    variants: [{ id: 'highlighted-sense', label: 'Highlighted sense in a complete phrase' }],
  },
  wordSpelling: {
    id: 'word-spelling', kind: 'word-spelling', label: 'Word spelling', role: 'progression',
    variants: [
      { id: 'supported-word-spelling', label: 'Beginner-tolerant typed recall' },
      { id: 'retained-word-spelling', label: 'Strict spelling after a review gap' },
    ],
  },
  wordForms: {
    id: 'word-forms', kind: 'forms', label: 'Word forms', role: 'parallel', choiceDistractors: 3,
    variants: [
      { id: 'identify-lemma', step: 1, label: 'Reviewed form → word meaning' },
      { id: 'identify-job', step: 2, label: 'Noun form → grammatical job', nounOnly: true },
    ],
  },
  nounCorrection: {
    id: 'noun-correction', kind: 'forms-correction', label: 'Exact ending refresher', role: 'remediation',
    variants: [{ id: 'exact-paradigm', label: 'Same noun, different grammatical jobs' }],
  },
  phrase: {
    id: 'everyday-phrase', kind: 'everyday-phrase', label: 'Everyday phrase', role: 'progression',
    // Preserve the real stage objects by identity. This is a view over the
    // scheduler registry, not another list of phrase exercise definitions.
    variants: Object.values(PHRASE_STAGE_DEFINITIONS).flat(),
  },
})

export const TRAIN_QUESTION_MIX_POLICY = deepFreeze({
  phraseShare: 0.65,
  formShareWithinWordRounds: 0.35,
  // Word direction and choice count are no longer random knobs: the exact
  // word-evidence stage owns both through WORD_STAGE_DEFINITIONS.
  wordDirection: { source: 'word-stage-definition' },
  phraseSkill: { productionWhenDueUpperBound: 0.62, listeningUpperBound: 0.84 },
  practicalWordWeight: 3,
  zeroTokenWeight: 8,
  phraseTargeting: {
    mistakeBoostCap: 4,
    mistakeBoostPerMiss: 0.55,
    familiarityCap: 12,
    familiarityPerPractice: 0.18,
  },
})

export const TRAIN_WORD_FORM_POLICY = deepFreeze({
  practiceWinsRequired: 3,
  lexicalStageRequired: WORD_PROGRESSION_POLICY.formUnlock.requiredBaseStage,
  lexicalPrerequisite: WORD_PROGRESSION_POLICY.formUnlock.rationale,
  steps: TRAIN_EXERCISE_FAMILIES.wordForms.variants,
  correction: TRAIN_EXERCISE_FAMILIES.nounCorrection,
  nonNounCoverageFloor: 'reviewed playable surfaces only; no speculative conjugation generation',
})

// This is a derived view over the production ladder: every typed stage can
// diagnose a noun-ending miss, while selection/listening exercises cannot.
// The correction sheet is immediate feedback; the stage's existing
// `remediation` object remains the sole source for the later backed-off quiz.
export const TRAIN_NOUN_ENDING_CORRECTION_POLICY = deepFreeze({
  phraseProductionStages: PHRASE_STAGE_DEFINITIONS.production
    .filter((definition) => definition.mode === 'type'),
  phraseModes: ['type'],
  phraseScopes: ['word', 'phrase'],
  diagnosticKind: 'word',
  evidence: 'expected reviewed noun form plus a learner form that changes only that noun stem/ending',
  immediateFeedback: TRAIN_EXERCISE_FAMILIES.nounCorrection.variants[0],
  scheduledFollowUp: 'the same production stage remediation after a disjoint round',
})

export const TRAIN_SCHEDULER_SAFEGUARDS = deepFreeze({
  noImmediateSharedWords: true,
  repeatWhenNoDisjointTargetExists: false,
  exhaustedPoolOutcome: 'caught-up',
  remediationUsesDisjointRound: true,
  wordSuccessDoesNotAdvancePhraseStage: true,
  phraseRewardsAlsoIncreaseWordPractice: true,
})

// Concrete samples make the graph readable without redefining what unlocks
// them. Completeness is audited against both registries, so a new variant must
// gain an example before the debug contract can pass.
export const TRAIN_EXERCISE_EXAMPLES = deepFreeze({
  al2en: { prompt: 'fshat', promptLang: 'sq', response: 'village' },
  en2al: { prompt: 'village', promptLang: 'en', response: 'fshat' },
  'highlighted-sense': { prompt: 'Po shkoj në fshat. (në)', promptLang: 'sq', response: 'to / in' },
  'guided-word-recognition': { prompt: 'fshat', promptLang: 'sq', response: 'village · 1 distractor' },
  'independent-word-recognition': { prompt: 'fshat', promptLang: 'sq', response: 'village · 3 distractors' },
  'guided-word-selection': { prompt: 'village', promptLang: 'en', response: 'fshat · 1 distractor' },
  'independent-word-selection': { prompt: 'village', promptLang: 'en', response: 'fshat · 3 distractors' },
  'supported-word-spelling': { prompt: 'village', promptLang: 'en', response: 'type fshat · beginner leeway' },
  'retained-word-spelling': { prompt: 'village', promptLang: 'en', response: 'type fshat exactly after a gap' },
  'identify-lemma': { prompt: 'fshatin', promptLang: 'sq', response: 'village' },
  'identify-job': { prompt: 'fshatin', promptLang: 'sq', response: 'the village · object' },
  'exact-paradigm': { prompt: 'fshat · fshati · fshatin · fshatit', promptLang: 'sq', response: 'same noun; four labelled jobs, not a ladder' },
  'focused-cloze': { prompt: 'Po shkoj në _____.', promptLang: 'sq', response: 'fshat + distractors' },
  'whole-arrangement': { prompt: 'I am going to the village.', promptLang: 'en', response: 'po · shkoj · në · fshat + distractors' },
  'focus-spelling': { prompt: 'Po shkoj në _____.', promptLang: 'sq', response: 'type fshat in this sentence' },
  'independent-production': { prompt: 'I am going to the village.', promptLang: 'en', response: 'type the complete Albanian phrase' },
  'strict-retention': { prompt: 'I am going to the village.', promptLang: 'en', response: 'type the complete phrase after a review gap' },
  'guided-listening': { prompt: 'continuous Albanian audio', response: 'build what you hear · no English · distractors from policy' },
  'independent-listening': { prompt: 'continuous Albanian audio', response: 'build what you hear · larger word bank' },
  'mastered-listening': { prompt: 'continuous Albanian audio', response: 'build what you hear · largest word bank' },
  'guided-matching': { prompt: 'Albanian phrase cards', promptLang: 'sq', response: 'match each English meaning' },
  'independent-matching': { prompt: 'larger phrase board', promptLang: 'sq', response: 'match each meaning' },
  'mastered-matching': { prompt: 'largest phrase board', promptLang: 'sq', response: 'match each meaning' },
})

const tierStatus = (tier, currentTier, eligible, reportedStatus) => {
  if (!eligible) return 'locked'
  if (reportedStatus === 'locked') return 'locked'
  if (tier < currentTier) return 'passed'
  if (tier === currentTier) return 'current'
  return 'locked'
}

/**
 * Attach a supplied progression snapshot's status to the immutable scheduler
 * definitions. The debug walkthrough supplies a deterministic entry snapshot;
 * the `definition` property preserves object identity so no shadow gate exists.
 */
export function debugLearningLanes(snapshot, { phraseEligible = true } = {}) {
  const productionGateById = new Map((snapshot?.gates || []).map((gate) => [gate.id, gate]))
  const skillEligibility = {
    production: phraseEligible,
    listening: phraseEligible && snapshot?.listening?.eligible !== false,
    matching: phraseEligible && snapshot?.matching?.eligible !== false,
  }

  return Object.entries(PHRASE_STAGE_DEFINITIONS).map(([skill, definitions]) => ({
    id: skill,
    definitions,
    stages: definitions.map((definition) => {
      const gate = productionGateById.get(definition.id)
      const currentTier = snapshot?.[skill]?.tier ?? 0
      const status = skill === 'production'
        ? phraseEligible ? gate?.status || 'locked' : 'locked'
        : tierStatus(definition.tier, currentTier, skillEligibility[skill], snapshot?.[skill]?.status)
      return {
        definition,
        status,
        evidence: skill === 'production' ? gate?.evidence || null : { tier: currentTier },
        scheduled: phraseEligible && skill === 'production' && snapshot?.next?.stage === definition.tier,
        due: phraseEligible && skill === 'production' && snapshot?.next?.stage === definition.tier && Boolean(snapshot?.next?.due),
        remediation: phraseEligible && skill === 'production' && snapshot?.next?.stage === definition.tier && Boolean(snapshot?.next?.remediation),
      }
    }),
  }))
}
