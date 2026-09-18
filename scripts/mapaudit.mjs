import { departureContextIssues } from '../src/game/departureContextValidation.js'
import { isUnchartedStoryNode } from '../src/game/departureContexts.js'
// MAP AUDIT — THE RULE: the map and the story stay accurate to one another,
// and everything explorable is represented on the map. Mechanically enforced:
// these checks read the story graph (content.js) against the hand-placed map
// (nodePositions.js), the region model (regions.js) and the DRAWN layers
// (mapGlyphs.jsx landmarks, WorldMapView.jsx village places). Runs automatically
// at the end of `node scripts/audit.mjs`; run alone after ANY reposition or
// story-edge edit:
//   node scripts/mapaudit.mjs
// The map is a non-cardinal mythic Albanian tale-chart: sky/Tomorr at NEGATIVE
// y (top), the underworld at LARGE y (bottom). Thus "up" (lart/ngjit) must
// DECREASE y and "down" (poshtë/zbrit) must INCREASE it, even below ground.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { DICT, STORY } from '../src/game/content.js'
import { NODE_AT, NODE_POS, PLACE_OF, PLACE_NODES } from '../src/components/nodePositions.js'
import { PLACE_META } from '../src/components/placeMeta.js'
import { REGIONS, NODE_REGION, VILLAGE_ANCHOR_IDS, isWander } from '../src/game/regions.js'
import { NPCS } from '../src/game/npcs.js'
import { npcNodeOf, TIME_PHASES } from '../src/game/gameState.js'
import { optionEffectsOf, rendezvousSpecOf } from '../src/game/stateMechanics.js'
import { WORD_CLASS, wordClassOf } from '../src/game/wordClassPolicy.js'
import {
  transitionInfo,
} from '../src/game/worldModel.js'
import {
  STRUCTURAL_EXCEPTIONS,
  STRUCTURAL_EXCEPTION_RULES,
} from '../src/game/worldStructuralExceptions.js'
import { PROJECTION_BOUNDARY_EDGES } from '../src/game/worldProjectionBoundaries.js'
import {
  auditExceptionClaimKey,
  auditExceptionFor,
  auditExceptionRegistryIssues,
  auditExceptionTargetsFor,
  auditExceptionUsageIssues,
  defineAuditExceptionRegistry,
} from './lib/audit-exceptions.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const RG = Object.fromEntries(REGIONS.map((r) => [r.key, r]))
const reg = (id) => NODE_REGION[id] || 'village'
const ids = Object.keys(STORY)
const idsOf = (toks) => (toks || []).filter((t) => t && t.id).map((t) => t.id)
const JOURNEY_MOVEMENT_IDS = new Set([
  'ec', 'shko', 'kthehu', 'zbrit', 'ngjit', 'kalo', 'hyr', 'dil', 'ik', 'vjen', 'vrapo', 'hip', 'ndiq', 'fluturo',
])
const JOURNEY_ROUTE_RELATION_IDS = new Set([
  'drejt', 'nga', 'ne', 'neper', 'tek', 'per', 'mbi', 'poshte', 'lart',
])
const GENERIC_ROUTE_NOUN_IDS = new Set(['rruge', 'udhe', 'shteg'])
const isNounSense = (id) => wordClassOf(id, DICT[id], {
  hasAttestedVariant: Boolean(DICT[id]?.forms?.length),
}) === WORD_CLASS.NOUN
const exactConditionLines = (entries, condition) => (entries || []).flatMap((entry) => {
  if (Array.isArray(entry)) return exactConditionLines(entry, condition)
  return entry?.cond === condition && Array.isArray(entry.line) ? [entry.line] : []
})
const visibleJourneyEndpointNoun = (option) => {
  const tokenIds = idsOf(option?.text)
  if (tokenIds.length < 3 || !tokenIds.some((id) => JOURNEY_MOVEMENT_IDS.has(id))) return null
  const endpointCandidates = tokenIds.flatMap((id, index) => {
    if (!JOURNEY_ROUTE_RELATION_IDS.has(id)) return []
    const noun = tokenIds.slice(index + 1, index + 4).find(isNounSense)
    return noun && !GENERIC_ROUTE_NOUN_IDS.has(noun) ? [noun] : []
  })
  return endpointCandidates.at(-1) || null
}
const lineSubstantivelyShowsArrival = (line, endpointNoun) => {
  const tokenIds = idsOf(line)
  return tokenIds.length >= 5 &&
    tokenIds.includes('ti') &&
    tokenIds.some((id) => JOURNEY_MOVEMENT_IDS.has(id)) &&
    tokenIds.includes(endpointNoun)
}
const hasAuthoredLongJourneyContract = (sourceId, option, destinationText) => {
  const endpointNoun = visibleJourneyEndpointNoun(option)
  return option?.intent === 'movement' &&
    Array.isArray(option?.playerIntents) &&
    option.playerIntents.includes('movement') &&
    Boolean(endpointNoun) &&
    exactConditionLines(destinationText, `from:${sourceId}`)
      .some((line) => lineSubstantivelyShowsArrival(line, endpointNoun))
}

// Positive-contract regression fixtures: metadata, visible route wording and
// a substantive exact-predecessor arrival are independently necessary.
const fixtureTokens = (...tokenIds) => tokenIds.map((id) => ({ id }))
const movementContractFixture = {
  intent: 'movement',
  playerIntents: ['movement'],
  text: fixtureTokens('shko', 'ne', 'fshat'),
}
const arrivalContractFixture = [{
  cond: 'from:fixture-source',
  line: fixtureTokens('ti', 'ec', 'neper', 'rruge', 'dhe', 'arrij', 'ne', 'fshat'),
}]
assert.equal(hasAuthoredLongJourneyContract(
  'fixture-source', movementContractFixture, arrivalContractFixture), true)
assert.equal(hasAuthoredLongJourneyContract('fixture-source', movementContractFixture, []), false)
assert.equal(hasAuthoredLongJourneyContract('fixture-source', {}, arrivalContractFixture), false)
assert.equal(hasAuthoredLongJourneyContract(
  'fixture-source', movementContractFixture, [{ cond: 'from:fixture-source', line: [] }]), false)
assert.equal(hasAuthoredLongJourneyContract(
  'fixture-source', movementContractFixture,
  [{ cond: 'from:fixture-source', line: fixtureTokens('ti', 'eshte', 'ketu') }]), false)
assert.equal(hasAuthoredLongJourneyContract(
  'fixture-source', { ...movementContractFixture, text: fixtureTokens('shko') }, arrivalContractFixture), false)
assert.equal(hasAuthoredLongJourneyContract(
  'fixture-source',
  { ...movementContractFixture, text: fixtureTokens('shko', 'ne', 'rruge') },
  [{ cond: 'from:fixture-source', line: fixtureTokens('ti', 'ec', 'neper', 'rruge', 'dhe', 'arrij', 'ne', 'fshat') }]), false)
assert.equal(hasAuthoredLongJourneyContract(
  'fixture-source',
  { ...movementContractFixture, text: fixtureTokens('shko', 'ne', 'qytet') },
  [{ cond: 'from:fixture-source', line: fixtureTokens('ti', 'ec', 'neper', 'rruge', 'dhe', 'arrij', 'ne', 'fshat') }]), false)
assert.equal(hasAuthoredLongJourneyContract(
  'fixture-source', movementContractFixture, [{ cond: 'from:fixture-source-nearby', line: [] }]), false)
const STRUCTURAL_EXCEPTION_REGISTRY = defineAuditExceptionRegistry({
  rules: STRUCTURAL_EXCEPTION_RULES,
  entries: STRUCTURAL_EXCEPTIONS.map((entry) => ({
    ...entry,
    evidence: `Canonical structural source: ${entry.source}`,
  })),
})
const MAP_LAYOUT_EXCEPTION_RULES = Object.freeze({
  'same-place-connectivity': { targetKind: 'place' },
  'dense-single-site': { targetKind: 'place' },
  'legacy-long-route': { targetKind: 'edge' },
  'long-wander-route': { targetKind: 'edge' },
})
const MAP_LAYOUT_EXCEPTION_REGISTRY = defineAuditExceptionRegistry({
  rules: MAP_LAYOUT_EXCEPTION_RULES,
  entries: [
    {
      id: 'river-serial-tale-place-connectivity',
      rule: 'same-place-connectivity',
      targets: ['lumi'],
      rationale: PLACE_META.lumi.continuityReason,
      evidence: 'PLACE_META.lumi happenings and PLACE_NODES.lumi pin the exact disconnected serial tale beats at the shared river site.',
      owner: 'world-map',
      reviewTrigger: 'when the river place membership, tale chronology or story edges between its happenings change',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'lower-court-serial-telling-connectivity',
      rule: 'same-place-connectivity',
      targets: ['bukura1'],
      rationale: PLACE_META.bukura1.continuityReason,
      evidence: 'PLACE_META.bukura1 happenings and PLACE_NODES.bukura1 pin the two non-overlapping tellings at one mythic court.',
      owner: 'world-map',
      reviewTrigger: 'when the lower-court place membership, tale separation or story edges between its tellings change',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'river-shared-encounter-density',
      rule: 'dense-single-site',
      targets: ['lumi'],
      rationale: PLACE_META.lumi.densityReason,
      evidence: 'PLACE_META.lumi enumerates the exact ten serial river-bank scenes grouped into six non-simultaneous happenings.',
      owner: 'world-map',
      reviewTrigger: 'when the river place gains or loses scenes, happenings or physical sub-locations',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'guest-room-evening-density',
      rule: 'dense-single-site',
      targets: ['libriDiell'],
      rationale: PLACE_META.libriDiell.densityReason,
      evidence: 'PLACE_META.libriDiell enumerates the exact guest-room scenes as separate conversations during one shared evening.',
      owner: 'world-map',
      reviewTrigger: 'when the guest-room membership, conversation grouping or physical-room model changes',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'village-square-crossroads-density',
      rule: 'dense-single-site',
      targets: ['fshatiSheshi'],
      rationale: PLACE_META.fshatiSheshi.densityReason,
      evidence: 'PLACE_META.fshatiSheshi enumerates the exact square, market, errand and coffeehouse happenings at the crossroads.',
      owner: 'world-map',
      reviewTrigger: 'when the square membership, nested interiors or crossroads layout changes',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'storm-path-encounter-density',
      rule: 'dense-single-site',
      targets: ['mali3'],
      rationale: PLACE_META.mali3.densityReason,
      evidence: 'PLACE_META.mali3 enumerates the exact successive storm encounter scenes on one exposed mountainside path.',
      owner: 'world-map',
      reviewTrigger: 'when the storm encounter, mountain path membership or choice staging changes',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'roadside-shelter-density',
      rule: 'dense-single-site',
      targets: ['udha'],
      rationale: PLACE_META.udha.densityReason,
      evidence: 'PLACE_META.udha enumerates the exact road, shelter, revenant and miser-ghost happenings at one stopping place.',
      owner: 'world-map',
      reviewTrigger: 'when the roadside membership, shelter identity or encounter sequence changes',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'inner-mill-vigil-density',
      rule: 'dense-single-site',
      targets: ['maroMulli1'],
      rationale: PLACE_META.maroMulli1.densityReason,
      evidence: 'PLACE_META.maroMulli1 enumerates all ten vigil scenes as four successive happenings on one inner millstone floor.',
      owner: 'world-map',
      reviewTrigger: 'when the mill-vigil membership, floor identity or happening groups change',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'middle-cavern-road-to-dead-city',
      rule: 'legacy-long-route',
      targets: ['shpellaRruget->qyteti'],
      rationale: 'The choice selects the middle cavern road rather than naming the dead city endpoint, while the destination demonstrates the miles-long underground passage and city arrival.',
      evidence: 'content.js shpellaRruget names the middle road and qyteti opens with the completed miles-long passage into the dead city.',
      owner: 'world-map',
      reviewTrigger: 'when the cavern choice names the city endpoint or its arrival receives an intermediate underground scene',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'gjizar-road-as-long-route-destination',
      rule: 'legacy-long-route',
      targets: ['gjizar2->gjizarUdha'],
      rationale: 'The exact choice enters the road itself as the next playable place, so its generic road noun is intentionally both route and destination rather than a named endpoint.',
      evidence: 'content.js gjizar2 offers the far road and gjizarUdha has exact predecessor prose establishing the long search along that road.',
      owner: 'world-map',
      reviewTrigger: 'when the Gjizar road gains a named endpoint, an intermediate place or different predecessor-specific arrival prose',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'forest-bridge-return-routes',
      rule: 'long-wander-route',
      targets: ['pylli1->start', 'pylliLoop->start'],
      rationale: 'Both exact forest exits visibly establish the road to the bridge before the player chooses to return or leave the forest, and the bridge scene visibly receives that arrival.',
      evidence: 'content.js pylli1 and pylliLoop name the road to the bridge; start opens with crossing back over that same bridge.',
      owner: 'world-map',
      reviewTrigger: 'when either forest exit, the bridge arrival prose or their chart coordinates change',
      scope: { kind: 'exact-targets', maximumTargets: 2 },
    },
    {
      id: 'regional-hub-backtrack-routes',
      rule: 'long-wander-route',
      targets: [
        'lumi->udhekryq',
        'deti1->lumi',
        'maliHumbur->udhekryq',
        'lumiHumbur->udhekryq',
        'botaHumbur->udhekryq',
      ],
      rationale: 'These exact backtracks name the known hub they return to, while each lost scene also visibly points toward that hub and the destination re-establishes the traveller there.',
      evidence: 'content.js pins the named return choices and the visible crossroads or river cues at every listed source and destination.',
      owner: 'world-map',
      reviewTrigger: 'when a listed hub return loses its named destination, visible route cue, arrival prose or chart position',
      scope: { kind: 'exact-targets', maximumTargets: 5 },
    },
    {
      id: 'homeward-village-return-routes',
      rule: 'long-wander-route',
      targets: ['siperfaqja->shtepia', 'udhaKthimit->shtepia', 'ktheu1->shtepia'],
      rationale: 'Each exact source presents the long road back to the village and offers a named homeward return; the destination immediately states that the traveller returned to the village.',
      evidence: 'content.js siperfaqja, udhaKthimit and ktheu1 provide the homeward choices, while shtepia names the completed return.',
      owner: 'world-map',
      reviewTrigger: 'when a homeward source, shtepia arrival, route wording or chart position changes',
      scope: { kind: 'exact-targets', maximumTargets: 3 },
    },
    {
      id: 'underworld-cave-backtrack-route',
      rule: 'long-wander-route',
      targets: ['qyteti->shpellaRruget'],
      rationale: 'The exact choice names the return to the cave, and the destination visibly says the traveller returns to the three cave roads with the same torch still burning.',
      evidence: 'content.js qyteti supplies “kthehu në shpellë”; shpellaRruget supplies the matching three-road cave arrival.',
      owner: 'world-map',
      reviewTrigger: 'when the silent-city exit, cave arrival prose or their chart positions change',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'jutbina-summit-return-routes',
      rule: 'long-wander-route',
      targets: ['jutbina->maja', 'kengaJutbina->maja'],
      rationale: 'Both exact Jutbina scenes offer a named return to the summit, one after the town hub and one after the performance where the climbing road is visible.',
      evidence: 'content.js pins both “kthehu në majë” actions and the maja destination opens by narrating the climb onto the summit.',
      owner: 'world-map',
      reviewTrigger: 'when either Jutbina return, summit arrival prose or mountain chart position changes',
      scope: { kind: 'exact-targets', maximumTargets: 2 },
    },
    {
      id: 'twins-river-return-route',
      rule: 'long-wander-route',
      targets: ['binoshetKasollja->binoshetFund'],
      rationale: 'The exact hut scene says the traveller follows the same road as Handa and then offers a named return to the river where the waiting tale conflict resumes.',
      evidence: 'content.js binoshetKasollja pins the same-road setup and “kthehu në lumi” action; binoshetFund is the river consequence.',
      owner: 'world-map',
      reviewTrigger: 'when the hut road, named river return, river consequence or chart coordinates change',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
    {
      id: 'mountain-flee-to-lost-consequences',
      rule: 'long-wander-route',
      targets: ['maliStuhi->maliHumbur', 'tomorZbritje->maliHumbur'],
      rationale: 'Both exact flee choices begin inside the same mountain storm country and resolve into the visible lost-on-the-mountain consequence rather than an unrelated remote place.',
      evidence: 'content.js keeps both sources and maliHumbur in the stormed mountain setting, with the destination explicitly hiding the road.',
      owner: 'world-map',
      reviewTrigger: 'when either flee action, lost consequence, mountain place identity or chart coordinate changes',
      scope: { kind: 'exact-targets', maximumTargets: 2 },
    },
    {
      id: 'well-descent-flee-consequence',
      rule: 'long-wander-route',
      targets: ['rrethi->botaHumbur'],
      rationale: 'The exact source visibly establishes the dark road descending into the deep well and says the traveller has begun that descent before fleeing into the lost lower-world consequence.',
      evidence: 'content.js rrethi pins the well descent immediately before “ik shpejt”; botaHumbur visibly establishes the world below.',
      owner: 'world-map',
      reviewTrigger: 'when the well descent, flee action, lower-world consequence or chart positions change',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
    },
  ],
})
let failures = 0, checks = 0
const section = (ok, title, lines = []) => {
  console.log(`${ok ? '✅' : '❌'} ${title}`)
  for (const l of lines) console.log('   ' + l)
  checks++
  if (!ok) failures++
}
const usedExceptionClaims = new Set()
const reviewedException = (rule, target) => {
  const record = auditExceptionFor(STRUCTURAL_EXCEPTION_REGISTRY, rule, target)
  if (record) usedExceptionClaims.add(auditExceptionClaimKey(rule, target))
  return record
}
const usedMapLayoutExceptionClaims = new Set()
const reviewedMapLayoutException = (rule, target) => {
  const record = auditExceptionFor(MAP_LAYOUT_EXCEPTION_REGISTRY, rule, target)
  if (record) usedMapLayoutExceptionClaims.add(auditExceptionClaimKey(rule, target))
  return record
}
const reviewedTargetsFor = (rule) => auditExceptionTargetsFor(STRUCTURAL_EXCEPTION_REGISTRY, rule)
const projectionBoundaryEdges = new Set(PROJECTION_BOUNDARY_EDGES)

// every real (non-confuser) edge, with geometry
const edges = []
for (const id of ids) for (const o of STORY[id].options || []) {
  if (o.confuser || !o.to || !STORY[o.to]) continue
  const a = NODE_POS[id], b = NODE_POS[o.to]
  if (!a || !b) continue
  edges.push({ from: id, to: o.to, o, dx: b[0] - a[0], dy: b[1] - a[1], len: Math.hypot(b[0] - a[0], b[1] - a[1]), wander: isWander(o) })
  const edge = `${id}->${o.to}`
  if (projectionBoundaryEdges.has(edge)) reviewedException('projection-boundary', edge)
}

// ---- 0. every node is placed --------------------------------------------------
const unplaced = ids.filter((id) => !NODE_POS[id] && !isUnchartedStoryNode(id))
const departureIssues = departureContextIssues(STORY)
section(!departureIssues.length, 'exact uncharted departure actions retain reviewed provenance and timing', departureIssues)
const falselyPlaced = ids.filter((id) => isUnchartedStoryNode(id) && (NODE_POS[id] || PLACE_OF[id] || NODE_REGION[id] || PLACE_META[id]))
section(!falselyPlaced.length, 'uncharted departures do not invent physical destinations', falselyPlaced)
section(!unplaced.length, `every charted story node has a map position (${ids.filter((id) => !isUnchartedStoryNode(id)).length - unplaced.length}/${ids.filter((id) => !isUnchartedStoryNode(id)).length}); ${ids.filter(isUnchartedStoryNode).length} explicitly uncharted`, unplaced.map((id) => 'UNPLACED: ' + id))

const brothersConversation = STORY.pylli1.options.find((option) => option.to === 'kordha1')
section(Boolean(brothersConversation) && PLACE_OF.pylli1 === PLACE_OF.kordha1,
  'speaking with the visible forest brothers stays at their physical scene',
  brothersConversation && PLACE_OF.pylli1 !== PLACE_OF.kordha1
    ? [`pylli1 (${PLACE_OF.pylli1}) -> kordha1 (${PLACE_OF.kordha1})`]
    : [])

// ---- 1. region containment ---------------------------------------------------
// A node should sit inside (or on the fringe of) the region the BFS assigns it.
// Exact reviewed outliers live in the shared structural-exception registry.
const outliers = []
for (const id of ids) {
  const p = NODE_POS[id], r = RG[reg(id)]
  if (!p || !r || !r.rx) continue
  const d = Math.hypot((p[0] - r.cx) / r.rx, (p[1] - r.cy) / r.ry)
  if (d > 1.35 && !reviewedException('region-containment', id)) {
    outliers.push(`${id} @ [${p}] assigned=${reg(id)} dist=${d.toFixed(2)}`)
  }
}
section(!outliers.length, 'region containment (node sits in its assigned region)', outliers)

// ---- 2. vertical language matches the map ------------------------------------
// Up-words must go up the map (dy<0), down-words down (dy>0). Same-spot and
// short hops are exempt (|dy|<=100 — local scene movement, not a journey).
const UP = new Set(['lart', 'ngjit', 'ngjitu', 'ngjitem', 'hip'])
const DOWN = new Set(['poshte', 'zbrit', 'zbres', 'zbrite'])
const vertBad = []
for (const e of edges) {
  const toks = idsOf(e.o.text)
  const up = toks.some((t) => UP.has(t)), down = toks.some((t) => DOWN.has(t))
  if (up === down || Math.abs(e.dy) <= 100) continue // no/conflicting direction, or local
  const key = `${e.from}->${e.to}`
  if (up && e.dy > 0 && !reviewedException('direction-language', key)) vertBad.push(`UP-word but goes DOWN ${e.dy}: ${e.from} -> ${e.to} ("${toks.join(' ')}")`)
  if (down && e.dy < 0 && !reviewedException('direction-language', key)) vertBad.push(`DOWN-word but goes UP ${e.dy}: ${e.from} -> ${e.to} ("${toks.join(' ')}")`)
}
section(!vertBad.length, 'vertical language (lart/ngjit up, poshtë/zbrit down)', vertBad)

// ---- 3. interaction verbs don't teleport --------------------------------------
// Talking to / listening to / taking / touching something acts on what is HERE:
// the edge must stay local. Only movement verbs may cross the map.
const INTERACT = new Set(['fol', 'degjo', 'merr', 'jep', 'prek', 'tund', 'pi', 'ha', 'beso', 'lufto', 'ndihmo', 'pyet', 'thote', 'zgjedh', 'kendo', 'luaj', 'prit', 'rri', 'fle', 'puth', 'hap', 'ndiz', 'bej', 'mbaj', 'lidh', 'pre', 'hidh', 'sheh'])
const INTERACT_MAX = 400
// Verified narrative scene-shifts (the action happens here, the STORY then
// carries you elsewhere before the next node):
//   gjumi->eaten — after the fatal struggle at the sleeping-place, the wolf
//     drags the fallen traveller to the same deep-forest den used elsewhere.
//   pemaDielli->rrugaDielli2 — you speak from the tree; the stag then carries
//     the maiden the whole road home to the village.
const farInteract = []
for (const e of edges) {
  const v = idsOf(e.o.text)[0]
  const key = `${e.from}->${e.to}`
  if (INTERACT.has(v) && e.len > INTERACT_MAX && !reviewedException('interaction-distance', key)) {
    farInteract.push(`${Math.round(e.len)} ${e.from} -> ${e.to} ("${idsOf(e.o.text).join(' ')}")`)
  }
}
section(!farInteract.length, `interaction verbs stay local (<= ${INTERACT_MAX})`, farInteract)

// ---- 4a. same spot is AUTHORED, never accidental -------------------------------
// One physical place = ONE coordinate, written once (its anchor node); everyone
// else standing there says `id: 'anchor'`. Two different anchors sharing exact
// numbers = a collision that should be either an alias or a nudge apart.
const anchorAt = {}
const collide = []
for (const [a, v] of Object.entries(NODE_AT)) {
  if (!Array.isArray(v)) continue
  const k = v[0] + ',' + v[1]
  if (anchorAt[k]) collide.push(`[${k}] '${a}' + '${anchorAt[k]}' — same spot must be authored (${a}: '${anchorAt[k]}') or nudged apart`)
  else anchorAt[k] = a
}
section(!collide.length, 'same spot is explicitly authored (no accidental coordinate collisions)', collide)

// ---- 4b. location cards match the world -----------------------------------------
// PLACE_META (the explicitly authored "what can happen here" card) must reference real
// places and real scenes: every key is a place ANCHOR, every happening node
// belongs to that place, and no node is claimed by two happenings.
const metaBad = []
for (const [anchor, meta] of Object.entries(PLACE_META)) {
  const members = PLACE_NODES[anchor]
  if (!members) { metaBad.push(`'${anchor}' is not a place anchor (see NODE_AT)`); continue }
  if ('continuityReason' in meta && (!meta.continuityReason?.trim() || meta.continuityReason.trim().length < 40)) {
    metaBad.push(`'${anchor}' has an inadequate cross-story continuity reason`)
  }
  const set = new Set(members), seen = new Set()
  for (const h of meta.happenings || []) for (const id of h.nodes) {
    if (!STORY[id]) metaBad.push(`'${anchor}' → "${h.title}": '${id}' is not a story node`)
    else if (!set.has(id)) metaBad.push(`'${anchor}' → "${h.title}": '${id}' does not stand at this place (it's at '${PLACE_OF[id] || '?'}')`)
    if (seen.has(id)) metaBad.push(`'${anchor}': '${id}' appears in two happenings`)
    seen.add(id)
  }
}
section(!metaBad.length, `location cards reference real places & scenes (${Object.keys(PLACE_META).length} authored)`, metaBad)

// ---- 4. same-spot groups are story-connected ----------------------------------
// Standing at one place MEANS "the story continues at this physical place",
// so the group must hang together through story edges — directly, or through a
// COMMON NEIGHBOUR one hop outside (siblings fanned out from a parent scene).
// A pair with no such path = nodes wrongly declared to share a spot.
const byPlace = {}
for (const id of ids) { if (!NODE_POS[id]) continue; (byPlace[PLACE_OF[id] || id] ||= []).push(id) }
const adj = {}
for (const id of ids) adj[id] = new Set()
for (const e of edges) { adj[e.from].add(e.to); adj[e.to].add(e.from) }
const splitGroups = []
const splitGroupCandidates = new Set()
for (const [k, group] of Object.entries(byPlace)) {
  if (group.length < 2) continue
  const halo = new Set(group)
  for (const id of group) for (const n of adj[id]) halo.add(n)
  const seen = new Set([group[0]]), q = [group[0]]
  while (q.length) for (const n of adj[q.pop()]) if (halo.has(n) && !seen.has(n)) { seen.add(n); q.push(n) }
  const missing = group.filter((id) => !seen.has(id))
  if (missing.length) {
    splitGroupCandidates.add(k)
    if (!reviewedMapLayoutException('same-place-connectivity', k)) {
      splitGroups.push(`@ '${k}' [${NODE_POS[k]}]: [${group.join(', ')}] — unlinked: ${missing.join(', ')}`)
    }
  }
}
section(!splitGroups.length, 'same-spot groups are story-connected', splitGroups)

// ---- 5. no stranded nodes ------------------------------------------------------
// A node whose EVERY story neighbour (in or out, wander included) is far away
// was probably dropped in the wrong place.
const STRAND_MAX = 800
const stranded = []
for (const id of ids) {
  const p = NODE_POS[id]
  if (!p || !adj[id].size) continue
  const dmin = Math.min(...[...adj[id]].map((n) => NODE_POS[n] ? Math.hypot(NODE_POS[n][0] - p[0], NODE_POS[n][1] - p[1]) : Infinity))
  if (dmin > STRAND_MAX && !reviewedException('stranded-node', id)) {
    stranded.push(`${id} @ [${p}] nearest story neighbour ${Math.round(dmin)} away`)
  }
}
section(!stranded.length, `no stranded nodes (some neighbour within ${STRAND_MAX})`, stranded)

// ---- 6. odd links (long edges) are all KNOWN journeys --------------------------
// Mirror of the debug map's ⚡ detector, REGION-BLIND: a long hop is a journey
// (or a teleport bug) whether or not it crosses a region border — the 2026-07
// village teleports (fshatiLumi->fshatiLanes, 663px across the whole town) hid
// behind an old same-region exemption. Every entry here was walked through the
// story and verified to be a real journey — a NEW one appearing means either a
// new teleport bug or a new journey to verify (then add it below).
// Inside the town walls the bar is tighter: village streets are all short, so a
// village↔village edge over 400 is a mislaid street — and there even
// wander/return edges count (walking home across town is still walking; only
// outside town does "wander" mean a narrative you-got-lost teleport). Exact
// A new long journey passes positively only when the player-owned option names
// movement and the destination contains exact predecessor-specific arrival
// prose. Older authored routes without that pair need an exact reviewed record.
const oddNew = []
const legacyLongRouteCandidates = new Set()
const longWanderRouteCandidates = new Set()
const positiveAuthoredLongJourneys = new Set()
for (const e of edges) {
  const town = reg(e.from) === 'village' && reg(e.to) === 'village'
  if (e.len <= (town ? 400 : 500)) continue
  const key = `${e.from}->${e.to}`
  if (hasAuthoredLongJourneyContract(e.from, e.o, STORY[e.to]?.text)) {
    positiveAuthoredLongJourneys.add(key)
    continue
  }
  if (reviewedException('route-distance', key)) continue
  legacyLongRouteCandidates.add(key)
  if (reviewedMapLayoutException('legacy-long-route', key)) continue
  if (e.wander) {
    longWanderRouteCandidates.add(key)
    if (reviewedException('projection-boundary', key) ||
        reviewedMapLayoutException('long-wander-route', key)) continue
  }
  oddNew.push(`${Math.round(e.len)} ${key} (${reg(e.from)} -> ${reg(e.to)}${town ? ', in-town limit 400' : ''})`)
}
section(!oddNew.length, `odd links: every long edge (>500, in-town >400) has an authored movement/arrival contract or exact review (${positiveAuthoredLongJourneys.size} positive)`, oddNew)

// ---- 7. no near-collisions -----------------------------------------------------
// Two DISTINCT places closer than 16px render as an unreadable smudge — either
// declare them the same spot (alias) or pull them apart.
const locs = Object.entries(byPlace).map(([k, v]) => { const [x, y] = NODE_POS[k]; return { x, y, v } })
const nearHits = []
for (let i = 0; i < locs.length; i++) for (let j = i + 1; j < locs.length; j++) {
  const d = Math.hypot(locs[i].x - locs[j].x, locs[i].y - locs[j].y)
  if (d > 0 && d < 16) nearHits.push(`${d.toFixed(1)} ${locs[i].v[0]} <-> ${locs[j].v[0]}`)
}
section(!nearHits.length, 'no near-collisions (distinct spots >= 16px apart)', nearHits)

// ---- 8-10. the DRAWN map matches the story (landmarks & village places) --------
// The JSX layers can't be imported under node — parse the bits we audit.
const glyphsSrc = readFileSync(join(ROOT, 'src/components/mapGlyphs.jsx'), 'utf8')
const mapSrc = readFileSync(join(ROOT, 'src/components/WorldMapView.jsx'), 'utf8')
const LANDMARKS = [...glyphsSrc.matchAll(/\{ id: '([^']+)', glyph: '(\w+)', label: [^,]+, x: (-?\d+), y: (-?\d+) \}/g)]
  .map((m) => ({ id: m[1], glyph: m[2], x: +m[3], y: +m[4] }))
section(!LANDMARKS.some((landmark) => isUnchartedStoryNode(landmark.id)), 'uncharted departures have no fixed map glyph', LANDMARKS.filter((landmark) => isUnchartedStoryNode(landmark.id)).map(({ id }) => id))
const VILLAGE_PLACE_IDS = [...mapSrc.matchAll(/^\s*\{ id: '([^']+)', x: -?\d+, y: -?\d+, type: '/gm)].map((m) => m[1])

// 8. a landmark whose id isn't a STORY node NEVER renders (the old 'ujk'/'treg' bug)
section(LANDMARKS.length > 30 && !LANDMARKS.some((lm) => !STORY[lm.id]),
  `every landmark is a real story node (${LANDMARKS.length} landmarks)`,
  LANDMARKS.filter((lm) => !STORY[lm.id]).map((lm) => `dead landmark id '${lm.id}' (${lm.glyph}) — not in STORY, it never renders`))

// 9. a landmark must draw exactly where its node lives — otherwise the glyph
// stands in one place while the node's edges/stack anchor in another.
section(!LANDMARKS.some((lm) => STORY[lm.id] && NODE_POS[lm.id] && (NODE_POS[lm.id][0] !== lm.x || NODE_POS[lm.id][1] !== lm.y)),
  'landmark position == NODE_POS (same-spot sync)',
  LANDMARKS.filter((lm) => STORY[lm.id] && NODE_POS[lm.id] && (NODE_POS[lm.id][0] !== lm.x || NODE_POS[lm.id][1] !== lm.y))
    .map((lm) => `'${lm.id}' glyph at [${lm.x},${lm.y}] but node at [${NODE_POS[lm.id]}] — sync BOTH when moving a node`))

// 10. the village's two lists (drawn places in WorldMapView, anchors in regions.js)
// are one set seen from two sides; and every drawn place is a real node.
section(!VILLAGE_PLACE_IDS.some((id) => !STORY[id])
  && !VILLAGE_ANCHOR_IDS.some((id) => !VILLAGE_PLACE_IDS.includes(id))
  && !VILLAGE_PLACE_IDS.some((id) => !VILLAGE_ANCHOR_IDS.includes(id)),
  `village places == village anchors (${VILLAGE_PLACE_IDS.length} places)`, [
    ...VILLAGE_PLACE_IDS.filter((id) => !STORY[id]).map((id) => `drawn village place '${id}' is not a STORY node`),
    ...VILLAGE_ANCHOR_IDS.filter((id) => !VILLAGE_PLACE_IDS.includes(id)).map((id) => `anchor '${id}' (regions.js) has no drawn place in WorldMapView`),
    ...VILLAGE_PLACE_IDS.filter((id) => !VILLAGE_ANCHOR_IDS.includes(id)).map((id) => `drawn place '${id}' missing from VILLAGE_ANCHOR_IDS (regions.js)`),
  ])

// ---- 11. no drift in the data files ---------------------------------------------
section(!Object.keys(NODE_POS).some((id) => !STORY[id]) && !REGIONS.some((rg) => rg.anchors.some((a) => !STORY[a])),
  'no stale placements / anchors (every NODE_POS id + region anchor is a real node)', [
    ...Object.keys(NODE_POS).filter((id) => !STORY[id]).map((id) => `stale NODE_POS entry '${id}' — node no longer in STORY`),
    ...REGIONS.flatMap((rg) => rg.anchors.filter((a) => !STORY[a]).map((a) => `region '${rg.key}' anchors missing node '${a}'`)),
  ])

// ---- 11b. whole areas may not hide in one coordinate ----------------------------
// More than eight scenes on one coordinate usually means an explorable area is
// invisible on the map. The few genuine single-site sequences are exact,
// reviewed exceptions; a new density reason in PLACE_META cannot bypass this
// check without a bounded record here.
const oversizedPlaceCandidates = new Set()
const oversizedStacks = []
for (const [place, members] of Object.entries(byPlace)) {
  if (members.length <= 8) continue
  oversizedPlaceCandidates.add(place)
  if (!reviewedMapLayoutException('dense-single-site', place)) {
    oversizedStacks.push(`${members.length} scenes share '${place}' [${NODE_POS[place]}]: ${members.join(', ')}`)
  }
}
section(!oversizedStacks.length, 'oversized coordinate stacks are exact reviewed single sites', oversizedStacks)

// ---- 12. "ketu" (here) options stay put -----------------------------------------
// "prit ketu" / "fle ketu" / "rri ketu" happen AT this spot — the edge must be
// (near-)zero length. Sharper than check 3: the word itself asserts locality.
const ketuBad = []
for (const e of edges) {
  if (idsOf(e.o.text).includes('ketu') && e.len > 150) ketuBad.push(`${Math.round(e.len)} ${e.from} -> ${e.to} ("${idsOf(e.o.text).join(' ')}")`)
}
section(!ketuBad.length, '"ketu" options stay put (<= 150)', ketuBad)

// ---- 13. named destinations land in the named region ------------------------------
// A movement/return option that NAMES a landmark noun must arrive in that noun's
// region — OR at a scene whose own text SHOWS the named thing (the village's
// river-quarter IS the lume; the drowned palace IS a kala in the sea). Only
// unambiguous nouns are mapped (qytet/pus/shpelle name two places each —
// skipped). Wander edges included: a named return still lands somewhere.
const DEST_REGION = {
  det: ['sea'], mal: ['mountain', 'sky'], lume: ['river'], pyll: ['forest'],
  qiell: ['sky'], kala: ['castle'], fshat: ['village'], liqen: ['lake'],
  jutbina: ['mountain'], maja: ['mountain', 'sky'], tomor: ['mountain', 'sky'],
}
const MOVE = new Set(['shko', 'ec', 'kthehu', 'zbrit', 'ngjit', 'kalo', 'hyr', 'vrapo', 'hip', 'ndiq'])
const nodeWords = (id) => new Set((STORY[id].text || []).flatMap((e) => idsOf(Array.isArray(e) ? e : e.line)))
const destBad = []
for (const e of edges) {
  const toks = idsOf(e.o.text)
  if (!MOVE.has(toks[0])) continue
  const shown = nodeWords(e.to)
  for (const t of toks.slice(1)) {
    const want = DEST_REGION[t]
    const key = `${e.from}->${e.to}`
    if (want && !want.includes(reg(e.to)) && !shown.has(t) && !reviewedException('named-destination', key)) {
      destBad.push(`"${toks.join(' ')}": ${e.from} -> ${e.to} lands in ${reg(e.to)}, not ${want.join('/')}, and the scene doesn't show a ${t}`)
    }
  }
}
section(!destBad.length, 'named destinations land in the named region (or the scene shows the thing)', destBad)

// ---- 14. journeys don't cut through impassable realms ------------------------------
// A walking edge between two SURFACE nodes must not pass through the core of the
// sea, the world below, or the sky — you cannot stroll through open water, solid
// rock, or the air. (Edges touching the realm itself are that realm's business.)
const IMPASSABLE = ['sea', 'underworld', 'sky']
const segDistToOrigin = (ax, ay, bx, by) => {
  const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy || 1
  const t = Math.max(0, Math.min(1, -(ax * dx + ay * dy) / L2))
  return Math.hypot(ax + t * dx, ay + t * dy)
}
const crossBad = []
for (const e of edges) {
  const a = NODE_POS[e.from], b = NODE_POS[e.to]
  for (const key of IMPASSABLE) {
    if (reg(e.from) === key || reg(e.to) === key) continue
    const r = RG[key]
    const d = segDistToOrigin((a[0] - r.cx) / r.rx, (a[1] - r.cy) / r.ry, (b[0] - r.cx) / r.rx, (b[1] - r.cy) / r.ry)
    const edgeKey = `${e.from}->${e.to}`
    if (d < 0.6 && !reviewedException('realm-crossing', edgeKey)) crossBad.push(`${e.from} -> ${e.to} cuts through the ${key} core (${d.toFixed(2)})`)
  }
}
section(!crossBad.length, 'journeys avoid impassable realm cores (sea/underworld/sky)', crossBad)

// ---- 15. land stays on land (the drawn coastline is authoritative) -----------------
// seaCoastX is EXTRACTED from WorldMapView.jsx at run time, so this check can never
// drift from the drawn coast. Any non-sea node east of the waterline is a land
// scene drawn in open water; a sea node far inland is the reverse.
const coastSrc = mapSrc.match(/const seaCoastX = \(y\) => \{([\s\S]*?)\n\}/)
const seaCoastX = coastSrc && new Function('y', coastSrc[1])
const coastBad = []
if (seaCoastX) {
  for (const id of ids) {
    const p = NODE_POS[id]
    if (!p) continue
    const coast = seaCoastX(p[1])
    if (reg(id) !== 'sea' && p[0] > coast + 40 && !reviewedException('coastline-placement', id)) {
      coastBad.push(`${id} @ [${p}] (${reg(id)}) is ${Math.round(p[0] - coast)} into open water`)
    }
    if (reg(id) === 'sea' && p[0] < coast - 150 && !reviewedException('coastline-placement', id)) {
      coastBad.push(`${id} @ [${p}] (sea) is ${Math.round(coast - p[0])} inland of the coast`)
    }
  }
}
section(!!seaCoastX && !coastBad.length, 'land nodes on land, sea nodes at sea (drawn coastline)', seaCoastX ? coastBad : ['could not extract seaCoastX from WorldMapView.jsx'])

// ---- 16. no duplicate ungated paths -------------------------------------------------
// Two options from one node to the SAME target with identical gating AND identical
// effects (grant/consume/reveal) are one choice wearing two labels (the old
// jutbina 'kerko zanat'/'kerko fuqi' bug). Differing effects = a real choice.
const dupBad = []
for (const id of ids) {
  const seen = {}
  for (const o of STORY[id].options || []) {
    if (o.confuser || !o.to || !STORY[o.to]) continue
    const effects = optionEffectsOf(o).map(({ legacy: _legacy, ...effect }) => effect)
    const key = o.to + '|' + JSON.stringify([
      o.requires ?? null,
      o.unless ?? null,
      o.time ?? null,
      o.reveal ?? null,
      o.questAction ?? null,
      effects,
    ])
    if (seen[key] && !reviewedException('duplicate-route', id)) dupBad.push(`${id}: "${idsOf(seen[key].text).join(' ')}" and "${idsOf(o.text).join(' ')}" both -> ${o.to} with identical gates+effects`)
    else seen[key] = o
  }
}
section(!dupBad.length, 'no duplicate ungated paths to one destination', dupBad)

// ---- 17. "larg" (far) lures actually point far --------------------------------------
// A scene line opening with "larg është/rri X" promises a JOURNEY; if the option
// that follows X lands within arm's reach, the lure lies about the map.
const lureBad = []
for (const id of ids) {
  const lines = (STORY[id].text || []).map((e) => (Array.isArray(e) ? e : e.line))
  const farNouns = new Set()
  for (const l of lines) {
    const t = idsOf(l)
    if (t[0] === 'larg') for (const w of t.slice(1)) if (DEST_REGION[w] || STORY[w]) farNouns.add(w)
  }
  if (!farNouns.size) continue
  for (const o of STORY[id].options || []) {
    if (o.confuser || !o.to || !STORY[o.to] || !NODE_POS[id] || !NODE_POS[o.to]) continue
    const toks = idsOf(o.text)
    if (!MOVE.has(toks[0])) continue
    const named = toks.find((t) => farNouns.has(t))
    if (!named) continue
    const len = Math.hypot(NODE_POS[o.to][0] - NODE_POS[id][0], NODE_POS[o.to][1] - NODE_POS[id][1])
    if (len < 120) lureBad.push(`${id}: says "larg … ${named}" but "${toks.join(' ')}" -> ${o.to} is only ${Math.round(len)} away`)
  }
}
section(!lureBad.length, '"larg" lures point somewhere actually far (>= 120)', lureBad)

// ---- 18. "ti je në X" prose stands where it says -----------------------------------
// A scene line asserting WHERE YOU ARE ("ti je … në <landmark>") must be drawn
// in (or on the fringe of) that landmark's region. POSITION-based, deliberately
// NOT assignment-based: prose describes where you STAND; a node's region
// assignment may legitimately differ (factoid semantics are separately reviewed).
// A line naming several landmarks passes if ANY of them fits ("një fshat të
// det" — a sea-village — passes at the coast).
const PLACE_REGION = { ...DEST_REGION, bote: ['underworld'] }
const proseBad = []
for (const id of ids) {
  const p = NODE_POS[id]
  if (!p) continue
  for (const e of STORY[id].text || []) {
    const t = idsOf(Array.isArray(e) ? e : e.line)
    if (t[0] !== 'ti' || t[1] !== 'je') continue
    const nouns = t.filter((w) => PLACE_REGION[w])
    if (!nouns.length) continue
    const ok = nouns.some((n) => PLACE_REGION[n].some((key) => {
      const r = RG[key]
      return r && r.rx && Math.hypot((p[0] - r.cx) / r.rx, (p[1] - r.cy) / r.ry) <= 1.35
    }))
    if (!ok && !reviewedException('stated-place', id)) proseBad.push(`${id} @ [${p}]: says "ti je … ${nouns.join('/')}" but stands nowhere near ${nouns.map((n) => PLACE_REGION[n].join('/')).join(', ')}`)
  }
}
section(!proseBad.length, '"ti je në X" prose stands where it says', proseBad)

// ---- 19. NPC routes walk real roads --------------------------------------------
// A walking NPC (npcs.js) moves scene to scene like the player: every route step
// (and a looping route's wrap-around) must be a real, non-confuser story edge,
// and no route node may be an ending screen. The story side is held to the same
// truth: an npc:/npcAt: condition must name a defined NPC; `npc:<id>` only fires
// where the NPC actually walks, and `npcAt:<id>:<node>` only at route nodes.
const npcBad = []
const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a }
const lcm = (a, b) => Math.abs(a * b) / gcd(a, b)
const npcVisibleNodes = {}
for (const [nid, npc] of Object.entries(NPCS)) {
  if (!npc.name?.trim() || !npc.glyph?.trim()) npcBad.push(`${nid}: missing player-facing name or glyph`)
  if (!Array.isArray(npc.route) || npc.route.length === 0) npcBad.push(`${nid}: route must contain at least one scene`)
  if (!Number.isInteger(npc.stepHours) || npc.stepHours <= 0) npcBad.push(`${nid}: stepHours must be a positive whole number`)
  if (npc.activePhases && (
    new Set(npc.activePhases).size !== npc.activePhases.length ||
    npc.activePhases.some((phase) => !TIME_PHASES.includes(phase))
  )) npcBad.push(`${nid}: activePhases contains an unknown or repeated phase`)
  if (npc.settlesAt != null && (!npc.once || npc.settlesAt !== npc.route.at(-1))) {
    npcBad.push(`${nid}: settlesAt must belong to a one-shot route and equal its final walked stop`)
  }
  for (const r of npc.route) {
    if (!STORY[r]) npcBad.push(`${nid}: route node '${r}' is not a STORY node`)
    else if (STORY[r].end) npcBad.push(`${nid}: route node '${r}' is an ending screen`)
  }
  const steps = npc.once ? npc.route.length - 1 : npc.route.length
  for (let i = 0; i < steps; i++) {
    const a = npc.route[i], b = npc.route[(i + 1) % npc.route.length]
    if (STORY[a] && STORY[b] && a !== b) {
      const option = STORY[a].options.find((candidate) => !candidate.confuser && candidate.to === b)
      if (!option) npcBad.push(`${nid}: ${a} -> ${b} is not a story edge — NPCs walk the real roads`)
      else if (transitionInfo(a, option).hours > npc.stepHours) {
        npcBad.push(`${nid}: ${a} -> ${b} needs ${transitionInfo(a, option).hours}h but its timetable allows ${npc.stepHours}h`)
      }
    }
  }

  if (!npc.once && npc.route.length && Number.isInteger(npc.stepHours) && npc.stepHours > 0) {
    // The daily phase mask and route loop may have different periods (the
    // wedding train is a 14-hour loop). Sample their least common multiple so
    // every real phase/position pairing is observed rather than assuming day 1.
    const period = lcm(24, npc.route.length * npc.stepHours)
    const visible = new Set()
    for (let clock = 0; clock < period; clock++) {
      const node = npcNodeOf({ clock, npcStarted: {} }, nid)
      if (node) visible.add(node)
    }
    npcVisibleNodes[nid] = visible
    for (const node of new Set(npc.route)) if (!visible.has(node)) {
      npcBad.push(`${nid}: '${node}' is in the route but can never occur during an active phase`)
    }
  }
}
const npcConds = []
const rendezvousIds = new Set()
for (const id of ids) {
  for (const e of STORY[id].text || []) if (!Array.isArray(e)) {
    for (const c of [].concat(e.cond || [], e.none || [])) npcConds.push([id, c])
  }
  for (const o of STORY[id].options || []) {
    const starts = o.startsNpc == null ? [] : Array.isArray(o.startsNpc) ? o.startsNpc : [o.startsNpc]
    if (starts.length !== new Set(starts).size) npcBad.push(`${id}: option repeats an option-level NPC start`)
    for (const npcId of starts) {
      if (!NPCS[npcId]) npcBad.push(`${id}: option starts unknown NPC '${npcId}'`)
      else if (!NPCS[npcId].once) npcBad.push(`${id}: option starts '${npcId}', but only one-shot journeys can be started`)
    }
    const rendezvous = rendezvousSpecOf(o)
    if (rendezvous === false) npcBad.push(`${id}: option has malformed rendezvous metadata`)
    else if (rendezvous) {
      if (rendezvousIds.has(rendezvous.id)) {
        npcBad.push(`${id}: rendezvous id '${rendezvous.id}' is scheduled by more than one option`)
      }
      rendezvousIds.add(rendezvous.id)
      const npc = NPCS[rendezvous.npcId]
      if (!npc) npcBad.push(`${id}: rendezvous '${rendezvous.id}' names unknown NPC '${rendezvous.npcId}'`)
      else if (!npc.route.includes(rendezvous.placeId) && npc.settlesAt !== rendezvous.placeId) {
        npcBad.push(`${id}: rendezvous '${rendezvous.id}' promises '${rendezvous.placeId}', where ${rendezvous.npcId} can never stand`)
      }
      if (!STORY[rendezvous.placeId]) {
        npcBad.push(`${id}: rendezvous '${rendezvous.id}' names unknown place '${rendezvous.placeId}'`)
      }
    }
    for (const c of [o.requires, o.unless].flatMap((v) => (v == null ? [] : [].concat(v)))) npcConds.push([id, c])
  }
}
for (const [id, c] of npcConds) {
  if (typeof c === 'string' && c.startsWith('rendezvous:')) {
    const condition = c.slice('rendezvous:'.length)
    const separator = condition.lastIndexOf(':')
    const rendezvousId = separator > 0 ? condition.slice(0, separator) : ''
    const status = separator > 0 ? condition.slice(separator + 1) : ''
    if (!rendezvousIds.has(rendezvousId)) npcBad.push(`${id}: '${c}' names an unscheduled rendezvous`)
    if (!['scheduled', 'waiting', 'on-time', 'late', 'missed', 'fulfilled'].includes(status)) {
      npcBad.push(`${id}: '${c}' names unknown rendezvous status '${status}'`)
    }
    continue
  }
  if (typeof c !== 'string' || !(c.startsWith('npc:') || c.startsWith('npcAt:'))) continue
  const [kind, nid, nodes] = c.split(':')
  const npc = NPCS[nid]
  if (!npc) { npcBad.push(`${id}: '${c}' names an undefined NPC '${nid}' (npcs.js)`); continue }
  if (kind === 'npc' && !npc.route.includes(id))
    npcBad.push(`${id}: '${c}' can never fire — ${nid} never walks through '${id}'`)
  else if (kind === 'npc' && npcVisibleNodes[nid] && !npcVisibleNodes[nid].has(id))
    npcBad.push(`${id}: '${c}' is on the route but always falls outside ${nid}'s active phases`)
  if (kind === 'npcAt') for (const nd of (nodes || '').split('|')) {
    if (!STORY[nd]) npcBad.push(`${id}: '${c}' names missing node '${nd}'`)
    else if (!npc.route.includes(nd)) npcBad.push(`${id}: '${c}' — ${nid} never visits '${nd}'`)
    else if (npcVisibleNodes[nid] && !npcVisibleNodes[nid].has(nd)) npcBad.push(`${id}: '${c}' names a route stop that is always offstage`)
  }
}
section(!npcBad.length, `NPC routes walk real roads & npc conditions can fire (${Object.keys(NPCS).length} NPCs)`, npcBad)

// ---- DEPARTURE TRUTHFULNESS (story-design-taste rule 17) ----------------------
// A moment-scene AT a place must not exit with «kthehu në/te <place>» when the
// edge lands at the SAME map spot — "return to X" is a lie when you never left X.
// Relabel with the gesture that ends the moment (lër <person> / dil nga <thing> /
// shiko <the danger> / pyet përsëri / thuaj: faleminderit|mirupafshim / rri / zbrit)
// and SHOW the gesture's premise in the scene text (pusiGuri narrates the
// down-stare "ti shikon poshtë në pus" so «shiko lart» isn't sky-gazing).
// Bare «kthehu» (turn back — names no place) is honest and allowed.
const retBad = []
for (const e of edges) {
  const t = idsOf(e.o.text)
  if (t[0] !== 'kthehu' || t.length === 1) continue
  if (PLACE_OF[e.from] !== PLACE_OF[e.to]) continue
  if (reviewedException('same-place-return', `${e.from}->${e.to}`)) continue
  retBad.push(`${e.from} -> ${e.to}: «kthehu …» but both stand at '${PLACE_OF[e.from]}' — you never left; relabel with the moment-ending gesture or add an exact reviewed exception`)
}
section(!retBad.length, `departure truthfulness: no same-spot «kthehu <place>» exits (${reviewedTargetsFor('same-place-return').length} reviewed)`, retBad)

// ---- shared exception-registry integrity -------------------------------------
// All records must be well formed, exact and actually consumed by the rule they
// claim to relax. This catches deleted targets, duplicate sanctions, copied
// broad scopes and exceptions whose underlying violation disappeared.
const liveStructuralEdges = new Set(Object.entries(STORY).flatMap(([from, node]) =>
  (node.options || [])
    .filter((option) => !option.confuser && option.to && STORY[option.to])
    .map((option) => `${from}->${option.to}`)))
const validStructuralTargetsByRule = Object.fromEntries(
  Object.entries(STRUCTURAL_EXCEPTION_RULES).map(([rule, definition]) => [
    rule,
    definition.targetKind === 'node' ? new Set(ids) : liveStructuralEdges,
  ]),
)
const registeredProjectionBoundaries = [...reviewedTargetsFor('projection-boundary')].sort()
const runtimeProjectionBoundaries = [...PROJECTION_BOUNDARY_EDGES].sort()
const exceptionIssues = [
  ...auditExceptionRegistryIssues(STRUCTURAL_EXCEPTION_REGISTRY, {
    validTargetsByRule: validStructuralTargetsByRule,
  }),
  ...auditExceptionUsageIssues(
    STRUCTURAL_EXCEPTION_REGISTRY,
    usedExceptionClaims,
    Object.keys(STRUCTURAL_EXCEPTION_RULES),
  ),
  ...(JSON.stringify(registeredProjectionBoundaries) === JSON.stringify(runtimeProjectionBoundaries)
    ? []
    : ['projection-boundary: runtime edges differ from the reviewed structural exception targets']),
  ...auditExceptionRegistryIssues(MAP_LAYOUT_EXCEPTION_REGISTRY, {
    validTargetsByRule: {
      'same-place-connectivity': splitGroupCandidates,
      'dense-single-site': oversizedPlaceCandidates,
      'legacy-long-route': legacyLongRouteCandidates,
      'long-wander-route': longWanderRouteCandidates,
    },
  }),
  ...auditExceptionUsageIssues(
    MAP_LAYOUT_EXCEPTION_REGISTRY,
    usedMapLayoutExceptionClaims,
    Object.keys(MAP_LAYOUT_EXCEPTION_RULES),
  ),
]
section(!exceptionIssues.length,
  `reviewed structural exceptions are valid, bounded and live (${usedExceptionClaims.size + usedMapLayoutExceptionClaims.size} exact claims)`,
  exceptionIssues)

console.log(failures ? `\n❌ ${failures} map check(s) failing` : `\n✅ all ${checks} map checks pass — also run: node scripts/audit.mjs`)
process.exitCode = failures ? 1 : 0
