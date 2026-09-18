import { expect, test } from '@playwright/test'
import { STORY } from '../../src/game/content.js'
import { newRun, normalizeSavedState, reducer } from '../../src/game/gameState.js'
import { ordinaryTalePauseContexts } from '../../scripts/lib/tale-pause-affordance-tests.mjs'

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
const readState = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')))

for (const [nodeId, reached] of ordinaryTalePauseContexts()) {
  test(`${nodeId} keeps an ordinary Pause and resumes its exact waiting scene after reload`, async ({ page }) => {
    // These saves follow accepted threshold, role, story and travel actions;
    // no role, inventory, arrival or plot flag is manufactured here.
    const seed = normalizeSavedState(JSON.parse(JSON.stringify(reached)), newRun())
    expect(seed.debug).toBe(false)
    expect(STORY[nodeId].options.filter((option) => !option.confuser).every((option) => option.reveal)).toBe(true)
    const expectedPause = reducer(seed, { type: 'PAUSE_EMBODIMENT' })
    expect(expectedPause.embodimentPaused).toBe(true)
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.route(/https?:\/\/[^/]*(?:posthog|clarity|google-analytics|googletagmanager)[^/]*\//i, (route) => route.abort())
    await page.addInitScript((state) => {
      if (window.name === '__tale_pause_seed__') return
      localStorage.clear()
      sessionStorage.clear()
      localStorage.setItem('aventura.state.v1', JSON.stringify(state))
      localStorage.setItem('aventura.muted.v1', '1')
      localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
      window.name = '__tale_pause_seed__'
    }, seed)
    await page.goto('./')
    const pause = page.getByRole('button', { name: 'Explore public roads for now', exact: true })
    const resume = page.getByRole('button', { name: 'Step back into the tale', exact: true })
    await expect(pause).toBeVisible()
    await expect(pause).toBeEnabled()
    await expect(page.locator('.story-reading, .option-reading, .scene-density-debug')).toHaveCount(0)
    await pause.click()
    await expect(resume).toBeVisible()
    await expect.poll(async () => (await readState(page))?.embodimentPaused).toBe(true)
    const paused = await readState(page)
    expect(paused.nodeId).toBe(expectedPause.nodeId)
    expect(paused.embodimentFocusNode).toBe(nodeId)
    expect(paused.clock).toBe(seed.clock)
    expect(paused.embodimentClock).toBe(seed.embodimentClock)
    await page.reload()
    await expect(resume).toBeVisible()
    await resume.click()
    await expect(pause).toBeVisible()
    await expect.poll(async () => (await readState(page))?.nodeId).toBe(nodeId)
    const resumed = await readState(page)
    expect(resumed.embodimentPaused).toBe(false)
    for (const key of ['cameFrom', 'choiceIndex', 'cameFromPhase', 'clock', 'embodimentClock'])
      expect(resumed[key], `${nodeId}: ${key}`).toEqual(seed[key])
    expect(resumed.eligible).toEqual(seed.eligible)
    await expect(page.locator('.story-reading, .option-reading, .scene-density-debug')).toHaveCount(0)
    expect(errors).toEqual([])
  })
}
