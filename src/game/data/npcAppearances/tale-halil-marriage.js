import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-halil-marriage', ...config })

export const TANUSHA_APPEARANCE = portrait({
  npcId: 'tanusha', nodeId: 'mujo3',
  details: ['hair', 'carried-object', 'hands', 'material', 'face'],
  practicalWordIds: ['flok', 'gjate', 'unaze', 'argjend', 'dore', 'fytyre'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R("Tanusha has long hair and holds a silver ring bearing Halil's face in her hand.", w('tanusha'), w('ka'), w('flok'), w('te_link'), w('gjate'), w('dhe'), w('mban'), w('ne'), w('dore'), w('nje'), w('unaze'), w('prej'), w('argjend'), w('me'), w('fytyre', 'fytyrën'), w('e_link'), w('halil', 'Halilit'), p('.')) }],
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
  details: ['clothing', 'carried-object', 'face', 'condition', 'location'],
  practicalWordIds: ['mbreteresha', 'shami', 'zi', 'qiri', 'dere', 'mbyllur'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('The queen waits at the locked door in a black headscarf, raising her candle toward Halili as he sings.', w('mbreteresha', 'Mbretëresha'), w('rri'), w('tek', 'te'), w('dere', 'dera'), w('e_art'), w('mbyllur'), w('me'), w('nje'), w('shami'), w('te_link'), w('zi', 'zezë', 'black'), p(','), w('dhe'), w('ngre'), w('qiri', 'qirin'), w('drejt'), w('halil', 'Halilit'), w('qe'), w('kendo', 'këndon'), p('.')) }],
})

export const FRONTIER_ORA_APPEARANCE = portrait({
  npcId: 'oraDanubes', nodeId: 'mujo2',
  details: ['clothing', 'movement', 'location', 'hands'],
  practicalWordIds: ['ora', 'shami', 'bardhe', 'ere', 'rruge', 'lume'],
  placement: { kind: 'insert-after', lineIndex: 3 },
  portraitLines: [{ line: R('At the river, a frontier Ora points out the road while the wind moves her white headscarf.', w('tek', 'Te', 'at'), w('lume', 'lumi', 'the river'), p(','), w('nje'), w('ora'), w('tregoj', 'tregon'), w('rruge', 'rrugën'), p(','), w('ndersa'), w('ere', 'era'), w('leviz'), w('shami', 'shaminë'), w('e_link'), w('saj'), w('te_link'), w('bardhe'), p('.')) }],
})

export const JOVANI_APPEARANCE = portrait({
  npcId: 'jovani', nodeId: 'mujo4',
  details: ['build', 'carried-object', 'posture', 'voice'],
  practicalWordIds: ['burre', 'gjate', 'pishtar', 'dore', 'vajze', 'qaj', 'pyet'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('A tall man with a torch stops beside the weeping girl and asks, “What is wrong?”', w('nje'), w('burre'), w('i_art'), w('gjate'), w('me'), w('nje'), w('pishtar'), w('ne'), w('dore'), w('rri'), w('prane'), w('vajze', 'vajzës'), w('qe'), w('qaj', 'qan'), w('dhe'), w('pyet'), p(':'), w('cfare'), w('ka'), p('?')) }],
})

export const KOTOR_COUNTRYWOMAN_APPEARANCE = portrait({
  npcId: 'gruaJaKrahines', nodeId: 'mujo4',
  details: ['carried-object', 'clothing', 'condition', 'posture'],
  practicalWordIds: ['grua', 'rroba', 'lagur', 'celes', 'madh', 'shiko', 'rruge'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('A woman in wet clothes holds a large key and looks toward the road.', w('nje'), w('grua'), w('me'), w('rroba'), w('te_link'), w('lagur', 'lagura'), w('mban'), w('nje'), w('celes'), w('te_link'), w('madh'), w('dhe'), w('shiko', 'shikon'), w('drejt'), w('rruge', 'rrugës'), p('.')) }],
})

export default Object.freeze({
  tanusha: TANUSHA_APPEARANCE,
  krajliKotor: KOTOR_KRAJL_APPEARANCE,
  mbreteresha: KOTOR_QUEEN_APPEARANCE,
  oraDanubes: FRONTIER_ORA_APPEARANCE,
  jovani: JOVANI_APPEARANCE,
  gruaJaKrahines: KOTOR_COUNTRYWOMAN_APPEARANCE,
})
