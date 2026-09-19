import assert from 'node:assert/strict'
import test from 'node:test'
import { newRun } from '../../src/game/gameState.js'
import { STORY } from '../../src/game/content.js'
import { trainingTargetForOption } from '../../src/game/trainingTarget.js'
import { completeTrainCandidateWork } from '../../src/trainCandidateWork.js'
import { EVERYDAY_PHRASE_DRILLS } from '../../src/game/everydayAlbanian.js'
import { isTrainableSense } from '../../src/game/lexicalTrainability.js'
import { enumerateTrainActivityCandidates, trainCandidateDebugRecord, trainPlannerSeed } from '../../src/game/trainCandidateContract.js'
import { initialTrainPlanningState, planTrainFuture, planTrainFutureExact, trainPlannerOracleReport } from '../../src/game/trainFuturePlanner.js'
import { trainActionPracticeQueue, trainActionGoalForState, normalizeTrainActionGoalSession, trainActionLastResortProposal } from '../../src/game/trainActionGoal.js'
import { createTrainPreparationCache, createTrainPresentationMemory, prepareTrainQuestion, TRAIN_PREPARATION_MAX_AGE_MS } from '../../src/trainPreparation.js'

const NOW = 1_800_000_000_000
const words = ['ure', 'rruge', 'shtepi', 'uje', 'buke']
const fixture = () => ({ ...newRun(), discovered: Object.fromEntries(words.map((id) => [id, true])) })
const withoutSequence = (value) => JSON.parse(JSON.stringify(value, (key, child) =>
  key === 'questionKey' && typeof child === 'string' ? child.replace(/:\d+$/, ':sequence') : child))
const withoutTiming = (value) => JSON.parse(JSON.stringify(value, (key, child) =>
  key === 'elapsedMilliseconds' ? undefined : child))

test('background preparation preserves the canonical bank, seeded choice and debug oracle without recording progress', async () => {
  for (const debug of [false, true]) {
    const state = { ...fixture(), debug }
    const before = structuredClone(state)
    const discoveredIds = Object.keys(state.discovered).filter(isTrainableSense)
    const unlockedPhrases = EVERYDAY_PHRASE_DRILLS.filter((entry) =>
      entry.requires.filter(isTrainableSense).every((id) => state.discovered[id]))
    const activityHistory = ['word-meaning:four-choice-meaning']
    const targetHistory = [['word:ure', 'surface:urë']]
    const lastWordKeys = ['urë']
    const actionGoal = trainActionGoalForState(state)
    const goalSession = normalizeTrainActionGoalSession(state.trainGoalSession, state)
    const queue = trainActionPracticeQueue(state)
    const enumeration = enumerateTrainActivityCandidates({
      state, discoveredIds, unlockedPhrases, forceGoalTargetIds: queue.allRemainingWordIds,
      nowMs: NOW, debugTrace: debug,
    })
    const planningState = initialTrainPlanningState({
      currentRound: state.trainRound, activityHistory, targetHistory, lastWordKeys,
      goalRemaining: queue.priorityRemainingWordIds,
      alternateGoalRemaining: queue.currentRemainingWordIds.length ? queue.otherRemainingWordIds : [],
      goalMaximumDiversionRounds: queue.maximumDiversionRounds,
      goalDiversionsUsed: actionGoal?.remainingTokenCount ? goalSession?.activitiesSinceGoalOpportunity : 0,
    })
    const seed = trainPlannerSeed({ currentRound: state.trainRound, discoveredIds, activityHistory, targetHistory })
    const future = planTrainFuture({ proposals: enumeration.proposals, planningState, seed })
    const selected = future.candidate || trainActionLastResortProposal(enumeration.proposals, queue.priorityRemainingWordIds)
    const prepared = await prepareTrainQuestion({ state, activityHistory, targetHistory, lastWordKeys, nowMs: NOW })
    assert.ok(prepared.question)
    assert.deepEqual(prepared.schedulerTrace.selected, trainCandidateDebugRecord(selected))
    assert.deepEqual(prepared.schedulerTrace.enumeration, enumeration.trace)
    assert.deepEqual(prepared.schedulerTrace.future.score, future.trace.score)
    assert.deepEqual(prepared.wordKeys, selected.wordKeys)
    assert.deepEqual(prepared.targetKeys, selected.targetKeys)
    assert.equal(prepared.question.trainHealth, undefined, 'health belongs to the claim state')
    assert.equal(prepared.plannedAtMs, NOW)
    assert.equal(prepared.validUntilMs, NOW + TRAIN_PREPARATION_MAX_AGE_MS)
    if (debug) {
      const exact = planTrainFutureExact({ proposals: enumeration.proposals, planningState, seed })
      assert.deepEqual(withoutTiming(prepared.schedulerTrace.future.exactOracle), withoutTiming(exact.trace))
      assert.deepEqual(withoutTiming(prepared.schedulerTrace.future.oracleReport), withoutTiming(trainPlannerOracleReport(future, exact, planningState)))
    } else {
      assert.equal(prepared.question.debugSelection, undefined)
    }
    assert.deepEqual(withoutSequence(prepared.question), withoutSequence(selected.materialize({
      debug, plannerTrace: prepared.schedulerTrace,
    })))
    assert.deepEqual(state, before, 'warming a card changed the learner or story state')
  }
})

const resultAt = (nowMs, questionKey = 'prepared:1') => ({
  question: { questionKey }, plannedAtMs: nowMs, validUntilMs: nowMs + TRAIN_PREPARATION_MAX_AGE_MS,
})

test('an unanswered card stays disjoint across navigation without recording an attempt', async () => {
  const state = fixture()
  const memory = createTrainPresentationMemory()
  const shown = await prepareTrainQuestion({ state, nowMs: NOW })
  memory.remember(state, shown.wordKeys)
  const inStory = { ...state, view: 'story' }
  assert.deepEqual(memory.lastWordKeys(inStory), shown.wordKeys)
  const returned = await prepareTrainQuestion({
    state: { ...inStory, view: 'practice' }, lastWordKeys: memory.lastWordKeys(inStory), nowMs: NOW,
  })
  assert.ok(returned.wordKeys.every((word) => !shown.wordKeys.includes(word)),
    'navigation away and back repeated language from an unanswered card')
  assert.deepEqual(state.trainLastWords, [], 'presentation must not manufacture a completed attempt')
  const completed = { ...state, trainRound: state.trainRound + 1, trainLastWords: ['bukë'] }
  assert.deepEqual(memory.lastWordKeys(completed), ['bukë'])
  memory.remember(completed, ['ujë'])
  assert.deepEqual(memory.lastWordKeys({ ...completed, storyRunSequence: state.storyRunSequence + 1, trainLastWords: [] }), [])
})

test('cache shares work across presentation-only updates and consumes a prepared card once', async () => {
  const state = fixture()
  let calls = 0
  const cache = createTrainPreparationCache({ clock: () => NOW, prepare: async ({ nowMs }) => {
    calls++
    return resultAt(nowMs)
  } })
  const first = cache.prepare({ state })
  const navigating = { ...state, view: 'practice', hearts: 1, trainHealingStreak: 5, trainCorrectCombo: 5 }
  assert.equal(cache.prepare({ state: navigating }), first)
  const result = await first
  assert.equal(calls, 1)
  assert.equal(cache.peek({ state: navigating }), result)
  assert.equal(cache.take({ state: navigating }), result)
  assert.equal(cache.take({ state: navigating }), null)
  assert.equal(cache.peek({ state }), null)
})

test('every learner input, goal, reset and effective history invalidates the cached decision', async () => {
  const state = fixture()
  const fields = [
    'discovered', 'mana', 'practiced', 'wordProgress', 'wordExposure', 'phrasePracticed', 'phraseMistakes',
    'phraseProductionProgress', 'phraseListeningProgress', 'phraseMatchingProgress',
    'phraseListeningMastery', 'phraseMatchingMastery', 'wordMatchingProgress',
  ]
  const mutations = [
    ...fields.map((field) => ({ state: { ...state, [field]: { ...state[field] } } })),
    { state: { ...state, trainRound: state.trainRound + 1 } },
    { state: { ...state, storyRunSequence: state.storyRunSequence + 1 } },
    { state: { ...state, nodeId: 'different-node' } },
    { state: { ...state, debug: !state.debug } },
    { state: { ...state, practiceTarget: { nodeId: 'start', optionIdentity: 'other' } } },
    { state: { ...state, trainGoalSession: { activitiesSinceGoalOpportunity: 1 } } },
    { state: { ...state, trainActivityHistory: ['word-meaning:four-choice-meaning'] } },
    { state: { ...state, trainTargetHistory: [['word:ure']] } },
    { state: { ...state, trainLastWords: ['urë'] } },
    { state, activityHistory: ['word-meaning:four-choice-meaning'] },
    { state, targetHistory: [['word:ure']] },
    { state, lastWordKeys: ['urë'] },
    { state, discoveredIds: [...words].reverse() },
  ]
  const cache = createTrainPreparationCache({ clock: () => NOW, prepare: async ({ nowMs }) => resultAt(nowMs) })
  await cache.prepare({ state })
  for (const options of mutations) assert.equal(cache.peek(options), null)
  assert.ok(cache.peek({ state }), 'checking another scope should not destroy a ready result')
})

test('superseded work cancels cooperatively and cannot publish over the new decision', async () => {
  const state = fixture()
  const pending = []
  const cache = createTrainPreparationCache({ clock: () => NOW, prepare: (options, work) => new Promise((resolve) => {
    pending.push({ options, work, resolve })
  }) })
  const first = cache.prepare({ state })
  await Promise.resolve()
  const nextState = { ...state, trainRound: state.trainRound + 1 }
  const second = cache.prepare({ state: nextState })
  await Promise.resolve()
  assert.equal(pending[0].work.isCancelled(), true)
  assert.equal(pending[1].work.isCancelled(), false)
  pending[1].resolve(resultAt(NOW, 'new'))
  const result = await second
  pending[0].resolve(resultAt(NOW, 'obsolete'))
  assert.equal(await first, null)
  assert.equal(cache.peek({ state: nextState }), result)
  cache.cancel()
  assert.equal(cache.peek({ state: nextState }), null)
})

test('clock expiry, an upcoming due gate and a wall-clock rollback reject stale decisions', async () => {
  let now = NOW
  const state = fixture()
  const cache = createTrainPreparationCache({ clock: () => now })
  const result = await cache.prepare({ state })
  assert.ok(result)
  now = NOW + TRAIN_PREPARATION_MAX_AGE_MS
  assert.equal(cache.peek({ state }), null)
  now = NOW - 1
  assert.equal(cache.peek({ state }), null)
  now = NOW
  const timed = { ...state, wordProgress: { ure: { temporal: { dueAtMs: NOW + 1000 } } } }
  const timedResult = await cache.prepare({ state: timed })
  assert.equal(timedResult.validUntilMs, NOW + 1000)
  now += 1000
  assert.equal(cache.take({ state: timed }), null)
})

test('canceled preparation leaves no poisoned promise and can be retried', async () => {
  const state = fixture()
  let calls = 0
  const cache = createTrainPreparationCache({ clock: () => NOW, prepare: async ({ nowMs }) =>
    ++calls === 1 ? null : resultAt(nowMs) })
  assert.equal(await cache.prepare({ state }), null)
  assert.ok(await cache.prepare({ state }))
  assert.equal(calls, 2)
})

const goalFixture = () => {
  // Keep the exact oracle below its runtime budget: the complete first-action
  // goal and three other words still exercise bank reuse and goal priority.
  const ids = ['kalo', 'ure', 'rruge', 'buke', 'uje']
  const state = { ...newRun(), discovered: Object.fromEntries(ids.map((id) => [id, true])) }
  const goal = { ...state, practiceTarget: trainingTargetForOption('start', STORY.start.options[1]) }
  return { state, goal }
}

test('a story-action goal reuses its exact bank and original time while replanning canonical selection', async () => {
  const { state, goal } = goalFixture()
  assert.deepEqual([...trainActionPracticeQueue(state).allRemainingWordIds].sort(),
    [...trainActionPracticeQueue(goal).allRemainingWordIds].sort())
  let now = NOW
  let enumerations = 0
  const cache = createTrainPreparationCache({ clock: () => now, enumerate: (options, work) => {
    enumerations++
    return completeTrainCandidateWork(options, work)
  } })
  const generic = await cache.prepare({ state })
  now += 1000
  const focused = await cache.prepare({ state: goal })
  assert.equal(enumerations, 1, 'changing only goal priority rebuilt the unchanged candidate bank')
  assert.equal(focused.plannedAtMs, generic.plannedAtMs)
  assert.equal(focused.validUntilMs, generic.validUntilMs)
  assert.equal(focused.schedulerTrace.nowMs, NOW)
  assert.deepEqual(focused.schedulerTrace.actionGoal.target, goal.practiceTarget)
  const independent = await prepareTrainQuestion({ state: goal, nowMs: NOW })
  assert.deepEqual(withoutTiming(withoutSequence(focused)), withoutTiming(withoutSequence(independent)),
    'bank reuse changed the goal decision, complete question, candidate accounting or trace')
  now = generic.validUntilMs
  const refreshed = await cache.prepare({ state: goal })
  assert.equal(enumerations, 2, 'expired eligibility/urgency must be rebuilt')
  assert.equal(refreshed.plannedAtMs, now)
})

test('bank reuse invalidates every candidate input but preserves changed local planner histories', async () => {
  const { state, goal } = goalFixture()
  let enumerations = 0
  const cache = createTrainPreparationCache({ clock: () => NOW, enumerate: async () => {
    enumerations++
    return { proposals: [], trace: {} }
  } })
  await cache.prepare({ state })
  await cache.prepare({ state: goal, lastWordKeys: ['urë'], activityHistory: ['word-meaning:four-choice-meaning'], targetHistory: [['word:ure']] })
  assert.equal(enumerations, 1, 'selection-only history or exclusion changed candidate construction')
  const fields = [
    'discovered', 'mana', 'practiced', 'wordProgress', 'wordExposure', 'phrasePracticed', 'phraseMistakes',
    'phraseProductionProgress', 'phraseListeningProgress', 'phraseMatchingProgress',
    'phraseListeningMastery', 'phraseMatchingMastery', 'wordMatchingProgress',
  ]
  for (const field of fields) {
    await cache.prepare({ state })
    const changed = { ...state, [field]: { ...state[field] } }
    const before = enumerations
    await cache.prepare({ state: changed })
    assert.equal(enumerations, before + 1, `${field} reused a bank built from different learner evidence`)
  }
  for (const changed of [
    { ...state, nodeId: 'no-visible-actions' }, // changes forced early-due targets
    { ...state, trainRound: 1 },
    { ...state, storyRunSequence: 2 },
    { ...state, trainActivityHistory: ['word-meaning:four-choice-meaning'] },
    { ...state, trainTargetHistory: [['word:ure']] },
    { ...state, debug: true },
  ]) {
    await cache.prepare({ state })
    const before = enumerations
    await cache.prepare({ state: changed })
    assert.equal(enumerations, before + 1)
  }
})

test('changing goal during background work shares enumeration while canceling only obsolete selection', async () => {
  const { state, goal } = goalFixture()
  const pending = []
  const cache = createTrainPreparationCache({ clock: () => NOW, enumerate: (options, work) => new Promise((resolve) => {
    pending.push({ options, work, resolve })
  }) })
  const generic = cache.prepare({ state })
  for (let turn = 0; turn < 3; turn++) await Promise.resolve()
  assert.equal(pending.length, 1)
  const focused = cache.prepare({ state: goal })
  for (let turn = 0; turn < 3; turn++) await Promise.resolve()
  assert.equal(pending.length, 1, 'goal navigation restarted the bank instead of sharing in-flight work')
  assert.equal(pending[0].work.isCancelled(), false)
  pending[0].resolve({ proposals: [], trace: {} })
  assert.equal(await generic, null)
  assert.ok(await focused)
  assert.ok(cache.peek({ state: goal }))
  const changed = cache.prepare({ state: { ...goal, wordProgress: {} } })
  for (let turn = 0; turn < 3; turn++) await Promise.resolve()
  assert.equal(pending.length, 2)
  cache.cancel()
  assert.equal(pending[1].work.isCancelled(), true)
  pending[1].resolve({ proposals: [], trace: {} })
  assert.equal(await changed, null)
})
