import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.route('**/*', (route) => new URL(route.request().url()).hostname === '127.0.0.1'
    ? route.fallback()
    : route.abort())
  await page.addInitScript(() => {
    localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({
      version: 1, decided: true, structured: true, replay: false,
    }))
  })
})

const dialogPersistence = (page) => page.evaluate(() => Object.fromEntries(
  Object.entries(localStorage).filter(([key]) =>
    key === 'aventura.analytics-consent.v1' || key.startsWith('aventura.playtest-feedback.v1:')),
))

const dialogs = [
  {
    chunk: 'AnalyticsPreferencesModal', button: '🔒 privacy',
    title: 'Help improve Aventura Shqip?', ready: 'Save my choices',
  },
  {
    chunk: 'PlaytestFeedbackModal', button: '💬 feedback',
    title: 'How is the journey feeling?', ready: 'Not now',
  },
]

for (const spec of dialogs) {
  test(`${spec.chunk} loads on demand and keeps focus through a delayed body`, async ({ page }) => {
    let release
    const waiting = new Promise((resolve) => { release = resolve })
    let requests = 0
    await page.route(`**/${spec.chunk}-*.js`, async (route) => {
      requests += 1
      await waiting
      await route.continue()
    })
    await page.goto('./')
    await expect(page.locator('#story-scene-title')).toBeVisible()
    expect(requests).toBe(0)
    const trigger = page.getByRole('button', { name: spec.button, exact: true })
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: spec.title, exact: true })
    await expect(dialog.getByRole('status')).toHaveText('Opening…')
    await expect(dialog.getByRole('heading', { name: spec.title, exact: true })).toBeFocused()
    await expect(page.locator('.app-main')).toHaveAttribute('inert', '')
    await page.keyboard.press('Tab')
    await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeFocused()
    release()
    await expect(dialog.getByRole('button', { name: spec.ready, exact: true })).toBeVisible()
    await expect(dialog.getByRole('heading', { name: spec.title, exact: true })).toBeFocused()
    await expect(page.getByRole('dialog')).toHaveCount(1)
    await page.keyboard.press('Escape')
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
    await trigger.click()
    await expect(dialog.getByRole('button', { name: spec.ready, exact: true })).toBeVisible()
    await dialog.getByRole('button', { name: spec.ready, exact: true }).click()
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
    expect(requests).toBe(1)
  })

  test(`${spec.chunk} can close while loading without changing consent or submitting`, async ({ page }) => {
    let release
    const waiting = new Promise((resolve) => { release = resolve })
    await page.route(`**/${spec.chunk}-*.js`, async (route) => {
      await waiting
      await route.continue()
    })
    await page.goto('./')
    await expect(page.locator('#story-scene-title')).toBeVisible()
    const before = await dialogPersistence(page)
    const trigger = page.getByRole('button', { name: spec.button, exact: true })
    await trigger.click()
    await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).click()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(trigger).toBeFocused()
    release()
    expect(await dialogPersistence(page)).toEqual(before)
    await expect(page.locator('.app-main')).not.toHaveAttribute('inert', '')
  })

  test(`${spec.chunk} failed download stays dismissible without changing consent or submitting`, async ({ page }) => {
    await page.route(`**/${spec.chunk}-*.js`, (route) => route.abort('failed'))
    await page.goto('./')
    await expect(page.locator('#story-scene-title')).toBeVisible()
    const before = await dialogPersistence(page)
    const trigger = page.getByRole('button', { name: spec.button, exact: true })
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: spec.title, exact: true })
    await expect(dialog.getByRole('heading', { name: 'This part of the journey could not open' })).toBeFocused()
    await expect(page.locator('.app-main')).toHaveAttribute('inert', '')
    await dialog.getByRole('button', { name: 'Close', exact: true }).click()
    await expect(dialog).toHaveCount(0)
    await expect(trigger).toBeFocused()
    expect(await dialogPersistence(page)).toEqual(before)
    await expect(page.locator('#story-scene-title')).toBeVisible()
  })
}
