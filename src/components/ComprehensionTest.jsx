import { useState } from 'react'

// The HARD comprehension gate on every achievement: an Albanian line from the
// story you lived, three English readings — the real one and two near misses
// (built in src/game/comprehension.js). EVERY question must be answered
// correctly. One wrong answer costs a heart AND ends the attempt on the spot;
// the parent decides what a pass or a fail means (onDone(passed)). Shared by
// the ending screen, the area banner and the Achievements codex.
export default function ComprehensionTest({ questions, dispatch, onDone }) {
  const [step, setStep] = useState(0)
  const [pick, setPick] = useState(null)
  const q = questions[step]
  const wrong = pick !== null && pick !== q.correct
  const last = step >= questions.length - 1
  return (
    <div className="comp-quiz">
      <p className="comp-q">
        📖 A e kuptove? — comprehension {step + 1} / {questions.length}
      </p>
      <div className="comp-al">{q.albanian}</div>
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
                setPick(opt)
                if (opt !== q.correct) dispatch({ type: 'COMP_WRONG' })
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
          <div className={'feedback ' + (wrong ? 'bad' : 'good')}>
            {wrong ? '✗ ' : '✓ Saktë! '}
            <em>{q.albanian}</em> = {q.correct}
          </div>
          <button
            className="btn primary"
            onClick={() => {
              if (wrong || last) return onDone(!wrong)
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
