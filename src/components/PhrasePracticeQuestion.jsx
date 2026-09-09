import { useMemo, useRef, useState } from 'react'
import { DICT } from '../game/content.js'
import { playPhrase, playWord } from '../game/audio.js'
import {
  phraseAnswerDiagnostic,
  phraseAnswerIsCorrect,
  phraseAnswerResult,
} from '../game/phrasePractice.js'

const MODE_COPY = Object.freeze({
  arrange: 'Build the Albanian phrase',
  listen: 'Listen, then build what you hear',
  cloze: 'Complete the phrase',
  type: 'Write this in Albanian',
  match: 'Match each Albanian phrase to its meaning',
})

function WordBank({ q, selectedIds, answered, onAdd, onRemove }) {
  const selected = selectedIds.map((id) => q.bank.find((tile) => tile.id === id)).filter(Boolean)
  const available = q.bank.filter((tile) => !selectedIds.includes(tile.id))
  const needed = q.answerWords.length

  return (
    <>
      <div className="phrase-answer-tray" aria-label="Your answer" lang="sq">
        {selected.length ? selected.map((tile, index) => (
          <button
            type="button"
            className="word-tile selected"
            key={tile.id}
            disabled={answered}
            onClick={() => onRemove(tile.id)}
            aria-label={`Remove ${tile.text} from position ${index + 1}`}
          >
            {tile.text}
          </button>
        )) : (
          <span className="phrase-tray-hint">Choose words in order</span>
        )}
      </div>

      <div className="word-bank" role="group" aria-label="Available words" lang="sq">
        {available.map((tile) => (
          <button
            type="button"
            className="word-tile"
            key={tile.id}
            disabled={answered || selected.length >= needed}
            onClick={() => {
              playWord(tile.text)
              onAdd(tile.id)
            }}
          >
            {tile.text}
          </button>
        ))}
      </div>
    </>
  )
}

function RewardChips({ ids }) {
  return (
    <div className="phrase-rewards" aria-label={`${ids.length} word tokens earned`}>
      {ids.map((id) => (
        <span className="phrase-reward" key={id}>
          <span aria-hidden="true">✦</span> +1 <span lang="sq">{DICT[id]?.al || id}</span>
        </span>
      ))}
    </div>
  )
}

export default function PhrasePracticeQuestion({ q, onComplete }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [typed, setTyped] = useState('')
  const [matchLeft, setMatchLeft] = useState(null)
  const [matched, setMatched] = useState([])
  const [outcome, setOutcome] = useState(null)
  const committed = useRef(false)
  const inputRef = useRef(null)
  const answered = outcome !== null
  const selectedTiles = useMemo(
    () => selectedIds.map((id) => q.bank?.find((tile) => tile.id === id)).filter(Boolean),
    [q.bank, selectedIds],
  )

  const commit = (
    correct,
    phraseIds,
    correction = null,
    acceptedWithLeeway = false,
    diagnostic = null,
  ) => {
    if (committed.current) return
    committed.current = true
    setOutcome({ correct, correction, acceptedWithLeeway })
    onComplete({
      correct,
      phraseIds,
      rewardIds: q.rewardIds,
      skill: q.skill,
      tier: q.tier,
      questionKey: q.questionKey,
      mode: q.mode,
      typeScope: q.typeScope,
      focusId: q.focusId || null,
      diagnostic,
    })
  }

  const checkConstruction = () => {
    const answer = selectedTiles.map((tile) => tile.text).join(' ')
    const correct = phraseAnswerIsCorrect(answer, q.target.al)
    commit(
      correct,
      q.phraseIds,
      q.target.al,
      false,
      correct ? null : phraseAnswerDiagnostic(answer, q.target.al, q.target),
    )
  }

  const chooseCloze = (tile) => {
    if (answered || committed.current) return
    playWord(tile.text)
    setSelectedIds([tile.id])
    const correct = tile.answerIndex != null
    commit(
      correct,
      q.phraseIds,
      q.target.al,
      false,
      correct ? null : { kind: 'word', focusId: q.focusId },
    )
  }

  const checkTyping = (event) => {
    event.preventDefault()
    if (!typed.trim()) return
    const result = phraseAnswerResult(typed, q.typingAnswer, q.answerTolerance)
    const diagnostic = result.correct
      ? null
      : q.typeScope === 'word'
        ? { kind: 'word', focusId: q.focusId }
        : phraseAnswerDiagnostic(typed, q.typingAnswer, q.target)
    commit(result.correct, q.phraseIds, q.typingAnswer, result.usedLeeway, diagnostic)
  }

  const insertLetter = (letter) => {
    const input = inputRef.current
    const start = input?.selectionStart ?? typed.length
    const end = input?.selectionEnd ?? typed.length
    const next = `${typed.slice(0, start)}${letter}${typed.slice(end)}`
    setTyped(next)
    requestAnimationFrame(() => {
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(start + 1, start + 1)
    })
  }

  const chooseMatchRight = (rightId) => {
    if (!matchLeft || answered || matched.includes(rightId)) return
    if (matchLeft !== rightId) {
      const phrase = q.phrases.find((entry) => entry.id === matchLeft)
      commit(false, q.phraseIds, phrase ? `${phrase.al} — ${phrase.en}` : null)
      return
    }
    const nextMatched = [...matched, rightId]
    setMatched(nextMatched)
    setMatchLeft(null)
    if (nextMatched.length === q.phrases.length) {
      commit(true, q.phraseIds)
    }
  }

  const constructionReady = selectedTiles.length === q.answerWords.length
  const correction = outcome?.correction || q.typingAnswer || q.target.al
  const promptCopy = q.mode === 'type' && q.typeScope === 'word'
    ? 'Write this word in Albanian'
    : MODE_COPY[q.mode]

  return (
    <div className={`phrase-exercise phrase-mode-${q.mode}`}>
      <div className="prompt">
        {promptCopy}{' '}
        <span className="phrase-label">everyday phrase · {q.difficultyLabel}</span>
      </div>

      {q.mode === 'listen' ? (
        <>
          <button
            type="button"
            className="phrase-listen"
            disabled={answered}
            onClick={() => playPhrase(q.target.al)}
            aria-label="Play the Albanian phrase"
          >
            <span aria-hidden="true">🔊</span> Play phrase
          </button>
        </>
      ) : q.mode === 'cloze' ? (
        <>
          <div className="phrase-cue">{q.target.en}</div>
          <div className="phrase-cloze" lang="sq">
            {q.answerWords.map((word, index) => (
              index === q.blankIndex
                ? <span className="phrase-blank" key={index}>_____</span>
                : <span key={index}>{word}</span>
            ))}
          </div>
        </>
      ) : q.mode === 'match' ? (
        <p className="phrase-match-instruction">Choose an Albanian line, then its English meaning.</p>
      ) : (
        <>
          <div className="phrase-cue">{q.typeScope === 'word' ? q.typingCue : q.target.en}</div>
          {q.typeScope === 'word' && (
            <div className="phrase-cloze" lang="sq">
              {q.answerWords.map((word, index) => (
                index === q.blankIndex
                  ? <span className="phrase-blank" key={index}>_____</span>
                  : <span key={index}>{word}</span>
              ))}
            </div>
          )}
        </>
      )}

      {q.mode === 'match' ? (
        <div className="phrase-match-board">
          <div className="phrase-match-column" role="group" aria-label="Albanian phrases" lang="sq">
            {q.left.map((entry) => (
              <button
                type="button"
                key={entry.id}
                className={`phrase-match-tile${matchLeft === entry.id ? ' selected' : ''}${matched.includes(entry.id) ? ' matched' : ''}`}
                disabled={answered || matched.includes(entry.id)}
                aria-pressed={matchLeft === entry.id}
                onClick={() => {
                  setMatchLeft(entry.id)
                  const phrase = q.phrases.find((item) => item.id === entry.id)
                  playPhrase(phrase?.al)
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
                disabled={answered || !matchLeft || matched.includes(entry.id)}
                onClick={() => chooseMatchRight(entry.id)}
              >
                {entry.text}
              </button>
            ))}
          </div>
        </div>
      ) : q.mode === 'type' ? (
        <form className="phrase-type-form" onSubmit={checkTyping}>
          <label htmlFor={`phrase-answer-${q.questionKey}`}>Your Albanian answer</label>
          <textarea
            id={`phrase-answer-${q.questionKey}`}
            ref={inputRef}
            lang="sq"
            autoComplete="off"
            autoCapitalize="sentences"
            spellCheck="false"
            rows="2"
            value={typed}
            disabled={answered}
            onChange={(event) => setTyped(event.target.value)}
          />
          <div className="phrase-type-tools">
            <span>Albanian letters:</span>
            <button type="button" disabled={answered} onClick={() => insertLetter('ë')}>ë</button>
            <button type="button" disabled={answered} onClick={() => insertLetter('ç')}>ç</button>
          </div>
          <button className="btn primary phrase-check" type="submit" disabled={answered || !typed.trim()}>
            {q.typeScope === 'word' ? 'Check word' : 'Check phrase'}
          </button>
        </form>
      ) : q.mode === 'cloze' ? (
        <div className="answers phrase-cloze-answers" role="group" aria-label="Choose the missing Albanian word" lang="sq">
          {q.bank.map((tile) => {
            let className = 'answer'
            if (answered && tile.answerIndex != null) className += ' correct'
            else if (answered && selectedIds.includes(tile.id)) className += ' wrong'
            return (
              <button
                type="button"
                className={className}
                key={tile.id}
                disabled={answered}
                onClick={() => chooseCloze(tile)}
              >
                {tile.text}
              </button>
            )
          })}
        </div>
      ) : (
        <>
          <WordBank
            q={q}
            selectedIds={selectedIds}
            answered={answered}
            onAdd={(id) => setSelectedIds((current) => {
              const needed = q.answerWords.length
              return current.length >= needed || current.includes(id) ? current : [...current, id]
            })}
            onRemove={(id) => setSelectedIds((current) => current.filter((selected) => selected !== id))}
          />
          <button
            type="button"
            className="btn primary phrase-check"
            disabled={answered || !constructionReady}
            onClick={checkConstruction}
          >
            Check phrase
          </button>
        </>
      )}

      {q.mode === 'match' && !answered && (
        <div className="phrase-match-progress" role="status" aria-live="polite">
          {matched.length} of {q.phrases.length} pairs matched
        </div>
      )}

      <div
        className={`feedback ${answered ? (outcome.correct ? 'good' : 'bad') : ''}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {answered && (outcome.correct ? (
          <>
            <div>
              Të lumtë!{' '}
              {outcome.acceptedWithLeeway
                ? `Accepted at this level — compare the spelling: “${q.typingAnswer}”`
                : q.mode === 'match'
                  ? `${q.phrases.length} phrases matched.`
                  : `“${q.typeScope === 'word' ? q.typingAnswer : q.target.al}”`}
            </div>
            <RewardChips ids={q.rewardIds} />
          </>
        ) : (
          <div>💔 −1 heart · <span lang="sq">{correction}</span></div>
        ))}
      </div>
    </div>
  )
}
