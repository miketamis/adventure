import { DICT } from './dictionary.js'
import { reviewedFormTargets } from './formInventory.js'
import { containsExcludedPhraseWord, shuffleWith } from './phrasePractice.js'
import { TRAIN_EXERCISE_FAMILIES } from './trainingProgression.js'
import { isTrainableSense } from './lexicalTrainability.js'
import { choiceSetIsValid, sensesMayShareAnswer } from './practiceAnswerValidity.js'
import { wordContrastRank } from './practiceContrasts.js'
import { wordProductionTargetReference } from './contextQuestionPresentation.js'
import { wordAspectTargetsForPlan } from './wordLearningAspects.js'
import {
  NOUN_GRAMMAR_ACTIVITY_VARIANTS,
  REVIEWED_NOUN_AGREEMENT_BY_ID,
  reviewedNounAgreementFrame,
  reviewedNounAgreementGate,
} from './nounAgreementPractice.js'
import { reviewedFormOddOneOutPlan } from './reviewedFormOddOneOut.js'
import { reviewedNounFormMatchingPlan } from './nounFormMatching.js'

let formQuestionSequence = 0
const lower = (value) => value.normalize('NFC').toLocaleLowerCase('sq')

const targetTokenIndices = (text, surface) => {
  const target = lower(surface)
  return String(text || '').split(/\s+/).flatMap((word, index) =>
    lower(word).replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '') === target ? [index] : [],
  )
}

const uniqueBy = (values, keyOf) => {
  const seen = new Set()
  return values.filter((value) => {
    const key = keyOf(value)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const targetForPlan = (forms, plan) => forms.find((form) => form.key === plan?.targetFormKey) || null

export function reviewedFormContextGate(target, discoveredIds = []) {
  const requires = target?.context?.requires
  if (!Array.isArray(requires)) {
    return { eligible: false, reason: 'reviewed form context lacks explicit sense requirements', requiredIds: [], missingIds: [] }
  }
  const unknownIds = [...new Set(requires)].filter((id) => !DICT[id])
  if (unknownIds.length) {
    return { eligible: false, reason: `reviewed form context names unknown senses: ${unknownIds.join(', ')}`, requiredIds: [], missingIds: [] }
  }
  const requiredIds = [...new Set(requires)].filter((id) => id !== target.id && isTrainableSense(id))
  const discovered = new Set(discoveredIds)
  const missingIds = requiredIds.filter((id) => !discovered.has(id))
  return {
    eligible: missingIds.length === 0,
    reason: missingIds.length ? `supporting context senses are not saved: ${missingIds.join(', ')}` : 'every supporting context sense is saved',
    requiredIds,
    missingIds,
  }
}

const questionBase = (answerId, target, plan, currentRound) => ({
  questionKey: `${answerId}:word:${currentRound}:${plan.tier}:${plan.variantId || plan.stageId}:${encodeURIComponent(target.key)}:${formQuestionSequence++}`,
  answerId,
  dir: plan.direction,
  mode: plan.mode,
  tier: plan.tier,
  wordStageId: plan.stageId,
  variantId: plan.variantId,
  difficultyLabel: plan.difficultyLabel,
  remediation: plan.remediation,
  targetFormKey: target.key,
  surface: target.surface,
  formTarget: target,
  // The shared no-repeat scheduler must see every Albanian word presented on
  // this card, not only the marked inflected surface.
  lexicalSurfaces: [target.context?.al, target.surface].filter(Boolean),
  aspectTargets: wordAspectTargetsForPlan(answerId, plan),
  phaseAspectTargets: Object.fromEntries((plan.definition.variant?.phases || []).map(({ id }) => [
    id,
    wordAspectTargetsForPlan(answerId, plan, id),
  ])),
})

const contrastOptions = (forms, target, rng) => {
  const rows = uniqueBy([target, ...shuffleWith(forms.filter((form) => form.key !== target.key), rng)], (form) =>
    form.roleLabel,
  ).slice(0, 4)
  return rows.map((form) => ({
    value: form.key,
    label: form.roleLabel,
    surface: form.surface,
  }))
}

const endingOptions = (target, rng) => {
  const source = target?.endingPractice?.options || []
  const answer = source.find(({ value }) => value === target.endingPractice.answer)
  if (!answer) return []
  return shuffleWith([
    answer,
    ...shuffleWith(source.filter(({ value }) => value !== answer.value), rng).slice(0, 3),
  ], rng)
}

const endingPrompt = (target) => {
  const words = target.context.al.split(/\s+/u)
  const raw = words[target.context.targetTokenIndex] || ''
  const surface = lower(target.surface)
  const rawLower = lower(raw)
  const offset = rawLower.indexOf(surface)
  if (offset < 0) return null
  const stemLength = target.endingPractice.stem.length
  const endingLength = target.endingPractice.answer.length
  const formStart = offset
  const endingStart = formStart + stemLength
  const endingEnd = endingStart + endingLength
  words[target.context.targetTokenIndex] = `${raw.slice(0, endingStart)}__${raw.slice(endingEnd)}`
  return words.join(' ')
}

const senseText = (id) => DICT[id]?.enAll ?? DICT[id]?.en

const meaningOptions = (answerId, candidateIds, count, rng, excludeWords = []) => {
  const usedLabels = new Set([senseText(answerId)])
  const selected = new Set()
  const ranked = (ids) => [...new Set(shuffleWith(ids, rng))]
    .map((id) => ({ id, rank: wordContrastRank(answerId, id) }))
    .filter(({ id, rank }) => id !== answerId &&
      !selected.has(id) &&
      isTrainableSense(id) &&
      Number.isFinite(rank) &&
      !containsExcludedPhraseWord(DICT[id].al, excludeWords))
    .sort((left, right) => left.rank - right.rank)
  const take = (rows) => rows.flatMap(({ id }) => {
      const label = senseText(id)
      if (!label || usedLabels.has(label) || sensesMayShareAnswer(answerId, id)) return []
      usedLabels.add(label)
      selected.add(id)
      return [id]
    })
  const local = take(ranked(candidateIds || []))
  const distractors = [...local, ...take(ranked(Object.keys(DICT)))]
    .slice(0, count)
  if (distractors.length !== count) return null
  const options = shuffleWith([answerId, ...distractors], rng)
  return choiceSetIsValid({
    answerValue: answerId,
    optionValues: options,
    labelOf: senseText,
    expectedOptionCount: count + 1,
  }) ? options : null
}

export const ALBANIAN_CONSTRUCTION_CHUNKS = Object.freeze([
  'dh', 'gj', 'll', 'nj', 'rr', 'sh', 'th', 'xh', 'zh',
  'a', 'b', 'c', 'ç', 'd', 'e', 'ë', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'z',
])
const DIGRAPHS = new Set(ALBANIAN_CONSTRUCTION_CHUNKS.filter((chunk) => chunk.length === 2))

export function albanianConstructionChunks(surface) {
  const letters = [...surface.normalize('NFC').toLocaleLowerCase('sq').trim()]
  const chunks = []
  for (let index = 0; index < letters.length;) {
    const pair = `${letters[index] || ''}${letters[index + 1] || ''}`
    if (DIGRAPHS.has(pair)) {
      chunks.push(pair)
      index += 2
    } else {
      if (/\p{L}/u.test(letters[index])) chunks.push(letters[index])
      else if (/\s/u.test(letters[index]) && chunks.at(-1) !== ' ') chunks.push(' ')
      else if (/['’-]/u.test(letters[index])) chunks.push(letters[index])
      index += 1
    }
  }
  return chunks
}

export function buildConstructionPieces(surface, { distractorCount = 3, rng = Math.random } = {}) {
  const answerChunks = albanianConstructionChunks(surface)
  const answerPieces = answerChunks.map((text, index) => ({ id: `answer-${index}`, text, label: text === ' ' ? 'space' : text, distractor: false }))
  const used = new Set(answerChunks)
  const nearby = ALBANIAN_CONSTRUCTION_CHUNKS
    .map((text) => ({ text, distance: Math.abs(text.codePointAt(0) - (answerChunks[0]?.codePointAt(0) || 97)) }))
    .filter(({ text }) => !used.has(text))
    .sort((left, right) => left.distance - right.distance || left.text.localeCompare(right.text, 'sq'))
  const distractors = shuffleWith(nearby.slice(0, 12), rng).slice(0, distractorCount)
    .map(({ text }, index) => ({ id: `distractor-${index}`, text, label: text, distractor: true }))
  return {
    answer: answerChunks.join(''),
    answerPieceIds: answerPieces.map(({ id }) => id),
    pieces: shuffleWith([...answerPieces, ...distractors], rng),
  }
}

// Pure exact-form builder. It never guesses an ending: target, grammatical
// role and context all come from `reviewedFormTargets`, the same inventory used
// by progression snapshots and audits.
export function buildFormQuestion({
  answerId,
  plan,
  candidateIds = [],
  excludeWords = [],
  currentRound = 0,
  rng = Math.random,
} = {}) {
  if (!DICT[answerId] || !isTrainableSense(answerId)) return null
  const forms = reviewedFormTargets(answerId)
  const target = targetForPlan(forms, plan)
  if (!target ||
      containsExcludedPhraseWord(target.surface, excludeWords) ||
      containsExcludedPhraseWord(target.context?.al, excludeWords)) return null
  const contextGate = reviewedFormContextGate(target, candidateIds)
  if (!contextGate.eligible) return null
  const targetIndices = targetTokenIndices(target.context?.al, target.surface)
  if (targetIndices.length !== 1 || String(target.context?.alGap || '').split('__').length - 1 !== 1) return null
  const base = questionBase(answerId, target, plan, currentRound)

  if (plan.stageId === 'reviewed-form-contrast') {
    const phasePlan = plan.definition.variant.phases
    const identityPhase = phasePlan.find(({ task }) => task === 'meaning-identification')
    const lexicalOptions = meaningOptions(answerId, candidateIds, identityPhase.choiceDistractors, rng, excludeWords)
    const options = contrastOptions(forms, target, rng)
    if (!lexicalOptions || options.length < 2 || !choiceSetIsValid({
      answerValue: target.key,
      optionValues: options.map(({ value }) => value),
      labelOf: (value) => options.find((option) => option.value === value)?.label,
      expectedOptionCount: options.length,
    })) return null
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
      familyId: TRAIN_EXERCISE_FAMILIES.wordForms.id,
      formExerciseMode: 'identify-form',
      promptKind: target.wordClass === 'noun' ? 'noun-role-in-context' : 'reviewed-use-in-context',
      phasePlan,
      lexicalCheck: {
        phaseId: identityPhase.id,
        answerId,
        field: 'en',
        options: lexicalOptions,
        optionLabels: Object.fromEntries(lexicalOptions.map((id) => [
          id,
          senseText(id),
        ])),
        distractorPolicy: 'distinct incompatible sense ranked by lexical contrast',
      },
      context: target.context,
      contextGate,
      targetTokenIndices: targetIndices,
      options,
      answerValue: target.key,
      lexicalSurfaces: [
        target.context?.al,
        target.surface,
      ].filter(Boolean),
      distractorPolicy: target.wordClass === 'noun' ? 'same-noun-reviewed-roles' : 'same-word-reviewed-uses',
    }
  }

  if (plan.stageId === 'grammatical-form-odd-one-out') {
    const oddOneOut = reviewedFormOddOneOutPlan(forms, target, { currentRound })
    if (!oddOneOut) return null
    const options = shuffleWith(oddOneOut.rows, rng).map((row) => ({
      value: row.value,
      label: row.surface,
      role: row.role,
      category: row.category,
      odd: row.odd,
    }))
    if (!choiceSetIsValid({
      answerValue: oddOneOut.answerValue,
      optionValues: options.map(({ value }) => value),
      labelOf: (value) => options.find((option) => option.value === value)?.label,
      expectedOptionCount: 4,
      locale: 'sq',
    })) return null
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
      familyId: TRAIN_EXERCISE_FAMILIES.wordForms.id,
      formExerciseMode: 'form-odd-one-out',
      promptKind: 'reviewed-form-odd-one-out',
      context: null,
      contextGate,
      targetTokenIndices: [],
      options,
      answerValue: oddOneOut.answerValue,
      oddOneOut,
      lexicalSurfaces: options.map(({ label }) => label),
      distractorPolicy: `three unambiguous ${oddOneOut.matchingCategory} surfaces from the same reviewed noun paradigm; one exact ${oddOneOut.targetCategory} odd surface (${oddOneOut.dimension} contrast)`,
    }
  }

  if (plan.stageId === 'contextual-form-selection') {
    if (!target.endingPractice) return null
    const options = endingOptions(target, rng)
    const prompt = endingPrompt(target)
    if (!prompt) return null
    if (options.length < 2 || !choiceSetIsValid({
      answerValue: target.endingPractice.answer,
      optionValues: options.map(({ value }) => value),
      labelOf: (value) => options.find((option) => option.value === value)?.label,
      expectedOptionCount: options.length,
      locale: 'sq',
    })) return null
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
      familyId: TRAIN_EXERCISE_FAMILIES.wordForms.id,
      formExerciseMode: 'ending-choice',
      context: target.context,
      contextGate,
      endingPractice: target.endingPractice,
      endingPrompt: prompt,
      targetTokenIndices: targetIndices,
      options,
      answerValue: target.endingPractice.answer,
      distractorPolicy: 'same-noun exact reviewed four-role endings only',
    }
  }

  if (plan.stageId === 'reviewed-ending-recall') {
    if (!target.endingPractice) return null
    const prompt = endingPrompt(target)
    if (!prompt) return null
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
      familyId: TRAIN_EXERCISE_FAMILIES.wordForms.id,
      formExerciseMode: 'ending-type',
      context: target.context,
      contextGate,
      endingPractice: target.endingPractice,
      endingPrompt: prompt,
      targetTokenIndices: targetIndices,
      typingAnswer: target.endingPractice.answer,
      answerValue: target.endingPractice.answer,
      answerTolerance: 'strict',
      distractorPolicy: 'none: independent recall of only the exact reviewed ending',
    }
  }

  if (plan.stageId === 'word-form-construction') {
    const targetReference = wordProductionTargetReference({
      mode: 'construction',
      meaningCue: target.context.en,
      context: target.context,
    })
    if (!targetReference.valid) return null
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordConstruction.kind,
      context: target.context,
      contextGate,
      targetReference,
      construction: buildConstructionPieces(target.surface, {
        distractorCount: plan.definition.variant.distractorChunks,
        rng,
      }),
      answerValue: lower(target.surface),
      rewardIds: [answerId],
    }
  }

  return null
}

export function buildNounFormMatchingQuestion({
  answerId,
  plan,
  candidateIds = [],
  excludeWords = [],
  currentRound = 0,
  rng = Math.random,
} = {}) {
  if (!DICT[answerId] || !isTrainableSense(answerId) || plan?.stageId !== 'noun-paradigm-matching') return null
  const matching = reviewedNounFormMatchingPlan(reviewedFormTargets(answerId), candidateIds, { currentRound })
  if (!matching || matching.rows.some(({ context }) => containsExcludedPhraseWord(context, excludeWords))) return null
  const pairs = matching.rows.map((row) => ({
    id: row.formKey,
    formKey: row.formKey,
    context: row.context,
    surface: row.surface,
    targetTokenIndex: row.targetTokenIndex,
    role: row.role,
    roleLabel: row.roleLabel,
    gloss: row.gloss,
  }))
  return {
    questionKey: `${answerId}:word:${currentRound}:${plan.tier}:${plan.variantId}:${formQuestionSequence++}`,
    answerId,
    answerValue: answerId,
    dir: plan.direction,
    mode: plan.mode,
    tier: plan.tier,
    wordStageId: plan.stageId,
    variantId: plan.variantId,
    difficultyLabel: plan.difficultyLabel,
    remediation: plan.remediation,
    targetFormKey: null,
    surface: DICT[answerId].al,
    kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
    familyId: TRAIN_EXERCISE_FAMILIES.wordForms.id,
    formExerciseMode: 'same-root-grammar-matching',
    pairs,
    left: shuffleWith(pairs.map(({ id, context, surface, targetTokenIndex }) => ({
      id, text: context, surface, targetTokenIndex,
    })), rng),
    right: shuffleWith(pairs.map(({ id, roleLabel }) => ({ id, text: roleLabel })), rng),
    rewardIds: [answerId],
    lexicalSurfaces: pairs.map(({ context }) => context),
    aspectTargets: wordAspectTargetsForPlan(answerId, plan),
    contextGate: {
      eligible: true,
      reason: 'every supporting word in all five reviewed contexts is saved',
      requiredIds: matching.requiredIds,
      missingIds: [],
    },
    distractorPolicy: 'five distinct reviewed grammatical jobs for five contextual uses of one noun root; context disambiguates syncretic spellings',
  }
}

const agreementQuestionBase = (answerId, frame, plan, currentRound) => ({
  questionKey: `${answerId}:word:${currentRound}:${plan.tier}:${plan.variantId}:noun-agreement:${formQuestionSequence++}`,
  answerId,
  dir: plan.direction,
  mode: plan.mode,
  tier: plan.tier,
  wordStageId: plan.stageId,
  familyId: plan.familyId,
  variantId: plan.variantId,
  difficultyLabel: plan.difficultyLabel,
  remediation: plan.remediation,
  targetFormKey: null,
  agreementFrame: frame,
  phasePlan: plan.definition.variant.phases,
  aspectTargets: wordAspectTargetsForPlan(answerId, plan),
  phaseAspectTargets: Object.fromEntries(plan.definition.variant.phases.map(({ id }) => [
    id,
    wordAspectTargetsForPlan(answerId, plan, id),
  ])),
})

const agreementNounOptions = (answerId, candidateIds, rng) => {
  const distractors = shuffleWith([...new Set(candidateIds || [])], rng)
    .filter((id) => id !== answerId && REVIEWED_NOUN_AGREEMENT_BY_ID[id])
    .slice(0, 3)
  if (!distractors.length) return null
  const ids = shuffleWith([answerId, ...distractors], rng)
  return choiceSetIsValid({
    answerValue: answerId,
    optionValues: ids,
    labelOf: (id) => REVIEWED_NOUN_AGREEMENT_BY_ID[id]?.demonstrative.nounSurface,
    expectedOptionCount: ids.length,
    locale: 'sq',
  }) ? ids : null
}

// Agreement exercises reuse the staged `word-forms` family. Support phases do
// not write evidence; only completing the final phase records the independently
// scheduled agreement aspect.
export function buildNounAgreementQuestion({
  answerId,
  plan,
  candidateIds = [],
  excludeWords = [],
  currentRound = 0,
  rng = Math.random,
} = {}) {
  const frame = reviewedNounAgreementFrame(answerId)
  if (!frame || ![
    'demonstrative-noun-agreement',
    'adjective-linking-article-agreement',
    'linked-noun-agreement-cloze',
  ].includes(plan?.stageId)) return null
  const kind = plan.stageId === 'demonstrative-noun-agreement'
    ? 'demonstrative'
    : plan.stageId === 'adjective-linking-article-agreement' ? 'adjective' : 'linked'
  const contextGate = reviewedNounAgreementGate(frame, candidateIds, kind)
  if (!contextGate.eligible) return null
  const base = agreementQuestionBase(answerId, frame, plan, currentRound)

  if (kind === 'demonstrative') {
    const nounIds = agreementNounOptions(answerId, candidateIds, rng)
    if (!nounIds || containsExcludedPhraseWord(frame.demonstrative.phrase, excludeWords)) return null
    const articleOptions = [
      { value: 'ky', label: 'ky', lang: 'sq' },
      { value: 'kjo', label: 'kjo', lang: 'sq' },
    ]
    const nounOptions = nounIds.map((id) => ({
      value: id,
      label: REVIEWED_NOUN_AGREEMENT_BY_ID[id].demonstrative.nounSurface,
      lang: 'sq',
      surface: REVIEWED_NOUN_AGREEMENT_BY_ID[id].demonstrative.nounSurface,
    }))
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
      grammarBundle: true,
      grammarVariantId: NOUN_GRAMMAR_ACTIVITY_VARIANTS.demonstrativeSplitChoice.id,
      surface: frame.demonstrative.nounSurface,
      answerValue: answerId,
      options: nounOptions,
      phaseQuestions: {
        'choose-demonstrative': {
          instruction: 'Choose the Albanian word for “this” that agrees with this noun',
          prompt: frame.demonstrative.cueEn,
          promptLang: 'en',
          options: articleOptions,
          answerValue: frame.demonstrative.surface,
          miss: {
            reasonCode: 'wrong-demonstrative-agreement',
            reason: `For the reviewed ${frame.gender} noun “${frame.demonstrative.nounSurface}”, Albanian uses “${frame.demonstrative.surface}”.`,
            correctAl: frame.demonstrative.phrase,
            reasoning: 'Learn the demonstrative together with the noun; noun gender is lexical and should not be guessed from English.',
          },
        },
        'choose-noun': {
          instruction: 'Now complete the same Albanian noun phrase',
          prompt: `${frame.demonstrative.surface} __`,
          promptLang: 'sq',
          cue: frame.demonstrative.cueEn,
          options: nounOptions,
          answerValue: answerId,
          miss: {
            reasonCode: 'wrong-demonstrative-noun',
            reason: `That noun does not mean “${frame.nounMeaning}”.`,
            correctAl: frame.demonstrative.phrase,
            correctEn: frame.demonstrative.cueEn,
          },
        },
      },
      lexicalSurfaces: [frame.demonstrative.phrase, ...nounOptions.map(({ label }) => label)],
      contextGate,
      distractorPolicy: 'binary reviewed ky/kjo contrast followed by distinct saved reviewed nouns',
    }
  }

  if (kind === 'linked') {
    const phrase = `${frame.demonstrative.surface} ${frame.demonstrative.nounSurface} ${frame.adjective.article} ${frame.adjective.adjective}`
    const twoGaps = `__ ${frame.demonstrative.nounSurface} __ ${frame.adjective.adjective}`
    const articleOptions = [
      { value: 'i', label: 'i', lang: 'sq' },
      { value: 'e', label: 'e', lang: 'sq' },
    ]
    const demonstrativeOptions = [
      { value: 'ky', label: 'ky', lang: 'sq' },
      { value: 'kjo', label: 'kjo', lang: 'sq' },
    ]
    if (containsExcludedPhraseWord(phrase, excludeWords)) return null
    return {
      ...base,
      kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
      grammarBundle: true,
      grammarVariantId: NOUN_GRAMMAR_ACTIVITY_VARIANTS.linkedAgreementCloze.id,
      surface: frame.demonstrative.nounSurface,
      answerValue: frame.adjective.article,
      options: articleOptions,
      phaseQuestions: {
        'choose-linked-demonstrative': {
          instruction: 'Complete the first gap in this Albanian noun phrase',
          prompt: twoGaps,
          promptLang: 'sq',
          options: demonstrativeOptions,
          answerValue: frame.demonstrative.surface,
          miss: {
            reasonCode: 'wrong-linked-demonstrative-agreement',
            reason: `The reviewed ${frame.gender} noun “${frame.demonstrative.nounSurface}” takes “${frame.demonstrative.surface}” here.`,
            correctAl: phrase,
            reasoning: 'The demonstrative and linking article must both agree with the same noun phrase.',
          },
        },
        'choose-linked-article': {
          instruction: 'Now complete the remaining gap in the same noun phrase',
          prompt: `${frame.demonstrative.surface} ${frame.demonstrative.nounSurface} __ ${frame.adjective.adjective}`,
          promptLang: 'sq',
          options: articleOptions,
          answerValue: frame.adjective.article,
          miss: {
            reasonCode: 'wrong-linked-adjective-article',
            reason: `After “${frame.demonstrative.surface} ${frame.demonstrative.nounSurface}”, the reviewed ${frame.gender} phrase uses “${frame.adjective.article}” to link the adjective.`,
            correctAl: phrase,
            reasoning: 'Both gaps express agreement with the same noun; neither choice is an isolated vocabulary answer.',
          },
        },
      },
      lexicalSurfaces: [phrase],
      contextGate,
      distractorPolicy: 'linked binary ky/kjo and i/e contrasts after both component agreement aspects are proven',
    }
  }

  if (containsExcludedPhraseWord(frame.adjective.phrase, excludeWords)) return null
  const lexicalOptions = meaningOptions(answerId, candidateIds, 3, rng)
  if (!lexicalOptions) return null
  const articleOptions = [
    { value: 'i', label: 'i', lang: 'sq' },
    { value: 'e', label: 'e', lang: 'sq' },
  ]
  const articleJobOptions = shuffleWith([
    {
      value: frame.adjective.articleId,
      label: frame.gender === 'masculine'
        ? 'links this masculine noun to its adjective'
        : 'links this feminine noun to its adjective',
      lang: 'en',
    },
    {
      value: frame.gender === 'masculine' ? 'e_art' : 'i_art',
      label: frame.gender === 'masculine'
        ? 'links a feminine noun to its adjective'
        : 'links a masculine noun to its adjective',
      lang: 'en',
    },
  ], rng)
  return {
    ...base,
    kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
    grammarBundle: true,
    grammarVariantId: NOUN_GRAMMAR_ACTIVITY_VARIANTS.adjectiveArticleStaged.id,
    surface: frame.adjective.nounSurface,
    answerValue: frame.adjective.article,
    options: articleOptions,
    phaseQuestions: {
      'identify-agreement-noun': {
        instruction: 'What does the marked Albanian noun mean?',
        prompt: frame.adjective.phrase,
        promptLang: 'sq',
        markSurface: frame.adjective.nounSurface,
        options: lexicalOptions.map((id) => ({ value: id, label: senseText(id), lang: 'en' })),
        answerValue: answerId,
        miss: {
          reasonCode: 'wrong-agreement-noun-meaning',
          reason: `Identify “${frame.adjective.nounSurface}” as “${frame.nounMeaning}” before analysing its agreement.`,
          correctAl: frame.adjective.nounSurface,
          correctEn: frame.nounMeaning,
        },
      },
      'choose-linking-article': {
        instruction: 'Which linking article completes this Albanian noun phrase?',
        prompt: frame.adjective.gap,
        promptLang: 'sq',
        options: articleOptions,
        answerValue: frame.adjective.article,
        miss: {
          reasonCode: 'wrong-adjective-linking-article',
          reason: `The reviewed ${frame.gender} noun phrase uses “${frame.adjective.article}” before this adjective.`,
          correctAl: frame.adjective.phrase,
          reasoning: 'The linking article agrees with the noun phrase. Here it is i for masculine or e for feminine.',
        },
      },
      'identify-linking-article-job': {
        instruction: `What job does “${frame.adjective.article}” do in this phrase?`,
        prompt: frame.adjective.phrase,
        promptLang: 'sq',
        markSurface: frame.adjective.article,
        options: articleJobOptions,
        answerValue: frame.adjective.articleId,
        miss: {
          reasonCode: 'wrong-adjective-linking-article-job',
          reason: `Here “${frame.adjective.article}” links the ${frame.gender} noun “${frame.adjective.nounSurface}” to its adjective.`,
          correctAl: frame.adjective.phrase,
          reasoning: 'Albanian linking articles agree with the noun phrase; i is used here with this masculine noun, while e is used in the reviewed feminine frames.',
        },
      },
    },
    lexicalSurfaces: [frame.adjective.phrase],
    contextGate,
    distractorPolicy: 'meaning-first noun contrast, binary reviewed i/e form choice, then an incompatible gender-job contrast',
  }
}
