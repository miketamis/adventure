import { expect, test } from '@playwright/test'

const monitorSnapshot = (page) => page.evaluate(() => window.__AVENTURA_PERFORMANCE__.snapshot())
const settleMonitor = (page) => page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
const resetMonitor = (page, keepCoverage = true) => page.evaluate(
  (keep) => window.__AVENTURA_PERFORMANCE__.reset({ keepCoverage: keep }),
  keepCoverage,
)

const click = async (page, name) => {
  const control = page.getByRole('button', { name, exact: true })
  await expect(control).toHaveCount(1)
  await control.click()
}

const assertSteadyBudgets = (snapshot, { interactionMaxMs } = {}) => {
  const budgets = snapshot.budgets
  const maximumInteraction = Math.max(0, ...snapshot.interactions.map(({ durationMs }) => durationMs))
  const maximumOperation = Math.max(0, ...snapshot.operations
    .filter(({ kind }) => kind !== 'react-commit')
    .map(({ durationMs }) => durationMs))
  const maximumLongTask = Math.max(0, ...snapshot.longTasks.map(({ durationMs }) => durationMs))
  expect(maximumInteraction, JSON.stringify(snapshot.interactionControls, null, 2))
    .toBeLessThanOrEqual(interactionMaxMs || budgets.browserSteadyInteractionMaxMs)
  expect(maximumOperation, JSON.stringify(snapshot.operationGroups, null, 2))
    .toBeLessThanOrEqual(budgets.browserSteadyOperationMaxMs)
  expect(maximumLongTask, JSON.stringify(snapshot.longTasks, null, 2))
    .toBeLessThanOrEqual(budgets.browserLongTaskMaxMs)
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })
  await page.goto('./')
  await expect(page.getByRole('heading', { name: 'Aventura Shqip · learn Albanian', exact: true })).toBeVisible()
  await settleMonitor(page)
})

test('normal play stays responsive across every primary surface and modal shell', async ({ page }) => {
  // Load each lazy primary surface once; budgets below measure steady player
  // interaction rather than the one-time network boundary.
  await click(page, '🎯 Train')
  await click(page, '📚 Dictionary')
  await click(page, '📖 Story')
  await settleMonitor(page)
  await resetMonitor(page)

  await click(page, '🎯 Train')
  await click(page, '📚 Dictionary')
  await click(page, '📖 Story')
  await click(page, '🔊 sound')
  await click(page, '🔒 privacy')
  await expect(page.getByRole('dialog', { name: 'Help improve Aventura Shqip?', exact: true })).toBeVisible()
  await click(page, 'Save my choices')
  await settleMonitor(page)

  const snapshot = await monitorSnapshot(page)
  expect(snapshot.interactions.length).toBeGreaterThanOrEqual(5)
  expect(snapshot.operations.some(({ kind }) => kind === 'reducer')).toBe(true)
  expect(snapshot.operations.some(({ kind }) => kind === 'persistence')).toBe(true)
  for (const surface of ['header', 'navigation', 'story', 'practice', 'dictionary']) {
    expect(snapshot.surfacesSeen.includes(surface), `missing ${surface} coverage`).toBe(true)
  }
  assertSteadyBudgets(snapshot)
})

test('core story discovery and Train answer paths stay inside the interaction budget', async ({ page }) => {
  await resetMonitor(page)
  const undiscoveredWords = page.locator('main button.token.gloss')
  // A recognition card needs enough saved senses to build reviewed,
  // incompatible choices. Save a small opening-scene bank through the real
  // player control rather than injecting game state into storage.
  for (let index = 0; index < 6; index += 1) {
    await expect(undiscoveredWords).not.toHaveCount(0)
    await undiscoveredWords.first().click()
  }
  const discoverySnapshot = await settleMonitor(page)
  expect(discoverySnapshot.interactions.some(({ surface }) => surface === 'story')).toBe(true)
  expect(discoverySnapshot.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'DISCOVER'))
    .toHaveLength(6)
  assertSteadyBudgets(discoverySnapshot)

  await click(page, '🎯 Train')
  const answers = page.locator('.training-activity-shell .answers button')
  await expect(answers).not.toHaveCount(0)
  await settleMonitor(page)
  await resetMonitor(page)

  await answers.first().click()
  const answerSnapshot = await settleMonitor(page)
  expect(answerSnapshot.interactions.some(({ surface }) => surface === 'practice')).toBe(true)
  expect(answerSnapshot.operations.some(({ kind }) => kind === 'reducer')).toBe(true)
  assertSteadyBudgets(answerSnapshot)
})

test('debug map does not re-render for unrelated primary-surface clicks', async ({ page }) => {
  const title = page.locator('h1.title')
  await expect(title).toHaveCount(1)
  for (let count = 0; count < 5; count += 1) await title.click()
  await expect(page.getByRole('button', { name: '🗺 Map', exact: true })).toBeVisible()

  // Warm the debug-only minimap and primary lazy chunks, then measure the same
  // navigation path that used to commit the complete SVG map every time.
  await click(page, '🎯 Train')
  await click(page, '📚 Dictionary')
  await click(page, '📖 Story')
  await settleMonitor(page)
  await resetMonitor(page)

  await click(page, '🎯 Train')
  await click(page, '📚 Dictionary')
  await click(page, '📖 Story')
  await settleMonitor(page)

  const snapshot = await monitorSnapshot(page)
  expect(snapshot.interactions.length).toBeGreaterThanOrEqual(3)
  expect(snapshot.surfacesSeen.includes('debug-minimap')).toBe(true)
  assertSteadyBudgets(snapshot)
})

test('the debug console exposes live performance diagnostics', async ({ page }) => {
  const title = page.locator('h1.title')
  await expect(title).toHaveCount(1)
  for (let count = 0; count < 5; count += 1) await title.click()
  await click(page, '🛠 Debug')
  await click(page, '⏱ Performance')

  await expect(page.getByRole('heading', { name: 'Interaction performance', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Reset measurements', exact: true })).toBeVisible()
  const snapshot = await settleMonitor(page)
  expect(snapshot.surfacesSeen.includes('debug-performance')).toBe(true)
})
