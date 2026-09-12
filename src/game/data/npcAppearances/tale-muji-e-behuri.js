import {
  defineNpcFirstEncounter,
  npcPortraitLine as R,
  npcPunctuation as p,
  npcWord as w,
} from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-muji-e-behuri', ...config })

export const OSMAN_AGA_APPEARANCE = portrait({
  npcId: 'osmanAga', nodeId: 'behuriNdarja',
  details: ['age', 'hair', 'carried-object', 'hands'],
  practicalWordIds: ['plak', 'flok', 'shpate', 'djathte'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [{ line: R('Old Osman Aga, with white hair and a sword in his right hand, rides ahead of the second company.', w('osman', 'Osman Aga', 'Osman Aga'), p(','), w('nje'), w('plak'), w('me'), w('flok'), w('te_link'), w('bardhe'), w('dhe'), w('nje'), w('shpate'), w('ne'), w('dore', 'dorën'), w('e_art'), w('djathte'), p(','), w('ec', 'ecën'), w('para', 'përpara', 'ahead'), w('te_link'), w('cete', 'çetës', 'of the company'), p('.')) }],
})

export const MUJO_ORA_APPEARANCE = portrait({
  npcId: 'oraMujit', nodeId: 'behuriBurimi',
  details: ['hair', 'clothing', 'posture', 'location'],
  practicalWordIds: ['ora', 'flok', 'gjate', 'qete', 'burim', 'rroba'],
  placement: { kind: 'insert-after', lineIndex: 2 },
  portraitLines: [{ line: R('Mujo’s Ora, with long hair and white clothes, waits calmly beside the spring.', w('ora', 'Ora'), w('e_link'), w('mujo', 'Mujit'), p(','), w('me'), w('flok'), w('te_link'), w('gjate'), w('dhe'), w('rroba'), w('te_link'), w('bardhe', 'bardha'), p(','), w('prit', 'pret'), w('e_art'), w('qete'), w('prane'), w('burim', 'burimit'), p('.')) }],
})

export default Object.freeze({
  osmanAga: OSMAN_AGA_APPEARANCE,
  oraMujit: MUJO_ORA_APPEARANCE,
})
