import { expect, test } from '@playwright/test'
import { STORY } from '../../src/game/content.js'
import { BREAD_PRICE } from '../../src/game/economy.js'
import { emptyStoryLearningState } from '../../src/game/storyLearning.js'
import { albanianTextOf } from '../../src/game/language.js'
import { isTrainableSense } from '../../src/game/lexicalTrainability.js'
import { newRun, normalizeSavedState, storyLearningTaskForState } from '../../src/game/gameState.js'
import { commitProjectedOption, feasibleOptionProjection, seedOptionProjection, settleProjectedState } from '../../scripts/lib/story-projections.mjs'

const readState = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')))
const durable = async (page, predicate) => {
  await expect.poll(async () => predicate(await readState(page))).toBe(true)
  return readState(page)
}
const world = (state) => ({
  nodeId: state.nodeId, clock: state.clock, hearts: state.hearts,
  inventory: state.inventory, worldFacts: state.worldFacts, rendezvous: state.rendezvous,
})
const install = async (page, input, name) => {
  expect(input).toBeTruthy()
  // Authoring projections supply only the physical approach and saved words.
  // The browser begins and answers a fresh encounter through actual controls.
  const seed = normalizeSavedState(JSON.parse(JSON.stringify({
    ...input, ...emptyStoryLearningState(), mana: {}, debug: false,
  })), newRun())
  await page.addInitScript(({ state, marker }) => {
    if (window.name === marker) return
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    localStorage.setItem('aventura.muted.v1', '1')
    localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({
      version: 1, decided: true, structured: false, replay: false,
    }))
    window.name = marker
  }, { state: seed, marker: `__story_learning_${name}__` })
  await page.goto('./')
  await expect(page.locator('.story-learning-source').first()).toBeVisible()
  return seed
}
const openTask = async (page, encounterId) => {
  // Each source block links to its own card even if the word-discovery route
  // gate has not revealed the associated physical action yet.
  const source = page.locator(`[id^="learning-source-${encounterId}-"]`).first()
  await expect(source).toBeVisible()
  await expect(source.locator('.token')).toHaveCount(0)
  await source.locator('..').getByRole('button', { name: 'Respond to this passage', exact: true }).click()
  await expect(page.locator('.story-learning-task')).toBeVisible()
  const saved = await durable(page, (state) => Boolean(state && storyLearningTaskForState(state, encounterId)?.episode))
  return storyLearningTaskForState(saved, encounterId)
}
const selectResponse = async (page, task, { wrongSlot = null } = {}) => {
  for (const question of task.questions) {
    const choice = question.choices.find(({ id }) => wrongSlot === question.id
      ? !question.acceptedChoiceIds.includes(id) : question.acceptedChoiceIds.includes(id))
    await page.locator('.story-learning-task').getByRole('group', { name: question.prompt, exact: true })
      .getByRole('radio', { name: choice.label || albanianTextOf(choice.tokens), exact: true }).check()
  }
  await page.getByRole('button', { name: 'Check my response', exact: true }).click()
}
const expectNormalTask = async (page) => {
  await expect(page.locator('.story-learning-task .training-activity-debug-meta')).toHaveCount(0)
  await expect(page.locator('.story-reading')).toHaveCount(0)
  await expect(page.getByRole('button', { name: '🗺 Map', exact: true })).toHaveCount(0)
}

test('the live market reading authorizes one canonical purchase with no word-token charge', async ({ page }, testInfo) => {
  const purchase = STORY.tregtari.options.find(({ to }) => to === 'blerjaBuke')
  const approach = feasibleOptionProjection('tregtari', purchase)
  approach.inventory.lek = BREAD_PRICE
  await install(page, approach, 'market')
  const task = await openTask(page, 'market-bread-price')
  await expectNormalTask(page)
  await page.locator('.story-learning-task').screenshot({ path: testInfo.outputPath('market-response.png') })
  const before = await readState(page)
  await selectResponse(page, task)
  await expect(page.locator('.story-learning-complete')).toBeVisible()
  const interpreted = await durable(page, (state) => storyLearningTaskForState(state, task.id)?.episode?.phase === 'complete')
  expect(world(interpreted)).toEqual(world(before))
  expect(interpreted.mana).toEqual({})
  await page.getByRole('button', { name: '🔇 muted', exact: true }).click()
  await page.locator('.story-learning-complete').getByRole('button', { name: albanianTextOf(purchase.text), exact: true }).click()
  await expect(page.locator('.action-karaoke-overlay')).toBeVisible()
  await expect(page.locator('[id^="learning-source-market-bread-price-"]')).toBeVisible()
  await expect(page.locator('[inert]')).toHaveCount(1)
  expect(world(await readState(page))).toEqual(world(interpreted))
  const bought = await durable(page, (state) => state?.nodeId === 'blerjaBuke')
  expect(bought.inventory.lek || 0).toBe(0)
  expect(bought.inventory.buke).toBe((before.inventory.buke || 0) + 1)
  await page.reload()
  const reloaded = await durable(page, (state) => state?.nodeId === 'blerjaBuke')
  expect(reloaded.inventory).toEqual(normalizeSavedState(bought, newRun()).inventory)
  await expect(page.locator('.action-karaoke-overlay')).toHaveCount(0)
})

test('source word help records support before discovery and unlocks a hidden purchase without replaying passive exposure', async ({ page }) => {
  const purchase = STORY.tregtari.options.find(({ to }) => to === 'blerjaBuke')
  const approach = feasibleOptionProjection('tregtari', purchase)
  Object.assign(approach, { discovered: {}, practiced: {}, wordProgress: {}, mana: {} })
  approach.inventory.lek = BREAD_PRICE
  await install(page, approach, 'market-help')
  await expect(page.getByRole('button', { name: `Choose: ${albanianTextOf(purchase.text)}`, exact: true })).toHaveCount(0)
  const source = page.locator('[id^="learning-source-market-bread-price-"]').first()
  await source.locator('..').getByRole('button', { name: 'Get word help for this Albanian passage', exact: true }).click()
  await expect(page.locator('.story-learning-help')).toBeVisible()
  const supported = await durable(page, (state) => storyLearningTaskForState(state, 'market-bread-price')?.episode?.supportIds.includes('word-help'))
  expect(storyLearningTaskForState(supported, 'market-bread-price').episode.supported).toBe(true)
  const unknown = page.locator('.story-learning-help button.token.gloss')
  for (let remaining = 64; remaining > 0 && await unknown.count(); remaining--) await unknown.first().click()
  await expect(unknown).toHaveCount(0)
  await expect(page.getByRole('button', { name: `Choose: ${albanianTextOf(purchase.text)}`, exact: true })).toBeVisible()
  const sourceIds = storyLearningTaskForState(supported, 'market-bread-price').sourceLines
    .flatMap((line) => line.filter((token) => token.id && isTrainableSense(token.id)).map((token) => token.id))
  const ready = await durable(page, (state) => sourceIds.every((id) => state?.discovered?.[id]))
  const receiptPrefix = 'story-task-choices:'
  expect(Object.keys(ready.wordExposureReceipts).filter((key) => key.startsWith(receiptPrefix))).toHaveLength(1)
  await page.reload()
  await expect(page.locator('.story-learning-help')).toBeVisible()
  const restored = await durable(page, (state) => Boolean(storyLearningTaskForState(state, 'market-bread-price')?.episode))
  expect(restored.wordExposure).toEqual(ready.wordExposure)
  expect(Object.keys(restored.wordExposureReceipts).filter((key) => key.startsWith(receiptPrefix))).toHaveLength(1)
  const task = storyLearningTaskForState(restored, 'market-bread-price')
  await selectResponse(page, task)
  await expect(page.locator('.story-learning-complete button')).toBeEnabled()
  const completed = await durable(page, (state) => storyLearningTaskForState(state, task.id)?.episode?.phase === 'complete')
  expect(completed.storyLearningEvidence[task.id].firstResult.mode).toBe('supported')
  expect(completed.nodeId).toBe('tregtari')
  expect(completed.inventory.lek).toBe(BREAD_PRICE)
})

test('insufficient market money explains the physical lock and keeps help and leaving available', async ({ page }) => {
  const purchase = STORY.tregtari.options.find(({ to }) => to === 'blerjaBuke')
  const approach = feasibleOptionProjection('tregtari', purchase)
  Object.assign(approach, { discovered: {}, practiced: {}, wordProgress: {}, mana: {} })
  approach.inventory.lek = BREAD_PRICE - 1
  await install(page, approach, 'market-poor')
  const before = await readState(page)
  await openTask(page, 'market-bread-price')
  await expect(page.locator('.story-learning-task')).toContainText('more lek')
  await expect(page.getByRole('button', { name: 'Check my response', exact: true })).toBeDisabled()
  await expect(page.locator('.story-learning-task .train-mini')).toHaveCount(0)
  await page.getByRole('button', { name: 'Back to the scene', exact: true }).click()
  await expect(page.locator('.story-learning-task')).toHaveCount(0)
  expect(world(await readState(page))).toEqual(world(before))
  await expect(page.locator('.options')).toBeVisible()
})

test('the printed guest request stays supported and muted optional audio never blocks a response', async ({ page }) => {
  const response = STORY.sofraMikut2.options.find((option) => option.effects?.some((effect) => effect.id === 'gaveGuestBread'))
  expect(response).toBeTruthy()
  await install(page, feasibleOptionProjection('sofraMikut2', response), 'guest-request')
  const task = await openTask(page, 'guest-bread-request')
  expect(task.episode.supported).toBe(true)
  const audioBefore = task.episode.audioCompletions
  await expect(page.getByRole('button', { name: 'Listen to the request', exact: true })).toBeDisabled()
  await expect(page.locator('.story-learning-task')).toContainText('You can answer from the printed request.')
  await expectNormalTask(page)
  const before = await readState(page)
  await selectResponse(page, task)
  await expect(page.locator('.story-learning-complete')).toBeVisible()
  const completed = await durable(page, (state) => storyLearningTaskForState(state, task.id)?.episode?.phase === 'complete')
  const episode = storyLearningTaskForState(completed, task.id).episode
  expect(episode.supported).toBe(true)
  expect(episode.audioCompletions).toEqual(audioBefore)
  expect(world(completed)).toEqual(world(before))
  await page.locator('.story-learning-complete button').click()
  const answered = await durable(page, (state) => state?.flags?.gaveGuestBread === true)
  expect(answered.nodeId).toBe('sofraMikut2')
  expect(answered.inventory).toEqual(before.inventory)
})

for (const encounter of [
  { id: 'guest-water-news', nodeId: 'sofraMikut2', to: 'sofraVendimPlaka', expectedActions: 2 },
  { id: 'elira-later-meeting', nodeId: 'bisedaKroi', to: 'start', expectedActions: 1 },
]) {
  test(`${encounter.id} retains a correct detail through explained repair and commits only the chosen action`, async ({ page }) => {
    const action = STORY[encounter.nodeId].options.find(({ to }) => to === encounter.to)
    let approach
    if (encounter.id === 'guest-water-news') {
      const news = STORY.sofraMikut2.options.find((option) => albanianTextOf(option.text) === 'a ke ndonjë lajm?')
      expect(news).toBeTruthy()
      approach = seedOptionProjection(settleProjectedState(commitProjectedOption(feasibleOptionProjection('sofraMikut2', news), news)), action)
    } else {
      const later = STORY.bisedaUra3.options.find(({ to }) => to === 'bisedaKroi')
      approach = seedOptionProjection(settleProjectedState(commitProjectedOption(feasibleOptionProjection('bisedaUra3', later), later)), action)
    }
    await install(page, approach, encounter.id)
    let task = await openTask(page, encounter.id)
    const before = await readState(page)
    expect(task.questions).toHaveLength(2)
    await selectResponse(page, task, { wrongSlot: task.questions[1].id })
    await expect(page.locator('.story-learning-feedback')).toBeVisible()
    const failed = await durable(page, (state) => storyLearningTaskForState(state, task.id)?.episode?.phase === 'feedback')
    expect(world(failed)).toEqual(world(before))
    expect(failed.pendingHeartConsequence).toBeNull()
    await page.reload()
    await expect(page.locator('.story-learning-feedback')).toBeVisible()
    await page.getByRole('button', { name: 'Try the response again', exact: true }).click()
    const repaired = await durable(page, (state) => storyLearningTaskForState(state, task.id)?.episode?.phase === 'answering')
    task = storyLearningTaskForState(repaired, encounter.id)
    expect(task.episode.supported).toBe(true)
    const preserved = task.questions[0].choices.find(({ id }) => task.questions[0].acceptedChoiceIds.includes(id))
    await expect(page.locator('.story-learning-task').getByRole('radio', {
      name: preserved.label || albanianTextOf(preserved.tokens), exact: true,
    })).toBeChecked()
    await selectResponse(page, task)
    await expect(page.locator('.story-learning-complete button')).toHaveCount(encounter.expectedActions)
    const complete = await durable(page, (state) => storyLearningTaskForState(state, task.id)?.episode?.phase === 'complete')
    expect(world(complete)).toEqual(world(before))
    await expectNormalTask(page)
    const next = page.locator('.story-learning-complete button').filter({ hasText: albanianTextOf(action.text) })
    await expect(next).toHaveCount(1)
    await expect(next).toBeEnabled()
    await next.click()
    const arrived = await durable(page, (state) => state?.nodeId === encounter.to)
    if (encounter.id === 'elira-later-meeting') {
      expect(arrived.rendezvous.eliraSquare).toBeTruthy()
      expect(arrived.nodeId).toBe('start')
      expect(arrived.clock).toBe(before.clock)
    }
  })
}

for (const resolved of [false, true]) {
  test(`a ${resolved ? 'resolved' : 'restored'} water save retires the old response permission and keeps its history`, async ({ page }) => {
    const id = 'guest-water-news'
    const opinion = STORY.sofraMikut2.options[8]
    const approach = { ...feasibleOptionProjection('sofraMikut2', opinion), worldFacts: {} }
    await install(page, approach, `water-changed-${resolved}`)
    const task = await openTask(page, id)
    await selectResponse(page, task, { wrongSlot: 'problem' })
    await expect(page.locator('.story-learning-feedback')).toBeVisible()
    await page.getByRole('button', { name: 'Try the response again', exact: true }).click()
    const repair = await durable(page, (state) => storyLearningTaskForState(state, id)?.episode?.phase === 'answering')
    await selectResponse(page, storyLearningTaskForState(repair, id))
    await expect(page.locator('.story-learning-complete')).toBeVisible()
    const completed = await durable(page, (state) => storyLearningTaskForState(state, id)?.episode?.phase === 'complete')
    const oldAttempt = storyLearningTaskForState(completed, id).episode.attemptId
    const changed = { ...completed, worldFacts: { ...completed.worldFacts,
      villageWellsRestored: true, ...(resolved ? { kulshedraDefeated: true } : {}) } }
    await page.evaluate((state) => localStorage.setItem('aventura.state.v1', JSON.stringify(state)), changed)
    await page.reload()
    await expect(page.locator('.story-learning-task')).toHaveCount(0)
    const restored = await durable(page, (state) => state?.storyLearningScene === null)
    expect(restored.storyLearningEvidence).toEqual(completed.storyLearningEvidence)
    await expectNormalTask(page)
    if (resolved) {
      await expect(page.locator(`[id^="learning-source-${id}-"]`)).toHaveCount(0)
      await expect(page.locator('[id^="learning-source-guest-bread-request-"]')).toHaveCount(1)
      await expect(page.getByRole('button', { name: `Choose: ${albanianTextOf(opinion.text)}`, exact: true })).toHaveCount(0)
    } else {
      await expect(page.locator(`#learning-source-${id}-news-restored-unknown`)).toBeVisible()
      const fresh = await openTask(page, id)
      expect(fresh.episode.attemptId).not.toBe(oldAttempt)
      expect(fresh.episode.supportIds).toContain('correction')
      await expect(page.locator('.story-learning-task input:checked')).toHaveCount(0)
      await selectResponse(page, fresh)
      const practiced = await durable(page, (state) => storyLearningTaskForState(state, id)?.episode?.phase === 'complete')
      expect(practiced.storyLearningEvidence[id].firstResult).toEqual(completed.storyLearningEvidence[id].firstResult)
      expect(practiced.storyLearningEvidence[id].independentCorrect).toBe(0)
    }
  })
}
