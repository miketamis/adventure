// Extract every node's region + story connections for explicit map placement.
// Output: scratchpad/place-<region>.json  (one file per region for parallel agents)
import { STORY, lineOf } from '../src/game/content.js'
import { REGIONS, NODE_REGION, VILLAGE_ANCHOR_IDS, isWander } from '../src/game/regions.js'
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

// Region geometry and assignments come from the same canonical module used by
// the game and debug map. This authoring tool must never carry a stale copy.
const VILLAGE_IDS = VILLAGE_ANCHOR_IDS
const firstId = (o) => (o.text || []).find((t) => t && t.id)?.id
const MOVE_VERB = new Set(['shko', 'hyr', 'ngjit', 'ngjitu', 'zbrit', 'zbres', 'kalo', 'kaperce', 'ik', 'dil', 'kthehu', 'vrapo', 'ec', 'eci', 'nis', 'nisu', 'largohu', 'hip', 'zbrite', 'ndiq', 'ec', 'shkoj', 'kthej', 'ike', 'ngjitem'])

const ids = Object.keys(STORY)
const en = (entry) => (lineOf(entry) || []).map((t) => t && t.en).filter(Boolean).join(' ')
const firstLine = (n) => (n.text && n.text.length ? en(n.text[0]) : '')

const villageIdx = REGIONS.findIndex((r) => r.key === 'village')
const regionIndex = Object.fromEntries(REGIONS.map((r, i) => [r.key, i]))
const regionOf = (id) => regionIndex[NODE_REGION[id]] ?? villageIdx

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
