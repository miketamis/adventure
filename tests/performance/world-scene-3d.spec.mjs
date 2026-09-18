import { expect, test } from '@playwright/test'
import { STORY, lineOf } from '../../src/game/content.js'
import { newRun, normalizeSavedState, trainablePhraseSenses } from '../../src/game/gameState.js'
import { albanianTextOf } from '../../src/game/language.js'
import { buildWorldScene3d } from '../../src/game/worldScene3d.js'

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
  await expect(page.locator('.world3d-id')).toContainText('item-action:')
  await page.locator('.world3d-description-list article').first().getByRole('button', { name: 'Show unlocated references' }).click()
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

test('complete atlas surveys every layer and opens searchable references without inventing locations', async ({ page }) => {
  const model = buildWorldScene3d()
  const world = model.elements.filter((element) => !element.catalogue)
  const references = model.elements.filter((element) => element.catalogue)
  const actors = world.filter(({ kind }) => kind === 'actor')
  const gjon = world.find(({ id }) => id === 'actor:gjonMik:libriDiell')
  expect(gjon).toBeTruthy()
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('./')
  await expect(page.getByRole('button', { name: '🗺 Map', exact: true })).toHaveCount(0)
  await page.locator('[data-performance-id="debug-toggle"]').click({ clickCount: 5 })
  await page.getByRole('button', { name: '🗺 Map', exact: true }).click()
  const count = page.getByTestId('world3d-visibility-count')
  const mode = page.getByRole('combobox', { name: '3D survey mode' })
  const region = page.getByRole('combobox', { name: '3D map region' })
  const search = page.getByRole('searchbox', { name: 'Search map elements' })
  const inspector = page.getByRole('combobox', { name: 'Inspect 3D element' })
  await expect(mode).toHaveValue('all')
  await expect(region).toHaveValue('')
  await expect(count).toContainText(`${world.length} elements in this view`)
  const characters = page.getByRole('checkbox', { name: /^Characters / })
  await characters.uncheck()
  await expect(count).toContainText(`${world.length - actors.length} elements in this view`)
  await region.selectOption('sea')
  await search.fill(gjon.id)
  await page.locator('.world3d-inventory-list button').filter({ hasText: gjon.id }).click()
  await expect(page.locator('.world3d-id')).toHaveText(gjon.id)
  await expect(region).toHaveValue('')
  await expect(characters).toBeChecked()
  await expect(count).toContainText(`${world.length} elements in this view`)

  // A direct reference selection from complete-survey mode must switch the
  // rendered view as well as the inspector; the previous UI silently hid it.
  const item = references.find(({ id }) => id.startsWith('item:'))
  await inspector.selectOption(item.id)
  await expect(mode).toHaveValue('references')
  await expect(count).toContainText(`${references.length} elements in this view`)
  await expect(page.locator('.world3d-inspector')).toContainText('Unlocated · gallery layout only')
  await expect(search).toHaveValue('')
  await mode.selectOption('references')
  await page.locator('.world3d-layout').screenshot({ path: '/tmp/language-adventure-map-reference-gallery.png' })
  await search.fill('zzzz-no-such-world-element')
  await expect(count).toContainText('0 elements in this view')
  await expect(page.getByText('No map elements match this search.', { exact: true })).toBeVisible()
  await search.fill(item.id)
  const displayedReferenceCount = await page.locator('.world3d-inventory-list button').count()
  expect(displayedReferenceCount).toBeGreaterThan(0)
  await expect(count).toContainText(`${displayedReferenceCount} elements in this view`)
  await page.locator('.world3d-inventory-list button').filter({ hasText: item.id }).first().click()
  await expect(page.locator('.world3d-id')).toHaveText(item.id)
  await expect(mode).toHaveValue('references')
  await page.getByRole('button', { name: 'Fit world', exact: true }).click()
  await expect(mode).toHaveValue('all')
  await expect(count).toContainText(`${world.length} elements in this view`)

  // Mixed sources must expose their charted evidence before the optional
  // unlocated gallery; each binding must switch to its own correct surface.
  const byId = new Map(model.elements.map((element) => [element.id, element]))
  const mixedSources = [
    model.descriptions.find((description) => description.source.kind === 'item-blurb'
      && description.elementIds.some((id) => byId.get(id)?.kind === 'item-action')),
    model.descriptions.find((description) => description.source.kind === 'tale-cast'
      && description.elementIds.some((id) => byId.get(id)?.catalogue)
      && description.elementIds.some((id) => !byId.get(id)?.catalogue && byId.get(id)?.kind !== 'region')),
  ]
  const sourceSearch = page.getByRole('searchbox', { name: 'Search all story descriptions' })
  for (const description of mixedSources) {
    expect(description).toBeTruthy()
    await sourceSearch.fill(description.id)
    const article = page.locator('.world3d-description-list article').filter({ hasText: description.source.path }).first()
    await article.getByRole('button', { name: 'Show in 3D', exact: true }).click()
    await expect(mode).toHaveValue('evidence')
    const referenceId = description.elementIds.find((id) => byId.get(id)?.catalogue)
    const physicalId = description.elementIds.find((id) => !byId.get(id)?.catalogue && byId.get(id)?.kind !== 'region')
    await article.getByRole('button', { name: referenceId, exact: true }).click()
    await expect(mode).toHaveValue('references')
    await expect(page.locator('.world3d-id')).toHaveText(referenceId)
    await article.getByRole('button', { name: physicalId, exact: true }).click()
    await expect(mode).toHaveValue('evidence')
    await expect(page.locator('.world3d-id')).toHaveText(physicalId)
    await expect(page.locator('.world3d-focused')).toContainText(description.source.path)
  }

  // The illustrated debug atlas also exposes places never visited this run.
  await page.getByRole('button', { name: '2D illustrated map', exact: true }).click()
  await expect(page.locator('.atlas-view .dbg-world [data-map-id^="landmark-argjiroKala:"]')).toHaveAttribute('role', 'button')
  await page.getByRole('button', { name: '3D world & audit', exact: true }).click()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.getByTestId('world3d-canvas')).toBeVisible()
  await expect(page.getByRole('searchbox', { name: 'Search map elements' })).toBeVisible()
  await page.getByTestId('world3d-canvas').screenshot({ path: '/tmp/language-adventure-map-survey-mobile.png' })
  await sourceSearch.fill(mixedSources[0].id)
  const mobileSource = page.locator('.world3d-description-list article').first()
  await expect(mobileSource.getByRole('button', { name: 'Show in 3D', exact: true })).toBeVisible()
  await expect(mobileSource.getByRole('button', { name: 'Show unlocated references', exact: true })).toBeVisible()
  expect(await mobileSource.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
  await mobileSource.screenshot({ path: '/tmp/language-adventure-map-mixed-source-mobile.png' })
  expect(await page.getByTestId('world3d-view').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
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
