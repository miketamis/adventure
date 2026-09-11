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
  normalizeActiveNpcPortraits,
  normalizeNpcPortraitsSeen,
  planNpcFirstEncounterLines,
  projectNpcFirstEncounterLines,
} from '../src/game/npcAppearance.js'
import {
  hasCond,
  newRun,
  normalizeSavedState,
  npcFirstEncounterPlanForState,
  reducer,
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

for (const spec of Object.values(NPC_FIRST_ENCOUNTERS)) {
  const owner = npcOwners.get(spec.npcId)
  const npc = owner && catalogs.get(owner)?.[spec.npcId]
  assert.ok(npc, `${spec.npcId}: portrait refers to no registered NPC`)
  assert.equal(spec.sourcePartition, owner.replace(/\.js$/, ''),
    `${spec.npcId}: portrait partition must match its NPC source file ${owner}`)
  const node = STORY[spec.nodeId]
  assert.ok(node, `${spec.npcId}: portrait node ${spec.nodeId} does not exist`)
  if (npc.location.status === 'placed') {
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
for (const [file, entries] of catalogs) {
  const individualEntries = Object.entries(entries)
    .filter(([, npc]) => ['human', 'mythic', 'creature'].includes(npc.kind))
  const locatedEntries = individualEntries
    .filter(([, npc]) => ['placed', 'walking'].includes(npc.location?.status))
  broadCandidateCount += individualEntries.length
  locatedCandidateCount += locatedEntries.length
  plannedCandidateCount += individualEntries
    .filter(([, npc]) => npc.location?.status === 'planning').length
  const gaps = locatedEntries
    .map(([npcId]) => npcId)
    .filter((npcId) => !covered.has(npcId))
    .sort()
  if (gaps.length) gapsByFile.push(`${file}: ${gaps.join(', ')}`)
}

assert.equal(broadCandidateCount, 276, 'broad individual NPC inventory changed; review the portrait scope')
assert.equal(locatedCandidateCount, 115, 'located individual NPC inventory changed; review the portrait scope')
assert.equal(plannedCandidateCount, 161, 'planned individual NPC inventory changed; review the portrait scope')
assert.equal(covered.size, locatedCandidateCount,
  `every placed/walking individual needs a reviewed first encounter:\n${gapsByFile.join('\n')}`)
console.log(`NPC first-encounter audit passed: ${covered.size}/${locatedCandidateCount} currently located identities reviewed; ` +
  `${broadCandidateCount} broad candidates = ${locatedCandidateCount} placed/walking + ${plannedCandidateCount} planned.`)
console.log(`Located appearance migration inventory (${gapsByFile.length} file partitions):`)
for (const line of gapsByFile) console.log(`- ${line}`)
