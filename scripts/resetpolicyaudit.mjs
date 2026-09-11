// Release gate for the boundary between the persistent learner and a single
// story attempt. A death/new-run may rebuild the world, but it must not erase
// vocabulary or learning evidence, leave a half-finished Train question open,
// or preserve spendable tokens unsupported by correct practice.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { START_NODE, STORY } from '../src/game/content.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { START_HEARTS, newRun, normalizeSavedState, reducer } from '../src/game/gameState.js'
import {
  STORY_RUN_RESET_POLICY,
  clearStoryRunTrainingSession,
  storyRunCarryover,
} from '../src/game/resetPolicy.js'

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push({ name, ok: true })
    console.log(`✓ ${name}`)
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
    console.log(`✗ ${name}: ${error.message}`)
  }
}

const clone = (value) => JSON.parse(JSON.stringify(value))
const phrase = EVERYDAY_PHRASE_DRILLS.find(({ id }) => id === 'going-village')
assert.ok(phrase, 'reset audit fixture lost the going-village phrase')

const profileFixture = () => {
  let state = newRun()
  state = reducer(state, { type: 'DEBUG_GRANT', ids: phrase.requires })
  state = normalizeSavedState({
    ...state,
    mana: { ...state.mana, fshat: 2 },
    practiced: { ...state.practiced, fshat: 7 },
    formPracticed: { 'fshat::fshati': 2 },
    phrasePracticed: { [phrase.id]: 4 },
    phraseMistakes: { [phrase.id]: 2 },
    phraseProductionProgress: {
      [phrase.id]: {
        clozeWins: 2,
        clozeProofs: ['shko', 'fshat'],
        arrangeWins: 1,
        spellingProofs: ['shko', 'fshat'],
        independentWins: 1,
        strictWins: 1,
        dueAfterRound: 41,
        reviewGap: 8,
        lastAttemptKey: 'audit:retained-phrase',
        lastAttemptRound: 31,
        remediation: {
          stage: 2,
          focusId: 'fshat',
          reason: 'word-form',
          dueAfterRound: 35,
        },
      },
    },
    phraseListeningMastery: { [phrase.id]: 1 },
    phraseMatchingMastery: { [phrase.id]: 1 },
    trainRound: 32,
    cefrEvidenceVersion: 1,
    cefrEvidence: [{
      level: 'A1',
      mode: 'spokenProduction',
      taskFamily: 'audit-family',
      taskId: 'audit-task',
      variantId: 'audit-variant',
      windowId: 'audit-window',
      heldOut: true,
      rubric: {
        taskFulfilment: 2,
        comprehensibility: 2,
        range: 2,
        control: 2,
        cohesion: 2,
      },
      pronunciationPass: true,
      recordingCaptured: true,
      attempt: 1,
    }],
    cefrPreparationVersion: 1,
    cefrPreparationPasses: { 'a1-audit-mechanic': ['a1-audit-activity'] },
    cefrPreparationAttempts: { 'a1-audit-activity': 2 },
  }, newRun())
  return state
}

const resettableAttemptFixture = (profile) => ({
  ...profile,
  nodeId: Object.entries(STORY).find(([, node]) => node.end === 'bad')[0],
  ended: 'bad',
  hearts: 0,
  view: 'practice',
  practiceTarget: { kind: 'option', nodeId: START_NODE, optionIndex: 0 },
  trainLastWords: ['po', 'shkoj', 'në', 'fshat'],
  trainLastQuestionKey: 'audit:open-question',
  // The blocking correction modal must be acknowledged before any navigation,
  // including reset. Its clearing behavior is exercised directly above.
  pendingHeartConsequence: null,
  inventory: { lek: 800, buke: 1 },
  flags: { temporary: true },
  observations: { 'audit-look': true },
  interactions: { 'audit-talk': { run: { uses: 1, lastAtClock: 7 } } },
  rendezvous: { audit: { id: 'audit', dueClock: 12 } },
  quests: { audit: { status: 'active' } },
  healedAt: { 2: true },
  dismissedTests: { 'audit-deed': true },
  fixtures: { audit: 4 },
  npcStarted: { audit: 5 },
  pendingTest: 'audit-deed',
  timePassage: { id: 'audit-passage' },
  pendingEmbodiment: { taleId: 'audit-tale' },
  visited: { fshatiSheshi: true },
  heard: { mali: true },
  earned: { 'audit-earned': true },
  eligible: { 'audit-eligible': true },
  attempts: { 'audit-attempt': 3 },
  worldFacts: { rainReturned: { atClock: 20, source: 'audit' } },
  knowledge: { 'npcName:elira': { atClock: 2, source: 'audit' } },
  npcPortraitsSeen: { bari: true },
  activeNpcPortraits: { nodeId: 'bariu', npcIds: ['bari'] },
  debug: true,
})

check('reset policy categories are explicit, disjoint, and consumed by their helpers', () => {
  const groups = Object.values(STORY_RUN_RESET_POLICY)
  const fields = groups.flat()
  assert.equal(new Set(fields).size, fields.length, 'a reset field belongs to more than one policy category')
  assert.ok(STORY_RUN_RESET_POLICY.learnerProfile.includes('discovered'))
  assert.ok(STORY_RUN_RESET_POLICY.learnerProfile.includes('cefrEvidence'))
  assert.ok(STORY_RUN_RESET_POLICY.durableChronicle.includes('npcPortraitsSeen'))
  assert.ok(STORY_RUN_RESET_POLICY.clearTrainingSession.includes('pendingHeartConsequence'))

  const source = Object.fromEntries(fields.map((field, index) => [field, { index }]))
  assert.deepEqual(Object.keys(storyRunCarryover(source)).sort(), [
    ...STORY_RUN_RESET_POLICY.learnerProfile,
    ...STORY_RUN_RESET_POLICY.durableChronicle,
    ...STORY_RUN_RESET_POLICY.preferences,
  ].sort())
  const cleared = clearStoryRunTrainingSession(source)
  assert.equal(cleared.practiceTarget, null)
  assert.deepEqual(cleared.trainLastWords, [])
  assert.equal(cleared.trainLastQuestionKey, null)
  assert.equal(cleared.pendingHeartConsequence, null)
})

check('RESET rebuilds the run while preserving every declared learner and chronicle field', () => {
  const before = resettableAttemptFixture(profileFixture())
  const after = reducer(before, { type: 'RESET' })

  for (const field of [
    ...STORY_RUN_RESET_POLICY.learnerProfile,
    ...STORY_RUN_RESET_POLICY.durableChronicle,
    ...STORY_RUN_RESET_POLICY.preferences,
  ]) assert.deepEqual(after[field], before[field], `${field}: did not survive story restart`)

  assert.equal(after.nodeId, START_NODE)
  assert.equal(after.hearts, START_HEARTS)
  assert.equal(after.view, 'story')
  assert.equal(after.ended, null)
  for (const field of [
    'inventory', 'flags', 'observations', 'interactions', 'rendezvous', 'quests',
    'healedAt', 'dismissedTests', 'fixtures', 'npcStarted',
  ]) assert.deepEqual(after[field], {}, `${field}: leaked across story restart`)
  for (const field of [
    'pendingTest', 'timePassage', 'pendingEmbodiment', 'practiceTarget',
    'trainLastQuestionKey', 'pendingHeartConsequence', 'activeNpcPortraits',
  ]) assert.equal(after[field], null, `${field}: transient state survived restart`)
  assert.deepEqual(after.trainLastWords, [])
  assert.deepEqual(reducer(after, { type: 'RESET' }), after, 'clean restart is not idempotent')
})

check('bad-ending CONTINUE and explicit RESET share the exact restart constructor', () => {
  const before = resettableAttemptFixture(profileFixture())
  assert.deepEqual(
    reducer(before, { type: 'CONTINUE' }),
    reducer(before, { type: 'RESET' }),
  )
  const source = readFileSync(new URL('../src/game/gameState.js', import.meta.url), 'utf8')
  const continueBlock = source.slice(source.indexOf("case 'CONTINUE':"), source.indexOf("case 'RETURN_TO_WORLD':"))
  const resetBlock = source.slice(source.indexOf("case 'RESET':"), source.indexOf('default:', source.indexOf("case 'RESET':")))
  assert.match(continueBlock, /return restartStoryRun\(state\)/)
  assert.match(resetBlock, /return restartStoryRun\(state\)/)
})

check('legacy reloads recover saved vocabulary from each durable evidence track', () => {
  const learned = profileFixture()
  const fromWord = normalizeSavedState({
    ...newRun(),
    discovered: {},
    wordProgressVersion: learned.wordProgressVersion,
    wordProgress: { fshat: learned.wordProgress.fshat },
  }, newRun())
  assert.equal(fromWord.discovered.fshat, true, 'word-stage proof did not recover its saved word')

  const fromForm = normalizeSavedState({
    ...newRun(),
    discovered: {},
    formPracticed: { 'shko::shkoj': 2 },
  }, newRun())
  assert.equal(fromForm.discovered.shko, true, 'reviewed-form proof did not recover its saved word')

  const fromPhrase = normalizeSavedState({
    ...newRun(),
    discovered: {},
    phrasePracticed: { [phrase.id]: 1 },
  }, newRun())
  for (const id of phrase.requires) {
    assert.equal(fromPhrase.discovered[id], true, `${id}: phrase proof did not recover required vocabulary`)
  }
})

check('migration and restart never preserve tokens beyond monotonic correct evidence', () => {
  const repaired = normalizeSavedState({
    ...newRun(),
    discovered: { fshat: true, shko: true },
    mana: { fshat: 9, shko: 4, invented: 8 },
    practiced: { fshat: 3 },
  }, newRun())
  assert.equal(repaired.mana.fshat, 3)
  assert.equal(repaired.mana.shko, undefined)
  assert.equal(repaired.mana.invented, undefined)
  assert.equal(repaired.discovered.fshat, true)

  const restarted = reducer({ ...repaired, hearts: 0 }, { type: 'RESET' })
  assert.deepEqual(restarted.mana, repaired.mana)
  for (const [id, count] of Object.entries(restarted.mana)) {
    assert.ok(count <= (restarted.practiced[id] || 0), `${id}: token balance outlived its evidence`)
  }
})

check('a genuinely new learner begins without inherited run or learning state', () => {
  const fresh = newRun()
  for (const field of STORY_RUN_RESET_POLICY.learnerProfile) {
    if (field.endsWith('Version')) assert.ok(Number.isSafeInteger(fresh[field]), `${field}: missing version`)
    else if (field === 'trainRound') assert.equal(fresh[field], 0)
    else if (field === 'cefrEvidence') assert.deepEqual(fresh[field], [])
    else assert.deepEqual(fresh[field], {}, `${field}: new learner inherited evidence`)
  }
  assert.equal(fresh.nodeId, START_NODE)
  assert.deepEqual(fresh.inventory, {})
  assert.equal(fresh.hearts, START_HEARTS)
})

const failed = checks.filter(({ ok }) => !ok)
if (failed.length) {
  console.error(`\n${failed.length} reset-policy audit check(s) failed.`)
  process.exit(1)
}

console.log(`\nReset-policy audit passed: ${checks.length}/${checks.length}.`)
