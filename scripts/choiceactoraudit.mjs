import assert from 'node:assert/strict'
import { STORY, ITEMS, HEART_LEVELS } from '../src/game/content.js'
import {
  choiceActorReview,
  storyChoiceActorIssues,
} from '../src/game/choiceActor.js'
import { attachReviewedOptionReadings } from '../src/game/data/readings/reviewedOptionReadings.js'

const token = (id, al = id) => ({ id, al, en: id })
const option = (reading, ids, extra = {}) => ({
  text: Object.assign(ids.map((id) => token(id)), { optionReading: reading }),
  to: 'result',
  ...extra,
})

assert.deepEqual(choiceActorReview(option('Ask the trader.', ['fol', 'tregtar'])), {
  actor: 'player', mode: 'player-action', issue: null,
}, 'a player-owned meta-conversation action failed the actor contract')
assert.deepEqual(choiceActorReview(option('Speak with the trader.', ['fol', 'tregtar'], {
  intent: 'speech', playerIntents: ['speech'],
})), {
  actor: 'player', mode: 'player-action', issue: null,
}, 'coarse speech intent made a meta-conversation action look like exact dialogue')
assert.deepEqual(choiceActorReview(option('The market is closed.', ['treg', 'eshte', 'mbyllur'], {
  speechAct: 'say',
})), {
  actor: 'player', mode: 'player-utterance', issue: null,
}, 'an explicitly authored player utterance failed the actor contract')

for (const [message, candidate] of [
  ['market speech', option('The market says, “Good.”', ['treg', 'thote', 'mire'])],
  ['village movement', option('The village goes.', ['fshat', 'shko'])],
  ['prop perception', option('The keys hear the woman.', ['celes', 'degjo', 'grua'])],
]) {
  assert.match(choiceActorReview(candidate).issue || '', /does not express a player-controlled action/,
    `${message} was accepted as a player choice`)
}

assert.match(choiceActorReview(option('What happened?', ['cfare', 'ndodh'])).issue || '',
  /exact words.*speechAct/, 'an unlabelled direct question passed as an action')
assert.match(choiceActorReview(option('Tell Mujo, “Give up.”', ['thuaj', 'mujo', 'dorezohem'])).issue || '',
  /exact words.*speechAct/, 'quoted player speech passed without explicit speech ownership')
assert.match(choiceActorReview(option('Give me bread, please.', ['ma', 'jep', 'buke', 'lut'])).issue || '',
  /exact words.*speechAct/, 'a first-person request passed as an ordinary physical action')
assert.match(choiceActorReview(option('Walk away.', ['shko'], { speechAct: 'whisper' })).issue || '',
  /unknown speechAct/, 'an unknown speech act passed by falling back to an action')
assert.match(choiceActorReview({ text: [token('po_yes')], speechAct: 'answer' }).issue || '',
  /no exact reviewed English action reading/,
  'speechAct metadata allowed an unreviewed selectable surface')
assert.match(choiceActorReview(option('Go home.', ['shko', 'shtepi'], {
  intent: 'speech', playerIntents: ['speech'],
})).issue || '', /exact words.*speechAct/,
'a bare spoken command passed without explicit speech ownership')
assert.match(choiceActorReview(option('Give up.', ['dorezohem'], {
  intent: 'speech', playerIntents: ['speech'],
})).issue || '', /exact words.*speechAct/,
'a non-movement spoken command passed without explicit speech ownership')
assert.deepEqual(choiceActorReview(option('Go home.', ['shko', 'shtepi'], {
  intent: 'movement', playerIntents: ['movement'],
})), {
  actor: 'player', mode: 'player-action', issue: null,
}, 'an ordinary movement action was mistaken for quoted speech')
assert.deepEqual(choiceActorReview(option('Go home.', ['shko', 'shtepi'], {
  intent: 'speech', playerIntents: ['speech'], speechAct: 'tell',
})), {
  actor: 'player', mode: 'player-utterance', issue: null,
}, 'an explicitly owned direct command failed the actor contract')
assert.match(choiceActorReview(option('You hear the old man say, “Go home.”', [
  'ti', 'degjo', 'plak', 'thote', 'shko', 'shtepi',
], { speechAct: 'tell' })).issue || '', /non-player subject.*plak/,
'an early player pronoun hid a later non-player speaker')
assert.match(choiceActorReview(option('The market says, “Good.”', [
  'treg', 'thote', 'mire',
], { speechAct: 'say' })).issue || '', /non-player subject.*treg/,
'speechAct metadata overrode a non-player grammatical speaker')
assert.match(choiceActorReview(option('The trader asks about bread.', [
  'tregtar', 'pyet', 'per', 'buke',
], { speechAct: 'ask' })).issue || '', /non-player subject.*tregtar/,
'speechAct metadata overrode a non-player speaker using another speech verb')

attachReviewedOptionReadings(STORY, ITEMS, HEART_LEVELS)
const production = storyChoiceActorIssues(STORY)
assert.ok(production.choiceCount > 0, 'the whole-choice actor audit inspected no choices')
assert.ok(production.confuserCount > 0, 'the whole-choice actor audit skipped confusers')
assert.deepEqual(production.issues, [],
  `choice actor/agency failures:\n${production.issues.join('\n')}`)
assert.equal(production.choiceCount, production.actionCount + production.utteranceCount,
  'not every selectable surface resolved to a player action or utterance')

console.log(`Choice actor audit passed: ${production.choiceCount} choices (${production.confuserCount} confusers) are ${production.actionCount} player actions or ${production.utteranceCount} explicit player utterances.`)
