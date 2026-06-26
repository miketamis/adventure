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

// Play a surface's clip. Caches <audio> elements so repeated hovers are cheap.
const cache = new Map()
export function playWord(al) {
  if (!al) return
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
