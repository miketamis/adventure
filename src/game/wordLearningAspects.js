// Canonical knowledge-component map for lexical Train. A question may exercise
// more than one component, but it must declare exactly which components it
// reads as prerequisites and which component its completed result may update.

export const WORD_ASPECT_REGISTRY_VERSION = 8

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const WORD_LEARNING_ASPECTS = deepFreeze([
  {
    id: 'lexical-meaning-recognition',
    label: 'Meaning recognition',
    dimension: 'lexical',
    scope: 'lemma',
    stageId: 'meaning-recognition',
    prerequisites: [],
    evidence: 'Recognises this Albanian sense among plausible meanings.',
  },
  {
    id: 'grammatical-form-recognition',
    label: 'Grammatical-form recognition',
    dimension: 'morphosyntax',
    scope: 'reviewed-form',
    stageId: 'reviewed-form-contrast',
    conditional: 'reviewed-form-lane',
    prerequisites: [{ aspectId: 'lexical-meaning-recognition', scope: 'lemma' }],
    evidence: 'Confirms a marked reviewed form’s meaning, then identifies its grammatical job.',
  },
  {
    id: 'grammatical-form-odd-one-out',
    label: 'Grammatical odd one out',
    dimension: 'morphosyntax',
    scope: 'reviewed-form',
    stageId: 'grammatical-form-odd-one-out',
    conditional: 'reviewed-form-odd-one-out',
    prerequisites: [{ aspectId: 'grammatical-form-recognition', scope: 'same-form' }],
    evidence: 'Finds the one unambiguous noun surface whose reviewed number or definiteness differs from three others in the same paradigm.',
  },
  {
    id: 'auditory-surface-recognition',
    label: 'Heard-word recognition',
    dimension: 'listening-orthography',
    scope: 'lemma',
    stageId: 'auditory-surface-recognition',
    prerequisites: [{ aspectId: 'lexical-meaning-recognition', scope: 'lemma' }],
    evidence: 'Recognises the written Albanian word after its complete recorded MP3 finishes.',
  },
  {
    id: 'auditory-surface-discrimination',
    label: 'Heard-word discrimination',
    dimension: 'listening-orthography',
    scope: 'lemma',
    stageId: 'auditory-surface-discrimination',
    prerequisites: [{ aspectId: 'auditory-surface-recognition', scope: 'lemma' }],
    evidence: 'Discriminates a heard Albanian word from a reviewed real-word contrast when available, otherwise from a fresh saved-word set.',
  },
  {
    id: 'auditory-meaning-recognition',
    label: 'Heard-meaning recognition',
    dimension: 'listening-comprehension',
    scope: 'lemma',
    stageId: 'auditory-meaning-recognition',
    conditional: 'unambiguous-audio-sense',
    prerequisites: [{ aspectId: 'auditory-surface-discrimination', scope: 'lemma' }],
    evidence: 'Recognises the meaning of a complete recorded Albanian word without seeing its transcript.',
  },
  {
    id: 'controlled-lemma-retrieval',
    label: 'Controlled lemma retrieval',
    dimension: 'lexical',
    scope: 'lemma',
    stageId: 'controlled-lemma-retrieval',
    prerequisites: [{ aspectId: 'lexical-meaning-recognition', scope: 'lemma' }],
    evidence: 'Retrieves the Albanian lemma from a controlled choice set.',
  },
  {
    id: 'demonstrative-noun-agreement',
    label: 'Demonstrative and noun agreement',
    dimension: 'morphosyntax',
    scope: 'lemma',
    stageId: 'demonstrative-noun-agreement',
    conditional: 'reviewed-demonstrative-frame',
    prerequisites: [{ aspectId: 'controlled-lemma-retrieval', scope: 'lemma' }],
    evidence: 'Chooses the reviewed ky/kjo agreement and then retrieves the noun in the same phrase.',
  },
  {
    id: 'adjective-linking-article-agreement',
    label: 'Adjective linking-article agreement',
    dimension: 'morphosyntax',
    scope: 'lemma',
    stageId: 'adjective-linking-article-agreement',
    conditional: 'reviewed-adjective-frame',
    prerequisites: [{ aspectId: 'controlled-lemma-retrieval', scope: 'lemma' }],
    evidence: 'Identifies the noun, then supplies the reviewed i/e article that links its adjective.',
  },
  {
    id: 'linked-noun-agreement-cloze',
    label: 'Linked noun-phrase agreement',
    dimension: 'morphosyntax',
    scope: 'lemma',
    stageId: 'linked-noun-agreement-cloze',
    conditional: 'reviewed-linked-agreement-frame',
    prerequisites: [
      { aspectId: 'demonstrative-noun-agreement', scope: 'lemma' },
      { aspectId: 'adjective-linking-article-agreement', scope: 'lemma' },
    ],
    evidence: 'Completes both the demonstrative and adjective linking article in one reviewed Albanian noun phrase.',
  },
  {
    id: 'contextual-form-selection',
    label: 'Reviewed ending selection',
    dimension: 'morphosyntax',
    scope: 'reviewed-form',
    stageId: 'contextual-form-selection',
    conditional: 'reviewed-noun-ending-lane',
    prerequisites: [
      { aspectId: 'grammatical-form-recognition', scope: 'same-form' },
    ],
    evidence: 'Selects the exact reviewed noun ending required by an authored Albanian sentence.',
  },
  {
    id: 'reviewed-ending-recall',
    label: 'Reviewed ending recall',
    dimension: 'morphosyntax',
    scope: 'reviewed-form',
    stageId: 'reviewed-ending-recall',
    conditional: 'reviewed-noun-ending-lane',
    prerequisites: [
      { aspectId: 'contextual-form-selection', scope: 'same-form' },
    ],
    evidence: 'Types only the exact reviewed noun ending required by an authored Albanian sentence.',
  },
  {
    id: 'contextual-meaning-inference',
    label: 'Independent contextual meaning',
    dimension: 'lexical-context',
    scope: 'lemma',
    stageId: 'contextual-meaning-inference',
    prerequisites: [{ aspectId: 'lexical-meaning-recognition', scope: 'lemma' }],
    evidence: 'Infers the target sense in an authored context without a marked answer.',
  },
  {
    id: 'auditory-form-construction',
    label: 'Heard-form construction',
    dimension: 'listening-orthography',
    scope: 'active-target',
    stageId: 'auditory-word-construction',
    prerequisites: [{ aspectId: 'lexical-meaning-recognition', scope: 'lemma' }],
    conditionalPrerequisites: {
      'reviewed-noun-ending-lane': [
        { aspectId: 'reviewed-ending-recall', scope: 'active-form' },
      ],
    },
    evidence: 'Maps a complete recorded Albanian word to its spelling using supplied chunks.',
  },
  {
    id: 'auditory-typed-recall',
    label: 'Heard-form typed recall',
    dimension: 'listening-orthography',
    scope: 'active-target',
    stageId: 'auditory-word-spelling',
    prerequisites: [{ aspectId: 'auditory-form-construction', scope: 'same-target' }],
    evidence: 'Types the exact form after hearing its complete recorded MP3.',
  },
  {
    id: 'orthographic-construction',
    label: 'Orthographic construction',
    dimension: 'written-production',
    scope: 'active-target',
    stageId: 'word-form-construction',
    prerequisites: [
      { aspectId: 'controlled-lemma-retrieval', scope: 'lemma' },
      { aspectId: 'auditory-form-construction', scope: 'same-target' },
    ],
    conditionalPrerequisites: {
      'reviewed-context-lane': [
        { aspectId: 'contextual-meaning-inference', scope: 'lemma' },
      ],
      'reviewed-noun-ending-lane': [
        { aspectId: 'reviewed-ending-recall', scope: 'active-form' },
      ],
    },
    evidence: 'Constructs the exact word or reviewed surface from Albanian chunks.',
  },
  {
    id: 'contextual-written-recall',
    label: 'Contextual written recall',
    dimension: 'written-production',
    scope: 'active-target',
    stageId: 'contextual-typed-recall',
    prerequisites: [
      { aspectId: 'orthographic-construction', scope: 'same-target' },
      { aspectId: 'auditory-typed-recall', scope: 'same-target' },
    ],
    evidence: 'Types the word or reviewed form from an authored cue.',
  },
  {
    id: 'spaced-exact-recall',
    label: 'Spaced exact recall',
    dimension: 'retention',
    scope: 'active-target',
    stageId: 'strict-spaced-recall',
    prerequisites: [{ aspectId: 'contextual-written-recall', scope: 'same-target' }],
    evidence: 'Recalls the exact surface after both round-based and elapsed spacing.',
  },
])

export const WORD_LEARNING_ASPECT_BY_ID = deepFreeze(Object.fromEntries(
  WORD_LEARNING_ASPECTS.map((aspect) => [aspect.id, aspect]),
))

export const WORD_STAGE_ASPECT_BINDINGS = deepFreeze({
  'meaning-recognition': {
    writes: ['lexical-meaning-recognition'],
    reads: [],
  },
  'auditory-surface-recognition': {
    writes: ['auditory-surface-recognition'],
    reads: ['lexical-meaning-recognition'],
  },
  'auditory-surface-discrimination': {
    writes: ['auditory-surface-discrimination'],
    reads: ['auditory-surface-recognition'],
  },
  'auditory-meaning-recognition': {
    writes: ['auditory-meaning-recognition'],
    reads: ['auditory-surface-discrimination'],
  },
  'reviewed-form-contrast': {
    writes: ['grammatical-form-recognition'],
    reads: ['lexical-meaning-recognition'],
    phases: {
      'identify-form-meaning': { writes: [], reads: ['lexical-meaning-recognition'] },
      'identify-marked-form-job': { writes: ['grammatical-form-recognition'], reads: ['lexical-meaning-recognition'] },
    },
  },
  'grammatical-form-odd-one-out': {
    writes: ['grammatical-form-odd-one-out'],
    reads: ['grammatical-form-recognition'],
  },
  'controlled-lemma-retrieval': {
    writes: ['controlled-lemma-retrieval'],
    reads: ['lexical-meaning-recognition'],
  },
  'demonstrative-noun-agreement': {
    writes: ['demonstrative-noun-agreement'],
    reads: ['controlled-lemma-retrieval'],
    phases: {
      'choose-demonstrative': { writes: [], reads: ['controlled-lemma-retrieval'] },
      'choose-noun': { writes: ['demonstrative-noun-agreement'], reads: ['controlled-lemma-retrieval'] },
    },
  },
  'adjective-linking-article-agreement': {
    writes: ['adjective-linking-article-agreement'],
    reads: ['controlled-lemma-retrieval'],
    phases: {
      'identify-agreement-noun': { writes: [], reads: ['lexical-meaning-recognition'] },
      'choose-linking-article': { writes: [], reads: ['controlled-lemma-retrieval'] },
      'identify-linking-article-job': { writes: ['adjective-linking-article-agreement'], reads: ['controlled-lemma-retrieval'] },
    },
  },
  'linked-noun-agreement-cloze': {
    writes: ['linked-noun-agreement-cloze'],
    reads: ['demonstrative-noun-agreement', 'adjective-linking-article-agreement'],
    phases: {
      'choose-linked-demonstrative': {
        writes: [],
        reads: ['demonstrative-noun-agreement', 'adjective-linking-article-agreement'],
      },
      'choose-linked-article': {
        writes: ['linked-noun-agreement-cloze'],
        reads: ['demonstrative-noun-agreement', 'adjective-linking-article-agreement'],
      },
    },
  },
  'contextual-form-selection': {
    writes: ['contextual-form-selection'],
    reads: ['grammatical-form-recognition'],
  },
  'reviewed-ending-recall': {
    writes: ['reviewed-ending-recall'],
    reads: ['contextual-form-selection'],
  },
  'contextual-meaning-inference': {
    writes: ['contextual-meaning-inference'],
    reads: ['lexical-meaning-recognition'],
  },
  'auditory-word-construction': {
    writes: ['auditory-form-construction'],
    reads: ['lexical-meaning-recognition'],
    conditionalReads: {
      'reviewed-noun-ending-lane': ['reviewed-ending-recall'],
    },
  },
  'auditory-word-spelling': {
    writes: ['auditory-typed-recall'],
    reads: ['auditory-form-construction'],
  },
  'word-form-construction': {
    writes: ['orthographic-construction'],
    reads: ['controlled-lemma-retrieval', 'auditory-form-construction'],
    conditionalReads: {
      'reviewed-context-lane': ['contextual-meaning-inference'],
      'reviewed-noun-ending-lane': ['reviewed-ending-recall'],
    },
  },
  'contextual-typed-recall': {
    writes: ['contextual-written-recall'],
    reads: ['orthographic-construction', 'auditory-typed-recall'],
  },
  'strict-spaced-recall': {
    writes: ['spaced-exact-recall'],
    reads: ['contextual-written-recall'],
  },
})

export const wordAspectDefinitionForStage = (stageId) => WORD_LEARNING_ASPECTS.find(
  (aspect) => aspect.stageId === stageId,
) || null

export const wordAspectEvidenceKey = (aspectId, targetFormKey = null) =>
  `${targetFormKey ? `form:${targetFormKey}` : 'lemma'}|${aspectId}`

const levelFor = (plan, targetFormKey) => [
  plan.contextVariantId || plan.variantId || 'base',
  targetFormKey || 'lemma',
].join(':')

const targetForAspect = (targetId, aspectId, plan, evidenceMode) => {
  const aspect = WORD_LEARNING_ASPECT_BY_ID[aspectId]
  const targetFormKey = aspect?.scope === 'lemma' ? null : plan.targetFormKey || null
  return {
    targetId,
    aspectId,
    level: levelFor(plan, targetFormKey),
    targetFormKey,
    evidenceMode,
  }
}

export function wordAspectTargetsForPlan(targetId, plan, phaseId = null) {
  if (!targetId || !plan) return []
  const stageId = plan.contextReview ? 'contextual-meaning-inference' : plan.stageId
  const binding = WORD_STAGE_ASPECT_BINDINGS[stageId]
  if (!binding) return []
  const phase = phaseId ? binding.phases?.[phaseId] : null
  const active = phase || binding
  const conditionalReads = [
    ...(plan.hasReviewedFormLane ? active.conditionalReads?.['reviewed-form-lane'] || [] : []),
    ...(plan.hasReviewedNounEndingLane ? active.conditionalReads?.['reviewed-noun-ending-lane'] || [] : []),
    ...(plan.hasReviewedContextLane ? active.conditionalReads?.['reviewed-context-lane'] || [] : []),
  ]
  return [
    ...[...(active.reads || []), ...conditionalReads]
      .map((aspectId) => targetForAspect(targetId, aspectId, plan, 'prerequisite')),
    ...(active.writes || []).map((aspectId) => targetForAspect(targetId, aspectId, plan, 'write')),
  ]
}
