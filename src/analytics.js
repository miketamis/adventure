const CONSENT_KEY = 'aventura.analytics-consent.v1'
const SESSION_KEY = 'aventura.analytics-session.v1'
const STUDY_KEY = 'aventura.analytics-study.v1'
const RECEIPTS_KEY = 'aventura.analytics-receipts.v1'
const STATE_SEQUENCE_KEY = 'aventura.analytics-state-sequence.v1'
const MAX_EVENT_RECEIPTS = 1024

export const ANALYTICS_CONSENT_VERSION = 1
export const ANALYTICS_EVENT_SCHEMA_VERSION = 1
export const STRUCTURED_REPLAY_PROTOCOL_VERSION = 1

const DEFAULT_CONSENT = Object.freeze({
  version: ANALYTICS_CONSENT_VERSION,
  decided: true,
  structured: true,
  replay: true,
})

const viteEnvironment = import.meta.env || {}
const projectKey = viteEnvironment.VITE_POSTHOG_KEY
const apiHost = viteEnvironment.VITE_POSTHOG_HOST
const buildCommit = typeof __BUILD_COMMIT__ === 'string' ? __BUILD_COMMIT__ : 'development'
const listeners = new Set()
let client = null
let initialization = null
let eventSequence = 0
let eventReceipts = null
let receiptPersistence = null
let receiptsDirty = false
let pageIsLeaving = false

const inBrowser = () => typeof window !== 'undefined'

const readJson = (storage, key) => {
  try {
    return JSON.parse(storage?.getItem(key))
  } catch {
    return null
  }
}

const writeJson = (storage, key, value) => {
  try {
    storage?.setItem(key, JSON.stringify(value))
  } catch {
    /* analytics must never block play */
  }
}

const safeId = (value, max = 240) => typeof value === 'string' &&
  /^[\p{L}\p{N}][\p{L}\p{N}._:@/|,+%\-]*$/u.test(value)
  ? value.slice(0, max)
  : null

const normalizeConsent = (value) => value?.version === ANALYTICS_CONSENT_VERSION && value.decided === true
  ? Object.freeze({
      version: ANALYTICS_CONSENT_VERSION,
      decided: true,
      structured: value.structured === true,
      replay: value.replay === true,
    })
  : DEFAULT_CONSENT

let consentSnapshot = normalizeConsent(inBrowser() ? readJson(window.localStorage, CONSENT_KEY) : null)

export function getAnalyticsConsent() {
  return consentSnapshot
}

export function subscribeAnalyticsConsent(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

const notifyConsent = () => listeners.forEach((listener) => listener())

const randomId = () => {
  if (typeof globalThis.crypto?.randomUUID === 'function') return globalThis.crypto.randomUUID()
  return `fallback-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}

export function getAnalyticsSessionId() {
  if (!inBrowser()) return 'server'
  try {
    const existing = safeId(window.sessionStorage.getItem(SESSION_KEY))
    if (existing) return existing
    const created = randomId()
    window.sessionStorage.setItem(SESSION_KEY, created)
    return created
  } catch {
    return randomId()
  }
}

const studyContext = () => {
  if (!inBrowser()) return { study_id: 'unassigned', cohort_id: 'unassigned' }
  let stored = readJson(window.localStorage, STUDY_KEY) || {}
  try {
    const params = new URLSearchParams(window.location.search)
    const study = safeId(params.get('study'))
    const cohort = safeId(params.get('cohort'))
    if (study || cohort) {
      stored = {
        study_id: study || safeId(stored.study_id) || 'unassigned',
        cohort_id: cohort || safeId(stored.cohort_id) || 'unassigned',
      }
      writeJson(window.localStorage, STUDY_KEY, stored)
    }
  } catch {
    /* malformed or unavailable URLs remain unassigned */
  }
  return {
    study_id: safeId(stored.study_id) || 'unassigned',
    cohort_id: safeId(stored.cohort_id) || 'unassigned',
  }
}

const allowedEvents = new Set([
  '$pageview',
  'analytics_consent_updated',
  'playtest_session_started',
  'playtest_session_ended',
  'surface_presented',
  'story_choice_presented',
  'state_transition_committed',
  'run_checkpoint_recorded',
  'train_scheduler_decided',
  'train_question_presented',
  'train_option_presented',
  'train_attempt_completed',
  'audio_playback_completed',
  'playtest_feedback_prompted',
  'playtest_feedback_submitted',
  'playtest_feedback_dismissed',
  'interaction_performance_observed',
  'technical_issue_occurred',
])

const allowedPropertyKeys = new Set([
  '$current_url',
  'event_schema_version', 'replay_protocol_version', 'build_commit', 'analytics_session_id',
  'study_id', 'cohort_id', 'event_receipt', 'state_sequence', 'game_run_id',
  'consent_version', 'structured_enabled', 'replay_enabled',
  'view', 'view_before', 'view_after', 'surface', 'node_id', 'source_node_id',
  'destination_node_id', 'physical_place_id', 'story_run_sequence', 'turn', 'turn_before',
  'turn_after', 'clock_before', 'clock_after', 'hearts_before', 'hearts_after',
  'money_before', 'money_after', 'token_total_before', 'token_total_after', 'ended',
  'action_type', 'action_id', 'action_payload', 'accepted', 'before_state_hash',
  'after_state_hash', 'state_delta', 'checkpoint_state', 'checkpoint_reason',
  'choice_id', 'choice_kind', 'position', 'availability', 'target_node_id',
  'required_word_ids', 'undiscovered_word_count', 'token_deficit', 'money_deficit',
  'question_id', 'activity_type_id', 'family_id', 'kind', 'variant_id', 'stage_id',
  'mode', 'direction', 'tier', 'target_ids', 'word_ids', 'aspect_ids', 'option_count',
  'correct_option_id', 'selected_option_id', 'selected_target_id', 'option_id', 'option_role',
  'option_side', 'phase_id', 'planner_version', 'distractor_relation', 'contrast_rank',
  'confusability_score', 'confusability_band', 'same_albanian_surface',
  'orthographic_similarity', 'target_difficulty_band', 'candidate_count', 'eligible_count',
  'selected_route', 'selected_activity_type_id', 'random_boundary', 'repeat_fallback',
  'correct', 'accepted_with_leeway', 'response_duration_ms', 'response_band', 'support_used',
  'audio_required', 'audio_completed', 'protected_attempt', 'miss_cost', 'restored_heart',
  'error_distance', 'length_delta', 'insertion_count', 'deletion_count', 'substitution_count',
  'transposition_count', 'diacritic_only', 'selected_option_ids',
  'asset_kind', 'asset_id', 'playback_outcome', 'playback_duration_ms', 'muted',
  'issue_type', 'boundary', 'active_view',
  'performance_schema_version', 'control_id', 'interaction_type', 'measurement_source',
  'duration_ms', 'duration_band', 'input_delay_ms', 'processing_duration_ms',
  'presentation_delay_ms',
  'trigger', 'engaged_minutes', 'meaningful_actions', 'enjoyment_rating', 'difficulty_rating',
  'continue_intent', 'friction_tags', 'feedback_text',
  'target_saved', 'target_tokens', 'target_practice_wins', 'target_passive_exposure',
  'target_remediation',
])

const sanitizeValue = (value, depth = 0) => {
  if (depth > 10 || value == null) return value == null ? null : undefined
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
  if (typeof value === 'string') return safeId(value)
  if (Array.isArray(value)) return value.slice(0, 512)
    .map((entry) => sanitizeValue(entry, depth + 1))
    .filter((entry) => entry !== undefined)
  if (typeof value !== 'object') return undefined
  const output = {}
  for (const [key, child] of Object.entries(value).slice(0, 1600)) {
    const safeKey = safeId(key, 700)
    if (!safeKey) continue
    const safeChild = sanitizeValue(child, depth + 1)
    if (safeChild !== undefined) output[safeKey] = safeChild
  }
  return output
}

const sanitizeProperties = (properties = {}) => {
  const output = {}
  for (const [key, value] of Object.entries(properties)) {
    if (!allowedPropertyKeys.has(key)) continue
    if (key === 'feedback_text') {
      if (typeof value !== 'string') continue
      const feedback = value.normalize('NFC').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, 1000)
      if (feedback) output[key] = feedback
      continue
    }
    const safeValue = sanitizeValue(value)
    if (safeValue !== undefined) output[key] = safeValue
  }
  return output
}

const cleanUrl = (value) => {
  try {
    const url = new URL(value)
    return `${url.origin}${url.pathname}`
  } catch {
    return undefined
  }
}

const redactReplayUrl = (request) => {
  if (!request || typeof request !== 'object' || !request.name) return request
  return { ...request, name: cleanUrl(request.name) || request.name }
}

const beforeSend = (capture) => {
  if (!capture) return null
  const consent = getAnalyticsConsent()
  if (capture.event === '$snapshot') return consent.replay ? capture : null
  if (!consent.structured || !allowedEvents.has(capture.event)) return null
  for (const property of ['$current_url', '$referrer', '$session_entry_current_url', '$session_entry_url']) {
    if (capture.properties?.[property]) {
      capture.properties[property] = cleanUrl(capture.properties[property])
    }
  }
  return capture
}

const synchronizeClientConsent = (posthog) => {
  const consent = getAnalyticsConsent()
  if (!consent.structured && !consent.replay) {
    posthog.stopSessionRecording()
    posthog.opt_out_capturing()
    return
  }
  posthog.opt_in_capturing({ captureEventName: false })
  if (consent.replay) posthog.startSessionRecording(true)
  else posthog.stopSessionRecording()
}

export function initializePostHog() {
  const consent = getAnalyticsConsent()
  if ((!consent.structured && !consent.replay) || !projectKey || !apiHost) return Promise.resolve(false)
  if (client) {
    synchronizeClientConsent(client)
    return Promise.resolve(true)
  }
  if (initialization) return initialization
  initialization = import('posthog-js').then(({ default: posthog }) => {
    posthog.init(projectKey, {
      api_host: apiHost,
      defaults: '2026-05-30',
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      capture_exceptions: false,
      capture_performance: false,
      capture_heatmaps: false,
      capture_dead_clicks: false,
      advanced_disable_feature_flags: true,
      disable_session_recording: true,
      enable_recording_console_log: false,
      opt_out_capturing_by_default: true,
      person_profiles: 'never',
      session_recording: {
        maskAllInputs: true,
        blockSelector: 'textarea, [data-private-response], .cefr-capstone, .cefr-preparation-player, .cefr-recorder, .cefr-prep-recorder',
        maskCapturedNetworkRequestFn: redactReplayUrl,
        mousemove: 50,
        mouseInteraction: true,
      },
      before_send: beforeSend,
    })
    client = posthog
    synchronizeClientConsent(posthog)
    return true
  }).catch(() => {
    initialization = null
    return false
  })
  return initialization
}

export function setAnalyticsConsent({ structured = false, replay = false } = {}) {
  consentSnapshot = Object.freeze({
    version: ANALYTICS_CONSENT_VERSION,
    decided: true,
    structured: structured === true,
    replay: replay === true,
  })
  if (inBrowser()) writeJson(window.localStorage, CONSENT_KEY, consentSnapshot)
  notifyConsent()
  void initializePostHog().then(() => {
    if (!client) return
    synchronizeClientConsent(client)
    if (consentSnapshot.structured) {
      captureEvent('analytics_consent_updated', {
        consent_version: ANALYTICS_CONSENT_VERSION,
        structured_enabled: consentSnapshot.structured,
        replay_enabled: consentSnapshot.replay,
      }, { receipt: `consent:${Date.now()}` })
    }
  })
  return consentSnapshot
}

const nextEventReceipt = () => `${getAnalyticsSessionId()}:${++eventSequence}`

export function currentAnalyticsStateSequence() {
  if (!inBrowser()) return 0
  try {
    const value = Number(window.sessionStorage.getItem(STATE_SEQUENCE_KEY))
    return Number.isSafeInteger(value) && value >= 0 ? value : 0
  } catch {
    return 0
  }
}

export function nextAnalyticsStateSequence() {
  const next = currentAnalyticsStateSequence() + 1
  try {
    window.sessionStorage.setItem(STATE_SEQUENCE_KEY, String(next))
  } catch {
    /* the in-memory event receipt still keeps this play non-blocking */
  }
  return next
}

export function flushAnalyticsReceipts() {
  if (!inBrowser()) return
  if (receiptPersistence?.kind === 'idle') window.cancelIdleCallback?.(receiptPersistence.id)
  else if (receiptPersistence) window.clearTimeout(receiptPersistence.id)
  receiptPersistence = null
  if (!receiptsDirty) return
  receiptsDirty = false
  writeJson(window.sessionStorage, RECEIPTS_KEY, [...eventReceipts])
}

const seenReceipt = (receipt) => {
  if (!inBrowser()) return false
  if (!eventReceipts) {
    const stored = readJson(window.sessionStorage, RECEIPTS_KEY)
    eventReceipts = new Set(Array.isArray(stored)
      ? stored.filter((value) => typeof value === 'string').slice(-MAX_EVENT_RECEIPTS)
      : [])
  }
  if (eventReceipts.has(receipt)) return true
  eventReceipts.add(receipt)
  if (eventReceipts.size > MAX_EVENT_RECEIPTS) eventReceipts.delete(eventReceipts.values().next().value)
  receiptsDirty = true
  if (pageIsLeaving || window.document?.visibilityState === 'hidden') {
    flushAnalyticsReceipts()
    return false
  }
  // A scene can present many choices at once. Deduplicate immediately in
  // memory, then save their bounded receipt ledger once outside the paint
  // path, retaining a synchronous flush when the page leaves or hides.
  if (!receiptPersistence) {
    receiptPersistence = typeof window.requestIdleCallback === 'function'
      ? { kind: 'idle', id: window.requestIdleCallback(flushAnalyticsReceipts, { timeout: 750 }) }
      : { kind: 'timeout', id: window.setTimeout(flushAnalyticsReceipts, 50) }
  }
  return false
}

const uuidForReceipt = (receipt) => {
  const hash = (salt) => {
    let value = 2166136261 ^ salt
    for (const character of receipt) {
      value ^= character.codePointAt(0)
      value = Math.imul(value, 16777619)
    }
    return (value >>> 0).toString(16).padStart(8, '0')
  }
  const hex = `${hash(0)}${hash(0x9e3779b9)}${hash(0x85ebca6b)}${hash(0xc2b2ae35)}`
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`
}

export function captureEvent(eventName, properties = {}, {
  receipt = null,
  sendInstantly = false,
} = {}) {
  if (!allowedEvents.has(eventName) || !getAnalyticsConsent().structured) return false
  const eventReceipt = safeId(receipt, 700) || nextEventReceipt()
  if (receipt && seenReceipt(eventReceipt)) return false
  const common = {
    event_schema_version: ANALYTICS_EVENT_SCHEMA_VERSION,
    replay_protocol_version: STRUCTURED_REPLAY_PROTOCOL_VERSION,
    build_commit: buildCommit,
    analytics_session_id: getAnalyticsSessionId(),
    event_receipt: eventReceipt,
    ...studyContext(),
  }
  const safeProperties = sanitizeProperties({ ...common, ...properties })
  void initializePostHog().then((ready) => {
    if (!ready || !client || !getAnalyticsConsent().structured) return
    client.capture(eventName, safeProperties, {
      uuid: uuidForReceipt(eventReceipt),
      send_instantly: sendInstantly,
    })
  })
  return true
}

export function captureConsentPageview() {
  if (!inBrowser() || !getAnalyticsConsent().structured) return false
  const currentUrl = cleanUrl(window.location.href)
  return captureEvent('$pageview', {
    $current_url: currentUrl,
  }, { receipt: `pageview:${getAnalyticsSessionId()}:${currentUrl || 'unknown'}` })
}

export function captureException(error, properties = {}) {
  captureEvent('technical_issue_occurred', {
    ...properties,
    issue_type: safeId(error?.name) || 'unknown_error',
  })
}

if (inBrowser()) {
  window.addEventListener('pagehide', () => {
    pageIsLeaving = true
    flushAnalyticsReceipts()
  })
  window.addEventListener('pageshow', () => { pageIsLeaving = false })
  window.document?.addEventListener('visibilitychange', () => {
    if (window.document.visibilityState === 'hidden') flushAnalyticsReceipts()
  })
  window.addEventListener('storage', (event) => {
    if (event.key !== CONSENT_KEY) return
    consentSnapshot = normalizeConsent(readJson(window.localStorage, CONSENT_KEY))
    notifyConsent()
    if (client) synchronizeClientConsent(client)
    else void initializePostHog()
  })
}
