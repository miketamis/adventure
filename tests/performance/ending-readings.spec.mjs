import { expect, test } from '@playwright/test'
import { STORY } from '../../src/game/content.js'
import { ACHIEVEMENT_BY_ID } from '../../src/game/achievements.js'
import { testFor } from '../../src/game/comprehension.js'
import { canChoose, newRun, normalizeSavedState, reducer, storyScenePresentationForState } from '../../src/game/gameState.js'
import { buildWordQuestion } from '../../src/game/wordPractice.js'
import { albanianTextOf, attachReviewedEnglishReadings } from '../../src/game/language.js'
import { REVIEWED_READINGS } from '../../src/game/data/readings/reviewedReadings.js'
import { storyReadingLineForId } from '../../src/game/storyReadings.js'
import { recordPresentedStoryReadings } from '../../scripts/lib/comprehension-journeys.mjs'
import {
  commitProjectedOption,
  feasibleOptionProjection,
} from '../../scripts/lib/story-projections.mjs'

attachReviewedEnglishReadings(STORY, REVIEWED_READINGS)

const ENDING_ID = 'prespaLiri'
const achievement = ACHIEVEMENT_BY_ID[ENDING_ID]
const readSave = (page) => page.evaluate(() => JSON.parse(window.localStorage.getItem('aventura.state.v1')))
const settleSave = async (page, predicate) => {
  await expect.poll(async () => predicate(await readSave(page))).toBe(true)
  return readSave(page)
}
const normalBoundary = async (page) => {
  await expect(page.getByRole('button', { name: /^🏆 Achievements/ })).toHaveCount(0)
  await expect(page.getByRole('button', { name: '🗺 Map', exact: true })).toHaveCount(0)
  await expect(page.locator('.story-reading, .option-reading')).toHaveCount(0)
}
const openRevisit = async (page, { retry = false } = {}) => {
  const disclosure = page.locator('details.reading-checks')
  await expect(disclosure).toBeVisible()
  if (await disclosure.getAttribute('open') === null) await disclosure.locator('summary').click()
  const button = disclosure.getByRole('button', {
    name: `${achievement.title}${retry ? ' — retry' : ''}`, exact: true,
  })
  await expect(button).toBeEnabled()
  await button.click()
  await expect(page.locator('.comp-quiz')).toBeVisible()
}

test('an accepted ending reveals its consequence before an optional, durable normal-play reading check', async ({ page }) => {
  // Seed an actually projectable approach, with receipts checked by the real
  // reducer. The visible UI performs the ending choice and records its ending.
  // Muting exercises the production pipeline's non-blocking audio path.
  const enterOption = STORY.pylli1.options.find(({ to }) => to === 'prespaPyll')
  const leaveOption = STORY.prespaPyll.options.find(({ to }) => to === ENDING_ID)
  const approach = recordPresentedStoryReadings(feasibleOptionProjection('pylli1', enterOption))
  const entered = recordPresentedStoryReadings(commitProjectedOption(approach, enterOption))
  const discovered = reducer(entered, { type: 'DISCOVER', id: 'le' })
  // Supply the one action token through its real recognition builder/reducer,
  // so save normalization preserves a backed prerequisite rather than a grant.
  const wordQuestion = buildWordQuestion({
    discoveredIds: ['le'], wordProgress: discovered.wordProgress,
    currentRound: discovered.trainRound, excludeWords: [], rng: () => 0.2,
  })
  expect(wordQuestion?.answerId).toBe('le')
  const prepared = reducer(discovered, {
    type: 'PRACTICE_WORD_RESULT', correct: true, id: wordQuestion.answerId,
    tier: wordQuestion.tier, mode: wordQuestion.mode, direction: wordQuestion.dir,
    wordStageId: wordQuestion.wordStageId, variantId: wordQuestion.variantId,
    targetFormKey: wordQuestion.targetFormKey, aspectTargets: wordQuestion.aspectTargets,
    questionKey: wordQuestion.questionKey, wordKeys: wordQuestion.lexicalSurfaces,
  })
  const seed = normalizeSavedState(JSON.parse(JSON.stringify(prepared)), newRun())
  expect(canChoose(seed, leaveOption)).toBe(true)
  expect(seed.nodeId).toBe('prespaPyll')
  expect(seed.embodying).toBe('legjenda-e-prespes')
  expect(seed.debug).toBe(false)
  expect(seed.earned[ENDING_ID]).toBeUndefined()
  expect(seed.achievementReadings?.[ENDING_ID]).toBeUndefined()
  await page.addInitScript((state) => {
    if (window.name === '__aventura_ending_reading_test__') return
    window.localStorage.clear()
    window.sessionStorage.clear()
    window.localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    window.localStorage.setItem('aventura.muted.v1', '1')
    window.localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({
      version: 1, decided: true, structured: false, replay: false,
    }))
    window.name = '__aventura_ending_reading_test__'
  }, seed)
  await page.goto('./')
  await expect(page.getByRole('heading', { name: 'Aventura Shqip · learn Albanian', exact: true })).toBeVisible()
  await normalBoundary(page)

  await page.getByRole('button', { name: `Choose: ${albanianTextOf(leaveOption.text)}`, exact: true }).click()
  await expect(page.locator('.ending .verdict')).toHaveText('📖 Tale complete')
  await expect(page.locator('.comp-quiz')).toHaveCount(0)
  const endingSave = await settleSave(page, (state) =>
    state?.nodeId === ENDING_ID && Boolean(state.achievementReadings?.[ENDING_ID]))
  expect(endingSave.earned[ENDING_ID]).toBeUndefined()
  expect(endingSave.flags.prespaMarriageAccepted).toBeUndefined()
  const normalLines = storyScenePresentationForState(endingSave).normalEntries.map(({ line }) => albanianTextOf(line))
  expect(normalLines).toContain('ti lë Nereida. Nereida shkon në pyll.')
  await expect(page.locator('.story-text .story-line')).toHaveCount(normalLines.length)

  // Word discovery is ordinary interaction, with no check/pass/reward. Once
  // those local glosses are opened, every projected consequence is Albanian.
  const undiscovered = page.locator('.story-text button.token.gloss')
  for (let remaining = 64; remaining > 0 && await undiscovered.count(); remaining--) {
    await undiscovered.first().click()
  }
  await expect(undiscovered).toHaveCount(0)
  const visibleAlbanian = await page.locator('.story-text .story-line').evaluateAll((lines) => lines.map((line) =>
    [...line.children].filter((element) => element.classList.contains('token'))
      .map((element) => element.querySelector('.known-word')?.textContent || element.textContent)
      .join(' ').replace(/\s+([,.;!?])/g, '$1')))
  expect(visibleAlbanian).toEqual(normalLines)
  await normalBoundary(page)
  await expect(page.getByRole('button', { name: 'Take the reading check →', exact: true })).toBeEnabled()
  await expect(page.locator('.comp-quiz')).toHaveCount(0)

  const archive = endingSave.achievementReadings[ENDING_ID]
  const recordedLines = archive.lineIds.map((id) => albanianTextOf(storyReadingLineForId(id)))
  expect(recordedLines).toEqual(expect.arrayContaining(normalLines))
  expect(recordedLines.some((line) => line.includes('a do të martohesh me mua'))).toBe(false)
  expect(recordedLines.some((line) => line.includes('eja me mua në dasmë'))).toBe(false)

  // Skip the optional assessment, return from the role, then reload. The
  // normal Story disclosure must keep the exact experienced passage available.
  await page.getByRole('button', { name: '🚶 Back to the world →', exact: true }).click()
  await expect(page.locator('details.reading-checks summary')).toHaveText('Revisit a reading')
  const returned = await settleSave(page, (state) => state?.nodeId !== ENDING_ID && !state.embodying)
  expect(returned.achievementReadings[ENDING_ID]).toEqual(archive)
  expect(returned.earned[ENDING_ID]).toBeUndefined()
  await page.reload()
  await normalBoundary(page)
  await expect(page.locator('details.reading-checks')).toBeVisible()
  const reloaded = await settleSave(page, (state) => Boolean(state?.achievementReadings?.[ENDING_ID]))
  expect(reloaded.achievementReadings[ENDING_ID]).toEqual(archive)
  await expect(page.locator('.comp-quiz')).toHaveCount(0)
  await openRevisit(page)

  const question = testFor(achievement, 0, reloaded)[0]
  await expect(page.locator('.comp-al')).toHaveText(question.albanian)
  expect(question.sourceLineIds.every((id) => archive.lineIds.includes(id))).toBe(true)
  const offeredAnswers = await page.locator('.comp-quiz .answers button').allTextContents()
  expect(offeredAnswers).toEqual(question.options)

  // Loading Debug after a check opens must neither change its questions nor
  // invalidate the answer metadata already shown. Return to normal play before
  // answering, and exercise one explained miss rather than auto-completing it.
  const title = page.locator('h1.title')
  for (let count = 0; count < 5; count++) await title.click()
  await expect(page.getByRole('button', { name: '🗺 Map', exact: true })).toBeVisible()
  await expect(page.locator('.comp-al')).toHaveText(question.albanian)
  expect(await page.locator('.comp-quiz .answers button').allTextContents()).toEqual(offeredAnswers)
  for (let count = 0; count < 5; count++) await title.click()
  await normalBoundary(page)
  const wrong = question.options.find((answer) => answer !== question.correct)
  await page.locator('.comp-quiz').getByRole('button', { name: wrong, exact: true }).click()
  const correction = page.getByRole('dialog', { name: '💔 You lost one heart', exact: true })
  await expect(correction).toBeVisible()
  await expect(correction.locator('.correction')).toContainText(question.correct)
  await expect(correction.locator('.correction')).toContainText(question.albanian)
  const failed = await settleSave(page, (state) => state?.attempts?.[ENDING_ID] === 1)
  expect(failed.hearts).toBe(returned.hearts - 1)
  expect(failed.achievementReadings[ENDING_ID]).toEqual(archive)
  expect(failed.earned[ENDING_ID]).toBeUndefined()
  await correction.getByRole('button', { name: 'Return to game', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Retry the reading check →', exact: true })).toBeVisible()
  await settleSave(page, (state) => !state?.pendingHeartConsequence)
  await page.reload()
  await openRevisit(page, { retry: true })
  const retrySave = await readSave(page)
  expect(retrySave.attempts[ENDING_ID]).toBe(1)
  expect(retrySave.achievementReadings[ENDING_ID]).toEqual(archive)
  await expect(page.locator('.comp-al')).toHaveText(testFor(achievement, 1, retrySave)[0].albanian)
  await normalBoundary(page)
})
