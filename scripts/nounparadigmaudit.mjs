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
import {
  NOUN_PARADIGM_BACKLOG,
  NOUN_PARADIGM_BACKLOG_IDS,
  NOUN_SENSE_IDS,
  REVIEWED_NOUN_PARADIGM_IDS,
} from '../src/game/nounRegistry.js'
import {
  ADJECTIVE_SENSE_IDS,
  PRONOUN_SENSE_IDS,
  VERB_SENSE_IDS,
  WORD_CLASS,
  wordClassOf,
} from '../src/game/wordClassPolicy.js'

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

// Pin evidence-reviewed migrations so uncommon plurals and case endings cannot
// drift while the independent registry still appears structurally complete.
const migratedParadigmSurfaces = Object.freeze({
  kohe: ['kohë', 'kohë', 'kohe', 'kohe', 'koha', 'kohën', 'kohës', 'kohë', 'kohët', 'kohëve', 'kohësh'],
  ore: ['orë', 'orë', 'ore', 'ore', 'ora', 'orën', 'orës', 'orë', 'orët', 'orëve', 'orësh'],
  emer: ['emër', 'emër', 'emri', 'emri', 'emri', 'emrin', 'emrit', 'emra', 'emrat', 'emrave', 'emrash'],
  fjale: ['fjalë', 'fjalë', 'fjale', 'fjale', 'fjala', 'fjalën', 'fjalës', 'fjalë', 'fjalët', 'fjalëve', 'fjalësh'],
  mengjes: ['mëngjes', 'mëngjes', 'mëngjesi', 'mëngjesi', 'mëngjesi', 'mëngjesin', 'mëngjesit', 'mëngjese', 'mëngjeset', 'mëngjeseve', 'mëngjesesh'],
  dhome: ['dhomë', 'dhomë', 'dhome', 'dhome', 'dhoma', 'dhomën', 'dhomës', 'dhoma', 'dhomat', 'dhomave', 'dhomash'],
  ushqim: ['ushqim', 'ushqim', 'ushqimi', 'ushqimi', 'ushqimi', 'ushqimin', 'ushqimit', 'ushqime', 'ushqimet', 'ushqimeve', 'ushqimesh'],
  kafe: ['kafe', 'kafe', 'kafeje', 'kafeje', 'kafeja', 'kafenë', 'kafesë', 'kafe', 'kafetë', 'kafeve', 'kafesh'],
  shtrat: ['shtrat', 'shtrat', 'shtrati', 'shtrati', 'shtrati', 'shtratin', 'shtratit', 'shtretër', 'shtretërit', 'shtretërve', 'shtretërsh'],
  mbremje: ['mbrëmje', 'mbrëmje', 'mbrëmjeje', 'mbrëmjeje', 'mbrëmja', 'mbrëmjen', 'mbrëmjes', 'mbrëmje', 'mbrëmjet', 'mbrëmjeve', 'mbrëmjesh'],
  mish: ['mish', 'mish', 'mishi', 'mishi', 'mishi', 'mishin', 'mishit'],
  ditelindje: ['ditëlindje', 'ditëlindje', 'ditëlindjeje', 'ditëlindjeje', 'ditëlindja', 'ditëlindjen', 'ditëlindjes', 'ditëlindje', 'ditëlindjet', 'ditëlindjeve', 'ditëlindjesh'],
  celes: ['çelës', 'çelës', 'çelësi', 'çelësi', 'çelësi', 'çelësin', 'çelësit', 'çelësa', 'çelësat', 'çelësave', 'çelësash'],
  dyqan: ['dyqan', 'dyqan', 'dyqani', 'dyqani', 'dyqani', 'dyqanin', 'dyqanit', 'dyqane', 'dyqanet', 'dyqaneve', 'dyqanesh'],
  thike: ['thikë', 'thikë', 'thike', 'thike', 'thika', 'thikën', 'thikës', 'thika', 'thikat', 'thikave', 'thikash'],
  caj: ['çaj', 'çaj', 'çaji', 'çaji', 'çaji', 'çajin', 'çajit', 'çaje', 'çajet', 'çajeve', 'çajesh'],
  pyll: ['pyll', 'pyll', 'pylli', 'pylli', 'pylli', 'pyllin', 'pyllit', 'pyje', 'pyjet', 'pyjeve', 'pyjesh'],
  kepuce: ['këpucë', 'këpucë', 'këpuce', 'këpuce', 'këpuca', 'këpucën', 'këpucës', 'këpucë', 'këpucët', 'këpucëve', 'këpucësh'],
  buke: ['bukë', 'bukë', 'buke', 'buke', 'buka', 'bukën', 'bukës', 'bukë', 'bukët', 'bukëve', 'bukësh'],
  bilete: ['biletë', 'biletë', 'bilete', 'bilete', 'bileta', 'biletën', 'biletës', 'bileta', 'biletat', 'biletave', 'biletash'],
})

const allRoles = [...singularRoles, ...pluralRoles]
for (const [id, surfaces] of Object.entries(migratedParadigmSurfaces)) {
  const roles = id === 'mish' ? singularRoles : allRoles
  assert.deepEqual(
    NOUN_FORMS[id]?.map(({ tag, al }) => [tag, al]),
    roles.map((tag, index) => [tag, surfaces[index]]),
    `${id}: evidence-reviewed paradigm drifted`,
  )
}
assert.equal(
  NOUN_PLURAL_EXEMPTIONS.mish,
  'mass noun in this curriculum: generic edible meat/flesh',
  'mish: curriculum-sense plural exemption drifted',
)

// Practical-object additions are still nouns before their declensions have
// been reviewed. Pin that classification independently so adding a bare
// dictionary row cannot make these changing words look non-inflecting.
const practicalNounBacklogIds = [
  'gote',
  'peshqir',
  'ilac',
  'fashe',
  'cante',
  'kove',
  'cekic',
  'shporte',
]
for (const id of practicalNounBacklogIds) {
  assert.ok(DICT[id], `${id}: practical noun has no dictionary sense`)
  assert.ok(NOUN_SENSE_IDS.has(id), `${id}: practical noun bypassed explicit noun classification`)
  assert.ok(NOUN_PARADIGM_BACKLOG.common.has(id), `${id}: unreviewed practical noun left the common backlog`)
  assert.ok(!NOUN_FORMS[id], `${id}: practical noun received an unreviewed paradigm`)
}

let forms = 0
let pluralParadigms = 0
const paradigmIds = new Set(Object.keys(NOUN_FORMS))

for (const [label, ids] of [
  ['verb', VERB_SENSE_IDS],
  ['adjective', ADJECTIVE_SENSE_IDS],
  ['pronoun', PRONOUN_SENSE_IDS],
]) {
  const overlap = [...NOUN_SENSE_IDS].filter((id) => ids.has(id))
  assert.deepEqual(overlap, [], `noun registry overlaps the explicit ${label} registry: ${overlap.join(', ')}`)
}

assert.deepEqual(
  [...REVIEWED_NOUN_PARADIGM_IDS].sort(),
  [...paradigmIds].sort(),
  'the independent reviewed-noun registry drifted from the canonical paradigm table',
)

const backlogMembership = new Map()
for (const [group, ids] of Object.entries(NOUN_PARADIGM_BACKLOG)) {
  for (const id of ids) {
    assert.ok(DICT[id], `${group}/${id}: noun backlog entry has no dictionary sense`)
    assert.ok(!backlogMembership.has(id), `${id}: noun backlog appears in multiple groups`)
    backlogMembership.set(id, group)
  }
}
assert.deepEqual(
  [...NOUN_PARADIGM_BACKLOG_IDS].sort(),
  [...backlogMembership.keys()].sort(),
  'flattened noun backlog does not match its reviewed groups',
)

for (const id of NOUN_SENSE_IDS) {
  assert.ok(DICT[id], `${id}: declared noun has no dictionary sense`)
  assert.equal(wordClassOf(id, DICT[id]), WORD_CLASS.NOUN, `${id}: explicit noun classification is not authoritative`)
  const hasParadigm = paradigmIds.has(id)
  const isBacklogged = NOUN_PARADIGM_BACKLOG_IDS.has(id)
  assert.notEqual(hasParadigm, isBacklogged, `${id}: noun must have exactly one of paradigm or explicit backlog status`)
}

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
    assert.ok(NOUN_SENSE_IDS.has(id), `${id}: a paradigm silently created noun classification`)
  } else {
    assert.ok(!NOUN_FORMS[id], `${id}: canonical noun paradigm is missing its noun-track marker`)
  }
}

console.log(`✓ ${forms} reviewed noun-role rows; ${pluralParadigms}/${Object.keys(NOUN_FORMS).length} paradigms include complete plural roles.`)
console.log(`  noun paradigm backlog: ${NOUN_PARADIGM_BACKLOG_IDS.size} explicitly classified senses; none enter noun-role practice.`)
for (const [group, ids] of Object.entries(NOUN_PARADIGM_BACKLOG)) {
  console.log(`  ${group}: ${ids.size}${process.argv.includes('--backlog') ? ` — ${[...ids].sort().join(', ')}` : ''}`)
}
