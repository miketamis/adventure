// Engine-architecture release gate.
//
// Mature interactive-fiction runtimes keep authored dialogue declarative,
// reject an action before mutation, and make an accepted action deterministic
// enough to resume from a serialized checkpoint. This audit pins those
// properties without adding player-facing undo or a transcript that could
// bypass the learning loop.
import assert from 'node:assert/strict'
import { ITEMS, STORY } from '../src/game/content.js'
import {
  canChoose,
  effectAvailabilityForOption,
  interactionAvailabilityForOption,
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
  rendezvousAvailabilityForOption,
} from '../src/game/gameState.js'

const checks = []
const check = (name, test) => {
  try {
    const detail = test()
    checks.push({ name, ok: true })
    console.log(`✓ ${name}${detail ? ` (${detail})` : ''}`)
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
    console.log(`✗ ${name}: ${error.message}`)
  }
}

const plainSnapshot = (value) => JSON.parse(JSON.stringify(value))

function assertDeclarative(value, path = '$', seen = new Set()) {
  const type = typeof value
  assert.notEqual(type, 'function', `${path} embeds executable authoring code`)
  assert.notEqual(type, 'symbol', `${path} embeds a symbol`)
  if (value == null || type !== 'object' || seen.has(value)) return
  seen.add(value)
  for (const [key, child] of Object.entries(value)) assertDeclarative(child, `${path}.${key}`, seen)
}

function deepFreeze(value, seen = new Set()) {
  if (value == null || typeof value !== 'object' || seen.has(value)) return value
  seen.add(value)
  for (const child of Object.values(value)) deepFreeze(child, seen)
  return Object.freeze(value)
}

function grantForOption(state, option) {
  return reducer(state, { type: 'DEBUG_GRANT', ids: phraseSenses(option.text) })
}

function choose(state, option) {
  return reducer(state, {
    type: 'CHOOSE',
    option,
    // The target is deliberately omitted: the canonical story graph owns it.
    fromNodeId: state.nodeId,
    fromTurn: state.turn,
  })
}

function openingActions() {
  const first = STORY.start.options.find((option) => option.to === 'bisedaUra1')
  const second = STORY.bisedaUra1.options.find((option) => option.to === 'bisedaUra2')
  assert.ok(first && second, 'opening replay fixture is no longer authored')
  return [first, second]
}

function replay(options, checkpointAt = -1) {
  let state = newRun()
  for (const [index, option] of options.entries()) {
    state = grantForOption(state, option)
    assert.equal(canChoose(state, option), true, `${state.nodeId}->${option.to} is not replayable`)
    state = choose(state, option)
    if (index === checkpointAt) {
      state = normalizeSavedState(plainSnapshot(state), newRun())
    }
  }
  return state
}

check('story and item authoring stays declarative and serializable', () => {
  assertDeclarative(STORY, 'STORY')
  assertDeclarative(ITEMS, 'ITEMS')
  assert.doesNotThrow(() => plainSnapshot(STORY))
  assert.doesNotThrow(() => plainSnapshot(ITEMS))
  return `${Object.keys(STORY).length} nodes`
})

check('choice checks are pure and leave frozen state and authoring untouched', () => {
  const before = deepFreeze(newRun())
  let options = 0
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      const localState = { ...before, nodeId }
      const authoredBefore = JSON.stringify(option)
      canChoose(localState, option)
      effectAvailabilityForOption(localState, option)
      interactionAvailabilityForOption(localState, option)
      rendezvousAvailabilityForOption(localState, option)
      assert.equal(JSON.stringify(option), authoredBefore, `${nodeId}->${option.to || 'confuser'} mutated authoring`)
      options++
    }
  }
  return `${options} choices`
})

check('accepted choices replay identically from the same state', () => {
  const options = openingActions()
  assert.deepEqual(replay(options), replay(options))
  return `${options.length} transitions`
})

check('a serialized midpoint resumes to the uninterrupted result', () => {
  const options = openingActions()
  // Compare canonical save shapes: in-memory reducers may retain harmless
  // zero counters which normalization deliberately omits.
  const uninterrupted = normalizeSavedState(plainSnapshot(replay(options)), newRun())
  const resumed = normalizeSavedState(plainSnapshot(replay(options, 0)), newRun())
  assert.deepEqual(resumed, uninterrupted)
  assert.equal(resumed.nodeId, 'bisedaUra2')
  assert.equal(resumed.turn, newRun().turn + options.length)
  return 'save after transition 1'
})

check('rejected and stale choices are identity-stable no-ops', () => {
  const [option] = openingActions()
  const fresh = newRun()
  assert.strictEqual(choose(fresh, option), fresh, 'locked choice allocated or mutated state')
  const ready = grantForOption(fresh, option)
  const accepted = choose(ready, option)
  assert.notStrictEqual(accepted, ready)
  const stale = reducer(accepted, {
    type: 'CHOOSE', option,
    fromNodeId: ready.nodeId,
    fromTurn: ready.turn,
  })
  assert.strictEqual(stale, accepted, 'stale replay allocated or mutated state')
})

const failed = checks.filter((result) => !result.ok)
if (failed.length > 0) {
  console.error(`\n${failed.length} action-pipeline contract(s) failed.`)
  process.exit(1)
}
console.log(`\nAction-pipeline audit passed (${checks.length} contracts).`)
