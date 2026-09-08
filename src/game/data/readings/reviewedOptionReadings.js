import { albanianTextOf, alignedEnglishOf } from '../../language.js'
import { OPTION_READINGS_A } from './optionsA.js'
import { OPTION_READINGS_B } from './optionsB.js'
import { OPTION_READINGS_C } from './optionsC.js'
import { OPTION_READINGS_STATIC } from './optionsStatic.js'

// This is a fully materialized editorial registry. Every action has its own
// stable address, exact Albanian pin, English phrase and explicit review state.
// The SHA-256 seal is checked in scripts/languageaudit.mjs after all candidates
// have been inspected. `internal-editorial` never claims native-speaker review.
export const REVIEWED_OPTION_COUNT = 1653
export const OPTION_READING_REVIEW_HASH = 'sha256:5fa8027419ccfab514582bb993d64f398a6206cbf3d4f5e1b45c711ad59ee411'

const merged = {}
for (const tranche of [OPTION_READINGS_A, OPTION_READINGS_B, OPTION_READINGS_C, OPTION_READINGS_STATIC]) {
  for (const [address, review] of Object.entries(tranche)) {
    if (Object.hasOwn(merged, address))
      throw new Error(`Duplicate reviewed-option address: ${address}`)
    merged[address] = Object.freeze({ ...review })
  }
}
export const REVIEWED_OPTION_READINGS = Object.freeze(merged)

const terminalPunctuation = /[.!?…][”»"]?$/

export function normalizeOptionEnglish(text, albanian = '') {
  let out = String(text || '').replace(/\s+/g, ' ').trim()
  if (!out) return ''
  out = out.replace(/[A-Za-z]/, (letter) => letter.toUpperCase())
  if (!terminalPunctuation.test(out)) {
    const al = String(albanian || '').trim()
    out += al.endsWith('?') ? '?' : al.endsWith('!') ? '!' : '.'
  }
  return out
}

export const optionReviewPayload = () => Object.entries(REVIEWED_OPTION_READINGS).map(([address, review]) => [
  address,
  review.al,
  review.en,
  review.review,
])

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

export function optionEnglishReadingOf(tokens) {
  if (tokens?.optionReading) return tokens.optionReading
  return normalizeOptionEnglish(alignedEnglishOf(tokens), albanianTextOf(tokens))
}

// Dynamic item distractors are intentionally absurd, but never malformed.
// The action is constrained to one verb plus one known item, so the audit can
// exhaust every possible rendering without pretending these generated traps
// received the same address-pinned review as static story actions.
export function dynamicItemConfuserEnglish(item, fight) {
  const name = String(item?.name || '').trim()
  if (!name) throw new Error('Dynamic item confuser has no item name')
  const object = /^(?:a|an|the)\b/i.test(name)
    ? name
    : `the ${name[0].toLocaleLowerCase('en')}${name.slice(1)}`
  return `${fight ? 'Fight' : 'Drink'} ${object}.`
}
