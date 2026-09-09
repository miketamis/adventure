// ITEM-AFFORDANCE AUDIT
//
// Inventory behavior is authored through normalized kinds and tags. This audit
// prevents UI code from quietly returning to item-id allowlists as the catalog
// grows and checks that legacy use effects expose the shared typed-effect shape.
// Run: node scripts/itemaffordanceaudit.mjs

import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import {
  ITEMS,
  ITEM_KINDS,
  ITEM_TAGS,
  itemAffordancesOf,
  itemConfuserActionOf,
  itemHasAffordance,
  itemHasTag,
  itemKindOf,
  itemUseEffectsOf,
} from '../src/game/content.js'
import { dynamicItemConfuserEnglish } from '../src/game/data/readings/reviewedOptionReadings.js'

const itemEntries = Object.entries(ITEMS)
assert.ok(itemEntries.length > 0, 'ITEMS must not be empty')

for (const [id, item] of itemEntries) {
  assert.equal(item.id, id, `${id}: item id must match its catalog key`)
  assert.ok(ITEM_KINDS.includes(item.kind), `${id}: unknown or missing kind ${item.kind}`)
  assert.ok(Array.isArray(item.tags) && item.tags.length > 0, `${id}: tags must be a non-empty array`)
  assert.equal(new Set(item.tags).size, item.tags.length, `${id}: tags must be unique`)
  assert.ok(item.tags.every((tag) => ITEM_TAGS.includes(tag)), `${id}: contains an unknown tag`)
  assert.ok(item.tags.includes(item.kind), `${id}: tags must include primary kind ${item.kind}`)

  assert.equal(itemKindOf(id), item.kind, `${id}: kind lookup by id disagrees with item metadata`)
  assert.equal(itemKindOf(item), item.kind, `${id}: kind lookup by record disagrees with item metadata`)
  for (const tag of item.tags)
    assert.equal(itemHasTag(id, tag), true, `${id}: tag helper cannot find ${tag}`)

  const affordances = itemAffordancesOf(id)
  assert.ok(Array.isArray(affordances) && affordances.length > 0, `${id}: has no affordance`)
  assert.equal(new Set(affordances).size, affordances.length, `${id}: affordances must be unique`)
  for (const affordance of affordances)
    assert.equal(itemHasAffordance(item, affordance), true, `${id}: affordance helper cannot find ${affordance}`)

  assert.equal(Boolean(item.currency), item.kind === 'currency', `${id}: legacy currency field disagrees with kind`)
  assert.equal(Boolean(item.companion), item.kind === 'companion', `${id}: legacy companion field disagrees with kind`)

  // The contradiction is derived solely from capability: anything drinkable
  // gets "fight" and everything else gets "drink".
  const confuserAction = itemConfuserActionOf(item)
  assert.equal(confuserAction, itemHasAffordance(item, 'drink') ? 'fight' : 'drink', `${id}: confuser ignores affordance`)
  assert.match(
    dynamicItemConfuserEnglish(item, confuserAction),
    new RegExp(`^${confuserAction === 'fight' ? 'Fight' : 'Drink'} .+[.]$`),
    `${id}: malformed metadata-driven confuser`,
  )

  const effects = itemUseEffectsOf(id)
  assert.ok(Array.isArray(effects), `${id}: use effects lookup must return an array`)
  for (const effect of effects) {
    assert.equal(effect.type, 'resource', `${id}: unsupported typed item-use effect`)
    assert.ok(['hearts', 'lek'].includes(effect.id), `${id}: invalid resource effect id ${effect.id}`)
    assert.ok(Number.isFinite(effect.delta) && effect.delta !== 0, `${id}: invalid resource effect delta`)
  }
  for (const [legacyId, delta] of Object.entries(item.use?.effect || {})) {
    const id = legacyId
    assert.ok(
      effects.some((effect) => effect.type === 'resource' && effect.id === id && effect.delta === delta),
      `${item.id}: legacy ${legacyId} effect is absent from typed lookup`,
    )
  }
}

const typedEffects = Object.freeze([{ type: 'resource', id: 'hearts', delta: 1 }])
assert.equal(
  itemUseEffectsOf({ use: { effects: typedEffects } }),
  typedEffects,
  'explicit typed item-use effects must pass through unchanged',
)

const storyViewSource = await readFile(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
assert.match(storyViewSource, /itemConfuserActionOf\(featured\)/, 'StoryView must derive confusers from item affordances')
assert.doesNotMatch(storyViewSource, /LIQUID_ITEMS/, 'StoryView must not keep an item-id liquid allowlist')

console.log(`✓ item affordances: ${itemEntries.length} items classified; confusers and use effects are metadata-driven`)
