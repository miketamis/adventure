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
let phrasePlayback = 0
export function playWord(al) {
  if (!al || muted) return
  phrasePlayback += 1
  playSurface(al)
}

function playSurface(al) {
  let a = cache.get(al)
  if (!a) {
    a = new Audio(audioUrl(al))
    a.preload = 'auto'
    cache.set(al, a)
  }
  try {
    a.currentTime = 0
    a.play().catch(() => {})
  } catch {
    /* ignore */
  }
}

// Play a complete phrase from its authored word clips without overlapping
// them. Starting another word or phrase cancels the remainder of the old one.
export async function playPhrase(words) {
  if (!Array.isArray(words) || words.length === 0 || muted) return
  const playback = ++phrasePlayback
  for (const word of words) {
    if (playback !== phrasePlayback || muted) return
    let audio = cache.get(word)
    if (!audio) {
      audio = new Audio(audioUrl(word))
      audio.preload = 'auto'
      cache.set(word, audio)
    }
    await new Promise((resolve) => {
      let settled = false
      const finish = () => {
        if (settled) return
        settled = true
        clearTimeout(timeout)
        audio.removeEventListener('ended', finish)
        audio.removeEventListener('error', finish)
        resolve()
      }
      const timeout = setTimeout(finish, 3200)
      audio.addEventListener('ended', finish, { once: true })
      audio.addEventListener('error', finish, { once: true })
      try {
        audio.currentTime = 0
        audio.play().catch(finish)
      } catch {
        finish()
      }
    })
  }
}
