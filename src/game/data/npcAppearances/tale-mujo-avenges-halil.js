import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-mujo-avenges-halil', ...config })

export const BUD_ALINE_TALI_APPEARANCE = portrait({
  npcId: 'budAlineTali', nodeId: 'mujoHak1',
  details: ['voice', 'posture', 'collective-contrast'],
  practicalWordIds: ['kenge', 'aga', 'lodhur', 'shok', 'ngre', 'ze'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('In the song, among the tired agas, one looks over his companions and raises his voice.', w('ne', 'Në', 'in'), w('kenge', 'këngë', 'the song'), p(','), w('mes'), w('aga', 'agallarëve'), w('te_link'), w('lodhur'), p(','), w('nje'), w('aga'), w('sheh'), w('shok', 'shokët'), w('dhe'), w('ngre'), w('ze', 'zërin'), p('.')) }],
})

export const SICKBED_SERPENT_APPEARANCE = portrait({
  npcId: 'gjarpriShtratit', nodeId: 'mujo1',
  details: ['build', 'posture', 'carried-object'],
  practicalWordIds: ['gjarper', 'gjate', 'perkulet', 'plage', 'gjuhe', 'mban', 'ilac'],
  placement: { kind: 'insert-after', lineIndex: 3 },
  portraitLines: [{ line: R('A long serpent bends over Mujo’s wounds; beneath its tongue it carries medicine.', w('nje'), w('gjarper'), w('i_art'), w('gjate'), w('perkulet'), w('mbi'), w('plage', 'plagët'), w('e_link'), w('mujo', 'Mujit'), p(';'), w('nen'), w('gjuhe'), w('mban'), w('ilac'), p('.')) }],
})

export const SICKBED_WOLF_APPEARANCE = portrait({
  npcId: 'ujkuBesnik', nodeId: 'mujo1',
  details: ['face', 'posture', 'movement'],
  practicalWordIds: ['ujk', 'kembe', 'shtrat', 'ngre', 'goje', 'hap', 'askush', 'prane'],
  placement: { kind: 'insert-after', lineIndex: 3 },
  portraitLines: [{ line: R('At the foot of the bed, the wolf rises with its mouth open; nobody comes near.', w('tek', 'Tek', 'at'), w('kembe', 'këmbët'), w('e_link'), w('shtrat', 'shtratit'), p(','), w('ujk', 'ujku'), w('ngre', 'ngrihet'), w('me'), w('goje'), w('te_link'), w('hap', 'hapur'), p(';'), w('askush'), w('nuk'), w('vjen'), w('prane'), p('.')) }],
})

export default Object.freeze({
  budAlineTali: BUD_ALINE_TALI_APPEARANCE,
  gjarpriShtratit: SICKBED_SERPENT_APPEARANCE,
  ujkuBesnik: SICKBED_WOLF_APPEARANCE,
})
