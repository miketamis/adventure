// The canonical lexical learning ladder. Train, persistence, CEFR readiness
// and the debug graph all consume these definitions; UI components must not
// invent their own gates or rename receptive selection as "production".

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const WORD_PROGRESS_VERSION = 4
export const WORD_MIN_INTERVENING_ROUNDS = 1
export const WORD_INITIAL_REVIEW_GAP = 6
export const WORD_MAX_REVIEW_GAP = 64

export const WORD_CONTEXT_EXERCISE_CONCEPT = 'context-gap'
export const WORD_CONTEXT_LATE_PROOF = 'unmarked-context-recognition'

export const WORD_CAPABILITY_DEFINITIONS = deepFreeze([
  { id: 'meaning-recognition', label: 'Recognise meaning', stageId: 'meaning-recognition' },
  { id: 'controlled-retrieval-supported', label: 'Retrieve from two choices', stageId: 'controlled-lemma-retrieval' },
  { id: 'controlled-retrieval-expanded', label: 'Retrieve from four choices', stageId: 'controlled-lemma-retrieval' },
  { id: 'reviewed-form-awareness', label: 'Distinguish a reviewed form and job', stageId: 'reviewed-form-contrast', conditional: 'reviewed-form-lane' },
  { id: 'contextual-form-selection', label: 'Select the reviewed form in context', stageId: 'contextual-form-selection', conditional: 'reviewed-form-lane' },
  { id: 'word-form-construction', label: 'Construct the word or form', stageId: 'word-form-construction' },
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
    label: 'Unmarked context · recognise independently',
    direction: 'al2en',
    mode: 'choice',
    choiceDistractors: 3,
    evidenceTrack: 'recognition',
    sourceLanguage: 'sq',
    gapLanguage: 'en',
    targetPresentation: 'unmarked',
    unlock: { kind: 'before-stage', stageId: 'word-form-construction' },
    proofId: WORD_CONTEXT_LATE_PROOF,
    alignmentPolicy: {
      unmarkedRequiresExactlyOneTarget: true,
      missingOrAmbiguousTarget: 'retain-marking',
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
    tier: 2,
    id: 'reviewed-form-contrast',
    label: 'reviewed form contrast',
    familyId: 'word-forms',
    mode: 'choice',
    direction: 'form2role',
    evidenceTrack: 'form-awareness',
    conditional: 'reviewed-form-lane',
    variant: { id: 'class-specific-form-contrast', choiceRange: [2, 4], distractors: { min: 1, max: 3 } },
    gate: { wins: 1 },
    capabilityIds: ['reviewed-form-awareness'],
    proves: 'distinguishes the exact reviewed form and its grammatical job',
  },
  {
    tier: 3,
    id: 'contextual-form-selection',
    label: 'form selection in context',
    familyId: 'word-form-context',
    mode: 'choice',
    direction: 'context2form',
    evidenceTrack: 'form-selection',
    conditional: 'reviewed-form-lane',
    variant: { id: 'reviewed-form-in-context', choiceRange: [2, 4], distractors: { min: 1, max: 3 } },
    gate: { wins: 1 },
    capabilityIds: ['contextual-form-selection'],
    proves: 'selects the correct reviewed surface for its real grammatical context',
  },
  {
    tier: 4,
    id: 'word-form-construction',
    label: 'word / form construction',
    familyId: 'word-construction',
    mode: 'construct',
    direction: 'en2al',
    evidenceTrack: 'production',
    variant: { id: 'letter-and-chunk-construction', distractorChunks: 3 },
    gate: { wins: 1 },
    capabilityIds: ['word-form-construction'],
    proves: 'constructs the target from Albanian letters or chunks',
  },
  {
    tier: 5,
    id: 'contextual-typed-recall',
    label: 'beginner-tolerant contextual recall',
    familyId: 'word-spelling',
    mode: 'type',
    direction: 'en2al',
    evidenceTrack: 'production',
    answerTolerance: 'beginner',
    gate: { wins: 1 },
    capabilityIds: ['contextual-typed-recall'],
    proves: 'recalls and types the word or reviewed form in context with beginner leeway',
  },
  {
    tier: 6,
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

export const WORD_SKILL_MAX_TIER = WORD_STAGE_DEFINITIONS.length - 1
const STAGE_BY_ID = Object.freeze(Object.fromEntries(WORD_STAGE_DEFINITIONS.map((stage) => [stage.id, stage])))

export const WORD_PROGRESSION_POLICY = deepFreeze({
  version: WORD_PROGRESS_VERSION,
  principle: 'Saving supplies guided recognition. Train begins with four-choice meaning recognition; controlled selection remains retrieval, and production begins only when the learner constructs a form.',
  stageOrder: WORD_STAGE_DEFINITIONS.map(({ id }) => id),
  productionBeginsAt: 'word-form-construction',
  controlledRetrievalVariants: STAGE_BY_ID['controlled-lemma-retrieval'].variants,
  formLane: {
    conditionalCapabilities: ['reviewed-form-awareness', 'contextual-form-selection'],
    source: 'reviewed forms only',
    rule: 'Inflecting senses practise exact reviewed form-and-role records. Non-inflecting senses skip only the two form-specific capabilities.',
  },
  contextVariant: {
    exerciseConceptId: WORD_CONTEXT_EXERCISE_CONCEPT,
    variants: WORD_CONTEXT_VARIANTS,
    rule: 'Marked, mirrored and later unmarked contexts are aligned recognition/retrieval support; none counts as production.',
  },
  remediation: {
    delayedByDisjointRounds: WORD_MIN_INTERVENING_ROUNDS,
    rule: 'A production miss backs off to targeted support after one disjoint round; strict recall remains spaced.',
  },
  evidenceBoundary: {
    recognition: ['meaning-recognition', 'marked-context-recognition', 'unmarked-context-recognition'],
    controlledRetrieval: ['controlled-retrieval-two-choice', 'controlled-retrieval-four-choice', 'mirrored-controlled-retrieval'],
    production: ['word-form-construction', 'contextual-typed-recall', 'strict-spaced-recall'],
    proves: ['word meaning recognition', 'controlled lemma retrieval', 'reviewed form choice', 'constructed and typed recall'],
    doesNotProve: ['free conversation', 'broad listening comprehension', 'CEFR attainment'],
  },
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
    return { usable: false, unmarkedSafe: false, mirrorSafe: false, reason: 'missing-context-field', targetMatches: 0, gapCount: 0 }
  }
  const gapCount = en.split('__').length - 1
  if (gapCount !== 1) {
    return { usable: false, unmarkedSafe: false, mirrorSafe: false, reason: 'malformed-gap-pair', targetMatches: 0, gapCount }
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
    return { usable: false, unmarkedSafe: false, mirrorSafe: false, reason: 'missing-target', targetMatches: 0, gapCount }
  }
  const exact = targetRanges.length === 1
  const reviewedAnswer = typeof answerSurface === 'string' ? answerSurface.trim() : null
  const answerSurfaceAligned = reviewedAnswer == null || focus === reviewedAnswer
  const retrievalCueReviewed = context?.retrieval?.reviewed === true &&
    typeof context.retrieval.en === 'string' && Boolean(context.retrieval.en.trim())
  return {
    usable: true,
    unmarkedSafe: exact,
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
})

export function emptyWordProgress() {
  return {
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
  }
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
      wins: normalizedWins(proof.wins, WORD_STAGE_DEFINITIONS.slice(2).map(({ id }) => id)),
      strictWins: safeCount(proof.strictWins),
      dueAfterRound: safeRound(proof.dueAfterRound),
      reviewGap,
      lastAttemptKey: safeString(proof.lastAttemptKey),
      lastAttemptRound: safeRound(proof.lastAttemptRound),
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
  const next = {
    wins: normalizedWins(source.wins),
    contextWins: contextPassed ? { [WORD_CONTEXT_LATE_PROOF]: 1 } : {},
    contextSupportRequired: source.contextSupportRequired === true && !contextPassed,
    formProofs: normalizedFormProofs(source.formProofs),
    activeFormKey: safeString(source.activeFormKey, 240),
    strictWins: safeCount(source.strictWins),
    dueAfterRound: safeRound(source.dueAfterRound),
    reviewGap,
    lastAttemptKey: safeString(source.lastAttemptKey),
    lastAttemptRound: safeRound(source.lastAttemptRound),
    remediation: null,
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

const proofWins = (progress, definition, formKey = null) => formKey
  ? progress.formProofs[formKey]?.wins?.[definition.id] || 0
  : progress.wins[definition.id] || 0

const proofPassed = (progress, definition, formKey = null) => definition.tier === WORD_SKILL_MAX_TIER
  ? (formKey ? progress.formProofs[formKey]?.strictWins : progress.strictWins) > 0
  : proofWins(progress, definition, formKey) >= (definition.gate.wins || 1)

const selectedForm = (progress, forms) => {
  if (!forms.length) return null
  const active = forms.find((form) => form.key === progress.activeFormKey)
  return (active && !proofPassed(progress, STAGE_BY_ID['strict-spaced-recall'], active.key) ? active : null) ||
    forms.find((form) => !proofPassed(progress, STAGE_BY_ID['strict-spaced-recall'], form.key)) || active ||
    forms[0]
}

const retrievalVariant = (progress) => {
  const wins = progress.wins['controlled-lemma-retrieval'] || 0
  return wins < 1
    ? STAGE_BY_ID['controlled-lemma-retrieval'].variants[0]
    : STAGE_BY_ID['controlled-lemma-retrieval'].variants[1]
}

const basePlan = (progress, options = {}) => {
  const forms = normalizedReviewedForms(options)
  const hasReviewedFormLane = forms.length > 0 || options.hasReviewedFormLane === true
  for (const definition of WORD_STAGE_DEFINITIONS.slice(0, 2)) {
    if (!proofPassed(progress, definition)) return { definition, formTarget: null, forms, hasReviewedFormLane }
  }
  const formTarget = selectedForm(progress, forms)
  if (hasReviewedFormLane && formTarget) {
    for (const definition of WORD_STAGE_DEFINITIONS.slice(2)) {
      if (!proofPassed(progress, definition, formTarget.key)) return { definition, formTarget, forms, hasReviewedFormLane }
    }
    return { definition: STAGE_BY_ID['strict-spaced-recall'], formTarget, forms, hasReviewedFormLane }
  }
  for (const definition of WORD_STAGE_DEFINITIONS.slice(4)) {
    if (!proofPassed(progress, definition)) return { definition, formTarget: null, forms, hasReviewedFormLane: false }
  }
  return { definition: STAGE_BY_ID['strict-spaced-recall'], formTarget: null, forms, hasReviewedFormLane: false }
}

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
  if (base.definition.tier < STAGE_BY_ID['word-form-construction'].tier) return null
  if (!alignment.usable) return null
  const requested = CONTEXT_VARIANT_BY_ID[WORD_CONTEXT_LATE_PROOF]
  const variant = progress.contextSupportRequired || !alignment.unmarkedSafe
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
    dueAfterRound: progress.dueAfterRound,
    due: currentRound >= progress.dueAfterRound,
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
  }
}

export function wordProgressPlan(value, currentRound = 0, options = {}) {
  const progress = normalizeWordProgress(value, currentRound)
  const base = basePlan(progress, options)
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
  const controlledVariant = definition.id === 'controlled-lemma-retrieval' ? retrievalVariant(progress) : null
  const variant = controlledVariant || definition.variant
  const contextVariant = contextVariantFor(definition, alignment)
  const proof = formTarget ? progress.formProofs[formTarget.key] || emptyFormProof() : progress
  const dueAfterRound = progress.remediation?.dueAfterRound ?? Math.max(proof.dueAfterRound || 0, progress.dueAfterRound)
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
    due: currentRound >= dueAfterRound,
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
  }
}

const resultMatchesPlan = (result, plan) =>
  result?.stageId === plan.stageId &&
  result?.tier === plan.tier && result?.mode === plan.mode && result?.direction === plan.direction &&
  result?.variantId === (plan.contextVariantId || plan.variantId) &&
  (plan.targetFormKey ? result?.targetFormKey === plan.targetFormKey : result?.targetFormKey == null)

const remediationForFailure = (plan, nextRound) => {
  if (plan.definition.tier === 0) return null
  // Back off exactly one applicable rung. This preserves the target form and
  // gives relevant support (selection before construction; construction before
  // typing) instead of dropping every production miss back to a lemma quiz.
  const stageId = plan.definition.tier === 4 && !plan.hasReviewedFormLane
    ? 'controlled-lemma-retrieval'
    : WORD_STAGE_DEFINITIONS[plan.definition.tier - 1].id
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
  const plan = wordProgressPlan(progress, currentRound, options)
  const questionKey = safeString(result.questionKey)
  if (!plan.due) return { accepted: false, reason: 'not-due', progress, plan }
  if (!questionKey) return { accepted: false, reason: 'missing-question-key', progress, plan }
  if (questionKey === progress.lastAttemptKey) return { accepted: false, reason: 'duplicate-question', progress, plan }
  if (!resultMatchesPlan(result, plan)) return { accepted: false, reason: 'plan-mismatch', progress, plan }

  const nextRound = Math.max(safeRound(currentRound), safeRound(result.round))
  const next = {
    ...progress,
    wins: { ...progress.wins },
    contextWins: { ...progress.contextWins },
    formProofs: { ...progress.formProofs },
    lastAttemptKey: questionKey,
    lastAttemptRound: nextRound,
  }
  if (plan.contextReview) {
    if (result.correct) {
      next.contextWins[WORD_CONTEXT_LATE_PROOF] = 1
      next.contextSupportRequired = false
    } else next.contextSupportRequired = true
    next.dueAfterRound = nextRound + WORD_MIN_INTERVENING_ROUNDS
    return { accepted: true, progress: normalizeWordProgress(next, nextRound), plan }
  }

  const proof = mutableProofFor(next, plan.targetFormKey)
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
      currentStageId: null,
      nextStageId: null,
      progress: normalizeWordProgress(value, currentRound),
      next: null,
      stages: WORD_STAGE_DEFINITIONS.map((definition) => ({ definition, status: 'not-trainable', wins: 0, winsRequired: definition.gate.wins ?? null })),
      context: { exerciseConceptId: WORD_CONTEXT_EXERCISE_CONCEPT, alignment: wordContextAlignment(options.context, options.answerSurface), variants: [] },
      capabilities,
    }
  }
  const progress = normalizeWordProgress(value, currentRound)
  const plan = wordProgressPlan(progress, currentRound, options)
  const forms = normalizedReviewedForms(options)
  const target = plan.formTarget || selectedForm(progress, forms)
  const targetProof = target ? progress.formProofs[target.key] || emptyFormProof() : progress
  const stageRows = WORD_STAGE_DEFINITIONS.map((definition) => {
    const formKey = definition.tier >= 2 ? target?.key || null : null
    const conditionalSkipped = Boolean(definition.conditional && !plan.hasReviewedFormLane)
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
    currentStageId: plan.stageId,
    nextStageId: plan.stageId,
    progress,
    next: plan,
    stages: stageRows,
    capabilities,
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
