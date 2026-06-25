import { ENDINGS } from '../game/content.js'

const KIND_LABEL = { good: 'good', bad: 'bad', secret: 'secret' }

// The player's long-term collection: every ending they have ever reached.
export default function EndingsView({ state }) {
  const found = state.discoveredEndings || {}
  const total = ENDINGS.length
  const got = ENDINGS.filter((e) => found[e.id]).length

  // discovered first, then locked; secrets always shown locked-as-mystery
  const ordered = [...ENDINGS].sort((a, b) => (found[b.id] ? 1 : 0) - (found[a.id] ? 1 : 0))

  return (
    <div className="card endings">
      <div className="endings-head">
        <h3>Discovered endings</h3>
        <span className="endings-count">
          {got} / {total}
        </span>
      </div>
      <div className="ending-list">
        {ordered.map((e) => {
          const seen = !!found[e.id]
          if (!seen) {
            return (
              <div className="ending-row locked" key={e.id}>
                <span className="ending-icon">🔒</span>
                <span className="ending-body">
                  <span className="ending-title">???</span>
                  <span className="ending-blurb">{e.kind === 'secret' ? 'a hidden ending' : 'not yet reached'}</span>
                </span>
              </div>
            )
          }
          return (
            <div className={'ending-row ' + e.kind} key={e.id}>
              <span className="ending-icon">{e.kind === 'good' ? '🏆' : e.kind === 'secret' ? '✨' : '💀'}</span>
              <span className="ending-body">
                <span className="ending-title">{e.title}</span>
                <span className="ending-blurb">{e.blurb}</span>
              </span>
              <span className={'ending-kind ' + e.kind}>{KIND_LABEL[e.kind]}</span>
            </div>
          )
        })}
      </div>
      <p className="hint">
        Reach an ending — good or bad — and it's added to your collection forever. Some are
        hidden, and a few can only be reached by using the right item at the right moment.
      </p>
    </div>
  )
}
