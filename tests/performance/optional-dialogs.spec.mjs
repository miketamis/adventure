import { expect, test } from '@playwright/test'
import { STORY } from '../../src/game/content.js'
import { newRun, normalizeSavedState } from '../../src/game/gameState.js'
import { albanianTextOf } from '../../src/game/language.js'
import { feasibleOptionProjection } from '../../scripts/lib/story-projections.mjs'

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
  test(`${spec.chunk} keeps play visible until its complete dialog is ready`, async ({ page }) => {
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
    await expect.poll(() => requests).toBe(1)
    const trigger = page.getByRole('button', { name: spec.button, exact: true })
    await trigger.click()
    const dialog = page.getByRole('dialog', { name: spec.title, exact: true })
    await expect(dialog).toHaveCount(0)
    await expect(page.locator('#story-scene-title')).toBeVisible()
    await expect(page.locator('.app-main')).not.toHaveAttribute('inert', '')
    await expect(trigger).toBeFocused()
    await expect(page.getByText('Opening…', { exact: true })).toHaveCount(0)
    release()
    await expect(dialog.getByRole('button', { name: spec.ready, exact: true })).toBeVisible()
    await expect(dialog.getByRole('heading', { name: spec.title, exact: true })).toBeFocused()
    await expect(page.getByRole('dialog')).toHaveCount(1)
    await expect(page.locator('.app-main')).toHaveAttribute('inert', '')
    const controls = dialog.locator('button:not([disabled]), input:not([disabled]), textarea:not([disabled])')
    await controls.first().focus()
    await page.keyboard.press('Shift+Tab')
    await expect(controls.last()).toBeFocused()
    await page.keyboard.press('Tab')
    await expect(controls.first()).toBeFocused()
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

  test(`${spec.chunk} can cancel pending opening without changing consent or submitting`, async ({ page }) => {
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
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(trigger).toBeFocused()
    const downloaded = page.waitForResponse((response) => response.url().includes(`/${spec.chunk}-`))
    release()
    await downloaded
    await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
    await expect(page.getByRole('dialog')).toHaveCount(0)
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

  test(`${spec.chunk} arriving during accepted speech cannot interrupt or replay the action`, async ({ page }) => {
    const option = STORY.start.options.find(({ to, confuser }) => to === 'fshatiLumi' && !confuser)
    const approach = feasibleOptionProjection('start', option)
    approach.practiced = { ...approach.practiced, ...approach.mana }
    const seed = normalizeSavedState(JSON.parse(JSON.stringify(approach)), newRun())
    await page.addInitScript((state) => {
      localStorage.setItem('aventura.state.v1', JSON.stringify(state))
      localStorage.setItem('aventura.muted.v1', '0')
      window.__actionPlayCalls = 0
      const original = HTMLMediaElement.prototype.play
      HTMLMediaElement.prototype.play = function (...args) {
        window.__actionPlayCalls++
        return original.apply(this, args)
      }
    }, seed)
    let release
    const held = new Promise((resolve) => { release = resolve })
    await page.route(`**/${spec.chunk}-*.js`, async (route) => {
      await held
      await route.continue()
    })
    await page.goto('./')
    await expect(page.locator('#story-scene-title')).toBeVisible()
    const trigger = page.getByRole('button', { name: spec.button, exact: true })
    await trigger.click()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await page.getByRole('button', { name: `Choose: ${albanianTextOf(option.text)}`, exact: true }).click()
    await expect(page.locator('.action-karaoke-overlay')).toBeVisible()
    await expect.poll(() => page.evaluate(() => window.__actionPlayCalls)).toBe(1)
    const downloaded = page.waitForResponse((response) => response.url().includes(`/${spec.chunk}-`))
    release()
    await downloaded
    await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
    await expect(page.getByRole('dialog', { name: spec.title, exact: true })).toHaveCount(0)
    await expect(page.locator('.action-karaoke-overlay')).toBeVisible()
    await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')).nodeId)).toBe(option.to)
    await expect(page.locator('.action-karaoke-overlay')).toHaveCount(0)
    expect(await page.evaluate(() => window.__actionPlayCalls)).toBe(1)
    // Cancellation applies only to that old request; a fresh explicit opening
    // still works once the accepted phrase has finished and committed.
    await trigger.click()
    await expect(page.getByRole('dialog', { name: spec.title, exact: true })).toBeVisible()
    await page.keyboard.press('Escape')
    expect(await page.evaluate(() => window.__actionPlayCalls)).toBe(1)
  })
}
