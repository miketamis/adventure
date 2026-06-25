import Token from './Token.jsx'
import { ITEMS } from '../game/content.js'
import { canUseItem } from '../game/gameState.js'

export default function InventoryView({ state, dispatch }) {
  const owned = Object.keys(state.inventory).filter((id) => state.inventory[id] > 0)

  if (owned.length === 0) {
    return (
      <div className="card inventory">
        <p className="empty">
          Your bag is empty.
          <br />
          Find items in the story (look for things you can pick up) and they will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="card inventory">
      {owned.map((id) => {
        const item = ITEMS[id]
        const count = state.inventory[id]
        const usable = !!item.use

        let cost
        if (usable) {
          const { allDiscovered, enoughMana, ok } = canUseItem(state, item)
          if (!allDiscovered) cost = <span className="option-cost bad">discover all words first</span>
          else if (!enoughMana)
            cost = (
              <span className="option-cost bad">
                need tokens
                <button
                  className="btn train-mini"
                  onClick={() => dispatch({ type: 'SET_VIEW', view: 'practice' })}
                >
                  🎯 Train
                </button>
              </span>
            )
          else cost = <span className="option-cost ok">spends tokens</span>

          return (
            <div className="item" key={id}>
              <div className="item-head">
                <span className="item-icon">{item.icon}</span>
                <span className="item-name">
                  {item.name} <span className="item-al">{item.al}</span>
                </span>
                <span className="item-count">×{count}</span>
              </div>
              <p className="item-blurb">{item.blurb}</p>
              <div
                className={'option' + (ok ? ' ready' : ' locked')}
                role="button"
                aria-disabled={!ok}
                onClick={ok ? () => dispatch({ type: 'USE_ITEM', item }) : undefined}
              >
                <span className="option-text">
                  {item.use.phrase.map((tok, j) => (
                    <Token
                      key={j}
                      token={tok}
                      discovered={state.discovered}
                      peak={state.peak}
                      onDiscover={(sid) => dispatch({ type: 'DISCOVER', id: sid })}
                      tokenCount={tok.id ? state.mana[tok.id] || 0 : undefined}
                    />
                  ))}
                  <span className="arrow"> →</span>
                </span>
                {cost}
              </div>
            </div>
          )
        }

        // key item — carried, used by choosing the right path in the story
        return (
          <div className="item" key={id}>
            <div className="item-head">
              <span className="item-icon">{item.icon}</span>
              <span className="item-name">
                {item.name} <span className="item-al">{item.al}</span>
              </span>
              <span className="item-count">×{count}</span>
            </div>
            <p className="item-blurb">{item.blurb}</p>
            <p className="item-hold">🎒 carried — use it at the right moment in the story</p>
          </div>
        )
      })}
    </div>
  )
}
