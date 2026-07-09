// Deep coherence audit — the standards established in design review, made runnable.
// Run AFTER `node scripts/storystats.mjs` (which covers graph integrity: dead links,
// unreachable, dead-ends, missing DICT/DEFS, confuser coverage, >=1 ungated option,
// reveal-gate validity). This script covers the QUALITATIVE-but-scriptable standards.
//   Run: node scripts/audit.mjs
// Ends by running scripts/mapaudit.mjs (the map ↔ story accuracy rule).
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { STORY, DICT, DEFS } from '../src/game/content.js'

const gl = (t) => (t || []).filter((x) => x && x.id).map((x) => x.en).join(' ')
const textIds = (n) => {
  const s = new Set()
  for (const e of n.text || []) { const l = Array.isArray(e) ? e : e.line; for (const t of l || []) if (t && t.id) s.add(t.id) }
  return s
}
const realOpts = (n) => (n.options || []).filter((o) => !o.confuser)

// Words that DON'T name a present scene-thing (function words, directions/qualities, action verbs).
const WL = new Set(
  'ti je jam eshte ne tek nje te_link te_subj te_obj e_art i_art dhe por nuk une per me pa ose qe ku pse si kush do jo tani perseri shume pak mire keq tjeter mund mos mbi'.split(' ')
    .concat('lart larg poshte jashte brenda ketu shpejt ngadale naten dite agim muzg deri vetem vogel madh forte ri vjeter bardhe zi gjelber qete sigurt thate erret ftohte uritur bukur krenar shenjte thelle nente dy tre shtate'.split(' '))
    .concat('ec shko ngjit zbrit kthehu ik fle prit dil hyr bie vazhdon degjo ndihmo merr jep lufto vrit shpeto sheh shiko beso thirr hidh prek kalo kerko ndiz premto fal fol mban godit mbyll sulmo tund kendo vesh vajto mashtro lind ha pi bej fluturo zgjohu rri behet vjen flet thote gjen luan ruan verbo humbet vdes pre mbaroi hap meso ngre zgjedh sjell marto mallko le fsheh nxjerr varros shes blej shtyj terheq'.split(' '))
)
// Things legitimately absent from the scene: carried ITEMS, COMPANIONS, DESTINATIONS, riddle answers, created.
// (Extend as new items/places are added.)
const ALLOW = new Set('buke kripe gur fuqi bekim shqiponje ujk ora zjarr fshat udhekryq mal lume jutbina maja pyll det breshka gjarper toke bese dem flok vatra qilim bari oda kulle rruge shtepi pus lubia kemishe valle pallat kopsht vella kufi shpelle pishtar treg qytet lek lahute'.split(' '))

const ITEMS = new Set('buke kripe gur qumesht bekim dem mish shpate flok pishtar'.split(' '))
const ECLARG_KEEPERS = new Set(['thesarLeave', 'shtepia', 'nastradinFund']) // leaving IS the beat
// Endings whose item-action is gated UPSTREAM (not on the immediate edge), verified by hand:
//   besaFire <- besaBekim ("sleep here"), and besaBekim is reachable ONLY via the bread-gated "jep buke".
const STATE_OK = new Set(['besaFire', 'breshkaMire', 'periFund', 'periKeq'])  // breshkaMire: the bread is BAKED in breshka1, not a carried item

const checks = []
const add = (name, fails) => checks.push({ name, fails })

// 1. OPTION-GROUNDING — the thing an option acts on must be in the node text.
add('option-grounding (act-on-thing present)', Object.entries(STORY).flatMap(([id, n]) => {
  if (n.end) return []
  const tids = textIds(n)
  return realOpts(n).flatMap((o) => {
    const miss = (o.text || []).filter((t) => t && t.id && !WL.has(t.id) && !ALLOW.has(t.id) && !tids.has(t.id)).map((t) => t.id)
    return miss.length ? [`[${id}] "${gl(o.text)}" -> ${o.to}  MISSING:${miss.join(',')}`] : []
  })
}))

// 2. ACTION-FEASIBILITY — "light a fire" needs cold/night/a threat in the scene.
add('action-feasibility (light-a-fire motivated)', Object.entries(STORY).flatMap(([id, n]) => {
  const tids = textIds(n)
  return realOpts(n).flatMap((o) => {
    const ids = (o.text || []).filter((t) => t.id).map((t) => t.id)
    const motivated = tids.has('ftohte') || tids.has('naten') || tids.has('lugat') || tids.has('shtrige') || tids.has('erresire')
    return ids[0] === 'ndiz' && !motivated ? [`[${id}] light-a-fire with no cold/night/threat`] : []
  })
}))

// 2b. NATURAL NEXT ACTION — "help/save someone" must follow a shown need/threat/activity,
//     not jump to a conclusion. If the being is just present in a calm/static state, the
//     natural first action is to APPROACH/TALK (fol me X / degjo X) and learn — then act.
const NEED = new Set(
  'rrezik vdes plage lot uritur ftohte keq ha gjak lufto vrit do merr mban forte bej kerko premto vajto kendo flet thote sulmo'.split(' ')
    .concat('kulshedra ujk gjarper baloz lubia shtrige lugat kukudh katallan arushe'.split(' '))
)
add('natural next action (help/save follows a shown need)', Object.entries(STORY).flatMap(([id, n]) => {
  if (n.end) return []
  const hasNeed = [...textIds(n)].some((w) => NEED.has(w))
  return realOpts(n).flatMap((o) => {
    const v = (o.text || []).filter((t) => t.id).map((t) => t.id)[0]
    return (v === 'ndihmo' || v === 'shpeto') && !hasNeed ? [`[${id}] "${gl(o.text)}" -> ${o.to}  (no need shown — talk/approach first?)`] : []
  })
}))

// 3. PLACELESS TRANSITIONS — no "ec larg" except the keepers (where leaving IS the beat).
add('placeless "ec larg" (only keepers allowed)', Object.entries(STORY).flatMap(([id, n]) =>
  realOpts(n).flatMap((o) => {
    const t = (o.text || []).map((x) => x && x.id)
    return t.length === 2 && t[0] === 'ec' && t[1] === 'larg' && !ECLARG_KEEPERS.has(o.to) ? [`[${id}] ec-larg -> ${o.to}`] : []
  })
))

// 4. PERCEPTION/POV — unconditional "you have X" must be EARNED (paid off in this node).
const EARNED = new Set(['shokuUjk', 'gjarperVrare', 'zanaDije', 'zana1', 'mujiFund']) // payoff nodes where "you have X" is the result (zana1: the Zana REVEALS your innate dragua traits — caul, wings, golden heart)
add('POV (no unearned "you have X")', Object.entries(STORY).flatMap(([id, n]) =>
  (n.text || []).flatMap((e) => {
    if (!Array.isArray(e)) return []
    const ids = e.filter((t) => t.id).map((t) => t.id)
    return ids[0] === 'ti' && ids[1] === 'ke' && !EARNED.has(id) ? [`[${id}] ${gl(e)}`] : []
  })
))

// 5. PERCEPTION/POV — distant lines (larg/lart/poshte) must not carry an unperceivable quality adjective.
const QUAL = new Set('thate uritur keq mire forte erret ftohte sigurt'.split(' '))
add('POV (no distant-quality leaks)', Object.entries(STORY).flatMap(([id, n]) =>
  (n.text || []).flatMap((e) => {
    if (!Array.isArray(e)) return []
    const ids = e.filter((t) => t.id).map((t) => t.id)
    const distant = ids[0] === 'larg' || ids[0] === 'poshte' || (ids[0] === 'lart' && ids.includes('larg'))
    return distant && ids.some((x) => QUAL.has(x)) ? [`[${id}] ${gl(e)}`] : []
  })
))

// 6. MEANINGFUL CHOICE — no node where every forward (non-return) option leads to a bad ending.
const isBad = (to) => STORY[to] && STORY[to].end === 'bad'
add('meaningful choice (no damned-if-you-do)', Object.entries(STORY).flatMap(([id, n]) => {
  if (n.end) return []
  const fwd = realOpts(n).filter((o) => { const t = (o.text || []).map((x) => x && x.id); return !t.includes('kthehu') && !t.includes('zbrit') })
  return fwd.length >= 2 && fwd.every((o) => isBad(o.to)) ? [`[${id}] all forward options -> bad`] : []
}))

// 7. STATE-MISMATCH — ending text that asserts an item-action must be reached ONLY via a requires-gated option.
// `requires`/`unless` may be a single id or an array; a time-of-day phase id is a
// virtual item (gates on the world clock), never a carried thing. The campfire
// states (gameState's fireStateOf) and NPC presence (npc:/npcAt:, gameState's
// npcNodeOf — validated by mapaudit's NPC-routes check) are virtual the same way.
const TIME_PHASES = new Set(['dawn', 'day', 'dusk', 'night'])
const FIRE_STATES = new Set(['fireBig', 'fireLow', 'fireOut', 'fireLive'])
const isVirtual = (i) => TIME_PHASES.has(i) || FIRE_STATES.has(i) || /^(npc|npcAt|from|became):/.test(i)
const reqIds = (o) => (o.requires == null ? [] : [].concat(o.requires))
const incomingGatedByItem = {}
for (const n of Object.values(STORY)) for (const o of n.options || []) if (o.to) {
  (incomingGatedByItem[o.to] = incomingGatedByItem[o.to] || []).push(reqIds(o).some((i) => ITEMS.has(i)))
}
add('state-match (item-asserting endings are item-gated)', Object.entries(STORY).flatMap(([id, n]) => {
  if (!n.end || STATE_OK.has(id)) return []
  const asserts = (n.text || []).some((e) => { if (!Array.isArray(e)) return false; const ids = e.filter((t) => t.id).map((t) => t.id); return ids[0] === 'ti' && ['jep', 'hidh'].includes(ids[1]) && ids.some((x) => ITEMS.has(x)) })
  const allGated = (incomingGatedByItem[id] || []).length && incomingGatedByItem[id].every(Boolean)
  return asserts && !allGated ? [`[${id}] asserts item-action but reachable without the item`] : []
}))

// 8. ENDING PROSE — every ending has a title + a substantial, unique, typo-free blurb.
add('ending prose (title + clean unique blurb)', (() => {
  const out = [], seen = {}
  for (const [id, n] of Object.entries(STORY)) {
    if (!n.end) continue
    const b = (n.blurb || '').trim()
    if (!n.title) out.push(`[${id}] missing title`)
    if (!b) { out.push(`[${id}] missing blurb`); continue }
    if (b.length < 60) out.push(`[${id}] blurb too short`)
    if (/\b(\w+)\s+\1\b/i.test(b) || /\bthe the\b|\ba a\b|  /.test(b)) out.push(`[${id}] blurb doubled-word/repeat`)
    const k = b.slice(0, 40); if (seen[k]) out.push(`[${id}] blurb ~duplicate of [${seen[k]}]`); else seen[k] = id
  }
  return out
})())

// 9. CONFUSER VALIDITY — a distractor must be IMPOSSIBLE (never the same act as a real option here).
add('confuser validity (distractors impossible)', Object.entries(STORY).flatMap(([id, n]) => {
  const real = realOpts(n).map((o) => (o.text || []).filter((t) => t.id).map((t) => t.id).join(' '))
  return (n.options || []).filter((o) => o.confuser).flatMap((o) => {
    const c = (o.text || []).filter((t) => t.id).map((t) => t.id).join(' ')
    return real.includes(c) ? [`[${id}] confuser duplicates a real option: "${gl(o.text)}"`] : []
  })
}))

// 10. ITEM REACHABILITY — every item required by an option must be grantable somewhere.
add('item reachability (required items grantable)', (() => {
  const reqd = new Set(), granted = new Set()
  for (const n of Object.values(STORY)) for (const o of n.options || []) { for (const i of reqIds(o)) if (!isVirtual(i)) reqd.add(i); if (o.grant) granted.add(o.grant) }
  return [...reqd].filter((i) => !granted.has(i)).map((i) => `required but never granted: ${i}`)
})())

// 11. SYMMETRIC TRAVEL — each district hub must offer a way back/out. KEEP THIS LIST CURRENT as districts grow.
const HUBS = ['mali1', 'lumi', 'pylliLoop', 'deti1', 'jutbina', 'fshatiJeta', 'fshatiLanes', 'udhetaret']
add('symmetric travel (hubs have a return)', HUBS.flatMap((h) => {
  const n = STORY[h]; if (!n) return [`hub missing: ${h}`]
  const outs = realOpts(n).map((o) => (o.text || []).filter((t) => t.id).map((t) => t.id))
  const back = outs.some((t) => t.includes('kthehu') || t.includes('zbrit') || (t.includes('ec') && (t.includes('fshat') || t.includes('pyll'))))
  return back ? [] : [`hub ${h} has no return/out option`]
}))

// 12. SENSE — every word must be shown in its CORRECT contextual English sense,
// and every common sense of a polysemous word must appear at least once so the
// learner (and the training quiz) actually meets it. A word's senses are declared
// one of two ways, and coverage must hold for BOTH:
//   • graded senses on one id  → DICT.enAll ("in / on / to"); occurrences pick one
//     via wf(id, al, sense).
//   • grammatical roles split into separate ids that SHARE an Albanian surface
//     (të → te_link/te_subj/te_obj, e → e_art/e_link/e_obj, i → i_art/i_link,
//     do → do/do_fut) → each sibling id is a sense of that surface.
// Two scriptable halves of the rule:
//   (a) sense validity — every contextual gloss used IS one of the declared senses
//       (also enforced at module-load by wf(); here it stays visible in the audit).
//   (b) sense coverage — every declared sense (enAll gloss OR same-surface sibling
//       id) is used somewhere in the story. Guarantees we never define a sense the
//       player never meets.
// (Choosing the RIGHT sense per scene is a human judgement; these guard the rest.)
const storyTokens = (() => {
  const out = []
  for (const n of Object.values(STORY)) {
    const lines = [
      ...(n.text || []).map((e) => (Array.isArray(e) ? e : e.line)),
      ...(n.options || []).map((o) => o.text),
    ]
    for (const l of lines) for (const t of l || []) if (t && t.id) out.push(t)
  }
  return out
})()
const sensesOf = (id) => (DICT[id].enAll ?? DICT[id].en).split('/').map((s) => s.trim())

add('sense validity (story gloss ∈ declared senses)', storyTokens.flatMap((t) =>
  DICT[t.id]?.enAll && !sensesOf(t.id).includes(t.en)
    ? [`${t.id}="${t.en}" not in enAll "${DICT[t.id].enAll}"`]
    : []
))

add('sense coverage (every declared sense used ≥1)', (() => {
  const usedGloss = {}, usedId = new Set()
  for (const t of storyTokens) { (usedGloss[t.id] ??= new Set()).add(t.en); usedId.add(t.id) }
  const fails = []
  // (a) graded senses: every enAll gloss must be rendered somewhere
  for (const [id, d] of Object.entries(DICT)) {
    if (!d.enAll) continue
    for (const s of sensesOf(id)) if (!(usedGloss[id]?.has(s))) fails.push(`${id} ('${d.al}'): sense "${s}" of "${d.enAll}" never appears in the story`)
  }
  // (b) role senses: when ≥2 sense-ids share an Albanian surface, each must appear
  const byAl = {}
  for (const [id, d] of Object.entries(DICT)) (byAl[d.al] ??= []).push(id)
  for (const ids of Object.values(byAl)) {
    if (ids.length < 2) continue
    for (const id of ids) if (!usedId.has(id)) fails.push(`${id} ('${DICT[id].al}'): a distinct sense of "${DICT[id].al}" (siblings: ${ids.join('/')}) never appears in the story`)
  }
  return fails
})())

// 12c. HOMONYM QUIZ CONTEXT — when a surface is shared by ≥2 senses, the bare word
// is ambiguous, so the trainer must quiz it IN CONTEXT: every such sense needs a
// DICT.ctx example phrase ({al, en, focus}) whose `focus` is a word of the phrase.
add('homonym senses have quiz context (ctx)', (() => {
  const byAl = {}
  for (const [id, d] of Object.entries(DICT)) (byAl[d.al] ??= []).push(id)
  const fails = []
  for (const ids of Object.values(byAl)) {
    if (ids.length < 2) continue
    for (const id of ids) {
      const c = DICT[id].ctx
      if (!c || !c.al || !c.en || !c.focus) { fails.push(`${id} ('${DICT[id].al}'): shares a surface but has no ctx {al,en,focus}`); continue }
      if (!c.al.split(' ').includes(c.focus)) fails.push(`${id}: ctx.focus "${c.focus}" is not a word in ctx.al "${c.al}"`)
    }
  }
  return fails
})())

// 13. FOLKLORE-FIGURE EXPLAINABILITY — assume the audience knows NOTHING of Albanian
// folklore: no creature/character may be referenced with no way to learn what it is.
// A being named with NO translated gloss (en ≈ its own Albanian name — e.g. "Zojz",
// "Mujo", "Jutbina") MUST carry a DEFS definition so the in-game dictionary explains it.
// Convention: creature-TYPES carry a descriptive gloss instead (she-dragon, she-hydra,
// half-vampire, miser-ghost) so the gloss itself teaches; PROPER NAMES keep the name + DEF.
const _norm = (s) => s.toLowerCase().replace(/[ëé]/g, 'e').replace(/ç/g, 'c').replace(/[^a-z]/g, '')
const _stripArt = (s) => s.replace(/^the /, '').replace(/^a /, '')
add('folklore figures explainable (opaque name ⟹ has a DEF)', Object.entries(DICT).flatMap(([id, d]) =>
  _norm(_stripArt((d.en || '').toLowerCase())) === _norm(d.al) && !DEFS[id]
    ? [`[${id}] "${d.al}" has no translated gloss AND no dictionary definition — a naive player can't learn what it is`]
    : []
))

// 14. POV — NO NARRATED OFF-SCREEN BACKSTORY. The reader IS the protagonist, a FOREIGNER
// who knows NOTHING of Albanian folklore (that's the whole game). So we can make NO
// "a local would know this legend" assumption: a legend reaches the protagonist only the
// way it reaches the player — TOLD by someone present (reported speech, a prior `X thotë:`
// line in the node) or WITNESSED firsthand. A sworn oath (premto) is a speech-act: narrating
// "X swore Y" / "a king promised her to the Sun" as bald fact leaks knowledge the character
// has no source for. (diellVajza: the maiden now SAYS it; the besa-tales — agaYmer/kostandin/
// kalaRozafa/mujo — became their teller's reported speech.) Same principle covers an ABSENT
// party's private wish — those are judged in review (too varied to script).
// WITNESSED_OK = the oath is sworn TO the protagonist, in their presence, here and now
// (you heal blind Zuku and he swears; you free the people and the zana swears) — perceived,
// not assumed. NOT a "known legend" exemption — that escape hatch is gone.
const WITNESSED_OK = new Set(['zuku2', 'dhiaFund'])
add('POV (no narrated off-screen oath)', Object.entries(STORY).flatMap(([id, n]) => {
  if (WITNESSED_OK.has(id)) return []
  const lines = (n.text || []).map((e) => (Array.isArray(e) ? e : e.line))
  let inSpeech = false; const out = []
  for (const l of lines) {
    const w = (l || []).filter((t) => t && t.id).map((t) => t.id)
    const attributes = w.includes('thote') || w.includes('thone')
    const subjYou = w[0] === 'ti' || w[0] === 'une'
    if (w.includes('premto') && !inSpeech && !attributes && !subjYou)
      out.push(`[${id}] narrates an oath outside speech: "${gl(l)}" — have the swearer SAY it (X thotë:), make it witnessed, or allowlist WITNESSED_OK`)
    if (attributes) inSpeech = true
  }
  return out
}))

// ---- report -----------------------------------------------------------------
let failed = 0
console.log('=== Aventura Shqip — deep coherence audit ===\n')
for (const c of checks) {
  if (c.fails.length) { failed++; console.log(`❌ ${c.name}  (${c.fails.length})`); for (const f of c.fails) console.log('     ' + f) }
  else console.log(`✅ ${c.name}`)
}
console.log(`\n${failed ? '❌ ' + failed + ' check(s) failed' : '✅ all ' + checks.length + ' deep checks pass'} — also run: node scripts/storystats.mjs`)

// THE MAP RULE — the world map must stay accurate to the story (and vice versa),
// with everything explorable drawn on it. Enforced by scripts/mapaudit.mjs, run
// here automatically so a story edit can never silently drift off the map.
console.log('')
const map = spawnSync(process.execPath, [join(dirname(fileURLToPath(import.meta.url)), 'mapaudit.mjs')], { stdio: 'inherit' })
process.exit(failed || map.status ? 1 : 0)
