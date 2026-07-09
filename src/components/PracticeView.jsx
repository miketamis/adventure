import { useState, useCallback, useEffect } from 'react'
import { DICT, STORY, frequentForms, splitStem } from '../game/content.js'
import { canChoose, formsUnlocked } from '../game/gameState.js'
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

// pick one of a word's forms, weighted toward the ones it takes most often
const weightedPickForm = (forms) => {
  const weights = forms.map((f) => (f.count || 0) + 1)
  const total = weights.reduce((a, b) => a + b, 0)
  let r = Math.random() * total
  for (let i = 0; i < forms.length; i++) {
    r -= weights[i]
    if (r <= 0) return forms[i]
  }
  return forms[forms.length - 1]
}

// An "endings" question, unlocked once a word has been practiced enough. The word
// appears INFLECTED (e.g. bijën). Step 1: which word is it? (options are OTHER
// words' glosses). Step 2: what does the ending do? (options are THIS word's own
// form glosses — "a daughter" / "the daughter" / "the daughter (object)").
function buildFormsQuestion(answerId, discoveredIds) {
  const forms = frequentForms(answerId) // lemma row first, then frequent inflected forms
  const lemma = DICT[answerId].al.toLowerCase()
  const inflected = forms.filter((f) => f.al.toLowerCase() !== lemma)
  const target = weightedPickForm(inflected) // step-1 always shows a real ending, never the bare lemma

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
    if (distractors.length === 3) break
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
    kind: 'forms',
    answerId,
    surface: target.al,
    step1: { options: shuffle([answerId, ...distractors]) },
    step2: { options: shuffle(glosses), answer: target.gloss },
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
  const [step, setStep] = useState(1) // for two-step "endings" questions; 1 otherwise

  const next = useCallback(() => {
    if (discoveredIds.length === 0) {
      setQ(null)
      return
    }
    setPicked(null)
    setStep(1)
    // words whose "endings" drill has unlocked; occasionally quiz one of them
    const eligible = discoveredIds.filter((id) => formsUnlocked(state, id))
    if (eligible.length && Math.random() < 0.35) {
      setQ(buildFormsQuestion(weightedPick(eligible, state.mana), discoveredIds))
    } else {
      setQ(buildQuestion(discoveredIds, state.mana))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discoveredIds.length, state.mana, state.practiced])

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

  const isForms = q.kind === 'forms'
  // what a correct pick equals depends on the question kind and (for forms) the step
  const correctValue = isForms ? (step === 1 ? q.answerId : q.step2.answer) : q.answerId
  const answered = picked !== null
  const wasCorrect = picked === correctValue

  const onPick = (value) => {
    if (answered) return
    setPicked(value)
    const correct = value === correctValue

    if (isForms) {
      playWord(q.surface) // speak the INFLECTED surface, not the lemma
      if (step === 1) {
        // identify-the-word: real stakes, exactly like a normal question
        if (correct) {
          dispatch({ type: 'PRACTICE_CORRECT', id: q.answerId })
          setTimeout(() => { setPicked(null); setStep(2) }, 1100) // reveal, then drill the ending
        } else {
          dispatch({ type: 'PRACTICE_WRONG' })
          setTimeout(next, 2000)
        }
      } else {
        // step 2 is the nuance round: LENIENT — a miss costs no heart, no reward either
        setTimeout(next, correct ? 1200 : 2200)
      }
      return
    }

    // normal / context question
    playWord(DICT[q.answerId].al)
    if (correct) dispatch({ type: 'PRACTICE_CORRECT', id: q.answerId })
    else dispatch({ type: 'PRACTICE_WRONG' })
    setTimeout(next, correct ? 1200 : 2000)
  }

  // for a forms question, split the shown surface so its ending renders faded
  const [formStem, formEnding] = isForms ? splitStem(q.answerId, q.surface) : ['', '']

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
        {isForms
          ? step === 1
            ? 'What does this word mean?'
            : 'What does the ending do here?'
          : q.kind === 'ctx'
          ? 'What does the highlighted word mean here?'
          : q.dir === 'al2en'
          ? 'What does this Albanian word mean?'
          : 'Which Albanian word means this?'}
      </div>
      {isForms ? (
        <div className="question">
          <span className="known-word q-inflected">
            <span className="stem">{formStem}</span>
            {formEnding && <span className="ending">{formEnding}</span>}
          </span>
        </div>
      ) : q.kind === 'ctx' ? (
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
        {isForms
          ? (step === 1 ? q.step1.options : q.step2.options).map((opt) => {
              // step 1 options are word ids (show their gloss); step 2 options ARE glosses
              const label = step === 1 ? senseText(opt, 'en') : opt
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
                <button key={id} className={cls} disabled={answered} onClick={() => onPick(id)}>
                  {senseText(id, q.field)}
                </button>
              )
            })}
      </div>

      <div className={'feedback ' + (answered ? (wasCorrect ? 'good' : 'bad') : '')}>
        {answered &&
          (isForms
            ? step === 1
              ? wasCorrect
                ? `✓ “${q.surface}” is ${senseText(q.answerId, 'en')} — now, what does the ending add?`
                : `💔 −1 heart · “${q.surface}” is ${senseText(q.answerId, 'en')}`
              : wasCorrect
              ? `✨ nuance! “${q.surface}” = ${q.step2.answer}`
              : `“${q.surface}” = ${q.step2.answer}`
            : wasCorrect
            ? `Të lumtë! +1 token for "${DICT[q.answerId].al}"` // the folk blessing for a good answer
            : `💔 −1 heart · correct answer: ${senseText(q.answerId, q.field)}`)}
      </div>

      </div>
    </>
  )
}
