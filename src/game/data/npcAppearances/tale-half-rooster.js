import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-half-rooster', ...config })

export const HALF_ROOSTER_APPEARANCE = portrait({
  npcId: 'gjysmagjeli', nodeId: 'gjysmegjel1',
  details: ['build', 'colour', 'memorable-feature'],
  practicalWordIds: ['krah', 'kembe', 'pende', 'kuq'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('The half-rooster has one wing, one leg, and red feathers.', w('gjysmegjel', 'Gjysmëgjeli'), w('ka'), w('nje'), w('krah'), p(','), w('nje'), w('kembe'), w('dhe'), w('pende'), w('te_link'), w('kuq', 'kuqe'), p('.')) }],
})

export default Object.freeze({
  gjysmagjeli: HALF_ROOSTER_APPEARANCE,
})
