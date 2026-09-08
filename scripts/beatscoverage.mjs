// The tale-beats audit — run after every data/tales or data/npcs edit:
//   1. line coverage — every sentence of the original in exactly one beat
//   1b. every line carries its verbatim Albanian (unless albanian.status='missing')
//   2. place anchors — valid per status, with mirror + mold (the sharing rule)
//   3. cast ↔ NPC — every beat-cast member resolves to a registry entry
//   4. registry sanity + cross-tale shared-anchor report
// Assembles the data itself (readdir) — import.meta.glob is Vite-only.
import { existsSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { ENDINGS, ITEMS, STORY, lineOf } from '../src/game/content.js'
import { embodimentQuest } from '../src/game/embodiment.js'
import { ACHIEVEMENTS } from '../src/game/achievements.js'
import { WORLD_FACT_PRESENTATION } from '../src/game/environment.js'
import { CORPUS, ENDING_LORE, FOLKLORE, HISTORY } from '../src/game/folklore.js'
import { QUOTES } from '../src/game/quotes.js'
import { NPCS as LIVE_NPCS } from '../src/game/npcs.js'
import { REVIEWED_READINGS } from '../src/game/data/readings/reviewedReadings.js'
import { REVIEWED_OPTION_READINGS } from '../src/game/data/readings/reviewedOptionReadings.js'
import { coverageOf } from '../src/game/taleLib.js'
import {
  omissionReviewContextHash,
  placeReviewContextHash,
  projectionReviewPayload,
} from './projectionReviewSnapshot.mjs'
import {
  PLACE_PROJECTION_CONTEXT_HASHES,
  PLACE_PROJECTION_REVIEWS,
  PROJECTION_DISPOSITIONS,
  PROJECTION_OMISSION_CONTEXT_HASHES,
  PROJECTION_OMISSIONS,
  PROJECTION_OMISSION_REASON,
  PROJECTION_OMISSION_REVIEWS,
  PROJECTION_REVIEW_SNAPSHOT_HASH,
} from '../src/game/data/tales/_projectionLedger.js'

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
const dispositionCounts = {
  beats: Object.fromEntries(Object.values(PROJECTION_DISPOSITIONS).map((value) => [value, 0])),
  places: Object.fromEntries(Object.values(PROJECTION_DISPOSITIONS).map((value) => [value, 0])),
}
const proposedPlaceKeys = new Set()
const ALBANIAN_SOURCE_STATUSES = new Set(['missing', 'located', 'transcribed'])

// A projection claim must at least sit on an authored choice route from the
// declared threshold. Runtime role/item/time gates are exhaustively exercised
// by embodimentaudit/stateaudit; this deliberately cheap graph check catches
// the separate error of mapping a source beat to an isolated scene id.
const reachableProjectionScenes = (from) => {
  if (!STORY[from]) return new Set()
  const queue = [from]
  const nodes = new Set([from])
  while (queue.length) {
    const current = queue.shift()
    if (STORY[current]?.end) continue
    for (const option of STORY[current]?.options || []) {
      if (option.confuser || !STORY[option.to]) continue
      if (nodes.has(option.to)) continue
      nodes.add(option.to)
      queue.push(option.to)
    }
  }
  return nodes
}

const projectionSnapshot = projectionReviewPayload({
  story: STORY,
  items: ITEMS,
  tales: TALES,
  folklore: FOLKLORE,
  endingLore: ENDING_LORE,
  history: HISTORY,
  corpus: CORPUS,
  quotes: QUOTES,
  achievements: ACHIEVEMENTS,
  fates: ENDINGS.filter((ending) => ending.kind === 'bad'),
  worldFactPresentation: WORLD_FACT_PRESENTATION,
  npcRegistry: NPC_REGISTRY,
  reviewedReadings: REVIEWED_READINGS,
  reviewedOptionReadings: REVIEWED_OPTION_READINGS,
  omissions: PROJECTION_OMISSIONS,
  omissionReviews: PROJECTION_OMISSION_REVIEWS,
  placeReviews: PLACE_PROJECTION_REVIEWS,
})
const projectionReviewHash = createHash('sha256')
  .update(JSON.stringify(projectionSnapshot))
  .digest('hex')
if (projectionReviewHash !== PROJECTION_REVIEW_SNAPSHOT_HASH) {
  bad(`projection-review snapshot is stale: ledger has ${PROJECTION_REVIEW_SNAPSHOT_HASH}; current content is ${projectionReviewHash}`)
}

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

  // 1b. Source-language witnesses. “Carries” is deliberately not called
  // “machine verified”: exact corpus containment is the stricter quotecheck/
  // lore-certainty job, and old OCR often needs page-image collation.
  const albanianStatus = tale.albanian?.status || 'transcribed'
  if (!ALBANIAN_SOURCE_STATUSES.has(albanianStatus)) bad(`${id}: unknown Albanian source status "${albanianStatus}"`)
  if (tale.albanian?.external && !/^https:\/\//.test(tale.albanian.external)) bad(`${id}: albanian.external is not an HTTPS source`)
  if (tale.albanian?.proofLocal && !existsSync(tale.albanian.proofLocal)) bad(`${id}: albanian.proofLocal does not exist: ${tale.albanian.proofLocal}`)
  if (albanianStatus === 'missing') {
    if (!tale.albanian?.why || tale.albanian.why.length < 80) bad(`${id}: missing Albanian source has no adequate search record`)
    console.log(`⚠️  ${id}: NO ALBANIAN ORIGINAL FOUND — ${tale.albanian.why || 'no reason recorded'}`)
  } else if (albanianStatus === 'located') {
    if (!tale.albanian?.why || tale.albanian.why.length < 80) bad(`${id}: located Albanian source has no collation record`)
    if (!/^https:\/\//.test(tale.albanian?.external || '')) bad(`${id}: located Albanian source has no HTTPS primary-scan URL`)
    if (tale.albanian?.local && !existsSync(tale.albanian.local)) bad(`${id}: albanian.local does not exist: ${tale.albanian.local}`)
    const premature = tale.beats.flatMap((b) => (b.lines || []).filter((l) => l[2]).map((l) => `${b.id}:${l[0]}`))
    if (premature.length) bad(`${id}: source is only located, but ${premature.length} lines prematurely claim aligned Albanian text`)
    else console.log(`⚠️  ${id}: EXACT ALBANIAN ORIGINAL LOCATED; line collation still pending`)
  } else if (!tale.albanian?.local) {
    bad(`${id}: albanian.local (raw text reference file) missing`)
  } else if (!existsSync(tale.albanian.local)) {
    bad(`${id}: albanian.local does not exist: ${tale.albanian.local}`)
  } else {
    const noAl = tale.beats.flatMap((b) => (b.lines || []).filter((l) => !l[2]).map((l) => `${b.id}:${l[0]}`))
    if (noAl.length) bad(`${id}: lines missing the Albanian original: ${noAl.join(', ')}`)
    else {
      // A whole paragraph pasted onto every English micro-unit would satisfy
      // mere non-emptiness and corpus containment without being a meaningful
      // line alignment. Permit short repeated formulas and small subdivisions
      // of one source clause, but reject broad copy-paste spans.
      const sourceUses = new Map()
      for (const beat of tale.beats) for (const line of beat.lines || []) {
        if (!line[2]) continue
        const source = line[2].trim()
        if (!sourceUses.has(source)) sourceUses.set(source, [])
        sourceUses.get(source).push(`${beat.id}:${line[0]}`)
      }
      const overbroad = [...sourceUses.entries()].filter(([source, refs]) =>
        refs.length > 4 || (source.length > 200 && refs.length > 1))
      if (overbroad.length) bad(`${id}: overbroad source spans reused as line alignments — ${overbroad.map(([source, refs]) => `${refs.join(', ')} (${source.length} chars)`).join('; ')}`)
      else console.log(`✅ ${id}: every line carries a source-language transcription (${tale.albanian?.title || 'untitled'})`)
    }
  }

  // English/editorial apparatus inside element 3 makes a transcription look
  // like a verbatim source quote when it is not. Albanian restorations such as
  // [një] remain allowed; English notes and [sic] must live in element 4.
  const apparatus = tale.beats.flatMap((b) => (b.lines || []).filter((l) =>
    l[2] && /\[(?:sic\b|the\b|from\b|sung\b|continues\b|reported\b|this\b|one\b)/i.test(l[2]),
  ).map((l) => `${b.id}:${l[0]}`))
  if (apparatus.length) bad(`${id}: English/editorial apparatus contaminates Albanian element 3: ${apparatus.join(', ')}`)

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
    if (a.status === 'proposed') {
      const key = `${id}.${p.id}`
      proposedPlaceKeys.add(key)
      const review = PLACE_PROJECTION_REVIEWS[key]
      if (!review) anchorErrs.push(`${p.id}: proposed place has no disposition review`)
      else {
        dispositionCounts.places[review.disposition]++
        if (!Object.values(PROJECTION_DISPOSITIONS).includes(review.disposition)) anchorErrs.push(`${p.id}: bad review disposition "${review.disposition}"`)
        if (
          !review.basis ||
          !review.note ||
          review.reviewId !== `place:${key}` ||
          !review.itemEvidence?.includes(key) ||
          !review.itemEvidence?.includes('contextHash') ||
          review.contextHash !== PLACE_PROJECTION_CONTEXT_HASHES[key] ||
          review.contextHash !== placeReviewContextHash(tale, p.id)
        ) {
          anchorErrs.push(`${p.id}: incomplete or non-specific disposition evidence`)
        }
        if (review.disposition !== PROJECTION_DISPOSITIONS.JUSTIFIED && !review.recommendation) anchorErrs.push(`${p.id}: unresolved review has no recommendation`)
      }
    }
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
    const ordered = tale.beats.map((b) => b.id)
    const beatIds = new Set(ordered)
    const castIds = new Set((tale.cast || []).map((c) => c.id))
    const perr = []
    if (!beatIds.has(p.entry)) perr.push(`entry "${p.entry}" is not a beat id`)
    if (p.finale && !beatIds.has(p.finale)) perr.push(`finale "${p.finale}" is not a beat id`)
    const start = ordered.indexOf(p.entry)
    const end = p.finale ? ordered.indexOf(p.finale) : ordered.length - 1
    if (start !== -1 && end !== -1 && start > end) perr.push(`finale "${p.finale}" precedes entry "${p.entry}"`)
    const span = start !== -1 && end !== -1 && start <= end
      ? new Set(ordered.slice(start, end + 1))
      : new Set()
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
    else if (p.ending && !STORY[p.ending].end) perr.push(`ending "${p.ending}" is a scene, not an ending`)
    const sceneBeats = new Set()
    if (p.scenes) {
      // Bound character tales begin at their visible threshold scene (which may
      // itself enact a beat); other projections begin at play.from. A mapping
      // to an existing-but-unreachable node is documentation, not gameplay.
      const projectionStart = embodimentQuest(id)?.entryFrom || p.from
      const reachableScenes = reachableProjectionScenes(projectionStart)
      for (const [node, mappedBeats] of Object.entries(p.scenes)) {
        if (!STORY[node]) perr.push(`scenes node "${node}" not in STORY`)
        else {
          const hasProse = (STORY[node].text || []).some((entry) => lineOf(entry).length > 0)
          if (!hasProse) perr.push(`scenes node "${node}" has no player-visible prose`)
          if (!reachableScenes.has(node)) perr.push(`scenes node "${node}" is not playable from "${projectionStart || ''}"`)
        }
        const mapped = Array.isArray(mappedBeats) ? mappedBeats : [mappedBeats]
        if (!mapped.length) perr.push(`scenes "${node}" has no beat ids`)
        for (const beatId of mapped) {
          sceneBeats.add(beatId)
          if (!beatIds.has(beatId)) perr.push(`scenes "${node}" → beat "${beatId}" is not a beat id`)
          else if (!span.has(beatId)) perr.push(`scenes "${node}" → beat "${beatId}" is outside the declared entry–finale span`)
        }
      }
    }
    const learnedBeats = new Set(Object.keys(p.learn || {}))
    for (const beatId of sceneBeats) if (learnedBeats.has(beatId)) {
      perr.push(`beat "${beatId}" is classified as both an enacted scene and learned lore`)
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

    // 3c. Every beat inside the declared playable span must be accounted for
    // positively (scene/learn/beat-tagged divergence) or negatively (the
    // explicit omission ledger). This prevents “playable tale” from silently
    // implying that hundreds of source events are enacted when they are not.
    // A divergence note documents a difference; it does not make the source
    // beat playable. Only an enacted scene or an explicit learn route is a
    // positive projection. Divergence-only beats therefore remain omissions
    // and require their own reviewed disposition below.
    const represented = new Set([...sceneBeats, ...learnedBeats])
    const omissions = PROJECTION_OMISSIONS[id] || []
    if (!PROJECTION_OMISSION_REASON) perr.push('projection omission reason missing')
    if (new Set(omissions).size !== omissions.length) perr.push('duplicate beat in projection omission ledger')
    for (const beatId of omissions) {
      if (!span.has(beatId)) perr.push(`omission "${beatId}" is outside the playable span or unknown`)
      if (represented.has(beatId)) perr.push(`beat "${beatId}" is both represented by a scene/learn route and marked omitted`)
      const key = `${id}.${beatId}`
      const review = PROJECTION_OMISSION_REVIEWS[key]
      if (!review) perr.push(`omission "${beatId}" has no disposition review`)
      else {
        dispositionCounts.beats[review.disposition]++
        if (review.taleId !== id || review.beatId !== beatId) perr.push(`omission "${beatId}" review key disagrees with its payload`)
        if (!Object.values(PROJECTION_DISPOSITIONS).includes(review.disposition)) perr.push(`omission "${beatId}" has bad disposition "${review.disposition}"`)
        if (
          !review.basis ||
          !review.note ||
          review.reviewId !== `omission:${key}` ||
          !review.itemEvidence?.includes(key) ||
          !review.itemEvidence?.includes('contextHash') ||
          review.contextHash !== PROJECTION_OMISSION_CONTEXT_HASHES[key] ||
          review.contextHash !== omissionReviewContextHash(tale, beatId)
        ) {
          perr.push(`omission "${beatId}" has incomplete or non-specific disposition evidence`)
        }
        if (review.disposition !== PROJECTION_DISPOSITIONS.JUSTIFIED && !review.recommendation) perr.push(`unresolved omission "${beatId}" has no recommendation`)
      }
    }
    const unaccounted = [...span].filter((beatId) => !represented.has(beatId) && !omissions.includes(beatId))
    if (unaccounted.length) perr.push(`unaccounted playable-span beats: ${unaccounted.join(', ')}`)
    if (perr.length) bad(`${id}: projection accounting — ${perr.join('; ')}`)
    else {
      const enacted = [...span].filter((beatId) => sceneBeats.has(beatId)).length
      const learnedOnly = [...span].filter((beatId) => learnedBeats.has(beatId) && !sceneBeats.has(beatId)).length
      const divergenceOnly = omissions.filter((beatId) => (p.divergences || []).some((item) => item.beat === beatId)).length
      console.log(`✅ ${id}: projection accounting explicit (${enacted} enacted · ${learnedOnly} learned · ${omissions.length} omitted with disposition, ${divergenceOnly} documented by divergence)`)
    }
  } else {
    if (tale.projection?.status !== 'source-only' || !tale.projection?.reason) {
      bad(`${id}: no play projection and no explicit source-only disposition`)
    } else {
      console.log(`✅ ${id}: source-only timeline is explicitly separated from gameplay`)
    }
  }

  if (!tale.origin) bad(`${id}: no origin (region/collector) recorded`)
}

for (const id of Object.keys(PROJECTION_OMISSIONS)) {
  if (!TALES[id]) bad(`projection ledger names unknown tale "${id}"`)
  else if (!TALES[id].play) bad(`projection ledger names tale "${id}" without a play projection`)
}

const expectedOmissionKeys = new Set(Object.entries(PROJECTION_OMISSIONS).flatMap(([taleId, beats]) => beats.map((beatId) => `${taleId}.${beatId}`)))
for (const key of Object.keys(PROJECTION_OMISSION_REVIEWS)) if (!expectedOmissionKeys.has(key)) bad(`projection disposition review is stale: "${key}"`)
for (const key of Object.keys(PROJECTION_OMISSION_CONTEXT_HASHES)) if (!expectedOmissionKeys.has(key)) bad(`projection context digest is stale: "${key}"`)
for (const key of expectedOmissionKeys) if (!PROJECTION_OMISSION_CONTEXT_HASHES[key]) bad(`projection context digest is missing: "${key}"`)
for (const key of Object.keys(PLACE_PROJECTION_REVIEWS)) if (!proposedPlaceKeys.has(key)) bad(`place disposition review is stale or does not name a proposed anchor: "${key}"`)
for (const key of Object.keys(PLACE_PROJECTION_CONTEXT_HASHES)) if (!proposedPlaceKeys.has(key)) bad(`place context digest is stale or does not name a proposed anchor: "${key}"`)
for (const key of proposedPlaceKeys) if (!PLACE_PROJECTION_CONTEXT_HASHES[key]) bad(`place context digest is missing: "${key}"`)

const duplicateContextHashes = (reviews) => {
  const owners = new Map()
  for (const [key, review] of Object.entries(reviews)) {
    const keys = owners.get(review.contextHash) || []
    keys.push(key)
    owners.set(review.contextHash, keys)
  }
  return [...owners.entries()].filter(([hash, keys]) => hash && keys.length > 1)
}
for (const [, keys] of duplicateContextHashes(PROJECTION_OMISSION_REVIEWS)) bad(`omission context digest reused across reviews: ${keys.join(', ')}`)
for (const [, keys] of duplicateContextHashes(PLACE_PROJECTION_REVIEWS)) bad(`place context digest reused across reviews: ${keys.join(', ')}`)

const beatTotal = Object.values(dispositionCounts.beats).reduce((sum, count) => sum + count, 0)
const placeTotal = Object.values(dispositionCounts.places).reduce((sum, count) => sum + count, 0)
if (beatTotal !== expectedOmissionKeys.size) bad(`projection disposition total ${beatTotal} != omitted beat total ${expectedOmissionKeys.size}`)
if (placeTotal !== proposedPlaceKeys.size) bad(`place disposition total ${placeTotal} != proposed anchor total ${proposedPlaceKeys.size}`)
console.log(`✅ projection dispositions: ${dispositionCounts.beats.justified} justified · ${dispositionCounts.beats.gap} gap · ${dispositionCounts.beats.uncertain} uncertain`)
console.log(`✅ proposed-place dispositions: ${dispositionCounts.places.justified} justified · ${dispositionCounts.places.gap} gap · ${dispositionCounts.places.uncertain} uncertain`)
console.log(`✅ projection review snapshot: ${projectionReviewHash}`)

// 4. registry sanity
for (const [nid, npc] of Object.entries(NPC_REGISTRY)) {
  const loc = npc.location
  if (!loc) { bad(`npc ${nid}: no location`); continue }
  if (loc.status === 'placed' && !STORY[loc.node]) bad(`npc ${nid}: placed at unknown node "${loc.node}"`)
  if (loc.status === 'walking' && (loc.route || []).some((n) => !STORY[n])) bad(`npc ${nid}: route has unknown nodes`)
  if (loc.status === 'planning' && !loc.plan) bad(`npc ${nid}: planning but no plan`)
}
// The research/debug registry is player-visible documentation of the moving
// figures whose actual clock routes live in game/npcs.js. Compare the exact
// set of stops (runtime arrays repeat dwell nodes) so neither surface can
// silently invent or omit a place.
for (const [nid, live] of Object.entries(LIVE_NPCS)) {
  const documented = NPC_REGISTRY[nid]
  if (!documented) {
    bad(`live npc ${nid}: absent from the source/backstory registry`)
    continue
  }
  if (documented.location?.status !== 'walking') {
    bad(`live npc ${nid}: registry status is not walking`)
    continue
  }
  const liveStops = [...new Set(live.route || [])].sort()
  const documentedStops = [...new Set(documented.location.route || [])].sort()
  if (JSON.stringify(liveStops) !== JSON.stringify(documentedStops)) {
    bad(`live npc ${nid}: runtime stops [${liveStops.join(', ')}] disagree with documented stops [${documentedStops.join(', ')}]`)
  }
  if (live.name !== documented.name || live.glyph !== documented.glyph) {
    bad(`live npc ${nid}: runtime name/glyph disagrees with the source/backstory registry`)
  }
}
// no npc id may be defined in more than one file — the glob-merge is last-wins,
// so a collision silently shadows one figure with another
for (const [id, files] of Object.entries(npcDefs)) {
  if (files.length > 1) bad(`npc id "${id}" defined in ${files.length} files (${files.join(', ')}) — glob-merge silently keeps one; rename the distinct figures or consolidate the shared one`)
}
console.log(`✅ NPC registry: ${Object.keys(NPC_REGISTRY).length} entries, locations and all ${Object.keys(LIVE_NPCS).length} live clock routes valid`)

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
