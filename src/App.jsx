import { lazy, Suspense, useCallback, useState, useEffect, useRef, useSyncExternalStore } from 'react'
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
import BlockingModal from './components/BlockingModal.jsx'
import AnalyticsPreferencesModal from './components/AnalyticsPreferencesModal.jsx'
import PlaytestFeedbackModal from './components/PlaytestFeedbackModal.jsx'
import {
  captureConsentPageview,
  captureEvent,
  getAnalyticsConsent,
  getAnalyticsSessionId,
  initializePostHog,
  setAnalyticsConsent,
  subscribeAnalyticsConsent,
} from './analytics.js'
import {
  captureCommittedTransition,
  captureRunCheckpoint,
  captureSurfacePresented,
  reserveCommittedTransitionSequence,
} from './game/playtestAnalytics.js'
import { measurePerformanceOperation } from './performance.js'

// Story is the first and dominant surface. The larger study, collection and
// cartography tools are loaded only when they are opened; the collection and
// guide are debug-only for now, and none of these secondary surfaces should
// delay an ordinary first visit to the bridge.
const StoryView = lazy(() => import('./components/StoryView.jsx'))
const loadHeartConsequenceModal = () => import('./components/HeartConsequenceModal.jsx')
// A Train miss must paint its complete blocking feedback inside the answer
// interaction. Load that small surface alongside the much larger Train route,
// so answer controls never become available while their miss UI is still on
// the network or waiting to be evaluated.
const loadPracticeView = async () => {
  const [practiceModule] = await Promise.all([
    import('./components/PracticeView.jsx'),
    loadHeartConsequenceModal(),
  ])
  return practiceModule
}
const PracticeView = lazy(loadPracticeView)
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
const ActionKaraoke = lazy(() => import('./components/ActionKaraoke.jsx'))
// Story keeps this consequence surface lazy; the Train route above primes it
// before presenting any answer controls.
const HeartConsequenceModal = lazy(loadHeartConsequenceModal)
const BUILD_COMMIT = __BUILD_COMMIT__
const SPOKEN_ACTION_TYPES = ['CHOOSE', 'CONFUSE', 'USE_ITEM', 'HEAL', 'CONFIRM_EMBODIMENT']
const FEEDBACK_MINIMUM_ENGAGED_MINUTES = 5
const FEEDBACK_MINIMUM_MEANINGFUL_ACTIONS = 12
const FEEDBACK_STATUS_KEY = `aventura.playtest-feedback.v1:${BUILD_COMMIT}`

const reduceWithTiming = (state, action) => measurePerformanceOperation(
  'reducer',
  action?.type || 'unknown-action',
  state?.view || 'unknown',
  () => reducer(state, action),
)

const ViewFallback = () => (
  <div className="card view-fallback" role="status" aria-live="polite">Opening the journey…</div>
)

// the four phases of the world-day, named in Albanian (they're vocabulary too)
const TIME_UI = {
  dawn: { icon: '🌅', al: 'agim', en: 'dawn' },
  day: { icon: '☀️', al: 'ditë', en: 'day' },
  dusk: { icon: '🌆', al: 'muzg', en: 'dusk' },
  night: { icon: '🌙', al: 'natë', en: 'night' },
}

const feedbackStatus = () => {
  try {
    return localStorage.getItem(FEEDBACK_STATUS_KEY) || 'unseen'
  } catch {
    return 'unseen'
  }
}

const saveFeedbackStatus = (status) => {
  try {
    localStorage.setItem(FEEDBACK_STATUS_KEY, status)
  } catch {
    /* optional feedback must never block play */
  }
}

function useEngagedMinutes() {
  const [minutes, setMinutes] = useState(0)
  useEffect(() => {
    let accumulatedMs = 0
    let lastTick = Date.now()
    let lastActivity = lastTick
    const active = () => { lastActivity = Date.now() }
    const tick = () => {
      const now = Date.now()
      if (document.visibilityState === 'visible' && now - lastActivity <= 60_000) {
        accumulatedMs += Math.max(0, now - lastTick)
      }
      lastTick = now
      setMinutes(Math.floor(accumulatedMs / 60_000))
    }
    const interval = window.setInterval(tick, 10_000)
    for (const eventName of ['pointerdown', 'keydown', 'scroll', 'touchstart']) {
      window.addEventListener(eventName, active, { passive: true })
    }
    document.addEventListener('visibilitychange', tick)
    return () => {
      window.clearInterval(interval)
      for (const eventName of ['pointerdown', 'keydown', 'scroll', 'touchstart']) {
        window.removeEventListener(eventName, active)
      }
      document.removeEventListener('visibilitychange', tick)
    }
  }, [])
  return minutes
}

const IDLE_PERSISTENCE_TIMEOUT_MS = 750
const FALLBACK_PERSISTENCE_DELAY_MS = 50

// Storage is durable but synchronous. Keep JSON serialization and localStorage
// writes out of the click-to-paint path, coalesce bursts of state changes, and
// flush immediately when the document is leaving or becoming hidden.
function useDeferredPersistence(state) {
  const latestState = useRef(state)
  const latestAchievements = useRef(state)
  const gameStateDirty = useRef(false)
  const achievementsDirty = useRef(false)
  const pending = useRef(null)
  latestState.current = state
  latestAchievements.current = state

  const flush = useCallback(() => {
    const current = latestState.current
    if (gameStateDirty.current) {
      gameStateDirty.current = false
      measurePerformanceOperation('persistence', 'game-state', current.view, () => saveState(current))
    }
    if (achievementsDirty.current) {
      achievementsDirty.current = false
      measurePerformanceOperation(
        'persistence',
        'achievements',
        current.view,
        () => saveAchievements(latestAchievements.current),
      )
    }
  }, [])

  const cancelPending = useCallback(() => {
    if (!pending.current) return
    const scheduled = pending.current
    pending.current = null
    if (scheduled.kind === 'idle') window.cancelIdleCallback?.(scheduled.id)
    else window.clearTimeout(scheduled.id)
  }, [])

  const flushNow = useCallback(() => {
    cancelPending()
    flush()
  }, [cancelPending, flush])

  const schedule = useCallback(() => {
    if (pending.current) return
    const run = () => {
      pending.current = null
      flush()
    }
    if (typeof window.requestIdleCallback === 'function') {
      pending.current = {
        kind: 'idle',
        id: window.requestIdleCallback(run, { timeout: IDLE_PERSISTENCE_TIMEOUT_MS }),
      }
    } else {
      pending.current = {
        kind: 'timeout',
        id: window.setTimeout(run, FALLBACK_PERSISTENCE_DELAY_MS),
      }
    }
  }, [flush])

  const queueAcceptedState = useCallback((nextState) => {
    const previousAchievements = latestAchievements.current
    latestState.current = nextState
    latestAchievements.current = nextState
    gameStateDirty.current = true
    if (
      nextState.earned !== previousAchievements.earned ||
      nextState.eligible !== previousAchievements.eligible ||
      nextState.attempts !== previousAchievements.attempts ||
      nextState.achievementReadings !== previousAchievements.achievementReadings
    ) {
      achievementsDirty.current = true
    }
    schedule()
  }, [schedule])

  useEffect(() => {
    gameStateDirty.current = true
    schedule()
  }, [state, schedule])

  useEffect(() => {
    achievementsDirty.current = true
    schedule()
  }, [state.earned, state.eligible, state.attempts, state.achievementReadings, schedule])

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') flushNow()
    }
    window.addEventListener('pagehide', flushNow)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.removeEventListener('pagehide', flushNow)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      flushNow()
    }
  }, [flushNow])

  return queueAcceptedState
}

// Replay-safe transition records hash and sanitize a deliberately broad state
// projection. Preserve that evidence, its order and its unload flush without
// making the learner's click wait for work that is invisible to the response.
function useDeferredTransitionAnalytics() {
  const queued = useRef([])
  const scheduled = useRef(false)

  const flush = useCallback(() => {
    scheduled.current = false
    const transitions = queued.current.splice(0)
    for (const { action, before, after, sequence } of transitions) {
      measurePerformanceOperation(
        'analytics',
        'committed-transition',
        after.view,
        () => captureCommittedTransition(action, before, after, sequence),
      )
    }
  }, [])

  const schedule = useCallback(() => {
    if (scheduled.current) return
    scheduled.current = true
    window.requestAnimationFrame(() => {
      // A task queued from the animation frame runs after the accepted state
      // has had its paint opportunity, outside the input-to-feedback path.
      window.setTimeout(flush, 0)
    })
  }, [flush])

  const queueTransition = useCallback((action, before, after) => {
    // Reserve the sequence synchronously so later surface events observe the
    // accepted transition's canonical order even though its expensive state
    // hashing and sanitization run after paint.
    const sequence = reserveCommittedTransitionSequence(action, before, after)
    queued.current.push({ action, before, after, sequence })
    schedule()
  }, [schedule])

  useEffect(() => {
    const flushNow = () => flush()
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') flushNow()
    }
    window.addEventListener('pagehide', flushNow)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      window.removeEventListener('pagehide', flushNow)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      flushNow()
    }
  }, [flush])

  return queueTransition
}

export default function App() {
  // Every public dispatch is validated below before it reaches React. Publish
  // that already-computed state directly so a button never pays for the full
  // game reducer a second time during React's render phase.
  const [state, publishState] = useState(loadState)
  const stateRef = useRef(state)
  stateRef.current = state
  const analyticsConsent = useSyncExternalStore(
    subscribeAnalyticsConsent,
    getAnalyticsConsent,
    getAnalyticsConsent,
  )
  const [analyticsPreferencesOpen, setAnalyticsPreferencesOpen] = useState(false)
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackTrigger, setFeedbackTrigger] = useState('manual')
  const [feedbackPromptStatus, setFeedbackPromptStatus] = useState(feedbackStatus)
  const engagedMinutes = useEngagedMinutes()
  const engagedMinutesRef = useRef(engagedMinutes)
  engagedMinutesRef.current = engagedMinutes
  const [actionTransition, setActionTransition] = useState(null)
  const actionTransitionRef = useRef(null)
  const queueStatePersistence = useDeferredPersistence(state)
  const queueTransitionAnalytics = useDeferredTransitionAnalytics()
  const commitAcceptedAction = useCallback((action, before, after) => {
    if (after === before) return false
    queueStatePersistence(after)
    publishState(after)
    // React may batch consecutive actions. Keep the imperative validation
    // boundary aligned with the reducer state that was just accepted.
    stateRef.current = after
    queueTransitionAnalytics(action, before, after)
    return true
  }, [queueStatePersistence, queueTransitionAnalytics])
  const dispatch = useCallback((action) => {
    // Keep the current scene visible while the accepted Albanian action plays.
    // The reducer remains the authority for validity: only an action whose
    // preview emits a new committed-speech event receives this transition.
    if (actionTransitionRef.current) return
    if (!SPOKEN_ACTION_TYPES.includes(action?.type)) {
      const current = stateRef.current
      commitAcceptedAction(action, current, reduceWithTiming(current, action))
      return
    }
    const current = stateRef.current
    const preview = reduceWithTiming(current, action)
    const event = preview !== current && preview.actionSpeech?.id !== current.actionSpeech?.id
      ? preview.actionSpeech
      : null
    if (!event?.al) {
      commitAcceptedAction(action, current, preview)
      return
    }
    const transition = { id: event.id, al: event.al, action }
    actionTransitionRef.current = transition
    setActionTransition(transition)
  }, [commitAcceptedAction])
  const finishActionTransition = useCallback((transition) => {
    if (actionTransitionRef.current?.id !== transition.id) return
    // Nothing else can dispatch while the overlay is active, so the same
    // action is still valid against the unchanged source scene.
    const current = stateRef.current
    commitAcceptedAction(transition.action, current, reduceWithTiming(current, transition.action))
    actionTransitionRef.current = null
    setActionTransition(null)
  }, [commitAcceptedAction])
  const [readingCorpusReady, setReadingCorpusReady] = useState(false)
  const readingCorpusPromise = useRef(null)
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
  const gameBlockingOverlay = Boolean(
    state.pendingHeartConsequence || state.timePassage || state.pendingEmbodiment ||
    state.hearts <= 0 || confirmReset || actionTransition,
  )
  const blockingOverlay = gameBlockingOverlay || analyticsPreferencesOpen || feedbackOpen
  const meaningfulActions = Math.max(0, Number(state.turn || 1) - 1) +
    Number(state.trainRound || 0) + Object.keys(state.discovered || {}).length

  useEffect(() => {
    if (!analyticsConsent.structured && !analyticsConsent.replay) return undefined
    void initializePostHog()
    if (!analyticsConsent.structured) return undefined
    const analyticsSessionId = getAnalyticsSessionId()
    captureConsentPageview()
    captureEvent('playtest_session_started', {
      game_run_id: `${analyticsSessionId}:run-${stateRef.current.storyRunSequence || 1}`,
      story_run_sequence: stateRef.current.storyRunSequence,
      node_id: stateRef.current.nodeId,
      view: stateRef.current.view,
      turn: stateRef.current.turn,
    }, { receipt: `session-start:${analyticsSessionId}` })
    captureRunCheckpoint(stateRef.current, 'session-start')
    const finishSession = () => captureEvent('playtest_session_ended', {
      game_run_id: `${analyticsSessionId}:run-${stateRef.current.storyRunSequence || 1}`,
      story_run_sequence: stateRef.current.storyRunSequence,
      node_id: stateRef.current.nodeId,
      view: stateRef.current.view,
      turn: stateRef.current.turn,
      engaged_minutes: engagedMinutesRef.current,
      meaningful_actions: Math.max(0, Number(stateRef.current.turn || 1) - 1) +
        Number(stateRef.current.trainRound || 0) + Object.keys(stateRef.current.discovered || {}).length,
    }, { receipt: `session-end:${analyticsSessionId}`, sendInstantly: true })
    window.addEventListener('pagehide', finishSession)
    return () => window.removeEventListener('pagehide', finishSession)
  }, [analyticsConsent.replay, analyticsConsent.structured])

  useEffect(() => {
    captureSurfacePresented(state)
  }, [analyticsConsent.structured, state.view, state.nodeId, state.turn, state.trainRound, state.storyRunSequence])

  useEffect(() => {
    if (!analyticsConsent.structured || analyticsPreferencesOpen || gameBlockingOverlay || feedbackOpen) return
    if (feedbackPromptStatus !== 'unseen' || state.view !== 'story') return
    if (engagedMinutes < FEEDBACK_MINIMUM_ENGAGED_MINUTES || meaningfulActions < FEEDBACK_MINIMUM_MEANINGFUL_ACTIONS) return
    setFeedbackTrigger('milestone')
    setFeedbackOpen(true)
    setFeedbackPromptStatus('prompted')
    saveFeedbackStatus('prompted')
    captureEvent('playtest_feedback_prompted', {
      trigger: 'milestone',
      engaged_minutes: engagedMinutes,
      meaningful_actions: meaningfulActions,
      view: state.view,
      node_id: state.nodeId,
      turn: state.turn,
    }, { receipt: `feedback-prompt:${BUILD_COMMIT}` })
  }, [
    analyticsConsent.structured,
    analyticsPreferencesOpen,
    gameBlockingOverlay,
    feedbackOpen,
    feedbackPromptStatus,
    state.view,
    state.nodeId,
    state.turn,
    engagedMinutes,
    meaningfulActions,
  ])
  // Load reviewed answer metadata before offering any reading check. Ordinary
  // story prose still hides English; loading Debug must not change an open
  // check's questions or invalidate the answers already shown to the learner.
  const needsReadingCorpus = state.debug || ACHIEVEMENT_IDS.some((id) =>
    state.eligible?.[id] && !state.earned?.[id])
  useEffect(() => {
    if (!needsReadingCorpus) return undefined
    let live = true
    if (!readingCorpusPromise.current) {
      readingCorpusPromise.current = Promise.all([
        import('./game/data/readings/reviewedReadings.js')
          .then(({ REVIEWED_READINGS }) => attachReviewedEnglishReadings(STORY, REVIEWED_READINGS)),
        import('./game/npcAppearanceRegistry.js'),
      ])
        .catch((error) => {
          readingCorpusPromise.current = null
          throw error
        })
    }
    readingCorpusPromise.current.then(() => {
      if (live) setReadingCorpusReady(true)
    }).catch((error) => {
      if (live) console.error('Could not load the reviewed English reading corpus.', error)
    })
    return () => { live = false }
  }, [needsReadingCorpus])
  // tint the whole sky (the page background) to the hour
  useEffect(() => {
    for (const p of Object.keys(TIME_UI)) document.body.classList.remove('time-' + p)
    document.body.classList.add('time-' + phase)
  }, [phase])
  // the tab badge counts UNLOCKED achievements (gate passed), not the bad "fates"
  const achievementsGot = ACHIEVEMENT_IDS.filter((id) => state.earned?.[id]).length

  const setView = (view) => dispatch({ type: 'SET_VIEW', view })
  const tab = (view, label) => (
    <button
      type="button"
      className={'btn' + (state.view === view ? ' active' : '')}
      data-performance-id={`tab:${view}`}
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
      <header className="topbar" data-performance-surface="header">
        <h1 className="title" data-performance-id="debug-toggle" onClick={onTitleClick} title="Aventura Shqip">
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
          data-performance-id="sound-toggle"
          onClick={toggleMute}
          title={muted ? 'Word audio off — click to unmute' : 'Word audio on — click to mute'}
          aria-pressed={muted}
        >
          {muted ? '🔇 muted' : '🔊 sound'}
        </button>
        <button
          type="button"
          className="btn"
          data-performance-id="feedback-open"
          onClick={() => {
            if (!analyticsConsent.structured) {
              setAnalyticsPreferencesOpen(true)
              return
            }
            setFeedbackTrigger('manual')
            setFeedbackOpen(true)
          }}
          title={analyticsConsent.structured
            ? 'Share a short anonymous playtest rating'
            : 'Anonymous feedback requires gameplay-research consent'}
        >
          💬 feedback
        </button>
        <button
          type="button"
          className="btn"
          data-performance-id="privacy-open"
          onClick={() => setAnalyticsPreferencesOpen(true)}
          title="Choose anonymous analytics and replay preferences"
        >
          🔒 privacy
        </button>
        <button
          ref={resetButtonRef}
          className="btn"
          data-performance-id="new-run-open"
          onClick={() => setConfirmReset(true)}
          disabled={Boolean(activeQuest && state.hearts > 0)}
          title={activeQuest ? `Finish ${activeIdentity}'s tale before starting another run` : 'Start a new run'}
        >
          ⟳ new run
        </button>
      </header>

      <nav className="tabs" aria-label="Game sections" data-performance-surface="navigation">
        {tab('story', '📖 Story')}
        {tab('practice', '🎯 Train')}
        {tab('dictionary', '📚 Dictionary')}
        {state.debug && tab('map', '🗺 Map')}
        {state.debug && tab('endings', `🏆 Achievements (${achievementsGot}/${ACHIEVEMENT_IDS.length})`)}
        {state.debug && tab('guide', '❔ Guide')}
        {state.debug && tab('debug', '🛠 Debug')}
      </nav>

      <main id="main-content" tabIndex={-1} data-performance-surface={state.view}>
      {state.debug && state.view === 'story' && state.turn <= 2 && !activeQuest && (
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
          {state.view === 'story' && (
            <StoryView state={state} dispatch={dispatch} analyticsEnabled={analyticsConsent.structured} readingCorpusReady={readingCorpusReady} />
          )}
          {state.view === 'practice' && (
            <PracticeView state={state} dispatch={dispatch} analyticsEnabled={analyticsConsent.structured} />
          )}
          {state.view === 'dictionary' && <DictionaryView state={state} dispatch={dispatch} />}
          {state.debug && state.view === 'map' && <AtlasView state={state} />}
          {state.debug && state.view === 'endings' && <AchievementsView state={state} dispatch={dispatch} readingCorpusReady={readingCorpusReady} />}
          {state.debug && state.view === 'guide' && <GuideView />}
          {state.debug && state.view === 'debug' && <DebugView state={state} dispatch={dispatch} />}

          {/* debug minimap: the world map docked right, expandable to full screen.
              Hidden on the Debug tab, where the same map already fills the page. */}
          {state.debug && state.view !== 'debug' && <MiniMap state={state} dispatch={dispatch} />}
        </Suspense>
      </ReleaseErrorBoundary>
      </main>

      </div>

      {analyticsPreferencesOpen && (
        <AnalyticsPreferencesModal
          consent={analyticsConsent}
          onDismiss={analyticsConsent.decided ? () => setAnalyticsPreferencesOpen(false) : undefined}
          onSave={(nextConsent) => {
            setAnalyticsConsent(nextConsent)
            setAnalyticsPreferencesOpen(false)
          }}
        />
      )}

      {feedbackOpen && analyticsConsent.structured && (
        <PlaytestFeedbackModal
          trigger={feedbackTrigger}
          context={{
            engaged_minutes: engagedMinutes,
            meaningful_actions: meaningfulActions,
            view: state.view,
            node_id: state.nodeId,
            turn: state.turn,
          }}
          onSubmit={(feedback) => {
            captureEvent('playtest_feedback_submitted', feedback, {
              receipt: `feedback:${BUILD_COMMIT}:${Date.now()}`,
            })
            setFeedbackOpen(false)
            setFeedbackPromptStatus('submitted')
            saveFeedbackStatus('submitted')
          }}
          onDismiss={(trigger) => {
            captureEvent('playtest_feedback_dismissed', {
              trigger,
              engaged_minutes: engagedMinutes,
              meaningful_actions: meaningfulActions,
              view: state.view,
              node_id: state.nodeId,
              turn: state.turn,
            }, { receipt: `feedback-dismissed:${BUILD_COMMIT}:${Date.now()}` })
            setFeedbackOpen(false)
            if (trigger === 'milestone') {
              setFeedbackPromptStatus('dismissed')
              saveFeedbackStatus('dismissed')
            }
          }}
        />
      )}

      {!analyticsPreferencesOpen && !feedbackOpen && actionTransition && (
        <Suspense fallback={<div className="action-karaoke-overlay" aria-hidden="true" />}>
          <ActionKaraoke
            action={actionTransition}
            onComplete={finishActionTransition}
            debug={state.debug}
          />
        </Suspense>
      )}

      {!analyticsPreferencesOpen && !feedbackOpen && state.pendingHeartConsequence && (
        <Suspense fallback={<div className="blocking-modal-overlay" aria-hidden="true" />}>
          <HeartConsequenceModal
            consequence={state.pendingHeartConsequence}
            discovered={state.discovered}
            onDismiss={() => dispatch({
              type: 'ACKNOWLEDGE_HEART_CONSEQUENCE',
              eventId: state.pendingHeartConsequence.eventId,
            })}
          />
        </Suspense>
      )}

      {!analyticsPreferencesOpen && !feedbackOpen && state.hearts <= 0 && !state.pendingHeartConsequence && !state.timePassage && !state.pendingEmbodiment && (
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
            Weak saved words leave your Dictionary until you find them again. Your <b>training
            tokens and learning progress</b> stay with you.
          </p>
        </BlockingModal>
      )}

      {!analyticsPreferencesOpen && !feedbackOpen && confirmReset && state.hearts > 0 && !state.pendingHeartConsequence && !state.timePassage && !state.pendingEmbodiment && (
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
            You go back to the <b>start of the story</b>. The places, objects, quests,
            and choices in this attempt reset.
          </p>
          <p>
            Your <b>saved words, training tokens, and learning progress</b> stay with you.
          </p>
        </BlockingModal>
      )}

      <Suspense fallback={<div className="card view-fallback" role="status">Preparing the next story beat…</div>}>
        {!analyticsPreferencesOpen && !feedbackOpen && state.timePassage && !state.pendingHeartConsequence && (
          <TimePassage key={state.timePassage.id} passage={state.timePassage} dispatch={dispatch} />
        )}
        {!analyticsPreferencesOpen && !feedbackOpen && state.pendingEmbodiment && !state.pendingHeartConsequence && !state.timePassage && (
          <EmbodimentConfirm pending={state.pendingEmbodiment} dispatch={dispatch} />
        )}
      </Suspense>
    </div>
  )
}
