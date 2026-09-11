import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-rozafa', ...config })
const withBrothers = { kind: 'insert-after', lineIndex: 3 }
const inMorningHouse = { kind: 'insert-after', lineIndex: 0 }

export const ELDEST_BROTHER_APPEARANCE = portrait({
  npcId: 'vellaMadh', nodeId: 'kalaMjegull',
  details: ['carried-object', 'hands', 'work-marks'],
  practicalWordIds: ['cekic', 'dore', 'djathte', 'pluhur', 'rroba'],
  placement: withBrothers,
  portraitLines: [
    { line: R('The eldest brother holds a hammer in his right hand, with dust on his clothes.', w('vella', 'vëllai', 'the brother'), w('i_art'), w('madh'), w('mban'), w('cekic', 'çekiçin', 'the hammer'), w('ne', 'në', 'in'), w('dore', 'dorën', 'the hand'), w('e_art'), w('djathte'), p(','), w('me'), w('pluhur'), w('mbi'), w('rroba'), p('.')) },
  ],
})

export const MIDDLE_BROTHER_APPEARANCE = portrait({
  npcId: 'vellaMesit', nodeId: 'kalaMjegull',
  details: ['clothing', 'carried-object', 'hands'],
  practicalWordIds: ['kemishe', 'bardhe', 'gur', 'dore'],
  placement: withBrothers,
  portraitLines: [
    { line: R('The other brother has a white shirt and holds stones in his hands.', w('vella', 'vëllai', 'the brother'), w('tjeter'), w('ka'), w('nje'), w('kemishe'), w('te_link'), w('bardhe'), w('dhe'), w('mban'), w('gur', 'gurë', 'stones'), w('ne', 'në', 'in'), w('dore', 'duar', 'hands'), p('.')) },
  ],
})

export const YOUNGEST_BROTHER_APPEARANCE = portrait({
  npcId: 'vellaVogel', nodeId: 'kalaMjegull',
  details: ['face', 'carried-object', 'work-marks'],
  practicalWordIds: ['fytyre', 'pluhur', 'cekic', 'dore'],
  placement: withBrothers,
  portraitLines: [
    { line: R('The youngest brother has dust on his face and a hammer in his hand.', w('vella', 'vëllai', 'the brother'), w('i_art'), w('vogel'), w('ka'), w('pluhur'), w('ne', 'në', 'on'), w('fytyre'), w('dhe'), w('nje'), w('cekic'), w('ne', 'në', 'in'), w('dore'), p('.')) },
  ],
})

export const ELDEST_WIFE_APPEARANCE = portrait({
  npcId: 'gruaMadhe', nodeId: 'kalaMengjes',
  details: ['clothing', 'colour', 'condition'],
  practicalWordIds: ['grua', 'vella', 'shami', 'bardhe', 'fytyre', 'lodhur'],
  placement: inMorningHouse,
  portraitLines: [
    { line: R('The eldest brother’s wife has a white headscarf and a tired face.', w('grua', 'gruaja', 'the woman'), w('e_link'), w('vella', 'vëllait', 'the brother'), w('te_link'), w('madh'), w('ka'), w('nje'), w('shami'), w('te_link'), w('bardhe'), w('dhe'), w('nje'), w('fytyre'), w('te_link'), w('lodhur'), p('.')) },
  ],
})

export const MIDDLE_WIFE_APPEARANCE = portrait({
  npcId: 'gruaMesit', nodeId: 'kalaMengjes',
  details: ['carried-object', 'posture', 'clothing'],
  practicalWordIds: ['grua', 'shporte', 'rroba', 'paster', 'dere'],
  placement: inMorningHouse,
  portraitLines: [
    { line: R('The other wife, in clean clothes, holds a basket beside the door.', w('grua', 'gruaja', 'the woman'), w('tjeter'), p(','), w('me'), w('rroba'), w('te_link'), w('paster', 'pastra', 'clean'), p(','), w('mban'), w('nje'), w('shporte'), w('prane'), w('dere', 'derës', 'the door'), p('.')) },
  ],
})

export const BROTHERS_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaVellezerve', nodeId: 'kalaMengjes',
  details: ['age', 'carried-object', 'hands'],
  practicalWordIds: ['nene', 'vjeter', 'shporte', 'buke', 'dore'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [
    { line: R('The old mother brings a basket of bread in her hands.', w('nene', 'nëna', 'the mother'), w('e_art'), w('vjeter'), w('sjell'), w('nje'), w('shporte'), w('me'), w('buke'), w('ne', 'në', 'in'), w('dore', 'duar', 'hands'), p('.')) },
  ],
})

export const ROZAFA_SON_APPEARANCE = portrait({
  npcId: 'djaliRozafes', nodeId: 'kalaNgjitje',
  details: ['age', 'posture', 'memorable-feature'],
  practicalWordIds: ['femije', 'vogel', 'djep', 'nene'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [
    { line: R('The small child sleeps in a cradle beside his mother.', w('femije', 'fëmija', 'the child'), w('i_art'), w('vogel'), w('fle'), w('ne', 'në', 'in'), w('nje'), w('djep'), w('prane'), w('nene', 'nënës', 'the mother'), p('.')) },
  ],
})

export const CASTLE_OLD_MAN_APPEARANCE = portrait({
  npcId: 'plakuKalase', nodeId: 'kalaMjegull',
  details: ['face', 'colour', 'carried-object'],
  practicalWordIds: ['plak', 'mjeker', 'bardhe', 'shkop', 'mur'],
  placement: { kind: 'insert-after', lineIndex: 11 },
  portraitLines: [
    { line: R('An old man with a white beard holds a staff and watches the wall.', w('nje'), w('plak'), w('me'), w('mjeker'), w('te_link'), w('bardhe'), w('mban'), w('nje'), w('shkop'), w('dhe'), w('sheh'), w('mur', 'murin', 'the wall'), p('.')) },
  ],
})

export default Object.freeze({
  vellaMadh: ELDEST_BROTHER_APPEARANCE,
  vellaMesit: MIDDLE_BROTHER_APPEARANCE,
  vellaVogel: YOUNGEST_BROTHER_APPEARANCE,
  gruaMadhe: ELDEST_WIFE_APPEARANCE,
  gruaMesit: MIDDLE_WIFE_APPEARANCE,
  nenaVellezerve: BROTHERS_MOTHER_APPEARANCE,
  djaliRozafes: ROZAFA_SON_APPEARANCE,
  plakuKalase: CASTLE_OLD_MAN_APPEARANCE,
})
