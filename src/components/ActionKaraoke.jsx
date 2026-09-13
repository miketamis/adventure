import { useEffect, useRef, useState } from 'react'
import { playActionPhrase } from '../game/audio.js'

export default function ActionKaraoke({ action, onComplete }) {
  const headingRef = useRef(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    headingRef.current?.focus()
    let live = true
    const finish = () => {
      if (live) onComplete(action)
    }
    void playActionPhrase(action.al, {
      onProgress: (nextProgress) => {
        if (live) setProgress(nextProgress)
      },
    }).then(finish, finish)
    return () => { live = false }
  }, [action, onComplete])

  const boundedProgress = Math.max(0, Math.min(1, Number(progress) || 0))
  return (
    <div className="action-karaoke-overlay">
      <section
        className="action-karaoke"
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        aria-label={`You say in Albanian: ${action.al}`}
      >
        <span className="action-karaoke-label" ref={headingRef} tabIndex={-1}>You say</span>
        <p lang="sq" aria-hidden="true">
          <span style={{ '--karaoke-progress': `${boundedProgress * 100}%` }}>{action.al}</span>
        </p>
      </section>
    </div>
  )
}
