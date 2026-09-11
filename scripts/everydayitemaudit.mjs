// EVERYDAY-ITEM INTEGRATION AUDIT
//
// Ordinary objects should be more than disconnected vocabulary cards. This
// audit protects the shop, reusable affordances, contextual actions, and the
// story consequences that make the objects useful in the world.
// Run: node scripts/everydayitemaudit.mjs

import assert from 'node:assert/strict'
import {
  DICT,
  ITEMS,
  STORY,
  itemHasTag,
  lineOf,
  visibleLines,
} from '../src/game/content.js'
import { hasCond, newRun } from '../src/game/gameState.js'
import { EVERYDAY_GOOD_PRICES } from '../src/game/economy.js'
import { albanianTextOf } from '../src/game/language.js'
import { observationIdFromCondition } from '../src/game/observations.js'
import { resolveRevealLine } from '../src/game/revealResolver.js'
import { optionEffectsOf, optionLekDelta } from '../src/game/stateMechanics.js'

// A designated practical object is not complete merely because it has a
// dictionary entry, sits on a shelf, or is named in some atmosphere. Each
// entry below pins the story contexts and human actions that demonstrate the
// object's ordinary affordance. This is deliberately editorial: a generic
// verb such as "see" cannot accidentally turn a decorative prop into taught,
// usable vocabulary.
//
// Add a row here in the same change as every new high-value practical object.
// The gate will then require:
//   1. a real dictionary sense;
//   2. a playable occurrence outside the definition; and
//   3. the object and one reviewed affordance verb in the same story beat.
const DESIGNATED_PRACTICAL_OBJECTS = Object.freeze({
  cakmak: { scenes: ['lendina', 'varret1'], actions: ['ndiz'], label: 'light a fire or candle' },
  shishe: { scenes: ['kroi1', 'pusiThate', 'fshatiSheshi', 'fshatiLumi', 'sheshi', 'lendina', 'rrugaDetit', 'udhekryq'], actions: ['mbush', 'pi'], label: 'fill or drink from a bottle' },
  cader: { scenes: ['fshatiSheshi', 'fshatiLumi', 'sheshi', 'rrugaDetit', 'pusiThate', 'udhekryq'], actions: ['hap'], label: 'open an umbrella in bad weather' },
  litar: { scenes: ['pusiThate'], actions: ['lidh'], label: 'tie a rope to draw water' },
  batanije: { scenes: ['lendina'], actions: ['jep'], label: 'give a blanket to someone who is cold' },
  sapun: { scenes: ['kroi1'], actions: ['laj'], label: 'wash with soap' },

  // 2026-09 practical-language tranche. Some are carried; others are useful
  // fixtures or borrowed tools whose ownership should remain with the world.
  gote: { scenes: ['kafeja1'], actions: ['pi', 'mbush', 'jep'], label: 'drink, fill, or serve a glass' },
  peshqir: { scenes: ['kroi1'], actions: ['thaj', 'fshij', 'perdor'], label: 'dry or wipe with a towel after washing' },
  ilac: { scenes: ['sherimiBar'], actions: ['merr', 'pi', 'jep', 'pergatit'], label: 'prepare, give, or take medicine' },
  fashe: { scenes: ['sheruesi'], actions: ['lidh', 've'], label: 'put on or tie a bandage' },
  cante: { scenes: ['udhetariHuaj'], actions: ['mban', 'hap', 'merr'], label: 'carry, open, or take something from a bag' },
  kove: { scenes: ['pusiThate'], actions: ['ul', 'terheq', 'mbush'], label: 'lower, pull, or fill a bucket at the well' },
  cekic: { scenes: ['uraArtes1'], actions: ['punon', 'godit', 'ndreq'], label: 'work or repair with a hammer' },
  shporte: { scenes: ['cajMali1'], actions: ['mbledh', 'mbush', 'mban'], label: 'gather or carry something in a basket' },
  luge: { scenes: ['sherimiBar'], actions: ['merr', 'pi', 'perdor'], label: 'measure or take medicine with a spoon' },
})

const playableStoryOccurrences = []
for (const [nodeId, node] of Object.entries(STORY)) {
  node.text.forEach((entry, index) => playableStoryOccurrences.push({
    nodeId,
    address: `story:${nodeId}:line:${index + 1}`,
    tokens: lineOf(entry),
    validAffordanceEvidence: true,
  }))
  node.options.forEach((option, index) => playableStoryOccurrences.push({
    nodeId,
    address: `story:${nodeId}:option:${index + 1}`,
    tokens: option.text,
    // An intentionally wrong choice may teach discrimination, but it is not
    // proof that the story lets the player use an object meaningfully.
    validAffordanceEvidence: !option.confuser,
  }))
}

const tokenIdsOf = (tokens) => new Set((tokens || []).map((token) => token?.id).filter(Boolean))
const practicalObjectFailures = []
for (const [senseId, policy] of Object.entries(DESIGNATED_PRACTICAL_OBJECTS)) {
  if (!DICT[senseId]) {
    practicalObjectFailures.push(`${senseId}: designated practical object has no dictionary sense`)
    continue
  }

  const occurrences = playableStoryOccurrences.filter(({ tokens }) => tokenIdsOf(tokens).has(senseId))
  if (!occurrences.length) {
    practicalObjectFailures.push(
      `${senseId}: designated practical object never occurs in playable story language outside its definition`,
    )
    continue
  }

  const practicalUses = occurrences.filter(({ nodeId, tokens, validAffordanceEvidence }) => {
    if (!validAffordanceEvidence) return false
    if (!policy.scenes.includes(nodeId)) return false
    const tokenIds = tokenIdsOf(tokens)
    return policy.actions.some((actionSenseId) => tokenIds.has(actionSenseId))
  })
  if (!practicalUses.length) practicalObjectFailures.push(
    `${senseId}: no meaningful human affordance (${policy.label}) in ${policy.scenes.join(', ')}; `
      + `object occurrences: ${occurrences.map(({ address }) => address).join(', ')}`,
  )
}
if (practicalObjectFailures.length) {
  console.error(`Everyday-item grounding failed: ${practicalObjectFailures.length} designated objects are incomplete:`)
  for (const failure of practicalObjectFailures) console.error(`  - ${failure}`)
  process.exit(1)
}

const EXPECTED_ITEMS = Object.freeze({
  cakmak: ['tool', 'ignition-source'],
  shishe: ['tool', 'container'],
  shisheUje: ['drink', 'container'],
  cader: ['tool', 'weather-protection'],
  litar: ['tool', 'climbing-tool'],
  batanije: ['tool', 'warmth'],
  sapun: ['tool', 'hygiene'],
  peshqir: ['tool', 'hygiene'],
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

for (const [itemId, price] of Object.entries(EVERYDAY_GOOD_PRICES)) {
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

const towel = action('kroi1', 'dry-hands-with-towel')
for (const requirement of ['peshqir', 'flag:washedAtSpring'])
  assert.equal(requirementIncludes(towel, requirement), true, `towel action missing ${requirement} context`)
assert.equal(effectsInclude(towel, 'flag', 'driedAtSpring'), true, 'towel action records no dry-hands consequence')
assert.ok(consequence('kroi1', 'flag:driedAtSpring'), 'towel action has no visible story consequence')

// These contextual actions are comprehension rewards, not unexplained buttons:
// each practical object is first named in a setup line that is visible in the
// same reachable state. Pin both the gate target and that conditional visibility
// so a later prose edit cannot strand the action behind its own consequence.
const practicalRevealStates = Object.freeze([
  ['kroi1', 'dry-hands-with-towel', 'peshqir', { inventory: { peshqir: 1 }, flags: { washedAtSpring: true } }],
  ['sheruesi', 'bandage-right-hand', 'fashe', { flags: { askedForHelp: true } }],
  ['pusiThate', 'draw-water-with-bucket', 'kove', { inventory: { litar: 1 }, worldFacts: { villageWellsRestored: true } }],
  ['uraArtes1', 'work-with-hammer', 'cekic', { clock: 3 }],
  ['cajMali1', 'fill-tea-basket', 'shporte', { inventory: { cajMali: 1 } }],
])
for (const [nodeId, actionId, senseId, patch] of practicalRevealStates) {
  const option = action(nodeId, actionId)
  assert.equal(option.reveal, senseId, `${actionId}: action is not gated by its setup object`)
  const node = STORY[nodeId]
  const setupLine = resolveRevealLine(node.text.map(lineOf), option).line
  assert.ok(setupLine, `${actionId}: reveal does not resolve to an authored setup line`)
  const base = newRun()
  const actionRequirements = option.requires == null
    ? []
    : Array.isArray(option.requires) ? option.requires : [option.requires]
  const observations = Object.fromEntries(actionRequirements
    .map(observationIdFromCondition)
    .filter(Boolean)
    .map((id) => [id, { atClock: patch.clock || base.clock, nodeId }]))
  const ready = {
    ...base,
    ...patch,
    nodeId,
    inventory: { ...base.inventory, ...patch.inventory },
    flags: { ...base.flags, ...patch.flags },
    worldFacts: { ...base.worldFacts, ...patch.worldFacts },
    observations: { ...base.observations, ...observations },
  }
  assert.equal(
    visibleLines(node, (id) => hasCond(ready, id)).includes(setupLine),
    true,
    `${actionId}: setup line is not visible before the reachable action`,
  )
}

const bandage = action('sheruesi', 'bandage-right-hand')
assert.equal(requirementIncludes(bandage, 'flag:askedForHelp'), true, 'bandage is available before asking the healer for help')
assert.equal(effectsInclude(bandage, 'flag', 'handBandaged'), true, 'bandage action records no treated-hand consequence')
assert.ok(consequence('sheruesi', 'flag:handBandaged'), 'bandage action has no visible story consequence')

const bucket = action('pusiThate', 'draw-water-with-bucket')
for (const requirement of ['fact:villageWellsRestored', 'litar'])
  assert.equal(requirementIncludes(bucket, requirement), true, `bucket action missing ${requirement} context`)
assert.equal(effectsInclude(bucket, 'flag', 'drewWaterWithBucket'), true, 'bucket action records no drawn-water consequence')
assert.ok(consequence('pusiThate', 'flag:drewWaterWithBucket'), 'bucket action has no visible story consequence')

const hammer = action('uraArtes1', 'work-with-hammer')
assert.equal(requirementIncludes(hammer, 'day'), true, 'bridge work with the hammer is not tied to daylight')
assert.equal(effectsInclude(hammer, 'flag', 'workedWithHammer'), true, 'hammer action records no bridge-work consequence')
assert.ok(consequence('uraArtes1', 'flag:workedWithHammer'), 'hammer action has no visible story consequence')

const basket = action('cajMali1', 'fill-tea-basket')
assert.equal(requirementIncludes(basket, 'cajMali'), true, 'tea basket can be filled before gathering mountain tea')
assert.equal(effectsInclude(basket, 'flag', 'teaBasketFilled'), true, 'basket action records no gathered-tea consequence')
assert.ok(consequence('cajMali1', 'flag:teaBasketFilled'), 'basket action has no visible story consequence')

const blanket = action('lendina', 'give-blanket-to-guest')
for (const requirement of ['batanije', 'npc:plakaPyllit', 'fixture:campfire:live'])
  assert.equal(requirementIncludes(blanket, requirement), true, `blanket action missing ${requirement} context`)
assert.equal(effectsInclude(blanket, 'inventory', 'batanije', -1), true, 'giving the blanket does not consume it')
assert.equal(effectsInclude(blanket, 'inventory', 'bekim', 1), false, 'blanket must not replace the sacred hospitality/bread challenge')
assert.match(albanianTextOf(lineOf(consequence('lendina', 'flag:forestGuestWarm'))), /ende e uritur/, 'blanket consequence must preserve the hungry guest challenge')

console.log(`✓ everyday items: ${Object.keys(DESIGNATED_PRACTICAL_OBJECTS).length} grounded object senses, ${Object.keys(EXPECTED_ITEMS).length} carried forms, ${Object.keys(EVERYDAY_GOOD_PRICES).length} shop goods, ${generated.length} contextual actions`)
