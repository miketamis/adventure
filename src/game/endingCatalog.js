import { ENDINGS } from './content.js'
import { ENDING_COPY } from './endingCopy.js'

// Rich ending metadata is an on-demand projection over the compact, eager
// ending rules. Keeping the join here gives the codex, ending screen, debug
// tools and audits one shared source without putting prose back into STORY.
const endingIds = new Set(ENDINGS.map(({ id }) => id))
const missingCopy = ENDINGS.filter(({ id }) => !ENDING_COPY[id]).map(({ id }) => id)
const staleCopy = Object.keys(ENDING_COPY).filter((id) => !endingIds.has(id))
if (missingCopy.length || staleCopy.length) {
  throw new Error(`Ending-copy registry mismatch; missing: ${missingCopy.join(', ') || 'none'}; stale: ${staleCopy.join(', ') || 'none'}`)
}

export const RICH_ENDINGS = Object.freeze(ENDINGS.map((ending) => {
  const copy = ENDING_COPY[ending.id]
  if (!copy) throw new Error(`Missing rich ending copy for '${ending.id}'`)
  return Object.freeze({ ...ending, ...copy })
}))

export const RICH_ENDING_BY_ID = Object.freeze(Object.fromEntries(
  RICH_ENDINGS.map((ending) => [ending.id, ending]),
))
