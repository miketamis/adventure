import {
  captureEvent,
  currentAnalyticsStateSequence,
  getAnalyticsSessionId,
  nextAnalyticsStateSequence,
} from '../analytics.js'

export const PLAYTEST_CHECKPOINT_VERSION = 1
export const PLAYTEST_CHECKPOINT_INTERVAL = 25

const safeId = (value, fallback = null, max = 240) => typeof value === 'string' && value
  ? value.slice(0, max)
  : fallback
const truthIds = (value) => Object.entries(value || {}).filter(([, present]) => present).map(([id]) => id).sort()
const countMap = (value) => Object.fromEntries(Object.entries(value || {})
  .filter(([, count]) => Number.isFinite(Number(count)))
  .map(([id, count]) => [id, Number(count)]))
const countTotal = (value) => Object.values(value || {}).reduce((sum, count) =>
  sum + (Number.isFinite(Number(count)) ? Number(count) : 0), 0)

const stableStringify = (value) => {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  if (value && typeof value === 'object') return `{${Object.keys(value).sort()
    .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`
  return JSON.stringify(value)
}

const stateHash = (value) => {
  const input = stableStringify(value)
  let left = 2166136261
  let right = 2246822507
  for (const character of input) {
    const point = character.codePointAt(0)
    left = Math.imul(left ^ point, 16777619)
    right = Math.imul(right ^ point, 3266489909)
  }
  return `${(left >>> 0).toString(16).padStart(8, '0')}${(right >>> 0).toString(16).padStart(8, '0')}`
}

const replayValue = (value, depth = 0) => {
  if (depth > 10 || value == null) return value == null ? null : undefined
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
  if (typeof value === 'string') return /^[\p{L}\p{N}][\p{L}\p{N}._:@/|,+%\-]*$/u.test(value)
    ? value.slice(0, 700) : undefined
  if (Array.isArray(value)) return value.slice(0, 512).map((child) => replayValue(child, depth + 1))
    .filter((child) => child !== undefined)
  if (typeof value !== 'object') return undefined
  const next = {}
  for (const [key, child] of Object.entries(value).slice(0, 1600)) {
    if (!/^[\p{L}\p{N}][\p{L}\p{N}._:@/|,+%\-]*$/u.test(key)) continue
    const safeChild = replayValue(child, depth + 1)
    if (safeChild !== undefined) next[key] = safeChild
  }
  return next
}

const CHECKPOINT_FIELDS = [
  'nodeId', 'cameFrom', 'cameFromPhase', 'choiceIndex', 'familiar', 'heard', 'rumor', 'trail',
  'discovered', 'deathUnsavedWords', 'inventory', 'flags', 'knowledge', 'observations',
  'environmentNarration', 'healthNarration', 'inventoryNarration', 'npcPortraitsSeen',
  'activeNpcPortraits', 'interactions', 'rendezvous', 'questStateVersion', 'quests', 'hearts',
  'healedAt', 'turn', 'clock', 'embodimentClock', 'fixtures', 'npcStarted', 'worldFacts', 'view',
  'ended', 'embodying', 'embodimentOriginNode', 'embodimentFocusNode', 'embodimentWorldNode',
  'embodimentPaused', 'dismissedTests', 'trainHealingStreak', 'trainCorrectCombo',
  'actionSpeechSequence', 'storyRunSequence', 'mana', 'practiced', 'wordProgressVersion',
  'wordProgress', 'wordExposureVersion', 'wordExposure', 'wordExposureReceipts', 'formPracticed',
  'phrasePracticed', 'phraseMistakes', 'phraseProgressVersion', 'phraseProductionProgress',
  'phraseMastery', 'phraseListeningMastery', 'phraseMatchingMastery', 'phraseListeningProgress',
  'phraseMatchingProgress', 'trainRound', 'trainLastWords', 'trainLastQuestionKey',
  'trainActivityHistory', 'trainTargetHistory', 'trainHealthPolicyVersion', 'trainStageExposures',
  'wordMatchingProgressVersion', 'wordMatchingProgress', 'visited', 'earned', 'eligible', 'attempts',
]

export function replayCheckpointState(state) {
  const checkpoint = { checkpointVersion: PLAYTEST_CHECKPOINT_VERSION }
  for (const key of CHECKPOINT_FIELDS) {
    const value = replayValue(state?.[key])
    if (value !== undefined) checkpoint[key] = value
  }
  return checkpoint
}

export function replayStateHash(state) {
  return stateHash(replayCheckpointState(state))
}

export function replayCheckpointHash(checkpoint) {
  return stateHash(checkpoint)
}

export const playtestGameRunId = (state) => `${getAnalyticsSessionId()}:run-${state?.storyRunSequence || 1}`

const responseBand = (durationMs) => {
  if (!Number.isFinite(Number(durationMs)) || Number(durationMs) < 0) return 'unknown'
  if (durationMs < 3000) return 'under-3s'
  if (durationMs < 10000) return '3-10s'
  if (durationMs < 30000) return '10-30s'
  if (durationMs < 90000) return '30-90s'
  return 'over-90s'
}

const actionPayload = (action = {}) => {
  const payload = {
    id: action.id,
    option_id: action.optionId,
    option_index: action.optionIndex,
    from_node_id: action.fromNodeId,
    from_turn: action.fromTurn,
    target_node_id: action.targetNode?.id,
    item_id: action.item?.id,
    expected_count: action.expectedCount,
    expected_hearts: action.expectedHearts,
    view: action.view,
    question_id: action.questionKey,
    activity_type_id: action.activityTypeId,
    target_ids: action.targetKeys,
    correct: action.correct,
    selected_option_id: action.selectedOptionId,
    selected_target_id: action.selectedTargetId,
    selected_option_ids: action.selectedOptionIds,
    variant_id: action.variantId,
    stage_id: action.wordStageId,
    tier: action.tier,
    mode: action.mode,
    direction: action.direction,
    target_form_key: action.targetFormKey,
    phase_id: action.aspectPhaseId,
    word_ids: action.wordIds,
    word_keys: action.wordKeys,
    phrase_ids: action.phraseIds,
    reward_ids: action.rewardIds,
    skill: action.skill,
    type_scope: action.typeScope,
    focus_id: action.focusId,
    audio_completed: action.audioCompleted,
    activity_id: action.activityId,
    mechanic_id: action.mechanicId,
    passed: action.passed,
    support_revealed: action.supportRevealed,
  }
  return replayValue(payload)
}

const transitionDelta = (before, after) => ({
  node_id: before.nodeId === after.nodeId ? null : after.nodeId,
  view: before.view === after.view ? null : after.view,
  turn: Number(after.turn || 0) - Number(before.turn || 0),
  clock: Number(after.clock || 0) - Number(before.clock || 0),
  hearts: Number(after.hearts || 0) - Number(before.hearts || 0),
  money: Number(after.inventory?.lek || 0) - Number(before.inventory?.lek || 0),
  tokens: countTotal(after.mana) - countTotal(before.mana),
  discovered: truthIds(after.discovered).filter((id) => !before.discovered?.[id]),
  acquired_items: Object.entries(countMap(after.inventory)).filter(([id, count]) =>
    count > Number(before.inventory?.[id] || 0)).map(([id]) => id),
  lost_items: Object.entries(countMap(before.inventory)).filter(([id, count]) =>
    count > Number(after.inventory?.[id] || 0)).map(([id]) => id),
  ended: before.ended === after.ended ? null : after.ended,
})

export function captureRunCheckpoint(state, reason = 'interval') {
  const checkpoint = replayCheckpointState(state)
  const sequence = currentAnalyticsStateSequence()
  return captureEvent('run_checkpoint_recorded', {
    game_run_id: playtestGameRunId(state),
    state_sequence: sequence,
    story_run_sequence: state.storyRunSequence,
    node_id: state.nodeId,
    view: state.view,
    turn: state.turn,
    checkpoint_reason: reason,
    after_state_hash: stateHash(checkpoint),
    checkpoint_state: checkpoint,
  }, { receipt: `checkpoint:${playtestGameRunId(state)}:${reason}:${sequence}` })
}

export function captureCommittedTransition(action, before, after) {
  if (!action?.type || before === after || before?.debug || after?.debug) return false
  const sequence = nextAnalyticsStateSequence()
  const properties = {
    game_run_id: playtestGameRunId(after),
    state_sequence: sequence,
    story_run_sequence: after.storyRunSequence,
    action_type: action.type,
    action_id: action.optionId || action.id || action.questionKey || action.item?.id || action.type,
    action_payload: actionPayload(action),
    accepted: true,
    view_before: before.view,
    view_after: after.view,
    source_node_id: before.nodeId,
    destination_node_id: after.nodeId,
    turn_before: before.turn,
    turn_after: after.turn,
    clock_before: before.clock,
    clock_after: after.clock,
    hearts_before: before.hearts,
    hearts_after: after.hearts,
    money_before: before.inventory?.lek || 0,
    money_after: after.inventory?.lek || 0,
    token_total_before: countTotal(before.mana),
    token_total_after: countTotal(after.mana),
    ended: after.ended || 'active',
    before_state_hash: replayStateHash(before),
    after_state_hash: replayStateHash(after),
    state_delta: transitionDelta(before, after),
  }
  const captured = captureEvent('state_transition_committed', properties, {
    receipt: `transition:${playtestGameRunId(after)}:${sequence}:${action.type}:${properties.action_id}`,
  })

  if (action.type.startsWith('PRACTICE_') && action.type !== 'PRACTICE_CORRECT') {
    captureEvent('train_attempt_completed', {
      ...properties,
      question_id: action.questionKey,
      activity_type_id: action.activityTypeId,
      target_ids: action.id ? [action.id] : action.phraseIds || action.wordIds,
      word_ids: action.wordIds,
      variant_id: action.variantId,
      stage_id: action.wordStageId,
      mode: action.mode,
      direction: action.direction,
      tier: action.tier,
      selected_option_id: action.selectedOptionId,
      selected_target_id: action.selectedTargetId,
      selected_option_ids: action.selectedOptionIds,
      correct: action.correct,
      accepted_with_leeway: action.acceptedWithLeeway === true,
      response_duration_ms: Math.round(Number(action.responseDurationMs || 0) / 100) * 100,
      response_band: responseBand(action.responseDurationMs),
      audio_completed: action.audioCompleted,
      restored_heart: Number(after.hearts || 0) > Number(before.hearts || 0),
      miss_cost: Math.max(0, Number(before.hearts || 0) - Number(after.hearts || 0)),
      protected_attempt: action.correct === false && before.hearts === after.hearts,
    }, { receipt: `attempt:${action.questionKey}:${action.aspectPhaseId || 'complete'}` })
  }

  if (sequence > 0 && sequence % PLAYTEST_CHECKPOINT_INTERVAL === 0) captureRunCheckpoint(after, 'interval')
  if (before.storyRunSequence !== after.storyRunSequence) captureRunCheckpoint(after, 'run-start')
  if (before.ended !== after.ended && after.ended) captureRunCheckpoint(after, 'ending')
  return captured
}

export function captureSurfacePresented(state) {
  if (state?.debug) return false
  return captureEvent('surface_presented', {
    game_run_id: playtestGameRunId(state),
    state_sequence: currentAnalyticsStateSequence(),
    story_run_sequence: state.storyRunSequence,
    surface: state.view,
    view: state.view,
    node_id: state.nodeId,
    turn: state.turn,
    ended: state.ended || 'active',
  }, { receipt: `surface:${playtestGameRunId(state)}:${state.view}:${state.nodeId}:${state.turn}:${state.trainRound}` })
}

export function captureStoryChoicesPresented(state, entries) {
  if (state?.debug) return
  entries.forEach((entry, position) => {
    const availability = entry.roleBlocked ? 'role-blocked'
      : !entry.allDiscovered ? 'undiscovered-words'
        : !entry.enoughMana ? 'insufficient-tokens'
          : entry.affordable === false ? 'insufficient-money'
            : entry.interaction?.ok === false ? 'interaction-blocked'
              : entry.effectAvailability?.ok === false ? 'effect-blocked'
                : entry.ok ? 'available' : 'unavailable'
    captureEvent('story_choice_presented', {
      game_run_id: playtestGameRunId(state),
      state_sequence: currentAnalyticsStateSequence(),
      story_run_sequence: state.storyRunSequence,
      node_id: state.nodeId,
      turn: state.turn,
      choice_id: entry.key,
      choice_kind: entry.dynamicConfuser ? 'dynamic-confuser'
      : entry.heal ? 'heal'
        : entry.key?.startsWith('use-') ? 'item-use'
          : entry.real ? 'story-choice' : 'confuser',
      position,
      availability,
      target_node_id: entry.targetNodeId,
      required_word_ids: [...new Set((entry.tokens || []).map(({ id }) => id).filter(Boolean))],
      undiscovered_word_count: (entry.tokens || []).filter(({ id }) => id && !state.discovered?.[id]).length,
      token_deficit: (entry.tokens || []).reduce((sum, { id }) => id
        ? sum + Math.max(0, 1 - Number(state.mana?.[id] || 0)) : sum, 0),
      money_deficit: entry.lekAvailability?.need || 0,
    }, { receipt: `choice:${playtestGameRunId(state)}:${state.nodeId}:${state.turn}:${entry.key}:${availability}` })
  })
}

const hashOption = (value) => {
  let hash = 2166136261
  for (const character of String(value ?? 'empty')) {
    hash ^= character.codePointAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return `opaque-${(hash >>> 0).toString(16).padStart(8, '0')}`
}

export function analyticsOptionId(value) {
  const candidate = typeof value === 'object' && value
    ? value.id ?? value.value ?? value.key
    : value
  return typeof candidate === 'string' && /^[a-z0-9][a-z0-9:_-]*$/i.test(candidate)
    ? candidate.slice(0, 200)
    : hashOption(candidate)
}
