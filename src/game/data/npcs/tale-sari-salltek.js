// NPCs: Sari Salltëk (the dragon-slaying dervish) cast — see ../npcs/_SCHEMA.md
// for the format contract. One file per area/tale so parallel agents never
// collide. None of this cast exists in core-village.js/core-world.js — Sari
// Salltëk is not (yet) a core figure, so this is his tale's own file.

export default {
  sariSalltek: {
    name: 'Sari Salltëk', glyph: '🗡️', kind: 'human',
    role: 'the wandering dervish who slew Krujë\'s Kulshedra and stayed to keep its cave',
    backstory: 'An old, white-bearded dervish who reached Krujë girded with a wooden sword and a cypress branch, climbed to the mountain cave where a Kulshedra had terrorized the town by lot, and killed it after a spring-water rest and three failed charges — then refused the saved girl\'s hand ("we dervishes do not marry women against their will") and lived out his years in the beast\'s own cave on daily bread, until an envious town\'s murder-plot sent him over the sea to Corfu in four strides. Bektashi and Christian tradition both venerate him; he is said to keep seven graves in seven lands. NOT the wood\'s-edge trickster dervish who outwits a bear at the forest\'s edge (bear-dervish\'s dervishi) — a different dervish, a different legend, sharing only the word.',
    folklore: ['sari-salltek'],
    location: { status: 'planning', plan: 'arrives on the road out of the village (start), climbs the shared mountain-hub (mali1) to the proposed cave, and departs at last from the open Adriatic (deti1)' },
    tales: { 'sari-salltek': 'salltek' },
  },
  princiKrujes: {
    name: 'princi i Krujës', glyph: '👑', kind: 'human',
    role: 'the Christian prince whose town feeds a Kulshedra by lot',
    backstory: 'Lord of Krujë while the mountain above it keeps a Kulshedra fed on his own people, drawn by lot day after day — including, once, his own daughter. He offers her hand to whoever saved her, is nearly fooled by false claimants, and in the end grants the true rescuer a stranger request instead: to live out his days in the dragon\'s cave on daily bread. NOT the grieving queen of pallatiZi (goose-girl, maiden-promised-sun) — a different household, a different grief, a different kind of ruler entirely.',
    folklore: ['sari-salltek'],
    location: { status: 'planning', plan: 'holds his town at the proposed Krujë square (nearest spot today: fshatiSheshi)' },
    tales: { 'sari-salltek': 'prince' },
  },
  vajzaPrincit: {
    name: 'e bija e princit', glyph: '👸', kind: 'human',
    role: 'the prince\'s daughter, saved from the day\'s lot',
    backstory: 'Weeping her way up the mountain the day the lot names her, she is saved by an old dervish\'s wooden sword — and it is she, not her father, who proves him afterward, setting three apples in his own hands while the whole town still doubts. NOT E Bukura e Dheut or any other tale\'s rescued maiden — Krujë\'s own daughter, this tale only.',
    folklore: ['sari-salltek'],
    location: { status: 'planning', plan: 'her father\'s town (fshatiSheshi) and the mountain path above it (mali1)' },
    tales: { 'sari-salltek': 'maiden' },
  },
  kulshedraKrujes: {
    name: 'kulshedra e Krujës', glyph: '🐲', kind: 'creature',
    role: 'the Kulshedra that denned in a ruined church atop the mountain above Krujë',
    backstory: 'It sunned itself daily among a ruined church\'s stones and forced the town below to draw lots for its meals, until a wandering dervish outlasted three of its charges and cut off its seven heads in its own cave. A kulshedra is a KIND, not a name — this beast is neither the player\'s own duel (kulshedraMadhe) nor either of three-friends\' two kulshedras; a fourth, separate beast of the same breed.',
    folklore: ['sari-salltek', 'kulshedra'],
    location: { status: 'planning', plan: 'dens at the proposed cave above the shared mountain-hub (nearest spot today: mali1)' },
    tales: { 'sari-salltek': 'kulshedra' },
  },
  dishepulli: {
    name: 'dishepulli besnik', glyph: '🍉', kind: 'human',
    role: 'the disciple who carried the dervish\'s food, then his warning',
    backstory: 'For years he climbed the mountain daily with the old dervish\'s food, and when Krujë turned on its own saint he was the one who got wind of the plot and ran up ahead of the killers with a watermelon and a warning to flee. A minor figure with one great deed: the tale would end in murder without him.',
    folklore: ['sari-salltek'],
    location: { status: 'planning', plan: 'walks the town-to-cave path daily (fshatiSheshi to the proposed cave at mali1)' },
    tales: { 'sari-salltek': 'disciple' },
  },
  krujaFolk: {
    name: 'njerëzit e Krujës', glyph: '👥', kind: 'collective',
    role: 'the townspeople of Krujë — victims, then doubters, then conspirators',
    backstory: 'They draw the daily lot the Kulshedra demands, lose their best men trying to kill it, doubt the old dervish who really did it, and years later plot to murder him out of envy and fear. One town at four different moments, not four different crowds.',
    folklore: ['sari-salltek'],
    location: { status: 'planning', plan: 'fill the proposed Krujë square (nearest spot today: fshatiSheshi)' },
    tales: { 'sari-salltek': 'townsfolk' },
  },
}
