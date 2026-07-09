// Extract every node's region + story connections for MANUAL map placement.
// Output: scratchpad/place-<region>.json  (one file per region for parallel agents)
import { STORY, lineOf } from '../src/game/content.js'
import { writeFileSync, mkdirSync, readFileSync } from 'fs'

// ---- parse already-placed anchors from the source (kept FIXED) --------------
const FIXED = {} // id -> {x,y,label,kind}
{
  const dv = readFileSync('src/components/DebugView.jsx', 'utf8')
  const vp = dv.slice(dv.indexOf('const VILLAGE_PLACES = ['), dv.indexOf('\n]', dv.indexOf('const VILLAGE_PLACES = [')))
  for (const m of vp.matchAll(/\{\s*id:\s*'([^']+)',\s*x:\s*(-?\d+),\s*y:\s*(-?\d+),\s*type:\s*'([^']+)',\s*label:\s*'([^']*)'/g))
    FIXED[m[1]] = { x: +m[2], y: +m[3], kind: m[4], label: m[5].replace(/’/g, "'") }
  const gl = readFileSync('src/components/mapGlyphs.jsx', 'utf8')
  const lm = gl.slice(gl.indexOf('WORLD_LANDMARKS = ['), gl.indexOf('\n]', gl.indexOf('WORLD_LANDMARKS = [')))
  for (const m of lm.matchAll(/\{\s*id:\s*'([^']+)',\s*glyph:\s*'([^']+)',\s*label:\s*'([^']*)',\s*x:\s*(-?\d+),\s*y:\s*(-?\d+)\s*\}/g))
    FIXED[m[1]] = { x: +m[4], y: +m[5], kind: 'landmark', label: m[3] }
}

const OUT = process.argv[2] || '.'
mkdirSync(OUT, { recursive: true })

// ---- region anchors + bounds (copied from DebugView REGIONS) ----------------
// KEEP IN SYNC with REGIONS in src/components/DebugView.jsx (re-rigged geography).
const REGIONS = [
  { key: 'sky', cx: 300, cy: -1200, rx: 780, ry: 300, anchors: ['qiell1', 'qiellDiell', 'henaPaqe', 'qiellPrende', 'diellShtepi1', 'rrugaDielli1', 'pemaDielli', 'diellThirrKul'] },
  { key: 'mountain', cx: 300, cy: -520, rx: 640, ry: 400, anchors: ['maja', 'mali1', 'tomor1', 'jutbina', 'peri1', 'tomorBekim', 'tomor2', 'tomor3', 'shpirag1', 'maliStuhi', 'tomorProva', 'tomorZbritje'] },
  { key: 'forest', cx: -520, cy: 430, rx: 380, ry: 470, anchors: ['pylli1', 'start', 'lendina', 'gjumi', 'pylliLoop'] },
  { key: 'river', cx: 250, cy: 1070, rx: 300, ry: 300, anchors: ['lumi', 'zana1', 'bolla1', 'ura', 'uraFshaj', 'riddle1', 'zanaProva', 'zanaFole', 'flocka1', 'rrethi', 'shpellaHyrje'] },
  { key: 'castle', cx: 300, cy: 1360, rx: 260, ry: 230, anchors: ['kalaRozafa'] },
  { key: 'lake', cx: 60, cy: 1660, rx: 360, ry: 240, anchors: [] },
  { key: 'sea', cx: 1560, cy: 1050, rx: 620, ry: 1180, anchors: ['deti1', 'bregu', 'detiThelle1'] },
  { key: 'underworld', cx: 360, cy: 2180, rx: 440, ry: 350, anchors: ['bota1', 'pusi', 'gjarpri', 'kulshedra1', 'qyteti', 'tre1', 'tre2', 'tre3'] },
  { key: 'village', cx: 512, cy: 430, rx: 430, ry: 340, anchors: ['fshatiDil', 'fshatiBesa', 'fshatiCaul', 'gjizar1'] },
]
const VILLAGE_IDS = ['udhekryq', 'kisha1', 'varret1', 'kostandin1', 'fshatiSheshi', 'pusiThate', 'nenaDiell1', 'veraDite1', 'dordolec1', 'plaka', 'oda1', 'fshatiLanes', 'kulle1', 'djepi1', 'pallatiZi', 'kopshtMermer1', 'fshatiJeta', 'vatra', 'qilim', 'bariu', 'gjysmegjel1', 'syriKeq1', 'breshka1', 'fshatiLumi', 'uraArtes1', 'mulli1', 'kroi1']
REGIONS.find((r) => r.key === 'village').anchors = [...VILLAGE_IDS, ...REGIONS.find((r) => r.key === 'village').anchors]

const WANDER_VERB = new Set(['ik', 'kthehu', 'zgjohu', 'dil'])
const WANDER_TO = new Set(['pylliLoop', 'humbur', 'gjumi'])
const firstId = (o) => (o.text || []).find((t) => t && t.id)?.id
const isWander = (o) => WANDER_VERB.has(firstId(o)) || WANDER_TO.has(o.to)
const MOVE_VERB = new Set(['shko', 'hyr', 'ngjit', 'ngjitu', 'zbrit', 'zbres', 'kalo', 'kaperce', 'ik', 'dil', 'kthehu', 'vrapo', 'ec', 'eci', 'nis', 'nisu', 'largohu', 'hip', 'zbrite', 'ndiq', 'ec', 'shkoj', 'kthej', 'ike', 'ngjitem'])

const ids = Object.keys(STORY)
const en = (entry) => (lineOf(entry) || []).map((t) => t && t.en).filter(Boolean).join(' ')
const firstLine = (n) => (n.text && n.text.length ? en(n.text[0]) : '')

// ---- assignRegions: multi-source BFS over progression edges + full fallback --
const prog = {}, full = {}
for (const id of ids) { prog[id] = new Set(); full[id] = new Set() }
for (const id of ids) for (const o of (STORY[id].options || [])) {
  if (o.confuser || !o.to || !STORY[o.to]) continue
  full[id].add(o.to); full[o.to].add(id)
  if (!isWander(o)) { prog[id].add(o.to); prog[o.to].add(id) }
}
const reg = {}, dist = {}, q = []
REGIONS.forEach((rg, ri) => rg.anchors.forEach((a) => { if (STORY[a] && dist[a] == null) { reg[a] = ri; dist[a] = 0; q.push(a) } }))
for (let h = 0; h < q.length; h++) for (const v of prog[q[h]]) if (dist[v] == null) { dist[v] = dist[q[h]] + 1; reg[v] = reg[q[h]]; q.push(v) }
for (let h = 0; h < q.length; h++) for (const v of full[q[h]]) if (dist[v] == null) { dist[v] = dist[q[h]] + 1; reg[v] = reg[q[h]]; q.push(v) }
const villageIdx = REGIONS.findIndex((r) => r.key === 'village')
const regionOf = (id) => VILLAGE_IDS.includes(id) ? villageIdx : (reg[id] != null ? reg[id] : villageIdx)

// ---- incoming map -----------------------------------------------------------
const incoming = {}
for (const id of ids) incoming[id] = []
for (const id of ids) for (const o of (STORY[id].options || [])) if (!o.confuser && o.to && STORY[o.to]) incoming[o.to].push(id)

// ---- build per-region node records ------------------------------------------
const byRegion = {}
for (const rg of REGIONS) byRegion[rg.key] = []
for (const id of ids) {
  const n = STORY[id]
  const ri = regionOf(id)
  const rg = REGIONS[ri]
  const out = (n.options || []).filter((o) => !o.confuser && o.to && STORY[o.to]).map((o) => {
    const v = firstId(o)
    const toRegion = REGIONS[regionOf(o.to)].key
    return { to: o.to, text: en(o.text), verb: v || '', crossRegion: toRegion !== rg.key, toRegion, wander: isWander(o), move: MOVE_VERB.has(v) || isWander(o) }
  })
  byRegion[rg.key].push({
    id, region: rg.key, end: n.end || null, hub: (incoming[id].length >= 4),
    fixed: FIXED[id] ? [FIXED[id].x, FIXED[id].y] : null,
    label: FIXED[id]?.label || null,
    first: firstLine(n),
    inCount: incoming[id].length,
    in: incoming[id],
    out,
  })
}

// ---- landmark + village anchor positions (already hand-placed) --------------
// (agents keep these fixed and place the rest relative to them)
const summary = {}
for (const rg of REGIONS) {
  const nodes = byRegion[rg.key]
  summary[rg.key] = nodes.length
  const anchors = {}
  for (const nd of nodes) if (nd.fixed) anchors[nd.id] = { x: nd.fixed[0], y: nd.fixed[1], label: nd.label }
  writeFileSync(`${OUT}/place-${rg.key}.json`, JSON.stringify({
    region: rg.key,
    bounds: { cx: rg.cx, cy: rg.cy, rx: rg.rx, ry: rg.ry },
    count: nodes.length,
    fixedCount: Object.keys(anchors).length,
    anchors,
    nodes,
  }, null, 2))
}
console.log('total nodes:', ids.length)
console.log('per region:', JSON.stringify(summary, null, 2))
