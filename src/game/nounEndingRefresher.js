import { NOUN_FORMS } from './nounForms.js'

// Learner-facing labels stay deliberately short: the authored gloss carries the
// noun's exact meaning, while this label explains why that shape is being used.
export const NOUN_FORM_ROLE_LABELS = Object.freeze({
  indefNom: 'base form · one / a',
  indefAcc: 'one / a · object',
  defNom: 'the noun · subject',
  defAcc: 'the noun · object',
  defDat: 'to / of the noun',
  defDatTosk: 'to / of the noun · Tosk form',
  indefDat: 'to / of one noun',
  plIndef: 'plural · general',
  plDef: 'the nouns · plural',
  plDat: 'to / of the nouns',
  plAbl: 'from / of nouns',
  ablIndef: 'from / of one noun',
  adj: 'describing form',
  adjPl: 'describing form · plural',
  elided: 'shortened poetic form',
})

const SINGULAR_TAGS = new Set([
  'indefNom',
  'indefAcc',
  'defNom',
  'defAcc',
  'defDat',
  'defDatTosk',
  'indefDat',
  'ablIndef',
])

const ROLE_ORDER = [
  'indefNom',
  'indefAcc',
  'defNom',
  'defAcc',
  'defDat',
  'defDatTosk',
  'indefDat',
  'ablIndef',
  'plIndef',
  'plDef',
  'plDat',
  'plAbl',
  'adj',
  'adjPl',
  'elided',
]

const lower = (value) => value.toLocaleLowerCase('sq')
const CORE_CLASS_TAGS = ['indefNom', 'defNom', 'defAcc', 'defDat']

const uniqueForms = (forms) => {
  const seen = new Set()
  return forms.filter((form) => {
    const key = `${lower(form.al)}\u0000${form.tag}\u0000${form.gloss}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const first = (forms, tag) => forms.find((form) => form.tag === tag)?.al

const commonPrefix = (surfaces) => {
  let prefix = surfaces[0] || ''
  for (const surface of surfaces.slice(1)) {
    let index = 0
    while (index < prefix.length && index < surface.length && prefix[index] === surface[index]) index += 1
    prefix = prefix.slice(0, index)
  }
  return prefix
}

// A class is transferable only when all four singular roles exist once and the
// exact changes after their shared stem match. That keeps look-alike nouns with
// a different accusative or dative out of the example slot.
const classSignature = (forms) => {
  const rows = []
  for (const tag of CORE_CLASS_TAGS) {
    const matches = forms.filter((form) => form.tag === tag)
    if (matches.length !== 1) return null
    rows.push(matches[0])
  }
  const stem = commonPrefix(rows.map((row) => row.al))
  if (stem.length < 2) return null
  const endings = rows.map((row) => row.al.slice(stem.length))
  return { key: endings.join('\u0000'), endings, rows, stem }
}

const peerFor = (id, signature) => {
  if (!signature) return null
  const peers = []
  for (const [candidateId, sourceForms] of Object.entries(NOUN_FORMS)) {
    if (candidateId === id) continue
    const candidate = classSignature(uniqueForms(sourceForms))
    if (!candidate || candidate.key !== signature.key) continue
    peers.push({
      id: candidateId,
      rows: candidate.rows.map((form) => ({
        ...form,
        role: NOUN_FORM_ROLE_LABELS[form.tag],
      })),
    })
  }
  // Prefer the shortest readable example, with an alphabetical tie-break. This
  // is deterministic curriculum logic, not a hand-maintained noun allowlist.
  return peers.sort((a, b) => {
    const aLength = a.rows.reduce((sum, row) => sum + row.al.length, 0)
    const bLength = b.rows.reduce((sum, row) => sum + row.al.length, 0)
    return aLength - bLength || a.id.localeCompare(b.id, 'sq')
  })[0] ?? null
}

const patternFor = (forms, target, signature, peer) => {
  if (target.tag.startsWith('pl')) {
    const hasGeneralPlural = forms.some((form) => form.tag === 'plIndef')
    const hasDefinitePlural = forms.some((form) => form.tag === 'plDef')
    return hasGeneralPlural && hasDefinitePlural
      ? 'This guidance is specific to this noun: keep its distinct general and definite plural forms together.'
      : 'This guidance is specific to this noun: do not build its exact plural form by copying a singular ending.'
  }
  if (target.tag === 'adj' || target.tag === 'adjPl') {
    return 'This guidance is specific to this noun’s describing form, which is narrower than its ordinary noun endings.'
  }
  if (target.tag === 'elided') {
    return 'This guidance is specific to this deliberately shortened poetic form; compare it only with this noun’s full base form.'
  }

  if (!signature || !peer) {
    return 'This guidance is specific: these reviewed forms have no exact four-role class match here, so do not extend this mini-paradigm to other nouns.'
  }

  const lemma = first(forms, 'indefNom')
  const definite = first(forms, 'defNom')
  const object = first(forms, 'defAcc')
  const toOf = first(forms, 'defDat')
  if (!lemma) {
    return 'Keep the exact forms below together; this noun has no base row in this exercise.'
  }

  if (lemma.endsWith('ë')) {
    const stem = lemma.slice(0, -1)
    if (definite === `${stem}a` && object === `${stem}ën` && toOf === `${stem}ës`) {
      return 'A common feminine -ë class uses -ë → -a → -ën → -ës. Many feminine nouns use other classes, so first check that the base ends in -ë and the full pattern matches.'
    }
    if (definite === `${stem}i` && object === `${stem}in` && toOf === `${stem}it`) {
      return 'This masculine -ë class uses -ë → -i → -in → -it. It is a narrow class, not a rule for every masculine noun.'
    }
  }

  if (definite === `${lemma}i` && object === `${lemma}in` && toOf === `${lemma}it`) {
    return 'This consonant-base class keeps the base, then uses -i, -in and -it in the definite singular. Other noun classes change the stem or use -u.'
  }
  if (definite === `${lemma}u` && object === `${lemma}un` && toOf === `${lemma}ut`) {
    return 'This consonant-base class keeps the base, then uses -u, -un and -ut in the definite singular. Other masculine nouns use -i or change their stem.'
  }

  const endingNames = signature.endings.map((ending) => ending || 'base').join(' → ')
  return `These reviewed nouns share the narrow ${endingNames} singular pattern. Use it only when the noun’s full four-form row matches.`
}

const rowsFor = (forms, target) => {
  const targetFamily = target.tag.startsWith('pl')
    ? (form) => form.tag.startsWith('pl') || form.tag === 'indefNom'
    : target.tag === 'adj' || target.tag === 'adjPl'
      ? (form) => form.tag === 'indefNom' || form.tag === 'adj' || form.tag === 'adjPl'
      : target.tag === 'elided'
        ? (form) => form.tag === 'indefNom' || form.tag === 'elided'
        : (form) => SINGULAR_TAGS.has(form.tag)

  const selected = forms.filter(targetFamily)
  if (!selected.includes(target)) selected.push(target)
  return selected.sort((a, b) => {
    const ai = ROLE_ORDER.indexOf(a.tag)
    const bi = ROLE_ORDER.indexOf(b.tag)
    return (ai === -1 ? ROLE_ORDER.length : ai) - (bi === -1 ? ROLE_ORDER.length : bi)
  })
}

/**
 * Build a correction sheet only from the reviewed paradigm for `id`.
 * `expectedGloss` disambiguates duplicate surfaces if a paradigm ever contains
 * syncretic forms. Unknown nouns/surfaces return null instead of guessing.
 */
export function buildNounEndingRefresher(id, surface, expectedGloss) {
  const sourceForms = NOUN_FORMS[id]
  if (!sourceForms) return null
  const forms = uniqueForms(sourceForms)
  const target = forms.find((form) =>
    lower(form.al) === lower(surface) &&
    (expectedGloss == null || form.gloss === expectedGloss),
  ) ?? forms.find((form) => lower(form.al) === lower(surface))
  if (!target) return null
  const signature = CORE_CLASS_TAGS.includes(target.tag) ? classSignature(forms) : null
  const peer = peerFor(id, signature)

  return {
    id,
    target: { ...target, role: NOUN_FORM_ROLE_LABELS[target.tag] },
    pattern: patternFor(forms, target, signature, peer),
    ruleSignature: signature ? {
      tags: [...CORE_CLASS_TAGS],
      endings: [...signature.endings],
    } : null,
    peer,
    rows: rowsFor(forms, target).map((form) => ({
      ...form,
      role: NOUN_FORM_ROLE_LABELS[form.tag],
      missed: form === target,
    })),
  }
}
