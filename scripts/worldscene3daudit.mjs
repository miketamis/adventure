import { isUnchartedStoryNode } from '../src/game/departureContexts.js'
// The 3D renderer and this gate consume the same scene contract. Coverage is
// independently enumerated from production STORY/place/route registries; the
// mutation probes exercise the validator rather than trusting a success count.
import assert from 'node:assert/strict'
import { runWorldNodeSceneAssertions } from './lib/world-node-scenes.test.mjs'
import { runWorldNodeRendererAssertions } from './lib/world-node-renderer.test.mjs'
import { runWorldNodeSpatialAssertions } from './lib/world-node-spatial.test.mjs'
import { runWorldSceneSourceSemanticsAssertions } from './lib/world-scene-source-semantics.test.mjs'
import { runWorldShipSceneAssertions } from './lib/world-ship-scenes.test.mjs'
import { runWorldCoastRescueSceneAssertions } from './lib/world-coast-rescue-scenes.test.mjs'
import { worldScene3dInventorySources } from '../src/game/worldScene3dInventory.js'
import { runWorldSceneSurveyAssertions } from './lib/world-scene-survey.test.mjs'
import { runWorldSceneInventoryAssertions } from './lib/world-scene-inventory.test.mjs'
import { runWorldScenePlaceProfileAssertions } from './lib/world-scene-place-profiles.test.mjs'
import { ITEMS, STORY, lineOf, visibleLines } from '../src/game/content.js'
import { canChoose, hasCond, isOptionRevealed, newRun } from '../src/game/gameState.js'
import { albanianTextOf } from '../src/game/language.js'
import { NODE_POS, PLACE_NODES, PLACE_OF } from '../src/components/nodePositions.js'
import { NODE_REGION } from '../src/game/regions.js'
import { DISTANT_SIGHTLINES, routeForChoice } from '../src/game/worldModel.js'
import { WORLD_BARRIERS } from '../src/game/worldBarriers.js'
import { WORLD_SCENE_3D_FEATURES } from '../src/game/data/worldScene3dFeatures.js'
import { SEASONS, WEATHER_TYPES, civilDayPartAtClock } from '../src/game/environment.js'
import { ENVIRONMENT_DIMENSIONS, ENVIRONMENT_NARRATION_SETTINGS } from '../src/game/environmentNarration.js'
import { environmentStoryLine } from '../src/game/storyContext.js'
import {
  defaultCameraForScene,
  drawWorldScene3d,
  highlightedWorldSceneElements,
  hitTestWorldScene3d,
  orbitWorldSceneCamera,
  panWorldSceneCamera,
  projectWorldScenePoint,
  visibleWorldSceneElements,
  worldScene3dMesh,
  zoomWorldSceneCamera,
} from '../src/components/worldScene3dRenderer.js'
import {
  WORLD_SCENE_3D_VERSION,
  WORLD_SCENE_3D_ENVIRONMENT_CASES,
  buildWorldScene3d,
  departureElementId,
  validateWorldScene3d,
  worldScene3dApproachConditionConflicts,
} from '../src/game/worldScene3d.js'

const nodeChecks = runWorldNodeSceneAssertions()
const nodeRendererChecks = runWorldNodeRendererAssertions()
const nodeSpatialChecks = runWorldNodeSpatialAssertions()
const nodeSemanticChecks = runWorldSceneSourceSemanticsAssertions()
const nodeShipChecks = runWorldShipSceneAssertions()
const nodeCoastRescueChecks = runWorldCoastRescueSceneAssertions()
const model = buildWorldScene3d()
assert.equal(model.version, WORLD_SCENE_3D_VERSION)
assert.deepEqual(validateWorldScene3d(model), [], 'production 3D world model is inconsistent')
const surveyChecks = runWorldSceneSurveyAssertions(model)
const inventoryChecks = await runWorldSceneInventoryAssertions(model)
const profileChecks = runWorldScenePlaceProfileAssertions(model)

const descriptions = new Map(model.descriptions.map((record) => [record.id, record]))
const elements = new Map(model.elements.map((record) => [record.id, record]))
const routes = new Map(model.routes.map((record) => [record.id, record]))
const relations = new Map(model.relations.map((record) => [record.id, record]))
assert.equal(descriptions.size, model.descriptions.length, 'duplicate description identity')
assert.equal(elements.size, model.elements.length, 'duplicate element identity')
assert.equal(routes.size, model.routes.length, 'duplicate route identity')
assert.equal(relations.size, model.relations.length, 'duplicate spatial-relation identity')

// Verify the production model is actually projected in three dimensions and
// remains navigable by the same camera functions used by the canvas.
const camera = defaultCameraForScene(model)
const centered = projectWorldScenePoint(camera.target, camera, 960, 640)
assert.equal(centered.x, 480, 'camera target must remain horizontally centered')
assert.equal(centered.y, 320, 'camera target must remain vertically centered')
const offCenter = [camera.target[0] + 100, camera.target[1] + 70, camera.target[2] + 80]
const projected = projectWorldScenePoint(offCenter, camera, 960, 640)
const rotated = projectWorldScenePoint(offCenter, orbitWorldSceneCamera(camera, 40, 20), 960, 640)
assert.notDeepEqual([projected.x, projected.y], [rotated.x, rotated.y], 'orbit must change a spatial point projection')
const zoomed = projectWorldScenePoint(offCenter, zoomWorldSceneCamera(camera, 1.5), 960, 640)
assert.ok(Math.hypot(zoomed.x - 480, zoomed.y - 320) > Math.hypot(projected.x - 480, projected.y - 320), 'zoom must enlarge the inspected scene')
const panned = panWorldSceneCamera(camera, 30, 20, 960, 640)
assert.ok(panned.target.every(Number.isFinite), 'pan must retain a finite camera target')
assert.notDeepEqual(panned.target, camera.target, 'pan must move the inspected scene')

// Only positive location predicates establish actor geometry. Name knowledge
// also annotates absence, a person across the bridge, and a departed person.
for (const description of model.descriptions) {
  for (const binding of description.bindings.filter(({ type }) => type === 'actor-metadata')) {
    assert.equal(description.conditions.negate, false, `${description.id}: negated conjunction cannot establish an actor's location`)
    assert.ok(description.conditions.all.includes(binding.evidence.evidence), `${description.id}: identity or excluded presence cannot establish actor geometry`)
  }
}
for (const id of ['description:fshatiSheshi:24', 'description:fshatiSheshi:25', 'description:bisedaShesh:2', 'description:bisedaShesh:7']) {
  const description = descriptions.get(id)
  assert.ok(description.npcIdentity?.npcId === 'elira', `${id}: retain identity metadata even when location is unproved`)
  assert.equal(description.bindings.some(({ type }) => type === 'actor-metadata'), false, `${id}: absent, distant or departed Elira must not be depicted at the observer's place`)
  assert.equal(visibleWorldSceneElements(model, { focusedDescriptionId: id }).some(({ kind }) => kind === 'actor'), false, `${id}: source focus must not make absent actors appear`)
}
const springSighting = model.descriptions.find((description) => description.nodeId === 'fshatiLumi' && description.conditions.all.includes('npcAt:gruaUji:kroi1'))
assert.ok(springSighting?.bindings.some(({ type, elementId }) => type === 'actor-metadata' && elementId === 'actor:gruaUji:kroi1'), 'explicit distant actor location must remain mapped to the spring')

const bridgeHighlights = highlightedWorldSceneElements(model, { focusedDescriptionId: 'description:start:1' })
assert.ok(bridgeHighlights.has('feature:village-bridge'), 'reviewed bridge source must highlight the bridge')
assert.equal(bridgeHighlights.has('region:forest'), false, 'source scene context must not highlight the whole forest as an asserted object')
assert.equal(bridgeHighlights.has('place:start'), false, 'source scene context must not promote the place plinth to a physical feature')

// Test the renderer's actual mesh, so correct metadata cannot conceal an
// unrotated deck or a bridge that stops short of its authored shores.
for (const feature of WORLD_SCENE_3D_FEATURES.filter(({ placement }) => placement?.kind === 'crossing')) {
  const element = elements.get(`feature:${feature.id}`)
  const crossing = WORLD_BARRIERS.find(({ id }) => id === feature.placement.barrierId).crossings[feature.placement.crossingIndex]
  assert.equal(element.placeId, null, `${element.id}: a crossing is not located exclusively on one shore`)
  assert.deepEqual(element.placeIds, [...new Set(crossing.edge.map((nodeId) => PLACE_OF[nodeId]))], `${element.id}: both shores must be inspectable`)
  const faces = worldScene3dMesh(element)
  const faceCenters = faces.map(({ vertices }) => [0, 1, 2].map((axis) => vertices.reduce((sum, vertex) => sum + vertex[axis], 0) / vertices.length))
  for (const nodeId of crossing.edge) {
    const [x, z] = NODE_POS[nodeId]
    assert.ok(faceCenters.some((center) => Math.hypot(center[0] - x, center[1] - element.position[1], center[2] - z) < 1e-6), `${element.id}: rendered deck does not reach ${nodeId}`)
  }
}
assert.equal(elements.has('feature:old-bridge'), false, 'Fshaj bridge must not be duplicated at its first shore')
assert.ok(elements.get('feature:fshaj-bridge').descriptionIds.includes('description:ura:3'), 'first-shore bridge prose must still map to the single crossing')
assert.equal(elements.has('feature:dry-well-shaft'), false, 'village well and its shaft must share one physical element')
assert.equal(elements.get('feature:square-well').placeId, 'pusiThate', 'the square observes the well at its actual destination')
assert.equal(elements.get('feature:sea-village').placeId, 'bregu', 'shoreline description must refer to the village destination')

// Verify the reviewed square views can actually reach the well in their own
// water state. Discover exactly the source and action words, with no visited
// destination that could bypass the sentence-reveal gate.
const squareWellViews = WORLD_SCENE_3D_FEATURES.find(({ id }) => id === 'square-well').witnesses
  .filter(({ nodeId, location }) => nodeId === 'fshatiSheshi' && location?.kind === 'visible-from')
assert.deepEqual(squareWellViews.map(({ lineIndex }) => lineIndex).sort(), [0, 1], 'well audit must retain both exact dry and restored square views')
for (const witness of squareWellViews) {
  const route = witness.location.route
  const node = STORY[witness.nodeId]
  const source = lineOf(node.text[witness.lineIndex])
  const option = STORY[route.nodeId].options[route.optionIndex]
  for (const restored of [false, true]) {
    const state = { ...newRun(), nodeId: witness.nodeId, clock: 3, worldFacts: restored ? { villageWellsRestored: true } : {} }
    for (const { id } of [...source, ...option.text]) {
      if (id) { state.discovered[id] = true; state.mana[id] = 1 }
    }
    const visible = visibleLines(node, (condition) => hasCond(state, condition)).includes(source)
    const shouldBeVisible = witness.lineIndex === 1 ? restored : !restored
    const target = `${witness.nodeId}.text[${witness.lineIndex}]/restored=${restored}`
    assert.equal(visible, shouldBeVisible, `${target}: witness water state no longer matches its exact source`)
    assert.equal(isOptionRevealed(state, option, node), shouldBeVisible, `${target}: reviewed approach must use the visible sentence rather than its hidden water-state twin`)
    assert.equal(canChoose(state, option), shouldBeVisible, `${target}: discovered landmark must have a legal approach in its own water state`)
  }
}

const restoredFact = 'fact:villageWellsRestored'
assert.ok(worldScene3dApproachConditionConflicts({ all: [restoredFact], negate: false, none: [] }, { unless: restoredFact }).length,
  'positive source state must reject an approach excluding that state')
assert.ok(worldScene3dApproachConditionConflicts({ all: [], negate: false, none: [restoredFact] }, { requires: [restoredFact] }).length,
  'explicit source exclusion must reject an approach requiring that state')
assert.ok(worldScene3dApproachConditionConflicts({ all: [restoredFact], negate: true, none: [] }, { requires: restoredFact }).length,
  'negated single source condition must reject an approach requiring it')
assert.deepEqual(worldScene3dApproachConditionConflicts({ all: [restoredFact, 'night'], negate: true, none: [] }, { requires: restoredFact }), [],
  'a negated conjunction does not prove that any individual member is absent')
assert.deepEqual(worldScene3dApproachConditionConflicts({ all: [restoredFact], negate: true, none: [] }, { unless: restoredFact }), [],
  'compatible dry source and dry approach must stay legal')

const skylineElements = descriptions.get('description:fshatiSheshi:10').elementIds.filter((id) => elements.get(id).kind !== 'region')
const skylineCamera = defaultCameraForScene(model, { elementIds: skylineElements })
for (const id of skylineElements) {
  for (const vertex of worldScene3dMesh(elements.get(id)).flatMap(({ vertices }) => vertices)) {
    const point = projectWorldScenePoint(vertex, skylineCamera, 960, 640)
    assert.ok(point && point.x >= 0 && point.x <= 960 && point.y >= 0 && point.y <= 640, `${id}: source focus camera must include both observer and distant skyline geometry`)
  }
}

// Use the production draw path to test selecting a contained object through
// its inspection cutaway, not a fabricated set of hit boxes.
const innScene = { ...model, elements: model.elements.filter(({ id }) => ['place:bujtina', 'feature:inn-building', 'feature:inn-bed'].includes(id)) }
const innCamera = defaultCameraForScene(innScene)
const mockContext = new Proxy({ createLinearGradient: () => ({ addColorStop() {} }), measureText: () => ({ width: 0 }) }, {
  get: (object, key) => object[key] ?? (() => {}),
})
const drawnInn = drawWorldScene3d({ getContext: () => mockContext, getBoundingClientRect: () => ({ width: 960, height: 640 }) }, innScene, {
  camera: innCamera, selectedId: 'feature:inn-bed', showLabels: false, showRoutes: false, showSightlines: false,
})
assert.equal(drawnInn.find(({ id }) => id === 'feature:inn-building')?.transparent, true, 'inspected bed must expose a cutaway through its enclosing inn')
const bedPoint = projectWorldScenePoint(elements.get('feature:inn-bed').position, innCamera, 960, 640)
assert.equal(hitTestWorldScene3d(drawnInn, bedPoint.x, bedPoint.y)?.id, 'feature:inn-bed', 'the visible interior bed must remain pickable through its transparent inn')

// The dry and restored river are opposite authored world states. Browsing a
// place must not show both as if they existed together; exact source focus
// reveals only the selected description's conditional depiction.
const dryRiver = elements.get('feature:river-bed')
const restoredRiver = elements.get('feature:river-water-restored')
assert.ok(dryRiver?.conditional && restoredRiver?.conditional, 'opposed river states must retain conditional geometry')
for (const options of [{}, { selectedId: 'place:lumi', showDetailMarkers: true }]) {
  const visibleIds = new Set(visibleWorldSceneElements(model, options).map(({ id }) => id))
  assert.equal(visibleIds.has(dryRiver.id), false, 'overview must not assert that the river is dry')
  assert.equal(visibleIds.has(restoredRiver.id), false, 'overview must not assert that the river has been restored')
}
for (const [selected, excluded] of [[dryRiver, restoredRiver], [restoredRiver, dryRiver]]) {
  const visibleIds = new Set(visibleWorldSceneElements(model, {
    selectedId: 'place:lumi', focusedDescriptionId: selected.descriptionIds[0],
  }).map(({ id }) => id))
  assert.equal(visibleIds.has(selected.id), true, `${selected.id}: exact source focus must expose the conditional depiction`)
  assert.equal(visibleIds.has(excluded.id), false, `${excluded.id}: a conflicting conditional depiction must stay hidden`)
}
assert.equal(visibleWorldSceneElements(model).some((element) => element.catalogue), false, 'unlocated references must not appear in the physical overview')
for (const reference of model.elements.filter((element) => element.catalogue)) {
  const selected = visibleWorldSceneElements(model, { selectedId: reference.id, showDetailMarkers: true })
  assert.deepEqual(selected.map(({ id }) => id), [reference.id], `${reference.id}: reference inspection must remain separate from the physical chart`)
  const focused = visibleWorldSceneElements(model, { focusedDescriptionId: reference.descriptionIds[0] })
  assert.ok(focused.length > 0 && focused.every((element) => element.catalogue), `${reference.id}: a catalogue source must not imply physical placement`)
}

const expectedDescriptionIds = []
const expectedRouteIds = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [lineIndex, entry] of (node.text || []).entries()) {
    const id = `description:${nodeId}:${lineIndex}`
    expectedDescriptionIds.push(id)
    const description = descriptions.get(id)
    assert.ok(description, `${id}: source line omitted from 3D audit index`)
    assert.equal(description.nodeId, nodeId, `${id}: wrong story source`)
    assert.equal(description.lineIndex, lineIndex, `${id}: wrong source index`)
    assert.equal(description.source.kind, 'story-line', `${id}: incorrect source family`)
    assert.equal(description.text, albanianTextOf(lineOf(entry)), `${id}: source text drift`)
    if (isUnchartedStoryNode(nodeId)) {
      assert.ok(description.elementIds.includes(departureElementId(nodeId)), `${id}: missing exact uncharted context`)
      assert.equal(description.placeId, null)
      assert.equal(description.regionId, null)
      assert.ok(description.elementIds.every((elementId) => elements.get(elementId)?.catalogue), `${id}: uncharted ending gained a physical destination`)
    } else {
      assert.ok(description.elementIds.includes(`place:${PLACE_OF[nodeId]}`), `${id}: missing canonical place context`)
      assert.ok(elements.get(`place:${PLACE_OF[nodeId]}`).regionIds.includes(NODE_REGION[nodeId]), `${id}: scene's physical place disappears from its canonical region filter`)
    }
    assert.ok(description.bindings.length, `${id}: missing relationship classification`)
    for (const elementId of description.elementIds) {
      assert.ok(elements.get(elementId)?.descriptionIds.includes(id), `${id}: ${elementId} has no reciprocal source link`)
    }
  }
  for (const [optionIndex, option] of (node.options || []).entries()) {
    if (option.confuser) continue
    const canonical = routeForChoice(nodeId, option)
    if (!canonical.valid) continue
    const id = `route:${nodeId}:${optionIndex}`
    expectedRouteIds.push(id)
    const route = routes.get(id)
    assert.ok(route, `${id}: authored action omitted from 3D route index`)
    assert.equal(route.fromElementId, canonical.fromPlace ? `place:${canonical.fromPlace}` : null, `${id}: wrong source place`)
    assert.equal(route.toElementId, canonical.toPlace ? `place:${canonical.toPlace}` : null, `${id}: wrong destination place`)
    if (canonical.charted === false) assert.deepEqual(route.points, [], `${id}: uncharted departure invents route geometry`)
    assert.equal(route.spatial, canonical.spatial, `${id}: projection changed into a physical road`)
  }
}

for (const item of Object.values(ITEMS).filter((entry) => typeof entry.blurb === 'string')) {
  const id = `description:item:${item.id}:blurb`
  expectedDescriptionIds.push(id)
  const description = descriptions.get(id)
  assert.equal(description?.text, item.blurb, `${id}: canonical item description absent or stale`)
  assert.equal(description.source.kind, 'item-blurb', `${id}: wrong source family`)
  assert.equal(description.placeId, null, `${id}: catalogue metadata must not invent a physical location`)
  assert.ok(description.elementIds.includes(`item:${item.id}`), `${id}: missing item symbol`)
  assert.equal(elements.get(`item:${item.id}`)?.placeId, null, `${id}: catalogue symbol must remain unlocated`)
}
const expectedEnvironmentCases = Object.entries({
  time: [...new Set(Array.from({ length: 24 }, (_, clock) => civilDayPartAtClock(clock)))],
  season: SEASONS,
  weather: WEATHER_TYPES,
}).flatMap(([dimension, values]) => values.flatMap((value) =>
  ENVIRONMENT_NARRATION_SETTINGS.flatMap((setting) => ['opening', 'transition'].map((mode) =>
    `${dimension}:${value}:${setting}:${mode}`))))
assert.deepEqual(WORLD_SCENE_3D_ENVIRONMENT_CASES.map(({ id }) => id).sort(), expectedEnvironmentCases.sort(), 'generated environment template scope must cover the production state domains')
for (const entry of WORLD_SCENE_3D_ENVIRONMENT_CASES) {
  const id = `description:environment:${entry.id}`
  expectedDescriptionIds.push(id)
  const description = descriptions.get(id)
  assert.equal(entry.dimension === 'time' ? civilDayPartAtClock(entry.environment.clock) : entry.environment[entry.dimension], entry.value, `${id}: generated inputs do not represent their declared value`)
  assert.deepEqual(entry.options.omit, ENVIRONMENT_DIMENSIONS.filter((dimension) => dimension !== entry.dimension), `${id}: template must isolate its declared dimension`)
  assert.equal(Boolean(entry.options.transitionFrom), entry.mode === 'transition', `${id}: source inputs use the wrong opening/transition mode`)
  if (entry.mode === 'transition') assert.notEqual(entry.options.transitionFrom[entry.dimension], entry.value, `${id}: a transition must actually change its dimension`)
  assert.equal(description?.text, albanianTextOf(environmentStoryLine(entry.environment, entry.options)), `${id}: generated template differs from production narration`)
  assert.equal(description.source.kind, 'generated-environment', `${id}: wrong source family`)
  assert.ok(description.elementIds.includes(`environment-template:${entry.dimension}`), `${id}: missing dimension symbol`)
  assert.equal(description.applicability.mode, entry.mode, `${id}: opening/transition applicability drift`)
}
expectedDescriptionIds.push(...worldScene3dInventorySources().flatMap(({ statements }) => statements.map(({ id }) => id)))
assert.deepEqual([...descriptions.keys()].sort(), expectedDescriptionIds.sort(), 'source description inventory must be exact')
assert.deepEqual([...routes.keys()].sort(), expectedRouteIds.sort(), 'source route inventory must be exact')

for (const [placeId, nodeIds] of Object.entries(PLACE_NODES)) {
  const element = elements.get(`place:${placeId}`)
  assert.ok(element, `${placeId}: physical place omitted from 3D view`)
  assert.equal(element.position[0], NODE_POS[placeId][0], `${placeId}: chart X drift`)
  assert.equal(element.position[2], NODE_POS[placeId][1], `${placeId}: chart Y/Z drift`)
  for (const nodeId of nodeIds) {
    for (const [lineIndex] of (STORY[nodeId]?.text || []).entries()) {
      assert.ok(element.descriptionIds.includes(`description:${nodeId}:${lineIndex}`), `${placeId}: missing scene source ${nodeId}.text[${lineIndex}]`)
    }
  }
}
for (const element of model.elements) {
  assert.ok(element.position.every(Number.isFinite), `${element.id}: non-finite geometry position`)
  for (const descriptionId of element.descriptionIds) {
    assert.ok(descriptions.get(descriptionId)?.elementIds.includes(element.id), `${element.id}: dangling reverse link ${descriptionId}`)
  }
}

// Feature evidence is independently read from the authored witness, never
// inferred from the English label or from a noun somewhere else in the story.
for (const feature of WORLD_SCENE_3D_FEATURES) {
  const element = elements.get(`feature:${feature.id}`)
  assert.ok(element, `${feature.id}: reviewed structure has no rendered element`)
  assert.ok(feature.witnesses.length, `${feature.id}: no authored feature evidence`)
  for (const witness of feature.witnesses) {
    const entry = STORY[witness.nodeId]?.text?.[witness.lineIndex]
    assert.ok(entry, `${feature.id}: missing witness ${witness.nodeId}.text[${witness.lineIndex}]`)
    assert.equal(witness.text, albanianTextOf(lineOf(entry)), `${feature.id}: exact reviewed feature wording changed`)
    const senses = new Set(lineOf(entry).map((token) => token.id).filter(Boolean))
    assert.ok(witness.requires.length, `${feature.id}: feature witness has no required senses`)
    for (const sense of witness.requires) {
      assert.ok(senses.has(sense), `${feature.id}: witness no longer establishes ${sense}`)
    }
  }
}

for (const sightline of DISTANT_SIGHTLINES) {
  const relation = relations.get(`sightline:${sightline.id}`)
  assert.ok(relation, `${sightline.id}: registered sightline omitted`)
  assert.equal(relation.fromElementId, `place:${PLACE_OF[sightline.node]}`)
  assert.equal(relation.toElementId, `place:${PLACE_OF[sightline.target]}`)
  assert.ok(relation.descriptionIds.length, `${sightline.id}: sightline has no source description`)
  for (const id of relation.descriptionIds) {
    const description = descriptions.get(id)
    assert.equal(description?.nodeId, sightline.node, `${sightline.id}: source belongs to a different scene`)
    assert.ok(description.elementIds.includes(relation.toElementId), `${sightline.id}: source cannot locate visible target`)
  }
}
for (const barrier of WORLD_BARRIERS) {
  for (const [index, crossing] of barrier.crossings.entries()) {
    const relation = relations.get(`barrier-crossing:${barrier.id}:${index}`)
    assert.ok(relation, `${barrier.id}:${index}: named crossing omitted`)
    assert.ok(elements.has(relation.elementId), `${barrier.id}:${index}: crossing has no rendered marker`)
    const [from, to] = crossing.edge
    assert.equal(relation.fromElementId, `place:${PLACE_OF[from]}`)
    assert.equal(relation.toElementId, `place:${PLACE_OF[to]}`)
    const expected = model.routes.filter((route) =>
      (route.from === from && route.to === to) || (route.from === to && route.to === from))
      .map((route) => route.id)
    assert.ok(expected.length, `${barrier.id}:${index}: crossing has no playable route`)
    assert.deepEqual(relation.routeIds, expected, `${barrier.id}:${index}: named crossing omitted an authored passage`)
  }
}

let mutationCount = 0
function rejectsMutation(label, target, mutate) {
  const changed = structuredClone(model)
  mutate(changed)
  const issues = validateWorldScene3d(changed)
  assert.ok(Array.isArray(issues) && issues.length > 0, `${label}: corrupted model passed validation`)
  assert.ok(issues.every((issue) => typeof issue === 'string' && issue.trim()), `${label}: missing actionable diagnostics`)
  assert.ok(issues.some((issue) => issue.startsWith(`${target}:`)), `${label}: missing record-specific failure for ${target}; summary drift alone is insufficient`)
  mutationCount++
  return issues
}

const firstDescriptionId = model.descriptions[0].id
const firstRouteId = model.routes[0].id
const firstFeatureId = model.elements.find((element) => element.kind === 'feature').id
const firstSightlineId = model.relations.find((relation) => relation.kind === 'sightline').id
const firstCrossingId = model.relations.find((relation) => relation.kind === 'barrier-crossing').id
const firstItemDescriptionId = model.descriptions.find((description) => description.source.kind === 'item-blurb').id
const firstEnvironmentDescriptionId = model.descriptions.find((description) => description.source.kind === 'generated-environment').id
rejectsMutation('missing source line', firstDescriptionId, (changed) => changed.descriptions.splice(0, 1))
rejectsMutation('duplicated source identity', firstDescriptionId, (changed) => changed.descriptions.push(structuredClone(changed.descriptions[0])))
rejectsMutation('stale source text', firstDescriptionId, (changed) => { changed.descriptions[0].text += ' Unauthored audit mutation.' })
rejectsMutation('wrong scene provenance', firstDescriptionId, (changed) => { changed.descriptions[0].nodeId = '__missing_scene__' })
rejectsMutation('changed source visibility conditions', firstDescriptionId, (changed) => { changed.descriptions[0].conditions.all = ['__unauthored_condition__'] })
rejectsMutation('malformed source visibility conditions', firstDescriptionId, (changed) => { changed.descriptions[0].conditions = ['__unauthored_condition__'] })
rejectsMutation('unmapped source line', firstDescriptionId, (changed) => { changed.descriptions[0].elementIds = [] })
rejectsMutation('duplicate relationship evidence', firstDescriptionId, (changed) => {
  changed.descriptions[0].bindings.push(structuredClone(changed.descriptions[0].bindings[0]))
})
rejectsMutation('duplicate context cannot borrow inventory record identity', firstDescriptionId, (changed) => {
  const duplicate = structuredClone(changed.descriptions[0].bindings[0])
  duplicate.evidence = { recordId: 'forged-context-disposition' }
  changed.descriptions[0].bindings.push(duplicate)
})
rejectsMutation('absent actor depicted as present', 'description:fshatiSheshi:25', (changed) => {
  const description = changed.descriptions.find(({ id }) => id === 'description:fshatiSheshi:25')
  const element = changed.elements.find(({ id }) => id === 'actor:elira:fshatiSheshi')
  description.elementIds.push(element.id)
  description.bindings.push({ elementId: element.id, type: 'actor-metadata', evidence: { npcId: 'elira', nodeId: 'fshatiSheshi', evidence: 'npc:elira' } })
  element.descriptionIds.push(description.id)
  element.witnessConditions.push({ descriptionId: description.id, conditions: description.conditions })
  description.classification = 'canonical-metadata'
})
rejectsMutation('missing reverse provenance', firstDescriptionId, (changed) => {
  const description = changed.descriptions[0]
  const element = changed.elements.find((entry) => entry.id === description.elementIds[0])
  element.descriptionIds = element.descriptionIds.filter((id) => id !== description.id)
})
rejectsMutation('unknown element source', model.elements[0].id, (changed) => { changed.elements[0].descriptionIds.push('description:__missing_scene__:0') })
rejectsMutation('missing physical place', `place:${PLACE_OF.start}`, (changed) => {
  const index = changed.elements.findIndex((element) => element.id === `place:${PLACE_OF.start}`)
  changed.elements.splice(index, 1)
})
rejectsMutation('uncharted departure assigned a physical place', 'departure-context:maroPrincesha', (changed) => {
  changed.elements.find(({ id }) => id === 'departure-context:maroPrincesha').placeId = 'maroPallati'
})
rejectsMutation('uncharted departure given a route mesh', model.routes.find((route) => route.charted === false).id, (changed) => {
  changed.routes.find((route) => route.charted === false).points = [[252, 0, 410], [850, 0, 80]]
})
rejectsMutation('chart coordinate drift', `place:${PLACE_OF.start}`, (changed) => {
  changed.elements.find((element) => element.id === `place:${PLACE_OF.start}`).position[0] += 1
})
rejectsMutation('scene region alias omitted from physical place', 'place:start', (changed) => {
  changed.elements.find(({ id }) => id === 'place:start').regionIds = ['forest']
})
rejectsMutation('physical place hidden as an unlocated reference', `place:${PLACE_OF.start}`, (changed) => {
  changed.elements.find((element) => element.id === `place:${PLACE_OF.start}`).catalogue = true
})
rejectsMutation('non-finite geometry', model.elements[0].id, (changed) => { changed.elements[0].position[1] = Number.NaN })
rejectsMutation('missing authored route', firstRouteId, (changed) => changed.routes.splice(0, 1))
rejectsMutation('false route endpoint', firstRouteId, (changed) => { changed.routes[0].toElementId = 'place:__missing_place__' })
rejectsMutation('forged route direction', firstRouteId, (changed) => { changed.routes[0].direction = '__invented_direction__' })
rejectsMutation('forged route region', firstRouteId, (changed) => { changed.routes[0].fromRegion = '__invented_region__' })
rejectsMutation('wrong route source option index', firstRouteId, (changed) => { changed.routes[0].optionIndex += 1 })
rejectsMutation('route geometry detached from its source place', firstRouteId, (changed) => {
  const route = changed.routes.find((entry) => entry.points?.length >= 2)
  assert.ok(route, 'production 3D model must expose route geometry')
  route.points[0][0] += 10
})
rejectsMutation('projection depicted as a physical journey', model.routes.find((route) => route.spatial === false).id, (changed) => {
  const route = changed.routes.find((entry) => entry.spatial === false)
  assert.ok(route, 'production story must retain its tale projection distinction')
  route.spatial = true
})
rejectsMutation('missing feature witness', firstFeatureId, (changed) => {
  changed.elements.find((element) => element.kind === 'feature').witnesses = []
})
rejectsMutation('unsupported feature at another place', firstFeatureId, (changed) => {
  changed.elements.find((element) => element.kind === 'feature').placeId = '__unwitnessed_place__'
})
rejectsMutation('invented geometry with a current summary count', 'feature:unbacked', (changed) => {
  const unbacked = structuredClone(changed.elements.find((element) => element.kind === 'feature'))
  Object.assign(unbacked, {
    id: 'feature:unbacked', label: 'Unauthored castle', descriptionIds: [],
    witnesses: [], witnessConditions: [], conditional: false,
  })
  changed.elements.push(unbacked)
  changed.statistics.elements++
})
rejectsMutation('forged construction source', firstFeatureId, (changed) => {
  changed.elements.find((element) => element.id === firstFeatureId).source = { file: 'invented.js', authority: 'invented' }
})
const firstFeatureDescriptionId = model.descriptions.find((description) => description.bindings.some((binding) => binding.type === 'reviewed-feature')).id
rejectsMutation('forged feature witness source', firstFeatureDescriptionId, (changed) => {
  changed.descriptions.find((description) => description.id === firstFeatureDescriptionId)
    .bindings.find((binding) => binding.type === 'reviewed-feature').evidence.source = {
      file: 'invented.js', authority: 'STORY', nodeId: 'lumi', lineIndex: 2, path: 'STORY.lumi.text[2]',
    }
})
const firstFixtureId = model.elements.find((element) => element.kind === 'fixture').id
rejectsMutation('fixture geometry detached from canonical place', firstFixtureId, (changed) => {
  changed.elements.find((element) => element.id === firstFixtureId).position[0] += 100
})
assert.ok(rejectsMutation('bridge detached from its shores', 'feature:fshaj-bridge', (changed) => {
  changed.elements.find(({ id }) => id === 'feature:fshaj-bridge').geometry.rotationY = 0
}).some((issue) => issue.includes('bridge deck must span both exact crossing endpoints')), 'bridge mismatch must explain the failed physical relationship')
assert.ok(rejectsMutation('bridge stops short of its shores', 'feature:village-bridge', (changed) => {
  changed.elements.find(({ id }) => id === 'feature:village-bridge').geometry.size[0] = 20
}).some((issue) => issue.includes('bridge deck must span both exact crossing endpoints')), 'short bridge must fail its span constraint')
assert.ok(rejectsMutation('bed outside the inn', 'feature:inn-bed', (changed) => {
  changed.elements.find(({ id }) => id === 'feature:inn-bed').position[0] += 30
}).some((issue) => issue.includes('contained feature must fit inside feature:inn-building')), 'bed mismatch must explain containment rather than only blueprint drift')
assert.ok(rejectsMutation('well shaft erected above ground', 'feature:square-well', (changed) => {
  changed.elements.find(({ id }) => id === 'feature:square-well').position[1] = 4.5
}).some((issue) => issue.includes('shaft must extend below ground')), 'well mismatch must explain the depth constraint')
assert.ok(rejectsMutation('river above its bridge', 'feature:fshaj-river-below', (changed) => {
  changed.elements.find(({ id }) => id === 'feature:fshaj-river-below').position[1] = 20
}).some((issue) => issue.includes('feature must lie below feature:fshaj-bridge')), 'river mismatch must explain the vertical relationship')
assert.ok(rejectsMutation('river misses its bridge', 'feature:fshaj-river-below', (changed) => {
  changed.elements.find(({ id }) => id === 'feature:fshaj-river-below').position[0] += 100
}).some((issue) => issue.includes('feature must overlap the ground footprint')), 'river mismatch must explain the missing crossing')
rejectsMutation('unreviewed distant feature mapping', 'description:deti1:5', (changed) => {
  changed.descriptions.find(({ id }) => id === 'description:deti1:5').bindings.find(({ type }) => type === 'reviewed-feature').evidence.location.route.to = 'start'
})
assert.ok(rejectsMutation('restored well mapped through its dry-only approach', 'description:fshatiSheshi:1', (changed) => {
  const dryRoute = squareWellViews.find(({ lineIndex }) => lineIndex === 0).location.route
  const wetView = changed.descriptions.find(({ id }) => id === 'description:fshatiSheshi:1')
  wetView.bindings.find(({ type, elementId }) => type === 'reviewed-feature' && elementId === 'feature:square-well').evidence.location.route = { ...dryRoute }
}).some((issue) => issue.startsWith('description:fshatiSheshi:1:') && issue.includes('approach excludes') && issue.includes(restoredFact)),
'wrong wet-to-dry mapping must name the contradictory world condition, not only stale registry metadata')
rejectsMutation('missing containment provenance', 'feature:inn-bed', (changed) => {
  changed.elements.find(({ id }) => id === 'feature:inn-bed').relations = []
})
const firstObservationDescriptionId = model.descriptions.find((description) => description.bindings.some(({ type }) => type === 'observation-metadata')).id
rejectsMutation('forged observation evidence', firstObservationDescriptionId, (changed) => {
  changed.descriptions.find(({ id }) => id === firstObservationDescriptionId).bindings.find(({ type }) => type === 'observation-metadata').evidence.observationId = '__invented_observation__'
})
const firstSightlineDescriptionId = model.descriptions.find((description) => description.bindings.some(({ type }) => type === 'distant-sightline')).id
rejectsMutation('forged sightline evidence', firstSightlineDescriptionId, (changed) => {
  changed.descriptions.find(({ id }) => id === firstSightlineDescriptionId).bindings.find(({ type }) => type === 'distant-sightline').evidence.requires = ['__invented_sense__']
})
rejectsMutation('conditional feature presented as unconditional', dryRiver.id, (changed) => {
  changed.elements.find((element) => element.id === dryRiver.id).conditional = false
})
rejectsMutation('missing named barrier crossing', firstCrossingId, (changed) => {
  const index = changed.relations.findIndex((relation) => relation.kind === 'barrier-crossing')
  changed.relations.splice(index, 1)
})
rejectsMutation('missing crossing route coverage', firstCrossingId, (changed) => {
  changed.relations.find((relation) => relation.kind === 'barrier-crossing').routeIds = []
})
rejectsMutation('missing distant observation', firstSightlineId, (changed) => {
  const index = changed.relations.findIndex((relation) => relation.kind === 'sightline')
  changed.relations.splice(index, 1)
})
rejectsMutation('distant observation names a different target', firstSightlineId, (changed) => {
  changed.relations.find((relation) => relation.kind === 'sightline').toElementId = 'place:__unseen_target__'
})
rejectsMutation('distant observation lacks its source line', firstSightlineId, (changed) => {
  changed.relations.find((relation) => relation.kind === 'sightline').descriptionIds = []
})
rejectsMutation('forged spatial relation source', firstSightlineId, (changed) => {
  changed.relations.find((relation) => relation.id === firstSightlineId).source = { file: 'invented.js', authority: 'invented' }
})
rejectsMutation('item catalogue source drift', firstItemDescriptionId, (changed) => {
  changed.descriptions.find((description) => description.id === firstItemDescriptionId).text = 'Unsupported item description.'
})
rejectsMutation('generated narration template omitted', firstEnvironmentDescriptionId, (changed) => {
  const index = changed.descriptions.findIndex((description) => description.id === firstEnvironmentDescriptionId)
  changed.descriptions.splice(index, 1)
})
rejectsMutation('generated narration loses opening/transition provenance', firstEnvironmentDescriptionId, (changed) => {
  changed.descriptions.find((description) => description.id === firstEnvironmentDescriptionId).applicability.mode = 'unregistered'
})

console.log(`✓ 3D world: ${Object.keys(PLACE_NODES).length} places, ${model.descriptions.length} exact source descriptions, ${model.routes.length} routes; ${mutationCount + inventoryChecks.probes + profileChecks.corruptions} corruptions rejected; ${surveyChecks.surveyed} world elements + ${surveyChecks.references} unlocated references rendered`)

console.log(`✓ Node scene renders: ${nodeChecks.nodes} baseline views, ${nodeChecks.witnessViews} exact source witnesses, ${nodeChecks.reciprocalLinks} reciprocal links, ${nodeChecks.corruptions} rejected corruptions; ${nodeRendererChecks.assets} composed mesh assets with full-sphere projection`)
console.log(`✓ Node physical clearance: ${nodeSpatialChecks.views} baseline/source views across ${nodeSpatialChecks.places} physical places, ${nodeSpatialChecks.actorSamples} actor body/head samples; ${nodeSpatialChecks.corruptions} solid-obstruction probes rejected`)
console.log(`✓ Source-grounded scene semantics: ${JSON.stringify(nodeSemanticChecks)}`)
console.log(`✓ Uncharted ship scenes: ${JSON.stringify(nodeShipChecks)}`)
console.log(`✓ Shore and rescue sightlines: ${JSON.stringify(nodeCoastRescueChecks)}`)
