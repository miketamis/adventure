import assert from 'node:assert/strict'
import { WORLD_SCENE_3D_ASSET_IDS, buildAssetParts, worldScene3dAssetBounds, worldScene3dAssetAttributeReview } from '../../src/game/worldScene3dAssets.js'
import { compileWorldNodeGeometry, nodeSceneCamera, turnWorldNodeCamera, lookWorldNodeDirection, projectWorldNodePoint, panoramaWorldDirection, cubeSampleForDirection, hitTestWorldNodeScene, drawWorldNodeScene, renderWorldNodePanorama } from '../../src/components/worldScene3dNodeRenderer.js'
export function runWorldNodeRendererAssertions() {
  const scene={objects:[],camera:{eye:[17,8.7,29],target:[17,8.7,19]}}
  const camera=nodeSceneCamera(scene)
  assert.deepEqual(camera.eye,[17,8.7,29], 'Camera retains exact authored altitude and physical position')
  for(let i=0;i<4;i++)assert.deepEqual(lookWorldNodeDirection(camera,i).eye,camera.eye,'Looking never teleports the observer')
  const turned=turnWorldNodeCamera(camera,700,1000)
  assert.deepEqual(turned.eye,camera.eye)
  assert.ok(turned.pitch>-Math.PI/2 && turned.pitch<-1.5, 'Free look reaches near the lower pole')
  assert.equal(nodeSceneCamera({objects:[],camera:null}),null)
  assert.equal(lookWorldNodeDirection(null,1),null)
  assert.deepEqual(projectWorldNodePoint([17,8.7,19],camera,800,400),{x:400,y:200,depth:10})
  assert.equal(projectWorldNodePoint([17,8.7,39],camera,800,400),null,'Behind-camera geometry cannot project')
  assert.ok(projectWorldNodePoint([18,8.7,19],camera,800,400).x>400)
  assert.ok(projectWorldNodePoint([17,9.7,19],camera,800,400).y<200)
  assert.equal(cubeSampleForDirection(panoramaWorldDirection(50,25,100,50),128).face,5,'Panorama center faces the scene target')
  assert.equal(cubeSampleForDirection(panoramaWorldDirection(50,0,100,50),128).face,2,'Panorama includes zenith')
  assert.equal(cubeSampleForDirection(panoramaWorldDirection(50,50,100,50),128).face,3,'Panorama includes nadir')
  const seamA=panoramaWorldDirection(0,25,100,50),seamB=panoramaWorldDirection(100,25,100,50)
  assert.ok(seamA.every((v,i)=>Math.abs(v-seamB[i])<1e-9),'Full spherical seam closes')
  assert.throws(()=>buildAssetParts('unreviewed-thing'),/Unknown world 3D asset/)
  for(const asset of WORLD_SCENE_3D_ASSET_IDS) {
    const parts=buildAssetParts(asset),bounds=worldScene3dAssetBounds(asset)
    assert.ok(parts.length>0,asset)
    assert.ok(bounds.min.every(Number.isFinite)&&bounds.max.every(Number.isFinite),asset)
    const object={id:`asset:${asset}`,asset,position:[0,0,0],claimIds:['source:exact']}
    const mesh=compileWorldNodeGeometry({objects:[object]})
    assert.ok(mesh.faces.length>0,asset)
    assert.ok(mesh.faces.every((face)=>face.vertices.every((v)=>v.every(Number.isFinite))&&face.objectId===object.id&&face.claimIds[0]==='source:exact'),asset)
  }
  assert.ok(buildAssetParts('house').some((p)=>p.id==='pitched-roof'))
  const cavern=buildAssetParts('cave',{interior:true})
  assert.ok(['cavern-floor','left-rock-wall','right-rock-wall','far-rock-wall','rock-ceiling','entrance-lintel'].every((id)=>cavern.some((p)=>p.id===id)),'Interior cave must enclose the viewer on all sides except its entrance')
  assert.ok(!buildAssetParts('cave').some((p)=>p.id==='rock-ceiling'),'Approach view retains exterior cave mouth')
  assert.ok(cavern.find((p)=>p.id==='far-rock-wall').position[2]<-20)
  assert.ok(cavern.find((p)=>p.id==='entrance-lintel').position[2]>0,'Interior cave entrance lies behind the viewer')
  assert.ok(cavern.find((p)=>p.id==='rock-ceiling').position[1]>=10,'Ceiling contains the giant rather than placing it outdoors')
  assert.ok(buildAssetParts('well').some((p)=>p.primitive==='tube'&&p.id==='stone-rim'))
  assert.equal(buildAssetParts('bridge',{height:.12})[0].position[1],.12,'Authored bridge deck height is honored')
  assert.ok(!buildAssetParts('nest').some((p)=>p.id.startsWith('egg:')),'A nest does not invent eggs without a claim')
  for(const asset of ['horse','dragon','snake']) {const lying=compileWorldNodeGeometry({objects:[{id:asset,asset,position:[0,0,0],attributes:{dead:true}}]});assert.ok(lying.bounds.min[1]>=0,`${asset} must lie above the ground`)}
  assert.ok(buildAssetParts('bridge').some((p)=>p.id.startsWith('deck-board:')))
  assert.ok(buildAssetParts('human').some((p)=>p.id.startsWith('forearm:')))
  assert.notDeepEqual(buildAssetParts('human'),buildAssetParts('human',{pose:'sleeping'}))
  assert.ok(!buildAssetParts('river',{dry:true}).some((p)=>p.id==='water-surface'))
  assert.ok(!buildAssetParts('dragon').some((p)=>p.id.startsWith('membrane:')),'Unstated wings are not invented')
  assert.equal(worldScene3dAssetAttributeReview('human',{unreviewedMood:'fear'}).unsupported.length,1)
  assert.ok(!buildAssetParts('dragon',{heads:0}).some((p)=>p.id.startsWith('head:')), 'Beheaded monster does not regrow a default head')
  assert.equal(buildAssetParts('dragon',{variant:'heads',heads:7}).filter((p)=>p.id.endsWith(':body:head')).length,7)
  const corpse=compileWorldNodeGeometry({objects:[{id:'dead-multidragon',asset:'dragon',position:[0,0,0],attributes:{heads:7,dead:true}}]})
  assert.ok(corpse.bounds.max[1]<3.5,'Fallen multiple heads fan along the ground rather than stacking vertically')
  const milk=compileWorldNodeGeometry({objects:[{id:'milk',asset:'milk',position:[0,0,0],attributes:{variant:'wall-trickle'}}]})
  assert.ok(milk.bounds.max[0]-milk.bounds.min[0]<.3&&milk.bounds.max[2]-milk.bounds.min[2]<.3,'Wall milk is a small trickle, not a lake')
  assert.equal(buildAssetParts('hand').filter((p)=>p.id.startsWith('fingertip:')).length,4)
  assert.ok(buildAssetParts('hand').some((p)=>p.id==='thumb-tip'))
  assert.notDeepEqual(buildAssetParts('hand',{bent:true}),buildAssetParts('hand',{bent:false}),'Cursed and healed visible hand geometry must differ')
  assert.ok(buildAssetParts('cup',{drink:'coffee'}).some((p)=>p.id==='drink-surface'))
  assert.notDeepEqual(buildAssetParts('water'),buildAssetParts('water',{frozen:true}))
  assert.ok(buildAssetParts('well',{depth:20,dry:true}).find((p)=>p.id==='shaft-lining').size[1]===20)
  let fills=0;const darkCanvas={width:400,height:200,getContext:()=>({setTransform(){},fillRect(){fills++}})}
  const eyesClosed={...scene,environment:{eyesClosed:true}}
  assert.deepEqual(drawWorldNodeScene(darkCanvas,eyesClosed,{width:400,height:200}),[])
  assert.equal(renderWorldNodePanorama(darkCanvas,eyesClosed,{width:400,height:200}).eyesClosed,true)
  assert.equal(fills,2,'Closed eyes expose no visible geometry in either projection')
  const polygon=(depth)=>[{x:0,y:0,depth},{x:20,y:0,depth},{x:10,y:20,depth}]
  const hit=hitTestWorldNodeScene([{objectId:'far',polygon:polygon(8)},{objectId:'near',polygon:polygon(3)}],10,5)
  assert.equal(hit.objectId,'near','Picking selects the nearest physical surface')
  return {assets:WORLD_SCENE_3D_ASSET_IDS.length,projection:'perspective + full spherical cube sampling',camera:'fixed canonical eye',picking:'nearest reciprocal-depth surface'}
}
