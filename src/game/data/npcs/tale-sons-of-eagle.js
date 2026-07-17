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
    backstory: 'A hunter with no name of his own in the telling: on a bare crag he kills the snake threatening a mother eagle\'s only chick, and for that one mercy the eagle repays him without being asked twice — his eyesight sharpens until it rivals hers, his arm takes on something of her wings\' own power, and before long he carries her name as his own. Grown seemingly unbeatable under her watch he clears the land of beasts and enemies, until his own people, awed rather than conquered, raise him up as their king and take the eagle\'s name for their own: Shqipëtar, Shqipëria. In the game\'s own telling of this legend (the shqipe1→shqipeFund crag quest) the player steps directly into his place — a founding myth always casts its listener as the hero\'s heir, and here the game makes that literal.',
    folklore: ['sons-of-eagle'],
    location: { status: 'planning', plan: 'embodied by the player at the crag quest (shqipe1→shqipeFund); no separate standing figure to pin — see shqiponjaShkembit/shqiponjaVogel/gjarpriShkembit for the crag\'s fixed residents' },
    tales: { 'sons-of-eagle': 'youth' },
  },
  shqiponjaShkembit: {
    name: 'shqiponja e shkëmbit', glyph: '🦅', kind: 'mythic',
    role: 'the great mother eagle whose gift names a people',
    backstory: 'Nests with a single eaglet on an unclaimed crag in the northern highlands. When a passing hunter kills the snake she has unwittingly carried in still living to her own nest, she repays the debt before it is even asked: his eyesight sharpens until it rivals her own, and it is as if he carries some of her wings\' own force in his stride from then on — before long, her very name is his too, and through him it becomes his whole nation\'s. A lone nesting eagle of this one crag only — NOT Baba Tomor\'s circling she-eagles of the southern summit (majaEagle, a different mountain and a different tale\'s birds) and NOT the three eagle-sister maidens of the Gjizar tale (motratShqiponja) or the flesh-fed eagle of the world below (shqiponja1) — a kulshedra or a shqiponjë is a KIND here, not a name; this crag has exactly one mother eagle.',
    folklore: ['sons-of-eagle'],
    location: { status: 'planning', plan: 'nests permanently at the crag (shqipe1/shqipe2/shqipe3, and present again at the shqipeFund ending); no separate map pin outside this quest yet' },
    tales: { 'sons-of-eagle': 'eagle' },
  },
  shqiponjaVogel: {
    name: 'shqiponja e vogël', glyph: '🐣', kind: 'creature',
    role: 'the mother eagle\'s only chick — the one life the whole legend turns on',
    backstory: 'Left alone in the nest with what its mother believes is a dead snake, it plays with the limp coil until the snake wakes to strike — saved only by the hunter\'s arrow at the last instant. Too young to fly, it is carried off toward the hunter\'s home and returned within the same telling; it plays no further part once its mother\'s bargain is struck.',
    folklore: ['sons-of-eagle'],
    location: { status: 'planning', plan: 'stays in the nest at the crag (shqipe1/shqipe2); carried briefly at shqipe3 before being handed back' },
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
  populliVendit: {
    name: 'populli i vendit', glyph: '👥', kind: 'collective',
    role: 'the land\'s people, who crown the hunter and take the eagle\'s name for their own',
    backstory: 'Never named or numbered — only "the people of the land," who watch the once-unremarkable hunter grow invincible under the eagle\'s wing, clearing beasts and enemies alike, and who raise him up as king for it of their own will. It is THEY, not the hunter, who choose both his title (Shqipëtar) and their country\'s (Shqipëria) — the whole etymology legend turns on the people\'s naming, not his own claim.',
    folklore: ['sons-of-eagle'],
    location: { status: 'planning', plan: 'offstage collective — spoken of only at the ending (shqipeFund); never staged as individuals' },
    tales: { 'sons-of-eagle': 'people' },
  },
}
