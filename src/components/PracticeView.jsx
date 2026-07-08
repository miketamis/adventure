import { useState, useCallback, useEffect } from 'react'
import { DICT, STORY } from '../game/content.js'
import { canChoose } from '../game/gameState.js'
import { playWord } from '../game/audio.js'

// the answer rendered in Albanian (every word is discovered when affordable)
const albanianPhrase = (tokens) => tokens.map((t) => (t.id ? t.al : t.en)).join(' ')

// The text shown for a sense on a given side. Training shows *all* English
// senses (enAll, e.g. "on / in") where the story only shows the contextual one.
const senseText = (id, field) =>
  field === 'en' ? DICT[id].enAll ?? DICT[id].en : DICT[id][field]

// pick an id, weighted so words you already hold more tokens of come up less often
const weightedPick = (ids, mana) => {
  const weights = ids.map((id) => 1 / ((mana[id] || 0) + 1))
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

// Homonym particles (e, të, i, do, po) carry a `ctx` example phrase: the same
// surface has several senses, so the bare word is ambiguous and MUST be quizzed
// in context. Such senses are routed to a dedicated context question.
const siblingsOf = (id) => Object.keys(DICT).filter((x) => x !== id && DICT[x].al === DICT[id].al)

// A context question: show the word inside its phrase (target highlighted) and
// ask for THAT sense. Distractors are the rival senses of the same surface first
// (the whole point — only context separates them), then any other gloss.
function buildContextQuestion(answerId, discoveredIds) {
  const pool = [...siblingsOf(answerId), ...shuffle(discoveredIds), ...shuffle(Object.keys(DICT))]
  const distractors = []
  const usedText = new Set([senseText(answerId, 'en')])
  for (const id of pool) {
    if (id === answerId || distractors.includes(id)) continue
    const text = senseText(id, 'en')
    if (usedText.has(text)) continue
    usedText.add(text)
    distractors.push(id)
    if (distractors.length === 3) break
  }
  return { kind: 'ctx', answerId, field: 'en', ctx: DICT[answerId].ctx, options: shuffle([answerId, ...distractors]) }
}

// Build a multiple-choice question from the discovered senses.
// The quizzed word is weighted by `mana`: more tokens -> less likely to appear.
function buildQuestion(discoveredIds, mana) {
  const answerId = weightedPick(discoveredIds, mana)
  if (DICT[answerId].ctx) return buildContextQuestion(answerId, discoveredIds)

  const dir = Math.random() < 0.5 ? 'al2en' : 'en2al' // prompt side
  const field = dir === 'al2en' ? 'en' : 'al' // the option text we show
  const promptField = dir === 'al2en' ? 'al' : 'en'

  // distractors: prefer other discovered senses, fall back to whole dictionary
  const pool = discoveredIds.length >= 4 ? discoveredIds : Object.keys(DICT)
  const distractors = []
  const usedText = new Set([senseText(answerId, field)])
  for (const id of shuffle(pool)) {
    if (id === answerId) continue
    // skip an option that would ALSO be correct: same prompt-side text means it
    // shares the answer's word (al2en) or its meaning (en2al) — a second answer.
    if (DICT[id][promptField] === DICT[answerId][promptField]) continue
    const text = senseText(id, field)
    if (usedText.has(text)) continue
    usedText.add(text)
    distractors.push(id)
    if (distractors.length === 3) break
  }

  const options = shuffle([answerId, ...distractors])
  return {
    kind: 'normal',
    answerId,
    dir,
    field,
    promptText: senseText(answerId, promptField),
    options,
  }
}

// Render an Albanian phrase with the target word highlighted.
const FocusPhrase = ({ al, focus }) => (
  <>
    {al.split(' ').map((w, i) => (
      <span key={i}>
        {i > 0 ? ' ' : ''}
        {w === focus ? <b className="ctx-focus">{w}</b> : w}
      </span>
    ))}
  </>
)

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
    setQ(buildQuestion(discoveredIds, state.mana))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoveredIds.length, state.mana])

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
    const correct = id === q.answerId
    // speak the correct Albanian word aloud, whether right or wrong (respects mute)
    playWord(DICT[q.answerId].al)
    if (correct) dispatch({ type: 'PRACTICE_CORRECT', id: q.answerId })
    else dispatch({ type: 'PRACTICE_WRONG' })
    // auto-advance to the next question after a short pause
    setTimeout(next, correct ? 1200 : 2000)
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
        {q.kind === 'ctx'
          ? 'What does the highlighted word mean here?'
          : q.dir === 'al2en'
          ? 'What does this Albanian word mean?'
          : 'Which Albanian word means this?'}
      </div>
      {q.kind === 'ctx' ? (
        <div className="question ctx">
          <div className="ctx-al">
            <FocusPhrase al={q.ctx.al} focus={q.ctx.focus} />
          </div>
          <div className="ctx-en">{q.ctx.en}</div>
        </div>
      ) : (
        <div className="question">{q.promptText}</div>
      )}

      <div className="answers">
        {q.options.map((id) => {
          let cls = 'answer'
          if (answered && id === q.answerId) cls += ' correct'
          else if (answered && id === picked) cls += ' wrong'
          return (
            <button key={id} className={cls} disabled={answered} onClick={() => onPick(id)}>
              {senseText(id, q.field)}
            </button>
          )
        })}
      </div>

      <div className={'feedback ' + (answered ? (wasCorrect ? 'good' : 'bad') : '')}>
        {answered &&
          (wasCorrect
            ? `+1 token for "${DICT[q.answerId].al}"`
            : `💔 −1 heart · correct answer: ${senseText(q.answerId, q.field)}`)}
      </div>

      </div>
    </>
  )
}
