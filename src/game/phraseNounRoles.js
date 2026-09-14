import { DICT } from './dictionary.js'

// Reviewed contextual roles for noun surfaces in the practical phrase bank.
// This ledger is intentionally imported only by lazy Train/debug code: the
// core game-state path needs phrase focus ids for rewards, not correction UI.
export const PHRASE_NOUN_ROLES = Object.freeze({
  'wait-have-question': { pyetje: 'indefAcc' },
  'breakfast-exact': { mengjes: 'defNom', ore: 'defAcc' },
  'going-village': { fshat: 'indefAcc' },
  'meet-tomorrow-question': { ore: 'defAcc' },
  'accept-tomorrow-square': { ore: 'defAcc' },
  'at-work': { pune: 'indefAcc' },
  'finish-set-off': { pune: 'defAcc' },
  'want-water': { uje: 'indefAcc' },
  'is-water-cold': { uje: 'defNom' },
  'come-every-day': { dite: 'indefAcc' },
  'find-water': { uje: 'indefAcc' },
  'return-village': { fshat: 'indefAcc' },
  'bread-and-cheese': { buke: 'indefAcc' },
  'offer-coffee-tea': { kafe: 'indefAcc', caj: 'indefAcc' },
  'bring-bread-salt': { buke: 'indefAcc' },
  'give-bread': { buke: 'defAcc' },
  'have-bread': { buke: 'indefAcc' },
  'shop-opening': { dyqan: 'defNom' },
  'bread-salt-please': { buke: 'indefAcc' },
  'come-eat-with-us': { buke: 'indefAcc' },
  'like-tea': { caj: 'defNom' },
  'dont-like-coffee': { kafe: 'defNom' },
  'need-room-tonight': { dhome: 'indefAcc' },
  'hot-water': { uje: 'indefAcc' },
  'breakfast-time': { mengjes: 'defNom' },
  'leave-my-bag': { cante: 'defAcc' },
  'coffee-please': { kafe: 'indefAcc' },
  'is-morning': { mengjes: 'indefAcc' },
  'is-evening': { mbremje: 'indefAcc' },
  'is-spring': { mengjes: 'indefAcc' },
  'is-summer': { mengjes: 'indefAcc' },
  'is-autumn': { mengjes: 'indefAcc' },
  'is-winter': { mengjes: 'indefAcc' },
  'when-guests-come': { mik: 'plDef' },
  'what-work': { pune: 'ablIndef' },
  'live-near-market': { treg: 'defDat' },
  'work-market': { treg: 'indefAcc' },
  'how-family': { familje: 'defNom' },
  'family-well': { familje: 'defNom' },
  'have-siblings': { motra: 'indefAcc', vella: 'indefAcc' },
  'how-road-went': { rruge: 'defNom' },
  'news-problem': { problem: 'indefAcc' },
  'think-go-dry-well': { pus: 'defNom' },
  'want-water-question': { uje: 'indefAcc' },
  'miss-family': { familje: 'defNom' },
  'where-market': { treg: 'defNom' },
  'where-guest-room': { oda: 'defNom' },
  'lighter-please': { cakmak: 'indefAcc' },
  'need-doctor': { mjek: 'indefAcc' },
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
