// Shared authoring contract for generated environmental fallback prose.
// A scene line marks only the dimensions its own visible wording communicates;
// presentation can then omit those generic facts without inspecting language.

import { civilDayPartAtClock } from './environment.js'

export const ENVIRONMENT_DIMENSIONS = Object.freeze(['time', 'season', 'weather'])

// The generated line belongs to the story, so it needs to know only whether
// the traveller is under open sky.  Keep this deliberately smaller than the
// world-region model: a forest, village and mountain can all truthfully use
// the same weather sentence, while an enclosed scene must place every sky fact
// outside.  Callers may derive the setting from a node, but this module never
// guesses from prose or from a node-name convention.
export const ENVIRONMENT_NARRATION_SETTINGS = Object.freeze(['outdoor', 'enclosed'])

export const ENVIRONMENT_NARRATION_POLICY = Object.freeze({
  // Generated fallback is scene context, not a paragraph or a status panel.
  maxLexicalTokens: 12,
  terminalSentences: 1,
})

export const ENVIRONMENT_NARRATION_STATE_VERSION = 3

export const WORLD_ENVIRONMENT_NARRATION_SCOPE = 'world'

const safeScopeId = (value) => typeof value === 'string' &&
  (value === WORLD_ENVIRONMENT_NARRATION_SCOPE || /^tale:[a-z][a-z0-9-]*$/u.test(value))

const cleanDimensions = (value) => [...new Set(
  Array.isArray(value) ? value : value instanceof Set ? [...value] : [],
)]
  .filter((dimension) => ENVIRONMENT_DIMENSIONS.includes(dimension))

const cleanSnapshot = (value) => Object.fromEntries(ENVIRONMENT_DIMENSIONS.flatMap((dimension) =>
  typeof value?.[dimension] === 'string' && value[dimension]
    ? [[dimension, value[dimension]]]
    : [],
))

const sameSnapshot = (left, right) => ENVIRONMENT_DIMENSIONS.every(
  (dimension) => left?.[dimension] === right?.[dimension],
)

export function environmentNarrationSnapshot(environment = {}) {
  return Object.freeze({
    time: civilDayPartAtClock(environment.clock ?? 0),
    season: typeof environment.season === 'string' && environment.season ? environment.season : 'spring',
    weather: typeof environment.weather === 'string' && environment.weather ? environment.weather : 'clear',
  })
}

const normalizeScopeState = (value) => {
  const communicated = cleanSnapshot(value?.communicated)
  const active = value?.active
  const activeSnapshot = cleanSnapshot(active?.snapshot)
  const normalizedActive = typeof active?.nodeId === 'string' && active.nodeId &&
    Number.isSafeInteger(active?.turn) && active.turn >= 1 &&
    ENVIRONMENT_DIMENSIONS.every((dimension) => activeSnapshot[dimension])
    ? {
        nodeId: active.nodeId,
        turn: active.turn,
        snapshot: activeSnapshot,
        fallbackDimensions: cleanDimensions(active.fallbackDimensions),
        authoredDimensions: cleanDimensions(active.authoredDimensions),
        previousSnapshot: cleanSnapshot(active.previousSnapshot),
      }
    : null
  return { communicated, active: normalizedActive }
}

export function normalizeEnvironmentNarrationState(value) {
  // Earlier ledgers stored one global snapshot. It cannot be assigned safely
  // after a save made inside a frozen tale or an overworld detour, so migrate
  // it to unknown rather than inventing a backwards time transition. Each
  // canonical clock domain will establish itself once on its next appearance.
  if (value?.version !== ENVIRONMENT_NARRATION_STATE_VERSION) {
    return { version: ENVIRONMENT_NARRATION_STATE_VERSION, scopes: {} }
  }
  const scopes = Object.fromEntries(Object.entries(value.scopes || {}).flatMap(([scopeId, scope]) =>
    safeScopeId(scopeId) ? [[scopeId, normalizeScopeState(scope)]] : [],
  ))
  return { version: ENVIRONMENT_NARRATION_STATE_VERSION, scopes }
}

// A presentation is stable for its current scene/turn, but a move or same-place
// action asks again whether anything actually changed. Missing history is not a
// transition: the opening moves from unknown conditions to the initial world
// state, so its un-authored dimensions are communicated once. Thereafter,
// previously communicated values stay silent and a visible authored line wins
// over the generic fallback.
export function planEnvironmentNarration(environment, value, {
  nodeId,
  turn,
  authoredDimensions = [],
  scopeId = WORLD_ENVIRONMENT_NARRATION_SCOPE,
} = {}) {
  const current = environmentNarrationSnapshot(environment)
  const state = normalizeEnvironmentNarrationState(value)
  const canonicalScopeId = safeScopeId(scopeId) ? scopeId : WORLD_ENVIRONMENT_NARRATION_SCOPE
  const scope = state.scopes[canonicalScopeId] || normalizeScopeState()
  const authored = cleanDimensions(authoredDimensions)
  if (scope.active?.nodeId === nodeId && scope.active.turn === turn &&
      sameSnapshot(scope.active.snapshot, current)) {
    const fallbackDimensions = scope.active.fallbackDimensions
    return {
      scopeId: canonicalScopeId,
      snapshot: current,
      authoredDimensions: scope.active.authoredDimensions,
      fallbackDimensions,
      previousSnapshot: scope.active.previousSnapshot,
      omitDimensions: ENVIRONMENT_DIMENSIONS.filter((dimension) => !fallbackDimensions.includes(dimension)),
      nextState: state,
      needsCommit: false,
    }
  }

  const changed = ENVIRONMENT_DIMENSIONS.filter((dimension) =>
    scope.communicated[dimension] !== current[dimension],
  )
  const previousSnapshot = { ...scope.communicated }
  const fallbackDimensions = changed.filter((dimension) => !authored.includes(dimension))
  // Once the initial unknown-to-known transition has established a baseline,
  // only a real value change can enter `fallbackDimensions` later.
  const communicated = { ...current }
  const nextScope = {
    communicated,
    active: {
      nodeId,
      turn,
      snapshot: { ...current },
      fallbackDimensions,
      authoredDimensions: authored,
      previousSnapshot,
    },
  }
  const nextState = {
    version: ENVIRONMENT_NARRATION_STATE_VERSION,
    scopes: { ...state.scopes, [canonicalScopeId]: nextScope },
  }
  return {
    scopeId: canonicalScopeId,
    snapshot: current,
    authoredDimensions: authored,
    fallbackDimensions,
    previousSnapshot,
    omitDimensions: ENVIRONMENT_DIMENSIONS.filter((dimension) => !fallbackDimensions.includes(dimension)),
    nextState,
    needsCommit: true,
  }
}

export function environmentNarrationSetting({ enclosed = false } = {}) {
  return enclosed ? 'enclosed' : 'outdoor'
}

export function normalizeEnvironmentNarrationSetting(setting, { enclosed = false } = {}) {
  if (ENVIRONMENT_NARRATION_SETTINGS.includes(setting)) return setting
  return environmentNarrationSetting({ enclosed })
}

export function describesEnvironment(dimensions, line) {
  const declared = [...new Set([].concat(dimensions || []))]
  if (!Array.isArray(line) || !declared.length || declared.some((dimension) => !ENVIRONMENT_DIMENSIONS.includes(dimension))) {
    throw new Error(
      `describesEnvironment(): dimensions must use ${ENVIRONMENT_DIMENSIONS.join(', ')} and wrap one token line`,
    )
  }
  return Object.assign(line, { environmentDimensions: Object.freeze(declared) })
}

export function authoredEnvironmentDimensions(lines = []) {
  const dimensions = new Set()
  for (const line of lines) {
    for (const dimension of line?.environmentDimensions || []) {
      if (ENVIRONMENT_DIMENSIONS.includes(dimension)) dimensions.add(dimension)
    }
  }
  return dimensions
}
