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
// Every generated clip is padded with a long, constant silence: ~0.22s before
// the word and ~0.8s after it (a single word only occupies ~0.3-0.5s of a
// ~1.4s file). Left alone that padding is almost the entire gap between words.
// So we START each clip just past its leading silence, and ADVANCE to the next
// word as soon as the spoken part is over (duration minus the trailing pad),
// rather than waiting out the file. The result is a brisk, even cadence.
const LEAD_SKIP = 0.14 // seconds of leading silence to skip into each clip
const TAIL_TRIM = 0.78 // seconds of trailing silence to cut from each clip
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
        a.removeEventListener('loadedmetadata', schedule)
        if (timer) clearTimeout(timer)
        resolve()
      }
      // Once the clip's length is known, advance right after the spoken word
      // ends — d - TAIL_TRIM is roughly when the voice stops; we've already
      // skipped LEAD_SKIP into playback, so the real wait is the difference.
      const schedule = () => {
        if (timer) return
        const d = a.duration
        if (!d || !isFinite(d)) return
        const wait = Math.max(90, (d - TAIL_TRIM - LEAD_SKIP) * 1000)
        timer = setTimeout(finish, wait)
      }
      a.addEventListener('ended', finish) // safety net if duration is unknown
      a.addEventListener('loadedmetadata', schedule)
      try {
        const pr = a.play()
        try { a.currentTime = LEAD_SKIP } catch { /* not seekable yet */ }
        if (pr && pr.catch) pr.catch(() => { if (!timer) timer = setTimeout(finish, FALLBACK_MS) })
        schedule() // duration is already known for cached clips
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
