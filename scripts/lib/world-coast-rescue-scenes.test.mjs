import assert from 'node:assert/strict'
import { buildWorldNodeScene } from '../../src/game/worldScene3dNodes.js'
import { compileWorldNodeGeometry } from '../../src/components/worldScene3dNodeRenderer.js'

const structures = new Set('house hut palace interior room tower mill church mosque fortress castle cave mountain cliff wall rock stone teqe village ship boat'.split(' '))
const sub = (a, b) => a.map((v, i) => v - b[i])
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0)
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]
function intersectsBeforeTarget(origin, direction, vertices) {
  const edge1 = sub(vertices[1], vertices[0]), edge2 = sub(vertices[2], vertices[0])
  const p = cross(direction, edge2), determinant = dot(edge1, p)
  if (Math.abs(determinant) < 1e-9) return false
  const distance = sub(origin, vertices[0]), u = dot(distance, p) / determinant
  if (u < 0 || u > 1) return false
  const q = cross(distance, edge1), v = dot(direction, q) / determinant
  if (v < 0 || u + v > 1) return false
  const t = dot(edge2, q) / determinant
  return t > 1e-4 && t < .999
}

export function actorHasStructuralSightline(scene, actor) {
  const blockers = compileWorldNodeGeometry({ objects: scene.objects.filter((o) => o.id !== actor.id && structures.has(o.asset)) }).faces
    .flatMap(({ vertices }) => vertices.slice(1, -1).map((v, i) => [vertices[0], v, vertices[i + 2]]))
  const samples = compileWorldNodeGeometry({ objects: [actor] }).faces.filter(({ partId }) => /head|torso|body/.test(partId))
    .map(({ vertices }) => vertices[0].map((_, axis) => vertices.reduce((sum, p) => sum + p[axis], 0) / vertices.length))
  return samples.some((point) => !blockers.some((triangle) => intersectsBeforeTarget(scene.camera.eye, sub(point, scene.camera.eye), triangle)))
}

function assertEncounter(scene, key) {
  const actors = scene.objects.filter((o) => o.key === key && o.claimIds.some((id) => scene.descriptions.find((d) => d.id === id)?.active))
  assert.ok(actors.length, `${scene.nodeId}: current source actor ${key} is missing`)
  assert.ok(actors.some((actor) => actorHasStructuralSightline(scene, actor)), `${scene.nodeId}: the entire current encounter ${key} is hidden behind unrelated structural geometry`)
}

function assertShore(scene) {
  const sea = scene.objects.find(({ key }) => key === 'coastal-sea')
  const tower = scene.objects.find(({ key }) => key === 'alia-tower')
  assert.ok(sea && tower)
  const points = (object) => compileWorldNodeGeometry({ objects: [object] }).faces.flatMap(({ vertices }) => vertices)
  const range = (object, axis) => { const values = points(object).map((p) => p[axis]); return [Math.min(...values), Math.max(...values)] }
  const water = [range(sea, 0), range(sea, 2)], building = [range(tower, 0), range(tower, 2)]
  assert.ok(water.some(([low, high], i) => high < building[i][0] || low > building[i][1]), 'coastal tower footprint must lie on land, not in the sea')
  assert.ok(water.some(([low, high], i) => scene.camera.eye[i * 2] < low || scene.camera.eye[i * 2] > high), 'coastal observer must retain dry footing')
}

// These exact immediate encounters caused verified panorama regressions.
// Partial occlusion of a surrounding army is natural: this checks that a
// described encounter exists in sight, not that every remote person is visible.
export function runWorldCoastRescueSceneAssertions() {
  const cases = [
    ['bregu', 'actor:gjergj-elez-alia'], ['bregu', 'actor:alia-sister'],
    ['mujo4', 'actor:halili'], ['mujo4', 'actor:mujo'], ['mujo4', 'rescuing-agas'],
    ['aliPashaVdes', 'ali-enemies'], ['kalaMjegull', 'rozafa-brothers'], ['kalaMjegull', 'rozafa-elder'],
    ['kalaNgjitje', 'actor:rozafa'], ['kalaNgjitje', 'rozafa-child'], ['sari1', 'actor:sari-kulshedra'],
    ['shtepia', 'home-people'], ['behuriBurimHumbur', 'behuri-men'],
    ['osmaniVdekur', 'osmani-brothers'], ['osmaniZbuluar', 'osmani-brothers'], ['osmaniRob', 'osmani-brothers'],
    ['skender1', 'tale:skender:defenders'], ['skenderKeq', 'tale:skender:enemies'], ['skenderKeq', 'tale:skender:defenders'],
    ['bregFle', 'actor:baloz'],
  ]
  for (const [nodeId, key] of cases) assertEncounter(buildWorldNodeScene(nodeId), key)
  for (const nodeId of ['bregu', 'balozMotra', 'balozTribut', 'balozZgjedh', 'bregFle']) assertShore(buildWorldNodeScene(nodeId))
  const coveredShore = buildWorldNodeScene('bregu')
  coveredShore.objects.find(({ key }) => key === 'coastal-sea').position = [...coveredShore.objects.find(({ key }) => key === 'alia-tower').position]
  assert.throws(() => assertShore(coveredShore), 'sea covering the village tower passed')
  const hiddenCaptive = buildWorldNodeScene('mujo4')
  hiddenCaptive.objects.find(({ key }) => key === 'halil-dark-cell').rotationY = Math.PI
  assert.throws(() => assertEncounter(hiddenCaptive, 'actor:halili'), 'back-facing rescue cell passed')
  return { encounters: cases.length, shoreViews: 5, corruptions: 2 }
}
