// Albanian word-frequency helper.
//   node scripts/freqrank.mjs <word> [word2 ...]   -> rank + count for each word
//   node scripts/freqrank.mjs --dict                -> rank every DICT surface, rarest last
//   node scripts/freqrank.mjs --dict --rare N        -> only DICT words ranked worse than N (or unranked)
//
// Preference (user's rule): when adding NEW vocabulary to the story, prefer words
// higher in general Albanian frequency. This ranks candidates so that choice is
// data-driven, not a guess. Source: Hermit Dave's FrequencyWords (OpenSubtitles
// 2018, sq_50k) — spoken Albanian, matching the game's "high-frequency spoken"
// intent. List lives at scripts/data/sq_frequency_50k.txt.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { DICT } from '../src/game/content.js'

const here = dirname(fileURLToPath(import.meta.url))
const lines = readFileSync(join(here, 'data', 'sq_frequency_50k.txt'), 'utf8').trim().split('\n')
const rank = new Map()   // surface -> {rank, count}
lines.forEach((ln, i) => {
  const [w, c] = ln.split(' ')
  if (w && !rank.has(w)) rank.set(w, { rank: i + 1, count: Number(c) || 0 })
})

// Strip Albanian definite/inflection noise for a fallback lookup: try the exact
// lowercased surface first, then a couple of light stem trims so "shtëpi" still
// scores even if only "shtëpia" happened to be listed (and vice-versa).
const norm = (s) => s.toLowerCase().replace(/[.,!?;:]/g, '').trim()
function lookup(surface) {
  const s = norm(surface)
  if (rank.has(s)) return { surface: s, ...rank.get(s), exact: true }
  for (const suf of ['t', 'n', 'i', 'a', 'u', 'ë', 'të', 'ën', 'in', 'it', 'un']) {
    if (s.endsWith(suf)) {
      const base = s.slice(0, -suf.length)
      if (base.length >= 2 && rank.has(base)) return { surface: base, ...rank.get(base), exact: false }
    }
  }
  return null
}

const args = process.argv.slice(2)
const fmt = (r) => (r ? `#${r.rank}${r.exact ? '' : `(~${r.surface})`}  ×${r.count}` : 'UNRANKED (not in top 50k)')

if (args[0] === '--dict') {
  const rareCut = args.includes('--rare') ? Number(args[args.indexOf('--rare') + 1]) : Infinity
  const rows = Object.values(DICT).map((d) => ({ al: d.al, en: d.en, r: lookup(d.al) }))
  rows.sort((a, b) => (a.r?.rank ?? 1e9) - (b.r?.rank ?? 1e9))
  const shown = rows.filter((row) => !row.r || row.r.rank > (rareCut === Infinity ? -1 : rareCut))
  for (const row of shown) console.log(`${fmt(row.r).padEnd(28)} ${row.al.padEnd(16)} ${row.en}`)
  const unranked = rows.filter((r) => !r.r).length
  console.log(`\n${rows.length} DICT surfaces · ${unranked} unranked (not in top-50k spoken)`)
} else if (args.length) {
  for (const w of args) console.log(`${w.padEnd(16)} ${fmt(lookup(w))}`)
} else {
  console.error('usage: node scripts/freqrank.mjs <word...>  |  --dict [--rare N]')
  process.exit(1)
}
