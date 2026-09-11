// Release gate for the playable, persisted preparation journey.

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import {
  CEFR_PREPARATION_ACTIVITIES,
  CEFR_PREPARATION_MECHANICS,
  CEFR_PREPARATION_SCENARIO_COMPANION,
  CEFR_PREPARATION_VERSION,
  preparationPlan,
  preparationReadiness,
} from '../src/game/cefrPreparation.js'
import {
  emptyCefrPreparationState,
  liveCefrPreparationEvidence,
  normalizeCefrPreparationState,
  recordCefrPreparationAttempt,
} from '../src/game/cefrPreparationEvidence.js'
import { completedWordProgress } from '../src/game/wordProgression.js'
import { cefrPreparationLoreLabels } from '../src/game/cefrPreparationPresentation.js'
import { newRun, reducer } from '../src/game/gameState.js'

const componentSource = readFileSync(new URL('../src/components/CefrPreparation.jsx', import.meta.url), 'utf8')
const capstoneSource = readFileSync(new URL('../src/components/CefrCapstone.jsx', import.meta.url), 'utf8')
const stateSource = readFileSync(new URL('../src/game/gameState.js', import.meta.url), 'utf8')
const evidenceStateSource = readFileSync(new URL('../src/game/cefrPreparationEvidenceState.js', import.meta.url), 'utf8')
const failures = []
const check = (label, fn) => {
  try {
    fn()
    console.log(`✓ ${label}`)
  } catch (error) {
    failures.push(`${label}: ${error.message}`)
    console.error(`✗ ${label}: ${error.message}`)
  }
}

check('all 23 registered activities have a playable response renderer', () => {
  assert.equal(CEFR_PREPARATION_ACTIVITIES.length, 23)
  const responseKinds = new Set(CEFR_PREPARATION_ACTIVITIES.map(({ response }) => response.kind))
  for (const kind of responseKinds) {
    assert.match(componentSource, new RegExp(`response\\.kind === ['\"]${kind}['\"]|case ['\"]${kind}['\"]`), kind)
  }
  for (const activity of CEFR_PREPARATION_ACTIVITIES) {
    assert.ok(CEFR_PREPARATION_MECHANICS[activity.mechanicId], activity.id)
    const lore = cefrPreparationLoreLabels(activity, { knowledge: { 'npcName:elira': true } })
    assert.ok(lore.place && !lore.place.includes(activity.loreAnchor.nodeId), `${activity.id} exposes a raw place id`)
    if (activity.loreAnchor.npcId) assert.ok(lore.companion, `${activity.id} lacks a companion label`)
    if (activity.response.kind === 'paragraph-plan') {
      assert.ok(activity.connectorOptions?.length || activity.requiredLinks?.some(({ allowedSenseIds }) => allowedSenseIds.length), `${activity.id} cannot render connectors`)
    }
  }
})

check('deterministic practice does not leak a story NPC name while the current-story badge stays identity-aware', () => {
  assert.equal(CEFR_PREPARATION_SCENARIO_COMPANION, 'the villager')
  assert.doesNotMatch(componentSource, /\bElira\b/,
    'a deterministic component label bypasses the scenario companion role')
  for (const activity of CEFR_PREPARATION_ACTIVITIES) {
    assert.doesNotMatch(activity.instruction, /\bElira\b/,
      `${activity.id} reveals a persistent story identity in deterministic instructions`)
  }

  const activity = CEFR_PREPARATION_ACTIVITIES.find(({ loreAnchor }) => loreAnchor.npcId === 'elira')
  assert.ok(activity, 'no preparation activity exercises a discoverable companion')
  assert.equal(cefrPreparationLoreLabels(activity, {}).companion, 'the woman from the bridge')
  assert.equal(
    cefrPreparationLoreLabels(activity, { knowledge: { 'npcName:elira': true } }).companion,
    'Elira',
  )
  assert.match(componentSource, /Current story · \{lorePlace\}/,
    'the live story badge is not visibly separated from the deterministic exercise')
})

check('preparation completion is normalized and distinct from capstone evidence', () => {
  let state = emptyCefrPreparationState()
  const activity = CEFR_PREPARATION_ACTIVITIES[0]
  state = recordCefrPreparationAttempt(state, activity.id, activity.mechanicId, false)
  assert.equal(state.cefrPreparationAttempts[activity.id], 1)
  assert.deepEqual(state.cefrPreparationPasses, {})
  state = recordCefrPreparationAttempt(state, activity.id, activity.mechanicId, true)
  assert.equal(state.cefrPreparationAttempts[activity.id], 2)
  assert.deepEqual(state.cefrPreparationPasses[activity.mechanicId], [activity.id])
  assert.equal(Object.hasOwn(state, 'cefrEvidence'), false)
  assert.equal(JSON.stringify(state).includes('answer'), false)
  assert.equal(JSON.stringify(state).includes('recording'), false)

  const dirty = normalizeCefrPreparationState({
    ...state,
    cefrPreparationPasses: {
      ...state.cefrPreparationPasses,
      '__proto__': ['bad'],
      [activity.mechanicId]: [activity.id, activity.id, 'not-real'],
    },
    cefrPreparationAttempts: { [activity.id]: 4, 'not-real': 99 },
    draft: 'must not survive',
  })
  assert.deepEqual(dirty.cefrPreparationPasses[activity.mechanicId], [activity.id])
  assert.deepEqual(dirty.cefrPreparationAttempts, { [activity.id]: 4 })
  assert.equal(dirty.cefrPreparationVersion, CEFR_PREPARATION_VERSION)

  const structurallySafeButUnknown = normalizeCefrPreparationState({
    cefrPreparationVersion: CEFR_PREPARATION_VERSION,
    cefrPreparationPasses: { [activity.mechanicId]: ['a1-not-a-current-activity'] },
    cefrPreparationAttempts: { 'a1-not-a-current-activity': 2 },
  })
  assert.deepEqual(structurallySafeButUnknown.cefrPreparationPasses[activity.mechanicId], ['a1-not-a-current-activity'])
  assert.deepEqual(
    liveCefrPreparationEvidence(structurallySafeButUnknown, []).mechanicPasses,
    {},
    'an unknown preparation activity survived task-aware readiness normalization',
  )
})

check('the reducer records only preparation evidence, never rewards or health changes', () => {
  const before = newRun()
  const activity = CEFR_PREPARATION_ACTIVITIES[0]
  const after = reducer(before, {
    type: 'CEFR_PREPARATION_ATTEMPT',
    activityId: activity.id,
    mechanicId: activity.mechanicId,
    passed: true,
  })
  assert.deepEqual(after.mana, before.mana)
  assert.deepEqual(after.practiced, before.practiced)
  assert.equal(after.hearts, before.hearts)
  assert.deepEqual(after.cefrEvidence, before.cefrEvidence)
  assert.deepEqual(after.cefrPreparationPasses[activity.mechanicId], [activity.id])
})

check('readiness consumes exact live word-capability evidence rather than totals', () => {
  const focusIds = [...new Set(CEFR_PREPARATION_ACTIVITIES.flatMap(({ focusSenseIds }) => focusSenseIds))]
  const discovered = Object.fromEntries(focusIds.map((id) => [id, true]))
  const noProof = liveCefrPreparationEvidence({ discovered, wordProgress: {} }, [])
  assert.equal(preparationReadiness('a1-audio-meaning', noProof).ready, false)

  const wordProgress = Object.fromEntries(focusIds.map((id) => [id, completedWordProgress()]))
  const proved = liveCefrPreparationEvidence({ discovered, wordProgress }, [])
  assert.equal(preparationReadiness('a1-audio-meaning', proved).ready, true)
  assert.equal(preparationReadiness('a2-gist-detail', proved).ready, false)
  assert.ok(preparationReadiness('a2-gist-detail', proved).reasons.includes('requires-level:A1'))
})

check('every level plan is ordered, finite and starts locked from a blank save', () => {
  const blank = liveCefrPreparationEvidence({}, [])
  for (const level of ['A1', 'A2']) {
    const plan = preparationPlan(level, blank)
    assert.ok(plan.length > 0, level)
    assert.deepEqual(plan.map(({ mechanic }) => mechanic.order), [...plan.map(({ mechanic }) => mechanic.order)].sort((a, b) => a - b))
    assert.ok(plan.every(({ readiness }) => readiness.ready === false), `${level} exposed from zero`)
  }
})

check('cold-start capstones require completed guided preparation', () => {
  assert.match(capstoneSource, /!preparation\.byLevel\[level\]\.complete/)
  assert.match(capstoneSource, /Complete the .* guided preparation path before using a fresh readiness form/)
  assert.doesNotMatch(capstoneSource, /A beginner may\s+try A1 at any time/)
  assert.match(capstoneSource, /preparationMechanicsForCapstone/)
  assert.match(capstoneSource, /cefrFamilyReachability/)
  assert.doesNotMatch(capstoneSource, /freshStatus|miss budget/)
  assert.doesNotMatch(capstoneSource, /words discovered in this run|words with exact Train evidence|\.completed\}\/\{/)
})

check('listening, repair and recording preserve their learning boundaries', () => {
  assert.match(componentSource, /beforeAttempt === 'audio-only'/)
  assert.match(componentSource, /attempted && <blockquote/)
  assert.match(componentSource, /branchPrompt: result\.nextPrompt/)
  assert.match(componentSource, /branchOptionIds: result\.nextReplyOptionIds/)
  assert.match(componentSource, /evaluatePreparationResponse\(activity\.id, \{ optionIds \}\)/)
  assert.doesNotMatch(componentSource, /completedSupportedExchange/)
  assert.doesNotMatch(componentSource, /onAttempt\(activity\.id, false\)[\s\S]{0,100}branchPrompt/)
  assert.match(componentSource, /repairStep: step\.id/)
  assert.match(componentSource, /getUserMedia\(\{ audio: true \}\)/)
  assert.match(componentSource, /URL\.revokeObjectURL/)
  assert.match(componentSource, /never saved or uploaded/)
  assert.match(componentSource, /Practice changes no hearts or word tokens/)
  assert.match(componentSource, /cefrPreparationLoreLabels/)
  assert.doesNotMatch(componentSource, /localStorage|fetch\(|XMLHttpRequest|sendBeacon/)
})

check('ordinary preparation hides raw counters while debug retains exact diagnostics', () => {
  assert.match(componentSource, /debug && <span>\{attempts\}/)
  assert.match(componentSource, /state\.debug\s*\? `\$\{summary\.byLevel\[level\]\.completed\}\/\$\{summary\.byLevel\[level\]\.total\}/)
  assert.match(componentSource, /debug \? ` and \$\{capabilityReasons\.length - 1\} more needed words` : ' and the other required words'/)
})

check('preparation state survives load and both run transitions', () => {
  assert.match(stateSource, /normalizeCefrPreparationState\(saved\)/)
  assert.match(stateSource, /function restartStoryRun\(state\)[\s\S]*?\.\.\.normalizeCefrPreparationState\(state\)/)
  assert.ok((stateSource.match(/return restartStoryRun\(state\)/g) || []).length >= 2)
  assert.match(stateSource, /case 'CEFR_PREPARATION_ATTEMPT'/)
  assert.doesNotMatch(stateSource, /from ['"]\.\/cefrPreparationEvidence\.js['"]/)
  assert.match(stateSource, /from ['"]\.\/cefrPreparationEvidenceState\.js['"]/)
  assert.doesNotMatch(evidenceStateSource, /cefrPreparation\.js|CEFR_PREPARATION_ACTIVITIES/)
})

if (failures.length) {
  console.error(`\n${failures.length} CEFR preparation UI audit failure(s).`)
  process.exit(1)
}

console.log(`\nCEFR preparation UI audit passed: ${CEFR_PREPARATION_ACTIVITIES.length} playable activities with versioned, compact evidence.`)
