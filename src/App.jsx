import { Suspense, useCallback, useState, useEffect, useRef, useSyncExternalStore } from 'react'
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
import { afterPaint, preloadedView } from './preloadedView.jsx'

// Paint the first story before downloading secondary screens. Ordinary play
// primes them in the background; large debug tools stay demand-loaded.
const StoryView = preloadedView(() => import('./components/StoryView.jsx'))
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
const PracticeView = preloadedView(loadPracticeView)
const DictionaryView = preloadedView(() => import('./components/DictionaryView.jsx'))
const AchievementsView = preloadedView(() => import('./components/AchievementsView.jsx'))
const GuideView = preloadedView(() => import('./components/GuideView.jsx'))
const AtlasView = preloadedView(() => import('./components/AtlasView.jsx'))
const DebugView = preloadedView(() => import('./components/DebugView.jsx'))
const DebugHeaderStats = preloadedView(() => import('./components/DebugHeaderStats.jsx'))
const MiniMap = preloadedView(() => import('./components/MiniMap.jsx'))
// Keep these bodies outside the opening bundle, then warm them after paint
// so a time jump or character choice can present its complete response.
const TimePassage = preloadedView(() => import('./components/TimePassage.jsx'))
const EmbodimentConfirm = preloadedView(() => import('./components/EmbodimentConfirm.jsx'))
const ActionKaraoke = preloadedView(() => import('./components/ActionKaraoke.jsx'))
// Train also requires its complete correction surface before answer controls
// can appear; Story primes the same body after its first paint.
const HeartConsequenceModal = preloadedView(loadHeartConsequenceModal)
const AnalyticsPreferencesModal = preloadedView(() => import('./components/AnalyticsPreferencesModal.jsx'))
const PlaytestFeedbackModal = preloadedView(() => import('./components/PlaytestFeedbackModal.jsx'))
const ROUTE_VIEWS = {
  story: StoryView, practice: PracticeView, dictionary: DictionaryView,
  endings: AchievementsView, guide: GuideView, map: AtlasView, debug: DebugView,
}
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

// The complete optional body is primed before opening its focus-trapping shell.
const OptionalModal = ({ id, title, className, onDismiss, children }) => (
  <BlockingModal id={id} title={title} className={className} onDismiss={onDismiss}>
    <ReleaseErrorBoundary onLeave={onDismiss} leaveLabel="Close">
      <Suspense fallback={null}>{children}</Suspense>
    </ReleaseErrorBoundary>
  </BlockingModal>
)

const TIME_PHASES = ['dawn', 'day', 'dusk', 'night']

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
  const optionalOpenGeneration = useRef(0)
  const pendingOptionalOpen = useRef(null)
  const openOptional = useCallback((kind) => {
    // Opening a dialog supersedes a route that is still being prepared.
    navigationGeneration.current += 1
    pendingNavigation.current = null
    const ticket = ++optionalOpenGeneration.current
    const View = kind === 'privacy' ? AnalyticsPreferencesModal : PlaytestFeedbackModal
    const show = () => {
      if (optionalOpenGeneration.current !== ticket) return
      pendingOptionalOpen.current = null
      const current = stateRef.current
      if (actionTransitionRef.current || presentationPendingRef.current || current.pendingHeartConsequence || current.timePassage || current.pendingEmbodiment || current.hearts <= 0) return
      if (kind === 'privacy') setAnalyticsPreferencesOpen(true)
      else setFeedbackOpen(true)
    }
    pendingOptionalOpen.current = kind
    if (View.peek()) show()
    else void View.preload().then(show, show)
  }, [])
  useEffect(() => {
    const cancelPending = (event) => {
      if (event.key !== 'Escape' || !pendingOptionalOpen.current) return
      optionalOpenGeneration.current += 1
      pendingOptionalOpen.current = null
    }
    document.addEventListener('keydown', cancelPending)
    return () => document.removeEventListener('keydown', cancelPending)
  }, [])
  const [feedbackTrigger, setFeedbackTrigger] = useState('manual')
  const [feedbackPromptStatus, setFeedbackPromptStatus] = useState(feedbackStatus)
  const engagedMinutes = useEngagedMinutes()
  const engagedMinutesRef = useRef(engagedMinutes)
  engagedMinutesRef.current = engagedMinutes
  const [actionTransition, setActionTransition] = useState(null)
  const actionTransitionRef = useRef(null)
  const [presentationPending, setPresentationPending] = useState(false)
  const presentationPendingRef = useRef(null)
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
  const navigationGeneration = useRef(0)
  const pendingNavigation = useRef(null)
  const navigate = useCallback((action) => {
    const ticket = ++navigationGeneration.current
    optionalOpenGeneration.current += 1
    pendingOptionalOpen.current = null
    pendingNavigation.current = ticket
    const open = async () => {
      // Revalidate after every await: a newly saved word, restart or different
      // navigation must never publish a question prepared for an older state.
      while (ticket === navigationGeneration.current) {
        const before = stateRef.current
        const after = reduceWithTiming(before, action)
        if (after === before) return
        if (after.view === before.view && after.practiceTarget === before.practiceTarget) {
          commitAcceptedAction(action, before, after)
          return
        }
        const View = ROUTE_VIEWS[after.view]
        const readyModule = View?.peek()
        if (readyModule && (after.view !== 'practice' || readyModule.peekPreparedPractice(after))) {
          commitAcceptedAction(action, before, after)
          return
        }
        try {
          const module = await View?.preload()
          if (ticket !== navigationGeneration.current) return
          if (after.view === 'practice') await module.preparePractice(after)
          if (ticket !== navigationGeneration.current) return
          if (stateRef.current !== before || (after.view === 'practice' && !module.peekPreparedPractice(after))) continue
          commitAcceptedAction(action, before, after)
          return
        } catch {
          // An actual download failure belongs to the existing error boundary,
          // which offers recovery without discarding saved progress.
          if (ticket === navigationGeneration.current && stateRef.current === before) {
            commitAcceptedAction(action, before, after)
          }
          return
        }
      }
    }
    void open().finally(() => {
      if (pendingNavigation.current === ticket) pendingNavigation.current = null
    })
  }, [commitAcceptedAction])
  const dispatchRef = useRef(null)
  const dispatch = useCallback((action, preparedAction = null) => {
    // Keep the current scene visible while the accepted Albanian action plays.
    // The reducer remains the authority for validity: only an action whose
    // preview emits a new committed-speech event receives this transition.
    if (actionTransitionRef.current || presentationPendingRef.current) return
    if (action?.type === 'SET_VIEW' || action?.type === 'BEGIN_OPTION_TRAINING') {
      navigate(action)
      return
    }
    if (action?.type === 'RESET' || SPOKEN_ACTION_TYPES.includes(action?.type) || action?.type === 'BEGIN_STORY_LEARNING') {
      navigationGeneration.current += 1
      pendingNavigation.current = null
      optionalOpenGeneration.current += 1
      pendingOptionalOpen.current = null
    }
    if (!SPOKEN_ACTION_TYPES.includes(action?.type)) {
      const current = stateRef.current
      commitAcceptedAction(action, current, reduceWithTiming(current, action))
      return
    }
    const current = stateRef.current
    const preview = preparedAction?.before === current
      ? preparedAction.after
      : reduceWithTiming(current, action)
    if (preview.timePassage && !TimePassage.peek() && !preparedAction?.importFailed) {
      // Keep an accepted action's source visible and inert until its complete
      // response exists. Reuse the validated preview only for that exact state.
      const ticket = navigationGeneration.current
      pendingNavigation.current = ticket
      presentationPendingRef.current = ticket
      setPresentationPending(true)
      const resume = (importFailed = false) => {
        if (presentationPendingRef.current !== ticket) return
        presentationPendingRef.current = null
        pendingNavigation.current = null
        setPresentationPending(false)
        dispatchRef.current(action, { before: current, after: preview, importFailed })
      }
      void TimePassage.preload().then(() => resume(), () => resume(true))
      return
    }
    const event = preview !== current && preview.actionSpeech?.id !== current.actionSpeech?.id
      ? preview.actionSpeech
      : null
    if (!event?.al || isMuted()) {
      commitAcceptedAction(action, current, preview)
      return
    }
    const transition = { id: event.id, al: event.al, action, before: current, after: preview }
    actionTransitionRef.current = transition
    setActionTransition(transition)
  }, [commitAcceptedAction, navigate])
  dispatchRef.current = dispatch
  const finishActionTransition = useCallback((transition) => {
    if (actionTransitionRef.current?.id !== transition.id) return
    // Validation already computed the complete destination before playback.
    // Keep it private until playback settles, then publish it once. Only an
    // unexpected change to the source state requires another validation.
    const current = stateRef.current
    const after = current === transition.before
      ? transition.after
      : reduceWithTiming(current, transition.action)
    commitAcceptedAction(transition.action, current, after)
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
  const activeQuest = embodimentQuest(state.embodying)
  const activeIdentity = embodimentIdentity(state)
  const gameBlockingOverlay = Boolean(
    state.pendingHeartConsequence || state.timePassage || state.pendingEmbodiment ||
    state.hearts <= 0 || confirmReset || actionTransition || presentationPending,
  )
  const blockingOverlay = gameBlockingOverlay || analyticsPreferencesOpen || feedbackOpen
  const meaningfulActions = Math.max(0, Number(state.turn || 1) - 1) +
    Number(state.trainRound || 0) + Object.keys(state.discovered || {}).length
  const dismissFeedback = (trigger = feedbackTrigger) => {
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
  }

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
    openOptional('feedback')
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
    openOptional,
  ])
  // Load reviewed answer metadata before offering any reading check. Ordinary
  // story prose still hides English; loading Debug must not change an open
  // check's questions or invalidate the answers already shown to the learner.
  const needsReadingCorpus = state.debug || ACHIEVEMENT_IDS.some((id) =>
    state.eligible?.[id] && !state.earned?.[id])
  const prepareReadings = useCallback(() => {
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
    return readingCorpusPromise.current.then(() => setReadingCorpusReady(true))
  }, [])
  useEffect(() => {
    if (needsReadingCorpus) void prepareReadings().catch((error) => {
      console.error('Could not load the reviewed English reading corpus.', error)
    })
  }, [needsReadingCorpus, prepareReadings])
  // Prime ordinary screens once the current scene has painted. Background
  // preparation is read-only; a question is recorded only when Train shows it.
  useEffect(() => afterPaint(() => {
    void Promise.all([
      PracticeView.preload(), DictionaryView.preload(), HeartConsequenceModal.preload(),
      TimePassage.preload(), EmbodimentConfirm.preload(),
      AnalyticsPreferencesModal.preload(), PlaytestFeedbackModal.preload(),
    ]).catch(() => { /* foreground opening owns recoverable import errors */ })
  }), [])
  useEffect(() => {
    if (state.view === 'practice' || state.hearts <= 0) return undefined
    let disposed = false
    let refresh = null
    const warm = () => {
      const current = stateRef.current
      if (disposed || pendingNavigation.current !== null || current.view === 'practice' || document.visibilityState === 'hidden') return
      const preview = reducer(current, { type: 'SET_VIEW', view: 'practice' })
      void PracticeView.preload().then((module) => {
        if (!disposed && pendingNavigation.current === null && stateRef.current === current) return module.preparePractice(preview)
        return null
      }).then((prepared) => {
        if (!disposed && prepared) {
          clearTimeout(refresh)
          refresh = setTimeout(warm, Math.max(1, prepared.validUntilMs - Date.now()))
        }
      }).catch(() => { /* navigation retries a failed preparation */ })
    }
    const cancelStart = afterPaint(warm)
    const resume = () => {
      if (document.visibilityState === 'visible') warm()
    }
    document.addEventListener('visibilitychange', resume)
    return () => {
      disposed = true
      cancelStart()
      clearTimeout(refresh)
      document.removeEventListener('visibilitychange', resume)
    }
  }, [state])
  const warmView = (view) => {
    const View = ROUTE_VIEWS[view]
    void View?.preload().catch(() => {})
  }
  // tint the whole sky (the page background) to the hour
  useEffect(() => {
    for (const p of TIME_PHASES) document.body.classList.remove('time-' + p)
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
      onPointerEnter={() => warmView(view)}
      onFocus={() => warmView(view)}
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
          <Suspense fallback={null}>
            <DebugHeaderStats badgeOnly buildCommit={BUILD_COMMIT} />
          </Suspense>
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
        {state.debug ? (
          <Suspense fallback={null}>
            <DebugHeaderStats state={state} dispatch={dispatch} activeQuest={activeQuest} phase={phase} />
          </Suspense>
        ) : activeQuest ? (
          <span className="stat" title="Your traveller's pack and purse return when this character tale ends">🎒 pack waiting</span>
        ) : null}
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
              openOptional('privacy')
              return
            }
            setFeedbackTrigger('manual')
            openOptional('feedback')
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
          onClick={() => openOptional('privacy')}
          title="Choose anonymous analytics and replay preferences"
        >
          🔒 privacy
        </button>
        <button
          ref={resetButtonRef}
          className="btn"
          data-performance-id="new-run-open"
          onClick={() => {
            optionalOpenGeneration.current += 1
            pendingOptionalOpen.current = null
            setConfirmReset(true)
          }}
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
        <Suspense fallback={null}><DebugHeaderStats onboarding dispatch={dispatch} /></Suspense>
      )}

      <ReleaseErrorBoundary
        resetKey={state.view}
        onLeave={() => setView(state.view === 'story' ? 'guide' : 'story')}
        leaveLabel={state.view === 'story' ? 'Open the guide' : 'Return to the story'}
      >
        <Suspense fallback={<ViewFallback />}>
          {state.view === 'story' && (
            <StoryView state={state} dispatch={dispatch} analyticsEnabled={analyticsConsent.structured} readingCorpusReady={readingCorpusReady} onPrepareReadings={prepareReadings} />
          )}
          {state.view === 'practice' && (
            <PracticeView state={state} dispatch={dispatch} analyticsEnabled={analyticsConsent.structured} canPresent={!blockingOverlay} startupFallback={<ViewFallback />} />
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
        <OptionalModal
          id="analytics-preferences-title"
          title="Help improve Aventura Shqip?"
          className="analytics-preferences ph-no-capture"
          onDismiss={() => setAnalyticsPreferencesOpen(false)}
        >
          <AnalyticsPreferencesModal
            consent={analyticsConsent}
            onSave={(nextConsent) => {
              setAnalyticsConsent(nextConsent)
              setAnalyticsPreferencesOpen(false)
            }}
          />
        </OptionalModal>
      )}

      {feedbackOpen && analyticsConsent.structured && (
        <OptionalModal
          id="playtest-feedback-title"
          title="How is the journey feeling?"
          className="playtest-feedback ph-no-capture"
          onDismiss={() => dismissFeedback()}
        >
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
            onDismiss={dismissFeedback}
          />
        </OptionalModal>
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
