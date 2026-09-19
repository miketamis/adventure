import { captureEvent, currentAnalyticsStateSequence, getAnalyticsConsent } from '../analytics.js'
import { DICT } from './content.js'
import {
  distractorDifficultyBandForPlan,
  distractorRelationForAnalytics,
  DISTRACTOR_PLAN_VERSION,
} from './distractorPlanning.js'
import {
  analyticsOptionId,
  playtestGameRunId,
} from './playtestAnalytics.js'
import { trainQuestionWordKeys } from './phrasePractice.js'
import { trainQuestionTargetKeys } from './trainActivityBalance.js'

const safeNumber = (value, fallback = null) => Number.isFinite(Number(value)) ? Number(value) : fallback

const optionRows = (question) => {
  const rows = []
  const add = (options, correct, side = 'choice', phaseId = null) => {
    if (!Array.isArray(options)) return
    options.forEach((option, position) => {
      const value = typeof option === 'object' && option ? option.value ?? option.id : option
      rows.push({
        id: analyticsOptionId(value),
        rawId: typeof value === 'string' && DICT[value] ? value : null,
        position,
        side,
        phaseId,
        role: value === correct ? 'correct' : 'distractor',
      })
    })
  }
  add(question.options, question.answerValue ?? question.answerId)
  add(question.lexicalCheck?.options, question.lexicalCheck?.answerId, 'lexical')
  for (const [phaseId, phase] of Object.entries(question.phaseQuestions || {})) {
    add(phase.options, phase.answerValue, 'phase', phaseId)
  }
  add(question.left, null, 'matching-left')
  add(question.right, null, 'matching-right')
  if (Array.isArray(question.bank)) add(question.bank, null, 'construction-bank')
  return rows
}

const targetEvidence = (question, state) => {
  const targetId = question.answerId
  const progress = state.wordProgress?.[targetId]
  return {
    target_saved: Boolean(state.discovered?.[targetId]),
    target_tokens: Number(state.mana?.[targetId] || 0),
    target_practice_wins: Number(state.practiced?.[targetId] || 0),
    target_passive_exposure: Number(state.wordExposure?.[targetId]?.total || 0),
    target_remediation: progress?.remediation === true,
  }
}

export function captureTrainQuestionPresented(question, state) {
  if (!getAnalyticsConsent().structured || !question?.questionKey || state?.debug) return
  const rows = optionRows(question)
  const targetIds = trainQuestionTargetKeys(question)
  const wordIds = trainQuestionWordKeys(question)
  const properties = {
    game_run_id: playtestGameRunId(state),
    state_sequence: currentAnalyticsStateSequence(),
    story_run_sequence: state.storyRunSequence,
    question_id: question.questionKey,
    activity_type_id: question.activityTypeId,
    family_id: question.familyId || question.skill || 'word',
    kind: question.kind,
    variant_id: question.variantId,
    stage_id: question.wordStageId,
    mode: question.mode,
    direction: question.dir,
    tier: safeNumber(question.tier),
    target_ids: targetIds,
    word_ids: wordIds,
    aspect_ids: (question.aspectTargets || []).map(({ aspectId }) => aspectId).filter(Boolean),
    option_count: rows.length,
    correct_option_id: analyticsOptionId(question.answerValue ?? question.answerId),
    audio_required: question.requiresCompletedAudio === true,
    planner_version: DISTRACTOR_PLAN_VERSION,
    target_difficulty_band: distractorDifficultyBandForPlan(question),
    ...targetEvidence(question, state),
  }
  captureEvent('train_question_presented', properties, { receipt: `question:${question.questionKey}` })
  rows.forEach((row) => {
    const relation = row.rawId && question.answerId && row.rawId !== question.answerId
      ? distractorRelationForAnalytics(question.answerId, row.rawId, Boolean(question.contextReview))
      : null
    captureEvent('train_option_presented', {
      ...properties,
      option_id: row.id,
      option_role: row.role,
      option_side: row.side,
      phase_id: row.phaseId,
      position: row.position,
      distractor_relation: relation?.type,
      contrast_rank: relation?.contrastRank,
      confusability_score: relation?.confusability?.score,
      confusability_band: relation?.confusability?.band,
      same_albanian_surface: relation?.sameAlbanianSurface,
      orthographic_similarity: relation?.orthographicSimilarity,
    }, { receipt: `question-option:${question.questionKey}:${row.phaseId || row.side}:${row.position}:${row.id}` })
  })
}

export function captureTrainSchedulerDecision({ state, candidates, balanced }) {
  if (!getAnalyticsConsent().structured || state?.debug) return
  captureEvent('train_scheduler_decided', {
    game_run_id: playtestGameRunId(state),
    state_sequence: currentAnalyticsStateSequence(),
    story_run_sequence: state.storyRunSequence,
    candidate_count: candidates.length,
    eligible_count: candidates.length,
    target_ids: candidates.flatMap(({ question }) => trainQuestionTargetKeys(question)),
    selected_route: balanced.candidate?.route || 'caught-up',
    selected_activity_type_id: balanced.activityTypeId || 'none',
    random_boundary: safeNumber(balanced.randomBoundary),
    repeat_fallback: balanced.plan?.usesRepeatFallback === true,
  }, {
    receipt: `scheduler:${playtestGameRunId(state)}:${state.trainRound}:${balanced.candidate?.question?.questionKey || 'caught-up'}`,
  })
}
