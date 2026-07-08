import { useState, useEffect } from 'react'
import Token from './Token.jsx'
import { STORY, ITEMS, w, wf, p, visibleLines, lineOf } from '../game/content.js'
import { FOLKLORE, ENDING_LORE } from '../game/folklore.js'
import { canSpeak, canUseItem, hasRequiredItem, phraseSenses } from '../game/gameState.js'

// sense ids that are NOT nouns (verbs, particles, adjectives, adverbs, numbers).
// Used to (a) pick a real "thing" from the scene for item-combo distractors, and
// (b) find the NOUN a direction acts on, so a sentence can unlock that direction.
const NON_NOUNS = new Set([
  'ti', 'je', 'ne', 'nje', 'dhe', 'ka', 'ke', 'mund', 'eshte', 'te_link', 'te_subj', 'te_obj',
  'i_art', 'e_art', 'me', 'por', 'nuk', 'pa', 'ku', 'qe', 'do', 'per', 'une', 'jam', 'ose', 'jo',
  'sheh', 'ec', 'fle', 'hap', 'ik', 'jep', 'pi', 'behet', 'vjen', 'zgjohu', 'rri', 'ndiz', 'ha',
  'mbaroi', 'humbet', 'merr', 'kerko', 'gjen', 'kalo', 'shko', 'prit', 'lufto', 'vrit', 'shpeto',
  'ngjit', 'zbrit', 'fluturo', 'degjo', 'flet', 'thote', 'ndihmo', 'beso', 'hyr', 'dil', 'thirr',
  'hidh', 'kthehu', 'prek', 'vdes', 'bie', 'pre', 'luan', 'bej', 'mbyll', 'vazhdon', 'lind', 'fol',
  'premto',
  'madh', 'vogel', 'erret', 'sigurt', 'ri', 'vjeter', 'uritur', 'shpejt', 'qete', 'perseri',
  'forte', 'bukur', 'keq', 'thate', 'lart', 'mire', 'ngadale', 'poshte', 'larg', 'jashte', 'tani',
  'ngrohte', 'ftohte', 'ketu', 'brenda', 'bardhe', 'zi', 'shume', 'tjeter', 'nente', 'shtate',
])
const LIQUID_ITEMS = new Set(['qumesht', 'potion']) // drinkable — don't "drink the X" them

// shuffle deterministically from a seed so the order is stable while you're on a
// node but scrambled (real answers are never simply first)
function stableShuffle(arr, seedStr) {
  let seed = [...seedStr].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7)
  const rng = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff
    return seed / 0x7fffffff
  }
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// === COMPREHENSION QUIZ (shown at an ending, BEFORE the lore blurb) ==========
// You earn the tale by proving you understood the Albanian you just played.
const lineEnglish = (line) =>
  line.filter((t) => t.id && !t.paren).map((t) => t.en).join(' ').replace(/\s+([.!?:,;])/g, '$1').trim()
const lineAlbanian = (line) =>
  line.map((t) => (t.paren ? t.en : t.al)).join(' ').replace(/\s+([.!?:,;])/g, '$1').trim()
const isContent = (line) => line.filter((t) => t.id).length >= 2 // >=2 real words
const richness = (line) => line.filter((t) => t.id && !NON_NOUNS.has(t.id)).length // nouns/verbs
// pool of every ending's content lines (English), for plausible distractors — built once
let _answerPool = null
const answerPool = () => {
  if (!_answerPool) {
    const set = new Set()
    for (const n of Object.values(STORY)) {
      if (!n.end) continue
      for (const l of n.text.map(lineOf).filter(isContent)) set.add(lineEnglish(l))
    }
    _answerPool = [...set]
  }
  return _answerPool
}
// reverse adjacency: which nodes lead INTO each node (to draw path questions) — built once
let _preds = null
const predsOf = (id) => {
  if (!_preds) {
    _preds = {}
    for (const n of Object.values(STORY))
      for (const o of n.options || []) if (o.to) (_preds[o.to] = _preds[o.to] || []).push(n.id)
  }
  return _preds[id] || []
}
// a SET of comprehension questions: the ending's lines first (the climax), then a
// scene or two from the path that led here — so it tests the journey, not one line.
function buildComprehension(node, resolvedLines) {
  const seen = new Set()
  const pick = []
  const add = (lines) => {
    for (const l of [...lines].sort((a, b) => richness(b) - richness(a))) {
      if (!isContent(l)) continue
      const k = lineAlbanian(l)
      if (seen.has(k) || !k) continue
      seen.add(k)
      pick.push(l)
    }
  }
  add(resolvedLines)
  for (const pid of predsOf(node.id)) {
    if (pick.length >= 3) break
    add(STORY[pid].text.map(lineOf))
  }
  const chosen = pick.slice(0, 3)
  if (!chosen.length) return null
  const pool = answerPool()
  const qs = chosen
    .map((line, i) => {
      const correct = lineEnglish(line)
      const wc = correct.split(' ').length
      let p = pool.filter((s) => s !== correct)
      const near = p.filter((s) => Math.abs(s.split(' ').length - wc) <= 2)
      if (near.length >= 2) p = near
      const distractors = stableShuffle(p, node.id + correct + i).slice(0, 2)
      if (distractors.length < 2) return null
      return { albanian: lineAlbanian(line), correct, options: stableShuffle([correct, ...distractors], node.id + i) }
    })
    .filter(Boolean)
  return qs.length ? qs : null
}

export default function StoryView({ state, dispatch }) {
  const node = STORY[state.nodeId]
  // in debug mode peak never runs out, so hovering always reveals the English
  const peak = state.debug ? 999 : state.peak
  // which confuser option was just picked (to flash feedback); reset per node
  const [confusedKey, setConfusedKey] = useState(null)
  // comprehension test at an ending: which question, the pick for it, running score
  const [compStep, setCompStep] = useState(0)
  const [compPick, setCompPick] = useState(null)
  const [compScore, setCompScore] = useState(0)
  useEffect(() => {
    setConfusedKey(null)
    setCompStep(0)
    setCompPick(null)
    setCompScore(0)
  }, [state.nodeId])

  // === SENTENCE-GATED DIRECTIONS ============================================
  // A direction stays hidden until you discover every word of the sentence that
  // names its thing. e.g. discovering "ka një lumë" reveals "shko në lumë". The
  // noun a phrase acts on is its last content noun.
  // the lines actually shown right now — a scene can react to what walks with you
  // (when()/unless() lines in content.js), so resolve against the current inventory
  const has = (id) => (state.inventory[id] || 0) > 0
  const lines = visibleLines(node, has)
  // comprehension test that gates the lore blurb at an ending
  const comp = state.ended ? buildComprehension(node, lines) : null
  const compDone = !comp || compStep >= comp.length
  const compQ = compDone ? null : comp[compStep]

  const isNoun = (id) => id && !NON_NOUNS.has(id)
  const lineDiscovered = (line) => line.every((t) => !t.id || state.discovered[t.id])
  const sentenceFor = (senseId) => lines.find((line) => line.some((t) => t.id === senseId))
  // An option stays hidden until you discover the sentence it belongs to — authored
  // PER OPTION as `reveal: '<senseId>'` in content.js (deliberately NOT an automatic
  // rule). No `reveal` field => the option is always shown. `scripts/storystats.mjs`
  // lints the design goals: that most options are gated, and that every node always
  // keeps at least one ungated, always-visible path.
  const optionRevealed = (opt) => {
    if (!opt.reveal) return true
    const line = sentenceFor(opt.reveal)
    return !line || lineDiscovered(line)
  }

  // what you hold. Companions (ITEMS[id].companion) are tracked exactly like items
  // but they're who walks WITH you, so they render as their own story line instead
  // of "you have a X", and an option can gate on them with `requires: '<companionId>'`.
  const ownedIds = Object.keys(state.inventory).filter((id) => state.inventory[id] > 0)
  const itemIds = ownedIds.filter((id) => !ITEMS[id]?.companion)
  const companionIds = ownedIds.filter((id) => ITEMS[id]?.companion)
  const usableOwned = ownedIds.filter((id) => ITEMS[id]?.use)

  // "ti ke një X dhe një Y ." — what you carry, as a real (discoverable) story line
  const carryLine = () => {
    const toks = [w('ti'), w('ke')]
    itemIds.forEach((id, i) => {
      if (i > 0) toks.push(w('dhe'))
      toks.push(w('nje'), w(ITEMS[id].word || id))
    })
    toks.push(p('.'))
    return toks
  }

  // "ti dhe ujku ." — who walks beside you, woven into the story as a real line
  const companionLine = () => {
    const toks = [w('ti')]
    companionIds.forEach((id) => {
      toks.push(w('dhe'), wf(ITEMS[id].word || id, ITEMS[id].al, 'the ' + ITEMS[id].name.toLowerCase()))
    })
    toks.push(p('.'))
    return toks
  }

  // Distractors built from the item(s) you carry — an impossible action on the
  // item, and sometimes a nonsensical combo of the item with a thing in the scene.
  const presentNouns = [...new Set(lines.flat().filter((t) => isNoun(t.id)).map((t) => t.id))]
  const itemConfusers = []
  if (itemIds.length > 0) {
    const hash = [...state.nodeId].reduce((a, c) => a + c.charCodeAt(0), 0)
    const featured = itemIds[hash % itemIds.length]
    const fw = ITEMS[featured].word || featured
    itemConfusers.push([LIQUID_ITEMS.has(featured) ? w('lufto') : w('pi'), w(fw)])
    if (presentNouns.length > 0 && hash % 2 === 0) {
      itemConfusers.push([w('jashte'), w(fw), w(presentNouns[hash % presentNouns.length])])
    }
  }
  const seenPhrase = new Set()
  for (const o of node.options) seenPhrase.add(o.text.map((t) => t.id || t.en).join(' '))
  for (const id of usableOwned) seenPhrase.add(ITEMS[id].use.phrase.map((t) => t.id || t.en).join(' '))
  const dynamicConfusers = itemConfusers.filter(
    (toks) => !seenPhrase.has(toks.map((t) => t.id || t.en).join(' ')),
  )

  const entries = []
  let hiddenPaths = 0
  node.options.forEach((opt, i) => {
    if (opt.confuser) return // confusers handled below
    if (!hasRequiredItem(state, opt)) return // hidden by requires:/unless:
    if (!optionRevealed(opt)) {
      hiddenPaths++
      return
    }
    const { allDiscovered, enoughMana } = canSpeak(state, opt.text)
    entries.push({
      key: 'opt-' + i,
      tokens: opt.text,
      real: true,
      allDiscovered,
      enoughMana,
      ok: allDiscovered && enoughMana && hasRequiredItem(state, opt),
      onSelect: () => dispatch({ type: 'CHOOSE', option: opt, targetNode: STORY[opt.to] }),
    })
  })
  // item uses — always available (you hold the item)
  usableOwned.forEach((id) => {
    const it = ITEMS[id]
    const { allDiscovered, enoughMana, ok } = canUseItem(state, it)
    entries.push({
      key: 'use-' + id,
      tokens: it.use.phrase,
      real: true,
      allDiscovered,
      enoughMana,
      ok,
      onSelect: () => dispatch({ type: 'USE_ITEM', item: it }),
    })
  })
  // confusers — always shown (the comprehension trap)
  {
    node.options.forEach((opt, i) => {
      if (!opt.confuser) return
      const { allDiscovered, enoughMana } = canSpeak(state, opt.text)
      entries.push({
        key: 'opt-' + i,
        tokens: opt.text,
        allDiscovered,
        enoughMana,
        ok: allDiscovered && enoughMana,
        onSelect: () => {
          dispatch({ type: 'CONFUSE' })
          setConfusedKey('opt-' + i)
        },
      })
    })
    dynamicConfusers.forEach((toks, k) => {
      const { allDiscovered, enoughMana } = canSpeak(state, toks)
      entries.push({
        key: 'dyn-' + k,
        tokens: toks,
        allDiscovered,
        enoughMana,
        ok: allDiscovered && enoughMana,
        onSelect: () => {
          dispatch({ type: 'CONFUSE' })
          setConfusedKey('dyn-' + k)
        },
      })
    })
  }
  const shuffledEntries = stableShuffle(entries, state.nodeId + ':' + state.turn)

  // Telegraph the load-bearing sentences: a line whose full discovery will OPEN a
  // currently-hidden path gets a 📜 cue, so the player knows where discovery pays off.
  // Only while still hidden — once the path is open, the cue has done its job and drops.
  const revealLineIdx = new Set()
  node.options.forEach((opt) => {
    if (opt.confuser || !opt.reveal) return
    if (!hasRequiredItem(state, opt)) return // path not available at all → don't tease it
    if (optionRevealed(opt)) return // already opened
    const line = sentenceFor(opt.reveal)
    if (line) revealLineIdx.add(lines.indexOf(line))
  })

  const renderLine = (line, i) => {
    const revealsPath = revealLineIdx.has(i)
    return (
      <p className={'story-line' + (revealsPath ? ' reveals-path' : '')} key={i}>
        {line.map((tok, j) => (
          <Token
            key={j}
            token={tok}
            discovered={state.discovered}
            peak={peak}
            onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
          />
        ))}
        {revealsPath && (
          <span
            className="reveal-cue"
            title="Discover every word in this line to open the path it names"
          >
            📜
          </span>
        )}
      </p>
    )
  }

  return (
    <div className="card story">
      <div className="story-text">
        {!state.ended && companionIds.length > 0 && renderLine(companionLine(), 'companions')}
        {!state.ended && itemIds.length > 0 && renderLine(carryLine(), 'carry')}
        {lines.map(renderLine)}
      </div>

      {state.ended ? (
        <div className={'ending ' + state.ended}>
          <div className="verdict">
            {state.ended === 'good'
              ? '🏆 Fund i mirë'
              : state.ended === 'secret'
                ? '✨ Fund i fshehtë'
                : '💀 Fund i keq'}
          </div>
          {node.title && <div className="ending-name">{node.title}</div>}
          {!compDone ? (
            <div className="comp-quiz">
              <p className="comp-q">
                📖 A e kuptove? — comprehension {compStep + 1} / {comp.length}
              </p>
              <div className="comp-al">{compQ.albanian}</div>
              <div className="answers">
                {compQ.options.map((opt) => {
                  let cls = 'answer'
                  if (compPick !== null && opt === compQ.correct) cls += ' correct'
                  else if (compPick === opt && opt !== compQ.correct) cls += ' wrong'
                  return (
                    <button
                      key={opt}
                      className={cls}
                      disabled={compPick !== null}
                      onClick={() => {
                        setCompPick(opt)
                        if (opt === compQ.correct) setCompScore((s) => s + 1)
                      }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {compPick === null ? (
                <p className="hint">Answer to unlock the tale.</p>
              ) : (
                <>
                  <div className={'feedback ' + (compPick === compQ.correct ? 'good' : 'bad')}>
                    {compPick === compQ.correct ? '✓ Saktë! ' : '✗ '}
                    <em>{compQ.albanian}</em> = {compQ.correct}
                  </div>
                  <button
                    className="btn primary"
                    onClick={() => {
                      setCompStep(compStep + 1)
                      setCompPick(null)
                    }}
                  >
                    {compStep < comp.length - 1 ? 'Next question →' : 'Reveal the tale →'}
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              {comp && (
                <div className={'feedback ' + (compScore === comp.length ? 'good' : 'bad')}>
                  You understood {compScore} / {comp.length}.
                </div>
              )}
              {node.blurb && <p className="ending-desc">{node.blurb}</p>}
              {state.debug && ENDING_LORE[node.id] && (() => {
                const lore = FOLKLORE.find((f) => f.id === ENDING_LORE[node.id])
                if (!lore) return null
                return (
                  <button
                    className="btn lore-link"
                    onClick={() => dispatch({ type: 'OPEN_LORE', lore: lore.id })}
                  >
                    📖 The folktale: <b>{lore.title}</b> — open in the library →
                  </button>
                )
              })()}
              {state.ended !== 'bad' ? (
                <>
                  <p className="hint">
                    Added to your endings collection. This tale is done — step back into the world and
                    keep exploring. Everything you&apos;ve gathered comes with you.
                  </p>
                  <button
                    className="btn primary"
                    onClick={() => dispatch({ type: 'RETURN_TO_WORLD', to: node.returnTo })}
                  >
                    🚶 Back to the world →
                  </button>
                </>
              ) : (
                <>
                  <p className="hint">
                    Added to your endings collection. Play again to find another ending — your
                    discovered words and tokens carry over.
                  </p>
                  <button className="btn primary" onClick={() => dispatch({ type: 'CONTINUE' })}>
                    ⟳ Play again
                  </button>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="options">
            {shuffledEntries.map((e) => {
              const wasConfused = confusedKey === e.key
              let cost
              if (wasConfused) {
                cost = <span className="option-cost bad">✗ can&apos;t happen here · −1 ♥</span>
              } else if (!e.allDiscovered) {
                cost = <span className="option-cost bad">discover all words first</span>
              } else if (!e.enoughMana) {
                cost = (
                  <span className="option-cost bad">
                    need tokens
                    <button
                      className="btn train-mini"
                      onClick={(ev) => {
                        ev.stopPropagation()
                        dispatch({ type: 'SET_VIEW', view: 'practice' })
                      }}
                    >
                      🎯 Train
                    </button>
                  </span>
                )
              } else {
                cost = <span className="option-cost ok">spends tokens</span>
              }
              return (
                <div
                  key={e.key}
                  className={'option' + (e.ok ? ' ready' : ' locked') + (wasConfused ? ' confused' : '')}
                  role="button"
                  aria-disabled={!e.ok}
                  onClick={e.ok ? e.onSelect : undefined}
                >
                  <span className="option-text">
                    {e.tokens.map((tok, j) => (
                      <Token
                        key={j}
                        token={tok}
                        discovered={state.discovered}
                        peak={peak}
                        onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
                        tokenCount={tok.id ? state.mana[tok.id] || 0 : undefined}
                      />
                    ))}
                    <span className="arrow"> →</span>
                  </span>
                  {cost}
                  {state.debug && e.real && !e.ok && (
                    <button
                      className="btn debug-mini"
                      title="Debug: discover these words and grant the tokens to take this path"
                      onClick={(ev) => {
                        ev.stopPropagation()
                        dispatch({ type: 'DEBUG_GRANT', ids: phraseSenses(e.tokens) })
                      }}
                    >
                      ⚡ tokens
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          {hiddenPaths > 0 && (
            <p className="hint locked-hint">
              📜 {hiddenPaths === 1 ? 'A path is' : hiddenPaths + ' paths are'} still hidden in the
              story — discover every word of a 📜-marked sentence to open the direction it names.
            </p>
          )}
          <p className="hint">
            Click a word to discover it. Discovering a whole sentence reveals the path it names;
            then hold one token per word to take it. Some choices can&apos;t really happen here —
            picking one costs a ♥.
          </p>
        </>
      )}
    </div>
  )
}
