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
  details: ['carried-object', 'hands', 'memorable-feature'],
  practicalWordIds: ['bije', 'krajl', 'mban', 'filxhan', 'dore', 'qete', 'unaze', 'shkelqen', 'kafe'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [
    { line: R('The king’s daughter holds the cup in a steady hand; her ring shines beside the coffee.', w('bije', 'Bija', 'the daughter'), w('e_link'), w('krajl', 'krajlit', 'the Slav king'), w('mban'), w('filxhan', 'filxhanin'), w('me'), w('dore'), w('te_link'), w('qete'), p(';'), w('unaze', 'unaza'), w('shkelqen'), w('prane'), w('kafe', 'kafesë'), p('.')) },
  ],
})

export default Object.freeze({ rusha: RUSHA_APPEARANCE })
