import { useState, useCallback, useEffect } from 'react'
import { DICT, STORY } from '../game/content.js'
import { canChoose } from '../game/gameState.js'

// the answer rendered in Albanian (every word is discovered when affordable)
const albanianPhrase = (tokens) => tokens.map((t) => (t.id ? t.al : t.en)).join(' ')

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
const shuffle = (arr) => {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Build a multiple-choice question from the discovered senses.
function buildQuestion(discoveredIds) {
  const answerId = sample(discoveredIds)
  const dir = Math.random() < 0.5 ? 'al2en' : 'en2al' // prompt side
  const field = dir === 'al2en' ? 'en' : 'al' // the option text we show
  const promptField = dir === 'al2en' ? 'al' : 'en'

  // distractors: prefer other discovered senses, fall back to whole dictionary
  const pool = discoveredIds.length >= 4 ? discoveredIds : Object.keys(DICT)
  const distractors = []
  const usedText = new Set([DICT[answerId][field]])
  for (const id of shuffle(pool)) {
    if (id === answerId) continue
    const text = DICT[id][field]
    if (usedText.has(text)) continue
    usedText.add(text)
    distractors.push(id)
    if (distractors.length === 3) break
  }

  const options = shuffle([answerId, ...distractors])
  return {
    answerId,
    dir,
    field,
    promptText: DICT[answerId][promptField],
    options,
  }
}

export default function PracticeView({ state, dispatch }) {
  const discoveredIds = Object.keys(state.discovered).filter((id) => state.discovered[id])
  const [q, setQ] = useState(null)
  const [picked, setPicked] = useState(null)

  const next = useCallback(() => {
    if (discoveredIds.length === 0) {
      setQ(null)
      return
    }
    setPicked(null)
    setQ(buildQuestion(discoveredIds))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoveredIds.length])

  useEffect(() => {
    if (!q && discoveredIds.length > 0) next()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoveredIds.length])

  if (discoveredIds.length === 0) {
    return (
      <div className="card practice">
        <p className="empty">
          You haven't discovered any words yet.
          <br />
          Go to the story and click words to discover them, then come back to train.
        </p>
      </div>
    )
  }

  if (!q) {
    return (
      <div className="card practice">
        <p className="empty">Loading…</p>
      </div>
    )
  }

  const answered = picked !== null
  const wasCorrect = picked === q.answerId

  const onPick = (id) => {
    if (answered) return
    setPicked(id)
    if (id === q.answerId) dispatch({ type: 'PRACTICE_CORRECT', id: q.answerId })
  }

  // story answers you can now afford (all words discovered + a token for each)
  const node = STORY[state.nodeId]
  const affordable = (node?.options || []).filter((opt) => canChoose(state, opt).ok)

  return (
    <>
      {affordable.length > 0 && (
        <div className="ready-banner">
          <span>
            You have enough for{' '}
            {affordable.map((opt, i) => (
              <span key={i}>
                {i > 0 ? ' or ' : ''}
                <b>“{albanianPhrase(opt.text)}”</b>
              </span>
            ))}
          </span>
          <button
            className="btn primary"
            onClick={() => dispatch({ type: 'SET_VIEW', view: 'story' })}
          >
            ↩ Return to story
          </button>
        </div>
      )}

      <div className="card practice">
      <div className="prompt">
        {q.dir === 'al2en'
          ? 'What does this Albanian word mean?'
          : 'Which Albanian word means this?'}
      </div>
      <div className="question">{q.promptText}</div>

      <div className="answers">
        {q.options.map((id) => {
          let cls = 'answer'
          if (answered && id === q.answerId) cls += ' correct'
          else if (answered && id === picked) cls += ' wrong'
          return (
            <button key={id} className={cls} disabled={answered} onClick={() => onPick(id)}>
              {DICT[id][q.field]}
            </button>
          )
        })}
      </div>

      <div className={'feedback ' + (answered ? (wasCorrect ? 'good' : 'bad') : '')}>
        {answered &&
          (wasCorrect
            ? `+1 token for "${DICT[q.answerId].al}"`
            : `Correct answer: ${DICT[q.answerId][q.field]}`)}
      </div>

      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <button className="btn primary" onClick={next}>
          {answered ? 'Next question' : 'Skip'}
        </button>
      </div>
      </div>
    </>
  )
}
