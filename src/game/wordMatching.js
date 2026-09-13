import { DICT } from './content.js'
import { isTrainableSense } from './lexicalTrainability.js'
import { normalizedChoiceText, sensesMayShareAnswer } from './practiceAnswerValidity.js'
import { wordContrastRank } from './practiceContrasts.js'
import { containsExcludedPhraseWord, shuffleWith } from './phrasePractice.js'
import { TRAIN_EXERCISE_FAMILIES } from './trainingProgression.js'
import { normalizeWordProgress, WORD_STAGE_DEFINITIONS } from './wordProgression.js'
import { WORD_MATCHING_POLICY } from './wordMatchingPolicy.js'
import { normalizeWordMatchingProgress } from './wordMatchingProgress.js'

const meaningGate = WORD_STAGE_DEFINITIONS.find(({ id }) => id === WORD_MATCHING_POLICY.unlock.stageId)
let questionSequence = 0

const meaningOf = (id) => DICT[id]?.en
const surfaceOf = (id) => DICT[id]?.al

const completedTier = (progress) => WORD_STAGE_DEFINITIONS.reduce((highest, definition) => {
  const required = definition.gate?.wins
  if (!Number.isSafeInteger(required)) return highest
  return (progress.wins?.[definition.id] || 0) >= required ? Math.max(highest, definition.tier) : highest
}, -1)

const confusability = (id, pool) => {
  const ranks = pool
    .filter((candidateId) => candidateId !== id && !sensesMayShareAnswer(id, candidateId))
    .map((candidateId) => wordContrastRank(id, candidateId))
    .filter(Number.isFinite)
  const closestRank = ranks.length ? Math.min(...ranks) : null
  return {
    closestRank,
    closePeerCount: ranks.filter((rank) => rank <= 2).length,
    score: closestRank == null ? 0 : Math.max(0, 5 - closestRank) + Math.min(3, ranks.filter((rank) => rank <= 2).length),
  }
}

const compatibleWith = (chosen, candidateId) => chosen.every(({ id }) =>
  normalizedChoiceText(surfaceOf(id), 'sq') !== normalizedChoiceText(surfaceOf(candidateId), 'sq') &&
  normalizedChoiceText(meaningOf(id), 'en') !== normalizedChoiceText(meaningOf(candidateId), 'en') &&
  !sensesMayShareAnswer(id, candidateId),
)

const pickCompatible = (ranked, indexes) => {
  const chosen = []
  for (const index of indexes) {
    const preferred = ranked[index]
    const alternatives = [preferred, ...ranked]
    const candidate = alternatives.find((entry) => entry &&
      !chosen.some(({ id }) => id === entry.id) && compatibleWith(chosen, entry.id))
    if (candidate) chosen.push(candidate)
  }
  return chosen
}

export function hasHonestWordMatchingSpread(entries) {
  const scores = (band) => entries
    .filter(({ difficultyBand }) => difficultyBand === band)
    .map(({ challengeScore }) => challengeScore)
  const easy = scores('easy')
  const middle = scores('medium-hard')
  const hard = scores('very-hard')
  if (easy.length !== 1 || middle.length !== 2 || hard.length !== 2) return false
  if (![...easy, ...middle, ...hard].every(Number.isFinite)) return false
  return Math.max(...easy) < Math.min(...middle) && Math.max(...middle) < Math.min(...hard)
}

function bandedSelection(ranked) {
  const count = ranked.length
  const hardIndexes = [count - 1, count - 2]
  const availableMiddle = Array.from({ length: count }, (_, index) => index)
    .filter((index) => index !== 0 && !hardIndexes.includes(index))
    .sort((left, right) => Math.abs(left - (count - 1) / 2) - Math.abs(right - (count - 1) / 2))
    .slice(0, 2)
  const requested = [0, ...availableMiddle, ...hardIndexes]
  const selected = pickCompatible(ranked, requested)
  if (selected.length !== WORD_MATCHING_POLICY.pairCount) return null
  const banded = selected.map((entry, index) => ({
    ...entry,
    difficultyBand: index === 0 ? 'easy' : index < 3 ? 'medium-hard' : 'very-hard',
  }))
  return hasHonestWordMatchingSpread(banded) ? banded : null
}

export function planWordMatchingRound({
  discoveredIds = [],
  wordProgress = {},
  wordMatchingProgress = {},
  practiced = {},
  excludeWords = [],
  currentRound = 0,
  rng = Math.random,
  debugTrace = false,
} = {}) {
  const trace = {
    builder: 'word-matching',
    policy: WORD_MATCHING_POLICY,
    request: { currentRound, excludedWordKeys: [...excludeWords] },
    candidates: [],
  }
  const matchingEvidence = normalizeWordMatchingProgress(wordMatchingProgress)
  const rawEligible = []
  for (const id of discoveredIds) {
    const progress = normalizeWordProgress(wordProgress[id], currentRound)
    const reasons = []
    if (!DICT[id]) reasons.push('missing dictionary sense')
    if (DICT[id] && !isTrainableSense(id)) reasons.push('sense is not trainable')
    if (!surfaceOf(id) || !meaningOf(id)) reasons.push('missing Albanian or concise English matching surface')
    if (containsExcludedPhraseWord(surfaceOf(id), excludeWords)) reasons.push('shares an Albanian word with the preceding Train activity')
    const meaningWins = progress.wins?.[WORD_MATCHING_POLICY.unlock.stageId] || 0
    if (meaningWins < WORD_MATCHING_POLICY.unlock.wins) reasons.push(`meaning recognition is ${meaningWins}/${WORD_MATCHING_POLICY.unlock.wins}`)
    trace.candidates.push({ id, status: reasons.length ? 'rejected' : 'eligible', reasons, meaningWins })
    if (!reasons.length) rawEligible.push(id)
  }

  // Equivalent/identical bare answers cannot coexist on an unequivocal match
  // board. Keep the stronger-practised representative, then rank challenge.
  const orderedForDeduplication = shuffleWith(rawEligible, rng)
    .sort((left, right) => (practiced[right] || 0) - (practiced[left] || 0))
  const compatiblePool = []
  for (const id of orderedForDeduplication) {
    if (compatibleWith(compatiblePool.map((candidateId) => ({ id: candidateId })), id)) compatiblePool.push(id)
  }

  const tieOrder = new Map(shuffleWith(compatiblePool, rng).map((id, index) => [id, index]))
  const ranked = compatiblePool.map((id) => {
    const progress = normalizeWordProgress(wordProgress[id], currentRound)
    const contrast = confusability(id, compatiblePool)
    const familiarity = (practiced[id] || 0) +
      (matchingEvidence.words[id]?.wins || 0) +
      (progress.wins?.[WORD_MATCHING_POLICY.unlock.stageId] || 0) +
      Math.max(0, completedTier(progress))
    return {
      id,
      al: surfaceOf(id),
      en: meaningOf(id),
      familiarity,
      confusability: contrast,
      // Higher means harder for this learner. Evidence dominates; close
      // reviewed peers decide ties and increase the challenge within a band.
      challengeScore: -familiarity * 10 + contrast.score,
      tieOrder: tieOrder.get(id),
    }
  }).sort((left, right) =>
    left.challengeScore - right.challengeScore || left.tieOrder - right.tieOrder)

  const selected = ranked.length >= WORD_MATCHING_POLICY.pairCount
    ? bandedSelection(ranked)
    : null
  trace.pool = {
    rawEligibleCount: rawEligible.length,
    compatibleCount: compatiblePool.length,
    requiredCount: WORD_MATCHING_POLICY.pairCount,
    ranked,
  }
  if (!selected) {
    trace.outcome = {
      status: 'unavailable',
      reason: compatiblePool.length < WORD_MATCHING_POLICY.pairCount
        ? `needs ${WORD_MATCHING_POLICY.pairCount} unambiguous eligible saved words; found ${compatiblePool.length}`
        : 'the eligible pool does not yet contain genuinely separated easy, medium-hard, and very-hard challenge bands',
      fallback: 'skip word matching and continue with another due Train activity',
    }
    return { question: null, trace }
  }

  const questionKey = `word-match:${currentRound}:${selected.map(({ id }) => id).join(',')}:${questionSequence++}`
  trace.outcome = {
    status: 'built',
    selected: selected.map(({ id, difficultyBand, challengeScore }) => ({ id, difficultyBand, challengeScore })),
    composition: WORD_MATCHING_POLICY.composition,
  }
  const wordIds = selected.map(({ id }) => id)
  const pairs = selected.map(({ id, al, en, difficultyBand, challengeScore, familiarity, confusability: contrast }) => ({
    id, al, en, difficultyBand, challengeScore, familiarity, confusability: contrast,
  }))
  return {
    question: {
      kind: TRAIN_EXERCISE_FAMILIES.wordMatching.kind,
      questionKey,
      mode: 'match',
      skill: WORD_MATCHING_POLICY.evidenceTrack,
      tier: null,
      variantId: WORD_MATCHING_POLICY.id,
      difficultyLabel: 'mixed adaptive board',
      wordIds,
      rewardIds: wordIds,
      pairs,
      left: shuffleWith(pairs.map(({ id, al }) => ({ id, text: al })), rng),
      right: shuffleWith(pairs.map(({ id, en }) => ({ id, text: en })), rng),
      lexicalSurfaces: pairs.map(({ al }) => al),
      difficultyComposition: WORD_MATCHING_POLICY.composition,
      distractorPolicy: 'all unmatched English cards are unambiguous saved-word meanings',
      ...(debugTrace ? { debugSelection: trace } : {}),
    },
    trace,
  }
}

export const buildWordMatchingQuestion = (options = {}) => planWordMatchingRound(options).question
