import { useEffect, useRef, useState } from 'react'
import { embodimentQuest } from '../game/embodiment.js'

const TALE_MODULES = import.meta.glob('../game/data/tales/[!_]*.js')

export default function EmbodimentConfirm({ pending, dispatch }) {
  const headingRef = useRef(null)
  const dialogRef = useRef(null)
  const [tale, setTale] = useState(null)
  const [loadState, setLoadState] = useState('loading')
  const [loadAttempt, setLoadAttempt] = useState(0)
  const quest = embodimentQuest(pending?.taleId)
  const taleReady = loadState === 'ready' && tale?.id === pending?.taleId
  const play = taleReady ? tale.play || null : null

  // The complete source-beat library is intentionally large. Load it only
  // when a character threshold actually opens instead of making every new
  // player download the research archive at the opening bridge.
  useEffect(() => {
    let current = true
    setTale(null)
    setLoadState('loading')
    if (pending?.taleId) {
      const load = TALE_MODULES[`../game/data/tales/${pending.taleId}.js`]
      if (!load) setLoadState('error')
      else load().then((module) => {
        if (!current) return
        const loaded = module.default || null
        const matchesRequest = loaded?.id === pending.taleId
        setTale(matchesRequest ? loaded : null)
        setLoadState(matchesRequest ? 'ready' : 'error')
      }).catch(() => {
        if (current) setLoadState('error')
      })
    }
    return () => { current = false }
  }, [pending?.taleId, loadAttempt])

  useEffect(() => {
    const previous = document.activeElement
    headingRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        dispatch({ type: 'CANCEL_EMBODIMENT' })
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [...(dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) || [])]
      if (!focusable.length) {
        event.preventDefault()
        headingRef.current?.focus()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      // The app underneath is inert until this dialog unmounts. Defer focus
      // restoration so browsers do not discard it while the trigger is inert.
      setTimeout(() => {
        if (previous?.isConnected) previous.focus?.()
      }, 0)
    }
  }, [dispatch])

  if (!quest) return null
  const verb = quest.stance === 'companion' ? 'Join this tale' : `Become ${quest.identity}`
  const situation = play?.enter || `The tale begins when you ${quest.objective}.`
  const taleReferences = tale?.references || []

  return (
    <div className="modal-overlay embodiment-overlay" onMouseDown={() => dispatch({ type: 'CANCEL_EMBODIMENT' })}>
      <section
        ref={dialogRef}
        className="modal embodiment-confirm"
        role="dialog"
        aria-modal="true"
        aria-busy={loadState === 'loading'}
        aria-labelledby="embodiment-confirm-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="embodiment-kicker">🎭 Character tale</div>
        <h2 id="embodiment-confirm-title" ref={headingRef} tabIndex={-1}>{verb}?</h2>
        {taleReady && tale.title && <p className="embodiment-tale-title">{tale.title}</p>}
        <p>You are about to step into the role of <b>{quest.identity}</b>: {situation}.</p>
        <p className="embodiment-first-objective"><b>First purpose:</b> {quest.objective}.</p>
        {loadState === 'loading' && <p className="embodiment-load" role="status">Loading this tale and its source record…</p>}
        {taleReady && <p className="embodiment-load ready" role="status">Tale and source record ready.</p>}
        {loadState === 'error' && (
          <div className="embodiment-load error" role="alert">
            <span>This tale and its sources could not be loaded. Your role has not begun.</span>
            <button className="btn" onClick={() => setLoadAttempt((attempt) => attempt + 1)}>Retry loading</button>
            <button className="btn" onClick={() => window.location.reload()}>Reload saved game</button>
          </div>
        )}
        <div className="embodiment-rule">
          <b>This role lasts until this tale reaches an ending.</b>
          <span>You may explore the public roads and places, but tale-only scenes, endings, unrelated actions, and other character roles remain locked. Your next purpose will remain visible. When you step out, the waiting scene's hour, arrival, and conditions freeze while the living world continues; stepping back in restores that exact scene.</span>
          <span>Your traveller's pack and health wait outside. The character begins at full role health with only belongings granted inside this tale; a surviving ending restores your exact traveller pack and health.</span>
        </div>
        {taleReady && taleReferences.length > 0 && (
          <details className="embodiment-sources">
            <summary>
              Sources for this tale ({taleReferences.length})
            </summary>
            <ul>
              {taleReferences.map((reference) => (
                <li key={reference.url}>
                  <a href={reference.url} target="_blank" rel="noreferrer">{reference.citation} ↗</a>
                  <small>{reference.role.replaceAll('-', ' ')}</small>
                </li>
              ))}
            </ul>
          </details>
        )}
        <p className="embodiment-commit-note">No words or tokens are spent until you confirm.</p>
        <div className="modal-actions">
          <button className="btn" onClick={() => dispatch({ type: 'CANCEL_EMBODIMENT' })}>Cancel</button>
          <button
            className="btn primary"
            disabled={!taleReady}
            title={!taleReady ? 'Wait for this tale and its sources to load' : undefined}
            onClick={() => dispatch({ type: 'CONFIRM_EMBODIMENT' })}
          >
            🎭 {verb}
          </button>
        </div>
      </section>
    </div>
  )
}
