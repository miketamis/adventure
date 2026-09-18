// Shared authoring projection oracle. Audits use the real reducer and the same
// visibility/condition helpers as play, while seeding only the exact state
// predicates declared by one option. This gives every authored edge a concrete
// before/after projection without maintaining per-audit fixtures.

import {
  ITEMS,
  STORY,
  itemHasAffordance,
  itemHasTag,
  lineOf,
} from '../../src/game/content.js'
import { embodimentOptionAccess } from '../../src/game/embodiment.js'
import {
  canAfford,
  canChoose,
  canSpeak,
  currentStoryState,
  effectAvailabilityForOption,
  environmentSnapshot,
  hasCond,
  hasRequiredItem,
  interactionAvailabilityForOption,
  isOptionRevealed,
  newRun,
  npcFirstEncounterPlanForState,
  optionNpcStartsAreValid,
  optionTimingIsValid,
  phraseSenses,
  projectedClockForOption,
  reducer,
  rendezvousAvailabilityForOption,
  timeOfDay,
  trainablePhraseSenses,
} from '../../src/game/gameState.js'
import { NPCS } from '../../src/game/npcs.js'
import {
  canonicalPlayerActionId,
  playerActionIdFromCondition,
} from '../../src/game/playerActionRuntime.js'
import { QUESTS, questActionAvailability } from '../../src/game/quests.js'
import { resolveRevealLine } from '../../src/game/revealResolver.js'
import { optionEffectsOf } from '../../src/game/stateMechanics.js'
import { isDistantLineVisible } from '../../src/game/worldModel.js'
import {
  TIMED_WORLD_FIXTURES,
  parseFixtureCondition,
} from '../../src/game/worldFixtures.js'

const list = (value) => value == null ? [] : Array.isArray(value) ? value : [value]
const virtual = (id) => typeof id === 'string' && (
  ['dawn', 'day', 'dusk', 'night', 'again', 'rumor', 'embodying'].includes(id)
  || /^(fixture|greeting|season|weather|festival|weekday|fact|flag|knows|observed|itemTag|affords|from|became|visited|heard|npc|npcAt|rendezvous|quest|arrival:action|embodying):/.test(id)
  || id === 'arrival:money'
)

const firstItemMatching = (predicate) => Object.values(ITEMS).find(predicate)?.id

const cloneRecord = (value) => ({ ...(value || {}) })
const cloneProjectionState = (input) => ({
  ...input,
  trail: [...(input.trail || [])],
  inventory: cloneRecord(input.inventory),
  flags: cloneRecord(input.flags),
  knowledge: cloneRecord(input.knowledge),
  observations: cloneRecord(input.observations),
  interactions: cloneRecord(input.interactions),
  rendezvous: Object.fromEntries(Object.entries(input.rendezvous || {})
    .map(([id, entry]) => [id, { ...entry }])),
  quests: Object.fromEntries(Object.entries(input.quests || {})
    .map(([id, entry]) => [id, { ...entry }])),
  fixtures: cloneRecord(input.fixtures),
  worldFacts: cloneRecord(input.worldFacts),
  visited: cloneRecord(input.visited),
  heard: cloneRecord(input.heard),
  npcStarted: cloneRecord(input.npcStarted),
  npcPortraitsSeen: cloneRecord(input.npcPortraitsSeen),
  activeNpcPortraits: input.activeNpcPortraits
    ? { ...input.activeNpcPortraits, npcIds: [...(input.activeNpcPortraits.npcIds || [])] }
    : null,
  discovered: cloneRecord(input.discovered),
  mana: cloneRecord(input.mana),
})

export function projectionStateAt(nodeId, extra = {}) {
  const base = newRun()
  return {
    ...base,
    nodeId,
    cameFrom: null,
    cameFromPhase: null,
    familiar: false,
    trail: [],
    inventory: {},
    flags: {},
    knowledge: {},
    observations: {},
    interactions: {},
    rendezvous: {},
    worldFacts: {},
    visited: {},
    heard: {},
    npcStarted: {},
    discovered: {},
    mana: {},
    quests: {},
    ended: null,
    timePassage: null,
    pendingEmbodiment: null,
    ...extra,
  }
}

function seedQuestCondition(state, id, present) {
  const condition = id.slice('quest:'.length)
  const separator = condition.lastIndexOf(':')
  if (separator <= 0) return
  const questId = condition.slice(0, separator)
  const status = condition.slice(separator + 1)
  const quest = QUESTS[questId]
  if (!quest) return
  if (!present) {
    delete state.quests[questId]
    return
  }
  state.quests[questId] = { status: status === 'objectives-ready' ? 'active' : status }
  if (status === 'objectives-ready') {
    for (const objective of quest.objectives || []) {
      if (objective.predicate?.type === 'inventory') {
        state.inventory[objective.predicate.id] = Math.max(
          objective.predicate.atLeast,
          state.inventory[objective.predicate.id] || 0,
        )
      }
    }
  }
}

function seedArrivalCondition(state, id, present) {
  if (!present) {
    state.cameFrom = null
    state.choiceIndex = null
    return
  }
  const actionId = playerActionIdFromCondition(id)
  const money = id === 'arrival:money'
  if (!actionId && !money) return
  const preferredSources = state.cameFrom ? [state.cameFrom] : Object.keys(STORY)
  for (const sourceId of preferredSources) {
    const optionIndex = (STORY[sourceId]?.options || []).findIndex((option) =>
      !option.confuser
      && option.to === state.nodeId
      && (money ? Boolean(option.moneyOutcome) : canonicalPlayerActionId(sourceId, option) === actionId))
    if (optionIndex >= 0) {
      state.cameFrom = sourceId
      state.choiceIndex = optionIndex
      return
    }
  }
}

function seedQuestAction(state, option) {
  const spec = option?.questAction
  const quest = spec && QUESTS[spec.id]
  if (!quest) return
  const requested = ['accept', 'decline'].includes(spec.action) ? 'offered' : 'active'
  state.quests[spec.id] = { status: requested }
  if (spec.action === 'turn-in') {
    for (const objective of quest.objectives || []) {
      if (objective.predicate?.type === 'inventory') {
        state.inventory[objective.predicate.id] = Math.max(
          objective.predicate.atLeast,
          state.inventory[objective.predicate.id] || 0,
        )
      }
    }
  }
}

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

function seedCondition(state, id, present) {
  if (typeof id !== 'string' || !id) return
  if (id.startsWith('flag:')) {
    if (present) state.flags[id.slice(5)] = true
    else delete state.flags[id.slice(5)]
  } else if (id.startsWith('fact:')) {
    if (present) state.worldFacts[id.slice(5)] = { atClock: state.clock, source: 'projection-audit' }
    else delete state.worldFacts[id.slice(5)]
  } else if (id.startsWith('visited:')) {
    const nodes = id.slice(8).split('|')
    if (present) state.visited[nodes[0]] = true
    else for (const nodeId of nodes) delete state.visited[nodeId]
  } else if (id.startsWith('heard:')) {
    if (present) state.heard[id.slice(6)] = true
    else delete state.heard[id.slice(6)]
  } else if (id.startsWith('knows:')) {
    if (present) state.knowledge[id.slice(6)] = { atClock: state.clock, source: 'projection-audit' }
    else delete state.knowledge[id.slice(6)]
  } else if (id.startsWith('observed:')) {
    if (present) state.observations[id.slice(9)] = { atClock: state.clock, nodeId: state.nodeId }
    else delete state.observations[id.slice(9)]
  } else if (id.startsWith('from:')) {
    const origins = id.slice(5).split('|')
    if (present) state.cameFrom = origins[0]
    else if (origins.includes(state.cameFrom)) state.cameFrom = null
  } else if (id === 'again') {
    state.familiar = present
  } else if (id === 'rumor') {
    state.rumor = present
  } else if (id === 'embodying') {
    if (present) state.embodying = state.embodying || 'projection-role'
    else state.embodying = null
  } else if (id.startsWith('embodying:')) {
    if (present) {
      state.embodying = id.slice(10)
      state.embodimentFocusNode = state.nodeId
      state.embodimentOriginNode = state.embodimentOriginNode || 'start'
      state.embodimentWorldNode = state.embodimentWorldNode || 'start'
      state.embodimentClock = state.clock
    } else if (state.embodying === id.slice(10)) {
      state.embodying = null
    }
  } else if (id.startsWith('quest:')) {
    seedQuestCondition(state, id, present)
  } else if (id.startsWith('arrival:action:') || id === 'arrival:money') {
    seedArrivalCondition(state, id, present)
  } else if (id.startsWith('became:')) {
    state.cameFromPhase = present ? '__projection_previous_phase__' : null
  } else if (ITEMS[id]) {
    if (present) state.inventory[id] = Math.max(2, state.inventory[id] || 0)
    else delete state.inventory[id]
  }
}

function seedClockCondition(state, id, present) {
  if (typeof id !== 'string') return
  if (id.startsWith('became:')) {
    const targetPhases = id.slice(7).split('|')
    const current = timeOfDay(state)
    state.cameFromPhase = present && targetPhases.includes(current)
      ? ['dawn', 'day', 'dusk', 'night'].find((phase) => phase !== current)
      : null
    return
  }
  if (id.startsWith('rendezvous:')) {
    const condition = id.slice('rendezvous:'.length)
    const separator = condition.lastIndexOf(':')
    if (separator <= 0) return
    const rendezvousId = condition.slice(0, separator)
    const status = condition.slice(separator + 1)
    if (!present) {
      delete state.rendezvous[rendezvousId]
      return
    }
    const base = {
      id: rendezvousId,
      npcId: 'projection-npc',
      placeId: state.nodeId,
      kind: 'meeting',
      agreedAtClock: Math.max(0, state.clock - 24),
      dueAtClock: state.clock + 1,
      graceHours: 1,
      leaveAfterHours: 4,
      metAtClock: null,
      outcome: null,
    }
    if (status === 'waiting') base.dueAtClock = state.clock
    if (status === 'late') base.dueAtClock = Math.max(0, state.clock - 2)
    if (status === 'missed') base.dueAtClock = Math.max(0, state.clock - 8)
    if (status === 'fulfilled' || status === 'on-time') {
      base.dueAtClock = state.clock
      base.metAtClock = state.clock
      base.outcome = 'on-time'
    }
    state.rendezvous[rendezvousId] = base
    return
  }
  if (!id.startsWith('npc:') && !id.startsWith('npcAt:')) return
  const parts = id.split(':')
  const npcId = parts[1]
  const npc = NPCS[npcId]
  if (!npc?.once) return
  if (!present) {
    delete state.npcStarted[npcId]
    return
  }
  const desiredNodes = id.startsWith('npcAt:') ? (parts[2] || '').split('|') : [state.nodeId]
  const routeIndex = npc.route.findIndex((nodeId) => desiredNodes.includes(nodeId))
  if (routeIndex >= 0) {
    state.npcStarted[npcId] = Math.max(0, state.clock - routeIndex * (npc.stepHours || 2))
  } else if (npc.settlesAt && desiredNodes.includes(npc.settlesAt)) {
    state.npcStarted[npcId] = Math.max(0, state.clock - npc.route.length * (npc.stepHours || 2))
  }
}

export function seedOptionProjection(input, option) {
  const state = cloneProjectionState(input)
  state.inventory.lek = Math.max(9999, Number(input.inventory?.lek) || 0)
  seedQuestAction(state, option)
  for (const id of list(option.requires)) {
    if (!virtual(id)) state.inventory[id] = Math.max(2, state.inventory[id] || 0)
    else if (id.startsWith('itemTag:')) {
      const itemId = firstItemMatching((item) => itemHasTag(item, id.slice(8)))
      if (itemId) state.inventory[itemId] = Math.max(2, state.inventory[itemId] || 0)
    } else if (id.startsWith('affords:')) {
      const itemId = firstItemMatching((item) => itemHasAffordance(item, id.slice(8)))
      if (itemId) state.inventory[itemId] = Math.max(2, state.inventory[itemId] || 0)
    } else if (id.startsWith('fixture:')) {
      const condition = parseFixtureCondition(id)
      const at = fixtureActivationFor(id, state.clock)
      if (condition && at != null) state.fixtures[condition.fixtureId] = at
    } else seedCondition(state, id, true)
  }
  for (const id of list(option.unless)) {
    if (!virtual(id)) delete state.inventory[id]
    else if (id.startsWith('itemTag:')) {
      for (const item of Object.values(ITEMS)) if (itemHasTag(item, id.slice(8))) delete state.inventory[item.id]
    } else if (id.startsWith('affords:')) {
      for (const item of Object.values(ITEMS)) if (itemHasAffordance(item, id.slice(8))) delete state.inventory[item.id]
    } else if (id.startsWith('fixture:')) {
      const condition = parseFixtureCondition(id)
      if (condition) delete state.fixtures[condition.fixtureId]
    } else seedCondition(state, id, false)
  }
  seedInventoryEffects(state, option)

  const node = STORY[state.nodeId]
  const reveal = option.reveal
    ? resolveRevealLine(node?.text?.map(lineOf), option)
    : { line: null, index: -1 }
  const revealEntry = node?.text?.[reveal.index]
  if (revealEntry && !Array.isArray(revealEntry)) {
    for (const id of list(revealEntry.cond)) seedCondition(state, id, !revealEntry.negate)
    for (const id of list(revealEntry.none)) seedCondition(state, id, false)
  }
  if (reveal.line?.observation?.id) {
    state.observations[reveal.line.observation.id] = { atClock: state.clock, nodeId: state.nodeId }
  }
  for (const id of new Set([
    ...trainablePhraseSenses(option.text),
    ...phraseSenses(reveal.line || []),
  ])) {
    state.discovered[id] = true
    state.mana[id] = Math.max(3, state.mana[id] || 0)
  }
  return state
}

function revealProjectionOf(node, option) {
  const resolution = option.reveal
    ? resolveRevealLine(node?.text?.map(lineOf), option)
    : { line: null, index: -1, status: 'none', matches: [] }
  const entry = node?.text?.[resolution.index]
  if (!entry || Array.isArray(entry)) {
    return { resolution, entry, required: [], excluded: [] }
  }
  return {
    resolution,
    entry,
    required: entry.negate ? [] : list(entry.cond),
    excluded: [...(entry.negate ? list(entry.cond) : []), ...list(entry.none)],
  }
}

function seedConditionAtClock(state, id, present, clock) {
  seedClockCondition(state, id, present)
  const fixture = parseFixtureCondition(id)
  if (!fixture) return
  if (!present) {
    delete state.fixtures[fixture.fixtureId]
    return
  }
  const activatedAt = fixtureActivationFor(id, clock)
  if (activatedAt != null) state.fixtures[fixture.fixtureId] = activatedAt
}

function renderedStoryLines(state) {
  const projected = currentStoryState(state)
  const environment = environmentSnapshot(projected)
  return npcFirstEncounterPlanForState(state).lines.filter((line) =>
    isDistantLineVisible(projected.nodeId, line, environment))
}

function portraitStateVariants(state) {
  const plan = npcFirstEncounterPlanForState(state)
  if (!plan.activeNpcIds.length) return [state]
  // A replacement portrait is intentionally first-encounter-only. The same
  // scene on a later canonical visit restores its source line, so exercise
  // both durable portrait states before declaring a reveal edge impossible.
  const revisited = cloneProjectionState(state)
  for (const npcId of plan.activeNpcIds) revisited.npcPortraitsSeen[npcId] = true
  revisited.activeNpcPortraits = null
  return [state, revisited]
}

function candidateBlockers(state, option, node, reveal) {
  const projected = currentStoryState(state)
  const blockers = []
  const renderedLines = renderedStoryLines(state)
  if (option.reveal && !['unique', 'selected'].includes(reveal.resolution.status)) {
    const matches = reveal.resolution.matches?.length || 0
    blockers.push(`reveal '${option.reveal}' is ${reveal.resolution.status} (${matches} matching source lines)`)
  } else if (!isOptionRevealed(projected, option, node, renderedLines)) {
    blockers.push(`selected reveal line is not visible and fully discovered in the rendered scene`)
  }

  const missing = list(option.requires).filter((id) => !hasCond(projected, id))
  const present = list(option.unless).filter((id) => hasCond(projected, id))
  if (missing.length) blockers.push(`unsatisfied requires: ${missing.join(', ')}`)
  if (present.length) blockers.push(`present exclusions: ${present.join(', ')}`)

  const speech = canSpeak(projected, option.text)
  if (!speech.allDiscovered) blockers.push(`undiscovered choice senses: ${speech.ids.filter((id) => !projected.discovered[id]).join(', ')}`)
  if (!speech.enoughMana) blockers.push(`insufficient choice tokens: ${speech.ids.filter((id) => (projected.mana[id] || 0) < 1).join(', ')}`)
  if (!optionTimingIsValid(option)) blockers.push('invalid timing metadata')
  if (!optionNpcStartsAreValid(option)) blockers.push('invalid startsNpc metadata')
  if (!canAfford(projected, option)) blockers.push('canonical money gate rejects the choice')

  const effects = effectAvailabilityForOption(projected, option)
  if (!effects.ok) blockers.push(`option effects unavailable${effects.reason ? `: ${effects.reason}` : ''}`)
  const interaction = interactionAvailabilityForOption(projected, option)
  if (!interaction.ok) blockers.push(`interaction unavailable${interaction.reason ? `: ${interaction.reason}` : ''}`)
  const rendezvous = rendezvousAvailabilityForOption(projected, option)
  if (!rendezvous.ok) blockers.push(`rendezvous unavailable${rendezvous.reason ? `: ${rendezvous.reason}` : ''}`)
  const quest = questActionAvailability(projected, option)
  if (!quest.ok) blockers.push(`quest action unavailable${quest.reason ? `: ${quest.reason}` : ''}`)
  const role = embodimentOptionAccess(projected, option, STORY[option.to])
  if (!role.ok) blockers.push(`embodiment boundary rejects the choice${role.reason ? `: ${role.reason}` : ''}`)
  if (!blockers.length && (!hasRequiredItem(projected, option) || !canChoose(projected, option))) {
    blockers.push('canonical choice policy rejects the otherwise seeded state')
  }
  return blockers
}

function findFeasibleOptionProjection(nodeId, option, {
  maximumHours = 370 * 24,
  extraState = {},
} = {}) {
  const node = STORY[nodeId]
  const seeded = seedOptionProjection(projectionStateAt(nodeId, extraState), option)
  const reveal = revealProjectionOf(node, option)
  const start = Math.max(0, seeded.clock)
  let closest = null
  for (let clock = start; clock < start + maximumHours; clock += 1) {
    const candidate = cloneProjectionState(seeded)
    candidate.clock = clock
    // A constructed active tale has not taken an overworld detour, so its
    // canonical story clock advances with the living clock in this projection.
    if (candidate.embodying && !candidate.embodimentPaused) candidate.embodimentClock = clock
    seedFixtureEffects(candidate, option, projectedClockForOption(currentStoryState(candidate), option))
    for (const id of list(option.requires)) seedConditionAtClock(candidate, id, true, clock)
    for (const id of list(option.unless)) seedConditionAtClock(candidate, id, false, clock)
    for (const id of reveal.required) seedConditionAtClock(candidate, id, true, clock)
    for (const id of reveal.excluded) seedConditionAtClock(candidate, id, false, clock)

    for (const variant of portraitStateVariants(candidate)) {
      const projected = currentStoryState(variant)
      const renderedLines = renderedStoryLines(variant)
      const blockers = candidateBlockers(variant, option, node, reveal)
      if (!blockers.length &&
          isOptionRevealed(projected, option, node, renderedLines) &&
          hasRequiredItem(projected, option) &&
          canSpeak(projected, option.text).ok &&
          canChoose(projected, option) &&
          embodimentOptionAccess(projected, option, STORY[option.to]).ok) {
        return { state: variant, failure: null }
      }
      if (!closest || blockers.length < closest.blockers.length) closest = { clock, blockers }
    }
  }
  const details = closest?.blockers?.length
    ? closest.blockers.join('; ')
    : `no matching state within ${maximumHours} projected hours`
  const authoredConditions = [
    list(option.requires).length ? `choice requires [${list(option.requires).join(', ')}]` : null,
    list(option.unless).length ? `choice excludes [${list(option.unless).join(', ')}]` : null,
    reveal.required.length ? `reveal requires [${reveal.required.join(', ')}]` : null,
    reveal.excluded.length ? `reveal excludes [${reveal.excluded.join(', ')}]` : null,
  ].filter(Boolean)
  return {
    state: null,
    failure: `${details} (closest clock ${closest?.clock ?? start}${
      authoredConditions.length ? `; ${authoredConditions.join('; ')}` : ''
    })`,
  }
}

export function feasibleOptionProjection(nodeId, option, {
  maximumHours = 370 * 24,
  extraState = {},
} = {}) {
  return findFeasibleOptionProjection(nodeId, option, { maximumHours, extraState }).state
}

function requestAndConfirmEmbodiment(state, option) {
  const optionIndex = STORY[state.nodeId]?.options?.indexOf(option) ?? -1
  const pending = reducer(state, {
    type: 'REQUEST_EMBODIMENT',
    optionId: `opt-${optionIndex}`,
    optionIndex,
    fromNodeId: state.nodeId,
    fromTurn: state.turn,
  })
  return pending === state ? state : reducer(pending, { type: 'CONFIRM_EMBODIMENT' })
}

export function commitProjectedOption(state, option) {
  if (option.become && !state.embodying) return requestAndConfirmEmbodiment(state, option)
  return reducer(state, {
    type: 'CHOOSE',
    option,
    targetNode: STORY[option.to],
    fromNodeId: state.nodeId,
    fromTurn: state.turn,
  })
}

export function settleProjectedState(input) {
  let state = { ...input, actionSpeech: null }
  let guard = 0
  while (state.timePassage && guard < 20) {
    const finalStep = state.timePassage.segments.length - 1
    const next = reducer(state, {
      type: state.timePassage.step < finalStep ? 'ADVANCE_TIME_PASSAGE' : 'DISMISS_TIME_PASSAGE',
      passageId: state.timePassage.id,
      expectedStep: state.timePassage.step,
    })
    if (next === state) break
    state = { ...next, actionSpeech: null }
    guard += 1
  }
  return state
}

export function visibleProjection(state) {
  const projected = currentStoryState(state)
  const node = STORY[projected.nodeId]
  if (!node) return Object.freeze({ state: projected, lines: Object.freeze([]), entries: Object.freeze([]), options: Object.freeze([]) })
  const lines = renderedStoryLines(state)
  const entries = lines.map((line) => node.text.find((entry) => lineOf(entry) === line) || line)
  const options = (node.options || []).filter((option) => {
    if (option.confuser) return false
    const ids = phraseSenses(option.text)
    const vocabularyReady = {
      ...projected,
      discovered: { ...projected.discovered },
      mana: { ...projected.mana },
    }
    for (const id of ids) {
      vocabularyReady.discovered[id] = true
      vocabularyReady.mana[id] = Math.max(99, vocabularyReady.mana[id] || 0)
    }
    if (option.reveal) {
      const reveal = resolveRevealLine(node.text.map(lineOf), option).line
      for (const id of phraseSenses(reveal || [])) {
        vocabularyReady.discovered[id] = true
        vocabularyReady.mana[id] = Math.max(99, vocabularyReady.mana[id] || 0)
      }
    }
    return isOptionRevealed(vocabularyReady, option, node, lines)
      && hasRequiredItem(vocabularyReady, option)
      && canChoose(vocabularyReady, option)
      && embodimentOptionAccess(vocabularyReady, option, STORY[option.to]).ok
  })
  return Object.freeze({ state: projected, lines: Object.freeze(lines), entries: Object.freeze(entries), options: Object.freeze(options) })
}

export function projectPlayableEdges() {
  const projections = []
  const failures = []
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [optionIndex, option] of (node.options || []).entries()) {
      if (option.confuser || !option.to || !STORY[option.to]) continue
      const label = `${nodeId}.options[${optionIndex}] -> ${option.to}`
      const feasible = findFeasibleOptionProjection(nodeId, option)
      const before = feasible.state
      if (!before) {
        failures.push(`${label}: ${feasible.failure}`)
        continue
      }
      const after = commitProjectedOption(before, option)
      if (after === before
          || after.turn !== before.turn + 1
          || after.nodeId !== option.to
          || after.cameFrom !== nodeId
          || after.choiceIndex !== optionIndex) {
        failures.push(`${label}: production reducer did not commit the exact canonical edge`)
        continue
      }
      const settledAfter = settleProjectedState(after)
      projections.push(Object.freeze({
        nodeId,
        optionIndex,
        option,
        before,
        after,
        settledAfter,
        source: visibleProjection(before),
        destination: visibleProjection(settledAfter),
      }))
    }
  }
  return Object.freeze({
    projections: Object.freeze(projections),
    failures: Object.freeze(failures),
  })
}
