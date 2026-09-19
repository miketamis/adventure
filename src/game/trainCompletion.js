// Completed activities read their authored context, never a reconstructed gap
// or a sequence of isolated word recordings.
export function trainCompletionPhrases(question) {
  if (!question) return []
  let phrases
  if (question.phrases) phrases = question.phrases.map(({ al }) => al)
  else if (question.target?.al) phrases = [question.target.al]
  else if (question.formExerciseMode === 'same-root-grammar-matching') {
    phrases = question.pairs.map(({ context }) => context)
  } else if (question.grammarBundle) {
    const finalPhase = question.phasePlan.at(-1)
    phrases = [question.phaseQuestions[finalPhase.id].miss.correctAl]
  } else {
    phrases = [question.ctx?.authoredAl || question.ctx?.al || question.typingContext?.al || question.context?.al
      || question.agreementFrame?.demonstrative?.phrase]
  }
  return [...new Set(phrases.filter((phrase) => typeof phrase === 'string' && phrase.trim() && !phrase.includes('__')))]
}
