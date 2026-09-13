import { DICT } from './dictionary.js'
import { NOUN_FORMS } from './nounForms.js'
import { choiceSetIsValid } from './practiceAnswerValidity.js'

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

// These are reviewed Albanian noun phrases, not forms generated from an
// ending heuristic. Each row declares the noun gender, demonstrative and
// adjective-linking article together so Train can expose agreement while it
// tests meaning, then later test the agreement decision itself.
export const REVIEWED_NOUN_AGREEMENT_FRAMES = deepFreeze([
  {
    nounId: 'liber', gender: 'masculine', nounMeaning: 'book',
    demonstrative: { id: 'ky', surface: 'ky', nounSurface: 'libër', phrase: 'ky libër', cueEn: 'this book' },
    adjective: { nounSurface: 'libri', articleId: 'i_art', article: 'i', adjectiveId: 'mire', adjective: 'mirë', phrase: 'libri i mirë', gap: 'libri __ mirë' },
  },
  {
    nounId: 'fshat', gender: 'masculine', nounMeaning: 'village',
    demonstrative: { id: 'ky', surface: 'ky', nounSurface: 'fshat', phrase: 'ky fshat', cueEn: 'this village' },
    adjective: { nounSurface: 'fshati', articleId: 'i_art', article: 'i', adjectiveId: 'mire', adjective: 'mirë', phrase: 'fshati i mirë', gap: 'fshati __ mirë' },
  },
  {
    nounId: 'vend', gender: 'masculine', nounMeaning: 'place',
    demonstrative: { id: 'ky', surface: 'ky', nounSurface: 'vend', phrase: 'ky vend', cueEn: 'this place' },
    adjective: { nounSurface: 'vendi', articleId: 'i_art', article: 'i', adjectiveId: 'mire', adjective: 'mirë', phrase: 'vendi i mirë', gap: 'vendi __ mirë' },
  },
  {
    nounId: 'mal', gender: 'masculine', nounMeaning: 'mountain',
    demonstrative: { id: 'ky', surface: 'ky', nounSurface: 'mal', phrase: 'ky mal', cueEn: 'this mountain' },
    adjective: { nounSurface: 'mali', articleId: 'i_art', article: 'i', adjectiveId: 'mire', adjective: 'mirë', phrase: 'mali i mirë', gap: 'mali __ mirë' },
  },
  {
    nounId: 'rruge', gender: 'feminine', nounMeaning: 'road',
    demonstrative: { id: 'kjo', surface: 'kjo', nounSurface: 'rrugë', phrase: 'kjo rrugë', cueEn: 'this road' },
    adjective: { nounSurface: 'rruga', articleId: 'e_art', article: 'e', adjectiveId: 'mire', adjective: 'mirë', phrase: 'rruga e mirë', gap: 'rruga __ mirë' },
  },
  {
    nounId: 'shtepi', gender: 'feminine', nounMeaning: 'house',
    demonstrative: { id: 'kjo', surface: 'kjo', nounSurface: 'shtëpi', phrase: 'kjo shtëpi', cueEn: 'this house' },
    adjective: { nounSurface: 'shtëpia', articleId: 'e_art', article: 'e', adjectiveId: 'mire', adjective: 'mirë', phrase: 'shtëpia e mirë', gap: 'shtëpia __ mirë' },
  },
  {
    nounId: 'vajze', gender: 'feminine', nounMeaning: 'girl',
    demonstrative: { id: 'kjo', surface: 'kjo', nounSurface: 'vajzë', phrase: 'kjo vajzë', cueEn: 'this girl' },
    adjective: { nounSurface: 'vajza', articleId: 'e_art', article: 'e', adjectiveId: 'mire', adjective: 'mirë', phrase: 'vajza e mirë', gap: 'vajza __ mirë' },
  },
  {
    nounId: 'ure', gender: 'feminine', nounMeaning: 'bridge',
    demonstrative: { id: 'kjo', surface: 'kjo', nounSurface: 'urë', phrase: 'kjo urë', cueEn: 'this bridge' },
    adjective: { nounSurface: 'ura', articleId: 'e_art', article: 'e', adjectiveId: 'mire', adjective: 'mirë', phrase: 'ura e mirë', gap: 'ura __ mirë' },
  },
])

export const REVIEWED_NOUN_AGREEMENT_BY_ID = deepFreeze(Object.fromEntries(
  REVIEWED_NOUN_AGREEMENT_FRAMES.map((frame) => [frame.nounId, frame]),
))

export const NOUN_GRAMMAR_ACTIVITY_VARIANTS = deepFreeze({
  demonstrativeWholeChoice: {
    id: 'demonstrative-noun-whole-choice',
    label: 'Whole demonstrative + noun choice',
    choiceRange: [2, 4],
    completion: 'lexical retrieval only; agreement is visible but not credited',
  },
  demonstrativeSplitChoice: {
    id: 'demonstrative-noun-split-choice',
    label: 'Choose demonstrative, then noun',
    choiceRange: [2, 4],
    phases: [
      { id: 'choose-demonstrative', task: 'demonstrative-agreement', completion: 'advance-without-evidence' },
      { id: 'choose-noun', task: 'lexical-retrieval', completion: 'complete-stage-once' },
    ],
  },
  adjectiveArticleStaged: {
    id: 'adjective-linking-article-staged',
    label: 'Identify noun, choose adjective article, then identify its job',
    choiceRange: [2, 4],
    phases: [
      { id: 'identify-agreement-noun', task: 'meaning-recognition', completion: 'advance-without-evidence' },
      { id: 'choose-linking-article', task: 'adjective-article-form', completion: 'advance-without-evidence' },
      { id: 'identify-linking-article-job', task: 'adjective-article-job', completion: 'complete-stage-once' },
    ],
  },
  linkedAgreementCloze: {
    id: 'linked-noun-agreement-cloze',
    label: 'Complete linked demonstrative and adjective agreement',
    choiceRange: [2, 2],
    phases: [
      { id: 'choose-linked-demonstrative', task: 'demonstrative-agreement', completion: 'advance-without-evidence' },
      { id: 'choose-linked-article', task: 'adjective-article-form', completion: 'complete-stage-once' },
    ],
  },
})

const lower = (value) => String(value || '').normalize('NFC').toLocaleLowerCase('sq')

export function reviewedNounAgreementFrame(nounId) {
  return REVIEWED_NOUN_AGREEMENT_BY_ID[nounId] || null
}

export function reviewedNounAgreementSupportIds(frame, kind) {
  if (!frame) return []
  if (kind === 'demonstrative') return ['ky', 'kjo']
  if (kind === 'adjective') return ['i_art', 'e_art', frame.adjective.adjectiveId]
  if (kind === 'linked') return ['ky', 'kjo', 'i_art', 'e_art', frame.adjective.adjectiveId]
  return []
}

export function reviewedNounAgreementGate(frame, discoveredIds, kind) {
  if (!frame) return { eligible: false, missingIds: [], reason: 'no reviewed noun-agreement frame' }
  const discovered = new Set(discoveredIds || [])
  const requiredIds = reviewedNounAgreementSupportIds(frame, kind)
  const missingIds = requiredIds.filter((id) => !discovered.has(id))
  return {
    eligible: missingIds.length === 0,
    requiredIds,
    missingIds,
    reason: missingIds.length
      ? `agreement support senses are not saved: ${missingIds.join(', ')}`
      : 'every non-target agreement word is saved',
  }
}

const nounOptions = (answerFrame, candidateIds, count, rng) => {
  const candidates = [...new Set(candidateIds || [])]
    .map((id) => REVIEWED_NOUN_AGREEMENT_BY_ID[id])
    .filter((frame) => frame && frame.nounId !== answerFrame.nounId)
    .sort(() => rng() - 0.5)
  const selected = [answerFrame, ...candidates.slice(0, count - 1)]
  if (selected.length !== count) return null
  const values = selected.map(({ nounId }) => nounId).sort(() => rng() - 0.5)
  return choiceSetIsValid({
    answerValue: answerFrame.nounId,
    optionValues: values,
    labelOf: (id) => REVIEWED_NOUN_AGREEMENT_BY_ID[id]?.demonstrative.phrase,
    expectedOptionCount: count,
    locale: 'sq',
  }) ? values : null
}

export function buildDemonstrativeWholeChoice({ answerId, candidateIds, optionCount = 2, rng = Math.random } = {}) {
  const frame = reviewedNounAgreementFrame(answerId)
  if (!frame) return null
  const options = nounOptions(frame, candidateIds, optionCount, rng)
  if (!options) return null
  return {
    grammarVariantId: NOUN_GRAMMAR_ACTIVITY_VARIANTS.demonstrativeWholeChoice.id,
    promptText: frame.demonstrative.cueEn,
    options,
    optionLabels: Object.fromEntries(options.map((id) => [id, REVIEWED_NOUN_AGREEMENT_BY_ID[id].demonstrative.phrase])),
    lexicalSurfaces: options.map((id) => REVIEWED_NOUN_AGREEMENT_BY_ID[id].demonstrative.phrase),
    agreementFrame: frame,
    distractorPolicy: 'reviewed demonstrative+noun bundles from saved nouns; lexical retrieval only',
  }
}

const exactFormExists = (nounId, surface, tag) => (NOUN_FORMS[nounId] || []).some((form) =>
  lower(form.al) === lower(surface) && form.tag === tag)

export function validateReviewedNounAgreementFrame(frame) {
  const errors = []
  if (!DICT[frame?.nounId]) errors.push('unknown noun sense')
  if (!['masculine', 'feminine'].includes(frame?.gender)) errors.push('invalid gender')
  const expectedDemonstrative = frame?.gender === 'masculine' ? ['ky', 'ky'] : ['kjo', 'kjo']
  if (frame?.demonstrative?.id !== expectedDemonstrative[0] || frame?.demonstrative?.surface !== expectedDemonstrative[1]) {
    errors.push('demonstrative does not match reviewed gender')
  }
  const expectedArticle = frame?.gender === 'masculine' ? ['i_art', 'i'] : ['e_art', 'e']
  if (frame?.adjective?.articleId !== expectedArticle[0] || frame?.adjective?.article !== expectedArticle[1]) {
    errors.push('adjective article does not match reviewed gender')
  }
  if (!exactFormExists(frame?.nounId, frame?.demonstrative?.nounSurface, 'indefNom')) errors.push('demonstrative noun is not the reviewed indefinite nominative')
  if (!exactFormExists(frame?.nounId, frame?.adjective?.nounSurface, 'defNom')) errors.push('adjective noun is not the reviewed definite nominative')
  if (frame?.demonstrative?.phrase !== `${frame.demonstrative.surface} ${frame.demonstrative.nounSurface}`) errors.push('demonstrative phrase is not exact')
  if (frame?.adjective?.phrase !== `${frame.adjective.nounSurface} ${frame.adjective.article} ${frame.adjective.adjective}`) errors.push('adjective phrase is not exact')
  if (frame?.adjective?.gap !== `${frame.adjective.nounSurface} __ ${frame.adjective.adjective}`) errors.push('adjective gap is not exact')
  for (const id of [frame?.demonstrative?.id, frame?.adjective?.articleId, frame?.adjective?.adjectiveId]) {
    if (!DICT[id]) errors.push(`unknown support sense ${id}`)
  }
  return errors
}
