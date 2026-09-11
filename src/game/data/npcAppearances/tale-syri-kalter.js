import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-syri-kalter', ...config })

export const SOPOT_SERPENT_APPEARANCE = portrait({
  npcId: 'gjarpriSopotit', nodeId: 'udhaSyri',
  details: ['build', 'colour', 'memorable-feature'],
  practicalWordIds: ['gjarper', 'madh', 'zi', 'tym', 'sy', 'kalter'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [
    { line: R('A large serpent, black with smoke, has one blue eye.', w('nje'), w('gjarper'), w('i_art'), w('madh'), p(','), w('i_art'), w('zi'), w('nga'), w('tym', 'tymi', 'smoke'), p(','), w('ka'), w('nje'), w('sy'), w('te_link'), w('kalter'), p('.')) },
  ],
})

export const TINDER_ELDER_APPEARANCE = portrait({
  npcId: 'plakuEshkes', nodeId: 'udhaSyri',
  details: ['clothing', 'carried-object', 'posture'],
  practicalWordIds: ['plak', 'plis', 'bardhe', 'dru', 'gomar'],
  placement: { kind: 'insert-after', lineIndex: 0 },
  portraitLines: [
    { line: R('An old man in a white felt cap holds wood; a donkey stands beside him.', w('nje'), w('plak'), w('me'), w('nje'), w('plis'), w('te_link'), w('bardhe'), w('mban'), w('dru'), p(';'), w('prane'), w('tij'), w('rri'), w('nje'), w('gomar'), p('.')) },
  ],
})

export default Object.freeze({
  gjarpriSopotit: SOPOT_SERPENT_APPEARANCE,
  plakuEshkes: TINDER_ELDER_APPEARANCE,
})
