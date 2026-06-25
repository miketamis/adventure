import { START_NODE } from './content.js'

export const PEAK_START_TURNS = 3
export const START_HEARTS = 3

// ---------------------------------------------------------------------------
// Persistence: discovered endings survive across runs AND page reloads — they
// are the player's long-term "collection". Tokens (mana) survive a new run but
// not a reload (a fresh page is a fresh roguelike attempt).
// ---------------------------------------------------------------------------
const ENDINGS_KEY = 'aventura.endings.v1'
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

// per-run state (everything that resets when you start a new attempt)
function baseRun() {
  return {
    nodeId: START_NODE,
    discovered: {}, // senseId -> true
    inventory: {}, // itemId -> count (you start with nothing)
    peak: PEAK_START_TURNS, // story turns of "peak" remaining (hover -> English)
    hearts: START_HEARTS, // wrong training answers cost a heart; 0 = game over
    turn: 1,
    view: 'story', // 'story' | 'practice' | 'dictionary' | 'endings'
    ended: null, // null | 'good' | 'bad' | 'secret'
  }
}

// the initial state when the app boots
export function newRun() {
  return { ...baseRun(), mana: {}, discoveredEndings: loadEndings() }
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

// an option that needs an item only appears once you hold that item
export const hasRequiredItem = (state, option) =>
  !option.requires || (state.inventory[option.requires] || 0) > 0

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
      return {
        ...state,
        mana: spend(state.mana, ids),
        inventory,
        discoveredEndings,
        nodeId: option.to,
        peak: Math.max(0, state.peak - 1),
        turn: state.turn + 1,
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
      }

    case 'PRACTICE_WRONG':
      return { ...state, hearts: Math.max(0, state.hearts - 1) }

    case 'CONFUSE':
      // picked an option that can't happen in this part of the story
      return { ...state, hearts: Math.max(0, state.hearts - 1) }

    case 'SET_VIEW':
      return { ...state, view: action.view }

    case 'CONTINUE':
      // finished an ending: play again, but KEEP what you've learned — your
      // discovered words AND tokens carry over (only the run itself restarts)
      return {
        ...baseRun(),
        mana: state.mana,
        discovered: state.discovered,
        discoveredEndings: state.discoveredEndings,
      }

    case 'RESET':
      // hard new run (top-right button or game over): back to the start with
      // everything undiscovered; keep only your tokens and endings collection
      return { ...baseRun(), mana: state.mana, discoveredEndings: state.discoveredEndings }

    default:
      return state
  }
}
