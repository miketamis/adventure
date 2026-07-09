import { useState, useEffect } from 'react'
import Token from './Token.jsx'
import { STORY, ITEMS, w, wf, p, visibleLines, lineOf } from '../game/content.js'
import { ENDING_LORE, AREA_FACTOIDS } from '../game/folklore.js'
import { canSpeak, canUseItem, hasRequiredItem, hasCond, canAfford, phraseSenses, isRetreat } from '../game/gameState.js'
import { speakSequence } from '../game/audio.js'
import FactoidLore from './FactoidLore.jsx'

// sense ids that are NOT nouns (verbs, particles, adjectives, adverbs, numbers).
// Used to (a) pick a real "thing" from the scene for item-combo distractors, and
// (b) find the NOUN a direction acts on, so a sentence can unlock that direction.
const NON_NOUNS = new Set([
  'ti', 'je', 'ne', 'nje', 'dhe', 'ka', 'ke', 'mund', 'eshte', 'te_link', 'te_subj', 'te_obj', 'deri',
  'i_art', 'e_art', 'me', 'por', 'nuk', 'pa', 'ku', 'qe', 'do', 'per', 'une', 'jam', 'ose', 'jo',
  'sheh', 'ec', 'fle', 'hap', 'ik', 'jep', 'pi', 'behet', 'vjen', 'zgjohu', 'rri', 'ndiz', 'ha',
  'mbaroi', 'humbet', 'merr', 'kerko', 'gjen', 'kalo', 'shko', 'prit', 'lufto', 'vrit', 'shpeto',
  'ngjit', 'zbrit', 'fluturo', 'degjo', 'flet', 'thote', 'ndihmo', 'beso', 'hyr', 'dil', 'thirr',
  'hidh', 'kthehu', 'prek', 'vdes', 'bie', 'pre', 'luan', 'bej', 'mbyll', 'vazhdon', 'lind', 'fol',
  'premto', 'shkimet', 'mplaket', 'trashegohet', 'e_conj', 'o',
  'lan', 'thyen', 'leh', 'kafshon', 'vonon', 'harron', 'mbare', 'me_obj', 'piqet', 'rron',
  'tona', 'djathte', 'lumte',
  'madh', 'vogel', 'erret', 'sigurt', 'ri', 'vjeter', 'uritur', 'shpejt', 'qete', 'perseri',
  'forte', 'bukur', 'keq', 'thate', 'lart', 'mire', 'ngadale', 'poshte', 'larg', 'jashte', 'tani',
  'ngrohte', 'ftohte', 'ketu', 'brenda', 'bardhe', 'zi', 'shume', 'tjeter', 'nente', 'shtate',
])
const LIQUID_ITEMS = new Set(['qumesht', 'potion', 'cajMali']) // drinkable — don't "drink the X" them

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
// NEAR-MISS distractors — the test should be genuinely failable. Two makers:
// (1) SWAP two content words of the correct answer ("the wolf eats the man" →
//     "the man eats the wolf") — grammatical, plausible, and only real
//     comprehension of the Albanian word order tells them apart;
// (2) a TOPICAL pool line that shares a content word with the answer, so the
//     odd option can't be eliminated by topic alone.
const STOPWORDS = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'of', 'to', 'in', 'on', 'at', 'and', 'or', 'with', 'for', 'you', 'your', 'it', 'its', 'i', 'my', 'me', 'he', 'she', 'they', 'this', 'that', 'not', 'no'])
const stripPunct = (w) => w.replace(/[.,!?:;]+$/, '')
const contentWords = (s) => s.split(' ').map(stripPunct).filter((w) => w && !STOPWORDS.has(w.toLowerCase()))
function swapWordsDistractor(correct, seed) {
  const toks = correct.split(' ')
  const idx = []
  for (let i = 0; i < toks.length; i++) {
    const w = stripPunct(toks[i])
    if (w && !STOPWORDS.has(w.toLowerCase())) idx.push(i)
  }
  const pairs = []
  for (let a = 0; a < idx.length; a++)
    for (let b = a + 1; b < idx.length; b++)
      if (stripPunct(toks[idx[a]]).toLowerCase() !== stripPunct(toks[idx[b]]).toLowerCase()) pairs.push([idx[a], idx[b]])
  if (!pairs.length) return null
  const [i1, i2] = stableShuffle(pairs, seed)[0]
  const tail = (w) => (w.match(/[.,!?:;]+$/) || [''])[0]
  const out = [...toks]
  const w1 = stripPunct(out[i1])
  const w2 = stripPunct(out[i2])
  out[i1] = w2 + tail(toks[i1])
  out[i2] = w1 + tail(toks[i2])
  const swapped = out.join(' ')
  return swapped === correct ? null : swapped
}
// Turn an ORDERED list of story lines (richest-first) into up to `count`
// comprehension questions with near-miss distractors. `seedKey` keeps the
// option order stable per topic. Shared by ending factoids and area factoids.
function comprehensionFromLines(orderedLines, seedKey, count = 3) {
  const seen = new Set()
  const chosen = []
  for (const l of orderedLines) {
    if (chosen.length >= count) break
    if (!isContent(l)) continue
    const k = lineAlbanian(l)
    if (seen.has(k) || !k) continue
    seen.add(k)
    chosen.push(l)
  }
  if (!chosen.length) return null
  const pool = answerPool()
  const qs = chosen
    .map((line, i) => {
      const correct = lineEnglish(line)
      const wc = correct.split(' ').length
      const cw = new Set(contentWords(correct).map((w) => w.toLowerCase()))
      const distractors = []
      // 1: the word-order flip of the answer itself
      const swapped = swapWordsDistractor(correct, seedKey + correct + i)
      if (swapped) distractors.push(swapped)
      // 2: a same-topic line (shares a content word), else a near-length line
      let p = pool.filter((s) => s !== correct && !distractors.includes(s))
      const topical = p.filter((s) => contentWords(s).some((w) => cw.has(w.toLowerCase())))
      const near = p.filter((s) => Math.abs(s.split(' ').length - wc) <= 2)
      for (const src of [topical, near, p]) {
        if (distractors.length >= 2) break
        for (const s of stableShuffle(src, seedKey + correct + i)) {
          if (distractors.length >= 2) break
          if (s !== correct && !distractors.includes(s)) distractors.push(s)
        }
      }
      if (distractors.length < 2) return null
      return { albanian: lineAlbanian(line), correct, options: stableShuffle([correct, ...distractors], seedKey + i) }
    })
    .filter(Boolean)
  return qs.length ? qs : null
}
// a SET of comprehension questions for an ENDING factoid. THE JOURNEY IS THE
// TEST: questions come from the path that led here (up to three hops back),
// not from the ending text — which stays HIDDEN until the test is passed, so
// understanding can't be cribbed off the page. Four questions, all must be
// answered correctly to earn the factoid.
function buildComprehension(node, resolvedLines) {
  const ordered = []
  const visited = new Set([node.id])
  let frontier = [node.id]
  for (let hop = 0; hop < 3; hop++) {
    const next = []
    for (const id of frontier) {
      for (const pid of predsOf(id)) {
        if (visited.has(pid)) continue
        visited.add(pid)
        next.push(pid)
        for (const l of STORY[pid].text.map(lineOf).sort((a, b) => richness(b) - richness(a))) ordered.push(l)
      }
    }
    frontier = next
  }
  // fallback for endings with a thin path: the ending's own lines
  for (const l of [...resolvedLines].sort((a, b) => richness(b) - richness(a))) ordered.push(l)
  return comprehensionFromLines(ordered, node.id, 4)
}
// comprehension for an AREA factoid: drawn from the region's key scenes (quizNodes).
function areaComprehension(factoid) {
  const lines = []
  for (const id of factoid.quizNodes || []) {
    if (STORY[id]) for (const l of STORY[id].text.map(lineOf)) lines.push(l)
  }
  lines.sort((a, b) => richness(b) - richness(a))
  return comprehensionFromLines(lines, factoid.id, 4)
}

export default function StoryView({ state, dispatch }) {
  const node = STORY[state.nodeId]
  // in debug mode peak never runs out, so hovering always reveals the English
  const peak = state.debug ? 999 : state.peak
  // which confuser option was just picked (to flash feedback); reset per node
  const [confusedKey, setConfusedKey] = useState(null)
  // the story token currently being read aloud ("<lineIdx>:<tokIdx>"), so it can
  // be highlighted as the passage is narrated word-by-word on entering a node
  const [speakingKey, setSpeakingKey] = useState(null)
  // comprehension test at an ending: which question, the pick for it, running score
  const [compStep, setCompStep] = useState(0)
  const [compPick, setCompPick] = useState(null)
  const [compScore, setCompScore] = useState(0)
  // set when THIS visit passed the test (the earn flips alreadyEarned, so the
  // fresh-earn feedback needs its own flag)
  const [justEarned, setJustEarned] = useState(false)
  // AREA-FACTOID comprehension test (opened from the "take the test" banner):
  // whether it's open, and its own step/pick/score.
  const [factoidOpen, setFactoidOpen] = useState(false)
  const [fStep, setFStep] = useState(0)
  const [fPick, setFPick] = useState(null)
  const [fScore, setFScore] = useState(0)
  const resetFactoidQuiz = () => { setFStep(0); setFPick(null); setFScore(0) }
  useEffect(() => {
    setConfusedKey(null)
    setCompStep(0)
    setCompPick(null)
    setCompScore(0)
    setJustEarned(false)
  }, [state.nodeId])
  useEffect(() => {
    setFactoidOpen(false)
    resetFactoidQuiz()
  }, [state.pendingFactoid])

  // === SENTENCE-GATED DIRECTIONS ============================================
  // A direction stays hidden until you discover every word of the sentence that
  // names its thing. e.g. discovering "ka një lumë" reveals "shko në lumë". The
  // noun a phrase acts on is its last content noun.
  // the lines actually shown right now — a scene can react to what walks with you
  // AND to the hour (when()/unless() lines in content.js take item ids or a
  // time-of-day phase id), so resolve against inventory + the world clock
  const has = (id) => hasCond(state, id)
  const lines = visibleLines(node, has)

  // Narrate the passage on first entering a node: read every word aloud in
  // Albanian, one after another, and highlight the word being spoken. Re-runs
  // only when the node changes (not on every discovery/hover re-render).
  useEffect(() => {
    if (state.ended) return
    const order = []
    lines.forEach((line, i) => {
      line.forEach((tok, j) => {
        if (tok.paren || !tok.al) return
        order.push({ key: i + ':' + j, al: tok.al })
      })
    })
    if (!order.length) return
    setSpeakingKey(null)
    const cancel = speakSequence(
      order.map((o) => o.al),
      (idx) => setSpeakingKey(idx >= 0 ? order[idx].key : null),
    )
    return cancel
    // narration is keyed to the node itself — see comment above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.nodeId, state.ended])
  // comprehension test that GATES a good/secret factoid: only unearned factoid
  // endings are tested (a fate needs no proof; a factoid already earned on an
  // earlier run is yours). ALL questions must be answered correctly to earn.
  const alreadyEarned = !!state.discoveredEndings?.[state.nodeId]
  const isFactoidEnd = state.ended === 'good' || state.ended === 'secret'
  // build the test for an unearned factoid ending. Keep it alive through the very
  // render where it's earned (justEarned) so the result screen can still show the
  // score before `alreadyEarned` flips it off on the next visit.
  const comp = isFactoidEnd && (!alreadyEarned || justEarned) ? buildComprehension(node, lines) : null
  const compDone = !comp || compStep >= comp.length
  const compQ = compDone ? null : comp[compStep]
  // you EARN the tale by SURVIVING the test — each wrong answer costs a heart,
  // run out and the run is over (the global game-over modal takes over). So a
  // lone misclick just stings; you still get the tale as long as a heart remains.
  const compPassed = !comp || state.hearts > 0

  // an AREA factoid the world is offering right now (only while free-roaming)
  const pendingFactoid = !state.ended && state.pendingFactoid
    ? AREA_FACTOIDS.find((f) => f.id === state.pendingFactoid)
    : null
  const areaComp = pendingFactoid ? areaComprehension(pendingFactoid) : null
  const areaDone = areaComp && fStep >= areaComp.length
  const areaQ = areaComp && !areaDone ? areaComp[fStep] : null
  // same rule as the ending test: you EARN by SURVIVING — each wrong answer
  // costs a heart, and emptying them ends the run (game-over modal takes over).

  const isNoun = (id) => id && !NON_NOUNS.has(id)
  const lineDiscovered = (line) => line.every((t) => !t.id || state.discovered[t.id])
  const sentenceFor = (senseId) => lines.find((line) => line.some((t) => t.id === senseId))
  // An option stays hidden until you discover the sentence it belongs to — authored
  // PER OPTION as `reveal: '<senseId>'` in content.js (deliberately NOT an automatic
  // rule). No `reveal` field => the option is always shown. `scripts/storystats.mjs`
  // lints the design goals: that most options are gated, and that every node always
  // keeps at least one ungated, always-visible path.
  const optionRevealed = (opt) => {
    // the way you just came is never hidden — you can always see your retreat
    if (isRetreat(state, opt)) return true
    if (!opt.reveal) return true
    const line = sentenceFor(opt.reveal)
    return !line || lineDiscovered(line)
  }

  // what you hold. Companions (ITEMS[id].companion) are tracked exactly like items
  // but they're who walks WITH you, so they render as their own story line instead
  // of "you have a X", and an option can gate on them with `requires: '<companionId>'`.
  const ownedIds = Object.keys(state.inventory).filter((id) => state.inventory[id] > 0)
  // currency (lek) is a COUNT shown in the topbar purse, not a thing in the
  // "ti ke një X" carry-line
  const itemIds = ownedIds.filter((id) => !ITEMS[id]?.companion && !ITEMS[id]?.currency)
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
    const affordable = canAfford(state, opt)
    const retreat = isRetreat(state, opt) // backtracking spends no tokens
    entries.push({
      key: 'opt-' + i,
      tokens: opt.text,
      real: true,
      allDiscovered,
      enoughMana,
      free: !!opt.free || retreat,
      retreat,
      lek: opt.lek || 0,
      affordable,
      ok: allDiscovered && (enoughMana || opt.free || retreat) && hasRequiredItem(state, opt) && affordable,
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
    // a Q() line — quoted word-for-word from the folk sources; set apart, attributed
    const quoteSrc = line.quote
    return (
      <p
        className={'story-line' + (revealsPath ? ' reveals-path' : '') + (quoteSrc ? ' quote-line' : '')}
        key={i}
      >
        {line.map((tok, j) => (
          <Token
            key={j}
            token={tok}
            discovered={state.discovered}
            peak={peak}
            onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
            speaking={speakingKey === i + ':' + j}
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
        {quoteSrc && (
          <span className="quote-src" title="Quoted word-for-word from the folk sources">
            — {quoteSrc}
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
        {/* a factoid ending's tale stays HIDDEN until the test is passed — no
            cribbing the answers off the page, and failing means no tale at all */}
        {(!state.ended || (compDone && compPassed)) && lines.map(renderLine)}
      </div>

      {state.ended ? (
        <div className={'ending ' + state.ended}>
          <div className="verdict">
            {state.ended === 'bad'
              ? '💀 Fund i keq'
              : !compDone
                ? '📜 A e kuptove? — prove the tale'
                : state.ended === 'good'
                  ? '🏆 Factoid unlocked'
                  : '✨ Secret factoid'}
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
                        // right → score up; wrong → lose a heart (0 = game over)
                        if (opt === compQ.correct) setCompScore((s) => s + 1)
                        else dispatch({ type: 'COMP_WRONG' })
                      }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {compPick === null ? (
                <p className="hint">A wrong answer costs a ♥ — lose all and the run ends.</p>
              ) : (
                <>
                  <div className={'feedback ' + (compPick === compQ.correct ? 'good' : 'bad')}>
                    {compPick === compQ.correct ? '✓ Saktë! ' : '✗ '}
                    <em>{compQ.albanian}</em> = {compQ.correct}
                  </div>
                  <button
                    className="btn primary"
                    onClick={() => {
                      // survive the last question with a heart left → EARN the tale
                      // (a wrong final answer that emptied your hearts never reaches
                      // here — the game-over modal has already taken the screen)
                      if (compStep >= comp.length - 1 && state.hearts > 0) {
                        setJustEarned(true)
                        dispatch({ type: 'EARN_FACTOID', id: node.id })
                      }
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
              {/* you SURVIVED the test (a heart still burns) — the tale is yours,
                  whether you aced it or bled a heart or two on the way */}
              {justEarned && comp && (
                <div className="feedback good">
                  {compScore >= comp.length
                    ? '✓ Every answer right — the tale is yours.'
                    : `✓ The tale is yours — ${compScore} / ${comp.length} understood.`}
                </div>
              )}
              {node.blurb && <p className="ending-desc">{node.blurb}</p>}
              {state.ended !== 'bad' && <FactoidLore loreId={ENDING_LORE[node.id]} dispatch={dispatch} />}
              {state.ended !== 'bad' ? (
                <>
                  {justEarned && <p className="hearts-restored">❤️ Hearts restored to full.</p>}
                  <p className="hint">
                    Added to your lore codex. This tale is done — step back into the world and
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
                    Recorded in your codex as a fate. Play again to seek out a factoid — your
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
      ) : factoidOpen && pendingFactoid ? (
        <div className="ending secret">
          <div className="verdict">📜 A e kuptove?</div>
          <div className="ending-name">{pendingFactoid.title}</div>
          {areaComp && !areaDone ? (
            <div className="comp-quiz">
              <p className="comp-q">📖 comprehension {fStep + 1} / {areaComp.length}</p>
              <div className="comp-al">{areaQ.albanian}</div>
              <div className="answers">
                {areaQ.options.map((opt) => {
                  let cls = 'answer'
                  if (fPick !== null && opt === areaQ.correct) cls += ' correct'
                  else if (fPick === opt && opt !== areaQ.correct) cls += ' wrong'
                  return (
                    <button
                      key={opt}
                      className={cls}
                      disabled={fPick !== null}
                      onClick={() => {
                        setFPick(opt)
                        if (opt === areaQ.correct) setFScore((s) => s + 1)
                        else dispatch({ type: 'COMP_WRONG' })
                      }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
              {fPick === null ? (
                <p className="hint">A wrong answer costs a ♥ — lose all and the run ends.</p>
              ) : (
                <>
                  <div className={'feedback ' + (fPick === areaQ.correct ? 'good' : 'bad')}>
                    {fPick === areaQ.correct ? '✓ Saktë! ' : '✗ '}
                    <em>{areaQ.albanian}</em> = {areaQ.correct}
                  </div>
                  <button
                    className="btn primary"
                    onClick={() => {
                      setFStep(fStep + 1)
                      setFPick(null)
                    }}
                  >
                    {fStep < areaComp.length - 1 ? 'Next question →' : 'See the result →'}
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              {/* survived the test (a heart still burns) → the factoid is yours,
                  aced or bled a heart or two; a run-out is caught by game-over */}
              {areaComp && (
                <div className="feedback good">
                  {fScore >= areaComp.length
                    ? `✓ Every answer right — ${fScore} / ${areaComp.length}.`
                    : `✓ The factoid is yours — ${fScore} / ${areaComp.length} understood.`}
                </div>
              )}
              {pendingFactoid.blurb && <p className="ending-desc">{pendingFactoid.blurb}</p>}
              <FactoidLore loreId={pendingFactoid.lore} dispatch={dispatch} />
              <p className="hearts-restored">❤️ Hearts restored to full.</p>
              <p className="hint">Added to your lore codex — step back into the world and keep exploring.</p>
              <button
                className="btn primary"
                onClick={() => dispatch({ type: 'EARN_FACTOID', id: pendingFactoid.id })}
              >
                🏆 Claim factoid →
              </button>
            </>
          )}
        </div>
      ) : (
        <>
          {pendingFactoid && (
            <div className="factoid-banner">
              <span className="factoid-banner-text">
                📜 You&apos;ve come to know <b>{pendingFactoid.title}</b> — prove it to earn a factoid.
              </span>
              <span className="factoid-banner-actions">
                <button className="btn primary" onClick={() => { resetFactoidQuiz(); setFactoidOpen(true) }}>
                  Take the test →
                </button>
                <button className="btn factoid-dismiss" title="Dismiss for now" onClick={() => dispatch({ type: 'DISMISS_FACTOID' })}>
                  ✕
                </button>
              </span>
            </div>
          )}
          <div className="options">
            {shuffledEntries.map((e) => {
              const wasConfused = confusedKey === e.key
              let cost
              if (wasConfused) {
                cost = <span className="option-cost bad">✗ can&apos;t happen here · −1 ♥</span>
              } else if (!e.allDiscovered) {
                cost = <span className="option-cost bad">discover all words first</span>
              } else if (e.free) {
                // walking back the way you came — no tokens needed or spent
                cost = (
                  <span className="option-cost ok">
                    {e.retreat ? 'the way you came — free' : 'free — spends no tokens'}
                  </span>
                )
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
              } else if (e.affordable === false) {
                // priced path you can't pay for yet — the price tag is the lesson
                cost = <span className="option-cost bad">need 🪙 {-e.lek} lek</span>
              } else if (e.lek) {
                cost = (
                  <span className="option-cost ok">
                    {e.lek > 0 ? `earns 🪙 ${e.lek}` : `costs 🪙 ${-e.lek}`} · spends tokens
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
