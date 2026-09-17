import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import {
  PERFORMANCE_BUDGETS,
  getPerformanceSnapshot,
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
])

assert.equal(performancePercentile([40, 10, 30, 20], 0.5), 20)
assert.equal(performancePercentile([40, 10, 30, 20], 0.95), 40)
assert.equal(performanceBand(100), 'responsive')
assert.equal(performanceBand(101), 'needs-attention')
assert.equal(performanceBand(501), 'poor')
assert.ok(PERFORMANCE_BUDGETS.browserSteadyInteractionMaxMs <= 200,
  'the automated steady-interaction ceiling became too loose')

resetPerformanceMonitoring({ keepCoverage: false })
assert.equal(measurePerformanceOperation('reducer', 'TEST', 'story', () => 42), 42)
const snapshot = getPerformanceSnapshot()
assert.equal(snapshot.operations.length, 1)
assert.equal(snapshot.operations[0].kind, 'reducer')
assert.equal(snapshot.operationGroups[0].id, 'reducer/TEST')

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
assert.match(appSource, /data-performance-surface=\{state\.view\}/)
assert.match(appSource, /data-performance-id=\{`tab:\$\{view\}`\}/)
assert.match(appSource, /const HeartConsequenceModal = lazy\(loadHeartConsequenceModal\)/)
assert.match(appSource, /state\.view === 'practice'\) void loadHeartConsequenceModal\(\)/,
  'Train does not warm its blocking miss feedback before the answer interaction')

assert.match(tokenSource, /export default memo\(Token, tokenPropsMatch\)/)
assert.match(storySource, /onDiscover=\{discoverWord\}/)
assert.match(dictionarySource, /onDiscover=\{discoverWord\}/)
assert.equal((practiceSource.match(/selectedProposal\?\.materialize\(/g) || []).length, 1,
  'Train must materialize the selected exercise exactly once')
assert.match(practiceSource, /const discoveredIds = useMemo\(/)
assert.match(practiceSource, /const unlockedEverydayPhrases = useMemo\(/)
assert.match(practiceSource, /const scheduleNextQuestion = useCallback\([\s\S]+window\.requestAnimationFrame\(\(\) => \{[\s\S]+window\.requestAnimationFrame\(advance\)/,
  'Train misses must paint their blocking feedback before planning the following card')
assert.doesNotMatch(practiceSource, /setTimeout\(\(\) => nextRef\.current\?\.\(\), 0\)/,
  'Train still performs immediate wrong-answer replanning inside the answer interaction')

assert.match(miniMapSource, /export default memo\(MiniMap/)
for (const input of ['nodeId', 'clock', 'worldFacts', 'fixtures', 'npcStarted', 'heard', 'visited']) {
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

console.log('✅ performance monitor: global timing, private labels, hot-path budgets, and debug diagnostics verified')
