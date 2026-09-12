import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-bee-spider-cicada', ...config })

export const THREE_SISTERS_MOTHER_APPEARANCE = portrait({
  npcId: 'nenaTriMotrave', nodeId: 'bleta1',
  details: ['age', 'condition', 'posture', 'location'], practicalWordIds: ['nene', 'vjeter', 'semur', 'batanije', 'dritare'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('In the house, an old sick mother rests beneath a blanket beside the window.', w('ne', 'Në'), w('shtepi'), p(','), w('nje'), w('nene'), w('e_art'), w('vjeter'), w('dhe'), w('e_art'), w('semur'), w('rri'), w('nen'), w('nje'), w('batanije'), w('prane'), w('dritare', 'dritares'), p('.')) }],
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
