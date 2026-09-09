// Release contract for moving player state out of the permanent HUD and into
// ordinary Albanian story prose, including phase-sensitive greeting choices.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { STORY, describesEnvironment, lineOf, visibleLines, w } from '../src/game/content.js'
import {
  hasCond,
  hasRequiredItem,
  newRun,
  phraseSenses,
  reducer,
} from '../src/game/gameState.js'
import { albanianTextOf } from '../src/game/language.js'
import {
  authoredEnvironmentDimensions,
  environmentStoryLine,
  purseStoryLine,
} from '../src/game/storyContext.js'
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
    [0, 'spring', 'clear', 'në këtë mëngjes pranvere, qielli është pa re.'],
    [6, 'summer', 'cloud', 'në këtë mesditë vere, qielli është me re.'],
    [7, 'autumn', 'storm', 'në këtë pasdite vjeshte, ka stuhi.'],
    [13, 'winter', 'rain', 'në këtë mbrëmje dimri, po bie shi.'],
    [18, 'winter', 'snow', 'në këtë natë dimri, po bie borë.'],
  ]
  for (const [clock, season, weather, expected] of cases) {
    assert.equal(albanianTextOf(environmentStoryLine({ clock, season, weather })), expected)
  }
  assert.equal(
    albanianTextOf(environmentStoryLine({ clock: 13, season: 'spring', weather: 'rain' }, { enclosed: true })),
    'në këtë mbrëmje pranvere, jashtë po bie shi.',
  )
})

check('authored environmental prose replaces only its declared generic fallback', () => {
  const environment = { clock: 13, season: 'spring', weather: 'rain' }
  const immersiveTime = describesEnvironment('time', [w('muzg')])
  assert.deepEqual([...authoredEnvironmentDimensions([immersiveTime])], ['time'])
  assert.equal(
    albanianTextOf(environmentStoryLine(environment, { omit: authoredEnvironmentDimensions([immersiveTime]) })),
    'në këtë pranverë, po bie shi.',
  )

  const allAuthored = describesEnvironment(['time', 'season', 'weather'], [w('muzg')])
  assert.equal(environmentStoryLine(environment, { omit: authoredEnvironmentDimensions([allAuthored]) }), null)
  assert.equal(
    albanianTextOf(environmentStoryLine(environment, { enclosed: true, omit: ['time'] })),
    'në këtë pranverë, jashtë po bie shi.',
  )

  // Token choice is not presentation metadata: an unmarked line that happens
  // to contain a time word must not suppress a fallback by accident.
  assert.deepEqual([...authoredEnvironmentDimensions([[w('muzg')]])], [])
  assert.throws(() => describesEnvironment('temperature', [w('muzg')]), /dimensions must use/)
})

check('opening and authored weather scenes prefer their visible immersive descriptions', () => {
  const phaseClocks = { dawn: 0, day: 3, dusk: 13, night: 15 }
  for (const [phase, clock] of Object.entries(phaseClocks)) {
    const state = { ...newRun(), nodeId: 'start', clock }
    const lines = visibleLines(STORY.start, (id) => hasCond(state, id))
    const dimensions = authoredEnvironmentDimensions(lines)
    assert.equal(dimensions.has('time'), true, `start/${phase}: time fallback was not replaced`)
    assert.equal(
      albanianTextOf(environmentStoryLine({ clock, season: 'spring', weather: 'clear' }, { omit: dimensions })),
      'në këtë pranverë, qielli është pa re.',
      `start/${phase}: unrelated environment facts disappeared`,
    )
  }

  const authoredWeatherNodes = [
    'tomorProva',
    'tomorStuhi',
    'maliStuhi',
    'dordolecFund',
    'shurdhi1',
    'qiellErera1',
  ]
  for (const nodeId of authoredWeatherNodes) {
    const dimensions = authoredEnvironmentDimensions(STORY[nodeId].text.map(lineOf))
    assert.equal(dimensions.has('weather'), true, `${nodeId}: authored weather does not replace its generic echo`)
  }

  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const entry of node.text) {
      const dimensions = lineOf(entry).environmentDimensions || []
      assert.equal(new Set(dimensions).size, dimensions.length, `${nodeId}: duplicate environment dimension`)
      assert.ok(dimensions.every((dimension) => ['time', 'season', 'weather'].includes(dimension)), `${nodeId}: invalid environment dimension`)
    }
  }
})

check('every authored environment line is reachable and preserves undeclared fallbacks', () => {
  const fallbackByOmission = Object.freeze({
    '': 'në këtë mëngjes pranvere, po bie shi.',
    season: 'në këtë mëngjes, po bie shi.',
    'season+time': 'po bie shi.',
    'season+time+weather': null,
    'season+weather': 'është mëngjes.',
    time: 'në këtë pranverë, po bie shi.',
    'time+weather': 'është pranverë.',
    weather: 'është një mëngjes pranvere.',
  })
  let markedLines = 0
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const entry of node.text) {
      const target = lineOf(entry)
      if (!target.environmentDimensions?.length) continue

      // Construct the smallest truth assignment which makes this one wrapper
      // visible.  This catches a line accidentally buried by its own when(),
      // unless(), until() or whenUnless() metadata without guessing from prose.
      const conditional = !Array.isArray(entry)
      const conditionIds = conditional ? [].concat(entry.cond || []) : []
      const required = new Set(conditional && !entry.negate ? conditionIds : [])
      const excluded = new Set([
        ...(conditional && entry.negate ? conditionIds : []),
        ...(conditional ? [].concat(entry.none || []) : []),
      ])
      const visible = visibleLines(node, (id) => required.has(id) && !excluded.has(id))
      assert.ok(visible.includes(target), `${nodeId}: marked line cannot become visible`)

      const visibleDimensions = [...authoredEnvironmentDimensions(visible)].sort()
      const expected = fallbackByOmission[visibleDimensions.join('+')]
      assert.ok(visibleDimensions.join('+') in fallbackByOmission,
        `${nodeId}: no pinned fallback case for ${visibleDimensions.join('+')}`)
      const fallback = environmentStoryLine(
        { clock: 0, season: 'spring', weather: 'rain' },
        { omit: visibleDimensions },
      )
      assert.equal(fallback ? albanianTextOf(fallback) : null, expected,
        `${nodeId}: an authored line suppressed an unrelated environment fact`)
      markedLines++
    }
  }
  assert.ok(markedLines >= 100, `only ${markedLines} authored environment lines were exercised`)
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
    morning: 'në këtë mëngjes',
    noon: 'në këtë mesditë',
    afternoon: 'në këtë pasdite',
    evening: 'në këtë mbrëmje',
    night: 'në këtë natë',
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
  assert.match(story, /setting: narrationSettingForScene\(state\.nodeId\)/)
  assert.match(story, /omit: authoredEnvironmentDimensions\(presentedEntries\.map\(\(entry\) => entry\.line\)\)/)
  assert.match(story, /environmentLine && renderLine\(environmentLine, 'environment'\)/)
  assert.match(story, /purseLine\) sceneLineEntries\.push\(\{ key: 'purse'/)
  assert.match(story, /presentedEntries\.map\(\(entry\) => renderLine\(entry\.line, entry\.renderKey\)\)/)
  assert.match(story, /if \(!hasRequiredItem\(storyState, opt\)\) return/)
})

check('all whole-line English readings are debug-only', () => {
  assert.equal(storyReadingVisible('hearts', false), false)
  assert.equal(storyReadingVisible('hearts'), false)
  assert.equal(storyReadingVisible('hearts', true), true)
  assert.equal(storyReadingVisible('environment', false), false)
  assert.equal(storyReadingVisible('environment', true), true)
  assert.equal(storyReadingVisible(0, false), false)
  assert.equal(storyReadingVisible(0, true), true)
})

console.log(`\n${10 - failures.length}/10 story-context contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
