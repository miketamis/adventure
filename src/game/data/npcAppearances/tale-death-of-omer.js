import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'
const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-death-of-omer', ...config })

export const OMER_APPEARANCE = portrait({
  npcId: 'omeriMujit', nodeId: 'omer1', details: ['age', 'clothing', 'carried-object'],
  practicalWordIds: ['femije', 'plis', 'bardhe', 'shpate'], placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('Omer, Mujo’s son, is still a boy; he wears a white felt cap and carries a sword.', w('omer', 'Omeri'), p(','), w('bir', 'biri'), w('i_link'), w('mujo', 'Mujit'), p(','), w('eshte'), w('ende'), w('nje'), w('femije'), p(';'), w('vesh'), w('nje'), w('plis'), w('te_link'), w('bardhe'), w('dhe'), w('mban'), w('nje'), w('shpate'), p('.')) }],
})

export const HALIL_UNCLE_APPEARANCE = portrait({
  npcId: 'halilVellaiMujit', nodeId: 'omer2', details: ['age', 'clothing', 'carried-object'],
  practicalWordIds: ['vella', 'ri', 'rroba', 'shpate'], placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('Mujo’s younger brother Halili stands beside him in mountain clothes, holding a sword.', w('vella', 'Vëllai'), w('i_art'), w('ri'), w('i_link'), w('mujo', 'Mujit'), p(','), w('halil', 'Halili'), p(','), w('rri'), w('prane'), w('ai', 'tij'), w('me'), w('rroba'), w('e_link'), w('mal'), w('dhe'), w('nje'), w('shpate'), w('ne'), w('dore'), p('.')) }],
})

export const BORDER_PRIEST_APPEARANCE = portrait({
  npcId: 'popiKishes', nodeId: 'omer1', details: ['age', 'hair', 'carried-object'],
  practicalWordIds: ['prift', 'mjeker', 'bardhe', 'liber'], placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('An old priest with a white beard comes to the church door carrying a book.', w('nje'), w('prift'), w('i_art'), w('vjeter'), w('me'), w('mjeker'), w('te_link'), w('bardhe'), w('vjen'), w('tek', 'te'), w('dere'), w('e_link'), w('kishe', 'kishës'), w('me'), w('nje'), w('liber'), w('ne'), w('dore'), p('.')) }],
})

export const PORTRAIT_WOMAN_APPEARANCE = portrait({
  npcId: 'grueShkine', nodeId: 'omer1', details: ['clothing', 'carried-object', 'hands'],
  practicalWordIds: ['grua', 'rroba', 'fytyre', 'dy'], placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [{ line: R('A woman in dark clothes holds two portraits in her hands.', w('nje'), w('grua'), w('me'), w('rroba'), w('te_link'), w('erret'), w('mban'), w('dy'), w('fytyre'), w('ne'), w('dore', 'duar'), p('.')) }],
})

export const AJKUNA_APPEARANCE = portrait({
  npcId: 'ajkunaGruaMujit', nodeId: 'omerFund', details: ['clothing', 'colour', 'condition'],
  practicalWordIds: ['nene', 'rroba', 'zi', 'lot'], placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('Omer’s mother comes in black clothes, with tears on her face.', w('nene', 'Nëna'), w('e_link'), w('omer', 'Omerit'), w('vjen'), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza'), p(','), w('me'), w('lot'), w('ne'), w('fytyre'), p('.')) }],
})

export const MOUNTAIN_ORAS_APPEARANCE = portrait({
  npcId: 'oretBjeshkes', nodeId: 'omerFund', details: ['clothing', 'colour', 'voice'],
  practicalWordIds: ['ora', 'rroba', 'bardhe', 'ze'], placement: { kind: 'replace', lineIndex: 7 },
  portraitLines: [{ line: R('The mountain Oras, in white clothes and with quiet voices, come to the mother.', w('ora', 'Orët'), w('e_link'), w('mal', 'malit'), p(','), w('me'), w('rroba'), w('te_link'), w('bardhe'), w('dhe'), w('ze', 'zëra'), w('te_link'), w('qete'), p(','), w('vjen', 'vijnë'), w('tek', 'te'), w('nene', 'nëna'), p('.')) }],
})

export default Object.freeze({ omeriMujit: OMER_APPEARANCE, halilVellaiMujit: HALIL_UNCLE_APPEARANCE, popiKishes: BORDER_PRIEST_APPEARANCE, grueShkine: PORTRAIT_WOMAN_APPEARANCE, ajkunaGruaMujit: AJKUNA_APPEARANCE, oretBjeshkes: MOUNTAIN_ORAS_APPEARANCE })
