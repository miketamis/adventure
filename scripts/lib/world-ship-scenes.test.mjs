import assert from 'node:assert/strict'
import { STORY } from '../../src/game/content.js'
import { newRun } from '../../src/game/gameState.js'
import { UNCHARTED_SITES, unchartedSiteContextForState } from '../../src/game/unchartedSites.js'
import { NODE_POS } from '../../src/components/nodePositions.js'
import { buildWorldNodeScene, validateWorldNodeScene } from '../../src/game/worldScene3dNodes.js'
import { compileWorldNodeGeometry } from '../../src/components/worldScene3dNodeRenderer.js'
import { worldNodeEyeObstructions } from './world-node-spatial.test.mjs'

const SHIP = 'gjizar-beauty-ship'
const BEAUTY = 'actor:gjizar-bukura'
const near = (a, b) => Math.abs(a - b) < 1e-7
const mesh = (object) => compileWorldNodeGeometry({ objects: [object] }).faces
const vertices = (faces) => faces.flatMap(({ vertices: points }) => points)
const bounds = (points, axis) => [Math.min(...points.map((p) => p[axis])), Math.max(...points.map((p) => p[axis]))]

function assertUnknownWorldPosition(scene) {
  assert.equal(scene.localOnly, true, 'ship reconstruction must remain explicitly local')
  assert.equal(scene.camera.space, 'unlocated-local')
  assert.equal(scene.location.placeId, null)
  assert.equal(scene.location.position, null, 'boarding a source-bound ship does not invent chart coordinates')
  assert.deepEqual([scene.camera.eye[0], scene.camera.eye[2]], [0, 0], 'deck height must not move the unknown site to invented map coordinates')
  assert.ok(scene.objects.every(({ placement }) => placement.authority === 'unlocated-local-staging'))
}

function assertAboard(scene) {
  assertUnknownWorldPosition(scene)
  assert.deepEqual(validateWorldNodeScene(scene), [], `${scene.nodeId}: malformed ship scene`)
  const ship = scene.objects.find(({ key }) => key === SHIP)
  const beauty = scene.objects.find(({ key }) => key === BEAUTY)
  assert.ok(ship, `${scene.nodeId}: the ongoing ship setting disappeared`)
  assert.ok(beauty, `${scene.nodeId}: the speaking Beauty disappeared`)
  const deck = vertices(mesh(ship).filter(({ partId }) => partId === 'ship-deck'))
  assert.ok(deck.length, 'the ship needs an actual standing deck, not a hull or mast-top proxy')
  const deckTop = bounds(deck, 1)[1]
  assert.ok(near(scene.camera.eye[1] - 1.7, deckTop), 'the embodied viewer must stand on the actual deck')
  const beautyVertices = vertices(mesh(beauty))
  assert.ok(near(bounds(beautyVertices, 1)[0], deckTop), 'Beauty’s feet must meet the same deck as the viewer')
  for (const axis of [0, 2]) {
    const [low, high] = bounds(deck, axis)
    assert.ok(scene.camera.eye[axis] > low && scene.camera.eye[axis] < high, 'viewer is beside the ship rather than aboard')
    const body = bounds(beautyVertices, axis)
    assert.ok(body[0] >= low && body[1] <= high, 'Beauty stands beyond the deck edge')
  }
  assert.deepEqual(worldNodeEyeObstructions({ ...scene, objects: [ship] }), [], 'ship mast, sail or hull obstructs the embodied viewer')
  for (const subject of ['viewer', BEAUTY]) assert.ok(scene.relations.some((r) =>
    r.subject === subject && r.kind === 'on' && r.target === SHIP && r.geometryStatus === 'modeled'),
  `${subject}: source-to-deck relationship is missing`)
  assert.ok(ship.claimIds.every((id) => scene.descriptions.find((d) => d.id === id)?.active), 'ship setting was supplied by an inactive or unrelated scene')
  return ship
}

function assertLegacy(scene) {
  assertUnknownWorldPosition(scene)
  assert.deepEqual(scene.objects, [], 'a historical-save ending proves no new journey, ship site or wedding venue')
  assert.ok(scene.descriptions.find(({ id }) => id === 'description:gjizarFund:2')?.active)
  assert.ok(!scene.descriptions.find(({ id }) => id === 'description:gjizarFund:0')?.active)
}

// Wired by worldscene3daudit: test the physical support and exact current/legacy
// source branches, not just the presence of a ship key in an inventory.
export function runWorldShipSceneAssertions() {
  const site = UNCHARTED_SITES.find(({ id }) => id === SHIP)
  assert.ok(site)
  assert.deepEqual(site.nodes, ['gjizarAnija', 'gjizarFund'])
  assert.equal(site.transitions.find(({ id }) => id === 'gjizar-answer-on-ship')?.durationHours, 0)
  let views = 0
  for (const nodeId of site.nodes) {
    assert.equal(NODE_POS[nodeId], undefined)
    const baseline = buildWorldNodeScene(nodeId)
    assertAboard(baseline); views++
    for (const description of baseline.descriptions) {
      const witness = buildWorldNodeScene(nodeId, { selectedDescriptionId: description.id })
      if (description.id === 'description:gjizarFund:2') assertLegacy(witness)
      else assertAboard(witness)
      views++
    }
  }
  const liveShips = []
  for (const transition of site.transitions) {
    const choiceIndex = STORY[transition.from].options.findIndex((o) => o.to === transition.to)
    const state = { ...newRun(), nodeId: transition.to, cameFrom: transition.from, choiceIndex,
      ended: STORY[transition.to].end || null }
    assert.equal(unchartedSiteContextForState(state, STORY)?.site, site)
    const scene = buildWorldNodeScene(state.nodeId, { state })
    assert.equal(scene.mode, 'live')
    liveShips.push(assertAboard(scene)); views++
  }
  assert.deepEqual(liveShips.map(({ position, scale, rotationY }) => ({ position, scale, rotationY })),
    [0, 1].map(() => ({ position: liveShips[0].position, scale: liveShips[0].scale, rotationY: liveShips[0].rotationY })),
    'the zero-time reply moved or replaced the ship')
  const legacyState = { ...newRun(), nodeId: 'gjizarFund', cameFrom: 'gjizarTradheti', choiceIndex: 0, ended: STORY.gjizarFund.end }
  assert.equal(unchartedSiteContextForState(legacyState, STORY), null)
  assertLegacy(buildWorldNodeScene('gjizarFund', { state: legacyState })); views++

  let corruptions = 0
  const reject = (mutate, message) => {
    const scene = structuredClone(buildWorldNodeScene('gjizarAnija'))
    mutate(scene)
    assert.throws(() => assertAboard(scene), message)
    corruptions++
  }
  reject((s) => { s.objects = s.objects.filter(({ key }) => key !== SHIP) }, 'missing ship passed')
  reject((s) => { s.camera.eye[1] = 1.7 }, 'ground-level ship viewpoint passed')
  reject((s) => { s.objects.find(({ key }) => key === BEAUTY).position[1] = 0 }, 'Beauty standing off deck passed')
  reject((s) => { s.objects.find(({ key }) => key === BEAUTY).position[0] += 20 }, 'Beauty beyond deck edge passed')
  reject((s) => { s.location.position = [10, 20] }, 'invented world coordinates passed')
  reject((s) => { s.objects.find(({ key }) => key === SHIP).asset = 'boat' }, 'deckless boat proxy passed')
  reject((s) => { s.relations = s.relations.filter(({ subject }) => subject !== 'viewer') }, 'missing embodied support relationship passed')
  const falseLegacy = buildWorldNodeScene('gjizarFund', { selectedDescriptionId: 'description:gjizarFund:2' })
  falseLegacy.objects.push(structuredClone(liveShips[0]))
  assert.throws(() => assertLegacy(falseLegacy), 'legacy ending acquired a new ship arrival'); corruptions++
  return { views, corruptions }
}
