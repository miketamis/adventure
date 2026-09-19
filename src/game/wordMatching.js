import { DICT } from './content.js'
import { isTrainableSense } from './lexicalTrainability.js'
import { normalizedChoiceText, sensesMayShareAnswer } from './practiceAnswerValidity.js'
import { wordContrastRank } from './practiceContrasts.js'
import { containsExcludedPhraseWord, shuffleWith } from './phrasePractice.js'
import { TRAIN_EXERCISE_FAMILIES } from './trainingProgression.js'
import { normalizeWordProgress, WORD_STAGE_DEFINITIONS } from './wordProgression.js'
import { WORD_MATCHING_POLICY } from './wordMatchingPolicy.js'
import { normalizeWordMatchingProgress } from './wordMatchingProgress.js'
import {
  trainTargetBalancePlan,
  trainWordTargetKeys,
} from './trainActivityBalance.js'

const meaningGate = WORD_STAGE_DEFINITIONS.find(({ id }) => id === WORD_MATCHING_POLICY.unlock.stageId)
let questionSequence = 0

const meaningOf = (id) => DICT[id]?.en
const surfaceOf = (id) => DICT[id]?.al

const completedTier = (progress) => WORD_STAGE_DEFINITIONS.reduce((highest, definition) => {
  const required = definition.gate?.wins
  if (!Number.isSafeInteger(required)) return highest
  return (progress.wins?.[definition.id] || 0) >= required ? Math.max(highest, definition.tier) : highest
}, -1)

const confusability = (id, pool, contrastRank) => {
  let closestRank = null
  let closePeerCount = 0
  // This pool has already passed the pairwise answer-compatibility gate.
  for (const candidateId of pool) {
    if (candidateId === id) continue
    const rank = contrastRank(id, candidateId)
    if (!Number.isFinite(rank)) continue
    closestRank = closestRank == null ? rank : Math.min(closestRank, rank)
    if (rank <= 2) closePeerCount++
  }
  return {
    closestRank,
    closePeerCount,
    score: closestRank == null ? 0 : Math.max(0, 5 - closestRank) + Math.min(3, closePeerCount),
  }
}

const pickCompatible = (ranked, indexes, compatible) => {
  const chosen = []
  for (const index of indexes) {
    const preferred = ranked[index]
    const alternatives = [preferred, ...ranked]
    const candidate = alternatives.find((entry) => entry &&
      !chosen.some(({ id }) => id === entry.id) && chosen.every(({ id }) => compatible(id, entry.id)))
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

function bandedSelection(ranked, compatible) {
  const count = ranked.length
  const hardIndexes = [count - 1, count - 2]
  const availableMiddle = Array.from({ length: count }, (_, index) => index)
    .filter((index) => index !== 0 && !hardIndexes.includes(index))
    .sort((left, right) => Math.abs(left - (count - 1) / 2) - Math.abs(right - (count - 1) / 2))
    .slice(0, 2)
  const requested = [0, ...availableMiddle, ...hardIndexes]
  const selected = pickCompatible(ranked, requested, compatible)
  if (selected.length !== WORD_MATCHING_POLICY.pairCount) return null
  const banded = selected.map((entry, index) => ({
    ...entry,
    difficultyBand: index === 0 ? 'easy' : index < 3 ? 'medium-hard' : 'very-hard',
  }))
  return hasHonestWordMatchingSpread(banded) ? banded : null
}

export function createWordMatchingRoundPlanner({
  discoveredIds = [],
  wordProgress = {},
  wordMatchingProgress = {},
  practiced = {},
  excludeWords = [],
  targetHistory = [],
  currentRound = 0,
} = {}) {
  const candidates = []
  const matchingEvidence = normalizeWordMatchingProgress(wordMatchingProgress)
  const rawEligible = []
  const prepared = new Map()
  for (const id of discoveredIds) {
    const progress = normalizeWordProgress(wordProgress[id], currentRound)
    const reasons = []
    if (!DICT[id]) reasons.push('missing dictionary sense')
    if (DICT[id] && !isTrainableSense(id)) reasons.push('sense is not trainable')
    if (!surfaceOf(id) || !meaningOf(id)) reasons.push('missing Albanian or concise English matching surface')
    if (containsExcludedPhraseWord(surfaceOf(id), excludeWords)) reasons.push('shares an Albanian word with the preceding Train activity')
    const targetBalance = DICT[id]
      ? trainTargetBalancePlan([{ id, targetKeys: trainWordTargetKeys(id, surfaceOf(id)) }], targetHistory)
      : null
    if (targetBalance && !targetBalance.balanced.length) reasons.push('word or shared Albanian surface is inside the rolling target cooldown')
    const meaningWins = progress.wins?.[WORD_MATCHING_POLICY.unlock.stageId] || 0
    if (meaningWins < WORD_MATCHING_POLICY.unlock.wins) reasons.push(`meaning recognition is ${meaningWins}/${WORD_MATCHING_POLICY.unlock.wins}`)
    candidates.push({ id, status: reasons.length ? 'rejected' : 'eligible', reasons, meaningWins })
    if (!reasons.length) {
      rawEligible.push(id)
      prepared.set(id, {
        index: prepared.get(id)?.index ?? prepared.size,
        normalizedAl: normalizedChoiceText(surfaceOf(id), 'sq'),
        normalizedEn: normalizedChoiceText(meaningOf(id), 'en'),
        familiarity: (practiced[id] || 0) + (matchingEvidence.words[id]?.wins || 0) + meaningWins + Math.max(0, completedTier(progress)),
      })
    }
  }

  // Request-local compact matrices reuse only invariant pair facts across the
  // bounded board proposals. RNG-dependent ordering, deduplication and board
  // selection still run independently for each seed. No learner profile is
  // retained after this enumeration's planner becomes unreachable.
  const width = prepared.size
  const compatibility = new Uint8Array(width * width)
  const ranks = new Uint8Array(width * width)
  const compatible = (leftId, rightId) => {
    const left = prepared.get(leftId), right = prepared.get(rightId)
    const index = left.index * width + right.index
    if (!compatibility[index]) {
      const value = left.normalizedAl !== right.normalizedAl && left.normalizedEn !== right.normalizedEn && !sensesMayShareAnswer(leftId, rightId)
      compatibility[index] = value ? 2 : 1
      compatibility[right.index * width + left.index] = compatibility[index]
    }
    return compatibility[index] === 2
  }
  const contrastRank = (leftId, rightId) => {
    const index = prepared.get(leftId).index * width + prepared.get(rightId).index
    if (!ranks[index]) {
      const rank = wordContrastRank(leftId, rightId)
      ranks[index] = Number.isFinite(rank) ? rank + 1 : 255
    }
    return ranks[index] === 255 ? Infinity : ranks[index] - 1
  }

  return ({ rng = Math.random, debugTrace = false } = {}) => {
    const trace = {
      builder: 'word-matching',
      policy: WORD_MATCHING_POLICY,
      request: { currentRound, excludedWordKeys: [...excludeWords], targetHistory },
      candidates,
    }

    // Equivalent/identical bare answers cannot coexist on an unequivocal match
    // board. Keep the stronger-practised representative, then rank challenge.
    const orderedForDeduplication = shuffleWith(rawEligible, rng)
      .sort((left, right) => (practiced[right] || 0) - (practiced[left] || 0))
    const compatiblePool = []
    for (const id of orderedForDeduplication) {
      if (compatiblePool.every((candidateId) => compatible(candidateId, id))) compatiblePool.push(id)
    }

    const tieOrder = new Map(shuffleWith(compatiblePool, rng).map((id, index) => [id, index]))
    const ranked = compatiblePool.map((id) => {
      const contrast = confusability(id, compatiblePool, contrastRank)
      const familiarity = prepared.get(id).familiarity
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
      ? bandedSelection(ranked, compatible)
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
        targetKeys: wordIds.flatMap((id) => trainWordTargetKeys(id, surfaceOf(id))),
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
}

export function planWordMatchingRound(options = {}) {
  return createWordMatchingRoundPlanner(options)(options)
}

export const buildWordMatchingQuestion = (options = {}) => planWordMatchingRound(options).question
