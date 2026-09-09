// Phrase practice is deliberately data-driven: every exercise is generated
// from a complete, story-attested Albanian phrase in everydayAlbanian.js.
// Punctuation is presentation, not a draggable tile, while apostrophes inside
// words (s'ka) remain part of the word.

import { DICT } from './content.js'
import { PHRASE_SKILL_MAX_TIER, phraseSkillTier } from './phraseProgression.js'

export { PHRASE_SKILL_MAX_TIER, phraseSkillTier } from './phraseProgression.js'

export const PHRASE_EXERCISE_MODES = Object.freeze([
  'arrange',
  'listen',
  'cloze',
  'type',
  'match',
])

const MODE_SET = new Set(PHRASE_EXERCISE_MODES)
const SMALL_WORDS = new Set(['a', 'e', 'i', 'jo', 'me', 'në', 'po', 'se', 'të'])

const PRODUCTION_STEPS = Object.freeze([
  Object.freeze({ mode: 'cloze', label: 'foundation' }),
  Object.freeze({ mode: 'arrange', label: 'guided production' }),
  Object.freeze({ mode: 'type', label: 'word spelling', typeScope: 'word', answerTolerance: 'beginner' }),
  Object.freeze({ mode: 'type', label: 'independent production', typeScope: 'phrase', answerTolerance: 'beginner' }),
  Object.freeze({ mode: 'type', label: 'mastered production', typeScope: 'phrase', answerTolerance: 'strict' }),
])

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
  if (question?.kind !== 'everyday-phrase') return []
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

export function phraseAnswerResult(answer, target, tolerance = 'strict') {
  const canonical = normalizePhraseAnswer(answer) === normalizePhraseAnswer(target)
  if (canonical) return { correct: true, usedLeeway: false }
  const beginner = tolerance === 'beginner' && beginnerNearMatch(answer, target)
  return { correct: beginner, usedLeeway: beginner }
}

export const phraseAnswerIsCorrect = (answer, target, tolerance = 'strict') =>
  phraseAnswerResult(answer, target, tolerance).correct

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
      return sum + (held === 0 ? 8 : 1 / (held + 1))
    }, 0)
    const repair = 1 + Math.min(4, mistakes[entry.id] || 0) * 0.55
    const familiarity = 1 + Math.min(12, practiced[entry.id] || 0) * 0.18
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

const matchPairCount = (tier) => [2, 3, 4][tier] || 4

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

function senseForWord(target, words, index) {
  const surface = normalizedWord(words[index])
  const exact = target.requires.find((id) => {
    const entry = DICT[id]
    if (!entry) return false
    if (normalizedWord(entry.al) === surface) return true
    return entry.forms?.some((form) => normalizedWord(form.al) === surface)
  })
  if (exact) return exact
  return target.requires.length === words.length ? target.requires[index] : null
}

function wordFocusFor(target, words, rng) {
  const mapped = words
    .map((word, index) => ({ word, index, focusId: senseForWord(target, words, index) }))
    .filter(({ focusId }) => focusId && DICT[focusId])
  const useful = mapped.filter(({ word }) => word.length >= 4 && !SMALL_WORDS.has(normalizedWord(word)))
  const candidates = useful.length ? useful : mapped
  if (candidates.length) return candidates[Math.floor(rng() * candidates.length)]
  const focusId = target.requires.find((id) => DICT[id])
  return { index: 0, word: words[0], focusId }
}

function requestedSkill(requestedMode) {
  if (requestedMode === 'listen') return 'listening'
  if (requestedMode === 'match') return 'matching'
  return 'production'
}

function skillForQuestion(target, mastery, rng, requestedMode) {
  if (MODE_SET.has(requestedMode)) return requestedSkill(requestedMode)
  const productionTier = phraseSkillTier(mastery.production?.[target.id], 'production')
  // The first two encounters are invariant: one missing word, then the whole
  // phrase in word tiles. No recognition drill can interrupt that foundation.
  if (productionTier < 2) return 'production'
  const roll = rng()
  if (roll < 0.62) return 'production'
  if (roll < 0.84) return 'listening'
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
    tier: requestedTier,
  } = {},
) {
  if (!Array.isArray(unlocked) || unlocked.length === 0) return null
  const excluded = excludedWordSet(excludeWords)
  const eligible = excluded.size
    ? unlocked.filter((entry) => !excludesPhraseWords(entry, excluded))
    : unlocked
  if (eligible.length === 0) return null
  let target = pickTarget(eligible, mana, practiced, mistakes, rng, targetId)
  let skill = skillForQuestion(target, mastery, rng, requestedMode)
  let tier = skillTier(target, mastery, skill, requestedTier)

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
        tier = skillTier(target, mastery, skill, requestedTier)
      } else {
        skill = 'production'
        tier = skillTier(target, mastery, skill)
      }
    }
  }

  const answerWords = phraseWords(target.al)
  const productionStep = skill === 'production' ? PRODUCTION_STEPS[tier] : null
  const mode = MODE_SET.has(requestedMode) && requestedSkill(requestedMode) === skill
    ? requestedMode
    : skill === 'production'
      ? productionStep.mode
      : skill === 'listening' ? 'listen' : 'match'
  const base = {
    kind: 'everyday-phrase',
    questionKey: `${target.id}:${skill}:${tier}:${mode}:${questionSequence++}`,
    mode,
    skill,
    tier,
    difficultyLabel: productionStep?.label ||
      (skill === 'listening' ? ['guided listening', 'independent listening', 'mastered listening'][tier] :
        ['guided matching', 'independent matching', 'mastered matching'][tier]),
    target,
    phraseIds: [target.id],
    answerWords,
    rewardIds: phraseRewardIds([target]),
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
    const step = productionStep || PRODUCTION_STEPS[PHRASE_SKILL_MAX_TIER.production]
    if (step.typeScope === 'word') {
      const focus = wordFocusFor(target, answerWords, rng)
      return {
        ...base,
        typeScope: 'word',
        focusId: focus.focusId,
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
    const focus = wordFocusFor(target, answerWords, rng)
    const blankIndex = focus.index
    const correctWord = answerWords[blankIndex]
    return {
      ...base,
      blankIndex,
      correctWord,
      focusId: focus.focusId,
      rewardIds: [focus.focusId],
      bank: buildWordBank(eligible, distractorPool, target, [correctWord], rng, 3, excluded),
    }
  }
  const distractorCount = mode === 'listen' ? [2, 3, 5][tier] : 3
  return {
    ...base,
    bank: buildWordBank(eligible, distractorPool, target, answerWords, rng, distractorCount, excluded),
  }
}
