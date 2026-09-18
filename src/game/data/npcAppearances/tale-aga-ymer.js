import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-aga-ymer', ...config })

export const YMER_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaYmerit', nodeId: 'agaYmer1',
  depiction: { kind: 'narrated', taleId: 'aga-ymer', placeId: 'ulqin', beatIds: ['motherFountain'] },
  details: ['age', 'hair', 'carried-object', 'hands', 'location'], practicalWordIds: ['nene', 'vjeter', 'flok', 'bardhe', 'uje', 'dore', 'burim'],
  placement: { kind: 'insert-after', lineIndex: 5 },
  portraitLines: [{ line: R('In the song, his old white-haired mother holds water at the spring and does not recognise her son.', w('ne', 'Në'), w('kenge', 'këngë'), p(','), w('nene', 'nëna'), w('e_link'), w('tij'), w('e_art'), w('vjeter'), w('me'), w('flok'), w('te_link'), w('bardhe'), w('mban'), w('uje'), w('ne'), w('dore', 'duar'), w('tek', 'te'), w('burim', 'burimi'), w('dhe'), w('nuk'), w('e_obj'), w('njoh', 'njeh'), w('bir', 'birin'), p('.')) }],
})

export const YMER_BRIDE_APPEARANCE = portrait({
  npcId: 'nusjaYmerit', nodeId: 'agaYmer2',
  details: ['age', 'hair', 'clothing'], practicalWordIds: ['grua', 'ri', 'flok', 'shami'],
  placement: { kind: 'replace', lineIndex: 6 },
  portraitLines: [{ line: R('His young wife, with long hair beneath a white headscarf, sees the old scar and knows him.', w('grua', 'Gruaja'), w('e_link'), w('tij'), w('e_art'), w('ri', 're'), p(','), w('me'), w('flok'), w('te_link'), w('gjate'), w('nen'), w('nje'), w('shami'), w('te_link'), w('bardhe'), p(','), w('sheh'), w('plage', 'plagën'), w('e_art'), w('vjeter'), w('dhe'), w('e_obj'), w('njoh', 'njeh'), p('.')) }],
})

export default Object.freeze({ nenaYmerit: YMER_MOTHER_APPEARANCE, nusjaYmerit: YMER_BRIDE_APPEARANCE })
