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

function stopActivePlayback() {
  if (!activePlayback) return
  const playback = activePlayback
  activePlayback = null
  playback.audio.onended = null
  playback.audio.onerror = null
  try {
    playback.audio.pause()
    playback.audio.currentTime = 0
  } catch {
    /* ignore */
  }
  if (activeAudio === playback.audio) activeAudio = null
  playback.resolve(false)
}

export function playWord(al) {
  if (!al || muted) return
  void playSurface(al)
}

function playSurface(al) {
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
    const playback = { audio: a, resolve }
    const settle = (completed) => {
      if (activePlayback !== playback) return
      activePlayback = null
      a.onended = null
      a.onerror = null
      if (activeAudio === a) activeAudio = null
      resolve(completed)
    }
    try {
      activeAudio = a
      activePlayback = playback
      a.currentTime = 0
      a.onended = () => settle(true)
      a.onerror = () => settle(false)
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
