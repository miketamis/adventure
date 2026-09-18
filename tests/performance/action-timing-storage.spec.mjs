import { expect, test } from '@playwright/test'
import fs from 'node:fs'
import { STORY } from '../../src/game/content.js'
import { canChoose, isOptionRevealed, newRun, normalizeSavedState } from '../../src/game/gameState.js'
import { albanianTextOf } from '../../src/game/language.js'
import { audioSlug } from '../../src/game/audio.js'
import { decodeActionTimingManifest } from '../../src/game/actionTimingStorage.js'
import { feasibleOptionProjection } from '../../scripts/lib/story-projections.mjs'

const stored = JSON.parse(fs.readFileSync(new URL('../../public/audio/action-timings.json', import.meta.url), 'utf8'))
const canonical = decodeActionTimingManifest(stored)
const option = STORY.start.options.find((candidate) => !candidate.confuser && candidate.to === 'fshatiLumi')
const al = albanianTextOf(option.text)
const approach = feasibleOptionProjection('start', option)
// Projection helpers fund an isolated option; browser saves additionally need
// the durable correct-practice counts backing those exact vocabulary tokens.
approach.practiced = { ...approach.practiced, ...approach.mana }
const seed = normalizeSavedState(JSON.parse(JSON.stringify(approach)), newRun())

for (const [name, manifest, aligned] of [
  ['stored v2', stored, true],
  ['cached v1', canonical, true],
  ['unknown storage', { version: 99 }, false],
]) test(`${name} preserves continuous action playback and the commit boundary`, async ({ page }) => {
  expect(canChoose(seed, option)).toBe(true)
  expect(isOptionRevealed(seed, option)).toBe(true)
  await page.route('**/audio/action-timings.json', (route) => route.fulfill({ json: manifest }))
  await page.addInitScript((state) => {
    if (window.name === '__action_timing_storage__') return
    localStorage.clear()
    sessionStorage.clear()
    localStorage.setItem('aventura.state.v1', JSON.stringify(state))
    localStorage.setItem('aventura.muted.v1', '0')
    localStorage.setItem('aventura.analytics-consent.v1', JSON.stringify({ version: 1, decided: true, structured: false, replay: false }))
    window.name = '__action_timing_storage__'
  }, seed)
  await page.goto('./')
  await page.getByRole('button', { name: `Choose: ${al}`, exact: true }).click()
  const overlay = page.locator('.action-karaoke-overlay')
  await expect(overlay).toBeVisible()
  await expect(page.locator('[inert]')).toHaveCount(1)
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')).nodeId)).toBe('start')
  await expect(overlay.locator('.action-karaoke-word')).toHaveCount(aligned ? canonical.entries[audioSlug(al)].words.length : 0)
  if (aligned) await expect(overlay.locator('.action-karaoke-word.speaking, .action-karaoke-word.spoken').first()).toBeVisible()
  await expect(overlay).toHaveCount(0)
  await expect.poll(() => page.evaluate(() => JSON.parse(localStorage.getItem('aventura.state.v1')).nodeId)).toBe(option.to)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'New scene. Albanian story text is ready.', exact: true })).toBeAttached()
  await expect(overlay).toHaveCount(0)
})
