import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-bear-dervish', ...config })

export const DERVISH_APPEARANCE = portrait({
  npcId: 'dervishi', nodeId: 'arushe1',
  details: ['build', 'clothing', 'carried-object'], practicalWordIds: ['vogel', 'rroba', 'vjeter', 'djathe'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('A small dervish in old clothes carries a cheese through the forest.', w('nje'), w('dervish'), w('i_art'), w('vogel'), w('me'), w('rroba'), w('te_link'), w('vjeter'), w('mban'), w('nje'), w('djathe'), w('ne'), w('pyll'), p('.')) }],
})

export const BEAR_APPEARANCE = portrait({
  npcId: 'arusha', nodeId: 'arushe1',
  details: ['build', 'movement', 'face'], practicalWordIds: ['arushe', 'madh', 'forte', 'goje'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('The great strong bear makes the trees tremble and opens her mouth as she walks.', w('arushe', 'Arusha'), w('e_art'), w('madh'), w('dhe'), w('e_art'), w('forte'), w('bej'), w('peme', 'pemët'), w('te_subj'), w('dridhet', 'dridhen'), w('dhe'), w('hap'), w('goje', 'gojën'), w('kur'), w('ec', 'ecën'), p('.')) }],
})

export const CHURCH_PRIEST_APPEARANCE = portrait({
  npcId: 'prifti', nodeId: 'kisha1',
  details: ['age', 'hair', 'clothing'], practicalWordIds: ['prift', 'mjeker', 'bardhe', 'rroba'],
  placement: { kind: 'replace', lineIndex: 4 },
  portraitLines: [{ line: R('An old priest with a white beard and black clothes stands at the church door.', w('nje'), w('prift'), w('i_art'), w('vjeter'), w('me'), w('mjeker'), w('te_link'), w('bardhe'), w('dhe'), w('rroba'), w('te_link'), w('zi', 'zeza'), w('rri'), w('tek', 'te'), w('dere'), w('e_link'), w('kishe', 'kishës'), p('.')) }],
})

export default Object.freeze({ dervishi: DERVISH_APPEARANCE, arusha: BEAR_APPEARANCE, prifti: CHURCH_PRIEST_APPEARANCE })
