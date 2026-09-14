// One post-attempt contract for every player-facing heart loss. The reducer
// owns the penalty and the explanation together: a caller cannot take health
// first and hope that a transient component message explains it afterwards.

export const HEART_CONSEQUENCE_VERSION = 1

export const HEART_CONSEQUENCE_SOURCES = Object.freeze([
  'train-word',
  'train-form',
  'train-noun-agreement',
  'train-phrase',
  'train-word-matching',
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

const cleanGrammarRow = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const al = cleanText(value.al)
  const tag = cleanText(value.tag)
  const role = cleanText(value.role)
  const learnerMeaning = cleanText(value.learnerMeaning)
  if (!al || !tag || !role || !learnerMeaning) return null
  const example = cleanReading(value.example)
  return {
    al,
    tag,
    role,
    learnerMeaning,
    ...(cleanText(value.gloss) ? { gloss: cleanText(value.gloss) } : {}),
    ...(example ? { example } : {}),
    ...(cleanText(value.category) ? { category: cleanText(value.category) } : {}),
    ...(value.missed === true ? { missed: true } : {}),
    ...(value.inQuestion === true ? { inQuestion: true } : {}),
    ...(value.selected === true ? { selected: true } : {}),
    ...(value.answer === true ? { answer: true } : {}),
  }
}

const cleanOddOneOutEntry = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const al = cleanText(value.al)
  const role = cleanText(value.role)
  const category = cleanText(value.category)
  return al && role && category ? { al, role, category } : null
}

const cleanGrammar = (value) => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const pattern = cleanText(value.pattern)
  const target = cleanReading(value.target)
  if (!pattern) return null
  const rows = Array.isArray(value.rows)
    ? value.rows.slice(0, 32).map(cleanGrammarRow).filter(Boolean)
    : []
  const peerRows = Array.isArray(value.peer?.rows)
    ? value.peer.rows.slice(0, 16).map(cleanGrammarRow).filter(Boolean)
    : []
  const chosen = cleanOddOneOutEntry(value.test?.chosen)
  const answer = cleanOddOneOutEntry(value.test?.answer)
  const test = value.test?.kind === 'odd-one-out' && chosen && answer
    ? {
        kind: 'odd-one-out',
        dimension: cleanText(value.test.dimension),
        matchingCategory: cleanText(value.test.matchingCategory),
        targetCategory: cleanText(value.test.targetCategory),
        chosen,
        answer,
      }
    : null
  return {
    ...(cleanText(value.id) ? { id: cleanText(value.id) } : {}),
    pattern,
    ...(target ? {
      target: {
        ...target,
        ...(cleanText(value.target?.tag) ? { tag: cleanText(value.target.tag) } : {}),
        ...(cleanText(value.target?.role) ? { role: cleanText(value.target.role) } : {}),
      },
    } : {}),
    ...(rows.length ? { rows } : {}),
    ...(peerRows.length ? { peer: { id: cleanText(value.peer?.id), rows: peerRows } } : {}),
    ...(test?.dimension && test.matchingCategory && test.targetCategory ? { test } : {}),
  }
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
  if (value?.protected === true && value?.loss === 0) {
    const consequence = normalizeHeartConsequence(value, 1)
    const beforeHearts = Number.isSafeInteger(value.beforeHearts) ? value.beforeHearts : null
    const afterHearts = Number.isSafeInteger(value.afterHearts) ? value.afterHearts : null
    if (!consequence || beforeHearts == null || afterHearts == null ||
        beforeHearts !== afterHearts || afterHearts !== currentHearts ||
        afterHearts < 0 || afterHearts > 3) return null
    return { ...consequence, protected: true, loss: 0, beforeHearts, afterHearts }
  }
  const consequence = normalizeHeartConsequence(value)
  if (!consequence) return null
  const beforeHearts = Number.isSafeInteger(value.beforeHearts) ? value.beforeHearts : null
  const afterHearts = Number.isSafeInteger(value.afterHearts) ? value.afterHearts : null
  if (beforeHearts == null || afterHearts == null || beforeHearts - afterHearts !== consequence.loss ||
      afterHearts !== currentHearts || afterHearts < 0 || beforeHearts > 3) return null
  return { ...consequence, beforeHearts, afterHearts }
}

export function attachProtectedTrainMiss(state, value) {
  if (state.pendingHeartConsequence) return null
  const consequence = normalizeHeartConsequence(value, 1)
  if (!consequence) return null
  return {
    ...state,
    pendingHeartConsequence: {
      ...consequence,
      protected: true,
      loss: 0,
      beforeHearts: state.hearts,
      afterHearts: state.hearts,
    },
  }
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
