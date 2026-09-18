import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { newRun } from '../src/game/gameState.js'
import {
  analyticsOptionId,
  replayCheckpointHash,
  replayCheckpointState,
  replayStateHash,
} from '../src/game/playtestAnalytics.js'
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
assert.match(analyticsSource, /key === 'issue_message' \|\| key === 'issue_stack'[\s\S]+slice\(0, limit\)/,
  'exception message and stack need their own bounded free-text sanitizer')
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

console.log('✅ playtest analytics: consent, masking, bounded feedback, checkpoints, and hashes verified')
