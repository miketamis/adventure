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
  details: ['clothing', 'condition', 'location'],
  practicalWordIds: ['mik', 'uritur', 'prit', 'dere', 'shi', 'lagur', 'rroba'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [
    { line: R('A hungry guest waits at the door; the rain has soaked his clothes.', w('nje'), w('mik'), w('i_art'), w('uritur'), w('prit', 'pret'), w('ne', 'te', 'at'), w('dere', 'dera', 'the door'), p(';'), w('shi', 'shiu', 'the rain'), w('i_obj'), w('ka'), w('lagur'), w('rroba', 'rrobat'), p('.')) },
  ],
})

export default Object.freeze({
  plakaBreshka: TORTOISE_CRONE_APPEARANCE,
  mikuUritur: HUNGRY_GUEST_APPEARANCE,
})
