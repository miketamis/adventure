import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-halil-marriage', ...config })

export const TANUSHA_APPEARANCE = portrait({
  npcId: 'tanusha', nodeId: 'mujo3',
  details: ['clothing', 'carried-object', 'hands'],
  practicalWordIds: ['rroba', 'kuq', 'unaze', 'dore'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('Tanusha wears red clothes and holds a ring in her hand.', w('tanusha'), w('vesh'), w('rroba'), w('te_link'), w('kuq', 'kuqe'), w('dhe'), w('mban'), w('nje'), w('unaze'), w('ne'), w('dore'), p('.')) }],
})

export const KOTOR_KRAJL_APPEARANCE = portrait({
  npcId: 'krajliKotor', nodeId: 'mujo4',
  details: ['clothing', 'carried-object', 'condition'],
  practicalWordIds: ['krajl', 'rroba', 'celes', 'hekurt'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('The Krajl, in black clothes with an iron key, leaves Halili in the darkness.', w('krajl', 'Krajli'), p(','), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza', 'black'), w('dhe'), w('nje'), w('celes'), w('te_link'), w('hekurt'), p(','), w('le'), w('halil', 'Halilin'), w('ne'), w('erresire'), p('.')) }],
})

export const KOTOR_QUEEN_APPEARANCE = portrait({
  npcId: 'mbreteresha', nodeId: 'mujo4',
  details: ['clothing', 'face', 'condition'],
  practicalWordIds: ['mbreteresha', 'shami', 'zi', 'fytyre'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('The queen wears a black headscarf; her face is tired.', w('mbreteresha', 'Mbretëresha'), w('vesh'), w('nje'), w('shami'), w('te_link'), w('zi', 'zezë', 'black'), p(';'), w('fytyre', 'fytyra'), w('eshte'), w('e_art'), w('lodhur'), p('.')) }],
})

export const FRONTIER_ORA_APPEARANCE = portrait({
  npcId: 'oraDanubes', nodeId: 'mujo2',
  details: ['clothing', 'movement', 'location'],
  practicalWordIds: ['ora', 'shami', 'bardhe', 'ere'],
  placement: { kind: 'insert-after', lineIndex: 3 },
  portraitLines: [{ line: R('At the river crossing, a frontier Ora waits in a white headscarf that moves in the wind.', w('tek', 'Te', 'at'), w('lume', 'lumi', 'the river'), p(','), w('nje'), w('ora'), w('rri'), w('me'), w('nje'), w('shami'), w('te_link'), w('bardhe'), w('qe'), w('leviz'), w('ne'), w('ere'), p('.')) }],
})

export const JOVANI_APPEARANCE = portrait({
  npcId: 'jovani', nodeId: 'mujo4',
  details: ['carried-object', 'clothing', 'posture'],
  practicalWordIds: ['burre', 'pishtar', 'sigurisht', 'ndihmo'],
  placement: { kind: 'insert-after', lineIndex: 4 },
  portraitLines: [{ line: R('A man with a torch in his hand says, “Of course, I will help you.”', w('nje'), w('burre'), w('me'), w('nje'), w('pishtar'), w('ne'), w('dore'), w('thote'), p(':'), w('sigurisht'), p(','), w('te_obj'), w('ndihmo', 'ndihmoj'), p('.')) }],
})

export const KOTOR_COUNTRYWOMAN_APPEARANCE = portrait({
  npcId: 'gruaJaKrahines', nodeId: 'mujo4',
  details: ['carried-object', 'hands', 'clothing'],
  practicalWordIds: ['grua', 'celes', 'fjale', 'rendesishem'],
  placement: { kind: 'insert-after', lineIndex: 4 },
  portraitLines: [{ line: R('A woman holds the tower key and has an important message for Mujo.', w('nje'), w('grua'), w('mban'), w('celes', 'çelësin'), w('e_link'), w('kulle', 'kullës'), w('dhe'), w('ka'), w('nje'), w('fjale'), w('te_link'), w('rendesishem', 'rëndësishme'), w('per'), w('mujo', 'Mujon'), p('.')) }],
})

export default Object.freeze({
  tanusha: TANUSHA_APPEARANCE,
  krajliKotor: KOTOR_KRAJL_APPEARANCE,
  mbreteresha: KOTOR_QUEEN_APPEARANCE,
  oraDanubes: FRONTIER_ORA_APPEARANCE,
  jovani: JOVANI_APPEARANCE,
  gruaJaKrahines: KOTOR_COUNTRYWOMAN_APPEARANCE,
})
