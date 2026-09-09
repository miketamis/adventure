import { STORY } from './content.js'

// A training hand-off must survive option shuffling, saves, and ordinary
// rerenders without turning an array position into identity. Canonicalize the
// authored option itself: object key order is irrelevant, while a meaningful
// edit to its destination, phrase, conditions, timing, or effects makes an old
// target stale instead of silently pointing at a different action.
const canonicalValue = (value) => {
  if (value == null || typeof value !== 'object') {
    return typeof value === 'function' || value === undefined ? undefined : value
  }
  if (Array.isArray(value)) return value.map((entry) => canonicalValue(entry) ?? null)
  return Object.fromEntries(
    Object.keys(value).sort().flatMap((key) => {
      const normalized = canonicalValue(value[key])
      return normalized === undefined ? [] : [[key, normalized]]
    }),
  )
}

export const optionTrainingIdentity = (option) =>
  option && typeof option === 'object' ? `option-v1:${JSON.stringify(canonicalValue(option))}` : null

export const trainingTargetForOption = (nodeId, option) => {
  if (!STORY[nodeId]?.options?.includes(option)) return null
  const optionIdentity = optionTrainingIdentity(option)
  return optionIdentity ? { nodeId, optionIdentity } : null
}

export const resolveTrainingTarget = (target) => {
  if (!target || typeof target !== 'object' || Array.isArray(target)) return null
  if (typeof target.nodeId !== 'string' || typeof target.optionIdentity !== 'string') return null
  // Bound untrusted saved data before comparing it with the canonical graph.
  if (target.optionIdentity.length === 0 || target.optionIdentity.length > 4096) return null
  const matches = (STORY[target.nodeId]?.options || []).filter(
    (option) => optionTrainingIdentity(option) === target.optionIdentity,
  )
  // Ambiguity must fail closed: never substitute a sibling option.
  return matches.length === 1 ? matches[0] : null
}

export const normalizeTrainingTarget = (target, currentNodeId) => {
  const option = resolveTrainingTarget(target)
  if (!option || target.nodeId !== currentNodeId) return null
  return {
    nodeId: target.nodeId,
    optionIdentity: optionTrainingIdentity(option),
  }
}
