import { STORY, lineOf, visibleLines } from './content.js'
import { environmentSnapshot, hasCond, isBacktrack } from './gameState.js'
import { isDistantLineVisible } from './worldModel.js'
import { resolveRevealLine } from './revealResolver.js'

// One player-visibility rule for every surface that talks about an available
// action. In particular, the training screen must not spoil or advertise a
// route whose signpost sentence is still hidden in the current conditions.
export function isOptionRevealed(state, option, node = STORY[state.nodeId], renderedLines = null) {
  if (!option?.reveal) return true
  if (!node) return false
  if (isBacktrack(state, option.to) || state.visited?.[option.to]) return true

  const revealLine = resolveRevealLine(node.text.map(lineOf), option).line
  if (!revealLine) return true
  const lines = renderedLines || visibleLines(node, (id) => hasCond(state, id)).filter((line) =>
    isDistantLineVisible(state.nodeId, line, environmentSnapshot(state)),
  )
  return lines.includes(revealLine) && revealLine.every((token) => !token.id || state.discovered[token.id])
}
