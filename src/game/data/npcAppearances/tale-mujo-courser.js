import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-mujo-courser', ...config })

export const AJKUNA_APPEARANCE = portrait({
  npcId: 'ajkuna', nodeId: 'mujoKale',
  details: ['carried-object', 'clothing', 'location'],
  practicalWordIds: ['grua', 'celes', 'ahur', 'thes'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('Before the long road, Mujo’s wife waited beside the stable with its key and a sack of hay.', w('para', 'Para', 'before'), w('rruge', 'rrugës', 'the road'), p(','), w('grua', 'gruaja'), w('e_link'), w('mujo', 'Mujit'), w('prit', 'priste', 'waited'), w('prane'), w('ahur', 'ahurit'), w('me'), w('celes', 'çelësin'), w('dhe'), w('nje'), w('thes'), w('me'), w('sane'), p('.')) }],
})

export const RASPODINI_APPEARANCE = portrait({
  npcId: 'raspodini', nodeId: 'mujoKale',
  details: ['clothing', 'carried-object', 'work-marks'],
  practicalWordIds: ['bari', 'rroba', 'plis', 'shkop'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('On the road, a shepherd wore old clothes and carried a felt cap and a long staff.', w('ne', 'Në', 'on'), w('rruge'), p(','), w('nje'), w('bari'), w('vesh', 'vishte'), w('rroba'), w('te_link'), w('vjeter', 'vjetra', 'old'), w('dhe'), w('mban', 'mbante'), w('nje'), w('plis'), w('dhe'), w('nje'), w('shkop'), w('te_link'), w('gjate'), p('.')) }],
})

export default Object.freeze({
  ajkuna: AJKUNA_APPEARANCE,
  raspodini: RASPODINI_APPEARANCE,
})
