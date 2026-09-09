// Shared authoring contract for generated environmental fallback prose.
// A scene line marks only the dimensions its own visible wording communicates;
// presentation can then omit those generic facts without inspecting language.

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
