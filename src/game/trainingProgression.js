import { PHRASE_STAGE_DEFINITIONS } from './phraseProgression.js'
import {
  WORD_CONTEXT_VARIANTS,
  WORD_PROGRESSION_POLICY,
  WORD_STAGE_DEFINITIONS,
} from './wordProgression.js'
import { WORD_MATCHING_POLICY } from './wordMatchingPolicy.js'
import { NOUN_GRAMMAR_ACTIVITY_VARIANTS } from './nounAgreementPractice.js'
import {
  TRAIN_ACTIVITY_BALANCE_POLICY,
  TRAIN_TARGET_BALANCE_POLICY,
} from './trainActivityHistory.js'

export { TRAIN_HEALTH_POLICY } from './trainHealthPolicy.js'

export {
  WORD_CONTEXT_VARIANTS,
  WORD_PROGRESSION_POLICY,
  WORD_STAGE_DEFINITIONS,
} from './wordProgression.js'

const WORD_STAGE_BY_ID = Object.freeze(Object.fromEntries(WORD_STAGE_DEFINITIONS.map((stage) => [stage.id, stage])))

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
      WORD_STAGE_BY_ID['meaning-recognition'].variant,
      ...WORD_STAGE_BY_ID['controlled-lemma-retrieval'].variants,
      NOUN_GRAMMAR_ACTIVITY_VARIANTS.demonstrativeWholeChoice,
    ],
  },
  wordContext: {
    id: 'word-context', kind: 'ctx', label: 'Context gap', role: 'conditional',
    // Preserve identity with the scheduler's mirrored context definitions so
    // the debug graph cannot drift into a different set of unlock rules.
    variants: WORD_CONTEXT_VARIANTS,
  },
  wordAudioRecognition: {
    id: 'word-audio-recognition', kind: 'normal', label: 'Recognise a heard word', role: 'progression',
    variants: [
      WORD_STAGE_BY_ID['auditory-surface-recognition'],
      WORD_STAGE_BY_ID['auditory-surface-discrimination'],
      WORD_STAGE_BY_ID['auditory-meaning-recognition'],
    ],
  },
  wordSpelling: {
    id: 'word-spelling', kind: 'word-spelling', label: 'Word spelling', role: 'progression',
    variants: [
      WORD_STAGE_BY_ID['contextual-typed-recall'],
      WORD_STAGE_BY_ID['strict-spaced-recall'],
    ],
  },
  wordAudioSpelling: {
    id: 'word-audio-spelling', kind: 'word-spelling', label: 'Spell the heard word', role: 'progression',
    variants: [WORD_STAGE_BY_ID['auditory-word-spelling']],
  },
  wordMatching: {
    id: 'word-matching', kind: 'word-match', label: 'Mixed word matching', role: 'reinforcement',
    variants: [WORD_MATCHING_POLICY],
  },
  wordConstruction: {
    id: 'word-construction', kind: 'word-construction', label: 'Build the word or form', role: 'progression',
    variants: [WORD_STAGE_BY_ID['word-form-construction']],
  },
  wordAudioConstruction: {
    id: 'word-audio-construction', kind: 'word-construction', label: 'Build the heard word', role: 'progression',
    variants: [WORD_STAGE_BY_ID['auditory-word-construction']],
  },
  wordForms: {
    id: 'word-forms', kind: 'forms', label: 'Reviewed form and ending', role: 'progression', choiceDistractors: 3,
    variants: [
      WORD_STAGE_BY_ID['reviewed-form-contrast'],
      WORD_STAGE_BY_ID['grammatical-form-odd-one-out'],
      WORD_STAGE_BY_ID['noun-paradigm-matching'],
      WORD_STAGE_BY_ID['contextual-form-selection'],
      WORD_STAGE_BY_ID['reviewed-ending-recall'],
      WORD_STAGE_BY_ID['demonstrative-noun-agreement'],
      WORD_STAGE_BY_ID['adjective-linking-article-agreement'],
      WORD_STAGE_BY_ID['linked-noun-agreement-cloze'],
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
  activityBalance: TRAIN_ACTIVITY_BALANCE_POLICY,
  targetBalance: TRAIN_TARGET_BALANCE_POLICY,
  // Word direction and choice count are no longer random knobs: the exact
  // word-evidence stage owns both through WORD_STAGE_DEFINITIONS.
  wordDirection: { source: 'word-stage-definition' },
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
  practiceWinsRequired: 0,
  lexicalStageRequired: 1,
  lexicalPrerequisite: 'Complete two successful meaning-recognition rounds; then identify a reviewed form and its grammatical job, choose its exact ending, and later type that ending before whole-form spelling.',
  steps: TRAIN_EXERCISE_FAMILIES.wordForms.variants,
  correction: TRAIN_EXERCISE_FAMILIES.nounCorrection,
  nonNounCoverageFloor: 'reviewed playable surfaces only; no speculative conjugation generation',
})

// This is a derived view over the phrase-production sequence: every typed stage can
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
  preferDifferentActivityType: true,
  allowSameActivityTypeForDisjointFallback: true,
  noImmediatePhraseTargetRepeat: true,
  repeatWhenNoDisjointTargetExists: false,
  exhaustedPoolOutcome: 'caught-up',
  remediationUsesDisjointRound: true,
  wordSuccessDoesNotAdvancePhraseStage: true,
  phraseRewardsAlsoIncreaseWordPractice: true,
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
