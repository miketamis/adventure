import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'
const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-cuckoo', ...config })

export const CUCKOO_SISTER_APPEARANCE = portrait({
  npcId: 'qyqjaMotra', nodeId: 'cuckoo1', details: ['age', 'clothing', 'carried-object'],
  practicalWordIds: ['motra', 'ri', 'rroba', 'gershere'], placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('You are a young sister in blue clothes, with scissors in your hand.', w('ti'), w('je'), w('nje'), w('motra'), w('e_art'), w('ri', 're'), w('me'), w('rroba'), w('te_link'), w('kalter'), p(','), w('me'), w('gershere'), w('ne'), w('dore'), p('.')) }],
})

export const NIGHT_BIRD_GJON_APPEARANCE = portrait({
  npcId: 'gjonZogu', nodeId: 'cuckooFund', details: ['build', 'colour', 'voice'],
  practicalWordIds: ['zog', 'vogel', 'zi', 'ze'], placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [{ line: R('The other Gjon is a small dark bird with a loud voice.', w('gjon', 'Gjoni'), w('tjeter'), w('eshte'), w('nje'), w('zog'), w('i_art'), w('vogel'), w('dhe'), w('i_art'), w('zi'), w('me'), w('nje'), w('ze'), w('te_link'), w('madh'), p('.')) }],
})

export default Object.freeze({ qyqjaMotra: CUCKOO_SISTER_APPEARANCE, gjonZogu: NIGHT_BIRD_GJON_APPEARANCE })
