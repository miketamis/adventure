// One presentation contract identifies the thing every contextual Train
// question is asking about. Difficulty may remove translation or a visual
// highlight, but it may never make the learner guess which word is the target.
export const CONTEXT_TARGET_PRESENTATION = Object.freeze({
  marked: 'marked',
  namedMarked: 'named-marked',
  blank: 'blank',
  unmarked: 'unmarked',
})

const quoted = (value) => `“${String(value || '').trim()}”`

export function contextualTargetReference({
  direction,
  targetKind = 'lexical-meaning',
  presentation,
  targetSurface,
  targetTokenIndices = [],
} = {}) {
  const uniqueIndices = [...new Set(targetTokenIndices)]
    .filter((index) => Number.isInteger(index) && index >= 0)
  const surface = String(targetSurface || '').trim()

  if (direction === 'en2al') {
    return Object.freeze({
      valid: presentation === CONTEXT_TARGET_PRESENTATION.blank && uniqueIndices.length === 1 && Boolean(surface),
      referenceMode: 'single-gap',
      instruction: 'Complete the Albanian sentence',
      directionLabel: 'English context → Albanian',
      answerGroupLabel: 'Choose the missing Albanian word',
    })
  }

  if (direction !== 'al2en' || uniqueIndices.length !== 1 || !surface) {
    return Object.freeze({ valid: false, referenceMode: 'invalid' })
  }

  const grammatical = targetKind === 'grammatical-function'
  if (presentation === CONTEXT_TARGET_PRESENTATION.marked) {
    return Object.freeze({
      valid: true,
      referenceMode: 'visual-mark',
      instruction: grammatical
        ? 'What job does the marked word do here?'
        : 'Choose what the marked word means here',
      directionLabel: grammatical ? 'Albanian → grammatical job' : 'Albanian → meaning',
      answerGroupLabel: grammatical
        ? 'Choose the marked word’s grammatical job'
        : 'Choose the marked word’s meaning',
    })
  }

  if (presentation === CONTEXT_TARGET_PRESENTATION.namedMarked) {
    return Object.freeze({
      valid: true,
      referenceMode: 'named-and-marked-surface',
      instructionPrefix: grammatical ? 'What job does ' : 'What does ',
      instructionTarget: surface,
      instructionSuffix: grammatical ? ' do here?' : ' mean here?',
      instruction: grammatical
        ? `What job does ${quoted(surface)} do here?`
        : `What does ${quoted(surface)} mean here?`,
      directionLabel: grammatical ? 'Albanian → grammatical job' : 'Albanian → meaning',
      answerGroupLabel: grammatical
        ? 'Choose the named word’s grammatical job'
        : 'Choose the named word’s meaning',
    })
  }

  if (presentation === CONTEXT_TARGET_PRESENTATION.unmarked) {
    return Object.freeze({
      valid: true,
      referenceMode: 'locate-then-analyse',
      requiresTargetIdentification: true,
      targetTokenIndex: uniqueIndices[0],
      locateInstructionPrefix: 'First tap ',
      locateInstructionTarget: surface,
      locateInstructionSuffix: ' in the Albanian sentence',
      locateInstruction: `First tap ${quoted(surface)} in the Albanian sentence`,
      instructionPrefix: grammatical ? 'What job does ' : 'What does ',
      instructionTarget: surface,
      instructionSuffix: grammatical ? ' do here?' : ' mean here?',
      instruction: grammatical
        ? `What job does ${quoted(surface)} do here?`
        : `What does ${quoted(surface)} mean here?`,
      directionLabel: grammatical ? 'Albanian → grammatical job' : 'Albanian → meaning',
      answerGroupLabel: grammatical
        ? 'Choose the located word’s grammatical job'
        : 'Choose the located word’s meaning',
    })
  }

  return Object.freeze({ valid: false, referenceMode: 'invalid' })
}

// The locate phase is part of the shared contextual-question contract rather
// than a view-only quiz. A correct tap reveals the existing analysis phase but
// is deliberately not a completed learning result; a wrong tap ends the
// activity as a miss so the learner cannot find the answer by tapping every
// token.
export function contextualTargetSelection(reference, selectedTokenIndex) {
  const eligible = reference?.valid === true &&
    reference.referenceMode === 'locate-then-analyse' &&
    reference.requiresTargetIdentification === true &&
    Number.isInteger(reference.targetTokenIndex)
  const correct = eligible && selectedTokenIndex === reference.targetTokenIndex
  return Object.freeze({
    eligible,
    correct,
    revealAnalysis: correct,
    completesActivity: eligible && !correct,
    recordsSuccessfulEvidence: false,
    expectedTokenIndex: eligible ? reference.targetTokenIndex : null,
  })
}

export function wordProductionTargetReference({ mode, meaningCue, context } = {}) {
  const cue = String(meaningCue || '').trim()
  const gapCount = String(context?.alGap || '').split('__').length - 1
  const hasContext = Boolean(context)
  const validMode = mode === 'construction' || mode === 'spelling'
  const valid = validMode && Boolean(cue) && (!hasContext || gapCount === 1)
  return Object.freeze({
    valid,
    referenceMode: hasContext ? 'single-gap-with-meaning-cue' : 'meaning-cue',
    instruction: mode === 'construction'
      ? (hasContext ? 'Build the missing Albanian word' : 'Build this word in Albanian')
      : (hasContext ? 'Write the missing word in Albanian' : 'Write this word in Albanian'),
    meaningCue: cue,
    context,
  })
}
