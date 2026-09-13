import { PRACTICE_HARD_CONTRASTS_A_H } from './data/practiceHardContrasts/a-h.js'
import { HARD_CONTRAST_REVIEWS_I_P } from './data/practiceHardContrasts/i-p.js'
import { HARD_CONTRAST_REVIEWS_Q_Z } from './data/practiceHardContrasts/q-z.js'

// One normalized authority for editorial hard lexical contrasts. Range files
// remain independently reviewable, but runtime code never needs to understand
// their historical status or candidate-key spelling differences.

const SOURCES = Object.freeze([
  Object.freeze({ id: 'a-h', registry: PRACTICE_HARD_CONTRASTS_A_H }),
  Object.freeze({ id: 'i-p', registry: HARD_CONTRAST_REVIEWS_I_P }),
  Object.freeze({ id: 'q-z', registry: HARD_CONTRAST_REVIEWS_Q_Z }),
])

const normalized = {}
for (const { id: sourceId, registry } of SOURCES) {
  for (const [targetId, row] of Object.entries(registry)) {
    if (normalized[targetId]) throw new Error(`Duplicate hard-contrast review for ${targetId}`)
    const contextOnly = row.status === 'context-only' || row.status === 'not-applicable'
    normalized[targetId] = contextOnly
      ? Object.freeze({
          targetId,
          status: 'context-only',
          reason: row.reason,
          source: sourceId,
          contrasts: Object.freeze([]),
        })
      : Object.freeze({
          targetId,
          status: 'reviewed',
          source: sourceId,
          contrasts: Object.freeze((row.contrasts || []).map((contrast) => Object.freeze({
            candidateId: contrast.candidateId || contrast.id,
            relation: contrast.relation,
            reason: contrast.reason,
            source: sourceId,
            requiresContext: Boolean(contrast.requiresContext),
          }))),
        })
  }
}

export const PRACTICE_HARD_CONTRASTS = Object.freeze(normalized)
export const PRACTICE_HARD_CONTRAST_SOURCES = Object.freeze(SOURCES.map(({ id }) => id))

export function practiceHardContrastReview(targetId) {
  return PRACTICE_HARD_CONTRASTS[targetId] || null
}

export function practiceHardContrastLink(targetId, candidateId) {
  const review = practiceHardContrastReview(targetId)
  if (!review || review.status !== 'reviewed') return null
  return review.contrasts.find((contrast) => contrast.candidateId === candidateId) || null
}

export function practiceHardContrastCandidateIds(targetId) {
  const review = practiceHardContrastReview(targetId)
  return review?.status === 'reviewed'
    ? review.contrasts.map(({ candidateId }) => candidateId)
    : []
}

export function senseRequiresContextForHardContrast(id) {
  return practiceHardContrastReview(id)?.status === 'context-only'
}
