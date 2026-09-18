import { expect, test } from '@playwright/test'
import { STORY } from '../../src/game/content.js'
import { albanianTextOf } from '../../src/game/language.js'
import { canChoose, currentStoryState, newRun, normalizeSavedState, reducer } from '../../src/game/gameState.js'
import { speechChoiceLabelOf } from '../../src/game/speechChoices.js'
import { checkKordhaGjizarCausality } from '../../scripts/lib/kordha-gjizar-causality-tests.mjs'

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

const readState = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')))
const settled = async (page, predicate) => {
  await expect.poll(async () => predicate(await readState(page))).toBe(true)
  return readState(page)
}
const chooseName = (option) => `Choose: ${[speechChoiceLabelOf(option), albanianTextOf(option.text)].filter(Boolean).join(' ')}`
const visibleAlbanian = (page) => page.locator('.story-text .story-line').evaluateAll((lines) => lines.map((line) =>
  [...line.children].filter((element) => element.classList.contains('token'))
    .map((element) => element.querySelector('.known-word')?.textContent || element.textContent)
    .join(' ').replace(/\s+([,.;:!?])/g, '$1')).join('\n'))
const discoverVisibleWords = async (page) => {
  const unknown = page.locator('.story-text button.token.gloss')
  for (let remaining = 160; remaining > 0 && await unknown.count(); remaining--) await unknown.first().click()
  await expect(unknown).toHaveCount(0)
}
const normalAnswerBoundary = async (page) => {
  await expect(page.locator('.story-reading, .option-reading, .scene-density-debug')).toHaveCount(0)
  await expect(page.getByRole('button', { name: '🗺 Map', exact: true })).toHaveCount(0)
  await expect(page.getByRole('button', { name: /^Choose: Tell the truth\.?$/ })).toHaveCount(0)
  await expect(page.getByRole('button', { name: /Choose:.*How did you take the bird/i })).toHaveCount(0)
}

test('Gjizar asks before the final answer and preserves the question across a public-road detour and reload on a phone', async ({ page }) => {
  // This executes every real helper/flight/theft/agreement/rescue action. It
  // does not manufacture plot flags, role ownership or a completed reading.
  const journeys = checkKordhaGjizarCausality((_name, run) => run())
  const seed = normalizeSavedState(JSON.parse(JSON.stringify(journeys.choicePoints.get('gjizar-question'))), newRun())
  const answer = STORY.gjizarAnija.options[0]
  const roadExit = STORY.gjizar1.options.find((option) => !option.confuser && option.to === 'fshatiDil')
  expect(seed.nodeId).toBe('gjizarAnija')
  expect(seed.ended).toBeNull()
  expect(seed.debug).toBe(false)
  expect(seed.eligible.gjizarFund).toBeUndefined()
  expect(canChoose(currentStoryState(seed), answer)).toBe(true)
  const pausedProjection = reducer(seed, { type: 'PAUSE_EMBODIMENT' })
  expect(pausedProjection.nodeId).toBe('gjizar1')
  expect(canChoose(pausedProjection, roadExit)).toBe(true)
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  // Consent stays local and disabled; no research or feedback is submitted.
  await page.route(/https?:\/\/[^/]*(?:posthog|clarity|google-analytics|googletagmanager)[^/]*\//i, (route) => route.abort())
  await page.addInitScript((state) => {
    if (window.name === '__gjizar_question_seed__') return
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    localStorage.setItem('aventura.muted.v1', '1')
    localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
    window.name = '__gjizar_question_seed__'
  }, seed)
  await page.goto('./')
  const choice = page.getByRole('button', { name: chooseName(answer), exact: true })
  await expect(choice).toBeVisible()
  await expect(choice).toHaveAttribute('aria-disabled', 'false')
  await expect(choice).toHaveAccessibleName(chooseName(answer))
  await discoverVisibleWords(page)
  const question = 'Në anije, Bukura të pyet: si e ke marrë zogun? thuaj të drejtën.'
  expect(await visibleAlbanian(page)).toContain(question)
  expect(await visibleAlbanian(page)).not.toMatch(/ti i tregon Bukurës|unë do të martohem|dasma vjen/)
  await expect(page.locator('.ending-name, .comp-quiz')).toHaveCount(0)
  await normalAnswerBoundary(page)
  await page.screenshot({ path: '/tmp/gjizar-question-phone.png', fullPage: true })
  const before = await settled(page, (state) => state?.nodeId === 'gjizarAnija' && state.discovered?.pyet)

  await page.getByRole('button', { name: 'Explore public roads for now', exact: true }).click()
  const paused = await settled(page, (state) => state?.nodeId === 'gjizar1' && state.embodimentPaused)
  expect(paused.embodimentFocusNode).toBe('gjizarAnija')
  expect(paused.embodimentClock).toBe(before.embodimentClock)
  expect(paused.eligible.gjizarFund).toBeUndefined()
  await page.getByRole('button', { name: chooseName(roadExit), exact: true }).click()
  const explored = await settled(page, (state) => state?.nodeId === 'fshatiDil' && state.embodimentPaused)
  expect(explored.clock).toBeGreaterThan(before.clock)
  expect(explored.embodimentClock).toBe(before.embodimentClock)
  await page.reload()
  await expect(page.getByRole('button', { name: 'Step back into the tale', exact: true })).toBeVisible()
  const reloaded = await settled(page, (state) => state?.nodeId === 'fshatiDil' && state.embodimentPaused)
  expect(reloaded.clock).toBe(explored.clock)
  expect(reloaded.embodimentFocusNode).toBe('gjizarAnija')
  await page.getByRole('button', { name: 'Step back into the tale', exact: true }).click()
  await expect(choice).toBeVisible()
  const resumed = await settled(page, (state) => state?.nodeId === 'gjizarAnija' && !state.embodimentPaused)
  expect(resumed.clock).toBe(explored.clock)
  expect(resumed.embodimentClock).toBe(before.embodimentClock)
  expect(resumed.cameFrom).toBe(before.cameFrom)
  expect(resumed.choiceIndex).toBe(before.choiceIndex)
  expect(await visibleAlbanian(page)).toContain(question)
  expect(await visibleAlbanian(page)).not.toMatch(/ti i tregon Bukurës|unë do të martohem|dasma vjen/)
  await normalAnswerBoundary(page)
  await expect(page.locator('.action-karaoke-overlay')).toHaveCount(0)

  await choice.click()
  const ending = await settled(page, (state) => state?.nodeId === 'gjizarFund' && state.ended === 'secret')
  expect(ending.cameFrom).toBe('gjizarAnija')
  expect(ending.choiceIndex).toBe(0)
  expect(ending.clock).toBe(resumed.clock)
  expect(ending.eligible.gjizarFund).toBe(true)
  expect(ending.earned.gjizarFund).toBeUndefined()
  await expect(page.locator('.ending .verdict')).toHaveText('📖 Tale complete')
  await expect(page.locator('.ending-name')).toHaveText('Gjizar the Nightingale')
  await expect(page.locator('.comp-quiz')).toHaveCount(0)
  await discoverVisibleWords(page)
  const finalProse = await visibleAlbanian(page)
  expect(finalProse).toContain('ti i tregon Bukurës të drejtën për zogun.')
  expect(finalProse).toContain('unë do të martohem me ty. pastaj dasma vjen.')
  await normalAnswerBoundary(page)
  await page.reload()
  await expect(page.locator('.ending-name')).toHaveText('Gjizar the Nightingale')
  await expect(page.locator('.action-karaoke-overlay')).toHaveCount(0)
  await page.screenshot({ path: '/tmp/gjizar-ending-phone.png', fullPage: true })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  // Debug may identify the source-backed ship, but neither atlas can assign
  // the real accepted answer a guessed world position or route mesh.
  await page.locator('[data-performance-id="debug-toggle"]').click({ clickCount: 5 })
  await page.getByRole('button', { name: '🗺 Map', exact: true }).click()
  const atlas = page.getByTestId('world3d-view')
  await expect(atlas).toContainText('Story setting: the Beauty’s ship. No world coordinates or route mesh are assigned.')
  await expect(page.locator('.world3d-id')).toHaveText('site-context:gjizar-beauty-ship')
  await expect(page.getByRole('combobox', { name: '3D survey mode' })).toHaveValue('references')
  await expect(page.locator('.world3d-inspector')).toContainText('Reference display position')
  await page.getByRole('button', { name: '2D illustrated map', exact: true }).click()
  const map = page.locator('.atlas-view .dbg-map')
  await expect(map).toContainText('the Beauty’s ship')
  await expect(map).toContainText('No current-position marker is shown.')
  await expect(map.locator('[data-map-id="gjizarAnija"], [data-map-id="gjizarFund"]')).toHaveCount(0)
  await page.reload()
  await expect(page.getByTestId('world3d-view')).toContainText('Story setting: the Beauty’s ship.')
  await expect(page.locator('.world3d-id')).toHaveText('site-context:gjizar-beauty-ship')
  expect(errors).toEqual([])
})
