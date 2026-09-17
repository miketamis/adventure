// Player-owned dialogue is visually framed outside the Albanian phrase. This
// keeps the speaker explicit without leaking a fluent English answer beside an
// active choice. `speechAct` is deliberately orthogonal to gameplay intent:
// only the exact words the player says carry it. Meta-actions such as “Speak
// with the trader” and “Call the eagle” remain unlabelled ordinary actions.
export const SPEECH_CHOICE_ACTS = Object.freeze([
  'ask', 'answer', 'tell', 'say',
])

const SPEECH_TOKEN_IDS = new Set([
  'pyet', 'pergjigjet', 'tregoj', 'fol', 'thirr', 'premto', 'betohem', 'thote', 'perserit',
])

const NON_SUBJECT_PREFIX_IDS = new Set([
  'nuk', 'mos', 'po_prog', 'do_fut', 'te_subj', 'te_obj', 'e_obj', 'i_obj',
  'me_obj', 'na', 'tani', 'pastaj',
])

const PLAYER_SUBJECT_IDS = new Set(['ti', 'une', 'ne_we'])
const SPEAKER_FRAME_IDS = new Set(['degjo', 'shoh', 'shiko', 'veshtro'])
const QUESTION_OPENING_IDS = new Set(['a_q', 'cfare', 'kush', 'ku', 'kur', 'pse', 'si', 'sa', 'mund'])
const CLAUSE_BREAKS = new Set(['.', '!', '?', ';'])
const tokenIdsOf = (option) => (option?.text || []).map((token) => token?.id).filter(Boolean)

export function speechChoiceActOf(option) {
  const act = option?.speechAct ?? option?.text?.speechAct
  return SPEECH_CHOICE_ACTS.includes(act) ? act : null
}

export const isDirectUtteranceChoice = (option) => speechChoiceActOf(option) !== null

export const hasSpeechVerbSurface = (option) =>
  tokenIdsOf(option).some((id) => SPEECH_TOKEN_IDS.has(id))

export function speechChoiceLabelOf(option) {
  const act = speechChoiceActOf(option)
  return act ? `You ${act}:` : null
}

// A selectable dialogue surface can omit its Albanian subject because the UI
// supplies “You …”. If it does spell out a grammatical subject before a
// speech verb, however, that subject must be the player—not a place, prop or
// NPC whose words the choice would misleadingly commandeer.
export function nonPlayerSpeechSubjectIds(option) {
  const tokens = option?.text || []
  for (const [verbIndex, token] of tokens.entries()) {
    const id = token?.id
    if (!SPEECH_TOKEN_IDS.has(id) || verbIndex <= 0) continue
    let clauseStart = 0
    for (let index = verbIndex - 1; index >= 0; index--) {
      const surface = tokens[index]?.paren ? tokens[index]?.en : tokens[index]?.al
      if (CLAUSE_BREAKS.has(surface)) {
        clauseStart = index + 1
        break
      }
    }
    const clauseIds = tokens.slice(clauseStart, verbIndex)
      .map((candidate) => candidate?.id)
      .filter(Boolean)
    // A speech verb governed by `të` belongs inside the player's utterance
    // (“we should ask”, “can we speak”, `do të thotë` / “means”), rather than
    // introducing a speaker.
    if (clauseIds.at(-1) === 'te_subj') continue
    // In a direct question such as “Who called you?”, the wh-word is the
    // unknown participant being asked about, not a narrator who owns the
    // selectable sentence.
    if (QUESTION_OPENING_IDS.has(clauseIds[0])) continue
    const prefix = clauseIds.filter((candidate) =>
      !NON_SUBJECT_PREFIX_IDS.has(candidate))
    const playerIndex = prefix.findLastIndex((candidate) => PLAYER_SUBJECT_IDS.has(candidate))
    if (playerIndex < 0) return Object.freeze(prefix)

    // The player pronoun only owns the clause up to the next meaningful
    // participant. In “you hear the old man say”, `you` is the perceiver and
    // the old man remains the speaker; an early player token must not erase
    // that later subject.
    const laterSubject = prefix.slice(playerIndex + 1).filter((candidate) =>
      !SPEAKER_FRAME_IDS.has(candidate))
    if (laterSubject.length) return Object.freeze(laterSubject)
  }
  return Object.freeze([])
}
