// One canonical walk for every Albanian surface that can expose the runtime
// pronunciation button. Keep generation and certification on the same input so
// newly-authored inflections cannot silently ship without audio.
export function collectAudioSurfaces(dict, story, phrases = []) {
  const surfaces = new Set()
  const add = (al) => {
    if (typeof al === 'string' && al.trim()) surfaces.add(al.trim())
  }

  for (const entry of Object.values(dict)) add(entry.al)

  const walk = (value) => {
    if (!value || typeof value !== 'object') return
    if (typeof value.al === 'string' && !value.paren) add(value.al)
    for (const nested of Object.values(value)) {
      if (nested && typeof nested === 'object') walk(nested)
    }
  }
  walk(story)
  for (const phrase of phrases) add(phrase.al)

  return [...surfaces].sort((a, b) => a.localeCompare(b, 'sq'))
}
