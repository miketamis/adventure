import { useState, useCallback, useEffect, useRef } from 'react'
import { DICT } from '../game/content.js'
import { practiceReturnOption } from '../game/practiceReturn.js'
import { playPhrase, playWord } from '../game/audio.js'
import {
  buildPhraseQuestion,
  containsExcludedPhraseWord,
  phraseAnswerResult,
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
import { wordProgressionOptionsForSense } from '../game/formInventory.js'
import { cefrProfile } from '../game/cefrAssessment.js'
import { isTrainableSense } from '../game/lexicalTrainability.js'
import PhrasePracticeQuestion from './PhrasePracticeQuestion.jsx'
import ContextualCompletion, {
  CONTEXT_TARGET_PRESENTATION,
} from './ContextualCompletion.jsx'
import CefrCapstone from './CefrCapstone.jsx'

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
  const [typedWordLeeway, setTypedWordLeeway] = useState(false)
  const [constructedPieceIds, setConstructedPieceIds] = useState([])
  const [formsCorrection, setFormsCorrection] = useState(null)
  const [showCefr, setShowCefr] = useState(false)
  const answerCommitted = useRef(false)
  const questionRef = useRef(null)
  const wordInputRef = useRef(null)
  const previousQuestionWords = useRef([])
  const nextRef = useRef(null)

  const next = useCallback(() => {
    answerCommitted.current = false
    setFormsCorrection(null)
    if (discoveredIds.length === 0) {
      setQ(null)
      return
    }
    setPicked(null)
    setTypedWord('')
    setTypedWordLeeway(false)
    setConstructedPieceIds([])
    const excludeWords = previousQuestionWords.current.length
      ? previousQuestionWords.current
      : state.trainLastWords || []
    // Complete, standard-Albanian chunks own most of the training mix; the
    // remainder keeps word meanings and inflections alive.
    const modeRoll = Math.random()
    const unstartedWordDue = discoveredIds.some((id) => {
      const progressionOptions = wordProgressionOptionsForSense(id)
      if (!progressionOptions.trainability.trainable) return false
      const surface = progressionOptions.context?.al || DICT[id].al
      return !containsExcludedPhraseWord(surface, excludeWords) &&
        wordHasNoEvidence(state.wordProgress?.[id]) &&
        wordProgressPlan(state.wordProgress?.[id], state.trainRound || 0, progressionOptions).due
    })
    if (!unstartedWordDue && unlockedEverydayPhrases.length && modeRoll < TRAIN_QUESTION_MIX_POLICY.phraseShare) {
      const phraseQuestion = buildPhraseQuestion(
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
          currentRound: state.trainRound,
        },
      )
      if (phraseQuestion) {
        previousQuestionWords.current = trainQuestionWordKeys(phraseQuestion)
        setQ(phraseQuestion)
        return
      }
    }
    let nextQuestion = buildWordQuestion({
      discoveredIds,
      mana: state.mana,
      wordProgress: state.wordProgress,
      currentRound: state.trainRound,
      excludeWords,
    })
    // With an exceptionally tiny unlocked vocabulary there may be no legal
    // non-repeating word round. Prefer a disjoint phrase even when this roll was
    // allocated to vocabulary; null is retained only when no legal question of
    // either family exists.
    if (!nextQuestion && unlockedEverydayPhrases.length) {
      nextQuestion = buildPhraseQuestion(
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
          currentRound: state.trainRound,
        },
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
    state.wordProgress,
    state.phrasePracticed,
    state.phraseMistakes,
    state.phraseProductionProgress,
    state.phraseListeningMastery,
    state.phraseMatchingMastery,
    state.trainRound,
    state.trainLastWords,
  ])

  nextRef.current = next
  const onPhraseComplete = useCallback((result) => {
    dispatch({ type: 'PRACTICE_PHRASE_RESULT', ...result })
    const guide = phraseNounEndingRefresher(q, result)
    if (guide) {
      setTimeout(() => setFormsCorrection({
        kind: 'forms-correction',
        guide,
        stage: 'phrase-production',
        chosen: result.diagnostic.answerSurface || 'a different form',
        lemma: DICT[result.diagnostic.focusId].al,
        meaning: senseText(result.diagnostic.focusId, 'en'),
      }), 2800)
      return
    }
    setTimeout(() => nextRef.current?.(), result.correct ? 1900 : 2800)
  }, [dispatch, q])

  useEffect(() => {
    if (!q && discoveredIds.length > 0) next()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoveredIds.length])

  useEffect(() => {
    if (!q) return undefined
    const frame = window.requestAnimationFrame(() => {
      if (q.kind === TRAIN_EXERCISE_FAMILIES.wordSpelling.kind) wordInputRef.current?.focus()
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
  const isFormContext = q.kind === TRAIN_EXERCISE_FAMILIES.wordFormContext.kind
  const isFormChoice = isForms || isFormContext
  const isWordConstruction = q.kind === TRAIN_EXERCISE_FAMILIES.wordConstruction.kind
  const isWordSpelling = q.kind === TRAIN_EXERCISE_FAMILIES.wordSpelling.kind
  const isEverydayPhrase = q.kind === TRAIN_EXERCISE_FAMILIES.phrase.kind
  const isContextualCompletion = q.kind === TRAIN_EXERCISE_FAMILIES.wordContext.kind
  const isContextualAlbanianRetrieval = isContextualCompletion && q.dir === 'en2al'
  const contextualTargetKind = q.promptProfile?.targetKind || 'lexical-meaning'
  const contextualTargetPresentation = isContextualAlbanianRetrieval
    ? CONTEXT_TARGET_PRESENTATION.blank
    : q.promptProfile?.contextPresentation === 'unmarked'
      ? CONTEXT_TARGET_PRESENTATION.unmarked
      : CONTEXT_TARGET_PRESENTATION.marked
  const contextualTargetIsMarked = contextualTargetPresentation === CONTEXT_TARGET_PRESENTATION.marked
  const contextualInstruction = isContextualAlbanianRetrieval
    ? 'Complete the Albanian sentence'
    : contextualTargetKind === 'grammatical-function'
    ? contextualTargetIsMarked
      ? 'What job does the marked word do here?'
      : 'Which grammatical job fits the key word in this context?'
    : contextualTargetIsMarked
      ? 'Choose what the marked word means here'
      : 'Choose the meaning that fits this Albanian context'
  const contextualDirectionLabel = isContextualAlbanianRetrieval
    ? 'English context → Albanian'
    : contextualTargetKind === 'grammatical-function'
      ? 'Albanian → grammatical job'
      : 'Albanian → meaning'
  const contextualEnglishCue = isContextualCompletion
    ? q.ctx.en.replace('__', senseText(q.answerId, 'en'))
    : ''
  const correctValue = isFormChoice ? q.answerValue : q.answerId
  const answered = picked !== null
  const wasCorrect = picked === correctValue

  const onPick = (value) => {
    if (answered || answerCommitted.current) return
    answerCommitted.current = true
    setPicked(value)
    const correct = value === correctValue

    if (isFormChoice) {
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
        questionKey: q.questionKey,
        wordKeys: trainQuestionWordKeys(q),
      })
      const guide = !correct && q.formTarget?.wordClass === 'noun'
        ? buildNounEndingRefresher(q.answerId, q.surface, q.formTarget.gloss)
        : null
      if (guide) {
        const chosen = q.options.find((option) => option.value === value)?.label || String(value)
        setTimeout(() => setFormsCorrection({
          kind: 'forms-correction',
          guide,
          stage: q.wordStageId,
          chosen,
          lemma: DICT[q.answerId].al,
          meaning: senseText(q.answerId, 'en'),
        }), 900)
      } else setTimeout(() => nextRef.current?.(), correct ? 1200 : 2000)
      return
    }

    // normal / context question
    playWord(DICT[q.answerId].al)
    const wordKeys = trainQuestionWordKeys(q)
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
      questionKey: q.questionKey,
      wordKeys,
    })
    setTimeout(() => nextRef.current?.(), correct ? 1200 : 2000)
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

  const checkWordSpelling = (event) => {
    event.preventDefault()
    if (!isWordSpelling || !typedWord.trim() || answerCommitted.current) return
    answerCommitted.current = true
    const result = phraseAnswerResult(typedWord, q.typingAnswer, q.answerTolerance)
    setTypedWordLeeway(result.usedLeeway)
    setPicked(result.correct ? q.answerId : '__typed-word-miss__')
    playWord(q.typingAnswer)
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
      questionKey: q.questionKey,
      wordKeys: trainQuestionWordKeys(q),
    })
    setTimeout(() => nextRef.current?.(), result.correct ? 1600 : 2400)
  }

  const constructedText = isWordConstruction
    ? constructedPieceIds.map((id) => q.construction.pieces.find((piece) => piece.id === id)?.text || '').join('')
    : ''
  const toggleConstructionPiece = (pieceId) => {
    if (answered) return
    setConstructedPieceIds((current) => current.includes(pieceId)
      ? current.filter((id) => id !== pieceId)
      : [...current, pieceId])
  }
  const checkConstruction = () => {
    if (!isWordConstruction || !constructedPieceIds.length || answerCommitted.current) return
    answerCommitted.current = true
    const correct = constructedText.normalize('NFC').toLocaleLowerCase('sq') === q.answerValue
    setPicked(correct ? q.answerId : '__construction-miss__')
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
      questionKey: q.questionKey,
      wordKeys: trainQuestionWordKeys(q),
    })
    setTimeout(() => nextRef.current?.(), correct ? 1500 : 2300)
  }

  if (formsCorrection) {
    const { guide, stage, chosen, lemma, meaning } = formsCorrection
    return (
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
      {isEverydayPhrase ? (
        <div ref={questionRef} className="practice-question" tabIndex={-1}>
          <PhrasePracticeQuestion
            key={q.questionKey}
            q={q}
            onComplete={onPhraseComplete}
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
            directionLabel={contextualDirectionLabel}
            badge={q.difficultyLabel ? `word · ${q.difficultyLabel}` : 'word'}
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
            answerGroupLabel={isContextualAlbanianRetrieval
              ? 'Choose the missing Albanian word'
              : contextualTargetKind === 'grammatical-function'
              ? 'Choose the target word’s grammatical job'
              : 'Choose the target word’s meaning'}
            answered={answered}
            selectedAnswerId={picked}
            correctAnswerIds={[q.answerId]}
            onAnswer={onPick}
            feedbackTone={wasCorrect ? 'good' : 'bad'}
            feedback={wasCorrect
              ? `Të lumtë! +1 token for "${DICT[q.answerId].al}"`
              : `💔 −1 heart · correct answer: ${q.optionLabels?.[q.answerId] || senseText(q.answerId, q.field)}`}
          />
        </div>
      ) : (
        <>
          <div ref={questionRef} className="practice-question" role="status" aria-live="polite" aria-atomic="true" tabIndex={-1}>
            <div className="prompt">
              {isForms
                ? q.promptKind === 'noun-role-in-context'
                  ? 'What grammatical job does the marked form have here?'
                  : 'Which reviewed use fits this word here?'
                : isFormContext
                  ? 'Choose the correct form for this context'
                  : isWordConstruction
                    ? 'Build this in Albanian'
                    : isWordSpelling
                      ? 'Write the missing word in Albanian'
                      : q.dir === WORD_ALBANIAN_TO_ENGLISH.id
                        ? 'What does this Albanian word mean?'
                        : 'Which Albanian word means this?'}
              {q.difficultyLabel && <span className="phrase-label practice-word-level">{q.difficultyLabel}</span>}
            </div>

            {isForms ? (
              <div className="word-form-context">
                <p lang="sq">{q.context.al.split(q.surface).map((part, index, parts) => (
                  <span key={`${part}-${index}`}>{part}{index < parts.length - 1 && <mark>{q.surface}</mark>}</span>
                ))}</p>
                <small>{q.context.en}</small>
              </div>
            ) : isFormContext || isWordConstruction || isWordSpelling ? (
              <div className="word-form-context">
                <p>{q.context?.en || q.typingCue}</p>
                {q.context?.alGap && <p lang="sq">{q.context.alGap}</p>}
              </div>
            ) : (
              <div className="question" lang={q.dir === WORD_ALBANIAN_TO_ENGLISH.id ? 'sq' : undefined}>{q.promptText}</div>
            )}
          </div>

          {isWordSpelling ? (
            <form className="phrase-type-form word-type-form" onSubmit={checkWordSpelling}>
              <label htmlFor={`word-answer-${q.questionKey}`}>Your Albanian answer</label>
              <input
                id={`word-answer-${q.questionKey}`}
                ref={wordInputRef}
                lang="sq"
                type="text"
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
                value={typedWord}
                disabled={answered}
                onChange={(event) => setTypedWord(event.target.value)}
              />
              <div className="phrase-type-tools">
                <span>Albanian letters:</span>
                <button type="button" disabled={answered} onClick={() => insertWordLetter('ë')}>ë</button>
                <button type="button" disabled={answered} onClick={() => insertWordLetter('ç')}>ç</button>
              </div>
              <button className="btn primary phrase-check" type="submit" disabled={answered || !typedWord.trim()}>Check word</button>
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
                    <button key={piece.id} type="button" className={`answer ${selected ? 'selected' : ''}`} disabled={answered} onClick={() => toggleConstructionPiece(piece.id)} lang="sq">
                      {piece.label || piece.text}
                    </button>
                  )
                })}
              </div>
              <button className="btn primary phrase-check" type="button" disabled={answered || !constructedPieceIds.length} onClick={checkConstruction}>Check word</button>
            </div>
          ) : (
            <div className="answers">
              {isFormChoice
                ? q.options.map((option) => {
                    let cls = 'answer'
                    if (answered && option.value === correctValue) cls += ' correct'
                    else if (answered && option.value === picked) cls += ' wrong'
                    return <button key={option.value} className={cls} lang={isFormContext ? 'sq' : undefined} disabled={answered} onClick={() => onPick(option.value)}>{option.label}</button>
                  })
                : q.options.map((id) => {
                    let cls = 'answer'
                    if (answered && id === q.answerId) cls += ' correct'
                    else if (answered && id === picked) cls += ' wrong'
                    return <button key={id} className={cls} lang={q.field === 'al' ? 'sq' : undefined} disabled={answered} onClick={() => onPick(id)}>{senseText(id, q.field)}</button>
                  })}
            </div>
          )}

          <div className={'feedback ' + (answered ? (wasCorrect ? 'good' : 'bad') : '')} role="status" aria-live="polite" aria-atomic="true">
            {answered && (wasCorrect
              ? typedWordLeeway
                ? `Të lumtë! +1 token · accepted here; compare “${q.typingAnswer}”`
                : `Të lumtë! +1 token for "${q.surface || DICT[q.answerId].al}"`
              : `💔 −1 heart · correct answer: ${q.surface || senseText(q.answerId, q.field)}`)}
          </div>
        </>
      )}
      </section>
    </>
  )
}
