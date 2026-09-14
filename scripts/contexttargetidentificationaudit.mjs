import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  CONTEXT_TARGET_PRESENTATION,
  contextualTargetReference,
} from '../src/game/contextQuestionPresentation.js'
import {
  WORD_CONTEXT_LATE_PROOF,
  WORD_CONTEXT_VARIANTS,
} from '../src/game/wordProgression.js'

const reference = contextualTargetReference({
  direction: 'al2en',
  targetKind: 'grammatical-function',
  presentation: CONTEXT_TARGET_PRESENTATION.marked,
  targetSurface: 'po',
  targetTokenIndices: [1],
})
assert.equal(reference.valid, true)
assert.equal(reference.referenceMode, 'visual-mark')
assert.equal(reference.instruction, 'What job does the marked word do here?')
assert.equal(reference.answerGroupLabel, 'Choose the marked word’s grammatical job')

const lateVariant = WORD_CONTEXT_VARIANTS.find(({ id }) => id === WORD_CONTEXT_LATE_PROOF)
assert.ok(lateVariant, 'the persisted late contextual proof ID disappeared')
assert.equal(lateVariant.targetPresentation, CONTEXT_TARGET_PRESENTATION.marked)
assert.match(lateVariant.label, /marked context .* transfer check/i)

const ambiguous = contextualTargetReference({
  direction: 'al2en',
  presentation: CONTEXT_TARGET_PRESENTATION.marked,
  targetSurface: 'po',
  targetTokenIndices: [0, 3],
})
assert.equal(ambiguous.valid, false, 'an ambiguous marked surface did not fail closed')
assert.equal(contextualTargetReference({
  direction: 'al2en',
  presentation: 'unmarked',
  targetSurface: 'po',
  targetTokenIndices: [0],
}).valid, false, 'the removed fake locate presentation is still accepted')

const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
const completion = readFileSync(new URL('../src/components/ContextualCompletion.jsx', import.meta.url), 'utf8')
const presentation = readFileSync(new URL('../src/game/contextQuestionPresentation.js', import.meta.url), 'utf8')
const progression = readFileSync(new URL('../src/game/wordProgression.js', import.meta.url), 'utf8')
const examples = readFileSync(new URL('../src/game/trainingExampleRegistry.js', import.meta.url), 'utf8')

for (const [label, source] of Object.entries({ practice, completion, presentation, progression, examples })) {
  assert.doesNotMatch(source, /First tap\s+[“"']/i, `${label} restored a fake named locate step`)
  assert.doesNotMatch(source, /locateInstruction|requiresTargetIdentification|locate-then-analyse/,
    `${label} retained dead locate-step state`)
}
assert.match(practice, /presentation: contextualTargetPresentation/)
assert.match(practice, /answers=\{q\.options\.map/)
assert.doesNotMatch(practice, /contextTargetLocated|onContextTargetSelect|contextualTargetSelection/)
assert.match(completion, /<mark className="contextual-completion-target"/)
assert.doesNotMatch(completion, /contextual-completion-token-choice|target\.onSelect/)

console.log('✓ contextual Train questions ask the real marked-target question directly; fake named locate phases are rejected and the late proof keeps its persisted ID.')
