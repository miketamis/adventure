import { expect, test } from '@playwright/test'
import { DICT } from '../../src/game/content.js'
import { newRun } from '../../src/game/gameState.js'
import { isTrainableSense } from '../../src/game/lexicalTrainability.js'
import { PERFORMANCE_BUDGETS } from '../../src/performance.js'

// The opening-scene smoke tests cannot expose work that grows with a saved
// vocabulary. Include the entire public trainable bank and a travelled run.
const ids = Object.keys(DICT).filter(isTrainableSense)
const seed = {
  ...newRun(),
  discovered: Object.fromEntries(ids.map((id) => [id, true])),
  wordExposure: Object.fromEntries(ids.map((id) => [id, { total: 20, story: 20, 'phrase-co-exposure': 0 }])),
  wordExposureReceipts: Object.fromEntries(Array.from({ length: 5000 }, (_, index) => [`story:1:start:${index + 2}`, 'story'])),
}

const navigation = (page, name) => page.getByRole('navigation', { name: 'Game sections' })
  .getByRole('button', { name, exact: true })

// Measure until a playable card exists, not merely until the loading shell
// paints. Event Timing alone used to pass despite an eight-second card build.
const install = async (page, profile = seed) => {
  await page.addInitScript((state) => {
    localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    localStorage.setItem('aventura.muted.v1', '1')
    localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
  }, profile)
  await page.goto('./')
  await expect(page.locator('.card.story')).toBeVisible()
  await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.reset())
}

test('a large learner can open new activities without a growing main-thread freeze', async ({ page }, testInfo) => {
  await install(page)
  const readyMs = []
  for (let index = 0; index < 2; index += 1) {
    const start = performance.now()
    await navigation(page, '🎯 Train').click()
    await expect(page.locator('.training-activity-shell').first()).toBeVisible()
    readyMs.push(performance.now() - start)
    await navigation(page, '📖 Story').click()
    await expect(page.locator('.card.story')).toBeVisible()
  }
  const snapshot = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  const builds = snapshot.operations.filter(({ kind, id }) => kind === 'train' && id === 'enumerate')
  expect(builds).toHaveLength(2)
  expect(snapshot.operations.filter(({ kind, id }) => kind === 'train' && id === 'materialize')).toHaveLength(2)
  await testInfo.attach('large-learner-timings', { body: JSON.stringify({ words: ids.length, readyMs, snapshot }, null, 2), contentType: 'application/json' })
  for (const duration of readyMs) expect(duration).toBeLessThan(PERFORMANCE_BUDGETS.browserTrainReadyMaxMs)
  for (const { durationMs } of builds) expect(durationMs).toBeLessThan(PERFORMANCE_BUDGETS.browserTrainReadyMaxMs)
  for (const { durationMs } of snapshot.operations.filter(({ id }) => id === 'enumerate-slice')) {
    expect(durationMs).toBeLessThan(snapshot.budgets.browserSteadyOperationMaxMs)
  }
  for (const { durationMs } of snapshot.longTasks) expect(durationMs).toBeLessThan(snapshot.budgets.browserLongTaskMaxMs)
  // Saving and opted-out telemetry must not hide a second large pause after
  // the card appears, even with thousands of passive exposure receipts.
  for (const { durationMs } of snapshot.operations.filter(({ kind }) => ['persistence', 'analytics', 'reducer'].includes(kind))) {
    expect(durationMs).toBeLessThan(snapshot.budgets.browserSteadyOperationMaxMs)
  }
})

test('leaving Train during a large build stays responsive and cancels the unseen question', async ({ page }) => {
  await install(page)
  await navigation(page, '🎯 Train').click()
  await expect(page.getByText('Preparing the next question…', { exact: true })).toBeVisible()
  const started = performance.now()
  await navigation(page, '📖 Story').click()
  await expect(page.locator('.card.story')).toBeVisible()
  expect(performance.now() - started).toBeLessThan(PERFORMANCE_BUDGETS.browserTrainCancelMaxMs)
  const snapshot = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  expect(snapshot.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(0)
  expect(snapshot.interactions.filter(({ control }) => control === 'button:tab:story').every(({ durationMs }) => durationMs < PERFORMANCE_BUDGETS.browserSteadyInteractionMaxMs)).toBe(true)
  await navigation(page, '🎯 Train').click()
  await expect(page.locator('.training-activity-shell').first()).toBeVisible()
  const resumed = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  expect(resumed.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(1)
})

test('experienced learners build mixed matching proposals without a long pause', async ({ page }, testInfo) => {
  const saved = ids.slice(0, 500)
  // A supported legacy proof shape: exact meaning-recognition evidence and
  // its backed rewards. Vary strength so a full mixed matching board is legal.
  await install(page, {
    ...seed,
    discovered: Object.fromEntries(saved.map((id) => [id, true])),
    practiced: Object.fromEntries(saved.map((id, index) => [id, 2 + index % 8])),
    wordProgress: Object.fromEntries(saved.map((id, index) => [id, {
      wins: { 'meaning-recognition': 2 + index % 8 },
      contextWins: {}, formProofs: {}, strictWins: 0, dueAfterRound: 0,
    }])),
  })
  const started = performance.now()
  await navigation(page, '🎯 Train').click()
  await expect(page.locator('.training-activity-shell').first()).toBeVisible()
  const readyMs = performance.now() - started
  const snapshot = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await testInfo.attach('experienced-learner-timings', { body: JSON.stringify({ words: saved.length, readyMs, snapshot }, null, 2), contentType: 'application/json' })
  expect(readyMs).toBeLessThan(PERFORMANCE_BUDGETS.browserTrainReadyMaxMs)
  for (const { durationMs } of snapshot.operations.filter(({ id }) => id === 'enumerate-slice')) {
    expect(durationMs).toBeLessThan(PERFORMANCE_BUDGETS.browserSteadyOperationMaxMs)
  }
  for (const { durationMs } of snapshot.longTasks) expect(durationMs).toBeLessThan(PERFORMANCE_BUDGETS.browserLongTaskMaxMs)
})
