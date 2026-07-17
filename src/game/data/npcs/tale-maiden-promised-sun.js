// NPCs: the promised-maiden tale (maiden-promised-sun) cast — see ../npcs/_SCHEMA.md
// for the format contract. One file per area/tale so parallel agents never collide.
// The Sun himself is CORE (core-world.js: dielli) and is linked from the tale's
// cast, not duplicated here.

export default {
  // ── the promised-maiden tale (maiden-promised-sun) ────────────────────────
  vajzaDiellit: {
    name: 'vajza e taksur Diellit', glyph: '👧', kind: 'human',
    role: 'the queen\'s daughter, vowed to the Sun before her birth',
    backstory: 'Born to a childless queen who begged God and the Sun for any child at all — and pledged the child back at twelve. Taken off the school lane in her twelfth year; wept over a cracked cabbage in the sky-garden ("as this cabbage cracks, so cracks my mother\'s heart"); called the stag HERSELF when the Kulshedra failed the carrier-test; kept the oak\'s one rule and stalled the beast with her own words («çap në shtëpi edhe kthehu»); hers is the one voice the black door opens for. Her story runs on past that door — the marble garden, the three-week vigil and the false bride are the goose-girl movement, its own tale.',
    folklore: ['maiden-promised-sun', 'goose-girl'],
    location: { status: 'placed', node: 'diellKopsht' },
    tales: { 'maiden-promised-sun': 'maiden' },
  },
  mbretereshaZeze: {
    name: 'mbretëresha e pallatit të zi', glyph: '👸', kind: 'human',
    role: 'the childless queen who vowed her daughter to the Sun',
    backstory: 'She went out day after day pleading with God and the Sun — a son, or at least a girl — and her own words set the price: the child back at twelve. When the Sun collected, she dyed the whole palace black, bolted the door and howled alone inside; the door opened exactly once, to her daughter\'s voice, and her grief broke into joy. Three okas of grass stand owed the stag at that door. NOT a widow of any other tale — this grief had a due date and left a debt.',
    folklore: ['maiden-promised-sun', 'goose-girl'],
    location: { status: 'placed', node: 'pallatiZi' },
    tales: { 'maiden-promised-sun': 'queen' },
  },
  kulshedraDiellit: {
    name: 'kulshedra e shtëpisë së Diellit', glyph: '🐉', kind: 'creature',
    role: 'the Kulshedra that lives in the Sun\'s house',
    backstory: 'It shares the Sun\'s house and scented the girl at once — «më bie erë soj mbret», royal stock — held off only by the Sun\'s one sentence: she is my child, do not touch her. At the carrier-test it answered honestly (her; her blood) and was passed over; the beast at the wayside oak is the SAME beast come for its answer, sent home by the maiden\'s stall and then lied down the wrong roads by the road-folk. A lesser house-kulshedra: NOT kulshedraMadhe (the many-headed duel of the player\'s own arc), and not the Kordha tale\'s road-brood mother or gate-guardian — a kulshedra is a kind, not a name.',
    folklore: ['maiden-promised-sun', 'kulshedra'],
    location: { status: 'placed', node: 'diellShtepi1' },
    tales: { 'maiden-promised-sun': 'kulshedra' },
  },
  dreriDiellit: {
    name: 'dreri (dredhi)', glyph: '🦌', kind: 'creature',
    role: 'the honest carrier — the stag that bore the maiden home',
    backstory: 'The creature the maiden called when the Kulshedra failed the Sun\'s test. Its answers won the errand — fresh grass when hunger takes it, cold water when thirst does — and it named one fee: three okas of grass from the girl\'s mother. It bore her home on its antlers, parked her up a wayside oak (one rule: come down for no one) while hunger took it, and outran the Kulshedra by telling every soul on the road to lie about the way. Dozon\'s telling closes at the reunion with the fee still owed; the game\'s homecoming stages the payment.',
    folklore: ['maiden-promised-sun'],
    location: { status: 'placed', node: 'rrugaDielli1' },
    tales: { 'maiden-promised-sun': 'stag' },
  },
  njerezitUdhes: {
    name: 'njerëzit e udhës', glyph: '👣', kind: 'collective',
    role: 'the road-folk of the stag\'s way down — the tellers of the merciful lie',
    backstory: 'Everyone the stag met on the road down from the sky. Asked one favour — say the girl and the stag went down another road — they passed the false directions on, and the Kulshedra hunted the wrong ways until the black door had already opened. A collective, not a person: whoever happens to be walking the stag-road is one of them.',
    folklore: ['maiden-promised-sun'],
    location: { status: 'placed', node: 'rrugaDielli2' },
    tales: { 'maiden-promised-sun': 'roadFolk' },
  },
}
