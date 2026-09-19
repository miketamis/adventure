import { EVERYDAY_PHRASE_DRILLS } from './game/everydayAlbanian.js'
import { isTrainableSense } from './game/lexicalTrainability.js'
import { TRAIN_SCHEDULER_SAFEGUARDS } from './game/trainingProgression.js'
import { normalizeTrainActivityHistory, normalizeTrainTargetHistory } from './game/trainActivityHistory.js'
import { trainCandidateDebugRecord, trainPlannerSeed } from './game/trainCandidateContract.js'
import {
  initialTrainPlanningState,
  planTrainFuture,
  planTrainFutureExact,
  trainPlannerOracleReport,
} from './game/trainFuturePlanner.js'
import {
  normalizeTrainActionGoalSession,
  trainActionGoalForState,
  trainActionLastResortProposal,
  trainActionPracticeQueue,
} from './game/trainActionGoal.js'
import { completeTrainCandidateWork } from './trainCandidateWork.js'

// A prepared question is a decision made at plannedAtMs, not a claim that the
// time-dependent ranking remains identical forever. Refresh before a spacing
// gate opens, and bound ordinary drift in the continuous recall estimates.
export const TRAIN_PREPARATION_MAX_AGE_MS = 30_000

// Presentation is intentionally not a completed attempt. Remember its language
// across Train unmounts without writing learner progress or changing the save
// format. Once the round advances, the reducer's completed-word list owns the
// exclusion again; a new run discards the previous run's visible card.
export function createTrainPresentationMemory() {
  let presented = null
  const identity = (state) => [state.storyRunSequence || 1, state.trainRound || 0]
  return {
    remember(state, wordKeys) {
      presented = { identity: identity(state), wordKeys: [...wordKeys] }
    },
    lastWordKeys(state) {
      const current = identity(state)
      if (presented && presented.identity.every((value, index) => value === current[index])) {
        return presented.wordKeys
      }
      presented = null
      return state.trainLastWords || []
    },
  }
}

const LEARNER_MAPS = Object.freeze([
  'discovered', 'mana', 'practiced', 'wordProgress', 'wordExposure',
  'phrasePracticed', 'phraseMistakes', 'phraseProductionProgress',
  'phraseListeningProgress', 'phraseMatchingProgress',
  'phraseListeningMastery', 'phraseMatchingMastery', 'wordMatchingProgress',
])
const TIMED_PROGRESS_MAPS = Object.freeze([
  'wordProgress', 'phraseProductionProgress', 'phraseListeningProgress', 'phraseMatchingProgress',
])
const run = (_name, work) => work()

const schedulingHistories = ({ state, activityHistory, targetHistory, lastWordKeys }) => ({
  recentActivityHistory: normalizeTrainActivityHistory(activityHistory ?? state.trainActivityHistory),
  recentTargetHistory: normalizeTrainTargetHistory(targetHistory ?? state.trainTargetHistory),
  excludedWordKeys: [...(lastWordKeys ?? state.trainLastWords ?? [])],
})

// Reducer-owned maps are immutable. Compare their references instead of
// serializing the full learner profile on every render or navigation. Only the
// small, bounded histories and goal identity need value comparisons.
function preparationScope(options) {
  const { state, discoveredIds, unlockedPhrases, nowMs } = options
  const histories = schedulingHistories(options)
  return {
    references: [...LEARNER_MAPS.map((key) => state[key]), ...(unlockedPhrases || [])],
    values: JSON.stringify({
      run: state.storyRunSequence,
      round: state.trainRound,
      debug: Boolean(state.debug),
      node: state.nodeId,
      goal: state.practiceTarget ?? null,
      goalSession: state.trainGoalSession ?? null,
      // Enumeration uses persisted histories; selection can use the local
      // presented-card histories before their reducer action has committed.
      enumerationHistory: state.trainActivityHistory ?? [],
      enumerationTargets: state.trainTargetHistory ?? [],
      ...histories,
      discoveredIds,
      unlockedPhraseIds: unlockedPhrases?.map(({ id }) => id),
      explicitTime: nowMs,
    }),
  }
}

const sameScope = (left, right) => left.values === right.values &&
  left.references.length === right.references.length &&
  left.references.every((value, index) => value === right.references[index])

function enumerationScope({ state, discoveredIds, unlockedPhrases, forceGoalTargetIds, debugTrace }) {
  return {
    references: [...LEARNER_MAPS.map((key) => state[key]), ...unlockedPhrases],
    values: JSON.stringify({
      run: state.storyRunSequence,
      round: state.trainRound,
      history: state.trainActivityHistory ?? [],
      targets: state.trainTargetHistory ?? [],
      debug: Boolean(debugTrace),
      discoveredIds,
      phraseIds: unlockedPhrases.map(({ id }) => id),
      // Enumeration tests membership only. Goal priority order belongs to the
      // subsequent planner and must never be sorted there.
      forcedTargets: [...new Set(forceGoalTargetIds)].sort(),
    }),
  }
}

function preparationExpiry(state, nowMs) {
  let expiresAt = nowMs + TRAIN_PREPARATION_MAX_AGE_MS
  // Temporal evidence lives under word aspects/forms and phrase skill rows.
  // Inspect those bounded public progression records once per preparation,
  // never on peek/take and never unrelated world state or learner text.
  const visit = (value) => {
    if (!value || typeof value !== 'object') return
    if (Number.isSafeInteger(value.dueAtMs) && value.dueAtMs > nowMs) {
      expiresAt = Math.min(expiresAt, value.dueAtMs)
    }
    for (const child of Object.values(value)) {
      if (child && typeof child === 'object') visit(child)
    }
  }
  for (const key of TIMED_PROGRESS_MAPS) visit(state[key])
  return expiresAt
}

async function prepareEnumeration(options, workOptions) {
  const enumeration = await completeTrainCandidateWork(options, workOptions)
  return enumeration ? {
    enumeration,
    plannedAtMs: options.nowMs,
    validUntilMs: preparationExpiry(options.state, options.nowMs),
  } : null
}

/**
 * Build a card without presenting it. This does not record analytics, history,
 * exposure, mastery, health, audio, or a reducer action. The caller claims the
 * result once and attaches health from its current state at that boundary.
 */
export async function prepareTrainQuestion(options, {
  isCancelled = () => false,
  measureOperation = run,
  measureAsyncOperation = run,
  enumerate = prepareEnumeration,
  ...workOptions
} = {}) {
  const { state, nowMs: requestedAtMs = Date.now() } = options
  if (isCancelled()) return null
  const discoveredIds = options.discoveredIds ?? Object.keys(state.discovered || {})
    .filter((id) => state.discovered[id] && isTrainableSense(id))
  const unlockedPhrases = options.unlockedPhrases ?? EVERYDAY_PHRASE_DRILLS.filter((entry) =>
    entry.requires.filter(isTrainableSense).every((id) => state.discovered?.[id]))
  const { recentActivityHistory, recentTargetHistory, excludedWordKeys } = schedulingHistories(options)
  const actionGoal = trainActionGoalForState(state)
  const goalSession = normalizeTrainActionGoalSession(state.trainGoalSession, state)
  const actionPracticeQueue = trainActionPracticeQueue(state)
  const bank = await measureAsyncOperation('enumerate', () => enumerate({
    state,
    discoveredIds,
    unlockedPhrases,
    forceGoalTargetIds: actionPracticeQueue.allRemainingWordIds,
    nowMs: requestedAtMs,
    debugTrace: state.debug,
  }, { ...workOptions, isCancelled }))
  if (!bank || isCancelled()) return null
  // Reusing a bank must preserve the exact time its eligibility and urgency
  // were calculated. Only the current goal and presentation exclusions change.
  const { enumeration, plannedAtMs: nowMs, validUntilMs } = bank
  const plannerSeed = trainPlannerSeed({
    currentRound: state.trainRound,
    discoveredIds,
    activityHistory: recentActivityHistory,
    targetHistory: recentTargetHistory,
  })
  const planningState = initialTrainPlanningState({
    currentRound: state.trainRound,
    activityHistory: recentActivityHistory,
    targetHistory: recentTargetHistory,
    lastWordKeys: excludedWordKeys,
    goalRemaining: actionPracticeQueue.priorityRemainingWordIds,
    alternateGoalRemaining: actionPracticeQueue.currentRemainingWordIds.length
      ? actionPracticeQueue.otherRemainingWordIds
      : [],
    goalMaximumDiversionRounds: actionPracticeQueue.maximumDiversionRounds,
    goalDiversionsUsed: actionGoal?.remainingTokenCount
      ? goalSession?.activitiesSinceGoalOpportunity
      : 0,
  })
  const future = measureOperation('plan', () => planTrainFuture({
    proposals: enumeration.proposals,
    planningState,
    seed: plannerSeed,
  }))
  const exactOracle = state.debug ? planTrainFutureExact({
    proposals: enumeration.proposals,
    planningState,
    seed: plannerSeed,
  }) : null
  const oracleReport = state.debug
    ? trainPlannerOracleReport(future, exactOracle, planningState)
    : null
  const actionLastResort = future.candidate ? null : trainActionLastResortProposal(
    enumeration.proposals,
    actionPracticeQueue.priorityRemainingWordIds,
  )
  const selectedProposal = future.candidate || actionLastResort
  const schedulerTrace = {
    builder: 'train-future-planner',
    reason: selectedProposal
      ? actionLastResort
        ? `Every ordinary future route was blocked, so Train used the reviewed last-resort card for a still-missing visible action word.`
        : actionPracticeQueue.currentRemainingWordIds.length
          ? `Selected the strongest future route toward the requested story action while preserving legal target and activity diversity.`
          : actionPracticeQueue.otherRemainingWordIds.length
            ? `Selected the strongest future route toward another same-node story action whose words are already saved.`
            : `Selected the strongest future route across every currently buildable Train family.`
      : `Every currently buildable proposal was rejected by an explicit hard constraint.`,
    currentRound: state.trainRound || 0,
    nowMs,
    excludedWordKeys,
    recentActivityHistory,
    recentTargetHistory,
    actionGoal: actionGoal ? { ...actionGoal, session: goalSession } : null,
    actionPracticeQueue,
    enumeration: enumeration.trace,
    future: {
      ...future.trace,
      actionLastResort: actionLastResort ? {
        reason: 'a buildable visible-action target outranks the terminal screen after ordinary constraints exhaust the root pool',
        candidate: trainCandidateDebugRecord(actionLastResort),
      } : null,
      exactOracle: exactOracle?.trace || null,
      oracleReport,
    },
    selected: trainCandidateDebugRecord(selectedProposal),
  }
  const materializedQuestion = measureOperation('materialize', () => selectedProposal?.materialize({
    debug: state.debug,
    plannerTrace: schedulerTrace,
  }) || null)
  if (isCancelled()) return null
  const question = materializedQuestion || (!TRAIN_SCHEDULER_SAFEGUARDS.repeatWhenNoDisjointTargetExists
    ? {
        kind: TRAIN_SCHEDULER_SAFEGUARDS.exhaustedPoolOutcome,
        needsMoreWords: actionPracticeQueue.needsMoreWords,
        debugSelection: state.debug ? { scheduler: schedulerTrace } : undefined,
      }
    : null)
  return {
    question,
    wordKeys: selectedProposal?.wordKeys || [],
    targetKeys: selectedProposal?.targetKeys || [],
    recentActivityHistory,
    recentTargetHistory,
    schedulerTrace,
    analyticsDecision: {
      candidates: enumeration.proposals.map((proposal) => ({
        route: proposal.route,
        question: { targetKeys: proposal.targetKeys },
      })),
      balanced: {
        candidate: selectedProposal ? {
          route: selectedProposal.route,
          question: { questionKey: materializedQuestion?.questionKey },
        } : null,
        activityTypeId: selectedProposal?.activityTypeId || null,
        randomBoundary: null,
        plan: {
          usesRepeatFallback: recentActivityHistory.at(-1) === selectedProposal?.activityTypeId,
        },
      },
    },
    plannedAtMs: nowMs,
    validUntilMs,
  }
}

/** One in-flight or ready decision per owner; a card can be claimed only once. */
export function createTrainPreparationCache({
  clock = Date.now,
  prepare = prepareTrainQuestion,
  enumerate = completeTrainCandidateWork,
} = {}) {
  let slot = null
  let bank = null
  const cancelDecision = () => {
    if (slot) slot.cancelled = true
    slot = null
  }
  const cancelBank = () => {
    if (bank) bank.cancelled = true
    bank = null
  }
  const cancel = () => {
    cancelDecision()
    cancelBank()
  }
  const inTime = (entry) => clock() >= entry.plannedAtMs && clock() < entry.validUntilMs
  const valid = (entry, options) => entry && !entry.cancelled &&
    sameScope(entry.scope, preparationScope(options)) &&
    // A wall-clock rollback must not reuse a decision made in the future.
    inTime(entry)
  const preparedEnumeration = (options, workOptions) => {
    const scope = enumerationScope(options)
    if (bank && !bank.cancelled && sameScope(bank.scope, scope) && inTime(bank)) return bank.promise
    cancelBank()
    const entry = {
      scope,
      plannedAtMs: options.nowMs,
      validUntilMs: preparationExpiry(options.state, options.nowMs),
      cancelled: false,
      promise: null,
    }
    bank = entry
    entry.promise = Promise.resolve().then(() => enumerate(options, {
      ...workOptions,
      // A different goal can cancel its selection while sharing this exact
      // same bank. Only a changed bank input or owner cancellation stops it.
      isCancelled: () => entry.cancelled || bank !== entry,
    })).then((enumeration) => {
      if (!enumeration || entry.cancelled || bank !== entry || !inTime(entry)) {
        if (bank === entry) cancelBank()
        return null
      }
      return { enumeration, plannedAtMs: entry.plannedAtMs, validUntilMs: entry.validUntilMs }
    }).catch((error) => {
      if (entry.cancelled || bank !== entry) return null
      cancelBank()
      throw error
    })
    return entry.promise
  }
  const peek = (options) => valid(slot, options) ? slot.result : null
  const take = (options) => {
    const result = peek(options)
    if (result) cancelDecision()
    return result
  }
  const prepareNext = (options, workOptions = {}) => {
    if (valid(slot, options)) return slot.promise
    cancelDecision()
    const plannedAtMs = options.nowMs ?? clock()
    const entry = {
      scope: preparationScope(options),
      plannedAtMs,
      validUntilMs: plannedAtMs + TRAIN_PREPARATION_MAX_AGE_MS,
      result: null,
      cancelled: false,
      promise: null,
    }
    slot = entry
    // Defer the first slice so callers can store/observe the shared promise
    // before any candidate work begins, including deterministic Node tests.
    entry.promise = Promise.resolve().then(() => prepare({ ...options, nowMs: plannedAtMs }, {
      ...workOptions,
      enumerate: preparedEnumeration,
      isCancelled: () => entry.cancelled || slot !== entry || workOptions.isCancelled?.() === true,
    })).then((result) => {
      if (result) {
        entry.plannedAtMs = result.plannedAtMs
        entry.validUntilMs = result.validUntilMs
      }
      if (!result || !valid(entry, options) || slot !== entry) {
        if (slot === entry) cancelDecision()
        return null
      }
      entry.result = result
      return result
    }).catch((error) => {
      if (entry.cancelled || slot !== entry) return null
      if (slot === entry) cancelDecision()
      throw error
    })
    return entry.promise
  }
  return { prepare: prepareNext, peek, take, cancel }
}
