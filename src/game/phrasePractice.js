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
  phraseSkillPlan,
  phraseSkillTier,
} from './phraseProgression.js'
import { phraseProductionFocuses } from './phraseFocus.js'
import { isTrainableSense } from './lexicalTrainability.js'
import { phraseNounOccurrences, phraseNounRole } from './phraseNounRoles.js'
import { TRAIN_EXERCISE_FAMILIES, TRAIN_QUESTION_MIX_POLICY } from './trainingProgression.js'
import {
  pickBalancedTrainActivity,
  trainActivityBalancePlan,
  trainActivityTypeId,
  trainTargetBalancePlan,
  trainWordTargetKeys,
} from './trainActivityBalance.js'
import { latestTrainTargetEntry } from './trainActivityHistory.js'
import {
  phraseClozeContrastRank,
  phraseClozeDistractorPolicy,
  practiceContrastRole,
} from './practiceContrasts.js'
import {
  normalizedChoiceText,
  phraseMatchSetIsValid,
  sensesMayShareAnswer,
} from './practiceAnswerValidity.js'

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

const normalizeWordSurface = (value) => value
  .normalize('NFC')
  .toLocaleLowerCase('sq')
  .replace(/’/g, "'")

let authoredWordKeys = null
const normalizedWord = (value) => {
  // Precompute only public dictionary spellings. This helper also checks typed
  // answers, so never insert a caller's text into a long-lived cache.
  if (!authoredWordKeys) {
    authoredWordKeys = new Map()
    for (const entry of Object.values(DICT)) {
      for (const form of [entry.al, ...(entry.forms || [])]) {
        for (const word of phraseWords(typeof form === 'string' ? form : form?.al)) {
          if (!authoredWordKeys.has(word)) authoredWordKeys.set(word, normalizeWordSurface(word))
        }
      }
    }
  }
  const text = String(value || '')
  return authoredWordKeys.get(text) ?? normalizeWordSurface(text)
}

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
  const bankSurfaces = question.mode === 'match'
    ? []
    : (question.bank || []).map((tile) => tile.text)
  return [...new Set([
    ...(phrases || []).flatMap((phrase) => phraseWordKeys(phrase?.al)),
    ...bankSurfaces.flatMap(phraseWordKeys),
  ])]
}

export function trainQuestionWordKeys(question) {
  const phraseKeys = phraseQuestionWordKeys(question)
  if (phraseKeys.length) return phraseKeys
  const albanianChoiceSurfaces = question?.field === 'al'
    ? (question.options || []).map((id) => DICT[id]?.al).filter(Boolean)
    : []
  return phraseWordKeys([
    ...(question?.lexicalSurfaces || []),
    ...albanianChoiceSurfaces,
  ].join(' '))
}

// Export a tiny common predicate so phrase, vocabulary, context and endings
// builders apply the exact same Albanian comparison at their scheduling edge.
export function containsExcludedPhraseWord(value, excludeWords = []) {
  if (!excludeWords || excludeWords.length === 0 || excludeWords.size === 0) return false
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

const surfaceSharesBlockedWord = (value, blockedWords) =>
  phraseWordKeys(value).some((word) => blockedWords.has(word))

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

// Guided arrangement is practice, so one local transposition may pass with a
// blocking exact-order review. The identical word inventory keeps this from
// accepting omissions, additions, substitutions, or broad re-orderings.
export function guidedOrderNearMatch(answer, target) {
  const answerWords = phraseWords(answer).map(normalizedWord)
  const targetWords = phraseWords(target).map(normalizedWord)
  if (answerWords.length !== targetWords.length || answerWords.length < 2) return false
  const mismatches = targetWords
    .map((word, index) => answerWords[index] === word ? -1 : index)
    .filter((index) => index >= 0)
  if (mismatches.length !== 2 || mismatches[1] !== mismatches[0] + 1) return false
  const [left, right] = mismatches
  return answerWords[left] === targetWords[right] && answerWords[right] === targetWords[left]
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
  const guidedOrder = tolerance === 'guided-order' && guidedOrderNearMatch(answer, target)
  if (guidedOrder) return { correct: true, usedLeeway: true }
  const beginner = tolerance === 'beginner' &&
    !hasReviewedNounFormSubstitution(answer, target, context) &&
    beginnerNearMatch(answer, target)
  return { correct: beginner, usedLeeway: beginner }
}

export const phraseAnswerIsCorrect = (answer, target, tolerance = 'strict', context = null) =>
  phraseAnswerResult(answer, target, tolerance, context).correct

export function phraseQuestionExactAnswer(question) {
  if (!question || typeof question !== 'object') return null
  const value = question.mode === 'cloze'
    ? question.correctWord
    : question.mode === 'type'
      ? question.typingAnswer
      : question.mode === 'match'
        ? null
        : question.target?.al
  return typeof value === 'string' && value.trim() ? value.trim() : null
}

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
  {
    currentRound = 0,
    listeningTier = 0,
    matchingTier = 0,
    listeningProgress,
    matchingProgress,
    nowMs = 0,
  } = {},
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
      listeningProgress,
      matchingProgress,
      nowMs,
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
  return [...new Set(phrases.flatMap((phrase) => phrase?.requires || []).filter(isTrainableSense))]
}

function weightedChoice(entries, weightOf, rng, trace = null) {
  const breakdowns = entries.map((entry) => {
    const result = weightOf(entry)
    return typeof result === 'number'
      ? { id: entry.id, weight: Math.max(0, result) }
      : { id: entry.id, ...result, weight: Math.max(0, result.weight) }
  })
  const weights = breakdowns.map(({ weight }) => weight)
  const total = weights.reduce((sum, weight) => sum + weight, 0)
  if (total <= 0) {
    if (trace) Object.assign(trace, {
      formula: 'word-token need × mistake repair boost ÷ familiarity',
      totalWeight: total,
      candidates: breakdowns,
      selectedId: entries.at(-1)?.id || null,
      fallback: 'all weights were zero',
    })
    return entries.at(-1)
  }
  const random = rng()
  let roll = random * total
  const initialRoll = roll
  for (let index = 0; index < entries.length; index++) {
    roll -= weights[index]
    if (roll <= 0) {
      if (trace) Object.assign(trace, {
        formula: 'word-token need × mistake repair boost ÷ familiarity',
        random,
        totalWeight: total,
        roll: initialRoll,
        candidates: breakdowns,
        selectedId: entries[index].id,
      })
      return entries[index]
    }
  }
  if (trace) Object.assign(trace, {
    formula: 'word-token need × mistake repair boost ÷ familiarity',
    random,
    totalWeight: total,
    roll: initialRoll,
    candidates: breakdowns,
    selectedId: entries.at(-1)?.id || null,
  })
  return entries.at(-1)
}

function pickTarget(unlocked, mana, practiced, mistakes, rng, targetId, trace = null) {
  const forced = unlocked.find((entry) => entry.id === targetId)
  if (forced) {
    if (trace) Object.assign(trace, {
      forced: true,
      forcedTargetId: targetId,
      candidates: unlocked.map(({ id }) => ({ id })),
      selectedId: forced.id,
    })
    return forced
  }
  return weightedChoice(unlocked, (entry) => {
    const rewardIds = phraseRewardIds([entry])
    const tokenNeed = rewardIds.reduce((sum, id) => {
      const held = mana[id] || 0
      return sum + (held === 0 ? TRAIN_QUESTION_MIX_POLICY.zeroTokenWeight : 1 / (held + 1))
    }, 0)
    const targeting = TRAIN_QUESTION_MIX_POLICY.phraseTargeting
    const mistakeCount = mistakes[entry.id] || 0
    const practiceCount = practiced[entry.id] || 0
    const repair = 1 + Math.min(targeting.mistakeBoostCap, mistakeCount) * targeting.mistakeBoostPerMiss
    const familiarity = 1 + Math.min(targeting.familiarityCap, practiceCount) * targeting.familiarityPerPractice
    return {
      rewardIds,
      tokenNeed,
      mistakeCount,
      repair,
      practiceCount,
      familiarity,
      weight: tokenNeed * repair / familiarity,
    }
  }, rng, trace)
}

function distractorWords(unlocked, distractorPool, target, targetWords, count, rng, excludedWords) {
  const blocked = new Set([...targetWords.map(normalizedWord), ...excludedWords])
  const targetFocuses = phraseProductionFocuses(target).map((focus) => ({
    ...focus,
    focusId: focus.id,
    formTag: phraseNounRole(target.id, focus.id),
  }))
  const candidates = []
  const seen = new Set()
  const addCandidate = (candidate) => {
    const word = normalizedWord(candidate.word)
    if (!word || surfaceSharesBlockedWord(candidate.word, blocked) || seen.has(word)) return
    const rankedTargets = targetFocuses
      .filter((focus) => !sensesMayShareAnswer(focus.focusId, candidate.focusId))
      .map((focus) => ({
        focus,
        rank: phraseClozeContrastRank(focus, candidate),
        distractorPolicy: phraseClozeDistractorPolicy(focus, candidate),
      }))
      .filter(({ rank }) => Number.isFinite(rank))
      .sort((left, right) => left.rank - right.rank)
    if (!rankedTargets.length) return
    const best = rankedTargets[0]
    seen.add(word)
    candidates.push({
      ...candidate,
      word: candidate.word,
      rank: best.rank,
      targetFocusId: best.focus.focusId,
      targetFormTag: best.focus.formTag || null,
      distractorPolicy: best.distractorPolicy,
    })
  }

  // Prefer attested surfaces from other complete phrases. Each extra tile must
  // be a reviewed role-compatible alternative to at least one content-bearing
  // target word; a random familiar word is not automatically a useful foil.
  const pools = [unlocked, distractorPool]
  for (const pool of pools) {
    for (const entry of shuffleWith(pool.filter((item) => item.id !== target.id), rng)) {
      for (const focus of shuffleWith(phraseProductionFocuses(entry), rng)) {
        addCandidate({
          focusId: focus.id,
          formTag: phraseNounRole(entry.id, focus.id),
          word: focus.word,
          source: 'attested-phrase-surface',
        })
      }
    }
  }

  // A learner's first unlocked phrase still needs a full bank. Fill only from
  // reviewed dictionary forms that match one of the target roles; noun fillers
  // must carry the same exact reviewed case/number tag as their target slot.
  for (const [focusId, entry] of Object.entries(DICT)) {
    for (const targetFocus of targetFocuses) {
      const surfaces = targetFocus.formTag
        ? (entry.forms || []).filter((form) => form.tag === targetFocus.formTag)
        : [{ al: entry.al, tag: null }]
      for (const surface of surfaces) {
        addCandidate({
          focusId,
          formTag: surface.tag || null,
          word: surface.al,
          source: 'reviewed-dictionary-surface',
        })
      }
    }
  }

  // A large listening/arrangement bank can exhaust close role peers. Extra
  // tiles do not occupy a displayed blank, so a different-meaning learned word
  // remains a fair foil. Keep the semantic incompatibility check, provenance
  // and target alignment explicit instead of relaxing cloze validation.
  if (candidates.length < count) {
    for (const phrase of distractorPool) {
      if (phrase.id === target.id) continue
      for (const candidate of phraseProductionFocuses(phrase)) {
        const word = normalizedWord(candidate.word)
        if (!word || surfaceSharesBlockedWord(candidate.word, blocked) || seen.has(word)) continue
        const targetFocus = targetFocuses.find((focus) =>
          !sensesMayShareAnswer(focus.focusId, candidate.id))
        if (!targetFocus) continue
        seen.add(word)
        candidates.push({
          ...candidate,
          focusId: candidate.id,
          formTag: phraseNounRole(phrase.id, candidate.id),
          word: candidate.word,
          source: 'attested-phrase-surface',
          rank: 5,
          targetFocusId: targetFocus.focusId,
          targetFormTag: targetFocus.formTag || null,
          distractorPolicy: 'different-meaning-extra-tile',
        })
        if (candidates.length >= count) break
      }
      if (candidates.length >= count) break
    }
  }

  return shuffleWith(candidates, rng)
    .sort((left, right) => left.rank - right.rank)
    .slice(0, count)
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
  if (distractors.length !== distractorCount) return null
  const answerTiles = answerWords.map((text, index) => ({
    id: `answer:${index}`,
    text,
    answerIndex: index,
  }))
  const extraTiles = distractors.map((candidate, index) => ({
    id: `extra:${index}`,
    text: candidate.word,
    answerIndex: null,
    senseId: candidate.focusId,
    formTag: candidate.formTag || null,
    targetFocusId: candidate.targetFocusId,
    targetFormTag: candidate.targetFormTag,
    distractorPolicy: candidate.distractorPolicy,
    distractorSource: candidate.source,
  }))
  return shuffleWith([...answerTiles, ...extraTiles], rng)
}

const matchPairCount = (tier) => PHRASE_STAGE_DEFINITIONS.matching[tier]?.variant.pairs ??
  PHRASE_STAGE_DEFINITIONS.matching.at(-1).variant.pairs

function buildMatchQuestion(base, unlocked, rng, tier, mastery, forcedTier, targetHistory = []) {
  const pairCount = matchPairCount(tier)
  const candidates = shuffleWith(
    unlocked.filter((entry) => entry.id !== base.target.id && (
      forcedTier || phraseSkillTier(mastery.matching?.[entry.id], 'matching') === tier
    )),
    rng,
  ).sort((left, right) => {
    const count = (phrase) => targetHistory.filter((entry) =>
      entry.includes(`phrase:${phrase.id}`)).length
    return count(left) - count(right)
  })
  const companions = []
  const usedAlbanian = new Set([normalizedChoiceText(base.target.al, 'sq')])
  const usedEnglish = new Set([normalizedChoiceText(base.target.en, 'en')])
  for (const candidate of candidates) {
    const albanian = normalizedChoiceText(candidate.al, 'sq')
    const english = normalizedChoiceText(candidate.en, 'en')
    if (!albanian || !english || usedAlbanian.has(albanian) || usedEnglish.has(english)) continue
    companions.push(candidate)
    usedAlbanian.add(albanian)
    usedEnglish.add(english)
    if (companions.length === pairCount - 1) break
  }
  const phrases = [base.target, ...companions]
  if (!phraseMatchSetIsValid(phrases, pairCount)) return null
  return {
    ...base,
    phraseIds: phrases.map((phrase) => phrase.id),
    targetKeys: phrases.map((phrase) => `phrase:${phrase.id}`),
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

function buildClozeBank(unlocked, distractorPool, target, focus, count, rng, excludedWords) {
  const blocked = new Set([normalizedWord(focus.word), ...excludedWords])
  const candidates = []
  const seen = new Set()
  const pools = [unlocked, distractorPool]
  for (const pool of pools) {
    for (const phrase of pool) {
      if (phrase.id === target.id) continue
      for (const candidate of phraseProductionFocuses(phrase)) {
        const word = normalizedWord(candidate.word)
        if (surfaceSharesBlockedWord(candidate.word, blocked) || seen.has(word)) continue
        const formTag = phraseNounRole(phrase.id, candidate.id)
        if (sensesMayShareAnswer(focus.focusId, candidate.id)) continue
        const rank = phraseClozeContrastRank(focus, {
          focusId: candidate.id,
          formTag,
        })
        if (!Number.isFinite(rank)) continue
        seen.add(word)
        candidates.push({
          ...candidate,
          focusId: candidate.id,
          formTag,
          rank,
          distractorPolicy: phraseClozeDistractorPolicy(focus, { focusId: candidate.id, formTag }),
        })
      }
    }
  }
  // A one-phrase unlock still needs peers. A noun gap draws the exact reviewed
  // case/number form from other noun paradigms; using their lemmas would create
  // distractors that cannot grammatically occupy the blank.
  for (const [focusId, entry] of Object.entries(DICT)) {
    const surfaces = focus.formTag
      ? (entry.forms || []).filter((form) => form.tag === focus.formTag)
      : [{ al: entry.al, tag: null }]
    for (const surface of surfaces) {
      const word = normalizedWord(surface.al)
      if (surfaceSharesBlockedWord(surface.al, blocked) || seen.has(word)) continue
      const candidate = { focusId, formTag: surface.tag || null }
      if (sensesMayShareAnswer(focus.focusId, focusId)) continue
      const rank = phraseClozeContrastRank(focus, candidate)
      if (!Number.isFinite(rank)) continue
      seen.add(word)
      candidates.push({
        ...candidate,
        word: surface.al,
        rank,
        distractorPolicy: phraseClozeDistractorPolicy(focus, candidate),
      })
    }
  }
  const distractors = shuffleWith(candidates, rng)
    .sort((left, right) => left.rank - right.rank)
    .slice(0, count)
    .map((candidate, index) => ({
      id: `extra:${index}`,
      text: candidate.word,
      answerIndex: null,
      senseId: candidate.focusId,
      formTag: candidate.formTag,
      contrastRole: practiceContrastRole(candidate.focusId),
      distractorPolicy: candidate.distractorPolicy,
    }))
  if (distractors.length !== count) return null
  return shuffleWith([{
    id: `answer:${focus.index}`,
    text: focus.word,
    answerIndex: focus.index,
    senseId: focus.focusId,
    formTag: focus.formTag || null,
    contrastRole: practiceContrastRole(focus.focusId),
  }, ...distractors], rng)
}

function requestedSkill(requestedMode) {
  if (requestedMode === 'listen') return 'listening'
  if (requestedMode === 'match') return 'matching'
  return 'production'
}

function skillForQuestion(
  target,
  mastery,
  rng,
  requestedMode,
  productionPlan,
  skillPlans,
  activityHistory = [],
  trace = null,
) {
  if (MODE_SET.has(requestedMode)) {
    const selected = requestedSkill(requestedMode)
    if (trace) Object.assign(trace, { selected, reason: `mode ${requestedMode} was explicitly requested` })
    return selected
  }
  // Recognition never proves production. Listening and matching enter the mix
  // only after this exact phrase has passed its cloze and arrangement gates.
  if (productionPlan.remediation && productionPlan.due) {
    const activity = {
      kind: TRAIN_EXERCISE_FAMILIES.phrase.kind,
      skill: 'production',
      mode: PHRASE_STAGE_DEFINITIONS.production[productionPlan.stage].mode,
      typeScope: PHRASE_STAGE_DEFINITIONS.production[productionPlan.stage].typeScope,
    }
    const balanced = pickBalancedTrainActivity([activity], activityHistory, rng)
    if (trace) Object.assign(trace, {
      selected: balanced.candidate?.skill || null,
      reason: balanced.candidate
        ? balanced.plan.usesRepeatFallback
          ? 'due phrase-specific remediation is the only buildable format and has a disjoint target'
          : 'due phrase-specific remediation is legal and does not repeat the previous activity type'
        : 'due phrase-specific remediation has no disjoint target',
      activityBalance: balanced.plan,
      randomBoundary: balanced.randomBoundary,
    })
    return balanced.candidate?.skill || null
  }
  const crossSkillsUnlocked = productionPlan.baseStage >=
    PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage
  const dueSkills = [
    ...(productionPlan.due ? ['production'] : []),
    ...(crossSkillsUnlocked && skillPlans.listening.due ? ['listening'] : []),
    ...(crossSkillsUnlocked && skillPlans.matching.due ? ['matching'] : []),
  ]
  const activities = dueSkills.map((skill) => {
    const tier = skill === 'production'
      ? productionPlan.stage
      : skillTier(target, mastery, skill)
    const definition = PHRASE_STAGE_DEFINITIONS[skill][tier]
    return {
      kind: TRAIN_EXERCISE_FAMILIES.phrase.kind,
      skill,
      mode: definition.mode,
      typeScope: definition.typeScope,
    }
  })
  const balanced = pickBalancedTrainActivity(activities, activityHistory, rng)
  const selected = balanced.candidate?.skill || null
  const reason = selected
    ? balanced.plan.usesRepeatFallback
      ? 'selected the only due phrase activity type with a disjoint target'
      : 'selected the least-represented due phrase activity type without repeating the previous type'
    : 'this phrase has no due buildable track'
  if (trace) Object.assign(trace, {
    selected,
    reason,
    activityBalance: balanced.plan,
    randomBoundary: balanced.randomBoundary,
  })
  return selected
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
    listeningProgress = {},
    matchingProgress = {},
    currentRound = 0,
    nowMs = 0,
    tier: requestedTier,
    respectDueWhenForced = false,
    activityHistory = [],
    targetHistory = [],
    debugTrace = false,
  } = {},
) {
  if (!Array.isArray(unlocked) || unlocked.length === 0) return null
  const excluded = excludedWordSet(excludeWords)
  const trace = debugTrace ? {
    builder: 'phrase',
    request: {
      unlockedPhraseIds: unlocked.map(({ id }) => id),
      requestedMode: requestedMode || null,
      requestedTier: requestedTier ?? null,
      targetId: targetId || null,
      respectDueWhenForced,
      currentRound,
      nowMs,
      excludedWordKeys: [...excluded],
      activityHistory,
      targetHistory,
    },
    candidates: [],
    targetSelection: {},
    skillSelection: {},
  } : null
  let eligible = excluded.size
    ? unlocked.filter((entry) => !excludesPhraseWords(entry, excluded))
    : unlocked
  // Explicit production/listening proposals can only select this target.
  // Matching still needs its complete eligible partner pool, and full debug
  // builds retain every rejection record for the inspector.
  if (debugTrace === 'summary' && targetId && MODE_SET.has(requestedMode) && requestedMode !== 'match') {
    eligible = eligible.filter((entry) => entry.id === targetId)
  }
  if (trace) {
    for (const entry of unlocked) {
      if (!eligible.includes(entry)) trace.candidates.push({
        id: entry.id,
        status: 'rejected',
        reasons: ['shares an Albanian word with the preceding Train activity'],
      })
    }
  }
  const forcedQuestion = Boolean(targetId || MODE_SET.has(requestedMode) || requestedTier != null)
  if (!forcedQuestion || respectDueWhenForced) {
    const previousPhraseTargets = new Set(latestTrainTargetEntry(targetHistory, 'phrase:'))
    eligible = eligible.filter((entry) => {
      const repeated = previousPhraseTargets.has(`phrase:${entry.id}`)
      if (repeated && trace) trace.candidates.push({
        id: entry.id,
        status: 'rejected',
        reasons: ['appeared in the previous phrase activity, even if word activities intervened'],
      })
      return !repeated
    })
    eligible = eligible.filter((entry) => {
      const focuses = phraseProductionFocuses(entry)
      const plan = phraseProductionPlan(
        productionProgress?.[entry.id],
        focuses.map(({ id }) => id),
        currentRound,
        nowMs,
      )
      const listeningPlan = phraseSkillPlan(
        listeningProgress?.[entry.id] ?? { tier: mastery.listening?.[entry.id] || 0 },
        'listening', currentRound, nowMs,
      )
      const matchingPlan = phraseSkillPlan(
        matchingProgress?.[entry.id] ?? { tier: mastery.matching?.[entry.id] || 0 },
        'matching', currentRound, nowMs,
      )
      const crossSkillsUnlocked = plan?.baseStage >= PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage
      const forcedSkill = MODE_SET.has(requestedMode) ? requestedSkill(requestedMode) : null
      const eligibleNow = forcedSkill === 'production'
        ? Boolean(plan?.due)
        : forcedSkill === 'listening'
          ? Boolean(crossSkillsUnlocked && listeningPlan.due)
          : forcedSkill === 'matching'
            ? Boolean(crossSkillsUnlocked && matchingPlan.due)
            : Boolean(plan?.due || (crossSkillsUnlocked && (listeningPlan.due || matchingPlan.due)))
      if (trace) trace.candidates.push({
        id: entry.id,
        status: eligibleNow ? 'eligible' : 'rejected',
        reasons: eligibleNow
          ? [`unlocked, disjoint from the last activity, and ${forcedSkill || 'at least one'} phrase track is due`]
          : [plan?.baseStage < PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage
              ? 'production is not due and cross-skill tracks are not unlocked'
              : 'production, listening, and matching are not due'],
        productionPlan: plan,
        listeningPlan,
        matchingPlan,
      })
      return eligibleNow
    })
  } else if (trace) {
    for (const entry of eligible) trace.candidates.push({
      id: entry.id,
      status: 'eligible',
      reasons: ['explicit target/mode/tier request bypassed ordinary due filtering'],
    })
  }
  if (eligible.length === 0) return null
  let target = null
  let productionPlan = null
  let skillPlans = null
  let skill = null
  const plansForTarget = (entry) => {
    const entryProductionPlan = phraseProductionPlan(
      productionProgress?.[entry.id],
      phraseProductionFocuses(entry).map(({ id }) => id),
      currentRound,
      nowMs,
    )
    const entrySkillPlans = {
      listening: phraseSkillPlan(
        listeningProgress?.[entry.id] ?? { tier: mastery.listening?.[entry.id] || 0 },
        'listening', currentRound, nowMs,
      ),
      matching: phraseSkillPlan(
        matchingProgress?.[entry.id] ?? { tier: mastery.matching?.[entry.id] || 0 },
        'matching', currentRound, nowMs,
      ),
    }
    const skillTrace = trace ? {} : null
    const entrySkill = skillForQuestion(
      entry,
      mastery,
      rng,
      requestedMode,
      entryProductionPlan,
      entrySkillPlans,
      activityHistory,
      skillTrace,
    )
    if (!entrySkill) return null
    const entryTier = entrySkill === 'production' && requestedTier == null
      ? entryProductionPlan.stage
      : skillTier(entry, mastery, entrySkill, requestedTier)
    const definition = PHRASE_STAGE_DEFINITIONS[entrySkill][entryTier]
    const focusedWord = entrySkill === 'production' && (
      definition.mode === 'cloze' || (definition.mode === 'type' && definition.typeScope === 'word')
    ) ? entryProductionPlan.focusId : null
    return {
      target: entry,
      productionPlan: entryProductionPlan,
      skillPlans: entrySkillPlans,
      skill: entrySkill,
      tier: entryTier,
      activityTypeId: trainActivityTypeId({
        kind: TRAIN_EXERCISE_FAMILIES.phrase.kind,
        mode: definition.mode,
        typeScope: definition.typeScope,
      }),
      targetKeys: [
        `phrase:${entry.id}`,
        ...(focusedWord ? trainWordTargetKeys(focusedWord, DICT[focusedWord]?.al) : []),
      ],
      skillTrace,
    }
  }
  const targetPlans = eligible.map(plansForTarget).filter(Boolean)
  const activityBalance = forcedQuestion
    ? { balanced: targetPlans.map((candidate) => ({ candidate })) }
    : trainActivityBalancePlan(targetPlans, activityHistory)
  if (!activityBalance.balanced.length) return null
  const activityBalancedTargets = activityBalance.balanced.map(({ candidate }) => candidate)
  const targetBalance = forcedQuestion
    ? { balanced: activityBalancedTargets.map((candidate) => ({ candidate })), outcome: 'forced-target' }
    : trainTargetBalancePlan(activityBalancedTargets, targetHistory, {
        excludePreviousPhrase: true,
        remediationOf: (candidate) => candidate.productionPlan?.remediation === true,
      })
  if (!targetBalance.balanced.length) return null
  const balancedTargetIds = new Set(targetBalance.balanced.map(({ candidate }) => candidate.target.id))
  target = pickTarget(
    eligible.filter(({ id }) => balancedTargetIds.has(id)),
    mana,
    practiced,
    mistakes,
    rng,
    targetId,
    trace?.targetSelection,
  )
  const selectedTargetPlan = activityBalance.balanced
    .map(({ candidate }) => candidate)
    .find((candidate) => candidate.target.id === target.id)
  if (selectedTargetPlan) {
    productionPlan = selectedTargetPlan.productionPlan
    skillPlans = selectedTargetPlan.skillPlans
    skill = selectedTargetPlan.skill
    trace && (trace.skillSelection = selectedTargetPlan.skillTrace)
  }
  if (!target || !productionPlan || !skillPlans || !skill) return null
  if (trace) Object.assign(trace, { selectedTargetId: target.id, productionPlan, skillPlans, activityBalance, targetBalance })
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
        trace && (trace.matchingAdjustment = { reason: 'initial target cannot populate the required same-tier matching board', compatibleTargetIds: matchingTargets.map(({ id }) => id) })
        const matchingBalance = trainTargetBalancePlan(
          matchingTargets.map((entry) => ({ entry, targetKeys: [`phrase:${entry.id}`] })),
          targetHistory,
          { excludePreviousPhrase: true },
        )
        if (!matchingBalance.balanced.length) return null
        target = pickTarget(
          matchingBalance.balanced.map(({ candidate }) => candidate.entry),
          mana,
          practiced,
          mistakes,
          rng,
          null,
          trace?.targetSelection,
        )
        productionPlan = phraseProductionPlan(
          productionProgress?.[target.id],
          phraseProductionFocuses(target).map(({ id }) => id),
          currentRound,
          nowMs,
        )
        tier = skillTier(target, mastery, skill, requestedTier)
      } else if (productionPlan.due) {
        trace && (trace.matchingAdjustment = { reason: 'matching board is undersized; fall back to due production' })
        skill = 'production'
        tier = requestedTier == null ? productionPlan.stage : skillTier(target, mastery, skill)
      } else if (
        requestedMode == null &&
        productionPlan.baseStage >= PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage &&
        skillPlans.listening.due
      ) {
        trace && (trace.matchingAdjustment = { reason: 'matching board is undersized; fall back to due listening' })
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
    questionKey: `${target.id}:${currentRound}:${skill}:${tier}:${mode}:${questionSequence++}`,
    mode,
    skill,
    tier,
    difficultyLabel: productionStep?.label || PHRASE_STAGE_DEFINITIONS[skill][tier].label,
    target,
    phraseIds: [target.id],
    targetKeys: [`phrase:${target.id}`],
    answerWords,
    activityTypeId: trainActivityTypeId({
      kind: TRAIN_EXERCISE_FAMILIES.phrase.kind,
      mode,
      typeScope: productionStep?.typeScope,
    }),
    rewardIds: phraseRewardIds([target]),
    typeScope: productionStep?.typeScope,
    answerTolerance: productionStep?.answerTolerance,
    remediation: skill === 'production' && productionPlan.remediation,
    remediationReason: skill === 'production' ? productionPlan.remediationReason : null,
    ...(trace ? { debugSelection: {
      ...trace,
      selected: {
        phraseId: target.id,
        skill,
        tier,
        mode,
        definition: productionStep || PHRASE_STAGE_DEFINITIONS[skill][tier],
        reason: 'the recorded target, track, tier, and registry definition produced this activity',
      },
    } } : {}),
  }

  if (mode === 'match') return buildMatchQuestion(
    base,
    eligible,
    rng,
    tier,
    mastery,
    requestedTier != null,
    targetHistory,
  )
  if (mode === 'type') {
    const step = productionStep || PHRASE_STAGE_DEFINITIONS.production[PHRASE_SKILL_MAX_TIER.production]
    if (step.typeScope === 'word') {
      const focus = wordFocusFor(target, answerWords, rng, productionPlan.focusId)
      return {
        ...base,
        targetKeys: [`phrase:${target.id}`, ...trainWordTargetKeys(focus.focusId, DICT[focus.focusId]?.al)],
        typeScope: 'word',
        focusId: focus.focusId,
        expectedNounFormTag: focus.formTag || null,
        blankIndex: focus.index,
        // This is the bridge from choosing a missing word to producing the
        // complete phrase, so spell the exact contextual surface (shkon,
        // takohemi, lutem…), not an unrelated dictionary lemma.
        typingAnswer: focus.word,
        exactAnswerAl: focus.word,
        typingCue: target.en,
        answerTolerance: step.answerTolerance,
        rewardIds: [focus.focusId],
      }
    }
    return {
      ...base,
      typeScope: 'phrase',
      typingAnswer: target.al,
      exactAnswerAl: target.al,
      typingCue: target.en,
      answerTolerance: step.answerTolerance,
    }
  }
  if (mode === 'cloze') {
    const focus = wordFocusFor(target, answerWords, rng, productionPlan.focusId)
    const blankIndex = focus.index
    const correctWord = answerWords[blankIndex]
    const bank = buildClozeBank(
      eligible,
      distractorPool,
      target,
      { ...focus, word: correctWord },
      productionStep.variant.distractors,
      rng,
      excluded,
    )
    if (!bank) return null
    return {
      ...base,
      targetKeys: [`phrase:${target.id}`, ...trainWordTargetKeys(focus.focusId, DICT[focus.focusId]?.al)],
      blankIndex,
      correctWord,
      exactAnswerAl: correctWord,
      focusId: focus.focusId,
      meaningCue: target.focusCues?.[focus.focusId] || target.en,
      contrastRole: practiceContrastRole(focus.focusId),
      distractorPolicy: 'reviewed-role-or-slot-peer',
      rewardIds: [focus.focusId],
      bank,
    }
  }
  const distractorCount = mode === 'listen'
    ? PHRASE_STAGE_DEFINITIONS.listening[tier].variant.distractors
    : productionStep?.variant?.distractors
  const bank = buildWordBank(eligible, distractorPool, target, answerWords, rng, distractorCount, excluded)
  if (!bank) return null
  return {
    ...base,
    bank,
    exactAnswerAl: target.al,
  }
}
