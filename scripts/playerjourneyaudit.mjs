// Player-journey release checks. These exercise the contracts a real first run
// and the anthology endgame depend on, rather than treating graph reachability
// as proof that the learning loop can actually be completed.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { STORY, START_NODE, WORLD_HUB, DICT, ENDINGS, lineOf } from '../src/game/content.js'
import { ACHIEVEMENTS } from '../src/game/achievements.js'
import { testFor } from '../src/game/comprehension.js'
import { englishReadingIssues } from '../src/game/language.js'
import {
  START_CLOCK,
  canChoose,
  canSpeak,
  phraseSenses,
  reducer,
} from '../src/game/gameState.js'
import { resolveRevealLine } from '../src/game/revealResolver.js'
import { isOptionRevealed } from '../src/game/revealVisibility.js'
import { storyReadingVisible } from '../src/components/storyMechanicsPresentation.js'

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push({ name, ok: true })
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
  }
}

const stateAt = (nodeId, extra = {}) => ({
  nodeId,
  clock: START_CLOCK,
  cameFrom: null,
  cameFromPhase: null,
  familiar: false,
  heard: {},
  rumor: false,
  trail: [],
  discovered: {},
  inventory: {},
  mana: {},
  practiced: {},
  visited: {},
  earned: {},
  eligible: {},
  attempts: {},
  dismissedTests: {},
  pendingTest: null,
  hearts: 3,
  healedAt: {},
  turn: 1,
  fixtures: {},
  npcStarted: {},
  worldFacts: {},
  view: 'story',
  ended: null,
  embodying: null,
  embodimentOriginNode: null,
  embodimentFocusNode: null,
  embodimentWorldNode: null,
  embodimentPaused: false,
  embodimentClock: null,
  embodimentInventorySnapshot: null,
  embodimentInventoryIsolated: null,
  embodimentHeartsSnapshot: null,
  embodimentArrivalSnapshot: null,
  pendingEmbodiment: null,
  timePassage: null,
  debug: false,
  loreFocus: null,
  ...extra,
})

const discover = (state, tokens) => {
  let next = state
  for (const id of phraseSenses(tokens)) next = reducer(next, { type: 'DISCOVER', id })
  return next
}

const trainOnce = (state, tokens) => {
  let next = state
  for (const id of phraseSenses(tokens)) {
    assert.equal(next.discovered[id], true, `practice was offered before '${id}' was discovered`)
    next = reducer(next, { type: 'PRACTICE_CORRECT', id })
  }
  return next
}

check('a fresh learner can discover, train and spend the opening bridge phrase', () => {
  const option = STORY[START_NODE].options.find((candidate) => candidate.to === 'fshatiLumi')
  assert.ok(option && !option.confuser && !option.reveal, 'the visible opening bridge choice disappeared')
  let state = stateAt(START_NODE)
  assert.equal(canSpeak(state, option.text).allDiscovered, false)
  state = discover(state, option.text)
  assert.equal(canSpeak(state, option.text).allDiscovered, true)
  assert.equal(canSpeak(state, option.text).enoughMana, false)
  state = trainOnce(state, option.text)
  assert.equal(canChoose(state, option), true)
  const before = Object.fromEntries(phraseSenses(option.text).map((id) => [id, state.mana[id]]))
  state = reducer(state, { type: 'CHOOSE', option, targetNode: STORY[option.to] })
  assert.equal(state.nodeId, 'fshatiLumi')
  assert.equal(state.visited.fshatiLumi, true)
  assert.equal(state.turn, 2)
  for (const id of Object.keys(before)) assert.equal(state.mana[id], before[id] - 1, `${id} was not spent once`)
})

check('the opening forest path unlocks from its signpost sentence, not a later forest mention', () => {
  const node = STORY[START_NODE]
  const option = node.options.find((candidate) => candidate.to === 'lendina')
  const resolution = resolveRevealLine(node.text.map(lineOf), option)
  assert.equal(resolution.status, 'selected')
  assert.equal(option.revealOccurrence, 1)
  const ids = phraseSenses(resolution.line)
  assert.ok(ids.includes('pyll') && ids.includes('rruge'), 'the chosen cue is not the forest-road signpost')
  let state = stateAt(START_NODE)
  assert.equal(ids.every((id) => state.discovered[id]), false)
  assert.equal(isOptionRevealed(state, option, node), false)
  state = discover(state, resolution.line)
  assert.equal(ids.every((id) => state.discovered[id]), true)
  assert.equal(isOptionRevealed(state, option, node), true)
  state = discover(state, option.text)
  state = trainOnce(state, option.text)
  assert.equal(canChoose(state, option), true)
  assert.equal(reducer(state, { type: 'CHOOSE', option, targetNode: STORY[option.to] }).nodeId, 'lendina')
})

check('training recommendations use the same reveal boundary as the Story screen', () => {
  const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
  const story = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.match(practice, /isOptionRevealed\(practiceState, opt, node\)/)
  assert.match(story, /isOptionRevealed\(storyState, opt, node, lines\)/)
})

check('a normal story journey cannot use the full English line as an answer key', () => {
  const story = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.equal(storyReadingVisible(0, false), false)
  assert.equal(storyReadingVisible('environment', false), false)
  assert.equal(storyReadingVisible(0, true), true, 'debug lost its editorial reading inspector')
  assert.match(story, /storyReadingVisible\(i, state\.debug\)/)
  assert.match(story, /const sceneSummary = state\.debug && lines\[0\]/)
  assert.match(story, /<Token/)
})

check('every ending has a mechanically valid way back into play', () => {
  assert.ok(STORY[WORLD_HUB], `world hub '${WORLD_HUB}' is missing`)
  for (const ending of ENDINGS) {
    const node = STORY[ending.id]
    assert.ok(node?.end, `${ending.id}: ending registry points to a non-ending`)
    if (node.end === 'bad') continue
    if (node.returnTo) assert.ok(STORY[node.returnTo], `${ending.id}: returnTo '${node.returnTo}' is missing`)
    const state = stateAt(ending.id, { ended: node.end, eligible: { [ending.id]: true } })
    const returned = reducer(state, { type: 'RETURN_TO_WORLD', to: node.returnTo })
    assert.equal(returned.ended, null, `${ending.id}: ending state did not clear`)
    assert.ok(STORY[returned.nodeId] && !STORY[returned.nodeId].end, `${ending.id}: returned to another ending`)
  }
})

check('every required anthology achievement has a real comprehension gate', () => {
  const endingIds = new Set(ENDINGS.filter((ending) => ending.kind !== 'bad').map((ending) => ending.id))
  const achievementEndingIds = new Set(ACHIEVEMENTS.filter((achievement) => achievement.kind !== 'area').map((achievement) => achievement.id))
  assert.deepEqual(achievementEndingIds, endingIds, 'non-bad endings and tale achievements differ')
  for (const achievement of ACHIEVEMENTS) {
    const questions = testFor(achievement, 0)
    assert.ok(Array.isArray(questions) && questions.length > 0, `${achievement.id}: no playable comprehension test`)
    for (const [index, question] of questions.entries()) {
      assert.ok(question.albanian && question.correct, `${achievement.id} question ${index + 1}: incomplete prompt/answer`)
      assert.ok(Array.isArray(question.options) && question.options.length >= 3, `${achievement.id} question ${index + 1}: no meaningful choices`)
      assert.equal(new Set(question.options).size, question.options.length, `${achievement.id} question ${index + 1}: duplicate choices`)
      assert.ok(question.options.includes(question.correct), `${achievement.id} question ${index + 1}: answer is not selectable`)
      for (const answer of question.options) {
        assert.deepEqual(
          englishReadingIssues(answer),
          [],
          `${achievement.id} question ${index + 1}: malformed English choice '${answer}'`,
        )
      }
    }
  }
})

check('bad fates are optional and cannot block anthology completion', () => {
  const fateIds = new Set(ENDINGS.filter((ending) => ending.kind === 'bad').map((ending) => ending.id))
  assert.ok(fateIds.size > 0)
  assert.equal(ACHIEVEMENTS.some((achievement) => fateIds.has(achievement.id)), false)
  const achievementsView = readFileSync(new URL('../src/components/AchievementsView.jsx', import.meta.url), 'utf8')
  assert.match(achievementsView, /anthologyComplete\s*=\s*got\s*===\s*ACHIEVEMENTS\.length/)
  assert.match(achievementsView, /Bad fates are\s*\n?\s*optional records/)
})

check('the first-turn guide explains every step the opening controls require', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  const guide = readFileSync(new URL('../src/components/GuideView.jsx', import.meta.url), 'utf8')
  assert.match(app, /state\.turn <= 2/)
  for (const phrase of ['Discover a word', 'Train it', 'Choose a path', 'Character tales', 'Finishing the anthology', 'Folklore and sources']) {
    assert.ok(guide.includes(phrase), `guide omits '${phrase}'`)
  }
})

check('the world map is reachable only during an explicit debug session', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  assert.match(app, /\{state\.debug && tab\('map', '🗺 Map'\)\}/)
  assert.match(app, /\{state\.debug && state\.view === 'map' && <AtlasView state=\{state\} \/>\}/)

  const normal = reducer(stateAt(START_NODE), { type: 'SET_VIEW', view: 'map' })
  assert.equal(normal.view, 'story', 'normal play opened the debug atlas')

  const debugMap = reducer(
    stateAt(START_NODE, { debug: true }),
    { type: 'SET_VIEW', view: 'map' },
  )
  assert.equal(debugMap.view, 'map', 'debug mode could not open the atlas')
  const debugOff = reducer(debugMap, { type: 'TOGGLE_DEBUG' })
  assert.equal(debugOff.debug, false)
  assert.equal(debugOff.view, 'story', 'turning debug off left the atlas active')
})

check('all option words have dictionary entries and can enter the learning loop', () => {
  const missing = []
  let realOptions = 0
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [index, option] of (node.options || []).entries()) {
      if (option.confuser) continue
      realOptions++
      for (const id of phraseSenses(option.text)) if (!DICT[id]) missing.push(`${nodeId}[${index}] '${id}'`)
    }
  }
  assert.ok(realOptions >= 850, `only ${realOptions} real choices were inspected`)
  assert.deepEqual(missing, [])
})

const failures = checks.filter((entry) => !entry.ok)
for (const entry of checks) console.log(`${entry.ok ? '✅' : '❌'} ${entry.name}${entry.error ? ` — ${entry.error}` : ''}`)
console.log(`\n${failures.length ? `❌ ${failures.length} player-journey check(s) failed` : `✅ all ${checks.length} player-journey checks pass`}`)
if (failures.length) process.exitCode = 1
