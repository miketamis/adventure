import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-sokol-halili', ...config })

export const ZADRAN_APPEARANCE = portrait({
  npcId: 'zadraniTetoves', nodeId: 'haliliMejdan',
  details: ['build', 'clothing', 'collective-contrast', 'carried-object'],
  practicalWordIds: ['burre', 'gjate', 'rroba', 'zi', 'vetem', 'shpate', 'drejt', 'perpara'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [
    { line: R('A tall man in black stands alone in the arena, holding his sword straight forward.', w('nje'), w('burre'), w('i_art'), w('gjate'), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza', 'black'), w('rri'), w('vetem'), w('ne', 'në', 'in'), w('mejdan'), p(','), w('me'), w('shpate', 'shpatën'), w('drejt'), w('perpara'), p('.')) },
  ],
})

export const JEALOUS_OSMAN_APPEARANCE = portrait({
  npcId: 'osmaniZilise', nodeId: 'haliliDeka',
  details: ['face', 'posture', 'memorable-feature'],
  practicalWordIds: ['aga', 'buzeqesh', 'sy', 'ftohte', 'sheh', 'drejt', 'mejdan'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [
    { line: R('An aga smiles, but his cold eyes look straight toward the arena.', w('nje'), w('aga'), w('buzeqesh'), p(','), w('por'), w('sy', 'sytë'), w('e_link'), w('ftohte'), w('sheh', 'shohin'), w('drejt'), w('mejdan', 'mejdanit'), p('.')) },
  ],
})

export default Object.freeze({
  zadraniTetoves: ZADRAN_APPEARANCE,
  osmaniZilise: JEALOUS_OSMAN_APPEARANCE,
})
