// First-encounter character portraits are metadata-driven and vocabulary-
// bearing. This gate verifies every declared portrait and prints the broader
// NPC catalog as an explicit, area-split editorial backlog instead of forcing
// generic descriptions onto figures who have not yet received a scene review.

import assert from 'node:assert/strict'
import { readdir } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'
import { STORY, lineOf } from '../src/game/content.js'
import { DICT } from '../src/game/dictionary.js'
import {
  NPC_FIRST_ENCOUNTERS,
  normalizeNpcDepiction,
  normalizeActiveNpcPortraits,
  normalizeNpcPortraitsSeen,
  planNpcFirstEncounterLines,
  projectNpcFirstEncounterLines,
} from '../src/game/npcAppearance.js'
import { npcDepictionIssues } from '../src/game/npcDepictionValidation.js'
import { rendezvousAvailability, scheduleRendezvous } from '../src/game/stateMechanics.js'
import { albanianTextOf } from '../src/game/language.js'
import {
  hasCond,
  newRun,
  normalizeSavedState,
  npcFirstEncounterPlanForState,
  reducer,
  storyScenePresentationForState,
} from '../src/game/gameState.js'

const root = resolve(import.meta.dirname, '../src/game/data/npcs')
const files = (await readdir(root)).filter((name) => name.endsWith('.js')).sort()
const catalogs = new Map()
const npcOwners = new Map()

for (const file of files) {
  const entries = (await import(pathToFileURL(resolve(root, file)))).default
  catalogs.set(file, entries)
  for (const [npcId, npc] of Object.entries(entries)) {
    assert.ok(!npcOwners.has(npcId), `${npcId}: duplicated in ${npcOwners.get(npcId)} and ${file}`)
    npcOwners.set(npcId, file)
    const encounters = npc.location?.encounters || []
    assert.equal(new Set(encounters).size, encounters.length, `${npcId}: duplicate declared encounter scene`)
    const canonicalNodes = new Set([
      npc.location?.node,
      ...(npc.location?.route || []),
    ].filter(Boolean))
    for (const nodeId of encounters) {
      assert.ok(STORY[nodeId], `${npcId}: declared encounter scene ${nodeId} does not exist`)
      assert.ok(!canonicalNodes.has(nodeId), `${npcId}: ${nodeId} is already a canonical location; do not duplicate it in encounters`)
    }
  }
}

// Load every independently owned portrait partition before consulting the one
// shared registry. This mirrors import.meta.glob in npcAppearanceRegistry.js,
// while keeping Node audits independent of Vite.
const appearanceRoot = resolve(import.meta.dirname, '../src/game/data/npcAppearances')
const appearanceFiles = (await readdir(appearanceRoot)).filter((name) => name.endsWith('.js')).sort()
for (const file of appearanceFiles) await import(pathToFileURL(resolve(appearanceRoot, file)))

assert.ok(Object.keys(NPC_FIRST_ENCOUNTERS).length > 0, 'no first-encounter portraits are registered')
const depictedTales = {}
for (const spec of Object.values(NPC_FIRST_ENCOUNTERS)) {
  const id = spec.depiction?.taleId
  if (id && !depictedTales[id]) {
    const tale = (await import(pathToFileURL(resolve(root, '../tales', `${id}.js`)))).default
    assert.equal(tale.id, id, `${id}: narrated tale file names another source`)
    depictedTales[id] = tale
  }
}

for (const spec of Object.values(NPC_FIRST_ENCOUNTERS)) {
  const owner = npcOwners.get(spec.npcId)
  const npc = owner && catalogs.get(owner)?.[spec.npcId]
  assert.ok(npc, `${spec.npcId}: portrait refers to no registered NPC`)
  assert.equal(spec.sourcePartition, owner.replace(/\.js$/, ''),
    `${spec.npcId}: portrait partition must match its NPC source file ${owner}`)
  const node = STORY[spec.nodeId]
  assert.ok(node, `${spec.npcId}: portrait node ${spec.nodeId} does not exist`)
  if (spec.depiction) {
    assert.deepEqual(npcDepictionIssues(spec, npc, depictedTales, STORY), [],
      `${spec.npcId}: narrated portrait lost its source/identity/place join`)
    for (const { line } of spec.portraitLines) {
      assert.match(albanianTextOf(line), /^Në këngë, /,
        `${spec.npcId}: narrated portrait reads as physical presence in the listener's room`)
    }
  } else if (npc.location.status === 'placed') {
    assert.ok(npc.location.node === spec.nodeId || (npc.location.encounters || []).includes(spec.nodeId),
      `${spec.npcId}: portrait node must be the NPC's canonical placed node or declared encounter scene`)
  } else if (npc.location.status === 'walking') {
    assert.ok(npc.location.route.includes(spec.nodeId) || (npc.location.encounters || []).includes(spec.nodeId),
      `${spec.npcId}: portrait node must lie on the NPC's canonical walking route or declared encounter scene`)
  }

  let entries
  if (spec.embedded) {
    entries = node.text.filter((entry) => entry.npcAppearance?.npcId === spec.npcId)
    assert.ok(entries.length > 0, `${spec.npcId}: no embedded line uses its portrait contract`)
  } else {
    assert.ok(spec.placement.lineIndex < node.text.length,
      `${spec.npcId}: portrait placement is outside ${spec.nodeId}`)
    const sourceLines = node.text.map(lineOf)
    entries = spec.portraitLines.map((variant) => ({ line: variant.line }))
    for (const variant of spec.portraitLines) {
      const identityCondition = `knows:npcName:${spec.npcId}`
      const truths = new Set(variant.required)
      if (variant.known === true) truths.add(identityCondition)
      if (spec.presence === 'runtime') truths.add(`npc:${spec.npcId}`)
      const has = (id) => truths.has(id)
      const firstVisit = projectNpcFirstEncounterLines(node, sourceLines, has)
      assert.ok(firstVisit.includes(variant.line),
        `${spec.npcId}: unseen encounter does not expose its reviewed variant`)
      const firstPlan = planNpcFirstEncounterLines(node, sourceLines, has)
      const committedEncounter = projectNpcFirstEncounterLines(
        node,
        sourceLines,
        has,
        firstPlan.nextSeen,
        firstPlan.nextActive,
      )
      assert.ok(committedEncounter.includes(variant.line),
        `${spec.npcId}: portrait vanished as soon as its seen ledger committed`)
      const revisit = projectNpcFirstEncounterLines(node, sourceLines, has, firstPlan.nextSeen, null)
      assert.ok(!revisit.includes(variant.line), `${spec.npcId}: projected portrait repeats on return`)
      if (spec.presence === 'runtime') {
        const absentHas = (id) => id !== `npc:${spec.npcId}` && truths.has(id)
        const absentPlan = planNpcFirstEncounterLines(node, sourceLines, absentHas)
        assert.ok(!absentPlan.lines.includes(variant.line),
          `${spec.npcId}: runtime portrait appears while the NPC is absent`)
        assert.equal(absentPlan.nextSeen[spec.npcId], undefined,
          `${spec.npcId}: absence incorrectly consumed the first real portrait`)
      }
      if (variant.known === false) {
        assert.ok(!variant.line.some((token) =>
          token.id === spec.npcId || token.al?.toLowerCase() === npc.name?.toLowerCase()),
        `${spec.npcId}: anonymous portrait leaks the proper name`)
      }
    }
  }

  const usedIds = new Set(entries.flatMap((entry) =>
    lineOf(entry).filter((token) => token.id).map((token) => token.id)))
  for (const wordId of spec.practicalWordIds) {
    assert.ok(DICT[wordId], `${spec.npcId}: unknown practical portrait word ${wordId}`)
    assert.ok(usedIds.has(wordId), `${spec.npcId}: portrait declares but does not use ${wordId}`)
  }
  for (const entry of entries) {
    if (spec.embedded) {
      assert.ok([].concat(entry.none || []).includes('again'),
        `${spec.npcId}: embedded first-encounter portrait repeats on return`)
    }
    assert.ok(lineOf(entry).filter((token) => token.id).length <= 30,
      `${spec.npcId}: first portrait is too dense for an introductory beat`)
    if (entry.npcIdentity?.known === false) {
      assert.ok(!lineOf(entry).some((token) => token.id === 'miraEmri'),
        `${spec.npcId}: anonymous portrait leaks the proper name`)
    }
  }
}

assert.deepEqual(normalizeNpcPortraitsSeen({ bari: true, no: false, '__proto__': true }), { bari: true })
assert.deepEqual(
  normalizeActiveNpcPortraits({ nodeId: 'bariu', npcIds: ['bari', 'bari', 'not-seen'] }, { bari: true }),
  { nodeId: 'bariu', npcIds: ['bari'] },
)
assert.equal(normalizeActiveNpcPortraits({ nodeId: '../bad', npcIds: ['bari'] }, { bari: true }), null)

// These three people move on the living clock. Visiting their meeting place
// while they are elsewhere must not consume the portrait; the first real
// encounter does. The active latch survives a reload in place, departure
// clears it, and neither revisit nor a new story run repeats the introduction.
const movingPortraitCases = [
  { npcId: 'plakaPyllit', nodeId: 'pylliLoop', absentClock: 3, presentClock: 21 },
  { npcId: 'plakuSheshit', nodeId: 'fshatiSheshi', absentClock: 13, presentClock: 3 },
  { npcId: 'bari', nodeId: 'bariu', absentClock: 0, presentClock: 3 },
]
const projectedPortraitIds = (plan) => plan.lines
  .map((line) => line.npcAppearance?.npcId)
  .filter(Boolean)
const clearNodeId = Object.keys(STORY).find((nodeId) =>
  !STORY[nodeId].end && !Object.values(NPC_FIRST_ENCOUNTERS)
    .some((spec) => !spec.embedded && spec.nodeId === nodeId))
assert.ok(clearNodeId, 'portrait audit needs a scene with no projected first encounter')

for (const { npcId, nodeId, absentClock, presentClock } of movingPortraitCases) {
  let state = normalizeSavedState({
    ...newRun(),
    nodeId,
    clock: absentClock,
    familiar: true,
    visited: { [nodeId]: true },
    turn: 10,
  }, newRun())
  const absentPlan = npcFirstEncounterPlanForState(state)
  assert.ok(!projectedPortraitIds(absentPlan).includes(npcId),
    `${npcId}: portrait appears on an absent first location visit`)
  assert.equal(absentPlan.nextSeen[npcId], undefined,
    `${npcId}: absent location visit consumed the portrait`)
  assert.strictEqual(
    reducer(state, { type: 'NARRATE_NPC_APPEARANCES', nodeId, turn: state.turn }),
    state,
    `${npcId}: absent encounter caused a ledger write`,
  )

  state = { ...state, clock: presentClock, turn: state.turn + 1 }
  const firstEncounter = npcFirstEncounterPlanForState(state)
  assert.ok(projectedPortraitIds(firstEncounter).includes(npcId),
    `${npcId}: first real encounter omitted the portrait`)
  state = reducer(state, { type: 'NARRATE_NPC_APPEARANCES', nodeId, turn: state.turn })
  assert.equal(state.npcPortraitsSeen[npcId], true, `${npcId}: first portrait was not persisted`)
  assert.deepEqual(state.activeNpcPortraits, { nodeId, npcIds: [npcId] },
    `${npcId}: first portrait has no stable current-encounter latch`)
  assert.ok(projectedPortraitIds(npcFirstEncounterPlanForState(state)).includes(npcId),
    `${npcId}: portrait disappeared immediately after its reducer commit`)

  state = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
  assert.ok(projectedPortraitIds(npcFirstEncounterPlanForState(state)).includes(npcId),
    `${npcId}: reload in the same encounter lost the visible portrait`)

  state = { ...state, nodeId: clearNodeId, turn: state.turn + 1 }
  state = reducer(state, {
    type: 'NARRATE_NPC_APPEARANCES',
    nodeId: clearNodeId,
    turn: state.turn,
  })
  assert.equal(state.activeNpcPortraits, null, `${npcId}: departure did not close the encounter latch`)

  state = { ...state, nodeId, clock: presentClock, turn: state.turn + 1 }
  assert.ok(!projectedPortraitIds(npcFirstEncounterPlanForState(state)).includes(npcId),
    `${npcId}: portrait repeated on revisit`)
  state = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
  assert.ok(!projectedPortraitIds(npcFirstEncounterPlanForState(state)).includes(npcId),
    `${npcId}: portrait repeated after revisit reload`)
  const reset = reducer({ ...state, hearts: 0 }, { type: 'RESET' })
  assert.equal(reset.npcPortraitsSeen[npcId], true, `${npcId}: story restart forgot the first encounter`)
  assert.equal(reset.activeNpcPortraits, null, `${npcId}: story restart retained an active encounter`)
}

// Narrated identities are remembered without becoming physical occupants of
// the listening room. Test the complete normal composition and real latch.
const normalLines = (state) => storyScenePresentationForState(state).normalEntries.map(({ line }) => line)
const normalText = (state) => normalLines(state).map(albanianTextOf).join('\n')
const rememberPortraits = (state) => reducer(state, {
  type: 'NARRATE_NPC_APPEARANCES', nodeId: state.nodeId, turn: state.turn,
})
const reloadPortraits = (state) => normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
const narratedIds = ['budAlineTali', 'gjarpriShtratit', 'ujkuBesnik']
const healthyHome = { ...newRun(), nodeId: 'mujo1', clock: 9 }
assert.doesNotMatch(normalText(healthyHome), /gjarpër|ujku|shtratit|plagët/, 'healthy Mujo household gained sickbed guardians')
assert.match(normalText(healthyHome), /ngre një gur të madh/, 'healthy Mujo portrait lost its established physical action')
let sickbed = { ...newRun(), nodeId: 'mujoHak1', clock: 9 }
const bedLine = lineOf(STORY.mujoHak1.text[3])
const firstSickbed = normalLines(sickbed)
assert.match(albanianTextOf(bedLine), /dhjetë plagë.*ende i gjallë.*shtrat/, 'guardian insertion lost its persistent sickbed anchor')
for (const npcId of narratedIds) {
  const spec = NPC_FIRST_ENCOUNTERS[npcId]
  const portrait = firstSickbed.find((line) => line.npcAppearance?.npcId === npcId)
  assert.ok(portrait, `${npcId}: narrated portrait is absent from normal story composition`)
  assert.deepEqual(portrait.npcAppearance.depiction, spec.depiction, `${npcId}: projection dropped narration scope`)
  assert.equal(hasCond(sickbed, `npc:${npcId}`), false, `${npcId}: narrated exposure granted physical NPC presence`)
  if (npcId !== 'budAlineTali') assert.ok(firstSickbed.indexOf(bedLine) < firstSickbed.indexOf(portrait),
    `${npcId}: guardian appears before the wounded bed is established`)
}
sickbed = rememberPortraits(sickbed)
for (const state of [sickbed, reloadPortraits(sickbed)]) {
  for (const npcId of narratedIds) {
    assert.equal(state.npcPortraitsSeen[npcId], true)
    assert.ok(normalLines(state).some((line) => line.npcAppearance?.npcId === npcId), `${npcId}: narrated portrait disappears after commit/reload`)
    assert.equal(hasCond(state, `npc:${npcId}`), false, `${npcId}: persisted depiction became physical presence`)
  }
}
const leftSickbed = rememberPortraits({ ...sickbed, nodeId: clearNodeId, turn: sickbed.turn + 1 })
const revisitedSickbed = reloadPortraits({ ...leftSickbed, nodeId: 'mujoHak1', turn: leftSickbed.turn + 1 })
assert.ok(normalLines(revisitedSickbed).every((line) => !narratedIds.includes(line.npcAppearance?.npcId)),
  'narrated portraits repeated on a later visit')
const oldWrongLatch = reloadPortraits({ ...sickbed, nodeId: 'mujo1', activeNpcPortraits: {
  nodeId: 'mujo1', npcIds: ['gjarpriShtratit', 'ujkuBesnik'],
} })
assert.doesNotMatch(normalText(oldWrongLatch), /gjarpër|ujku|shtratit|plagët/, 'legacy wrong-room latch resurrected the moved guardians')

const serpent = NPC_FIRST_ENCOUNTERS.gjarpriShtratit
const serpentNpc = catalogs.get(npcOwners.get(serpent.npcId))[serpent.npcId]
assert.equal(serpentNpc.location.node, 'mujo1', 'narrated guardian was physically relocated to the listening room')
assert.equal(catalogs.get(npcOwners.get('ujkuBesnik')).ujkuBesnik.location.node, 'mujo1')
assert.equal(catalogs.get(npcOwners.get('budAlineTali')).budAlineTali.location.node, 'mali1', 'Tali lost his sourced Kunora anchor')
for (const depiction of [
  { ...serpent.depiction, kind: 'physical' },
  { ...serpent.depiction, region: 'village' },
  { ...serpent.depiction, beatIds: [] },
  { ...serpent.depiction, beatIds: ['guardians', 'guardians'] },
]) assert.throws(() => normalizeNpcDepiction(depiction), /Invalid NPC narrated depiction/)
for (const changed of [
  { ...serpent, nodeId: 'mujo1' },
  { ...serpent, presence: 'authored' },
  { ...serpent, npcId: 'bari' },
  { ...serpent, depiction: { ...serpent.depiction, taleId: 'missing-tale' } },
  { ...serpent, depiction: { ...serpent.depiction, placeId: 'kunora' } },
  { ...serpent, depiction: { ...serpent.depiction, beatIds: ['missing-beat'] } },
  { ...serpent, depiction: { ...serpent.depiction, beatIds: ['missingMujo'] } },
]) assert.ok(npcDepictionIssues(changed, serpentNpc, depictedTales, STORY).length,
  'a corrupted narrated identity/source/place join passed validation')
assert.ok(npcDepictionIssues(serpent, { ...serpentNpc, location: { status: 'placed', node: 'mujoHak1' } }, depictedTales, STORY).length,
  'moving the catalogue home into the listener room passed validation')

// Ymer's mother belongs to the narrated spring at still-unbuilt source Ulqin.
// Neither its nearby map proposal nor the listener's room locates her body.
const ymerMother = NPC_FIRST_ENCOUNTERS.nenaYmerit
const ymerMotherNpc = catalogs.get(npcOwners.get('nenaYmerit')).nenaYmerit
assert.equal(ymerMotherNpc.location.status, 'planning')
assert.equal(ymerMotherNpc.location.node, undefined)
assert.equal(ymerMother.depiction.placeId, 'ulqin')
assert.equal(depictedTales['aga-ymer'].places.find(({ id }) => id === 'ulqin').anchor.status, 'proposed')
let ymerNarration = { ...newRun(), nodeId: 'agaYmer1', clock: 9 }
assert.match(normalText(ymerNarration), /Në këngë, nëna e tij.*burimi.*nuk e njeh birin/)
ymerNarration = rememberPortraits(ymerNarration)
for (const state of [ymerNarration, reloadPortraits(ymerNarration)]) {
  assert.ok(normalLines(state).some((line) => line.npcAppearance?.npcId === 'nenaYmerit'))
  assert.equal(hasCond(state, 'npc:nenaYmerit'), false, 'narration created a physical mother in the room')
}
const leftYmer = rememberPortraits({ ...ymerNarration, nodeId: clearNodeId, turn: ymerNarration.turn + 1 })
const revisitedYmer = reloadPortraits({ ...leftYmer, nodeId: 'agaYmer1', turn: leftYmer.turn + 1 })
assert.ok(normalLines(revisitedYmer).every((line) => line.npcAppearance?.npcId !== 'nenaYmerit'))
for (const location of [
  { status: 'placed', node: 'agaYmer1' },
  { status: 'placed', node: 'kalaRozafa' },
  { status: 'planning', plan: '' },
  { ...ymerMotherNpc.location, node: 'agaYmer1' },
  { ...ymerMotherNpc.location, encounters: ['agaYmer1'] },
  { ...ymerMotherNpc.location, route: [] },
]) assert.ok(npcDepictionIssues(ymerMother, { ...ymerMotherNpc, location }, depictedTales, STORY).length,
  'an unlocated narrated identity borrowed physical geometry')
for (const depiction of [
  { ...ymerMother.depiction, placeId: 'captivity' },
  { ...ymerMother.depiction, beatIds: ['dungeon'] },
]) assert.ok(npcDepictionIssues({ ...ymerMother, depiction }, ymerMotherNpc, depictedTales, STORY).length,
  'the unlocated mother lost her exact source spring beat')

let woundedMujo = { ...newRun(), nodeId: 'gbMuji1', clock: 9 }
const woundLine = lineOf(STORY.gbMuji1.text[2])
const woundedLines = normalLines(woundedMujo)
const companionLine = woundedLines.find((line) => line.npcAppearance?.npcId === 'arnautOsmaniMejdanit')
assert.ok(woundedLines.includes(woundLine), 'Osmani portrait replaced the original attack and fall')
assert.match(albanianTextOf(woundLine), /armik.*godet nëntë herë.*dy pemë/, 'source wound/twin-tree event changed')
assert.ok(woundedLines.indexOf(companionLine) > woundedLines.indexOf(woundLine), 'Osmani appears before the wound event')
assert.match(albanianTextOf(companionLine), /shoku yt.*vjen pranë teje/, 'Osmani is not introduced as the arriving companion')
assert.doesNotMatch(albanianTextOf(companionLine), /godet|nëntë herë/, 'portrait names Osmani as the attacker')
woundedMujo = rememberPortraits(woundedMujo)
assert.ok(normalLines(reloadPortraits(woundedMujo)).includes(woundLine), 'committed/reloaded portrait erased the wound event')
assert.ok(normalLines({ ...woundedMujo, activeNpcPortraits: null }).includes(woundLine), 'seen portrait erased the source event on revisit')

const coast = { ...newRun(), nodeId: 'bregu', clock: 9,
  observations: { 'coast-tower': { nodeId: 'bregu', atClock: 9 } } }
const heroSeen = rememberPortraits(coast)
assert.ok(normalLines(heroSeen).some((line) => line.npcAppearance?.npcId === 'gjergjElez'), 'before victory the observed hero is missing')
for (const input of [coast, heroSeen]) {
  const won = { ...input, worldFacts: { coastalBalozDefeated: { atClock: 9, source: 'balozFitore' } } }
  for (const state of [won, reloadPortraits(won)]) {
    assert.ok(normalLines(state).every((line) => line.npcAppearance?.npcId !== 'gjergjElez'), 'victory resurrected an unseen/active hero portrait')
    assert.doesNotMatch(normalText(state), /motër jep ujë|flokët e motrës|nëntë plagë/, 'returned coast retained the living siblings')
    assert.match(normalText(state), /Trimi dhe motra e tij janë në një varr\./, 'returned coast lost the shared grave')
  }
}

// Giving the existing sea-road traveller a runtime identity must not expand
// his visible first beat or resurrect the old meeting after he has departed.
const roadPortrait = NPC_FIRST_ENCOUNTERS.seaRoadTraveller
assert.equal(albanianTextOf(roadPortrait.portraitLines[0].line), albanianTextOf(lineOf(STORY.qytetiUdhetar.text[3])))
assert.deepEqual(roadPortrait.portraitLines[0].line.map(({ id, al }) => ({ id, al })),
  lineOf(STORY.qytetiUdhetar.text[3]).map(({ id, al }) => ({ id, al })), 'traveller voice changed its canonical senses')
let roadMeeting = { ...newRun(), nodeId: 'qytetiUdhetar', clock: 9 }
assert.ok(normalLines(roadMeeting).some((line) => line.npcAppearance?.npcId === 'seaRoadTraveller'))
roadMeeting = rememberPortraits(roadMeeting)
assert.ok(normalLines(reloadPortraits(roadMeeting)).some((line) => line.npcAppearance?.npcId === 'seaRoadTraveller'))
for (const departed of [
  { ...roadMeeting, visited: { ...roadMeeting.visited, lamtumira: true } },
  { ...roadMeeting, rendezvous: scheduleRendezvous({}, rendezvousAvailability(roadMeeting, STORY.udhaUdhetari.options[0], { clock: roadMeeting.clock })) },
]) for (const state of [departed, reloadPortraits(departed)]) {
  assert.ok(normalLines(state).every((line) => line.npcAppearance?.npcId !== 'seaRoadTraveller'),
    'departed sea-road traveller reappears through his first portrait latch')
}

// A catalog location is not permission to unload a tale's entire cast into a
// shared overworld hub. Unconditional portraits must remain a readable first
// beat: normal tale scenes may introduce a small group, while heavily reused
// hubs get the tighter limit. Tale-specific figures belong at the moment they
// actually enter that tale (or behind an explicit world-state condition).
const unconditionalByNode = new Map()
for (const spec of Object.values(NPC_FIRST_ENCOUNTERS)) {
  if (spec.embedded || !spec.portraitLines.some((variant) =>
    variant.required.length === 0 && variant.excluded.length === 0)) continue
  const ids = unconditionalByNode.get(spec.nodeId) || []
  ids.push(spec.npcId)
  unconditionalByNode.set(spec.nodeId, ids)
}
const sharedHubLimits = new Map([
  ['jutbina', 2],
  ['mali1', 2],
  ['fshatiSheshi', 2],
])
for (const [nodeId, ids] of unconditionalByNode) {
  const limit = sharedHubLimits.get(nodeId) ?? 4
  assert.ok(ids.length <= limit,
    `${nodeId}: ${ids.length} unconditional NPC portraits exceed the ${limit}-portrait scene-density limit: ${ids.sort().join(', ')}`)
}

// Keep the larger catalog visible as a migration inventory. The broad pool is
// every individual human, mythic or creature entry (276 at this review). Only
// placed/walking figures have an authored encounter to portrait now; planned
// figures remain deferred until their place exists, and collectives need a
// separate crowd/role treatment rather than an individual portrait template.
const covered = new Set(Object.keys(NPC_FIRST_ENCOUNTERS))
const gapsByFile = []
let broadCandidateCount = 0
let locatedCandidateCount = 0
let plannedCandidateCount = 0
let locatedCoveredCount = 0
let narratedPlannedCount = 0
for (const [file, entries] of catalogs) {
  const individualEntries = Object.entries(entries)
    .filter(([, npc]) => ['human', 'mythic', 'creature'].includes(npc.kind))
  const locatedEntries = individualEntries
    .filter(([, npc]) => ['placed', 'walking'].includes(npc.location?.status))
  broadCandidateCount += individualEntries.length
  locatedCandidateCount += locatedEntries.length
  locatedCoveredCount += locatedEntries.filter(([npcId]) => covered.has(npcId)).length
  narratedPlannedCount += individualEntries.filter(([npcId, npc]) =>
    npc.location?.status === 'planning' && NPC_FIRST_ENCOUNTERS[npcId]?.depiction).length
  plannedCandidateCount += individualEntries
    .filter(([, npc]) => npc.location?.status === 'planning').length
  const gaps = locatedEntries
    .map(([npcId]) => npcId)
    .filter((npcId) => !covered.has(npcId))
    .sort()
  if (gaps.length) gapsByFile.push(`${file}: ${gaps.join(', ')}`)
}

// Gjon and the unnamed sea-road companion are distinct recurring identities.
// The latter reuses his existing voice portrait as his canonical introduction.
assert.equal(broadCandidateCount, 278, 'broad individual NPC inventory changed; review the portrait scope')
assert.equal(locatedCandidateCount, 116, 'located individual NPC inventory changed; review the portrait scope')
assert.equal(plannedCandidateCount, 162, 'planned individual NPC inventory changed; review the portrait scope')
assert.equal(narratedPlannedCount, 1, 'review the source-bound unlocated portrait inventory')
assert.equal(covered.size, locatedCoveredCount + narratedPlannedCount, 'a portrait lacks a reviewed physical or narrated-only identity')
assert.equal(locatedCoveredCount, locatedCandidateCount,
  `every placed/walking individual needs a reviewed first encounter:\n${gapsByFile.join('\n')}`)
console.log(`NPC first-encounter audit passed: ${locatedCoveredCount}/${locatedCandidateCount} currently located identities reviewed; ${narratedPlannedCount} narrated-only unlocated identity; ` +
  `${broadCandidateCount} broad candidates = ${locatedCandidateCount} placed/walking + ${plannedCandidateCount} planned.`)
console.log(`Located appearance migration inventory (${gapsByFile.length} file partitions):`)
for (const line of gapsByFile) console.log(`- ${line}`)
