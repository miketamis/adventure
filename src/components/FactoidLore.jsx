import { useEffect, useState } from 'react'
import { CORPUS, EXTRA_SOURCES, FOLKLORE, HISTORY } from '../game/folklore.js'

const LORE_BY_ID = new Map([...FOLKLORE, ...HISTORY].map((entry) => [entry.id, entry]))
const TALE_MODULES = import.meta.glob('../game/data/tales/[!_]*.js')

function evidenceLinks(lore, taleReferences) {
  if (!lore) return []
  const corpusLinks = CORPUS
    .filter((work) => (work.covers || []).includes(lore.id) || (work.coversHist || []).includes(lore.id))
    .flatMap((work) => (work.online || []).map((source) => ({
      ...source,
      label: `${work.title} — ${source.label}`,
      role: 'corpus work',
    })))
  const combined = [
    ...(lore.sources || []),
    ...(EXTRA_SOURCES[lore.id] || []),
    ...taleReferences,
    ...corpusLinks,
  ]
  const seen = new Set()
  return combined.filter((source) => {
    if (!source?.url || seen.has(source.url)) return false
    seen.add(source.url)
    return true
  })
}

// The lore payload of a factoid: the deeper folklore summary, external reference
// links, and a jump into the in-game library. Shown to ALL players (not just
// debug) when a good/secret factoid — or an area factoid — is earned, and in the
// Lore codex for every factoid already discovered.
export default function FactoidLore({ loreId, dispatch }) {
  const lore = loreId && LORE_BY_ID.get(loreId)
  const [taleReferences, setTaleReferences] = useState([])
  const [taleReferenceOwner, setTaleReferenceOwner] = useState(null)
  const [taleLoadState, setTaleLoadState] = useState('idle')
  const [loadAttempt, setLoadAttempt] = useState(0)

  // Tale bibliographies stay lazy so an ordinary opening scene does not load
  // the full source-beat archive. When a tale card is actually shown, its
  // role-labelled references join the card's direct, supplemental and corpus
  // evidence instead of being hidden in the research console.
  useEffect(() => {
    let current = true
    setTaleReferences([])
    setTaleReferenceOwner(null)
    const load = loreId && TALE_MODULES[`../game/data/tales/${loreId}.js`]
    setTaleLoadState(load ? 'loading' : 'idle')
    load?.().then((module) => {
      if (!current) return
      if (module.default?.id !== loreId) {
        setTaleLoadState('error')
        return
      }
      setTaleReferences((module.default.references || []).map((reference) => ({
        label: reference.citation,
        url: reference.url,
        role: reference.role?.replaceAll('-', ' '),
        note: reference.note,
      })))
      setTaleReferenceOwner(loreId)
      setTaleLoadState('ready')
    }).catch(() => {
      if (current) setTaleLoadState('error')
    })
    return () => { current = false }
  }, [loreId, loadAttempt])

  if (!lore) return null
  const sources = evidenceLinks(lore, taleReferenceOwner === loreId ? taleReferences : [])
  return (
    <div className="factoid-lore" aria-busy={taleLoadState === 'loading'}>
      <p className="lore-summary">{lore.summary}</p>
      {sources.length > 0 && (
        <div className="lore-sources">
          <p className="lore-sources-label">📖 Evidence and further reading</p>
          <ul className="lore-source-list">
            {sources.map((s, index) => {
              const qualification = [s.role, s.note].filter(Boolean).join(' — ')
              const qualificationId = qualification ? `lore-source-${lore.id}-${index}` : undefined
              return (
                <li key={s.url}>
                  <a
                    className="lore-source"
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-describedby={qualificationId}
                  >
                    {s.label} ↗
                  </a>
                  {qualification && <small id={qualificationId}>{qualification}</small>}
                </li>
              )
            })}
          </ul>
        </div>
      )}
      {taleLoadState === 'loading' && <p className="lore-source-status" role="status">Loading the tale-specific bibliography…</p>}
      {taleLoadState === 'error' && (
        <p className="lore-source-status error" role="alert">
          The tale-specific bibliography could not be loaded. The direct and corpus sources above remain available.{' '}
          <button className="btn" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>Retry bibliography</button>
          {' '}<button className="btn" onClick={() => window.location.reload()}>Reload saved game</button>
        </p>
      )}
      {dispatch && (
        <button className="btn lore-link" onClick={() => dispatch({ type: 'OPEN_LORE', lore: lore.id })}>
          📚 Open <b>{lore.title}</b> in the library →
        </button>
      )}
    </div>
  )
}
