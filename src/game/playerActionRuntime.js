import { englishReadingOf } from './language.js'

// Stable runtime provenance primitives. Whole-graph inference and editorial
// validation live in playerActionProvenance.js so story construction and the
// reducer do not carry audit-only code into production chunks.
export const PLAYER_ACTION_KINDS = Object.freeze([
  'speech',
  'combat',
  'transfer',
  'acquisition',
  'use',
  'consumption',
  'observation',
  'performance',
  'commitment',
  'transaction',
])

export const PLAYER_ACTION_CONDITION_PREFIX = 'arrival:action:'

const unique = (values) => [...new Set(values)]
const tokenIdsOf = (line) => (line || []).map((token) => token?.id).filter(Boolean)
const slug = (value) => String(value || '')
  .normalize('NFKD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase('en')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')

export function authoredPlayerAction(actionId, { actorId = 'player' } = {}) {
  return Object.freeze({ id: actionId, actorId })
}

export function playerActionConditionId(actionId) {
  return `${PLAYER_ACTION_CONDITION_PREFIX}${actionId}`
}

export function playerActionIdFromCondition(conditionId) {
  return typeof conditionId === 'string' && conditionId.startsWith(PLAYER_ACTION_CONDITION_PREFIX)
    ? conditionId.slice(PLAYER_ACTION_CONDITION_PREFIX.length)
    : null
}

export function withPlayerActionConsequence(line, actionIds, { actorId = 'player' } = {}) {
  return Object.assign(line, {
    playerActionConsequence: Object.freeze({
      actionIds: Object.freeze(unique([].concat(actionIds || []).filter(Boolean))),
      actorId,
    }),
  })
}

export function canonicalPlayerActionId(sourceNodeId, option) {
  if (typeof option?.playerAction?.id === 'string' && option.playerAction.id) return option.playerAction.id
  const surface = tokenIdsOf(option?.text).join('-')
  const semanticSurface = slug(surface) || slug(englishReadingOf(option?.text || [])) || 'action'
  return `${slug(sourceNodeId) || 'unknown'}:${semanticSurface}`
}
