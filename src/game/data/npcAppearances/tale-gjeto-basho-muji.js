import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'
const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-gjeto-basho-muji', ...config })

export const MEJDAN_OSMANI_APPEARANCE = portrait({
  npcId: 'arnautOsmaniMejdanit', nodeId: 'gbMuji1', details: ['build', 'clothing', 'carried-object'],
  practicalWordIds: ['trim', 'rroba', 'zi', 'arme'], placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [{ line: R('Arnaut Osmani, a tall hero in black clothes, wounds you nine times with his weapon.', w('osman', 'Arnaut Osmani'), p(','), w('nje'), w('trim'), w('i_art'), w('gjate'), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza'), p(','), w('te_obj'), w('godit', 'godet'), w('nente'), w('here'), w('me'), w('arme'), p('.')) }],
})

export const RESCUE_ZANAS_APPEARANCE = portrait({
  npcId: 'zanatShpetimit', nodeId: 'gbMuji1', details: ['collective-contrast', 'clothing', 'colour', 'carried-object'],
  practicalWordIds: ['zane', 'rroba', 'bardhe', 'qumesht'], placement: { kind: 'replace', lineIndex: 4 },
  portraitLines: [{ line: R('Three Zanas in white clothes come down from the mountain carrying milk.', w('tre', 'Tri'), w('zane', 'zana'), w('me'), w('rroba'), w('te_link'), w('bardhe'), w('vjen', 'vijnë'), w('nga'), w('mal'), w('me'), w('qumesht'), p('.')) }],
})

export const MOUNTAIN_SHEPHERD_APPEARANCE = portrait({
  npcId: 'bariuUdhes', nodeId: 'gbMujiFund', details: ['clothing', 'carried-object', 'work-marks'],
  practicalWordIds: ['bari', 'rroba', 'vjeter', 'shkop'], placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [{ line: R('On the road home, a shepherd in old clothes walks among the goats with a long staff.', w('ne', 'Në'), w('rruge', 'rrugën'), w('per'), w('ne'), w('shtepi'), p(','), w('nje'), w('bari'), w('me'), w('rroba'), w('te_link'), w('vjeter'), w('ec'), w('mes'), w('dhi'), w('me'), w('nje'), w('shkop'), w('te_link'), w('gjate'), p('.')) }],
})

export default Object.freeze({ arnautOsmaniMejdanit: MEJDAN_OSMANI_APPEARANCE, zanatShpetimit: RESCUE_ZANAS_APPEARANCE, bariuUdhes: MOUNTAIN_SHEPHERD_APPEARANCE })
