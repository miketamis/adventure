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

// Assertions retry on a backoff schedule, so the time when Playwright notices
// a card can substantially exceed the time when the browser painted it. Start
// at the actual navigation event and observe the complete, visible card across
// a paint opportunity. Keep the host wait as a separate diagnostic, and return
// explicit timeout samples instead of dropping slow or missing cards.
const measureTrainReady = async (page) => {
  await page.evaluate(() => {
    const installedAt = performance.now()
    let startedAt = null
    let frame = null
    let timer = null
    let settled = false
    let resolveMeasurement
    const done = new Promise((resolve) => { resolveMeasurement = resolve })
    const visibleCard = () => {
      const card = document.querySelector('.training-activity-shell')
      if (!card || !card.getClientRects().length || card.closest('[inert], [aria-hidden="true"]')) return null
      if (typeof card.checkVisibility === 'function') {
        return card.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }) ? card : null
      }
      for (let ancestor = card; ancestor; ancestor = ancestor.parentElement) {
        if (Number(getComputedStyle(ancestor).opacity) === 0) return null
      }
      const style = getComputedStyle(card)
      return style.display !== 'none' && style.visibility === 'visible' && Number(style.opacity) > 0 ? card : null
    }
    const finish = (status) => {
      if (settled) return
      settled = true
      cancelAnimationFrame(frame)
      clearTimeout(timer)
      document.removeEventListener('click', onClick, true)
      const observedAt = performance.now()
      resolveMeasurement({
        status,
        readyMs: observedAt - (startedAt ?? installedAt),
        inputAtMs: startedAt,
        observedAtMs: observedAt,
      })
    }
    const inspect = () => {
      const card = visibleCard()
      if (!card) {
        frame = requestAnimationFrame(inspect)
        return
      }
      frame = requestAnimationFrame(() => {
        if (card.isConnected && visibleCard() === card) finish('ready')
        else inspect()
      })
    }
    const onClick = (event) => {
      if (!event.isTrusted || startedAt !== null || !event.target.closest('[data-performance-id="tab:practice"]')) return
      const now = performance.now()
      startedAt = Number.isFinite(event.timeStamp) && Math.abs(event.timeStamp - now) < 60_000
        ? event.timeStamp
        : now
      frame = requestAnimationFrame(inspect)
    }
    document.addEventListener('click', onClick, true)
    timer = setTimeout(() => finish(startedAt === null ? 'missing-input' : 'timeout'), 10_000)
    window.__TRAIN_READY_MEASUREMENT__ = { done, cancel: () => finish('cancelled') }
  })
  const hostStartedAt = performance.now()
  try {
    await navigation(page, '🎯 Train').click()
    const measurement = await page.evaluate(() => window.__TRAIN_READY_MEASUREMENT__.done)
    return { ...measurement, hostWaitMs: performance.now() - hostStartedAt }
  } finally {
    await page.evaluate(() => {
      window.__TRAIN_READY_MEASUREMENT__?.cancel()
      delete window.__TRAIN_READY_MEASUREMENT__
    })
  }
}

test('readiness timing includes loading and waits for a visible interactive card', async ({ page }) => {
  await page.setContent(`
    <nav aria-label="Game sections"><button data-performance-id="tab:practice">🎯 Train</button></nav>
    <main><p role="status">Preparing the next question…</p></main>
  `)
  await page.evaluate(() => {
    window.__READY_FIXTURE_TIMES__ = { insertedAt: null, revealedAt: null }
    document.querySelector('button').addEventListener('click', () => {
      setTimeout(() => {
        document.querySelector('main').innerHTML = '<section inert style="opacity: 0"><div class="training-activity-shell"><button>Answer</button></div></section>'
        window.__READY_FIXTURE_TIMES__.insertedAt = performance.now()
      }, 60)
      setTimeout(() => { document.querySelector('section').inert = false }, 140)
      setTimeout(() => {
        document.querySelector('section').style.opacity = '1'
        window.__READY_FIXTURE_TIMES__.revealedAt = performance.now()
      }, 260)
    })
  })
  const measurement = await measureTrainReady(page)
  const fixture = await page.evaluate(() => window.__READY_FIXTURE_TIMES__)
  expect(measurement.status, JSON.stringify(measurement)).toBe('ready')
  expect(fixture.revealedAt).not.toBeNull()
  expect(measurement.inputAtMs).toBeLessThan(fixture.insertedAt)
  expect(measurement.readyMs).toBeGreaterThanOrEqual(fixture.revealedAt - measurement.inputAtMs)
  expect(measurement.observedAtMs).toBeGreaterThan(fixture.revealedAt)
  await expect(page.locator('.training-activity-shell button')).toBeEnabled()
})

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
  const readiness = []
  for (let index = 0; index < 2; index += 1) {
    const measurement = await measureTrainReady(page)
    readiness.push(measurement)
    await testInfo.attach(`large-learner-readiness-${index + 1}`, { body: JSON.stringify(measurement), contentType: 'application/json' })
    expect(measurement.status, JSON.stringify(measurement)).toBe('ready')
    await expect(page.locator('.training-activity-shell').first()).toBeVisible()
    await navigation(page, '📖 Story').click()
    await expect(page.locator('.card.story')).toBeVisible()
  }
  const snapshot = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  const builds = snapshot.operations.filter(({ kind, id }) => kind === 'train' && id === 'enumerate')
  expect(builds).toHaveLength(2)
  expect(snapshot.operations.filter(({ kind, id }) => kind === 'train' && id === 'materialize')).toHaveLength(2)
  await testInfo.attach('large-learner-timings', { body: JSON.stringify({ words: ids.length, readiness, snapshot }, null, 2), contentType: 'application/json' })
  for (const measurement of readiness) {
    expect(measurement.status, JSON.stringify(measurement)).toBe('ready')
    expect(measurement.readyMs).toBeLessThan(PERFORMANCE_BUDGETS.browserTrainReadyMaxMs)
  }
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
  const readiness = await measureTrainReady(page)
  await testInfo.attach('experienced-learner-readiness', { body: JSON.stringify(readiness), contentType: 'application/json' })
  expect(readiness.status, JSON.stringify(readiness)).toBe('ready')
  await expect(page.locator('.training-activity-shell').first()).toBeVisible()
  const snapshot = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await testInfo.attach('experienced-learner-timings', { body: JSON.stringify({ words: saved.length, readiness, snapshot }, null, 2), contentType: 'application/json' })
  expect(readiness.status, JSON.stringify(readiness)).toBe('ready')
  expect(readiness.readyMs).toBeLessThan(PERFORMANCE_BUDGETS.browserTrainReadyMaxMs)
  for (const { durationMs } of snapshot.operations.filter(({ id }) => id === 'enumerate-slice')) {
    expect(durationMs).toBeLessThan(PERFORMANCE_BUDGETS.browserSteadyOperationMaxMs)
  }
  for (const { durationMs } of snapshot.longTasks) expect(durationMs).toBeLessThan(PERFORMANCE_BUDGETS.browserLongTaskMaxMs)
})
