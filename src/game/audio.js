// ---------------------------------------------------------------------------
// WORD AUDIO
// Each Albanian surface has a pre-generated TTS clip in public/audio/.
// The filename is a deterministic, filesystem-safe slug of the surface so the
// download script (scripts/tts-download.mjs) and the runtime agree on names.
// ---------------------------------------------------------------------------

// Slug an Albanian surface to an ascii, lowercase, collision-free filename.
// Non [a-z0-9] chars (diacritics, capitals after lowercasing, spaces) become a
// reversible `x<hex codepoint>` escape so distinct surfaces never collide on a
// case-insensitive filesystem.
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

// Get (and cache) the <audio> element for a surface so repeated plays are cheap.
const cache = new Map()
function loadWord(al) {
  let a = cache.get(al)
  if (!a) {
    a = new Audio(audioUrl(al))
    a.preload = 'auto'
    cache.set(al, a)
  }
  return a
}

// Play a surface's clip. Caches <audio> elements so repeated hovers are cheap.
export function playWord(al) {
  if (!al || muted) return
  const a = loadWord(al)
  try {
    a.currentTime = 0
    a.play().catch(() => {})
  } catch {
    /* ignore */
  }
}

// Read a list of surfaces aloud, one after another, calling onWord(index) as each
// one begins (and onWord(-1) when the whole line is finished). Used to narrate a
// story passage word-by-word so the UI can highlight the word being spoken.
// Returns a cancel function that stops playback immediately.
// If a clip is missing or the browser blocks autoplay (no user gesture yet), the
// step still advances after a short beat so the highlight keeps moving in sync.
const FALLBACK_MS = 130
// Trailing silence (seconds) to skip at the end of each clip — the next word
// starts as soon as the audible part is done, so words follow close together
// instead of leaving the baked-in tail silence as a gap.
const TAIL_TRIM = 0.18
export function speakSequence(words, onWord) {
  let cancelled = false
  let current = null

  const stopCurrent = () => {
    if (current) {
      try {
        current.pause()
      } catch {
        /* ignore */
      }
      current = null
    }
  }

  const playOne = (al) =>
    new Promise((resolve) => {
      if (cancelled || muted || !al) {
        resolve()
        return
      }
      const a = loadWord(al)
      current = a
      let settled = false
      let timer = null
      const finish = () => {
        if (settled) return
        settled = true
        a.removeEventListener('ended', finish)
        a.removeEventListener('timeupdate', onTime)
        if (timer) clearTimeout(timer)
        resolve()
      }
      // advance as soon as the spoken part is over, skipping the trailing silence
      const onTime = () => {
        const d = a.duration
        if (d && isFinite(d) && a.currentTime >= d - TAIL_TRIM) finish()
      }
      a.addEventListener('ended', finish)
      a.addEventListener('timeupdate', onTime)
      try {
        a.currentTime = 0
        const pr = a.play()
        if (pr && pr.catch) pr.catch(() => { timer = setTimeout(finish, FALLBACK_MS) })
      } catch {
        timer = setTimeout(finish, FALLBACK_MS)
      }
    })

  ;(async () => {
    for (let i = 0; i < words.length; i++) {
      if (cancelled || muted) break
      onWord && onWord(i)
      await playOne(words[i])
      if (cancelled) return
    }
    if (!cancelled) onWord && onWord(-1)
  })()

  return () => {
    if (cancelled) return
    cancelled = true
    stopCurrent()
    onWord && onWord(-1)
  }
}
