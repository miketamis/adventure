import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'core-kreshnik', ...config })

export const HALILI_APPEARANCE = portrait({
  npcId: 'halili', nodeId: 'jutbina',
  details: ['age', 'clothing', 'carried-object'],
  practicalWordIds: ['ri', 'plis', 'bardhe', 'shpate'],
  placement: { kind: 'replace', lineIndex: 13 },
  portraitLines: [{ line: R('Beside Mujo stands the younger Halili, with a white felt cap and a sword in his hand.', w('prane'), w('mujo', 'Mujit'), w('rri'), w('halil', 'Halili'), w('i_art'), w('ri'), p(','), w('me'), w('nje'), w('plis'), w('te_link'), w('bardhe'), w('dhe'), w('nje'), w('shpate'), w('ne'), w('dore'), p('.')) }],
})

export const ZUKU_APPEARANCE = portrait({
  npcId: 'zuku', nodeId: 'zuku1',
  details: ['condition', 'build', 'posture'],
  practicalWordIds: ['trim', 'sy', 'madh', 'forte'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('A great strong hero sits on a stone; his dark eyes cannot see.', w('nje'), w('trim'), w('i_art'), w('madh'), w('dhe'), w('i_art'), w('forte'), w('rri'), w('ne'), w('nje'), w('gur'), p(';'), w('sy', 'sytë'), w('e_link'), w('tij'), w('te_link'), w('erret'), w('nuk'), w('mund'), w('te_subj'), w('sheh'), p('.')) }],
})

export const MUJO_COURSER_APPEARANCE = portrait({
  npcId: 'gjogu', nodeId: 'jutbina',
  details: ['colour', 'build', 'movement'],
  practicalWordIds: ['kale', 'bardhe', 'madh', 'qete'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [{ line: R('Mujo’s great white horse waits quietly beside the tower.', w('kale', 'Kali'), w('i_art'), w('madh'), w('dhe'), w('bardhe'), w('i_art'), w('mujo', 'Mujit'), w('prit', 'pret'), w('i_art'), w('qete'), w('prane'), w('kulle', 'kullës'), p('.')) }],
})

export default Object.freeze({
  halili: HALILI_APPEARANCE,
  zuku: ZUKU_APPEARANCE,
  gjogu: MUJO_COURSER_APPEARANCE,
})
