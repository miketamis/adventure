import { START_NODE, STORY, WORLD_HUB, frequentForms } from './content.js'
import { AREA_FACTOIDS } from './folklore.js'
import { REGION_NODES } from './regions.js'

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
export const NIGHT_START = 15 // every run begins benighted (the authored opening)
export function phaseAtClock(clock) {
  const h = ((clock % 24) + 24) % 24
  return h < 3 ? 'dawn' : h < 12 ? 'day' : h < 15 ? 'dusk' : 'night'
}
export const timeOfDay = (state) => phaseAtClock(state.clock ?? NIGHT_START)
export const isTimeId = (id) => TIME_PHASES.includes(id)
// one truth for "does the player have X right now" — item, companion, or hour
export const hasCond = (state, id) =>
  isTimeId(id) ? timeOfDay(state) === id : (state.inventory[id] || 0) > 0
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
    discovered: {}, // senseId -> true
    inventory: {}, // itemId -> count (you start with nothing)
    peak: PEAK_START_TURNS, // story turns of "peak" remaining (hover -> English)
    hearts: START_HEARTS, // wrong training answers cost a heart; 0 = game over
    turn: 1,
    clock: NIGHT_START, // hour of the world-day (see TIME OF DAY above)
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

export const canChoose = (state, option) =>
  canSpeak(state, option.text).ok && hasRequiredItem(state, option)

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
      const discoveredEndings = targetNode?.end
        ? { ...state.discoveredEndings, [option.to]: true }
        : state.discoveredEndings
      // Earning a FACTOID (a good/secret "ending" — now a lore achievement)
      // restores all hearts. A bad ending (game over) does NOT.
      const isFactoid = targetNode?.end === 'good' || targetNode?.end === 'secret'
      // Track where you've been (persistent) and, unless you've just hit an
      // ending screen, see if exploring a region has made an area factoid ready.
      const visited = { ...state.visited, [option.to]: true }
      const pendingFactoid = targetNode?.end
        ? state.pendingFactoid
        : state.pendingFactoid || readyAreaFactoid(visited, discoveredEndings)
      // the hour drifts with every choice; resting/waiting jumps it forward
      let clock = (state.clock ?? NIGHT_START) + 1
      if (option.time) clock = advanceToPhase(clock, option.time)
      return {
        ...state,
        mana: spend(state.mana, ids),
        inventory,
        discoveredEndings,
        visited,
        pendingFactoid,
        hearts: isFactoid ? START_HEARTS : state.hearts,
        nodeId: option.to,
        peak: Math.max(0, state.peak - 1),
        turn: state.turn + 1,
        clock,
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

    // Skip to the start of the next time-of-day phase (the 🛠 time chip).
    case 'DEBUG_TIME': {
      let clock = (state.clock ?? NIGHT_START) + 1
      while (phaseAtClock(clock) === timeOfDay(state)) clock++
      return { ...state, clock }
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
