import { STORY } from './content.js'
import { canChoose, currentStoryState } from './gameState.js'
import { embodimentOptionAccess } from './embodiment.js'
import { isOptionRevealed } from './revealVisibility.js'
import { normalizeTrainingTarget, resolveTrainingTarget } from './trainingTarget.js'

// Resolve only the story option whose own Train button opened practice. Even
// when training makes several sibling choices affordable at once, no sibling
// may borrow this target's return banner.
export function practiceReturnOption(state) {
  const practiceState = currentStoryState(state)
  const target = normalizeTrainingTarget(state.practiceTarget, practiceState.nodeId)
  const option = target && resolveTrainingTarget(target)
  const node = target && STORY[target.nodeId]
  if (!option || !node || option.confuser) return null
  if (!isOptionRevealed(practiceState, option, node)) return null
  if (!canChoose(practiceState, option)) return null
  if (!embodimentOptionAccess(state, option, STORY[option.to]).ok) return null
  return option
}
