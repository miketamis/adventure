import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

export const NASTRADIN_APPEARANCE = defineNpcFirstEncounter({
  sourcePartition: 'tale-nastradin',
  npcId: 'nastradini', nodeId: 'nastradin1',
  details: ['clothing', 'condition', 'face'],
  practicalWordIds: ['varfer', 'plis', 'bardhe', 'buzeqesh'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [
    { line: R('The poor hodja has a white felt cap and smiles.', w('hoxha'), w('i_art'), w('varfer'), w('ka'), w('nje'), w('plis'), w('te_link'), w('bardhe'), w('dhe'), w('buzeqesh'), p('.')) },
  ],
})

export default Object.freeze({ nastradini: NASTRADIN_APPEARANCE })
