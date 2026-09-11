import { NOUN_FORMS } from './nounForms.js'
import { TRAIN_NOUN_ENDING_CORRECTION_POLICY } from './trainingProgression.js'

// Learner-facing labels stay deliberately short: the authored gloss carries the
// noun's exact meaning, while this label explains why that shape is being used.
export const NOUN_FORM_ROLE_LABELS = Object.freeze({
  indefNom: 'base form · one / a',
  indefAcc: 'one / a · object',
  defNom: 'the noun · subject',
  defAcc: 'the noun · object',
  defDat: 'of / to / from the noun',
  defDatTosk: 'of / to / from the noun · Tosk form',
  indefDat: 'to / of one noun',
  plIndef: 'plural · general',
  plDef: 'the nouns · plural',
  plDat: 'of / to / from the nouns',
  plAbl: 'from / of nouns',
  ablIndef: 'from / of one noun',
  voc: 'direct address',
  adj: 'describing form',
  adjPl: 'describing form · plural',
  elided: 'shortened poetic form',
})

// Phrase production reports the exact contextual surface which was missed.
// Keeping this adapter here gives word-form and phrase exercises one correction
// source: a noun refresher is shown only when that exact reviewed noun form is
// known, never guessed from the learner's spelling.
export function phraseNounEndingRefresher(question, result) {
  const diagnostic = result?.diagnostic
  if (
    result?.correct ||
    diagnostic?.kind !== TRAIN_NOUN_ENDING_CORRECTION_POLICY.diagnosticKind ||
    !TRAIN_NOUN_ENDING_CORRECTION_POLICY.phraseModes.includes(question?.mode) ||
    !TRAIN_NOUN_ENDING_CORRECTION_POLICY.phraseScopes.includes(question?.typeScope)
  ) return null

  const definition = question?.skill === 'production'
    ? TRAIN_NOUN_ENDING_CORRECTION_POLICY.phraseProductionStages.find((stage) =>
        stage.tier === question.tier &&
        stage.mode === question.mode &&
        stage.typeScope === question.typeScope,
      )
    : null
  if (!definition) return null

  const id = diagnostic.focusId || question?.focusId
  const expectedSurface = diagnostic.expectedSurface
  const answerSurface = diagnostic.answerSurface
  const sourceForms = NOUN_FORMS[id]
  if (!id || !expectedSurface || !answerSurface || !sourceForms) return null

  const forms = uniqueForms(sourceForms)
  const expectedMatches = forms.filter((form) => lower(form.al) === lower(expectedSurface))
  // A syncretic surface can carry two grammatical jobs. Unless the question
  // supplies the reviewed job, choosing either one would make the explanation
  // confidently wrong (for example a bare form used as an object).
  const expectedTag = diagnostic.expectedTag || question?.expectedNounFormTag
  const target = expectedTag
    ? expectedMatches.find((form) => form.tag === expectedTag)
    : expectedMatches.length === 1 ? expectedMatches[0] : null
  if (!target) return null

  const answer = lower(answerSurface)
  const expected = lower(expectedSurface)
  if (answer === expected) return null
  const anotherReviewedForm = forms.some((form) => lower(form.al) === answer)
  const signature = classSignature(forms)
  const changesOnlyEnding = Boolean(
    signature &&
    expected.startsWith(lower(signature.stem)) &&
    answer.startsWith(lower(signature.stem)),
  )
  if (!anotherReviewedForm && !changesOnlyEnding) return null

  return buildNounEndingRefresher(id, expectedSurface, target.gloss)
}

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
  'voc',
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
const cleanGloss = (gloss) => gloss.replace(/\s*\([^)]*\)\s*$/, '').trim()
const capitalize = (text) => text ? text[0].toLocaleUpperCase('sq') + text.slice(1) : text

const bareNoun = (forms) => {
  const lemmaGloss = cleanGloss(forms.find((form) => form.tag === 'indefNom')?.gloss || 'noun')
  return lemmaGloss.replace(/^(?:a|an)\s+/i, '')
}

const learnerMeaningFor = (form, forms) => {
  const noun = bareNoun(forms)
  if (form.tag === 'defDat' || form.tag === 'defDatTosk') return `of / to / from the ${noun}`
  if (form.tag === 'indefDat') return `of / to a ${noun}`
  if (form.tag === 'ablIndef') return `from / of a ${noun}`
  return cleanGloss(form.gloss)
}

// The examples demonstrate grammatical jobs, not a sequence. Each template is
// short enough for a beginner and carries the exact reviewed surface unchanged.
const barePluralMeaning = (meaning) => meaning
  .replace(/^(?:(?:from|to)\s*\/\s*of|of)\s+(?:the\s+)?/i, '')

const exampleFor = (form, forms) => {
  const meaning = learnerMeaningFor(form, forms)
  const noun = bareNoun(forms)
  switch (form.tag) {
    case 'indefNom':
      return /^(?:a|an)\s+/i.test(meaning)
        ? { al: `një ${form.al}`, en: meaning }
        : { al: `${form.al} këtu`, en: `${meaning} here` }
    case 'indefAcc':
      return { al: `Shoh një ${form.al}.`, en: `I see ${meaning}.` }
    case 'defAcc':
      return { al: `Shoh ${form.al}.`, en: `I see ${meaning}.` }
    case 'defNom':
      return { al: `${capitalize(form.al)} është këtu.`, en: `${capitalize(meaning)} is here.` }
    case 'defDat':
    case 'defDatTosk':
      return { al: `Pranë ${form.al}.`, en: `Near the ${noun}.` }
    case 'indefDat':
      return { al: `Pranë një ${form.al}.`, en: `Near a ${noun}.` }
    case 'ablIndef':
      return { al: `Prej një ${form.al}.`, en: `From a ${noun}.` }
    case 'voc':
      return { al: `${capitalize(form.al)}!`, en: `${capitalize(meaning)}!` }
    case 'plIndef':
      return { al: `Disa ${form.al}.`, en: `Some ${meaning}.` }
    case 'plDef':
      return { al: `${capitalize(form.al)} janë këtu.`, en: `${capitalize(meaning)} are here.` }
    case 'plDat':
      return { al: `Pranë ${form.al}.`, en: `Near the ${barePluralMeaning(meaning)}.` }
    case 'plAbl':
      return { al: `Pas shumë ${form.al}.`, en: `After many ${barePluralMeaning(meaning)}.` }
    case 'adj':
      return { al: `Diçka të ${form.al}.`, en: `Something ${meaning}.` }
    case 'adjPl':
      return { al: `Gjëra të ${form.al}.`, en: `${capitalize(meaning)} things.` }
    case 'elided':
      return { al: `Një ${form.al} i ri.`, en: `A young ${noun}.` }
    default:
      return { al: form.al, en: meaning }
  }
}

const enrichForm = (form, forms) => ({
  ...form,
  role: NOUN_FORM_ROLE_LABELS[form.tag],
  learnerMeaning: learnerMeaningFor(form, forms),
  example: exampleFor(form, forms),
})

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
      rows: candidate.rows.map((form) => enrichForm(form, uniqueForms(sourceForms))),
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
    const general = first(forms, 'plIndef')
    const definite = first(forms, 'plDef')
    const oblique = first(forms, 'plDat')
    const indefiniteAblative = first(forms, 'plAbl')
    if (target.tag === 'plAbl') {
      return `After words such as shumë, an indefinite plural takes the ablative -sh/-ish form. This noun uses ${indefiniteAblative}; learn it beside ${general} because plural stems can change.`
    }
    if (target.tag === 'plDat') {
      return `The plural ending -ve serves “of”, “to” and definite “from” roles. This noun uses ${oblique}; the surrounding article or preposition tells you the exact job.`
    }
    if (general && definite) {
      return `Keep this noun’s general plural ${general} distinct from its definite plural ${definite}. Albanian plural stems vary, so reuse only a pattern verified on another noun.`
    }
    return 'This guidance is specific to this noun: do not build its exact plural form by copying a singular ending.'
  }
  if (target.tag === 'adj' || target.tag === 'adjPl') {
    return 'This guidance is specific to this noun’s describing form, which is narrower than its ordinary noun endings.'
  }
  if (target.tag === 'elided') {
    return 'This guidance is specific to this deliberately shortened poetic form; compare it only with this noun’s full base form.'
  }
  if (target.tag === 'voc') {
    return 'This guidance is specific to this noun’s direct-address form, used when calling to someone; it is not an ordinary subject or object ending.'
  }
  if (target.tag === 'indefAcc') {
    return 'An indefinite singular object normally keeps the noun’s base form; the sentence around it shows that it is the object. The definite object has its own ending.'
  }
  if (target.tag === 'indefDat' || target.tag === 'ablIndef') {
    const oblique = first(forms, 'indefDat')
    return `With një, the genitive, dative and ablative share this noun’s indefinite oblique form, ${oblique}. An article or preposition such as prej shows the exact role.`
  }
  if (target.tag === 'defDatTosk') {
    return 'This is a reviewed Tosk variant of the definite oblique form. Keep it beside the standard form for this noun, but do not extend it to every noun.'
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
      return 'A common feminine -ë class uses -ë for one/a, -a for the subject, -ën for the object, and -ës for of/to/from the noun. Many feminine nouns use other classes.'
    }
    if (definite === `${stem}i` && object === `${stem}in` && toOf === `${stem}it`) {
      return 'This masculine -ë class uses -ë for one/a, -i for the subject, -in for the object, and -it for of/to/from the noun. It is not a rule for every masculine noun.'
    }
  }

  if (definite === `${lemma}i` && object === `${lemma}in` && toOf === `${lemma}it`) {
    return 'This consonant-base class keeps the base, then uses -i, -in and -it in the definite singular. Other noun classes change the stem or use -u.'
  }
  if (definite === `${lemma}u` && object === `${lemma}un` && toOf === `${lemma}ut`) {
    return 'This consonant-base class keeps the base, then uses -u, -un and -ut in the definite singular. Other masculine nouns use -i or change their stem.'
  }

  const endingNames = signature.endings.map((ending, index) =>
    `${ending || 'unchanged base'} (${NOUN_FORM_ROLE_LABELS[CORE_CLASS_TAGS[index]]})`,
  ).join('; ')
  return `These reviewed nouns share this narrow singular pattern: ${endingNames}. Use it only when all four jobs match.`
}

const rowsFor = (forms, target) => {
  const targetFamily = target.tag.startsWith('pl')
    ? (form) => form.tag.startsWith('pl') || form.tag === 'indefNom'
    : target.tag === 'adj' || target.tag === 'adjPl'
      ? (form) => form.tag === 'indefNom' || form.tag === 'adj' || form.tag === 'adjPl'
      : target.tag === 'voc'
        ? (form) => form.tag === 'indefNom' || form.tag === 'voc'
        : target.tag === 'elided'
          ? (form) => form.tag === 'indefNom' || form.tag === 'elided'
          : CORE_CLASS_TAGS.includes(target.tag)
            ? (form) => CORE_CLASS_TAGS.includes(form.tag)
            : target.tag === 'indefAcc'
              ? (form) => ['indefNom', 'indefAcc', 'defAcc'].includes(form.tag)
              : target.tag === 'indefDat' || target.tag === 'ablIndef'
                ? (form) => ['indefNom', 'indefDat', 'ablIndef', 'defDat'].includes(form.tag)
                : target.tag === 'defDatTosk'
                  ? (form) => [...CORE_CLASS_TAGS, 'defDatTosk'].includes(form.tag)
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
    target: enrichForm(target, forms),
    pattern: patternFor(forms, target, signature, peer),
    ruleSignature: signature ? {
      tags: [...CORE_CLASS_TAGS],
      endings: [...signature.endings],
    } : null,
    peer,
    rows: rowsFor(forms, target).map((form) => ({ ...enrichForm(form, forms), missed: form === target })),
  }
}
