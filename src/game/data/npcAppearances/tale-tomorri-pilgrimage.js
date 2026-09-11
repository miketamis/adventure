import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

export const ABAZ_ALIU_APPEARANCE = defineNpcFirstEncounter({
  sourcePartition: 'tale-tomorri-pilgrimage',
  npcId: 'abazAliu',
  nodeId: 'maja',
  details: ['clothing', 'colour', 'memorable-feature'],
  practicalWordIds: ['feste', 'trim', 'rroba', 'gjelber', 'kale', 'bardhe'],
  placement: { kind: 'insert-after', lineIndex: 15 },
  portraitLines: [
    {
      required: ['festival:tomorriPilgrimage', 'day'],
      line: R('At the festival, a hero in green clothes sits on a white horse.', w('ne', 'në', 'at'), w('feste'), p(','), w('nje'), w('trim'), w('me'), w('rroba'), w('te_link'), w('gjelber', 'gjelbra', 'green'), w('rri'), w('mbi'), w('nje'), w('kale'), w('te_link'), w('bardhe'), p('.')),
    },
  ],
})

export default Object.freeze({ abazAliu: ABAZ_ALIU_APPEARANCE })
