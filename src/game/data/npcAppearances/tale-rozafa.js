import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-rozafa', ...config })
const withBrothers = { kind: 'insert-after', lineIndex: 3 }
const inMorningHouse = { kind: 'insert-after', lineIndex: 3 }

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
  details: ['condition', 'posture', 'location'],
  practicalWordIds: ['grua', 'vella', 'shtrihet', 'shtrat', 'eshte', 'semure'],
  placement: inMorningHouse,
  portraitLines: [
    { line: R('The eldest brother’s wife lies down in bed and says that she is ill.', w('grua', 'gruaja', 'the woman'), w('e_link'), w('vella', 'vëllait', 'the brother'), w('te_link'), w('madh'), w('shtrihet'), w('ne', 'në', 'in'), w('shtrat'), w('dhe'), w('thote'), w('se'), w('eshte'), w('e_art'), w('semure', 'sëmurë'), p('.')) },
  ],
})

export const MIDDLE_WIFE_APPEARANCE = portrait({
  npcId: 'gruaMesit', nodeId: 'kalaMengjes',
  details: ['carried-object', 'posture', 'location'],
  practicalWordIds: ['grua', 'shporte', 'dere', 'sheh', 'rruge', 'drejt', 'prind'],
  placement: inMorningHouse,
  portraitLines: [
    { line: R('The other wife holds her basket by the door and watches the road toward her parents.', w('grua', 'gruaja', 'the woman'), w('tjeter'), w('mban'), w('shporte', 'shportën'), w('prane'), w('dere', 'derës', 'the door'), w('dhe'), w('sheh'), w('rruge', 'rrugën'), w('drejt'), w('prind', 'prindërve'), p('.')) },
  ],
})

export const BROTHERS_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaVellezerve', nodeId: 'kalaMengjes',
  details: ['age', 'carried-object', 'hands'],
  practicalWordIds: ['nene', 'vjeter', 'shporte', 'buke', 'dore'],
  placement: { kind: 'replace', lineIndex: 3 },
  portraitLines: [
    { line: R('The old mother brings a basket of bread in her hands.', w('nene', 'nëna', 'the mother'), w('e_art'), w('vjeter'), w('sjell'), w('nje'), w('shporte'), w('me'), w('buke'), w('ne', 'në', 'in'), w('dore', 'duar', 'hands'), p('.')) },
  ],
})

export const ROZAFA_SON_APPEARANCE = portrait({
  npcId: 'djaliRozafes', nodeId: 'kalaNgjitje',
  details: ['age', 'posture', 'location'],
  practicalWordIds: ['femije', 'vogel', 'fle', 'djep', 'gji', 'nene'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [
    { line: R('The small child sleeps in the cradle, close to his mother’s breast.', w('femije', 'fëmija', 'the child'), w('i_art'), w('vogel'), w('fle'), w('ne', 'në', 'in'), w('djep', 'djepin'), p(','), w('prane'), w('gji', 'gjirit'), w('te_link'), w('nene', 'nënës', 'the mother'), p('.')) },
  ],
})

export const CASTLE_OLD_MAN_APPEARANCE = portrait({
  npcId: 'plakuKalase', nodeId: 'kalaMjegull',
  details: ['face', 'colour', 'carried-object', 'movement'],
  practicalWordIds: ['mjegull', 'vjen', 'plak', 'mjeker', 'bardhe', 'shkop', 'mur'],
  placement: { kind: 'insert-after', lineIndex: 11 },
  portraitLines: [
    { line: R('From the mist comes an old man with a white beard; he holds his staff beside the wall.', w('nga', 'Nga', 'from'), w('mjegull', 'mjegulla', 'the mist'), w('vjen'), w('nje'), w('plak'), w('me'), w('mjeker'), w('te_link'), w('bardhe'), p(';'), w('mban'), w('shkop', 'shkopin'), w('prane'), w('mur', 'murit', 'the wall'), p('.')) },
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
