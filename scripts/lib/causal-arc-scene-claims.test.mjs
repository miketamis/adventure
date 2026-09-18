import assert from 'node:assert/strict'
import { WORLD_SCENE_3D_NODE_CLAIMS } from '../../src/game/data/worldScene3dNodeClaims.js'
import { buildWorldNodeScene } from '../../src/game/worldScene3dNodes.js'
import { buildAssetParts } from '../../src/game/worldScene3dAssets.js'

// This is a semantic cross-check of the edited causal arcs, not a generated
// text seal. Exact text/conditions still have the complete production validator.
function assertCausalClaimSemantics(rows) {
  const byId = new Map(rows.map((row) => [row.id, row]))
  const row = (node, line) => {
    const value = byId.get(`description:${node}:${line}`)
    assert.ok(value, `${node}:${line}: missing reviewed causal claim`)
    return value
  }
  const externalHumans = (claim) => claim.objects.filter(({ asset }) => asset === 'human').reduce((n, { count }) => n + count, 0)
  for (const claim of rows.filter(({ nodeId }) => nodeId.startsWith('kordha'))) {
    assert.ok(claim.objects.every(({ attributes }) => Object.keys(attributes || {}).every((key) => !key.startsWith('sourceSource'))), `${claim.id}: recursively copied authoring color fields are not physical attributes`)
  }
  assert.equal(externalHumans(row('kordha1', 0)), 2, 'Kordha is the player, with exactly two companions')
  assert.equal(externalHumans(row('kordhaPallat', 3)), 2, 'only two brothers raise weapons beside Kordha')
  for (const companion of ['actor:kordha-jumper', 'actor:kordha-diver']) {
    assert.ok(row('kordhaPallat', 3).relations.some(({ subject, kind, target }) =>
      subject === companion && kind === 'inside' && target === 'feature:kordha-palace'),
    'the companions remain inside the same palace as the player')
  }
  assert.equal(row('kordha2', 1).disposition, 'offstage', 'the brothers guard the feather far away')
  assert.deepEqual(row('kordha2', 1).objects, [])
  assert.deepEqual(row('kordha2', 2).objects, [], 'the remote warning feather is not here')
  assert.ok(row('kordha2', 4).objects.some(({ key }) => key === 'actor:kordha-bukura'), 'Bukura asks about the sword')
  for (const i of [2, 3]) {
    assert.equal(row('kordhaDeti', i).disposition, 'reported', 'the brothers recount the earlier theft and rescue')
    assert.deepEqual(row('kordhaDeti', i).objects, [], 'a reported crone, sea or bloody signal is not current palace geometry')
  }
  assert.ok(row('kordhaDeti', 4).states.some(({ key, property, value }) => key === 'viewer' && property === 'health' && value === 'healthy'))
  assert.deepEqual(row('rushaFund', 0).conditions.all, ['arrival:action:rusha-request-besa', 'flag:rushaOathRequested'], 'legacy promise arrivals must not become the new request')
  assert.equal(row('rusha1', 0).objects.find(({ key }) => key === 'krajl-tower-room')?.attributes.interior, true)
  assert.ok(row('rusha1', 0).relations.some(({ subject, kind, target }) => subject === 'viewer' && kind === 'inside' && target === 'krajl-tower-room'), 'entering the tower places the viewer inside')
  assert.ok(row('rusha1', 1).relations.some(({ subject, kind, target }) => subject === 'actor:rusha' && kind === 'inside' && target === 'krajl-tower-room'), 'Rusha offers coffee in the same room')
  assert.deepEqual(row('rushaFund', 2).objects.map(({ asset }) => asset), ['cup'], 'the cup remains; no Jutbina journey follows the oath')
  assert.ok(row('balozLufte', 4).objects.some(({ asset }) => asset === 'horse'), 'the horse exists before the weapon dodge')
  assert.deepEqual(row('balozKoke', 0).conditions.all, ['arrival:action:baloz-stand-by-hero', 'flag:stoodByGjergj'], 'the guarded action is standing beside Gjergj')
  assert.equal(row('balozKoke', 0).placeId, 'balozLufte', 'standing beside the hero does not move the battle')
  assert.equal(row('balozFitore', 0).placeId, 'bregu', 'the return reaches the original siblings’ tower')
  assert.ok(row('balozKoke', 1).states.some(({ key, property, value }) => key === 'alia-horse' && property === 'pose' && value === 'kneeling'), 'the horse, not the player, avoids the weapon')
  assert.ok(row('balozKoke', 2).relations.some(({ subject, kind, target }) => subject === 'actor:gjergj-elez-alia' && kind === 'holds' && target === 'alia-sword'), 'Gjergj owns the sword attack')
  for (const node of ['agaYmer2', 'agaYmerStay', 'agaYmerFund']) {
    assert.ok(rows.filter(({ nodeId }) => nodeId === node).every(({ disposition, objects }) => disposition === 'reported' && !objects.length), 'Aga Ymer’s tale events must not become actors at the storyteller’s house')
  }
  assert.ok(row('bleta1', 1).states.some(({ key, property, value }) => key === 'viewer' && property === 'role' && value === 'one-of-three-daughters'))
  for (const [node, line, form] of [['bletaFund', 1, 'bee'], ['merimangaFund', 1, 'spider'], ['gjinkallaFund', 1, 'cicada']]) {
    assert.ok(row(node, line).states.some(({ key, property, value }) => key === 'viewer' && property === 'form' && value === form), `${node}: transform the embodied daughter`)
    assert.ok(rows.filter(({ nodeId }) => nodeId === node).flatMap(({ objects }) => objects).every(({ asset }) => !['bee', 'spider', 'cicada'].includes(asset)), `${node}: do not duplicate the transformed player`)
  }
  assert.ok(row('merimangaFund', 0).objects.every(({ asset }) => asset !== 'web'), 'weaving the rug precedes the spider curse')
  assert.ok(row('merimangaFund', 2).objects.some(({ asset }) => asset === 'web'), 'the spider’s unfinished web is the actual final prop')
  assert.equal(row('gjizarKthim', 0).disposition, 'historical', 'the rope rescue precedes arrival at home')
  assert.deepEqual(row('gjizarKthim', 0).objects, [], 'the rescue well must not move to the home')
  assert.ok(row('gjizarKthim', 2).objects.some(({ key }) => key === 'actor:gjizar-father'), 'the father supplies the retrospective account')
  for (const line of [3, 4]) {
    assert.equal(row('gjizarKthim', line).disposition, 'reported')
    assert.deepEqual(row('gjizarKthim', line).objects, [], 'the reported execution and cannon do not happen in the home scene')
  }
  assert.ok(row('gjizarKthim', 6).objects.some(({ asset }) => asset === 'horse'), 'the ship journey has an established mount')
  assert.ok(row('gjizarKthim', 6).objects.every(({ asset, key }) => asset !== 'ship' && key !== 'actor:gjizar-bukura'), 'the ship and Beauty await the journey, away from home')
  assert.equal(row('gjizarKthim', 6).placeId, 'gjizarKthim')
  assert.equal(row('gjizarAnija', 0).placeId, null, 'the ship has no invented map position')
  assert.deepEqual(row('gjizarAnija', 0).conditions.all, ['from:gjizarKthim', 'arrival:action:gjizar-ride-to-ship'])
  assert.ok(row('gjizarAnija', 1).objects.some(({ asset }) => asset === 'ship'), 'Beauty asks her question aboard her ship')
  assert.ok(row('gjizarFund', 0).conditions.all.includes('arrival:action:gjizar-tell-truth'))
  assert.equal(row('gjizarFund', 2).conditions.negate, true, 'the historical-save conclusion is only the fallback')
  assert.equal(row('gjizarFund', 2).disposition, 'reported')
  assert.deepEqual(row('gjizarFund', 2).objects, [], 'a legacy conclusion proves no new journey or physical site')
}

export function runCausalArcSceneClaimAssertions() {
  assertCausalClaimSemantics(WORLD_SCENE_3D_NODE_CLAIMS)
  const scene = (node) => buildWorldNodeScene(node)
  assert.equal(scene('kordha1').objects.filter(({ asset }) => asset === 'human').length, 2)
  assert.equal(scene('kordha2').objects.filter(({ asset }) => asset === 'human').length, 1)
  const palaceScene = scene('kordhaPallat')
  const palace = palaceScene.objects.find(({ key }) => key === 'feature:kordha-palace')
  const floor = buildAssetParts(palace.asset, palace.attributes).find(({ id }) => id === 'floor')
  for (const companion of palaceScene.objects.filter(({ asset }) => asset === 'human')) {
    assert.ok(palaceScene.relations.some(({ subject, kind, geometryStatus }) =>
      subject === companion.key && kind === 'inside' && geometryStatus === 'modeled'))
    for (const axis of [0, 2]) assert.ok(Math.abs(companion.position[axis] - palace.position[axis]) < floor.size[axis] * palace.scale[axis] / 2,
      `${companion.key}: a beside-the-player companion cannot stand beyond the palace walls`)
  }
  assert.ok(scene('kordhaDeti').objects.every(({ asset, key }) => asset !== 'sea' && asset !== 'feather' && key !== 'actor:kordha-old-woman'))
  assert.ok(scene('kordhaFund').objects.every(({ asset }) => asset !== 'human'), 'safe silence does not start a brothers’ fight')
  assert.ok(scene('balozLufte').objects.every(({ attributes }) => !attributes.headless && attributes.pose !== 'dead'), 'the setup cannot show the chosen victory')
  assert.ok(scene('balozKoke').objects.every(({ key }) => key !== 'baloz-stone'), 'the old stone-interception prop is retired')
  assert.ok(scene('rushaFund').objects.every(({ key }) => key !== 'jutbina-towers'))
  const tower = scene('rusha1'), room = tower.objects.find(({ key }) => key === 'krajl-tower-room')
  assert.equal(room.position[0], tower.camera.eye[0])
  assert.equal(room.position[2], tower.camera.eye[2])
  assert.ok(tower.relations.some(({ subject, kind, geometryStatus }) => subject === 'actor:rusha' && kind === 'inside' && geometryStatus === 'modeled'))
  assert.equal(scene('bleta1').objects.filter(({ asset }) => asset === 'human').length, 1, 'only the mother has an unambiguous external identity before the daughter choice')
  for (const [node, form] of [['bletaFund', 'bee'], ['merimangaFund', 'spider'], ['gjinkallaFund', 'cicada']]) assert.equal(scene(node).viewer.form, form)
  const home = scene('gjizarKthim')
  assert.equal(home.viewer.voice, 'restored', 'the final home state follows the reported delay')
  assert.ok(home.objects.every(({ key, asset }) => !['well', 'rope', 'cannon', 'ship'].includes(asset) && key !== 'actor:gjizar-bukura'), 'home cannot stage the rescue, reported violence or ship interview')
  assert.ok(scene('gjizarAnija').objects.some(({ asset }) => asset === 'ship'))
  let corruptions = 0
  const reject = (node, line, mutate) => {
    const rows = structuredClone(WORLD_SCENE_3D_NODE_CLAIMS)
    mutate(rows.find(({ id }) => id === `description:${node}:${line}`))
    assert.throws(() => assertCausalClaimSemantics(rows), assert.AssertionError, `${node}:${line}: unsupported narrative claim must fail`)
    corruptions += 1
  }
  reject('kordha1', 0, (row) => { row.objects.find(({ asset }) => asset === 'human').count = 2 })
  reject('kordhaPallat', 3, (row) => { row.relations.pop() })
  reject('kordhaMoat', 2, (row) => { row.objects[0].attributes.sourceSourceColor = 'black' })
  reject('kordha2', 1, (row) => { row.disposition = 'physical' })
  reject('kordhaDeti', 2, (row) => { row.objects.push({ asset: 'sea' }) })
  reject('rushaFund', 0, (row) => { row.conditions.all.pop() })
  reject('rusha1', 0, (row) => { row.relations = [] })
  reject('rushaFund', 2, (row) => { row.objects.push({ asset: 'tower' }) })
  reject('balozKoke', 1, (row) => { row.states = [] })
  reject('balozKoke', 2, (row) => { row.relations[0].subject = 'viewer' })
  reject('bletaFund', 1, (row) => { row.states = [] })
  reject('merimangaFund', 2, (row) => { row.objects = [{ asset: 'cicada' }] })
  reject('gjizarKthim', 4, (row) => { row.objects.push({ asset: 'cannon' }) })
  reject('gjizarKthim', 6, (row) => { row.objects.push({ asset: 'ship' }) })
  reject('gjizarAnija', 0, (row) => { row.placeId = 'gjizarKthim' })
  reject('gjizarFund', 2, (row) => { row.objects.push({ asset: 'ship' }) })
  return { corruptions }
}
