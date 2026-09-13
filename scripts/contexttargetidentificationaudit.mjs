import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  CONTEXT_TARGET_PRESENTATION,
  contextualTargetReference,
  contextualTargetSelection,
} from '../src/game/contextQuestionPresentation.js'

const reference = contextualTargetReference({
  direction: 'al2en',
  targetKind: 'grammatical-function',
  presentation: CONTEXT_TARGET_PRESENTATION.unmarked,
  targetSurface: 'po',
  targetTokenIndices: [0],
})
assert.equal(reference.valid, true)
assert.equal(reference.referenceMode, 'locate-then-analyse')
assert.equal(reference.requiresTargetIdentification, true)
assert.equal(reference.targetTokenIndex, 0)
assert.equal(reference.locateInstruction, 'First tap “po” in the Albanian sentence')
assert.equal(reference.instruction, 'What job does “po” do here?')

const correctLocate = contextualTargetSelection(reference, 0)
assert.deepEqual(correctLocate, {
  eligible: true,
  correct: true,
  revealAnalysis: true,
  completesActivity: false,
  recordsSuccessfulEvidence: false,
  expectedTokenIndex: 0,
})
const wrongLocate = contextualTargetSelection(reference, 2)
assert.equal(wrongLocate.correct, false)
assert.equal(wrongLocate.revealAnalysis, false)
assert.equal(wrongLocate.completesActivity, true)
assert.equal(wrongLocate.recordsSuccessfulEvidence, false)

const ambiguous = contextualTargetReference({
  direction: 'al2en',
  presentation: CONTEXT_TARGET_PRESENTATION.unmarked,
  targetSurface: 'po',
  targetTokenIndices: [0, 3],
})
assert.equal(ambiguous.valid, false, 'an ambiguous unmarked surface did not fail closed')
assert.equal(contextualTargetSelection(ambiguous, 0).eligible, false)

const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
const completion = readFileSync(new URL('../src/components/ContextualCompletion.jsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
assert.match(practice, /const \[contextTargetLocated, setContextTargetLocated\] = useState\(false\)/)
assert.match(practice, /const result = contextualTargetSelection\(q\.targetReference, tokenIndex\)/)
assert.match(practice, /if \(result\.correct\) \{[\s\S]*setContextTargetLocated\(true\)[\s\S]*return[\s\S]*type: 'PRACTICE_WORD_RESULT'/,
  'the successful locate phase is not separated from the final evidence dispatch')
assert.match(practice, /answers=\{\(contextTargetSelectionActive \? \[\] : q\.options\)/,
  'analysis choices are visible before the target is located')
assert.match(practice, /presentation: contextTargetLocated[\s\S]*CONTEXT_TARGET_PRESENTATION\.marked/,
  'the located occurrence does not receive the shared green target treatment')
assert.match(completion, /className="contextual-completion-token-choice"/)
assert.match(completion, /onClick=\{\(\) => target\.onSelect\(index\)\}/)
assert.match(styles, /\.contextual-completion-token-choice:focus-visible/)

console.log('✓ unmarked context questions name one exact Albanian surface, require a keyboard-accessible locate phase, reveal marked analysis only after the correct tap, and award no successful evidence before final analysis.')
