import { lazy, Suspense, useReducer, useState, useEffect, useRef, useSyncExternalStore } from 'react'
import {
  currentStoryState,
  loadState,
  reducer,
  saveAchievements,
  saveState,
  timeOfDay,
} from './game/gameState.js'
import { embodimentIdentity, embodimentQuest } from './game/embodiment.js'
import { isMuted, toggleMute, subscribeMute } from './game/audio.js'
import { ACHIEVEMENT_IDS } from './game/achievementRules.js'
import { STORY } from './game/content.js'
import { attachReviewedEnglishReadings } from './game/language.js'
import ReleaseErrorBoundary from './components/ReleaseErrorBoundary.jsx'

// Story is the first and dominant surface. The larger study, collection and
// cartography tools are loaded only when the player asks for them; in
// particular, the source-rich Debug view should not delay an ordinary first
// visit to the bridge.
const StoryView = lazy(() => import('./components/StoryView.jsx'))
const PracticeView = lazy(() => import('./components/PracticeView.jsx'))
const DictionaryView = lazy(() => import('./components/DictionaryView.jsx'))
const AchievementsView = lazy(() => import('./components/AchievementsView.jsx'))
const GuideView = lazy(() => import('./components/GuideView.jsx'))
const AtlasView = lazy(() => import('./components/AtlasView.jsx'))
const DebugView = lazy(() => import('./components/DebugView.jsx'))
const MiniMap = lazy(() => import('./components/MiniMap.jsx'))
// These blocking surfaces are reached only after an authored time jump or
// embodied-tale choice. Keep their sizeable presentation logic out of the
// ordinary opening route and fetch it only when that event actually occurs.
const TimePassage = lazy(() => import('./components/TimePassage.jsx'))
const EmbodimentConfirm = lazy(() => import('./components/EmbodimentConfirm.jsx'))
const BUILD_COMMIT = __BUILD_COMMIT__

const ViewFallback = () => (
  <div className="card view-fallback" role="status" aria-live="polite">Opening this part of the journey…</div>
)

function BlockingModal({ id, title, className = '', onDismiss, returnFocusRef, children, actions }) {
  const dialogRef = useRef(null)
  const headingRef = useRef(null)
  const dismissRef = useRef(onDismiss)
  dismissRef.current = onDismiss

  useEffect(() => {
    const previous = document.activeElement
    headingRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && dismissRef.current) {
        event.preventDefault()
        dismissRef.current()
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
      // React runs this cleanup before the parent has necessarily removed
      // `inert` from .app-main. Restore on the next task so the trigger is
      // focusable again instead of silently dropping focus onto <body>.
      setTimeout(() => {
        const target = returnFocusRef?.current || previous
        if (target?.isConnected) target.focus?.()
      }, 0)
    }
  }, [])

  return (
    <div className="modal-overlay" onMouseDown={() => dismissRef.current?.()}>
      <section
        ref={dialogRef}
        className={`modal ${className}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={id}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h2 id={id} ref={headingRef} tabIndex={-1}>{title}</h2>
        {children}
        <div className="modal-actions">{actions}</div>
      </section>
    </div>
  )
}

// the four phases of the world-day, named in Albanian (they're vocabulary too)
const TIME_UI = {
  dawn: { icon: '🌅', al: 'agim', en: 'dawn' },
  day: { icon: '☀️', al: 'ditë', en: 'day' },
  dusk: { icon: '🌆', al: 'muzg', en: 'dusk' },
  night: { icon: '🌙', al: 'natë', en: 'night' },
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  const [, setReadingCorpusVersion] = useState(0)
  const [confirmReset, setConfirmReset] = useState(false)
  const resetButtonRef = useRef(null)
  // debug mode is unlocked by clicking the title 5× in quick succession
  const titleClicks = useRef(0)
  const titleTimer = useRef(null)
  const onTitleClick = () => {
    titleClicks.current += 1
    clearTimeout(titleTimer.current)
    if (titleClicks.current >= 5) {
      titleClicks.current = 0
      dispatch({ type: 'TOGGLE_DEBUG' })
    } else {
      titleTimer.current = setTimeout(() => { titleClicks.current = 0 }, 1500)
    }
  }
  const muted = useSyncExternalStore(subscribeMute, isMuted)
  // Story sky follows the active tale's own hour. Maps, study tools and every
  // paused/free-roam scene stay on the monotonic living-world clock.
  const displayState = state.view === 'story' ? currentStoryState(state) : state
  const phase = timeOfDay(displayState)
  const timeUi = TIME_UI[phase]
  const activeQuest = embodimentQuest(state.embodying)
  const activeIdentity = embodimentIdentity(state)
  const blockingOverlay = Boolean(
    state.timePassage || state.pendingEmbodiment || state.hearts <= 0 || confirmReset,
  )
  // The full editorial reading corpus is substantial and does not need to
  // delay the first interactive scene. Load it just after mount, validate every
  // address/source pair, then rerender against the attached natural readings.
  useEffect(() => {
    let live = true
    import('./game/data/readings/reviewedReadings.js').then(({ REVIEWED_READINGS }) => {
      attachReviewedEnglishReadings(STORY, REVIEWED_READINGS)
      if (live) setReadingCorpusVersion((version) => version + 1)
    }).catch((error) => {
      // Keep the conservative, visibly labelled reading aid available if the
      // optional chunk fails; a stale corpus remains a hard development error.
      console.error('Could not load the reviewed English reading corpus.', error)
    })
    return () => { live = false }
  }, [])
  // tint the whole sky (the page background) to the hour
  useEffect(() => {
    for (const p of Object.keys(TIME_UI)) document.body.classList.remove('time-' + p)
    document.body.classList.add('time-' + phase)
  }, [phase])
  // the tab badge counts UNLOCKED achievements (gate passed), not the bad "fates"
  const achievementsGot = ACHIEVEMENT_IDS.filter((id) => state.earned?.[id]).length

  // persist the whole state every change — reloading resumes exactly where you were
  useEffect(() => {
    saveState(state)
  }, [state])

  // also keep the achievement collection under its own durable key
  useEffect(() => {
    saveAchievements(state)
  }, [state.earned, state.eligible, state.attempts])

  const setView = (view) => dispatch({ type: 'SET_VIEW', view })
  const tab = (view, label) => (
    <button
      type="button"
      className={'btn' + (state.view === view ? ' active' : '')}
      onClick={() => setView(view)}
      aria-current={state.view === view ? 'page' : undefined}
    >
      {label}
    </button>
  )

  return (
    <div className="app">
      <div
        className="app-main"
        inert={blockingOverlay ? '' : undefined}
        aria-hidden={blockingOverlay ? 'true' : undefined}
      >
      <a className="skip-link" href="#main-content">Skip to current view</a>
      <header className="topbar">
        <h1 className="title" onClick={onTitleClick} title="Aventura Shqip">
          Aventura Shqip <small>· learn Albanian</small>
        </h1>
        {state.debug && (
          <span
            className="stat debug-badge"
            title={`Debug mode is on — build commit ${BUILD_COMMIT}. Click the title 5× to turn it off.`}
          >
            🛠 debug · <code>{BUILD_COMMIT.slice(0, 12)}</code>
          </span>
        )}
        {activeQuest && (
          <button
            className="stat embody-badge"
            title="Return to your current character and next purpose"
            onClick={() => {
              dispatch({ type: 'SET_VIEW', view: 'story' })
              requestAnimationFrame(() => {
                const focus = document.getElementById('embodiment-focus')
                const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
                focus?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' })
                focus?.focus()
              })
            }}
          >
            🎭 {activeQuest.stance === 'companion' ? 'with ' : 'as '}{activeIdentity}
          </button>
        )}
        {state.debug && <span className="stat">turn <b>{state.turn}</b></span>}
        {activeQuest ? (
          <span className="stat" title="Your traveller's pack and purse return when this character tale ends">🎒 pack waiting</span>
        ) : state.debug ? (
          <span
            className="stat tip-host clickable"
            onClick={() => dispatch({ type: 'DEBUG_LEK' })}
            role="button"
          >
            🪙 <b>{state.inventory.lek || 0}</b>
            <span className="tooltip stat-tip">
              <b>🪙 Lek</b> — the money in your purse. Earn it with work: the mill, the flock,
              mountain tea, a song on the lahuta. Spend it at the market, the inn and the
              healer. Debug: click to add 20.
            </span>
          </span>
        ) : null}
        {/* the hour is told IN the story (phase lines + sky tint), not by a chip;
            debug keeps the chip because clicking it is the time-skip tool */}
        {state.debug && (
          <span
            className={'stat tip-host time-stat time-' + phase + ' clickable'}
            onClick={() => dispatch({ type: 'DEBUG_TIME', clockDomain: state.view === 'story' ? 'scene' : 'world' })}
            role="button"
          >
            {timeUi.icon} <b>{timeUi.al}</b>
            <span className="tooltip stat-tip">
              <b>{timeUi.icon} Koha</b> — it is <b>{timeUi.en}</b> ({timeUi.al}). The hour drifts
              as you take turns; sleeping or waiting jumps it. Some paths and scenes only exist
              at certain hours. Debug: click to skip to the next phase.
            </span>
          </span>
        )}
        {/* your health is told IN the story (the hearts line + its once-per-level
            self-heal live in StoryView), not by a chip; debug keeps the chip
            because clicking it is the take-a-hit testing tool */}
        {state.debug && (
          <span
            className="stat hearts clickable"
            onClick={() => dispatch({ type: 'DEBUG_HURT' })}
            role="button"
            title="Hearts — the story tells your health now. Debug: click to lose one."
          >
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className={'heart' + (i < state.hearts ? ' full' : '')}>
                ♥
              </span>
            ))}
          </span>
        )}
        <button
          className={'btn' + (muted ? ' active' : '')}
          onClick={toggleMute}
          title={muted ? 'Word audio off — click to unmute' : 'Word audio on — click to mute'}
          aria-pressed={muted}
        >
          {muted ? '🔇 muted' : '🔊 sound'}
        </button>
        <button
          ref={resetButtonRef}
          className="btn"
          onClick={() => setConfirmReset(true)}
          disabled={Boolean(activeQuest && state.hearts > 0)}
          title={activeQuest ? `Finish ${activeIdentity}'s tale before starting another run` : 'Start a new run'}
        >
          ⟳ new run
        </button>
      </header>

      <nav className="tabs" aria-label="Game sections">
        {tab('story', '📖 Story')}
        {tab('practice', '🎯 Train')}
        {tab('dictionary', '📚 Dictionary')}
        {state.debug && tab('map', '🗺 Map')}
        {tab('endings', `🏆 Achievements (${achievementsGot}/${ACHIEVEMENT_IDS.length})`)}
        {tab('guide', '❔ Guide')}
        {state.debug && tab('debug', '🛠 Debug')}
      </nav>

      <main id="main-content" tabIndex={-1}>
      {state.view === 'story' && state.turn <= 2 && !activeQuest && (
        <section className="onboarding-banner" aria-label="First steps">
          <span>
            <b>First steps:</b> activate an English word to reveal its Albanian form, then use
            Train to earn the word-token a path needs.
          </span>
          <button className="btn" onClick={() => setView('guide')}>Open the guide →</button>
        </section>
      )}

      <ReleaseErrorBoundary
        resetKey={state.view}
        onLeave={() => setView(state.view === 'story' ? 'guide' : 'story')}
        leaveLabel={state.view === 'story' ? 'Open the guide' : 'Return to the story'}
      >
        <Suspense fallback={<ViewFallback />}>
          {state.view === 'story' && <StoryView state={state} dispatch={dispatch} />}
          {state.view === 'practice' && <PracticeView state={state} dispatch={dispatch} />}
          {state.view === 'dictionary' && <DictionaryView state={state} dispatch={dispatch} />}
          {state.debug && state.view === 'map' && <AtlasView state={state} />}
          {state.view === 'endings' && <AchievementsView state={state} dispatch={dispatch} />}
          {state.view === 'guide' && <GuideView />}
          {state.debug && state.view === 'debug' && <DebugView state={state} dispatch={dispatch} />}

          {/* debug minimap: the world map docked right, expandable to full screen.
              Hidden on the Debug tab, where the same map already fills the page. */}
          {state.debug && state.view !== 'debug' && <MiniMap state={state} dispatch={dispatch} />}
        </Suspense>
      </ReleaseErrorBoundary>
      </main>

      </div>

      {state.hearts <= 0 && !state.timePassage && !state.pendingEmbodiment && (
        <BlockingModal
          id="gameover-title"
          title="💔 Game over"
          className="gameover"
          actions={(
            <button
              className="btn primary"
              onClick={() => {
                dispatch({ type: 'RESET' })
                window.requestAnimationFrame(() => document.getElementById('story-scene-title')?.focus())
              }}
            >
              ⟳ Start again
            </button>
          )}
        >
          <p>You ran out of hearts. This run is over.</p>
          <p>
            You <b>keep all your training tokens</b> (◆). Start again from the beginning of
            the story — every word will need rediscovering.
          </p>
        </BlockingModal>
      )}

      {confirmReset && state.hearts > 0 && !state.timePassage && !state.pendingEmbodiment && (
        <BlockingModal
          id="new-run-title"
          title="Start a new run?"
          onDismiss={() => setConfirmReset(false)}
          returnFocusRef={resetButtonRef}
          actions={(
            <>
              <button className="btn" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
              <button
                className="btn primary"
                onClick={() => {
                  dispatch({ type: 'RESET' })
                  setConfirmReset(false)
                }}
              >
                ⟳ New run
              </button>
            </>
          )}
        >
          <p>
            You go back to the <b>start of the story</b>, and every word becomes
            <b> undiscovered</b> again.
          </p>
          <p>
            You <b>keep all your training tokens</b> (◆) — but you can&apos;t spend them
            until you rediscover those words.
          </p>
        </BlockingModal>
      )}

      <Suspense fallback={<div className="card view-fallback" role="status">Preparing the next story beat…</div>}>
        {state.timePassage && (
          <TimePassage key={state.timePassage.id} passage={state.timePassage} dispatch={dispatch} />
        )}
        {state.pendingEmbodiment && !state.timePassage && (
          <EmbodimentConfirm pending={state.pendingEmbodiment} dispatch={dispatch} />
        )}
      </Suspense>
    </div>
  )
}
