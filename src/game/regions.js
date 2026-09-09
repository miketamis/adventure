// ===========================================================================
// THE WORLD'S REGIONS — the single source of truth for which story node belongs
// to which region of the tale chart (the sky, Mount Tomorr, the forest, river, …).
// Lifted out of DebugView so the game logic (area factoids in folklore.js) and
// the debug World Map share ONE region model. DebugView imports REGIONS,
// isWander and assignRegions from here; area factoids use NODE_REGION /
// REGION_NODES to tell when you've explored a whole region.
// ===========================================================================
import { STORY } from './content.js'

// This is intentionally a MYTHIC COMPOSITE, not a survey map of Albania. Named
// places keep their identities (Tomorr is not Gjirokaster; Prespa is not Lake
// Shkodra), while roads arrange tales into a readable game world and the sky /
// underworld use a vertical cosmological axis. Consumers should show this note
// rather than infer real-world cardinal bearings or scale from x/y coordinates.
export const WORLD_CHART = Object.freeze({
  kind: 'mythic-composite',
  scale: 'not-to-scale',
  top: 'mountains and sky',
  left: 'great forest',
  right: 'sea road',
  bottom: 'lakes, castles, and the world below',
})

// The village nodes (≈ the town at the world's centre). This id list MUST match
// the ids in DebugView's VILLAGE_PLACES layout array — they are the same set,
// seen from the two sides (this file assigns/excludes them; DebugView lays them
// out). Village nodes are handled apart from the ringed outer regions.
export const VILLAGE_ANCHOR_IDS = [
  'udhekryq', 'kisha1', 'varret1', 'kostandin1', 'fshatiSheshi', 'pusiThate',
  'nenaDiell1', 'veraDite1', 'dordolec1', 'plaka', 'oda1', 'fshatiLanes',
  'kulle1', 'djepi1', 'pallatiZi', 'kopshtMermer1', 'fshatiJeta', 'vatra',
  'qilim', 'bariu', 'gjysmegjel1', 'syriKeq1', 'breshka1', 'fshatiLumi',
  'uraArtes1', 'mulli1', 'kroi1', 'tabaket1', 'maroShtepi', 'maroTetua',
  'maroHani',
]

export const REGIONS = [
  { key: 'sky', label: 'the sky realm', cx: 300, cy: -1200, rx: 780, ry: 300, terrain: 'sky', anchors: ['qiell1', 'qiellDiell', 'henaPaqe', 'qiellPrende', 'diellShtepi1', 'rrugaDielli1', 'pemaDielli', 'diellThirrKul'] },
  { key: 'mountain', label: 'the highlands & Mount Tomorr', cx: 300, cy: -520, rx: 640, ry: 400, terrain: 'mountain', anchors: ['maja', 'mali1', 'tomor1', 'jutbina', 'peri1', 'tomorBekim', 'tomor2', 'tomor3', 'shpirag1', 'maliStuhi', 'tomorProva', 'tomorZbritje', 'sari1'] },
  { key: 'forest', label: 'the great forest', cx: -520, cy: 430, rx: 380, ry: 470, terrain: 'forest', anchors: ['pylli1', 'start', 'lendina', 'gjumi', 'pylliLoop'] },
  { key: 'river', label: 'the river & the Zana', cx: 250, cy: 1070, rx: 300, ry: 300, terrain: 'river', anchors: ['lumi', 'zana1', 'bolla1', 'ura', 'uraFshaj', 'riddle1', 'zanaProva', 'zanaFole', 'rrethi', 'shpellaHyrje'] },
  { key: 'castle', label: 'the castle country', cx: 300, cy: 1360, rx: 300, ry: 260, terrain: 'castle', anchors: ['kalaNgjitje', 'argjiroKala'] },
  { key: 'lake', label: 'the lake country', cx: 60, cy: 1660, rx: 360, ry: 240, terrain: 'lake', anchors: ['flocka1', 'prespaPyll'] },
  { key: 'sea', label: 'the sea', cx: 1560, cy: 1050, rx: 620, ry: 1180, terrain: 'sea', anchors: ['deti1', 'bregu', 'detiThelle1'] },
  { key: 'underworld', label: 'the world below', cx: 360, cy: 2180, rx: 440, ry: 350, terrain: 'cavern', anchors: ['bota1', 'pusi', 'gjarpri', 'kulshedra1', 'qyteti', 'tre1', 'tre2', 'tre3'] },
  { key: 'village', label: '', cx: 512, cy: 430, rx: 430, ry: 340, terrain: null, anchors: [...VILLAGE_ANCHOR_IDS, 'fshatiDil', 'fshatiBesa', 'fshatiCaul', 'gjizar1'] },
  // the foreign prince's small country past the upper-right tale-road (Maro Përhitura,
  // Act IV) — a pocket of another land at the map's edge, drawn as his palace
  { key: 'princeland', label: "the prince's land", cx: 1050, cy: -40, rx: 200, ry: 160, terrain: null, anchors: ['maroPallati'] },
]

// Named, detached tale-spaces must not drift to whichever BFS seed happens to
// reach them first when authors add a new link. These compact overrides make
// their intended region reviewable and stable; BFS remains a fallback for the
// hundreds of ordinary continuation scenes.
export const REGION_OVERRIDES = Object.freeze({
  // The opening conversation happens at the settled side of the bridgehead.
  // Keep its dialogue turns in the village region instead of letting graph
  // seed order pull early turns into the great forest.
  bisedaUra1: 'village', bisedaUra2: 'village', bisedaUra3: 'village',
  bisedaUraPlan: 'village', bisedaFollowAgree: 'village',
  bisedaShesh: 'village', bisedaKroi: 'village',
  eliraBreg: 'village', eliraEmriBreg: 'village',
  eliraShesh: 'village', eliraEmriShesh: 'village',
  eliraBanore: 'village', eliraEmriBanore: 'village',
  porosiaShesh: 'village',
  pazariFshatit: 'village', pazariPerserit: 'village', porosiaBlerje: 'village',
  sofraMikut: 'village', sofraMikut2: 'village',
  prespaPyll: 'lake', prespaLiri: 'lake', prespaFund: 'lake',
  aliPashaLiqen: 'lake', aliPashaVdes: 'lake', aliPashaRob: 'lake',
  argjiroKala: 'castle', argjiroFund: 'castle', argjiroRob: 'castle',
  sari1: 'mountain', sari2: 'mountain', sariFund: 'mountain',
  haliliDeka: 'mountain', haliliMejdan: 'mountain', haliliJeton: 'mountain',
  gbMuji1: 'mountain', gbMujiFund: 'mountain', gbMujiVdes: 'mountain',
  osmaniBurg: 'mountain', osmaniVdekur: 'mountain', osmaniProvat: 'mountain',
  osmaniVallja: 'mountain', osmaniShpata: 'mountain', osmaniZbuluar: 'mountain',
  osmaniLiri: 'mountain', osmaniRob: 'mountain',
  kreshnikRrembimi1: 'mountain', kreshnikRrembimiBurg: 'mountain',
  kreshnikRrembimiFund: 'mountain', kreshnikRrembimiHumbur: 'mountain',
  kreshnikRrembimiRefuz: 'mountain',
  behuriJutbina: 'mountain', behuriNdarja: 'mountain', behuriBurimi: 'mountain',
  behuriKulla: 'mountain', behuriMejdan: 'mountain', behuriFund: 'mountain',
  behuriKotorHumbur: 'mountain', behuriBurimHumbur: 'mountain',
  behuriKullaHumbur: 'mountain', behuriMejdanHumbur: 'mountain',
  // The road and its drought/Lubia encounters stay at the forest edge even as
  // optional routes lead out to the river. The Blue Eye scenes occupy one
  // emerging river source: the dry bed, the spring and the hand-cut channel.
  udha: 'forest', udheOra: 'forest', udhaThate: 'forest', ujkuUje: 'forest',
  lubia1: 'forest', lubiaKoke: 'forest', lubiaFund: 'forest',
  udhaSyri: 'river', syriKanali: 'river', syriFund: 'river',
  halilGarria1: 'mountain', halilGarriaFund: 'mountain', halilGarriaKeq: 'mountain',
  mujoKale: 'mountain', mujoKaleFund: 'mountain', mujoKaleLarg: 'mountain',
  aliBajr1: 'mountain', aliBajrFund: 'mountain', aliBajrKeq: 'mountain',
  tsHyrje: 'mountain', tsNuse: 'mountain', tsRoje: 'mountain',
  tsZgjim: 'mountain', tsShpeto: 'mountain', tsFundTomor: 'mountain',
  tomorProva: 'mountain', tomorStuhi: 'mountain',
  maroIkja: 'village', maroMesnata: 'village', maroKrushqit: 'village',
  cuckoo1: 'village', cuckooFund: 'village', cuckooLule: 'village',
  dallendyshe1: 'village', dallendysheFund: 'village', dallendysheGjak: 'village',
  maroPrincesha: 'princeland',
  maroPallati: 'princeland', maroLindja: 'princeland', maroZogu: 'princeland',
  maroKopshti: 'princeland', maroFundi: 'princeland', maroCiuCiu: 'princeland',
  kordha1: 'forest', kordha2: 'forest', kordhaMoat: 'forest',
  kordhaMoatVdes: 'forest', kordhaUdha: 'forest', kordhaPallat: 'forest',
  kordhaZjarr: 'forest', kordhaProva: 'forest', kordhaProvaVdes: 'forest',
  kordhaFund: 'forest', kordhaDeti: 'forest',
  gjizarUdha: 'underworld', gjizarPallat: 'underworld', gjizarKap: 'underworld',
  gjizarTradheti: 'underworld', gjizarPus: 'underworld',
  gjizarFund: 'village',
  // The last coast-road vista stands on the dry shore before the route turns
  // inland. The homeward road, builders' house and eagle-tree episode then sit
  // below Rozafa; graph proximity to Tomorr must not pull them into the mountain.
  ktheu3: 'sea', udhaKthimit: 'castle',
  kalaMjegull: 'castle', kalaPlak: 'castle',
  shqipe1: 'castle', shqipe2: 'castle', shqipe3: 'castle',
  shqipeBarter: 'castle', shqipeKapur: 'castle', shqipeFund: 'castle',
  // These scenes are physically inside the sealed lower realm. Leaving them
  // to graph-seed order made the cave ascent inherit `sea` and the explicit
  // lost-below scene inherit `river`, exposing surface horizons underground.
  kthimi: 'underworld', botaHumbur: 'underworld',
  // Hold the sea-well/eagle/black-water chain and the upper cavern junction in
  // their authored regions: new lower-realm seeds must not pull them through
  // a breadth-first tie. (The cave junction is below the river-country mouth;
  // the sea-well chain is drawn at the coast.)
  pusi2: 'sea', shqiponja1: 'sea', mishiVetes: 'sea', rene: 'sea',
  ngjitja1: 'sea', ngjitja2: 'sea', shpellaRruget: 'river',
  binoshetLumi: 'river', binoshetFund: 'river', binoshetHije: 'river',
  binoshetShpata: 'castle', binoshetNata: 'castle', binoshetTeNena: 'castle',
  binoshetZjarri: 'river', binoshetDyKurorat: 'river',
  binoshetKasollja: 'forest',
  binoshetKopshtiZanave: 'mountain',
  binoshetGardhiHanda: 'mountain', binoshetGardhiZjerma: 'mountain', binoshetZambak: 'mountain',
  binoshetDasma: 'mountain', binoshetKuvendi: 'mountain',
  binoshetLuftaFillon: 'castle', binoshetLuftaZgjat: 'castle', binoshetLuftaFund: 'castle',
  binoshetKurora: 'castle',
})

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
  const regionIndex = Object.fromEntries(REGIONS.map((r, i) => [r.key, i]))
  const reg = {}, dist = {}, q = []
  // Explicit assignments win over broad region anchors.
  for (const [id, key] of Object.entries(REGION_OVERRIDES)) {
    if (STORY[id] && prog[id] && regionIndex[key] != null) {
      reg[id] = regionIndex[key]; dist[id] = 0; q.push(id)
    }
  }
  REGIONS.forEach((rg, ri) => rg.anchors.forEach((a) => {
    if (STORY[a] && prog[a] && dist[a] == null) { reg[a] = ri; dist[a] = 0; q.push(a) }
  }))
  // primary: follow PROGRESSION edges (where the story takes you)
  for (let h = 0; h < q.length; h++) for (const v of prog[q[h]]) if (dist[v] == null) { dist[v] = dist[q[h]] + 1; reg[v] = reg[q[h]]; q.push(v) }
  // fallback: reach nodes only linked in by a flee/return via the full graph
  for (let h = 0; h < q.length; h++) for (const v of full[q[h]]) if (dist[v] == null) { dist[v] = dist[q[h]] + 1; reg[v] = reg[q[h]]; q.push(v) }
  const villageIdx = REGIONS.findIndex((r) => r.key === 'village')
  const byRegion = REGIONS.map(() => [])
  for (const id of ids) {
    if (village.has(id)) continue
    const forced = REGION_OVERRIDES[id]
    byRegion[forced && regionIndex[forced] != null ? regionIndex[forced] : reg[id] != null ? reg[id] : villageIdx].push(id)
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
