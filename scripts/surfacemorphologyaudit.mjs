// Learner-facing stem/ending display audit.
//
// The faded ending is a grammatical claim, not decoration. This whole-bank
// audit permits it only when the boundary comes from a reviewed noun number
// family or a tightly constrained reviewed adjective family. Irregular,
// phrase-shaped, ambiguous, and unreviewed morphology must fail closed to the
// original whole surface.

import {
  ATTESTED_SURFACES,
  DEFS,
  DICT,
  HEART_LEVELS,
  ITEMS,
  STORY,
  lineOf,
} from '../src/game/content.js'
import { NOUN_FORMS } from '../src/game/nounForms.js'
import { NOUN_SENSE_IDS } from '../src/game/nounRegistry.js'
import {
  REVIEWED_ADJECTIVE_DISPLAY_STEMS,
  splitStem,
  surfaceSegmentation,
} from '../src/game/surfaceMorphology.js'
import { WORD_CLASS, wordClassOf } from '../src/game/wordClassPolicy.js'

const failures = []
const fail = (message) => failures.push(message)
const assert = (condition, message) => { if (!condition) fail(message) }
const fold = (value) => String(value ?? '').normalize('NFC').toLocaleLowerCase('sq')
const length = (value) => Array.from(value).length
const oneWord = (value) => /^[\p{L}\p{M}]+$/u.test(value)

const expectSplit = (id, surface, expectedStem, expectedEnding, formTag) => {
  const [stem, ending] = splitStem(id, surface, formTag)
  assert(
    stem === expectedStem && ending === expectedEnding,
    `${id}/${surface}: expected ${expectedStem}+${expectedEnding}, got ${stem}+${ending}`,
  )
}

const expectWhole = (id, surface, formTag) => {
  const [stem, ending] = splitStem(id, surface, formTag)
  assert(
    stem === surface && ending === '',
    `${id}/${surface}: unsafe morphology must remain whole, got ${stem}+${ending}`,
  )
}

// Requested regression: capitalization must not erase the reviewed uj- stem.
expectSplit('uje', 'ujë', 'uj', 'ë', 'indefNom')
expectSplit('uje', 'uji', 'uj', 'i', 'defNom')
expectSplit('uje', 'ujin', 'uj', 'in', 'defAcc')
expectSplit('uje', 'Uji', 'Uj', 'i', 'defNom')

// Singular and plural allomorphs are reviewed independently instead of being
// collapsed into the one-letter prefixes the old whole-family heuristic found.
expectSplit('dore', 'dorë', 'dor', 'ë', 'indefNom')
expectSplit('dore', 'duart', 'duar', 't', 'plDef')
expectSplit('kale', 'kalë', 'kal', 'ë', 'indefNom')
expectSplit('kale', 'kuajt', 'kuaj', 't', 'plDef')

// The original visible adjective treatment remains an explicit reviewed case.
expectSplit('kalter', 'kaltër', 'kalt', 'ër')
expectSplit('kalter', 'kaltra', 'kalt', 'ra')

// These were concrete false-positive risks from the former longest-prefix
// implementation. No tiny or phrase fragment may be presented as a root.
expectWhole('merr', 'merr')
expectWhole('do', 'dua')
expectWhole('yll', 'yje')
expectWhole('krua', 'kroi', 'defNom')
expectWhole('naten', 'atë natë')
expectWhole('muzg', 'në muzg')
expectWhole('tek', 'tek')

// The accented lemma dhé and its unaccented stem dhe- are not reduced to dh-.
expectWhole('dhe_earth', 'dhé', 'indefNom')
expectSplit('dhe_earth', 'dheut', 'dhe', 'ut', 'defDat')

const allowedSources = new Set([
  'reviewed-noun-singular',
  'reviewed-noun-plural',
  'reviewed-adjective-surface',
])
const sourceCounts = Object.fromEntries([...allowedSources].map((source) => [source, 0]))
const adjectiveSurfaceCounts = Object.fromEntries(
  Object.entries(REVIEWED_ADJECTIVE_DISPLAY_STEMS).flatMap(([id, surfaces]) =>
    Object.keys(surfaces).map((surface) => [`${id}/${surface}`, 0])),
)

for (const [id, family] of Object.entries(ATTESTED_SURFACES)) {
  const wordClass = wordClassOf(id, DICT[id], { hasAttestedVariant: family.forms.length > 1 })
  for (const surface of family.forms) {
    const segmentation = surfaceSegmentation(id, surface)
    const [stem, ending] = splitStem(id, surface)
    if (!segmentation) {
      assert(stem === surface && ending === '', `${id}/${surface}: null provenance did not fail closed`)
      continue
    }

    sourceCounts[segmentation.source] = (sourceCounts[segmentation.source] || 0) + 1
    assert(allowedSources.has(segmentation.source), `${id}/${surface}: unknown source ${segmentation.source}`)
    assert(stem === segmentation.stem && ending === segmentation.ending, `${id}/${surface}: split differs from provenance`)
    assert(`${stem}${ending}` === surface, `${id}/${surface}: split does not reconstruct exact authored surface`)
    assert(Boolean(ending), `${id}/${surface}: emitted an empty ending`)
    assert(length(stem) >= 2, `${id}/${surface}: emitted unsafe short stem “${stem}”`)
    assert(oneWord(surface), `${id}/${surface}: split a phrase or punctuated surface`)
    assert(fold(surface).startsWith(fold(stem)), `${id}/${surface}: stem is not an exact folded prefix`)

    if (segmentation.source.startsWith('reviewed-noun-')) {
      assert(NOUN_SENSE_IDS.has(id), `${id}/${surface}: noun source is not classified as a noun`)
      assert(Boolean(NOUN_FORMS[id]), `${id}/${surface}: noun source has no reviewed paradigm`)
      assert(
        NOUN_FORMS[id]?.some((form) => fold(form.al) === fold(surface)),
        `${id}/${surface}: noun surface is absent from its reviewed paradigm`,
      )
    } else {
      assert(wordClass === WORD_CLASS.ADJECTIVE, `${id}/${surface}: non-noun split is not a reviewed adjective`)
      const surfaceKey = `${id}/${fold(surface)}`
      adjectiveSurfaceCounts[surfaceKey] = (adjectiveSurfaceCounts[surfaceKey] || 0) + 1
      assert(
        REVIEWED_ADJECTIVE_DISPLAY_STEMS[id]?.[fold(surface)] === fold(stem),
        `${id}/${surface}: adjective provenance does not match its exact reviewed surface`,
      )
    }
  }
}

// Every individual role-labelled noun form must obey the same contract when
// Token supplies its formTag, including syncretic spellings used for two roles.
for (const [id, forms] of Object.entries(NOUN_FORMS)) {
  for (const form of forms) {
    const segmentation = surfaceSegmentation(id, form.al, form.tag)
    const [stem, ending] = splitStem(id, form.al, form.tag)
    assert(`${stem}${ending}` === form.al, `${id}/${form.tag}: tagged split does not reconstruct ${form.al}`)
    if (!segmentation) {
      assert(stem === form.al && ending === '', `${id}/${form.tag}: unreviewed tagged form did not remain whole`)
    } else {
      assert(
        segmentation.source === 'reviewed-noun-singular' || segmentation.source === 'reviewed-noun-plural',
        `${id}/${form.tag}: tagged noun escaped noun provenance`,
      )
    }
  }
}

// Exercise all token-bearing runtime banks that can reach Token.jsx, not just
// the surface family used to derive adjective evidence.
const tokenRows = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [index, entry] of (node.text || []).entries()) {
    for (const token of lineOf(entry)) tokenRows.push({ address: `${nodeId}.text[${index}]`, token })
  }
  for (const [index, option] of (node.options || []).entries()) {
    for (const token of option.text || []) tokenRows.push({ address: `${nodeId}.options[${index}]`, token })
  }
}
for (const [itemId, item] of Object.entries(ITEMS)) {
  for (const token of item.use?.phrase || []) tokenRows.push({ address: `ITEMS.${itemId}.use`, token })
}
for (const [level, health] of Object.entries(HEART_LEVELS)) {
  for (const token of health.line || []) tokenRows.push({ address: `HEART_LEVELS.${level}.line`, token })
  for (const token of health.heal?.phrase || []) tokenRows.push({ address: `HEART_LEVELS.${level}.heal`, token })
}
for (const [id, definition] of Object.entries(DEFS)) {
  for (const token of definition || []) tokenRows.push({ address: `DEFS.${id}`, token })
}

for (const { address, token } of tokenRows) {
  if (!token?.id) continue
  const [stem, ending] = splitStem(token.id, token.al, token.formTag)
  assert(`${stem}${ending}` === token.al, `${address}: ${token.id}/${token.al} does not reconstruct exactly`)
  assert(!ending || length(stem) >= 2, `${address}: ${token.id}/${token.al} exposes a one-letter stem`)
}

assert(
  sourceCounts['reviewed-noun-singular'] >= 400,
  `reviewed singular display coverage fell unexpectedly (${sourceCounts['reviewed-noun-singular']})`,
)
assert(
  sourceCounts['reviewed-noun-plural'] >= 50,
  `reviewed plural display coverage fell unexpectedly (${sourceCounts['reviewed-noun-plural']})`,
)
assert(
  sourceCounts['reviewed-adjective-surface'] >= 30,
  `reviewed adjective display coverage fell unexpectedly (${sourceCounts['reviewed-adjective-surface']})`,
)
for (const [address, count] of Object.entries(adjectiveSurfaceCounts)) {
  assert(count > 0, `${address}: reviewed adjective boundary is not exercised by an attested surface`)
}

if (failures.length) {
  console.error(`\nSurface morphology audit FAILED (${failures.length})`)
  failures.forEach((message) => console.error(`  - ${message}`))
  process.exit(1)
}

console.log(
  `Surface morphology audit passed: ${tokenRows.length} runtime tokens checked; ` +
  `${Object.values(sourceCounts).reduce((sum, count) => sum + count, 0)} attested splits have reviewed provenance ` +
  `(${sourceCounts['reviewed-noun-singular']} singular noun, ` +
  `${sourceCounts['reviewed-noun-plural']} plural noun, ` +
  `${sourceCounts['reviewed-adjective-surface']} exact-surface adjective).`,
)
