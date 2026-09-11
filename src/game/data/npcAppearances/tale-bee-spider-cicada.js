import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-bee-spider-cicada', ...config })

export const THREE_SISTERS_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaTriMotrave', nodeId: 'bleta1',
  details: ['age', 'hair', 'condition'], practicalWordIds: ['nene', 'vjeter', 'flok', 'semur'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('In the house lies an old sick mother with white hair.', w('ne', 'Në'), w('shtepi'), w('rri'), w('nje'), w('nene'), w('e_art'), w('vjeter'), w('dhe'), w('e_art'), w('semur'), w('me'), w('flok'), w('te_link'), w('bardhe'), p('.')) }],
})

export const SPIDER_SISTER_APPEARANCE = portrait({
  npcId: 'motraMerimanga', nodeId: 'bleta1',
  details: ['age', 'clothing', 'carried-object'], practicalWordIds: ['motra', 'madh', 'rroba', 'qilim'],
  placement: { kind: 'replace', lineIndex: 2 },
  portraitLines: [{ line: R('The eldest sister, in dark clothes, works on a rug with quick hands.', w('motra'), w('e_art'), w('madh'), p(','), w('me'), w('rroba'), w('te_link'), w('erret'), p(','), w('punon'), w('ne'), w('nje'), w('qilim'), w('me'), w('dore', 'duar'), w('te_link'), w('shpejt'), p('.')) }],
})

export const CICADA_SISTER_APPEARANCE = portrait({
  npcId: 'motraGjinkalla', nodeId: 'bleta1',
  details: ['age', 'clothing', 'voice'], practicalWordIds: ['motra', 'dy', 'rroba', 'ze'],
  placement: { kind: 'replace', lineIndex: 3 },
  portraitLines: [{ line: R('The second sister wears red clothes and sings with a loud voice.', w('motra'), w('e_art'), w('dy', 'dytë'), w('vesh'), w('rroba'), w('te_link'), w('kuq', 'kuqe'), w('dhe'), w('kendo', 'këndon'), w('me'), w('nje'), w('ze'), w('te_link'), w('madh'), p('.')) }],
})

export const BEE_SISTER_APPEARANCE = portrait({
  npcId: 'motraBleta', nodeId: 'bleta1',
  details: ['age', 'clothing', 'carried-object'], practicalWordIds: ['motra', 'vogel', 'buke', 'uje'],
  placement: { kind: 'replace', lineIndex: 4 },
  portraitLines: [{ line: R('The youngest sister carries bread and water to her mother.', w('motra'), w('e_art'), w('vogel'), w('i_obj'), w('sjell'), w('nene', 'nënës'), w('buke'), w('dhe'), w('uje'), p('.')) }],
})

export default Object.freeze({ nenaTriMotrave: THREE_SISTERS_MOTHER_APPEARANCE, motraMerimanga: SPIDER_SISTER_APPEARANCE, motraGjinkalla: CICADA_SISTER_APPEARANCE, motraBleta: BEE_SISTER_APPEARANCE })
