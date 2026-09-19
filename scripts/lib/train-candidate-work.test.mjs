import assert from 'node:assert/strict'
import test from 'node:test'
import { Worker } from 'node:worker_threads'
import { EVERYDAY_PHRASE_DRILLS } from '../../src/game/everydayAlbanian.js'
import { newRun } from '../../src/game/gameState.js'
import {
  completeTrainCandidateWork,
  TRAIN_CANDIDATE_WORK_SLICE_MS,
} from '../../src/trainCandidateWork.js'

const phrase = EVERYDAY_PHRASE_DRILLS.find(({ id }) => id === 'going-village')
const wordIds = ['fshat', 'ure', 'rruge', 'shtepi', 'uje', 'buke', 'kripe', 'dritare', 'liber', 'shishe', 'cakmak', 'mal']
const discoveredIds = [...new Set([...wordIds, ...phrase.requires])]
const fixture = (experienced) => ({
  state: {
    ...newRun(),
    discovered: Object.fromEntries(discoveredIds.map((id) => [id, true])),
    trainRound: experienced ? 20 : 0,
    ...(experienced ? {
      practiced: Object.fromEntries(discoveredIds.map((id, index) => [id, index])),
      wordProgress: Object.fromEntries(discoveredIds.map((id) => [id, {
        wins: { 'meaning-recognition': 2 }, contextWins: {}, formProofs: {}, strictWins: 0, dueAfterRound: 0,
      }])),
    } : {}),
  },
  discoveredIds,
  unlockedPhrases: [phrase],
  nowMs: 1_000,
})

// Each builder intentionally gives questions a fresh module-local receipt
// sequence. Separate fresh runtimes let us compare every field, including that
// sequence, instead of deleting identity fields to make parity appear to pass.
const isolatedEnumeration = (options, sliced) => new Promise((resolve, reject) => {
  const worker = new Worker(`
    const { parentPort, workerData } = await import('node:worker_threads')
    const { enumerateTrainActivityCandidates, trainCandidateDebugRecord } = await import(${JSON.stringify(new URL('../../src/game/trainCandidateContract.js', import.meta.url).href)})
    const { completeTrainCandidateWork, TRAIN_CANDIDATE_WORK_SLICE_MS } = await import(${JSON.stringify(new URL('../../src/trainCandidateWork.js', import.meta.url).href)})
    const deepFreeze = (value) => {
      if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
      for (const child of Object.values(value)) deepFreeze(child)
      return Object.freeze(value)
    }
    const before = JSON.stringify(workerData.options)
    deepFreeze(workerData.options.state)
    let ticks = 0
    let yields = 0
    let slices = 0
    const enumeration = workerData.sliced
      ? await completeTrainCandidateWork(workerData.options, {
        clock: () => ticks += TRAIN_CANDIDATE_WORK_SLICE_MS,
        yieldControl: async () => { yields++ },
        measureSlice: (work) => { slices++; return work() },
      })
      : enumerateTrainActivityCandidates(workerData.options)
    parentPort.postMessage({
      proposals: enumeration.proposals.map(trainCandidateDebugRecord),
      trace: enumeration.trace,
      normalQuestions: enumeration.proposals.map((proposal) => proposal.materialize()),
      debugQuestions: enumeration.proposals.map((proposal) => proposal.materialize({ debug: true })),
      yields,
      slices,
      unchanged: JSON.stringify(workerData.options) === before,
    })
  `, { eval: true, workerData: { options, sliced } })
  let result
  worker.once('message', (message) => { result = message })
  worker.once('error', reject)
  worker.once('exit', (code) => {
    if (code !== 0 || !result) reject(new Error(`isolated candidate builder failed (${code})`))
    else resolve(result)
  })
})

for (const experienced of [false, true]) for (const debugTrace of [false, true]) {
  test(`yielding preserves exact ${experienced ? 'experienced' : 'new'} candidates and ${debugTrace ? 'debug' : 'normal'} questions`, async () => {
    const options = { ...fixture(experienced), debugTrace }
    const before = JSON.stringify(options)
    const [synchronous, asynchronous] = await Promise.all([
      isolatedEnumeration(options, false),
      isolatedEnumeration(options, true),
    ])
    assert.ok(asynchronous.yields > 1, 'the fixture never crossed a scheduling slice')
    assert.equal(asynchronous.slices, asynchronous.yields + 1, 'a slice ran without a measured work boundary')
    assert.ok(asynchronous.proposals.some(({ route }) => route === 'word'))
    assert.ok(asynchronous.proposals.some(({ route }) => route === 'phrase'))
    if (experienced) assert.ok(asynchronous.proposals.some(({ route }) => route === 'word-matching'))
    assert.deepEqual(asynchronous.trace, synchronous.trace)
    assert.deepEqual(asynchronous.proposals, synchronous.proposals)
    for (const mode of ['normalQuestions', 'debugQuestions']) {
      assert.equal(asynchronous[mode].length, synchronous[mode].length)
      for (const [index, question] of asynchronous[mode].entries()) {
        assert.deepEqual(question, synchronous[mode][index],
          `yielding changed ${mode} candidate ${index}'s answer, distractor, reward, identity, or diagnostic`)
      }
    }
    assert.equal(asynchronous.unchanged, true, 'sliced construction published learning or presentation state')
    assert.equal(synchronous.unchanged, true, 'synchronous construction published learning or presentation state')
    assert.equal(JSON.stringify(options), before, 'candidate work published learning or presentation state')
  })
}

test('cancellation before the first slice does not start a builder or instrumentation', async () => {
  const options = { state: { get trainRound() { throw new Error('cancelled work started building') } } }
  const result = await completeTrainCandidateWork(options, {
    isCancelled: () => true,
    clock: () => assert.fail('cancelled work read its clock'),
    measureSlice: () => assert.fail('cancelled work started a measured slice'),
    yieldControl: () => assert.fail('cancelled work scheduled a continuation'),
  })
  assert.equal(result, null, 'cancelled work returned a publishable candidate bank')
})

test('cancellation between slices abandons the partial bank before another target builds', async () => {
  const options = fixture(false)
  const before = JSON.stringify(options)
  let cancelled = false
  let reads = 0
  let slices = 0
  let ticks = 0
  const originalProgress = options.state.wordProgress
  Object.defineProperty(options.state, 'wordProgress', {
    enumerable: true,
    get() {
      assert.equal(cancelled, false, 'another builder ran after navigation cancelled the work')
      reads++
      return originalProgress
    },
  })
  const result = await completeTrainCandidateWork(options, {
    isCancelled: () => cancelled,
    clock: () => ticks += TRAIN_CANDIDATE_WORK_SLICE_MS,
    measureSlice: (work) => { slices++; return work() },
    yieldControl: async () => { cancelled = true },
  })
  assert.ok(reads > 0, 'the cancellation fixture did not exercise a production builder')
  assert.equal(slices, 1, 'cancelled work resumed another measured slice')
  assert.equal(result, null, 'partial candidates escaped cancellation')
  cancelled = false
  assert.equal(JSON.stringify(options), before, 'cancelled candidate work mutated learner state')
})

test('cancellation arriving before a measured slice executes still prevents its first build', async () => {
  let cancelled = false
  const result = await completeTrainCandidateWork({
    state: { get trainRound() { throw new Error('stale measured work started building') } },
  }, {
    isCancelled: () => cancelled,
    clock: () => 0,
    measureSlice: (work) => { cancelled = true; return work() },
    yieldControl: () => assert.fail('cancelled work scheduled a continuation'),
  })
  assert.equal(result, null)
})

test('a failed continuation rejects rather than returning a partial bank', async () => {
  const failure = new Error('continuation unavailable')
  let ticks = 0
  await assert.rejects(completeTrainCandidateWork(fixture(false), {
    clock: () => ticks += TRAIN_CANDIDATE_WORK_SLICE_MS,
    yieldControl: async () => { throw failure },
  }), (error) => error === failure)
})

test('the default posted-task continuation completes a production bank and releases its ports', { timeout: 5000 }, async () => {
  let ticks = 0
  let slices = 0
  const result = await completeTrainCandidateWork(fixture(false), {
    clock: () => ticks += TRAIN_CANDIDATE_WORK_SLICE_MS,
    measureSlice: (work) => { slices++; return work() },
  })
  assert.ok(slices > 1, 'the default continuation was never needed')
  assert.ok(result.proposals.length > 0, 'the posted-task driver lost its completed bank')
  // The parent release gate also requires this process to terminate normally;
  // live MessagePorts would keep it running after all assertions complete.
})
