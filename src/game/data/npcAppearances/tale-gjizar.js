import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'
const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-gjizar', ...config })

export const MOSQUE_KING_APPEARANCE = portrait({
  npcId: 'mbretiXhamive', nodeId: 'gjizar2', details: ['clothing', 'carried-object', 'memorable-feature'],
  practicalWordIds: ['mbret', 'rroba', 'bardhe', 'liber'], placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('A king in clean white clothes holds a book and asks for a bird for the mosque.', w('nje'), w('mbret'), w('me'), w('rroba'), w('te_link'), w('bardhe'), w('dhe'), w('te_link'), w('paster'), w('mban'), w('nje'), w('liber'), w('dhe'), w('kerko', 'kërkon'), w('nje'), w('zog'), w('per'), w('nje'), w('xhami'), p('.')) }],
})

export const YOUNGEST_PRINCE_APPEARANCE = portrait({
  npcId: 'djaliGjizar', nodeId: 'gjizar1', details: ['age', 'clothing', 'carried-object'],
  practicalWordIds: ['djale', 'vogel', 'rroba', 'unaze'], placement: { kind: 'replace', lineIndex: 3 },
  portraitLines: [{ line: R('The youngest son, quiet and in old clothes, puts his ring beneath the stone.', w('djale', 'Djali'), w('i_art'), w('vogel'), p(','), w('i_art'), w('qete'), w('dhe'), w('me'), w('rroba'), w('te_link'), w('vjeter'), p(','), w('le'), w('unaze', 'unazën'), w('e_link'), w('tij'), w('nen'), w('gur'), p('.')) }],
})

export const WILD_WOMAN_APPEARANCE = portrait({
  npcId: 'egershania', nodeId: 'gjizarUdha', details: ['hair', 'condition', 'carried-object'],
  practicalWordIds: ['grua', 'eger', 'flok', 'morra'], placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('A wild woman with long hair has lice in it.', w('nje'), w('grua'), w('e_art'), w('eger'), w('me'), w('flok'), w('te_link'), w('gjate'), w('ka'), w('morra'), w('ne'), w('flok'), p('.')) }],
})

export default Object.freeze({ mbretiXhamive: MOSQUE_KING_APPEARANCE, djaliGjizar: YOUNGEST_PRINCE_APPEARANCE, egershania: WILD_WOMAN_APPEARANCE })
