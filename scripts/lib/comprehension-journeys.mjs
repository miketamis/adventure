// Comprehension coverage uses actual projected source/destination scenes and
// the production receipt/reducer boundary. No authoring-only conditional line
// is made eligible merely because it shares a graph predecessor.
import assert from 'node:assert/strict'
import { STORY } from '../../src/game/content.js'
import { ACHIEVEMENTS } from '../../src/game/achievements.js'
import { NODE_REGION } from '../../src/game/regions.js'
import { reducer, storyScenePresentationForState } from '../../src/game/gameState.js'
import { storyReadingReceiptIds } from '../../src/game/storyReadings.js'
import { testFor } from '../../src/game/comprehension.js'
import { attachReviewedEnglishReadings } from '../../src/game/language.js'
import { REVIEWED_READINGS } from '../../src/game/data/readings/reviewedReadings.js'
import { loadNpcAppearancePartitions } from './loadnpcappearances.mjs'
import {
  commitProjectedOption,
  feasibleOptionProjection,
  settleProjectedState,
} from './story-projections.mjs'

await loadNpcAppearancePartitions()
attachReviewedEnglishReadings(STORY, REVIEWED_READINGS)

export function recordPresentedStoryReadings(input) {
  let state = settleProjectedState(input)
  if (state.pendingHeartConsequence) state = reducer(state, {
    type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: state.pendingHeartConsequence.eventId,
  })
  const plan = storyScenePresentationForState(state)
  return reducer(state, {
    type: 'RECORD_STORY_READINGS',
    nodeId: state.nodeId,
    turn: state.turn,
    lineIds: storyReadingReceiptIds(state.nodeId, plan.normalEntries.map(({ line }) => line)),
  })
}

let contexts = null
export function comprehensionJourneyContexts() {
  if (contexts) return contexts
  contexts = []
  const endings = new Set(ACHIEVEMENTS.filter(({ kind }) => kind !== 'area').map(({ id }) => id))
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [optionIndex, option] of node.options.entries()) {
      if (option.confuser || !endings.has(option.to)) continue
      const source = feasibleOptionProjection(nodeId, option)
      assert.ok(source, `${nodeId}.options[${optionIndex}]: no feasible ending approach`)
      const before = recordPresentedStoryReadings(source)
      const after = recordPresentedStoryReadings(commitProjectedOption(before, option))
      assert.equal(after.nodeId, option.to, `${nodeId}: ending choice was rejected`)
      contexts.push({
        id: option.to,
        route: `${nodeId}.options[${optionIndex}] -> ${option.to}`,
        before,
        state: after,
      })
    }
  }
  // Area assessments sample only genuinely projectable regional language.
  // Achievement eligibility is isolated here; the visit threshold itself has
  // its own production state tests. Every included receipt is reducer-checked.
  for (const achievement of ACHIEVEMENTS.filter(({ kind }) => kind === 'area')) {
    for (const [nodeId, node] of Object.entries(STORY)) {
      if (NODE_REGION[nodeId] !== achievement.region || node.end) continue
      const option = node.options.find((candidate) => !candidate.confuser)
      if (!option) continue
      const source = feasibleOptionProjection(nodeId, option)
      if (!source || source.embodying) continue
      const state = recordPresentedStoryReadings({
        ...source,
        eligible: { ...source.eligible, [achievement.id]: true },
      })
      contexts.push({ id: achievement.id, route: `regional encounter ${nodeId}`, before: source, state })
    }
  }
  return contexts
}

export function comprehensionContextFor(achievementOrId) {
  const id = typeof achievementOrId === 'string' ? achievementOrId : achievementOrId.id
  const achievement = ACHIEVEMENTS.find((entry) => entry.id === id)
  const context = comprehensionJourneyContexts().find((entry) =>
    entry.id === id && testFor(achievement, 0, entry.state)?.length)
  assert.ok(context, `${id}: no actually presented reading context yields a question`)
  return context.state
}

export function passedComprehensionAction(state, id) {
  const achievement = ACHIEVEMENTS.find((entry) => entry.id === id)
  const expectedAttempt = state.attempts?.[id] || 0
  const questions = testFor(achievement, expectedAttempt, state)
  assert.ok(questions?.length, `${id}: no receipt-backed comprehension check`)
  return {
    type: 'EARN_ACHIEVEMENT',
    id,
    expectedAttempt,
    answers: questions.map(({ correct }) => correct),
  }
}
