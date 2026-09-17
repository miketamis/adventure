// Whole-graph agency gate for the one-intention-per-choice contract.
//
// Structural, explicitly authored, and editorially inferred bundles all fail
// the release. A conservative lexical candidate must be resolved by splitting
// the action or by declaring one reviewed player intention.
import assert from 'node:assert/strict'
import { HEART_LEVELS, ITEMS, STORY } from '../src/game/content.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import { attachReviewedOptionReadings } from '../src/game/data/readings/reviewedOptionReadings.js'
import {
  choiceSemanticsIssues,
  compoundIntentIssues,
  compoundIntentReview,
} from '../src/game/choiceSemantics.js'

// The production content keeps fluent English option readings in a lazy
// registry. Editorial classifiers must attach that registry before inspecting
// wording; otherwise almost every unannotated choice looks blank and silently
// bypasses the very candidates this gate claims to review.
attachReviewedOptionReadings(STORY, ITEMS, HEART_LEVELS)

const failures = []
let choices = 0
let explicit = 0
let playableChoices = 0
const missingReviewedReadings = []

const fixturePlaceOf = Object.freeze({ here: 'room', there: 'road' })
assert.deepEqual(
  compoundIntentReview('here', {
    intent: 'physical',
    playerIntents: ['physical', 'movement'],
    inseparableAct: {
      kind: 'physical-act',
      reason: 'The single leap necessarily carries the traveller across the gap.',
    },
    to: 'there',
  }, fixturePlaceOf).definitePairs,
  [],
  'a reviewed inseparable physical act was rejected',
)
assert.ok(
  compoundIntentIssues('here', {
    playerIntents: ['speech', 'movement'],
    to: 'there',
  }, fixturePlaceOf).length > 0,
  'explicit compound intentions did not fail closed',
)
assert.ok(
  compoundIntentIssues('here', {
    questAction: { id: 'fixture', action: 'accept' },
    to: 'there',
  }, fixturePlaceOf).length > 0,
  'accepting and travelling did not fail closed',
)
assert.ok(
  compoundIntentReview('here', {
    choiceReading: 'Inspect the box, then take the key.',
    to: 'here',
  }, fixturePlaceOf).candidatePairs.includes('acquisition+observation'),
  'lexical inspect-and-take candidate disappeared',
)
assert.ok(
  compoundIntentIssues('here', {
    choiceReading: 'Inspect the box, then take the key.',
    to: 'here',
  }, fixturePlaceOf).length > 0,
  'a lexical compound-intent candidate did not fail the release',
)
assert.ok(
  compoundIntentIssues('here', {
    choiceReading: 'Inspect the box, then take the key.',
    playerIntents: ['observation'],
    effects: [{ type: 'inventory', id: 'key', delta: 1 }],
    to: 'here',
  }, fixturePlaceOf).length > 0,
  'a reviewed single intention incorrectly suppressed an acquisition effect',
)
assert.deepEqual(
  compoundIntentIssues('here', {
    choiceReading: 'Wait a moment; I have a question.',
    playerIntents: ['speech'],
    speechAct: 'say',
    to: 'here',
  }, fixturePlaceOf),
  [],
  'speech content was mistaken for an independently performed wait',
)
assert.deepEqual(
  compoundIntentIssues('here', {
    choiceReading: 'Please give me the bread.',
    playerIntents: ['transaction'],
    effects: [{ type: 'inventory', id: 'bread', delta: 1 }],
    to: 'here',
  }, fixturePlaceOf),
  [],
  'the inseparable request-and-receipt inside a local transaction was rejected',
)
assert.deepEqual(
  compoundIntentIssues('here', {
    choiceReading: 'Take the middle road.',
    intent: 'movement',
    playerIntents: ['movement'],
    to: 'there',
  }, fixturePlaceOf),
  [],
  'an explicitly reviewed movement idiom was mistaken for acquisition',
)
assert.ok(
  compoundIntentIssues('here', {
    choiceReading: 'Answer yes.',
    playerIntents: ['speech'],
    to: 'there',
  }, fixturePlaceOf).length > 0,
  'a reviewed single intention incorrectly suppressed a structural movement conflict',
)
assert.ok(
  compoundIntentIssues('here', {
    choiceReading: 'Do the work.',
    playerIntents: ['physical'],
    to: 'there',
  }, fixturePlaceOf).length > 0,
  'a generic physical label incorrectly suppressed structural movement',
)
assert.ok(
  compoundIntentIssues('here', {
    choiceReading: 'Buy the bread.',
    playerIntents: ['transaction'],
    to: 'there',
  }, fixturePlaceOf).length > 0,
  'a transaction label incorrectly suppressed structural movement',
)
assert.ok(
  compoundIntentIssues('here', {
    choiceReading: 'Go to the gate, then fight the wolf.',
    playerIntents: ['movement'],
    to: 'here',
  }, fixturePlaceOf).length > 0,
  'a singleton movement declaration incorrectly suppressed a second lexical physical act',
)
assert.ok(
  compoundIntentIssues('here', {
    choiceReading: 'Take the road, then fight the wolf.',
    playerIntents: ['movement'],
    to: 'here',
  }, fixturePlaceOf).length > 0,
  'the take-the-road idiom resolution incorrectly hid a later physical act',
)
assert.ok(
  compoundIntentIssues('here', {
    choiceReading: 'Please give me the bread, then leave.',
    playerIntents: ['transaction'],
    to: 'here',
  }, fixturePlaceOf).length > 0,
  'the transaction-request idiom resolution incorrectly hid a later movement act',
)
assert.deepEqual(
  compoundIntentReview('here', {
    choiceReading: 'Answer, cut the cord, and leap over the hedge.',
    to: 'here',
  }, fixturePlaceOf).candidatePairs.toSorted(),
  ['movement+speech', 'movement+use', 'speech+use'],
  'a comma-separated three-act choice escaped the lexical compound-intent gate',
)

for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [index, option] of (node.options || []).entries()) {
    choices++
    const label = `${nodeId}.options[${index}]`
    if (!option.confuser && option.to && STORY[option.to]) {
      playableChoices++
      if (!String(option.text?.optionReading || option.text?.reading || '').trim()) {
        missingReviewedReadings.push(label)
      }
    }
    const schemaIssues = choiceSemanticsIssues(option)
    for (const issue of schemaIssues) failures.push(`${label}: ${issue}`)
    const review = compoundIntentReview(nodeId, option, PLACE_OF)
    if (review.explicit.length) explicit++
    for (const issue of compoundIntentIssues(nodeId, option, PLACE_OF)) {
      failures.push(`${label}: ${issue}`)
    }
  }
}

assert.deepEqual(missingReviewedReadings, [],
  `playable choices missing their reviewed reading during compound-intent analysis:\n${missingReviewedReadings.join('\n')}`)
assert.deepEqual(failures, [], `compound-intent release failures:\n${failures.join('\n')}`)
console.log(`✅ ${choices} choices checked (${playableChoices} playable with reviewed readings): no compound intentions (${explicit} explicitly classified)`)
