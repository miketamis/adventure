import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'
const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-constantine-doruntine', ...config })

export const KOSTANDIN_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaKostandinit', nodeId: 'kostandin1', details: ['age', 'clothing', 'hands', 'condition', 'location'],
  practicalWordIds: ['nene', 'vjeter', 'shami', 'zi', 'lot', 'varr', 'dore'], placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('Beside Kostandin’s grave, the old mother holds her black headscarf in one hand; tears cover her face.', w('prane'), w('varr', 'varrit'), w('e_link'), w('kostandin', 'Kostandinit'), p(','), w('nene', 'nëna'), w('e_art'), w('vjeter'), w('mban'), w('shami', 'shaminë'), w('e_art'), w('zi', 'zezë'), w('ne'), w('nje'), w('dore'), p(';'), w('ka'), w('lot'), w('ne'), w('fytyre'), p('.')) }],
})

export const DORUNTINA_APPEARANCE = portrait({
  npcId: 'doruntina', nodeId: 'kostandin3', details: ['clothing', 'colour', 'carried-object', 'location'],
  practicalWordIds: ['bije', 'rroba', 'kuq', 'unaze', 'larg', 'mal'], placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('Far beyond seven mountains, the daughter dances in red clothes with a silver ring on her hand.', w('larg'), p(','), w('pas'), w('shtate'), w('mal', 'maleve'), p(','), w('bije', 'bija'), w('eshte'), w('ne'), w('valle'), w('me'), w('rroba'), w('te_link'), w('kuq', 'kuqe'), w('dhe'), w('nje'), w('unaze'), w('prej'), w('argjend'), w('ne'), w('dore'), p('.')) }],
})

export default Object.freeze({ nenaKostandinit: KOSTANDIN_MOTHER_APPEARANCE, doruntina: DORUNTINA_APPEARANCE })
