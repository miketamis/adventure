import { lazy, Suspense, useState, useCallback, useEffect, useMemo, useRef } from 'react'
import { DICT } from '../game/content.js'
import { practiceReturnOption } from '../game/practiceReturn.js'
import { playPhrase, playWord } from '../game/audio.js'
import { trainCompletionPhrases } from '../game/trainCompletion.js'
import { trainQuestionWordKeys } from '../game/phrasePractice.js'
import {
  EVERYDAY_PHRASE_DRILLS,
} from '../game/everydayAlbanian.js'
import {
  buildNounEndingRefresher,
  buildNounOddOneOutRefresher,
  phraseNounEndingRefresher,
} from '../game/nounEndingRefresher.js'
import {
  TRAIN_EXERCISE_FAMILIES,
  TRAIN_SCHEDULER_SAFEGUARDS,
} from '../game/trainingProgression.js'
import {
  normalizeTrainActivityHistory,
  normalizeTrainTargetHistory,
  recordTrainActivity,
  recordTrainTargets,
} from '../game/trainActivityHistory.js'
import { cefrProfile } from '../game/cefrAssessment.js'
import { isTrainableSense } from '../game/lexicalTrainability.js'
import PhrasePracticeQuestion from './PhrasePracticeQuestion.jsx'
import ContextualCompletion, {
  CONTEXT_TARGET_PRESENTATION,
} from './ContextualCompletion.jsx'
import TrainingActivityShell from './TrainingActivityShell.jsx'
import WordMatchingQuestion from './WordMatchingQuestion.jsx'
import NounFormMatchingQuestion from './NounFormMatchingQuestion.jsx'
import CefrCapstone from './CefrCapstone.jsx'
import { trainMissConsequence } from '../game/consequenceBuilders.js'
import {
  trainCorrectWillRestoreHeart,
  trainHealthPlanForQuestion,
  trainHeartRiskText,
  trainRecoveryPlanForState,
  trainRecoveryStatusText,
} from '../game/trainHealthPolicy.js'
import { wordSpellingAttempt, wordSpellingRepairMessage } from '../game/wordSpellingPolicy.js'
import {
  trainCandidateDebugRecord,
  trainPlannerSeed,
} from '../game/trainCandidateContract.js'
import {
  initialTrainPlanningState,
  planTrainFutureExact,
  planTrainFuture,
  trainPlannerOracleReport,
} from '../game/trainFuturePlanner.js'
import {
  normalizeTrainActionGoalSession,
  TRAIN_ACTION_GOAL_POLICY,
  trainActionGoalForState,
  trainActionLastResortProposal,
  trainActionPracticeQueue,
} from '../game/trainActionGoal.js'
import { resolveTrainingTarget } from '../game/trainingTarget.js'
import { analyticsOptionId } from '../game/playtestAnalytics.js'
import { measureAsyncPerformanceOperation, measurePerformanceOperation } from '../performance.js'
import { completeTrainCandidateWork } from '../trainCandidateWork.js'
import {
  captureTrainQuestionPresented,
  captureTrainSchedulerDecision,
} from '../game/trainPlaytestAnalytics.js'

const DebugTrainActivityInspector = lazy(() => import('./DebugTrainActivityInspector.jsx'))

// the answer rendered in Albanian (every word is discovered when affordable)
const albanianPhrase = (tokens) => tokens.map((t) => (t.id ? t.al : t.en)).join(' ')
const [WORD_ALBANIAN_TO_ENGLISH] = TRAIN_EXERCISE_FAMILIES.wordMeaning.variants

// The text shown for a sense on a given side. Training shows *all* English
// senses (enAll, e.g. "on / in") where the story only shows the contextual one.
const senseText = (id, field) =>
  field === 'en' ? DICT[id].enAll ?? DICT[id].en : DICT[id][field]

const CefrEntry = ({ state, onOpen }) => {
  const profile = cefrProfile(state.cefrEvidence)
  return (
    <aside className="cefr-entry" aria-labelledby="cefr-entry-title">
      <div>
        <span className="cefr-eyebrow">Guided journey</span>
        <h3 id="cefr-entry-title">From first words to A2 village life</h3>
        <p>
          Story and Train unlock guided listening, speaking, writing and mediation practice.
          Fresh A1 checks open after preparation; A2 follows a complete A1 profile.
        </p>
      </div>
      <div className="cefr-entry-status" aria-label="CEFR readiness status">
        <span className={profile.A1.passed ? 'passed' : ''}>{profile.A1.passed ? '✓' : '○'} A1</span>
        <span aria-hidden="true">then</span>
        <span className={profile.A2.passed ? 'passed' : profile.A1.passed ? '' : 'locked'}>
          {profile.A2.passed ? '✓' : profile.A1.passed ? '○' : '🔒'} A2
        </span>
      </div>
      <button type="button" className="btn" onClick={onOpen}>Open readiness journeys</button>
    </aside>
  )
}

export default function PracticeView({ state, dispatch, analyticsEnabled = false }) {
  const discoveredIds = useMemo(
    () => Object.keys(state.discovered).filter((id) => state.discovered[id] && isTrainableSense(id)),
    [state.discovered],
  )
  const unlockedEverydayPhrases = useMemo(
    () => EVERYDAY_PHRASE_DRILLS.filter((entry) =>
      entry.requires.filter(isTrainableSense).every((id) => state.discovered[id])),
    [state.discovered],
  )
  const activeActionGoal = trainActionGoalForState(state)
  const activeActionOption = activeActionGoal ? resolveTrainingTarget(activeActionGoal.target) : null
  const [q, setQ] = useState(null)
  const [picked, setPicked] = useState(null)
  const [typedWord, setTypedWord] = useState('')
  const [acceptedLeewayReview, setAcceptedLeewayReview] = useState(false)
  const [awaitingRecoveryContinue, setAwaitingRecoveryContinue] = useState(false)
  const [wordAudioCompleted, setWordAudioCompleted] = useState(false)
  const [wordAudioError, setWordAudioError] = useState('')
  const [wordRepair, setWordRepair] = useState(null)
  const [constructedPieceIds, setConstructedPieceIds] = useState([])
  const [formPhaseIndex, setFormPhaseIndex] = useState(0)
  const [showCefr, setShowCefr] = useState(false)
  const answerCommitted = useRef(false)
  const questionRef = useRef(null)
  const wordInputRef = useRef(null)
  const previousQuestionWords = useRef([])
  const activityHistory = useRef(normalizeTrainActivityHistory(state.trainActivityHistory))
  const targetHistory = useRef(normalizeTrainTargetHistory(state.trainTargetHistory))
  const nextRef = useRef(null)
  const generation = useRef(0)
  const planning = useRef(null)
  const mounted = useRef(true)
  const latestState = useRef(state)
  latestState.current = state
  const [planningError, setPlanningError] = useState(null)
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      generation.current += 1
      planning.current = null
    }
  }, [])
  const advanceAfterConsequence = useRef(false)
  const scheduleNextQuestion = useCallback((delayMs) => {
    const advance = () => nextRef.current?.()
    if (delayMs > 0) {
      window.setTimeout(advance, delayMs)
      return
    }
    // A miss owns the completed source card until its blocking correction is
    // acknowledged. Do not build or publish the following card behind the
    // modal: that work can otherwise join the answer interaction on a slow
    // browser whose next paint has not happened yet.
    advanceAfterConsequence.current = true
  }, [])
  const questionStartedAt = useRef(Date.now())
  const attemptTiming = () => {
    const attemptedAtMs = Date.now()
    return {
      attemptedAtMs,
      responseDurationMs: Math.max(0, attemptedAtMs - questionStartedAt.current),
    }
  }

  const next = useCallback(async () => {
    if (!mounted.current) return
    const ticket = ++generation.current
    planning.current = ticket
    answerCommitted.current = true
    setQ(null)
    try {
      if (discoveredIds.length === 0) {
        planning.current = null
        return
      }
      setPicked(null)
      setTypedWord('')
      setAcceptedLeewayReview(false)
      setAwaitingRecoveryContinue(false)
      setWordAudioCompleted(false)
      setWordAudioError('')
      setWordRepair(null)
      setConstructedPieceIds([])
      setFormPhaseIndex(0)
      const nowMs = Date.now()
      const excludeWords = previousQuestionWords.current.length
        ? previousQuestionWords.current
        : state.trainLastWords || []
      const recentActivityHistory = activityHistory.current.length
        ? activityHistory.current
        : normalizeTrainActivityHistory(state.trainActivityHistory)
      const recentTargetHistory = targetHistory.current.length
        ? targetHistory.current
        : normalizeTrainTargetHistory(state.trainTargetHistory)
      const actionGoal = trainActionGoalForState(state)
      const goalSession = normalizeTrainActionGoalSession(state.trainGoalSession, state)
      const actionPracticeQueue = trainActionPracticeQueue(state)
      const enumeration = await measureAsyncPerformanceOperation('train', 'enumerate', 'practice', () => completeTrainCandidateWork({
        state,
        discoveredIds,
        unlockedPhrases: unlockedEverydayPhrases,
        forceGoalTargetIds: actionPracticeQueue.allRemainingWordIds,
        nowMs,
        debugTrace: state.debug,
      }, {
        isCancelled: () => generation.current !== ticket || latestState.current !== state,
        measureSlice: (work) => measurePerformanceOperation('train', 'enumerate-slice', 'practice', work),
      }))
      if (!enumeration) {
        if (generation.current === ticket) {
          planning.current = null
          void nextRef.current?.()
        }
        return
      }
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
        lastWordKeys: excludeWords,
        goalRemaining: actionPracticeQueue.priorityRemainingWordIds,
        alternateGoalRemaining: actionPracticeQueue.currentRemainingWordIds.length
          ? actionPracticeQueue.otherRemainingWordIds
          : [],
        goalMaximumDiversionRounds: actionPracticeQueue.maximumDiversionRounds,
        goalDiversionsUsed: actionGoal?.remainingTokenCount
          ? goalSession?.activitiesSinceGoalOpportunity
          : 0,
      })
      const future = measurePerformanceOperation('train', 'plan', 'practice', () => planTrainFuture({
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
      // The future planner owns every ordinary decision. If all of its roots are
      // blocked, a still-missing visible action word owns the final decision and
      // may break the immediate-repeat boundary rather than show a false end.
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
        excludedWordKeys: [...excludeWords],
        recentActivityHistory,
        recentTargetHistory,
        actionGoal: actionGoal ? {
          ...actionGoal,
          session: goalSession,
        } : null,
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
      const analyticsCandidates = enumeration.proposals.map((proposal) => ({
        route: proposal.route,
        question: { targetKeys: proposal.targetKeys },
      }))
      const materializedQuestion = measurePerformanceOperation('train', 'materialize', 'practice', () => selectedProposal?.materialize({
        debug: state.debug,
        plannerTrace: schedulerTrace,
      }) || null)
      captureTrainSchedulerDecision({
        state,
        candidates: analyticsCandidates,
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
      })
      let nextQuestion = null
      if (materializedQuestion) {
        const question = materializedQuestion
        const phaseTrainHealth = Object.fromEntries((question.phasePlan || []).map((phase) => [
          phase.id,
          trainHealthPlanForQuestion(state, question, { phaseId: phase.id }),
        ]))
        nextQuestion = {
          ...question,
          trainHealth: trainHealthPlanForQuestion(state, question),
          phaseTrainHealth,
        }
      } else if (!TRAIN_SCHEDULER_SAFEGUARDS.repeatWhenNoDisjointTargetExists) {
        nextQuestion = {
          kind: TRAIN_SCHEDULER_SAFEGUARDS.exhaustedPoolOutcome,
          needsMoreWords: actionPracticeQueue.needsMoreWords,
          debugSelection: state.debug ? { scheduler: schedulerTrace } : undefined,
        }
      }
      planning.current = null
      answerCommitted.current = false
      if (nextQuestion && nextQuestion.kind !== TRAIN_SCHEDULER_SAFEGUARDS.exhaustedPoolOutcome) {
        previousQuestionWords.current = selectedProposal.wordKeys
        activityHistory.current = recordTrainActivity(recentActivityHistory, nextQuestion.activityTypeId)
        const targetKeys = selectedProposal.targetKeys
        targetHistory.current = recordTrainTargets(recentTargetHistory, targetKeys)
        dispatch({
          type: 'RECORD_TRAIN_ACTIVITY_PRESENTED',
          questionKey: nextQuestion.questionKey,
          activityTypeId: nextQuestion.activityTypeId,
          targetKeys,
        })
      }
      setQ(nextQuestion)
    } catch (error) {
      if (generation.current === ticket) {
        planning.current = null
        setPlanningError(error)
      }
    }
  }, [discoveredIds, unlockedEverydayPhrases, state, dispatch])

  nextRef.current = next
  const onPhraseComplete = useCallback(async (result) => {
    const completionGeneration = generation.current
    const restoresHeart = result.correct && trainCorrectWillRestoreHeart(
      trainHealthPlanForQuestion(state, q),
    )
    setAcceptedLeewayReview(result.acceptedWithLeeway === true)
    setAwaitingRecoveryContinue(restoresHeart)
    const guide = phraseNounEndingRefresher(q, result)
    const consequence = result.correct ? null : trainMissConsequence({
      source: 'train-phrase',
      questionKey: q.questionKey,
      attemptedAl: result.attempted?.al,
      attemptedEn: result.attempted?.en,
      reasonCode: q.mode === 'cloze'
        ? 'wrong-phrase-slot'
        : q.mode === 'match'
          ? 'wrong-phrase-match'
          : q.mode === 'type'
            ? 'wrong-phrase-spelling'
            : q.mode === 'listen'
              ? 'wrong-heard-order'
              : 'wrong-phrase-order',
      reason: q.mode === 'cloze'
        ? 'The selected word does not complete this phrase in the displayed context.'
        : q.mode === 'match'
          ? 'The selected English meaning belongs to a different Albanian phrase.'
          : q.mode === 'type'
            ? 'The written Albanian does not yet match the complete phrase requested.'
            : q.mode === 'listen'
              ? 'The built word sequence does not match the continuous Albanian phrase you heard.'
              : 'The selected words are not in the order required by this Albanian phrase.',
      correctAl: q.target.al,
      correctEn: q.target.en,
      grammarGuide: guide,
    })
    dispatch({ type: 'PRACTICE_PHRASE_RESULT', activityTypeId: q.activityTypeId, ...result, consequence })
    if (result.correct) {
      for (const phrase of trainCompletionPhrases(q)) {
        await playPhrase(phrase)
        if (!mounted.current || generation.current !== completionGeneration) return
      }
      if (!result.acceptedWithLeeway && !restoresHeart) scheduleNextQuestion(1900)
    } else scheduleNextQuestion(0)
  }, [dispatch, q, scheduleNextQuestion, state])

  const onWordMatchComplete = useCallback((result) => {
    const restoresHeart = result.correct && trainCorrectWillRestoreHeart(
      trainHealthPlanForQuestion(state, q),
    )
    setAwaitingRecoveryContinue(restoresHeart)
    const wordKeys = trainQuestionWordKeys(q)
    const correctPair = q.pairs.find(({ al }) => al === result.attempted?.al)
    dispatch({
      type: 'PRACTICE_WORD_MATCH_RESULT',
      activityTypeId: q.activityTypeId,
      correct: result.correct,
      variantId: q.variantId,
      wordIds: q.wordIds,
      questionKey: q.questionKey,
      wordKeys,
      attemptedAtMs: result.attemptedAtMs,
      responseDurationMs: result.responseDurationMs,
      selectedTargetId: result.selectedTargetId,
      selectedOptionId: result.selectedOptionId,
      consequence: result.correct ? null : trainMissConsequence({
        source: 'train-word-matching',
        questionKey: q.questionKey,
        attemptedAl: result.attempted?.al,
        attemptedEn: result.attempted?.en,
        reasonCode: 'wrong-word-match',
        reason: `“${result.attempted?.en || 'that meaning'}” belongs to a different Albanian word on this board.`,
        correctAl: correctPair?.al,
        correctEn: correctPair?.en,
        targetWordId: result.selectedTargetId,
      }),
    })
    if (result.correct && !restoresHeart) scheduleNextQuestion(1800)
    else if (!result.correct) scheduleNextQuestion(0)
  }, [dispatch, q, scheduleNextQuestion, state])

  const onNounFormMatchComplete = useCallback((result) => {
    const restoresHeart = result.correct && trainCorrectWillRestoreHeart(
      trainHealthPlanForQuestion(state, q),
    )
    setAwaitingRecoveryContinue(restoresHeart)
    const correction = result.correction
    dispatch({
      type: 'PRACTICE_WORD_RESULT',
      activityTypeId: q.activityTypeId,
      correct: result.correct,
      id: q.answerId,
      tier: q.tier,
      mode: q.mode,
      direction: q.dir,
      wordStageId: q.wordStageId,
      variantId: q.variantId,
      targetFormKey: null,
      aspectTargets: q.aspectTargets,
      questionKey: q.questionKey,
      wordKeys: trainQuestionWordKeys(q),
      attemptedAtMs: result.attemptedAtMs,
      responseDurationMs: result.responseDurationMs,
      selectedTargetId: result.selectedTargetId,
      selectedOptionId: result.selectedOptionId,
      consequence: result.correct ? null : trainMissConsequence({
        source: 'train-noun-form-matching',
        questionKey: q.questionKey,
        attemptedAl: result.attempted?.context,
        attemptedEn: result.attempted?.roleLabel,
        reasonCode: 'wrong-noun-form-job-match',
        reason: `“${result.attempted?.roleLabel || 'that job'}” does not describe how “${result.attempted?.surface || q.surface}” is used in this Albanian sentence.`,
        correctAl: correction?.context,
        correctEn: correction?.roleLabel,
        reasoning: correction
          ? `In “${correction.context}”, the marked noun has the job “${correction.roleLabel}”. The surrounding Albanian words make this role unambiguous.`
          : null,
        grammarGuide: correction
          ? buildNounEndingRefresher(q.answerId, correction.surface, correction.gloss)
          : null,
      }),
    })
    if (result.correct) void finishWordActivity(true, restoresHeart, 1800)
    else scheduleNextQuestion(0)
  }, [dispatch, q, scheduleNextQuestion, state])

  useEffect(() => {
    if (!q && planning.current === null && discoveredIds.length > 0) void next()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoveredIds.length])

  useEffect(() => {
    if (!q) return undefined
    questionStartedAt.current = Date.now()
    const frame = window.requestAnimationFrame(() => {
      if (q.kind === TRAIN_EXERCISE_FAMILIES.wordSpelling.kind || q.formExerciseMode === 'ending-type') wordInputRef.current?.focus()
      else questionRef.current?.focus()
    })
    return () => window.cancelAnimationFrame(frame)
  }, [q])

  useEffect(() => {
    if (!q || q.kind === TRAIN_SCHEDULER_SAFEGUARDS.exhaustedPoolOutcome) return
    captureTrainQuestionPresented(q, state)
    // Re-run when consent is granted over an already-mounted saved question;
    // stable event receipts prevent duplicate impressions on ordinary renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [analyticsEnabled, q?.questionKey])

  useEffect(() => {
    if (state.pendingHeartConsequence || !advanceAfterConsequence.current) return undefined
    if (state.hearts <= 0) {
      advanceAfterConsequence.current = false
      return undefined
    }
    // First paint the acknowledged source card without the modal. Planning is
    // substantial on a mature profile, so start it in a later task rather than
    // extending the modal button interaction.
    let timer = null
    const frame = window.requestAnimationFrame(() => {
      timer = window.setTimeout(() => {
        advanceAfterConsequence.current = false
        nextRef.current?.()
      }, 0)
    })
    return () => {
      window.cancelAnimationFrame(frame)
      if (timer !== null) window.clearTimeout(timer)
    }
  }, [state.hearts, state.pendingHeartConsequence])

  useEffect(() => {
    if (!state.debug) setShowCefr(false)
  }, [state.debug])

  if (planningError) throw planningError

  if (state.debug && showCefr) {
    return <CefrCapstone state={state} dispatch={dispatch} onClose={() => setShowCefr(false)} />
  }

  if (discoveredIds.length === 0) {
    return (
      <>
        {state.debug && <CefrEntry state={state} onOpen={() => setShowCefr(true)} />}
        <section className="card practice" aria-labelledby="practice-title">
          <h2 id="practice-title" className="view-title">Train Albanian</h2>
          <p className="empty">
            You haven't discovered any words yet.
            <br />
            Go to the story and click words to discover them, then come back to train.
          </p>
        </section>
      </>
    )
  }

  if (!q) {
    return (
      <>
        {state.debug && <CefrEntry state={state} onOpen={() => setShowCefr(true)} />}
        <section className="card practice" aria-labelledby="practice-title">
          <h2 id="practice-title" className="view-title">Train Albanian</h2>
          <p className="empty" role="status">Preparing the next question…</p>
        </section>
      </>
    )
  }

  if (q.kind === TRAIN_SCHEDULER_SAFEGUARDS.exhaustedPoolOutcome) {
    return (
      <>
        {state.debug && <CefrEntry state={state} onOpen={() => setShowCefr(true)} />}
        <section className="card practice" aria-labelledby="practice-title">
          <h2 id="practice-title" className="view-title">Train Albanian</h2>
          <p className="empty" role="status">
            {TRAIN_ACTION_GOAL_POLICY.terminalMessage}
          </p>
          <button className="btn primary" onClick={() => dispatch({ type: 'SET_VIEW', view: 'story' })}>
            Return to story
          </button>
        </section>
        {state.debug && (
          <Suspense fallback={<p className="debug-train-loading">Loading caught-up evidence…</p>}>
            <DebugTrainActivityInspector question={q} state={state} />
          </Suspense>
        )}
      </>
    )
  }

  const isForms = q.kind === TRAIN_EXERCISE_FAMILIES.wordForms.kind
  const isFormIntro = isForms && q.formExerciseMode === 'identify-form'
  const isEndingChoice = isForms && q.formExerciseMode === 'ending-choice'
  const isEndingTyping = isForms && q.formExerciseMode === 'ending-type'
  const isFormOddOneOut = isForms && q.formExerciseMode === 'form-odd-one-out'
  const isNounFormMatching = isForms && q.formExerciseMode === 'same-root-grammar-matching'
  const isFormChoice = isFormIntro || isEndingChoice || isFormOddOneOut
  const isWordConstruction = q.kind === TRAIN_EXERCISE_FAMILIES.wordConstruction.kind
  const isWordSpelling = q.kind === TRAIN_EXERCISE_FAMILIES.wordSpelling.kind
  const isAudioWord = q.stimulusMode === 'audio-only'
  const isEverydayPhrase = q.kind === TRAIN_EXERCISE_FAMILIES.phrase.kind
  const isWordMatching = q.kind === TRAIN_EXERCISE_FAMILIES.wordMatching.kind
  const isContextualCompletion = q.kind === TRAIN_EXERCISE_FAMILIES.wordContext.kind
  const formPhase = isForms ? q.phasePlan?.[formPhaseIndex] : null
  // The result reducer consumes protection as soon as an answer is submitted,
  // while this card intentionally remains visible for its feedback beat. Use
  // the plan captured when the activity appeared so the border cannot flash
  // to the next risk state before the next activity replaces it.
  const trainHealth = q.phaseTrainHealth?.[formPhase?.id]
    || q.trainHealth
    || trainHealthPlanForQuestion(state, q, { phaseId: formPhase?.id || null })
  const recoveryPlan = trainRecoveryPlanForState(state, trainHealth.maximumHearts)
  const trainRiskClass = trainHealth.protectedAttempt
    ? 'train-risk-protected'
    : trainHealth.missEndsRun
      ? 'train-risk-damaging train-risk-pulse-fast'
      : trainHealth.heartsAfterWrong === 1
        ? 'train-risk-damaging train-risk-pulse-slow'
        : 'train-risk-damaging'
  const recoveryMeterValue = recoveryPlan.atMaximumHearts
    ? Math.min(recoveryPlan.correctCombo, recoveryPlan.recoveryCorrectCompletions)
    : recoveryPlan.correctStreak
  const recoveryPercent = `${Math.round((recoveryMeterValue / recoveryPlan.recoveryCorrectCompletions) * 100)}%`
  const recoveryCaption = recoveryPlan.atMaximumHearts
    ? 'Hearts full'
    : `${recoveryPlan.correctUntilRecovery} correct to restore ♥`
  const restoredHeart = state.trainRecoveryEvent?.questionKey === q.questionKey
  const isContextualAlbanianRetrieval = isContextualCompletion && q.dir === 'en2al'
  const contextualTargetKind = q.promptProfile?.targetKind || 'lexical-meaning'
  const contextualTargetPresentation = isContextualAlbanianRetrieval
    ? CONTEXT_TARGET_PRESENTATION.blank
    : q.promptProfile?.contextPresentation === CONTEXT_TARGET_PRESENTATION.namedMarked
      ? CONTEXT_TARGET_PRESENTATION.namedMarked
      : CONTEXT_TARGET_PRESENTATION.marked
  const contextualInstruction = q.targetReference?.instructionTarget ? (
    <>
      {q.targetReference.instructionPrefix}
      <span lang="sq">“{q.targetReference.instructionTarget}”</span>
      {q.targetReference.instructionSuffix}
    </>
  ) : q.targetReference?.instruction
  const contextualDirectionLabel = q.targetReference?.directionLabel
  const contextualEnglishCue = isContextualCompletion
    ? q.ctx.en.replace('__', senseText(q.answerId, 'en'))
    : ''
  const grammarPhaseQuestion = isForms && q.grammarBundle
    ? q.phaseQuestions?.[formPhase?.id] || null
    : null
  const isFormIdentityPhase = isFormIntro && formPhase?.task === 'meaning-identification'
  const isFormSupportPhase = isFormIdentityPhase
  const correctValue = grammarPhaseQuestion
    ? grammarPhaseQuestion.answerValue
    : isFormIdentityPhase
    ? q.lexicalCheck.answerId
    : isFormChoice
      ? q.answerValue
      : q.answerId
  const answered = picked !== null
  const wasCorrect = picked === correctValue

  const completionPhrases = trainCompletionPhrases(q)
  const finishWordActivity = async (correct, restoresHeart, delay) => {
    const ticket = generation.current
    if (correct && completionPhrases.length) {
      for (const phrase of completionPhrases) {
        await playPhrase(phrase)
        if (!mounted.current || generation.current !== ticket) return
      }
    } else {
      playWord(q.surface || q.typingAnswer || DICT[q.answerId]?.al)
    }
    if (correct && !restoresHeart) scheduleNextQuestion(delay)
    else if (!correct) scheduleNextQuestion(0)
  }

  const onPick = (value) => {
    if (answered || answerCommitted.current || (q.requiresCompletedAudio && !wordAudioCompleted)) return
    answerCommitted.current = true
    const correct = value === correctValue

    if (grammarPhaseQuestion) {
      const isFinalPhase = formPhaseIndex === q.phasePlan.length - 1
      if (correct && !isFinalPhase) {
        playWord(q.surface)
        setFormPhaseIndex((index) => index + 1)
        answerCommitted.current = false
        window.requestAnimationFrame(() => questionRef.current?.focus())
        return
      }
      setPicked(value)
      const restoresHeart = correct && trainCorrectWillRestoreHeart(trainHealth)
      setAwaitingRecoveryContinue(restoresHeart)
      const selectedOption = grammarPhaseQuestion.options.find((option) => option.value === value)
      const miss = grammarPhaseQuestion.miss || {}
      dispatch({
        type: 'PRACTICE_WORD_RESULT',
        activityTypeId: q.activityTypeId,
        correct,
        id: q.answerId,
        tier: q.tier,
        mode: q.mode,
        direction: q.dir,
        wordStageId: q.wordStageId,
        variantId: q.variantId,
        targetFormKey: null,
        aspectPhaseId: formPhase.id,
        aspectTargets: q.phaseAspectTargets?.[formPhase.id] || q.aspectTargets,
        questionKey: q.questionKey,
        wordKeys: trainQuestionWordKeys(q),
        selectedOptionId: analyticsOptionId(value),
        ...attemptTiming(),
        consequence: correct ? null : trainMissConsequence({
          source: 'train-noun-agreement',
          questionKey: q.questionKey,
          attemptedAl: selectedOption?.lang === 'sq' ? selectedOption.label : null,
          attemptedEn: selectedOption?.lang === 'en' ? selectedOption.label : null,
          reasonCode: miss.reasonCode || 'wrong-noun-agreement',
          reason: miss.reason || 'That choice does not agree with the reviewed Albanian noun phrase.',
          correctAl: miss.correctAl || q.agreementFrame?.demonstrative?.phrase || q.agreementFrame?.adjective?.phrase,
          correctEn: miss.correctEn || null,
          targetWordId: q.answerId,
          reasoning: miss.reasoning || null,
        }),
      })
      void finishWordActivity(correct, restoresHeart, 1200)
      return
    }

    if (isFormSupportPhase && correct) {
      playWord(q.surface)
      setFormPhaseIndex((index) => index + 1)
      answerCommitted.current = false
      window.requestAnimationFrame(() => questionRef.current?.focus())
      return
    }

    setPicked(value)

    if (isFormSupportPhase) {
      const chosen = q.lexicalCheck.optionLabels[value]
      const correctMeaning = q.lexicalCheck.optionLabels[q.answerId]
      dispatch({
        type: 'PRACTICE_WORD_RESULT',
        activityTypeId: q.activityTypeId,
        correct: false,
        id: q.answerId,
        tier: q.tier,
        mode: q.mode,
        direction: q.dir,
        wordStageId: q.wordStageId,
        variantId: q.variantId,
        targetFormKey: q.targetFormKey,
        aspectPhaseId: formPhase.id,
        aspectTargets: q.phaseAspectTargets?.[formPhase.id] || [],
        questionKey: q.questionKey,
        wordKeys: trainQuestionWordKeys(q),
        selectedOptionId: analyticsOptionId(value),
        ...attemptTiming(),
        consequence: trainMissConsequence({
          source: 'train-form',
          questionKey: q.questionKey,
          attemptedEn: chosen,
          reasonCode: 'wrong-marked-form-meaning',
          reason: `“${chosen}” is not the meaning of the marked form “${q.surface}”.`,
          correctAl: q.surface,
          correctEn: correctMeaning,
          targetWordId: q.answerId,
          reasoning: 'Identify what the marked Albanian form means before deciding what grammatical job it has here.',
        }),
      })
      scheduleNextQuestion(0)
      return
    }

    if (isFormChoice) {
      const chosen = q.options.find((option) => option.value === value)?.label || String(value)
      const correctOption = q.options.find((option) => option.value === correctValue)?.label || q.surface
      const isEnding = isEndingChoice
      const restoresHeart = correct && trainCorrectWillRestoreHeart(trainHealth)
      setAwaitingRecoveryContinue(restoresHeart)
      const guide = !correct && q.formTarget?.wordClass === 'noun'
        ? isFormOddOneOut
          ? buildNounOddOneOutRefresher(q.answerId, q.oddOneOut, value)
          : buildNounEndingRefresher(q.answerId, q.surface, q.formTarget.gloss)
        : null
      dispatch({
        type: 'PRACTICE_WORD_RESULT',
        activityTypeId: q.activityTypeId,
        correct,
        id: q.answerId,
        tier: q.tier,
        mode: q.mode,
        direction: q.dir,
        wordStageId: q.wordStageId,
        variantId: q.variantId,
        targetFormKey: q.targetFormKey,
        aspectTargets: q.aspectTargets,
        questionKey: q.questionKey,
        wordKeys: trainQuestionWordKeys(q),
        selectedOptionId: analyticsOptionId(value),
        ...attemptTiming(),
        consequence: correct ? null : trainMissConsequence({
          source: 'train-form',
          questionKey: q.questionKey,
          attemptedAl: isEnding || isFormOddOneOut ? chosen : q.surface,
          attemptedEn: isEnding || isFormOddOneOut ? null : chosen,
          reasonCode: isEnding ? 'wrong-noun-ending' : isFormOddOneOut ? 'wrong-grammatical-form-odd-one-out' : 'wrong-form-role',
          reason: isEnding
            ? `“${chosen}” is not the ending used by this noun in the displayed Albanian sentence.`
            : isFormOddOneOut
              ? `“${chosen}” is ${q.oddOneOut.matchingCategory}, so it belongs with the three matching forms rather than being the exception.`
            : `The selected grammatical job does not match how “${q.surface}” is used in this sentence.`,
          correctAl: isEnding || isFormOddOneOut ? correctOption : q.surface,
          correctEn: isEnding || isFormOddOneOut ? null : correctOption,
          reasoning: isFormOddOneOut
            ? `The other three reviewed surfaces are ${q.oddOneOut.matchingCategory}; “${q.surface}” is ${q.oddOneOut.targetCategory}.`
            : null,
          grammarGuide: guide,
        }),
      })
      void finishWordActivity(correct, restoresHeart, 1200)
      return
    }

    // normal / context question
    const wordKeys = trainQuestionWordKeys(q)
    const chosenLabel = q.optionLabels?.[value] || senseText(value, q.field)
    const correctLabel = q.optionLabels?.[q.answerId] || senseText(q.answerId, q.field)
    const restoresHeart = correct && trainCorrectWillRestoreHeart(trainHealth)
    setAwaitingRecoveryContinue(restoresHeart)
    dispatch({
      type: 'PRACTICE_WORD_RESULT',
      activityTypeId: q.activityTypeId,
      correct,
      id: q.answerId,
      tier: q.tier,
      mode: q.mode,
      direction: q.dir,
      wordStageId: q.wordStageId,
      variantId: q.variantId,
      targetFormKey: q.targetFormKey,
      aspectTargets: q.aspectTargets,
      audioCompleted: q.requiresCompletedAudio ? wordAudioCompleted : undefined,
      questionKey: q.questionKey,
      wordKeys,
      selectedOptionId: analyticsOptionId(value),
      ...attemptTiming(),
      consequence: correct ? null : trainMissConsequence({
        source: 'train-word',
        questionKey: q.questionKey,
        attemptedAl: q.field === 'al' ? chosenLabel : null,
        attemptedEn: q.field === 'en' ? chosenLabel : null,
        reasonCode: isContextualCompletion ? 'wrong-contextual-meaning' : 'wrong-word-meaning',
        reason: isContextualCompletion
          ? 'The selected word or meaning does not fit the job marked by this exact sentence.'
          : 'The selected answer does not match the tested Albanian word and sense.',
        correctAl: q.field === 'al' ? correctLabel : DICT[q.answerId].al,
        correctEn: q.field === 'en' ? correctLabel : senseText(q.answerId, 'en'),
        targetWordId: q.answerId,
      }),
    })
    void finishWordActivity(correct, restoresHeart, 1200)
  }

  const insertWordLetter = (letter) => {
    const input = wordInputRef.current
    const start = input?.selectionStart ?? typedWord.length
    const end = input?.selectionEnd ?? typedWord.length
    const value = `${typedWord.slice(0, start)}${letter}${typedWord.slice(end)}`
    setTypedWord(value)
    requestAnimationFrame(() => {
      wordInputRef.current?.focus()
      wordInputRef.current?.setSelectionRange(start + 1, start + 1)
    })
  }

  const playWordStimulus = async () => {
    if (!q?.audioSurface || answered) return
    setWordAudioError('')
    const completed = await playPhrase(q.audioSurface)
    if (questionRef.current && completed) {
      setWordAudioCompleted(true)
      if (q.kind === TRAIN_EXERCISE_FAMILIES.wordSpelling.kind) {
        window.requestAnimationFrame(() => wordInputRef.current?.focus())
      }
    } else if (!completed) {
      setWordAudioError('The recorded word did not finish. Check that sound is on, then play it again.')
    }
  }

  const checkWordSpelling = (event) => {
    event.preventDefault()
    if (!(isWordSpelling || isEndingTyping) || !typedWord.trim() || answerCommitted.current) return
    answerCommitted.current = true
    if (q.requiresCompletedAudio && !wordAudioCompleted) {
      answerCommitted.current = false
      return
    }
    const result = wordSpellingAttempt(typedWord, q.typingAnswer, q.answerTolerance)
    if (result.repairRequired) {
      setWordRepair(result)
      answerCommitted.current = false
      window.requestAnimationFrame(() => wordInputRef.current?.focus())
      return
    }
    setWordRepair(null)
    setPicked(result.correct ? q.answerId : '__typed-word-miss__')
    const restoresHeart = result.correct && trainCorrectWillRestoreHeart(trainHealth)
    setAwaitingRecoveryContinue(restoresHeart)
    const guide = !result.correct && isEndingTyping
      ? buildNounEndingRefresher(q.answerId, q.surface, q.formTarget.gloss)
      : null
    dispatch({
      type: 'PRACTICE_WORD_RESULT',
      activityTypeId: q.activityTypeId,
      correct: result.correct,
      id: q.answerId,
      tier: q.tier,
      mode: q.mode,
      direction: q.dir,
      wordStageId: q.wordStageId,
      variantId: q.variantId,
      targetFormKey: q.targetFormKey,
      aspectTargets: q.aspectTargets,
      audioCompleted: q.requiresCompletedAudio ? wordAudioCompleted : undefined,
      questionKey: q.questionKey,
      wordKeys: trainQuestionWordKeys(q),
      selectedOptionId: result.correct ? 'typed-correct' : 'typed-incorrect',
      ...attemptTiming(),
      consequence: result.correct ? null : trainMissConsequence({
        source: q.targetFormKey ? 'train-form' : 'train-word',
        questionKey: q.questionKey,
        attemptedAl: typedWord.trim(),
        reasonCode: isEndingTyping ? 'wrong-noun-ending' : q.targetFormKey ? 'wrong-form-spelling' : 'wrong-word-spelling',
        reason: isEndingTyping
          ? 'The typed ending does not complete this noun in the displayed Albanian sentence.'
          : q.targetFormKey
            ? 'The spelling does not match the reviewed form required by this sentence.'
          : 'The spelling does not yet match the Albanian word requested.',
        correctAl: isEndingTyping ? q.endingPractice.label : q.typingAnswer,
        correctEn: isEndingTyping ? null : q.typingCue,
        targetWordId: q.answerId,
        grammarGuide: guide,
      }),
    })
    void finishWordActivity(result.correct, restoresHeart, 1600)
  }

  const constructedText = isWordConstruction
    ? constructedPieceIds.map((id) => q.construction.pieces.find((piece) => piece.id === id)?.text || '').join('')
    : ''
  const toggleConstructionPiece = (pieceId) => {
    if (answered || (q.requiresCompletedAudio && !wordAudioCompleted)) return
    const piece = q.construction.pieces.find((candidate) => candidate.id === pieceId)
    setConstructedPieceIds((current) => current.includes(pieceId)
      ? current.filter((id) => id !== pieceId)
      : [...current, pieceId])
    if (piece?.text && piece.text !== ' ') playWord(piece.text)
    setWordRepair(null)
  }
  const checkConstruction = () => {
    if (!isWordConstruction || !constructedPieceIds.length || answerCommitted.current) return
    answerCommitted.current = true
    if (q.requiresCompletedAudio && !wordAudioCompleted) {
      answerCommitted.current = false
      return
    }
    const spellingResult = wordSpellingAttempt(constructedText, q.surface, q.answerTolerance)
    if (spellingResult.repairRequired) {
      setWordRepair(spellingResult)
      answerCommitted.current = false
      return
    }
    setWordRepair(null)
    const correct = spellingResult.correct
    setPicked(correct ? q.answerId : '__construction-miss__')
    const restoresHeart = correct && trainCorrectWillRestoreHeart(trainHealth)
    setAwaitingRecoveryContinue(restoresHeart)
    dispatch({
      type: 'PRACTICE_WORD_RESULT',
      activityTypeId: q.activityTypeId,
      correct,
      id: q.answerId,
      tier: q.tier,
      mode: q.mode,
      direction: q.dir,
      wordStageId: q.wordStageId,
      variantId: q.variantId,
      targetFormKey: q.targetFormKey,
      aspectTargets: q.aspectTargets,
      audioCompleted: q.requiresCompletedAudio ? wordAudioCompleted : undefined,
      questionKey: q.questionKey,
      wordKeys: trainQuestionWordKeys(q),
      selectedOptionIds: constructedPieceIds.map(analyticsOptionId),
      ...attemptTiming(),
      consequence: correct ? null : trainMissConsequence({
        source: q.targetFormKey ? 'train-form' : 'train-word',
        questionKey: q.questionKey,
        attemptedAl: constructedText,
        reasonCode: q.targetFormKey ? 'wrong-form-construction' : 'wrong-word-construction',
        reason: q.targetFormKey
          ? 'The selected letter chunks do not build the reviewed form required here.'
          : 'The selected letter chunks do not build the Albanian word requested.',
        correctAl: q.surface,
        correctEn: q.typingCue || q.context?.en,
        targetWordId: q.answerId,
      }),
    })
    void finishWordActivity(correct, restoresHeart, 1500)
  }

  // Only the exact story option whose Train button opened this view may offer
  // a return. A single drill can fund several choices; those siblings do not
  // inherit this option's affordance.
  const returnOption = practiceReturnOption(state)

  return (
    <>
      {state.debug && <CefrEntry state={state} onOpen={() => setShowCefr(true)} />}
      {state.debug && activeActionGoal && !activeActionGoal.complete && activeActionOption && (
        <div className="train-goal-banner" role="status">
          <span>
            Training toward <b lang="sq">“{albanianPhrase(activeActionOption.text)}”</b>
          </span>
          <small>
            {activeActionGoal.remainingTokenCount} {activeActionGoal.remainingTokenCount === 1 ? 'word token' : 'word tokens'} left.
            {' '}Each opportunity follows six other activities when they are available—about seven activities per missing token, and never more than eight.
          </small>
        </div>
      )}
      {returnOption && (
        <div className="ready-banner">
          <span>
            You have enough for{' '}
            <b lang="sq">“{albanianPhrase(returnOption.text)}”</b>
          </span>
          <button
            className="btn primary"
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'story' })}
          >
            ↩ Return to story
          </button>
        </div>
      )}

      <section
        className={`card practice train-card ${trainRiskClass}`}
        aria-labelledby="practice-title"
        aria-describedby="train-risk-description"
      >
      <h2 id="practice-title" className="view-title">Train Albanian</h2>
      <p id="train-risk-description" className="sr-only">{trainHeartRiskText(trainHealth)}</p>
      <div className="train-status-strip">
        <div className={`train-combo-meter ${recoveryPlan.atMaximumHearts ? 'hearts-full' : ''}`}>
          <div className="train-combo-label" aria-hidden="true">
            <span>Correct combo</span>
            <strong>{recoveryPlan.correctCombo} in a row</strong>
          </div>
          <div
            className="train-combo-track"
            role="progressbar"
            aria-label={trainRecoveryStatusText(recoveryPlan)}
            aria-valuemin="0"
            aria-valuemax={recoveryPlan.recoveryCorrectCompletions}
            aria-valuenow={recoveryMeterValue}
          >
            <span style={{ width: recoveryPercent }} />
          </div>
          <span className="train-combo-caption" aria-hidden="true">{recoveryCaption}</span>
        </div>
      </div>
      {restoredHeart && (
        <div className="train-heart-recovery" role="status" aria-live="polite">
          <p>
            ♥ Correct combo {trainHealth.recoveryCorrectCompletions}/{trainHealth.recoveryCorrectCompletions} — one heart restored.
            {' '}You now have {state.hearts} of {trainHealth.maximumHearts} hearts.
          </p>
          {awaitingRecoveryContinue && !acceptedLeewayReview && (
            <button type="button" className="btn primary" onClick={next}>Continue training</button>
          )}
        </div>
      )}
      {isNounFormMatching ? (
        <div ref={questionRef} className="practice-question" tabIndex={-1}>
          <NounFormMatchingQuestion
            key={q.questionKey}
            q={q}
            debug={state.debug}
            onComplete={onNounFormMatchComplete}
          />
        </div>
      ) : isWordMatching ? (
        <div ref={questionRef} className="practice-question" tabIndex={-1}>
          <WordMatchingQuestion
            key={q.questionKey}
            q={q}
            debug={state.debug}
            onComplete={onWordMatchComplete}
          />
        </div>
      ) : isEverydayPhrase ? (
        <div ref={questionRef} className="practice-question" tabIndex={-1}>
          <PhrasePracticeQuestion
            key={q.questionKey}
            q={q}
            debug={state.debug}
            onComplete={onPhraseComplete}
            onContinue={next}
          />
        </div>
      ) : isContextualCompletion ? (
        <div ref={questionRef} className="practice-question" tabIndex={-1}>
          {q.audioSurface && (
            <button className="btn phrase-play" type="button" onClick={() => playPhrase(q.audioSurface)} aria-label="Play the complete Albanian exchange">
              🔊 Play exchange
            </button>
          )}
          <ContextualCompletion
            instruction={contextualInstruction}
            debug={state.debug}
            directionLabel={contextualDirectionLabel}
            badge={state.debug ? (q.difficultyLabel ? `word · ${q.difficultyLabel}` : 'word') : null}
            lines={isContextualAlbanianRetrieval ? [
              {
                id: 'english-context',
                label: 'English context',
                text: contextualEnglishCue,
              },
              {
                id: 'albanian-completion',
                label: 'Albanian completion',
                lang: 'sq',
                words: q.ctx.al.split(/\s+/),
                secondary: true,
                target: {
                  indices: q.ctx.targetTokenIndices,
                  presentation: CONTEXT_TARGET_PRESENTATION.blank,
                  accessibleLabel: 'missing Albanian word',
                },
              },
            ] : [
              {
                id: 'albanian-context',
                label: 'Albanian context',
                lang: 'sq',
                words: q.ctx.al.split(/\s+/),
                target: {
                  indices: q.ctx.targetTokenIndices,
                  presentation: contextualTargetPresentation,
                },
              },
              ...(q.promptProfile?.showEnglishContext === false ? [] : [{
                id: 'meaning-context',
                label: 'Meaning in this context',
                words: q.ctx.en.split(/\s+/),
                secondary: true,
                target: {
                  indices: [q.ctx.meaningGapTokenIndex],
                  presentation: CONTEXT_TARGET_PRESENTATION.blank,
                  accessibleLabel: 'missing meaning',
                },
              }]),
            ]}
            answers={q.options.map((id) => ({
              id,
              label: q.optionLabels?.[id] || senseText(id, q.field),
              lang: q.field === 'al' ? 'sq' : undefined,
            }))}
            answerGroupLabel={q.targetReference?.answerGroupLabel}
            answered={answered}
            selectedAnswerId={picked}
            correctAnswerIds={[q.answerId]}
            onAnswer={onPick}
            feedbackTone={wasCorrect ? 'good' : 'bad'}
            feedback={wasCorrect
              ? `Të lumtë! “${completionPhrases[0]}” +1 token for "${DICT[q.answerId].al}"`
              : null}
          />
        </div>
      ) : (
        <div ref={questionRef} className="practice-question" role="status" aria-live="polite" aria-atomic="true" tabIndex={-1}>
          <TrainingActivityShell
            instruction={grammarPhaseQuestion
                ? grammarPhaseQuestion.instruction
                : isEndingChoice
                  ? 'Choose only the ending that completes the marked noun'
                  : isEndingTyping
                    ? 'Type only the ending that completes the marked noun'
                : isForms
                ? isFormIdentityPhase
                  ? 'What does the marked Albanian form mean?'
                  : isFormOddOneOut
                    ? q.oddOneOut.prompt
                  : q.promptKind === 'noun-role-in-context'
                    ? 'What grammatical job does the marked form have here?'
                    : 'What grammatical job does the marked form have here?'
                : isWordConstruction || isWordSpelling
                    ? q.targetReference.instruction
                      : q.dir === WORD_ALBANIAN_TO_ENGLISH.id
                        ? 'What does this Albanian word mean?'
                        : 'Which Albanian word means this?'}
            debug={state.debug}
            debugMeta={q.difficultyLabel
              ? <span className="phrase-label">word · {q.difficultyLabel}</span>
              : <span className="phrase-label">word</span>}
          >
            {grammarPhaseQuestion ? (
              <div className="word-form-context noun-agreement-context">
                {grammarPhaseQuestion.cue && <p>{grammarPhaseQuestion.cue}</p>}
                <p lang={grammarPhaseQuestion.promptLang === 'sq' ? 'sq' : undefined}>
                  {grammarPhaseQuestion.prompt.split(/\s+/).map((word, index) => {
                    const clean = word.replace(/^[^\p{L}\p{M}]+|[^\p{L}\p{M}]+$/gu, '')
                    return (
                      <span key={`${word}-${index}`}>
                        {index > 0 ? ' ' : ''}
                        {grammarPhaseQuestion.markSurface === clean
                          ? <mark aria-label={`Target noun: ${word}`}>{word}</mark>
                          : word}
                      </span>
                    )
                  })}
                </p>
              </div>
            ) : isForms && (isEndingChoice || isEndingTyping) ? (
              <div className="word-form-context noun-ending-prompt">
                <p lang="sq">
                  {q.endingPrompt.split('__')[0]}
                  <mark aria-label="Missing noun ending">__</mark>
                  {q.endingPrompt.split('__')[1]}
                </p>
              </div>
            ) : isFormOddOneOut ? (
              <div className="word-form-context form-odd-one-out-prompt">
                <p>Three forms share the same grammatical feature. Choose the exception.</p>
              </div>
            ) : isForms ? (
              <div className="word-form-context">
                <p lang="sq">{q.context.al.split(/\s+/).map((word, index) => (
                  <span key={`${word}-${index}`}>
                    {index > 0 ? ' ' : ''}
                    {q.targetTokenIndices.includes(index)
                      ? <mark aria-label={`Target form: ${word}`}>{word}</mark>
                      : word}
                  </span>
                ))}</p>
              </div>
            ) : isAudioWord ? (
              <div className="word-audio-stimulus">
                <button
                  className="btn phrase-play"
                  type="button"
                  disabled={answered}
                  onClick={playWordStimulus}
                  aria-label="Play the complete recorded Albanian word"
                >
                  🔊 {wordAudioCompleted ? 'Play word again' : 'Play word'}
                </button>
                {!wordAudioCompleted && !wordAudioError && (
                  <p>Listen to the complete recording before you answer.</p>
                )}
                {wordAudioError && <p className="word-audio-error" role="alert">{wordAudioError}</p>}
              </div>
            ) : isWordConstruction || isWordSpelling ? (
              <div className="word-form-context">
                <p>{q.targetReference.meaningCue}</p>
                {(isWordSpelling ? q.typingContext?.alGap : q.context?.alGap) && (
                  <p lang="sq">{isWordSpelling ? q.typingContext.alGap : q.context.alGap}</p>
                )}
              </div>
            ) : (
              <div className="question" lang={q.dir === WORD_ALBANIAN_TO_ENGLISH.id ? 'sq' : undefined}>{q.promptText}</div>
            )}
          {isWordSpelling || isEndingTyping ? (
            <form className="phrase-type-form word-type-form" onSubmit={checkWordSpelling}>
              <label htmlFor={`word-answer-${q.questionKey}`}>
                {isEndingTyping ? 'Only the missing ending' : 'Your Albanian answer'}
              </label>
              <input
                id={`word-answer-${q.questionKey}`}
                ref={wordInputRef}
                lang="sq"
                type="text"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
                value={typedWord}
                disabled={answered || (q.requiresCompletedAudio && !wordAudioCompleted)}
                onChange={(event) => {
                  setTypedWord(event.target.value)
                  setWordRepair(null)
                }}
              />
              <div className="phrase-type-tools">
                <span>Albanian letters:</span>
                <button type="button" disabled={answered || (q.requiresCompletedAudio && !wordAudioCompleted)} onClick={() => insertWordLetter('ë')}>ë</button>
                <button type="button" disabled={answered || (q.requiresCompletedAudio && !wordAudioCompleted)} onClick={() => insertWordLetter('ç')}>ç</button>
              </div>
              {wordRepair && <p className="word-spelling-repair" role="status" aria-live="assertive">{wordSpellingRepairMessage(wordRepair)}</p>}
              <button className="btn primary phrase-check" type="submit" disabled={answered || !typedWord.trim() || (q.requiresCompletedAudio && !wordAudioCompleted)}>
                {isEndingTyping ? 'Check ending' : 'Check word'}
              </button>
            </form>
          ) : isWordConstruction ? (
            <div className="word-construction">
              <div className="word-construction-answer" lang="sq" aria-label="Constructed answer">
                {constructedText || <span aria-hidden="true">_ _ _</span>}
              </div>
              <div className="word-construction-pieces" aria-label="Choose Albanian letter chunks">
                {q.construction.pieces.map((piece) => {
                  const selected = constructedPieceIds.includes(piece.id)
                  return (
                    <button key={piece.id} type="button" className={`answer ${selected ? 'selected' : ''}`} disabled={answered || (q.requiresCompletedAudio && !wordAudioCompleted)} onClick={() => toggleConstructionPiece(piece.id)} lang="sq" aria-label={`${piece.label || piece.text} · recorded Albanian sound`}>
                      {piece.label || piece.text}
                    </button>
                  )
                })}
              </div>
              {wordRepair && <p className="word-spelling-repair" role="status" aria-live="assertive">{wordSpellingRepairMessage(wordRepair)}</p>}
              <button className="btn primary phrase-check" type="button" disabled={answered || !constructedPieceIds.length || (q.requiresCompletedAudio && !wordAudioCompleted)} onClick={checkConstruction}>Check word</button>
            </div>
          ) : (
            <div className="answers">
              {grammarPhaseQuestion
                ? grammarPhaseQuestion.options.map((option) => {
                    let cls = 'answer'
                    if (answered && option.value === correctValue) cls += ' correct'
                    else if (answered && option.value === picked) cls += ' wrong'
                    return <button key={option.value} className={cls} lang={option.lang === 'sq' ? 'sq' : undefined} disabled={answered} onClick={() => onPick(option.value)}>{option.label}</button>
                  })
                : isFormIdentityPhase
                ? q.lexicalCheck.options.map((id) => {
                    let cls = 'answer'
                    if (answered && id === correctValue) cls += ' correct'
                    else if (answered && id === picked) cls += ' wrong'
                    return <button key={id} className={cls} disabled={answered} onClick={() => onPick(id)}>{q.lexicalCheck.optionLabels[id]}</button>
                  })
                : isFormChoice
                ? q.options.map((option) => {
                    let cls = 'answer'
                    if (answered && option.value === correctValue) cls += ' correct'
                    else if (answered && option.value === picked) cls += ' wrong'
                    return <button key={option.value || 'zero-ending'} className={cls} lang={isEndingChoice || isFormOddOneOut ? 'sq' : undefined} disabled={answered} onClick={() => onPick(option.value)}>{option.label}</button>
                  })
                : q.options.map((id) => {
                    let cls = 'answer'
                    if (answered && id === q.answerId) cls += ' correct'
                    else if (answered && id === picked) cls += ' wrong'
                    return <button key={id} className={cls} lang={q.field === 'al' ? 'sq' : undefined} disabled={answered || (q.requiresCompletedAudio && !wordAudioCompleted)} onClick={() => onPick(id)}>{q.optionLabels?.[id] || senseText(id, q.field)}</button>
                  })}
            </div>
          )}

          <div className={'feedback ' + (answered ? (wasCorrect ? 'good' : 'bad') : '')} role="status" aria-live="polite" aria-atomic="true">
            {answered && wasCorrect && `Të lumtë! ${completionPhrases.map((phrase) => `“${phrase}”`).join(" · ")} +1 token for "${q.surface || DICT[q.answerId].al}"`}
          </div>
          </TrainingActivityShell>
        </div>
      )}
      </section>
      {state.debug && (
        <Suspense fallback={<p className="debug-train-loading">Loading current activity evidence…</p>}>
          <DebugTrainActivityInspector question={q} state={state} currentPhase={Array.isArray(q.phasePlan) ? { index: formPhaseIndex, total: q.phasePlan.length, id: formPhase?.id } : null} />
        </Suspense>
      )}
    </>
  )
}
