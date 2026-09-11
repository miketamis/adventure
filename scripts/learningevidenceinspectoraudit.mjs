import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildLearningEvidenceInspector, LEARNING_INSPECTOR_WORDS } from '../src/game/debugLearningEvidence.js'
import { WORD_CAPABILITY_IDS } from '../src/game/wordProgression.js'

const phraseId = 'going-village'
const formKey = 'fshat::indefNom'
const state = {
  trainRound: 97,
  trainLastQuestionKey: 'global-last-sentinel',
  discovered: Object.fromEntries(LEARNING_INSPECTOR_WORDS.map(({ id }) => [id, true])),
  mana: Object.fromEntries(LEARNING_INSPECTOR_WORDS.map(({ id }, index) => [id, index + 11])),
  practiced: Object.fromEntries(LEARNING_INSPECTOR_WORDS.map(({ id }, index) => [id, index + 21])),
  formPracticed: { [formKey]: 31 },
  phrasePracticed: { [phraseId]: 41 },
  phraseMistakes: { [phraseId]: 42 },
  phraseListeningMastery: { [phraseId]: 2 },
  phraseMatchingMastery: { [phraseId]: 1 },
  phraseProductionProgress: { [phraseId]: {
    clozeWins: 2, clozeProofs: ['shko', 'fshat'], arrangeWins: 1, spellingProofs: ['shko'],
    independentWins: 0, strictWins: 0, dueAfterRound: 98, reviewGap: 16,
    lastAttemptKey: 'phrase-last-sentinel', lastAttemptRound: 96,
    remediation: { stage: 2, focusId: 'fshat', reason: 'word-form', dueAfterRound: 98 },
  } },
  wordProgress: Object.fromEntries(LEARNING_INSPECTOR_WORDS.map(({ id }, index) => [id, {
    wins: { 'meaning-recognition': 2, 'controlled-lemma-retrieval': 1 }, contextWins: {},
    contextSupportRequired: index === 0,
    formProofs: id === 'fshat' ? { [formKey]: {
      wins: { 'reviewed-form-contrast': 1 }, strictWins: 0, dueAfterRound: 99, reviewGap: 12,
      lastAttemptKey: 'form-last-sentinel', lastAttemptRound: 95,
    } } : {},
    activeFormKey: id === 'fshat' ? formKey : null, strictWins: 0,
    dueAfterRound: 98 + index, reviewGap: 8,
    lastAttemptKey: `word-last-${id}`, lastAttemptRound: 90 + index,
    remediation: { stageId: 'meaning-recognition', returnStageId: 'controlled-lemma-retrieval', reason: 'practice-miss', dueAfterRound: 97 },
  }])),
}

const model = buildLearningEvidenceInspector(state)
assert.equal(model.mode, 'live-current-save')
assert.equal(model.deterministicWalkthroughIndependent, true)
assert.equal(model.phrase.al, 'po shkoj në fshat.')
assert.deepEqual(model.phrase.mapping, [
  { id: 'po_prog', surface: 'po' }, { id: 'shko', surface: 'shkoj' },
  { id: 'ne', surface: 'në' }, { id: 'fshat', surface: 'fshat' },
])
assert.equal(model.phrase.persisted.production.lastAttemptKey, 'phrase-last-sentinel')
assert.equal(model.phrase.persisted.lastQuestionKey, 'global-last-sentinel')
assert.equal(model.phrase.persisted.totals.correct, 41)
assert.equal(model.phrase.persisted.totals.mistakes, 42)
assert.equal(model.phrase.persisted.listening.tier, 2)
assert.equal(model.phrase.persisted.matching.tier, 1)
for (const track of ['listening', 'matching']) {
  for (const field of ['wins', 'proofs', 'spacing', 'remediation', 'lastAttempt']) {
    assert.equal(model.phrase.persisted[track][field].status, 'absent', `${track}.${field} absence is hidden`)
  }
}

assert.deepEqual(model.words.map(({ id }) => id), LEARNING_INSPECTOR_WORDS.map(({ id }) => id))
for (const [index, word] of model.words.entries()) {
  assert.equal(word.persisted.saved, true)
  assert.equal(word.persisted.tokens, index + 11)
  assert.equal(word.persisted.practiceRewards, index + 21)
  assert.equal(word.persisted.progress.lastAttemptKey, `word-last-${word.id}`)
  assert.deepEqual(Object.keys(word.snapshot.capabilities), [...WORD_CAPABILITY_IDS])
  for (const capability of Object.values(word.snapshot.capabilities)) {
    for (const field of ['status', 'evidence', 'gaps', 'due', 'remediation', 'lastAttempt']) {
      assert.ok(Object.hasOwn(capability, field), `${word.id}: capability omits ${field}`)
    }
  }
}
assert.equal(model.words.find(({ id }) => id === 'fshat').persisted.reviewedFormRewards[formKey], 31)
assert.equal(model.identityExample.id, 'elira')
assert.equal(model.identityExample.status, 'not trainable: identity/proper name')
assert.match(model.identityExample.reason, /Personal name/)

const mutated = buildLearningEvidenceInspector({ ...state, mana: { ...state.mana, fshat: 777 } })
assert.equal(mutated.words.find(({ id }) => id === 'fshat').persisted.tokens, 777)
assert.equal(mutated.deterministicWalkthroughIndependent, true)
const debugView = readFileSync(new URL('../src/components/DebugView.jsx', import.meta.url), 'utf8')
assert.match(debugView, /lazy\(\(\) => import\('\.\/DebugLearningEvidenceInspector\.jsx'\)\)/)
assert.match(debugView, /<DebugLearningEvidenceInspector state=\{state\} \/>/)
assert.match(debugView, /<DebugLearningProgression \/>/, 'deterministic walkthrough accidentally received live state')

console.log('✓ live learning inspector exposes normalized phrase/all-word evidence, explicit absences and independent deterministic walkthrough.')
