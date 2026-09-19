// Exhaustive release gate for player-facing heart loss. Every decrement must
// be paired atomically with one structured, blocking explanation; authored
// story/item damage and generated confusers are enumerated from live data.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { DEFS, STORY, ITEMS, itemConfuserActionOf } from '../src/game/content.js'
import { ACHIEVEMENTS } from '../src/game/achievements.js'
import { alignedEnglishOf, albanianTextOf } from '../src/game/language.js'
import {
  applyExplainedHeartLoss,
  HEART_CONSEQUENCE_SOURCES,
  heartLossConsequenceForSave,
  normalizeHeartConsequence,
} from '../src/game/heartConsequences.js'
import {
  comprehensionMissConsequence,
  storyConfuserConsequence,
  trainMissConsequence,
} from '../src/game/consequenceBuilders.js'
import { newRun, normalizeSavedState, phraseSenses, reducer } from '../src/game/gameState.js'
import { itemUseEffectsOption, optionEffectsOf } from '../src/game/stateMechanics.js'
import {
  authoredStoryConfusers,
  consequenceForStoryConfuser,
  storyConfuserCandidates,
} from '../src/game/storyConfusers.js'
import { testFor } from '../src/game/comprehension.js'
import { comprehensionContextFor } from './lib/comprehension-journeys.mjs'
import {
  auditExceptionClaimKey,
  auditExceptionFor,
  auditExceptionRegistryIssues,
  auditExceptionUsageIssues,
  defineAuditExceptionRegistry,
} from './lib/audit-exceptions.mjs'

const rawHeartDecrementTarget = (caseId) =>
  `src/game/gameState.js:${caseId}:Math.max(0,state.hearts-1)`

const HEART_CONSEQUENCE_EXCEPTIONS = defineAuditExceptionRegistry({
  rules: {
    'debug-only-raw-heart-decrement': { targetKind: 'exact reducer case and decrement expression' },
  },
  entries: [{
    id: 'debug-hurt-control-bypasses-player-consequence',
    rule: 'debug-only-raw-heart-decrement',
    targets: [rawHeartDecrementTarget('DEBUG_HURT')],
    rationale: 'The debug heart control deliberately previews wounded health surfaces without pretending that the player attempted or failed an in-world action.',
    evidence: 'The only live raw decrement is the DEBUG_HURT reducer case, exposed solely by the authoring toolbar for testing the three-heart display ladder.',
    owner: 'health-consequence',
    reviewTrigger: 'Review whenever the reducer case, decrement expression, debug-only reachability or consequence-preview purpose changes.',
    scope: { kind: 'exact-targets', maximumTargets: 1 },
    maximumMatches: 1,
  }],
})

const root = new URL('../', import.meta.url)
const source = (path) => fs.readFileSync(new URL(path, root), 'utf8')
const failures = []
const check = (label, fn) => {
  try {
    fn()
    console.log(`✓ ${label}`)
  } catch (error) {
    failures.push(`${label}: ${error.message}`)
  }
}

const damagingEffects = (effects) => effects.filter((effect) =>
  effect?.type === 'resource' && effect.id === 'hearts' &&
  ((effect.delta ?? 0) < 0 || (effect.set != null && effect.set < 3)),
)

const storyDamage = []
const confusers = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [optionIndex, option] of (node.options || []).entries()) {
    if (option.confuser) confusers.push({ nodeId, node, optionIndex, option })
    if (damagingEffects(optionEffectsOf(option)).length) {
      storyDamage.push({ nodeId, optionIndex, option })
    }
  }
}
const itemDamage = Object.values(ITEMS).flatMap((item) =>
  item.use && damagingEffects(optionEffectsOf(itemUseEffectsOption(item))).length
    ? [{ item }]
    : [],
)

check('the shared contract accepts every declared source and rejects incomplete explanations', () => {
  for (const sourceId of HEART_CONSEQUENCE_SOURCES) {
    assert.ok(normalizeHeartConsequence({
      source: sourceId,
      eventId: `audit:${sourceId}`,
      attempted: { al: 'një përpjekje' },
      reason: { code: 'audit', text: 'This exact attempt does not fit the tested context.' },
      reasoning: 'Use the action or answer supported by the displayed context.',
    }, 1), `${sourceId} cannot enter the shared consequence contract`)
  }
  assert.equal(normalizeHeartConsequence({ source: 'train-word' }, 1), null)
  assert.equal(normalizeHeartConsequence({
    source: 'train-word', eventId: 'missing-attempt',
    reason: { code: 'x', text: 'reason' }, reasoning: 'fix',
  }, 1), null)
  assert.equal(normalizeHeartConsequence({
    source: 'train-word', eventId: 'missing-reason', attempted: { al: 'x' },
    correction: { al: 'y' },
  }, 1), null)
  assert.equal(normalizeHeartConsequence({
    source: 'train-word', eventId: 'missing-teaching', attempted: { al: 'x' },
    reason: { code: 'x', text: 'reason' },
  }, 1), null)
})

check('every authored damaging story/environment choice has an exact structured consequence', () => {
  assert.ok(storyDamage.length > 0, 'no authored damage path was enumerated')
  for (const { nodeId, optionIndex, option } of storyDamage) {
    const normalized = normalizeHeartConsequence({
      ...option.heartConsequence,
      source: 'story-choice',
      eventId: `audit:story:${nodeId}:${optionIndex}`,
      attempted: {
        ...option.heartConsequence?.attempted,
        al: albanianTextOf(option.text),
      },
    }, Math.min(3, Math.abs(damagingEffects(optionEffectsOf(option))[0].delta || 1)))
    assert.ok(normalized, `${nodeId}.options[${optionIndex}] can damage without a complete explanation`)
  }
})

check('every current or future damaging item-use path is metadata-gated', () => {
  for (const { item } of itemDamage) {
    const effect = damagingEffects(optionEffectsOf(itemUseEffectsOption(item)))[0]
    assert.ok(normalizeHeartConsequence({
      ...item.use.heartConsequence,
      source: 'item-action',
      eventId: `audit:item:${item.id}`,
      attempted: { ...item.use.heartConsequence?.attempted, al: albanianTextOf(item.use.phrase) },
    }, Math.min(3, Math.abs(effect.delta || 1))), `${item.id} can damage without a complete explanation`)
  }
  const state = newRun()
  assert.equal(applyExplainedHeartLoss(state, null, 1), null,
    'a missing item/action explanation still permits health loss')
})

check('every authored confuser produces a valid exact-attempt consequence', () => {
  assert.ok(confusers.length > 0, 'no confusers were enumerated')
  for (const { nodeId, node, optionIndex, option } of confusers) {
    const correctGreeting = option.contextGreeting && node.options.find((candidate) =>
      candidate.contextGreeting?.challengeId === option.contextGreeting.challengeId &&
      candidate.contextGreeting?.period === option.contextGreeting.period &&
      candidate.contextGreeting?.correct,
    )
    const consequence = storyConfuserConsequence({
      nodeId,
      turn: 1,
      key: `opt-${optionIndex}`,
      tokens: option.text,
      english: option.text.optionReading || alignedEnglishOf(option.text),
      greeting: option.contextGreeting,
      correctGreeting,
    })
    assert.ok(normalizeHeartConsequence(consequence, 1),
      `${nodeId}.options[${optionIndex}] cannot explain its confuser penalty`)
    assert.equal(consequence.attempted.al, albanianTextOf(option.text),
      `${nodeId}.options[${optionIndex}] does not report the exact attempted Albanian`)
  }
})

check('generated carried-item confusers explain every item capability contrast', () => {
  for (const item of Object.values(ITEMS).filter((candidate) => !candidate.currency && !candidate.companion)) {
    const action = itemConfuserActionOf(item)
    assert.ok(['drink', 'fight'].includes(action), `${item.id} generated unsupported confuser action`)
    const consequence = storyConfuserConsequence({
      nodeId: 'audit-scene', turn: 1, key: item.id,
      tokens: [{ al: action === 'fight' ? 'lufto' : 'pi', en: action }, { al: item.al, en: item.name }],
      english: `${action} ${item.name}`,
      dynamicItem: true,
    })
    assert.ok(normalizeHeartConsequence(consequence, 1), `${item.id} generated no consequence`)
  }
})

check('Train and comprehension builders carry attempted answer, reason and correction/pattern', () => {
  const word = trainMissConsequence({
    source: 'train-word', questionKey: 'word-1', attemptedEn: 'river',
    reasonCode: 'wrong-word-meaning', reason: 'The answer does not match this word.',
    correctAl: 'fshat', correctEn: 'village', targetWordId: 'fshat',
  })
  const form = trainMissConsequence({
    source: 'train-form', questionKey: 'form-1', attemptedAl: 'urë',
    reasonCode: 'wrong-noun-form', reason: 'The ending does not fit this noun job.',
    grammarGuide: { pattern: 'Use the reviewed definite-object ending here.', target: { al: 'urën', learnerMeaning: 'the bridge · object' } },
  })
  const phrase = trainMissConsequence({
    source: 'train-phrase', questionKey: 'phrase-1', attemptedAl: 'fshat në shkoj',
    reasonCode: 'wrong-phrase-order', reason: 'The words are not in Albanian order.',
    correctAl: 'po shkoj në fshat.', correctEn: 'I am going to the village.',
  })
  const comprehension = comprehensionMissConsequence({
    id: 'comp-1', albanian: 'Ura është e mbyllur.', correct: 'The bridge is closed.',
  }, 'The bridge is open.')
  for (const consequence of [word, form, phrase, comprehension]) {
    assert.ok(normalizeHeartConsequence(consequence, 1))
  }
  assert.equal(normalizeHeartConsequence(word, 1).targetWordId, 'fshat')
  assert.ok(DEFS[word.targetWordId]?.length, 'the word-miss target has no dictionary definition')
  assert.equal(form.grammar.target.al, 'urën')
})

check('the reducer loses health and blocks play only with a valid explanation', () => {
  const initial = newRun()
  assert.strictEqual(reducer(initial, { type: 'CONFUSE', expectedHearts: initial.hearts }), initial,
    'CONFUSE did not fail closed without canonical identity metadata')
  const declared = authoredStoryConfusers(STORY[initial.nodeId])[0]
  assert.ok(declared)
  let ready = { ...initial, discovered: { ...initial.discovered }, mana: { ...initial.mana } }
  for (const id of phraseSenses(declared.tokens)) {
    ready.discovered[id] = true
    ready.mana[id] = 2
  }
  const confuser = storyConfuserCandidates(ready)
    .find((candidate) => candidate.kind === 'authored' && candidate.key === declared.key)
  assert.ok(confuser)
  const lost = reducer(ready, {
    type: 'CONFUSE', optionId: confuser.key, optionIndex: confuser.optionIndex,
    expectedHearts: ready.hearts, fromNodeId: ready.nodeId, fromTurn: ready.turn,
    consequence: { source: 'story-confuser', eventId: 'forged' },
  })
  assert.equal(lost.hearts, initial.hearts - 1)
  assert.deepEqual(lost.pendingHeartConsequence,
    applyExplainedHeartLoss(ready, consequenceForStoryConfuser(ready, confuser), 1).pendingHeartConsequence)
  assert.equal(lost.pendingHeartConsequence.afterHearts, lost.hearts)
  assert.strictEqual(reducer(lost, { type: 'SET_VIEW', view: 'guide' }), lost,
    'an unrelated action bypassed the blocking consequence')
  assert.strictEqual(reducer(lost, { type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: 'stale' }), lost)
  const resumed = reducer(lost, {
    type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: lost.pendingHeartConsequence.eventId,
  })
  assert.equal(resumed.pendingHeartConsequence, null)
  assert.equal(resumed.hearts, lost.hearts)
  const repeated = reducer(resumed, {
    type: 'CONFUSE', optionId: confuser.key, optionIndex: confuser.optionIndex,
    expectedHearts: resumed.hearts, fromNodeId: resumed.nodeId, fromTurn: resumed.turn,
  })
  assert.notEqual(repeated.pendingHeartConsequence.eventId, lost.pendingHeartConsequence.eventId,
    'a repeated same-scene confuser reused a consequence identity')
  assert.strictEqual(reducer(repeated, {
    type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: lost.pendingHeartConsequence.eventId,
  }), repeated, 'a stale acknowledgement dismissed a later repeated consequence')
})

check('a comprehension miss records its failed gate and explanation atomically', () => {
  const achievement = ACHIEVEMENTS[0]
  const initial = {
    ...comprehensionContextFor(achievement),
    hearts: 3,
    pendingTest: achievement.id,
  }
  assert.strictEqual(reducer(initial, {
    type: 'COMP_WRONG', id: achievement.id,
  }), initial, 'a comprehension failure landed without its explanation')
  const questionIndex = 0
  const question = testFor(achievement, 0, initial)[questionIndex]
  const attemptedEnglish = question.options.find((option) => option !== question.correct)
  const missAction = {
    type: 'COMP_WRONG', id: achievement.id, expectedAttempt: 0,
    questionIndex, attemptedEnglish,
    consequence: { source: 'comprehension', eventId: 'forged' },
  }
  const unrecorded = { ...initial, achievementReadings: {} }
  assert.strictEqual(reducer(unrecorded, missAction), unrecorded,
    'an unseen sentence charged a comprehension heart')
  assert.strictEqual(reducer(initial, { ...missAction, questionIndex: -1 }), initial,
    'an invalid question index charged a comprehension heart')
  assert.strictEqual(reducer(initial, { ...missAction, attemptedEnglish: question.correct }), initial,
    'the exact correct answer charged a comprehension heart')
  assert.strictEqual(reducer(initial, { ...missAction, attemptedEnglish: 'not an offered answer' }), initial,
    'a caller-invented answer charged a comprehension heart')
  const lost = reducer(initial, missAction)
  assert.equal(lost.hearts, initial.hearts - 1)
  assert.equal(lost.attempts[achievement.id], 1)
  assert.equal(lost.dismissedTests[achievement.id], true)
  assert.equal(lost.pendingTest, null)
  assert.equal(lost.pendingHeartConsequence.source, 'comprehension')
  assert.deepEqual(lost.pendingHeartConsequence,
    applyExplainedHeartLoss(initial, comprehensionMissConsequence(
      question, attemptedEnglish, `${achievement.id}:attempt-0`,
    ), 1)
      .pendingHeartConsequence,
    'caller-controlled comprehension correction replaced the canonical question')
  const acknowledged = reducer(lost, {
    type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: lost.pendingHeartConsequence.eventId,
  })
  assert.strictEqual(reducer(acknowledged, missAction), acknowledged,
    'a stale comprehension miss charged a later attempt')
  const nextQuestion = testFor(achievement, 1, acknowledged)[0]
  const nextAttemptedEnglish = nextQuestion.options.find((option) => option !== nextQuestion.correct)
  const nextMiss = reducer(acknowledged, {
    type: 'COMP_WRONG', id: achievement.id, expectedAttempt: 1,
    questionIndex: 0, attemptedEnglish: nextAttemptedEnglish,
  })
  assert.notEqual(nextMiss.pendingHeartConsequence.eventId, lost.pendingHeartConsequence.eventId,
    'a later comprehension attempt reused a consequence identity')
  assert.strictEqual(reducer(nextMiss, {
    type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: lost.pendingHeartConsequence.eventId,
  }), nextMiss, 'a stale acknowledgement dismissed a later comprehension miss')
})

check('a real damaging story choice commits movement/effects and consequence atomically', () => {
  const option = STORY.maroZogu.options.find((candidate) => (candidate.hearts || 0) < 0)
  const ids = phraseSenses(option.text)
  const state = {
    ...newRun(),
    nodeId: 'maroZogu',
    hearts: 3,
    discovered: Object.fromEntries(ids.map((id) => [id, true])),
    mana: Object.fromEntries(ids.map((id) => [id, 1])),
  }
  const next = reducer(state, {
    type: 'CHOOSE', option, targetNode: STORY[option.to],
    fromNodeId: state.nodeId, fromTurn: state.turn,
  })
  assert.equal(next.hearts, 2)
  assert.equal(next.flags.zogPlage, true)
  assert.equal(next.pendingHeartConsequence.source, 'story-choice')
  assert.equal(next.pendingHeartConsequence.attempted.al, albanianTextOf(option.text))
})

check('pending consequences survive valid reloads and malformed ones are discarded', () => {
  const initial = newRun()
  const lost = applyExplainedHeartLoss(initial, {
    source: 'train-word', eventId: 'save-roundtrip', attempted: { en: 'wrong answer' },
    reason: { code: 'wrong-word-meaning', text: 'The answer does not match this word.' },
    correction: { al: 'fshat', en: 'village' },
    targetWordId: 'fshat',
  }, 1)
  const restored = normalizeSavedState(JSON.parse(JSON.stringify(lost)), newRun())
  assert.deepEqual(restored.pendingHeartConsequence, lost.pendingHeartConsequence)
  assert.ok(heartLossConsequenceForSave(restored.pendingHeartConsequence, restored.hearts))
  const malformed = normalizeSavedState({ ...lost, pendingHeartConsequence: { source: 'train-word' } }, newRun())
  assert.equal(malformed.pendingHeartConsequence, null)
})

check('source inventory has no player decrement outside the shared wrappers', () => {
  const gameState = source('src/game/gameState.js')
  const stateMechanics = source('src/game/stateMechanics.js')
  const practice = source('src/components/PracticeView.jsx')
  const phrases = source('src/components/PhrasePracticeQuestion.jsx')
  const story = source('src/components/StoryView.jsx')
  const comprehension = source('src/components/ComprehensionTest.jsx')
  const app = source('src/App.jsx')
  const heartModal = source('src/components/HeartConsequenceModal.jsx')

  for (const [, sourceId] of practice.matchAll(/source:\s*'(train-[^']+)'/g)) {
    assert.ok(HEART_CONSEQUENCE_SOURCES.includes(sourceId),
      `${sourceId}: Train submits an unregistered correction source and would strand the completed card`)
  }

  const rawReducerDecrements = [...gameState.matchAll(/Math\.max\(0,\s*state\.hearts\s*-\s*1\)/g)]
  assert.equal(rawReducerDecrements.length, 1, 'a new raw reducer decrement bypasses the shared contract')
  assert.match(gameState.slice(Math.max(0, rawReducerDecrements[0].index - 100), rawReducerDecrements[0].index), /DEBUG_HURT/,
    'the sole raw decrement is not the explicit debug-only exemption')
  const liveRawDecrementTargets = new Set()
  const usedRawDecrementClaims = new Set()
  for (const match of rawReducerDecrements) {
    const precedingCases = [...gameState.slice(0, match.index).matchAll(/\bcase '([^']+)':/g)]
    const caseId = precedingCases.at(-1)?.[1] || 'outside-reducer-case'
    const target = rawHeartDecrementTarget(caseId)
    liveRawDecrementTargets.add(target)
    const exception = auditExceptionFor(
      HEART_CONSEQUENCE_EXCEPTIONS,
      'debug-only-raw-heart-decrement',
      target,
    )
    assert.ok(exception, `${target}: raw heart decrement has no exact audited exception`)
    assert.equal(exception.maximumMatches, 1,
      `${exception.id}: raw decrement exception is not bounded to one live expression`)
    usedRawDecrementClaims.add(auditExceptionClaimKey(
      'debug-only-raw-heart-decrement',
      target,
    ))
  }
  assert.deepEqual(
    auditExceptionRegistryIssues(HEART_CONSEQUENCE_EXCEPTIONS, {
      validTargetsByRule: {
        'debug-only-raw-heart-decrement': liveRawDecrementTargets,
      },
    }),
    [],
    'heart-consequence exception registry is malformed, stale, duplicate or out of scope',
  )
  assert.deepEqual(
    auditExceptionUsageIssues(HEART_CONSEQUENCE_EXCEPTIONS, usedRawDecrementClaims),
    [],
    'heart-consequence exceptions are unused, stale or unregistered',
  )
  for (const actionCase of ['PRACTICE_WORD_RESULT', 'PRACTICE_WORD_MATCH_RESULT', 'PRACTICE_WRONG', 'PRACTICE_PHRASE_RESULT', 'CONFUSE', 'COMP_WRONG']) {
    const start = gameState.indexOf(`case '${actionCase}'`)
    const end = gameState.indexOf("\n    case '", start + 10)
    assert.ok(start >= 0 && /applyExplainedHeartLoss|withTrainHealthResult/.test(gameState.slice(start, end < 0 ? undefined : end)),
      `${actionCase} does not use the shared loss wrapper`)
  }
  assert.match(gameState, /attachExplainedHeartLoss\(state, chosenState, authoredConsequence\)/)
  assert.match(gameState, /attachExplainedHeartLoss\(state, resultState, authoredConsequence\)/)
  assert.match(stateMechanics, /effect\.type === 'resource' && effect\.id === 'hearts'/,
    'typed heart effects disappeared from the canonical effect projector')
  assert.doesNotMatch(practice, /💔\s*−1 heart/)
  assert.doesNotMatch(phrases, /💔\s*−1 heart/)
  assert.match(story, /storyConfuserCandidates\(state\)/)
  assert.doesNotMatch(story, /consequence: storyConfuserConsequence/)
  assert.match(comprehension, /onDone\(false, \{ questionIndex: step, attemptedEnglish: opt \}\)/)
  assert.doesNotMatch(comprehension, /comprehensionMissConsequence/)
  assert.match(gameState, /comprehensionMissConsequence\(/)
  assert.match(gameState, /attempt-\$\{action\.expectedAttempt\}/)
  assert.match(app, /state\.pendingHeartConsequence/)
  assert.match(app, /const HeartConsequenceModal = lazy\(/)
  assert.match(heartModal, /Why the heart was lost/)
  assert.match(heartModal, /Practice miss — no heart lost/)
  assert.match(heartModal, /Why the answer was wrong/)
  assert.match(practice, /targetWordId:\s*q\.answerId/,
    'ordinary word misses do not identify the tested dictionary sense')
  assert.match(heartModal, /DEFS\[consequence\.targetWordId\]/,
    'the miss modal does not resolve the tested word definition')
  assert.match(heartModal, /<StaticDefinition/,
    'the miss modal does not render the tested word definition')
  assert.match(app, /discovered=\{state\.discovered\}/,
    'the miss definition does not preserve the dictionary known-word presentation')
  assert.match(
    heartModal,
    /isTrain\s*\?\s*'Continue training'\s*:\s*'Return to game'/,
    'the blocking acknowledgement does not return Train misses to training and story misses to the game',
  )
  assert.match(app, /inert=\{blockingOverlay/)
})

if (failures.length) {
  console.error(`\n❌ heart consequences: ${failures.length} failure${failures.length === 1 ? '' : 's'}`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exitCode = 1
} else {
  console.log(`\n✅ heart consequences: ${storyDamage.length} damaging story/environment choices, ${itemDamage.length} damaging item uses, ${confusers.length} authored confusers`)
}
