// NPCs: the Gjakova cavern tale cast — see ../npcs/_SCHEMA.md for the format
// contract. One file per area/tale so parallel agents never collide.

export default {
  // ── the Gjakova cavern tale — cast ────────────────────────────────────────
  durham: {
    name: 'M. Edith Durham', glyph: '🧭', kind: 'human',
    role: 'the English traveller who wrote down the Gjakova cavern legend',
    backstory: 'A British writer who toured the Northern Albanian highlands in 1908 and set down what she was told at Djakova, on the Prizren road: a magic cavern, a dead city, oras in serpent-shape guarding an untouched bazaar. She offered to go down and see it herself — no local of the town would guide her to the mouth of it. Her High Albania (Edward Arnold, 1909) is this legend\'s only surviving record; she never claims to have entered the cavern, only to have asked.',
    folklore: ['gjakova-cavern', 'ora'],
    location: { status: 'planning', plan: 'passes through only for this tale\'s telling beats, at the informant scene (fshehur, the river district); she is not otherwise placed on the map, and leaves the district once the tale is told' },
    tales: { 'gjakova-cavern': 'durham' },
  },
  djakovaFolk: {
    name: 'njerëzit e Gjakovës', glyph: '🏘️', kind: 'collective',
    role: 'the people of the Djakova district who keep the cavern\'s warning',
    backstory: 'They told Durham of the cavern\'s dead city and its guarded bazaar, but not one of them would walk her to its mouth. The same district\'s people are, across the years, the ones who tested — and confirmed — a second guarded spot on a nearby hill: men who tried to carry off the ruined chapel\'s stones and barely escaped a swarm of serpents, and, more recently, a carter whose oxen dropped to their knees before the same ruins. NOT the player\'s own home-village crowd (fshatiSheshi\'s square, fshatiLanes) — a separate, Northern Gheg community around Djakova/Prizren that the player\'s own arc never visits directly.',
    folklore: ['gjakova-cavern'],
    location: { status: 'placed', node: 'fshehur' },
    tales: { 'gjakova-cavern': 'djakovaFolk' },
  },
  oraShpelle: {
    name: 'orët e Gjakovës', glyph: '🐍', kind: 'mythic',
    role: 'the serpent-shaped oras that guard the cavern\'s bazaar and the ruined chapel alike',
    backstory: 'Guardian spirits in Durham\'s own telling — "no true serpents", but oras that can take whatever shape they please: snake, bird, beast, or woman. They keep the dead city\'s untouched bazaar (the toucher\'s torch dies, and they rise to devour him in the dark) and, a hill away, the ruined chapel (lightning for the treasure-digger, a leaping swarm for the men who came to rob its stones). NOT gjarpri i portës së botës (the plain threshold-serpent of the player\'s own quest — no ora, just a test of nerve) and NOT plakaPyllit (the forest\'s Ora-crone, a world away in the woods) — a third, distinct local Ora-kind, tied specifically to these two guarded sites near Djakova.',
    folklore: ['gjakova-cavern', 'ora'],
    location: { status: 'placed', node: 'thesar2' },
    tales: { 'gjakova-cavern': 'oraShpelle' },
  },
  moslemDigger: {
    name: 'kërkuesi i thesarit', glyph: '⚡', kind: 'human',
    role: 'the treasure-hunter struck dead at the chapel ruins',
    backstory: 'A Moslem man of the Djakova district who dug among the ruined chapel\'s stones hunting for buried treasure. Lightning struck him dead out of a cloudless sky the moment he began — the district\'s first proof that the ground stood under the oras\' guard, before the stone-robbers or the kneeling oxen confirmed it again. He appears in this one scene only.',
    folklore: ['gjakova-cavern'],
    location: { status: 'planning', plan: 'digs at the proposed chapel-ruins site near the river district (nearest built node: fshehur); dies there in this tale\'s one scene and is never placed elsewhere' },
    tales: { 'gjakova-cavern': 'moslemDigger' },
  },
}
