import { ENDINGS } from './content.js'
import { AREA_ACHIEVEMENTS, ENDING_LORE } from './folklore.js'
import { REGION_NODES } from './regions.js'

// ---------------------------------------------------------------------------
// ACHIEVEMENTS — the lore collection as a real achievement system.
// Every achievement is earned in TWO stages:
//   1. the DEED — live the tale (reach a good/secret ending) or explore a
//      region past its threshold. The deed makes the achievement ELIGIBLE,
//      permanently (state.eligible survives runs, resets and failed tests).
//   2. the GATE — a hard comprehension test (src/game/comprehension.js):
//      EVERY question must be answered correctly to unlock (state.earned).
//      One wrong answer ends the attempt; the test can be retaken any time
//      from the Achievements tab, with fresh questions per attempt.
// Bad endings are FATES: recorded the moment they're met — no test, no unlock.
// ---------------------------------------------------------------------------
export const ACHIEVEMENTS = [
  ...ENDINGS.filter((e) => e.kind !== 'bad').map((e) => ({
    id: e.id,
    kind: e.kind, // 'good' | 'secret'
    title: e.title,
    blurb: e.blurb,
    lore: ENDING_LORE[e.id],
    hint: e.kind === 'secret' ? 'a hidden tale' : 'live this tale to discover it',
    deed: 'You lived this tale',
  })),
  ...AREA_ACHIEVEMENTS.map((f) => ({
    id: f.id,
    kind: 'area',
    title: f.title,
    blurb: f.blurb,
    lore: f.lore,
    region: f.region,
    threshold: f.threshold ?? 0.6,
    quizNodes: f.quizNodes,
    hint: 'explore this region to discover it',
    deed: 'You explored this region',
  })),
]
export const ACHIEVEMENT_BY_ID = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]))

// how much of an area achievement's region has been walked
export function areaProgress(ach, visited) {
  const nodes = REGION_NODES[ach.region] || []
  let seen = 0
  for (const id of nodes) if (visited?.[id]) seen++
  return { seen, total: nodes.length }
}

// area achievements whose deed is now done (threshold crossed) but that aren't
// yet marked eligible — CHOOSE promotes these as you explore
export const newlyEligibleAreas = (visited, eligible) =>
  ACHIEVEMENTS.filter((a) => {
    if (a.kind !== 'area' || eligible[a.id]) return false
    const { seen, total } = areaProgress(a, visited)
    return total > 0 && seen / total >= a.threshold
  }).map((a) => a.id)

// the one test the world offers via the in-story banner right now: the first
// area achievement whose deed is done but whose gate is unpassed — unless the
// player waved it off this run (the codex always keeps the retake available)
export const offerableTest = (eligible, earned, dismissed) => {
  for (const a of ACHIEVEMENTS)
    if (a.kind === 'area' && eligible[a.id] && !earned[a.id] && !dismissed?.[a.id]) return a.id
  return null
}
