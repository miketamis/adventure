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
const PLAYBACK_START_TIMEOUT_MS = 30_000
const PLAYBACK_END_GRACE_MS = 3_000

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
    playback.resolve(false)
  }
}

export function playWord(al) {
  if (!al || muted) return
  void playSurface(al)
}

function playSurface(al, { onProgress } = {}) {
  if (!al || muted) return Promise.resolve(false)
  let a = cache.get(al)
  if (!a) {
    try {
      if (typeof Audio !== 'function') return Promise.resolve(false)
      a = new Audio(audioUrl(al))
      a.preload = 'auto'
      cache.set(al, a)
    } catch {
      return Promise.resolve(false)
    }
  }
  stopActivePlayback()
  return new Promise((resolve) => {
    const playback = { audio: a, resolve, watchdog: null }
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
    try {
      activeAudio = a
      activePlayback = playback
      armWatchdog(PLAYBACK_START_TIMEOUT_MS)
      a.currentTime = 0
      onProgress?.(0, { currentTimeMs: 0, durationMs: null })
      a.ontimeupdate = reportProgress
      a.onloadedmetadata = () => {
        reportProgress()
        const duration = Number(a.duration)
        if (Number.isFinite(duration) && duration > 0)
          armWatchdog((duration * 1000) + PLAYBACK_END_GRACE_MS)
      }
      a.onended = () => settle(true)
      a.onerror = () => settle(false)
      a.onabort = () => settle(false)
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
  return playSurface(al)
}

// Accepted actions use only the generated continuous MP3. Runtime browser TTS
// is intentionally not a fallback: a missing/rejected asset stays silent and
// non-blocking rather than changing voice, rhythm or pronunciation quality.
export function playActionPhrase(al, options) {
  return playSurface(al, options)
}
