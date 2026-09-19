import assert from 'node:assert/strict'
import { WORLD_SCENE_3D_ASSET_IDS, buildAssetParts, worldScene3dAssetBounds, worldScene3dAssetAttributeReview } from '../../src/game/worldScene3dAssets.js'
import { compileWorldNodeGeometry, nodeSceneCamera, turnWorldNodeCamera, lookWorldNodeDirection, projectWorldNodePoint, panoramaWorldDirection, cubeSampleForDirection, hitTestWorldNodeScene, drawWorldNodeScene, renderWorldNodePanorama, worldNodeEnvironmentVisuals, clipWorldNodeFace, rasterizeWorldNodeScene, WORLD_NODE_CUBE_FACES } from '../../src/components/worldScene3dNodeRenderer.js'
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
  const black={...scene,environment:{light:'black'}}
  assert.deepEqual(drawWorldNodeScene(darkCanvas,black,{width:400,height:200}),[])
  assert.equal(renderWorldNodePanorama(darkCanvas,black,{width:400,height:200}).blackout,true,'Authored blackness does not show daylight geometry')
  const daylight=worldNodeEnvironmentVisuals({environment:{}})
  for(const phase of ['night','dark','dim','cold-dawn']) {
    const light=worldNodeEnvironmentVisuals({environment:{light:phase}})
    assert.ok(light.strength<daylight.strength,phase)
    assert.ok(light.ground.every((v,i)=>v<daylight.ground[i]),`${phase} must darken the ground as well as the sky`)
  }
  for(const phase of ['flash','bright'])assert.ok(worldNodeEnvironmentVisuals({environment:{light:phase}}).strength>daylight.strength)
  const authoredColors=worldNodeEnvironmentVisuals({environment:{skyColor:'#eeeeec',groundColor:'#e6dfce'}})
  assert.deepEqual(authoredColors.sky,[238/255,238/255,236/255])
  assert.deepEqual(authoredColors.ground,[230/255,223/255,206/255])
  assert.equal(worldNodeEnvironmentVisuals({environment:{weather:'hail'}}).precipitation,'hail')
  assert.notDeepEqual(worldNodeEnvironmentVisuals({environment:{weather:'cloud'}}).sky,daylight.sky)
  assert.deepEqual(worldNodeEnvironmentVisuals({environment:{unlocated:true,light:'night'}}).sky,worldNodeEnvironmentVisuals({environment:{light:'night'}}).sky,'Unknown coordinates do not erase authored darkness')
  const originScene={camera:{eye:[0,1.7,0],target:[0,1.7,-10]},environment:{},objects:[]},originCamera=nodeSceneCamera(originScene)
  const moatScene={...originScene,environment:{groundHeight:0},objects:[{id:'moat',asset:'moat',position:[0,0,0],attributes:{}}]}
  const island=rasterizeWorldNodeScene(moatScene,{eye:[0,10,0],forward:[0,-1,0],up:[0,0,-1],fov:90},64,64).data.slice((32*64+32)*4,(32*64+32)*4+3)
  assert.ok(island[1]>island[0]&&island[1]>island[2],'The moat retains solid green island footing instead of exposing sky through a rectangular ground cutout')
  const crossing=clipWorldNodeFace([[-2,0,-2],[2,0,-2],[2,0,-20],[-2,0,-20]],{...originCamera,near:3,far:12},64,64)
  assert.ok(crossing.length>=3,'A polygon crossing near and far planes retains its visible middle')
  assert.ok(crossing.every((p)=>-p[2]>=3-1e-8&&-p[2]<=12+1e-8))
  const visibleRock={...originScene,objects:[{id:'red-rock',asset:'rock',position:[0,0,-4],attributes:{color:'#ff0000'}}]}
  const pixels=rasterizeWorldNodeScene(visibleRock,originCamera,64,64).data,rockPixel=pixels.slice((45*64+32)*4,(45*64+32)*4+4)
  assert.ok(rockPixel[0]>150&&rockPixel[1]<10,'CPU depth buffer preserves a nearby prop in front of the huge ground plane')
  const farRock={id:'far-blue',asset:'rock',position:[0,0,-7],attributes:{color:'#0000ff'}}
  assert.deepEqual(rasterizeWorldNodeScene({...visibleRock,objects:[farRock,...visibleRock.objects]},originCamera,64,64).data,rasterizeWorldNodeScene({...visibleRock,objects:[...visibleRock.objects,farRock]},originCamera,64,64).data,'Opaque surfaces use depth, not object insertion order')
  const captured={labels:[],images:[]},ctx={setTransform(){},createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData(image){captured.images.push(image)},measureText:()=>({width:10}),fillRect(){},fillText(text){captured.labels.push(text)}}
  const testCanvas={width:64,height:64,getContext:()=>ctx}
  const buried={...originScene,objects:[{id:'buried',label:'Hidden',asset:'rock',position:[0,-4,-8]}]}
  const buriedHits=drawWorldNodeScene(testCanvas,buried,{width:64,height:64,labels:true})
  const buriedPosition=projectWorldNodePoint([0,-3.3,-8],originCamera,64,64)
  assert.equal(hitTestWorldNodeScene(buriedHits,buriedPosition.x,buriedPosition.y),null,'Opaque ground occludes picking beneath it')
  assert.deepEqual(captured.labels,[],'Opaque ground also hides labels for buried geometry')
  const hail={...originScene,environment:{weather:'hail'},states:[{key:'environment',property:'weather',claimId:'source:hail'}]}
  assert.ok(drawWorldNodeScene(testCanvas,hail,{width:64,height:64}).some((h)=>h.partId?.startsWith('hail:')&&h.claimIds.includes('source:hail')),'Hail produces source-linked visible particles')
  // The same world ray has the same atmosphere on either side of a cube edge.
  const fogScene={...originScene,environment:{weather:'fog'},objects:[{id:'enclosure',asset:'cave',position:[0,0,0],attributes:{interior:true}}]}
  const front=rasterizeWorldNodeScene(fogScene,{...originCamera,...WORLD_NODE_CUBE_FACES[5],fov:90},65,65).data
  const right=rasterizeWorldNodeScene(fogScene,{...originCamera,...WORLD_NODE_CUBE_FACES[0],fov:90},65,65).data
  const edgeFront=front.slice((32*65+64)*4,(32*65+64)*4+3),edgeRight=right.slice((32*65)*4,(32*65)*4+3)
  assert.ok(edgeFront.every((v,i)=>Math.abs(v-edgeRight[i])<=3),'Cube-adjacent rays retain consistent distance fog and surface color')
  const previousOffscreen=globalThis.OffscreenCanvas,blits=[]
  try {
    globalThis.OffscreenCanvas=class {constructor(width,height){this.width=width;this.height=height}getContext(kind){return kind==='2d'?{createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData:(image)=>{this.image=image}}:null}}
    const hidpi={width:64,height:64,getContext:()=>({setTransform(){},drawImage:(source,...destination)=>blits.push({source,destination})})}
    const hidpiHits=drawWorldNodeScene(hidpi,visibleRock,{width:64,height:64,pixelRatio:2})
    assert.equal(hidpi.width,128)
    assert.equal(blits[0].source.image.data.length,128*128*4,'CPU fallback renders at backing-pixel resolution')
    assert.deepEqual(blits[0].destination,[0,0,64,64],'High-DPI fallback is scaled exactly once into CSS coordinates')
    assert.equal(hitTestWorldNodeScene(hidpiHits,32,45)?.objectId,'red-rock','High-DPI picking retains CSS coordinates')
  } finally {if(previousOffscreen===undefined)delete globalThis.OffscreenCanvas;else globalThis.OffscreenCanvas=previousOffscreen}
  // Exercise the actual GPU upload path. Kilometre-wide ground triangles must
  // not straddle the eye: WebGL clip precision otherwise covers nearby floors,
  // shallow water and roads even though the software depth buffer is correct.
  const uploads=[],gpu=Object.fromEntries(['shaderSource','compileShader','attachShader','linkProgram','viewport','clearColor','clear','enable','disable','depthFunc','useProgram','uniform3fv','uniform4f','uniform1f','bindBuffer','enableVertexAttribArray','vertexAttribPointer','drawArrays'].map((name)=>[name,()=>{}]))
  Object.assign(gpu,{createShader:()=>({}),createProgram:()=>({}),createBuffer:()=>({}),getShaderParameter:()=>true,getProgramParameter:()=>true,getUniformLocation:(_program,name)=>name,getAttribLocation:(_program,name)=>name==='position'?0:1,bufferData:(_target,data)=>uploads.push(data)})
  try {
    globalThis.OffscreenCanvas=class {constructor(width,height){this.width=width;this.height=height}getContext(kind){return kind==='webgl'?gpu:null}}
    const gpuCanvas={width:64,height:64,getContext:()=>({setTransform(){},drawImage(){}})}
    const groundScene={...originScene,camera:{eye:[576,1.7,388],target:[576,1.7,378]},environment:{groundHeight:0}},groundCamera=nodeSceneCamera(groundScene)
    drawWorldNodeScene(gpuCanvas,groundScene,{width:64,height:64,camera:groundCamera})
    assert.equal(uploads.length,1)
    assert.ok(uploads[0].length>0)
    for(let i=0;i<uploads[0].length;i+=6)assert.ok(groundCamera.eye[2]-uploads[0][i+2]>=groundCamera.near-.0001,'Uploaded ground must be clipped before the GPU sees a behind-eye vertex')
    drawWorldNodeScene(gpuCanvas,groundScene,{width:64,height:64,camera:lookWorldNodeDirection(groundCamera,1)})
    assert.equal(uploads.length,2,'Each changed cube direction needs its own correctly clipped ground')
    for(let i=0;i<uploads[1].length;i+=6)assert.ok(uploads[1][i]-groundCamera.eye[0]>=groundCamera.near-.0001)
    const shipScene={...originScene,camera:{eye:[0,4.45,0],target:[0,4.45,-10]},objects:[{id:'boarding-ship',asset:'ship',position:[0,0,3.5],scale:[1,1,1],rotationY:0,attributes:{}}]}
    const shipCamera=nodeSceneCamera(shipScene)
    drawWorldNodeScene(gpuCanvas,shipScene,{width:64,height:64,camera:shipCamera})
    assert.ok(uploads[2].length>0)
    for(let i=0;i<uploads[2].length;i+=6)assert.ok(-uploads[2][i+2]>=shipCamera.near-.0001,'Ship hull and deck must also be clipped; behind-eye physical vertices produced a false waist-high stripe over an on-deck actor')
  } finally {if(previousOffscreen===undefined)delete globalThis.OffscreenCanvas;else globalThis.OffscreenCanvas=previousOffscreen}
  const polygon=(depth)=>[{x:0,y:0,depth},{x:20,y:0,depth},{x:10,y:20,depth}]
  const hit=hitTestWorldNodeScene([{objectId:'far',polygon:polygon(8)},{objectId:'near',polygon:polygon(3)}],10,5)
  assert.equal(hit.objectId,'near','Picking selects the nearest physical surface')
  return {assets:WORLD_SCENE_3D_ASSET_IDS.length,projection:'perspective + full spherical cube sampling',camera:'fixed canonical eye',picking:'nearest reciprocal-depth surface'}
}
