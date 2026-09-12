// Whole-graph agency gate for the one-intention-per-choice contract.
//
// Structural and explicitly authored bundles fail the release. Older choices
// whose English editorial reading merely suggests a possible bundle are
// printed as review candidates: those readings help migration, but are not a
// trustworthy enough source of truth to reject playable content by themselves.
import assert from 'node:assert/strict'
import { STORY } from '../src/game/content.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import { englishReadingOf } from '../src/game/language.js'
import {
  choiceSemanticsIssues,
  compoundIntentIssues,
  compoundIntentReview,
} from '../src/game/choiceSemantics.js'

const failures = []
const candidates = []
let choices = 0
let explicit = 0

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
assert.deepEqual(
  compoundIntentReview('here', {
    choiceReading: 'Inspect the box, then take the key.',
    playerIntents: ['observation'],
    effects: [{ type: 'inventory', id: 'key', delta: 1 }],
    to: 'here',
  }, fixturePlaceOf).candidatePairs,
  [],
  'a reviewed single intention did not suppress lexical/effect-only review noise',
)
assert.ok(
  compoundIntentIssues('here', {
    choiceReading: 'Answer yes.',
    playerIntents: ['speech'],
    to: 'there',
  }, fixturePlaceOf).length > 0,
  'a reviewed single intention incorrectly suppressed a structural movement conflict',
)

for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [index, option] of (node.options || []).entries()) {
    choices++
    const label = `${nodeId}.options[${index}]`
    const schemaIssues = choiceSemanticsIssues(option)
    for (const issue of schemaIssues) failures.push(`${label}: ${issue}`)
    const review = compoundIntentReview(nodeId, option, PLACE_OF)
    if (review.explicit.length) explicit++
    for (const issue of compoundIntentIssues(nodeId, option, PLACE_OF)) {
      failures.push(`${label}: ${issue}`)
    }
    if (review.candidatePairs.length) candidates.push({
      label,
      pairs: review.candidatePairs.join(', '),
      reading: englishReadingOf(option.text),
    })
  }
}

assert.deepEqual(failures, [], `compound-intent release failures:\n${failures.join('\n')}`)

if (candidates.length) {
  console.log(`ℹ️ ${candidates.length} non-blocking compound-intent review candidate(s):`)
  for (const candidate of candidates.slice(0, 20)) {
    console.log(`  ${candidate.label} [${candidate.pairs}] ${candidate.reading}`)
  }
  if (candidates.length > 20) console.log(`  … ${candidates.length - 20} more; add explicit playerIntents while editing those choices`)
}
console.log(`✅ ${choices} choices checked: no definite compound intentions (${explicit} explicitly classified)`)
