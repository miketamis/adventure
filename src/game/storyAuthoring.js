import { STORY, lineOf, visibleLines } from './content.js'
import {
  canChoose,
  currentStoryState,
  hasCond,
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
} from './gameState.js'
import { englishReadingOf } from './language.js'
import { choiceSemanticsIssues, compoundIntentIssues } from './choiceSemantics.js'
import { PLACE_OF } from '../components/nodePositions.js'
import {
  WORLD_ENTITIES,
  worldActionIssues,
  worldActionOfOption,
  worldEntityRegistryIssues,
} from './worldEntities.js'

const tidy = (value) => String(value || '')
  .replace(/\s+([.!?:,;])/g, '$1')
  .replace(/\s+/g, ' ')
  .trim()

export const albanianTextOf = (line = []) => tidy(line
  .map((token) => token?.paren ? token.en : token?.al)
  .join(' '))

export function authoringSchemaIssues(story = STORY) {
  const issues = [...worldEntityRegistryIssues()]
  for (const [nodeId, node] of Object.entries(story || {})) {
    const at = (message) => issues.push(`${nodeId}: ${message}`)
    if (node?.id !== nodeId) at('registry key and node.id differ')
    if (!PLACE_OF[nodeId]) at('node has no canonical physical place')
    if (!Array.isArray(node?.text)) at('text must be an array')
    if (!Array.isArray(node?.options)) at('options must be an array')
    for (const [index, entry] of (node?.text || []).entries()) {
      if (!Array.isArray(lineOf(entry))) at(`text[${index}] is not a token line`)
    }
    for (const [index, option] of (node?.options || []).entries()) {
      const opt = (message) => at(`options[${index}]: ${message}`)
      if (!Array.isArray(option?.text) || !option.text.length) opt('choice has no token text')
      if (option?.to && !story[option.to]) opt(`unknown destination '${option.to}'`)
      for (const issue of choiceSemanticsIssues(option)) opt(issue)
      for (const issue of worldActionIssues(nodeId, option)) opt(issue)
      for (const issue of compoundIntentIssues(nodeId, option, PLACE_OF)) opt(issue)
    }
  }
  return Object.freeze(issues)
}

export function authoringStateDigest(state) {
  return Object.freeze({
    nodeId: state.nodeId,
    placeId: PLACE_OF[state.nodeId] || null,
    clock: state.clock,
    taleClock: state.conditionClock ?? null,
    turn: state.turn,
    hearts: state.hearts,
    inventory: Object.freeze({ ...(state.inventory || {}) }),
    flags: Object.freeze(Object.keys(state.flags || {}).filter((id) => state.flags[id]).sort()),
    knowledge: Object.freeze(Object.keys(state.knowledge || {}).sort()),
    observations: Object.freeze(Object.keys(state.observations || {}).sort()),
    quests: Object.freeze(Object.fromEntries(Object.entries(state.quests || {})
      .map(([id, quest]) => [id, quest.status]))),
  })
}

export function authoringSceneSnapshot(state) {
  const projected = currentStoryState(state)
  const node = STORY[state.nodeId]
  if (!node) return null
  const has = (id) => hasCond(projected, id)
  const lines = visibleLines(node, has).map((line) => Object.freeze({
    albanian: albanianTextOf(line),
    english: englishReadingOf(line),
  }))
  const options = (node.options || []).filter((option) => !option.confuser).map((option, index) => Object.freeze({
    index: node.options.indexOf(option),
    albanian: albanianTextOf(option.text),
    english: englishReadingOf(option.text),
    enabled: canChoose(projected, option),
    action: worldActionOfOption(node.id, option),
  }))
  return Object.freeze({ nodeId: node.id, state: authoringStateDigest(state), lines: Object.freeze(lines), options: Object.freeze(options) })
}

export function cloneAuthoringState(state) {
  const plain = JSON.parse(JSON.stringify(state || newRun()))
  return normalizeSavedState(plain, newRun())
}

function grantVocabulary(state, option) {
  return reducer(state, { type: 'DEBUG_GRANT', ids: phraseSenses(option.text) })
}

export function simulateAuthoringChoice(state, optionIndex, { vocabularyAssist = true } = {}) {
  const node = STORY[state?.nodeId]
  const option = node?.options?.[optionIndex]
  if (!node || !option || option.confuser) {
    return Object.freeze({ ok: false, reason: 'unknown-choice', state })
  }
  const before = cloneAuthoringState(state)
  const ready = vocabularyAssist ? grantVocabulary(before, option) : before
  if (!canChoose(currentStoryState(ready), option)) {
    return Object.freeze({
      ok: false,
      reason: 'choice-locked-by-world-state',
      state: ready,
      event: Object.freeze({ from: node.id, optionIndex, choice: albanianTextOf(option.text) }),
    })
  }
  const next = reducer(ready, {
    type: 'CHOOSE', option, fromNodeId: ready.nodeId, fromTurn: ready.turn,
    embodimentConfirmed: true,
  })
  if (next === ready) {
    return Object.freeze({ ok: false, reason: 'reducer-rejected-choice', state: ready })
  }
  return Object.freeze({
    ok: true,
    state: next,
    event: Object.freeze({
      from: node.id,
      optionIndex,
      choice: albanianTextOf(option.text),
      choiceEnglish: englishReadingOf(option.text),
      to: next.nodeId,
      before: authoringStateDigest(before),
      after: authoringStateDigest(next),
      action: worldActionOfOption(node.id, option),
    }),
  })
}

export function replayAuthoringRoute(baseState, steps, options = {}) {
  let state = cloneAuthoringState(baseState)
  const events = []
  for (const step of steps || []) {
    if (step.from !== state.nodeId) return Object.freeze({
      ok: false, reason: `route expected '${step.from}' but reached '${state.nodeId}'`, state, events,
    })
    const result = simulateAuthoringChoice(state, step.optionIndex, options)
    if (!result.ok) return Object.freeze({ ...result, events: Object.freeze(events) })
    state = result.state
    events.push(result.event)
  }
  return Object.freeze({ ok: true, state, events: Object.freeze(events) })
}

export function compareAuthoringReplay(baseState, steps, options = {}) {
  const first = replayAuthoringRoute(baseState, steps, options)
  const second = replayAuthoringRoute(baseState, steps, options)
  return Object.freeze({
    equal: JSON.stringify(first) === JSON.stringify(second),
    first,
    second,
  })
}

export const AUTHORING_SCHEMA = Object.freeze({
  version: 1,
  node: Object.freeze({ required: Object.freeze(['id', 'text', 'options']) }),
  option: Object.freeze({ required: Object.freeze(['text', 'to']) }),
  entitySchemaVersion: WORLD_ENTITIES && 1,
})
