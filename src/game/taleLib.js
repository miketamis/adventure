// Pure helpers over tale data — no Vite dependencies, safe to import from
// node scripts (scripts/beatscoverage.mjs) and from the app alike.

// Expand keyframe beats into full per-beat frames: for each beat, the complete
// cast/item boards plus who moved (and from where) since the previous beat.
export function framesOf(tale) {
  let cast = {}
  let items = {}
  const frames = []
  for (const b of tale.beats) {
    const prev = cast
    cast = { ...cast }
    for (const [id, [at, doing]] of Object.entries(b.cast || {})) cast[id] = { at, doing }
    items = { ...items }
    for (const [id, [at, doing]] of Object.entries(b.items || {})) items[id] = { at, doing }
    const from = {}
    for (const id of Object.keys(cast)) if (prev[id] && prev[id].at !== cast[id].at) from[id] = prev[id].at
    frames.push({ beat: b, cast, items, from })
    if (b.exit) {
      cast = { ...cast }
      for (const id of b.exit) delete cast[id]
    }
  }
  return frames
}

// Verify the beats' `lines` cover every sentence of the original exactly once.
// Refs are '¶.sentence' ('8.4') or a same-paragraph range ('11.8-11').
export function coverageOf(tale) {
  const expected = new Set()
  ;(tale.paragraphs || []).forEach((n, i) => {
    for (let s = 1; s <= n; s++) expected.add(`${i + 1}.${s}`)
  })
  const seen = []
  const bad = []
  for (const b of tale.beats) {
    for (const [ref] of b.lines || []) {
      const m = /^(\d+)\.(\d+)(?:-(\d+))?$/.exec(ref)
      if (!m) { bad.push(`${b.id}: unparsable ref "${ref}"`); continue }
      const [, p, a, z] = m
      for (let s = +a; s <= +(z || a); s++) seen.push(`${p}.${s}`)
    }
  }
  const missing = [...expected].filter((k) => !seen.includes(k))
  const dupes = seen.filter((k, i) => seen.indexOf(k) !== i)
  const unknown = seen.filter((k) => !expected.has(k))
  return { total: expected.size, covered: seen.length, missing, dupes: [...new Set(dupes)], unknown, bad, ok: !missing.length && !dupes.length && !unknown.length && !bad.length }
}

// THE GAME PROJECTION — an OPTIONAL layer on top of the faithful source
// timeline saying how a folktale becomes a PLAYABLE arc: WHERE play picks up
// (`entry`, a beat id — every beat before it is prologue the player learns as
// lore but never plays) and WHO the player is inside it (`stance` + the cast id
// they embody / ride along with). This lives in tale.play, never in cast[] or a
// beat's keyframes, so the line-coverage-locked source stays pristine —
// prologue-ness and the player's per-beat position are DERIVED here, not stored.
//   stance 'embodied'  → you ARE cast member `as`; your choices are their acts
//   stance 'companion' → a NEW presence not in the source; you ride along with
//                        cast member `with` and can act on their behalf
//   stance 'witness'   → you only watch a fixed legend; you change nothing
// Returns null for tales that have not declared a play block yet.
export function playOf(tale, frames) {
  const play = tale?.play
  if (!play) return null
  frames = frames || framesOf(tale)
  const at = (beatId, fallback) => { const i = frames.findIndex((f) => f.beat.id === beatId); return i < 0 ? fallback : i }
  const entryIndex = at(play.entry, 0)
  const finaleIndex = play.finale ? at(play.finale, frames.length - 1) : frames.length - 1
  // the cast lane the "🎮 you" marker rides: the one you ARE (embodied) or the
  // one you ride ALONGSIDE (companion); a witness rides no one.
  const avatar = play.stance === 'embodied' ? play.as : play.stance === 'companion' ? play.with : null
  return { play, stance: play.stance, role: play.role, enter: play.enter, entry: play.entry, entryIndex, finaleIndex, avatar, learn: play.learn, scenes: play.scenes, from: play.from, ending: play.ending, divergences: play.divergences }
}

// THE QUOTE TIE-IN: story scenes that quote a tale verbatim (the gold Q()
// inscription lines) must take their Albanian from a beat line, so the game
// only ever "quotes" words the original actually contains. Returns the
// verbatim Albanian + a ready attribution, or null if the ref has no Albanian.
export function taleQuote(tale, ref) {
  if (!tale) return null
  for (const b of tale.beats) {
    for (const [r, en, al] of b.lines || []) {
      if (r === ref && al) {
        return { al, en, attribution: `${tale.albanian?.title || tale.title} · ${tale.origin?.collector || tale.source}` }
      }
    }
  }
  return null
}
