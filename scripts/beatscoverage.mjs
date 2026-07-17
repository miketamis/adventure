// The tale-beats audit — run after every data/tales or data/npcs edit:
//   1. line coverage — every sentence of the original in exactly one beat
//   1b. every line carries its verbatim Albanian (unless albanian.status='missing')
//   2. place anchors — valid per status, with mirror + mold (the sharing rule)
//   3. cast ↔ NPC — every beat-cast member resolves to a registry entry
//   4. registry sanity + cross-tale shared-anchor report
// Assembles the data itself (readdir) — import.meta.glob is Vite-only.
import { readdirSync } from 'node:fs'
import { STORY } from '../src/game/content.js'
import { coverageOf } from '../src/game/taleLib.js'

const load = async (dir) => {
  const out = []
  for (const f of readdirSync(new URL(dir, import.meta.url))) {
    if (!f.endsWith('.js') || f.startsWith('_')) continue
    out.push([f, (await import(`../src/game/data/${dir.split('/').pop()}/${f}`)).default])
  }
  return out
}
const TALES = Object.fromEntries((await load('../src/game/data/tales')).map(([f, t]) => {
  if (!t?.id) { console.log(`❌ tales/${f}: no id on default export`); process.exitCode = 1 }
  return [t?.id || f, t]
}))
const NPC_REGISTRY = {}
const npcDefs = {}
for (const [f, mod] of await load('../src/game/data/npcs')) {
  for (const id of Object.keys(mod)) (npcDefs[id] ||= []).push(f)
  Object.assign(NPC_REGISTRY, mod)
}
const NPC_OF_CAST = {}
for (const [npcId, npc] of Object.entries(NPC_REGISTRY))
  for (const [taleId, castId] of Object.entries(npc.tales || {})) (NPC_OF_CAST[taleId] ||= {})[castId] = npcId
for (const [taleId, tale] of Object.entries(TALES))
  for (const c of tale.cast || []) if (c.npc && NPC_REGISTRY[c.npc]) (NPC_OF_CAST[taleId] ||= {})[c.id] = c.npc

let failed = false
const bad = (msg) => { failed = true; console.log('❌ ' + msg) }

for (const [id, tale] of Object.entries(TALES)) {
  // 1. line coverage
  const c = coverageOf(tale)
  if (c.ok) console.log(`✅ ${id}: all ${c.total} original lines covered across ${tale.beats.length} beats`)
  else {
    bad(`${id}: ${c.covered}/${c.total} lines`)
    if (c.missing.length) console.log(`   missing: ${c.missing.join(', ')}`)
    if (c.dupes.length) console.log(`   duplicated: ${c.dupes.join(', ')}`)
    if (c.unknown.length) console.log(`   out of range: ${c.unknown.join(', ')}`)
    if (c.bad.length) console.log(`   bad refs: ${c.bad.join('; ')}`)
  }

  // 1b. Albanian originals on every line
  if (tale.albanian?.status === 'missing') {
    console.log(`⚠️  ${id}: NO ALBANIAN ORIGINAL FOUND — ${tale.albanian.why || 'no reason recorded'}`)
  } else if (!tale.albanian?.local) {
    bad(`${id}: albanian.local (raw text reference file) missing`)
  } else {
    const noAl = tale.beats.flatMap((b) => (b.lines || []).filter((l) => !l[2]).map((l) => `${b.id}:${l[0]}`))
    if (noAl.length) bad(`${id}: lines missing the Albanian original: ${noAl.join(', ')}`)
    else console.log(`✅ ${id}: every line carries its Albanian original (${tale.albanian?.title || 'untitled'})`)
  }

  // 2. place anchors
  const anchorErrs = []
  for (const p of tale.places) {
    const a = p.anchor
    if (!a) { anchorErrs.push(`${p.id}: no anchor`); continue }
    if (!['existing', 'proposed', 'offstage'].includes(a.status)) anchorErrs.push(`${p.id}: bad status "${a.status}"`)
    if (a.status !== 'offstage' && (!a.node || !STORY[a.node])) anchorErrs.push(`${p.id}: node "${a.node}" not in STORY`)
    if (a.status === 'proposed' && !a.proposal) anchorErrs.push(`${p.id}: proposed but no proposal`)
    if (!a.mirror) anchorErrs.push(`${p.id}: no real-world mirror`)
    if (!a.mold) anchorErrs.push(`${p.id}: no mold (the sharing rule needs one)`)
  }
  if (anchorErrs.length) bad(`${id}: anchors — ${anchorErrs.join('; ')}`)
  else console.log(`✅ ${id}: all ${tale.places.length} place anchors valid (${tale.places.filter((p) => p.anchor.status === 'existing').length} existing, ${tale.places.filter((p) => p.anchor.status === 'proposed').length} proposed, ${tale.places.filter((p) => p.anchor.status === 'offstage').length} offstage)`)

  // 3. every cast member resolves to an NPC registry entry
  const noNpc = (tale.cast || []).filter((cm) => !NPC_OF_CAST[id]?.[cm.id])
  if (noNpc.length) bad(`${id}: cast without a registry NPC: ${noNpc.map((cm) => cm.id).join(', ')}`)
  else console.log(`✅ ${id}: all ${tale.cast.length} cast members link to NPC registry entries`)

  // 3b. the game projection (tale.play) — optional, but well-formed if present:
  // entry/finale are real beat ids, stance is valid, and the embodied/companion
  // cast link resolves (see data/tales/_SCHEMA.md → "How the tale becomes playable")
  if (tale.play) {
    const p = tale.play
    const beatIds = new Set(tale.beats.map((b) => b.id))
    const castIds = new Set((tale.cast || []).map((c) => c.id))
    const perr = []
    if (!beatIds.has(p.entry)) perr.push(`entry "${p.entry}" is not a beat id`)
    if (p.finale && !beatIds.has(p.finale)) perr.push(`finale "${p.finale}" is not a beat id`)
    if (!['embodied', 'companion', 'witness'].includes(p.stance)) perr.push(`bad stance "${p.stance}"`)
    if (p.stance === 'embodied') {
      if (!p.as) perr.push('embodied but no as-field (cast id)')
      else for (const a of (Array.isArray(p.as) ? p.as : [p.as])) if (!castIds.has(a)) perr.push(`embodied as "${a}" is not a cast id`)
      if (p.with) perr.push('embodied must not also set with')
    } else if (p.stance === 'companion') {
      if (p.with && !castIds.has(p.with)) perr.push(`companion with "${p.with}" is not a cast id`)
      if (p.as) perr.push('companion must not also set as')
    } else if (p.stance === 'witness' && (p.as || p.with)) perr.push('witness must not set as/with')
    if (p.learn) {
      for (const [beatId, entries] of Object.entries(p.learn)) {
        if (!beatIds.has(beatId)) perr.push(`learn key "${beatId}" is not a beat id`)
        for (const e of (entries || [])) {
          const node = Array.isArray(e) ? e[0] : e
          if (!STORY[node]) perr.push(`learn "${beatId}" → node "${node}" not in STORY`)
        }
      }
    }
    // the playthrough map: from/ending are real nodes, scenes are node→beat
    if (p.from && !STORY[p.from]) perr.push(`from "${p.from}" not in STORY`)
    if (p.ending && !STORY[p.ending]) perr.push(`ending "${p.ending}" not in STORY`)
    if (p.scenes) {
      for (const [node, beatId] of Object.entries(p.scenes)) {
        if (!STORY[node]) perr.push(`scenes node "${node}" not in STORY`)
        if (!beatIds.has(beatId)) perr.push(`scenes "${node}" → beat "${beatId}" is not a beat id`)
      }
    }
    if (p.divergences) {
      for (const d of p.divergences) {
        if (!d?.note) perr.push('a divergence has no note')
        if (d?.beat && !beatIds.has(d.beat)) perr.push(`divergence beat "${d.beat}" is not a beat id`)
      }
    }
    if (!p.role) perr.push('no role line')
    if (perr.length) bad(`${id}: play — ${perr.join('; ')}`)
    else console.log(`✅ ${id}: play projection valid (enters at "${p.entry}", stance ${p.stance})`)
  }

  if (!tale.origin) bad(`${id}: no origin (region/collector) recorded`)
}

// 4. registry sanity
for (const [nid, npc] of Object.entries(NPC_REGISTRY)) {
  const loc = npc.location
  if (!loc) { bad(`npc ${nid}: no location`); continue }
  if (loc.status === 'placed' && !STORY[loc.node]) bad(`npc ${nid}: placed at unknown node "${loc.node}"`)
  if (loc.status === 'walking' && (loc.route || []).some((n) => !STORY[n])) bad(`npc ${nid}: route has unknown nodes`)
  if (loc.status === 'planning' && !loc.plan) bad(`npc ${nid}: planning but no plan`)
}
// no npc id may be defined in more than one file — the glob-merge is last-wins,
// so a collision silently shadows one figure with another
for (const [id, files] of Object.entries(npcDefs)) {
  if (files.length > 1) bad(`npc id "${id}" defined in ${files.length} files (${files.join(', ')}) — glob-merge silently keeps one; rename the distinct figures or consolidate the shared one`)
}
console.log(`✅ NPC registry: ${Object.keys(NPC_REGISTRY).length} entries, locations valid`)

// cross-tale shared anchors — not an error, but every share needs compatible molds
const byNode = {}
for (const [tid, tale] of Object.entries(TALES))
  for (const p of tale.places) if (p.anchor?.node) (byNode[p.anchor.node] ||= []).push(`${tid}.${p.id}`)
const shared = Object.entries(byNode).filter(([, v]) => v.length > 1)
if (shared.length) {
  console.log(`ℹ️  shared anchors (verify the molds are compatible):`)
  for (const [node, users] of shared) console.log(`   ${node}: ${users.join(' + ')}`)
}

process.exit(failed ? 1 : 0)
