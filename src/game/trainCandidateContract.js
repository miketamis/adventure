// Shared proposal contract for the Train planner. Exercise builders remain the
// only authority that may certify a question as playable; the planner sees a
// normalized, serializable descriptor and materializes only its selected card.

import { phraseProductionFocuses } from './phraseFocus.js'
import {
  PHRASE_PROGRESSION_POLICY,
  PHRASE_STAGE_DEFINITIONS,
  phraseProductionPlan,
  phraseSkillPlan,
} from './phraseProgression.js'
import { buildPhraseQuestion, trainQuestionWordKeys } from './phrasePractice.js'
import { trainActivityTypeId, trainQuestionTargetKeys } from './trainActivityBalance.js'
import { buildWordQuestion } from './wordPractice.js'
import { planWordMatchingRound } from './wordMatching.js'

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const TRAIN_CANDIDATE_CONTRACT = deepFreeze({
  version: 2,
  sourceOfTruth: 'fully buildable questions emitted by production exercise builders',
  selectionBoundary: 'builders enumerate; the shared planner selects; only the selected proposal materializes',
  requiredDimensions: [
    'familyId',
    'activityTypeId',
    'targetKeys',
    'rewardIds',
    'wordKeys',
    'aspectIds',
    'evidenceTrack',
    'modality',
    'difficulty',
    'urgency',
    'remediation',
    'buildabilityCertificate',
    'outcomeDeltas',
  ],
  ordinaryPlayBoundary: 'builder and planner traces are stripped from the materialized normal-play question',
})

export const TRAIN_CANDIDATE_ENUMERATION_POLICY = deepFreeze({
  version: 1,
  wordCandidates: 'one fully buildable proposal for every due discovered word target',
  phraseCandidates: 'one fully buildable proposal for every due target and unlocked evidence track',
  matchingBoards: {
    strategy: 'bounded diverse board proposals because the complete board combination space is exponential',
    maximumProposals: 8,
  },
  deterministicSeed: 'learner scheduling state plus stable candidate identity',
  rejectionAccounting: 'every builder miss is counted by family and target in the debug-only enumeration trace',
})

const stableHash = (value) => {
  let hash = 2166136261
  for (const character of String(value || '')) {
    hash ^= character.codePointAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

export function seededTrainRng(seedValue) {
  let state = stableHash(seedValue) || 0x9e3779b9
  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

export function trainPlannerSeed({
  currentRound = 0,
  discoveredIds = [],
  activityHistory = [],
  targetHistory = [],
} = {}) {
  return [
    currentRound,
    [...discoveredIds].sort().join(','),
    activityHistory.join(','),
    targetHistory.map((entry) => [...entry].sort().join('+')).join(','),
  ].join('|')
}

const safeId = (value, fallback = 'unknown') => typeof value === 'string' && value
  ? value.slice(0, 200) : fallback

const selectedAdaptation = (question) => {
  const trace = question?.debugSelection
  if (!trace) return null
  if (trace.builder === 'word') {
    return trace.candidates?.find(({ id }) => id === question.answerId)?.plan?.adaptation || null
  }
  if (trace.builder === 'phrase') {
    if (question.skill === 'production') return trace.productionPlan?.adaptation || null
    return trace.skillPlans?.[question.skill]?.adaptation || null
  }
  return null
}

const selectedTemporal = (question) => {
  const trace = question?.debugSelection
  if (!trace) return null
  if (trace.builder === 'word') {
    return trace.candidates?.find(({ id }) => id === question.answerId)?.plan?.temporal || null
  }
  if (trace.builder === 'phrase') {
    if (question.skill === 'production') return trace.productionPlan?.temporal || null
    return trace.skillPlans?.[question.skill]?.temporal || null
  }
  return null
}

const aspectIdsForQuestion = (question) => [...new Set((question?.aspectTargets || [])
  .map((target) => target?.aspectId)
  .filter(Boolean))]

const rewardIdsForQuestion = (question) => [...new Set([
  ...(question?.rewardIds || []),
  ...(question?.wordIds || []),
  ...(question?.answerId ? [question.answerId] : []),
].filter(Boolean))]

const evidenceTrackForQuestion = (question) => safeId(
  question?.evidenceTrack || question?.skill || question?.debugSelection?.selected?.plan?.evidenceTrack,
  question?.kind === 'word-match' ? 'word-matching' : 'unknown',
)

const modalityForQuestion = (question) => {
  if (question?.mode === 'listen' || question?.wordStageId?.startsWith('auditory-')) return 'listening'
  if (question?.mode === 'type') return 'typing'
  if (question?.mode === 'order' || question?.mode === 'construct') return 'construction'
  if (question?.mode === 'match' || question?.kind === 'word-match') return 'matching'
  return 'choice'
}

const familyForQuestion = (question, route) => safeId(
  question?.familyId,
  route === 'phrase' ? 'everyday-phrase' : route === 'word-matching' ? 'word-matching' : 'word',
)

const buildabilityCertificate = (question, descriptor) => {
  const checks = {
    questionObject: Boolean(question && typeof question === 'object'),
    questionKey: Boolean(typeof question?.questionKey === 'string' && question.questionKey),
    activityType: Boolean(descriptor.activityTypeId),
    targetIdentity: descriptor.targetKeys.length > 0,
    albanianSurface: descriptor.wordKeys.length > 0,
  }
  return {
    version: TRAIN_CANDIDATE_CONTRACT.version,
    builder: question?.debugSelection?.builder || descriptor.route,
    checks,
    valid: Object.values(checks).every(Boolean),
  }
}

const questionWithoutDebugTrace = (question) => {
  if (!question?.debugSelection) return question
  const ordinary = { ...question }
  delete ordinary.debugSelection
  return ordinary
}

export function createTrainCandidateProposal({ question, route, nowMs = 0 } = {}) {
  if (!question) return null
  const activityTypeId = trainActivityTypeId(question)
  const targetKeys = trainQuestionTargetKeys(question)
  const wordKeys = trainQuestionWordKeys(question)
  const rewardIds = rewardIdsForQuestion(question)
  const aspectIds = aspectIdsForQuestion(question)
  const adaptation = selectedAdaptation(question)
  const temporal = selectedTemporal(question)
  const descriptor = {
    contractVersion: TRAIN_CANDIDATE_CONTRACT.version,
    route: safeId(route),
    familyId: familyForQuestion(question, route),
    activityTypeId,
    targetKeys,
    rewardIds,
    wordKeys,
    aspectIds,
    evidenceTrack: evidenceTrackForQuestion(question),
    modality: modalityForQuestion(question),
    difficulty: {
      tier: Number.isSafeInteger(question.tier) ? question.tier : null,
      label: safeId(question.difficultyLabel, 'unlabelled'),
      variantId: safeId(question.variantId || question.wordStageId, 'unknown'),
    },
    remediation: question.remediation === true,
    urgency: {
      remediation: question.remediation === true,
      estimatedRecall: Number.isFinite(adaptation?.estimate) ? adaptation.estimate : null,
      forgettingRisk: Number.isFinite(adaptation?.estimate) ? 1 - adaptation.estimate : 0,
      uncertainty: adaptation?.uncertainty || 'unknown',
      dueAtMs: Number.isSafeInteger(temporal?.dueAtMs) ? temporal.dueAtMs : 0,
      overdueMs: Number.isSafeInteger(temporal?.dueAtMs) && temporal.dueAtMs > 0
        ? Math.max(0, nowMs - temporal.dueAtMs) : 0,
      modelId: adaptation?.modelId || null,
    },
    outcomeDeltas: {
      correct: { clearsRemediationFor: targetKeys, awardsTokensFor: rewardIds, advancesRound: 1 },
      miss: { schedulesRemediationFor: targetKeys, afterDisjointRounds: 1, advancesRound: 1 },
    },
  }
  const certificate = buildabilityCertificate(question, descriptor)
  if (!certificate.valid) return null
  const candidateId = [
    descriptor.route,
    descriptor.activityTypeId,
    [...descriptor.targetKeys].sort().join('+'),
    descriptor.difficulty.variantId,
  ].join('|')
  return {
    ...descriptor,
    candidateId,
    buildabilityCertificate: certificate,
    builderTrace: question.debugSelection || null,
    materialize: ({ debug = false, plannerTrace = null } = {}) => {
      const materialized = debug ? question : questionWithoutDebugTrace(question)
      if (!debug || !plannerTrace) return materialized
      return {
        ...materialized,
        debugSelection: {
          scheduler: plannerTrace,
          builder: question.debugSelection || null,
        },
      }
    },
  }
}

export function trainCandidateDebugRecord(proposal) {
  if (!proposal) return null
  const { materialize, builderTrace, ...serializable } = proposal
  return {
    ...serializable,
    builderStatus: builderTrace ? 'traced' : 'not-traced',
  }
}

const phraseDueRequests = (entry, state, currentRound, nowMs) => {
  const production = phraseProductionPlan(
    state.phraseProductionProgress?.[entry.id],
    phraseProductionFocuses(entry).map(({ id }) => id),
    currentRound,
    nowMs,
  )
  const requests = production?.due
    ? [{ skill: 'production', mode: PHRASE_STAGE_DEFINITIONS.production[production.stage].mode }]
    : []
  if (production?.baseStage < PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage) return requests
  const listening = phraseSkillPlan(
    state.phraseListeningProgress?.[entry.id] ?? { tier: state.phraseListeningMastery?.[entry.id] || 0 },
    'listening', currentRound, nowMs,
  )
  const matching = phraseSkillPlan(
    state.phraseMatchingProgress?.[entry.id] ?? { tier: state.phraseMatchingMastery?.[entry.id] || 0 },
    'matching', currentRound, nowMs,
  )
  if (listening.due) requests.push({ skill: 'listening', mode: 'listen' })
  if (matching.due) requests.push({ skill: 'matching', mode: 'match' })
  return requests
}

export function enumerateTrainActivityCandidates({
  state,
  discoveredIds = [],
  unlockedPhrases = [],
  nowMs = 0,
  debugTrace = false,
} = {}) {
  const currentRound = state?.trainRound || 0
  const seed = trainPlannerSeed({
    currentRound,
    discoveredIds,
    activityHistory: state?.trainActivityHistory || [],
    targetHistory: state?.trainTargetHistory || [],
  })
  const proposals = []
  const seenCandidateIds = new Set()
  const trace = {
    contract: TRAIN_CANDIDATE_CONTRACT,
    policy: TRAIN_CANDIDATE_ENUMERATION_POLICY,
    seedHash: stableHash(seed),
    attempts: [],
  }
  const add = (question, route, sourceId) => {
    const proposal = createTrainCandidateProposal({ question, route, nowMs })
    if (!proposal) {
      trace.attempts.push({ route, sourceId, status: 'rejected-not-buildable' })
      return
    }
    if (seenCandidateIds.has(proposal.candidateId)) {
      trace.attempts.push({ route, sourceId, status: 'rejected-duplicate-proposal', candidateId: proposal.candidateId })
      return
    }
    seenCandidateIds.add(proposal.candidateId)
    proposals.push(proposal)
    trace.attempts.push({ route, sourceId, status: 'enumerated', candidateId: proposal.candidateId })
  }

  for (const id of discoveredIds) {
    add(buildWordQuestion({
      discoveredIds,
      mana: state?.mana,
      practiced: state?.practiced,
      wordProgress: state?.wordProgress,
      wordExposure: state?.wordExposure,
      currentRound,
      nowMs,
      targetId: id,
      rng: seededTrainRng(`${seed}|word|${id}`),
      debugTrace: true,
    }), 'word', id)
  }

  for (const entry of unlockedPhrases) {
    for (const request of phraseDueRequests(entry, state || {}, currentRound, nowMs)) {
      add(buildPhraseQuestion(
        unlockedPhrases,
        state?.mana,
        state?.phrasePracticed,
        state?.phraseMistakes,
        {
          distractorPool: unlockedPhrases,
          targetId: entry.id,
          mode: request.mode,
          respectDueWhenForced: true,
          mastery: {
            listening: state?.phraseListeningMastery,
            matching: state?.phraseMatchingMastery,
          },
          productionProgress: state?.phraseProductionProgress,
          listeningProgress: state?.phraseListeningProgress,
          matchingProgress: state?.phraseMatchingProgress,
          currentRound,
          nowMs,
          rng: seededTrainRng(`${seed}|phrase|${entry.id}|${request.skill}`),
          debugTrace: true,
        },
      ), 'phrase', `${entry.id}:${request.skill}`)
    }
  }

  for (let index = 0; index < TRAIN_CANDIDATE_ENUMERATION_POLICY.matchingBoards.maximumProposals; index++) {
    const plan = planWordMatchingRound({
      discoveredIds,
      wordProgress: state?.wordProgress,
      wordMatchingProgress: state?.wordMatchingProgress,
      practiced: state?.practiced,
      currentRound,
      rng: seededTrainRng(`${seed}|word-matching|${index}`),
      debugTrace: true,
    })
    add(plan.question, 'word-matching', `board:${index}`)
  }

  if (!debugTrace) trace.attempts = []
  return {
    proposals,
    trace: {
      ...trace,
      counts: proposals.reduce((counts, proposal) => ({
        ...counts,
        [proposal.route]: (counts[proposal.route] || 0) + 1,
      }), {}),
      proposalCount: proposals.length,
      candidates: debugTrace ? proposals.map(trainCandidateDebugRecord) : [],
    },
  }
}
