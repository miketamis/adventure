import { defineNpcFirstEncounter, npcPortraitLine as R, npcPunctuation as p, npcWord as w } from '../../npcAppearance.js'

const portrait = (config) => defineNpcFirstEncounter({ sourcePartition: 'tale-arnaut-osmani', ...config })

export const ARNAUT_OSMANI_APPEARANCE = portrait({
  npcId: 'arnautOsmani', nodeId: 'osmaniBurg',
  details: ['build', 'condition', 'clothing'], practicalWordIds: ['trim', 'forte', 'pranga', 'rroba'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('You are Osmani, a strong hero in worn clothes and iron shackles.', w('ti'), w('je'), w('osmani', 'Osmani'), p(','), w('nje'), w('trim'), w('i_art'), w('forte'), w('me'), w('rroba'), w('te_link'), w('vjeter'), w('dhe'), w('pranga'), w('prej'), w('hekur'), p('.')) }],
})

export const SOKOL_HALILI_APPEARANCE = portrait({
  npcId: 'sokolHalili', nodeId: 'haliliDeka',
  details: ['age', 'clothing', 'carried-object'], practicalWordIds: ['ri', 'plis', 'bardhe', 'shpate'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('You are young Halili in Jutbina, with a white felt cap and a sword in your hand.', w('ti'), w('je'), w('halil', 'Halili'), w('i_art'), w('ri'), w('ne'), w('jutbina'), p(','), w('me'), w('nje'), w('plis'), w('te_link'), w('bardhe'), w('dhe'), w('nje'), w('shpate'), w('ne'), w('dore'), p('.')) }],
})

export default Object.freeze({ arnautOsmani: ARNAUT_OSMANI_APPEARANCE, sokolHalili: SOKOL_HALILI_APPEARANCE })
