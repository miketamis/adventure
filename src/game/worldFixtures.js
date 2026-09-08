// Timed world fixtures are persistent, place-bound things whose visible state
// changes as their owning clock advances. A campfire and a mill lamp share the
// lifecycle; their prose, map art and story consequences remain authored for
// the particular place. This keeps "a persistent campfire" from becoming a
// one-off mechanic.
export const TIMED_WORLD_FIXTURES = Object.freeze({
  campfire: Object.freeze({
    nodeId: 'lendina',
    stages: Object.freeze([
      Object.freeze({ id: 'bright', hours: 4 }),
      Object.freeze({ id: 'low', hours: 4 }),
      Object.freeze({ id: 'out' }),
    ]),
    groups: Object.freeze({ live: Object.freeze(['bright', 'low']) }),
  }),
  millLamp: Object.freeze({
    nodeId: 'maroMulli1',
    stages: Object.freeze([
      Object.freeze({ id: 'bright', hours: 4 }),
      Object.freeze({ id: 'low', hours: 4 }),
      Object.freeze({ id: 'out' }),
    ]),
    groups: Object.freeze({ live: Object.freeze(['bright', 'low']) }),
  }),
})

export const isTimedWorldFixture = (id) => Boolean(TIMED_WORLD_FIXTURES[id])

export function parseFixtureCondition(id) {
  if (typeof id !== 'string' || !id.startsWith('fixture:')) return null
  const [, fixtureId, stateId, ...rest] = id.split(':')
  if (!fixtureId || !stateId || rest.length || !isTimedWorldFixture(fixtureId)) return null
  const fixture = TIMED_WORLD_FIXTURES[fixtureId]
  const valid = fixture.stages.some((stage) => stage.id === stateId) || fixture.groups[stateId]
  return valid ? { fixtureId, stateId } : null
}

// null means never activated: unlike an extinguished fixture, it leaves no
// remnant and therefore matches none of the authored stages.
export function fixtureStageAt(fixtureId, activatedAt, clock) {
  const fixture = TIMED_WORLD_FIXTURES[fixtureId]
  if (!fixture || !Number.isFinite(activatedAt) || !Number.isFinite(clock)) return null
  let age = Math.max(0, clock - activatedAt)
  for (const stage of fixture.stages) {
    if (stage.hours == null || age < stage.hours) return stage.id
    age -= stage.hours
  }
  return fixture.stages.at(-1)?.id || null
}

export function fixtureConditionMatches(id, fixtures, clock) {
  const condition = parseFixtureCondition(id)
  if (!condition) return false
  const fixture = TIMED_WORLD_FIXTURES[condition.fixtureId]
  const stage = fixtureStageAt(condition.fixtureId, fixtures?.[condition.fixtureId], clock)
  return stage === condition.stateId || Boolean(fixture.groups[condition.stateId]?.includes(stage))
}
