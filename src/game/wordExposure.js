// Passive exposure is familiarity evidence only. It can tune support and
// scheduling priority, but is deliberately absent from every mastery gate.

export const WORD_EXPOSURE_VERSION = 1
export const WORD_EXPOSURE_SOURCES = Object.freeze(['story', 'phrase-co-exposure'])

const safeCount = (value) => Number.isSafeInteger(Number(value)) && Number(value) > 0
  ? Number(value)
  : 0

export function normalizeWordExposure(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value).flatMap(([id, record]) => {
    if (!id || id.length > 200 || !record || typeof record !== 'object' || Array.isArray(record)) return []
    const story = safeCount(record.story)
    const phrase = safeCount(record['phrase-co-exposure'])
    const total = story + phrase
    return total ? [[id, { total, story, 'phrase-co-exposure': phrase }]] : []
  }))
}
export function normalizeWordExposureReceipts(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value).flatMap(([receipt, source]) =>
    typeof receipt === 'string' && receipt.length <= 700 && WORD_EXPOSURE_SOURCES.includes(source)
      ? [[receipt, source]]
      : []))
}

export function recordWordExposure(state, { receipt, source, occurrences } = {}) {
  if (typeof receipt !== 'string' || !receipt || receipt.length > 700) return null
  if (!WORD_EXPOSURE_SOURCES.includes(source) || !Array.isArray(occurrences) || !occurrences.length) return null
  const receipts = normalizeWordExposureReceipts(state.wordExposureReceipts)
  if (receipts[receipt]) return state
  const exposure = normalizeWordExposure(state.wordExposure)
  let recorded = 0
  for (const id of occurrences) {
    if (typeof id !== 'string' || !id || id.length > 200) continue
    const previous = exposure[id] || { total: 0, story: 0, 'phrase-co-exposure': 0 }
    exposure[id] = {
      ...previous,
      total: previous.total + 1,
      [source]: previous[source] + 1,
    }
    recorded += 1
  }
  if (!recorded) return null
  return {
    ...state,
    wordExposureVersion: WORD_EXPOSURE_VERSION,
    wordExposure: exposure,
    wordExposureReceipts: { ...receipts, [receipt]: source },
  }
}

export const wordExposureFor = (state, id) => normalizeWordExposure(state?.wordExposure)[id] || {
  total: 0,
  story: 0,
  'phrase-co-exposure': 0,
}
