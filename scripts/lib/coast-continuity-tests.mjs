import assert from 'node:assert/strict'
import { STORY, STORY_OBSERVATION_BEATS, lineOf } from '../../src/game/content.js'
import '../../src/game/data/npcAppearances/core-world.js'
import { albanianTextOf } from '../../src/game/language.js'
import { canonicalPlayerActionId } from '../../src/game/playerActionRuntime.js'
import { resolveRevealLine } from '../../src/game/revealResolver.js'
import {
  canChoose, currentStoryState, hasCond, newRun, normalizeSavedState, reducer,
  storyScenePresentationForState, trainablePhraseSenses,
} from '../../src/game/gameState.js'
import { commitProjectedOption, settleProjectedState } from './story-projections.mjs'

const reload = (state) => normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
const lines = (state) => storyScenePresentationForState(state).normalEntries.map(({ line }) => line)
const prose = (state) => lines(state).map(albanianTextOf).join('\n')
const prepare = (state, option) => {
  const reveal = option.reveal ? resolveRevealLine(STORY[state.nodeId].text.map(lineOf), option).line : []
  const ids = new Set([...trainablePhraseSenses(option.text), ...trainablePhraseSenses(reveal || [])])
  const discovered = { ...state.discovered }, mana = { ...state.mana }, practiced = { ...state.practiced }
  for (const id of ids) {
    discovered[id] = true
    mana[id] = Math.max(20, mana[id] || 0)
    practiced[id] = Math.max(mana[id], practiced[id] || 0)
  }
  return { ...state, discovered, mana, practiced }
}
const take = (input, actionId) => {
  const legal = STORY[input.nodeId].options
    .filter((option) => !option.confuser && canonicalPlayerActionId(input.nodeId, option) === actionId)
    .map((option) => ({ option, state: prepare(input, option) }))
    .filter(({ option, state }) => canChoose(currentStoryState(state), option))
  assert.equal(legal.length, 1, `${input.nodeId}: expected exactly one legal ${actionId}`)
  const { option, state } = legal[0]
  const next = commitProjectedOption(state, option)
  assert.notEqual(next, state, `${actionId}: canonical reducer rejected the route`)
  assert.equal(next.nodeId, option.to)
  assert.equal(next.turn, state.turn + 1)
  assert.ok(next.actionSpeech, `${actionId}: accepted action lost its audio handoff`)
  return settleProjectedState(next)
}
const journey = () => {
  const before = new Map()
  let state = { ...newRun(), nodeId: 'bregu', clock: 9 }
  for (const actionId of [
    'observation:coast-tower',
    'bregu:degjo-motra',
    'balozmotra:degjo-motra',
    'baloztribut:degjo-motra',
    'balozzgjedh:jep-shpate-trim',
    'balozzgjedh:shko-ne-det-me-trim',
    'balozlufte:vrapo-mes-trim-dhe-gur',
    'balozkoke:kthehu-ne-kulle',
  ]) {
    before.set(state.nodeId, state)
    state = take(state, actionId)
  }
  assert.equal(state.nodeId, 'balozFitore')
  assert.equal(state.ended, 'good')
  assert.ok(hasCond(state, 'fact:coastalBalozDefeated'))
  const returned = reducer(state, { type: 'RETURN_TO_WORLD' })
  assert.notEqual(returned, state)
  assert.equal(returned.ended, null)
  assert.ok(hasCond(returned, 'fact:coastalBalozDefeated'))
  return { before, won: state, returned }
}
// These are scene projections of an actually earned and returned world state;
// they do not pretend the helper traversed an intervening overland journey.
const projectCoast = (state) => ({ ...state, nodeId: 'bregu', cameFrom: null, cameFromPhase: null,
  actionSpeech: null, timePassage: null, activeNpcPortraits: null })

export function checkCoastContinuity(check) {
  check('Baloz completion and return retire living siblings through reload', () => {
    const { returned } = journey()
    for (const state of [projectCoast(returned), reload(projectCoast(returned))]) {
      assert.match(prose(state), /Trimi dhe motra e tij janë në një varr\./)
      assert.match(prose(state), /balozi nuk merr më ar/)
      assert.doesNotMatch(prose(state), /nëntë plagë|motër jep ujë|flokët e motrës/)
      assert.ok(lines(state).every((line) => line.npcAppearance?.npcId !== 'gjergjElez'))
      const leave = STORY.bregu.options.find((option) => !option.confuser && option.to === 'deti1')
      assert.ok(canChoose(currentStoryState(prepare(state, leave)), leave), 'returned shore lost ordinary movement')
    }
  })
  check('all four fatal shore-sleep actions require the living Baloz', () => {
    const { before, won } = journey()
    const edges = Object.entries(STORY).flatMap(([nodeId, node]) => node.options
      .filter((option) => !option.confuser && option.to === 'bregFle').map((option) => ({ nodeId, option })))
    assert.deepEqual(edges.map(({ nodeId }) => nodeId).sort(), ['balozMotra', 'balozTribut', 'balozZgjedh', 'bregu'].sort())
    for (const { nodeId, option } of edges) {
      const initial = prepare(before.get(nodeId), option)
      assert.ok(canChoose(currentStoryState(initial), option), `${nodeId}: pre-victory danger was removed`)
      const postVictory = { ...initial, worldFacts: won.worldFacts }
      for (const state of [postVictory, reload(postVictory)]) {
        assert.equal(canChoose(currentStoryState(state), option), false, `${nodeId}: dead Baloz still permits fatal sleep`)
        assert.strictEqual(reducer(state, { type: 'CHOOSE', option, targetNode: STORY.bregFle,
          fromNodeId: nodeId, fromTurn: state.turn }), state, `${nodeId}: rejected sleep changed state`)
      }
    }
  })
  check('coast observation keeps exact indices and a truthful tower after victory', () => {
    const beat = STORY_OBSERVATION_BEATS.find(({ id }) => id === 'coast-tower')
    assert.equal(beat.beat, 'shore tower')
    assert.deepEqual(beat.lineIndices, [5, 6])
    assert.deepEqual(beat.optionIndices, [0])
    const { returned } = journey()
    let state = { ...projectCoast(returned), observations: {} }
    assert.ok(lines(state).every((line) => line.observation?.id !== 'coast-tower'), 'tower observation leaks before attention')
    const clock = state.clock
    state = take(state, 'observation:coast-tower')
    assert.equal(state.clock, clock, 'shore attention consumes time')
    assert.ok(state.observations['coast-tower'])
    for (const current of [state, reload(state)]) {
      assert.match(prose(current), /Këtu është një kullë\./i)
      assert.doesNotMatch(prose(current), /nëntë plagë|motër jep ujë|flokët e motrës/)
      const option = STORY.bregu.options.find((entry) => entry.observation?.id === 'coast-tower')
      assert.ok(option)
      assert.equal(canChoose(currentStoryState(prepare(current, option)), option), false, 'observation repeats after completion/reload')
    }
  })
}
