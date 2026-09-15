import { useRef, useState } from 'react'
import { playWord } from '../game/audio.js'
import TrainingActivityShell from './TrainingActivityShell.jsx'

export default function WordMatchingQuestion({ q, debug = false, onComplete }) {
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [matched, setMatched] = useState([])
  const [outcome, setOutcome] = useState(null)
  const committed = useRef(false)
  const startedAt = useRef(Date.now())
  const answered = outcome !== null

  const chooseMeaning = (rightId) => {
    if (!selectedLeft || answered || matched.includes(rightId) || committed.current) return
    if (selectedLeft !== rightId) {
      committed.current = true
      const selectedPair = q.pairs.find(({ id }) => id === selectedLeft)
      const chosenMeaning = q.right.find(({ id }) => id === rightId)?.text || ''
      setOutcome({ correct: false })
      onComplete({
        correct: false,
        selectedTargetId: selectedLeft,
        selectedOptionId: rightId,
        attempted: { al: selectedPair?.al, en: chosenMeaning },
        correction: selectedPair ? `${selectedPair.al} — ${selectedPair.en}` : null,
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
      className="phrase-exercise word-match-exercise"
      instruction="Match the Albanian words to their meanings"
      debug={debug}
      debugMeta={<span className="phrase-label">word · mixed matching reinforcement</span>}
    >
      <p className="phrase-match-instruction">Choose an Albanian word, then its English meaning.</p>
      <div className="phrase-match-board">
        <div className="phrase-match-column" role="group" aria-label="Albanian words" lang="sq">
          {q.left.map((entry) => (
            <button
              type="button"
              key={entry.id}
              className={`phrase-match-tile${selectedLeft === entry.id ? ' selected' : ''}${matched.includes(entry.id) ? ' matched' : ''}`}
              disabled={answered || matched.includes(entry.id)}
              aria-pressed={selectedLeft === entry.id}
              onClick={() => {
                setSelectedLeft(entry.id)
                playWord(entry.text)
              }}
            >
              {entry.text}
            </button>
          ))}
        </div>
        <div className="phrase-match-column" role="group" aria-label="English meanings">
          {q.right.map((entry) => (
            <button
              type="button"
              key={entry.id}
              className={`phrase-match-tile${matched.includes(entry.id) ? ' matched' : ''}`}
              disabled={answered || !selectedLeft || matched.includes(entry.id)}
              onClick={() => chooseMeaning(entry.id)}
            >
              {entry.text}
            </button>
          ))}
        </div>
      </div>
      <p className="phrase-match-progress" role="status" aria-live="polite">
        {outcome?.correct ? `Të lumtë! ${q.pairs.length} word pairs matched.` : `${matched.length} of ${q.pairs.length} matched`}
      </p>
      {outcome?.correct && (
        <div className="phrase-rewards" aria-label={`${q.rewardIds.length} word tokens earned`}>
          {q.pairs.map(({ id, al }) => (
            <span className="phrase-reward" key={id}>
              <span aria-hidden="true">✦</span> +1 <span lang="sq">{al}</span>
            </span>
          ))}
        </div>
      )}
    </TrainingActivityShell>
  )
}
