// NODE LENGTH — the worst-case wall-of-text detector. For every story node,
// computes the MAXIMUM number of text lines that can be visible AT ONCE when
// the conditions align (phase × phase-crossing × cameFrom × fire × npc clock ×
// free items brute-forced), and ranks the longest. A node high on this list is
// a monologue dump or an overloaded scene — the cure is RELOCATION: move what
// happens there to the place it describes, creating new drawn locations
// (story-design-taste rules 7 & 15; the 2026-07-18 pass took the worst from
// 19 aligned lines down to ≤13). Run: node scripts/nodelen.mjs
import { STORY } from '../src/game/content.js'
import { phaseAtClock } from '../src/game/gameState.js'
import { NPCS } from '../src/game/npcs.js'
import { TIMED_WORLD_FIXTURES, parseFixtureCondition } from '../src/game/worldFixtures.js'

const TIME = ['dawn', 'day', 'dusk', 'night']

// npc position at clock h for looping npcs; once-npcs treated as free (any offset)
function npcAt(npcId, h) {
  const npc = NPCS[npcId]
  if (!npc) return null
  if (npc.activePhases && !npc.activePhases.includes(phaseAtClock(h))) return 'OFF'
  const step = npc.stepHours || 2
  if (npc.once) return 'FREE'
  return npc.route[Math.floor(h / step) % npc.route.length]
}

function condSat(id, env) {
  // familiarity profile: FIRST visit (nothing known) vs FAMILIAR (all known)
  if (id === 'again') return env.familiar
  if (id.startsWith('visited:')) return env.familiar
  // a rumor-payoff can only fire on a FIRST arrival (heard of, never seen)
  if (id === 'rumor') return !env.familiar
  if (TIME.includes(id)) return phaseAtClock(env.h) === id
  const fixtureCondition = parseFixtureCondition(id)
  if (fixtureCondition) {
    const fixture = TIMED_WORLD_FIXTURES[fixtureCondition.fixtureId]
    const stage = env.fixtures[fixtureCondition.fixtureId]
    return stage === fixtureCondition.stateId || Boolean(fixture.groups[fixtureCondition.stateId]?.includes(stage))
  }
  if (id.startsWith('from:')) return id.slice(5).split('|').includes(env.cameFrom)
  if (id.startsWith('became:')) return env.crossed && id.slice(7).split('|').includes(phaseAtClock(env.h))
  if (id.startsWith('npcAt:')) {
    const [, npcId, nodes] = id.split(':')
    const at = npcAt(npcId, env.h)
    if (at === 'FREE') return true
    return at != null && at !== 'OFF' && nodes.split('|').includes(at)
  }
  if (id.startsWith('npc:')) {
    const at = npcAt(id.slice(4), env.h)
    if (at === 'FREE') return true
    return at === env.nodeId
  }
  // free boolean (inventory/embodying/etc.) resolved from env.free map
  return env.free[id] !== false
}

function entrySat(e, env) {
  if (Array.isArray(e)) return true
  const all = [].concat(e.cond).every((id) => condSat(id, env))
  return e.negate ? !all : all
}

const results = []
for (const [nodeId, node] of Object.entries(STORY)) {
  const entries = node.text
  const froms = new Set(['__OTHER__'])
  const freeIds = new Set()
  const fixtureIds = new Set()
  for (const e of entries) {
    if (Array.isArray(e)) continue
    for (const id of [].concat(e.cond)) {
      if (id.startsWith('from:')) id.slice(5).split('|').forEach((n) => froms.add(n))
      else if (parseFixtureCondition(id)) fixtureIds.add(parseFixtureCondition(id).fixtureId)
      else if (!TIME.includes(id) && !id.startsWith('became:') && !id.startsWith('npc')) freeIds.add(id)
    }
  }
  const freeList = [...freeIds]
  const freeCombos = []
  if (freeList.length <= 12) {
    for (let m = 0; m < 1 << freeList.length; m++) {
      const f = {}
      freeList.forEach((id, i) => (f[id] = !!(m & (1 << i))))
      freeCombos.push(f)
    }
  } else freeCombos.push(Object.fromEntries(freeList.map((id) => [id, true])))

  let fixtureCombos = [{}]
  for (const fixtureId of fixtureIds) {
    fixtureCombos = fixtureCombos.flatMap((profile) =>
      [null, ...TIMED_WORLD_FIXTURES[fixtureId].stages.map((stage) => stage.id)]
        .map((stage) => ({ ...profile, [fixtureId]: stage })))
  }

  let best = 0, bestFam = 0, bestEnv = null
  for (let h = 0; h < 24; h++)
    for (const crossed of [true, false])
      for (const cameFrom of froms)
        for (const fixtures of fixtureCombos)
          for (const free of freeCombos)
            for (const familiar of [false, true]) {
              const env = { h, crossed, cameFrom, fixtures, free, nodeId, familiar }
              const n = entries.filter((e) => entrySat(e, env)).length
              if (familiar) { if (n > bestFam) bestFam = n }
              else if (n > best) { best = n; bestEnv = { phase: phaseAtClock(h), crossed, cameFrom, fixtures, free: freeList.filter((id) => free[id] !== false) } }
            }
  results.push({ nodeId, total: entries.length, max: best, fam: bestFam, env: bestEnv, end: !!node.end })
}

results.sort((a, b) => b.max - a.max)
console.log('rank  node                     firstVisit  familiar  totalEntries  end  alignment')
for (const r of results.slice(0, 25)) {
  const e = r.env || {}
  const fixtureText = Object.entries(e.fixtures || {}).filter(([, stage]) => stage).map(([id, stage]) => `${id}:${stage}`).join(',')
  const align = `phase=${e.phase}${e.crossed ? '+crossed' : ''} from=${e.cameFrom === '__OTHER__' ? '-' : e.cameFrom}${fixtureText ? ' fixtures=' + fixtureText : ''}${e.free && e.free.length ? ' has=' + e.free.join(',') : ''}`
  console.log(`${String(results.indexOf(r) + 1).padStart(4)}  ${r.nodeId.padEnd(24)} ${String(r.max).padStart(10)}  ${String(r.fam).padStart(8)}  ${String(r.total).padStart(12)}  ${r.end ? ' E ' : '   '}  ${align}`)
}
const dist = {}
for (const r of results) dist[r.max] = (dist[r.max] || 0) + 1
console.log('\nfirst-visit maxLines distribution:', Object.entries(dist).sort((a, b) => b[0] - a[0]).map(([k, v]) => `${k}:${v}`).join(' '))
console.log('nodes:', results.length, ' avg first:', (results.reduce((a, r) => a + r.max, 0) / results.length).toFixed(2), ' avg familiar:', (results.reduce((a, r) => a + r.fam, 0) / results.length).toFixed(2))
