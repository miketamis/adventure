// One privacy-safe performance boundary for the whole application. Browser
// Event Timing supplies input-to-next-paint duration where available; the
// delegated fallback still covers Safari and older browsers without asking
// every button component to grow its own stopwatch.

export const PERFORMANCE_SCHEMA_VERSION = 1

export const PERFORMANCE_BUDGETS = Object.freeze({
  responsiveInteractionMs: 100,
  slowInteractionMs: 200,
  poorInteractionMs: 500,
  longTaskMs: 50,
  reducerMs: 50,
  persistenceMs: 50,
  reactCommitMs: 80,
  browserSteadyInteractionMaxMs: 200,
  browserSteadyOperationMaxMs: 150,
  browserLongTaskMaxMs: 250,
  browserTrainReadyMaxMs: 2000,
  browserTrainCancelMaxMs: 500,
})

const MAX_INTERACTIONS = 240
const MAX_OPERATIONS = 240
const MAX_LONG_TASKS = 120
const CONTROL_SELECTOR = [
  'button',
  'a[href]',
  'input',
  'select',
  'textarea',
  '[role="button"]',
  '[role="link"]',
  '[role="menuitem"]',
].join(',')
const FALLBACK_EVENTS = ['click', 'input', 'change', 'submit']
const EVENT_TIMING_NAMES = new Set([
  'click',
  'keydown',
  'pointerdown',
  'pointerup',
  'input',
])
const VOLATILE_CLASSES = new Set([
  'active', 'answered', 'correct', 'wrong', 'selected', 'disabled', 'open', 'expanded',
])

const interactions = []
const interactionIndex = new Map()
const operations = []
const longTasks = []
const coverage = new Map()
const surfacesSeen = new Set()
const pendingFallbacks = []
const reportedDurations = new Map()
let sequence = 0
let monitoring = false
let slowInteractionReporter = null
let layoutShift = 0
let firstContentfulPaint = null
let largestContentfulPaint = null
let startedAt = Date.now()

const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined'
const now = () => isBrowser() && typeof window.performance?.now === 'function'
  ? window.performance.now()
  : Date.now()
const round = (value) => Math.round(Math.max(0, Number(value) || 0) * 10) / 10
const boundedPush = (target, value, maximum) => {
  target.push(value)
  if (target.length > maximum) target.splice(0, target.length - maximum)
}
const safeIdentifier = (value, fallback = 'unknown') => {
  const safe = String(value || '')
    .normalize('NFC')
    .replace(/[^\p{L}\p{N}._:@/|,+%\-]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 160)
  return safe || fallback
}

export const performancePercentile = (values, percentile) => {
  const sorted = values
    .map(Number)
    .filter(Number.isFinite)
    .sort((left, right) => left - right)
  if (!sorted.length) return 0
  const rank = Math.max(0, Math.ceil((Number(percentile) || 0) * sorted.length) - 1)
  return round(sorted[Math.min(rank, sorted.length - 1)])
}

export const performanceBand = (durationMs) => {
  if (durationMs <= PERFORMANCE_BUDGETS.responsiveInteractionMs) return 'responsive'
  if (durationMs <= PERFORMANCE_BUDGETS.slowInteractionMs) return 'needs-attention'
  if (durationMs <= PERFORMANCE_BUDGETS.poorInteractionMs) return 'slow'
  return 'poor'
}

const elementOf = (target) => {
  if (!isBrowser()) return null
  if (target instanceof window.Element) return target
  return target?.parentElement instanceof window.Element ? target.parentElement : null
}

const performanceSurface = (target) => {
  const element = elementOf(target)
  const owner = element?.closest?.('[data-performance-surface]')
  return safeIdentifier(owner?.getAttribute('data-performance-surface'), 'global')
}

// Do not use textContent, aria-label, title, value or placeholder here. Those
// fields can contain Albanian answers, learner writing or feedback. Stable
// developer-authored attributes and CSS roles are enough to locate hot areas.
export const describePerformanceControl = (target) => {
  const element = elementOf(target)
  if (!element) return { surface: 'global', control: 'unknown', kind: 'unknown' }
  const control = element.closest?.(CONTROL_SELECTOR) || element
  const surface = performanceSurface(control)
  const kind = safeIdentifier(
    control.getAttribute?.('role') || control.tagName?.toLowerCase(),
    'control',
  )
  const explicit = control.getAttribute?.('data-performance-id') ||
    control.getAttribute?.('data-map-id') ||
    control.id ||
    control.getAttribute?.('name')
  if (explicit) {
    return { surface, control: `${kind}:${safeIdentifier(explicit)}`, kind }
  }
  const type = control.getAttribute?.('type')
  const classes = [...(control.classList || [])]
    .filter((name) => !VOLATILE_CLASSES.has(name))
    .slice(0, 4)
    .map((name) => safeIdentifier(name))
    .filter(Boolean)
  const suffix = [type && safeIdentifier(type), ...classes].filter(Boolean).join('.')
  return { surface, control: safeIdentifier(`${kind}${suffix ? `:${suffix}` : ''}`), kind }
}

const coverageRecord = (descriptor, interacted = false) => {
  surfacesSeen.add(descriptor.surface)
  const key = `${descriptor.surface}|${descriptor.control}`
  const current = coverage.get(key) || {
    surface: descriptor.surface,
    control: descriptor.control,
    kind: descriptor.kind,
    interactions: 0,
  }
  if (interacted) current.interactions += 1
  coverage.set(key, current)
  return current
}

const currentSurface = () => {
  if (!isBrowser()) return 'unknown'
  const main = document.querySelector('main [data-performance-surface], main[data-performance-surface]')
  if (main) return safeIdentifier(main.getAttribute('data-performance-surface'))
  return 'global'
}

const maybeReportSlowInteraction = (record) => {
  if (!slowInteractionReporter || record.durationMs < PERFORMANCE_BUDGETS.slowInteractionMs) return
  const previous = reportedDurations.get(record.id) || 0
  if (record.durationMs <= previous) return
  reportedDurations.set(record.id, record.durationMs)
  const report = () => {
    try {
      slowInteractionReporter({
        performance_schema_version: PERFORMANCE_SCHEMA_VERSION,
        surface: record.surface,
        control_id: record.control,
        interaction_type: record.type,
        measurement_source: record.source,
        duration_ms: Math.round(record.durationMs),
        duration_band: performanceBand(record.durationMs),
        input_delay_ms: Math.round(record.inputDelayMs),
        processing_duration_ms: Math.round(record.processingMs),
        presentation_delay_ms: Math.round(record.presentationDelayMs),
      })
    } catch {
      /* monitoring must never block play */
    }
  }
  if (typeof window.setTimeout === 'function') window.setTimeout(report, 0)
  else report()
}

const upsertInteraction = (record) => {
  const normalized = {
    ...record,
    durationMs: round(record.durationMs),
    inputDelayMs: round(record.inputDelayMs),
    processingMs: round(record.processingMs),
    presentationDelayMs: round(record.presentationDelayMs),
  }
  const existing = interactionIndex.get(normalized.id)
  if (existing) {
    if (normalized.durationMs < existing.durationMs) return existing
    Object.assign(existing, normalized)
    maybeReportSlowInteraction(existing)
    return existing
  }
  interactionIndex.set(normalized.id, normalized)
  boundedPush(interactions, normalized, MAX_INTERACTIONS)
  while (interactionIndex.size > MAX_INTERACTIONS) {
    const retained = new Set(interactions.map(({ id }) => id))
    for (const id of interactionIndex.keys()) if (!retained.has(id)) interactionIndex.delete(id)
  }
  maybeReportSlowInteraction(normalized)
  return normalized
}

const normalizedEventStart = (event) => {
  const current = now()
  const candidate = Number(event?.timeStamp)
  return Number.isFinite(candidate) && Math.abs(candidate - current) < 60_000 ? candidate : current
}

const fallbackInteraction = (event) => {
  if (!event?.isTrusted) return
  const descriptor = describePerformanceControl(event.target)
  coverageRecord(descriptor, true)
  const pending = {
    id: `fallback:${++sequence}`,
    type: safeIdentifier(event.type),
    startedAt: normalizedEventStart(event),
    descriptor,
    native: false,
  }
  pendingFallbacks.push(pending)
  const finish = () => {
    if (!pending.native) {
      const durationMs = Math.max(0, now() - pending.startedAt)
      upsertInteraction({
        id: pending.id,
        atMs: round(pending.startedAt),
        type: pending.type,
        ...pending.descriptor,
        source: 'paint-fallback',
        durationMs,
        inputDelayMs: 0,
        processingMs: durationMs,
        presentationDelayMs: 0,
      })
    }
    window.setTimeout(() => {
      const index = pendingFallbacks.indexOf(pending)
      if (index >= 0) pendingFallbacks.splice(index, 1)
    }, 1500)
  }
  window.requestAnimationFrame(() => window.setTimeout(finish, 0))
}

const matchingFallback = (entry, descriptor) => pendingFallbacks.find((pending) => (
  !pending.native &&
  pending.descriptor.surface === descriptor.surface &&
  pending.descriptor.control === descriptor.control &&
  Math.abs(pending.startedAt - entry.startTime) <= 32
))

const observeEventTiming = (entries) => {
  for (const entry of entries.getEntries()) {
    if (!EVENT_TIMING_NAMES.has(entry.name) || entry.duration <= 0) continue
    const descriptor = describePerformanceControl(entry.target)
    coverageRecord(descriptor, true)
    const pending = matchingFallback(entry, descriptor)
    if (pending) pending.native = true
    const inputDelayMs = Math.max(0, entry.processingStart - entry.startTime)
    const processingMs = Math.max(0, entry.processingEnd - entry.processingStart)
    const presentationDelayMs = Math.max(0, entry.duration - inputDelayMs - processingMs)
    const nativeId = Number(entry.interactionId) > 0
      ? `event:${entry.interactionId}`
      : pending?.id || `event:${entry.name}:${round(entry.startTime)}`
    upsertInteraction({
      id: nativeId,
      atMs: round(entry.startTime),
      type: safeIdentifier(entry.name),
      ...descriptor,
      source: 'event-timing',
      durationMs: entry.duration,
      inputDelayMs,
      processingMs,
      presentationDelayMs,
    })
  }
}

const observerFor = (type, callback, options = {}) => {
  if (!isBrowser() || typeof window.PerformanceObserver !== 'function') return null
  if (!window.PerformanceObserver.supportedEntryTypes?.includes(type)) return null
  try {
    const observer = new window.PerformanceObserver(callback)
    observer.observe({ type, buffered: true, ...options })
    return observer
  } catch {
    return null
  }
}

const groupedSummary = (records, keyOf) => {
  const groups = new Map()
  for (const record of records) {
    const key = keyOf(record)
    const group = groups.get(key) || { id: key, durations: [] }
    group.durations.push(record.durationMs)
    groups.set(key, group)
  }
  return [...groups.values()].map((group) => ({
    id: group.id,
    count: group.durations.length,
    p50Ms: performancePercentile(group.durations, 0.5),
    p75Ms: performancePercentile(group.durations, 0.75),
    p95Ms: performancePercentile(group.durations, 0.95),
    maxMs: round(Math.max(...group.durations)),
  })).sort((left, right) => right.p95Ms - left.p95Ms || left.id.localeCompare(right.id))
}

export function getPerformanceSnapshot() {
  const interactionRows = interactions.map((record) => ({ ...record }))
  const operationRows = operations.map((record) => ({ ...record }))
  const taskRows = longTasks.map((record) => ({ ...record }))
  return {
    schemaVersion: PERFORMANCE_SCHEMA_VERSION,
    startedAt,
    budgets: PERFORMANCE_BUDGETS,
    vitals: {
      fcpMs: firstContentfulPaint,
      lcpMs: largestContentfulPaint,
      cls: round(layoutShift),
      inpMs: performancePercentile(interactionRows.map(({ durationMs }) => durationMs), 0.98),
    },
    interactions: interactionRows,
    interactionSurfaces: groupedSummary(interactionRows, ({ surface }) => surface),
    interactionControls: groupedSummary(interactionRows, ({ surface, control }) => `${surface}/${control}`),
    operations: operationRows,
    operationGroups: groupedSummary(operationRows, ({ kind, id }) => `${kind}/${id}`),
    longTasks: taskRows,
    surfacesSeen: [...surfacesSeen].sort(),
    coverage: [...coverage.values()].map((record) => ({ ...record }))
      .sort((left, right) => left.surface.localeCompare(right.surface) || left.control.localeCompare(right.control)),
  }
}

export function resetPerformanceMonitoring({ keepCoverage = true } = {}) {
  interactions.splice(0)
  interactionIndex.clear()
  operations.splice(0)
  longTasks.splice(0)
  reportedDurations.clear()
  if (!keepCoverage) {
    coverage.clear()
    surfacesSeen.clear()
  }
  layoutShift = 0
  firstContentfulPaint = null
  largestContentfulPaint = null
  startedAt = Date.now()
}

export function measurePerformanceOperation(kind, id, surface, operation) {
  const started = now()
  try {
    return operation()
  } finally {
    boundedPush(operations, {
      atMs: round(started),
      kind: safeIdentifier(kind),
      id: safeIdentifier(id),
      surface: safeIdentifier(surface, 'unknown'),
      durationMs: round(now() - started),
    }, MAX_OPERATIONS)
  }
}

export async function measureAsyncPerformanceOperation(kind, id, surface, operation) {
  const started = now()
  try {
    return await operation()
  } finally {
    boundedPush(operations, {
      atMs: round(started),
      kind: safeIdentifier(kind),
      id: safeIdentifier(id),
      surface: safeIdentifier(surface, 'unknown'),
      durationMs: round(now() - started),
    }, MAX_OPERATIONS)
  }
}

export function recordReactCommit(id, phase, actualDuration) {
  boundedPush(operations, {
    atMs: round(now()),
    kind: 'react-commit',
    id: safeIdentifier(`${id}:${phase}`),
    surface: currentSurface(),
    durationMs: round(actualDuration),
  }, MAX_OPERATIONS)
}

const settlePerformanceMonitoring = () => new Promise((resolve) => {
  if (!isBrowser()) {
    resolve(getPerformanceSnapshot())
    return
  }
  window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
    window.setTimeout(() => resolve(getPerformanceSnapshot()), 120)
  }))
})

export function startPerformanceMonitoring({ reportSlowInteraction = null } = {}) {
  if (!isBrowser()) return false
  if (typeof reportSlowInteraction === 'function') slowInteractionReporter = reportSlowInteraction
  if (monitoring) return true
  monitoring = true

  for (const eventName of FALLBACK_EVENTS) {
    document.addEventListener(eventName, fallbackInteraction, { capture: true, passive: true })
  }

  observerFor('event', observeEventTiming, { durationThreshold: 16 })
  observerFor('longtask', (entries) => {
    for (const entry of entries.getEntries()) {
      boundedPush(longTasks, {
        atMs: round(entry.startTime),
        durationMs: round(entry.duration),
      }, MAX_LONG_TASKS)
    }
  })
  observerFor('paint', (entries) => {
    for (const entry of entries.getEntries()) {
      if (entry.name === 'first-contentful-paint') firstContentfulPaint = round(entry.startTime)
    }
  })
  observerFor('largest-contentful-paint', (entries) => {
    const latest = entries.getEntries().at(-1)
    if (latest) largestContentfulPaint = round(latest.startTime)
  })
  observerFor('layout-shift', (entries) => {
    for (const entry of entries.getEntries()) if (!entry.hadRecentInput) layoutShift += entry.value
  })

  let scanQueued = false
  const scanControls = () => {
    scanQueued = false
    for (const owner of document.querySelectorAll('[data-performance-surface]')) {
      surfacesSeen.add(safeIdentifier(owner.getAttribute('data-performance-surface'), 'global'))
    }
    for (const control of document.querySelectorAll(CONTROL_SELECTOR)) {
      coverageRecord(describePerformanceControl(control))
    }
  }
  const scheduleScan = () => {
    if (scanQueued) return
    scanQueued = true
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(scanControls, { timeout: 2000 })
    } else {
      window.setTimeout(scanControls, 250)
    }
  }
  scheduleScan()
  if (typeof window.MutationObserver === 'function') {
    const mutationObserver = new window.MutationObserver(scheduleScan)
    mutationObserver.observe(document.documentElement, { childList: true, subtree: true })
  }

  Object.defineProperty(window, '__AVENTURA_PERFORMANCE__', {
    configurable: true,
    value: Object.freeze({
      budgets: PERFORMANCE_BUDGETS,
      reset: resetPerformanceMonitoring,
      settle: settlePerformanceMonitoring,
      snapshot: getPerformanceSnapshot,
    }),
  })
  return true
}
