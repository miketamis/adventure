// Contract for the lexical evidence ladder. This exercises the same pure state
// machine and question builder used by Train, plus reducer persistence edges.

import assert from 'node:assert/strict'
import { formsUnlocked } from '../src/game/formInventory.js'
import { newRun, normalizeSavedState, reducer } from '../src/game/gameState.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import {
  WORD_PROGRESS_VERSION,
  WORD_STAGE_DEFINITIONS,
  WORD_SKILL_MAX_TIER,
  advanceWordProgress,
  completedWordProgress,
  wordProgressPlan,
  wordProgressStage,
} from '../src/game/wordProgression.js'

const id = 'fshat'
const makeQuestion = (progress, currentRound, targetId = id) => buildWordQuestion({
  discoveredIds: [targetId],
  mana: {},
  wordProgress: { [targetId]: progress },
  currentRound,
  rng: () => 0.25,
})

const first = makeQuestion(null, 0)
assert.equal(first.tier, 0)
assert.equal(first.dir, 'al2en')
assert.equal(first.mode, 'choice')
assert.equal(first.options.length, 2, 'a new word did not begin with two choices')

let progress = null
let round = 0
let sequence = 0
for (const definition of WORD_STAGE_DEFINITIONS.slice(0, -1)) {
  const required = definition.gate.wins
  for (let win = 0; win < required; win++) {
    const plan = wordProgressPlan(progress, round)
    round = Math.max(round, plan.dueAfterRound)
    const duePlan = wordProgressPlan(progress, round)
    assert.equal(duePlan.tier, definition.tier)
    assert.equal(duePlan.mode, definition.mode)
    assert.equal(duePlan.direction, definition.direction)
    const question = makeQuestion(progress, round)
    assert.equal(question.tier, definition.tier)
    if (definition.mode === 'choice') {
      assert.equal(question.options.length, definition.variant.distractors + 1)
    } else {
      assert.equal(question.kind, 'word-spelling')
      assert.equal(question.answerTolerance, definition.answerTolerance)
    }
    const result = advanceWordProgress(progress, round, {
      correct: true,
      tier: question.tier,
      mode: question.mode,
      direction: question.dir,
      questionKey: `word-audit-${sequence++}`,
      round: round + 1,
    })
    assert.equal(result.accepted, true)
    progress = result.progress
    round += 1
    assert.equal(wordProgressPlan(progress, round).due, false, 'same word repeated without a disjoint round')
    round += 1
  }
}
assert.equal(wordProgressStage(progress), WORD_SKILL_MAX_TIER)
const retained = wordProgressPlan(progress, round)
assert.equal(retained.mode, 'type')
assert.equal(retained.answerTolerance, 'strict')
assert.ok(retained.dueAfterRound > round, 'strict spelling did not receive an initial review gap')

const beforeMiss = wordProgressPlan(progress, retained.dueAfterRound)
const missed = advanceWordProgress(progress, retained.dueAfterRound, {
  correct: false,
  tier: beforeMiss.tier,
  mode: beforeMiss.mode,
  direction: beforeMiss.direction,
  questionKey: 'word-audit-retention-miss',
  round: retained.dueAfterRound + 1,
})
assert.equal(missed.accepted, true)
assert.equal(missed.progress.remediation.stage, 2)
assert.equal(wordProgressStage(missed.progress), WORD_SKILL_MAX_TIER, 'a lapse erased completed proofs')
const repairRound = missed.progress.remediation.dueAfterRound
const repair = wordProgressPlan(missed.progress, repairRound)
assert.equal(repair.remediation, true)
assert.equal(repair.direction, 'en2al')
assert.equal(repair.mode, 'choice')

const context = makeQuestion(null, 0, 'po_yes')
assert.equal(context.kind, 'ctx')
assert.equal(context.options.length, 2)
assert.match(context.ctx.en, /__/)

assert.equal(makeQuestion(null, 0)?.answerId, id)
assert.equal(buildWordQuestion({
  discoveredIds: [id],
  wordProgress: {},
  currentRound: 0,
  excludeWords: ['fshat'],
}), null, 'the no-repeat boundary ignored the target word')

const fresh = newRun()
const migrated = normalizeSavedState({
  ...fresh,
  discovered: { [id]: true },
  practiced: { [id]: 99 },
  wordProgressVersion: 0,
  wordProgress: { [id]: completedWordProgress() },
}, fresh)
assert.equal(migrated.wordProgressVersion, WORD_PROGRESS_VERSION)
assert.deepEqual(migrated.wordProgress, {}, 'legacy mixed totals became invented skill evidence')

const mastered = completedWordProgress(20)
const restored = normalizeSavedState({
  ...fresh,
  discovered: { [id]: true },
  practiced: { [id]: 9 },
  wordProgressVersion: WORD_PROGRESS_VERSION,
  wordProgress: { [id]: mastered },
  trainRound: 20,
}, fresh)
assert.equal(wordProgressStage(restored.wordProgress[id]), WORD_SKILL_MAX_TIER)
assert.equal(formsUnlocked(restored, id), true)

const question = first
const playable = { ...fresh, discovered: { [id]: true } }
const answered = reducer(playable, {
  type: 'PRACTICE_WORD_RESULT',
  correct: true,
  id,
  tier: question.tier,
  mode: question.mode,
  direction: question.dir,
  questionKey: question.questionKey,
  wordKeys: [id],
})
assert.equal(answered.mana[id], 1)
assert.equal(answered.practiced[id], 1)
assert.equal(answered.trainRound, 1)
assert.equal(wordProgressStage(answered.wordProgress[id]), 1)
assert.strictEqual(reducer(answered, {
  type: 'PRACTICE_WORD_RESULT',
  correct: true,
  id,
  tier: question.tier,
  mode: question.mode,
  direction: question.dir,
  questionKey: question.questionKey,
  wordKeys: [id],
}), answered, 'a duplicate result awarded twice')

console.log(`${WORD_STAGE_DEFINITIONS.length} lexical stages verified: guided recognition → independent recognition → guided selection → independent selection → supported spelling → retained spelling.`)
