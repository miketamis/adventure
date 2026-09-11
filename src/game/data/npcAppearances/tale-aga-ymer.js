import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-aga-ymer', ...config })

export const YMER_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaYmerit', nodeId: 'agaYmer1',
  details: ['age', 'hair', 'condition'], practicalWordIds: ['nene', 'vjeter', 'flok', 'bardhe'],
  placement: { kind: 'insert-after', lineIndex: 5 },
  portraitLines: [{ line: R('At home his old mother waits too, with white hair and tired eyes.', w('ne', 'Në'), w('shtepi'), w('prit', 'pret'), w('edhe'), w('nene', 'nëna'), w('e_link'), w('tij'), w('e_art'), w('vjeter'), p(','), w('me'), w('flok'), w('te_link'), w('bardhe'), w('dhe'), w('sy'), w('te_link'), w('lodhur'), p('.')) }],
})

export const YMER_BRIDE_APPEARANCE = portrait({
  npcId: 'nusjaYmerit', nodeId: 'agaYmer2',
  details: ['age', 'hair', 'clothing'], practicalWordIds: ['grua', 'ri', 'flok', 'shami'],
  placement: { kind: 'replace', lineIndex: 6 },
  portraitLines: [{ line: R('His young wife, with long hair beneath a white headscarf, sees the old scar and knows him.', w('grua', 'Gruaja'), w('e_link'), w('tij'), w('e_art'), w('ri', 're'), p(','), w('me'), w('flok'), w('te_link'), w('gjate'), w('nen'), w('nje'), w('shami'), w('te_link'), w('bardhe'), p(','), w('sheh'), w('plage', 'plagën'), w('e_art'), w('vjeter'), w('dhe'), w('e_obj'), w('njoh', 'njeh'), p('.')) }],
})

export default Object.freeze({ nenaYmerit: YMER_MOTHER_APPEARANCE, nusjaYmerit: YMER_BRIDE_APPEARANCE })
