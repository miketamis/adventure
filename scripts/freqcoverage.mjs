// Story coverage of the most frequent Albanian words.
//   node scripts/freqcoverage.mjs [N]   (default 150)
// Collects every Albanian surface used in STORY text+options and reports which of
// the top-N OpenSubtitles frequency words are/aren't used. De-accents to fold
// spelling dupes (eshte/është). Complements freqrank.mjs (which ranks DICT words).
import { readFileSync } from 'node:fs'
import { STORY, DICT, ITEMS, lineOf } from '../src/game/content.js'

const freqLines = readFileSync('scripts/data/sq_frequency_50k.txt','utf8').trim().split('\n')
const TOP = Number(process.argv[2]) || 150   // node scripts/freqcoverage.mjs [N]
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

const dictSurfaces = new Set()
for (const d of Object.values(DICT)) for (const part of norm(d.al).split(/\s+/)) if(part) dictSurfaces.add(part)

const CLITICS = new Set(['s','u','a','t','ç','e','i'])
const present=[], variant=[], clitic=[], gap=[]
for (const t of top) {
  if (surfaces.has(t.w)) present.push(t)
  else if (surfacesDeacc.has(deaccent(t.w))) variant.push(t)   // diacritic-less dupe already covered
  else if (CLITICS.has(t.w)) clitic.push(t)
  else gap.push({ ...t, inDict: dictSurfaces.has(t.w) })
}

console.log(`Top ${TOP}: ${present.length} present exactly, ${variant.length} present as diacritic variant, ${clitic.length} single-letter clitics, ${gap.length} REAL GAPS\n`)
console.log('=== REAL GAPS (content words worth adding) ===')
for (const m of gap) console.log(`  #${String(m.rank).padStart(3)}  ${m.w.padEnd(12)} ×${m.count}${m.inDict?'   [ALREADY IN DICT — just needs a story surface]':''}`)
console.log('\n=== single-letter clitics (skipped) ===')
console.log('  ' + clitic.map(c=>`${c.w}(#${c.rank})`).join(' '))
console.log('\n=== diacritic-less dupes already covered ===')
console.log('  ' + variant.map(c=>`${c.w}(#${c.rank})`).join(' '))
