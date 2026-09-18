import { UNCHARTED_STORY_NODES, isUnchartedStoryNode } from './departureContexts.js'
// A debug-only, inspectable 3D chart. Canonical topology lives in NODE_POS /
// PLACE_OF and worldModel; this adapter never changes the playable world.
// Every authored line has a reverse-indexed scene-context link. Only explicit
// metadata or a reviewed feature witness can assert more than that context.
import { ITEMS, STORY, lineOf } from './content.js'
import { albanianTextOf } from './language.js'
import { NODE_POS, PLACE_NODES, PLACE_OF } from '../components/nodePositions.js'
import { PLACE_META } from '../components/placeMeta.js'
import { NODE_REGION, REGIONS } from './regions.js'
import { WORLD_AXES, DISTANT_SIGHTLINES, routeForChoice } from './worldModel.js'
import { WORLD_BARRIERS } from './worldBarriers.js'
import { WORLD_ENTITIES } from './worldEntities.js'
import { TIMED_WORLD_FIXTURES, parseFixtureCondition } from './worldFixtures.js'
import { observationIdOfLine, sceneLineRoleOf } from './observations.js'
import { WORLD_SCENE_3D_FEATURES } from './data/worldScene3dFeatures.js'
import { WORLD_SCENE_3D_PLACE_FEATURES, WORLD_SCENE_3D_PLACE_PROFILES } from './data/worldScene3dPlaceFeatures.js'
import { validateWorldScene3dPlaceProfiles } from './worldScene3dPlaceProfiles.js'
import { buildWorldScene3dInventory, validateWorldScene3dInventory } from './worldScene3dInventory.js'
import { SEASONS, WEATHER_TYPES, civilDayPartAtClock } from './environment.js'
import { ENVIRONMENT_DIMENSIONS, ENVIRONMENT_NARRATION_SETTINGS } from './environmentNarration.js'
import { environmentStoryLine } from './storyContext.js'

export const WORLD_SCENE_3D_VERSION = 3
const ALL_FEATURES = [...WORLD_SCENE_3D_FEATURES, ...WORLD_SCENE_3D_PLACE_FEATURES]
const featureSource = (feature) => WORLD_SCENE_3D_PLACE_FEATURES.includes(feature)
  ? { file: 'src/game/data/worldScene3dPlaceFeatures.js', authority: 'WORLD_SCENE_3D_PLACE_FEATURES', key: feature.id }
  : { file: 'src/game/data/worldScene3dFeatures.js', authority: 'WORLD_SCENE_3D_FEATURES', key: feature.id }
const inventoryBindingTypes = ['inventory-source', 'inventory-item-location']
const bindingRecordId = (type, evidence) => inventoryBindingTypes.includes(type) ? evidence?.recordId || '' : ''
const conditionalKinds = ['fixture', 'perception', 'actor', 'environment', 'catalogue', 'item-action', 'source-reference']
export const WORLD_SCENE_3D_COORDINATES = Object.freeze({
  order: Object.freeze(['chart-x', 'illustrative-height', 'chart-y']),
  chartAxes: WORLD_AXES,
  canonicalComponents: Object.freeze([0, 2]),
  heightAuthority: 'illustrative-only',
  geographicCardinalsSupported: false,
  scale: 'not-to-scale',
  note: 'X/Z preserve the mythic chart exactly. Height, feature dimensions and local offsets are illustrative; they do not assert geographic altitude, building measurements or walked distances.',
})

const list = (value) => value == null ? [] : [].concat(value)
const unique = (values) => [...new Set(values)]
const equal = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const finiteVector = (value) => Array.isArray(value) && value.length === 3 && value.every(Number.isFinite)
const hasConditions = (conditions) => Boolean(conditions?.all?.length || conditions?.none?.length || conditions?.observationId)
const isContextBinding = (type) => type === 'scene-context' || type === 'region-context' || type === 'departure-context'
const descriptionId = (nodeId, lineIndex) => `description:${nodeId}:${lineIndex}`
const placeElementId = (nodeId) => PLACE_OF[nodeId] ? `place:${PLACE_OF[nodeId]}` : null
export const departureElementId = (nodeId) => isUnchartedStoryNode(nodeId) ? `departure-context:${nodeId}` : null
const contextElementId = (nodeId) => departureElementId(nodeId) || placeElementId(nodeId)
const departureElement = (nodeId, index) => ({
  id: departureElementId(nodeId), kind: 'catalogue', label: 'Departure — destination uncharted', catalogue: true,
  placeId: null, regionId: null, nodeIds: [nodeId],
  position: [Math.min(...Object.values(NODE_POS).map(([x]) => x)) - 180, 8, Math.min(...Object.values(NODE_POS).map(([, z]) => z)) + index * 30],
  geometry: { shape: 'box', size: [12, 12, 12] },
  source: { file: 'src/game/departureContexts.js', authority: 'DEPARTURE_CONTEXTS', key: nodeId },
})
const positionAt = (nodeId, height = 0, offset = [0, 0, 0]) => [
  NODE_POS[nodeId]?.[0] + offset[0], height + offset[1], NODE_POS[nodeId]?.[1] + offset[2],
]
const textSource = (nodeId, lineIndex) => ({
  file: 'src/game/content.js', authority: 'STORY', kind: 'story-line', nodeId, lineIndex,
  path: `STORY.${nodeId}.text[${lineIndex}]`,
})

// Each dimension is inspected separately. The production builder owns the
// combined sentence grammar; these templates cover every opening/onset state
// and both indoor/outdoor settings without inventing a second prose bank.
const dayPartClocks = [...new Map(Array.from({ length: 24 }, (_, clock) => [civilDayPartAtClock(clock), clock])).entries()]
export const WORLD_SCENE_3D_ENVIRONMENT_CASES = Object.freeze(ENVIRONMENT_DIMENSIONS.flatMap((dimension) => {
  const values = dimension === 'time' ? dayPartClocks.map(([value, clock]) => ({ value, clock }))
    : (dimension === 'season' ? SEASONS : WEATHER_TYPES).map((value) => ({ value }))
  return values.flatMap(({ value, clock }) => ENVIRONMENT_NARRATION_SETTINGS.flatMap((setting) => ['opening', 'transition'].map((mode) => {
    const environment = { clock: clock ?? 0, season: 'spring', weather: 'clear', ...(dimension !== 'time' ? { [dimension]: value } : {}) }
    const previousValue = values.find((entry) => entry.value !== value)?.value
    return Object.freeze({
      id: `${dimension}:${value}:${setting}:${mode}`, dimension, value, setting, mode,
      environment: Object.freeze(environment),
      options: Object.freeze({ setting, omit: ENVIRONMENT_DIMENSIONS.filter((entry) => entry !== dimension),
        ...(mode === 'transition' ? { transitionFrom: { [dimension]: previousValue } } : {}),
      }),
    })
  })))
}))

const catalogueDescription = (id, text, source, extra = {}) => ({
  id, nodeId: null, lineIndex: null, placeId: null, regionId: null,
  text, source, reading: null, tokenIds: [],
  conditions: { all: [], negate: false, none: [], observationId: null },
  role: 'reference-catalogue', environmentDimensions: [], observationId: null, npcIdentity: null,
  elementIds: [], bindings: [], classification: 'canonical-metadata', ...extra,
})

function supplementalDescriptions() {
  return [
    ...Object.values(ITEMS).filter((item) => typeof item.blurb === 'string').map((item) => catalogueDescription(
      `description:item:${item.id}:blurb`, item.blurb,
      { file: 'src/game/content.js', authority: 'ITEMS', kind: 'item-blurb', key: item.id, path: `ITEMS.${item.id}.blurb` },
      { itemId: item.id },
    )),
    ...WORLD_SCENE_3D_ENVIRONMENT_CASES.map((entry) => {
      const line = environmentStoryLine(entry.environment, entry.options)
      return catalogueDescription(`description:environment:${entry.id}`, albanianTextOf(line),
        { file: 'src/game/storyContext.js', authority: 'environmentStoryLine', kind: 'generated-environment', key: entry.id,
          path: `environmentStoryLine(${entry.id})`, inputs: { environment: entry.environment, options: entry.options } },
        { reading: line?.reading || null, tokenIds: line.filter((token) => token.id).map((token) => token.id),
          templateId: entry.id, dimension: entry.dimension, applicability: {
            dimension: entry.dimension, value: entry.value, setting: entry.setting, mode: entry.mode,
            scope: 'world-or-current-tale-clock', omittedWhenAuthored: true,
            emission: entry.mode === 'opening' ? 'initial-uncommunicated-dimension' : 'changed-since-communicated',
          },
        })
    }),
  ]
}
const optionSource = (nodeId, optionIndex) => ({
  file: 'src/game/content.js', authority: 'STORY', nodeId, optionIndex,
  path: `STORY.${nodeId}.options[${optionIndex}]`,
})

// Preserve the actual conjunction / negated conjunction / excluded conditions.
// Do not flatten unless([a,b]) into two exclusions: those are different rules.
export function worldScene3dLineConditions(entry) {
  const line = lineOf(entry)
  return {
    all: Array.isArray(entry) ? [] : list(entry.cond),
    negate: !Array.isArray(entry) && Boolean(entry.negate),
    none: Array.isArray(entry) ? [] : list(entry.none),
    observationId: observationIdOfLine(line),
  }
}

// A reviewed sight of a landmark cannot use an approach which is explicitly
// forbidden in that source's state. This is a narrow contradiction check, not
// a second evaluator for the game's world predicates. In particular, unless
// [a,b] does not prove that either individual condition is absent.
export function worldScene3dApproachConditionConflicts(conditions, option) {
  const all = list(conditions?.all)
  const positive = conditions?.negate ? [] : all
  const negative = [...list(conditions?.none), ...(conditions?.negate && all.length === 1 ? all : [])]
  const required = list(option?.requires)
  const excluded = list(option?.unless)
  return unique([
    ...positive.filter((condition) => excluded.includes(condition)).map((condition) => `approach excludes the source's required condition ${condition}`),
    ...negative.filter((condition) => required.includes(condition)).map((condition) => `approach requires the source's excluded condition ${condition}`),
  ])
}

function sourceDescription(nodeId, entry, lineIndex) {
  const line = lineOf(entry)
  return {
    id: descriptionId(nodeId, lineIndex), nodeId, lineIndex,
    placeId: PLACE_OF[nodeId] || null, regionId: NODE_REGION[nodeId] || null,
    source: textSource(nodeId, lineIndex), text: albanianTextOf(line),
    // English stays within the lazy debug atlas and is not a validation input:
    // production loads reviewed readings separately, after the base story.
    reading: line?.reading || null,
    tokenIds: (line || []).filter((token) => token.id).map((token) => token.id),
    conditions: worldScene3dLineConditions(entry),
    role: sceneLineRoleOf(entry),
    environmentDimensions: [...(line?.environmentDimensions || [])],
    observationId: observationIdOfLine(line),
    npcIdentity: entry?.npcIdentity ? { ...entry.npcIdentity } : null,
    elementIds: [], bindings: [], classification: 'context-only',
  }
}

const shape = (name, size) => ({ shape: name, size: [...size] })
const baseElement = (id, kind, label, nodeId, geometry, offset = [0, 0, 0]) => ({
  id, kind, label, placeId: PLACE_OF[nodeId] || null, regionId: NODE_REGION[PLACE_OF[nodeId] || nodeId] || null,
  position: positionAt(nodeId, 0, offset), geometry,
  descriptionIds: [], source: null,
})

const crossingForFeature = (feature) => ['crossing', 'crossing-center'].includes(feature.placement?.kind)
  ? WORLD_BARRIERS.find(({ id }) => id === feature.placement.barrierId)?.crossings[feature.placement.crossingIndex]
  : null
const regionMemberships = (element) => unique([
  element.regionId,
  ...(element.placeIds || [element.placeId]).flatMap((placeId) => (PLACE_NODES[placeId] || []).map((nodeId) => NODE_REGION[nodeId])),
].filter(Boolean))

function featureSpatialProperties(feature) {
  const crossing = crossingForFeature(feature)
  const geometry = shape(feature.geometry.shape, feature.geometry.size)
  if (!crossing) return {
    placeId: PLACE_OF[feature.nodeId], regionId: NODE_REGION[PLACE_OF[feature.nodeId]],
    position: positionAt(feature.nodeId, 0, feature.offset), geometry,
  }
  const [from, to] = crossing.edge
  const a = NODE_POS[from], b = NODE_POS[to]
  if (feature.placement.kind === 'crossing') {
    geometry.size[0] = Math.hypot(b[0] - a[0], b[1] - a[1])
    geometry.rotationY = -Math.atan2(b[1] - a[1], b[0] - a[0])
  }
  return {
    placeId: null, placeIds: unique(crossing.edge.map((nodeId) => PLACE_OF[nodeId])),
    regionId: NODE_REGION[PLACE_OF[from]],
    position: [(a[0] + b[0]) / 2, feature.offset[1], (a[1] + b[1]) / 2], geometry,
  }
}

const featureLocalPoint = (element, point) => {
  const angle = element.geometry.rotationY || 0
  const dx = point[0] - element.position[0], dz = point[2] - element.position[2]
  return [Math.cos(angle) * dx - Math.sin(angle) * dz, point[1] - element.position[1], Math.sin(angle) * dx + Math.cos(angle) * dz]
}
const featureCorners = (element) => {
  const angle = element.geometry.rotationY || 0
  return [-1, 1].flatMap((x) => [-1, 1].flatMap((y) => [-1, 1].map((z) => {
    const [dx, dy, dz] = element.geometry.size.map((size, axis) => size * [x, y, z][axis] / 2)
    return [element.position[0] + Math.cos(angle) * dx + Math.sin(angle) * dz,
      element.position[1] + dy, element.position[2] - Math.sin(angle) * dx + Math.cos(angle) * dz]
  })))
}
const overlappingFootprints = (a, b) => [a, b].every((element) => {
  const angle = element.geometry.rotationY || 0
  return [[Math.cos(angle), -Math.sin(angle)], [Math.sin(angle), Math.cos(angle)]].every(([x, z]) => {
    const project = (target) => featureCorners(target).map((point) => point[0] * x + point[2] * z)
    const pa = project(a), pb = project(b)
    return Math.max(...pa) >= Math.min(...pb) && Math.max(...pb) >= Math.min(...pa)
  })
})

function actorReferences(description) {
  const references = []
  // A name/descriptor annotation identifies who prose is about; it does not
  // say where they stand. It also annotates departures and absent people.
  // Likewise, excluded conditions and a negated conjunction cannot establish
  // positive presence. Keep those facts on the source without inventing an
  // actor at the observer's position when that source is inspected.
  if (description.conditions?.negate) return references
  for (const condition of list(description.conditions?.all)) {
    if (typeof condition !== 'string') continue
    const parts = condition.split(':')
    if (parts[0] === 'npc' && parts.length === 2) references.push({ npcId: parts[1], nodeId: description.nodeId, evidence: condition })
    if (parts[0] === 'npcAt' && parts.length === 3) references.push({ npcId: parts[1], nodeId: parts[2], evidence: condition })
  }
  const canonical = references.filter(({ npcId, nodeId }) =>
    WORLD_ENTITIES[`npc:${npcId}`]?.route?.includes(placeElementId(nodeId)))
  return [...new Map(canonical.map((reference) => [`${reference.npcId}:${PLACE_OF[reference.nodeId]}`, reference])).values()]
}

export function buildWorldScene3d() {
  const elements = []
  const descriptions = []
  const routes = []
  const relations = []
  const elementById = new Map()
  const descriptionById = new Map()
  const addElement = (element) => {
    if (elementById.has(element.id)) return elementById.get(element.id)
    elements.push(element)
    elementById.set(element.id, element)
    return element
  }
  const bind = (description, elementId, type, evidence) => {
    const element = elementById.get(elementId)
    if (!description || !element) return
    if (!description.elementIds.includes(elementId)) description.elementIds.push(elementId)
    if (!element.descriptionIds.includes(description.id)) element.descriptionIds.push(description.id)
    if (!description.bindings.some((binding) => binding.elementId === elementId && binding.type === type && bindingRecordId(type, binding.evidence) === bindingRecordId(type, evidence))) {
      description.bindings.push({ elementId, type, evidence })
    }
  }

  for (const region of REGIONS) {
    addElement({
      id: `region:${region.key}`, kind: 'region', label: region.label || 'the village',
      regionId: region.key, placeId: null,
      position: [region.cx, -23, region.cy], geometry: shape('plane', [region.rx * 2, 40, region.ry * 2]),
      descriptionIds: [],
      source: { file: 'src/game/regions.js', authority: 'REGIONS', key: region.key },
      interpretation: 'Schematic region footprint from the existing chart, not a continuous land survey.',
    })
  }
  for (const [anchor, nodes] of Object.entries(PLACE_NODES)) {
    addElement({
      ...baseElement(`place:${anchor}`, 'place', PLACE_META[anchor]?.name || anchor, anchor, shape('cylinder', [12, 4, 12]), [0, 2, 0]),
      nodeIds: [...nodes],
      source: { file: 'src/components/nodePositions.js', authority: 'NODE_POS/PLACE_OF', key: anchor },
      interpretation: 'Canonical physical-place anchor. The plinth is a location marker, not a building.',
    })
  }
  for (const [index, nodeId] of UNCHARTED_STORY_NODES.entries()) addElement({
    ...departureElement(nodeId, index), descriptionIds: [],
    interpretation: 'An unlocated departure reference, outside the physical chart. Only the exact arrival action establishes its origin; the destination stays unknown.',
  })
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [lineIndex, entry] of (node.text || []).entries()) {
      const description = sourceDescription(nodeId, entry, lineIndex)
      descriptions.push(description)
      descriptionById.set(description.id, description)
      if (isUnchartedStoryNode(nodeId)) bind(description, departureElementId(nodeId), 'departure-context', 'The departure origin depends on the exact incoming action; no destination position is asserted.')
      else bind(description, placeElementId(nodeId), 'scene-context', 'The canonical physical place of this story line; no object-presence claim.')
      if (!isUnchartedStoryNode(nodeId)) bind(description, `region:${NODE_REGION[nodeId]}`, 'region-context', 'Canonical region membership; not a separate terrain assertion.')
    }
    for (const [optionIndex, option] of (node.options || []).entries()) {
      if (option.confuser) continue
      const route = routeForChoice(nodeId, option)
      const start = elementById.get(placeElementId(nodeId))
      const end = elementById.get(placeElementId(option.to))
      routes.push({
        ...route, id: `route:${nodeId}:${optionIndex}`, optionIndex,
        fromElementId: placeElementId(nodeId), toElementId: placeElementId(option.to),
        points: start && end ? [[...start.position], [...end.position]] : [],
        text: albanianTextOf(option.text), source: optionSource(nodeId, optionIndex),
      })
    }
  }

  for (const feature of ALL_FEATURES) {
    const id = `feature:${feature.id}`
    const element = addElement({
      ...baseElement(id, 'feature', feature.label, feature.nodeId, shape(feature.geometry.shape, feature.geometry.size), feature.offset),
      ...featureSpatialProperties(feature),
      placement: feature.placement || { kind: 'at-place', nodeId: feature.nodeId },
      relations: feature.relations || [],
      featureId: feature.id, source: featureSource(feature),
      interpretation: feature.interpretation, color: feature.color, depiction: feature.depiction,
      witnesses: feature.witnesses.map((witness) => ({ ...witness, requires: [...witness.requires], descriptionId: descriptionId(witness.nodeId, witness.lineIndex) })),
    })
    for (const witness of element.witnesses) {
      bind(descriptionById.get(witness.descriptionId), id, 'reviewed-feature', {
        featureId: feature.id, requires: [...witness.requires], source: textSource(witness.nodeId, witness.lineIndex),
        ...(witness.location ? { location: witness.location } : {}),
      })
    }
  }

  for (const profile of WORLD_SCENE_3D_PLACE_PROFILES) {
    for (const association of profile.associations || []) {
      bind(descriptionById.get(descriptionId(association.witness.nodeId, association.witness.lineIndex)),
        `feature:${association.featureId}`, 'reviewed-place-view', {
          placeId: profile.placeId, featureId: association.featureId,
          source: textSource(association.witness.nodeId, association.witness.lineIndex), rationale: association.rationale,
        })
    }
  }

  for (const [fixtureId, fixture] of Object.entries(TIMED_WORLD_FIXTURES)) {
    addElement({
      ...baseElement(`fixture:${fixtureId}`, 'fixture', fixtureId === 'campfire' ? 'Campfire' : 'Mill lamp', fixture.nodeId,
        shape(fixtureId === 'campfire' ? 'cone' : 'box', fixtureId === 'campfire' ? [10, 13, 10] : [5, 8, 5]), [9, 6.5, 7]),
      entityId: `fixture:${fixtureId}`, states: fixture.stages.map(({ id }) => id),
      source: { file: 'src/game/worldFixtures.js', authority: 'TIMED_WORLD_FIXTURES', key: fixtureId },
      interpretation: 'Canonical timed fixture; all possible described states are indexed, not asserted simultaneously.',
    })
  }
  for (const entity of Object.values(WORLD_ENTITIES).filter((entry) => entry.kind === 'perception')) {
    const anchor = entity.relations?.find(({ type }) => type === 'at')?.target?.slice('place:'.length)
    if (!anchor) continue
    addElement({
      ...baseElement(entity.id, 'perception', entity.name, anchor, shape('pyramid', [5, 7, 5]), [-9, 4, 8]),
      entityId: entity.id, source: { file: 'src/game/worldEntities.js', authority: 'WORLD_ENTITIES', key: entity.id },
      interpretation: 'An observation point. Its linked prose retains the exact observed:<id> gate.',
    })
  }
  for (const description of descriptions) {
    for (const dimension of description.environmentDimensions) {
      const id = `environment:${description.placeId}:${dimension}`
      const index = ['time', 'season', 'weather'].indexOf(dimension)
      addElement({
        ...baseElement(id, 'environment', `${dimension} at ${description.placeId}`, description.nodeId, shape('box', [4, 4, 4]), [-10 + index * 5, 16, -6]),
        dimension, source: { file: 'src/game/environmentNarration.js', authority: 'describesEnvironment', key: dimension },
        interpretation: 'Authored environment-dimension marker; this is a state annotation, not a permanent weather object.',
      })
      bind(description, id, 'environment-metadata', { dimension })
    }
    if (description.observationId) {
      bind(description, `perception:${description.observationId}`, 'observation-metadata', { observationId: description.observationId })
    }
    for (const condition of [...list(description.conditions?.all), ...list(description.conditions?.none)]) {
      const fixture = parseFixtureCondition(condition)
      if (fixture) bind(description, `fixture:${fixture.fixtureId}`, 'fixture-state', { condition, stateId: fixture.stateId })
    }
    for (const reference of actorReferences(description)) {
      const entity = WORLD_ENTITIES[`npc:${reference.npcId}`]
      const id = `actor:${reference.npcId}:${PLACE_OF[reference.nodeId]}`
      addElement({
        ...baseElement(id, 'actor', entity.name, reference.nodeId, shape('cylinder', [4, 12, 4]), [8, 6, -9]),
        entityId: entity.id,
        source: { file: 'src/game/worldEntities.js', authority: 'WORLD_ENTITIES', key: entity.id },
        interpretation: 'A possible canonical NPC route stop, not an assertion that the actor is here in every state.',
      })
      bind(description, id, 'actor-metadata', reference)
    }
  }

  for (const sightline of DISTANT_SIGHTLINES) {
    const fromElementId = placeElementId(sightline.node)
    const toElementId = placeElementId(sightline.target)
    const sources = descriptions.filter((description) => description.nodeId === sightline.node && sightline.requires.every((id) => description.tokenIds.includes(id)))
    const relation = {
      id: `sightline:${sightline.id}`, kind: 'sightline', fromElementId, toElementId,
      nodeId: sightline.node, targetNodeId: sightline.target,
      descriptionIds: sources.map(({ id }) => id), requires: [...sightline.requires],
      points: [elementById.get(fromElementId)?.position, elementById.get(toElementId)?.position].map((point) => point ? [...point] : []),
      source: { file: 'src/game/worldModel.js', authority: 'DISTANT_SIGHTLINES', key: sightline.id },
      interpretation: 'Potential authored sightline; the canonical weather/time visibility policy still controls actual play.',
    }
    relations.push(relation)
    for (const description of sources) bind(description, toElementId, 'distant-sightline', { relationId: relation.id, requires: relation.requires })
  }
  for (const barrier of WORLD_BARRIERS) {
    for (const [crossingIndex, crossing] of barrier.crossings.entries()) {
      const [from, to] = crossing.edge
      const fromElementId = placeElementId(from)
      const toElementId = placeElementId(to)
      const a = elementById.get(fromElementId)?.position
      const b = elementById.get(toElementId)?.position
      const id = `crossing:${barrier.id}:${crossingIndex}`
      addElement({
        ...baseElement(id, 'barrier', crossing.structure, from, shape('box', [14, 5, 12])),
        position: a && b ? [(a[0] + b[0]) / 2, 5, (a[2] + b[2]) / 2] : [],
        source: { file: 'src/game/worldBarriers.js', authority: 'WORLD_BARRIERS', key: barrier.id, crossingIndex },
        interpretation: 'Registered crossing symbol between exact route endpoints. The barrier’s uncharted course is not invented.',
      })
      relations.push({
        id: `barrier-crossing:${barrier.id}:${crossingIndex}`, kind: 'barrier-crossing',
        barrierId: barrier.id, crossingIndex, elementId: id, fromElementId, toElementId,
        from, to, sides: [...barrier.sides], reason: crossing.reason,
        routeIds: routes.filter((route) => (route.from === from && route.to === to) || (route.from === to && route.to === from)).map(({ id: routeId }) => routeId),
        points: a && b ? [[...a], [...b]] : [],
        source: { file: 'src/game/worldBarriers.js', authority: 'WORLD_BARRIERS', key: barrier.id, crossingIndex },
      })
    }
  }
  const shelfX = Math.min(...Object.values(NODE_POS).map(([x]) => x)) - 90
  const shelfZ = Math.min(...Object.values(NODE_POS).map(([, z]) => z))
  for (const [itemIndex, item] of Object.values(ITEMS).entries()) {
    addElement({
      id: `item:${item.id}`, kind: 'catalogue', label: item.name, catalogue: true,
      placeId: null, regionId: null, entityId: `item:${item.id}`,
      position: [shelfX, 8, shelfZ + itemIndex * 24], geometry: shape('box', [10, 12, 10]),
      descriptionIds: [], source: { file: 'src/game/content.js', authority: 'ITEMS', key: item.id },
      interpretation: 'Unlocated item catalogue symbol. The reference shelf is not a physical place; inventory and story actions determine where this object actually is.',
    })
  }
  for (const [index, dimension] of ENVIRONMENT_DIMENSIONS.entries()) {
    addElement({
      id: `environment-template:${dimension}`, kind: 'catalogue', label: `Generated ${dimension} narration`, catalogue: true,
      placeId: null, regionId: null, dimension,
      position: [shelfX - 45, 8, shelfZ + index * 30], geometry: shape('box', [12, 12, 12]),
      descriptionIds: [], source: { file: 'src/game/storyContext.js', authority: 'environmentStoryLine', key: dimension },
      interpretation: 'Unlocated narration-template symbol, applicable through the shared environment planner and scene setting.',
    })
  }
  for (const description of supplementalDescriptions()) {
    descriptions.push(description)
    descriptionById.set(description.id, description)
    if (description.source.kind === 'item-blurb') {
      bind(description, `item:${description.itemId}`, 'catalogue-item', { itemId: description.itemId })
    } else {
      bind(description, `environment-template:${description.dimension}`, 'generated-environment', { templateId: description.templateId, dimension: description.dimension })
    }
  }
  const inventory = buildWorldScene3dInventory()
  for (const entry of inventory.elements) {
    const element = addElement(entry)
    element.authorityScope = entry.authorityScope
    element.inventoryRecordIds = entry.inventoryRecordIds
  }
  for (const description of inventory.descriptions) {
    descriptions.push(description)
    descriptionById.set(description.id, description)
  }
  for (const binding of inventory.bindings) bind(descriptionById.get(binding.descriptionId), binding.elementId, binding.type, binding.evidence)
  for (const description of inventory.descriptions) {
    for (const condition of [...list(description.conditions?.all), ...list(description.conditions?.none)]) {
      const fixture = parseFixtureCondition(condition)
      if (fixture) bind(description, `fixture:${fixture.fixtureId}`, 'fixture-state', { condition, stateId: fixture.stateId })
    }
  }
  for (const description of descriptions) {
    description.classification = description.bindings.some(({ type }) => ['reviewed-feature', 'reviewed-place-view'].includes(type))
      ? 'reviewed-geometry'
      : description.bindings.some(({ type }) => !isContextBinding(type))
        ? 'canonical-metadata'
        : 'context-only'
  }
  for (const element of elements) {
    element.regionIds = regionMemberships(element)
    element.witnessConditions = element.descriptionIds.map((id) => ({ descriptionId: id, conditions: descriptionById.get(id).conditions }))
    // Never depict mutually exclusive states as simultaneous world facts.
    // Explicit selection may reveal their audit geometry with its predicates.
    element.conditional = conditionalKinds.includes(element.kind) ||
      (element.kind === 'feature' && element.witnessConditions.length > 0 && element.witnessConditions.every(({ conditions }) => hasConditions(conditions)))
  }
  const contextOnlyDescriptionIds = descriptions.filter(({ classification }) => classification === 'context-only').map(({ id }) => id)
  return {
    version: WORLD_SCENE_3D_VERSION,
    coordinateSystem: WORLD_SCENE_3D_COORDINATES,
    elements, descriptions, routes, relations,
    placeProfiles: WORLD_SCENE_3D_PLACE_PROFILES.map((profile) => structuredClone(profile)),
    inventory: { records: inventory.records, coverage: inventory.coverage },
    contextOnlyDescriptionIds,
    limitations: [
      'A scene-context link locates prose but does not validate its physical assertions. Context-only lines remain visible modeling gaps.',
      'Reviewed feature witnesses establish the named feature, not its illustrative size, local offset, material or architectural accuracy.',
      'Conditions, observations and NPC route stops describe alternatives. This atlas is a survey of authored possibilities, not a simultaneous world state.',
      'Actor markers require explicit registry, runtime-route or portrait encounter locations. They are possible encounters, never current-presence claims; planning prose stays unlocated.',
      'Geometry validates canonical place/route continuity, registered crossings, sightlines and exact supported feature witnesses. It cannot prove arbitrary prose or lore true.',
      'Item blurbs link to portable catalogue symbols and exact action locations. Source-tale cast, objects and places preserve their source-era boundary; proposed/offstage locations stay in the reference gallery.',
    ],
    statistics: {
      elements: elements.length, places: Object.keys(PLACE_NODES).length,
      regions: REGIONS.length, descriptions: descriptions.length, routes: routes.length,
      storyDescriptions: descriptions.filter(({ source }) => source.kind === 'story-line').length,
      itemDescriptions: descriptions.filter(({ source }) => source.kind === 'item-blurb').length,
      environmentTemplates: WORLD_SCENE_3D_ENVIRONMENT_CASES.length,
      reviewedFeatures: ALL_FEATURES.length,
      reviewedGeometryDescriptions: descriptions.filter(({ classification }) => classification === 'reviewed-geometry').length,
      metadataDescriptions: descriptions.filter(({ classification }) => classification === 'canonical-metadata').length,
      contextOnlyDescriptions: contextOnlyDescriptionIds.length,
      sightlines: DISTANT_SIGHTLINES.length,
      barrierCrossings: WORLD_BARRIERS.reduce((sum, barrier) => sum + barrier.crossings.length, 0),
    },
  }
}

/**
 * Validate against the independent production authorities, not a regenerated
 * copy of this chart. IDs make every failure point at the precise record.
 */
export function validateWorldScene3d(model) {
  const issues = []
  const problem = (id, message) => issues.push(`${id}: ${message}`)
  if (!model || typeof model !== 'object') return ['world-scene-3d: model is missing']
  if (model.version !== WORLD_SCENE_3D_VERSION) problem('world-scene-3d', 'unsupported version')
  if (!equal(model.coordinateSystem, WORLD_SCENE_3D_COORDINATES)) problem('world-scene-3d', 'canonical/illustrative coordinate contract drifted')
  for (const key of ['elements', 'descriptions', 'routes', 'relations']) {
    if (!Array.isArray(model[key])) return [...issues, `world-scene-3d: ${key} must be an array`]
  }
  const index = (entries, label) => {
    const result = new Map()
    for (const entry of entries) {
      if (!entry?.id) { problem(label, 'record has no stable id'); continue }
      if (result.has(entry.id)) problem(entry.id, `duplicate ${label} id`)
      result.set(entry.id, entry)
    }
    return result
  }
  const elements = index(model.elements, 'element')
  const descriptions = index(model.descriptions, 'description')
  const routes = index(model.routes, 'route')
  const relations = index(model.relations, 'relation')
  const expectedElementIds = new Set()
  const requireElement = (id, expected) => {
    expectedElementIds.add(id)
    const actual = elements.get(id)
    if (!actual) { problem(id, 'canonical element is missing'); return }
    for (const [key, value] of Object.entries(expected)) {
      if (!equal(actual[key], value)) problem(id, `canonical element ${key} differs from its source`)
    }
  }
  const allowedShapes = ['box', 'plane', 'cylinder', 'cone', 'pyramid']

  for (const element of elements.values()) {
    const fail = (message) => problem(element.id, message)
    if (Boolean(element.catalogue) !== (element.kind === 'catalogue')) fail('catalogue visibility must match the canonical element kind')
    if (element.placeIds !== undefined && !(element.kind === 'feature' && ['crossing', 'crossing-center'].includes(element.placement?.kind))) fail('multiple physical places require a reviewed crossing feature')
    if (!finiteVector(element.position)) fail('position must contain three finite coordinates')
    if (!equal(element.regionIds, regionMemberships(element))) fail('region memberships omit or invent canonical scene aliases')
    if (!allowedShapes.includes(element.geometry?.shape)) fail('unsupported or missing geometry shape')
    if (!finiteVector(element.geometry?.size) || element.geometry.size.some((value) => value <= 0)) fail('geometry dimensions must be positive finite values')
    if (element.geometry?.rotationY != null && !Number.isFinite(element.geometry.rotationY)) fail('geometry rotation must be finite radians')
    if (!element.source?.file || !element.source?.authority) fail('geometry has no source authority')
    if (!Array.isArray(element.descriptionIds) || unique(element.descriptionIds).length !== element.descriptionIds.length) fail('reverse description links must be a unique array')
    for (const id of element.descriptionIds || []) {
      if (!descriptions.has(id)) fail(`reverse link names missing description ${id}`)
      else if (!descriptions.get(id).elementIds?.includes(element.id)) fail(`reverse link ${id} is not reciprocal`)
    }
    const witnessConditions = (element.descriptionIds || []).filter((id) => descriptions.has(id)).map((id) => ({ descriptionId: id, conditions: descriptions.get(id).conditions }))
    if (!equal(element.witnessConditions, witnessConditions)) fail('geometry witness conditions are missing or stale')
    const conditional = conditionalKinds.includes(element.kind) ||
      (element.kind === 'feature' && witnessConditions.length > 0 && witnessConditions.every(({ conditions }) => hasConditions(conditions)))
    if (element.conditional !== conditional) fail('conditional geometry visibility does not preserve authored alternatives')
  }
  const inventoryDefinition = buildWorldScene3dInventory()
  for (const element of inventoryDefinition.elements) expectedElementIds.add(element.id)
  issues.push(...validateWorldScene3dInventory(model), ...validateWorldScene3dPlaceProfiles(model))
  const expectedDescriptions = new Set(inventoryDefinition.descriptions.map(({ id }) => id))
  const expectedRoutes = new Set()
  const canonicalDescriptions = []
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [lineIndex, entry] of (node.text || []).entries()) {
      const expected = sourceDescription(nodeId, entry, lineIndex)
      canonicalDescriptions.push(expected)
      expectedDescriptions.add(expected.id)
      const actual = descriptions.get(expected.id)
      if (!actual) { problem(expected.id, 'authored story line is missing'); continue }
      for (const key of ['nodeId', 'lineIndex', 'placeId', 'regionId', 'source', 'text', 'tokenIds', 'conditions', 'role', 'environmentDimensions', 'observationId', 'npcIdentity']) {
        if (!equal(actual[key], expected[key])) problem(expected.id, `stale source ${key}`)
      }
      const contextType = isUnchartedStoryNode(nodeId) ? 'departure-context' : 'scene-context'
      if (!actual.elementIds?.includes(contextElementId(nodeId))) problem(expected.id, 'canonical story context is missing')
      if (!actual.bindings?.some(({ type, elementId }) => type === contextType && elementId === contextElementId(nodeId))) problem(expected.id, 'canonical story-context binding is missing')
      if (!isUnchartedStoryNode(nodeId) && !actual.bindings?.some(({ type, elementId }) => type === 'region-context' && elementId === `region:${NODE_REGION[nodeId]}`)) problem(expected.id, 'canonical region-context binding is missing')
    }
    for (const [optionIndex, option] of (node.options || []).entries()) {
      if (option.confuser) continue
      const id = `route:${nodeId}:${optionIndex}`
      expectedRoutes.add(id)
      const actual = routes.get(id)
      const canonical = routeForChoice(nodeId, option)
      if (!actual) { problem(id, 'playable route is missing'); continue }
      if (!canonical.valid) problem(id, `canonical route is invalid: ${canonical.reason}`)
      for (const [key, value] of Object.entries(canonical)) {
        if (!equal(actual[key], value)) problem(id, `canonical route ${key} differs`)
      }
      if (actual.optionIndex !== optionIndex) problem(id, 'route option index differs from its source')
      if (!equal(actual.source, optionSource(nodeId, optionIndex))) problem(id, 'route source is stale')
      if (actual.text !== albanianTextOf(option.text)) problem(id, 'route choice text is stale')
      if (actual.fromElementId !== placeElementId(nodeId) || actual.toElementId !== placeElementId(option.to)) problem(id, 'route has incorrect physical endpoint IDs')
      const points = canonical.charted === false ? [] : [elements.get(actual.fromElementId)?.position, elements.get(actual.toElementId)?.position]
      if (points.some((point) => !finiteVector(point)) || !equal(actual.points, points)) problem(id, 'route geometry does not join the exact canonical endpoints')
    }
  }
  for (const expected of supplementalDescriptions()) {
    expectedDescriptions.add(expected.id)
    const actual = descriptions.get(expected.id)
    if (!actual) { problem(expected.id, 'canonical description/template source is missing'); continue }
    for (const key of ['nodeId', 'lineIndex', 'placeId', 'regionId', 'source', 'text', 'tokenIds', 'conditions', 'role', 'environmentDimensions', 'observationId', 'npcIdentity', 'itemId', 'templateId', 'dimension', 'applicability']) {
      if (!equal(actual[key], expected[key])) problem(expected.id, `stale source ${key}`)
    }
    const elementId = expected.source.kind === 'item-blurb' ? `item:${expected.itemId}` : `environment-template:${expected.dimension}`
    const type = expected.source.kind === 'item-blurb' ? 'catalogue-item' : 'generated-environment'
    if (!actual.bindings?.some((binding) => binding.elementId === elementId && binding.type === type)) problem(expected.id, 'canonical catalogue/template binding is missing')
  }
  for (const description of descriptions.values()) {
    const fail = (message) => problem(description.id, message)
    if (!expectedDescriptions.has(description.id)) fail('description has no authored source')
    if (!Array.isArray(description.elementIds) || !description.elementIds.length || unique(description.elementIds).length !== description.elementIds.length) fail('element links must be a non-empty unique array')
    if (!Array.isArray(description.bindings)) { fail('typed bindings are missing'); continue }
    if (unique(description.bindings.map(({ elementId, type, evidence }) => `${elementId}:${type}:${bindingRecordId(type, evidence)}`)).length !== description.bindings.length) fail('typed bindings must be unique per element and relationship')
    for (const id of description.elementIds || []) {
      if (!elements.has(id)) fail(`mapping targets missing element ${id}`)
      else if (!elements.get(id).descriptionIds?.includes(description.id)) fail(`element ${id} has no reciprocal description link`)
      if (!description.bindings.some(({ elementId }) => elementId === id)) fail(`element ${id} has no typed binding`)
    }
    for (const binding of description.bindings) {
      if (!description.elementIds?.includes(binding.elementId)) fail(`binding ${binding.elementId} has no forward link`)
      const element = elements.get(binding.elementId)
      if (!element) continue
      if (binding.type === 'departure-context') {
        if (!isUnchartedStoryNode(description.nodeId) || binding.elementId !== departureElementId(description.nodeId) || !element.catalogue || element.placeId !== null || element.regionId !== null) fail('departure context must remain explicitly unlocated')
      } else if (binding.type === 'scene-context') {
        if (binding.elementId !== placeElementId(description.nodeId)) fail('context binding targets another physical place')
      } else if (binding.type === 'region-context') {
        if (binding.elementId !== `region:${NODE_REGION[description.nodeId]}`) fail('region context does not match canonical membership')
      } else if (binding.type === 'reviewed-feature') {
        const feature = ALL_FEATURES.find(({ id }) => id === binding.evidence?.featureId)
        const witness = feature?.witnesses.find(({ nodeId, lineIndex }) => nodeId === description.nodeId && lineIndex === description.lineIndex)
        if (!witness || binding.elementId !== `feature:${feature.id}` || !equal(binding.evidence.requires, witness.requires)
          || !equal(binding.evidence.source, textSource(witness.nodeId, witness.lineIndex))
          || !equal(binding.evidence.location, witness.location)) fail('reviewed feature binding has no exact witness')
        if (binding.evidence?.location?.kind === 'visible-from') {
          const route = binding.evidence.location.route
          const option = STORY[route?.nodeId]?.options?.[route?.optionIndex]
          for (const conflict of worldScene3dApproachConditionConflicts(description.conditions, option)) fail(`visible-from ${conflict}`)
        }
      } else if (binding.type === 'reviewed-place-view') {
        const profile = WORLD_SCENE_3D_PLACE_PROFILES.find(({ placeId }) => placeId === binding.evidence?.placeId)
        const association = profile?.associations?.find(({ featureId, witness }) => featureId === binding.evidence?.featureId && witness.nodeId === description.nodeId && witness.lineIndex === description.lineIndex)
        if (!association || binding.elementId !== `feature:${association.featureId}` || !equal(binding.evidence, {
          placeId: profile.placeId, featureId: association.featureId,
          source: textSource(association.witness.nodeId, association.witness.lineIndex), rationale: association.rationale,
        })) fail('reviewed place view has no exact local source association')
      } else if (binding.type === 'environment-metadata') {
        const dimension = binding.evidence?.dimension
        if (!description.environmentDimensions?.includes(dimension) || binding.elementId !== `environment:${description.placeId}:${dimension}`) fail('environment binding is not backed by exact metadata')
      } else if (binding.type === 'fixture-state') {
        const condition = binding.evidence?.condition
        const parsed = parseFixtureCondition(condition)
        if (!parsed || ![...list(description.conditions?.all), ...list(description.conditions?.none)].includes(condition) || binding.elementId !== `fixture:${parsed.fixtureId}` || binding.evidence?.stateId !== parsed.stateId) fail('fixture binding is not backed by its state condition')
      } else if (binding.type === 'observation-metadata') {
        if (!description.observationId || binding.elementId !== `perception:${description.observationId}` || binding.evidence?.observationId !== description.observationId) fail('observation binding has no matching reveal metadata')
      } else if (binding.type === 'actor-metadata') {
        if (!actorReferences(description).some((reference) => equal(reference, binding.evidence) && binding.elementId === `actor:${reference.npcId}:${PLACE_OF[reference.nodeId]}`)) fail('actor binding has no canonical identity/location evidence')
      } else if (binding.type === 'distant-sightline') {
        const relation = relations.get(binding.evidence?.relationId)
        if (relation?.kind !== 'sightline' || relation.toElementId !== binding.elementId || !relation.descriptionIds?.includes(description.id)
          || !equal(binding.evidence?.requires, relation.requires)) fail('sightline binding lacks its exact relation')
      } else if (binding.type === 'catalogue-item') {
        if (description.source?.kind !== 'item-blurb' || binding.elementId !== `item:${description.itemId}` || binding.evidence?.itemId !== description.itemId || !ITEMS[description.itemId]) fail('item catalogue binding has no canonical item')
      } else if (binding.type === 'generated-environment') {
        if (description.source?.kind !== 'generated-environment' || binding.elementId !== `environment-template:${description.dimension}` || binding.evidence?.templateId !== description.templateId || binding.evidence?.dimension !== description.dimension) fail('environment template binding has no canonical dimension/template')
      } else if (inventoryBindingTypes.includes(binding.type)) {
        // Independently enumerated and checked, including exact evidence and
        // duplicate action records, by validateWorldScene3dInventory above.
      } else fail(`unsupported binding type ${binding.type}`)
    }
    const classification = description.bindings.some(({ type }) => ['reviewed-feature', 'reviewed-place-view'].includes(type)) ? 'reviewed-geometry'
      : description.bindings.some(({ type }) => !isContextBinding(type)) ? 'canonical-metadata' : 'context-only'
    if (description.classification !== classification) fail('mapping coverage classification is misleading')
    for (const dimension of description.environmentDimensions || []) {
      if (!description.bindings.some(({ type, elementId }) => type === 'environment-metadata' && elementId === `environment:${description.placeId}:${dimension}`)) fail(`missing ${dimension} environment mapping`)
    }
    if (description.observationId && !description.bindings.some(({ type }) => type === 'observation-metadata')) fail('missing observation mapping')
    for (const condition of [...list(description.conditions?.all), ...list(description.conditions?.none)]) {
      if (parseFixtureCondition(condition) && !description.bindings.some(({ type, evidence }) => type === 'fixture-state' && evidence.condition === condition)) fail(`missing fixture mapping for ${condition}`)
    }
    for (const reference of description.source?.kind === 'story-line' ? actorReferences(description) : []) {
      if (!description.bindings.some(({ type, evidence }) => type === 'actor-metadata' && equal(evidence, reference))) fail(`missing actor mapping for ${reference.npcId}`)
    }
  }
  for (const id of routes.keys()) if (!expectedRoutes.has(id)) problem(id, 'route has no playable source option')
  for (const [index, nodeId] of UNCHARTED_STORY_NODES.entries()) requireElement(departureElementId(nodeId), departureElement(nodeId, index))
  for (const [anchor, nodes] of Object.entries(PLACE_NODES)) {
    requireElement(`place:${anchor}`, {
      kind: 'place', placeId: anchor, regionId: NODE_REGION[anchor],
      label: PLACE_META[anchor]?.name || anchor, geometry: shape('cylinder', [12, 4, 12]),
      source: { file: 'src/components/nodePositions.js', authority: 'NODE_POS/PLACE_OF', key: anchor },
    })
    const element = elements.get(`place:${anchor}`)
    if (!element) { problem(`place:${anchor}`, 'canonical physical place is missing'); continue }
    if (element.kind !== 'place' || element.placeId !== anchor || !equal(element.nodeIds, nodes)) problem(element.id, 'physical-place membership differs')
    if (!equal(element.position, positionAt(anchor, 2))) problem(element.id, 'X/Z must preserve exact canonical chart coordinates and marker height')
  }
  for (const region of REGIONS) {
    requireElement(`region:${region.key}`, {
      kind: 'region', placeId: null, regionId: region.key, label: region.label || 'the village',
      source: { file: 'src/game/regions.js', authority: 'REGIONS', key: region.key },
    })
    const element = elements.get(`region:${region.key}`)
    if (!element || element.kind !== 'region' || !equal(element.position, [region.cx, -23, region.cy]) || !equal(element.geometry, shape('plane', [region.rx * 2, 40, region.ry * 2]))) problem(`region:${region.key}`, 'region footprint or illustrative slab thickness differs from chart authority')
  }
  for (const feature of ALL_FEATURES) {
    requireElement(`feature:${feature.id}`, {
      kind: 'feature', label: feature.label, featureId: feature.id,
      ...featureSpatialProperties(feature),
      placement: feature.placement || { kind: 'at-place', nodeId: feature.nodeId },
      relations: feature.relations || [],
      source: featureSource(feature), interpretation: feature.interpretation, color: feature.color, depiction: feature.depiction,
    })
    const element = elements.get(`feature:${feature.id}`)
    if (!element) { problem(`feature:${feature.id}`, 'reviewed feature geometry is missing'); continue }
    const crossing = crossingForFeature(feature)
    if (feature.placement && (!['crossing', 'crossing-center'].includes(feature.placement.kind) || !crossing
      || !Number.isInteger(feature.placement.crossingIndex) || feature.offset[0] !== 0 || feature.offset[2] !== 0)) problem(element.id, 'crossing placement must use a registered crossing with no horizontal displacement')
    if (!crossing && element.placeIds !== undefined) problem(element.id, 'a local feature may not invent extra physical places')
    if (crossing && !crossing.edge.some((nodeId) => PLACE_OF[nodeId] === PLACE_OF[feature.nodeId])) problem(element.id, 'crossing feature source anchor must be one of its physical shores')
    if (feature.placement?.kind === 'crossing' && finiteVector(element.position) && finiteVector(element.geometry?.size)) {
      const endpoints = crossing?.edge.map((nodeId) => NODE_POS[nodeId]) || []
      const local = endpoints.map(([x, z]) => featureLocalPoint(element, [x, element.position[1], z]))
      if (local.length !== 2 || !local.every(([x, , z]) => Math.abs(Math.abs(x) - element.geometry.size[0] / 2) < 1e-6 && Math.abs(z) < 1e-6)
        || local[0][0] * local[1][0] >= 0) problem(element.id, 'bridge deck must span both exact crossing endpoints')
    }
    const expectedWitnesses = feature.witnesses.map((witness) => ({ ...witness, requires: [...witness.requires], descriptionId: descriptionId(witness.nodeId, witness.lineIndex) }))
    if (!equal(element.witnesses, expectedWitnesses)) problem(element.id, 'reviewed witnesses are missing or stale')
    for (const witness of expectedWitnesses) {
      const description = descriptions.get(witness.descriptionId)
      if (!description || !witness.requires.every((id) => description.tokenIds.includes(id))) problem(element.id, `${witness.descriptionId} no longer establishes ${witness.requires.join(', ')}`)
      if (!description || description.text !== witness.text || !equal(description.conditions, witness.conditions)) problem(element.id, `${witness.descriptionId} differs from its reviewed physical witness; review this exact feature's text and conditions`)
      if (!witness.location) {
        if (PLACE_OF[witness.nodeId] !== element.placeId) problem(element.id, 'feature witness belongs to another physical place without reviewed visibility evidence')
      } else if (witness.location.kind === 'visible-from') {
        const route = witness.location.route
        const option = STORY[route?.nodeId]?.options?.[route?.optionIndex]
        const canonical = option && routeForChoice(route.nodeId, option)
        if (!route || route.nodeId !== witness.nodeId || !Number.isInteger(route.optionIndex) || option?.confuser || option?.to !== route.to
          || !canonical?.valid || !canonical.spatial || canonical.samePlace || canonical.fromPlace !== PLACE_OF[witness.nodeId]
          || canonical.toPlace !== element.placeId) problem(element.id, `${witness.descriptionId} visible-from witness has no exact ordinary approach to this feature's place`)
        for (const conflict of worldScene3dApproachConditionConflicts(witness.conditions, option)) problem(element.id, `${witness.descriptionId} visible-from ${conflict}`)
      } else if (witness.location.kind === 'crossing-endpoint') {
        if (!crossing || !crossing.edge.some((nodeId) => PLACE_OF[nodeId] === PLACE_OF[witness.nodeId])) problem(element.id, `${witness.descriptionId} is not an endpoint witness of this registered crossing`)
      } else problem(element.id, `${witness.descriptionId} has an unsupported feature-location relationship`)
      if (!description?.bindings?.some(({ type, elementId }) => type === 'reviewed-feature' && elementId === element.id)) problem(element.id, `missing exact source binding ${witness.descriptionId}`)
    }
    for (const relation of feature.relations || []) {
      if (!finiteVector(element.position) || !finiteVector(element.geometry?.size)) continue
      if (relation.kind === 'below-ground') {
        if (element.position[1] + element.geometry.size[1] / 2 > 0) problem(element.id, 'reviewed shaft must extend below ground with its top at or below the local datum')
        continue
      }
      const target = elements.get(`feature:${relation.targetId}`)
      if (!target || target.id === element.id || !finiteVector(target.position) || !finiteVector(target.geometry?.size)) {
        problem(element.id, `physical ${relation.kind} relation has no valid distinct feature target ${relation.targetId}`)
        continue
      }
      if (relation.kind === 'inside') {
        if (element.placeId !== target.placeId || !featureCorners(element).every((point) => featureLocalPoint(target, point).every((value, axis) => Math.abs(value) <= target.geometry.size[axis] / 2 + 1e-6))) problem(element.id, `contained feature must fit inside ${target.id} at the same physical place`)
      } else if (relation.kind === 'below') {
        if (element.position[1] + element.geometry.size[1] / 2 > target.position[1] - target.geometry.size[1] / 2) problem(element.id, `feature must lie below ${target.id}`)
        if (relation.overlap && !overlappingFootprints(element, target)) problem(element.id, `feature must overlap the ground footprint of ${target.id}`)
        if (relation.alignedCenter && (element.position[0] !== target.position[0] || element.position[2] !== target.position[2])) problem(element.id, `feature must share the crossing center of ${target.id}`)
      } else problem(element.id, `unsupported physical feature relation ${relation.kind}`)
    }
  }
  for (const [fixtureId, fixture] of Object.entries(TIMED_WORLD_FIXTURES)) {
    requireElement(`fixture:${fixtureId}`, {
      kind: 'fixture', label: fixtureId === 'campfire' ? 'Campfire' : 'Mill lamp', entityId: `fixture:${fixtureId}`,
      regionId: NODE_REGION[fixture.nodeId], position: positionAt(fixture.nodeId, 0, [9, 6.5, 7]),
      geometry: shape(fixtureId === 'campfire' ? 'cone' : 'box', fixtureId === 'campfire' ? [10, 13, 10] : [5, 8, 5]),
      source: { file: 'src/game/worldFixtures.js', authority: 'TIMED_WORLD_FIXTURES', key: fixtureId },
    })
    const element = elements.get(`fixture:${fixtureId}`)
    if (!element || element.kind !== 'fixture' || element.placeId !== PLACE_OF[fixture.nodeId] || !equal(element.states, fixture.stages.map(({ id }) => id))) problem(`fixture:${fixtureId}`, 'fixture identity, place or lifecycle differs')
  }
  for (const entity of Object.values(WORLD_ENTITIES).filter((entry) => entry.kind === 'perception')) {
    const anchor = entity.relations?.find(({ type }) => type === 'at')?.target?.slice('place:'.length)
    if (!anchor) continue
    requireElement(entity.id, {
      kind: 'perception', label: entity.name, entityId: entity.id,
      placeId: PLACE_OF[anchor], regionId: NODE_REGION[anchor], position: positionAt(anchor, 0, [-9, 4, 8]),
      geometry: shape('pyramid', [5, 7, 5]),
      source: { file: 'src/game/worldEntities.js', authority: 'WORLD_ENTITIES', key: entity.id },
    })
  }
  for (const description of canonicalDescriptions) {
    for (const dimension of description.environmentDimensions) {
      const index = ['time', 'season', 'weather'].indexOf(dimension)
      requireElement(`environment:${description.placeId}:${dimension}`, {
        kind: 'environment', label: `${dimension} at ${description.placeId}`, dimension,
        placeId: description.placeId, regionId: NODE_REGION[PLACE_OF[description.nodeId]],
        position: positionAt(description.nodeId, 0, [-10 + index * 5, 16, -6]),
        geometry: shape('box', [4, 4, 4]),
        source: { file: 'src/game/environmentNarration.js', authority: 'describesEnvironment', key: dimension },
      })
    }
    for (const reference of actorReferences(description)) {
      const entity = WORLD_ENTITIES[`npc:${reference.npcId}`]
      requireElement(`actor:${reference.npcId}:${PLACE_OF[reference.nodeId]}`, {
        kind: 'actor', label: entity.name, entityId: entity.id,
        placeId: PLACE_OF[reference.nodeId], regionId: NODE_REGION[PLACE_OF[reference.nodeId]],
        position: positionAt(reference.nodeId, 0, [8, 6, -9]), geometry: shape('cylinder', [4, 12, 4]),
        source: { file: 'src/game/worldEntities.js', authority: 'WORLD_ENTITIES', key: entity.id },
      })
    }
  }
  const shelfX = Math.min(...Object.values(NODE_POS).map(([x]) => x)) - 90
  const shelfZ = Math.min(...Object.values(NODE_POS).map(([, z]) => z))
  for (const [itemIndex, item] of Object.values(ITEMS).entries()) {
    requireElement(`item:${item.id}`, {
      kind: 'catalogue', label: item.name, catalogue: true, placeId: null, regionId: null, entityId: `item:${item.id}`,
      position: [shelfX, 8, shelfZ + itemIndex * 24], geometry: shape('box', [10, 12, 10]),
      source: { file: 'src/game/content.js', authority: 'ITEMS', key: item.id },
    })
  }
  for (const [index, dimension] of ENVIRONMENT_DIMENSIONS.entries()) {
    requireElement(`environment-template:${dimension}`, {
      kind: 'catalogue', label: `Generated ${dimension} narration`, catalogue: true, placeId: null, regionId: null, dimension,
      position: [shelfX - 45, 8, shelfZ + index * 30], geometry: shape('box', [12, 12, 12]),
      source: { file: 'src/game/storyContext.js', authority: 'environmentStoryLine', key: dimension },
    })
  }
  const expectedRelations = new Set()
  for (const sightline of DISTANT_SIGHTLINES) {
    const id = `sightline:${sightline.id}`
    expectedRelations.add(id)
    const relation = relations.get(id)
    if (!relation) { problem(id, 'registered sightline is missing'); continue }
    if (!equal(relation.source, { file: 'src/game/worldModel.js', authority: 'DISTANT_SIGHTLINES', key: sightline.id })) problem(id, 'sightline source authority differs')
    const ids = [...descriptions.values()].filter((description) => description.nodeId === sightline.node && sightline.requires.every((tokenId) => description.tokenIds?.includes(tokenId))).map(({ id: sourceId }) => sourceId)
    if (!ids.length || !equal(relation.descriptionIds, ids) || !equal(relation.requires, sightline.requires)) problem(id, 'registered sightline source witnesses differ')
    if (relation.kind !== 'sightline' || relation.nodeId !== sightline.node || relation.targetNodeId !== sightline.target || relation.fromElementId !== placeElementId(sightline.node) || relation.toElementId !== placeElementId(sightline.target)) problem(id, 'registered sightline endpoints differ')
    if (!equal(relation.points, [elements.get(relation.fromElementId)?.position, elements.get(relation.toElementId)?.position])) problem(id, 'sightline geometry does not join its exact endpoints')
    for (const sourceId of ids) if (!descriptions.get(sourceId).bindings?.some(({ type, evidence }) => type === 'distant-sightline' && evidence.relationId === id)) problem(id, `missing source-to-target mapping ${sourceId}`)
  }
  for (const barrier of WORLD_BARRIERS) {
    for (const [crossingIndex, crossing] of barrier.crossings.entries()) {
      const id = `barrier-crossing:${barrier.id}:${crossingIndex}`
      const [from, to] = crossing.edge
      const a = NODE_POS[from]
      const b = NODE_POS[to]
      requireElement(`crossing:${barrier.id}:${crossingIndex}`, {
        kind: 'barrier', label: crossing.structure, placeId: PLACE_OF[from], regionId: NODE_REGION[PLACE_OF[from]],
        position: [(a[0] + b[0]) / 2, 5, (a[1] + b[1]) / 2], geometry: shape('box', [14, 5, 12]),
        source: { file: 'src/game/worldBarriers.js', authority: 'WORLD_BARRIERS', key: barrier.id, crossingIndex },
      })
      expectedRelations.add(id)
      const relation = relations.get(id)
      if (!relation) { problem(id, 'registered barrier crossing is missing'); continue }
      if (!equal(relation.source, { file: 'src/game/worldBarriers.js', authority: 'WORLD_BARRIERS', key: barrier.id, crossingIndex })) problem(id, 'crossing source authority differs')
      const ids = [...routes.values()].filter((route) => (route.from === from && route.to === to) || (route.from === to && route.to === from)).map(({ id: routeId }) => routeId)
      if (relation.kind !== 'barrier-crossing' || relation.from !== from || relation.to !== to || !equal(relation.sides, barrier.sides) || !equal(relation.routeIds, ids) || !ids.length) problem(id, 'barrier crossing does not cover the canonical playable edge')
      if (relation.fromElementId !== placeElementId(from) || relation.toElementId !== placeElementId(to) || !equal(relation.points, [elements.get(placeElementId(from))?.position, elements.get(placeElementId(to))?.position])) problem(id, 'barrier crossing geometry has incorrect endpoints')
      const marker = elements.get(relation.elementId)
      if (!marker || marker.id !== `crossing:${barrier.id}:${crossingIndex}` || !equal(marker.position, [(a[0] + b[0]) / 2, 5, (a[1] + b[1]) / 2])) problem(id, 'crossing marker is missing or misplaced')
    }
  }
  for (const id of relations.keys()) if (!expectedRelations.has(id)) problem(id, 'relation has no canonical authority')
  for (const id of elements.keys()) if (!expectedElementIds.has(id)) problem(id, 'element has no canonical source authority or reviewed physical witness')
  const contextOnly = [...descriptions.values()].filter(({ classification }) => classification === 'context-only').map(({ id }) => id)
  if (!equal(model.contextOnlyDescriptionIds, contextOnly)) problem('world-scene-3d', 'context-only modeling gaps are hidden or stale')
  const expectedStatistics = {
    elements: model.elements.length, places: Object.keys(PLACE_NODES).length, regions: REGIONS.length,
    descriptions: model.descriptions.length, routes: model.routes.length, reviewedFeatures: ALL_FEATURES.length,
    storyDescriptions: model.descriptions.filter(({ source }) => source?.kind === 'story-line').length,
    itemDescriptions: model.descriptions.filter(({ source }) => source?.kind === 'item-blurb').length,
    environmentTemplates: WORLD_SCENE_3D_ENVIRONMENT_CASES.length,
    reviewedGeometryDescriptions: model.descriptions.filter(({ classification }) => classification === 'reviewed-geometry').length,
    metadataDescriptions: model.descriptions.filter(({ classification }) => classification === 'canonical-metadata').length,
    contextOnlyDescriptions: contextOnly.length, sightlines: DISTANT_SIGHTLINES.length,
    barrierCrossings: WORLD_BARRIERS.reduce((sum, barrier) => sum + barrier.crossings.length, 0),
  }
  if (!model.statistics || !equal(Object.keys(model.statistics).sort(), Object.keys(expectedStatistics).sort()) ||
      Object.entries(expectedStatistics).some(([key, value]) => model.statistics[key] !== value)) problem('world-scene-3d', 'coverage statistics are stale')
  return issues
}
