import { albanianTextOf } from '../../language.js'
import { OPTION_READINGS_A } from './optionsA.js'
import { OPTION_READINGS_B } from './optionsB.js'
import { OPTION_READINGS_C } from './optionsC.js'
import { OPTION_READINGS_STATIC } from './optionsStatic.js'
export {
  dynamicItemConfuserEnglish,
  normalizeOptionEnglish,
  optionEnglishReadingOf,
} from './optionReadingHelpers.js'

// This is a fully materialized editorial registry. Every action has its own
// stable address, exact Albanian pin, English phrase and explicit review state.
// scripts/languageaudit.mjs checks every record against its exact live Albanian
// action, so failures identify the specific stale or incomplete address.
// `internal-editorial` never claims native-speaker review.
export const REVIEWED_OPTION_COUNT = 1967

const merged = {}
for (const tranche of [OPTION_READINGS_A, OPTION_READINGS_B, OPTION_READINGS_C, OPTION_READINGS_STATIC]) {
  for (const [address, review] of Object.entries(tranche)) {
    if (Object.hasOwn(merged, address))
      throw new Error(`Duplicate reviewed-option address: ${address}`)
    merged[address] = Object.freeze({ ...review })
  }
}
export const REVIEWED_OPTION_READINGS = Object.freeze(merged)

function phraseAt(address, story, items, heartLevels) {
  let match = /^(.+)\.options\[(\d+)\]$/.exec(address)
  if (match) return story?.[match[1]]?.options?.[Number(match[2])]?.text

  match = /^ITEMS\.([^.]+)\.use\.phrase$/.exec(address)
  if (match) return items?.[match[1]]?.use?.phrase

  match = /^HEART_LEVELS\.(\d+)\.heal\.phrase$/.exec(address)
  if (match) return heartLevels?.[Number(match[1])]?.heal?.phrase

  throw new Error(`Invalid reviewed-option address: ${address}`)
}

// Attach the address-pinned reading to each live token array. This is
// idempotent for React development mode and repeated audit imports.
export function attachReviewedOptionReadings(story, items, heartLevels) {
  let attached = 0
  for (const [address, review] of Object.entries(REVIEWED_OPTION_READINGS)) {
    const text = phraseAt(address, story, items, heartLevels)
    if (!Array.isArray(text) || text.length === 0)
      throw new Error(`Reviewed option points to no live action: ${address}`)
    const currentAlbanian = albanianTextOf(text)
    if (currentAlbanian !== review.al)
      throw new Error(`Stale reviewed option at ${address}: expected “${review.al}”, found “${currentAlbanian}”`)
    if (text.optionReading && text.optionReading !== review.en)
      throw new Error(`Conflicting reviewed option English at ${address}`)
    if (!text.optionReading) attached++
    Object.assign(text, {
      optionReading: review.en,
      optionReadingAlbanian: review.al,
      optionReadingAddress: address,
      optionReadingReview: review.review,
    })
  }
  if (Object.keys(REVIEWED_OPTION_READINGS).length !== REVIEWED_OPTION_COUNT)
    throw new Error(`Reviewed-option inventory changed: expected ${REVIEWED_OPTION_COUNT}, found ${Object.keys(REVIEWED_OPTION_READINGS).length}`)
  return attached
}
