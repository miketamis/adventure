// Static completeness gate for the noun forms that power endings practice.
// Albanian case roles can be syncretic: the gate requires each grammatical job
// to be reviewed, but it does not demand that every job have a different suffix.
import assert from 'node:assert/strict'
import { DICT } from '../src/game/dictionary.js'
import {
  NOUN_FORMS,
  NOUN_PLURAL_EXEMPTIONS,
  NOUN_SINGULAR_EXEMPTIONS,
} from '../src/game/nounForms.js'

const singularRoles = [
  'indefNom',
  'indefAcc',
  'indefDat',
  'ablIndef',
  'defNom',
  'defAcc',
  'defDat',
]
const pluralRoles = ['plIndef', 'plDef', 'plDat', 'plAbl']
const allowedTags = new Set([
  ...singularRoles,
  ...pluralRoles,
  'indefAcc',
  'indefDat',
  'defDatTosk',
  'ablIndef',
  'plAbl',
  'adj',
  'adjPl',
  'elided',
  'voc',
])

let forms = 0
let pluralParadigms = 0
for (const [id, paradigm] of Object.entries(NOUN_FORMS)) {
  assert.ok(DICT[id], `${id}: noun paradigm has no dictionary sense`)
  assert.ok(Array.isArray(paradigm) && paradigm.length > 0, `${id}: empty noun paradigm`)

  const exactRows = new Set()
  for (const form of paradigm) {
    assert.ok(form.al?.trim(), `${id}: form has no Albanian surface`)
    assert.ok(allowedTags.has(form.tag), `${id}/${form.al}: unknown role ${form.tag}`)
    assert.ok(form.gloss?.trim(), `${id}/${form.al}: form has no learner gloss`)
    const key = `${form.al.normalize('NFC').toLocaleLowerCase('sq')}\u0000${form.tag}`
    assert.ok(!exactRows.has(key), `${id}/${form.al}: duplicate ${form.tag} row`)
    exactRows.add(key)
    forms += 1
  }

  const singularExemption = NOUN_SINGULAR_EXEMPTIONS[id]
  const hasSingular = paradigm.some((form) => singularRoles.includes(form.tag))
  assert.ok(hasSingular || singularExemption, `${id}: noun has no singular roles or explicit plural-only exemption`)
  assert.ok(!(hasSingular && singularExemption), `${id}: singular paradigm still carries a stale exemption`)
  if (hasSingular) {
    for (const role of singularRoles) {
      assert.ok(paradigm.some((form) => form.tag === role), `${id}: missing reviewed ${role} role`)
    }
  }

  const hasPlural = paradigm.some((form) => form.tag.startsWith('pl'))
  const pluralExemption = NOUN_PLURAL_EXEMPTIONS[id]
  assert.ok(hasPlural || pluralExemption, `${id}: count noun has no reviewed plural paradigm or explicit mass-noun exemption`)
  assert.ok(!(hasPlural && pluralExemption), `${id}: plural paradigm still carries a stale exemption`)
  if (hasPlural) {
    pluralParadigms += 1
    for (const role of pluralRoles) {
      assert.ok(paradigm.some((form) => form.tag === role), `${id}: partial plural paradigm is missing ${role}`)
    }
  }
}

for (const id of Object.keys(NOUN_PLURAL_EXEMPTIONS)) {
  assert.ok(NOUN_FORMS[id], `${id}: plural exemption has no noun paradigm`)
}
for (const id of Object.keys(NOUN_SINGULAR_EXEMPTIONS)) {
  assert.ok(NOUN_FORMS[id], `${id}: singular exemption has no noun paradigm`)
}

for (const [id, entry] of Object.entries(DICT)) {
  if (entry.formTrack === 'noun') {
    assert.equal(entry.forms, NOUN_FORMS[id], `${id}: dictionary noun forms bypass the canonical noun table`)
  } else {
    assert.ok(!NOUN_FORMS[id], `${id}: canonical noun paradigm is missing its noun-track marker`)
  }
}

console.log(`✓ ${forms} reviewed noun-role rows; ${pluralParadigms}/${Object.keys(NOUN_FORMS).length} paradigms include complete plural roles.`)
