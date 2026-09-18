import { canonicalPlayerActionId } from './playerActionRuntime.js'

// Physical identity does not require a chart coordinate. These sites are
// source-bound, and only their exact authored entrances/internal actions can
// establish a current location. No additional save field is needed.
export const UNCHARTED_SITES = Object.freeze([
  Object.freeze({
    id: 'gjizar-beauty-ship', label: 'the Beauty’s ship',
    nodes: Object.freeze(['gjizarAnija', 'gjizarFund']),
    source: 'gjizar.harbor; Gjizar kenga 11.3–11.8',
    rationale: 'The prince rides to the Beauty’s ship and answers her aboard it; the source supplies no chart position for this ship.',
    owner: 'story-continuity',
    reviewTrigger: 'Any change to the source ship, its two scenes, their incoming actions or travel timing.',
    scope: Object.freeze({ maximumNodes: 2, maximumTransitions: 2 }),
    transitions: Object.freeze([
      Object.freeze({ id: 'gjizar-board-beauty-ship', from: 'gjizarKthim', to: 'gjizarAnija', actionId: 'gjizar-ride-to-ship', durationHours: 1 }),
      Object.freeze({ id: 'gjizar-answer-on-ship', from: 'gjizarAnija', to: 'gjizarFund', actionId: 'gjizar-tell-truth', durationHours: 0 }),
    ]),
  }),
])

export const UNCHARTED_SITE_NODES = Object.freeze(UNCHARTED_SITES.flatMap(({ nodes }) => nodes))
export const unchartedSiteOfNode = (nodeId) => UNCHARTED_SITES.find(({ nodes }) => nodes.includes(nodeId)) || null

export function unchartedSiteTransitionForChoice(from, option, story) {
  if (!story?.[from]?.options?.includes(option) || option.confuser || option.time || option.date || option.atHour != null) return null
  const site = unchartedSiteOfNode(option.to)
  const transition = site?.transitions.find((entry) => entry.from === from && entry.to === option.to &&
    entry.actionId === canonicalPlayerActionId(from, option) && entry.durationHours === option.durationHours)
  return transition ? { site, transition } : null
}

export function unchartedSiteContextForState(state, story) {
  if (!unchartedSiteOfNode(state?.nodeId) || !Number.isSafeInteger(state?.choiceIndex) || state.choiceIndex < 0 ||
      (state.ended || null) !== (story?.[state.nodeId]?.end || null)) return null
  const option = story?.[state.cameFrom]?.options?.[state.choiceIndex]
  return option?.to === state.nodeId ? unchartedSiteTransitionForChoice(state.cameFrom, option, story) : null
}
