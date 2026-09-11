// The pack and purse are canonical game state, but they are not a permanent
// HUD. This ledger remembers which holdings the story has already established
// so ordinary movement stays quiet. A new/lost holding is narrated once; a
// held object can remain visible only while the current scene gives it a real
// action. The active presentation is frozen for its scene/turn so React
// rerenders cannot make a just-presented transition disappear.

export const INVENTORY_NARRATION_STATE_VERSION = 1

const safeId = (id) => typeof id === 'string' && id.length > 0 && id.trim() === id &&
  !['__proto__', 'prototype', 'constructor'].includes(id)

const safeCount = (value) => Number.isSafeInteger(value) && value > 0 ? value : 0

const countRecord = (value) => Object.fromEntries(
  Object.entries(value && typeof value === 'object' && !Array.isArray(value) ? value : {})
    .filter(([id, count]) => safeId(id) && safeCount(count) > 0)
    .map(([id, count]) => [id, safeCount(count)]),
)

const cleanIds = (value) => [...new Set(Array.isArray(value) ? value : [])]
  .filter(safeId)
  .sort()

const cleanSnapshot = (value) => ({
  lek: safeCount(value?.lek),
  items: countRecord(value?.items),
  companions: countRecord(value?.companions),
})

const sameRecord = (left, right) => {
  const leftEntries = Object.entries(left || {}).sort(([a], [b]) => a.localeCompare(b))
  const rightEntries = Object.entries(right || {}).sort(([a], [b]) => a.localeCompare(b))
  return leftEntries.length === rightEntries.length && leftEntries.every(
    ([id, count], index) => id === rightEntries[index]?.[0] && count === rightEntries[index]?.[1],
  )
}

const sameSnapshot = (left, right) => left?.lek === right?.lek &&
  sameRecord(left?.items, right?.items) && sameRecord(left?.companions, right?.companions)

const sameIds = (left, right) => left.length === right.length &&
  left.every((id, index) => id === right[index])

export function inventoryNarrationSnapshot(inventory = {}, catalog = {}) {
  const snapshot = { lek: safeCount(inventory.lek), items: {}, companions: {} }
  for (const [id, rawCount] of Object.entries(inventory || {})) {
    const count = safeCount(rawCount)
    const item = catalog[id]
    if (!count || !item || item.currency) continue
    if (item.companion) snapshot.companions[id] = count
    else snapshot.items[id] = count
  }
  return cleanSnapshot(snapshot)
}

export function normalizeInventoryNarrationState(value) {
  if (value?.version !== INVENTORY_NARRATION_STATE_VERSION) {
    return { version: INVENTORY_NARRATION_STATE_VERSION, communicated: null, active: null }
  }
  const communicated = value.communicated == null ? null : cleanSnapshot(value.communicated)
  const activeSnapshot = cleanSnapshot(value.active?.snapshot)
  const active = typeof value.active?.nodeId === 'string' && value.active.nodeId &&
    Number.isSafeInteger(value.active?.turn) && value.active.turn >= 1
    ? {
        nodeId: value.active.nodeId,
        turn: value.active.turn,
        snapshot: activeSnapshot,
        actionableItemIds: cleanIds(value.active.actionableItemIds),
        actionableCompanionIds: cleanIds(value.active.actionableCompanionIds),
        transaction: value.active.transaction === true,
        showPurse: value.active.showPurse === true,
        presentItemIds: cleanIds(value.active.presentItemIds),
        removedItemIds: cleanIds(value.active.removedItemIds),
        presentCompanionIds: cleanIds(value.active.presentCompanionIds),
        removedCompanionIds: cleanIds(value.active.removedCompanionIds),
      }
    : null
  return { version: INVENTORY_NARRATION_STATE_VERSION, communicated, active }
}

const changedIds = (previous, current, predicate) => [...new Set([
  ...Object.keys(previous || {}),
  ...Object.keys(current || {}),
])].filter((id) => predicate(safeCount(previous?.[id]), safeCount(current?.[id]))).sort()

export function planInventoryNarration(snapshotValue, value, {
  nodeId,
  turn,
  actionableItemIds = [],
  actionableCompanionIds = [],
  transaction = false,
} = {}) {
  const snapshot = cleanSnapshot(snapshotValue)
  const state = normalizeInventoryNarrationState(value)
  const actionableItems = cleanIds(actionableItemIds)
    .filter((id) => snapshot.items[id] > 0)
  const actionableCompanions = cleanIds(actionableCompanionIds)
    .filter((id) => snapshot.companions[id] > 0)
  const isTransaction = transaction === true

  if (state.active?.nodeId === nodeId && state.active.turn === turn &&
      sameSnapshot(state.active.snapshot, snapshot) &&
      sameIds(state.active.actionableItemIds, actionableItems) &&
      sameIds(state.active.actionableCompanionIds, actionableCompanions) &&
      state.active.transaction === isTransaction) {
    return { ...state.active, needsCommit: false, nextState: state }
  }

  // `null` means the player has never been told what is in this run's pack.
  // The first presentation therefore establishes positive holdings, while an
  // empty opening remains silent instead of saying “you have nothing”.
  const previous = state.communicated || { lek: 0, items: {}, companions: {} }
  const acquiredItems = changedIds(previous.items, snapshot.items, (before, after) => after > before)
  const removedItemIds = changedIds(previous.items, snapshot.items, (before, after) => before > 0 && after < before)
  const acquiredCompanions = changedIds(previous.companions, snapshot.companions, (before, after) => after > before)
  const removedCompanionIds = changedIds(previous.companions, snapshot.companions, (before, after) => before > 0 && after < before)
  const presentItemIds = cleanIds([...acquiredItems, ...actionableItems])
  const presentCompanionIds = cleanIds([...acquiredCompanions, ...actionableCompanions])
  const showPurse = isTransaction || snapshot.lek !== previous.lek
    ? isTransaction || snapshot.lek > 0 || previous.lek > 0
    : false
  const active = {
    nodeId,
    turn,
    snapshot,
    actionableItemIds: actionableItems,
    actionableCompanionIds: actionableCompanions,
    transaction: isTransaction,
    showPurse,
    presentItemIds,
    removedItemIds,
    presentCompanionIds,
    removedCompanionIds,
  }
  const nextState = {
    version: INVENTORY_NARRATION_STATE_VERSION,
    communicated: snapshot,
    active,
  }
  return { ...active, needsCommit: true, nextState }
}
