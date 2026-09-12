import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-mujo-avenges-halil', ...config })

export const BUD_ALINE_TALI_APPEARANCE = portrait({
  npcId: 'budAlineTali', nodeId: 'mujoHak1',
  details: ['face', 'voice', 'posture'],
  practicalWordIds: ['aga', 'fytyre', 'erret', 'lart'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('The song tells of an aga with a dark face and a loud voice.', w('kenge', 'Kënga', 'the song'), w('flet'), w('per'), w('nje'), w('aga'), w('me'), w('fytyre'), w('te_link'), w('erret'), w('dhe'), w('ze'), w('te_link'), w('lart', 'lartë', 'high'), p('.')) }],
})

export const SICKBED_SERPENT_APPEARANCE = portrait({
  npcId: 'gjarpriShtratit', nodeId: 'mujo1',
  details: ['build', 'carried-object', 'location'],
  practicalWordIds: ['gjarper', 'shtrat', 'ilac', 'gjuhe'],
  placement: { kind: 'insert-after', lineIndex: 3 },
  portraitLines: [{ line: R('A long serpent lies on the bed, with medicine beneath its tongue.', w('nje'), w('gjarper'), w('i_art'), w('gjate'), w('rri'), w('mbi'), w('shtrat'), p(','), w('me'), w('ilac'), w('nen'), w('gjuhe'), p('.')) }],
})

export const SICKBED_WOLF_APPEARANCE = portrait({
  npcId: 'ujkuBesnik', nodeId: 'mujo1',
  details: ['face', 'posture', 'location'],
  practicalWordIds: ['ujk', 'kembe', 'shtrat', 'goje'],
  placement: { kind: 'insert-after', lineIndex: 3 },
  portraitLines: [{ line: R('The wolf waits at the foot of the bed with its mouth open.', w('ujk', 'Ujku'), w('prit', 'pret'), w('tek'), w('kembe', 'këmbët'), w('e_link'), w('shtrat', 'shtratit'), w('me'), w('goje'), w('te_link'), w('hap', 'hapur'), p('.')) }],
})

export default Object.freeze({
  budAlineTali: BUD_ALINE_TALI_APPEARANCE,
  gjarpriShtratit: SICKBED_SERPENT_APPEARANCE,
  ujkuBesnik: SICKBED_WOLF_APPEARANCE,
})
