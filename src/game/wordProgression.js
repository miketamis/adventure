// Canonical lexical learning capabilities. Train, persistence, CEFR readiness
// and Debug Learning all consume this graph; UI components must not invent
// their own gates or rename receptive selection as "production".

import {
  COLD_START_ADAPTATION_MODEL,
  ELAPSED_SPACING_POLICY,
  coldStartAdaptationSnapshot,
  emptyTemporalEvidence,
  normalizeTemporalEvidence,
  recordTemporalAttempt,
  temporalDue,
} from './adaptiveLearning.js'
import {
  WORD_ASPECT_REGISTRY_VERSION,
  WORD_LEARNING_ASPECTS,
  WORD_LEARNING_ASPECT_BY_ID,
  WORD_STAGE_ASPECT_BINDINGS,
  wordAspectDefinitionForStage,
  wordAspectEvidenceKey,
  wordAspectTargetsForPlan,
} from './wordLearningAspects.js'
import { NOUN_GRAMMAR_ACTIVITY_VARIANTS } from './nounAgreementPractice.js'
import { sensesMayShareAnswer } from './practiceAnswerValidity.js'
import {
  REVIEWED_FORM_ODD_ONE_OUT_VARIANT,
  reviewedFormOddOneOutPlan,
} from './reviewedFormOddOneOut.js'
import {
  NOUN_FORM_MATCHING_VARIANT,
  reviewedNounFormMatchingPlan,
} from './nounFormMatching.js'

export {
  WORD_ASPECT_REGISTRY_VERSION,
  WORD_LEARNING_ASPECTS,
  WORD_LEARNING_ASPECT_BY_ID,
  WORD_STAGE_ASPECT_BINDINGS,
  wordAspectTargetsForPlan,
} from './wordLearningAspects.js'

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const WORD_PROGRESS_VERSION = 13
export const WORD_MIN_INTERVENING_ROUNDS = 1
export const WORD_INITIAL_REVIEW_GAP = 6
export const WORD_MAX_REVIEW_GAP = 64

export const WORD_CONTEXT_EXERCISE_CONCEPT = 'context-gap'
export const WORD_CONTEXT_LATE_PROOF = 'unmarked-context-recognition'

export const WORD_CAPABILITY_DEFINITIONS = deepFreeze([
  { id: 'meaning-recognition', label: 'Recognise meaning', stageId: 'meaning-recognition' },
  { id: 'reviewed-form-awareness', label: 'Distinguish a reviewed form and job', stageId: 'reviewed-form-contrast', conditional: 'reviewed-form-lane' },
  { id: 'grammatical-form-odd-one-out', label: 'Find the noun form that differs in number or definiteness', stageId: 'grammatical-form-odd-one-out', conditional: 'reviewed-form-odd-one-out' },
  { id: 'noun-paradigm-matching', label: 'Match one noun’s uses to grammatical jobs', stageId: 'noun-paradigm-matching', conditional: 'reviewed-noun-paradigm-matching' },
  { id: 'auditory-surface-recognition', label: 'Recognise the written word from its audio', stageId: 'auditory-surface-recognition' },
  { id: 'auditory-surface-discrimination', label: 'Discriminate similar heard words', stageId: 'auditory-surface-discrimination' },
  { id: 'auditory-meaning-recognition', label: 'Recognise meaning from word audio', stageId: 'auditory-meaning-recognition', conditional: 'unambiguous-audio-sense' },
  { id: 'controlled-retrieval-supported', label: 'Retrieve from two choices', stageId: 'controlled-lemma-retrieval' },
  { id: 'controlled-retrieval-expanded', label: 'Retrieve from four choices', stageId: 'controlled-lemma-retrieval' },
  { id: 'demonstrative-noun-agreement', label: 'Choose this + noun agreement', stageId: 'demonstrative-noun-agreement', conditional: 'reviewed-demonstrative-frame' },
  { id: 'adjective-linking-article-agreement', label: 'Choose the adjective linking article', stageId: 'adjective-linking-article-agreement', conditional: 'reviewed-adjective-frame' },
  { id: 'linked-noun-agreement-cloze', label: 'Complete linked noun-phrase agreement', stageId: 'linked-noun-agreement-cloze', conditional: 'reviewed-linked-agreement-frame' },
  { id: 'contextual-form-selection', label: 'Choose the reviewed ending in context', stageId: 'contextual-form-selection', conditional: 'reviewed-noun-ending-lane' },
  { id: 'reviewed-ending-recall', label: 'Type the reviewed ending in context', stageId: 'reviewed-ending-recall', conditional: 'reviewed-noun-ending-lane' },
  { id: 'auditory-word-construction', label: 'Build the heard word from letter sounds', stageId: 'auditory-word-construction' },
  { id: 'auditory-word-spelling', label: 'Type the heard word', stageId: 'auditory-word-spelling' },
  { id: 'word-form-construction', label: 'Construct the word or form from a meaning or context cue', stageId: 'word-form-construction' },
  { id: 'contextual-typed-recall', label: 'Type it in context with beginner leeway', stageId: 'contextual-typed-recall' },
  { id: 'strict-spaced-recall', label: 'Recall it exactly after spacing', stageId: 'strict-spaced-recall' },
])
export const WORD_CAPABILITY_IDS = deepFreeze(WORD_CAPABILITY_DEFINITIONS.map(({ id }) => id))

export const WORD_CONTEXT_VARIANTS = deepFreeze([
  {
    id: 'marked-context-recognition',
    familyId: 'word-context',
    exerciseConceptId: WORD_CONTEXT_EXERCISE_CONCEPT,
    label: 'Marked context · recognise meaning',
    direction: 'al2en',
    mode: 'choice',
    choiceDistractors: 3,
    evidenceTrack: 'recognition',
    sourceLanguage: 'sq',
    gapLanguage: 'en',
    targetPresentation: 'marked',
    unlock: { kind: 'stage-active', stageId: 'meaning-recognition' },
  },
  {
    id: 'mirrored-controlled-retrieval',
    familyId: 'word-context',
    exerciseConceptId: WORD_CONTEXT_EXERCISE_CONCEPT,
    label: 'Mirrored context · controlled retrieval',
    direction: 'en2al',
    mode: 'choice',
    choiceDistractors: 'from-stage',
    evidenceTrack: 'controlled-retrieval',
    sourceLanguage: 'en',
    gapLanguage: 'sq',
    targetPresentation: 'gap',
    unlock: { kind: 'stage-active', stageId: 'controlled-lemma-retrieval' },
  },
  {
    id: WORD_CONTEXT_LATE_PROOF,
    familyId: 'word-context',
    exerciseConceptId: WORD_CONTEXT_EXERCISE_CONCEPT,
    label: 'Marked context · transfer check',
    direction: 'al2en',
    mode: 'choice',
    choiceDistractors: 3,
    evidenceTrack: 'recognition',
    sourceLanguage: 'sq',
    gapLanguage: 'en',
    targetPresentation: 'marked',
    unlock: { kind: 'before-stage', stageId: 'word-form-construction' },
    proofId: WORD_CONTEXT_LATE_PROOF,
    alignmentPolicy: {
      markedTargetRequiresExactlyOneTarget: true,
      missingOrAmbiguousTarget: 'skip-context-variant',
      malformedGapPair: 'skip-context-variant',
    },
  },
])

const CONTEXT_VARIANT_BY_ID = Object.freeze(Object.fromEntries(
  WORD_CONTEXT_VARIANTS.map((variant) => [variant.id, variant]),
))

export const WORD_STAGE_DEFINITIONS = deepFreeze([
  {
    tier: 0,
    id: 'meaning-recognition',
    label: 'meaning recognition',
    familyId: 'word-meaning',
    mode: 'choice',
    direction: 'al2en',
    evidenceTrack: 'recognition',
    contextVariantId: 'marked-context-recognition',
    variant: { id: 'four-choice-meaning', distractors: 3 },
    gate: { wins: 2 },
    capabilityIds: ['meaning-recognition'],
    proves: 'recognises this Albanian sense among four plausible meanings',
  },
  {
    tier: 1,
    id: 'reviewed-form-contrast',
    label: 'reviewed form contrast',
    familyId: 'word-forms',
    mode: 'choice',
    direction: 'form2role',
    evidenceTrack: 'form-awareness',
    conditional: 'reviewed-form-lane',
    variant: {
      id: 'class-specific-form-contrast',
      choiceRange: [2, 4],
      distractors: { min: 1, max: 3 },
      phases: [
        {
          id: 'identify-form-meaning',
          task: 'meaning-identification',
          aspectTargets: [{ aspectId: 'lexical-meaning-recognition', evidenceMode: 'prerequisite' }],
          familyId: 'word-meaning',
          direction: 'al2en',
          choiceDistractors: 3,
          completion: 'advance-without-evidence',
        },
        {
          id: 'identify-marked-form-job',
          task: 'grammatical-role',
          aspectTargets: [{ aspectId: 'grammatical-form-recognition', evidenceMode: 'write' }],
          familyId: 'word-forms',
          direction: 'form2role',
          completion: 'complete-stage-once',
        },
      ],
      evidencePolicy: 'one exact per-form result after both phases; the meaning-phase miss fails the whole activity without partial proof',
      rewardPolicy: 'one target-word reward only after both phases',
      aspectTargets: WORD_STAGE_ASPECT_BINDINGS['reviewed-form-contrast'],
    },
    gate: { wins: 1 },
    capabilityIds: ['reviewed-form-awareness'],
    proves: 'identifies the marked Albanian form’s meaning, then distinguishes that exact form’s grammatical job',
  },
  {
    tier: 2,
    id: 'grammatical-form-odd-one-out',
    label: 'reviewed form · grammatical odd one out',
    familyId: 'word-forms',
    mode: 'choice',
    direction: 'form2role',
    evidenceTrack: 'form-awareness',
    conditional: 'reviewed-form-odd-one-out',
    variant: REVIEWED_FORM_ODD_ONE_OUT_VARIANT,
    gate: { wins: 1 },
    capabilityIds: ['grammatical-form-odd-one-out'],
    proves: 'distinguishes the number or definiteness of one unambiguous reviewed noun surface from three opposite-category surfaces in the same paradigm',
  },
  {
    tier: 2,
    id: 'noun-paradigm-matching',
    label: 'one noun · grammar matching',
    familyId: 'word-forms',
    mode: 'match',
    direction: 'form2role',
    evidenceTrack: 'form-awareness',
    conditional: 'reviewed-noun-paradigm-matching',
    variant: NOUN_FORM_MATCHING_VARIANT,
    gate: { wins: 1 },
    capabilityIds: ['noun-paradigm-matching'],
    proves: 'matches five contextual uses of one reviewed noun root to five distinct grammatical jobs without an English sentence translation',
  },
  {
    tier: 2,
    id: 'auditory-surface-recognition',
    label: 'heard word · choose written Albanian',
    familyId: 'word-audio-recognition',
    mode: 'choice',
    direction: 'audio2al',
    evidenceTrack: 'listening-orthography',
    requiresCompletedAudio: true,
    stimulusMode: 'audio-only',
    variant: { id: 'audio-to-written-word', distractors: 3 },
    gate: { wins: 1 },
    capabilityIds: ['auditory-surface-recognition'],
    proves: 'recognises the written Albanian word after its continuous complete-word MP3 finishes',
  },
  {
    tier: 3,
    id: 'auditory-surface-discrimination',
    label: 'heard word · discriminate its surface',
    familyId: 'word-audio-recognition',
    mode: 'choice',
    direction: 'audio2al',
    evidenceTrack: 'listening-orthography',
    requiresCompletedAudio: true,
    stimulusMode: 'audio-only',
    variant: {
      id: 'audio-surface-discrimination',
      distractors: 3,
      choiceRange: [2, 4],
      subvariants: [
        { id: 'reviewed-sound-contrast', distractors: 1 },
        { id: 'saved-word-audio-choice', distractors: 3, fallbackFor: 'reviewed-sound-contrast' },
      ],
    },
    gate: { wins: 1 },
    capabilityIds: ['auditory-surface-discrimination'],
    proves: 'discriminates a heard word from a reviewed real-word contrast or a fresh saved-word set',
  },
  {
    tier: 4,
    id: 'auditory-meaning-recognition',
    label: 'heard word · choose meaning',
    familyId: 'word-audio-recognition',
    mode: 'choice',
    direction: 'audio2en',
    evidenceTrack: 'listening-comprehension',
    conditional: 'unambiguous-audio-sense',
    requiresCompletedAudio: true,
    stimulusMode: 'audio-only',
    variant: { id: 'audio-to-word-meaning', distractors: 3 },
    gate: { wins: 1 },
    capabilityIds: ['auditory-meaning-recognition'],
    proves: 'recognises the meaning of a continuous complete-word MP3 without a visible Albanian transcript',
  },
  {
    tier: 5,
    id: 'controlled-lemma-retrieval',
    label: 'controlled lemma retrieval',
    familyId: 'word-meaning',
    mode: 'choice',
    direction: 'en2al',
    evidenceTrack: 'controlled-retrieval',
    contextVariantId: 'mirrored-controlled-retrieval',
    variants: [
      { id: 'controlled-retrieval-two-choice', distractors: 1, gateWins: 1, capabilityId: 'controlled-retrieval-supported' },
      { id: 'controlled-retrieval-four-choice', distractors: 3, gateWins: 2, capabilityId: 'controlled-retrieval-expanded' },
    ],
    gate: { wins: 3 },
    capabilityIds: ['controlled-retrieval-supported', 'controlled-retrieval-expanded'],
    proves: 'retrieves the Albanian lemma from a controlled set; selection is not production',
  },
  {
    tier: 6,
    id: 'demonstrative-noun-agreement',
    label: 'demonstrative + noun agreement',
    familyId: 'word-forms',
    mode: 'choice',
    direction: 'en2al',
    evidenceTrack: 'noun-agreement',
    conditional: 'reviewed-demonstrative-frame',
    variant: NOUN_GRAMMAR_ACTIVITY_VARIANTS.demonstrativeSplitChoice,
    gate: { wins: 1 },
    capabilityIds: ['demonstrative-noun-agreement'],
    proves: 'chooses the reviewed gender-marked demonstrative and retrieves the noun in one staged activity',
  },
  {
    tier: 7,
    id: 'adjective-linking-article-agreement',
    label: 'adjective linking-article agreement',
    familyId: 'word-forms',
    mode: 'choice',
    direction: 'form2role',
    evidenceTrack: 'noun-agreement',
    conditional: 'reviewed-adjective-frame',
    variant: NOUN_GRAMMAR_ACTIVITY_VARIANTS.adjectiveArticleStaged,
    gate: { wins: 1 },
    capabilityIds: ['adjective-linking-article-agreement'],
    proves: 'identifies the noun before choosing the reviewed i/e article that links its adjective',
  },
  {
    tier: 8,
    id: 'linked-noun-agreement-cloze',
    label: 'linked noun-phrase agreement',
    familyId: 'word-forms',
    mode: 'choice',
    direction: 'form2role',
    evidenceTrack: 'noun-agreement',
    conditional: 'reviewed-linked-agreement-frame',
    variant: NOUN_GRAMMAR_ACTIVITY_VARIANTS.linkedAgreementCloze,
    gate: { wins: 1 },
    capabilityIds: ['linked-noun-agreement-cloze'],
    proves: 'completes the demonstrative and adjective linking article in one reviewed Albanian noun phrase',
  },
  {
    tier: 9,
    id: 'contextual-form-selection',
    label: 'choose the reviewed noun ending',
    familyId: 'word-forms',
    mode: 'choice',
    direction: 'context2ending',
    evidenceTrack: 'ending-selection',
    conditional: 'reviewed-noun-ending-lane',
    variant: { id: 'reviewed-ending-choice', choiceRange: [2, 4], distractors: { min: 1, max: 3 } },
    gate: { wins: 1 },
    capabilityIds: ['contextual-form-selection'],
    proves: 'selects only the exact reviewed ending required by a real Albanian context',
  },
  {
    tier: 10,
    id: 'reviewed-ending-recall',
    label: 'type the reviewed noun ending',
    familyId: 'word-forms',
    mode: 'type',
    direction: 'context2ending',
    evidenceTrack: 'ending-recall',
    answerTolerance: 'strict',
    conditional: 'reviewed-noun-ending-lane',
    variant: { id: 'reviewed-ending-typed' },
    gate: { wins: 1 },
    capabilityIds: ['reviewed-ending-recall'],
    proves: 'recalls and types only the exact reviewed ending required by a real Albanian context',
  },
  {
    tier: 11,
    id: 'auditory-word-construction',
    label: 'heard word · supplied letters',
    familyId: 'word-audio-construction',
    mode: 'construct',
    direction: 'audio2al',
    evidenceTrack: 'listening-orthography',
    requiresCompletedAudio: true,
    stimulusMode: 'audio-only',
    answerTolerance: 'repair',
    variant: { id: 'audio-letter-construction', distractorChunks: 3, tileAudio: 'recorded-mp3' },
    gate: { wins: 1 },
    capabilityIds: ['auditory-word-construction'],
    proves: 'maps a continuous recorded Albanian word to its exact spelling using supplied letter chunks',
  },
  {
    tier: 12,
    id: 'auditory-word-spelling',
    label: 'heard word · typed spelling',
    familyId: 'word-audio-spelling',
    mode: 'type',
    direction: 'audio2al',
    evidenceTrack: 'listening-orthography',
    requiresCompletedAudio: true,
    stimulusMode: 'audio-only',
    answerTolerance: 'repair',
    variant: { id: 'audio-typed-spelling' },
    gate: { wins: 1 },
    capabilityIds: ['auditory-word-spelling'],
    proves: 'maps a continuous recorded Albanian word to an exact independently typed spelling',
  },
  {
    tier: 13,
    id: 'word-form-construction',
    label: 'word / form construction',
    familyId: 'word-construction',
    mode: 'construct',
    direction: 'en2al',
    evidenceTrack: 'production',
    answerTolerance: 'repair',
    variant: { id: 'letter-and-chunk-construction', distractorChunks: 3 },
    gate: { wins: 1 },
    capabilityIds: ['word-form-construction'],
    proves: 'constructs the target from Albanian letters or chunks',
  },
  {
    tier: 14,
    id: 'contextual-typed-recall',
    label: 'beginner-tolerant contextual recall',
    familyId: 'word-spelling',
    mode: 'type',
    direction: 'en2al',
    evidenceTrack: 'production',
    answerTolerance: 'repair',
    gate: { wins: 1 },
    capabilityIds: ['contextual-typed-recall'],
    proves: 'recalls and types the word or reviewed form in context with beginner leeway',
  },
  {
    tier: 15,
    id: 'strict-spaced-recall',
    label: 'strict spaced recall',
    familyId: 'word-spelling',
    mode: 'type',
    direction: 'en2al',
    evidenceTrack: 'production',
    answerTolerance: 'strict',
    gate: { kind: 'spaced-retention', initialGapRounds: WORD_INITIAL_REVIEW_GAP, multiplier: 2 },
    capabilityIds: ['strict-spaced-recall'],
    proves: 'recalls the exact reviewed surface after an expanding review gap',
  },
])

export const WORD_SKILL_MAX_TIER = Math.max(...WORD_STAGE_DEFINITIONS.map(({ tier }) => tier))
const STAGE_BY_ID = Object.freeze(Object.fromEntries(WORD_STAGE_DEFINITIONS.map((stage) => [stage.id, stage])))

export const WORD_PROGRESSION_POLICY = deepFreeze({
  version: WORD_PROGRESS_VERSION,
  principle: 'Saving supplies guided recognition. After two meaning recognitions, independently evidenced aspects compete from their own prerequisites: a reviewed form meaning-and-job card receives the first exact-tie priority, then complete-word audio recognition, exact ending choice and recall, controlled retrieval, authored noun agreement, sound-led spelling and later production. This registry order is only a deterministic tie-break, never a mastery ladder.',
  stageOrder: WORD_STAGE_DEFINITIONS.map(({ id }) => id),
  productionBeginsAt: 'word-form-construction',
  controlledRetrievalVariants: STAGE_BY_ID['controlled-lemma-retrieval'].variants,
  auditoryRecognition: {
    familyId: 'word-audio-recognition',
    stages: ['auditory-surface-recognition', 'auditory-surface-discrimination', 'auditory-meaning-recognition'],
    source: 'continuous complete-word MP3 only',
    rule: 'First identify the written Albanian word from audio. A second proof uses a reviewed real-word sound contrast when its partner is saved, otherwise another distinct saved-word set; only then identify meaning from audio. Playback must complete before any result is accepted.',
  },
  formLane: {
    conditionalCapabilities: ['reviewed-form-awareness', 'grammatical-form-odd-one-out', 'noun-paradigm-matching', 'contextual-form-selection', 'reviewed-ending-recall'],
    source: 'reviewed forms only',
    rule: 'After two successful lemma recognitions, inflecting senses immediately practise an exact reviewed form-and-role record. A noun with a safe exact stem split then chooses and later types the ending for that same form; each form keeps its own evidence.',
  },
  nounAgreement: {
    source: 'explicit reviewed noun-agreement frames only',
    wholeBundleVariant: 'demonstrative-noun-whole-choice',
    independentlyScoredAspects: ['demonstrative-noun-agreement', 'adjective-linking-article-agreement', 'linked-noun-agreement-cloze'],
    rule: 'The first whole demonstrative+noun choice remains lexical retrieval. Later staged activities separately prove ky/kjo agreement and i/e adjective-linking agreement before one reviewed two-gap phrase combines both decisions; none is inferred from a guessed ending.',
  },
  contextVariant: {
    exerciseConceptId: WORD_CONTEXT_EXERCISE_CONCEPT,
    variants: WORD_CONTEXT_VARIANTS,
    rule: 'Marked and mirrored contexts provide early recognition/retrieval support. The later transfer check keeps the exact target visibly marked and asks directly for its meaning or grammatical job in a fresh reviewed Albanian situation.',
  },
  remediation: {
    delayedByDisjointRounds: WORD_MIN_INTERVENING_ROUNDS,
    rule: 'A production miss backs off to targeted support after one disjoint round; strict recall remains spaced.',
  },
  evidenceBoundary: {
    recognition: ['meaning-recognition', 'marked-context-recognition', 'unmarked-context-recognition'],
    listeningRecognition: ['audio-to-written-word', 'audio-to-word-meaning'],
    controlledRetrieval: ['controlled-retrieval-two-choice', 'controlled-retrieval-four-choice', 'mirrored-controlled-retrieval', 'demonstrative-noun-whole-choice'],
    nounAgreement: ['demonstrative-noun-split-choice', 'adjective-linking-article-staged', 'linked-noun-agreement-cloze'],
    grammaticalContrast: ['reviewed-form-odd-one-out', 'same-root-grammar-matching'],
    production: ['word-form-construction', 'contextual-typed-recall', 'strict-spaced-recall'],
    proves: ['word meaning recognition', 'word-level listening recognition', 'controlled lemma retrieval', 'reviewed form/job recognition', 'reviewed ending selection and recall', 'constructed and typed recall'],
    doesNotProve: ['free conversation', 'broad listening comprehension', 'CEFR attainment'],
  },
  elapsedSpacing: ELAPSED_SPACING_POLICY,
  adaptation: COLD_START_ADAPTATION_MODEL,
})

const safeCount = (value) => {
  const numeric = typeof value === 'number' ? value : Number(value)
  return Number.isSafeInteger(numeric) && numeric > 0 ? numeric : 0
}
const safeRound = (value) => Math.max(0, safeCount(value))
const safeString = (value, max = 200) => typeof value === 'string' && value ? value.slice(0, max) : null
const isWordCharacter = (value) => typeof value === 'string' && /[\p{L}\p{M}\p{N}_]/u.test(value)

export function wordContextAlignment(value, answerSurface = null) {
  const context = value && typeof value === 'object' && !Array.isArray(value) ? value : null
  const al = typeof context?.al === 'string' ? context.al.trim() : ''
  const en = typeof context?.en === 'string' ? context.en.trim() : ''
  const focus = typeof context?.focus === 'string' ? context.focus.trim() : ''
  if (!al || !en || !focus) {
    return { usable: false, uniqueTarget: false, mirrorSafe: false, reason: 'missing-context-field', targetMatches: 0, gapCount: 0 }
  }
  const gapCount = en.split('__').length - 1
  if (gapCount !== 1) {
    return { usable: false, uniqueTarget: false, mirrorSafe: false, reason: 'malformed-gap-pair', targetMatches: 0, gapCount }
  }
  const targetRanges = []
  // Sentence-initial targets are routinely capitalised in real dialogue. The
  // lexical identity is case-insensitive, while the returned offsets still
  // point into the authored string so builders preserve its punctuation and
  // typography.
  const searchableAl = al.toLocaleLowerCase('sq')
  const searchableFocus = focus.toLocaleLowerCase('sq')
  let cursor = 0
  while (cursor <= al.length - focus.length) {
    const start = searchableAl.indexOf(searchableFocus, cursor)
    if (start < 0) break
    const end = start + focus.length
    const left = start > 0 ? al[start - 1] : ''
    const right = end < al.length ? al[end] : ''
    if (!isWordCharacter(left) && !isWordCharacter(right)) targetRanges.push({ start, end })
    cursor = start + Math.max(1, focus.length)
  }
  if (!targetRanges.length) {
    return { usable: false, uniqueTarget: false, mirrorSafe: false, reason: 'missing-target', targetMatches: 0, gapCount }
  }
  const exact = targetRanges.length === 1
  const reviewedAnswer = typeof answerSurface === 'string' ? answerSurface.trim() : null
  const answerSurfaceAligned = reviewedAnswer == null || focus === reviewedAnswer
  const retrievalCueReviewed = context?.retrieval?.reviewed === true &&
    typeof context.retrieval.en === 'string' && Boolean(context.retrieval.en.trim())
  return {
    usable: true,
    uniqueTarget: exact,
    mirrorSafe: exact && answerSurfaceAligned && retrievalCueReviewed,
    reason: !exact ? 'ambiguous-target' : !answerSurfaceAligned
      ? 'answer-surface-mismatch' : retrievalCueReviewed ? null : 'unreviewed-retrieval-cue',
    answerSurfaceAligned,
    retrievalCueReviewed,
    targetMatches: targetRanges.length,
    targetRanges,
    targetRange: exact ? targetRanges[0] : null,
    gapCount,
  }
}

const emptyFormProof = () => ({
  wins: {},
  strictWins: 0,
  dueAfterRound: 0,
  reviewGap: WORD_INITIAL_REVIEW_GAP,
  lastAttemptKey: null,
  lastAttemptRound: 0,
  temporal: emptyTemporalEvidence(),
})

export function emptyWordProgress() {
  return {
    aspectRegistryVersion: WORD_ASPECT_REGISTRY_VERSION,
    aspectProofs: {},
    wins: {},
    contextWins: {},
    contextSupportRequired: false,
    formProofs: {},
    activeFormKey: null,
    strictWins: 0,
    dueAfterRound: 0,
    reviewGap: WORD_INITIAL_REVIEW_GAP,
    lastAttemptKey: null,
    lastAttemptRound: 0,
    remediation: null,
    temporal: emptyTemporalEvidence(),
  }
}

const emptyAspectProof = () => ({
  wins: 0,
  attempts: 0,
  correctAttempts: 0,
  dueAfterRound: 0,
  lastAttemptKey: null,
  lastAttemptRound: 0,
  temporal: emptyTemporalEvidence(),
})

const normalizeAspectProofs = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value).flatMap(([key, proof]) => {
    if (!key || key.length > 500 || !proof || typeof proof !== 'object' || Array.isArray(proof)) return []
    const aspectId = key.split('|').at(-1)
    if (!WORD_LEARNING_ASPECT_BY_ID[aspectId]) return []
    return [[key, {
      wins: safeCount(proof.wins),
      attempts: safeCount(proof.attempts),
      correctAttempts: Math.min(safeCount(proof.attempts), safeCount(proof.correctAttempts)),
      dueAfterRound: safeRound(proof.dueAfterRound),
      lastAttemptKey: safeString(proof.lastAttemptKey),
      lastAttemptRound: safeRound(proof.lastAttemptRound),
      temporal: normalizeTemporalEvidence(proof.temporal),
    }]]
  }))
}

const seedAspectProof = (proofs, aspectId, wins, source, targetFormKey = null) => {
  if (!WORD_LEARNING_ASPECT_BY_ID[aspectId] || !wins) return
  const key = wordAspectEvidenceKey(aspectId, targetFormKey)
  const existing = proofs[key] || emptyAspectProof()
  proofs[key] = {
    ...existing,
    wins: Math.max(existing.wins, wins),
    attempts: Math.max(existing.attempts, safeCount(source?.temporal?.attempts) || wins),
    correctAttempts: Math.max(existing.correctAttempts, safeCount(source?.temporal?.correctAttempts) || wins),
    dueAfterRound: Math.max(existing.dueAfterRound, safeRound(source?.dueAfterRound)),
    lastAttemptKey: existing.lastAttemptKey || safeString(source?.lastAttemptKey),
    lastAttemptRound: Math.max(existing.lastAttemptRound, safeRound(source?.lastAttemptRound)),
    temporal: existing.temporal?.attempts ? existing.temporal : normalizeTemporalEvidence(source?.temporal),
  }
}

const aspectProofsWithLegacyEvidence = (source, wins, contextWins, formProofs, strictWins) => {
  const proofs = normalizeAspectProofs(source.aspectProofs)
  // Once the independent-aspect schema owns this record, the legacy aggregate
  // counters are compatibility mirrors only. Re-seeding from the word-wide
  // temporal total on every normalization would make untouched aspects appear
  // attempted (and failed) whenever some other capability was practised.
  if (source.aspectRegistryVersion === WORD_ASPECT_REGISTRY_VERSION) return proofs
  for (const definition of WORD_STAGE_DEFINITIONS) {
    const aspect = wordAspectDefinitionForStage(definition.id)
    if (!aspect) continue
    const legacyWins = definition.id === 'strict-spaced-recall' ? strictWins : safeCount(wins[definition.id])
    seedAspectProof(proofs, aspect.id, legacyWins, source)
  }
  seedAspectProof(
    proofs,
    'contextual-meaning-inference',
    safeCount(contextWins[WORD_CONTEXT_LATE_PROOF]),
    source,
  )
  for (const [targetFormKey, formProof] of Object.entries(formProofs)) {
    for (const definition of WORD_STAGE_DEFINITIONS) {
      const aspect = wordAspectDefinitionForStage(definition.id)
      if (!aspect) continue
      const legacyWins = definition.id === 'strict-spaced-recall'
        ? safeCount(formProof.strictWins)
        : safeCount(formProof.wins?.[definition.id])
      seedAspectProof(proofs, aspect.id, legacyWins, formProof, targetFormKey)
    }
  }
  return proofs
}

const normalizedWins = (value, ids = WORD_STAGE_DEFINITIONS.map(({ id }) => id)) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(ids.flatMap((id) => {
    const definition = STAGE_BY_ID[id]
    if (!definition || definition.tier === WORD_SKILL_MAX_TIER) return []
    const count = Math.min(definition.gate.wins || 1, safeCount(value[id]))
    return count ? [[id, count]] : []
  }))
}

const normalizedFormProofs = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const next = {}
  for (const [key, proof] of Object.entries(value)) {
    if (!key || key.length > 240 || !proof || typeof proof !== 'object' || Array.isArray(proof)) continue
    const reviewGap = Math.max(WORD_INITIAL_REVIEW_GAP, Math.min(WORD_MAX_REVIEW_GAP, safeCount(proof.reviewGap) || WORD_INITIAL_REVIEW_GAP))
    next[key] = {
      wins: normalizedWins(proof.wins, WORD_STAGE_DEFINITIONS
        .filter(({ id }) => !['meaning-recognition', 'controlled-lemma-retrieval'].includes(id))
        .map(({ id }) => id)),
      strictWins: safeCount(proof.strictWins),
      dueAfterRound: safeRound(proof.dueAfterRound),
      reviewGap,
      lastAttemptKey: safeString(proof.lastAttemptKey),
      lastAttemptRound: safeRound(proof.lastAttemptRound),
      temporal: normalizeTemporalEvidence(proof.temporal),
    }
  }
  return next
}

const normalizedRemediation = (value, currentRound) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const stageId = typeof value.stageId === 'string' && STAGE_BY_ID[value.stageId] ? value.stageId : null
  const returnStageId = typeof value.returnStageId === 'string' && STAGE_BY_ID[value.returnStageId] ? value.returnStageId : null
  if (!stageId || !returnStageId || STAGE_BY_ID[stageId].tier >= STAGE_BY_ID[returnStageId].tier) return null
  return {
    stageId,
    returnStageId,
    targetFormKey: safeString(value.targetFormKey, 240),
    reason: safeString(value.reason, 80) || 'practice-miss',
    dueAfterRound: Math.max(currentRound, safeRound(value.dueAfterRound)),
  }
}

export function normalizeWordProgress(value, currentRound = 0) {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const reviewGap = Math.max(WORD_INITIAL_REVIEW_GAP, Math.min(WORD_MAX_REVIEW_GAP, safeCount(source.reviewGap) || WORD_INITIAL_REVIEW_GAP))
  const contextPassed = safeCount(source.contextWins?.[WORD_CONTEXT_LATE_PROOF]) > 0
  const wins = normalizedWins(source.wins)
  const contextWins = contextPassed ? { [WORD_CONTEXT_LATE_PROOF]: 1 } : {}
  const formProofs = normalizedFormProofs(source.formProofs)
  const strictWins = safeCount(source.strictWins)
  const next = {
    aspectRegistryVersion: WORD_ASPECT_REGISTRY_VERSION,
    aspectProofs: aspectProofsWithLegacyEvidence(source, wins, contextWins, formProofs, strictWins),
    wins,
    contextWins,
    contextSupportRequired: source.contextSupportRequired === true && !contextPassed,
    formProofs,
    activeFormKey: safeString(source.activeFormKey, 240),
    strictWins,
    dueAfterRound: safeRound(source.dueAfterRound),
    reviewGap,
    lastAttemptKey: safeString(source.lastAttemptKey),
    lastAttemptRound: safeRound(source.lastAttemptRound),
    remediation: null,
    temporal: normalizeTemporalEvidence(source.temporal),
  }
  next.remediation = normalizedRemediation(source.remediation, currentRound)
  return next
}

// Only proofs with the same semantics survive the v3 migration. Old form drills
// did not identify an exact role in context, and old spelling was not contextual.
export function migrateWordProgressV3(value, currentRound = 0) {
  const old = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const wins = {}
  if (safeCount(old.wins?.['independent-word-recognition'])) wins['meaning-recognition'] = Math.min(2, safeCount(old.wins['independent-word-recognition']))
  const controlled = safeCount(old.wins?.['guided-word-selection']) + safeCount(old.wins?.['independent-word-selection'])
  if (controlled) wins['controlled-lemma-retrieval'] = Math.min(3, controlled)
  return normalizeWordProgress({ wins }, currentRound)
}

export const migrateWordProgressV2 = migrateWordProgressV3
export const migrateWordProgressV1 = migrateWordProgressV3

const normalizedReviewedForms = (options) => {
  const input = Array.isArray(options?.reviewedForms) ? options.reviewedForms : []
  const seen = new Set()
  return input.flatMap((form) => {
    if (!form || typeof form !== 'object') return []
    const surface = safeString(form.surface || form.al, 100)
    const role = safeString(form.role || form.tag, 100)
    const key = safeString(form.key || (surface && role ? `${surface.normalize('NFC').toLocaleLowerCase('sq')}::${role}` : null), 240)
    if (!surface || !role || !key || seen.has(key)) return []
    seen.add(key)
    return [{ ...form, key, surface, role }]
  })
}

const aspectTargetFormKey = (aspect, formKey) => aspect?.scope === 'lemma' ? null : formKey

const aspectProofFor = (progress, aspectId, formKey = null) => progress.aspectProofs[
  wordAspectEvidenceKey(aspectId, aspectTargetFormKey(WORD_LEARNING_ASPECT_BY_ID[aspectId], formKey))
] || emptyAspectProof()

const proofWins = (progress, definition, formKey = null) => {
  const aspect = wordAspectDefinitionForStage(definition.id)
  if (aspect) return aspectProofFor(progress, aspect.id, formKey).wins
  return formKey
    ? progress.formProofs[formKey]?.wins?.[definition.id] || 0
    : progress.wins[definition.id] || 0
}

const proofPassed = (progress, definition, formKey = null) =>
  proofWins(progress, definition, formKey) >= (definition.gate.wins || 1)

const selectedForm = (progress, forms) => {
  if (!forms.length) return null
  const ordered = [
    ...forms.filter((form) => form.endingPractice),
    ...forms.filter((form) => !form.endingPractice),
  ]
  const active = ordered.find((form) => form.key === progress.activeFormKey)
  return (active && !proofPassed(progress, STAGE_BY_ID['strict-spaced-recall'], active.key) ? active : null) ||
    ordered.find((form) => !proofPassed(progress, STAGE_BY_ID['strict-spaced-recall'], form.key)) || active ||
    ordered[0]
}

const retrievalDistractorCapacity = (answerId, context) => {
  const defended = new Set(Object.keys(context?.defensibleAlternativeRationales?.en2al || {}))
  return [...new Set(context?.retrieval?.distractorIds || [])].filter((candidateId) =>
    candidateId && !defended.has(candidateId) && !sensesMayShareAnswer(answerId, candidateId)).length
}

const retrievalVariant = (progress, answerId, context) => {
  const wins = aspectProofFor(progress, 'controlled-lemma-retrieval').wins
  // A reviewed context is authoritative about what can be scored wrong. Never
  // ask its expanded bank for three foils when synonymous or otherwise valid
  // alternatives leave fewer than three. The same retrieval aspect remains in
  // play; semantic confusability, not a fabricated answer, carries difficulty.
  const supportsExpandedBank = !context || retrievalDistractorCapacity(answerId, context) >= 3
  return wins < 1 || !supportsExpandedBank
    ? STAGE_BY_ID['controlled-lemma-retrieval'].variants[0]
    : STAGE_BY_ID['controlled-lemma-retrieval'].variants[1]
}

const aspectWinsRequired = (aspect) => {
  if (aspect.id === 'contextual-meaning-inference') return 1
  return STAGE_BY_ID[aspect.stageId]?.gate?.wins || 1
}

const formKeyForAspect = (aspect, formTarget, hasReviewedFormLane) => {
  if (aspect.scope === 'lemma') return null
  return hasReviewedFormLane ? formTarget?.key || null : null
}

const prerequisiteRows = (
  progress,
  aspect,
  formTarget,
  hasReviewedFormLane,
  hasReviewedNounEndingLane,
  hasReviewedContextLane,
) => {
  const conditional = [
    ...(hasReviewedFormLane ? aspect.conditionalPrerequisites?.['reviewed-form-lane'] || [] : []),
    ...(hasReviewedNounEndingLane ? aspect.conditionalPrerequisites?.['reviewed-noun-ending-lane'] || [] : []),
    ...(hasReviewedContextLane ? aspect.conditionalPrerequisites?.['reviewed-context-lane'] || [] : []),
  ]
  return [...aspect.prerequisites, ...conditional].map((requirement) => {
    const requiredAspect = WORD_LEARNING_ASPECT_BY_ID[requirement.aspectId]
    const formKey = ['same-form', 'active-form', 'same-target'].includes(requirement.scope)
      ? formTarget?.key || null
      : formKeyForAspect(requiredAspect, formTarget, hasReviewedFormLane)
    const proof = aspectProofFor(progress, requirement.aspectId, formKey)
    const requiredWins = aspectWinsRequired(requiredAspect)
    return {
      ...requirement,
      formKey,
      wins: proof.wins,
      winsRequired: requiredWins,
      passed: proof.wins >= requiredWins,
    }
  })
}

const aspectSchedule = (progress, options = {}) => {
  const forms = normalizedReviewedForms(options)
  const hasReviewedFormLane = forms.length > 0 || options.hasReviewedFormLane === true
  const formTarget = selectedForm(progress, forms)
  const hasReviewedNounEndingLane = Boolean(formTarget?.endingPractice)
  const hasReviewedFormOddOneOut = Boolean(reviewedFormOddOneOutPlan(forms, formTarget, { currentRound: options.currentRound }))
  const nounFormMatchingPlan = reviewedNounFormMatchingPlan(forms, options.discoveredIds, { currentRound: options.currentRound })
  const hasReviewedNounFormMatching = Boolean(nounFormMatchingPlan)
  const conditionalAvailability = {
    'reviewed-form-lane': hasReviewedFormLane,
    'reviewed-noun-ending-lane': hasReviewedNounEndingLane,
    'reviewed-form-odd-one-out': hasReviewedFormOddOneOut,
    'reviewed-noun-paradigm-matching': hasReviewedNounFormMatching,
    'reviewed-demonstrative-frame': Boolean(options.nounAgreementFrame?.demonstrative),
    'reviewed-adjective-frame': Boolean(options.nounAgreementFrame?.adjective),
    'reviewed-linked-agreement-frame': Boolean(options.nounAgreementFrame?.demonstrative && options.nounAgreementFrame?.adjective),
    'unambiguous-audio-sense': options.unambiguousAudioSense !== false,
  }
  const contextAlignment = wordContextAlignment(options.context, options.answerSurface)
  const currentRound = safeRound(options.currentRound)
  const nowMs = options.nowMs || 0
  const candidates = WORD_LEARNING_ASPECTS.map((aspect, priority) => {
    const inapplicable = Boolean(aspect.conditional && !conditionalAvailability[aspect.conditional]) ||
      (aspect.scope === 'reviewed-form' && !formTarget) ||
      (aspect.id === 'contextual-meaning-inference' && !contextAlignment.usable)
    const targetFormKey = formKeyForAspect(aspect, formTarget, hasReviewedFormLane)
    const proof = aspectProofFor(progress, aspect.id, targetFormKey)
    const prerequisites = prerequisiteRows(
      progress,
      aspect,
      formTarget,
      hasReviewedFormLane,
      hasReviewedNounEndingLane,
      contextAlignment.usable,
    )
    const winsRequired = aspectWinsRequired(aspect)
    const passed = proof.wins >= winsRequired
    const retention = aspect.id === 'spaced-exact-recall'
    // The first strict retrieval inherits the delay created by the immediately
    // preceding typed proof. After strict recall has its own attempt history,
    // its expanding interval becomes authoritative.
    const spacingProof = retention && proof.attempts === 0
      ? aspectProofFor(progress, 'contextual-written-recall', targetFormKey)
      : proof
    const due = !inapplicable && temporalDue({
      currentRound,
      dueAfterRound: spacingProof.dueAfterRound,
      nowMs,
      dueAtMs: spacingProof.temporal?.dueAtMs || 0,
      requireElapsed: retention,
    })
    const failures = Math.max(0, proof.attempts - proof.correctAttempts)
    const failureRate = proof.attempts ? failures / proof.attempts : 0
    const uncertainty = 1 / Math.sqrt(proof.attempts + 1)
    const overdueRounds = Math.min(8, Math.max(0, currentRound - proof.dueAfterRound))
    const masteryRatio = Math.min(1, proof.wins / winsRequired)
    const selectionScore = Number((
      (1 - masteryRatio) * 4 +
      failureRate * 2 +
      uncertainty +
      overdueRounds * 0.125
    ).toFixed(4))
    return {
      aspect,
      priority,
      targetFormKey,
      proof,
      spacingProof,
      spacingSourceAspectId: retention && proof.attempts === 0
        ? 'contextual-written-recall'
        : aspect.id,
      prerequisites,
      applicable: !inapplicable,
      eligible: !inapplicable && prerequisites.every(({ passed: ready }) => ready),
      passed,
      due,
      recurring: retention,
      needsPractice: retention || !passed,
      masteryRatio,
      failures,
      failureRate,
      uncertainty,
      overdueRounds,
      selectionScore,
      winsRequired,
    }
  })
  // This is a capability graph, not a single ordered sequence. Every due weak
  // aspect whose own minimal prerequisites pass competes on its own evidence.
  // Registry order is only the final deterministic tie-break for equal scores.
  const ranked = (rows) => [...rows].sort((left, right) =>
    right.selectionScore - left.selectionScore || left.priority - right.priority)
  const selected = ranked(candidates.filter(({ eligible, due, needsPractice }) =>
    eligible && due && needsPractice))[0] ||
    ranked(candidates.filter(({ eligible, needsPractice }) => eligible && needsPractice))[0] ||
    candidates.find(({ aspect }) => aspect.id === 'spaced-exact-recall')
  const selectedStageId = selected?.aspect.id === 'contextual-meaning-inference'
    ? 'word-form-construction'
    : selected?.aspect.stageId
  return {
    definition: STAGE_BY_ID[selectedStageId] || STAGE_BY_ID['meaning-recognition'],
    selectedAspect: selected,
    aspectCandidates: candidates,
    contextAspectDue: selected?.aspect.id === 'contextual-meaning-inference',
    formTarget: selected?.targetFormKey ? formTarget : null,
    nounAgreementFrame: options.nounAgreementFrame || null,
    forms,
    hasReviewedFormLane,
    hasReviewedNounEndingLane,
    hasReviewedFormOddOneOut,
    hasReviewedNounFormMatching,
    nounFormMatchingPlan,
    hasReviewedContextLane: contextAlignment.usable,
  }
}

const basePlan = aspectSchedule

export function wordProgressStage(value, options = {}) {
  return basePlan(normalizeWordProgress(value), options).definition.tier
}

const contextVariantFor = (definition, alignment) => {
  if (!alignment.usable) return null
  const variant = CONTEXT_VARIANT_BY_ID[definition.contextVariantId]
  if (!variant) return null
  if (variant.direction === 'en2al' && !alignment.mirrorSafe) return null
  return variant
}

const lateContextPlan = (progress, base, currentRound, alignment) => {
  if (progress.contextWins[WORD_CONTEXT_LATE_PROOF]) return null
  if (base.selectedAspect?.aspect.id !== 'contextual-meaning-inference') return null
  if (!alignment.usable) return null
  const requested = CONTEXT_VARIANT_BY_ID[WORD_CONTEXT_LATE_PROOF]
  const variant = progress.contextSupportRequired || !alignment.uniqueTarget
    ? CONTEXT_VARIANT_BY_ID['marked-context-recognition'] : requested
  return {
    stage: base.definition.tier,
    tier: base.definition.tier,
    stageId: base.definition.id,
    baseStage: base.definition.tier,
    baseStageId: base.definition.id,
    definition: base.definition,
    variant: requested,
    mode: variant.mode,
    direction: variant.direction,
    difficultyLabel: variant.label,
    dueAfterRound: base.selectedAspect.spacingProof.dueAfterRound,
    due: base.selectedAspect.due,
    remediation: progress.contextSupportRequired,
    remediationReason: progress.contextSupportRequired ? 'context-recognition-miss' : null,
    familyId: variant.familyId,
    exerciseConceptId: variant.exerciseConceptId,
    evidenceTrack: requested.evidenceTrack,
    contextVariant: variant,
    contextVariantId: variant.id,
    contextReview: true,
    contextProofId: WORD_CONTEXT_LATE_PROOF,
    targetPresentation: variant.targetPresentation,
    alignment,
    formTarget: base.formTarget,
    hasReviewedFormLane: base.hasReviewedFormLane,
    hasReviewedNounEndingLane: base.hasReviewedNounEndingLane,
    hasReviewedFormOddOneOut: base.hasReviewedFormOddOneOut,
    hasReviewedNounFormMatching: base.hasReviewedNounFormMatching,
    nounFormMatchingPlan: base.nounFormMatchingPlan,
    hasReviewedContextLane: base.hasReviewedContextLane,
    aspectId: 'contextual-meaning-inference',
    aspectDefinition: WORD_LEARNING_ASPECT_BY_ID['contextual-meaning-inference'],
    aspectSelection: {
      registryVersion: WORD_ASPECT_REGISTRY_VERSION,
      strategy: 'highest scored due weak aspect; registry order breaks exact ties',
      candidates: base.aspectCandidates,
      selectedAspectId: 'contextual-meaning-inference',
    },
  }
}

export function wordProgressPlan(value, currentRound = 0, options = {}) {
  const progress = normalizeWordProgress(value, currentRound)
  const base = basePlan(progress, { ...options, currentRound })
  const alignment = wordContextAlignment(options.context, options.answerSurface)
  if (!progress.remediation) {
    const late = lateContextPlan(progress, base, currentRound, alignment)
    if (late) return late
  }
  let definition = base.definition
  let formTarget = base.formTarget
  if (progress.remediation) {
    definition = STAGE_BY_ID[progress.remediation.stageId] || definition
    formTarget = base.forms.find((form) => form.key === progress.remediation.targetFormKey) || formTarget
  }
  const controlledVariant = definition.id === 'controlled-lemma-retrieval'
    ? retrievalVariant(progress, options.trainability?.id, options.context)
    : null
  const variant = controlledVariant || definition.variant
  const contextVariant = contextVariantFor(definition, alignment)
  const proof = formTarget ? progress.formProofs[formTarget.key] || emptyFormProof() : progress
  const selectedAspectProof = base.selectedAspect?.spacingProof || base.selectedAspect?.proof || emptyAspectProof()
  const dueAfterRound = progress.remediation?.dueAfterRound ?? selectedAspectProof.dueAfterRound
  const temporal = normalizeTemporalEvidence(selectedAspectProof.temporal)
  const nowMs = options.nowMs || 0
  const retention = definition.tier === WORD_SKILL_MAX_TIER && !progress.remediation
  const aspectDefinition = progress.remediation
    ? wordAspectDefinitionForStage(definition.id)
    : base.selectedAspect?.aspect || wordAspectDefinitionForStage(definition.id)
  return {
    stage: definition.tier,
    tier: definition.tier,
    stageId: definition.id,
    baseStage: base.definition.tier,
    baseStageId: base.definition.id,
    definition,
    variant,
    variantId: variant?.id || null,
    mode: definition.mode,
    direction: definition.direction,
    answerTolerance: definition.answerTolerance,
    difficultyLabel: definition.label,
    dueAfterRound,
    due: progress.remediation
      ? temporalDue({ currentRound, dueAfterRound, nowMs, dueAtMs: temporal.dueAtMs, requireElapsed: retention })
      : Boolean(base.selectedAspect?.due),
    remediation: Boolean(progress.remediation),
    remediationReason: progress.remediation?.reason || null,
    familyId: contextVariant?.familyId || definition.familyId,
    exerciseConceptId: contextVariant?.exerciseConceptId || null,
    evidenceTrack: definition.evidenceTrack,
    contextVariant,
    contextVariantId: contextVariant?.id || null,
    contextReview: false,
    contextProofId: null,
    targetPresentation: contextVariant?.targetPresentation || null,
    alignment,
    formTarget,
    targetFormKey: formTarget?.key || null,
    hasReviewedFormLane: base.hasReviewedFormLane,
    hasReviewedNounEndingLane: base.hasReviewedNounEndingLane,
    hasReviewedFormOddOneOut: base.hasReviewedFormOddOneOut,
    hasReviewedNounFormMatching: base.hasReviewedNounFormMatching,
    nounFormMatchingPlan: base.nounFormMatchingPlan,
    hasReviewedContextLane: base.hasReviewedContextLane,
    nounAgreementFrame: base.nounAgreementFrame,
    aspectId: aspectDefinition?.id || null,
    aspectDefinition,
    aspectSelection: {
      registryVersion: WORD_ASPECT_REGISTRY_VERSION,
      strategy: progress.remediation
        ? 'explicit remediation aspect'
        : 'highest scored due weak aspect; registry order breaks exact ties',
      candidates: base.aspectCandidates,
      selectedAspectId: aspectDefinition?.id || null,
    },
    temporal,
    adaptation: coldStartAdaptationSnapshot(temporal, {
      nowMs,
      stageTier: definition.tier,
      mode: definition.mode,
      supportLevel: progress.remediation || definition.tier <= 1 ? 0.5 : 0,
    }),
  }
}

const resultMatchesPlan = (result, plan) =>
  result?.stageId === plan.stageId &&
  result?.tier === plan.tier && result?.mode === plan.mode && result?.direction === plan.direction &&
  result?.variantId === (plan.contextVariantId || plan.variantId) &&
  (plan.targetFormKey ? result?.targetFormKey === plan.targetFormKey : result?.targetFormKey == null) &&
  (!plan.definition.requiresCompletedAudio || result?.audioCompleted === true) &&
  (!Array.isArray(result?.aspectTargets) || result.aspectTargets.every(({
    aspectId,
    targetFormKey,
    evidenceMode,
  }) => {
    const aspect = WORD_LEARNING_ASPECT_BY_ID[aspectId]
    const expectedFormKey = aspect?.scope === 'lemma' ? null : plan.targetFormKey || null
    return Boolean(aspect) &&
      (targetFormKey || null) === expectedFormKey &&
      (evidenceMode === 'prerequisite' || (evidenceMode === 'write' && aspectId === plan.aspectId))
  }))

const exercisedAspectTargets = (result, plan) => {
  const explicit = Array.isArray(result.aspectTargets) ? result.aspectTargets : []
  const targets = explicit.length ? explicit : [{
    aspectId: plan.aspectId,
    targetFormKey: plan.targetFormKey || null,
    evidenceMode: 'write',
  }]
  return targets.filter(({ aspectId, evidenceMode }) =>
    WORD_LEARNING_ASPECT_BY_ID[aspectId] && evidenceMode !== 'prerequisite')
}

const recordAspectResult = (next, result, plan, nextRound) => {
  next.aspectProofs = { ...next.aspectProofs }
  for (const target of exercisedAspectTargets(result, plan)) {
    const aspect = WORD_LEARNING_ASPECT_BY_ID[target.aspectId]
    const targetFormKey = aspectTargetFormKey(aspect, target.targetFormKey || plan.targetFormKey)
    const key = wordAspectEvidenceKey(aspect.id, targetFormKey)
    const previous = next.aspectProofs[key] || emptyAspectProof()
    const temporal = recordTemporalAttempt(previous.temporal, {
      correct: result.correct,
      attemptedAtMs: result.attemptedAtMs,
      responseDurationMs: result.responseDurationMs,
      supportExposed: plan.remediation || plan.definition.tier <= 1 || plan.contextReview,
      retention: aspect.id === 'spaced-exact-recall',
    })
    next.aspectProofs[key] = {
      ...previous,
      attempts: previous.attempts + 1,
      correctAttempts: previous.correctAttempts + (result.correct ? 1 : 0),
      wins: result.correct
        ? Math.min(aspectWinsRequired(aspect), previous.wins + 1)
        : previous.wins,
      dueAfterRound: nextRound + (
        aspect.id === 'contextual-written-recall' || aspect.id === 'spaced-exact-recall'
          ? WORD_INITIAL_REVIEW_GAP
          : WORD_MIN_INTERVENING_ROUNDS
      ),
      lastAttemptKey: safeString(result.questionKey),
      lastAttemptRound: nextRound,
      temporal,
    }
  }
}

const remediationForFailure = (plan, nextRound) => {
  if (plan.definition.tier === 0) return null
  // Route a miss to the closest supporting capability. This preserves the
  // target form without collapsing independent aspects into a single order.
  const previousStageById = plan.hasReviewedFormLane ? {
    'reviewed-form-contrast': 'meaning-recognition',
    'controlled-lemma-retrieval': 'meaning-recognition',
    'demonstrative-noun-agreement': 'controlled-lemma-retrieval',
    'adjective-linking-article-agreement': 'controlled-lemma-retrieval',
    'grammatical-form-odd-one-out': 'reviewed-form-contrast',
    'noun-paradigm-matching': 'reviewed-form-contrast',
    'linked-noun-agreement-cloze': 'adjective-linking-article-agreement',
    'contextual-form-selection': 'reviewed-form-contrast',
    'reviewed-ending-recall': 'contextual-form-selection',
    'auditory-word-construction': plan.hasReviewedNounEndingLane ? 'reviewed-ending-recall' : 'meaning-recognition',
    'auditory-word-spelling': 'auditory-word-construction',
    'word-form-construction': plan.hasReviewedNounEndingLane ? 'reviewed-ending-recall' : 'reviewed-form-contrast',
    'contextual-typed-recall': 'word-form-construction',
    'strict-spaced-recall': 'contextual-typed-recall',
  } : {
    'controlled-lemma-retrieval': 'meaning-recognition',
    'demonstrative-noun-agreement': 'controlled-lemma-retrieval',
    'adjective-linking-article-agreement': 'controlled-lemma-retrieval',
    'grammatical-form-odd-one-out': 'reviewed-form-contrast',
    'noun-paradigm-matching': 'reviewed-form-contrast',
    'linked-noun-agreement-cloze': 'adjective-linking-article-agreement',
    'auditory-word-construction': 'meaning-recognition',
    'auditory-word-spelling': 'auditory-word-construction',
    'word-form-construction': 'controlled-lemma-retrieval',
    'contextual-typed-recall': 'word-form-construction',
    'strict-spaced-recall': 'contextual-typed-recall',
  }
  const stageId = previousStageById[plan.definition.id]
  if (!stageId) return null
  return {
    stageId,
    returnStageId: plan.definition.id,
    targetFormKey: plan.targetFormKey,
    reason: plan.definition.tier === WORD_SKILL_MAX_TIER ? 'retention-lapse' : `${plan.definition.id}-miss`,
    dueAfterRound: nextRound + WORD_MIN_INTERVENING_ROUNDS,
  }
}

const mutableProofFor = (next, targetFormKey) => {
  if (!targetFormKey) return next
  next.formProofs[targetFormKey] = {
    ...emptyFormProof(),
    ...(next.formProofs[targetFormKey] || {}),
    wins: { ...(next.formProofs[targetFormKey]?.wins || {}) },
  }
  next.activeFormKey = targetFormKey
  return next.formProofs[targetFormKey]
}

export function advanceWordProgress(value, currentRound = 0, result = {}, options = {}) {
  const progress = normalizeWordProgress(value, currentRound)
  if (options.trainability?.trainable === false) {
    return { accepted: false, reason: 'not-trainable', progress, plan: null }
  }
  const plan = wordProgressPlan(progress, currentRound, { ...options, nowMs: result.attemptedAtMs })
  const questionKey = safeString(result.questionKey)
  if (!plan.due && options.allowEarlyDueForGoal !== true) {
    return { accepted: false, reason: 'not-due', progress, plan }
  }
  if (!questionKey) return { accepted: false, reason: 'missing-question-key', progress, plan }
  if (questionKey === progress.lastAttemptKey) return { accepted: false, reason: 'duplicate-question', progress, plan }
  if (!resultMatchesPlan(result, plan)) return { accepted: false, reason: 'plan-mismatch', progress, plan }

  const nextRound = Math.max(safeRound(currentRound), safeRound(result.round))
  const next = {
    ...progress,
    aspectRegistryVersion: WORD_ASPECT_REGISTRY_VERSION,
    aspectProofs: { ...progress.aspectProofs },
    wins: { ...progress.wins },
    contextWins: { ...progress.contextWins },
    formProofs: { ...progress.formProofs },
    lastAttemptKey: questionKey,
    lastAttemptRound: nextRound,
  }
  recordAspectResult(next, result, plan, nextRound)
  if (plan.contextReview) {
    next.temporal = recordTemporalAttempt(next.temporal, {
      correct: result.correct,
      attemptedAtMs: result.attemptedAtMs,
      responseDurationMs: result.responseDurationMs,
      supportExposed: plan.remediation,
    })
    if (result.correct) {
      next.contextWins[WORD_CONTEXT_LATE_PROOF] = 1
      next.contextSupportRequired = false
    } else next.contextSupportRequired = true
    next.dueAfterRound = nextRound + WORD_MIN_INTERVENING_ROUNDS
    return { accepted: true, progress: normalizeWordProgress(next, nextRound), plan }
  }

  const proof = mutableProofFor(next, plan.targetFormKey)
  const temporalOwner = plan.targetFormKey ? proof : next
  temporalOwner.temporal = recordTemporalAttempt(temporalOwner.temporal, {
    correct: result.correct,
    attemptedAtMs: result.attemptedAtMs,
    responseDurationMs: result.responseDurationMs,
    supportExposed: plan.remediation || plan.definition.tier <= 1 || plan.contextReview,
    retention: plan.definition.tier === WORD_SKILL_MAX_TIER,
  })
  if (!result.correct) {
    if (plan.definition.tier === WORD_SKILL_MAX_TIER) {
      proof.reviewGap = Math.max(WORD_INITIAL_REVIEW_GAP, Math.floor(proof.reviewGap / 2))
    }
    next.remediation = remediationForFailure(plan, nextRound)
    next.dueAfterRound = next.remediation?.dueAfterRound ?? nextRound + WORD_MIN_INTERVENING_ROUNDS
    if (plan.targetFormKey) proof.dueAfterRound = next.dueAfterRound
    return { accepted: true, progress: normalizeWordProgress(next, nextRound), plan }
  }

  if (plan.remediation) {
    next.remediation = null
    next.dueAfterRound = nextRound + WORD_MIN_INTERVENING_ROUNDS
  } else if (plan.definition.tier < WORD_SKILL_MAX_TIER) {
    proof.wins[plan.definition.id] = Math.min(
      plan.definition.gate.wins || 1,
      (proof.wins[plan.definition.id] || 0) + 1,
    )
    next.dueAfterRound = nextRound + (
      plan.definition.id === 'contextual-typed-recall'
        ? WORD_INITIAL_REVIEW_GAP
        : WORD_MIN_INTERVENING_ROUNDS
    )
    if (plan.definition.id === 'contextual-typed-recall' && temporalOwner.temporal.lastAttemptAtMs) {
      temporalOwner.temporal.dueAtMs = temporalOwner.temporal.lastAttemptAtMs + temporalOwner.temporal.reviewIntervalMs
    }
  } else {
    proof.strictWins += 1
    proof.reviewGap = Math.min(WORD_MAX_REVIEW_GAP, proof.reviewGap * 2)
    proof.dueAfterRound = nextRound + proof.reviewGap
    next.dueAfterRound = proof.dueAfterRound
  }
  if (plan.targetFormKey) {
    proof.dueAfterRound = next.dueAfterRound
    proof.lastAttemptKey = questionKey
    proof.lastAttemptRound = nextRound
  }
  return { accepted: true, progress: normalizeWordProgress(next, nextRound), plan }
}

const capabilityRecord = (status, evidence, gaps, plan, extra = {}) => ({
  status,
  evidence,
  gaps,
  due: status === 'pending' && plan ? plan.due : false,
  remediation: status === 'pending' && plan?.remediation ? plan.remediationReason : null,
  lastAttempt: evidence.lastAttemptKey ? { key: evidence.lastAttemptKey, round: evidence.lastAttemptRound } : null,
  ...extra,
})

export function wordProgressionSnapshot(value, currentRound = 0, options = {}) {
  if (options.trainability?.trainable === false) {
    const reason = options.trainability.reason || 'not eligible for lexical Train'
    const capabilities = Object.fromEntries(WORD_CAPABILITY_IDS.map((id) => [id,
      capabilityRecord('not-trainable', {}, [reason], null, { reason }),
    ]))
    return {
      trainability: options.trainability,
      hasReviewedFormLane: false,
      hasReviewedNounEndingLane: false,
      hasReviewedFormOddOneOut: false,
      hasReviewedNounFormMatching: false,
      hasReviewedContextLane: false,
      currentStageId: null,
      nextStageId: null,
      progress: normalizeWordProgress(value, currentRound),
      next: null,
      stages: WORD_STAGE_DEFINITIONS.map((definition) => ({ definition, status: 'not-trainable', wins: 0, winsRequired: definition.gate.wins ?? null })),
      context: { exerciseConceptId: WORD_CONTEXT_EXERCISE_CONCEPT, alignment: wordContextAlignment(options.context, options.answerSurface), variants: [] },
      capabilities,
      aspects: WORD_LEARNING_ASPECTS.map((aspect) => ({ aspect, status: 'not-trainable', eligible: false, selected: false })),
    }
  }
  const progress = normalizeWordProgress(value, currentRound)
  const plan = wordProgressPlan(progress, currentRound, options)
  const forms = normalizedReviewedForms(options)
  const target = plan.formTarget || selectedForm(progress, forms)
  const targetProof = target ? progress.formProofs[target.key] || emptyFormProof() : progress
  const conditionalAvailability = {
    'reviewed-form-lane': plan.hasReviewedFormLane,
    'reviewed-noun-ending-lane': plan.hasReviewedNounEndingLane,
    'reviewed-form-odd-one-out': plan.hasReviewedFormOddOneOut,
    'reviewed-noun-paradigm-matching': plan.hasReviewedNounFormMatching,
    'reviewed-context-lane': plan.hasReviewedContextLane,
    'reviewed-demonstrative-frame': Boolean(options.nounAgreementFrame?.demonstrative),
    'reviewed-adjective-frame': Boolean(options.nounAgreementFrame?.adjective),
    'reviewed-linked-agreement-frame': Boolean(options.nounAgreementFrame?.demonstrative && options.nounAgreementFrame?.adjective),
    'unambiguous-audio-sense': options.unambiguousAudioSense !== false,
  }
  const stageRows = WORD_STAGE_DEFINITIONS.map((definition) => {
    const formKey = ['reviewed-form-contrast', 'grammatical-form-odd-one-out', 'contextual-form-selection', 'reviewed-ending-recall',
      'auditory-word-construction', 'auditory-word-spelling', 'word-form-construction',
      'contextual-typed-recall', 'strict-spaced-recall'].includes(definition.id)
      ? target?.key || null : null
    const conditionalSkipped = Boolean(definition.conditional && !conditionalAvailability[definition.conditional])
    const passed = conditionalSkipped || proofPassed(progress, definition, formKey)
    return {
      definition,
      wins: definition.tier === WORD_SKILL_MAX_TIER ? targetProof.strictWins : proofWins(progress, definition, formKey),
      winsRequired: definition.gate.wins ?? null,
      status: conditionalSkipped ? 'inapplicable' : passed ? 'passed' : definition.id === plan.stageId ? 'current' : 'locked',
      remediation: plan.remediation && definition.id === plan.stageId,
      due: definition.id === plan.stageId && plan.due,
      targetFormKey: target?.key || null,
    }
  })
  const stageStatus = Object.fromEntries(stageRows.map((row) => [row.definition.id, row.status]))
  const evidence = {
    wins: progress.wins,
    formProofs: progress.formProofs,
    activeFormKey: progress.activeFormKey,
    strictWins: targetProof.strictWins,
    dueAfterRound: targetProof.dueAfterRound || progress.dueAfterRound,
    lastAttemptKey: targetProof.lastAttemptKey || progress.lastAttemptKey,
    lastAttemptRound: targetProof.lastAttemptRound || progress.lastAttemptRound,
    temporal: normalizeTemporalEvidence(targetProof.temporal || progress.temporal),
    adaptation: plan.adaptation || null,
  }
  const statusForStage = (stageId, capabilityId) => {
    if (stageStatus[stageId] === 'inapplicable') return 'inapplicable'
    if (stageId === 'controlled-lemma-retrieval') {
      const wins = progress.wins[stageId] || 0
      return capabilityId === 'controlled-retrieval-supported'
        ? wins >= 1 ? 'passed' : 'pending'
        : wins >= 3 ? 'passed' : 'pending'
    }
    return stageStatus[stageId] === 'passed' ? 'passed' : 'pending'
  }
  const capabilityStage = Object.fromEntries(WORD_CAPABILITY_DEFINITIONS.map(({ id, stageId }) => [id, stageId]))
  const capabilities = Object.fromEntries(WORD_CAPABILITY_IDS.map((id) => {
    const stageId = capabilityStage[id]
    const status = statusForStage(stageId, id)
    const gap = status === 'passed' || status === 'inapplicable' ? [] : [`complete ${stageId}`]
    return [id, capabilityRecord(status, evidence, gap, plan, { stageId, targetFormKey: target?.key || null })]
  }))
  const alignment = wordContextAlignment(options.context, options.answerSurface)
  const aspects = (plan.aspectSelection?.candidates || []).map((candidate) => ({
    aspect: candidate.aspect,
    targetFormKey: candidate.targetFormKey,
    status: !candidate.applicable
      ? 'inapplicable'
      : candidate.aspect.id === plan.aspectId
        ? plan.due ? 'current' : 'spaced'
        : candidate.recurring && candidate.passed
          ? candidate.due ? 'eligible' : 'spaced'
          : candidate.passed
            ? 'passed'
            : candidate.eligible ? 'eligible' : 'locked',
    eligible: candidate.eligible,
    selected: candidate.aspect.id === plan.aspectId,
    due: candidate.due,
    wins: candidate.proof.wins,
    winsRequired: candidate.winsRequired,
    attempts: candidate.proof.attempts,
    correctAttempts: candidate.proof.correctAttempts,
    dueAfterRound: candidate.spacingProof.dueAfterRound,
    spacingSourceAspectId: candidate.spacingSourceAspectId,
    temporal: candidate.proof.temporal,
    failures: candidate.failures,
    failureRate: candidate.failureRate,
    uncertainty: candidate.uncertainty,
    overdueRounds: candidate.overdueRounds,
    selectionScore: candidate.selectionScore,
    prerequisites: candidate.prerequisites,
    schedulingContribution: candidate.aspect.id === plan.aspectId
      ? plan.aspectSelection.strategy
      : candidate.eligible && candidate.due && candidate.needsPractice
        ? 'eligible due weak aspect; another candidate scored higher'
        : candidate.eligible && candidate.needsPractice
          ? 'eligible but waiting for its own spacing gate'
        : candidate.passed ? 'mastered for this target' : 'prerequisite or applicability gate pending',
  }))
  const contextStatus = (definition) => {
    if (definition.id === WORD_CONTEXT_LATE_PROOF) {
      if (progress.contextWins[WORD_CONTEXT_LATE_PROOF]) return 'passed'
      return plan.contextReview ? 'current' : 'locked'
    }
    const ownerStageId = definition.unlock?.stageId
    if (stageStatus[ownerStageId] === 'passed') return 'passed'
    return plan.contextVariantId === definition.id ? 'current' : 'locked'
  }
  return {
    trainability: options.trainability || { trainable: true, kind: 'lexical' },
    hasReviewedFormLane: plan.hasReviewedFormLane,
    hasReviewedNounEndingLane: plan.hasReviewedNounEndingLane,
    hasReviewedFormOddOneOut: plan.hasReviewedFormOddOneOut,
    hasReviewedNounFormMatching: plan.hasReviewedNounFormMatching,
    hasReviewedContextLane: plan.hasReviewedContextLane,
    currentStageId: plan.stageId,
    nextStageId: plan.stageId,
    progress,
    next: plan,
    stages: stageRows,
    capabilities,
    aspects,
    context: {
      exerciseConceptId: WORD_CONTEXT_EXERCISE_CONCEPT,
      alignment,
      variants: WORD_CONTEXT_VARIANTS.map((definition) => ({
        definition,
        status: contextStatus(definition),
        scheduledAs: definition.id === WORD_CONTEXT_LATE_PROOF && plan.contextReview ? plan.contextVariantId : null,
        targetPresentation: definition.id === WORD_CONTEXT_LATE_PROOF && plan.contextReview ? plan.targetPresentation : definition.targetPresentation,
        proof: definition.id === WORD_CONTEXT_LATE_PROOF ? progress.contextWins[WORD_CONTEXT_LATE_PROOF] || 0 : null,
      })),
    },
  }
}

export const wordCapabilitySnapshot = wordProgressionSnapshot

export function completedWordProgress(currentRound = 0) {
  return normalizeWordProgress({
    wins: {
      'meaning-recognition': 2,
      'controlled-lemma-retrieval': 3,
      'word-form-construction': 1,
      'contextual-typed-recall': 1,
    },
    contextWins: { [WORD_CONTEXT_LATE_PROOF]: 1 },
    strictWins: 1,
    dueAfterRound: currentRound + WORD_INITIAL_REVIEW_GAP,
  }, currentRound)
}
