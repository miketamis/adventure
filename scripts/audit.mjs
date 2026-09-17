// Deep coherence audit — the standards established in design review, made runnable.
// Run AFTER `node scripts/storystats.mjs` (which covers graph integrity: dead links,
// unreachable, dead-ends, missing DICT/DEFS, confuser coverage, >=1 ungated option,
// reveal-gate validity). This script covers the QUALITATIVE-but-scriptable standards.
//   Run: node scripts/audit.mjs
// Ends by running scripts/mapaudit.mjs (the map ↔ story accuracy rule).
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { childProcessFailed } from './lib/child-process-result.mjs'
import {
  auditExceptionClaimKey,
  auditExceptionFor,
  auditExceptionRegistryIssues,
  auditExceptionUsageIssues,
  defineAuditExceptionRegistry,
} from './lib/audit-exceptions.mjs'
import {
  STORY,
  STORY_OBSERVATION_BEATS,
  DICT,
  DEFS,
  ITEMS as ITEM_CATALOG,
} from '../src/game/content.js'
import { RICH_ENDING_BY_ID } from '../src/game/endingCatalog.js'
import { declaredStoryGlosses } from '../src/game/dictionary.js'
import { ACHIEVEMENTS } from '../src/game/achievements.js'
import { CORPUS, ENDING_LORE, FOLKLORE, HISTORY } from '../src/game/folklore.js'
import { optionEffectsOf } from '../src/game/stateMechanics.js'
import { QUESTS, QUEST_STATUSES } from '../src/game/quests.js'
import { observationConditionId } from '../src/game/observations.js'
import { WORD_CLASS, wordClassOf } from '../src/game/wordClassPolicy.js'
import { wordContextAlignment } from '../src/game/wordProgression.js'

const gl = (t) => (t || []).filter((x) => x && x.id).map((x) => x.en).join(' ')
const textIds = (n) => {
  const s = new Set()
  for (const e of n.text || []) { const l = Array.isArray(e) ? e : e.line; for (const t of l || []) if (t && t.id) s.add(t.id) }
  return s
}
const realOpts = (n) => (n.options || []).filter((o) => !o.confuser)
const observationBeatById = new Map(STORY_OBSERVATION_BEATS.map((beat) => [beat.id, beat]))
const isCanonicalObservationAction = (nodeId, option) => {
  const id = option?.contextObservation?.id
  const beat = observationBeatById.get(id)
  return Boolean(beat && beat.nodeId === nodeId &&
    option.observation?.id === id && option.observation?.beat === beat.beat &&
    option.contextObservation?.beat === beat.beat &&
    optionEffectsOf(option).some((effect) => effect?.type === 'observe' && effect.id === id))
}
const isThingSense = (id) => wordClassOf(id, DICT[id], {
  hasAttestedVariant: Boolean(DICT[id]?.forms?.length),
}) === WORD_CLASS.NOUN

// Words that DON'T name a present scene-thing (function words, directions/qualities, action verbs).
const WL = new Set(
  'ti ju je jam eshte ne tek nga nje te_link te_subj te_obj me_obj e_link e_art i_art dhe edhe por nuk une ne_we per me pa ose qe ku pse si sa kush a_q do do_fut jo po_yes po_prog po_turn tani perseri shume pak mire keq rregull gje tjeter mund dot mos mbi faleminderit lutem mirupafshim gezuar'.split(' ')
    .concat('lart larg poshte jashte brenda ketu shpejt ngadale bashke naten dite agim mengjes muzg sonte deri vetem vogel madh forte ri vjeter bardhe zi gjelber qete gati sigurt thate erret ftohte uritur bukur krenar shenjte thelle nente dy tre shtate nevoje'.split(' '))
    .concat('ec shko ngjit zbrit kthehu ik fle prit dil hyr bie vazhdo vazhdon degjo ndihmo merr jep lufto vrit shpeto sheh shiko beso thirr hidh prek kalo kerko ndiz premto fal fol pyet perserit kuptoj kushton hajde mban godit mbyll sulmo tund kendo vesh vajto mashtro lind ha pi bej fluturo zgjohu rri leviz behet vjen flet thote gjen luan ruan verbo humbet vdes pre mbaroi hap mbush laj meso ngre zgjedh sjell marto mallko le fsheh nxjerr varros shes blej shtyj terheq dorezohem quhem nisem gezohem'.split(' '))
)
// Currency affordability is enforced by the resource transaction itself, not
// by a redundant `requires: 'lek'` item gate. Keep the state-mismatch check on
// carried physical things and companions only.
const ITEMS = new Set(Object.values(ITEM_CATALOG)
  .filter((item) => !item.currency && item.kind !== 'currency')
  .map((item) => item.id))

const EXCEPTION_RULES = Object.freeze({
  OPTION_GROUNDING: 'option-grounding',
  PLACELESS_TRANSITION: 'placeless-transition',
  ENDING_ITEM_GATE: 'ending-item-gate',
  EARNED_POSSESSION: 'earned-possession',
  WITNESSED_OATH: 'witnessed-oath',
})

const DEEP_AUDIT_EXCEPTIONS = defineAuditExceptionRegistry({
  rules: {
    [EXCEPTION_RULES.OPTION_GROUNDING]: { targetKind: 'option-token-occurrence' },
    [EXCEPTION_RULES.PLACELESS_TRANSITION]: { targetKind: 'option-edge' },
    [EXCEPTION_RULES.ENDING_ITEM_GATE]: { targetKind: 'ending-node' },
    [EXCEPTION_RULES.EARNED_POSSESSION]: { targetKind: 'story-line' },
    [EXCEPTION_RULES.WITNESSED_OATH]: { targetKind: 'story-line' },
  },
  entries: [
    {
      id: 'canonical-holdings-name-their-action-object',
      rule: EXCEPTION_RULES.OPTION_GROUNDING,
      targets: [
        'kulshedra1.options[3]->kulshLufte1:bekim',
        'sofraMikut.options[0]->sofraMikut2:buke',
        'pylliThelle.options[0]->shokuUjk:buke',
        'humbur.options[0]->oraBardhe:buke',
        'pylliHumbur.options[0]->oraPyllBuke:buke',
        'shtrigaLufta.options[0]->oraPyllBuke:buke',
        'gjumi.options[0]->gjumiUjkShok:buke',
        'varret1.options[6]->varretFund:cakmak',
        'kulshedra1.options[2]->kulshLufte1:fuqi',
        'kulshedra1.options[1]->dranguasi:gur',
        'humbur.options[1]->oraBardhe:kripe',
        'pylliHumbur.options[1]->oraPyllKripe:kripe',
        'shtrigaLufta.options[1]->oraPyllKripe:kripe',
        'udhaThate.options[3]->ujkuUje:ujk',
      ],
      rationale: 'Each exact action names a carried resource, earned capability or companion supplied by canonical state, so the noun need not be repeated in the current scene prose.',
      evidence: 'The listed options carry exact inventory, quest, fact or companion gates in content.js and are checked by state and inventory audits.',
      owner: 'narrative-state',
      reviewTrigger: 'when any listed option, prerequisite, inventory effect or companion lifecycle changes',
      scope: { kind: 'exact-targets', maximumTargets: 14 },
    },
    {
      id: 'movement-actions-name-their-destination',
      rule: EXCEPTION_RULES.OPTION_GROUNDING,
      targets: [
        'bisedaUra2.options[0]->bisedaUra3:fshat',
        'agaYmer1.options[1]->fshatiSheshi:fshat',
        'syriKeq1.options[1]->fshatiJeta:fshat',
        'kripore1.options[2]->deti1:fshat',
        'pusiThate.options[3]->fshatiSheshi:fshat',
        'nenaDiell1.options[1]->fshatiSheshi:fshat',
        'pallatiZi.options[2]->fshatiLanes:fshat',
        'kopshtMermer1.options[1]->fshatiLanes:fshat',
        'gjysmegjel1.options[1]->fshatiJeta:fshat',
        'vajtim1.options[2]->jutbina:jutbina',
        'mujoHak1.options[2]->jutbina:jutbina',
        'mejdan1.options[2]->jutbina:jutbina',
        'behuriMejdanKeshilla.options[1]->behuriFund:jutbina',
        'mujiZana1.options[1]->jutbina:jutbina',
        'rusha1.options[2]->jutbina:jutbina',
        'zuku1.options[1]->jutbina:jutbina',
        'mujo2.options[1]->jutbina:jutbina',
        'mujo3.options[1]->jutbina:jutbina',
        'mujo4.options[1]->jutbina:jutbina',
        'behuriKulla.options[5]->behuriBurimi:krua',
        'eliraEmriBreg.options[3]->fshatiLumi:lume',
        'binoshetKasollja.options[1]->binoshetFund:lume',
        'flocka1.options[1]->lumi:lume',
        'fshehur.options[4]->lumi:lume',
        'kroi1.options[3]->fshatiLumi:lume',
        'tabaket1.options[2]->fshatiLumi:lume',
        'jutbina.options[10]->maja:maja',
        'diellShtepi1.options[1]->maja:maja',
        'peri1.options[2]->mali1:mal',
        'stihi1.options[2]->pylliLoop:pyll',
        'dhelpra1.options[1]->pylliLoop:pyll',
        'dhelpra2.options[2]->pylliLoop:pyll',
        'kordhaUdha.options[1]->pylli1:pyll',
        'besaBekim.options[1]->pylliLoop:pyll',
        'djepi1.options[1]->fshatiLanes:rruge',
        'djepi2.options[1]->fshatiLanes:rruge',
        'djepi3.options[3]->fshatiLanes:rruge',
        'besaBekim.options[1]->pylliLoop:rruge',
        'eliraPorosiaDorezuar.options[1]->fshatiSheshi:shesh',
        'sofraMikut.options[1]->fshatiSheshi:shesh',
        'sofraVendimPlaka.options[2]->fshatiSheshi:shesh',
        'sofraVendimPusi.options[2]->fshatiSheshi:shesh',
        'sheshiMjek.options[1]->sheshi:shesh',
        'blerjaBuke.options[1]->sheshi:shesh',
        'blerjaKripe.options[1]->sheshi:shesh',
        'blerjaLahuta.options[1]->sheshi:shesh',
        'gjumiBujtina.options[1]->sheshi:shesh',
        'sherimiBar.options[1]->sheshi:shesh',
        'rrugaOdes.options[2]->fshatiSheshi:shesh',
        'qyteti.options[1]->shpellaRruget:shpelle',
        'sofraVendimPusi.options[1]->plaka:shtepi',
        'sherimiBar.options[0]->sheruesi:shtepi',
        'diellKopsht.options[1]->diellShtepi1:shtepi',
        'diellOda.options[1]->diellShtepi1:shtepi',
        'rrugaDielli1.options[1]->diellShtepi1:shtepi',
        'qiell2.options[2]->qiellPrende:toke',
        'porosiaBlerje.options[1]->pusiThate:treg',
        'porosiaBlerjePergjigje.options[0]->pusiThate:treg',
        'porosiaBlerjePergjigje.options[1]->pazariFshatit:treg',
        'udha.options[1]->lendina:zjarr',
        'udheLugat.options[1]->udheOra:zjarr',
        'udhaThate.options[4]->lendina:zjarr',
      ],
      rationale: 'These exact movement choices name their source, destination or established return landmark rather than an acted-on object at the current place; route audits separately verify the physical edge and continuity.',
      evidence: 'Every target is an exact live STORY edge also covered by map, world, action-presupposition and player-causality release gates.',
      owner: 'world-navigation',
      reviewTrigger: 'when a listed source scene, destination, option phrase or route-continuity contract changes',
      scope: { kind: 'exact-targets', maximumTargets: 62 },
    },
    {
      id: 'player-supplied-speech-content',
      rule: EXCEPTION_RULES.OPTION_GROUNDING,
      targets: [
        'riddle1.options[0]->riddleFund:breshka',
        'riddle1.options[2]->riddleGabim:gjarper',
        'porosiaBlerje.options[0]->porosiaBlerjePergjigje:mik',
        'sheshi.options[2]->sheshiMjek:mjek',
      ],
      rationale: 'These exact nouns are player-supplied answers or utterance content, not claims that the named person or riddle candidate is physically present before the player speaks.',
      evidence: 'The listed options are speech-intent choices in content.js and their destinations render the matching answer or conversational consequence.',
      owner: 'conversation',
      reviewTrigger: 'when any listed option stops being an explicit player utterance or gains a different speech consequence',
      scope: { kind: 'exact-targets', maximumTargets: 4 },
    },
    {
      id: 'departure-is-the-ending-beat',
      rule: EXCEPTION_RULES.PLACELESS_TRANSITION,
      targets: [
        'thesarOra.options[1]->thesarLeave',
        'nastradin2.options[0]->nastradinFund',
      ],
      rationale: 'In these two exact edges, walking away is itself the authored ending beat, so the choice truthfully ends the encounter without naming a later destination.',
      evidence: 'content.js pins “ti ecën larg” at thesarLeave and the Nasreddin departure directly resolves the cauldron exchange at nastradinFund.',
      owner: 'narrative',
      reviewTrigger: 'when either ending gains a destination, intermediate travel scene or different outgoing action',
      scope: { kind: 'exact-targets', maximumTargets: 2 },
    },
    {
      id: 'tale-local-bread-is-not-inventory-gated',
      rule: EXCEPTION_RULES.ENDING_ITEM_GATE,
      targets: ['periFund', 'periKeq'],
      rationale: 'The Peri scene visibly supplies its own bread before the choice, so giving or throwing that local prop does not require a carried-inventory prerequisite on either exact ending edge.',
      evidence: 'content.js peri1 lines establish “këtu është bukë” immediately before the choices to periFund and periKeq.',
      owner: 'narrative-state',
      reviewTrigger: 'when peri1 bread presentation, either bread action or inventory ownership semantics changes',
      scope: { kind: 'exact-targets', maximumTargets: 2 },
    },
    {
      id: 'possession-is-the-immediate-earned-result',
      rule: EXCEPTION_RULES.EARNED_POSSESSION,
      targets: [
        'shokuUjk.text[2]',
        'gjarperVrare.text[1]',
        'zanaDije.text[0]',
        'zana1.text[7]',
        'zana1.text[8]',
        'mujiFund.text[1]',
      ],
      rationale: 'Each exact “you have” line is the immediate visible payoff of the incoming feeding, victory, revelation or gift, rather than unearned background knowledge or a standing ledger.',
      evidence: 'The predecessor choices and the listed consequence lines in content.js establish friend, treasure, knowledge, dragua traits and strength at the moment they are gained.',
      owner: 'narrative-causality',
      reviewTrigger: 'when any listed line, incoming earning action, arrival condition or reward effect changes',
      scope: { kind: 'exact-targets', maximumTargets: 6 },
    },
    {
      id: 'oath-is-witnessed-in-the-current-consequence',
      rule: EXCEPTION_RULES.WITNESSED_OATH,
      targets: ['zuku2.text[2]', 'dhiaFund.text[1]'],
      rationale: 'These exact oaths are sworn in front of the protagonist as the immediate consequence of healing the hero or freeing the people, so they are witnessed rather than off-screen lore.',
      evidence: 'content.js zuku2 and dhiaFund place the protagonist in the action and narrate each oath inside that same visible consequence.',
      owner: 'knowledge-provenance',
      reviewTrigger: 'when either oath moves scenes, loses its triggering action or changes speaker/presence semantics',
      scope: { kind: 'exact-targets', maximumTargets: 2 },
    },
  ],
})

const usedExceptionClaims = new Set()
const reviewedExceptionApplies = (rule, target) => {
  if (!auditExceptionFor(DEEP_AUDIT_EXCEPTIONS, rule, target)) return false
  usedExceptionClaims.add(auditExceptionClaimKey(rule, target))
  return true
}

const checks = []
const add = (name, fails) => checks.push({ name, fails })

// 1. OPTION-GROUNDING — the thing an option acts on must be in the node text.
add('option-grounding (act-on-thing present)', Object.entries(STORY).flatMap(([id, n]) => {
  if (n.end) return []
  const grounded = textIds(n)
  return (n.options || []).flatMap((o, optionIndex) => {
    if (o.confuser) return []
    // Observation actions and conversation topics carry their own reviewed
    // affordance metadata. A question may naturally introduce an abstract topic
    // (work, family, news) which need not already be a visible physical object;
    // conversationhubaudit verifies that it stays local and receives a response.
    // For ordinary options, test only noun-like things; particles, directions
    // and manner words are not acted-on objects.
    if (isCanonicalObservationAction(id, o)) return []
    if (o.conversationHub?.kind === 'question') return []
    const miss = [...new Set((o.text || [])
      .filter((t) => t?.id && isThingSense(t.id) &&
        !WL.has(t.id) && !grounded.has(t.id) &&
        !reviewedExceptionApplies(
          EXCEPTION_RULES.OPTION_GROUNDING,
          `${id}.options[${optionIndex}]->${o.to}:${t.id}`,
        ))
      .map((t) => t.id))]
    return miss.length ? [`[${id}] "${gl(o.text)}" -> ${o.to}  MISSING:${miss.join(',')}`] : []
  })
}))

// 2. ACTION-FEASIBILITY — "light a fire" needs cold/night/a threat in the scene.
add('action-feasibility (light-a-fire motivated)', Object.entries(STORY).flatMap(([id, n]) => {
  const tids = textIds(n)
  return realOpts(n).flatMap((o) => {
    const ids = (o.text || []).filter((t) => t.id).map((t) => t.id)
    const motivated = tids.has('ftohte') || tids.has('naten') || tids.has('lugat') || tids.has('shtrige') || tids.has('erresire')
    return ids[0] === 'ndiz' && ids.includes('zjarr') && !motivated ? [`[${id}] light-a-fire with no cold/night/threat`] : []
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
  (n.options || []).flatMap((o, optionIndex) => {
    if (o.confuser) return []
    const t = (o.text || []).map((x) => x && x.id)
    const target = `${id}.options[${optionIndex}]->${o.to}`
    return t.length === 2 && t[0] === 'ec' && t[1] === 'larg' &&
      !reviewedExceptionApplies(EXCEPTION_RULES.PLACELESS_TRANSITION, target)
      ? [`[${id}] ec-larg -> ${o.to}`]
      : []
  })
))

// 4. PERCEPTION/POV — unconditional "you have X" must be EARNED (paid off in this node).
add('POV (no unearned "you have X")', Object.entries(STORY).flatMap(([id, n]) =>
  (n.text || []).flatMap((e, lineIndex) => {
    if (!Array.isArray(e)) return []
    const ids = e.filter((t) => t.id).map((t) => t.id)
    return ids[0] === 'ti' && ids[1] === 'ke' &&
      !reviewedExceptionApplies(EXCEPTION_RULES.EARNED_POSSESSION, `${id}.text[${lineIndex}]`)
      ? [`[${id}] ${gl(e)}`]
      : []
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
// virtual item (gates on the world clock), never a carried thing. Timed fixture
// states, durable facts/knowledge, typed flags, item capabilities and NPC
// presence and transaction-aware arrival narration are virtual the same way.
const TIME_PHASES = new Set(['dawn', 'day', 'dusk', 'night'])
const observationConditions = new Set(STORY_OBSERVATION_BEATS.map((beat) => observationConditionId(beat.id)))
const isRegisteredQuestCondition = (condition) => {
  if (typeof condition !== 'string' || !condition.startsWith('quest:')) return false
  const body = condition.slice('quest:'.length)
  const separator = body.lastIndexOf(':')
  if (separator <= 0) return false
  const questId = body.slice(0, separator)
  const status = body.slice(separator + 1)
  return Boolean(QUESTS[questId] && QUEST_STATUSES.includes(status))
}
const isRegisteredObservationCondition = (condition) => observationConditions.has(condition)
const isVirtual = (i) => i === 'embodying' || i === 'again' || i === 'rumor' || TIME_PHASES.has(i) ||
  isRegisteredQuestCondition(i) || isRegisteredObservationCondition(i) ||
  /^(arrival|fixture|npc|npcAt|rendezvous|from|became|embodying|visited|heard|greeting|season|weather|festival|weekday|fact|flag|knows|itemTag|affords):/.test(i)
const reqIds = (o) => (o.requires == null ? [] : [].concat(o.requires))
const incomingGatedByItem = {}
for (const n of Object.values(STORY)) for (const o of n.options || []) if (o.to) {
  (incomingGatedByItem[o.to] = incomingGatedByItem[o.to] || []).push(reqIds(o).some((i) => ITEMS.has(i)))
}
add('state-match (item-asserting endings are item-gated)', Object.entries(STORY).flatMap(([id, n]) => {
  if (!n.end) return []
  const asserts = (n.text || []).some((e) => { if (!Array.isArray(e)) return false; const ids = e.filter((t) => t.id).map((t) => t.id); return ids[0] === 'ti' && ['jep', 'hidh'].includes(ids[1]) && ids.some((x) => ITEMS.has(x)) })
  const allGated = (incomingGatedByItem[id] || []).length && incomingGatedByItem[id].every(Boolean)
  return asserts && !allGated && !reviewedExceptionApplies(EXCEPTION_RULES.ENDING_ITEM_GATE, id)
    ? [`[${id}] asserts item-action but reachable without the item`]
    : []
}))

// 8. ENDING PROSE — every ending has a title + a substantial, unique, typo-free blurb.
add('ending prose (title + clean unique blurb)', (() => {
  const out = [], seen = {}
  for (const [id, n] of Object.entries(STORY)) {
    if (!n.end) continue
    const ending = RICH_ENDING_BY_ID[id]
    const b = (ending?.blurb || '').trim()
    if (!ending?.title) out.push(`[${id}] missing title`)
    if (!b) { out.push(`[${id}] missing blurb`); continue }
    if (b.length < 60) out.push(`[${id}] blurb too short`)
    if (/\b(\w+)\s+\1\b/i.test(b) || /\bthe the\b|\ba a\b|  /.test(b)) out.push(`[${id}] blurb doubled-word/repeat`)
    const k = b.slice(0, 40); if (seen[k]) out.push(`[${id}] blurb ~duplicate of [${seen[k]}]`); else seen[k] = id
  }
  return out
})())

// 8b. Every achievement promises a lore card after its comprehension gate.
// Some cards live in the historical chronicle rather than the folklore list;
// a dangling id otherwise makes the source panel disappear without warning.
add('achievement lore links resolve', (() => {
  const loreIds = new Set([...FOLKLORE, ...HISTORY].map((entry) => entry.id))
  return ACHIEVEMENTS
    .filter((achievement) => !achievement.lore || !loreIds.has(achievement.lore))
    .map((achievement) => `[${achievement.id}] lore '${achievement.lore || '(missing)'}' is not in folklore or history`)
})())

// 8c. Bad fates do not become achievements, but their ending panels and debug
// source views still promise the same provenance as good and secret outcomes.
// Audit STORY directly so a new ending can never bypass that contract merely
// because it is intentionally absent from ACHIEVEMENTS.
add('every ending has valid lore provenance', (() => {
  const loreIds = new Set([...FOLKLORE, ...HISTORY].map((entry) => entry.id))
  return Object.values(STORY)
    .filter((node) => node.end && (!ENDING_LORE[node.id] || !loreIds.has(ENDING_LORE[node.id])))
    .map((node) => `[${node.id}] ending lore '${ENDING_LORE[node.id] || '(missing)'}' is not in folklore or history`)
})())

// 8d. The in-game library is a connected bibliography. Broken related/covers
// ids render as missing badges, while duplicate ids make navigation ambiguous.
add('lore library references resolve uniquely', (() => {
  const out = []
  const folkloreIds = new Set(FOLKLORE.map((entry) => entry.id))
  const historyIds = new Set(HISTORY.map((entry) => entry.id))
  const allLoreIds = new Set([...folkloreIds, ...historyIds])
  const seen = new Map()
  for (const [kind, entries] of [['folklore', FOLKLORE], ['history', HISTORY], ['source', CORPUS]]) {
    for (const entry of entries) {
      if (seen.has(entry.id)) out.push(`[${entry.id}] duplicate id in ${seen.get(entry.id)} and ${kind}`)
      else seen.set(entry.id, kind)
    }
  }
  for (const entry of [...FOLKLORE, ...HISTORY]) {
    for (const related of entry.related || []) if (!allLoreIds.has(related)) out.push(`[${entry.id}] related '${related}' is missing`)
  }
  for (const source of CORPUS) {
    for (const id of source.covers || []) if (!folkloreIds.has(id)) out.push(`[${source.id}] covers missing folklore '${id}'`)
    for (const id of source.coversHist || []) if (!historyIds.has(id)) out.push(`[${source.id}] covers missing history '${id}'`)
  }
  for (const [ending, id] of Object.entries(ENDING_LORE)) if (!allLoreIds.has(id)) out.push(`[${ending}] ending lore '${id}' is missing`)
  return out
})())

// 9. CONFUSER VALIDITY — a distractor must be IMPOSSIBLE (never the same act as a real option here).
add('confuser validity (distractors impossible)', Object.entries(STORY).flatMap(([id, n]) => {
  const timeConditionRequiredBy = (option) => [].concat(option.requires || [])
    .find((condition) => ['dawn', 'day', 'dusk', 'night'].includes(condition) || condition?.startsWith?.('greeting:'))
  const mutuallyExclusiveByTime = (left, right) => {
    const leftTime = timeConditionRequiredBy(left)
    const rightTime = timeConditionRequiredBy(right)
    return leftTime && rightTime && leftTime !== rightTime
  }
  const real = realOpts(n)
  return (n.options || []).filter((o) => o.confuser).flatMap((o) => {
    const c = (o.text || []).filter((t) => t.id).map((t) => t.id).join(' ')
    const liveDuplicate = real.some((candidate) => {
      const phrase = (candidate.text || []).filter((t) => t.id).map((t) => t.id).join(' ')
      return phrase === c && !mutuallyExclusiveByTime(o, candidate)
    })
    return liveDuplicate ? [`[${id}] confuser duplicates a simultaneously real option: "${gl(o.text)}"`] : []
  })
}))

// 10. ITEM REACHABILITY — every item required by an option must be grantable somewhere.
add('item reachability (required items grantable)', (() => {
  const reqd = new Set(), granted = new Set()
  for (const n of Object.values(STORY)) for (const o of n.options || []) {
    for (const i of reqIds(o)) if (!isVirtual(i)) reqd.add(i)
    for (const effect of optionEffectsOf(o))
      if (effect?.type === 'inventory' && effect.delta > 0) granted.add(effect.id)
  }
  return [...reqd].filter((i) => !granted.has(i)).map((i) => `required but never granted: ${i}`)
})())

add('canonical quest/observation virtual-state registries', (() => {
  const out = []
  for (const quest of Object.values(QUESTS)) {
    for (const status of QUEST_STATUSES) {
      const condition = `quest:${quest.id}:${status}`
      if (!isVirtual(condition)) out.push(`canonical quest condition rejected: ${condition}`)
    }
  }
  for (const beat of STORY_OBSERVATION_BEATS) {
    const condition = observationConditionId(beat.id)
    if (!isVirtual(condition)) out.push(`canonical observation condition rejected: ${condition}`)
  }
  for (const condition of [
    'quest:not-registered:active',
    `quest:${Object.keys(QUESTS)[0]}:not-a-status`,
    'observed:not-registered',
  ]) {
    if (isVirtual(condition)) out.push(`unknown virtual condition accepted: ${condition}`)
  }
  return out
})())

// 10c. CONDITION VALIDITY — every when()/unless() cond on a STORY LINE (and every
// option `unless:`) must RESOLVE to something real: a virtual gate (time/fire/npc/
// from/became/embodying/visited/heard/again/rumor) OR an item that some option GRANTS.
// A bare token that is neither falls through hasCond() to an inventory lookup that is
// always 0, so the gate silently always-fires (unless) or never-fires (when) — the
// `unless('dite')` class of bug, where the day-phase id should have been 'day'.
// (Option `requires:` is covered by check #10; this adds the text-line + `unless:` side.)
add('condition validity (when/unless conds resolve)', (() => {
  const granted = new Set()
  for (const n of Object.values(STORY)) for (const o of n.options || []) {
    for (const effect of optionEffectsOf(o))
      if (effect?.type === 'inventory' && effect.delta > 0) granted.add(effect.id)
  }
  const ok = (i) => isVirtual(i) || granted.has(i)
  const out = []
  for (const [id, n] of Object.entries(STORY)) {
    for (const e of n.text || []) {           // when/unless/until/from/became all land in .cond
      if (Array.isArray(e) || !e) continue
      for (const c of (e.cond == null ? [] : [].concat(e.cond)))
        if (!ok(c)) out.push(`[${id}] story-line cond '${c}' — not a virtual gate nor a granted item (dead gate)`)
      // whenUnless() stores its required-absent side separately; it is just as
      // capable of becoming a silent always-true typo as an ordinary unless().
      for (const c of (e.none == null ? [] : [].concat(e.none)))
        if (!ok(c)) out.push(`[${id}] story-line none '${c}' — not a virtual gate nor a granted item (dead gate)`)
    }
    for (const o of n.options || [])           // option unless: (requires: is check #10)
      for (const c of (o.unless == null ? [] : [].concat(o.unless))) if (!ok(c)) out.push(`[${id}] option unless:'${c}' — not a virtual gate nor a granted item (dead gate)`)
  }
  return out
})())

// 10b. HEARSAY TARGETS — every place a scene TELLS of (node.tells) must be a real
//      node, and worth planting: it should carry a rumor-payoff or be a drawn place.
add('hearsay targets (node.tells names real nodes)', Object.entries(STORY).flatMap(([id, n]) =>
  (n.tells || []).filter((t) => !STORY[t]).map((t) => `[${id}] tells of missing node '${t}'`)))

// 11. SYMMETRIC TRAVEL — each district hub must offer a way back/out. KEEP THIS LIST CURRENT as districts grow.
const HUBS = ['mali1', 'lumi', 'pylliLoop', 'deti1', 'jutbina', 'fshatiJeta', 'fshatiLanes', 'udhetaret']
add('symmetric travel (hubs have a return)', HUBS.flatMap((h) => {
  const n = STORY[h]; if (!n) return [`hub missing: ${h}`]
  const outs = realOpts(n).map((o) => (o.text || []).filter((t) => t.id).map((t) => t.id))
  // out-verbs: kthehu/zbrit, dil (step out), le (lër X — the truthful departure from a moment)
  const back = outs.some((t) => t.includes('kthehu') || t.includes('zbrit') || t.includes('dil') || t.includes('le') || (t.includes('ec') && (t.includes('fshat') || t.includes('pyll'))))
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
const sensesOf = (id) => declaredStoryGlosses(DICT[id])

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
      const alignment = wordContextAlignment(c)
      if (!alignment.usable) fails.push(`${id}: ctx.focus "${c.focus}" is not uniquely aligned in ctx.al "${c.al}" (${alignment.reason})`)
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
add('POV (no narrated off-screen oath)', Object.entries(STORY).flatMap(([id, n]) => {
  let inSpeech = false; const out = []
  for (const [lineIndex, entry] of (n.text || []).entries()) {
    const l = Array.isArray(entry) ? entry : entry.line
    const w = (l || []).filter((t) => t && t.id).map((t) => t.id)
    const attributes = w.includes('thote') || w.includes('thone')
    const subjYou = w[0] === 'ti' || w[0] === 'une'
    if (w.includes('premto') && !inSpeech && !attributes && !subjYou &&
        !reviewedExceptionApplies(EXCEPTION_RULES.WITNESSED_OATH, `${id}.text[${lineIndex}]`)) {
      out.push(`[${id}] narrates an oath outside speech: "${gl(l)}" — have the swearer say it, make it visibly witnessed, or register the exact witnessed line`)
    }
    if (attributes) inSpeech = true
  }
  return out
}))

const validOptionTokenTargets = new Set()
const validOptionEdgeTargets = new Set()
const validStoryLineTargets = new Set()
const validEndingTargets = new Set()
for (const [nodeId, node] of Object.entries(STORY)) {
  if (node.end) validEndingTargets.add(nodeId)
  for (const [lineIndex] of (node.text || []).entries()) {
    validStoryLineTargets.add(`${nodeId}.text[${lineIndex}]`)
  }
  for (const [optionIndex, option] of (node.options || []).entries()) {
    if (option.confuser) continue
    validOptionEdgeTargets.add(`${nodeId}.options[${optionIndex}]->${option.to}`)
    for (const token of option.text || []) {
      if (token?.id) validOptionTokenTargets.add(`${nodeId}.options[${optionIndex}]->${option.to}:${token.id}`)
    }
  }
}

add('structured deep-audit exceptions are exact, bounded and live', [
  ...auditExceptionRegistryIssues(DEEP_AUDIT_EXCEPTIONS, {
    validTargetsByRule: {
      [EXCEPTION_RULES.OPTION_GROUNDING]: validOptionTokenTargets,
      [EXCEPTION_RULES.PLACELESS_TRANSITION]: validOptionEdgeTargets,
      [EXCEPTION_RULES.ENDING_ITEM_GATE]: validEndingTargets,
      [EXCEPTION_RULES.EARNED_POSSESSION]: validStoryLineTargets,
      [EXCEPTION_RULES.WITNESSED_OATH]: validStoryLineTargets,
    },
  }),
  ...auditExceptionUsageIssues(DEEP_AUDIT_EXCEPTIONS, usedExceptionClaims),
])

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
process.exit(failed || childProcessFailed(map) ? 1 : 0)
