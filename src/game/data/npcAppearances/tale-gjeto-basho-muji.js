import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'
const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-gjeto-basho-muji', ...config })

export const MEJDAN_OSMANI_APPEARANCE = portrait({
  npcId: 'arnautOsmaniMejdanit', nodeId: 'gbMuji1', details: ['clothing', 'carried-object', 'movement', 'companion'],
  practicalWordIds: ['shok', 'rroba', 'zi', 'vjen', 'prane', 'arme', 'dore'], placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [{ line: R('Arnaut Osmani, your companion in black clothes, comes beside you with a weapon in his hand.', w('osman', 'Arnaut Osmani'), p(','), w('shok', 'shoku'), w('yt'), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza'), p(','), w('vjen'), w('prane'), w('ti', 'teje'), w('me'), w('nje'), w('arme'), w('ne'), w('dore'), p('.')) }],
})

export const RESCUE_ZANAS_APPEARANCE = portrait({
  npcId: 'zanatShpetimit', nodeId: 'gbMuji1', details: ['collective-contrast', 'clothing', 'colour', 'carried-object'],
  practicalWordIds: ['zane', 'rroba', 'bardhe', 'qumesht'], placement: { kind: 'replace', lineIndex: 4 },
  portraitLines: [{ line: R('Three Zanas in white clothes come down from the mountain carrying milk.', w('tre', 'Tri'), w('zane', 'zana'), w('me'), w('rroba'), w('te_link'), w('bardhe'), w('vjen', 'vijnë'), w('nga'), w('mal'), w('me'), w('qumesht'), p('.')) }],
})

export const MOUNTAIN_SHEPHERD_APPEARANCE = portrait({
  npcId: 'bariuUdhes', nodeId: 'gbMujiFund', details: ['clothing', 'carried-object', 'work-marks', 'posture'],
  practicalWordIds: ['bari', 'rroba', 'vjeter', 'shkop', 'dhi', 'shiko', 'trim'], placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('On the road home, a shepherd in old clothes stands among his goats, grips a long staff, and studies the lone hero.', w('ne', 'Në'), w('rruge', 'rrugën'), w('per'), w('ne'), w('shtepi'), p(','), w('nje'), w('bari'), w('me'), w('rroba'), w('te_link'), w('vjeter'), w('rri'), w('mes'), w('dhi', 'dhive'), p(','), w('mban'), w('nje'), w('shkop'), w('te_link'), w('gjate'), w('dhe'), w('shiko', 'shikon'), w('trim', 'trimin'), w('e_art'), w('vetem'), p('.')) }],
})

export default Object.freeze({ arnautOsmaniMejdanit: MEJDAN_OSMANI_APPEARANCE, zanatShpetimit: RESCUE_ZANAS_APPEARANCE, bariuUdhes: MOUNTAIN_SHEPHERD_APPEARANCE })
