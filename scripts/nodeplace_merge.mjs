// Merge per-region agent placements into one NODE_POS table, verify against
// STORY, and codegen src/components/nodePositions.js.
// Run: node scripts/nodeplace_merge.mjs <scratchdir> [--write]
import { STORY } from '../src/game/content.js'
import { readFileSync, writeFileSync, existsSync } from 'fs'

const DIR = process.argv[2]
const WRITE = process.argv.includes('--write')
const REGIONS = ['sky', 'mountain', 'forest', 'river', 'castle', 'lake', 'sea', 'underworld', 'village']

const pos = {}
const dup = []
for (const r of REGIONS) {
  const f = `${DIR}/place-${r}-out.json`
  if (!existsSync(f)) { console.log(`MISSING output: ${r}`); continue }
  let obj
  try { obj = JSON.parse(readFileSync(f, 'utf8')) } catch (e) { console.log(`BAD JSON ${r}: ${e.message}`); continue }
  for (const [id, xy] of Object.entries(obj)) {
    if (!Array.isArray(xy) || xy.length !== 2 || !Number.isFinite(xy[0]) || !Number.isFinite(xy[1])) { console.log(`BAD coord ${r} ${id}: ${JSON.stringify(xy)}`); continue }
    if (pos[id]) dup.push(id)
    pos[id] = [Math.round(xy[0]), Math.round(xy[1])]
  }
}

const ids = Object.keys(STORY)
const missing = ids.filter((id) => !pos[id])
const extra = Object.keys(pos).filter((id) => !STORY[id])

// same-spot groups (by exact coord)
const byCoord = {}
for (const id of ids) { if (!pos[id]) continue; const k = pos[id][0] + ',' + pos[id][1]; (byCoord[k] || (byCoord[k] = [])).push(id) }
const groups = Object.entries(byCoord).map(([k, v]) => ({ k, v })).filter((g) => g.v.length > 1)
const distinct = Object.keys(byCoord).length

// distinct locations that are suspiciously close (<18px) but NOT same coord
const locs = Object.entries(byCoord).map(([k, v]) => { const [x, y] = k.split(',').map(Number); return { x, y, ids: v } })
let tooClose = 0
for (let i = 0; i < locs.length; i++) for (let j = i + 1; j < locs.length; j++) {
  const d = Math.hypot(locs[i].x - locs[j].x, locs[i].y - locs[j].y)
  if (d > 0 && d < 16) tooClose++
}

console.log('placed:', Object.keys(pos).length, '/', ids.length)
console.log('distinct locations:', distinct)
console.log('same-spot groups (>1 node):', groups.length)
console.log('nodes living at a shared spot:', groups.reduce((s, g) => s + g.v.length, 0))
console.log('near-collisions (<16px apart, distinct):', tooClose)
if (missing.length) console.log('MISSING (' + missing.length + '):', missing.join(', '))
if (extra.length) console.log('EXTRA (not in STORY):', extra.join(', '))
if (dup.length) console.log('DUP across regions:', dup.join(', '))
console.log('\nbiggest same-spot groups:')
groups.sort((a, b) => b.v.length - a.v.length).slice(0, 8).forEach((g) => console.log(`  ${g.v.length} @ ${g.k}: ${g.v.slice(0, 6).join(', ')}${g.v.length > 6 ? '…' : ''}`))

if (WRITE && !missing.length && !extra.length) {
  // emit the hand-authored NODE_AT format: one coordinate per PLACE (first node
  // seen there is the anchor), everyone else standing there aliases the anchor.
  const anchorOf = {}
  const lines = ids.map((id) => {
    const key = /^[A-Za-z_$][\w$]*$/.test(id) ? id : JSON.stringify(id)
    const k = pos[id][0] + ',' + pos[id][1]
    if (anchorOf[k]) return `  ${key}: '${anchorOf[k]}',`
    anchorOf[k] = id
    return `  ${key}: [${pos[id][0]}, ${pos[id][1]}],`
  })
  const out = `// HAND-AUTHORED map placement — one physical spot, ONE coordinate.
// (This bootstrap was emitted by scripts/nodeplace_merge.mjs; edit BY HAND.)
// Each entry is either
//   id: [x, y]       the node stands at its OWN spot (most nodes), or
//   id: 'anchorId'   the node stands AT that node's spot — the story
//                    continues at the same physical place.
// Move a place by editing its single [x, y]: everyone standing there moves
// with it. If the character moves even slightly, the node gets its OWN
// coordinate — never reuse another spot's numbers (mapaudit flags collisions).
export const NODE_AT = {\n${lines.join('\n')}\n}

// ---- derived (do not edit below) -------------------------------------------
// NODE_POS: resolved [x,y] per node. PLACE_OF: node -> the anchor node whose
// spot it shares (itself for anchors). PLACE_NODES: anchor -> every node
// standing there, anchor first.
export const NODE_POS = {}
export const PLACE_OF = {}
export const PLACE_NODES = {}
for (const id of Object.keys(NODE_AT)) {
  let a = id, hops = 0
  while (typeof NODE_AT[a] === 'string') {
    a = NODE_AT[a]
    if (++hops > 32) throw new Error(\`nodePositions: alias cycle through '\${id}'\`)
  }
  if (!Array.isArray(NODE_AT[a])) throw new Error(\`nodePositions: '\${id}' stands at unknown node '\${a}'\`)
  PLACE_OF[id] = a
  NODE_POS[id] = NODE_AT[a]
}
for (const id of Object.keys(NODE_AT)) {
  const a = PLACE_OF[id]
  const l = (PLACE_NODES[a] ||= [a])
  if (id !== a) l.push(id)
}
`
  writeFileSync('src/components/nodePositions.js', out)
  console.log('\nWROTE src/components/nodePositions.js (' + ids.length + ' nodes)')
} else if (WRITE) {
  console.log('\nNOT written — resolve missing/extra first.')
}
