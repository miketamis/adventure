// One post-attempt contract for every player-facing heart loss. The reducer
// owns the penalty and the explanation together: a caller cannot take health
// first and hope that a transient component message explains it afterwards.

export const HEART_CONSEQUENCE_VERSION = 1

export const HEART_CONSEQUENCE_SOURCES = Object.freeze([
  'train-word',
  'train-form',
  'train-phrase',
  'story-confuser',
  'story-choice',
  'item-action',
  'comprehension',
])

const SOURCE_SET = new Set(HEART_CONSEQUENCE_SOURCES)
const MAX_TEXT = 600

const cleanText = (value) => typeof value === 'string' && value.trim()
  ? value.trim().slice(0, MAX_TEXT)
  : null

const cleanReading = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const al = cleanText(value.al)
  const en = cleanText(value.en)
  return al || en ? { ...(al ? { al } : {}), ...(en ? { en } : {}) } : null
}

const cleanGrammar = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const pattern = cleanText(value.pattern)
  const target = cleanReading(value.target)
  return pattern ? { pattern, ...(target ? { target } : {}) } : null
}

// Validation is intentionally semantic rather than merely shape-based. A
// consequence must identify the attempted action, explain this exact miss,
// and provide either the answer/reasoning that fits or a reviewed grammar
// pattern. Missing any layer makes the whole penalty fail closed.
export function normalizeHeartConsequence(value, loss = value?.loss) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const source = SOURCE_SET.has(value.source) ? value.source : null
  const eventId = cleanText(value.eventId)
  const attempted = cleanReading(value.attempted)
  const reasonCode = cleanText(value.reason?.code)
  const reasonText = cleanText(value.reason?.text)
  const correction = cleanReading(value.correction)
  const reasoning = cleanText(value.reasoning)
  const grammar = cleanGrammar(value.grammar)
  const safeLoss = Number.isSafeInteger(loss) && loss > 0 && loss <= 3 ? loss : null
  if (!source || !eventId || !attempted || !reasonCode || !reasonText || !safeLoss ||
      (!correction && !reasoning && !grammar)) return null
  return {
    version: HEART_CONSEQUENCE_VERSION,
    source,
    eventId,
    attempted,
    reason: { code: reasonCode, text: reasonText },
    ...(correction ? { correction } : {}),
    ...(reasoning ? { reasoning } : {}),
    ...(grammar ? { grammar } : {}),
    loss: safeLoss,
  }
}

export function heartLossConsequenceForSave(value, currentHearts = 0) {
  const consequence = normalizeHeartConsequence(value)
  if (!consequence) return null
  const beforeHearts = Number.isSafeInteger(value.beforeHearts) ? value.beforeHearts : null
  const afterHearts = Number.isSafeInteger(value.afterHearts) ? value.afterHearts : null
  if (beforeHearts == null || afterHearts == null || beforeHearts - afterHearts !== consequence.loss ||
      afterHearts !== currentHearts || afterHearts < 0 || beforeHearts > 3) return null
  return { ...consequence, beforeHearts, afterHearts }
}

export function applyExplainedHeartLoss(state, value, requestedLoss = 1) {
  const loss = Math.min(
    Number.isSafeInteger(requestedLoss) && requestedLoss > 0 ? requestedLoss : 0,
    Math.max(0, state.hearts || 0),
  )
  if (!loss || state.pendingHeartConsequence) return null
  const consequence = normalizeHeartConsequence(value, loss)
  if (!consequence) return null
  const afterHearts = state.hearts - loss
  return {
    ...state,
    hearts: afterHearts,
    pendingHeartConsequence: {
      ...consequence,
      beforeHearts: state.hearts,
      afterHearts,
    },
  }
}

// Story/item transactions may already have projected their canonical effects.
// Attach the explanation only after measuring the real delta, while retaining
// the original state as the atomic fail-closed result.
export function attachExplainedHeartLoss(before, projected, value) {
  const loss = Math.max(0, (before.hearts || 0) - (projected.hearts || 0))
  if (!loss) return projected
  const consequence = normalizeHeartConsequence(value, loss)
  if (!consequence || before.pendingHeartConsequence) return null
  return {
    ...projected,
    pendingHeartConsequence: {
      ...consequence,
      beforeHearts: before.hearts,
      afterHearts: projected.hearts,
    },
  }
}
