import { ELIRA_ERRAND_ADVANCE } from './economy.js'

// Ordinary overworld quests use one concurrent ledger. An objective's readiness
// is deliberately derived from canonical state each time it is queried: it is
// never copied into a second flag which can stay true after an item is spent.
export const QUEST_STATE_VERSION = 1
export const QUEST_STATUSES = Object.freeze([
  'offered',
  'active',
  'objectives-ready',
  'declined',
  'abandoned',
  'completed',
])

export const ELIRA_BREAD_SALT_QUEST_ID = 'elira-bread-salt'

export const QUESTS = Object.freeze({
  [ELIRA_BREAD_SALT_QUEST_ID]: Object.freeze({
    id: ELIRA_BREAD_SALT_QUEST_ID,
    issuerNpcId: 'elira',
    debugTitle: 'Bread and salt for Elira’s guest',
    objectives: Object.freeze([
      Object.freeze({ id: 'bread', predicate: Object.freeze({ type: 'inventory', id: 'buke', atLeast: 1 }) }),
      Object.freeze({ id: 'salt', predicate: Object.freeze({ type: 'inventory', id: 'kripe', atLeast: 1 }) }),
    ]),
    acceptEffects: Object.freeze([
      Object.freeze({ type: 'resource', id: 'lek', delta: ELIRA_ERRAND_ADVANCE }),
    ]),
    turnInEffects: Object.freeze([
      Object.freeze({ type: 'inventory', id: 'buke', delta: -1 }),
      Object.freeze({ type: 'inventory', id: 'kripe', delta: -1 }),
    ]),
    rewardTiming: 'advance-on-acceptance',
    itemPolicy: 'consume-on-turn-in',
    declinePolicy: 'reoffer-on-next-conversation',
    abandonPolicy: 'retain-items-and-close',
  }),
})

const isRecord = (value) => value != null && typeof value === 'object' && !Array.isArray(value)
const own = (record, id) => Object.prototype.hasOwnProperty.call(record || {}, id)
const safeClock = (value, fallback = 0) => Number.isFinite(value)
  ? Math.max(0, Math.floor(value))
  : Math.max(0, Math.floor(Number.isFinite(fallback) ? fallback : 0))

export const questDefinitionOf = (id, registry = QUESTS) => registry?.[id] || null

export function questDefinitionIssues(registry = QUESTS) {
  const issues = []
  for (const [key, quest] of Object.entries(registry || {})) {
    if (!quest || quest.id !== key) issues.push(`${key}: the registry key and stable quest id disagree`)
    if (!Array.isArray(quest?.objectives) || quest.objectives.length === 0) {
      issues.push(`${key}: no objectives`)
      continue
    }
    const objectiveIds = new Set()
    for (const objective of quest.objectives) {
      if (!objective?.id || objectiveIds.has(objective.id)) issues.push(`${key}: duplicate or missing objective id`)
      objectiveIds.add(objective?.id)
      if (objective?.predicate?.type !== 'inventory' || !objective.predicate.id ||
          !Number.isSafeInteger(objective.predicate.atLeast) || objective.predicate.atLeast < 1) {
        issues.push(`${key}:${objective?.id || '?'}: invalid canonical-state predicate`)
      }
    }
    if (!['advance-on-acceptance', 'reward-on-turn-in', 'no-reward'].includes(quest?.rewardTiming)) {
      issues.push(`${key}: invalid reward timing`)
    }
    if (!['consume-on-turn-in', 'retain-on-turn-in'].includes(quest?.itemPolicy)) {
      issues.push(`${key}: invalid item policy`)
    }
  }
  return issues
}

export function questObjectiveSatisfied(state, objective) {
  const predicate = objective?.predicate
  if (predicate?.type === 'inventory') {
    return Number.isSafeInteger(state?.inventory?.[predicate.id]) &&
      state.inventory[predicate.id] >= predicate.atLeast
  }
  return false
}

export function questObjectiveProgress(state, questId, registry = QUESTS) {
  const quest = questDefinitionOf(questId, registry)
  if (!quest) return []
  return quest.objectives.map((objective) => ({
    id: objective.id,
    predicate: objective.predicate,
    satisfied: questObjectiveSatisfied(state, objective),
  }))
}

export function questStoredStatus(state, questId) {
  return state?.quests?.[questId]?.status || null
}

export function questStatusOf(state, questId, registry = QUESTS) {
  const stored = questStoredStatus(state, questId)
  if (stored !== 'active') return stored
  const progress = questObjectiveProgress(state, questId, registry)
  return progress.length > 0 && progress.every((objective) => objective.satisfied)
    ? 'objectives-ready'
    : 'active'
}

export function questConditionMatches(state, condition, registry = QUESTS) {
  if (typeof condition !== 'string') return false
  const separator = condition.lastIndexOf(':')
  if (separator <= 0) return false
  const questId = condition.slice(0, separator)
  const requested = condition.slice(separator + 1)
  if (!QUEST_STATUSES.includes(requested) || !questDefinitionOf(questId, registry)) return false
  return questStatusOf(state, questId, registry) === requested
}

export function questActionSpecOf(option, registry = QUESTS) {
  const raw = option?.questAction
  if (raw == null) return null
  if (!isRecord(raw) || !questDefinitionOf(raw.id, registry) ||
      !['accept', 'decline', 'abandon', 'turn-in'].includes(raw.action)) return false
  return { id: raw.id, action: raw.action }
}

export function questActionEffectsOf(option, registry = QUESTS) {
  const spec = questActionSpecOf(option, registry)
  if (!spec) return []
  const quest = questDefinitionOf(spec.id, registry)
  if (spec.action === 'accept') return [...(quest.acceptEffects || [])]
  if (spec.action === 'turn-in') return [...(quest.turnInEffects || []), ...(quest.turnInRewards || [])]
  return []
}

export function questActionAvailability(state, option, registry = QUESTS) {
  const spec = questActionSpecOf(option, registry)
  if (spec == null) return { ok: true, tracked: false }
  if (spec === false) return { ok: false, tracked: true, reason: 'invalid-action' }
  const status = questStatusOf(state, spec.id, registry)
  if (spec.action === 'accept') {
    return status === 'offered'
      ? { ok: true, tracked: true, spec, status }
      : { ok: false, tracked: true, spec, status, reason: 'not-offered' }
  }
  if (spec.action === 'decline') {
    return status === 'offered'
      ? { ok: true, tracked: true, spec, status }
      : { ok: false, tracked: true, spec, status, reason: 'not-offered' }
  }
  if (spec.action === 'abandon') {
    return ['active', 'objectives-ready'].includes(status)
      ? { ok: true, tracked: true, spec, status }
      : { ok: false, tracked: true, spec, status, reason: 'not-active' }
  }
  return status === 'objectives-ready'
    ? { ok: true, tracked: true, spec, status }
    : { ok: false, tracked: true, spec, status, reason: 'objectives-not-ready' }
}

const questEntry = (status, clock, source, previous = {}) => ({
  ...previous,
  status,
  updatedAtClock: safeClock(clock),
  source: typeof source === 'string' ? source : null,
})

export function offerQuests(ledger, questIds, clock, source, registry = QUESTS) {
  if (!Array.isArray(questIds) || questIds.length === 0) return ledger || {}
  let next = ledger || {}
  for (const questId of questIds) {
    if (!questDefinitionOf(questId, registry)) continue
    const previous = next[questId]
    if (previous && previous.status !== 'declined') continue
    if (next === ledger) next = { ...next }
    next[questId] = {
      ...questEntry('offered', clock, source, previous),
      offeredAtClock: previous?.offeredAtClock ?? safeClock(clock),
      offerCount: Math.max(0, previous?.offerCount || 0) + 1,
    }
  }
  return next
}

export function applyQuestAction(ledger, availability, clock, source) {
  if (!availability?.ok || !availability.tracked || !availability.spec) return ledger || {}
  const { id, action } = availability.spec
  const previous = ledger?.[id]
  let entry
  if (action === 'accept') {
    entry = {
      ...questEntry('active', clock, source, previous),
      acceptedAtClock: safeClock(clock),
      acceptanceCount: Math.max(0, previous?.acceptanceCount || 0) + 1,
    }
  } else if (action === 'decline') {
    entry = { ...questEntry('declined', clock, source, previous), declinedAtClock: safeClock(clock) }
  } else if (action === 'abandon') {
    entry = { ...questEntry('abandoned', clock, source, previous), abandonedAtClock: safeClock(clock) }
  } else {
    entry = {
      ...questEntry('completed', clock, source, previous),
      completedAtClock: safeClock(clock),
      turnedInAtClock: safeClock(clock),
    }
  }
  return { ...(ledger || {}), [id]: entry }
}

export function normalizeQuestLedger(saved, maxClock = Infinity, legacy = {}, registry = QUESTS) {
  const next = {}
  if (isRecord(saved)) {
    for (const [id, raw] of Object.entries(saved)) {
      if (!questDefinitionOf(id, registry) || !isRecord(raw) ||
          !QUEST_STATUSES.includes(raw.status) || raw.status === 'objectives-ready') continue
      const status = raw.status
      const entry = { status }
      for (const key of [
        'offeredAtClock', 'acceptedAtClock', 'declinedAtClock', 'abandonedAtClock',
        'completedAtClock', 'turnedInAtClock', 'updatedAtClock',
      ]) {
        if (Number.isFinite(raw[key])) entry[key] = Math.min(safeClock(raw[key]), maxClock)
      }
      if (Number.isSafeInteger(raw.offerCount) && raw.offerCount > 0) entry.offerCount = raw.offerCount
      if (Number.isSafeInteger(raw.acceptanceCount) && raw.acceptanceCount > 0) entry.acceptanceCount = raw.acceptanceCount
      if (typeof raw.source === 'string') entry.source = raw.source.slice(0, 200)
      next[id] = entry
    }
  }

  // Old builds used porosiaMikut/sofraGati as hidden readiness flags. Preserve
  // only the lifecycle fact. `sofraGati` cannot invent bread or salt: the new
  // objective becomes ready solely when the canonical inventory really has both.
  if (!next[ELIRA_BREAD_SALT_QUEST_ID] && legacy.accepted) {
    const completed = legacy.completed === true
    next[ELIRA_BREAD_SALT_QUEST_ID] = {
      status: completed ? 'completed' : 'active',
      offeredAtClock: 0,
      acceptedAtClock: 0,
      acceptanceCount: 1,
      updatedAtClock: completed ? safeClock(maxClock) : 0,
      ...(completed
        ? { completedAtClock: safeClock(maxClock), turnedInAtClock: safeClock(maxClock) }
        : {}),
      source: 'legacy-errand-migration',
    }
  }
  return next
}
