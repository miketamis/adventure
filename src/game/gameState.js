import {
  START_NODE,
  STORY,
  WORLD_HUB,
  HEART_LEVELS,
  ITEMS,
  frequentForms,
  itemHasAffordance,
  itemHasTag,
} from './content.js'
import { formPracticeKey } from './formProgression.js'
import {
  ACHIEVEMENT_RULE_BY_ID as ACHIEVEMENT_BY_ID,
  newlyEligibleAreas,
  offerableTest,
} from './achievementRules.js'
import { NPCS } from './npcs.js'
import { EVERYDAY_PHRASE_DRILLS } from './everydayAlbanian.js'
import {
  PHRASE_PROGRESS_VERSION,
  PHRASE_PROGRESSION_POLICY,
  PHRASE_SKILL_MAX_TIER,
  advancePhraseProduction,
  normalizePhraseProductionProgress,
  phraseProductionStage,
} from './phraseProgression.js'
import { phraseProductionFocusIds, phraseSurfaceWordKeys } from './phraseFocus.js'
import { normalizeTrainingTarget, resolveTrainingTarget } from './trainingTarget.js'
import { TRAIN_WORD_FORM_POLICY } from './trainingProgression.js'
import { transitionInfo } from './worldModel.js'
import { NODE_REGION } from './regions.js'
import {
  canonicalEmbodimentId,
  embodimentEntryNodes,
  embodimentOptionAccess,
  embodimentQuest,
  isEmbodimentEnding,
  isKnownEmbodiment,
  PUBLIC_FREE_ROAM_NODES,
} from './embodiment.js'
import {
  CALENDAR_EPOCH,
  FESTIVAL_IDS,
  SEASONS,
  WEATHER_TYPES,
  WORLD_FACT_INCOMPATIBLE,
  advanceToCivilHour,
  advanceToFestival,
  calendarAtClock,
  civilHourAtClock,
  festivalIdsAtClock,
  festivalLabel,
  greetingPeriodAtClock,
  hydrologyFromFacts,
  isCivilHour,
  phaseAtCivilHour,
  phaseAtClock as environmentPhaseAtClock,
  seasonAtClock,
  weatherAtClock,
  worldMemoriesFromFacts,
} from './environment.js'
import {
  TIMED_WORLD_FIXTURES,
  fixtureConditionMatches,
  fixtureStageAt,
  isTimedWorldFixture,
  parseFixtureCondition,
} from './worldFixtures.js'
import {
  applyOptionEffects,
  entryInventoryFromOption,
  interactionAvailability,
  itemUseEffectsOption,
  normalizeInteractionLedger,
  normalizeKnowledge,
  normalizeRendezvous,
  optionEffectAvailability,
  optionEffectsAreValid,
  optionInventoryIds,
  optionLekAvailability,
  optionLekDelta,
  recordRendezvousArrivals,
  recordInteractionUse,
  rendezvousAvailability,
  rendezvousStatusOf,
  scheduleRendezvous,
} from './stateMechanics.js'
export {
  CALENDAR_EPOCH,
  FESTIVAL_IDS,
  SEASONS,
  WEATHER_TYPES,
  WORLD_FACT_INCOMPATIBLE,
  advanceToCivilHour,
  civilHourAtClock,
  isCivilHour,
  phaseAtCivilHour,
}
export {
  INTERACTION_SCOPES,
  applyOptionEffects,
  interactionSpecOf,
  normalizeInteractionLedger,
  normalizeKnowledge,
  normalizeRendezvous,
  optionEffectsAreValid,
  optionEffectAvailability,
  optionInventoryIds,
  optionLekAvailability,
  optionLekDelta,
  recordRendezvousArrivals,
  rendezvousAvailability,
  rendezvousStatusOf,
  scheduleRendezvous,
} from './stateMechanics.js'

export const START_HEARTS = 3
export const WORLD_EFFECTS_BY_ENDING = Object.freeze(
  Object.fromEntries(
    Object.entries(STORY)
      .filter(([, node]) => node.end && Array.isArray(node.worldEffects))
      .map(([id, node]) => [id, Object.freeze([...node.worldEffects])]),
  ),
)
// Endings occasionally grow into longer playable arcs. Keep the former ending
// ids here so a save made while one of those screens was final still receives
// the physical outcome when it returns to the world.
const LEGACY_WORLD_EFFECTS_BY_ENDING = Object.freeze({
  binoshetFund: Object.freeze([
    'binoshetKulshedraDefeated',
    'binoshetRiverRestored',
    'binoshetBardhakuqjaFreed',
    'binoshetKingdomRestored',
  ]),
  binoshetShpata: Object.freeze([
    'binoshetKulshedraDefeated',
    'binoshetRiverRestored',
    'binoshetBardhakuqjaFreed',
    'binoshetKingdomRestored',
  ]),
})
export const worldEffectsForEnding = (endingId) =>
  WORLD_EFFECTS_BY_ENDING[endingId] || LEGACY_WORLD_EFFECTS_BY_ENDING[endingId] || []

// ---------------------------------------------------------------------------
// TIME OF DAY — the narrative clock starts at dawn: internal 0-2 is dawn,
// 3-11 day, 12-14 dusk and 15-23 night. Authored `atHour` values and every
// HH:00 shown to players are civil time: internal 0 = 06:00 (environment.js is
// the single conversion boundary).
// The clock drifts +1 hour per story choice, and an option may jump it forward
// with `time: '<phase>'` (sleep → dawn, wait for dark → night). A phase id is a
// VIRTUAL ITEM: `requires:'night'` / `unless:'day'` on options and
// `when('night', …)` / `unless('dusk', …)` on story lines all work through the
// same has() machinery as real items.
// ---------------------------------------------------------------------------
export const TIME_PHASES = ['dawn', 'day', 'dusk', 'night']
// Every run begins at DUSK, exactly two choices shy of nightfall — so the
// natural opening (into the forest, light a fire) has night FALL as the fire
// catches, and the became('night') arrival lines get their showcase.
export const START_CLOCK = 13
export const phaseAtClock = environmentPhaseAtClock
export const worldClockOf = (state) => state.clock ?? START_CLOCK
export const storyClockOf = (state) => state.conditionClock ?? worldClockOf(state)
export const timeOfDay = (state) => phaseAtClock(storyClockOf(state))

// An embodied tale and the freely explored world deliberately keep two
// coherent notions of time. `clock` is the monotonic living-world clock: roads,
// weather, travelling people and the campfire never rewind. `embodimentClock`
// is the tale's own chronology. It advances by the same elapsed interval while
// the player acts inside the tale, but freezes during an overworld detour. That
// lets a waiting night scene still be night on Resume without ever rolling the
// surrounding world back.
export const embodimentClockOf = (state) => {
  if (!embodimentQuest(state?.embodying)) return null
  const clock = Number.isFinite(state.embodimentClock)
    ? Math.floor(state.embodimentClock)
    : worldClockOf(state)
  return Math.max(0, Math.min(worldClockOf(state), clock))
}

// Render the scene and evaluate its conditional prose at the clock which owns
// it. A paused player is standing in the living overworld, so the current scene
// remains on world time even if that physical node is also used by a tale.
export function currentStoryState(state) {
  const quest = embodimentQuest(state?.embodying)
  if (!quest || state.embodimentPaused || !quest.nodes.includes(state.nodeId)) {
    if (!Object.hasOwn(state, 'conditionClock')) return state
    const { conditionClock: _discarded, ...worldState } = state
    return worldState
  }
  return { ...state, conditionClock: embodimentClockOf(state) }
}

// The focus card evaluates the frozen tale scene while the player may be
// standing elsewhere. Keep this separate from currentStoryState so a public
// scene shared with a tale cannot accidentally inherit tale time while paused.
export function embodimentFocusState(state, nodeId = state.embodimentFocusNode) {
  const quest = embodimentQuest(state?.embodying)
  if (!quest || !quest.nodes.includes(nodeId)) return { ...state, nodeId }
  const arrival = state.embodimentPaused
    ? normalizedArrivalSnapshot(state.embodimentArrivalSnapshot, state, nodeId)
    : state
  return {
    ...state,
    nodeId,
    cameFrom: arrival.cameFrom,
    cameFromPhase: arrival.cameFromPhase,
    familiar: arrival.familiar,
    rumor: arrival.rumor,
    trail: arrival.trail,
    conditionClock: embodimentClockOf(state),
    embodimentPaused: false,
  }
}
export const isTimeId = (id) => TIME_PHASES.includes(id)
export const calendarOf = (state) => calendarAtClock(storyClockOf(state))
export const seasonOf = (state) => seasonAtClock(storyClockOf(state))
export const weatherOf = (state, scene = STORY[state.nodeId]) =>
  WEATHER_TYPES.includes(scene?.sceneWeather)
    ? scene.sceneWeather
    : weatherAtClock(
        storyClockOf(state),
        state.worldFacts,
        NODE_REGION[state.nodeId] || 'village',
      )
export const hydrologyOf = (state) => hydrologyFromFacts(state.worldFacts)
export const hasWorldFact = (state, id) =>
  state.worldFacts?.[id] != null && state.worldFacts[id] !== false
export const environmentSnapshot = (state) => {
  const region = NODE_REGION[state.nodeId] || 'village'
  return {
    clock: storyClockOf(state),
    region,
    phase: timeOfDay(state),
    calendar: calendarOf(state),
    season: seasonOf(state),
    weather: weatherOf(state),
    hydrology: hydrologyOf(state),
    memories: worldMemoriesFromFacts(state.worldFacts, region),
    worldFacts: state.worldFacts || {},
  }
}

export const isEnvironmentId = (id) =>
  typeof id === 'string' &&
  (id.startsWith('greeting:') ||
    id.startsWith('season:') ||
    id.startsWith('weather:') ||
    id.startsWith('festival:') ||
    id.startsWith('weekday:') ||
    id.startsWith('fact:'))

function hasEnvironmentCond(state, id) {
  const [kind, value] = id.split(':')
  if (!value) return false
  if (kind === 'greeting') return greetingPeriodAtClock(storyClockOf(state)) === value
  if (kind === 'season') return seasonOf(state) === value
  if (kind === 'weather') return weatherOf(state) === value
  if (kind === 'festival') return festivalIdsAtClock(storyClockOf(state)).includes(value)
  if (kind === 'weekday') return calendarOf(state).weekday === value
  if (kind === 'fact') return hasWorldFact(state, value)
  return false
}

// ---------------------------------------------------------------------------
// TIMED WORLD FIXTURES — persistent, place-bound things activated by story
// actions and advanced by the clock which owns their scene. Conditions use
// `fixture:<id>:<stage-or-group>`; campfire and millLamp are two expressions
// of the same lifecycle. Map art still receives its older fireBig/fireLow/
// fireOut vocabulary as a presentation adapter, not as game-state mechanics.
// ---------------------------------------------------------------------------
export { TIMED_WORLD_FIXTURES }
export const isFixtureId = (id) => Boolean(parseFixtureCondition(id))
export const fixtureStateOf = (state, fixtureId) =>
  fixtureStageAt(fixtureId, state.fixtures?.[fixtureId], storyClockOf(state))
export function fireStateOf(state) {
  const stage = fixtureStateOf(state, 'campfire')
  return stage === 'bright' ? 'fireBig' : stage === 'low' ? 'fireLow' : stage === 'out' ? 'fireOut' : null
}
// ---------------------------------------------------------------------------
// NPC ROUTES — walking people (see npcs.js). Position is DERIVED from the
// clock, campfire-style, never stored: a looping NPC is at
// route[floor(clock / stepHours) % length] whenever the hour falls in their
// activePhases; a `once` NPC starts when an option or destination with
// `startsNpc` stamps state.npcStarted[id], then either leaves or remains at its
// explicit settlesAt stop after the route's end. Presence feeds two
// virtual items: `npc:<id>` (standing where you stand) and `npcAt:<id>:<node>`
// (visible at a named node — off-scene sightlines, accepts a|b alternatives).
// ---------------------------------------------------------------------------
export const isNpcId = (id) =>
  typeof id === 'string' && (id.startsWith('npc:') || id.startsWith('npcAt:'))
// the node an NPC stands at right now, or null (offstage / not started / gone)
export function npcNodeOf(state, npcId) {
  const npc = NPCS[npcId]
  if (!npc) return null
  // The map passes raw state and sees live positions; story projections pass
  // conditionClock and preserve the cast position authored for that scene.
  const clock = storyClockOf(state)
  if (npc.activePhases && !npc.activePhases.includes(phaseAtClock(clock))) return null
  const step = npc.stepHours || 2
  if (npc.once) {
    const started = state.npcStarted?.[npcId]
    if (started == null || clock < started) return null
    const i = Math.floor((clock - started) / step)
    return i < npc.route.length ? npc.route[i] : npc.settlesAt || null
  }
  return npc.route[Math.floor(clock / step) % npc.route.length]
}
// the NPCs currently on stage, with their derived positions (the map draws them)
export const liveNpcs = (state) =>
  Object.entries(NPCS)
    .map(([id, n]) => ({ id, name: n.name, glyph: n.glyph, node: npcNodeOf(state, id) }))
    .filter((n) => n.node)
const npcCond = (state, id) => {
  if (id.startsWith('npcAt:')) {
    const [, npcId, nodes] = id.split(':')
    const at = npcNodeOf(state, npcId)
    return at != null && nodes.split('|').includes(at)
  }
  return npcNodeOf(state, id.slice(4)) === state.nodeId
}

// ---------------------------------------------------------------------------
// ARRIVAL — where you just walked in from. `state.cameFrom` holds the node you
// stood at when you chose the option that brought you here, exposed as the
// virtual item `from:<nodeId>` (or `from:a|b|c` for several ways in) so a scene
// can open with the crossing itself ("you cross the tanners' bridge…") instead
// of the plain establishing shot. A wait/rest option that loops back to the
// same node makes cameFrom the node itself, so arrival lines fade as you
// linger; returning from an ending screen clears it (that is no walk).
//
// `state.cameFromPhase` is the same idea for the WORLD CLOCK: the time-of-day
// phase when you chose that option. When the choice itself carried you across
// a phase boundary — one more hour of walking, a wait, a `time:` rest-jump —
// the virtual item `became:<phase>` (or `became:a|b`) is true, so a scene can
// narrate the turning of the hour as an event ("night falls…") instead of a
// standing fact. Like from:, it fades once you act again inside the phase.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// BACKTRACK — you can always step back to where you've just been. `state.trail`
// holds the last TRAIL_LEN DISTINCT nodes you occupied before the current one
// (most-recent first). An option whose destination is in the trail is a walk
// BACK to a recently-visited place: it always shows and is never reveal-gated
// or ringed (you already read those rooms to reach them — no re-earning the
// words to retreat). Forward progress into a NEW place still gates normally.
// This generalises the old single-step retreat to the last few locations.
// (Token cost is unchanged — backtracking still spends tokens unless `free:`.)
// ---------------------------------------------------------------------------
export const TRAIL_LEN = 6
// a step BACK to a recently-occupied place: the node you just came from, or any of
// the last TRAIL_LEN distinct nodes on the trail. cameFrom is checked explicitly so
// the rule holds even for a save written before the trail existed (migration-safe).
export const isBacktrack = (state, to) =>
  !!to && (to === state.cameFrom || (state.trail || []).includes(to))

export const isFromId = (id) => typeof id === 'string' && id.startsWith('from:')
export const isBecameId = (id) => typeof id === 'string' && id.startsWith('became:')
export const isFlagId = (id) => typeof id === 'string' && id.startsWith('flag:')
export const isKnowledgeId = (id) => typeof id === 'string' && id.startsWith('knows:')
export const isItemTagId = (id) => typeof id === 'string' && id.startsWith('itemTag:')
export const isAffordanceId = (id) => typeof id === 'string' && id.startsWith('affords:')
export const isRendezvousId = (id) => typeof id === 'string' && id.startsWith('rendezvous:')
export const hasStoryFlag = (state, id) => hasOwn(state.flags, id) && state.flags[id] === true
export const hasKnowledge = (state, id) => hasOwn(state.knowledge, id) &&
  state.knowledge[id] != null && state.knowledge[id] !== false
const hasCarriedItemMatching = (state, predicate) => Object.entries(state.inventory || {})
  .some(([itemId, count]) => count > 0 && ITEMS[itemId] && predicate(ITEMS[itemId]))
// the embodiment framework: `embodying` (bare) = bound to ANY tale; `embodying:<tale>`
// = bound to that one. Virtual items resolve against the explicit runtime quest
// contract in embodiment.js; a role lasts through its ending screen and is released
// only when that tale is closed or death starts a new run.
export const isEmbodyingId = (id) => typeof id === 'string' && id.startsWith('embodying:')
// one truth for "does the player have X right now" — item, companion, hour,
// timed fixture, or the way they came in
export const hasCond = (state, id) => {
  if (typeof id !== 'string' || !id) return false
  if (isTimeId(id)) return timeOfDay(state) === id
  if (isEnvironmentId(id)) return hasEnvironmentCond(state, id)
  if (isFixtureId(id)) return fixtureConditionMatches(id, state.fixtures, storyClockOf(state))
  if (isFromId(id)) return id.slice(5).split('|').includes(state.cameFrom)
  if (isBecameId(id))
    return (
      state.cameFromPhase != null &&
      state.cameFromPhase !== timeOfDay(state) &&
      id.slice(7).split('|').includes(timeOfDay(state))
    )
  if (isFlagId(id)) {
    const flagId = id.slice(5)
    // Old saves stored invisible story markers in inventory. New content can
    // adopt explicit flag conditions without invalidating those saves.
    return hasStoryFlag(state, flagId) || (state.inventory?.[flagId] || 0) > 0
  }
  if (isKnowledgeId(id)) return hasKnowledge(state, id.slice(6))
  if (isItemTagId(id)) {
    const tag = id.slice(8)
    return Boolean(tag) && hasCarriedItemMatching(state, (item) => itemHasTag(item, tag))
  }
  if (isAffordanceId(id)) {
    const affordance = id.slice(8)
    return Boolean(affordance) && hasCarriedItemMatching(state, (item) => itemHasAffordance(item, affordance))
  }
  if (isRendezvousId(id)) {
    const condition = id.slice('rendezvous:'.length)
    const separator = condition.lastIndexOf(':')
    if (separator <= 0) return false
    const rendezvousId = condition.slice(0, separator)
    const requested = condition.slice(separator + 1)
    const entry = state.rendezvous?.[rendezvousId]
    if (!entry) return false
    if (requested === 'fulfilled') return entry.metAtClock != null
    return rendezvousStatusOf(state.rendezvous, rendezvousId, worldClockOf(state)) === requested
  }
  if (isNpcId(id)) return npcCond(state, id)
  if (id === 'embodying') return state.embodying != null
  if (isEmbodyingId(id)) return state.embodying === id.slice(10)
  // FAMILIARITY — `again` is true when the node you stand at was already visited
  // when you arrived (this run or an earlier one: state.visited persists, the way
  // your discovered words do — the LEARNER's familiarity, not the run's).
  // `visited:<nodeId>` (or `visited:a|b`, any match) is true once a place has
  // ever been explored — a signpost line can retire once its road is known.
  if (id === 'again') return !!state.familiar
  if (id.startsWith('visited:')) return id.slice(8).split('|').some((n) => !!state.visited?.[n])
  // HEARSAY — `rumor` is true only on an arrival at a place you had heard of but
  // never seen (the payoff of a fire-circle tale); `heard:<nodeId>` is true once
  // any scene has told you of the place (node.tells), seen or not.
  if (id === 'rumor') return !!state.rumor
  if (id.startsWith('heard:')) return !!state.heard?.[id.slice(6)]
  // Bare ids remain migration-friendly: new story flags work with the same
  // requires/unless syntax as the old invisible inventory markers, while the
  // explicit `flag:` form removes ambiguity for new content.
  return hasStoryFlag(state, id) || (state.inventory?.[id] || 0) > 0
}
// the next hour (at or after `clock`) that falls inside `phase`
export function advanceToPhase(clock, phase) {
  if (!isTimeId(phase)) return clock
  while (phaseAtClock(clock) !== phase) clock++
  return clock
}

// One validation contract protects authored content and reducer callers. Exact
// civil hours may refine a phase, but never contradict it (00:00 is night;
// 06:00 is dawn). Invalid timing metadata disables a choice instead of being
// coerced into a different journey.
export function optionTimingIsValid(option) {
  if (!option || typeof option !== 'object') return false
  if (option.durationHours != null &&
      (!Number.isSafeInteger(option.durationHours) || option.durationHours < 0)) return false
  if (option.time != null && !isTimeId(option.time)) return false
  if (option.date != null && !FESTIVAL_IDS.includes(option.date)) return false
  if (option.atHour != null && !isCivilHour(option.atHour)) return false
  if (option.time && option.atHour != null && phaseAtCivilHour(option.atHour) !== option.time) return false
  return true
}

// A normal choice takes one story-hour. Longer journeys may declare
// `durationHours`, while `date` and `time` deliberately wait for a named annual
// observance or phase. All callers use this one projection, including gating,
// so an act that must finish before dawn cannot be selected at the last hour of
// night and arrive after its own condition has ceased to be true.
export function durationHoursOf(option, fromNodeId) {
  if (Number.isSafeInteger(option?.durationHours) && option.durationHours >= 0) return option.durationHours
  if (!fromNodeId) return 1
  const routeHours = transitionInfo(fromNodeId, option).hours
  return routeHours == null ? 1 : Math.max(0, Math.floor(routeHours))
}

export function projectedClockForOption(state, option) {
  let clock = storyClockOf(state) + durationHoursOf(option, state.nodeId)
  // A festival target must satisfy its date, optional phase and optional exact
  // civil hour together; resolving them sequentially could leave the festival.
  if (option?.date) clock = advanceToFestival(clock, option.date, option.time, option.atHour)
  else if (option?.atHour != null && isCivilHour(option.atHour)) clock = advanceToCivilHour(clock, option.atHour)
  else if (option?.time) clock = advanceToPhase(clock, option.time)
  return clock
}

// Long story spans are one choice but not one instant. Keep the exact clock
// projection and its player-facing narrative description together, so the UI
// can stand between departure and arrival without dispatching hundreds of
// fake hourly turns.
export function timePassageForOption(
  state,
  option,
  projectedClock = projectedClockForOption(state, option),
  timing = {},
) {
  const fromClock = storyClockOf(state)
  const elapsedHours = Math.max(0, projectedClock - fromClock)
  const authored = option?.timePassage
  if (!authored && !option?.date && elapsedHours < 24) return null

  const festival = option?.date ? festivalLabel(option.date) : null
  const exactHour = isCivilHour(option?.atHour)
    ? `${String(option.atHour).padStart(2, '0')}:00`
    : null
  const fallbackLabel = festival
    ? `until ${festival}${exactHour ? ` at ${exactHour}` : ''}`
    : elapsedHours % 24 === 0
      ? `${elapsedHours / 24} ${elapsedHours === 24 ? 'day' : 'days'}${exactHour ? `, arriving at ${exactHour}` : ''}`
      : `${Math.floor(elapsedHours / 24)} days and ${elapsedHours % 24} hours${exactHour ? `, arriving at ${exactHour}` : ''}`
  const segments = Array.isArray(authored?.segments) && authored.segments.length > 0
    ? authored.segments.map((segment) => ({ ...segment }))
    : [{
        label: festival ? `The calendar turns toward ${festival}` : fallbackLabel,
        detail: festival
          ? `The story waits until ${festival}${option.atHour != null
              ? ` at ${String(option.atHour).padStart(2, '0')}:00`
              : option.time ? ` at ${option.time}` : ''}.`
          : 'Days pass before the next scene begins.',
        fidelity: festival ? 'calendar-exact' : 'clock-exact',
        visual: festival ? 'festival' : 'journey',
      }]

  return {
    id: `${state.turn}:${state.nodeId}->${option.to}@${projectedClock}:${timing.worldToClock ?? projectedClock}`,
    fromNodeId: state.nodeId,
    toNodeId: option.to,
    fromClock,
    toClock: projectedClock,
    clockKind: timing.clockKind === 'tale' ? 'tale' : 'world',
    worldFromClock: timing.clockKind === 'tale' ? timing.worldFromClock : undefined,
    worldToClock: timing.clockKind === 'tale' ? timing.worldToClock : undefined,
    elapsedHours,
    title: authored?.title || (festival ? `Waiting for ${festival}` : 'Time passes'),
    label: authored?.label || fallbackLabel,
    estimateNote: authored?.estimateNote || null,
    source: authored?.source ? { ...authored.source } : null,
    segments,
    step: 0,
  }
}

// How many correct practices of a word before its "endings" drill unlocks. `mana`
// is spent on story choices, so a separate monotonic `practiced` counter tracks it.
export const FORMS_UNLOCK_THRESHOLD = TRAIN_WORD_FORM_POLICY.practiceWinsRequired
// A word enters endings mode once it's been practiced enough AND it has a forms
// table with at least two frequently-used forms (so step 2 is never a one-option
// question). The lemma row always counts, so ≥2 means ≥1 real inflected form.
export const formsUnlocked = (state, id) =>
  (state.practiced?.[id] || 0) >= FORMS_UNLOCK_THRESHOLD && frequentForms(id).length >= 2

// ---------------------------------------------------------------------------
// Persistence: the WHOLE game state is saved to localStorage on every change,
// so reloading the page resumes you exactly where you left off. The achievement
// collection — earned (gate passed), eligible (deed done) and failed-attempt
// counts (they salt the next test's questions) — is also kept under its own
// key so it survives even if the run state is ever cleared or changes shape.
// ---------------------------------------------------------------------------
const ACHIEVEMENTS_KEY = 'aventura.achievements.v1'
const LEGACY_ENDINGS_KEY = 'aventura.endings.v1' // pre-achievement collection
const STATE_KEY = 'aventura.state.v1'

export function loadAchievements() {
  let legacyEarned = {}
  // Read the predecessor even when the newer key exists. Both collections are
  // monotonic, so a torn-but-parseable newer write must not hide older earned
  // endings that are still recoverable.
  try {
    const old = JSON.parse(localStorage.getItem(LEGACY_ENDINGS_KEY))
    if (isRecord(old)) legacyEarned = truthRecord(old)
  } catch {
    /* ignore */
  }

  let saved = null
  try {
    const candidate = JSON.parse(localStorage.getItem(ACHIEVEMENTS_KEY))
    if (isRecord(candidate)) saved = candidate
  } catch {
    /* ignore */
  }

  const earned = truthRecord(legacyEarned, saved?.earned)
  const eligible = truthRecord(legacyEarned, saved?.eligible)
  for (const id of Object.keys(earned)) if (ACHIEVEMENT_BY_ID[id]) eligible[id] = true
  return { earned, eligible, attempts: countRecord(saved?.attempts) }
}
export function saveAchievements({ earned, eligible, attempts }) {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify({ earned, eligible, attempts }))
  } catch {
    /* ignore */
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state))
  } catch {
    /* ignore */
  }
}

const isRecord = (value) => value != null && typeof value === 'object' && !Array.isArray(value)
const recordOrEmpty = (value) => isRecord(value) ? value : {}
const finiteOr = (value, fallback) => Number.isFinite(value) ? value : fallback
const hasOwn = (record, id) => Object.prototype.hasOwnProperty.call(record || {}, id)
const safeMapKey = (id) => typeof id === 'string' && id.length > 0 && id.trim() === id &&
  !['__proto__', 'prototype', 'constructor'].includes(id)
const VIEWS = new Set(['story', 'practice', 'dictionary', 'map', 'endings', 'guide', 'debug'])
const EVERYDAY_PHRASE_BY_ID = new Map(EVERYDAY_PHRASE_DRILLS.map((phrase) => [phrase.id, phrase]))
const PUBLIC_FREE_ROAM_NODE_SET = new Set(PUBLIC_FREE_ROAM_NODES)
const truthRecord = (...values) => {
  const next = {}
  for (const value of values) {
    if (!isRecord(value)) continue
    for (const [id, present] of Object.entries(value)) if (present && safeMapKey(id)) next[id] = true
  }
  return next
}
const countRecord = (value) => {
  const next = {}
  if (!isRecord(value)) return next
  for (const [id, count] of Object.entries(value)) {
    const numeric = typeof count === 'number'
      ? count
      : typeof count === 'string' && count.trim()
        ? Number(count)
        : NaN
    const whole = Number.isFinite(numeric) ? Math.floor(numeric) : 0
    if (safeMapKey(id) && Number.isSafeInteger(whole) && whole > 0) next[id] = whole
  }
  return next
}
const phraseMasteryRecord = (value, maxTier) => Object.fromEntries(
  Object.entries(countRecord(value))
    .filter(([id]) => EVERYDAY_PHRASE_BY_ID.has(id))
    .map(([id, tier]) => [id, Math.min(maxTier, tier)]),
)
const phraseProductionProgressRecord = (value, currentRound) => {
  if (!isRecord(value)) return {}
  const next = {}
  for (const [id, progress] of Object.entries(value)) {
    const phrase = EVERYDAY_PHRASE_BY_ID.get(id)
    if (!phrase || !isRecord(progress)) continue
    const focusIds = phraseProductionFocusIds(phrase)
    if (!focusIds.length) continue
    next[id] = normalizePhraseProductionProgress(progress, focusIds, currentRound)
  }
  return next
}
const productionTierRecord = (value) => Object.fromEntries(
  Object.entries(isRecord(value) ? value : {}).flatMap(([id, progress]) => {
    const phrase = EVERYDAY_PHRASE_BY_ID.get(id)
    if (!phrase) return []
    return [[id, phraseProductionStage(progress, phraseProductionFocusIds(phrase))]]
  }),
)
const normalizedTrainWords = (values) => [...new Set(
  (Array.isArray(values) ? values : []).flatMap((value) => phraseSurfaceWordKeys(value)),
)].slice(0, 100)
const reviewedFormPracticeKey = (state, id, surface) => {
  if (!safeMapKey(id) || !state.discovered[id] || typeof surface !== 'string') return null
  const normalized = surface.normalize('NFC').toLocaleLowerCase('sq')
  const form = frequentForms(id).find((candidate) =>
    candidate.al.normalize('NFC').toLocaleLowerCase('sq') === normalized,
  )
  return form ? formPracticeKey(id, form.al) : null
}
const subtractCountRecords = (value, suspended) => {
  const next = {}
  const current = countRecord(value)
  const hidden = countRecord(suspended)
  for (const [id, count] of Object.entries(current)) {
    const remaining = count - (hidden[id] || 0)
    if (remaining > 0) next[id] = remaining
  }
  return next
}
const maxCountRecords = (...values) => {
  const next = {}
  for (const value of values) {
    for (const [id, count] of Object.entries(countRecord(value))) {
      next[id] = Math.max(next[id] || 0, count)
    }
  }
  return next
}

const safePublicNode = (quest, ...candidates) =>
  candidates.find((nodeId) => PUBLIC_FREE_ROAM_NODE_SET.has(nodeId)) ||
  embodimentEntryNodes(quest).find((nodeId) => PUBLIC_FREE_ROAM_NODE_SET.has(nodeId)) ||
  WORLD_HUB

const arrivalSnapshotOf = (state, focusNode = state.embodimentFocusNode) => ({
  nodeId: focusNode,
  cameFrom: STORY[state.cameFrom] ? state.cameFrom : null,
  cameFromPhase: TIME_PHASES.includes(state.cameFromPhase) ? state.cameFromPhase : null,
  familiar: state.familiar === true,
  rumor: state.rumor === true,
  trail: Array.isArray(state.trail)
    ? [...new Set(state.trail.filter((id) => STORY[id] && id !== focusNode))].slice(0, TRAIL_LEN)
    : [],
})

const normalizedArrivalSnapshot = (value, state, focusNode) => {
  // Bind the suspended arrival to its focus. A stale snapshot from an earlier
  // beat must never be replayed after a partial or forged save changes focus.
  if (!isRecord(value) || value.nodeId !== focusNode) {
    return {
      nodeId: focusNode,
      cameFrom: null,
      cameFromPhase: null,
      familiar: Boolean(state.visited?.[focusNode]),
      rumor: false,
      trail: [],
    }
  }
  return {
    nodeId: focusNode,
    cameFrom: STORY[value.cameFrom] ? value.cameFrom : null,
    cameFromPhase: TIME_PHASES.includes(value.cameFromPhase) ? value.cameFromPhase : null,
    familiar: value.familiar === true,
    rumor: value.rumor === true,
    trail: Array.isArray(value.trail)
      ? [...new Set(value.trail.filter((id) => STORY[id] && id !== focusNode))].slice(0, TRAIL_LEN)
      : [],
  }
}

const embodimentInventoryIds = (embodimentId, quest) => {
  const ids = new Set()
  for (const nodeId of quest?.nodes || []) {
    for (const option of STORY[nodeId]?.options || []) {
      for (const id of optionInventoryIds(option)) ids.add(id)
      if (optionLekDelta(option)) ids.add('lek')
    }
  }
  for (const entryFrom of embodimentEntryNodes(quest)) {
    for (const option of STORY[entryFrom]?.options || []) {
      if (canonicalEmbodimentId(option.become) !== embodimentId) continue
      for (const id of optionInventoryIds(option)) ids.add(id)
      if (optionLekDelta(option)) ids.add('lek')
    }
  }
  return ids
}

const restrictCountRecord = (value, allowed) => Object.fromEntries(
  Object.entries(countRecord(value)).filter(([id]) => allowed.has(id)),
)

// A passage is a resumable view of a transition which has already committed.
// Rebuild its prose from the current canonical option on load: this preserves
// the committed clocks while preventing a torn/forged save from displaying an
// invented interval or stale editorial copy. The player's segment is the only
// presentation state that belongs in the save.
const canonicalSavedPassage = (savedPassage, next, activeQuest) => {
  if (!isRecord(savedPassage) || next.turn < 2) return null
  const fromNode = STORY[savedPassage.fromNodeId]
  if (!fromNode || savedPassage.toNodeId !== next.nodeId) return null
  if (!Number.isFinite(savedPassage.fromClock) || savedPassage.fromClock < 0 ||
      !Number.isFinite(savedPassage.toClock) || savedPassage.toClock < savedPassage.fromClock) return null
  const elapsedHours = savedPassage.toClock - savedPassage.fromClock
  if (savedPassage.elapsedHours !== elapsedHours) return null

  const clockKind = savedPassage.clockKind === 'tale' ? 'tale' : 'world'
  let projectionState
  let timing
  if (clockKind === 'tale') {
    const worldElapsed = savedPassage.worldToClock - savedPassage.worldFromClock
    if (!activeQuest || next.embodimentPaused ||
        !activeQuest.nodes.includes(savedPassage.fromNodeId) ||
        !activeQuest.nodes.includes(savedPassage.toNodeId) ||
        next.embodimentClock !== savedPassage.toClock ||
        !Number.isFinite(savedPassage.worldFromClock) || savedPassage.worldFromClock < 0 ||
        !Number.isFinite(savedPassage.worldToClock) ||
        savedPassage.worldToClock !== next.clock || worldElapsed !== elapsedHours) return null
    projectionState = {
      ...next,
      nodeId: savedPassage.fromNodeId,
      clock: savedPassage.worldFromClock,
      conditionClock: savedPassage.fromClock,
      turn: next.turn - 1,
    }
    timing = {
      clockKind: 'tale',
      worldFromClock: savedPassage.worldFromClock,
      worldToClock: savedPassage.worldToClock,
    }
  } else {
    if (savedPassage.toClock !== next.clock) return null
    projectionState = {
      ...next,
      nodeId: savedPassage.fromNodeId,
      clock: savedPassage.fromClock,
      turn: next.turn - 1,
    }
    delete projectionState.conditionClock
    timing = { clockKind: 'world' }
  }

  const candidates = (fromNode.options || [])
    .filter((option) => option.to === savedPassage.toNodeId)
    .filter((option) => projectedClockForOption(projectionState, option) === savedPassage.toClock)
    .map((option) => timePassageForOption(projectionState, option, savedPassage.toClock, timing))
    .filter(Boolean)
  if (candidates.length !== 1) return null

  const passage = candidates[0]
  const savedStep = Number.isInteger(savedPassage.step) && savedPassage.step >= 0
    ? savedPassage.step
    : 0
  return { ...passage, step: Math.min(savedStep, passage.segments.length - 1) }
}

// Saved runs outlive fields and, occasionally, partially-written browser data.
// Normalize every nested map used by the reducer rather than only worldFacts;
// otherwise one `null` inventory/visited map can make a valid old save crash on
// its first choice. This is exported so the migration contract is auditable
// without pretending Node has a browser localStorage.
export function normalizeSavedState(saved, fresh) {
  saved = isRecord(saved) ? saved : {}
  const next = { ...fresh, ...saved }
  // `conditionClock` exists only on short-lived render/gating projections. It
  // must never persist or leak tale time into the world map after a reload.
  delete next.conditionClock
  next.nodeId = STORY[saved.nodeId] ? saved.nodeId : fresh.nodeId
  for (const key of ['heard', 'discovered', 'visited', 'dismissedTests', 'healedAt', 'flags']) {
    next[key] = truthRecord(fresh[key], saved[key])
  }
  for (const key of ['inventory', 'mana', 'practiced', 'formPracticed']) {
    next[key] = countRecord(isRecord(saved[key]) ? saved[key] : fresh[key])
  }
  next.phrasePracticed = countRecord(
    isRecord(saved.phrasePracticed) ? saved.phrasePracticed : fresh.phrasePracticed,
  )
  next.phraseMistakes = countRecord(
    isRecord(saved.phraseMistakes) ? saved.phraseMistakes : fresh.phraseMistakes,
  )
  next.trainRound = Math.max(0, Math.floor(finiteOr(saved.trainRound, fresh.trainRound || 0)))
  next.trainLastWords = normalizedTrainWords(saved.trainLastWords)
  next.trainLastQuestionKey = typeof saved.trainLastQuestionKey === 'string'
    ? saved.trainLastQuestionKey.slice(0, 200)
    : null
  // Version-1 counters recorded exposure, not gated productive evidence. Keep
  // the learner's tokens and lifetime totals, but never migrate those counters
  // into “can independently write this phrase”.
  const hasPhraseProgressV2 = saved.phraseProgressVersion === PHRASE_PROGRESS_VERSION
  next.phraseProgressVersion = PHRASE_PROGRESS_VERSION
  next.phraseProductionProgress = phraseProductionProgressRecord(
    hasPhraseProgressV2 ? saved.phraseProductionProgress : {},
    next.trainRound,
  )
  next.phraseMastery = productionTierRecord(next.phraseProductionProgress)
  next.phraseListeningMastery = phraseMasteryRecord(
    saved.phraseListeningMastery,
    PHRASE_SKILL_MAX_TIER.listening,
  )
  next.phraseMatchingMastery = phraseMasteryRecord(
    saved.phraseMatchingMastery,
    PHRASE_SKILL_MAX_TIER.matching,
  )
  // Early typed-flag builds represented Shpirag's role branch as an invisible
  // carried object. Canonicalize it once on load so identity, gates and the
  // inventory UI cannot disagree. `hasCond(flag:...)` retains its generic
  // inventory fallback for any older in-memory state not yet re-saved.
  if ((next.inventory.jamShpirag || 0) > 0) {
    next.flags.jamShpirag = true
    delete next.inventory.jamShpirag
  }
  next.npcStarted = countRecord(isRecord(saved.npcStarted) ? saved.npcStarted : fresh.npcStarted)
  // The compact achievement record exists specifically to survive a failed or
  // quota-limited whole-state write. These maps are monotonic, so merge both
  // copies instead of letting an older run snapshot erase newer progress.
  next.earned = truthRecord(fresh.earned, saved.earned)
  next.eligible = truthRecord(fresh.eligible, saved.eligible)
  for (const id of Object.keys(next.earned)) if (ACHIEVEMENT_BY_ID[id]) next.eligible[id] = true
  next.attempts = maxCountRecords(fresh.attempts, saved.attempts)
  next.worldFacts = reconcileWorldFacts(isRecord(saved.worldFacts) ? saved.worldFacts : recordOrEmpty(fresh.worldFacts))
  next.clock = Math.max(0, Math.floor(finiteOr(saved.clock, fresh.clock)))
  // Knowledge is monotonic learner memory, not physical world state. Preserve
  // first-learning provenance while accepting the `true` entries early
  // experimental saves used before metadata was recorded.
  next.knowledge = normalizeKnowledge(
    isRecord(saved.knowledge) ? saved.knowledge : fresh.knowledge,
    next.clock,
  )
  next.interactions = normalizeInteractionLedger(
    isRecord(saved.interactions) ? saved.interactions : fresh.interactions,
    next.clock,
  )
  next.rendezvous = normalizeRendezvous(
    isRecord(saved.rendezvous) ? saved.rendezvous : fresh.rendezvous,
    next.clock,
    {
      isNpc: (id) => Boolean(NPCS[id]),
      isPlace: (id) => Boolean(STORY[id]),
    },
  )
  next.turn = Math.max(1, Math.floor(finiteOr(saved.turn, fresh.turn)))
  // Peak was an early hover-translation resource. Drop it explicitly so old
  // saves cannot keep an obsolete mechanic alive through the top-level spread.
  delete next.peak
  next.hearts = Math.max(0, Math.min(START_HEARTS, Math.floor(finiteOr(saved.hearts, fresh.hearts))))
  next.fixtures = {}
  const savedFixtures = isRecord(saved.fixtures) ? saved.fixtures : {}
  for (const id of Object.keys(TIMED_WORLD_FIXTURES)) {
    const legacyCampfire = id === 'campfire' ? saved.fireLit : null
    const activatedAt = savedFixtures[id] ?? legacyCampfire
    if (Number.isFinite(activatedAt) && activatedAt >= 0 && activatedAt <= next.clock) {
      next.fixtures[id] = Math.floor(activatedAt)
    }
  }
  delete next.fireLit
  next.cameFrom = STORY[saved.cameFrom] ? saved.cameFrom : null
  next.cameFromPhase = TIME_PHASES.includes(saved.cameFromPhase) ? saved.cameFromPhase : null
  next.familiar = saved.familiar === true
  next.rumor = saved.rumor === true
  next.trail = Array.isArray(saved.trail)
    ? [...new Set(saved.trail.filter((id) => STORY[id] && id !== next.nodeId))].slice(0, TRAIL_LEN)
    : []
  const savedView = saved.view === 'achievements' ? 'endings' : VIEWS.has(saved.view) ? saved.view : fresh.view
  // The atlas is an authoring/debug instrument, not a player destination.
  // Old saves made while it was public must resume in the story unless that
  // same save explicitly has debug mode enabled.
  next.view = savedView === 'map' && saved.debug !== true ? fresh.view : savedView
  // Ending state is a property of the current canonical scene, never a second
  // caller-controlled truth that can disagree with it after a partial write.
  const savedEnding = ['good', 'bad', 'secret'].includes(saved.ended) ? saved.ended : null
  const legacyEnding = !STORY[next.nodeId]?.end && savedEnding && worldEffectsForEnding(next.nodeId).length > 0
  next.ended = STORY[next.nodeId]?.end || (legacyEnding ? savedEnding : null)
  const pendingAchievement = ACHIEVEMENT_BY_ID[saved.pendingTest]
  next.pendingTest = !next.ended && pendingAchievement?.kind === 'area' &&
    next.eligible[saved.pendingTest] && !next.earned[saved.pendingTest] &&
    !next.dismissedTests[saved.pendingTest]
      ? saved.pendingTest
      : null
  next.embodying = typeof saved.embodying === 'string' && isKnownEmbodiment(saved.embodying)
    ? canonicalEmbodimentId(saved.embodying)
    : null
  const savedEmbodimentHearts = Number.isInteger(saved.embodimentHeartsSnapshot) &&
    saved.embodimentHeartsSnapshot >= 1 && saved.embodimentHeartsSnapshot <= START_HEARTS
      ? saved.embodimentHeartsSnapshot
      : null
  let activeQuest = embodimentQuest(next.embodying)
  // An ending is a valid live role state only when the saved outcome, scene,
  // and role contract all agree. A forged ending with `ended:null` is repaired
  // to the entry beat rather than becoming an inescapable zero-choice scene.
  if (activeQuest && STORY[next.nodeId]?.end &&
      (savedEnding !== STORY[next.nodeId].end || !isEmbodimentEnding(next.embodying, next.nodeId))) {
    next.nodeId = activeQuest.entryTo
    next.ended = null
  }
  if (activeQuest && next.ended && !isEmbodimentEnding(next.embodying, next.nodeId)) {
    if (isRecord(saved.embodimentInventorySnapshot)) next.inventory = countRecord(saved.embodimentInventorySnapshot)
    if (isRecord(saved.embodimentFlagsSnapshot)) next.flags = truthRecord(saved.embodimentFlagsSnapshot)
    next.hearts = savedEmbodimentHearts ?? Math.max(1, next.hearts)
    next.embodying = null
    activeQuest = null
  }
  next.embodimentOriginNode = activeQuest && STORY[saved.embodimentOriginNode]
    ? saved.embodimentOriginNode
    : embodimentEntryNodes(activeQuest)[0] || null
  const savedFocusIsLive = activeQuest && activeQuest.nodes.includes(saved.embodimentFocusNode) &&
    !STORY[saved.embodimentFocusNode]?.end
  if (!activeQuest) {
    next.embodimentFocusNode = null
    next.embodimentWorldNode = null
    next.embodimentPaused = false
  } else if (next.ended) {
    // The final role screen is on-course and owns its canonical outcome.
    next.embodimentFocusNode = next.nodeId
    next.embodimentWorldNode = safePublicNode(
      activeQuest, saved.embodimentWorldNode, activeQuest.returnTo, next.embodimentOriginNode,
    )
    next.embodimentPaused = false
  } else if (saved.embodimentPaused || !activeQuest.nodes.includes(next.nodeId) || STORY[next.nodeId]?.end) {
    next.embodimentFocusNode = savedFocusIsLive ? saved.embodimentFocusNode : activeQuest.entryTo
    next.nodeId = safePublicNode(
      activeQuest, next.nodeId, saved.embodimentWorldNode, activeQuest.returnTo, next.embodimentOriginNode,
    )
    next.embodimentWorldNode = next.nodeId
    next.embodimentPaused = true
  } else {
    // Unpaused means exactly one thing: the owned scene on screen is the focus.
    // If a partial save disagrees, the canonical current scene wins.
    next.embodimentFocusNode = next.nodeId
    next.embodimentWorldNode = safePublicNode(
      activeQuest, saved.embodimentWorldNode, activeQuest.returnTo, next.embodimentOriginNode,
    )
    next.embodimentPaused = false
  }
  next.trail = next.trail.filter((id) => id !== next.nodeId)
  // Old saves predate the split clock and cannot reveal the hour at which a
  // previously paused scene was left. Initialising once from their only honest
  // timestamp (the saved world clock) is deterministic; every subsequent save
  // preserves the exact frozen tale hour. Forged future tale clocks are
  // clamped because the living world never runs behind a tale begun within it.
  next.embodimentClock = activeQuest
    ? Math.max(0, Math.min(next.clock, Math.floor(finiteOr(saved.embodimentClock, next.clock))))
    : null
  next.embodimentInventorySnapshot = activeQuest && isRecord(saved.embodimentInventorySnapshot)
    ? countRecord(saved.embodimentInventorySnapshot)
    : activeQuest
      ? { ...next.inventory }
      : null
  // Role-local branch markers must travel with the role, not poison a later
  // replay after that role closes. Old active saves have no snapshot, so their
  // current flags are the only lossless migration fallback.
  next.embodimentFlagsSnapshot = activeQuest && isRecord(saved.embodimentFlagsSnapshot)
    ? truthRecord(saved.embodimentFlagsSnapshot)
    : activeQuest
      ? Object.fromEntries(Object.entries(next.flags).filter(([id]) =>
          !(next.embodying === 'tomor-shpirag' && id === 'jamShpirag')))
      : null
  // Saves written before pack isolation kept the traveller's belongings mixed
  // into the role inventory. Subtract the exact entry snapshot once; any
  // positive remainder is a genuine tale-local gain and is preserved.
  if (activeQuest && saved.embodimentInventoryIsolated !== true) {
    next.inventory = subtractCountRecords(next.inventory, next.embodimentInventorySnapshot)
  }
  if (activeQuest) {
    next.inventory = restrictCountRecord(
      next.inventory,
      embodimentInventoryIds(next.embodying, activeQuest),
    )
  }
  next.embodimentInventoryIsolated = activeQuest ? true : null
  // Legacy saves did not record the traveller's pre-role health. Their only
  // honest deterministic fallback is the saved current value; new entries
  // always preserve the exact traveller value before starting at full health.
  next.embodimentHeartsSnapshot = activeQuest
    ? savedEmbodimentHearts ?? Math.max(1, next.hearts)
    : null
  next.embodimentArrivalSnapshot = activeQuest && next.embodimentPaused
    ? normalizedArrivalSnapshot(saved.embodimentArrivalSnapshot, next, next.embodimentFocusNode)
    : null
  const pending = isRecord(saved.pendingEmbodiment) ? saved.pendingEmbodiment : null
  const pendingOption = pending && pending.fromNodeId === next.nodeId
    ? STORY[pending.fromNodeId]?.options?.[pending.optionIndex]
    : null
  next.pendingEmbodiment = !activeQuest && !next.ended && pendingOption?.become &&
    isKnownEmbodiment(pendingOption.become) && canChoose(next, pendingOption)
    ? {
        taleId: canonicalEmbodimentId(pendingOption.become),
        fromNodeId: pending.fromNodeId,
        optionIndex: pending.optionIndex,
      }
    : null
  next.timePassage = canonicalSavedPassage(saved.timePassage, next, activeQuest)
  next.debug = saved.debug === true
  next.loreFocus = typeof saved.loreFocus === 'string' ? saved.loreFocus : null
  // The return banner belongs only to a live practice hand-off from this exact
  // scene. Retired/edited options and saves made in another view fail closed.
  next.practiceTarget = next.view === 'practice'
    ? normalizeTrainingTarget(saved.practiceTarget, next.nodeId)
    : null
  return next
}

// the saved run if it's still valid, otherwise a fresh run
export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STATE_KEY))
    if (isRecord(saved)) {
      // Normalize even when a release retired or renamed the saved scene. The
      // player returns to the opening, but their valid learning and durable
      // progress survive instead of being discarded with the stale location.
      const fresh = newRun()
      return normalizeSavedState(saved, fresh)
    }
  } catch {
    /* ignore */
  }
  return newRun()
}

// per-run state (everything that resets when you start a new attempt)
function baseRun() {
  return {
    nodeId: START_NODE,
    cameFrom: null, // the node you walked in from (see ARRIVAL above)
    cameFromPhase: null, // the time-of-day phase when you chose your last option (see ARRIVAL)
    familiar: false, // was THIS node already visited when you arrived? (see FAMILIARITY below)
    heard: {}, // nodeId -> true once a scene TOLD you of the place (see HEARSAY below)
    rumor: false, // does THIS arrival fulfil a rumor — heard of, never seen? (see HEARSAY)
    trail: [], // the last few DISTINCT nodes you occupied before this one, most-recent first
    // (see BACKTRACK below). An option whose destination is in the trail is a step BACK to a
    // place you were just at — it always shows (never reveal-gated, never ringed).
    discovered: {}, // senseId -> true
    inventory: {}, // itemId -> count (you start with nothing)
    flags: {}, // authored story state; never rendered as something carried
    knowledge: {}, // learned facts with provenance; survives later runs
    interactions: {}, // explicitly identified option uses, partitioned by scope
    rendezvous: {}, // named NPC promises with deadlines and physical meeting places
    hearts: START_HEARTS, // wrong training answers cost a heart; 0 = game over
    healedAt: {}, // heart level -> true once that level's once-per-run self-heal is spent (see HEART_LEVELS)
    turn: 1,
    clock: START_CLOCK, // hour of the world-day (see TIME OF DAY above)
    embodimentClock: null, // frozen tale chronology while an embodied role explores outside it
    fixtures: {}, // fixtureId -> activation hour (see TIMED WORLD FIXTURES above)
    npcStarted: {}, // npcId -> hour a one-shot NPC route was triggered (see NPC ROUTES above)
    worldFacts: {}, // lasting changes caused by completed tales (rain, restored water, spared places)
    view: 'story', // 'story' | 'practice' | 'dictionary' | 'map' | 'endings' | 'guide'
    practiceTarget: null, // exact story option whose Train button opened practice
    ended: null, // null | 'good' | 'bad' | 'secret'
    embodying: null, // explicit tale-role contract; kept through its ending screen
    embodimentOriginNode: null, // overworld threshold where the role began
    embodimentFocusNode: null, // last live tale scene, retained while wandering
    embodimentWorldNode: null, // latest overworld footing to return to when pausing again
    embodimentPaused: false, // true while freely exploring away from the waiting tale
    embodimentInventorySnapshot: null, // traveller's pack, restored when the role closes
    embodimentInventoryIsolated: null, // migration marker: active inventory contains tale-local state only
    embodimentFlagsSnapshot: null, // pre-role run flags, restored when the role closes
    embodimentHeartsSnapshot: null, // traveller health, restored when a surviving role closes
    embodimentArrivalSnapshot: null, // exact focus arrival, restored after a public-road detour
    pendingEmbodiment: null, // confirmed before the threshold spends words or moves
    pendingTest: null, // achievement id whose test the in-story banner is offering
    dismissedTests: {}, // achievement ids whose banner was waved off this run
    timePassage: null, // persisted interstitial for a committed multi-day transition
  }
}

// the initial state when the app boots
export function newRun() {
  // Word and phrase practice plus the achievement maps live OUTSIDE baseRun():
  // they are long-term learning progress that carries across runs.
  return {
    ...baseRun(),
    mana: {},
    practiced: {},
    formPracticed: {},
    phrasePracticed: {},
    phraseMistakes: {},
    phraseProgressVersion: PHRASE_PROGRESS_VERSION,
    phraseProductionProgress: {},
    phraseMastery: {},
    phraseListeningMastery: {},
    phraseMatchingMastery: {},
    trainRound: 0,
    trainLastWords: [],
    trainLastQuestionKey: null,
    visited: {},
    ...loadAchievements(),
    debug: false,
    loreFocus: null,
  }
}

// distinct sense ids used by a phrase (an option's answer or an item's use phrase)
export function phraseSenses(tokens) {
  const ids = new Set()
  for (const t of tokens) if (t.id) ids.add(t.id)
  return [...ids]
}

// can a token phrase be "spoken": all words discovered + one token each available
export function canSpeak(state, tokens) {
  const ids = phraseSenses(tokens)
  const allDiscovered = ids.every((id) => state.discovered[id])
  const enoughMana = ids.every((id) => (state.mana[id] || 0) >= 1)
  return { ids, allDiscovered, enoughMana, ok: allDiscovered && enoughMana }
}

// an option can be gated on what you hold: `requires` shows it only once you have that
// item/companion; `unless` hides it once you have that item/companion (e.g. a trap that
// no longer exists because your wolf already drove the threat off). Either accepts a
// single id or an array (e.g. requires: ['buke', 'night']), and a time-of-day phase id
// gates on the hour instead of the pack.
const condList = (v) => (v == null ? [] : Array.isArray(v) ? v : [v])
const isArrivalSensitiveId = (id) =>
  isTimeId(id) ||
  (typeof id === 'string' &&
    (id.startsWith('season:') ||
      id.startsWith('greeting:') ||
      id.startsWith('weather:') ||
      id.startsWith('festival:') ||
      id.startsWith('weekday:')))

export const hasRequiredItem = (state, option) => {
  const required = condList(option.requires)
  const excluded = condList(option.unless)
  if (!required.every((id) => hasCond(state, id))) return false
  if (!excluded.every((id) => !hasCond(state, id))) return false

  // `time`/`date` is an authored wait: its purpose is to cross a boundary.
  // Otherwise a phase/calendar/weather condition must still hold when the
  // choice finishes, not only at the instant its button is drawn.
  if (!option.time && !option.date && option.atHour == null) {
    const arrivalClock = projectedClockForOption(state, option)
    const arrivalState = { ...state, clock: arrivalClock, conditionClock: arrivalClock }
    if (!required.filter(isArrivalSensitiveId).every((id) => hasCond(arrivalState, id))) return false
    if (!excluded.filter(isArrivalSensitiveId).every((id) => !hasCond(arrivalState, id))) return false
  }

  // Role compatibility is intentionally not a visibility condition. A revealed
  // threshold remains visible with a plain "finish your present tale first"
  // explanation; embodimentOptionAccess enforces that rule here at selection.
  return true
}

// ---------------------------------------------------------------------------
// LEK — the in-world money (the 🪙 count in `inventory.lek`). An option carries
// `lek: <n>`: positive is a payment TO you (work, a sale), negative a price you
// pay. A priced option stays VISIBLE when you can't afford it (the price is part
// of learning the scene) but can't be taken — see canChoose/StoryView.
// ---------------------------------------------------------------------------
export const lekOf = (state) => Number.isSafeInteger(state.inventory?.lek) && state.inventory.lek > 0
  ? state.inventory.lek
  : 0
export const canAfford = (state, option) => optionLekAvailability(state, option).ok

export const interactionAvailabilityForOption = (state, option) => interactionAvailability(
  state.interactions,
  option,
  {
    clock: storyClockOf(state),
    nodeId: state.nodeId,
    taleId: state.embodying,
  },
)

export const rendezvousAvailabilityForOption = (state, option) => rendezvousAvailability(
  state,
  option,
  {
    clock: worldClockOf(state),
    isNpc: (id) => Boolean(NPCS[id]),
    isPlace: (id) => Boolean(STORY[id]),
  },
)

const npcStartIdsOf = (option) => option?.startsNpc == null
  ? []
  : Array.isArray(option.startsNpc)
    ? option.startsNpc
    : [option.startsNpc]

export const optionNpcStartsAreValid = (option) => {
  const ids = npcStartIdsOf(option)
  return ids.length === new Set(ids).size && ids.every((id) => typeof id === 'string' && Boolean(NPCS[id]?.once))
}

const canActOnFixtureAt = (state) => (fixtureId) =>
  TIMED_WORLD_FIXTURES[fixtureId]?.nodeId === state.nodeId

export const effectAvailabilityForOption = (state, option) => optionEffectAvailability(
  state,
  option,
  isTimedWorldFixture,
  {
    fixtureClock: projectedClockForOption(state, option),
    canActOnFixture: canActOnFixtureAt(state),
  },
)

export const canChoose = (state, option) => {
  const sp = canSpeak(state, option.text)
  return optionTimingIsValid(option) && sp.ok &&
    optionNpcStartsAreValid(option) &&
    hasRequiredItem(state, option) &&
    canAfford(state, option) &&
    effectAvailabilityForOption(state, option).ok &&
    interactionAvailabilityForOption(state, option).ok &&
    rendezvousAvailabilityForOption(state, option).ok
}

export const canUseItem = (state, item) => {
  if (!item?.use?.phrase) {
    return {
      allDiscovered: false,
      enoughMana: false,
      ids: [],
      effectAvailability: { ok: false, reason: 'invalid-effect' },
      ok: false,
    }
  }
  const speech = canSpeak(state, item.use.phrase)
  const effectOption = itemUseEffectsOption(item)
  const effectAvailability = optionEffectAvailability(state, effectOption, isTimedWorldFixture, {
    fixtureClock: worldClockOf(state),
    canActOnFixture: canActOnFixtureAt(state),
  })
  return {
    ...speech,
    effectAvailability,
    ok: !state.embodying && !state.ended && !state.timePassage &&
      !state.pendingEmbodiment && state.hearts > 0 && speech.ok &&
      (state.inventory?.[item.id] || 0) > 0 &&
      optionEffectsAreValid(effectOption, isTimedWorldFixture) &&
      effectAvailability.ok,
  }
}

function spend(mana, ids) {
  const next = { ...mana }
  for (const id of ids) next[id] = (next[id] || 0) - 1
  return next
}

export function applyWorldEffects(worldFacts, effects, clock, source) {
  if (!Array.isArray(effects) || effects.length === 0) return worldFacts || {}
  let next = worldFacts || {}
  for (const id of effects) {
    if (typeof id !== 'string' || !id) continue
    const conflicts = WORLD_FACT_INCOMPATIBLE[id] || []
    const hasConflict = conflicts.some((other) => next[other] != null)
    if (next[id] != null && !hasConflict) continue
    if (next === worldFacts) next = { ...next }
    for (const other of conflicts) delete next[other]
    if (next[id] == null) next[id] = { atClock: clock, source }
  }
  return next
}

const worldFactClock = (fact) =>
  fact && typeof fact === 'object' && Number.isFinite(fact.atClock)
    ? fact.atClock
    : -Infinity

// Repair saves written before incompatible outcomes were enforced. The later
// recorded outcome wins; an impossible exact tie resolves deterministically so
// a save never reopens with two contradictory ambient memories.
export function reconcileWorldFacts(worldFacts) {
  if (!isRecord(worldFacts)) return {}
  let next = worldFacts
  const seen = new Set()
  for (const [id, conflicts] of Object.entries(WORLD_FACT_INCOMPATIBLE)) {
    for (const other of conflicts) {
      const pair = [id, other].sort()
      const key = pair.join('|')
      if (seen.has(key)) continue
      seen.add(key)
      if (next[id] == null || next[other] == null) continue
      if (next === worldFacts) next = { ...next }
      const loser = worldFactClock(next[id]) > worldFactClock(next[other])
        ? other
        : id
      delete next[loser]
    }
  }
  return next
}

export function reducer(state, action) {
  switch (action.type) {
    case 'DISCOVER': {
      if (state.discovered[action.id]) return state
      return { ...state, discovered: { ...state.discovered, [action.id]: true } }
    }

    case 'BEGIN_OPTION_TRAINING': {
      const practiceTarget = normalizeTrainingTarget(action.target, state.nodeId)
      const option = practiceTarget && resolveTrainingTarget(practiceTarget)
      const speech = option && canSpeak(state, option.text)
      // Accept only the same state in which Story renders its Train control:
      // every word is known, but at least one required token is still missing.
      if (state.view !== 'story' || !option || !speech?.allDiscovered || speech.enoughMana) return state
      return { ...state, view: 'practice', practiceTarget }
    }

    case 'REQUEST_EMBODIMENT': {
      if (state.embodying || state.pendingEmbodiment || state.ended) return state
      const option = STORY[state.nodeId]?.options?.[action.optionIndex]
      if (!option?.become || !isKnownEmbodiment(option.become) || !canChoose(state, option)) return state
      return {
        ...state,
        pendingEmbodiment: {
          taleId: canonicalEmbodimentId(option.become),
          fromNodeId: state.nodeId,
          optionIndex: action.optionIndex,
        },
      }
    }

    case 'CANCEL_EMBODIMENT':
      return state.pendingEmbodiment ? { ...state, pendingEmbodiment: null } : state

    case 'CONFIRM_EMBODIMENT': {
      const pending = state.pendingEmbodiment
      const option = pending && pending.fromNodeId === state.nodeId
        ? STORY[pending.fromNodeId]?.options?.[pending.optionIndex]
        : null
      if (!option?.become || canonicalEmbodimentId(option.become) !== pending?.taleId) {
        return { ...state, pendingEmbodiment: null }
      }
      return reducer(
        { ...state, pendingEmbodiment: null },
        { type: 'CHOOSE', option, targetNode: STORY[option.to], embodimentConfirmed: true },
      )
    }

    case 'PAUSE_EMBODIMENT': {
      const quest = embodimentQuest(state.embodying)
      if (!quest || state.ended || state.embodimentPaused || state.timePassage ||
          state.nodeId !== state.embodimentFocusNode || !quest.nodes.includes(state.nodeId) ||
          STORY[state.nodeId]?.end) return state
      const to = safePublicNode(
        quest, state.embodimentWorldNode, quest.returnTo, state.embodimentOriginNode,
        ...embodimentEntryNodes(quest),
      )
      return {
        ...state,
        nodeId: to,
        cameFrom: null,
        cameFromPhase: null,
        familiar: Boolean(state.visited?.[to]),
        rumor: false,
        trail: [],
        embodimentWorldNode: to,
        embodimentPaused: true,
        embodimentArrivalSnapshot: arrivalSnapshotOf(state, state.nodeId),
        view: 'story',
        practiceTarget: null,
      }
    }

    case 'RESUME_EMBODIMENT': {
      const quest = embodimentQuest(state.embodying)
      const to = state.embodimentFocusNode
      if (!quest || state.ended || !state.embodimentPaused || state.timePassage ||
          !quest.nodes.includes(to) || !STORY[to] || STORY[to].end ||
          !PUBLIC_FREE_ROAM_NODE_SET.has(state.nodeId)) return state
      const arrival = normalizedArrivalSnapshot(state.embodimentArrivalSnapshot, state, to)
      return {
        ...state,
        nodeId: to,
        cameFrom: arrival.cameFrom,
        cameFromPhase: arrival.cameFromPhase,
        familiar: arrival.familiar,
        rumor: arrival.rumor,
        trail: arrival.trail,
        visited: { ...state.visited, [to]: true },
        embodimentWorldNode: state.nodeId,
        embodimentPaused: false,
        embodimentArrivalSnapshot: null,
        view: 'story',
        practiceTarget: null,
      }
    }

    case 'CHOOSE': {
      const { option } = action
      // Only a choice authored on the scene the reducer currently owns may
      // commit. This rejects stale double-clicks after navigation and prevents
      // a caller from attaching another node's ending/world effects to a road.
      if (state.hearts <= 0 || state.ended || state.timePassage || state.pendingEmbodiment) return state
      if (action.fromNodeId != null && action.fromNodeId !== state.nodeId) return state
      if (action.fromTurn != null && action.fromTurn !== state.turn) return state
      if (!STORY[state.nodeId]?.options?.includes(option)) return state
      const targetNode = STORY[option.to]
      if (!targetNode) return state
      const roleAccess = embodimentOptionAccess(state, option, targetNode)
      if (!roleAccess.ok) return state
      // A tale-owned action is gated by the frozen tale chronology; detours
      // and ordinary play are gated by the living world. The renderer uses
      // this same projection, so a resumed night scene cannot display an
      // available action that the reducer then rejects against daytime.
      const choiceState = roleAccess.kind === 'quest' ? currentStoryState(state) : state
      if (!canChoose(choiceState, option)) return state
      if (option.become && !state.embodying && !action.embodimentConfirmed) return state
      const interactionUse = interactionAvailabilityForOption(choiceState, option)
      const rendezvousUse = rendezvousAvailabilityForOption(state, option)
      const { ids } = canSpeak(state, option.text)
      // A BAD ending is recorded at once (a fate met is met). A good/secret
      // ending is an ACHIEVEMENT DEED: reaching it marks the achievement
      // ELIGIBLE (permanently — a failed test never loses the deed). The codex
      // entry and heart-restore come from EARN_ACHIEVEMENT, dispatched only
      // when EVERY comprehension question is answered correctly.
      const earned = targetNode?.end === 'bad'
        ? { ...state.earned, [option.to]: true }
        : state.earned
      let eligible = state.eligible
      if ((targetNode?.end === 'good' || targetNode?.end === 'secret') && !eligible[option.to]) {
        eligible = { ...eligible, [option.to]: true }
      }
      // Track where you've been (persistent); exploring a region past its
      // threshold is the DEED of its area achievement.
      // FAMILIARITY: was the destination already visited when you set out?
      // Exposed as the virtual item `again` so a scene can tell its rich
      // first-visit prose once and stay slim-but-alive on every return
      // (first()/again() lines in content.js). A self-loop (wait, light the
      // fire, take the salt) does not restart the standing, so it keeps the
      // arrival's familiarity rather than ageing the scene mid-conversation.
      const familiar = option.to === state.nodeId ? !!state.familiar : !!state.visited[option.to]
      // HEARSAY: arriving somewhere you had only HEARD OF fulfils the rumor —
      // the one-shot virtual item `rumor` lets the scene close the loop the
      // fire-circle opened ("ti ke dëgjuar fjalët: ja deti."). And the scene
      // you arrive at may itself TELL of far places (node.tells: [...ids]) —
      // they enter your head (state.heard, persistent) and the world map marks
      // them as rumors until you stand there. See the FAMILIARITY notes.
      const rumor = option.to === state.nodeId
        ? !!state.rumor
        : !state.visited[option.to] && !!state.heard?.[option.to]
      let heard = state.heard || {}
      if (targetNode?.tells) {
        heard = { ...heard }
        for (const t of targetNode.tells) heard[t] = true
      }
      const visited = { ...state.visited, [option.to]: true }
      const newAreas = newlyEligibleAreas(visited, eligible)
      if (newAreas.length) {
        eligible = { ...eligible }
        for (const id of newAreas) eligible[id] = true
      }
      // unless you've just hit an ending screen, the banner may offer an
      // eligible-but-unpassed area test (the codex always has the retake too)
      const pendingTest = targetNode?.end || state.embodying || option.become
        ? state.pendingTest
        : state.pendingTest || offerableTest(eligible, earned, state.dismissedTests)
      // Project a tale action once from tale time, then add exactly that
      // elapsed delta to world time. Never project the two clocks separately:
      // their phases may differ after a detour, and independent `time:` waits
      // would invent extra days. Detours advance only the world clock.
      const choiceFromClock = storyClockOf(choiceState)
      const choiceToClock = projectedClockForOption(choiceState, option)
      const elapsedHours = Math.max(0, choiceToClock - choiceFromClock)
      const worldFromClock = worldClockOf(state)
      const clock = roleAccess.kind === 'quest'
        ? worldFromClock + elapsedHours
        : choiceToClock
      const timePassage = timePassageForOption(choiceState, option, choiceToClock,
        roleAccess.kind === 'quest'
          ? { clockKind: 'tale', worldFromClock, worldToClock: clock }
          : { clockKind: 'world' })
      const worldFacts = applyWorldEffects(
        state.worldFacts,
        targetNode?.worldEffects,
        clock,
        targetNode?.id || option.to,
      )
      // Activating a fixture stamps the clock which owns the current scene.
      // A tale-owned lamp therefore waits with that tale during a detour, while
      // an overworld campfire keeps ageing with the living world.
      const fixtureClock = roleAccess.kind === 'quest' ? choiceToClock : clock
      const effectState = applyOptionEffects(
        state,
        option,
        {
          atClock: clock,
          fixtureClock,
          canActOnFixture: canActOnFixtureAt(choiceState),
          isFixture: isTimedWorldFixture,
          maxHearts: START_HEARTS,
          source: `${state.nodeId}->${option.to}`,
        },
      )
      let inventory = effectState.inventory
      const flags = effectState.flags
      const knowledge = effectState.knowledge
      const fixtures = effectState.fixtures
      const heartsAfterEffects = effectState.hearts
      const interactions = recordInteractionUse(state.interactions, interactionUse, choiceToClock)
      // A one-shot journey may begin because the player chose to set someone
      // on their way, or because they entered an older trigger scene. The
      // option-level form stamps departure time; the legacy node-level form
      // stamps arrival time. Neither can restart a journey already under way.
      let npcStarted = state.npcStarted
      for (const npcId of npcStartIdsOf(option)) {
        if (npcStarted?.[npcId] != null) continue
        if (npcStarted === state.npcStarted) npcStarted = { ...state.npcStarted }
        npcStarted[npcId] = worldFromClock
      }
      if (targetNode?.startsNpc && npcStarted?.[targetNode.startsNpc] == null) {
        if (npcStarted === state.npcStarted) npcStarted = { ...state.npcStarted }
        npcStarted[targetNode.startsNpc] = clock
      }
      let rendezvous = scheduleRendezvous(state.rendezvous, rendezvousUse)
      const arrivalNpcState = { ...state, clock, conditionClock: clock, npcStarted, rendezvous }
      rendezvous = recordRendezvousArrivals(rendezvous, {
        nodeId: option.to,
        clock,
        npcNodeOf: (npcId) => npcNodeOf(arrivalNpcState, npcId),
      })
      // An option may alter hearts through either the legacy field or a typed
      // resource effect. Achievement restoration remains EARN_ACHIEVEMENT-only.
      let hearts = heartsAfterEffects
      // Crossing a confirmed threshold binds a role. The binding remains on its
      // own ending screen so the role cannot disappear before the tale has been
      // read/tested and explicitly closed.
      let embodying = state.embodying ?? null
      let embodimentOriginNode = state.embodimentOriginNode ?? null
      let embodimentFocusNode = state.embodimentFocusNode ?? null
      let embodimentWorldNode = state.embodimentWorldNode ?? null
      let embodimentPaused = state.embodimentPaused ?? false
      let embodimentClock = state.embodimentClock ?? null
      let embodimentInventorySnapshot = state.embodimentInventorySnapshot ?? null
      let embodimentInventoryIsolated = state.embodimentInventoryIsolated ?? null
      let embodimentFlagsSnapshot = state.embodimentFlagsSnapshot ?? null
      let embodimentHeartsSnapshot = state.embodimentHeartsSnapshot ?? null
      let embodimentArrivalSnapshot = state.embodimentArrivalSnapshot ?? null
      if (option.become && !embodying) {
        embodying = canonicalEmbodimentId(option.become)
        embodimentOriginNode = state.nodeId
        embodimentFocusNode = option.to
        embodimentWorldNode = embodimentQuest(embodying)?.returnTo || state.nodeId
        embodimentPaused = false
        embodimentClock = clock
        embodimentInventorySnapshot = { ...state.inventory }
        embodimentFlagsSnapshot = { ...state.flags }
        // The traveller's pack waits outside the role. Begin with a clean tale
        // inventory, then keep only state explicitly granted by the threshold
        // itself (currently Maro's grain). Closure restores the exact snapshot.
        inventory = entryInventoryFromOption(option)
        embodimentInventoryIsolated = true
        embodimentHeartsSnapshot = state.hearts
        hearts = Math.max(1, Math.min(START_HEARTS,
          embodimentQuest(embodying)?.startingHearts ?? START_HEARTS))
        embodimentArrivalSnapshot = null
      } else if (embodying && roleAccess.kind === 'quest') {
        embodimentFocusNode = option.to
        embodimentPaused = false
        embodimentClock = choiceToClock
        embodimentArrivalSnapshot = null
      } else if (embodying && roleAccess.kind === 'detour') {
        if (!state.embodimentPaused && state.nodeId === state.embodimentFocusNode) {
          embodimentArrivalSnapshot = arrivalSnapshotOf(state, state.embodimentFocusNode)
        }
        embodimentWorldNode = option.to
        embodimentPaused = true
      }
      return {
        ...state,
        mana: spend(state.mana, ids),
        inventory,
        flags,
        knowledge,
        interactions,
        rendezvous,
        earned,
        eligible,
        visited,
        pendingTest,
        hearts,
        nodeId: option.to,
        cameFrom: state.nodeId,
        cameFromPhase: timeOfDay(choiceState),
        familiar,
        heard,
        rumor,
        // breadcrumb the node you're leaving onto the trail (most-recent first, kept
        // DISTINCT and capped at TRAIL_LEN). Drop the destination if it's already in
        // there so a place is never in its own backtrack set. See BACKTRACK below.
        trail: [state.nodeId, ...(state.trail || [])].filter((n, i, a) => a.indexOf(n) === i && n !== option.to).slice(0, TRAIL_LEN),
        turn: state.turn + 1,
        clock,
        timePassage,
        fixtures,
        npcStarted,
        worldFacts,
        embodying,
        embodimentOriginNode,
        embodimentFocusNode,
        embodimentWorldNode,
        embodimentPaused,
        embodimentClock,
        embodimentInventorySnapshot,
        embodimentInventoryIsolated,
        embodimentFlagsSnapshot,
        embodimentHeartsSnapshot,
        embodimentArrivalSnapshot,
        pendingEmbodiment: null,
        ended: targetNode?.end || null,
        practiceTarget: null,
      }
    }

    case 'ADVANCE_TIME_PASSAGE': {
      const passage = state.timePassage
      if (!passage || action.passageId !== passage.id || action.expectedStep !== passage.step) return state
      const lastStep = passage.segments.length - 1
      if (passage.step >= lastStep) return state
      return { ...state, timePassage: { ...passage, step: passage.step + 1 } }
    }

    case 'DISMISS_TIME_PASSAGE':
      // Bind dismissal to both the passage and the segment the player saw. A
      // queued click from an old overlay can never dismiss a later passage.
      return state.timePassage && action.passageId === state.timePassage.id &&
        action.expectedStep === state.timePassage.step
        ? { ...state, timePassage: null }
        : state

    case 'USE_ITEM': {
      // The traveller's pack is suspended while another life is being lived.
      // Tale-local props still work through ordinary quest options.
      if (state.embodying || state.ended || state.timePassage ||
          state.pendingEmbodiment || state.hearts <= 0) return state
      const item = ITEMS[action.item?.id]
      // Reducer actions may come from stale UI or devtools. Resolve the item
      // through the canonical catalog so a caller cannot attach invented use
      // effects to the id of something the player genuinely carries.
      if (!item || (state.inventory[item.id] || 0) <= 0) return state
      // Every rendered item action carries the exact count it observed. Make
      // that token mandatory so a queued double activation cannot consume a
      // second copy after the first render has already committed.
      if (!Number.isSafeInteger(action.expectedCount) ||
          action.expectedCount !== state.inventory[item.id]) return state
      if (!item.use || !canUseItem(state, item).ok) return state
      const { ids } = canSpeak(state, item.use.phrase)
      const effected = applyOptionEffects(
        state,
        itemUseEffectsOption(item),
        {
          atClock: worldClockOf(state),
          fixtureClock: worldClockOf(state),
          canActOnFixture: canActOnFixtureAt(state),
          source: `item:${item.id}`,
          maxHearts: START_HEARTS,
          isFixture: isTimedWorldFixture,
        },
      )
      return { ...effected, mana: spend(state.mana, ids) }
    }

    case 'HEAL': {
      if (state.embodying) return state
      // Bind the action to the health line which revealed it. Two queued
      // activations from one render must not consume the next level's remedy.
      if (!Number.isSafeInteger(action.expectedHearts) || action.expectedHearts !== state.hearts) return state
      // The hearts-ladder self-mend (see content's HEART_LEVELS): only while AT
      // a below-full level, only once per level per run, only after the level's
      // health line is fully discovered — then it's a normal token spend.
      const lvl = state.hearts
      const spec = HEART_LEVELS[lvl]
      if (!spec?.heal || lvl >= START_HEARTS || lvl <= 0) return state
      if (state.healedAt?.[lvl]) return state
      if (!spec.line.every((t) => !t.id || state.discovered[t.id])) return state
      const sp = canSpeak(state, spec.heal.phrase)
      if (!sp.ok) return state
      return {
        ...state,
        mana: spend(state.mana, sp.ids),
        hearts: lvl + 1,
        healedAt: { ...state.healedAt, [lvl]: true },
      }
    }

    case 'PRACTICE_CORRECT': {
      if (!safeMapKey(action.id) || !state.discovered[action.id]) return state
      const completeRound = action.completeRound !== false
      return {
        ...state,
        mana: { ...state.mana, [action.id]: (state.mana[action.id] || 0) + 1 },
        // monotonic (never spent) — this is what unlocks a word's endings drill
        practiced: { ...state.practiced, [action.id]: (state.practiced?.[action.id] || 0) + 1 },
        trainRound: (state.trainRound || 0) + (completeRound ? 1 : 0),
        trainLastWords: completeRound ? normalizedTrainWords(action.wordKeys) : state.trainLastWords,
        trainLastQuestionKey: completeRound && typeof action.questionKey === 'string'
          ? action.questionKey.slice(0, 200)
          : state.trainLastQuestionKey,
      }
    }

    case 'PRACTICE_FORM_CORRECT': {
      if (!safeMapKey(action.id) || !state.discovered[action.id]) return state
      const formKey = reviewedFormPracticeKey(state, action.id, action.formSurface)
      if (!formKey) return state
      return {
        ...state,
        formPracticed: {
          ...state.formPracticed,
          [formKey]: (state.formPracticed?.[formKey] || 0) + 1,
        },
        trainRound: (state.trainRound || 0) + 1,
        trainLastWords: normalizedTrainWords(action.wordKeys),
        trainLastQuestionKey: typeof action.questionKey === 'string'
          ? action.questionKey.slice(0, 200)
          : null,
      }
    }

    case 'PRACTICE_WRONG':
      return {
        ...state,
        hearts: Math.max(0, state.hearts - 1),
        trainRound: (state.trainRound || 0) + 1,
        trainLastWords: normalizedTrainWords(action.wordKeys),
        trainLastQuestionKey: typeof action.questionKey === 'string' ? action.questionKey.slice(0, 200) : null,
      }

    case 'TRAIN_ROUND_COMPLETE':
      return {
        ...state,
        trainRound: (state.trainRound || 0) + 1,
        trainLastWords: normalizedTrainWords(action.wordKeys),
        trainLastQuestionKey: typeof action.questionKey === 'string' ? action.questionKey.slice(0, 200) : null,
      }

    case 'PRACTICE_PHRASE_RESULT': {
      if (action.correct !== true && action.correct !== false) return state
      if (!Array.isArray(action.phraseIds) || action.phraseIds.length === 0) return state
      if (!Array.isArray(action.rewardIds) || action.rewardIds.length === 0) return state
      const masteryField = action.skill === 'listening'
          ? 'phraseListeningMastery'
          : action.skill === 'matching'
            ? 'phraseMatchingMastery'
            : null
      if (!['production', 'listening', 'matching'].includes(action.skill)) return state
      const maxTier = PHRASE_SKILL_MAX_TIER[action.skill]
      if (!Number.isSafeInteger(action.tier) || action.tier < 0 || action.tier > maxTier) return state
      if (typeof action.questionKey !== 'string' || !action.questionKey || action.questionKey.length > 200) return state
      if (action.questionKey === state.trainLastQuestionKey) return state
      const phraseIds = [...new Set(action.phraseIds)]
      const rewardIds = [...new Set(action.rewardIds)]
      // Phrase construction is a lazy practice surface, so it supplies the
      // canonical word ids for the completed question. The reducer still
      // enforces safe keys and the same discovered-word boundary used to
      // unlock that phrase before changing durable progress.
      if (phraseIds.some((id) => typeof id !== 'string' || !safeMapKey(id))) return state
      if (rewardIds.some((id) => typeof id !== 'string' || !safeMapKey(id) || !state.discovered[id])) return state
      const phrases = phraseIds.map((id) => EVERYDAY_PHRASE_BY_ID.get(id))
      if (phrases.some((phrase) => !phrase)) return state
      if (phrases.some((phrase) => phrase.requires.some((id) => !state.discovered[id]))) return state
      const nextRound = (state.trainRound || 0) + 1
      const trainLastWords = normalizedTrainWords(phrases.flatMap((phrase) => phrase.al))

      if (action.skill === 'production') {
        if (phraseIds.length !== 1) return state
        const phrase = phrases[0]
        const focusIds = phraseProductionFocusIds(phrase)
        const transition = advancePhraseProduction(
          state.phraseProductionProgress?.[phrase.id],
          focusIds,
          state.trainRound || 0,
          {
            correct: action.correct,
            questionKey: action.questionKey,
            skill: action.skill,
            tier: action.tier,
            mode: action.mode,
            typeScope: action.typeScope,
            focusId: action.focusId || null,
            diagnostic: action.diagnostic,
            round: nextRound,
          },
        )
        if (!transition.accepted) return state
        const plan = transition.plan
        const canonicalRewards = plan.typeScope === 'word'
          ? [plan.focusId]
          : [...new Set(phrase.requires)]
        if (
          rewardIds.length !== canonicalRewards.length ||
          rewardIds.some((id) => !canonicalRewards.includes(id))
        ) return state
        const phraseProductionProgress = {
          ...(state.phraseProductionProgress || {}),
          [phrase.id]: transition.progress,
        }
        const phraseMastery = {
          ...(state.phraseMastery || {}),
          [phrase.id]: phraseProductionStage(transition.progress, focusIds),
        }
        if (!action.correct) {
          return {
            ...state,
            phraseProductionProgress,
            phraseMastery,
            phraseMistakes: {
              ...(state.phraseMistakes || {}),
              [phrase.id]: (state.phraseMistakes?.[phrase.id] || 0) + 1,
            },
            hearts: Math.max(0, state.hearts - 1),
            trainRound: nextRound,
            trainLastWords,
            trainLastQuestionKey: action.questionKey,
          }
        }
        const mana = { ...state.mana }
        const practiced = { ...state.practiced }
        for (const id of rewardIds) {
          mana[id] = (mana[id] || 0) + 1
          practiced[id] = (practiced[id] || 0) + 1
        }
        return {
          ...state,
          mana,
          practiced,
          phraseProductionProgress,
          phraseMastery,
          phrasePracticed: {
            ...(state.phrasePracticed || {}),
            [phrase.id]: (state.phrasePracticed?.[phrase.id] || 0) + 1,
          },
          trainRound: nextRound,
          trainLastWords,
          trainLastQuestionKey: action.questionKey,
        }
      }

      if (!masteryField) return state
      if (action.mode !== (action.skill === 'listening' ? 'listen' : 'match')) return state
      if (phrases.some((phrase) => phraseProductionStage(
        state.phraseProductionProgress?.[phrase.id],
        phraseProductionFocusIds(phrase),
      ) < PHRASE_PROGRESSION_POLICY.crossSkillUnlock.productionStage)) return state
      const currentTiers = phraseIds.map((id) => Math.min(
        maxTier,
        Math.max(0, Math.floor(state[masteryField]?.[id] || 0)),
      ))
      if (currentTiers.some((tier) => tier !== action.tier)) return state
      const canonicalRewards = new Set(phrases.flatMap((phrase) => phrase.requires))
      if (
        rewardIds.length !== canonicalRewards.size ||
        rewardIds.some((id) => !canonicalRewards.has(id))
      ) return state
      if (!action.correct) {
        const phraseMistakes = { ...(state.phraseMistakes || {}) }
        for (const id of phraseIds) phraseMistakes[id] = (phraseMistakes[id] || 0) + 1
        return {
          ...state,
          phraseMistakes,
          hearts: Math.max(0, state.hearts - 1),
          trainRound: nextRound,
          trainLastWords,
          trainLastQuestionKey: action.questionKey,
        }
      }

      const phrasePracticed = { ...(state.phrasePracticed || {}) }
      for (const id of phraseIds) phrasePracticed[id] = (phrasePracticed[id] || 0) + 1
      const skillMastery = { ...(state[masteryField] || {}) }
      for (const [index, id] of phraseIds.entries()) {
        skillMastery[id] = Math.min(maxTier, currentTiers[index] + 1)
      }
      const mana = { ...state.mana }
      const practiced = { ...state.practiced }
      for (const id of rewardIds) {
        mana[id] = (mana[id] || 0) + 1
        practiced[id] = (practiced[id] || 0) + 1
      }
      return {
        ...state,
        mana,
        practiced,
        phrasePracticed,
        [masteryField]: skillMastery,
        trainRound: nextRound,
        trainLastWords,
        trainLastQuestionKey: action.questionKey,
      }
    }

    case 'CONFUSE':
      // picked an option that can't happen in this part of the story
      if (action.expectedHearts != null && action.expectedHearts !== state.hearts) return state
      return state.embodying ? state : { ...state, hearts: Math.max(0, state.hearts - 1) }

    case 'COMP_WRONG':
      // missed a comprehension question — costs a heart (run out and the run
      // is over). The gate is HARD: the wrong answer also ends the attempt
      // (see FAIL_TEST), but the deed stays eligible for a retake.
      return { ...state, hearts: Math.max(0, state.hearts - 1) }

    case 'SET_VIEW':
      // UI gating is not a sufficient boundary: stale saves and manually
      // dispatched actions must not be able to render the atlas in normal play.
      if (action.view === 'map' && !state.debug) {
        return state.view === 'story' && !state.practiceTarget
          ? state
          : { ...state, view: 'story', practiceTarget: null }
      }
      return { ...state, view: action.view, practiceTarget: null }

    // --- DEBUG MODE (unlocked by clicking the title 5×) ---------------------
    case 'TOGGLE_DEBUG': {
      const debug = !state.debug
      return {
        ...state,
        debug,
        // Leaving debug from the atlas returns to the playable story instead
        // of leaving an invisible or briefly exposed debug-only surface.
        view: !debug && state.view === 'map' ? 'story' : state.view,
      }
    }

    // Instantly make an option/phrase takeable: discover all its words and give
    // one training token for each. Used by the ⚡ button on a locked option.
    case 'DEBUG_GRANT': {
      const discovered = { ...state.discovered }
      const mana = { ...state.mana }
      const practiced = { ...state.practiced }
      for (const id of action.ids || []) {
        discovered[id] = true
        if ((mana[id] || 0) < 1) mana[id] = 1
        // also cross the endings-drill threshold so granted words are testable
        if ((practiced[id] || 0) < FORMS_UNLOCK_THRESHOLD) practiced[id] = FORMS_UNLOCK_THRESHOLD
      }
      return { ...state, discovered, mana, practiced }
    }

    // Drop 20 lek in the purse (the 🛠 🪙 chip) so priced paths are testable.
    case 'DEBUG_LEK':
      return { ...state, inventory: { ...state.inventory, lek: (state.inventory.lek || 0) + 20 } }

    // Take a hit (the 🛠 ♥ chip) so the hearts ladder and its once-per-level
    // self-heals are testable without failing training answers on purpose.
    case 'DEBUG_HURT':
      return { ...state, hearts: Math.max(0, state.hearts - 1) }

    // Skip to the start of the next time-of-day phase (the 🛠 time chip).
    // Stamps cameFromPhase like a real choice would, so became() transition
    // lines are previewable from the debug chip.
    case 'DEBUG_TIME': {
      const sceneState = action.clockDomain === 'world' ? state : currentStoryState(state)
      const fromClock = storyClockOf(sceneState)
      let sceneClock = fromClock + 1
      while (phaseAtClock(sceneClock) === phaseAtClock(fromClock)) sceneClock++
      const elapsedHours = sceneClock - fromClock
      const advancesTale = action.clockDomain !== 'world' && embodimentClockOf(state) != null && !state.embodimentPaused &&
        embodimentQuest(state.embodying)?.nodes.includes(state.nodeId)
      return {
        ...state,
        clock: worldClockOf(state) + elapsedHours,
        embodimentClock: advancesTale ? sceneClock : state.embodimentClock,
        cameFromPhase: phaseAtClock(fromClock),
      }
    }

    // Jump to the folklore library focused on a tale (from an ending's link).
    case 'OPEN_LORE':
      return { ...state, view: 'debug', loreFocus: action.lore }

    // Passed an achievement's comprehension gate — every question right:
    // unlock it, restore all hearts, and clear any pending banner offer.
    case 'EARN_ACHIEVEMENT':
      // While a character role is bound, only that role's own ending gate may
      // change the chronicle or restore role health. The collection screen
      // disables unrelated tests too; this is the state-layer backstop.
      if (state.embodying && !(
        state.ended && state.nodeId === action.id &&
        isEmbodimentEnding(state.embodying, state.nodeId)
      )) return state
      if (!ACHIEVEMENT_BY_ID[action.id] || !state.eligible?.[action.id] || state.earned?.[action.id]) return state
      return {
        ...state,
        earned: { ...state.earned, [action.id]: true },
        hearts: START_HEARTS,
        pendingTest: state.pendingTest === action.id ? null : state.pendingTest,
      }

    // Failed the gate (one wrong answer ends the attempt). The deed stays
    // eligible; the attempt count salts the NEXT test's questions so the gate
    // can't be beaten by memorising this one. The banner stands down for the
    // rest of the run — the codex keeps the retake.
    case 'FAIL_TEST':
      if (state.embodying && !(
        state.ended && state.nodeId === action.id &&
        isEmbodimentEnding(state.embodying, state.nodeId)
      )) return state
      if (!ACHIEVEMENT_BY_ID[action.id] || !state.eligible?.[action.id] || state.earned?.[action.id]) return state
      return {
        ...state,
        attempts: { ...state.attempts, [action.id]: (state.attempts[action.id] || 0) + 1 },
        pendingTest: state.pendingTest === action.id ? null : state.pendingTest,
        dismissedTests: { ...state.dismissedTests, [action.id]: true },
      }

    // Waved off the "take the test" banner — quiet for the rest of the run
    // (the Achievements tab still offers the test any time).
    case 'DISMISS_TEST':
      if (state.pendingTest !== action.id) return state
      return {
        ...state,
        pendingTest: null,
        dismissedTests: { ...state.dismissedTests, [action.id]: true },
      }

    case 'CONTINUE':
      // finished an ending: play again, but KEEP what you've learned — your
      // discovered words AND tokens carry over (only the run itself restarts)
      if (state.ended !== 'bad') return state
      if (STORY[state.nodeId]?.end !== 'bad') return state
      if (state.embodying && !isEmbodimentEnding(state.embodying, state.nodeId)) return state
      return {
        ...baseRun(),
        mana: state.mana,
        practiced: state.practiced,
        formPracticed: state.formPracticed || {},
        phrasePracticed: state.phrasePracticed || {},
        phraseMistakes: state.phraseMistakes || {},
        phraseProgressVersion: PHRASE_PROGRESS_VERSION,
        phraseProductionProgress: state.phraseProductionProgress || {},
        phraseMastery: state.phraseMastery || {},
        phraseListeningMastery: state.phraseListeningMastery || {},
        phraseMatchingMastery: state.phraseMatchingMastery || {},
        trainRound: state.trainRound || 0,
        trainLastWords: state.trainLastWords || [],
        trainLastQuestionKey: state.trainLastQuestionKey || null,
        visited: state.visited,
        heard: state.heard || {},
        discovered: state.discovered,
        earned: state.earned,
        eligible: state.eligible,
        attempts: state.attempts,
        worldFacts: state.worldFacts || {},
        knowledge: state.knowledge || {},
        debug: state.debug,
      }

    case 'RETURN_TO_WORLD':
      // finished a good OR secret ending: don't restart — drop straight back into
      // the open world and keep the whole run going (words, tokens, items, hearts).
      // Only a BAD ending restarts from the beginning. The arc you just closed is
      // done; you carry on exploring from the hub.
      if (!['good', 'secret'].includes(state.ended)) return state
      if (state.embodying && !isEmbodimentEnding(state.embodying, state.nodeId)) return state
      if (STORY[state.nodeId]?.end !== state.ended && worldEffectsForEnding(state.nodeId).length === 0) return state
      return {
        ...state,
        // Migration-safe: an older save may already be sitting on an ending
        // written before worldFacts existed. Apply its outcome on re-entry too.
        worldFacts: applyWorldEffects(
          state.worldFacts,
          worldEffectsForEnding(state.nodeId),
          state.clock ?? START_CLOCK,
          state.nodeId,
        ),
        nodeId: STORY[STORY[state.nodeId]?.returnTo] ? STORY[state.nodeId].returnTo : WORLD_HUB,
        cameFrom: null,
        cameFromPhase: null,
        familiar: !!state.visited[STORY[STORY[state.nodeId]?.returnTo] ? STORY[state.nodeId].returnTo : WORLD_HUB],
        rumor: false,
        trail: [], // fresh footing on re-entry — nowhere is "just behind you" (see BACKTRACK)
        inventory: state.embodying && state.embodimentInventorySnapshot
          ? { ...state.embodimentInventorySnapshot }
          : state.inventory,
        flags: state.embodying && state.embodimentFlagsSnapshot
          ? { ...state.embodimentFlagsSnapshot }
          : state.flags,
        hearts: state.embodying && Number.isInteger(state.embodimentHeartsSnapshot)
          ? Math.max(0, Math.min(START_HEARTS, state.embodimentHeartsSnapshot))
          : state.hearts,
        embodying: null,
        embodimentOriginNode: null,
        embodimentFocusNode: null,
        embodimentWorldNode: null,
        embodimentPaused: false,
        embodimentClock: null,
        embodimentInventorySnapshot: null,
        embodimentInventoryIsolated: null,
        embodimentFlagsSnapshot: null,
        embodimentHeartsSnapshot: null,
        embodimentArrivalSnapshot: null,
        pendingEmbodiment: null,
        ended: null,
        practiceTarget: null,
      }

    case 'RESET':
      // hard new run (top-right button or game over): back to the start with
      // everything undiscovered; keep learned progress, achievements, and the
      // lasting physical consequences of tales already completed.
      if (state.embodying && state.hearts > 0) return state
      return {
        ...baseRun(),
        mana: state.mana,
        practiced: state.practiced,
        formPracticed: state.formPracticed || {},
        phrasePracticed: state.phrasePracticed || {},
        phraseMistakes: state.phraseMistakes || {},
        phraseProgressVersion: PHRASE_PROGRESS_VERSION,
        phraseProductionProgress: state.phraseProductionProgress || {},
        phraseMastery: state.phraseMastery || {},
        phraseListeningMastery: state.phraseListeningMastery || {},
        phraseMatchingMastery: state.phraseMatchingMastery || {},
        trainRound: state.trainRound || 0,
        trainLastWords: state.trainLastWords || [],
        trainLastQuestionKey: state.trainLastQuestionKey || null,
        visited: state.visited,
        heard: state.heard || {},
        earned: state.earned,
        eligible: state.eligible,
        attempts: state.attempts,
        worldFacts: state.worldFacts || {},
        knowledge: state.knowledge || {},
        debug: state.debug,
      }

    default:
      return state
  }
}
