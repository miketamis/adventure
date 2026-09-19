// Passive exposure is familiarity evidence only. It can tune support and
// scheduling priority, but is deliberately absent from every mastery gate.

export const WORD_EXPOSURE_VERSION = 1
export const WORD_EXPOSURE_SOURCES = Object.freeze(['story', 'phrase-co-exposure'])

const safeCount = (value) => Number.isSafeInteger(Number(value)) && Number(value) > 0
  ? Number(value)
  : 0

// Only maps produced by this module are trusted. Saved/raw objects still pass
// through validation, while immutable reducer results can share untouched
// records instead of rebuilding the entire learner history for each sentence.
const normalizedExposures = new WeakSet()
const normalizedReceipts = new WeakSet()
const emptyExposure = Object.freeze({ total: 0, story: 0, 'phrase-co-exposure': 0 })
const validId = (id) => typeof id === 'string' && id.length > 0 && id.length <= 200
const normalizeRecord = (record) => {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return null
  const story = safeCount(record.story)
  const phrase = safeCount(record['phrase-co-exposure'])
  const total = story + phrase
  return total ? { total, story, 'phrase-co-exposure': phrase } : null
}

export function normalizeWordExposure(value) {
  if (normalizedExposures.has(value)) return value
  const normalized = Object.fromEntries(
    value && typeof value === 'object' && !Array.isArray(value)
      ? Object.entries(value).flatMap(([id, record]) => {
        const next = validId(id) && normalizeRecord(record)
        return next ? [[id, next]] : []
      })
      : [],
  )
  normalizedExposures.add(normalized)
  return normalized
}
export function normalizeWordExposureReceipts(value) {
  if (normalizedReceipts.has(value)) return value
  const normalized = Object.fromEntries(
    value && typeof value === 'object' && !Array.isArray(value)
      ? Object.entries(value).filter(([receipt, source]) =>
        receipt.length <= 700 && WORD_EXPOSURE_SOURCES.includes(source))
      : [],
  )
  normalizedReceipts.add(normalized)
  return normalized
}

export function recordWordExposures(state, entries) {
  if (!Array.isArray(entries)) return null
  let receipts = null
  let exposure = null
  let replayed = false
  for (const entry of entries) {
    const { receipt, source, occurrences } = entry || {}
    if (typeof receipt !== 'string' || !receipt || receipt.length > 700) continue
    if (!WORD_EXPOSURE_SOURCES.includes(source) || !Array.isArray(occurrences) || !occurrences.length) continue
    const currentReceipts = receipts || state.wordExposureReceipts
    // Replay is an O(1) read even after a long run or an unnormalized import.
    if (currentReceipts && typeof currentReceipts === 'object' && !Array.isArray(currentReceipts) &&
        Object.hasOwn(currentReceipts, receipt) &&
        WORD_EXPOSURE_SOURCES.includes(currentReceipts[receipt])) {
      replayed = true
      continue
    }
    const ids = occurrences.filter(validId)
    if (!ids.length) continue
    if (!exposure) {
      exposure = { ...normalizeWordExposure(state.wordExposure) }
      receipts = { ...normalizeWordExposureReceipts(state.wordExposureReceipts) }
    }
    for (const id of ids) {
      const previous = Object.hasOwn(exposure, id) ? exposure[id] : emptyExposure
      // A computed own property also keeps arbitrary imported keys from
      // invoking Object.prototype setters.
      Object.defineProperty(exposure, id, {
        value: { ...previous, total: previous.total + 1, [source]: previous[source] + 1 },
        writable: true, enumerable: true, configurable: true,
      })
    }
    Object.defineProperty(receipts, receipt, {
      value: source, writable: true, enumerable: true, configurable: true,
    })
  }
  if (!exposure) return replayed ? state : null
  normalizedExposures.add(exposure)
  normalizedReceipts.add(receipts)
  return {
    ...state,
    wordExposureVersion: WORD_EXPOSURE_VERSION,
    wordExposure: exposure,
    wordExposureReceipts: receipts,
  }
}

export const recordWordExposure = (state, entry = {}) => recordWordExposures(state, [entry])

export const wordExposureFor = (state, id) => {
  const exposure = state?.wordExposure
  if (!validId(id) || !exposure || typeof exposure !== 'object' || Array.isArray(exposure) ||
      !Object.hasOwn(exposure, id)) return emptyExposure
  return (normalizedExposures.has(exposure) ? exposure[id] : normalizeRecord(exposure[id])) || emptyExposure
}
