import { normalizeTemporalEvidence, recordTemporalAttempt } from './adaptiveLearning.js'

export const WORD_MATCHING_PROGRESS_VERSION = 1

const safeCount = (value) => {
  const numeric = Number(value)
  return Number.isSafeInteger(numeric) && numeric >= 0 ? numeric : 0
}

const normalizeEntry = (value) => {
  const source = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  return {
    attempts: safeCount(source.attempts),
    wins: Math.min(safeCount(source.wins), safeCount(source.attempts)),
    lastAttemptRound: safeCount(source.lastAttemptRound),
    temporal: normalizeTemporalEvidence(source.temporal),
  }
}

const normalizeEntryMap = (value) => Object.fromEntries(Object.entries(
  value && typeof value === 'object' && !Array.isArray(value) ? value : {},
).flatMap(([id, entry]) => typeof id === 'string' && id && id.length <= 200
  ? [[id, normalizeEntry(entry)]]
  : []))

export const emptyWordMatchingProgress = () => ({ family: {}, words: {} })

export const normalizeWordMatchingProgress = (value) => ({
  family: normalizeEntryMap(value?.family),
  words: normalizeEntryMap(value?.words),
})

const recordEntry = (entry, correct, round, attemptedAtMs, responseDurationMs) => {
  const normalized = normalizeEntry(entry)
  return {
    attempts: normalized.attempts + 1,
    wins: normalized.wins + (correct ? 1 : 0),
    lastAttemptRound: Math.max(normalized.lastAttemptRound, safeCount(round)),
    temporal: recordTemporalAttempt(normalized.temporal, {
      correct,
      attemptedAtMs,
      responseDurationMs,
    }),
  }
}

export function recordWordMatchingResult(
  progress,
  variantId,
  wordIds,
  correct,
  round,
  attemptedAtMs,
  responseDurationMs,
) {
  const next = normalizeWordMatchingProgress(progress)
  next.family[variantId] = recordEntry(
    next.family[variantId], correct, round, attemptedAtMs, responseDurationMs,
  )
  for (const id of [...new Set(wordIds)]) {
    next.words[id] = recordEntry(next.words[id], correct, round, attemptedAtMs, responseDurationMs)
  }
  return next
}
