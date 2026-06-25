import { START_NODE } from './content.js'

export const PEAK_START_TURNS = 3
export const START_HEARTS = 3

// A fresh run — roguelike: every new game starts from zero.
export function newRun() {
  return {
    nodeId: START_NODE,
    discovered: {},   // senseId -> true
    mana: {},         // senseId -> count (spent to choose options / use items)
    inventory: {},    // itemId -> count (you start with nothing)
    peak: PEAK_START_TURNS, // story turns of "peak" remaining (hover -> English)
    hearts: START_HEARTS,   // wrong training answers cost a heart; 0 = game over
    turn: 1,
    view: 'story',    // 'story' | 'practice' | 'inventory'
    ended: null,      // null | 'good' | 'bad'
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

export const canChoose = (state, option) => canSpeak(state, option.text)
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
      const { ids, ok } = canChoose(state, option)
      if (!ok) return state
      const inventory = { ...state.inventory }
      if (option.grant) inventory[option.grant] = (inventory[option.grant] || 0) + 1
      return {
        ...state,
        mana: spend(state.mana, ids),
        inventory,
        nodeId: option.to,
        peak: Math.max(0, state.peak - 1),
        turn: state.turn + 1,
        ended: targetNode?.end || null,
      }
    }

    case 'USE_ITEM': {
      const { item } = action
      if ((state.inventory[item.id] || 0) <= 0) return state
      const { ids, ok } = canUseItem(state, item)
      if (!ok) return state
      const inventory = { ...state.inventory, [item.id]: state.inventory[item.id] - 1 }
      let peak = state.peak
      if (item.use.effect.peakTurns) peak += item.use.effect.peakTurns
      return { ...state, mana: spend(state.mana, ids), inventory, peak }
    }

    case 'PRACTICE_CORRECT': {
      return {
        ...state,
        mana: { ...state.mana, [action.id]: (state.mana[action.id] || 0) + 1 },
      }
    }

    case 'PRACTICE_WRONG': {
      return { ...state, hearts: Math.max(0, state.hearts - 1) }
    }

    case 'SET_VIEW':
      return { ...state, view: action.view }

    case 'RESET':
      // new run: back to the start, everything undiscovered, but keep your
      // training tokens (they stay unusable until you rediscover the word)
      return { ...newRun(), mana: state.mana }

    default:
      return state
  }
}
