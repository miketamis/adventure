// Focused release audit for the R–Z mechanics review. These assertions keep
// the lasting outcomes, incompatibilities and source projections attached to
// the endings that created them.

import assert from 'node:assert/strict'
import { STORY } from '../src/game/content.js'
import {
  WORLD_FACT_INCOMPATIBLE,
  WORLD_FACT_PRESENTATION,
} from '../src/game/environment.js'
import swallow from '../src/game/data/tales/swallow.js'
import blueEye from '../src/game/data/tales/syri-kalter.js'
import tomorShpirag from '../src/game/data/tales/tomor-shpirag.js'
import zuku from '../src/game/data/tales/zuku-bajraktar.js'

const VALID_REGIONS = new Set([
  'sky', 'mountain', 'forest', 'river', 'castle',
  'lake', 'sea', 'underworld', 'village', 'princeland',
])

const reviewedFacts = [
  'swallowNestsProtected',
  'swallowHumanBloodRevealed',
  'tomorShpiragBattleScars',
  'osumBornFromBeautyTears',
  'blueEyeOpened',
  'blueEyeChannelOpened',
  'zukuSightRestored',
  'zukuBesaAlly',
  'cuckooSisterBird',
  'cuckooSisterFlower',
  'coastalBalozDefeated',
  'argjiroMilkStone',
  'gjirokasterArgjiroName',
  'argjiroLegendUnmade',
  'gjakovaOraSlain',
  'gjakovaCavernWaterFouled',
  'dervishBearDefeated',
]

for (const id of reviewedFacts) {
  const presentation = WORLD_FACT_PRESENTATION[id]
  assert.ok(presentation, `${id}: missing persistent presentation`)
  assert.ok(presentation.icon && presentation.text, `${id}: presentation is incomplete`)
  assert.ok(Array.isArray(presentation.regions) && presentation.regions.length > 0, `${id}: no region`)
  assert.ok(presentation.regions.every((region) => VALID_REGIONS.has(region)), `${id}: invalid region`)
}

for (const [id, conflicts] of Object.entries(WORLD_FACT_INCOMPATIBLE)) {
  assert.ok(WORLD_FACT_PRESENTATION[id], `${id}: incompatible fact has no presentation`)
  assert.ok(Array.isArray(conflicts) && conflicts.length > 0, `${id}: empty incompatibility declaration`)
  assert.equal(new Set(conflicts).size, conflicts.length, `${id}: duplicate incompatible fact`)
  for (const other of conflicts) {
    assert.notEqual(id, other, `${id}: fact cannot conflict with itself`)
    assert.ok(WORLD_FACT_PRESENTATION[other], `${id}/${other}: conflict target has no presentation`)
    assert.ok(WORLD_FACT_INCOMPATIBLE[other]?.includes(id), `${id}/${other}: conflict is not symmetric`)
  }
}

assert.deepEqual(WORLD_FACT_INCOMPATIBLE.swallowNestsProtected, ['swallowHumanBloodRevealed'])
assert.deepEqual(WORLD_FACT_INCOMPATIBLE.cuckooSisterBird, ['cuckooSisterFlower'])
assert.deepEqual([...WORLD_FACT_INCOMPATIBLE.argjiroLegendUnmade].sort(), [
  'argjiroMilkStone',
  'gjirokasterArgjiroName',
])

for (const tale of [swallow, blueEye, tomorShpirag, zuku]) {
  const beatIds = new Set(tale.beats.map((beat) => beat.id))
  for (const [nodeId, mapped] of Object.entries(tale.play?.scenes || {})) {
    assert.ok(STORY[nodeId], `${tale.id}: scene mapping invents node ${nodeId}`)
    for (const beatId of Array.isArray(mapped) ? mapped : [mapped])
      assert.ok(beatIds.has(beatId), `${tale.id}: scene ${nodeId} maps unknown beat ${beatId}`)
  }
  for (const [beatId, routes] of Object.entries(tale.play?.learn || {})) {
    assert.ok(beatIds.has(beatId), `${tale.id}: learn route maps unknown beat ${beatId}`)
    for (const [nodeId, note] of routes) {
      assert.ok(STORY[nodeId], `${tale.id}: learn route invents node ${nodeId}`)
      assert.ok(String(note).trim(), `${tale.id}: learn route ${nodeId} has no source note`)
    }
  }
}

assert.equal(tomorShpirag.play.scenes.tsRast, 'chance')
assert.equal(tomorShpirag.play.scenes.shpiragFund, 'end')
assert.equal(zuku.play.learn.blinding[0][0], 'zuku1')
assert.equal(zuku.play.learn.healing[0][0], 'zuku2')
assert.ok(blueEye.play.divergences.some(({ note }) => /channel.+game/i.test(note)))

console.log(`✓ R–Z world support: ${reviewedFacts.length} facts and four source projections verified`)
