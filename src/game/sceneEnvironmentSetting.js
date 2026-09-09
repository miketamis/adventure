import { NODE_REGION } from './regions.js'

// Whether the current beat is exposed to the sky is story staging, not map
// geometry.  Keep it separate from worldModel.isEnclosedScene(): that helper
// answers whether a place has a map horizon and deliberately treats ordinary
// houses, prisons and caves like their surrounding region.
//
// Grouping the explicit exceptions by the kind of shelter makes omissions
// reviewable.  A new interior should be added here (and to the audit) instead
// of being guessed from a node id or from words in its prose.
export const ENCLOSED_NARRATION_SCENES = Object.freeze({
  houses: Object.freeze([
    'plaka',
    'sofraMikut2',
    'vatra',
    'vatraGjarpri',
    'uraNata',
    'maroTetua',
    'kopshtMermer2',
    'mermerZgjim',
    'mermerTradheti',
    'patatGruaja',
    'mbretiDrejtesi',
    'patatHesht',
    'mermerSli',
    'diellShtepi1',
    'diellThirrKul',
    'djepi1',
    'djepi2',
    'djepi3',
  ]),
  guestRooms: Object.freeze([
    'oda1',
    'odaPlak',
    'udhetaret',
    'kengaLahute',
    'udhetaretBisede',
    'udhetaretBisede2',
    'tregMal',
    'tregDet',
    'tregMujo',
    'lahuta1',
    'lahutaFund',
    'skender1',
    'skender2',
    'burrnesha1',
    'burrneshaFund',
    'skenderFund',
    'skenderKeq',
    'tregDragua',
    'oda2',
    'odaJutbina',
    'haliliDeka',
    'haliliJeton',
    'behuriJutbina',
    'diellOda',
    'libriDiell',
  ]),
  innsAndCafes: Object.freeze([
    'bujtina',
    'gjumiBujtina',
    'kafeja1',
    'kafejaFund',
    'fallFund',
    'gezuarFund',
    'kafeneja',
    'kafeneja2',
    'maroHani',
    'maroMesnata',
  ]),
  prisons: Object.freeze([
    'agaYmer1',
    'agaYmer2',
    'agaYmerStay',
    'agaYmerFund',
    'aliBajr1',
    'aliBajrFund',
    'aliBajrKeq',
    'osmaniBurg',
    'osmaniVdekur',
    'osmaniProvat',
    'osmaniVallja',
    'osmaniShpata',
    'osmaniZbuluar',
    'osmaniRob',
    'kreshnikRrembimiBurg',
  ]),
  towersAndPalaces: Object.freeze([
    'behuriKulla',
    'behuriKullaHumbur',
    'kulle1',
    'kulle2',
    'kulleFal',
    'kulleGjak',
    'maroPallati',
    'maroGjilpera',
    'maroLindja',
  ]),
  cavesAndMills: Object.freeze([
    'stihi1',
    'stihiDjeg',
    'stihiFund',
    'fshehur',
    'shpellaHyrje',
    'shpellaRruget',
    'thesar2',
    'thesarKthyer',
    'gjarperVrare',
    'gjarperNgrene',
    'katallan1',
    'katallanFund',
    'katallanVdes',
    'punaMulli',
    'xhindMulli',
    'xhindMulliFund',
    'xhindMulliKeq',
    'maroMulli1',
    'maroXhindet1',
    'maroLitani1',
    'maroLitani2',
    'maroLitani3',
    'maroShtremberDore',
    'maroDoraFalje',
    'maroDoraShtember',
    'maroShtrember',
  ]),
  liminal: Object.freeze(['humbur', 'oraBardhe', 'oraZeze', 'oraVerdhe']),
})

const explicitEnclosed = new Set(Object.values(ENCLOSED_NARRATION_SCENES).flat())

export function isEnclosedNarrationScene(nodeId) {
  // Preserve the dark-world treatment while keeping this question independent
  // from map sightlines.  Surface interiors are the explicit exceptions above.
  return NODE_REGION[nodeId] === 'underworld' || explicitEnclosed.has(nodeId)
}

export function narrationSettingForScene(nodeId) {
  return isEnclosedNarrationScene(nodeId) ? 'enclosed' : 'outdoor'
}
