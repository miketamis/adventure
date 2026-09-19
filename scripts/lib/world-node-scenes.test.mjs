import assert from 'node:assert/strict'
import { runCausalArcSceneClaimAssertions } from './causal-arc-scene-claims.test.mjs'
import { STORY, lineOf } from '../../src/game/content.js'
import { albanianTextOf } from '../../src/game/language.js'
import { newRun, storyScenePresentationForState } from '../../src/game/gameState.js'
import { NODE_POS } from '../../src/components/nodePositions.js'
import { isUnchartedStoryNode } from '../../src/game/departureContexts.js'
import { WORLD_NODE_PLACE_FIXTURES } from '../../src/game/data/worldScene3dPlaceFixtures.js'
import { buildAssetParts } from '../../src/game/worldScene3dAssets.js'
import { WORLD_NODE_VIEWPOINTS, WORLD_NODE_FEATURE_STAGING } from '../../src/game/data/worldScene3dViewpoints.js'
import { WORLD_SCENE_3D_NODE_CLAIMS } from '../../src/game/data/worldScene3dNodeClaims.js'
import { buildWorldNodeSceneIndex, buildWorldNodeScene, applyWorldNodeRelations, validateWorldNodeClaims, validateWorldNodeScene } from '../../src/game/worldScene3dNodes.js'
import { nodeSceneCamera, turnWorldNodeCamera, lookWorldNodeDirection, orbitWorldNodeCamera, projectWorldNodePoint, compileWorldNodeGeometry } from '../../src/components/worldScene3dNodeRenderer.js'

const clone = (value) => structuredClone(value)
const sorted = (values) => [...values].sort()
const caseFacts = (source) => new Set(source && !source.conditions.negate ? source.conditions.all || [] : [])
const allowedInCase = ({ conditions }, source) => {
  const facts = caseFacts(source), allRequired = (conditions.all || []).every((flag) => facts.has(flag))
  return (conditions.negate ? !allRequired : allRequired) && !(conditions.none || []).some((flag) => facts.has(flag)) && (!conditions.observationId || conditions.observationId === source?.conditions.observationId)
}

// A line to an actual modeled surface must clear every other opaque object.
// This catches source-visible actors hidden behind a perfectly valid enclosure.
function hasVisibleSurface(scene,key) {
  const target=scene.objects.find((o)=>o.key===key);assert.ok(target,`${scene.nodeId}: missing ${key}`)
  const faces=compileWorldNodeGeometry(scene).faces,obstacles=faces.filter((f)=>f.objectId!==target.id),eye=scene.camera.eye
  const sub=(a,b)=>a.map((n,i)=>n-b[i]),dot=(a,b)=>a.reduce((n,v,i)=>n+v*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
  for(const face of faces.filter((f)=>f.objectId===target.id)) {
    const to=[0,1,2].map((axis)=>face.vertices.reduce((n,v)=>n+v[axis],0)/face.vertices.length),direction=sub(to,eye)
    const blocked=obstacles.some((f)=>{
      for(let i=1;i<f.vertices.length-1;i++) {
        const e1=sub(f.vertices[i],f.vertices[0]),e2=sub(f.vertices[i+1],f.vertices[0]),p=cross(direction,e2),det=dot(e1,p)
        if(Math.abs(det)<1e-10)continue
        const offset=sub(eye,f.vertices[0]),u=dot(offset,p)/det;if(u<0||u>1)continue
        const q=cross(offset,e1),v=dot(direction,q)/det;if(v<0||u+v>1)continue
        const t=dot(e2,q)/det;if(t>1e-6&&t<1-1e-5)return true
      }
      return false
    })
    if(!blocked)return true
  }
  return false
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
      const supportRelation=scene.relations.find((r)=>r.subject==='viewer'&&r.kind==='on'&&r.geometryStatus==='modeled'),support=scene.objects.find((o)=>o.id===supportRelation?.targetId),deck=support?.asset==='ship'&&compileWorldNodeGeometry({objects:[support]}).faces.filter((f)=>f.partId==='ship-deck').flatMap((f)=>f.vertices)
      assert.deepEqual(scene.camera.eye, [0, deck?Math.max(...deck.map((p)=>p[1]))+1.7:1.7, 0], 'unlocated local staging keeps local XZ and stands on its source-backed physical support')
      assert.ok(scene.objects.every(({ placement }) => placement.authority === 'unlocated-local-staging'))
    } else {
      const view = WORLD_NODE_VIEWPOINTS.find(({ nodes }) => nodes.includes(scene.nodeId)), origin = NODE_POS[view?.anchorPlace] || NODE_POS[scene.nodeId], offset = view?.offset || [0, 0, 0]
      if(view?.kind==='tower-top') {
        const support=scene.objects.find((o)=>o.key===view.supportKey),points=compileWorldNodeGeometry({objects:[support]}).faces.filter((f)=>f.partId==='tower-top-deck').flatMap((f)=>f.vertices)
        assert.equal(scene.camera.eye[1]-1.7,Math.max(...points.map((p)=>p[1])),'tower viewpoint must stand on the actual supporting deck')
        assert.deepEqual([scene.camera.eye[0],scene.camera.eye[2]],[support.position[0],support.position[2]])
      }else if(scene.relations.some((r)=>r.subject==='viewer'&&r.kind==='on'&&r.geometryStatus==='modeled')) {
        const relation=scene.relations.find((r)=>r.subject==='viewer'&&r.kind==='on'&&r.geometryStatus==='modeled'),mount=scene.objects.find((o)=>o.id===relation.targetId),body=buildAssetParts(mount.asset,mount.attributes).find((p)=>p.id==='body')
        assert.equal(scene.camera.eye[1],mount.position[1]+(body.position[1]+body.size[1]/2)*mount.scale[1]+.95,'mounted viewer follows actual saddle')
        assert.deepEqual([scene.camera.eye[0],scene.camera.eye[2]],[origin[0]+offset[0],origin[1]+offset[2]])
      }else assert.deepEqual(scene.camera.eye, [origin[0] + offset[0], (Number.isFinite(scene.viewer?.height) ? scene.viewer.height : 1.7) + offset[1], origin[1] + offset[2]], `${scene.nodeId}: exact authored viewpoint refinement drifted`)
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
  // A 360-degree indoor view must have actual walls and a roof overhead.
  // Cutaway conventions belong to inspection, not to the embodied room.
  for(const nodeId of ['plaka','kulle1','kulle2']) {
    const scene=buildWorldNodeScene(nodeId), relation=scene.relations.find((r)=>r.subject==='viewer'&&r.kind==='inside')
    assert.ok(relation, `${nodeId}: the inherited enclosure relation disappeared`)
    const enclosure=scene.objects.find((o)=>o.id===relation.targetId)
    assert.equal(enclosure.attributes.interior,true)
    const geometry=compileWorldNodeGeometry({objects:[enclosure]})
    assert.ok(geometry.faces.some((face)=>['pitched-roof','tower-ceiling'].includes(face.partId)&&face.vertices.every((p)=>p[1]>scene.camera.eye[1])), `${nodeId}: occupied room has no physical roof`)
  }
  const rotatedRoom={id:'rotated-room',key:'rotated-room',asset:'house',attributes:{interior:true},position:[10,0,20],rotationY:Math.PI/4,scale:[1,1,1],placement:{authority:'illustrative-local-staging'}}
  const occupant={id:'rotated-occupant',key:'rotated-occupant',asset:'bed',attributes:{},position:[17,0,13],rotationY:Math.PI/7,scale:[1,1,1],placement:{authority:'illustrative-local-staging'}}
  applyWorldNodeRelations([rotatedRoom,occupant],[{subject:occupant.key,kind:'inside',target:rotatedRoom.key}],[0,-1],[10,1.7,20])
  for(const p of compileWorldNodeGeometry({objects:[occupant]}).faces.flatMap((f)=>f.vertices)) {
    const x=p[0]-10,z=p[2]-20,c=Math.cos(Math.PI/4),s=Math.sin(Math.PI/4)
    assert.ok(Math.abs(x*c-z*s)<=4-.17 && Math.abs(x*s+z*c)<=3.5-.17,'a rotated-room occupant intersects its actual interior wall plane')
  }
  const bearScene=buildWorldNodeScene('arusheFund'),bear=bearScene.objects.find((o)=>o.key==='animal:dervish-bear'),cauldron=bearScene.objects.find((o)=>o.key==='fixture:bear-cauldron')
  const head=compileWorldNodeGeometry({objects:[bear]}).faces.filter((f)=>f.partId==='muzzle').flatMap((f)=>f.vertices)
  const rim=compileWorldNodeGeometry({objects:[cauldron]}).faces.filter((f)=>f.partId==='open-rim').flatMap((f)=>f.vertices)
  const muzzleY=(Math.min(...head.map((p)=>p[1]))+Math.max(...head.map((p)=>p[1])))/2
  assert.ok(muzzleY>cauldron.position[1]+.1 && muzzleY<Math.max(...rim.map((p)=>p[1])),'the bear muzzle must be inside the vessel vertically as well as horizontally')
  const riders=buildWorldNodeScene('kostandin3'),horse=riders.objects.find((o)=>o.key==='animal:kostandin-horse')
  const horseBody=compileWorldNodeGeometry({objects:[horse]}).faces.filter((f)=>f.partId==='body').flatMap((f)=>f.vertices)
  const saddleHeight=Math.max(...horseBody.map((p)=>p[1]))
  const mounted=riders.objects.filter((o)=>['actor:kostandin','actor:doruntina'].includes(o.key))
  assert.equal(mounted.length,2)
  for(const rider of mounted){
    assert.equal(rider.attributes.pose,'riding')
    const faces=compileWorldNodeGeometry({objects:[rider]}).faces
    const hip=faces.filter((f)=>f.partId==='belt').flatMap((f)=>f.vertices)
    assert.ok(Math.abs((Math.min(...hip.map((p)=>p[1]))+Math.max(...hip.map((p)=>p[1])))/2-saddleHeight)<.2,'a rider must sit on the horse back, not float over its ears')
    assert.ok(Math.min(...faces.flatMap((f)=>f.vertices.map((p)=>p[1])))<saddleHeight,'rider legs must extend down the sides of the mount')
  }
  assert.ok(Math.hypot(...mounted[0].position.map((n,i)=>n-mounted[1].position[i]))>.4,'two riders occupy distinct saddle positions')
  const nestScene=buildWorldNodeScene('shqipe2'),nest=nestScene.objects.find((o)=>o.key==='eagle-nest'),tree=nestScene.objects.find((o)=>o.key==='eagle-tree')
  const bowl=compileWorldNodeGeometry({objects:[nest]}).faces.filter((f)=>f.partId==='woven-bowl-floor').flatMap((f)=>f.vertices)
  assert.ok(Math.abs(Math.max(...bowl.map((p)=>p[1]))-(nestScene.camera.eye[1]-1.7))<.03,'the observer stands on the woven nest floor')
  assert.ok(buildAssetParts(tree.asset,tree.attributes).some((p)=>p.id==='supporting-branch'),'the elevated nest has a visible supporting branch')
  assert.ok(buildAssetParts('gate',{open:false}).some((p)=>p.id.startsWith('gate-bar:')))
  assert.ok(!buildAssetParts('gate',{open:true}).some((p)=>p.id.startsWith('gate-bar:')))
  assert.ok(buildAssetParts('milk',{variant:'contained-surface'}).every((p)=>p.id==='milk-surface'),'contained milk must not instantiate another cup')
  for(const [nodeId,id] of [['detiNgrene','description:detiNgrene:0'],['detiStuhi','description:detiStuhi:1']]) assert.equal(buildWorldNodeScene(nodeId,{selectedDescriptionId:id}).environment.underwater,true,'authored underwater state survives without a special viewpoint')
  for(const nodeId of ['pusi2','shqiponja1','ngjitja1','ngjitja2','ngjitja3','gjizarPus']) {
    const scene=buildWorldNodeScene(nodeId),well=scene.objects.find((o)=>o.asset==='well')
    assert.ok(well,`${nodeId}: source-bound shaft missing`)
    if(scene.viewpoint.kind==='well-bottom')assert.equal(scene.camera.eye[1]-1.7,-well.attributes.depth,'stationary well observer stands at the shaft floor')
    const eagle=scene.objects.find((o)=>o.key==='carrying-eagle')
    if(eagle) {
      const vertices=compileWorldNodeGeometry({objects:[eagle]}).faces.flatMap((f)=>f.vertices)
      if(nodeId==='pusi2')assert.ok(vertices.every((p)=>p[1]>0),'the bird in the sky must remain above the well mouth')
      else for(const p of vertices)assert.ok(Math.hypot(p[0]-well.position[0],p[2]-well.position[2])<well.attributes.width*.45,'the approaching or carrying eagle must fit inside the shaft')
      if(scene.viewpoint.kind==='well-ascent')assert.ok(eagle.position[1]<scene.camera.eye[1]-1.7,'the carrying eagle stays beneath the embodied player')
    }
  }
  const quantities = [['osmaniProvat', 'ordeal-serpents', 9], ['osmaniProvat', 'ordeal-nails', 20], ['osmaniProvat', 'ordeal-fires', 2], ['sariFund', 'kulshedra-seven-heads', 7], ['sariFund', 'kulshedra-seven-tongues', 7]]
  for (const [nodeId, key, count] of quantities) {
    const objects = buildWorldNodeScene(nodeId).objects.filter((object) => object.key === key)
    assert.equal(objects.length, count, `${nodeId}: exact authored quantity ${key}`)
    assert.ok(objects.every((object) => object.countExact && object.sourceCount === count))
  }
  const taleClock={...newRun(),nodeId:'mulli1',clock:18,embodying:'maro-perhitura',embodimentClock:5}
  const clockScene=buildWorldNodeScene('mulli1',{state:taleClock})
  assert.ok(!clockScene.objects.some((o)=>o.claimIds.includes('description:mulli1:10')),'fixture visibility must use the active narrative clock, not the live world clock')
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
  const noTowerClaims=clone(rows)
  for(const row of noTowerClaims)row.objects=row.objects.filter((o)=>o.asset!=='tower')
  assert.ok(validateWorldNodeClaims(noTowerClaims).some((issue)=>/support|refinement/.test(issue.message)),'supplied claim rows must contain the viewpoint support and refined feature');corruptions++
  const between=rows.find((row)=>row.relations.some((r)=>r.kind==='between'))
  for(const secondTarget of [undefined,'__missing__']) {
    const changed=clone(rows);changed.find((r)=>r.id===between.id).relations.find((r)=>r.kind==='between').secondTarget=secondTarget
    assert.ok(validateWorldNodeClaims(changed).length,'missing second endpoint passed relationship validation');corruptions++
  }
  for(const mutate of [(rows)=>rows.push(clone(rows[0])),(rows)=>{rows[0].witnesses[0].text+=' forged'},(rows)=>{rows[0].owner=''},(rows)=>{rows[0].key='missing-fixture'},(rows)=>{rows[0].sourceIds.push(rows[0].sourceIds[0])}]) {
    const fixtures=clone(WORLD_NODE_PLACE_FIXTURES);mutate(fixtures)
    assert.ok(validateWorldNodeClaims(rows,{fixtures}).length,'malformed/stale fixture inheritance declaration passed');corruptions++
  }
  for(const mutate of [(rows)=>rows.push(clone(rows[0])),(rows)=>{rows[0].text+=' forged'},(rows)=>{rows[0].offset=[0,Infinity,0]},(rows)=>{rows[0].key='missing-feature'}]) {
    const refinements=clone(WORLD_NODE_FEATURE_STAGING);mutate(refinements)
    assert.ok(validateWorldNodeClaims(rows,{refinements}).length,'malformed/stale model refinement passed');corruptions++
  }
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
  // Scenery provenance must not import a future actor action into an earlier beat.
  const climbing=buildWorldNodeScene('kalaNgjitje'),embedded=buildWorldNodeScene('kalaMur')
  assert.ok(!climbing.relations.some((r)=>r.subject==='actor:rozafa'&&r.target==='rozafa-wall'&&r.claimId==='description:kalaMur:0'),'future immurement leaked through the wall fixture')
  assert.ok(embedded.relations.some((r)=>r.subject==='actor:rozafa'&&r.target==='rozafa-wall'),'authored immurement lost its current relation')
  for(const node of ['kafeneja','odaJutbina']) {
    const scene=buildWorldNodeScene(node)
    for(const key of new Set(scene.objects.filter((o)=>o.sourceCount>1).map((o)=>o.key))) {
      const group=scene.objects.filter((o)=>o.key===key)
      assert.equal(new Set(group.map((o)=>JSON.stringify(o.position))).size,group.length,`${node}: group collapsed onto a clamped boundary`)
      for(const object of group)assert.ok(Math.hypot(object.position[0]-scene.camera.eye[0],object.position[2]-scene.camera.eye[2])>.4,`${node}: group occupies the observer`)
    }
  }
  for(const node of ['plaka','breshka1','bujtina','kafeneja'])assert.equal(buildWorldNodeScene(node).environment.setting,'indoor',`${node}: enclosed room exposes outdoor precipitation`)
  for(const node of ['nastradin1','breshka1']) {
    const scene=buildWorldNodeScene(node),cooking=scene.relations.filter((r)=>r.kind==='above'&&scene.objects.some((o)=>o.id===r.targetId&&['fire','hearth'].includes(o.asset)))
    for(const relation of cooking) {
      const vessel=scene.objects.find((o)=>o.id===relation.subjectId),fire=scene.objects.find((o)=>o.id===relation.targetId)
      const support=compileWorldNodeGeometry({objects:[fire]}).faces.filter((f)=>f.partId==='ember-bed').flatMap((f)=>f.vertices),bottom=Math.min(...compileWorldNodeGeometry({objects:[vessel]}).faces.flatMap((f)=>f.vertices.map((v)=>v[1])))
      assert.ok(bottom-Math.max(...support.map((p)=>p[1]))<.025,'cooking prop floats above the flames instead of resting on hearth support')
    }
    const positions=cooking.map((r)=>scene.objects.find((o)=>o.id===r.subjectId).position)
    assert.equal(new Set(positions.map((p)=>JSON.stringify(p))).size,positions.length,'cooking objects occupy the same point')
  }
  for(const node of ['breshka1','breshkaMire','breshkaFund']) {
    const scene=buildWorldNodeScene(node),house=scene.objects.find((o)=>o.key==='place:breshka1:house')
    assert.ok(!buildAssetParts(house.asset,house.attributes).some((p)=>p.id.startsWith('entrance:')),'source door has a conflicting generated duplicate')
  }
  const breathing=buildWorldNodeScene('stihi1'),breath=breathing.objects.find((o)=>o.key==='effect:stihi-fire')
  assert.ok(buildAssetParts(breath.asset,breath.attributes).every((p)=>p.id.startsWith('breath-flame:')),'emitted mouth fire cannot carry a hearth, stones or logs')
  const guardScene=buildWorldNodeScene('kordhaPallat')
  for(const key of ['creature:kordha-kulshedra','effect:kordha-guard-fire'])assert.ok(hasVisibleSurface(guardScene,key),`palace encounter hides ${key} behind enclosure geometry`)
  const hiddenGuard=clone(guardScene);hiddenGuard.objects.find((o)=>o.key==='creature:kordha-kulshedra').position[0]+=40
  assert.equal(hasVisibleSurface(hiddenGuard,'creature:kordha-kulshedra'),false,'sight-line probe must reject a guardian beyond the opaque palace wall');corruptions++
  const upperWindow=buildWorldNodeScene('maroZogu'),upperRoom=upperWindow.objects.find((o)=>o.key==='maro-window-room')
  assert.equal(upperRoom.position[1],4,'part-of must preserve the reviewed upstairs window assembly')
  for(const key of ['maro-son','actor:lena','actor:maro-prince'])assert.ok(hasVisibleSurface(upperWindow,key),`upstairs window hides ${key} behind actual walls/roof`)
  const loweredWindow=clone(upperWindow)
  for(const object of loweredWindow.objects)if(object.key==='maro-window-room'||object.asset==='human')object.position[1]-=3.8
  assert.equal(hasVisibleSurface(loweredWindow,'maro-son'),false,'sight-line probe must reject a ground-floor child behind an upstairs window');corruptions++
  const rescue=buildWorldNodeScene('mujo4'),exterior=rescue.relations.filter((r)=>r.kind==='outside').map((r)=>rescue.objects.find((o)=>o.id===r.subjectId)).filter(Boolean),distinct=new Map(exterior.map((o)=>[o.id,o]))
  assert.equal(new Set([...distinct.values()].map((o)=>JSON.stringify(o.position))).size,distinct.size,'rescuers outside the same cell collapse to one position')
  const localVertices=(object,container)=>compileWorldNodeGeometry({objects:[object]}).faces.flatMap((f)=>f.vertices).map((v)=>{const x=v[0]-container.position[0],z=v[2]-container.position[2],c=Math.cos(container.rotationY),sin=Math.sin(container.rotationY);return [(c*x-sin*z)/container.scale[0],(v[1]-container.position[1])/container.scale[1],(sin*x+c*z)/container.scale[2]]})
  for(const node of ['gruaUji1','kordhaMoat','kordhaMoatVdes'])for(const descriptionId of [null,...rows.filter((r)=>r.nodeId===node).map((r)=>r.id)]) {
    const scene=buildWorldNodeScene(node,descriptionId?{selectedDescriptionId:descriptionId}:{}),liquid=scene.objects.find((o)=>o.key===(node==='gruaUji1'?'item:mira-water':'place:kordhaMoat:black-water')),container=scene.objects.find((o)=>o.key===(node==='gruaUji1'?'item:mira-bucket':'place:kordhaMoat:moat'))
    if(!liquid||!container)continue
    const vertices=localVertices(liquid,container),parts=buildAssetParts(liquid.asset,liquid.attributes)
    assert.equal(parts.length,1,'contained water must not bring full river banks or distant ripples')
    if(node==='gruaUji1') {
      assert.ok(vertices.every(([x,y,z])=>Math.hypot(x,z)<.65*.85/2&&y>.55&&y<.6),'bucket liquid must stay inside the open rim')
    } else {
      assert.ok(vertices.every(([x,y,z])=>Math.hypot(x,z)>=4.725-1e-7&&Math.hypot(x,z)<=6.75+1e-7&&y>0&&y<.1),'moat water must occupy only the bounded channel above its bed')
      const banks=buildAssetParts(container.asset,container.attributes)
      assert.ok(!banks.some((p)=>p.id==='water-channel'),'source black water has a duplicate generated liquid')
      for(const bank of banks)assert.ok(bank.size[0]/2<=4.725+1e-7||bank.size[0]*bank.innerRatio/2>=6.75-1e-7,'solid moat banks cover the visible liquid channel')
    }
  }
  const fallingMoat=buildWorldNodeScene('kordhaMoatVdes'),fallChannel=fallingMoat.objects.find((o)=>o.asset==='moat'),fallRadius=Math.hypot(fallingMoat.camera.eye[0]-fallChannel.position[0],fallingMoat.camera.eye[2]-fallChannel.position[2])
  assert.ok(fallRadius>4.725&&fallRadius<6.75,'falling into the moat must place the observer above the channel, not its central dry island')
  const millOutside=buildWorldNodeScene('punaMulli'),mill=millOutside.objects.find((o)=>o.key==='feature:working-mill'),river=millOutside.objects.find((o)=>o.key==='world:central-river')
  assert.ok(localVertices(river,mill).every((v)=>v[2]<-(mill.attributes.depth||7)/2),'outside river footprint extends through the mill floor')
  return { nodes: index.length, sources: expectedSources.length, witnessViews, modeledObjects, reciprocalLinks, corruptions }
}
