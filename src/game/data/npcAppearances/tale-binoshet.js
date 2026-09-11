import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-binoshet', ...config })

export const ZJERMA_APPEARANCE = portrait({
  npcId: 'zjerma', nodeId: 'binoshetLumi', details: ['face', 'memorable-feature', 'carried-object'],
  practicalWordIds: ['fytyre', 'shenje', 'diell', 'shpate'], placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('You are Zjerma; on your face is the sign of the Sun, and a sword is in your hand.', w('ti'), w('je'), w('zjerma', 'Zjerma'), p(';'), w('ne', 'në'), w('fytyre'), w('ke'), w('shenje', 'shenjën'), w('e_link'), w('diell', 'Diellit'), w('dhe'), w('ne', 'në'), w('dore'), w('ke'), w('nje'), w('shpate'), p('.')) }],
})

export const HANDA_APPEARANCE = portrait({
  npcId: 'handa', nodeId: 'binoshetGardhiHanda', details: ['condition', 'face', 'memorable-feature'],
  practicalWordIds: ['gur', 'fytyre', 'shenje', 'hene'], placement: { kind: 'replace', lineIndex: 5 },
  portraitLines: [{ line: R('You find Handa turned to stone, with the sign of the Moon still on his face.', w('ti'), w('gjen'), w('handa', 'Handën'), w('ne', 'në'), w('gur'), p(','), w('me'), w('shenje', 'shenjën'), w('e_link'), w('hene', 'Hënës'), w('ende'), w('ne', 'në'), w('fytyre'), w('e_link'), w('tij'), p('.')) }],
})

export const HUT_ELDER_APPEARANCE = portrait({
  npcId: 'plakuKasolles', nodeId: 'binoshetKasollja', details: ['age', 'hair', 'carried-object'],
  practicalWordIds: ['plak', 'mjeker', 'bardhe', 'shkop'], placement: { kind: 'replace', lineIndex: 3 },
  portraitLines: [{ line: R('An old man with a white beard leans on a staff and warns you to turn back.', w('nje'), w('plak'), w('me'), w('mjeker'), w('te_link'), w('bardhe'), w('rri'), w('mbi'), w('nje'), w('shkop'), w('dhe'), w('te_obj'), w('thote'), p(':'), w('kthehu'), p('.')) }],
})

export const HEDGE_CRONE_APPEARANCE = portrait({
  npcId: 'plakaGardhit', nodeId: 'binoshetGardhiHanda', details: ['clothing', 'colour', 'carried-object'],
  practicalWordIds: ['plake', 'shami', 'zi', 'litar'], placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [{ line: R('An old woman in a black headscarf holds a rope beside the hedge and gives three tests.', w('nje'), w('plake'), w('me'), w('nje'), w('shami'), w('te_link'), w('zi', 'zezë'), w('mban'), w('nje'), w('litar'), w('prane'), w('gardh'), w('dhe'), w('jep'), w('tre'), w('prove', 'prova'), p('.')) }],
})

export const FOREIGN_KING_APPEARANCE = portrait({
  npcId: 'mbretiPushtues', nodeId: 'binoshetLuftaFund', details: ['clothing', 'carried-object', 'memorable-feature'],
  practicalWordIds: ['mbret', 'kuror', 'rroba', 'shpate'], placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('The foreign king, in dark clothes with a crown and sword, sees that there is no escape.', w('mbret', 'Mbreti'), w('i_art'), w('huaj'), p(','), w('me'), w('rroba'), w('te_link'), w('erret'), p(','), w('nje'), w('kuror'), w('dhe'), w('nje'), w('shpate'), p(','), w('sheh'), w('se'), w('nuk'), w('ka'), w('shpetim'), p('.')) }],
})

export default Object.freeze({ zjerma: ZJERMA_APPEARANCE, handa: HANDA_APPEARANCE, plakuKasolles: HUT_ELDER_APPEARANCE, plakaGardhit: HEDGE_CRONE_APPEARANCE, mbretiPushtues: FOREIGN_KING_APPEARANCE })
