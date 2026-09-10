// Release gate for lived money narration and the nominal/"old lek" boundary.
import assert from 'node:assert/strict'
import { EVERYDAY_GOOD_PRICES, LEK_ECONOMY, OLD_LEK_MULTIPLIER, oldLekQuoteFor } from '../src/game/economy.js'
import { STORY, lineOf, moneyOutcomeLineOf, moneyOutcomeLinesOf } from '../src/game/content.js'
import { albanianTextOf } from '../src/game/language.js'
import { arrivalOptionOf, hasCond, newRun, phraseSenses, reducer } from '../src/game/gameState.js'
import { moneyTransactionStoryLine } from '../src/game/storyContext.js'

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

check('Elira pays after the promise and the arrival shows the resulting purse', () => {
  const option = STORY.eliraShesh.options.find((candidate) => candidate.lek > 0)
  const ids = phraseSenses(option.text)
  const before = {
    ...newRun(),
    nodeId: 'eliraShesh',
    inventory: { lek: 600 },
    discovered: Object.fromEntries(ids.map((id) => [id, true])),
    mana: Object.fromEntries(ids.map((id) => [id, 2])),
    knowledge: { 'npcName:elira': { atClock: 0, source: 'audit' } },
  }
  const after = reducer(before, {
    type: 'CHOOSE', option, targetNode: STORY[option.to],
    fromNodeId: before.nodeId, fromTurn: before.turn,
  })
  assert.equal(after.inventory.lek, 1_400)
  assert.equal(arrivalOptionOf(after), option)
  const outcome = moneyOutcomeLineOf(option, (id) => hasCond(after, id))
  assert.equal(
    albanianTextOf(moneyTransactionStoryLine(outcome, after.inventory.lek)),
    'Elira të jep tetëqind lekë. Tani ke 1400 lekë.',
  )
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
