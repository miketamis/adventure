import { useState, useEffect } from 'react'
import Token from './Token.jsx'
import { STORY, ITEMS, w, p } from '../game/content.js'
import { canSpeak, canUseItem, hasRequiredItem } from '../game/gameState.js'

// sense ids that are NOT nouns (verbs, particles, adjectives, adverbs) — used to
// pick a real "thing" from the scene when building item-combo distractors
const NON_NOUNS = new Set([
  'ti', 'je', 'ne', 'nje', 'dhe', 'ka', 'ke', 'mund', 'eshte', 'te_link', 'te_subj', 'i_art',
  'e_art', 'me', 'por', 'nuk', 'pa', 'ku', 'qe', 'do', 'per', 'une',
  'sheh', 'ec', 'fle', 'hap', 'ik', 'jep', 'pi', 'behet', 'vjen', 'zgjohu', 'rri', 'ndiz', 'ha',
  'mbaroi', 'humbet', 'merr', 'kerko', 'gjen', 'kalo', 'shko', 'prit', 'lufto', 'vrit', 'shpeto',
  'ngjit', 'zbrit', 'fluturo', 'degjo', 'flet', 'thote', 'ndihmo', 'beso', 'hyr', 'dil', 'thirr',
  'hidh', 'kthehu', 'prek', 'vdes', 'bie', 'pre', 'luan', 'bej', 'mbyll', 'vazhdon',
  'madh', 'vogel', 'erret', 'sigurt', 'ri', 'vjeter', 'uritur', 'shpejt', 'qete', 'perseri',
  'forte', 'bukur', 'keq', 'thate', 'lart', 'mire', 'ngadale', 'poshte', 'larg', 'jashte', 'tani',
  'ngrohte', 'ftohte', 'ketu', 'brenda',
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

  // a secret option stays hidden until every word in the passage is discovered
  const textSenseIds = [...new Set(node.text.flat().filter((t) => t.id).map((t) => t.id))]
  const undiscoveredInText = textSenseIds.filter((id) => !state.discovered[id])
  const passageFullyDiscovered = undiscoveredInText.length === 0

  // what you carry, and which of those can be used (their action becomes a path)
  const ownedIds = Object.keys(state.inventory).filter((id) => state.inventory[id] > 0)
  const usableOwned = ownedIds.filter((id) => ITEMS[id]?.use)

  // "ti ke një X dhe një Y ." — rendered as a real story line (discoverable words)
  const carryLine = () => {
    const toks = [w('ti'), w('ke')]
    ownedIds.forEach((id, i) => {
      if (i > 0) toks.push(w('dhe'))
      toks.push(w('nje'), w(ITEMS[id].word || id))
    })
    toks.push(p('.'))
    return toks
  }

  // Distractors built from the item(s) you carry — an impossible action on the
  // item, and sometimes a nonsensical combo of the item with a thing in the
  // scene (e.g. "jashtë bukë plak"). They appear even where no real item path
  // exists, so carrying something is never a free pass.
  const presentNouns = textSenseIds.filter((id) => !NON_NOUNS.has(id))
  const itemConfusers = []
  if (ownedIds.length > 0) {
    const hash = [...state.nodeId].reduce((a, c) => a + c.charCodeAt(0), 0)
    const featured = ownedIds[hash % ownedIds.length]
    const fw = ITEMS[featured].word || featured
    // an impossible action on the item itself (drink a solid; fight a liquid)
    itemConfusers.push([LIQUID_ITEMS.has(featured) ? w('lufto') : w('pi'), w(fw)])
    // sometimes: the item tangled up with something in the scene — pure nonsense
    if (presentNouns.length > 0 && hash % 2 === 0) {
      itemConfusers.push([w('jashte'), w(fw), w(presentNouns[hash % presentNouns.length])])
    }
  }
  // don't show one that happens to match a real option or item action
  const seenPhrase = new Set()
  for (const o of node.options) seenPhrase.add(o.text.map((t) => t.id || t.en).join(' '))
  for (const id of usableOwned) seenPhrase.add(ITEMS[id].use.phrase.map((t) => t.id || t.en).join(' '))
  const dynamicConfusers = itemConfusers.filter(
    (toks) => !seenPhrase.has(toks.map((t) => t.id || t.en).join(' ')),
  )

  // Every choice — story paths, item uses, distractors — is the same kind of
  // object with no special styling, then shuffled, so position is no tell.
  const entries = []
  node.options.forEach((opt, i) => {
    if (opt.requires && !hasRequiredItem(state, opt)) return
    if (opt.secret && !passageFullyDiscovered) {
      entries.push({ key: 'opt-' + i, secretLocked: true })
      return
    }
    const { allDiscovered, enoughMana } = canSpeak(state, opt.text)
    entries.push({
      key: 'opt-' + i,
      tokens: opt.text,
      allDiscovered,
      enoughMana,
      ok: allDiscovered && enoughMana && hasRequiredItem(state, opt),
      onSelect: opt.confuser
        ? () => {
            dispatch({ type: 'CONFUSE' })
            setConfusedKey('opt-' + i)
          }
        : () => dispatch({ type: 'CHOOSE', option: opt, targetNode: STORY[opt.to] }),
    })
  })
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
        {!state.ended && ownedIds.length > 0 && renderLine(carryLine(), 'carry')}
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
              if (e.secretLocked) {
                return (
                  <div key={e.key} className="option secret-locked" aria-disabled="true">
                    <span className="option-text">a hidden path…</span>
                    <span className="option-cost bad">
                      discover every word above to reveal · {undiscoveredInText.length} left
                    </span>
                  </div>
                )
              }
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
          <p className="hint">
            Click a word to discover it; take a path by holding one token per word. Some choices
            can&apos;t really happen here — read carefully, because picking one costs a ♥. Items
            open new paths.
          </p>
        </>
      )}
    </div>
  )
}
