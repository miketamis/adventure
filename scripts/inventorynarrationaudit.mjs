// Release gate for change-aware pack, purse, and companion narration.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { ITEMS } from '../src/game/content.js'
import {
  newRun,
  normalizeSavedState,
  reducer,
  requiredInventoryIdsForOption,
  resolvedMoneyOutcomeLine,
} from '../src/game/gameState.js'
import { albanianTextOf } from '../src/game/language.js'
import {
  inventoryNarrationSnapshot,
  normalizeInventoryNarrationState,
  planInventoryNarration,
} from '../src/game/inventoryNarration.js'
import {
  companionStoryLine,
  departedCompanionStoryLine,
  heldItemsStoryLine,
  purseStoryLine,
  removedItemsStoryLine,
} from '../src/game/storyContext.js'

const failures = []
const check = (name, fn) => {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (error) {
    failures.push(`${name}: ${error.message}`)
    console.log(`✗ ${name}`)
  }
}

check('the canonical inventory snapshot separates purse, objects, and companions', () => {
  assert.deepEqual(
    inventoryNarrationSnapshot({ lek: 800, buke: 2, ujk: 1, forged: 9, kripe: 0 }, ITEMS),
    { lek: 800, items: { buke: 2 }, companions: { ujk: 1 } },
  )
})

check('opening holdings are established once and unchanged travel stays quiet', () => {
  const snapshot = inventoryNarrationSnapshot({ lek: 800, buke: 1, ujk: 1 }, ITEMS)
  const opening = planInventoryNarration(snapshot, undefined, { nodeId: 'start', turn: 1 })
  assert.equal(opening.showPurse, true)
  assert.deepEqual(opening.presentItemIds, ['buke'])
  assert.deepEqual(opening.presentCompanionIds, ['ujk'])

  const rerender = planInventoryNarration(snapshot, opening.nextState, { nodeId: 'start', turn: 1 })
  assert.equal(rerender.needsCommit, false)
  assert.equal(rerender.showPurse, true)
  assert.deepEqual(rerender.presentItemIds, ['buke'])

  const moved = planInventoryNarration(snapshot, opening.nextState, { nodeId: 'lendina', turn: 2 })
  assert.equal(moved.showPurse, false)
  assert.deepEqual(moved.presentItemIds, [])
  assert.deepEqual(moved.presentCompanionIds, [])

  const loaded = normalizeInventoryNarrationState(JSON.parse(JSON.stringify(moved.nextState)))
  const reloaded = planInventoryNarration(snapshot, loaded, { nodeId: 'lendina', turn: 2 })
  assert.equal(reloaded.needsCommit, false)
  assert.deepEqual(reloaded.presentItemIds, [])
})

check('current affordances retain only the holdings that matter in this scene', () => {
  const snapshot = inventoryNarrationSnapshot({ lek: 800, buke: 1, kripe: 1, ujk: 1 }, ITEMS)
  const established = planInventoryNarration(snapshot, undefined, { nodeId: 'start', turn: 1 })
  const actionable = planInventoryNarration(snapshot, established.nextState, {
    nodeId: 'lendina',
    turn: 2,
    actionableItemIds: ['buke'],
    actionableCompanionIds: ['ujk'],
  })
  assert.equal(actionable.showPurse, false)
  assert.deepEqual(actionable.presentItemIds, ['buke'])
  assert.deepEqual(actionable.presentCompanionIds, ['ujk'])

  const state = { ...newRun(), inventory: { buke: 1, pishtar: 1, cader: 1 } }
  assert.deepEqual([...requiredInventoryIdsForOption(state, { requires: 'buke' })], ['buke'])
  assert.deepEqual([...requiredInventoryIdsForOption(state, { requires: 'itemTag:light-source' })], ['pishtar'])
  assert.deepEqual([...requiredInventoryIdsForOption(state, { requires: 'affords:shelter' })], ['cader'])
})

check('acquisitions, losses, and balance changes surface once', () => {
  const before = inventoryNarrationSnapshot({ lek: 800, buke: 1, ujk: 1 }, ITEMS)
  const established = planInventoryNarration(before, undefined, { nodeId: 'start', turn: 1 })
  const after = inventoryNarrationSnapshot({ lek: 700, kripe: 1 }, ITEMS)
  const changed = planInventoryNarration(after, established.nextState, {
    nodeId: 'tregtari', turn: 2, transaction: true,
  })
  assert.equal(changed.showPurse, true)
  assert.deepEqual(changed.presentItemIds, ['kripe'])
  assert.deepEqual(changed.removedItemIds, ['buke'])
  assert.deepEqual(changed.removedCompanionIds, ['ujk'])

  const moved = planInventoryNarration(after, changed.nextState, { nodeId: 'sheshi', turn: 3 })
  assert.equal(moved.showPurse, false)
  assert.deepEqual(moved.presentItemIds, [])
  assert.deepEqual(moved.removedItemIds, [])
  assert.deepEqual(moved.removedCompanionIds, [])
})

check('conditional money outcomes use one resolved transaction contract', () => {
  const line = [{ id: 'lek', al: 'lek', en: 'lek' }]
  const conditional = {
    moneyOutcome: { variants: [{ when: 'flag:paidByMira', line }] },
  }
  const absent = { ...newRun(), flags: {} }
  assert.equal(resolvedMoneyOutcomeLine(absent, conditional), null)
  const present = { ...absent, flags: { paidByMira: true } }
  assert.strictEqual(resolvedMoneyOutcomeLine(present, conditional), line)
})

check('generated state prose is natural Albanian rather than a UI ledger', () => {
  assert.equal(albanianTextOf(purseStoryLine(0, { includeEmpty: true })), 'ti nuk ke para me vete.')
  assert.equal(albanianTextOf(heldItemsStoryLine(ITEMS, ['buke', 'kripe'])), 'Me vete ke bukë dhe kripë.')
  assert.equal(albanianTextOf(removedItemsStoryLine(ITEMS, ['buke', 'kripe'])), 'ti nuk ke më me vete as bukë, as kripë.')
  assert.equal(albanianTextOf(companionStoryLine(ITEMS, ['ujk'])), 'Me ty ecën ujku.')
  assert.equal(albanianTextOf(departedCompanionStoryLine(ITEMS, ['ujk'])), 'ujku nuk ecën më me ty.')
})

check('StoryView consumes the shared plan and reducer persistence action', () => {
  const story = fs.readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  const state = fs.readFileSync(new URL('../src/game/gameState.js', import.meta.url), 'utf8')
  assert.match(story, /planInventoryNarration\(/)
  assert.match(story, /type: 'NARRATE_INVENTORY'/)
  assert.doesNotMatch(story, /companionIds\.length > 0\) sceneLineEntries\.push/)
  assert.match(state, /case 'NARRATE_INVENTORY'/)
  assert.match(state, /normalizeInventoryNarrationState\(/)
})

check('save normalization and the reducer persist only the canonical snapshot', () => {
  const fresh = newRun()
  const loaded = normalizeSavedState({
    ...fresh,
    inventory: { lek: 800, buke: 1, ujk: 1 },
    inventoryNarration: { forged: true },
  }, fresh)
  assert.deepEqual(loaded.inventoryNarration, normalizeInventoryNarrationState())
  const narrated = reducer(loaded, {
    type: 'NARRATE_INVENTORY',
    nodeId: loaded.nodeId,
    turn: loaded.turn,
    actionableItemIds: ['buke', 'forged'],
    actionableCompanionIds: ['ujk', 'buke'],
  })
  assert.deepEqual(narrated.inventoryNarration.communicated, {
    lek: 800,
    items: { buke: 1 },
    companions: { ujk: 1 },
  })
  assert.deepEqual(narrated.inventoryNarration.active.actionableItemIds, ['buke'])
  assert.deepEqual(narrated.inventoryNarration.active.actionableCompanionIds, ['ujk'])
  assert.equal(reducer(narrated, {
    type: 'NARRATE_INVENTORY', nodeId: 'stale', turn: narrated.turn,
  }), narrated)
})

console.log(`\n${8 - failures.length}/8 inventory-narration contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
