import { useEffect, useRef, useState } from 'react'

// An optional reading check uses only reviewed material recorded on the
// player's route. Its completion is separate from the story consequence.
// The owner supplies provenance; the reducer validates every submitted answer.
export default function ComprehensionTest({ questions, onDone, hearts }) {
  const [step, setStep] = useState(0)
  const [pick, setPick] = useState(null)
  const answerCommitted = useRef(false)
  const advanceCommitted = useRef(false)
  const questionRef = useRef(null)
  const answers = useRef([])
  const q = questions?.[step]
  const wrong = pick !== null && pick !== q?.correct
  const last = step >= (questions?.length || 0) - 1
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => questionRef.current?.focus())
    return () => window.cancelAnimationFrame(frame)
  }, [step])
  if (!q || !Array.isArray(q.options) || !q.options.includes(q.correct)) {
    return <p className="hint" role="status">This reading check is unavailable. No evidence has been awarded.</p>
  }
  return (
    <div className="comp-quiz">
      <div ref={questionRef} className="comp-question" role="status" aria-live="polite" aria-atomic="true" tabIndex={-1}>
      <p className="comp-q">
        📖 <span lang="sq">A e kuptove?</span> — reading check {step + 1} / {questions.length}
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
                answers.current[step] = opt
                setPick(opt)
                if (opt !== q.correct) {
                  // The owner adds the achievement and attempt provenance; the
                  // reducer rebuilds this exact question and owns the correction.
                  onDone(false, { questionIndex: step, attemptedEnglish: opt })
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
          Every answer must be right. A wrong answer costs one ♥ and ends this attempt.
          {Number.isInteger(hearts) && ` You have ${hearts} ${hearts === 1 ? 'heart' : 'hearts'}.`}
          {hearts === 1 && ' A miss ends this run.'}
          {' '}You can retry here or find the check later under “Revisit a reading” in Story.
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
              if (wrong || last) return onDone(!wrong, undefined, [...answers.current])
              answerCommitted.current = false
              setStep(step + 1)
              setPick(null)
            }}
          >
            {wrong ? 'Review this reading →' : last ? 'Complete the reading check →' : 'Next question →'}
          </button>
        </>
      )}
    </div>
  )
}
