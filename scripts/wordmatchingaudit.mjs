import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { buildDebugTrainActivity } from '../src/game/debugTrainActivity.js'
import { createWordMatchingRoundPlanner, hasHonestWordMatchingSpread, planWordMatchingRound } from '../src/game/wordMatching.js'
import { DICT } from '../src/game/dictionary.js'
import { isTrainableSense } from '../src/game/lexicalTrainability.js'
import { seededTrainRng } from '../src/game/trainCandidateContract.js'
import { WORD_MATCHING_POLICY } from '../src/game/wordMatchingPolicy.js'
import { TRAIN_EXERCISE_FAMILIES, TRAIN_QUESTION_MIX_POLICY } from '../src/game/trainingProgression.js'
import { TRAIN_ACTIVITY_BALANCE_POLICY } from '../src/game/trainActivityBalance.js'

const ids = ['fshat', 'ure', 'rruge', 'shtepi', 'uje', 'buke', 'kripe', 'dritare', 'liber', 'shishe', 'cakmak', 'mal']
const discovered = Object.fromEntries(ids.map((id) => [id, true]))
const wordProgress = Object.fromEntries(ids.map((id) => [id, {
  wins: { 'meaning-recognition': 2 },
  contextWins: {},
  formProofs: {},
  strictWins: 0,
  dueAfterRound: 0,
}]))
const practiced = Object.fromEntries(ids.map((id, index) => [id, index]))

const first = planWordMatchingRound({
  discoveredIds: ids,
  wordProgress,
  practiced,
  currentRound: 20,
  rng: () => 0.37,
  debugTrace: true,
})
assert.ok(first.question)
assert.equal(first.question.kind, TRAIN_EXERCISE_FAMILIES.wordMatching.kind)
assert.equal(first.question.variantId, WORD_MATCHING_POLICY.id)
assert.equal(first.question.pairs.length, WORD_MATCHING_POLICY.pairCount)
assert.deepEqual(
  Object.fromEntries(Object.entries(WORD_MATCHING_POLICY.composition).map(([band]) => [
    band,
    first.question.pairs.filter(({ difficultyBand }) => difficultyBand === band).length,
  ])),
  WORD_MATCHING_POLICY.composition,
)
assert.ok(first.question.pairs.every(({ id }) => discovered[id]))
assert.equal(new Set(first.question.pairs.map(({ al }) => al)).size, WORD_MATCHING_POLICY.pairCount)
assert.equal(new Set(first.question.pairs.map(({ en }) => en)).size, WORD_MATCHING_POLICY.pairCount)
assert.deepEqual(first.question.rewardIds, first.question.wordIds)
assert.ok(first.question.pairs[0].challengeScore <= first.question.pairs[3].challengeScore)
assert.equal(first.trace.outcome.status, 'built')
assert.equal(hasHonestWordMatchingSpread(first.question.pairs), true)
assert.equal(hasHonestWordMatchingSpread(first.question.pairs.map((pair) => ({ ...pair, challengeScore: 0 }))), false,
  'difficulty labels survived a board with no real challenge separation')

const flatEvidence = planWordMatchingRound({
  discoveredIds: ids,
  wordProgress,
  practiced: Object.fromEntries(ids.map((id) => [id, 0])),
  currentRound: 20,
  rng: () => 0.37,
  debugTrace: true,
})
assert.equal(flatEvidence.question, null, 'a tied learner profile received invented difficulty bands')
assert.match(flatEvidence.trace.outcome.reason, /genuinely separated/)

const priorWord = first.question.pairs[0]
const disjoint = planWordMatchingRound({
  discoveredIds: ids,
  wordProgress,
  practiced,
  currentRound: 21,
  excludeWords: [priorWord.al],
  rng: () => 0.42,
})
assert.ok(disjoint.question)
assert.ok(!disjoint.question.wordIds.includes(priorWord.id), 'the previous Albanian word reappeared immediately')

const unproved = { ...wordProgress, fshat: { ...wordProgress.fshat, wins: { 'meaning-recognition': 1 } } }
const withoutUnproved = planWordMatchingRound({
  discoveredIds: ids,
  wordProgress: unproved,
  practiced,
  currentRound: 20,
  rng: () => 0.18,
})
assert.ok(!withoutUnproved.question.wordIds.includes('fshat'))

const undersized = planWordMatchingRound({
  discoveredIds: ids.slice(0, 4),
  wordProgress,
  practiced,
  currentRound: 20,
  rng: () => 0.3,
  debugTrace: true,
})
assert.equal(undersized.question, null)
assert.equal(undersized.trace.outcome.status, 'unavailable')
assert.match(undersized.trace.outcome.reason, /needs 5/)
assert.match(undersized.trace.outcome.fallback, /another due Train activity/)

const matureIds = Object.keys(DICT).filter(isTrainableSense).slice(0, 500)
const matureProgress = Object.fromEntries(matureIds.map((id) => [id, { wins: { 'meaning-recognition': 2 } }]))
const matureOptions = {
  discoveredIds: matureIds,
  wordProgress: matureProgress,
  practiced: Object.fromEntries(matureIds.map((id, index) => [id, index % 12])),
  currentRound: 5000,
}
let progressReads = 0
const batchedPlanner = createWordMatchingRoundPlanner({
  ...matureOptions,
  wordProgress: new Proxy(matureProgress, { get(target, id) { progressReads++; return target[id] } }),
})
assert.equal(progressReads, matureIds.length, 'matching preparation did not read each target once')
const withoutSequence = (result) => ({
  ...result,
  question: result.question ? { ...result.question, questionKey: 'sequence-independent' } : null,
})
for (let index = 0; index < 8; index++) {
  const seed = `mature-matching:${index}`
  const shared = batchedPlanner({ rng: seededTrainRng(seed), debugTrace: true })
  const independent = planWordMatchingRound({ ...matureOptions, rng: seededTrainRng(seed), debugTrace: true })
  assert.ok(shared.question, `${seed}: representative mature profile lost its matching board`)
  assert.deepEqual(withoutSequence(shared), withoutSequence(independent), `${seed}: batch reuse changed a seeded board`)
}
assert.equal(progressReads, matureIds.length, 'eight seeded boards reread learner eligibility or progress')

const debugModel = buildDebugTrainActivity(first.question, {
  discovered,
  wordProgress,
  practiced,
  mana: {},
  formPracticed: {},
  trainRound: 20,
}, 1_000)
assert.equal(debugModel.family, TRAIN_EXERCISE_FAMILIES.wordMatching)
assert.deepEqual(debugModel.words.map(({ id }) => id).sort(), first.question.wordIds.toSorted())
assert.ok(debugModel.occurrences.every(({ source }) => source === 'word matching board'))
assert.equal(TRAIN_QUESTION_MIX_POLICY.activityBalance, TRAIN_ACTIVITY_BALANCE_POLICY)

const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
const preparation = readFileSync(new URL('../src/trainPreparation.js', import.meta.url), 'utf8')
const candidates = readFileSync(new URL('../src/game/trainCandidateContract.js', import.meta.url), 'utf8')
const question = readFileSync(new URL('../src/components/WordMatchingQuestion.jsx', import.meta.url), 'utf8')
const graph = readFileSync(new URL('../src/components/DebugLearningProgression.jsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
assert.match(candidates, /createWordMatchingRoundPlanner/)
assert.match(candidates, /add\(plan\.question, 'word-matching'/)
assert.match(preparation, /planTrainFuture/)
assert.match(practice, /from '\.\.\/trainPreparation\.js'/)
assert.match(practice, /preparation\.take\(preparationOptions\(latestState\.current\)\)/)
assert.doesNotMatch(practice, /pickBalancedTrainActivity/)
assert.doesNotMatch(preparation, /pickBalancedTrainActivity/)
assert.match(practice, /<WordMatchingQuestion/)
assert.match(practice, /type: 'PRACTICE_WORD_MATCH_RESULT'/)
assert.doesNotMatch(practice, /completeRound: false/)
assert.match(practice, /attemptedAtMs: result\.attemptedAtMs/)
assert.match(practice, /responseDurationMs: result\.responseDurationMs/)
assert.match(question, /Match the Albanian words to their meanings/)
assert.match(question, /playWord\(entry\.text\)/)
assert.match(question, /word tokens earned/)
assert.match(graph, /TRAIN_EXERCISE_FAMILIES\.wordMatching/)
assert.match(graph, /WORD_MATCHING_POLICY\.composition/)
assert.match(styles, /@media \(max-width: 560px\)[\s\S]*?\.phrase-match-board \{ grid-template-columns: minmax\(0, 1fr\) minmax\(0, 1fr\)/,
  'mobile matching no longer preserves its compact two-column pair layout')

console.log('✓ word matching builds an unambiguous five-pair adaptive board with one easy, two medium-hard and two very-hard saved words, or fails explicitly to another Train family.')
