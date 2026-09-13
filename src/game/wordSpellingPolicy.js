// One shared spelling-response policy for word-level Train. Early spelling
// activities ask for exact Albanian, but a close attempt becomes an immediate
// repair turn instead of either a false mastery proof or a heart consequence.
// Strict spaced recall deliberately stays exact and does not use this support.

const normalize = (value) => String(value || '')
  .normalize('NFC')
  .toLocaleLowerCase('sq')
  .trim()

const letters = (value) => [...normalize(value)]

function damerauLevenshtein(leftValue, rightValue) {
  const left = letters(leftValue)
  const right = letters(rightValue)
  const matrix = Array.from({ length: left.length + 1 }, () => Array(right.length + 1).fill(0))
  for (let row = 0; row <= left.length; row++) matrix[row][0] = row
  for (let column = 0; column <= right.length; column++) matrix[0][column] = column
  for (let row = 1; row <= left.length; row++) {
    for (let column = 1; column <= right.length; column++) {
      const substitutionCost = left[row - 1] === right[column - 1]
        ? 0
        : ((left[row - 1] === 'e' && right[column - 1] === 'ë') ||
            (left[row - 1] === 'ë' && right[column - 1] === 'e') ||
            (left[row - 1] === 'c' && right[column - 1] === 'ç') ||
            (left[row - 1] === 'ç' && right[column - 1] === 'c'))
          ? 0.5
          : 1
      matrix[row][column] = Math.min(
        matrix[row - 1][column] + 1,
        matrix[row][column - 1] + 1,
        matrix[row - 1][column - 1] + substitutionCost,
      )
      if (
        row > 1 && column > 1 &&
        left[row - 1] === right[column - 2] &&
        left[row - 2] === right[column - 1]
      ) {
        matrix[row][column] = Math.min(matrix[row][column], matrix[row - 2][column - 2] + 1)
      }
    }
  }
  return matrix[left.length][right.length]
}
const commonEdges = (attempt, target) => {
  const actual = letters(attempt)
  const expected = letters(target)
  let prefix = 0
  while (prefix < actual.length && prefix < expected.length && actual[prefix] === expected[prefix]) prefix++
  let suffix = 0
  while (
    suffix < actual.length - prefix && suffix < expected.length - prefix &&
    actual[actual.length - 1 - suffix] === expected[expected.length - 1 - suffix]
  ) suffix++
  return {
    prefix: expected.slice(0, prefix).join(''),
    attemptedMiddle: actual.slice(prefix, actual.length - suffix || actual.length).join(''),
    expectedMiddle: expected.slice(prefix, expected.length - suffix || expected.length).join(''),
    suffix: expected.slice(expected.length - suffix).join(''),
  }
}

const repairLimit = (targetLength) => targetLength >= 11 ? 2 : targetLength >= 5 ? 1 : 0.5

export const WORD_SPELLING_SUPPORT_POLICY = Object.freeze({
  version: 1,
  supportedTolerances: Object.freeze(['repair']),
  strictTolerance: 'strict',
  proofRule: 'Only an exact repaired answer records correct spelling evidence.',
  consequenceRule: 'A close early-spelling attempt keeps the same question open and never reaches the heart-loss reducer.',
})

export function wordSpellingAttempt(attempt, target, tolerance = 'strict') {
  const normalizedAttempt = normalize(attempt)
  const normalizedTarget = normalize(target)
  if (normalizedAttempt === normalizedTarget) {
    return { status: 'correct', correct: true, repairRequired: false, distance: 0, diff: null }
  }
  const distance = damerauLevenshtein(normalizedAttempt, normalizedTarget)
  const repairRequired = tolerance === 'repair' && distance <= repairLimit(letters(normalizedTarget).length)
  const diff = commonEdges(normalizedAttempt, normalizedTarget)
  return {
    status: repairRequired ? 'repair' : 'incorrect',
    correct: false,
    repairRequired,
    distance,
    diff,
  }
}

export function wordSpellingRepairMessage(result) {
  if (!result?.repairRequired || !result.diff) return ''
  const { prefix, attemptedMiddle, expectedMiddle, suffix } = result.diff
  const where = prefix
    ? `after “${prefix}”`
    : suffix
      ? `before “${suffix}”`
      : 'in the marked part'
  if (!attemptedMiddle) return `Very close. Add “${expectedMiddle}” ${where}, then check the word again.`
  if (!expectedMiddle) return `Very close. Remove “${attemptedMiddle}” ${where}, then check the word again.`
  return `Very close. Change “${attemptedMiddle}” to “${expectedMiddle}” ${where}, then check the word again.`
}
