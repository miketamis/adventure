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
  details: ['clothing', 'location', 'face', 'condition', 'posture'],
  practicalWordIds: ['mbreteresha', 'shami', 'zi', 'dere', 'mbyllur', 'fytyre', 'lodhur'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('Inside, the queen sits beside a locked door with a black headscarf drawn across her tired face.', w('brenda'), p(','), w('mbreteresha', 'mbretëresha'), w('rri'), w('prane'), w('nje'), w('dere'), w('te_link'), w('mbyllur'), p(','), w('me'), w('nje'), w('shami'), w('te_link'), w('zi', 'zezë', 'black'), w('mbi'), w('fytyre', 'fytyrën'), w('e_link'), w('saj'), w('te_link'), w('lodhur'), p('.')) }],
})

export const SUN_HOUSE_KULSHEDRA_APPEARANCE = portrait({
  npcId: 'kulshedraDiellit', nodeId: 'diellShtepi1',
  details: ['build', 'colour', 'face', 'posture', 'location'],
  practicalWordIds: ['kulshedra', 'madh', 'zi', 'goje', 'prag', 'vajze'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [{ line: R('The great black Kulshedra stands at the threshold, her mouth open toward the girl.', w('kulshedra', 'Kulshedra'), w('e_art'), w('madh', 'madhe'), w('dhe'), w('e_art'), w('zi', 'zezë', 'black'), w('rri'), w('tek'), w('prag', 'pragu'), w('me'), w('goje', 'gojën'), w('hapur'), w('drejt'), w('vajze', 'vajzës'), p('.')) }],
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
