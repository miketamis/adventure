import { expect, test } from '@playwright/test'
import { STORY } from '../../src/game/content.js'
import { BREAD_PRICE } from '../../src/game/economy.js'
import { newRun, normalizeSavedState, storyLearningTaskForState } from '../../src/game/gameState.js'
import { emptyStoryLearningState } from '../../src/game/storyLearning.js'
import { albanianTextOf, attachReviewedEnglishReadings } from '../../src/game/language.js'
import { audioSlug } from '../../src/game/audio.js'
import { commitProjectedOption, feasibleOptionProjection } from '../../scripts/lib/story-projections.mjs'
import { recordPresentedStoryReadings } from '../../scripts/lib/comprehension-journeys.mjs'
import { testFor } from '../../src/game/comprehension.js'
import { speechChoiceLabelOf } from '../../src/game/speechChoices.js'

const readState = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')))
const install = async (page, input, { muted = true } = {}) => {
  const state = normalizeSavedState(JSON.parse(JSON.stringify({
    ...input, debug: false, practiced: { ...input.practiced, ...input.mana },
  })), newRun())
  await page.addInitScript(({ state, muted }) => {
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    localStorage.setItem('aventura.muted.v1', muted ? '1' : '0')
    localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
    window.__audioPlayCalls = 0
    const original = HTMLMediaElement.prototype.play
    HTMLMediaElement.prototype.play = function (...args) {
      window.__audioPlayCalls++
      return original.apply(this, args)
    }
  }, { state, muted })
  await page.goto('./', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('.story-text')).toBeVisible()
  return state
}
const holdModule = async (page, name) => {
  let release
  let requested = false
  const held = new Promise((resolve) => { release = resolve })
  await page.route(`**/${name}-*.js`, async (route) => {
    requested = true
    await held
    await route.continue()
  })
  return { release, requested: () => requested }
}
const market = () => {
  const purchase = STORY.tregtari.options.find(({ to }) => to === 'blerjaBuke')
  const seed = feasibleOptionProjection('tregtari', purchase)
  return { ...seed, ...emptyStoryLearningState(), mana: {}, inventory: { ...seed.inventory, lek: BREAD_PRICE } }
}
const marketResponse = (page) => page.locator('[id^="learning-source-market-bread-price-"]').first()
  .locator('..').getByRole('button', { name: 'Respond to this passage', exact: true })

test('a cold reading task retains its source and only begins once its prepared card is ready', async ({ page }) => {
  const held = await holdModule(page, 'StoryLearningTask')
  await install(page, market())
  await expect.poll(held.requested).toBe(true)
  await marketResponse(page).click()
  await expect(page.locator('.story-text')).toBeVisible()
  await expect(page.locator('.story-learning-task')).toHaveCount(0)
  await expect(page.getByText(/Loading .*?(task|passage|scene)/i)).toHaveCount(0)
  expect(storyLearningTaskForState(await readState(page), 'market-bread-price')?.episode).toBeFalsy()
  held.release()
  await expect(page.locator('.story-learning-task')).toBeVisible()
  await expect.poll(async () => Boolean(storyLearningTaskForState(await readState(page), 'market-bread-price')?.episode)).toBe(true)
})

test('leaving a source while its task downloads cancels the pending reading action', async ({ page }) => {
  const held = await holdModule(page, 'StoryLearningTask')
  await install(page, market())
  await expect.poll(held.requested).toBe(true)
  await marketResponse(page).click()
  await page.getByRole('button', { name: '📚 Dictionary', exact: true }).click()
  await expect.poll(async () => (await readState(page))?.view).toBe('dictionary')
  held.release()
  await page.getByRole('button', { name: '📖 Story', exact: true }).click()
  await expect(page.locator('.story-text')).toBeVisible()
  await expect(page.locator('.story-learning-task')).toHaveCount(0)
  expect(storyLearningTaskForState(await readState(page), 'market-bread-price')?.episode).toBeFalsy()
})

test('a cold character choice opens only with its exact source record already available', async ({ page }) => {
  const option = STORY.pylli1.options.find(({ become }) => become === 'legjenda-e-prespes')
  const held = await holdModule(page, 'legjenda-e-prespes')
  await install(page, feasibleOptionProjection('pylli1', option))
  await expect.poll(held.requested).toBe(true)
  await page.getByRole('button', { name: `Choose: ${albanianTextOf(option.text)}`, exact: true }).click()
  await expect(page.locator('.story-text')).toBeVisible()
  await expect(page.locator('.embodiment-confirm')).toHaveCount(0)
  expect((await readState(page)).pendingEmbodiment).toBeFalsy()
  held.release()
  const confirmation = page.locator('.embodiment-confirm')
  await expect(confirmation).toBeVisible()
  await expect(confirmation).toHaveAttribute('aria-busy', 'false')
  await expect(confirmation.locator('.embodiment-sources')).toBeVisible()
  await expect(confirmation.getByRole('button', { name: /^🎭 / })).toBeEnabled()
  expect((await readState(page)).embodying).toBeNull()
  expect(await page.evaluate(() => window.__audioPlayCalls)).toBe(0)
})

test('available complete action recordings prepare silently before the first click', async ({ page }) => {
  const option = STORY.start.options.find(({ to, confuser }) => to === 'fshatiLumi' && !confuser)
  const surface = albanianTextOf(option.text)
  const requests = []
  page.on('request', (request) => requests.push(request.url()))
  const seed = await install(page, feasibleOptionProjection('start', option), { muted: false })
  await expect.poll(() => requests.some((url) => url.endsWith('/audio/action-timings.json'))).toBe(true)
  await expect.poll(() => requests.some((url) => url.endsWith(`/audio/${audioSlug(surface)}.mp3`))).toBe(true)
  expect(await page.evaluate(() => window.__audioPlayCalls)).toBe(0)
  await expect(page.locator('.action-karaoke-overlay')).toHaveCount(0)
  const current = await readState(page)
  expect({ nodeId: current.nodeId, turn: current.turn, mana: current.mana }).toEqual({ nodeId: seed.nodeId, turn: seed.turn, mana: seed.mana })
  await page.getByRole('button', { name: `Choose: ${surface}`, exact: true }).click()
  await expect(page.locator('.action-karaoke-overlay')).toBeVisible()
  expect((await readState(page)).nodeId).toBe(seed.nodeId)
  await expect.poll(() => page.evaluate(() => window.__audioPlayCalls)).toBeGreaterThan(0)
})

test('a cold ending reading retains the consequence and builds its exact questions after reviewed metadata arrives', async ({ page }) => {
  const [{ REVIEWED_READINGS }, { ACHIEVEMENT_BY_ID }] = await Promise.all([
    import('../../src/game/data/readings/reviewedReadings.js'),
    import('../../src/game/achievements.js'),
  ])
  attachReviewedEnglishReadings(STORY, REVIEWED_READINGS)
  const option = STORY.prespaPyll.options.find(({ to }) => to === 'prespaLiri')
  const approach = feasibleOptionProjection('prespaPyll', option)
  approach.practiced = { ...approach.practiced, ...approach.mana }
  const ending = recordPresentedStoryReadings(commitProjectedOption(recordPresentedStoryReadings(approach), option))
  const held = await holdModule(page, 'reviewedReadings')
  const seed = await install(page, ending)
  const before = await page.locator('.story-text').innerText()
  await expect.poll(held.requested).toBe(true)
  const take = page.getByRole('button', { name: 'Take the reading check →', exact: true })
  await expect(take).toBeEnabled()
  await take.click()
  await expect(page.locator('.story-text')).toHaveText(before, { useInnerText: true })
  await expect(page.locator('.comp-quiz')).toHaveCount(0)
  await expect(page.getByText(/Preparing the reading/)).toHaveCount(0)
  held.release()
  await expect(page.locator('.comp-quiz')).toBeVisible()
  const question = testFor(ACHIEVEMENT_BY_ID.prespaLiri, 0, seed)[0]
  await expect(page.locator('.comp-al')).toHaveText(question.albanian)
  expect(await page.locator('.comp-quiz .answers button').allTextContents()).toEqual(question.options)
})

test('a cold accepted time jump retains its inert source and commits once after the complete passage loads', async ({ page }) => {
  const nodeId = 'binoshetLuftaZgjat'
  const option = STORY[nodeId].options.find(({ timePassage }) => timePassage)
  const otherOption = STORY[nodeId].options.find(({ timePassage, confuser }) => !timePassage && !confuser)
  const approach = feasibleOptionProjection(nodeId, option)
  const other = feasibleOptionProjection(nodeId, otherOption)
  approach.discovered = { ...approach.discovered, ...other.discovered }
  approach.mana = { ...approach.mana, ...other.mana }
  const held = await holdModule(page, 'TimePassage')
  const seed = await install(page, approach)
  await expect.poll(held.requested).toBe(true)
  await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.reset())
  const source = await page.locator('.story-text').innerText()
  await page.getByRole('button', { name: `Choose: ${albanianTextOf(option.text)}`, exact: true }).click()
  await expect(page.locator('.story-text')).toHaveText(source, { useInnerText: true })
  await expect(page.locator('.app-main')).toHaveAttribute('inert', '')
  await expect(page.locator('.time-passage')).toHaveCount(0)
  await expect(page.getByText('Preparing the next story beat…', { exact: true })).toHaveCount(0)
  expect((await readState(page)).nodeId).toBe(nodeId)
  expect((await readState(page)).timePassage).toBeNull()
  expect(await page.evaluate(() => window.__audioPlayCalls)).toBe(0)
  // Inert blocks real input. Also exercise the dispatch guard through the
  // already-rendered control so a stale callback cannot replace this action.
  const otherLabel = [speechChoiceLabelOf(otherOption), albanianTextOf(otherOption.text)].filter(Boolean).join(' ')
  await page.getByRole('button', { name: `Choose: ${otherLabel}`, exact: true, includeHidden: true })
    .evaluate((button) => button.click())
  expect((await readState(page)).turn).toBe(seed.turn)
  held.release()
  await expect(page.locator('.time-passage')).toBeVisible()
  await expect.poll(async () => (await readState(page)).nodeId).toBe(option.to)
  const committed = await readState(page)
  expect(committed.turn).toBe(seed.turn + 1)
  expect(committed.timePassage).toBeTruthy()
  expect(await page.evaluate(() => window.__audioPlayCalls)).toBe(0)
  const measurements = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.snapshot())
  expect(measurements.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'CHOOSE')).toHaveLength(1)
})
