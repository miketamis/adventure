import { DICT } from './dictionary.js'

// Reviewed contextual roles for noun surfaces in the practical phrase bank.
// This ledger is intentionally imported only by lazy Train/debug code: the
// core game-state path needs phrase focus ids for rewards, not correction UI.
export const PHRASE_NOUN_ROLES = Object.freeze({
  'going-village': { fshat: 'indefAcc' },
  'at-work': { pune: 'indefAcc' },
  'finish-set-off': { pune: 'defAcc' },
  'want-water': { uje: 'indefAcc' },
  'when-guests-come': { mik: 'plDef' },
  'what-work': { pune: 'ablIndef' },
  'live-near-market': { treg: 'defDat' },
  'work-market': { treg: 'indefAcc' },
  'how-family': { familje: 'defNom' },
  'family-well': { familje: 'defNom' },
  'have-siblings': { motra: 'indefAcc', vella: 'indefAcc' },
  'how-road-went': { rruge: 'defNom' },
  'think-go-dry-well': { pus: 'defNom' },
  'want-water-question': { uje: 'indefAcc' },
  'miss-family': { familje: 'defNom' },
  'anyone-here': { njeri: 'indefAcc' },
  'where-market': { treg: 'defNom' },
  'where-guest-room': { oda: 'defNom' },
  'lighter-please': { cakmak: 'indefAcc' },
  'fill-bottle': { shishe: 'defAcc', uje: 'indefAcc' },
  'drink-from-bottle': { uje: 'indefAcc', shishe: 'defNom' },
  'open-umbrella': { cader: 'defAcc' },
  'wash-hands-soap': { dore: 'plDef', sapun: 'indefAcc' },
  'going-guest-room': { oda: 'indefAcc' },
  'happy-going-home': { shtepi: 'indefAcc' },
  'take-care-tonight': { rruge: 'defDat' },
})

const words = (value) => String(value || '').match(/[\p{L}\p{M}]+(?:['’][\p{L}\p{M}]+)*/gu) || []
const normalized = (value) => String(value || '').normalize('NFC').toLocaleLowerCase('sq')

export function phraseNounRole(phraseId, senseId) {
  return PHRASE_NOUN_ROLES[phraseId]?.[senseId] || null
}

// Project the compact ledger onto the phrase's real word positions. Missing or
// stale rows are ignored at runtime and fail the exhaustive phrase audit.
export function phraseNounOccurrences(phrase) {
  const roles = PHRASE_NOUN_ROLES[phrase?.id]
  if (!roles) return []
  const surfaces = words(phrase.al)
  const usedIndexes = new Set()
  const occurrences = []
  for (const [id, formTag] of Object.entries(roles)) {
    const reviewed = DICT[id]?.forms?.find((form) => form.tag === formTag)
    if (!reviewed) continue
    const index = surfaces.findIndex((surface, candidate) =>
      !usedIndexes.has(candidate) && normalized(surface) === normalized(reviewed.al))
    if (index < 0) continue
    usedIndexes.add(index)
    occurrences.push({ id, index, word: surfaces[index], formTag })
  }
  return occurrences.sort((left, right) => left.index - right.index)
}
