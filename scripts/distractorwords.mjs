// Distractor-vocabulary helper for hand-writing confusers.
//   node scripts/distractorwords.mjs <nodeId> [--trace]
//
// A confuser at a node should be built only from words the player can already read
// when they arrive — otherwise the wrong choice is illegible and can't tempt anyone.
// This prints that vocabulary, in tiers, and audits the node's existing confusers
// against the same rule storystats.mjs enforces. See scripts/lib/discovery.mjs.
//
//   GUARANTEED — forced on the way in (intersection over every path). Safest: known
//                no matter which route the player took here.
//   VISIBLE    — on screen now: the scene text + the real option texts. Readable, but
//                only because it's in front of them at this node.
//   LEGIBLE    = GUARANTEED ∪ VISIBLE — the full set a confuser may draw from.
//   POSSIBLE   — known on SOME path but not all, and not visible here. NOT legible:
//                a confuser using these is illegible to players who came another way.
import { STORY, START_NODE, DICT } from '../src/game/content.js'
import { analyzeDiscovery, sensesOf } from './lib/discovery.mjs'

const argv = process.argv.slice(2)
const target = argv.find((a) => !a.startsWith('--'))
if (!target || !STORY[target]) {
  console.error('usage: node scripts/distractorwords.mjs <nodeId> [--trace]')
  if (target) console.error('unknown node: ' + target)
  process.exit(1)
}

const A = analyzeDiscovery(STORY, START_NODE)
const gloss = (id) => (DICT[id] ? `${DICT[id].al} (${DICT[id].en})` : `?${id}`)
const printWords = (ids) => {
  if (!ids.length) return console.log('   (none)')
  for (const id of [...ids].sort()) console.log(`   ${id.padEnd(12)} ${gloss(id)}`)
}

console.log(`=== confuser vocabulary for "${target}" ===`)
if (!A.reachable.has(target)) { console.log(`Not reachable from "${START_NODE}".`); process.exit(0) }
if (STORY[target].end) { console.log('(this is an ENDING node — no confusers)'); process.exit(0) }

const guaranteed = A.guaranteed[target] || new Set()
const visibleOnly = [...A.visible[target]].filter((s) => !guaranteed.has(s))
const possibleOnly = [...(A.possible[target] || [])].filter((s) => !A.legible[target].has(s))

console.log(`\nGUARANTEED on arrival — safest distractor words (${guaranteed.size}):`)
printWords([...guaranteed])
console.log(`\nVISIBLE here only — scene + options on screen now (${visibleOnly.length}):`)
printWords(visibleOnly)
console.log(`\nPOSSIBLE but NOT legible — route-dependent, avoid (${possibleOnly.length}):`)
printWords(possibleOnly)

// audit existing confusers against the enforced rule (legible = guaranteed ∪ visible)
const confusers = (STORY[target].options || []).filter((o) => o.confuser)
console.log(`\n--- AUDIT: this node's ${confusers.length} confuser option(s) ---`)
for (const c of confusers) {
  const words = sensesOf(c.text)
  const illegible = words.filter((s) => !A.legible[target].has(s))
  const onlyVisible = words.filter((s) => !guaranteed.has(s) && A.visible[target].has(s))
  const al = (c.text || []).map((t) => t.al || t.en).join(' ')
  const tag = illegible.length ? `❌ illegible: ${illegible.join(', ')}`
    : onlyVisible.length ? `✅ legible (relies on visible: ${onlyVisible.join(', ')})`
    : '✅ all guaranteed'
  console.log(`   "${al}"  ${tag}`)
}

if (argv.includes('--trace')) {
  const realOptions = (id) => (STORY[id].options || []).filter((o) => o.to && !o.confuser && STORY[o.to])
  const paths = []
  const dfs = (id, path, edges) => {
    if (paths.length >= 6) return
    if (id === target) { paths.push(edges.slice()); return }
    for (const o of realOptions(id)) {
      if (path.has(o.to)) continue
      path.add(o.to); edges.push(o.to); dfs(o.to, path, edges); edges.pop(); path.delete(o.to)
    }
  }
  dfs(START_NODE, new Set([START_NODE]), [])
  console.log(`\n--- EXAMPLE PATHS to "${target}" (showing ${paths.length}) ---`)
  paths.forEach((e, i) => console.log(`  ${i + 1}: ${START_NODE} → ${e.join(' → ')}`))
}
