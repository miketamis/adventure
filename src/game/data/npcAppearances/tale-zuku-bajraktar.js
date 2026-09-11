import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

export const RUSHA_APPEARANCE = defineNpcFirstEncounter({
  sourcePartition: 'tale-zuku-bajraktar',
  npcId: 'rusha',
  nodeId: 'rusha1',
  details: ['hair', 'clothing', 'colour', 'carried-object'],
  practicalWordIds: ['bije', 'flok', 'zi', 'rroba', 'kuq', 'unaze', 'dore'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [
    { line: R('The king’s daughter has black hair, red clothes and a ring in her hand.', w('bije', 'bija', 'the daughter'), w('e_link'), w('krajl', 'krajlit', 'the Slav king'), w('ka'), w('flok'), w('te_link'), w('zi', 'zinj', 'black'), p(','), w('rroba'), w('te_link'), w('kuq', 'kuqe', 'red'), w('dhe'), w('nje'), w('unaze'), w('ne', 'në', 'in'), w('dore'), p('.')) },
  ],
})

export default Object.freeze({ rusha: RUSHA_APPEARANCE })
