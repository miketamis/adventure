import { useMemo, useState, useEffect, useRef } from 'react'
import { STORY, START_NODE, ENDINGS, lineOf } from '../game/content.js'
import { FOLKLORE, ENDING_LORE } from '../game/folklore.js'
import { WORLD_GLYPH, WORLD_LANDMARKS, genericGlyph } from './mapGlyphs.jsx'

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
function buildGraph() {
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
          <div className="dbg-line" key={i}>
            <span className="dbg-al">{albanianOf(line)}</span>
            <span className="dbg-en">{englishOf(line)}</span>
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

// Each place is a real node id in STORY. x/y are map coordinates (viewBox 1160×820).
// Each place is a real STORY node id, drawn as the landmark the scene describes.
const VILLAGE_PLACES = [
  // the road out (top)
  { id: 'udhekryq', x: 566, y: 66, type: 'crossroads', label: 'crossroads', lh: 22 },
  // church quarter (a rise, top-centre, graves behind)
  { id: 'kisha1', x: 646, y: 176, type: 'church', label: 'church', lh: 40 },
  { id: 'varret1', x: 726, y: 132, type: 'graves', label: 'graves', lh: 18 },
  { id: 'kostandin1', x: 688, y: 256, type: 'roadmark', label: 'road past graves', lh: 15 },
  // the square (the heart) — a real cobbled plaza with the buildings around it
  { id: 'fshatiSheshi', x: 525, y: 432, type: 'square', label: 'the square', lh: 92 },
  { id: 'pusiThate', x: 544, y: 444, type: 'well', label: 'the dry well', lh: 24 },
  { id: 'nenaDiell1', x: 508, y: 400, type: 'claydoll', label: 'the girls', lh: 12 },
  { id: 'veraDite1', x: 566, y: 484, type: 'bonfire', label: 'the festival', lh: 16 },
  { id: 'dordolec1', x: 470, y: 480, type: 'scarecrow', label: 'the children', lh: 20 },
  { id: 'plaka', x: 448, y: 388, type: 'house', label: 'old woman’s house', lh: 18 },
  { id: 'oda1', x: 606, y: 392, type: 'oda', label: 'the oda', lh: 18 },
  // back lanes (east)
  { id: 'fshatiLanes', x: 690, y: 404, type: 'signpost', label: 'back lanes', lh: 20 },
  { id: 'kulle1', x: 712, y: 320, type: 'tower', label: 'stone tower', lh: 26 },
  { id: 'djepi1', x: 776, y: 366, type: 'house', label: 'the cradle', lh: 18, roof: '#9a7250' },
  { id: 'pallatiZi', x: 794, y: 456, type: 'palace', label: 'black palace', lh: 24 },
  { id: 'kopshtMermer1', x: 730, y: 522, type: 'garden', label: 'marble garden', lh: 22 },
  // village life (west)
  { id: 'fshatiJeta', x: 298, y: 434, type: 'signpost', label: 'village life', lh: 20 },
  { id: 'vatra', x: 222, y: 392, type: 'hearth', label: 'the hearth', lh: 20 },
  { id: 'qilim', x: 198, y: 474, type: 'house', label: 'the loom', lh: 18 },
  { id: 'bariu', x: 150, y: 542, type: 'pasture', label: 'shepherd & goats', lh: 18 },
  { id: 'gjysmegjel1', x: 302, y: 558, type: 'rooster', label: 'half-rooster', lh: 14 },
  { id: 'syriKeq1', x: 374, y: 502, type: 'house', label: 'the child', lh: 18 },
  { id: 'breshka1', x: 240, y: 582, type: 'house', label: 'the guest', lh: 18 },
  // river quarter (lower-east, along the water)
  { id: 'fshatiLumi', x: 792, y: 616, type: 'signpost', label: 'down at the river', lh: 20 },
  { id: 'uraArtes1', x: 892, y: 500, type: 'dot', label: 'the bridge', lh: 13 },
  { id: 'mulli1', x: 858, y: 602, type: 'mill', label: 'water-mill', lh: 18 },
  { id: 'kroi1', x: 846, y: 674, type: 'spring', label: 'the spring', lh: 18 },
]

const VILLAGE_DISTRICTS = [
  { t: 'to the mountain', x: 566, y: 30 },
  { t: 'church', x: 690, y: 92 },
  { t: 'the square', x: 512, y: 330 },
  { t: 'back lanes', x: 758, y: 300 },
  { t: 'village life', x: 250, y: 356 },
  { t: 'the river', x: 940, y: 700 },
  { t: 'fields', x: 150, y: 70 },
  { t: 'fields', x: 520, y: 800 },
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
  return (
    <g transform={`translate(${x},${y})`}>
      {shadow(3, 22, 36, 9)}
      <rect x={-34} y={-10} width={12} height={28} rx={2} fill="#2e2836" stroke="#161320" strokeWidth={1.6} />
      <rect x={22} y={-10} width={12} height={28} rx={2} fill="#2e2836" stroke="#161320" strokeWidth={1.6} />
      <rect x={-30} y={-19} width={60} height={38} rx={3} fill="#3a3342" stroke="#161320" strokeWidth={2.2} />
      <rect x={-30} y={-19} width={60} height={11} fill="#4a4252" />
      {[-19, -7, 7, 19].map((wx, i) => <rect key={i} x={wx - 2} y={-3} width={4.5} height={6} fill="#c9a24a" />)}
      <rect x={-4} y={7} width={8} height={12} fill="#1c1826" />
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
  // the wooden footbridge over the river (drawn in place, spans the water)
  return (
    <g>
      <line x1={812} y1={512} x2={968} y2={476} stroke="#6f4f34" strokeWidth={22} strokeLinecap="round" />
      <line x1={812} y1={512} x2={968} y2={476} stroke="#a9825f" strokeWidth={16} strokeLinecap="round" />
      {Array.from({ length: 10 }, (_, i) => {
        const t = i / 9, x = 812 + (968 - 812) * t, y = 512 + (476 - 512) * t
        return <line key={i} x1={x - 7} y1={y - 9} x2={x + 7} y2={y + 9} stroke="#5c4230" strokeWidth={2} />
      })}
    </g>
  )
}

function gSquare(x, y) {
  // a real cobbled plaza — the buildings are placed around it
  return (
    <g>
      <rect x={x - 110} y={y - 80} width={220} height={160} rx={30} fill="#c4b389" stroke="#a2926c" strokeWidth={2.5} />
      <rect x={x - 100} y={y - 70} width={200} height={140} rx={24} fill="none" stroke="#b3a17a" strokeWidth={1.4} opacity={0.7} />
      {[[-60, -40], [40, -50], [-30, 30], [70, 20], [10, 55], [-80, 10]].map(([dx, dy], i) => (
        <ellipse key={i} cx={x + dx} cy={y + dy} rx={9} ry={5} fill="#b09c73" opacity={0.4} />
      ))}
    </g>
  )
}

const GLYPH = (pl) => {
  const { x, y, type, roof } = pl
  switch (type) {
    case 'square': return gSquare(x, y)
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
const REGIONS = [
  { key: 'sky', label: 'the sky realm', cx: 900, cy: -1180, rx: 700, ry: 280, terrain: 'sky', anchors: ['qiell1', 'qiellDiell', 'henaPaqe', 'qiellPrende', 'diellShtepi1', 'rrugaDielli1', 'pemaDielli', 'diellThirrKul'] },
  { key: 'mountain', label: 'Mount Tomorr', cx: 860, cy: -560, rx: 660, ry: 400, terrain: 'mountain', anchors: ['maja', 'mali1', 'tomor1', 'jutbina', 'peri1', 'tomorBekim', 'tomor2', 'tomor3', 'shpirag1', 'maliStuhi', 'tomorProva', 'tomorZbritje'] },
  { key: 'forest', label: 'the great forest', cx: -300, cy: 640, rx: 380, ry: 440, terrain: 'forest', anchors: ['pylli1', 'start', 'zjarriPyll', 'gjumi', 'pylliLoop'] },
  { key: 'river', label: 'the river & the Zana', cx: 1420, cy: 740, rx: 340, ry: 420, terrain: 'river', anchors: ['lumi', 'zana1', 'bolla1', 'ura', 'uraFshaj', 'riddle1', 'zanaProva', 'zanaFole', 'flocka1'] },
  { key: 'castle', label: 'Rozafa castle', cx: 1800, cy: 1060, rx: 220, ry: 200, terrain: 'castle', anchors: ['kalaRozafa'] },
  { key: 'sea', label: 'the sea', cx: 2060, cy: 1400, rx: 520, ry: 400, terrain: 'sea', anchors: ['deti1', 'bregu', 'detiThelle1'] },
  { key: 'underworld', label: 'the world below', cx: 560, cy: 1680, rx: 700, ry: 400, terrain: 'cavern', anchors: ['bota1', 'pusi', 'gjarpri', 'kulshedra1', 'qyteti', 'tre1', 'tre2', 'tre3', 'rrethi', 'shpellaHyrje'] },
  { key: 'village', label: '', cx: 560, cy: 440, rx: 430, ry: 340, terrain: null, anchors: [...VILLAGE_IDS, 'fshatiDil', 'fshatiBesa', 'fshatiCaul', 'udhetimi1', 'udhetimi2', 'gjizar1'] },
]

function hashStr(s) {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return h >>> 0
}

// "wander" links = flee / return / get-lost fallbacks, NOT spatial journeys.
const WANDER_VERB = new Set(['ik', 'kthehu', 'zgjohu', 'dil'])
const WANDER_TO = new Set(['pylliLoop', 'humbur', 'gjumi'])
const isWander = (o) => WANDER_VERB.has((o.text || []).find((t) => t && t.id)?.id) || WANDER_TO.has(o.to)

// multi-source BFS over PROGRESSION edges only (ignore wander), so a node isn't
// dragged into the forest just because it can flee there → the map region a node
// lands in reflects where the story actually takes you.
function assignRegions(g) {
  const prog = {}, full = {}
  for (const id of g.ids) { prog[id] = new Set(); full[id] = new Set() }
  for (const id of g.ids) for (const o of (STORY[id].options || [])) {
    if (o.confuser || !o.to || !STORY[o.to]) continue
    full[id].add(o.to); full[o.to].add(id)
    if (!isWander(o)) { prog[id].add(o.to); prog[o.to].add(id) }
  }
  const reg = {}, dist = {}, q = []
  REGIONS.forEach((rg, ri) => rg.anchors.forEach((a) => {
    if (STORY[a] && dist[a] == null) { reg[a] = ri; dist[a] = 0; q.push(a) }
  }))
  // primary: follow PROGRESSION edges (where the story takes you)
  for (let h = 0; h < q.length; h++) for (const v of prog[q[h]]) if (dist[v] == null) { dist[v] = dist[q[h]] + 1; reg[v] = reg[q[h]]; q.push(v) }
  // fallback: reach nodes only linked in by a flee/return via the full graph
  for (let h = 0; h < q.length; h++) for (const v of full[q[h]]) if (dist[v] == null) { dist[v] = dist[q[h]] + 1; reg[v] = reg[q[h]]; q.push(v) }
  const villageIdx = REGIONS.findIndex((r) => r.key === 'village')
  const byRegion = REGIONS.map(() => [])
  for (const id of g.ids) {
    if (VILLAGE_IDS.has(id)) continue
    byRegion[reg[id] != null ? reg[id] : villageIdx].push(id)
  }
  return byRegion
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
function terrSky(rg) {
  // the blue sky is a world-wide backdrop (drawn before the regions); here we
  // only add the celestial bodies + stars + clouds that live in it.
  const { cx, cy, rx, ry } = rg, rnd = mulberry32(7)
  return (
    <g>
      {/* stars fade out toward the bottom of the sky (Dielli & Hëna are drawn as
          clickable landmark glyphs, so no decorative sun/moon here) */}
      {Array.from({ length: 80 }, (_, i) => { const sy = cy - ry * 1.15 + rnd() * ry * 2.1; return <circle key={i} cx={cx - rx * 1.5 + rnd() * rx * 3} cy={sy} r={rnd() * 1.5 + 0.5} fill="#fff" opacity={(0.5 + rnd() * 0.4) * Math.max(0, Math.min(1, (cy + ry * 0.4 - sy) / (ry * 1.3)))} /> })}
      {[[cx - rx * 0.15, cy + ry * 0.55], [cx + rx * 0.3, cy + ry * 0.2], [cx - rx * 0.55, cy - ry * 0.25], [cx + rx * 0.7, cy + ry * 0.5], [cx + rx * 0.05, cy - ry * 0.4]].map(([x, y], i) => (
        <g key={i} opacity={0.88}>{[[0, 0, 26], [24, 6, 20], [-24, 6, 20], [10, -10, 17]].map(([dx, dy, r], j) => <circle key={j} cx={x + dx} cy={y + dy} r={r} fill="#f2f6fc" />)}</g>
      ))}
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
  const back = [[cx - rx * 0.72, ry * 0.95], [cx - rx * 0.22, ry * 1.2], [cx + rx * 0.32, ry * 1.15], [cx + rx * 0.74, ry * 0.9]]
  const mid = [[cx - rx * 0.48, ry * 1.1], [cx - rx * 0.02, ry * 1.35], [cx + rx * 0.44, ry * 1.12]]
  const front = [[cx - rx * 0.66, ry * 0.82], [cx - rx * 0.3, ry * 1.18], [cx, ry * 1.55], [cx + rx * 0.36, ry * 1.12], [cx + rx * 0.68, ry * 0.8]]
  return (
    <g>
      {/* haze band blending the range up into the sky */}
      <ellipse cx={cx} cy={base - ry * 0.55} rx={rx * 1.15} ry={ry * 0.85} fill="#9fb0c0" opacity={0.16} />
      {ridge(back, '#9aa9b6', '#7d8d9c', '#8493a2', false)}
      {ridge(mid, '#84928b', '#616e66', '#5b6656', false)}
      {ridge(front, '#7f8c74', '#57634c', '#454f38', true)}
      {/* pine tree-line + foothills, blending the base into the land */}
      <ellipse cx={cx} cy={base + ry * 0.03} rx={rx * 1.06} ry={ry * 0.15} fill="#6f8557" opacity={0.5} />
      {Array.from({ length: 11 }, (_, i) => { const hx = cx - rx * 0.98 + (i + 0.5) / 11 * rx * 1.96; return <ellipse key={'f' + i} cx={hx} cy={base + ry * 0.09} rx={rx * 0.12} ry={ry * 0.11} fill="#748a56" opacity={0.7} /> })}
    </g>
  )
}

function terrForest(rg) {
  const { cx, cy, rx, ry } = rg, rnd = mulberry32(23), trees = []
  for (let k = 0; k < 70; k++) { const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()); trees.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r, 0.7 + rnd() * 0.7]) }
  trees.sort((a, b) => a[1] - b[1])
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#43603c" opacity={0.5} />
      {trees.map(([x, y, s], i) => <Tree key={i} x={x} y={y} s={s} />)}
    </g>
  )
}

function terrRiver(rg) {
  // just the green water-meadow banks — the ONE world river flows through here,
  // drawn once at the world level, so this region no longer draws its own river.
  const { cx, cy, rx, ry } = rg, rnd = mulberry32(41), reeds = []
  for (let k = 0; k < 26; k++) { const a = rnd() * Math.PI * 2, r = Math.sqrt(rnd()); reeds.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]) }
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#8fae5c" opacity={0.45} />
      {reeds.map(([x, y], i) => <line key={i} x1={x} y1={y} x2={x + 1} y2={y - 10} stroke="#6f8a3f" strokeWidth={1.6} opacity={0.6} />)}
    </g>
  )
}

function terrSea(rg) {
  const { cx, cy, rx, ry } = rg
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="url(#wSea)" />
      {Array.from({ length: 15 }, (_, i) => {
        const y = cy - ry + (i + 1) / 16 * ry * 2, t = (y - cy) / ry
        const w = Math.sqrt(Math.max(0, 1 - t * t)) * rx
        return <g key={i}>{Array.from({ length: 5 }, (_, j) => { const x = cx - w + (j + 0.5) / 5 * w * 2 + (i % 2 ? 18 : 0); return <path key={j} d={`M ${x - 12} ${y} q 6 -6 12 0 q 6 6 12 0`} fill="none" stroke="#c8e6ef" strokeWidth={1.6} opacity={0.5} /> })}</g>
      })}
      <g transform={`translate(${cx - rx * 0.2},${cy - ry * 0.1})`}>
        <path d="M-17 4 L17 4 L11 13 L-11 13 Z" fill="#7a5c3a" stroke="#4f3a2a" strokeWidth={1.6} />
        <rect x={-1} y={-19} width={2.4} height={23} fill="#4f3a2a" />
        <path d="M1 -17 L15 -3 L1 -3 Z" fill="#efe7d5" />
      </g>
    </g>
  )
}

function terrCavern(rg) {
  const { cx, cy, rx, ry } = rg, rnd = mulberry32(11)
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#2b2622" stroke="#171310" strokeWidth={5} />
      <ellipse cx={cx} cy={cy} rx={rx * 0.92} ry={ry * 0.88} fill="#342c26" />
      {Array.from({ length: 15 }, (_, i) => { const x = cx - rx * 0.86 + (i / 14) * rx * 1.72, h = 16 + rnd() * 28, y = cy - ry * 0.84; return <polygon key={i} points={`${x - 8},${y} ${x + 8},${y} ${x},${y + h}`} fill="#241f1b" /> })}
      {[[-0.3, 0.12], [0.02, -0.04], [0.3, 0.14], [0.52, 0], [-0.56, 0.22]].map(([fx, fy], i) => (
        <g key={i} transform={`translate(${cx + fx * rx},${cy + fy * ry})`}>
          <rect x={-10} y={-34} width={20} height={44} fill="#4a4038" stroke="#1f1a16" strokeWidth={1.6} />
          <rect x={-10} y={-34} width={20} height={8} fill="#5a4e42" />
          <rect x={-4} y={-18} width={8} height={11} fill="#c9a24a" opacity={0.5} />
        </g>
      ))}
      <circle cx={cx - rx * 0.1} cy={cy} r={48} fill="#e8892b" opacity={0.12} />
    </g>
  )
}

function terrCastle(rg) {
  const { cx, cy } = rg
  return (
    <g transform={`translate(${cx},${cy})`}>
      <ellipse cx={4} cy={46} rx={74} ry={16} fill="rgba(0,0,0,.2)" />
      <ellipse cx={0} cy={32} rx={82} ry={30} fill="#8b9781" opacity={0.6} />
      <rect x={-62} y={-10} width={124} height={46} fill="#bcb5a5" stroke="#726a5b" strokeWidth={3} />
      {Array.from({ length: 10 }, (_, i) => <rect key={i} x={-62 + i * 13.5} y={-19} width={9} height={10} fill="#bcb5a5" stroke="#726a5b" strokeWidth={1.5} />)}
      {[-62, -4, 58].map((tx, i) => (
        <g key={i}>
          <rect x={tx - 12} y={-36} width={24} height={72} fill="#c6bfaf" stroke="#726a5b" strokeWidth={2.6} />
          {[0, 1, 2].map((j) => <rect key={j} x={tx - 12 + j * 9} y={-45} width={6} height={9} fill="#c6bfaf" stroke="#726a5b" strokeWidth={1.2} />)}
          <rect x={tx - 3} y={-14} width={6} height={10} fill="#2f2b24" />
        </g>
      ))}
      <path d="M-9 36 L-9 13 A9 9 0 0 1 9 13 L9 36 Z" fill="#3a2e22" />
    </g>
  )
}

const TERRAIN = { sky: terrSky, mountain: terrMountains, forest: terrForest, river: terrRiver, sea: terrSea, cavern: terrCavern, castle: terrCastle }
// soft outer tone per region so each blends into the land instead of floating
const HALO = { mountain: '#7e9a54', forest: '#5f7a3f', river: '#c7b78a', castle: '#8f9a72', sea: '#dcc99d', cavern: '#37302b' }
// faint darker-green blotches over the land band (not the sky) for texture
const WORLD_BLOTCHES = (() => {
  const rnd = mulberry32(99), b = []
  for (let i = 0; i < 22; i++) b.push([-880 + rnd() * 3680, -680 + rnd() * 2820, 60 + rnd() * 150, 24 + rnd() * 60])
  return b
})()

// Roads connect the settled places on LAND (the river handles the water route to
// the Zana / castle / sea, so no road duplicates it).
const VILLAGE_ROADS = [
  'M 566 96 C 660 -60 780 -170 866 -300',    // crossroads → Mount Tomorr
  'M 100 560 C -40 600 -180 620 -320 636',   // village west → the great forest
  'M 1050 900 C 1300 980 1520 1020 1720 1060', // riverside → Rozafa castle (towpath)
]
// ONE river: springs from Mount Tomorr, runs down the village's east edge (past
// the bridge/mill/spring), through the Zana's stretch, and out into the sea.
const WORLD_RIVER = 'M 900 -300 C 1000 -60 946 210 896 486 C 858 726 1070 856 1330 972 C 1584 1086 1866 1196 2060 1336'
// the descent from the village well down to the world below — a ravine that
// curves east of the lower field rather than cutting straight through it.
const WELL_SHAFT = 'M 544 466 C 578 620 700 700 704 884 C 710 1074 626 1256 576 1440'
const MAP_VIEWS = {
  village: { x: 199, y: 90, k: 0.72 },
  world: { x: 384, y: 312, k: 0.2 },
}

function VillageMap({ g, current, goGraph }) {
  const scatter = useMemo(() => {
    const rnd = mulberry32(20260708)
    const trees = []
    const push = (x, y, s) => trees.push({ x, y, s })
    // an ORGANIC tree-ring hugging the village clearing's ellipse (not a box).
    // Skip the east arc (~ -0.5..0.9 rad) where the river runs, so the bank stays open.
    const CX = 512, CY = 432, RX = 590, RY = 452
    for (let a = 0; a < Math.PI * 2; a += 0.045) {
      if (a > -0.55 && a < 0.85) continue // leave the river's east bank clear
      const wob = 1 + Math.sin(a * 3 + 1) * 0.05 + (rnd() - 0.5) * 0.1
      for (let k = 0; k < (rnd() < 0.5 ? 2 : 1); k++) {
        const rr = wob + (rnd() - 0.5) * 0.14
        push(CX + Math.cos(a) * RX * rr, CY + Math.sin(a) * RY * rr, 0.66 + rnd() * 0.62)
      }
    }
    // a thin line of trees along the river's far (east) bank
    for (let t = 0.12; t < 0.92; t += 0.03) {
      const y = -20 + t * 900, x = 895 + Math.sin(t * 7) * 40 + 60
      push(x + rnd() * 20, y + rnd() * 16 - 8, 0.7 + rnd() * 0.6)
    }
    ;[[470, 138], [602, 110], [180, 430], [430, 720]].forEach(([cx, cy]) => {
      for (let k = 0; k < 3; k++) push(cx + rnd() * 60 - 30, cy + rnd() * 46 - 23, 0.56 + rnd() * 0.5)
    })
    trees.sort((a, b) => a.y - b.y)

    // ── the DENSE old town: terracotta rooftops packed into the TOWN footprint,
    // carved into blocks by the real story-lanes (which read as the streets), left
    // open at the central square, and kept off the named landmarks + the river. ──
    const named = VILLAGE_PLACES.filter((p) => STORY[p.id])
    const namedR = (p) => p.type === 'square' ? 0
      : (p.type === 'palace' || p.type === 'church' || p.type === 'tower' || p.type === 'oda' || p.type === 'mill' || p.type === 'garden') ? 30 : 21
    // river's west bank at a given y — keep roofs out of the water
    const riverLeftX = (y) => (y < 486 ? 896 : 896 + (y - 486) * 0.893) - 60
    const segDist = (px, py, x1, y1, x2, y2) => {
      const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy || 1
      let t = ((px - x1) * dx + (py - y1) * dy) / L2; t = t < 0 ? 0 : t > 1 ? 1 : t
      return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy))
    }
    const roofs = []
    for (let gx = TOWN.cx - TOWN.rx; gx <= TOWN.cx + TOWN.rx; gx += 21) {
      for (let gy = TOWN.cy - TOWN.ry; gy <= TOWN.cy + TOWN.ry; gy += 19) {
        const x = gx + (rnd() - 0.5) * 15, y = gy + (rnd() - 0.5) * 15
        const nx = (x - TOWN.cx) / TOWN.rx, ny = (y - TOWN.cy) / TOWN.ry, rad = nx * nx + ny * ny
        if (rad > 1) continue                                       // inside the town oval
        if (x > riverLeftX(y)) continue                             // west of the river
        if (Math.hypot(x - 525, y - 432) < 72) continue             // leave the square open
        let blocked = false
        for (let li = 0; li < VILLAGE_LANES.length && !blocked; li++) {
          const L = VILLAGE_LANES[li]; if (segDist(x, y, L[0], L[1], L[2], L[3]) < 14) blocked = true
        }
        for (let ni = 0; ni < named.length && !blocked; ni++) {
          const p = named[ni]; if (Math.hypot(x - p.x, y - p.y) < namedR(p)) blocked = true
        }
        if (blocked) continue
        if (rad > 0.66 && rnd() < (rad - 0.66) / 0.34) continue     // looser, thinning fringe
        roofs.push({ x, y, w: 15 + rnd() * 11, h: 13 + rnd() * 8, rot: (rnd() - 0.5) * 46, tone: ROOF_TONES[Math.floor(rnd() * ROOF_TONES.length)] })
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
    return { trees, roofs, decor }
  }, [])

  // place every OTHER node as a dot in its region, keep a position + region for
  // EVERY node, build the story edges, and score "teleport" edges (long + cross-
  // region + passing over many other nodes' dots).
  const { dots, edges, oddEdges } = useMemo(() => {
    const byRegion = assignRegions(g)
    const out = [], pos = {}, regOf = {}
    for (const pl of VILLAGE_PLACES) if (STORY[pl.id]) { pos[pl.id] = [pl.x, pl.y]; regOf[pl.id] = 'village' }
    REGIONS.forEach((rg, ri) => {
      if (rg.key === 'village') {
        // supplementary village-adjacent nodes ring the meadow
        byRegion[ri].forEach((id) => {
          const rnd = mulberry32(hashStr(id))
          const a = rnd() * Math.PI * 2, rr = Math.sqrt(0.64 + rnd() * 0.36) * 0.96
          const x = rg.cx + Math.cos(a) * rg.rx * rr, y = rg.cy + Math.sin(a) * rg.ry * rr
          out.push({ id, x, y, kind: g.kindOf(id), region: rg.key }); pos[id] = [x, y]; regOf[id] = rg.key
        })
      } else {
        for (const p of layoutRegion(byRegion[ri], rg)) {
          out.push({ id: p.id, x: p.x, y: p.y, kind: g.kindOf(p.id), region: rg.key }); pos[p.id] = [p.x, p.y]; regOf[p.id] = rg.key
        }
      }
    })
    // landmark nodes are hand-placed at their glyph position (also moves the dot
    // + edge endpoints there). START is a forest landmark, so this pins it too.
    for (const lm of WORLD_LANDMARKS) {
      if (!pos[lm.id]) continue
      pos[lm.id] = [lm.x, lm.y]
      const d = out.find((o) => o.id === lm.id)
      if (d) { d.x = lm.x; d.y = lm.y }
    }
    // edges drawn faint+dashed for wander links, solid for progression, so the
    // solid edges show the real, local structure of the story.
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
    return { dots: out, edges, oddEdges }
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

  const [view, setView] = useState(MAP_VIEWS.village)
  const [showOdd, setShowOdd] = useState(false)
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
  const onBackdrop = () => { if (!drag.current || !drag.current.moved) setSel(null) }
  const zoomBy = (f) => setView((v) => { const k = Math.min(3.4, Math.max(0.16, v.k * f)); return { x: 580 - (580 - v.x) * (k / v.k), y: 380 - (380 - v.y) * (k / v.k), k } })
  const dr = 5.4 / view.k, ds = 1 / view.k

  return (
    <div className="dbg-map">
      <p className="dbg-note">
        The whole world on one map — <b>drag</b> to pan, <b>scroll</b> to zoom. The detailed
        <b> village</b> sits at the centre; around it lie the great forest, Mount Tomorr and the sky realm,
        the river down to the sea and Rozafa castle, and — down through the well — the world below.
        Every <b>dot</b> is a scene; click any dot or building to open it in the Story Graph.
      </p>
      <div className="dbg-worldwrap">
        <div className="dbg-worldtools">
          <button className="btn" title="zoom in" onClick={() => zoomBy(1.3)}>＋</button>
          <button className="btn" title="zoom out" onClick={() => zoomBy(1 / 1.3)}>−</button>
          <button className="btn" title="centre on the village" onClick={() => setView(MAP_VIEWS.village)}>⌂ village</button>
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
            <linearGradient id="rayGrad" gradientUnits="userSpaceOnUse" x1="800" y1="-880" x2="980" y2="-1140">
              <stop offset="0" stopColor="#fff3c0" stopOpacity="0.1" />
              <stop offset="0.5" stopColor="#ffe79a" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fff6d8" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <g transform={`translate(${view.x} ${view.y}) scale(${view.k})`}>
            {/* world ground */}
            <rect x={-960} y={-1560} width={4080} height={3900} fill="#88a559" onClick={onBackdrop} />
            {/* the SKY — a world-wide backdrop across the top that the mountains rise
                into, fading down into the land so there's no seam */}
            <rect x={-960} y={-1560} width={4080} height={1320} fill="url(#wSkyBg)" onClick={onBackdrop} />
            {WORLD_BLOTCHES.filter(([, y]) => y > -300).map(([x, y, rx, ry], i) => <ellipse key={'bl' + i} cx={x} cy={y} rx={rx} ry={ry} fill="#7c9450" opacity={0.32} />)}
            {/* soft region halos so the regions read as one continuous land */}
            {REGIONS.map((rg) => (rg.terrain && HALO[rg.terrain]
              ? <ellipse key={'ha' + rg.key} cx={rg.cx} cy={rg.cy} rx={rg.rx * 1.2} ry={rg.ry * 1.2} fill={HALO[rg.terrain]} opacity={0.5} />
              : null))}

            {/* the village clearing — an organic meadow that blends into the land, not a box */}
            <ellipse cx={512} cy={432} rx={590} ry={452} fill="url(#vGrass)" onClick={onBackdrop} />
            {[[300, 620, 120, 40], [180, 640, 90, 30], [430, 300, 90, 30], [770, 560, 90, 34]].map(([x, y, rx, ry], i) => (
              <ellipse key={'vb' + i} cx={x} cy={y} rx={rx} ry={ry} fill="#7f9a54" opacity="0.3" />
            ))}
            <ellipse cx={654} cy={188} rx={96} ry={44} fill="#a7bd75" opacity="0.55" />

            {/* connector roads, the ONE river (mountain -> village -> Zana -> sea), and the well-shaft */}
            {VILLAGE_ROADS.map((d, i) => (
              <g key={i}>
                <path d={d} fill="none" stroke="#cabd92" strokeWidth={12} opacity={0.6} strokeLinecap="round" />
                <path d={d} fill="none" stroke="#a89468" strokeWidth={3} strokeDasharray="3 12" strokeLinecap="round" />
              </g>
            ))}
            <path d={WORLD_RIVER} fill="none" stroke="#cdbf94" strokeWidth={92} strokeLinecap="round" />
            <path d={WORLD_RIVER} fill="none" stroke="url(#wSea)" strokeWidth={60} strokeLinecap="round" />
            <path d={WORLD_RIVER} fill="none" stroke="#bfe0ea" strokeWidth={16} strokeLinecap="round" opacity={0.5} />
            <path d={WELL_SHAFT} fill="none" stroke="#6f5f45" strokeWidth={30} strokeLinecap="round" opacity={0.55} />
            <path d={WELL_SHAFT} fill="none" stroke="#2b241d" strokeWidth={20} strokeLinecap="round" />
            <path d={WELL_SHAFT} fill="none" stroke="#120f0b" strokeWidth={9} strokeLinecap="round" />
            <path d={WELL_SHAFT} fill="none" stroke="#e8892b" strokeWidth={3} strokeLinecap="round" opacity={0.28} strokeDasharray="1 26" />

            {/* region terrains (the mountain and the sea cover the river's source and mouth) */}
            {REGIONS.map((rg) => (rg.terrain ? <g key={rg.key}>{TERRAIN[rg.terrain](rg)}</g> : null))}

            {/* ===== the village (detailed) — content only; ground + river drawn above ===== */}
            <g>
              {/* warm packed-earth ground of the old town, so the terracotta roofs
                  read against it and the lanes show as pale streets between blocks */}
              <ellipse cx={TOWN.cx} cy={TOWN.cy} rx={TOWN.rx + 24} ry={TOWN.ry + 24} fill="#b6a473" opacity={0.5} onClick={onBackdrop} />
              <ellipse cx={TOWN.cx} cy={TOWN.cy} rx={TOWN.rx} ry={TOWN.ry} fill="#cdba8b" onClick={onBackdrop} />
              {/* fields ring the town out in the meadow, not inside the packed core */}
              <Field x={158} y={126} w={214} h={140} rot={-7} tone="#6f5744" />
              <Field x={150} y={696} w={176} h={120} rot={6} tone="#7a664a" />
              <Field x={492} y={816} w={318} h={110} rot={0} tone="#6f5744" />
              <Field x={330} y={772} w={150} h={98} rot={-4} tone="#7a664a" />
              {gBridgeDeck()}
              {VILLAGE_LANES.map(([x1, y1, x2, y2], i) => {
                const mx = (x1 + x2) / 2 + (y2 - y1) * 0.06, my = (y1 + y2) / 2 + (x1 - x2) * 0.06
                const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`
                return (
                  <g key={i}>
                    <path d={d} fill="none" stroke="#e7dcbe" strokeWidth={9} opacity={0.85} strokeLinecap="round" />
                    <path d={d} fill="none" stroke="#b6a373" strokeWidth={2} strokeDasharray="2 9" strokeLinecap="round" opacity={0.7} />
                  </g>
                )
              })}
              {scatter.roofs.map((h, i) => <RoofBlock key={i} x={h.x} y={h.y} w={h.w} h={h.h} rot={h.rot} tone={h.tone} />)}
              {scatter.trees.map((t, i) => <Tree key={i} x={t.x} y={t.y} s={t.s} />)}
              {scatter.decor.map((d, i) => (
                d.kind === 'rock' ? <Rock key={i} x={d.x} y={d.y} s={d.s} />
                  : d.kind === 'bush' ? <Bush key={i} x={d.x} y={d.y} s={d.s} />
                  : d.kind === 'haystack' ? <Haystack key={i} x={d.x} y={d.y} s={d.s} />
                  : <GardenPlot key={i} x={d.x} y={d.y} s={d.s} />
              ))}
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

            {/* every other node, as a clickable dot in its region.
                click a dot to SELECT it (highlight its edges); dim the rest. */}
            {dots.map((d) => {
              if (LANDMARK_IDS.has(d.id)) return null // drawn as a bespoke landmark glyph below
              const isSel = d.id === sel, isCur = d.id === current
              const dim = focus && nbr && !nbr.has(d.id)
              const big = isSel || (isCur && !sel)
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

            {/* the ray of light from Tomorr's summit (maja) to the Sun's house */}
            <g style={{ pointerEvents: 'none' }}>
              <polygon points="790,-874 810,-870 992,-1128 964,-1152" fill="url(#rayGrad)" />
              <line x1={800} y1={-878} x2={980} y2={-1140} stroke="#fff6d8" strokeWidth={2.4} opacity={0.75} />
              {[[858, -1018], [908, -1088], [828, -960]].map(([sx, sy], i) => (
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
                  {WORLD_GLYPH[lm.glyph](lm.x, lm.y)}
                  <circle cx={lm.x} cy={lm.y + 16} r={3.2} fill={KIND_COLOR[g.kindOf(lm.id)]} stroke="#101820" strokeWidth={1.1} />
                  <text x={lm.x} y={lm.y - 30} textAnchor="middle" className="dbg-vlabel">{lm.label}</text>
                </g>
              )
            })}

            {/* region captions */}
            {REGIONS.map((rg) => (rg.label ? (
              <text key={rg.key} x={rg.cx} y={rg.cy - rg.ry - 12} textAnchor="middle" className="dbg-wregion">{rg.label}</text>
            ) : null))}
          </g>
        </svg>

        {info && (
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

function Library({ focus, goGraph, goLore }) {
  const [filter, setFilter] = useState('')
  const refs = useRef({})
  const byId = useMemo(() => Object.fromEntries(FOLKLORE.map((f) => [f.id, f])), [])
  // reverse map: folklore id -> [ending ids]
  const byLore = useMemo(() => {
    const m = {}
    for (const [endId, loreId] of Object.entries(ENDING_LORE)) (m[loreId] ||= []).push(endId)
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

  return (
    <div className="dbg-lib">
      <input className="dbg-filter" placeholder="filter folklore…" value={filter}
             onChange={(e) => setFilter(e.target.value)} />
      <p className="dbg-note">
        Every figure, tale and custom the game draws on, with the source links it was built from —
        use these to check the story against the real lore. {FOLKLORE.length} entries.
      </p>
      {cats.map((cat) => (
        <div key={cat} className="dbg-lib-cat">
          <h4>{cat}</h4>
          {shown.filter((f) => f.category === cat).map((f) => {
            const ends = byLore[f.id] || []
            return (
              <div className={'dbg-card' + (focus === f.id ? ' focus' : '')} key={f.id}
                   ref={(el) => { refs.current[f.id] = el }}>
                <div className="dbg-card-head">
                  <b>{f.title}</b>
                  <span className="dbg-tag node">{f.category}</span>
                </div>
                <p className="dbg-summary">{f.summary}</p>
                {f.sources?.length > 0 && (
                  <div className="dbg-sources">
                    {f.sources.map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noreferrer">🔗 {s.label}</a>
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

export default function DebugView({ state, dispatch }) {
  const g = useMemo(buildGraph, [])
  const [sub, setSub] = useState(state.loreFocus ? 'library' : 'graph')
  const [sel, setSel] = useState(state.nodeId)
  const [libFocus, setLibFocus] = useState(state.loreFocus)

  // arriving here via an ending's "open in library" link
  useEffect(() => {
    if (state.loreFocus) { setSub('library'); setLibFocus(state.loreFocus) }
  }, [state.loreFocus])

  const goGraph = (id) => { setSel(id); setSub('graph') }
  const goLore = (loreId) => { setLibFocus(loreId); setSub('library') }
  const endCounts = ENDINGS.reduce((a, e) => ((a[e.kind] = (a[e.kind] || 0) + 1), a), {})

  return (
    <div className="card dbg">
      <div className="dbg-stats">
        <span><b>{g.ids.length}</b> nodes</span>
        <span><b>{g.reached}</b> reachable</span>
        {g.reached < g.ids.length && <span className="warn"><b>{g.ids.length - g.reached}</b> unreachable</span>}
        <span><b>{g.hubs.length}</b> hubs</span>
        <span>🏆 {endCounts.good || 0} · ✨ {endCounts.secret || 0} · 💀 {endCounts.bad || 0}</span>
        <span><b>{FOLKLORE.length}</b> folktales</span>
      </div>
      <div className="dbg-subtabs">
        <button className={'btn' + (sub === 'graph' ? ' active' : '')} onClick={() => setSub('graph')}>🕸 Story Graph</button>
        <button className={'btn' + (sub === 'village' ? ' active' : '')} onClick={() => setSub('village')}>🗺 World</button>
        <button className={'btn' + (sub === 'map' ? ' active' : '')} onClick={() => setSub('map')}>🧭 Hubs</button>
        <button className={'btn' + (sub === 'library' ? ' active' : '')} onClick={() => setSub('library')}>📖 Folklore</button>
      </div>
      <div className="dbg-legend">
        {Object.entries(KIND_LABEL).map(([k, label]) => (
          <span key={k}><i style={{ background: KIND_COLOR[k] }} /> {label}</span>
        ))}
      </div>
      {sub === 'graph' && <StoryGraph g={g} sel={sel} setSel={setSel} goLore={goLore} />}
      {sub === 'village' && <VillageMap g={g} current={state.nodeId} goGraph={goGraph} />}
      {sub === 'map' && <WorldMap g={g} current={state.nodeId} setSel={setSel} goGraph={goGraph} />}
      {sub === 'library' && <Library focus={libFocus} goGraph={goGraph} goLore={goLore} />}
    </div>
  )
}
