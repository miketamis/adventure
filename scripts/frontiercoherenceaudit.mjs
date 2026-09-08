import assert from 'node:assert/strict'
import { STORY } from '../src/game/content.js'
import { NODE_POS, PLACE_OF } from '../src/components/nodePositions.js'
import { PLACE_META } from '../src/components/placeMeta.js'
import { NODE_REGION } from '../src/game/regions.js'
import { WORLD_FACT_PRESENTATION } from '../src/game/environment.js'
import kreshnikEpic from '../src/game/data/tales/kreshnik-epic.js'
import mujiBehuri from '../src/game/data/tales/muji-e-behuri.js'

const samePlace = (scene, anchor) =>
  assert.equal(PLACE_OF[scene], anchor, `${scene}: expected to stand at ${anchor}`)

const differentPlace = (a, b) =>
  assert.notDeepEqual(NODE_POS[a], NODE_POS[b], `${a}/${b}: distinct tale-sites were collapsed`)

const cardScenes = (anchor) => new Set(
  (PLACE_META[anchor]?.happenings || []).flatMap(({ nodes }) => nodes),
)

const expectsCard = (anchor, scenes) => {
  const listed = cardScenes(anchor)
  for (const scene of scenes)
    assert.ok(listed.has(scene), `${scene}: missing from ${anchor}'s location card`)
}

const expectsFact = (ending, fact, region = 'mountain') => {
  assert.ok(STORY[ending]?.worldEffects?.includes(fact), `${ending}: missing ${fact}`)
  const presentation = WORLD_FACT_PRESENTATION[fact]
  assert.ok(presentation?.text && presentation?.icon, `${fact}: missing ambient presentation`)
  assert.ok(presentation.regions.includes(region), `${fact}: not visible in its ${region} region`)
}

const conditionsAt = (nodeId) => new Set(
  (STORY[nodeId]?.text || []).flatMap((entry) => {
    if (!entry || typeof entry !== 'object' || !('cond' in entry)) return []
    return Array.isArray(entry.cond) ? entry.cond : [entry.cond]
  }),
)

// Halili's rescue starts and can be refused at his Jutbina door; calling the
// guard fails at the foreign prison. The two Krajl prisons are deliberately
// separate because the songs give them incompatible captives and escapes.
samePlace('kreshnikRrembimiRefuz', 'kreshnikRrembimi1')
samePlace('kreshnikRrembimiHumbur', 'kreshnikRrembimiFund')
differentPlace('kreshnikRrembimiBurg', 'osmaniBurg')
differentPlace('kreshnikRrembimiBurg', 'rusha1')
expectsCard('kreshnikRrembimi1', ['kreshnikRrembimi1', 'kreshnikRrembimiRefuz'])
expectsCard('kreshnikRrembimiBurg', ['kreshnikRrembimiBurg'])
expectsCard('kreshnikRrembimiFund', ['kreshnikRrembimiFund', 'kreshnikRrembimiHumbur'])
expectsFact('kreshnikRrembimiFund', 'mujoFreedFromKrajl')
assert.equal(STORY.kreshnikRrembimiFund.returnTo, 'jutbina')
// Declining the invented companion role must not erase the source hero's
// agency. Halili rides alone in the selected song, so both counterfactual
// player mistakes remember the same rescue while withholding only the
// player's participation. Closing any version returns to the home named by
// its final prose rather than teleporting to the generic crossroads.
for (const ending of ['kreshnikRrembimiHumbur', 'kreshnikRrembimiRefuz']) {
  assert.equal(STORY[ending].end, 'secret')
  expectsFact(ending, 'mujoFreedFromKrajl')
  assert.equal(STORY[ending].returnTo, 'jutbina')
}
assert.match(STORY.kreshnikRrembimiRefuz.blurb, /rode alone|rides alone/i)

// Behuri's route is a real spatial sequence: oda, pasture, Xhuri spring,
// captain's kulla, open mejdan, and the road home. Each counterfactual defeat
// remains at the choice-site where it occurs instead of teleporting every
// failure into one generic ending place.
samePlace('behuriJutbina', 'odaJutbina')
samePlace('behuriKotorHumbur', 'behuriNdarja')
samePlace('behuriBurimHumbur', 'behuriBurimi')
samePlace('behuriKullaHumbur', 'behuriKulla')
samePlace('behuriMejdanHumbur', 'behuriMejdan')
for (const [anchor, scenes] of [
  ['behuriNdarja', ['behuriNdarja', 'behuriKotorHumbur']],
  ['behuriBurimi', ['behuriBurimi', 'behuriBurimHumbur']],
  ['behuriKulla', ['behuriKulla', 'behuriKullaHumbur']],
  ['behuriMejdan', ['behuriMejdan', 'behuriMejdanHumbur']],
]) expectsCard(anchor, scenes)

for (const scene of [
  'kreshnikRrembimi1', 'kreshnikRrembimiBurg', 'kreshnikRrembimiFund',
  'behuriJutbina', 'behuriNdarja', 'behuriBurimi', 'behuriKulla',
  'behuriMejdan', 'behuriFund',
]) assert.equal(NODE_REGION[scene], 'mountain', `${scene}: left the northern frontier region`)

for (const [a, b] of [
  ['behuriNdarja', 'behuriBurimi'],
  ['behuriBurimi', 'behuriKulla'],
  ['behuriKulla', 'behuriMejdan'],
  ['behuriMejdan', 'behuriFund'],
]) differentPlace(a, b)

differentPlace('behuriKulla', 'kreshnikRrembimiBurg')
differentPlace('behuriKulla', 'osmaniBurg')
expectsFact('behuriFund', 'behuriKullaDestroyed')
assert.equal(STORY.behuriFund.returnTo, 'jutbina')

// The two endings leave more than a badge: news travels back to the oda. Once
// both frontier songs are complete, carrying any playable item reveals a
// deliberately easy-to-miss new verse. It is a run-limited interaction at the
// same site, not a farmable reward or an unexplained menu unlock.
const odaConditions = conditionsAt('odaJutbina')
assert.ok(odaConditions.has('fact:mujoFreedFromKrajl'), 'the oda never acknowledges Mujo returning home')
assert.ok(odaConditions.has('fact:behuriKullaDestroyed'), "the oda never acknowledges Behuri's ruined kulla")
const frontierVerse = STORY.odaJutbina.options.find((option) =>
  option.effects?.some((effect) => effect.type === 'learn' && effect.id === 'frontierNewVerse'))
assert.ok(frontierVerse, 'the earned frontier verse is missing from the oda')
for (const requirement of [
  'fact:mujoFreedFromKrajl',
  'fact:behuriKullaDestroyed',
  'affords:play',
]) assert.ok(frontierVerse.requires?.includes(requirement), `frontier verse missing ${requirement} gate`)
assert.equal(frontierVerse.to, 'odaJutbina', 'the frontier verse leaves its performance site')
assert.deepEqual(frontierVerse.interaction, { id: 'frontierNewVerse', scope: 'run', once: true })

// The new waterwork scene does not create a phantom location. It remains at
// the Blue Eye source, while the site's semantic region is river rather than
// whatever the coordinate heuristic would infer from the nearby forest.
samePlace('syriKanali', 'udhaSyri')
samePlace('syriFund', 'udhaSyri')
expectsCard('udhaSyri', ['udhaSyri', 'syriKanali', 'syriFund'])
for (const scene of ['udhaSyri', 'syriKanali', 'syriFund'])
  assert.equal(NODE_REGION[scene], 'river', `${scene}: Blue Eye source left the river region`)
expectsFact('syriFund', 'blueEyeOpened', 'river')
expectsFact('syriFund', 'blueEyeChannelOpened', 'river')

for (const [tale, expected] of [
  [kreshnikEpic, ['kreshnikRrembimi1', 'kreshnikRrembimiBurg', 'kreshnikRrembimiFund']],
  [mujiBehuri, ['behuriJutbina', 'behuriNdarja', 'behuriBurimi', 'behuriKulla', 'behuriMejdan', 'behuriFund']],
]) {
  for (const scene of expected)
    assert.ok(tale.play?.scenes?.[scene], `${tale.id}: ${scene} is not tied to a source beat`)
}

console.log('✓ frontier coherence: 15 frontier sites, the Blue Eye waterwork, two persistent outcomes, an earned hidden verse, and two source projections verified')
