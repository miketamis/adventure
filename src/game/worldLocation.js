import { STORY } from './content.js'
import { NODE_POS, PLACE_OF } from '../components/nodePositions.js'
import { NODE_REGION } from './regions.js'
import { departureContextForChoice, isUnchartedStoryNode } from './departureContexts.js'

export function worldLocationForState(state) {
  const nodeId = state?.nodeId
  const departure = departureContextForState(state, STORY)
  if (isUnchartedStoryNode(nodeId)) return {
    kind: departure ? 'uncharted' : 'unknown', nodeId,
    placeId: null, regionId: null, position: null,
    departureId: departure?.id || null, originNodeId: departure?.from || null,
    originPlaceId: departure ? PLACE_OF[departure.from] || null : null,
    originRegionId: departure ? NODE_REGION[departure.from] || null : null,
  }
  return { kind: NODE_POS[nodeId] ? 'charted' : 'unknown', nodeId,
    placeId: PLACE_OF[nodeId] || null, regionId: NODE_REGION[nodeId] || null,
    position: NODE_POS[nodeId] || null, departureId: null, originNodeId: null, originPlaceId: null, originRegionId: null }
}

export function departureContextForState(state, story) {
  if (!isUnchartedStoryNode(state?.nodeId) || !Number.isSafeInteger(state?.choiceIndex) || state.choiceIndex < 0) return null
  const option = story?.[state.cameFrom]?.options?.[state.choiceIndex]
  if (option?.to !== state.nodeId) return null
  return departureContextForChoice(state.cameFrom, option, story)
}
