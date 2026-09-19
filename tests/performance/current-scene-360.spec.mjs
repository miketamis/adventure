import { expect, test } from '@playwright/test'
import { STORY, lineOf } from '../../src/game/content.js'
import { newRun, normalizeSavedState, trainablePhraseSenses } from '../../src/game/gameState.js'

test('floating debug 360 view pans, resizes and follows real story movement', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  const option = STORY.fshatiSheshi.options.find((entry) => entry.to === 'pusiThate' && entry.requires === 'fact:villageWellsRestored')
  const seed = { ...newRun(), nodeId: 'fshatiSheshi', cameFrom: 'udhekryq', clock: 6,
    worldFacts: { villageWellsRestored: { atClock: 4, source: 'dordolecFund' } } }
  for (const id of [...trainablePhraseSenses(lineOf(STORY.fshatiSheshi.text[1])), ...trainablePhraseSenses(option.text)]) {
    seed.discovered[id] = true
    seed.mana[id] = 3
    seed.practiced[id] = 3
  }
  await page.addInitScript((state) => {
    if (window.name === '__current_scene_360__') return
    localStorage.clear()
    localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    localStorage.setItem('aventura.muted.v1', '1')
    localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
    window.name = '__current_scene_360__'
  }, normalizeSavedState(JSON.parse(JSON.stringify(seed)), newRun()))
  await page.goto('./')
  const canvas = page.getByTestId('minimap-scene')
  await expect(canvas).toHaveCount(0)
  await page.locator('[data-performance-id="debug-toggle"]').click({ clickCount: 5 })
  await expect(canvas).toBeVisible()
  await expect(canvas).toHaveAttribute('data-node-id', 'fshatiSheshi')
  await canvas.focus()
  const initial = await canvas.screenshot()
  await canvas.press('ArrowRight')
  await expect(async () => expect((await canvas.screenshot()).equals(initial)).toBe(false)).toPass()
  await page.getByRole('button', { name: 'Reset 360° view', exact: true }).click()
  await canvas.focus()
  await expect(async () => expect((await canvas.screenshot()).equals(initial)).toBe(true)).toPass()

  const rect = await canvas.boundingBox()
  await page.mouse.move(rect.x + rect.width / 2, rect.y + rect.height / 2)
  await page.mouse.down()
  await page.mouse.move(rect.x + rect.width / 2 + 90, rect.y + rect.height / 2 + 20, { steps: 6 })
  await page.mouse.up()
  await expect(async () => expect((await canvas.screenshot()).equals(initial)).toBe(false)).toPass()
  const turned = await canvas.screenshot()
  await page.getByRole('button', { name: '📚 Dictionary', exact: true }).click()
  await page.getByRole('button', { name: '📖 Story', exact: true }).click()
  await canvas.focus()
  await expect(async () => expect((await canvas.screenshot()).equals(turned)).toBe(true)).toPass()

  await page.getByRole('button', { name: 'Expand 360° view', exact: true }).click()
  await expect.poll(async () => (await canvas.boundingBox()).width).toBeGreaterThan(rect.width * 2)
  await page.getByRole('button', { name: 'Restore 360° view', exact: true }).click()
  await page.getByRole('button', { name: 'Hide 360° view', exact: true }).click()
  await expect(canvas).toHaveCount(0)
  await page.getByRole('button', { name: 'Show current 360° view', exact: true }).click()
  await expect(canvas).toHaveAttribute('data-node-id', 'fshatiSheshi')
  await page.getByRole('button', { name: 'Choose: Go to the well.', exact: true }).click()
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1'))?.nodeId)).toBe('pusiThate')
  await expect(canvas).toHaveAttribute('data-node-id', 'pusiThate')
  await page.reload()
  await expect(canvas).toHaveAttribute('data-node-id', 'pusiThate')
  await expect(canvas).toBeVisible()

  await page.setViewportSize({ width: 390, height: 844 })
  await expect(canvas).toBeVisible()
  const mobile = await page.getByRole('region', { name: 'Current location 360° view', exact: true }).boundingBox()
  expect(mobile.x).toBeGreaterThanOrEqual(0)
  expect(mobile.x + mobile.width).toBeLessThanOrEqual(390)
  expect(mobile.y + mobile.height).toBeLessThanOrEqual(844)
  await page.screenshot({ path: '/tmp/language-adventure-floating-360-mobile.png' })
  await page.locator('[data-performance-id="debug-toggle"]').click({ clickCount: 5 })
  await expect(canvas).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Show current 360° view', exact: true })).toHaveCount(0)
  expect(errors).toEqual([])
})
