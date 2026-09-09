// Story-wide release checks for where generated environment prose is staged.
// This is intentionally separate from the weather/calendar cross-product:
// here we verify rooms versus open air and the interaction with pagination.

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
import { planScenePresentation, SCENE_PAGE_POLICY, scenePageWithinBudget } from '../src/game/scenePresentation.js'
import { isEnclosedScene } from '../src/game/worldModel.js'

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
  ...SCENE_PAGE_POLICY,
  maxLines: SCENE_PAGE_POLICY.maxLines - 1,
  maxLexicalTokens: SCENE_PAGE_POLICY.maxLexicalTokens - ENVIRONMENT_NARRATION_POLICY.maxLexicalTokens,
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

check('enclosed and outdoor fallbacks phrase the same weather from the right vantage point', () => {
  const environment = { clock: 13, season: 'spring', weather: 'rain' }
  const inside = albanianTextOf(environmentStoryLine(environment, { setting: narrationSettingForScene('plaka') }))
  const outside = albanianTextOf(environmentStoryLine(environment, { setting: narrationSettingForScene('start') }))
  assert.equal(inside, 'në këtë mbrëmje pranvere, jashtë po bie shi.')
  assert.equal(outside, 'në këtë mbrëmje pranvere, po bie shi.')
})

check('only authored dimensions on the visible normal page suppress fallback', () => {
  for (const nodeId of ['lumi', 'deti1', 'maja', 'qiellPrende']) {
    const state = { ...newRun(), nodeId, clock: 0, visited: { [nodeId]: true } }
    const lines = visibleLines(STORY[nodeId], (id) => hasCond(state, id))
    const presentation = planScenePresentation(
      lines.map((line, index) => ({ key: String(index), line })),
      { policy: reservedContentPolicy },
    )
    assert.ok(presentation.pages.length > 1, `${nodeId}: fixture no longer exercises pagination`)
    const firstDimensions = authoredEnvironmentDimensions(presentation.pages[0].map((entry) => entry.line))
    assert.equal(firstDimensions.has('time'), false, `${nodeId}: time unexpectedly moved onto page one`)
    const firstFallback = environmentStoryLine(
      { clock: 0, season: 'spring', weather: 'rain' },
      { setting: narrationSettingForScene(nodeId), omit: firstDimensions },
    )
    assert.ok(albanianTextOf(firstFallback).includes('mëngjes'), `${nodeId}: hidden page erased visible time`)

    const markedPage = presentation.pages.find((page) =>
      authoredEnvironmentDimensions(page.map((entry) => entry.line)).has('time'))
    assert.ok(markedPage, `${nodeId}: authored time disappeared from every page`)
    const markedFallback = environmentStoryLine(
      { clock: 0, season: 'spring', weather: 'rain' },
      {
        setting: narrationSettingForScene(nodeId),
        omit: authoredEnvironmentDimensions(markedPage.map((entry) => entry.line)),
      },
    )
    assert.equal(albanianTextOf(markedFallback).includes('mëngjes'), false, `${nodeId}: visible authored time was duplicated`)
    assert.ok(scenePageWithinBudget([
      ...(firstFallback ? [{ line: firstFallback }] : []),
      ...presentation.pages[0],
    ]), `${nodeId}: reserved context overflowed the shared scene budget`)
  }
})

check('debug still keeps every authored source line', () => {
  const lines = STORY.lumi.text.map(lineOf)
  const debug = planScenePresentation(
    lines.map((line, index) => ({ key: String(index), line })),
    { debug: true, policy: reservedContentPolicy },
  )
  assert.deepEqual(debug.pages[0].map((entry) => entry.line), lines)
})

check('StoryView consumes the dedicated setting and visible-page dimensions', () => {
  const source = fs.readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.match(source, /setting: narrationSettingForScene\(state\.nodeId\)/)
  assert.match(source, /authoredEnvironmentDimensions\(presentedEntries\.map\(\(entry\) => entry\.line\)\)/)
  assert.doesNotMatch(source, /isEnclosedScene/)
  assert.doesNotMatch(source, /authoredEnvironmentDimensions\(lines\)/)
})

console.log(`\n${7 - failures.length}/7 environment-coverage contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
