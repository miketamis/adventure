import { expect, test } from '@playwright/test'
import { DICT, STORY } from '../../src/game/content.js'
import { newRun, reducer } from '../../src/game/gameState.js'
import { isTrainableSense } from '../../src/game/lexicalTrainability.js'
import { PERFORMANCE_BUDGETS } from '../../src/performance.js'
import { prepareTrainQuestion } from '../../src/trainPreparation.js'
import { trainingTargetForOption } from '../../src/game/trainingTarget.js'

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
const readSave = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')))
const goalOption = STORY.start.options.find((option) => !option.confuser && option.text.some(({ id }) => id === 'kalo'))
const goalTarget = trainingTargetForOption('start', goalOption)
const goalControl = (page) => page.locator(`#story-option-start-opt-${STORY.start.options.indexOf(goalOption)}-cost .train-mini`)

// Assertions retry on a backoff schedule, so the time when Playwright notices
// a card can substantially exceed the time when the browser painted it. Start
// at the actual navigation event and observe the complete, visible card across
// a paint opportunity. Keep the host wait as a separate diagnostic, and return
// explicit timeout samples instead of dropping slow or missing cards.
const measureTrainReady = async (page, {
  control = navigation(page, '🎯 Train'),
  inputSelector = '[data-performance-id="tab:practice"]',
  previousCardText = null,
} = {}) => {
  await page.evaluate(({ inputSelector, previousCardText }) => {
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
      if (previousCardText !== null && card.textContent === previousCardText) return null
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
      if (!event.isTrusted || startedAt !== null || !event.target.closest(inputSelector)) return
      const now = performance.now()
      startedAt = Number.isFinite(event.timeStamp) && Math.abs(event.timeStamp - now) < 60_000
        ? event.timeStamp
        : now
      frame = requestAnimationFrame(inspect)
    }
    document.addEventListener('click', onClick, true)
    timer = setTimeout(() => finish(startedAt === null ? 'missing-input' : 'timeout'), 10_000)
    window.__TRAIN_READY_MEASUREMENT__ = { done, cancel: () => finish('cancelled') }
  }, { inputSelector, previousCardText })
  const hostStartedAt = performance.now()
  try {
    await control.click()
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
const installState = (page, profile) => page.addInitScript((state) => {
  if (window.name === '__aventura_large_learner_test__') return
  window.name = '__aventura_large_learner_test__'
  localStorage.setItem('aventura.state.v1', JSON.stringify(state))
  localStorage.setItem('aventura.muted.v1', '1')
  localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
}, profile)

const install = async (page, profile = seed) => {
  await installState(page, profile)
  await page.goto('./')
  await expect(page.locator('.card.story')).toBeVisible()
  await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.reset())
}

const watchLoadingPaints = (page) => page.evaluate(() => {
  window.__WARM_TRAIN_LOADING_PAINTS__ = 0
  window.__WARM_TRAIN_WATCHING__ = true
  const inspect = () => {
    const loading = document.querySelector('.view-fallback') || [...document.querySelectorAll('[role="status"]')]
      .find((node) => node.textContent === 'Preparing the next question…')
    if (loading?.getClientRects().length) window.__WARM_TRAIN_LOADING_PAINTS__ += 1
    if (window.__WARM_TRAIN_WATCHING__) requestAnimationFrame(inspect)
  }
  requestAnimationFrame(inspect)
})

const stopLoadingPaints = (page) => page.evaluate(() => {
  window.__WARM_TRAIN_WATCHING__ = false
  return window.__WARM_TRAIN_LOADING_PAINTS__
})

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
  expect(builds.length).toBeGreaterThan(0)
  expect(snapshot.operations.filter(({ kind, id }) => kind === 'train' && id === 'materialize').length).toBeGreaterThan(0)
  expect(snapshot.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(2)
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

test('cancelling a cold Train opening keeps the source scene and never presents the abandoned card', async ({ page }) => {
  let release
  const waiting = new Promise((resolve) => { release = resolve })
  await page.route('**/PracticeView-*.js', async (route) => {
    await waiting
    await route.continue()
  })
  await install(page)
  await navigation(page, '🎯 Train').click()
  await expect(page.locator('.card.story')).toBeVisible()
  await expect(page.getByText('Preparing the next question…', { exact: true })).toHaveCount(0)
  await expect(page.locator('.view-fallback')).toHaveCount(0)
  const started = performance.now()
  await navigation(page, '📖 Story').click()
  await expect(page.locator('.card.story')).toBeVisible()
  expect(performance.now() - started).toBeLessThan(PERFORMANCE_BUDGETS.browserTrainCancelMaxMs)
  const downloaded = page.waitForResponse((response) => response.url().includes('/PracticeView-'))
  release()
  await downloaded
  await page.waitForFunction(() => window.__AVENTURA_PERFORMANCE__.snapshot().operations.some(({ kind, id }) =>
    kind === 'train' && id === 'materialize'))
  const snapshot = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await expect(page.locator('.card.story')).toBeVisible()
  await expect(page.locator('.training-activity-shell')).toHaveCount(0)
  expect(snapshot.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(0)
  expect(snapshot.interactions.filter(({ control }) => control === 'button:tab:story').every(({ durationMs }) => durationMs < PERFORMANCE_BUDGETS.browserSteadyInteractionMaxMs)).toBe(true)
  await navigation(page, '🎯 Train').click()
  await expect(page.locator('.training-activity-shell').first()).toBeVisible()
  const resumed = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  expect(resumed.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(1)
})

test('background preparation records nothing and a warmed Train opening shows the complete card immediately', async ({ page }, testInfo) => {
  await install(page)
  await page.waitForFunction(() => window.__AVENTURA_PERFORMANCE__.snapshot().operations.some(({ kind, id }) =>
    kind === 'train' && id === 'materialize'))
  const prepared = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await expect(page.locator('.card.story')).toBeVisible()
  await expect(page.locator('.training-activity-shell')).toHaveCount(0)
  expect(prepared.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(0)
  const savedBefore = await page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')))
  expect(savedBefore.trainActivityHistory).toEqual([])
  expect(savedBefore.trainTargetHistory).toEqual([])
  expect(savedBefore.trainRound).toBe(0)

  await watchLoadingPaints(page)
  const readiness = await measureTrainReady(page)
  const loadingPaints = await stopLoadingPaints(page)
  const opened = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await testInfo.attach('warm-learner-readiness', { body: JSON.stringify({ readiness, loadingPaints, prepared, opened }, null, 2), contentType: 'application/json' })
  expect(readiness.status, JSON.stringify(readiness)).toBe('ready')
  expect(readiness.readyMs).toBeLessThan(PERFORMANCE_BUDGETS.browserPreparedTrainReadyMaxMs)
  expect(loadingPaints).toBe(0)
  expect(opened.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(1)
  expect(opened.operations.filter(({ kind, id }) => kind === 'train' && id === 'materialize')).toHaveLength(
    prepared.operations.filter(({ kind, id }) => kind === 'train' && id === 'materialize').length,
  )
})

test('the next activity prepares behind the correction and replaces the completed card only after acknowledgement', async ({ page }, testInfo) => {
  await install(page)
  await page.waitForFunction(() => window.__AVENTURA_PERFORMANCE__.snapshot().operations.some(({ kind, id }) =>
    kind === 'train' && id === 'materialize'))
  await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')))
  // Use the production planner to identify an actually wrong answer in this
  // large fresh-learner fixture; never assume option order implies correctness.
  const { question } = await prepareTrainQuestion({ state: saved })
  expect(question.mode).toBe('cloze')
  const wrong = question.bank.find(({ answerIndex }) => answerIndex === null)
  expect(wrong).toBeTruthy()
  await navigation(page, '🎯 Train').click()
  const card = page.locator('.training-activity-shell')
  await expect(card).toBeVisible()
  await expect(card.getByRole('button', { name: question.correctWord, exact: true })).toBeVisible()
  const before = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  const initialMaterializations = before.operations.filter(({ kind, id }) => kind === 'train' && id === 'materialize').length
  const initialPresentations = before.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED').length
  expect(initialPresentations).toBe(1)
  await watchLoadingPaints(page)
  await card.getByRole('button', { name: wrong.text, exact: true }).click()
  const correction = page.getByRole('dialog')
  await expect(correction).toBeVisible()
  const completedCardText = await card.textContent()
  await page.waitForFunction((count) => window.__AVENTURA_PERFORMANCE__.snapshot().operations.filter(({ kind, id }) =>
    kind === 'train' && id === 'materialize').length > count, initialMaterializations)
  const prepared = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  expect(prepared.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(initialPresentations)
  await expect(correction).toBeVisible()
  await expect(card).toBeVisible()
  expect(await card.textContent()).toBe(completedCardText)
  expect(await card.evaluate((node) => Boolean(node.closest('[inert]')))).toBe(true)
  await expect(card.locator('.answers button:not(:disabled)')).toHaveCount(0)

  const readiness = await measureTrainReady(page, {
    control: correction.getByRole('button', { name: 'Continue training', exact: true }),
    inputSelector: '.heart-consequence button',
    previousCardText: completedCardText,
  })
  const loadingPaints = await stopLoadingPaints(page)
  const continued = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await testInfo.attach('next-activity-readiness', { body: JSON.stringify({ readiness, loadingPaints, prepared, continued }, null, 2), contentType: 'application/json' })
  expect(readiness.status, JSON.stringify(readiness)).toBe('ready')
  expect(readiness.readyMs).toBeLessThan(PERFORMANCE_BUDGETS.browserPreparedTrainReadyMaxMs)
  expect(loadingPaints).toBe(0)
  await expect(correction).toHaveCount(0)
  expect(await card.textContent()).not.toBe(completedCardText)
  expect(continued.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(initialPresentations + 1)
})

test('a warmed story-action handoff reuses the large bank and opens its complete goal card promptly', async ({ page }, testInfo) => {
  await install(page)
  expect(await page.locator('.train-mini').count()).toBeGreaterThanOrEqual(2)
  await page.waitForFunction(() => window.__AVENTURA_PERFORMANCE__.snapshot().operations.some(({ kind, id }) =>
    kind === 'train' && id === 'materialize'))
  const prepared = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await watchLoadingPaints(page)
  const readiness = await measureTrainReady(page, { control: goalControl(page), inputSelector: '.train-mini' })
  const loadingPaints = await stopLoadingPaints(page)
  const opened = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await testInfo.attach('warm-goal-readiness', { body: JSON.stringify({ readiness, loadingPaints, prepared, opened }, null, 2), contentType: 'application/json' })
  expect(readiness.status, JSON.stringify(readiness)).toBe('ready')
  expect(readiness.readyMs).toBeLessThan(PERFORMANCE_BUDGETS.browserPreparedTrainReadyMaxMs)
  expect(loadingPaints).toBe(0)
  expect(opened.operations.filter(({ id }) => id === 'enumerate-slice')).toHaveLength(
    prepared.operations.filter(({ id }) => id === 'enumerate-slice').length,
  )
  expect(opened.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(1)
  await expect.poll(async () => (await readSave(page)).practiceTarget).toEqual(goalTarget)
  const saved = await readSave(page)
  expect(saved.trainGoalSession.target).toEqual(goalTarget)
  expect(saved.trainGoalSession.completedRounds).toBe(0)
  // The scheduling goal is retained in state; its token ledger stays debug-only.
  await expect(page.locator('.train-goal-banner')).toHaveCount(0)
})

test('reloading a saved correction prepares silently and resumes one complete card with the original goal', async ({ page }, testInfo) => {
  await install(page)
  await page.waitForFunction(() => window.__AVENTURA_PERFORMANCE__.snapshot().operations.some(({ kind, id }) =>
    kind === 'train' && id === 'materialize'))
  await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  const source = await readSave(page)
  const goalState = reducer(source, { type: 'BEGIN_OPTION_TRAINING', target: goalTarget })
  expect(goalState.practiceTarget).toEqual(goalTarget)
  const { question } = await prepareTrainQuestion({ state: goalState })
  const labels = question.bank
    ? question.bank.map((tile) => ({ text: tile.text, correct: tile.answerIndex !== null }))
    : question.options.map((id) => ({
      text: question.optionLabels?.[id] || (question.field === 'en' ? DICT[id].enAll ?? DICT[id].en : DICT[id].al),
      correct: id === question.answerId,
    }))
  const wrong = labels.find(({ correct }) => !correct)
  await goalControl(page).click()
  const card = page.locator('.training-activity-shell')
  await expect(card).toBeVisible()
  await expect(card.getByRole('button', { name: labels.find(({ correct }) => correct).text, exact: true })).toBeVisible()
  await card.getByRole('button', { name: wrong.text, exact: true }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect.poll(async () => Boolean((await readSave(page)).pendingHeartConsequence)).toBe(true)
  const beforeReload = await readSave(page)
  expect(beforeReload.practiceTarget).toEqual(goalTarget)
  expect(beforeReload.trainGoalSession.completedRounds).toBe(1)

  await page.reload()
  const correction = page.getByRole('dialog')
  await expect(correction).toBeVisible()
  await page.waitForFunction(() => window.__AVENTURA_PERFORMANCE__.snapshot().operations.some(({ kind, id }) =>
    kind === 'train' && id === 'materialize'))
  const prepared = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await expect(card).toHaveCount(0)
  await expect(page.getByText('Preparing the next question…', { exact: true })).toHaveCount(0)
  expect(prepared.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(0)
  const reloaded = await readSave(page)
  expect(reloaded.pendingHeartConsequence).toEqual(beforeReload.pendingHeartConsequence)
  expect(reloaded.practiceTarget).toEqual(beforeReload.practiceTarget)
  expect(reloaded.trainGoalSession).toEqual(beforeReload.trainGoalSession)
  expect(reloaded.trainActivityHistory).toEqual(beforeReload.trainActivityHistory)
  expect(reloaded.trainTargetHistory).toEqual(beforeReload.trainTargetHistory)

  const readiness = await measureTrainReady(page, {
    control: correction.getByRole('button', { name: 'Continue training', exact: true }),
    inputSelector: '.heart-consequence button',
  })
  const resumed = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await testInfo.attach('saved-correction-readiness', { body: JSON.stringify({ readiness, prepared, resumed }, null, 2), contentType: 'application/json' })
  expect(readiness.status, JSON.stringify(readiness)).toBe('ready')
  expect(readiness.readyMs).toBeLessThan(PERFORMANCE_BUDGETS.browserPreparedTrainReadyMaxMs)
  await expect(correction).toHaveCount(0)
  await expect(card).toHaveCount(1)
  await expect(page.getByText('Preparing the next question…', { exact: true })).toHaveCount(0)
  expect(resumed.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(1)
  await expect.poll(async () => (await readSave(page)).pendingHeartConsequence).toBeNull()
  const after = await readSave(page)
  expect(after.practiceTarget).toEqual(beforeReload.practiceTarget)
  expect(after.trainGoalSession).toEqual(beforeReload.trainGoalSession)
  expect(after.trainRound).toBe(beforeReload.trainRound)
})

test('an optional dialog holds a completed Train card past its advance timer without consuming the next card', async ({ page }, testInfo) => {
  await install(page)
  await page.waitForFunction(() => window.__AVENTURA_PERFORMANCE__.snapshot().operations.some(({ kind, id }) =>
    kind === 'train' && id === 'materialize'))
  await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  const { question } = await prepareTrainQuestion({ state: await readSave(page) })
  expect(question.mode).toBe('cloze')
  await navigation(page, '🎯 Train').click()
  const card = page.locator('.training-activity-shell')
  await card.getByRole('button', { name: question.correctWord, exact: true }).click()
  await expect.poll(async () => (await readSave(page)).trainRound).toBe(1)
  const completedCardText = await card.textContent()
  await page.getByRole('button', { name: '🔒 privacy', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Help improve Aventura Shqip?', exact: true })
  await expect(dialog).toBeVisible()
  await watchLoadingPaints(page)
  // The real successful-answer feedback lasts 1.9 seconds. Keep the dialog
  // open beyond that timer so automatic advance must explicitly defer.
  await page.waitForTimeout(2200)
  const prepared = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  expect(prepared.operations.filter(({ kind, id }) => kind === 'train' && id === 'materialize').length).toBeGreaterThanOrEqual(2)
  expect(prepared.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(1)
  expect(await card.textContent()).toBe(completedCardText)
  expect(await card.evaluate((node) => Boolean(node.closest('[inert]')))).toBe(true)
  await expect(dialog.getByRole('heading', { name: 'Help improve Aventura Shqip?', exact: true })).toBeFocused()
  const readiness = await measureTrainReady(page, {
    control: dialog.getByRole('button', { name: 'Save my choices', exact: true }),
    inputSelector: '[role="dialog"] button',
    previousCardText: completedCardText,
  })
  const loadingPaints = await stopLoadingPaints(page)
  const resumed = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await testInfo.attach('overlay-deferred-next-card', { body: JSON.stringify({ readiness, loadingPaints, prepared, resumed }, null, 2), contentType: 'application/json' })
  expect(readiness.status, JSON.stringify(readiness)).toBe('ready')
  expect(readiness.readyMs).toBeLessThan(PERFORMANCE_BUDGETS.browserPreparedTrainReadyMaxMs)
  expect(loadingPaints).toBe(0)
  expect(resumed.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(2)
  expect((await readSave(page)).trainRound).toBe(1)
})

test('an optional dialog opened during direct Train reload blocks its first card presentation', async ({ page }, testInfo) => {
  const goalState = reducer(seed, { type: 'BEGIN_OPTION_TRAINING', target: goalTarget })
  expect(goalState.view).toBe('practice')
  await installState(page, goalState)
  let release
  const waiting = new Promise((resolve) => { release = resolve })
  await page.route('**/PracticeView-*.js', async (route) => {
    await waiting
    await route.continue()
  })
  await page.goto('./')
  await page.getByRole('button', { name: '🔒 privacy', exact: true }).click()
  const dialog = page.getByRole('dialog', { name: 'Help improve Aventura Shqip?', exact: true })
  await expect(dialog).toBeVisible()
  const downloaded = page.waitForResponse((response) => response.url().includes('/PracticeView-'))
  release()
  await downloaded
  await page.waitForFunction(() => window.__AVENTURA_PERFORMANCE__.snapshot().operations.some(({ kind, id }) =>
    kind === 'train' && id === 'materialize'))
  const prepared = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await expect(page.locator('.training-activity-shell')).toHaveCount(0)
  expect(prepared.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(0)
  await expect(dialog.getByRole('heading', { name: 'Help improve Aventura Shqip?', exact: true })).toBeFocused()
  const readiness = await measureTrainReady(page, {
    control: dialog.getByRole('button', { name: 'Save my choices', exact: true }),
    inputSelector: '[role="dialog"] button',
  })
  const resumed = await page.evaluate(() => window.__AVENTURA_PERFORMANCE__.settle())
  await testInfo.attach('overlay-deferred-first-card', { body: JSON.stringify({ readiness, prepared, resumed }, null, 2), contentType: 'application/json' })
  expect(readiness.status, JSON.stringify(readiness)).toBe('ready')
  expect(readiness.readyMs).toBeLessThan(PERFORMANCE_BUDGETS.browserPreparedTrainReadyMaxMs)
  expect(resumed.operations.filter(({ kind, id }) => kind === 'reducer' && id === 'RECORD_TRAIN_ACTIVITY_PRESENTED')).toHaveLength(1)
  await expect.poll(async () => (await readSave(page)).practiceTarget).toEqual(goalTarget)
  expect((await readSave(page)).trainGoalSession).toEqual(goalState.trainGoalSession)
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
