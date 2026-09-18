import { expect, test } from '@playwright/test'
import { STORY, lineOf } from '../../src/game/content.js'
import { canChoose, currentStoryState, newRun, normalizeSavedState, reducer, trainablePhraseSenses } from '../../src/game/gameState.js'
import { canonicalPlayerActionId } from '../../src/game/playerActionRuntime.js'
import { resolveRevealLine } from '../../src/game/revealResolver.js'
import { passedComprehensionAction, recordPresentedStoryReadings } from '../../scripts/lib/comprehension-journeys.mjs'
import { commitProjectedOption, feasibleOptionProjection, settleProjectedState } from '../../scripts/lib/story-projections.mjs'
import { buildWorldScene3d } from '../../src/game/worldScene3d.js'
import { worldLocationForState } from '../../src/game/worldLocation.js'

const departure = STORY.maroKrushqit.options.find(({ to }) => to === 'maroPrincesha')
const ending = normalizeSavedState(JSON.parse(JSON.stringify(settleProjectedState(
  commitProjectedOption(feasibleOptionProjection('maroKrushqit', departure), departure),
))), newRun())

function earnedMaroSon() {
  // Supply vocabulary resources only. Role, payment, child, arrival and earned
  // evidence must all come from the real story and comprehension reducers.
  let state = { ...newRun(), nodeId: 'maroShtepi', clock: 16 }
  const actions = [
    'maroshtepi:une-jam-maro', 'story:maro-nisja:merr-thes-me-drithe',
    'story:maro-nisja:merr-furke-dhe-li', 'maronisja:shko-ne-mulli-naten',
    'mulli1:hyr-ne-mulli-naten', 'story:maro-mulli1:ve-drithe-ne-mulli',
    'maromulli1:tjerr-li', 'maroxhindet1:kjo-ka-shume-mundim',
    'marolitani1:vazhdo-tregoj-furke', 'marolitani2:vazhdo-tregoj-si-behet-rroba',
    'marolitani3:shko-ne-shtepi', 'maroshtepi:xhind-jep-flori',
    'maro-sleep-while-lilo-goes', 'marolilokthim:prit-deri-ne-mbremje',
    'marolajmi:shko-drejt-ne-han', 'marohani:ik-para-mesnate',
    'maroikja:shko-ne-shtepi', 'marokthyershtepi:prit',
    'marokrushqit:premto-motra-dhe-njerke-vjen-afer',
    'marokrushqit:shko-me-princ-ne-pallat', 'maro-give-palace-coins',
    'maropallati:prit-dhjete-dite', 'maro-refuse-strange-midwife', 'maro-leave-with-son',
  ]
  for (const actionId of actions) {
    const candidates = STORY[state.nodeId].options.filter((candidate) =>
      !candidate.confuser && canonicalPlayerActionId(state.nodeId, candidate) === actionId)
    const playable = candidates.map((option) => {
      const reveal = option.reveal
        ? resolveRevealLine(STORY[state.nodeId].text.map(lineOf), option).line : []
      const ids = new Set([...trainablePhraseSenses(option.text), ...trainablePhraseSenses(reveal || [])])
      const discovered = { ...state.discovered }, mana = { ...state.mana }, practiced = { ...state.practiced }
      for (const id of ids) {
        discovered[id] = true
        mana[id] = Math.max(20, mana[id] || 0)
        practiced[id] = Math.max(mana[id], practiced[id] || 0)
      }
      return { option, state: { ...state, discovered, mana, practiced } }
    }).filter(({ option, state: candidateState }) => canChoose(currentStoryState(candidateState), option))
    expect(playable, `${state.nodeId}: expected one legal ${actionId}`).toHaveLength(1)
    const { option, state: prepared } = playable[0]
    const before = recordPresentedStoryReadings(prepared)
    const after = commitProjectedOption(before, option)
    expect(after.nodeId, actionId).toBe(option.to)
    expect(after.turn, actionId).toBe(before.turn + 1)
    state = recordPresentedStoryReadings(settleProjectedState(after))
  }
  expect(state.nodeId).toBe('maroPrincesha')
  expect(state.eligible.maroPrincesha).toBe(true)
  expect(state.earned.maroPrincesha).toBeUndefined()
  state = reducer(state, passedComprehensionAction(state, 'maroPrincesha'))
  expect(state.earned.maroPrincesha).toBe(true)
  return normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
}

test('an earned normal Maro ending keeps its source card without opening the debug-only library', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  const seed = earnedMaroSon()
  expect(seed.debug).toBe(false)
  expect(seed.view).toBe('story')
  await page.addInitScript((state) => {
    if (window.name === '__earned_maro_seed__') return
    window.localStorage.clear()
    window.localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    window.localStorage.setItem('aventura.muted.v1', '1')
    window.localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
    window.name = '__earned_maro_seed__'
  }, seed)
  await page.goto('./')
  for (const reload of [false, true]) {
    if (reload) await page.reload()
    await expect(page.locator('.ending-name')).toHaveText('Leaving with Your Son')
    await expect(page.locator('.factoid-lore .lore-summary')).toContainText('Pralla popullore shqiptare (1954)')
    await expect(page.locator('.factoid-lore .lore-summary')).toContainText('Maro')
    await expect(page.locator('.factoid-lore a[href="https://doczz.net/doc/2729503/pralla-popullore-shqiptare"]')).toBeVisible()
    await expect(page.locator('.factoid-lore .lore-link')).toHaveCount(0)
    await expect(page.locator('.story-reading, .option-reading, .dbg-lib')).toHaveCount(0)
    await expect(page.getByRole('button', { name: /^🏆 Achievements/ })).toHaveCount(0)
    await expect(page.getByRole('button', { name: '🗺 Map', exact: true })).toHaveCount(0)
    await expect(page.getByRole('button', { name: '🚶 Back to the world →', exact: true })).toBeEnabled()
  }
  // The same earned card retains its intentional library navigation in debug.
  await page.locator('[data-performance-id="debug-toggle"]').click({ clickCount: 5 })
  await expect(page.locator('.factoid-lore .lore-link')).toBeVisible()
  await page.locator('.factoid-lore .lore-link').click()
  await expect(page.locator('.dbg-lib .dbg-card.focus .dbg-card-head')).toContainText('Maro Përhitura — the Ash-Girl')
  expect(errors).toEqual([])
})

for (const legacy of [false, true]) test(`Maro's ${legacy ? 'unproven old' : 'recorded wedding'} departure stays uncharted in both atlases`, async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  const seed = { ...ending, debug: true, view: 'map', ...(legacy ? { cameFrom: null, choiceIndex: null } : {}) }
  const model = buildWorldScene3d()
  const referenceCount = model.elements.filter((element) => element.catalogue).length
  const worldCount = model.elements.length - referenceCount
  const origin = worldLocationForState(seed).originPlaceId
  const expectedWorldSelection = origin ? `place:${origin}` : model.elements.find(({ kind }) => kind === 'place').id
  expect(seed.nodeId).toBe('maroPrincesha')
  await page.addInitScript((state) => {
    if (window.name === '__ending_map_seed__') return
    window.localStorage.clear()
    window.localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    window.localStorage.setItem('aventura.muted.v1', '1')
    window.localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
    window.name = '__ending_map_seed__'
  }, seed)
  await page.goto('./')
  const atlas = page.getByTestId('world3d-view')
  await expect(atlas).toBeVisible()
  await expect(atlas).toContainText('Current location is uncharted.')
  await expect(page.locator('.world3d-id')).toHaveText('departure-context:maroPrincesha')
  await expect(page.getByRole('combobox', { name: '3D survey mode' })).toHaveValue('references')
  await expect(page.getByTestId('world3d-visibility-count')).toContainText(`${referenceCount} elements in this view`)
  await expect(page.getByRole('combobox', { name: '3D map region' })).toHaveValue('')
  await expect(page.locator('.world3d-inspector')).toContainText('Reference display position')
  if (legacy) await expect(atlas).toContainText('The departure origin is unknown.')
  else {
    await expect(atlas).toContainText('Departure origin:')
    await expect(page.locator('.world3d-description-list')).toContainText('STORY.maroPrincesha.text[0]')
    await expect(page.locator('.world3d-description-list')).not.toContainText('STORY.maroPrincesha.text[1]')
    await expect(page.locator('.world3d-description-list')).not.toContainText('STORY.maroPrincesha.text[3]')
  }
  await page.getByRole('button', { name: 'Validate 3D mappings', exact: true }).click()
  await expect(page.locator('.world3d-audit')).toContainText('Structural checks passed.')
  await page.getByRole('button', { name: 'Fit world', exact: true }).click()
  await expect(page.getByRole('combobox', { name: '3D survey mode' })).toHaveValue('all')
  await expect(page.locator('.world3d-id')).toHaveText(expectedWorldSelection)
  await expect(page.getByTestId('world3d-visibility-count')).toContainText(`${worldCount} elements in this view`)
  await page.getByRole('button', { name: 'Current place', exact: true }).click()
  await expect(page.getByRole('combobox', { name: '3D survey mode' })).toHaveValue('references')
  await expect(page.locator('.world3d-id')).toHaveText('departure-context:maroPrincesha')
  await expect(page.getByTestId('world3d-visibility-count')).toContainText(`${referenceCount} elements in this view`)
  await page.getByRole('searchbox', { name: 'Search map elements' }).fill('departure-context:maroPrincesha')
  await expect(page.getByTestId('world3d-visibility-count')).toContainText('1 elements in this view')
  await page.getByRole('combobox', { name: 'Description mapping scope' }).selectOption('kind:item-blurb')
  await page.locator('.world3d-description-list article').first().getByRole('button', { name: 'Show in 3D', exact: true }).click()
  await expect(page.locator('.world3d-focused')).toContainText('ITEMS.')
  await page.getByRole('button', { name: 'Current place', exact: true }).click()
  await page.getByRole('combobox', { name: 'Description mapping scope' }).selectOption('selection')
  await expect(page.locator('.world3d-id')).toHaveText('departure-context:maroPrincesha')
  await expect(page.getByRole('combobox', { name: '3D survey mode' })).toHaveValue('references')
  await page.getByRole('combobox', { name: 'Inspect 3D element' }).selectOption('place:maroShtepi')
  await page.locator('.world3d-route-list summary').click()
  await page.locator('.world3d-route-list').getByRole('button', { name: 'Departure — destination uncharted', exact: true }).click()
  await expect(page.locator('.world3d-id')).toHaveText('departure-context:maroPrincesha')
  await expect(page.getByRole('combobox', { name: '3D survey mode' })).toHaveValue('references')
  await expect(page.getByTestId('world3d-visibility-count')).toContainText(`${referenceCount} elements in this view`)
  await page.getByRole('button', { name: '2D illustrated map', exact: true }).click()
  const map = page.locator('.atlas-view .dbg-map')
  await expect(map).toContainText('No current-position marker is shown.')
  await expect(map.locator('[data-map-id*="maroPrincesha"]')).toHaveCount(0)
  await page.reload()
  await expect(page.getByTestId('world3d-view')).toContainText('Current location is uncharted.')
  await expect(page.locator('.world3d-id')).toHaveText('departure-context:maroPrincesha')
  await expect(page.getByRole('combobox', { name: '3D survey mode' })).toHaveValue('references')
  await expect(page.getByTestId('world3d-visibility-count')).toContainText(`${referenceCount} elements in this view`)
  expect(errors).toEqual([])
})
