// Release gate for character-tale focus. It proves that every embodied source
// projection has an explicit runtime contract and that the reducer cannot be
// bypassed into another role, unrelated action or unrelated ending.
import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { ITEMS, STORY, WORLD_HUB, lineOf, visibleLines } from '../src/game/content.js'
import {
  currentStoryState,
  embodimentClockOf,
  fireStateOf,
  fixtureStateOf,
  hasCond,
  hasRequiredItem,
  npcNodeOf,
  normalizeSavedState,
  phaseAtClock,
  phraseSenses,
  projectedClockForOption,
  reducer,
  START_CLOCK,
  storyClockOf,
  worldClockOf,
} from '../src/game/gameState.js'
import {
  EMBODIMENT_ALIASES,
  EMBODIMENT_QUESTS,
  PUBLIC_FREE_ROAM_NODES,
  PUBLIC_FREE_ROAM_PLACES,
  PUBLIC_FREE_ROAM_TRANSITS,
  canonicalEmbodimentId,
  embodimentEntryNodes,
  embodimentOptionAccess,
  isEmbodimentEnding,
} from '../src/game/embodiment.js'
import { PLACE_NODES, PLACE_OF } from '../src/components/nodePositions.js'
import { playerMapLabel } from '../src/components/mapLabels.js'
import { transitionInfo } from '../src/game/worldModel.js'
import { NPCS } from '../src/game/npcs.js'
import { ACHIEVEMENTS } from '../src/game/achievements.js'
import { optionEffectsOf } from '../src/game/stateMechanics.js'

const checks = []
const check = (name, fn) => {
  try {
    fn()
    checks.push({ name, ok: true })
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
  }
}

const stateAt = (nodeId, extra = {}) => ({
  nodeId, clock: START_CLOCK, cameFrom: null, cameFromPhase: null, familiar: false,
  heard: {}, rumor: false, trail: [], discovered: {}, inventory: {}, mana: {}, practiced: {},
  flags: {}, knowledge: {}, interactions: {},
  visited: {}, earned: {}, eligible: {}, attempts: {}, dismissedTests: {}, pendingTest: null,
  hearts: 3, healedAt: {}, turn: 1, fixtures: {}, npcStarted: {}, worldFacts: {},
  view: 'story', ended: null, embodying: null, embodimentOriginNode: null,
  embodimentFocusNode: null, embodimentWorldNode: null, embodimentPaused: false,
  embodimentClock: null, embodimentInventorySnapshot: null, embodimentInventoryIsolated: null,
  embodimentFlagsSnapshot: null,
  embodimentHeartsSnapshot: null,
  embodimentArrivalSnapshot: null,
  pendingEmbodiment: null, timePassage: null,
  debug: false, loreFocus: null, ...extra,
})

const asList = (value) => value == null ? [] : Array.isArray(value) ? value : [value]
const changesWorld = (option, targetNode = STORY[option?.to]) => Boolean(
  optionEffectsOf(option).length || option?.interaction != null || targetNode?.worldEffects?.length,
)
const sameSet = (left, right) =>
  left.size === right.size && [...left].every((value) => right.has(value))
const edgeOf = (from, option) => `${from}->${option?.to}`

// Derive the public graph without consulting embodimentOptionAccess or the
// pinned place list. Time/weather gates can eventually be met on the living
// clock; a role requirement is private by definition and is never public.
const isIndependentPublicEdge = (from, option) => {
  const target = STORY[option?.to]
  if (!option || option.confuser || !target || target.end || option.become || changesWorld(option)) return false
  if (asList(option.requires).some((id) => String(id).startsWith('embodying:'))) return false
  const route = transitionInfo(from, option)
  const reviewedTransit = PUBLIC_FREE_ROAM_TRANSITS[edgeOf(from, option)]
  return Boolean(
    route.valid && route.spatial && !route.projection &&
    (route.kind === 'journey' || route.wander || reviewedTransit),
  )
}

const reachableBy = (start, accept) => {
  const reachable = new Set([start])
  const queue = [start]
  while (queue.length) {
    const from = queue.shift()
    for (const option of STORY[from]?.options || []) {
      if (!accept(from, option) || reachable.has(option.to)) continue
      reachable.add(option.to)
      queue.push(option.to)
    }
  }
  return reachable
}

const withSpeech = (state, option) => {
  const discovered = { ...state.discovered }
  const mana = { ...state.mana }
  for (const id of phraseSenses(option.text)) {
    discovered[id] = true
    mana[id] = Math.max(1, mana[id] || 0)
  }
  return { ...state, discovered, mana }
}

const withOptionConditions = (state, option) => {
  const inventory = { ...state.inventory }
  let cameFrom = state.cameFrom
  let familiar = state.familiar
  let rumor = state.rumor
  for (const id of asList(option.requires)) {
    if (typeof id !== 'string') continue
    if (id.startsWith('from:')) cameFrom = id.slice(5).split('|')[0]
    else if (id === 'again') familiar = true
    else if (id === 'rumor') rumor = true
    else inventory[id] = Math.max(1, inventory[id] || 0)
  }
  return withSpeech({ ...state, inventory, cameFrom, familiar, rumor }, option)
}

const sceneSignature = (state) => {
  const projected = currentStoryState(state)
  const node = STORY[projected.nodeId]
  const authored = node.text.map(lineOf)
  return JSON.stringify({
    lines: visibleLines(node, (id) => hasCond(projected, id)).map((line) => authored.indexOf(line)),
    gates: (node.options || []).map((option) => ({
      to: option.to,
      condition: hasRequiredItem(projected, option),
      access: embodimentOptionAccess(projected, option, STORY[option.to]),
    })),
    cameFrom: projected.cameFrom,
    cameFromPhase: projected.cameFromPhase,
    familiar: projected.familiar,
    rumor: projected.rumor,
    trail: projected.trail,
    clock: storyClockOf(projected),
  })
}

const thresholdForRole = (roleId) => {
  for (const [from, node] of Object.entries(STORY)) {
    const option = node.options?.find((candidate) =>
      candidate.become && canonicalEmbodimentId(candidate.become) === roleId)
    if (option) return { from, option }
  }
  return null
}

const enterRole = (roleId, inventory = {}, hearts = 3) => {
  const threshold = thresholdForRole(roleId)
  assert.ok(threshold, `${roleId}: no threshold`)
  for (let hour = 0; hour < 24; hour++) {
    const before = withSpeech(stateAt(threshold.from, {
      clock: 24 * 100 + hour,
      inventory: { ...inventory },
      hearts,
    }), threshold.option)
    if (!hasRequiredItem(before, threshold.option)) continue
    const entered = reducer(before, {
      type: 'CHOOSE',
      option: threshold.option,
      targetNode: STORY[threshold.option.to],
      embodimentConfirmed: true,
    })
    if (entered === before) continue
    return entered.timePassage
      ? reducer(entered, {
          type: 'DISMISS_TIME_PASSAGE',
          passageId: entered.timePassage.id,
          expectedStep: entered.timePassage.step,
        })
      : entered
  }
  assert.fail(`${roleId}: no feasible threshold hour`)
}

const taleDir = new URL('../src/game/data/tales/', import.meta.url)
const tales = []
for (const file of (await readdir(taleDir)).filter((name) => name.endsWith('.js') && !name.startsWith('_'))) {
  const module = await import(new URL(file, taleDir))
  tales.push(module.default || module.tale)
}
const uiSources = Object.fromEntries(await Promise.all([
  '../src/components/EmbodimentConfirm.jsx',
  '../src/components/EmbodimentFocus.jsx',
  '../src/components/GuideView.jsx',
  '../src/components/StoryView.jsx',
  '../src/components/TimePassage.jsx',
  '../src/components/WorldContext.jsx',
  '../src/components/AchievementsView.jsx',
  '../src/components/PracticeView.jsx',
  '../src/components/AtlasView.jsx',
  '../src/components/WorldMapView.jsx',
  '../src/App.jsx',
].map(async (relative) => [relative, await readFile(new URL(relative, import.meta.url), 'utf8')])))
const uiText = (relative) => uiSources[relative]

check('every embodied source projection has one runtime contract or explicit alias', () => {
  const embodied = tales.filter((tale) => tale?.play?.stance === 'embodied')
  assert.ok(embodied.length >= 27)
  for (const tale of embodied) {
    assert.ok(EMBODIMENT_QUESTS[tale.id] || EMBODIMENT_ALIASES[tale.id], tale.id)
  }
  for (const [alias, canonical] of Object.entries(EMBODIMENT_ALIASES)) {
    assert.ok(tales.some((tale) => tale?.id === alias && tale.play?.stance === 'embodied'), alias)
    assert.ok(EMBODIMENT_QUESTS[canonical], `${alias}->${canonical}`)
  }
})

check('every become threshold names a known, correctly located contract', () => {
  let count = 0
  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (!option.become) continue
      count++
      const id = canonicalEmbodimentId(option.become)
      const quest = EMBODIMENT_QUESTS[id]
      assert.ok(quest, `${from}->${option.to}: unknown ${option.become}`)
      assert.ok(embodimentEntryNodes(quest).includes(from), `${id}: unregistered entry ${from}`)
      assert.equal(quest.entryTo, option.to, `${id}: wrong entryTo`)
    }
  }
  assert.ok(count >= 28, `only ${count} confirmed character thresholds`)
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    const entries = embodimentEntryNodes(quest)
    assert.ok(entries.length > 0, `${id}: no threshold entries`)
    assert.equal(quest.entryFrom, entries[0], `${id}: singular compatibility entry is not primary`)
    for (const entryFrom of entries) {
      assert.ok(STORY[entryFrom]?.options.some((option) =>
        option.to === quest.entryTo && canonicalEmbodimentId(option.become) === id),
      `${id}: no matching threshold from ${entryFrom}`)
    }
  }
})

check('contracts contain only real nodes and list every terminal outcome', () => {
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    assert.ok(quest.identity && quest.objective && quest.stance, `${id}: incomplete identity copy`)
    assert.ok(STORY[quest.returnTo || embodimentEntryNodes(quest)[0]], `${id}: no safe overworld return`)
    for (const nodeId of quest.nodes) assert.ok(STORY[nodeId], `${id}: missing ${nodeId}`)
    for (const endingId of quest.endings) {
      assert.ok(STORY[endingId]?.end, `${id}: ${endingId} is not an ending`)
      assert.ok(quest.nodes.includes(endingId), `${id}: ending outside nodes`)
    }
    for (const nodeId of quest.nodes) {
      if (quest.endings.includes(nodeId)) continue
      const seen = new Set([nodeId])
      const queue = [nodeId]
      let reachesEnding = false
      while (queue.length) {
        const current = queue.shift()
        for (const option of STORY[current]?.options || []) {
          if (quest.endings.includes(option.to)) reachesEnding = true
          if (quest.nodes.includes(option.to) && !seen.has(option.to)) {
            seen.add(option.to)
            queue.push(option.to)
          }
        }
      }
      assert.ok(reachesEnding, `${id}: ${nodeId} cannot reach a declared ending`)
    }
  }
})

check('every possible role-focus destination has a natural player-facing map label', () => {
  const authoringIds = new Set([...Object.keys(STORY), ...Object.keys(PLACE_NODES)])
  const focusSource = uiText('../src/components/EmbodimentFocus.jsx')
  assert.match(focusSource, /playerMapLabel\(focusNode\)/)
  assert.doesNotMatch(focusSource, /PLACE_META|\|\|\s*place\s*\|\|\s*nodeId/)
  for (const [taleId, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    for (const nodeId of quest.nodes.filter((id) => !STORY[id]?.end)) {
      const label = playerMapLabel(nodeId)
      assert.ok(typeof label === 'string' && label.trim(), `${taleId}.${nodeId}: empty focus label`)
      assert.notEqual(label, nodeId, `${taleId}.${nodeId}: leaked scene id`)
      assert.notEqual(label, PLACE_OF[nodeId], `${taleId}.${nodeId}: leaked place id`)
      assert.equal(authoringIds.has(label), false, `${taleId}.${nodeId}: label is another authoring id '${label}'`)
    }
  }
})

check('role entry exposes every tale reference directly and promises no hidden library', () => {
  const confirmSource = uiText('../src/components/EmbodimentConfirm.jsx')
  const guideSource = uiText('../src/components/GuideView.jsx')
  assert.match(confirmSource, /const taleReferences = tale\?\.references \|\| \[\]/)
  assert.match(confirmSource, /Sources for this tale \(\{taleReferences\.length\}\)/)
  assert.match(confirmSource, /taleReferences\.map/)
  assert.doesNotMatch(confirmSource, /\.slice\(0,\s*3\)|full bibliography in Library/i)
  assert.match(guideSource, /Before you enter a character role/)
  assert.match(guideSource, /expand <b>Sources for this tale<\/b>/)
  assert.match(guideSource, /earned lore card/)
  assert.doesNotMatch(guideSource, /complete research-library card/)

  const taleById = new Map(tales.map((tale) => [tale.id, tale]))
  for (const [taleId] of Object.entries(EMBODIMENT_QUESTS)) {
    const tale = taleById.get(taleId)
    assert.ok(tale, `${taleId}: no tale module for role entry`)
    assert.ok(tale.references?.length, `${taleId}: role entry would have no source links`)
    for (const reference of tale.references) {
      assert.match(reference.url || '', /^https?:\/\//, `${taleId}: source is not directly linkable`)
      assert.ok(reference.citation && reference.role, `${taleId}: source lacks citation or role`)
    }
  }
})

check('entry confirmation happens before movement or token spending', () => {
  const optionIndex = STORY.agaYmer1.options.findIndex((option) => option.become === 'aga-ymer')
  const option = STORY.agaYmer1.options[optionIndex]
  const initial = withSpeech(stateAt('agaYmer1', { inventory: { buke: 1, lek: 7 } }), option)
  assert.equal(reducer(initial, { type: 'CHOOSE', option, targetNode: STORY[option.to] }), initial)
  const requested = reducer(initial, { type: 'REQUEST_EMBODIMENT', optionIndex })
  assert.equal(requested.nodeId, initial.nodeId)
  assert.deepEqual(requested.mana, initial.mana)
  assert.equal(requested.pendingEmbodiment.taleId, 'aga-ymer')
  const entered = reducer(requested, { type: 'CONFIRM_EMBODIMENT' })
  assert.equal(entered.nodeId, 'agaYmer2')
  assert.equal(entered.embodying, 'aga-ymer')
  assert.deepEqual(entered.embodimentInventorySnapshot, { buke: 1, lek: 7 })
  assert.deepEqual(entered.inventory, {})
  assert.equal(entered.embodimentInventoryIsolated, true)
})

check('every role isolates arbitrary traveller possessions and health, then restores both exactly', () => {
  const arbitraryPack = Object.fromEntries(Object.keys(ITEMS).map((id) => [id, 7]))
  for (const node of Object.values(STORY)) {
    for (const option of node.options || []) {
      if (option.grant) arbitraryPack[option.grant] = 7
      if (option.consumes) arbitraryPack[option.consumes] = 7
    }
  }

  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    const threshold = thresholdForRole(id)
    const expectedLocal = threshold.option.grant ? { [threshold.option.grant]: 1 } : {}
    const clean = enterRole(id, {}, 3)
    for (let travellerHearts = 1; travellerHearts <= 3; travellerHearts++) {
      const entered = enterRole(id, arbitraryPack, travellerHearts)
      assert.deepEqual(entered.embodimentInventorySnapshot, arbitraryPack, `${id}: pack snapshot drift`)
      assert.deepEqual(entered.inventory, expectedLocal, `${id}: traveller item leaked into tale`)
      assert.equal(entered.embodimentInventoryIsolated, true)
      assert.equal(entered.embodimentHeartsSnapshot, travellerHearts)
      assert.equal(entered.hearts, quest.startingHearts ?? 3, `${id}: role did not begin at its authored health`)

      for (const nodeId of quest.nodes.filter((candidate) => !STORY[candidate]?.end)) {
        const fromLoaded = {
          ...entered,
          nodeId,
          embodimentFocusNode: nodeId,
          embodimentClock: entered.embodimentClock,
          inventory: { ...entered.inventory },
        }
        const fromClean = {
          ...clean,
          nodeId,
          embodimentFocusNode: nodeId,
          embodimentClock: entered.embodimentClock,
          clock: entered.clock,
          inventory: { ...clean.inventory },
        }
        assert.deepEqual(
          (STORY[nodeId].options || []).map((option) => hasRequiredItem(currentStoryState(fromLoaded), option)),
          (STORY[nodeId].options || []).map((option) => hasRequiredItem(currentStoryState(fromClean), option)),
          `${id}.${nodeId}: traveller pack changed tale gates`,
        )
      }

      const survivingEnding = quest.endings.find((endingId) =>
        ['good', 'secret'].includes(STORY[endingId]?.end))
      assert.ok(survivingEnding, `${id}: no surviving ending restores the traveller`)
      const endingState = {
        ...entered,
        nodeId: survivingEnding,
        embodimentFocusNode: survivingEnding,
        inventory: { ...expectedLocal },
        hearts: 1,
        ended: STORY[survivingEnding].end,
        timePassage: null,
      }
      const returned = reducer(endingState, { type: 'RETURN_TO_WORLD' })
      assert.deepEqual(returned.inventory, arbitraryPack, `${id}: surviving ending lost the traveller pack`)
      assert.equal(returned.hearts, travellerHearts, `${id}: surviving ending changed traveller health`)
      assert.equal(returned.embodying, null, `${id}: surviving ending did not release the role`)
    }
  }
})

check('role-save migration isolates legacy packs once and scrubs forged local state', () => {
  const fresh = stateAt('start')
  const threshold = thresholdForRole('maro-perhitura')
  assert.ok(threshold?.option.grant === 'drithe')

  const travellerPack = { buke: 2, drithe: 7, lek: 11 }
  const legacy = normalizeSavedState(stateAt('maroNisja', {
    embodying: 'maro-perhitura',
    embodimentOriginNode: 'maroShtepi',
    embodimentFocusNode: 'maroNisja',
    embodimentWorldNode: 'maroShtepi',
    inventory: { ...travellerPack, drithe: travellerPack.drithe + 1 },
    embodimentInventorySnapshot: travellerPack,
    embodimentInventoryIsolated: null,
    hearts: 2,
    embodimentHeartsSnapshot: null,
  }), fresh)
  assert.deepEqual(legacy.inventory, { drithe: 1 }, 'legacy pack was not subtracted exactly once')
  assert.deepEqual(legacy.embodimentInventorySnapshot, travellerPack)
  assert.equal(legacy.embodimentInventoryIsolated, true)
  assert.equal(legacy.embodimentHeartsSnapshot, 2)

  const isolated = normalizeSavedState(stateAt('maroNisja', {
    embodying: 'maro-perhitura',
    embodimentOriginNode: 'maroShtepi',
    embodimentFocusNode: 'maroNisja',
    embodimentWorldNode: 'maroShtepi',
    inventory: { drithe: 1, buke: 999, forgedRelic: 999 },
    embodimentInventorySnapshot: travellerPack,
    embodimentInventoryIsolated: true,
    hearts: 0,
    embodimentHeartsSnapshot: 0,
  }), fresh)
  assert.deepEqual(isolated.inventory, { drithe: 1 }, 'forged or traveller-only items survived role loading')
  assert.equal(isolated.embodimentHeartsSnapshot, 1, 'invalid legacy traveller health was not repaired safely')

  const isolatedAgain = normalizeSavedState(JSON.parse(JSON.stringify(isolated)), fresh)
  assert.deepEqual(isolatedAgain.inventory, { drithe: 1 }, 'isolated save was subtracted a second time')
  assert.deepEqual(isolatedAgain.embodimentInventorySnapshot, travellerPack)
})

check('Maro return prose appears only after the tale actually grants gold', () => {
  const entered = enterRole('maro-perhitura')
  const paused = reducer(entered, { type: 'PAUSE_EMBODIMENT' })
  assert.equal(paused.nodeId, 'maroShtepi')

  const goldLines = (state) => visibleLines(
    STORY.maroShtepi,
    (id) => hasCond(currentStoryState(state), id),
  ).filter((line) => line.some((token) => token.id === 'flori'))

  assert.equal(goldLines(paused).length, 0, 'merely becoming Maro exposed the gilded return')
  assert.equal(goldLines({ ...paused, inventory: { ...paused.inventory, flori: 1 } }).length, 2,
    'earned gold did not expose the two gilded return descriptions')
})

check('Maro may travel but cannot steal the miller ending or use the traveller pack', () => {
  const base = stateAt('mulli1', {
    clock: 5,
    embodying: 'maro-perhitura', embodimentOriginNode: 'maroShtepi',
    embodimentFocusNode: 'mulli1', embodimentWorldNode: 'maroShtepi',
    embodimentClock: 5, cameFrom: 'maroNisja', cameFromPhase: 'night',
    familiar: true, rumor: true, trail: ['maroNisja', 'maroShtepi'],
    inventory: { buke: 1 }, embodimentInventorySnapshot: { buke: 1 },
  })
  const millEnding = STORY.mulli1.options.find((option) => option.to === 'mulliFund')
  const blocked = withSpeech(base, millEnding)
  assert.equal(reducer(blocked, { type: 'CHOOSE', option: millEnding, targetNode: STORY.mulliFund }), blocked)
  assert.equal(blocked.eligible.mulliFund, undefined)
  assert.equal(reducer(blocked, { type: 'USE_ITEM', item: { id: 'buke' } }), blocked)
  assert.equal(reducer(blocked, { type: 'HEAL' }), blocked)
  assert.equal(reducer(blocked, { type: 'CONFUSE' }), blocked)
  assert.equal(reducer(blocked, { type: 'RESET' }), blocked)

  const travel = STORY.mulli1.options.find((option) => option.to === 'fshatiLumi')
  const wandered = reducer(withSpeech(base, travel), { type: 'CHOOSE', option: travel, targetNode: STORY.fshatiLumi })
  assert.equal(wandered.nodeId, 'fshatiLumi')
  assert.equal(wandered.embodying, 'maro-perhitura')
  assert.equal(wandered.embodimentPaused, true)
  assert.deepEqual(wandered.embodimentArrivalSnapshot, {
    nodeId: 'mulli1', cameFrom: 'maroNisja', cameFromPhase: 'night',
    familiar: true, rumor: true, trail: ['maroNisja', 'maroShtepi'],
  })
  const resumed = reducer(wandered, { type: 'RESUME_EMBODIMENT' })
  assert.equal(resumed.nodeId, 'mulli1')
  assert.equal(resumed.embodimentPaused, false)
  assert.equal(resumed.cameFrom, 'maroNisja')
  assert.equal(resumed.cameFromPhase, 'night')
  assert.equal(resumed.familiar, true)
  assert.equal(resumed.rumor, true)
  assert.deepEqual(resumed.trail, ['maroNisja', 'maroShtepi'])
})

check('every active role blocks every unrelated collection test but permits its own ending gate', () => {
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    const active = enterRole(id)
    for (const unrelated of ACHIEVEMENTS.filter((achievement) => !quest.endings.includes(achievement.id))) {
      const eligible = {
        ...active,
        hearts: 1,
        eligible: { ...active.eligible, [unrelated.id]: true },
        pendingTest: unrelated.id,
      }
      assert.equal(reducer(eligible, { type: 'EARN_ACHIEVEMENT', id: unrelated.id }), eligible, `${id} earned ${unrelated.id}`)
      assert.equal(reducer(eligible, { type: 'FAIL_TEST', id: unrelated.id }), eligible, `${id} failed ${unrelated.id}`)
    }
    for (const endingId of quest.endings) {
      if (!ACHIEVEMENTS.some((achievement) => achievement.id === endingId)) continue
      const ending = stateAt(endingId, {
        embodying: id,
        embodimentOriginNode: quest.entryFrom,
        embodimentFocusNode: endingId,
        embodimentWorldNode: quest.returnTo,
        embodimentClock: START_CLOCK,
        ended: STORY[endingId].end,
        hearts: 1,
        eligible: { [endingId]: true },
      })
      const earned = reducer(ending, { type: 'EARN_ACHIEVEMENT', id: endingId })
      assert.equal(earned.earned[endingId], true, `${id} could not earn ${endingId}`)
      assert.equal(earned.hearts, 3, `${id}.${endingId} did not restore role health`)
    }
  }
})

check('every active role blocks every become threshold and unrelated ending', () => {
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    for (const [from, node] of Object.entries(STORY)) {
      for (const option of node.options || []) {
        const target = STORY[option.to]
        const active = stateAt(from, {
          embodying: id, embodimentOriginNode: quest.entryFrom,
          embodimentFocusNode: quest.entryTo, embodimentWorldNode: from,
          embodimentPaused: true,
        })
        if (option.become) {
          assert.equal(embodimentOptionAccess(active, option, target).ok, false, `${id}: ${from}->${option.to}`)
          const ready = withSpeech(active, option)
          assert.equal(
            reducer(ready, { type: 'CHOOSE', option, targetNode: target }),
            ready,
            `${id}: reducer accepted role threshold ${from}->${option.to}`,
          )
        }
        if (target?.end) {
          assert.equal(
            embodimentOptionAccess(active, option, target).ok,
            false,
            `${id}: paused role reached ending ${from}->${option.to}`,
          )
        }
        if (target?.end && !isEmbodimentEnding(id, option.to)) {
          const ready = withSpeech({ ...active, embodimentPaused: false }, option)
          assert.equal(
            reducer(ready, { type: 'CHOOSE', option, targetNode: target }),
            ready,
            `${id}: reducer accepted unrelated ending ${from}->${option.to}`,
          )
        }
      }
    }
  }
})

check('a role remains through its own ending and clears only when that ending closes', () => {
  const start = stateAt('agaYmer2', {
    embodying: 'aga-ymer', embodimentOriginNode: 'agaYmer1', embodimentFocusNode: 'agaYmer2',
    embodimentWorldNode: 'agaYmer1', inventory: { questFlag: 1 },
    embodimentInventorySnapshot: { buke: 1, lek: 7 },
  })
  const endingOption = STORY.agaYmer2.options.find((option) => option.to === 'agaYmerFund')
  const atEnding = reducer(withSpeech(start, endingOption), {
    type: 'CHOOSE', option: endingOption, targetNode: STORY.agaYmerFund,
  })
  assert.equal(atEnding.embodying, 'aga-ymer')
  assert.equal(atEnding.ended, 'secret')
  const earned = reducer(atEnding, { type: 'EARN_ACHIEVEMENT', id: 'agaYmerFund' })
  assert.equal(earned.earned.agaYmerFund, true, 'the bound role could not earn its own ending')
  const returned = reducer(earned, { type: 'RETURN_TO_WORLD', to: STORY.agaYmerFund.returnTo })
  assert.equal(returned.embodying, null)
  assert.deepEqual(returned.inventory, { buke: 1, lek: 7 })
})

check('the pinned public-place inventory exactly matches an independent graph derivation', () => {
  const pinned = new Set(PUBLIC_FREE_ROAM_PLACES)
  const pinnedNodes = new Set(PUBLIC_FREE_ROAM_NODES)
  assert.equal(PUBLIC_FREE_ROAM_PLACES.length, 55)
  assert.equal(pinned.size, PUBLIC_FREE_ROAM_PLACES.length, 'duplicate public place')
  assert.deepEqual(PUBLIC_FREE_ROAM_PLACES, [...PUBLIC_FREE_ROAM_PLACES].sort(), 'public places are not sorted')
  assert.equal(PUBLIC_FREE_ROAM_NODES.length, 56)
  assert.equal(pinnedNodes.size, PUBLIC_FREE_ROAM_NODES.length, 'duplicate public node')
  assert.deepEqual(PUBLIC_FREE_ROAM_NODES, [...PUBLIC_FREE_ROAM_NODES].sort(), 'public nodes are not sorted')
  for (const place of pinned) assert.ok(PLACE_NODES[place]?.length, `unknown public place ${place}`)
  for (const nodeId of pinnedNodes) assert.ok(STORY[nodeId], `unknown public node ${nodeId}`)
  assert.equal(pinned.has('maroMulli1'), false, 'Maro night-vigil is private, not public')
  assert.equal(pinnedNodes.has('maroMulli1'), false, 'Maro night-vigil node is private, not public')

  const derivedNodes = reachableBy(WORLD_HUB, isIndependentPublicEdge)
  const derivedPlaces = new Set([...derivedNodes].map((nodeId) => PLACE_OF[nodeId]).filter(Boolean))
  assert.equal(derivedNodes.size, 56, 'public graph node inventory drifted')
  assert.ok(
    sameSet(derivedNodes, pinnedNodes),
    `public-node drift: missing ${[...pinnedNodes].filter((id) => !derivedNodes.has(id)).join(', ') || 'none'}; ` +
      `extra ${[...derivedNodes].filter((id) => !pinnedNodes.has(id)).join(', ') || 'none'}`,
  )
  assert.ok(
    sameSet(derivedPlaces, pinned),
    `public-place drift: missing ${[...pinned].filter((id) => !derivedPlaces.has(id)).join(', ') || 'none'}; ` +
      `extra ${[...derivedPlaces].filter((id) => !pinned.has(id)).join(', ') || 'none'}`,
  )

  assert.deepEqual(Object.keys(PUBLIC_FREE_ROAM_TRANSITS), ['mali3->maliStuhi'])
  const transit = PUBLIC_FREE_ROAM_TRANSITS['mali3->maliStuhi']
  assert.ok(transit.reason && transit.invariant)
  const transitOption = STORY.mali3.options.find((option) => option.to === 'maliStuhi')
  const route = transitionInfo('mali3', transitOption)
  assert.equal(PLACE_OF.mali3, PLACE_OF.maliStuhi)
  assert.equal(route.kind, 'local')
  assert.equal(changesWorld(transitOption), false)
})

const roleCoverage = []
check('every paused role reaches exactly all 55 public places and no private tale place', () => {
  const publicPlaces = new Set(PUBLIC_FREE_ROAM_PLACES)
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    const returnTo = quest.returnTo || quest.entryFrom
    const reachable = reachableBy(returnTo, (from, option) => {
      if (option.confuser) return false
      const state = stateAt(from, {
        embodying: id, embodimentOriginNode: quest.entryFrom,
        embodimentFocusNode: quest.entryTo, embodimentWorldNode: from,
        embodimentPaused: true,
      })
      const access = embodimentOptionAccess(state, option, STORY[option.to])
      if (!access.ok) return false
      assert.ok(['detour', 'wait'].includes(access.kind), `${id}: paused route became ${access.kind}`)
      return true
    })
    const places = new Set([...reachable].map((nodeId) => PLACE_OF[nodeId]).filter(Boolean))
    roleCoverage.push(places.size)
    assert.ok(
      sameSet(places, publicPlaces),
      `${id}: missing ${[...publicPlaces].filter((place) => !places.has(place)).join(', ') || 'none'}; ` +
        `private ${[...places].filter((place) => !publicPlaces.has(place)).join(', ') || 'none'}`,
    )
    assert.equal(reachable.has('maroMulli1'), false, `${id}: reached Maro's private night-vigil`)

    const live = stateAt(quest.entryTo, {
      embodying: id, embodimentOriginNode: quest.entryFrom, embodimentFocusNode: quest.entryTo,
      embodimentWorldNode: returnTo,
    })
    const paused = reducer(live, { type: 'PAUSE_EMBODIMENT' })
    const safeReturn = PUBLIC_FREE_ROAM_NODES.includes(returnTo) ? returnTo : WORLD_HUB
    assert.equal(paused.nodeId, safeReturn, `${id}: wrong safe public pause return`)
    assert.equal(paused.embodimentPaused, true, `${id}: pause did not bind free-roam mode`)
    const resumed = reducer(paused, { type: 'RESUME_EMBODIMENT' })
    assert.equal(resumed.nodeId, quest.entryTo, `${id}: wrong resume`)
    assert.equal(resumed.embodimentPaused, false, `${id}: resume did not restore tale mode`)
  }
})

check('all 27 roles can physically traverse all 55 public places from every starting hour', () => {
  const publicPlaces = new Set(PUBLIC_FREE_ROAM_PLACES)
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    const returnTo = quest.returnTo || quest.entryFrom
    for (let startingHour = 0; startingHour < 24; startingHour++) {
      const seen = new Set([`${returnTo}|${startingHour}`])
      const queue = [[returnTo, startingHour]]
      const places = new Set([PLACE_OF[returnTo]])
      while (queue.length) {
        const [from, clock] = queue.shift()
        const state = stateAt(from, {
          clock, embodying: id, embodimentOriginNode: quest.entryFrom,
          embodimentFocusNode: quest.entryTo, embodimentWorldNode: from,
          embodimentPaused: true,
        })
        for (const option of STORY[from]?.options || []) {
          if (option.confuser || !hasRequiredItem(state, option)) continue
          if (!embodimentOptionAccess(state, option, STORY[option.to]).ok) continue
          const nextClock = projectedClockForOption(state, option)
          const key = `${option.to}|${nextClock % 24}`
          places.add(PLACE_OF[option.to])
          if (seen.has(key)) continue
          seen.add(key)
          queue.push([option.to, nextClock])
        }
      }
      assert.ok(
        sameSet(places, publicPlaces),
        `${id} from hour ${startingHour}: reached ${places.size}/55; missing ` +
          `${[...publicPlaces].filter((place) => !places.has(place)).join(', ') || 'none'}`,
      )
    }
  }
})

check('paused tale actions, private journeys and forged backtracks cannot bypass Resume', () => {
  const allowedOwnedRoads = new Set()
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    for (const from of quest.nodes) {
      for (const option of STORY[from]?.options || []) {
        if (!quest.nodes.includes(option.to)) continue
        const route = transitionInfo(from, option)
        const publicRoad = !STORY[option.to]?.end && route.valid && route.spatial &&
          !route.projection && (route.kind === 'journey' || route.wander) &&
          !changesWorld(option) && PUBLIC_FREE_ROAM_NODES.includes(from) &&
          PUBLIC_FREE_ROAM_NODES.includes(option.to)
        const paused = stateAt(from, {
          clock: 16, embodying: id, embodimentOriginNode: quest.entryFrom,
          embodimentFocusNode: from, embodimentWorldNode: from,
          embodimentPaused: true, inventory: { furke: 1, drithe: 1 },
        })
        const access = embodimentOptionAccess(paused, option, STORY[option.to])
        if (publicRoad) {
          assert.equal(access.ok, true, `${id}: public road blocked ${from}->${option.to}`)
          assert.equal(access.kind, 'detour', `${id}: public road advanced tale ${from}->${option.to}`)
          allowedOwnedRoads.add(`${id}:${from}->${option.to}`)
        } else {
          assert.equal(access.ok, false, `${id}: paused tale action allowed ${from}->${option.to}`)
          const ready = withSpeech(paused, option)
          assert.equal(
            reducer(ready, { type: 'CHOOSE', option, targetNode: STORY[option.to] }),
            ready,
            `${id}: paused reducer advanced ${from}->${option.to}`,
          )
        }
      }
    }
  }
  assert.deepEqual([...allowedOwnedRoads].sort(), [
    'maiden-promised-sun:fshatiLanes->pallatiZi',
    'maiden-promised-sun:pallatiZi->fshatiLanes',
  ])

  const privateMill = STORY.mulli1.options.find((option) => option.to === 'maroMulli1')
  const atMill = withSpeech(stateAt('mulli1', {
    clock: 16, embodying: 'maro-perhitura', embodimentOriginNode: 'maroShtepi',
    embodimentFocusNode: 'mulli1', embodimentWorldNode: 'mulli1',
    embodimentPaused: true, inventory: { furke: 1, drithe: 1 },
  }), privateMill)
  assert.equal(embodimentOptionAccess(atMill, privateMill, STORY.maroMulli1).ok, false)
  assert.equal(reducer(atMill, { type: 'CHOOSE', option: privateMill, targetNode: STORY.maroMulli1 }), atMill)

  const child = STORY.fshatiJeta.options.find((option) => option.to === 'syriKeq1')
  const forged = withSpeech(stateAt('fshatiJeta', {
    embodying: 'maro-perhitura', embodimentOriginNode: 'maroShtepi',
    embodimentFocusNode: 'mulli1', embodimentWorldNode: 'fshatiJeta',
    embodimentPaused: true, cameFrom: 'syriKeq1', trail: ['syriKeq1'],
  }), child)
  assert.equal(transitionInfo('fshatiJeta', child).kind, 'scene-shift')
  assert.equal(embodimentOptionAccess(forged, child, STORY.syriKeq1).ok, false)
  assert.equal(reducer(forged, { type: 'CHOOSE', option: child, targetNode: STORY.syriKeq1 }), forged)

  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      const target = STORY[option.to]
      const route = transitionInfo(from, option)
      const transit = PUBLIC_FREE_ROAM_TRANSITS[edgeOf(from, option)]
      const harmlessWait = option.to === from && (option.time || option.date) && !changesWorld(option)
      if (!target || route.kind === 'journey' || route.wander || transit || harmlessWait) continue
      const forgedState = stateAt(from, {
        embodying: 'maro-perhitura', embodimentOriginNode: 'maroShtepi',
        embodimentFocusNode: 'mulli1', embodimentWorldNode: from,
        embodimentPaused: true, cameFrom: option.to, trail: [option.to],
      })
      assert.equal(
        embodimentOptionAccess(forgedState, option, target).ok,
        false,
        `forged breadcrumb authorized ${from}->${option.to}`,
      )
    }
  }
})

check('the complete paused authorization surface contains only public travel, one transit and waits', () => {
  const publicNodes = new Set(PUBLIC_FREE_ROAM_NODES)
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    for (const [from, node] of Object.entries(STORY)) {
      for (const option of node.options || []) {
        const target = STORY[option.to]
        const state = stateAt(from, {
          embodying: id, embodimentOriginNode: quest.entryFrom,
          embodimentFocusNode: quest.entryTo, embodimentWorldNode: from,
          embodimentPaused: true,
        })
        const access = embodimentOptionAccess(state, option, target)
        if (!access.ok) continue
        const route = transitionInfo(from, option)
        const transit = PUBLIC_FREE_ROAM_TRANSITS[edgeOf(from, option)]
        const harmlessWait = option.to === from && (option.time || option.date) && !changesWorld(option)
        const publicTravel = target && !target.end && !option.become && !changesWorld(option) &&
          route.valid && route.spatial && !route.projection &&
          (route.kind === 'journey' || route.wander) && publicNodes.has(option.to)
        assert.ok(publicTravel || transit || harmlessWait, `${id}: unauthorized ${access.kind} ${from}->${option.to}`)
        if (access.kind === 'detour') assert.ok(publicTravel || transit, `${id}: malformed detour ${from}->${option.to}`)
        if (access.kind === 'wait') assert.ok(harmlessWait, `${id}: malformed wait ${from}->${option.to}`)
        if (quest.nodes.includes(from) && quest.nodes.includes(option.to) && publicTravel) {
          assert.ok(publicNodes.has(from), `${id}: private tale node escaped over ${from}->${option.to}`)
        }
      }
    }
  }
})

check('pause and save normalization work at a public place shared with the tale', () => {
  const live = stateAt('maroShtepi', {
    embodying: 'maro-perhitura', embodimentOriginNode: 'maroShtepi',
    embodimentFocusNode: 'maroShtepi', embodimentWorldNode: 'maroShtepi',
    embodimentPaused: false,
  })
  const paused = reducer(live, { type: 'PAUSE_EMBODIMENT' })
  assert.notEqual(paused, live)
  assert.equal(paused.nodeId, 'maroShtepi')
  assert.equal(paused.embodimentPaused, true)
  const normalized = normalizeSavedState(paused, stateAt('start'))
  assert.equal(normalized.nodeId, 'maroShtepi')
  assert.equal(normalized.embodimentPaused, true)
  const resumed = reducer(normalized, { type: 'RESUME_EMBODIMENT' })
  assert.equal(resumed.nodeId, 'maroShtepi')
  assert.equal(resumed.embodimentPaused, false)
})

check('unknown saved roles are repaired instead of becoming invisible locks', () => {
  const fresh = stateAt('start')
  const normalized = normalizeSavedState({ ...fresh, embodying: 'removed-tale', embodimentFocusNode: 'missing' }, fresh)
  assert.equal(normalized.embodying, null)
  assert.equal(normalized.embodimentFocusNode, null)
  assert.equal(normalized.embodimentPaused, false)
})

let suspendedSceneTrials = 0
let taleProjectionTrials = 0
let detourClockTrials = 0
let talePassageTrials = 0

check('every non-ending focus at every hour survives pause, detour, save and exact resume', () => {
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    const publicReturn = PUBLIC_FREE_ROAM_NODES.includes(quest.returnTo)
      ? quest.returnTo
      : embodimentEntryNodes(quest).find((entryFrom) => PUBLIC_FREE_ROAM_NODES.includes(entryFrom)) || WORLD_HUB
    for (const focusNode of quest.nodes.filter((nodeId) => !STORY[nodeId]?.end)) {
      const inbound = Object.entries(STORY).find(([from, node]) =>
        from !== focusNode && (quest.nodes.includes(from) || embodimentEntryNodes(quest).includes(from)) &&
        node.options?.some((option) => option.to === focusNode))?.[0] || embodimentEntryNodes(quest)[0]
      for (let hour = 0; hour < 24; hour++) {
        const taleClock = 24 * 200 + hour
        const live = stateAt(focusNode, {
          clock: taleClock,
          embodimentClock: taleClock,
          embodying: id,
          embodimentOriginNode: quest.entryFrom,
          embodimentFocusNode: focusNode,
          embodimentWorldNode: publicReturn,
          embodimentPaused: false,
          cameFrom: inbound,
          cameFromPhase: phaseAtClock(taleClock - 1),
          familiar: hour % 2 === 0,
          rumor: hour % 3 === 0,
          trail: [...new Set([inbound, quest.entryFrom, WORLD_HUB])].filter((nodeId) =>
            STORY[nodeId] && nodeId !== focusNode).slice(0, 6),
          visited: { [focusNode]: true },
          inventory: { lek: 100 },
          embodimentInventorySnapshot: { lek: 100 },
        })
        const before = sceneSignature(live)
        const paused = reducer(live, { type: 'PAUSE_EMBODIMENT' })
        assert.notEqual(paused, live, `${id}.${focusNode}@${hour}: pause rejected`)
        assert.equal(paused.embodimentClock, taleClock)
        assert.deepEqual(paused.embodimentArrivalSnapshot, {
          nodeId: focusNode,
          cameFrom: live.cameFrom,
          cameFromPhase: live.cameFromPhase,
          familiar: live.familiar,
          rumor: live.rumor,
          trail: live.trail,
        })

        let detoured = null
        for (const option of STORY[paused.nodeId]?.options || []) {
          const ready = withSpeech(paused, option)
          const access = embodimentOptionAccess(ready, option, STORY[option.to])
          if (access.kind !== 'detour' || !hasRequiredItem(ready, option)) continue
          const candidate = reducer(ready, { type: 'CHOOSE', option, targetNode: STORY[option.to] })
          if (candidate !== ready) {
            detoured = candidate
            break
          }
        }
        assert.ok(detoured, `${id}.${focusNode}@${hour}: no executable public detour`)
        assert.ok(detoured.clock > paused.clock, `${id}.${focusNode}@${hour}: detour did not advance world`)
        assert.equal(detoured.embodimentClock, taleClock, `${id}.${focusNode}@${hour}: detour advanced tale`)
        assert.equal(detoured.embodimentFocusNode, focusNode)

        const restoredSave = normalizeSavedState(
          JSON.parse(JSON.stringify(detoured)),
          stateAt('start'),
        )
        assert.equal(restoredSave.embodimentPaused, true)
        assert.equal(restoredSave.embodimentClock, taleClock)
        assert.deepEqual(restoredSave.embodimentArrivalSnapshot, paused.embodimentArrivalSnapshot)
        const resumed = reducer(restoredSave, { type: 'RESUME_EMBODIMENT' })
        assert.equal(resumed.nodeId, focusNode)
        assert.equal(resumed.embodimentPaused, false)
        assert.equal(resumed.clock, detoured.clock)
        assert.equal(resumed.embodimentClock, taleClock)
        assert.equal(resumed.embodimentArrivalSnapshot, null)
        assert.equal(
          sceneSignature(resumed),
          before,
          `${id}.${focusNode}@${hour}: visible prose or gates changed across detour`,
        )
        suspendedSceneTrials++
      }
    }
  }
  assert.ok(suspendedSceneTrials > 1000, `only ${suspendedSceneTrials} suspended-scene trials`)
})

check('every feasible tale edge at every starting hour advances the two clocks by one exact interval', () => {
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    const publicReturn = PUBLIC_FREE_ROAM_NODES.includes(quest.returnTo)
      ? quest.returnTo
      : embodimentEntryNodes(quest).find((entryFrom) => PUBLIC_FREE_ROAM_NODES.includes(entryFrom)) || WORLD_HUB
    for (const from of quest.nodes.filter((nodeId) => !STORY[nodeId]?.end)) {
      for (const option of STORY[from]?.options || []) {
        if (!quest.nodes.includes(option.to) || option.confuser) continue
        for (let hour = 0; hour < 24; hour++) {
          const taleClock = 24 * 300 + hour
          const base = stateAt(from, {
            clock: taleClock + 37,
            embodimentClock: taleClock,
            embodying: id,
            embodimentOriginNode: quest.entryFrom,
            embodimentFocusNode: from,
            embodimentWorldNode: publicReturn,
            cameFrom: quest.entryFrom,
            cameFromPhase: phaseAtClock(taleClock - 1),
            inventory: { lek: 100 },
            embodimentInventorySnapshot: { lek: 100 },
            visited: { [from]: true },
          })
          const ready = withOptionConditions(base, option)
          const projected = currentStoryState(ready)
          if (!hasRequiredItem(projected, option)) continue
          const access = embodimentOptionAccess(projected, option, STORY[option.to])
          assert.equal(access.kind, 'quest', `${id}: ${from}->${option.to} was not a tale edge`)
          const expectedTaleClock = projectedClockForOption(projected, option)
          const expectedElapsed = expectedTaleClock - taleClock
          const after = reducer(ready, { type: 'CHOOSE', option, targetNode: STORY[option.to] })
          assert.notEqual(after, ready, `${id}: feasible ${from}->${option.to}@${hour} was rejected`)
          assert.equal(after.embodimentClock, expectedTaleClock)
          assert.equal(after.clock, ready.clock + expectedElapsed)
          assert.equal(after.clock - ready.clock, after.embodimentClock - taleClock)
          assert.ok(after.clock >= ready.clock)
          assert.equal(after.embodimentFocusNode, option.to)
          assert.equal(after.cameFromPhase, phaseAtClock(taleClock))

          if (after.timePassage) {
            assert.equal(after.timePassage.clockKind, 'tale')
            assert.equal(after.timePassage.fromClock, taleClock)
            assert.equal(after.timePassage.toClock, expectedTaleClock)
            assert.equal(after.timePassage.worldFromClock, ready.clock)
            assert.equal(after.timePassage.worldToClock, after.clock)
            assert.equal(after.timePassage.elapsedHours, expectedElapsed)
            assert.equal(
              after.timePassage.worldToClock - after.timePassage.worldFromClock,
              after.timePassage.toClock - after.timePassage.fromClock,
            )
            talePassageTrials++
          }

          const saved = normalizeSavedState(JSON.parse(JSON.stringify(after)), stateAt('start'))
          assert.equal(saved.clock, after.clock)
          assert.equal(saved.embodimentClock, after.embodimentClock)
          assert.deepEqual(saved.timePassage, after.timePassage)
          taleProjectionTrials++
        }
      }
    }
  }
  assert.ok(taleProjectionTrials > 1000, `only ${taleProjectionTrials} tale projections`)
  assert.ok(talePassageTrials > 50, `only ${talePassageTrials} two-clock passage projections`)
})

check('every executable public detour at every hour advances only the living clock', () => {
  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    for (const from of PUBLIC_FREE_ROAM_NODES) {
      for (let hour = 0; hour < 24; hour++) {
        const taleClock = 24 * 400 + hour
        const snapshot = {
          nodeId: quest.entryTo,
          cameFrom: quest.entryFrom,
          cameFromPhase: phaseAtClock(taleClock - 1),
          familiar: hour % 2 === 0,
          rumor: hour % 3 === 0,
          trail: [quest.entryFrom].filter((nodeId) => nodeId !== quest.entryTo),
        }
        const paused = stateAt(from, {
          clock: taleClock + 29,
          embodimentClock: taleClock,
          embodying: id,
          embodimentOriginNode: quest.entryFrom,
          embodimentFocusNode: quest.entryTo,
          embodimentWorldNode: from,
          embodimentPaused: true,
          embodimentArrivalSnapshot: snapshot,
          embodimentInventorySnapshot: {},
        })
        for (const option of STORY[from]?.options || []) {
          if (option.confuser) continue
          const ready = withSpeech(paused, option)
          const access = embodimentOptionAccess(ready, option, STORY[option.to])
          if (!['detour', 'wait'].includes(access.kind) || !hasRequiredItem(ready, option)) continue
          const expectedWorldClock = projectedClockForOption(ready, option)
          const after = reducer(ready, { type: 'CHOOSE', option, targetNode: STORY[option.to] })
          assert.notEqual(after, ready, `${id}: rejected ${access.kind} ${from}->${option.to}@${hour}`)
          assert.equal(after.clock, expectedWorldClock)
          assert.equal(after.embodimentClock, taleClock)
          assert.equal(after.embodimentFocusNode, quest.entryTo)
          assert.deepEqual(after.embodimentArrivalSnapshot, snapshot)
          if (after.timePassage) assert.equal(after.timePassage.clockKind, 'world')
          const saved = normalizeSavedState(JSON.parse(JSON.stringify(after)), stateAt('start'))
          assert.equal(saved.clock, after.clock)
          assert.equal(saved.embodimentClock, taleClock)
          assert.deepEqual(saved.embodimentArrivalSnapshot, snapshot)
          detourClockTrials++
        }
      }
    }
  }
  assert.ok(detourClockTrials > 10000, `only ${detourClockTrials} public detour projections`)
})

check('Binoshët night remains night after a daytime detour and save round-trip', () => {
  const live = stateAt('binoshetNata', {
    clock: 15,
    embodimentClock: 15,
    embodying: 'binoshet',
    embodimentOriginNode: 'lumi',
    embodimentFocusNode: 'binoshetNata',
    embodimentWorldNode: 'lumi',
    cameFrom: 'binoshetShpata',
    cameFromPhase: 'day',
    familiar: false,
    rumor: true,
    trail: ['binoshetShpata', 'binoshetKurora'],
    embodimentInventorySnapshot: {},
  })
  const before = sceneSignature(live)
  const paused = reducer(live, { type: 'PAUSE_EMBODIMENT' })
  const daytimeWorld = { ...paused, clock: 28 }
  assert.equal(phaseAtClock(worldClockOf(daytimeWorld)), 'day')
  assert.equal(phaseAtClock(storyClockOf(currentStoryState(daytimeWorld))), 'day')
  const saved = normalizeSavedState(JSON.parse(JSON.stringify(daytimeWorld)), stateAt('start'))
  const resumed = reducer(saved, { type: 'RESUME_EMBODIMENT' })
  assert.equal(phaseAtClock(worldClockOf(resumed)), 'day')
  assert.equal(phaseAtClock(storyClockOf(currentStoryState(resumed))), 'night')
  assert.equal(sceneSignature(resumed), before)
})

check('malformed role saves cannot desynchronise focus, teleport privately, or resume an ending', () => {
  const fresh = stateAt('start')
  const mismatched = normalizeSavedState(stateAt('binoshetLumi', {
    clock: 40,
    embodimentClock: 30,
    embodying: 'binoshet',
    embodimentFocusNode: 'binoshetNata',
    embodimentWorldNode: 'lumi',
    embodimentPaused: false,
  }), fresh)
  assert.equal(mismatched.embodimentPaused, false)
  assert.equal(mismatched.embodimentFocusNode, 'binoshetLumi')
  assert.equal(mismatched.nodeId, mismatched.embodimentFocusNode)

  const privatePaused = normalizeSavedState(stateAt('agaYmerFund', {
    clock: 40,
    embodimentClock: 30,
    embodying: 'aga-ymer',
    embodimentFocusNode: 'agaYmer2',
    embodimentWorldNode: 'agaYmerFund',
    embodimentPaused: true,
    ended: null,
  }), fresh)
  assert.equal(privatePaused.embodimentPaused, true)
  assert.ok(PUBLIC_FREE_ROAM_NODES.includes(privatePaused.nodeId))
  assert.ok(PUBLIC_FREE_ROAM_NODES.includes(privatePaused.embodimentWorldNode))
  assert.equal(privatePaused.embodimentFocusNode, 'agaYmer2')

  const endingFocus = normalizeSavedState(stateAt('lumi', {
    clock: 40,
    embodimentClock: 30,
    embodying: 'binoshet',
    embodimentFocusNode: 'binoshetHije',
    embodimentWorldNode: 'lumi',
    embodimentPaused: true,
    ended: null,
  }), fresh)
  assert.equal(endingFocus.embodimentFocusNode, 'binoshetLumi')
  assert.equal(STORY[endingFocus.embodimentFocusNode].end, undefined)

  const forgedRuntime = {
    ...endingFocus,
    embodimentFocusNode: 'binoshetHije',
    embodimentArrivalSnapshot: { nodeId: 'binoshetHije' },
  }
  assert.equal(reducer(forgedRuntime, { type: 'RESUME_EMBODIMENT' }), forgedRuntime)

  const staleSnapshot = normalizeSavedState({
    ...endingFocus,
    embodimentFocusNode: 'binoshetNata',
    embodimentArrivalSnapshot: {
      nodeId: 'binoshetLumi', cameFrom: 'binoshetShpata', cameFromPhase: 'night',
      familiar: true, rumor: true, trail: ['binoshetShpata'],
    },
  }, fresh)
  assert.equal(staleSnapshot.embodimentArrivalSnapshot.nodeId, 'binoshetNata')
  assert.equal(staleSnapshot.embodimentArrivalSnapshot.cameFrom, null)
  assert.equal(staleSnapshot.embodimentArrivalSnapshot.cameFromPhase, null)
  assert.deepEqual(staleSnapshot.embodimentArrivalSnapshot.trail, [])

  const validEnding = normalizeSavedState(stateAt('agaYmerFund', {
    clock: 40,
    embodimentClock: 30,
    embodying: 'aga-ymer',
    embodimentFocusNode: 'agaYmerFund',
    embodimentWorldNode: 'plaka',
    embodimentPaused: false,
    ended: 'secret',
  }), fresh)
  assert.equal(validEnding.nodeId, 'agaYmerFund')
  assert.equal(validEnding.ended, 'secret')
  assert.equal(validEnding.embodimentPaused, false)
})

check('raw world fixtures and NPC positions advance while projected tale conditions wait', () => {
  const rawFire = stateAt('vatra', { clock: 107, fixtures: { campfire: 100 } })
  const projectedFire = { ...rawFire, conditionClock: 101 }
  assert.equal(fireStateOf(rawFire), 'fireLow')
  assert.equal(fireStateOf(projectedFire), 'fireBig')

  let movingNpc = null
  for (const [npcId, npc] of Object.entries(NPCS)) {
    if (npc.once) continue
    for (let clock = 0; clock < 48; clock++) {
      const early = npcNodeOf(stateAt('start', { clock }), npcId)
      const late = npcNodeOf(stateAt('start', { clock: clock + 8 }), npcId)
      if (early && late && early !== late) {
        movingNpc = { npcId, clock, early, late }
        break
      }
    }
    if (movingNpc) break
  }
  assert.ok(movingNpc, 'no moving looping NPC available for the projection test')
  const rawNpcState = stateAt('start', { clock: movingNpc.clock + 8 })
  const projectedNpcState = { ...rawNpcState, conditionClock: movingNpc.clock }
  assert.equal(npcNodeOf(rawNpcState, movingNpc.npcId), movingNpc.late)
  assert.equal(npcNodeOf(projectedNpcState, movingNpc.npcId), movingNpc.early)

  for (const [id, quest] of Object.entries(EMBODIMENT_QUESTS)) {
    for (const nodeId of quest.nodes) {
      assert.equal(STORY[nodeId]?.startsNpc, undefined, `${id}.${nodeId}: starts an NPC inside split time`)
      for (const option of STORY[nodeId]?.options || []) if (option.activateFixture) {
        assert.equal(option.activateFixture, 'millLamp', `${id}.${nodeId}->${option.to}: unexpected tale fixture`)
        assert.equal(nodeId, 'maroMulli1', `${id}.${nodeId}->${option.to}: fixture activated away from its place`)
      }
    }
  }

  const taleLamp = stateAt('maroMulli1', {
    clock: 109,
    conditionClock: 102,
    fixtures: { millLamp: 100 },
  })
  assert.equal(fixtureStateOf(taleLamp, 'millLamp'), 'bright')
  assert.equal(fixtureStateOf({ ...taleLamp, conditionClock: 106 }, 'millLamp'), 'low')
})

check('the UI exposes confirmation, persistent identity, guidance and locked reasons', () => {
  const confirm = uiText('../src/components/EmbodimentConfirm.jsx')
  const focus = uiText('../src/components/EmbodimentFocus.jsx')
  const guide = uiText('../src/components/GuideView.jsx')
  const story = uiText('../src/components/StoryView.jsx')
  const passage = uiText('../src/components/TimePassage.jsx')
  const worldContext = uiText('../src/components/WorldContext.jsx')
  const achievements = uiText('../src/components/AchievementsView.jsx')
  const practice = uiText('../src/components/PracticeView.jsx')
  const atlas = uiText('../src/components/AtlasView.jsx')
  const map = uiText('../src/components/WorldMapView.jsx')
  const app = uiText('../src/App.jsx')
  assert.match(confirm, /role="dialog"/)
  assert.match(confirm, /No words or tokens are spent until you confirm/)
  assert.match(confirm, /public roads and places/)
  assert.match(confirm, /tale-only scenes, endings, unrelated actions, and other character roles remain locked/)
  assert.match(confirm, /waiting scene's hour, arrival, and conditions freeze while the living world continues/)
  assert.match(confirm, /traveller's pack and health wait outside/)
  assert.match(confirm, /begins at full role health/)
  assert.match(confirm, /surviving ending restores your exact traveller pack and health/)
  assert.doesNotMatch(confirm, /whole open world/)
  assert.match(guide, /public\s+roads and places/)
  assert.match(guide, /tale-only scenes, endings, unrelated deeds, and other character\s+roles remain locked/)
  assert.match(guide, /arrival, and conditions wait exactly as you left them while the living world's date/)
  assert.match(guide, /traveller's pack and health\s+wait outside the role/)
  assert.match(guide, /begins at full role health/)
  assert.match(guide, /surviving ending restores your exact traveller pack and\s+health/)
  assert.match(focus, /You are far from your part in the tale/)
  assert.match(focus, /RESUME_EMBODIMENT/)
  assert.match(focus, /embodimentFocusState\(state, focusNode\)/)
  assert.match(focus, /waiting scene remains at \$\{talePhase\} while the living world is \$\{worldPhase\} and continues/)
  assert.match(focus, /optionEnglishReadingOf\(option\.text\)/)
  assert.doesNotMatch(focus, /\.map\(\(token\) => token\.en\)/)
  assert.match(focus, /Your next step (?:is|remains):/)
  assert.match(story, /currentStoryState\(state\)/)
  assert.match(story, /WorldContext state=\{storyState\} worldClock=\{state\.clock\}/)
  assert.match(story, /roleReason/)
  assert.match(story, /const visibleOwnedIds = ownedIds/)
  assert.match(story, /const usableOwned = state\.embodying \? \[\]/)
  assert.match(story, /Role props are visible here and used through the choices they unlock/)
  assert.match(story, /Direct traveller\s+item actions wait outside with your own pack/)
  assert.match(story, /Authored story flags live in state\.flags/)
  assert.match(passage, /passage\.clockKind === 'tale'/)
  assert.match(passage, /Tale calendar before and after/)
  assert.match(passage, /Living world:/)
  assert.match(passage, /isTalePassage \? 'tale clock' : 'living-world clock'/)
  assert.match(worldContext, /Tale scene conditions/)
  assert.match(worldContext, /These conditions wait during a detour/)
  assert.match(worldContext, /worldClock = state\.clock/)
  assert.match(achievements, /disabled=\{roleTestLocked\}/)
  assert.match(achievements, /Finish this character&apos;s tale before taking an/)
  assert.match(practice, /embodimentOptionAccess\(state, opt, STORY\[opt\.to\]\)\.ok/)
  assert.match(practice, /!opt\.confuser/)
  assert.match(atlas, /const objective = state\.embodying && state\.embodimentPaused \? state\.embodimentFocusNode : null/)
  assert.match(atlas, /playerMapLabel\(objective\)/)
  assert.match(atlas, /chartDirection\(dx, dy\)\?\.label/)
  assert.match(atlas, /distanceBand\(Math\.hypot\(dx, dy\)\)/)
  assert.match(atlas, /Look for its violet double ring/)
  assert.match(map, /violet double ring marks where your character&apos;s tale is waiting/)
  assert.match(map, /your character tale waits here/)
  assert.match(app, /focus\?\.focus\(\)/)
})

for (const result of checks) {
  console.log(`${result.ok ? '✅' : '❌'} ${result.name}${result.ok ? '' : ` — ${result.error}`}`)
}
const failed = checks.filter((result) => !result.ok)
console.log(`\n${failed.length ? '❌' : '✅'} ${checks.length - failed.length}/${checks.length} embodiment checks pass`)
console.log(
  `Temporal matrix: ${suspendedSceneTrials.toLocaleString('en-US')} focus/hour detour-save-resume trials; ` +
  `${taleProjectionTrials.toLocaleString('en-US')} tale-edge projections; ` +
  `${detourClockTrials.toLocaleString('en-US')} public detour projections; ` +
  `${talePassageTrials.toLocaleString('en-US')} two-clock long-passage projections.`,
)
if (failed.length) process.exitCode = 1
