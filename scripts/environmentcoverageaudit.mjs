// Story-wide release checks for where generated environment prose is staged.
// This is intentionally separate from the weather/calendar cross-product:
// here we verify rooms versus open air and the one-surface scene projection.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { STORY, lineOf, visibleLines } from '../src/game/content.js'
import { newRun, hasCond } from '../src/game/gameState.js'
import { albanianTextOf } from '../src/game/language.js'
import {
  ENVIRONMENT_NARRATION_POLICY,
  authoredEnvironmentDimensions,
  environmentStoryLine,
} from '../src/game/storyContext.js'
import {
  ENCLOSED_NARRATION_SCENES,
  isEnclosedNarrationScene,
  narrationSettingForScene,
} from '../src/game/sceneEnvironmentSetting.js'
import { planScenePresentation, SCENE_SCROLL_POLICY } from '../src/game/scenePresentation.js'
import { isEnclosedScene } from '../src/game/worldModel.js'
import { PLACE_OF } from '../src/components/nodePositions.js'

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

const reservedContentPolicy = Object.freeze({
  ...SCENE_SCROLL_POLICY,
  maxLines: SCENE_SCROLL_POLICY.maxLines - 1,
  maxLexicalTokens: SCENE_SCROLL_POLICY.maxLexicalTokens - ENVIRONMENT_NARRATION_POLICY.maxLexicalTokens,
})

// Coverage is measured both by story node and by physical place. A tale can
// have many consecutive outcome/dialogue nodes in one room; counting only raw
// nodes would reward repeating atmosphere there instead of making the wider
// travelled world feel lived in. These floors pin the completed whole-story
// editorial pass and make new locations carry their share of authored context.
const AUTHORED_ENVIRONMENT_COVERAGE = Object.freeze({
  minimumNodes: 160,
  minimumPlaces: 115,
  minimumWeatherPlaces: 40,
  minimumSeasonPlaces: 15,
})

check('every explicit narration setting names a real scene exactly once', () => {
  const ids = Object.values(ENCLOSED_NARRATION_SCENES).flat()
  assert.equal(new Set(ids).size, ids.length, 'an enclosed scene occurs in more than one setting group')
  for (const id of ids) assert.ok(STORY[id], `${id}: enclosed setting points to no story scene`)
  for (const id of Object.keys(STORY)) {
    assert.ok(['outdoor', 'enclosed'].includes(narrationSettingForScene(id)), `${id}: no narration setting`)
  }
})

check('ordinary interiors no longer borrow the map-horizon enclosure rule', () => {
  const examples = Object.freeze({
    house: 'plaka',
    guestRoom: 'oda1',
    inn: 'bujtina',
    prison: 'osmaniBurg',
    tower: 'behuriKulla',
    cave: 'stihi1',
    cafe: 'kafeneja',
    mill: 'xhindMulli',
    sunHouse: 'diellShtepi1',
    bookInsideOda: 'libriDiell',
    cradleHouse: 'djepi1',
  })
  for (const [kind, id] of Object.entries(examples)) {
    assert.equal(isEnclosedNarrationScene(id), true, `${kind}/${id}: sky leaks into the interior`)
  }
  assert.equal(isEnclosedScene('plaka'), false, 'test no longer proves narration is independent of horizon geometry')
  assert.equal(isEnclosedNarrationScene('plaka'), true)
})

check('true outdoor hubs, thresholds and courtyards remain exposed to local sky and weather', () => {
  for (const id of [
    'start',
    'fshatiSheshi',
    'udhekryq',
    'lumi',
    'mali1',
    'deti1',
    'kroi1',
    'pallatiZi',
    'pallatRojeZi',
    'kordhaPallat',
    'kordhaProva',
  ]) {
    assert.equal(narrationSettingForScene(id), 'outdoor', `${id}: outdoor hub was enclosed`)
  }
})

check('authored sensory context reaches the wider travelled world, not just repeated hub beats', () => {
  const authoredNodes = []
  const placesByDimension = Object.fromEntries(
    ['time', 'weather', 'season'].map((dimension) => [dimension, new Set()]),
  )
  for (const [nodeId, node] of Object.entries(STORY)) {
    const dimensions = authoredEnvironmentDimensions(node.text.map(lineOf))
    if (!dimensions.size) continue
    authoredNodes.push(nodeId)
    const place = PLACE_OF[nodeId] || nodeId
    for (const dimension of dimensions) placesByDimension[dimension].add(place)
  }
  const authoredPlaces = new Set(authoredNodes.map((nodeId) => PLACE_OF[nodeId] || nodeId))
  assert.ok(
    authoredNodes.length >= AUTHORED_ENVIRONMENT_COVERAGE.minimumNodes,
    `only ${authoredNodes.length} story nodes have authored environment prose`,
  )
  assert.ok(
    authoredPlaces.size >= AUTHORED_ENVIRONMENT_COVERAGE.minimumPlaces,
    `only ${authoredPlaces.size} distinct places have authored environment prose`,
  )
  assert.ok(
    placesByDimension.weather.size >= AUTHORED_ENVIRONMENT_COVERAGE.minimumWeatherPlaces,
    `weather is authored at only ${placesByDimension.weather.size} distinct places`,
  )
  assert.ok(
    placesByDimension.season.size >= AUTHORED_ENVIRONMENT_COVERAGE.minimumSeasonPlaces,
    `season is authored at only ${placesByDimension.season.size} distinct places`,
  )
})

check('enclosed and outdoor fallbacks phrase the same weather from the right vantage point', () => {
  const environment = { clock: 13, season: 'spring', weather: 'rain' }
  const inside = albanianTextOf(environmentStoryLine(environment, { setting: narrationSettingForScene('plaka') }))
  const outside = albanianTextOf(environmentStoryLine(environment, { setting: narrationSettingForScene('start') }))
  assert.equal(inside, 'në këtë mbrëmje pranvere, jashtë po bie shi.')
  assert.equal(outside, 'në këtë mbrëmje pranvere, po bie shi.')
})

check('authored dimensions on the visible scroll suppress the matching fallback', () => {
  for (const nodeId of ['lumi', 'deti1', 'maja', 'qiellPrende']) {
    const state = { ...newRun(), nodeId, clock: 0, visited: { [nodeId]: true } }
    const lines = visibleLines(STORY[nodeId], (id) => hasCond(state, id))
    const presentation = planScenePresentation(
      lines.map((line, index) => ({ key: String(index), line })),
      { policy: reservedContentPolicy },
    )
    const presentedLines = presentation.entries.map((entry) => entry.line)
    const dimensions = authoredEnvironmentDimensions(presentedLines)
    assert.equal(dimensions.has('time'), true, `${nodeId}: visible authored time disappeared`)
    const fallback = environmentStoryLine(
      { clock: 0, season: 'spring', weather: 'rain' },
      { setting: narrationSettingForScene(nodeId), omit: dimensions },
    )
    assert.equal(albanianTextOf(fallback).includes('mëngjes'), false, `${nodeId}: visible authored time was duplicated`)
    const coreLines = lines.filter((line) => line.scenePriority !== 'ambient')
    assert.ok(coreLines.every((line) => presentedLines.includes(line)), `${nodeId}: core prose left the visible scroll`)
  }
})

check('debug still keeps every authored source line', () => {
  const lines = STORY.lumi.text.map(lineOf)
  const debug = planScenePresentation(
    lines.map((line, index) => ({ key: String(index), line })),
    { debug: true, policy: reservedContentPolicy },
  )
  assert.deepEqual(debug.entries.map((entry) => entry.line), lines)
})

check('StoryView consumes the dedicated setting and visible-scroll dimensions', () => {
  const source = fs.readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.match(source, /setting: narrationSettingForScene\(state\.nodeId\)/)
  assert.match(source, /const presentedEntries = scenePresentation\.entries/)
  assert.match(source, /authoredEnvironmentDimensions\(presentedEntries\.map\(\(entry\) => entry\.line\)\)/)
  assert.doesNotMatch(source, /isEnclosedScene/)
  assert.doesNotMatch(source, /authoredEnvironmentDimensions\(lines\)/)
})

console.log(`\n${8 - failures.length}/8 environment-coverage contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
