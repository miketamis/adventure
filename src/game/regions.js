// ===========================================================================
// THE WORLD'S REGIONS — the single source of truth for which story node belongs
// to which region of the map (the sky, Mount Tomorr, the forest, the river, …).
// Lifted out of DebugView so the game logic (area factoids in folklore.js) and
// the debug World Map share ONE region model. DebugView imports REGIONS,
// isWander and assignRegions from here; area factoids use NODE_REGION /
// REGION_NODES to tell when you've explored a whole region.
// ===========================================================================
import { STORY } from './content.js'

// The village nodes (≈ the town at the world's centre). This id list MUST match
// the ids in DebugView's VILLAGE_PLACES layout array — they are the same set,
// seen from the two sides (this file assigns/excludes them; DebugView lays them
// out). Village nodes are handled apart from the ringed outer regions.
export const VILLAGE_ANCHOR_IDS = [
  'udhekryq', 'kisha1', 'varret1', 'kostandin1', 'fshatiSheshi', 'pusiThate',
  'nenaDiell1', 'veraDite1', 'dordolec1', 'plaka', 'oda1', 'fshatiLanes',
  'kulle1', 'djepi1', 'pallatiZi', 'kopshtMermer1', 'fshatiJeta', 'vatra',
  'qilim', 'bariu', 'gjysmegjel1', 'syriKeq1', 'breshka1', 'fshatiLumi',
  'uraArtes1', 'mulli1', 'kroi1', 'tabaket1',
]

export const REGIONS = [
  { key: 'sky', label: 'the sky realm', cx: 300, cy: -1200, rx: 780, ry: 300, terrain: 'sky', anchors: ['qiell1', 'qiellDiell', 'henaPaqe', 'qiellPrende', 'diellShtepi1', 'rrugaDielli1', 'pemaDielli', 'diellThirrKul'] },
  { key: 'mountain', label: 'Mount Tomorr', cx: 300, cy: -520, rx: 640, ry: 400, terrain: 'mountain', anchors: ['maja', 'mali1', 'tomor1', 'jutbina', 'peri1', 'tomorBekim', 'tomor2', 'tomor3', 'shpirag1', 'maliStuhi', 'tomorProva', 'tomorZbritje'] },
  { key: 'forest', label: 'the great forest', cx: -520, cy: 430, rx: 380, ry: 470, terrain: 'forest', anchors: ['pylli1', 'start', 'lendina', 'gjumi', 'pylliLoop'] },
  { key: 'river', label: 'the river & the Zana', cx: 250, cy: 1070, rx: 300, ry: 300, terrain: 'river', anchors: ['lumi', 'zana1', 'bolla1', 'ura', 'uraFshaj', 'riddle1', 'zanaProva', 'zanaFole', 'rrethi', 'shpellaHyrje'] },
  { key: 'castle', label: 'Rozafa castle', cx: 300, cy: 1360, rx: 260, ry: 230, terrain: 'castle', anchors: ['kalaRozafa'] },
  { key: 'lake', label: 'Lake Shkodra', cx: 60, cy: 1660, rx: 360, ry: 240, terrain: 'lake', anchors: ['flocka1'] },
  { key: 'sea', label: 'the sea', cx: 1560, cy: 1050, rx: 620, ry: 1180, terrain: 'sea', anchors: ['deti1', 'bregu', 'detiThelle1'] },
  { key: 'underworld', label: 'the world below', cx: 360, cy: 2180, rx: 440, ry: 350, terrain: 'cavern', anchors: ['bota1', 'pusi', 'gjarpri', 'kulshedra1', 'qyteti', 'tre1', 'tre2', 'tre3'] },
  { key: 'village', label: '', cx: 512, cy: 430, rx: 430, ry: 340, terrain: null, anchors: [...VILLAGE_ANCHOR_IDS, 'fshatiDil', 'fshatiBesa', 'fshatiCaul', 'gjizar1'] },
]

// "wander" links = flee / return / get-lost fallbacks, NOT spatial journeys.
const WANDER_VERB = new Set(['ik', 'kthehu', 'zgjohu', 'dil'])
const WANDER_TO = new Set(['pylliLoop', 'humbur', 'gjumi'])
export const isWander = (o) => WANDER_VERB.has((o.text || []).find((t) => t && t.id)?.id) || WANDER_TO.has(o.to)

// multi-source BFS over PROGRESSION edges only (ignore wander), so a node isn't
// dragged into the forest just because it can flee there → the region a node
// lands in reflects where the story actually takes you. Returns byRegion: an
// array indexed by REGIONS position → the node ids in that region (village nodes
// excluded, they are handled separately).
export function assignRegions(ids = Object.keys(STORY)) {
  const village = new Set(VILLAGE_ANCHOR_IDS)
  const prog = {}, full = {}
  for (const id of ids) { prog[id] = new Set(); full[id] = new Set() }
  for (const id of ids) for (const o of (STORY[id].options || [])) {
    if (o.confuser || !o.to || !STORY[o.to]) continue
    full[id].add(o.to); full[o.to].add(id)
    if (!isWander(o)) { prog[id].add(o.to); prog[o.to].add(id) }
  }
  const reg = {}, dist = {}, q = []
  REGIONS.forEach((rg, ri) => rg.anchors.forEach((a) => {
    if (STORY[a] && dist[a] == null) { reg[a] = ri; dist[a] = 0; q.push(a) }
  }))
  // primary: follow PROGRESSION edges (where the story takes you)
  for (let h = 0; h < q.length; h++) for (const v of prog[q[h]]) if (dist[v] == null) { dist[v] = dist[q[h]] + 1; reg[v] = reg[q[h]]; q.push(v) }
  // fallback: reach nodes only linked in by a flee/return via the full graph
  for (let h = 0; h < q.length; h++) for (const v of full[q[h]]) if (dist[v] == null) { dist[v] = dist[q[h]] + 1; reg[v] = reg[q[h]]; q.push(v) }
  const villageIdx = REGIONS.findIndex((r) => r.key === 'village')
  const byRegion = REGIONS.map(() => [])
  for (const id of ids) {
    if (village.has(id)) continue
    byRegion[reg[id] != null ? reg[id] : villageIdx].push(id)
  }
  return byRegion
}

// Precomputed lookups for the whole story: node id → region key, and region key
// → node ids. Village anchor nodes are registered under 'village' (assignRegions
// leaves them out of its buckets, so add them back here).
export const NODE_REGION = {}
export const REGION_NODES = {}
for (const rg of REGIONS) REGION_NODES[rg.key] = []
assignRegions().forEach((list, ri) => {
  const key = REGIONS[ri].key
  for (const id of list) { NODE_REGION[id] = key; REGION_NODES[key].push(id) }
})
for (const id of VILLAGE_ANCHOR_IDS) {
  if (STORY[id] && NODE_REGION[id] == null) { NODE_REGION[id] = 'village'; REGION_NODES.village.push(id) }
}
