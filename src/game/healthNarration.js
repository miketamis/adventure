// Health is story context, not a permanent HUD row. The opening establishes
// the traveller's condition once; later full-health prose returns only after a
// heart-count change. Wounded states remain visible because their warning and
// remedy are active, player-relevant information.

export const HEALTH_NARRATION_STATE_VERSION = 1

const safeHearts = (value) => Number.isSafeInteger(value) && value >= 0 ? value : null

export function normalizeHealthNarrationState(value) {
  if (value?.version !== HEALTH_NARRATION_STATE_VERSION) {
    return { version: HEALTH_NARRATION_STATE_VERSION, communicatedHearts: null, active: null }
  }
  const communicatedHearts = safeHearts(value.communicatedHearts)
  const activeHearts = safeHearts(value.active?.hearts)
  const active = typeof value.active?.nodeId === 'string' && value.active.nodeId &&
    Number.isSafeInteger(value.active?.turn) && value.active.turn >= 1 && activeHearts != null
    ? {
        nodeId: value.active.nodeId,
        turn: value.active.turn,
        hearts: activeHearts,
        keepVisible: value.active.keepVisible === true,
        visible: value.active.visible === true,
      }
    : null
  return { version: HEALTH_NARRATION_STATE_VERSION, communicatedHearts, active }
}

export function planHealthNarration(hearts, value, {
  nodeId,
  turn,
  keepVisible = false,
} = {}) {
  const currentHearts = safeHearts(hearts)
  const state = normalizeHealthNarrationState(value)
  const persistent = keepVisible === true
  if (currentHearts == null) {
    return { visible: false, needsCommit: false, nextState: state }
  }
  if (state.active?.nodeId === nodeId && state.active.turn === turn &&
      state.active.hearts === currentHearts && state.active.keepVisible === persistent) {
    return { visible: state.active.visible, needsCommit: false, nextState: state }
  }

  const visible = state.communicatedHearts !== currentHearts || persistent
  const nextState = {
    version: HEALTH_NARRATION_STATE_VERSION,
    communicatedHearts: currentHearts,
    active: { nodeId, turn, hearts: currentHearts, keepVisible: persistent, visible },
  }
  return { visible, needsCommit: true, nextState }
}
