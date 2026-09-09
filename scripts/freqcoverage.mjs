// Story coverage of the most frequent Albanian words.
//   node scripts/freqcoverage.mjs [N] [--strict]   (default 150)
// Collects every Albanian surface used in STORY text+options and reports which
// of the top-N OpenSubtitles tokens are encountered in story, explicitly
// drillable as a reviewed dictionary form, or genuinely absent. De-accents only
// to report spelling variants (eshte/është); it never silently counts one as an
// exact match. Complements freqrank.mjs (which ranks DICT words).
// Strict mode makes every unclassified non-clitic gap release-blocking.
import { readFileSync } from 'node:fs'
import { STORY, DICT, HEART_LEVELS, ITEMS, lineOf } from '../src/game/content.js'
import { environmentStoryLine, purseStoryLine } from '../src/game/storyContext.js'
import {
  TOP_1000_CANDIDATES,
  TOP_1000_EXCLUSIONS,
  TOP_1000_EXISTING_FORMS,
  TOP_1000_ORTHOGRAPHIC_VARIANTS,
} from './data/sq_top1000_review.mjs'

const freqLines = readFileSync('scripts/data/sq_frequency_50k.txt','utf8').trim().split('\n')
const TOP = process.argv.map(Number).find((value) => Number.isFinite(value) && value > 0) || 150
const strict = process.argv.includes('--strict')
const summaryOnly = process.argv.includes('--summary')
const top = freqLines.slice(0, TOP).map((ln,i)=>({ w: ln.split(' ')[0], rank: i+1, count: Number(ln.split(' ')[1])||0 }))

const norm = (s) => (s||'').toLowerCase().replace(/[.,!?;:"'“”‘’()]/g,'').trim()
const deaccent = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/ë/g,'e').replace(/ç/g,'c')

const surfaces = new Set()
const surfacesDeacc = new Set()
const addTok = (toks) => { for (const t of toks||[]) if (t.al) {
  for (const part of norm(t.al).split(/\s+/)) if (part){ surfaces.add(part); surfacesDeacc.add(deaccent(part)) }
} }
for (const id of Object.keys(STORY)) {
  const n = STORY[id]
  for (const e of n.text) addTok(lineOf(e))
  for (const o of (n.options||[])) addTok(o.text)
}
for (const it of Object.values(ITEMS)) if (it.use) addTok(it.use.phrase)
for (const level of Object.values(HEART_LEVELS)) {
  addTok(lineOf(level.line))
  if (level.heal?.phrase) addTok(level.heal.phrase)
}
for (const clock of [1, 7, 12, 15, 19]) for (const season of ['spring', 'summer', 'autumn', 'winter']) {
  for (const weather of ['clear', 'cloud', 'rain', 'storm', 'snow']) {
    for (const setting of ['outdoor', 'enclosed']) {
      addTok(lineOf(environmentStoryLine({ clock, season, weather }, { setting })))
    }
  }
}
addTok(lineOf(purseStoryLine(1)))

const dictSurfaces = new Set()
const dictSurfacesDeacc = new Set()
for (const entry of Object.values(DICT)) {
  for (const surface of [entry.al, ...(entry.forms || []).map((form) => form.al)]) {
    for (const part of norm(surface).split(/\s+/)) if (part) {
      dictSurfaces.add(part)
      dictSurfacesDeacc.add(deaccent(part))
    }
  }
}

const CLITICS = new Set(['s','u','a','t','ç','e','i'])
const present=[], variant=[], drillable=[], drillableVariant=[], clitic=[], gap=[]
for (const t of top) {
  if (surfaces.has(t.w)) present.push(t)
  else if (surfacesDeacc.has(deaccent(t.w))) variant.push(t)   // diacritic-less dupe already covered
  else if (dictSurfaces.has(t.w)) drillable.push(t)
  else if (dictSurfacesDeacc.has(deaccent(t.w))) drillableVariant.push(t)
  else if (CLITICS.has(t.w)) clitic.push(t)
  else gap.push(t)
}

const review = new Map()
const register = (token, disposition) => {
  if (review.has(token)) {
    throw new Error(`Top-1000 review classifies “${token}” more than once (${review.get(token).kind}, ${disposition.kind})`)
  }
  review.set(token, disposition)
}
for (const [canonical, tokens] of Object.entries(TOP_1000_EXISTING_FORMS)) {
  if (!DICT[canonical]) throw new Error(`Top-1000 review names missing DICT id “${canonical}”`)
  for (const token of tokens.split(/\s+/).filter(Boolean)) register(token, { kind: 'existing form', canonical })
}
for (const [canonical, tokens] of Object.entries(TOP_1000_ORTHOGRAPHIC_VARIANTS)) {
  if (!DICT[canonical]) throw new Error(`Top-1000 review names missing DICT id “${canonical}”`)
  for (const token of tokens.split(/\s+/).filter(Boolean)) register(token, { kind: 'orthographic variant', canonical })
}
for (const [canonical, entry] of Object.entries(TOP_1000_CANDIDATES)) {
  for (const token of entry.tokens.split(/\s+/).filter(Boolean)) {
    register(token, { kind: 'useful candidate', canonical, priority: entry.priority, reason: entry.reason })
  }
}
for (const [category, entry] of Object.entries(TOP_1000_EXCLUSIONS)) {
  for (const token of entry.tokens.split(/\s+/).filter(Boolean)) {
    register(token, { kind: 'excluded', category, reason: entry.reason })
  }
}

const reviewed = []
const unclassified = []
for (const token of gap) {
  const disposition = review.get(token.w)
  if (disposition) reviewed.push({ ...token, ...disposition })
  else unclassified.push(token)
}
const existingForms = reviewed.filter((row) => row.kind === 'existing form')
const orthographic = reviewed.filter((row) => row.kind === 'orthographic variant')
const candidates = reviewed.filter((row) => row.kind === 'useful candidate')
const exclusions = reviewed.filter((row) => row.kind === 'excluded')

// The review is deliberately self-pruning. Once content or a reviewed form
// gains an exact surface, its old exception must be removed rather than
// lingering as a misleading historical ledger entry. Enforce the complete
// ledger only for the top-1,000 release gate; smaller exploratory samples may
// legitimately see only a prefix of it.
if (TOP >= 1000) {
  const topWords = new Set(top.map((row) => row.w))
  const gapWords = new Set(gap.map((row) => row.w))
  const stale = [...review.keys()].filter((token) => !gapWords.has(token))
  const outside = [...review.keys()].filter((token) => !topWords.has(token))
  if (stale.length || outside.length) {
    const details = [
      stale.length ? `no longer gaps: ${stale.join(', ')}` : '',
      outside.length ? `outside top ${TOP}: ${outside.join(', ')}` : '',
    ].filter(Boolean).join('\n')
    throw new Error(`Top-1,000 review ledger is stale; remove or correct these entries:\n${details}`)
  }
}

console.log(
  `Top ${TOP}: ${present.length} in story exactly, ${variant.length} story spelling variants, ` +
  `${drillable.length} reviewed Train forms, ${drillableVariant.length} Train spelling variants, ` +
  `${clitic.length} single-letter clitics, ${reviewed.length} human-reviewed gaps, ` +
  `${unclassified.length} unclassified gaps\n`,
)
console.log(
  `Review: ${existingForms.length} existing inflections, ${orthographic.length} spelling variants, ` +
  `${candidates.length} useful candidates, ${exclusions.length} explicit exclusions.\n`,
)
if (!summaryOnly || unclassified.length) {
  console.log('=== UNCLASSIFIED GAPS (release-blocking in --strict) ===')
  for (const m of unclassified) console.log(`  #${String(m.rank).padStart(3)}  ${m.w.padEnd(12)} ×${m.count}`)
}
if (!summaryOnly) {
  console.log(`\n=== known inflections of existing senses (${existingForms.length}) ===`)
  for (const row of existingForms) console.log(`  #${String(row.rank).padStart(3)}  ${row.w.padEnd(12)} → DICT.${row.canonical}`)
  console.log(`\n=== spelling/standardisation variants (${orthographic.length}) ===`)
  for (const row of orthographic) console.log(`  #${String(row.rank).padStart(3)}  ${row.w.padEnd(12)} → DICT.${row.canonical}`)
  console.log(`\n=== useful missing lemma/form candidates (${candidates.length}) ===`)
  for (const row of candidates) {
    console.log(`  #${String(row.rank).padStart(3)}  ${row.w.padEnd(12)} [${row.priority}] ${row.canonical} — ${row.reason}`)
  }
  console.log(`\n=== explicitly excluded corpus noise/scope mismatches (${exclusions.length}) ===`)
  for (const row of exclusions) console.log(`  #${String(row.rank).padStart(3)}  ${row.w.padEnd(12)} [${row.category}] ${row.reason}`)
  console.log('\n=== reviewed dictionary forms reachable in Train ===')
  console.log('  ' + drillable.map(c=>`${c.w}(#${c.rank})`).join(' '))
  console.log('\n=== diacritic variants of reviewed Train forms ===')
  console.log('  ' + drillableVariant.map(c=>`${c.w}(#${c.rank})`).join(' '))
  console.log('\n=== single-letter clitics (skipped) ===')
  console.log('  ' + clitic.map(c=>`${c.w}(#${c.rank})`).join(' '))
  console.log('\n=== diacritic-less dupes already covered ===')
  console.log('  ' + variant.map(c=>`${c.w}(#${c.rank})`).join(' '))
}
if (strict && unclassified.length) process.exitCode = 1
