import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-tortoise', ...config })

export const TORTOISE_CRONE_APPEARANCE = portrait({
  npcId: 'plakaBreshka', nodeId: 'breshka1',
  details: ['clothing', 'colour', 'work-marks'],
  practicalWordIds: ['plake', 'shami', 'zi', 'dore', 'miell'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [
    { line: R('You are an old woman in a black headscarf, with flour on your hands.', w('ti'), w('je'), w('nje'), w('plake'), w('me'), w('nje'), w('shami'), w('te_link'), w('zi', 'zezë', 'black'), p(','), w('me'), w('miell'), w('ne', 'në', 'on'), w('dore', 'duar', 'hands'), p('.')) },
  ],
})

export const HUNGRY_GUEST_APPEARANCE = portrait({
  npcId: 'mikuUritur', nodeId: 'breshka1',
  details: ['clothing', 'condition', 'work-marks'],
  practicalWordIds: ['mik', 'rroba', 'vjeter', 'pluhur', 'kepuce'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [
    { line: R('A hungry guest comes to the door in old clothes, with dust on his shoes.', w('nje'), w('mik'), w('i_art'), w('uritur'), w('vjen'), w('ne', 'te', 'at'), w('dere', 'dera', 'the door'), w('me'), w('rroba'), w('te_link'), w('vjeter', 'vjetra', 'old'), p(','), w('me'), w('pluhur'), w('ne', 'në', 'on'), w('kepuce'), p('.')) },
  ],
})

export default Object.freeze({
  plakaBreshka: TORTOISE_CRONE_APPEARANCE,
  mikuUritur: HUNGRY_GUEST_APPEARANCE,
})
