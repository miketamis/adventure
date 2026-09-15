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

  // Conditional response variants can carry ordinary world-state gates in
  // addition to their inactive topic flag. Exclude reviewed response entries
  // structurally before projecting the opening so those variants never count
  // as scene-opening prose merely because an unrelated `unless` is true.
  const openingNode = {
    ...node,
    text: node.text.filter((entry) => entry.conversationHub?.kind !== 'response'),
  }
  const openingLines = visibleLines(openingNode, (conditionId) => conditionId === 'npc:placeholder')
  assert.ok(openingLines.length <= 3,
    `${hub.id}: conversation opens with ${openingLines.length} lines before the player asks anything`)
}

// The first-village conversation sweep gives each recurring neighbour a
// player-led, same-place exchange instead of using them only as quest or shop
// interfaces. Keep the exact topic inventory reviewed: changing it is an
// editorial language change, not a silent data-count increase.
const VILLAGE_CONVERSATION_TOPICS = {
  'elira-neighbour': ['today', 'work', 'availability', 'waitQuestion'],
  'spring-girl': ['water', 'routine', 'village'],
  'forest-guest': ['cold', 'destination', 'alone'],
  'square-elder': ['well', 'water', 'help', 'seriously', 'meaning', 'clarify', 'repair', 'understood', 'agree'],
  'village-shepherd': ['today', 'goats', 'help', 'return'],
  'gjakova-trader': ['cheaper', 'road', 'opening'],
  'gjakova-healer': ['return', 'work', 'bandage'],
  'gjakova-innkeeper': ['hotWater', 'breakfast', 'bag', 'leaveBag'],
  'rain-children': ['activity', 'join', 'reason', 'really', 'nonsense'],
  'village-wedding': ['start', 'bride', 'dance'],
}

// These reviewed surfaces are the learner-facing anchors for the village's
// new everyday functions. Pin both the wording and the intended dictionary
// sense so punctuation, informal register, and same-spelling contrasts cannot
// drift silently while the hub inventory still happens to pass.
const REVIEWED_HUB_SURFACES = [
  ['elira-neighbour', 'today', 'question', "Ç'kemi? Si je sot?", ['ckemi']],
  ['elira-neighbour', 'work', 'question', 'Ça po bën?', ['cfare']],
  ['elira-neighbour', 'waitQuestion', 'question', 'Prit pak; kam një pyetje.', ['prit', 'pyetje']],
  ['square-elder', 'well', 'question', 'Çfarë ndodhi?', ['cfare', 'ndodh']],
  ['square-elder', 'seriously', 'question', 'Seriozisht?', ['seriozisht']],
  ['square-elder', 'meaning', 'question', 'Si domethënë?', ['domethene']],
  ['square-elder', 'clarify', 'question', 'Çfarë do të thuash?', ['cfare', 'thote']],
  ['square-elder', 'repair', 'question', 'Nuk e kuptoj. Mund ta përsërisësh, të lutem?', ['kuptoj', 'perserit']],
  ['square-elder', 'understood', 'question', 'Tani e kuptova.', ['tani', 'e_obj', 'kuptoj']],
  ['square-elder', 'understood', 'response', 'Buzëqesh. Po pra. Tani e di rrugën.', ['po_yes', 'pra']],
  ['square-elder', 'agree', 'question', 'Ke të drejtë. Duhet të ndihmojmë.', ['drejte', 'ndihmo']],
  ['gjakova-innkeeper', 'bag', 'response', 'Gruaja tregon derën. Ja pra. Lëreni çantën pranë derës.', ['ja', 'pra', 'le', 'cante']],
  ['gjakova-innkeeper', 'leaveBag', 'response', 'Gruaja buzëqesh. Pa merak. Lëreni këtu; është e sigurt.', ['merak', 'le']],
  ['rain-children', 'really', 'question', 'Me gjithë mend?', ['me', 'gjithe', 'mend']],
  ['rain-children', 'nonsense', 'question', 'Po flet kot.', ['kot']],
  ['rain-children', 'nonsense', 'response', 'Fëmijët qeshin. Një fëmijë thotë: Hajt, mo! Po bëj shaka. Një tjetër thotë: Aman! Lëre fare. Vdiqa së qeshuri!', ['aman_appeal', 'shaka']],
  ['spring-girl', 'water', 'response', 'ajo thotë: Normal! Uji është i ftohtë sepse vjen nga mali.', ['normal_response']],
  ['gjakova-trader', 'opening', 'response', 'ai thotë: Dyqani hapet fiks në orën shtatë.', ['fiks']],
  ['gjakova-innkeeper', 'breakfast', 'response', 'ajo thotë: Mëngjesi fillon fiks në orën shtatë.', ['fiks']],
  ['village-shepherd', 'today', 'question', 'Çfarë po bën sot?', ['cfare', 'bej', 'sot']],
  ['village-shepherd', 'help', 'response', "ai thotë: po. Ruaji dhitë deri në mbrëmje, të lutem. Nëse është e vështirë, s'ka gjë; provoje.", ['provo']],
]

for (const [hubId, questionId, kind, expectedText, expectedIds] of REVIEWED_HUB_SURFACES) {
  const hub = CONVERSATION_HUBS[hubId]
  const entries = kind === 'question' ? STORY[hub.nodeId].options : STORY[hub.nodeId].text
  const entry = entries.find((candidate) =>
    candidate.conversationHub?.hubId === hubId
      && candidate.conversationHub?.questionId === questionId
      && candidate.conversationHub?.kind === kind)
  assert.ok(entry, `${hubId}/${questionId}: reviewed ${kind} is missing`)
  const line = kind === 'question' ? entry.text : lineOf(entry)
  assert.equal(albanianTextOf(line), expectedText,
    `${hubId}/${questionId}: reviewed Albanian surface drifted`)
  for (const id of expectedIds) {
    assert.ok(idsOf(line).includes(id),
      `${hubId}/${questionId}: reviewed surface lost dictionary sense ${id}`)
  }
}

const REVIEWED_DEPENDENT_TOPICS = [
  ['square-elder', 'seriously', 'well'],
  ['square-elder', 'meaning', 'well'],
  ['square-elder', 'clarify', 'well'],
  ['square-elder', 'repair', 'water'],
  ['square-elder', 'agree', 'help'],
  ['gjakova-innkeeper', 'leaveBag', 'bag'],
  ['square-elder', 'understood', 'repair'],
  ['rain-children', 'really', 'reason'],
  ['rain-children', 'nonsense', 'activity'],
]
for (const [hubId, questionId, prerequisiteId] of REVIEWED_DEPENDENT_TOPICS) {
  const hub = CONVERSATION_HUBS[hubId]
  const option = STORY[hub.nodeId].options.find((candidate) =>
    candidate.conversationHub?.hubId === hubId
      && candidate.conversationHub?.questionId === questionId)
  assert.ok([].concat(option.requires || []).includes(hub.questions[prerequisiteId].askedCondition),
    `${hubId}/${questionId}: appears before the ${prerequisiteId} context establishes it`)
}
for (const questionId of ['meaning', 'clarify']) {
  const option = STORY.sheshiPlak.options.find((candidate) =>
    candidate.conversationHub?.hubId === 'square-elder'
      && candidate.conversationHub?.questionId === questionId)
  assert.ok([].concat(option.unless || []).includes('fact:villageWellsRestored'),
    `square-elder/${questionId}: dry-well rumor follow-up remains visible after the wells are restored`)
}
const childrenReallyOption = STORY.dordolecBiseda.options.find((candidate) =>
  candidate.conversationHub?.hubId === 'rain-children'
    && candidate.conversationHub?.questionId === 'really')
assert.ok([].concat(childrenReallyOption.unless || []).includes('fact:villageWellsRestored'),
  'rain-children/really: dry-well follow-up remains visible after the wells are restored')
for (const [hubId, questionIds] of Object.entries(VILLAGE_CONVERSATION_TOPICS)) {
  const hub = CONVERSATION_HUBS[hubId]
  assert.ok(hub, `${hubId}: reviewed village conversation was removed`)
  assert.deepEqual(Object.keys(hub.questions), questionIds,
    `${hubId}: reviewed village topics changed without editorial review`)
  assert.ok(Object.entries(STORY).some(([sourceId, node]) =>
    sourceId !== hub.nodeId && node.options.some((option) => option.to === hub.nodeId)),
  `${hubId}: conversation exists but is unreachable from ordinary play`)
  const questions = STORY[hub.nodeId].options.filter((option) =>
    option.conversationHub?.hubId === hubId && option.conversationHub.kind === 'question')
  assert.ok(questions.every((option) =>
    option.intent === 'speech' && JSON.stringify(option.playerIntents) === JSON.stringify(['speech'])),
  `${hubId}: a topic is not exactly one player-owned speech intention`)
}

// Pin the water-carrier migration that established the contract.
const waterHub = CONVERSATION_HUBS['water-carrier-bank']
assert.ok(waterHub, 'water-carrier conversation was removed from the shared hub registry')
assert.deepEqual(Object.keys(waterHub.questions), ['name', 'dryWell', 'caller', 'spring', 'help'])
const waterProblemOption = STORY.gruaUji1.options.find((option) =>
  option.conversationHub?.questionId === 'dryWell')
assert.ok(waterProblemOption, 'the grounded water-carrier question was removed')
assert.equal(albanianTextOf(waterProblemOption.text), 'pse nuk e përdor pusin?',
  'the water-carrier question again assumes that the learner knows the well is dry')
const waterProblemSetup = STORY.gruaUji1.text.find((entry) =>
  englishReadingOf(lineOf(entry)).includes('I cannot use the village well.'))
assert.ok(waterProblemSetup,
  'the water-carrier does not establish why the learner can ask about using the village well')
assert.ok(englishReadingOf(lineOf(waterProblemSetup)).includes('all the way to the spring for water'),
  'the water-carrier setup no longer conveys the burden that motivates the learner’s question')
assert.equal(albanianTextOf(lineOf(waterProblemSetup)),
  'Zëri i një fëmije vjen nga lart. Ajo tund kokën. Çdo ditë duhet të vij deri te kroi për ujë; nuk mund ta përdor pusin e fshatit.',
  'the water-carrier’s reviewed Albanian setup drifted')
for (const conditionId of [waterHub.questions.dryWell.askedCondition, 'fact:villageWellsRestored']) {
  assert.ok([].concat(waterProblemSetup.none || []).includes(conditionId),
    `the water-carrier setup remains visible after ${conditionId}`)
  assert.ok([].concat(waterProblemOption.unless || []).includes(conditionId),
    `the water-carrier question remains available after ${conditionId}`)
}
const waterProblemResponses = STORY.gruaUji1.text.filter((entry) =>
  entry.conversationHub?.questionId === 'dryWell')
assert.ok(waterProblemResponses.every((entry) =>
  [].concat(entry.none || []).includes('fact:villageWellsRestored')),
'the water-carrier can still say that the well is dry after its water returns')
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
