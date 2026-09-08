import { useMemo, useState, useEffect, useRef, Fragment } from 'react'
import { createPortal } from 'react-dom'
import { STORY, START_NODE, ENDINGS, lineOf } from '../game/content.js'
import { FOLKLORE, ENDING_LORE, CORPUS, HISTORY, REPO_BLOB, EXTRA_SOURCES, RANK } from '../game/folklore.js'
import { TALES, framesOf, coverageOf, playOf } from '../game/taleBeats.js'
import { NPC_REGISTRY, NPC_OF_CAST } from '../game/npcRegistry.js'
import { buildGraph, VillageMap } from './WorldMapView.jsx'
import { NODE_POS, PLACE_OF } from './nodePositions.js'
import { PLACE_META } from './placeMeta.js'
import { environmentSnapshot, fireStateOf, liveNpcs } from '../game/gameState.js'
import { englishReadingOf } from '../game/language.js'
import {
  SELECTED_WITNESS_REVIEWS,
  SOURCE_REVIEW_DISPOSITIONS,
} from '../game/data/tales/_sourceLedger.js'

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
const englishOf = (line) => englishReadingOf(line)

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

// node -> the tale-place MOLD it is cast in (the shared "shape" any story reusing
// this spot must satisfy — the sharing rule). Keyed by the place's ANCHOR node;
// a sub-scene resolves to its anchor through PLACE_OF. Lets a world-jump chip
// explain the mold the scene is modelled after.
const MOLD_BY_NODE = {}
for (const [tid, t] of Object.entries(TALES)) {
  for (const pl of t.places || []) {
    const node = pl.anchor?.node
    if (!node || pl.anchor.status === 'offstage' || MOLD_BY_NODE[node]) continue
    MOLD_BY_NODE[node] = { mold: pl.anchor.mold, place: pl.name, emoji: pl.emoji, taleId: tid, taleTitle: t.title }
  }
}
const moldOf = (node) => MOLD_BY_NODE[node] || MOLD_BY_NODE[PLACE_OF[node]] || null

// ===========================================================================
// RICH HOVER-CARDS — most badges in this console point at another entity (a
// scene, a figure, a tale, a source, a real event). Hovering any of them pops
// a portal-rendered preview of that entity so you can read it without leaving
// the page. One generic <Badge> owns the hover state + click; a per-entity
// *Body renders the preview inside the shared <HoverCardShell>.
// ===========================================================================
// by-id lookups for the preview bodies (the views build their own; these are
// the module-level ones the shared cards use).
const FOLKLORE_BY_ID = Object.fromEntries(FOLKLORE.map((f) => [f.id, f]))
const HISTORY_BY_ID = Object.fromEntries(HISTORY.map((h) => [h.id, h]))
const LORE_BY_ID = { ...FOLKLORE_BY_ID, ...HISTORY_BY_ID }
const CORPUS_BY_ID = Object.fromEntries(CORPUS.map((c) => [c.id, c]))
// what each node/ending KIND means — for the little colored kind tags
const KIND_INFO = {
  start: ['start', 'Where a run begins — the first scene the player sees.'],
  hub: ['hub', 'An open-world crossroads: a scene with 4+ exits you can leave several ways and always come back to.'],
  good: ['good ending', 'A winning finish. Completing it makes its achievement eligible and drops you back into the open world.'],
  secret: ['secret ending', 'A hidden finish reached only by an out-of-the-way path.'],
  bad: ['bad ending', 'A losing finish — a fate. It costs a heart, but is still recorded.'],
  node: ['scene', 'An ordinary story scene (fewer than four exits).'],
}
// what each play STANCE means — for the role tags in the Beats view
const STANCE_INFO = {
  embodied: ['🎮 embodied', 'The player IS this character — their choices are that character\'s actions.'],
  companion: ['🧍 companion', 'The player rides along with a character and can act on their behalf — a presence not in the source tale.'],
  witness: ['👁 witness', 'The player only experiences the legend and changes nothing (a cosmological or petrification myth).'],
}

// The shared card box: a fixed, viewport-clamped panel pinned above/below the
// badge, non-interactive (pointer-events off) so it never fights the click.
function HoverCardShell({ rect, width = 380, children }) {
  const openDown = rect.bottom < window.innerHeight * 0.55
  const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8))
  const style = {
    width, left,
    ...(openDown
      ? { top: rect.bottom + 8, maxHeight: window.innerHeight - rect.bottom - 20 }
      : { bottom: window.innerHeight - rect.top + 8, maxHeight: rect.top - 20 }),
  }
  return createPortal(<div className="dbg-hovercard" style={style}>{children}</div>, document.body)
}

// A badge that reveals a rich preview on hover. `renderBody` (a thunk, called
// only while hovered) supplies the card contents; omit it for a plain badge.
// Renders as a <button>/<span>/<a> per `tag`; click/href/etc. pass through.
function Badge({ tag = 'button', className, title, renderBody, width, children, ...rest }) {
  const [rect, setRect] = useState(null)
  const ref = useRef(null)
  const show = () => ref.current && setRect(ref.current.getBoundingClientRect())
  const hide = () => setRect(null)
  const Tag = tag
  return (
    <Tag ref={ref} className={className} title={renderBody ? undefined : title}
         onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide} {...rest}>
      {children}
      {rect && renderBody && <HoverCardShell rect={rect} width={width}>{renderBody()}</HoverCardShell>}
    </Tag>
  )
}

// --- per-entity preview bodies (rendered inside HoverCardShell) -------------
// A STORY scene: its place + mold, the whole scene text, and its exits.
function NodeBody({ node, intro }) {
  const n = STORY[node]
  if (!n) return <div className="dbg-hc-miss">unknown scene: {node}</div>
  const anchor = PLACE_OF[node]
  const placeName = PLACE_META[anchor]?.name
  const mold = moldOf(node)
  const lore = n.end && ENDING_LORE[node] ? LORE_BY_ID[ENDING_LORE[node]] : null
  return (
    <>
      <div className="dbg-nodecard-head">
        <code>{node}</code>
        {n.end && <span className={'dbg-tag ' + n.end}>{n.end} ending</span>}
        {n.title && <b>{n.title}</b>}
        {lore && <span className="dbg-nodecard-lore">📖 {lore.title}</span>}
      </div>
      {intro && <p className="dbg-nodecard-intro">{intro}</p>}
      {(placeName || mold) && (
        <div className="dbg-nodecard-mold">
          {placeName && <div className="dbg-nodecard-place">📍 {placeName}</div>}
          {mold && (
            <div className="dbg-nodecard-moldtext">
              <b>{mold.emoji} mold — {mold.place}</b> <span className="dbg-nodecard-moldtale">({mold.taleTitle})</span>
              <span className="dbg-nodecard-moldbody">{mold.mold}</span>
            </div>
          )}
        </div>
      )}
      <div className="dbg-lines">
        {n.text.map(lineOf).map((line, i) => (
          <div className={'dbg-line' + (line.quote ? ' dbg-quote' : '')} key={i}>
            <span className="dbg-al">{albanianOf(line)}</span>
            <span className="dbg-en">{englishOf(line)}</span>
          </div>
        ))}
      </div>
      {n.blurb && <p className="dbg-blurb">{n.blurb}</p>}
      {n.options?.some((o) => !o.confuser) && (
        <div className="dbg-nodecard-exits">
          {n.options.filter((o) => !o.confuser).map((o, i) => (
            <div className="dbg-nodecard-exit" key={i}>
              <span className="dbg-opt-al">{albanianOf(o.text)}</span>
              <span className="dbg-opt-en">{englishOf(o.text)}</span>
              {o.to && <span className="dbg-nodecard-to">→ {o.to}</span>}
            </div>
          ))}
        </div>
      )}
    </>
  )
}
// A folklore entry: title, category, the 3-axis rank, and its summary.
function LoreBody({ id }) {
  const f = FOLKLORE_BY_ID[id]
  if (!f) return <div className="dbg-hc-miss">unknown lore: {id}</div>
  const nSrc = mergedSources(f).length
  return (
    <>
      <div className="dbg-nodecard-head"><b>{f.title}</b><span className="dbg-tag node">{f.category}</span></div>
      <RankBar id={id} />
      <p className="dbg-hc-summary">{f.summary}</p>
      <div className="dbg-hc-foot">📖 in the Folklore library{nSrc ? ` · ${nSrc} source${nSrc > 1 ? 's' : ''}` : ''}</div>
    </>
  )
}
// A character: glyph, kind, role, backstory (canon), and where they live.
function NpcBody({ id }) {
  const n = NPC_REGISTRY[id]
  if (!n) return <div className="dbg-hc-miss">unknown NPC: {id}</div>
  const loc = n.location
  const where = loc.status === 'placed' ? '🗺 ' + loc.node
    : loc.status === 'walking' ? '🚶 ' + (loc.route || []).join(' → ')
    : '📋 ' + loc.plan
  return (
    <>
      <div className="dbg-nodecard-head">
        <b>{n.glyph} {n.name}</b>
        <span className={'dbg-tag ' + (NPC_KIND_TAG[n.kind] || 'node')}>{n.kind}</span>
      </div>
      <p className="dbg-nodecard-intro">{n.role}</p>
      <p className="dbg-hc-summary">{n.backstory}</p>
      <div className="dbg-hc-foot">📍 {where}</div>
    </>
  )
}
// A tale: title, line-coverage, source, and its shape (beats/cast/places).
function TaleBody({ id }) {
  const t = TALES[id]
  if (!t) return <div className="dbg-hc-miss">unknown tale: {id}</div>
  const cov = coverageOf(t)
  const refs = t.references || []
  return (
    <>
      <div className="dbg-nodecard-head">
        <b>🎬 {t.title}</b>
        <span className={'dbg-tag ' + (cov.ok ? 'good' : 'bad')}>{cov.covered}/{cov.total} lines</span>
      </div>
      <p className="dbg-hc-src">{t.source}</p>
      <div className="dbg-hc-foot">{t.beats.length} beats · {t.cast.length} cast · {t.places.length} places · {refs.length} linked reference{refs.length === 1 ? '' : 's'} · click for the timeline</div>
    </>
  )
}
// A source work: title, provenance line, and its summary.
function SourceBody({ id }) {
  const c = CORPUS_BY_ID[id]
  if (!c) return <div className="dbg-hc-miss">unknown source: {id}</div>
  return (
    <>
      <div className="dbg-nodecard-head">
        <b>{c.title}</b>
        <span className="dbg-tag start">{c.local ? '⬇ local' : '🔗 link'}</span>
      </div>
      <p className="dbg-hc-src">{c.author} · {c.year} · {LANG_LABEL[c.lang] || c.lang} · <i>{c.license}</i></p>
      <p className="dbg-hc-summary">{c.summary}</p>
    </>
  )
}
// A real, datable event: title, era, place, rank, and its summary.
function HistoryBody({ id }) {
  const h = HISTORY_BY_ID[id]
  if (!h) return <div className="dbg-hc-miss">unknown event: {id}</div>
  return (
    <>
      <div className="dbg-nodecard-head"><b>{h.title}</b><span className="dbg-tag secret">📜 {h.era}</span></div>
      <div className="dbg-hc-src">📍 {h.place}</div>
      <RankBar id={id} />
      <p className="dbg-hc-summary">{h.summary}</p>
    </>
  )
}
// A map place (tale anchor): the mold and every note about the shared spot.
function AnchorBody({ pl }) {
  const a = pl.anchor
  return (
    <>
      <div className="dbg-nodecard-head"><b>{pl.emoji} {pl.name}</b><span className="dbg-tag node">{a.status}</span></div>
      <div className="dbg-nodecard-mold">
        <div className="dbg-nodecard-moldtext"><b>🧱 mold</b><span className="dbg-nodecard-moldbody">{a.mold}</span></div>
      </div>
      {a.mirror && <p className="dbg-hc-line"><b>mirrors:</b> {a.mirror}</p>}
      {a.proposal && <p className="dbg-hc-line"><b>to build:</b> {a.proposal}</p>}
      {a.conflicts && <p className="dbg-hc-line"><b>rejected:</b> {a.conflicts}</p>}
      {a.sharedWith?.length > 0 && <p className="dbg-hc-line"><b>shares the spot with:</b> {a.sharedWith.join(', ')}</p>}
      {a.node && <div className="dbg-hc-foot">🗺 {a.node}{a.status === 'existing' ? ' · click to open on the World map' : a.status === 'proposed' ? ' · jumps to the nearest built spot' : ''}</div>}
    </>
  )
}
// A short titled explanation — for kind/status/role tags with no entity behind them.
function InfoBody({ title, text }) {
  return (<><div className="dbg-nodecard-head"><b>{title}</b></div><p className="dbg-hc-summary">{text}</p></>)
}
function KindBody({ kind }) {
  const [label, text] = KIND_INFO[kind] || [kind, '']
  return <InfoBody title={label} text={text} />
}

// A world-jump chip (the 🗺 blue chips) that reveals the scene card on hover.
// Same click behaviour as before (goWorld); the card just enriches the old title.
function NodeChip({ node, label, goWorld, intro, title, className = 'dbg-beat-world', width = 400 }) {
  return (
    <Badge tag="button" className={className} title={title} width={width} onClick={() => goWorld(node)}
           renderBody={STORY[node] ? () => <NodeBody node={node} intro={intro} /> : undefined}>
      {label ?? node}
    </Badge>
  )
}


function NodeDetail({ id, onPick, goLore }) {
  const n = STORY[id]
  const lore = n.end && ENDING_LORE[id] ? LORE_BY_ID[ENDING_LORE[id]] : null
  return (
    <div className="dbg-detail">
      <div className="dbg-detail-head">
        <code>{id}</code>
        {n.end && <Badge tag="span" className={'dbg-tag ' + n.end} width={260}
                         renderBody={() => <KindBody kind={n.end} />}>{n.end} ending</Badge>}
        {n.title && <b>{n.title}</b>}
        {lore && (
          <Badge className={`dbg-tag dbg-tag-btn ${HISTORY_BY_ID[lore.id] ? 'secret' : 'node'}`} onClick={() => goLore(lore.id)}
                 renderBody={() => HISTORY_BY_ID[lore.id] ? <HistoryBody id={lore.id} /> : <LoreBody id={lore.id} />}>
            📖 {lore.title} →
          </Badge>
        )}
      </div>
      <div className="dbg-lines">
        {n.text.map(lineOf).map((line, i) => (
          <div className={'dbg-line' + (line.quote ? ' dbg-quote' : '')} key={i}>
            <span className="dbg-al">{albanianOf(line)}</span>
            <span className="dbg-en">{englishOf(line)}</span>
            {line.quote && <span className="dbg-quote-src">📜 {line.quote}</span>}
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
                    <Badge className="dbg-jump" onClick={() => onPick(o.to)}
                           renderBody={() => <NodeBody node={o.to} />}>
                      → {o.to}{tgt.end ? ` (${tgt.end})` : ''}
                    </Badge>
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
                <Badge tag="code" renderBody={() => <NodeBody node={h} />}>{h}</Badge>
                {h === current && <Badge tag="span" className="dbg-tag start" width={260}
                                         renderBody={() => <InfoBody title="you are here" text="The scene the live game is currently on — where the player would resume." />}>you are here</Badge>}
                <span className="dbg-hub-line">{oneLiner(h)}</span>
              </div>
              <div className="dbg-exits">
                {exits.map((o, i) => {
                  const t = STORY[o.to]
                  const kind = t.end || (g.adj[o.to].length >= 4 ? 'hub' : 'node')
                  return (
                    <button className="dbg-exit" key={i} onClick={() => goGraph(o.to)}>
                      <span className="dbg-exit-al">{albanianOf(o.text)}</span>
                      <Badge tag="span" className={'dbg-tag ' + kind} renderBody={() => <NodeBody node={o.to} />}>{o.to}</Badge>
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
  const taleRefs = (TALES[entry.id]?.references || []).map((ref) => ({
    label: ref.citation, url: ref.url, role: ref.role, note: ref.note,
  }))
  for (const s of [...(entry.sources || []), ...(EXTRA_SOURCES[entry.id] || []), ...taleRefs]) {
    if (s && s.url && !seen.has(s.url)) { seen.add(s.url); out.push(s) }
  }
  return out
}

const REFERENCE_ROLE_LABEL = {
  'selected-witness': '🎯 selected witness',
  'source-text': '📜 source text',
  facsimile: '🖼 facsimile',
  translation: '🌐 translation',
  catalog: '🗂 catalogue',
  scholarship: '🎓 scholarship',
  variant: '🔀 variant',
  analogue: '≈ analogue',
  context: '🧭 context',
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

const sourceMark = (tale) => {
  const status = tale.albanian?.status
  if (status === 'located') return '◒ '
  if (status !== 'missing') return '● '
  return SELECTED_WITNESS_REVIEWS[tale.id]?.disposition === SOURCE_REVIEW_DISPOSITIONS.VERIFIED_SELECTED
    ? '◐ '
    : '○ '
}

// ===========================================================================
// BEATS — a source folktale as a beat-by-beat timeline (data: taleBeats.js).
// Every beat shows the full world board: which location everyone is in and
// what they are doing there, with ↷ arrows on whoever moved since last beat.
// Grid mode is the same data pivoted: one row per character/item, one column
// per beat, colored by location — the whole tale's choreography at a glance.
// ===========================================================================
// One chip per tale place, honest about its anchor's status: existing spots
// link 🗺 to the World map; proposed ones (📋, amber) jump to the NEAREST
// existing spot and carry the build-plan in the tooltip; offstage ones (⬚)
// are unlinked by design. The tooltip always leads with the MOLD — the shared
// truth every story on this spot must satisfy (the sharing rule).
function AnchorChip({ pl, goWorld, full }) {
  const a = pl.anchor
  const label = full ? `${pl.emoji} ${pl.name} → ` : ''
  const body = () => <AnchorBody pl={pl} />
  if (a.status === 'offstage') {
    return <Badge tag="span" className="dbg-beat-world offstage" width={360} renderBody={body}>{label}⬚ offstage</Badge>
  }
  if (a.status === 'proposed') {
    return <Badge className="dbg-beat-world proposed" width={360} onClick={() => goWorld(a.node)} renderBody={body}>{label}📋 planned · near {a.node}</Badge>
  }
  return <Badge className="dbg-beat-world" width={360} onClick={() => goWorld(a.node)} renderBody={body}>{label}🗺 {a.node}</Badge>
}

// Every item any option can grant — so a `requires` on a grantable item (e.g.
// the maiden companion) is enforced by the path search. Embodiment is tracked
// separately because it is a persistent route gate, while other virtual/time
// requirements (a phase, from:X, npc:X) are assumed satisfiable. Computed once
// over STORY.
const GRANTABLE_ITEMS = (() => {
  const s = new Set()
  for (const n of Object.values(STORY)) for (const o of (n.options || [])) {
    const g = o.grant
    if (g) (Array.isArray(g) ? g : [g]).forEach((x) => s.add(x))
  }
  return s
})()
// Shortest PLAYABLE path between two story nodes over the option edges: BFS over
// (node, held-items, embodiment) so persistent route gates are honoured (you
// cannot open the maiden's door without rescuing her or claim Maro's gold before
// living her mill-night). Powers the 🎭 playthrough view. null if unreachable.
function shortestStoryPath(from, to) {
  if (!STORY[from] || !STORY[to]) return null
  const key = (n, held, embodying) => n + '|' + [...held].sort().join(',') + '|' + (embodying || '')
  const start = { n: from, held: new Set(), embodying: null, path: [from] }
  const q = [start], seen = new Set([key(from, start.held, start.embodying)])
  while (q.length) {
    const cur = q.shift()
    if (cur.n === to) return cur.path
    for (const o of (STORY[cur.n]?.options || [])) {
      if (!o.to || !STORY[o.to]) continue
      const req = o.requires ? (Array.isArray(o.requires) ? o.requires : [o.requires]) : []
      if (req.some((r) => r === 'embodying'
        ? !cur.embodying
        : r.startsWith('embodying:')
          ? cur.embodying !== r.slice('embodying:'.length)
          : GRANTABLE_ITEMS.has(r) && !cur.held.has(r))) continue
      const barred = o.unless ? (Array.isArray(o.unless) ? o.unless : [o.unless]) : []
      if (barred.some((r) => r === 'embodying'
        ? Boolean(cur.embodying)
        : r.startsWith('embodying:') && cur.embodying === r.slice('embodying:'.length))) continue
      const held = new Set(cur.held)
      const g = o.grant
      if (g) (Array.isArray(g) ? g : [g]).forEach((x) => held.add(x))
      const embodying = o.become || cur.embodying
      const k = key(o.to, held, embodying)
      if (!seen.has(k)) { seen.add(k); q.push({ n: o.to, held, embodying, path: [...cur.path, o.to] }) }
    }
  }
  return null
}
// A story node's text as readable line strings (each token carries .en/.al;
// lineOf unwraps conditional wrappers). key = 'en' | 'al'.
function nodeProse(nodeId, key) {
  return (STORY[nodeId]?.text || []).map((entry) =>
    lineOf(entry).map((t) => t[key] ?? '').join(' ')
      .replace(/\s+([.,!?:;»])/g, '$1').replace(/«\s+/g, '«').replace(/\s+/g, ' ').trim()
  ).filter(Boolean)
}

function Beats({ focus, goLore, goWorld, goNpc }) {
  const taleIds = Object.keys(TALES)
  const [taleId, setTaleId] = useState(focus && TALES[focus] ? focus : taleIds[0])
  const [mode, setMode] = useState('beats')
  useEffect(() => { if (focus && TALES[focus]) setTaleId(focus) }, [focus])
  // group the tales by their folklore category for the picker
  const catOf = useMemo(() => Object.fromEntries(FOLKLORE.map((f) => [f.id, f.category])), [])
  const groups = useMemo(() => {
    const g = {}
    for (const id of taleIds) (g[catOf[id] || 'Tale'] ||= []).push(id)
    for (const k of Object.keys(g)) g[k].sort((a, b) => TALES[a].title.localeCompare(TALES[b].title))
    return g
  }, [taleIds, catOf])
  const tale = TALES[taleId]
  const witnessReview = SELECTED_WITNESS_REVIEWS[taleId]
  const witnessHasLocalEvidence = witnessReview?.evidence?.some((item) => item.startsWith('docs/'))
  const sourceStatus = tale.albanian?.status || 'transcribed'
  const hasLinkedOriginal = sourceStatus === 'transcribed' && tale.albanian?.local
  const references = tale.references || []
  const frames = useMemo(() => framesOf(tale), [tale])
  const cov = useMemo(() => coverageOf(tale), [tale])
  const placeOf = useMemo(() => Object.fromEntries(tale.places.map((p) => [p.id, p])), [tale])
  const castOf = useMemo(() => Object.fromEntries(tale.cast.map((c) => [c.id, c])), [tale])
  const itemOf = useMemo(() => Object.fromEntries(tale.items.map((it) => [it.id, it])), [tale])
  // an item can sit in a place OR be carried by a cast member — resolve both
  const itemSpot = (frame, it) => {
    const pos = frame.items[it.id]
    if (!pos) return null
    const carrier = castOf[pos.at]
    const place = carrier ? placeOf[frame.cast[pos.at]?.at] : placeOf[pos.at]
    return { ...pos, carrier, place }
  }

  // THE GAME PROJECTION — where our world enters this tale and who the player is
  // inside it (data: tale.play, derived by playOf). null for tales not yet mapped.
  const play = useMemo(() => playOf(tale, frames), [tale, frames])
  const avatarName = play?.avatar ? castOf[play.avatar]?.name : null
  const avatarNpc = play?.avatar ? NPC_OF_CAST[taleId]?.[play.avatar] : null
  // the "🎮 you are here" pill that rides the avatar's line/row on played beats
  const youPill = play && (play.stance === 'embodied' ? '🎮 you'
    : play.stance === 'companion' ? '🎮 with you' : '👁 you')
  const entryTitle = play ? frames[play.entryIndex]?.beat.title : null
  // grid column class: a blue seam on the entry column, muted for prologue columns
  const colClass = (i) => !play ? ''
    : (i === play.entryIndex && play.entryIndex > 0) ? 'entry-col'
    : i < play.entryIndex ? 'pro' : ''

  return (
    <div className="dbg-lib">
      <div className="dbg-beats-head">
        {taleIds.length > 1 && (
          <select className="dbg-beats-picker" value={taleId} onChange={(e) => setTaleId(e.target.value)}
                  title={`${taleIds.length} folktales — pick one`}>
            {Object.entries(groups).map(([cat, ids]) => (
              <optgroup key={cat} label={`${cat} (${ids.length})`}>
                {ids.map((id) => (
                  <option key={id} value={id}>
                    {sourceMark(TALES[id])}{TALES[id].title}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        )}
        <b>🎬 {tale.title}</b>
        {FOLKLORE.some((f) => f.id === taleId) && (
          <Badge className="dbg-tag dbg-tag-btn node" onClick={() => goLore(taleId)}
                 renderBody={() => <LoreBody id={taleId} />}>📖 lore →</Badge>
        )}
        <Badge tag="span" className={'dbg-tag ' + (cov.ok ? 'good' : 'bad')} width={300}
               renderBody={() => <InfoBody title={cov.ok ? 'line coverage complete' : 'line coverage BROKEN'}
                 text={cov.ok
                   ? `All ${cov.total} sentences of the original are each assigned to exactly one beat (checked by scripts/beatscoverage.mjs).`
                   : ['missing: ' + (cov.missing.join(', ') || '—'), 'duplicated: ' + (cov.dupes.join(', ') || '—'),
                      cov.unknown.length ? 'out of range: ' + cov.unknown.join(', ') : '', cov.bad.join('; ')].filter(Boolean).join(' · ')} />}>
          {cov.ok ? `📜 all ${cov.total} original lines covered` : `📜 line coverage BROKEN (${cov.covered}/${cov.total})`}
        </Badge>
        <span className="dbg-beats-src">{tale.source}</span>
        {references.length > 0 && (
          <div className="dbg-sources dbg-tale-refs" aria-label={`${references.length} tale references`}>
            {references.map((ref, i) => (
              <a key={`${ref.url}-${i}`} href={ref.url} target="_blank" rel="noreferrer"
                 title={ref.note || ref.citation}>
                {REFERENCE_ROLE_LABEL[ref.role] || '🔗 source'} · {ref.citation}
              </a>
            ))}
          </div>
        )}
        {tale.origin && (
          <Badge tag="span" className="dbg-tag secret" width={300}
                 renderBody={() => <InfoBody title={`🧭 origin — ${tale.origin.region}`}
                   text={`Collected by ${tale.origin.collector}, published ${tale.origin.published}. An anchor placing this tale should prefer a spot that mirrors this region.`} />}>
            🧭 {tale.origin.region} · {tale.origin.collector} · {tale.origin.published}
          </Badge>
        )}
        {hasLinkedOriginal && (
          <Badge tag="a" className="dbg-tag dbg-tag-btn good" href={REPO_BLOB + tale.albanian.local} target="_blank" rel="noreferrer"
                 renderBody={() => <InfoBody title={`🇦🇱 «${tale.albanian.title}»`}
                   text={`${tale.albanian.source}. Full raw text in ${tale.albanian.local}; each beat line below carries an aligned source-language field. The strict audit distinguishes literal containment, apparatus-equivalent text, and disclosed hash-bound editorial collation records. Click to open the source ⬇`} />}>
            🇦🇱 «{tale.albanian.title}» — original ⬇
          </Badge>
        )}
        {sourceStatus === 'located' && (
          <Badge tag="span" className="dbg-tag secret" width={360}
                 renderBody={() => <InfoBody title="◒ primary source located — alignment pending"
                   text={tale.albanian.why} />}>
            ◒ source located · not yet aligned
          </Badge>
        )}
        {sourceStatus === 'missing' && witnessReview && (
          <Badge tag="span" className={`dbg-tag ${witnessReview.disposition === SOURCE_REVIEW_DISPOSITIONS.VERIFIED_SELECTED && witnessHasLocalEvidence ? 'good' : 'secret'}`} width={420}
                 renderBody={() => <InfoBody
                   title={witnessReview.disposition === SOURCE_REVIEW_DISPOSITIONS.VERIFIED_SELECTED
                     ? witnessHasLocalEvidence
                       ? '◐ selected witness attested · local evidence hash-bound'
                       : '◐ selected witness attested · external evidence not frozen'
                     : '○ declared synthesis documented'}
                   text={`${witnessReview.scope} ${witnessHasLocalEvidence
                     ? 'The internal attestation is bound to the locally stocked witness bytes and the current beat record; this does not establish external expert review.'
                     : 'This is an internal, hash-bound attestation to linked evidence, not a locally reproducible byte comparison or external expert review.'} Evidence: ${witnessReview.evidence.join(' · ')}`} />}>
            {witnessReview.disposition === SOURCE_REVIEW_DISPOSITIONS.VERIFIED_SELECTED
              ? witnessHasLocalEvidence
                ? '◐ selected witness attested · local evidence bound'
                : '◐ selected witness attested · external-only evidence'
              : '○ documented synthesis · no single original'}
          </Badge>
        )}
        {tale.projection?.status === 'source-only' && (
          <Badge tag="span" className="dbg-tag node" width={420}
                 renderBody={() => <InfoBody title="📚 exact timeline kept source-only" text={tale.projection.reason} />}>
            📚 source-only · separate from gameplay
          </Badge>
        )}
        {play && (
          <Badge tag="span" className="dbg-tag start" width={300}
                 renderBody={() => <InfoBody title={play.entryIndex > 0 ? `▶ enters at beat ${play.entryIndex + 1}` : '▶ played from the start'}
                   text={play.entryIndex > 0
                     ? `The playable arc begins at beat ${play.entryIndex + 1} · ${entryTitle}. Beats 1–${play.entryIndex} are prologue you learn as lore, never play.`
                     : 'Played from the very first beat — this tale has no prologue.'} />}>
            ▶ {play.entryIndex > 0 ? `enters at beat ${play.entryIndex + 1}` : 'played from the start'}
          </Badge>
        )}
        {play && (avatarNpc ? (
          <Badge className="dbg-tag hub dbg-tag-btn" onClick={() => goNpc(avatarNpc)}
                 renderBody={() => <NpcBody id={avatarNpc} />}>
            🎮 {play.stance === 'embodied' ? 'you are' : 'you ride with'} {avatarName} →
          </Badge>
        ) : (
          <Badge tag="span" className="dbg-tag hub" width={300}
                 renderBody={() => <InfoBody title={play.stance === 'witness' ? '👁 you only watch' : '🎮 you'} text={play.role} />}>
            {play.stance === 'witness' ? '👁 you only watch' : '🎮 you'}
          </Badge>
        ))}
      </div>
      {tale.discrepancies?.length > 0 && (
        <div className="dbg-beat-disc">
          <b>⚖️ translation vs original — open calls for the rewrite:</b>
          <ul>
            {tale.discrepancies.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
        </div>
      )}
      <p className="dbg-note">
        The original tale as <b>{tale.beats.length} beats</b> over a persistent world — every beat records where each
        of the <b>{tale.cast.length} characters</b> is and what they are doing there (↷ = moved since the last beat).
        Under each beat, <b>every sentence of the original</b> it covers, paraphrased, with its ¶paragraph.sentence ref.
      </p>
      <div className="dbg-beat-anchors">
        <span className="dbg-lore-ends-label">where in our world:</span>
        {tale.places.map((pl) => <AnchorChip key={pl.id} pl={pl} goWorld={goWorld} full />)}
      </div>
      {play && (
        <div className={'dbg-beat-role ' + play.stance}>
          <div className="dbg-beat-role-head">
            <span className="dbg-lore-ends-label">how you play it</span>
            <Badge tag="span" width={300}
                   className={'dbg-tag ' + (play.stance === 'embodied' ? 'hub' : play.stance === 'companion' ? 'secret' : 'node')}
                   renderBody={() => <InfoBody title={STANCE_INFO[play.stance][0]} text={STANCE_INFO[play.stance][1]} />}>
              {play.stance === 'embodied' ? '🎮 embodied' : play.stance === 'companion' ? '🧍 companion' : '👁 witness'}
            </Badge>
            {avatarName && (avatarNpc ? (
              <Badge className="dbg-beat-npc" onClick={() => goNpc(avatarNpc)} renderBody={() => <NpcBody id={avatarNpc} />}>
                {play.stance === 'embodied' ? 'you are → ' : 'you ride with → '}{avatarName}
              </Badge>
            ) : (
              <b>{play.stance === 'embodied' ? 'you are ' : 'you ride with '}{avatarName}</b>
            ))}
          </div>
          <p className="dbg-beat-role-prose">{play.role}</p>
          <p className="dbg-beat-role-entry">
            ▶ our world enters at <b>beat {play.entryIndex + 1} · {entryTitle}</b>
            {play.entryIndex > 0
              ? ` — beats 1–${play.entryIndex} are prologue you learn as lore, never play.`
              : ' — no prologue; you play the whole tale.'}
          </p>
        </div>
      )}
      {play?.divergences?.length > 0 && (
        <div className="dbg-beat-diverge">
          <b>🎮 how the game retells it — where it departs from the folktale (not translation, but adaptation):</b>
          <ul>
            {play.divergences.map((d, i) => {
              const bi = d.beat ? frames.findIndex((f) => f.beat.id === d.beat) : -1
              return (
                <li key={i}>
                  {bi >= 0 && <span className="dbg-beat-diverge-beat" title={frames[bi].beat.title}>beat {bi + 1}</span>}
                  {d.note}
                </li>
              )
            })}
          </ul>
        </div>
      )}
      <div className="dbg-sortrow">
        <span className="dbg-sortlbl">view</span>
        <button className={'dbg-sortbtn' + (mode === 'beats' ? ' active' : '')} onClick={() => setMode('beats')}>📋 beats</button>
        <button className={'dbg-sortbtn' + (mode === 'grid' ? ' active' : '')} onClick={() => setMode('grid')}>🗓 who-is-where grid</button>
        {play?.scenes && <button className={'dbg-sortbtn' + (mode === 'play' ? ' active' : '')} onClick={() => setMode('play')}>🎭 playthrough ↔ beats</button>}
      </div>

      {mode === 'beats' && frames.map((fr, i) => {
        const prologue = play && i < play.entryIndex
        const epilogue = play && i > play.finaleIndex
        const isEntry = play && i === play.entryIndex && play.entryIndex > 0
        return (
        <Fragment key={fr.beat.id}>
          {isEntry && (
            <div className="dbg-beat-enter" title={play.role}>
              <span className="dbg-beat-enter-lbl">▶ the game starts here</span>
              {' — '}{play.enter || `you ${play.stance === 'embodied' ? 'take up ' + avatarName
                : play.stance === 'companion' ? 'fall in with ' + avatarName : 'begin to watch'}`}
            </div>
          )}
          <div className={'dbg-beat' + (prologue || epilogue ? ' prologue' : '')}>
          <div className="dbg-beat-head">
            <span className={'dbg-beat-num' + (prologue || epilogue ? ' muted' : '') + (play && i === play.entryIndex ? ' entry' : '')}>{i + 1}</span>
            <b>{fr.beat.title}</b>
            {prologue && <Badge tag="span" className="dbg-tag node" width={280}
                                renderBody={() => <InfoBody title="prologue" text="Backstory the player learns as lore — never played. The 🔎 chips below show where it surfaces in-world." />}>prologue</Badge>}
            {epilogue && <Badge tag="span" className="dbg-tag node" width={280}
                                renderBody={() => <InfoBody title="epilogue" text="The tale finishes as lore after the played arc — the player doesn't act it out." />}>epilogue</Badge>}
          </div>
          <p className="dbg-beat-note">{fr.beat.note}</p>
          {play?.learn?.[fr.beat.id]?.length > 0 && (
            <div className="dbg-beat-learn">
              <span className="dbg-beat-learn-lbl">🔎 {prologue ? 'discovered in-world' : 'also told in-world'}:</span>
              {play.learn[fr.beat.id].map(([node, label]) => (
                <NodeChip key={node} node={node} label={`🗺 ${label || node}`} goWorld={goWorld}
                          title={`where the player learns this by playing — jump to «${node}» on the 🗺 World map`}
                          intro={label ? `🔎 the player learns this here — ${label}` : `🔎 the player learns this at «${node}»`} />
              ))}
            </div>
          )}
          {play?.learn && prologue && !play.learn[fr.beat.id] && (
            <div className="dbg-beat-learn">
              <span className="dbg-beat-learn-lbl gap" title="no played scene reveals this backstory — a candidate to write into the world">
                ⚠ not told in-world yet
              </span>
            </div>
          )}
          {fr.beat.lines?.length > 0 && (
            <ul className="dbg-beat-lines">
              {fr.beat.lines.map(([ref, txt, al]) => (
                <li key={ref}>
                  <i>¶{ref}</i>
                  {al && <span className="dbg-beat-line-al">{al}</span>}
                  <span className="dbg-beat-line-en">{txt}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="dbg-beat-board">
            {tale.places.map((pl) => {
              const here = Object.entries(fr.cast).filter(([, pos]) => pos.at === pl.id)
              const itemsHere = tale.items.map((it) => ({ it, spot: itemSpot(fr, it) }))
                .filter(({ spot }) => spot && spot.place?.id === pl.id)
              if (!here.length && !itemsHere.length) return null
              return (
                <div className="dbg-beat-place" key={pl.id}>
                  <span className="dbg-beat-place-name" title={pl.note}>
                    {pl.emoji} {pl.name}
                    <AnchorChip pl={pl} goWorld={goWorld} />
                  </span>
                  <ul>
                    {here.map(([cid, pos]) => (
                      <li key={cid} className={play && !prologue && !epilogue && cid === play.avatar ? 'you-here' : ''}>
                        {NPC_OF_CAST[taleId]?.[cid] ? (
                          <Badge className="dbg-beat-npc" onClick={() => goNpc(NPC_OF_CAST[taleId][cid])}
                                 renderBody={() => <NpcBody id={NPC_OF_CAST[taleId][cid]} />}>{castOf[cid].name}</Badge>
                        ) : (
                          <b title={castOf[cid].note}>{castOf[cid].name}</b>
                        )}
                        {play && !prologue && !epilogue && cid === play.avatar && (
                          <span className="dbg-beat-you" title={play.role}>{youPill}</span>
                        )}
                        {fr.from[cid] && (
                          <span className="dbg-beat-moved" title={'was at ' + (placeOf[fr.from[cid]]?.name || fr.from[cid])}>
                            ↷ {placeOf[fr.from[cid]]?.emoji}
                          </span>
                        )}
                        <span className="dbg-beat-doing"> — {pos.doing}</span>
                      </li>
                    ))}
                    {itemsHere.map(({ it, spot }) => (
                      <li key={it.id} className="dbg-beat-item">
                        <b title={it.note}>{it.emoji} {it.name}</b>
                        <span className="dbg-beat-doing"> — {spot.carrier ? `carried by ${spot.carrier.name} · ` : ''}{spot.doing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
          </div>
        </Fragment>
        )
      })}

      {mode === 'grid' && (
        <div className="dbg-beat-gridwrap">
          <table className="dbg-beat-grid">
            <thead>
              <tr>
                <th />
                {frames.map((fr, i) => (
                  <th key={fr.beat.id} className={colClass(i)}
                      title={fr.beat.title + (play && i === play.entryIndex && play.entryIndex > 0 ? ' — the game starts here' : play && i < play.entryIndex ? ' — prologue (lore, not played)' : '')}>
                    {play && i === play.entryIndex && play.entryIndex > 0 ? '▶' : ''}{i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {play && play.stance === 'companion' && play.avatar && (
                <tr className="you-row">
                  <th title={play.role}>🎮 you<span className="you-row-sub"> · with {avatarName}</span></th>
                  {frames.map((fr, i) => {
                    const pos = i >= play.entryIndex ? fr.cast[play.avatar] : null
                    const pl = pos && placeOf[pos.at]
                    return <td key={fr.beat.id} className={[pl ? '' : 'gone', colClass(i)].filter(Boolean).join(' ')}
                               title={pl ? `${fr.beat.title} · you ride along with ${avatarName} at ${pl.name}` : ''}>{pl?.emoji || ''}</td>
                  })}
                </tr>
              )}
              {tale.cast.map((c) => {
                const isYou = play && play.stance === 'embodied' && c.id === play.avatar
                return (
                <tr key={c.id} className={isYou ? 'you-row' : ''}>
                  <th title={c.note}>
                    {isYou && <span className="you-badge">🎮 </span>}
                    {NPC_OF_CAST[taleId]?.[c.id]
                      ? <Badge className="dbg-beat-npc" onClick={() => goNpc(NPC_OF_CAST[taleId][c.id])}
                               renderBody={() => <NpcBody id={NPC_OF_CAST[taleId][c.id]} />}>{c.name}</Badge>
                      : c.name}
                  </th>
                  {frames.map((fr, i) => {
                    const pos = fr.cast[c.id]
                    if (!pos) return <td key={fr.beat.id} className={['gone', colClass(i)].filter(Boolean).join(' ')} />
                    const pl = placeOf[pos.at]
                    return (
                      <td key={fr.beat.id} className={[fr.from[c.id] ? 'moved' : '', colClass(i)].filter(Boolean).join(' ')}
                          title={`${fr.beat.title} · ${pl?.name} — ${pos.doing}`}>
                        {pl?.emoji}
                      </td>
                    )
                  })}
                </tr>
                )
              })}
              {tale.items.map((it) => (
                <tr key={it.id} className="dbg-beat-item">
                  <th title={it.note}>{it.emoji} {it.name}</th>
                  {frames.map((fr, i) => {
                    const spot = itemSpot(fr, it)
                    if (!spot) return <td key={fr.beat.id} className={['gone', colClass(i)].filter(Boolean).join(' ')} />
                    return (
                      <td key={fr.beat.id} className={colClass(i)}
                          title={`${fr.beat.title} · ${spot.carrier ? 'carried by ' + spot.carrier.name + ' · ' : ''}${spot.place?.name || ''} — ${spot.doing}`}>
                        {spot.carrier ? '🫱' : spot.place?.emoji}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="dbg-legend">
            {tale.places.map((pl) => <AnchorChip key={pl.id} pl={pl} goWorld={goWorld} full />)}
            <span>🫱 carried</span>
            {play && (
              <span className="dbg-legend-you">🎮 you{avatarName ? (play.stance === 'embodied' ? ' = ' + avatarName : ' ride with ' + avatarName) : ''}</span>
            )}
            {play && play.entryIndex > 0 && <span className="dbg-legend-entry">▶ played from here · faint = prologue</span>}
          </div>
        </div>
      )}

      {mode === 'play' && play?.scenes && (() => {
        const scenes = play.scenes
        const fromNode = play.from || START_NODE
        const endNode = play.ending || Object.keys(ENDING_LORE).find((n) => ENDING_LORE[n] === taleId && STORY[n]?.end === 'good')
        const path = endNode ? shortestStoryPath(fromNode, endNode) : null
        const pathSet = new Set(path || [])
        const pathIdx = Object.fromEntries((path || []).map((n, i) => [n, i]))
        const nodesOfBeat = (beatId) => Object.entries(scenes)
          .filter(([, beats]) => (Array.isArray(beats) ? beats : [beats]).includes(beatId))
          .map(([n]) => n)
        const onPathOf = (beatId) => nodesOfBeat(beatId).filter((n) => pathSet.has(n)).sort((a, b) => pathIdx[a] - pathIdx[b])
        // beats that HAVE a game scene but whose scene sits off the shortest route
        const skipped = frames.filter((fr) => nodesOfBeat(fr.beat.id).length && !onPathOf(fr.beat.id).length)
        return (
          <div className="dbg-play">
            <p className="dbg-note">
              The <b>shortest route</b> through the game to this tale&rsquo;s good ending, laid beside the folktale it retells —
              read the played story (left) against the source beats (right).{' '}
              {path
                ? <><b>{path.length} scenes</b> from <button className="dbg-beat-world" onClick={() => goWorld(fromNode)}>🗺 {fromNode}</button> to <button className="dbg-beat-world" onClick={() => goWorld(endNode)}>🗺 {endNode}</button>; shortest playable route (honours item and embodiment gates).{' '}
                    {skipped.length > 0 && <b className="dbg-play-skipwarn">The route SKIPS beat{skipped.length > 1 ? 's' : ''} {skipped.map((fr) => frames.indexOf(fr) + 1).join(', ')} — {skipped.map((fr) => fr.beat.title).join('; ')}.</b>}</>
                : <> no route found from {fromNode} to {endNode || '(no good ending detected)'}.</>}
            </p>
            <div className="dbg-play-grid">
              <div className="dbg-play-head game">▶ the shortest playthrough (the game)</div>
              <div className="dbg-play-head tale">📖 the folktale beat</div>
              {frames.map((fr, i) => {
                const beatNodes = nodesOfBeat(fr.beat.id)
                const onPath = onPathOf(fr.beat.id)
                const offRoute = !onPath.length
                return (
                  <Fragment key={fr.beat.id}>
                    <div className={'dbg-play-cell game' + (offRoute ? ' offroute' : '')}>
                      {onPath.length ? onPath.map((node) => (
                        <div className="dbg-play-scene" key={node}>
                          <button className="dbg-beat-world" onClick={() => goWorld(node)}>🗺 {node}{STORY[node]?.end ? ' · ending' : ''}</button>
                          <ul className="dbg-play-lines">{nodeProse(node, 'en').map((ln, j) => <li key={j}>{ln}</li>)}</ul>
                        </div>
                      )) : play.learn?.[fr.beat.id]?.length ? (
                        <div className="dbg-play-scene">
                          <span className="dbg-play-tag">discovered in-world · not on the route</span>
                          <div className="dbg-play-learn">{play.learn[fr.beat.id].map(([node, label]) => (
                            <button key={node} className="dbg-beat-world" onClick={() => goWorld(node)}>🗺 {label || node}</button>
                          ))}</div>
                        </div>
                      ) : beatNodes.length ? (
                        <div className="dbg-play-scene">
                          <span className="dbg-play-tag skip">⤼ off the shortest route — playable at</span>
                          {beatNodes.map((node) => <button key={node} className="dbg-beat-world" onClick={() => goWorld(node)}>🗺 {node}</button>)}
                          <ul className="dbg-play-lines faded">{nodeProse(beatNodes[0], 'en').map((ln, j) => <li key={j}>{ln}</li>)}</ul>
                        </div>
                      ) : <span className="dbg-play-none">prologue — not played{play.learn ? ' · not told in-world' : ''}</span>}
                    </div>
                    <div className={'dbg-play-cell tale' + (offRoute ? ' offroute' : '')}>
                      <div className="dbg-play-beat">
                        <span className={'dbg-beat-num' + (offRoute ? ' muted' : '')}>{i + 1}</span>
                        <b>{fr.beat.title}</b>
                      </div>
                      <p className="dbg-play-note">{fr.beat.note}</p>
                    </div>
                  </Fragment>
                )
              })}
            </div>
          </div>
        )
      })()}
    </div>
  )
}

// ===========================================================================
// NPCS — the character ledger (data: npcRegistry.js). Every figure in the
// world on one page: backstory (the canon any reusing story must agree with),
// where they live (placed on the map / walking a clock route / still in
// planning), which lore cards and beat-timelines they appear in. This is the
// people-side of the sharing rule: two tales may use one figure only if both
// can be talking about the entry written here.
// ===========================================================================
const NPC_STATUS = [
  { key: 'placed', label: '🗺 on the map', tip: 'lives at a fixed node' },
  { key: 'walking', label: '🚶 walking a route', tip: 'moves on a world-clock route (src/game/npcs.js)' },
  { key: 'planning', label: '📋 in planning', tip: 'not on the map yet — the plan says where they will live' },
]
const NPC_KIND_TAG = { human: 'node', mythic: 'hub', creature: 'bad', collective: 'start' }
const NPC_KIND_INFO = {
  human: 'A mortal person — a villager, lord, hero or historical figure.',
  mythic: 'A god, spirit or supernatural being from Albanian myth (a zana, an ora, the Sun…).',
  creature: 'A beast or monster — a kulshedra, a wolf, a talking animal.',
  collective: 'A group treated as one figure — the wedding-guests, the road-folk, the xhindet.',
}

function Npcs({ focus, goWorld, goLore, goBeats }) {
  const [filter, setFilter] = useState('')
  const refs = useRef({})
  const loreIds = useMemo(() => new Set(FOLKLORE.map((f) => f.id)), [])
  useEffect(() => {
    if (focus && refs.current[focus]) refs.current[focus].scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [focus])
  const q = filter.trim().toLowerCase()
  const all = Object.entries(NPC_REGISTRY).filter(([id, n]) =>
    !q || id.toLowerCase().includes(q) || n.name.toLowerCase().includes(q)
      || n.role.toLowerCase().includes(q) || n.backstory.toLowerCase().includes(q))
  const counts = Object.values(NPC_REGISTRY).reduce((a, n) => ((a[n.location.status] = (a[n.location.status] || 0) + 1), a), {})

  return (
    <div className="dbg-lib">
      <input className="dbg-filter" placeholder="filter NPCs…" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <p className="dbg-note">
        Every character in the world — <b>{Object.keys(NPC_REGISTRY).length} entries</b>
        {' '}({NPC_STATUS.map((s) => `${counts[s.key] || 0} ${s.label.slice(2).trim()}`).join(' · ')}).
        The backstory is the figure&rsquo;s CANON: a story may reuse them only if nothing it says contradicts it
        (the same sharing rule as map spots). Beat-timeline cast names link here.
      </p>
      {NPC_STATUS.map((st) => {
        const group = all.filter(([, n]) => n.location.status === st.key)
        if (!group.length) return null
        return (
          <div key={st.key} className="dbg-lib-cat">
            <h4 title={st.tip}>{st.label}</h4>
            {group.map(([id, n]) => (
              <div className={'dbg-card' + (focus === id ? ' focus' : '')} key={id} ref={(el) => { refs.current[id] = el }}>
                <div className="dbg-card-head">
                  <b>{n.glyph} {n.name}</b>
                  <Badge tag="span" width={260} className={'dbg-tag ' + (NPC_KIND_TAG[n.kind] || 'node')}
                         renderBody={() => <InfoBody title={n.kind} text={NPC_KIND_INFO[n.kind] || 'A figure in the world.'} />}>{n.kind}</Badge>
                  <span className="dbg-npc-role">{n.role}</span>
                </div>
                <p className="dbg-summary">{n.backstory}</p>
                <div className="dbg-lore-ends dbg-related">
                  <span className="dbg-lore-ends-label">where:</span>
                  {n.location.status === 'placed' && (
                    <NodeChip node={n.location.node} label={`🗺 ${n.location.node}`} goWorld={goWorld}
                              title="open on the World map" intro={`🏠 where ${n.name} lives`} />
                  )}
                  {n.location.status === 'walking' && n.location.route.map((r) => (
                    <NodeChip key={r} node={r} label={`🗺 ${r}`} goWorld={goWorld}
                              title="a stop on their clock route" intro={`🚶 ${n.name} — a stop on their clock route`} />
                  ))}
                  {n.location.status === 'planning' && (
                    <span className="dbg-npc-plan">📋 {n.location.plan}</span>
                  )}
                </div>
                {(n.folklore?.length > 0 || n.tales) && (
                  <div className="dbg-lore-ends dbg-related">
                    <span className="dbg-lore-ends-label">appears in:</span>
                    {(n.folklore || []).filter((fid) => loreIds.has(fid)).map((fid) => (
                      <Badge key={fid} className="dbg-tag dbg-tag-btn node" onClick={() => goLore(fid)}
                             renderBody={() => <LoreBody id={fid} />}>📖 {fid} →</Badge>
                    ))}
                    {Object.entries(n.tales || {}).map(([taleId, castId]) => (
                      <Badge key={taleId} className="dbg-tag dbg-tag-btn hub"
                             onClick={() => goBeats(taleId)} renderBody={() => <TaleBody id={taleId} />}>🎬 {TALES[taleId]?.title || taleId} →</Badge>
                    ))}
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

function Library({ focus, goGraph, goLore, goSource, goHistory, goBeats }) {
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
                      <a key={i} href={s.url} target="_blank" rel="noreferrer" title={s.note || s.label}>
                        {s.role ? (REFERENCE_ROLE_LABEL[s.role] || '🔗 source') : '🔗'} {s.label}
                      </a>
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
                {TALES[f.id] && (
                  <div className="dbg-lore-ends dbg-related">
                    <span className="dbg-lore-ends-label">timeline:</span>
                    <Badge className="dbg-tag dbg-tag-btn hub" onClick={() => goBeats(f.id)}
                           renderBody={() => <TaleBody id={f.id} />}>
                      🎬 beat-by-beat timeline →
                    </Badge>
                  </div>
                )}
                {bySrc[f.id]?.length > 0 && (
                  <div className="dbg-lore-ends dbg-related">
                    <span className="dbg-lore-ends-label">in sources:</span>
                    {bySrc[f.id].map((c) => (
                      <Badge className="dbg-tag dbg-tag-btn start" key={c.id}
                             onClick={() => goSource(c.id)} renderBody={() => <SourceBody id={c.id} />}>
                        📚 {c.author.split(/[&(]/)[0].trim()} {c.year} →
                      </Badge>
                    ))}
                  </div>
                )}
                {byHist[f.id]?.length > 0 && (
                  <div className="dbg-lore-ends dbg-related">
                    <span className="dbg-lore-ends-label">in history:</span>
                    {byHist[f.id].map((h) => (
                      <Badge className="dbg-tag dbg-tag-btn secret" key={h.id}
                             onClick={() => goHistory(h.id)} renderBody={() => <HistoryBody id={h.id} />}>
                        📜 {h.title.split(/[—:(]/)[0].trim()} →
                      </Badge>
                    ))}
                  </div>
                )}
                {f.related?.length > 0 && (
                  <div className="dbg-lore-ends dbg-related">
                    <span className="dbg-lore-ends-label">related:</span>
                    {f.related.map((rid) => {
                      const rf = byId[rid]
                      const rh = HISTORY_BY_ID[rid]
                      if (!rf && !rh) return null
                      return (
                        <Badge className={`dbg-tag dbg-tag-btn ${rh ? 'secret' : 'node'}`} key={rid}
                               onClick={() => goLore(rid)} renderBody={() => rh ? <HistoryBody id={rid} /> : <LoreBody id={rid} />}>
                          {rh ? '📜 ' : ''}{(rf || rh).title.split('—')[0].trim()} →
                        </Badge>
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
                        <Badge className={'dbg-tag dbg-tag-btn ' + (e?.kind || 'node')} key={id}
                               onClick={() => goGraph(id)} renderBody={() => <NodeBody node={id} />}>
                          {e?.kind === 'good' ? '🏆' : e?.kind === 'secret' ? '✨' : '💀'} {e?.title || id} →
                        </Badge>
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
        (the ⬇ links open the local copy on GitHub). A 🔗 records an external reference;
        link-only sources are not byte-frozen or machine-verified by this repository.
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
                        <Badge className="dbg-tag dbg-tag-btn node" key={id}
                               onClick={() => goLore(id)} renderBody={() => <LoreBody id={id} />}>
                          {rf.title.split('—')[0].trim()} →
                        </Badge>
                      )
                    })}
                    {(c.coversHist || []).map((id) => {
                      const h = histById[id]
                      if (!h) return null
                      return (
                        <Badge className="dbg-tag dbg-tag-btn secret" key={id}
                               onClick={() => goHistory(id)} renderBody={() => <HistoryBody id={id} />}>
                          📜 {h.title.split(/[—:(]/)[0].trim()} →
                        </Badge>
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
  const histById = useMemo(() => Object.fromEntries(HISTORY.map((h) => [h.id, h])), [])
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
                <a key={i} href={s.url} target="_blank" rel="noreferrer" title={s.note || s.label}>
                  {s.role ? (REFERENCE_ROLE_LABEL[s.role] || '🔗 source') : '🔗'} {s.label}
                </a>
              ))}
            </div>
          )}
          {h.related?.length > 0 && (
            <div className="dbg-lore-ends dbg-related">
              <span className="dbg-lore-ends-label">related:</span>
              {h.related.map((id) => {
                const rf = byId[id]
                const rh = histById[id]
                if (!rf && !rh) return null
                return (
                  <Badge className={`dbg-tag dbg-tag-btn ${rh ? 'secret' : 'node'}`} key={id}
                         onClick={() => goLore(id)} renderBody={() => rh ? <HistoryBody id={id} /> : <LoreBody id={id} />}>
                    {rh ? '📜 ' : ''}{(rf || rh).title.split('—')[0].trim()} →
                  </Badge>
                )
              })}
            </div>
          )}
          {bySrc[h.id]?.length > 0 && (
            <div className="dbg-lore-ends dbg-related">
              <span className="dbg-lore-ends-label">in sources:</span>
              {bySrc[h.id].map((c) => (
                <Badge className="dbg-tag dbg-tag-btn start" key={c.id}
                       onClick={() => goSource(c.id)} renderBody={() => <SourceBody id={c.id} />}>
                  📚 {c.author.split(/[&(]/)[0].trim()} {c.year} →
                </Badge>
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
  const environment = environmentSnapshot(state)
  const initialFocusIsHistory = Boolean(state.loreFocus && HISTORY_BY_ID[state.loreFocus])
  const [sub, setSub] = useState(state.loreFocus ? (initialFocusIsHistory ? 'history' : 'library') : 'graph')
  const [sel, setSel] = useState(state.nodeId)
  const [libFocus, setLibFocus] = useState(initialFocusIsHistory ? null : state.loreFocus)
  const [srcFocus, setSrcFocus] = useState(null)
  const [histFocus, setHistFocus] = useState(initialFocusIsHistory ? state.loreFocus : null)
  const [beatFocus, setBeatFocus] = useState(null)
  const [worldFocus, setWorldFocus] = useState(null)
  const [npcFocus, setNpcFocus] = useState(null)

  // arriving here via an ending's "open in library" link
  useEffect(() => {
    if (!state.loreFocus) return
    if (HISTORY_BY_ID[state.loreFocus]) {
      setSub('history')
      setHistFocus(state.loreFocus)
    } else {
      setSub('library')
      setLibFocus(state.loreFocus)
    }
  }, [state.loreFocus])

  const goGraph = (id) => { setSel(id); setSub('graph') }
  const goLore = (loreId) => {
    if (HISTORY_BY_ID[loreId]) {
      setHistFocus(loreId)
      setSub('history')
    } else {
      setLibFocus(loreId)
      setSub('library')
    }
  }
  const goBeats = (taleId) => { setBeatFocus(taleId); setSub('beats') }
  const goWorld = (nodeId) => { setWorldFocus({ id: nodeId }); setSub('village') }
  const goNpc = (npcId) => { setNpcFocus(npcId); setSub('npcs') }
  const goSource = (srcId) => { setSrcFocus(srcId); setSub('sources') }
  const goHistory = (histId) => { setHistFocus(histId); setSub('history') }
  const endCounts = ENDINGS.reduce((a, e) => ((a[e.kind] = (a[e.kind] || 0) + 1), a), {})

  return (
    <section className="card dbg" aria-labelledby="debug-title">
      <h2 id="debug-title" className="sr-only">Debug tools</h2>
      <div className="dbg-stats">
        <span><b>{g.ids.length}</b> nodes</span>
        <span><b>{g.reached}</b> reachable</span>
        {g.reached < g.ids.length && <span className="warn"><b>{g.ids.length - g.reached}</b> unreachable</span>}
        <span><b>{g.hubs.length}</b> hubs</span>
        <span>🏆 {endCounts.good || 0} · ✨ {endCounts.secret || 0} · 💀 {endCounts.bad || 0}</span>
        <span><b>{FOLKLORE.length}</b> folklore · <b>{HISTORY.length}</b> history · <b>{CORPUS.length}</b> sources · <b>{Object.keys(NPC_REGISTRY).length}</b> NPCs</span>
      </div>
      <div className="dbg-subtabs">
        <button className={'btn' + (sub === 'graph' ? ' active' : '')} onClick={() => setSub('graph')}>🕸 Story Graph</button>
        <button className={'btn' + (sub === 'village' ? ' active' : '')} onClick={() => setSub('village')}>🗺 World</button>
        <button className={'btn' + (sub === 'map' ? ' active' : '')} onClick={() => setSub('map')}>🧭 Hubs</button>
        <button className={'btn' + (sub === 'library' ? ' active' : '')} onClick={() => setSub('library')}>📖 Folklore</button>
        <button className={'btn' + (sub === 'beats' ? ' active' : '')} onClick={() => setSub('beats')}>🎬 Beats</button>
        <button className={'btn' + (sub === 'npcs' ? ' active' : '')} onClick={() => setSub('npcs')}>🎭 NPCs</button>
        <button className={'btn' + (sub === 'history' ? ' active' : '')} onClick={() => setSub('history')}>📜 History</button>
        <button className={'btn' + (sub === 'sources' ? ' active' : '')} onClick={() => setSub('sources')}>📚 Sources</button>
      </div>
      <div className="dbg-legend">
        {Object.entries(KIND_LABEL).map(([k, label]) => (
          <span key={k}><i style={{ background: KIND_COLOR[k] }} /> {label}</span>
        ))}
      </div>
      {sub === 'graph' && <StoryGraph g={g} sel={sel} setSel={setSel} goLore={goLore} />}
      {sub === 'village' && <VillageMap g={g} current={state.nodeId} goGraph={goGraph}
        world={{ ...environment, fire: fireStateOf(state) }}
        npcs={liveNpcs(state)} jumpTo={worldFocus} />}
      {sub === 'map' && <WorldMap g={g} current={state.nodeId} setSel={setSel} goGraph={goGraph} />}
      {sub === 'library' && <Library focus={libFocus} goGraph={goGraph} goLore={goLore} goSource={goSource} goHistory={goHistory} goBeats={goBeats} />}
      {sub === 'beats' && <Beats focus={beatFocus} goLore={goLore} goWorld={goWorld} goNpc={goNpc} />}
      {sub === 'npcs' && <Npcs focus={npcFocus} goWorld={goWorld} goLore={goLore} goBeats={goBeats} />}
      {sub === 'history' && <History focus={histFocus} goLore={goLore} goSource={goSource} />}
      {sub === 'sources' && <Sources focus={srcFocus} goLore={goLore} goHistory={goHistory} />}
    </section>
  )
}
