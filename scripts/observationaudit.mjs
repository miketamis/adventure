// Release gate for progressive perception: optional detail is revealed by a
// persisted, same-place attention action without hiding every ordinary exit.

import assert from 'node:assert/strict'
import {
  STORY,
  STORY_OBSERVATION_BEATS,
  lineOf,
  visibleLines,
} from '../src/game/content.js'
import {
  hasCond,
  hasRequiredItem,
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
} from '../src/game/gameState.js'
import {
  OBSERVATION_POLICY,
  SCENE_LINE_ROLES,
  observationConditionId,
  observationIdOfLine,
  sceneLineRoleOf,
} from '../src/game/observations.js'

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push(true)
    console.log(`✓ ${name}`)
  } catch (error) {
    checks.push(false)
    console.log(`✗ ${name}: ${error.message}`)
  }
}

const observationOptions = (node) => node.options.filter((option) => option.contextObservation)

check('the shared policy limits attention density and keeps observations instantaneous', () => {
  assert.equal(OBSERVATION_POLICY.maxActionsPerScene, 2)
  assert.equal(OBSERVATION_POLICY.maxLinesPerBeat, 2)
  assert.equal(OBSERVATION_POLICY.durationHours, 0)
  assert.equal(OBSERVATION_POLICY.stateScope, 'run')
})

check('the authored audit covers the forest, dancers and a broad cross-section of tales', () => {
  assert.ok(STORY_OBSERVATION_BEATS.length >= 20)
  for (const id of ['forest-mountain', 'forest-dancers', 'dancers-song', 'dancers-tears']) {
    assert.ok(STORY_OBSERVATION_BEATS.some((beat) => beat.id === id), `missing ${id}`)
  }
  assert.ok(new Set(STORY_OBSERVATION_BEATS.map((beat) => beat.nodeId)).size >= 18)
  const forestListen = observationOptions(STORY.pylliLoop)
    .find((option) => option.observation.id === 'forest-dancers')
  const danceListen = observationOptions(STORY.shtojzovalle1)
    .find((option) => option.observation.id === 'dancers-song')
  assert.equal(forestListen.text.optionReadingAlbanian, 'dëgjo çfarë këndojnë shtojzovallet.')
  assert.equal(forestListen.text.optionReading, 'Listen to what the moon-dancers are singing.')
  assert.equal(danceListen.text.optionReadingAlbanian, 'dëgjo këngën e tyre.')
  assert.equal(danceListen.text.optionReading, 'Listen to their song.')
})

check('every line has exactly one reusable presentation role', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const entry of node.text) {
      assert.ok(Object.values(SCENE_LINE_ROLES).includes(sceneLineRoleOf(entry)), `${nodeId}: unclassified line`)
      const line = lineOf(entry)
      assert.ok(!(line.scenePriority === 'ambient' && observationIdOfLine(line)), `${nodeId}: line is both ambient and gated`)
    }
  }
})

check('each observation is a coherent 1–2 line same-place beat with a disappearing affordance', () => {
  const ids = new Set()
  for (const spec of STORY_OBSERVATION_BEATS) {
    assert.ok(!ids.has(spec.id), `duplicate ${spec.id}`)
    ids.add(spec.id)
    assert.ok(spec.lineIndices.length >= 1 && spec.lineIndices.length <= 2, `${spec.id}: detail is not 1–2 lines`)
    const node = STORY[spec.nodeId]
    const option = observationOptions(node).find((candidate) => candidate.observation.id === spec.id)
    assert.ok(option, `${spec.id}: no observation action`)
    assert.equal(option.to, spec.nodeId, `${spec.id}: attention moved the player`)
    assert.equal(option.durationHours, 0, `${spec.id}: attention advanced time`)
    assert.deepEqual(option.effects.at(-1), { type: 'observe', id: spec.id })
    assert.ok([].concat(option.unless).includes(observationConditionId(spec.id)), `${spec.id}: action does not disappear`)
    for (const index of spec.lineIndices) {
      assert.equal(observationIdOfLine(lineOf(node.text[index])), spec.id)
    }
  }
})

check('no scene offers more than two attention actions or loses every ordinary route', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    const observations = observationOptions(node)
    assert.ok(observations.length <= OBSERVATION_POLICY.maxActionsPerScene, `${nodeId}: too many attention actions`)
    if (!observations.length) continue
    const observedConditions = new Set(observations.map((option) => observationConditionId(option.observation.id)))
    assert.ok(node.options.some((option) => !option.confuser && !option.contextObservation &&
      ![].concat(option.requires || []).some((id) => observedConditions.has(id))),
    `${nodeId}: all ordinary choices were put behind attention`)
  }
})

check('detail and dependent routes reveal together and do not leak before attention', () => {
  for (const spec of STORY_OBSERVATION_BEATS) {
    const node = STORY[spec.nodeId]
    const condition = observationConditionId(spec.id)
    for (const index of spec.lineIndices) {
      const entry = node.text[index]
      const line = lineOf(node.text[index])
      const conditional = !Array.isArray(entry)
      const required = new Set(conditional && !entry.negate ? [].concat(entry.cond || []) : [])
      const excluded = new Set([
        ...(conditional && entry.negate ? [].concat(entry.cond || []) : []),
        ...(conditional ? [].concat(entry.none || []) : []),
      ])
      const matches = (id, observed) => id === condition
        ? observed
        : required.has(id) && !excluded.has(id)
      const before = visibleLines(node, (id) => matches(id, false))
      const after = visibleLines(node, (id) => matches(id, true))
      assert.ok(!before.includes(line), `${spec.id}: detail leaked`)
      assert.ok(after.includes(line), `${spec.id}: detail stayed hidden`)
    }
    for (const option of node.options.filter((candidate) => candidate.attentionGate?.id === spec.id)) {
      assert.ok([].concat(option.requires || []).includes(condition), `${spec.id}: dependent route is not gated`)
      assert.equal(hasCond({ observations: {} }, condition), false, `${spec.id}: route condition leaked`)
      assert.equal(hasCond({ observations: { [spec.id]: { atClock: 0, nodeId: spec.nodeId } } }, condition), true,
        `${spec.id}: route condition stayed hidden`)
    }
  }
})

check('an observation survives normalization and save/reload but resets with a new run', () => {
  let state = { ...newRun(), nodeId: 'pylliLoop', clock: 4 }
  const option = STORY.pylliLoop.options.find((candidate) => candidate.observation?.id === 'forest-mountain')
  for (const id of phraseSenses(option.text)) {
    state.discovered[id] = true
    state.mana[id] = 1
  }
  const next = reducer(state, {
    type: 'CHOOSE', option, targetNode: STORY.pylliLoop,
    fromNodeId: 'pylliLoop', fromTurn: state.turn,
  })
  assert.ok(next.observations['forest-mountain'])
  assert.equal(next.nodeId, 'pylliLoop')
  assert.equal(next.clock, state.clock)
  assert.equal(hasRequiredItem(next, option), false, 'completed attention action stayed visible')
  const loaded = normalizeSavedState(JSON.parse(JSON.stringify(next)), newRun())
  assert.deepEqual(loaded.observations, next.observations)
  assert.deepEqual(newRun().observations, {})
})

const failed = checks.filter((ok) => !ok).length
if (failed) {
  console.error(`\n${failed}/${checks.length} observation checks failed.`)
  process.exit(1)
}
console.log(`\n${checks.length}/${checks.length} observation checks pass.`)
