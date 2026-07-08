import Token from './Token.jsx'
import { DICT, DEFS } from '../game/content.js'

// All discovered words, shown with an Albanian definition. Undiscovered words
// inside a definition are glossed to English, exactly like the story.
export default function DictionaryView({ state, dispatch }) {
  const ids = Object.keys(state.discovered)
    .filter((id) => state.discovered[id])
    .sort((a, b) => DICT[a].al.localeCompare(DICT[b].al, 'sq'))

  if (ids.length === 0) {
    return (
      <div className="card dictionary">
        <p className="empty">
          You haven't discovered any words yet.
          <br />
          Click words in the story to discover them — they'll be collected here with an Albanian
          definition.
        </p>
      </div>
    )
  }

  return (
    <div className="card dictionary">
      {ids.map((id) => {
        const count = state.mana[id] || 0
        const def = DEFS[id]
        return (
          <div className="dict-entry" key={id}>
            <div className="dict-head">
              <span className="dict-word">{DICT[id].al}</span>
              <span
                className={'token-badge' + (count > 0 ? '' : ' zero')}
                title={`${count} training token${count === 1 ? '' : 's'}`}
              >
                {count}
              </span>
            </div>
            <div className="dict-def">
              {def ? (
                def.map((tok, j) => (
                  <Token
                    key={j}
                    token={tok}
                    discovered={state.discovered}
                    peak={state.debug ? 999 : state.peak}
                    onDiscover={(sid) => dispatch({ type: 'DISCOVER', id: sid })}
                  />
                ))
              ) : (
                <span className="dict-fallback">{DICT[id].en}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
