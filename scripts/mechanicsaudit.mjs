// Editorial + structural audit for the game's mechanics coverage. The review
// ledger makes every fully researched tale an explicit design decision: rich
// simulations use many systems, while short source-shaped tales are allowed to
// stay focused. Run with the normal experience audit.
import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import {
  ITEMS,
  ITEM_KINDS,
  ITEM_TAGS,
  STORY,
  itemAffordancesOf,
} from '../src/game/content.js'
import { EMBODIMENT_QUESTS } from '../src/game/embodiment.js'
import { FOLKLORE } from '../src/game/folklore.js'
import { FESTIVAL_IDS, OBSERVANCES, WORLD_FACT_PRESENTATION } from '../src/game/environment.js'
import {
  TIMED_WORLD_FIXTURES,
  isTimedWorldFixture,
  parseFixtureCondition,
} from '../src/game/worldFixtures.js'
import {
  interactionSpecOf,
  optionEffectsAreValid,
  optionEffectsOf,
  optionLekDelta,
} from '../src/game/stateMechanics.js'

const REVIEW = Object.freeze({
  'aga-ymer': ['focused', 'The six-day release and return are an oath choice; extra props would distract from besa.'],
  'ali-bajraktari': ['focused', 'The second besa is carried by role, deadline and consequence, not loot.'],
  'ali-pashe-tepelena': ['focused', 'The claimed pardon is a trust decision; an invented economy layer would falsify the witness.'],
  'argjiro-gjirokastra': ['upgraded', 'The embodied siege and leap now leave mutually exclusive memories for Argjiro’s milk-stone, name and untold legend.'],
  'arnaut-osmani': ['upgraded', 'The prison role now plays the full false-death ordeal through night, bodily cost, deception and the final sword escape.'],
  'bear-dervish': ['upgraded', 'The cheese bluff now leads through the sourced tree, axe and night tests before the safer forest persists.'],
  'bee-spider-cicada': ['focused', 'Three work styles are expressed through repeated choices rather than inventory.'],
  binoshet: ['rich', 'Its long rescue uses travel, night, items, combat stages, roles and lasting restored-water facts.'],
  'constantine-doruntine': ['focused', 'The grave-return ballad relies on witness, route, oath and atmosphere.'],
  'creation-wolf': ['focused', 'A concise etiological legend is best delivered as witnessed cause and result.'],
  cuckoo: ['upgraded', 'Its incompatible bird and flower transformations now alter later forest life at the phase where each trace belongs.'],
  'death-of-omer': ['focused', 'Ajkuna’s lament is witnessed; gamifying grief with objects or money would weaken it.'],
  'gjakova-cavern': ['rich', 'Arrival, darkness, item gating and the guarded dead city reinforce exploration.'],
  'gjergj-elez-alia': ['rich', 'Companionship, wounds, coastal threat and staged confrontation carry the ballad.'],
  'gjeto-basho-muji': ['upgraded', 'Mujo now begins at one heart and physically drinks the Zanas’ carried milk to recover.'],
  gjizar: ['focused', 'Night, song and transformation provide the tale’s natural mechanical vocabulary.'],
  'goose-girl': ['focused', 'Identity and recognition unfold as role choices across the palace scenes.'],
  'half-rooster': ['upgraded', 'Each helper gathered on the comic journey now answers its matching palace danger instead of disappearing into narration.'],
  'halil-garria': ['focused', 'The call beyond death is an oath decision; invented errands would pad the song.'],
  'halil-marriage': ['focused', 'Witnessed abduction and rescue use travel, choice and the Kreshnik cast.'],
  'kostandini-i-vogel': ['focused', 'The captive’s promised return stays a short deadline-and-besa role.'],
  'kreshnik-epic': ['upgraded', 'A dedicated companion rescue now teaches the courser’s power, uses it at the right prison and changes Jutbina afterward.'],
  'kuma-lisa': ['focused', 'The honey-pot deception is a short social choice, not an inventory puzzle.'],
  'legjenda-e-prespes': ['rich', 'The warning changes the lake world differently for obedience and refusal.'],
  'maiden-promised-sun': ['rich', 'A long companion journey uses moving characters, items, travel, danger, arrival and time.'],
  'maro-perhitura': ['rich', 'Work, money, health, routes, NPC schedules and the timed mill lamp make the night mill lived-in.'],
  'muji-e-behuri': ['rich', 'Its dedicated companion arc joins Jutbina talk, a sourced journey, warnings, keys, ambush, tower, duel and aftermath.'],
  'mujo-avenges-halil': ['focused', 'The revenge song remains witnessed and avoids turning violence into reward farming.'],
  'mujo-courser': ['focused', 'The stolen courser is a direct role-and-loyalty choice.'],
  'mujo-strength': ['rich', 'Night-to-dawn care and the Zanas’ offered gifts use time, role and branching rewards.'],
  'mujo-zanas': ['focused', 'The marriage episode is witnessed as part of the shared Kreshnik world.'],
  nastradin: ['focused', 'Comic reversals need timing and choice; arbitrary prices would invent facts the anecdotes do not give.'],
  rozafa: ['upgraded', 'The oath, night construction and sacrifice now leave the raised named castle in world memory.'],
  'sari-salltek': ['rich', 'The saint’s intervention persists as a changed and safer world.'],
  scurfhead: ['rich', 'The flagship quest already combines items, companions, economy, roles, routes, health and consequences.'],
  'skanderbeg-legjenda': ['reference', 'Source-only by design: the researched timeline is retained without fabricating a playable witness.'],
  'snake-bridegroom': ['upgraded', 'The sea journey now yields carried salt which is consumed by the source’s false-tears trick.'],
  'sokol-halili': ['focused', 'The fatal summons and mejdan remain a tight embodied warning.'],
  'sons-of-eagle': ['upgraded', 'The rescued eaglet is now carried, then returned or kept in the mother eagle’s bargain.'],
  swallow: ['upgraded', 'Its compact choice now leaves incompatible memories for protected nests or the serpent’s knowledge of human blood.'],
  'syri-kalter': ['rich', 'Items, seasonal danger, water and lasting spring facts all fit the Blue Eye legend.'],
  'three-friends': ['upgraded', 'Kordha’s external soul is now the specific sword carried through the secrecy choice.'],
  'tomor-shpirag': ['rich', 'Two identities, mountain routes, item decisions, battle and environmental consequence support the giants.'],
  'tomorri-pilgrimage': ['upgraded', 'Its sourced 20–25 August observance now fills the summit through the shared calendar, with a playable wait and visible pilgrims.'],
  tortoise: ['focused', 'Hospitality and sharing remain a social choice; treating the guest as a resource would spoil the fable.'],
  'ura-e-artes': ['upgraded', 'Mercy or immurement now leaves mutually exclusive permanent bridge states in the world.'],
  'zuku-bajraktar': ['upgraded', 'Rusha’s freely sworn besa stays central while restored sight and Zuku’s alliance now persist in the mountain world.'],
})

const taleDir = new URL('../src/game/data/tales/', import.meta.url)
const files = (await readdir(taleDir)).filter((name) => name.endsWith('.js') && !name.startsWith('_')).sort()
const tales = []
for (const file of files) {
  const tale = (await import(new URL(file, taleDir))).default
  if (tale?.id) tales.push(tale)
}

const asList = (value) => value == null ? [] : Array.isArray(value) ? value : [value]
const edge = (from, to) => STORY[from]?.options?.find((option) => option.to === to && !option.confuser)
const taleIds = new Set(tales.map((tale) => tale.id))
const knownAffordances = new Set(Object.values(ITEMS).flatMap(itemAffordancesOf))
const typedEffectCounts = {}
const producedFlags = new Set()
const learnedKnowledge = new Set()
const requiredFlags = new Set()
const requiredKnowledge = new Set()
const authoredInteractions = []
const genericItemGates = new Set()
const itemTagGates = new Set()
const affordanceGates = new Set()

assert.equal(tales.length, 47, 'the review baseline must cover all 47 full tale records')
assert.equal(FOLKLORE.length, 140, 'the lore-library baseline changed; review its mechanics disposition')
assert.deepEqual(new Set(Object.keys(REVIEW)), taleIds, 'every full tale must have exactly one mechanics review')

// Keep the standalone mechanics review self-sufficient: capability gates are
// only as trustworthy as the catalog vocabulary that supplies them. The more
// detailed item-affordance audit still checks helper behavior and use effects.
for (const [id, item] of Object.entries(ITEMS)) {
  assert.equal(item.id, id, `${id}: catalog key and item id disagree`)
  assert.ok(ITEM_KINDS.includes(item.kind), `${id}: unknown item kind ${item.kind}`)
  assert.ok(Array.isArray(item.tags) && item.tags.length > 0, `${id}: item tags must be non-empty`)
  assert.equal(new Set(item.tags).size, item.tags.length, `${id}: duplicate item tags`)
  assert.ok(item.tags.every((tag) => ITEM_TAGS.includes(tag)), `${id}: unknown item tag`)
  assert.ok(item.tags.includes(item.kind), `${id}: primary kind is absent from item tags`)
}

for (const tale of tales) {
  const [status, note] = REVIEW[tale.id]
  assert.ok(['focused', 'rich', 'upgraded', 'reference'].includes(status), `${tale.id}: invalid review status`)
  assert.ok(note.length >= 45, `${tale.id}: review rationale is too thin`)
  if (status === 'reference') assert.equal(tale.play, undefined, `${tale.id}: reference-only review now has a play projection`)
  else {
    assert.ok(tale.play, `${tale.id}: reviewed playable tale has no projection`)
    for (const nodeId of Object.keys(tale.play.scenes || {})) assert.ok(STORY[nodeId], `${tale.id}: missing projected scene ${nodeId}`)
  }
}

// The general fixture system must have multiple authored expressions. Every
// activation belongs to the fixture's physical node, and every fixture
// condition names a registered stage or group.
assert.ok(Object.keys(TIMED_WORLD_FIXTURES).length >= 2, 'timed fixtures regressed into a one-off mechanic')
const activatedFixtures = new Set()
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const option of node.options || []) {
    assert.equal(optionEffectsAreValid(option, isTimedWorldFixture), true, `${nodeId}->${option.to}: invalid typed effect`)

    if (option.interaction != null) {
      const spec = interactionSpecOf(option)
      assert.ok(spec, `${nodeId}->${option.to}: invalid or unconstrained interaction`)
      authoredInteractions.push({ nodeId, option, spec })
    }

    for (const raw of option.effects || []) {
      typedEffectCounts[raw.type] = (typedEffectCounts[raw.type] || 0) + 1
      if (raw.type === 'flag' && raw.value !== false) producedFlags.add(raw.id)
      if (['learn', 'knowledge'].includes(raw.type)) learnedKnowledge.add(raw.id)
    }

    for (const effect of optionEffectsOf(option)) {
      if (effect?.type === 'inventory') {
        assert.ok(ITEMS[effect.id],
          `${nodeId}->${option.to}: inventory effect '${effect.id}' is not a catalogued physical item; use a typed flag for story state`)
      }
      if (effect?.type === 'fixture') {
        const fixture = TIMED_WORLD_FIXTURES[effect.id]
        assert.ok(fixture, `${nodeId}: acts on unknown fixture ${effect.id}`)
        assert.equal(nodeId, fixture.nodeId, `${nodeId}: acts on ${effect.id} away from its place`)
        activatedFixtures.add(effect.id)
      }
    }

    for (const condition of [...asList(option.requires), ...asList(option.unless)]) {
      if (condition?.startsWith?.('flag:')) requiredFlags.add(condition.slice(5))
      if (condition?.startsWith?.('knows:')) requiredKnowledge.add(condition.slice(6))
      if (condition?.startsWith?.('itemTag:')) {
        assert.ok(ITEM_TAGS.includes(condition.slice(8)), `${nodeId}: unknown item tag condition ${condition}`)
        genericItemGates.add(condition)
        itemTagGates.add(condition)
      }
      if (condition?.startsWith?.('affords:')) {
        assert.ok(knownAffordances.has(condition.slice(8)), `${nodeId}: unknown item affordance condition ${condition}`)
        genericItemGates.add(condition)
        affordanceGates.add(condition)
      }
    }
  }
  for (const entry of node.text || []) if (!Array.isArray(entry)) {
    for (const id of [...asList(entry.cond), ...asList(entry.unless)]) {
      if (id?.startsWith?.('fixture:')) assert.ok(parseFixtureCondition(id), `${nodeId}: invalid fixture condition ${id}`)
      if (id?.startsWith?.('flag:')) requiredFlags.add(id.slice(5))
      if (id?.startsWith?.('knows:')) requiredKnowledge.add(id.slice(6))
      if (id?.startsWith?.('itemTag:')) {
        assert.ok(ITEM_TAGS.includes(id.slice(8)), `${nodeId}: unknown item tag condition ${id}`)
        genericItemGates.add(id)
        itemTagGates.add(id)
      }
      if (id?.startsWith?.('affords:')) {
        assert.ok(knownAffordances.has(id.slice(8)), `${nodeId}: unknown item affordance condition ${id}`)
        genericItemGates.add(id)
        affordanceGates.add(id)
      }
    }
  }
}
assert.deepEqual(activatedFixtures, new Set(Object.keys(TIMED_WORLD_FIXTURES)), 'every timed fixture needs an authored activation')

// General systems are release features only when playable content exercises
// them. These are intentionally semantic contracts rather than story-id
// allowlists: future tales may provide the flag, knowledge, work, and fixture
// examples without teaching the engine their names.
assert.ok((typedEffectCounts.flag || 0) > 0, 'typed story flags have no playable producer')
assert.ok((typedEffectCounts.learn || 0) + (typedEffectCounts.knowledge || 0) > 0, 'durable knowledge has no playable producer')
assert.ok((typedEffectCounts.fixture || 0) > 0, 'general fixture actions have no typed playable expression')
for (const id of producedFlags) {
  assert.ok(requiredFlags.has(id), `typed story flag '${id}' is produced but never changes later content`)
}
for (const id of learnedKnowledge) {
  assert.ok(requiredKnowledge.has(id), `learned knowledge '${id}' is produced but never changes later content`)
}
assert.ok(authoredInteractions.length > 0, 'scoped interactions have no playable expression')
assert.ok(genericItemGates.size > 0, 'generic item-tag/affordance gates have no hidden playable expression')
assert.ok(itemTagGates.size > 0, 'item-tag gates have no playable expression')
assert.ok(affordanceGates.size > 0, 'item-affordance gates have no playable expression')
assert.ok(
  authoredInteractions.some(({ option, spec }) =>
    optionLekDelta(option) > 0 && (Number.isFinite(spec.maxUses) || spec.cooldownHours > 0)),
  'no wage, song, or errand reward uses the scoped interaction limits',
)

for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
  if (quest.startingHearts != null) {
    assert.ok(Number.isInteger(quest.startingHearts) && quest.startingHearts >= 1 && quest.startingHearts <= 3,
      `${id}: invalid authored starting health`)
  }
}

// Regression contracts for the lore-shaped gaps fixed in this review.
assert.equal(EMBODIMENT_QUESTS['gjeto-basho-muji'].startingHearts, 1)
assert.equal(edge('odaJutbina', 'gbMuji1')?.grant, 'qumesht')
assert.equal(edge('gbMuji1', 'gbMujiFund')?.consumes, 'qumesht')
assert.equal(edge('gbMuji1', 'gbMujiFund')?.hearts, 3)
assert.equal(edge('shqipe3', 'shqipeBarter')?.grant, 'zogShqiponje')
assert.equal(edge('shqipeBarter', 'shqipeFund')?.consumes, 'zogShqiponje')
assert.equal(edge('gjarperKerkim', 'gjarperKulshedra')?.grant, 'kripe')
assert.equal(edge('gjarperKulshedra', 'gjarperBurrFund')?.consumes, 'kripe')
assert.equal(edge('pylli1', 'kordha1')?.grant, 'shpataKordhes')
assert.ok(asList(edge('kordha2', 'kordhaFund')?.requires).includes('shpataKordhes'))
for (const itemId of ['zogShqiponje', 'shpataKordhes']) assert.ok(ITEMS[itemId], `missing reviewed item ${itemId}`)
for (const factId of ['rozafaCastleRaised', 'artaBridgeUnbuilt', 'artaBridgeRaised']) {
  assert.ok(WORLD_FACT_PRESENTATION[factId], `missing world presentation for ${factId}`)
}
assert.deepEqual(FESTIVAL_IDS, Object.keys(OBSERVANCES), 'observance ids drifted from their shared registry')
assert.equal(STORY.maja.options.find((option) => option.date === 'tomorriPilgrimage')?.to, 'maja')

const counts = Object.values(REVIEW).reduce((out, [status]) => ({ ...out, [status]: (out[status] || 0) + 1 }), {})
console.log(`✅ mechanics review covers ${tales.length} full tales and ${FOLKLORE.length} lore cards`)
console.log(`✅ timed-world-fixture system has ${activatedFixtures.size} authored expressions: ${[...activatedFixtures].join(', ')}`)
console.log(`✅ generalized mechanics are playable: ${authoredInteractions.length} scoped interactions · ${genericItemGates.size} capability gates · ${Object.values(typedEffectCounts).reduce((sum, count) => sum + count, 0)} typed effects`)
console.log(`✅ review dispositions: ${Object.entries(counts).map(([key, value]) => `${value} ${key}`).join(', ')}`)
console.log('✅ lore-shaped upgrades: wounded health, milk healing, eaglet/salt/soul-sword items, castle/bridge memories')
