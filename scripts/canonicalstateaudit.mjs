// Cross-system release gate: each stateful mechanic owns one canonical field.
// This catches shadow copies and partial transactions before a story-specific
// audit has to discover them through one particular route.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { ITEMS, STORY, lineOf } from '../src/game/content.js'
import {
  RETIRED_SHADOW_STATE_KEYS,
  environmentSnapshot,
  hasCond,
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
  storyScenePresentationForState,
} from '../src/game/gameState.js'
import { ACHIEVEMENT_RULE_BY_ID } from '../src/game/achievementRules.js'
import { testFor } from '../src/game/comprehension.js'
import { storyReadingReceiptIds } from '../src/game/storyReadings.js'
import { loadNpcAppearancePartitions } from './lib/loadnpcappearances.mjs'
import { attachReviewedEnglishReadings } from '../src/game/language.js'
import { REVIEWED_READINGS } from '../src/game/data/readings/reviewedReadings.js'
import {
  applyOptionEffects,
  optionEffectAvailability,
  optionEffectsAreValid,
  optionEffectsOf,
} from '../src/game/stateMechanics.js'
import { QUESTS, QUEST_STATE_VERSION } from '../src/game/quests.js'
import { NPCS } from '../src/game/npcs.js'
import { npcIdentityKnowledgeId } from '../src/game/npcIdentity.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import { WORLD_ENTITIES, worldRelationsForState } from '../src/game/worldEntities.js'

await loadNpcAppearancePartitions()
attachReviewedEnglishReadings(STORY, REVIEWED_READINGS)

const recordPresentedReadings = (state) => reducer(state, {
  type: 'RECORD_STORY_READINGS', nodeId: state.nodeId, turn: state.turn,
  lineIds: storyReadingReceiptIds(state.nodeId,
    storyScenePresentationForState(state).normalEntries.map(({ line }) => line)),
})

const livedPrespaFreedom = () => {
  let state = { ...newRun(), nodeId: 'prespaPyll', cameFrom: 'pylli1' }
  const option = STORY.prespaPyll.options.find((candidate) => candidate.to === 'prespaLiri')
  const optionIndex = STORY.prespaPyll.options.indexOf(option)
  state = reducer(state, { type: 'DEBUG_GRANT', ids: phraseSenses(option.text) })
  state = recordPresentedReadings(state)
  state = reducer(state, {
    type: 'CHOOSE', option, targetNode: STORY[option.to], optionId: `opt-${optionIndex}`,
    optionIndex, fromNodeId: state.nodeId, fromTurn: state.turn,
  })
  assert.equal(state.nodeId, 'prespaLiri')
  return recordPresentedReadings(state)
}

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push({ name, ok: true })
    console.log(`✓ ${name}`)
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
    console.log(`✗ ${name}: ${error.message}`)
  }
}

check('new runs expose one authority for each durable world mechanic', () => {
  const state = newRun()
  assert.ok(state.inventory && Number.isInteger(state.clock) && typeof state.nodeId === 'string')
  assert.ok(state.knowledge && state.worldFacts && state.quests)
  assert.equal(state.questStateVersion, QUEST_STATE_VERSION)
  for (const key of RETIRED_SHADOW_STATE_KEYS) assert.equal(Object.hasOwn(state, key), false, key)
  assert.equal(Object.hasOwn(state, 'season'), false)
  assert.equal(Object.hasOwn(state, 'weather'), false)
})

check('save normalization removes shadow money, time, location, identity, fact, and quest fields', () => {
  const fresh = newRun()
  const saved = {
    ...fresh,
    nodeId: 'fshatiSheshi', clock: 41,
    inventory: { lek: 275, buke: 1 },
    knowledge: { 'npcName:elira': { atClock: 2, source: 'audit' } },
    worldFacts: { rainReturned: { atClock: 20, source: 'audit' } },
    quests: {},
  }
  for (const key of RETIRED_SHADOW_STATE_KEYS) saved[key] = `stale:${key}`
  const normalized = normalizeSavedState(saved, fresh)
  for (const key of RETIRED_SHADOW_STATE_KEYS) assert.equal(Object.hasOwn(normalized, key), false, key)
  assert.equal(normalized.nodeId, 'fshatiSheshi')
  assert.equal(normalized.clock, 41)
  assert.equal(normalized.inventory.lek, 275)
  assert.equal(normalized.inventory.buke, 1)
  assert.ok(normalized.knowledge['npcName:elira'])
  assert.ok(normalized.worldFacts.rainReturned)
})

check('physical items cannot be forged through the story-flag channel', () => {
  for (const itemId of Object.keys(ITEMS)) {
    const forged = { ...newRun(), inventory: {}, flags: { [itemId]: true } }
    assert.equal(hasCond(forged, itemId), false, `${itemId}: bare item gate accepted a flag`)
    assert.equal(hasCond(forged, `flag:${itemId}`), false, `${itemId}: explicit flag gate accepted an item alias`)
  }
  const normalized = normalizeSavedState({
    ...newRun(), flags: { buke: true, kripe: true, ordinaryStoryFlag: true }, inventory: {},
  }, newRun())
  assert.deepEqual(normalized.flags, { ordinaryStoryFlag: true })
})

check('all authored effects use valid non-overlapping canonical channels', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [optionIndex, option] of node.options.entries()) {
      assert.equal(optionEffectsAreValid(option), true, `${nodeId}.options[${optionIndex}] invalid effects`)
      const effects = optionEffectsOf(option)
      const signatures = effects.map(({ legacy: _legacy, ...effect }) => JSON.stringify(effect))
      assert.equal(new Set(signatures).size, signatures.length,
        `${nodeId}.options[${optionIndex}] applies a canonical effect twice`)
      for (const effect of effects) {
        if (effect.type === 'inventory') assert.ok(ITEMS[effect.id], `${nodeId}: unknown item ${effect.id}`)
        if (effect.type === 'flag') assert.equal(Boolean(ITEMS[effect.id]), false,
          `${nodeId}: physical item ${effect.id} authored as a flag`)
        if (effect.type === 'resource') assert.ok(['lek', 'hearts'].includes(effect.id),
          `${nodeId}: unknown resource ${effect.id}`)
      }
    }
  }
})

check('every authored inventory or money cost is checked and applied as one transaction', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [optionIndex, option] of node.options.entries()) {
      const effects = optionEffectsOf(option)
      const relevant = effects.filter((effect) =>
        (effect.type === 'inventory' || (effect.type === 'resource' && effect.id === 'lek')) &&
        Number.isSafeInteger(effect.delta))
      if (!relevant.some((effect) => effect.delta < 0)) continue

      const required = {}
      const running = {}
      for (const effect of relevant) {
        const id = effect.type === 'resource' ? 'lek' : effect.id
        running[id] = (running[id] || 0) + effect.delta
        required[id] = Math.max(required[id] || 0, -running[id])
      }
      const empty = { ...newRun(), inventory: {} }
      assert.equal(optionEffectAvailability(empty, option).ok, false,
        `${nodeId}.options[${optionIndex}] cost succeeds from an empty inventory`)
      const funded = { ...empty, inventory: { ...required } }
      assert.equal(optionEffectAvailability(funded, option).ok, true,
        `${nodeId}.options[${optionIndex}] rejects its exact required inventory`)
      const after = applyOptionEffects(funded, option, { maxHearts: 3 })
      for (const [id] of Object.entries(required)) {
        assert.ok((after.inventory[id] || 0) >= 0, `${nodeId}.options[${optionIndex}] made ${id} negative`)
      }
    }
  }
})

check('NPC identity is canonical knowledge, never an ad-hoc story flag', () => {
  const ids = Object.keys(NPCS).map(npcIdentityKnowledgeId).filter(Boolean)
  assert.equal(new Set(ids).size, ids.length)
  for (const node of Object.values(STORY)) for (const option of node.options) {
    for (const effect of optionEffectsOf(option)) {
      if (effect.type === 'flag') assert.equal(effect.id.startsWith('npcName:'), false)
    }
  }
})

check('time, weather, season, and physical place remain projections of clock and node id', () => {
  const state = { ...newRun(), nodeId: 'fshatiSheshi', clock: 41 }
  const environment = environmentSnapshot(state)
  assert.equal(typeof environment.season, 'string')
  assert.equal(typeof environment.weather, 'string')
  assert.equal(PLACE_OF[state.nodeId], 'fshatiSheshi')
  const altered = normalizeSavedState({ ...state, season: 'stale', weather: 'stale', location: 'start' }, newRun())
  assert.deepEqual(environmentSnapshot(altered), environment)
  assert.equal(altered.nodeId, 'fshatiSheshi')
})

check('typed world entities project canonical state without adding a shadow ledger', () => {
  const state = { ...newRun(), nodeId: 'lendina', inventory: { buke: 2 }, fixtures: { campfire: 13 } }
  const relations = worldRelationsForState(state, { clock: 13 })
  assert.ok(relations.some((entry) => entry.subject === 'actor:player' && entry.target === 'place:lendina'))
  assert.ok(relations.some((entry) => entry.subject === 'item:buke' && entry.count === 2))
  assert.ok(relations.some((entry) => entry.subject === 'fixture:campfire' && entry.state === 'bright'))
  assert.equal(WORLD_ENTITIES['item:buke'].authority.channel, 'inventory')
  assert.equal(WORLD_ENTITIES['fixture:campfire'].authority.channel, 'fixtures')
  assert.equal(Object.hasOwn(state, 'entities'), false)
  assert.equal(Object.hasOwn(state, 'relations'), false)
})

check('quest state resets per run while learned identity and world consequences persist', () => {
  const state = {
    ...newRun(),
    quests: { [Object.keys(QUESTS)[0]]: { status: 'active', acceptedAtClock: 3 } },
    inventory: { buke: 1, lek: 800 },
    flags: { temporary: true },
    knowledge: { 'npcName:elira': { atClock: 2, source: 'audit' } },
    worldFacts: { rainReturned: { atClock: 4, source: 'audit' } },
  }
  const reset = reducer(state, { type: 'RESET' })
  assert.deepEqual(reset.quests, {})
  assert.deepEqual(reset.inventory, {})
  assert.deepEqual(reset.flags, {})
  assert.ok(reset.knowledge['npcName:elira'])
  assert.ok(reset.worldFacts.rainReturned)
})

check('story reading receipts accept only current normal projection and reject stale or hidden surfaces', () => {
  const state = { ...newRun(), nodeId: 'prespaPyll', cameFrom: 'pylli1' }
  const plan = storyScenePresentationForState(state)
  const visible = storyReadingReceiptIds(state.nodeId, plan.normalEntries.map(({ line }) => line))
  const hidden = storyReadingReceiptIds(state.nodeId, STORY[state.nodeId].text.map(lineOf))
    .filter((id) => !visible.includes(id))
  assert.ok(hidden.length, 'Prespa must retain a conditionally hidden proposal/wedding variant')
  const action = { type: 'RECORD_STORY_READINGS', nodeId: state.nodeId, turn: state.turn, lineIds: visible }
  const recorded = reducer(state, action)
  assert.ok(recorded.storyReadings.length)
  assert.equal(reducer(recorded, action), recorded, 'rerender recounted the same reading')
  for (const lineIds of [hidden, [...visible, hidden[0]], ['constructor@bad'], ['__proto__@bad'], [null], [{}]]) {
    assert.equal(reducer(state, { ...action, lineIds }), state, 'non-visible source entered the receipt ledger')
  }
  assert.equal(reducer(state, { ...action, turn: state.turn + 1 }), state)
  assert.equal(reducer(state, { ...action, nodeId: 'prespaLiri' }), state)
  const crowded = Object.keys(STORY).map((nodeId) => ({ ...newRun(), nodeId }))
    .map((candidate) => ({ state: candidate, plan: storyScenePresentationForState(candidate) }))
    .find(({ plan: candidate }) => candidate.omittedAmbient.length)
  assert.ok(crowded, 'ambient receipt exclusion fixture is missing')
  const omitted = storyReadingReceiptIds(crowded.state.nodeId, crowded.plan.omittedAmbient.map(({ line }) => line))
  assert.equal(reducer(crowded.state, {
    type: 'RECORD_STORY_READINGS', nodeId: crowded.state.nodeId, turn: crowded.state.turn, lineIds: omitted,
  }), crowded.state, 'debug-only ambient prose entered normal reading evidence')
})

check('reading achievements require all exact canonical answers from the recorded route', () => {
  const state = livedPrespaFreedom()
  const achievement = ACHIEVEMENT_RULE_BY_ID.prespaLiri
  const questions = testFor(achievement, 0, state)
  assert.ok(questions?.length)
  for (const question of questions) {
    assert.ok(question.sourceLineIds.length)
    assert.ok(question.sourceLineIds.every((id) => state.achievementReadings.prespaLiri.lineIds.includes(id)))
  }
  const action = { type: 'EARN_ACHIEVEMENT', id: achievement.id, expectedAttempt: 0, answers: questions.map(({ correct }) => correct) }
  assert.equal(reducer(state, { type: 'EARN_ACHIEVEMENT', id: achievement.id }), state)
  assert.equal(reducer(state, { ...action, expectedAttempt: 1 }), state)
  assert.equal(reducer(state, { ...action, answers: action.answers.slice(1) }), state)
  assert.equal(reducer(state, { ...action, answers: action.answers.map(() => 'unproven') }), state)
  const noReceipts = { ...state, achievementReadings: {} }
  assert.equal(testFor(achievement, 0, noReceipts), null)
  assert.equal(reducer(noReceipts, action), noReceipts, 'missing provenance awarded an achievement')
  const earned = reducer(state, action)
  assert.equal(earned.earned[achievement.id], true)
  assert.equal(reducer(earned, action), earned, 'replayed passing answers changed the state')
  assert.deepEqual(earned.cefrEvidence, state.cefrEvidence, 'reading practice fabricated CEFR evidence')
})

check('comprehension misses rebuild the same recorded question and apply correction atomically', () => {
  const state = livedPrespaFreedom()
  const questions = testFor(ACHIEVEMENT_RULE_BY_ID.prespaLiri, 0, state)
  const attemptedEnglish = questions[0].options.find((option) => option !== questions[0].correct)
  const action = { type: 'COMP_WRONG', id: 'prespaLiri', expectedAttempt: 0, questionIndex: 0, attemptedEnglish }
  assert.equal(reducer(state, { ...action, attemptedEnglish: 'not a rendered choice' }), state)
  const missed = reducer(state, action)
  assert.equal(missed.hearts, state.hearts - 1)
  assert.equal(missed.attempts.prespaLiri, 1)
  assert.ok(missed.pendingHeartConsequence)
  assert.equal(reducer(missed, action), missed, 'one miss charged twice')
  assert.deepEqual(missed.achievementReadings, state.achievementReadings, 'a miss changed its own route provenance')
})

check('ordinary player components do not render a quest ledger or canonical-state HUD', () => {
  const storyView = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(storyView, /state\.quests|questStatusOf|QUESTS\[/,
    'StoryView renders a quest ledger instead of authored Albanian consequences')
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(app, /state\.quests|questStatusOf|QUESTS\[/,
    'App renders a quest ledger outside debug mode')
})

const failed = checks.filter((result) => !result.ok)
if (failed.length > 0) {
  console.error(`\n${failed.length} canonical-state audit check(s) failed.`)
  process.exit(1)
}
console.log(`\nCanonical-state audit passed (${checks.length} contracts).`)
