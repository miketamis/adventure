import { FOLKLORE } from '../game/folklore.js'

// The lore payload of a factoid: the deeper folklore summary, external reference
// links, and a jump into the in-game library. Shown to ALL players (not just
// debug) when a good/secret factoid — or an area factoid — is earned, and in the
// Lore codex for every factoid already discovered.
export default function FactoidLore({ loreId, dispatch }) {
  const lore = loreId && FOLKLORE.find((f) => f.id === loreId)
  if (!lore) return null
  return (
    <div className="factoid-lore">
      <p className="lore-summary">{lore.summary}</p>
      {lore.sources?.length > 0 && (
        <div className="lore-sources">
          <span className="lore-sources-label">📖 Read more:</span>
          {lore.sources.map((s) => (
            <a key={s.url} className="lore-source" href={s.url} target="_blank" rel="noreferrer">
              {s.label} ↗
            </a>
          ))}
        </div>
      )}
      {dispatch && (
        <button className="btn lore-link" onClick={() => dispatch({ type: 'OPEN_LORE', lore: lore.id })}>
          📚 Open <b>{lore.title}</b> in the library →
        </button>
      )}
    </div>
  )
}
