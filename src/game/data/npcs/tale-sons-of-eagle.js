// NPCs: Sons of the Eagle (the national origin/etymology legend) — see
// ../npcs/_SCHEMA.md for the format contract. This file is owned by its tale:
// agents editing other tales must not touch it.
//
// This legend is ALREADY STAGED in the game as a short crag side-quest —
// content.js's shqipe1 → shqipe2 → shqipe3 → shqipeFund (a 'good' ending,
// "Son of the Eagle") — reached off the ACT V long-way-home stretch
// (udhaKthimit) near the Buna/Rozafa crossing. Uniquely among the game's
// tale-vignettes, that scene casts the PLAYER directly as the legend's own
// founder-hero ("ti ngjit në folenë…", "ti je biri i shqiponjës") rather than
// having the player watch or help a separate named hero — so the 'youth' cast
// member below has no independent standing figure to pin; see its `location`.
export default {
  shqipetariPare: {
    name: 'Shqipëtari i parë', glyph: '🏹', kind: 'human',
    role: 'the unnamed mountain hunter who becomes the first Shqipëtar — "Son of the Eagle"',
    backstory: 'A hunter with no name of his own at the start: on a bare crag he kills the snake threatening an eagle\'s chick. The mother repays him — his eyesight becomes as keen as hers and his strength like that of her wings — and promises that he will be called the strongest and bear her name. The rescued chick remains attached to him and follows him when both are grown. He kills beasts and enemies of the land, becomes king, and is called Shqipëtar in the family telling. In the game\'s crag quest the player steps directly into his place.',
    folklore: ['sons-of-eagle'],
    location: { status: 'planning', plan: 'embodied by the player at the crag quest (shqipe1→shqipeFund); no separate standing figure to pin — see shqiponjaShkembit/shqiponjaVogel/gjarpriShkembit for the crag\'s fixed residents' },
    tales: { 'sons-of-eagle': 'youth' },
  },
  shqiponjaShkembit: {
    name: 'shqiponja e shkëmbit', glyph: '🦅', kind: 'mythic',
    role: 'the great mother eagle whose gift names a people',
    backstory: 'Nests with a single eaglet on an unclaimed crag in the northern highlands. When a passing hunter kills the snake she has unwittingly carried in still living to her own nest, she exchanges her child for a gift: his eyesight becomes as keen as hers, his strength like that of her wings, and he is promised her name. The family performance gives the lifelong companionship to the rescued chick, not to this mother. She belongs to this one crag only — not Baba Tomor\'s southern she-eagles, the Gjizar eagle-sisters, or the flesh-fed eagle of the world below.',
    folklore: ['sons-of-eagle'],
    location: { status: 'planning', plan: 'nests at the crag and catches the hunter on the road at shqipeBarter; the rescued chick, not the mother, appears in the later ending' },
    tales: { 'sons-of-eagle': 'eagle' },
  },
  shqiponjaVogel: {
    name: 'shqiponja e vogël', glyph: '🐣', kind: 'creature',
    role: 'the rescued chick who grows into the hunter\'s eagle companion',
    backstory: 'Left in the nest beside what its mother believes is a dead snake, it survives because the hunter sees that the snake is alive and kills it. He carries the chick toward home, then returns it under the mother\'s bargain. The family performance explicitly says it remains attached to the boy and, once both are grown, follows him over hunt and battle.',
    folklore: ['sons-of-eagle'],
    location: { status: 'planning', plan: 'begins in the nest, is carried briefly and returned at shqipeBarter, then appears as the grown eagle above the hero in shqipeFund' },
    tales: { 'sons-of-eagle': 'eaglet' },
  },
  gjarpriShkembit: {
    name: 'gjarpri i shkëmbit', glyph: '🐍', kind: 'creature',
    role: 'the snake the eagle failed to kill, carried live into her own nest',
    backstory: 'Snatched up for dead and dropped in the eaglet\'s nest, it is only stunned — and wakes to strike the chick the instant the mother eagle\'s back is turned. Killed on the spot by the passing hunter\'s arrow. A crag-snake of a single moment\'s danger only — NOT gjarpri i portës së botës (the underworld-threshold guardian serpent of the main quest\'s dead-city road) and NOT the road-brood or gate kulshedras of the Kordha tale: a snake is a kind, not a name, and this one belongs to this one crag.',
    folklore: ['sons-of-eagle'],
    location: { status: 'planning', plan: 'lives and dies within the crag quest (shqipe1→shqipe2); no standing presence elsewhere' },
    tales: { 'sons-of-eagle': 'serpent' },
  },
}
