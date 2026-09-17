// A destination may say that the player spoke or voluntarily acted only when
// that prose is bound to the exact feasible incoming action. Stable action ids
// are semantic surfaces, never option indexes; shared destinations and
// self-loops therefore cannot replay one actor's result for another action.
import assert from 'node:assert/strict'
import { STORY } from '../src/game/content.js'
import {
  authoredPlayerAction,
  canonicalPlayerActionId,
  playerActionConditionId,
  playerActionProvenanceIssues,
  withPlayerActionConsequence,
} from '../src/game/playerActionProvenance.js'

const token = (id) => ({ id, al: id, en: id })
const line = (reading, ...ids) => Object.assign(ids.map(token), { reading })
const choice = (reading, ids, to, extra = {}) => ({ text: line(reading, ...ids), to, ...extra })

const valid = {
  source: { id: 'source', text: [], options: [choice('Fight the witch.', ['lufto', 'shtrige'], 'result')] },
  result: {
    id: 'result',
    text: [{ cond: 'from:source', line: line('You strike at the witch.', 'ti', 'godit', 'shtrige') }],
    options: [],
  },
}
assert.deepEqual(playerActionProvenanceIssues(valid).issues, [], 'valid predecessor-bound action failed')

const mismatchedActor = structuredClone(valid)
mismatchedActor.source.options.push(choice('The wolf fights the witch.', ['ujk', 'lufto', 'shtrige'], 'result'))
mismatchedActor.result.text[0] = line('You strike at the witch.', 'ti', 'godit', 'shtrige')
const actorIssues = playerActionProvenanceIssues(mismatchedActor).issues
assert.ok(actorIssues.some((issue) => issue.includes('visible after non-player action')),
  'a wolf action was allowed to narrate a player-owned result')

const effectBound = structuredClone(mismatchedActor)
effectBound.source.options[0].effects = [{ type: 'flag', id: 'player-struck' }]
effectBound.source.options[1].effects = [{ type: 'flag', id: 'wolf-struck' }]
effectBound.result.text = [
  { cond: 'flag:player-struck', line: line('You strike at the witch.', 'ti', 'godit', 'shtrige') },
  { cond: 'flag:wolf-struck', line: line('The wolf strikes at the witch.', 'ujk', 'godit', 'shtrige') },
]
assert.deepEqual(playerActionProvenanceIssues(effectBound).issues, [],
  'effect-bound actor-specific consequences failed')

const wrongEffectActor = structuredClone(effectBound)
wrongEffectActor.result.text[0].cond = 'flag:wolf-struck'
assert.ok(playerActionProvenanceIssues(wrongEffectActor).issues.some((issue) => issue.includes('visible after non-player action')),
  'an actor-specific consequence accepted the other actor\'s effect')

const mismatchedActions = {
  source: {
    id: 'source', text: [], options: [
      choice('Fight the witch.', ['lufto', 'shtrige'], 'result'),
      choice('Listen to the witch.', ['degjo', 'shtrige'], 'result'),
    ],
  },
  result: { id: 'result', text: [line('You strike at the witch.', 'ti', 'godit', 'shtrige')], options: [] },
}
assert.ok(playerActionProvenanceIssues(mismatchedActions).issues.some((issue) => issue.includes('do not match')),
  'one unconditional consequence accepted two different player actions')

const singleMovementSpeaks = {
  source: { id: 'source', text: [], options: [choice('Fly from the window.', ['fluturo', 'dritare'], 'result', { playerIntents: ['movement'] })] },
  result: { id: 'result', text: [{ cond: 'from:source', line: line('You say, “Cheep.”', 'ti', 'thote', 'ciu') }], options: [] },
}
assert.ok(playerActionProvenanceIssues(singleMovementSpeaks).issues.some((issue) => issue.includes('do not match')),
  'a single movement edge was allowed to invent player speech')

const singleCommitmentSpeaks = {
  source: { id: 'source', text: [], options: [choice('Keep the oath.', ['mban', 'bese'], 'result', { playerIntents: ['commitment'] })] },
  result: { id: 'result', text: [{ cond: 'from:source', line: line('You tell her to go.', 'ti', 'thote', 'shko') }], options: [] },
}
assert.ok(playerActionProvenanceIssues(singleCommitmentSpeaks).issues.some((issue) => issue.includes('do not match')),
  'a single commitment edge was allowed to invent player speech')

const durableSpeechReplay = {
  hub: {
    id: 'hub', text: [], options: [
      choice('Say hello.', ['thote', 'pershendetje'], 'hub', { effects: [{ type: 'flag', id: 'said-hello' }] }),
      choice('Leave.', ['ik'], 'away', { playerIntents: ['movement'] }),
    ],
  },
  away: { id: 'away', text: [], options: [choice('Return.', ['kthehu'], 'hub', { playerIntents: ['movement'] })] },
}
durableSpeechReplay.hub.text = [{ cond: 'flag:said-hello', line: line('You say hello.', 'ti', 'thote', 'pershendetje') }]
assert.ok(playerActionProvenanceIssues(durableSpeechReplay).issues.some((issue) => issue.includes('durable story state')),
  'durable flags were allowed to replay old player speech after a reachable return')

const exactSpeechArrival = structuredClone(durableSpeechReplay)
exactSpeechArrival.hub.options[0].playerAction = authoredPlayerAction('hub-say-hello')
exactSpeechArrival.hub.text[0].cond = playerActionConditionId('hub-say-hello')
assert.deepEqual(playerActionProvenanceIssues(exactSpeechArrival).issues, [],
  'an exact arrival-action receipt did not isolate player speech from a later return')

const staleExactSpeechArrival = structuredClone(exactSpeechArrival)
staleExactSpeechArrival.hub.text[0].cond = playerActionConditionId('hub-say-something-else')
assert.ok(playerActionProvenanceIssues(staleExactSpeechArrival).issues.some((issue) => issue.includes('stale or unreachable action id')),
  'an exact arrival-action condition was allowed to name no incoming action')

const sameVerbDifferentObject = {
  source: {
    id: 'source', text: [], options: [
      choice('Give bread.', ['jep', 'buke'], 'result'),
      choice('Give salt.', ['jep', 'kripe'], 'result'),
    ],
  },
  result: { id: 'result', text: [line('You give bread.', 'ti', 'jep', 'buke')], options: [] },
}
assert.ok(playerActionProvenanceIssues(sameVerbDifferentObject).issues.some((issue) => issue.includes('distinct incoming actions')),
  'one consequence accepted two same-verb actions with different objects')

const selfLoopReplay = {
  source: { id: 'source', text: [], options: [choice('Tell the truth.', ['tregoj', 'drejte'], 'result')] },
  result: {
    id: 'result',
    text: [line('You tell the truth.', 'ti', 'tregoj', 'drejte')],
    options: [choice('Listen again.', ['degjo', 'perseri'], 'result')],
  },
}
assert.ok(playerActionProvenanceIssues(selfLoopReplay).issues.some((issue) => issue.includes('unconditional across distinct incoming actions')),
  'a same-place self-loop replayed an earlier player action')

const explicit = structuredClone(valid)
explicit.source.options[0].playerAction = authoredPlayerAction('witch-fight')
explicit.result.text[0].line = withPlayerActionConsequence(
  explicit.result.text[0].line,
  'witch-fight',
)
assert.deepEqual(playerActionProvenanceIssues(explicit).issues, [], 'matching explicit action ids failed')

const staleExplicit = structuredClone(explicit)
staleExplicit.result.text[0].line.playerActionConsequence.actionIds = ['other-action']
assert.ok(playerActionProvenanceIssues(staleExplicit).issues.some((issue) => issue.includes('omits feasible action id')),
  'stale explicit consequence id did not fail closed')

const badExplicit = structuredClone(explicit)
badExplicit.source.options[0].playerAction = { id: 'Bad Action ID', actorId: 'player' }
assert.ok(playerActionProvenanceIssues(badExplicit).issues.some((issue) => issue.includes('stable lowercase action id')),
  'malformed explicit action id did not fail closed')

const stableBefore = canonicalPlayerActionId('source', valid.source.options[0])
const stableAfter = canonicalPlayerActionId('source', [choice('Wait.', ['prit'], 'elsewhere'), valid.source.options[0]][1])
assert.equal(stableAfter, stableBefore, 'canonical action id depends on option index')

const production = playerActionProvenanceIssues(STORY)
assert.deepEqual(production.issues, [], `player-action provenance failures:\n${production.issues.join('\n')}`)

console.log(`✅ player-action provenance audited: ${production.candidateCount} player-owned consequence lines bind to stable actions and exact feasible arrivals`)
