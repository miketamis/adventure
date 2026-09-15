import { DICT } from './dictionary.js'
import { isTrainableSense } from './lexicalTrainability.js'
import {
  practiceContrastRole,
  practiceTargetKind,
  wordContrastRank,
} from './practiceContrasts.js'
import { sensesMayShareAnswer } from './practiceAnswerValidity.js'
import {
  practiceHardContrastCandidateIds,
  practiceHardContrastLink,
  practiceHardContrastReview,
  senseRequiresContextForHardContrast,
} from './practiceHardContrasts.js'

export const DISTRACTOR_PLAN_VERSION = 2
export const DISTRACTOR_PLAN_CALIBRATION = 'Uncalibrated editorial difficulty heuristic; selected options remain subject to reviewed answer-validity gates.'

export const DISTRACTOR_DIFFICULTY_BANDS = Object.freeze({
  foundation: Object.freeze({ id: 'foundation', relationPreference: 'far', purpose: 'known, clearly different options support early elimination' }),
  developing: Object.freeze({ id: 'developing', relationPreference: 'mixed', purpose: 'known options mix broad and related contrasts' }),
  challenge: Object.freeze({ id: 'challenge', relationPreference: 'near', purpose: 'known reviewed near-neighbours require precise discrimination' }),
})

const lower = (value, locale = 'sq') => String(value || '').normalize('NFC').toLocaleLowerCase(locale)
const clean = (value, locale = 'sq') => lower(value, locale).replace(/[^\p{L}\p{M}\p{N}]+/gu, '')

const editDistance = (left, right) => {
  const a = [...left]
  const b = [...right]
  const row = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i++) {
    let diagonal = row[0]
    row[0] = i
    for (let j = 1; j <= b.length; j++) {
      const above = row[j]
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, diagonal + (a[i - 1] === b[j - 1] ? 0 : 1))
      diagonal = above
    }
  }
  return row[b.length]
}

const orthographicSimilarity = (left, right) => {
  const a = clean(left)
  const b = clean(right)
  if (!a || !b) return 0
  return Number((1 - editDistance(a, b) / Math.max(a.length, b.length)).toFixed(3))
}

const safeCount = (value) => Number.isFinite(Number(value)) ? Math.max(0, Number(value)) : 0

const learnerEvidence = (id, { discovered, mana, practiced, wordProgress, wordExposure }) => {
  const progress = wordProgress?.[id] || {}
  const recognitionAspectWins = Object.entries(progress.aspectProofs || {})
    .filter(([key]) => key.endsWith('|lexical-meaning-recognition'))
    .reduce((maximum, [, proof]) => Math.max(maximum, safeCount(proof?.wins)), 0)
  const recognitionWins = Math.max(safeCount(progress.wins?.['meaning-recognition']), recognitionAspectWins)
  const productiveWins = Object.entries(progress.wins || {}).reduce((sum, [stageId, wins]) =>
    stageId === 'meaning-recognition' ? sum : sum + safeCount(wins), 0)
  const saved = discovered.has(id)
  const tokens = safeCount(mana?.[id])
  const practiceRewards = safeCount(practiced?.[id])
  const passiveExposure = safeCount(wordExposure?.[id]?.total)
  const proofStrength = recognitionWins + productiveWins
  const familiarity = proofStrength >= 3 ? 'well-practised'
    : proofStrength >= 1 || practiceRewards > 0 ? 'successfully-retrieved'
      : saved || tokens > 0 ? 'saved-only' : 'unseen'
  return {
    saved,
    tokens,
    practiceRewards,
    recognitionWins,
    productiveWins,
    passiveExposure,
    passiveExposureCountsAsMastery: false,
    familiarity,
    knownEnoughForAlbanianDiscrimination: saved && (recognitionWins > 0 || practiceRewards > 0 || tokens > 0),
  }
}

export function distractorDifficultyBandForPlan(plan = {}) {
  if (plan.contextReview || plan.contextVariantId === 'unmarked-context-recognition') return 'challenge'
  if (plan.stageId === 'meaning-recognition') return 'foundation'
  if (plan.stageId === 'reviewed-form-contrast') return 'foundation'
  if (plan.stageId === 'controlled-lemma-retrieval') {
    return (plan.variant?.distractors || 0) <= 1 ? 'developing' : 'challenge'
  }
  return Number(plan.tier) >= 3 ? 'challenge' : 'developing'
}

const relationFor = (answerId, candidateId, contextual, editorialHardContrast = null) => {
  const contrastRank = wordContrastRank(answerId, candidateId, { contextual })
  const targetRole = practiceContrastRole(answerId)
  const candidateRole = practiceContrastRole(candidateId)
  const sameAlbanianSurface = clean(DICT[answerId]?.al) === clean(DICT[candidateId]?.al)
  const sameRole = targetRole === candidateRole
  const similarity = orthographicSimilarity(DICT[answerId]?.al, DICT[candidateId]?.al)
  const type = sameAlbanianSurface ? 'same-spelling-reviewed-sense'
    : sameRole ? 'same-reviewed-function-or-semantic-role'
      : contrastRank <= 2 ? 'same-word-class-neighbour'
        : contrastRank <= 4 ? 'broad-same-kind-contrast' : 'unreviewed-relation'
  const score = Number(Math.min(1, Math.max(0,
    (Number.isFinite(contrastRank) ? (5 - Math.min(5, contrastRank)) / 5 : 0) * 0.75 + similarity * 0.25,
  )).toFixed(3))
  const heuristic = {
    type,
    contrastRank: Number.isFinite(contrastRank) ? contrastRank : null,
    targetRole,
    candidateRole,
    sameAlbanianSurface,
    orthographicSimilarity: similarity,
    confusability: { score, band: score >= 0.72 ? 'near' : score >= 0.42 ? 'medium' : 'far' },
  }
  if (!editorialHardContrast) return heuristic
  return {
    ...heuristic,
    type: 'editor-reviewed-hard-contrast',
    heuristicType: heuristic.type,
    contrastRank: heuristic.contrastRank ?? 3,
    editorialHardContrast: {
      relation: editorialHardContrast.relation,
      reason: editorialHardContrast.reason,
      source: editorialHardContrast.source,
      requiresContext: editorialHardContrast.requiresContext,
    },
  }
}

// Analytics needs the same relationship dimensions that rank real options,
// but never the learner-visible labels, editorial prose or private responses.
export function distractorRelationForAnalytics(answerId, candidateId, contextual = false) {
  if (!DICT[answerId] || !DICT[candidateId]) return null
  const hardContrast = !contextual ? practiceHardContrastLink(answerId, candidateId) : null
  const relation = relationFor(answerId, candidateId, contextual, hardContrast)
  return {
    type: relation.type,
    contrastRank: relation.contrastRank,
    sameAlbanianSurface: relation.sameAlbanianSurface,
    orthographicSimilarity: relation.orthographicSimilarity,
    confusability: relation.confusability,
  }
}

const compareForBand = (band) => (left, right) => {
  // If Albanian is visible in the answer choices, a known option always beats
  // an unseen shortcut. Relation then controls the intended difficulty.
  if (left.fairnessPriority !== right.fairnessPriority) return left.fairnessPriority - right.fairnessPriority
  if (band !== 'foundation' && left.editorialHardPriority !== right.editorialHardPriority) {
    return left.editorialHardPriority - right.editorialHardPriority
  }
  if (band === 'foundation') {
    if (left.relation.confusability.score !== right.relation.confusability.score) {
      return left.relation.confusability.score - right.relation.confusability.score
    }
  } else if (band === 'challenge') {
    if (left.relation.confusability.score !== right.relation.confusability.score) {
      return right.relation.confusability.score - left.relation.confusability.score
    }
  }
  if (left.relation.contrastRank !== right.relation.contrastRank) {
    return (left.relation.contrastRank ?? 99) - (right.relation.contrastRank ?? 99)
  }
  return left.randomOrder - right.randomOrder
}

/**
 * Plan sense distractors from real learner evidence and reviewed contrast
 * relationships. The returned selected ids drive the real question; its trace
 * is attached only when the caller is building a debug activity.
 */
export function planSenseDistractors({
  answerId,
  candidateIds = [],
  fallbackIds = Object.keys(DICT),
  count,
  field = 'en',
  promptField = 'al',
  contextual = false,
  difficultyBand = 'developing',
  discoveredIds = [],
  mana = {},
  practiced = {},
  wordProgress = {},
  wordExposure = {},
  excludeReason = () => null,
  labelOf = (id) => field === 'en' ? (DICT[id]?.enAll ?? DICT[id]?.en) : DICT[id]?.al,
  wrongOptionIsValid = (id) => !contextual && sensesMayShareAnswer(answerId, id),
  source = 'learner-and-registry-pool',
  useHardContrastRegistry = true,
  requireReviewedRelation = true,
  rng = Math.random,
} = {}) {
  const band = DISTRACTOR_DIFFICULTY_BANDS[difficultyBand] ? difficultyBand : 'developing'
  const hardRegistryEnabled = useHardContrastRegistry && !contextual
  const targetHardContrastReview = practiceHardContrastReview(answerId)
  const registryCandidateIds = hardRegistryEnabled
    ? practiceHardContrastCandidateIds(answerId)
    : []
  const discovered = new Set(discoveredIds)
  const local = new Set(candidateIds)
  const editorial = new Set(registryCandidateIds)
  const rows = []
  const usedLabels = new Set([lower(labelOf(answerId), field === 'al' ? 'sq' : 'en')])
  const ids = [...new Set([...candidateIds, ...registryCandidateIds, ...fallbackIds])]
  for (const id of ids) {
    const rejectionReasons = []
    const hardContrast = editorial.has(id) ? practiceHardContrastLink(answerId, id) : null
    if (id === answerId) rejectionReasons.push('candidate is the correct answer')
    if (!DICT[id]) rejectionReasons.push('candidate has no dictionary sense')
    if (DICT[id] && !isTrainableSense(id)) rejectionReasons.push('candidate is not trainable lexical material')
    if (hardRegistryEnabled && senseRequiresContextForHardContrast(id)) {
      rejectionReasons.push(`candidate is context-only: ${practiceHardContrastReview(id).reason}`)
    }
    if (hardRegistryEnabled && hardContrast?.requiresContext) {
      rejectionReasons.push('editorial hard-contrast link requires an authored disambiguating context')
    }
    const excluded = DICT[id] ? excludeReason(id) : null
    if (excluded) rejectionReasons.push(excluded)
    if (DICT[id] && !contextual && DICT[id]?.[promptField] === DICT[answerId]?.[promptField]) {
      rejectionReasons.push('candidate duplicates the bare prompt surface')
    }
    if (DICT[id] && wrongOptionIsValid(id)) rejectionReasons.push('candidate is a defensible alternative answer')
    const label = DICT[id] ? labelOf(id) : ''
    const labelKey = lower(label, field === 'al' ? 'sq' : 'en')
    if (!labelKey) rejectionReasons.push('candidate has no learner-visible label')
    if (labelKey && usedLabels.has(labelKey)) rejectionReasons.push('candidate duplicates a learner-visible option label')
    let relation = DICT[id] ? relationFor(answerId, id, contextual, hardContrast) : {
      type: 'missing', contrastRank: null, targetRole: null, candidateRole: null,
      sameAlbanianSurface: false, orthographicSimilarity: 0,
      confusability: { score: 0, band: 'far' },
    }
    if (DICT[id] && relation.contrastRank == null && source.startsWith('editor-reviewed')) {
      relation = {
        ...relation,
        type: 'editor-reviewed-task-specific-contrast',
        contrastRank: 3,
        confusability: {
          score: Number((0.35 + relation.orthographicSimilarity * 0.25).toFixed(3)),
          band: relation.orthographicSimilarity >= 0.5 ? 'medium' : 'far',
        },
      }
    }
    if (DICT[id] && relation.contrastRank == null && requireReviewedRelation) {
      rejectionReasons.push('candidate has no reviewed contrast relation to the target')
    }
    const evidence = learnerEvidence(id, { discovered, mana, practiced, wordProgress, wordExposure })
    const fairnessPriority = field === 'al' && !evidence.knownEnoughForAlbanianDiscrimination ? 1 : 0
    const editorialHardPriority = hardContrast ? 0 : 1
    rows.push({
      id,
      label,
      source: hardContrast
        ? `editor-reviewed-hard-contrast:${hardContrast.source}`
        : local.has(id) ? `${source}:preferred` : `${source}:fallback`,
      poolOrigin: hardContrast ? 'editorial-hard-contrast'
        : local.has(id) ? 'caller-preferred' : 'fallback',
      targetDifficultyBand: band,
      relation,
      learnerEvidence: evidence,
      fairnessPriority,
      editorialHardPriority,
      validity: { accepted: rejectionReasons.length === 0, rejectionReasons },
      randomOrder: rng(),
    })
  }

  const valid = rows.filter(({ validity }) => validity.accepted).sort(compareForBand(band))
  // Recheck label uniqueness after selection. A duplicate encountered earlier
  // is not rejected solely because a later unselected row happened to share it.
  const finalSelected = []
  const finalLabels = new Set([lower(labelOf(answerId), field === 'al' ? 'sq' : 'en')])
  for (const row of valid) {
    const key = lower(row.label, field === 'al' ? 'sq' : 'en')
    if (finalLabels.has(key)) continue
    finalLabels.add(key)
    finalSelected.push(row)
    if (finalSelected.length === count) break
  }
  const finalIds = finalSelected.map(({ id }) => id)
  const finalIdSet = new Set(finalIds)
  const tracedRows = rows.map((row) => ({
    ...row,
    randomOrder: undefined,
    fairnessPriority: undefined,
    editorialHardPriority: undefined,
    selection: finalIdSet.has(row.id)
      ? { selected: true, reason: band === 'foundation'
          ? 'known/fair option with a deliberately clearer relation for early elimination'
          : band === 'challenge'
            ? row.relation.editorialHardContrast
              ? `known/fair editorial hard contrast from ${row.relation.editorialHardContrast.source} for precise discrimination`
              : 'known/fair reviewed near-neighbour for precise discrimination'
            : row.relation.editorialHardContrast
              ? `known/fair editorial hard contrast from ${row.relation.editorialHardContrast.source} in the developing band`
              : 'known/fair option in the mixed developing band' }
      : { selected: false, reason: row.validity.accepted ? 'valid, but ranked below the selected difficulty/fairness mix' : 'failed answer-validity gate' },
  }))
  return {
    selectedIds: finalIds,
    complete: finalIds.length === count,
    trace: {
      version: DISTRACTOR_PLAN_VERSION,
      calibration: DISTRACTOR_PLAN_CALIBRATION,
      targetId: answerId,
      targetHardContrastReview: targetHardContrastReview
        ? {
            status: targetHardContrastReview.status,
            source: targetHardContrastReview.source,
            reason: targetHardContrastReview.reason || null,
            reviewedLinkCount: targetHardContrastReview.contrasts.length,
            activeForThisQuestion: hardRegistryEnabled,
          }
        : null,
      targetDifficultyBand: band,
      bandPolicy: DISTRACTOR_DIFFICULTY_BANDS[band],
      requested: count,
      selected: tracedRows.filter(({ id }) => finalIdSet.has(id)),
      rejected: tracedRows.filter(({ id }) => !finalIdSet.has(id)),
      candidateCount: rows.length,
      validityPolicy: requireReviewedRelation
        ? 'every selected option must be unique, trainable, reviewed-related, bare-safe rather than context-only, and not a defensible answer'
        : 'every selected option must come from the caller-reviewed saved pool, be unique and trainable, and not be a defensible answer',
      fairnessPolicy: 'unknown Albanian distractors never outrank a legal known distractor; passive exposure is disclosed but is not mastery',
    },
  }
}
