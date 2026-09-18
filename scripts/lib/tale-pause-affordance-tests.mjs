import assert from 'node:assert/strict'
import fs from 'node:fs'
import { STORY } from '../../src/game/content.js'
import {
  canPauseEmbodiment, canonicalEmbodimentId, embodimentQuest, PUBLIC_FREE_ROAM_NODES,
} from '../../src/game/embodiment.js'
import {
  currentStoryState, newRun, normalizeSavedState, reducer, storyScenePresentationForState,
} from '../../src/game/gameState.js'
import { worldLocationForState } from '../../src/game/worldLocation.js'
import { checkKordhaGjizarCausality } from './kordha-gjizar-causality-tests.mjs'

const reload = (state) => normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
const presented = (state) => storyScenePresentationForState(state).normalEntries.map(({ line }) => line)
let contexts
export function ordinaryTalePauseContexts() {
  if (!contexts) {
    const journeys = checkKordhaGjizarCausality((_name, run) => run())
    contexts = new Map([...journeys.choicePoints.values()].map((state) => [state.nodeId, state]))
  }
  return contexts
}

// A sentence-only scene qualifies through an actual, normally rendered action,
// not a list of tale names. New gated-only scenes need a real route fixture and
// must satisfy the same role boundary, reducer and save/resume proof.
export function proveOrdinaryTalePauses(nodeIds) {
  const source = fs.readFileSync(new URL('../../src/components/EmbodimentFocus.jsx', import.meta.url), 'utf8')
  const normal = source.slice(source.indexOf('if (!state.debug) {'), source.indexOf('const focusState ='))
  assert.ok(normal.length, 'normal tale controls are absent')
  assert.match(normal, /disabled=\{!canPauseEmbodiment\(state\)\} onClick=\{\(\) => dispatch\(\{ type: 'PAUSE_EMBODIMENT' \}\)\}>\s*Explore public roads for now\s*<\/button>/u)
  const verified = new Set()
  for (const nodeId of nodeIds) {
    const reached = ordinaryTalePauseContexts().get(nodeId)
    assert.ok(reached, `${nodeId}: no real-route proof of an ungated ordinary control`)
    const quest = embodimentQuest(reached.embodying)
    assert.ok(quest?.nodes.includes(nodeId), `${nodeId}: Pause fixture has no bound role`)
    assert.ok(reached.storyReadings.length, `${nodeId}: fixture has no presented reading receipts`)
    assert.ok(STORY[nodeId].options.filter((option) => !option.confuser).every((option) => option.reveal))
    const incoming = Object.entries(STORY).flatMap(([from, scene]) => scene.options
      .filter((option) => !option.confuser && option.to === nodeId).map((option) => ({ from, option })))
    assert.ok(incoming.length, `${nodeId}: no canonical entrance`)
    for (const { from, option } of incoming) assert.ok(
      option.become ? canonicalEmbodimentId(option.become) === canonicalEmbodimentId(reached.embodying)
        : quest.nodes.includes(from),
      `${from}->${nodeId}: an unbound entrance cannot inherit the tale's Pause affordance`,
    )
    for (const state of [reached, reload(reached)]) {
      assert.equal(state.debug, false)
      assert.equal(state.embodimentFocusNode, nodeId)
      assert.equal(canPauseEmbodiment(state), true)
      const paused = reducer(state, { type: 'PAUSE_EMBODIMENT' })
      assert.notStrictEqual(paused, state)
      assert.equal(paused.embodimentPaused, true)
      assert.ok(PUBLIC_FREE_ROAM_NODES.includes(paused.nodeId))
      assert.equal(paused.embodimentFocusNode, nodeId)
      assert.equal(canPauseEmbodiment(paused), false)
      const resumed = reducer(reload(paused), { type: 'RESUME_EMBODIMENT' })
      assert.equal(resumed.embodimentPaused, false)
      for (const key of ['nodeId', 'cameFrom', 'choiceIndex', 'cameFromPhase', 'clock', 'embodimentClock'])
        assert.equal(resumed[key], state[key], `${nodeId}: Pause changed ${key}`)
      assert.equal(currentStoryState(resumed).conditionClock, currentStoryState(state).conditionClock)
      assert.deepEqual(presented(resumed), presented(state))
      assert.deepEqual(worldLocationForState(resumed), worldLocationForState(state))
      for (const key of ['flags', 'inventory', 'eligible']) assert.deepEqual(resumed[key], state[key])
    }
    for (const mutation of [
      { embodying: null }, { ended: 'good' }, { embodimentPaused: true },
      { timePassage: { from: 1, to: 2 } }, { embodimentFocusNode: 'start' }, { nodeId: 'start' },
      { nodeId: quest.endings[0], embodimentFocusNode: quest.endings[0] },
    ]) {
      const invalid = { ...reached, ...mutation }
      assert.equal(canPauseEmbodiment(invalid), false, `${nodeId}: invalid Pause became available`)
      assert.strictEqual(reducer(invalid, { type: 'PAUSE_EMBODIMENT' }), invalid)
    }
    const withoutWords = { ...reached, discovered: {}, mana: {} }
    assert.equal(canPauseEmbodiment(withoutWords), true, `${nodeId}: Pause depends on decoded vocabulary`)
    assert.equal(reducer(withoutWords, { type: 'PAUSE_EMBODIMENT' }).embodimentPaused, true)
    verified.add(nodeId)
  }
  return verified
}
