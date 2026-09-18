import assert from 'node:assert/strict'
import {
  defaultCameraForScene, drawWorldScene3d, projectWorldScenePoint,
  hitTestWorldScene3d, visibleWorldSceneElements, worldScene3dDisplayElements, worldScene3dMesh,
} from '../../src/components/worldScene3dRenderer.js'

const ids = (elements) => elements.map(({ id }) => id).sort()
const cameraContains = (element, camera) => {
  for (const point of worldScene3dMesh(element).flatMap(({ vertices }) => vertices)) {
    const projected = projectWorldScenePoint(point, camera, 960, 640)
    assert.ok(projected && projected.x >= 0 && projected.x <= 960 && projected.y >= 0 && projected.y <= 640,
      `${element.id}: the fitted survey must include the complete rendered mesh`)
  }
}

function drawingFixture() {
  const labels = [], fills = [], dashes = []
  const context = new Proxy({
    createLinearGradient: () => ({ addColorStop() {} }),
    measureText: (text) => ({ width: text.length * 6 }),
    fillText: (text) => labels.push(text),
    fill() { fills.push(this.fillStyle) },
    setLineDash: (dash) => dashes.push([...dash]),
  }, { get: (object, key) => object[key] ?? (() => {}) })
  return {
    canvas: { getContext: () => context, getBoundingClientRect: () => ({ width: 960, height: 640 }) },
    labels, fills, dashes,
  }
}

// Invoked by the existing worldscene3daudit release gate. Exercise production
// elements and renderer output, so an indexed-but-hidden element is a failure.
export function runWorldSceneSurveyAssertions(model) {
  const physical = model.elements.filter((element) => !element.catalogue)
  const references = model.elements.filter((element) => element.catalogue)
  assert.deepEqual(ids(visibleWorldSceneElements(model, { surveyMode: 'all' })), ids(physical),
    'the complete survey must expose every charted element, including conditional and metadata symbols')
  assert.deepEqual(ids(visibleWorldSceneElements(model, { surveyMode: 'all', selectedId: references[0].id })), ids(physical),
    'returning to the survey with a remembered reference selection must restore the complete world')
  const worldCamera = defaultCameraForScene(model)
  for (const element of physical.filter(({ kind }) => kind !== 'region')) cameraContains(element, worldCamera)
  const worldDrawing = drawingFixture()
  const worldHits = drawWorldScene3d(worldDrawing.canvas, model, { surveyMode: 'all', camera: worldCamera })
  assert.deepEqual(ids(worldHits), ids(physical), 'every surveyed world element must reach the actual canvas draw/picking path')
  assert.ok(worldDrawing.labels.some((label) => label.startsWith('SURVEY ·')), 'survey must explicitly distinguish possibilities from current world state')
  const localPlaceId = model.routes.find((route) => route.samePlace)?.fromElementId
  const localDrawing = drawingFixture()
  drawWorldScene3d(localDrawing.canvas, model, { surveyMode: 'all', selectedId: localPlaceId,
    camera: defaultCameraForScene(model, { elementId: localPlaceId }) })
  assert.ok(localDrawing.labels.some((label) => label.includes('local choices')), 'same-place actions must remain visible when inspecting their shared route endpoint')

  for (const kind of new Set(physical.map((element) => element.kind))) {
    const expected = physical.filter((element) => ['region', 'place', kind].includes(element.kind))
    assert.deepEqual(ids(visibleWorldSceneElements(model, { surveyMode: 'all', enabledKinds: [kind] })), ids(expected),
      `${kind}: layer selection must preserve all base locations and exactly the requested layer`)
  }
  assert.deepEqual(ids(visibleWorldSceneElements(model, { surveyMode: 'all', enabledKinds: [] })),
    ids(physical.filter(({ kind }) => ['region', 'place'].includes(kind))), 'empty layers must leave a navigable place chart')
  for (const regionId of new Set(physical.flatMap((element) => element.regionIds || [element.regionId]).filter(Boolean))) {
    const expected = physical.filter((element) => element.regionId === regionId || element.regionIds?.includes(regionId))
    assert.deepEqual(ids(visibleWorldSceneElements(model, { surveyMode: 'all', regionId })), ids(expected),
      `${regionId}: survey must retain every canonical region member`)
  }

  assert.deepEqual(ids(visibleWorldSceneElements(model, { catalogueView: true, regionId: 'village', enabledKinds: [] })), ids(references),
    'reference gallery must include every unlocated reference independently of physical filters')
  const referenceCamera = defaultCameraForScene(model, { catalogueView: true })
  const referenceDisplay = worldScene3dDisplayElements(model, { catalogueView: true })
  for (const reference of referenceDisplay) cameraContains(reference, referenceCamera)
  const referenceDrawing = drawingFixture()
  assert.deepEqual(ids(drawWorldScene3d(referenceDrawing.canvas, model, { catalogueView: true, camera: referenceCamera })), ids(references),
    'all catalogue symbols must be rendered without unrelated physical world geometry')
  assert.ok(referenceDrawing.labels.some((label) => label.startsWith('UNLOCATED REFERENCE ·')), 'gallery must not imply a physical location')
  assert.ok(referenceDrawing.labels.some((label) => label.endsWith(' · reference')), 'catalogue symbols must carry reference labels')
  const catalogueIds = references.slice(0, 3).map(({ id }) => id)
  assert.deepEqual(ids(visibleWorldSceneElements(model, { catalogueView: true, catalogueIds })), [...catalogueIds].sort(),
    'filtered reference gallery must render exactly its requested symbols')
  assert.deepEqual(visibleWorldSceneElements(model, { catalogueView: true, catalogueIds: [] }), [],
    'an empty reference search must not silently show the whole gallery')
  for (const index of [0, Math.floor(references.length / 2), references.length - 1]) {
    const selectedId = references[index].id
    const focusedCamera = defaultCameraForScene(model, { catalogueView: true, elementId: selectedId })
    const fixture = drawingFixture()
    const hits = drawWorldScene3d(fixture.canvas, model, { catalogueView: true, selectedId, camera: focusedCamera })
    const display = referenceDisplay.find(({ id }) => id === selectedId)
    const point = projectWorldScenePoint(display.position, focusedCamera, 960, 640)
    assert.equal(hitTestWorldScene3d(hits, point.x, point.y)?.id, selectedId,
      `${selectedId}: direct reference focus must use the same gallery layout as drawing and picking`)
  }
  const unlocated = { id: 'reference:uncharted-departure-fixture', kind: 'catalogue', catalogue: true,
    label: 'Uncharted departure', descriptionIds: [], placeId: null, position: null, geometry: null }
  const sourceCopy = JSON.stringify(unlocated)
  const unlocatedModel = { ...model, elements: [unlocated] }
  const unlocatedFixture = drawingFixture()
  const unlocatedCamera = defaultCameraForScene(unlocatedModel, { catalogueView: true, elementId: unlocated.id })
  const unlocatedHits = drawWorldScene3d(unlocatedFixture.canvas, unlocatedModel, { catalogueView: true, camera: unlocatedCamera })
  assert.deepEqual(ids(unlocatedHits), [unlocated.id], 'geometry-less unlocated records need a gallery reference symbol')
  assert.equal(JSON.stringify(unlocated), sourceCopy, 'gallery layout must never turn an unlocated record into canonical geography')
  assert.deepEqual(worldScene3dMesh(unlocated), [], 'unlocated source data must not be assigned a physical mesh')

  const byId = new Map(model.elements.map((element) => [element.id, element]))
  for (const description of model.descriptions) {
    const chartedIds = description.elementIds.filter((id) => !byId.get(id)?.catalogue && byId.get(id)?.kind !== 'region')
    if (!chartedIds.length || !description.elementIds.some((id) => byId.get(id)?.catalogue)) continue
    const selectedId = chartedIds.find((id) => byId.get(id)?.kind !== 'place') || chartedIds[0]
    const visible = visibleWorldSceneElements(model, { selectedId, focusedDescriptionId: description.id })
    assert.ok(visible.some((element) => element.id === selectedId), `${description.id}: mixed-reference source must retain its selected charted binding`)
    assert.equal(visible.some((element) => element.catalogue), false, `${description.id}: an unlocated binding must not replace selected charted evidence`)
  }

  const possibility = physical.find((element) => element.kind === 'actor')
  assert.ok(possibility, 'survey fixture needs a canonical actor stop')
  const actorDrawing = drawingFixture()
  drawWorldScene3d(actorDrawing.canvas, { ...model, elements: [possibility] }, {
    surveyMode: 'all', camera: defaultCameraForScene(model, { elementId: possibility.id }),
  })
  assert.ok(actorDrawing.labels.some((label) => label.endsWith(' · possible')), 'actor stops must be labelled as possibilities')
  assert.ok(actorDrawing.dashes.some((dash) => dash.join(',') === '3,3'), 'possible states must have a distinct dashed outline')
  assert.ok(actorDrawing.fills.some((fill) => typeof fill === 'string' && fill.endsWith(',0.48)')), 'possible states must not use solid current-state geometry')
  return { surveyed: physical.length, references: references.length }
}
