import assert from 'node:assert/strict'
import { buildWorldNodeScene, buildWorldNodeSceneIndex, WORLD_NODE_EYE_HEIGHT } from '../../src/game/worldScene3dNodes.js'
import { buildAssetParts } from '../../src/game/worldScene3dAssets.js'
import { compileWorldNodeGeometry } from '../../src/components/worldScene3dNodeRenderer.js'

const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0)
const subtract = (a, b) => a.map((value, i) => value - b[i])
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
function inverseRotate([x, y, z], [rx = 0, ry = 0, rz = 0]) {
  ;[x, y] = [x * Math.cos(rz) + y * Math.sin(rz), -x * Math.sin(rz) + y * Math.cos(rz)]
  ;[x, z] = [x * Math.cos(ry) - z * Math.sin(ry), x * Math.sin(ry) + z * Math.cos(ry)]
  return [x, y * Math.cos(rx) + z * Math.sin(rx), -y * Math.sin(rx) + z * Math.cos(rx)]
}

// Test the actual closed polygons, including hollow shafts and rings. Bounds
// only reject distant candidates; being inside an object's bounding box is
// not itself an obstruction (a room's empty interior must remain legal).
function insideClosedPart(eye, faces) {
  const direction = [0.83713, 0.37193, 0.42971], distances = []
  for (const { vertices } of faces) for (let i = 1; i < vertices.length - 1; i += 1) {
    const edge1 = subtract(vertices[i], vertices[0]), edge2 = subtract(vertices[i + 1], vertices[0])
    const p = cross(direction, edge2), determinant = dot(edge1, p)
    if (Math.abs(determinant) < 1e-10) continue
    const offset = subtract(eye, vertices[0]), u = dot(offset, p) / determinant
    if (u < -1e-8 || u > 1 + 1e-8) continue
    const q = cross(offset, edge1), v = dot(direction, q) / determinant
    if (v < -1e-8 || u + v > 1 + 1e-8) continue
    const distance = dot(edge2, q) / determinant
    if (distance > 1e-6) distances.push(distance)
  }
  // Adjacent triangles/faces can share the ray hit; count a surface once.
  distances.sort((a, b) => a - b)
  return distances.filter((value, i) => !i || value - distances[i - 1] > 1e-5).length % 2 === 1
}

export function worldNodeEyeObstructions(scene) {
  const issues = []
  for (const object of scene.objects) {
    const localEye = inverseRotate(subtract(scene.camera.eye, object.position), [0, object.rotationY || 0, 0])
      .map((value, axis) => value / object.scale[axis])
    let geometry
    for (const part of buildAssetParts(object.asset, object.attributes)) {
      const normalized = inverseRotate(subtract(localEye, part.position), part.rotation)
        .map((value, axis) => value / part.size[axis])
      if (normalized.some((value) => Math.abs(value) >= 0.49999)) continue
      geometry ||= compileWorldNodeGeometry({ objects: [object] })
      if (insideClosedPart(scene.camera.eye, geometry.faces.filter(({ partId }) => partId === part.id))) {
        issues.push({ nodeId: scene.nodeId, witness: scene.selectedDescriptionId || scene.representativeDescriptionId || null,
          object: object.key, part: part.id, sources: object.claimIds })
      }
    }
  }
  return issues
}

// These classify the modeled domains exercised by this check; they never
// exempt an intersecting actor. The sample points follow the actual composed
// torso/body/head parts, including age, pose, rotation and instance scale.
const ACTOR_ASSETS = new Set('human person man woman child giant spirit fairy bear bee bird bull butterfly cat cicada deer dog donkey dragon eagle fish fox frog goat goose horse lion mosquito moth mouse pig ram rooster sheep snake spider swallow tiger tortoise wolf'.split(' '))
const STRUCTURAL_ASSETS = new Set('house hut palace interior room tower mill church mosque fortress castle cave mountain cliff wall rock stone teqe village ship boat'.split(' '))
export function worldNodeActorObstructions(scene) {
  const solids = scene.objects.filter((object) => STRUCTURAL_ASSETS.has(object.asset)), issues = []
  let samples = 0, actors = 0
  if (!solids.length) return { samples, actors, issues }
  for (const actor of scene.objects.filter((object) => ACTOR_ASSETS.has(object.asset))) {
    actors += 1
    const bodyParts = buildAssetParts(actor.asset, actor.attributes).filter((part) =>
      ['clothed-torso', 'body', 'body:body', 'body-segment:4', 'head'].includes(part.id) || part.id.endsWith(':body:head'))
    for (const part of bodyParts) {
      const [x, y, z] = part.position.map((value, axis) => value * actor.scale[axis]), angle = actor.rotationY || 0
      const point = [actor.position[0] + x * Math.cos(angle) + z * Math.sin(angle), actor.position[1] + y, actor.position[2] - x * Math.sin(angle) + z * Math.cos(angle)]
      samples += 1
      for (const hit of worldNodeEyeObstructions({ ...scene, camera: { eye: point }, objects: solids.filter(({ id }) => id !== actor.id) })) {
        issues.push({ ...hit, actor: actor.key, actorId: actor.id, actorPart: part.id, point, actorSources: actor.claimIds })
      }
    }
  }
  return { samples, actors, issues }
}

export function runWorldNodeSpatialAssertions() {
  const issues = [], actorIssues = [], places = new Set(), index = buildWorldNodeSceneIndex()
  let views = 0, actorSamples = 0
  for (const { nodeId } of index) {
    const baseline = buildWorldNodeScene(nodeId)
    if (baseline.location.placeId) places.add(baseline.location.placeId)
    for (const scene of [baseline, ...baseline.descriptions.map(({ id }) => buildWorldNodeScene(nodeId, { selectedDescriptionId: id }))]) {
      views += 1
      issues.push(...worldNodeEyeObstructions(scene))
      const actors = worldNodeActorObstructions(scene)
      actorSamples += actors.samples
      actorIssues.push(...actors.issues)
    }
  }
  assert.deepEqual(issues, [], 'a node camera is buried in solid scene geometry; inspect the named source and mesh part')
  assert.deepEqual(actorIssues, [], 'a modeled actor is embedded in structural geometry; inspect the named source, actor and mesh part')

  const towerScene = buildWorldNodeScene('argjiroKala')
  const tower = towerScene.objects.find(({ key }) => key === towerScene.viewpoint.supportKey)
  const towerMesh = compileWorldNodeGeometry({ objects: [tower] })
  const deck = towerMesh.faces.filter(({ partId }) => partId === 'tower-top-deck')
  assert.ok(deck.length, 'The available leap must start on a real tower deck')
  const deckTop = Math.max(...deck.flatMap(({ vertices }) => vertices.map((vertex) => vertex[1])))
  assert.ok(Math.abs(towerScene.camera.eye[1] - WORLD_NODE_EYE_HEIGHT - deckTop) < .01, 'The observer stands on the deck, rather than floats above it or remains at ground level')
  const companion = towerScene.objects.find(({ key }) => key === 'argjiro-boy')
  const companionBounds = compileWorldNodeGeometry({ objects: [companion] }).bounds
  assert.ok(Math.abs(companionBounds.min[1] - deckTop) < .05, 'The little boy stands on the same tower deck')
  assert.ok(Math.hypot(companion.position[0] - towerScene.camera.eye[0], companion.position[2] - towerScene.camera.eye[2]) < 2, 'The source-established companion remains beside the observer')
  const ending = buildWorldNodeScene('argjiroFund')
  assert.equal(ending.camera.eye[1], WORLD_NODE_EYE_HEIGHT, 'The surviving child and rock are observed after the descent, at ground level')
  assert.deepEqual(ending.objects.find(({ key }) => key === tower.key).position, tower.position, 'Looking from above and below must not move the tower')

  const beforeWalling = buildWorldNodeScene('kalaNgjitje')
  assert.notEqual(beforeWalling.objects.find(({ key }) => key === 'actor:rozafa')?.attributes.pose, 'embedded', 'Rozafa is still a person arriving before the walling event')
  assert.ok(!beforeWalling.relations.some((relation) => relation.subject === 'actor:rozafa' && relation.target === 'rozafa-wall' && relation.kind === 'inside'), 'A persistent wall must not import its future act of enclosing Rozafa')
  for (const nodeId of ['kalaMur', 'kalaFundBesa']) {
    const afterWalling = buildWorldNodeScene(nodeId)
    assert.equal(afterWalling.objects.find(({ key }) => key === 'actor:rozafa')?.attributes.pose, 'embedded', `${nodeId}: the actual walling consequence retains its source-authored embodiment`)
    assert.ok(afterWalling.relations.some((relation) => relation.subject === 'actor:rozafa' && relation.target === 'rozafa-wall' && relation.kind === 'inside'), `${nodeId}: the completed walling keeps the exact physical relationship`)
  }

  for (const selectedDescriptionId of [null, 'description:bregu:12']) {
    const coast = buildWorldNodeScene('bregu', selectedDescriptionId ? { selectedDescriptionId } : {})
    assert.equal(coast.objects.filter(({ asset }) => asset === 'tower').length, 1, 'Looking at the shore tower reveals the existing building instead of creating a second tower')
    assert.equal(coast.objects.find(({ key }) => key === 'alia-tower')?.attributes.interior, true, 'The wounded hero occupies a hollow tower-house')
    for (const actor of ['actor:gjergj-elez-alia', 'actor:alia-sister']) assert.ok(coast.relations.some((relation) => relation.subject === actor && relation.kind === 'inside' && relation.target === 'alia-tower'), 'The water-giving scene keeps both siblings inside their established tower')
  }
  const palaceBefore = buildWorldNodeScene('kordhaPallat')
  const palaceAfter = buildWorldNodeScene('kordhaProva', { selectedDescriptionId: 'description:kordhaProva:0' })
  for (const brother of ['jumper', 'diver']) {
    assert.ok(palaceBefore.relations.some((relation) => relation.subject === `actor:kordha-${brother}` && relation.kind === 'holds' && relation.target === `item:kordha-${brother}-weapon` && relation.geometryStatus === 'modeled'), 'Each raised weapon belongs to the exact brother holding it')
    assert.ok(palaceAfter.relations.some((relation) => relation.subject === `actor:kordha-${brother}` && relation.kind === 'inside' && relation.target === 'feature:kordha-palace'), 'The immediate fight result retains both companions in the same palace')
  }

  for (const selectedDescriptionId of [null, 'description:prespaFund:0', 'description:prespaFund:3']) {
    const flood = buildWorldNodeScene('prespaFund', selectedDescriptionId ? { selectedDescriptionId } : {})
    const water = flood.objects.find(({ key }) => key === 'prespa-flood')
    const town = flood.objects.find(({ key }) => key === 'prespa-town')
    const waterBounds = compileWorldNodeGeometry({ objects: [water] }).bounds
    const townBounds = compileWorldNodeGeometry({ objects: [town] }).bounds
    assert.equal(flood.environment.underwater, true, 'The town-level flood observer cannot see dry daylight beneath a floating lake')
    assert.ok(waterBounds.min[1] > townBounds.max[1], 'The source flood covers the whole town')
    for (const axis of [0, 2]) {
      assert.ok(waterBounds.min[axis] < townBounds.min[axis] && waterBounds.max[axis] > townBounds.max[axis], 'The inundation must cover the settlement footprint')
      assert.ok(flood.camera.eye[axis] > waterBounds.min[axis] && flood.camera.eye[axis] < waterBounds.max[axis], 'The water extends over the source-bound town viewpoint')
    }
  }

  const fixture = { nodeId: 'geometry-probe', camera: { eye: [0, 1.7, 0] }, objects: [{
    id: 'obstruction', key: 'obstruction', asset: 'wall', position: [0, 0, 0], scale: [1, 1, 1], rotationY: 0.61, attributes: {}, claimIds: ['probe'],
  }] }
  assert.ok(worldNodeEyeObstructions(fixture).length, 'a solid wall around the camera must fail')
  fixture.objects[0] = { ...fixture.objects[0], asset: 'well', attributes: { depth: 20, width: 7 } }
  fixture.camera.eye = [0, -10, 0]
  assert.deepEqual(worldNodeEyeObstructions(fixture), [], 'the air inside a hollow well is not solid masonry')
  fixture.camera.eye = [3, -10, 0]
  assert.ok(worldNodeEyeObstructions(fixture).length, 'a camera inside the well lining must fail')
  fixture.objects = [
    { ...fixture.objects[0], asset: 'wall', position: [0, 0, 0], rotationY: 0, attributes: {} },
    { id: 'actor', key: 'actor', asset: 'human', position: [0, 0, 0], scale: [1, 1, 1], rotationY: 0, attributes: {}, claimIds: ['actor-source'] },
  ]
  assert.ok(worldNodeActorObstructions(fixture).issues.length, 'an actor whose head and torso are inside masonry must fail even when the player camera is clear')
  fixture.objects[1].position = [0, 0, 5]
  assert.deepEqual(worldNodeActorObstructions(fixture).issues, [], 'a person standing outside the same wall is valid')
  return { nodes: index.length, places: places.size, views, actorSamples, corruptions: 3 }
}
