import { STORY, lineOf } from '../game/content.js'
import { englishReadingOf } from '../game/language.js'
import { PLACE_OF } from './nodePositions.js'
import { PLACE_META } from './placeMeta.js'

// A generic opening sentence is a useful last-resort label, but two physically
// different roads once both appeared as “You walk on a road.” on the atlas.
// Keep the few necessary disambiguations here, beside the shared label
// resolver, so every player-facing map surface names the same place the same
// way without changing story prose merely to serve the UI.
export const PLAYER_MAP_LABEL_OVERRIDES = Object.freeze({
  udhaKthimit: 'The road below the restored castle',
  ktheu2: 'The long road through the coast country',
})

const firstReadableLine = (node) => {
  const lines = (node?.text || []).map(lineOf)
  const line = lines.find((candidate) => candidate.some((token) => token?.id)) || lines[0]
  return line ? englishReadingOf(line) : ''
}

// Player-facing maps must never expose authoring ids such as `maliStuhi` as
// place names. Prefer an explicit place card, then an ending title, then
// the scene's natural English opening. The final fallback is deliberately
// generic rather than leaking an implementation key.
export function playerMapLabel(id, endingById = null) {
  const node = STORY[id]
  const place = PLACE_OF[id]
  return PLACE_META[place]?.name || PLAYER_MAP_LABEL_OVERRIDES[place] || endingById?.[id]?.title || firstReadableLine(node) || 'Known story place'
}

export function playerMapShortLabel(id, maxLength = 42, endingById = null) {
  const label = playerMapLabel(id, endingById)
  if (label.length <= maxLength) return label
  const clipped = label.slice(0, maxLength + 1).replace(/\s+\S*$/, '').trim()
  return `${clipped || label.slice(0, maxLength).trim()}…`
}
