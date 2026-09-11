import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-kostandini-i-vogel', ...config })

export const AGA_YMER_BRIDE_APPEARANCE = portrait({
  npcId: 'nusja', nodeId: 'plaka',
  details: ['clothing', 'carried-object', 'posture'],
  practicalWordIds: ['nuse', 'unaze', 'harron', 'bese'],
  placement: { kind: 'insert-after', lineIndex: 7 },
  portraitLines: [{ line: R('In the story, the bride waits by the window with a ring and does not forget her oath.', w('ne', 'Në', 'in'), w('histori'), p(','), w('nuse', 'nusja'), w('prit', 'pret'), w('prane'), w('dritare'), w('me'), w('nje'), w('unaze'), w('dhe'), w('nuk'), w('e_obj'), w('harron'), w('bese', 'besën'), p('.')) }],
})

export const CAPTOR_KING_APPEARANCE = portrait({
  npcId: 'mbretiZaptor', nodeId: 'agaYmer1',
  details: ['clothing', 'carried-object', 'hands'],
  practicalWordIds: ['mbret', 'rroba', 'celes', 'burg'],
  placement: { kind: 'insert-after', lineIndex: 6 },
  portraitLines: [{ line: R('The king, in black clothes, holds the prison key in his hand.', w('mbret', 'Mbreti'), p(','), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza', 'black'), p(','), w('mban'), w('celes', 'çelësin'), w('e_link'), w('burg', 'burgut'), w('ne'), w('dore'), p('.')) }],
})

export const KING_DAUGHTER_APPEARANCE = portrait({
  npcId: 'bijaMbretit', nodeId: 'agaYmer1',
  details: ['clothing', 'carried-object', 'condition'],
  practicalWordIds: ['vajze', 'shami', 'celes', 'fal'],
  placement: { kind: 'replace', lineIndex: 10 },
  portraitLines: [{ line: R('The king’s daughter, in a white headscarf with the prison key, pardons the hero.', w('vajze', 'Vajza'), w('e_link'), w('mbret', 'mbretit'), p(','), w('me'), w('nje'), w('shami'), w('te_link'), w('bardhe'), w('dhe'), w('celes', 'çelësin'), w('e_link'), w('burg', 'burgut'), p(','), w('fal'), w('trim', 'trimin'), p('.')) }],
})

export default Object.freeze({
  nusja: AGA_YMER_BRIDE_APPEARANCE,
  mbretiZaptor: CAPTOR_KING_APPEARANCE,
  bijaMbretit: KING_DAUGHTER_APPEARANCE,
})
