import { HEART_LEVELS, ITEMS, STORY } from '../../src/game/content.js'
import { albanianTextOf } from '../../src/game/language.js'
import { certifiedDynamicItemConfuserSurfaces } from '../../src/game/storyConfusers.js'

export const actionTranscriptWords = (transcript) =>
  String(transcript || '').match(/\p{L}+(?:['’]\p{L}+)*/gu) || []

export function collectAcceptedActionSurfaces({
  story = STORY,
  items = ITEMS,
  heartLevels = HEART_LEVELS,
} = {}) {
  const surfaces = new Set()
  const add = (tokens) => {
    const transcript = albanianTextOf(tokens).trim()
    if (transcript) surfaces.add(transcript)
  }
  for (const node of Object.values(story)) {
    for (const option of node.options || []) add(option.text)
  }
  for (const item of Object.values(items)) add(item.use?.phrase)
  for (const level of Object.values(heartLevels)) add(level.heal?.phrase)
  for (const transcript of certifiedDynamicItemConfuserSurfaces({ items })) surfaces.add(transcript)
  return [...surfaces].sort((left, right) => left.localeCompare(right, 'sq'))
}
