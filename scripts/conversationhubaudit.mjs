// Release gate for player-led NPC conversations. Substantial conversations
// expose optional questions in a reusable same-place hub, retire asked topics,
// show only the latest response and leave the player an explicit exit. The
// second pass records the remaining legacy lines where an NPC asks a question
// and the story supplies the player's answer without a choice.

import assert from 'node:assert/strict'
import { STORY, lineOf, visibleLines } from '../src/game/content.js'
import { CONVERSATION_HUBS } from '../src/game/conversationHub.js'
import { albanianTextOf, englishReadingOf } from '../src/game/language.js'
import { npcIdentityKnowledgeId } from '../src/game/npcIdentity.js'
import { PLACE_OF } from '../src/components/nodePositions.js'

const rawFlagId = (conditionId) => conditionId.replace(/^flag:/, '')
const idsOf = (line) => line.filter((token) => token.id).map((token) => token.id)

assert.ok(Object.keys(CONVERSATION_HUBS).length > 0, 'no conversation hubs are registered')

for (const hub of Object.values(CONVERSATION_HUBS)) {
  const node = STORY[hub.nodeId]
  assert.ok(node, `${hub.id}: missing node ${hub.nodeId}`)
  assert.ok(STORY[hub.exitTo], `${hub.id}: missing exit node ${hub.exitTo}`)

  const questions = node.options.filter((option) =>
    option.conversationHub?.hubId === hub.id && option.conversationHub.kind === 'question')
  const exits = node.options.filter((option) =>
    option.conversationHub?.hubId === hub.id && option.conversationHub.kind === 'exit')
  assert.equal(questions.length, Object.keys(hub.questions).length,
    `${hub.id}: every declared question needs one authored option`)
  assert.equal(exits.length, 1, `${hub.id}: conversation needs one explicit exit`)

  for (const [questionId, spec] of Object.entries(hub.questions)) {
    const option = questions.find((candidate) => candidate.conversationHub.questionId === questionId)
    assert.ok(option, `${hub.id}/${questionId}: question option is missing`)
    assert.equal(option.to, hub.nodeId, `${hub.id}/${questionId}: asking a question moved the player`)
    assert.equal(option.durationHours, 0, `${hub.id}/${questionId}: asking a question advanced time`)
    assert.ok([].concat(option.unless || []).includes(spec.askedCondition),
      `${hub.id}/${questionId}: asked question does not retire`)
    assert.ok(option.effects.some((effect) =>
      effect.type === 'flag' && effect.id === rawFlagId(spec.askedCondition) && effect.value !== false),
    `${hub.id}/${questionId}: question does not record that it was asked`)
    assert.ok(option.effects.some((effect) =>
      effect.type === 'flag' && effect.id === rawFlagId(spec.responseCondition) && effect.value !== false),
    `${hub.id}/${questionId}: question does not reveal its answer`)

    const responses = node.text.filter((entry) =>
      entry.conversationHub?.hubId === hub.id
      && entry.conversationHub.kind === 'response'
      && entry.conversationHub.questionId === questionId)
    assert.ok(responses.length > 0, `${hub.id}/${questionId}: question has no response`)
    for (const entry of responses) {
      assert.ok([].concat(entry.cond || []).includes(spec.responseCondition),
        `${hub.id}/${questionId}: response is not gated by the current topic`)
    }
  }

  const responseConditions = Object.values(hub.questions).map((question) => question.responseCondition)
  for (const option of [...questions, ...exits]) {
    for (const conditionId of responseConditions) {
      assert.ok(option.effects.some((effect) =>
        effect.type === 'flag' && effect.id === rawFlagId(conditionId) && effect.value === false),
      `${hub.id}: changing topic can leave an older answer visible`)
    }
  }
  assert.equal(exits[0].to, hub.exitTo, `${hub.id}: exit does not return to the declared scene`)
  if (PLACE_OF[hub.nodeId] === PLACE_OF[hub.exitTo]) {
    assert.equal(exits[0].durationHours, 0, `${hub.id}: same-place goodbye advances time`)
  } else {
    assert.ok(exits[0].durationHours > 0, `${hub.id}: cross-place exit silently teleports the player`)
    assert.equal(exits[0].intent, 'movement', `${hub.id}: cross-place exit is not classified as movement`)
    assert.deepEqual(exits[0].playerIntents, ['movement'], `${hub.id}: cross-place exit bundles another intention`)
  }

  const openingLines = visibleLines(node, (conditionId) => conditionId === 'npc:placeholder')
  assert.ok(openingLines.length <= 3,
    `${hub.id}: conversation opens with ${openingLines.length} lines before the player asks anything`)
}

// Pin the water-carrier migration that established the contract.
const waterHub = CONVERSATION_HUBS['water-carrier-bank']
assert.ok(waterHub, 'water-carrier conversation was removed from the shared hub registry')
assert.deepEqual(Object.keys(waterHub.questions), ['name', 'dryWell', 'caller', 'spring', 'help'])
const nameOption = STORY.gruaUji1.options.find((option) => option.conversationHub?.questionId === 'name')
assert.ok(nameOption.effects.some((effect) =>
  effect.type === 'learn' && effect.id === npcIdentityKnowledgeId('gruaUji')),
'asking the water-carrier her name does not persist Mira’s identity')
assert.equal(albanianTextOf(nameOption.text), 'si quhesh?')

// The guest meal is the second canonical hub: the initial scene stays short,
// the player chooses which ordinary topics to ask about, and only hearing the
// news unlocks the two responses to the dry-well dilemma.
const guestHub = CONVERSATION_HUBS['guest-meal']
assert.ok(guestHub, 'the guest meal regressed to a supplied monologue')
assert.deepEqual(Object.keys(guestHub.questions), ['mealWish', 'nameOrigin', 'drink', 'home', 'work', 'family', 'journey', 'news'])
const guestNameOption = STORY.sofraMikut2.options.find((option) =>
  option.conversationHub?.questionId === 'nameOrigin')
assert.ok(guestNameOption.effects.some((effect) =>
  effect.type === 'learn' && effect.id === npcIdentityKnowledgeId('gjonMik')),
'asking the traveller his name does not persist Gjon’s identity')
const guestNewsCondition = guestHub.questions.news.askedCondition
const guestDecisions = STORY.sofraMikut2.options.filter((option) =>
  ['po, jam dakord.', 'nuk jam dakord. mendoj se duhet të pyesim plakën.']
    .includes(albanianTextOf(option.text)))
assert.equal(guestDecisions.length, 2, 'the guest news does not lead to two player-owned responses')
for (const option of guestDecisions) {
  assert.ok([].concat(option.requires || []).includes(guestNewsCondition),
    'a dry-well response appears before the player asks for the news')
  assert.equal(PLACE_OF.sofraMikut2, PLACE_OF[option.to],
    'responding to the guest also starts the journey')
}
assert.equal(STORY.sofraMikut2.tells, undefined,
  'entering the guest-room reveals the dry-well route before the player asks for news')
for (const nodeId of ['sofraVendimPlaka', 'sofraVendimPusi']) {
  assert.ok(STORY[nodeId].tells?.includes('pusiThate'), `${nodeId}: heard news does not reveal the dry well`)
}
assert.deepEqual(STORY.sofraMikut2.text
  .map((entry) => englishReadingOf(lineOf(entry)))
  .filter((reading) => /^You (?:say|ask|answer|reply|tell)\b/u.test(reading)), [],
'the guest meal still speaks or asks on the player’s behalf')

const lateApology = STORY.eliraShesh.options.find((option) =>
  albanianTextOf(option.text) === 'më fal. kam gabuar.')
assert.ok(lateApology, 'the late rendezvous gives the player no apology choice')
assert.equal(lateApology.intent, 'speech', 'the late apology is not one speech intention')
assert.ok([].concat(lateApology.requires || []).includes('rendezvous:eliraSquare:late'))
assert.equal(STORY.eliraShesh.text.some((entry) =>
  /^You say, “Sorry\. I was wrong\.”$/u.test(englishReadingOf(lineOf(entry)))), false,
'the late rendezvous still apologises on the player’s behalf')

// An NPC may ask, but the authored line may not also decide what the player
// says. These known legacy cases form an explicit migration queue; exact
// equality means a new regression fails instead of silently joining it.
const suppliedPlayerReplies = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (let index = 0; index < node.text.length; index += 1) {
    const ids = idsOf(lineOf(node.text[index]))
    const asks = ids.indexOf('pyet')
    const player = ids.indexOf('ti', asks + 1)
    const answers = ids.findIndex((id, tokenIndex) => tokenIndex > player && id === 'thote')
    if (asks >= 0 && player > asks && answers > player) suppliedPlayerReplies.push(`${nodeId}.text[${index}]`)
  }
}
const LEGACY_SUPPLIED_REPLY_BACKLOG = []
assert.deepEqual(suppliedPlayerReplies.sort(), LEGACY_SUPPLIED_REPLY_BACKLOG.sort(),
  `NPC-question lines changed without updating the player-agency migration queue:\n${suppliedPlayerReplies.join('\n')}`)
assert.equal(albanianTextOf(lineOf(STORY.behuriKulla.text[2])), 'Mujo pyet: cila derë?',
  'Mujo’s door question again supplies the answer')
assert.ok(STORY.behuriKulla.options.some((option) => albanianTextOf(option.text) === 'dera e ahurit.'),
  'the stable-door reply is not an explicit choice')
assert.equal(albanianTextOf(lineOf(STORY.porosiaBlerje.text[2])), 'fëmija pyet: çfarë ke marrë?',
  'the child’s market question again supplies the answer')
const marketAnswer = STORY.porosiaBlerje.options.find((option) =>
  albanianTextOf(option.text) === 'bukë dhe kripë për mikun.')
assert.ok(marketAnswer, 'the child’s market question has no explicit answer')
assert.equal(PLACE_OF.porosiaBlerje, PLACE_OF[marketAnswer.to],
  'answering the child also relocates the player')
assert.ok(STORY[marketAnswer.to].options.some((option) => option.to === 'fshatiSheshi'),
  'the child’s response does not offer an independent return to the square')
assert.ok(STORY.sheruesi.options.some((option) =>
  albanianTextOf(option.text) === 'më dhemb këtu. kam nevojë për ndihmë.'
  && option.effects?.some((effect) => effect.type === 'flag' && effect.id === 'askedForHelp')),
'the healer’s question has no explicit answer choice')
assert.ok(STORY.sofraMikut2.options.some((option) =>
  albanianTextOf(option.text) === 'po, merre.'
  && option.effects?.some((effect) => effect.type === 'flag' && effect.id === 'gaveGuestBread')),
'the guest’s bread request has no optional explicit reply')
assert.ok(STORY.sofraMikut2.options.some((option) =>
  albanianTextOf(option.text) === 'të bëftë mirë!'
  && option.conversationHub?.questionId === 'mealWish'),
'the meal has no optional culturally natural good-appetite exchange')
const dryWellAgreement = STORY.sofraMikut2.options.find((option) =>
  albanianTextOf(option.text) === 'po, jam dakord.')
assert.ok(dryWellAgreement, 'the dry-well plan is not an explicit player reply')
assert.equal(dryWellAgreement.intent, 'speech', 'the dry-well agreement is not classified as speech')
assert.deepEqual(dryWellAgreement.playerIntents, ['speech'],
  'the dry-well agreement claims to perform another player intention')
assert.equal(PLACE_OF.sofraMikut2, PLACE_OF[dryWellAgreement.to],
  'agreeing to investigate the dry well also starts the journey')
assert.ok(STORY[dryWellAgreement.to].options.some((option) => option.to === 'pusiThate'),
  'the response has no later explicit journey to the dry well')
assert.ok(STORY[dryWellAgreement.to].options.some((option) => option.to === 'fshatiSheshi'),
  'the response traps the player into the dry-well journey')
const guestExit = STORY.sofraMikut2.options.find((option) => option.conversationHub?.kind === 'exit')
assert.equal(guestExit?.intent, 'movement', 'the cross-place guest-hub exit is not one explicit movement intention')
assert.equal(guestExit?.durationHours, 1, 'the cross-place guest-hub exit consumes no travel time')
assert.ok(!suppliedPlayerReplies.some((address) => address.startsWith('kroi1.')),
  'the spring girl still supplies the player’s reply')
assert.ok(STORY.kroi1.options.some((option) => albanianTextOf(option.text) === 'dua ujë, të lutem.'),
  'the spring girl’s question has no explicit player response')

console.log(`Conversation hub audit passed: ${Object.keys(CONVERSATION_HUBS).length} hub(s); ` +
  `${LEGACY_SUPPLIED_REPLY_BACKLOG.length} legacy supplied replies remain explicitly queued.`)
