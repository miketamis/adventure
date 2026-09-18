import { STORY } from './content.js'
import { arrivalOptionOf, hasCond } from './gameState.js'
import { canonicalPlayerActionId } from './playerActionRuntime.js'
import { ENDING_COPY, ENDING_COPY_VARIANTS } from './endingCopy.js'

// This module and its prose are loaded only by ending/collection surfaces.
// Resolve every render from the live arrival: a cached node-only recap could
// silently keep a different branch after loading or changing the same ending.
export function endingCopyForState(state) {
  const common = ENDING_COPY[state?.nodeId]
  if (!common) return null
  const fallback = { ...common, variantId: 'common' }
  const node = STORY[state.nodeId]
  if (!node?.end || state.ended !== node.end) return fallback
  const arrival = arrivalOptionOf(state)
  if (!arrival) return fallback
  const actionId = canonicalPlayerActionId(state.cameFrom, arrival)
  const matching = (ENDING_COPY_VARIANTS[state.nodeId] || []).filter((variant) =>
    variant.from === state.cameFrom && variant.actionId === actionId &&
    variant.required.every((condition) => hasCond(state, condition)) &&
    variant.excluded.every((condition) => !hasCond(state, condition)),
  )
  // A missing/stale arrival or ambiguous authoring must never select a nearby
  // route's claims. The catalog's common outcome remains safe in either case.
  if (matching.length !== 1) return fallback
  const [variant] = matching
  return {
    title: variant.title || common.title,
    blurb: variant.blurb,
    variantId: variant.id,
  }
}
