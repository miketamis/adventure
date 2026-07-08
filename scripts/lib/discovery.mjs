// Shared discovery / legibility analysis for the story graph.
//
// A player "discovers" a word by clicking it; to traverse an option they must be
// able to SPEAK it (all its words discovered), and an option only appears once the
// sentence that reveals it is discovered. So by the time a player is STANDING at a
// node, choosing, some words are necessarily legible to them:
//
//   guaranteed(n) — force-discovered on the way IN: the intersection, over every
//                   path start→n, of the words each step forced (option text you
//                   had to speak + any reveal sentence you had to decode). These
//                   are the words you MUST already know. (intersection = must)
//   possible(n)   — the union over all paths: known on SOME route, not all.
//   visible(n)    — words on screen AT n that aren't confusers: the scene text and
//                   the real option texts. The player can read/discover these now.
//
//   legible(n)    = guaranteed(n) ∪ visible(n)  — every word the player can be
//                   expected to read when choosing at n. A good distractor uses
//                   only these; an illegible one slips in a word seen nowhere but
//                   inside the distractor itself.
//
// Note: `start` forces nothing (no step taken yet), so guaranteed(start)=∅ — only
// `visible` makes legibility satisfiable there. That's why visible must count.
import { lineOf, visibleLines } from '../../src/game/content.js'

export const sensesOf = (tokens) => [...new Set((tokens || []).filter((t) => t.id).map((t) => t.id))]

export function analyzeDiscovery(STORY, START_NODE) {
  const ids = Object.keys(STORY)
  const realOptions = (id) => (STORY[id].options || []).filter((o) => o.to && !o.confuser && STORY[o.to])
  const allLines = (id) => (STORY[id].text || []).map(lineOf)

  // the reveal sentence's words = what you must discover for the option to appear.
  const revealSenses = (id, reveal) => {
    if (!reveal) return []
    const line = allLines(id).find((l) => l.some((t) => t.id === reveal))
    return line ? sensesOf(line) : []
  }
  const forcedBy = (srcId, o) => new Set([...sensesOf(o.text), ...revealSenses(srcId, o.reveal)])

  // reverse graph + reachability
  const preds = {}
  for (const id of ids) for (const o of realOptions(id)) (preds[o.to] ||= []).push({ from: id, forced: forcedBy(id, o) })
  const reachable = new Set([START_NODE])
  const stack = [START_NODE]
  while (stack.length) {
    const id = stack.pop()
    for (const o of realOptions(id)) if (!reachable.has(o.to)) { reachable.add(o.to); stack.push(o.to) }
  }

  const UNIVERSE = new Set()
  for (const list of Object.values(preds)) for (const e of list) for (const s of e.forced) UNIVERSE.add(s)

  // meet-over-all-paths dataflow. must => ∩ (init UNIVERSE); may => ∪ (init ∅).
  const dataflow = (meet) => {
    const IN = {}
    for (const id of ids) IN[id] = id === START_NODE ? new Set() : meet === 'must' ? new Set(UNIVERSE) : new Set()
    let changed = true
    while (changed) {
      changed = false
      for (const id of ids) {
        if (id === START_NODE || !preds[id]) continue
        let next = null
        for (const { from, forced } of preds[id]) {
          if (!reachable.has(from)) continue
          const contrib = new Set([...IN[from], ...forced])
          if (next === null) next = contrib
          else if (meet === 'must') next = new Set([...next].filter((s) => contrib.has(s)))
          else for (const s of contrib) next.add(s)
        }
        if (!next) continue
        if (next.size !== IN[id].size || [...next].some((s) => !IN[id].has(s))) { IN[id] = next; changed = true }
      }
    }
    return IN
  }

  const guaranteed = dataflow('must')
  const possible = dataflow('may')

  // visible AT a node: scene text (ignore when()/unless() — worst case, all lines)
  // plus the real (non-confuser) option texts the player sees rendered.
  const visible = {}
  const scene = {}
  for (const id of ids) {
    const sceneSet = new Set(allLines(id).flat().filter((t) => t.id).map((t) => t.id))
    const vis = new Set(sceneSet)
    for (const o of realOptions(id)) for (const s of sensesOf(o.text)) vis.add(s)
    scene[id] = sceneSet
    visible[id] = vis
  }

  const legible = {}
  for (const id of ids) legible[id] = new Set([...(guaranteed[id] || []), ...visible[id]])

  return { ids, reachable, realOptions, guaranteed, possible, visible, scene, legible }
}
