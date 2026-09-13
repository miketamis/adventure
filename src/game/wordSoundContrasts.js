import { DICT } from './dictionary.js'

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

// Editorially reviewed real-word listening contrasts. These are not generated
// from edit distance: each pair names the audible distinction the learner is
// meant to notice and both sides must be saved before it can enter Train.
export const REVIEWED_WORD_SOUND_CONTRASTS = deepFreeze([
  { id: 'caj-qaj', senseIds: ['caj', 'qaj'], focus: 'ç / q at the start' },
  { id: 'rri-ri', senseIds: ['rri', 'ri'], focus: 'rr / r at the start' },
  { id: 'ku-kur', senseIds: ['ku', 'kur'], focus: 'the final r' },
  { id: 'pyll-yll', senseIds: ['pyll', 'yll'], focus: 'the initial p' },
  { id: 'uje-ure', senseIds: ['uje', 'ure'], focus: 'j / r in the middle' },
  { id: 'dere-ere', senseIds: ['dere', 'ere'], focus: 'the initial d' },
  { id: 'toke-koke', senseIds: ['toke', 'koke'], focus: 't / k at the start' },
  { id: 'ha-hap', senseIds: ['ha', 'hap'], focus: 'the final p' },
  { id: 'mal-fal', senseIds: ['mal', 'fal'], focus: 'm / f at the start' },
  { id: 'gjel-gjen', senseIds: ['gjel', 'gjen'], focus: 'l / n at the end' },
  { id: 'fle-flet', senseIds: ['fle', 'flet'], focus: 'the final t' },
])

const BY_SENSE_ID = deepFreeze(REVIEWED_WORD_SOUND_CONTRASTS.reduce((index, contrast) => {
  for (const senseId of contrast.senseIds) {
    if (!index[senseId]) index[senseId] = []
    index[senseId].push(contrast)
  }
  return index
}, {}))

export function reviewedSoundContrastFor(answerId, discoveredIds = [], exclude = () => false) {
  const discovered = new Set(discoveredIds)
  for (const contrast of BY_SENSE_ID[answerId] || []) {
    const partnerId = contrast.senseIds.find((id) => id !== answerId)
    if (!partnerId || !discovered.has(partnerId) || exclude(DICT[partnerId]?.al || '')) continue
    return {
      ...contrast,
      answerId,
      partnerId,
      surfaces: contrast.senseIds.map((id) => DICT[id]?.al),
    }
  }
  return null
}

export function validateReviewedWordSoundContrast(contrast) {
  const errors = []
  if (!contrast?.id) errors.push('missing stable id')
  if (!Array.isArray(contrast?.senseIds) || contrast.senseIds.length !== 2) errors.push('contrast must have exactly two sense IDs')
  const entries = (contrast?.senseIds || []).map((id) => DICT[id])
  if (entries.some((entry) => !entry)) errors.push('contrast names an unknown dictionary sense')
  const surfaces = entries.map((entry) => entry?.al).filter(Boolean)
  if (new Set(surfaces).size !== 2) errors.push('contrast surfaces are not distinct')
  if (!contrast?.focus) errors.push('contrast lacks an editorial sound focus')
  return errors
}
