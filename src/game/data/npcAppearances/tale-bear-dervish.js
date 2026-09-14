import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-bear-dervish', ...config })

export const DERVISH_APPEARANCE = portrait({
  npcId: 'dervishi', nodeId: 'arushe1',
  details: ['build', 'clothing', 'carried-object', 'condition'], practicalWordIds: ['vogel', 'rroba', 'vjeter', 'djathe', 'balte', 'kepuce'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('A small dervish in old clothes carries a cheese; there is mud on his shoes.', w('nje'), w('dervish'), w('i_art'), w('vogel'), w('me'), w('rroba'), w('te_link'), w('vjeter'), w('mban'), w('nje'), w('djathe'), p(';'), w('ka'), w('balte'), w('ne'), w('kepuce', 'këpucët'), w('e_link'), w('tij'), p('.')) }],
})

export const BEAR_APPEARANCE = portrait({
  npcId: 'arusha', nodeId: 'arushe1',
  details: ['build', 'movement', 'face'], practicalWordIds: ['arushe', 'madh', 'forte', 'goje'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('The great strong bear makes the trees tremble and opens her mouth as she walks.', w('arushe', 'Arusha'), w('e_art'), w('madh'), w('dhe'), w('e_art'), w('forte'), w('bej'), w('peme', 'pemët'), w('te_subj'), w('dridhet', 'dridhen'), w('dhe'), w('hap'), w('goje', 'gojën'), w('kur'), w('ec', 'ecën'), p('.')) }],
})

export const CHURCH_PRIEST_APPEARANCE = portrait({
  npcId: 'prifti', nodeId: 'kisha1',
  details: ['carried-object', 'hands', 'movement', 'location'], practicalWordIds: ['prift', 'liber', 'hapur', 'dore', 'ngre', 'bekim'],
  placement: { kind: 'replace', lineIndex: 4 },
  portraitLines: [{ line: R('At the church door, the priest holds his book open and raises one hand in blessing.', w('tek', 'Te'), w('dere'), w('e_link'), w('kishe', 'kishës'), p(','), w('prift', 'prifti'), w('mban'), w('liber', 'librin'), w('te_link'), w('hapur'), w('dhe'), w('ngre'), w('nje'), w('dore'), w('per'), w('bekim'), p('.')) }],
})

export default Object.freeze({ dervishi: DERVISH_APPEARANCE, arusha: BEAR_APPEARANCE, prifti: CHURCH_PRIEST_APPEARANCE })
