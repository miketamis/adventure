import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'core-kreshnik', ...config })

export const HALILI_APPEARANCE = portrait({
  npcId: 'halili', nodeId: 'jutbina',
  details: ['age', 'clothing', 'carried-object', 'posture'],
  practicalWordIds: ['ri', 'plis', 'bardhe', 'shpate', 'rruge'],
  placement: { kind: 'replace', lineIndex: 13 },
  portraitLines: [{ line: R('Young Halili stands beside Mujo in a white felt cap; he holds his sword and watches the road.', w('halil', 'Halili'), w('i_art'), w('ri'), w('rri'), w('prane'), w('mujo', 'Mujit'), w('me'), w('nje'), w('plis'), w('te_link'), w('bardhe'), p(';'), w('ai'), w('mban'), w('shpate', 'shpatën'), w('e_link'), w('tij'), w('dhe'), w('sheh'), w('rruge', 'rrugën'), p('.')) }],
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
  details: ['build', 'movement', 'location', 'memorable-feature'],
  practicalWordIds: ['kale', 'madh', 'kulle', 'godit', 'toke', 'kembe', 'degjo', 'ze'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [{ line: R("Mujo's great horse waits beside the tower; it strikes the ground with one hoof and listens to every sound.", w('kale', 'Kali'), w('i_art'), w('madh'), w('i_art'), w('mujo', 'Mujit'), w('prit', 'pret'), w('prane'), w('kulle', 'kullës'), p(';'), w('godit', 'godet'), w('toke', 'tokën'), w('me'), w('nje'), w('kembe'), w('dhe'), w('degjo', 'dëgjon'), w('cdo'), w('ze'), p('.')) }],
})

export default Object.freeze({
  halili: HALILI_APPEARANCE,
  zuku: ZUKU_APPEARANCE,
  gjogu: MUJO_COURSER_APPEARANCE,
})
