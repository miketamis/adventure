import assert from 'node:assert/strict'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { newRun } from '../src/game/gameState.js'
import {
  TRAIN_CANDIDATE_CONTRACT,
  TRAIN_CANDIDATE_ENUMERATION_POLICY,
  createTrainCandidateProposal,
  enumerateTrainActivityCandidates,
  seededTrainRng,
  trainCandidateDebugRecord,
  trainPlannerSeed,
} from '../src/game/trainCandidateContract.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'

assert.equal(TRAIN_CANDIDATE_CONTRACT.version, 3)
assert.equal(TRAIN_CANDIDATE_ENUMERATION_POLICY.version, 2)
assert.equal(TRAIN_CANDIDATE_ENUMERATION_POLICY.matchingBoards.maximumProposals, 8)

const deterministicA = Array.from({ length: 8 }, () => seededTrainRng('same-seed')())
const rng = seededTrainRng('same-seed')
const deterministicB = Array.from({ length: 8 }, () => rng())
// Creating a new seeded generator for every sample intentionally restarts it;
// a single generator advances through one deterministic sequence.
assert.ok(deterministicA.every((value) => value === deterministicA[0]))
const rngAgain = seededTrainRng('same-seed')
assert.deepEqual(deterministicB, Array.from({ length: 8 }, () => rngAgain()))

const wordIds = ['ure', 'rruge', 'shtepi', 'uje', 'buke']
const wordQuestion = buildWordQuestion({
  discoveredIds: wordIds,
  targetId: 'ure',
  currentRound: 0,
  rng: seededTrainRng('proposal'),
  debugTrace: true,
})
const proposal = createTrainCandidateProposal({ question: wordQuestion, route: 'word', nowMs: 0 })
assert.ok(proposal)
assert.equal(proposal.buildabilityCertificate.valid, true)
assert.equal(proposal.activityTypeId, 'word-meaning:four-choice-meaning')
assert.ok(proposal.targetKeys.includes('word:ure'))
assert.ok(proposal.wordKeys.includes('urë'))
assert.ok(Number.isFinite(proposal.urgency.expectedLearningGain))
assert.ok(proposal.urgency.expectedLearningGain >= 0 && proposal.urgency.expectedLearningGain <= 1)
assert.ok(Number.isFinite(proposal.urgency.uncertaintyReduction))
assert.equal(proposal.urgency.modelId, 'interpretable-cold-start-v1')
assert.equal(typeof proposal.materialize, 'function')
assert.equal(proposal.materialize().debugSelection, undefined)
assert.equal(proposal.materialize({ debug: true }).debugSelection.builder, 'word')
assert.equal(trainCandidateDebugRecord(proposal).materialize, undefined)

const phrase = EVERYDAY_PHRASE_DRILLS.find(({ id }) => id === 'going-village')
assert.ok(phrase)
const discoveredIds = [...new Set([...wordIds, ...phrase.requires])]
const state = {
  ...newRun(),
  discovered: Object.fromEntries(discoveredIds.map((id) => [id, true])),
}
const seed = trainPlannerSeed({ currentRound: 0, discoveredIds })
assert.equal(seed, trainPlannerSeed({ currentRound: 0, discoveredIds: [...discoveredIds].reverse() }))

const first = enumerateTrainActivityCandidates({
  state,
  discoveredIds,
  unlockedPhrases: [phrase],
  nowMs: 0,
  debugTrace: true,
})
const second = enumerateTrainActivityCandidates({
  state,
  discoveredIds,
  unlockedPhrases: [phrase],
  nowMs: 0,
  debugTrace: true,
})
assert.ok(first.proposals.filter(({ route }) => route === 'word').length >= wordIds.length)
assert.ok(first.proposals.some(({ route }) => route === 'phrase'))
assert.equal(first.trace.proposalCount, first.proposals.length)
assert.equal(new Set(first.proposals.map(({ candidateId }) => candidateId)).size, first.proposals.length)
assert.deepEqual(
  first.proposals.map(({ candidateId }) => candidateId),
  second.proposals.map(({ candidateId }) => candidateId),
  'the same scheduling state did not enumerate the same candidate identities',
)
for (const candidate of first.proposals) {
  for (const dimension of TRAIN_CANDIDATE_CONTRACT.requiredDimensions) {
    assert.notEqual(candidate[dimension], undefined, `${candidate.candidateId} omitted ${dimension}`)
  }
  assert.equal(candidate.buildabilityCertificate.valid, true)
}

const unavailablePhraseState = {
  ...state,
  phraseProductionProgress: {
    [phrase.id]: { dueAfterRound: 10 },
  },
}
const unavailable = enumerateTrainActivityCandidates({
  state: unavailablePhraseState,
  discoveredIds,
  unlockedPhrases: [phrase],
  nowMs: 0,
})
assert.equal(unavailable.proposals.some(({ route }) => route === 'phrase'), false,
  'forced phrase enumeration bypassed the production due gate')

console.log(`✓ Train candidate contract enumerated ${first.proposals.length} stable, certified word/phrase proposals without leaking builder traces into normal play.`)
