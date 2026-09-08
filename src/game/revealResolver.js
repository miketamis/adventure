// One rule for the sentence that reveals a story option, shared by the live UI
// and graph audits. Most reveal senses occur in exactly one line. When authors
// intentionally repeat a sense, `revealOccurrence` selects its 1-based matching
// occurrence. We deliberately do not accept an absolute line index: conditional
// and distant lines can disappear at runtime, making that index unstable.
// Ambiguity falls back to the first match for backwards compatibility, but is
// returned as an explicit status so certification can require an author choice.
export function resolveRevealLine(lines = [], option = {}) {
  if (!option.reveal) {
    return { line: null, index: -1, matches: [], status: 'none' }
  }

  const matches = lines
    .map((line, index) => ({ line, index }))
    .filter(({ line }) => line.some((token) => token.id === option.reveal))

  if (Number.isInteger(option.revealOccurrence)) {
    const selected = matches[option.revealOccurrence - 1]
    return selected
      ? { ...selected, matches, status: 'selected' }
      : { line: null, index: -1, matches, status: 'invalid-occurrence' }
  }

  if (matches.length === 0) return { line: null, index: -1, matches, status: 'missing' }
  if (matches.length === 1) return { ...matches[0], matches, status: 'unique' }
  return { ...matches[0], matches, status: 'ambiguous' }
}
