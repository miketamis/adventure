// Prove that the shipped, non-debug game contains a complete route from a
// blank save through durable word learning, guided A1/A2 preparation and the
// held-out readiness gates. This is a reachability audit, not a claim that an
// unproctored browser self-check is an accredited CEFR certificate.

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DICT, START_NODE, STORY, lineOf } from '../src/game/content.js'
import {
  cefrProfile,
  performanceEvidenceFor,
  receptionEvidenceFor,
} from '../src/game/cefrAssessment.js'
import {
  CEFR_PREPARATION_ACTIVITIES,
  CEFR_PREPARATION_MECHANICS,
  evaluatePreparationResponse,
  preparationPlan,
} from '../src/game/cefrPreparation.js'
import { liveCefrPreparationEvidence } from '../src/game/cefrPreparationEvidence.js'
import { CEFR_TASKS } from '../src/game/cefrTasks.js'
import { reviewedFormTargets, wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { lexicalTrainability } from '../src/game/lexicalTrainability.js'
import { newRun, normalizeSavedState, reducer } from '../src/game/gameState.js'
import { trainQuestionWordKeys } from '../src/game/phrasePractice.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import { WORD_CAPABILITY_DEFINITIONS, wordCapabilitySnapshot } from '../src/game/wordProgression.js'
import { analyzeDiscovery, sensesOf } from './lib/discovery.mjs'

const componentSource = readFileSync(new URL('../src/components/CefrCapstone.jsx', import.meta.url), 'utf8')
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

const focusSenseIds = [...new Set(CEFR_PREPARATION_ACTIVITIES.flatMap(({ focusSenseIds: ids }) => ids))]
const capabilityIndex = new Map(WORD_CAPABILITY_DEFINITIONS.map(({ id }, index) => [id, index]))
const DISJOINT_SUPPORT_SENSE_IDS = ['pershendetje', 'jo', 'si', 'cfare', 'pse', 'kush']
const discoverySenseIds = [...new Set([...focusSenseIds, ...DISJOINT_SUPPORT_SENSE_IDS])]
const requiredCapabilityBySense = new Map(focusSenseIds.map((senseId) => {
  const capabilities = CEFR_PREPARATION_ACTIVITIES
    .filter(({ focusSenseIds: ids }) => ids.includes(senseId))
    .map(({ mechanicId }) => CEFR_PREPARATION_MECHANICS[mechanicId].readiness.wordCapabilityId)
  return [senseId, capabilities.sort((left, right) => capabilityIndex.get(right) - capabilityIndex.get(left))[0]]
}))

const capabilityStatusPasses = (definition, status) => status === 'passed' ||
  (definition.conditional && status === 'inapplicable')

const snapshotMeetsCapability = (snapshot, requiredCapabilityId) => {
  const requiredIndex = capabilityIndex.get(requiredCapabilityId)
  if (!Number.isInteger(requiredIndex)) return false
  const capabilities = snapshot?.capabilities || {}
  return WORD_CAPABILITY_DEFINITIONS.slice(0, requiredIndex + 1).every((definition) =>
    capabilityStatusPasses(definition, capabilities[definition.id]?.status))
}

const senseMeetsCapability = (evidence, senseId, requiredCapabilityId) =>
  snapshotMeetsCapability(evidence.wordCapabilities?.[senseId], requiredCapabilityId)

const progressionOptionsBySense = new Map(focusSenseIds.map((senseId) => {
  return [senseId, wordProgressionOptionsForSense(senseId)]
}))

const liveWordSnapshot = (state, senseId) => wordCapabilitySnapshot(
  state.wordProgress?.[senseId],
  state.trainRound,
  progressionOptionsBySense.get(senseId),
)

const structural = analyzeDiscovery(STORY, START_NODE)
const distance = { [START_NODE]: 0 }
const queue = [START_NODE]
for (let index = 0; index < queue.length; index++) {
  const nodeId = queue[index]
  for (const option of structural.realOptions(nodeId)) {
    if (distance[option.to] != null) continue
    distance[option.to] = distance[nodeId] + 1
    queue.push(option.to)
  }
}

// A plain line, a first-arrival/unless line, or a wrapper with no positive
// requirement is visible on an ordinary first visit. A real ungated option is
// also a clickable discovery surface. Positive-condition scenes remain useful,
// but are not needed to prove this baseline route.
const visibleOnOrdinaryFirstVisit = (entry) => {
  if (Array.isArray(entry)) return true
  const hasPositiveCondition = [].concat(entry.cond || []).length > 0
  return entry.negate ? hasPositiveCondition : !hasPositiveCondition
}

const discoveryWitnesses = new Map(discoverySenseIds.map((senseId) => {
  const candidates = []
  for (const nodeId of structural.reachable) {
    for (const entry of STORY[nodeId].text || []) {
      if (visibleOnOrdinaryFirstVisit(entry) && sensesOf(lineOf(entry)).includes(senseId)) {
        candidates.push({ nodeId, depth: distance[nodeId], surface: 'story-line' })
      }
    }
    for (const option of STORY[nodeId].options || []) {
      if (option.to && !option.confuser && !option.reveal && !option.requires &&
          sensesOf(option.text).includes(senseId)) {
        candidates.push({ nodeId, depth: distance[nodeId], surface: 'story-option' })
      }
    }
  }
  candidates.sort((left, right) => left.depth - right.depth)
  return [senseId, candidates[0] || null]
}))

const correctPreparationAnswer = (entry) => {
  const response = entry.response
  switch (response.kind) {
    case 'single-choice': return { optionId: response.correctOptionId }
    case 'multiple-acceptable-choice': return { optionId: response.acceptedOptionIds[0] }
    case 'ordered-tiles': return { orderedIds: response.correctIds }
    case 'slot-selection': return { selections: response.correctSelections }
    case 'typed-exact': return { text: response.accepted[0] }
    case 'local-audio-cycle': return { recorded: true, replayed: true, selfCheck: response.acceptedSelfChecks[0] }
    case 'branch-by-intent': {
      const walk = (allowedIds, path = []) => {
        for (const optionId of allowedIds) {
          const option = entry.replyOptions.find(({ id }) => id === optionId)
          const branch = option && entry.branches[option.intent]
          if (!branch) continue
          const nextPath = [...path, optionId]
          if (branch.completes && nextPath.length >= (response.minimumTurns || 1)) return nextPath
          const completed = walk(branch.nextReplyOptionIds || [], nextPath)
          if (completed) return completed
        }
        return null
      }
      return { optionIds: walk(entry.initialReplyOptionIds || entry.replyOptions.map(({ id }) => id)) || [] }
    }
    case 'scan-and-relay': return { factId: response.correctFactId, relayId: response.acceptedRelayIds[0] }
    case 'ordered-rounds': return { byRound: Object.fromEntries(entry.rounds.map((round) => [round.id, round.correctOptionId])) }
    case 'fact-map': return { byPrompt: response.correctByPrompt }
    case 'connector-map': return { bySentence: response.correctBySentence }
    case 'reconstruct-and-reply': return { messageIds: response.correctMessageIds, replyId: response.acceptedReplyIds[0] }
    case 'paragraph-plan': {
      const available = entry.connectorOptions?.map(({ id }) => id) ||
        entry.requiredLinks?.flatMap(({ allowedSenseIds }) => allowedSenseIds) || []
      const connectorSenseIds = [...new Set([...response.requiredConnectorSenseIds, ...available])]
        .slice(0, response.minimumDistinctConnectors)
      return { roles: response.requiredRoles, connectorSenseIds }
    }
    case 'relay-and-agree': return { byStep: response.correctByStep }
    default: throw new Error(`No zero-start answer builder for ${entry.id}/${response.kind}`)
  }
}

const summaryFor = (state) => {
  const profile = cefrProfile(state.cefrEvidence)
  const achievedLevels = Object.entries(profile.achieved)
    .filter(([, passed]) => passed)
    .map(([level]) => level)
  const evidence = liveCefrPreparationEvidence(state, achievedLevels)
  const byLevel = Object.fromEntries(['A1', 'A2'].map((level) => {
    const plan = preparationPlan(level, evidence)
    const total = plan.reduce((sum, entry) => sum + entry.activities.length, 0)
    const completed = plan.reduce((sum, entry) => sum + entry.readiness.passedActivityIds.length, 0)
    return [level, { plan, total, completed, complete: total > 0 && total === completed }]
  }))
  return { profile, evidence, byLevel }
}

const completeWordCapabilities = (initial) => {
  let state = initial
  let guard = 0
  // Complete stronger requirements first. Once a focus is ready, later rounds
  // never select it as the answer and therefore cannot move it onto a fresh
  // form lane that would legitimately need new evidence.
  const orderedFocus = [...focusSenseIds].sort((left, right) =>
    capabilityIndex.get(requiredCapabilityBySense.get(right)) - capabilityIndex.get(requiredCapabilityBySense.get(left)))
  for (let focusIndex = 0; focusIndex < orderedFocus.length; focusIndex++) {
    const senseId = orderedFocus[focusIndex]
    const requiredCapabilityId = requiredCapabilityBySense.get(senseId)
    while (!snapshotMeetsCapability(liveWordSnapshot(state, senseId), requiredCapabilityId)) {
      // Ask the production scheduler for the target plus a small pool of real
      // focus words. When spacing or overlap excludes the target, one of those
      // words supplies the required disjoint round; the audit never advances a
      // clock or injects evidence by hand.
      const futureFocus = orderedFocus.slice(focusIndex + 1)
      const retainedSupport = orderedFocus.slice(0, focusIndex).filter((id) =>
        requiredCapabilityBySense.get(id) === 'strict-spaced-recall')
      const offset = futureFocus.length ? guard % futureFocus.length : 0
      const support = [
        ...futureFocus.slice(offset, offset + 4),
        ...futureFocus.slice(0, Math.max(0, 4 - (futureFocus.length - offset))),
        ...retainedSupport.slice(-4),
        ...DISJOINT_SUPPORT_SENSE_IDS,
      ]
        .filter((id, index, values) => id !== senseId && values.indexOf(id) === index)
        .slice(0, 14)
      let question = buildWordQuestion({
        discoveredIds: [senseId, ...support],
        mana: state.mana,
        wordProgress: state.wordProgress,
        currentRound: state.trainRound,
        excludeWords: state.trainLastWords,
        rng: () => 0,
      })
      assert.ok(question, `the real disjoint Train scheduler deadlocked while preparing ${senseId}`)
      const next = reducer(state, {
        type: 'PRACTICE_WORD_RESULT',
        correct: true,
        id: question.answerId,
        tier: question.tier,
        wordStageId: question.wordStageId,
        variantId: question.variantId,
        targetFormKey: question.targetFormKey,
        mode: question.mode,
        direction: question.dir,
        questionKey: question.questionKey,
        wordKeys: trainQuestionWordKeys(question),
      })
      assert.notEqual(next, state, `${question.answerId}: exact Train event was rejected`)
      assert.equal(next.hearts, state.hearts, `${question.answerId}: a correct Train answer changed health`)
      state = next
      assert.ok(++guard < 5000, 'word-capability simulation did not converge')
    }
  }
  return state
}

const completePreparationLevel = (initial, level) => {
  let state = initial
  let guard = 0
  while (!summaryFor(state).byLevel[level].complete) {
    const ready = summaryFor(state).byLevel[level].plan.find(({ readiness }) =>
      readiness.ready && !readiness.complete)
    assert.ok(ready, `${level}: no ready preparation step; dependency chain is circular or incomplete`)
    for (const entry of ready.activities) {
      if (ready.readiness.passedActivityIds.includes(entry.id)) continue
      const answer = correctPreparationAnswer(entry)
      const result = evaluatePreparationResponse(entry.id, answer)
      assert.equal(result.passed, true, `${entry.id}: production evaluator rejected its own keyed response`)
      state = reducer(state, {
        type: 'CEFR_PREPARATION_ATTEMPT',
        activityId: entry.id,
        mechanicId: entry.mechanicId,
        passed: true,
      })
    }
    assert.ok(++guard <= Object.keys(CEFR_PREPARATION_MECHANICS).length, `${level}: preparation did not converge`)
  }
  return state
}

const completeCapstoneLevel = (initial, level) => {
  let state = initial
  for (const task of CEFR_TASKS.filter((entry) => entry.level === level)) {
    const evidence = ['listening', 'reading'].includes(task.mode)
      ? receptionEvidenceFor(task, Object.fromEntries(task.questions.map((question) =>
        [question.id, question.acceptedChoiceIds[0]])))
      : performanceEvidenceFor(task, {
        taskFulfilment: 3,
        comprehensibility: 3,
        range: 3,
        control: 3,
        cohesion: 3,
      }, { pronunciationPass: true, recordingCaptured: true })
    state = reducer(state, { type: 'CEFR_RECORD_EVIDENCE', evidence })
  }
  assert.equal(cefrProfile(state.cefrEvidence)[level].passed, true, `${level}: perfect fresh forms did not meet the gate`)
  return state
}

let journey = newRun()

check('every guided focus and disjoint support word has an ordinary story discovery witness', () => {
  for (const senseId of discoverySenseIds) {
    assert.ok(DICT[senseId], `${senseId}: missing dictionary entry`)
    const witness = discoveryWitnesses.get(senseId)
    assert.ok(witness, `${senseId}: no first-visit story line or ungated story option on a reachable normal route`)
    assert.ok(Number.isInteger(witness.depth), `${senseId}: witness has no route from ${START_NODE}`)
  }
})

check('a blank non-debug save can discover and Train every focus through its exact required capability', () => {
  assert.equal(journey.debug, false)
  for (const senseId of discoverySenseIds) {
    journey = reducer(journey, { type: 'DISCOVER', id: senseId })
  }
  journey = completeWordCapabilities(journey)
  const evidence = liveCefrPreparationEvidence(journey, [])
  for (const [senseId, requiredCapabilityId] of requiredCapabilityBySense) {
    assert.equal(senseMeetsCapability(evidence, senseId, requiredCapabilityId), true,
      `${senseId}: required capability ${requiredCapabilityId} and its prerequisites were not reached`)
  }
})

check('blank-save proof reaches both exact form and non-form paths without treating names as vocabulary', () => {
  const evidence = liveCefrPreparationEvidence(journey, [])
  const inflectingId = 'fshat'
  const nonInflectingId = 'ku'
  assert.ok(reviewedFormTargets(inflectingId).length >= 2, `${inflectingId} is not exercising a real reviewed form lane`)
  assert.equal(reviewedFormTargets(nonInflectingId).length, 0, `${nonInflectingId} is not exercising the no-form lane`)
  assert.equal(evidence.wordCapabilities[inflectingId].capabilities['reviewed-form-awareness'].status, 'passed')
  assert.equal(evidence.wordCapabilities[inflectingId].capabilities['contextual-form-selection'].status, 'passed')
  assert.equal(evidence.wordCapabilities[nonInflectingId].capabilities['reviewed-form-awareness'].status, 'inapplicable')
  assert.equal(evidence.wordCapabilities[nonInflectingId].capabilities['contextual-form-selection'].status, 'inapplicable')
  assert.equal(evidence.wordCapabilities[nonInflectingId].capabilities['contextual-typed-recall'].status, 'passed')
  for (const senseId of focusSenseIds) {
    assert.equal(lexicalTrainability(senseId).trainable, true, `${senseId}: a non-trainable identity entered CEFR lexical focus`)
    assert.ok(Object.values(evidence.wordCapabilities[senseId].capabilities)
      .every(({ status }) => status !== 'not-trainable'), `${senseId}: reported not-trainable evidence`)
  }
})

check('save migration preserves only semantically equivalent old proofs', () => {
  const oldExact = normalizeSavedState({
    ...newRun(),
    discovered: { fshat: true },
    wordProgressVersion: 3,
    wordProgress: {
      fshat: {
        wins: {
          'independent-word-recognition': 2,
          'guided-word-selection': 1,
          'independent-word-selection': 2,
          'word-form-choice': 99,
          'supported-word-spelling': 99,
          'retained-word-spelling': 99,
        },
        formProofs: { invented: { wins: { 'word-form-construction': 99 }, strictWins: 99 } },
        strictWins: 99,
      },
    },
  }, newRun())
  const exact = liveCefrPreparationEvidence(oldExact, []).wordCapabilities.fshat.capabilities
  assert.equal(exact['meaning-recognition'].status, 'passed')
  assert.equal(exact['controlled-retrieval-supported'].status, 'passed')
  assert.equal(exact['controlled-retrieval-expanded'].status, 'passed')
  for (const capabilityId of [
    'reviewed-form-awareness',
    'contextual-form-selection',
    'word-form-construction',
    'contextual-typed-recall',
    'strict-spaced-recall',
  ]) assert.notEqual(exact[capabilityId].status, 'passed', `v3 invented ${capabilityId}`)

  const preLadder = normalizeSavedState({
    ...newRun(),
    discovered: { fshat: true },
    practiced: { fshat: 9999 },
    formPracticed: { 'fshat::fshati': 9999 },
    wordProgressVersion: 0,
    wordProgress: { fshat: { wins: { 'contextual-typed-recall': 9999 }, strictWins: 9999 } },
  }, newRun())
  const unproved = liveCefrPreparationEvidence(preLadder, []).wordCapabilities.fshat.capabilities
  assert.ok(WORD_CAPABILITY_DEFINITIONS.every(({ id }) => unproved[id].status !== 'passed'),
    'pre-ladder totals or unknown progress invented a semantic capability')
})

check('word proofs survive a hard story reset and a following save/reload', () => {
  const beforeDiscovery = JSON.parse(JSON.stringify(journey.discovered))
  const beforeProgress = JSON.parse(JSON.stringify(journey.wordProgress))
  journey = reducer(journey, { type: 'RESET' })
  assert.deepEqual(journey.discovered, beforeDiscovery, 'hard reset erased durable saved vocabulary')
  assert.deepEqual(journey.wordProgress, beforeProgress, 'hard reset erased durable Train proof')
  journey = normalizeSavedState(JSON.parse(JSON.stringify(journey)), newRun())
  assert.deepEqual(journey.discovered, beforeDiscovery, 'reload after reset erased durable saved vocabulary')
  assert.deepEqual(journey.wordProgress, beforeProgress, 'reload after reset erased durable Train proof')
  assert.ok(summaryFor(journey).byLevel.A1.plan.some(({ readiness }) => readiness.ready), 'retained word proof did not reopen A1 preparation')
})

check('the production dependency chain opens A1 preparation, A1 capstones, then A2 preparation', () => {
  assert.equal(summaryFor(newRun()).byLevel.A1.complete, false)
  assert.ok(summaryFor(newRun()).byLevel.A2.plan.every(({ readiness }) => !readiness.ready), 'A2 opened on a blank save')
  journey = completePreparationLevel(journey, 'A1')
  assert.equal(summaryFor(journey).byLevel.A1.complete, true)
  assert.equal(summaryFor(journey).profile.A1.passed, false, 'guided preparation counted as held-out evidence')
  journey = completeCapstoneLevel(journey, 'A1')
  assert.equal(summaryFor(journey).profile.A1.passed, true)
  assert.ok(summaryFor(journey).byLevel.A2.plan.some(({ readiness }) => readiness.ready), 'A1 readiness did not unlock A2 preparation')
})

check('the registered A2 dialogue accepts both its direct and repair continuations', () => {
  assert.equal(evaluatePreparationResponse('a2-meeting-branch-repair', {
    optionIds: ['time', 'confirm-well'],
  }).passed, true)
  assert.equal(evaluatePreparationResponse('a2-meeting-branch-repair', {
    optionIds: ['repair', 'time', 'confirm-well'],
  }).passed, true)
})

check('A1 evidence and preparation survive reload before the A2 journey continues', () => {
  const before = summaryFor(journey)
  journey = normalizeSavedState(JSON.parse(JSON.stringify(journey)), newRun())
  const after = summaryFor(journey)
  assert.equal(after.profile.A1.passed, true)
  assert.equal(after.byLevel.A1.completed, before.byLevel.A1.completed)
  assert.ok(after.byLevel.A2.plan.some(({ readiness }) => readiness.ready))
})

check('the same normal state path completes A2 preparation and held-out readiness', () => {
  journey = completePreparationLevel(journey, 'A2')
  assert.equal(summaryFor(journey).byLevel.A2.complete, true)
  assert.equal(summaryFor(journey).profile.A2.passed, false, 'A2 preparation counted as held-out evidence')
  journey = completeCapstoneLevel(journey, 'A2')
  assert.deepEqual(summaryFor(journey).profile.achieved, { A1: true, A2: true })
  assert.equal(journey.debug, false, 'zero-start journey depended on debug mode')
})

check('the player-facing capstone gate requires preparation and preserves A1-before-A2', () => {
  assert.match(componentSource, /!preparation\.byLevel\[level\]\.complete/)
  assert.match(componentSource, /level === ['"]A2['"] && !profile\.A1\.passed/)
  assert.doesNotMatch(componentSource, /DEBUG_|debug\s*\?/)
})

if (failures.length) {
  console.error(`\n${failures.length} zero-to-A2 audit failure(s).`)
  process.exit(1)
}

const deepest = [...discoveryWitnesses.entries()]
  .sort((left, right) => right[1].depth - left[1].depth)[0]
console.log(`\nZero-to-A2 route passed: ${focusSenseIds.length} story-grounded focus senses, ` +
  `${CEFR_PREPARATION_ACTIVITIES.length} guided activities and ${CEFR_TASKS.length} held-out forms. ` +
  `Deepest first ordinary focus exposure: ${deepest[0]} at ${deepest[1].nodeId} (depth ${deepest[1].depth}).`)
