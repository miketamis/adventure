import { canonicalPlayerActionId } from './playerActionRuntime.js'
import { UNCHARTED_SITE_NODES } from './unchartedSites.js'

// An ending may leave a known place without naming another charted place.
// These exact incoming actions preserve that distinction without saved shadow
// state, invented coordinates, companions, or inferred region membership.
export const DEPARTURE_CONTEXTS = Object.freeze([
  { id: 'maro-wedding-withdrawal', from: 'maroKrushqit', to: 'maroPrincesha', actionId: 'marokrushqit:ik-pa-fjale', durationHours: 0,
    reason: 'Immediate wedding withdrawal; destination unspecified.' },
  { id: 'maro-palace-withdrawal', from: 'maroPallati', to: 'maroPrincesha', actionId: 'maropallati:ik-nga-pallat-para-se-femije-te-subj-lind', durationHours: 1,
    reason: 'One-hour palace departure; destination unspecified.' },
  { id: 'maro-son-departure', from: 'maroGjilpera', to: 'maroPrincesha', actionId: 'maro-leave-with-son', durationHours: 1,
    reason: 'One-hour departure with her son; destination unspecified.' },
].map((entry) => Object.freeze(entry)))
export const UNCHARTED_STORY_NODES = Object.freeze([...new Set(DEPARTURE_CONTEXTS.map(({ to }) => to)), ...UNCHARTED_SITE_NODES])
export const isUnchartedStoryNode = (nodeId) => UNCHARTED_STORY_NODES.includes(nodeId)

export function departureContextForChoice(from, option, story) {
  if (!story?.[from]?.options?.includes(option) || option.confuser) return null
  return DEPARTURE_CONTEXTS.find((entry) => entry.from === from && entry.to === option.to &&
    entry.actionId === canonicalPlayerActionId(from, option)) || null
}
