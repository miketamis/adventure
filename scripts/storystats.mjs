// Story validation + depth stats. Run: node scripts/storystats.mjs
import { STORY, START_NODE, DICT, DEFS, ITEMS, lineOf } from '../src/game/content.js'

const nodes = STORY
const ids = Object.keys(nodes)
const endings = ids.filter((id) => nodes[id].end)

// ---- link integrity ---------------------------------------------------------
const edges = (id) => (nodes[id].options || []).filter((o) => o.to).map((o) => o.to)
const deadLinks = []
for (const id of ids) for (const to of edges(id)) if (!nodes[to]) deadLinks.push(`${id} -> ${to}`)

// ---- reachability (follow every real edge; gates are satisfiable) -----------
const reachable = new Set([START_NODE])
const stack = [START_NODE]
while (stack.length) {
  const id = stack.pop()
  for (const to of edges(id)) if (nodes[to] && !reachable.has(to)) { reachable.add(to); stack.push(to) }
}
const unreachable = ids.filter((id) => !reachable.has(id))
const deadEnds = ids.filter((id) => !nodes[id].end && edges(id).length === 0)

// ---- vocabulary coverage ----------------------------------------------------
const usedSenses = new Set()
const missingDict = new Set()
const collect = (toks) => { for (const t of toks || []) if (t.id) { usedSenses.add(t.id); if (!DICT[t.id]) missingDict.add(t.id) } }
for (const id of ids) {
  for (const e of nodes[id].text) collect(lineOf(e))
  for (const o of nodes[id].options) collect(o.text)
}
for (const it of Object.values(ITEMS)) if (it.use) collect(it.use.phrase)
const missingDefs = [...usedSenses].filter((s) => !DEFS[s])

// ---- confuser coverage (non-ending nodes with no confuser option) -----------
const noConfuser = ids.filter((id) => !nodes[id].end && !(nodes[id].options || []).some((o) => o.confuser))

// ---- depth: shortest path (steps) from start to each node -------------------
const dist = { [START_NODE]: 0 }
const q = [START_NODE]
while (q.length) {
  const id = q.shift()
  for (const to of edges(id)) if (nodes[to] && dist[to] === undefined) { dist[to] = dist[id] + 1; q.push(to) }
}
const endingDepths = endings.map((id) => dist[id]).filter((d) => d !== undefined).sort((a, b) => a - b)
const avg = endingDepths.length ? (endingDepths.reduce((a, b) => a + b, 0) / endingDepths.length) : 0
const median = endingDepths.length ? endingDepths[Math.floor(endingDepths.length / 2)] : 0

// ---- longest acyclic path from start (the deepest single chain) -------------
let longest = 0, longestEnd = null
const seen = new Set()
function dfs(id, depth, path) {
  if (depth > longest) { longest = depth; longestEnd = id }
  for (const to of edges(id)) {
    if (nodes[to] && !path.has(to)) { path.add(to); dfs(to, depth + 1, path); path.delete(to) }
  }
}
dfs(START_NODE, 1, new Set([START_NODE]))

// ---- sentence-gated directions (the reveal mechanic) ------------------------
const NON_NOUNS = new Set(['ti','je','ne','nje','dhe','ka','ke','mund','eshte','te_link','te_subj','te_obj','i_art','e_art','me','por','nuk','pa','ku','qe','do','per','une','jam','ose','jo','sheh','ec','fle','hap','ik','jep','pi','behet','vjen','zgjohu','rri','ndiz','ha','mbaroi','humbet','merr','kerko','gjen','kalo','shko','prit','lufto','vrit','shpeto','ngjit','zbrit','fluturo','degjo','flet','thote','ndihmo','beso','hyr','dil','thirr','hidh','kthehu','prek','vdes','bie','pre','luan','bej','mbyll','vazhdon','lind','fol','premto','madh','vogel','erret','sigurt','ri','vjeter','uritur','shpejt','qete','perseri','forte','bukur','keq','thate','lart','mire','ngadale','poshte','larg','jashte','tani','ngrohte','ftohte','ketu','brenda','bardhe','zi','shume','tjeter','nente','shtate'])
const phraseNoun = (toks) => { const n = toks.filter((t) => t.id && !NON_NOUNS.has(t.id)).map((t) => t.id); return n.length ? n[n.length - 1] : null }
const nonEnd = ids.filter((id) => !nodes[id].end)
// authored reveal gates: options that carry an explicit reveal:'<senseId>'
const revealGates = []
const brokenGates = []
for (const id of nonEnd)
  for (const o of nodes[id].options || []) {
    if (!o.reveal) continue
    revealGates.push(id)
    if (!nodes[id].text.some((e) => lineOf(e).some((t) => t.id === o.reveal)))
      brokenGates.push(`${id}: reveal '${o.reveal}' not found in node text`)
  }
const gatedNodes = [...new Set(revealGates)]

// ---- report -----------------------------------------------------------------
const ok = (b) => (b ? '✅' : '❌')
console.log('=== Aventura Shqip — story stats ===')
console.log(`nodes:            ${ids.length}`)
console.log(`endings:          ${endings.length}  (${endings.filter((e)=>nodes[e].end==='good').length} good / ${endings.filter((e)=>nodes[e].end==='secret').length} secret / ${endings.filter((e)=>nodes[e].end==='bad').length} bad)`)
console.log(`vocabulary used:  ${usedSenses.size} senses`)
console.log('')
console.log(`${ok(!deadLinks.length)} dead links:      ${deadLinks.length}` + (deadLinks.length ? '\n   ' + deadLinks.join('\n   ') : ''))
console.log(`${ok(!unreachable.length)} unreachable:     ${unreachable.length}` + (unreachable.length ? '\n   ' + unreachable.join(', ') : ''))
console.log(`${ok(!deadEnds.length)} non-end deadends:${deadEnds.length}` + (deadEnds.length ? '\n   ' + deadEnds.join(', ') : ''))
console.log(`${ok(!missingDict.size)} missing DICT:    ${missingDict.size}` + (missingDict.size ? '\n   ' + [...missingDict].join(', ') : ''))
console.log(`${ok(!missingDefs.length)} missing DEFS:    ${missingDefs.length}` + (missingDefs.length ? '\n   ' + missingDefs.join(', ') : ''))
console.log(`${ok(!noConfuser.length)} no-confuser nodes:${noConfuser.length}` + (noConfuser.length ? '\n   ' + noConfuser.join(', ') : ''))
console.log('')
console.log('--- DEPTH (steps from start) ---')
console.log(`ending depths:    [${endingDepths.join(', ')}]`)
console.log(`  shortest ending: ${endingDepths[0]}`)
console.log(`  median ending:   ${median}`)
console.log(`  average ending:  ${avg.toFixed(1)}   (target ~30)`)
console.log(`  deepest ending:  ${endingDepths[endingDepths.length - 1]}`)
console.log(`longest acyclic chain: ${longest}  -> ${longestEnd}   (target ~89)`)
console.log('')
console.log('--- DESIGNED REVEAL GATES (authored sentence-unlocks) ---')
console.log(`${ok(!brokenGates.length)} authored reveal gates: ${revealGates.length} on ${gatedNodes.length} nodes`)
if (brokenGates.length) console.log('   BROKEN:\n   ' + brokenGates.join('\n   '))
