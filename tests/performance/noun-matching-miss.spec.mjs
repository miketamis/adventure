import { expect, test } from '@playwright/test'
import { STORY } from '../../src/game/content.js'
import { reviewedFormTargets } from '../../src/game/formInventory.js'
import { newRun, normalizeSavedState, reducer } from '../../src/game/gameState.js'
import { buildWordQuestion } from '../../src/game/wordPractice.js'
import { trainingTargetForOption } from '../../src/game/trainingTarget.js'
import { beginTrainActionGoalSession, TRAIN_ACTION_GOAL_POLICY } from '../../src/game/trainActionGoal.js'
import { trainExposureKeysForQuestion } from '../../src/game/trainHealthPolicy.js'

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })

const forms = reviewedFormTargets('plak')
const form = forms.find(({ role }) => role === 'defNom')
const readSave = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')))

function matchingSeed(exposed) {
  let state = newRun()
  for (const id of new Set(forms.flatMap(({ context }) => context?.requires || []))) {
    state = reducer(state, { type: 'DISCOVER', id })
  }
  state = {
    ...state, trainRound: 10,
    wordProgress: { ...state.wordProgress, plak: {
      wins: { 'meaning-recognition': 2 }, activeFormKey: form.key,
      formProofs: { [form.key]: { wins: { 'reviewed-form-contrast': 1, 'grammatical-form-odd-one-out': 1 } } },
    } },
  }
  // A real story hand-off with its other word funded makes the production
  // scheduler select this noun's eligible matching activity deterministically.
  const option = STORY.mali3.options.find((entry) => !entry.confuser && entry.text.some(({ id }) => id === 'plak'))
  for (const id of option.text.map(({ id }) => id).filter((id) => id && id !== 'plak')) {
    state = reducer(state, { type: 'DISCOVER', id })
    const q = buildWordQuestion({
      discoveredIds: Object.keys(state.discovered), targetId: id,
      wordProgress: state.wordProgress, currentRound: state.trainRound, rng: () => 0.2,
    })
    state = reducer(state, {
      type: 'PRACTICE_WORD_RESULT', correct: true, id,
      tier: q.tier, mode: q.mode, direction: q.dir, wordStageId: q.wordStageId,
      variantId: q.variantId, targetFormKey: q.targetFormKey, aspectTargets: q.aspectTargets,
      questionKey: q.questionKey, wordKeys: [],
    })
  }
  const question = buildWordQuestion({
    discoveredIds: Object.keys(state.discovered), targetId: 'plak',
    wordProgress: state.wordProgress, currentRound: state.trainRound, rng: () => 0.2,
  })
  state = {
    ...state, nodeId: 'mali3', view: 'practice', trainCorrectCombo: 8,
    practiceTarget: trainingTargetForOption('mali3', option),
    trainLastWords: [], trainActivityHistory: [], trainTargetHistory: [],
    trainStageExposures: exposed
      ? Object.fromEntries(trainExposureKeysForQuestion(question).map((key) => [key, 1]))
      : {},
  }
  state.trainGoalSession = {
    ...beginTrainActionGoalSession(state, state.practiceTarget),
    activitiesSinceGoalOpportunity: TRAIN_ACTION_GOAL_POLICY.maximumNonGoalActivitiesBeforeForcedOpportunity,
  }
  return normalizeSavedState(state, newRun())
}

for (const exposed of [false, true]) {
  test(`noun matching miss opens correction and resumes on a phone (${exposed ? 'heart loss' : 'protected'})`, async ({ page }) => {
    const seed = matchingSeed(exposed)
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.route('**/*', (route) => new URL(route.request().url()).hostname === '127.0.0.1'
      ? route.continue() : route.abort())
    await page.addInitScript((state) => {
      localStorage.setItem('aventura.state.v1', JSON.stringify(state))
      localStorage.setItem('aventura.muted.v1', '1')
      localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
    }, seed)
    await page.goto('./')
    const board = page.locator('.noun-form-match-exercise')
    await expect(board).toBeVisible()
    const contexts = board.getByRole('group', { name: 'Albanian noun uses' })
    const jobs = board.getByRole('group', { name: 'Grammatical jobs' })
    const first = contexts.getByRole('button').first()
    const firstText = (await first.innerText()).trim()
    const correctFirst = forms.find(({ context }) => context?.al === firstText)
    expect(correctFirst).toBeTruthy()
    await first.click()
    await jobs.getByRole('button', { name: correctFirst.roleLabel, exact: true }).click()
    await expect(board.getByRole('status')).toHaveText('1 of 5 matched')
    const second = contexts.locator('button:not(:disabled)').first()
    const secondText = (await second.innerText()).trim()
    const target = forms.find(({ context }) => context?.al === secondText)
    expect(target).toBeTruthy()
    await second.click()
    const wrong = jobs.locator('button:not(:disabled)').filter({ hasNotText: target.roleLabel }).first()
    const wrongLabel = await wrong.innerText()
    await wrong.click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    await expect(dialog).toContainText(secondText)
    await expect(dialog).toContainText(wrongLabel)
    await expect(dialog).toContainText(target.roleLabel)
    await expect.poll(async () => (await readSave(page))?.trainRound).toBe(seed.trainRound + 1)
    const saved = await readSave(page)
    expect(saved.hearts).toBe(seed.hearts - (exposed ? 1 : 0))
    expect(saved.trainCorrectCombo).toBe(0)
    expect(saved.pendingHeartConsequence.source).toBe('train-noun-form-matching')
    await dialog.getByRole('button', { name: 'Continue training', exact: true }).click()
    await expect(dialog).toHaveCount(0)
    await expect(board).toHaveCount(0)
    await expect(page.locator('.training-activity-shell')).toBeVisible()
    expect((await readSave(page)).pendingHeartConsequence).toBeNull()
    expect(errors).toEqual([])
  })
}
