import { useState, useEffect } from 'react'
import Token from './Token.jsx'
import { STORY, ITEMS, w, wf, p } from '../game/content.js'
import { canSpeak, canUseItem, hasRequiredItem } from '../game/gameState.js'

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

export default function StoryView({ state, dispatch }) {
  const node = STORY[state.nodeId]
  // which confuser option was just picked (to flash feedback); reset per node
  const [confusedKey, setConfusedKey] = useState(null)
  useEffect(() => setConfusedKey(null), [state.nodeId])

  // === SENTENCE-GATED DIRECTIONS ============================================
  // A direction stays hidden until you discover every word of the sentence that
  // names its thing. e.g. discovering "ka një lumë" reveals "shko në lumë". The
  // noun a phrase acts on is its last content noun.
  const isNoun = (id) => id && !NON_NOUNS.has(id)
  const lineDiscovered = (line) => line.every((t) => !t.id || state.discovered[t.id])
  // An option can be DESIGNED to stay hidden until a chosen sentence is fully read:
  // author `reveal: '<senseId>'` on the option and it appears only once the text line
  // that introduces that word is discovered. Hand-picked per option in content.js —
  // deliberately NOT an automatic rule. No `reveal` field => the option is always shown.
  const sentenceFor = (senseId) => node.text.find((line) => line.some((t) => t.id === senseId))
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
  const presentNouns = [...new Set(node.text.flat().filter((t) => isNoun(t.id)).map((t) => t.id))]
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
    if (opt.requires && !hasRequiredItem(state, opt)) return
    if (!optionRevealed(opt)) {
      hiddenPaths++
      return
    }
    const { allDiscovered, enoughMana } = canSpeak(state, opt.text)
    entries.push({
      key: 'opt-' + i,
      tokens: opt.text,
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

  const renderLine = (line, i) => (
    <p className="story-line" key={i}>
      {line.map((tok, j) => (
        <Token
          key={j}
          token={tok}
          discovered={state.discovered}
          peak={state.peak}
          onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
        />
      ))}
    </p>
  )

  return (
    <div className="card story">
      <div className="story-text">
        {!state.ended && companionIds.length > 0 && renderLine(companionLine(), 'companions')}
        {!state.ended && itemIds.length > 0 && renderLine(carryLine(), 'carry')}
        {node.text.map(renderLine)}
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
          {node.blurb && <p className="ending-desc">{node.blurb}</p>}
          <p className="hint">
            Added to your endings collection. Play again to find another ending — your discovered
            words and tokens carry over.
          </p>
          <button className="btn primary" onClick={() => dispatch({ type: 'CONTINUE' })}>
            ⟳ Play again
          </button>
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
                        peak={state.peak}
                        onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
                        tokenCount={tok.id ? state.mana[tok.id] || 0 : undefined}
                      />
                    ))}
                    <span className="arrow"> →</span>
                  </span>
                  {cost}
                </div>
              )
            })}
          </div>
          {hiddenPaths > 0 && (
            <p className="hint locked-hint">
              📜 {hiddenPaths === 1 ? 'A path is' : hiddenPaths + ' paths are'} still hidden in the
              story — discover every word of a sentence to open the direction it names.
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
