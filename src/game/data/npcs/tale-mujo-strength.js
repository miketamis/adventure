// NPCs new to "The Strength of Mujo" (Fuqija e Mujit) — see ../npcs/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it. Mujo himself is NOT duplicated here — he is
// the core NPC `mujo` in core-world.js, linked from the tale file's cast.
// ===========================================================================

export default {
  zanatShkembit: {
    name: 'zanat e shkëmbit', glyph: '🌕', kind: 'collective',
    role: 'the two mountain-fairy mothers of the cradle-cliff',
    backstory:
      'A pair of Zana, white as moonlight, whose twin infants lay crying in cradles by a boulder on the high pastures above Jutbina — met once, the night young Mujo (still an unknown cowherd) stopped to rock the children to sleep. In thanks they nursed him themselves, milk-drop by milk-drop, until he could shoulder a thousand-okë stone, then bound him their probatin (blood brother) forever after. NOT the single named Zana of the game\'s own river (zana1, "Zana e lumit") and NOT the larger unnamed troupe who dance and sing for travellers in the garden above Jutbina (binoshet\'s kopshtiZanave) — this is one specific PAIR, mothers first, met only this once, and never again staged.',
    folklore: ['zana', 'mujo-strength'],
    location: { status: 'placed', node: 'mujiZana1' },
    tales: { 'mujo-strength': 'zanat' },
  },
  femijetZanave: {
    name: 'dy fëmijët e zanave', glyph: '👶', kind: 'collective',
    role: 'the two zana infants left crying in their cradles',
    backstory:
      'Two babies, never named, left in twin cradles at the foot of the cliff while their Zana mothers were away — their crying is what draws Mujo to them in the dark, and their rocking is the good turn the Zanas repay with a hero\'s strength. They do not speak, age, or reappear; the tale is entirely their mothers\' gratitude.',
    folklore: ['mujo-strength'],
    location: { status: 'placed', node: 'mujiZana1' },
    tales: { 'mujo-strength': 'femijet' },
  },
  babaMujit: {
    name: 'i ati i Mujit', glyph: '👨', kind: 'human',
    role: 'the father who sends young Mujo out to earn wages',
    backstory:
      'A poor highland father with nothing to leave his son but a trade: while Mujo is still a boy he is sent off to a local lord to earn his keep as a hired hand. He is not otherwise part of the kreshnik songs and is never named beyond "baba" — a single sentence of the source, and no more.',
    folklore: ['mujo-strength'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-strength': 'baba' },
  },
  zotniaMujit: {
    name: 'zotnia', glyph: '🎩', kind: 'human',
    role: 'the lord who hires the boy Mujo as a cowherd',
    backstory:
      'A local man of means near Jutbina who takes Mujo on as a hired cowherd, sets him loose on the high pastures with the cattle, and loses him for good the day the boy walks a rope-length too many of his fellow herdsmen into the air. He is never named, never seen again once Mujo turns for home, and claims nothing more of the frontier songs that follow.',
    folklore: ['mujo-strength'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-strength': 'zotnia' },
  },
  nenaMujit: {
    name: 'e ëma e Mujit', glyph: '👵', kind: 'human',
    role: 'the mother Mujo goes home to',
    backstory:
      'Waits at Jutbina through her son\'s years as a hired cowherd; the song ends with Mujo turning his back on his master\'s service and coming home to see her — the one warm image the whole hard cycle of kreshnik battles is ever allowed to close on. NOT Ajkuna, Mujo\'s wife and Omer\'s mother (the "nëna" who hears of Omer\'s death in the later ballad) — a different woman, a different grief, decades apart in the cycle\'s own timeline.',
    folklore: ['mujo-strength'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-strength': 'nena' },
  },
  cobanijaJutbines: {
    name: 'çobanija', glyph: '🐄', kind: 'collective',
    role: 'the other hired herdsmen who mock Mujo, then learn better',
    backstory:
      'The lord\'s other cowherds, in the habit of besting Mujo at wrestling on the Plain of Jutbina and mocking him for losing — until the one morning he comes down from the mountain with a Zana\'s milk in him and throws their strongest five rope-lengths into the air. None of them ever tries him again.',
    folklore: ['mujo-strength'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-strength': 'cobanija' },
  },
}
