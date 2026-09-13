import { useEffect, useRef, useState } from 'react'
import { playActionPhrase } from '../game/audio.js'
import { actionAudioTiming } from '../game/actionAudioTimings.js'

function TimedTranscript({ text, timing, currentTimeMs, completed }) {
  if (!timing?.words?.length) return <span>{text}</span>
  const parts = []
  let cursor = 0
  for (const [index, word] of timing.words.entries()) {
    if (word.charStart > cursor) parts.push(text.slice(cursor, word.charStart))
    const status = completed || currentTimeMs >= word.endMs
      ? 'spoken'
      : currentTimeMs >= word.startMs
        ? 'speaking'
        : 'waiting'
    parts.push(
      <span className={`action-karaoke-word ${status}`} key={`${word.charStart}:${index}`}>
        {text.slice(word.charStart, word.charEnd)}
      </span>,
    )
    cursor = word.charEnd
  }
  if (cursor < text.length) parts.push(text.slice(cursor))
  return parts
}

export default function ActionKaraoke({ action, onComplete, debug = false }) {
  const headingRef = useRef(null)
  const [currentTimeMs, setCurrentTimeMs] = useState(0)
  const [timing, setTiming] = useState(null)
  const [timingStatus, setTimingStatus] = useState('loading')
  const [completed, setCompleted] = useState(false)
  useEffect(() => {
    headingRef.current?.focus()
    let live = true
    const finish = () => {
      if (live) onComplete(action)
    }
    setCurrentTimeMs(0)
    setCompleted(false)
    setTiming(null)
    setTimingStatus('loading')
    void (async () => {
      const exactTiming = await actionAudioTiming(action.al)
      if (!live) return
      setTiming(exactTiming)
      setTimingStatus(exactTiming ? 'aligned' : 'unavailable')
      await playActionPhrase(action.al, {
        onProgress: (_ratio, clock) => {
          if (live && Number.isFinite(clock?.currentTimeMs)) setCurrentTimeMs(clock.currentTimeMs)
        },
      })
      if (live) setCompleted(true)
    })().then(finish, finish)
    return () => { live = false }
  }, [action, onComplete])

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
          <TimedTranscript
            text={action.al}
            timing={timing}
            currentTimeMs={currentTimeMs}
            completed={completed}
          />
        </p>
        {debug && (
          <details className="action-karaoke-debug">
            <summary>Audio alignment · {timingStatus}</summary>
            {timing && (
              <div>
                <p>{timing.method}</p>
                <p>
                  correlation {timing.alignmentCorrelation.toFixed(4)} · offset {timing.alignmentOffsetMs} ms
                  {' · '}{timing.words.length} word boundaries
                </p>
                <ol>
                  {timing.words.map((word) => (
                    <li key={`${word.charStart}:${word.text}`}>
                      <span lang="sq">{word.text}</span>: {word.startMs}–{word.endMs} ms
                      {' · '}syllables {word.syllables.length ? word.syllables.length : 'not emitted'}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </details>
        )}
      </section>
    </div>
  )
}
