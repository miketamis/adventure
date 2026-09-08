import { useEffect, useRef } from 'react'
import { calendarAtClock } from '../game/environment.js'

const MONTH = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

const FIDELITY = {
  'source-exact': 'source exact',
  // The source may state an exact number of months while the simulation still
  // has to choose a day-count for those months. Never let an exact source unit
  // make the derived calendar dates look exact too.
  'source-exact-calendar-model': 'source span · modeled dates',
  'source-approximate': 'source gives an approximate span',
  'simulation-approximation': 'calendar estimate',
  'map-derived': 'mapped travel',
  'computed-deadline': 'tale deadline',
  'calendar-exact': 'calendar wait',
  'clock-exact': 'exact modeled clock',
}

const VISUAL_ICON = {
  celebration: '🌿',
  council: '🗣️',
  journey: '🐎',
  war: '⚔️',
  vigil: '🕯️',
  home: '🏠',
  festival: '☀️',
  transformation: '🪽',
}

function formatDate(clock, showYear) {
  const calendar = calendarAtClock(clock)
  const time = String(calendar.hour).padStart(2, '0') + ':00'
  return `${MONTH[calendar.month - 1]} ${calendar.day}${showYear ? `, ${calendar.year}` : ''} · ${time}`
}

function formatElapsed(hours) {
  const days = Math.floor(hours / 24)
  const remainder = hours % 24
  const parts = []
  if (days) parts.push(`${days} ${days === 1 ? 'day' : 'days'}`)
  if (remainder || parts.length === 0) parts.push(`${remainder} ${remainder === 1 ? 'hour' : 'hours'}`)
  return parts.join(', ')
}

function segmentTiming(segments, passage, showYear) {
  const hasCompleteClock = segments.every((segment) => Number.isFinite(segment.hours) && segment.hours >= 0)
  const modeledHours = hasCompleteClock
    ? segments.reduce((sum, segment) => sum + segment.hours, 0)
    : null
  const datesAreExact = modeledHours === passage.elapsedHours
  let elapsed = 0

  return segments.map((segment) => {
    const hours = Number.isFinite(segment.hours) && segment.hours >= 0 ? segment.hours : null
    const fromClock = passage.fromClock + elapsed
    if (hours !== null) elapsed += hours
    const toClock = passage.fromClock + elapsed
    const segmentCrossesYear = calendarAtClock(fromClock).year !== calendarAtClock(toClock).year
    return {
      hours,
      duration: hours > 0 ? formatElapsed(hours) : null,
      dates: datesAreExact && hours > 0
        ? `${formatDate(fromClock, showYear || segmentCrossesYear)} → ${formatDate(toClock, showYear || segmentCrossesYear)}`
        : null,
    }
  })
}

export default function TimePassage({ passage, dispatch }) {
  const continueRef = useRef(null)
  const dialogRef = useRef(null)
  const actionCommitted = useRef(false)
  const segments = Array.isArray(passage.segments) && passage.segments.length > 0
    ? passage.segments
    : [{ label: passage.label, detail: 'Time passes before the next scene.' }]
  const step = Number.isInteger(passage.step) ? passage.step : 0
  const active = segments[Math.min(step, segments.length - 1)]
  const from = calendarAtClock(passage.fromClock)
  const to = calendarAtClock(passage.toClock)
  const isTalePassage = passage.clockKind === 'tale'
  const hasWorldRange = isTalePassage &&
    Number.isFinite(passage.worldFromClock) && Number.isFinite(passage.worldToClock)
  const worldFrom = hasWorldRange ? calendarAtClock(passage.worldFromClock) : null
  const worldTo = hasWorldRange ? calendarAtClock(passage.worldToClock) : null
  const endpointYears = [from, to, worldFrom, worldTo].filter(Boolean).map((date) => date.year)
  const showYear = new Set(endpointYears).size > 1 || from.year !== to.year
  const showWorldYear = showYear || (worldFrom && worldTo && worldFrom.year !== worldTo.year)
  const timings = segmentTiming(segments, passage, showYear)
  const activeTiming = timings[Math.min(step, timings.length - 1)]
  const sourceUrl = /^https?:\/\//.test(passage.source?.url || '') ? passage.source.url : null

  const finish = () => {
    if (actionCommitted.current) return
    actionCommitted.current = true
    dispatch({
      type: 'DISMISS_TIME_PASSAGE',
      passageId: passage.id,
      expectedStep: step,
    })
    window.requestAnimationFrame(() => document.getElementById('story-scene-title')?.focus())
  }
  const advance = () => {
    if (step >= segments.length - 1) finish()
    else {
      if (actionCommitted.current) return
      actionCommitted.current = true
      dispatch({
        type: 'ADVANCE_TIME_PASSAGE',
        passageId: passage.id,
        expectedStep: step,
      })
    }
  }

  useEffect(() => {
    actionCommitted.current = false
    continueRef.current?.focus()
  }, [step])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        finish()
        return
      }
      if (event.key !== 'Tab') return
      const focusable = [...(dialogRef.current?.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ) || [])]
      if (!focusable.length) return
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
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [dispatch, passage.id, step])

  return (
    <div className="time-passage-overlay">
      <section
        ref={dialogRef}
        className="time-passage"
        role="dialog"
        aria-modal="true"
        aria-labelledby="time-passage-title"
        aria-describedby="time-passage-detail"
      >
        <div className="time-passage-sky" aria-hidden="true">
          <span className="time-passage-sun">☀</span>
          <span className="time-passage-moon">●</span>
          <span className="time-passage-ridge ridge-back" />
          <span className="time-passage-ridge ridge-front" />
          <span className="time-passage-sky-caption">days and nights, compressed</span>
        </div>

        <div className="time-passage-body">
          <p className="time-passage-kicker">Koha kalon · Time passes</p>
          <h2 id="time-passage-title">{passage.title}</h2>
          <p className="time-passage-label">{passage.label}</p>

          <div
            className="time-passage-calendar"
            aria-label={isTalePassage ? 'Tale calendar before and after' : 'Living-world calendar before and after'}
          >
            <span><small>{isTalePassage ? 'Tale departure' : 'Departure'}</small>{formatDate(passage.fromClock, showYear)}</span>
            <b aria-hidden="true">→</b>
            <span><small>{isTalePassage ? 'Next tale scene' : 'Next scene'}</small>{formatDate(passage.toClock, showYear)}</span>
          </div>

          {hasWorldRange && (
            <p className="time-passage-world-range">
              <b>Living world:</b>{' '}
              {formatDate(passage.worldFromClock, showWorldYear)} → {formatDate(passage.worldToClock, showWorldYear)}.
              {' '}The tale and living world both advance by this interval; time already spent on a detour is never replayed.
            </p>
          )}

          <ol
            className="time-passage-steps"
            aria-label="What happens while time passes"
            style={{ '--passage-columns': Math.min(segments.length, 3) }}
          >
            {segments.map((segment, index) => (
              <li
                key={`${segment.label}-${index}`}
                className={index === step ? 'active' : index < step ? 'complete' : ''}
                aria-current={index === step ? 'step' : undefined}
              >
                <span>{VISUAL_ICON[segment.visual] || '•'}</span>
                <b>{segment.label}</b>
                {timings[index].duration && <small>{` · ${timings[index].duration}`}</small>}
              </li>
            ))}
          </ol>

          <div className="time-passage-beat" aria-live="polite">
            <div className="time-passage-beat-head">
              <span>{VISUAL_ICON[active.visual] || '•'}</span>
              <b>{active.label}</b>
              {active.fidelity && (
                <small>
                  {active.fidelity === 'clock-exact'
                    ? isTalePassage ? 'tale clock' : 'living-world clock'
                    : FIDELITY[active.fidelity] || active.fidelity}
                </small>
              )}
            </div>
            <p id="time-passage-detail">{active.detail}</p>
            {activeTiming.duration && (
              <p>
                <b>This moment covers:</b> {activeTiming.duration}
                {activeTiming.dates ? ` · ${activeTiming.dates}` : ''}
              </p>
            )}
          </div>

          <div className="time-passage-proof">
            <span>
              <b>{isTalePassage ? 'Tale time represented:' : 'Living-world time represented:'}</b>{' '}
              {formatElapsed(passage.elapsedHours)}
            </span>
            {passage.estimateNote && <span>{passage.estimateNote}</span>}
            {passage.source?.label && (
              sourceUrl
                ? <a href={sourceUrl} target="_blank" rel="noreferrer">Source: {passage.source.label} ↗</a>
                : <span>Source: {passage.source.label}</span>
            )}
          </div>

          <div className="time-passage-actions">
            {segments.length > 1 && step < segments.length - 1 && (
              <button className="btn" onClick={finish}>Skip passage</button>
            )}
            <button ref={continueRef} className="btn primary" onClick={advance}>
              {step < segments.length - 1 ? 'Next moment →' : 'Enter the next scene →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
