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
import { NODE_POS } from '../src/components/nodePositions.js'
import { REGIONS, NODE_REGION, VILLAGE_ANCHOR_IDS, isWander } from '../src/game/regions.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const RG = Object.fromEntries(REGIONS.map((r) => [r.key, r]))
const reg = (id) => NODE_REGION[id] || 'village'
const ids = Object.keys(STORY)
const idsOf = (toks) => (toks || []).filter((t) => t && t.id).map((t) => t.id)
let failures = 0
const section = (ok, title, lines = []) => {
  console.log(`${ok ? '✅' : '❌'} ${title}`)
  for (const l of lines) console.log('   ' + l)
  if (!ok) failures++
}

// every real (non-confuser) edge, with geometry
const edges = []
for (const id of ids) for (const o of STORY[id].options || []) {
  if (o.confuser || !o.to || !STORY[o.to]) continue
  const a = NODE_POS[id], b = NODE_POS[o.to]
  if (!a || !b) continue
  edges.push({ from: id, to: o.to, o, dx: b[0] - a[0], dy: b[1] - a[1], len: Math.hypot(b[0] - a[0], b[1] - a[1]), wander: isWander(o) })
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
const CONTAIN_ALLOW = new Set(['humbur', 'oraBardhe', 'oraZeze', 'oraVerdhe', 'botaHumbur', 'kthimi', 'rrugaDielli2', 'start', 'balozMotra', 'balozTribut', 'balozZgjedh', 'balozFitore'])
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
  if (e.wander || VERT_ALLOW.has(`${e.from}->${e.to}`)) continue
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
  if (e.wander || INTERACT_ALLOW.has(`${e.from}->${e.to}`)) continue
  const v = idsOf(e.o.text)[0]
  if (INTERACT.has(v) && e.len > INTERACT_MAX) farInteract.push(`${Math.round(e.len)} ${e.from} -> ${e.to} ("${idsOf(e.o.text).join(' ')}")`)
}
section(!farInteract.length, `interaction verbs stay local (<= ${INTERACT_MAX})`, farInteract)

// ---- 4. same-spot groups are story-connected ----------------------------------
// Sharing an exact coordinate MEANS "the story continues at this physical place",
// so the group must hang together through story edges — directly, or through a
// COMMON NEIGHBOUR one hop outside (siblings fanned out from a parent scene).
// A pair with no such path = an accidental coordinate collision.
const byCoord = {}
for (const id of ids) { const p = NODE_POS[id]; if (!p) continue; (byCoord[p[0] + ',' + p[1]] ||= []).push(id) }
const adj = {}
for (const id of ids) adj[id] = new Set()
for (const e of edges) { adj[e.from].add(e.to); adj[e.to].add(e.from) }
const splitGroups = []
for (const [k, group] of Object.entries(byCoord)) {
  if (group.length < 2) continue
  const halo = new Set(group)
  for (const id of group) for (const n of adj[id]) halo.add(n)
  const seen = new Set([group[0]]), q = [group[0]]
  while (q.length) for (const n of adj[q.pop()]) if (halo.has(n) && !seen.has(n)) { seen.add(n); q.push(n) }
  const missing = group.filter((id) => !seen.has(id))
  if (missing.length) splitGroups.push(`@ ${k}: [${group.join(', ')}] — unlinked: ${missing.join(', ')}`)
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
const JOURNEY_ALLOW = new Set([
  'tomorZbritje->pusi',      // the descent from Tomorr to the well's mouth
  'rrethi->dhia1',           // "ec lart" — up the mountainside to the stone wedding
  'ktheu3->udhaKthimit',     // the long way home from the coast
  'fshatiDil->pylli1',       // leaving the village into the great forest
  'mali1->qiell1',           // the ascent into the sky realm
  'rrethi->pusi',            // down to the well the zana pointed out
  'lumi->deti1',             // following the dry river down to the sea
  'udhekryq->lumi',          // crossroads down to the river
  'shpellaHyrje->qyteti',    // Durham's cavern "runs miles underground" to the dead city
  'fshatiCaul->mali1',       // village up the mountain road
  'rrugaDielli2->fshatiLanes', // the stag's run ends at the back lanes
  'mali1->udhekryq',         // mountain road back to the crossroads
  'udhekryq->mali1',         // and out again
])
const oddNew = []
for (const e of edges) {
  if (e.wander || e.len <= 500 || reg(e.from) === reg(e.to)) continue
  const key = `${e.from}->${e.to}`
  if (!JOURNEY_ALLOW.has(key)) oddNew.push(`${Math.round(e.len)} ${key} (${reg(e.from)} -> ${reg(e.to)})`)
}
section(!oddNew.length, `odd links: every cross-region edge >500 is a verified journey (${JOURNEY_ALLOW.size} known)`, oddNew)

// ---- 7. no near-collisions -----------------------------------------------------
// Two DISTINCT spots closer than 16px render as an unreadable smudge — either
// merge them into one same-spot group or pull them apart.
const locs = Object.entries(byCoord).map(([k, v]) => { const [x, y] = k.split(',').map(Number); return { x, y, v } })
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
  '418,392': 'the oda — one guest-room, a whole evening of talk (oda scenes + the travellers\' tales)',
  '720,164': 'gjizar\'s tale — told as one thread at the back-lane spot (candidate for a future drawn spread)',
}
const bigStacks = Object.entries(byCoord).filter(([k, v]) => v.length > 8 && !BIG_STACK_OK[k])
if (bigStacks.length) {
  console.log('')
  for (const [k, v] of bigStacks) console.log(`⚠ ${v.length} scenes share [${k}] — a whole area may be hiding in one dot; draw it out into sub-places (or allowlist in BIG_STACK_OK with a reason): ${v.join(', ')}`)
}

console.log(failures ? `\n❌ ${failures} map check(s) failing` : '\n✅ all 12 map checks pass — also run: node scripts/audit.mjs')
process.exitCode = failures ? 1 : 0
