// One-off generator: proposes DICT[id].forms tables for nouns from the inflected
// surfaces they already take across the story (harvested from wf() calls), inferring
// each surface's grammatical tag from its ending + the authored story gloss.
// Emits JS + a REVIEW list of low-confidence / irregular cases to fix by hand.
import { DICT } from '../src/game/content.js'
import fs from 'fs'

const src = fs.readFileSync('src/game/content.js', 'utf8')

// harvest id -> surface -> { n, glosses }
const data = {}
for (const m of src.matchAll(/wf\('([a-z_]+)', '([^']*)'(?:, '([^']*)')?\)/g)) {
  const [, id, al, gl] = m
  ;(data[id] ||= {})
  const key = al
  ;(data[id][key] ||= { n: 0, gl: new Map() })
  data[id][key].n++
  if (gl) data[id][key].gl.set(gl, (data[id][key].gl.get(gl) || 0) + 1)
}

// obvious non-nouns (verbs / adjectives / pronouns / adverbs) to skip
const EXCLUDE = new Set(
  ('thote bej ka shko vrit jam vjen sheh lufto merr do yt im mendoj ik vdes hyr premto behet ' +
    'mban rri le vajto kerce ndihmo lind di jep shiko kerko gjen ha pi fle ec zgjohu ndiz kalo ' +
    'ruaj mbaj fol thuaj prit dil ngjit zbrit ngre bie sjell mesoj degjo hap fal marto beso gjej ' +
    'luan mund ke je pa nis kthe kap gjet ndal shpeto ther pyet quaj rrjedh dridh perpiq nxjerr ' +
    'fut prek qaj puth bardhe ftohte fluturo kthehu kendo meso ndodh verbo fsheh bekim ky').split(/\s+/),
)

const irregularPlural = {
  person: 'people', man: 'men', woman: 'women', child: 'children', boy: 'boys',
  'old man': 'old men', 'old woman': 'old women', foot: 'feet', tooth: 'teeth',
  'she-dragon': 'she-dragons', sea: 'seas', eyes: 'eyes', son: 'sons', daughter: 'daughters',
}
const pluralize = (n) => {
  if (irregularPlural[n]) return irregularPlural[n]
  if (/(s|sh|ch|x|z)$/.test(n)) return n + 'es'
  if (/[^aeiou]y$/.test(n)) return n.slice(0, -1) + 'ies'
  return n + 's'
}
const article = (n) => (/^[aeiou]/i.test(n) ? 'an ' : 'a ')
const glossFor = (tag, n) =>
  ({
    indefNom: article(n) + n,
    indefAcc: article(n) + n,
    defNom: 'the ' + n,
    defAcc: 'the ' + n + ' (object)',
    defDat: 'to/of the ' + n,
    plIndef: pluralize(n),
    plDef: 'the ' + pluralize(n),
  }[tag])

// infer a tag for one surface given the lemma and the story gloss(es)
function inferTag(id, al, glosses, plWord) {
  const lemma = DICT[id].al
  const L = al.toLowerCase()
  const lem = lemma.toLowerCase()
  if (L === lem) return { tag: 'indefNom', conf: 'high' }
  const gl = [...glosses].join(' | ').toLowerCase()
  // plural only if the english plural actually appears in the gloss (avoids
  // "darkness"/"dress" — singular nouns that merely END in s)
  const glPlural = plWord !== null && gl.includes(plWord) && plWord !== lem
  const glDat = /\bto the\b|\bof the\b|\bto a\b|\bof a\b/.test(gl)
  const endsN = /n[ëe]?$/.test(L) // fem acc -ën / -në, masc acc -in/-un, all end in n(+ë)
  const endsT = /t[ëe]?$/.test(L)

  // dative: gloss says to/of, OR masc -it/-ut / fem -ës / -as (but not a plural -t)
  if (glDat || /(it|ut)$/.test(L) || (/(ës|as)$/.test(L) && !glPlural)) return { tag: 'defDat', conf: glDat ? 'high' : 'med' }
  // plural: gloss plural, OR definite-plural endings -t/-të/-et/-at
  if (glPlural || /(të|et|at)$/.test(L)) {
    return { tag: endsT || /(të|et|at)$/.test(L) ? 'plDef' : 'plIndef', conf: glPlural ? 'high' : 'med' }
  }
  // definite singular: accusative if it ends in -n(ë), else nominative
  if (endsN) return { tag: 'defAcc', conf: 'high' }
  if (/(i|u|a|ja|ia|ri)$/.test(L)) return { tag: 'defNom', conf: 'high' }
  return { tag: 'defNom', conf: 'low' }
}

const out = []
const review = []
const nouns = Object.keys(data)
  .filter((id) => Object.keys(data[id]).length >= 2 && !EXCLUDE.has(id) && DICT[id] && !DICT[id].forms)
  .filter((id) => DICT[id].al[0] === DICT[id].al[0].toLowerCase()) // skip proper names
  .sort()

// Hand-authored tables that OVERRIDE the auto inference (irregulars, and a few
// nouns whose DICT.en is plural/mass so the templated gloss reads wrong). Rows
// are [surface, tag, gloss]. Must cover every story surface of that id.
const M = (rows) => rows.map(([al, tag, gloss]) => ({ al, tag, gloss }))
const MANUAL = {
  baba: M([['baba','indefNom','a father'],['babai','defNom','the father'],['baban','defAcc','the father (object)'],['babi','defNom','dad']]),
  bari: M([['bari','indefNom','a shepherd'],['bariun','defAcc','the shepherd (object)']]),
  dallendyshe: M([['dallëndyshe','indefNom','a swallow'],['dallëndyshen','defAcc','the swallow (object)'],['dallëndyshes','defDat','to/of the swallow']]),
  gje: M([['gjë','indefNom','a thing'],['gjëra','plIndef','things'],['gjërat','plDef','the things']]),
  lot: M([['lot','indefNom','a tear'],['lotët','plDef','the tears']]),
  lume: M([['lumë','indefNom','a river'],['lumi','defNom','the river'],['lumin','defAcc','the river (object)']]),
  mik: M([['mik','indefNom','a friend'],['miku','defNom','the friend'],['mikun','defAcc','the friend (object)'],['mikut','defDat','to/of the friend'],['mike','indefNom','a friend (female)']]),
  mulli: M([['mulli','indefNom','a mill'],['mulliri','defNom','the mill'],['mullirin','defAcc','the mill (object)']]),
  nene: M([['nënë','indefNom','a mother'],['nëna','defNom','the mother'],['nënën','defAcc','the mother (object)'],['nënës','defDat','to/of the mother']]),
  njeri: M([['njeri','indefNom','a person'],['njeriu','defNom','the person'],['njeriun','defAcc','the person (object)'],['njeriut','defDat','to/of the person'],['njerëz','plIndef','people'],['njerëzit','plDef','the people']]),
  nuse: M([['nuse','indefNom','a bride'],['nusja','defNom','the bride'],['nusen','defAcc','the bride (object)'],['nuses','defDat','to/of the bride'],['nuseve','plDef','the brides']]),
  qiri: M([['qiri','indefNom','a candle'],['qiriun','defAcc','the candle (object)']]),
  vella: M([['vëlla','indefNom','a brother'],['vëllai','defNom','the brother'],['vëllait','defDat','to/of the brother'],['vëllezër','plIndef','brothers'],['vëllezërit','plDef','the brothers']]),
  // auto glosses read wrong because DICT.en is plural/mass — correct here
  sy: M([['sy','indefNom','an eye'],['syri','defNom','the eye'],['syrin','defAcc','the eye (object)'],['sytë','plDef','the eyes']]),
  kembe: M([['këmbë','indefNom','a leg'],['këmbën','defAcc','the leg (object)']]),
  pate: M([['patë','indefNom','a goose'],['patat','plDef','the geese'],['patave','plDef','the geese (to/of)']]),
}
// DICT.al is stored as a DEFINITE form here (data quirk) — defer until the lemma is fixed
const DEFER = new Set(['kulshedra', 'naten'])

const manual = []
const tables = {} // id -> rows (auto), later overridden by MANUAL
for (const id of nouns) {
  const n = DICT[id].en
  const lemma = DICT[id].al
  const plWord = pluralize(n).toLowerCase()
  // case-fold dedupe surfaces (keep the lowercased spelling for the drill)
  const surfaces = {}
  let multiword = false
  for (const [al, info] of Object.entries(data[id])) {
    if (/\s/.test(al)) { multiword = true; continue } // "një gjë" etc — data quirk, skip noun
    const k = al.toLowerCase()
    ;(surfaces[k] ||= { n: 0, gl: new Map() })
    surfaces[k].n += info.n
    for (const [g, c] of info.gl) surfaces[k].gl.set(g, (surfaces[k].gl.get(g) || 0) + c)
  }
  const lem = lemma.toLowerCase()
  if (!surfaces[lem]) surfaces[lem] = { n: 0, gl: new Map() }

  const rows = []
  const usedTags = new Map()
  const notes = []
  if (multiword) notes.push('has multiword surface')
  for (const [k, info] of Object.entries(surfaces).sort((a, b) => b[1].n - a[1].n)) {
    const { tag, conf } = inferTag(id, k, info.gl.keys(), plWord)
    if (usedTags.has(tag) && tag !== 'indefNom') notes.push(`dup ${tag}: ${usedTags.get(tag)} & ${k}`)
    usedTags.set(tag, k)
    if (conf === 'low') notes.push(`low-conf ${k}->${tag}`)
    rows.push({ al: k, tag, gloss: glossFor(tag, n) })
  }
  tables[id] = rows
  if (notes.length) manual.push(id)
}

// merge: MANUAL overrides auto; drop the deferred (broken-lemma) nouns
const order = ['indefNom', 'indefAcc', 'defNom', 'defAcc', 'defDat', 'plIndef', 'plDef']
const final = {}
for (const id of nouns) {
  if (DEFER.has(id)) continue
  const rows = (MANUAL[id] || tables[id]).slice().sort((a, b) => order.indexOf(a.tag) - order.indexOf(b.tag))
  const en = DICT[id].en
  const body = rows.map((r) => `    { al: '${r.al}', tag: '${r.tag}', gloss: ${JSON.stringify(r.gloss)} },`).join('\n')
  final[id] = `  ${id}: [ /* ${en}${MANUAL[id] ? ' — hand' : ''} */\n${body}\n  ],`
}

const block =
  '// Declension tables for every noun the story inflects (see the wf() forms guard\n' +
  '// and frequentForms). Attached onto DICT below; the 9 flagship nouns keep their\n' +
  '// inline forms. Generated by scripts/gen_forms.mjs, hand-reviewed.\n' +
  'const NOUN_FORMS = {\n' +
  Object.keys(final).sort().map((id) => final[id]).join('\n') +
  '\n}\nfor (const [id, forms] of Object.entries(NOUN_FORMS)) DICT[id].forms = forms\n'

fs.writeFileSync('scripts/data/forms_block.js', block)
console.log('tables in NOUN_FORMS:', Object.keys(final).length)
console.log('  (manual overrides:', Object.keys(MANUAL).filter((id) => final[id]).length, ', deferred:', [...DEFER].join(', '), ')')
console.log('flagged during inference:', manual.length)
