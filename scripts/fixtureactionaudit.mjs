import assert from 'node:assert/strict'
import {
  FIXTURE_ACTION_IDS,
  TIMED_WORLD_FIXTURE_ISSUES,
  TIMED_WORLD_FIXTURES,
  applyFixtureAction,
  canonicalFixtureActionId,
  fixtureActionTransition,
  fixtureConditionMatches,
  fixtureDefinitionIssues,
  fixtureStageAt,
  fixtureStageOffset,
  fixtureSupportsAction,
} from '../src/game/worldFixtures.js'

const fixtureIds = Object.keys(TIMED_WORLD_FIXTURES)
assert.deepEqual(fixtureIds, ['campfire', 'millLamp'])
assert.deepEqual(TIMED_WORLD_FIXTURE_ISSUES, [])
assert(Object.isFrozen(TIMED_WORLD_FIXTURES))

for (const fixtureId of fixtureIds) {
  const fixture = TIMED_WORLD_FIXTURES[fixtureId]
  assert(Object.isFrozen(fixture))
  assert(Object.isFrozen(fixture.stages))
  assert(Object.isFrozen(fixture.groups))
  assert(Object.isFrozen(fixture.actions))
  assert.deepEqual(fixture.actions, FIXTURE_ACTION_IDS)
  assert.equal(fixtureStageOffset(fixtureId, 'bright'), 0)
  assert.equal(fixtureStageOffset(fixtureId, 'low'), 4)
  assert.equal(fixtureStageOffset(fixtureId, 'out'), 8)
  assert.equal(fixtureStageOffset(fixtureId, 'missing'), null)

  assert.equal(fixtureStageAt(fixtureId, null, 20), null)
  assert.equal(fixtureStageAt(fixtureId, 20, 20), 'bright')
  assert.equal(fixtureStageAt(fixtureId, 20, 23), 'bright')
  assert.equal(fixtureStageAt(fixtureId, 20, 24), 'low')
  assert.equal(fixtureStageAt(fixtureId, 20, 27), 'low')
  assert.equal(fixtureStageAt(fixtureId, 20, 28), 'out')
  assert.equal(fixtureConditionMatches(`fixture:${fixtureId}:live`, { [fixtureId]: 20 }, 24), true)
  assert.equal(fixtureConditionMatches(`fixture:${fixtureId}:out`, { [fixtureId]: 20 }, 28), true)

  for (const actionId of [...FIXTURE_ACTION_IDS, 'relight', 'reset']) {
    assert.equal(fixtureSupportsAction(fixtureId, actionId), true, `${fixtureId} lacks ${actionId}`)
  }

  const empty = Object.freeze({ otherFixture: 7 })
  const activated = fixtureActionTransition(empty, fixtureId, 'activate', 100)
  assert.equal(activated.applied, true)
  assert.equal(activated.before, null)
  assert.equal(activated.after, 'bright')
  assert.equal(activated.fixtures[fixtureId], 100)
  assert.equal(activated.fixtures.otherFixture, 7)
  assert(Object.isFrozen(activated))
  assert(Object.isFrozen(activated.fixtures))
  assert.deepEqual(empty, { otherFixture: 7 }, 'input ledger was mutated')

  const duplicateActivation = fixtureActionTransition(activated.fixtures, fixtureId, 'activate', 101)
  assert.equal(duplicateActivation.applied, false)
  assert.equal(duplicateActivation.reason, 'state-disallows-action')
  assert.equal(duplicateActivation.fixtures[fixtureId], 100)

  const lowLedger = Object.freeze({ [fixtureId]: 96, neighbor: 55 })
  assert.equal(fixtureStageAt(fixtureId, lowLedger[fixtureId], 101), 'low')
  const refuelled = fixtureActionTransition(lowLedger, fixtureId, 'refuel', 101)
  assert.equal(refuelled.applied, true)
  assert.equal(refuelled.before, 'low')
  assert.equal(refuelled.after, 'bright')
  assert.equal(refuelled.fixtures[fixtureId], 101)
  assert.equal(refuelled.fixtures.neighbor, 55)
  assert.deepEqual(lowLedger, { [fixtureId]: 96, neighbor: 55 }, 'refuel mutated its input')

  const extinguished = fixtureActionTransition(refuelled.fixtures, fixtureId, 'extinguish', 102)
  assert.equal(extinguished.applied, true)
  assert.equal(extinguished.before, 'bright')
  assert.equal(extinguished.after, 'out')
  assert.equal(extinguished.fixtures[fixtureId], 94)
  assert.equal(fixtureStageAt(fixtureId, extinguished.fixtures[fixtureId], 102), 'out')

  const duplicateExtinguish = fixtureActionTransition(extinguished.fixtures, fixtureId, 'extinguish', 103)
  assert.equal(duplicateExtinguish.applied, false)
  assert.equal(duplicateExtinguish.reason, 'state-disallows-action')

  const relit = fixtureActionTransition(extinguished.fixtures, fixtureId, 'relight', 104)
  assert.equal(relit.applied, true)
  assert.equal(relit.requestedActionId, 'relight')
  assert.equal(relit.actionId, 'activate')
  assert.equal(relit.before, 'out')
  assert.equal(relit.after, 'bright')
  assert.equal(relit.fixtures[fixtureId], 104)

  const reset = fixtureActionTransition({ [fixtureId]: 96 }, fixtureId, 'reset', 104)
  assert.equal(reset.applied, true)
  assert.equal(reset.actionId, 'refuel')
  assert.equal(reset.after, 'bright')
  assert.equal(reset.fixtures[fixtureId], 104)

  const cannotRefuelNothing = fixtureActionTransition({}, fixtureId, 'refuel', 104)
  assert.equal(cannotRefuelNothing.applied, false)
  assert.equal(cannotRefuelNothing.reason, 'state-disallows-action')

  const convenience = applyFixtureAction({}, fixtureId, 'activate', 200)
  assert(Object.isFrozen(convenience))
  assert.equal(convenience[fixtureId], 200)
}

assert.equal(canonicalFixtureActionId('activate'), 'activate')
assert.equal(canonicalFixtureActionId('relight'), 'activate')
assert.equal(canonicalFixtureActionId('reset'), 'refuel')
assert.equal(canonicalFixtureActionId('burn-harder'), null)
assert.equal(canonicalFixtureActionId('toString'), null)
assert.equal(fixtureSupportsAction('missing', 'activate'), false)
assert.equal(fixtureStageOffset('missing', 'out'), null)
assert.equal(fixtureConditionMatches('fixture:missing:out', {}, 1), false)

const unknownFixture = fixtureActionTransition({ campfire: 2 }, 'missing', 'activate', 10)
assert.equal(unknownFixture.applied, false)
assert.equal(unknownFixture.reason, 'unknown-fixture')
assert(Object.isFrozen(unknownFixture.fixtures))

const unknownAction = fixtureActionTransition({ campfire: 2 }, 'campfire', 'burn-harder', 10)
assert.equal(unknownAction.applied, false)
assert.equal(unknownAction.reason, 'unknown-action')

const invalidClock = fixtureActionTransition({ campfire: 2 }, 'campfire', 'extinguish', Number.NaN)
assert.equal(invalidClock.applied, false)
assert.equal(invalidClock.reason, 'invalid-clock')
assert.equal(fixtureActionTransition({ campfire: 0 }, 'campfire', 'extinguish', -1).reason, 'invalid-clock')
assert.equal(
  fixtureActionTransition({ campfire: 0 }, 'campfire', 'extinguish', 1).reason,
  'unrepresentable-terminal-state',
)

const noExtinguish = {
  sample: {
    nodeId: 'sample',
    stages: [{ id: 'on', hours: 1 }, { id: 'off' }],
    groups: { live: ['on'] },
    actions: ['activate'],
  },
}
assert.deepEqual(fixtureDefinitionIssues(noExtinguish), [])

const malformed = {
  broken: {
    nodeId: '',
    stages: [{ id: 'on', hours: 0 }, { id: 'on', hours: 1 }],
    groups: { live: ['missing', 'missing'] },
    actions: ['ignite', 'activate', 'activate'],
  },
}
const malformedIssues = fixtureDefinitionIssues(malformed).join('\n')
assert.match(malformedIssues, /nodeId/)
assert.match(malformedIssues, /positive finite duration/)
assert.match(malformedIssues, /duplicated/)
assert.match(malformedIssues, /terminal stage/)
assert.match(malformedIssues, /repeats a stage/)
assert.match(malformedIssues, /unknown stage/)
assert.match(malformedIssues, /repeat a capability/)
assert.match(malformedIssues, /not canonical/)

console.log(`✅ fixture actions: ${fixtureIds.length} fixtures · ${FIXTURE_ACTION_IDS.length} canonical actions · aliases, boundaries, immutable transitions and malformed definitions verified`)
