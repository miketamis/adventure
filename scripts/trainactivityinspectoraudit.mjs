import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { buildDebugTrainActivity } from '../src/game/debugTrainActivity.js'
import { buildPhraseQuestion } from '../src/game/phrasePractice.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import { reviewedFormTargets } from '../src/game/formInventory.js'

const phrase = EVERYDAY_PHRASE_DRILLS.find(({ id }) => id === 'going-village')
const phraseState = {
  trainRound: 12,
  trainLastWords: ['mirë'],
  trainLastQuestionKey: 'previous-question',
  discovered: Object.fromEntries(phrase.requires.map((id) => [id, true])),
  mana: { po_prog: 1, shko: 2, ne: 3, fshat: 4 },
  practiced: { po_prog: 5, shko: 6, ne: 7, fshat: 8 },
  wordProgress: {},
  formPracticed: {},
  phrasePracticed: { [phrase.id]: 2 },
  phraseMistakes: { [phrase.id]: 1 },
  phraseProductionProgress: {},
  phraseListeningMastery: {},
  phraseMatchingMastery: {},
  phraseListeningProgress: {},
  phraseMatchingProgress: {},
}

const phraseQuestion = buildPhraseQuestion([phrase], phraseState.mana, {}, {}, {
  mode: 'cloze',
  tier: 0,
  targetId: phrase.id,
  distractorPool: EVERYDAY_PHRASE_DRILLS,
  currentRound: phraseState.trainRound,
  rng: () => 0.271,
  debugTrace: true,
})
assert.ok(phraseQuestion?.debugSelection, 'debug phrase build omitted its real selection trace')
const phraseModel = buildDebugTrainActivity(phraseQuestion, phraseState, 2_000)
assert.equal(phraseModel.mode, 'debug-current-train-activity')
assert.deepEqual(
  phraseModel.occurrences.filter(({ source }) => source === 'phrase:going-village').map(({ id }) => id),
  ['po_prog', 'shko', 'ne', 'fshat'],
  'the inspector did not preserve the reviewed sense mapping for every phrase word',
)
assert.ok(phraseModel.words.every(({ dictionary, learner, progressionOptions }) =>
  dictionary?.al && learner?.capabilitySnapshot && progressionOptions?.trainability),
  'a represented phrase word lacks its dictionary/progression/player record',
)
assert.equal(phraseModel.phrases[0].authored.id, phrase.id)
assert.ok(phraseModel.phrases[0].progressionSnapshot.currentDefinition)
assert.ok(phraseModel.selectionTrace.targetSelection.candidates.length > 0)

const wordQuestion = buildWordQuestion({
  discoveredIds: phrase.requires,
  targetId: 'fshat',
  mana: phraseState.mana,
  wordProgress: phraseState.wordProgress,
  currentRound: phraseState.trainRound,
  rng: () => 0.314,
  debugTrace: true,
})
assert.ok(wordQuestion?.debugSelection, 'debug word build omitted its real due-pool trace')
const wordModel = buildDebugTrainActivity(wordQuestion, phraseState, 2_000)
assert.equal(wordModel.question.answerId, 'fshat')
assert.ok(wordModel.selectionTrace.candidates.some(({ id, status }) => id === 'fshat' && status === 'eligible'))
assert.equal(wordModel.words.find(({ id }) => id === 'fshat').dictionary.en, 'village')
assert.ok(Array.isArray(wordModel.words.find(({ id }) => id === 'fshat').albanianDefinition.tokens))
assert.ok(Array.isArray(wordModel.words.find(({ id }) => id === 'fshat').playableFormInventory))
assert.ok(Array.isArray(wordModel.words.find(({ id }) => id === 'fshat').playableUsageBySurface))

const formQuestion = buildWordQuestion({
  discoveredIds: [...new Set([
    ...phrase.requires,
    'nje', 'burg', 'dyqan', 'hotel',
    ...reviewedFormTargets('fshat').flatMap(({ context }) => context?.requires || []),
  ])],
  targetId: 'fshat',
  mana: phraseState.mana,
  wordProgress: { fshat: { wins: { 'meaning-recognition': 2 } } },
  currentRound: phraseState.trainRound,
  rng: () => 0.314,
  debugTrace: true,
})
assert.equal(formQuestion?.wordStageId, 'reviewed-form-contrast')
const formModel = buildDebugTrainActivity(formQuestion, phraseState, 2_000)
assert.strictEqual(formModel.question.phasePlan, formQuestion.phasePlan)
assert.deepEqual(formModel.question.lexicalCheck, formQuestion.lexicalCheck)
assert.deepEqual(
  formModel.occurrences.filter(({ source }) => source === 'meaning phase options').map(({ id }) => id),
  formQuestion.lexicalCheck.options,
  'debug inspection omitted one or more sense choices from the staged meaning phase',
)

const ordinaryQuestion = buildWordQuestion({
  discoveredIds: ['fshat'], targetId: 'fshat', currentRound: 0, rng: () => 0.314,
})
assert.equal(ordinaryQuestion.debugSelection, undefined, 'normal play retained the debug decision payload')

const practiceSource = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
assert.match(practiceSource, /state\.debug && \([\s\S]*?<DebugTrainActivityInspector question=\{q\} state=\{state\}/)
assert.match(practiceSource, /debugTrace: state\.debug/)
const inspectorSource = readFileSync(new URL('../src/components/DebugTrainActivityInspector.jsx', import.meta.url), 'utf8')
for (const label of [
  'Every Albanian word occurrence',
  'Dictionary entry (raw)',
  'Albanian definition tokens (raw)',
  'All playable/reviewed forms',
  'Every playable use we recorded',
  'Persisted + normalized player evidence',
  'Exact scheduler decision',
  'Raw built question (every serialized field)',
]) assert.match(inspectorSource, new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))

console.log('✓ the debug-only current Train inspector exposes every activity word, canonical lexical/form/evidence records, and the recorded scheduler decision.')
