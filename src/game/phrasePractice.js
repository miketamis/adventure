// Phrase practice is deliberately data-driven: every exercise is generated
// from a complete, story-attested Albanian phrase in everydayAlbanian.js.
// Punctuation is presentation, not a draggable tile, while apostrophes inside
// words (s'ka) remain part of the word.

import { DICT } from './content.js'
import {
  PHRASE_PROGRESSION_POLICY,
  PHRASE_SKILL_MAX_TIER,
  PHRASE_STAGE_DEFINITIONS,
  phraseProgressionSnapshot,
  phraseProductionPlan,
  phraseSkillTier,
} from './phraseProgression.js'
import { phraseProductionFocuses } from './phraseFocus.js'
import { phraseNounOccurrences, phraseNounRole } from './phraseNounRoles.js'
import { TRAIN_EXERCISE_FAMILIES, TRAIN_QUESTION_MIX_POLICY } from './trainingProgression.js'

export { PHRASE_SKILL_MAX_TIER, phraseSkillTier } from './phraseProgression.js'

export const PHRASE_EXERCISE_MODES = Object.freeze([
  ...new Set(Object.values(PHRASE_STAGE_DEFINITIONS).flat().map((definition) => definition.mode)),
])

const MODE_SET = new Set(PHRASE_EXERCISE_MODES)
const SKILL_FIELD = Object.freeze({
  production: 'production',
  listening: 'listening',
  matching: 'matching',
})

export function phraseWords(value) {
  return String(value || '').match(/[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*/gu) || []
}

const normalizedWord = (value) => String(value || '')
  .normalize('NFC')
  .toLocaleLowerCase('sq')
  .replace(/’/g, "'")

// Consecutive phrase rounds use Albanian orthographic words as their scheduling
// boundary. Case, surrounding punctuation, decomposed Unicode and apostrophe
// style do not make a word "new"; Albanian letters such as ë and ç remain
// meaningful and are deliberately not folded to e/c.
export function phraseWordKeys(value) {
  return [...new Set(phraseWords(value).map(normalizedWord))]
}

export function phraseQuestionWordKeys(question) {
  if (question?.kind !== TRAIN_EXERCISE_FAMILIES.phrase.kind) return []
  const phrases = question.mode === 'match' ? question.phrases : [question.target]
  return [...new Set((phrases || []).flatMap((phrase) => phraseWordKeys(phrase?.al)))]
}

export function trainQuestionWordKeys(question) {
  const phraseKeys = phraseQuestionWordKeys(question)
  if (phraseKeys.length) return phraseKeys
  return phraseWordKeys(question?.lexicalSurfaces?.join(' ') || '')
}

// Export a tiny common predicate so phrase, vocabulary, context and endings
// builders apply the exact same Albanian comparison at their scheduling edge.
export function containsExcludedPhraseWord(value, excludeWords = []) {
  const excluded = excludedWordSet(excludeWords)
  return phraseWordKeys(value).some((word) => excluded.has(word))
}

function excludesPhraseWords(phrase, excludedWords) {
  return phraseWordKeys(phrase?.al).some((word) => excludedWords.has(word))
}

function excludedWordSet(values) {
  const surfaces = typeof values === 'string' ? [values] : [...(values || [])]
  return new Set(surfaces.flatMap((value) => phraseWordKeys(value)))
}

// Typing checks spelling and Albanian diacritics, but do not punish sentence
// capitalization, curly apostrophes, or punctuation entered on a phone.
export const normalizePhraseAnswer = (value) => phraseWords(value)
  .map(normalizedWord)
  .join(' ')

const beginnerWord = (value) => normalizedWord(value)
  .replace(/ë/g, 'e')
  .replace(/ç/g, 'c')
  .replace(/'/g, '')

const beginnerOrthographyKey = (value) => phraseWords(value)
  .map(beginnerWord)
  .join('')

function editDistance(left, right) {
  if (left === right) return 0
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index)
  for (let row = 1; row <= left.length; row++) {
    const current = [row]
    for (let column = 1; column <= right.length; column++) {
      current[column] = Math.min(
        current[column - 1] + 1,
        previous[column] + 1,
        previous[column - 1] + (left[row - 1] === right[column - 1] ? 0 : 1),
      )
    }
    previous = current
  }
  return previous[right.length]
}

const beginnerEditLimit = (word) => word.length >= 10 ? 3 : word.length >= 7 ? 2 : word.length >= 5 ? 1 : 0

function beginnerNearMatch(answer, target) {
  if (beginnerOrthographyKey(answer) === beginnerOrthographyKey(target)) return true
  const answerWords = phraseWords(answer).map(beginnerWord)
  const targetWords = phraseWords(target).map(beginnerWord)
  if (answerWords.length !== targetWords.length) return false
  let totalEdits = 0
  for (let index = 0; index < targetWords.length; index++) {
    const distance = editDistance(answerWords[index], targetWords[index])
    if (distance > beginnerEditLimit(targetWords[index])) return false
    totalEdits += distance
    // Bounded across the whole response: a learner may mistype one long word,
    // not drift every word toward a different sentence.
    if (totalEdits > 3) return false
  }
  return totalEdits > 0
}

const isReviewedNounAlternative = (id, answerSurface, expectedSurface) => {
  if (!id || !answerSurface || !expectedSurface || DICT[id]?.formTrack !== 'noun') return false
  // Missing ë/ç remains beginner orthography help even when the resulting
  // letters happen to spell another reviewed case form (punë/pune).
  if (beginnerWord(answerSurface) === beginnerWord(expectedSurface)) return false
  const expected = normalizedWord(expectedSurface)
  const answer = normalizedWord(answerSurface)
  return [DICT[id].al, ...(DICT[id].forms || [])].some((form) => {
    const surface = normalizedWord(typeof form === 'string' ? form : form.al)
    return surface === answer && surface !== expected
  })
}

export function hasReviewedNounFormSubstitution(answer, target, context = null) {
  const answerWords = phraseWords(answer)
  const targetWords = phraseWords(target)
  if (answerWords.length !== targetWords.length) return false
  const phrase = context?.phrase || context?.target
  if (!phrase) return false

  if (context?.typeScope === 'word') {
    return isReviewedNounAlternative(context.focusId, answerWords[0], targetWords[0])
  }

  return phraseNounOccurrences(phrase).some(({ id, index }) =>
    isReviewedNounAlternative(id, answerWords[index], targetWords[index]))
}

export function phraseAnswerResult(answer, target, tolerance = 'strict', context = null) {
  const canonical = normalizePhraseAnswer(answer) === normalizePhraseAnswer(target)
  if (canonical) return { correct: true, usedLeeway: false }
  const beginner = tolerance === 'beginner' &&
    !hasReviewedNounFormSubstitution(answer, target, context) &&
    beginnerNearMatch(answer, target)
  return { correct: beginner, usedLeeway: beginner }
}

export const phraseAnswerIsCorrect = (answer, target, tolerance = 'strict', context = null) =>
  phraseAnswerResult(answer, target, tolerance, context).correct

export function phraseAnswerDiagnostic(answer, target, phrase) {
  const answerWords = phraseWords(answer).map(normalizedWord)
  const targetWords = phraseWords(target).map(normalizedWord)
  if (
    answerWords.length === targetWords.length &&
    [...answerWords].sort().join('\u0000') === [...targetWords].sort().join('\u0000')
  ) return { kind: 'order' }
  const diagnosticWords = [...phraseProductionFocuses(phrase), ...phraseNounOccurrences(phrase)]
    .filter((entry, index, entries) => entries.findIndex((candidate) =>
      candidate.id === entry.id && candidate.index === entry.index) === index)
    .sort((left, right) => left.index - right.index)
  for (const focus of diagnosticWords) {
    if (answerWords[focus.index] !== normalizedWord(focus.word)) {
      return {
        kind: 'word',
        focusId: focus.id,
        expectedSurface: focus.word,
        expectedTag: focus.formTag || phraseNounRole(phrase.id, focus.id),
        answerSurface: answerWords[focus.index] || null,
      }
    }
  }
  return { kind: 'broad' }
}

export function buildPhraseProgressionSnapshot(
  phrase,
  progress,
  { currentRound = 0, listeningTier = 0, matchingTier = 0 } = {},
) {
  const focuses = phraseProductionFocuses(phrase)
  return {
    ...phraseProgressionSnapshot({
      phraseId: phrase?.id,
      progress,
      focusIds: focuses.map(({ id }) => id),
      currentRound,
      listeningTier,
      matchingTier,
    }),
    focuses,
  }
}

export function shuffleWith(values, rng = Math.random) {
  const result = [...values]
  for (let index = result.length - 1; index > 0; index--) {
    const swap = Math.floor(rng() * (index + 1))
    ;[result[index], result[swap]] = [result[swap], result[index]]
  }
  return result
}

export function phraseRewardIds(phrases) {
  return [...new Set(phrases.flatMap((phrase) => phrase?.requires || []))]
}

function weightedChoice(entries, weightOf, rng) {
  const weights = entries.map((entry) => Math.max(0, weightOf(entry)))
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  if (total <= 0) return entries.at(-1)
  let roll = rng() * total
  for (let index = 0; index < entries.length; index++) {
    roll -= weights[index]
    if (roll <= 0) return entries[index]
  }
  return entries.at(-1)
}

function pickTarget(unlocked, mana, practiced, mistakes, rng, targetId) {
  const forced = unlocked.find((entry) => entry.id === targetId)
  if (forced) return forced
  return weightedChoice(unlocked, (entry) => {
    const tokenNeed = phraseRewardIds([entry]).reduce((sum, id) => {
      const held = mana[id] || 0
      return sum + (held === 0 ? TRAIN_QUESTION_MIX_POLICY.zeroTokenWeight : 1 / (held + 1))
    }, 0)
    const targeting = TRAIN_QUESTION_MIX_POLICY.phraseTargeting
    const repair = 1 + Math.min(targeting.mistakeBoostCap, mistakes[entry.id] || 0) * targeting.mistakeBoostPerMiss
    const familiarity = 1 + Math.min(targeting.familiarityCap, practiced[entry.id] || 0) * targeting.familiarityPerPractice
    return tokenNeed * repair / familiarity
  }, rng)
}

function distractorWords(unlocked, distractorPool, target, targetWords, count, rng, excludedWords) {
  const blocked = new Set([...targetWords.map(normalizedWord), ...excludedWords])
  const candidates = []
  const seen = new Set()
  // Prefer words from other phrases the learner has unlocked, then fill from
  // the wider practical phrase curriculum. This keeps early word banks useful
  // even when the target is the learner's first complete phrase.
  const pools = [unlocked, distractorPool]
  for (const pool of pools) {
    for (const entry of shuffleWith(pool.filter((item) => item.id !== target.id), rng)) {
      for (const word of shuffleWith(phraseWords(entry.al), rng)) {
        const normalized = normalizedWord(word)
        if (blocked.has(normalized) || seen.has(normalized)) continue
        seen.add(normalized)
        candidates.push(word)
        if (candidates.length === count) return candidates
      }
    }
  }
  return candidates
}

function buildWordBank(unlocked, distractorPool, target, answerWords, rng, requestedDistractors, excludedWords) {
  const distractorCount = requestedDistractors ?? (answerWords.length <= 1 ? 3 : answerWords.length <= 3 ? 2 : 3)
  const distractors = distractorWords(
    unlocked,
    distractorPool,
    target,
    answerWords,
    distractorCount,
    rng,
    excludedWords,
  )
  const answerTiles = answerWords.map((text, index) => ({
    id: `answer:${index}`,
    text,
    answerIndex: index,
  }))
  const extraTiles = distractors.map((text, index) => ({
    id: `extra:${index}`,
    text,
    answerIndex: null,
  }))
  return shuffleWith([...answerTiles, ...extraTiles], rng)
}

const matchPairCount = (tier) => PHRASE_STAGE_DEFINITIONS.matching[tier]?.variant.pairs ??
  PHRASE_STAGE_DEFINITIONS.matching.at(-1).variant.pairs

function buildMatchQuestion(base, unlocked, rng, tier, mastery, forcedTier) {
  const pairCount = matchPairCount(tier)
  const companions = shuffleWith(
    unlocked.filter((entry) => entry.id !== base.target.id && (
      forcedTier || phraseSkillTier(mastery.matching?.[entry.id], 'matching') === tier
    )),
    rng,
  ).slice(0, pairCount - 1)
  const phrases = [base.target, ...companions]
  return {
    ...base,
    phraseIds: phrases.map((phrase) => phrase.id),
    phrases,
    left: shuffleWith(phrases.map((phrase) => ({
      id: phrase.id,
      text: phrase.al,
    })), rng),
    right: shuffleWith(phrases.map((phrase) => ({
      id: phrase.id,
      text: phrase.en,
    })), rng),
    // Every visible pair is real practice: matching advances and rewards the
    // whole board, never unpaid companion phrases.
    rewardIds: phraseRewardIds(phrases),
  }
}

function wordFocusFor(target, words, rng, plannedFocusId = null) {
  const focuses = phraseProductionFocuses(target)
    .map(({ id, index, word }) => ({
      focusId: id,
      index,
      word,
      formTag: phraseNounRole(target.id, id),
    }))
  if (plannedFocusId) {
    const planned = focuses.find((focus) => focus.focusId === plannedFocusId)
    if (planned) return planned
  }
  if (focuses.length) return focuses[Math.floor(rng() * focuses.length)]
  const fallbackFocusId = target.requires.find((id) => DICT[id])
  return { index: 0, word: words[0], focusId: fallbackFocusId }
}

function requestedSkill(requestedMode) {
  if (requestedMode === 'listen') return 'listening'
  if (requestedMode === 'match') return 'matching'
  return 'production'
}

function skillForQuestion(target, mastery, rng, requestedMode, productionPlan) {
  if (MODE_SET.has(requestedMode)) return requestedSkill(requestedMode)
  // Recognition never proves production. Listening and matching enter the mix
  // only after this exact phrase has passed its cloze and arrangement gates.
  if (productionPlan.remediation && productionPlan.due) return 'production'
  if (productionPlan.baseStage < PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage) return 'production'
  const roll = rng()
  if (roll < TRAIN_QUESTION_MIX_POLICY.phraseSkill.productionWhenDueUpperBound && productionPlan.due) return 'production'
  if (roll < TRAIN_QUESTION_MIX_POLICY.phraseSkill.listeningUpperBound) return 'listening'
  return 'matching'
}

function skillTier(target, mastery, skill, requestedTier) {
  if (requestedTier != null) return phraseSkillTier(requestedTier, skill)
  return phraseSkillTier(mastery[SKILL_FIELD[skill]]?.[target.id], skill)
}

let questionSequence = 0

export function buildPhraseQuestion(
  unlocked,
  mana = {},
  practiced = {},
  mistakes = {},
  {
    rng = Math.random,
    mode: requestedMode,
    targetId,
    distractorPool = unlocked,
    excludeWords = [],
    mastery = {},
    productionProgress = {},
    currentRound = 0,
    tier: requestedTier,
  } = {},
) {
  if (!Array.isArray(unlocked) || unlocked.length === 0) return null
  const excluded = excludedWordSet(excludeWords)
  let eligible = excluded.size
    ? unlocked.filter((entry) => !excludesPhraseWords(entry, excluded))
    : unlocked
  const forcedQuestion = Boolean(targetId || MODE_SET.has(requestedMode) || requestedTier != null)
  if (!forcedQuestion) {
    eligible = eligible.filter((entry) => {
      const focuses = phraseProductionFocuses(entry)
      const plan = phraseProductionPlan(
        productionProgress?.[entry.id],
        focuses.map(({ id }) => id),
        currentRound,
      )
      return plan?.due || plan?.baseStage >= PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage
    })
  }
  if (eligible.length === 0) return null
  let target = pickTarget(eligible, mana, practiced, mistakes, rng, targetId)
  let productionPlan = phraseProductionPlan(
    productionProgress?.[target.id],
    phraseProductionFocuses(target).map(({ id }) => id),
    currentRound,
  )
  let skill = skillForQuestion(target, mastery, rng, requestedMode, productionPlan)
  let tier = skill === 'production' && requestedTier == null
    ? productionPlan.stage
    : skillTier(target, mastery, skill, requestedTier)

  if (skill === 'matching') {
    const tierCounts = new Map()
    for (const entry of eligible) {
      const entryTier = phraseSkillTier(mastery.matching?.[entry.id], 'matching')
      tierCounts.set(entryTier, (tierCounts.get(entryTier) || 0) + 1)
    }
    const matchingTargets = requestedTier != null
      ? (eligible.length >= matchPairCount(tier) ? eligible : [])
      : eligible.filter((entry) => {
          const entryTier = phraseSkillTier(mastery.matching?.[entry.id], 'matching')
          return (tierCounts.get(entryTier) || 0) >= matchPairCount(entryTier)
        })
    if (!matchingTargets.some((entry) => entry.id === target.id)) {
      // A matching board must actually contain enough pairs for its tier. If
      // another compatible target exists, keep the requested family; otherwise
      // fall back to this phrase's production ladder instead of showing a
      // meaningless one-card "match" round.
      if (!targetId && matchingTargets.length) {
        target = pickTarget(matchingTargets, mana, practiced, mistakes, rng)
        productionPlan = phraseProductionPlan(
          productionProgress?.[target.id],
          phraseProductionFocuses(target).map(({ id }) => id),
          currentRound,
        )
        tier = skillTier(target, mastery, skill, requestedTier)
      } else if (productionPlan.due) {
        skill = 'production'
        tier = requestedTier == null ? productionPlan.stage : skillTier(target, mastery, skill)
      } else if (
        requestedMode == null &&
        productionPlan.baseStage >= PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage
      ) {
        skill = 'listening'
        tier = skillTier(target, mastery, skill, requestedTier)
      } else {
        return null
      }
    }
  }

  const answerWords = phraseWords(target.al)
  const productionStep = skill === 'production' ? PHRASE_STAGE_DEFINITIONS.production[tier] : null
  const mode = MODE_SET.has(requestedMode) && requestedSkill(requestedMode) === skill
    ? requestedMode
    : skill === 'production'
      ? productionStep.mode
      : skill === 'listening' ? 'listen' : 'match'
  const base = {
    kind: TRAIN_EXERCISE_FAMILIES.phrase.kind,
    questionKey: `${target.id}:${skill}:${tier}:${mode}:${questionSequence++}`,
    mode,
    skill,
    tier,
    difficultyLabel: productionStep?.label || PHRASE_STAGE_DEFINITIONS[skill][tier].label,
    target,
    phraseIds: [target.id],
    answerWords,
    rewardIds: phraseRewardIds([target]),
    typeScope: productionStep?.typeScope,
    remediation: skill === 'production' && productionPlan.remediation,
    remediationReason: skill === 'production' ? productionPlan.remediationReason : null,
  }

  if (mode === 'match') return buildMatchQuestion(
    base,
    eligible,
    rng,
    tier,
    mastery,
    requestedTier != null,
  )
  if (mode === 'type') {
    const step = productionStep || PHRASE_STAGE_DEFINITIONS.production[PHRASE_SKILL_MAX_TIER.production]
    if (step.typeScope === 'word') {
      const focus = wordFocusFor(target, answerWords, rng, productionPlan.focusId)
      return {
        ...base,
        typeScope: 'word',
        focusId: focus.focusId,
        expectedNounFormTag: focus.formTag || null,
        blankIndex: focus.index,
        // This is the bridge from choosing a missing word to producing the
        // complete phrase, so spell the exact contextual surface (shkon,
        // takohemi, lutem…), not an unrelated dictionary lemma.
        typingAnswer: focus.word,
        typingCue: target.en,
        answerTolerance: step.answerTolerance,
        rewardIds: [focus.focusId],
      }
    }
    return {
      ...base,
      typeScope: 'phrase',
      typingAnswer: target.al,
      typingCue: target.en,
      answerTolerance: step.answerTolerance,
    }
  }
  if (mode === 'cloze') {
    const focus = wordFocusFor(target, answerWords, rng, productionPlan.focusId)
    const blankIndex = focus.index
    const correctWord = answerWords[blankIndex]
    return {
      ...base,
      blankIndex,
      correctWord,
      focusId: focus.focusId,
      rewardIds: [focus.focusId],
      bank: buildWordBank(
        eligible,
        distractorPool,
        target,
        [correctWord],
        rng,
        productionStep.variant.distractors,
        excluded,
      ),
    }
  }
  const distractorCount = mode === 'listen'
    ? PHRASE_STAGE_DEFINITIONS.listening[tier].variant.distractors
    : productionStep?.variant?.distractors
  return {
    ...base,
    bank: buildWordBank(eligible, distractorPool, target, answerWords, rng, distractorCount, excluded),
  }
}
