import Token from './Token.jsx'
import { STORY } from '../game/content.js'
import { canChoose } from '../game/gameState.js'

export default function StoryView({ state, dispatch, onNewRun }) {
  const node = STORY[state.nodeId]

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
            {state.ended === 'good' ? 'Fund i mirë — a good ending' : 'Fund i keq — a bad ending'}
          </div>
          <p className="hint">You reached an ending. Start a fresh run to play again.</p>
          <button className="btn primary" onClick={onNewRun}>
            ⟳ New run
          </button>
        </div>
      ) : (
        <>
          <div className="options">
            {node.options.map((opt, i) => {
              // hidden path: obscured until the whole passage is discovered
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
              const { allDiscovered, enoughMana, ok } = canChoose(state, opt)
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
              } else {
                cost = <span className="option-cost ok">spends tokens</span>
              }
              const choose = () =>
                dispatch({ type: 'CHOOSE', option: opt, targetNode: STORY[opt.to] })
              return (
                <div
                  key={i}
                  className={'option' + (ok ? ' ready' : ' locked') + (opt.secret ? ' secret' : '')}
                  role="button"
                  aria-disabled={!ok}
                  onClick={ok ? choose : undefined}
                >
                  <span className="option-text">
                    {opt.secret && <span className="secret-badge">✨ </span>}
                    {opt.text.map((tok, j) => (
                      <Token
                        key={j}
                        token={tok}
                        discovered={state.discovered}
                        peak={state.peak}
                        onDiscover={(id) => dispatch({ type: 'DISCOVER', id })}
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
            Click a word to discover it. To choose a path you must have discovered every word in
            it and hold one training token per word.
          </p>
        </>
      )}
    </div>
  )
}
