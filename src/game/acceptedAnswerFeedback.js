// One comparison contract for any spelling response accepted with beginner
// leeway. The activity remains blocked until the learner has seen the exact
// Albanian and explicitly continues.

const clean = (value) => typeof value === 'string' ? value.trim() : ''

const words = (value) => clean(value).match(/[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*/gu) || []

export function acceptedAnswerComparison(attemptValue, answerValue) {
  const attempt = clean(attemptValue)
  const answer = clean(answerValue)
  if (!attempt || !answer) return null
  const attemptedWords = words(attempt)
  const answerWords = words(answer)
  const normalizedAttemptedWords = attemptedWords.map((word) => word.normalize('NFC').toLocaleLowerCase('sq'))
  const normalizedAnswerWords = answerWords.map((word) => word.normalize('NFC').toLocaleLowerCase('sq'))
  const sameWordInventory = normalizedAttemptedWords.length === normalizedAnswerWords.length &&
    [...normalizedAttemptedWords].sort().join('\u0000') === [...normalizedAnswerWords].sort().join('\u0000')
  const differences = []
  if (attemptedWords.length === answerWords.length) {
    for (let index = 0; index < answerWords.length; index++) {
      if (attemptedWords[index].normalize('NFC') === answerWords[index].normalize('NFC')) continue
      differences.push({
        position: index + 1,
        attempted: attemptedWords[index],
        answer: answerWords[index],
      })
    }
  }
  const kind = sameWordInventory ? 'order' : 'spelling'
  const explanation = kind === 'order'
    ? 'All the words are here. Compare their positions with the natural Albanian order shown below.'
    : differences.length
      ? differences.map(({ position, attempted, answer: expected }) =>
        `Word ${position}: “${attempted}” should be “${expected}”.`).join(' ')
      : 'Compare the exact Albanian spelling, accents and punctuation shown below.'
  return {
    attempt,
    answer,
    differences,
    explanation,
    kind,
    title: kind === 'order'
      ? 'Close enough at this level — check the exact word order'
      : 'Close enough at this level — check the exact spelling',
  }
}
