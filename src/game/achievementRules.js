import { ENDINGS } from './content.js'
import { REGION_NODES } from './regions.js'

// The reducer needs only achievement identity and regional thresholds. Keep
// this compact ruleset independent from the much larger folklore/library
// payload so an ordinary story visit does not download the codex before the
// player opens it. Rich titles, blurbs, lore links and quiz seeds remain in
// achievements.js behind the existing lazy Achievements/Factoid surfaces.
export const AREA_ACHIEVEMENT_RULES = Object.freeze([
  Object.freeze({ id: 'area-tomorr', region: 'mountain', threshold: 0.6, kind: 'area' }),
  Object.freeze({ id: 'area-river', region: 'river', threshold: 0.6, kind: 'area' }),
  Object.freeze({ id: 'area-forest', region: 'forest', threshold: 0.6, kind: 'area' }),
  Object.freeze({ id: 'area-castle', region: 'castle', threshold: 0.6, kind: 'area' }),
  Object.freeze({ id: 'area-lake', region: 'lake', threshold: 0.5, kind: 'area' }),
  Object.freeze({ id: 'area-underworld', region: 'underworld', threshold: 0.6, kind: 'area' }),
  Object.freeze({ id: 'area-sea', region: 'sea', threshold: 0.6, kind: 'area' }),
  Object.freeze({ id: 'area-sky', region: 'sky', threshold: 0.6, kind: 'area' }),
  Object.freeze({ id: 'area-village', region: 'village', threshold: 0.5, kind: 'area' }),
])

export const ACHIEVEMENT_RULES = Object.freeze([
  ...ENDINGS
    .filter((ending) => ending.kind !== 'bad')
    .map((ending) => Object.freeze({ id: ending.id, kind: ending.kind })),
  ...AREA_ACHIEVEMENT_RULES,
])

export const ACHIEVEMENT_IDS = Object.freeze(ACHIEVEMENT_RULES.map(({ id }) => id))
export const ACHIEVEMENT_RULE_BY_ID = Object.freeze(Object.fromEntries(
  ACHIEVEMENT_RULES.map((achievement) => [achievement.id, achievement]),
))

// How much of an area achievement's region has been walked.
export function areaProgress(achievement, visited) {
  const nodes = REGION_NODES[achievement.region] || []
  let seen = 0
  for (const id of nodes) if (visited?.[id]) seen++
  return { seen, total: nodes.length }
}

// Area achievements whose exploration deed is newly complete.
export const newlyEligibleAreas = (visited, eligible) =>
  AREA_ACHIEVEMENT_RULES.filter((achievement) => {
    if (eligible[achievement.id]) return false
    const { seen, total } = areaProgress(achievement, visited)
    return total > 0 && seen / total >= achievement.threshold
  }).map((achievement) => achievement.id)

// The first eligible regional test that has not been passed or dismissed.
export const offerableTest = (eligible, earned, dismissed) => {
  for (const achievement of AREA_ACHIEVEMENT_RULES) {
    if (eligible[achievement.id] && !earned[achievement.id] && !dismissed?.[achievement.id]) {
      return achievement.id
    }
  }
  return null
}
