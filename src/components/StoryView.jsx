import { useState, useEffect } from 'react'
import Token from './Token.jsx'
import { STORY, ITEMS } from '../game/content.js'
import { canSpeak, hasRequiredItem } from '../game/gameState.js'

export default function StoryView({ state, dispatch }) {
  const node = STORY[state.nodeId]
  // which confuser option was just picked (to flash feedback); reset per node
  const [confusedIdx, setConfusedIdx] = useState(null)
  useEffect(() => setConfusedIdx(null), [state.nodeId])

  // a secret option stays hidden until every word in the passage is discovered
  const textSenseIds = [...new Set(node.text.flat().filter((t) => t.id).map((t) => t.id))]
  const undiscoveredInText = textSenseIds.filter((id) => !state.discovered[id])
  const passageFullyDiscovered = undiscoveredInText.length === 0

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
      <div className="story-text">{node.text.map(renderLine)}</div>

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
            {node.options.map((opt, i) => {
              // item-gated path: completely hidden until you carry the item
              if (opt.requires && !hasRequiredItem(state, opt)) return null

              // secret path: obscured until the whole passage is discovered
              if (opt.secret && !passageFullyDiscovered) {
                return (
                  <div key={i} className="option secret-locked" aria-disabled="true">
                    <span className="option-text">🔒 a hidden path…</span>
                    <span className="option-cost bad">
                      discover every word above to reveal · {undiscoveredInText.length} left
                    </span>
                  </div>
                )
              }

              const { allDiscovered, enoughMana } = canSpeak(state, opt.text)
              const ok = allDiscovered && enoughMana && hasRequiredItem(state, opt)
              const reqItem = opt.requires && ITEMS[opt.requires]
              let cost
              if (!allDiscovered) {
                cost = <span className="option-cost bad">discover all words first</span>
              } else if (!enoughMana) {
                cost = (
                  <span className="option-cost bad">
                    need tokens
                    <button
                      className="btn train-mini"
                      onClick={(e) => {
                        e.stopPropagation()
                        dispatch({ type: 'SET_VIEW', view: 'practice' })
                      }}
                    >
                      🎯 Train
                    </button>
                  </span>
                )
              } else if (opt.consumes && ITEMS[opt.consumes]) {
                cost = (
                  <span className="option-cost item">
                    uses {ITEMS[opt.consumes].icon} {ITEMS[opt.consumes].name}
                  </span>
                )
              } else if (opt.grant && ITEMS[opt.grant]) {
                cost = (
                  <span className="option-cost ok">
                    take {ITEMS[opt.grant].icon} · spends tokens
                  </span>
                )
              } else {
                cost = <span className="option-cost ok">spends tokens</span>
              }

              const wasConfused = confusedIdx === i
              if (wasConfused) {
                cost = <span className="option-cost bad">✗ can&apos;t happen here · −1 ♥</span>
              }
              const onPick = opt.confuser
                ? () => {
                    dispatch({ type: 'CONFUSE' })
                    setConfusedIdx(i)
                  }
                : () => dispatch({ type: 'CHOOSE', option: opt, targetNode: STORY[opt.to] })
              return (
                <div
                  key={i}
                  className={
                    'option' +
                    (ok ? ' ready' : ' locked') +
                    (opt.secret ? ' secret' : '') +
                    (reqItem ? ' item-path' : '') +
                    (wasConfused ? ' confused' : '')
                  }
                  role="button"
                  aria-disabled={!ok}
                  onClick={ok ? onPick : undefined}
                >
                  <span className="option-text">
                    {opt.secret && <span className="secret-badge">✨ </span>}
                    {reqItem && <span className="item-badge">{reqItem.icon} </span>}
                    {opt.text.map((tok, j) => (
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
