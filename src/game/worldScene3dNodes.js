// Per-node physical comparison consumes the same places and exact source lines
// as the atlas. Authored branch previews never manufacture a gameplay state.
import { STORY, ITEMS, lineOf } from './content.js'
import { NODE_POS, PLACE_OF } from '../components/nodePositions.js'
import { PLACE_META } from '../components/placeMeta.js'
import { NODE_REGION } from './regions.js'
import { currentStoryState, environmentSnapshot, storyScenePresentationForState, hasCond } from './gameState.js'
import { worldLocationForState } from './worldLocation.js'
import { isUnchartedStoryNode } from './departureContexts.js'
import { buildWorldScene3d, worldScene3dLineConditions } from './worldScene3d.js'
import { WORLD_NODE_VIEWPOINTS, WORLD_NODE_FEATURE_STAGING } from './data/worldScene3dViewpoints.js'
import { WORLD_NODE_PLACE_FIXTURES } from './data/worldScene3dPlaceFixtures.js'
import { WORLD_SCENE_3D_NODE_CLAIMS } from './data/worldScene3dNodeClaims.js'
import { WORLD_SCENE_3D_ASSETS, buildAssetParts } from './worldScene3dAssets.js'
import { albanianTextOf } from './language.js'

export const WORLD_NODE_RENDER_VERSION = 1
export const WORLD_NODE_EYE_HEIGHT = 1.7
export const WORLD_NODE_DISPOSITIONS = Object.freeze(['physical', 'mixed', 'environment', 'nonvisual', 'reported', 'historical', 'offstage', 'abstract', 'absence'])
export const WORLD_NODE_ZONES = Object.freeze(['front', 'back', 'left', 'right', 'near', 'far', 'above', 'below', 'inside', 'around', 'center'])
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)
const finite3 = (v) => Array.isArray(v) && v.length === 3 && v.every(Number.isFinite)
const unconditioned = (c) => !(c.all?.length || c.none?.length || c.observationId || c.negate)
const conditionsVisible = (c, has) => (c.negate ? !(c.all || []).every(has) : (c.all || []).every(has)) && !(c.none || []).some(has) && (!c.observationId || has(`observed:${c.observationId}`))
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
    const offset=WORLD_NODE_FEATURE_STAGING.find((row)=>row.key===object.key)?.offset||[0,0,0]
    return [landmark.position[0]+offset[0],offset[1],landmark.position[2]+offset[2]]
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
  const offset = [...(object.offset || zones[object.zone || 'front'])]
  // A zone describes relative location, not a fixed distance suitable for both
  // a cup and a mountain. Set back unmeasured large models by their footprint.
  if(!object.offset && !['center','inside','above','below'].includes(object.zone)) {
    const bounds=boundsOf({asset:object.asset,attributes:object.attributes||{},position:[0,0,0],scale:scalar(object.scale),rotationY:0})
    const extents=[Math.max(Math.abs(bounds[0][0]),Math.abs(bounds[0][1])),Math.max(Math.abs(bounds[2][0]),Math.abs(bounds[2][1]))]
    const radius=Math.hypot(...extents)
    const distance=Math.hypot(offset[0],offset[2]),clearance=radius+2
    if(distance>0&&distance<clearance){offset[0]*=clearance/distance;offset[2]*=clearance/distance}
  }
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
function boundsOf(object, frame = null) {
  const bounds = [[Infinity, -Infinity], [Infinity, -Infinity], [Infinity, -Infinity]]
  for (const part of buildAssetParts(object.asset, object.attributes)) {
    for (const x of [-.5,.5]) for (const y of [-.5,.5]) for (const z of [-.5,.5]) {
      const corner = rotate([x*part.size[0],y*part.size[1],z*part.size[2]],part.rotation || [0,0,0])
      const local = corner.map((value,axis)=>(value+part.position[axis])*object.scale[axis])
      let world = rotate(local,[0,object.rotationY,0]).map((value,axis)=>value+object.position[axis])
      if(frame)world=rotate(world.map((n,i)=>n-frame.position[i]),[0,-frame.rotationY,0]).map((n,i)=>n/frame.scale[i])
      for (let axis=0;axis<3;axis++) { bounds[axis][0]=Math.min(bounds[axis][0],world[axis]); bounds[axis][1]=Math.max(bounds[axis][1],world[axis]) }
    }
  }
  return bounds
}

// Mesh-space attachment points follow the actual asset, including age/pose/scale.
function meshPoint(object, point) {
  return rotate(point.map((n,i)=>n*object.scale[i]),[0,object.rotationY,0]).map((n,i)=>n+object.position[i])
}
function partPoint(object, names, edge = 'center') {
  const part=buildAssetParts(object.asset,object.attributes).find((entry)=>names.some((name)=>typeof name==='string'?entry.id===name:name.test(entry.id)))
  if (!part) return null
  const local=[...part.position]
  if(edge==='top') { const v=rotate([0,part.size[1]/2,0],part.rotation||[0,0,0]); for(let i=0;i<3;i++)local[i]+=v[i] }
  return meshPoint(object,local)
}
const PEOPLE = new Set(['human','person','man','woman','child','giant','spirit','fairy'])
const BUILDINGS = new Set(['house','hut','palace','interior','room','tower','mill','church','mosque','fortress','castle'])
function moveBottomTo(object, point) {
  const b=boundsOf(object)
  object.position=[point[0],object.position[1]+point[1]-b[1][0],point[2]]
}
export function applyWorldNodeRelations(objects, relations, forward, eye, {viewer={}} = {}) {
  const byKey = new Map()
  for (const object of objects) byKey.set(object.key, [...(byKey.get(object.key) || []), object])
  const right = [-forward[1], forward[0]], notices=[]
  const positioned=new Set(['inside','on','above','over','under','below','beside','near','left','right','left-of','right-of','behind','in-front-of','outside','at-entrance','between','around','on-horns','head-inside','part-of','emitted-by','through'])
  // Containers are placed before occupants, occupants before their carried props.
  // Source order must not leave a held cup behind after its holder moves indoors.
  const depth=(key,seen=new Set())=>{if(key==='viewer'||seen.has(key))return 0;const next=new Set([...seen,key]),dependencies=relations.filter((r)=>r.subject===key&&positioned.has(r.kind)).flatMap((r)=>[r.target,...(r.secondTarget?[r.secondTarget]:[])]).filter((target)=>target!=='viewer');return dependencies.length?1+Math.max(...dependencies.map((target)=>depth(target,next))):0}
  const rank=(r)=>r.subject==='viewer'&&r.kind==='inside'?-10:r.subject==='viewer'&&r.kind==='on'&&byKey.get(r.target)?.[0]?.asset==='ship'?-9:r.subject==='viewer'&&r.kind==='on'?10:r.kind==='between'?30:r.kind==='inside'&&byKey.get(r.subject)?.[0]?.asset==='water'&&['bucket','moat'].includes(byKey.get(r.target)?.[0]?.asset)?25:r.target==='viewer'&&['around','on'].includes(r.kind)?10:['holds','emitted-by'].includes(r.kind)?20:depth(r.subject)
  const ordered=[...relations].sort((a,b)=>rank(a)-rank(b)),groupSlots=new Map()
  for (const relation of ordered) {
    const subjects=byKey.get(relation.subject)||[null],targets=byKey.get(relation.target)||[],target0=targets[0]
    if(relation.subject==='viewer'&&target0&&relation.kind==='inside'&&!['well','pit'].includes(target0.asset)) {
      target0.position=[eye[0],eye[1]-WORLD_NODE_EYE_HEIGHT,eye[2]]
      if(target0.asset==='moat') {
        const channel=buildAssetParts(target0.asset,{...target0.attributes,sourceWater:false}).find((p)=>p.id==='water-channel'),radius=channel.size[0]*(1+channel.innerRatio)/4*target0.scale[0]
        target0.position[0]-=Math.cos(target0.rotationY)*radius;target0.position[2]+=Math.sin(target0.rotationY)*radius
      }
      if(BUILDINGS.has(target0.asset)) target0.attributes={...target0.attributes,cutaway:true,interior:true}
      notices.push({...relation,geometryStatus:'modeled',subjectId:'viewer',targetId:target0.id});continue
    }
    if(relation.subject==='viewer'&&target0&&relation.kind==='outside'&&BUILDINGS.has(target0.asset)) {
      target0.attributes={...target0.attributes,interior:false,cutaway:false}
      const d=target0.attributes.depth||7,entrance=rotate([0,0,-d/2-2],[0,target0.rotationY,0])
      if(target0.placement.authority!=='registered-landmark')target0.position=[eye[0]-entrance[0],eye[1]-WORLD_NODE_EYE_HEIGHT,eye[2]-entrance[2]]
      notices.push({...relation,geometryStatus:'modeled',subjectId:'viewer',targetId:target0.id});continue
    }
    if(relation.subject==='viewer'&&target0&&relation.kind==='on'&&target0.asset==='ship') {
      const deck=partPoint(target0,['ship-deck'],'top'),standing=meshPoint(target0,[0,0,-3.5])
      target0.position[0]+=eye[0]-standing[0];target0.position[2]+=eye[2]-standing[2];eye[1]=deck[1]+WORLD_NODE_EYE_HEIGHT
      notices.push({...relation,geometryStatus:'modeled',subjectId:'viewer',targetId:target0.id});continue
    }
    if(relation.subject==='viewer'&&target0&&relation.kind==='on'&&['horse','donkey','deer','bull'].includes(target0.asset)) {
      const saddle=partPoint(target0,['body'],'top')
      if(saddle){target0.position[0]+=eye[0]-saddle[0];target0.position[2]+=eye[2]-saddle[2];eye[1]=saddle[1]+.95}
      notices.push({...relation,geometryStatus:'modeled',subjectId:'viewer',targetId:target0.id});continue
    }
    for(let instance=0;instance<subjects.length;instance++) {
      const subject=subjects[instance],target=targets[instance%Math.max(1,targets.length)]
      const notice=(status='modeled',detail)=>notices.push({...relation,geometryStatus:status,subjectId:subject?.id||relation.subject,targetId:target?.id||relation.target,...(detail?{detail}:{})})
      if(relation.kind==='holds'&&target&&(subject||relation.subject==='viewer')) {
        const held=unique(relations.filter((r)=>r.subject===relation.subject&&r.kind==='holds').map((r)=>r.target)),hand=held.indexOf(relation.target)%2?-1:1
        const attachment=subject?partPoint(subject,[`hand:${hand}`]):[eye[0]+right[0]*.45*hand+forward[0]*.7,eye[1]-.55,eye[2]+right[1]*.45*hand+forward[1]*.7]
        if(attachment) {moveBottomTo(target,attachment);notice();continue}
      }
      if(subject&&relation.target==='viewer'&&['below','above','behind','near','on','around'].includes(relation.kind)) {
        const b=boundsOf(subject)
        if(relation.kind==='around') {
          const containment=relations.find((r)=>r.subject===subject.key&&r.kind==='inside'),room=byKey.get(containment?.target)?.[0],floor=room&&buildAssetParts(room.asset,room.attributes).find((p)=>['floor','tower-floor','cavern-floor','court'].includes(p.id))
          const radius=floor?Math.min(floor.size[0]*room.scale[0],floor.size[2]*room.scale[2])/2-Math.max(b[0][1]-b[0][0],b[2][1]-b[2][0])/2-.4:Math.max(2,subjects.length*.85/(2*Math.PI))
          const angle=instance/subjects.length*Math.PI*2
          subject.position[0]=eye[0]+Math.cos(angle)*radius;subject.position[2]=eye[2]+Math.sin(angle)*radius
        }
        if(relation.kind==='on') {
          const col=instance%3,row=Math.floor(instance/3),x=(col-1)*.28,z=.45+row*.35
          moveBottomTo(subject,[eye[0]+right[0]*x+forward[0]*z,eye[1]-(viewer.height||WORLD_NODE_EYE_HEIGHT)+.28,eye[2]+right[1]*x+forward[1]*z])
        }
        if(relation.kind==='below')subject.position[1]+=eye[1]-WORLD_NODE_EYE_HEIGHT-(partPoint(subject,['woven-bowl-floor'],'top')?.[1]??b[1][1])
        if(relation.kind==='above') {
          if(viewer.form==='tortoise'&&BUILDINGS.has(subject.asset)) {
            const factor=1/Math.max(b[0][1]-b[0][0],b[2][1]-b[2][0]);subject.scale=subject.scale.map((n)=>n*factor)
            subject.position=[eye[0]-forward[0]*.65,.12,eye[2]-forward[1]*.65]
            subject.attributes={...subject.attributes,interior:false,cutaway:false}
          }else {subject.position[0]=eye[0];subject.position[2]=eye[2];subject.position[1]+=eye[1]+.15-b[1][0]}
        }
        if(relation.kind==='behind') {subject.position[0]=eye[0]-forward[0]*4;subject.position[2]=eye[2]-forward[1]*4}
        notice();continue
      }
      if(!subject||!target){notice(relation.subject==='viewer'?'viewer-action':'reference-only');continue}
      if(target.asset==='cave'&&relation.kind==='at-entrance') {
        const local=boundsOf({...subject,position:[0,0,0],rotationY:0}),entrance=target.attributes.interior?[-7+(target.attributes.depth||32)/2-1.5,1]:[-2,-1]
        subject.position=meshPoint(target,[0,0,entrance[0]+(target.attributes.interior?0:-(local[2][1]-local[2][0])/2-.4)]);subject.rotationY=target.rotationY
        if(subject.attributes.blocksEntrance)subject.scale=[6,6,2]
        notice('modeled','At the cavern entrance behind the observer.');continue
      }
      if(BUILDINGS.has(target.asset)&&['at-entrance','outside'].includes(relation.kind)) {
        const d=target.attributes.depth||(['interior','room'].includes(target.asset)?12:target.asset==='tower'?(target.attributes.interior?14:4):7)
        const related=unique(relations.filter((r)=>r.target===target.key&&['outside','at-entrance'].includes(r.kind)).map((r)=>r.subject)).flatMap((key)=>byKey.get(key)||[]),slot=related.findIndex((o)=>o.id===subject.id)
        const widths=related.map((o)=>boundsOf(o,target)),stepX=Math.max(.9,...widths.map((b)=>b[0][1]-b[0][0]+.35)),stepZ=Math.max(1.2,...widths.map((b)=>b[2][1]-b[2][0]+.5)),columns=Math.min(related.length,Math.max(1,Math.floor((target.attributes.width||8)/stepX)))
        const footprint=boundsOf({...subject,position:[0,0,0],rotationY:0}),rearExtent=Math.max(0,footprint[2][1])/target.scale[2]
        const x=((slot%columns)-(columns-1)/2)*stepX,z=-d/2-(relation.kind==='outside'?2:.3)-rearExtent-Math.floor(slot/columns)*stepZ
        const entrance=meshPoint(target,[x,0,z])
        if(Math.hypot(entrance[0]-eye[0],entrance[2]-eye[2])<.6){const aside=rotate([.9,0,0],[0,target.rotationY,0]);entrance[0]+=aside[0];entrance[2]+=aside[2]}
        moveBottomTo(subject,entrance);subject.rotationY=target.rotationY;notice();continue
      }
      if(target.asset==='wall'&&(subject.attributes.pose==='embedded'||relation.kind==='emitted-by')) {
        const normal=[Math.sin(target.rotationY),Math.cos(target.rotationY)],side=(eye[0]-target.position[0])*normal[0]+(eye[2]-target.position[2])*normal[1]>=0?1:-1,nx=normal[0]*side,nz=normal[1]*side
        subject.position=[target.position[0]+nx*.38,target.position[1],target.position[2]+nz*.38];subject.rotationY=Math.atan2(-nx,-nz);notice();continue
      }
      if(subject.placement.authority==='registered-landmark'){notice('registered-topology','Shared registered landmark refinement takes precedence over local relative staging.');continue}
      const sb=boundsOf(subject),tb=boundsOf(target),center=tb.map(([a,b])=>(a+b)/2)
      if(target.asset==='bridge'&&['beside','near','left','right','left-of','right-of'].includes(relation.kind)) {
        const length=target.attributes.length||12,axis=[Math.sin(target.rotationY),Math.cos(target.rotationY)],side=(eye[0]-center[0])*axis[0]+(eye[2]-center[2])*axis[1]<0?-1:1
        center[0]+=axis[0]*side*(length/2+1);center[2]+=axis[1]*side*(length/2+1)
      }
      if(subject.key==='eagle-road'){subject.position[1]=0;notice();continue}
      if(subject.key==='eagle-nest'&&target.key==='eagle-tree'){notice();continue}
      if(relation.kind==='inside') {
        if(subject.asset==='water'&&['bucket','moat'].includes(target.asset)) {
          const container=buildAssetParts(target.asset,{...target.attributes,sourceWater:false}).find((p)=>p.id===(target.asset==='bucket'?'bucket':'water-channel'))
          const bucket=target.asset==='bucket',ratio=bucket?container.innerRatio*.98:1
          subject.attributes={...subject.attributes,variant:bucket?'contained-surface':'moat-channel',width:container.size[0]*ratio,length:container.size[2]*ratio,...(!bucket?{innerRatio:container.innerRatio}:{})}
          subject.scale=[...target.scale];subject.rotationY=target.rotationY
          subject.position=meshPoint(target,[container.position[0],bucket?container.position[1]+container.size[1]/2-.025:container.position[1],container.position[2]])
          if(!bucket)target.attributes={...target.attributes,sourceWater:true}
          notice('modeled','Liquid surface fits the actual container aperture; no extra river or duplicate liquid is instantiated.');continue
        }
        const floorPart=buildAssetParts(target.asset,target.attributes).find((p)=>['floor','tower-floor','cavern-floor','court'].includes(p.id))
        if(floorPart) {
          const localBounds=boundsOf(subject,target),localOrigin=rotate(subject.position.map((n,i)=>n-target.position[i]),[0,-target.rotationY,0]).map((n,i)=>n/target.scale[i])
          if(subjects.length>1) {
            if(!groupSlots.has(relation)) {
              const inset=floorPart.id==='court'?3.6:.6,width=floorPart.size[0]*(target.asset==='tower'?Math.SQRT1_2:1)-inset,depth=floorPart.size[2]*(target.asset==='tower'?Math.SQRT1_2:1)-inset
              const groupBounds=subjects.map((o)=>boundsOf(o,target)),maxX=Math.max(...groupBounds.map((b)=>b[0][1]-b[0][0])),maxZ=Math.max(...groupBounds.map((b)=>b[2][1]-b[2][0])),stepX=Math.max(.8,maxX+.3),stepZ=Math.max(1.2,maxZ+.35)
              const cols=Math.max(1,Math.floor(width/stepX)),rows=Math.max(1,Math.floor(depth/stepZ)),slots=[]
              const eyeLocal=rotate(eye.map((n,i)=>n-target.position[i]),[0,-target.rotationY,0]).map((n,i)=>n/target.scale[i])
              for(let row=0;row<rows;row++)for(let col=0;col<cols;col++) {
                const x=floorPart.position[0]+(col-(cols-1)/2)*stepX,z=floorPart.position[2]+(row-(rows-1)/2)*stepZ
                if(Math.abs(x-eyeLocal[0])<maxX/2+.45&&Math.abs(z-eyeLocal[2])<maxZ/2+.45)continue
                slots.push([x,z])
              }
              slots.sort((a,b)=>(a[0]-localOrigin[0])**2+(a[1]-localOrigin[2])**2-((b[0]-localOrigin[0])**2+(b[1]-localOrigin[2])**2))
              groupSlots.set(relation,slots)
            }
            const slot=groupSlots.get(relation)[instance]
            if(!slot)throw new Error(`${relation.subject}: ${subjects.length} occupants do not fit the source-defined ${relation.target} floor`)
            const before=[localOrigin[0],localOrigin[2]];localOrigin[0]=slot[0];localOrigin[2]=slot[1]
            for(const [i,axis] of [0,2].entries())localBounds[axis]=localBounds[axis].map((n)=>n+localOrigin[axis]-before[i])
          }
          for(const axis of [0,2]) {
            const radius=floorPart.size[axis]/2*(target.asset==='tower'?Math.SQRT1_2:1),low=floorPart.position[axis]-radius+(floorPart.id==='court'?1.8:.22),high=floorPart.position[axis]+radius-(floorPart.id==='court'?1.8:.22)
            const minOrigin=localOrigin[axis]+low-localBounds[axis][0],maxOrigin=localOrigin[axis]+high-localBounds[axis][1]
            localOrigin[axis]=minOrigin<=maxOrigin?Math.max(minOrigin,Math.min(maxOrigin,localOrigin[axis])):floorPart.position[axis]
          }
          subject.position=meshPoint(target,localOrigin)
        } else {
          subject.position[0]=center[0];subject.position[2]=center[2]
        }
        const floor=subject.attributes.variant==='contained-surface'&&target.asset==='cauldron' ? (partPoint(target,['open-rim','rim'],'top')?.[1]??tb[1][1])-.02 : partPoint(target,['floor','tower-floor','cavern-floor','court'],'top')?.[1]??target.position[1]
        subject.position[1]+=floor-boundsOf(subject)[1][0]
      } else if(relation.kind==='on-horns') {
        const horn=partPoint(target,[`horn:${instance%2?-1:1}`],'top')
        if(horn)moveBottomTo(subject,horn);else {notice('unsupported-attachment','Target has no modeled horn attachment.');continue}
      } else if(relation.kind==='on'&&target.asset==='ship') {
        const deck=partPoint(target,['ship-deck'],'top'),point=meshPoint(target,[1.25+instance*.8,0,-2.8]);moveBottomTo(subject,[point[0],deck[1],point[2]])
      } else if(relation.kind==='on'&&PEOPLE.has(subject.asset)&&['horse','deer','donkey','bull'].includes(target.asset)) {
        subject.attributes={...subject.attributes,pose:'riding'};subject.rotationY=target.rotationY
        const riders=unique(relations.filter((r)=>r.kind==='on'&&r.target===relation.target).map((r)=>r.subject)),slot=riders.indexOf(relation.subject)
        const saddle=partPoint(target,['body'],'top'),hip=partPoint({...subject,position:[0,0,0],rotationY:0},['belt'])
        const spacing=(slot-(riders.length-1)/2)*.52,shift=rotate([0,0,spacing],[0,target.rotationY,0])
        subject.position=[saddle[0]+shift[0],saddle[1]-(hip?.[1]||.75)+.07,saddle[2]+shift[2]]
      } else if(relation.kind==='head-inside') {
        const head=partPoint(subject,['muzzle','head']),rim=partPoint(target,['rim','lip'],'top')||[center[0],tb[1][1],center[2]]
        if(head){
          subject.position[0]+=rim[0]-head[0];subject.position[2]+=rim[2]-head[2]
          // The lowered head intersects the liquid below the vessel lip; adjust
          // the vessel (not the grounded animal's feet) if its model is smaller.
          const rimY=partPoint(target,['open-rim','rim'],'top')?.[1]??tb[1][1]
          if(head[1]>=rimY) target.scale[1]*=(head[1]-target.position[1]+.1)/(rimY-target.position[1])
        }
      } else if(relation.kind==='between'&&relation.secondTarget&&byKey.has(relation.secondTarget)) {
        const other=byKey.get(relation.secondTarget)[0];subject.position[0]=(target.position[0]+other.position[0])/2;subject.position[2]=(target.position[2]+other.position[2])/2
      } else if(relation.kind==='around') {
        if(['rope','vine','chain'].includes(subject.asset)) {subject.position=[center[0],center[1],center[2]];subject.attributes={...subject.attributes,wrapped:true,wrapWidth:tb[0][1]-tb[0][0]+.15,wrapDepth:tb[2][1]-tb[2][0]+.15}}
        else {const angle=instance/subjects.length*Math.PI*2,radius=Math.max(tb[0][1]-tb[0][0],tb[2][1]-tb[2][0])/2+2;subject.position[0]=center[0]+Math.sin(angle)*radius;subject.position[2]=center[2]+Math.cos(angle)*radius}
      } else if(relation.kind==='emitted-by') {
        const mouth=partPoint(target,['muzzle',/^head:0:.*muzzle$/])
        if(mouth){subject.position=mouth;subject.rotationY=target.rotationY;if(subject.asset==='fire')subject.attributes={...subject.attributes,variant:'breath'}}
        else {
          const dx=eye[0]-center[0],dz=eye[2]-center[2],length=Math.hypot(dx,dz)||1,nx=dx/length,nz=dz/length
          subject.position=[center[0]+nx*((tb[0][1]-tb[0][0])/2+.035),target.position[1],center[2]+nz*((tb[2][1]-tb[2][0])/2+.035)]
          subject.rotationY=Math.atan2(-nx,-nz)
        }
      } else if(relation.kind==='part-of'&&BUILDINGS.has(subject.asset)&&BUILDINGS.has(target.asset)) {
        const floor=buildAssetParts(target.asset,target.attributes).find((p)=>p.id==='floor')
        if(floor&&!(subject.attributes.windowOpening&&target.attributes.windowOpening)&&!relations.some((r)=>r.subject==='viewer'&&r.kind==='inside'&&r.target===subject.key)) {
          const b=boundsOf(subject,target),local=rotate(subject.position.map((n,i)=>n-target.position[i]),[0,-target.rotationY,0]).map((n,i)=>n/target.scale[i]),viewerLocal=rotate(eye.map((n,i)=>n-target.position[i]),[0,-target.rotationY,0]).map((n,i)=>n/target.scale[i])
          const half=[(b[0][1]-b[0][0])/2,0,(b[2][1]-b[2][0])/2]
          for(const axis of [0,2])local[axis]=Math.max(-floor.size[axis]/2+half[axis]+.25,Math.min(floor.size[axis]/2-half[axis]-.25,local[axis]))
          if([0,2].every((axis)=>Math.abs(local[axis]-viewerLocal[axis])<half[axis]+.2)) {
            const choices=[0,2].flatMap((axis)=>[-1,1].map((sign)=>({axis,value:sign*(floor.size[axis]/2-half[axis]-.25)}))).filter(({axis,value})=>Math.abs(value-viewerLocal[axis])>half[axis]+.1)
            choices.sort((a,b)=>Math.abs(a.value-local[a.axis])-Math.abs(b.value-local[b.axis]))
            if(choices[0])local[choices[0].axis]=choices[0].value
          }
          local[1]=floor.position[1]+floor.size[1]/2;subject.position=meshPoint(target,local)
        }
        notice('modeled','A source-bound room assembly fits its containing floor; an unentered side room leaves the observer outside.');continue
      } else if(relation.kind==='part-of'&&subject.asset==='window'&&target.attributes.windowOpening) {
        notice('modeled','The visible window frame is aligned with the modeled wall aperture.');continue
      } else if(relation.kind==='part-of'&&subject.asset==='wall'&&BUILDINGS.has(target.asset)) {
        const partId=subject.attributes.componentPartId,part=buildAssetParts(target.asset,{...target.attributes,sourceWallParts:[]}).find((p)=>p.id===partId)
        if(!part)throw new Error(`${subject.key}: missing exact shell component ${partId}`)
        subject.position=meshPoint(target,[part.position[0],part.position[1]-part.size[1]/2,part.position[2]]);subject.scale=[...target.scale];subject.rotationY=target.rotationY
        subject.attributes={...subject.attributes,length:part.size[0],height:part.size[1],depth:part.size[2],color:subject.attributes.color||part.color}
        target.attributes={...target.attributes,sourceWallParts:unique([...(target.attributes.sourceWallParts||[]),partId])}
      } else if(relation.kind==='part-of'&&subject.asset==='door'&&BUILDINGS.has(target.asset)) {
        subject.position=meshPoint(target,[0,0,-(target.attributes.depth||7)/2]);subject.rotationY=target.rotationY;subject.scale=[...target.scale];target.attributes={...target.attributes,sourceDoor:true}
      } else if(relation.kind==='part-of'&&target.asset==='mosquito') {
        subject.scale=[.04,.04,.08];subject.position=partPoint(target,['head'])||[...target.position]
      } else if(relation.kind==='part-of'&&target.asset==='bridge') {
        moveBottomTo(subject,meshPoint(target,[(target.attributes.width||3)*.3,(target.attributes.height||.12)+.09,(target.attributes.length||12)*.2]))
      } else if(['on','above','over'].includes(relation.kind)&&['fire','hearth'].includes(target.asset)&&['cauldron','pot','bread','meat','food','dough','fish'].includes(subject.asset)) {
        const cooking=unique(relations.filter((r)=>['on','above','over'].includes(r.kind)&&r.target===target.key).map((r)=>r.subject)),slot=cooking.indexOf(subject.key),parts=buildAssetParts(target.asset,target.attributes).filter((p)=>p.id.startsWith('hearth-stone:'))
        const support=partPoint(target,['ember-bed'],'top')?.[1]??Math.max(...parts.map((p)=>meshPoint(target,[p.position[0],p.position[1]+p.size[1]/2,p.position[2]])[1])),side=(slot-(cooking.length-1)/2)*.6
        moveBottomTo(subject,[target.position[0]+right[0]*side,support+.005,target.position[2]+right[1]*side])
      } else if(['on','above','over','part-of'].includes(relation.kind)) {
        subject.position[0]=center[0];subject.position[2]=center[2];subject.position[1]+=tb[1][1]-sb[1][0]+(['on','part-of'].includes(relation.kind)?0:.35)
        if(['above','over'].includes(relation.kind)&&eye[0]>=tb[0][0]&&eye[0]<=tb[0][1]&&eye[2]>=tb[2][0]&&eye[2]<=tb[2][1])subject.position[1]+=Math.max(0,eye[1]+.5-boundsOf(subject)[1][0])
      } else if(['under','below'].includes(relation.kind)) {
        subject.position[0]=center[0];subject.position[2]=center[2];subject.position[1]+=tb[1][0]-sb[1][1]-.35
      } else if(['beside','near','left','right','left-of','right-of','outside'].includes(relation.kind)) {
        const width=target.asset==='bridge'?target.attributes.width||3:Math.abs(right[0])*(tb[0][1]-tb[0][0])+Math.abs(right[1])*(tb[2][1]-tb[2][0]),subjectWidth=Math.abs(right[0])*(sb[0][1]-sb[0][0])+Math.abs(right[1])*(sb[2][1]-sb[2][0]),distance=(width+subjectWidth)/2+.6+instance*(subjectWidth+.2),sign=['left','left-of'].includes(relation.kind)?-1:1
        subject.position[0]=center[0]+right[0]*distance*sign;subject.position[2]=center[2]+right[1]*distance*sign
      } else if(['behind','in-front-of'].includes(relation.kind)) {
        const targetDepth=Math.abs(forward[0])*(tb[0][1]-tb[0][0])+Math.abs(forward[1])*(tb[2][1]-tb[2][0]),subjectDepth=Math.abs(forward[0])*(sb[0][1]-sb[0][0])+Math.abs(forward[1])*(sb[2][1]-sb[2][0]),subjectWidth=Math.abs(right[0])*(sb[0][1]-sb[0][0])+Math.abs(right[1])*(sb[2][1]-sb[2][0])
        const columns=Math.ceil(Math.sqrt(subjects.length)),row=Math.floor(instance/columns),side=(instance%columns-(columns-1)/2)*(subjectWidth+.4),distance=(targetDepth+subjectDepth)/2+1+row*(subjectDepth+.6),sign=relation.kind==='behind'?1:-1
        subject.position[0]=center[0]+forward[0]*distance*sign+right[0]*side;subject.position[2]=center[2]+forward[1]*distance*sign+right[1]*side
      } else if(relation.kind==='through'){subject.position[0]=center[0];subject.position[2]=center[2]}
      if(subjects.length>1&&['on','above','below'].includes(relation.kind)) {const spread=(instance-(subjects.length-1)/2)*Math.max(.8,sb[0][1]-sb[0][0]+.12);subject.position[0]+=right[0]*spread;subject.position[2]+=right[1]*spread}
      notice(positioned.has(relation.kind)?'modeled':'action-or-topology')
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
  const candidates = new Map(), inheritedClaimIds = new Set()
  const sourceVisible = (source) => live ? conditionsVisible(source.conditions, (key)=>hasCond(currentStoryState(state),key)) : previewVisible(source.conditions,branch?.conditions)
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
        if(activeIds.has(id)) return true
        if(source?.nodeId !== placeId) return false
        if(unconditioned(source.conditions))return true
        // Exhaustive positive/negative definitions establish a fixture's existence
        // without borrowing the result of an arbitrary future branch.
        const complement=object.claimIds.some((otherId)=>{const other=index.sourcesById.get(otherId);return other?.nodeId===placeId && other.conditions.negate!==source.conditions.negate && same(other.conditions.all,source.conditions.all) && same(other.conditions.none,source.conditions.none) && !source.conditions.observationId && !other.conditions.observationId})
        return complement && sourceVisible(source)
      })
      for (const id of established) {
        const definition = index.claims.get(id)?.objects.find((entry) => entry.key === object.key)
        if (definition) { addObject(definition, [id], true); inheritedClaimIds.add(id) }
      }
    }
  }
  if(placeId&&!narrativeDomain)for(const fixture of WORLD_NODE_PLACE_FIXTURES.filter((row)=>row.placeId===placeId)) {
    const definitions=fixture.sourceIds.map((id)=>({id,row:index.claims.get(id),source:index.sourcesById.get(id)}))
    const base=definitions[0],first=base?.row?.objects.find((object)=>object.key===fixture.key)
    if(!first)continue
    if(!candidates.has(fixture.key)){addObject(first,[base.id],true);inheritedClaimIds.add(base.id)}
    for(const {id,row,source} of definitions)if(sourceVisible(source)) {
      addObject(row.objects.find((object)=>object.key===fixture.key),[id],true);inheritedClaimIds.add(id)
    }
  }
  for (const row of activeClaims) for (const object of row.objects || []) addObject(object, [row.id])
  const inheritedStates=[...inheritedClaimIds].filter((id)=>!activeIds.has(id)&&sourceVisible(index.sourcesById.get(id))).flatMap((id)=>(index.claims.get(id)?.states||[]).filter((entry)=>candidates.get(entry.key)?.persistence==='place'||entry.key==='environment'&&['groundColor','groundDry'].includes(entry.property)).map((entry)=>({...entry,claimId:id})))
  const stateClaims = [...inheritedStates,...activeClaims.flatMap((row) => (row.states || []).map((entry) => ({ ...entry, claimId: row.id })))]
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
      if(object.key==='maro-palace') { origin[0]=eye[0];origin[1]=0;origin[2]=eye[2]-11;rotationY=Math.PI;object.attributes={...object.attributes,width:12,depth:16,height:9,windowOpening:{width:4,bottom:4.4,height:3.2}} }
      if(object.key==='maro-window-room') {origin[0]=eye[0];origin[1]=4;origin[2]=eye[2]-11;rotationY=Math.PI;object.attributes={...object.attributes,width:10,depth:12,height:4,interior:true,windowOpening:{width:4,bottom:.4,height:3.2}}}
      if(object.asset==='window') {origin[0]=eye[0];origin[1]=6;origin[2]=eye[2]-2.98;object.scale=[4/1.4,3.2/1.5,1];object.attributes={...object.attributes,viewThrough:true};rotationY=Math.PI}
      if(object.asset==='human') {
        const positions={'maro-son':[-.65,-7],'actor:lena':[.7,-7],'actor:maro-stepmother':[-1.2,-8],'actor:maro-prince':[1.2,-8],'maro-prince-men':[0,-10]}
        const [x,z]=positions[object.key]||[0,-8];origin[0]=eye[0]+x;origin[1]=4.2;origin[2]=eye[2]+z
      }
    }
    if (object.asset === 'well' && viewpoint?.kind.startsWith('well-')) { origin[0] = eye[0]; origin[2] = eye[2]; object.attributes = {...object.attributes, depth: 20, width: 8} }
    const level=viewpoint?.objectLevels?.find((entry)=>entry.key===object.key)
    if(level&&level.level!=='companion') {
      origin[0]=eye[0];origin[2]=eye[2]
      if(level.level==='sky')origin[1]=10
      if(level.level==='approach')origin[1]=eye[1]+1.5
      if(level.level==='support') {
        const body=buildAssetParts(object.asset,object.attributes).find((part)=>part.id==='body')
        origin[1]=eye[1]-WORLD_NODE_EYE_HEIGHT-(body.position[1]+body.size[1]/2)*scalar(object.scale)[1]
      }
    }
    if (object.key === 'eagle-tree' && ['shqipe1','shqipe2'].includes(placeId)) { origin[0] = NODE_POS.shqipe1[0] - 5; origin[2] = NODE_POS.shqipe1[1] - 5; origin[1] = 0; object.attributes.height = 10; object.attributes.supportBranch = [5,7.45,-4] }
    if (object.key === 'eagle-nest' && ['shqipe1','shqipe2'].includes(placeId)) { origin[0] = NODE_POS.shqipe1[0]; origin[2] = NODE_POS.shqipe1[1] - 9; origin[1] = 7.45; object.scale = 5 }
    if (['nest-snake','eagle-chick'].includes(object.key) && ['shqipe1','shqipe2'].includes(placeId)) { origin[0] = NODE_POS.shqipe1[0] + (object.key === 'nest-snake' ? -.6 : .6); origin[2] = NODE_POS.shqipe1[1] - 10; origin[1] = 8.02 }
    if (nodeId === 'pemaDielli' && object.asset === 'tree') { origin[0] = eye[0] - 5; origin[2] = eye[2] + 4; origin[1] = 0; object.attributes.supportBranch = [5,8,-4] }
    if (object.asset === 'cave' && object.attributes.interior === true && object.attributes.encloseViewer !== false) {
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
        placement: { zone: object.zone || 'front', ...(landmark?.position?{anchorPosition:[...landmark.position]}:{}), ...(WORLD_NODE_FEATURE_STAGING.find((row)=>row.key===object.key)?{refinement:clone(WORLD_NODE_FEATURE_STAGING.find((row)=>row.key===object.key))}:{}), authority: localOnly ? 'unlocated-local-staging' : index.elements.has(object.key) ? 'registered-landmark' : 'illustrative-local-staging' } })
    }
  }
  if(viewpoint?.kind==='tower-top') {
    const support=objects.find((o)=>o.key===viewpoint.supportKey),deck=support&&partPoint(support,['tower-top-deck'],'top')
    if(!deck)throw new Error(`${nodeId}: tower viewpoint has no physical supporting deck`)
    eye.splice(0,3,deck[0],deck[1]+(viewer.height||WORLD_NODE_EYE_HEIGHT),deck[2])
    for(const level of viewpoint.objectLevels||[])if(level.level==='companion')for(const object of objects.filter((o)=>o.key===level.key)) {
      moveBottomTo(object,[eye[0]-forward[1]*.8,deck[1],eye[2]+forward[0]*.8]);object.rotationY=Math.atan2(object.position[0]-eye[0],object.position[2]-eye[2])
    }
  }
  // A crossing is a fixed world feature: fit the water beneath its deck, never move the bridge toward a local river proxy.
  for (const bridge of objects.filter((object) => object.asset === 'bridge' && object.placement.authority === 'registered-landmark')) {
    const waterKey = bridge.key === 'feature:village-bridge' ? 'world:central-river' : bridge.key === 'feature:fshaj-bridge' ? 'feature:fshaj-river-below' : null
    const water = objects.find((object) => object.key === waterKey)
    if (water) { water.position = [bridge.position[0], 0, bridge.position[2]]; water.rotationY = bridge.rotationY + Math.PI / 2; water.attributes = { ...water.attributes, width: bridge.attributes.length * .82, length: Math.max(180, bridge.attributes.width * 15) } }
  }
  const relationRows=[...inheritedClaimIds].filter((id)=>!activeIds.has(id)).map((id)=>index.claims.get(id)).filter(Boolean).concat(activeClaims)
  const spatial=new Set(['inside','outside','at-entrance','on','below','above'])
  const rawRelations=[]
  for(const row of relationRows)for(const relation of row.relations||[]) {
    if(!activeIds.has(row.id) && (relation.subject!=='viewer'&&!candidates.has(relation.subject) || !candidates.has(relation.target)))continue
    if(!activeIds.has(row.id)) {
      const subject=candidates.get(relation.subject),target=candidates.get(relation.target)
      const source=index.sourcesById.get(row.id)
      // Fixture provenance establishes scenery, never a future action or pose
      // of a currently present actor. Only static, visible enclosure may carry
      // across dialogue; other participant relations require an active source.
      if(relation.subject!=='viewer'&&subject?.persistence!=='place'&&
        !(['inside','outside','at-entrance'].includes(relation.kind)&&(BUILDINGS.has(target?.asset)||target?.asset==='cave')&&sourceVisible(source))&&
        !(target?.asset==='wall'&&subject?.attributes.pose==='embedded'&&activeClaims.some((claim)=>claim.objects.some((object)=>object.key===relation.subject&&object.attributes?.pose==='embedded'))&&sourceVisible(source)))continue
    }
    // A current departure overrides the inherited interior occupancy of the
    // same actor; the room itself and other occupants stay in place.
    if(activeIds.has(row.id)&&relation.target==='viewer'&&relation.kind==='above')for(let i=rawRelations.length-1;i>=0;i--)if(!activeIds.has(rawRelations[i].claimId)&&rawRelations[i].target===relation.subject&&rawRelations[i].kind!=='part-of')rawRelations.splice(i,1)
    if(activeIds.has(row.id)&&spatial.has(relation.kind))for(let i=rawRelations.length-1;i>=0;i--)if(rawRelations[i].subject===relation.subject&&spatial.has(rawRelations[i].kind)&&!activeIds.has(rawRelations[i].claimId)&&!(relation.kind==='on'&&rawRelations[i].kind==='inside'&&relationRows.some((source)=>source.relations?.some((r)=>r.subject===relation.target&&r.kind==='inside'&&r.target===rawRelations[i].target))))rawRelations.splice(i,1)
    rawRelations.push({...relation,claimId:row.id})
  }
  const relations = applyWorldNodeRelations(objects, rawRelations, forward, eye,{viewer})
  if(relations.some((r)=>r.subject==='viewer'&&r.kind==='inside'&&objects.some((o)=>o.id===r.targetId&&(BUILDINGS.has(o.asset)||o.asset==='cave'))))environment.setting='indoor'
  // Resolve small model-origin differences against actual floor surfaces. This
  // never moves an object across a wall or up to a distant storey.
  const floorMoves=new Map()
  for(const object of objects)if(!BUILDINGS.has(object.asset)&&object.asset!=='cave') {
    const bottom=boundsOf(object)[1][0]
    for(const room of objects.filter((o)=>BUILDINGS.has(o.asset)&&o.attributes.interior)) {
      const floor=buildAssetParts(room.asset,room.attributes).find((p)=>['floor','tower-floor'].includes(p.id));if(!floor)continue
      const local=rotate(object.position.map((n,i)=>n-room.position[i]),[0,-room.rotationY,0]).map((n,i)=>n/room.scale[i]),top=meshPoint(room,[floor.position[0],floor.position[1]+floor.size[1]/2,floor.position[2]])[1]
      if(Math.abs(local[0]-floor.position[0])<floor.size[0]/2-.2&&Math.abs(local[2]-floor.position[2])<floor.size[2]/2-.2&&top-bottom>.005&&top-bottom<.65){object.position[1]+=top-bottom;floorMoves.set(object.key,top-bottom);break}
    }
  }
  for(const relation of relations.filter((r)=>r.kind==='holds')) {const dy=floorMoves.get(relation.subject);if(dy)for(const object of objects.filter((o)=>o.key===relation.target))object.position[1]+=dy}

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
  const lookAtObject=viewpoint?.lookAtKey&&objects.find((o)=>o.key===viewpoint.lookAtKey)
  const viewForward = viewer.facing === 'back' ? forward.map((value) => -value) : forward
  return {
    version: WORLD_NODE_RENDER_VERSION, nodeId, label: buildWorldNodeSceneIndex().find((entry) => entry.nodeId === nodeId).label,
    location, localOnly, mode, viewer, narrativeDomain, viewpoint: viewpoint ? clone(viewpoint) : null, representativeDescriptionId: representative?.id || null, selectedDescriptionId: witness?.id || null, objects, descriptions, provenance, relations, states: stateClaims,
    camera: { eye, target: lookAtObject?[lookAtObject.position[0],eye[1],lookAtObject.position[2]]:[eye[0] + viewForward[0] * 10, eye[1] + (viewpoint?.kind === 'tree-canopy' ? -4 : viewpoint?.kind.startsWith('well-') ? 20 : 0), eye[2] + viewForward[1] * (viewpoint?.kind.startsWith('well-') ? 3 : 10)], up: [0, 1, 0], fov: 70,
      space: localOnly ? 'unlocated-local' : 'world', localOnly },
    environment: { ...environment, unlocated: localOnly, underwater: Boolean(environment.underwater || viewpoint?.kind === 'underwater'), groundHeight: viewpoint?.kind === 'underwater' ? offset[1] - 1 : viewpoint?.kind.startsWith('well-') ? -20 : 0 },
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

export function validateWorldNodeClaims(rows = WORLD_SCENE_3D_NODE_CLAIMS, {fixtures=WORLD_NODE_PLACE_FIXTURES,refinements=WORLD_NODE_FEATURE_STAGING} = {}) {
  const issues = []
  const expected = new Map(sourceIndex().sources.map((entry) => [entry.id, entry]))
  const seen = new Set()
  const fixtureIds=new Set(),fixtureKeys=new Set(),claimsById=new Map(rows.map((row)=>[row.id,row]))
  for(const fixture of fixtures) {
    const fail=(message)=>issues.push({id:fixture.id||'missing-fixture-id',message})
    const identity=`${fixture.placeId}\0${fixture.key}`
    if(!fixture.id||fixtureIds.has(fixture.id)||fixtureKeys.has(identity))fail('duplicate or missing fixture identity')
    fixtureIds.add(fixture.id);fixtureKeys.add(identity)
    if(!fixture.owner||!fixture.reviewTrigger||!fixture.rationale||!Array.isArray(fixture.sourceIds)||!fixture.sourceIds.length||new Set(fixture.sourceIds).size!==fixture.sourceIds.length||!Array.isArray(fixture.witnesses)||!same(fixture.witnesses.map((row)=>row.id),fixture.sourceIds)) {fail('malformed reviewed fixture declaration');continue}
    for(const witness of fixture.witnesses) {
      const source=expected.get(witness.id),claim=claimsById.get(witness.id)
      if(!source||source.placeId!==fixture.placeId||!same(witness.text,source.text)||!same(witness.conditions,source.conditions)||!claim?.objects.some((object)=>object.key===fixture.key&&object.persistence==='place'))fail(`stale, unused or wrong-place fixture source ${witness.id}`)
    }
  }
  const refinementKeys=new Set(),refinementIds=new Set()
  for(const row of refinements) {
    const source=expected.get(row.witness),claim=claimsById.get(row.witness)
    if(refinementKeys.has(row.key)||refinementIds.has(row.id)||!row.id||!finite3(row.offset)||!row.rationale||!source||source.text!==row.text||!claim?.objects.some((object)=>object.key===row.key)||!sourceIndex().elements.has(row.key))issues.push({id:row.id,message:'invalid or stale source-backed feature refinement'})
    refinementKeys.add(row.key);refinementIds.add(row.id)
  }
  const viewpointNodes = new Set()
  for (const view of WORLD_NODE_VIEWPOINTS) {
    const source = expected.get(view.witness)
    if (!source || (view.text && view.text !== source.text)) issues.push({id: view.witness, message: 'viewpoint has missing or stale exact source evidence'})
    if(view.lookAtKey&&!claimsById.get(view.witness)?.objects.some((o)=>o.key===view.lookAtKey))issues.push({id:view.witness,message:'viewpoint direction has no exact source-bound target'})
    if(view.kind==='tower-top'&&!rows.some((row)=>row.objects.some((o)=>o.key===view.supportKey&&o.asset==='tower')))issues.push({id:view.witness,message:'tower viewpoint has no source-bound support'})
    for(const level of view.objectLevels||[]) {
      const source=expected.get(level.witness),claim=claimsById.get(level.witness)
      if(!['sky','approach','support','companion'].includes(level.level)||!source||source.text!==level.text||!claim?.objects.some((o)=>o.key===level.key))issues.push({id:level.witness,message:'stale or unsupported source-bound object level'})
    }
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
    for (const relation of row.relations) {
      if(!relation.subject||!relation.kind||!relation.target)fail('incomplete physical relationship')
      if(relation.kind==='between') {
        const localKeys=new Set(rows.filter((entry)=>entry.placeId===row.placeId).flatMap((entry)=>entry.objects.map((object)=>object.key)))
        if(!relation.secondTarget||relation.secondTarget===relation.target||!localKeys.has(relation.secondTarget))fail('between relation requires a distinct existing second endpoint')
      }
    }
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
    const supportRelation=scene.relations.find((r)=>r.subject==='viewer'&&r.kind==='on'&&r.geometryStatus==='modeled'),support=scene.objects.find((o)=>o.id===supportRelation?.targetId),deck=support?.asset==='ship'&&partPoint(support,['ship-deck'],'top')
    if(!same(scene.camera?.eye,[0,deck?deck[1]+WORLD_NODE_EYE_HEIGHT:WORLD_NODE_EYE_HEIGHT,0]))fail(scene.nodeId,'unlocated viewer must retain the local origin and actual source-backed support height')
    if (scene.objects.some(({ placement }) => placement?.authority !== 'unlocated-local-staging')) fail(scene.nodeId, 'unlocated physical evidence acquired a world placement')
  } else {
    const view = WORLD_NODE_VIEWPOINTS.find((row) => row.nodes.includes(scene.nodeId))
    const position = NODE_POS[view?.anchorPlace || scene.nodeId]
    const offset = view?.offset || [0, 0, 0]
    const support=view?.kind==='tower-top'?scene.objects.find((o)=>o.key===view.supportKey):null,deck=support&&partPoint(support,['tower-top-deck'],'top')
    const mountRelation=scene.relations.find((r)=>r.subject==='viewer'&&r.kind==='on'&&r.geometryStatus==='modeled'),mount=scene.objects.find((o)=>o.id===mountRelation?.targetId),saddle=mount&&partPoint(mount,[mount.asset==='ship'?'ship-deck':'body'],'top')
    const expectedEye=deck?[deck[0],deck[1]+(Number.isFinite(scene.viewer?.height)?scene.viewer.height:WORLD_NODE_EYE_HEIGHT),deck[2]]:[position[0]+offset[0],saddle?saddle[1]+(mount.asset==='ship'?WORLD_NODE_EYE_HEIGHT:.95):(Number.isFinite(scene.viewer?.height)?scene.viewer.height:WORLD_NODE_EYE_HEIGHT)+offset[1],position[1]+offset[2]]
    if (!finite3(scene.camera?.eye) || !same(scene.camera.eye,expectedEye)) fail(scene.nodeId, 'camera is not at the canonical node location and reviewed physical level')
  }
  const ids = new Set()
  for (const object of scene.objects) {
    if (ids.has(object.id)) fail(object.id, 'duplicate rendered identity')
    ids.add(object.id)
    const refinement=WORLD_NODE_FEATURE_STAGING.find((row)=>row.key===object.key),landmark=sourceIndex().elements.get(object.key)
    if(!same(object.placement?.refinement,refinement))fail(object.id,'stale source-backed model refinement')
    if(landmark?.position&&!same(object.placement?.anchorPosition,landmark.position))fail(object.id,'registered feature anchor drifted')
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
