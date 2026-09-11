import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-mujo-strength', ...config })

export const MUJO_FATHER_APPEARANCE = portrait({
  npcId: 'babaMujit', nodeId: 'mujiZana1',
  details: ['clothing', 'hands', 'condition'],
  practicalWordIds: ['babi', 'jeto', 'thjesht', 'rroba'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('Mujo remembers his dad, who lives simply in old clothes and sent him to work.', w('mujo'), w('kujtoj', 'kujton'), w('babi', 'babin'), w('e_link'), w('tij'), p(','), w('qe'), w('jeto', 'jeton'), w('thjesht'), w('me'), w('rroba'), w('te_link'), w('vjeter', 'vjetra', 'old'), w('dhe'), w('e_obj'), w('dergon', 'dërgoi'), w('ne'), w('pune'), p('.')) }],
})

export const MUJO_MASTER_APPEARANCE = portrait({
  npcId: 'zotniaMujit', nodeId: 'mujiZana1',
  details: ['clothing', 'carried-object', 'hands'],
  practicalWordIds: ['zot', 'rroba', 'paster', 'cante'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('The lord in clean clothes gave Mujo a bag and sent him onto the mountain to work.', w('zot', 'Zoti'), w('me'), w('rroba'), w('te_link'), w('paster', 'pastra', 'clean'), w('i_obj'), w('jep', 'dha'), w('mujo', 'Mujos'), w('nje'), w('cante'), w('dhe'), w('e_obj'), w('dergon', 'dërgoi'), w('ne'), w('mal'), w('per'), w('pune'), p('.')) }],
})

export const MUJO_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaMujit', nodeId: 'mujiZana1',
  details: ['clothing', 'posture', 'hands'],
  practicalWordIds: ['nene', 'shami', 'prit', 'vonon'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [{ line: R('At home, Mujo’s mother waits by the door in a white headscarf; her son is late.', w('ne', 'Në', 'at'), w('shtepi'), p(','), w('nene', 'nëna'), w('e_link'), w('mujo', 'Mujit'), w('prit', 'pret'), w('prane'), w('dere', 'derës'), w('me'), w('nje'), w('shami'), w('te_link'), w('bardhe'), p(';'), w('bir', 'biri'), w('i_link'), w('saj'), w('vonon'), p('.')) }],
})

export default Object.freeze({
  babaMujit: MUJO_FATHER_APPEARANCE,
  zotniaMujit: MUJO_MASTER_APPEARANCE,
  nenaMujit: MUJO_MOTHER_APPEARANCE,
})
