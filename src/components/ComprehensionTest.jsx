import { useEffect, useRef, useState } from 'react'
import { comprehensionMissConsequence } from '../game/consequenceBuilders.js'

// The HARD comprehension gate on every achievement: reviewed Albanian sentences
// from the story the player lived, supplemented by unambiguous words encountered
// on that path when four reviewed whole-line readings are not yet available.
// Every answer is real English; no literal-gloss sentence is used. EVERY question must be answered
// correctly. One wrong answer costs a heart AND ends the attempt on the spot;
// the parent decides what a pass or a fail means (onDone(passed)). Shared by
// the ending screen, the area banner and the Achievements codex.
export default function ComprehensionTest({ questions, onDone }) {
  const [step, setStep] = useState(0)
  const [pick, setPick] = useState(null)
  const answerCommitted = useRef(false)
  const advanceCommitted = useRef(false)
  const questionRef = useRef(null)
  const q = questions[step]
  const wrong = pick !== null && pick !== q.correct
  const last = step >= questions.length - 1
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => questionRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [step])
  return (
    <div className="comp-quiz">
      <div ref={questionRef} className="comp-question" role="status" aria-live="polite" aria-atomic="true" tabIndex={-1}>
      <p className="comp-q">
        📖 <span lang="sq">A e kuptove?</span> — comprehension {step + 1} / {questions.length}
      </p>
      <p className="hint">{q.prompt}</p>
      <div className="comp-al" lang="sq">{q.albanian}</div>
      </div>
      <div className="answers">
        {q.options.map((opt) => {
          let cls = 'answer'
          if (pick !== null && opt === q.correct) cls += ' correct'
          else if (pick === opt && opt !== q.correct) cls += ' wrong'
          return (
            <button
              key={opt}
              className={cls}
              disabled={pick !== null}
              onClick={() => {
                if (answerCommitted.current) return
                answerCommitted.current = true
                advanceCommitted.current = false
                setPick(opt)
                if (opt !== q.correct) {
                  // The owner knows which achievement this question belongs
                  // to, so it commits the failed gate and explained heart loss
                  // together rather than issuing two reducer transactions.
                  onDone(false, comprehensionMissConsequence(q, opt))
                }
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>
      {pick === null ? (
        <p className="hint">
          Every answer must be right — one wrong answer costs a ♥ and ends the attempt. You can
          always retake the test (with fresh questions) from 🏆 Achievements.
        </p>
      ) : (
        <>
          <div className={'feedback ' + (wrong ? 'bad' : 'good')} role="status" aria-live="polite" aria-atomic="true">
            {wrong ? '✗ ' : <><span aria-hidden="true">✓ </span><span lang="sq">Saktë!</span>{' '}</>}
            <em lang="sq">{q.albanian}</em> = {q.correct}
          </div>
          <button
            className="btn primary"
            onClick={() => {
              if (advanceCommitted.current) return
              advanceCommitted.current = true
              if (wrong || last) return onDone(!wrong)
              answerCommitted.current = false
              setStep(step + 1)
              setPick(null)
            }}
          >
            {wrong ? 'The tale slips away →' : last ? '🏆 Unlock the achievement →' : 'Next question →'}
          </button>
        </>
      )}
    </div>
  )
}
