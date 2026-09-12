// Author-tool contract: schema validation, reducer-backed sandboxing, route
// replay and transcript/state comparison all consume production sources.
import assert from 'node:assert/strict'
import { STORY } from '../src/game/content.js'
import { newRun } from '../src/game/gameState.js'
import {
  authoringSceneSnapshot,
  authoringSchemaIssues,
  cloneAuthoringState,
  compareAuthoringReplay,
  simulateAuthoringChoice,
} from '../src/game/storyAuthoring.js'

assert.deepEqual(authoringSchemaIssues(), [], 'story authoring schema has release issues')

const actual = newRun()
const sandbox = cloneAuthoringState(actual)
assert.notStrictEqual(sandbox, actual)
assert.deepEqual(sandbox, actual)
const firstIndex = STORY.start.options.findIndex((option) => option.to === 'bisedaUra1')
assert.ok(firstIndex >= 0)
const choice = simulateAuthoringChoice(sandbox, firstIndex, { vocabularyAssist: true })
assert.equal(choice.ok, true)
assert.equal(actual.nodeId, 'start', 'authoring sandbox mutated the supplied game state')
assert.equal(choice.state.nodeId, 'bisedaUra1')

const steps = [{ from: 'start', optionIndex: firstIndex }]
const comparison = compareAuthoringReplay(actual, steps, { vocabularyAssist: true })
assert.equal(comparison.equal, true, 'the same route diverged under deterministic replay')
assert.equal(comparison.first.events[0].choice, 'përshëndetje!')
assert.equal(comparison.first.events[0].to, 'bisedaUra1')

const snapshot = authoringSceneSnapshot(choice.state)
assert.equal(snapshot.nodeId, 'bisedaUra1')
assert.ok(snapshot.lines.length > 0)
assert.ok(snapshot.options.every((option) => option.action.from && option.action.to))

console.log(`✅ authoring sandbox validates ${Object.keys(STORY).length} nodes and deterministically replays production choices`)
