import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-maiden-promised-sun', ...config })

export const PROMISED_MAIDEN_APPEARANCE = portrait({
  npcId: 'vajzaDiellit', nodeId: 'diellKopsht',
  details: ['carried-object', 'face', 'condition'],
  practicalWordIds: ['vajze', 'laker', 'sy', 'lagur'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('The maiden takes a cabbage; her eyes are wet.', w('vajze', 'Vajza'), w('merr'), w('nje'), w('laker'), p(';'), w('sy', 'sytë'), w('je', 'janë'), w('te_link'), w('lagur'), p('.')) }],
})

export const BLACK_PALACE_QUEEN_APPEARANCE = portrait({
  npcId: 'mbretereshaZeze', nodeId: 'pallatiZi',
  details: ['clothing', 'location', 'face', 'condition'],
  practicalWordIds: ['mbreteresha', 'rroba', 'zi', 'dritare', 'fytyre', 'lodhur'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('Inside, a queen in black clothes sits beside the window; her face is tired.', w('brenda'), p(','), w('nje'), w('mbreteresha'), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza', 'black'), w('rri'), w('prane'), w('dritare', 'dritares'), p(';'), w('fytyre', 'fytyra'), w('e_link'), w('saj'), w('eshte'), w('e_art'), w('lodhur'), p('.')) }],
})

export const SUN_HOUSE_KULSHEDRA_APPEARANCE = portrait({
  npcId: 'kulshedraDiellit', nodeId: 'diellShtepi1',
  details: ['build', 'colour', 'face'],
  practicalWordIds: ['kulshedra', 'madh', 'zi', 'goje'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [{ line: R('The great black Kulshedra waits at the threshold; she has a large mouth.', w('kulshedra', 'Kulshedra'), w('e_art'), w('madh', 'madhe'), w('dhe'), w('e_art'), w('zi', 'zezë', 'black'), w('rri'), w('tek'), w('prag', 'pragu'), p(';'), w('ajo'), w('ka'), w('nje'), w('goje'), w('te_link'), w('madh', 'madhe'), p('.')) }],
})

export const SUN_ROAD_STAG_APPEARANCE = portrait({
  npcId: 'dreriDiellit', nodeId: 'rrugaDielli1',
  details: ['build', 'face', 'voice'],
  practicalWordIds: ['dre', 'madh', 'sy', 'qete'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('The great stag has calm eyes and says, “I eat grass and drink water.”', w('dre', 'Dreri'), w('i_art'), w('madh'), w('ka'), w('sy'), w('te_link'), w('qete'), w('dhe'), w('thote'), p(':'), w('une'), w('ha'), w('bar'), w('dhe'), w('pi'), w('uje'), p('.')) }],
})

export default Object.freeze({
  vajzaDiellit: PROMISED_MAIDEN_APPEARANCE,
  mbretereshaZeze: BLACK_PALACE_QUEEN_APPEARANCE,
  kulshedraDiellit: SUN_HOUSE_KULSHEDRA_APPEARANCE,
  dreriDiellit: SUN_ROAD_STAG_APPEARANCE,
})
