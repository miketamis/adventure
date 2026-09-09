import { ENDINGS } from './content.js'
import { AREA_ACHIEVEMENTS, ENDING_LORE } from './folklore.js'
export { areaProgress, newlyEligibleAreas, offerableTest } from './achievementRules.js'

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
