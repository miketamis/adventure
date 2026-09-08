// Timed world fixtures are persistent, place-bound things whose visible state
// changes as their owning clock advances. A campfire and a mill lamp share the
// lifecycle; their prose, map art and story consequences remain authored for
// the particular place. This keeps "a persistent campfire" from becoming a
// one-off mechanic.
//
// Fixture state deliberately remains a numeric activation-clock ledger. The
// reducer can therefore adopt the action helpers below without a save
// migration: activating/refuelling stamps "now", while extinguishing moves the
// stamp to the exact boundary of the terminal stage. The owning clock (world
// or embodied tale) is still selected by gameState, not by this pure module.
export const FIXTURE_ACTION_IDS = Object.freeze(['activate', 'extinguish', 'refuel'])

export const FIXTURE_ACTION_ALIASES = Object.freeze({
  relight: 'activate',
  reset: 'refuel',
})

const SHARED_FIXTURE_ACTIONS = Object.freeze([...FIXTURE_ACTION_IDS])

export const TIMED_WORLD_FIXTURES = Object.freeze({
  campfire: Object.freeze({
    nodeId: 'lendina',
    stages: Object.freeze([
      Object.freeze({ id: 'bright', hours: 4 }),
      Object.freeze({ id: 'low', hours: 4 }),
      Object.freeze({ id: 'out' }),
    ]),
    groups: Object.freeze({ live: Object.freeze(['bright', 'low']) }),
    actions: SHARED_FIXTURE_ACTIONS,
  }),
  millLamp: Object.freeze({
    nodeId: 'maroMulli1',
    stages: Object.freeze([
      Object.freeze({ id: 'bright', hours: 4 }),
      Object.freeze({ id: 'low', hours: 4 }),
      Object.freeze({ id: 'out' }),
    ]),
    groups: Object.freeze({ live: Object.freeze(['bright', 'low']) }),
    actions: SHARED_FIXTURE_ACTIONS,
  }),
})

export const isTimedWorldFixture = (id) => Boolean(TIMED_WORLD_FIXTURES[id])

export const canonicalFixtureActionId = (id) =>
  FIXTURE_ACTION_IDS.includes(id)
    ? id
    : Object.hasOwn(FIXTURE_ACTION_ALIASES, id)
      ? FIXTURE_ACTION_ALIASES[id]
      : null

export const fixtureSupportsAction = (fixtureId, actionId) => {
  const canonical = canonicalFixtureActionId(actionId)
  return Boolean(canonical && TIMED_WORLD_FIXTURES[fixtureId]?.actions.includes(canonical))
}

// Return the elapsed hours at which a stage begins. A finite offset for the
// final, duration-less stage is also the save-compatible timestamp delta used
// to extinguish a fixture immediately.
export function fixtureStageOffset(fixtureId, stageId) {
  const fixture = TIMED_WORLD_FIXTURES[fixtureId]
  if (!fixture) return null
  let offset = 0
  for (const stage of fixture.stages) {
    if (stage.id === stageId) return offset
    if (!Number.isFinite(stage.hours) || stage.hours < 0) return null
    offset += stage.hours
  }
  return null
}

export function fixtureDefinitionIssues(registry = TIMED_WORLD_FIXTURES) {
  const issues = []
  if (!registry || typeof registry !== 'object' || Array.isArray(registry)) {
    return Object.freeze(['fixture registry must be an object'])
  }

  for (const [fixtureId, fixture] of Object.entries(registry)) {
    const at = (message) => issues.push(`${fixtureId}: ${message}`)
    if (!fixture || typeof fixture !== 'object' || Array.isArray(fixture)) {
      at('definition must be an object')
      continue
    }
    if (typeof fixture.nodeId !== 'string' || !fixture.nodeId) at('nodeId must be a non-empty string')

    if (!Array.isArray(fixture.stages) || fixture.stages.length < 2) {
      at('stages must contain at least an active and a terminal stage')
      continue
    }
    const stageIds = new Set()
    fixture.stages.forEach((stage, index) => {
      if (!stage || typeof stage.id !== 'string' || !stage.id) {
        at(`stage ${index} has no id`)
        return
      }
      if (stageIds.has(stage.id)) at(`stage id '${stage.id}' is duplicated`)
      stageIds.add(stage.id)
      const terminal = index === fixture.stages.length - 1
      if (terminal && stage.hours != null) at(`terminal stage '${stage.id}' must not have a duration`)
      if (!terminal && (!Number.isFinite(stage.hours) || stage.hours <= 0)) {
        at(`stage '${stage.id}' must have a positive finite duration`)
      }
    })

    if (!fixture.groups || typeof fixture.groups !== 'object' || Array.isArray(fixture.groups)) {
      at('groups must be an object')
    } else {
      for (const [groupId, members] of Object.entries(fixture.groups)) {
        if (!Array.isArray(members) || members.length === 0) {
          at(`group '${groupId}' must contain at least one stage`)
          continue
        }
        if (new Set(members).size !== members.length) at(`group '${groupId}' repeats a stage`)
        for (const stageId of members) {
          if (!stageIds.has(stageId)) at(`group '${groupId}' names unknown stage '${stageId}'`)
        }
      }
    }

    if (!Array.isArray(fixture.actions) || fixture.actions.length === 0) {
      at('actions must declare at least one capability')
    } else {
      if (new Set(fixture.actions).size !== fixture.actions.length) at('actions repeat a capability')
      for (const actionId of fixture.actions) {
        if (!FIXTURE_ACTION_IDS.includes(actionId)) at(`action '${actionId}' is not canonical`)
      }
      if (fixture.actions.includes('extinguish') && fixture.stages.at(-1)?.hours != null) {
        at('extinguish requires a duration-less terminal stage')
      }
    }
  }
  return Object.freeze(issues)
}

export const TIMED_WORLD_FIXTURE_ISSUES = fixtureDefinitionIssues()
if (TIMED_WORLD_FIXTURE_ISSUES.length) {
  throw new Error(`Invalid timed world fixtures:\n${TIMED_WORLD_FIXTURE_ISSUES.join('\n')}`)
}

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

const immutableLedger = (fixtures) => Object.freeze({
  ...(fixtures && typeof fixtures === 'object' && !Array.isArray(fixtures) ? fixtures : {}),
})

// Evaluate and apply one authored capability without mutating the supplied
// ledger. `activate` also covers a relight after the terminal stage; `refuel`
// resets an already-known fixture from any stage, while a fixture that has
// never existed must first be activated. Aliases are accepted at the API edge
// but transitions always expose their canonical action id.
export function fixtureActionTransition(fixtures, fixtureId, requestedActionId, clock) {
  const fixture = TIMED_WORLD_FIXTURES[fixtureId]
  const actionId = canonicalFixtureActionId(requestedActionId)
  const ledger = immutableLedger(fixtures)
  const before = fixtureStageAt(fixtureId, ledger[fixtureId], clock)

  const finish = (applied, reason, nextLedger = ledger, after = before) => Object.freeze({
    applied,
    reason,
    fixtureId,
    requestedActionId,
    actionId,
    before,
    after,
    fixtures: nextLedger,
  })

  if (!fixture) return finish(false, 'unknown-fixture')
  if (!actionId) return finish(false, 'unknown-action')
  if (!fixture.actions.includes(actionId)) return finish(false, 'unsupported-action')
  if (!Number.isFinite(clock) || clock < 0) return finish(false, 'invalid-clock')

  const initialStage = fixture.stages[0].id
  const terminalStage = fixture.stages.at(-1).id
  let activatedAt

  if (actionId === 'activate') {
    if (before !== null && before !== terminalStage) return finish(false, 'state-disallows-action')
    activatedAt = clock
  } else if (actionId === 'extinguish') {
    if (before === null || before === terminalStage) return finish(false, 'state-disallows-action')
    const terminalOffset = fixtureStageOffset(fixtureId, terminalStage)
    if (!Number.isFinite(terminalOffset)) return finish(false, 'invalid-definition')
    // Current saves accept only non-negative activation clocks. The shipped
    // world begins after this boundary, but custom fixtures and focused tests
    // can start at zero; fail closed rather than emit a ledger reload would
    // later discard.
    if (clock < terminalOffset) return finish(false, 'unrepresentable-terminal-state')
    activatedAt = clock - terminalOffset
  } else if (actionId === 'refuel') {
    if (before === null) return finish(false, 'state-disallows-action')
    activatedAt = clock
  }

  const nextLedger = Object.freeze({ ...ledger, [fixtureId]: activatedAt })
  const after = fixtureStageAt(fixtureId, activatedAt, clock)
  const expected = actionId === 'extinguish' ? terminalStage : initialStage
  if (after !== expected) return finish(false, 'invalid-definition')
  return finish(true, 'applied', nextLedger, after)
}

// Reducers that only need the next fixture ledger can use this convenience
// wrapper; diagnostics and UI affordances should retain the richer transition.
export const applyFixtureAction = (fixtures, fixtureId, actionId, clock) =>
  fixtureActionTransition(fixtures, fixtureId, actionId, clock).fixtures
