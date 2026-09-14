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
  details: ['age', 'clothing', 'carried-object', 'movement'], practicalWordIds: ['ri', 'plis', 'bardhe', 'shpate', 'koke'],
  placement: { kind: 'replace', lineIndex: 0 },
  portraitLines: [{ line: R('You are young Halili in Jutbina; you wear a white felt cap on your head and hold a sword as Osmani approaches.', w('ti'), w('je'), w('halil', 'Halili'), w('i_art'), w('ri'), w('ne'), w('jutbina'), p(';'), w('mban'), w('nje'), w('plis'), w('te_link'), w('bardhe'), w('ne'), w('koke'), w('dhe'), w('nje'), w('shpate'), w('ne'), w('dore'), w('kur'), w('osman', 'Osmani'), w('vjen'), p('.')) }],
})

export default Object.freeze({ arnautOsmani: ARNAUT_OSMANI_APPEARANCE, sokolHalili: SOKOL_HALILI_APPEARANCE })
