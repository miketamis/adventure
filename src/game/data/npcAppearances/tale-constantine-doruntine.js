import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'
const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-constantine-doruntine', ...config })

export const KOSTANDIN_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaKostandinit', nodeId: 'kostandin1', details: ['age', 'clothing', 'condition'],
  practicalWordIds: ['nene', 'vjeter', 'shami', 'lot'], placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('An old mother in a black headscarf sits alone, with tears on her face.', w('nje'), w('nene'), w('e_art'), w('vjeter'), w('me'), w('nje'), w('shami'), w('te_link'), w('zi', 'zezë'), w('rri'), w('vetem'), p(','), w('me'), w('lot'), w('ne'), w('fytyre'), p('.')) }],
})

export const DORUNTINA_APPEARANCE = portrait({
  npcId: 'doruntina', nodeId: 'kostandin3', details: ['clothing', 'colour', 'carried-object'],
  practicalWordIds: ['bije', 'rroba', 'kuq', 'unaze'], placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('The daughter is at the dance in red clothes, with a silver ring on her hand.', w('bije', 'Bija'), w('eshte'), w('ne'), w('valle'), w('me'), w('rroba'), w('te_link'), w('kuq', 'kuqe'), p(','), w('me'), w('nje'), w('unaze'), w('prej'), w('argjend'), w('ne'), w('dore'), p('.')) }],
})

export default Object.freeze({ nenaKostandinit: KOSTANDIN_MOTHER_APPEARANCE, doruntina: DORUNTINA_APPEARANCE })
