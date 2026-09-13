import { lazy, Suspense, useState, useCallback, useEffect, useRef } from 'react'
import { DICT } from '../game/content.js'
import { practiceReturnOption } from '../game/practiceReturn.js'
import { playPhrase, playWord } from '../game/audio.js'
import {
  buildPhraseQuestion,
  containsExcludedPhraseWord,
  trainQuestionWordKeys,
} from '../game/phrasePractice.js'
import {
  EVERYDAY_PHRASE_DRILLS,
} from '../game/everydayAlbanian.js'
import {
  buildNounEndingRefresher,
  phraseNounEndingRefresher,
} from '../game/nounEndingRefresher.js'
import {
  TRAIN_EXERCISE_FAMILIES,
  TRAIN_QUESTION_MIX_POLICY,
  TRAIN_SCHEDULER_SAFEGUARDS,
} from '../game/trainingProgression.js'
import { wordProgressPlan } from '../game/wordProgression.js'
import { buildWordQuestion, wordHasNoEvidence } from '../game/wordPractice.js'
import { planWordMatchingRound } from '../game/wordMatching.js'
import { wordProgressionOptionsForSense } from '../game/formInventory.js'
import { cefrProfile } from '../game/cefrAssessment.js'
import { isTrainableSense } from '../game/lexicalTrainability.js'
import PhrasePracticeQuestion from './PhrasePracticeQuestion.jsx'
import ContextualCompletion, {
  CONTEXT_TARGET_PRESENTATION,
} from './ContextualCompletion.jsx'
import { contextualTargetSelection } from '../game/contextQuestionPresentation.js'
import TrainingActivityShell from './TrainingActivityShell.jsx'
import WordMatchingQuestion from './WordMatchingQuestion.jsx'
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

export default function PracticeView({ state, dispatch }) {
  const discoveredIds = Object.keys(state.discovered).filter((id) => state.discovered[id] && isTrainableSense(id))
  const unlockedEverydayPhrases = EVERYDAY_PHRASE_DRILLS.filter((entry) =>
    entry.requires.filter(isTrainableSense).every((id) => state.discovered[id]),
  )
  const [q, setQ] = useState(null)
  const [picked, setPicked] = useState(null)
  const [typedWord, setTypedWord] = useState('')
  const [acceptedLeewayReview, setAcceptedLeewayReview] = useState(false)
  const [awaitingRecoveryContinue, setAwaitingRecoveryContinue] = useState(false)
  const [wordAudioCompleted, setWordAudioCompleted] = useState(false)
  const [wordAudioError, setWordAudioError] = useState('')
  const [wordRepair, setWordRepair] = useState(null)
  const [constructedPieceIds, setConstructedPieceIds] = useState([])
  const [formsCorrection, setFormsCorrection] = useState(null)
  const [formPhaseIndex, setFormPhaseIndex] = useState(0)
  const [contextTargetLocated, setContextTargetLocated] = useState(false)
  const [showCefr, setShowCefr] = useState(false)
  const answerCommitted = useRef(false)
  const questionRef = useRef(null)
  const wordInputRef = useRef(null)
  const previousQuestionWords = useRef([])
  const nextRef = useRef(null)
  const questionStartedAt = useRef(Date.now())
  const attemptTiming = () => {
    const attemptedAtMs = Date.now()
    return {
      attemptedAtMs,
      responseDurationMs: Math.max(0, attemptedAtMs - questionStartedAt.current),
    }
  }

  const next = useCallback(() => {
    answerCommitted.current = false
    setFormsCorrection(null)
    if (discoveredIds.length === 0) {
      setQ(null)
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
    setContextTargetLocated(false)
    const nowMs = Date.now()
    const excludeWords = previousQuestionWords.current.length
      ? previousQuestionWords.current
      : state.trainLastWords || []
    // Complete, standard-Albanian chunks own most of the training mix; the
    // remainder keeps word meanings and inflections alive.
    const modeRoll = Math.random()
    const unstartedWordDueIds = discoveredIds.filter((id) => {
      const progressionOptions = wordProgressionOptionsForSense(id)
      if (!progressionOptions.trainability.trainable) return false
      const surface = progressionOptions.context?.al || DICT[id].al
      return !containsExcludedPhraseWord(surface, excludeWords) &&
        wordHasNoEvidence(state.wordProgress?.[id]) &&
        wordProgressPlan(state.wordProgress?.[id], state.trainRound || 0, { ...progressionOptions, nowMs }).due
    })
    const unstartedWordDue = unstartedWordDueIds.length > 0
    const schedulerTrace = state.debug ? {
      builder: 'train-family-scheduler',
      currentRound: state.trainRound || 0,
      nowMs,
      modeRoll,
      phraseShare: TRAIN_QUESTION_MIX_POLICY.phraseShare,
      excludedWordKeys: [...excludeWords],
      unlockedPhraseIds: unlockedEverydayPhrases.map(({ id }) => id),
      unstartedWordDueIds,
      attempts: [],
    } : null
    const attachSchedulerTrace = (question, route, reason) => {
      if (!question) return question
      const plannedQuestion = {
        ...question,
        trainHealth: trainHealthPlanForQuestion(state, question),
      }
      if (!schedulerTrace) return plannedQuestion
      return {
        ...plannedQuestion,
        debugSelection: {
          scheduler: {
            ...schedulerTrace,
            selectedRoute: route,
            reason,
          },
          builder: question.debugSelection || null,
        },
      }
    }
    if (!unstartedWordDue && unlockedEverydayPhrases.length && modeRoll < TRAIN_QUESTION_MIX_POLICY.phraseShare) {
      schedulerTrace?.attempts.push({ family: 'phrase', reason: 'no unstarted word is due and the family roll selected the phrase share' })
      const builtPhraseQuestion = buildPhraseQuestion(
        unlockedEverydayPhrases,
        state.mana,
        state.phrasePracticed,
        state.phraseMistakes,
        {
          distractorPool: EVERYDAY_PHRASE_DRILLS,
          excludeWords,
          mastery: {
            listening: state.phraseListeningMastery,
            matching: state.phraseMatchingMastery,
          },
          productionProgress: state.phraseProductionProgress,
          listeningProgress: state.phraseListeningProgress,
          matchingProgress: state.phraseMatchingProgress,
          currentRound: state.trainRound,
          nowMs,
          debugTrace: state.debug,
        },
      )
      const phraseQuestion = attachSchedulerTrace(
        builtPhraseQuestion,
        'phrase-primary',
        'No unstarted word was due; the recorded family roll fell below phraseShare.',
      )
      if (phraseQuestion) {
        previousQuestionWords.current = trainQuestionWordKeys(phraseQuestion)
        setQ(phraseQuestion)
        return
      }
    }
    if (!unstartedWordDue && modeRoll < TRAIN_QUESTION_MIX_POLICY.phraseShare + TRAIN_QUESTION_MIX_POLICY.wordMatchingShare) {
      const matchingPlan = planWordMatchingRound({
        discoveredIds,
        wordProgress: state.wordProgress,
        wordMatchingProgress: state.wordMatchingProgress,
        practiced: state.practiced,
        excludeWords,
        currentRound: state.trainRound,
        rng: Math.random,
        debugTrace: state.debug,
      })
      schedulerTrace?.attempts.push({
        family: 'word-matching',
        reason: matchingPlan.trace.outcome.reason || 'the family roll selected a complete mixed-difficulty matching board',
        trace: matchingPlan.trace,
      })
      const matchingQuestion = attachSchedulerTrace(
        matchingPlan.question,
        'word-matching',
        'No unstarted word was due; the family roll selected mixed saved-word matching.',
      )
      if (matchingQuestion) {
        previousQuestionWords.current = trainQuestionWordKeys(matchingQuestion)
        setQ(matchingQuestion)
        return
      }
    }
    schedulerTrace?.attempts.push({
      family: 'word',
      reason: unstartedWordDue
        ? 'at least one unstarted word is due, so word learning takes priority'
        : 'the phrase-family roll did not yield a buildable phrase question',
    })
    let nextQuestion = buildWordQuestion({
      discoveredIds,
      mana: state.mana,
      practiced: state.practiced,
      wordProgress: state.wordProgress,
      wordExposure: state.wordExposure,
      currentRound: state.trainRound,
      nowMs,
      excludeWords,
      debugTrace: state.debug,
    })
    nextQuestion = attachSchedulerTrace(
      nextQuestion,
      'word',
      unstartedWordDue
        ? `${unstartedWordDueIds.length} unstarted due word${unstartedWordDueIds.length === 1 ? '' : 's'} had priority; the word builder then used its recorded weights to choose this target.`
        : 'The phrase path was not selected or could not build, so the scheduler selected a due word activity.',
    )
    // With an exceptionally tiny unlocked vocabulary there may be no legal
    // non-repeating word round. Prefer a disjoint phrase even when this roll was
    // allocated to vocabulary; null is retained only when no legal question of
    // either family exists.
    if (!nextQuestion && unlockedEverydayPhrases.length) {
      schedulerTrace?.attempts.push({ family: 'phrase-fallback', reason: 'no legal disjoint word question could be built' })
      const fallbackPhrase = buildPhraseQuestion(
        unlockedEverydayPhrases,
        state.mana,
        state.phrasePracticed,
        state.phraseMistakes,
        {
          distractorPool: EVERYDAY_PHRASE_DRILLS,
          excludeWords,
          mastery: {
            listening: state.phraseListeningMastery,
            matching: state.phraseMatchingMastery,
          },
          productionProgress: state.phraseProductionProgress,
          listeningProgress: state.phraseListeningProgress,
          matchingProgress: state.phraseMatchingProgress,
          currentRound: state.trainRound,
          nowMs,
          debugTrace: state.debug,
        },
      )
      nextQuestion = attachSchedulerTrace(
        fallbackPhrase,
        'phrase-fallback',
        'No legal disjoint word question could be built; a legal due phrase was used instead.',
      )
    }
    // Repeating the same word would defeat both the no-repeat promise and the
    // disjoint delay used by remediation. A tiny unlocked pool pauses cleanly.
    if (!nextQuestion && !TRAIN_SCHEDULER_SAFEGUARDS.repeatWhenNoDisjointTargetExists) {
      nextQuestion = { kind: TRAIN_SCHEDULER_SAFEGUARDS.exhaustedPoolOutcome }
    }
    if (nextQuestion) previousQuestionWords.current = trainQuestionWordKeys(nextQuestion)
    setQ(nextQuestion)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    discoveredIds.length,
    unlockedEverydayPhrases.length,
    state.mana,
    state.practiced,
    state.wordProgress,
    state.phrasePracticed,
    state.phraseMistakes,
    state.phraseProductionProgress,
    state.phraseListeningMastery,
    state.phraseMatchingMastery,
    state.phraseListeningProgress,
    state.phraseMatchingProgress,
    state.wordMatchingProgress,
    state.trainRound,
    state.trainLastWords,
    state.trainStageExposures,
    state.debug,
  ])

  nextRef.current = next
  const onPhraseComplete = useCallback((result) => {
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
    dispatch({ type: 'PRACTICE_PHRASE_RESULT', ...result, consequence })
    if (guide) {
      setFormsCorrection({
        kind: 'forms-correction',
        guide,
        stage: 'phrase-production',
        chosen: result.diagnostic.answerSurface || 'a different form',
        lemma: DICT[result.diagnostic.focusId].al,
        meaning: senseText(result.diagnostic.focusId, 'en'),
      })
      return
    }
    if (result.correct && !result.acceptedWithLeeway && !restoresHeart) setTimeout(() => nextRef.current?.(), 1900)
    else if (!result.correct) setTimeout(() => nextRef.current?.(), 0)
  }, [dispatch, q, state])

  const onWordMatchComplete = useCallback((result) => {
    const restoresHeart = result.correct && trainCorrectWillRestoreHeart(
      trainHealthPlanForQuestion(state, q),
    )
    setAwaitingRecoveryContinue(restoresHeart)
    const wordKeys = trainQuestionWordKeys(q)
    const correctPair = q.pairs.find(({ al }) => al === result.attempted?.al)
    dispatch({
      type: 'PRACTICE_WORD_MATCH_RESULT',
      correct: result.correct,
      variantId: q.variantId,
      wordIds: q.wordIds,
      questionKey: q.questionKey,
      wordKeys,
      attemptedAtMs: result.attemptedAtMs,
      responseDurationMs: result.responseDurationMs,
      consequence: result.correct ? null : trainMissConsequence({
        source: 'train-word-matching',
        questionKey: q.questionKey,
        attemptedAl: result.attempted?.al,
        attemptedEn: result.attempted?.en,
        reasonCode: 'wrong-word-match',
        reason: `“${result.attempted?.en || 'that meaning'}” belongs to a different Albanian word on this board.`,
        correctAl: correctPair?.al,
        correctEn: correctPair?.en,
      }),
    })
    if (result.correct && !restoresHeart) setTimeout(() => nextRef.current?.(), 1800)
    else if (!result.correct) setTimeout(() => nextRef.current?.(), 0)
  }, [dispatch, q, state])

  useEffect(() => {
    if (!q && discoveredIds.length > 0) next()
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
  }, [q, formsCorrection])

  if (showCefr) {
    return <CefrCapstone state={state} dispatch={dispatch} onClose={() => setShowCefr(false)} />
  }

  if (discoveredIds.length === 0) {
    return (
      <>
        <CefrEntry state={state} onOpen={() => setShowCefr(true)} />
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
        <CefrEntry state={state} onOpen={() => setShowCefr(true)} />
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
        <CefrEntry state={state} onOpen={() => setShowCefr(true)} />
        <section className="card practice" aria-labelledby="practice-title">
          <h2 id="practice-title" className="view-title">Train Albanian</h2>
          <p className="empty" role="status">
            You’re caught up for now. Discover another word or come back after your next story beat.
          </p>
          <button className="btn primary" onClick={() => dispatch({ type: 'SET_VIEW', view: 'story' })}>
            Return to story
          </button>
        </section>
      </>
    )
  }

  const isForms = q.kind === TRAIN_EXERCISE_FAMILIES.wordForms.kind
  const isFormIntro = isForms && q.formExerciseMode === 'identify-form'
  const isEndingChoice = isForms && q.formExerciseMode === 'ending-choice'
  const isEndingTyping = isForms && q.formExerciseMode === 'ending-type'
  const isFormOddOneOut = isForms && q.formExerciseMode === 'form-odd-one-out'
  const isFormChoice = isFormIntro || isEndingChoice || isFormOddOneOut
  const isWordConstruction = q.kind === TRAIN_EXERCISE_FAMILIES.wordConstruction.kind
  const isWordSpelling = q.kind === TRAIN_EXERCISE_FAMILIES.wordSpelling.kind
  const isAudioWord = q.stimulusMode === 'audio-only'
  const isEverydayPhrase = q.kind === TRAIN_EXERCISE_FAMILIES.phrase.kind
  const isWordMatching = q.kind === TRAIN_EXERCISE_FAMILIES.wordMatching.kind
  const isContextualCompletion = q.kind === TRAIN_EXERCISE_FAMILIES.wordContext.kind
  const formPhase = isForms ? q.phasePlan?.[formPhaseIndex] : null
  const trainHealth = trainHealthPlanForQuestion(state, q, { phaseId: formPhase?.id || null })
  const recoveryPlan = trainRecoveryPlanForState(state, trainHealth.maximumHearts)
  const restoredHeart = state.trainRecoveryEvent?.questionKey === q.questionKey
  const isContextualAlbanianRetrieval = isContextualCompletion && q.dir === 'en2al'
  const contextualTargetKind = q.promptProfile?.targetKind || 'lexical-meaning'
  const contextualTargetPresentation = isContextualAlbanianRetrieval
    ? CONTEXT_TARGET_PRESENTATION.blank
    : q.promptProfile?.contextPresentation === CONTEXT_TARGET_PRESENTATION.namedMarked
      ? CONTEXT_TARGET_PRESENTATION.namedMarked
      : q.promptProfile?.contextPresentation === CONTEXT_TARGET_PRESENTATION.unmarked
        ? CONTEXT_TARGET_PRESENTATION.unmarked
        : CONTEXT_TARGET_PRESENTATION.marked
  const contextTargetSelectionActive = isContextualCompletion &&
    q.targetReference?.requiresTargetIdentification === true &&
    !contextTargetLocated
  const contextualInstruction = contextTargetSelectionActive ? (
    <>
      {q.targetReference.locateInstructionPrefix}
      <span lang="sq">“{q.targetReference.locateInstructionTarget}”</span>
      {q.targetReference.locateInstructionSuffix}
    </>
  ) : q.targetReference?.instructionTarget ? (
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
  const isFormIdentityPhase = isFormIntro && formPhase?.task === 'lemma-identification'
  const isFormSelectionPhase = isFormIntro && formPhase?.task === 'reviewed-form-selection'
  const isFormSupportPhase = isFormIdentityPhase || isFormSelectionPhase
  const correctValue = grammarPhaseQuestion
    ? grammarPhaseQuestion.answerValue
    : isFormIdentityPhase
    ? q.lexicalCheck.answerId
    : isFormSelectionPhase
      ? q.formSelectionCheck.answerValue
    : isFormChoice
      ? q.answerValue
      : q.answerId
  const answered = picked !== null
  const wasCorrect = picked === correctValue

  const onContextTargetSelect = (tokenIndex) => {
    if (!contextTargetSelectionActive || answered || answerCommitted.current) return
    const result = contextualTargetSelection(q.targetReference, tokenIndex)
    if (!result.eligible) return
    if (result.correct) {
      playWord(q.ctx.target)
      setContextTargetLocated(true)
      window.requestAnimationFrame(() => questionRef.current?.focus())
      return
    }

    answerCommitted.current = true
    setPicked('__context-target-miss__')
    const attemptedToken = q.ctx.al.split(/\s+/)[tokenIndex] || ''
    dispatch({
      type: 'PRACTICE_WORD_RESULT',
      correct: false,
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
      ...attemptTiming(),
      consequence: trainMissConsequence({
        source: 'train-context-target',
        questionKey: q.questionKey,
        attemptedAl: attemptedToken,
        reasonCode: 'wrong-context-target',
        reason: `“${attemptedToken}” is not the named word “${q.ctx.target}” in this sentence.`,
        correctAl: q.ctx.target,
        reasoning: 'First locate the exact Albanian surface named in the instruction; then analyse that marked occurrence.',
      }),
    })
    setTimeout(() => nextRef.current?.(), 0)
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
          reasoning: miss.reasoning || null,
        }),
      })
      playWord(q.surface)
      if (correct && !restoresHeart) setTimeout(() => nextRef.current?.(), 1200)
      else if (!correct) setTimeout(() => nextRef.current?.(), 0)
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
      const chosen = isFormIdentityPhase
        ? q.lexicalCheck.optionLabels[value]
        : q.formSelectionCheck.options.find((option) => option.value === value)?.label || String(value)
      const correctMeaning = isFormIdentityPhase ? q.lexicalCheck.optionLabels[q.answerId] : null
      dispatch({
        type: 'PRACTICE_WORD_RESULT',
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
        ...attemptTiming(),
        consequence: trainMissConsequence({
          source: 'train-form',
          questionKey: q.questionKey,
          attemptedEn: chosen,
          reasonCode: isFormIdentityPhase ? 'wrong-marked-form-lemma' : 'wrong-contextual-form',
          reason: isFormIdentityPhase
            ? `“${chosen}” is not the base word and meaning of the marked form “${q.surface}”.`
            : `“${chosen}” is not the reviewed form required by this Albanian sentence.`,
          correctAl: isFormIdentityPhase ? DICT[q.answerId].al : q.surface,
          correctEn: correctMeaning,
          reasoning: isFormIdentityPhase
            ? 'Identify the base word before deciding which inflected form the sentence needs.'
            : 'Use the Albanian context to choose the exact reviewed form before naming its grammatical job.',
        }),
      })
      setTimeout(() => nextRef.current?.(), 0)
      return
    }

    if (isFormChoice) {
      playWord(q.surface)
      const chosen = q.options.find((option) => option.value === value)?.label || String(value)
      const correctOption = q.options.find((option) => option.value === correctValue)?.label || q.surface
      const isEnding = isEndingChoice
      const restoresHeart = correct && trainCorrectWillRestoreHeart(trainHealth)
      setAwaitingRecoveryContinue(restoresHeart)
      const guide = !correct && q.formTarget?.wordClass === 'noun'
        ? buildNounEndingRefresher(q.answerId, q.surface, q.formTarget.gloss)
        : null
      dispatch({
        type: 'PRACTICE_WORD_RESULT',
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
      if (guide) {
        setFormsCorrection({
          kind: 'forms-correction',
          guide,
          stage: q.wordStageId,
          chosen,
          lemma: DICT[q.answerId].al,
          meaning: senseText(q.answerId, 'en'),
        })
      } else if (correct && !restoresHeart) setTimeout(() => nextRef.current?.(), 1200)
      else if (!correct) setTimeout(() => nextRef.current?.(), 0)
      return
    }

    // normal / context question
    playWord(DICT[q.answerId].al)
    const wordKeys = trainQuestionWordKeys(q)
    const chosenLabel = q.optionLabels?.[value] || senseText(value, q.field)
    const correctLabel = q.optionLabels?.[q.answerId] || senseText(q.answerId, q.field)
    const restoresHeart = correct && trainCorrectWillRestoreHeart(trainHealth)
    setAwaitingRecoveryContinue(restoresHeart)
    dispatch({
      type: 'PRACTICE_WORD_RESULT',
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
      }),
    })
    if (correct && !restoresHeart) setTimeout(() => nextRef.current?.(), 1200)
    else if (!correct) setTimeout(() => nextRef.current?.(), 0)
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
    playWord(isEndingTyping ? q.surface : q.typingAnswer)
    const guide = !result.correct && isEndingTyping
      ? buildNounEndingRefresher(q.answerId, q.surface, q.formTarget.gloss)
      : null
    dispatch({
      type: 'PRACTICE_WORD_RESULT',
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
        grammarGuide: guide,
      }),
    })
    if (guide) {
      setFormsCorrection({
        kind: 'forms-correction',
        guide,
        stage: q.wordStageId,
        chosen: typedWord.trim(),
        lemma: DICT[q.answerId].al,
        meaning: senseText(q.answerId, 'en'),
      })
      return
    }
    if (result.correct && !restoresHeart) setTimeout(() => nextRef.current?.(), 1600)
    else if (!result.correct) setTimeout(() => nextRef.current?.(), 0)
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
    playWord(q.surface)
    dispatch({
      type: 'PRACTICE_WORD_RESULT',
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
      }),
    })
    if (correct && !restoresHeart) setTimeout(() => nextRef.current?.(), 1500)
    else if (!correct) setTimeout(() => nextRef.current?.(), 0)
  }

  if (formsCorrection) {
    const { guide, stage, chosen, lemma, meaning } = formsCorrection
    return (
      <>
        <section className="card practice" aria-labelledby="practice-title">
          <h2 id="practice-title" className="view-title">Train Albanian</h2>
          <div ref={questionRef} className="noun-ending-refresher" aria-labelledby="ending-refresher-title" tabIndex={-1}>
          <h3 className="prompt" id="ending-refresher-title">Quick ending refresher</h3>
          <p className="noun-ending-correction" role="status" aria-live="assertive">
            {stage === 'reviewed-form-contrast' ? (
              <>
                You chose “{chosen}”. <b lang="sq">{guide.target.al}</b> belongs to{' '}
                <b lang="sq">{lemma}</b> ({meaning}); this form means “{guide.target.learnerMeaning}”.
              </>
            ) : stage === 'phrase-production' ? (
              <>
                In that phrase you wrote “{chosen}”. The needed form was{' '}
                <b lang="sq">{guide.target.al}</b> from <b lang="sq">{lemma}</b> ({meaning});
                here it means “{guide.target.learnerMeaning}”.
              </>
            ) : (
              <>
                You chose “{chosen}”. Here <b lang="sq">{guide.target.al}</b> means{' '}
                “{guide.target.learnerMeaning}”.
              </>
            )}
          </p>
          <div className="noun-ending-layer-label">This noun</div>
          <h4 className="noun-ending-same-noun">Same noun, different job</h4>
          <dl className="noun-ending-rows">
            {guide.rows.map((row) => (
              <div className={row.missed ? 'noun-ending-row missed' : 'noun-ending-row'} key={`${row.tag}-${row.al}`}>
                <dt>
                  <b lang="sq">{row.al}</b>
                  {row.missed && <span className="noun-ending-this">this form</span>}
                </dt>
                <dd>
                  <div className="noun-ending-job"><span>{row.role}</span><span>{row.learnerMeaning}</span></div>
                  <div className="noun-ending-example">
                    <span lang="sq">{row.example.al}</span>
                    <span>{row.example.en}</span>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
          <div className="noun-ending-rule">
            <h4>Pattern to reuse</h4>
            <p className="noun-ending-pattern">{guide.pattern}</p>
            {guide.peer && (
              <div className="noun-ending-peer">
                <b>Same pattern:</b>
                <div className="noun-ending-peer-forms" lang="sq">
                  {guide.peer.rows.map((row) => (
                    <span key={`${row.tag}-${row.al}`}>
                      <strong>{row.al}</strong>
                      <small>{row.role}</small>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
            <button className="btn primary noun-ending-continue" onClick={next}>Continue training</button>
          </div>
        </section>
        {state.debug && (
          <Suspense fallback={<p className="debug-train-loading">Loading current activity evidence…</p>}>
            <DebugTrainActivityInspector question={q} state={state} currentPhase={Array.isArray(q.phasePlan) ? { index: formPhaseIndex, total: q.phasePlan.length, id: formPhase?.id } : null} />
          </Suspense>
        )}
      </>
    )
  }

  // Only the exact story option whose Train button opened this view may offer
  // a return. A single drill can fund several choices; those siblings do not
  // inherit this option's affordance.
  const returnOption = practiceReturnOption(state)

  return (
    <>
      <CefrEntry state={state} onOpen={() => setShowCefr(true)} />
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

      <section className="card practice" aria-labelledby="practice-title">
      <h2 id="practice-title" className="view-title">Train Albanian</h2>
      <div
        className={`train-heart-risk ${trainHealth.protectedAttempt ? 'protected' : trainHealth.missEndsRun ? 'lethal' : 'at-risk'}`}
        role="note"
        aria-label={trainHeartRiskText(trainHealth)}
      >
        <span aria-hidden="true">{trainHealth.protectedAttempt ? '🛡' : trainHealth.missEndsRun ? '💔' : '♥'}</span>
        <span>{trainHeartRiskText(trainHealth)}</span>
      </div>
      <p className="train-recovery-status" role="note">
        {trainRecoveryStatusText(recoveryPlan)}
      </p>
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
      {isWordMatching ? (
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
                  presentation: contextTargetLocated
                    ? CONTEXT_TARGET_PRESENTATION.marked
                    : contextualTargetPresentation,
                  selectable: contextTargetSelectionActive,
                  disabled: answered || answerCommitted.current,
                  onSelect: onContextTargetSelect,
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
            answers={(contextTargetSelectionActive ? [] : q.options).map((id) => ({
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
              ? `Të lumtë! +1 token for "${DICT[q.answerId].al}"`
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
                  ? 'Which base word does the marked Albanian form belong to?'
                  : isFormSelectionPhase
                    ? 'Which reviewed form completes this Albanian sentence?'
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
            ) : isFormSelectionPhase ? (
              <div className="word-form-context">
                <p lang="sq">{q.context.alGap}</p>
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
                : isFormSelectionPhase
                  ? q.formSelectionCheck.options.map((option) => {
                      let cls = 'answer'
                      if (answered && option.value === correctValue) cls += ' correct'
                      else if (answered && option.value === picked) cls += ' wrong'
                      return <button key={option.value} className={cls} lang="sq" disabled={answered} onClick={() => onPick(option.value)}>{option.label}</button>
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
            {answered && wasCorrect && `Të lumtë! +1 token for "${q.surface || DICT[q.answerId].al}"`}
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
