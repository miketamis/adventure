import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { newRun } from '../src/game/gameState.js'
import {
  analyticsOptionId,
  captureCommittedTransition,
  captureRunCheckpoint,
  createReplaySnapshotCache,
  replayCheckpointHash,
  replayCheckpointState,
  replayStateHash,
  reserveCommittedTransitionSequence,
} from '../src/game/playtestAnalytics.js'
import { getAnalyticsConsent, setAnalyticsConsent } from '../src/analytics.js'
import { captureTrainQuestionPresented, captureTrainSchedulerDecision } from '../src/game/trainPlaytestAnalytics.js'
import { verifyStructuredReplay } from '../src/game/playtestReplay.js'

const analyticsSource = await readFile(new URL('../src/analytics.js', import.meta.url), 'utf8')
const replaySource = await readFile(new URL('../src/game/playtestAnalytics.js', import.meta.url), 'utf8')
const trainAnalyticsSource = await readFile(new URL('../src/game/trainPlaytestAnalytics.js', import.meta.url), 'utf8')
const practiceSource = await readFile(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
const feedbackSource = await readFile(new URL('../src/components/PlaytestFeedbackModal.jsx', import.meta.url), 'utf8')
const learningTelemetrySource = await readFile(new URL('../src/game/learningTelemetry.js', import.meta.url), 'utf8')
const viteSource = await readFile(new URL('../vite.config.js', import.meta.url), 'utf8')

for (const contract of [
  "autocapture: false",
  "capture_pageview: false",
  "capture_exceptions: false",
  "disable_session_recording: true",
  "enable_recording_console_log: false",
  "opt_out_capturing_by_default: true",
  "person_profiles: 'never'",
  'maskAllInputs: true',
  'maskCapturedNetworkRequestFn: redactReplayUrl',
  '[data-private-response]',
  '.cefr-capstone',
  '.cefr-preparation-player',
  '.cefr-recorder',
  '.cefr-prep-recorder',
]) {
  assert.ok(analyticsSource.includes(contract), `analytics privacy contract is missing ${contract}`)
}
assert.match(analyticsSource, /decided: true,[\s\S]+structured: true,[\s\S]+replay: true/, 'pre-consented playtests must start without an analytics prompt')
assert.ok(!analyticsSource.includes('client.captureException'), 'raw exceptions must not leave the browser')
assert.match(analyticsSource, /captureConsentPageview/, 'PostHog Web Analytics needs a consent-gated pageview')
assert.match(analyticsSource, /\$current_url: currentUrl/, 'the manual pageview must use the query-free URL')
assert.match(analyticsSource, /\$session_entry_current_url.*\$session_entry_url/,
  'PostHog session-entry URLs must lose query parameters before capture')
assert.match(viteSource, /return 'analytics-vendor'/, 'PostHog must remain in a consent-gated lazy chunk')
assert.doesNotMatch(replaySource, /from '.\/content\.js'|from '.\/phrasePractice\.js'/,
  'Train analytics dependencies must not enter the initial application shell')
assert.match(trainAnalyticsSource, /distractorRelationForAnalytics/,
  'the lazy Train analytics route must retain production distractor relations')
assert.match(practiceSource, /from '\.\.\/game\/trainPlaytestAnalytics\.js'/,
  'Train must load its detailed analytics only with the Train surface')
assert.match(feedbackSource, /<textarea[\s\S]+data-private-response[\s\S]+maxLength=\{1000\}/,
  'optional feedback text must stay bounded and excluded from visual replay')
assert.match(feedbackSource, /feedback_text: comment\.trim\(\)/,
  'the optional written response must accompany only an explicit feedback submission')
assert.match(analyticsSource, /key === 'feedback_text'[\s\S]+slice\(0, 1000\)/,
  'the feedback property needs its own bounded free-text sanitizer')
assert.match(learningTelemetrySource, /['"]word-matching['"]/, 'word matching must survive local telemetry normalization')

const state = newRun()
const checkpoint = replayCheckpointState({
  ...state,
  pendingHeartConsequence: {
    attempted: { al: 'private learner response' },
    correction: { en: 'private correction surface' },
  },
  learningTelemetryEvents: [{ attempted: 'private learner response' }],
})
assert.equal(checkpoint.pendingHeartConsequence, undefined, 'learner attempts must not enter replay checkpoints')
assert.equal(checkpoint.learningTelemetryEvents, undefined, 'the local research log must not be copied to PostHog')
assert.equal(JSON.stringify(checkpoint).includes('private learner response'), false, 'checkpoint leaked response text')
assert.equal(
  replayCheckpointState({ ...state, trainLastQuestionKey: 'vajze%CC%88:word:1' }).trainLastQuestionKey,
  'vajze%CC%88:word:1',
  'encoded canonical question IDs must survive structured replay sanitization',
)
assert.notEqual(replayStateHash(state), replayStateHash({ ...state, hearts: state.hearts - 1 }), 'state hash ignored hearts')
assert.equal(analyticsOptionId('learner wrote a private sentence').startsWith('opaque-'), true, 'free-form options must be opaque')
assert.ok(replaySource.includes('before_state_hash') && replaySource.includes('after_state_hash'), 'structured replay lost transition verification')

// The hot path consumes immutable reducer states; the independent replay
// verifier must still agree after scalar changes and replacement nested maps.
const snapshotFor = createReplaySnapshotCache()
const progress = { target: { proof: 4, lastAttempt: { atRound: 12, correct: true } } }
const lineage = [
  { ...state, wordProgress: progress, trainLastQuestionKey: 'id-𐐀' },
  { ...state, wordProgress: progress, turn: 2 },
  { ...state, wordProgress: { ...progress, target: { ...progress.target, proof: 5 } }, view: 'practice' },
  { ...state, wordProgress: progress, inventory: { lek: 100 }, trainLastQuestionKey: 'private response text' },
]
for (const current of lineage) {
  const optimized = snapshotFor(current)
  assert.deepEqual(optimized.checkpoint, replayCheckpointState(current))
  assert.equal(optimized.hash, replayStateHash(current), 'cached replay changed the checkpoint hash protocol')
  assert.equal(snapshotFor(current), optimized, 'unchanged state rebuilt its replay snapshot')
}
let proofReads = 0
const countedProgress = { target: { get proof() { proofReads += 1; return 4 } } }
const countedState = { ...state, wordProgress: countedProgress }
snapshotFor(countedState)
snapshotFor({ ...countedState, turn: 2 })
snapshotFor({ ...countedState, view: 'practice' })
assert.equal(proofReads, 1, 'scene/view changes re-traversed unchanged learner proofs')
assert.notEqual(
  replayCheckpointHash({ marker: 'id-𐐀' }),
  replayCheckpointHash({ marker: 'id-𐐁' }),
  'supplementary Unicode code points must remain distinct in replay hashes',
)
assert.equal(replayCheckpointHash({ a: 'id-𐐀', b: [1, true, 'ç'] }), '34a676f2fae6949c',
  'optimized hashing changed an existing version-1 checkpoint fingerprint')

const priorConsent = getAnalyticsConsent()
setAnalyticsConsent({ structured: false, replay: false })
const unreadable = new Proxy({}, { get() { throw new Error('opted-out analytics read gameplay data') } })
assert.equal(reserveCommittedTransitionSequence(unreadable, unreadable, {}), false)
assert.equal(captureCommittedTransition(unreadable, unreadable, {}), false)
assert.equal(captureRunCheckpoint(unreadable), false)
assert.equal(captureTrainQuestionPresented(unreadable, unreadable), undefined)
assert.equal(captureTrainSchedulerDecision({ state: unreadable }), undefined)
setAnalyticsConsent(priorConsent)

const checkpointHash = replayCheckpointHash(checkpoint)
const replay = verifyStructuredReplay([
  {
    event: 'run_checkpoint_recorded',
    timestamp: '2026-09-15T10:00:00Z',
    properties: {
      analytics_session_id: 'session-test',
      game_run_id: 'session-test:run-1',
      event_receipt: 'checkpoint-0',
      state_sequence: 0,
      after_state_hash: checkpointHash,
      checkpoint_state: checkpoint,
    },
  },
  {
    event: 'state_transition_committed',
    timestamp: '2026-09-15T10:00:01Z',
    properties: {
      analytics_session_id: 'session-test',
      game_run_id: 'session-test:run-1',
      event_receipt: 'transition-1',
      state_sequence: 1,
      before_state_hash: checkpointHash,
      after_state_hash: 'next-state-hash',
      action_type: 'SET_VIEW',
      action_id: 'SET_VIEW',
    },
  },
])
assert.equal(replay.valid, true, JSON.stringify(replay.issues))
assert.equal(replay.runs[0].timeline[1].actionType, 'SET_VIEW')

// Receipt writes coalesce without weakening reload deduplication, bounded
// storage, or events generated by later pagehide/visibility listeners.
const storedValues = new Map([['aventura.analytics-receipts.v1', JSON.stringify(['previous-page'])]])
const storageWrites = []
const scheduled = new Map()
const windowListeners = new Map()
const documentListeners = new Map()
let timerSequence = 0
const storage = {
  getItem: (key) => storedValues.get(key) ?? null,
  setItem: (key, value) => { storedValues.set(key, value); storageWrites.push(key) },
}
const browser = {
  localStorage: storage,
  sessionStorage: storage,
  location: { search: '' },
  addEventListener: (name, callback) => windowListeners.set(name, callback),
  setTimeout: (callback) => { const id = ++timerSequence; scheduled.set(id, callback); return id },
  clearTimeout: (id) => scheduled.delete(id),
  document: {
    visibilityState: 'visible',
    addEventListener: (name, callback) => documentListeners.set(name, callback),
  },
}
globalThis.window = browser
try {
  const runtime = await import('../src/analytics.js?receipt-durability-audit')
  assert.equal(runtime.captureEvent('surface_presented', {}, { receipt: 'previous-page' }), false)
  for (let index = 0; index < 1100; index += 1) {
    assert.equal(runtime.captureEvent('surface_presented', {}, { receipt: `new-${index}` }), true)
  }
  assert.equal(storageWrites.filter((key) => key === 'aventura.analytics-receipts.v1').length, 0)
  assert.equal(scheduled.size, 1, 'one scene burst scheduled multiple receipt writes')
  assert.equal(runtime.captureEvent('surface_presented', {}, { receipt: 'new-1099' }), false)
  runtime.flushAnalyticsReceipts()
  const savedReceipts = JSON.parse(storedValues.get('aventura.analytics-receipts.v1'))
  assert.equal(savedReceipts.length, 1024)
  assert.equal(savedReceipts[0], 'new-76')
  assert.equal(savedReceipts.at(-1), 'new-1099')
  assert.equal(scheduled.size, 0)
  assert.equal(storageWrites.filter((key) => key === 'aventura.analytics-receipts.v1').length, 1)
  runtime.captureEvent('surface_presented', {}, { receipt: 'before-pagehide' })
  windowListeners.get('pagehide')()
  runtime.captureEvent('surface_presented', {}, { receipt: 'later-pagehide-listener' })
  assert.equal(JSON.parse(storedValues.get('aventura.analytics-receipts.v1')).at(-1), 'later-pagehide-listener')
  windowListeners.get('pageshow')()
  runtime.captureEvent('surface_presented', {}, { receipt: 'before-hidden' })
  assert.equal(scheduled.size, 1, 'BFCache restoration did not resume deferred receipts')
  browser.document.visibilityState = 'hidden'
  documentListeners.get('visibilitychange')()
  runtime.captureEvent('surface_presented', {}, { receipt: 'later-hidden-listener' })
  assert.equal(JSON.parse(storedValues.get('aventura.analytics-receipts.v1')).at(-1), 'later-hidden-listener')
  assert.equal(scheduled.size, 0)
  const reloaded = await import('../src/analytics.js?receipt-reload-audit')
  assert.equal(reloaded.captureEvent('surface_presented', {}, { receipt: 'later-hidden-listener' }), false)
} finally {
  delete globalThis.window
}

console.log('✅ playtest analytics: consent, masking, cached checkpoint compatibility, and deferred receipt durability verified')
