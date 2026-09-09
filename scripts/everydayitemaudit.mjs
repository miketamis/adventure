// EVERYDAY-ITEM INTEGRATION AUDIT
//
// Ordinary objects should be more than disconnected vocabulary cards. This
// audit protects the shop, reusable affordances, contextual actions, and the
// story consequences that make the objects useful in the world.
// Run: node scripts/everydayitemaudit.mjs

import assert from 'node:assert/strict'
import {
  ITEMS,
  STORY,
  itemHasTag,
  lineOf,
  visibleLines,
} from '../src/game/content.js'
import { hasCond, newRun } from '../src/game/gameState.js'
import { albanianTextOf } from '../src/game/language.js'
import { optionEffectsOf, optionLekDelta } from '../src/game/stateMechanics.js'

const EXPECTED_ITEMS = Object.freeze({
  cakmak: ['tool', 'ignition-source'],
  shishe: ['tool', 'container'],
  shisheUje: ['drink', 'container'],
  cader: ['tool', 'weather-protection'],
  litar: ['tool', 'climbing-tool'],
  batanije: ['tool', 'warmth'],
  sapun: ['tool', 'hygiene'],
})

for (const [itemId, tags] of Object.entries(EXPECTED_ITEMS)) {
  assert.ok(ITEMS[itemId], `${itemId}: missing everyday item`)
  for (const tag of tags)
    assert.equal(itemHasTag(itemId, tag), true, `${itemId}: missing generalized ${tag} tag`)
}
assert.equal(itemHasTag('cakmak', 'light-source'), false, 'a lighter must not replace the cavern torch')

const generated = Object.entries(STORY).flatMap(([nodeId, node]) =>
  (node.options || [])
    .filter((option) => option.contextItemAction)
    .map((option) => ({ nodeId, option })))
const generatedIds = generated.map(({ option }) => option.contextItemAction.id)
assert.equal(new Set(generatedIds).size, generatedIds.length, 'generated everyday-item action ids must be unique')
for (const { nodeId, option } of generated) {
  const address = `${nodeId}/${option.contextItemAction.id}`
  assert.equal(albanianTextOf(option.text), option.text.optionReadingAlbanian, `${address}: pinned Albanian drifted`)
  assert.ok(option.text.optionReading, `${address}: missing reviewed English`)
  assert.equal(option.text.optionReadingReview, 'generated-world-item', `${address}: missing review provenance`)
  assert.equal(option.contextItemAction.kind, option.confuser ? 'confuser' : 'world', `${address}: wrong action kind`)
}

const action = (nodeId, id) => {
  const result = STORY[nodeId].options.find((option) => option.contextItemAction?.id === id)
  assert.ok(result, `${nodeId}: missing ${id}`)
  return result
}
const effectsInclude = (option, type, id, delta) => optionEffectsOf(option).some((effect) =>
  effect?.type === type && effect.id === id && (delta == null || effect.delta === delta))
const requirementIncludes = (option, requirement) =>
  (Array.isArray(option.requires) ? option.requires : [option.requires]).includes(requirement)
const condIncludes = (entry, condition) =>
  (Array.isArray(entry?.cond) ? entry.cond : [entry?.cond]).includes(condition)
const consequence = (nodeId, condition) => STORY[nodeId].text.find((entry) => condIncludes(entry, condition))

const shopGoods = Object.freeze({ cakmak: 8, shishe: 5, cader: 15, litar: 20, batanije: 20, sapun: 4 })
for (const [itemId, price] of Object.entries(shopGoods)) {
  const buy = action('sendetDites', `buy-${itemId}`)
  assert.equal(optionLekDelta(buy), -price, `buy-${itemId}: wrong price`)
  assert.equal(effectsInclude(buy, 'inventory', itemId, 1), true, `buy-${itemId}: purchase does not grant item`)
  assert.equal(buy.unless, itemId, `buy-${itemId}: repeat purchase is not hidden`)
}

const campfire = action('lendina', 'light-campfire')
assert.equal(requirementIncludes(campfire, 'cakmak'), true, 'lighter cannot light the campfire')
assert.equal(effectsInclude(campfire, 'fixture', 'campfire'), true, 'lighter does not activate the generic campfire fixture')
const lighterFireConsequence = consequence('lendina', 'flag:fireLitWithLighter')
assert.ok(lighterFireConsequence, 'campfire lighter action has no story consequence')
assert.equal(condIncludes(lighterFireConsequence, 'fixture:campfire:live'), true, 'lighter consequence outlives the timed fire')
const lighterFireLine = lineOf(lighterFireConsequence)
const litCamp = { ...newRun(), nodeId: 'lendina', clock: 13, flags: { fireLitWithLighter: true }, fixtures: { campfire: 13 } }
const coldCamp = { ...litCamp, clock: 21 }
assert.equal(visibleLines(STORY.lendina, (id) => hasCond(litCamp, id)).includes(lighterFireLine), true, 'lighter consequence is missing while its fire burns')
assert.equal(visibleLines(STORY.lendina, (id) => hasCond(coldCamp, id)).includes(lighterFireLine), false, 'lighter consequence remains present after its fire expires')
const vigil = action('varret1', 'light-vigil-candle')
assert.equal(requirementIncludes(vigil, 'cakmak'), true, 'lighter cannot light the vigil candle')
assert.equal(effectsInclude(vigil, 'flag', 'vigilLitWithLighter'), true, 'vigil action records no lasting consequence')
assert.match(albanianTextOf(lineOf(consequence('varretFund', 'flag:vigilLitWithLighter'))), /çakmaku ndez qiriun/, 'vigil consequence does not mention the lighter lighting the candle')

for (const [nodeId, id] of [['kroi1', 'fill-bottle-at-spring'], ['pusiThate', 'draw-bottle-from-well']]) {
  const fill = action(nodeId, id)
  assert.equal(effectsInclude(fill, 'inventory', 'shishe', -1), true, `${id}: empty bottle is not consumed`)
  assert.equal(effectsInclude(fill, 'inventory', 'shisheUje', 1), true, `${id}: full bottle is not granted`)
}
assert.equal(requirementIncludes(action('pusiThate', 'draw-bottle-from-well'), 'itemTag:climbing-tool'), true, 'well action is tied to a specific rope instead of a reusable affordance')
const bottleDrinks = generated.filter(({ option }) => option.contextItemAction.id.startsWith('drink-bottle-'))
assert.equal(bottleDrinks.length, 7, 'full bottle should be reusable at all seven travel hubs')
for (const { nodeId, option } of bottleDrinks) {
  assert.equal(effectsInclude(option, 'inventory', 'shisheUje', -1), true, `${nodeId}: drink does not consume full bottle`)
  assert.equal(effectsInclude(option, 'inventory', 'shishe', 1), true, `${nodeId}: drink does not return empty bottle`)
  assert.equal(effectsInclude(option, 'resource', 'hearts', 1), true, `${nodeId}: drinking water has no restorative effect`)
}

const umbrellaActions = generated.filter(({ option }) => option.contextItemAction.id.startsWith('open-umbrella-'))
assert.equal(umbrellaActions.length, 12, 'umbrella needs rain and storm actions at six outdoor hubs')
for (const { nodeId, option } of umbrellaActions) {
  assert.equal(requirementIncludes(option, 'cader'), true, `${nodeId}: umbrella action does not require the umbrella`)
  assert.ok(['weather:rain', 'weather:storm'].some((weather) => requirementIncludes(option, weather)), `${nodeId}: umbrella action ignores weather`)
  assert.ok(consequence(nodeId, `flag:umbrellaOpen:${nodeId}`), `${nodeId}: umbrella action has no story consequence`)
}

const wash = action('kroi1', 'wash-hands-at-spring')
assert.equal(requirementIncludes(wash, 'sapun'), true, 'washing does not require soap')
assert.ok(consequence('kroi1', 'flag:washedAtSpring'), 'washing has no clean-hands story consequence')

const blanket = action('lendina', 'give-blanket-to-guest')
for (const requirement of ['batanije', 'npc:plakaPyllit', 'fixture:campfire:live'])
  assert.equal(requirementIncludes(blanket, requirement), true, `blanket action missing ${requirement} context`)
assert.equal(effectsInclude(blanket, 'inventory', 'batanije', -1), true, 'giving the blanket does not consume it')
assert.equal(effectsInclude(blanket, 'inventory', 'bekim', 1), false, 'blanket must not replace the sacred hospitality/bread challenge')
assert.match(albanianTextOf(lineOf(consequence('lendina', 'flag:forestGuestWarm'))), /ende e uritur/, 'blanket consequence must preserve the hungry guest challenge')

console.log(`✓ everyday items: ${Object.keys(EXPECTED_ITEMS).length} carried forms, ${Object.keys(shopGoods).length} shop goods, ${generated.length} contextual actions`)
