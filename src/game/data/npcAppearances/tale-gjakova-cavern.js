import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'
const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-gjakova-cavern', ...config })

export const CAVERN_ORAS_APPEARANCE = portrait({
  npcId: 'oraShpelle', nodeId: 'thesar2', details: ['form', 'colour', 'movement'],
  practicalWordIds: ['gjarper', 'madh', 'zi', 'ar'], placement: { kind: 'replace', lineIndex: 3 },
  portraitLines: [{ line: R('A great black serpent coils around the gold; it is an Ora guarding the dead market.', w('nje'), w('gjarper'), w('i_art'), w('madh'), w('dhe'), w('i_art'), w('zi'), w('rri'), w('rreth'), w('ar', 'arit'), p(';'), w('eshte'), w('nje'), w('ora'), w('qe'), w('ruan'), w('treg'), w('e_art'), w('vdes', 'vdekur', 'dead'), p('.')) }],
})

export default Object.freeze({ oraShpelle: CAVERN_ORAS_APPEARANCE })
