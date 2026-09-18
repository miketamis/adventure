// Per-node physical comparison consumes the same places and exact source lines
// as the atlas. Authored branch previews never manufacture a gameplay state.
import { STORY, ITEMS, lineOf } from './content.js'
import { NODE_POS, PLACE_OF } from '../components/nodePositions.js'
import { PLACE_META } from '../components/placeMeta.js'
import { NODE_REGION } from './regions.js'
import { currentStoryState, environmentSnapshot, storyScenePresentationForState } from './gameState.js'
import { worldLocationForState } from './worldLocation.js'
import { isUnchartedStoryNode } from './departureContexts.js'
import { buildWorldScene3d, worldScene3dLineConditions } from './worldScene3d.js'
import { WORLD_NODE_VIEWPOINTS } from './data/worldScene3dViewpoints.js'
import { WORLD_SCENE_3D_NODE_CLAIMS } from './data/worldScene3dNodeClaims.js'
import { WORLD_SCENE_3D_ASSETS, buildAssetParts } from './worldScene3dAssets.js'
import { albanianTextOf } from './language.js'

export const WORLD_NODE_RENDER_VERSION = 1
export const WORLD_NODE_EYE_HEIGHT = 1.7
export const WORLD_NODE_DISPOSITIONS = Object.freeze(['physical', 'mixed', 'environment', 'nonvisual', 'reported', 'historical', 'offstage', 'abstract', 'absence'])
export const WORLD_NODE_ZONES = Object.freeze(['front', 'back', 'left', 'right', 'near', 'far', 'above', 'below', 'inside', 'around', 'center'])
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const finite3 = (v) => Array.isArray(v) && v.length === 3 && v.every(Number.isFinite)
const unconditioned = (c) => !(c.all?.length || c.none?.length || c.observationId)
// A source preview uses an explicit minimal truth assignment. Negative guards
// are satisfied by default; a selected witness supplies its own positive facts.
// This evaluates authored wrappers only and is never a fabricated saved run.
function previewVisible(conditions, witness = null) {
  const yes = new Set(witness && !witness.negate ? witness.all || [] : [])
  const required = conditions.all || []
  const truth = required.every((key) => yes.has(key))
  return (conditions.negate ? !truth : truth) && !(conditions.none || []).some((key) => yes.has(key)) &&
    (!conditions.observationId || conditions.observationId === witness?.observationId)
}
const unique = (xs) => [...new Set(xs)]
const hash = (key) => [...key].reduce((n, c) => (n * 31 + c.charCodeAt(0)) >>> 0, 0)
const clone = (value) => structuredClone(value)
const scalar = (value) => typeof value === 'number' ? [value, value, value] : value || [1, 1, 1]
let cache
function sourceIndex() {
  if (cache) return cache
  const world = buildWorldScene3d()
  const sources = world.descriptions.filter(({ source }) => source.kind === 'story-line')
  const byNode = new Map(Object.keys(STORY).map((id) => [id, sources.filter((entry) => entry.nodeId === id)]))
  const claims = new Map(WORLD_SCENE_3D_NODE_CLAIMS.map((entry) => [entry.id, entry]))
  const persistent = new Map()
  for (const row of WORLD_SCENE_3D_NODE_CLAIMS) {
    if (!row.placeId) continue
    for (const object of row.objects || []) {
      if (object.persistence !== 'place') continue
      const id = `${row.placeId}\0${object.key}`
      const current = persistent.get(id)
      if (current) current.claimIds.push(row.id)
      else persistent.set(id, { ...clone(object), placeId: row.placeId, claimIds: [row.id] })
    }
  }
  cache = { world, sources, byNode, claims, persistent, sourcesById: new Map(sources.map((entry) => [entry.id, entry])),
    elements: new Map(world.elements.map((entry) => [entry.id, entry])) }
  return cache
}

export function buildWorldNodeSceneIndex() {
  const { byNode } = sourceIndex()
  return Object.keys(STORY).map((nodeId) => ({
    nodeId, label: `${nodeId} · ${PLACE_META[PLACE_OF[nodeId]]?.name || PLACE_OF[nodeId] || 'Uncharted departure'}`,
    placeId: PLACE_OF[nodeId] || null, charted: Boolean(NODE_POS[nodeId]) && !isUnchartedStoryNode(nodeId),
    regionId: NODE_REGION[nodeId] || null, descriptionCount: byNode.get(nodeId)?.length || 0,
  }))
}

// The view faces the registered physical landmark ahead when one exists.
// Other local offsets use this same basis; turning the camera never moves them.
function placeFacing(placeId, index) {
  const origin = NODE_POS[placeId]
  if (!origin) return [0, -1]
  const row = WORLD_SCENE_3D_NODE_CLAIMS.find((claim) => claim.placeId === placeId &&
    claim.objects?.some((object) => object.zone === 'front' && index.elements.get(object.key)?.position &&
      Math.hypot(index.elements.get(object.key).position[0] - origin[0], index.elements.get(object.key).position[2] - origin[1]) > 1))
  const object = row?.objects.find((entry) => entry.zone === 'front' && index.elements.get(entry.key)?.position &&
    Math.hypot(index.elements.get(entry.key).position[0] - origin[0], index.elements.get(entry.key).position[2] - origin[1]) > 1)
  const point = object && index.elements.get(object.key).position
  if (!point) return [0, -1]
  const dx = point[0] - origin[0], dz = point[2] - origin[1]
  const length = Math.hypot(dx, dz)
  return [dx / length, dz / length]
}

function localPosition(object, placeId, forward, index) {
  const origin = NODE_POS[placeId] || [0, 0]
  const landmark = index.elements.get(object.key)
  if (landmark?.kind === 'feature' && landmark.position) {
    return [landmark.position[0], 0, landmark.position[2]]
  }
  // A distant named place remains at that place; its mention cannot relocate it.
  const targetPlace = object.key.startsWith('place:') ? object.key.split(':')[1] : null
  const base = targetPlace && NODE_POS[targetPlace] ? NODE_POS[targetPlace] : origin
  const slot = (hash(object.key) % 7 - 3) * 1.65
  const zones = {
    front: [slot, 0, -9], back: [slot, 0, 12], left: [-9, 0, slot], right: [9, 0, slot],
    near: [slot * 0.45, 0, -3.8], far: [slot * 2, 0, -32], above: [slot, 10, -12],
    below: [slot, -3, -6], inside: [slot, 0, -5], around: [slot * 2, 0, hash(object.key) % 2 ? -10 : 10], center: [0, 0, 0],
  }
  const offset = object.offset || zones[object.zone || 'front']
  const right = [-forward[1], forward[0]]
  return [base[0] + right[0] * offset[0] - forward[0] * offset[2], offset[1],
    base[1] + right[1] * offset[0] - forward[1] * offset[2]]
}

function rotate(point, rotation) {
  let [x,y,z] = point
  const [rx,ry,rz] = rotation
  ;[y,z] = [y*Math.cos(rx)-z*Math.sin(rx), y*Math.sin(rx)+z*Math.cos(rx)]
  ;[x,z] = [x*Math.cos(ry)+z*Math.sin(ry), -x*Math.sin(ry)+z*Math.cos(ry)]
  return [x*Math.cos(rz)-y*Math.sin(rz), x*Math.sin(rz)+y*Math.cos(rz),z]
}
function boundsOf(object) {
  const bounds = [[Infinity, -Infinity], [Infinity, -Infinity], [Infinity, -Infinity]]
  for (const part of buildAssetParts(object.asset, object.attributes)) {
    for (const x of [-.5,.5]) for (const y of [-.5,.5]) for (const z of [-.5,.5]) {
      const corner = rotate([x*part.size[0],y*part.size[1],z*part.size[2]],part.rotation || [0,0,0])
      const local = corner.map((value,axis)=>(value+part.position[axis])*object.scale[axis])
      const world = rotate(local,[0,object.rotationY,0]).map((value,axis)=>value+object.position[axis])
      for (let axis=0;axis<3;axis++) { bounds[axis][0]=Math.min(bounds[axis][0],world[axis]); bounds[axis][1]=Math.max(bounds[axis][1],world[axis]) }
    }
  }
  return bounds
}

function applyRelations(objects, relations, forward, eye) {
  const byKey = new Map()
  for (const object of objects) byKey.set(object.key, [...(byKey.get(object.key) || []), object])
  const right = [-forward[1], forward[0]]
  const notices = []
  const positioned = new Set(['inside', 'on', 'above', 'over', 'under', 'below', 'beside', 'near', 'left', 'right', 'left-of', 'right-of', 'behind', 'in-front-of'])
  for (const relation of relations) {
    const subjects = byKey.get(relation.subject) || [null]
    const target = byKey.get(relation.target)?.[0]
    if (relation.subject === 'viewer' && target && relation.kind === 'inside' && !['well','pit'].includes(target.asset)) {
      target.position = [eye[0], eye[1]-WORLD_NODE_EYE_HEIGHT, eye[2]]
      if (['house','hut','palace','interior','room'].includes(target.asset)) target.attributes = {...target.attributes, cutaway:true}
      notices.push({...relation,geometryStatus:'modeled',subjectId:'viewer',targetId:target.id})
      continue
    }
    for (let instance=0;instance<subjects.length;instance++) {
    const subject = subjects[instance]
    if (relation.kind === 'holds' && target && (subject || relation.subject === 'viewer')) {
      const holder = subject?.position || eye
      const held = unique(relations.filter((entry) => entry.subject === relation.subject && entry.kind === 'holds').map((entry) => entry.target))
      const hand = held.indexOf(relation.target) % 2 ? -1 : 1
      const attachment = subject ? rotate([hand*.36,1.04,-.18],[0,subject.rotationY,0])
        : [right[0]*.45*hand+forward[0]*.7,-.55,right[1]*.45*hand+forward[1]*.7]
      target.position = holder.map((value,axis)=>value+attachment[axis])
      notices.push({...relation, geometryStatus: 'modeled', subjectId: subject?.id || 'viewer', targetId: target.id})
      continue
    }
    if (subject?.placement.authority === 'registered-landmark' && target && ['above','over'].includes(relation.kind) && subject.asset === 'bridge') {
      notices.push({...relation, geometryStatus:'modeled', subjectId:subject.id,targetId:target.id, detail:'Deck is above water; supports extend below the deck.'})
      continue
    }
    if (subject && relation.target === 'viewer' && ['below','above','behind','near'].includes(relation.kind)) {
      if (relation.kind === 'below') subject.position[1] = Math.min(subject.position[1], eye[1]-1.5)
      if (relation.kind === 'above') subject.position[1] = Math.max(subject.position[1], eye[1]+3)
      notices.push({...relation, geometryStatus:'modeled',subjectId:subject.id,targetId:'viewer'})
      continue
    }
    if (!subject || !target) {
      notices.push({ ...relation, geometryStatus: relation.subject === 'viewer' ? 'viewer-action' : 'reference-only' })
      continue
    }
    if (target.asset === 'cave' && target.attributes.interior && relation.kind === 'at-entrance') {
      const entry=rotate([0,0,7.5],[0,target.rotationY,0])
      subject.position=target.position.map((value,axis)=>value+entry[axis])
      if (subject.attributes.blocksEntrance) subject.scale=[20,12,3]
      notices.push({...relation,geometryStatus:'modeled',subjectId:subject.id,targetId:target.id,detail:'At the cavern entrance behind the observer; blocking stone spans the opening.'})
      continue
    }
    if (target.asset === 'wall' && (subject.attributes.pose === 'embedded' || relation.kind === 'emitted-by')) {
      const normal = [Math.sin(target.rotationY),Math.cos(target.rotationY)]
      const side=(eye[0]-target.position[0])*normal[0]+(eye[2]-target.position[2])*normal[1] >= 0 ? 1 : -1
      const nx=normal[0]*side,nz=normal[1]*side
      subject.position=[target.position[0]+nx*.38,target.position[1],target.position[2]+nz*.38]
      subject.rotationY=Math.atan2(-nx,-nz)
      notices.push({...relation,geometryStatus:'modeled',subjectId:subject.id,targetId:target.id,detail:'Exposed surfaces sit flush with the viewer-facing masonry plane.'})
      continue
    }
    if (subject.placement.authority === 'registered-landmark') {
      notices.push({...relation,geometryStatus:'registered-topology',subjectId:subject.id,targetId:target.id,detail:'Atlas landmark coordinates take precedence over illustrative local layout.'})
      continue
    }
    const sb = boundsOf(subject), tb = boundsOf(target)
    const center = tb.map(([a, b]) => (a + b) / 2)
    // A person beside a long bridge meets the near end, not the river center.
    if (target.asset === 'bridge' && ['beside','near','left','right','left-of','right-of'].includes(relation.kind)) {
      const length = target.attributes.length || 12
      const axis = [Math.sin(target.rotationY),Math.cos(target.rotationY)]
      const side = (eye[0]-center[0])*axis[0]+(eye[2]-center[2])*axis[1] < 0 ? -1 : 1
      center[0] += axis[0]*side*(length/2 + 1)
      center[2] += axis[1]*side*(length/2 + 1)
    }
    const gap = 0.35
    if (subject.key === 'eagle-road') { subject.position[1] = 0; notices.push({...relation,geometryStatus:'modeled',subjectId:subject.id,targetId:target.id}); continue }
    if (subject.key === 'eagle-nest' && target.key === 'eagle-tree') {
      notices.push({...relation,geometryStatus:'modeled',subjectId:subject.id,targetId:target.id}); continue
    } else if (relation.kind === 'inside') {
      for (const axis of [0,2]) {
        const half=(sb[axis][1]-sb[axis][0])/2, margin=.5
        const low=tb[axis][0]+half+margin, high=tb[axis][1]-half-margin
        subject.position[axis]=low<=high ? Math.max(low,Math.min(high,subject.position[axis])) : center[axis]
      }
      subject.position[1] = Math.max(target.position[1], subject.position[1])
    } else if (['on', 'above', 'over'].includes(relation.kind)) {
      subject.position[0] = center[0]
      subject.position[2] = center[2]
      subject.position[1] += tb[1][1] - sb[1][0] + (relation.kind === 'on' ? 0 : gap)
    } else if (['under', 'below'].includes(relation.kind)) {
      subject.position[0] = center[0]
      subject.position[2] = center[2]
      subject.position[1] += tb[1][0] - sb[1][1] - gap
    } else if (['beside', 'near', 'left', 'right', 'left-of', 'right-of'].includes(relation.kind)) {
      const targetWidth = target.asset === 'bridge' ? target.attributes.width || 3 : Math.min(tb[0][1]-tb[0][0],tb[2][1]-tb[2][0])
      const distance = (targetWidth + Math.min(sb[0][1]-sb[0][0],sb[2][1]-sb[2][0])) / 2 + 0.6
      const sign = ['left', 'left-of'].includes(relation.kind) ? -1 : 1
      subject.position[0] = center[0] + right[0] * distance * sign
      subject.position[2] = center[2] + right[1] * distance * sign
    } else if (['behind', 'in-front-of'].includes(relation.kind)) {
      const distance = (tb[2][1] - tb[2][0] + sb[2][1] - sb[2][0]) / 2 + 1
      // Viewer-relative depth: behind the target is farther along the view ray.
      const sign = relation.kind === 'behind' ? 1 : -1
      subject.position[0] = center[0] + forward[0] * distance * sign
      subject.position[2] = center[2] + forward[1] * distance * sign
    }
    if (subjects.length > 1 && positioned.has(relation.kind)) {
      const spread=(instance-(subjects.length-1)/2)*.65
      subject.position[0]+=right[0]*spread; subject.position[2]+=right[1]*spread
    }
    notices.push({ ...relation, geometryStatus: positioned.has(relation.kind) ? 'modeled' : 'action-or-topology', subjectId: subject.id, targetId: target.id })
    }
  }
  return notices
}

export function buildWorldNodeScene(nodeId, { state = null, selectedDescriptionId = null } = {}) {
  if (!STORY[nodeId]) throw new Error(`Unknown story node: ${nodeId}`)
  const index = sourceIndex()
  const sources = index.byNode.get(nodeId) || []
  const witness = selectedDescriptionId ? sources.find(({ id }) => id === selectedDescriptionId) : null
  if (selectedDescriptionId && !witness) throw new Error(`${nodeId}: description ${selectedDescriptionId} does not belong to this node`)
  const live = state?.nodeId === nodeId && !witness
  const location = live ? worldLocationForState(state) : worldLocationForState({ nodeId })
  const activeLines = live ? new Set(storyScenePresentationForState({ ...state, debug: false }).normalEntries.map(({ line }) => line)) : null
  const representative = !live && !witness && !sources.some((source) => previewVisible(source.conditions) && index.claims.get(source.id)?.objects.length)
    ? sources.find((source) => index.claims.get(source.id)?.objects.length) : null
  const branch = witness || representative
  const active = sources.filter((source) => live ? activeLines.has(lineOf(STORY[nodeId].text[source.lineIndex]))
    : previewVisible(source.conditions, branch?.conditions))
  const activeIds = new Set(active.map(({ id }) => id))
  const activeClaims = active.map(({ id }) => index.claims.get(id)).filter(Boolean)
  const mode = live ? 'live' : witness ? 'witness' : 'authored'
  const placeId = location.placeId
  const forward = placeFacing(placeId, index)
  const localOnly = location.kind !== 'charted'
  const viewpoint = WORLD_NODE_VIEWPOINTS.find((row) => row.nodes.includes(nodeId))
  const anchor = NODE_POS[viewpoint?.anchorPlace] || location.position || [0, 0]
  const offset = viewpoint?.offset || [0, 0, 0]
  const eye = [anchor[0] + offset[0], WORLD_NODE_EYE_HEIGHT + offset[1], anchor[1] + offset[2]]
  const narrativeDomain = activeClaims.find((row) => row.narrativeDomain)?.narrativeDomain || null
  const environment = live ? { ...environmentSnapshot(currentStoryState(state)), light: environmentSnapshot(currentStoryState(state)).phase }
    : { light: 'neutral', weather: 'clear', season: null, region: NODE_REGION[nodeId], authoredPreview: true }
  const candidates = new Map()
  const addObject = (object, claimIds, inherited = false) => {
    const current = candidates.get(object.key)
    if (current) {
      candidates.set(object.key, { ...current, ...clone(object), attributes: { ...current.attributes, ...object.attributes },
        claimIds: unique([...current.claimIds, ...claimIds]), inherited: current.inherited && inherited })
    } else candidates.set(object.key, { ...clone(object), attributes: { ...object.attributes }, claimIds: [...claimIds], inherited })
  }
  if (placeId && !narrativeDomain) {
    for (const object of index.persistent.values()) {
      if (object.placeId !== placeId) continue
      const established = object.claimIds.filter((id) => {
        const source = index.sourcesById.get(id)
        return activeIds.has(id) || (source?.nodeId === placeId && unconditioned(source.conditions))
      })
      for (const id of established) {
        const definition = index.claims.get(id)?.objects.find((entry) => entry.key === object.key)
        if (definition) addObject(definition, [id], true)
      }
    }
  }
  for (const row of activeClaims) for (const object of row.objects || []) addObject(object, [row.id])
  const stateClaims = activeClaims.flatMap((row) => (row.states || []).map((entry) => ({ ...entry, claimId: row.id })))
  const viewer = {}
  for (const entry of stateClaims) {
    if (entry.key === 'viewer') { viewer[entry.property] = entry.value; continue }
    if (entry.key === 'environment') {
      environment[entry.property] = entry.value
      if (['phase','timeOfDay','time','light'].includes(entry.property)) environment.light = entry.value
      continue
    }
    const object = candidates.get(entry.key)
    if (!object) continue
    object.claimIds = unique([...object.claimIds, entry.claimId])
    if ((entry.property === 'presence' && ['absent', false].includes(entry.value)) ||
      (['present', 'visible', 'visibleToViewer'].includes(entry.property) && entry.value === false)) candidates.delete(entry.key)
    else if (entry.property === 'asset') object.asset = entry.value
    else if (entry.property === 'count') object.count = entry.value
    else object.attributes[entry.property] = entry.value
  }
  if (Number.isFinite(viewer.height) && viewer.height > 0) eye[1] = offset[1] + viewer.height
  const objects = []
  for (const object of candidates.values()) {
    const origin = localPosition(object, placeId, forward, index)
    const landmark = index.elements.get(object.key)
    let rotationY = object.rotationY ?? Math.atan2(-forward[0], -forward[1])
    if (object.asset === 'bridge' && landmark?.geometry?.size) {
      object.attributes = { ...object.attributes, length: landmark.geometry.size[0], width: landmark.geometry.size[2], height: .12 }
      rotationY = (landmark.geometry.rotationY || 0) + Math.PI / 2
    }
    if (viewpoint && !landmark) {
      origin[0] += anchor[0] - (location.position?.[0] || 0)
      origin[2] += anchor[1] - (location.position?.[1] || 0)
      // Contents stay at their physical level as the camera rises or dives.
      if (viewpoint.kind === 'underwater') origin[1] += offset[1]
      if (viewpoint.kind === 'tree-canopy') origin[1] = Math.max(0,origin[1])
      if (viewpoint.kind === 'tree-canopy' && !['tree', 'road', 'snow', 'dragon', 'deer'].includes(object.asset)) origin[1] = 8
      if (viewpoint.kind.startsWith('well-')) origin[1] = object.asset === 'well' ? 0 : offset[1]
    }
    if (viewpoint?.kind === 'underwater' && ['fortress','castle','palace'].includes(object.asset)) { origin[0] = eye[0]; origin[2] = eye[2] - 2 }
    if (viewpoint?.kind === 'window-flight') {
      if (object.asset === 'window') { origin[1]=4; origin[2]=eye[2]-8 }
      if (object.asset === 'human') { origin[1]=4; origin[2]=eye[2]-12-(hash(object.key)%3) }
      if (object.key === 'maro-window-room') { origin[0]=eye[0]; origin[1]=4; origin[2]=eye[2]-14 }
    }
    if (object.asset === 'well' && viewpoint?.kind.startsWith('well-')) { origin[0] = eye[0]; origin[2] = eye[2]; object.attributes = {...object.attributes, depth: 20, width: 7} }
    if (object.key === 'eagle-tree' && ['shqipe1','shqipe2'].includes(placeId)) { origin[0] = NODE_POS.shqipe1[0] - 5; origin[2] = NODE_POS.shqipe1[1] - 5; origin[1] = 0; object.attributes.height = 10 }
    if (object.key === 'eagle-nest' && ['shqipe1','shqipe2'].includes(placeId)) { origin[0] = NODE_POS.shqipe1[0]; origin[2] = NODE_POS.shqipe1[1] - 9; origin[1] = 8; object.scale = 5 }
    if (['nest-snake','eagle-chick'].includes(object.key) && ['shqipe1','shqipe2'].includes(placeId)) { origin[0] = NODE_POS.shqipe1[0] + (object.key === 'nest-snake' ? -.6 : .6); origin[2] = NODE_POS.shqipe1[1] - 10; origin[1] = 8.6 }
    if (nodeId === 'pemaDielli' && object.asset === 'tree') { origin[0] = eye[0] - 5; origin[2] = eye[2] + 4; origin[1] = 0 }
    if (object.asset === 'cave' && object.attributes.interior === true) {
      origin[0]=eye[0]; origin[1]=eye[1]-(Number.isFinite(viewer.height)?viewer.height:WORLD_NODE_EYE_HEIGHT); origin[2]=eye[2]
      environment.setting='indoor'
    }
    const count = object.count ?? 1
    for (let item = 0; item < count; item++) {
      const position = [...origin]
      const spread = count > 1 ? (item - (count - 1) / 2) * 1.8 : 0
      position[0] += -forward[1] * spread
      position[2] += forward[0] * spread
      if (['human','man','woman','child','giant','spirit','fairy'].includes(object.asset) && object.rotationY === undefined) rotationY = Math.atan2(position[0]-eye[0],position[2]-eye[2])
      objects.push({ id: `node-object:${placeId}:${object.key}${count > 1 ? `:${item}` : ''}`, key: object.key,
        label: object.label, asset: object.asset, position, rotationY,
        scale: scalar(object.scale), attributes: object.attributes, claimIds: object.claimIds, descriptionIds: object.claimIds,
        sourceDescriptions: object.claimIds.map((id) => index.sourcesById.get(id)).filter(Boolean).map(clone),
        sourceCount: count, countExact: object.countExact !== false, instance: item, inherited: object.inherited, persistence: object.persistence || 'scene',
        placement: { zone: object.zone || 'front', authority: localOnly ? 'unlocated-local-staging' : index.elements.has(object.key) ? 'registered-landmark' : 'illustrative-local-staging' } })
    }
  }
  // A crossing is a fixed world feature: fit the water beneath its deck, never move the bridge toward a local river proxy.
  for (const bridge of objects.filter((object) => object.asset === 'bridge' && object.placement.authority === 'registered-landmark')) {
    const waterKey = bridge.key === 'feature:village-bridge' ? 'world:central-river' : bridge.key === 'feature:fshaj-bridge' ? 'feature:fshaj-river-below' : null
    const water = objects.find((object) => object.key === waterKey)
    if (water) { water.position = [bridge.position[0], 0, bridge.position[2]]; water.rotationY = bridge.rotationY + Math.PI / 2; water.attributes = { ...water.attributes, width: bridge.attributes.length * .82, length: Math.max(180, bridge.attributes.width * 15) } }
  }
  const relations = applyRelations(objects, activeClaims.flatMap((row) => (row.relations || []).map((relation) => ({ ...relation, claimId: row.id }))), forward, eye)
  const descriptions = sources.map((source) => {
    const claim = index.claims.get(source.id)
    return { ...clone(source), disposition: claim?.disposition || 'unreviewed', rationale: claim?.rationale || 'Missing authored physical review.',
      active: activeIds.has(source.id), visibleInState: live && activeIds.has(source.id), physicalClaims: clone(claim?.objects || []),
      states: clone(claim?.states || []), relations: clone(claim?.relations || []),
      elementIds: objects.filter((object) => object.claimIds.includes(source.id)).map(({ id }) => id) }
  })
  const localIds = new Set(sources.map(({ id }) => id))
  const provenance = unique(objects.flatMap(({ claimIds }) => claimIds))
    .filter((id) => !localIds.has(id)).map((id) => index.sourcesById.get(id)).filter(Boolean).map((source) => ({ ...clone(source), inherited: true }))
  const viewForward = viewer.facing === 'back' ? forward.map((value) => -value) : forward
  return {
    version: WORLD_NODE_RENDER_VERSION, nodeId, label: buildWorldNodeSceneIndex().find((entry) => entry.nodeId === nodeId).label,
    location, localOnly, mode, viewer, narrativeDomain, viewpoint: viewpoint ? clone(viewpoint) : null, representativeDescriptionId: representative?.id || null, selectedDescriptionId: witness?.id || null, objects, descriptions, provenance, relations, states: stateClaims,
    camera: { eye, target: [eye[0] + viewForward[0] * 10, eye[1] + (viewpoint?.kind === 'tree-canopy' ? -4 : viewpoint?.kind.startsWith('well-') ? 20 : 0), eye[2] + viewForward[1] * (viewpoint?.kind.startsWith('well-') ? 3 : 10)], up: [0, 1, 0], fov: 70,
      space: localOnly ? 'unlocated-local' : 'world', localOnly },
    environment: { ...environment, unlocated: localOnly, underwater: viewpoint?.kind === 'underwater', groundHeight: viewpoint?.kind === 'underwater' ? offset[1] - 1 : viewpoint?.kind.startsWith('well-') ? -20 : 0 },
    coverage: { sources: sources.length, reviewed: sources.filter(({ id }) => index.claims.has(id)).length,
      active: active.length, objects: objects.length, physical: descriptions.filter(({ physicalClaims }) => physicalClaims.length).length,
      inheritedObjects: objects.filter(({ inherited }) => inherited).length },
    limitations: [
      ...(localOnly ? ['Unlocated local reconstruction: only source-evidenced nearby objects are staged. The origin is display space, not a world coordinate or an invented destination.'] : []),
      ...(representative ? [`No unconditional physical beat exists; this initial view illustrates ${representative.id}. Its conditions are shown beside the source and do not mutate the game.`] : []),
      ...(viewpoint ? [viewpoint.rationale + ' Vertical distances are illustrative; the exact prose establishes the level relationship.'] : []),
      ...(mode === 'live' ? [] : ['This is an authored source preview, not a claim that these conditions form a reached gameplay state.']),
      'Object dimensions, unmeasured offsets and unstated decorative details are illustrative. Exact text, counts, identities and declared relations remain inspectable.',
    ],
  }
}

export function validateWorldNodeClaims(rows = WORLD_SCENE_3D_NODE_CLAIMS) {
  const issues = []
  const expected = new Map(sourceIndex().sources.map((entry) => [entry.id, entry]))
  const seen = new Set()
  const viewpointNodes = new Set()
  for (const view of WORLD_NODE_VIEWPOINTS) {
    const source = expected.get(view.witness)
    if (!source || (view.text && view.text !== source.text)) issues.push({id: view.witness, message: 'viewpoint has missing or stale exact source evidence'})
    for (const node of view.nodes) {
      if (!STORY[node] || viewpointNodes.has(node)) issues.push({id: node, message: 'invalid or duplicate viewpoint'})
      viewpointNodes.add(node)
    }
  }
  for (const row of rows) {
    const fail = (message) => issues.push({ id: row.id || 'missing-id', message })
    const source = expected.get(row.id)
    if (!source) { fail('claim has no exact authored story source'); continue }
    if (seen.has(row.id)) fail('duplicate source disposition')
    seen.add(row.id)
    for (const field of ['nodeId', 'lineIndex', 'placeId', 'text', 'conditions']) if (!same(row[field], source[field])) fail(`stale ${field}; review this exact source record`)
    if (!WORLD_NODE_DISPOSITIONS.includes(row.disposition)) fail('unclassified physical/source disposition')
    if (typeof row.rationale !== 'string' || row.rationale.trim().length < 12) fail('source-specific modeling rationale is missing')
    if (!Array.isArray(row.objects) || !Array.isArray(row.states) || !Array.isArray(row.relations)) { fail('objects, states and relations must be explicit arrays'); continue }
    if (['nonvisual', 'reported', 'historical', 'offstage', 'abstract', 'absence'].includes(row.disposition) && row.objects.length) fail('nonphysical prose cannot assert present scene objects')
    if (row.disposition === 'physical' && !row.objects.length && !row.states.length && !row.relations.length) fail('physical prose has no modeled claim')
    const keys = new Set()
    for (const object of row.objects) {
      if (!object.key || keys.has(object.key)) fail(`missing or duplicate object key ${object.key}`)
      keys.add(object.key)
      if (!object.label?.trim()) fail(`${object.key}: physical object label missing`)
      if (!WORLD_NODE_ZONES.includes(object.zone)) fail(`${object.key}: unreviewed location zone`)
      if (!Number.isSafeInteger(object.count) || object.count < 1 || object.count > 1000) fail(`${object.key}: exact rendered count is invalid`)
      if (object.offset && !finite3(object.offset)) fail(`${object.key}: invalid local position`)
      if (object.scale && (!finite3(scalar(object.scale)) || scalar(object.scale).some((x) => x <= 0))) fail(`${object.key}: invalid model dimensions`)
      if (object.persistence && !['place', 'scene'].includes(object.persistence)) fail(`${object.key}: unreviewed persistence policy`)
      try { if (!buildAssetParts(object.asset, object.attributes).length) fail(`${object.key}: empty model geometry`) }
      catch (error) { fail(`${object.key}: ${error.message}`) }
    }
    for (const state of row.states) if (!state.key || !state.property || state.value === undefined) fail('incomplete physical state claim')
    for (const relation of row.relations) if (!relation.subject || !relation.kind || !relation.target) fail('incomplete physical relationship')
  }
  for (const [id] of expected) if (!seen.has(id)) issues.push({ id, message: 'authored source has no reviewed physical disposition' })
  return issues
}

export function validateWorldNodeScene(scene) {
  const issues = []
  const fail = (id, message) => issues.push({ id, message })
  if (!STORY[scene.nodeId]) return [{ id: scene.nodeId, message: 'render has no story node' }]
  const expected = sourceIndex().byNode.get(scene.nodeId)
  if (!same(scene.descriptions.map(({ id }) => id), expected.map(({ id }) => id))) fail(scene.nodeId, 'render source inventory is incomplete')
  if (isUnchartedStoryNode(scene.nodeId)) {
    if (!scene.localOnly || scene.camera?.space !== 'unlocated-local' || scene.location.position || scene.location.placeId) fail(scene.nodeId, 'unknown destination was assigned a world location')
    if (scene.objects.some(({ placement }) => placement?.authority !== 'unlocated-local-staging')) fail(scene.nodeId, 'unlocated physical evidence acquired a world placement')
  } else {
    const view = WORLD_NODE_VIEWPOINTS.find((row) => row.nodes.includes(scene.nodeId))
    const position = NODE_POS[view?.anchorPlace || scene.nodeId]
    const offset = view?.offset || [0, 0, 0]
    if (!finite3(scene.camera?.eye) || !same(scene.camera.eye, [position[0] + offset[0], (Number.isFinite(scene.viewer?.height) ? scene.viewer.height : WORLD_NODE_EYE_HEIGHT) + offset[1], position[1] + offset[2]])) fail(scene.nodeId, 'camera is not at the canonical node location and reviewed physical level')
  }
  const ids = new Set()
  for (const object of scene.objects) {
    if (ids.has(object.id)) fail(object.id, 'duplicate rendered identity')
    ids.add(object.id)
    if (!finite3(object.position) || !finite3(object.scale)) fail(object.id, 'nonfinite scene transform')
    if (!object.claimIds?.length || object.claimIds.some((id) => !sourceIndex().claims.has(id))) fail(object.id, 'geometry has no exact reviewed source claim')
    try { if (!buildAssetParts(object.asset, object.attributes).length) fail(object.id, 'object has no geometry') }
    catch (error) { fail(object.id, error.message) }
  }
  for (const description of scene.descriptions) {
    const source = sourceIndex().sourcesById.get(description.id)
    const claim = sourceIndex().claims.get(description.id)
    for (const field of ['nodeId', 'lineIndex', 'placeId', 'text', 'conditions']) if (!same(description[field], source?.[field])) fail(description.id, `stale render source ${field}`)
    if (description.disposition !== claim?.disposition) fail(description.id, 'stale render source disposition')
    if (description.elementIds.some((id) => !ids.has(id))) fail(description.id, 'description targets missing render geometry')
    const links = scene.objects.filter((object) => object.claimIds.includes(description.id)).map(({ id }) => id)
    if (!same(description.elementIds, links)) fail(description.id, 'source and geometry links are not reciprocal')
  }
  return issues
}
