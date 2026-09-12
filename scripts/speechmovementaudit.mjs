// Agency gate: replying is not travelling. Every choice is checked against
// the canonical physical-place map; a spoken answer must resolve in place and
// let a later explicit action own any journey.
import assert from 'node:assert/strict'
import { STORY } from '../src/game/content.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import { choiceSemanticsIssues, isSpokenChoice, speechMovementIssue } from '../src/game/choiceSemantics.js'
import { newRun, phraseSenses, reducer } from '../src/game/gameState.js'
import { offerQuests } from '../src/game/quests.js'

let choices = 0
let spoken = 0
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [index, option] of (node.options || []).entries()) {
    assert.deepEqual(choiceSemanticsIssues(option), [], `${nodeId}.options[${index}] has invalid semantics metadata`)
    assert.equal(speechMovementIssue(nodeId, option, PLACE_OF), null,
      `${nodeId}.options[${index}] '${option.text?.reading || ''}' combines speech with relocation`)
    if (isSpokenChoice(option)) spoken++
    choices++
  }
}

const accept = STORY.eliraBreg.options.find((option) => option.to === 'eliraEmriBreg')
assert.ok(accept && isSpokenChoice(accept), 'Elira acceptance is no longer the focused spoken-choice fixture')
let state = { ...newRun(), nodeId: 'eliraBreg', visited: { ...newRun().visited, eliraBreg: true } }
state = { ...state, quests: offerQuests(state.quests, STORY.eliraBreg.questOffers, state.clock, 'audit') }
state = reducer(state, { type: 'DEBUG_GRANT', ids: phraseSenses(accept.text) })
state = reducer(state, { type: 'CHOOSE', option: accept, fromNodeId: 'eliraBreg', fromTurn: state.turn })
assert.equal(state.nodeId, 'eliraEmriBreg', 'speaking to Elira moved the player')
assert.equal(PLACE_OF[state.nodeId], PLACE_OF.eliraBreg, 'Elira reply changed physical place')
assert.ok(STORY.eliraEmriBreg.options.some((option) => option.to === 'fshatiSheshi'), 'follow action is absent')
assert.ok(STORY.eliraEmriBreg.options.some((option) => option.to === 'fshatiLumi'), 'player cannot decide not to follow')

console.log(`✅ ${choices} choices audited: ${spoken} spoken choices never relocate the player`)
