import { useRef, useState } from 'react'
import TrainingActivityShell from './TrainingActivityShell.jsx'

function MarkedContext({ entry }) {
  return String(entry.text || '').split(/\s+/u).map((word, index) => (
    <span key={`${entry.id}-${index}`}>
      {index > 0 ? ' ' : ''}
      {index === entry.targetTokenIndex
        ? <mark aria-label={`Target noun form: ${word}`}>{word}</mark>
        : word}
    </span>
  ))
}

export default function NounFormMatchingQuestion({ q, debug = false, onComplete }) {
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matched, setMatched] = useState([])
  const [outcome, setOutcome] = useState(null)
  const committed = useRef(false)
  const startedAt = useRef(Date.now())
  const answered = outcome !== null

  const chooseJob = (rightId) => {
    if (!selectedLeft || answered || matched.includes(rightId) || committed.current) return
    const selectedPair = q.pairs.find(({ id }) => id === selectedLeft)
    const chosenJob = q.right.find(({ id }) => id === rightId)?.text || ''
    if (selectedLeft !== rightId) {
      committed.current = true
      setOutcome({ correct: false })
      onComplete({
        correct: false,
        selectedTargetId: selectedLeft,
        selectedOptionId: rightId,
        attempted: { context: selectedPair?.context, surface: selectedPair?.surface, roleLabel: chosenJob },
        correction: selectedPair,
        attemptedAtMs: Date.now(),
        responseDurationMs: Math.max(0, Date.now() - startedAt.current),
      })
      return
    }
    const nextMatched = [...matched, rightId]
    setMatched(nextMatched)
    setSelectedLeft(null)
    if (nextMatched.length === q.pairs.length) {
      committed.current = true
      setOutcome({ correct: true })
      onComplete({
        correct: true,
        attemptedAtMs: Date.now(),
        responseDurationMs: Math.max(0, Date.now() - startedAt.current),
      })
    }
  }

  return (
    <TrainingActivityShell
      className="phrase-exercise noun-form-match-exercise"
      instruction={`Match each use of “${q.surface}” to its grammatical job`}
      debug={debug}
      debugMeta={<span className="phrase-label">word · one-noun grammar matching</span>}
    >
      <p className="phrase-match-instruction">Choose a sentence, then the job of its marked noun.</p>
      <div className="phrase-match-board noun-form-match-board">
        <div className="phrase-match-column" role="group" aria-label="Albanian noun uses" lang="sq">
          {q.left.map((entry) => (
            <button
              type="button"
              key={entry.id}
              className={`phrase-match-tile noun-form-match-context${selectedLeft === entry.id ? ' selected' : ''}${matched.includes(entry.id) ? ' matched' : ''}`}
              disabled={answered || matched.includes(entry.id)}
              aria-pressed={selectedLeft === entry.id}
              onClick={() => setSelectedLeft(entry.id)}
            >
              <MarkedContext entry={entry} />
            </button>
          ))}
        </div>
        <div className="phrase-match-column" role="group" aria-label="Grammatical jobs">
          {q.right.map((entry) => (
            <button
              type="button"
              key={entry.id}
              className={`phrase-match-tile${matched.includes(entry.id) ? ' matched' : ''}`}
              disabled={answered || !selectedLeft || matched.includes(entry.id)}
              onClick={() => chooseJob(entry.id)}
            >
              {entry.text}
            </button>
          ))}
        </div>
      </div>
      <p className="phrase-match-progress" role="status" aria-live="polite">
        {outcome?.correct ? `Të lumtë! All ${q.pairs.length} uses matched.` : `${matched.length} of ${q.pairs.length} matched`}
      </p>
      {outcome?.correct && (
        <p lang="sq">{q.pairs.map(({ context }) => `“${context}”`).join(' · ')}</p>
      )}
      {outcome?.correct && (
        <div className="phrase-rewards" aria-label="One target-word token earned">
          <span className="phrase-reward"><span aria-hidden="true">✦</span> +1 <span lang="sq">{q.surface}</span></span>
        </div>
      )}
    </TrainingActivityShell>
  )
}
