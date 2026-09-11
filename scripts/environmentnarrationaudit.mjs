// Pure release contract for generated scene context.  This exhausts the
// calendar/weather cross-product so a new condition cannot quietly bring back
// the old three-sentence status report or put visible sky inside a sealed room.

import assert from 'node:assert/strict'
import { albanianTextOf, englishReadingOf } from '../src/game/language.js'
import {
  ENVIRONMENT_NARRATION_POLICY,
  ENVIRONMENT_NARRATION_SETTINGS,
  ENVIRONMENT_DIMENSIONS,
  environmentNarrationSetting,
  environmentStoryLine,
  planEnvironmentNarration,
} from '../src/game/storyContext.js'
import { SEASONS, WEATHER_TYPES, civilDayPartAtClock, phaseAtClock } from '../src/game/environment.js'

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

const terminalStops = (line) => line.filter((token) => token.paren && token.en === '.').length
const lexicalTokens = (line) => line.filter((token) => token.id)

check('setting is explicit and backwards-compatible', () => {
  assert.deepEqual(ENVIRONMENT_NARRATION_SETTINGS, ['outdoor', 'enclosed'])
  assert.equal(environmentNarrationSetting(), 'outdoor')
  assert.equal(environmentNarrationSetting({ enclosed: false }), 'outdoor')
  assert.equal(environmentNarrationSetting({ enclosed: true }), 'enclosed')

  const environment = { clock: 13, season: 'spring', weather: 'rain' }
  assert.equal(
    albanianTextOf(environmentStoryLine(environment, { enclosed: true })),
    albanianTextOf(environmentStoryLine(environment, { setting: 'enclosed' })),
  )
})

check('every weather, season, clock and setting yields one concise story line', () => {
  let cases = 0
  for (const setting of ENVIRONMENT_NARRATION_SETTINGS) {
    for (const season of SEASONS) {
      for (const weather of WEATHER_TYPES) {
        for (let clock = 0; clock < 24; clock++) {
          const line = environmentStoryLine({ clock, season, weather }, { setting })
          const albanian = albanianTextOf(line)
          assert.ok(Array.isArray(line) && line.length, `${setting}/${season}/${weather}/${clock}: no line`)
          assert.equal(terminalStops(line), ENVIRONMENT_NARRATION_POLICY.terminalSentences,
            `${setting}/${season}/${weather}/${clock}: not one sentence: ${albanian}`)
          assert.ok(lexicalTokens(line).length <= ENVIRONMENT_NARRATION_POLICY.maxLexicalTokens,
            `${setting}/${season}/${weather}/${clock}: too long: ${albanian}`)
          assert.equal(albanian.split('\n').length, 1, `${setting}/${season}/${weather}/${clock}: line break`)
          assert.equal(/\b(dritare|derë|dera|portë|porta)\b/u.test(albanian), false,
            `${setting}/${season}/${weather}/${clock}: invented opening: ${albanian}`)
          assert.equal(line.some((token) => token.id === 'jashte'), setting === 'enclosed',
            `${setting}/${season}/${weather}/${clock}: exposure contradicted: ${albanian}`)
          cases++
        }
      }
    }
  }
  assert.equal(cases, 960)
})

check('all civil day-parts and simulation phases stay represented', () => {
  const dayPartSurface = Object.freeze({
    morning: 'mëngjes', noon: 'mesditë', afternoon: 'pasdite', evening: 'mbrëmje', night: 'natë',
  })
  const seenDayParts = new Set()
  const seenPhases = new Set()
  for (let clock = 0; clock < 24; clock++) {
    const part = civilDayPartAtClock(clock)
    const phase = phaseAtClock(clock)
    const albanian = albanianTextOf(environmentStoryLine({ clock, season: 'spring', weather: 'rain' }))
    assert.ok(albanian.includes(dayPartSurface[part]), `${clock}: ${part} missing from ${albanian}`)
    seenDayParts.add(part)
    seenPhases.add(phase)
  }
  assert.deepEqual([...seenDayParts].sort(), ['afternoon', 'evening', 'morning', 'night', 'noon'])
  assert.deepEqual([...seenPhases].sort(), ['dawn', 'day', 'dusk', 'night'])
})

check('weather surfaces are natural clauses rather than status labels', () => {
  const expected = Object.freeze({
    clear: 'qielli është pa re',
    cloud: 'qielli është me re',
    rain: 'po bie shi',
    storm: 'ka stuhi',
    snow: 'po bie borë',
  })
  for (const [weather, phrase] of Object.entries(expected)) {
    const albanian = albanianTextOf(environmentStoryLine({ clock: 0, season: 'spring', weather }))
    assert.ok(albanian.includes(phrase), `${weather}: ${albanian}`)
  }
})

check('authored dimensions suppress exactly their own generated facts', () => {
  const environment = { clock: 0, season: 'winter', weather: 'snow' }
  const dimensions = ['time', 'season', 'weather']
  for (let mask = 0; mask < 8; mask++) {
    const omit = dimensions.filter((_, index) => mask & (1 << index))
    for (const setting of ENVIRONMENT_NARRATION_SETTINGS) {
      const line = environmentStoryLine(environment, { setting, omit })
      if (omit.length === dimensions.length) {
        assert.equal(line, null, `${setting}/${omit}: authored line should own all context`)
        continue
      }
      const ids = new Set(lexicalTokens(line).map((token) => token.id))
      if (omit.includes('time')) assert.equal(ids.has('mengjes'), false, `${setting}/${omit}: time leaked`)
      if (omit.includes('season')) assert.equal(ids.has('dimer'), false, `${setting}/${omit}: season leaked`)
      if (omit.includes('weather')) {
        for (const id of ['po_prog', 'bie', 'bore']) assert.equal(ids.has(id), false, `${setting}/${omit}: weather leaked`)
      }
      assert.equal(terminalStops(line), 1)
    }
  }
})

check('only a real post-baseline change creates transition narration', () => {
  const initial = { clock: 0, season: 'spring', weather: 'clear' }
  for (const legacy of [undefined, {}, { version: 0 }, { communicated: {} }]) {
    const baseline = planEnvironmentNarration(initial, legacy, {
      nodeId: 'start', turn: 1, authoredDimensions: [],
    })
    assert.deepEqual(baseline.fallbackDimensions, [], 'missing history was mistaken for a transition')
    assert.deepEqual(baseline.omitDimensions, ENVIRONMENT_DIMENSIONS)
    assert.deepEqual(baseline.nextState.communicated, {
      time: 'morning', season: 'spring', weather: 'clear',
    })
  }

  const baseline = planEnvironmentNarration(initial, undefined, {
    nodeId: 'start', turn: 1, authoredDimensions: [],
  })
  const changed = planEnvironmentNarration(
    { ...initial, weather: 'rain' },
    baseline.nextState,
    { nodeId: 'lendina', turn: 2, authoredDimensions: [] },
  )
  assert.deepEqual(changed.fallbackDimensions, ['weather'])
  assert.deepEqual(changed.omitDimensions.sort(), ['season', 'time'])

  const reloadStable = planEnvironmentNarration(
    { ...initial, weather: 'rain' },
    JSON.parse(JSON.stringify(changed.nextState)),
    { nodeId: 'lendina', turn: 2, authoredDimensions: [] },
  )
  assert.equal(reloadStable.needsCommit, false)
  assert.deepEqual(reloadStable.fallbackDimensions, ['weather'])

  const nextScene = planEnvironmentNarration(
    { ...initial, weather: 'rain' },
    changed.nextState,
    { nodeId: 'pylliLoop', turn: 3, authoredDimensions: [] },
  )
  assert.deepEqual(nextScene.fallbackDimensions, [])
})

check('English editorial readings remain compact sentence metadata', () => {
  for (const setting of ENVIRONMENT_NARRATION_SETTINGS) {
    const reading = englishReadingOf(environmentStoryLine(
      { clock: 13, season: 'autumn', weather: 'storm' },
      { setting },
    ))
    assert.ok(reading.length <= 90, `${setting}: ${reading}`)
    assert.equal((reading.match(/[.!?]/g) || []).length, 1, `${setting}: ${reading}`)
  }
})

console.log(`\n${7 - failures.length}/7 immersive-environment contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
