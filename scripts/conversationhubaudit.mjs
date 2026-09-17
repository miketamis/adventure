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
import { observationConditionId, observationIdOfLine } from '../src/game/observations.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import {
  GROUNDED_DIRECTION_CONTRACTS,
  LOCATION_QUESTION_REVIEWS,
} from '../src/game/groundedDirections.js'

const rawFlagId = (conditionId) => conditionId.replace(/^flag:/, '')
const idsOf = (line) => line.filter((token) => token.id).map((token) => token.id)
const isQuestionLine = (line) => line.some((token) => token.paren && token.en === '?')

// A legacy “question page” leaves the physical scene only in graph terms: the
// answer node has one genuine action and that action returns to the question
// menu. Two or more such topics are a conversation hub authored as a page
// chain. Detect that structure from story topology and token punctuation; no
// English label or node allowlist can make a new instance pass.
const forcedSamePlaceReturnPath = (story, placeOf, sourceId, startId) => {
  const path = []
  const seen = new Set()
  let currentId = startId
  for (let depth = 0; depth < 6; depth += 1) {
    if (currentId === sourceId) return path
    if (seen.has(currentId) || placeOf[currentId] !== placeOf[sourceId]) return null
    seen.add(currentId)
    const node = story[currentId]
    if (!node) return null
    const genuine = (node.options || []).filter((candidate) => !candidate.confuser)
    if (genuine.length !== 1) return null
    path.push(currentId)
    currentId = genuine[0].to
  }
  return null
}

const legacyQuestionPageChains = (story, placeOf) => Object.entries(story).flatMap(([sourceId, source]) => {
  const miniPages = source.options.filter((option) => {
    if (option.confuser || option.conversationHub || option.to === sourceId || !isQuestionLine(option.text)) return false
    if (placeOf[sourceId] !== placeOf[option.to]) return false
    return forcedSamePlaceReturnPath(story, placeOf, sourceId, option.to) !== null
  })
  return miniPages.length < 2
    ? []
    : [`${sourceId}: ${miniPages.map((option) => {
      const path = forcedSamePlaceReturnPath(story, placeOf, sourceId, option.to)
      return `${option.to}${path.length > 1 ? ` via ${path.slice(1).join(' -> ')}` : ''}`
    }).sort().join(', ')}`]
})

// A same-node question menu is still a conversation hub even when it avoids
// separate answer pages. Require the shared contract so topic retirement,
// latest-answer replacement and an always-available exit are all audited.
const unregisteredSameNodeTopicMenus = (story) => Object.entries(story).flatMap(([nodeId, node]) => {
  const questions = (node.options || []).filter((option) =>
    !option.confuser
    && !option.conversationHub
    && option.to === nodeId
    && isQuestionLine(option.text))
  return questions.length < 2
    ? []
    : [`${nodeId}: ${questions.map((option) => albanianTextOf(option.text)).join(' | ')}`]
})

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
  assert.equal(Boolean(exits[0]?.confuser), false, `${hub.id}: exit is a confuser rather than a genuine action`)
  assert.deepEqual([].concat(exits[0]?.requires || []), [], `${hub.id}: exit is conditional on a requirement`)
  assert.deepEqual([].concat(exits[0]?.unless || []), [], `${hub.id}: exit is conditionally hidden`)
  assert.equal(exits[0]?.reveal, undefined, `${hub.id}: exit is gated by vocabulary discovery`)
  assert.equal(exits[0]?.revealOccurrence, undefined, `${hub.id}: exit is gated by a reveal occurrence`)

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

assert.deepEqual(legacyQuestionPageChains(STORY, PLACE_OF), [],
  'multi-topic conversations still use answer pages with a forced return action')
assert.deepEqual(unregisteredSameNodeTopicMenus(STORY), [],
  'same-place multi-topic conversations bypass the shared conversation-hub contract')
assert.deepEqual(legacyQuestionPageChains({
  sample: {
    options: [
      { text: [{ en: '?', paren: true }], to: 'answerOne' },
      { text: [{ en: '?', paren: true }], to: 'answerTwo' },
    ],
  },
  answerOne: { options: [{ text: [], to: 'sample' }] },
  answerTwo: { options: [{ text: [], to: 'sample' }] },
}, { sample: 'room', answerOne: 'room', answerTwo: 'room' }), ['sample: answerOne, answerTwo'],
'the legacy question-page regression fixture no longer exercises the topology gate')
assert.deepEqual(legacyQuestionPageChains({
  sample: {
    options: [
      { text: [{ en: '?', paren: true }], to: 'answerOne' },
      { text: [{ en: '?', paren: true }], to: 'answerTwo' },
    ],
  },
  answerOne: { options: [{ text: [], to: 'returnOne' }] },
  returnOne: { options: [{ text: [], to: 'sample' }] },
  answerTwo: { options: [{ text: [], to: 'returnTwo' }] },
  returnTwo: { options: [{ text: [], to: 'sample' }] },
}, {
  sample: 'room', answerOne: 'room', returnOne: 'room', answerTwo: 'room', returnTwo: 'room',
}), ['sample: answerOne via returnOne, answerTwo via returnTwo'],
'the legacy question-page gate no longer follows forced intermediate return pages')
assert.deepEqual(unregisteredSameNodeTopicMenus({
  sample: {
    options: [
      { text: [{ en: '?', paren: true, al: '?' }], to: 'sample' },
      { text: [{ en: '?', paren: true, al: '?' }], to: 'sample' },
    ],
  },
}), ['sample: ? | ?'],
'the unregistered same-node topic-menu fixture no longer exercises the contract gate')

// The practical-conversation sweep gives recurring neighbours, traders and
// story informants a player-led, same-place exchange instead of using them
// only as quest, shop or lore-page interfaces. Keep the topic inventory reviewed:
// changing it is an editorial language change, not a silent data-count increase.
const REVIEWED_CONVERSATION_TOPICS = {
  'bridge-core': ['waitQuestion', 'water', 'today', 'forest', 'identity'],
  'elira-neighbour': ['today', 'work', 'availability', 'waitQuestion'],
  'spring-girl': ['water', 'routine', 'village'],
  'forest-guest': ['cold', 'destination', 'alone'],
  'square-elder': ['well', 'water', 'help', 'seriously', 'meaning', 'clarify', 'repair', 'understood', 'agree', 'forestLore'],
  'village-shepherd': ['today', 'goats', 'help', 'return'],
  'gjakova-trader': ['cheaper', 'road', 'opening'],
  'gjakova-healer': ['return', 'work', 'bandage', 'forestLore'],
  'gjakova-innkeeper': ['hotWater', 'breakfast', 'bag', 'leaveBag'],
  'rain-children': ['activity', 'join', 'reason', 'really', 'nonsense'],
  'village-wedding': ['start', 'bride', 'dance'],
  'palace-guard': ['blackPalace', 'blockedEntry'],
  'elira-errand': ['guest', 'market', 'guestRoom', 'repair'],
  'market-stall': ['bread', 'prices', 'repair', 'meaning'],
}

// These reviewed surfaces are the learner-facing anchors for the village's
// new everyday functions. Pin both the wording and the intended dictionary
// sense so punctuation, informal register, and same-spelling contrasts cannot
// drift silently while the hub inventory still happens to pass.
const REVIEWED_HUB_SURFACES = [
  ['bridge-core', 'waitQuestion', 'question', 'Prit pak; kam një pyetje.', ['ka', 'pyetje']],
  ['bridge-core', 'water', 'question', 'dua ujë, të lutem.', ['do', 'uje']],
  ['bridge-core', 'today', 'question', 'Çfarë po bën sot?', ['cfare', 'bej', 'sot']],
  ['bridge-core', 'forest', 'question', 'Çfarë duhet të di për pyllin natën?', ['duhet', 'di', 'pyll']],
  ['bridge-core', 'identity', 'question', 'si quhesh? nga je?', ['quhem', 'nga', 'je']],
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
  ['square-elder', 'forestLore', 'question', 'Çfarë duhet të di për pyllin natën?', ['cfare', 'pyll', 'naten']],
  ['square-elder', 'forestLore', 'response', 'Plaku thotë: natën, një shtrigë ikën nga kripa që hidhet në zjarr. çdo njeri ka një Ora.', ['plak', 'shtrige', 'kripe', 'ora']],
  ['gjakova-healer', 'forestLore', 'question', 'Çfarë duhet të di për pyllin natën?', ['cfare', 'pyll', 'naten']],
  ['gjakova-healer', 'forestLore', 'response', 'Shëruesi thotë: natën, një shtrigë ikën nga kripa që hidhet në zjarr. çdo njeri ka një Ora.', ['sherues', 'shtrige', 'kripe', 'ora']],
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
  ['palace-guard', 'blackPalace', 'question', 'pse pallati është i zi?', ['pse', 'pallat', 'zi']],
  ['palace-guard', 'blackPalace', 'response', 'Roja thotë: mbretëresha vajton, prandaj ajo bën pallatin të zi.', ['roje', 'mbreteresha', 'vajto', 'pallat']],
  ['palace-guard', 'blockedEntry', 'question', 'pse nuk hyj?', ['pse', 'hyr']],
  ['palace-guard', 'blockedEntry', 'response', 'Roja thotë: dera nuk hapet për askënd. mbretëresha pa fëmijë premtoi bijën Diellit. Dielli mori bijën, dhe mbretëresha vajton.', ['roje', 'dere', 'hap', 'askush', 'mbreteresha', 'premto', 'bije', 'diell']],
  ['elira-errand', 'market', 'question', 'ku është tregu?', ['ku', 'treg']],
  ['elira-errand', 'guestRoom', 'question', 'ku është oda? majtas apo djathtas?', ['ku', 'oda', 'majtas', 'djathtas']],
  ['elira-errand', 'repair', 'question', 'nuk kuptoj. fol ngadalë, të lutem.', ['kuptoj', 'fol', 'ngadale']],
  ['market-stall', 'bread', 'question', 'keni bukë?', ['ka', 'buke']],
  ['market-stall', 'bread', 'response', 'tregtari thotë: po, kam bukë.', ['tregtar', 'po_yes', 'ka', 'buke']],
  ['market-stall', 'prices', 'question', 'sa kushtojnë?', ['sa', 'kushton']],
  ['market-stall', 'prices', 'response', 'tregtari thotë: buka kushton njëqind lekë, dhe kripa kushton njëqind lekë.', ['tregtar', 'buke', 'kushton', 'kripe']],
  ['market-stall', 'repair', 'question', 'nuk kuptoj. Përsërit, të lutem.', ['kuptoj', 'perserit', 'lutem']],
  ['market-stall', 'repair', 'response', 'Tregtari thotë: me kënaqësi. Ai flet ngadalë: një bukë kushton njëqind lekë. kripë kushton njëqind lekë.', ['tregtar', 'kenaqesi', 'ngadale', 'buke', 'kushton', 'kripe']],
  ['market-stall', 'meaning', 'question', 'çfarë do të thotë?', ['cfare', 'thote']],
  ['market-stall', 'meaning', 'response', 'Tregtari thotë: kushton do të thotë: sa para?', ['tregtar', 'kushton', 'thote', 'para_money']],
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
  ['market-stall', 'meaning', 'repair'],
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
for (const [hubId, questionIds] of Object.entries(REVIEWED_CONVERSATION_TOPICS)) {
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
assert.ok(STORY[marketAnswer.to].options.some((option) => option.to === 'pusiThate'),
  'the child’s response does not offer an independent exit to the well')
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

// Asking for an actionable location must create a real information gap. The
// answer contributes Albanian route cues, the conversation ends in place, and
// ordinary world choices—not a revealed destination button—carry the learner
// to the destination. Plausible wrong turns move somewhere real and stay out
// of the heart-loss confuser pipeline.
const conditionsOf = (value) => [].concat(value || [])
const rawConditionId = (conditionId) => conditionId.replace(/^flag:/, '')
const includesEvery = (actual, expected) => expected.every((id) => actual.includes(id))
const realOptions = (nodeId) => STORY[nodeId].options.filter((option) => !option.confuser)
const locationQuestionOptions = []

const fromConditionIncludes = (conditionId, predecessorId) =>
  Boolean(predecessorId
    && String(conditionId).startsWith('from:')
    && String(conditionId).slice('from:'.length).split('|').includes(predecessorId))

const sourceEvidenceIsEntailed = (entry, option, predecessorId) => {
  const line = lineOf(entry)
  if (line?.scenePriority === 'ambient') return false
  const required = new Set(conditionsOf(option?.requires).filter(Boolean))
  const excluded = new Set(conditionsOf(option?.unless).filter(Boolean))
  const observationId = observationIdOfLine(line)
  if (observationId && !required.has(observationConditionId(observationId))) return false
  if (Array.isArray(entry)) return true

  const positive = conditionsOf(entry.cond).filter(Boolean)
  if (entry.negate) {
    // A negated all-of condition is guaranteed only when the option itself
    // excludes at least one member. Merely failing to require a condition is
    // not proof that it will be absent in a real saved game.
    if (!positive.some((id) => excluded.has(id))) return false
  } else if (!positive.every((id) =>
    required.has(id) || fromConditionIncludes(id, predecessorId))) {
    return false
  }
  return conditionsOf(entry.none).filter(Boolean).every((id) => excluded.has(id))
}

const unresolvedEvidenceLiteral = (entry, option, predecessorId) => {
  const line = lineOf(entry)
  if (line?.scenePriority === 'ambient' || Array.isArray(entry)) return null
  const required = new Set(conditionsOf(option?.requires).filter(Boolean))
  const excluded = new Set(conditionsOf(option?.unless).filter(Boolean))
  const literals = []
  const observationId = observationIdOfLine(line)
  if (observationId) {
    const conditionId = observationConditionId(observationId)
    if (!required.has(conditionId)) literals.push(`+${conditionId}`)
  }

  const positive = conditionsOf(entry.cond).filter(Boolean)
  if (entry.negate) {
    if (positive.some((id) => excluded.has(id))) return null
    const unresolved = positive.filter((id) =>
      !required.has(id) && !fromConditionIncludes(id, predecessorId))
    // `unless([a,b])` means not(a && b), which is not one literal unless all
    // but one members are already known true at this edge.
    if (unresolved.length === 1) literals.push(`-${unresolved[0]}`)
    else if (unresolved.length > 1) return undefined
  } else {
    for (const id of positive) {
      if (!required.has(id) && !fromConditionIncludes(id, predecessorId)) literals.push(`+${id}`)
    }
  }
  for (const id of conditionsOf(entry.none).filter(Boolean)) {
    if (!excluded.has(id)) literals.push(`-${id}`)
  }
  return literals.length === 0 ? null : literals.length === 1 ? literals[0] : undefined
}

const sourceEvidenceIsGuaranteed = (entries, option, predecessorId) => {
  if (entries.some((entry) => sourceEvidenceIsEntailed(entry, option, predecessorId))) return true
  const literals = new Set(entries
    .map((entry) => unresolvedEvidenceLiteral(entry, option, predecessorId))
    .filter((literal) => typeof literal === 'string'))
  return [...literals].some((literal) => {
    const opposite = literal.startsWith('+') ? `-${literal.slice(1)}` : `+${literal.slice(1)}`
    return literals.has(opposite)
  })
}

assert.equal(sourceEvidenceIsEntailed(
  { cond: 'flag:route-known', line: [{ id: 'road' }] },
  { requires: 'flag:route-known' },
  null,
), true, 'grounded-route evidence no longer accepts an entailed condition')
assert.equal(sourceEvidenceIsEntailed(
  { cond: 'flag:route-known', line: [{ id: 'road' }] },
  {},
  null,
), false, 'grounded-route evidence accepts a condition the route choice does not entail')
assert.equal(sourceEvidenceIsEntailed(
  { cond: 'from:crossroads', line: [{ id: 'road' }] },
  {},
  'crossroads',
), true, 'grounded-route evidence no longer follows the actual predecessor')
assert.equal(sourceEvidenceIsGuaranteed([
  { cond: 'fact:restored', line: [{ id: 'well' }] },
  { cond: 'fact:restored', negate: true, line: [{ id: 'well' }] },
], {}, null), true, 'complementary route-evidence variants no longer prove continuous visibility')
const ambientEvidenceFixture = [{ id: 'road' }]
ambientEvidenceFixture.scenePriority = 'ambient'
assert.equal(sourceEvidenceIsEntailed(ambientEvidenceFixture, {}, null), false,
  'optional ambient prose can establish a required route affordance')

for (const [nodeId, node] of Object.entries(STORY)) {
  for (const option of node.options || []) {
    if (option.confuser) continue
    const ids = idsOf(lineOf(option.text))
    const asksLocation = ids.includes('ku')
      || (ids.includes('a_q') && ids.includes('larg'))
      || (ids.includes('quhem') && ids.includes('nga') && ids.includes('je'))
    if (asksLocation) locationQuestionOptions.push({ nodeId, option, ids })
  }
}

for (const candidate of locationQuestionOptions) {
  const reviews = LOCATION_QUESTION_REVIEWS.filter((review) =>
    review.nodeId === candidate.nodeId && includesEvery(candidate.ids, review.cueIds))
  assert.equal(reviews.length, 1,
    `${candidate.nodeId} “${albanianTextOf(lineOf(candidate.option.text))}”: location question needs one grounded-route or non-navigation review`)
  const review = reviews[0]
  if (review.disposition === 'grounded-route') {
    assert.ok(Object.values(GROUNDED_DIRECTION_CONTRACTS).some((entry) => entry.id === review.contractId),
      `${candidate.nodeId}: missing grounded route ${review.contractId}`)
  } else {
    assert.ok(review.reason?.trim(), `${candidate.nodeId}: non-navigation location review needs a reason`)
  }
}

for (const review of LOCATION_QUESTION_REVIEWS) {
  assert.ok(locationQuestionOptions.some((candidate) =>
    candidate.nodeId === review.nodeId && includesEvery(candidate.ids, review.cueIds)),
  `${review.nodeId}/${review.cueIds.join('+')}: stale location-question review`)
}

for (const directions of Object.values(GROUNDED_DIRECTION_CONTRACTS)) {
  for (const question of directions.questions) {
    const options = realOptions(question.nodeId).filter((option) =>
      includesEvery(idsOf(lineOf(option.text)), question.cueIds))
    assert.equal(options.length, 1, `${directions.id}: ${question.nodeId} needs one reviewed direction question`)
    assert.ok(options[0].effects?.some((effect) =>
      effect.type === 'flag'
      && effect.id === rawConditionId(directions.askedCondition)
      && effect.value !== false),
    `${directions.id}: asking at ${question.nodeId} does not persist the information gap`)
  }

  const answerEntries = STORY[directions.responseNodeId].text.filter((entry) => {
    const ids = idsOf(lineOf(entry))
    return conditionsOf(entry?.cond).includes(directions.responseCondition)
      && includesEvery(ids, directions.responseCueIds)
  })
  assert.ok(answerEntries.length > 0,
    `${directions.id}: response does not supply reviewed route cues ${directions.responseCueIds.join(', ')}`)
  const answerCueIds = new Set(answerEntries.flatMap((entry) => idsOf(lineOf(entry))))

  const exits = realOptions(directions.responseNodeId).filter((option) => option.to === directions.exitTo)
  assert.ok(exits.length > 0, `${directions.id}: answer has no explicit conversation exit to ${directions.exitTo}`)
  assert.equal(realOptions(directions.responseNodeId).some((option) =>
    option.to === directions.destinationNodeId), false,
  `${directions.id}: answer still exposes a direct destination shortcut`)
  assert.equal(STORY[directions.responseNodeId].options.some((option) =>
    option.confuser && conditionsOf(option.requires).includes(directions.responseCondition)), false,
  `${directions.id}: response still turns a plausible direction into a heart-taking confuser`)

  let routeNodeId = directions.exitTo
  let predecessorId = directions.responseNodeId
  for (const step of directions.route) {
    assert.equal(step.nodeId, routeNodeId, `${directions.id}: route is discontinuous at ${step.nodeId}`)
    assert.ok(step.sourceEvidenceIds.length > 0,
      `${directions.id}: ${step.nodeId}->${step.to} has no reviewed visible source evidence`)
    assert.equal(new Set(step.sourceEvidenceIds).size, step.sourceEvidenceIds.length,
      `${directions.id}: ${step.nodeId}->${step.to} repeats a source-evidence id`)
    const options = realOptions(step.nodeId).filter((option) =>
      option.to === step.to && includesEvery(idsOf(lineOf(option.text)), step.cueIds))
    assert.equal(options.length, 1,
      `${directions.id}: ${step.nodeId}->${step.to} must expose exactly one physical cue choice`)
    assert.ok(step.cueIds.every((id) => answerCueIds.has(id)),
      `${directions.id}: route step ${step.nodeId}->${step.to} is not recoverable from the answer`)
    for (const required of step.requires) {
      assert.ok(conditionsOf(options[0].requires).includes(required),
        `${directions.id}: ${step.nodeId}->${step.to} bypasses ${required}`)
    }
    const undeclaredRequirements = conditionsOf(options[0].requires)
      .filter((required) => !step.requires.includes(required))
    assert.deepEqual(undeclaredRequirements, [],
      `${directions.id}: ${step.nodeId}->${step.to} has route requirements missing from the grounded-direction contract`)
    const evidenceEntries = STORY[step.nodeId].text.filter((entry) =>
      includesEvery(idsOf(lineOf(entry)), step.sourceEvidenceIds))
    assert.ok(sourceEvidenceIsGuaranteed(evidenceEntries, options[0], predecessorId),
      `${directions.id}: ${step.nodeId}->${step.to} presupposes ${step.sourceEvidenceIds.join('+')} without visible, condition-entailed scene evidence`)
    for (const wrongTurn of step.wrongTurns) {
      const wrongOptions = realOptions(wrongTurn.nodeId).filter((option) =>
        option.to === wrongTurn.to && includesEvery(idsOf(lineOf(option.text)), wrongTurn.cueIds))
      assert.equal(wrongOptions.length, 1,
        `${directions.id}: plausible ${wrongTurn.cueIds.join('+')} turn must move to ${wrongTurn.to}`)
      assert.notEqual(PLACE_OF[wrongTurn.nodeId], PLACE_OF[wrongTurn.to],
        `${directions.id}: plausible wrong turn does not physically go anywhere`)
    }
    predecessorId = step.nodeId
    routeNodeId = step.to
  }
  assert.equal(routeNodeId, directions.destinationNodeId,
    `${directions.id}: reviewed route does not reach ${directions.destinationNodeId}`)

  if (directions.route.length > 1) {
    assert.equal(realOptions(directions.exitTo).some((option) =>
      option.to === directions.destinationNodeId), false,
    `${directions.id}: free-roam exit still skips the reviewed route`)
  }
}

console.log(`Conversation hub audit passed: ${Object.keys(CONVERSATION_HUBS).length} hub(s); ` +
  `${LEGACY_SUPPLIED_REPLY_BACKLOG.length} legacy supplied replies remain explicitly queued; ` +
  `${Object.keys(GROUNDED_DIRECTION_CONTRACTS).length} grounded direction route(s) verified.`)
