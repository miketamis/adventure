import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'core-world', ...config })

// Retain the already visible voice portrait verbatim; no extra scene line or
// invented appearance is needed when this companion gains a runtime identity.
export const SEA_ROAD_TRAVELLER_APPEARANCE = portrait({
  npcId: 'seaRoadTraveller', nodeId: 'qytetiUdhetar', presence: 'authored',
  details: ['voice'], practicalWordIds: ['flet', 'shpejt', 'fjale', 'vjen', 'shi'],
  placement: { kind: 'replace', lineIndex: 3 },
  portraitLines: [{ excluded: ['rendezvous:seaRoadWalk:known', 'visited:lamtumira'],
    line: R('The traveller speaks quickly: the words come like rain.', w('udhetar', 'udhëtari', 'the traveller'), w('flet'), w('shpejt'), p(':'), w('fjale', 'fjalët', 'the words'), w('vjen', 'vijnë', 'come'), w('si'), w('shi'), p('.')) }],
})

export const ZANA_APPEARANCE = portrait({
  npcId: 'zana', nodeId: 'zana1',
  details: ['hair', 'condition', 'carried-object', 'location'],
  practicalWordIds: ['flok', 'gjate', 'lagur', 'lule', 'dore', 'lume'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('The Zana beside the river has long wet hair and a flower in her hand.', w('zane', 'Zana'), w('prane'), w('lume', 'lumit'), w('ka'), w('flok'), w('te_link'), w('gjate'), w('dhe'), w('te_link'), w('lagur'), p(','), w('me'), w('nje'), w('lule'), w('ne'), w('dore'), p('.')) }],
})

export const BOLLA_APPEARANCE = portrait({
  npcId: 'bolla', nodeId: 'bolla1',
  details: ['build', 'face', 'condition'],
  practicalWordIds: ['gjarper', 'madh', 'sy', 'hap'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('A great serpent sleeps in the river with one eye open.', w('nje'), w('gjarper'), w('i_art'), w('madh'), w('fle'), w('ne'), w('lume'), w('me'), w('nje'), w('sy'), w('te_link'), w('hap', 'hapur'), p('.')) }],
})

export const THRESHOLD_SERPENT_APPEARANCE = portrait({
  npcId: 'gjarpri', nodeId: 'gjarpri',
  details: ['build', 'face', 'colour', 'movement'],
  practicalWordIds: ['gjarper', 'madh', 'sy', 'verdhe', 'trup', 'leviz'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('A great serpent lies around the stone; its yellow eyes watch you, but its body does not move.', w('nje'), w('gjarper'), w('i_art'), w('madh'), w('rri'), w('rreth'), w('gur', 'gurit'), p(';'), w('sy', 'sytë'), w('e_link'), w('tij'), w('te_link'), w('verdhe'), w('te_obj'), w('sheh', 'shohin'), p(','), w('por'), w('trup', 'trupi'), w('nuk'), w('leviz'), p('.')) }],
})

export const GREAT_KULSHEDRA_APPEARANCE = portrait({
  npcId: 'kulshedraMadhe', nodeId: 'kulshedra1',
  details: ['build', 'hair', 'colour', 'memorable-feature'],
  practicalWordIds: ['kulshedra', 'koke', 'goje', 'zjarr', 'flok', 'kuq'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('The great Kulshedra raises many heads; fire comes from every mouth, and its red hair moves.', w('kulshedra'), w('e_art'), w('madh', 'madhe'), w('ngre'), w('shume'), w('koke', 'koka'), p(';'), w('nga'), w('cdo'), w('goje'), w('dil', 'del'), w('zjarr'), p(','), w('dhe'), w('flok', 'flokët'), w('e_art'), w('kuq', 'kuq'), w('leviz', 'lëvizin'), p('.')) }],
})

export const EARTHLY_BEAUTY_APPEARANCE = portrait({
  npcId: 'bukuraDheut', nodeId: 'bukura1',
  details: ['hair', 'clothing', 'colour', 'posture'],
  practicalWordIds: ['qete', 'flok', 'gjate', 'ar', 'toke', 'bardhe'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('The Earthly Beauty sits calmly; her long golden hair falls to the ground over her white clothes.', w('bukura'), w('e_link'), w('dhe_earth', 'Dheut'), w('rri'), w('e_art'), w('qete'), p(';'), w('flok', 'flokët'), w('e_link'), w('saj'), w('te_link'), w('gjate'), w('si'), w('ar'), w('bie', 'bien'), w('deri'), w('ne'), w('toke'), w('mbi'), w('rroba', 'rrobat'), w('e_art'), w('bardhe', 'bardha'), p('.')) }],
})

export const SEA_BEAUTY_APPEARANCE = portrait({
  npcId: 'bukuraDetit', nodeId: 'detiThelle2',
  details: ['hair', 'clothing', 'colour', 'location', 'movement'],
  practicalWordIds: ['rroba', 'kalter', 'uje', 'kembe', 'lekundet', 'flok', 'arte', 'vezullon'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R("The Beauty of the Sea waits in blue clothes; water ripples around her feet and her golden hair shimmers.", w('bukura'), w('e_link'), w('det', 'Detit'), w('prit', 'pret'), w('me'), w('rroba'), w('te_link'), w('kalter', 'kaltra'), p(';'), w('uje', 'uji'), w('lekundet'), w('rreth'), w('kembe', 'këmbëve'), w('te_link'), w('saj'), w('dhe'), w('flok', 'flokët'), w('e_art'), w('arte'), w('vezullon', 'vezullojnë'), p('.')) }],
})

export const SEA_CHAMPION_APPEARANCE = portrait({
  npcId: 'balozi', nodeId: 'balozLufte',
  details: ['build', 'clothing', 'carried-object'],
  practicalWordIds: ['baloz', 'madh', 'rroba', 'gur'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('At dawn a huge sea-champion in black clothes comes from the sea with a stone in his hand.', w('ne', 'Në'), w('agim'), w('nje'), w('baloz'), w('i_art'), w('madh'), w('me'), w('rroba'), w('te_link'), w('zi', 'zeza'), w('vjen'), w('nga'), w('det'), w('me'), w('nje'), w('gur'), w('ne'), w('dore'), p('.')) }],
})

export const GJERGJ_ELEZ_APPEARANCE = portrait({
  npcId: 'gjergjElez', nodeId: 'bregu',
  details: ['condition', 'build', 'work-marks'],
  practicalWordIds: ['trim', 'lodhur', 'trup', 'plage'],
  placement: { kind: 'replace', lineIndex: 6 },
  portraitLines: [{ excluded: 'fact:coastalBalozDefeated', line: R('Inside the tower lies a tired hero with nine wounds on his body.', w('brenda'), w('kulle', 'kullës'), w('rri'), w('nje'), w('trim'), w('i_art'), w('lodhur'), w('me'), w('nente'), w('plage'), w('ne'), w('trup'), p('.')) }],
})

export const GJERGJ_SISTER_APPEARANCE = portrait({
  npcId: 'motraGjergjit', nodeId: 'balozMotra',
  details: ['hair', 'carried-object', 'condition'],
  practicalWordIds: ['motra', 'flok', 'gjak', 'uje'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('His sister, with blood in her long hair and a bowl of water in her hands, says:', w('motra'), w('e_link'), w('tij'), p(','), w('me'), w('gjak'), w('ne'), w('flok'), w('te_link'), w('gjate'), w('dhe'), w('uje'), w('ne'), w('dore', 'duar'), p(','), w('thote'), p(':')) }],
})

export const MUJO_APPEARANCE = portrait({
  npcId: 'mujo', nodeId: 'mujo1',
  details: ['build', 'hands', 'carried-object', 'memorable-feature'],
  practicalWordIds: ['shpate', 'dore', 'tjeter', 'ngre', 'gur', 'madh'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('Mujo holds a sword in one hand; with the other, he lifts a great stone.', w('mujo'), w('mban'), w('nje'), w('shpate'), w('ne'), w('nje'), w('dore'), p(';'), w('me'), w('dore', 'dorën'), w('tjeter', 'tjetër'), p(','), w('ai'), w('ngre'), w('nje'), w('gur'), w('te_link'), w('madh'), p('.')) }],
})

export const THREE_FATES_APPEARANCE = portrait({
  npcId: 'fatet', nodeId: 'djepi2',
  details: ['collective-contrast', 'clothing', 'colour', 'location'],
  practicalWordIds: ['djep', 'bardhe', 'verdhe', 'zi'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('Three Fates wait beside the cradle: one in white, one in yellow, and one in black.', w('prane'), w('djep'), w('prit', 'presin'), w('tre', 'tri'), w('ora', 'Ora'), p(':'), w('nje'), w('me'), w('te_link'), w('bardhe'), p(','), w('nje'), w('me'), w('te_link'), w('verdhe'), p(','), w('dhe'), w('nje'), w('me'), w('te_link'), w('zi'), p('.')) }],
})

export const NIGHT_WITCH_APPEARANCE = portrait({
  npcId: 'shtriga', nodeId: 'shtrigaNate',
  details: ['face', 'hands', 'colour'],
  practicalWordIds: ['plake', 'sy', 'kuq', 'thua'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('At night the old woman becomes a witch with red eyes and long fingernails.', w('naten'), w('plake', 'plaka'), w('behet'), w('nje'), w('shtrige'), w('me'), w('sy'), w('te_link'), w('kuq'), w('dhe'), w('thua'), w('te_link'), w('gjate'), p('.')) }],
})

export const SUN_APPEARANCE = portrait({
  npcId: 'dielli', nodeId: 'diellShtepi1',
  details: ['face', 'clothing', 'colour', 'location'],
  practicalWordIds: ['diell', 'shtepi', 'rroba', 'arte', 'shkelqen', 'fytyre', 'drite'],
  placement: { kind: 'replace', lineIndex: 1 },
  portraitLines: [{ line: R('The Sun stands in his house; his golden clothes shine, and light falls around his face.', w('diell', 'Dielli'), w('rri'), w('ne'), w('shtepi', 'shtëpinë'), w('e_link'), w('tij'), p(';'), w('rroba', 'rrobat'), w('e_link'), w('tij'), w('te_link'), w('arte', 'arta'), w('shkelqen', 'shkëlqejnë'), p(','), w('dhe'), w('drite', 'drita'), w('bie'), w('rreth'), w('fytyre', 'fytyrës'), w('te_link', 'së'), w('tij'), p('.')) }],
})

export const MOON_APPEARANCE = portrait({
  npcId: 'hena', nodeId: 'henaPaqe',
  details: ['hair', 'clothing', 'colour', 'posture'],
  practicalWordIds: ['hene', 'qete', 'flok', 'argjend', 'vezullon', 'rroba', 'bardhe'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('The Moon sits quietly in the light; her silver hair shimmers over her white clothes.', w('hene', 'Hëna'), w('rri'), w('e_art'), w('qete'), w('ne'), w('drite'), p(';'), w('flok', 'flokët'), w('e_link'), w('saj'), w('prej'), w('argjend', 'argjendi'), w('vezullon', 'vezullojnë'), w('mbi'), w('rroba', 'rrobat'), w('e_link'), w('saj'), w('te_link'), w('bardhe', 'bardha'), p('.')) }],
})

export const PRENDE_APPEARANCE = portrait({
  npcId: 'prende', nodeId: 'prende1',
  details: ['clothing', 'colour', 'companion'],
  practicalWordIds: ['prende', 'rroba', 'kuq', 'dallendyshe'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('Prende waits by the water in red clothes, with a swallow on her shoulder.', w('prende', 'Prende'), w('prit', 'pret'), w('prane'), w('uje'), w('me'), w('rroba'), w('te_link'), w('kuq', 'kuqe'), p(','), w('me'), w('nje'), w('dallendyshe'), w('ne'), w('krah_arm'), p('.')) }],
})

export const MARBLE_KING_APPEARANCE = portrait({
  npcId: 'mbretiMermer', nodeId: 'kopshtMermer2',
  details: ['face', 'condition', 'material'],
  practicalWordIds: ['mbret', 'fytyre', 'bardhe', 'gur'],
  placement: { kind: 'replace', lineIndex: 3 },
  portraitLines: [{ line: R('A motionless king sits there, his white face as hard as stone.', w('nje'), w('mbret'), w('rri'), w('atje'), w('pa'), w('leviz'), p(';'), w('fytyre', 'fytyra'), w('e_link'), w('tij'), w('e_art'), w('bardhe'), w('eshte'), w('e_art'), w('forte'), w('si'), w('gur'), p('.')) }],
})

export const ROZAFA_APPEARANCE = portrait({
  npcId: 'rozafa', nodeId: 'kalaMur',
  details: ['condition', 'face', 'hands'],
  practicalWordIds: ['nene', 'mur', 'sy', 'dore'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('The young mother is inside the wall, but one eye and one hand remain outside.', w('nene', 'Nëna'), w('e_art'), w('ri'), w('eshte'), w('brenda'), w('mur'), p(','), w('por'), w('nje'), w('sy'), w('dhe'), w('nje'), w('dore'), w('rri', 'rrijnë'), w('jashte'), p('.')) }],
})

export default Object.freeze({
  seaRoadTraveller: SEA_ROAD_TRAVELLER_APPEARANCE,
  zana: ZANA_APPEARANCE,
  bolla: BOLLA_APPEARANCE,
  gjarpri: THRESHOLD_SERPENT_APPEARANCE,
  kulshedraMadhe: GREAT_KULSHEDRA_APPEARANCE,
  bukuraDheut: EARTHLY_BEAUTY_APPEARANCE,
  bukuraDetit: SEA_BEAUTY_APPEARANCE,
  balozi: SEA_CHAMPION_APPEARANCE,
  gjergjElez: GJERGJ_ELEZ_APPEARANCE,
  motraGjergjit: GJERGJ_SISTER_APPEARANCE,
  mujo: MUJO_APPEARANCE,
  fatet: THREE_FATES_APPEARANCE,
  shtriga: NIGHT_WITCH_APPEARANCE,
  dielli: SUN_APPEARANCE,
  hena: MOON_APPEARANCE,
  prende: PRENDE_APPEARANCE,
  mbretiMermer: MARBLE_KING_APPEARANCE,
  rozafa: ROZAFA_APPEARANCE,
})
