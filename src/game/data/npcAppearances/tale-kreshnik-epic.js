import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-kreshnik-epic', ...config })

export const CAPTAIN_KRAJL_APPEARANCE = portrait({
  npcId: 'krajli', nodeId: 'kreshnikRrembimiBurg',
  details: ['clothing', 'carried-object', 'posture'],
  practicalWordIds: ['krajl', 'rroba', 'zi', 'shpate'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('The Krajl stands by the tower in black clothes, with a sword at his side.', w('krajl', 'Krajli'), w('rri'), w('prane'), w('kulle', 'kullës'), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza', 'black'), p(','), w('me'), w('nje'), w('shpate'), w('prane'), w('trup', 'trupit'), p('.')) }],
})

export const MEHREME_APPEARANCE = portrait({
  npcId: 'mehreme', nodeId: 'kreshnikRrembimiBurg',
  details: ['carried-object', 'clothing', 'hands'],
  practicalWordIds: ['grua', 'shishe', 'raki', 'dore'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('A woman in red clothes holds a bottle of raki in her hand.', w('nje'), w('grua'), w('me'), w('rroba'), w('te_link'), w('kuq', 'kuqe'), w('mban'), w('nje'), w('shishe'), w('me'), w('raki'), w('ne'), w('dore'), p('.')) }],
})

export const FIRST_KRAJL_WIFE_APPEARANCE = portrait({
  npcId: 'gruaKrajlit', nodeId: 'kreshnikRrembimiBurg',
  details: ['clothing', 'carried-object', 'work-marks'],
  practicalWordIds: ['grua', 'rroba', 'vjeter', 'kove'],
  placement: { kind: 'insert-after', lineIndex: 3 },
  portraitLines: [{ line: R('A woman in old clothes waits beside the guard with a bucket of water.', w('nje'), w('grua'), w('me'), w('rroba'), w('te_link'), w('vjeter', 'vjetra', 'old'), w('prit', 'pret'), w('prane'), w('roje', 'rojës'), w('me'), w('nje'), w('kove'), w('me'), w('uje'), p('.')) }],
})

export default Object.freeze({
  krajli: CAPTAIN_KRAJL_APPEARANCE,
  mehreme: MEHREME_APPEARANCE,
  gruaKrajlit: FIRST_KRAJL_WIFE_APPEARANCE,
})
