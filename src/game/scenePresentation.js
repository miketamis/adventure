// A story card is a learning surface, not a transcript dump. Core prose is
// paged instead of discarded; optional atmosphere may fill spare room but can
// never create another page. A reveal-bearing line is always core, even when
// its author marked it ambient.

export const SCENE_PAGE_POLICY = Object.freeze({
  maxLines: 8,
  maxLexicalTokens: 72,
  maxAmbientLines: 2,
})

export const lexicalTokenCount = (line) =>
  (line || []).reduce((count, token) => count + (token?.id ? 1 : 0), 0)

export const isAmbientLine = (line) => line?.scenePriority === 'ambient'

const pageMeasure = (entries) => ({
  lines: entries.length,
  lexicalTokens: entries.reduce((sum, entry) => sum + lexicalTokenCount(entry.line), 0),
})

const fits = (entries, policy) => {
  const measure = pageMeasure(entries)
  return measure.lines <= policy.maxLines && measure.lexicalTokens <= policy.maxLexicalTokens
}

const rotated = (entries, seed) => {
  if (entries.length < 2) return entries
  const offset = Math.abs(Number(seed) || 0) % entries.length
  return [...entries.slice(offset), ...entries.slice(0, offset)]
}

const paginate = (entries, policy) => {
  if (!entries.length) return [[]]
  const pages = []
  let page = []
  for (const entry of entries) {
    if (page.length && !fits([...page, entry], policy)) {
      pages.push(page)
      page = []
    }
    page.push(entry)
  }
  if (page.length) pages.push(page)
  return pages
}

export function planScenePresentation(entries, {
  debug = false,
  pinnedLines = [],
  seed = 0,
  policy = SCENE_PAGE_POLICY,
} = {}) {
  const source = (entries || []).filter((entry) => Array.isArray(entry?.line))
  const pinned = new Set(pinnedLines)
  const core = source.filter((entry) => !isAmbientLine(entry.line) || pinned.has(entry.line))
  const optional = source.filter((entry) => isAmbientLine(entry.line) && !pinned.has(entry.line))
  const selected = new Set(core)

  // Atmosphere can make a short scene feel alive, but it may not be the reason
  // a learner must click through another card. Rotate spare-room candidates by
  // visit/turn so a revisited hub can reveal a different small detail.
  if (fits(core, policy)) {
    let ambientAdded = 0
    for (const entry of rotated(optional, seed)) {
      if (ambientAdded >= policy.maxAmbientLines) break
      const proposal = source.filter((candidate) => selected.has(candidate) || candidate === entry)
      if (!fits(proposal, policy)) continue
      selected.add(entry)
      ambientAdded++
    }
  }

  const normalEntries = source.filter((entry) => selected.has(entry))
  const normalPages = paginate(normalEntries, policy)
  const pages = debug ? [source] : normalPages
  const omittedAmbient = optional.filter((entry) => !selected.has(entry))
  const oversized = normalEntries.filter((entry) => lexicalTokenCount(entry.line) > policy.maxLexicalTokens)

  return {
    pages,
    normalPages,
    omittedAmbient,
    oversized,
    sourceMeasure: pageMeasure(source),
    normalMeasure: pageMeasure(normalEntries),
    policy,
  }
}

export function scenePageWithinBudget(page, policy = SCENE_PAGE_POLICY) {
  return fits(page || [], policy)
}

// Normal play asks the learner to finish the scene before acting on it. Debug
// keeps controls visible so authors can inspect and traverse a node directly.
export function scenePageAllowsActions({ debug = false, pageIndex = 0, pageCount = 1 } = {}) {
  return debug || pageIndex >= Math.max(0, pageCount - 1)
}
