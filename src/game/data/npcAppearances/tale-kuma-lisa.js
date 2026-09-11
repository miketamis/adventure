import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-kuma-lisa', ...config })

export const KUMA_LISA_APPEARANCE = portrait({
  npcId: 'kumaLisa', nodeId: 'dhelpra1',
  details: ['colour', 'movement', 'memorable-feature'],
  practicalWordIds: ['dhelpra', 'bisht', 'gjate', 'kuq'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [{ line: R('The fox swishes her long red tail and says, “I am going to a christening.”', w('dhelpra', 'Dhelpra'), w('tund'), w('bisht', 'bishtin'), w('e_art'), w('gjate'), w('dhe'), w('te_link'), w('kuq'), w('dhe'), w('thote'), p(':'), w('une'), w('shko', 'shkoj'), w('ne'), w('pagezim'), p('.')) }],
})

export const NIKOLLA_WOLF_APPEARANCE = portrait({
  npcId: 'ujkuNikolla', nodeId: 'dhelpra1',
  details: ['carried-object', 'build', 'work-marks'],
  practicalWordIds: ['ujk', 'madh', 'shporte', 'balte'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [{ line: R('The great wolf carries a basket; there is clay on his feet.', w('ujk', 'Ujku'), w('i_art'), w('madh'), w('mban'), w('nje'), w('shporte'), p(';'), w('ka'), w('balte'), w('ne'), w('kembe', 'këmbët'), w('e_link'), w('tij'), p('.')) }],
})

export default Object.freeze({
  kumaLisa: KUMA_LISA_APPEARANCE,
  ujkuNikolla: NIKOLLA_WOLF_APPEARANCE,
})
