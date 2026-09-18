// The camera is bound to a canonical story position. Mesh dimensions and light
// are illustrative; source identity stays on every face for reciprocal audit.
import { buildAssetParts } from '../game/worldScene3dAssets.js'
const TAU = Math.PI * 2
const clamp = (n, a, b) => Math.max(a, Math.min(b, n))
const add = (a, b) => a.map((v, i) => v + b[i])
const sub = (a, b) => a.map((v, i) => v - b[i])
const mul = (a, n) => a.map((v) => v * n)
const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0)
const cross = (a, b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]]
const norm = (a) => mul(a, 1 / (Math.hypot(...a) || 1))
const finite3 = (a) => Array.isArray(a) && a.length === 3 && a.every(Number.isFinite)
const compileCache = new WeakMap()
const surfaceCache = new WeakMap()
const primitiveCache = new Map()
const panoramaMappings = new Map()
const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
function rotate(p, [x = 0, y = 0, z = 0] = []) {
  let q = [p[0], p[1]*Math.cos(x)-p[2]*Math.sin(x), p[1]*Math.sin(x)+p[2]*Math.cos(x)]
  q = [q[0]*Math.cos(y)+q[2]*Math.sin(y), q[1], -q[0]*Math.sin(y)+q[2]*Math.cos(y)]
  return [q[0]*Math.cos(z)-q[1]*Math.sin(z), q[0]*Math.sin(z)+q[1]*Math.cos(z), q[2]]
}
export function nodeSceneCamera(scene, { viewMode = 'first-person', direction = 0 } = {}) {
  if (!finite3(scene?.camera?.eye) || !finite3(scene?.camera?.target)) return null
  const eye = [...scene.camera.eye], delta = sub(scene.camera.target, eye)
  const baseYaw = Math.atan2(delta[0], -delta[2]), pitch = Math.atan2(delta[1], Math.hypot(delta[0], delta[2]))
  const camera = { eye, anchor: [...eye], target: [...scene.camera.target], baseYaw, yaw: baseYaw + direction * Math.PI / 2,
    pitch, fov: scene.camera.fov || 70, near: .04, far: 3000, viewMode, distance: 18 }
  if (viewMode === 'orbit') { camera.pitch = -.28; return updateOrbit(camera) }
  return camera
}
export const defaultWorldNodeCamera = nodeSceneCamera
function updateOrbit(camera) {
  const forward = [Math.sin(camera.yaw)*Math.cos(camera.pitch), Math.sin(camera.pitch), -Math.cos(camera.yaw)*Math.cos(camera.pitch)]
  return { ...camera, eye: sub(camera.target, mul(forward, camera.distance || 18)) }
}
export function turnWorldNodeCamera(camera, dx = 0, dy = 0) {
  if (!camera) return null
  const next = { ...camera, yaw: camera.yaw + dx * .006, pitch: clamp(camera.pitch - dy * .006, -Math.PI/2 + .001, Math.PI/2 - .001) }
  return camera.viewMode === 'orbit' ? updateOrbit(next) : next
}
export const lookWorldNodeCamera = turnWorldNodeCamera
export function lookWorldNodeDirection(camera, direction = 0) {
  if (!camera) return null
  const next = { ...camera, yaw: camera.baseYaw + direction * Math.PI / 2, pitch: 0 }
  return camera.viewMode === 'orbit' ? updateOrbit(next) : next
}
export function orbitWorldNodeCamera(camera, dx = 0, dy = 0) {
  if (!camera) return null
  return turnWorldNodeCamera({ ...camera, viewMode: 'orbit' }, dx, dy)
}
function basis(camera) {
  const forward = camera.forward || [Math.sin(camera.yaw)*Math.cos(camera.pitch), Math.sin(camera.pitch), -Math.cos(camera.yaw)*Math.cos(camera.pitch)]
  const right = norm(cross(forward, camera.up || [0, 1, 0])), up = norm(cross(right, forward))
  return { forward, right, up }
}
export function projectWorldNodePoint(point, camera, width, height) {
  if (!camera) return null
  const { forward, right, up } = basis(camera), delta = sub(point, camera.eye), depth = dot(delta, forward)
  if (depth < (camera.near || .04) || depth > (camera.far || 3000)) return null
  const f = height / (2*Math.tan((camera.fov || 70)*Math.PI/360))
  return { x: width/2 + dot(delta, right)*f/depth, y: height/2 - dot(delta, up)*f/depth, depth }
}
function primitiveFaces(kind, innerRatio = .72) {
  const key = `${kind}:${innerRatio}`
  if (primitiveCache.has(key)) return primitiveCache.get(key)
  const faces = [], n = 10
  if (kind === 'box') {
    const v = [[-.5,-.5,-.5],[.5,-.5,-.5],[.5,.5,-.5],[-.5,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[.5,.5,.5],[-.5,.5,.5]]
    for (const f of [[0,3,2,1],[4,5,6,7],[0,4,7,3],[1,2,6,5],[3,7,6,2],[0,1,5,4]]) faces.push(f.map((i) => v[i]))
  } else if (kind === 'wedge') {
    const v = [[-.5,-.5,-.5],[.5,-.5,-.5],[0,.5,-.5],[-.5,-.5,.5],[.5,-.5,.5],[0,.5,.5]]
    for (const f of [[0,2,1],[3,4,5],[0,3,5,2],[2,5,4,1],[0,1,4,3]]) faces.push(f.map((i) => v[i]))
  } else if (kind === 'sphere') {
    const vertex = (i,j) => { const lat=-Math.PI/2+j*Math.PI/6, lng=i*TAU/n; return [.5*Math.cos(lat)*Math.cos(lng), .5*Math.sin(lat), .5*Math.cos(lat)*Math.sin(lng)] }
    for (let j=0;j<6;j++) for(let i=0;i<n;i++) faces.push([vertex(i,j),vertex(i,j+1),vertex(i+1,j+1),vertex(i+1,j)])
  } else if (['cylinder','cone','tube'].includes(kind)) {
    const v = (i,y,r=.5) => [Math.cos(i*TAU/n)*r,y,Math.sin(i*TAU/n)*r]
    for (let i=0;i<n;i++) {
      faces.push(kind === 'cone' ? [v(i,-.5),[0,.5,0],v(i+1,-.5)] : [v(i,-.5),v(i,.5),v(i+1,.5),v(i+1,-.5)])
      if (kind === 'tube') {
        const r = innerRatio*.5
        faces.push([v(i,-.5,r),v(i+1,-.5,r),v(i+1,.5,r),v(i,.5,r)], [v(i,.5),v(i,.5,r),v(i+1,.5,r),v(i+1,.5)], [v(i,-.5),v(i+1,-.5),v(i+1,-.5,r),v(i,-.5,r)])
      } else {
        faces.push([[0,-.5,0],v(i,-.5),v(i+1,-.5)])
        if(kind !== 'cone') faces.push([[0,.5,0],v(i+1,.5),v(i,.5)])
      }
    }
  } else if (kind === 'torus') {
    const v=(i,j) => { const a=i*TAU/12,b=j*TAU/6,r=.4+.1*Math.cos(b); return [r*Math.cos(a),.5*Math.sin(b),r*Math.sin(a)] }
    for(let i=0;i<12;i++) for(let j=0;j<6;j++) faces.push([v(i,j),v(i,j+1),v(i+1,j+1),v(i+1,j)])
  } else throw new Error(`Unsupported world 3D primitive: ${kind}`)
  primitiveCache.set(key, faces)
  return faces
}
export function compileWorldNodeGeometry(scene) {
  if (compileCache.has(scene)) return compileCache.get(scene)
  const faces = [], bounds = { min:[Infinity,Infinity,Infinity],max:[-Infinity,-Infinity,-Infinity] }
  for (const object of scene.objects || []) {
    if (!finite3(object.position)) throw new Error(`${object.id}: missing physical position`)
    const scale = Array.isArray(object.scale) ? object.scale : [object.scale || 1,object.scale || 1,object.scale || 1]
    if (!scale.every((n)=>Number.isFinite(n)&&n>0)) throw new Error(`${object.id}: invalid model scale`)
    for (const part of buildAssetParts(object.asset, object.attributes || {})) {
      for (const local of primitiveFaces(part.primitive,part.innerRatio)) {
        const vertices = local.map((v) => {
          const p = add(rotate(v.map((n,i)=>n*part.size[i]), part.rotation),part.position)
          return add(rotate(p.map((n,i)=>n*scale[i]),[0,object.rotationY || 0,0]),object.position)
        })
        const normal = norm(cross(sub(vertices[1],vertices[0]),sub(vertices[2],vertices[0])))
        if (Math.hypot(...normal)<.1) continue
        for (const v of vertices) for(let axis=0;axis<3;axis++) { bounds.min[axis]=Math.min(bounds.min[axis],v[axis]); bounds.max[axis]=Math.max(bounds.max[axis],v[axis]) }
        faces.push({ vertices, normal, color:rgb(part.color), objectId:object.id, elementId:object.id, partId:part.id, claimIds:object.claimIds || [], descriptionIds:object.descriptionIds || [], label:object.label || object.asset })
      }
    }
  }
  const result = {faces,bounds,objects:scene.objects?.length || 0}
  compileCache.set(scene,result)
  return result
}
function dimensions(canvas, options) {
  const rect = canvas.getBoundingClientRect?.()
  const width = Math.max(1,Math.round(options.width || rect?.width || canvas.width || 960))
  const height = Math.max(1,Math.round(options.height || rect?.height || canvas.height || 540))
  const ratio = options.pixelRatio || Math.min(globalThis.devicePixelRatio || 1,2)
  if(canvas.width !== Math.round(width*ratio)) canvas.width=Math.round(width*ratio)
  if(canvas.height !== Math.round(height*ratio)) canvas.height=Math.round(height*ratio)
  return {width,height,ratio}
}
function scratch(width,height) {
  const canvas = typeof OffscreenCanvas !== 'undefined' ? new OffscreenCanvas(width,height) : globalThis.document?.createElement('canvas')
  if (!canvas) return null
  canvas.width=width;canvas.height=height
  return canvas
}
function shader(gl,type,source) {
  const value=gl.createShader(type);gl.shaderSource(value,source);gl.compileShader(value)
  if(!gl.getShaderParameter(value,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(value))
  return value
}
function gpuSurface(canvas) {
  if(surfaceCache.has(canvas)) return surfaceCache.get(canvas)
  const gpu=scratch(1,1),gl=gpu?.getContext('webgl',{alpha:false,antialias:true,preserveDrawingBuffer:true})
  if(!gl) { surfaceCache.set(canvas,null);return null }
  const program=gl.createProgram()
  gl.attachShader(program,shader(gl,gl.VERTEX_SHADER,`attribute vec3 position; attribute vec3 color; uniform vec3 eye,right,up,forward; uniform vec4 lens; varying vec3 pigment; varying float depth; void main(){ vec3 p=position-eye; depth=dot(p,forward); gl_Position=vec4(dot(p,right)*lens.x/lens.y,dot(p,up)*lens.x,lens.z*depth+lens.w,depth); pigment=color; }`))
  gl.attachShader(program,shader(gl,gl.FRAGMENT_SHADER,`precision mediump float; varying vec3 pigment; varying float depth; uniform vec3 fog; uniform float fogDensity; void main(){ float amount=clamp(1.0-exp(-depth*fogDensity),0.0,0.75); gl_FragColor=vec4(mix(pigment,fog,amount),1.0); }`))
  gl.linkProgram(program)
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
  const result={canvas:gpu,gl,program,buffer:gl.createBuffer(), uniforms:Object.fromEntries(['eye','right','up','forward','lens','fog','fogDensity'].map((n)=>[n,gl.getUniformLocation(program,n)])), position:gl.getAttribLocation(program,'position'),color:gl.getAttribLocation(program,'color')}
  surfaceCache.set(canvas,result);return result
}
function lighting(scene) {
  const env=scene.environment || {}, phase=env.light || env.phase || env.time || env.timeOfDay, night=['night','natë','midnight','dark'].includes(phase), dark=env.setting==='indoor', rain=['rain','rainy','storm','stormy'].includes(env.weather)
  return { sky:rgb(env.underwater?'#527e82':env.unlocated?'#a5aaa5':night?'#202a3c':dark?'#64655d':rain?'#96a7ae':['dawn','golden-dawn','dusk'].includes(phase)?'#c5b798':env.skyColor==='red'?'#c7a38f':'#adcad3'), ground:rgb(env.unlocated?'#777e76':env.underwater?'#6e8276':env.season==='winter'?'#bdc7bc':dark?'#847a64':'#87967a'), strength:night?.46:dark?.76:1, fog:env.underwater?.08:env.weather==='fog'?.035:rain?.009:.0025, light:norm([-.6,1,-.8]) }
}
function selected(face, options) { return face.objectId === options.selectedElementId || face.claimIds.includes(options.selectedDescriptionId || options.selectedClaimId) || face.descriptionIds.includes(options.selectedDescriptionId) }
function faceColor(face,light,options) {
  const bright=(.62+.38*Math.abs(dot(face.normal,light.light)))*light.strength
  const base=face.color.map((n)=>n*bright)
  return selected(face,options) ? base.map((n,i)=>n*.38+[.95,.72,.28][i]*.62) : base
}
function allFaces(scene,geometry, camera) {
  const eye=scene.camera?.eye || camera.eye,r=1400,level=Number.isFinite(scene.environment?.groundHeight)?scene.environment.groundHeight:-.045
  const holes=(scene.objects || []).filter((o)=>['well','pit','moat'].includes(o.asset)).map((o)=>{const scale=Array.isArray(o.scale)?o.scale:[o.scale||1,o.scale||1,o.scale||1],radius=(o.asset==='well'?(o.attributes?.width || 2.5)*.42:o.asset==='pit'?1.5:7);return {x:o.position[0],z:o.position[2],rx:radius*scale[0],rz:radius*scale[2]}})
  const xs=[eye[0]-r,eye[0]+r,...holes.flatMap((h)=>[h.x-h.rx,h.x+h.rx])].sort((a,b)=>a-b),zs=[eye[2]-r,eye[2]+r,...holes.flatMap((h)=>[h.z-h.rz,h.z+h.rz])].sort((a,b)=>a-b),ground=[]
  for(let x=0;x<xs.length-1;x++)for(let z=0;z<zs.length-1;z++) {
    const midX=(xs[x]+xs[x+1])/2,midZ=(zs[z]+zs[z+1])/2
    if(holes.some((h)=>Math.abs(midX-h.x)<h.rx&&Math.abs(midZ-h.z)<h.rz))continue
    ground.push({vertices:[[xs[x],level,zs[z]],[xs[x],level,zs[z+1]],[xs[x+1],level,zs[z+1]],[xs[x+1],level,zs[z]]],normal:[0,1,0],color:lighting(scene).ground,claimIds:[],descriptionIds:[],stage:true})
  }
  const weather=scene.environment?.weather, weatherFaces=[]
  if (['rain','storm','snow'].includes(weather) && scene.environment?.setting!=='indoor' && !scene.environment?.underwater) {
    const claimIds=(scene.states || []).filter((s)=>s.key==='environment'&&s.property==='weather').map((s)=>s.claimId).filter(Boolean)
    for(let i=0;i<110;i++) {
      const random=(seed)=>{const n=Math.sin((i+seed)*127.1)*43758.5453;return n-Math.floor(n)},x=eye[0]+(random(1)-.5)*24,z=eye[2]+(random(7)-.5)*24,y=eye[1]-1+random(13)*8, snow=weather==='snow',w=snow?.025:.007,h=snow?.035:.17
      weatherFaces.push({vertices:[[x-w,y-h,z],[x+w,y+h,z],[x+w,y-h,z+.008]],normal:[0,1,0],color:rgb(snow?'#e5e9df':'#a8bec5'),objectId:'environment:weather',partId:`precipitation:${i}`,claimIds,descriptionIds:claimIds})
    }
  }
  return [...ground,...geometry.faces,...weatherFaces]
}
function drawGPU(surface, scene, geometry, camera, width, height, options, readback=false) {
  const {gl,program,uniforms:u}=surface, light=lighting(scene),{forward,right,up}=basis(camera)
  if(surface.canvas.width!==width) surface.canvas.width=width
  if(surface.canvas.height!==height) surface.canvas.height=height
  gl.viewport(0,0,width,height);gl.clearColor(...light.sky,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)
  gl.enable(gl.DEPTH_TEST);gl.depthFunc(gl.LEQUAL);gl.disable(gl.CULL_FACE);gl.useProgram(program)
  gl.uniform3fv(u.eye,camera.eye);gl.uniform3fv(u.right,right);gl.uniform3fv(u.up,up);gl.uniform3fv(u.forward,forward)
  const near=camera.near || .04,far=camera.far || 3000
  gl.uniform4f(u.lens,1/Math.tan((camera.fov || 70)*Math.PI/360),width/height,(far+near)/(far-near),-2*far*near/(far-near))
  gl.uniform3fv(u.fog,light.sky);gl.uniform1f(u.fogDensity,light.fog)
  const key=[geometry,options.selectedElementId,options.selectedDescriptionId,options.selectedClaimId,JSON.stringify(scene.environment)]
  if(!surface.meshKey || !key.every((v,i)=>v===surface.meshKey[i])) {
    const data=[]
    for(const face of allFaces(scene,geometry,camera)) {
      const color=face.stage?face.color:faceColor(face,light,options)
      for(let i=1;i<face.vertices.length-1;i++) for(const v of [face.vertices[0],face.vertices[i],face.vertices[i+1]]) data.push(...v,...color)
    }
    gl.bindBuffer(gl.ARRAY_BUFFER,surface.buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW)
    surface.vertices=data.length/6;surface.meshKey=key
  } else gl.bindBuffer(gl.ARRAY_BUFFER,surface.buffer)
  gl.enableVertexAttribArray(surface.position);gl.vertexAttribPointer(surface.position,3,gl.FLOAT,false,24,0)
  gl.enableVertexAttribArray(surface.color);gl.vertexAttribPointer(surface.color,3,gl.FLOAT,false,24,12)
  gl.drawArrays(gl.TRIANGLES,0,surface.vertices)
  if(readback) {const pixels=new Uint8Array(width*height*4);gl.readPixels(0,0,width,height,gl.RGBA,gl.UNSIGNED_BYTE,pixels);return pixels}
  return surface.canvas
}
function clipFace(vertices,camera) {
  const {forward}=basis(camera), near=camera.near || .04,result=[]
  for(let i=0;i<vertices.length;i++) {
    const a=vertices[i],b=vertices[(i+1)%vertices.length],da=dot(sub(a,camera.eye),forward)-near,db=dot(sub(b,camera.eye),forward)-near
    if(da>=0) result.push(a)
    if((da>=0)!==(db>=0)) result.push(add(a,mul(sub(b,a),da/(da-db))))
  }
  return result
}
function projectedFaces(geometry,camera,width,height) {
  const result=[]
  for(const face of geometry.faces) {
    const polygon=clipFace(face.vertices,camera).map((v)=>projectWorldNodePoint(v,{...camera,near:(camera.near || .04)*.999},width,height)).filter(Boolean)
    if(polygon.length<3 || polygon.every((p)=>p.x<0) || polygon.every((p)=>p.x>width) || polygon.every((p)=>p.y<0) || polygon.every((p)=>p.y>height)) continue
    result.push({...face,polygon,depth:polygon.reduce((s,p)=>s+p.depth,0)/polygon.length})
  }
  return result
}
function drawFallback(ctx,scene,geometry,camera,width,height,options) {
  const light=lighting(scene), sky=light.sky.map((n)=>Math.round(n*255)), gradient=ctx.createLinearGradient(0,0,0,height)
  gradient.addColorStop(0,`rgb(${sky.join(',')})`);gradient.addColorStop(1,'#d9dac8');ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height)
  const faces=projectedFaces({faces:allFaces(scene,geometry,camera)},camera,width,height).sort((a,b)=>b.depth-a.depth)
  for(const face of faces) {const color=(face.stage?face.color:faceColor(face,light,options)).map((n)=>Math.round(clamp(n,0,1)*255));ctx.beginPath();face.polygon.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();ctx.fillStyle=`rgb(${color.join(',')})`;ctx.fill()}
}
function unknown(ctx,width,height,scene) {
  ctx.fillStyle='#202c31';ctx.fillRect(0,0,width,height);ctx.textAlign='center';ctx.fillStyle='#e1ded1';ctx.font='600 18px system-ui';ctx.fillText('Uncharted destination',width/2,height/2-15)
  ctx.font='13px system-ui';ctx.fillStyle='#aebbb8';ctx.fillText('The story supplies no physical location for this view.',width/2,height/2+15)
  ctx.fillText(scene?.nodeId || '',width/2,height/2+39)
}
export function drawWorldNodeScene(canvas,scene,options={}) {
  const {width,height,ratio}=dimensions(canvas,options),ctx=canvas.getContext('2d'),camera=options.camera || nodeSceneCamera(scene)
  ctx.setTransform(ratio,0,0,ratio,0,0)
  if(!camera) {unknown(ctx,width,height,scene);return []}
  if(scene.environment?.eyesClosed) {ctx.fillStyle='#111512';ctx.fillRect(0,0,width,height);return []}
  const geometry=compileWorldNodeGeometry(scene),surface=gpuSurface(canvas)
  if(surface) ctx.drawImage(drawGPU(surface,scene,geometry,camera,canvas.width,canvas.height,options),0,0,width,height)
  else drawFallback(ctx,scene,geometry,camera,width,height,options)
  const hits=projectedFaces(geometry,camera,width,height)
  if(options.labels) {
    const labeled=new Set();ctx.font='12px system-ui';ctx.textAlign='center'
    for(const object of scene.objects || []) {if(labeled.has(object.id))continue;labeled.add(object.id);const p=projectWorldNodePoint(add(object.position,[0,2,0]),camera,width,height);if(!p || p.x<0 || p.x>width || p.y<0 || p.y>height)continue;ctx.fillStyle='#24352ddd';ctx.fillRect(p.x-ctx.measureText(object.label || object.asset).width/2-6,p.y-16,ctx.measureText(object.label || object.asset).width+12,20);ctx.fillStyle='#f3eddb';ctx.fillText(object.label || object.asset,p.x,p.y-2)}
  }
  return hits
}
function triangleDepth(p,a,b,c) {
  const denom=(b.y-c.y)*(a.x-c.x)+(c.x-b.x)*(a.y-c.y)
  if(Math.abs(denom)<1e-9)return null
  const u=((b.y-c.y)*(p.x-c.x)+(c.x-b.x)*(p.y-c.y))/denom,v=((c.y-a.y)*(p.x-c.x)+(a.x-c.x)*(p.y-c.y))/denom,w=1-u-v
  return u>=0&&v>=0&&w>=0 ? 1/(u/a.depth+v/b.depth+w/c.depth) : null
}
export function hitTestWorldNodeScene(hits,x,y) {
  let nearest=null,depth=Infinity
  for(const hit of hits || []) {const points=hit.polygon || [];for(let i=1;i<points.length-1;i++){const at=triangleDepth({x,y},points[0],points[i],points[i+1]);if(at!=null&&at<depth){nearest=hit;depth=at}}}
  return nearest ? {...nearest,depth,x,y} : null
}
export const WORLD_NODE_CUBE_FACES = Object.freeze([
  {forward:[1,0,0],up:[0,1,0]}, {forward:[-1,0,0],up:[0,1,0]},
  {forward:[0,1,0],up:[0,0,1]}, {forward:[0,-1,0],up:[0,0,-1]},
  {forward:[0,0,1],up:[0,1,0]}, {forward:[0,0,-1],up:[0,1,0]},
])
export function panoramaWorldDirection(x,y,width,height,yaw=0) {
  const longitude=(x/width-.5)*TAU+yaw,latitude=(.5-y/height)*Math.PI
  return [Math.sin(longitude)*Math.cos(latitude),Math.sin(latitude),-Math.cos(longitude)*Math.cos(latitude)]
}
export function cubeSampleForDirection(direction,size) {
  let face=0,value=-Infinity
  for(let i=0;i<WORLD_NODE_CUBE_FACES.length;i++){const next=dot(direction,WORLD_NODE_CUBE_FACES[i].forward);if(next>value){value=next;face=i}}
  const {right,up}=basis(WORLD_NODE_CUBE_FACES[face]),u=dot(direction,right)/value,v=dot(direction,up)/value
  return {face,x:clamp(Math.floor((u+1)*.5*size),0,size-1),y:clamp(Math.floor((1-v)*.5*size),0,size-1)}
}
export function renderWorldNodePanorama(canvas,scene,options={}) {
  const {width,height}=dimensions(canvas,{...options,width:options.width || 1024,height:options.height || 512,pixelRatio:1}),ctx=canvas.getContext('2d'),camera=options.camera || nodeSceneCamera(scene)
  ctx.setTransform(1,0,0,1,0,0)
  if(!camera){unknown(ctx,width,height,scene);return {projection:'equirectangular',charted:false,width,height}}
  if(scene.environment?.eyesClosed){ctx.fillStyle='#111512';ctx.fillRect(0,0,width,height);return {projection:'equirectangular',charted:!scene.environment.unlocated,width,height,eye:[...scene.camera.eye],horizontalDegrees:360,verticalDegrees:180,eyesClosed:true}}
  const geometry=compileWorldNodeGeometry(scene),surface=gpuSurface(canvas),size=Math.max(64,Math.ceil(width/4)),faces=[]
  // Panorama always uses the canonical eye, including when the UI was orbiting.
  const eye=[...scene.camera.eye]
  for(const face of WORLD_NODE_CUBE_FACES) {
    const view={...camera,...face,eye,fov:90}
    if(surface) faces.push({pixels:drawGPU(surface,scene,geometry,view,size,size,options,true),bottomUp:true})
    else {const faceCanvas=scratch(size,size),faceCtx=faceCanvas.getContext('2d');drawFallback(faceCtx,scene,geometry,view,size,size,options);faces.push({pixels:faceCtx.getImageData(0,0,size,size).data,bottomUp:false})}
  }
  const image=ctx.createImageData(width,height),yaw=camera.baseYaw ?? Math.atan2(scene.camera.target[0]-eye[0],-(scene.camera.target[2]-eye[2]))
  const mapKey=`${width}:${height}:${size}:${yaw}`
  let mapping=panoramaMappings.get(mapKey)
  if(!mapping) {
    mapping=new Uint32Array(width*height)
    const lng=Array.from({length:width},(_,x)=>{const a=((x+.5)/width-.5)*TAU+yaw;return [Math.sin(a),-Math.cos(a)]})
    for(let y=0;y<height;y++) {
      const latitude=(.5-(y+.5)/height)*Math.PI,cy=Math.cos(latitude),dy=Math.sin(latitude)
      for(let x=0;x<width;x++) {const at=cubeSampleForDirection([lng[x][0]*cy,dy,lng[x][1]*cy],size);mapping[y*width+x]=at.face*size*size+at.y*size+at.x}
    }
    if(panoramaMappings.size>=12)panoramaMappings.delete(panoramaMappings.keys().next().value)
    panoramaMappings.set(mapKey,mapping)
  }
  const faceArea=size*size
  for(let pixel=0;pixel<mapping.length;pixel++) {
    const encoded=mapping[pixel],faceId=Math.floor(encoded/faceArea),at=encoded%faceArea,face=faces[faceId],source=(face.bottomUp?(size-1-Math.floor(at/size))*size+at%size:at)*4,dest=pixel*4
    image.data[dest]=face.pixels[source];image.data[dest+1]=face.pixels[source+1];image.data[dest+2]=face.pixels[source+2];image.data[dest+3]=255
  }
  ctx.putImageData(image,0,0)
  return {projection:'equirectangular',charted:!scene.environment?.unlocated,width,height,eye,yaw,horizontalDegrees:360,verticalDegrees:180,cubeFaces:6,objects:geometry.objects,faces:geometry.faces.length}
}
