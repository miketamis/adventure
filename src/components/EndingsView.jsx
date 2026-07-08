import { useState } from 'react'
import { ENDINGS } from '../game/content.js'
import { ENDING_LORE, AREA_FACTOIDS } from '../game/folklore.js'
import FactoidLore from './FactoidLore.jsx'

// The player's long-term LORE CODEX. Good/secret endings and area factoids are
// "factoids" — lore achievements you earn by proving comprehension about a topic.
// Bad endings are "fates" (game overs) — still recorded, but kept apart and not
// counted toward the factoid total.
const FACTOIDS = [
  ...ENDINGS.filter((e) => e.kind !== 'bad').map((e) => ({
    id: e.id,
    title: e.title,
    blurb: e.blurb,
    kind: e.kind, // 'good' | 'secret'
    loreId: ENDING_LORE[e.id],
    hint: e.kind === 'secret' ? 'a hidden factoid' : 'reach this tale to discover it',
  })),
  ...AREA_FACTOIDS.map((f) => ({
    id: f.id,
    title: f.title,
    blurb: f.blurb,
    kind: 'area', // earned by exploring a whole region
    loreId: f.lore,
    hint: 'explore this area fully to discover it',
  })),
]
const FATES = ENDINGS.filter((e) => e.kind === 'bad')

const ICON = { good: '🏆', secret: '✨', area: '📜' }

export default function LoreView({ state, dispatch }) {
  const found = state.discoveredEndings || {}
  const [open, setOpen] = useState(null) // id of the expanded factoid
  const got = FACTOIDS.filter((f) => found[f.id]).length
  const fatesGot = FATES.filter((e) => found[e.id]).length

  // discovered first, then locked (secrets/area stay a mystery until earned)
  const ordered = [...FACTOIDS].sort((a, b) => (found[b.id] ? 1 : 0) - (found[a.id] ? 1 : 0))

  return (
    <div className="card endings">
      <div className="endings-head">
        <h3>📜 Lore codex</h3>
        <span className="endings-count">
          {got} / {FACTOIDS.length}
        </span>
      </div>
      <p className="hint">
        A factoid is a piece of Albanian folklore you earn by proving you understood the tale —
        by reaching a good or hidden ending, or by exploring a whole region of the world. Each
        goes deeper, with links to real references. Earning one restores all your hearts.
      </p>

      <div className="ending-list">
        {ordered.map((f) => {
          const seen = !!found[f.id]
          if (!seen) {
            return (
              <div className="ending-row locked" key={f.id}>
                <span className="ending-icon">🔒</span>
                <span className="ending-body">
                  <span className="ending-title">???</span>
                  <span className="ending-blurb">{f.hint}</span>
                </span>
              </div>
            )
          }
          const expanded = open === f.id
          return (
            <div className={'ending-row ' + f.kind} key={f.id}>
              <button
                className="ending-head-row"
                onClick={() => setOpen(expanded ? null : f.id)}
                aria-expanded={expanded}
              >
                <span className="ending-icon">{ICON[f.kind]}</span>
                <span className="ending-body">
                  <span className="ending-title">{f.title}</span>
                  <span className="ending-blurb">{f.blurb}</span>
                </span>
                <span className="ending-kind">{expanded ? '▾' : '▸'}</span>
              </button>
              {expanded && <FactoidLore loreId={f.loreId} dispatch={dispatch} />}
            </div>
          )
        })}
      </div>

      <div className="endings-head fates-head">
        <h3>💀 Fates</h3>
        <span className="endings-count">
          {fatesGot} / {FATES.length}
        </span>
      </div>
      <p className="hint">
        The ways a run can end badly. A fate is game over — you keep your tokens and start again.
      </p>
      <div className="ending-list">
        {[...FATES].sort((a, b) => (found[b.id] ? 1 : 0) - (found[a.id] ? 1 : 0)).map((e) => {
          const seen = !!found[e.id]
          return (
            <div className={'ending-row ' + (seen ? 'bad' : 'locked')} key={e.id}>
              <span className="ending-icon">{seen ? '💀' : '🔒'}</span>
              <span className="ending-body">
                <span className="ending-title">{seen ? e.title : '???'}</span>
                <span className="ending-blurb">{seen ? e.blurb : 'not yet met'}</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
