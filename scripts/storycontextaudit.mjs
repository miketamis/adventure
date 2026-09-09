// Release contract for moving player state out of the permanent HUD and into
// ordinary Albanian story prose, including phase-sensitive greeting choices.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { STORY, visibleLines } from '../src/game/content.js'
import {
  hasCond,
  hasRequiredItem,
  newRun,
  phraseSenses,
  reducer,
} from '../src/game/gameState.js'
import { albanianTextOf } from '../src/game/language.js'
import { environmentStoryLine, purseStoryLine } from '../src/game/storyContext.js'
import { civilDayPartAtClock, civilHourAtClock, greetingPeriodAtClock } from '../src/game/environment.js'
import { storyReadingVisible } from '../src/components/storyMechanicsPresentation.js'

const failures = []
const check = (name, fn) => {
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (error) {
    failures.push(`${name}: ${error.message}`)
    console.log(`✗ ${name}`)
  }
}

const periodClock = Object.freeze({ morning: 0, day: 6, evening: 12, night: 16 })
const greetingScenes = Object.freeze({
  tregtari: ['morning', 'day', 'evening', 'night'],
  bujtina: ['morning', 'day', 'evening', 'night'],
  sheruesi: ['morning', 'day', 'evening', 'night'],
  udhetariHuaj: ['morning', 'day', 'evening', 'night'],
  kroiGrate2: ['morning', 'day', 'evening'],
})

check('civil time, season and weather become ordinary Albanian story lines', () => {
  const cases = [
    [0, 'spring', 'clear', 'është mëngjes. është pranverë. nuk ka re.'],
    [6, 'summer', 'cloud', 'është mesditë. është verë. ka re.'],
    [7, 'autumn', 'storm', 'është pasdite. është vjeshtë. ka stuhi.'],
    [13, 'winter', 'rain', 'është mbrëmje. është dimër. po bie shi.'],
    [18, 'winter', 'snow', 'është natë. është dimër. po bie borë.'],
  ]
  for (const [clock, season, weather, expected] of cases) {
    assert.equal(albanianTextOf(environmentStoryLine({ clock, season, weather })), expected)
  }
  assert.equal(
    albanianTextOf(environmentStoryLine({ clock: 13, season: 'spring', weather: 'rain' }, { enclosed: true })),
    'jashtë, është mbrëmje.',
  )
})

check('a positive lek balance is narrated exactly and zero stays silent', () => {
  assert.equal(purseStoryLine(0), null)
  assert.equal(purseStoryLine(-3), null)
  assert.equal(albanianTextOf(purseStoryLine(17)), 'ti ke 17 lek.')
})

check('each social encounter has one right greeting and three contextual distractors', () => {
  for (const [nodeId, periods] of Object.entries(greetingScenes)) {
    for (const period of periods) {
      const state = { ...newRun(), nodeId, clock: periodClock[period] }
      const visible = STORY[nodeId].options.filter((option) =>
        option.contextGreeting && hasRequiredItem(state, option),
      )
      assert.equal(visible.length, 4, `${nodeId}/${period}: expected four greeting choices`)
      assert.equal(visible.filter((option) => !option.confuser).length, 1, `${nodeId}/${period}: right-answer count`)
      assert.equal(visible.filter((option) => option.confuser).length, 3, `${nodeId}/${period}: distractor count`)
      assert.ok(visible.some((option) => albanianTextOf(option.text) === 'natën e mirë!'), `${nodeId}/${period}: no good-night distractor`)
    }
  }
})

check('all 24 civil hours narrate and accept the same greeting period', () => {
  const correctGreeting = Object.freeze({
    morning: 'mirëmëngjes!',
    day: 'mirëdita!',
    evening: 'mirëmbrëma!',
    night: 'mirëmbrëma!',
  })
  const narratedPart = Object.freeze({
    morning: 'është mëngjes.',
    noon: 'është mesditë.',
    afternoon: 'është pasdite.',
    evening: 'është mbrëmje.',
    night: 'është natë.',
  })
  for (let clock = 0; clock < 24; clock++) {
    const state = { ...newRun(), nodeId: 'tregtari', clock }
    const dayPart = civilDayPartAtClock(clock)
    const period = greetingPeriodAtClock(clock)
    const narrated = albanianTextOf(environmentStoryLine({ clock, season: 'spring', weather: 'clear' }))
    assert.ok(narrated.startsWith(narratedPart[dayPart]), `${civilHourAtClock(clock)}:00 narration drifted`)
    const right = STORY.tregtari.options.filter((option) =>
      option.contextGreeting && !option.confuser && hasRequiredItem(state, option),
    )
    assert.equal(right.length, 1, `${civilHourAtClock(clock)}:00 must expose exactly one correct greeting`)
    assert.equal(albanianTextOf(right[0].text), correctGreeting[period], `${civilHourAtClock(clock)}:00 greeting contradicts narration`)

    const spokenGreetings = visibleLines(STORY.tregtari, (id) => hasCond(state, id))
      .map(albanianTextOf)
      .filter((line) => Object.values(correctGreeting).includes(line))
    assert.deepEqual(spokenGreetings, [correctGreeting[period]], `${civilHourAtClock(clock)}:00 trader says a contradictory greeting`)
  }
})

check('a correct greeting records the spoken reply and an incorrect one costs one heart', () => {
  let state = { ...newRun(), nodeId: 'tregtari', clock: periodClock.evening, visited: { tregtari: true } }
  const visible = STORY.tregtari.options.filter((option) =>
    option.contextGreeting && hasRequiredItem(state, option),
  )
  const correct = visible.find((option) => !option.confuser)
  const wrong = visible.find((option) => option.confuser)
  for (const id of phraseSenses(correct.text)) {
    state.discovered[id] = true
    state.mana[id] = 1
  }
  const answered = reducer(state, {
    type: 'CHOOSE', option: correct, targetNode: STORY.tregtari,
    fromNodeId: state.nodeId, fromTurn: state.turn,
  })
  assert.equal(answered.flags.greetedTrader, true)
  assert.equal(answered.flags['greetedTrader:evening'], true)
  assert.equal(answered.clock, state.clock, 'a spoken response consumed an invented hour')
  assert.equal(STORY.tregtari.options.filter((option) =>
    option.contextGreeting && hasRequiredItem(answered, option),
  ).length, 0, 'the completed greeting remained in the action list')
  assert.equal(reducer(state, { type: 'CONFUSE', expectedHearts: state.hearts }).hearts, state.hearts - 1)
  assert.equal(wrong.contextGreeting.correct, false)
})

check('normal play hides diagnostic counters while debug keeps the inspectors', () => {
  const app = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  const story = fs.readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.match(app, /state\.debug && <span className="stat">turn/)
  assert.match(app, /\) : state\.debug \? \(/)
  assert.match(story, /state\.debug && <WorldContext/)
  assert.match(story, /renderLine\(environmentLine, 'environment'\)/)
  assert.match(story, /renderLine\(purseLine, 'purse'\)/)
  assert.match(story, /if \(!hasRequiredItem\(storyState, opt\)\) return/)
})

check('heart-status English is debug-only while other story readings remain visible', () => {
  assert.equal(storyReadingVisible('hearts', false), false)
  assert.equal(storyReadingVisible('hearts'), false)
  assert.equal(storyReadingVisible('hearts', true), true)
  assert.equal(storyReadingVisible('environment', false), true)
})

console.log(`\n${7 - failures.length}/7 story-context contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
