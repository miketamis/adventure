import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'core-village', ...config })

export const ELIRA_APPEARANCE = portrait({
  npcId: 'elira', nodeId: 'start',
  // Elira's opening approach is authored before her one-shot walking route is
  // started, so the scene itself—not route position—owns her presence here.
  presence: 'authored',
  details: ['hair', 'clothing', 'colour'],
  practicalWordIds: ['flok', 'rroba', 'zi', 'kuq'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [
    { known: false, excluded: 'flag:eliraDeparted', line: R('The woman approaching from the village has black hair and red clothes.', w('grua', 'gruaja', 'the woman'), w('qe'), w('vjen'), w('nga'), w('fshat'), w('ka'), w('flok'), w('te_link'), w('zi', 'zeza', 'black'), w('dhe'), w('rroba'), w('te_link'), w('kuq', 'kuqe', 'red'), p('.')) },
    { known: true, excluded: 'flag:eliraDeparted', line: R('Elira, approaching from the village, has black hair and red clothes.', w('elira'), p(','), w('qe'), w('vjen'), w('nga'), w('fshat'), p(','), w('ka'), w('flok'), w('te_link'), w('zi', 'zeza', 'black'), w('dhe'), w('rroba'), w('te_link'), w('kuq', 'kuqe', 'red'), p('.')) },
  ],
})

// These two portraits predate the partitioned projection system and remain
// embedded in content.js to preserve their reviewed line addresses. Their
// metadata now lives with the rest of the village partition.
export const WATER_CARRIER_APPEARANCE = defineNpcFirstEncounter({
  npcId: 'gruaUji',
  nodeId: 'gruaUji1',
  sourcePartition: 'core-village',
  details: ['clothing', 'carried-object', 'work-marks'],
  practicalWordIds: ['shami', 'kalter', 'kove', 'lagur'],
  embedded: true,
})

export const SPRING_GIRL_APPEARANCE = defineNpcFirstEncounter({
  npcId: 'vajzaKroi',
  nodeId: 'kroi1',
  sourcePartition: 'core-village',
  details: ['clothing', 'posture', 'carried-object'],
  practicalWordIds: ['rroba', 'kalter', 'kove'],
  embedded: true,
})

export const FOREST_CRONE_APPEARANCE = portrait({
  npcId: 'plakaPyllit', nodeId: 'pylliLoop',
  presence: 'runtime',
  details: ['movement', 'clothing', 'colour'],
  practicalWordIds: ['plake', 'shami', 'zi', 'ngadale'],
  placement: { kind: 'replace', lineIndex: 10 },
  portraitLines: [
    { line: R('A cold old woman in a black headscarf walks slowly beneath the trees.', w('nje'), w('plake'), w('e_art'), w('ftohte'), w('me'), w('nje'), w('shami'), w('te_link'), w('zi', 'zezë', 'black'), w('ec'), w('ngadale'), w('nen'), w('peme', 'pemët'), p('.')) },
  ],
})

export const SQUARE_ELDER_APPEARANCE = portrait({
  npcId: 'plakuSheshit', nodeId: 'fshatiSheshi',
  presence: 'runtime',
  details: ['hair', 'carried-object', 'posture'],
  practicalWordIds: ['mjeker', 'bardhe', 'shkop', 'dore'],
  placement: { kind: 'replace', lineIndex: 20 },
  portraitLines: [
    { line: R('An old man with a white beard leans on a long staff and watches you.', w('nje'), w('plak'), w('me'), w('mjeker'), w('te_link'), w('bardhe'), w('mban'), w('nje'), w('shkop'), w('te_link'), w('gjate'), w('ne', 'në', 'in'), w('dore'), w('dhe'), w('te_obj'), w('sheh'), p('.')) },
  ],
})

export const SHEPHERD_APPEARANCE = portrait({
  npcId: 'bari', nodeId: 'bariu',
  presence: 'runtime',
  details: ['clothing', 'carried-object', 'work-marks'],
  practicalWordIds: ['rroba', 'vjeter', 'shkop', 'dhi'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [
    { line: R('The shepherd wears old clothes and carries a long staff among the goats.', w('bari', 'bariu', 'the shepherd'), w('vesh'), w('rroba'), w('te_link'), w('vjeter', 'vjetra', 'old'), w('dhe'), w('mban'), w('nje'), w('shkop'), w('te_link'), w('gjate'), w('mes'), w('dhi', 'dhive', 'the goats'), p('.')) },
  ],
})

export const GATE_CRONE_APPEARANCE = portrait({
  npcId: 'plaka', nodeId: 'plaka',
  details: ['clothing', 'work-marks', 'hands'],
  practicalWordIds: ['kemishe', 'bardhe', 'miell', 'dore'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [
    { line: R('An old woman in a white shirt sits inside with flour on her hands.', w('nje'), w('plake'), w('me'), w('nje'), w('kemishe', 'këmishë', 'shirt'), w('te_link'), w('bardhe'), w('rri'), w('brenda'), w('me'), w('miell'), w('ne', 'në', 'on'), w('dore', 'duar', 'hands'), p('.')) },
  ],
})

export const AGA_YMER_APPEARANCE = portrait({
  npcId: 'agaYmer', nodeId: 'agaYmer1',
  details: ['clothing', 'work-marks', 'memorable-feature'],
  practicalWordIds: ['kemishe', 'vjeter', 'shenje', 'krah_arm'],
  placement: { kind: 'insert-after', lineIndex: 3 },
  portraitLines: [
    { line: R('The captive hero wears an old shirt; a mark remains on his arm.', w('trim', 'trimi', 'the hero'), w('ne', 'në', 'in'), w('burg'), w('vesh'), w('nje'), w('kemishe', 'këmishë', 'shirt'), w('te_link'), w('vjeter'), p(';'), w('nje'), w('shenje'), w('rri'), w('ne', 'në', 'on'), w('krah_arm', 'krahun'), w('e_link'), w('tij'), p('.')) },
  ],
})

export const TRADER_APPEARANCE = portrait({
  npcId: 'tregtari', nodeId: 'tregtari',
  details: ['clothing', 'carried-object', 'hands'],
  practicalWordIds: ['rroba', 'paster', 'cante', 'para_money'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [
    { line: R('The trader, in clean clothes with a money bag in his hand, says:', w('tregtar', 'tregtari', 'the trader'), p(','), w('me'), w('rroba'), w('te_link'), w('paster', 'pastra', 'clean'), w('dhe'), w('nje'), w('cante'), w('me'), w('para_money'), w('ne', 'në', 'in'), w('dore'), p(','), w('thote'), p(':')) },
  ],
})

export const HEALER_APPEARANCE = portrait({
  npcId: 'sheruesi', nodeId: 'sheruesi',
  details: ['clothing', 'carried-object', 'hands'],
  practicalWordIds: ['kemishe', 'paster', 'fashe', 'dore'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [
    { line: R('The healer, in a clean white shirt with a bandage in his hand, says:', w('sherues', 'shëruesi', 'the healer'), p(','), w('me'), w('nje'), w('kemishe', 'këmishë', 'shirt'), w('te_link'), w('bardhe'), w('dhe'), w('te_link'), w('paster'), w('me'), w('nje'), w('fashe'), w('ne', 'në', 'in'), w('dore'), p(','), w('thote'), p(':')) },
  ],
})

export const INNKEEPER_APPEARANCE = portrait({
  npcId: 'bujtinari', nodeId: 'bujtina',
  details: ['clothing', 'carried-object', 'posture'],
  practicalWordIds: ['grua', 'kemishe', 'bardhe', 'celes'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [
    { line: R('A woman in a white shirt stands beside the fire with the room keys and says:', w('nje'), w('grua'), w('me'), w('nje'), w('kemishe', 'këmishë', 'shirt'), w('te_link'), w('bardhe'), w('rri'), w('prane'), w('zjarr'), w('me'), w('celes', 'çelësat', 'the keys'), w('e_link'), w('dhome', 'dhomave', 'the rooms'), w('dhe'), w('thote'), p(':')) },
  ],
})

export const KOSTANDIN_APPEARANCE = portrait({
  npcId: 'kostandini', nodeId: 'kostandin2',
  details: ['condition', 'hair', 'clothing'],
  practicalWordIds: ['dhe_earth', 'flok', 'rroba', 'vdes'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [
    { line: R('The dead son comes from the grave with earth in his hair and on his clothes.', w('bir', 'biri', 'the son'), w('i_art'), w('vdes', 'vdekur', 'dead'), w('vjen'), w('nga'), w('varr'), w('me'), w('dhe_earth'), w('ne', 'në', 'in'), w('flok'), w('dhe'), w('mbi'), w('rroba'), w('e_link'), w('tij'), p('.')) },
  ],
})

export default Object.freeze({
  elira: ELIRA_APPEARANCE,
  gruaUji: WATER_CARRIER_APPEARANCE,
  vajzaKroi: SPRING_GIRL_APPEARANCE,
  plakaPyllit: FOREST_CRONE_APPEARANCE,
  plakuSheshit: SQUARE_ELDER_APPEARANCE,
  bari: SHEPHERD_APPEARANCE,
  plaka: GATE_CRONE_APPEARANCE,
  agaYmer: AGA_YMER_APPEARANCE,
  tregtari: TRADER_APPEARANCE,
  sheruesi: HEALER_APPEARANCE,
  bujtinari: INNKEEPER_APPEARANCE,
  kostandini: KOSTANDIN_APPEARANCE,
})
