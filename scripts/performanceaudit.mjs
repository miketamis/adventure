import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { childProcessFailed } from './lib/child-process-result.mjs'
import {
  PERFORMANCE_BUDGETS,
  getPerformanceSnapshot,
  measureAsyncPerformanceOperation,
  measurePerformanceOperation,
  performanceBand,
  performancePercentile,
  resetPerformanceMonitoring,
} from '../src/performance.js'

const [
  performanceSource,
  mainSource,
  appSource,
  miniMapSource,
  analyticsSource,
  debugSource,
  tokenSource,
  storySource,
  dictionarySource,
  practiceSource,
  preparationSource,
  preloadedViewSource,
] = await Promise.all([
  readFile(new URL('../src/performance.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/main.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/App.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/MiniMap.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/analytics.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/DebugPerformance.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/Token.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/DictionaryView.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/trainPreparation.js', import.meta.url), 'utf8'),
  readFile(new URL('../src/preloadedView.jsx', import.meta.url), 'utf8'),
])

assert.equal(performancePercentile([40, 10, 30, 20], 0.5), 20)
assert.equal(performancePercentile([40, 10, 30, 20], 0.95), 40)
assert.equal(performanceBand(100), 'responsive')
assert.equal(performanceBand(101), 'needs-attention')
assert.equal(performanceBand(501), 'poor')
assert.ok(PERFORMANCE_BUDGETS.browserSteadyInteractionMaxMs <= 200,
  'the automated steady-interaction ceiling became too loose')
assert.ok(PERFORMANCE_BUDGETS.browserPreparedTrainReadyMaxMs <= 500,
  'prepared Train navigation must remain inside its separate warm-card ceiling')

resetPerformanceMonitoring({ keepCoverage: false })
assert.equal(measurePerformanceOperation('reducer', 'TEST', 'story', () => 42), 42)
const snapshot = getPerformanceSnapshot()
assert.equal(snapshot.operations.length, 1)
assert.equal(snapshot.operations[0].kind, 'reducer')
assert.equal(snapshot.operationGroups[0].id, 'reducer/TEST')

const deferredOperation = Promise.withResolvers()
const measuredOperation = measureAsyncPerformanceOperation('train', 'enumerate', 'practice', () => deferredOperation.promise)
assert.equal(getPerformanceSnapshot().operations.length, 1, 'async work was measured before it completed')
deferredOperation.resolve(84)
assert.equal(await measuredOperation, 84)
assert.equal(getPerformanceSnapshot().operations.at(-1).id, 'enumerate')
const asynchronousFailure = new Error('candidate construction failed')
await assert.rejects(measureAsyncPerformanceOperation('train', 'enumerate-failed', 'practice', async () => {
  throw asynchronousFailure
}), (error) => error === asynchronousFailure)
assert.equal(getPerformanceSnapshot().operations.at(-1).id, 'enumerate-failed',
  'failed async operations disappeared from performance diagnostics')

assert.match(performanceSource, /PerformanceObserver/)
assert.match(performanceSource, /observerFor\('event',[\s\S]+durationThreshold: 16/)
assert.match(performanceSource, /observerFor\('longtask'/)
assert.match(performanceSource, /FALLBACK_EVENTS = \['click', 'input', 'change', 'submit'\]/)
assert.match(performanceSource, /data-performance-surface/)
assert.match(performanceSource, /__AVENTURA_PERFORMANCE__/)
assert.match(performanceSource, /MAX_INTERACTIONS = 240/)

const descriptorSource = performanceSource.slice(
  performanceSource.indexOf('export const describePerformanceControl'),
  performanceSource.indexOf('const coverageRecord'),
)
for (const forbidden of [
  '.textContent', '.innerText', "getAttribute?.('aria-label')", "getAttribute?.('title')",
  "getAttribute?.('value')", "getAttribute?.('placeholder')",
]) {
  assert.ok(!descriptorSource.includes(forbidden), `performance labels read private/player-facing field ${forbidden}`)
}

assert.match(mainSource, /startPerformanceMonitoring/)
assert.match(mainSource, /<Profiler id="application" onRender=\{recordReactCommit\}>/)
assert.match(appSource, /const \[state, publishState\] = useState\(loadState\)/)
assert.match(appSource, /publishState\(after\)/)
assert.doesNotMatch(appSource, /useReducer/)
assert.match(appSource, /reduceWithTiming\(current, action\)/)
assert.match(appSource, /measurePerformanceOperation\('persistence', 'game-state'/)
assert.match(appSource, /requestIdleCallback\(run, \{ timeout: IDLE_PERSISTENCE_TIMEOUT_MS \}\)/)
assert.match(appSource, /if \(pending\.current\) return/)
assert.match(appSource, /window\.addEventListener\('pagehide', flushNow\)/)
assert.match(appSource, /document\.addEventListener\('visibilitychange', onVisibilityChange\)/)
assert.match(appSource, /queueStatePersistence\(after\)\s+publishState\(after\)/)
assert.match(appSource, /function useDeferredTransitionAnalytics\(\)/)
assert.match(appSource, /window\.requestAnimationFrame\(\(\) => \{[\s\S]+window\.setTimeout\(flush, 0\)/,
  'transition analytics still extends the accepted-action paint')
assert.match(appSource, /queueTransitionAnalytics\(action, before, after\)/)
assert.match(appSource, /reserveCommittedTransitionSequence\(action, before, after\)[\s\S]+queued\.current\.push\(\{ action, before, after, sequence \}\)/,
  'deferred transition analytics no longer reserves accepted-state order synchronously')
const acceptedActionSource = appSource.slice(
  appSource.indexOf('const commitAcceptedAction'),
  appSource.indexOf('const dispatch'),
)
assert.doesNotMatch(acceptedActionSource, /captureCommittedTransition/,
  'accepted actions still hash their analytics state inside the input handler')
assert.match(appSource, /data-performance-surface=\{state\.view\}/)
assert.match(appSource, /data-performance-id=\{`tab:\$\{view\}`\}/)
assert.match(appSource, /const HeartConsequenceModal = preloadedView\(loadHeartConsequenceModal\)/)
assert.match(appSource, /const loadPracticeView = async \(\) => \{[\s\S]+Promise\.all\(\[[\s\S]+import\('\.\/components\/PracticeView\.jsx'\),[\s\S]+loadHeartConsequenceModal\(\),[\s\S]+return practiceModule/,
  'Train can render answer controls before its blocking miss feedback is loaded')
assert.match(appSource, /const PracticeView = preloadedView\(loadPracticeView\)/)
assert.match(preloadedViewSource, /const LazyView = lazy\(load\)/,
  'unloaded routes must retain the React lazy/error boundary')
assert.match(preloadedViewSource, /const Component = module\?\.default \|\| LazyView/,
  'a prepared route still suspends before its first render')
assert.match(preloadedViewSource, /View\.preload = load/,
  'background warming does not use the same import as the visible route')

assert.match(tokenSource, /export default memo\(Token, tokenPropsMatch\)/)
assert.match(storySource, /onDiscover=\{discoverWord\}/)
assert.match(dictionarySource, /onDiscover=\{discoverWord\}/)
assert.equal((preparationSource.match(/selectedProposal\?\.materialize\(/g) || []).length, 1,
  'Train must materialize the selected exercise exactly once')
assert.doesNotMatch(practiceSource, /selectedProposal\?\.materialize\(/,
  'the UI duplicated the shared preparation pipeline')
assert.match(practiceSource, /const discoveredIds = useMemo\(/)
assert.match(preparationSource, /const unlockedPhrases = options\.unlockedPhrases \?\? EVERYDAY_PHRASE_DRILLS\.filter/,
  'shared preparation no longer derives phrase eligibility from current saved senses')
assert.match(practiceSource, /import \{ createTrainPreparationCache, createTrainPresentationMemory \} from '\.\.\/trainPreparation\.js'/)
assert.match(practiceSource, /const preparation = createTrainPreparationCache\(\)/)
assert.match(practiceSource, /const presentation = createTrainPresentationMemory\(\)/)
assert.match(practiceSource, /const sharedPreparationOptions = \(state\) => \(\{ state, lastWordKeys: presentation\.lastWordKeys\(state\) \}\)/,
  'navigation preparation lost the words of the last actually presented card')
assert.match(practiceSource, /const preparePracticeOptions = \(options\) => preparation\.prepare\(options, preparationTiming\)\.then\(/)
assert.match(practiceSource, /preparePractice = \(state\) => preparePracticeOptions\(sharedPreparationOptions\(state\)\)/)
assert.match(practiceSource, /peekPreparedPractice = \(state\) => preparation\.peek\(sharedPreparationOptions\(state\)\)/)
assert.match(practiceSource, /presentation\.remember\(state, prepared\.wordKeys\)/,
  'displayed cards do not advance the cross-navigation word boundary')
assert.match(practiceSource, /await preparePracticeOptions\(options\)/)
assert.match(practiceSource, /const prepared = preparation\.take\(preparationOptions\(latestState\.current\)\)/,
  'foreground presentation did not revalidate the prepared decision against current state')
assert.match(practiceSource, /measureAsyncOperation: \(name, work\) => measureAsyncPerformanceOperation\('train', name, 'practice', work\)/)
assert.match(preparationSource, /const enumeration = await completeTrainCandidateWork\(options, workOptions\)/,
  'uncached preparation no longer uses the canonical cooperative candidate driver')
assert.match(preparationSource, /createTrainPreparationCache\(\{[\s\S]+enumerate = completeTrainCandidateWork,/,
  'cached preparation no longer defaults to the canonical cooperative candidate driver')
assert.match(preparationSource, /await measureAsyncOperation\('enumerate', \(\) => enumerate\(/,
  'Train candidate work no longer yields through the shared asynchronous driver')
assert.match(practiceSource, /useState\(\(\) => canPresent && state\.hearts > 0 && !state\.pendingHeartConsequence && Boolean\(peekPreparedPractice\(state\)\)\)/,
  'a saved correction can mount a Train question before acknowledgement')
assert.match(practiceSource, /if \(canPresent && !state\.pendingHeartConsequence\) setReady\(true\)/,
  'asynchronous boot preparation can publish a card behind a blocking overlay')
assert.match(appSource, /canPresent=\{!blockingOverlay\}/,
  'Train presentation does not observe the shared blocking-overlay boundary')
assert.match(practiceSource, /await preparePracticeOptions\(options\)[\s\S]+if \(!presentationAllowed\.current\) \{[\s\S]+advanceWhenVisible\.current = true[\s\S]+return[\s\S]+const prepared = preparation\.take/,
  'a dialog opened during preparation can consume and replace the completed card')
assert.match(practiceSource, /if \(!canPresent \|\| !advanceWhenVisible\.current\) return undefined[\s\S]+afterPaint\([\s\S]+nextRef\.current\?\.\(\)/,
  'a completed activity deferred by an overlay never resumes when visible')
assert.match(practiceSource, /if \(!canPresent \|\| !prepared \|\| !q \|\| showCefr\) return/,
  'prepared cards are recorded while a dialog hides the activity')
assert.match(practiceSource, /if \(!canPresent \|\| !q \|\| showCefr \|\| q\.kind === TRAIN_SCHEDULER_SAFEGUARDS\.exhaustedPoolOutcome\) return/,
  'hidden cards emit question presentation analytics')
assert.match(practiceSource, /if \(!q \|\| !canPresent\) return undefined[\s\S]+window\.requestAnimationFrame\(\(\) => \{\s+if \(!presentationAllowed\.current\) return/,
  'scheduled Train focus can move out of an active blocking dialog')
assert.match(practiceSource, /if \(lastTimedQuestion\.current !== q\) \{\s+lastTimedQuestion\.current = q\s+questionStartedAt\.current = Date\.now\(\)/,
  'closing an optional dialog resets response timing for an already presented card')
assert.match(practiceSource, /return ready \? <PreparedPracticeView \{\.\.\.props\} \/> : startupFallback/,
  'direct Train reload bypasses complete-card startup preparation')
assert.match(appSource, /startupFallback=\{<ViewFallback \/>\}/,
  'Train startup introduced a second loading surface')
assert.match(practiceSource, /measureSlice: \(work\) => measurePerformanceOperation\('train', 'enumerate-slice', 'practice', work\)/,
  'Train diagnostics do not distinguish blocking work slices from elapsed enumeration time')
assert.doesNotMatch(practiceSource, /enumerateTrainActivityCandidates\(/,
  'Train performs synchronous whole-bank construction on the UI thread')
assert.doesNotMatch(preparationSource, /enumerateTrainActivityCandidates\(/,
  'shared preparation bypassed the cooperative candidate driver')
assert.doesNotMatch(preparationSource, /\bdispatch\(|captureTrainQuestionPresented\(|captureTrainSchedulerDecision\(|\blocalStorage\b|\bplayPhrase\(/,
  'background preparation performs player-visible, analytics, playback or persistence side effects')
assert.doesNotMatch(practiceSource, /setQ\(null\)/,
  'starting the next decision discards the source card before its replacement is ready')
assert.match(appSource, /await module\.preparePractice\(after\)[\s\S]+stateRef\.current !== before[\s\S]+commitAcceptedAction\(action, before, after\)/,
  'navigation publishes an unprepared or stale Train destination')
assert.match(practiceSource, /advanceAfterConsequence\.current = true/,
  'Train misses do not preserve the completed card until blocking feedback is acknowledged')
assert.match(practiceSource, /if \(!canPresent \|\| state\.pendingHeartConsequence \|\| !advanceAfterConsequence\.current\) return undefined[\s\S]+window\.requestAnimationFrame\([\s\S]+window\.setTimeout\([\s\S]+nextRef\.current\?\.\(\)/,
  'Train replaces the card before the acknowledged consequence has painted')
assert.doesNotMatch(practiceSource, /setTimeout\(\(\) => nextRef\.current\?\.\(\), 0\)/,
  'Train still performs immediate wrong-answer replanning inside the answer interaction')

assert.match(miniMapSource, /export default memo\(MiniMap/)
for (const input of ['nodeId', 'clock', 'worldFacts', 'fixtures', 'npcStarted', 'heard', 'visited',
  'cameFrom', 'choiceIndex', 'embodying', 'embodimentPaused', 'embodimentClock',
  'inventory', 'flags', 'knowledge', 'observations', 'quests', 'rendezvous',
  'npcPortraitsSeen', 'activeNpcPortraits', 'discovered', 'healthNarration', 'inventoryNarration']) {
  assert.match(miniMapSource, new RegExp(`left\\.${input} === right\\.${input}`),
    `minimap memo boundary omits ${input}`)
}

assert.match(analyticsSource, /'interaction_performance_observed'/)
for (const property of [
  'control_id', 'interaction_type', 'measurement_source', 'duration_ms',
  'input_delay_ms', 'processing_duration_ms', 'presentation_delay_ms',
]) {
  assert.ok(analyticsSource.includes(`'${property}'`), `analytics allowlist omits ${property}`)
}
assert.match(debugSource, /visible answers and typed text are never read/)
assert.match(debugSource, /Interaction performance/)

const candidateWorkTest = spawnSync(process.execPath, [
  '--test',
  fileURLToPath(new URL('./lib/train-candidate-work.test.mjs', import.meta.url)),
  fileURLToPath(new URL('./lib/train-preparation.test.mjs', import.meta.url)),
], { stdio: 'inherit' })
assert.equal(candidateWorkTest.signal, null, `candidate work tests terminated by ${candidateWorkTest.signal}`)
assert.equal(childProcessFailed(candidateWorkTest), false,
  `candidate work tests failed: ${candidateWorkTest.error?.message || candidateWorkTest.status}`)

console.log('✅ performance monitor: global timing, private labels, hot-path budgets, and debug diagnostics verified')
