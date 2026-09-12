import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

export const NASTRADIN_APPEARANCE = defineNpcFirstEncounter({
  sourcePartition: 'tale-nastradin',
  npcId: 'nastradini', nodeId: 'nastradin1',
  details: ['clothing', 'condition', 'face', 'companion'],
  practicalWordIds: ['varfer', 'plis', 'bardhe', 'buzeqesh', 'gomar', 'vogel'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [
    { line: R('The poor hodja in a white felt cap smiles; a small donkey stands beside him.', w('hoxha'), w('i_art'), w('varfer'), w('me'), w('nje'), w('plis'), w('te_link'), w('bardhe'), w('buzeqesh'), p(';'), w('prane'), w('tij'), w('rri'), w('nje'), w('gomar'), w('i_art'), w('vogel'), p('.')) },
  ],
})

export default Object.freeze({ nastradini: NASTRADIN_APPEARANCE })
