// NPCs: the bee-spider-cicada tale cast — see ../npcs/_SCHEMA.md for the
// format contract. One file per area/tale so parallel agents never collide.

export default {
  // ── the bee tale (bee-spider-cicada) — the mother and her three daughters ──
  nenaTriMotrave: {
    name: 'nëna plakë e tri motrave', glyph: '👵', kind: 'human',
    role: 'the dying mother whose curses and blessing made three creatures',
    backstory: 'Very old and too sick to turn on her bed, she called her three daughters one by one: the loom answered, the song answered, and only the youngest came. Her word held — the vain weaver became the spider, the careless singer the cicada, and the dutiful one the bee, blessed as "the light of the ancestors and the food of the living." She died eased by a little cake, and the first candle of her daughter\'s wax burned for her. NOT the Kordha widow (vejusha) — that mother raised one SON on nothing; this one kept a house at the lane fork with three daughters, a loom and a hive.',
    folklore: ['bee-spider-cicada'],
    location: { status: 'placed', node: 'bleta1' },
    tales: { 'bee-spider-cicada': 'nena' },
  },
  motraMerimanga: {
    name: 'Merimanga, motra e madhe', glyph: '🕷️', kind: 'mythic',
    role: 'the eldest sister, cursed into the spider',
    backstory: 'She would not leave her loom even for her mother\'s deathbed — "I am weaving my cloth and cannot be disturbed" — and the curse fit the refusal: weave forever, finish never. She spins in the rafters of the house where she said it, and every unfinished web anywhere is hers; a living variant adds that the wind tears it to pieces behind her. A maiden-turned-creature, the origin-mother of her kind — no relation to any monster: her sentence is endless housework, not menace.',
    folklore: ['bee-spider-cicada'],
    location: { status: 'placed', node: 'bleta1' },
    tales: { 'bee-spider-cicada': 'merimanga' },
  },
  motraGjinkalla: {
    name: 'Gjinkalla, motra e mesme', glyph: '🦗', kind: 'mythic',
    role: 'the middle sister, cursed into the cicada',
    backstory: 'She would not break off her song for the sickbed, so the song became her sentence: sing until you die of it. She sings her one bright summer and dies dried out, her back fastened to a grass stem — and next summer sings again, serial like the season itself. On warm nights she is the voice in the dark of the village square (the square\'s own night-line: «një gjinkalla këndon në errësirë»).',
    folklore: ['bee-spider-cicada'],
    location: { status: 'placed', node: 'fshatiSheshi' },
    tales: { 'bee-spider-cicada': 'gjinkalla' },
  },
  motraBleta: {
    name: 'Bleta, motra e vogël', glyph: '🐝', kind: 'mythic',
    role: 'the youngest sister, blessed into the bee',
    backstory: 'The one who came when her mother called: she cooled the sickbed, baked the little cake that eased the old woman, and took the last word as a blessing — "you shall be the light of the ancestors and the food of the living." So she is the one creature whose work feeds both worlds: wax to the graveyard\'s forty-day candles, honey to the table of the living. Folk speech still gives her a person\'s death — a bee «vdes», never «ngordh» — and no one blasphemes in a house that keeps her hive.',
    folklore: ['bee-spider-cicada'],
    location: { status: 'placed', node: 'bleta1' },
    tales: { 'bee-spider-cicada': 'bleta' },
  },
}
