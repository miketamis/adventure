import assert from 'node:assert/strict'
import { runCausalArcSceneClaimAssertions } from './causal-arc-scene-claims.test.mjs'
import { STORY, lineOf } from '../../src/game/content.js'
import { albanianTextOf } from '../../src/game/language.js'
import { newRun, storyScenePresentationForState } from '../../src/game/gameState.js'
import { NODE_POS } from '../../src/components/nodePositions.js'
import { isUnchartedStoryNode } from '../../src/game/departureContexts.js'
import { WORLD_NODE_VIEWPOINTS } from '../../src/game/data/worldScene3dViewpoints.js'
import { WORLD_SCENE_3D_NODE_CLAIMS } from '../../src/game/data/worldScene3dNodeClaims.js'
import { buildWorldNodeSceneIndex, buildWorldNodeScene, validateWorldNodeClaims, validateWorldNodeScene } from '../../src/game/worldScene3dNodes.js'
import { nodeSceneCamera, turnWorldNodeCamera, lookWorldNodeDirection, orbitWorldNodeCamera, projectWorldNodePoint, compileWorldNodeGeometry } from '../../src/components/worldScene3dNodeRenderer.js'

const clone = (value) => structuredClone(value)
const sorted = (values) => [...values].sort()
const caseFacts = (source) => new Set(source && !source.conditions.negate ? source.conditions.all || [] : [])
const allowedInCase = ({ conditions }, source) => {
  const facts = caseFacts(source), allRequired = (conditions.all || []).every((flag) => facts.has(flag))
  return (conditions.negate ? !allRequired : allRequired) && !(conditions.none || []).some((flag) => facts.has(flag)) && (!conditions.observationId || conditions.observationId === source?.conditions.observationId)
}

// Invoked by worldscene3daudit. The bank is enumerated from production STORY;
// an indexed source alone cannot pass as a modeled or reviewed disposition.
export function runWorldNodeSceneAssertions() {
  const index = buildWorldNodeSceneIndex(), nodeIds = Object.keys(STORY)
  const expectedSources = nodeIds.flatMap((nodeId) => STORY[nodeId].text.map((_, i) => `description:${nodeId}:${i}`))
  const rows = WORLD_SCENE_3D_NODE_CLAIMS, byId = new Map(rows.map((row) => [row.id, row]))
  assert.deepEqual(sorted(index.map(({ nodeId }) => nodeId)), sorted(nodeIds), 'every authored node must be selectable')
  assert.equal(rows.length, byId.size, 'duplicate exact story source dispositions')
  assert.deepEqual(expectedSources.filter((id) => !byId.has(id)), [], 'story lines missing physical review')
  assert.deepEqual(rows.filter(({ id }) => !expectedSources.includes(id)).map(({ id }) => id), [], 'physical review for nonexistent story sources')
  assert.deepEqual(validateWorldNodeClaims(), [], 'the complete physical source ledger must validate')
  let witnessViews = 0, modeledObjects = 0, reciprocalLinks = 0, corruptions = runCausalArcSceneClaimAssertions().corruptions
  const inspect = (scene) => {
    assert.deepEqual(validateWorldNodeScene(scene), [], `${scene.nodeId}: invalid node scene`)
    assert.equal(scene.descriptions.length, STORY[scene.nodeId].text.length)
    assert.equal(scene.coverage.reviewed, scene.descriptions.length, `${scene.nodeId}: unreviewed source hidden in coverage`)
    assert.equal(scene.coverage.objects, scene.objects.length)
    const objects = new Map(scene.objects.map((object) => [object.id, object]))
    const provenance = new Map(scene.objects.flatMap((object) => object.sourceDescriptions.map((source) => [source.id, source])))
    for (const description of scene.descriptions) {
      assert.equal(description.text, albanianTextOf(lineOf(STORY[scene.nodeId].text[description.lineIndex])), `${description.id}: exact prose drifted`)
      assert.deepEqual(description.conditions, byId.get(description.id).conditions)
      assert.notEqual(description.disposition, 'unreviewed')
      for (const id of description.elementIds) {
        assert.ok(objects.get(id)?.claimIds.includes(description.id), `${description.id}: one-way geometry link`)
        reciprocalLinks += 1
      }
    }
    for (const object of scene.objects) {
      assert.ok(object.claimIds.length, `${object.id}: geometry has no source`)
      assert.deepEqual(object.descriptionIds, object.claimIds)
      assert.equal(typeof object.countExact, 'boolean', `${object.id}: representative counts must be distinguishable`)
      assert.ok(Number.isSafeInteger(object.sourceCount) && object.sourceCount > 0)
      for (const id of object.claimIds) {
        const row = byId.get(id), source = provenance.get(id)
        assert.ok(row && source, `${object.id}: source cannot be opened from its geometry`)
        assert.equal(source.text, row.text, `${object.id}: object source excerpt drifted`)
        assert.deepEqual(source.conditions, row.conditions)
      }
    }
    if (isUnchartedStoryNode(scene.nodeId)) {
      assert.equal(scene.location.position, null)
      assert.equal(scene.location.placeId, null)
      assert.equal(scene.localOnly, true)
      assert.equal(scene.camera.space, 'unlocated-local')
      assert.deepEqual(scene.camera.eye, [0, 1.7, 0], 'unlocated local staging must never invent world coordinates')
      assert.ok(scene.objects.every(({ placement }) => placement.authority === 'unlocated-local-staging'))
    } else {
      const view = WORLD_NODE_VIEWPOINTS.find(({ nodes }) => nodes.includes(scene.nodeId)), origin = NODE_POS[view?.anchorPlace] || NODE_POS[scene.nodeId], offset = view?.offset || [0, 0, 0]
      assert.deepEqual(scene.camera.eye, [origin[0] + offset[0], (Number.isFinite(scene.viewer?.height) ? scene.viewer.height : 1.7) + offset[1], origin[1] + offset[2]], `${scene.nodeId}: exact authored viewpoint refinement drifted`)
      assert.equal(scene.camera.space, 'world')
    }
    modeledObjects += scene.objects.length
  }
  for (const node of index) {
    const baseline = buildWorldNodeScene(node.nodeId)
    inspect(baseline)
    assert.equal(baseline.mode, 'authored')
    assert.deepEqual(sorted(baseline.descriptions.filter(({ active }) => active).map(({ id }) => id)),
      sorted(baseline.descriptions.filter((source) => allowedInCase(source, baseline.descriptions.find(({ id }) => id === baseline.representativeDescriptionId))).map(({ id }) => id)), `${node.nodeId}: initial view mixed incompatible conditions`)
    for (const source of baseline.descriptions) {
      const witness = buildWorldNodeScene(node.nodeId, { selectedDescriptionId: source.id })
      inspect(witness)
      witnessViews += 1
      assert.equal(witness.mode, 'witness')
      assert.equal(witness.selectedDescriptionId, source.id)
      assert.equal(witness.descriptions.find(({ id }) => id === source.id).active, true, `${source.id}: selected witness does not satisfy its own condition`)
      const expectedActive = baseline.descriptions.filter((entry) => allowedInCase(entry, source)).map(({ id }) => id)
      assert.deepEqual(sorted(witness.descriptions.filter(({ active }) => active).map(({ id }) => id)), sorted(expectedActive), `${source.id}: unrelated conditional variants were combined`)
      const permitted = new Set(expectedActive)
      for (const object of witness.objects) for (const id of object.claimIds) {
        const row = byId.get(id)
        assert.ok(permitted.has(id) || row.objects.some((claim) => claim.key === object.key && claim.persistence === 'place'),
          `${source.id}: transient object from an inactive or foreign source ${id}`)
      }
    }
    const camera = nodeSceneCamera(baseline)
    assert.deepEqual(camera.eye, baseline.camera.eye)
    for (let direction = 0; direction < 4; direction += 1) {
      const turned = lookWorldNodeDirection(camera, direction)
      assert.deepEqual(turned.eye, camera.eye, `${node.nodeId}: looking around moves the observer`)
      const ahead = [camera.eye[0] + Math.sin(turned.yaw) * 10, camera.eye[1], camera.eye[2] - Math.cos(turned.yaw) * 10]
      const point = projectWorldNodePoint(ahead, turned, 800, 400)
      assert.ok(Math.abs(point.x - 400) < 1e-7 && Math.abs(point.y - 200) < 1e-7, `${node.nodeId}: incorrect 360 direction`)
    }
    assert.deepEqual(turnWorldNodeCamera(camera, 4000, 100).eye, camera.eye)
    assert.notDeepEqual(orbitWorldNodeCamera(camera, 20, 10).eye, camera.eye)
  }
  // A literal entry into a cave requires an enclosing model, not an exterior
  // cave marker beside an otherwise open-air stage. Distances remain illustrative.
  for (const nodeId of ['katallan1', 'katallanZjarr']) {
    const scene = buildWorldNodeScene(nodeId), enclosure = scene.objects.find(({ asset, attributes }) => asset === 'cave' && attributes.interior)
    assert.ok(enclosure, `${nodeId}: explicit cave interior lacks an enclosing cavern mesh`)
    const geometry = compileWorldNodeGeometry({ objects: [enclosure] }), bounds = geometry.bounds
    for (let axis = 0; axis < 3; axis += 1) assert.ok(scene.camera.eye[axis] > bounds.min[axis] && scene.camera.eye[axis] < bounds.max[axis], `${nodeId}: eye is outside the described cave`)
    assert.ok(geometry.faces.some(({ partId, vertices }) => partId === 'rock-ceiling' && vertices.every((point) => point[1] > scene.camera.eye[1]) &&
      Math.min(...vertices.map((point) => point[0])) <= scene.camera.eye[0] && Math.max(...vertices.map((point) => point[0])) >= scene.camera.eye[0] &&
      Math.min(...vertices.map((point) => point[2])) <= scene.camera.eye[2] && Math.max(...vertices.map((point) => point[2])) >= scene.camera.eye[2]), `${nodeId}: the first-person eye must have a physical cave roof overhead`)
    const occupants = scene.objects.filter(({ key }) => ['actor:katallan', 'katallan-traveller', 'katallan-fire'].includes(key))
    assert.ok(occupants.some(({ key }) => key === 'actor:katallan'))
    assert.ok(occupants.some(({ key }) => key === 'katallan-fire'))
    for (const object of occupants) {
      const occupied = compileWorldNodeGeometry({ objects: [object] }).bounds
      for (let axis = 0; axis < 3; axis += 1) assert.ok(occupied.min[axis] >= bounds.min[axis] && occupied.max[axis] <= bounds.max[axis], `${nodeId}: ${object.key} is staged outside the enclosing cave`)
    }
    assert.ok(enclosure.sourceDescriptions.some(({ nodeId: sourceNode }) => sourceNode === 'katallan1'), `${nodeId}: enclosure must trace to the actual cave entry prose`)
  }
  assert.equal(buildWorldNodeScene('katallan1', { selectedDescriptionId: 'description:katallan1:4' }).environment.light, 'night', 'the authored night state must replace neutral preview light')
  const quantities = [['osmaniProvat', 'ordeal-serpents', 9], ['osmaniProvat', 'ordeal-nails', 20], ['osmaniProvat', 'ordeal-fires', 2], ['sariFund', 'kulshedra-seven-heads', 7], ['sariFund', 'kulshedra-seven-tongues', 7]]
  for (const [nodeId, key, count] of quantities) {
    const objects = buildWorldNodeScene(nodeId).objects.filter((object) => object.key === key)
    assert.equal(objects.length, count, `${nodeId}: exact authored quantity ${key}`)
    assert.ok(objects.every((object) => object.countExact && object.sourceCount === count))
  }
  const current = newRun(), saved = JSON.stringify(current)
  const live = buildWorldNodeScene(current.nodeId, { state: current })
  assert.equal(live.mode, 'live')
  const visible = new Set(storyScenePresentationForState({ ...current, debug: false }).normalEntries.map(({ line }) => line))
  assert.deepEqual(live.descriptions.filter(({ active }) => active).map(({ lineIndex }) => lineIndex),
    STORY[current.nodeId].text.map((entry, i) => visible.has(lineOf(entry)) ? i : null).filter((i) => i !== null), 'live render must consume normal production scene visibility')
  assert.equal(JSON.stringify(current), saved, 'inspection must never mutate the saved gameplay state')
  assert.throws(() => buildWorldNodeScene('__unknown__'), /Unknown story node/)
  assert.throws(() => buildWorldNodeScene('start', { selectedDescriptionId: 'description:maroPrincesha:2' }), /does not belong/)
  const physical = rows.find((row) => row.objects.length), sourceId = physical.id
  const rejectClaim = (label, mutate) => {
    const changed = clone(rows); mutate(changed, changed.find(({ id }) => id === sourceId))
    assert.ok(validateWorldNodeClaims(changed).length, `${label}: corrupt claim passed validation`); corruptions += 1
  }
  rejectClaim('omitted story line', (changed) => changed.splice(0, 1))
  rejectClaim('duplicate exact source', (changed) => changed.push(clone(changed[0])))
  rejectClaim('unknown source', (_, row) => { row.id = 'description:__invented__:0' })
  rejectClaim('changed quotation', (_, row) => { row.text += ' Forged.' })
  rejectClaim('changed conditions', (_, row) => { row.conditions = { all: ['__invented__'], none: [] } })
  rejectClaim('wrong place', (_, row) => { row.placeId = '__invented__' })
  rejectClaim('unknown asset fallback', (_, row) => { row.objects[0].asset = '__unknown_asset__' })
  rejectClaim('unreviewed source', (_, row) => { row.disposition = 'unreviewed' })
  rejectClaim('unsupported source rationale', (_, row) => { row.rationale = '' })
  rejectClaim('nonvisual scene object', (_, row) => { row.disposition = 'nonvisual' })
  rejectClaim('invalid count', (_, row) => { row.objects[0].count = 0 })
  rejectClaim('invalid mesh scale', (_, row) => { row.objects[0].scale = [1, -1, 1] })
  rejectClaim('unknown placement zone', (_, row) => { row.objects[0].zone = 'anywhere' })
  rejectClaim('duplicate object identity', (_, row) => { row.objects.push(clone(row.objects[0])) })
  const model = buildWorldNodeScene(physical.nodeId, { selectedDescriptionId: physical.id })
  assert.ok(model.objects.length)
  const rejectScene = (label, mutate, base = model) => {
    const changed = clone(base); mutate(changed)
    assert.ok(validateWorldNodeScene(changed).length, `${label}: corrupt scene passed validation`); corruptions += 1
  }
  rejectScene('stale rendered quotation', (scene) => { scene.descriptions[0].text += ' Forged.' })
  rejectScene('stale rendered condition', (scene) => { scene.descriptions[0].conditions = { all: ['forged'] } })
  rejectScene('stale rendered disposition', (scene) => { scene.descriptions[0].disposition = 'unreviewed' })
  rejectScene('missing rendered prose', (scene) => { scene.descriptions.pop() })
  rejectScene('unmapped geometry', (scene) => { scene.objects[0].claimIds = [] })
  rejectScene('one-way source mapping', (scene) => { scene.descriptions.find((row) => row.elementIds.length).elementIds = [] })
  rejectScene('dangling source mapping', (scene) => { scene.descriptions[0].elementIds.push('absent-object') })
  rejectScene('duplicate rendered identity', (scene) => { scene.objects.push(clone(scene.objects[0])) })
  rejectScene('invented world position', (scene) => { scene.camera.eye[0] += 2 })
  const unlocated = buildWorldNodeScene('maroPrincesha', { selectedDescriptionId: 'description:maroPrincesha:2' })
  assert.ok(unlocated.objects.some(({ key, attributes }) => key === 'maro-son' && attributes.age === 'baby'), 'unlocated born child must still have an honest local physical reconstruction')
  rejectScene('fabricated unlocated destination', (scene) => { scene.location.position = [0, 0] }, unlocated)
  rejectScene('fabricated unlocated world authority', (scene) => { scene.objects[0].placement.authority = 'registered-landmark' }, unlocated)
  return { nodes: index.length, sources: expectedSources.length, witnessViews, modeledObjects, reciprocalLinks, corruptions }
}
