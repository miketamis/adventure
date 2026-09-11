import { openResponseMetrics } from './cefrAssessment.js'
import { DICT } from './dictionary.js'
import { PLAYABLE_FORM_INVENTORY } from './formInventory.js'

// This is deliberately a noticing aid, not an Albanian scorer. It can report
// exact reviewed surfaces and simple structure, but it cannot know whether a
// sentence is grammatical, natural, or communicates the intended meaning.
export const OPEN_RESPONSE_CONNECTORS = Object.freeze(['dhe', 'por', 'sepse'])
export const OPEN_RESPONSE_FEEDBACK_KINDS = Object.freeze(['free-text', 'free-text-exchange'])

const FEEDBACK_KIND_SET = new Set(OPEN_RESPONSE_FEEDBACK_KINDS)
const normalizeToken = (value) => String(value || '').normalize('NFC').toLocaleLowerCase('sq')

export function tokenizeOpenResponse(text) {
  const normalized = typeof text === 'string' ? text.normalize('NFC') : ''
  return [...normalized.matchAll(/\p{L}+(?:[’']\p{L}+)*/gu)]
    .map((match) => normalizeToken(match[0]))
}

const reviewedFormsBySense = new Map()
const reviewedTokenIndex = new Map()
const reviewedPhraseRecords = []

for (const [senseId, entry] of Object.entries(DICT)) {
  const candidates = [
    { al: entry.al, tag: 'lemma' },
    ...(PLAYABLE_FORM_INVENTORY[senseId] || []),
  ]
  const seenForms = new Set()
  const forms = []
  for (const candidate of candidates) {
    const formTokens = tokenizeOpenResponse(candidate.al)
    const formKey = formTokens.join(' ')
    if (!formTokens.length || seenForms.has(formKey)) continue
    seenForms.add(formKey)
    const form = Object.freeze({
      al: String(candidate.al).normalize('NFC'),
      normalized: formKey,
      tokens: Object.freeze(formTokens),
      tag: candidate.tag || 'reviewed',
    })
    forms.push(form)
    const record = Object.freeze({ senseId, lemma: entry.al, form })
    if (formTokens.length > 1) {
      reviewedPhraseRecords.push(record)
      continue
    }
    const token = formTokens[0]
    const records = reviewedTokenIndex.get(token) || []
    if (!records.some((current) => current.senseId === senseId && current.form.normalized === formKey)) {
      records.push(record)
      reviewedTokenIndex.set(token, records)
    }
  }
  reviewedFormsBySense.set(senseId, Object.freeze(forms))
}

for (const [token, records] of reviewedTokenIndex) {
  reviewedTokenIndex.set(token, Object.freeze(records))
}

const countInOrder = (tokens) => {
  const counts = new Map()
  for (const token of tokens) counts.set(token, (counts.get(token) || 0) + 1)
  return counts
}

const hasSequence = (tokens, sequence) => {
  if (!sequence.length || sequence.length > tokens.length) return false
  return tokens.some((_, start) => sequence.every((token, offset) => tokens[start + offset] === token))
}

const explicitFocusSenseIds = (task) => {
  const candidates = [
    task?.focusSenseIds,
    task?.response?.focusSenseIds,
    ...(task?.requirements || []).map((requirement) => requirement?.focusSenseIds),
  ]
  return [...new Set(candidates.flatMap((ids) => Array.isArray(ids) ? ids : [])
    .filter((id) => typeof id === 'string' && id.length > 0))]
}

export const supportsOpenResponseFeedback = (task) =>
  FEEDBACK_KIND_SET.has(task?.response?.kind)

export const requiresA2WritingRevision = (task) =>
  task?.level === 'A2' && supportsOpenResponseFeedback(task)

export function analyzeOpenResponseFeedback(text, task = {}) {
  const tokens = tokenizeOpenResponse(text)
  const counts = countInOrder(tokens)
  const recordsBySurface = new Map(tokens.map((surface) => [surface, [...(reviewedTokenIndex.get(surface) || [])]]))
  for (const record of reviewedPhraseRecords) {
    for (let start = 0; start <= tokens.length - record.form.tokens.length; start++) {
      if (!record.form.tokens.every((token, offset) => tokens[start + offset] === token)) continue
      for (let offset = 0; offset < record.form.tokens.length; offset++) {
        const surface = tokens[start + offset]
        const records = recordsBySurface.get(surface) || []
        if (!records.some((current) => current.senseId === record.senseId && current.form.normalized === record.form.normalized)) {
          records.push(record)
          recordsBySurface.set(surface, records)
        }
      }
    }
  }
  const recognized = []
  const unrecognized = []

  for (const [surface, count] of counts) {
    const records = recordsBySurface.get(surface) || []
    if (!records.length) {
      unrecognized.push(Object.freeze({ surface, count }))
      continue
    }
    recognized.push(Object.freeze({
      surface,
      count,
      lemmas: Object.freeze([...new Set(records.map(({ lemma }) => lemma.normalize('NFC')))]),
      senseIds: Object.freeze([...new Set(records.map(({ senseId }) => senseId))]),
      formTags: Object.freeze([...new Set(records
        .filter(({ form }) => form.tokens.includes(surface))
        .map(({ form }) => form.tag))]),
    }))
  }

  const connectors = OPEN_RESPONSE_CONNECTORS.map((surface) => Object.freeze({
    surface,
    count: counts.get(surface) || 0,
    present: counts.has(surface),
  }))

  // Only fields explicitly named `focusSenseIds` opt into anchor checking.
  // Semantic-concept IDs and English prompt text are never reverse-engineered:
  // doing so would turn a safe lexical notice into fake meaning assessment.
  const authoredSenseIds = explicitFocusSenseIds(task)
  const safeSenseIds = authoredSenseIds.filter((senseId) => DICT[senseId] && reviewedFormsBySense.has(senseId))
  const anchors = safeSenseIds.map((senseId) => {
    const forms = reviewedFormsBySense.get(senseId) || []
    const matchedForms = forms.filter((form) => hasSequence(tokens, form.tokens)).map(({ al }) => al)
    return Object.freeze({
      senseId,
      lemma: DICT[senseId].al,
      present: matchedForms.length > 0,
      matchedForms: Object.freeze(matchedForms),
    })
  })

  return Object.freeze({
    metrics: Object.freeze(openResponseMetrics(text, task?.response)),
    tokenCount: tokens.length,
    recognizedTokenCount: recognized.reduce((sum, entry) => sum + entry.count, 0),
    unrecognizedTokenCount: unrecognized.reduce((sum, entry) => sum + entry.count, 0),
    recognized: Object.freeze(recognized),
    unrecognized: Object.freeze(unrecognized),
    connectors: Object.freeze(connectors),
    semanticAnchors: Object.freeze({
      available: safeSenseIds.length > 0,
      authored: authoredSenseIds.length > 0,
      invalidAuthoredCount: authoredSenseIds.length - safeSenseIds.length,
      coveredCount: anchors.filter(({ present }) => present).length,
      anchors: Object.freeze(anchors),
    }),
  })
}
