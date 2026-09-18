import { expect, test } from '@playwright/test'
import { STORY, lineOf } from '../../src/game/content.js'
import { newRun, normalizeSavedState, trainablePhraseSenses } from '../../src/game/gameState.js'
import { albanianTextOf } from '../../src/game/language.js'

test('3D atlas renders, navigates, traces prose, validates and exports without entering normal play', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('./')
  await expect(page.getByRole('heading', { name: 'Aventura Shqip · learn Albanian', exact: true })).toBeVisible()
  await expect(page.getByTestId('world3d-view')).toHaveCount(0)
  await expect(page.getByRole('button', { name: '🗺 Map', exact: true })).toHaveCount(0)
  expect(await page.evaluate(() => performance.getEntriesByType('resource').some((entry) => entry.name.includes('WorldScene3d')))).toBe(false)

  await page.locator('[data-performance-id="debug-toggle"]').click({ clickCount: 5 })
  await page.getByRole('button', { name: '🗺 Map', exact: true }).click()
  const canvas = page.getByTestId('world3d-canvas')
  await expect(canvas).toBeVisible()
  await expect(page.getByRole('heading', { name: 'A world you can trace' })).toBeVisible()
  await expect(page.getByRole('combobox', { name: 'Inspect 3D element' }).locator('option')).not.toHaveCount(1)
  // Perspective navigation changes the actual rendered geometry.
  await page.getByRole('combobox', { name: '3D map region' }).selectOption('village')
  const before = await canvas.screenshot()
  await canvas.focus()
  await canvas.press('ArrowRight')
  await expect(async () => expect((await canvas.screenshot()).equals(before)).toBe(false)).toPass()
  await page.getByRole('button', { name: 'Current place', exact: true }).click()
  await expect(page.locator('.world3d-id')).toHaveText('place:start')

  await page.getByRole('button', { name: 'Validate 3D mappings', exact: true }).click()
  await expect(page.locator('.world3d-audit')).toContainText('Structural checks passed.')
  await page.getByRole('searchbox', { name: 'Search all story descriptions' }).fill('start')
  await page.locator('.world3d-description-list article').first().getByRole('button', { name: 'Show in 3D' }).click()
  await expect(page.locator('.world3d-focused')).toContainText('STORY.start.text[')

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Export audit JSON' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toBe('aventura-world-3d-audit.json')
  const stream = await download.createReadStream()
  const chunks = []
  for await (const chunk of stream) chunks.push(chunk)
  const model = JSON.parse(Buffer.concat(chunks).toString())
  expect(model.elements.length).toBeGreaterThan(200)
  expect(model.descriptions.length).toBeGreaterThan(1000)
  const opening = model.descriptions.find((description) => description.id === 'description:start:0')
  expect(opening.elementIds).toContain('place:start')
  expect(model.elements.find((element) => element.id === 'place:start').descriptionIds).toContain(opening.id)
  expect(model.statistics.itemDescriptions).toBe(35)
  expect(model.statistics.environmentTemplates).toBeGreaterThan(0)
  await page.getByRole('searchbox', { name: 'Search all story descriptions' }).fill('')
  await page.getByRole('combobox', { name: 'Description mapping scope' }).selectOption('kind:item-blurb')
  await page.locator('.world3d-description-list article').first().getByRole('button', { name: 'Show in 3D' }).click()
  await expect(page.locator('.world3d-focused')).toContainText('ITEMS.')
  await expect(page.locator('.world3d-inspector')).toContainText('Reference display position')
  await canvas.focus()
  await canvas.press('Home')
  await expect(page.locator('.world3d-id')).toHaveText('place:start')
  await expect(page.getByRole('combobox', { name: '3D map region' })).toHaveValue('')
  await page.getByRole('combobox', { name: 'Description mapping scope' }).selectOption('selection')

  await page.getByRole('button', { name: 'Fit world', exact: true }).click()
  await page.locator('.world3d-layout').screenshot({ path: '/tmp/language-adventure-3d-world.png' })
  await page.getByRole('combobox', { name: 'Inspect 3D element' }).selectOption('feature:village-bridge')
  await expect(page.locator('.world3d-id')).toHaveText('feature:village-bridge')
  await expect(page.locator('.world3d-description-list')).toContainText('STORY.start.text[1]')
  await expect(page.locator('.world3d-inspector')).toContainText('Connects')
  await expect(page.locator('.world3d-inspector')).toContainText('outgoing story choices')
  await page.locator('.world3d-layout').screenshot({ path: '/tmp/language-adventure-3d-detail.png' })
  await page.getByRole('combobox', { name: 'Inspect 3D element' }).selectOption('feature:inn-bed')
  await expect(page.locator('.world3d-inspector')).toContainText('Checked spatial relationships')
  await expect(page.locator('.world3d-inspector')).toContainText('inn-building')
  await page.locator('.world3d-layout').screenshot({ path: '/tmp/language-adventure-3d-inn-audit.png' })
  await page.getByRole('combobox', { name: 'Inspect 3D element' }).selectOption('feature:square-well')
  await expect(page.locator('.world3d-description-list')).toContainText('STORY.fshatiSheshi.text[0]')
  await expect(page.locator('.world3d-description-list')).toContainText('STORY.pusiThate.text[4]')
  await page.locator('.world3d-layout').screenshot({ path: '/tmp/language-adventure-3d-well-audit.png' })
  await page.getByRole('button', { name: '2D illustrated map', exact: true }).click()
  await expect(page.getByTestId('world3d-view')).toHaveCount(0)
  await expect(page.locator('.atlas-view .dbg-world')).toBeVisible()
  await page.getByRole('button', { name: '3D world & audit', exact: true }).click()
  await expect(canvas).toBeVisible()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(canvas).toBeVisible()
  expect(await page.getByTestId('world3d-view').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
  await page.getByTestId('world3d-view').screenshot({ path: '/tmp/language-adventure-3d-mobile.png' })
  expect(errors).toEqual([])
})

test('restored well remains reachable in normal play after reloading the square', async ({ page }) => {
  const option = STORY.fshatiSheshi.options.find((entry) => entry.to === 'pusiThate' && entry.requires === 'fact:villageWellsRestored')
  expect(option).toBeTruthy()
  const source = lineOf(STORY.fshatiSheshi.text[1])
  const seed = {
    ...newRun(), nodeId: 'fshatiSheshi', cameFrom: 'udhekryq', clock: 6,
    worldFacts: { villageWellsRestored: { atClock: 4, source: 'dordolecFund' } },
  }
  // Exercise the rendered route with a narrow, durable vocabulary fixture.
  // storycontextaudit walks here through every real restoration ending.
  for (const id of [...trainablePhraseSenses(source), ...trainablePhraseSenses(option.text)]) {
    seed.discovered[id] = true
    seed.mana[id] = 3
    seed.practiced[id] = 3
  }
  await page.addInitScript((state) => {
    if (window.name === '__restored_well_audit__') return
    localStorage.clear()
    localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    localStorage.setItem('aventura.muted.v1', '1')
    localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({
      version: 1, decided: true, structured: false, replay: false,
    }))
    window.name = '__restored_well_audit__'
  }, normalizeSavedState(JSON.parse(JSON.stringify(seed)), newRun()))
  await page.goto('./')
  const wellRoute = page.getByRole('button', { name: `Choose: ${albanianTextOf(option.text)}`, exact: true })
  await expect(wellRoute).toHaveCount(1)
  await expect(wellRoute).toBeEnabled()
  await page.reload()
  await expect(wellRoute).toHaveCount(1)
  await expect(wellRoute).toBeEnabled()
  await expect(page.locator('.story-reading')).toHaveCount(0)
  await expect(page.getByRole('button', { name: '🗺 Map', exact: true })).toHaveCount(0)
  await wellRoute.click()
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1'))?.nodeId)).toBe('pusiThate')
  await page.reload()
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1'))?.nodeId)).toBe('pusiThate')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1'))?.worldFacts?.villageWellsRestored)).toBeTruthy()
  await expect(page.locator('.action-karaoke-overlay')).toHaveCount(0)
})
