// Phrase practice is deliberately data-driven: every exercise is generated
// from a complete, story-attested Albanian phrase in everydayAlbanian.js.
// Punctuation is presentation, not a draggable tile, while apostrophes inside
// words (s'ka) remain part of the word.

export const PHRASE_EXERCISE_MODES = Object.freeze([
  'arrange',
  'listen',
  'cloze',
  'type',
  'match',
])

const MODE_SET = new Set(PHRASE_EXERCISE_MODES)
const SMALL_WORDS = new Set(['a', 'e', 'i', 'jo', 'me', 'në', 'po', 'se', 'të'])

export function phraseWords(value) {
  return String(value || '').match(/[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*/gu) || []
}

const normalizedWord = (value) => String(value || '')
  .normalize('NFC')
  .toLocaleLowerCase('sq')
  .replace(/’/g, "'")

// Typing checks spelling and Albanian diacritics, but do not punish sentence
// capitalization, curly apostrophes, or punctuation entered on a phone.
export const normalizePhraseAnswer = (value) => phraseWords(value)
  .map(normalizedWord)
  .join(' ')

export const phraseAnswerIsCorrect = (answer, target) =>
  normalizePhraseAnswer(answer) === normalizePhraseAnswer(target)

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

function distractorWords(unlocked, target, targetWords, count, rng) {
  const blocked = new Set(targetWords.map(normalizedWord))
  const candidates = []
  const seen = new Set()
  for (const entry of shuffleWith(unlocked.filter((item) => item.id !== target.id), rng)) {
    for (const word of shuffleWith(phraseWords(entry.al), rng)) {
      const normalized = normalizedWord(word)
      if (blocked.has(normalized) || seen.has(normalized)) continue
      seen.add(normalized)
      candidates.push(word)
      if (candidates.length === count) return candidates
    }
  }
  return candidates
}

function buildWordBank(unlocked, target, answerWords, rng, requestedDistractors) {
  const distractorCount = requestedDistractors ?? (answerWords.length <= 1 ? 3 : answerWords.length <= 3 ? 2 : 3)
  const distractors = distractorWords(unlocked, target, answerWords, distractorCount, rng)
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

function availableModes(unlocked, target, practicedCount) {
  const wordCount = phraseWords(target.al).length
  return [
    ...(wordCount >= 2 ? [{ id: 'arrange', weight: 5 }] : []),
    { id: 'listen', weight: wordCount >= 2 ? 3 : 2 },
    ...(wordCount >= 2 ? [{ id: 'cloze', weight: 3 }] : []),
    { id: 'type', weight: practicedCount >= 2 ? 3 : 0.6 },
    ...(unlocked.length >= 3 ? [{ id: 'match', weight: 2 }] : []),
  ]
}

function selectMode(unlocked, target, practicedCount, rng, requestedMode) {
  const modes = availableModes(unlocked, target, practicedCount)
  if (MODE_SET.has(requestedMode) && modes.some((entry) => entry.id === requestedMode)) {
    return requestedMode
  }
  return weightedChoice(modes, (entry) => entry.weight, rng).id
}

function buildMatchQuestion(base, unlocked, rng) {
  const companions = shuffleWith(
    unlocked.filter((entry) => entry.id !== base.target.id),
    rng,
  ).slice(0, 2)
  const phrases = [base.target, ...companions]
  return {
    ...base,
    phrases,
    left: shuffleWith(phrases.map((phrase) => ({
      id: phrase.id,
      text: phrase.al,
    })), rng),
    right: shuffleWith(phrases.map((phrase) => ({
      id: phrase.id,
      text: phrase.en,
    })), rng),
    rewardIds: phraseRewardIds(phrases),
  }
}

function clozeIndexFor(words, rng) {
  const useful = words
    .map((word, index) => ({ word, index }))
    .filter(({ word }) => word.length >= 4 && !SMALL_WORDS.has(normalizedWord(word)))
  const candidates = useful.length ? useful : words.map((word, index) => ({ word, index }))
  return candidates[Math.floor(rng() * candidates.length)].index
}

let questionSequence = 0

export function buildPhraseQuestion(
  unlocked,
  mana = {},
  practiced = {},
  mistakes = {},
  { rng = Math.random, mode: requestedMode, targetId } = {},
) {
  if (!Array.isArray(unlocked) || unlocked.length === 0) return null
  const target = pickTarget(unlocked, mana, practiced, mistakes, rng, targetId)
  const answerWords = phraseWords(target.al)
  const mode = selectMode(unlocked, target, practiced[target.id] || 0, rng, requestedMode)
  const base = {
    kind: 'everyday-phrase',
    questionKey: `${target.id}:${mode}:${questionSequence++}`,
    mode,
    target,
    phraseIds: [target.id],
    answerWords,
    rewardIds: phraseRewardIds([target]),
  }

  if (mode === 'match') return buildMatchQuestion(base, unlocked, rng)
  if (mode === 'type') return base
  if (mode === 'cloze') {
    const blankIndex = clozeIndexFor(answerWords, rng)
    const correctWord = answerWords[blankIndex]
    return {
      ...base,
      blankIndex,
      correctWord,
      bank: buildWordBank(unlocked, target, [correctWord], rng, 3),
    }
  }
  return {
    ...base,
    bank: buildWordBank(unlocked, target, answerWords, rng),
  }
}
