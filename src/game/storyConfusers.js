import {
  HEART_LEVELS,
  ITEMS,
  STORY,
  itemConfuserActionOf,
  w,
} from './content.js'
import { storyConfuserConsequence } from './consequenceBuilders.js'
import { albanianTextOf } from './language.js'

// Generated item confusers may enter play only after their exact continuous
// phrase recording and waveform-correlated timing have been certified. There
// are currently no certified generated surfaces, so the old runtime-built
// "drink/fight this item" traps fail closed instead of presenting an action
// that the accepted-action audio contract cannot fulfil.
export const CERTIFIED_DYNAMIC_ITEM_CONFUSER_ITEM_IDS = Object.freeze([])

const phraseKey = (tokens) => (tokens || []).map((token) => token.id || token.en).join(' ')
const lineDiscovered = (state, line) =>
  (line || []).every((token) => !token.id || state.discovered?.[token.id])

function dynamicItemConfuser(itemId, items = ITEMS) {
  const item = items[itemId]
  if (!item || item.companion || item.currency) return null
  const action = itemConfuserActionOf(item)
  const tokens = [w(action === 'fight' ? 'lufto' : 'pi'), w(item.word || itemId)]
  return {
    key: 'dyn-0',
    kind: 'dynamic-item',
    itemId,
    action,
    tokens,
  }
}

function authoredConfusers(node) {
  return (node?.options || []).flatMap((option, optionIndex) => {
    if (!option.confuser) return []
    const correctGreeting = option.contextGreeting && node.options.find((candidate) =>
      candidate.contextGreeting?.challengeId === option.contextGreeting.challengeId &&
      candidate.contextGreeting?.period === option.contextGreeting.period &&
      candidate.contextGreeting?.correct,
    )
    return [{
      key: `opt-${optionIndex}`,
      kind: 'authored',
      option,
      optionIndex,
      tokens: option.text,
      correctGreeting,
    }]
  })
}

function dynamicConfusersForState(state, node, items, heartLevels) {
  const certified = new Set(CERTIFIED_DYNAMIC_ITEM_CONFUSER_ITEM_IDS)
  const itemIds = Object.keys(state.inventory || {}).filter((id) =>
    state.inventory[id] > 0 && certified.has(id) &&
    items[id] && !items[id].companion && !items[id].currency,
  )
  if (itemIds.length === 0) return []

  const hash = [...state.nodeId].reduce((total, character) => total + character.charCodeAt(0), 0)
  const candidate = dynamicItemConfuser(itemIds[hash % itemIds.length], items)
  if (!candidate) return []

  const seen = new Set((node.options || []).map((option) => phraseKey(option.text)))
  for (const id of Object.keys(state.inventory || {})) {
    if (state.inventory[id] > 0 && items[id]?.use?.phrase) seen.add(phraseKey(items[id].use.phrase))
  }
  const heartLevel = heartLevels[state.hearts]
  const healRevealed = !state.embodying && heartLevel?.heal &&
    !state.healedAt?.[state.hearts] && lineDiscovered(state, heartLevel.line)
  if (healRevealed) seen.add(phraseKey(heartLevel.heal.phrase))
  return seen.has(phraseKey(candidate.tokens)) ? [] : [candidate]
}

export function storyConfuserCandidates(state, {
  story = STORY,
  items = ITEMS,
  heartLevels = HEART_LEVELS,
} = {}) {
  if (!state || state.embodying || state.ended || state.timePassage ||
      state.pendingEmbodiment || state.hearts <= 0) return []
  const node = story[state?.nodeId]
  if (!node) return []
  return [
    ...authoredConfusers(node),
    ...dynamicConfusersForState(state, node, items, heartLevels),
  ]
}

export function canonicalStoryConfuser(state, action) {
  if (typeof action?.optionId !== 'string') return null
  return storyConfuserCandidates(state).find((candidate) =>
    candidate.key === action.optionId &&
    (candidate.kind === 'authored'
      ? action.optionIndex === candidate.optionIndex
      : action.optionIndex == null),
  ) || null
}

export function consequenceForStoryConfuser(state, candidate) {
  const runSequence = Number.isSafeInteger(state.storyRunSequence) && state.storyRunSequence > 0
    ? state.storyRunSequence
    : 1
  const actionSequence = (Number.isSafeInteger(state.actionSpeechSequence) &&
    state.actionSpeechSequence >= 0 ? state.actionSpeechSequence : 0) + 1
  return storyConfuserConsequence({
    nodeId: state.nodeId,
    turn: state.turn,
    key: candidate.key,
    attemptId: `run-${runSequence}:action-${actionSequence}`,
    tokens: candidate.tokens,
    english: candidate.tokens?.optionReading || candidate.tokens?.reading,
    greeting: candidate.option?.contextGreeting,
    correctGreeting: candidate.correctGreeting,
    dynamicItem: candidate.kind === 'dynamic-item',
  })
}

export function certifiedDynamicItemConfuserSurfaces({ items = ITEMS } = {}) {
  return CERTIFIED_DYNAMIC_ITEM_CONFUSER_ITEM_IDS.map((itemId) => {
    const candidate = dynamicItemConfuser(itemId, items)
    if (!candidate) throw new Error(`Invalid certified dynamic item confuser: ${itemId}`)
    return albanianTextOf(candidate.tokens)
  })
}
