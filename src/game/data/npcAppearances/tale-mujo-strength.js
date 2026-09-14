import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-mujo-strength', ...config })

export const MUJO_FATHER_APPEARANCE = portrait({
  npcId: 'babaMujit', nodeId: 'mujiZana1',
  details: ['clothing', 'condition', 'posture'],
  practicalWordIds: ['kujtoj', 'baba', 'varfer', 'rroba', 'vjeter', 'dergon', 'bir', 'pune'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('Mujo remembers his poor father in old clothes, sending his son out to work.', w('mujo'), w('kujtoj', 'kujton'), w('baba', 'babanë'), w('e_link'), w('varfer'), w('me'), w('rroba'), w('te_link'), w('vjeter', 'vjetra', 'old'), p(','), w('qe'), w('dergon', 'dërgon'), w('bir', 'birin'), w('ne'), w('pune'), p('.')) }],
})

export const MUJO_MASTER_APPEARANCE = portrait({
  npcId: 'zotniaMujit', nodeId: 'mujiZana1',
  details: ['clothing', 'carried-object', 'movement'],
  practicalWordIds: ['zot', 'rroba', 'paster', 'jep', 'cante', 'bari', 'drejt', 'mal'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('The lord in clean clothes gives Mujo a shepherd’s bag and sends him toward the mountain.', w('zot', 'Zoti'), w('me'), w('rroba'), w('te_link'), w('paster', 'pastra', 'clean'), w('i_obj'), w('jep'), w('mujo', 'Mujos'), w('cante', 'çantën'), w('e_link'), w('bari', 'bariut'), w('dhe'), w('e_obj'), w('dergon'), w('drejt'), w('mal', 'malit'), p('.')) }],
})

export const MUJO_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaMujit', nodeId: 'mujiZana1',
  details: ['clothing', 'posture', 'face'],
  practicalWordIds: ['nene', 'prit', 'dere', 'shami', 'bardhe', 'sy', 'rruge'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [{ line: R('Mujo’s mother waits by the door in a white headscarf, her eyes fixed on the road.', w('nene', 'Nëna', 'the mother'), w('e_link'), w('mujo', 'Mujit'), w('prit', 'pret'), w('prane'), w('dere', 'derës'), w('me'), w('nje'), w('shami'), w('te_link'), w('bardhe'), p(','), w('me'), w('sy', 'sytë'), w('nga'), w('rruge', 'rruga'), p('.')) }],
})

export default Object.freeze({
  babaMujit: MUJO_FATHER_APPEARANCE,
  zotniaMujit: MUJO_MASTER_APPEARANCE,
  nenaMujit: MUJO_MOTHER_APPEARANCE,
})
