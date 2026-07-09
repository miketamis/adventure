import { START_NODE, STORY, WORLD_HUB, frequentForms } from './content.js'
import { AREA_FACTOIDS } from './folklore.js'
import { REGION_NODES } from './regions.js'
import { NPCS } from './npcs.js'

// An AREA FACTOID becomes available once you've VISITED at least `threshold` of
// its region's nodes and haven't earned it yet — returns the first such id (to
// offer its comprehension test), or null.
function readyAreaFactoid(visited, earned) {
  for (const f of AREA_FACTOIDS) {
    if (earned[f.id]) continue
    const nodes = REGION_NODES[f.region] || []
    if (!nodes.length) continue
    let seen = 0
    for (const id of nodes) if (visited[id]) seen++
    if (seen / nodes.length >= (f.threshold ?? 0.6)) return f.id
  }
  return null
}

export const PEAK_START_TURNS = 3
export const START_HEARTS = 3

// ---------------------------------------------------------------------------
// TIME OF DAY — a 24-"hour" day: dawn 0-2, day 3-11, dusk 12-14, night 15-23.
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
export function phaseAtClock(clock) {
  const h = ((clock % 24) + 24) % 24
  return h < 3 ? 'dawn' : h < 12 ? 'day' : h < 15 ? 'dusk' : 'night'
}
export const timeOfDay = (state) => phaseAtClock(state.clock ?? START_CLOCK)
export const isTimeId = (id) => TIME_PHASES.includes(id)

// ---------------------------------------------------------------------------
// THE CAMPFIRE — persistent WORLD state, not an item: the clearing keeps its
// fire between visits. An option with `fire: true` lights it, stamping the
// hour; it then burns down as the clock walks on — big for FIRE_BIG_HOURS,
// dying until FIRE_OUT_HOURS, then out (cold ash) until relit. The fire states
// are VIRTUAL ITEMS like the time phases: 'fireBig', 'fireLow', 'fireOut' and
// 'fireLive' (big or dying) all work in requires/unless/when().
// ---------------------------------------------------------------------------
export const FIRE_BIG_HOURS = 4
export const FIRE_OUT_HOURS = 8
const FIRE_IDS = new Set(['fireBig', 'fireLow', 'fireOut', 'fireLive'])
export const isFireId = (id) => FIRE_IDS.has(id)
// null = never lit (no fire, no ash); otherwise the current phase of the burn
export function fireStateOf(state) {
  if (state.fireLit == null) return null
  const age = (state.clock ?? START_CLOCK) - state.fireLit
  return age < FIRE_BIG_HOURS ? 'fireBig' : age < FIRE_OUT_HOURS ? 'fireLow' : 'fireOut'
}
// ---------------------------------------------------------------------------
// NPC ROUTES — walking people (see npcs.js). Position is DERIVED from the
// clock, campfire-style, never stored: a looping NPC is at
// route[floor(clock / stepHours) % length] whenever the hour falls in their
// activePhases; a `once` NPC starts when a node with `startsNpc` stamps
// state.npcStarted[id] and is gone past the route's end. Presence feeds two
// virtual items: `npc:<id>` (standing where you stand) and `npcAt:<id>:<node>`
// (visible at a named node — off-scene sightlines, accepts a|b alternatives).
// ---------------------------------------------------------------------------
export const isNpcId = (id) =>
  typeof id === 'string' && (id.startsWith('npc:') || id.startsWith('npcAt:'))
// the node an NPC stands at right now, or null (offstage / not started / gone)
export function npcNodeOf(state, npcId) {
  const npc = NPCS[npcId]
  if (!npc) return null
  const clock = state.clock ?? START_CLOCK
  if (npc.activePhases && !npc.activePhases.includes(phaseAtClock(clock))) return null
  const step = npc.stepHours || 2
  if (npc.once) {
    const started = state.npcStarted?.[npcId]
    if (started == null || clock < started) return null
    const i = Math.floor((clock - started) / step)
    return i < npc.route.length ? npc.route[i] : null
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
export const isFromId = (id) => typeof id === 'string' && id.startsWith('from:')
export const isBecameId = (id) => typeof id === 'string' && id.startsWith('became:')
// one truth for "does the player have X right now" — item, companion, hour,
// fire, or the way they came in
export const hasCond = (state, id) => {
  if (isTimeId(id)) return timeOfDay(state) === id
  if (isFireId(id)) {
    const f = fireStateOf(state)
    return id === 'fireLive' ? f === 'fireBig' || f === 'fireLow' : f === id
  }
  // `litFire` is the fire-lighting counterpart of became(): true only on the
  // turn the campfire was struck — the fire option stamps `fireLit` to the new
  // clock, so it equals `clock` this turn only and drifts behind on the next,
  // making the "you light the fire" line an event that fades once you act again.
  if (id === 'litFire') return state.fireLit != null && state.fireLit === (state.clock ?? START_CLOCK)
  if (isFromId(id)) return id.slice(5).split('|').includes(state.cameFrom)
  if (isBecameId(id))
    return (
      state.cameFromPhase != null &&
      state.cameFromPhase !== timeOfDay(state) &&
      id.slice(7).split('|').includes(timeOfDay(state))
    )
  if (isNpcId(id)) return npcCond(state, id)
  return (state.inventory[id] || 0) > 0
}
// the next hour (at or after `clock`) that falls inside `phase`
export function advanceToPhase(clock, phase) {
  if (!isTimeId(phase)) return clock
  while (phaseAtClock(clock) !== phase) clock++
  return clock
}

// How many correct practices of a word before its "endings" drill unlocks. `mana`
// is spent on story choices, so a separate monotonic `practiced` counter tracks it.
export const FORMS_UNLOCK_THRESHOLD = 3
// A word enters endings mode once it's been practiced enough AND it has a forms
// table with at least two frequently-used forms (so step 2 is never a one-option
// question). The lemma row always counts, so ≥2 means ≥1 real inflected form.
export const formsUnlocked = (state, id) =>
  (state.practiced?.[id] || 0) >= FORMS_UNLOCK_THRESHOLD && frequentForms(id).length >= 2

// ---------------------------------------------------------------------------
// Persistence: the WHOLE game state is saved to localStorage on every change,
// so reloading the page resumes you exactly where you left off. The discovered-
// endings collection is also kept under its own key so it survives even if the
// run state is ever cleared or its shape changes.
// ---------------------------------------------------------------------------
const ENDINGS_KEY = 'aventura.endings.v1'
const STATE_KEY = 'aventura.state.v1'

export function loadEndings() {
  try {
    return JSON.parse(localStorage.getItem(ENDINGS_KEY)) || {}
  } catch {
    return {}
  }
}
export function saveEndings(endings) {
  try {
    localStorage.setItem(ENDINGS_KEY, JSON.stringify(endings))
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
// the saved run if it's still valid, otherwise a fresh run
export function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STATE_KEY))
    if (saved && saved.nodeId && STORY[saved.nodeId]) {
      // merge over a fresh run so any newly-added fields get sensible defaults
      return { ...newRun(), ...saved }
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
    discovered: {}, // senseId -> true
    inventory: {}, // itemId -> count (you start with nothing)
    peak: PEAK_START_TURNS, // story turns of "peak" remaining (hover -> English)
    hearts: START_HEARTS, // wrong training answers cost a heart; 0 = game over
    turn: 1,
    clock: START_CLOCK, // hour of the world-day (see TIME OF DAY above)
    fireLit: null, // hour the clearing's campfire was last lit (see THE CAMPFIRE above)
    npcStarted: {}, // npcId -> hour a one-shot NPC route was triggered (see NPC ROUTES above)
    view: 'story', // 'story' | 'practice' | 'dictionary' | 'endings'
    ended: null, // null | 'good' | 'bad' | 'secret'
    pendingFactoid: null, // id of an area factoid ready for its comprehension test
  }
}

// the initial state when the app boots
export function newRun() {
  // `mana` and `practiced` live OUTSIDE baseRun(): they are long-term learning
  // progress that carries across runs (unlike per-run state, which resets).
  return { ...baseRun(), mana: {}, practiced: {}, visited: {}, discoveredEndings: loadEndings(), debug: false, loreFocus: null }
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
export const hasRequiredItem = (state, option) =>
  condList(option.requires).every((id) => hasCond(state, id)) &&
  condList(option.unless).every((id) => !hasCond(state, id))

// ---------------------------------------------------------------------------
// LEK — the in-world money (the 🪙 count in `inventory.lek`). An option carries
// `lek: <n>`: positive is a payment TO you (work, a sale), negative a price you
// pay. A priced option stays VISIBLE when you can't afford it (the price is part
// of learning the scene) but can't be taken — see canChoose/StoryView.
// ---------------------------------------------------------------------------
export const lekOf = (state) => state.inventory.lek || 0
export const canAfford = (state, option) => (option.lek ?? 0) >= 0 || lekOf(state) >= -option.lek

// RETREAT — an option that walks you back where you just came from (its `to`
// is state.cameFrom). The way you came is never gated: StoryView skips its
// reveal-hiding, and it costs no tokens here. `free: true` hand-authors the
// same treatment for a path that should be a free retreat whichever way you
// arrived (the fshatiLumi -> start bridge crossing).
export const isRetreat = (state, option) => option.to != null && option.to === state.cameFrom

// a token-free option (`free: true`, or backtracking to cameFrom) needs its
// words DISCOVERED but neither requires nor spends tokens — retreat is never
// token-locked
export const canChoose = (state, option) => {
  const sp = canSpeak(state, option.text)
  const noTokens = option.free || isRetreat(state, option)
  return (noTokens ? sp.allDiscovered : sp.ok) && hasRequiredItem(state, option) && canAfford(state, option)
}

export const canUseItem = (state, item) => canSpeak(state, item.use.phrase)

function spend(mana, ids) {
  const next = { ...mana }
  for (const id of ids) next[id] = (next[id] || 0) - 1
  return next
}

export function reducer(state, action) {
  switch (action.type) {
    case 'DISCOVER': {
      if (state.discovered[action.id]) return state
      return { ...state, discovered: { ...state.discovered, [action.id]: true } }
    }

    case 'CHOOSE': {
      const { option, targetNode } = action
      if (!canChoose(state, option)) return state
      const { ids } = canSpeak(state, option.text)
      const inventory = { ...state.inventory }
      if (option.consumes) inventory[option.consumes] = (inventory[option.consumes] || 0) - 1
      if (option.grant) inventory[option.grant] = (inventory[option.grant] || 0) + 1
      // money changes hands: earn (+n) or pay (−n, never below zero)
      if (option.lek) inventory.lek = Math.max(0, (inventory.lek || 0) + option.lek)
      // A BAD ending is recorded at once (a fate met is met). A good/secret
      // ending is a FACTOID: reaching it only OFFERS the comprehension test —
      // the codex entry and the heart-restore come from EARN_FACTOID, dispatched
      // by StoryView only when EVERY question is answered correctly. Fail the
      // test and the tale slips away: nothing recorded, walk the path again.
      const discoveredEndings = targetNode?.end === 'bad'
        ? { ...state.discoveredEndings, [option.to]: true }
        : state.discoveredEndings
      // Track where you've been (persistent) and, unless you've just hit an
      // ending screen, see if exploring a region has made an area factoid ready.
      const visited = { ...state.visited, [option.to]: true }
      const pendingFactoid = targetNode?.end
        ? state.pendingFactoid
        : state.pendingFactoid || readyAreaFactoid(visited, discoveredEndings)
      // the hour drifts with every choice; resting/waiting jumps it forward
      let clock = (state.clock ?? START_CLOCK) + 1
      if (option.time) clock = advanceToPhase(clock, option.time)
      // lighting the campfire stamps the hour — from here it burns down on its own
      const fireLit = option.fire ? clock : state.fireLit ?? null
      // entering a node with `startsNpc` sets a one-shot NPC walking (once per
      // run — a procession that already passed does not pass again)
      const npcStarted = targetNode?.startsNpc && state.npcStarted?.[targetNode.startsNpc] == null
        ? { ...state.npcStarted, [targetNode.startsNpc]: clock }
        : state.npcStarted
      // an option may restore hearts (a paid bed, the healer's herbs); a factoid
      // ending restores to full only via EARN_FACTOID (the passed test)
      let hearts = state.hearts
      if (option.hearts) hearts = Math.min(START_HEARTS, hearts + option.hearts)
      return {
        ...state,
        mana: option.free || isRetreat(state, option) ? state.mana : spend(state.mana, ids),
        inventory,
        discoveredEndings,
        visited,
        pendingFactoid,
        hearts,
        nodeId: option.to,
        cameFrom: state.nodeId,
        cameFromPhase: timeOfDay(state),
        peak: Math.max(0, state.peak - 1),
        turn: state.turn + 1,
        clock,
        fireLit,
        npcStarted,
        ended: targetNode?.end || null,
      }
    }

    case 'USE_ITEM': {
      const { item } = action
      if ((state.inventory[item.id] || 0) <= 0) return state
      if (!item.use || !canUseItem(state, item).ok) return state
      const { ids } = canSpeak(state, item.use.phrase)
      const inventory = { ...state.inventory, [item.id]: state.inventory[item.id] - 1 }
      let peak = state.peak
      let hearts = state.hearts
      if (item.use.effect?.peakTurns) peak += item.use.effect.peakTurns
      if (item.use.effect?.hearts) hearts = Math.min(START_HEARTS, hearts + item.use.effect.hearts)
      return { ...state, mana: spend(state.mana, ids), inventory, peak, hearts }
    }

    case 'PRACTICE_CORRECT':
      return {
        ...state,
        mana: { ...state.mana, [action.id]: (state.mana[action.id] || 0) + 1 },
        // monotonic (never spent) — this is what unlocks a word's endings drill
        practiced: { ...state.practiced, [action.id]: (state.practiced?.[action.id] || 0) + 1 },
      }

    case 'PRACTICE_WRONG':
      return { ...state, hearts: Math.max(0, state.hearts - 1) }

    case 'CONFUSE':
      // picked an option that can't happen in this part of the story
      return { ...state, hearts: Math.max(0, state.hearts - 1) }

    case 'COMP_WRONG':
      // missed a comprehension question at a factoid test — costs a heart, and
      // run out (hearts→0) and the run is over. You still EARN the tale if you
      // survive the test, so a single misclick just stings; guessing kills.
      return { ...state, hearts: Math.max(0, state.hearts - 1) }

    case 'SET_VIEW':
      return { ...state, view: action.view }

    // --- DEBUG MODE (unlocked by clicking the title 5×) ---------------------
    case 'TOGGLE_DEBUG':
      return { ...state, debug: !state.debug }

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

    // Skip to the start of the next time-of-day phase (the 🛠 time chip).
    // Stamps cameFromPhase like a real choice would, so became() transition
    // lines are previewable from the debug chip.
    case 'DEBUG_TIME': {
      let clock = (state.clock ?? START_CLOCK) + 1
      while (phaseAtClock(clock) === timeOfDay(state)) clock++
      return { ...state, clock, cameFromPhase: timeOfDay(state) }
    }

    // Jump to the folklore library focused on a tale (from an ending's link).
    case 'OPEN_LORE':
      return { ...state, view: 'debug', loreFocus: action.lore }

    // Passed an AREA factoid's comprehension test: earn it (recorded alongside
    // the ending factoids), restore all hearts, and clear the pending offer.
    case 'EARN_FACTOID':
      return {
        ...state,
        discoveredEndings: { ...state.discoveredEndings, [action.id]: true },
        hearts: START_HEARTS,
        pendingFactoid: null,
      }

    // Dismissed the "take the test" banner for now (it may re-offer as you explore).
    case 'DISMISS_FACTOID':
      return { ...state, pendingFactoid: null }

    case 'CONTINUE':
      // finished an ending: play again, but KEEP what you've learned — your
      // discovered words AND tokens carry over (only the run itself restarts)
      return {
        ...baseRun(),
        mana: state.mana,
        practiced: state.practiced,
        visited: state.visited,
        discovered: state.discovered,
        discoveredEndings: state.discoveredEndings,
        debug: state.debug,
      }

    case 'RETURN_TO_WORLD':
      // finished a good OR secret ending: don't restart — drop straight back into
      // the open world and keep the whole run going (words, tokens, items, hearts).
      // Only a BAD ending restarts from the beginning. The arc you just closed is
      // done; you carry on exploring from the hub.
      return {
        ...state,
        nodeId: STORY[action.to] ? action.to : WORLD_HUB,
        cameFrom: null,
        cameFromPhase: null,
        ended: null,
      }

    case 'RESET':
      // hard new run (top-right button or game over): back to the start with
      // everything undiscovered; keep only your tokens and endings collection
      return { ...baseRun(), mana: state.mana, practiced: state.practiced, visited: state.visited, discoveredEndings: state.discoveredEndings, debug: state.debug }

    default:
      return state
  }
}
