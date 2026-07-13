import { useMemo, useState, useEffect, useRef } from 'react'
import { STORY, START_NODE, ENDINGS, lineOf } from '../game/content.js'
import { FOLKLORE, ENDING_LORE, CORPUS, HISTORY, REPO_BLOB } from '../game/folklore.js'
import { QUOTES, quoteTier, quoteProofUrl } from '../game/quotes.js'
import { REGIONS, isWander, assignRegions } from '../game/regions.js'
import { WORLD_GLYPH, WORLD_LANDMARKS, genericGlyph } from './mapGlyphs.jsx'
import { NODE_POS, PLACE_OF } from './nodePositions.js'
import { PLACE_META } from './placeMeta.js'
import { fireStateOf, liveNpcs } from '../game/gameState.js'

// nodes that get a bespoke landmark glyph in an outer region (not a plain dot)
const LANDMARK_IDS = new Set(WORLD_LANDMARKS.map((l) => l.id))

// ===========================================================================
// DEBUG VIEW — a review console, only reachable in debug mode (click the title
// 5×). Three tools to make the story easy to review and fact-check:
//   • Story Graph   — the whole node graph, laid out by depth, click for detail
//   • World Map     — the open-world hubs and how the districts connect
//   • Folklore      — every real legend the game draws on, with source links
//                     and which endings reference it (cross-check accuracy)
// ===========================================================================

// --- render a token line as plain Albanian / English (no discovery state) ---
const tidy = (s) => s.replace(/\s+([.!?:,;])/g, '$1').replace(/\s+/g, ' ').trim()
const albanianOf = (line) => tidy(line.map((t) => (t.paren ? t.en : t.al)).join(' '))
const englishOf = (line) => tidy(line.map((t) => t.en).join(' '))

const KIND_COLOR = {
  start: '#4aa3ff',
  hub: '#b07bff',
  good: '#3ec46d',
  secret: '#e7b53c',
  bad: '#e5544b',
  node: '#7b8794',
}
const KIND_LABEL = {
  start: 'start', hub: 'hub', good: 'good ending', secret: 'secret ending', bad: 'bad ending', node: 'scene',
}

// BFS depth from START_NODE over the real (non-confuser) navigation edges.
export function buildGraph() {
  const ids = Object.keys(STORY)
  const adj = {}
  for (const id of ids) {
    adj[id] = []
    for (const o of STORY[id].options || []) {
      if (!o.confuser && o.to && STORY[o.to]) adj[id].push(o.to)
    }
  }
  const depth = { [START_NODE]: 0 }
  const q = [START_NODE]
  while (q.length) {
    const u = q.shift()
    for (const v of adj[u]) if (depth[v] == null) { depth[v] = depth[u] + 1; q.push(v) }
  }
  const reached = Object.keys(depth).length
  let maxD = 0
  for (const d of Object.values(depth)) maxD = Math.max(maxD, d)
  for (const id of ids) if (depth[id] == null) depth[id] = maxD + 1 // unreachable bucket
  const kindOf = (id) => {
    const n = STORY[id]
    if (id === START_NODE) return 'start'
    if (n.end) return n.end
    if (adj[id].length >= 4) return 'hub'
    return 'node'
  }
  return { ids, adj, depth, maxD, reached, kindOf, hubs: ids.filter((id) => adj[id].length >= 4) }
}

function NodeDetail({ id, onPick, goLore }) {
  const n = STORY[id]
  const lore = n.end && ENDING_LORE[id] ? FOLKLORE.find((f) => f.id === ENDING_LORE[id]) : null
  return (
    <div className="dbg-detail">
      <div className="dbg-detail-head">
        <code>{id}</code>
        {n.end && <span className={'dbg-tag ' + n.end}>{n.end} ending</span>}
        {n.title && <b>{n.title}</b>}
        {lore && (
          <button className="dbg-tag dbg-tag-btn node" title={'open ' + lore.title + ' in the Folklore library'}
                  onClick={() => goLore(lore.id)}>
            📖 {lore.title} →
          </button>
        )}
      </div>
      <div className="dbg-lines">
        {n.text.map(lineOf).map((line, i) => (
          <div className={'dbg-line' + (line.quote ? ' dbg-quote' : '')} key={i}>
            <span className="dbg-al">{albanianOf(line)}</span>
            <span className="dbg-en">{englishOf(line)}</span>
            {line.quote && (() => {
              // reviewer view: attribution links straight to the registered proof
              const q = line.quoteId ? QUOTES[line.quoteId] : null
              const href = q ? quoteProofUrl(q, REPO_BLOB) : null
              const tip = q ? `${q.original}\n— ${q.translation}\n[proof tier: ${quoteTier(q)}]` : null
              return href ? (
                <a className="dbg-quote-src" href={href} target="_blank" rel="noreferrer" title={tip}>
                  📜 {line.quote} ({quoteTier(q)})
                </a>
              ) : (
                <span className="dbg-quote-src" title={tip}>
                  📜 {line.quote}{q ? ` (${quoteTier(q)})` : ''}
                </span>
              )
            })()}
          </div>
        ))}
      </div>
      {n.blurb && <p className="dbg-blurb">{n.blurb}</p>}
      {n.options?.length > 0 && (
        <div className="dbg-opts">
          {n.options.map((o, i) => {
            const tgt = o.to && STORY[o.to]
            return (
              <div className={'dbg-opt' + (o.confuser ? ' confuser' : '')} key={i}>
                <span className="dbg-opt-al">{albanianOf(o.text)}</span>
                <span className="dbg-opt-en">{englishOf(o.text)}</span>
                <span className="dbg-opt-flags">
                  {o.confuser && <span className="dbg-flag bad">confuser</span>}
                  {o.reveal && <span className="dbg-flag">reveal:{o.reveal}</span>}
                  {o.requires && <span className="dbg-flag">needs:{o.requires}</span>}
                  {o.unless && <span className="dbg-flag">hidden-if:{o.unless}</span>}
                  {o.grant && <span className="dbg-flag good">+{o.grant}</span>}
                  {o.consumes && <span className="dbg-flag">−{o.consumes}</span>}
                  {tgt ? (
                    <button className="dbg-jump" onClick={() => onPick(o.to)}>
                      → {o.to}{tgt.end ? ` (${tgt.end})` : ''}
                    </button>
                  ) : !o.confuser ? <span className="dbg-flag bad">dead link: {o.to}</span> : null}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

function StoryGraph({ g, sel, setSel, goLore }) {
  const COL = 168
  const ROW = 22
  const PAD = 24
  const scrollRef = useRef(null)
  const layout = useMemo(() => {
    const byDepth = {}
    for (const id of g.ids) (byDepth[g.depth[id]] ||= []).push(id)
    for (const d of Object.keys(byDepth)) byDepth[d].sort()
    const pos = {}
    let maxRows = 0
    for (const d of Object.keys(byDepth)) {
      byDepth[d].forEach((id, i) => { pos[id] = { x: PAD + d * COL, y: PAD + i * ROW } })
      maxRows = Math.max(maxRows, byDepth[d].length)
    }
    const width = PAD * 2 + (g.maxD + 1) * COL + 60
    const height = PAD * 2 + maxRows * ROW + 10
    return { pos, width, height }
  }, [g])

  // when a node is selected (e.g. from a folklore ending link), bring it into view.
  // Deferred a frame so it also works on the first mount (the scroll container
  // needs to be laid out before scrollTo will take).
  useEffect(() => {
    const p = sel && layout.pos[sel]
    if (!p) return
    const id = setTimeout(() => {
      const el = scrollRef.current
      if (!el || !el.clientWidth) return
      el.scrollLeft = Math.max(0, p.x - el.clientWidth / 2)
      el.scrollTop = Math.max(0, p.y - el.clientHeight / 2)
    }, 60)
    return () => clearTimeout(id)
  }, [sel, layout])

  return (
    <div className="dbg-graph-wrap">
      <div className="dbg-scroll" ref={scrollRef}>
        <svg width={layout.width} height={layout.height} className="dbg-graph">
          {g.ids.map((id) =>
            g.adj[id].map((to, k) => {
              const a = layout.pos[id], b = layout.pos[to]
              if (!a || !b) return null
              const hot = sel === id || sel === to
              return (
                <line
                  key={id + '-' + k}
                  x1={a.x + 54} y1={a.y + 6} x2={b.x} y2={b.y + 6}
                  stroke={hot ? '#fff' : '#3a4250'} strokeWidth={hot ? 1.4 : 0.6}
                  opacity={hot ? 0.9 : 0.4}
                />
              )
            }),
          )}
          {g.ids.map((id) => {
            const p = layout.pos[id]
            const kind = g.kindOf(id)
            return (
              <g key={id} transform={`translate(${p.x},${p.y})`} className="dbg-gnode"
                 onClick={() => setSel(id)} style={{ cursor: 'pointer' }}>
                <title>{id} — {KIND_LABEL[kind]}</title>
                <rect width={54} height={12} rx={3}
                  fill={KIND_COLOR[kind]} opacity={sel === id ? 1 : 0.85}
                  stroke={sel === id ? '#fff' : 'none'} strokeWidth={sel === id ? 1.4 : 0} />
                <text x={58} y={10} className="dbg-glabel" fill={sel === id ? '#fff' : '#aeb6c2'}>{id}</text>
              </g>
            )
          })}
        </svg>
      </div>
      {sel && <NodeDetail id={sel} onPick={setSel} goLore={goLore} />}
    </div>
  )
}

function WorldMap({ g, current, setSel, goGraph }) {
  const hubSet = useMemo(() => new Set(g.hubs), [g])
  // neighbouring hubs: BFS from a hub, stop when another hub is reached
  const hubNeighbours = (hub) => {
    const res = new Set(), seen = new Set([hub]), stack = [...g.adj[hub]]
    while (stack.length) {
      const u = stack.pop()
      if (seen.has(u)) continue
      seen.add(u)
      if (hubSet.has(u)) { res.add(u); continue }
      for (const v of g.adj[u]) stack.push(v)
    }
    return [...res]
  }
  const hubs = [...g.hubs].sort((a, b) => g.depth[a] - g.depth[b] || a.localeCompare(b))
  // simple layered placement for the constellation
  const COL = 150, ROW = 64, PAD = 30
  const byDepth = {}
  for (const h of hubs) (byDepth[g.depth[h]] ||= []).push(h)
  const pos = {}
  for (const d of Object.keys(byDepth)) byDepth[d].forEach((h, i) => { pos[h] = { x: PAD + d * COL, y: PAD + i * ROW } })
  const width = PAD * 2 + (Math.max(0, ...hubs.map((h) => g.depth[h])) + 1) * COL
  const height = PAD * 2 + Math.max(1, ...Object.values(byDepth).map((a) => a.length)) * ROW
  const oneLiner = (id) => englishOf(STORY[id].text.map(lineOf).find((l) => l.filter((t) => t.id).length >= 2) || STORY[id].text.map(lineOf)[0] || [])

  return (
    <div className="dbg-map">
      <p className="dbg-note">
        The open world is a web of <b>hubs</b> (scenes with 4+ exits) wired together by reversible
        travel. Below: how the districts connect, then each hub's exits. Click any destination to
        inspect it in the Story Graph.
      </p>
      <div className="dbg-scroll">
        <svg width={width} height={height} className="dbg-constellation">
          {hubs.map((h) => hubNeighbours(h).map((nb, k) => {
            const a = pos[h], b = pos[nb]
            if (!a || !b) return null
            return <line key={h + nb + k} x1={a.x + 50} y1={a.y + 9} x2={b.x + 50} y2={b.y + 9}
              stroke="#5a6675" strokeWidth={1} opacity={0.6} />
          }))}
          {hubs.map((h) => (
            <g key={h} transform={`translate(${pos[h].x},${pos[h].y})`} style={{ cursor: 'pointer' }}
               onClick={() => goGraph(h)}>
              <title>{h}</title>
              <rect width={100} height={18} rx={4} fill={h === current ? '#4aa3ff' : '#b07bff'} opacity={0.9} />
              <text x={50} y={13} textAnchor="middle" className="dbg-hlabel">{h}</text>
            </g>
          ))}
        </svg>
      </div>
      <div className="dbg-hub-cards">
        {hubs.map((h) => {
          const exits = (STORY[h].options || []).filter((o) => !o.confuser && o.to && STORY[o.to])
          return (
            <div className={'dbg-hub-card' + (h === current ? ' here' : '')} key={h}>
              <div className="dbg-hub-head">
                <code>{h}</code>
                {h === current && <span className="dbg-tag start">you are here</span>}
                <span className="dbg-hub-line">{oneLiner(h)}</span>
              </div>
              <div className="dbg-exits">
                {exits.map((o, i) => {
                  const t = STORY[o.to]
                  const kind = t.end || (g.adj[o.to].length >= 4 ? 'hub' : 'node')
                  return (
                    <button className="dbg-exit" key={i} onClick={() => goGraph(o.to)}>
                      <span className="dbg-exit-al">{albanianOf(o.text)}</span>
                      <span className={'dbg-tag ' + kind}>{o.to}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ===========================================================================
// VILLAGE MAP — a hand-drawn top-down map of the village (battlemap style):
// a green clearing ringed with forest, plowed fields, a river winding down the
// east with a wooden bridge, wooden-roofed houses, and dirt lanes. Every real
// STORY node of the village sits on it as a labelled dot you can click to open
// in the Story Graph. The decorative scatter (trees/houses) is deterministic.
// ===========================================================================
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// An ORGANIC closed blob around (cx,cy) with radii rx,ry — a seeded wobble on each
// spoke, smoothed into a Catmull-Rom→bézier loop. Replaces plain ellipse region
// footprints so terrain reads as coastline / canopy / shore, not a floating oval.
// `bias` (optional) nudges each spoke's radius by direction: bias(angle) → factor.
function blobPath(cx, cy, rx, ry, seed = 1, wob = 0.12, n = 16, bias = null) {
  const rnd = mulberry32(seed >>> 0 || 1)
  const pts = []
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2
    let r = 1 + (rnd() - 0.5) * 2 * wob + Math.sin(a * 3 + seed) * wob * 0.4
    if (bias) r *= bias(a)
    pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r])
  }
  const N = pts.length
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d + ' Z'
}

// Each place is a real node id in STORY. x/y are map coordinates (viewBox 1160×820).
// Each place is a real STORY node id, drawn as the landmark the scene describes.
// Mirrored horizontally (x → 1024 − x) so the town faces its river & bridge WEST,
// toward the central river and the great forest beyond it.
const VILLAGE_PLACES = [
  // the road out (top)
  { id: 'udhekryq', x: 458, y: 66, type: 'crossroads', label: 'crossroads', lh: 22 },
  // church quarter (a rise, top-centre, graves behind)
  { id: 'kisha1', x: 378, y: 176, type: 'church', label: 'church', lh: 40 },
  { id: 'varret1', x: 298, y: 132, type: 'graves', label: 'graves', lh: 18 },
  { id: 'kostandin1', x: 336, y: 256, type: 'roadmark', label: 'road past graves', lh: 15 },
  // the square (the heart) — a real cobbled plaza with the buildings around it
  { id: 'fshatiSheshi', x: 499, y: 432, type: 'square', label: 'the square', lh: 92 },
  { id: 'pusiThate', x: 480, y: 444, type: 'well', label: 'the dry well', lh: 24 },
  { id: 'nenaDiell1', x: 516, y: 400, type: 'claydoll', label: 'the girls', lh: 12 },
  { id: 'veraDite1', x: 458, y: 484, type: 'bonfire', label: 'the festival', lh: 16 },
  { id: 'dordolec1', x: 554, y: 480, type: 'scarecrow', label: 'the children', lh: 20 },
  { id: 'plaka', x: 576, y: 388, type: 'house', label: 'old woman’s house', lh: 18 },
  { id: 'oda1', x: 418, y: 392, type: 'oda', label: 'the oda', lh: 18 },
  // the walled PALACE compound (east) — the black-king's citadel set BEHIND its
  // marble garden inside a curtain wall; a wide road runs from the front gate to
  // the square, past the garden, to the palace at the back.
  { id: 'kopshtMermer1', x: 690, y: 470, type: 'garden', label: 'marble garden', lh: 22 },
  { id: 'pallatiZi', x: 768, y: 448, type: 'palace', label: 'black palace', lh: 24 },
  // the back lanes — tucked BEHIND the palace walls (far east)
  { id: 'fshatiLanes', x: 878, y: 468, type: 'signpost', label: 'back lanes', lh: 20 },
  { id: 'kulle1', x: 868, y: 392, type: 'tower', label: 'stone tower', lh: 26 },
  { id: 'djepi1', x: 884, y: 542, type: 'house', label: 'the cradle', lh: 18, roof: '#9a7250' },
  // village life (west)
  { id: 'fshatiJeta', x: 322, y: 430, type: 'signpost', label: 'village life', lh: 20 },
  { id: 'vatra', x: 300, y: 378, type: 'hearth', label: 'the hearth', lh: 20 },
  { id: 'qilim', x: 288, y: 468, type: 'house', label: 'the loom', lh: 18 },
  { id: 'bariu', x: 300, y: 560, type: 'pasture', label: 'shepherd & goats', lh: 18 },
  { id: 'gjysmegjel1', x: 392, y: 566, type: 'rooster', label: 'half-rooster', lh: 14 },
  { id: 'syriKeq1', x: 404, y: 496, type: 'house', label: 'the child', lh: 18 },
  { id: 'breshka1', x: 348, y: 614, type: 'house', label: 'the guest', lh: 18 },
  // river quarter (lower-west, along the water)
  { id: 'fshatiLumi', x: 232, y: 616, type: 'stonebridge', label: 'ura e tabakëve', lh: 20 },
  { id: 'uraArtes1', x: 132, y: 500, type: 'dot', label: 'the new bridge', lh: 13 },
  { id: 'mulli1', x: 166, y: 602, type: 'mill', label: 'water-mill', lh: 18 },
  { id: 'kroi1', x: 178, y: 674, type: 'spring', label: 'the spring', lh: 18 },
]

const VILLAGE_DISTRICTS = [
  { t: 'to the mountain', x: 458, y: 30 },
  { t: 'church', x: 334, y: 92 },
  { t: 'the square', x: 512, y: 292 },
  { t: 'the palace', x: 700, y: 372 },
  { t: 'back lanes', x: 892, y: 606 },
  { t: 'village life', x: 300, y: 322 },
  { t: 'ura e tabakëve', x: 110, y: 706 },
  { t: 'pazari', x: 566, y: 618 },
  { t: 'skela', x: 1042, y: 668 },
  { t: 'kripore', x: 902, y: 912 },
  { t: 'fields', x: 874, y: 70 },
  { t: 'fields', x: 504, y: 800 },
]

// dirt lanes between district anchors [x1,y1,x2,y2]
// The village dirt lanes are DERIVED from the real story links between village
// landmarks — every path drawn on the map is an actual "you can walk here" edge
// in the story (so the map graphically matches the world).
const VILLAGE_LANES = (() => {
  const pos = {}
  for (const pl of VILLAGE_PLACES) if (STORY[pl.id]) pos[pl.id] = pl
  const seen = new Set(), out = []
  for (const pl of VILLAGE_PLACES) {
    if (!pos[pl.id]) continue
    for (const o of (STORY[pl.id].options || [])) {
      if (o.confuser || !o.to || !pos[o.to]) continue
      const key = pl.id < o.to ? pl.id + '|' + o.to : o.to + '|' + pl.id
      if (seen.has(key)) continue
      seen.add(key)
      out.push([pl.x, pl.y, pos[o.to].x, pos[o.to].y])
    }
  }
  return out
})()

// An organic, gently-WINDING lane between two points — village streets are
// walked into being, not surveyed, so nothing inside the town runs straight.
// Returns the svg path AND its polyline points (the roof generator keeps the
// houses off the ACTUAL drawn bends, so the streets stay open).
function lanePath(x1, y1, x2, y2, seed) {
  const rnd = mulberry32(seed >>> 0 || 1)
  const len = Math.hypot(x2 - x1, y2 - y1)
  const n = Math.max(2, Math.round(len / 44))
  const nx = -(y2 - y1) / (len || 1), ny = (x2 - x1) / (len || 1)
  const amp = Math.min(16, len * 0.11)
  const pts = [[x1, y1]]
  for (let i = 1; i < n; i++) {
    const t = i / n
    const off = (Math.sin(t * Math.PI * (1.7 + (seed % 3) * 0.6) + seed % 7) * 0.7 + (rnd() - 0.5) * 1.1) * amp * Math.sin(t * Math.PI)
    pts.push([x1 + (x2 - x1) * t + nx * off, y1 + (y2 - y1) * t + ny * off])
  }
  pts.push([x2, y2])
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return { d, pts }
}
// a smooth street through hand-set waypoints (Catmull-Rom, light jitter) — for
// the town's THROUGH-ROADS, which follow the terrain and the traffic, not a ruler.
function waypointPath(way, seed) {
  const rnd = mulberry32(seed >>> 0 || 1)
  const pts = way.map(([x, y], i) => (i === 0 || i === way.length - 1) ? [x, y] : [x + (rnd() - 0.5) * 7, y + (rnd() - 0.5) * 7])
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return { d, pts }
}
// ── the TOWN'S STREET PLAN — the roads a real town actually has: the high
// street in from the crossroads to the square, the market street south past
// the pazar to the fields, the river road down to the tanners' bridge, and the
// bank road linking the two bridgeheads. The bridge decks and the palace road
// join the network INVISIBLY (their art is drawn elsewhere) so footpaths know
// they exist. Everything else is a footpath. Houses ALIGN to these.
const TOWN_STREETS = [
  { id: 'highN', way: [[458, 72], [452, 150], [468, 238], [486, 310], [492, 350]] },              // crossroads → the square's north gate
  { id: 'market', way: [[505, 518], [508, 560], [498, 606], [472, 662], [438, 716], [400, 762], [372, 790]] }, // the square → pazari → fields, joining the south road
  { id: 'riverRd', way: [[398, 474], [352, 512], [300, 556], [258, 592], [236, 612]] },           // the square's west corner → down to the tanners' bridge
  { id: 'bank', way: [[214, 514], [224, 562], [236, 612]] },                                       // the river-bank road: hero bridgehead → the tanners' bridge
  { id: 'southRing', way: [[510, 522], [566, 542], [630, 564], [710, 582], [790, 578], [846, 550], [872, 508], [878, 468]] }, // around the palace's south wall to the back lanes
  { id: 'kishaLn', way: [[453, 154], [414, 166], [378, 176]], minor: true },                       // the church lane off the high street
  { id: 'jetaLn', way: [[390, 452], [340, 442], [318, 420], [302, 392]], minor: true },            // the village-life lane: plaza west gate → the hearth
  { id: 'deck', way: [[212, 512], [132, 496], [56, 476]], hidden: true },                          // the hero bridge deck (gBridgeDeck draws it)
  { id: 'tanDeck', way: [[236, 614], [186, 634], [140, 622]], hidden: true },                      // the tanners' bridge crossing (gStoneBridge draws it)
  { id: 'palaceRd', way: [[516, 440], [576, 452], [618, 470]], hidden: true },                     // the palace approach (drawn in the palace block)
]
const TOWN_STREET_PATHS = TOWN_STREETS.map((s) => ({ ...waypointPath(s.way, hashStr('st:' + s.id)), hidden: !!s.hidden, minor: !!s.minor }))
// nearest point on the street network; the PLAZA counts as network (streets meet there)
function netNearest(x, y) {
  if (Math.hypot(x - 499, y - 432) < 116) return { d: 0, px: x, py: y }
  let best = { d: Infinity, px: x, py: y }
  for (const S of TOWN_STREET_PATHS) for (let i = 0; i < S.pts.length - 1; i++) {
    const [x1, y1] = S.pts[i], [x2, y2] = S.pts[i + 1]
    const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy || 1
    let t = ((x - x1) * dx + (y - y1) * dy) / L2; t = t < 0 ? 0 : t > 1 ? 1 : t
    const px = x1 + t * dx, py = y1 + t * dy, d = Math.hypot(x - px, y - py)
    if (d < best.d) best = { d, px, py }
  }
  return best
}
// ── HOW ROADS WORK NOW (the town model): the street network carries ALL
// traffic. Every off-network place gets exactly ONE short spur — its doorway
// path to the nearest street — and story-walks between places are carried by
// spur + streets + spur, with NO independent point-to-point paths (that was
// the old spider-web). The only direct footpaths left are short local walks
// between two off-network neighbours (a yard-to-yard cut inside a quarter).
const VILLAGE_LANE_PATHS = (() => {
  const NEAR = 26, SPUR_MAX = 210
  const inPalace = (x, y) => x > 616 && x < 828 && y > 384 && y < 558 // its own drawn road
  const out = [], spurred = new Set()
  const addSpur = (x, y) => {
    const key = x + ',' + y
    if (spurred.has(key) || inPalace(x, y)) return
    spurred.add(key)
    const n = netNearest(x, y)
    if (n.d < NEAR || n.d > SPUR_MAX) return
    out.push({ ...lanePath(x, y, n.px, n.py, hashStr('spur:' + key)), main: false })
  }
  for (const [x1, y1, x2, y2] of VILLAGE_LANES) {
    const far1 = netNearest(x1, y1).d >= NEAR, far2 = netNearest(x2, y2).d >= NEAR
    if (far1 && far2 && Math.hypot(x2 - x1, y2 - y1) < 150 && !inPalace(x1, y1) && !inPalace(x2, y2)) {
      out.push({ ...lanePath(x1, y1, x2, y2, hashStr(`${x1},${y1},${x2},${y2}`)), main: false })
      continue
    }
    if (far1) addSpur(x1, y1)
    if (far2) addSpur(x2, y2)
  }
  return out
})()
// the LANA — the little brook of Tirana, threading in from the east meadows to
// meet the river at the tanners' bridge (pure scenery; the great river carries
// the story). Houses keep off it like they keep off the streets.
const LANA_BROOK = waypointPath([[952, 688], [860, 668], [762, 682], [664, 664], [566, 676], [468, 664], [372, 668], [296, 658], [242, 648]], hashStr('lana'))

// the packed old-town footprint (a tight cluster inside the wider green clearing);
// dense terracotta rooftops fill this, fields + meadow ring the outside.
const TOWN = { cx: 512, cy: 430, rx: 430, ry: 352 }

const RIVER_D = 'M 1010 -20 C 984 120 942 210 952 322 C 960 414 878 470 900 566 C 920 662 970 742 940 848'
const TREE_PAL = ['#4c6743', '#3f5838', '#587a49']

function Tree({ x, y, s }) {
  const lobes = [[0, 2, 1], [-8, -1, 0.82], [8, -1, 0.82], [-4, -8, 0.72], [4, -8, 0.72]]
  return (
    <g>
      <ellipse cx={x + 2} cy={y + 7 * s} rx={12 * s} ry={4 * s} fill="rgba(0,0,0,.18)" />
      {lobes.map(([dx, dy, r], i) => (
        <circle key={i} cx={x + dx * s} cy={y + dy * s} r={10 * s * r} fill={TREE_PAL[i % 3]} stroke="#28351f" strokeWidth={1.1} />
      ))}
      <circle cx={x - 3 * s} cy={y - 5 * s} r={3.2 * s} fill="#7b9760" opacity={0.55} />
    </g>
  )
}

function House({ x, y, w, rot }) {
  const h = w * 0.72
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-w / 2 + 2.5} y={-h / 2 + 3} width={w} height={h} rx={1.5} fill="rgba(0,0,0,.25)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={1.5} fill="#a9825f" stroke="#573f2d" strokeWidth={1.4} />
      <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke="#573f2d" strokeWidth={1.1} />
      <line x1={-w / 2} y1={-h / 4} x2={w / 2} y2={-h / 4} stroke="#c39d78" strokeWidth={0.7} />
      <line x1={-w / 2} y1={h / 4} x2={w / 2} y2={h / 4} stroke="#8a6a4a" strokeWidth={0.7} />
    </g>
  )
}

// one packed rooftop of the old town — a small terracotta block seen from above,
// dark-outlined with a ridge line, like the roofs of Berat's hillside quarters.
const ROOF_TONES = ['#c76f4c', '#cf8a5d', '#c1794e', '#b9663f', '#d59a6b', '#c98450', '#bd7346', '#d1935f', '#cfa568', '#c39a5b', '#d8b075']
function RoofBlock({ x, y, w, h, rot, tone }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-w / 2 + 1.5} y={-h / 2 + 2} width={w} height={h} rx={1.6} fill="rgba(74,40,22,.30)" />
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={1.6} fill={tone} stroke="#5a3826" strokeWidth={1.2} />
      <rect x={-w / 2} y={-h / 2} width={w} height={h * 0.34} rx={1.6} fill="#fff" opacity={0.13} />
      <line x1={-w / 2 + 2} y1={0} x2={w / 2 - 2} y2={0} stroke="rgba(84,42,24,.5)" strokeWidth={0.9} />
    </g>
  )
}

// several scenes sharing one spot on the map → a "story stack": a little pile of
// story pages with a count badge. Click it and the LOCATION CARD opens — the
// hand-authored "what can happen here" list (see VillageMap / placeMeta.js).
function StoryStack({ x, y, n, hot }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={0.5} cy={9} rx={11} ry={3.2} fill="rgba(0,0,0,.22)" />
      <rect x={-8} y={-4} width={16} height={13} rx={2.4} transform="rotate(-9)" fill="#e5d6b2" stroke="#5a4632" strokeWidth={1.1} />
      <rect x={-8} y={-5.5} width={16} height={13} rx={2.4} transform="rotate(6)" fill="#efe4c8" stroke="#5a4632" strokeWidth={1.1} />
      <rect x={-8} y={-7} width={16} height={13} rx={2.4} fill="#fbf4df" stroke={hot ? '#3ad0c0' : '#3f3020'} strokeWidth={hot ? 1.8 : 1.3} />
      <line x1={-4.5} y1={-3.4} x2={4.5} y2={-3.4} stroke="#8a6f4c" strokeWidth={1} />
      <line x1={-4.5} y1={-0.8} x2={2.6} y2={-0.8} stroke="#a88f68" strokeWidth={1} />
      <line x1={-4.5} y1={1.8} x2={3.6} y2={1.8} stroke="#a88f68" strokeWidth={1} />
      <circle cx={8.5} cy={-8.5} r={6.6} fill={hot ? '#3ad0c0' : '#2b3550'} stroke="#fff" strokeWidth={1.1} />
      <text x={8.5} y={-5.9} textAnchor="middle" fontSize={9} fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">{n}</text>
    </g>
  )
}

function Field({ x, y, w, h, rot, tone }) {
  const furrows = []
  for (let i = 1; i < h / 11; i++) furrows.push(-h / 2 + i * 11)
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={5} fill={tone} stroke="#48372a" strokeWidth={1.6} />
      {furrows.map((fy, i) => (
        <g key={i}>
          <line x1={-w / 2 + 5} y1={fy} x2={w / 2 - 5} y2={fy} stroke="rgba(0,0,0,.16)" strokeWidth={2.4} />
          <line x1={-w / 2 + 5} y1={fy - 3} x2={w / 2 - 5} y2={fy - 3} stroke="#8a9a55" strokeWidth={1.4} opacity={0.55} />
        </g>
      ))}
    </g>
  )
}

// --- small decorative iconography scattered through the village ---
function Rock({ x, y, s }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={1} cy={3 * s} rx={7 * s} ry={2.5 * s} fill="rgba(0,0,0,.18)" />
      <ellipse cx={-2 * s} cy={0} rx={5 * s} ry={4 * s} fill="#9a938a" stroke="#6a6156" strokeWidth={1} />
      <ellipse cx={3 * s} cy={1 * s} rx={4 * s} ry={3 * s} fill="#8b857b" stroke="#6a6156" strokeWidth={1} />
      <ellipse cx={-3 * s} cy={-1.5 * s} rx={2 * s} ry={1.4 * s} fill="#b3ada4" opacity={0.6} />
    </g>
  )
}
function Bush({ x, y, s }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={1} cy={4 * s} rx={9 * s} ry={3 * s} fill="rgba(0,0,0,.15)" />
      {[[0, 0, 1], [-6, 1, 0.7], [6, 1, 0.7], [0, -4, 0.6]].map(([dx, dy, r], i) => (
        <circle key={i} cx={dx * s} cy={dy * s} r={6 * s * r} fill={i % 2 ? '#6b8a4a' : '#7c9a55'} stroke="#4e6837" strokeWidth={0.9} />
      ))}
    </g>
  )
}
function Haystack({ x, y, s }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={1} cy={6 * s} rx={9 * s} ry={3 * s} fill="rgba(0,0,0,.18)" />
      <path d={`M ${-9 * s} ${6 * s} Q 0 ${-11 * s} ${9 * s} ${6 * s} Z`} fill="#d9b24e" stroke="#a67f2c" strokeWidth={1.2} />
      {[-4, 0, 4].map((hx, i) => <path key={i} d={`M ${hx * s} ${5 * s} Q ${(hx + 1) * s} ${-4 * s} ${(hx + 2) * s} ${5 * s}`} fill="none" stroke="#b8912f" strokeWidth={0.8} opacity={0.6} />)}
    </g>
  )
}
function GardenPlot({ x, y, s }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-11 * s} y={-8 * s} width={22 * s} height={16 * s} rx={2} fill="#6f5744" stroke="#4a3a2c" strokeWidth={1.2} />
      {[-5, 0, 5].map((cx, i) => (
        <g key={i}>{[-4, 0, 4].map((cy, j) => <circle key={j} cx={cx * s} cy={cy * s} r={1.5 * s} fill="#7fa356" />)}</g>
      ))}
    </g>
  )
}

// ── village life & dressing — the small touches that make the town feel lived-in ──
function Cypress({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={1} cy={11 * s} rx={4.5 * s} ry={1.8 * s} fill="rgba(0,0,0,.2)" />
      <rect x={-1 * s} y={7 * s} width={2 * s} height={4 * s} fill="#5c4230" />
      <path d={`M 0 ${-13 * s} C ${3.6 * s} ${-8 * s} ${3.2 * s} ${3 * s} 0 ${8 * s} C ${-3.2 * s} ${3 * s} ${-3.6 * s} ${-8 * s} 0 ${-13 * s} Z`}
            fill="#3d5232" stroke="#263721" strokeWidth={1.1} />
      <path d={`M 0 ${-10 * s} C ${1.6 * s} ${-6 * s} ${1.4 * s} ${1 * s} 0 ${5 * s}`} fill="none" stroke="#54704a" strokeWidth={0.9} opacity={0.8} />
    </g>
  )
}
function Stall({ x, y, rot = 0 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse cx={1} cy={9} rx={11} ry={3} fill="rgba(0,0,0,.18)" />
      <rect x={-9} y={-1} width={18} height={8} fill="#8a6a45" stroke="#5c4230" strokeWidth={1.1} />
      {[-8, -1, 6].map((bx, i) => <rect key={i} x={bx} y={1} width={4} height={2.6} fill={i % 2 ? '#d9b24e' : '#c96b2e'} />)}
      {[-10, 10].map((px, i) => <line key={i} x1={px} y1={-10} x2={px} y2={7} stroke="#5c4230" strokeWidth={1.4} />)}
      <path d="M -12 -8 L 12 -8 L 10 -3 L -10 -3 Z" fill="#c14d3f" stroke="#7a2f26" strokeWidth={1} />
      {[-8, -2, 4].map((sx, i) => <rect key={'s' + i} x={sx} y={-7.6} width={3} height={4.2} fill="#efe7d5" opacity={0.9} />)}
    </g>
  )
}
function PlaneTree({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={2} cy={13} rx={17} ry={5} fill="rgba(0,0,0,.2)" />
      <circle cx={0} cy={11} r={13} fill="none" stroke="#b6a373" strokeWidth={2.6} opacity={0.8} />
      <rect x={-2} y={2} width={4} height={9} fill="#7a5c3a" stroke="#4f3a2a" strokeWidth={1} />
      {[[0, -6, 12], [-9, -1, 8.5], [9, -1, 8.5], [-4, -12, 7], [5, -11, 7]].map(([dx, dy, r], i) => (
        <circle key={i} cx={dx} cy={dy} r={r} fill={i % 2 ? '#6f9150' : '#7d9e58'} stroke="#46603a" strokeWidth={1.1} />
      ))}
      <circle cx={-4} cy={-9} r={3} fill="#96b46c" opacity={0.7} />
    </g>
  )
}
function Villager({ x, y, c = '#8a5a6a' }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={0.5} cy={5} rx={3} ry={1.2} fill="rgba(0,0,0,.2)" />
      <path d="M -2.4 4.6 L -1.7 -0.6 A 2 2 0 0 1 1.9 -0.6 L 2.6 4.6 Z" fill={c} stroke="rgba(0,0,0,.35)" strokeWidth={0.6} />
      <circle cy={-2.6} r={1.8} fill="#e6c39a" stroke="#a97e52" strokeWidth={0.5} />
    </g>
  )
}
function Chicken({ x, y, flip = false }) {
  return (
    <g transform={`translate(${x},${y})${flip ? ' scale(-1,1)' : ''}`}>
      <ellipse cx={0} cy={0} rx={2.8} ry={2} fill="#efe9dc" stroke="#8a7d63" strokeWidth={0.6} />
      <circle cx={2.6} cy={-2} r={1.3} fill="#efe9dc" stroke="#8a7d63" strokeWidth={0.6} />
      <path d="M 2.4 -3.4 l 0.7 -1 l 0.7 1 z" fill="#d3382f" />
      <path d="M 3.8 -1.9 l 1.6 0.5 l -1.6 0.6 z" fill="#e8b53c" />
      <line x1={-0.6} y1={2} x2={-0.6} y2={3.6} stroke="#b8912f" strokeWidth={0.7} />
      <line x1={0.9} y1={2} x2={0.9} y2={3.6} stroke="#b8912f" strokeWidth={0.7} />
    </g>
  )
}
function RowBoat({ x, y, rot = 0 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <path d="M -11 0 Q 0 6 11 0 L 8 -3 L -8 -3 Z" fill="#8a6a45" stroke="#4f3a2a" strokeWidth={1.2} />
      <line x1={-5} y1={-3} x2={-5} y2={1.4} stroke="#4f3a2a" strokeWidth={1} />
      <line x1={4} y1={-3} x2={4} y2={1.4} stroke="#4f3a2a" strokeWidth={1} />
      <line x1={7} y1={-5} x2={14} y2={2} stroke="#5c4230" strokeWidth={1} />
    </g>
  )
}
function WashLine({ x1, y1, x2, y2 }) {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 + 3
  return (
    <g>
      {[[x1, y1], [x2, y2]].map(([px, py], i) => <line key={i} x1={px} y1={py} x2={px} y2={py + 10} stroke="#5c4230" strokeWidth={1.6} />)}
      <path d={`M ${x1} ${y1} Q ${mx} ${my + 2} ${x2} ${y2}`} fill="none" stroke="#d8d2c4" strokeWidth={0.9} />
      {[0.25, 0.5, 0.75].map((t, i) => {
        const cx = x1 + (x2 - x1) * t, cy = y1 + (y2 - y1) * t + 2.4
        return <rect key={i} x={cx - 2} y={cy} width={4} height={5} rx={0.6} fill={['#b8534a', '#eae3d0', '#5e7f92'][i]} opacity={0.95} />
      })}
    </g>
  )
}
function Smoke({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x},${y}) scale(${s})`} style={{ pointerEvents: 'none' }}>
      <path d="M 0 0 C -2.6 -4 2.4 -7 0.4 -12 C -2 -16 1.6 -19 0.6 -23" fill="none" stroke="#ece8dd" strokeWidth={2.2} strokeLinecap="round" opacity={0.55} />
      <circle cx={0.4} cy={-25} r={2.4} fill="#ece8dd" opacity={0.4} />
    </g>
  )
}
function Orchard({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={0} cy={4} rx={52} ry={26} fill="#8fae5c" opacity={0.45} />
      {[-36, -12, 12, 36].map((ox, i) => (
        <g key={i}>{[-9, 9].map((oy, j) => (
          <g key={j} transform={`translate(${ox + (j % 2 ? 5 : 0)},${oy})`}>
            <ellipse cx={1} cy={5} rx={5.5} ry={2} fill="rgba(0,0,0,.16)" />
            <rect x={-0.8} y={1} width={1.6} height={4} fill="#6f4f34" />
            <circle cy={-2} r={5} fill={(i + j) % 2 ? '#7d9e58' : '#8cae62'} stroke="#4e6837" strokeWidth={1} />
          </g>
        ))}</g>
      ))}
    </g>
  )
}
function Vineyard({ x, y, rot = 0 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <rect x={-40} y={-24} width={80} height={48} rx={5} fill="#a8955f" opacity={0.55} />
      {[-16, -5.5, 5.5, 16].map((vy, i) => (
        <g key={i}>
          <line x1={-34} y1={vy} x2={34} y2={vy} stroke="#6f5433" strokeWidth={1.2} opacity={0.8} />
          {[-30, -18, -6, 6, 18, 30].map((vx, j) => <circle key={j} cx={vx} cy={vy - 1.6} r={2.6} fill={(i + j) % 2 ? '#5c7a3f' : '#6b8a4a'} />)}
        </g>
      ))}
    </g>
  )
}
function OliveGrove({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {[[-26, 2], [-4, -8], [16, 4], [30, -6], [4, 12]].map(([ox, oy], i) => (
        <g key={i} transform={`translate(${ox},${oy})`}>
          <ellipse cx={1} cy={5} rx={6} ry={2.2} fill="rgba(0,0,0,.15)" />
          <path d="M -1 5 Q -2.5 1 0 -1 Q 2.5 1 1 5 Z" fill="#8a7248" stroke="#5c4a30" strokeWidth={0.8} />
          <circle cy={-4} r={5.4} fill="#8a9a6e" stroke="#5f7050" strokeWidth={1} />
          <circle cx={-2} cy={-5.5} r={2} fill="#a7b489" opacity={0.7} />
        </g>
      ))}
    </g>
  )
}

// ---------------------------------------------------------------------------
// LANDMARK GLYPHS — each village scene drawn as the thing the story describes.
// All are drawn centred on (x,y). Kept bold/simple so they read small.
// ---------------------------------------------------------------------------
const shadow = (cx, cy, rx, ry) => <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="rgba(0,0,0,.22)" />

function gHouse(x, y, roof = '#a9825f') {
  const w = 30, h = 23
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(3, h / 2 + 3, w * 0.55, 5)}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={2} fill={roof} stroke="#4f3a2a" strokeWidth={1.8} />
      <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke="#4f3a2a" strokeWidth={1.6} />
      <line x1={-w / 2} y1={-h / 4} x2={w / 2} y2={-h / 4} stroke="rgba(255,255,255,.22)" strokeWidth={0.8} />
      <line x1={-w / 2} y1={h / 4} x2={w / 2} y2={h / 4} stroke="rgba(0,0,0,.22)" strokeWidth={0.8} />
    </g>
  )
}

function gOda(x, y) {
  const w = 46, h = 26
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(4, h / 2 + 3, w * 0.55, 6)}
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={2} fill="#b58a5c" stroke="#4f3a2a" strokeWidth={1.8} />
      <line x1={-w / 2} y1={0} x2={w / 2} y2={0} stroke="#4f3a2a" strokeWidth={1.6} />
      {[-h / 4, h / 4].map((ly, i) => <line key={i} x1={-w / 2} y1={ly} x2={w / 2} y2={ly} stroke="rgba(0,0,0,.18)" strokeWidth={0.7} />)}
      <rect x={-6} y={h / 2 - 1} width={12} height={7} rx={1} fill="#7a5c3a" stroke="#4f3a2a" strokeWidth={1} />
    </g>
  )
}

function gHearth(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {gHouse(0, 0, '#a9825f')}
      <rect x={7} y={-16} width={5} height={9} fill="#6f4f34" stroke="#4f3a2a" strokeWidth={1} />
      <circle cx={9.5} cy={-19} r={3.5} fill="#c9c2b6" opacity={0.7} />
      <circle cx={12} cy={-24} r={4.5} fill="#c9c2b6" opacity={0.45} />
      <circle cx={0} cy={0} r={4} fill="#e8892b" opacity={0.9} />
    </g>
  )
}

function gWell(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 8, 12, 4)}
      <circle r={11} fill="#9a938a" stroke="#5b5348" strokeWidth={2.4} />
      <circle r={6.4} fill="#6b5a44" />
      <path d="M -6 -1 A 6 6 0 0 1 6 -1 Z" fill="#7d6a4f" />
      <rect x={-13} y={-17} width={3} height={17} rx={1} fill="#6f4f34" />
      <rect x={10} y={-17} width={3} height={17} rx={1} fill="#6f4f34" />
      <rect x={-15} y={-19} width={30} height={4} rx={1} fill="#7c5a3c" />
    </g>
  )
}

function gTower(x, y) {
  const s = 13
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(9, s + 4, s * 1.2, 5)}
      <rect x={-s} y={-s} width={2 * s} height={2 * s} fill="#8f8d84" stroke="#4b463d" strokeWidth={2.2} />
      <rect x={-s + 3} y={-s + 3} width={2 * s - 6} height={2 * s - 6} fill="#a6a39b" stroke="#6a6459" strokeWidth={1} />
      {[-s, -s + 6.5, -s + 13, -s + 19.5].map((bx, i) => <rect key={i} x={bx} y={-s - 3} width={4} height={4} fill="#8f8d84" stroke="#4b463d" strokeWidth={1} />)}
      <rect x={-2} y={-3} width={4} height={7} fill="#2f2b24" />
    </g>
  )
}

function gPalace(x, y) {
  // the black palace — drawn as a dark citadel: an angular curtain wall with
  // battlements, corner towers and a tall keep, like a fortress seen from above.
  const merlon = (x0, y0, n, step) => Array.from({ length: n }, (_, i) => (
    <rect key={i} x={x0 + i * step} y={y0} width={step * 0.62} height={5.5} fill="#3a3242" stroke="#141019" strokeWidth={1} />
  ))
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(4, 26, 48, 12)}
      {/* corner towers behind the wall */}
      <rect x={-48} y={-14} width={15} height={34} rx={1.5} fill="#2a2432" stroke="#120f18" strokeWidth={2} />
      <rect x={33} y={-16} width={15} height={36} rx={1.5} fill="#2a2432" stroke="#120f18" strokeWidth={2} />
      {merlon(-48, -19, 3, 5)}{merlon(33, -21, 3, 5)}
      {/* the curtain wall — an irregular dark keep */}
      <path d="M -40 20 L -40 -4 L -22 -4 L -22 -16 L -2 -16 L -2 -4 L 40 -4 L 40 20 Z"
            fill="#322b3c" stroke="#141019" strokeWidth={2.4} strokeLinejoin="round" />
      {merlon(-40, -9, 4, 5)}{merlon(6, -9, 6, 5.5)}
      {/* the tall central keep */}
      <rect x={-16} y={-40} width={22} height={26} fill="#3c3446" stroke="#141019" strokeWidth={2.2} />
      {merlon(-16, -44, 4, 5.5)}
      <rect x={-16} y={-40} width={22} height={6} fill="#4a4152" />
      {/* lit windows + the gate */}
      {[[-11, -30], [-33, 2], [22, 2], [-6, -8]].map(([wx, wy], i) => <rect key={i} x={wx} y={wy} width={4.4} height={6} fill="#e6b84e" />)}
      <path d="M -7 20 L -7 7 A 7 7 0 0 1 7 7 L 7 20 Z" fill="#0e0b14" />
    </g>
  )
}

function gGarden(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(3, 19, 26, 7)}
      <rect x={-24} y={-18} width={48} height={37} rx={4} fill="#e8e3d8" stroke="#b9b2a2" strokeWidth={2.2} />
      <rect x={-19} y={-13} width={38} height={27} rx={3} fill="#7fa356" />
      <line x1={-19} y1={0} x2={19} y2={0} stroke="#dcd6c7" strokeWidth={3} />
      <line x1={0} y1={-13} x2={0} y2={14} stroke="#dcd6c7" strokeWidth={3} />
      <circle r={4} fill="#7fb4c6" stroke="#e8e3d8" strokeWidth={1.6} />
      {[[-13, -8], [13, -8], [-13, 9], [13, 9]].map(([sx, sy], i) => <circle key={i} cx={sx} cy={sy} r={2.3} fill="#f4f0e6" />)}
    </g>
  )
}

function gMill(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {gHouse(-8, -2, '#9c7a58')}
      <g transform="translate(15,7)">
        <circle r={12} fill="none" stroke="#5c4230" strokeWidth={3} />
        <circle r={12} fill="#00000018" />
        {[0, 45, 90, 135].map((a, i) => <line key={i} x1={-12 * Math.cos(a * Math.PI / 180)} y1={-12 * Math.sin(a * Math.PI / 180)} x2={12 * Math.cos(a * Math.PI / 180)} y2={12 * Math.sin(a * Math.PI / 180)} stroke="#6f4f34" strokeWidth={2} />)}
        <circle r={2.6} fill="#4f3a2a" />
      </g>
    </g>
  )
}

function gSpring(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 9, 13, 4)}
      <ellipse cx={0} cy={5} rx={11} ry={4.5} fill="#84bacb" stroke="#6fa7bc" strokeWidth={1.3} />
      <path d="M -11 3 A 11 7 0 0 1 11 3 Z" fill="#9a938a" stroke="#5b5348" strokeWidth={1.4} />
      <rect x={-3} y={-15} width={6} height={13} rx={1} fill="#8d8b83" stroke="#5b5348" strokeWidth={1.2} />
      <rect x={-1.2} y={-6} width={2.4} height={9} fill="#7fb4c6" />
    </g>
  )
}

function gChurch(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(4, 18, 28, 8)}
      <rect x={-22} y={-8} width={38} height={26} rx={2} fill="#b0704f" stroke="#5c3a28" strokeWidth={1.9} />
      <line x1={-22} y1={5} x2={16} y2={5} stroke="#5c3a28" strokeWidth={1.5} />
      <rect x={12} y={-22} width={15} height={40} rx={2} fill="#9c6142" stroke="#5c3a28" strokeWidth={1.9} />
      <rect x={16.5} y={-15} width={6} height={7} fill="#3a2a20" />
      <rect x={18.2} y={-33} width={2.6} height={12} fill="#eae3d0" />
      <rect x={15} y={-30} width={9} height={2.6} fill="#eae3d0" />
    </g>
  )
}

function gGraves(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-19} y={-12} width={38} height={24} rx={3} fill="#8aa35a" stroke="#6c6152" strokeWidth={1.6} opacity={0.92} />
      {[[-12, -3], [-3, 3], [6, -4], [12, 5], [-8, 6], [2, -6]].map(([gx, gy], i) => (
        <g key={i} transform={`translate(${gx},${gy})`}>
          <rect x={-0.9} y={-7} width={1.9} height={9} fill="#d8d2c4" />
          <rect x={-3} y={-4.5} width={6} height={1.9} fill="#d8d2c4" />
        </g>
      ))}
    </g>
  )
}

function gPasture(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-25} y={-15} width={50} height={30} rx={5} fill="#8fae5c" stroke="#7a6a3f" strokeWidth={1.5} strokeDasharray="5 3" />
      {[[-13, -3], [4, 5], [13, -5]].map(([gx, gy], i) => (
        <g key={i} transform={`translate(${gx},${gy})`}>
          <ellipse cx={0} cy={0} rx={4.6} ry={2.7} fill="#efe9dc" stroke="#8a7d63" strokeWidth={0.8} />
          <circle cx={4.2} cy={-1.4} r={2} fill="#efe9dc" stroke="#8a7d63" strokeWidth={0.8} />
          <line x1={-2} y1={2} x2={-2} y2={4.6} stroke="#8a7d63" strokeWidth={0.8} />
          <line x1={2} y1={2} x2={2} y2={4.6} stroke="#8a7d63" strokeWidth={0.8} />
        </g>
      ))}
    </g>
  )
}

function gScarecrow(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(2, 11, 7, 3)}
      <rect x={-1} y={-13} width={2} height={24} fill="#7a5c3a" />
      <rect x={-10} y={-6} width={20} height={2} fill="#7a5c3a" />
      <path d="M -6 -4 L 6 -4 L 3 8 L -3 8 Z" fill="#8a9b56" stroke="#5f6d3b" strokeWidth={0.8} />
      <circle cx={0} cy={-15} r={4} fill="#cdb06e" stroke="#8a7038" strokeWidth={0.8} />
    </g>
  )
}

function gBonfire(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 8, 10, 3)}
      <line x1={-8} y1={8} x2={7} y2={-1} stroke="#7a5c3a" strokeWidth={2.6} />
      <line x1={8} y1={8} x2={-7} y2={-1} stroke="#7a5c3a" strokeWidth={2.6} />
      <path d="M0 7 C -7 0 -3 -7 0 -14 C 3 -7 7 0 0 7 Z" fill="#e8892b" />
      <path d="M0 6 C -3 1 -1.5 -4 0 -9 C 1.5 -4 3 1 0 6 Z" fill="#f6cf49" />
    </g>
  )
}

function gRooster(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 8, 6, 2.5)}
      <path d="M-6 0 l-4 -4 l1 6 z" fill="#a85f2a" />
      <ellipse cx={0} cy={2} rx={5.5} ry={4.2} fill="#c47a3a" />
      <circle cx={4.5} cy={-2.5} r={2.8} fill="#c47a3a" />
      <path d="M5 -6 l1.5 -3 l1.5 3 z" fill="#d3382f" />
      <path d="M7 -1 l3.5 1.2 l-3.5 1.2 z" fill="#e8b53c" />
      <line x1={-1} y1={6} x2={-1} y2={9.5} stroke="#e8b53c" strokeWidth={1.1} />
      <line x1={2.5} y1={6} x2={2.5} y2={9.5} stroke="#e8b53c" strokeWidth={1.1} />
    </g>
  )
}

function gClayDoll(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(0, 8, 5, 2)}
      <circle cx={0} cy={-4} r={3} fill="#b98a5a" stroke="#8a6238" strokeWidth={0.7} />
      <path d="M-4 -1 L4 -1 L3 8 L-3 8 Z" fill="#b98a5a" stroke="#8a6238" strokeWidth={0.7} />
      <line x1={-4} y1={1.5} x2={-8} y2={4} stroke="#b98a5a" strokeWidth={1.6} strokeLinecap="round" />
      <line x1={4} y1={1.5} x2={8} y2={4} stroke="#b98a5a" strokeWidth={1.6} strokeLinecap="round" />
    </g>
  )
}

function gSignpost(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 8, 6, 2.5)}
      <rect x={-1.4} y={-14} width={2.8} height={22} fill="#6f4f34" />
      <path d="M-2 -13 h-11 l-3 2.5 l3 2.5 h11 z" fill="#8a6a45" stroke="#5c4230" strokeWidth={0.8} />
      <path d="M2 -8 h11 l3 2.5 l-3 2.5 h-11 z" fill="#8a6a45" stroke="#5c4230" strokeWidth={0.8} />
    </g>
  )
}

function gCrossroads(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 9, 7, 3)}
      <rect x={-1.6} y={-16} width={3.2} height={25} fill="#6f4f34" />
      <path d="M-2 -15 h-12 l-3.5 3 l3.5 3 h12 z" fill="#8a6a45" stroke="#5c4230" strokeWidth={0.9} />
      <path d="M2 -15 h12 l3.5 3 l-3.5 3 h-12 z" fill="#8a6a45" stroke="#5c4230" strokeWidth={0.9} />
      <path d="M2 -7 h11 l3 2.6 l-3 2.6 h-11 z" fill="#7a5c3a" stroke="#5c4230" strokeWidth={0.8} />
    </g>
  )
}

function gRoadmark(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(1, 6, 6, 2.4)}
      <path d="M-5 5 L-4 -6 A 4 4 0 0 1 4 -6 L5 5 Z" fill="#9a938a" stroke="#5b5348" strokeWidth={1.2} />
      <line x1={-3} y1={-1} x2={3} y2={-1} stroke="#5b5348" strokeWidth={0.8} />
    </g>
  )
}

function gBridgeDeck() {
  // the wooden footbridge over the river (drawn in place, spans the water on the WEST edge)
  return (
    <g>
      <line x1={212} y1={512} x2={56} y2={476} stroke="#6f4f34" strokeWidth={22} strokeLinecap="round" />
      <line x1={212} y1={512} x2={56} y2={476} stroke="#a9825f" strokeWidth={16} strokeLinecap="round" />
      {Array.from({ length: 10 }, (_, i) => {
        const t = i / 9, x = 212 + (56 - 212) * t, y = 512 + (476 - 512) * t
        return <line key={i} x1={x - 7} y1={y - 9} x2={x + 7} y2={y + 9} stroke="#5c4230" strokeWidth={2} />
      })}
    </g>
  )
}

// ── URA E TABAKËVE — the Tanners' Bridge: an Ottoman stone humpback footbridge
// over the river at the tanners' quarter, straight out of old Tirana. Drawn
// west of the quarter's anchor point so it actually spans the water. ──
function gStoneBridge(x, y) {
  const bx = x - 44, by = y + 26 // the bridge's centre, out over the river
  return (
    <g>
      {/* humpback deck with stone parapets */}
      <path d={`M ${bx - 46} ${by + 8} Q ${bx} ${by - 22} ${bx + 46} ${by + 8}`} fill="none" stroke="#6f6759" strokeWidth={16} strokeLinecap="round" />
      <path d={`M ${bx - 46} ${by + 8} Q ${bx} ${by - 22} ${bx + 46} ${by + 8}`} fill="none" stroke="#cfc8ba" strokeWidth={11} strokeLinecap="round" />
      <path d={`M ${bx - 44} ${by + 4} Q ${bx} ${by - 25} ${bx + 44} ${by + 4}`} fill="none" stroke="#8b8378" strokeWidth={2} />
      <path d={`M ${bx - 44} ${by + 12} Q ${bx} ${by - 17} ${bx + 44} ${by + 12}`} fill="none" stroke="#8b8378" strokeWidth={2} />
      {/* stone joints along the hump */}
      {Array.from({ length: 7 }, (_, i) => {
        const t = (i + 1) / 8, px = bx - 46 + t * 92, py = by + 8 - Math.sin(t * Math.PI) * 26
        return <line key={i} x1={px} y1={py - 4} x2={px} y2={py + 5} stroke="#9a938a" strokeWidth={1.4} />
      })}
      {/* the pointed arch and its dark reflection in the water */}
      <path d={`M ${bx - 15} ${by + 15} Q ${bx} ${by - 4} ${bx + 15} ${by + 15} L ${bx + 15} ${by + 17} L ${bx - 15} ${by + 17} Z`} fill="#3f4a52" opacity={0.85} />
      <path d={`M ${bx - 12} ${by + 20} Q ${bx} ${by + 32} ${bx + 12} ${by + 20}`} fill="none" stroke="#2f4a52" strokeWidth={2.4} opacity={0.5} />
    </g>
  )
}

// ── KULLA E SAHATIT — the clock tower on the square (Tirana's Sahat-Kulla) ──
function gSahatKulla(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(3, 22, 12, 4)}
      <rect x={-8} y={-24} width={16} height={45} fill="#e2dbc9" stroke="#6f6759" strokeWidth={1.8} />
      <rect x={-8} y={-24} width={16} height={45} fill="none" stroke="#b8b0a0" strokeWidth={0.8} strokeDasharray="1.5 6" opacity={0.8} />
      <polygon points="-10,-24 0,-38 10,-24" fill="#8a5d3a" stroke="#4f3a2a" strokeWidth={1.6} />
      <circle cx={0} cy={-14} r={5.4} fill="#f4efe0" stroke="#6f6759" strokeWidth={1.4} />
      <line x1={0} y1={-14} x2={0} y2={-18} stroke="#3f382f" strokeWidth={1.2} strokeLinecap="round" />
      <line x1={0} y1={-14} x2={3} y2={-13} stroke="#3f382f" strokeWidth={1.2} strokeLinecap="round" />
      <rect x={-3.5} y={12} width={7} height={9} fill="#4f463c" />
      <rect x={-5.5} y={-2} width={11} height={4} fill="#d4cdbb" stroke="#8b8378" strokeWidth={0.8} />
    </g>
  )
}

// ── XHAMIA — the little mosque beside the square (Et'hem Bey's kin): dome,
// porch and a slender minaret with its balcony and crescent ──
function gMosque(x, y) {
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(3, 16, 18, 5)}
      <rect x={-16} y={-4} width={30} height={20} rx={1.5} fill="#e8e0cc" stroke="#6f6759" strokeWidth={1.8} />
      <path d="M -14 -4 A 13 13 0 0 1 12 -4 Z" fill="#7a8a8f" stroke="#4a565c" strokeWidth={1.6} />
      <circle cx={-1} cy={-16} r={2} fill="#c9a24a" />
      <rect x={-13} y={4} width={5} height={7} fill="#8a6a45" />
      <rect x={4} y={2} width={5} height={6} fill="#3a3229" opacity={0.7} />
      {/* the minaret */}
      <rect x={17} y={-26} width={4.6} height={42} fill="#ece5d2" stroke="#6f6759" strokeWidth={1.4} />
      <rect x={15.6} y={-13} width={7.4} height={3} fill="#d4cdbb" stroke="#8b8378" strokeWidth={0.8} />
      <polygon points="15.5,-26 19.3,-37 23.1,-26" fill="#7a8a8f" stroke="#4a565c" strokeWidth={1.2} />
      <path d="M 21.5 -40 a 3 3 0 1 0 0.2 4.6 a 2.4 2.4 0 1 1 -0.2 -4.6" fill="#c9a24a" />
    </g>
  )
}

// ── tanners' yard dressing: hides drying on a rack, and the round tanning pits ──
function HideRack({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1={-13} y1={-9} x2={-13} y2={8} stroke="#5c4230" strokeWidth={1.8} />
      <line x1={13} y1={-9} x2={13} y2={8} stroke="#5c4230" strokeWidth={1.8} />
      <line x1={-14} y1={-8} x2={14} y2={-8} stroke="#5c4230" strokeWidth={1.6} />
      {[-9, -1, 7].map((hx, i) => (
        <path key={i} d={`M ${hx - 3} -8 L ${hx + 3} -8 L ${hx + 2.4} -1 Q ${hx} 1.5 ${hx - 2.4} -1 Z`} fill={i % 2 ? '#c9a05c' : '#b98a4a'} stroke="#8a6238" strokeWidth={0.8} />
      ))}
    </g>
  )
}
function TanPits({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {[[-8, 0, '#8a6a3f'], [4, 5, '#6f5433'], [10, -4, '#9a7a48']].map(([px, py, tone], i) => (
        <g key={i}>
          <circle cx={px} cy={py} r={5.6} fill="#9a938a" stroke="#5b5348" strokeWidth={1.2} />
          <circle cx={px} cy={py} r={3.8} fill={tone} />
        </g>
      ))}
    </g>
  )
}

// ── LËMI — the round stone threshing floor by the fields ──
function ThreshingFloor({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={1} cy={2} rx={24} ry={13} fill="rgba(0,0,0,.14)" />
      <ellipse cx={0} cy={0} rx={23} ry={12.5} fill="#cbb98a" stroke="#8f7c55" strokeWidth={2} />
      <ellipse cx={0} cy={0} rx={16} ry={8.4} fill="none" stroke="#b3a173" strokeWidth={1} opacity={0.8} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return <line key={i} x1={Math.cos(a) * 5} y1={Math.sin(a) * 2.6} x2={Math.cos(a) * 21} y2={Math.sin(a) * 11.2} stroke="#d9c99a" strokeWidth={1.6} opacity={0.8} />
      })}
      <line x1={0} y1={0} x2={0} y2={-9} stroke="#6f4f34" strokeWidth={2.2} />
      <path d="M 12 -6 q 5 -4 10 -2" stroke="#d9b24e" strokeWidth={2.4} fill="none" strokeLinecap="round" />
    </g>
  )
}

// ── beehives (bletët) — three dome skeps on a bench ──
function Beehives({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect x={-16} y={3} width={32} height={3.4} rx={1} fill="#7a5c3a" stroke="#4f3a2a" strokeWidth={1} />
      {[-10, 0, 10].map((hx, i) => (
        <g key={i} transform={`translate(${hx},0)`}>
          <path d="M -4.4 3 Q -4.8 -4.5 0 -5.5 Q 4.8 -4.5 4.4 3 Z" fill="#d9b24e" stroke="#a67f2c" strokeWidth={1} />
          <line x1={-4.2} y1={-0.5} x2={4.2} y2={-0.5} stroke="#a67f2c" strokeWidth={0.7} />
          <line x1={-4.5} y1={1.6} x2={4.5} y2={1.6} stroke="#a67f2c" strokeWidth={0.7} />
          <circle cx={0} cy={2} r={0.9} fill="#4f3a2a" />
        </g>
      ))}
      {[[-14, -8], [8, -11], [16, -5]].map(([bx, by], i) => <circle key={'b' + i} cx={bx} cy={by} r={1} fill="#e8b53c" />)}
    </g>
  )
}

// ── the ox-cart (qerrja) on the high street ──
function OxCart({ x, y, rot = 0 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse cx={2} cy={6} rx={16} ry={3.4} fill="rgba(0,0,0,.16)" />
      <rect x={-10} y={-4} width={16} height={8} rx={1} fill="#8a6a45" stroke="#5c4230" strokeWidth={1.2} />
      {[-6, 2].map((wx, i) => (
        <g key={i}>
          <circle cx={wx} cy={5} r={4} fill="none" stroke="#5c4230" strokeWidth={1.8} />
          <line x1={wx - 3} y1={5} x2={wx + 3} y2={5} stroke="#5c4230" strokeWidth={1} />
          <line x1={wx} y1={2} x2={wx} y2={8} stroke="#5c4230" strokeWidth={1} />
        </g>
      ))}
      <line x1={6} y1={0} x2={17} y2={1} stroke="#5c4230" strokeWidth={1.6} />
      <path d="M 6 -4 q 4 -3 8 -2" stroke="#d9b24e" strokeWidth={2.2} fill="none" strokeLinecap="round" />
      {/* the ox */}
      <ellipse cx={23} cy={1} rx={6.4} ry={4} fill="#c9b9a5" stroke="#8a7a63" strokeWidth={1.1} />
      <circle cx={29} cy={-1.5} r={2.6} fill="#c9b9a5" stroke="#8a7a63" strokeWidth={1} />
      <path d="M 27.5 -3.5 q -1.5 -2.5 0.5 -3.5 M 30.5 -3.5 q 1.5 -2.5 -0.5 -3.5" stroke="#8a7a63" strokeWidth={1} fill="none" />
    </g>
  )
}

// ── HAMAMI — the little Ottoman bath-house by the pazar: two lead domes and
// a curl of steam from the flue ──
function Hammam({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={2} cy={12} rx={17} ry={4.6} fill="rgba(0,0,0,.2)" />
      <rect x={-15} y={-2} width={30} height={13} rx={1.5} fill="#d8d0be" stroke="#6f6759" strokeWidth={1.6} />
      <path d="M -14 -2 A 8.5 8.5 0 0 1 3 -2 Z" fill="#7a8a8f" stroke="#4a565c" strokeWidth={1.4} />
      <path d="M 4 -2 A 5.5 5.5 0 0 1 15 -2 Z" fill="#8a9aa0" stroke="#4a565c" strokeWidth={1.2} />
      <circle cx={-5.5} cy={-8} r={1.4} fill="#c9a24a" />
      <rect x={-4} y={5} width={6} height={6} fill="#4f463c" />
      <path d="M 11 -8 C 9.5 -11 12 -13 10.8 -16" fill="none" stroke="#e8e4da" strokeWidth={1.8} strokeLinecap="round" opacity={0.65} />
    </g>
  )
}

// ── THE COAST KIT — what an old Albanian shore actually has ─────────────────
// SKELA — the wooden jetty running out into the shallows, a boat tied at its head
function Jetty({ x, y, rot = 0 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <line x1={0} y1={0} x2={66} y2={0} stroke="#5c4230" strokeWidth={11} strokeLinecap="round" />
      <line x1={0} y1={0} x2={66} y2={0} stroke="#8a6a45" strokeWidth={7.5} strokeLinecap="round" />
      {Array.from({ length: 8 }, (_, i) => {
        const px = 4 + i * 8.4
        return <line key={i} x1={px} y1={-4.5} x2={px} y2={4.5} stroke="#5c4230" strokeWidth={1.4} />
      })}
      {[14, 34, 54].map((px, i) => (
        <g key={'p' + i}>
          <circle cx={px} cy={-5.5} r={1.6} fill="#4f3a2a" />
          <circle cx={px} cy={5.5} r={1.6} fill="#4f3a2a" />
        </g>
      ))}
      <path d="M 66 0 q 6 3 9 8" fill="none" stroke="#8a7a63" strokeWidth={1} />
    </g>
  )
}
// nets drying on poles by the boats
function NetRack({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <line x1={-14} y1={-10} x2={-14} y2={8} stroke="#5c4230" strokeWidth={1.8} />
      <line x1={14} y1={-11} x2={14} y2={8} stroke="#5c4230" strokeWidth={1.8} />
      <path d="M -14 -9 Q 0 -5 14 -10" fill="none" stroke="#7a6a50" strokeWidth={1.2} />
      <path d="M -13 -8 Q -6 3 -2 6 M -7 -7 Q 0 2 5 5 M 0 -7 Q 6 0 10 3 M 7 -8 Q 11 -3 13 -1
               M -12 -2 Q 0 2 12 -3 M -10 2 Q 0 6 10 1" fill="none" stroke="#9a8a68" strokeWidth={0.7} opacity={0.85} />
    </g>
  )
}
// KRIPORE — the salt pans: shallow ponds, white salt rims, the raked cone
function SaltPans({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {[[-24, -6, 30, 16, -4], [8, 2, 34, 17, 3], [-14, 14, 26, 13, -2]].map(([px, py, w, h, r], i) => (
        <g key={i} transform={`rotate(${r} ${px} ${py})`}>
          <rect x={px - w / 2} y={py - h / 2} width={w} height={h} rx={3} fill="#eef2ee" stroke="#b8b0a0" strokeWidth={1.6} />
          <rect x={px - w / 2 + 2.5} y={py - h / 2 + 2.5} width={w - 5} height={h - 5} rx={2} fill="#b9d4d4" opacity={0.9} />
          <path d={`M ${px - w / 2 + 4} ${py} h ${w - 8}`} stroke="#d8e6e4" strokeWidth={0.8} opacity={0.8} />
        </g>
      ))}
      <path d="M 28 -8 L 33 -16 L 38 -8 Z" fill="#f4f6f2" stroke="#c9c2b6" strokeWidth={0.9} />
      <line x1={24} y1={-6} x2={14} y2={0} stroke="#7a5c3a" strokeWidth={1.4} />
    </g>
  )
}
// the stone WATCHTOWER on the headland (every Albanian coast kept one against
// what came over the water; Cape Rodon keeps Skanderbeg's own)
function CoastTower({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <ellipse cx={2} cy={17} rx={12} ry={4} fill="rgba(0,0,0,.2)" />
      <path d={`M -10 16 L -7 -12 L 7 -12 L 10 16 Z`} fill="#a6a39b" stroke="#4b463d" strokeWidth={2} />
      <path d={`M -8 6 h 16 M -7 -3 h 14`} stroke="#8b8378" strokeWidth={0.9} opacity={0.9} />
      {[-7, -1.5, 4].map((bx, i) => <rect key={i} x={bx} y={-16} width={3.5} height={4.5} fill="#a6a39b" stroke="#4b463d" strokeWidth={1} />)}
      <rect x={-1.8} y={-6} width={3.6} height={5} fill="#2f2b24" />
      <path d="M 0 -18 C -2.6 -22 -0.8 -25 0 -28 C 0.8 -25 2.6 -22 0 -18 Z" fill="#e8892b" />
      <path d="M 0 -19 C -1.2 -22 -0.4 -24 0 -26 C 0.4 -24 1.2 -22 0 -19 Z" fill="#f6cf49" />
    </g>
  )
}

// ── KALAJA — the broken fragment of the old fortress wall (Tirana keeps one
// too): two weathered stubs and the stones that tumbled from them ──
function KalaWall({ x, y, rot = 0 }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${rot})`}>
      <ellipse cx={2} cy={7} rx={24} ry={4.6} fill="rgba(0,0,0,.15)" />
      <rect x={-24} y={-6} width={20} height={12} rx={1} fill="#a6a39b" stroke="#5b5348" strokeWidth={1.6} />
      <path d="M -24 -6 L -20 -9 L -14 -6 M -12 -6 L -8 -8 L -4 -6" fill="none" stroke="#5b5348" strokeWidth={1.2} />
      <rect x={6} y={-4} width={14} height={10} rx={1} fill="#9a978e" stroke="#5b5348" strokeWidth={1.6} />
      <line x1={-22} y1={0} x2={-6} y2={0} stroke="#8b887f" strokeWidth={0.9} opacity={0.9} />
      <line x1={8} y1={1} x2={18} y2={1} stroke="#8b887f" strokeWidth={0.9} opacity={0.9} />
      {[[-1, 4], [2, 6.5], [24, 3]].map(([sx, sy], i) => (
        <ellipse key={i} cx={sx} cy={sy} rx={2.6} ry={1.7} fill="#9a938a" stroke="#6a6156" strokeWidth={0.8} />
      ))}
    </g>
  )
}

function gSquare(x, y) {
  // a REAL piazza: an irregular stone-kerbed plaza (village squares are never
  // rectangles), visibly lighter than the packed earth around it, cobbled in
  // worn rows, framed by the facade ring the roof generator lays around it —
  // with the great plane tree, two market stalls and villagers about their day.
  const P = `M ${x - 105} ${y - 62} Q ${x - 40} ${y - 78} ${x + 38} ${y - 74} Q ${x + 106} ${y - 70} ${x + 112} ${y - 20}
             Q ${x + 116} ${y + 30} ${x + 96} ${y + 68} Q ${x + 30} ${y + 84} ${x - 44} ${y + 80}
             Q ${x - 100} ${y + 76} ${x - 108} ${y + 28} Q ${x - 113} ${y - 18} ${x - 105} ${y - 62} Z`
  const rnd = mulberry32(432001)
  const cobbles = []
  for (let ry = -58; ry <= 66; ry += 13) {
    for (let rx = -96 + (Math.abs(ry) % 2) * 7; rx <= 100; rx += 15) {
      if (rnd() < 0.28) continue
      if (Math.abs(rx) > 108 - Math.abs(ry) * 0.3) continue
      cobbles.push([x + rx + (rnd() - 0.5) * 5, y + ry + (rnd() - 0.5) * 4, 3.4 + rnd() * 2.2, rnd() * 24])
    }
  }
  return (
    <g>
      <path d={P} fill="#8f7c55" opacity={0.5} transform="translate(3,4)" />
      <path d={P} fill="#d6c69a" stroke="#8f7c55" strokeWidth={3.2} strokeLinejoin="round" />
      <path d={P} fill="none" stroke="#efe3bf" strokeWidth={1.2} opacity={0.8} transform="translate(-1.5,-2)" />
      {cobbles.map(([px, py, r, rot], i) => (
        <ellipse key={i} cx={px} cy={py} rx={r} ry={r * 0.62} fill="#c3b184" stroke="#a8956a" strokeWidth={0.5} opacity={0.75} transform={`rotate(${rot - 12} ${px} ${py})`} />
      ))}
      {/* worn pale patch where feet cross toward the well */}
      <ellipse cx={x - 8} cy={y + 4} rx={62} ry={34} fill="#e3d4a6" opacity={0.5} />
      <PlaneTree x={x + 62} y={y + 8} />
      <Stall x={x - 74} y={y - 26} rot={-5} />
      <Stall x={x - 64} y={y + 30} rot={4} />
      <Villager x={x - 28} y={y - 12} c="#8a5a6a" />
      <Villager x={x + 22} y={y + 24} c="#5e7f92" />
      <Villager x={x - 9} y={y + 39} c="#7a6a3f" />
      <Villager x={x + 33} y={y - 34} c="#6a4a3a" />
      <Villager x={x - 46} y={y + 8} c="#4a5a6a" />
    </g>
  )
}

const GLYPH = (pl) => {
  const { x, y, type, roof } = pl
  switch (type) {
    case 'square': return null // the piazza is TERRAIN — drawn un-dimmed before the pins
    case 'well': return gWell(x, y)
    case 'oda': return gOda(x, y)
    case 'hearth': return gHearth(x, y)
    case 'tower': return gTower(x, y)
    case 'palace': return gPalace(x, y)
    case 'garden': return gGarden(x, y)
    case 'mill': return gMill(x, y)
    case 'spring': return gSpring(x, y)
    case 'church': return gChurch(x, y)
    case 'graves': return gGraves(x, y)
    case 'pasture': return gPasture(x, y)
    case 'scarecrow': return gScarecrow(x, y)
    case 'bonfire': return gBonfire(x, y)
    case 'rooster': return gRooster(x, y)
    case 'claydoll': return gClayDoll(x, y)
    case 'signpost': return gSignpost(x, y)
    case 'stonebridge': return gStoneBridge(x, y)
    case 'crossroads': return gCrossroads(x, y)
    case 'roadmark': return gRoadmark(x, y)
    case 'house': return gHouse(x, y, roof)
    default: return null
  }
}

// ---------------------------------------------------------------------------
// THE WORLD beyond the village — every OTHER node placed in a terrain region by
// its graph-distance to that region's anchors, so the whole 380-node world is on
// one pan/zoom map. Regions ring the village: sky & mountain above, forest west,
// river & castle & sea east, the underworld below (down through the well).
// ---------------------------------------------------------------------------
const VILLAGE_IDS = new Set(VILLAGE_PLACES.map((p) => p.id))
// ── THE WORLD, re-rigged to the real (rotated) map of Albania ──────────────
// The village (≈ Tirana) stays centred; the ONE river runs down its WEST side
// from Mount Tomorr (top-centre, south-up) to Rozafa castle at the river-mouth
// (bottom-centre), with Lake Shkodra beside it. The great forest lies west
// across the river (the hero bridge crosses to it); the Adriatic fills the east.
// The world below hangs deepest, down through the village well.
function hashStr(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}

// Lay a region's nodes out by STORY ORDER: BFS depth over intra-region
// progression edges from the region's entry nodes, placed in rings that grow
// outward — the region's entrance sits near the centre, its deep scenes/endings
// ring the edge, so each region reads as its own little quest fanning out.
function layoutRegion(ids, rg) {
  if (!ids.length) return []
  const set = new Set(ids)
  const adj = {}, indeg = {}
  for (const id of ids) { adj[id] = []; indeg[id] = 0 }
  for (const id of ids) for (const o of (STORY[id].options || [])) {
    if (o.confuser || !o.to || isWander(o) || !set.has(o.to)) continue
    adj[id].push(o.to); indeg[o.to]++
  }
  let entries = ids.filter((id) => indeg[id] === 0)
  if (!entries.length) entries = [[...ids].sort()[0]]
  const depth = {}, q = []
  for (const e of entries.sort()) { depth[e] = 0; q.push(e) }
  for (let h = 0; h < q.length; h++) for (const v of [...adj[q[h]]].sort()) if (depth[v] == null) { depth[v] = depth[q[h]] + 1; q.push(v) }
  let maxD = 0
  for (const id of ids) { if (depth[id] == null) depth[id] = 1; maxD = Math.max(maxD, depth[id]) }
  const byDepth = {}
  for (const id of ids) (byDepth[depth[id]] || (byDepth[depth[id]] = [])).push(id)
  const out = []
  for (const d of Object.keys(byDepth)) {
    const layer = byDepth[d].sort()
    const frac = maxD ? 0.16 + 0.82 * (Number(d) / maxD) : 0.4
    layer.forEach((id, i) => {
      const a = ((i + 0.5) / layer.length) * Math.PI * 2 + Number(d) * 0.7
      out.push({ id, x: rg.cx + Math.cos(a) * rg.rx * frac, y: rg.cy + Math.sin(a) * rg.ry * frac })
    })
  }
  return out
}

// ---- region terrain ---------------------------------------------------------
// a small cumulus terrace — a puffy cloud island a sky-scene can stand on.
function CloudPuff({ x, y, w = 90, top = '#eef2fa', under = '#c9d3e8' }) {
  return (
    <g>
      <circle cx={x - w * 0.3} cy={y + w * 0.1} r={w * 0.22} fill={under} />
      <circle cx={x + w * 0.28} cy={y + w * 0.1} r={w * 0.2} fill={under} />
      <circle cx={x} cy={y + w * 0.14} r={w * 0.26} fill={under} />
      <circle cx={x - w * 0.22} cy={y} r={w * 0.2} fill={top} />
      <circle cx={x + w * 0.2} cy={y} r={w * 0.18} fill={top} />
      <ellipse cx={x} cy={y} rx={w * 0.42} ry={w * 0.14} fill={top} />
    </g>
  )
}

function terrSky(rg) {
  // the sky realm is a real explorable place: the SUN'S COMPOUND on its great
  // cloud-plateau (golden court + garden + oda + the forecourt gate where the
  // beasts are summoned + the road of the Sun down the light-ray), the Moon's
  // silver terrace, Zojz's storm court, Prende's rosy terrace, the winds'
  // swirling hollow and the white bull's cloud-pasture — plus stars and clouds.
  const { cx, cy, rx, ry } = rg, rnd = mulberry32(7)
  const isle = (x, y, w, h, top, under, seed) => (
    <g>
      <path d={blobPath(x - w * 0.26, y + h * 0.34, w * 0.28, h * 0.52, seed + 1, 0.22, 10)} fill={under} />
      <path d={blobPath(x + w * 0.28, y + h * 0.3, w * 0.26, h * 0.48, seed + 2, 0.22, 10)} fill={under} />
      <path d={blobPath(x, y + h * 0.26, w * 0.5, h * 0.62, seed, 0.16, 12)} fill={under} />
      <path d={blobPath(x, y, w * 0.6, h * 0.3, seed + 3, 0.09, 16)} fill={top} />
    </g>
  )
  return (
    <g>
      {/* stars fade out toward the bottom of the sky */}
      {Array.from({ length: 80 }, (_, i) => { const sy = cy - ry * 1.15 + rnd() * ry * 2.1; return <circle key={i} cx={cx - rx * 1.5 + rnd() * rx * 3} cy={sy} r={rnd() * 1.5 + 0.5} fill="#fff" opacity={(0.5 + rnd() * 0.4) * Math.max(0, Math.min(1, (cy + ry * 0.4 - sy) / (ry * 1.3)))} /> })}
      {/* far decorative clouds, kept clear of the homes */}
      {[[-560, -1310], [40, -1450], [1080, -1180], [-420, -1440], [1140, -1390], [-620, -1120]].map(([x, y], i) => (
        <g key={i} opacity={0.8}>{[[0, 0, 26], [24, 6, 20], [-24, 6, 20], [10, -10, 17]].map(([dx, dy, r], j) => <circle key={j} cx={x + dx} cy={y + dy} r={r} fill="#f2f6fc" />)}</g>
      ))}

      {/* ── ZOJZ'S STORM COURT (highest, top-centre) ── */}
      <g>
        {isle(470, -1395, 340, 120, '#cfd8ea', '#8f9cb8', 771)}
        <ellipse cx={445} cy={-1408} rx={74} ry={22} fill="#bac6de" opacity={0.75} />
        <path d="M 388 -1442 L 372 -1414 L 384 -1414 L 368 -1382" fill="none" stroke="#f4c430" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" opacity={0.9} />
        <CloudPuff x={430} y={-1292} w={84} top="#dfe6f2" under="#a9b6d0" />
      </g>

      {/* ── the white bull's cloud-pasture ── */}
      <g>
        <CloudPuff x={120} y={-1372} w={130} top="#eef3fa" under="#c3cede" />
        {[[80, -1392], [128, -1400], [162, -1386]].map(([fx, fy], i) => <circle key={i} cx={fx} cy={fy} r={2.2} fill="#e8c24a" opacity={0.85} />)}
      </g>

      {/* ── the MOON'S silver terrace (top-east) ── */}
      <g>
        {isle(720, -1268, 300, 110, '#e9edf7', '#bfc9e0', 881)}
        <ellipse cx={720} cy={-1282} rx={92} ry={30} fill="#dfe7f2" stroke="#a9b6cc" strokeWidth={1.6} />
        <path d="M 748 -1304 A 30 30 0 1 0 748 -1260 A 23 23 0 1 1 748 -1304 Z" fill="#f2f6fc" opacity={0.85} />
        {[[652, -1296], [688, -1266], [774, -1268]].map(([sx, sy], i) => (
          <circle key={i} cx={sx} cy={sy} r={1.8} fill="#fff" opacity={0.8} />
        ))}
      </g>
      {/* ── PRENDE'S rosy terrace (west) ── */}
      <g>
        <CloudPuff x={-260} y={-1062} w={120} top="#f4e4ea" under="#d3bcc9" />
        {[[-306, -1092], [-215, -1096], [-258, -1108]].map(([sx, sy], i) => (
          <path key={i} d={`M ${sx} ${sy - 4} l 1.2 3.2 l 3.4 0.2 l -2.6 2.2 l 0.8 3.3 l -2.8 -1.9 l -2.8 1.9 l 0.8 -3.3 l -2.6 -2.2 l 3.4 -0.2 Z`} fill="#fce38a" opacity={0.9} />
        ))}
      </g>
      {/* the rainbow arc off Prende's terrace (ylberi) */}
      <path d="M -370 -1010 A 150 130 0 0 1 -150 -1046" fill="none" stroke="#c98fb0" strokeWidth={5} opacity={0.5} strokeLinecap="round" />
      <path d="M -370 -1016 A 150 130 0 0 1 -152 -1052" fill="none" stroke="#e8c24a" strokeWidth={4} opacity={0.5} strokeLinecap="round" />
      <path d="M -371 -1022 A 150 130 0 0 1 -154 -1058" fill="none" stroke="#8fb9c4" strokeWidth={4} opacity={0.5} strokeLinecap="round" />

      {/* ── the WINDS' swirling hollow (east) ── */}
      <g>
        <CloudPuff x={760} y={-1012} w={130} top="#ccd6e6" under="#9fb0ca" />
        <path d="M 700 -1046 C 726 -1062 762 -1062 776 -1048 C 788 -1036 776 -1026 764 -1032" fill="none" stroke="#eef3fb" strokeWidth={3} strokeLinecap="round" opacity={0.8} />
        <path d="M 806 -1030 C 830 -1042 848 -1030 842 -1016" fill="none" stroke="#dfe7f2" strokeWidth={2.4} strokeLinecap="round" opacity={0.7} />
      </g>

      {/* ── the radiance behind Dielli himself ── */}
      <circle cx={-120} cy={-1230} r={56} fill="#f6cf49" opacity={0.14} />
      <circle cx={-120} cy={-1230} r={34} fill="#fce38a" opacity={0.16} />

      {/* ══ the SUN'S COMPOUND — the great cloud-plateau you explore ══ */}
      <g>
        {/* the cloud island itself */}
        {isle(295, -1085, 620, 200, '#f6f1df', '#d9dcec', 991)}
        <path d={blobPath(295, -1102, 350, 72, 995, 0.08, 16)} fill="#f2e8c8" />
        {/* the golden court with its sun-ray paving */}
        <ellipse cx={300} cy={-1105} rx={152} ry={54} fill="#f2dfa8" stroke="#d8b25c" strokeWidth={2.2} />
        <ellipse cx={300} cy={-1105} rx={160} ry={60} fill="none" stroke="#d8b25c" strokeWidth={1.8} strokeDasharray="7 6" opacity={0.8} />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2
          return <line key={i} x1={300 + Math.cos(a) * 24} y1={-1105 + Math.sin(a) * 9} x2={300 + Math.cos(a) * 140} y2={-1105 + Math.sin(a) * 48} stroke="#e0bc6a" strokeWidth={1.6} opacity={0.7} />
        })}
        <circle cx={300} cy={-1105} r={13} fill="#f6cf49" stroke="#c9871e" strokeWidth={1.6} />
        {/* the garden of the Sun (west wing) — beds of golden cabbages */}
        <g transform="translate(205,-1085)">
          <rect x={-34} y={-24} width={68} height={46} rx={5} fill="#8fae5c" stroke="#6f8a3f" strokeWidth={1.8} />
          <rect x={-34} y={-24} width={68} height={46} rx={5} fill="none" stroke="#e0bc6a" strokeWidth={1.4} strokeDasharray="4 4" opacity={0.9} />
          {[-22, -6, 10, 26].map((gx, i) => (
            <g key={i}>{[-14, -1, 12].map((gy, j) => (
              <circle key={j} cx={gx} cy={gy} r={4.2} fill={(i + j) % 2 ? '#b9cf74' : '#a9c66a'} stroke="#7a9448" strokeWidth={0.9} />
            ))}</g>
          ))}
        </g>
        {/* the forecourt gate (south) where the beasts are summoned */}
        <ellipse cx={300} cy={-1058} rx={30} ry={11} fill="#efe0b4" stroke="#d8b25c" strokeWidth={1.4} />
        <rect x={272} y={-1076} width={5} height={14} rx={1} fill="#e6b53a" stroke="#a8710f" strokeWidth={1} />
        <rect x={323} y={-1076} width={5} height={14} rx={1} fill="#e6b53a" stroke="#a8710f" strokeWidth={1} />
        <circle cx={274.5} cy={-1078} r={3} fill="#f6cf49" stroke="#a8710f" strokeWidth={0.8} />
        <circle cx={325.5} cy={-1078} r={3} fill="#f6cf49" stroke="#a8710f" strokeWidth={0.8} />
        {/* the road of the Sun — golden, out the gate and down onto the ray */}
        <path d="M 300 -1100 L 300 -1028" fill="none" stroke="#e6b53a" strokeWidth={11} strokeLinecap="round" opacity={0.85} />
        <path d="M 300 -1100 L 300 -1028" fill="none" stroke="#fff3c4" strokeWidth={2.4} strokeDasharray="3 8" strokeLinecap="round" />
      </g>
      {/* stepping-clouds down the ray: the stag's road home + the sun-tree's perch */}
      <path d="M 300 -1030 C 302 -996 336 -958 380 -938" fill="none" stroke="#e6b53a" strokeWidth={6} strokeLinecap="round" opacity={0.45} strokeDasharray="10 8" />
      <CloudPuff x={300} y={-972} w={86} top="#f2eeda" under="#d5d5e6" />
      <CloudPuff x={384} y={-920} w={96} top="#f2eeda" under="#d5d5e6" />
    </g>
  )
}

function terrMountains(rg) {
  // a layered range with atmospheric depth: hazy blue back ridges, a sharp
  // snow-capped front ridge (Tomorr the tallest), a lit face + a shaded face,
  // hazing into the sky above and the land below.
  const { cx, cy, rx, ry } = rg
  const base = cy + ry * 0.62
  const ridge = (peaks, fill, shade, strk, snow) =>
    peaks.map(([px, ph], i) => (
      <g key={i}>
        <polygon points={`${px},${base - ph} ${px - ph * 0.8},${base} ${px + ph * 0.8},${base}`} fill={fill} stroke={strk} strokeWidth={1.6} strokeLinejoin="round" />
        <polygon points={`${px},${base - ph} ${px + ph * 0.8},${base} ${px},${base}`} fill={shade} opacity={0.45} />
        {snow && <polygon points={`${px},${base - ph} ${px - ph * 0.2},${base - ph * 0.72} ${px - ph * 0.02},${base - ph * 0.66} ${px + ph * 0.12},${base - ph * 0.76} ${px + ph * 0.22},${base - ph * 0.7}`} fill="#eff4f6" />}
        {snow && <polygon points={`${px},${base - ph} ${px + ph * 0.22},${base - ph * 0.7} ${px + ph * 0.12},${base - ph * 0.76} ${px},${base - ph * 0.66}`} fill="#c6d4dc" opacity={0.7} />}
      </g>
    ))
  const far = [[cx - rx * 1.02, ry * 0.6], [cx - rx * 0.88, ry * 0.78], [cx + rx * 0.9, ry * 0.72], [cx + rx * 1.04, ry * 0.55]]
  const back = [[cx - rx * 0.72, ry * 0.95], [cx - rx * 0.22, ry * 1.2], [cx + rx * 0.32, ry * 1.15], [cx + rx * 0.74, ry * 0.9]]
  const mid = [[cx - rx * 0.48, ry * 1.1], [cx - rx * 0.02, ry * 1.35], [cx + rx * 0.44, ry * 1.12]]
  const front = [[cx - rx * 0.66, ry * 0.82], [cx - rx * 0.3, ry * 1.18], [cx, ry * 1.55], [cx + rx * 0.36, ry * 1.12], [cx + rx * 0.68, ry * 0.8]]
  // one sheep of the highland pastures
  const sheep = (sx, sy) => (
    <g transform={`translate(${sx},${sy})`}>
      <ellipse cx={0} cy={0} rx={4.6} ry={2.7} fill="#efe9dc" stroke="#8a7d63" strokeWidth={0.8} />
      <circle cx={4.2} cy={-1.4} r={2} fill="#efe9dc" stroke="#8a7d63" strokeWidth={0.8} />
      <line x1={-2} y1={2} x2={-2} y2={4.6} stroke="#8a7d63" strokeWidth={0.8} />
      <line x1={2} y1={2} x2={2} y2={4.6} stroke="#8a7d63" strokeWidth={0.8} />
    </g>
  )
  return (
    <g>
      {/* haze band blending the range up into the sky (kept clear of the
          foothills so it doesn't grey out the village's north approach) */}
      <ellipse cx={cx} cy={base - ry * 0.78} rx={rx * 1.3} ry={ry * 0.6} fill="#9fb0c0" opacity={0.14} />
      {ridge(far, '#a9b6c2', '#93a2b0', '#9aa8b5', false)}
      {ridge(back, '#9aa9b6', '#7d8d9c', '#8493a2', false)}
      {ridge(mid, '#84928b', '#616e66', '#5b6656', false)}
      {ridge(front, '#7f8c74', '#57634c', '#454f38', true)}
      {/* pine tree-line + foothills, blending the base into the land */}
      <ellipse cx={cx} cy={base + ry * 0.03} rx={rx * 1.14} ry={ry * 0.15} fill="#6f8557" opacity={0.5} />
      {Array.from({ length: 13 }, (_, i) => { const hx = cx - rx * 1.1 + (i + 0.5) / 13 * rx * 2.2; return <ellipse key={'f' + i} cx={hx} cy={base + ry * 0.09} rx={rx * 0.12} ry={ry * 0.11} fill="#748a56" opacity={0.7} /> })}

      {/* ── JUTBINA — the kreshnik hamlet on its highland shelf: a stone-walled
          mountain terrace where every kreshnik tale keeps its own kulla; the
          zanas' meadow above it, the bare mejdan duelling ground below. ── */}
      <g>
        {/* the shelf: a rocky terrace with a green meadow top */}
        <path d={blobPath(566, -352, 178, 108, 641, 0.14, 14)} fill="#8b8b7e" opacity={0.85} />
        <path d={blobPath(566, -360, 160, 92, 642, 0.13, 14)} fill="#96ab68" />
        <path d={blobPath(600, -336, 84, 48, 643, 0.2, 10)} fill="#88a05c" opacity={0.8} />
        {/* dry-stone field walls */}
        <path d="M 448 -334 C 500 -312 560 -306 648 -318" fill="none" stroke="#8f8d84" strokeWidth={3} strokeDasharray="6 4" opacity={0.8} />
        <path d="M 522 -424 C 560 -404 606 -400 656 -410" fill="none" stroke="#8f8d84" strokeWidth={3} strokeDasharray="6 4" opacity={0.8} />
        <path d="M 662 -404 C 676 -372 678 -348 668 -324" fill="none" stroke="#8f8d84" strokeWidth={3} strokeDasharray="6 4" opacity={0.7} />
        {/* the lane down from the hamlet gate to the mejdan */}
        <path d="M 536 -352 C 512 -322 490 -294 472 -266" fill="none" stroke="#b3a377" strokeWidth={7} strokeLinecap="round" opacity={0.85} />
        <path d="M 536 -352 C 512 -322 490 -294 472 -266" fill="none" stroke="#e2d6b2" strokeWidth={2} strokeDasharray="2 8" strokeLinecap="round" />
        {/* the zanas' moonlit meadow above the hamlet */}
        <ellipse cx={505} cy={-428} rx={52} ry={26} fill="#a9c66a" opacity={0.65} />
        <ellipse cx={505} cy={-428} rx={52} ry={26} fill="none" stroke="#eef2fa" strokeWidth={1.6} strokeDasharray="3 6" opacity={0.75} />
        {/* pasture life */}
        {sheep(614, -300)}{sheep(646, -352)}{sheep(500, -318)}
        {[[470, -406], [652, -294], [430, -350]].map(([bx, by], i) => (
          <g key={i} transform={`translate(${bx},${by})`}>
            <ellipse cx={-2} cy={0} rx={5} ry={4} fill="#9a938a" stroke="#6a6156" strokeWidth={1} />
            <ellipse cx={3} cy={1} rx={4} ry={3} fill="#8b857b" stroke="#6a6156" strokeWidth={1} />
          </g>
        ))}
      </g>
    </g>
  )
}

function terrForest(rg) {
  // an irregular canopy MASS with a density gradient — dense dark heart thinning
  // to scattered trees at the rim where it dissolves into meadow; a mossy floor
  // and a small clearing read through the gaps.
  const { cx, cy, rx, ry } = rg, rnd = mulberry32(23), trees = []
  const clearing = [-430, 452] // the camp glade — at the END of the hero-bridge road (VILLAGE_ROADS), where lendina stands
  for (let k = 0; k < 150; k++) {
    const a = rnd() * Math.PI * 2, rr = Math.sqrt(rnd())
    const x = cx + Math.cos(a) * rx * rr, y = cy + Math.sin(a) * ry * rr
    if (rr > 0.66 && rnd() < (rr - 0.66) / 0.34 * 0.72) continue          // thin the rim
    if (Math.hypot(x - clearing[0], y - clearing[1]) < 60) continue        // keep the glade open
    trees.push([x, y, 0.58 + rnd() * 0.82])
  }
  trees.sort((a, b) => a[1] - b[1])
  return (
    <g>
      <path d={blobPath(cx, cy, rx * 1.04, ry * 1.04, 231, 0.16, 18)} fill="#3b5535" opacity={0.6} />
      <path d={blobPath(cx, cy, rx * 0.82, ry * 0.82, 232, 0.18, 16)} fill="#47623e" opacity={0.6} />
      {Array.from({ length: 6 }, (_, i) => { const a = i / 6 * Math.PI * 2 + 0.5, x = cx + Math.cos(a) * rx * 0.5, y = cy + Math.sin(a) * ry * 0.52; return <ellipse key={'m' + i} cx={x} cy={y} rx={30} ry={15} fill="#5c7844" opacity={0.4} /> })}
      <ellipse cx={clearing[0]} cy={clearing[1]} rx={44} ry={26} fill="#7f9a54" opacity={0.55} />
      {trees.map(([x, y, s], i) => <Tree key={i} x={x} y={y} s={s} />)}
    </g>
  )
}

function terrRiver(rg) {
  // the green water-meadow floodplain the river threads through (the river itself
  // is drawn once at the world level); organic banks + reed beds.
  const { cx, cy, rx, ry } = rg, rnd = mulberry32(41), reeds = []
  for (let k = 0; k < 44; k++) { const a = rnd() * Math.PI * 2, r = 0.4 + rnd() * 0.6; reeds.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]) }
  return (
    <g>
      <path d={blobPath(cx, cy, rx, ry, 411, 0.19, 16)} fill="#8fae5c" opacity={0.4} />
      <path d={blobPath(cx, cy, rx * 0.68, ry * 0.72, 412, 0.22, 14)} fill="#7c9a4a" opacity={0.34} />
      {reeds.map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x + (i % 2 ? 2 : -2)} y2={y - 11} stroke="#6f8a3f" strokeWidth={1.6} opacity={0.55} />)}
    </g>
  )
}

// the horizon where sky meets the open sea (hard line), and the far edge the sea
// runs off past (map cuts it off on the right & bottom).
const SEA_HORIZON = -560
const SEA_FAR = 4800
// the landward coastline x at a given y — the ACTUAL shape of the Albanian Adriatic
// coast (map is south-up, so y increases going NORTH): a diagonal near the horizon,
// the Cape of Rodon / Durrës HEADLAND jutting east (~Tirana's latitude), the broad
// concave GULF OF DRIN receding west (~Lezhë), narrowing to the Buna / Shkodra
// delta at the river-mouth. Everything west of this line is land.
const seaCoastX = (y) => {
  const base = 980 + Math.max(0, 160 - y) * 0.18                       // shore sits east of the town, a touch further east up top
  const rodon = 66 * Math.exp(-Math.pow((y - 560) / 300, 2))          // Durrës–Cape of Rodon coast, bulging gently east
  const drin = -320 * Math.exp(-Math.pow((y - 1180) / 250, 2))        // the GULF OF DRIN — a deep concave bay (Lezhë), below the town
  const buna = -150 * Math.exp(-Math.pow((y - 1620) / 190, 2))        // the Buna / Shkodra delta
  const cove = Math.sin(y * 0.021) * 12 + Math.sin(y * 0.0075 + 2) * 18 + Math.sin(y * 0.05) * 5 // small coves & inlets
  return base + rodon + drin + buna + cove
}

// ── the VILLAGE CLEARING as an ORGANIC shape, not an oval: a wobbled radius
// per angle, and the whole east side held short of the drawn coastline so the
// meadow (and the tree ring traced along the same edge) never wades into the
// Adriatic. Shared by the drawn grass and the tree-ring generator.
const CLEARING = { cx: 512, cy: 432, rx: 590, ry: 452 }
function clearingPoint(a, wobble) {
  const r = 1 + Math.sin(a * 3 + 1) * 0.07 + Math.sin(a * 5 + 3) * 0.045 + wobble
  let x = CLEARING.cx + Math.cos(a) * CLEARING.rx * r
  const y = CLEARING.cy + Math.sin(a) * CLEARING.ry * r
  const lim = seaCoastX(y) - 92
  if (x > lim) x = lim
  return [x, y]
}
const VILLAGE_CLEARING_D = (() => {
  const rnd = mulberry32(9401), pts = []
  const N = 30
  for (let i = 0; i < N; i++) pts.push(clearingPoint((i / N) * Math.PI * 2, (rnd() - 0.5) * 0.07))
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`
  for (let i = 0; i < N; i++) {
    const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return d + ' Z'
})()
function terrSea() {
  // the open Adriatic — bounded ONLY by the coastline (west) and the hard horizon
  // (top); it runs off the map to the right and bottom. Sandy beach at the shore,
  // a foam line, near-shore waves, a boat.
  const ys = []
  for (let y = SEA_HORIZON; y <= SEA_FAR; y += 130) ys.push(y)
  if (ys[ys.length - 1] !== SEA_FAR) ys.push(SEA_FAR)
  const coast = ys.map((y) => [seaCoastX(y), y])
  const fx = (n) => n.toFixed(1)
  let sea = `M ${fx(coast[0][0])} ${SEA_HORIZON} L ${SEA_FAR} ${SEA_HORIZON} L ${SEA_FAR} ${SEA_FAR} L ${fx(coast[coast.length - 1][0])} ${SEA_FAR}`
  for (let i = coast.length - 1; i >= 0; i--) sea += ` L ${fx(coast[i][0])} ${fx(coast[i][1])}`
  sea += ' Z'
  let beach = `M ${fx(coast[0][0] + 8)} ${SEA_HORIZON}`
  for (let i = 0; i < coast.length; i++) beach += ` L ${fx(coast[i][0] + 8)} ${fx(coast[i][1])}`
  for (let i = coast.length - 1; i >= 0; i--) beach += ` L ${fx(coast[i][0] - 54 - Math.sin(coast[i][1] * 0.02) * 12)} ${fx(coast[i][1])}`
  beach += ' Z'
  return (
    <g>
      <path d={beach} fill="#e3d2a6" opacity={0.5} />
      <path d={sea} fill="url(#wSea)" />
      <path d={`M ${coast.map((p) => `${fx(p[0])} ${fx(p[1])}`).join(' L ')}`} fill="none" stroke="#eaf5f8" strokeWidth={4} opacity={0.5} />
      {ys.map((y, i) => (i % 2 || y > 2600 ? null : (
        <g key={i}>{Array.from({ length: 9 }, (_, j) => { const x = seaCoastX(y) + 90 + j * 150 + (i % 4 ? 40 : 0); return <path key={j} d={`M ${x - 14} ${y} q 7 -6 14 0 q 7 6 14 0`} fill="none" stroke="#c8e6ef" strokeWidth={1.6} opacity={0.38} /> })}</g>
      )))}
      <g transform={`translate(${seaCoastX(760) + 300},760) rotate(-6)`}>
        <path d="M-17 4 L17 4 L11 13 L-11 13 Z" fill="#7a5c3a" stroke="#4f3a2a" strokeWidth={1.6} />
        <rect x={-1} y={-19} width={2.4} height={23} fill="#4f3a2a" />
        <path d="M1 -17 L15 -3 L1 -3 Z" fill="#efe7d5" />
      </g>
      {/* a second sail, out in the deep on the long way home */}
      <g transform={`translate(${seaCoastX(1900) + 520},1900) rotate(5)`}>
        <path d="M-13 3 L13 3 L8 10 L-8 10 Z" fill="#7a5c3a" stroke="#4f3a2a" strokeWidth={1.4} />
        <rect x={-0.8} y={-15} width={2} height={18} fill="#4f3a2a" />
        <path d="M1 -13 L12 -2 L1 -2 Z" fill="#efe7d5" />
      </g>
      {/* gulls over the coast */}
      {[[1130, 420], [1260, 290], [940, 150]].map(([gx, gy], i) => (
        <path key={'gl' + i} d={`M ${gx - 8} ${gy} Q ${gx - 3} ${gy - 6} ${gx} ${gy} Q ${gx + 3} ${gy - 6} ${gx + 8} ${gy}`} fill="none" stroke="#eef5f8" strokeWidth={2} opacity={0.7} />
      ))}
      {/* ── the DROWNED PALACE of E Bukura e Detit, glimmering under the deep ── */}
      <g opacity={0.6}>
        <ellipse cx={1680} cy={1448} rx={92} ry={27} fill="#3f7f96" opacity={0.8} />
        {[[1642, 1444, 26], [1680, 1436, 36], [1718, 1446, 24]].map(([px, py, ph], i) => (
          <g key={'pal' + i}>
            <rect x={px - 9} y={py - ph * 0.5} width={18} height={ph * 0.5 + 10} rx={2} fill="#5e93a8" stroke="#2f6478" strokeWidth={1.4} />
            <path d={`M ${px - 9} ${py - ph * 0.5} Q ${px} ${py - ph * 0.95} ${px + 9} ${py - ph * 0.5}`} fill="#7fb0c2" stroke="#2f6478" strokeWidth={1.2} />
            <circle cx={px} cy={py - ph * 0.95 - 2} r={2} fill="#eaf5f8" />
          </g>
        ))}
        {[[1612, 1452], [1700, 1470], [1752, 1440]].map(([bx, by], i) => (
          <g key={'bub' + i}>
            <circle cx={bx} cy={by - 26} r={2.2} fill="#d8eef5" opacity={0.7} />
            <circle cx={bx + 5} cy={by - 14} r={3} fill="#d8eef5" opacity={0.5} />
          </g>
        ))}
      </g>
      {/* the eagle's islet — where the long climb back to the surface begins */}
      <g>
        <path d={blobPath(1560, 1654, 68, 30, 711, 0.18, 12)} fill="#d8c79c" stroke="#b09a6a" strokeWidth={2} />
        <path d={blobPath(1542, 1648, 30, 14, 712, 0.2, 8)} fill="#9a938a" opacity={0.85} />
        <path d="M 1508 1668 q 12 -5 24 0 M 1588 1672 q 10 -4 20 0" stroke="#eaf5f8" strokeWidth={1.6} fill="none" opacity={0.6} />
      </g>
      {/* ── old-chart dressing ── a compass rose out on the open water. The map
          is SOUTH-UP (rotated Albania), so jugu sits at the top: J up, V down,
          L (lindje/east) left, P (perëndimi/west) right. */}
      <g transform="translate(1400,-210)" opacity={0.75} style={{ pointerEvents: 'none' }}>
        <circle r={52} fill="#eaf5f8" opacity={0.09} />
        <circle r={46} fill="none" stroke="#eaf5f8" strokeWidth={1.6} opacity={0.65} />
        <circle r={34} fill="none" stroke="#eaf5f8" strokeWidth={0.8} opacity={0.45} strokeDasharray="3 5" />
        {[45, 135, 225, 315].map((a, i) => (
          <polygon key={'d' + i} points="0,-30 5,-7 -5,-7" transform={`rotate(${a})`} fill="#bfdde8" opacity={0.7} />
        ))}
        {[0, 90, 180, 270].map((a, i) => (
          <g key={'c' + i} transform={`rotate(${a})`}>
            <polygon points="0,-44 6,-9 -6,-9" fill="#f4efe0" stroke="#7fa9bc" strokeWidth={1} />
            <polygon points="0,-44 0,-9 -6,-9" fill="#9fc4d4" opacity={0.8} />
          </g>
        ))}
        <circle r={5.5} fill="#f4efe0" stroke="#7fa9bc" strokeWidth={1.4} />
        <text y={-54} textAnchor="middle" fontSize={17} fontStyle="italic" fontFamily="Georgia, serif" fill="#f4f9fb" opacity={0.9}>J</text>
        <text y={70} textAnchor="middle" fontSize={15} fontStyle="italic" fontFamily="Georgia, serif" fill="#eaf3f7" opacity={0.8}>V</text>
        <text x={-60} y={5} textAnchor="middle" fontSize={15} fontStyle="italic" fontFamily="Georgia, serif" fill="#eaf3f7" opacity={0.8}>L</text>
        <text x={60} y={5} textAnchor="middle" fontSize={15} fontStyle="italic" fontFamily="Georgia, serif" fill="#eaf3f7" opacity={0.8}>P</text>
      </g>
      {/* …and a sea-serpent doodle far out, as every honest old chart must have */}
      <g opacity={0.7} style={{ pointerEvents: 'none' }}>
        {[[1700, 620, 26], [1760, 628, 20], [1812, 622, 14]].map(([hx, hy, r], i) => (
          <path key={'hump' + i} d={`M ${hx - r} ${hy} A ${r} ${r * 0.72} 0 0 1 ${hx + r} ${hy}`} fill="#3f7f96" stroke="#2b586a" strokeWidth={2} />
        ))}
        <path d="M 1660 626 C 1648 616 1644 600 1652 588 C 1662 576 1678 578 1682 590 C 1685 599 1679 606 1672 606" fill="none" stroke="#3f7f96" strokeWidth={7} strokeLinecap="round" />
        <circle cx={1652} cy={589} r={6.5} fill="#3f7f96" stroke="#2b586a" strokeWidth={1.6} />
        <circle cx={1650} cy={587} r={1.4} fill="#f4f9fb" />
        <path d="M 1646 584 l -6 -7 l 8 2 z" fill="#3f7f96" />
        <path d="M 1840 622 l 14 -12 l -2 16 z" fill="#3f7f96" stroke="#2b586a" strokeWidth={1.4} />
        <path d="M 1652 574 q 2 -8 8 -10 M 1700 606 q 8 -6 16 -4" stroke="#7fb0c2" strokeWidth={1.4} fill="none" opacity={0.7} />
      </g>
    </g>
  )
}

function terrCavern(rg) {
  // the world below — a great cavern under a rocky crust, with the DEAD CITY's
  // ruined towers inside the gate, a ghost-lit street down to the LIVING
  // QUARTER's torch-lit plaza (square, bazaar, inn, healer, way-signs), the
  // Beauty of the Earth's silver grove, the Kulshedra's ember pit, and a cold
  // river of the dead threading the floor.
  const { cx, cy, rx, ry } = rg, rnd = mulberry32(11)
  const outer = blobPath(cx, cy, rx, ry, 111, 0.09, 22)
  const torch = (tx, ty) => (
    <g transform={`translate(${tx},${ty})`}>
      <circle r={13} fill="#e8892b" opacity={0.18} />
      <rect x={-1.2} y={-8} width={2.4} height={10} fill="#3a2e22" />
      <circle cy={-10} r={2.8} fill="#e8892b" />
      <circle cy={-11} r={1.4} fill="#f6cf49" />
    </g>
  )
  const stall = (sx, sy) => (
    <g transform={`translate(${sx},${sy})`}>
      <rect x={-8} y={-3} width={16} height={9} fill="#2a2330" stroke="#120e1a" strokeWidth={1.2} />
      <path d="M-10 -3 L0 -10 L10 -3 Z" fill="#5a3a3a" stroke="#2a1616" strokeWidth={1} />
      <circle cx={-3} cy={1} r={1.4} fill="#f6cf49" />
      <rect x={1} y={0} width={4} height={2} fill="#c9a24a" />
    </g>
  )
  return (
    <g>
      {/* the rocky crust the cavern is sunk into */}
      <path d={blobPath(cx, cy, rx * 1.12, ry * 1.14, 114, 0.13, 20)} fill="#57504a" opacity={0.55} />
      <path d={blobPath(cx, cy, rx * 1.04, ry * 1.06, 113, 0.11, 20)} fill="#1a1613" opacity={0.7} />
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2 + 0.2, bx = cx + Math.cos(a) * rx * 1.06, by = cy + Math.sin(a) * ry * 1.08
        return (
          <g key={'rk' + i} transform={`translate(${bx},${by}) rotate(${(i * 47) % 360})`}>
            <ellipse rx={13 + (i % 3) * 4} ry={8 + (i % 2) * 3} fill="#6a6156" stroke="#3f382f" strokeWidth={1.4} />
            <ellipse cx={-3} cy={-2} rx={5} ry={3} fill="#847a6d" opacity={0.7} />
          </g>
        )
      })}
      <path d={outer} fill="#2b2622" stroke="#141010" strokeWidth={5} />
      <path d={blobPath(cx, cy, rx * 0.9, ry * 0.86, 112, 0.1, 20)} fill="#342c26" />
      {/* stalactites hanging from the roof */}
      {Array.from({ length: 22 }, (_, i) => { const x = cx - rx * 0.9 + (i / 21) * rx * 1.8, h = 14 + rnd() * 34, y = cy - ry * 0.82 - Math.sin(i / 21 * Math.PI) * ry * 0.06; return <polygon key={i} points={`${x - 7},${y} ${x + 7},${y} ${x},${y + h}`} fill="#231e1a" /> })}
      {/* a cold river of the dead threading the floor */}
      <path d={`M ${cx - rx * 0.8} ${cy + ry * 0.34} C ${cx - rx * 0.2} ${cy + ry * 0.2} ${cx + rx * 0.2} ${cy + ry * 0.5} ${cx + rx * 0.82} ${cy + ry * 0.3}`} fill="none" stroke="#2f4a52" strokeWidth={16} opacity={0.6} strokeLinecap="round" />
      <path d={`M ${cx - rx * 0.8} ${cy + ry * 0.34} C ${cx - rx * 0.2} ${cy + ry * 0.2} ${cx + rx * 0.2} ${cy + ry * 0.5} ${cx + rx * 0.82} ${cy + ry * 0.3}`} fill="none" stroke="#4a6f78" strokeWidth={6} opacity={0.5} strokeLinecap="round" />

      {/* ── the DEAD CITY — ruined towers west of the gate, where the shadow
          trial waits; cold blue-lit windows, not hearth-light ── */}
      {[[168, 2042, 46], [232, 2068, 58], [108, 2108, 40], [62, 2178, 34], [152, 2202, 44], [252, 2006, 36]].map(([tx, ty, th], i) => (
        <g key={'dc' + i} transform={`translate(${tx},${ty})`}>
          <rect x={-11} y={-th} width={22} height={th + 6} fill="#3a322c" stroke="#1a1512" strokeWidth={1.6} />
          <rect x={-11} y={-th - 3} width={7} height={4} fill="#3a322c" stroke="#1a1512" strokeWidth={0.8} />
          <rect x={4} y={-th - 3} width={7} height={4} fill="#3a322c" stroke="#1a1512" strokeWidth={0.8} />
          <rect x={-4} y={-th * 0.6} width={8} height={10} fill="#7fa9b5" opacity={0.4} />
        </g>
      ))}
      {/* the ghost-lit street: in from the gate, through the city, down to the plaza */}
      <path d="M 380 2070 C 350 2062 322 2058 300 2062 C 330 2088 366 2114 396 2136 C 404 2162 410 2190 415 2212"
            fill="none" stroke="#4a4038" strokeWidth={13} strokeLinecap="round" opacity={0.9} />
      <path d="M 380 2070 C 350 2062 322 2058 300 2062 C 330 2088 366 2114 396 2136 C 404 2162 410 2190 415 2212"
            fill="none" stroke="#6a5f50" strokeWidth={3} strokeDasharray="2 9" strokeLinecap="round" opacity={0.8} />

      {/* ── the LIVING QUARTER — the one warm-lit plaza of the world below ── */}
      <g>
        <ellipse cx={400} cy={2150} rx={110} ry={62} fill="#e8892b" opacity={0.1} />
        <path d={blobPath(400, 2150, 92, 54, 313, 0.1, 12)} fill="#4a4038" stroke="#5f564a" strokeWidth={2} />
        <path d={blobPath(400, 2150, 74, 42, 314, 0.12, 10)} fill="#57504a" opacity={0.8} />
        {[[352, 2124], [452, 2130], [366, 2186], [442, 2178]].map(([fx, fy], i) => (
          <ellipse key={'fs' + i} cx={fx} cy={fy} rx={8} ry={4.4} fill="#6a6156" opacity={0.5} />
        ))}
        {torch(372, 2130)}{torch(430, 2154)}{torch(388, 2196)}{torch(448, 2202)}
        {stall(462, 2136)}{stall(432, 2114)}
      </g>

      {/* the Beauty of the Earth's silver grove */}
      <g>
        <circle cx={640} cy={2124} r={34} fill="#c9d8e8" opacity={0.1} />
        <ellipse cx={640} cy={2138} rx={40} ry={16} fill="none" stroke="#8fa9c4" strokeWidth={1.6} strokeDasharray="4 6" opacity={0.7} />
        {[[610, 2130], [668, 2126], [640, 2148]].map(([px, py], i) => (
          <g key={'bg' + i} transform={`translate(${px},${py})`}>
            <rect x={-1} y={-2} width={2} height={6} fill="#5c5a66" />
            <circle cy={-6} r={4.4} fill="#aebfd6" opacity={0.85} />
          </g>
        ))}
      </g>

      {/* the Kulshedra's ember pit */}
      <g>
        <circle cx={620} cy={2344} r={30} fill="#e8542b" opacity={0.14} />
        <path d={blobPath(620, 2344, 26, 15, 611, 0.2, 10)} fill="#1a1210" stroke="#3a1c12" strokeWidth={2} />
        {[[606, 2340], [624, 2350], [634, 2338]].map(([ex, ey], i) => <circle key={'em' + i} cx={ex} cy={ey} r={2.2} fill={i % 2 ? '#e8892b' : '#e8542b'} opacity={0.9} />)}
      </g>
      <ellipse cx={cx - rx * 0.1} cy={cy - ry * 0.1} rx={64} ry={40} fill="#e8892b" opacity={0.08} />
    </g>
  )
}

function terrCastle(rg) {
  // Rozafa — grey ramparts on a rocky crag above the river-mouth. In the wall, the
  // immured bride: a pale figure sealed in the stone, one breast left free to nurse.
  const { cx, cy, rx, ry } = rg
  return (
    <g>
      {/* the rocky crag the castle stands on, rising from the river-mouth */}
      <path d={blobPath(cx, cy + ry * 0.4, rx * 0.92, ry * 0.7, 611, 0.16, 14)} fill="#8b8b7e" opacity={0.7} />
      <path d={blobPath(cx, cy + ry * 0.5, rx * 0.7, ry * 0.5, 612, 0.18, 12)} fill="#736f63" opacity={0.6} />
      <g transform={`translate(${cx},${cy - ry * 0.1})`}>
        <ellipse cx={4} cy={48} rx={82} ry={16} fill="rgba(0,0,0,.22)" />
        {/* curtain wall */}
        <rect x={-66} y={-10} width={132} height={48} fill="#bcb5a5" stroke="#6f6759" strokeWidth={3} />
        <rect x={-66} y={-10} width={132} height={10} fill="#cfc8ba" opacity={0.7} />
        {Array.from({ length: 11 }, (_, i) => <rect key={i} x={-66 + i * 13} y={-20} width={9} height={11} fill="#bcb5a5" stroke="#6f6759" strokeWidth={1.5} />)}
        {/* three towers */}
        {[-66, -6, 62].map((tx, i) => (
          <g key={i}>
            <rect x={tx - 13} y={-40} width={26} height={78} fill="#c6bfaf" stroke="#6f6759" strokeWidth={2.6} />
            <rect x={tx - 13} y={-40} width={26} height={9} fill="#d4cdbf" opacity={0.7} />
            {[0, 1, 2].map((j) => <rect key={j} x={tx - 13 + j * 9.5} y={-49} width={6} height={9} fill="#c6bfaf" stroke="#6f6759" strokeWidth={1.2} />)}
            <rect x={tx - 3} y={-16} width={6} height={11} fill="#2f2b24" />
          </g>
        ))}
        {/* the gate */}
        <path d="M-9 38 L-9 15 A9 9 0 0 1 9 15 L9 38 Z" fill="#3a2e22" />
        {/* the immured bride, sealed in the curtain wall */}
        <g transform="translate(30,10)">
          <rect x={-8} y={-16} width={16} height={30} fill="#a89f8d" stroke="#6f6759" strokeWidth={1} opacity={0.9} />
          <path d="M-6 14 L-6 -3 A6 6 0 0 1 6 -3 L6 14 Z" fill="#efe7d6" opacity={0.92} />
          <circle cx={0} cy={-7} r={4} fill="#f0dcc0" stroke="#c9a883" strokeWidth={0.8} />
          <circle cx={5} cy={2} r={2.1} fill="#f0dcc0" />
        </g>
      </g>
    </g>
  )
}

function terrLake(rg) {
  // Lake Shkodra beside Rozafa — a broad organic reed-fringed water body, still and
  // pale, with a marshy shore blending to land and its outlet (the Buna) draining
  // toward the sea in the east.
  const { cx, cy, rx, ry } = rg, rnd = mulberry32(53), reeds = []
  for (let k = 0; k < 46; k++) { const a = rnd() * Math.PI * 2, r = 0.88 + rnd() * 0.22; reeds.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]) }
  const lakeD = blobPath(cx, cy, rx, ry, 531, 0.1, 18)
  return (
    <g>
      {/* the Buna outlet channel — a ribbon of water leaving the east shore */}
      <path d={`M ${cx + rx * 0.7} ${cy} C ${cx + rx * 1.3} ${cy - ry * 0.2} ${cx + rx * 2.1} ${cy - ry * 0.9} ${cx + rx * 2.9} ${cy - ry * 1.5}`} fill="none" stroke="#7db0c2" strokeWidth={26} opacity={0.5} strokeLinecap="round" />
      <path d={blobPath(cx, cy, rx * 1.15, ry * 1.18, 533, 0.15, 16)} fill="#7f9a5a" opacity={0.42} />
      <path d={lakeD} fill="#6ba3ba" stroke="#4d7f92" strokeWidth={2.6} />
      <path d={blobPath(cx, cy - ry * 0.06, rx * 0.86, ry * 0.8, 534, 0.12, 16)} fill="#8fc3d3" opacity={0.5} />
      <ellipse cx={cx - rx * 0.3} cy={cy - ry * 0.34} rx={rx * 0.4} ry={ry * 0.2} fill="#d0e8ef" opacity={0.5} />
      {Array.from({ length: 6 }, (_, i) => { const y = cy - ry * 0.46 + i / 6 * ry * 0.92, w = rx * (0.66 - Math.abs(i - 3) * 0.06); return <path key={i} d={`M ${cx - w} ${y} q ${w * 0.5} -8 ${w} 0 q ${w * 0.5} 8 ${w} 0`} fill="none" stroke="#eef7f9" strokeWidth={1.4} opacity={0.5} /> })}
      {reeds.map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x + (i % 2 ? 3 : -3)} y2={y - 15} stroke="#6f8a3f" strokeWidth={1.7} opacity={0.6} />)}
    </g>
  )
}
const TERRAIN = { sky: terrSky, mountain: terrMountains, forest: terrForest, river: terrRiver, sea: terrSea, lake: terrLake, cavern: terrCavern, castle: terrCastle }
// soft outer tone per region so each blends into the land instead of floating
// (the sea draws its own beach/coastline off-map, so it has no region halo)
const HALO = { mountain: '#7e9a54', forest: '#5f7a3f', river: '#c7b78a', castle: '#8f9a72', lake: '#a9c6a0', cavern: '#37302b' }
// scattered land-detail — meadow blotches, soft hills, little woods and lone
// bushes/rocks over the open country, so the land between regions isn't empty
// flat green. Deterministic; every piece is tested against the village, the
// regions, the river, the well-shaft and the sea so it only lands on open meadow.
const WORLD_SCATTER = (() => {
  const rnd = mulberry32(99)
  // rough centre-line of the world river by y (piecewise linear approximation)
  const riverX = (y) => y < -262 || y > 1344 ? null
    : y < 442 ? 300 + (158 - 300) * (y + 262) / 704
    : y < 980 ? 158 + (240 - 158) * (y - 442) / 538
    : 240 + (300 - 240) * (y - 980) / 364
  const SHAFT = [[480, 466], [560, 800], [640, 1140], [590, 1400], [500, 1700], [430, 1900]]
  const clear = (x, y, pad = 0) => {
    if (y < -190 || x > seaCoastX(y) - 120 - pad) return false
    const vx = (x - 512) / (620 + pad), vy = (y - 432) / (480 + pad)
    if (vx * vx + vy * vy < 1) return false
    for (const rg of REGIONS) {
      if (!rg.terrain) continue
      const f = rg.terrain === 'cavern' ? 1.32 : 1.18
      const dx = (x - rg.cx) / (rg.rx * f + pad), dy = (y - rg.cy) / (rg.ry * f + pad)
      if (dx * dx + dy * dy < 1) return false
    }
    const rx0 = riverX(y)
    if (rx0 != null && Math.abs(x - rx0) < 95 + pad) return false
    for (const [sx, sy] of SHAFT) if (Math.hypot(x - sx, y - sy) < 120 + pad) return false
    return true
  }
  const blotches = [], hills = [], woods = [], decor = []
  let guard = 0
  while (blotches.length < 26 && guard++ < 4000) {
    const x = -880 + rnd() * 1900, y = -190 + rnd() * 2750
    if (!clear(x, y, 30)) continue
    blotches.push([x, y, 70 + rnd() * 150, 26 + rnd() * 60])
  }
  guard = 0
  while (hills.length < 11 && guard++ < 4000) {
    const x = -880 + rnd() * 1900, y = -190 + rnd() * 2750
    if (!clear(x, y, 60)) continue
    hills.push([x, y, 90 + rnd() * 90, 26 + rnd() * 22, (rnd() - 0.5) * 24])
  }
  guard = 0
  while (woods.length < 24 && guard++ < 6000) {
    const x = -880 + rnd() * 1900, y = -190 + rnd() * 2750
    if (!clear(x, y, 50)) continue
    const n = 2 + Math.floor(rnd() * 5), trees = []
    for (let k = 0; k < n; k++) trees.push([x + (rnd() - 0.5) * 90, y + (rnd() - 0.5) * 56, 0.7 + rnd() * 0.8])
    trees.sort((a, b) => a[1] - b[1])
    woods.push(trees)
  }
  guard = 0
  while (decor.length < 22 && guard++ < 4000) {
    const x = -880 + rnd() * 1900, y = -190 + rnd() * 2750
    if (!clear(x, y, 10)) continue
    decor.push([x, y, rnd() < 0.5 ? 1 : 0, 0.8 + rnd() * 0.6]) // 1 = bush, 0 = rock
  }
  return { blotches, hills, woods, decor }
})()

// Roads connect the settled places on LAND (the river handles the water route
// down to Rozafa; the coast road handles the reach out to the sea).
// The network: from the crossroads (top of the village) a road climbs NORTH to
// Mount Tomorr; the village high-street runs SOUTH down the river's east bank to
// Rozafa at the mouth; the HERO BRIDGE road crosses the river WEST to the great
// forest; and a coast road runs EAST from the river-mouth to the sea.
// mountain tracks and country roads WIND — every road is a chain of S-bends
// hugging the terrain, never one surveyed sweep.
const VILLAGE_ROADS = [
  'M 458 66 C 442 6 462 -46 434 -98 C 410 -142 370 -158 356 -196 C 344 -230 326 -258 300 -282', // crossroads → Tomorr: a climbing switchback track
  'M 458 78 C 486 190 448 300 466 420 C 480 520 430 620 396 720 C 366 812 372 910 342 1010 C 318 1092 322 1210 300 1320', // high-street S, weaving with the land down to Rozafa
  'M 214 476 C 160 494 118 470 60 484 C -20 502 -90 470 -170 478 C -270 488 -350 462 -430 452', // hero-bridge road W, wandering into the forest
  'M 322 1372 C 380 1348 420 1298 474 1264 C 520 1234 548 1180 590 1146 C 612 1128 630 1106 640 1090', // coast road: river-mouth → the bay shore
]
// ONE river: springs from Mount Tomorr (top-centre), bows down the village's WEST
// edge past the bridge/mill/spring, through the Zana's reach, to Rozafa at the mouth.
const WORLD_RIVER = 'M 300 -262 C 250 -40 150 180 158 442 C 165 704 208 860 240 980 C 268 1128 292 1236 300 1344'
// the descent from the village well down to the world below — a shaft that drops
// east of the river and Rozafa, deep beneath the land.
const WELL_SHAFT = 'M 480 466 C 540 780 648 1140 566 1520 C 500 1780 440 1930 400 2020'
const MAP_VIEWS = {
  village: { x: 211, y: 80, k: 0.72 },
  world: { x: 520, y: 296, k: 0.18 },
  sky: { x: 388, y: 1300, k: 0.8 },      // the sky realm & the Sun's compound
  mountain: { x: 354, y: 814, k: 0.82 }, // Mount Tomorr & Jutbina
  below: { x: 220, y: -1578, k: 0.9 },   // the world below
}
// where each region's caption sits when the default (above the region) would
// collide with drawn terrain or another region's content.
const REGION_LABEL_POS = {
  mountain: [-30, -906],
  river: [-140, 920],
  castle: [566, 1306],
  lake: [-310, 1560],
  underworld: [360, 1774],
}

// `world` carries live world-state for state-drawn glyphs (world.fire = fireStateOf)
export function VillageMap({ g, current, goGraph, compact, follow, world, npcs }) {
  const scatter = useMemo(() => {
    const rnd = mulberry32(20260708)
    const trees = []
    const push = (x, y, s) => trees.push({ x, y, s })
    // an ORGANIC tree-ring traced along the ACTUAL clearing edge (clearingPoint
    // wobbles the radius AND clamps at the coastline, so the east arc becomes a
    // windbreak lining the shore instead of trees standing in the sea).
    // Skip the WEST arc (~2.3..3.7 rad) where the river runs, so the bank stays open.
    for (let a = 0; a < Math.PI * 2; a += 0.045) {
      if (a > 2.29 && a < 3.69) continue // leave the river's west bank clear
      if (rnd() < 0.12) continue // ragged gaps so the ring doesn't read as a stamped ring
      for (let k = 0; k < (rnd() < 0.5 ? 2 : 1); k++) {
        const [x, y] = clearingPoint(a, (rnd() - 0.5) * 0.15)
        push(x - rnd() * 14, y + rnd() * 14 - 7, 0.66 + rnd() * 0.62)
      }
    }
    // a thin line of trees along the river's far (west) bank
    for (let t = 0.12; t < 0.92; t += 0.03) {
      const y = -20 + t * 900, x = 69 - Math.sin(t * 7) * 40
      push(x - rnd() * 20, y + rnd() * 16 - 8, 0.7 + rnd() * 0.6)
    }
    ;[[554, 138], [422, 110], [844, 430], [594, 720]].forEach(([cx, cy]) => {
      for (let k = 0; k < 3; k++) push(cx + rnd() * 60 - 30, cy + rnd() * 46 - 23, 0.56 + rnd() * 0.5)
    })
    trees.sort((a, b) => a.y - b.y)

    // ── the DENSE old town: terracotta rooftops packed into distinct QUARTERS
    // (mahalla) — one blob per district, each with a small open courtyard. The
    // gaps between quarters + the real story-lanes read as the streets; roofs
    // stay off the named landmarks, the central square and the river. ──
    const named = VILLAGE_PLACES.filter((p) => STORY[p.id])
    const namedR = (p) => p.type === 'square' ? 0
      : p.type === 'palace' ? 50
      : (p.type === 'church' || p.type === 'tower') ? 32
      : (p.type === 'oda' || p.type === 'mill' || p.type === 'garden' || p.type === 'hearth' || p.type === 'pasture') ? 26 : 20
    // river's east bank at a given y — keep roofs out of the water. The world river
    // bows down the town's WEST edge (~x158 at the top, drifting a little east as it
    // descends), so the east bank sits ~34px east of that centre-line.
    const riverRightX = (y) => 192 + Math.max(0, y - 442) * 0.124
    const segDist = (px, py, x1, y1, x2, y2) => {
      const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy || 1
      let t = ((px - x1) * dx + (py - y1) * dy) / L2; t = t < 0 ? 0 : t > 1 ? 1 : t
      return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))
    }
    const QUARTERS = [
      { id: 'church', cx: 388, cy: 202, rx: 122, ry: 96 },
      { id: 'upnorth', cx: 600, cy: 250, rx: 132, ry: 100 },
      { id: 'squareN', cx: 512, cy: 356, rx: 116, ry: 84 },
      { id: 'lifeW', cx: 306, cy: 476, rx: 134, ry: 132 },   // village life — the WEST quarter
      { id: 'southe', cx: 464, cy: 632, rx: 150, ry: 118 },
      { id: 'southw', cx: 700, cy: 660, rx: 128, ry: 104 },
      { id: 'river', cx: 260, cy: 566, rx: 100, ry: 100 },
    ]
    // the walled palace compound (east) — no packed roofs inside the curtain wall
    const inPalaceWall = (x, y) => x > 616 && x < 828 && y > 384 && y < 558
    // the PLAZA BAND: the square itself plus the facade ring that will front it —
    // the free generator stays out; facades are placed by hand below.
    const inPlazaBand = (x, y) => x > 370 && x < 634 && y > 334 && y < 532
    // keep a house off the ACTUAL drawn bends of every winding lane, off the
    // wide through-streets (with market verges), and out of the Lana brook.
    const nearLane = (x, y, r) => {
      for (const L of VILLAGE_LANE_PATHS) {
        for (let s = 0; s < L.pts.length - 1; s++) {
          if (segDist(x, y, L.pts[s][0], L.pts[s][1], L.pts[s + 1][0], L.pts[s + 1][1]) < r) return true
        }
      }
      for (const S of TOWN_STREET_PATHS) {
        for (let s = 0; s < S.pts.length - 1; s++) {
          if (segDist(x, y, S.pts[s][0], S.pts[s][1], S.pts[s + 1][0], S.pts[s + 1][1]) < r + 13) return true
        }
      }
      for (let s = 0; s < LANA_BROOK.pts.length - 1; s++) {
        if (segDist(x, y, LANA_BROOK.pts[s][0], LANA_BROOK.pts[s][1], LANA_BROOK.pts[s + 1][0], LANA_BROOK.pts[s + 1][1]) < r) return true
      }
      return false
    }
    // a house FRONTS the street it stands on: the roof-ridge of any house within
    // reach of a street or lane runs parallel to it (small jitter); only houses
    // deep inside a block keep a free angle. This is what makes it read as a
    // real town rather than scattered boxes.
    const streetAngle = (x, y, maxD) => {
      let best = maxD, ang = null
      const scan = (pts) => {
        for (let s = 0; s < pts.length - 1; s++) {
          const d = segDist(x, y, pts[s][0], pts[s][1], pts[s + 1][0], pts[s + 1][1])
          if (d < best) { best = d; ang = Math.atan2(pts[s + 1][1] - pts[s][1], pts[s + 1][0] - pts[s][0]) * 180 / Math.PI }
        }
      }
      for (const S of TOWN_STREET_PATHS) scan(S.pts)
      for (const L of VILLAGE_LANE_PATHS) scan(L.pts)
      return ang
    }
    const roofs = [], occ = new Set()
    for (const Q of QUARTERS) {
      const qr = mulberry32(hashStr('q:' + Q.id))
      const yards = []
      for (let c = 0, n = 1 + (qr() < 0.55 ? 0 : 1); c < n; c++) {
        const a = qr() * Math.PI * 2, rr = qr() * 0.5
        yards.push([Q.cx + Math.cos(a) * Q.rx * rr, Q.cy + Math.sin(a) * Q.ry * rr, 15 + qr() * 11])
      }
      for (let gx = Q.cx - Q.rx; gx <= Q.cx + Q.rx; gx += 18) {
        for (let gy = Q.cy - Q.ry; gy <= Q.cy + Q.ry; gy += 17) {
          const x = gx + (qr() - 0.5) * 12, y = gy + (qr() - 0.5) * 12
          const qx = (x - Q.cx) / Q.rx, qy = (y - Q.cy) / Q.ry, qrad = qx * qx + qy * qy
          if (qrad > 1) continue                                     // inside the quarter blob
          const tx = (x - TOWN.cx) / TOWN.rx, ty = (y - TOWN.cy) / TOWN.ry
          if (tx * tx + ty * ty > 1.02) continue                     // safety: inside the town
          if (x < riverRightX(y)) continue                           // east of the river
          if (inPlazaBand(x, y)) continue                            // the square + its facade ring
          if (inPalaceWall(x, y) || x > 826) continue                // palace walls; east strip is the hand-laid back lanes
          const cell = Math.round(x / 12) + ':' + Math.round(y / 12)
          if (occ.has(cell)) continue                                // one roof per ~12px cell (no piling at quarter seams)
          let blocked = false
          for (let c = 0; c < yards.length && !blocked; c++) if (Math.hypot(x - yards[c][0], y - yards[c][1]) < yards[c][2]) blocked = true // courtyard
          if (!blocked && nearLane(x, y, 13)) blocked = true
          for (let ni = 0; ni < named.length && !blocked; ni++) {
            const p = named[ni]; if (Math.hypot(x - p.x, y - p.y) < namedR(p)) blocked = true
          }
          if (blocked) continue
          if (qrad > 0.62 && qr() < (qrad - 0.62) / 0.38 * 0.85) continue // thinning quarter edge
          occ.add(cell)
          const sa = streetAngle(x, y, 46)
          roofs.push({ x, y, w: 14 + qr() * 10, h: 12 + qr() * 7, rot: sa != null ? sa + (qr() - 0.5) * 9 : (qr() - 0.5) * 46, tone: ROOF_TONES[Math.floor(qr() * ROOF_TONES.length)] })
        }
      }
    }

    // ── the BACK LANES: houses squeezed shoulder-to-shoulder in tight rows
    // right against the palace's east wall (x≈824), with three narrow alleys
    // threading between the rows. Aligned, near-touching — a warren, not a blob. ──
    const alleys = []
    {
      const br = mulberry32(hashStr('backlanes'))
      const ROWS = [834, 858, 882, 906]
      ROWS.forEach((rx0, ri) => {
        for (let y = 386; y <= 568; y += 15) {
          const x = rx0 + (br() - 0.5) * 3, yy = y + (br() - 0.5) * 4
          const tx = (x - TOWN.cx) / TOWN.rx, ty = (yy - TOWN.cy) / TOWN.ry
          if (tx * tx + ty * ty > 1.0) continue
          let blocked = false
          for (const p of named) if (Math.hypot(x - p.x, yy - p.y) < namedR(p)) { blocked = true; break }
          if (!blocked && nearLane(x, yy, 4)) blocked = true // the ring road's end carves through the warren
          if (blocked || (ri === 3 && br() < 0.25)) continue // outermost row is raggedy
          roofs.push({ x, y: yy, w: 17.5 + br() * 3, h: 12.5 + br() * 2, rot: (br() - 0.5) * 7, tone: ROOF_TONES[Math.floor(br() * ROOF_TONES.length)] })
        }
      })
      // the alleys between the rows (slightly wobbled), plus two cross-cuts
      for (const ax of [846, 870, 894]) {
        alleys.push(lanePath(ax, 384, ax + (br() - 0.5) * 6, 570, hashStr('alley' + ax)).d)
      }
      alleys.push(lanePath(830, 452, 912, 448, hashStr('cross1')).d)
      alleys.push(lanePath(830, 520, 908, 526, hashStr('cross2')).d)
    }

    // ── the FACADE RING: houses fronting the square, aligned to its edges,
    // with gaps only where the streets enter. This is what makes the plaza
    // read as a real bounded piazza. ──
    {
      const fr = mulberry32(hashStr('facades'))
      const F = []
      ;[414, 442, 580].forEach((fx) => F.push([fx, 340, 0]))                      // north front (gaps: the church street ~468; the mosque & sahat-kulla at 494/528)
      ;[420, 448, 504, 532, 586].forEach((fx) => F.push([fx, 522, 0]))            // south front (gaps for the two south lanes)
      ;[380, 408, 462, 490].forEach((fy) => F.push([382, fy, 90]))                // west front (gap toward the oda / village life)
      ;[372, 400, 484, 512].forEach((fy) => F.push([622, fy, 90]))                // east front (gap for the palace road)
      for (const [fx, fy, rot] of F) {
        let blocked = false
        for (const p of named) if (Math.hypot(fx - p.x, fy - p.y) < namedR(p) + 4) { blocked = true; break }
        if (blocked) continue
        roofs.push({ x: fx, y: fy, w: 22 + fr() * 4, h: 14.5 + fr() * 2, rot: rot + (fr() - 0.5) * 6, tone: ROOF_TONES[Math.floor(fr() * ROOF_TONES.length)] })
      }
    }
    roofs.sort((a, b) => a.y - b.y)

    // decorative iconography — rocks, bushes, haystacks, garden plots — scattered
    // in the meadow OUTSIDE the packed town (the town is roofs, not gardens).
    const decor = []
    const KIND = ['rock', 'bush', 'bush', 'haystack', 'garden', 'bush', 'rock']
    for (let k = 0; k < 40; k++) {
      const x = 40 + rnd() * 1060, y = 90 + rnd() * 760
      const nx = (x - TOWN.cx) / (TOWN.rx + 26), ny = (y - TOWN.cy) / (TOWN.ry + 26)
      if (nx * nx + ny * ny < 1) continue // keep decor in the surrounding meadow, off the roofs
      decor.push({ kind: KIND[Math.floor(rnd() * KIND.length)], x, y, s: 0.8 + rnd() * 0.7 })
    }
    decor.sort((a, b) => a.y - b.y)

    // a few hearth-fires: thin smoke wisps over scattered rooftops (deterministic picks)
    const smokes = roofs.filter((_, i) => i % 43 === 7).slice(0, 10)
      .map((r) => ({ x: r.x + 3, y: r.y - 4, s: 0.8 + ((r.x * 7 + r.y) % 5) * 0.09 }))
    return { trees, roofs, decor, smokes, alleys }
  }, [])

  // place every OTHER node as a dot in its region, keep a position + region for
  // EVERY node, build the story edges, and score "teleport" edges (long + cross-
  // region + passing over many other nodes' dots).
  const { dots, edges, oddEdges, clusters, singles, pos } = useMemo(() => {
    // region label per node (positions no longer come from here — only regOf,
    // used for the region caption of generic glyphs + the odd-link detector).
    const byRegion = assignRegions(g.ids)
    const regOf = {}
    byRegion.forEach((list, ri) => list.forEach((id) => { regOf[id] = REGIONS[ri].key }))
    for (const pl of VILLAGE_PLACES) if (STORY[pl.id]) regOf[pl.id] = 'village'
    // EVERY node's position is hand-authored in NODE_POS. Nodes sharing a
    // coordinate are the SAME physical spot (the story continues there).
    const pos = {}, out = []
    for (const id of g.ids) {
      const p = NODE_POS[id]; if (!p) continue
      pos[id] = p
      if (!regOf[id]) regOf[id] = 'village'
      if (!VILLAGE_IDS.has(id) && !LANDMARK_IDS.has(id)) out.push({ id, x: p[0], y: p[1], kind: g.kindOf(id), region: regOf[id] })
    }
    // Nodes added to the story AFTER NODE_POS was hand-authored get a graceful
    // fallback near their placed neighbours (or their region centre), so the map
    // stays complete. Re-run scripts/nodeplace*.mjs to hand-place them for real.
    const unplaced = g.ids.filter((id) => !pos[id])
    for (const id of unplaced) {
      const nb = []
      for (const o of (STORY[id].options || [])) if (o.to && NODE_POS[o.to]) nb.push(NODE_POS[o.to])
      if (!nb.length) for (const u of g.ids) for (const o of (STORY[u].options || [])) if (o.to === id && NODE_POS[u]) nb.push(NODE_POS[u])
      const rg = REGIONS.find((r) => r.key === regOf[id]) || REGIONS.find((r) => r.key === 'village')
      const j = mulberry32(hashStr(id))
      let x = rg.cx, y = rg.cy
      if (nb.length) { x = nb.reduce((s, p) => s + p[0], 0) / nb.length; y = nb.reduce((s, p) => s + p[1], 0) / nb.length }
      x = Math.round(x + (j() - 0.5) * 44); y = Math.round(y + (j() - 0.5) * 44)
      pos[id] = [x, y]; if (!regOf[id]) regOf[id] = 'village'
      if (!VILLAGE_IDS.has(id) && !LANDMARK_IDS.has(id)) out.push({ id, x, y, kind: g.kindOf(id), region: regOf[id] })
    }
    const edges = []
    for (const u of g.ids) {
      const a = pos[u]; if (!a) continue
      for (const o of (STORY[u].options || [])) {
        if (o.confuser || !o.to || !pos[o.to]) continue
        const b = pos[o.to]
        edges.push([a[0], a[1], b[0], b[1], u, o.to, isWander(o)])
      }
    }
    const allPos = Object.entries(pos).map(([id, p]) => ({ id, x: p[0], y: p[1] }))
    const scored = edges.filter((e) => !e[6]).map((e) => {
      const [x1, y1, x2, y2, u, v] = e
      const len = Math.hypot(x2 - x1, y2 - y1), cross = regOf[u] !== regOf[v]
      let crossings = 0
      if (cross && len > 500) {
        const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy || 1
        for (const n of allPos) {
          if (n.id === u || n.id === v) continue
          const t = ((n.x - x1) * dx + (n.y - y1) * dy) / L2
          if (t < 0.03 || t > 0.97) continue
          if (Math.hypot(n.x - (x1 + t * dx), n.y - (y1 + t * dy)) < 30) crossings++
        }
      }
      return { e, len, cross, crossings, u, v, ru: regOf[u], rv: regOf[v] }
    })
    const oddEdges = scored.filter((s) => s.cross && s.len > 500)
      .sort((a, b) => b.crossings - a.crossings || b.len - a.len).slice(0, 24)

    // SAME SPOT = hand-authored in nodePositions.js: a node either owns its
    // coordinate or stands AT another node's spot (PLACE_OF). Each shared place
    // is one clickable marker that fans the scenes out. A village building or
    // landmark standing there HOSTS the marker (its glyph is drawn by its own
    // loop); otherwise it's a stack. (Fallback-placed nodes have no PLACE_OF
    // entry yet — each stands alone at its provisional spot.)
    const byPlace = {}
    for (const id of g.ids) { if (!pos[id]) continue; const a = PLACE_OF[id] || id; (byPlace[a] || (byPlace[a] = [])).push(id) }
    const clusters = []
    for (const [anchor, list] of Object.entries(byPlace)) {
      if (list.length < 2) continue
      const [x, y] = pos[anchor]
      const hostVp = list.find((id) => VILLAGE_IDS.has(id)) || null
      const hostLm = list.find((id) => LANDMARK_IDS.has(id)) || null
      const key = 'loc:' + anchor
      clusters.push({ key, x, y, hostVp, hostLm, members: list.map((id) => ({ id, kind: g.kindOf(id), region: regOf[id] || 'village' })) })
    }
    const singles = out.filter((d) => (byPlace[PLACE_OF[d.id] || d.id] || []).length === 1)
    return { dots: out, edges, oddEdges, clusters, singles, pos }
  }, [g])

  // selection = the node you're auditing: light up its edges, dim the rest.
  const [sel, setSel] = useState(null)
  const hubSet = useMemo(() => new Set(g.hubs), [g])
  const focus = sel || current
  const nbr = useMemo(() => {
    if (!focus) return null
    const s = new Set([focus])
    for (const e of edges) { if (e[4] === focus) s.add(e[5]); if (e[5] === focus) s.add(e[4]) }
    return s
  }, [focus, edges])
  const info = sel && STORY[sel] ? {
    n: STORY[sel],
    exits: (STORY[sel].options || []).filter((o) => !o.confuser && o.to && STORY[o.to]).map((o) => ({ t: englishOf(lineOf(o.text)), to: o.to })),
    incoming: g.ids.filter((id) => (g.adj[id] || []).includes(sel)),
    firstLine: STORY[sel].text && STORY[sel].text.length ? englishOf(lineOf(STORY[sel].text[0])) : '',
  } : null
  // the LOCATION CARD — click a shared place and see what can happen there.
  // Hand-authored happenings (placeMeta.js), with a derived one-row-per-scene
  // fallback. This replaced the old fan-out ring: scenes never leave their spot.
  const [openPlace, setOpenPlace] = useState(null)
  const placeCard = useMemo(() => {
    const c = openPlace && clusters.find((x) => x.key === openPlace)
    if (!c) return null
    const anchor = c.key.slice(4)
    const meta = PLACE_META[anchor]
    const vp = VILLAGE_PLACES.find((p) => p.id === c.hostVp)
    const lm = WORLD_LANDMARKS.find((l) => l.id === c.hostLm)
    const name = (meta && meta.name) || (vp && vp.label) || (lm && lm.label) || anchor
    const line = (id) => englishOf((STORY[id].text || []).map(lineOf).find((l) => l.filter((t) => t.id).length >= 2) || (STORY[id].text || []).map(lineOf)[0] || [])
    let rows
    if (meta) {
      const covered = new Set(meta.happenings.flatMap((h) => h.nodes))
      rows = [
        ...meta.happenings.map((h) => ({ title: h.title, nodes: h.nodes })),
        ...c.members.filter((m) => !covered.has(m.id)).map((m) => ({ title: line(m.id), nodes: [m.id] })),
      ]
    } else {
      rows = c.members.map((m) => ({ title: line(m.id), nodes: [m.id] }))
    }
    return { anchor, name, count: c.members.length, rows }
  }, [openPlace, clusters])

  const [view, setView] = useState(MAP_VIEWS.village)
  const [showOdd, setShowOdd] = useState(false)
  // FOLLOW MODE (the minimap): when the player moves to a new scene — a chosen
  // option, or a fresh run — select that node and recentre the map on it, so
  // the map always shows where you are. (viewBox is 1160×760, centre 580×380.)
  useEffect(() => {
    if (!follow || !current) return
    const p = pos[current]
    if (!p) return
    setSel(current)
    const k = 1.4 // zoom in close on the current scene (the minimap follows the player)
    setView({ x: 580 - p[0] * k, y: 380 - p[1] * k, k })
  }, [follow, current, pos])
  const svgRef = useRef(null)
  const drag = useRef(null)
  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      const r = el.getBoundingClientRect()
      const vx = ((e.clientX - r.left) / r.width) * 1160, vy = ((e.clientY - r.top) / r.height) * 760
      const f = e.deltaY < 0 ? 1.13 : 1 / 1.13
      setView((v) => {
        const k = Math.min(3.4, Math.max(0.16, v.k * f))
        return { x: vx - (vx - v.x) * (k / v.k), y: vy - (vy - v.y) * (k / v.k), k }
      })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])
  const onDown = (e) => { drag.current = { sx: e.clientX, sy: e.clientY, vx: view.x, vy: view.y, moved: false } }
  const onMove = (e) => {
    if (!drag.current) return
    if (Math.abs(e.clientX - drag.current.sx) + Math.abs(e.clientY - drag.current.sy) > 3) drag.current.moved = true
    const r = svgRef.current.getBoundingClientRect()
    const dx = ((e.clientX - drag.current.sx) / r.width) * 1160, dy = ((e.clientY - drag.current.sy) / r.height) * 760
    setView((v) => ({ ...v, x: drag.current.vx + dx, y: drag.current.vy + dy }))
  }
  const onUp = () => { drag.current = null }
  const onBackdrop = () => { if (!drag.current || !drag.current.moved) { setSel(null); setOpenPlace(null) } }
  const zoomBy = (f) => setView((v) => { const k = Math.min(3.4, Math.max(0.16, v.k * f)); return { x: 580 - (580 - v.x) * (k / v.k), y: 380 - (380 - v.y) * (k / v.k), k } })
  // in the small docked minimap, enlarge the ds-driven detail (the "where to
  // next" edge-lines + scene labels) so they stay legible at the shrunk size.
  const uiScale = compact ? 2.6 : 1
  const dr = 5.4 / view.k, ds = (1 / view.k) * uiScale

  return (
    <div className="dbg-map">
      {!compact && (
        <p className="dbg-note">
          The whole world on one map — <b>drag</b> to pan, <b>scroll</b> to zoom. Laid over the real
          (rotated) map of Albania: <b>Mount Tomorr</b> and the sky crown the top; the <b>river</b> runs
          down the centre past the <b>village</b> (you begin at the bridge that crosses to it) to <b>Rozafa
          castle</b> at the river-mouth beside <b>Lake Shkodra</b>; the <b>great forest</b> lies west across
          the river; the <b>Adriatic</b> fills the east; and — down through the well — the world below.
          Every <b>dot</b> is a scene; click any dot or building to open it in the Story Graph.
        </p>
      )}
      <div className="dbg-worldwrap">
        <div className="dbg-worldtools">
          <button className="btn" title="zoom in" onClick={() => zoomBy(1.3)}>＋</button>
          <button className="btn" title="zoom out" onClick={() => zoomBy(1 / 1.3)}>−</button>
          <button className="btn" title="centre on the village" onClick={() => setView(MAP_VIEWS.village)}>⌂ village</button>
          <button className="btn" title="the sky realm & the Sun's compound" onClick={() => setView(MAP_VIEWS.sky)}>☀ sky</button>
          <button className="btn" title="Mount Tomorr & Jutbina" onClick={() => setView(MAP_VIEWS.mountain)}>⛰ mountain</button>
          <button className="btn" title="the world below" onClick={() => setView(MAP_VIEWS.below)}>🕳 below</button>
          <button className="btn" title="fit the whole world" onClick={() => setView(MAP_VIEWS.world)}>⤢ world</button>
          <button className={'btn' + (showOdd ? ' active' : '')}
                  title="highlight geographically long 'teleport' links that cross over many other scenes"
                  onClick={() => setShowOdd((o) => !o)}>⚡ odd links {oddEdges.length}</button>
        </div>
        <svg ref={svgRef} viewBox="0 0 1160 760" className="dbg-world" preserveAspectRatio="xMidYMid meet"
             onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
          <defs>
            <linearGradient id="vGrass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#9fb56f" /><stop offset="1" stopColor="#89a55c" />
            </linearGradient>
            <linearGradient id="vWater" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#6fa7bc" /><stop offset="1" stopColor="#84bacb" />
            </linearGradient>
            <linearGradient id="wSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a4a74" /><stop offset="1" stopColor="#6a7fae" />
            </linearGradient>
            <linearGradient id="wSea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#5f9ab2" /><stop offset="1" stopColor="#7fb4c6" />
            </linearGradient>
            {/* the sky is the backdrop the mountains rise into; it fades to the land */}
            <linearGradient id="wSkyBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2c3b64" />
              <stop offset="0.42" stopColor="#4a5d8c" />
              <stop offset="0.72" stopColor="#7d90ac" />
              <stop offset="0.9" stopColor="#9fb08e" />
              <stop offset="1" stopColor="#88a559" />
            </linearGradient>
            {/* the ray of light from Tomorr's summit up to the Sun's house */}
            <linearGradient id="rayGrad" gradientUnits="userSpaceOnUse" x1="300" y1="-830" x2="300" y2="-1032">
              <stop offset="0" stopColor="#fff3c0" stopOpacity="0.1" />
              <stop offset="0.5" stopColor="#ffe79a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fff6d8" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            {/* world ground — oversized so panning/letterboxing never shows bare void */}
            <rect x={-4400} y={-3000} width={12000} height={8400} fill="#88a559" onClick={onBackdrop} />
            {/* the SKY — a world-wide backdrop across the top that the mountains rise
                into, fading down into the land so there's no seam (plus a deep-space
                cap above, so zooming out never shows a hard edge) */}
            <rect x={-4400} y={-3000} width={12000} height={1440} fill="#2c3b64" onClick={onBackdrop} />
            <rect x={-4400} y={-1560} width={12000} height={1320} fill="url(#wSkyBg)" onClick={onBackdrop} />
            {WORLD_SCATTER.blotches.map(([x, y, rx, ry], i) => <ellipse key={'bl' + i} cx={x} cy={y} rx={rx} ry={ry} fill="#7c9450" opacity={0.32} />)}
            {WORLD_SCATTER.hills.map(([x, y, rx, ry, rot], i) => (
              <g key={'hl' + i} transform={`rotate(${rot} ${x} ${y})`}>
                <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#7f9a54" opacity={0.55} />
                <ellipse cx={x - rx * 0.16} cy={y - ry * 0.3} rx={rx * 0.62} ry={ry * 0.5} fill="#a7bd75" opacity={0.5} />
                <path d={`M ${x - rx * 0.7} ${y + ry * 0.5} Q ${x} ${y + ry * 0.95} ${x + rx * 0.7} ${y + ry * 0.5}`} fill="none" stroke="#6f8a4a" strokeWidth={2} opacity={0.4} />
              </g>
            ))}
            {/* soft ORGANIC region halos (two feathered blob rings) so each region
                dissolves into the land instead of floating as an oval */}
            {REGIONS.map((rg) => (rg.terrain && HALO[rg.terrain]
              ? <g key={'ha' + rg.key}>
                  <path d={blobPath(rg.cx, rg.cy, rg.rx * 1.34, rg.ry * 1.34, hashStr(rg.key + 'h2'), 0.16, 16)} fill={HALO[rg.terrain]} opacity={0.22} />
                  <path d={blobPath(rg.cx, rg.cy, rg.rx * 1.16, rg.ry * 1.16, hashStr(rg.key + 'h1'), 0.13, 16)} fill={HALO[rg.terrain]} opacity={0.5} />
                </g>
              : null))}

            {/* little woods + lone bushes/rocks over the open country */}
            {WORLD_SCATTER.woods.map((trees, i) => (
              <g key={'wd' + i}>{trees.map(([x, y, s], j) => <Tree key={j} x={x} y={y} s={s} />)}</g>
            ))}
            {WORLD_SCATTER.decor.map(([x, y, kind, s], i) => (
              kind ? <Bush key={'dc' + i} x={x} y={y} s={s} /> : <Rock key={'dc' + i} x={x} y={y} s={s} />
            ))}

            {/* the village clearing — an organic meadow, its east edge held back
                from the coastline so the grass never wades into the sea */}
            <path d={VILLAGE_CLEARING_D} fill="url(#vGrass)" onClick={onBackdrop} />
            {[[724, 620, 120, 40], [844, 640, 90, 30], [594, 300, 90, 30], [254, 560, 90, 34]].map(([x, y, rx, ry], i) => (
              <ellipse key={'vb' + i} cx={x} cy={y} rx={rx} ry={ry} fill="#7f9a54" opacity="0.3" />
            ))}
            <ellipse cx={370} cy={188} rx={96} ry={44} fill="#a7bd75" opacity="0.55" />

            {/* connector roads and the well-shaft (the river is drawn OVER the town
                ground below, so it stays visible where it threads the village) */}
            {VILLAGE_ROADS.map((d, i) => (
              <g key={i}>
                <path d={d} fill="none" stroke="#9e885b" strokeWidth={16} opacity={0.38} strokeLinecap="round" />
                <path d={d} fill="none" stroke="#cbb98d" strokeWidth={12} strokeLinecap="round" />
                <path d={d} fill="none" stroke="#efe5c8" strokeWidth={3} strokeDasharray="2 11" opacity={0.85} strokeLinecap="round" />
              </g>
            ))}
            {/* the well shaft — stone-lined, a rope dropping into the dark, torch
                sparks fading with depth */}
            <path d={WELL_SHAFT} fill="none" stroke="#8f8271" strokeWidth={30} strokeLinecap="round" opacity={0.3} />
            <path d={WELL_SHAFT} fill="none" stroke="#5c5344" strokeWidth={20} strokeLinecap="round" strokeDasharray="14 7" opacity={0.55} />
            <path d={WELL_SHAFT} fill="none" stroke="#2b241d" strokeWidth={13} strokeLinecap="round" opacity={0.85} />
            <path d={WELL_SHAFT} fill="none" stroke="#120f0b" strokeWidth={6} strokeLinecap="round" />
            <path d={WELL_SHAFT} fill="none" stroke="#c9b48a" strokeWidth={1.4} strokeDasharray="9 14" opacity={0.45} />
            <path d={WELL_SHAFT} fill="none" stroke="#e8892b" strokeWidth={3} strokeLinecap="round" opacity={0.25} strokeDasharray="1 32" />

            {/* region terrains (the mountain and the sea cover the river's source and mouth) */}
            {REGIONS.map((rg) => (rg.terrain ? <g key={rg.key}>{TERRAIN[rg.terrain](rg)}</g> : null))}

            {/* ===== the village (detailed) — content only; ground + river drawn above ===== */}
            <g>
              {/* warm packed-earth ground of the old town — an organic footprint
                  (blob, not an oval) the terracotta roofs read against, with the
                  lanes showing as pale streets between blocks */}
              <path d={blobPath(TOWN.cx, TOWN.cy, TOWN.rx + 24, TOWN.ry + 24, 7301, 0.07, 22)} fill="#b6a473" opacity={0.5} onClick={onBackdrop} />
              <path d={blobPath(TOWN.cx, TOWN.cy, TOWN.rx, TOWN.ry, 7302, 0.055, 22)} fill="#cdba8b" onClick={onBackdrop} />
              {/* the ONE river (Tomorr → town's west edge → Zana's reach → Rozafa),
                  drawn OVER the town ground so it threads visibly through the village */}
              <path d={WORLD_RIVER} fill="none" stroke="#cdbf94" strokeWidth={92} strokeLinecap="round" />
              <path d={WORLD_RIVER} fill="none" stroke="url(#wSea)" strokeWidth={60} strokeLinecap="round" />
              <path d={WORLD_RIVER} fill="none" stroke="#bfe0ea" strokeWidth={16} strokeLinecap="round" opacity={0.5} />
              {/* the LANA — Tirana's little brook, in from the east meadows to
                  meet the river at the tanners' bridge */}
              <path d={LANA_BROOK.d} fill="none" stroke="#cdbf94" strokeWidth={17} strokeLinecap="round" opacity={0.9} />
              <path d={LANA_BROOK.d} fill="none" stroke="#84bacb" strokeWidth={10} strokeLinecap="round" />
              <path d={LANA_BROOK.d} fill="none" stroke="#bfe0ea" strokeWidth={3.4} strokeLinecap="round" opacity={0.7} />
              <text x={806} y={654} textAnchor="middle" fontSize={13} fontStyle="italic" fontFamily="Georgia, serif" fill="#5e93a8" opacity={0.9}>lana</text>
              {/* fields ring the town out in the meadow, not inside the packed core */}
              <Field x={806} y={126} w={214} h={140} rot={7} tone="#6f5744" />
              <Field x={874} y={696} w={176} h={120} rot={-6} tone="#7a664a" />
              <Field x={532} y={816} w={318} h={110} rot={0} tone="#6f5744" />
              <Field x={694} y={772} w={150} h={98} rot={4} tone="#7a664a" />
              {gBridgeDeck()}
              {/* ── the THROUGH-STREETS: the high street in from the crossroads,
                  the market street south past the pazar to the fields, the river
                  road down to the tanners' bridge. Wide, cobble-edged — the town's
                  skeleton that every footpath hangs off. ── */}
              {TOWN_STREET_PATHS.map((S, i) => (S.hidden ? null :
                <g key={'ts' + i}>
                  <path d={S.d} fill="none" stroke="#9e885b" strokeWidth={S.minor ? 13 : 19} opacity={0.5} strokeLinecap="round" />
                  <path d={S.d} fill="none" stroke="#e9dfc2" strokeWidth={S.minor ? 9 : 13.5} strokeLinecap="round" />
                  {!S.minor && <path d={S.d} fill="none" stroke="#c9b88a" strokeWidth={1.4} strokeLinecap="round" opacity={0.8} transform="translate(0,-4.6)" />}
                  {!S.minor && <path d={S.d} fill="none" stroke="#c9b88a" strokeWidth={1.4} strokeLinecap="round" opacity={0.8} transform="translate(0,4.6)" />}
                  <path d={S.d} fill="none" stroke="#b6a373" strokeWidth={S.minor ? 1.6 : 2.2} strokeDasharray="2 11" strokeLinecap="round" opacity={0.75} />
                </g>
              ))}
              {VILLAGE_LANE_PATHS.map((L, i) => (
                <g key={i}>
                  <path d={L.d} fill="none" stroke="#a8946a" strokeWidth={L.main ? 12.5 : 8.5} opacity={0.5} strokeLinecap="round" />
                  <path d={L.d} fill="none" stroke={L.main ? '#e9dfc2' : '#ded2b0'} strokeWidth={L.main ? 9 : 5.8} strokeLinecap="round" />
                  <path d={L.d} fill="none" stroke="#b6a373" strokeWidth={1.7} strokeDasharray="2 9" strokeLinecap="round" opacity={0.65} />
                </g>
              ))}
              {/* the tight back-alleys threading between the rows behind the palace */}
              {scatter.alleys.map((d, i) => (
                <path key={'al' + i} d={d} fill="none" stroke="#d6c8a2" strokeWidth={3.6} strokeLinecap="round" opacity={0.9} />
              ))}
              {/* the piazza — terrain, always crisp (never dimmed with a pin) */}
              {gSquare(499, 432)}
              {scatter.roofs.map((h, i) => <RoofBlock key={i} x={h.x} y={h.y} w={h.w} h={h.h} rot={h.rot} tone={h.tone} />)}
              {scatter.trees.map((t, i) => <Tree key={i} x={t.x} y={t.y} s={t.s} />)}
              {scatter.decor.map((d, i) => (
                d.kind === 'rock' ? <Rock key={i} x={d.x} y={d.y} s={d.s} />
                  : d.kind === 'bush' ? <Bush key={i} x={d.x} y={d.y} s={d.s} />
                  : d.kind === 'haystack' ? <Haystack key={i} x={d.x} y={d.y} s={d.s} />
                  : <GardenPlot key={i} x={d.x} y={d.y} s={d.s} />
              ))}
              {/* ── the lived-in village: hearth-smoke over the rooftops, cypresses
                  by the graves, working land (orchard / vineyard / olives), hens in
                  the yards, washing by the river, a rowboat on the water ── */}
              {scatter.smokes.map((s, i) => <Smoke key={'sm' + i} x={s.x} y={s.y} s={s.s} />)}
              <Cypress x={265} y={112} s={1.1} /><Cypress x={330} y={100} s={0.9} />
              <Cypress x={262} y={158} s={0.85} /><Cypress x={416} y={140} s={1} />
              <Orchard x={672} y={62} />
              <Vineyard x={46} y={210} rot={-8} />
              <OliveGrove x={950} y={610} />
              <Chicken x={318} y={506} /><Chicken x={327} y={513} flip /><Chicken x={310} y={514} />
              <WashLine x1={214} y1={548} x2={252} y2={556} />
              <RowBoat x={168} y={708} rot={-8} />
              {/* ── the TIRANA landmarks, woven into the story scenes that name them:
                  the mosque & the sahat-kulla fronting the square beside the church
                  road (a church and a mosque stand together — fshatiSheshi), the
                  tanners' yard by their stone bridge (fshatiLumi), the threshing
                  floor by the fields, the beehives of the bee tale, an ox-cart on
                  the high street ── */}
              {gMosque(492, 336)}
              {gSahatKulla(532, 330)}
              {/* PAZARI — the old bazaar: awninged shops flanking the market
                  street south of the square, the hammam steaming beside them,
                  and the broken fragment of the old fortress wall further out */}
              <Stall x={527} y={548} rot={-6} />
              <Stall x={524} y={594} rot={-10} />
              <Stall x={509} y={638} rot={-16} />
              <Stall x={487} y={554} rot={-4} />
              <Stall x={481} y={600} rot={-12} />
              <Hammam x={556} y={572} />
              <KalaWall x={594} y={648} rot={-8} />
              {/* the little stone culvert where the market street crosses the Lana */}
              <g transform="translate(468,666) rotate(58)">
                <rect x={-13} y={-8} width={26} height={16} rx={2} fill="#cfc8ba" stroke="#6f6759" strokeWidth={1.8} />
                <line x1={-13} y1={-8} x2={13} y2={-8} stroke="#8b8378" strokeWidth={2.4} />
                <line x1={-13} y1={8} x2={13} y2={8} stroke="#8b8378" strokeWidth={2.4} />
              </g>
              <ThreshingFloor x={608} y={764} />
              <Beehives x={692} y={232} />
              <OxCart x={470} y={288} rot={74} />
              <HideRack x={238} y={654} />
              <TanPits x={262} y={676} />
              {/* the SEA TRACK (udha e detit) — the worn path the fisherfolk and
                  salt-carriers take from the town's east edge out through the
                  windbreak to the jetty, forking down to the salt-pans. Drawn
                  here (over the trees) so it reads as the gap in the shore wood. */}
              {['M 878 588 C 924 614 962 652 984 700 C 994 726 990 750 980 770',
                'M 966 704 C 946 756 922 808 902 850'].map((d, i) => (
                <g key={'sea' + i}>
                  <path d={d} fill="none" stroke="#9e885b" strokeWidth={i ? 11 : 15} opacity={0.4} strokeLinecap="round" />
                  <path d={d} fill="none" stroke="#d8c79c" strokeWidth={i ? 7.5 : 11} strokeLinecap="round" />
                  <path d={d} fill="none" stroke="#efe5c8" strokeWidth={2.4} strokeDasharray="2 10" opacity={0.85} strokeLinecap="round" />
                </g>
              ))}
              <text x={946} y={636} textAnchor="middle" transform="rotate(52 946 636)" className="dbg-vdistrict" style={{ fontSize: 13 }}>udha e detit</text>
              {/* ── the COAST, dressed the way an old Albanian shore is: the
                  wooden skela running into the shallows by the fishing coast,
                  boats drawn up on the sand, nets drying, the kripore salt pans
                  on the flat, and the watchtower out on the Rodon headland ── */}
              <Jetty x={992} y={794} rot={14} />
              <RowBoat x={1002} y={716} rot={24} />
              <RowBoat x={976} y={748} rot={-12} />
              <NetRack x={952} y={766} />
              <NetRack x={984} y={690} />
              <SaltPans x={894} y={866} />
              <CoastTower x={1004} y={566} />
              {/* ── the walled PALACE compound (east): a WIDE ROAD from the square to
                  the front gate, a grey stone curtain wall enclosing the black palace
                  and the marble garden (gate on the WEST), back lanes behind it ── */}
              <g>
                {/* the grand approach road: square → the palace gate */}
                <path d="M 516 440 C 546 454 576 452 618 470" fill="none" stroke="#9e885b" strokeWidth={32} opacity={0.4} strokeLinecap="round" />
                <path d="M 516 440 C 546 454 576 452 618 470" fill="none" stroke="#cbb98d" strokeWidth={25} strokeLinecap="round" />
                <path d="M 516 440 C 546 454 576 452 618 470" fill="none" stroke="#efe5c8" strokeWidth={4} strokeDasharray="2 12" opacity={0.85} strokeLinecap="round" />
                {/* the courtyard ground inside the walls */}
                <rect x={626} y={394} width={192} height={152} rx={8} fill="#bda876" opacity={0.55} />
                {/* the curtain wall — four runs, with a GATE gap on the west side */}
                <g fill="#8b8378" stroke="#585047" strokeWidth={2.4}>
                  <rect x={620} y={386} width={204} height={9} />
                  <rect x={620} y={545} width={204} height={9} />
                  <rect x={815} y={386} width={9} height={168} />
                  <rect x={620} y={386} width={9} height={66} />
                  <rect x={620} y={496} width={9} height={58} />
                </g>
                {/* battlements along the north wall */}
                {Array.from({ length: 12 }, (_, i) => <rect key={'m' + i} x={624 + i * 16.4} y={381} width={9} height={6} fill="#8b8378" stroke="#585047" strokeWidth={1} />)}
                {/* corner towers */}
                {[[620, 386], [813, 386], [620, 545], [813, 545]].map(([tx, ty], i) => (
                  <g key={'t' + i}>
                    <rect x={tx - 6} y={ty - 7} width={20} height={20} rx={1.5} fill="#9a938a" stroke="#585047" strokeWidth={2} />
                    {[0, 1, 2].map((j) => <rect key={j} x={tx - 6 + j * 7} y={ty - 11} width={4.5} height={5} fill="#9a938a" stroke="#585047" strokeWidth={1} />)}
                  </g>
                ))}
                {/* the front gatehouse posts flanking the road */}
                {[444, 490].map((gy, i) => <rect key={'g' + i} x={612} y={gy} width={16} height={16} rx={1.5} fill="#736b60" stroke="#3f382f" strokeWidth={1.8} />)}
                {/* the king's ceremonial carpet: gate → the palace door */}
                <path d="M 632 470 C 680 470 716 466 746 462" fill="none" stroke="#7a2f2f" strokeWidth={9} opacity={0.6} strokeLinecap="round" />
                <path d="M 632 470 C 680 470 716 466 746 462" fill="none" stroke="#c9a24a" strokeWidth={1.4} strokeDasharray="4 6" opacity={0.8} />
                {/* black banners of the black king on the gatehouse posts */}
                {[441, 487].map((gy, i) => (
                  <g key={'bn' + i}>
                    <line x1={620} y1={gy} x2={620} y2={gy - 15} stroke="#3f382f" strokeWidth={1.6} />
                    <path d={`M 620 ${gy - 15} L 634 ${gy - 12} L 620 ${gy - 8} Z`} fill="#2a2432" stroke="#141019" strokeWidth={0.9} />
                    <circle cx={624.5} cy={gy - 11.5} r={1.3} fill="#e6b84e" />
                  </g>
                ))}
              </g>
              {VILLAGE_DISTRICTS.map((d, i) => (
                <text key={i} x={d.x} y={d.y} textAnchor="middle" className="dbg-vdistrict">{d.t}</text>
              ))}
              {VILLAGE_PLACES.map((pl) => {
                if (!STORY[pl.id]) return null
                const kind = g.kindOf(pl.id)
                const isSel = pl.id === sel, isCur = pl.id === current
                const dim = focus && nbr && !nbr.has(pl.id)
                return (
                  <g key={pl.id} className="dbg-vpin" opacity={dim ? 0.3 : 1}
                     onClick={() => setSel(pl.id)} style={{ cursor: 'pointer' }}>
                    <title>{pl.id}{STORY[pl.id].end ? ` (${STORY[pl.id].end})` : ''}</title>
                    {(isSel || isCur) && <circle cx={pl.x} cy={pl.y} r={24} fill="none" stroke={isSel ? '#3ad0c0' : '#fff'} strokeWidth={2.4} opacity={0.85} />}
                    {GLYPH(pl)}
                    {pl.type === 'dot'
                      ? <circle cx={pl.x} cy={pl.y} r={isSel || isCur ? 7 : 5.5} fill={KIND_COLOR[kind]} stroke={isSel ? '#3ad0c0' : isCur ? '#fff' : '#121a24'} strokeWidth={1.6} />
                      : pl.type !== 'square' && <circle cx={pl.x} cy={pl.y + (pl.lh > 22 ? 2 : 0)} r={3.4} fill={KIND_COLOR[kind]} stroke="#121a24" strokeWidth={1.1} />}
                    <text x={pl.x} y={pl.y - (pl.lh || 18)} textAnchor="middle" className="dbg-vlabel">{pl.label}</text>
                  </g>
                )
              })}
            </g>

            {/* story edges — a line between every linked pair of scenes, as in the graph.
                when a node is selected: its OUT edges glow teal, its IN edges amber. */}
            <g>
              {edges.map(([x1, y1, x2, y2, u, v, wander], i) => {
                if (x1 === x2 && y1 === y2) return null // same-place edge — it lives inside the location card
                const out = u === focus, inc = v === focus, hot = out || inc
                const stroke = out ? '#3ad0c0' : inc ? '#f0a53c' : (wander ? '#6a5a44' : '#43526a')
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke}
                             strokeWidth={(hot ? 1.9 : wander ? 0.5 : 0.8) * ds}
                             strokeDasharray={wander && !hot ? `${4 * ds} ${5 * ds}` : undefined}
                             opacity={hot ? 0.95 : (focus ? 0.05 : (showOdd ? 0.06 : (wander ? 0.13 : 0.3)))} />
              })}
            </g>

            {/* "teleport" links — long, cross-region, passing over many scenes */}
            {showOdd && oddEdges.map((s, i) => {
              const [x1, y1, x2, y2, u, v] = s.e
              return (
                <line key={'odd' + i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#e0459b"
                      strokeWidth={2.6 * ds} opacity={0.92} style={{ cursor: 'pointer' }}
                      onClick={() => setSel(u)}>
                  <title>{u} → {v}  ·  crosses ~{s.crossings} scenes  ·  {Math.round(s.len)}px  ({s.ru}→{s.rv})</title>
                </line>
              )
            })}

            {/* lone scene-dots — click to SELECT (highlight its edges); dim the rest. */}
            {singles.map((d) => {
              if (LANDMARK_IDS.has(d.id)) return null // drawn as a bespoke landmark glyph below
              const isSel = d.id === sel, isCur = d.id === current
              const dim = focus && nbr && !nbr.has(d.id)
              const label = isSel || (nbr && nbr.has(d.id)) || hubSet.has(d.id)
              return (
                <g key={d.id} className="dbg-wdot" opacity={dim ? 0.22 : 1} onClick={() => setSel(d.id)} style={{ cursor: 'pointer' }}>
                  <title>{d.id}{STORY[d.id].end ? ` (${STORY[d.id].end})` : ''}</title>
                  {label && <text x={d.x} y={d.y - 10 * ds} textAnchor="middle" className="dbg-wdotlabel"
                                  style={{ fontSize: 10.5 * ds, strokeWidth: 3 * ds }}>{d.id}</text>}
                  {/* generous invisible hit target so tiny glyphs are easy to click */}
                  <circle cx={d.x} cy={d.y} r={dr * 2.4} fill="transparent" />
                  {(isSel || isCur) && <circle cx={d.x} cy={d.y} r={12} fill="none" stroke={isSel ? '#3ad0c0' : '#fff'} strokeWidth={2} opacity={0.8} />}
                  {genericGlyph(d.x, d.y, d.kind, d.region)}
                </g>
              )
            })}

            {/* SHARED PLACES — one marker per spot where several scenes happen.
                A count badge marks them; click for the LOCATION CARD ("what can
                happen here"). When a village building / landmark hosts the spot,
                its own glyph stays put and only the badge is added. */}
            {clusters.map((c) => {
              const host = c.hostVp || c.hostLm
              const dimAll = focus && nbr && !c.members.some((m) => nbr.has(m.id))
              const holds = c.members.some((m) => m.id === sel || m.id === current)
              const hot = holds || openPlace === c.key
              const ctrl = host ? [c.x + 13, c.y - 15] : [c.x, c.y]
              return (
                <g key={c.key} className="dbg-wdot" opacity={dimAll ? 0.4 : 1}
                   onClick={() => setOpenPlace(openPlace === c.key ? null : c.key)} style={{ cursor: 'pointer' }}>
                  <title>{c.members.length} scenes happen here — click for the location card</title>
                  {!host && holds && <circle cx={c.x} cy={c.y} r={13} fill="none" stroke={c.members.some((m) => m.id === sel) ? '#3ad0c0' : '#fff'} strokeWidth={2} opacity={0.8} />}
                  {host
                    ? <><circle cx={ctrl[0]} cy={ctrl[1]} r={7} fill={hot ? '#3ad0c0' : '#2b3550'} stroke="#fff" strokeWidth={1.2} />
                        <text x={ctrl[0]} y={ctrl[1] + 3} textAnchor="middle" fontSize={9} fontWeight="700" fill="#fff" fontFamily="system-ui, sans-serif">{c.members.length}</text></>
                    : <><circle cx={c.x} cy={c.y} r={dr * 2.4} fill="transparent" />
                        <StoryStack x={c.x} y={c.y} n={c.members.length} hot={hot} /></>}
                </g>
              )
            })}

            {/* the ray of light from Tomorr's summit (maja) up to the plateau's gate */}
            <g style={{ pointerEvents: 'none' }}>
              <polygon points="288,-832 312,-832 318,-1030 282,-1030" fill="url(#rayGrad)" />
              <line x1={300} y1={-834} x2={300} y2={-1032} stroke="#fff6d8" strokeWidth={2.4} opacity={0.75} />
              {[[294, -942], [307, -1002], [300, -882]].map(([sx, sy], i) => (
                <g key={i} transform={`translate(${sx},${sy})`} opacity={0.8}>
                  <path d="M0 -6 L1.3 -1.3 L6 0 L1.3 1.3 L0 6 L-1.3 1.3 L-6 0 L-1.3 -1.3 Z" fill="#fff6d8" />
                </g>
              ))}
            </g>

            {/* outer-region landmark glyphs — each key folklore scene drawn as
                the thing the story describes (like the village buildings) */}
            {WORLD_LANDMARKS.map((lm, i) => {
              if (!STORY[lm.id] || !WORLD_GLYPH[lm.glyph]) return null
              const isSel = lm.id === sel, isCur = lm.id === current
              const dim = focus && nbr && !nbr.has(lm.id)
              return (
                <g key={'lm' + i} className="dbg-vpin" opacity={dim ? 0.28 : 1}
                   onClick={() => setSel(lm.id)} style={{ cursor: 'pointer' }}>
                  <title>{lm.id}{STORY[lm.id].end ? ` (${STORY[lm.id].end})` : ''}</title>
                  {(isSel || isCur) && <circle cx={lm.x} cy={lm.y} r={30} fill="none" stroke={isSel ? '#3ad0c0' : '#fff'} strokeWidth={2.6} opacity={0.85} />}
                  {WORLD_GLYPH[lm.glyph](lm.x, lm.y, world)}
                  <circle cx={lm.x} cy={lm.y + 16} r={3.2} fill={KIND_COLOR[g.kindOf(lm.id)]} stroke="#101820" strokeWidth={1.1} />
                  <text x={lm.x} y={lm.y - 30} textAnchor="middle" className="dbg-vlabel">{lm.label}</text>
                </g>
              )
            })}

            {/* walking NPCs — live positions derived from the world clock
                (npcs.js routes); the badge stands beside the scene marker */}
            {(npcs || []).map((n) => {
              const p = pos[n.node]
              if (!p) return null
              return (
                <g key={'npc' + n.id} className="dbg-npc">
                  <title>{n.name} — {n.node}</title>
                  <circle cx={p[0] + 12} cy={p[1] - 10} r={8.5} fill="#1c2433" stroke="#e6b84e" strokeWidth={1.2} opacity={0.92} />
                  <text x={p[0] + 12} y={p[1] - 6.4} textAnchor="middle" fontSize={10.5}>{n.glyph}</text>
                </g>
              )
            })}

            {/* region captions */}
            {REGIONS.map((rg) => {
              if (!rg.label) return null
              const [lx, ly] = REGION_LABEL_POS[rg.key] || [rg.cx, rg.cy - rg.ry - 12]
              return <text key={rg.key} x={lx} y={ly} textAnchor="middle" className="dbg-wregion">{rg.label}</text>
            })}
          </g>
        </svg>

        {placeCard && (
          <div className="dbg-worldinfo dbg-placecard">
            <div className="dbg-wi-head">
              <b>{placeCard.name}</b>
              <span className="dbg-pc-count">{placeCard.count} scenes</span>
              <button className="dbg-wi-x" title="close" onClick={() => setOpenPlace(null)}>✕</button>
            </div>
            <div className="dbg-pc-rows">
              {placeCard.rows.map((r, i) => (
                <div key={i} className="dbg-pc-row">
                  <span className="dbg-pc-title">{r.title}</span>
                  <span className="dbg-pc-chips">
                    {r.nodes.map((id) => (
                      <button key={id} className={'dbg-pc-chip' + (id === current ? ' cur' : '')}
                              title={(STORY[id] && STORY[id].end ? `(${STORY[id].end}) ` : '') + 'select on the map'}
                              onClick={() => { setSel(id); setOpenPlace(null) }}>
                        <i style={{ background: KIND_COLOR[g.kindOf(id)] }} />{id}{id === current ? ' ◉' : ''}
                      </button>
                    ))}
                  </span>
                </div>
              ))}
            </div>
            <button className="btn dbg-wi-open" onClick={() => goGraph(placeCard.anchor)}>open in Story Graph →</button>
          </div>
        )}

        {!placeCard && info && (
          <div className="dbg-worldinfo">
            <div className="dbg-wi-head">
              <code>{sel}</code>
              {info.n.end && <span className={'dbg-tag ' + info.n.end}>{info.n.end}</span>}
              {info.n.title && <b>{info.n.title}</b>}
              <button className="dbg-wi-x" title="clear selection" onClick={() => setSel(null)}>✕</button>
            </div>
            {info.firstLine && <p className="dbg-wi-line">“{info.firstLine}”</p>}
            <div className="dbg-wi-sec">
              <span className="dbg-wi-lbl teal">exits · {info.exits.length}</span>
              {info.exits.length === 0 && <em>none (ending)</em>}
              {info.exits.map((e, i) => (
                <button key={i} className="dbg-wi-jump" onClick={() => setSel(e.to)}>{e.t} <code>→ {e.to}</code></button>
              ))}
            </div>
            <div className="dbg-wi-sec">
              <span className="dbg-wi-lbl amber">entered from · {info.incoming.length}</span>
              {info.incoming.length === 0 && <em>{sel === START_NODE ? 'the start' : 'unreachable!'}</em>}
              {info.incoming.map((id) => (
                <button key={id} className="dbg-wi-jump" onClick={() => setSel(id)}><code>{id}</code></button>
              ))}
            </div>
            <button className="btn dbg-wi-open" onClick={() => goGraph(sel)}>open in Story Graph →</button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── the 3-axis ranking: how Albanian / how known / how culturally important ──
const RANK_AXES = [
  { i: 0, label: 'shqip', tip: 'How distinctively Albanian: endemic (5) → Balkan-shared → borrowed/generic (1)' },
  { i: 1, label: 'njohje', tip: 'How many Albanians would recognise it today: everyone (5) → scholars only (1)' },
  { i: 2, label: 'rëndësi', tip: 'Cultural importance / centrality: a pillar (5) → a curiosity (1)' },
]
function Dots({ n }) {
  return (
    <span className="dbg-dots" aria-label={n + '/5'}>
      {[1, 2, 3, 4, 5].map((i) => <i key={i} className={i <= n ? 'on' : ''} />)}
    </span>
  )
}
function RankBar({ id }) {
  const r = RANK[id]
  if (!r) return null
  return (
    <div className="dbg-rank">
      {RANK_AXES.map((a) => (
        <span key={a.i} className="dbg-rank-ax" title={a.tip}>
          <span className="dbg-rank-lbl">{a.label}</span><Dots n={r[a.i]} />
        </span>
      ))}
    </div>
  )
}
// an entry's own sources + the extra ones gathered in the ranking pass (deduped)
function mergedSources(entry) {
  const seen = new Set(); const out = []
  for (const s of [...(entry.sources || []), ...(EXTRA_SOURCES[entry.id] || [])]) {
    if (s && s.url && !seen.has(s.url)) { seen.add(s.url); out.push(s) }
  }
  return out
}
const RANK_SORTS = [
  { key: 'cat', label: 'category' },
  { key: 'alb', label: '🇦🇱 most Albanian', i: 0 },
  { key: 'know', label: 'best known', i: 1 },
  { key: 'imp', label: 'most important', i: 2 },
  { key: 'sum', label: '★ overall' },
]
const rankVal = (id, key) => {
  const r = RANK[id]; if (!r) return -1
  if (key === 'sum') return r[0] + r[1] + r[2]
  const s = RANK_SORTS.find((x) => x.key === key)
  return s && s.i != null ? r[s.i] : 0
}

function Library({ focus, goGraph, goLore, goSource, goHistory }) {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('cat')
  const refs = useRef({})
  const byId = useMemo(() => Object.fromEntries(FOLKLORE.map((f) => [f.id, f])), [])
  // reverse map: folklore id -> [ending ids]
  const byLore = useMemo(() => {
    const m = {}
    for (const [endId, loreId] of Object.entries(ENDING_LORE)) (m[loreId] ||= []).push(endId)
    return m
  }, [])
  // reverse map: folklore id -> [corpus sources that document it]
  const bySrc = useMemo(() => {
    const m = {}
    for (const c of CORPUS) for (const id of (c.covers || [])) (m[id] ||= []).push(c)
    return m
  }, [])
  // reverse map: folklore id -> [history events that connect to it]
  const byHist = useMemo(() => {
    const m = {}
    for (const h of HISTORY) for (const id of (h.related || [])) (m[id] ||= []).push(h)
    return m
  }, [])
  const endTitle = useMemo(() => Object.fromEntries(ENDINGS.map((e) => [e.id, e])), [])
  useEffect(() => {
    if (focus && refs.current[focus]) refs.current[focus].scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [focus])

  const q = filter.trim().toLowerCase()
  const shown = FOLKLORE.filter((f) =>
    !q || f.title.toLowerCase().includes(q) || f.summary.toLowerCase().includes(q) || f.category.toLowerCase().includes(q))
  const cats = [...new Set(shown.map((f) => f.category))]
  const groups = sort === 'cat'
    ? cats.map((c) => ({ head: c, items: shown.filter((f) => f.category === c) }))
    : [{ head: null, items: [...shown].sort((a, b) => rankVal(b.id, sort) - rankVal(a.id, sort) || a.title.localeCompare(b.title)) }]

  return (
    <div className="dbg-lib">
      <input className="dbg-filter" placeholder="filter folklore…" value={filter}
             onChange={(e) => setFilter(e.target.value)} />
      <div className="dbg-sortrow">
        <span className="dbg-sortlbl">sort</span>
        {RANK_SORTS.map((s) => (
          <button key={s.key} className={'dbg-sortbtn' + (sort === s.key ? ' active' : '')}
                  onClick={() => setSort(s.key)}>{s.label}</button>
        ))}
      </div>
      <p className="dbg-note">
        Every figure, tale and custom the game draws on. Each card is scored 1–5 on three axes —
        <b> shqip</b> (how distinctively Albanian), <b> njohje</b> (how widely known today) and
        <b> rëndësi</b> (cultural weight); hover a meter for the scale. {FOLKLORE.length} entries ·
        📄 = a downloadable full text · see <b>📚 Sources</b> for the {CORPUS.length} source works.
      </p>
      {groups.map((grp, gi) => (
        <div key={gi} className="dbg-lib-cat">
          {grp.head && <h4>{grp.head}</h4>}
          {grp.items.map((f) => {
            const ends = byLore[f.id] || []
            return (
              <div className={'dbg-card' + (focus === f.id ? ' focus' : '')} key={f.id}
                   ref={(el) => { refs.current[f.id] = el }}>
                <div className="dbg-card-head">
                  <b>{f.title}</b>
                  <span className="dbg-tag node">{f.category}</span>
                </div>
                <RankBar id={f.id} />
                <p className="dbg-summary">{f.summary}</p>
                {mergedSources(f).length > 0 && (
                  <div className="dbg-sources">
                    {mergedSources(f).map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noreferrer">🔗 {s.label}</a>
                    ))}
                  </div>
                )}
                {f.texts?.length > 0 && (
                  <div className="dbg-sources dbg-texts">
                    {f.texts.map((t, i) => (
                      <span key={i} className="dbg-textline">
                        <a href={t.url} target="_blank" rel="noreferrer">📄 {t.label}</a>
                        <span className="dbg-lang">{t.lang}</span>
                        {t.local && (
                          <a href={REPO_BLOB + t.local} target="_blank" rel="noreferrer" title={t.local}>⬇ local</a>
                        )}
                      </span>
                    ))}
                  </div>
                )}
                {bySrc[f.id]?.length > 0 && (
                  <div className="dbg-lore-ends dbg-related">
                    <span className="dbg-lore-ends-label">in sources:</span>
                    {bySrc[f.id].map((c) => (
                      <button className="dbg-tag dbg-tag-btn start" key={c.id}
                              title={c.title + ' — ' + c.author} onClick={() => goSource(c.id)}>
                        📚 {c.author.split(/[&(]/)[0].trim()} {c.year} →
                      </button>
                    ))}
                  </div>
                )}
                {byHist[f.id]?.length > 0 && (
                  <div className="dbg-lore-ends dbg-related">
                    <span className="dbg-lore-ends-label">in history:</span>
                    {byHist[f.id].map((h) => (
                      <button className="dbg-tag dbg-tag-btn secret" key={h.id}
                              title={h.title + ' · ' + h.era} onClick={() => goHistory(h.id)}>
                        📜 {h.title.split(/[—:(]/)[0].trim()} →
                      </button>
                    ))}
                  </div>
                )}
                {f.related?.length > 0 && (
                  <div className="dbg-lore-ends dbg-related">
                    <span className="dbg-lore-ends-label">related:</span>
                    {f.related.map((rid) => {
                      const rf = byId[rid]
                      if (!rf) return null
                      return (
                        <button className="dbg-tag dbg-tag-btn node" key={rid}
                                title={rf.title} onClick={() => goLore(rid)}>
                          {rf.title.split('—')[0].trim()} →
                        </button>
                      )
                    })}
                  </div>
                )}
                {ends.length > 0 && (
                  <div className="dbg-lore-ends">
                    <span className="dbg-lore-ends-label">endings:</span>
                    {ends.map((id) => {
                      const e = endTitle[id]
                      return (
                        <button className={'dbg-tag dbg-tag-btn ' + (e?.kind || 'node')} key={id}
                                title={'open ' + id + ' in the Story Graph'} onClick={() => goGraph(id)}>
                          {e?.kind === 'good' ? '🏆' : e?.kind === 'secret' ? '✨' : '💀'} {e?.title || id} →
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

// The primary-source corpus — the real books behind the library.
const LANG_LABEL = { sq: 'Albanian', de: 'German', fr: 'French', en: 'English',
  'de+sq': 'German + Albanian', 'fr+sq': 'French + Albanian', 'sq+de': 'Albanian + German' }
const LIC_GROUP = (c) =>
  c.local ? '① Downloaded — held locally'
  : /in copyright/i.test(c.license) ? '③ In copyright — linked, not ingested'
  : '② Link-only (no free full text / portal)'

function Sources({ focus, goLore, goHistory }) {
  const [filter, setFilter] = useState('')
  const refs = useRef({})
  const byId = useMemo(() => Object.fromEntries(FOLKLORE.map((f) => [f.id, f])), [])
  const histById = useMemo(() => Object.fromEntries(HISTORY.map((h) => [h.id, h])), [])
  useEffect(() => {
    if (focus && refs.current[focus]) refs.current[focus].scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [focus])

  const q = filter.trim().toLowerCase()
  const shown = CORPUS.filter((c) => !q ||
    (c.title + ' ' + c.author + ' ' + c.summary + ' ' + c.lang).toLowerCase().includes(q))
  const groups = ['① Downloaded — held locally', '② Link-only (no free full text / portal)', '③ In copyright — linked, not ingested']
  const local = CORPUS.filter((c) => c.local).length

  return (
    <div className="dbg-lib">
      <input className="dbg-filter" placeholder="filter sources…" value={filter}
             onChange={(e) => setFilter(e.target.value)} />
      <p className="dbg-note">
        The real books and collections the library is built from. {CORPUS.length} sources,
        of which <b>{local}</b> are downloaded as plain text into <code>docs/references/</code>
        (the ⬇ links open the local copy on GitHub). Every 🔗 is a verified reference link.
      </p>
      {groups.map((grp) => {
        const list = shown.filter((c) => LIC_GROUP(c) === grp)
        if (!list.length) return null
        return (
          <div key={grp} className="dbg-lib-cat">
            <h4>{grp}</h4>
            {list.map((c) => (
              <div className={'dbg-card' + (focus === c.id ? ' focus' : '')} key={c.id}
                   ref={(el) => { refs.current[c.id] = el }}>
                <div className="dbg-card-head">
                  <b>{c.title}</b>
                  <span className="dbg-tag start">{c.local ? '⬇ local' : '🔗 link'}</span>
                </div>
                <div className="dbg-src-meta">
                  {c.author} · {c.year} · {LANG_LABEL[c.lang] || c.lang} · <i>{c.license}</i>
                </div>
                <p className="dbg-summary">{c.summary}</p>
                <div className="dbg-sources">
                  {c.local && (
                    <a href={REPO_BLOB + c.local} target="_blank" rel="noreferrer" title={c.local}>
                      ⬇ local copy ({c.lang})
                    </a>
                  )}
                  {c.online?.map((o, i) => (
                    <a key={i} href={o.url} target="_blank" rel="noreferrer">
                      {o.fmt === 'txt' ? '📄' : o.fmt === 'pdf' ? '📕' : o.fmt === 'catalog' ? '🗂' : '🔗'} {o.label}
                    </a>
                  ))}
                </div>
                {c.covers?.length > 0 && (
                  <div className="dbg-lore-ends dbg-related">
                    <span className="dbg-lore-ends-label">documents:</span>
                    {c.covers.map((id) => {
                      const rf = byId[id]
                      if (!rf) return null
                      return (
                        <button className="dbg-tag dbg-tag-btn node" key={id}
                                title={rf.title} onClick={() => goLore(id)}>
                          {rf.title.split('—')[0].trim()} →
                        </button>
                      )
                    })}
                    {(c.coversHist || []).map((id) => {
                      const h = histById[id]
                      if (!h) return null
                      return (
                        <button className="dbg-tag dbg-tag-btn secret" key={id}
                                title={h.title + ' · ' + h.era} onClick={() => goHistory(id)}>
                          📜 {h.title.split(/[—:(]/)[0].trim()} →
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

// The History / Chronicle layer — real, datable, place-anchored events.
function History({ focus, goLore, goSource }) {
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('time')
  const refs = useRef({})
  const byId = useMemo(() => Object.fromEntries(FOLKLORE.map((f) => [f.id, f])), [])
  // reverse map: history id -> [corpus sources that document it]
  const bySrc = useMemo(() => {
    const m = {}
    for (const c of CORPUS) for (const id of (c.coversHist || [])) (m[id] ||= []).push(c)
    return m
  }, [])
  useEffect(() => {
    if (focus && refs.current[focus]) refs.current[focus].scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [focus])

  const q = filter.trim().toLowerCase()
  const filtered = HISTORY.filter((h) => !q ||
    (h.title + ' ' + h.era + ' ' + h.place + ' ' + h.summary).toLowerCase().includes(q))
  const shown = sort === 'time' ? filtered
    : [...filtered].sort((a, b) => rankVal(b.id, sort) - rankVal(a.id, sort) || a.title.localeCompare(b.title))

  return (
    <div className="dbg-lib">
      <input className="dbg-filter" placeholder="filter history…" value={filter}
             onChange={(e) => setFilter(e.target.value)} />
      <div className="dbg-sortrow">
        <span className="dbg-sortlbl">sort</span>
        {[['time', 'timeline'], ['alb', '🇦🇱 most Albanian'], ['know', 'best known'], ['imp', 'most important'], ['sum', '★ overall']].map(([k, l]) => (
          <button key={k} className={'dbg-sortbtn' + (sort === k ? ' active' : '')} onClick={() => setSort(k)}>{l}</button>
        ))}
      </div>
      <p className="dbg-note">
        Real, datable events tied to the world&rsquo;s places — kept separate from the myth in 📖 Folklore.
        Scored 1–5 on the same three axes (shqip / njohje / rëndësi). {HISTORY.length} entries; default in time order.
      </p>
      {shown.map((h) => (
        <div className={'dbg-card' + (focus === h.id ? ' focus' : '')} key={h.id}
             ref={(el) => { refs.current[h.id] = el }}>
          <div className="dbg-card-head">
            <b>{h.title}</b>
            <span className="dbg-tag secret">📜 {h.era}</span>
          </div>
          <div className="dbg-src-meta">📍 {h.place}</div>
          <RankBar id={h.id} />
          <p className="dbg-summary">{h.summary}</p>
          {mergedSources(h).length > 0 && (
            <div className="dbg-sources">
              {mergedSources(h).map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noreferrer">🔗 {s.label}</a>
              ))}
            </div>
          )}
          {h.related?.length > 0 && (
            <div className="dbg-lore-ends dbg-related">
              <span className="dbg-lore-ends-label">in lore:</span>
              {h.related.map((id) => {
                const rf = byId[id]
                if (!rf) return null
                return (
                  <button className="dbg-tag dbg-tag-btn node" key={id}
                          title={rf.title} onClick={() => goLore(id)}>
                    {rf.title.split('—')[0].trim()} →
                  </button>
                )
              })}
            </div>
          )}
          {bySrc[h.id]?.length > 0 && (
            <div className="dbg-lore-ends dbg-related">
              <span className="dbg-lore-ends-label">in sources:</span>
              {bySrc[h.id].map((c) => (
                <button className="dbg-tag dbg-tag-btn start" key={c.id}
                        title={c.title + ' — ' + c.author} onClick={() => goSource(c.id)}>
                  📚 {c.author.split(/[&(]/)[0].trim()} {c.year} →
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default function DebugView({ state, dispatch }) {
  const g = useMemo(buildGraph, [])
  const [sub, setSub] = useState(state.loreFocus ? 'library' : 'graph')
  const [sel, setSel] = useState(state.nodeId)
  const [libFocus, setLibFocus] = useState(state.loreFocus)
  const [srcFocus, setSrcFocus] = useState(null)
  const [histFocus, setHistFocus] = useState(null)

  // arriving here via an ending's "open in library" link
  useEffect(() => {
    if (state.loreFocus) { setSub('library'); setLibFocus(state.loreFocus) }
  }, [state.loreFocus])

  const goGraph = (id) => { setSel(id); setSub('graph') }
  const goLore = (loreId) => { setLibFocus(loreId); setSub('library') }
  const goSource = (srcId) => { setSrcFocus(srcId); setSub('sources') }
  const goHistory = (histId) => { setHistFocus(histId); setSub('history') }
  const endCounts = ENDINGS.reduce((a, e) => ((a[e.kind] = (a[e.kind] || 0) + 1), a), {})

  return (
    <div className="card dbg">
      <div className="dbg-stats">
        <span><b>{g.ids.length}</b> nodes</span>
        <span><b>{g.reached}</b> reachable</span>
        {g.reached < g.ids.length && <span className="warn"><b>{g.ids.length - g.reached}</b> unreachable</span>}
        <span><b>{g.hubs.length}</b> hubs</span>
        <span>🏆 {endCounts.good || 0} · ✨ {endCounts.secret || 0} · 💀 {endCounts.bad || 0}</span>
        <span><b>{FOLKLORE.length}</b> folklore · <b>{HISTORY.length}</b> history · <b>{CORPUS.length}</b> sources</span>
      </div>
      <div className="dbg-subtabs">
        <button className={'btn' + (sub === 'graph' ? ' active' : '')} onClick={() => setSub('graph')}>🕸 Story Graph</button>
        <button className={'btn' + (sub === 'village' ? ' active' : '')} onClick={() => setSub('village')}>🗺 World</button>
        <button className={'btn' + (sub === 'map' ? ' active' : '')} onClick={() => setSub('map')}>🧭 Hubs</button>
        <button className={'btn' + (sub === 'library' ? ' active' : '')} onClick={() => setSub('library')}>📖 Folklore</button>
        <button className={'btn' + (sub === 'history' ? ' active' : '')} onClick={() => setSub('history')}>📜 History</button>
        <button className={'btn' + (sub === 'sources' ? ' active' : '')} onClick={() => setSub('sources')}>📚 Sources</button>
      </div>
      <div className="dbg-legend">
        {Object.entries(KIND_LABEL).map(([k, label]) => (
          <span key={k}><i style={{ background: KIND_COLOR[k] }} /> {label}</span>
        ))}
      </div>
      {sub === 'graph' && <StoryGraph g={g} sel={sel} setSel={setSel} goLore={goLore} />}
      {sub === 'village' && <VillageMap g={g} current={state.nodeId} goGraph={goGraph} world={{ fire: fireStateOf(state) }} npcs={liveNpcs(state)} />}
      {sub === 'map' && <WorldMap g={g} current={state.nodeId} setSel={setSel} goGraph={goGraph} />}
      {sub === 'library' && <Library focus={libFocus} goGraph={goGraph} goLore={goLore} goSource={goSource} goHistory={goHistory} />}
      {sub === 'history' && <History focus={histFocus} goLore={goLore} goSource={goSource} />}
      {sub === 'sources' && <Sources focus={srcFocus} goLore={goLore} goHistory={goHistory} />}
    </div>
  )
}
