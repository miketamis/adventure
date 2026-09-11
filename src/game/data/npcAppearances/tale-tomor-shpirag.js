import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-tomor-shpirag', ...config })

export const BABA_TOMOR_APPEARANCE = portrait({
  npcId: 'babaTomor', nodeId: 'tomor1',
  details: ['face', 'colour', 'carried-object'],
  practicalWordIds: ['plak', 'mjeker', 'bardhe', 'dore', 'shkop', 'gjate'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [
    { line: R('The old man’s beard is white as mist; he holds a long staff in his hand.', w('mjeker', 'mjekra', 'the beard'), w('e_link'), w('plak', 'plakut', 'the old man'), w('eshte'), w('e_art'), w('bardhe'), w('si'), w('mjegull'), p(';'), w('ne', 'në', 'in'), w('dore'), w('mban'), w('nje'), w('shkop'), w('te_link'), w('gjate'), p('.')) },
  ],
})

export const SHPIRAG_APPEARANCE = portrait({
  npcId: 'shpiragu', nodeId: 'shpirag1',
  details: ['build', 'clothing', 'work-marks'],
  practicalWordIds: ['burre', 'madh', 'krah_arm', 'forte', 'rroba', 'zi', 'pluhur'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [
    { line: R('You are a large man with strong arms and clothes black with dust; you are the other mountain.', w('ti'), w('je'), w('nje'), w('burre'), w('i_art'), w('madh'), w('me'), w('krah_arm', 'krahë', 'arm'), w('te_link'), w('forte', 'fortë', 'strong'), w('dhe'), w('rroba'), w('te_link'), w('zi', 'zeza', 'black'), w('nga'), w('pluhur', 'pluhuri', 'dust'), p(';'), w('ti'), w('je'), w('mal', 'mali', 'the mountain'), w('tjeter'), p('.')) },
  ],
})

export default Object.freeze({
  babaTomor: BABA_TOMOR_APPEARANCE,
  shpiragu: SHPIRAG_APPEARANCE,
})
