import { CEFR_PREPARATION_ACTIVITIES } from './cefrPreparation.js'
import {
  normalizeCefrPreparationState,
} from './cefrPreparationEvidenceState.js'
import { WORD_STAGE_DEFINITIONS, wordProgressStage } from './wordProgression.js'

export {
  emptyCefrPreparationState,
  normalizeCefrPreparationState,
  recordCefrPreparationAttempt,
} from './cefrPreparationEvidenceState.js'

const activityById = new Map(CEFR_PREPARATION_ACTIVITIES.map((entry) => [entry.id, entry]))
const safeRecord = (value) => value && typeof value === 'object' && !Array.isArray(value) ? value : {}

const strictMechanicPasses = (saved) => {
  const normalized = normalizeCefrPreparationState(saved)
  return Object.fromEntries(Object.entries(normalized.cefrPreparationPasses).flatMap(
    ([mechanicId, activityIds]) => {
      const valid = activityIds.filter((activityId) => activityById.get(activityId)?.mechanicId === mechanicId)
      return valid.length ? [[mechanicId, valid]] : []
    },
  ))
}

export function liveCefrPreparationEvidence(state, achievedLevels = []) {
  const wordStages = {}
  // Word progression is durable learning evidence, while `discovered` is the
  // set of clickable words encountered in the current story run. A reset may
  // clear the latter, but must not relock guided CEFR work the learner already
  // earned through Train.
  for (const [senseId, progress] of Object.entries(safeRecord(state?.wordProgress))) {
    const tier = wordProgressStage(progress)
    const stage = WORD_STAGE_DEFINITIONS[tier]
    if (stage) wordStages[senseId] = stage.id
  }
  return {
    achievedLevels: [...new Set(achievedLevels.filter((level) => level === 'A1' || level === 'A2'))],
    wordStages,
    mechanicPasses: strictMechanicPasses(state),
  }
}
