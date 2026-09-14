import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'
const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-death-of-omer', ...config })

export const OMER_APPEARANCE = portrait({
  npcId: 'omeriMujit', nodeId: 'omer1', details: ['clothing', 'carried-object', 'hands', 'posture'],
  practicalWordIds: ['plis', 'bardhe', 'shpate', 'dore', 'toke'], placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('Omer, Mujo’s son, still holds a sword in one hand; his white felt cap lies on the ground beside him.', w('omer', 'Omeri'), p(','), w('bir', 'biri'), w('i_link'), w('mujo', 'Mujit'), p(','), w('mban'), w('ende'), w('nje'), w('shpate'), w('ne'), w('dore'), p(';'), w('plis', 'plisi'), w('i_art'), w('bardhe'), w('rri'), w('ne'), w('toke'), w('prane'), w('ai', 'tij'), p('.')) }],
})

export const HALIL_UNCLE_APPEARANCE = portrait({
  npcId: 'halilVellaiMujit', nodeId: 'omer2', details: ['age', 'clothing', 'carried-object', 'location'],
  practicalWordIds: ['vella', 'ri', 'rroba', 'shpate', 'varr'], placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('Mujo’s younger brother Halili stands with him at the grave, still in mountain clothes with his sword in hand.', w('vella', 'Vëllai'), w('i_art'), w('ri'), w('i_link'), w('mujo', 'Mujit'), p(','), w('halil', 'Halili'), p(','), w('rri'), w('me'), w('mujo', 'Mujon'), w('tek', 'te'), w('varr', 'varri'), p(','), w('ende'), w('me'), w('rroba'), w('e_link'), w('mal'), w('dhe'), w('nje'), w('shpate'), w('ne'), w('dore'), p('.')) }],
})

export const BORDER_PRIEST_APPEARANCE = portrait({
  npcId: 'popiKishes', nodeId: 'omer1', details: ['age', 'movement', 'carried-object', 'location'],
  practicalWordIds: ['prift', 'vjeter', 'dere', 'bardhe', 'liber', 'hapur'], placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('An old priest comes toward the white church door with an open book in his hand.', w('nje'), w('prift'), w('i_art'), w('vjeter'), w('vjen'), w('drejt'), w('dere', 'derës'), w('te_link'), w('bardhe'), w('e_link'), w('kishe', 'kishës'), w('me'), w('nje'), w('liber'), w('te_link'), w('hapur'), w('ne'), w('dore'), p('.')) }],
})

export const PORTRAIT_WOMAN_APPEARANCE = portrait({
  npcId: 'grueShkine', nodeId: 'omer1', details: ['clothing', 'carried-object', 'hands'],
  practicalWordIds: ['grua', 'rroba', 'fytyre', 'dy'], placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [{ line: R('A woman in dark clothes holds two portraits in her hands.', w('nje'), w('grua'), w('me'), w('rroba'), w('te_link'), w('erret'), w('mban'), w('dy'), w('fytyre'), w('ne'), w('dore', 'duar'), p('.')) }],
})

export const AJKUNA_APPEARANCE = portrait({
  npcId: 'ajkunaGruaMujit', nodeId: 'omerFund', details: ['clothing', 'colour', 'condition', 'posture', 'location'],
  practicalWordIds: ['nene', 'rroba', 'zi', 'lot', 'mal', 'shiko'], placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('Omer’s mother stands in black clothes, tears on her face, and looks toward the mountain.', w('nene', 'Nëna'), w('e_link'), w('omer', 'Omerit'), w('rri'), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza'), w('dhe'), w('lot'), w('ne'), w('fytyre'), p(';'), w('ajo'), w('shiko', 'shikon'), w('drejt'), w('mal', 'malit'), p('.')) }],
})

export const MOUNTAIN_ORAS_APPEARANCE = portrait({
  npcId: 'oretBjeshkes', nodeId: 'omerFund', details: ['clothing', 'colour', 'hands', 'movement'],
  practicalWordIds: ['ora', 'rroba', 'bardhe', 'dore', 'hapur'], placement: { kind: 'replace', lineIndex: 7 },
  portraitLines: [{ line: R('The mountain Oras come in white clothes, their hands open toward the mother.', w('ora', 'Orët'), w('e_link'), w('mal', 'malit'), w('vjen', 'vijnë'), w('me'), w('rroba'), w('te_link'), w('bardhe'), p(';'), w('dore', 'duart'), w('e_link'), w('tyre'), w('eshte', 'janë'), w('te_link'), w('hapur', 'hapura'), w('drejt'), w('nene', 'nënës'), p('.')) }],
})

export default Object.freeze({ omeriMujit: OMER_APPEARANCE, halilVellaiMujit: HALIL_UNCLE_APPEARANCE, popiKishes: BORDER_PRIEST_APPEARANCE, grueShkine: PORTRAIT_WOMAN_APPEARANCE, ajkunaGruaMujit: AJKUNA_APPEARANCE, oretBjeshkes: MOUNTAIN_ORAS_APPEARANCE })
