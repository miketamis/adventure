import { ATTESTED_SURFACES } from './content.js'
import { DICT } from './dictionary.js'
import { NOUN_FORMS } from './nounForms.js'
import { WORD_CLASS, wordClassOf } from './wordClassPolicy.js'

const fold = (value) => String(value ?? '').normalize('NFC').toLocaleLowerCase('sq')
const letters = (value) => Array.from(value)
const isOneWord = (value) => /^[\p{L}\p{M}]+$/u.test(value)

const NOUN_FAMILIES = Object.freeze({
  singular: Object.freeze({
    tags: new Set([
      'indefNom',
      'defNom',
      'indefAcc',
      'defAcc',
      'indefDat',
      'ablIndef',
      'defDat',
      'defDatTosk',
    ]),
    anchors: ['indefNom', 'defNom', 'defAcc', 'defDat'],
    base: 'indefNom',
  }),
  plural: Object.freeze({
    tags: new Set(['plIndef', 'plDef', 'plDat', 'plAbl']),
    anchors: ['plIndef', 'plDef', 'plDat', 'plAbl'],
    base: 'plIndef',
  }),
})

// The accented citation form dhé alternates with the unaccented stem dhe-.
// Keeping this explicit prevents the mechanical shared prefix "dh" from being
// presented as the lexical stem while still allowing dhe-ut to teach its ending.
const REVIEWED_NOUN_FAMILY_STEM_OVERRIDES = Object.freeze({
  dhe_earth: Object.freeze({ singular: 'dhe' }),
})

// Unlike nouns, the adjective bank does not yet declare complete role-labelled
// paradigms. Every permitted adjective boundary is therefore pinned to an
// exact, already-attested surface. This handles stem alternations one surface
// at a time and prevents a newly authored form from inheriting a guessed split.
export const REVIEWED_ADJECTIVE_DISPLAY_STEMS = Object.freeze({
  arte: Object.freeze({ artë: 'art', arta: 'art' }),
  bardhe: Object.freeze({ bardhë: 'bardh', bardha: 'bardh' }),
  drejt: Object.freeze({ drejtë: 'drejt' }),
  drejte: Object.freeze({ drejtë: 'drejt' }),
  embel: Object.freeze({ ëmbël: 'ëmb', ëmbla: 'ëmb' }),
  ftohte: Object.freeze({ ftohtë: 'ftoht', ftohta: 'ftoht' }),
  gjalle: Object.freeze({ gjallë: 'gjall', gjalla: 'gjall' }),
  gjate: Object.freeze({ gjatë: 'gjat', gjata: 'gjat' }),
  gjelber: Object.freeze({ gjelbër: 'gjelb', gjelbra: 'gjelb' }),
  kalter: Object.freeze({ kaltër: 'kalt', kaltra: 'kalt' }),
  keq: Object.freeze({ keqe: 'keq' }),
  kuq: Object.freeze({ kuqe: 'kuq' }),
  larg: Object.freeze({ largët: 'larg' }),
  lart: Object.freeze({ lartë: 'lart' }),
  madh: Object.freeze({ madhe: 'madh', mëdha: 'mëdh' }),
  mire: Object.freeze({ mirë: 'mir', mira: 'mir' }),
  njejte: Object.freeze({ njëjtën: 'njëjtë' }),
  qete: Object.freeze({ qetë: 'qet', qeta: 'qet' }),
  shenjte: Object.freeze({ shenjtë: 'shenjt' }),
  shpejt: Object.freeze({ shpejtë: 'shpejt' }),
  tjeter: Object.freeze({
    tjetër: 'tjet',
    tjera: 'tjer',
    tjetri: 'tjetr',
    tjetra: 'tjetr',
    tjerë: 'tjer',
  }),
  verdhe: Object.freeze({ verdhë: 'verdh', verdha: 'verdh' }),
  vjeter: Object.freeze({ vjetër: 'vjet', vjetra: 'vjet' }),
  zi: Object.freeze({ zezë: 'zez', zeza: 'zez' }),
})

function commonPrefix(values) {
  const folded = values.map(fold)
  let prefix = letters(folded[0] || '')
  for (const value of folded.slice(1)) {
    const candidate = letters(value)
    let index = 0
    while (index < prefix.length && index < candidate.length && prefix[index] === candidate[index]) index += 1
    prefix = prefix.slice(0, index)
    if (!prefix.length) break
  }
  return prefix.join('')
}

function splitAtFoldedPrefix(surface, stem, source) {
  const normalizedSurface = String(surface ?? '').normalize('NFC')
  const normalizedStem = fold(stem)
  if (
    letters(normalizedStem).length < 2 ||
    !isOneWord(normalizedSurface) ||
    !fold(normalizedSurface).startsWith(normalizedStem) ||
    fold(normalizedSurface) === normalizedStem
  ) {
    return null
  }

  // Albanian case folding does not change the number of code points, so this
  // preserves the exact authored casing while applying the reviewed boundary.
  const stemLength = letters(normalizedStem).length
  const surfaceLetters = letters(normalizedSurface)
  return Object.freeze({
    stem: surfaceLetters.slice(0, stemLength).join(''),
    ending: surfaceLetters.slice(stemLength).join(''),
    source,
  })
}

function reviewedNounFamily(id, familyName) {
  const forms = NOUN_FORMS[id]
  const family = NOUN_FAMILIES[familyName]
  if (!forms || !family) return null

  const anchors = family.anchors.map((tag) => forms.filter((form) => form.tag === tag))
  if (anchors.some((rows) => rows.length !== 1)) return null

  const reviewedOverride = REVIEWED_NOUN_FAMILY_STEM_OVERRIDES[id]?.[familyName]
  const stem = reviewedOverride || commonPrefix(anchors.map((rows) => rows[0].al))
  const base = fold(anchors[family.anchors.indexOf(family.base)][0].al)
  if (!reviewedOverride && !base.startsWith(stem)) return null

  // A simple suffix boundary may remove at most one letter from the indefinite
  // base. Longer alternations (krua/kroi, libër/libri) stay visually whole;
  // presenting their tiny common prefix as a lexical root would misteach them.
  if (
    letters(stem).length < 2 ||
    (!reviewedOverride && letters(base.slice(stem.length)).length > 1)
  ) return null

  return Object.freeze({ stem, family: familyName })
}

function nounFamilyCandidates(forms, surface, formTag) {
  if (formTag) {
    return Object.entries(NOUN_FAMILIES)
      .filter(([, family]) => family.tags.has(formTag))
      .map(([name]) => name)
  }

  const exactTags = forms
    .filter((form) => fold(form.al) === fold(surface))
    .map((form) => form.tag)
  return Object.entries(NOUN_FAMILIES)
    .filter(([, family]) => exactTags.some((tag) => family.tags.has(tag)))
    .map(([name]) => name)
}

export function reviewedNounSurfaceSegmentation(id, surface, formTag) {
  const forms = NOUN_FORMS[id]
  if (!forms) return null

  const candidates = []
  for (const familyName of nounFamilyCandidates(forms, surface, formTag)) {
    const family = NOUN_FAMILIES[familyName]
    const isExactFamilySurface = forms.some(
      (form) => family.tags.has(form.tag) && fold(form.al) === fold(surface),
    )
    if (!isExactFamilySurface) continue

    const reviewedFamily = reviewedNounFamily(id, familyName)
    if (!reviewedFamily) continue
    const segmentation = splitAtFoldedPrefix(
      surface,
      reviewedFamily.stem,
      `reviewed-noun-${familyName}`,
    )
    if (segmentation) candidates.push(segmentation)
  }

  if (!candidates.length) return null
  const [first] = candidates
  if (candidates.some(({ stem, ending }) => stem !== first.stem || ending !== first.ending)) return null
  return first
}

export function reviewedAttestedSurfaceSegmentation({
  id,
  surface,
  attestedSurfaces,
  wordClass,
}) {
  if (
    wordClass !== WORD_CLASS.ADJECTIVE ||
    !Array.isArray(attestedSurfaces) ||
    !attestedSurfaces.some((candidate) => fold(candidate) === fold(surface)) ||
    !isOneWord(surface)
  ) {
    return null
  }

  const stem = REVIEWED_ADJECTIVE_DISPLAY_STEMS[id]?.[fold(surface)]
  if (!stem) return null

  return splitAtFoldedPrefix(surface, stem, 'reviewed-adjective-surface')
}

export function splitReviewedSurface(segmentation, surface) {
  return segmentation ? [segmentation.stem, segmentation.ending] : [surface, '']
}

// Return the reviewed provenance as well as the exact display pieces so audits
// can reject a split that merely happens to look plausible.
export function surfaceSegmentation(id, surface, formTag) {
  const nounSegmentation = reviewedNounSurfaceSegmentation(id, surface, formTag)
  if (nounSegmentation) return nounSegmentation

  const family = ATTESTED_SURFACES[id]
  if (!family || !DICT[id]) return null
  return reviewedAttestedSurfaceSegmentation({
    id,
    surface,
    attestedSurfaces: family.forms,
    wordClass: wordClassOf(id, DICT[id], { hasAttestedVariant: family.forms.length > 1 }),
  })
}

// Split an Albanian surface into [stem, ending] for a given sense. Unknown,
// phrase-shaped, or stem-changing morphology fails closed to the whole surface.
export function splitStem(id, surface, formTag) {
  return splitReviewedSurface(surfaceSegmentation(id, surface, formTag), surface)
}
