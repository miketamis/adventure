// ---------------------------------------------------------------------------
import { captureEvent } from '../analytics.js'

// ---------------------------------------------------------------------------
// WORD AUDIO
// Each Albanian surface has a pre-generated TTS clip in public/audio/.
// The filename is a deterministic, filesystem-safe slug of the surface so the
// download script (scripts/tts-download.mjs) and the runtime agree on names.
// ---------------------------------------------------------------------------

// Slug an Albanian surface to a case-folded ASCII filename. Capitalization
// variants intentionally share the same pronunciation clip; after lowercasing,
// every non [a-z0-9] code point (including diacritics and spaces) becomes a
// deterministic `x<hex codepoint>` escape. The release audit rejects any
// distinct authored surfaces that would happen to collide under this scheme.
export function audioSlug(al) {
  return al
    .toLowerCase()
    .replace(/[^a-z0-9]/g, (c) => 'x' + c.codePointAt(0).toString(16))
}

// Public URL of a surface's clip (respects Vite's base path at runtime).
export function audioUrl(al) {
  const base =
    typeof import.meta !== 'undefined' && import.meta.env
      ? import.meta.env.BASE_URL
      : '/'
  return `${base}audio/${audioSlug(al)}.mp3`
}

// --- mute toggle (persisted) ----------------------------------------------
const MUTE_KEY = 'aventura.muted.v1'
let muted = (() => {
  try {
    return localStorage.getItem(MUTE_KEY) === '1'
  } catch {
    return false
  }
})()
const listeners = new Set()

export function isMuted() {
  return muted
}
export function setMuted(value) {
  muted = !!value
  if (muted) stopActivePlayback()
  try {
    localStorage.setItem(MUTE_KEY, muted ? '1' : '0')
  } catch {
    /* ignore */
  }
  listeners.forEach((fn) => fn())
}
export function toggleMute() {
  setMuted(!muted)
}
// subscribe for React's useSyncExternalStore
export function subscribeMute(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

// Play a surface's clip. Caches <audio> elements so repeated hovers are cheap.
const cache = new Map()
let activeAudio = null
let activePlayback = null
export const AUDIO_PRELOAD_POLICY = Object.freeze({
  maxSurfacesPerRequest: 6,
  maxCachedSurfaces: 48,
})

const cachedAudio = (al) => {
  const key = audioSlug(al)
  let audio = cache.get(key)
  if (audio) cache.delete(key)
  else {
    audio = new Audio(audioUrl(al))
    audio.preload = 'auto'
  }
  cache.set(key, audio)
  while (cache.size > AUDIO_PRELOAD_POLICY.maxCachedSurfaces) {
    const oldest = [...cache.entries()].find(([, candidate]) => candidate !== activeAudio)
    if (!oldest) break
    cache.delete(oldest[0])
    try {
      oldest[1].pause?.()
      oldest[1].removeAttribute?.('src')
      oldest[1].load?.()
    } catch {
      /* releasing an unused recording must never affect active playback */
    }
  }
  return audio
}

// Download only a small set of imminent complete recordings. Preloading never
// plays, interrupts active speech, installs completion callbacks, or records
// listening evidence. The same bounded cache serves subsequent real playback.
export function preloadAudioSurfaces(surfaces) {
  if (muted || typeof Audio !== 'function' || !Array.isArray(surfaces)) return 0
  const selected = new Set()
  let requested = 0
  for (const al of surfaces) {
    if (typeof al !== 'string' || !al) continue
    const key = audioSlug(al)
    if (selected.has(key)) continue
    if (selected.size >= AUDIO_PRELOAD_POLICY.maxSurfacesPerRequest) break
    selected.add(key)
    if (cache.has(key)) continue
    try {
      cachedAudio(al).load?.()
      requested++
    } catch {
      cache.delete(key)
      /* speculative downloads are optional; real playback keeps its fallback */
    }
  }
  return requested
}
// One runtime policy covers word, phrase and accepted-action recordings because
// they all pass through playSurface. In particular, an MP3 that never reaches
// metadata must release any blocking caller promptly rather than leaving the
// game inert behind a silent transition.
export const AUDIO_PLAYBACK_POLICY = Object.freeze({
  startTimeoutMs: 5_000,
  endGraceMs: 3_000,
})

function clearPlaybackWatchdog(playback) {
  if (playback?.watchdog != null) {
    clearTimeout(playback.watchdog)
    playback.watchdog = null
  }
}

function stopActivePlayback() {
  if (activePlayback) {
    const playback = activePlayback
    activePlayback = null
    playback.audio.onended = null
    playback.audio.onerror = null
    playback.audio.onabort = null
    playback.audio.ontimeupdate = null
    playback.audio.onloadedmetadata = null
    clearPlaybackWatchdog(playback)
    try {
      playback.audio.pause()
      playback.audio.currentTime = 0
    } catch {
      /* ignore */
    }
    if (activeAudio === playback.audio) activeAudio = null
    captureEvent('audio_playback_completed', {
      asset_kind: playback.assetKind,
      asset_id: playback.assetId,
      playback_outcome: 'interrupted',
      playback_duration_ms: Math.max(0, Date.now() - playback.startedAt),
      muted,
    })
    playback.resolve(false)
  }
}

export function playWord(al) {
  if (!al) return
  if (muted) {
    captureEvent('audio_playback_completed', {
      asset_kind: 'word', asset_id: audioSlug(al), playback_outcome: 'muted', muted: true,
    })
    return
  }
  void playSurface(al, { assetKind: 'word' })
}

function playSurface(al, { onProgress, assetKind = 'phrase' } = {}) {
  if (!al) return Promise.resolve(false)
  const assetId = audioSlug(al)
  if (muted) {
    captureEvent('audio_playback_completed', {
      asset_kind: assetKind, asset_id: assetId, playback_outcome: 'muted', muted: true,
    })
    return Promise.resolve(false)
  }
  let a
  try {
    if (typeof Audio !== 'function') {
      captureEvent('audio_playback_completed', {
        asset_kind: assetKind, asset_id: assetId, playback_outcome: 'unsupported', muted: false,
      })
      return Promise.resolve(false)
    }
    a = cachedAudio(al)
  } catch {
    captureEvent('audio_playback_completed', {
      asset_kind: assetKind, asset_id: assetId, playback_outcome: 'initialization-failed', muted: false,
    })
    return Promise.resolve(false)
  }
  stopActivePlayback()
  return new Promise((resolve) => {
    const playback = { audio: a, resolve, watchdog: null, assetKind, assetId, startedAt: Date.now() }
    const settle = (completed) => {
      if (activePlayback !== playback) return
      activePlayback = null
      clearPlaybackWatchdog(playback)
      a.onended = null
      a.onerror = null
      a.onabort = null
      a.ontimeupdate = null
      a.onloadedmetadata = null
      if (activeAudio === a) activeAudio = null
      captureEvent('audio_playback_completed', {
        asset_kind: assetKind,
        asset_id: assetId,
        playback_outcome: completed ? 'completed' : 'failed',
        playback_duration_ms: Math.max(0, Date.now() - playback.startedAt),
        muted,
      })
      if (completed) {
        const duration = Number(a.duration)
        onProgress?.(1, {
          currentTimeMs: Number.isFinite(duration) ? duration * 1000 : null,
          durationMs: Number.isFinite(duration) ? duration * 1000 : null,
        })
      }
      resolve(completed)
    }
    const armWatchdog = (delayMs) => {
      clearPlaybackWatchdog(playback)
      playback.watchdog = setTimeout(() => settle(false), delayMs)
    }
    const reportProgress = () => {
      const duration = Number(a.duration)
      const currentTime = Number(a.currentTime)
      if (Number.isFinite(duration) && duration > 0 && Number.isFinite(currentTime)) {
        onProgress?.(Math.max(0, Math.min(1, currentTime / duration)), {
          currentTimeMs: currentTime * 1000,
          durationMs: duration * 1000,
        })
      }
    }
    const useKnownDuration = () => {
      const duration = Number(a.duration)
      if (Number.isFinite(duration) && duration > 0) {
        armWatchdog((duration * 1000) + AUDIO_PLAYBACK_POLICY.endGraceMs)
      }
    }
    try {
      activeAudio = a
      activePlayback = playback
      armWatchdog(AUDIO_PLAYBACK_POLICY.startTimeoutMs)
      a.currentTime = 0
      onProgress?.(0, { currentTimeMs: 0, durationMs: null })
      a.ontimeupdate = reportProgress
      a.onloadedmetadata = () => {
        reportProgress()
        useKnownDuration()
      }
      a.onended = () => settle(true)
      a.onerror = () => settle(false)
      a.onabort = () => settle(false)
      // Preloaded and replayed clips already have metadata, so the browser may
      // never emit loadedmetadata again. Do not time out a long known recording
      // at the shorter network-start deadline.
      useKnownDuration()
      Promise.resolve(a.play()).catch(() => settle(false))
    } catch {
      settle(false)
    }
  })
}

// Complete phrases have their own TTS recording. One continuous clip preserves
// sentence rhythm and coarticulation instead of inserting a load/ended gap
// between separately generated word recordings.
export function playPhrase(al) {
  return playSurface(al, { assetKind: 'phrase' })
}

// Accepted actions use only the generated continuous MP3. Runtime browser TTS
// is intentionally not a fallback: a missing/rejected asset stays silent and
// non-blocking rather than changing voice, rhythm or pronunciation quality.
export function playActionPhrase(al, options) {
  return playSurface(al, { ...options, assetKind: 'accepted-action' })
}
