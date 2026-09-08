import { STORY } from './content.js'
import { optionEffectsOf } from './stateMechanics.js'
import { transitionInfo } from './worldModel.js'

// Runtime contracts for tales in which a choice commits the player to a role.
// These are deliberately separate from tale `play.scenes`: that metadata maps
// source beats, while this table owns gameplay boundaries, alternate branches
// and every ending which may legitimately close the role.
const words = (value = '') => value.trim().split(/\s+/).filter(Boolean)

// Most roles have one threshold, so `entryFrom` remains the stable primary
// entry used by old saves and callers. `entryFroms` is the complete contract:
// a tale may be entered from several coherent overworld viewpoints without
// pretending that only the first authored threshold exists.
const quest = ({ nodes, endings, entryFrom, entryFroms = '', ...spec }) => {
  const entries = [...new Set([entryFrom, ...words(entryFroms)].filter(Boolean))]
  return Object.freeze({
    ...spec,
    entryFrom: entries[0] || null,
    entryFroms: Object.freeze(entries),
    nodes: Object.freeze(words(nodes)),
    endings: Object.freeze(words(endings)),
  })
}

export const EMBODIMENT_QUESTS = Object.freeze({
  'aga-ymer': quest({
    identity: 'Aga Ymer', stance: 'embodied', entryFrom: 'agaYmer1', entryTo: 'agaYmer2', returnTo: 'plaka',
    objective: 'decide whether to keep your besa and return to captivity',
    nodes: 'agaYmer2 agaYmerFund agaYmerStay', endings: 'agaYmerFund agaYmerStay',
  }),
  'legjenda-e-prespes': quest({
    identity: "the king's son", stance: 'embodied', entryFrom: 'pylli1', entryTo: 'prespaPyll',
    objective: 'answer Nereida after hearing her warning',
    nodes: 'prespaPyll prespaLiri prespaFund', endings: 'prespaLiri prespaFund',
  }),
  binoshet: quest({
    identity: 'Zjerma', stance: 'embodied', entryFrom: 'lumi', entryTo: 'binoshetLumi',
    objective: 'save Bardhakuqja from the river kulshedra',
    nodes: 'binoshetLumi binoshetFund binoshetHije binoshetKasollja binoshetKopshtiZanave binoshetGardhiHanda binoshetGardhiZjerma binoshetZambak binoshetDasma binoshetKuvendi binoshetLuftaFillon binoshetLuftaZgjat binoshetLuftaFund binoshetKurora binoshetShpata binoshetNata binoshetZjarri binoshetTeNena binoshetDyKurorat',
    endings: 'binoshetHije binoshetDyKurorat',
  }),
  'ali-pashe-tepelena': quest({
    identity: 'Ali Pashë Tepelena', stance: 'embodied', entryFrom: 'deti1', entryTo: 'aliPashaLiqen',
    objective: "answer the Sultan's claimed pardon", nodes: 'aliPashaLiqen aliPashaVdes aliPashaRob',
    endings: 'aliPashaVdes aliPashaRob',
  }),
  'maiden-promised-sun': quest({
    identity: "the maiden's travelling companion", stance: 'companion', entryFrom: 'maja', entryTo: 'diellShtepi1',
    objective: "find the maiden in the Sun's garden and help her home",
    nodes: 'diellShtepi1 diellKopsht diellKopshtFol diellOda diellThirrKul diellKulVdes rrugaDielli1 pemaDielli pemaVdes rrugaDielli2 fshatiLanes pallatiZi pallatiKthim',
    endings: 'diellKulVdes pemaVdes pallatiKthim',
  }),
  'tomor-shpirag': quest({
    identity: 'one of the two giants', stance: 'embodied', entryFrom: 'maja', entryTo: 'tsHyrje',
    objective: 'choose which giant you are and face the other over Berat',
    nodes: 'tsHyrje tsNuse tsRoje tsZgjim tsShpeto shpirag1 tsRast tsBeteje tsFundTomor shpiragFund',
    endings: 'tsFundTomor shpiragFund',
  }),
  'argjiro-gjirokastra': quest({
    identity: 'Princess Argjiro', stance: 'embodied', entryFrom: 'maja', entryTo: 'argjiroKala',
    objective: 'answer the betrayal inside the besieged castle', nodes: 'argjiroKala argjiroFund argjiroRob',
    endings: 'argjiroFund argjiroRob',
  }),
  'mujo-strength': quest({
    identity: 'young Mujo', stance: 'embodied', entryFrom: 'jutbina', entryTo: 'mujiZana1',
    objective: 'care for the crying Zana infants until dawn',
    nodes: 'mujiZana1 mujiZana2 mujiFund mujiPasuri mujiDije', endings: 'mujiFund mujiPasuri mujiDije',
  }),
  'sokol-halili': quest({
    identity: 'Sokol Halili', stance: 'embodied', entryFrom: 'jutbina', entryTo: 'haliliDeka',
    objective: "judge Osmani's summons before riding to the mejdan", nodes: 'haliliDeka haliliMejdan haliliJeton',
    endings: 'haliliMejdan haliliJeton',
  }),
  'mujo-courser': quest({
    identity: 'Gjeto Basho Mujo', stance: 'embodied', entryFrom: 'jutbina', entryTo: 'mujoKale',
    objective: 'decide whether to reclaim your stolen courser', nodes: 'mujoKale mujoKaleFund mujoKaleLarg',
    endings: 'mujoKaleFund mujoKaleLarg',
  }),
  'zuku-bajraktar': quest({
    identity: 'Zuku Bajraktari', stance: 'embodied', entryFrom: 'odaJutbina', entryTo: 'rusha1',
    objective: "win Rusha by her freely sworn besa", nodes: 'rusha1 rushaFund rushaKeq',
    endings: 'rushaFund rushaKeq',
  }),
  'arnaut-osmani': quest({
    identity: 'Arnaut Osmani', stance: 'embodied', entryFrom: 'odaJutbina', entryTo: 'osmaniBurg',
    objective: 'answer for the twelve captives and endure the Krajl’s corpse-tests',
    nodes: 'osmaniBurg osmaniVdekur osmaniProvat osmaniVallja osmaniShpata osmaniLiri osmaniRob osmaniZbuluar',
    endings: 'osmaniLiri osmaniRob osmaniZbuluar',
  }),
  'muji-e-behuri': quest({
    identity: "Mujo's trusted road-companion", stance: 'companion', entryFrom: 'odaJutbina', entryTo: 'behuriJutbina', returnTo: 'jutbina',
    objective: 'heed the courser and Ora, enter Behuri’s tower and help Mujo survive the final mejdan',
    nodes: 'behuriJutbina behuriNdarja behuriBurimi behuriKulla behuriMejdan behuriFund behuriKotorHumbur behuriBurimHumbur behuriKullaHumbur behuriMejdanHumbur',
    endings: 'behuriFund behuriKotorHumbur behuriBurimHumbur behuriKullaHumbur behuriMejdanHumbur',
  }),
  'halil-garria': quest({
    identity: 'Halil Garria', stance: 'embodied', entryFrom: 'odaJutbina', entryTo: 'halilGarria1',
    objective: 'answer the besa that calls you from the grave', nodes: 'halilGarria1 halilGarriaFund halilGarriaKeq',
    endings: 'halilGarriaFund halilGarriaKeq',
  }),
  'ali-bajraktari': quest({
    identity: 'Ali Bajraktari', stance: 'embodied', entryFrom: 'odaJutbina', entryTo: 'aliBajr1',
    objective: 'decide whether to return when your six days end', nodes: 'aliBajr1 aliBajrFund aliBajrKeq',
    endings: 'aliBajrFund aliBajrKeq',
  }),
  'gjeto-basho-muji': quest({
    identity: 'Gjeto Basho Mujo', stance: 'embodied', entryFrom: 'odaJutbina', entryTo: 'gbMuji1',
    objective: 'answer the Zanas while you lie wounded', startingHearts: 1, nodes: 'gbMuji1 gbMujiFund gbMujiVdes',
    endings: 'gbMujiFund gbMujiVdes',
  }),
  'rozafa': quest({
    identity: 'one of the three brothers', stance: 'embodied', entryFrom: 'udhaKthimit', entryFroms: 'maja', entryTo: 'kalaMjegull', returnTo: 'udhekryq',
    objective: 'learn why the castle wall falls and decide what your besa means',
    nodes: 'kalaMjegull kalaPlak kalaNate kalaMengjes kalaNgjitje kalaLutje kalaMur kalaFundBesa kalaFundTurp',
    endings: 'kalaFundBesa kalaFundTurp',
  }),
  'sons-of-eagle': quest({
    identity: 'the hunter on the road home', stance: 'embodied', entryFrom: 'udhaKthimit', entryTo: 'shqipe1', returnTo: 'udhekryq',
    objective: 'save the eaglet from the serpent',
    nodes: 'shqipe1 shqipe2 shqipe3 shqipeBarter shqipeFund shqipeKapur', endings: 'shqipeFund shqipeKapur',
  }),
  'snake-bridegroom': quest({
    identity: "the serpent's bride", stance: 'embodied', entryFrom: 'gjarperOrigin', entryTo: 'gjarperBurr1', returnTo: 'udhekryq',
    objective: "keep your bridegroom's secret and follow the tale to its end",
    nodes: 'gjarperBurr1 gjarperBurr2 gjarperBurrVdes gjarperKerkim gjarperKulshedra gjarperKulVdes gjarperBurrFund',
    endings: 'gjarperBurrVdes gjarperKulVdes gjarperBurrFund',
  }),
  'three-friends': quest({
    identity: 'Kordha', stance: 'embodied', entryFrom: 'pylli1', entryTo: 'kordha1',
    objective: 'swear friendship with Ylli and Deti and seek the Earthly Beauty',
    nodes: 'kordha1 kordhaMoat kordhaMoatVdes kordhaUdha kordhaPallat kordhaZjarr kordhaProva kordhaProvaVdes kordha2 kordhaFund kordhaDeti',
    endings: 'kordhaMoatVdes kordhaZjarr kordhaProvaVdes kordhaFund kordhaDeti',
  }),
  'bee-spider-cicada': quest({
    identity: "one of the old woman's three daughters", stance: 'embodied', entryFrom: 'gjizar1', entryTo: 'bleta1',
    objective: "answer your mother's call", nodes: 'bleta1 bletaFund merimangaFund gjinkallaFund',
    endings: 'bletaFund merimangaFund gjinkallaFund',
  }),
  gjizar: quest({
    identity: 'the youngest prince', stance: 'embodied', entryFrom: 'gjizar2', entryTo: 'gjizarUdha', returnTo: 'gjizar1',
    objective: 'follow the road of no return in search of Gjizar',
    nodes: 'gjizarUdha gjizarPallat gjizarKap gjizarTradheti gjizarPus gjizarFund',
    endings: 'gjizarKap gjizarPus gjizarFund',
  }),
  cuckoo: quest({
    identity: "Qyqja, Gjon's sister", stance: 'embodied', entryFrom: 'gjizar2', entryTo: 'cuckoo1', returnTo: 'gjizar1',
    objective: 'face the accident that begins the transformation', nodes: 'cuckoo1 cuckooFund cuckooLule',
    endings: 'cuckooFund cuckooLule',
  }),
  swallow: quest({
    identity: 'the swallow', stance: 'embodied', entryFrom: 'gjizar2', entryTo: 'dallendyshe1', returnTo: 'gjizar1',
    objective: "stop the mosquito from naming man's blood", nodes: 'dallendyshe1 dallendysheFund dallendysheGjak',
    endings: 'dallendysheFund dallendysheGjak',
  }),
  'goose-girl': quest({
    identity: 'the maiden of the black palace', stance: 'embodied', entryFrom: 'kopshtMermer1', entryTo: 'kopshtMermer2', returnTo: 'fshatiLanes',
    objective: 'keep the vigil beside the marble king',
    nodes: 'kopshtMermer2 mermerZgjim mermerTradheti mermerSli patatGruaja mbretiDrejtesi patatHesht',
    endings: 'mermerSli mbretiDrejtesi patatHesht',
  }),
  tortoise: quest({
    identity: 'the old woman at her hearth', stance: 'embodied', entryFrom: 'fshatiJeta', entryTo: 'breshka1',
    objective: 'answer the hungry guest at your door', nodes: 'breshka1 breshkaMire breshkaFund',
    endings: 'breshkaMire breshkaFund',
  }),
  'ura-e-artes': quest({
    identity: 'Kiço', stance: 'embodied', entryFrom: 'uraVellezerit', entryTo: 'uraArtes1', returnTo: 'uraTjeter1',
    objective: 'help your brothers raise the bridge and answer its terrible price',
    nodes: 'uraArtes1 uraArtes2 uraNata uraMengjes uraGropa uraMurim uraArtesShpetim uraArtesMur',
    endings: 'uraArtesShpetim uraArtesMur',
  }),
  'maro-perhitura': quest({
    identity: 'Maro Përhitura', stance: 'embodied', entryFrom: 'maroShtepi', entryTo: 'maroNisja',
    objective: 'carry the grain to the night mill',
    nodes: 'maroNisja mulli1 maroMulli1 maroXhindet1 maroLitani1 maroLitani2 maroLitani3 maroShtremberDore maroDoraShtember maroDoraFalje maroShtrember maroNataHumbur maroShtepi maroLiloNis maroLiloKthim maroLajmi maroTetua maroHani maroIkja maroMesnata maroKrushqit maroPrincesha maroPallati maroGjilpera maroLindja maroZogu maroKopshti maroFundi maroCiuCiu',
    endings: 'maroDoraShtember maroDoraFalje maroShtrember maroNataHumbur maroPrincesha maroFundi maroCiuCiu',
  }),
})

// The Little Constantine record is a second source for the same runtime Aga
// Ymer projection, not a second body the player can switch into.
export const EMBODIMENT_ALIASES = Object.freeze({ 'kostandini-i-vogel': 'aga-ymer' })

// The world chart contains 199 authored physical places, including sealed
// underworld chambers, endings and private tale projections. “The whole open
// world” during a role means this smaller, non-committal travel network: the
// exact physical places reachable from the public crossroads without starting
// another tale, taking a local story action, changing the world or entering an
// ending. Keep this explicit list as a release contract: embodimentaudit also
// derives the network independently from the route graph and fails on drift.
export const PUBLIC_FREE_ROAM_PLACES = Object.freeze([
  'bregu', 'dasma1', 'deti1', 'detiThelle1', 'detiThelle2', 'flocka1',
  'fshatiBesa', 'fshatiDil', 'fshatiJeta', 'fshatiLanes', 'fshatiLumi',
  'fshatiSheshi', 'gjizar1', 'gjizar2', 'humbur', 'jutbina', 'katallan1',
  'kisha1', 'kopshtMermer1', 'kostandin1', 'kripore1', 'kroi1', 'kulle1',
  'lendina', 'libriDiell', 'lumi', 'lumiHumbur', 'maja', 'mali1', 'mali2',
  'mali3', 'maliHumbur', 'maroShtepi', 'mejdan1', 'mulli1',
  'nastradin1', 'odaJutbina', 'pallatiZi', 'plaka', 'pusiThate', 'pylli1',
  'pylliLoop', 'pylliThelle', 'qiell1', 'qiellErera1', 'shtojzovalle1',
  'start', 'stihi1', 'tabaket1', 'udhekryq', 'ura', 'uraArtes1', 'uraFshaj',
  'varret1', 'vatra',
])

// Exact scene nodes that form those 55 places. Three are intentional aliases:
// oda1 is the guest-room place libriDiell, uraTjeter1 is the Artë bridge place,
// and maliStuhi is the reviewed same-ledge pass-through below. Keeping nodes as
// well as places prevents a private tale scene at a public coordinate from
// inheriting free-roam authority merely because PLACE_OF aliases it there.
export const PUBLIC_FREE_ROAM_NODES = Object.freeze([
  'bregu', 'dasma1', 'deti1', 'detiThelle1', 'detiThelle2', 'flocka1',
  'fshatiBesa', 'fshatiDil', 'fshatiJeta', 'fshatiLanes', 'fshatiLumi',
  'fshatiSheshi', 'gjizar1', 'gjizar2', 'humbur', 'jutbina', 'katallan1',
  'kisha1', 'kopshtMermer1', 'kostandin1', 'kripore1', 'kroi1', 'kulle1',
  'lendina', 'lumi', 'lumiHumbur', 'maja', 'mali1', 'mali2', 'mali3',
  'maliHumbur', 'maliStuhi', 'maroShtepi', 'mejdan1', 'mulli1',
  'nastradin1', 'oda1', 'odaJutbina', 'pallatiZi', 'plaka', 'pusiThate',
  'pylli1', 'pylliLoop', 'pylliThelle', 'qiell1', 'qiellErera1',
  'shtojzovalle1', 'start', 'stihi1', 'tabaket1', 'udhekryq', 'ura',
  'uraFshaj', 'uraTjeter1', 'varret1', 'vatra',
])

// One harmless local scene is also a physical pass-through. The old man's
// warning and the storm occupy the same ledge, so routeForChoice correctly
// calls this edge local; nevertheless the next scene owns the ordinary climb
// to the summit. This exact reviewed exception opens that passage without
// turning every same-place conversation into a free-roam action.
export const PUBLIC_FREE_ROAM_TRANSITS = Object.freeze({
  'mali3->maliStuhi': Object.freeze({
    reason: 'Listening to the old man crosses no threshold and exposes the public climb from the same mountain ledge.',
    invariant: 'same place, no role entry, no ending and no inventory, health, money, fire or world-state change',
  }),
})

const PUBLIC_FREE_ROAM_NODE_SET = new Set(PUBLIC_FREE_ROAM_NODES)

export const canonicalEmbodimentId = (id) => EMBODIMENT_ALIASES[id] || id
export const embodimentQuest = (id) => EMBODIMENT_QUESTS[canonicalEmbodimentId(id)] || null
export const embodimentEntryNodes = (idOrQuest) => {
  const resolved = typeof idOrQuest === 'string' ? embodimentQuest(idOrQuest) : idOrQuest
  if (resolved?.entryFroms?.length) return resolved.entryFroms
  return resolved?.entryFrom ? [resolved.entryFrom] : []
}
export const isKnownEmbodiment = (id) => Boolean(embodimentQuest(id))
export const isEmbodimentNode = (id, nodeId) => Boolean(embodimentQuest(id)?.nodes.includes(nodeId))
export const isEmbodimentEnding = (id, nodeId) => Boolean(embodimentQuest(id)?.endings.includes(nodeId))
export const embodimentIdentity = (state) => {
  const quest = embodimentQuest(state?.embodying)
  if (!quest) return null
  if (canonicalEmbodimentId(state.embodying) === 'tomor-shpirag') {
    // New saves use a semantic tale flag; the inventory fallback migrates old
    // saves that encoded the role as a pseudo-item.
    if (state.flags?.jamShpirag || state.inventory?.jamShpirag) return 'Shpirag'
    if (state.embodimentFocusNode !== 'tsHyrje') return 'Baba Tomor'
  }
  if (canonicalEmbodimentId(state.embodying) === 'rozafa' &&
      !['kalaMjegull', 'kalaPlak', 'kalaNate'].includes(state.embodimentFocusNode)) {
    return state.flags?.besaMbajtur ? 'the youngest brother' : 'one of the elder brothers'
  }
  return quest.identity
}

const changesWorld = (option, targetNode) => Boolean(
  optionEffectsOf(option).length || option.interaction != null || targetNode?.worldEffects?.length,
)

/**
 * One safe-by-default rule used by both StoryView and the reducer.
 * Tale-owned edges are actions between registered nodes. Away from the tale,
 * only plain physical travel and harmless clock waits remain. Breadcrumbs do
 * not grant authority: a forged or stale trail must never turn a local story
 * action into travel.
 */
export function embodimentOptionAccess(state, option, targetNode = STORY[option?.to]) {
  const active = embodimentQuest(state.embodying)
  if (!active) return { ok: true, kind: 'unbound', reason: null }
  const identity = embodimentIdentity(state)
  if (!option || !targetNode) return { ok: false, kind: 'invalid', reason: 'That action has no place in this tale.' }

  // Any become threshold is a fresh commitment, even when it names the role
  // already active. A paused player must Resume rather than re-entering their
  // own projection through its overworld threshold.
  if (option.become) {
    return { ok: false, kind: 'other-role', reason: `Finish ${identity}'s tale before becoming someone else.` }
  }

  const route = transitionInfo(state.nodeId, option)
  const edge = `${state.nodeId}->${option.to}`
  const publicTravel = route.valid && route.spatial && !route.projection &&
    (route.kind === 'journey' || route.wander) && !changesWorld(option, targetNode) &&
    PUBLIC_FREE_ROAM_NODE_SET.has(option.to)
  const fromOwned = active.nodes.includes(state.nodeId)
  const toOwned = active.nodes.includes(option.to)
  // Some tale nodes share a physical public place (Maro's house is both her
  // threshold and a later scene). Paused always means free-roam rules: local
  // tale progress remains locked until the player explicitly resumes.
  if (!state.embodimentPaused && fromOwned && toOwned)
    return { ok: true, kind: 'quest', reason: null }

  if (targetNode.end) {
    return { ok: false, kind: 'other-ending', reason: `This is not an ending of ${identity}'s tale.` }
  }

  // A few public roads are also used by the active tale. They remain roads
  // while paused, but are always classified as detours so the saved quest
  // focus does not advance. Local and narrated scene-shift progress stays
  // behind Resume.
  if (state.embodimentPaused && fromOwned && toOwned &&
      PUBLIC_FREE_ROAM_NODE_SET.has(state.nodeId) && PUBLIC_FREE_ROAM_NODE_SET.has(option.to) &&
      publicTravel) {
    return { ok: true, kind: 'detour', reason: null }
  }

  if (state.embodimentPaused && fromOwned && toOwned) {
    return {
      ok: false,
      kind: 'paused-quest',
      reason: `Resume ${identity}'s tale before taking its next story action.`,
    }
  }

  if (publicTravel) return { ok: true, kind: 'detour', reason: null }

  const reviewedTransit = PUBLIC_FREE_ROAM_TRANSITS[edge]
  const safeReviewedTransit = reviewedTransit && route.valid && route.spatial &&
    route.kind === 'local' && !changesWorld(option, targetNode) &&
    PUBLIC_FREE_ROAM_NODE_SET.has(state.nodeId) && PUBLIC_FREE_ROAM_NODE_SET.has(option.to)
  if (safeReviewedTransit)
    return { ok: true, kind: 'detour', reason: null, transit: reviewedTransit.reason }

  const harmlessWait = option.to === state.nodeId && (option.time || option.date) && !changesWorld(option, targetNode)
  if (harmlessWait) return { ok: true, kind: 'wait', reason: null }

  return {
    ok: false,
    kind: 'unrelated-action',
    reason: `You are ${identity}; this unrelated action waits until the tale is finished.`,
  }
}
