// Editorial + structural audit for the game's mechanics coverage. The review
// ledger makes every fully researched tale an explicit design decision: rich
// simulations use many systems, while short source-shaped tales are allowed to
// stay focused. Run with the normal experience audit.
import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import { ITEMS, STORY } from '../src/game/content.js'
import { EMBODIMENT_QUESTS } from '../src/game/embodiment.js'
import { FOLKLORE } from '../src/game/folklore.js'
import { WORLD_FACT_PRESENTATION } from '../src/game/environment.js'
import { TIMED_WORLD_FIXTURES, parseFixtureCondition } from '../src/game/worldFixtures.js'

const REVIEW = Object.freeze({
  'aga-ymer': ['focused', 'The six-day release and return are an oath choice; extra props would distract from besa.'],
  'ali-bajraktari': ['focused', 'The second besa is carried by role, deadline and consequence, not loot.'],
  'ali-pashe-tepelena': ['focused', 'The claimed pardon is a trust decision; an invented economy layer would falsify the witness.'],
  'argjiro-gjirokastra': ['focused', 'Siege, leap and the naming of the castle already join place, role and consequence.'],
  'arnaut-osmani': ['focused', 'Captivity and the Krajl choice stay a compact character trial.'],
  'bear-dervish': ['focused', 'A short animal warning works as companion choice and consequence.'],
  'bee-spider-cicada': ['focused', 'Three work styles are expressed through repeated choices rather than inventory.'],
  binoshet: ['rich', 'Its long rescue uses travel, night, items, combat stages, roles and lasting restored-water facts.'],
  'constantine-doruntine': ['focused', 'The grave-return ballad relies on witness, route, oath and atmosphere.'],
  'creation-wolf': ['focused', 'A concise etiological legend is best delivered as witnessed cause and result.'],
  cuckoo: ['focused', 'The transformation story uses role and branching without unrelated survival systems.'],
  'death-of-omer': ['focused', 'Ajkuna’s lament is witnessed; gamifying grief with objects or money would weaken it.'],
  'gjakova-cavern': ['rich', 'Arrival, darkness, item gating and the guarded dead city reinforce exploration.'],
  'gjergj-elez-alia': ['rich', 'Companionship, wounds, coastal threat and staged confrontation carry the ballad.'],
  'gjeto-basho-muji': ['upgraded', 'Mujo now begins at one heart and physically drinks the Zanas’ carried milk to recover.'],
  gjizar: ['focused', 'Night, song and transformation provide the tale’s natural mechanical vocabulary.'],
  'goose-girl': ['focused', 'Identity and recognition unfold as role choices across the palace scenes.'],
  'half-rooster': ['focused', 'The compact journey keeps its companion logic and comic consequence.'],
  'halil-garria': ['focused', 'The call beyond death is an oath decision; invented errands would pad the song.'],
  'halil-marriage': ['focused', 'Witnessed abduction and rescue use travel, choice and the Kreshnik cast.'],
  'kostandini-i-vogel': ['focused', 'The captive’s promised return stays a short deadline-and-besa role.'],
  'kreshnik-epic': ['focused', 'The rescue is a companion-scale doorway into the larger Kreshnik cycle.'],
  'kuma-lisa': ['focused', 'The honey-pot deception is a short social choice, not an inventory puzzle.'],
  'legjenda-e-prespes': ['rich', 'The warning changes the lake world differently for obedience and refusal.'],
  'maiden-promised-sun': ['rich', 'A long companion journey uses moving characters, items, travel, danger, arrival and time.'],
  'maro-perhitura': ['rich', 'Work, money, health, routes, NPC schedules and the timed mill lamp make the night mill lived-in.'],
  'muji-e-behuri': ['rich', 'The Jutbina hub connects rumor, NPC, economy, travel and multiple Kreshnik tales.'],
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
  swallow: ['focused', 'A compact transformation legend uses direct choice and consequence.'],
  'syri-kalter': ['rich', 'Items, seasonal danger, water and lasting spring facts all fit the Blue Eye legend.'],
  'three-friends': ['upgraded', 'Kordha’s external soul is now the specific sword carried through the secrecy choice.'],
  'tomor-shpirag': ['rich', 'Two identities, mountain routes, item decisions, battle and environmental consequence support the giants.'],
  'tomorri-pilgrimage': ['focused', 'Pilgrimage is grounded in the summit route, offering and living calendar; no invented side errand is added.'],
  tortoise: ['focused', 'Hospitality and sharing remain a social choice; treating the guest as a resource would spoil the fable.'],
  'ura-e-artes': ['upgraded', 'Mercy or immurement now leaves mutually exclusive permanent bridge states in the world.'],
  'zuku-bajraktar': ['focused', 'Rusha’s freely sworn besa is the point; the compact role avoids invented combat or payment.'],
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

assert.equal(tales.length, 47, 'the review baseline must cover all 47 full tale records')
assert.equal(FOLKLORE.length, 140, 'the lore-library baseline changed; review its mechanics disposition')
assert.deepEqual(new Set(Object.keys(REVIEW)), taleIds, 'every full tale must have exactly one mechanics review')

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
  for (const option of node.options || []) if (option.activateFixture) {
    const fixture = TIMED_WORLD_FIXTURES[option.activateFixture]
    assert.ok(fixture, `${nodeId}: activates unknown fixture ${option.activateFixture}`)
    assert.equal(nodeId, fixture.nodeId, `${nodeId}: activates ${option.activateFixture} away from its place`)
    activatedFixtures.add(option.activateFixture)
  }
  for (const entry of node.text || []) if (!Array.isArray(entry)) {
    for (const id of asList(entry.cond)) if (id?.startsWith?.('fixture:')) {
      assert.ok(parseFixtureCondition(id), `${nodeId}: invalid fixture condition ${id}`)
    }
  }
}
assert.deepEqual(activatedFixtures, new Set(Object.keys(TIMED_WORLD_FIXTURES)), 'every timed fixture needs an authored activation')

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

const counts = Object.values(REVIEW).reduce((out, [status]) => ({ ...out, [status]: (out[status] || 0) + 1 }), {})
console.log(`✅ mechanics review covers ${tales.length} full tales and ${FOLKLORE.length} lore cards`)
console.log(`✅ timed-world-fixture system has ${activatedFixtures.size} authored expressions: ${[...activatedFixtures].join(', ')}`)
console.log(`✅ review dispositions: ${Object.entries(counts).map(([key, value]) => `${value} ${key}`).join(', ')}`)
console.log('✅ lore-shaped upgrades: wounded health, milk healing, eaglet/salt/soul-sword items, castle/bridge memories')
