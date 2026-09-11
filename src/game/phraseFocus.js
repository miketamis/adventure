import { DICT } from './dictionary.js'
import { isTrainableSense } from './lexicalTrainability.js'

const SMALL_WORDS = new Set(['a', 'e', 'i', 'jo', 'me', 'në', 'po', 'se', 'të'])

const words = (value) => String(value || '').match(/[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*/gu) || []
const normalizedWord = (value) => String(value || '')
  .normalize('NFC')
  .toLocaleLowerCase('sq')
  .replace(/’/g, "'")

export const phraseSurfaceWordKeys = (value) =>
  [...new Set(words(value).map(normalizedWord))]

function senseAt(phrase, surfaces, index) {
  const surface = normalizedWord(surfaces[index])
  const exact = phrase.requires.find((id) => {
    const entry = DICT[id]
    if (!entry) return false
    if (normalizedWord(entry.al) === surface) return true
    return entry.forms?.some((form) => normalizedWord(form.al) === surface)
  })
  if (exact) return exact
  return phrase.requires.length === surfaces.length ? phrase.requires[index] : null
}

// A phrase's productive focuses are the content-bearing words whose contextual
// spelling the learner must prove before independent production. Explicit
// metadata resolves homonyms and editorial exceptions; the conservative
// fallback maps attested phrase surfaces back to dictionary senses.
export function phraseProductionFocuses(phrase) {
  if (!phrase || !Array.isArray(phrase.requires)) return []
  const surfaces = words(phrase.al)
  const mapped = surfaces
    .map((word, index) => ({ id: senseAt(phrase, surfaces, index), index, word }))
    .filter((focus) => focus.id && DICT[focus.id] && isTrainableSense(focus.id))
  const explicit = Array.isArray(phrase.productionFocus)
    ? [...new Set(phrase.productionFocus.filter((id) => phrase.requires.includes(id)))]
    : []
  if (explicit.length) {
    return explicit.map((id) => mapped.find((focus) => focus.id === id)).filter(Boolean)
  }
  const useful = mapped.filter(({ word }) => word.length >= 4 && !SMALL_WORDS.has(normalizedWord(word)))
  return useful.length ? useful : mapped
}

export const phraseProductionFocusIds = (phrase) =>
  phraseProductionFocuses(phrase).map(({ id }) => id)
