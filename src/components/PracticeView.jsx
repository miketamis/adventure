import { useState, useCallback, useEffect, useRef } from 'react'
import { DICT, splitStem } from '../game/content.js'
import { formTrackForSense, formsUnlocked, trainingForms } from '../game/formInventory.js'
import { practiceReturnOption } from '../game/practiceReturn.js'
import { playWord } from '../game/audio.js'
import {
  buildPhraseQuestion,
  containsExcludedPhraseWord,
  phraseAnswerResult,
  trainQuestionWordKeys,
} from '../game/phrasePractice.js'
import {
  EVERYDAY_CORE_SENSE_SET,
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
  TRAIN_WORD_FORM_POLICY,
} from '../game/trainingProgression.js'
import { wordProgressPlan } from '../game/wordProgression.js'
import { buildWordQuestion, wordHasNoEvidence } from '../game/wordPractice.js'
import { pickLeastPracticedForm } from '../game/formProgression.js'
import { cefrProfile } from '../game/cefrAssessment.js'
import PhrasePracticeQuestion from './PhrasePracticeQuestion.jsx'
import CefrCapstone from './CefrCapstone.jsx'

// the answer rendered in Albanian (every word is discovered when affordable)
const albanianPhrase = (tokens) => tokens.map((t) => (t.id ? t.al : t.en)).join(' ')
const [WORD_ALBANIAN_TO_ENGLISH] = TRAIN_EXERCISE_FAMILIES.wordMeaning.variants
const [FORM_IDENTIFY_LEMMA, FORM_IDENTIFY_JOB] = TRAIN_WORD_FORM_POLICY.steps

// The text shown for a sense on a given side. Training shows *all* English
// senses (enAll, e.g. "on / in") where the story only shows the contextual one.
const senseText = (id, field) =>
  field === 'en' ? DICT[id].enAll ?? DICT[id].en : DICT[id][field]

// pick an id, weighted so words you already hold more tokens of come up less
// often — and words you hold NONE of are heavily favoured, so training fills the
// gaps in what you can afford rather than re-drilling words you're already flush in.
const weightedPick = (ids, mana) => {
  const weights = ids.map((id) => {
    const n = mana[id] || 0
    const need = n === 0 ? TRAIN_QUESTION_MIX_POLICY.zeroTokenWeight : 1 / (n + 1)
    // Practical conversation stays prominent even after folklore words enter
    // the dictionary. This is a curriculum choice, not a cosmetic sort order.
    return need * (EVERYDAY_CORE_SENSE_SET.has(id) ? TRAIN_QUESTION_MIX_POLICY.practicalWordWeight : 1)
  })
  const total = weights.reduce((a, b) => a + b, 0)
  let r = Math.random() * total
  for (let i = 0; i < ids.length; i++) {
    r -= weights[i]
    if (r <= 0) return ids[i]
  }
  return ids[ids.length - 1]
}
const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// A reviewed-form question, unlocked once a word has been practiced enough.
// Every word class can ask which sense an attested surface belongs to. Canonical
// nouns add a second grammatical-role step and retain their targeted refresher.
function buildFormsQuestion(answerId, discoveredIds, excludeWords = [], formPracticed = {}) {
  const forms = trainingForms(answerId) // lemma row first, then every reviewed form
  const lemma = DICT[answerId].al.toLowerCase()
  const inflected = forms.filter((f) =>
    f.al.toLowerCase() !== lemma && !containsExcludedPhraseWord(f.al, excludeWords),
  )
  if (!inflected.length) return null
  // Complete the least-seen layer before repeating a form. Frequency only
  // orders equally unseen candidates, so rare reviewed forms cannot starve.
  const target = pickLeastPracticedForm(inflected, answerId, formPracticed)

  // step 1 distractors: other discovered words (fall back to the whole dict)
  const answerText = senseText(answerId, 'en')
  const pool = discoveredIds.length >= 4 ? discoveredIds : Object.keys(DICT)
  const distractors = []
  const usedText = new Set([answerText])
  for (const id of shuffle(pool)) {
    if (id === answerId || DICT[id].al === DICT[answerId].al) continue
    const text = senseText(id, 'en')
    if (usedText.has(text)) continue
    usedText.add(text)
    distractors.push(id)
    if (distractors.length === TRAIN_EXERCISE_FAMILIES.wordForms.choiceDistractors) break
  }

  // step 2 options: this word's OWN form glosses, deduped on identical text (so two
  // syncretic tags that share a gloss collapse to one option)
  const seen = new Set()
  const glosses = []
  for (const f of forms) {
    if (seen.has(f.gloss)) continue
    seen.add(f.gloss)
    glosses.push(f.gloss)
  }

  return {
    kind: TRAIN_EXERCISE_FAMILIES.wordForms.kind,
    answerId,
    surface: target.al,
    ...formTrackForSense(answerId),
    lexicalSurfaces: [DICT[answerId].al, target.al],
    step1: { options: shuffle([answerId, ...distractors]) },
    step2: { options: shuffle(glosses), answer: target.gloss },
  }
}

// Render an Albanian phrase with the target word highlighted.
const FocusPhrase = ({ al, focus }) => (
  <span lang="sq">
    {al.split(' ').map((w, i) => (
      <span key={i}>
        {i > 0 ? ' ' : ''}
        {w === focus ? <b className="ctx-focus">{w}</b> : w}
      </span>
    ))}
  </span>
)

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
  const discoveredIds = Object.keys(state.discovered).filter((id) => state.discovered[id])
  const unlockedEverydayPhrases = EVERYDAY_PHRASE_DRILLS.filter((entry) =>
    entry.requires.every((id) => state.discovered[id]),
  )
  const [q, setQ] = useState(null)
  const [picked, setPicked] = useState(null)
  const [typedWord, setTypedWord] = useState('')
  const [typedWordLeeway, setTypedWordLeeway] = useState(false)
  const [step, setStep] = useState(FORM_IDENTIFY_LEMMA.step)
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
    setStep(FORM_IDENTIFY_LEMMA.step)
    const excludeWords = previousQuestionWords.current.length
      ? previousQuestionWords.current
      : state.trainLastWords || []
    // Complete, standard-Albanian chunks own most of the training mix; the
    // remainder keeps word meanings and inflections alive.
    const modeRoll = Math.random()
    const unstartedWordDue = discoveredIds.some((id) => {
      const surface = DICT[id].ctx?.al || DICT[id].al
      return !containsExcludedPhraseWord(surface, excludeWords) &&
        wordHasNoEvidence(state.wordProgress?.[id]) &&
        wordProgressPlan(state.wordProgress?.[id], state.trainRound || 0).due
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
    // words whose reviewed-form drill has unlocked; occasionally quiz one
    const eligible = discoveredIds.filter((id) =>
      formsUnlocked(state, id) &&
      !containsExcludedPhraseWord(DICT[id].al, excludeWords) &&
      trainingForms(id).some((form) =>
        form.al.toLocaleLowerCase('sq') !== DICT[id].al.toLocaleLowerCase('sq') &&
        !containsExcludedPhraseWord(form.al, excludeWords),
      ),
    )
    let nextQuestion = null
    if (eligible.length && Math.random() < TRAIN_QUESTION_MIX_POLICY.formShareWithinWordRounds) {
      nextQuestion = buildFormsQuestion(
        weightedPick(eligible, state.mana),
        discoveredIds,
        excludeWords,
        state.formPracticed,
      )
    }
    if (!nextQuestion) {
      nextQuestion = buildWordQuestion({
        discoveredIds,
        mana: state.mana,
        wordProgress: state.wordProgress,
        currentRound: state.trainRound,
        excludeWords,
      })
    }
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
    state.formPracticed,
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
        kind: TRAIN_WORD_FORM_POLICY.correction.kind,
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
  }, [q, step, formsCorrection])

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
  const isWordSpelling = q.kind === TRAIN_EXERCISE_FAMILIES.wordSpelling.kind
  const isEverydayPhrase = q.kind === TRAIN_EXERCISE_FAMILIES.phrase.kind
  // what a correct pick equals depends on the question kind and (for forms) the step
  const correctValue = isForms ? (step === FORM_IDENTIFY_LEMMA.step ? q.answerId : q.step2.answer) : q.answerId
  const answered = picked !== null
  const wasCorrect = picked === correctValue

  const onPick = (value) => {
    if (answered || answerCommitted.current) return
    answerCommitted.current = true
    setPicked(value)
    const correct = value === correctValue

    if (isForms) {
      playWord(q.surface) // speak the reviewed surface, not the lemma
      if (step === FORM_IDENTIFY_LEMMA.step) {
        // identify-the-word: real stakes, exactly like a normal question
        if (correct) {
          dispatch({
            type: 'PRACTICE_CORRECT',
            id: q.answerId,
            completeRound: false,
          })
          if (q.hasNounRoleStep) {
            setTimeout(() => {
              answerCommitted.current = false
              setPicked(null)
              setStep(FORM_IDENTIFY_JOB.step)
            }, 1100) // reveal, then drill the noun's grammatical job
          } else {
            dispatch({
              type: 'PRACTICE_FORM_CORRECT',
              id: q.answerId,
              formSurface: q.surface,
              wordKeys: trainQuestionWordKeys(q),
            })
            setTimeout(next, 1200)
          }
        } else {
          dispatch({
            type: 'PRACTICE_WRONG',
            wordKeys: trainQuestionWordKeys(q),
            formId: q.answerId,
            formSurface: q.surface,
          })
          const guide = q.hasNounRoleStep
            ? buildNounEndingRefresher(q.answerId, q.surface, q.step2.answer)
            : null
          if (guide) {
            setTimeout(() => setFormsCorrection({
              kind: TRAIN_WORD_FORM_POLICY.correction.kind,
              guide,
              stage: FORM_IDENTIFY_LEMMA.id,
              chosen: senseText(value, 'en'),
              lemma: DICT[q.answerId].al,
              meaning: senseText(q.answerId, 'en'),
            }), 900)
          } else {
            setTimeout(next, 2000)
          }
        }
      } else {
        // step 2 is the nuance round: LENIENT — a miss costs no heart, no reward either
        if (correct) {
          dispatch({
            type: 'PRACTICE_FORM_CORRECT',
            id: q.answerId,
            formSurface: q.surface,
            wordKeys: trainQuestionWordKeys(q),
          })
          setTimeout(next, 1200)
        } else {
          dispatch({ type: 'TRAIN_ROUND_COMPLETE', wordKeys: trainQuestionWordKeys(q) })
          const guide = q.hasNounRoleStep
            ? buildNounEndingRefresher(q.answerId, q.surface, q.step2.answer)
            : null
          if (guide) {
            setTimeout(() => setFormsCorrection({
              kind: TRAIN_WORD_FORM_POLICY.correction.kind,
              guide,
              stage: FORM_IDENTIFY_JOB.id,
              chosen: value,
              lemma: DICT[q.answerId].al,
              meaning: senseText(q.answerId, 'en'),
            }), 900)
          } else {
            setTimeout(next, 2200)
          }
        }
      }
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
      questionKey: q.questionKey,
      wordKeys: trainQuestionWordKeys(q),
    })
    setTimeout(() => nextRef.current?.(), result.correct ? 1600 : 2400)
  }

  // Split the shown surface for visual continuity. The prompt calls it a form;
  // only the noun-specific role step and correction discuss an ending.
  const [formStem, formEnding] = isForms ? splitStem(q.answerId, q.surface) : ['', '']

  if (formsCorrection) {
    const { guide, stage, chosen, lemma, meaning } = formsCorrection
    return (
      <section className="card practice" aria-labelledby="practice-title">
        <h2 id="practice-title" className="view-title">Train Albanian</h2>
        <div ref={questionRef} className="noun-ending-refresher" aria-labelledby="ending-refresher-title" tabIndex={-1}>
          <h3 className="prompt" id="ending-refresher-title">Quick ending refresher</h3>
          <p className="noun-ending-correction" role="status" aria-live="assertive">
            {stage === FORM_IDENTIFY_LEMMA.id ? (
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
      ) : (
      <>
      <div ref={questionRef} className="practice-question" role="status" aria-live="polite" aria-atomic="true" tabIndex={-1}>
      <div className="prompt">
        {isForms
          ? step === FORM_IDENTIFY_LEMMA.step
            ? 'What does this word mean?'
            : 'What grammatical job does this noun form have here?'
          : q.kind === TRAIN_EXERCISE_FAMILIES.wordContext.kind
          ? 'What does the highlighted word mean here?'
          : isWordSpelling
          ? 'Write this word in Albanian'
          : q.dir === WORD_ALBANIAN_TO_ENGLISH.id
          ? 'What does this Albanian word mean?'
          : 'Which Albanian word means this?'}
        {!isForms && q.difficultyLabel && (
          <span className="phrase-label practice-word-level">{q.difficultyLabel}</span>
        )}
      </div>
      {isForms ? (
        <div className="question">
          <span className="known-word q-inflected" lang="sq">
            <span className="stem">{formStem}</span>
            {formEnding && <span className="ending">{formEnding}</span>}
          </span>
        </div>
      ) : q.kind === TRAIN_EXERCISE_FAMILIES.wordContext.kind ? (
        <div className="question ctx">
          <div className="ctx-al">
            <FocusPhrase al={q.ctx.al} focus={q.ctx.focus} />
          </div>
          <div className="ctx-en">{q.ctx.en}</div>
        </div>
      ) : isWordSpelling ? (
        <div className="question">{q.typingCue}</div>
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
          <button className="btn primary phrase-check" type="submit" disabled={answered || !typedWord.trim()}>
            Check word
          </button>
        </form>
      ) : (
      <div className="answers">
        {isForms
          ? (step === FORM_IDENTIFY_LEMMA.step ? q.step1.options : q.step2.options).map((opt) => {
              // step 1 options are word ids (show their gloss); step 2 options ARE glosses
              const label = step === FORM_IDENTIFY_LEMMA.step ? senseText(opt, 'en') : opt
              let cls = 'answer'
              if (answered && opt === correctValue) cls += ' correct'
              else if (answered && opt === picked) cls += ' wrong'
              return (
                <button key={String(opt)} className={cls} disabled={answered} onClick={() => onPick(opt)}>
                  {label}
                </button>
              )
            })
          : q.options.map((id) => {
              let cls = 'answer'
              if (answered && id === q.answerId) cls += ' correct'
              else if (answered && id === picked) cls += ' wrong'
              return (
                <button key={id} className={cls} lang={q.field === 'al' ? 'sq' : undefined} disabled={answered} onClick={() => onPick(id)}>
                  {senseText(id, q.field)}
                </button>
              )
            })}
      </div>
      )}

      <div className={'feedback ' + (answered ? (wasCorrect ? 'good' : 'bad') : '')} role="status" aria-live="polite" aria-atomic="true">
        {answered &&
          (isForms
            ? step === FORM_IDENTIFY_LEMMA.step
              ? wasCorrect
                ? q.hasNounRoleStep
                  ? `✓ “${q.surface}” is ${senseText(q.answerId, 'en')} — now, what job does this noun form have?`
                  : `✓ “${q.surface}” is a reviewed form of ${senseText(q.answerId, 'en')}`
                : `💔 −1 heart · “${q.surface}” is ${senseText(q.answerId, 'en')}`
              : wasCorrect
              ? `✨ nuance! “${q.surface}” = ${q.step2.answer}`
              : `“${q.surface}” = ${q.step2.answer}`
            : isWordSpelling
            ? wasCorrect
              ? typedWordLeeway
                ? `Të lumtë! +1 token · accepted at this level; compare “${q.typingAnswer}”`
                : `Të lumtë! +1 token for "${q.typingAnswer}"`
              : `💔 −1 heart · correct spelling: ${q.typingAnswer}`
            : wasCorrect
            ? `Të lumtë! +1 token for "${DICT[q.answerId].al}"` // the folk blessing for a good answer
            : `💔 −1 heart · correct answer: ${senseText(q.answerId, q.field)}`)}
      </div>
      </>
      )}
      </section>
    </>
  )
}
