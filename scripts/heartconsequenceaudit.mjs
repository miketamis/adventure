// Exhaustive release gate for player-facing heart loss. Every decrement must
// be paired atomically with one structured, blocking explanation; authored
// story/item damage and generated confusers are enumerated from live data.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { STORY, ITEMS, itemConfuserActionOf } from '../src/game/content.js'
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
    correctAl: 'fshat', correctEn: 'village',
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
  assert.equal(form.grammar.target.al, 'urën')
})

check('the reducer loses health and blocks play only with a valid explanation', () => {
  const initial = newRun()
  assert.strictEqual(reducer(initial, { type: 'CONFUSE', expectedHearts: initial.hearts }), initial,
    'CONFUSE did not fail closed without explanation metadata')
  const consequence = storyConfuserConsequence({
    nodeId: initial.nodeId, turn: initial.turn, key: 'audit',
    tokens: [{ al: 'pi urën', en: 'drink the bridge' }],
    english: 'Drink the bridge.',
  })
  const lost = reducer(initial, { type: 'CONFUSE', expectedHearts: initial.hearts, consequence })
  assert.equal(lost.hearts, initial.hearts - 1)
  assert.equal(lost.pendingHeartConsequence.afterHearts, lost.hearts)
  assert.strictEqual(reducer(lost, { type: 'SET_VIEW', view: 'guide' }), lost,
    'an unrelated action bypassed the blocking consequence')
  assert.strictEqual(reducer(lost, { type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: 'stale' }), lost)
  const resumed = reducer(lost, {
    type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: lost.pendingHeartConsequence.eventId,
  })
  assert.equal(resumed.pendingHeartConsequence, null)
  assert.equal(resumed.hearts, lost.hearts)
})

check('a comprehension miss records its failed gate and explanation atomically', () => {
  const achievement = ACHIEVEMENTS[0]
  const initial = {
    ...newRun(),
    eligible: { [achievement.id]: true },
    pendingTest: achievement.id,
  }
  assert.strictEqual(reducer(initial, {
    type: 'COMP_WRONG', id: achievement.id,
  }), initial, 'a comprehension failure landed without its explanation')
  const consequence = comprehensionMissConsequence({
    id: 'audit-comprehension',
    albanian: 'Ura është e mbyllur.',
    correct: 'The bridge is closed.',
  }, 'The bridge is open.')
  const lost = reducer(initial, {
    type: 'COMP_WRONG', id: achievement.id, consequence,
  })
  assert.equal(lost.hearts, initial.hearts - 1)
  assert.equal(lost.attempts[achievement.id], 1)
  assert.equal(lost.dismissedTests[achievement.id], true)
  assert.equal(lost.pendingTest, null)
  assert.equal(lost.pendingHeartConsequence.source, 'comprehension')
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

  const rawReducerDecrements = [...gameState.matchAll(/Math\.max\(0,\s*state\.hearts\s*-\s*1\)/g)]
  assert.equal(rawReducerDecrements.length, 1, 'a new raw reducer decrement bypasses the shared contract')
  assert.match(gameState.slice(Math.max(0, rawReducerDecrements[0].index - 100), rawReducerDecrements[0].index), /DEBUG_HURT/,
    'the sole raw decrement is not the explicit debug-only exemption')
  for (const actionCase of ['PRACTICE_WORD_RESULT', 'PRACTICE_WRONG', 'PRACTICE_PHRASE_RESULT', 'CONFUSE', 'COMP_WRONG']) {
    const start = gameState.indexOf(`case '${actionCase}'`)
    const end = gameState.indexOf("\n    case '", start + 10)
    assert.ok(start >= 0 && gameState.slice(start, end < 0 ? undefined : end).includes('applyExplainedHeartLoss'),
      `${actionCase} does not use the shared loss wrapper`)
  }
  assert.match(gameState, /attachExplainedHeartLoss\(state, chosenState, authoredConsequence\)/)
  assert.match(gameState, /attachExplainedHeartLoss\(state, resultState, authoredConsequence\)/)
  assert.match(stateMechanics, /effect\.type === 'resource' && effect\.id === 'hearts'/,
    'typed heart effects disappeared from the canonical effect projector')
  assert.doesNotMatch(practice, /💔\s*−1 heart/)
  assert.doesNotMatch(phrases, /💔\s*−1 heart/)
  assert.match(story, /consequence: storyConfuserConsequence/)
  assert.match(comprehension, /onDone\(false, comprehensionMissConsequence/)
  assert.match(app, /state\.pendingHeartConsequence/)
  assert.match(app, /Why the heart was lost/)
  assert.match(app, />\s*Return to game\s*</)
  assert.match(app, /inert=\{blockingOverlay/)
})

if (failures.length) {
  console.error(`\n❌ heart consequences: ${failures.length} failure${failures.length === 1 ? '' : 's'}`)
  for (const failure of failures) console.error(`  - ${failure}`)
  process.exitCode = 1
} else {
  console.log(`\n✅ heart consequences: ${storyDamage.length} damaging story/environment choices, ${itemDamage.length} damaging item uses, ${confusers.length} authored confusers`)
}
