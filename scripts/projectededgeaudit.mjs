// Exhaustive authored-edge projection gate. Every real option is committed
// through the production reducer from an exact feasible state, then checked as
// one joined source -> intention -> destination contract.

import assert from 'node:assert/strict'
import { STORY } from '../src/game/content.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import { playerActionConditionId } from '../src/game/playerActionRuntime.js'
import { projectPlayableEdges } from './lib/story-projections.mjs'
import {
  projectedChoiceConsequenceSignature,
  projectedEdgeIssues,
} from './lib/projected-edge-rules.mjs'

const token = (id) => ({ id, al: id, en: id })
const line = (...ids) => ids.map(token)
const option = (ids, extra = {}) => ({ text: line(...ids), to: 'there', ...extra })
const fixtureGraph = {
  here: { text: [line('fshat')], options: [] },
  there: { text: [], options: [] },
  elsewhere: { text: [], options: [] },
}
const fixturePlaces = { here: 'here-place', there: 'there-place', elsewhere: 'elsewhere-place' }
const projection = ({
  choice = option(['shko', 'fshat']),
  sourceLines = [],
  sourceEntries = sourceLines,
  destinationLines = [],
  destinationEntries = destinationLines,
  destinationOptions = [option(['rri'], { to: 'there', playerIntents: ['wait'] })],
  ended = null,
  from = 'here',
  to = 'there',
} = {}) => ({
  nodeId: from,
  optionIndex: 0,
  option: choice,
  settledAfter: { nodeId: to, ended },
  source: { lines: sourceLines, entries: sourceEntries, options: [choice] },
  destination: { lines: destinationLines, entries: destinationEntries, options: destinationOptions },
})
const fixtureIssues = (input) => projectedEdgeIssues(projection(input), {
  story: fixtureGraph,
  placeOf: fixturePlaces,
})

assert.deepEqual(fixtureIssues({ sourceLines: [line('fshat')] }), [],
  'grounded canonical Albanian movement projection failed')
assert.deepEqual(fixtureIssues({
  choice: option(['ec'], {
    actionSemantics: { kind: 'accompaniment', journeyId: 'walk', participantIds: ['elder'] },
  }),
}), [], 'structured accompaniment projection failed')
assert.ok(fixtureIssues({ destinationOptions: [] }).some((issue) => issue.includes('no enabled genuine option')),
  'reachable zero-choice projection passed')
assert.deepEqual(fixtureIssues({ destinationOptions: [], ended: 'good' }), [],
  'terminal zero-choice projection failed')
assert.ok(fixtureIssues({
  choice: option(['hap', 'dere'], { playerIntents: ['use'] }),
}).some((issue) => issue.includes('explicitly non-movement')),
'explicit physical action silently changed place')
assert.ok(fixtureIssues({
  choice: option(['hap', 'dere'], { playerIntents: ['movement'] }),
}).some((issue) => issue.includes('lacks a grounded canonical Albanian movement')),
'unsupported debug-only movement declaration silently changed place')
assert.ok(fixtureIssues({
  choice: option(['shko', 'fshat'], {
    intent: 'speech', playerIntents: ['speech'], speechAct: 'say',
  }),
}).some((issue) => issue.includes('spoken choice changes')),
'speech containing a movement word silently changed place')
assert.ok(fixtureIssues({
  choice: Object.assign(option(['mire']), { text: Object.assign(line('mire'), { reading: 'Go to the village.' }) }),
}).some((issue) => issue.includes('lacks a grounded canonical Albanian movement')),
'English movement reading incorrectly counted as canonical movement evidence')

const exactHubChoice = option(['pyet'], {
  to: 'here',
  intent: 'speech',
  playerIntents: ['speech'],
  speechAct: 'ask',
  conversationHub: { hubId: 'fixture-hub', kind: 'question', questionId: 'road' },
})
const exactHubResponse = {
  line: line('ai', 'thote'),
  conversationHub: { hubId: 'fixture-hub', kind: 'response', questionId: 'road' },
}
assert.deepEqual(fixtureIssues({
  choice: exactHubChoice,
  from: 'here',
  to: 'here',
  destinationLines: [exactHubResponse.line],
  destinationEntries: [exactHubResponse],
}), [], 'exact conversation response projection failed')
assert.ok(fixtureIssues({
  choice: exactHubChoice,
  from: 'here',
  to: 'here',
  destinationLines: [exactHubResponse.line],
  destinationEntries: [{ ...exactHubResponse, conversationHub: { ...exactHubResponse.conversationHub, questionId: 'price' } }],
}).some((issue) => issue.includes('no exact visible response')),
'mismatched conversation response passed')
assert.ok(fixtureIssues({
  choice: exactHubChoice,
  from: 'here',
  to: 'here',
  destinationLines: [exactHubResponse.line, line('ai', 'pergjigjet')],
  destinationEntries: [
    exactHubResponse,
    { line: line('ai', 'pergjigjet'), conversationHub: { ...exactHubResponse.conversationHub, questionId: 'price' } },
  ],
}).some((issue) => issue.includes('unrelated response visible')),
'an exact response masked a stale response left visible by the same question')

const receiptActionId = 'fixture-open-door'
const exactReceiptLine = Object.assign(line('ti', 'hap', 'dere'), {
  playerActionConsequence: { actionIds: [receiptActionId], actorId: 'player' },
})
const exactReceiptEntry = { cond: playerActionConditionId(receiptActionId), line: exactReceiptLine }
assert.deepEqual(fixtureIssues({
  choice: option(['hap', 'dere'], { to: 'here', playerAction: { id: receiptActionId, actorId: 'player' } }),
  from: 'here',
  to: 'here',
  destinationLines: [exactReceiptLine],
  destinationEntries: [exactReceiptEntry],
}), [], 'exact player-action receipt projection failed')
assert.ok(fixtureIssues({
  choice: option(['hap', 'dere'], { to: 'here', playerAction: { id: receiptActionId, actorId: 'player' } }),
  from: 'here',
  to: 'here',
  destinationLines: [Object.assign(line('ti', 'hap', 'dere'), {
    playerActionConsequence: { actionIds: ['different-action'], actorId: 'player' },
  })],
  destinationEntries: [{ cond: playerActionConditionId('different-action'), line: line('ti', 'hap', 'dere') }],
}).some((issue) => issue.includes('different action')),
'mismatched player-action receipt passed')
const derivedReceiptChoice = option(['hap', 'dere'], { to: 'here' })
assert.ok(fixtureIssues({
  choice: derivedReceiptChoice,
  from: 'here',
  to: 'here',
  destinationLines: [Object.assign(line('ti', 'hap', 'dere'), {
    playerActionConsequence: { actionIds: ['different-action'], actorId: 'player' },
  })],
  destinationEntries: [{ cond: playerActionConditionId('different-action'), line: line('ti', 'hap', 'dere') }],
}).some((issue) => issue.includes('different action')),
'mismatched receipt for an auto-derived canonical action passed')
assert.deepEqual(fixtureIssues({
  choice: derivedReceiptChoice,
  from: 'here',
  to: 'here',
  destinationEntries: [{
    cond: playerActionConditionId('different-action'),
    negate: true,
    line: line('nuk', 'hap'),
  }],
}), [], 'a visible negated action condition was misread as a positive arrival receipt')

const paidChoice = option(['puno'], { to: 'here', lek: 800, earns: 'fixture-work' })
const stay = option(['rri'], { to: 'here', playerIntents: ['wait'] })
const leave = option(['shko'], { to: 'elsewhere', playerIntents: ['movement'] })
const paidProjection = (destinationOptions) => fixtureIssues({
  choice: paidChoice,
  from: 'here',
  to: 'here',
  destinationOptions,
})
assert.deepEqual(paidProjection([stay, leave]), [],
  'paid result with two consequence-distinct choices failed')
assert.ok(paidProjection([stay])
  .some((issue) => issue.includes('fewer than two genuine choices')),
'paid result with one choice passed')
assert.ok(paidProjection([stay, { ...stay, text: line('prit') }])
  .some((issue) => issue.includes('do not have consequence-distinct')),
'paid result with duplicate consequences passed')
assert.notEqual(projectedChoiceConsequenceSignature(stay), projectedChoiceConsequenceSignature(leave),
  'structured consequence signature collapsed distinct destinations')
const typedPaidChoice = option(['puno'], {
  to: 'here',
  earns: 'fixture-work',
  effects: [{ type: 'resource', id: 'lek', delta: 800 }],
})
assert.ok(fixtureIssues({
  choice: typedPaidChoice,
  from: 'here',
  to: 'here',
  destinationOptions: [stay],
}).some((issue) => issue.includes('fewer than two genuine choices')),
'typed positive-lek paid result bypassed the agency rule')
assert.notEqual(
  projectedChoiceConsequenceSignature(stay),
  projectedChoiceConsequenceSignature({ ...stay, hearts: 1 }),
  'canonical legacy resource effects were omitted from consequence identity',
)

const expectedEdges = Object.values(STORY).flatMap((node) => node.options || [])
  .filter((candidate) => !candidate.confuser && candidate.to && STORY[candidate.to]).length
const { projections, failures: projectionFailures } = projectPlayableEdges()
const contentIssues = projections.flatMap((edge) => projectedEdgeIssues(edge, {
  story: STORY,
  placeOf: PLACE_OF,
}))
const coverageIssues = []
if (projections.length + projectionFailures.length !== expectedEdges) {
  coverageIssues.push(`enumerated ${projections.length + projectionFailures.length} of ${expectedEdges} real authored edges`)
}

const productionFailures = [
  ...coverageIssues.map((issue) => `coverage: ${issue}`),
  ...projectionFailures.map((issue) => `projection: ${issue}`),
  ...contentIssues.map((issue) => `content: ${issue}`),
]
assert.deepEqual(productionFailures, [], [
  'projected edge failures:',
  ...productionFailures,
].join('\n'))

console.log(`✅ projected edge audit: ${projections.length} real choices join feasible source state, exact intention and coherent destination`)
