// Shared authoring contract for generated environmental fallback prose.
// A scene line marks only the dimensions its own visible wording communicates;
// presentation can then omit those generic facts without inspecting language.

export const ENVIRONMENT_DIMENSIONS = Object.freeze(['time', 'season', 'weather'])

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
