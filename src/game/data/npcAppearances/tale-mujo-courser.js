import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-mujo-courser', ...config })

export const AJKUNA_APPEARANCE = portrait({
  npcId: 'ajkuna', nodeId: 'mujoKale',
  details: ['carried-object', 'hands', 'location', 'condition'],
  practicalWordIds: ['grua', 'prit', 'ahur', 'mbyllur', 'celes', 'dore', 'sane', 'thes'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('Mujo’s wife waits beside the locked stable, its key in her hand and hay in a sack.', w('grua', 'Gruaja', 'the woman'), w('e_link'), w('mujo', 'Mujit'), w('prit', 'pret'), w('prane'), w('ahur', 'ahurit'), w('te_link'), w('mbyllur'), p(','), w('me'), w('celes', 'çelësin'), w('ne', 'në', 'in'), w('dore'), w('dhe'), w('sane'), w('ne', 'në', 'in'), w('nje'), w('thes'), p('.')) }],
})

export const RASPODINI_APPEARANCE = portrait({
  npcId: 'raspodini', nodeId: 'mujoKale',
  details: ['memorable-feature', 'clothing', 'carried-object'],
  practicalWordIds: ['bari', 'duket', 'rroba', 'vjeter', 'plis', 'shkop', 'gjate'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('On the road, a shepherd looks like Mujo; he carries a felt cap, old clothes and a long staff.', w('ne', 'Në', 'on'), w('rruge'), p(','), w('nje'), w('bari'), w('duket'), w('si', 'si', 'as'), w('mujo'), p(';'), w('mban'), w('nje'), w('plis'), p(','), w('rroba'), w('te_link'), w('vjeter', 'vjetra', 'old'), w('dhe'), w('nje'), w('shkop'), w('te_link'), w('gjate'), p('.')) }],
})

export default Object.freeze({
  ajkuna: AJKUNA_APPEARANCE,
  raspodini: RASPODINI_APPEARANCE,
})
