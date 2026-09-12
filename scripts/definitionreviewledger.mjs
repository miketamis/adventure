// Exact editorial seals for every learner-facing dictionary sense.
//
// The alphabetical files are deliberately disjoint so large reviews can be
// performed in parallel without turning this aggregator into a merge hotspot.
// A definition or English sense label may change only together with a renewed
// line-by-line review and an updated seal in the owning tranche.
import {
  DEFINITION_REVIEWS_A_H,
  GLOSS_REVIEWS_A_H,
} from './data/definitionReviews/a-h.mjs'
import {
  DEFINITION_REVIEWS_I_P,
  GLOSS_REVIEWS_I_P,
} from './data/definitionReviews/i-p.mjs'
import {
  DEFINITION_REVIEWS_Q_Z,
  GLOSS_REVIEWS_Q_Z,
} from './data/definitionReviews/q-z.mjs'

// Keep tranche ownership machine-readable. The quality gate uses the same
// objects that are merged below, so a reviewed row cannot drift into a
// convenient file outside the range selected by its Albanian headword.
export const DEFINITION_REVIEW_TRANCHES = Object.freeze([
  Object.freeze({
    id: 'a-h',
    first: 'a',
    last: 'h',
    definitions: DEFINITION_REVIEWS_A_H,
    glosses: GLOSS_REVIEWS_A_H,
  }),
  Object.freeze({
    id: 'i-p',
    first: 'i',
    last: 'p',
    definitions: DEFINITION_REVIEWS_I_P,
    glosses: GLOSS_REVIEWS_I_P,
  }),
  Object.freeze({
    id: 'q-z',
    first: 'q',
    last: 'z',
    definitions: DEFINITION_REVIEWS_Q_Z,
    glosses: GLOSS_REVIEWS_Q_Z,
  }),
])

function mergeDisjoint(label, tranches) {
  const merged = {}
  for (const tranche of tranches) {
    for (const [id, value] of Object.entries(tranche)) {
      if (Object.hasOwn(merged, id)) {
        throw new Error(`${label}: duplicate review seal for ${id}`)
      }
      merged[id] = value
    }
  }
  return Object.freeze(merged)
}

export const EDITORIALLY_REVIEWED_DEFINITIONS = mergeDisjoint('definition reviews', [
  ...DEFINITION_REVIEW_TRANCHES.map(({ definitions }) => definitions),
])

export const EDITORIALLY_REVIEWED_GLOSSES = mergeDisjoint('gloss reviews', [
  ...DEFINITION_REVIEW_TRANCHES.map(({ glosses }) => glosses),
])
