// Reviewed low-poly asset vocabulary for the debug world reconstruction.
// Geometry is composed, human-scale and illustrative. An asset never proves
// presence: exact authored claims and state projection own that decision.
const P = { stone: '#aaa99e', darkStone: '#777b77', wood: '#76513a', bark: '#654834', leaf: '#467052', water: '#5b9caa', metal: '#a5adb0', gold: '#d9b24d', cloth: '#927b68', skin: '#c99879', flame: '#f1a04f', dark: '#302b29', white: '#eee8d9' }
const part = (id, primitive, position, size, color, rotation = [0, 0, 0], extra = {}) => ({ id, primitive, position, size, color, rotation, ...extra })
const box = (id, p, s, c, r) => part(id, 'box', p, s, c, r)
const ball = (id, p, s, c) => part(id, 'sphere', p, s, c)
const cylinder = (id, p, s, c, r) => part(id, 'cylinder', p, s, c, r)
const cone = (id, p, s, c, r) => part(id, 'cone', p, s, c, r)
const tube = (id, p, s, c, innerRatio = .72, r) => part(id, 'tube', p, s, c, r, { innerRatio })
const roof = (id, p, s, c) => part(id, 'wedge', p, s, c)
const ring = (id, p, s, c, r) => part(id, 'torus', p, s, c, r)
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))
const finite = (v, d) => Number.isFinite(v) ? v : d
const scatter = (i, seed = 1) => { const x = Math.sin((i + seed * 3.71) * 127.1) * 43758.5453; return x - Math.floor(x) }
const rod = (id, a, b, radius, color) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], dz = b[2] - a[2], length = Math.hypot(dx, dy, dz)
  return cylinder(id, a.map((v, i) => (v + b[i]) / 2), [radius * 2, length, radius * 2], color, [Math.acos(clamp(dy / (length || 1), -1, 1)), Math.atan2(dx, dz), 0])
}
function rotatedCorner(p, [x=0,y=0,z=0]) {
  let q=[p[0],p[1]*Math.cos(x)-p[2]*Math.sin(x),p[1]*Math.sin(x)+p[2]*Math.cos(x)]
  q=[q[0]*Math.cos(y)+q[2]*Math.sin(y),q[1],-q[0]*Math.sin(y)+q[2]*Math.cos(y)]
  return [q[0]*Math.cos(z)-q[1]*Math.sin(z),q[0]*Math.sin(z)+q[1]*Math.cos(z),q[2]]
}
function placeOnGround(parts) {
  let bottom=Infinity
  for(const p of parts) for(const x of [-.5,.5])for(const y of [-.5,.5])for(const z of [-.5,.5])bottom=Math.min(bottom,p.position[1]+rotatedCorner([x*p.size[0],y*p.size[1],z*p.size[2]],p.rotation)[1])
  return parts.map((p)=>({...p,position:[p.position[0],p.position[1]-bottom+.012,p.position[2]]}))
}

function moved(parts, offset = [0, 0, 0], scale = 1, prefix = '') {
  const scales = Array.isArray(scale) ? scale : [scale, scale, scale]
  return parts.map((entry) => ({ ...entry, id: prefix + entry.id,
    position: entry.position.map((v, i) => v * scales[i] + offset[i]), size: entry.size.map((v, i) => v * scales[i]),
  }))
}
const c = (a, fallback) => a.color || fallback

function building(a = {}, style = 'house') {
  const w = finite(a.width, style === 'palace' ? 12 : 8), d = finite(a.depth, 7), h = finite(a.height, style === 'palace' ? 6 : 4)
  const wall = c(a, style === 'palace' ? '#d5c5a6' : '#bcb29c'), timber = P.wood, cutaway = a.cutaway === true
  const p = [box('floor', [0, .1, 0], [w, .2, d], '#8e8069'), box('back-wall', [0, h / 2, d / 2], [w, h, .35], wall),
    box('left-wall', [-w / 2, h / 2, 0], [.35, h, d], wall), box('right-wall', [w / 2, h / 2, 0], [.35, h, d], wall)]
  if (!cutaway) {
    p.push(box('front-left', [-(w + 1.7) / 4, h / 2, -d / 2], [(w - 1.7) / 2, h, .35], wall), box('front-right', [(w + 1.7) / 4, h / 2, -d / 2], [(w - 1.7) / 2, h, .35], wall),
      box('door-lintel', [0, (h + 2.4) / 2, -d / 2], [1.7, h - 2.4, .35], wall), roof('pitched-roof', [0, h + 1.1, 0], [w + .75, 2.2, d + .8], a.roofColor || '#875345'),
      box('roof-ridge', [0, h + 2.2, 0], [.16, .16, d + .95], '#68463a'), box('chimney', [w * .27, h + 1.5, d * .2], [.65, 2.1, .65], '#8e877b'))
    for (const x of [-w * .31, w * .31]) p.push(...moved(windowAsset({}), [x, 2.35, -d / 2 - .2], 1, `window:${x}:`))
  } else {
    p.push(box('back-roof-beam', [0, h - .2, d / 2 - .2], [w, .25, .25], timber), box('left-roof-beam', [-w / 2 + .2, h - .2, 0], [.25, .25, d], timber), box('right-roof-beam', [w / 2 - .2, h - .2, 0], [.25, .25, d], timber))
    for (const x of [-w * .25, w * .25]) p.push(...moved(windowAsset({}), [x, 2.3, d / 2 - .21], 1, `inside-window:${x}:`))
  }
  p.push(...moved(doorAsset({ open: a.open !== false, color: timber }), [0, 0, -d / 2], 1, 'entrance:'))
  if (style === 'palace') {
    for (const x of [-w * .36, w * .36]) p.push(cylinder(`column:${x}`, [x, h / 2, -d / 2 - .8], [.65, h, .65], '#e4dcc6'), box(`capital:${x}`, [x, h, -d / 2 - .8], [.95, .3, .95], '#e4dcc6'))
    p.push(...moved(stairsAsset({}), [0, -.05, -d / 2 - 1.3], 1.5, 'steps:'))
  }
  return p
}
function doorAsset(a = {}) {
  const p = [box('frame-left', [-.87, 1.23, 0], [.16, 2.46, .24], P.wood), box('frame-right', [.87, 1.23, 0], [.16, 2.46, .24], P.wood), box('frame-top', [0, 2.46, 0], [1.9, .16, .24], P.wood)]
  const open = a.open === true && a.closed !== true
  p.push(box('door-panel', open ? [-.77, 1.2, -.79] : [0, 1.2, .03], open ? [.12, 2.35, 1.55] : [1.55, 2.35, .12], c(a, P.wood)),
    ball('latch', open ? [-.86, 1.12, -1.3] : [.56, 1.12, -.07], [.13, .13, .13], P.metal))
  for (let i = 0; i < 5; i++) if (!open) p.push(box(`plank:${i}`, [-.62 + i * .31, 1.2, -.041], [.018, 2.3, .015], '#503928'))
  return p
}
function windowAsset(a = {}) { return [box('glass', [0, 0, 0], [1.2, 1.3, .08], a.lit ? '#e0b36b' : '#3f5861'), ...[-.65, .65].map((x) => box(`jamb:${x}`, [x, 0, -.06], [.13, 1.5, .15], P.wood)), ...[-.7, 0, .7].map((y) => box(`crossbar:${y}`, [0, y, -.07], [1.4, .12, .16], P.wood)), box('mullion', [0, 0, -.08], [.09, 1.4, .14], P.wood)] }
function stairsAsset() { return [0, 1, 2, 3].map((i) => box(`step:${i}`, [0, .15 + i * .15, .45 - i * .3], [2.5, .3 + i * .3, .6], P.stone)) }
function tower(a = {}) {
  const height = finite(a.height, 9), p = [cylinder('round-wall', [0, height / 2, 0], [4, height, 4], c(a, P.stone)), tube('parapet', [0, height + .28, 0], [4.35, .65, 4.35], P.stone)]
  for (let i = 0; i < 8; i++) { const angle = i * Math.PI / 4; p.push(box(`merlon:${i}`, [Math.sin(angle) * 1.9, height + 1, Math.cos(angle) * 1.9], [.8, 1, .8], P.stone)) }
  for (let i = 0; i < 3; i++) p.push(box(`arrow-slit:${i}`, [0, 2 + i * 2.2, -2.02], [.22, .9, .04], P.dark))
  p.push(...moved(doorAsset({ open: a.open }), [0, 0, -2.05], .8, 'tower-door:'))
  return p
}
function fortress(a = {}) {
  const p = [box('court', [0, .1, 0], [14, .2, 12], '#978f7f'), box('back-rampart', [0, 2.5, 6], [14, 5, 1.2], P.stone), ...[-7, 7].map((x) => box(`side-wall:${x}`, [x, 2.5, 0], [1.2, 5, 12], P.stone)), box('front-left', [-4.7, 2.5, -6], [4.6, 5, 1.2], P.stone), box('front-right', [4.7, 2.5, -6], [4.6, 5, 1.2], P.stone)]
  for (const x of [-7, 7]) for (const z of [-6, 6]) p.push(...moved(tower({ height: 7 }), [x, 0, z], .8, `tower:${x}:${z}:`))
  p.push(...moved(archAsset({}), [0, 0, -6], 1.5, 'gate:'))
  for (let i = 0; i < 11; i++) p.push(box(`back-merlon:${i}`, [-6 + i * 1.2, 5.35, 6], [.7, .7, 1.2], P.stone))
  return p
}
function archAsset() {
  const p = [box('left-pier', [-1.55, 1.5, 0], [.65, 3, 1]), box('right-pier', [1.55, 1.5, 0], [.65, 3, 1])]
  for (let i = 0; i < 9; i++) { const theta = i * Math.PI / 8; p.push(box(`voussoir:${i}`, [Math.cos(theta) * 1.55, 3 + Math.sin(theta) * 1.5, 0], [.6, .7, 1], P.stone, [0, 0, theta - Math.PI / 2])) }
  return p.map((entry) => ({ ...entry, color: entry.color || P.stone }))
}
function bridge(a = {}) {
  const length = finite(a.length, 12), width = finite(a.width, 3), h = finite(a.height, 1.1), p = []
  const count = Math.ceil(length / .48)
  for (let i = 0; i < count; i++) p.push(box(`deck-board:${i}`, [0, h, -length / 2 + (i + .5) * length / count], [width, .18, length / count - .04], a.wet ? '#665d4d' : '#987349'))
  for (const side of [-1, 1]) {
    p.push(box(`rail:${side}`, [side * width / 2, h + 1.1, 0], [.12, .14, length], P.wood), box(`support-beam:${side}`, [side * (width / 2 - .35), h - .25, 0], [.35, .45, length], P.darkStone))
    for (let i = 0; i < 7; i++) p.push(box(`post:${side}:${i}`, [side * width / 2, h + .55, -length / 2 + i * length / 6], [.15, 1.2, .15], P.wood))
    for (const z of [-length * .28, length * .28]) p.push(box(`pier:${side}:${z}`, [side * width * .33, -.8, z], [.75, 3.6, .9], P.stone))
  }
  return p
}
function well(a = {}) {
  const depth=finite(a.depth,5)
  const p = [tube('stone-rim', [0, .55, 0], [2.5, 1.1, 2.5], P.stone, .72), tube('shaft-lining', [0, -depth/2, 0], [2.25, depth, 2.25], P.darkStone, .83), cylinder('dark-depth', [0, a.dry ? -depth+.025 : finite(a.waterLevel,-depth+.35), 0], [1.75, .02, 1.75], a.dry ? '#302b25' : '#355d68')]
  for (let i = 0; i < 10; i++) { const angle = i * Math.PI / 5; p.push(box(`rim-stone:${i}`, [Math.cos(angle) * 1.08, 1.13, Math.sin(angle) * 1.08], [.56, .22, .45], '#c6c0ad', [0, -angle, 0])) }
  if (a.covered === true) p.push(box('left-post', [-1.35, 1.8, 0], [.2, 3.6, .2], P.wood), box('right-post', [1.35, 1.8, 0], [.2, 3.6, .2], P.wood), roof('well-roof', [0, 3.65, 0], [3.5, 1, 2.9], '#805847'), cylinder('windlass', [0, 2.1, 0], [.25, 2.7, .25], P.wood, [0, 0, Math.PI / 2]), rod('hanging-rope', [0, 2.1, 0], [0, .1, 0], .025, '#c4a779'))
  const width=finite(a.width,2.5)
  return moved(p,[0,0,0],[width/2.5,1,width/2.5])
}
function tree(a = {}) {
  const h = finite(a.height, 7), p = [cylinder('trunk', [0, h * .3, 0], [.6, h * .6, .6], P.bark)]
  if (a.variant === 'pine' || a.variant === 'fir') {
    for (let i = 0; i < 3; i++) p.push(cone(`needles:${i}`, [0, h * (.42 + i * .18), 0], [h * (.65 - i * .13), h * .45, h * (.65 - i * .13)], c(a, '#345b4a')))
  } else {
    for (const [i, x, z] of [[0, 0, 0], [1, -1.2, .3], [2, 1, .5], [3, 0, -1.1]]) {
      p.push(rod(`branch:${i}`, [0, h * .3, 0], [x, h * .65, z], .16, P.bark))
      if (!a.bare) p.push(ball(`crown:${i}`, [x, h * (.73 + (i === 0 ? .12 : 0)), z], [h * .55, h * .48, h * .52], c(a, a.season === 'autumn' ? '#a67b42' : '#51764d')))
    }
  }
  if (a.snow) p.push(cone('snow-crown', [0, h * .9, 0], [h * .58, h * .24, h * .58], '#e7ede6'))
  return p
}
function forest(a = {}) { return Array.from({ length: clamp(Math.round(finite(a.count, 7)), 1, 15) }, (_, i) => moved(tree({ ...a, variant: i % 3 === 0 ? 'pine' : a.variant, height: 5.5 + scatter(i) * 3 }), [(scatter(i, 2) - .5) * 16, 0, (scatter(i, 4) - .5) * 12], 1, `tree:${i}:`)).flat() }
function water(a = {}, variant = 'river') {
  const w = finite(a.width, variant === 'sea' ? 35 : variant === 'lake' ? 18 : 7), length = finite(a.length, variant === 'river' ? 24 : w), p = [box('water-surface', [0, .025, 0], [w, .035, length], c(a, '#6496a2'))]
  for (let i = 0; i < 11; i++) p.push(box(`ripple:${i}`, [(scatter(i, 2) - .5) * w * .9, .05, (scatter(i, 5) - .5) * length * .9], [.8 + scatter(i) * 1.6, .012, .06], '#a4c5c5', [0, (scatter(i, 4) - .5) * .25, 0]))
  if (variant === 'river' || variant === 'spring') for (const side of [-1, 1]) for (let i = 0; i < 6; i++) p.push(ball(`bank-stone:${side}:${i}`, [side * (w / 2 + .2), .2, -length / 2 + (i + .5) * length / 6], [1.3, .6, 1], P.stone))
  if (a.dry || a.water === false) return p.filter((part) => !part.id.startsWith('ripple:')).map((part) => part.id === 'water-surface' ? {...part,id:'dry-riverbed',color:'#93836a'} : part)
  return p
}
function mountain(a = {}) { return [cone('mountain-main', [0, 8, 0], [25, 16, 24], c(a, '#777e7b')), cone('mountain-shoulder', [-8, 4.5, 3], [15, 9, 15], '#8b8c7d'), cone('mountain-ridge', [8, 5.5, 4], [16, 11, 15], '#6b7474'), cone('snow-cap', [0, 14.4, 0], [6.2, 3.3, 6], '#e4e7df')] }
function cave(a = {}) {
  if (a.interior === true) {
    const width=finite(a.width,24),depth=finite(a.depth,32),height=finite(a.height,10),centerZ=-7,front=centerZ-depth/2,back=centerZ+depth/2,opening=Math.min(6,width*.4),entranceHeight=Math.min(5,height*.7)
    const p=[box('cavern-floor',[0,-.14,centerZ],[width,.28,depth],'#777567'),box('left-rock-wall',[-width/2-.5,height/2,centerZ],[1,height,depth],'#777d73'),box('right-rock-wall',[width/2+.5,height/2,centerZ],[1,height,depth],'#6b746d'),box('far-rock-wall',[0,height/2,front-.5],[width+2,height,1],'#757b71'),box('rock-ceiling',[0,height+.35,centerZ],[width+2,.7,depth+2],'#777c70')]
    // The viewer stands inside. The entrance stays behind (+Z), with open air
    // through the gap; its surrounding stone never becomes a closed backdrop.
    for(const side of [-1,1]) p.push(box(`entrance-flank:${side}`,[side*(width+opening)/4,height/2,back+.35],[(width-opening)/2,height,.7],'#828575'))
    p.push(box('entrance-lintel',[0,(height+entranceHeight)/2,back+.35],[opening,height-entranceHeight,.7],'#858779'))
    for(const side of [-1,1]) for(let i=0;i<5;i++) p.push(ball(`wall-outcrop:${side}:${i}`,[side*(width/2-.4),2.2+scatter(i,4)*3,front+3+i*(depth-6)/4],[1.5+scatter(i)*.6,3.2+scatter(i,6),2.6],'#81877a'))
    for(let i=0;i<4;i++)p.push(ball(`ceiling-ridge:${i}`,[(i-1.5)*width/4,height-.3,centerZ],[width/3,1.6,depth*.9],i%2?'#747c71':'#828679'))
    return p
  }
  return [ball('left-rock', [-3, 2.3, 0], [4.1, 5.5, 4], P.darkStone), ball('right-rock', [3, 2, 0], [4.1, 5.1, 4], '#71766e'), ball('arch-rock', [0, 4.7, 0], [7.8, 3.2, 4.3], '#898b7d'), box('receding-dark', [0, 2.2, 1.8], [4.2, 4.4, .2], '#202829'), box('cave-floor', [0, .04, .5], [5, .08, 5], '#65685d'), ...moved(rockAsset({}), [-3.8, 0, -1.6], 1.4, 'fallen-rock:')] }
function rockAsset(a = {}) { return [ball('faceted-stone', [0, .42, 0], [1.3, .85, 1.05], c(a, P.stone)), ball('stone-shoulder', [.35, .25, .2], [.7, .5, .7], c(a, P.stone))] }
function human(a = {}) {
  const skin = a.skinColor || P.skin, cloth = a.clothingColor || c(a, '#84736c'), p = [], sitting = a.pose === 'sitting', child = a.variant === 'child', skirt = a.skirt || a.variant === 'woman'
  const hip = sitting ? .66 : .88, shoulder = sitting ? 1.18 : 1.43, head = sitting ? 1.43 : 1.68
  p.push(box('clothed-torso', [0, (hip + shoulder) / 2, 0], [.46, shoulder - hip, .28], cloth), ball('shoulders', [0, shoulder - .09, 0], [.56, .24, .29], cloth), cylinder('neck', [0, head - .21, 0], [.14, .18, .14], skin), ball('head', [0, head, -.012], [.31, .38, .3], skin), ball('hair', [0, head + .08, .045], [.33, .27, .29], a.hairColor || '#493b32'), box('nose', [0, head, -.176], [.055, .065, .065], skin))
  for (const side of [-1, 1]) {
    if (a.eyes !== 1 || side === -1) p.push(ball(`eye:${side}`, [a.eyes === 1 ? 0 : side * .067, head + .035, -.16], [a.eyes === 1 ? .055 : .025, a.blinded || a.pose === 'sleeping' ? .006 : .025, .015], a.blinded ? '#743c38' : '#25292a'))
    const knee = sitting && a.knees !== false ? [side * .14, .5, -.44] : [side * .14, .46, 0]
    p.push(rod(`upper-leg:${side}`, [side * .14, hip, 0], knee, .1, '#56515a'), rod(`lower-leg:${side}`, knee, [side * .14, .13, sitting ? -.5 : 0], .075, '#5e5450'), box(`shoe:${side}`, [side * .14, .085, sitting ? -.55 : -.06], [.2, .14, .34], '#3c3430'))
    const elbow = [side * .37, shoulder - .28, -.05], hand = [side * .34, shoulder - .57, a.heldItem ? -.26 : -.04]
    p.push(rod(`upper-arm:${side}`, [side * .25, shoulder - .05, 0], elbow, .078, cloth), rod(`forearm:${side}`, elbow, hand, .06, cloth), ball(`hand:${side}`, hand, [.115, .15, .12], skin))
  }
  if (skirt) p.push(cone('long-skirt', [0, hip - .23, 0], [.69, .63, .46], cloth))
  p.push(box('belt', [0, hip + .12, -.01], [.56, .055, .31], '#544132'))
  if (a.headscarfColor) p.push(ball('headscarf',[0,head+.075,.065],[.38,.37,.3],a.headscarfColor),box('scarf-tie',[0,head-.18,.09],[.23,.24,.12],a.headscarfColor))
  if (a.headwear === 'crown') p.push(...moved(recipes.crown({}), [0, head + .17, 0], .7, 'headwear:'))
  if (a.wings === true) for(const side of [-1,1]) p.push(part(`wing:${side}`,'wedge',[side*.65,1.3,.15],[1,.08,.5],'#c9cdbb',[0,side*.3,side*-.3]))
  if (a.hair === 'wild') for(let i=0;i<6;i++) p.push(cone(`wild-hair:${i}`,[(i-2.5)*.055,head+.2,.05],[.08,.27,.1],a.hairColor || '#594536',[0,0,(i-2.5)*-.18]))
  if (a.hair === 'long') p.push(ball('long-hair', [0, head - .14, .11], [.37, .62, .15], a.hairColor || '#493b32'))
  if (a.hat) p.push(cone('cap', [0, head + .24, .02], [.4, .2, .35], a.hatColor || P.white))
  if (a.beard) p.push(cone('beard', [0, head - .13, -.12], [.21, .28, .12], a.hairColor || '#776e61', [0, 0, Math.PI]))
  if (a.heldItem) {
    if (['human', 'person', 'man', 'woman', 'child', 'giant'].includes(a.heldItem)) throw new Error(`Unsupported human held asset: ${a.heldItem}`)
    p.push(...moved(buildAssetParts(a.heldItem, a.heldAttributes || {}), [.36, shoulder - .64, -.3], .33, 'held:'))
  }
  if (a.pose === 'embedded') { const exposed = ['head', 'nose', 'eye:-1', 'hair', 'upper-arm:-1', 'forearm:-1', 'hand:-1', 'upper-leg:-1', 'lower-leg:-1', 'shoe:-1']; p.splice(0, p.length, ...p.filter((part) => exposed.includes(part.id))); p.push(ball('exposed-breast', [-.13, 1.28, -.15], [.19, .17, .16], skin)) }
  const result = child ? moved(p, [0, 0, 0], .65) : p
  return a.dead || ['lying','sleeping','dead'].includes(a.pose) ? result.map((entry) => ({ ...entry, position: [entry.position[0], entry.position[2] + .25, -entry.position[1]], rotation: [Math.PI / 2 + entry.rotation[0], entry.rotation[1], entry.rotation[2]] })) : result
}
function quadruped(a = {}, species = 'horse') {
  const config = { horse: [2.1, 1.1, 1.45, '#946b47'], donkey: [1.65, .9, 1.2, '#918d81'], wolf: [1.4, .55, .7, '#7b8080'], dog: [1.1, .48, .6, '#a17a51'], fox: [1.1, .4, .55, '#b97949'], goat: [1.25, .6, .8, '#a99b84'], sheep: [1.35, .75, .8, '#d1cbb7'], ram: [1.4, .8, .85, '#a99a7e'], bull: [2.3, 1.3, 1.4, '#d9d7c9'], bear: [2.1, 1.35, 1.35, '#716052'], deer: [1.75, .75, 1.25, '#a47d55'], pig: [1.3, .8, .65, '#bf9d8c'], cat: [.7, .3, .4, '#888074'], lion:[2.1,1.05,1.1,'#b59358'], tiger:[2.2,1.0,1.05,'#c58c4f'] }[species]
  if (!config) throw new Error(`Unknown quadruped species: ${species}`)
  const [length, width, height, coat] = config, color = c(a, coat), p = [ball('body', [0, height, 0], [width, width * .9, length], color), rod('neck', [0, height, -length * .25], [0, height * 1.3, -length * .48], width * .22, color), ball('head', [0, height * 1.34, -length * .56], [width * .55, width * .62, width * .67], color), ball('muzzle', [0, height * 1.22, -length * .72], [width * .39, width * .29, width * .55], color)]
  for (const side of [-1, 1]) {
    for (const end of [-1, 1]) p.push(rod(`leg:${side}:${end}`, [side * width * .28, height * .85, end * length * .3], [side * width * .3, .12, end * length * .32], width * .085, color), box(`hoof:${side}:${end}`, [side * width * .3, .08, end * length * .32 - .03], [width * .21, .15, width * .3], '#49423b'))
    p.push(cone(`ear:${side}`, [side * width * .18, height * 1.65, -length * .53], [width * .19, species === 'donkey' ? .48 : .25, width * .2], color), ball(`eye:${side}`, [side * width * .245, height * 1.4, -length * .65], [.045, .05, .05], '#242925'))
    if (['bull', 'goat', 'ram', 'deer'].includes(species)) p.push(rod(`horn:${side}`, [side * width * .2, height * 1.56, -length * .53], [side * width * .48, height * 1.86, -length * .46], .045, a.hornColor || '#d0c5a4'))
    if (species === 'deer') p.push(rod(`antler-tip:${side}`, [side * width * .4, height * 1.75, -length * .48], [side * width * .6, height * 2, -length * .65], .035, '#a89675'))
  }
  p.push(rod('tail', [0, height * 1.2, length * .44], [0, height * .58, length * .77], species === 'fox' ? .14 : .06, species === 'horse' ? '#4e4138' : color))
  if (species === 'horse') p.push(box('mane', [0, height * 1.36, -length * .28], [.13, .3, .7], '#4b3f36'))
  if (a.eyeStar || a.mark === 'eye-star' || a.marking === 'eye-star') p.push(ball('forehead-star', [0, height * 1.51, -length * .75], [.13, .13, .015], P.white))
  return p
}
function birdAsset(a = {}, species = 'bird') {
  const scale = species === 'eagle' ? 2.2 : 1, color = c(a, species === 'eagle' ? '#6c5b45' : '#787e70')
  return moved([ball('body', [0, .38, 0], [.35, .43, .63], color), ball('head', [0, .63, -.23], [.27, .28, .29], color), cone('beak', [0, .61, -.43], [.14, .24, .14], '#c69a4c', [Math.PI / 2, 0, 0]), ...[-1, 1].map((s) => part(`wing:${s}`, 'wedge', [s * .43, .43, .04], [.74, .09, .48], color, [0, s * .2, s * -.18])), rod('left-leg', [-.09, .2, .02], [-.09, .025, -.04], .022, '#9e7c50'), rod('right-leg', [.09, .2, .02], [.09, .025, -.04], .022, '#9e7c50'), roof('tail-feathers', [0, .36, .43], [.3, .07, .42], color)], [0, 0, 0], scale)
}
function snake(a = {}) { const p = []; for (let i = 0; i < 10; i++) p.push(ball(`body-segment:${i}`, [Math.sin(i * .7) * .4, .14, (i - 5) * .23], [.3 - i * .018, .25 - i * .014, .35], c(a, '#64734b'))); for(let i=0;i<9;i++)p.push(rod(`body-joint:${i}`,[Math.sin(i*.7)*.4,.14,(i-5)*.23],[Math.sin((i+1)*.7)*.4,.14,(i-4)*.23],.12-i*.007,c(a,'#64734b'))); p.push(ball('head', [0, .18, -1.45], [.39, .24, .45], c(a, '#64734b')), ...[-1, 1].map((s) => ball(`eye:${s}`, [s * .13, .25, -1.55], [.04, .035, .035], '#e1c361'))); return p }
function dragon(a = {}) { const p = moved(quadruped({ color: a.color || '#53695b' }, 'bear'), [0, 0, 0], 2.2, 'body:'); p.push(...moved(snake({ color: a.color || '#53695b' }).filter((part)=>part.id.startsWith('body-segment:')), [0, .3, 4.3], 2, 'tail:')); for (const s of (a.wings === true ? [-1, 1] : [])) { p.push(part(`membrane:${s}`, 'wedge', [s * 2.3, 2.5, .3], [4, .12, 3.4], '#6e7970', [0, s * .45, s * .4])); for (let i = 0; i < 3; i++) p.push(rod(`wing-bone:${s}:${i}`, [s * .7, 2.9, 0], [s * 4, 3.2 - i * .7, -1.1 + i * 1.2], .065, '#acb194')) } for (let i = 0; i < 6; i++) p.push(cone(`spine:${i}`, [0, 3.1, -1 + i * .65], [.4, .8, .5], '#bebca0')); if(a.hairColor)p.push(ball('body:hair',[0,3.5,-2.6],[1.2,.7,1.2],a.hairColor)); const headParts=p.filter((part)=>/^body:(head|hair|muzzle|neck|eye:|ear:)/.test(part.id)); const otherParts=p.filter((part)=>!headParts.includes(part)); const heads=clamp(Math.round(finite(a.heads,1)),0,7); if(a.headwear==='crown'&&heads>0)otherParts.push(...moved(recipes.crown({}),[-(heads-1)/2*1.3,4.5,-2.6],2,'head-crown:')); const result=[...otherParts,...Array.from({length:heads},(_,i)=>moved(headParts,[(i-(heads-1)/2)*1.3,0,0],1,`head:${i}:`)).flat()]; return a.variant==='heads' ? Array.from({length:heads},(_,i)=>moved(headParts,[(i-(heads-1)/2)*1.3,-2.7,0],1,`severed:${i}:`)).flat() : result }
function tableAsset(a = {}) { const w = finite(a.width, 2.4), d = finite(a.depth, 1.3), h = finite(a.height, .85); return [box('tabletop', [0, h, 0], [w, .13, d], c(a, '#956e46')), ...[-1, 1].flatMap((x) => [-1, 1].map((z) => box(`leg:${x}:${z}`, [x * (w / 2 - .15), h / 2, z * (d / 2 - .15)], [.13, h, .13], P.wood)))] }
function chairAsset(a = {}) { return [box('seat', [0, .48, 0], [.52, .1, .52], c(a, P.wood)), box('back', [0, .89, .23], [.52, .75, .07], P.wood), ...[-1, 1].flatMap((x) => [-1, 1].map((z) => box(`leg:${x}:${z}`, [x * .2, .23, z * .2], [.07, .46, .07], P.wood)))] }
function bedAsset(a = {}) { return [box('frame', [0, .42, 0], [1.7, .22, 2.5], P.wood), box('mattress', [0, .64, 0], [1.56, .28, 2.32], '#cfbca0'), box('blanket', [0, .8, .35], [1.61, .1, 1.7], c(a, '#706f79')), ball('pillow', [0, .85, -.8], [1.12, .18, .53], P.white), box('headboard', [0, .85, -1.25], [1.75, 1.3, .13], P.wood), ...[-1, 1].flatMap((x) => [-1, 1].map((z) => box(`foot:${x}:${z}`, [x * .72, .19, z * 1.08], [.12, .38, .12], P.wood)))] }
function fireAsset(a = {}) { const p = []; for (let i = 0; i < 8; i++) { const t = i * Math.PI / 4; p.push(ball(`hearth-stone:${i}`, [Math.cos(t) * .65, .12, Math.sin(t) * .65], [.42, .28, .34], P.darkStone)) } p.push(cylinder('log-a', [0, .2, 0], [.23, 1.25, .23], '#684734', [Math.PI / 2, 0, .3]), cylinder('log-b', [0, .26, 0], [.2, 1.25, .2], '#684734', [Math.PI / 2, .7, -.2])); if (a.burning !== false) for (let i = 0; i < 4; i++) p.push(cone(`flame:${i}`, [(scatter(i) - .5) * .5, .58 + i * .06, (scatter(i, 4) - .5) * .4], [.36, .75 + scatter(i, 3) * .5, .34], i % 2 ? '#ffd177' : '#df793b', [0, 0, (scatter(i, 2) - .5) * .3])); return p }
function fenceAsset(a = {}) { const length = finite(a.length, 7), p = []; for (let i = 0; i < 7; i++) p.push(box(`post:${i}`, [-length / 2 + i * length / 6, .65, 0], [.13, 1.3, .13], P.wood)); for (const y of [.35, .92]) p.push(box(`rail:${y}`, [0, y, 0], [length, .12, .11], c(a, '#977652'))); return p }
function fieldAsset(a = {}) { const p = [box('earth', [0, -.04, 0], [12, .08, 9], '#857354')]; for (let row = 0; row < 6; row++) { p.push(box(`furrow:${row}`, [0, 0, -3.5 + row * 1.35], [11.5, .04, .13], '#625841')); for (let i = 0; i < 8; i++) p.push(cylinder(`stem:${row}:${i}`, [-5 + i * 1.4, .3, -3.5 + row * 1.35], [.04, .6, .04], a.dry ? '#b5a365' : '#80995a'), cone(`ear:${row}:${i}`, [-5 + i * 1.4, .68, -3.5 + row * 1.35], [.15, .25, .15], a.dry ? '#cbbb78' : '#9baf6c')) } return p }
function flowerAsset(a = {}) { const p = [rod('stem', [0, 0, 0], [0, .6, 0], .015, '#64875a'), ball('leaf', [.12, .25, 0], [.25, .055, .09], '#64875a')]; for (let i = 0; i < 5; i++) { const t = i * Math.PI * .4; p.push(ball(`petal:${i}`, [Math.cos(t) * .11, .64, Math.sin(t) * .11], [.18, .075, .18], c(a, '#c78982'))) } p.push(ball('heart', [0, .67, 0], [.1, .06, .1], '#d8b353')); return p }
function graveAsset(a = {}) { return [ball('grave-mound', [0, .15, .35], [1.4, .3, 2.3], '#847a66'), box('headstone', [0, .85, -.85], [.95, 1.6, .25], c(a, P.stone)), ball('headstone-top', [0, 1.64, -.85], [.95, .6, .26], P.stone), box('inscription', [0, 1.05, -.99], [.53, .5, .012], '#767970')] }
function boatAsset(a = {}) { const p = [part('hull', 'wedge', [0, .35, 0], [2, 1, 4.4], c(a, '#8a6040'), [0, 0, Math.PI]), box('gunwale-left', [-.88, .85, 0], [.14, .16, 3.7], P.wood), box('gunwale-right', [.88, .85, 0], [.14, .16, 3.7], P.wood), box('rowing-seat', [0, .68, 0], [1.7, .15, .45], P.wood)]; if (a.sail) p.push(cylinder('mast', [0, 2.7, 0], [.14, 4.9, .14], P.wood), box('sail', [.8, 3, 0], [1.6, 2.8, .04], '#e2d6b6'), cylinder('yard', [0, 4.4, 0], [.09, 3.2, .09], P.wood, [0, 0, Math.PI / 2])); return p }
function cupAsset(a = {}) { return [...(a.drink || a.contents ? [cylinder('drink-surface',[0,.38,0],[.235,.012,.235], {coffee:'#554232',tea:'#a08654',milk:'#e9e1c9',water:'#8ba9a8'}[a.drink || a.contents] || '#8ba9a8')] : []), tube('cup-bowl', [0, .2, 0], [.32, .4, .32], c(a, '#b68a62'), .75), ring('handle', [.19, .24, 0], [.21, .23, .08], c(a, '#b68a62'), [Math.PI / 2, 0, 0])] }
function bottleAsset(a = {}) { return [cylinder('body', [0, .26, 0], [.3, .52, .3], c(a, a.empty ? '#96b7ad' : '#6b9d9e')), cone('shoulder', [0, .56, 0], [.3, .13, .3], '#87b1a8'), cylinder('neck', [0, .69, 0], [.13, .2, .13], '#87b1a8'), cylinder('stopper', [0, .8, 0], [.14, .06, .14], '#9f8256')] }
function toolAsset(kind, a = {}) {
  const metal = c(a, P.metal)
  if (kind === 'sword') return [box('blade', [0, .8, 0], [.11, 1.15, .04], metal), cone('point', [0, 1.45, 0], [.11, .22, .04], metal), box('guard', [0, .23, 0], [.43, .06, .09], P.gold), cylinder('grip', [0, .08, 0], [.065, .25, .065], P.wood), ball('pommel', [0, -.08, 0], [.13, .13, .12], P.gold)]
  if (kind === 'key') return [ring('bow', [0, .5, 0], [.25, .25, .055], metal, [Math.PI / 2, 0, 0]), cylinder('shaft', [0, .22, 0], [.045, .5, .045], metal), box('tooth-a', [.08, .02, 0], [.17, .055, .05], metal), box('tooth-b', [.06, .1, 0], [.14, .045, .05], metal)]
  if (kind === 'axe' || kind === 'hammer') return [cylinder('handle', [0, .55, 0], [.075, 1.1, .075], P.wood), part('head', kind === 'axe' ? 'wedge' : 'box', [0, 1.06, 0], [kind === 'axe' ? .65 : .43, .26, .15], metal)]
  if (kind === 'scissors') return [...[-1, 1].map((s) => ring(`finger-loop:${s}`, [s * .1, .12, 0], [.19, .24, .04], metal, [Math.PI / 2, 0, 0])), ...[-1, 1].map((s) => box(`blade:${s}`, [s * .06, .4, 0], [.045, .42, .02], metal, [0, 0, -s * .26])), ball('hinge', [0, .25, 0], [.055, .055, .05], P.gold)]
  throw new Error(`Unknown tool asset: ${kind}`)
}
function insect(kind, a = {}) { const p = [ball('abdomen', [0, .14, .08], [.24, .22, .4], c(a, kind === 'bee' ? '#d1ad4f' : '#655b47')), ball('head', [0, .2, -.18], [.19, .2, .2], '#474837')]; const legs = kind === 'spider' ? 4 : 3; for (const s of [-1, 1]) for (let i = 0; i < legs; i++) p.push(rod(`leg:${s}:${i}`, [0, .15, -.1 + i * .1], [s * .35, .04, -.28 + i * .2], .015, '#635d4d')); if (kind !== 'spider') for (const s of [-1, 1]) p.push(ball(`wing:${s}`, [s * .18, .28, .05], [.32, .025, .5], '#c2ccc2')); return p }
function lampAsset(a = {}) { return [cylinder('foot', [0, .055, 0], [.5, .11, .5], '#927347'), cylinder('oil-reservoir', [0, .18, 0], [.35, .22, .35], '#b19460'), tube('glass-chimney', [0, .56, 0], [.26, .55, .26], '#b8bfb0', .9), cone('flame', [0, .43, 0], [.08, .17, .08], a.burning === false ? '#675345' : '#ffc46d')] }

const recipes = {
  house: building, hut: (a) => building({ ...a, width: 5, depth: 4, height: 2.8 }), interior: (a) => building({ ...a, width: a.width || 10, depth: a.depth || 12, height: a.height || 4, cutaway: true }), palace: (a) => building(a, 'palace'), tower, fortress, castle: fortress, arch: archAsset, gate: archAsset, door: doorAsset, window: windowAsset, stairs: stairsAsset, bridge, well, tree, forest, mountain, cave, rock: rockAsset, stone: rockAsset,
  river: (a) => water(a, 'river'), water: water, lake: (a) => water(a, 'lake'), sea: (a) => water(a, 'sea'), spring: (a) => [...water({ ...a, width: 2, length: 3 }, 'spring'), ...moved(rockAsset({}), [0, .2, 1.5], 1.3, 'source-rock:')],
  human, person: human, man: (a) => human({ ...a, variant: 'man' }), woman: (a) => human({ ...a, variant: 'woman' }), child: (a) => human({ ...a, variant: 'child' }), giant: (a) => moved(human(a), [0, 0, 0], 3), fairy: (a) => [...human({ ...a, clothingColor: a.clothingColor || '#b0cbb9' }), ...(a.wings === true ? [-1, 1] : []).map((s) => ball(`wing:${s}`, [s * .4, 1.3, .2], [.5, .7, .08], '#c9d8cb'))], spirit: (a) => human({ ...a, clothingColor: a.clothingColor || '#d6d7c5' }), dragon,
  ...Object.fromEntries(['horse', 'donkey', 'wolf', 'dog', 'fox', 'goat', 'sheep', 'ram', 'bull', 'bear', 'deer', 'pig', 'cat'].map((kind) => [kind, (a) => quadruped(a, kind)])), bird: birdAsset, eagle: (a) => birdAsset(a, 'eagle'), snake,
  table: tableAsset, chair: chairAsset, bed: bedAsset, fire: fireAsset, hearth: fireAsset, fence: fenceAsset, field: fieldAsset, flower: flowerAsset,
  garden: (a) => [box('garden-earth', [0, -.05, 0], [9, .1, 7], '#74694f'), ...Array.from({ length: 18 }, (_, i) => moved(flowerAsset({ color: ['#b47f82', '#d7bc67', '#abbcca'][i % 3] }), [(scatter(i, 2) - .5) * 8, 0, (scatter(i, 7) - .5) * 6], 1, `flower:${i}:`)).flat()],
  grave: graveAsset, tomb: (a) => [...graveAsset(a), box('stone-slab', [0, .35, .35], [1.5, .25, 2.4], P.stone)],
  wall: (a) => [box('masonry', [0, 1.5, 0], [a.length || 7, 3, .6], c(a, P.stone)), ...Array.from({ length: 5 }, (_, i) => box(`course:${i}`, [0, .4 + i * .55, -.305], [a.length || 7, .025, .02], P.darkStone))],
  road: (a) => [box('roadbed', [0, -.01, 0], [a.width || 4, .06, a.length || 18], c(a, '#b19c76')), ...Array.from({ length: 12 }, (_, i) => ball(`roadstone:${i}`, [(scatter(i, 3) - .5) * 3.5, .035, (scatter(i, 9) - .5) * 16], [.18, .07, .25], '#928b74'))],
  boat: boatAsset, ship: (a) => moved(boatAsset({ ...a, sail: true }), [0, 0, 0], 3),
  plate: (a) => [cylinder('dish', [0, .035, 0], [.7, .045, .7], c(a, '#d2c2a1')), tube('rim', [0, .07, 0], [.73, .07, .73], c(a, '#d2c2a1'), .88)], cup: cupAsset, bottle: bottleAsset,
  bread: (a) => [ball('loaf', [0, .14, 0], [.7, .28, .44], c(a, '#bb9259')), ...[-.18, 0, .18].map((x) => box(`score:${x}`, [x, .27, -.01], [.025, .012, .22], '#d9b77c', [0, .25, 0]))],
  cloth: (a) => [box('folded-cloth', [0, .07, 0], [1.1, .14, .75], c(a, '#a38580')), ...[-.3, -.1, .1, .3].map((z) => box(`weave:${z}`, [0, .148, z], [1.06, .008, .025], '#c5ae95'))],
  bag: (a) => [ball('sack', [0, .4, 0], [.75, .8, .58], c(a, '#b39b75')), tube('gathered-mouth', [0, .81, 0], [.38, .13, .33], '#94754f'), ring('strap', [0, 1.01, .05], [.62, .6, .09], P.wood, [Math.PI / 2, 0, 0])],
  basket: (a) => [tube('woven-basket', [0, .27, 0], [.8, .54, .65], c(a, '#ac8a55'), .86), ...[.08, .2, .34, .48].map((y) => ring(`woven-band:${y}`, [0, y, 0], [.82, .055, .67], '#8d6e45')), ring('handle', [0, .7, 0], [.7, .75, .08], '#8d6e45', [Math.PI / 2, 0, 0])],
  bucket: (a) => [tube('bucket', [0, .3, 0], [.65, .6, .65], c(a, P.wood), .85), ring('handle', [0, .8, 0], [.59, .65, .04], P.metal, [Math.PI / 2, 0, 0]), ...[.09, .5].map((y) => ring(`band:${y}`, [0, y, 0], [.67, .055, .67], P.metal))],
  grain: (a) => [...recipes.bag(a), ...Array.from({ length: 10 }, (_, i) => ball(`grain:${i}`, [(scatter(i) - .5) * .26, .78 + scatter(i, 2) * .08, (scatter(i, 4) - .5) * .2], [.05, .04, .07], '#d4bd7e'))],
  salt: () => [cone('salt-pile', [0, .14, 0], [.6, .28, .5], P.white), ...moved(recipes.plate({}), [0, 0, 0], .8, 'dish:')],
  gold: () => Array.from({ length: 9 }, (_, i) => cylinder(`coin:${i}`, [(scatter(i) - .5) * .6, .03 + (i % 3) * .05, (scatter(i, 3) - .5) * .45], [.23, .035, .23], P.gold)),
  rope: () => [ring('coil-outer', [0, .04, 0], [.9, .07, .9], '#bba16f'), ring('coil-middle', [0, .045, 0], [.68, .07, .68], '#bba16f'), ring('coil-inner', [0, .05, 0], [.46, .07, .46], '#bba16f'), rod('loose-end', [.39, .04, 0], [.75, .04, -.2], .032, '#bba16f')],
  lamp: lampAsset, candle: (a) => [cylinder('wax', [0, .3, 0], [.16, .6, .16], '#e3d5ad'), cylinder('saucer', [0, .035, 0], [.42, .06, .42], '#9e8358'), cone('flame', [0, .72, 0], [.09, .2, .09], a.burning === false ? '#6b594a' : '#ffca72')],
  book: (a) => [box('pages', [0, .1, 0], [.66, .14, .86], '#d8cbb0'), box('cover-top', [0, .19, 0], [.71, .035, .91], c(a, '#7a4e46')), box('cover-bottom', [0, .02, 0], [.71, .035, .91], c(a, '#7a4e46')), box('spine', [-.34, .1, 0], [.04, .2, .9], c(a, '#7a4e46'))],
  ...Object.fromEntries(['sword', 'key', 'axe', 'hammer', 'scissors'].map((kind) => [kind, (a) => toolAsset(kind, a)])),
  cauldron: (a) => [ball('iron-pot', [0, .4, 0], [.9, .75, .9], c(a, '#505857')), tube('open-rim', [0, .71, 0], [.77, .1, .77], '#454d4c', .88), cylinder('contents', [0, .745, 0], [.66, .018, .66], '#8c7c50'), ...[-1, 1].map((s) => ring(`handle:${s}`, [s * .47, .55, 0], [.2, .23, .07], P.metal, [Math.PI / 2, 0, 0]))],
  nest: (a) => [tube('twigs', [0, .14, 0], [.8, .28, .7], '#8c714e', .74), ...Array.from({length:clamp(Math.round(finite(a.eggs,0)),0,6)},(_,i) => ball(`egg:${i}`, [(i-(a.eggs-1)/2)*.2, .18, 0], [.17, .23, .16], '#e5dcc2'))],
  cradle: () => [box('bed-base', [0, .35, 0], [.72, .1, 1.15], P.wood), box('bedding', [0, .45, 0], [.6, .15, 1.05], '#d0c5ac'), ...[-1, 1].map((s) => box(`side:${s}`, [s * .36, .6, 0], [.07, .45, 1.17], P.wood)), ...[-1, 1].map((s) => part(`rocker:${s}`, 'wedge', [0, .11, s * .4], [1, .2, .11], P.wood, [0, 0, Math.PI]))],
  cart: () => [box('cart-floor', [0, .8, 0], [1.6, .15, 2.2], P.wood), ...[-1, 1].map((s) => box(`side:${s}`, [s * .79, 1.17, 0], [.13, .72, 2.2], '#9b774e')), ...[-1, 1].map((s) => ring(`wheel:${s}`, [s * 1, .5, .15], [1, .14, 1], '#584535', [0, 0, Math.PI / 2])), rod('axle', [-1.05, .5, .15], [1.05, .5, .15], .08, P.wood), rod('left-shaft', [-.65, .7, -.9], [-.65, .65, -3], .055, P.wood), rod('right-shaft', [.65, .7, -.9], [.65, .65, -3], .055, P.wood)],
  loom: () => [box('left-upright', [-.75, 1, 0], [.15, 2, .15], P.wood), box('right-upright', [.75, 1, 0], [.15, 2, .15], P.wood), box('cross-top', [0, 1.9, 0], [1.65, .15, .15], P.wood), box('cross-bottom', [0, .25, 0], [1.65, .15, .15], P.wood), ...Array.from({ length: 13 }, (_, i) => rod(`warp:${i}`, [-.65 + i * .108, .3, 0], [-.65 + i * .108, 1.85, 0], .008, '#d7c8a4')), box('woven-cloth', [0, .72, -.018], [1.3, .8, .026], '#9e6e61')],
  fish: (a) => [ball('body', [0, .18, 0], [.22, .34, .75], c(a, '#809da0')), roof('tail', [0, .2, .49], [.37, .05, .32], '#697d82'), cone('dorsal-fin', [0, .42, .07], [.04, .23, .36], '#697d82'), ...[-1, 1].map((s) => ball(`eye:${s}`, [s * .1, .23, -.27], [.035, .04, .04], P.dark))],
  ...Object.fromEntries(['bee', 'spider', 'cicada', 'mosquito'].map((kind) => [kind, (a) => insect(kind, a)])),
  tortoise: () => [ball('shell', [0, .24, 0], [.75, .42, .9], '#7c7953'), ball('head', [0, .18, -.54], [.22, .2, .26], '#92916a'), ...[-1, 1].flatMap((x) => [-1, 1].map((z) => ball(`foot:${x}:${z}`, [x * .34, .09, z * .28], [.18, .15, .21], '#92916a')))],
  chain: () => Array.from({ length: 12 }, (_, i) => ring(`link:${i}`, [0, .08 + i * .13, 0], [.18, .045, .24], P.metal, [Math.PI / 2, i % 2 ? Math.PI / 2 : 0, 0])),
  pumpkin: () => [ball('pumpkin', [0, .3, 0], [.72, .6, .67], '#b78046'), ...Array.from({ length: 8 }, (_, i) => { const t = i * Math.PI / 4; return ball(`lobe:${i}`, [Math.sin(t) * .22, .3, Math.cos(t) * .22], [.24, .56, .24], '#c68b48') }), cylinder('stem', [0, .66, 0], [.09, .2, .09], '#63704a')],
  garlic: () => [ball('bulb', [0, .13, 0], [.32, .26, .31], '#e2d9bf'), cone('neck', [0, .33, 0], [.13, .25, .13], '#c3b79a')],
  ring: (a) => [ring('jewel-band', [0, .035, 0], [.18, .04, .18], c(a,P.gold)), ball('gem', [0, .075, -.08], [.065, .06, .055], '#7b9da6')],
  crown: (a) => [tube('band', [0, .14, 0], [.55, .2, .55], c(a,P.gold), .85), ...Array.from({ length: 6 }, (_, i) => { const t = i * Math.PI / 3; return cone(`point:${i}`, [Math.sin(t) * .23, .34, Math.cos(t) * .23], [.15, .3, .14], c(a,P.gold)) })],
  flute: () => [cylinder('pipe', [0, .4, 0], [.07, .8, .07], '#b59664'), ...Array.from({ length: 6 }, (_, i) => ball(`hole:${i}`, [0, .17 + i * .08, -.037], [.025, .03, .013], P.dark))],
  lute: () => [ball('soundbox', [0, .34, 0], [.47, .62, .2], '#ab7b43'), cylinder('neck', [0, .96, 0], [.065, .76, .065], P.wood), box('soundboard', [0, .34, -.101], [.35, .46, .015], '#c49759'), cylinder('soundhole', [0, .47, -.118], [.12, .018, .12], P.dark, [Math.PI / 2, 0, 0]), rod('single-string', [0, .14, -.13], [0, 1.3, -.04], .004, P.white)],
  sun: (a) => [ball('sun-disc', [0, 0, 0], [3, 3, .3], c(a, '#e9ce83')), ...Array.from({ length: 12 }, (_, i) => { const t = i * Math.PI / 6; return rod(`ray:${i}`, [Math.sin(t) * 1.7, Math.cos(t) * 1.7, 0], [Math.sin(t) * 2.25, Math.cos(t) * 2.25, 0], .045, '#e9ce83') })],
  moon: () => [ball('moon', [0, 0, 0], [2.5, 2.5, .22], '#d9dfd4'), ball('crater-a', [-.4, .45, -.11], [.4, .4, .04], '#c0cabc'), ball('crater-b', [.42, -.2, -.11], [.65, .5, .04], '#c0cabc')],
  cloud: (a) => [ball('middle', [0, 0, 0], [4, 1.6, 1.7], c(a,'#cbd3cf')), ball('left', [-1.7, -.15, 0], [2.5, 1.25, 1.6], c(a,'#cbd3cf')), ball('right', [1.6, -.1, .2], [2.7, 1.4, 1.6], c(a,'#d5dad1'))],
  rainbow: () => Array.from({ length: 5 }, (_, band) => Array.from({ length: 14 }, (_, i) => { const t = i * Math.PI / 13; return box(`arc:${band}:${i}`, [Math.cos(t) * (5 + band * .18), Math.sin(t) * (5 + band * .18), 0], [.9, .18, .07], ['#b36f72', '#c69964', '#c2b979', '#8da583', '#7e97b5'][band], [0, 0, t - Math.PI / 2]) })).flat(),
  lightning: () => [rod('upper-bolt', [.3, 3, 0], [-.2, 1.6, 0], .08, '#e5d68f'), rod('middle-bolt', [-.2, 1.6, 0], [.35, 1.8, 0], .08, '#e5d68f'), rod('lower-bolt', [.35, 1.8, 0], [-.2, 0, 0], .08, '#e5d68f')],
  rain: () => Array.from({ length: 20 }, (_, i) => rod(`drop:${i}`, [(scatter(i) - .5) * 6, scatter(i, 3) * 4, (scatter(i, 8) - .5) * 4], [(scatter(i) - .5) * 6 -.08, scatter(i, 3) * 4 -.3, (scatter(i, 8) - .5) * 4], .012, '#a2c2cd')),
  snow: () => Array.from({ length: 20 }, (_, i) => ball(`flake:${i}`, [(scatter(i) - .5) * 6, scatter(i, 3) * 4, (scatter(i, 8) - .5) * 4], [.07, .07, .07], '#e7ede7')),
}
// Named structural variants are explicit vocabulary, never an unknown fallback.
recipes.church = (a) => [...building({ ...a, roofColor: '#676d71' }), ...moved(tower({ height: 8 }), [-3.8, 0, -1], .6, 'bell-tower:'), box('cross-vertical', [0, 7, -2.8], [.15, 1.5, .15], P.wood), box('cross-horizontal', [0, 7.3, -2.8], [.8, .15, .15], P.wood)]
recipes.mosque = (a) => [...building({ ...a, cutaway: true }), ball('dome', [0, 4.1, 0], [7.7, 5, 6.7], '#9caa9f'), cylinder('minaret', [5, 5.5, 1], [1.2, 11, 1.2], '#ccc4ae'), cone('minaret-roof', [5, 11.6, 1], [1.6, 1.5, 1.6], '#86998f')]
recipes.mill = (a) => [...building(a), ...Array.from({ length: 10 }, (_, i) => { const t = i * Math.PI / 5; return box(`wheel-paddle:${i}`, [4.7, 2 + Math.sin(t) * 1.7, Math.cos(t) * 1.7], [.9, .17, .55], P.wood, [t, 0, 0]) }), ring('waterwheel', [4.7, 2, 0], [3.5, .15, 3.5], '#705037', [0, 0, Math.PI / 2]), rod('wheel-axle', [3.8, 2, 0], [5.2, 2, 0], .15, P.wood)]
recipes.teqe = (a) => building({ ...a, roofColor: '#74836b' })
recipes.shrine = (a) => [...moved(building(a), [0, 0, 0], .45), ...moved(lampAsset({}), [0, .4, -2], 1, 'offering-lamp:')]
recipes.stall = (a) => [...tableAsset({ width: 3.5, depth: 1.8 }), ...[-1, 1].flatMap((x) => [-1, 1].map((z) => box(`pole:${x}:${z}`, [x * 1.8, 1.4, z], [.12, 2.8, .12], P.wood))), roof('awning', [0, 2.8, 0], [4, .65, 2.5], c(a, '#ab8576'))]
recipes.fountain = (a) => [...well({ ...a, covered: false, dry: false }), cylinder('central-spout', [0, 1.4, 0], [.3, 1.8, .3], P.stone), ball('water-jet', [0, 2.1, 0], [.13, 1, .13], '#a2c8c8')]
recipes.waterfall = (a) => [...water({ width: 4, length: 6 }, 'spring'), box('falling-water', [0, 3, 2], [3, 6, .16], '#94b6b8'), ...moved(rockAsset(a), [-2, 0, 2], 4, 'cliff:')]
recipes.cliff = (a) => [box('cliff-face', [0, 4, 0], [14, 8, 5], c(a, '#84877d')), ...Array.from({ length: 6 }, (_, i) => moved(rockAsset(a), [-6 + i * 2.3, .1, -2.3], 1.5, `fallen:${i}:`)).flat()]
recipes.woodpile = () => Array.from({ length: 8 }, (_, i) => cylinder(`log:${i}`, [(i % 4 - 1.5) * .3, .15 + Math.floor(i / 4) * .28, 0], [.28, 1.4, .28], P.wood, [Math.PI / 2, 0, 0]))
recipes.torch = (a) => [cylinder('haft', [0, .5, 0], [.09, 1, .09], P.wood), ball('wrapped-head', [0, 1.02, 0], [.19, .28, .19], '#6c5843'), ...(a.burning === false ? [] : [cone('flame', [0, 1.35, 0], [.25, .55, .24], '#f6b65f')])]

recipes.paper = () => [box('sheet', [0, .008, 0], [.55, .016, .75], '#e0d5b7'), ...Array.from({length: 6}, (_, i) => box(`ink-line:${i}`, [-.035, .018, -.24 + i * .08], [.34 - i % 2 * .1, .003, .008], '#786958'))]
recipes.money = () => Array.from({length: 5}, (_, i) => cylinder(`coin:${i}`, [(i % 3 - 1) * .12, .015 + Math.floor(i / 3) * .035, (i % 2) * .1], [.15, .03, .15], i % 2 ? '#b5b6ad' : '#bfaa6e'))
recipes.sack = (a) => [ball('cloth-sack', [0, .43, 0], [.7, .85, .6], c(a, '#aa956e')), cylinder('tied-neck', [0, .87, 0], [.22, .19, .2], '#aa956e'), ring('cord', [0, .83, 0], [.24, .04, .22], '#6d583b')]
recipes.lighter = () => [box('metal-case', [0, .065, 0], [.07, .13, .035], '#9d9b8b'), cylinder('striker', [0, .142, 0], [.035, .04, .035], '#545751', [Math.PI / 2, 0, 0]), box('cap', [.01, .152, 0], [.075, .025, .038], '#b9b5a4')]
recipes.wood = () => [cylinder('log', [0, .16, 0], [.32, 1.1, .32], '#775239', [Math.PI / 2, 0, 0]), cylinder('cut-end', [0, .16, -.556], [.27, .015, .27], '#b89967', [Math.PI / 2, 0, 0])]
recipes.smoke = () => Array.from({length: 6}, (_, i) => ball(`smoke:${i}`, [Math.sin(i) * .15 * i, .4 + i * .55, 0], [.6 + i * .18, .7, .6 + i * .18], '#9c9d96'))
recipes.honey = () => [tube('jar', [0, .2, 0], [.37, .4, .37], '#a97c49', .76), cylinder('honey-surface', [0, .38, 0], [.27, .015, .27], '#d39d38'), rod('wooden-spoon', [.08, .37, 0], [.24, .7, 0], .02, '#a48752')]
recipes.inscription = () => [box('stone-tablet', [0, .45, 0], [.8, .9, .15], '#b0aa96'), ...Array.from({length: 5}, (_, i) => box(`carved-line:${i}`, [-.03, .19 + i * .12, -.08], [.5 - i % 3 * .06, .016, .009], '#6f7063'))]
recipes.sign = () => [box('post', [0, .85, 0], [.1, 1.7, .1], P.wood), box('board', [0, 1.5, 0], [1.25, .48, .12], '#aa8756'), ...Array.from({length: 3}, (_, i) => box(`letter-line:${i}`, [0, 1.37 + i * .12, -.065], [.85 - i * .1, .018, .01], '#584634'))]
recipes.starfield = () => Array.from({length: 24}, (_, i) => ball(`star:${i}`, [(scatter(i) - .5) * 30, 4 + scatter(i, 4) * 12, (scatter(i, 8) - .5) * 12], [.09, .09, .09], '#e7e5c5'))

recipes.blood = () => [ball('pooled-blood', [0, .014, 0], [.7, .028, .5], '#83433d'), ball('droplet', [.35, .009, .2], [.16, .018, .12], '#83433d')]
recipes.village = (a) => [[-6,0,2],[5,0,4],[0,0,-5]].flatMap((p,i) => moved(building(a),p,.65,`house:${i}:`))
recipes.flowers = (a) => [[0,0,0],[-.35,0,.2],[.3,0,-.2]].flatMap((p,i)=>moved(flowerAsset(a),p,1,`flower:${i}:`))
recipes.leaves = (a) => Array.from({length: 8}, (_,i)=>ball(`leaf:${i}`,[(scatter(i)-.5)*1.6,.03,(scatter(i,2)-.5)*1.2],[.25,.035,.12],c(a,'#8b8453')))
recipes.meat = () => [ball('cut-meat', [0,.14,0], [.55,.28,.37], '#aa7770'), cylinder('bone', [.2,.14,0], [.11,.57,.11], '#d8c8ab', [0,0,Math.PI/2])]
recipes.cheese = () => [part('cheese-wedge','wedge',[0,.13,0],[.45,.26,.4],'#d8c584'),ball('hole-a',[-.12,.08,-.205],[.05,.05,.012],'#a89560'),ball('hole-b',[.09,.13,-.205],[.04,.04,.012],'#a89560')]
recipes.dough = () => [ball('dough', [0,.15,0],[.6,.3,.5],'#d1bf95'),ball('flour-dust',[.2,.008,.25],[.6,.016,.35],'#e0d6b6')]
recipes.rod = (a) => [cylinder('wooden-rod',[0,.8,0],[.06,1.6,.06],c(a,P.wood))]
recipes.vine = () => [...Array.from({length:8},(_,i)=>rod(`stem:${i}`,[Math.sin(i)*.2,i*.25,0],[Math.sin(i+1)*.2,(i+1)*.25,0],.018,'#64764e')), ...Array.from({length:6},(_,i)=>ball(`leaf:${i}`,[i%2?.2:-.2,.25+i*.27,0],[.33,.07,.17],'#587447'))]
recipes.feather = () => [rod('quill',[0,0,0],[0,.65,0],.01,'#bfbca4'),...Array.from({length:7},(_,i)=>ball(`vane:${i}`,[0,.12+i*.07,0],[.18*Math.sin((i+1)*Math.PI/9),.13,.025],'#c5c0a7'))]
recipes.milk = (a) => a.variant==='wall-trickle' ? [rod('milk-streak',[0,.035,0],[0,finite(a.height,.9),0],finite(a.width,.08)/2,c(a,'#f3eee3')),ball('milk-drop',[0,.08,-.012],[finite(a.width,.08)*1.3,.12,finite(a.length,.025)],c(a,'#f3eee3')),ball('small-base-stain',[0,.008,-.025],[.18,.016,.13],c(a,'#f3eee3'))] : [...cupAsset({color:'#aa9272'}),cylinder('milk-surface',[0,.39,0],[.23,.012,.23],c(a,'#e9e1c9'))]
recipes.moth = (a) => [ball('body',[0,.1,0],[.07,.12,.3],c(a,'#9b947d')),...[-1,1].map((side)=>ball(`wing:${side}`,[side*.16,.11,0],[.35,.025,.32],c(a,'#b1a992'))),...[-1,1].map((side)=>rod(`antenna:${side}`,[0,.1,-.1],[side*.08,.18,-.24],.006,'#7e7966'))]
recipes.pit = (a) => [tube('earth-rim',[0,.08,0],[3.3,.16,3.3],'#756b54',.87),tube('shaft',[0,-1,0],[3,2,3],'#625b4b',.92),cylinder('dark-depth',[0,-.04,0],[2.65,.02,2.65],'#282d29')]
recipes.moat = () => [tube('excavated-bank',[0,-.08,0],[14,.3,14],'#756b54',.65),tube('water-channel',[0,-.04,0],[13.5,.025,13.5],'#567f83',.7)]
recipes.weapon = () => [cylinder('wooden-haft',[0,.6,0],[.07,1.2,.07],P.wood),box('wrapped-grip',[0,.16,0],[.095,.3,.09],'#67594a'),cone('metal-point',[0,1.4,0],[.19,.45,.07],P.metal)]
recipes.scythe = () => [rod('handle',[0,0,0],[.05,1.6,0],.04,P.wood),rod('handgrip',[0,.8,0],[.25,.8,0],.03,P.wood),...Array.from({length:5},(_,i)=>box(`curved-blade:${i}`,[.13+i*.17,1.55-i*i*.023,0],[.24,.11-i*.014,.025],P.metal,[0,0,-i*.19]))]
recipes.club = () => [cylinder('shaft',[0,.38,0],[.1,.75,.1],P.wood),ball('heavy-head',[0,.91,0],[.25,.55,.24],'#75513a')]
recipes.cudgel = recipes.club
recipes.gunpowder = () => [cone('powder-pile',[0,.09,0],[.5,.18,.5],'#4d4d43'),...Array.from({length:7},(_,i)=>ball(`grain:${i}`,[(scatter(i)-.5)*.55,.025,(scatter(i,2)-.5)*.55],[.035,.035,.035],'#373c36'))]
recipes.fuse = () => [...Array.from({length:5},(_,i)=>rod(`cord:${i}`,[Math.sin(i*.6)*.06,.02,i*.15],[Math.sin((i+1)*.6)*.06,.02,(i+1)*.15],.018,'#a68e63'))]
recipes.head = (a) => a.variant==='dragon' ? moved(dragon({...a,variant:'heads',heads:1}),[0,0,0],.45) : [ball('head',[0,.17,0],[.31,.35,.3],a.skinColor || P.skin),ball('hair',[0,.26,.04],[.33,.22,.29],a.hairColor || '#493b32'),...[-1,1].map((side)=>ball(`closed-eye:${side}`,[side*.067,.19,-.15],[.025,.006,.015],'#493b32'))]
recipes.tongue = () => [ball('tongue',[0,.035,0],[.13,.07,.5],'#a16b68'),ball('tongue-tip',[0,.023,-.26],[.09,.04,.13],'#a16b68')]
recipes.nail = () => [cylinder('shank',[0,.16,0],[.025,.29,.025],P.metal),cylinder('nail-head',[0,.31,0],[.085,.02,.085],P.metal),cone('point',[0,.01,0],[.025,.06,.025],P.metal,[Math.PI,0,0])]
recipes.leaf = (a) => [ball('leaf-blade',[0,.025,0],[.32,.025,.14],c(a,'#8b8453')),rod('leaf-stem',[.12,.025,0],[.24,.025,0],.008,'#776a44')]
recipes.umbrella = (a) => [rod('shaft',[0,0,0],[0,1.6,0],.02,P.wood),cone('canopy',[0,1.55,0],[1.6,.35,1.6],c(a,'#637c80')),...Array.from({length:8},(_,i)=>{const t=i*Math.PI/4;return rod(`rib:${i}`,[0,1.725,0],[Math.sin(t)*.8,1.375,Math.cos(t)*.8],.008,'#aeb1a2')})]
recipes.soap = () => [ball('soap-bar',[0,.065,0],[.28,.13,.18],'#dfd1b0')]
recipes.towel = (a) => recipes.cloth({...a,color:a.color||'#c4c1ac'})
recipes.bandage = () => [cylinder('rolled-bandage',[0,.1,0],[.2,.2,.2],'#dbd6c4',[Math.PI/2,0,0]),box('unrolled-cloth',[0,.02,-.17],[.2,.025,.35],'#dbd6c4')]
recipes.spoon = () => [rod('handle',[0,.025,0],[0,.025,.35],.013,'#92744b'),ball('bowl',[0,.025,-.09],[.12,.045,.18],'#a88a60')]
recipes.medicine = () => [...bottleAsset({color:'#84916a'}),box('paper-label',[0,.29,-.153],[.18,.18,.005],'#d7d0b6')]
recipes.vegetables = () => [ball('cabbage',[0,.2,0],[.43,.4,.43],'#80966a'),cone('carrot',[.34,.06,.05],[.09,.48,.09],'#bb884b',[Math.PI/2,0,.2]),...[-1,1].map((s)=>rod(`carrot-leaf:${s}`,[.34,.1,-.18],[.34+s*.07,.2,-.28],.012,'#789264'))]
recipes.butter = () => [box('butter-block',[0,.075,0],[.3,.15,.2],'#d9c989'),box('wrapper',[0,.005,0],[.46,.01,.34],'#d8d0b4')]
recipes.hat = (a) => [ball('felt-cap',[0,.15,0],[.4,.3,.36],c(a,P.white)),tube('rim',[0,.04,0],[.4,.08,.36],c(a,P.white),.85)]
recipes.skirt = (a) => [cone('bell-skirt',[0,.45,0],[1,.9,.7],c(a,'#3a3c3b')),tube('waist',[0,.87,0],[.3,.1,.24],'#79735f',.75),...[-1,0,1].map((x)=>ball(`woven-motif:${x}`,[x*.22,.36,-.28],[.1,.11,.025],'#bdaa68'))]
recipes.knife = () => [box('handle',[0,.12,0],[.07,.24,.06],P.wood),part('blade','wedge',[0,.37,0],[.075,.29,.022],P.metal)]

recipes.cannon = () => [cylinder('barrel',[0,.85,0],[.36,2.2,.36],'#585f5b',[Math.PI/2,0,0]),tube('muzzle',[0,.85,-1.13],[.43,.12,.43],'#484f4a',.65,[Math.PI/2,0,0]),box('carriage',[0,.45,.25],[.7,.35,1.3],P.wood),...[-1,1].map((s)=>ring(`wheel:${s}`,[s*.53,.38,.3],[.8,.12,.8],P.wood,[0,0,Math.PI/2]))]
recipes.market = (a) => [-1,1].flatMap((s,i)=>moved(recipes.stall(a),[s*3,0,0],1,`stall:${i}:`))
recipes['clock-tower'] = (a) => [...tower(a),cylinder('clock-dial',[0,6,-2.03],[1.25,.05,1.25],'#d8cfb2',[Math.PI/2,0,0]),rod('hour-hand',[0,6,-2.075],[0,6.34,-2.075],.025,'#4e5149'),rod('minute-hand',[0,6,-2.08],[.38,6,-2.08],.018,'#4e5149')]
recipes.doll = () => moved(human({variant:'child'}),[0,0,0],.33)
recipes.rooster = (a) => [...birdAsset({...a,color:a.color||'#956f47'}),cone('comb',[0,.83,-.21],[.08,.17,.19],'#aa5147'),...Array.from({length:3},(_,i)=>ball(`tail-plume:${i}`,[.05*(i-1),.64+i*.09,.43],[.055,.45,.26],'#58746d'))]
recipes.goose = (a) => [...moved(birdAsset({...a,color:a.color||'#dfdccb'}),[0,0,0],1.7),rod('long-neck',[0,.7,-.3],[0,1.3,-.45],.07,'#dfdccb'),ball('goose-head',[0,1.35,-.5],[.22,.2,.3],'#dfdccb')]
recipes.hay = () => [ball('hay-bundle',[0,.4,0],[1.2,.8,.8],'#b4a36c'),...Array.from({length:10},(_,i)=>rod(`straw:${i}`,[(scatter(i)-.5)*1.1,.1,-.38],[(scatter(i,2)-.5)*1.1,.75,.4],.008,'#d1c17f'))]

recipes.butterfly = () => [ball('body',[0,.1,0],[.04,.06,.2],'#71634d'),...[-1,1].flatMap((side)=>[ball(`upper-wing:${side}`,[side*.16,.11,-.05],[.3,.018,.26],'#bb9a6a'),ball(`lower-wing:${side}`,[side*.12,.11,.11],[.22,.018,.2],'#a48670')])]
recipes.thread = () => [cylinder('spool',[0,.1,0],[.16,.2,.16],'#c5ad83'),...Array.from({length:5},(_,i)=>ring(`winding:${i}`,[0,.035+i*.03,0],[.19,.02,.19],'#b99587')),rod('loose-thread',[.08,.03,0],[.4,.01,.15],.005,'#b99587')]
recipes.grass = () => Array.from({length:12},(_,i)=>cone(`blade:${i}`,[(scatter(i)-.5)*.9,.16,(scatter(i,3)-.5)*.7],[.035,.32,.025],'#798f58'))
recipes.cabbage = () => [ball('cabbage-head',[0,.2,0],[.45,.4,.45],'#8fa579'),...[-1,1].map((side)=>ball(`leaf:${side}`,[side*.15,.17,0],[.2,.32,.39],'#799165'))]
recipes.frog = () => [ball('body',[0,.11,0],[.3,.2,.28],'#7b8e5b'),...[-1,1].flatMap((side)=>[ball(`eye:${side}`,[side*.095,.21,-.12],[.075,.07,.08],'#b5b67e'),ball(`pupil:${side}`,[side*.095,.22,-.159],[.025,.035,.015],'#303c2e'),ball(`hind-leg:${side}`,[side*.17,.055,.13],[.15,.09,.25],'#768455')])]
recipes.mouse = () => [ball('body',[0,.1,0],[.18,.2,.3],'#92877a'),ball('head',[0,.13,-.18],[.15,.15,.19],'#92877a'),...[-1,1].map((side)=>ball(`ear:${side}`,[side*.065,.24,-.16],[.095,.11,.045],'#b29e91')),rod('tail',[0,.08,.13],[.06,.03,.5],.01,'#b9a698')]
recipes.rug = (a) => [box('woven-rug',[0,.012,0],[1.7,.025,2.4],c(a,'#a18572')), ...Array.from({length:12},(_,i)=>rod(`fringe:${i}`,[-.75+i*.135,.012,-1.2],[-.75+i*.135,.012,-1.34],.01,'#baa989'))]

recipes.lion = (a) => [...quadruped(a,'lion'),ball('mane',[0,1.48,-.96],[.94,.95,.77],a.maneColor||'#8e713e'),ball('face',[0,1.5,-1.26],[.57,.59,.33],c(a,'#b59358')), ...[-1,1].map((s)=>ball(`lion-eye:${s}`,[s*.16,1.62,-1.43],[.055,.05,.025],'#383b2d'))]
recipes.tiger = (a) => [...quadruped(a,'tiger'),...Array.from({length:7},(_,i)=>box(`stripe:${i}`,[0,1.35,-.75+i*.24],[.88,.04,.07],'#62503b'))]
recipes.straw = () => Array.from({length:10},(_,i)=>rod(`straw:${i}`,[(scatter(i)-.5)*.7,.02,-.45],[(scatter(i,3)-.5)*.7,.02,.45],.01,'#c3ad73'))
recipes.fruit = (a) => [ball('fruit',[0,.14,0],[.29,.28,.28],c(a,'#aa7458')),rod('stem',[0,.25,0],[.02,.33,0],.01,P.wood),ball('leaf',[.05,.3,0],[.12,.015,.06],'#7b925c')]
recipes.clothes = (a) => [box('shirt-body',[0,.025,0],[.5,.05,.7],c(a,'#b4a58d')),box('left-sleeve',[-.34,.025,-.2],[.28,.05,.23],c(a,'#b4a58d'),[0,-.3,0]),box('right-sleeve',[.34,.025,-.2],[.28,.05,.23],c(a,'#b4a58d'),[0,.3,0]), ...[-1,1].map((side)=>box(`trouser-leg:${side}`,[side*.14,.025,.55],[.23,.05,.65],'#77766b'))]
recipes.shadow = () => [ball('body-shadow',[0,.006,0],[.65,.012,1.1],'#465149'),ball('head-shadow',[0,.006,-.63],[.3,.012,.3],'#465149')]
recipes.skin = () => snake({color:'#b8b09a'}).map((p)=>({...p,position:[p.position[0],p.position[1]*.12,p.position[2]],size:[p.size[0],p.size[1]*.12,p.size[2]],id:'shed:'+p.id}))
recipes.oven = (a) => [box('oven-base',[0,.45,0],[2.1,.9,1.8],'#aaa085'),ball('oven-dome',[0,1.1,0],[2.1,1.3,1.8],'#b0a48c'),box('dark-mouth',[0,.91,-.91],[.7,.55,.035],'#30372f'),...(a.burning===false?[]:[cone('inner-fire',[0,.78,-.94],[.23,.27,.015],'#d89a51')])]
recipes.cage = () => [box('floor',[0,.04,0],[1.3,.08,1.1],P.wood),box('roof',[0,1.3,0],[1.3,.08,1.1],P.wood), ...Array.from({length:7},(_,i)=>[-1,1].flatMap((side)=>[rod(`front-bar:${i}:${side}`,[-.55+i*.185,.04,side*.5],[-.55+i*.185,1.3,side*.5],.018,P.metal),rod(`side-bar:${i}:${side}`,[side*.6,.04,-.46+i*.153],[side*.6,1.3,-.46+i*.153],.018,P.metal)])).flat()]
recipes.statue = (a) => [...human({color:a.color||'#a8aca0',skinColor:a.color||'#a8aca0',hairColor:a.color||'#a8aca0'}),box('plinth',[0,.05,0],[.8,.1,.65],P.stone)]
recipes.swallow = (a) => [...birdAsset({...a,color:a.color||'#4a5960'}),...[-1,1].map((side)=>part(`forked-tail:${side}`,'wedge',[side*.12,.37,.62],[.11,.03,.45],'#4a5960',[0,side*.25,0]))]
recipes['light-ray'] = (a) => [cone('shaft-of-light',[0,2,0],[.5,4,.5],c(a,'#d8d3a9'))]
recipes.room = recipes.interior
recipes.iron = recipes.chain
recipes.stars = recipes.starfield
recipes.needle = () => [rod('needle-shaft',[0,.04,0],[0,.04,.47],.004,P.metal),ring('needle-eye',[0,.04,.49],[.025,.006,.04],P.metal)]
recipes['salt-pan'] = () => [box('pan-bed',[0,.025,0],[3,.05,2],'#b8b69e'),...[-1,1].map((side)=>box(`edge:${side}`,[side*1.5,.11,0],[.08,.2,2.1],P.wood)),box('salt-layer',[0,.07,0],[2.8,.035,1.8],'#e0ddd0')]
recipes.shore = () => [box('sand-bank',[0,-.025,0],[18,.05,8],'#b7aa82'),...Array.from({length:7},(_,i)=>moved(rockAsset({color:'#a5a99a'}),[-7+i*2.3,.02,(scatter(i)-.5)*4],.4,`shore-stone:${i}:`)).flat()]
recipes.hair = (a) => Array.from({length:9},(_,i)=>rod(`strand:${i}`,[(i-4)*.03,.025,-.3],[(i-4)*.025,.025,.3],.008,c(a,'#594d3f')))

recipes.dust = () => Array.from({length:9},(_,i)=>ball(`dust:${i}`,[(scatter(i)-.5)*1.8,.12+scatter(i,3)*.9,(scatter(i,7)-.5)*1.1],[.16,.12,.16],'#b7ad8e'))

recipes.distaff = () => [cylinder('wooden-staff',[0,.8,0],[.045,1.6,.045],P.wood),ball('wrapped-fiber',[0,1.4,0],[.28,.65,.25],'#c6b58c'),...Array.from({length:5},(_,i)=>ring(`binding:${i}`,[0,1.15+i*.1,0],[.25,.012,.23],'#8a774e'))]
recipes.flax = () => [...Array.from({length:10},(_,i)=>rod(`flax-stalk:${i}`,[(i-4.5)*.028,0,0],[(i-4.5)*.045,.8,0],.007,'#b4a379')),...[-1,0,1].map((x)=>ball(`fiber:${x}`,[x*.08,.78,0],[.16,.22,.13],'#d4c39c'))]
recipes.flour = () => [cone('flour-pile',[0,.12,0],[.6,.24,.6],'#dfd6bc'),ball('flour-dust',[.18,.008,.19],[.5,.016,.4],'#d2c9b1')]
recipes.millstone = () => [tube('stone-wheel',[0,.22,0],[1.7,.44,1.7],'#9ea293',.16),...Array.from({length:8},(_,i)=>{const t=i*Math.PI/4;return rod(`grinding-groove:${i}`,[Math.sin(t)*.16,.447,Math.cos(t)*.16],[Math.sin(t+.22)*.75,.447,Math.cos(t+.22)*.75],.01,'#757d71')})]
recipes.shoe = (a) => [ball('toe',[0,.08,-.08],[.21,.14,.38],c(a,'#6c5340')),box('sole',[0,.025,-.025],[.22,.05,.41],'#4e4638'),tube('ankle-opening',[0,.14,.08],[.18,.19,.19],c(a,'#6c5340'),.65),...[-1,0,1].map((i)=>rod(`lace:${i}`,[-.045,.153,-.07+i*.035],[.045,.153,-.07+i*.035],.007,'#a48b6a'))]
recipes.shoes = (a) => [-1,1].flatMap((side)=>moved(recipes.shoe(a),[side*.16,0,0],1,`shoe:${side}:`))

recipes.wax = () => [cylinder('beeswax-cake',[0,.08,0],[.45,.16,.45],'#c9b57b'),box('wax-piece',[.26,.05,.15],[.17,.1,.16],'#cfbd86')]
recipes.web = () => [...Array.from({length:8},(_,i)=>{const t=i*Math.PI/4;return rod(`radial:${i}`,[0,0,0],[Math.sin(t)*.65,Math.cos(t)*.65,0],.006,'#c4cabe')}),...Array.from({length:4},(_,ringIndex)=>Array.from({length:8},(_,i)=>{const a=i*Math.PI/4,b=(i+1)*Math.PI/4,r=.13+ringIndex*.15;return rod(`spiral:${ringIndex}:${i}`,[Math.sin(a)*r,Math.cos(a)*r,0],[Math.sin(b)*r,Math.cos(b)*r,0],.005,'#c4cabe')})).flat()]
recipes.crossroads = (a) => [...recipes.road({width:4,length:18,...a}),...recipes.road({width:4,length:18,...a}).map((p)=>({...p,id:'cross:'+p.id,position:[p.position[2],p.position[1]+.006,-p.position[0]],rotation:[p.rotation[0],p.rotation[1]+Math.PI/2,p.rotation[2]]}))]
const foldedCloth=recipes.cloth
recipes.cloth = (a) => a.variant==='rug'?recipes.rug(a):a.variant==='shirt'?recipes.clothes(a).filter((p)=>!p.id.startsWith('trouser')):foldedCloth(a)
recipes.gate = (a) => [...archAsset(a),...(a.open===false || a.closed ? [...Array.from({length:7},(_,i)=>cylinder(`gate-bar:${i}`,[-1.15+i*.38,1.5,0],[.08,3,.08],P.metal)),box('cross-beam',[0,1.5,0],[2.7,.12,.15],P.wood)] : [])]

recipes.leather = (a) => {const parts=[ball('hide-center',[0,.025,0],[1.3,.05,1.6],c(a,'#a28766')),...[-1,1].flatMap((x)=>[-1,1].map((z)=>ball(`hide-lobe:${x}:${z}`,[x*.57,.023,z*.55],[.5,.045,.5],c(a,'#a28766'))))];return a.hanging?parts.map((p)=>({...p,position:[p.position[0],1+p.position[2],p.position[1]],rotation:[Math.PI/2,0,0]})):parts}

recipes.hand = (a) => {
  const skin=a.skinColor || P.skin,bent=a.bent || a.twisted,parts=[rod('forearm',[0,0,.12],[0,.2,0],.045,skin),ball('palm',[0,.28,0],[.16,.2,.07],skin)]
  for(let finger=0;finger<4;finger++) {
    const x=(finger-1.5)*.037,length=[.2,.25,.23,.18][finger],joints=[[x,.34,0],[x+(bent?.04:0),.34+length*.4,bent?-.065:-.006],[x+(bent?-.035:0),.34+length*.72,bent?-.11:-.014],[x+(bent?.045:0),.34+length,bent?-.06:-.025]]
    for(let joint=0;joint<3;joint++)parts.push(rod(`finger:${finger}:joint:${joint}`,joints[joint],joints[joint+1],.0115,skin))
    parts.push(ball(`fingertip:${finger}`,joints[3],[.023,.027,.023],skin))
  }
  parts.push(rod('thumb-base',[-.06,.23,0],[-.11,.28,-.025],.018,skin),rod('thumb-tip',[-.11,.28,-.025],bent?[-.065,.34,-.075]:[-.13,.34,-.025],.014,skin))
  return parts
}

const NAMED_COLORS = Object.freeze({white:'#e8e3d4',silver:'#adb5b6',blue:'#597c9a',black:'#323635','dark-blue':'#384f67',gold:'#cfad54',red:'#a76156',green:'#587c59',brown:'#795d47',dark:'#3f4945',yellow:'#ccba71',gray:'#8b8e86',grey:'#8b8e86',pink:'#c1978d',purple:'#877187',orange:'#bb894f'})
const LYING_ASSETS = new Set(['horse','donkey','wolf','dog','fox','goat','sheep','ram','bull','bear','deer','pig','cat','dragon','snake','bird','eagle'])
function modelState(parts, asset, a) {
  let result=parts
  if (LYING_ASSETS.has(asset) && (a.dead || ['dead','lying','sleeping'].includes(a.pose))) result=asset==='snake' ? placeOnGround(result.map((p)=>({...p,position:[p.position[0],p.position[1]*.6,p.position[2]],size:[p.size[0],p.size[1]*(p.id.startsWith('eye:')?.12:.6),p.size[2]]}))) : placeOnGround(result.map((p)=>{const match=asset==='dragon'&&p.id.match(/^head:(\d+):/),fan=match?(Number(match[1])-(finite(a.heads,1)-1)/2)*1.3:0;return {...p,position:[-p.position[1],p.position[0]-fan,p.position[2]+fan],rotation:[p.rotation[0],p.rotation[1],p.rotation[2]+Math.PI/2]}}))
  if (a.size === 'small') result=moved(result,[0,0,0],.6)
  if (a.pose === 'bending') result=result.map((p)=>p.position[1]>.9?{...p,position:[p.position[0],.9+(p.position[1]-.9)*.65,p.position[2]-(p.position[1]-.9)*.7],rotation:[p.rotation[0]-.5,p.rotation[1],p.rotation[2]]}:p)
  if (a.pose === 'eating') result=result.map((p)=>p.id.startsWith('hand:')||p.id.startsWith('forearm:')?{...p,position:[p.position[0]*.35,p.position[1]+.5,p.position[2]-.2],rotation:[p.rotation[0]-.7,p.rotation[1],p.rotation[2]]}:p)
  if (a.size === 'large') result=moved(result,[0,0,0],1.5)
  if (a.scale === 'small') result=moved(result,[0,0,0],.5)
  if (a.age === 'baby') result=moved(result,[0,0,0],.6)
  if (a.frozen && ['water','river','lake','spring','sea'].includes(asset)) result=result.map((p)=>({...p,color:p.id==='water-surface'?'#b7cdce':p.id.startsWith('ripple:')?'#e4e9dd':p.color}))
  if (a.reflection) result=result.map((p)=>({...p,position:[p.position[0],.04+p.position[2]*.025,-p.position[1]],rotation:[Math.PI/2+p.rotation[0],p.rotation[1],p.rotation[2]],size:[p.size[0],p.size[1],p.size[2]*.05]}))
  if (a.brightness === 'dim') result=result.map((p)=>({...p,color:'#7b7761'}))
  if (a.glowing) result=result.map((p)=>({...p,color:'#d7d7a4'}))
  if (a.intensity === 'dying') result=result.map((p)=>p.id.startsWith('flame')?{...p,position:[p.position[0],p.position[1]*.55,p.position[2]],size:[p.size[0]*.6,p.size[1]*.4,p.size[2]*.6]}:p)
  if (a.motion && !['waiting','still','stopped'].includes(a.motion) || ['walking','attacking','dancing'].includes(a.pose)) result=result.map((p)=>p.id.startsWith('lower-leg') || p.id.startsWith('shoe')?{...p,position:[p.position[0],p.position[1],p.position[2]+(p.id.endsWith('-1')?.17:-.17)]}:p.id.startsWith('forearm')?{...p,rotation:[p.rotation[0]+.3,p.rotation[1],p.rotation[2]]}:p)
  if (a.wet) result=result.map((p)=>({...p,color:'#'+[1,3,5].map((i)=>Math.round(parseInt(p.color.slice(i,i+2),16)*.8).toString(16).padStart(2,'0')).join('')}))
  if (a.material) {const color={iron:'#7f8987',wood:'#8e6d46',clay:'#b89b7e',marble:'#c8c9bd',stone:'#a0a69b'}[a.material];if(color)result=result.map((p)=>({...p,color}))}
  if (a.knees === false && ['human','giant'].includes(asset)) { result=result.filter((p)=>!p.id.startsWith('upper-leg:')&&!p.id.startsWith('lower-leg:')); const factor=asset==='giant'?3:1;for(const side of [-1,1]) result.push(rod(`rigid-leg:${side}`,[side*.14*factor,.88*factor,0],[side*.14*factor,.13*factor,0],.085*factor,'#56515a')) }
  if (a.pose==='attacking' && ['wolf','dog','lion','tiger','bear'].includes(asset)) result=result.map((p)=>p.id.startsWith('leg:')?{...p,rotation:[p.rotation[0]-.35,p.rotation[1],p.rotation[2]]}:p)
  if (a.pose==='tired' && ['eagle','bird'].includes(asset)) result=result.map((p)=>p.id.startsWith('wing:')?{...p,rotation:[p.rotation[0],p.rotation[1],p.rotation[2]+(p.id.endsWith('-1')?.4:-.4)]}:p)
  if (a.young) result=moved(result,[0,0,0],.65)
  if (a.twisted && ['human','person','man','woman'].includes(asset)) result=result.map((p)=>p.id.startsWith('forearm:')||p.id.startsWith('lower-leg:')?{...p,rotation:[p.rotation[0]+.7,p.rotation[1],p.rotation[2]+(p.id.endsWith('-1')?.8:-.8)]}:p)
  if (a.headless) result=result.filter((p)=>!['head','hair','nose','neck'].includes(p.id)&&!p.id.startsWith('eye:'))
  if (a.eyesClosed) result=result.map((p)=>p.id.includes('eye')?{...p,size:[p.size[0],.008,p.size[2]]}:p)
  if (a.wounds) result.push(...Array.from({length:clamp(a.wounds,1,20)},(_,i)=>ball(`wound:${i}`,[(i%3-1)*.11,.5+Math.floor(i/3)*.17,-.152],[.055,.09,.016],'#974f45')))
  if (a.face==='fire') result.push(...Array.from({length:4},(_,i)=>cone(`face-flame:${i}`,[(i-1.5)*.07,1.7,-.2],[.08,.3,.08],'#df995a')))
  if (a.fire && ['dragon','snake'].includes(asset)) result.push(...Array.from({length:4},(_,i)=>cone(`breathed-flame:${i}`,[(i%2-.5)*.15,asset==='dragon'?2.8:.2,-(asset==='dragon'?3.2:1.5)-i*.3],[.3,.65,.3],'#e5a15c',[Math.PI/2,0,0])))
  if (a.clothingMaterial==='leaves') result.push(...Array.from({length:8},(_,i)=>ball(`leaf-garment:${i}`,[(i%3-1)*.17,.8+Math.floor(i/3)*.18,-.16],[.23,.25,.055],'#718b57')))
  if (a.lice) result.push(...Array.from({length:4},(_,i)=>ball(`louse:${i}`,[(i-1.5)*.045,1.83,-.085],[.018,.012,.018],'#3e4738')))
  if (a.fallen && asset==='chain') result=result.map((p)=>({...p,position:[p.position[0],.04+p.position[2],p.position[1]],rotation:[p.rotation[0]+Math.PI/2,p.rotation[1],p.rotation[2]]}))
  if (a.frozen && ['rock','stone'].includes(asset)) result.push(ball('ice-crust',[0,.67,0],[1.15,.22,.85],'#bccfd0'))
  if (a.inscription && asset==='wall') result.push(...Array.from({length:4},(_,i)=>box(`inscribed-line:${i}`,[0,1.1+i*.18,-.315],[1.5-i*.12,.025,.008],'#60695f')))
  if (a.locked && asset==='door') result.push(box('locking-bar',[0,1.15,-.15],[1.78,.14,.13],'#696f65'))
  if (a.contents==='tea' && asset==='basket') result.push(...Array.from({length:6},(_,i)=>ball(`tea-leaf:${i}`,[(i%3-1)*.12,.58,Math.floor(i/3)*.13-.065],[.2,.03,.08],'#7b8d5c')))
  if (a.color && ['feather','thread'].includes(asset)) result=result.map((p)=>({...p,color:a.color}))
  if (a.variant==='pastry' && asset==='bread') result=result.map((p)=>({...p,size:[p.size[0]*.7,p.size[1]*.65,p.size[2]],color:'#bc9d65'}))
  if (a.dew && asset==='flower') result.push(...[-1,1].map((side)=>ball(`dew:${side}`,[side*.1,.7,0],[.04,.04,.04],'#b5cbd0')))
  if (a.withered && asset==='flower') result=result.map((p)=>({...p,color:p.id==='stem'?'#8b855f':'#a09279',position:[p.position[0]+p.position[1]*.25,p.position[1]*.8,p.position[2]]}))
  if (a.scar && asset==='mountain') result.push(box('mountain-cleft',[0,7,-5.2],[.35,10,.5],'#565f5b',[.25,0,.25]))
  if (a.breath && asset==='horse') result.push(ball('visible-breath',[0,1.7,-1.85],[.4,.25,.55],'#bcc7bd'))
  if (a.portrait && asset==='ring') result.push(ball('engraved-portrait',[0,.106,-.08],[.025,.004,.03],'#7f765c'))
  if (a.condition==='poor' && ['house','hut'].includes(asset)) result=result.map((p)=>p.id.includes('roof')?{...p,color:'#807a66',rotation:[.025,0,.015]}:p)
  if (a.horns && asset==='snake') result.push(...Array.from({length:a.horns},(_,i)=>cone(`horn:${i}`,[(i-(a.horns-1)/2)*.12,.39,-1.4],[.08,.25,.08],a.hornMaterial==='gold'?P.gold:P.white)))
  if (a.wings===1 && ['bird','rooster','eagle'].includes(asset)) result=result.filter((p)=>p.id!=='wing:1')
  if (a.legs===1 && ['bird','rooster','eagle'].includes(asset)) result=result.filter((p)=>p.id!=='right-leg')
  if (a.motifs && ['rug','cloth'].includes(asset)) for(const [i,motif] of a.motifs.entries()) {const x=(i-(a.motifs.length-1)/2)*.55,ink=motif.color || '#665349';if(motif.kind==='sun') {result.push(ring(`motif:${i}:sun`,[x,.151,0],[.3,.008,.3],ink));for(let ray=0;ray<8;ray++){const t=ray*Math.PI/4;result.push(rod(`motif:${i}:ray:${ray}`,[x+Math.sin(t)*.17,.151,Math.cos(t)*.17],[x+Math.sin(t)*.24,.151,Math.cos(t)*.24],.009,ink))}}else if(motif.kind==='snake')for(let k=0;k<5;k++)result.push(rod(`motif:${i}:snake:${k}`,[x+Math.sin(k)*.08,.151,(k-2)*.1],[x+Math.sin(k+1)*.08,.151,(k-1)*.1],.013,ink))}
  if (a.hanging && asset==='rope') result=[rod('hanging-rope',[0,0,0],[0,a.length||4,0],.025,'#bba16f'),ring('top-loop',[0,(a.length||4)+.12,0],[.2,.04,.24],'#bba16f',[Math.PI/2,0,0])]
  if (a.wounded && ['eagle','bird','swallow'].includes(asset)) result.push(ball('wing-wound',[-.52,.98,.1],[.2,.02,.16],'#99584d'))
  if (a.cut && asset==='rope') result=[rod('cut-end-a',[-.8,.04,0],[-.1,.04,0],.035,'#bba16f'),rod('cut-end-b',[.13,.04,.03],[.8,.04,.05],.035,'#bba16f')]
  if (a.burning && asset==='fuse') result.push(cone('burning-tip',[0,.1,.77],[.08,.16,.08],'#edb765'))
  if (a.tears && ['human','person','woman','man','giant','child','horse'].includes(asset)) result.push(...[-1,1].map((side)=>ball(`tear:${side}`,[side*(asset==='horse'?.26:.066),asset==='horse'?1.95:1.64,asset==='horse'?-1.38:-.166],[.018,.07,.018],'#8fa7a6')))
  if (a.mark && ['rock','stone'].includes(asset)) { const ink=a.markColor || '#625b48'; if(a.mark==='horse') result.push(ball('horse-mark-body',[0,.48,-.51],[.32,.12,.008],ink),rod('horse-mark-neck',[.1,.48,-.515],[.15,.65,-.515],.018,ink),...[-1,1].map((side)=>rod(`horse-mark-leg:${side}`,[side*.11,.44,-.515],[side*.12,.28,-.515],.012,ink))); else if(a.mark==='zojz') result.push(rod('zojz-mark-vertical',[0,.3,-.52],[0,.64,-.52],.012,ink),rod('zojz-mark-horizontal',[-.17,.48,-.52],[.17,.48,-.52],.012,ink)) }
  if (a.broken && ['bridge','fence','wall','door','cart','tower','house'].includes(asset)) result=result.filter((p,i)=>i%5!==2).map((p,i)=>i%7===0?{...p,rotation:[p.rotation[0],p.rotation[1],p.rotation[2]+.23]}:p)
  return result
}

export const WORLD_SCENE_3D_ASSET_IDS = Object.freeze(Object.keys(recipes).sort())
export const WORLD_SCENE_3D_ASSETS = Object.freeze(Object.fromEntries(WORLD_SCENE_3D_ASSET_IDS.map((id) => [id, Object.freeze({ id, source: 'src/game/worldScene3dAssets.js', scaleAuthority: 'illustrative-human-scale', presentOnlyWhenClaimed: true })])))
export function buildAssetParts(asset, attributes = {}) {
  if (!Object.hasOwn(recipes, asset)) throw new Error(`Unknown world 3D asset: ${String(asset)}`)
  if (attributes == null || typeof attributes !== 'object' || Array.isArray(attributes)) throw new Error(`${asset}: asset attributes must be an object`)
  const normalized = { ...attributes }
  for (const key of ['color','clothingColor','hairColor','skinColor','hatColor','roofColor','hornColor','markColor','headscarfColor']) if (normalized[key] && NAMED_COLORS[normalized[key]]) normalized[key] = NAMED_COLORS[normalized[key]]
  if (normalized.age === 'child' || normalized.age === 'baby') normalized.variant = 'child'
  if (normalized.age === 'old' && !normalized.hairColor) normalized.hairColor = '#b5b1a0'
  if (normalized.gender === 'woman') normalized.skirt = true
  if (normalized.clothingStyle === 'men') normalized.skirt = false
  if (normalized.held) normalized.heldItem = normalized.held === 'staff' ? 'rod' : normalized.held
  if (normalized.large) normalized.size = 'large'
  if (normalized.wound) normalized.wounded = true
  if (normalized.ice) normalized.frozen = true
  if (normalized.interior) normalized.cutaway = true
  if (normalized.pose === 'seated') normalized.pose = 'sitting'
  if (normalized.surface === 'wet') normalized.wet = true
  if (normalized.surface === 'dry') normalized.wet = false
  if (normalized.variant === 'shadow') normalized.skinColor = normalized.hairColor = normalized.clothingColor = '#343b37'
  const result = modelState(recipes[asset](normalized), asset, normalized)
  const ids = new Set()
  for (const entry of result) {
    if (ids.has(entry.id)) throw new Error(`${asset}: duplicate asset part ${entry.id}`)
    ids.add(entry.id)
    if (!entry.position.every(Number.isFinite) || !entry.size.every((n) => Number.isFinite(n) && n > 0) || !entry.rotation.every(Number.isFinite) || !/^#[a-f\d]{6}$/i.test(entry.color)) throw new Error(`${asset}.${entry.id}: invalid asset geometry/material`)
  }
  return result
}
export function worldScene3dAssetBounds(asset, attributes = {}) {
  const parts = buildAssetParts(asset, attributes), min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity]
  for (const entry of parts) {
    // Rotation-safe enclosing bounds. Exact polygon bounds are available in
    // the renderer; this conservative envelope is for authored staging only.
    const radius = Math.hypot(...entry.size) / 2
    for (let axis = 0; axis < 3; axis++) { min[axis] = Math.min(min[axis], entry.position[axis] - radius); max[axis] = Math.max(max[axis], entry.position[axis] + radius) }
  }
  return { min, max, size: min.map((v, i) => max[i] - v), center: min.map((v, i) => (max[i] + v) / 2) }
}

export const assetBounds = worldScene3dAssetBounds

// Attributes which do not have a faithful static visual treatment are reported
// explicitly. Source inclusion is not evidence that a state was rendered.
const GEOMETRIC_ATTRIBUTES = new Set(['held','large','bent','twisted','wound','ice','wounds','material','clothingMaterial','clothingStyle','face','young','fire','headless','inscription','lice','eyesClosed','breath','portrait','fallen','condition','dew','withered','scar','locked','color','clothingColor','hairColor','skinColor','hatColor','headscarfColor','roofColor','width','height','depth','length','cutaway','interior','open','closed','covered','eggs','dry','water','waterLevel','variant','count','snow','bare','season','pose','dead','skirt','hat','beard','heldItem','heldAttributes','sail','empty','burning','eyes','blinded','knees','eyeStar','mark','marking','wings','legs','heads','horns','hornMaterial','motifs','hornColor','markColor','drink','contents','frozen','hanging','wounded','cut','tears','headwear','hair','age','gender','size','scale','reflection','brightness','glowing','intensity','motion','wet','broken','surface'])
const NONVISUAL_ATTRIBUTES = new Set(['owner','relationship','hunger','temperature','amount','sourceColor','exposed','interpretation','countExact','headCountExact','blocksEntrance','currency','value','narrativeDomain'])
export function worldScene3dAssetAttributeReview(asset, attributes = {}) {
  if (!WORLD_SCENE_3D_ASSETS[asset]) throw new Error(`Unknown world 3D asset: ${String(asset)}`)
  const rendered=[],metadataOnly=[],unsupported=[]
  for(const [key,value] of Object.entries(attributes)) {
    const entry={property:key,value}
    if(NONVISUAL_ATTRIBUTES.has(key))metadataOnly.push({...entry,reason:'Retained source information; no static geometry is claimed for this property.'})
    else {
      const without={...attributes};delete without[key]
      const changed=JSON.stringify(buildAssetParts(asset,attributes))!==JSON.stringify(buildAssetParts(asset,without))
      if(changed && GEOMETRIC_ATTRIBUTES.has(key))rendered.push(entry)
      else if(GEOMETRIC_ATTRIBUTES.has(key))metadataOnly.push({...entry,reason:'This attribute makes no additional mesh change in the current asset configuration; inspect the exact source claim.'})
      else unsupported.push({...entry,reason:'No reviewed visual treatment exists for this attribute.'})
    }
  }
  return {asset,rendered,metadataOnly,unsupported}
}
