// Release gate for lived money narration and the nominal/"old lek" boundary.
import assert from 'node:assert/strict'
import {
  ELIRA_ERRAND_ADVANCE,
  EVERYDAY_GOOD_PRICES,
  LEK_ECONOMY,
  OLD_LEK_MULTIPLIER,
  oldLekQuoteFor,
} from '../src/game/economy.js'
import { STORY, lineOf, moneyOutcomeLineOf, moneyOutcomeLinesOf } from '../src/game/content.js'
import { albanianTextOf } from '../src/game/language.js'
import {
  arrivalOptionOf,
  hasCond,
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
} from '../src/game/gameState.js'
import { moneyTransactionStoryLine } from '../src/game/storyContext.js'
import { optionEffectsOf } from '../src/game/stateMechanics.js'
import { ELIRA_BREAD_SALT_QUEST_ID, offerQuests } from '../src/game/quests.js'

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push({ name, ok: true })
    console.log(`✓ ${name}`)
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
    console.log(`✗ ${name}`)
  }
}

const moneyOptions = Object.entries(STORY).flatMap(([nodeId, node]) =>
  node.options.map((option, optionIndex) => ({ nodeId, optionIndex, option, target: STORY[option.to] }))
    .filter(({ option }) => Number.isSafeInteger(option.lek) && option.lek !== 0))

check('living-world effects use current nominal-scale lek', () => {
  assert.ok(moneyOptions.length >= 20, 'too few economy interactions reached the audit')
  for (const { nodeId, optionIndex, option } of moneyOptions) {
    assert.ok(Math.abs(option.lek) >= 100,
      `${nodeId}.options[${optionIndex}] returned to a misleading single-digit lek amount`)
  }
  assert.equal(LEK_ECONOMY.eliraErrandAdvance, 800)
  assert.equal(LEK_ECONOMY.bread + LEK_ECONOMY.salt, 200)
})

check('every continuing money change owns transaction prose', () => {
  for (const { nodeId, optionIndex, option, target } of moneyOptions) {
    if (target?.end) continue
    assert.ok(moneyOutcomeLinesOf(option).length > 0,
      `${nodeId}.options[${optionIndex}] changes money without an arrival outcome`)
  }
})

check('every Elira acceptance grants exactly 800 and narrates the atomic resulting purse', () => {
  const origins = ['eliraBreg', 'eliraEmriBreg', 'eliraShesh', 'eliraEmriShesh']
  for (const nodeId of origins) {
    const option = STORY[nodeId].options.find((candidate) => candidate.questAction?.action === 'accept')
    assert.ok(option, `${nodeId}: no paid errand acceptance`)
    const questAdvance = optionEffectsOf(option).filter(
      (effect) => effect?.type === 'resource' && effect.id === 'lek',
    )
    assert.deepEqual(questAdvance.map((effect) => effect.delta), [ELIRA_ERRAND_ADVANCE],
      `${nodeId}: errand grant is not one nominal 800-lek transaction`)
    assert.equal(option.lek, undefined, `${nodeId}: quest advance bypasses the registry`)
    assert.equal(option.to, 'fshatiSheshi', `${nodeId}: acceptance did not return to free roam`)
    assert.doesNotMatch(albanianTextOf(option.text), /tetëqind|800|lek/,
      `${nodeId}: choice previews its reward`)

    for (const startingLek of [0, 8, 600]) {
      const ids = phraseSenses(option.text)
      const fresh = newRun()
      const before = {
        ...fresh,
        nodeId,
        inventory: { ...fresh.inventory, lek: startingLek },
        discovered: Object.fromEntries(ids.map((id) => [id, true])),
        mana: Object.fromEntries(ids.map((id) => [id, 20])),
        knowledge: { 'npcName:elira': { atClock: 0, source: 'audit' } },
        quests: offerQuests({}, [ELIRA_BREAD_SALT_QUEST_ID], fresh.clock, `audit:${nodeId}`),
      }
      const after = reducer(before, {
        type: 'CHOOSE', option, targetNode: STORY[option.to],
        fromNodeId: before.nodeId, fromTurn: before.turn,
      })
      const resultingLek = startingLek + ELIRA_ERRAND_ADVANCE
      assert.equal(after.inventory.lek, resultingLek, `${nodeId}/${startingLek}: grant applied incorrectly`)
      assert.equal(arrivalOptionOf(after), option, `${nodeId}/${startingLek}: arrival lost its transaction`)
      const outcome = moneyOutcomeLineOf(option, (id) => hasCond(after, id))
      const expected = `Elira të jep tetëqind lekë. Tani ke ${resultingLek} lekë.`
      assert.equal(albanianTextOf(moneyTransactionStoryLine(outcome, after.inventory.lek)), expected,
        `${nodeId}/${startingLek}: transaction and resulting balance were not one narration`)

      const restored = normalizeSavedState(JSON.parse(JSON.stringify(after)), newRun())
      const restoredOption = arrivalOptionOf(restored)
      assert.ok(restoredOption, `${nodeId}/${startingLek}: save/reload lost the arrival option`)
      const restoredOutcome = moneyOutcomeLineOf(restoredOption, (id) => hasCond(restored, id))
      assert.equal(
        albanianTextOf(moneyTransactionStoryLine(restoredOutcome, restored.inventory.lek)),
        expected,
        `${nodeId}/${startingLek}: save/reload split or changed the transaction narration`,
      )
    }
  }
})

check('old lek dialogue teaches 10:1 without changing the charged value', () => {
  assert.equal(OLD_LEK_MULTIPLIER, 10)
  assert.equal(oldLekQuoteFor(EVERYDAY_GOOD_PRICES.cakmak), 5_000)
  const shelfLanguage = STORY.sendetDites.text.map((entry) => albanianTextOf(lineOf(entry))).join(' ')
  assert.match(shelfLanguage, /pesë mijë të vjetra/)
  assert.match(shelfLanguage, /pesëqind lekë/)
  const lighter = STORY.sendetDites.options.find((option) => option.contextItemAction?.id === 'buy-cakmak')
  assert.equal(lighter.lek, -500, 'the old-lek quote leaked into the actual price')
})

check('all everyday goods use the shared price ledger', () => {
  for (const [itemId, price] of Object.entries(EVERYDAY_GOOD_PRICES)) {
    const option = STORY.sendetDites.options.find(
      (candidate) => candidate.contextItemAction?.id === `buy-${itemId}`,
    )
    assert.ok(option, `missing purchase option for ${itemId}`)
    assert.equal(option.lek, -price, `${itemId} price drifted from the ledger`)
  }
})

const failed = checks.filter((entry) => !entry.ok)
console.log(`\n${checks.length - failed.length}/${checks.length} economy contracts pass.`)
if (failed.length) {
  for (const entry of failed) console.log(`  - ${entry.name}: ${entry.error}`)
  process.exitCode = 1
}
