import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-swallow', ...config })

export const SWALLOW_APPEARANCE = portrait({
  npcId: 'dallendyshja', nodeId: 'dallendysheFund',
  details: ['build', 'colour', 'memorable-feature'],
  practicalWordIds: ['dallendyshe', 'vogel', 'gji', 'bardhe', 'krah', 'zi'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [
    { line: R('You are a small swallow with a white breast and black wings.', w('ti'), w('je'), w('nje'), w('dallendyshe'), w('e_art'), w('vogel'), w('me'), w('gji'), w('te_link'), w('bardhe'), w('dhe'), w('krah', 'krahë', 'wings'), w('te_link'), w('zi', 'zinj', 'black'), p('.')) },
  ],
})

export const MOSQUITO_APPEARANCE = portrait({
  npcId: 'mushkonja', nodeId: 'dallendyshe1',
  details: ['build', 'movement', 'memorable-feature'],
  practicalWordIds: ['mushkonje', 'vogel', 'fytyre', 'shpejt'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [
    { line: R('A small mosquito flies quickly beside your face.', w('nje'), w('mushkonje'), w('e_art'), w('vogel'), w('fluturo', 'fluturon', 'fly'), w('shpejt'), w('prane'), w('fytyre', 'fytyrës', 'the face'), w('yt', 'tënde', 'your'), p('.')) },
  ],
})

export default Object.freeze({
  dallendyshja: SWALLOW_APPEARANCE,
  mushkonja: MOSQUITO_APPEARANCE,
})
