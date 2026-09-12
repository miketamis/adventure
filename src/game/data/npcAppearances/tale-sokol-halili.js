import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-sokol-halili', ...config })

export const ZADRAN_APPEARANCE = portrait({
  npcId: 'zadraniTetoves', nodeId: 'haliliMejdan',
  details: ['build', 'clothing', 'colour', 'carried-object'],
  practicalWordIds: ['burre', 'gjate', 'rroba', 'zi', 'shpate', 'dore'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [
    { line: R('A tall man in black clothes waits in the arena with a sword in his hand.', w('nje'), w('burre'), w('i_art'), w('gjate'), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza', 'black'), w('rri'), w('ne', 'në', 'in'), w('mejdan'), w('me'), w('nje'), w('shpate'), w('ne', 'në', 'in'), w('dore'), p('.')) },
  ],
})

export const JEALOUS_OSMAN_APPEARANCE = portrait({
  npcId: 'osmaniZilise', nodeId: 'haliliDeka',
  details: ['clothing', 'face', 'memorable-feature'],
  practicalWordIds: ['aga', 'rroba', 'kuq', 'sy', 'ftohte'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [
    { line: R('An aga in red clothes smiles, but has cold eyes.', w('nje'), w('aga'), w('me'), w('rroba'), w('te_link'), w('kuq', 'kuqe', 'red'), w('buzeqesh'), p(','), w('por'), w('ka'), w('sy'), w('te_link'), w('ftohte'), p('.')) },
  ],
})

export default Object.freeze({
  zadraniTetoves: ZADRAN_APPEARANCE,
  osmaniZilise: JEALOUS_OSMAN_APPEARANCE,
})
