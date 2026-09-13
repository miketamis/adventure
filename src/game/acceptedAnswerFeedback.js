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
  const explanation = differences.length
    ? differences.map(({ position, attempted, answer: expected }) =>
        `Word ${position}: “${attempted}” should be “${expected}”.`).join(' ')
    : 'Compare the exact Albanian spelling, accents and punctuation shown below.'
  return { attempt, answer, differences, explanation }
}
