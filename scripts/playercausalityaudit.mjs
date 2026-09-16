// Player actions must lead to an explained consequence at the place where that
// consequence can physically happen. Lore must arrive through an identifiable
// speaker or visible evidence, never an unattributed narrative "they say".

import assert from 'node:assert/strict'
import { STORY, lineOf } from '../src/game/content.js'
import { englishReadingOf } from '../src/game/language.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import { NODE_REGION } from '../src/game/regions.js'

const realOptions = (nodeId) => (STORY[nodeId]?.options || [])
  .filter((option) => !option.confuser && option.to && STORY[option.to])
const idsOf = (line) => new Set((line || []).filter((token) => token.id).map((token) => token.id))
const conditionsOf = (entry) => [].concat(entry?.cond || [])
const arrivalsFrom = (node, sourceId) => (node.text || []).filter((entry) =>
  !entry?.negate && conditionsOf(entry).some((condition) =>
    String(condition).startsWith('from:') && String(condition).slice(5).split('|').includes(sourceId)))
const optionByFirstWord = (nodeId, wordId) => realOptions(nodeId)
  .find((option) => option.text?.find((token) => token.id)?.id === wordId)

// Anonymous folklore narration has no place in playable story prose. A plural
// saying is valid only when its subject (people, children, voices, etc.) occurs
// before the verb on that line.
const anonymousSayings = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [index, entry] of (node.text || []).entries()) {
    const line = lineOf(entry)
    const first = line?.find((token) => token.id)
    if (first?.id === 'thote' && first.al.toLocaleLowerCase('sq') === 'thonë') {
      anonymousSayings.push(`${nodeId}.text[${index}]: ${line.map((token) => token.al || token.en).join(' ')}`)
    }
  }
}
assert.deepEqual(anonymousSayings, [], `unattributed "they say" lines:\n${anonymousSayings.join('\n')}`)

// The forest warning is discoverable from more than one actual person. Both
// conversations must teach the same durable facts used by the witch scene.
const forestKnowledge = new Set(['shtrigaSaltFire', 'oraCompanion'])
const loreProviders = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const option of realOptions(nodeId)) {
    if (option.conversationHub?.questionId !== 'forestLore') continue
    const learned = new Set((option.effects || [])
      .filter((effect) => effect.type === 'learn')
      .map((effect) => effect.id))
    assert.deepEqual(learned, forestKnowledge, `${nodeId}: forest-lore question does not teach both reviewed facts`)
    const response = node.text.find((entry) =>
      entry.conversationHub?.kind === 'response' && entry.conversationHub?.questionId === 'forestLore')
    assert.ok(response, `${nodeId}: forest-lore question has no sourced response`)
    assert.notEqual(lineOf(response)?.find((token) => token.id)?.id, 'thote', `${nodeId}: response still starts with anonymous speech`)
    loreProviders.push(nodeId)
  }
}
assert.ok(new Set(loreProviders).size >= 2, 'forest lore is not available from at least two NPC conversations')

// The dark Ora encounter is an underworld scene. No forest fight, failed
// riddle, or ordinary animal interaction may use it as a generic failure sink.
const humburIncoming = []
for (const [nodeId] of Object.entries(STORY)) {
  for (const option of realOptions(nodeId)) if (option.to === 'humbur') humburIncoming.push(nodeId)
}
assert.equal(NODE_REGION.humbur, 'underworld', 'humbur is not assigned to the underworld')
assert.ok(humburIncoming.length > 0, 'humbur has no playable entrances')
assert.deepEqual(
  humburIncoming.filter((nodeId) => NODE_REGION[nodeId] !== 'underworld'),
  [],
  `surface scenes still teleport to the underworld lost scene: ${humburIncoming.join(', ')}`,
)

// Every shared forest-setback entrance must have route-specific consequence
// prose. Adding a new incoming edge without authoring its cause fails closed.
const forestSetbackIncoming = []
for (const [nodeId] of Object.entries(STORY)) {
  for (const option of realOptions(nodeId)) if (option.to === 'pylliHumbur') forestSetbackIncoming.push(nodeId)
}
for (const sourceId of forestSetbackIncoming) {
  assert.ok(arrivalsFrom(STORY.pylliHumbur, sourceId).length > 0,
    `${sourceId} -> pylliHumbur has no route-specific consequence prose`)
}

// Regression fixtures for the reported paths: escaping the hungry wolf leaves
// the clearing; fighting/fleeing the witch resolves visibly in the forest.
const wolfEscape = optionByFirstWord('gjumi', 'zgjohu')
assert.equal(wolfEscape?.to, 'pylliLoop', 'waking and fleeing the wolf does not enter the deep forest')
assert.equal(wolfEscape?.durationHours, 0, 'the immediate wolf escape advances hidden travel time')
assert.notEqual(PLACE_OF.gjumi, PLACE_OF[wolfEscape.to], 'the wolf escape leaves the player at the sleeping place')
const wolfArrival = arrivalsFrom(STORY.pylliLoop, 'gjumi')
assert.equal(wolfArrival.length, 1, 'the wolf escape lacks one exact arrival consequence')
assert.ok(['ujk', 'ik'].every((id) => idsOf(lineOf(wolfArrival[0])).has(id)), 'wolf escape prose does not name both threat and response')

const witchFight = optionByFirstWord('shtrigaNate', 'lufto')
const witchFlee = optionByFirstWord('shtrigaNate', 'ik')
assert.equal(witchFight?.to, 'shtrigaLufta', 'fighting the witch has no dedicated consequence')
assert.equal(witchFlee?.to, 'pylliHumbur', 'fleeing the witch does not enter the forest setback')
for (const option of [witchFight, witchFlee]) {
  assert.equal(option?.durationHours, 0, 'an immediate witch response advances hidden travel time')
  assert.equal(NODE_REGION[option?.to], 'forest', 'a witch response leaves the forest')
  assert.notEqual(option?.to, 'humbur', 'a witch response still jumps to generic underworld darkness')
}
assert.ok(idsOf(lineOf(STORY.shtrigaLufta.text[0])).has('shtrige'), 'witch-fight consequence does not name the witch')

// Other broad-audit discoveries exercise the same rule without being copies of
// the screenshots: a wrong answer stays at the bridge, and a wary horse leaves
// the player on the mountain.
const wrongRiddleAnswers = realOptions('riddle1').filter((option) => option.to !== 'riddleFund')
assert.equal(wrongRiddleAnswers.length, 2, 'riddle wrong-answer fixtures changed unexpectedly')
for (const option of wrongRiddleAnswers) {
  assert.equal(option.to, 'riddleGabim', 'wrong riddle answer teleports away from its correction')
  assert.equal(option.durationHours, 0, 'wrong riddle answer advances hidden travel time')
  assert.equal(PLACE_OF.riddle1, PLACE_OF[option.to], 'wrong riddle answer changes physical place')
}
assert.ok(STORY.riddleGabim.text.some((entry) => idsOf(lineOf(entry)).has('breshka')), 'riddle correction omits the answer')

const takeHorse = optionByFirstWord('kali1', 'merr')
assert.equal(takeHorse?.to, 'kaliIkur', 'taking the wary horse still uses a generic failure destination')
assert.equal(takeHorse?.durationHours, 0, 'taking the horse advances hidden travel time')
assert.equal(PLACE_OF.kali1, PLACE_OF[takeHorse.to], 'failed horse interaction changes physical place')
assert.ok(STORY.kaliIkur.text.some((entry) => {
  const ids = idsOf(lineOf(entry)); return ids.has('kale') && ids.has('ik')
}), 'horse refusal does not visibly explain what happened')

// A self-loop may update inventory, time, or a conversation at one place. It
// must not replay unconditional arrival/movement prose as if the player had
// just travelled there again.
const repeatedArrivals = []
const arrivalReading = /^(?:You |At last you |Finally you )(?:walk|enter|come|return|arrive|flee|climb)\b/i
for (const [nodeId, node] of Object.entries(STORY)) {
  if (!realOptions(nodeId).some((option) => option.to === nodeId)) continue
  for (const [index, entry] of (node.text || []).entries()) {
    const reading = englishReadingOf(lineOf(entry) || [])
    const routeGated = conditionsOf(entry).some((condition) => String(condition).startsWith('from:'))
    if (arrivalReading.test(reading) && !routeGated) repeatedArrivals.push(`${nodeId}.text[${index}]: ${reading}`)
  }
}
assert.deepEqual(repeatedArrivals, [], `self-loop scenes replay arrival prose:\n${repeatedArrivals.join('\n')}`)

// Choice outcomes stay after the choice. These independent fixtures guard the
// generalized pre-narration error found by the broad audit.
const breshkaBeforeChoice = STORY.breshka1.text.flatMap((entry) => [...idsOf(lineOf(entry))])
assert.equal(breshkaBeforeChoice.includes('fsheh'), false, 'tortoise scene hides the meat before the player chooses')
assert.equal(STORY.skender2.text.some((entry) => idsOf(lineOf(entry)).has('zjarr')), false,
  'Skanderbeg scene lights the candles before the player chooses')
assert.equal(STORY.kulshLufte2.text.some((entry) => idsOf(lineOf(entry)).has('zjarr') || idsOf(lineOf(entry)).has('bie')), false,
  'Kulshedra scene narrates the finishing action before the player chooses')

console.log(`✅ player causality audited: ${humburIncoming.length} underworld entrances, ${forestSetbackIncoming.length} sourced forest setbacks, ${new Set(loreProviders).size} NPC lore providers`)
