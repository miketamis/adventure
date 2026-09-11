import { DICT } from './dictionary.js'

const lower = (value, locale = 'en') => String(value || '')
  .normalize('NFC')
  .toLocaleLowerCase(locale)
  .replace(/[“”‘’]/gu, "'")
  .replace(/[^\p{L}\p{M}\p{N}']+/gu, ' ')
  .replace(/\s+/gu, ' ')
  .trim()

const ids = (value) => value.trim().split(/\s+/u).filter(Boolean)

// These are deliberately conservative: a pair is listed when one member can
// be a defensible rendering of the other in an ordinary short cue. Train may
// still teach the distinction in a reviewed context, but a generated bank may
// not score either member as an unequivocally wrong bare alternative.
const POTENTIALLY_EQUIVALENT_GROUPS = Object.freeze([
  ids('shko nisem'),
  ids('rregull dakord'),
  ids('kuptoj di'),
  ids('dhe edhe po_turn'),
  ids('po_prog ende akoma edhe'),
  ids('e_obj po_prog'),
  ids('rruge udhe'),
  ids('rri qendroj'),
  ids('perseri prape'),
  ids('atje aty'),
  ids('pse perse'),
  ids('ndoshta mbase'),
  ids('edhe gjithashtu'),
])

const POTENTIALLY_EQUIVALENT_BY_ID = new Map()
for (const group of POTENTIALLY_EQUIVALENT_GROUPS) {
  for (const id of group) {
    const peers = POTENTIALLY_EQUIVALENT_BY_ID.get(id) || new Set()
    for (const peer of group) if (peer !== id) peers.add(peer)
    POTENTIALLY_EQUIVALENT_BY_ID.set(id, peers)
  }
}

const glossKeys = (id) => {
  const entry = DICT[id]
  if (!entry) return new Set()
  return new Set(String(entry.enAll ?? entry.en ?? '')
    .split('/')
    .map((value) => lower(value))
    .filter(Boolean))
}

export const normalizedChoiceText = (value, locale = 'en') => lower(value, locale)

export function sensesMayShareAnswer(answerId, candidateId) {
  if (!DICT[answerId] || !DICT[candidateId]) return true
  if (answerId === candidateId) return true
  if (lower(DICT[answerId].al, 'sq') === lower(DICT[candidateId].al, 'sq')) return true
  if (POTENTIALLY_EQUIVALENT_BY_ID.get(answerId)?.has(candidateId)) return true
  const answerGlosses = glossKeys(answerId)
  return [...glossKeys(candidateId)].some((key) => answerGlosses.has(key))
}

export function choiceSetErrors({
  answerValue,
  optionValues,
  labelOf = (value) => value,
  expectedOptionCount = null,
  locale = 'en',
  wrongOptionIsValid = () => false,
} = {}) {
  const options = Array.isArray(optionValues) ? optionValues : []
  const errors = []
  if (expectedOptionCount != null && options.length !== expectedOptionCount) {
    errors.push(`expected ${expectedOptionCount} options; received ${options.length}`)
  }
  if (options.filter((value) => value === answerValue).length !== 1) {
    errors.push('the answer must occur exactly once')
  }
  if (new Set(options).size !== options.length) errors.push('option values are not unique')
  const labels = options.map((value) => normalizedChoiceText(labelOf(value), locale))
  if (labels.some((label) => !label)) errors.push('an option has no learner-visible label')
  if (new Set(labels).size !== labels.length) errors.push('learner-visible option labels are not unique')
  for (const value of options) {
    if (value !== answerValue && wrongOptionIsValid(value)) {
      errors.push(`option ${String(value)} is a defensible alternative answer`)
    }
  }
  return errors
}

export const choiceSetIsValid = (options) => choiceSetErrors(options).length === 0

export function phraseMatchSetErrors(phrases, expectedCount) {
  const rows = Array.isArray(phrases) ? phrases : []
  const errors = []
  if (rows.length !== expectedCount) errors.push(`expected ${expectedCount} phrase pairs; received ${rows.length}`)
  if (new Set(rows.map(({ id }) => id)).size !== rows.length) errors.push('phrase ids are not unique')
  for (const field of ['al', 'en']) {
    const locale = field === 'al' ? 'sq' : 'en'
    const labels = rows.map((phrase) => normalizedChoiceText(phrase?.[field], locale))
    if (labels.some((label) => !label)) errors.push(`${field} matching surface is blank`)
    if (new Set(labels).size !== labels.length) errors.push(`${field} matching surfaces are not unique`)
  }
  return errors
}

export const phraseMatchSetIsValid = (phrases, expectedCount) =>
  phraseMatchSetErrors(phrases, expectedCount).length === 0
