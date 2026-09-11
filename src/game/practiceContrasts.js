import { DICT } from './dictionary.js'
import { WORD_CLASS, wordClassOf } from './wordClassPolicy.js'

export const PRACTICE_TARGET_KIND = Object.freeze({
  lexical: 'lexical-meaning',
  function: 'grammatical-function',
})

const ids = (value) => value.trim().split(/\s+/).filter(Boolean)

// These are reviewed teaching roles, not guesses from an English gloss. They
// keep a learner choosing between words that could do the same broad job.
const ROLE_GROUPS = Object.freeze({
  'function:po': ids('po_yes po_prog po_but po_turn'),
  'function:te': ids('te_link te_subj te_obj'),
  'function:i': ids('i_art i_link i_obj'),
  'function:e': ids('e_art e_link e_obj e_conj'),
  'function:clause': ids('a_q do_fut nuk mos'),
  'function:connector': ids('dhe edhe por apo ose se qe ndersa'),
  'function:relation': ids('me ne tek nga per pa'),
  'function:degree': ids('me_more'),
  'function:object': ids('me_obj'),
  'lexical:question': ids('si ku cfare kush'),
  'lexical:social-formula': ids('faleminderit lutem mirupafshim hajde dakord rregull'),
  'lexical:time': ids('tani vone neser sapo pastaj sonte perseri akoma'),
  'lexical:quantity': ids('nente shume nje'),
  'lexical:direction': ids('ketu majtas djathtas perpara prane'),
  'lexical:manner': ids('vertet ngadale drejt mire'),
  'lexical:communication-verb': ids('thote tregoj perserit quhem'),
  'lexical:movement-verb': ids('shko nisem vjen takohem jeto kthehu'),
  'lexical:thinking-verb': ids('di sheh kuptoj beso mendoj'),
  'lexical:state-verb': ids('jam je eshte ka duhet mund do pelqen mungon dhemb kushton'),
  'lexical:action-verb': ids('prit sjell harron merr punon bie ndodh mbush bej ha fle ndihmo mbaroj'),
})

const ROLE_BY_ID = new Map()
for (const [role, senseIds] of Object.entries(ROLE_GROUPS)) {
  for (const id of senseIds) {
    // A homographic grammatical family is the sharper reviewed contrast.
    if (!ROLE_BY_ID.has(id) || role.startsWith('function:')) ROLE_BY_ID.set(id, role)
  }
}

const FUNCTION_IDS = new Set(Object.entries(ROLE_GROUPS)
  .filter(([role]) => role.startsWith('function:'))
  .flatMap(([, senseIds]) => senseIds))

// Context questions about grammatical words ask what the word is doing, not
// for a misleading one-word English substitution. These labels are reviewed
// learner explanations and are deliberately separate from dictionary glosses.
export const CONTEXTUAL_FUNCTION_LABELS = Object.freeze({
  po_yes: 'confirms: yes',
  po_prog: 'marks an action in progress',
  po_but: 'spoken po introduces a contrast: but',
  po_turn: 'returns or redirects attention: what about …?',
  te_link: 'links the following noun: of',
  te_subj: 'links a modal (can / must / want) to the following verb',
  te_obj: 'unstressed object pronoun: you',
  i_art: 'article before a masculine adjective',
  i_link: 'links a masculine noun phrase: of',
  i_obj: 'unstressed object pronoun: him',
  e_art: 'article before a feminine adjective',
  e_link: 'links a feminine noun phrase: of',
  e_obj: 'unstressed object pronoun: her / it',
  e_conj: 'folk/epic e joins names: and',
  a_q: 'turns the clause into a yes/no question',
  do_fut: 'starts a future verb phrase',
  nuk: 'negates a verb',
  mos: 'marks a negative command',
  dhe: 'joins equal words or phrases: and',
  edhe: 'adds another item: also / too',
  por: 'standard conjunction introduces a contrast: but',
  apo: 'offers alternatives in a question: or',
  ose: 'offers alternatives in a statement: or',
  se: 'introduces a reason or reported clause',
  qe: 'links a relative or reported clause',
  ndersa: 'contrasts simultaneous clauses: while',
  me: 'marks accompaniment or means: with',
  ne: 'marks location or direction: in / at / to',
  tek: 'points to a person or place: at / to',
  nga: 'marks source or origin: from',
  per: 'marks purpose or recipient: for',
  pa: 'marks absence: without',
  me_more: 'forms a comparison: more',
  me_obj: 'unstressed object pronoun: me',
})

// Where one written form has only two alternative reviewed senses, complete
// its four-choice context question with a close grammatical foil rather than
// an arbitrary particle. In `mund të pi`, a future-phrase marker is a useful
// beginner contrast to the modal/subjunctive link; a locative preposition is not.
const REVIEWED_CONTEXTUAL_FUNCTION_PEERS = Object.freeze({
  te_subj: Object.freeze(['do_fut']),
})

for (const id of FUNCTION_IDS) {
  if (!CONTEXTUAL_FUNCTION_LABELS[id]) {
    throw new Error(`Missing reviewed contextual function label for ${id}`)
  }
}

// A few function words have no different-surface peer in their semantic
// family. These alternatives are explicitly reviewed for the same sentence
// slot, so a cloze can remain grammatical without pretending that an unrelated
// particle is a same-role contrast. For example: "po / nuk / ende / akoma bie
// shi" all make a viable sentence while testing the progressive marker.
export const REVIEWED_CLOZE_SLOT_PEERS = Object.freeze({
  // These alternatives change the exact assertion, not merely its idiom:
  // negative, question and future. “Ende/akoma/edhe” remain defensible
  // additions to a present-progressive cue and therefore are excluded.
  po_prog: Object.freeze(ids('nuk a_q do_fut')),
  // In “A do ujë?”, replacing A with another question word changes the
  // requested information. “Nuk/Mos” can instead form natural biased offers,
  // so they are not safe wrong answers for the neutral English question.
  a_q: Object.freeze(ids('ku kush pse')),
  nente: Object.freeze(ids('shtate tete dhjete')),
  shume: Object.freeze(ids('perseri vertet gjithmone')),
  nje: Object.freeze(ids('dy tre pak')),
})

const wordClass = (id) => wordClassOf(id, DICT[id], {
  hasAttestedVariant: Boolean(DICT[id]?.forms?.length),
})

export function practiceTargetKind(id) {
  return FUNCTION_IDS.has(id) ? PRACTICE_TARGET_KIND.function : PRACTICE_TARGET_KIND.lexical
}

export function contextualChoiceLabel(id, fallback) {
  return practiceTargetKind(id) === PRACTICE_TARGET_KIND.function
    ? CONTEXTUAL_FUNCTION_LABELS[id]
    : fallback
}

export function practiceContrastRole(id) {
  const reviewed = ROLE_BY_ID.get(id)
  if (reviewed) return reviewed
  return `lexical:${wordClass(id)}`
}

export function contextualPromptProfile(id, { contextPresentation = 'marked' } = {}) {
  const targetKind = practiceTargetKind(id)
  return {
    targetKind,
    contrastRole: practiceContrastRole(id),
    // The lexical progression state machine owns this value. Recognition wins
    // alone must never remove the target before Albanian-retrieval proof exists.
    contextPresentation,
    // An English grammar blank ("the water __ coming") gives away particles
    // such as po. Lexical homonyms may retain context that disambiguates sense.
    showEnglishContext: targetKind === PRACTICE_TARGET_KIND.lexical,
    distractorPolicy: targetKind === PRACTICE_TARGET_KIND.function
      ? 'same-function-family'
      : 'same-role-peer',
  }
}

export function wordContrastRank(answerId, candidateId, { contextual = false } = {}) {
  if (!DICT[answerId] || !DICT[candidateId] || answerId === candidateId) return Infinity
  if (contextual && DICT[answerId].al === DICT[candidateId].al) return 0
  if (contextual && REVIEWED_CONTEXTUAL_FUNCTION_PEERS[answerId]?.includes(candidateId)) return 1
  const answerKind = practiceTargetKind(answerId)
  const candidateKind = practiceTargetKind(candidateId)
  if (answerKind !== candidateKind) return Infinity
  if (practiceContrastRole(answerId) === practiceContrastRole(candidateId)) return 1
  const answerClass = wordClass(answerId)
  const candidateClass = wordClass(candidateId)
  if (answerClass === candidateClass && answerClass !== WORD_CLASS.NON_INFLECTING) return 2
  return answerKind === PRACTICE_TARGET_KIND.function ? 3 : 4
}

export function isReviewedClozeSlotPeer(answerId, candidateId) {
  return Boolean(REVIEWED_CLOZE_SLOT_PEERS[answerId]?.includes(candidateId))
}

export function phraseClozeDistractorPolicy(answer, candidate) {
  if (!answer?.focusId || !candidate?.focusId || answer.focusId === candidate.focusId) return null
  const answerClass = wordClass(answer.focusId)
  const candidateClass = wordClass(candidate.focusId)
  if (answerClass === WORD_CLASS.NOUN && answer.formTag) {
    return candidateClass === WORD_CLASS.NOUN && candidate.formTag === answer.formTag
      ? 'same-noun-role-form'
      : null
  }
  if (isReviewedClozeSlotPeer(answer.focusId, candidate.focusId)) return 'reviewed-slot-peer'
  if (practiceContrastRole(answer.focusId) === practiceContrastRole(candidate.focusId)) {
    return 'same-role-peer'
  }
  if (answerClass === candidateClass && answerClass !== WORD_CLASS.NON_INFLECTING) {
    return 'same-word-class-peer'
  }
  if (
    practiceTargetKind(answer.focusId) === PRACTICE_TARGET_KIND.function &&
    practiceTargetKind(candidate.focusId) === PRACTICE_TARGET_KIND.function
  ) return 'same-function-kind-peer'
  return null
}

export function phraseClozeContrastRank(answer, candidate) {
  const policy = phraseClozeDistractorPolicy(answer, candidate)
  if (!policy) return Infinity
  if (policy === 'same-noun-role-form' || policy === 'reviewed-slot-peer') return 0
  if (policy === 'same-role-peer') return 1
  const answerClass = wordClass(answer.focusId)
  const candidateClass = wordClass(candidate.focusId)
  if (answerClass === candidateClass && answerClass !== WORD_CLASS.NON_INFLECTING) return 2
  return 3
}

export const reviewedPracticeRoleIds = (role) => [...(ROLE_GROUPS[role] || [])]
