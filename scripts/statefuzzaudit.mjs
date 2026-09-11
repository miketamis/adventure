// Deterministic adversarial audit of reducer and save-state boundaries.
// Unlike the authored-path audits, this deliberately replays stale UI actions,
// lies about targets, corrupts stored scalar/map types, and walks every role.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  HEART_LEVELS,
  ITEMS,
  STORY,
  STORY_OBSERVATION_BEATS,
  START_NODE,
  WORLD_HUB,
  itemHasAffordance,
  itemHasTag,
} from '../src/game/content.js'
import { ACHIEVEMENTS, ACHIEVEMENT_BY_ID } from '../src/game/achievements.js'
import { EMBODIMENT_QUESTS, embodimentOptionAccess } from '../src/game/embodiment.js'
import {
  START_CLOCK,
  START_HEARTS,
  canChoose,
  civilHourAtClock,
  currentStoryState,
  hasCond,
  loadAchievements,
  loadState,
  normalizeSavedState,
  phraseSenses,
  projectedClockForOption,
  reducer,
  trainablePhraseSenses,
} from '../src/game/gameState.js'
import { TIMED_WORLD_FIXTURES, parseFixtureCondition } from '../src/game/worldFixtures.js'
import { optionEffectsOf } from '../src/game/stateMechanics.js'
import {
  effectLockText,
  interactionLockText,
} from '../src/components/storyMechanicsPresentation.js'

const checks = []
const check = (name, fn) => {
  try {
    const detail = fn()
    checks.push({ name, ok: true, detail })
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
  }
}

const stateAt = (nodeId = START_NODE, extra = {}) => ({
  nodeId, clock: START_CLOCK, cameFrom: null, cameFromPhase: null, familiar: false,
  heard: {}, rumor: false, trail: [], discovered: {}, inventory: {}, mana: {},
  practiced: {}, visited: {}, earned: {}, eligible: {}, attempts: {},
  flags: {}, knowledge: {}, observations: {}, interactions: {}, rendezvous: {},
  dismissedTests: {}, pendingTest: null, hearts: START_HEARTS,
  healedAt: {}, turn: 1, fixtures: {}, npcStarted: {}, worldFacts: {},
  view: 'story', ended: null, embodying: null, embodimentOriginNode: null,
  embodimentFocusNode: null, embodimentWorldNode: null, embodimentPaused: false,
  embodimentClock: null, embodimentInventorySnapshot: null, embodimentInventoryIsolated: null,
  embodimentHeartsSnapshot: null,
  embodimentArrivalSnapshot: null,
  pendingEmbodiment: null, timePassage: null,
  debug: false, loreFocus: null, ...extra,
})

const list = (value) => value == null ? [] : Array.isArray(value) ? value : [value]
const virtual = (id) => typeof id === 'string' && (
  ['dawn', 'day', 'dusk', 'night', 'again', 'rumor', 'embodying'].includes(id) ||
  /^(fixture|greeting|season|weather|festival|weekday|fact|flag|knows|observed|itemTag|affords|from|became|visited|heard|npc|npcAt|rendezvous|embodying):/.test(id)
)

const firstItemMatching = (predicate) => Object.values(ITEMS).find(predicate)?.id

function seedInventoryEffects(state, option) {
  const running = { ...state.inventory }
  const minimum = {}
  for (const effect of optionEffectsOf(option)) {
    if (effect?.type !== 'inventory') continue
    running[effect.id] = (running[effect.id] || 0) + effect.delta
    minimum[effect.id] = Math.min(minimum[effect.id] || 0, running[effect.id])
  }
  for (const [id, low] of Object.entries(minimum)) {
    if (low < 0) state.inventory[id] = (state.inventory[id] || 0) - low
  }
}

function seedFixtureEffects(state, option, clock) {
  const seeded = new Set()
  for (const effect of optionEffectsOf(option)) {
    if (effect?.type !== 'fixture' || seeded.has(effect.id)) continue
    seeded.add(effect.id)
    state.fixtures = { ...state.fixtures }
    if (effect.action === 'activate') delete state.fixtures[effect.id]
    else state.fixtures[effect.id] = clock
  }
}

function fixtureActivationFor(id, clock) {
  const condition = parseFixtureCondition(id)
  if (!condition) return null
  const fixture = TIMED_WORLD_FIXTURES[condition.fixtureId]
  const requested = fixture.groups[condition.stateId]?.[0] || condition.stateId
  let age = 0
  for (const stage of fixture.stages) {
    if (stage.id === requested) return Math.max(0, clock - age)
    age += stage.hours || 0
  }
  return null
}

function seedConditions(input, option) {
  const state = {
    ...input,
    inventory: { ...input.inventory, lek: Math.max(999, Number(input.inventory?.lek) || 0) },
    worldFacts: { ...input.worldFacts }, heard: { ...input.heard },
    visited: { ...input.visited }, npcStarted: { ...input.npcStarted },
    flags: { ...input.flags }, knowledge: { ...input.knowledge },
    observations: { ...input.observations },
  }
  for (const id of list(option.requires)) {
    if (!virtual(id)) state.inventory[id] = Math.max(2, state.inventory[id] || 0)
    else if (id.startsWith('fact:')) state.worldFacts[id.slice(5)] = { atClock: state.clock, source: 'fuzz' }
    else if (id.startsWith('visited:')) state.visited[id.slice(8).split('|')[0]] = true
    else if (id.startsWith('heard:')) state.heard[id.slice(6)] = true
    else if (id.startsWith('flag:')) state.flags[id.slice(5)] = true
    else if (id.startsWith('knows:')) state.knowledge[id.slice(6)] = { atClock: state.clock, source: 'fuzz' }
    else if (id.startsWith('observed:')) state.observations[id.slice(9)] = { atClock: state.clock, nodeId: state.nodeId }
    else if (id.startsWith('itemTag:')) {
      const itemId = firstItemMatching((item) => itemHasTag(item, id.slice(8)))
      if (itemId) state.inventory[itemId] = Math.max(2, state.inventory[itemId] || 0)
    }
    else if (id.startsWith('affords:')) {
      const itemId = firstItemMatching((item) => itemHasAffordance(item, id.slice(8)))
      if (itemId) state.inventory[itemId] = Math.max(2, state.inventory[itemId] || 0)
    }
    else if (id.startsWith('from:')) state.cameFrom = id.slice(5).split('|')[0]
    else if (id === 'again') state.familiar = true
    else if (id === 'rumor') state.rumor = true
    else if (id.startsWith('fixture:')) {
      const condition = parseFixtureCondition(id)
      const activatedAt = fixtureActivationFor(id, state.clock)
      if (condition && activatedAt != null) state.fixtures = { ...state.fixtures, [condition.fixtureId]: activatedAt }
    }
  }
  for (const id of list(option.unless)) {
    if (!virtual(id)) delete state.inventory[id]
    else if (id.startsWith('fact:')) delete state.worldFacts[id.slice(5)]
    else if (id.startsWith('visited:')) for (const key of id.slice(8).split('|')) delete state.visited[key]
    else if (id.startsWith('heard:')) delete state.heard[id.slice(6)]
    else if (id.startsWith('flag:')) delete state.flags[id.slice(5)]
    else if (id.startsWith('knows:')) delete state.knowledge[id.slice(6)]
    else if (id.startsWith('observed:')) delete state.observations[id.slice(9)]
    else if (id.startsWith('itemTag:')) {
      for (const item of Object.values(ITEMS)) if (itemHasTag(item, id.slice(8))) delete state.inventory[item.id]
    }
    else if (id.startsWith('affords:')) {
      for (const item of Object.values(ITEMS)) if (itemHasAffordance(item, id.slice(8))) delete state.inventory[item.id]
    }
    else if (id === 'again') state.familiar = false
    else if (id === 'rumor') state.rumor = false
    else if (id.startsWith('fixture:')) {
      const condition = parseFixtureCondition(id)
      if (condition) delete state.fixtures[condition.fixtureId]
    }
  }
  seedInventoryEffects(state, option)
  for (const id of trainablePhraseSenses(option.text)) {
    state.discovered[id] = true
    state.mana[id] = Math.max(3, state.mana[id] || 0)
  }
  return state
}

function readyFor(input, option) {
  const seeded = seedConditions(input, option)
  const start = Math.max(0, seeded.clock)
  for (let clock = start; clock < start + 370 * 24; clock++) {
    let candidate = { ...seeded, clock }
    seedFixtureEffects(candidate, option, projectedClockForOption(candidate, option))
    for (const id of list(option.requires)) {
      const condition = parseFixtureCondition(id)
      const activatedAt = fixtureActivationFor(id, clock)
      if (condition && activatedAt != null) {
        candidate.fixtures = { ...candidate.fixtures, [condition.fixtureId]: activatedAt }
      }
    }
    for (const id of list(option.unless)) {
      const condition = parseFixtureCondition(id)
      if (condition) {
        candidate.fixtures = { ...candidate.fixtures }
        delete candidate.fixtures[condition.fixtureId]
      }
    }
    if (canChoose(candidate, option) && embodimentOptionAccess(candidate, option, STORY[option.to]).ok) return candidate
  }
  return null
}

const choose = (state, option, extra = {}) => reducer(state, {
  type: 'CHOOSE', option, targetNode: STORY[option.to],
  fromNodeId: state.nodeId, fromTurn: state.turn, ...extra,
})
const dismissPassage = (state) => reducer(state, {
  type: 'DISMISS_TIME_PASSAGE',
  passageId: state.timePassage?.id,
  expectedStep: state.timePassage?.step,
})

check('every feasible authored choice ignores forged targets and rejects stale replay', () => {
  const forgedEnding = Object.values(STORY).find((node) => node.end === 'bad')
  let covered = 0
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (option.confuser || !STORY[option.to] || list(option.requires).some((id) => id === 'embodying' || id.startsWith?.('embodying:'))) continue
      const before = readyFor(stateAt(nodeId), option)
      if (!before) continue
      const expectedClock = projectedClockForOption(before, option)
      if (option.atHour != null) {
        assert.equal(civilHourAtClock(expectedClock), option.atHour, `${nodeId}->${option.to}: exact civil-hour projection drifted`)
      }
      const action = {
        type: 'CHOOSE', option, targetNode: forgedEnding,
        fromNodeId: before.nodeId, fromTurn: before.turn,
        embodimentConfirmed: Boolean(option.become),
      }
      const after = reducer(before, action)
      assert.equal(after.nodeId, option.to, `${nodeId}->${option.to}: forged target controlled movement`)
      assert.equal(after.ended, STORY[option.to].end || null, `${nodeId}->${option.to}: forged target controlled ending`)
      assert.equal(after.clock, expectedClock, `${nodeId}->${option.to}: wrong clock commit`)
      assert.equal(after.turn, before.turn + 1, `${nodeId}->${option.to}: wrong turn commit`)
      assert.equal(reducer(after, action), after, `${nodeId}->${option.to}: stale action replayed`)
      for (const id of trainablePhraseSenses(option.text)) assert.equal(after.mana[id], before.mana[id] - 1, `${nodeId}->${option.to}: ${id} not spent exactly once`)
      assert.ok(after.hearts >= 0 && after.hearts <= START_HEARTS, `${nodeId}->${option.to}: hearts out of range`)
      covered++
    }
  }
  assert.ok(covered >= 700, `only ${covered} choices reached adversarial commit coverage`)
  return `${covered} authored transitions`
})

check('attention actions are exhaustive in either order and cannot consume time or replay', () => {
  let exercised = 0
  const nodes = new Set(STORY_OBSERVATION_BEATS.map((beat) => beat.nodeId))
  for (const nodeId of nodes) {
    const options = STORY[nodeId].options.filter((option) => option.contextObservation)
    const orders = options.length === 2 ? [options, [...options].reverse()] : [options]
    for (const order of orders) {
      let state = stateAt(nodeId)
      for (const option of order) {
        const before = readyFor(state, option)
        assert.ok(before, `${nodeId}/${option.observation.id}: attention cannot be prepared`)
        const atClock = before.clock
        const fromTurn = before.turn
        const after = choose(before, option)
        assert.equal(after.nodeId, nodeId, `${nodeId}/${option.observation.id}: attention moved the player`)
        assert.equal(after.clock, atClock, `${nodeId}/${option.observation.id}: attention consumed time`)
        assert.ok(after.observations[option.observation.id], `${nodeId}/${option.observation.id}: result was not recorded`)
        assert.equal(canChoose(after, option), false, `${nodeId}/${option.observation.id}: completed action remained clickable`)
        const stale = reducer(after, {
          type: 'CHOOSE', option, targetNode: STORY[nodeId], fromNodeId: nodeId, fromTurn,
        })
        assert.equal(stale, after, `${nodeId}/${option.observation.id}: stale attention replayed`)
        state = after
        exercised++
      }
      const loaded = normalizeSavedState(JSON.parse(JSON.stringify(state)), stateAt(nodeId))
      assert.deepEqual(loaded.observations, state.observations, `${nodeId}: observed detail was lost on reload`)
    }
  }
  return `${exercised} ordered observation commits across ${nodes.size} scenes`
})

check('every character threshold confirms atomically, pauses, resumes, and closes', () => {
  let thresholds = 0
  for (const [from, node] of Object.entries(STORY)) {
    for (const [optionIndex, option] of (node.options || []).entries()) {
      if (!option.become) continue
      const before = readyFor(stateAt(from, { inventory: { lek: 17, buke: 2 } }), option)
      assert.ok(before, `${from}->${option.to}: threshold cannot be prepared`)
      const pending = reducer(before, { type: 'REQUEST_EMBODIMENT', optionIndex })
      assert.equal(pending.nodeId, before.nodeId)
      assert.deepEqual(pending.inventory, before.inventory)
      const entered = reducer(pending, { type: 'CONFIRM_EMBODIMENT' })
      assert.equal(entered.nodeId, option.to)
      assert.ok(entered.embodying)
      assert.deepEqual(entered.embodimentInventorySnapshot, before.inventory)
      const paused = reducer(entered, { type: 'PAUSE_EMBODIMENT' })
      assert.equal(paused.embodimentPaused, true)
      const resumed = reducer(paused, { type: 'RESUME_EMBODIMENT' })
      assert.equal(resumed.nodeId, entered.nodeId)
      assert.equal(resumed.embodimentPaused, false)
      thresholds++
    }
  }
  assert.ok(thresholds >= Object.keys(EMBODIMENT_QUESTS).length)

  let closed = 0
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    const parent = new Map([[quest.entryTo, null]])
    const via = new Map()
    const queue = [quest.entryTo]
    let ending = null
    while (queue.length && !ending) {
      const at = queue.shift()
      if (quest.endings.includes(at)) { ending = at; break }
      for (const option of STORY[at]?.options || []) {
        if (!quest.nodes.includes(option.to) || parent.has(option.to)) continue
        parent.set(option.to, at); via.set(option.to, option); queue.push(option.to)
      }
    }
    assert.ok(ending, `${id}: no ending route`)
    const path = []
    for (let at = ending; parent.get(at) != null; at = parent.get(at)) path.unshift(via.get(at))
    const pack = { lek: 17, buke: 2 }
    let state = stateAt(quest.entryTo, {
      embodying: id, embodimentOriginNode: quest.entryFrom,
      embodimentFocusNode: quest.entryTo, embodimentWorldNode: quest.returnTo || quest.entryFrom,
      embodimentInventorySnapshot: pack, inventory: { ...pack }, visited: { [quest.entryTo]: true },
    })
    for (const option of path) {
      state = readyFor(state, option)
      assert.ok(state, `${id}: cannot prepare ${option.to}`)
      state = choose(state, option)
      if (state.timePassage) state = dismissPassage(state)
    }
    assert.equal(state.nodeId, ending, `${id}: wrong terminal node`)
    assert.equal(state.ended, STORY[ending].end, `${id}: terminal did not become ending`)
    if (state.ended === 'bad') {
      state = reducer(state, { type: 'CONTINUE' })
      assert.equal(state.nodeId, START_NODE)
    } else {
      state = reducer(state, { type: 'RETURN_TO_WORLD', to: 'start' })
      assert.equal(state.nodeId, STORY[ending].returnTo || WORLD_HUB, `${id}: caller spoofed return destination`)
      assert.deepEqual(state.inventory, pack, `${id}: traveller pack not restored`)
    }
    assert.equal(state.embodying, null, `${id}: role survived closure`)
    closed++
  }
  return `${thresholds} thresholds; ${closed} role contracts`
})

check('long and calendar transitions persist one exact dismissible passage', () => {
  let covered = 0
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if ((option.durationHours ?? 0) < 24 && !option.date) continue
      const before = readyFor(stateAt(nodeId), option)
      if (!before) continue
      const after = choose(before, option, { embodimentConfirmed: Boolean(option.become) })
      assert.ok(after.timePassage, `${nodeId}->${option.to}: passage not persisted`)
      assert.equal(after.timePassage.toNodeId, after.nodeId)
      assert.equal(after.timePassage.toClock, after.clock)
      assert.equal(after.timePassage.elapsedHours, after.clock - before.clock)
      assert.equal(after.timePassage.step, 0)
      let progressed = after
      if (after.timePassage.segments.length > 1) {
        progressed = reducer(after, {
          type: 'ADVANCE_TIME_PASSAGE',
          passageId: after.timePassage.id,
          expectedStep: 0,
        })
        assert.equal(progressed.timePassage.step, 1)
        const staleAdvance = reducer(progressed, {
          type: 'ADVANCE_TIME_PASSAGE',
          passageId: after.timePassage.id,
          expectedStep: 0,
        })
        assert.equal(staleAdvance, progressed, `${nodeId}->${option.to}: stale passage click advanced twice`)
        assert.equal(reducer(progressed, {
          type: 'DISMISS_TIME_PASSAGE',
          passageId: after.timePassage.id,
          expectedStep: 0,
        }), progressed, `${nodeId}->${option.to}: prior segment dismissed the passage`)
      }
      const reloaded = normalizeSavedState(
        JSON.parse(JSON.stringify(progressed)),
        stateAt(),
      )
      assert.equal(reloaded.timePassage?.step, progressed.timePassage.step, `${nodeId}->${option.to}: reload lost passage segment`)
      assert.equal(reloaded.timePassage?.title, after.timePassage.title, `${nodeId}->${option.to}: reload lost canonical passage`)
      const corrupted = JSON.parse(JSON.stringify(progressed))
      corrupted.timePassage.title = 'Invented saved interval'
      corrupted.timePassage.label = 'A forged span'
      corrupted.timePassage.segments = [{ label: 'False event', detail: 'This was never authored.' }]
      const repaired = normalizeSavedState(corrupted, stateAt())
      assert.equal(repaired.timePassage?.title, after.timePassage.title, `${nodeId}->${option.to}: saved prose overrode canonical passage`)
      assert.deepEqual(repaired.timePassage?.segments, after.timePassage.segments, `${nodeId}->${option.to}: saved segments overrode canonical passage`)
      assert.equal(reducer(progressed, {
        type: 'DISMISS_TIME_PASSAGE',
        passageId: 'stale-passage',
        expectedStep: progressed.timePassage.step,
      }), progressed, `${nodeId}->${option.to}: stale overlay dismissed current passage`)
      const dismissed = dismissPassage(progressed)
      assert.equal(dismissed.timePassage, null)
      assert.equal(dismissPassage(dismissed), dismissed)
      covered++
    }
  }
  assert.ok(covered >= 15, `only ${covered} passages covered`)
  return `${covered} passages`
})

check('embodied long passages persist both clocks and the current segment', () => {
  const option = STORY.binoshetDasma.options.find((candidate) => candidate.to === 'binoshetKuvendi')
  const taleFromClock = 600
  const worldFromClock = 1000
  let before = stateAt('binoshetDasma', {
    clock: worldFromClock,
    embodimentClock: taleFromClock,
    embodying: 'binoshet',
    embodimentOriginNode: 'lumi',
    embodimentFocusNode: 'binoshetDasma',
    embodimentWorldNode: 'lumi',
    embodimentPaused: false,
    embodimentInventorySnapshot: { lek: 8 },
    embodimentInventoryIsolated: true,
    embodimentHeartsSnapshot: 2,
    inventory: {},
    visited: { binoshetDasma: true },
  })
  before = seedConditions(before, option)
  const after = choose(before, option)
  assert.equal(after.timePassage.clockKind, 'tale')
  assert.equal(after.embodimentClock, taleFromClock + option.durationHours)
  assert.equal(after.clock, worldFromClock + option.durationHours)
  assert.equal(after.clock - after.embodimentClock, worldFromClock - taleFromClock)
  assert.equal(after.timePassage.worldFromClock, worldFromClock)
  assert.equal(after.timePassage.worldToClock, after.clock)

  const progressed = reducer(after, {
    type: 'ADVANCE_TIME_PASSAGE',
    passageId: after.timePassage.id,
    expectedStep: 0,
  })
  assert.equal(progressed.timePassage.step, 1)
  const reloaded = normalizeSavedState(JSON.parse(JSON.stringify(progressed)), stateAt())
  assert.equal(reloaded.timePassage.step, 1)
  assert.equal(reloaded.timePassage.clockKind, 'tale')
  assert.equal(reloaded.clock, after.clock)
  assert.equal(reloaded.embodimentClock, after.embodimentClock)
  assert.equal(currentStoryState(reloaded).conditionClock, after.embodimentClock)
  return 'tale/world delta; mid-passage reload; canonical segment'
})

check('hard restart clears transient role state but preserves durable learning', () => {
  const durable = {
    mana: { ec: 4 }, practiced: { ec: 8 }, visited: { lumi: true }, heard: { deti: true },
    earned: { fate: true }, eligible: { deed: true }, attempts: { deed: 3 },
    worldFacts: { riverRestored: { atClock: 90, source: 'audit' } },
    knowledge: { riverName: { atClock: 45, source: 'elder' } },
    debug: true,
  }
  const active = stateAt('maroNisja', {
    ...durable,
    hearts: 2,
    inventory: { grure: 1 },
    discovered: { ec: true },
    embodying: 'maro-perhitura',
    embodimentOriginNode: 'fshatiJeta',
    embodimentFocusNode: 'maroNisja',
    embodimentWorldNode: 'fshatiJeta',
    embodimentClock: 40,
    embodimentInventorySnapshot: { lek: 11, buke: 2 },
    embodimentInventoryIsolated: true,
    embodimentHeartsSnapshot: 2,
    flags: { taleGate: true },
    interactions: { work: { run: { uses: 2, lastAtClock: 40 } } },
    rendezvous: { promised: { id: 'promised' } },
  })
  assert.equal(reducer(active, { type: 'RESET' }), active, 'living role was abandoned by hard restart')

  const fatal = { ...active, hearts: 0 }
  const restarted = reducer(fatal, { type: 'RESET' })
  assert.equal(restarted.nodeId, START_NODE)
  assert.equal(restarted.hearts, START_HEARTS)
  assert.equal(restarted.embodying, null)
  assert.equal(restarted.timePassage, null)
  assert.deepEqual(restarted.inventory, {})
  assert.deepEqual(restarted.flags, {})
  assert.deepEqual(restarted.interactions, {})
  assert.deepEqual(restarted.rendezvous, {})
  assert.deepEqual(restarted.discovered, active.discovered)
  for (const key of Object.keys(durable)) assert.deepEqual(restarted[key], durable[key], `${key} was not durable`)
  assert.deepEqual(reducer(restarted, { type: 'RESET' }), restarted, 'repeated hard restart changed clean state')
  return 'live-role lock; fatal recovery; repeat idempotence'
})

check('achievement reducer cannot bypass deed gates or redirect ending returns', () => {
  const achievement = ACHIEVEMENTS[0]
  const locked = stateAt()
  assert.equal(reducer(locked, { type: 'EARN_ACHIEVEMENT', id: achievement.id }), locked)
  assert.equal(reducer(locked, { type: 'EARN_ACHIEVEMENT', id: 'invented' }), locked)
  const eligible = stateAt(START_NODE, { hearts: 1, eligible: { [achievement.id]: true } })
  const earned = reducer(eligible, { type: 'EARN_ACHIEVEMENT', id: achievement.id })
  assert.equal(earned.earned[achievement.id], true)
  assert.equal(earned.hearts, START_HEARTS)
  assert.equal(reducer(earned, { type: 'FAIL_TEST', id: achievement.id }), earned)

  for (const [id, node] of Object.entries(STORY)) {
    if (!['good', 'secret'].includes(node.end)) continue
    const returned = reducer(stateAt(id, { ended: node.end, visited: {} }), { type: 'RETURN_TO_WORLD', to: START_NODE })
    assert.equal(returned.nodeId, node.returnTo || WORLD_HUB, `${id}: return target was caller-controlled`)
  }
  return `${ACHIEVEMENTS.length} deed-gated achievements`
})

check('every repeat-sensitive UI commit has an immediate same-render lock', () => {
  const component = (name) => readFileSync(new URL(`../src/components/${name}`, import.meta.url), 'utf8')
  const comprehension = component('ComprehensionTest.jsx')
  assert.match(comprehension, /answerCommitted\s*=\s*useRef\(false\)/)
  assert.match(comprehension, /advanceCommitted\s*=\s*useRef\(false\)/)
  assert.match(comprehension, /if \(advanceCommitted\.current\) return/)
  assert.match(comprehension, /advanceCommitted\.current = true/)

  const practice = component('PracticeView.jsx')
  assert.doesNotMatch(practice, /canChoose\([^\n]+\)\.ok/, 'PracticeView treats canChoose boolean as an object')
  assert.match(practice, /answerCommitted\s*=\s*useRef\(false\)/)
  assert.match(practice, /if \(answered \|\| answerCommitted\.current\) return/)

  const passage = component('TimePassage.jsx')
  assert.match(passage, /actionCommitted\s*=\s*useRef\(false\)/)
  assert.ok((passage.match(/if \(actionCommitted\.current\) return/g) || []).length >= 2)
  assert.match(passage, /actionCommitted\.current = false\s*\n\s*continueRef\.current\?\.focus\(\)/)
  assert.match(passage, /type: 'ADVANCE_TIME_PASSAGE'/)
  assert.ok((passage.match(/passageId: passage\.id/g) || []).length >= 2)
  assert.ok((passage.match(/expectedStep: step/g) || []).length >= 2)

  const story = component('StoryView.jsx')
  assert.match(story, /fromNodeId: state\.nodeId, fromTurn: state\.turn/)
  assert.match(story, /expectedCount: state\.inventory\[id\]/)
  assert.match(story, /type: 'HEAL', expectedHearts: state\.hearts/)
  assert.match(story, /interactionLockText\(e\.interaction\)/)
  assert.match(story, /effectLockText\(/)
  assert.equal(interactionLockText({ ok: false, reason: 'cooldown', remainingHours: 2 }), 'ready in 2h')
  assert.equal(effectLockText({ ok: false, reason: 'missing-item', itemId: 'buke', need: 1 }), 'need 1 buke')
  assert.equal(effectLockText({ ok: false, reason: 'insufficient-lek', need: 3 }), 'need 3 more lek')
  assert.equal(effectLockText({ ok: false, reason: 'fixture-out-of-reach' }), 'you must be beside it')
  assert.ok((story.match(/type: 'CONFUSE'/g) || []).length >= 2)
  assert.ok((story.match(/consequence: storyConfuserConsequence/g) || []).length >= 2)

  const confuse = stateAt(START_NODE, { hearts: 3 })
  const action = {
    type: 'CONFUSE',
    expectedHearts: confuse.hearts,
    consequence: {
      source: 'story-confuser',
      eventId: 'state-fuzz:confuser',
      attempted: { al: 'pi urën' },
      reason: { code: 'impossible-scene-action', text: 'A bridge is not something the player can drink.' },
      reasoning: 'Choose an action that the object in this scene can physically support.',
    },
  }
  const once = reducer(confuse, action)
  assert.equal(once.hearts, 2)
  assert.equal(reducer(once, action), once, 'a stale confuser activation charged a second heart')

  const healIds = new Set([
    ...phraseSenses(HEART_LEVELS[1].line),
    ...phraseSenses(HEART_LEVELS[1].heal.phrase),
    ...phraseSenses(HEART_LEVELS[2].line),
    ...phraseSenses(HEART_LEVELS[2].heal.phrase),
  ])
  const healReady = stateAt(START_NODE, {
    hearts: 1,
    discovered: Object.fromEntries([...healIds].map((id) => [id, true])),
    mana: Object.fromEntries([...healIds].map((id) => [id, 2])),
  })
  const healAction = { type: 'HEAL', expectedHearts: 1 }
  const healedOnce = reducer(healReady, healAction)
  assert.equal(healedOnce.hearts, 2)
  assert.equal(reducer(healedOnce, healAction), healedOnce, 'a stale heal activation mended a second level')
  assert.equal(reducer(healReady, { type: 'HEAL' }), healReady, 'an unbound heal action omitted its rendered level')
  return 'quiz, practice, passage, choice, item, heal and confuser commits'
})

check('malformed and torn saves normalize to playable, monotonic state', () => {
  const fresh = stateAt(START_NODE, {
    earned: { durableEarned: true }, eligible: { durableEarned: true, durableDeed: true },
    attempts: { durableDeed: 7 },
  })
  const corruptValues = [null, [], 'broken', -9, 4.8, Infinity, { x: '7', y: -2, z: null }]
  let cases = 0
  for (let i = 0; i < 1200; i++) {
    const pick = (offset) => corruptValues[(i + offset) % corruptValues.length]
    const saved = {
      nodeId: i % 3 ? START_NODE : 'missing-node', clock: pick(0), turn: pick(1),
      peak: pick(2), hearts: pick(3), inventory: pick(4), mana: pick(5), practiced: pick(6),
      visited: pick(1), heard: pick(2), discovered: pick(3), earned: { durableEarned: false },
      eligible: { durableDeed: false }, attempts: { durableDeed: i % 5 }, worldFacts: pick(4),
      flags: pick(5), knowledge: pick(6), observations: pick(0), environmentNarration: pick(2),
      healthNarration: pick(3), inventoryNarration: pick(4),
      interactions: pick(0), rendezvous: pick(1),
      npcStarted: pick(5), trail: pick(6), ended: i % 2 ? 'good' : 'nonsense',
      view: i % 2 ? 'achievements' : 'missing', pendingTest: 'invented',
      timePassage: { toNodeId: START_NODE, fromClock: 0, toClock: 4 },
    }
    const state = normalizeSavedState(saved, fresh)
    assert.ok(STORY[state.nodeId])
    assert.ok(Number.isInteger(state.clock) && state.clock >= 0)
    assert.ok(Number.isInteger(state.turn) && state.turn >= 1)
    assert.ok(Number.isInteger(state.hearts) && state.hearts >= 0 && state.hearts <= START_HEARTS)
    assert.equal(Object.hasOwn(state, 'peak'), false, 'retired peak state survived save normalization')
    for (const key of [
      'inventory', 'mana', 'practiced', 'visited', 'heard', 'discovered', 'npcStarted',
      'flags', 'knowledge', 'observations', 'environmentNarration', 'healthNarration',
      'inventoryNarration', 'interactions', 'rendezvous',
    ]) {
      assert.ok(state[key] && typeof state[key] === 'object' && !Array.isArray(state[key]), `${key} not repaired`)
    }
    assert.equal(state.earned.durableEarned, true)
    assert.equal(state.eligible.durableDeed, true)
    assert.ok(state.attempts.durableDeed >= 7)
    assert.equal(state.ended, STORY[state.nodeId].end || null)
    assert.equal(state.pendingTest, null)
    assert.equal(state.timePassage, null)
    assert.ok(['story', 'endings'].includes(state.view))
    cases++
  }

  const numeric = normalizeSavedState({
    ...fresh,
    inventory: { lek: '7', buke: '2', poison: -4 },
    discovered: { ec: true },
    mana: { ec: '3' },
    practiced: { ec: '3' },
  }, stateAt())
  assert.deepEqual(numeric.inventory, { lek: 7, buke: 2 })
  assert.deepEqual(numeric.mana, { ec: 3 })
  assert.equal(normalizeSavedState(null, fresh).nodeId, START_NODE)
  return `${cases} corrupted-save permutations`
})

check('storage migration preserves progress when a saved scene was retired', () => {
  const originalStorage = globalThis.localStorage
  const achievement = ACHIEVEMENTS.find((entry) => entry.kind === 'area') || ACHIEVEMENTS[0]
  const legacyAchievement = ACHIEVEMENTS.find((entry) => entry.id !== achievement.id)
  const values = new Map([
    ['aventura.achievements.v1', JSON.stringify({
      earned: { [achievement.id]: true, falseFlag: false },
      eligible: {},
      attempts: { [achievement.id]: '7', malformed: 'many' },
    })],
    ['aventura.endings.v1', JSON.stringify({ [legacyAchievement.id]: true, oldFalse: false })],
    ['aventura.state.v1', JSON.stringify({
      nodeId: 'retired-scene-id',
      mana: { ec: 9 },
      practiced: { ec: 12 },
      discovered: { ec: true },
      visited: { lumi: true },
      earned: { [achievement.id]: false },
      eligible: { [achievement.id]: false },
      attempts: { [achievement.id]: 2 },
      clock: 99,
      turn: 14,
    })],
  ])
  globalThis.localStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  }
  try {
    const compact = loadAchievements()
    assert.equal(compact.earned[achievement.id], true)
    assert.equal(compact.eligible[achievement.id], true, 'earned achievement was not made eligible')
    assert.equal(compact.earned[legacyAchievement.id], true, 'new compact key hid a legacy achievement')
    assert.equal(compact.eligible[legacyAchievement.id], true)
    assert.equal(compact.attempts[achievement.id], 7)
    assert.equal(compact.earned.falseFlag, undefined)
    assert.equal(compact.attempts.malformed, undefined)

    const loaded = loadState()
    assert.equal(loaded.nodeId, START_NODE)
    assert.equal(loaded.mana.ec, 9, 'retired scene erased word tokens')
    assert.equal(loaded.practiced.ec, 12, 'retired scene erased practice history')
    assert.equal(loaded.discovered.ec, true, 'retired scene erased current-run discoveries')
    assert.equal(loaded.visited.lumi, true, 'retired scene erased explored places')
    assert.equal(loaded.earned[achievement.id], true)
    assert.equal(loaded.earned[legacyAchievement.id], true)
    assert.equal(loaded.eligible[achievement.id], true)
    assert.equal(loaded.attempts[achievement.id], 7)
    assert.equal(loaded.clock, 99)
    assert.equal(loaded.turn, 14)

    values.set('aventura.state.v1', '{torn json')
    const recovered = loadState()
    assert.equal(recovered.nodeId, START_NODE)
    assert.equal(recovered.earned[achievement.id], true, 'torn run erased compact achievements')
    assert.equal(recovered.attempts[achievement.id], 7)
  } finally {
    if (originalStorage === undefined) delete globalThis.localStorage
    else globalThis.localStorage = originalStorage
  }
  return 'retired-node migration; compact repair; torn-JSON recovery'
})

for (const result of checks) {
  console.log(`${result.ok ? '✅' : '❌'} ${result.name}${result.ok && result.detail ? ` — ${result.detail}` : result.error ? ` — ${result.error}` : ''}`)
}
const failed = checks.filter((result) => !result.ok)
console.log(`\n${failed.length ? '❌' : '✅'} ${checks.length - failed.length}/${checks.length} adversarial state checks pass`)
if (failed.length) process.exitCode = 1
