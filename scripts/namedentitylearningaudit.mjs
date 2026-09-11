// Proper names are pronounceable world knowledge, not purchasable vocabulary.
// This gate enumerates the central classification and attacks every reducer
// path that could otherwise turn a person/place into Train evidence.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DICT, STORY } from '../src/game/content.js'
import { NOUN_PARADIGM_BACKLOG } from '../src/game/nounRegistry.js'
import {
  LEXICAL_TRAINABILITY_KIND,
  NON_TRAINABLE_NAMED_ENTITY_IDS,
  PERSONAL_NAME_IDS,
  PLACE_NAME_IDS,
  REVIEWED_LEXICAL_TRAINABILITY,
  TRAINABLE_LEXICAL_TITLE_IDS,
  isNamedEntitySense,
  isTrainableSense,
  lexicalTrainability,
} from '../src/game/lexicalTrainability.js'
import {
  canSpeak,
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
  trainablePhraseSenses,
} from '../src/game/gameState.js'
import { npcIdentityKnowledgeId } from '../src/game/npcIdentity.js'
import { formsUnlocked } from '../src/game/formInventory.js'
import { completedWordProgress } from '../src/game/wordProgression.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { phraseProductionFocusIds } from '../src/game/phraseFocus.js'
import { phraseRewardIds } from '../src/game/phrasePractice.js'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')
const unique = (values) => new Set(values)
const personal = unique(PERSONAL_NAME_IDS)
const places = unique(PLACE_NAME_IDS)
const titles = unique(TRAINABLE_LEXICAL_TITLE_IDS)
const named = unique(NON_TRAINABLE_NAMED_ENTITY_IDS)
const expectedNamed = unique([...personal, ...places])

assert.equal(personal.size, PERSONAL_NAME_IDS.length, 'personal-name classification contains duplicates')
assert.equal(places.size, PLACE_NAME_IDS.length, 'place-name classification contains duplicates')
assert.equal(titles.size, TRAINABLE_LEXICAL_TITLE_IDS.length, 'lexical-title classification contains duplicates')
assert.deepEqual([...personal].filter((id) => places.has(id) || titles.has(id)), [], 'personal names overlap another class')
assert.deepEqual([...places].filter((id) => titles.has(id)), [], 'place names overlap lexical titles')
assert.deepEqual([...named].sort(), [...expectedNamed].sort(), 'non-trainable set drifted from personal/place classes')

for (const [kind, ids] of [
  [LEXICAL_TRAINABILITY_KIND.PERSONAL_NAME, PERSONAL_NAME_IDS],
  [LEXICAL_TRAINABILITY_KIND.PLACE_NAME, PLACE_NAME_IDS],
  [LEXICAL_TRAINABILITY_KIND.LEXICAL_TITLE, TRAINABLE_LEXICAL_TITLE_IDS],
]) {
  for (const id of ids) {
    assert.ok(DICT[id], `${kind}: unknown dictionary id ${id}`)
    assert.equal(REVIEWED_LEXICAL_TRAINABILITY[id]?.kind, kind, `${id}: central classification drifted`)
    assert.equal(lexicalTrainability(id), REVIEWED_LEXICAL_TRAINABILITY[id], `${id}: classifier did not return registry metadata`)
    assert.ok(lexicalTrainability(id).reason.length >= 20, `${id}: classification has no useful debug reason`)
  }
}

// The older editorial bucket deliberately mixed names and meaning-bearing
// titles. Every member must now receive an explicit disposition. Mount Tomorr
// is also pinned because its completed paradigm must not imply trainability.
for (const id of NOUN_PARADIGM_BACKLOG.properNamesAndTitles) {
  assert.ok(REVIEWED_LEXICAL_TRAINABILITY[id], `${id}: old name/title candidate lacks an explicit disposition`)
}
assert.equal(lexicalTrainability('tomorr').kind, LEXICAL_TRAINABILITY_KIND.PLACE_NAME)
assert.equal(isTrainableSense('tomorr'), false, 'Mount Tomorr became vocabulary because it has reviewed forms')
assert.equal(lexicalTrainability('tomor').kind, LEXICAL_TRAINABILITY_KIND.PERSONAL_NAME,
  'the story’s personified Tomor identity was flattened into a place-name')

// A capitalized dictionary headword is never allowed to acquire an implicit
// default disposition. This catches a newly authored name before it leaks into
// Token or Train; meaning-bearing capitalized types belong in the title list.
for (const [id, entry] of Object.entries(DICT)) {
  if (/^\p{Lu}/u.test(entry.al)) {
    assert.ok(REVIEWED_LEXICAL_TRAINABILITY[id], `${id}/${entry.al}: capitalized sense is not explicitly classified`)
  }
}

for (const id of NON_TRAINABLE_NAMED_ENTITY_IDS) {
  const policy = lexicalTrainability(id)
  assert.equal(policy.trainable, false, `${id}: personal/place name is trainable`)
  assert.equal(isNamedEntitySense(id), true, `${id}: name is not recognized as a named entity`)
  assert.equal(isTrainableSense(id), false, `${id}: name passed the Train filter`)
}
for (const id of TRAINABLE_LEXICAL_TITLE_IDS) {
  const policy = lexicalTrainability(id)
  assert.equal(policy.trainable, true, `${id}: lexical title was excluded from Train`)
  assert.equal(isNamedEntitySense(id), false, `${id}: lexical title was treated as an opaque name`)
}
for (const id of ['flocka', 'bukura', 'verbti', 'ora']) {
  assert.equal(lexicalTrainability(id).kind, LEXICAL_TRAINABILITY_KIND.LEXICAL_TITLE,
    `${id}: meaning-bearing lore title/type lost its lexical classification`)
}

// Blank saves and hostile direct actions cannot create any named-entity
// vocabulary state. Use crafted discovered state as well so reducer guards do
// not rely on Token having behaved correctly.
for (const id of NON_TRAINABLE_NAMED_ENTITY_IDS) {
  const fresh = newRun()
  assert.strictEqual(reducer(fresh, { type: 'DISCOVER', id }), fresh, `${id}: DISCOVER created vocabulary`)

  const forged = {
    ...fresh,
    discovered: { ...fresh.discovered, [id]: true },
    wordProgress: { ...fresh.wordProgress, [id]: completedWordProgress(0) },
  }
  assert.strictEqual(reducer(forged, {
    type: 'PRACTICE_CORRECT', id, questionKey: `${id}:forged-normal`, wordKeys: [DICT[id].al],
  }), forged, `${id}: generic practice awarded a named entity`)
  assert.strictEqual(reducer(forged, {
    type: 'PRACTICE_WORD_RESULT', correct: true, id, tier: 0, mode: 'choice', direction: 'al2en',
    questionKey: `${id}:forged-word`, wordKeys: [DICT[id].al],
  }), forged, `${id}: word progression awarded a named entity`)
  assert.strictEqual(reducer(forged, {
    type: 'PRACTICE_FORM_CORRECT', id, formSurface: DICT[id].al,
    questionKey: `${id}:forged-form`, wordKeys: [DICT[id].al],
  }), forged, `${id}: form progression awarded a named entity`)
  assert.strictEqual(reducer(forged, {
    type: 'PRACTICE_WRONG', formId: id, formSurface: DICT[id].al,
    questionKey: `${id}:forged-form-wrong`, wordKeys: [DICT[id].al],
  }), forged, `${id}: named-entity form event entered the practice reducer`)
  assert.strictEqual(reducer(forged, {
    type: 'PRACTICE_PHRASE_RESULT', correct: true, phraseIds: ['going-village'], rewardIds: [id],
    skill: 'production', tier: 0, mode: 'cloze', typeScope: 'word', focusId: 'fshat',
    questionKey: `${id}:forged-phrase`, wordKeys: ['po', 'shkoj', 'në', 'fshat'],
  }), forged, `${id}: phrase result awarded a named entity`)

  const debugged = reducer(fresh, { type: 'DEBUG_GRANT', ids: [id] })
  assert.equal(debugged.discovered[id], undefined, `${id}: debug grant discovered a named entity`)
  assert.equal(debugged.mana[id], undefined, `${id}: debug grant created named-entity tokens`)
  assert.equal(debugged.practiced[id], undefined, `${id}: debug grant created named-entity practice`)
  assert.equal(debugged.wordProgress[id], undefined, `${id}: debug grant created named-entity progression`)

  assert.equal(buildWordQuestion({
    discoveredIds: [id], mana: {}, wordProgress: {}, currentRound: 0, rng: () => 0,
  }), null, `${id}: direct word builder scheduled a named entity`)
  assert.equal(formsUnlocked({
    practiced: { [id]: 999 }, wordProgress: { [id]: completedWordProgress(0) },
  }, id), false, `${id}: named entity unlocked form practice`)
}

// Old saves are cleaned rather than treating historical UI exposure as proof.
const base = newRun()
const dirtyNames = Object.fromEntries(NON_TRAINABLE_NAMED_ENTITY_IDS.map((id) => [id, true]))
const dirtyCounts = Object.fromEntries(NON_TRAINABLE_NAMED_ENTITY_IDS.map((id) => [id, 9]))
const dirtyProgress = Object.fromEntries(
  NON_TRAINABLE_NAMED_ENTITY_IDS.map((id) => [id, completedWordProgress(9)]),
)
const dirtyForms = Object.fromEntries(
  NON_TRAINABLE_NAMED_ENTITY_IDS.map((id) => [`${id}::${encodeURIComponent(DICT[id].al.toLocaleLowerCase('sq'))}`, 9]),
)
const eliraKnowledgeId = npcIdentityKnowledgeId('elira')
const restored = normalizeSavedState({
  ...base,
  discovered: { ...dirtyNames, dhe: true },
  mana: { ...dirtyCounts, dhe: 2 },
  practiced: { ...dirtyCounts, dhe: 3 },
  formPracticed: dirtyForms,
  wordProgressVersion: base.wordProgressVersion,
  wordProgress: dirtyProgress,
  knowledge: { [eliraKnowledgeId]: { atClock: 4, source: 'named-entity-audit' } },
}, newRun())
for (const id of NON_TRAINABLE_NAMED_ENTITY_IDS) {
  assert.equal(restored.discovered[id], undefined, `${id}: old discovered marker survived migration`)
  assert.equal(restored.mana[id], undefined, `${id}: old token balance survived migration`)
  assert.equal(restored.practiced[id], undefined, `${id}: old practice total survived migration`)
  assert.equal(restored.wordProgress[id], undefined, `${id}: old progression survived migration`)
  assert.ok(Object.keys(restored.formPracticed).every((key) => !key.startsWith(`${id}::`)),
    `${id}: old form evidence survived migration`)
}
assert.equal(restored.discovered.dhe, true, 'save cleanup erased ordinary vocabulary')
assert.equal(restored.mana.dhe, 2, 'save cleanup erased ordinary tokens')
assert.equal(restored.practiced.dhe, 3, 'save cleanup erased ordinary practice totals')
assert.ok(restored.knowledge[eliraKnowledgeId], 'lexical cleanup erased learned NPC identity')

// Names take no vocabulary token to say. The all-sense view remains available
// for content validation while the speech economy receives only trainable ids.
const mixedLine = [{ id: 'elira', al: 'Elira' }, { id: 'dhe', al: 'dhe' }]
assert.deepEqual(phraseSenses(mixedLine), ['elira', 'dhe'])
assert.deepEqual(trainablePhraseSenses(mixedLine), ['dhe'])
assert.deepEqual(canSpeak({ discovered: { dhe: true }, mana: { dhe: 1 } }, mixedLine), {
  ids: ['dhe'], allDiscovered: true, enoughMana: true, ok: true,
})

// Exercise the real Elira reveal: it records identity knowledge only. It does
// not synthesize discovered vocabulary or a queued name question.
const revealOption = STORY.eliraBreg.options.find((option) =>
  option.effects?.some((effect) => effect.type === 'learn' && effect.id === eliraKnowledgeId))
assert.ok(revealOption, 'Elira has no authored identity reveal')
const revealIds = trainablePhraseSenses(revealOption.text)
const revealState = {
  ...newRun(),
  nodeId: 'eliraBreg',
  discovered: Object.fromEntries(revealIds.map((id) => [id, true])),
  mana: Object.fromEntries(revealIds.map((id) => [id, 1])),
}
const revealed = reducer(revealState, {
  type: 'CHOOSE', option: revealOption, fromNodeId: revealState.nodeId, fromTurn: revealState.turn,
})
assert.notStrictEqual(revealed, revealState, 'canonical Elira reveal was rejected')
assert.ok(revealed.knowledge[eliraKnowledgeId], 'Elira reveal did not update world knowledge')
for (const field of ['discovered', 'mana', 'practiced', 'wordProgress']) {
  assert.equal(revealed[field].elira, undefined, `Elira reveal leaked into ${field}`)
}
assert.equal(buildWordQuestion({
  discoveredIds: ['elira'], mana: revealed.mana, wordProgress: revealed.wordProgress,
  currentRound: revealed.trainRound, rng: () => 0,
}), null, 'Elira reveal enqueued a name question')

// A practical phrase containing a place name remains learnable through its
// actual lexical material, but neither focus nor rewards include the place.
const fromGjakova = EVERYDAY_PHRASE_DRILLS.find((phrase) => phrase.id === 'from-gjakova')
assert.ok(fromGjakova?.requires.includes('gjakove'), 'named-place phrase fixture drifted')
assert.ok(!phraseProductionFocusIds(fromGjakova).includes('gjakove'), 'place name became a production focus')
assert.ok(!phraseRewardIds([fromGjakova]).includes('gjakove'), 'place name became a phrase reward')
assert.ok(phraseRewardIds([fromGjakova]).length > 0, 'filtering the place erased the phrase learning target')

// Token's proper-name branch must precede discovery and expose pronunciation,
// not the dashed discover/save interaction. The debug inspector must use the
// same policy reason rather than maintaining another name rule.
const tokenSource = read('src/components/Token.jsx')
const trainabilityBranch = tokenSource.indexOf('if (!trainability.trainable)')
const discoveryBranch = tokenSource.indexOf('const isKnown = discovered[token.id]')
assert.ok(trainabilityBranch >= 0 && trainabilityBranch < discoveryBranch,
  'Token checks discovery before the named-entity boundary')
const namedTokenBranch = tokenSource.slice(trainabilityBranch, discoveryBranch)
assert.match(namedTokenBranch, /className="token named-entity"/)
assert.match(namedTokenBranch, /Play pronunciation; not a vocabulary target/)
assert.doesNotMatch(namedTokenBranch, /onDiscover|token gloss|token-badge/)

const debugEvidenceSource = [
  read('src/game/debugLearningEvidence.js'),
  read('src/components/DebugLearningEvidenceInspector.jsx'),
].join('\n')
assert.match(debugEvidenceSource, /lexicalTrainability\(['"]elira['"]\)/,
  'debug evidence does not consume Elira’s central trainability classification')
assert.match(debugEvidenceSource, /\.reason/, 'debug evidence omits the non-trainable reason')

console.log(`✓ ${NON_TRAINABLE_NAMED_ENTITY_IDS.length} personal/place names stay world knowledge across Token, speech, saves, reducers and Train.`)
console.log(`✓ ${TRAINABLE_LEXICAL_TITLE_IDS.length} meaning-bearing titles/types remain explicit vocabulary.`)
