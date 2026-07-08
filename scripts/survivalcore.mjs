// Survival-core coverage audit.
//   node scripts/survivalcore.mjs            -> per-category coverage + gaps
//   node scripts/survivalcore.mjs --missing  -> only the gaps
//
// WHAT THIS IS (and why it is NOT freqcoverage.mjs):
//   freqcoverage.mjs asks "do we use the top-N most FREQUENT words?".
//   This asks a different question: "do we teach the words a person needs to
//   SURVIVE?" — the functional-notional survival syllabus of Nation & Crabbe
//   (1991), "A Survival Language Learning Syllabus for Foreign Travel": ~120
//   items / ~150 words in 8 situational categories, plus the basic-language
//   essentials (numbers, time, pronouns, core verbs, emergencies) that every
//   survival list assumes. Survival-critical words (biletë, tualet, spital,
//   ndihmë) are selected by NEED, not by frequency rank, so many sit far below
//   #1000 and a pure frequency sweep misses them. That gap is the point.
//
// Matching is import-free (content.js may be mid-edit / throw on import): we
// read the DICT block as text and match each survival item either by Albanian
// surface (de-accented) or by an English keyword appearing in its gloss.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const src = readFileSync(join(here, '..', 'src', 'game', 'content.js'), 'utf8')

// --- pull DICT entries out of the source text (no import) ---
const dictStart = src.indexOf('export const DICT = {')
const dictEnd = src.indexOf('\n}', dictStart)
const dictBlock = src.slice(dictStart, dictEnd)
const entryRe = /al:\s*'([^']+)'\s*,\s*en:\s*'([^']+)'(?:\s*,\s*enAll:\s*'([^']+)')?/g
const dictAl = new Set()
const dictGloss = []   // {al, en}
for (const m of dictBlock.matchAll(entryRe)) {
  const [, al, en, enAll] = m
  dictAl.add(deaccent(norm(al)))
  dictGloss.push({ al, en: (enAll || en).toLowerCase() })
}

function norm(s) { return (s || '').toLowerCase().replace(/[.,!?;:"'“”‘’()]/g, '').trim() }
function deaccent(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ë/g, 'e').replace(/ç/g, 'c') }

// --- STORY surfaces, per node, for PHRASE detection ("used properly in a scene").
// A multi-word survival item counts only when the actual phrase is spoken in some
// node — not merely when its words exist in DICT. Imported (content.js imports fine
// now); if it ever throws mid-edit we degrade gracefully and phrases show as gaps.
let nodeStrings = []
try {
  const { STORY, lineOf } = await import('../src/game/content.js')
  for (const n of Object.values(STORY)) {
    const toks = []
    for (const e of n.text || []) for (const t of lineOf(e)) if (t.al) toks.push(deaccent(norm(t.al)))
    nodeStrings.push(toks.join(' '))
  }
} catch { /* import failed — phrase detection off */ }
const phraseUsed = (ph) => { const q = deaccent(norm(ph)); return nodeStrings.some((s) => s.includes(q)) }

// Does a survival item exist in the taught vocabulary?
//   phrase spoken in a scene, OR al surface de-accent match, OR english keyword in a gloss.
function find(item) {
  if (item.phrase && phraseUsed(item.phrase)) return { by: 'phrase', hit: `"${item.phrase}"` }
  const surfaces = item.al.split('/').map((s) => deaccent(norm(s.trim())))
  for (const s of surfaces) if (dictAl.has(s)) return { by: 'al', hit: s }
  for (const kw of item.en) {
    const re = new RegExp(`(^|[^a-z])${kw}([^a-z]|$)`)
    const g = dictGloss.find((d) => re.test(d.en))
    if (g) return { by: 'en', hit: `${g.al} (${g.en})` }
  }
  return null
}

// -------------------------------------------------------------------------
// THE SURVIVAL LIST. { al: 'Albanian (a/b = variants)', en: [gloss keywords] }
// Albanian spellings are best-effort and want a native-speaker review; the
// English keywords are what actually drive the "already taught?" match, so a
// slightly-off spelling still won't produce a false gap.
// -------------------------------------------------------------------------
const SURVIVAL = {
  '1 · Greetings & being polite': [
    { al: 'përshëndetje', en: ['hello', 'greetings'] },
    { al: 'tungjatjeta/tung', en: ['hi'] },
    { al: 'mirëmëngjes', en: ['good morning'] },
    { al: 'mirëdita', en: ['good day', 'good afternoon'] },
    { al: 'mirëmbrëma', en: ['good evening'] },
    { al: 'natën e mirë', en: ['good night'] },
    { al: 'mirupafshim', en: ['goodbye', 'bye'] },
    { al: 'po', en: ['yes'] },
    { al: 'jo', en: ['no', 'not'] },
    { al: 'të lutem/ju lutem', en: ['please'] },
    { al: 'faleminderit', en: ['thank', 'thanks'] },
    { al: 'më fal/më falni', en: ['excuse', 'sorry', 'forgive'] },
    { al: 'si je/si jeni', en: ['how are you'], phrase: 'si je' },
    { al: 'mirë', en: ['well', 'fine', 'okay'] },
  ],
  '2 · Buying & bargaining': [
    { al: 'sa', en: ['how much', 'how many'] },
    { al: 'sa kushton', en: ['how much does it cost', 'what does it cost'], phrase: 'sa kushton' },
    { al: 'kushton', en: ['cost', 'costs'] },
    { al: 'lek/lekë', en: ['lek'] },
    { al: 'para', en: ['money'] },
    { al: 'shtrenjtë', en: ['expensive'] },
    { al: 'lirë', en: ['cheap'] },
    { al: 'dua', en: ['want'] },
    { al: 'blej', en: ['buy'] },
    { al: 'shes', en: ['sell'] },
    { al: 'pak', en: ['a little', 'few'] },
    { al: 'shumë', en: ['much', 'many', 'a lot'] },
    { al: 'dyqan', en: ['shop', 'store'] },
    { al: 'treg', en: ['market'] },
    { al: 'kusur', en: ['change'] },
  ],
  '3 · Reading signs': [
    { al: 'hyrje', en: ['entrance', 'entry'] },
    { al: 'dalje', en: ['exit'] },
    { al: 'hapur', en: ['open'] },
    { al: 'mbyllur', en: ['closed', 'shut'] },
    { al: 'tualet/banjë', en: ['toilet', 'bathroom', 'restroom'], skip: 'modern facility — no folk frame' },
    { al: 'burra', en: ['men'] },
    { al: 'gra', en: ['women'] },
    { al: 'rrezik', en: ['danger'] },
    { al: 'ndalohet', en: ['forbidden', 'prohibited', 'no entry'] },
    { al: 'shtyj', en: ['push'] },
    { al: 'tërheq', en: ['pull'] },
  ],
  '4 · Getting to places / directions': [
    { al: 'ku', en: ['where'] },
    { al: 'ku është', en: ['where is'], phrase: 'ku është' },
    { al: 'majtas', en: ['left'] },
    { al: 'djathtas', en: ['right'] },
    { al: 'drejt', en: ['straight'] },
    { al: 'afër', en: ['near', 'close'] },
    { al: 'larg', en: ['far'] },
    { al: 'këtu', en: ['here'] },
    { al: 'atje', en: ['there'] },
    { al: 'biletë', en: ['ticket', 'fare'] },
    { al: 'stacion', en: ['station'], skip: 'modern transport — no folk frame' },
    { al: 'autobus', en: ['bus'], skip: 'modern transport — no folk frame' },
    { al: 'tren', en: ['train'], skip: 'modern transport — no folk frame' },
    { al: 'makinë', en: ['car'], skip: 'modern transport — no folk frame' },
    { al: 'aeroport', en: ['airport'], skip: 'modern transport — no folk frame' },
    { al: 'rrugë', en: ['road', 'street'] },
    { al: 'hartë', en: ['map'] },
    { al: 'ndal/ndalesë', en: ['stop'] },
  ],
  '5 · Finding accommodation': [
    { al: 'hotel', en: ['hotel'] },
    { al: 'dhomë', en: ['room'] },
    { al: 'shtrat', en: ['bed'] },
    { al: 'natë', en: ['night'] },
    { al: 'çelës', en: ['key'] },
    { al: 'bujtinë', en: ['guesthouse', 'inn'] },
  ],
  '6 · Ordering food & drink': [
    { al: 'ujë', en: ['water'] },
    { al: 'bukë', en: ['bread'] },
    { al: 'ushqim', en: ['food'] },
    { al: 'ha', en: ['eat'] },
    { al: 'pi', en: ['drink'] },
    { al: 'kafe', en: ['coffee'] },
    { al: 'çaj', en: ['tea'] },
    { al: 'verë', en: ['wine'] },
    { al: 'birrë', en: ['beer'] },
    { al: 'qumësht', en: ['milk'] },
    { al: 'mish', en: ['meat'] },
    { al: 'peshk', en: ['fish'] },
    { al: 'frutë/fruta', en: ['fruit'] },
    { al: 'perime', en: ['vegetable'] },
    { al: 'kripë', en: ['salt'] },
    { al: 'restorant', en: ['restaurant'] },
    { al: 'fatura', en: ['bill', 'check', 'receipt'] },
  ],
  '7 · Talking about yourself & others': [
    { al: 'unë', en: ['i ', ' me '] },
    { al: 'ti/ju', en: ['you'] },
    { al: 'emër', en: ['name'] },
    { al: 'quhem', en: ['am called', 'my name is'] },
    { al: 'jam', en: ['i am', 'be'] },
    { al: 'nga', en: ['from'] },
    { al: 'shtet/vend', en: ['country'] },
    { al: 'flas', en: ['speak', 'talk'] },
    { al: 'kuptoj', en: ['understand'] },
    { al: 'familje', en: ['family'] },
    { al: 'vjeç', en: ['years old'] },
  ],
  '8 · Controlling & learning language': [
    { al: 'nuk kuptoj', en: ['dont understand', 'do not understand'], phrase: 'nuk kuptoj' },
    { al: 'flisni ngadalë', en: ['slowly', 'speak slowly'], phrase: 'fol ngadalë' },
    { al: 'përsërit', en: ['repeat', 'again'] },
    { al: 'si thuhet', en: ['how do you say'], phrase: 'si thuhet' },
    { al: 'a flisni anglisht', en: ['do you speak', 'english'], skip: 'no English in a folktale world' },
    { al: 'nuk e di', en: ['dont know', 'do not know'], phrase: 'nuk di' },
    { al: 'çfarë do të thotë', en: ['what does it mean', 'meaning'], phrase: 'çfarë do të thotë' },
  ],
  '9 · Numbers': [
    { al: 'zero', en: ['zero'] }, { al: 'një', en: ['one'] }, { al: 'dy', en: ['two'] },
    { al: 'tre', en: ['three'] }, { al: 'katër', en: ['four'] }, { al: 'pesë', en: ['five'] },
    { al: 'gjashtë', en: ['six'] }, { al: 'shtatë', en: ['seven'] }, { al: 'tetë', en: ['eight'] },
    { al: 'nëntë', en: ['nine'] }, { al: 'dhjetë', en: ['ten'] }, { al: 'njëzet', en: ['twenty'] },
    { al: 'njëqind', en: ['hundred'] }, { al: 'mijë', en: ['thousand'] },
  ],
  '10 · Time': [
    { al: 'sot', en: ['today'] }, { al: 'nesër', en: ['tomorrow'] }, { al: 'dje', en: ['yesterday'] },
    { al: 'tani', en: ['now'] }, { al: 'ditë', en: ['day'] }, { al: 'javë', en: ['week'] },
    { al: 'muaj', en: ['month'] }, { al: 'vit', en: ['year'] }, { al: 'orë', en: ['hour', 'clock', 'time'] },
    { al: 'mëngjes', en: ['morning'] }, { al: 'mbrëmje', en: ['evening'] },
  ],
  '11 · Question words': [
    { al: 'kush', en: ['who'] }, { al: 'çfarë', en: ['what'] }, { al: 'kur', en: ['when'] },
    { al: 'pse', en: ['why'] }, { al: 'si', en: ['how'] }, { al: 'cili', en: ['which'] },
  ],
  '12 · Core verbs': [
    { al: 'kam', en: ['have'] }, { al: 'shkoj', en: ['go'] }, { al: 'vij', en: ['come'] },
    { al: 'mund', en: ['can', 'be able'] }, { al: 'di', en: ['know'] }, { al: 'them', en: ['say', 'tell'] },
    { al: 'bëj', en: ['do', 'make'] }, { al: 'shoh', en: ['see', 'look'] }, { al: 'marr', en: ['take'] },
    { al: 'jap', en: ['give'] },
  ],
  '13 · Basic adjectives': [
    { al: 'madh', en: ['big', 'large'] }, { al: 'vogël', en: ['small', 'little'] },
    { al: 'mirë', en: ['good'] }, { al: 'keq', en: ['bad'] }, { al: 'nxehtë', en: ['hot'] },
    { al: 'ftohtë', en: ['cold'] }, { al: 'ri', en: ['new', 'young'] }, { al: 'vjetër', en: ['old'] },
  ],
  '14 · People': [
    { al: 'burrë', en: ['man', 'husband'] }, { al: 'grua', en: ['woman', 'wife'] },
    { al: 'fëmijë', en: ['child'] }, { al: 'mik', en: ['friend'] }, { al: 'njeri', en: ['person', 'human'] },
  ],
  '15 · Emergencies / health': [
    { al: 'ndihmë', en: ['help'] }, { al: 'mjek/doktor', en: ['doctor'] },
    { al: 'spital', en: ['hospital'], skip: 'modern institution — the shërues heals here' },
    { al: 'polici', en: ['police', 'guard'] },
    { al: 'farmaci', en: ['pharmacy', 'chemist'], skip: 'modern institution — the shërues heals here' },
    { al: 'sëmurë', en: ['sick', 'ill'] },
    { al: 'dhimbje', en: ['pain', 'ache', 'hurt'] },
    { al: 'ambulancë', en: ['ambulance'], skip: 'modern institution — no folk frame' },
  ],
}

// --- report ---
// Denominator is the IN-WORLD survival set: items tagged `skip` are deliberate
// exclusions (modern tech with no folktale frame — a decision, not a gap) and are
// counted separately so they never read as failures.
const onlyMissing = process.argv.includes('--missing')
let total = 0, covered = 0
const gapsByCat = {}
const skipped = []
for (const [cat, items] of Object.entries(SURVIVAL)) {
  const lines = []
  let cCovered = 0, cTotal = 0
  const gaps = []
  for (const it of items) {
    if (it.skip) { skipped.push(it); continue }
    total++; cTotal++
    const hit = find(it)
    if (hit) { covered++; cCovered++; lines.push(`  ✓ ${it.al.padEnd(22)} ${hit.by === 'al' ? '' : '→ ' + hit.hit}`) }
    else { gaps.push(it); lines.push(`  ✗ ${it.al.padEnd(22)} MISSING  (${it.en.join(', ')})`) }
  }
  if (gaps.length) gapsByCat[cat] = gaps
  const pct = cTotal ? Math.round((cCovered / cTotal) * 100) : 100
  console.log(`\n${cat}  —  ${cCovered}/${cTotal} (${pct}%)`)
  for (const ln of lines) if (!onlyMissing || ln.startsWith('  ✗')) console.log(ln)
}
console.log(`\n=== INTENTIONALLY SKIPPED (out-of-world, by decision) ===`)
for (const it of skipped) console.log(`  – ${it.al.padEnd(22)} ${it.skip}`)
console.log(`\n${'='.repeat(50)}`)
console.log(`SURVIVAL CORE (in-world): ${covered}/${total} covered (${Math.round((covered / total) * 100)}%)`)
console.log(`${total - covered} real gaps · ${skipped.length} skipped by decision`)
