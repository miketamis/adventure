// MAP AUDIT — THE RULE: the map and the story stay accurate to one another,
// and everything explorable is represented on the map. Mechanically enforced:
// these checks read the story graph (content.js) against the hand-placed map
// (nodePositions.js), the region model (regions.js) and the DRAWN layers
// (mapGlyphs.jsx landmarks, DebugView.jsx village places). Runs automatically
// at the end of `node scripts/audit.mjs`; run alone after ANY reposition or
// story-edge edit:
//   node scripts/mapaudit.mjs
// The map is the real (rotated) Albania: sky/Tomorr at NEGATIVE y (top), the
// underworld at LARGE y (bottom) — so "up" (lart/ngjit) must DECREASE y and
// "down" (poshtë/zbrit) must INCREASE it, everywhere, even below ground.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { STORY } from '../src/game/content.js'
import { NODE_AT, NODE_POS, PLACE_OF, PLACE_NODES } from '../src/components/nodePositions.js'
import { PLACE_META } from '../src/components/placeMeta.js'
import { REGIONS, NODE_REGION, VILLAGE_ANCHOR_IDS, isWander, LOST_SINKS } from '../src/game/regions.js'
import { NPCS } from '../src/game/npcs.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const RG = Object.fromEntries(REGIONS.map((r) => [r.key, r]))
const reg = (id) => NODE_REGION[id] || 'village'
const ids = Object.keys(STORY)
const idsOf = (toks) => (toks || []).filter((t) => t && t.id).map((t) => t.id)
let failures = 0, checks = 0
const section = (ok, title, lines = []) => {
  console.log(`${ok ? '✅' : '❌'} ${title}`)
  for (const l of lines) console.log('   ' + l)
  checks++
  if (!ok) failures++
}

// every real (non-confuser) edge, with geometry. `sink` (edge INTO a lost/sleep
// sink — see LOST_SINKS in regions.js) is the ONLY geometry exemption: getting
// lost or falling asleep is narrative, not a walk. Flee ("ik") and return
// ("kthehu") roads are held to the map like any other — the old blanket wander
// exemption let pylliLoop<->udhekryq teleport across the world unseen.
const edges = []
for (const id of ids) for (const o of STORY[id].options || []) {
  if (o.confuser || !o.to || !STORY[o.to]) continue
  const a = NODE_POS[id], b = NODE_POS[o.to]
  if (!a || !b) continue
  edges.push({ from: id, to: o.to, o, dx: b[0] - a[0], dy: b[1] - a[1], len: Math.hypot(b[0] - a[0], b[1] - a[1]), wander: isWander(o), sink: LOST_SINKS.has(o.to) })
}

// ---- 0. every node is placed --------------------------------------------------
const unplaced = ids.filter((id) => !NODE_POS[id])
section(!unplaced.length, `every story node has a map position (${ids.length - unplaced.length}/${ids.length})`, unplaced.map((id) => 'UNPLACED: ' + id))

// ---- 1. region containment ---------------------------------------------------
// A node should sit inside (or on the fringe of) the region the BFS assigns it.
// Known-fine outliers (each verified by hand — see the world-map-rerig memory):
//   humbur/ora*/botaHumbur — "you got lost" wander-sinks, region comes from the
//     fallback BFS and is arbitrary; they're drawn in the dark on purpose.
//   kthimi — walks the underworld toward the well-exit whose cluster surfaces at
//     the COAST; anchoring it underworld would drag pusi2/shqiponja/ngjitja down.
//   rrugaDielli2 — the sun-quest tail: the stag's escape ENDS at the village,
//     but it belongs to the sky quest for area factoids.
//   start — the bridgehead before the city, seeded as a forest anchor.
//   balozMotra/Tribut/Zgjedh/Fitore — Gjergj Elez Alia's tower stands on the
//     SHORE of the Drin bay (west of the sea ellipse) but the arc is a sea tale.
//   shtepia — "Home Again" is drawn at your village hearth; its region stays
//     castle (it's reached down the castle road) — do NOT anchor it village, or
//     its BFS wave would drag the ktheu walk-home chain out of the sea.
//   gjarperKulshedra/KulVdes/BurrFund — "ti je në detin": the snake-husband
//     search ends BEYOND the sea; the tale's region stays underworld (where it
//     is told) — anchoring them sea would pull gjarperKerkim off the dark road.
const CONTAIN_ALLOW = new Set(['humbur', 'oraBardhe', 'oraZeze', 'oraVerdhe', 'botaHumbur', 'kthimi', 'rrugaDielli2', 'start', 'balozMotra', 'balozTribut', 'balozZgjedh', 'balozFitore', 'shtepia', 'gjarperKulshedra', 'gjarperKulVdes', 'gjarperBurrFund'])
const outliers = []
for (const id of ids) {
  const p = NODE_POS[id], r = RG[reg(id)]
  if (!p || !r || !r.rx || CONTAIN_ALLOW.has(id)) continue
  const d = Math.hypot((p[0] - r.cx) / r.rx, (p[1] - r.cy) / r.ry)
  if (d > 1.35) outliers.push(`${id} @ [${p}] assigned=${reg(id)} dist=${d.toFixed(2)}`)
}
section(!outliers.length, 'region containment (node sits in its assigned region)', outliers)

// ---- 2. vertical language matches the map ------------------------------------
// Up-words must go up the map (dy<0), down-words down (dy>0). Same-spot and
// short hops are exempt (|dy|<=100 — local scene movement, not a journey).
const UP = new Set(['lart', 'ngjit', 'ngjitu', 'ngjitem', 'hip'])
const DOWN = new Set(['poshte', 'zbrit', 'zbres', 'zbrite'])
// qiell1->qiellErera1: the winds' hollow hangs on the sky-plateau's east lip —
// the terrSky art anchors it there; the storm road still ends UP at qiell2.
const VERT_ALLOW = new Set(['qiell1->qiellErera1'])
const vertBad = []
for (const e of edges) {
  if (e.sink || VERT_ALLOW.has(`${e.from}->${e.to}`)) continue
  const toks = idsOf(e.o.text)
  const up = toks.some((t) => UP.has(t)), down = toks.some((t) => DOWN.has(t))
  if (up === down || Math.abs(e.dy) <= 100) continue // no/conflicting direction, or local
  if (up && e.dy > 0) vertBad.push(`UP-word but goes DOWN ${e.dy}: ${e.from} -> ${e.to} ("${toks.join(' ')}")`)
  if (down && e.dy < 0) vertBad.push(`DOWN-word but goes UP ${e.dy}: ${e.from} -> ${e.to} ("${toks.join(' ')}")`)
}
section(!vertBad.length, 'vertical language (lart/ngjit up, poshtë/zbrit down)', vertBad)

// ---- 3. interaction verbs don't teleport --------------------------------------
// Talking to / listening to / taking / touching something acts on what is HERE:
// the edge must stay local. Only movement verbs may cross the map.
const INTERACT = new Set(['fol', 'degjo', 'merr', 'jep', 'prek', 'tund', 'pi', 'ha', 'beso', 'lufto', 'ndihmo', 'pyet', 'thote', 'zgjedh', 'kendo', 'luaj', 'prit', 'rri', 'fle', 'puth', 'hap', 'ndiz', 'bej', 'mbaj', 'lidh', 'pre', 'hidh', 'sheh'])
const INTERACT_MAX = 400
// Verified narrative scene-shifts (the action happens here, the STORY then
// carries you elsewhere before the next node):
//   gjumi->shokuUjk/eaten — the wolf met at your sleeping-place is the SAME wolf
//     of the deep-forest den, where its node (and other parent edge) lives.
//   pemaDielli->rrugaDielli2 — you speak from the tree; the stag then carries
//     the maiden the whole road home to the village.
const INTERACT_ALLOW = new Set(['gjumi->shokuUjk', 'gjumi->eaten', 'pemaDielli->rrugaDielli2'])
const farInteract = []
for (const e of edges) {
  if (e.sink || INTERACT_ALLOW.has(`${e.from}->${e.to}`)) continue
  const v = idsOf(e.o.text)[0]
  if (INTERACT.has(v) && e.len > INTERACT_MAX) farInteract.push(`${Math.round(e.len)} ${e.from} -> ${e.to} ("${idsOf(e.o.text).join(' ')}")`)
}
section(!farInteract.length, `interaction verbs stay local (<= ${INTERACT_MAX})`, farInteract)

// ---- 4a. same spot is AUTHORED, never accidental -------------------------------
// One physical place = ONE coordinate, written once (its anchor node); everyone
// else standing there says `id: 'anchor'`. Two different anchors sharing exact
// numbers = a collision that should be either an alias or a nudge apart.
const anchorAt = {}
const collide = []
for (const [a, v] of Object.entries(NODE_AT)) {
  if (!Array.isArray(v)) continue
  const k = v[0] + ',' + v[1]
  if (anchorAt[k]) collide.push(`[${k}] '${a}' + '${anchorAt[k]}' — same spot must be authored (${a}: '${anchorAt[k]}') or nudged apart`)
  else anchorAt[k] = a
}
section(!collide.length, 'same spot is hand-authored (no accidental coordinate collisions)', collide)

// ---- 4b. location cards match the world -----------------------------------------
// PLACE_META (the hand-authored "what can happen here" card) must reference real
// places and real scenes: every key is a place ANCHOR, every happening node
// belongs to that place, and no node is claimed by two happenings.
const metaBad = []
for (const [anchor, meta] of Object.entries(PLACE_META)) {
  const members = PLACE_NODES[anchor]
  if (!members) { metaBad.push(`'${anchor}' is not a place anchor (see NODE_AT)`); continue }
  const set = new Set(members), seen = new Set()
  for (const h of meta.happenings || []) for (const id of h.nodes) {
    if (!STORY[id]) metaBad.push(`'${anchor}' → "${h.title}": '${id}' is not a story node`)
    else if (!set.has(id)) metaBad.push(`'${anchor}' → "${h.title}": '${id}' does not stand at this place (it's at '${PLACE_OF[id] || '?'}')`)
    if (seen.has(id)) metaBad.push(`'${anchor}': '${id}' appears in two happenings`)
    seen.add(id)
  }
}
section(!metaBad.length, `location cards reference real places & scenes (${Object.keys(PLACE_META).length} authored)`, metaBad)

// ---- 4. same-spot groups are story-connected ----------------------------------
// Standing at one place MEANS "the story continues at this physical place",
// so the group must hang together through story edges — directly, or through a
// COMMON NEIGHBOUR one hop outside (siblings fanned out from a parent scene).
// A pair with no such path = nodes wrongly declared to share a spot.
const byPlace = {}
for (const id of ids) { if (!NODE_POS[id]) continue; (byPlace[PLACE_OF[id] || id] ||= []).push(id) }
const adj = {}
for (const id of ids) adj[id] = new Set()
for (const e of edges) { adj[e.from].add(e.to); adj[e.to].add(e.from) }
const splitGroups = []
for (const [k, group] of Object.entries(byPlace)) {
  if (group.length < 2) continue
  const halo = new Set(group)
  for (const id of group) for (const n of adj[id]) halo.add(n)
  const seen = new Set([group[0]]), q = [group[0]]
  while (q.length) for (const n of adj[q.pop()]) if (halo.has(n) && !seen.has(n)) { seen.add(n); q.push(n) }
  const missing = group.filter((id) => !seen.has(id))
  if (missing.length) splitGroups.push(`@ '${k}' [${NODE_POS[k]}]: [${group.join(', ')}] — unlinked: ${missing.join(', ')}`)
}
section(!splitGroups.length, 'same-spot groups are story-connected', splitGroups)

// ---- 5. no stranded nodes ------------------------------------------------------
// A node whose EVERY story neighbour (in or out, wander included) is far away
// was probably dropped in the wrong place.
const STRAND_MAX = 800
// henaPaqe — the Moon's terrace stands across the sky from the Sun by design;
// "kerko hene" is a deliberate journey over the cloud-plateau.
const STRAND_ALLOW = new Set(['henaPaqe'])
const stranded = []
for (const id of ids) {
  const p = NODE_POS[id]
  if (!p || !adj[id].size || STRAND_ALLOW.has(id)) continue
  const dmin = Math.min(...[...adj[id]].map((n) => NODE_POS[n] ? Math.hypot(NODE_POS[n][0] - p[0], NODE_POS[n][1] - p[1]) : Infinity))
  if (dmin > STRAND_MAX) stranded.push(`${id} @ [${p}] nearest story neighbour ${Math.round(dmin)} away`)
}
section(!stranded.length, `no stranded nodes (some neighbour within ${STRAND_MAX})`, stranded)

// ---- 6. odd links (cross-region long edges) are all KNOWN journeys ------------
// Mirror of the debug map's ⚡ detector. Every entry here was walked through the
// story and verified to be a real journey — a NEW one appearing means either a
// new teleport bug or a new journey to verify (then add it below).
// This check covers flee/return ("ik"/"kthehu") edges too — only edges INTO a
// lost/sleep sink are exempt. A road is a road whichever way you walk it.
const JOURNEY_ALLOW = new Set([
  'tomorZbritje->pusi',      // the descent from Tomorr to the well's mouth
  'rrethi->dhia1',           // "ec lart" — up the mountainside to the stone wedding
  'ktheu3->udhaKthimit',     // the long way home from the coast
  'fshatiDil->pylli1',       // leaving the village into the great forest
  'mali1->qiell1',           // the ascent into the sky realm
  'qiell1->mali1',           // and the climb back down to Tomorr (the sky is not a trap)
  'rrethi->pusi',            // down to the well the zana pointed out
  'lumi->deti1',             // following the dry river down to the sea
  'udhekryq->lumi',          // crossroads down to the river
  'shpellaHyrje->qyteti',    // Durham's cavern "runs miles underground" to the dead city
  'shpellaRruget->qyteti',   // the middle road of the cavern fork — same miles-long passage
  'fshatiCaul->mali1',       // village up the mountain road
  'rrugaDielli2->fshatiLanes', // the stag's run ends at the back lanes
  'mali1->udhekryq',         // mountain road back to the crossroads
  'udhekryq->mali1',         // and out again
  'gjarperKerkim->gjarperKulshedra', // the wife's search for her snake-husband, beyond the sea
  'shqipe1->shtepia',        // walking on home from the eagle's tree (an "ec larg" keeper)
  'lumi->flocka1',           // "larg është një liqen" — the far walk down to Lake Shkodra
  // return legs — the same verified roads, walked back the way you came:
  'pylli1->fshatiDil',       // out of the great forest, down the road to the village gate
  'lumi->udhekryq',          // back up from the river to the crossroads
  'flocka1->lumi',           // back up the lakeshore walk from Lake Shkodra
  'deti1->lumi',             // back up the dry river from the sea
  'qyteti->shpellaHyrje',    // the miles-long cavern passage, walked back to its river mouth
  'qytetiUdhetar->shpellaHyrje',  // (the traveller scenes stand in the same dead city)
  'qytetiUdhetar2->shpellaHyrje',
  'qytetiUdhetar3->shpellaHyrje',
  'qytetiUdhetar4->shpellaHyrje',
  // the forest road from the crossroads — ends at the wood's EDGE (pylli1),
  // never inside the deep forest (the old pylliLoop teleport):
  'udhekryq->pylli1',
  // recoveries — the lost walker's long trek back to the road (each *Humbur
  // scene says "larg është udhëkryq" and udhekryq greets them by name):
  'maliHumbur->udhekryq',    // down out of the cloud on Tomorr
  'lumiHumbur->udhekryq',    // up from the flooding riverbank
  'botaHumbur->udhekryq',    // the long climb up out of the dark below
  // compressed walk-home ENDINGS ("kthehu në fshat" closes the game at the hearth):
  'siperfaqja->shtepia',     // home from the well's mouth at the coast
  'ktheu1->shtepia',         // home from the world-road (skipping its dangers)
])
const oddNew = []
for (const e of edges) {
  if (e.sink || e.len <= 500 || reg(e.from) === reg(e.to)) continue
  const key = `${e.from}->${e.to}`
  if (!JOURNEY_ALLOW.has(key)) oddNew.push(`${Math.round(e.len)} ${key} (${reg(e.from)} -> ${reg(e.to)})`)
}
section(!oddNew.length, `odd links: every cross-region edge >500 is a verified journey (${JOURNEY_ALLOW.size} known)`, oddNew)

// ---- 6b. roads connect Voronoi-NEIGHBOURING places -------------------------------
// A road from A to B should step straight from A's ground onto B's. Carve the
// map into territories (the Voronoi cell of every place anchor; lost/sleep
// sinks excluded — their spots are narrative, not land) and walk the straight
// path: if a THIRD place owns a substantial stretch of it, the road marches
// through that place's territory without stopping there — a teleport past a
// real stop. Route it via the intermediate place, or verify it below. Verified
// journeys (JOURNEY_ALLOW) compress real distance by design and are exempt.
// Catches what check 6 cannot: same-region hops and sub-500 skips.
const VOR_MAX = 180 // px of one foreign territory a road may brush through
const VOR_LOCAL = 60 // a place this close to either endpoint is the same locality, not a skipped stop
const VORONOI_ALLOW = new Set([
  'kthimi->pusi2',           // the dark walk under the world to the far well (also CROSS_ALLOW)
  'pemaDielli->rrugaDielli2', // the stag CARRIES the maiden home in one ride (also INTERACT_ALLOW)
  'siperfaqja->bregu',       // the shore walk south passes the baloz battle-ground (sea-arc moments, not way-stops)
  'maja->jutbina',           // the highland path crosses the zanas' night-meadow above the hamlet…
  'jutbina->maja',           // …a quest glade (mujiZana1), not a road-stop, in both directions
  'qiell2->qiellPrende',     // "bie në tokë" — a FALL from the storm peak; you drop over the sky, no stops
  'qiellDiell->henaPaqe',    // the deliberate Moon trek across the cloud-plateau (see STRAND_ALLOW henaPaqe)
])
const vorSites = Object.keys(byPlace).filter((k) => !LOST_SINKS.has(k)).map((k) => ({ k, x: NODE_POS[k][0], y: NODE_POS[k][1] }))
const vorBad = []
for (const e of edges) {
  if (e.sink) continue
  const A = PLACE_OF[e.from] || e.from, B = PLACE_OF[e.to] || e.to
  if (A === B) continue
  const key = `${e.from}->${e.to}`
  if (JOURNEY_ALLOW.has(key) || VORONOI_ALLOW.has(key)) continue
  const [ax, ay] = NODE_POS[e.from], [bx, by] = NODE_POS[e.to]
  const n = Math.max(2, Math.round(e.len / 6))
  const own = {}
  for (let i = 1; i < n; i++) {
    const x = ax + ((bx - ax) * i) / n, y = ay + ((by - ay) * i) / n
    let c = null, bd = Infinity
    for (const s of vorSites) {
      const d = (s.x - x) ** 2 + (s.y - y) ** 2
      if (d < bd) { bd = d; c = s.k }
    }
    if (c !== A && c !== B) own[c] = (own[c] || 0) + 1
  }
  const worst = Object.entries(own)
    .filter(([k]) => { // a scene standing at the road's end is the same locality
      const [sx, sy] = NODE_POS[k]
      return Math.hypot(sx - ax, sy - ay) >= VOR_LOCAL && Math.hypot(sx - bx, sy - by) >= VOR_LOCAL
    })
    .map(([k, c]) => [k, (c / (n - 1)) * e.len]).sort((p, q) => q[1] - p[1])[0]
  if (worst && worst[1] > VOR_MAX) vorBad.push(`${Math.round(worst[1])}px through '${worst[0]}': ${key} (${Math.round(e.len)} total, "${idsOf(e.o.text).join(' ')}")`)
}
section(!vorBad.length, `roads connect Voronoi-neighbouring places (<= ${VOR_MAX}px through a third territory)`, vorBad)

// ---- 7. no near-collisions -----------------------------------------------------
// Two DISTINCT places closer than 16px render as an unreadable smudge — either
// declare them the same spot (alias) or pull them apart.
const locs = Object.entries(byPlace).map(([k, v]) => { const [x, y] = NODE_POS[k]; return { x, y, v } })
const nearHits = []
for (let i = 0; i < locs.length; i++) for (let j = i + 1; j < locs.length; j++) {
  const d = Math.hypot(locs[i].x - locs[j].x, locs[i].y - locs[j].y)
  if (d > 0 && d < 16) nearHits.push(`${d.toFixed(1)} ${locs[i].v[0]} <-> ${locs[j].v[0]}`)
}
section(!nearHits.length, 'no near-collisions (distinct spots >= 16px apart)', nearHits)

// ---- 8-10. the DRAWN map matches the story (landmarks & village places) --------
// The JSX layers can't be imported under node — parse the bits we audit.
const glyphsSrc = readFileSync(join(ROOT, 'src/components/mapGlyphs.jsx'), 'utf8')
const debugSrc = readFileSync(join(ROOT, 'src/components/DebugView.jsx'), 'utf8')
const LANDMARKS = [...glyphsSrc.matchAll(/\{ id: '([^']+)', glyph: '(\w+)', label: [^,]+, x: (-?\d+), y: (-?\d+) \}/g)]
  .map((m) => ({ id: m[1], glyph: m[2], x: +m[3], y: +m[4] }))
const VILLAGE_PLACE_IDS = [...debugSrc.matchAll(/^\s*\{ id: '([^']+)', x: -?\d+, y: -?\d+, type: '/gm)].map((m) => m[1])

// 8. a landmark whose id isn't a STORY node NEVER renders (the old 'ujk'/'treg' bug)
section(LANDMARKS.length > 30 && !LANDMARKS.some((lm) => !STORY[lm.id]),
  `every landmark is a real story node (${LANDMARKS.length} landmarks)`,
  LANDMARKS.filter((lm) => !STORY[lm.id]).map((lm) => `dead landmark id '${lm.id}' (${lm.glyph}) — not in STORY, it never renders`))

// 9. a landmark must draw exactly where its node lives — otherwise the glyph
// stands in one place while the node's edges/stack anchor in another.
section(!LANDMARKS.some((lm) => STORY[lm.id] && NODE_POS[lm.id] && (NODE_POS[lm.id][0] !== lm.x || NODE_POS[lm.id][1] !== lm.y)),
  'landmark position == NODE_POS (same-spot sync)',
  LANDMARKS.filter((lm) => STORY[lm.id] && NODE_POS[lm.id] && (NODE_POS[lm.id][0] !== lm.x || NODE_POS[lm.id][1] !== lm.y))
    .map((lm) => `'${lm.id}' glyph at [${lm.x},${lm.y}] but node at [${NODE_POS[lm.id]}] — sync BOTH when moving a node`))

// 10. the village's two lists (drawn places in DebugView, anchors in regions.js)
// are one set seen from two sides; and every drawn place is a real node.
section(!VILLAGE_PLACE_IDS.some((id) => !STORY[id])
  && !VILLAGE_ANCHOR_IDS.some((id) => !VILLAGE_PLACE_IDS.includes(id))
  && !VILLAGE_PLACE_IDS.some((id) => !VILLAGE_ANCHOR_IDS.includes(id)),
  `village places == village anchors (${VILLAGE_PLACE_IDS.length} places)`, [
    ...VILLAGE_PLACE_IDS.filter((id) => !STORY[id]).map((id) => `drawn village place '${id}' is not a STORY node`),
    ...VILLAGE_ANCHOR_IDS.filter((id) => !VILLAGE_PLACE_IDS.includes(id)).map((id) => `anchor '${id}' (regions.js) has no drawn place in DebugView`),
    ...VILLAGE_PLACE_IDS.filter((id) => !VILLAGE_ANCHOR_IDS.includes(id)).map((id) => `drawn place '${id}' missing from VILLAGE_ANCHOR_IDS (regions.js)`),
  ])

// ---- 11. no drift in the data files ---------------------------------------------
section(!Object.keys(NODE_POS).some((id) => !STORY[id]) && !REGIONS.some((rg) => rg.anchors.some((a) => !STORY[a])),
  'no stale placements / anchors (every NODE_POS id + region anchor is a real node)', [
    ...Object.keys(NODE_POS).filter((id) => !STORY[id]).map((id) => `stale NODE_POS entry '${id}' — node no longer in STORY`),
    ...REGIONS.flatMap((rg) => rg.anchors.filter((a) => !STORY[a]).map((a) => `region '${rg.key}' anchors missing node '${a}'`)),
  ])

// ---- WARN: whole areas hiding in one dot ----------------------------------------
// >8 scenes on one coordinate usually means an explorable AREA is invisible on
// the map — spread it into drawn sub-places (like the Sun's compound, Jutbina,
// or the underworld living quarter), unless it truly is ONE room.
const BIG_STACK_OK = {
  libriDiell: 'the oda — one guest-room, a whole evening of talk (oda scenes + the travellers\' tales)',
  gjizar2: 'gjizar\'s tale — told as one thread at the back-lane spot (candidate for a future drawn spread)',
}
const bigStacks = Object.entries(byPlace).filter(([k, v]) => v.length > 8 && !BIG_STACK_OK[k])
if (bigStacks.length) {
  console.log('')
  for (const [k, v] of bigStacks) console.log(`⚠ ${v.length} scenes share '${k}' [${NODE_POS[k]}] — a whole area may be hiding in one dot; draw it out into sub-places (or allowlist in BIG_STACK_OK with a reason): ${v.join(', ')}`)
}

// ---- 12. "ketu" (here) options stay put -----------------------------------------
// "prit ketu" / "fle ketu" / "rri ketu" happen AT this spot — the edge must be
// (near-)zero length. Sharper than check 3: the word itself asserts locality.
const ketuBad = []
for (const e of edges) {
  if (e.sink) continue // "fle ketu" -> gjumi: sleep happens here, the DREAM stands at the sleeping-ground
  if (idsOf(e.o.text).includes('ketu') && e.len > 150) ketuBad.push(`${Math.round(e.len)} ${e.from} -> ${e.to} ("${idsOf(e.o.text).join(' ')}")`)
}
section(!ketuBad.length, '"ketu" options stay put (<= 150)', ketuBad)

// ---- 13. named destinations land in the named region ------------------------------
// A movement/return option that NAMES a landmark noun must arrive in that noun's
// region — OR at a scene whose own text SHOWS the named thing (the village's
// river-quarter IS the lume; the drowned palace IS a kala in the sea). Only
// unambiguous nouns are mapped (qytet/pus/shpelle name two places each —
// skipped). Wander edges included: a named return still lands somewhere.
const DEST_REGION = {
  det: ['sea'], mal: ['mountain', 'sky'], lume: ['river'], pyll: ['forest'],
  qiell: ['sky'], kala: ['castle'], fshat: ['village'], liqen: ['lake'],
  jutbina: ['mountain'], maja: ['mountain', 'sky'], tomor: ['mountain', 'sky'],
}
// Verified journey-legs where the goal lies BEYOND the flagged stop:
const DEST_ALLOW = new Set([
  'ktheu3->udhaKthimit',     // "shko në fshat" — the last leg of the road home; the village is past the castle
])
const MOVE = new Set(['shko', 'ec', 'kthehu', 'zbrit', 'ngjit', 'kalo', 'hyr', 'vrapo', 'hip', 'ndiq'])
const nodeWords = (id) => new Set((STORY[id].text || []).flatMap((e) => idsOf(Array.isArray(e) ? e : e.line)))
const destBad = []
for (const e of edges) {
  if (DEST_ALLOW.has(`${e.from}->${e.to}`)) continue
  const toks = idsOf(e.o.text)
  if (!MOVE.has(toks[0])) continue
  const shown = nodeWords(e.to)
  for (const t of toks.slice(1)) {
    const want = DEST_REGION[t]
    if (want && !want.includes(reg(e.to)) && !shown.has(t)) destBad.push(`"${toks.join(' ')}": ${e.from} -> ${e.to} lands in ${reg(e.to)}, not ${want.join('/')}, and the scene doesn't show a ${t}`)
  }
}
section(!destBad.length, 'named destinations land in the named region (or the scene shows the thing)', destBad)

// ---- 14. journeys don't cut through impassable realms ------------------------------
// A walking edge between two SURFACE nodes must not pass through the core of the
// sea, the world below, or the sky — you cannot stroll through open water, solid
// rock, or the air. (Edges touching the realm itself are that realm's business.)
const IMPASSABLE = ['sea', 'underworld', 'sky']
// kthimi->pusi2: the climb OUT of the world below, up the well shaft to the coast.
const CROSS_ALLOW = new Set(['kthimi->pusi2'])
const segDistToOrigin = (ax, ay, bx, by) => {
  const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy || 1
  const t = Math.max(0, Math.min(1, -(ax * dx + ay * dy) / L2))
  return Math.hypot(ax + t * dx, ay + t * dy)
}
const crossBad = []
for (const e of edges) {
  if (e.sink || CROSS_ALLOW.has(`${e.from}->${e.to}`)) continue
  const a = NODE_POS[e.from], b = NODE_POS[e.to]
  for (const key of IMPASSABLE) {
    if (reg(e.from) === key || reg(e.to) === key) continue
    const r = RG[key]
    const d = segDistToOrigin((a[0] - r.cx) / r.rx, (a[1] - r.cy) / r.ry, (b[0] - r.cx) / r.rx, (b[1] - r.cy) / r.ry)
    if (d < 0.6) crossBad.push(`${e.from} -> ${e.to} cuts through the ${key} core (${d.toFixed(2)})`)
  }
}
section(!crossBad.length, 'journeys avoid impassable realm cores (sea/underworld/sky)', crossBad)

// ---- 15. land stays on land (the drawn coastline is authoritative) -----------------
// seaCoastX is EXTRACTED from DebugView.jsx at run time, so this check can never
// drift from the drawn coast. Any non-sea node east of the waterline is a land
// scene drawn in open water; a sea node far inland is the reverse.
const coastSrc = debugSrc.match(/const seaCoastX = \(y\) => \{([\s\S]*?)\n\}/)
const seaCoastX = coastSrc && new Function('y', coastSrc[1])
const coastBad = []
if (seaCoastX) {
  for (const id of ids) {
    const p = NODE_POS[id]
    if (!p) continue
    const coast = seaCoastX(p[1])
    if (CONTAIN_ALLOW.has(id)) continue // documented coast/realm exceptions above
    if (reg(id) !== 'sea' && p[0] > coast + 40) coastBad.push(`${id} @ [${p}] (${reg(id)}) is ${Math.round(p[0] - coast)} into open water`)
    if (reg(id) === 'sea' && p[0] < coast - 150) coastBad.push(`${id} @ [${p}] (sea) is ${Math.round(coast - p[0])} inland of the coast`)
  }
}
section(!!seaCoastX && !coastBad.length, 'land nodes on land, sea nodes at sea (drawn coastline)', seaCoastX ? coastBad : ['could not extract seaCoastX from DebugView.jsx'])

// ---- 16. no duplicate ungated paths -------------------------------------------------
// Two options from one node to the SAME target with identical gating AND identical
// effects (grant/consume/reveal) are one choice wearing two labels (the old
// jutbina 'kerko zanat'/'kerko fuqi' bug). Differing effects = a real choice.
// riddle1: both WRONG riddle answers stray off the path together — intended.
const DUP_ALLOW = new Set(['riddle1'])
const dupBad = []
for (const id of ids) {
  if (DUP_ALLOW.has(id)) continue
  const seen = {}
  for (const o of STORY[id].options || []) {
    if (o.confuser || !o.to || !STORY[o.to]) continue
    const key = o.to + '|' + JSON.stringify([o.requires ?? null, o.unless ?? null, o.time ?? null, o.grant ?? null, o.consumes ?? null, o.reveal ?? null])
    if (seen[key]) dupBad.push(`${id}: "${idsOf(seen[key].text).join(' ')}" and "${idsOf(o.text).join(' ')}" both -> ${o.to} with identical gates+effects`)
    else seen[key] = o
  }
}
section(!dupBad.length, 'no duplicate ungated paths to one destination', dupBad)

// ---- 17. "larg" (far) lures actually point far --------------------------------------
// A scene line opening with "larg është/rri X" promises a JOURNEY; if the option
// that follows X lands within arm's reach, the lure lies about the map.
const lureBad = []
for (const id of ids) {
  const lines = (STORY[id].text || []).map((e) => (Array.isArray(e) ? e : e.line))
  const farNouns = new Set()
  for (const l of lines) {
    const t = idsOf(l)
    if (t[0] === 'larg') for (const w of t.slice(1)) if (DEST_REGION[w] || STORY[w]) farNouns.add(w)
  }
  if (!farNouns.size) continue
  for (const o of STORY[id].options || []) {
    if (o.confuser || !o.to || !STORY[o.to] || !NODE_POS[id] || !NODE_POS[o.to]) continue
    const toks = idsOf(o.text)
    if (!MOVE.has(toks[0])) continue
    const named = toks.find((t) => farNouns.has(t))
    if (!named) continue
    const len = Math.hypot(NODE_POS[o.to][0] - NODE_POS[id][0], NODE_POS[o.to][1] - NODE_POS[id][1])
    if (len < 120) lureBad.push(`${id}: says "larg … ${named}" but "${toks.join(' ')}" -> ${o.to} is only ${Math.round(len)} away`)
  }
}
section(!lureBad.length, '"larg" lures point somewhere actually far (>= 120)', lureBad)

// ---- 18. "ti je në X" prose stands where it says -----------------------------------
// A scene line asserting WHERE YOU ARE ("ti je … në <landmark>") must be drawn
// in (or on the fringe of) that landmark's region. POSITION-based, deliberately
// NOT assignment-based: prose describes where you STAND; a node's region
// assignment may legitimately differ (factoid semantics — see CONTAIN_ALLOW).
// A line naming several landmarks passes if ANY of them fits ("një fshat të
// det" — a sea-village — passes at the coast).
const PLACE_REGION = { ...DEST_REGION, bote: ['underworld'] }
// fshatiLumi — the village RIVER-QUARTER: the river as drawn runs through town
// (the start bridge crosses it); the 'river' REGION ellipse only covers the
// Zana stretch downstream, so the ellipse test can't see the in-town bank.
const PROSE_ALLOW = new Set(['fshatiLumi'])
const proseBad = []
for (const id of ids) {
  const p = NODE_POS[id]
  if (!p || PROSE_ALLOW.has(id)) continue
  for (const e of STORY[id].text || []) {
    const t = idsOf(Array.isArray(e) ? e : e.line)
    if (t[0] !== 'ti' || t[1] !== 'je') continue
    const nouns = t.filter((w) => PLACE_REGION[w])
    if (!nouns.length) continue
    const ok = nouns.some((n) => PLACE_REGION[n].some((key) => {
      const r = RG[key]
      return r && r.rx && Math.hypot((p[0] - r.cx) / r.rx, (p[1] - r.cy) / r.ry) <= 1.35
    }))
    if (!ok) proseBad.push(`${id} @ [${p}]: says "ti je … ${nouns.join('/')}" but stands nowhere near ${nouns.map((n) => PLACE_REGION[n].join('/')).join(', ')}`)
  }
}
section(!proseBad.length, '"ti je në X" prose stands where it says', proseBad)

// ---- 19. NPC routes walk real roads --------------------------------------------
// A walking NPC (npcs.js) moves scene to scene like the player: every route step
// (and a looping route's wrap-around) must be a real, non-confuser story edge,
// and no route node may be an ending screen. The story side is held to the same
// truth: an npc:/npcAt: condition must name a defined NPC; `npc:<id>` only fires
// where the NPC actually walks, and `npcAt:<id>:<node>` only at route nodes.
const hasEdge = (a, b) => (STORY[a]?.options || []).some((o) => !o.confuser && o.to === b)
const npcBad = []
for (const [nid, npc] of Object.entries(NPCS)) {
  for (const r of npc.route) {
    if (!STORY[r]) npcBad.push(`${nid}: route node '${r}' is not a STORY node`)
    else if (STORY[r].end) npcBad.push(`${nid}: route node '${r}' is an ending screen`)
  }
  const steps = npc.once ? npc.route.length - 1 : npc.route.length
  for (let i = 0; i < steps; i++) {
    const a = npc.route[i], b = npc.route[(i + 1) % npc.route.length]
    if (STORY[a] && STORY[b] && a !== b && !hasEdge(a, b))
      npcBad.push(`${nid}: ${a} -> ${b} is not a story edge — NPCs walk the real roads`)
  }
}
const npcConds = []
for (const id of ids) {
  for (const e of STORY[id].text || []) if (!Array.isArray(e) && typeof e.cond === 'string') npcConds.push([id, e.cond])
  for (const o of STORY[id].options || [])
    for (const c of [o.requires, o.unless].flatMap((v) => (v == null ? [] : [].concat(v)))) npcConds.push([id, c])
}
for (const [id, c] of npcConds) {
  if (typeof c !== 'string' || !(c.startsWith('npc:') || c.startsWith('npcAt:'))) continue
  const [kind, nid, nodes] = c.split(':')
  const npc = NPCS[nid]
  if (!npc) { npcBad.push(`${id}: '${c}' names an undefined NPC '${nid}' (npcs.js)`); continue }
  if (kind === 'npc' && !npc.route.includes(id))
    npcBad.push(`${id}: '${c}' can never fire — ${nid} never walks through '${id}'`)
  if (kind === 'npcAt') for (const nd of (nodes || '').split('|')) {
    if (!STORY[nd]) npcBad.push(`${id}: '${c}' names missing node '${nd}'`)
    else if (!npc.route.includes(nd)) npcBad.push(`${id}: '${c}' — ${nid} never visits '${nd}'`)
  }
}
section(!npcBad.length, `NPC routes walk real roads & npc conditions can fire (${Object.keys(NPCS).length} NPCs)`, npcBad)

console.log(failures ? `\n❌ ${failures} map check(s) failing` : `\n✅ all ${checks} map checks pass — also run: node scripts/audit.mjs`)
process.exitCode = failures ? 1 : 0
