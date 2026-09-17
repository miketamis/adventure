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
  details: ['movement', 'carried-object', 'colour'],
  practicalWordIds: ['ec', 'shpejt', 'cante', 'kuq', 'krah_arm'],
  placement: { kind: 'insert-after', lineIndex: 1 },
  portraitLines: [
    { known: false, excluded: 'flag:eliraDeparted', line: R('The woman coming from the village walks quickly across the bridge, with a red bag on her arm.', w('grua', 'gruaja', 'the woman'), w('qe'), w('vjen'), w('nga'), w('fshat', 'fshati'), w('ec', 'ecën'), w('shpejt'), w('mbi'), w('ure', 'urë'), p(','), w('me'), w('nje'), w('cante'), w('te_link'), w('kuq', 'kuqe', 'red'), w('ne'), w('krah_arm'), p('.')) },
    { known: true, excluded: 'flag:eliraDeparted', line: R('Elira, coming from the village, walks quickly across the bridge, with a red bag on her arm.', w('elira'), p(','), w('qe'), w('vjen'), w('nga'), w('fshat', 'fshati'), p(','), w('ec', 'ecën'), w('shpejt'), w('mbi'), w('ure', 'urë'), p(','), w('me'), w('nje'), w('cante'), w('te_link'), w('kuq', 'kuqe', 'red'), w('ne'), w('krah_arm'), p('.')) },
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

export const GJON_GUEST_APPEARANCE = portrait({
  npcId: 'gjonMik', nodeId: 'sofraMikut2',
  presence: 'runtime',
  details: ['clothing', 'carried-object', 'condition'],
  practicalWordIds: ['rroba', 'cante', 'lagur'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [
    { known: false, line: R('The traveller has wet clothes, and a leather bag rests beside him.', w('udhetar', 'udhëtari', 'the traveller'), w('ka'), w('rroba'), w('te_link'), w('lagur', 'lagura', 'wet'), p(','), w('dhe'), w('nje'), w('cante', 'çantë', 'bag'), w('prej'), w('lekure', 'lëkure', 'leather'), w('rri'), w('prane'), w('tij'), p('.')) },
    { known: true, line: R('Gjon has wet clothes, and a leather bag rests beside him.', w('gjon'), w('ka'), w('rroba'), w('te_link'), w('lagur', 'lagura', 'wet'), p(','), w('dhe'), w('nje'), w('cante', 'çantë', 'bag'), w('prej'), w('lekure', 'lëkure', 'leather'), w('rri'), w('prane'), w('tij'), p('.')) },
  ],
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
  details: ['hair', 'carried-object', 'posture', 'location'],
  practicalWordIds: ['mjeker', 'bardhe', 'shkop', 'pus', 'thate'],
  placement: { kind: 'replace', lineIndex: 22 },
  portraitLines: [
    { line: R('An old man with a white beard holds a long staff and watches the dry well.', w('nje'), w('plak'), w('me'), w('mjeker'), w('te_link'), w('bardhe'), w('mban'), w('nje'), w('shkop'), w('te_link'), w('gjate'), w('dhe'), w('sheh'), w('pus', 'pusin'), w('e_art'), w('thate'), p('.')) },
  ],
})

export const SHEPHERD_APPEARANCE = portrait({
  npcId: 'bari', nodeId: 'bariu',
  presence: 'runtime',
  details: ['voice', 'carried-object', 'work-marks'],
  practicalWordIds: ['fishkellen', 'dhi', 'shkop', 'kepuce', 'balte'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [
    { line: R('The shepherd whistles among the goats and carries a long staff; his shoes are muddy.', w('bari', 'bariu', 'the shepherd'), w('fishkellen'), w('mes'), w('dhi', 'dhive', 'the goats'), w('dhe'), w('mban'), w('nje'), w('shkop'), w('te_link'), w('gjate'), p(';'), w('kepuce', 'këpucët'), w('e_link'), w('tij'), w('ka', 'kanë'), w('balte'), p('.')) },
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
  details: ['carried-object', 'hands', 'work-marks'],
  practicalWordIds: ['buke', 'kripe', 'cante', 'para_money', 'dore'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [
    { line: R('The trader holds bread and salt in one hand and a money bag in the other, then says:', w('tregtar', 'tregtari', 'the trader'), w('mban'), w('buke'), w('dhe'), w('kripe'), w('ne', 'në', 'in'), w('nje'), w('dore'), w('dhe'), w('nje'), w('cante'), w('me'), w('para_money'), w('ne', 'në', 'in'), w('dore', 'dorën'), w('tjeter', 'tjetër'), p(','), w('pastaj'), w('thote'), p(':')) },
  ],
})

export const HEALER_APPEARANCE = portrait({
  npcId: 'sheruesi', nodeId: 'sheruesi',
  details: ['carried-object', 'hands', 'work-marks'],
  practicalWordIds: ['sherues', 'lidh', 'fashe', 'paster', 'krah_arm', 'udhetar'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [
    { line: R("The healer binds a clean bandage around a traveller's arm, then says:", w('sherues', 'shëruesi', 'the healer'), w('lidh'), w('nje'), w('fashe'), w('te_link'), w('paster'), w('rreth'), w('krah_arm', 'krahut'), w('te_link'), w('nje'), w('udhetar', 'udhëtari'), p(','), w('pastaj'), w('thote'), p(':')) },
  ],
})

export const INNKEEPER_APPEARANCE = portrait({
  npcId: 'bujtinari', nodeId: 'bujtina',
  details: ['carried-object', 'hands', 'location'],
  practicalWordIds: ['zjarr', 'celes', 'dhome', 'filxhan', 'kafe'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [
    { line: R('Beside the fire, the woman holds the room keys and a cup of coffee, then says:', w('prane'), w('zjarr', 'zjarrit'), p(','), w('grua', 'gruaja', 'the woman'), w('mban'), w('celes', 'çelësat', 'the keys'), w('e_link'), w('dhome', 'dhomave', 'the rooms'), w('dhe'), w('nje'), w('filxhan'), w('kafe'), p(','), w('pastaj'), w('thote'), p(':')) },
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
  gjonMik: GJON_GUEST_APPEARANCE,
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
