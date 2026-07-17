// ===========================================================================
// TALE: The Gjakova cavern — the dead city guarded by Oras — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
// ===========================================================================

export default {
  id: 'gjakova-cavern',
  title: 'The Gjakova cavern — the dead city guarded by Oras',
  source:
    'M. Edith Durham, High Albania (Edward Arnold, London, 1909), ch. "The Debatable Lands" (the Djakova section), pp. 263-264 · read directly from Durham\'s own English (she recorded this from oral testimony gathered at Djakova in 1908; there is no translated intermediary) — the extract is saved at docs/references/durham-high-albania-1909-gjakova.en.txt; all lines paraphrased in the tale author\'s own words',
  // where the tale comes from — anchors should prefer this region's mirrors.
  // Durham's High Albania covers ONLY the Northern Highlands (Gheg country);
  // this passage is set at Djakova itself, on the road toward Prizren.
  origin: {
    region: 'North Albania (Gheg) — the Gjakova/Prizren borderland, Kosovo vilayet',
    collector: 'M. Edith Durham, recording local oral testimony gathered at Djakova, 1908',
    published: 'London, 1909',
  },
  // the ALBANIAN ORIGINAL — genuinely missing. Durham wrote this down herself
  // in English, on the spot, from what Djakova people told her; it was never
  // collected or printed as an Albanian folk text by anyone. Searched (see
  // _SCHEMA.md's list) before concluding this:
  albanian: {
    status: 'missing',
    why:
      'Durham recorded this cavern-legend directly in English from oral testimony at Djakova in 1908 — no Albanian-language transcription of this specific telling was ever published; it is field reportage, not a collected folk text like Mitko\'s. Searched: docs/references/pralla-popullore-shqiptare-1954.sq.txt (grep "gjakov", "shpell" — the only hits are unrelated tales\' incidental cave/tower scenery, none at Gjakova, none matching a dead-city bazaar); dozon-manuel-langue-chkipe.fr-sq.txt and dozon-contes-albanais (no hits); hahn-albanesische-studien.de-sq.txt, jarnik-zur-albanischen-sprachenkunde.de-sq.txt, meyer-kurzgefasste-grammatik.de-sq.txt, lambertz-albanische-marchen.de-sq.txt (no hits for "gjakov"/"shpell" at all); fishta-lahuta-e-malcis.sq.txt (Gjakovë appears often, but only as a place-name in unrelated epic-song verse about the Kreshnik wars, never this legend); kanuni-leke-dukagjinit.sq.txt (only incidental "shpellë" = hiding-place clauses in the tribal law, unrelated). archive.org full-text search for «shpella e Gjakoves» returned zero hits across the whole archive. No Albanian original is known to survive; per the schema, this is recorded as missing rather than back-translated or invented.',
  },
  // where the game\'s OWN Gjakova-cavern quest area (content.js: fshehur ->
  // thesarOra -> shpellaHyrje -> shpellaRruget -> qyteti -> thesar2, already
  // built and cited to this same Durham page in its own code comments)
  // elaborates beyond Durham\'s four paragraphs, for the record:
  discrepancies: [
    'THE TORCH MECHANIC: Durham\'s own text only implies a torch in the warning clause ("his torch at once goes out") — she never says a torch must be carried in to see anything at all. The game\'s shpellaHyrje scene turns this into a hard mechanic (no pishtar torch, made at the forest campfire lendina, and the cave shows only blackness). This is a faithful dramatization of her one clause, not an invented incident, and this tale\'s own beats do not depend on it.',
    'THE THREE-ROAD RIDDLE (shpellaRruget) and the sword-branch that kills the guardian serpent for a cursed hoard (gjarperVrare, tying in the vitore\'s doom): both are the game\'s own additions inside the cavern, absent from Durham\'s four paragraphs. Neither contradicts her account — she never says the cavern has only one passage, nor forbids a fight — so they stand as elaboration, not correction. This tale\'s line coverage stays strictly to her own four paragraphs and does not cover these branches.',
    'THE "LIVING QUARTER" (sheshi/tregtari/bujtina/sheruesi/udhetariHuaj) built into the dead city for the survival-vocabulary vignettes contradicts Durham\'s flat "no man now lives" — a deliberate departure for gameplay, not this tale\'s to resolve. This tale\'s beats keep the city as Durham gives it: dead, but its bazaar still stocked.',
  ],
  // sentence counts of the four paragraphs used (Durham, High Albania, 1909,
  // "The Debatable Lands" — see docs/references/durham-high-albania-1909-gjakova.en.txt)
  paragraphs: [7, 2, 4, 1],
  cast: [
    { id: 'durham', name: 'M. Edith Durham', note: 'the Englishwoman who heard the tale at Djakova and asked, in vain, to be shown the cavern herself', npc: 'durham' },
    { id: 'djakovaFolk', name: 'the people of Djakova', note: 'tell of the cavern\'s wonders, refuse to guide her to its mouth, and are — across their own generations — the ones who test the chapel ruins too', npc: 'djakovaFolk' },
    { id: 'oraShpelle', name: 'the oras of the cavern and the chapel', note: 'serpent-shaped guardian spirits — Durham\'s own words: oras "can take what form they please"', npc: 'oraShpelle' },
    { id: 'moslemDigger', name: 'the treasure-hunter', note: 'a Moslem man who dug at the ruined chapel for treasure — struck dead by lightning out of a clear sky', npc: 'moslemDigger' },
  ],
  // anchor = the game location this tale place inhabits. REUSE over invention,
  // under THE SHARING RULE. This tale is NORTHERN (Durham, Gheg country) —
  // mirrors below are chosen accordingly. Remarkably, the game's own main
  // content.js ALREADY built a quest area citing this exact Durham page
  // (fshehur -> thesarOra -> shpellaHyrje -> shpellaRruget -> qyteti ->
  // thesar2), so most of this tale's places are simply "existing", already
  // drawn on the map (see src/components/nodePositions.js) — this file's job
  // is to attach Durham's own cast and line-by-line coverage to that
  // already-standing quest area, not to invent a new one. status:
  //   existing — node is the spot itself
  //   proposed — not built yet; node = nearest existing spot to jump to,
  //              proposal says what to draw/write
  //   offstage — the tale never stages a scene there; no map spot by design
  places: [
    { id: 'informant', emoji: '👴', name: 'where the tale is told', note: 'the riverside spot where Djakova\'s own people tell of the cavern and its treasure',
      anchor: { status: 'existing', node: 'fshehur', mirror: 'Djakova itself, where Durham gathered local testimony in 1908',
        mold: 'wherever a traveller stops by the river, the local telling of wonders happens — this exact spot already hosts (in content.js\'s own main-quest text) an old man\'s rumour of gold in a hidden cave, cited in its code comments to this very Durham page; this tale simply names the teller as the Djakova district itself and the listener as Durham',
        conflicts: 'not otherwise claimed by any other tale to date' } },
    { id: 'cavern', emoji: '🕳️', name: 'the magic cavern', note: 'the cave mouth on a mountainside on the left of the road to Prizren; a passage running for miles underground, some say beneath the Drin itself',
      anchor: { status: 'existing', node: 'shpellaHyrje', mirror: 'the cavern of Durham\'s own telling, on the Djakova–Prizren road',
        mold: 'a pitch-dark cave mouth — nothing at all can be seen inside without a light; the game\'s torch mechanic (pishtar) and the three-road dark-riddle just past it (shpellaRruget) are the quest\'s own elaboration of Durham\'s one clause about a torch, not part of this tale\'s own four paragraphs',
        conflicts: 'not otherwise claimed by any other tale to date' } },
    { id: 'deadCity', emoji: '🏛️', name: 'the dead city', note: 'the large, ancient city inside the cavern where no man now lives',
      anchor: { status: 'existing', node: 'qyteti', mirror: 'the dead city of the world below',
        mold: 'THIS is that dead city, exactly as three-friends\' own mold already has it ("holds all who went below and never came back") — Durham\'s telling supplies what stands inside it still: an untouched, magically stocked bazaar. The armies and wanderers three-friends speaks of are, by this tale\'s reading, among the very men over the centuries who tried to reach or rob that bazaar and never came out again.',
        sharedWith: ['three-friends', 'the main Kulshedra arc'] } },
    { id: 'bazaar', emoji: '💎', name: 'the dead city\'s bazaar', note: 'the market itself, stocked to this day with the finest fruit, meat, fish, jewels, and clothing — guarded by an ora in serpent-shape',
      anchor: { status: 'existing', node: 'thesar2', mirror: 'the enchanted bazaar of Durham\'s own telling',
        mold: 'a market untouched for generations, its wares perfect and its guardian awake the instant anything is touched; the game\'s own code comments here quote Durham\'s "his torch at once goes out, serpents spring up and devour him in the darkness" nearly verbatim, and its good/bad/secret endings (thesarKthyer, gjarperNgrene, gjarperVrare) already dramatize this tale\'s central warning line-for-line',
        conflicts: 'not otherwise claimed by any other tale to date' } },
    { id: 'chapelRuins', emoji: '⛪', name: 'the ruined chapel', note: 'broken walls on a hill not far from Djakova — a second ground the same oras keep',
      anchor: { status: 'proposed', node: 'fshehur', mirror: 'a hillside ruin near Djakova, the second guarded spot of Durham\'s own telling',
        mold: 'holy, or haunted, ground: lightning answers the treasure-digger, a leaping swarm of serpents answers the stone-robbers, and kneeling oxen are the district\'s final, undeniable proof — nobody has touched it since',
        proposal: 'draw a small ruined chapel on the hillside near the river district (nearest built node: fshehur) — broken walls, no roof, a silence the local travellers give a wide berth' } },
  ],
  items: [
    { id: 'bazaarWares', emoji: '💎', name: 'the untouched bazaar', note: 'fruit, meat, fish, jewels, and fine clothing, piled up exactly as if the city still lived — and exactly as dangerous to touch' },
    { id: 'torch', emoji: '🔦', name: 'the venturer\'s torch', note: 'the one light in the pitch-black cavern; Durham\'s own clause — "his torch at once goes out" — is the seed of the game\'s whole pishtar mechanic' },
  ],
  // how the game stages this tale — the WITNESS projection (see _SCHEMA.md). Not a
  // hero-tale but Edith Durham's own travel account of a guarded place, EXPLORED
  // firsthand through the open-world cavern hubs (shpellaHyrje → qyteti → thesar2).
  // No embodiment / mold-lock — these are shared exploration nodes; the ora's law
  // "touch one thing and be devoured" is a REAL consequence (gjarperNgrene).
  play: {
    entry: 'fame',
    stance: 'witness',
    role:
      'The English traveller Edith Durham heard of a cavern near Gjakova holding a dead city whose bazaar is still piled with fruit, jewels and fine cloth — but touch one single thing and your torch dies and the oras, spirit-guardians in serpent shape, devour you where you stand. No local would lead her down. You go where she could not — and the old warning is no story here but the law of the place.',
    from: 'shpellaHyrje',
    ending: 'gjarperNgrene',
    scenes: {
      shpellaHyrje: 'fame',
      qyteti: 'fame',
      thesar2: 'warning',
      gjarperNgrene: 'warning',
    },
    divergences: [
      { note: 'The game\'s WITNESS stance on an ethnographic report, not a folktale: Durham found no guide and never went down, so the game lets YOU descend and meet the guarded bazaar firsthand. No figure to embody and no mold-lock — the cavern is part of the shared open world you pass through freely.' },
      { beat: 'warning', note: 'Durham\'s exact clause — touch one thing and "his torch at once goes out," and serpents devour him — is the seed of the game\'s whole torch (pishtar) + ora mechanic: reach for the gold at the dead bazaar and the light dies and the ora in serpent-shape takes you (the ending "Greed in the Dark").' },
      { beat: 'chapel', note: 'Durham\'s corroborating reports — the treasure-digger at the ruined chapel struck dead by lightning from a clear sky, the stone-strippers swarmed by serpents, the carter\'s oxen kneeling before the holy ground — are kept as the informant\'s lore (fshehur) rather than each staged as its own scene, and the oras\' power to take any shape (bird, beast, woman, serpent) is realised as the wider ora-guardian system.' },
    ],
  },
  beats: [
    {
      id: 'fame', title: 'A town thick with wonders',
      note: 'Djakova\'s own reputation for the supernatural, and the cavern everyone there could point to: a passage running for miles underground, said to reach even beneath the Drin, opening on a dead city whose bazaar still stood stocked with the finest goods.',
      lines: [
        ['1.1', 'Djakova, as Durham found, was a town thick with tales of the supernatural, where wonders were reported all the time.'],
        ['1.2', 'Close by, on the road toward Prizren, a mountainside held a cavern out of legend.'],
        ['1.3', 'Nobody could say how far its tunnel ran underground — some claimed it reached for miles, even passing beneath the Drin itself.'],
        ['1.4', 'Inside, they said, stood a great and ancient city where nobody lived any longer — yet its market, even now, was piled high with the finest fruit, meat, fish, jewels, and clothing anyone could want.'],
      ],
      cast: {
        durham: ['informant', 'newly arrived in the Djakova district, gathering the local tales (not yet met by anyone else here)'],
        djakovaFolk: ['informant', 'tell of the cavern and the dead city inside it, as they always have'],
        oraShpelle: ['bazaar', 'keeps its long watch over the untouched market, unseen by anyone (not yet described to Durham)'],
        moslemDigger: ['chapelRuins', 'wanders the hill country still, not yet tempted to dig (not yet met)'],
      },
      items: { bazaarWares: ['deadCity', 'stocked and untouched, as it has been for as long as anyone can say'] },
    },
    {
      id: 'warning', title: 'Touch nothing',
      note: 'The warning at the heart of the tale: touch one single thing in that bazaar, and the torch dies, and serpents rise out of the dark to devour the thief. These, Durham was told, are no true serpents — they are oras, spirits wearing a serpent\'s shape. No one has gone down into the cavern for years.',
      lines: [
        ['1.5', 'But whoever dared to touch even one single thing there would see his torch die out at once, and serpents would spring up out of the darkness to devour him where he stood.'],
        ['1.6', 'These, Durham was told, were no ordinary snakes at all — they were oras, spirit-guardians wearing a serpent\'s shape to keep the cavern.'],
        ['1.7', 'In living memory, nobody had dared go down into that cavern at all.'],
      ],
      cast: {
        durham: ['informant', 'hears the warning out in full'],
        djakovaFolk: ['informant', 'repeat the old warning they have always kept'],
        oraShpelle: ['bazaar', 'named at last for what it truly is: an ora, not a serpent'],
      },
      items: { torch: ['cavern', 'unlit, and has stayed unlit for years — nobody has carried one in'] },
    },
    {
      id: 'refusal', title: 'None dared take her',
      note: 'Durham offered to go down and see the bazaar for herself. Not one Djakova local would guide her to the cavern\'s mouth. And, she learned, this was not the only ground near the town kept under such a guard.',
      lines: [
        ['2.1', 'Durham herself offered to climb down and see the bazaar with her own eyes, but could not persuade one single local to lead her to the cavern\'s mouth.'],
        ['2.2', 'And, she was told, this cavern was not the only ground near Djakova kept under so close a guard.'],
      ],
      cast: {
        durham: ['cavern', 'stands at the mouth herself, offering to go down — and is refused a guide'],
        djakovaFolk: ['cavern', 'will not walk her to the cave, for all their telling of it'],
      },
    },
    {
      id: 'chapel', title: 'Lightning and a swarm of serpents',
      note: 'A second guarded spot: the ruins of a chapel on a nearby hill. A Moslem treasure-hunter who dug there was struck dead by lightning from a clear sky. Later, men come to strip its stones for building were driven off by a sudden swarm of serpents. The same guardians, Durham was told, can take any shape at all.',
      lines: [
        ['3.1', 'Not far off, on a hillside, stood the broken walls of an old chapel.'],
        ['3.2', 'One Moslem man who dug there hunting for buried treasure was struck dead on the spot by a bolt of lightning out of a perfectly clear sky.'],
        ['3.3', 'Later, some men who came to strip the ruin\'s stones for building work were met by a sudden swarm of serpents bursting up out of the ground, and barely escaped with their lives.'],
        ['3.4', 'The same guardians, it was said, could take whatever shape they chose — bird, beast, woman, or serpent.'],
      ],
      cast: {
        moslemDigger: ['chapelRuins', 'digs among the ruined stones for treasure — and is struck down at once'],
        oraShpelle: ['chapelRuins', 'answers the digging with lightning, and later the stone-stripping with a swarm of serpents'],
        djakovaFolk: ['chapelRuins', 'are the very men who try to strip the ruin\'s stones, and barely get away'],
        durham: ['cavern', 'moves on from the cavern\'s mouth with the district\'s second warning in hand'],
      },
      exit: ['moslemDigger'],
    },
    {
      id: 'oxen', title: 'The oxen would go no further',
      note: 'The district\'s final proof: not long before Durham\'s own visit, a carter\'s oxen suddenly knelt before the very same ruins. After that, nobody in the district doubted the ground was holy, and nobody has touched it since.',
      lines: [
        ['4.1', 'Not long before Durham\'s own visit, a carter\'s oxen had suddenly dropped to their knees before those same ruins — and after that, the ground\'s holiness stood beyond all doubt, and no one in the district has dared touch it since.'],
      ],
      cast: {
        djakovaFolk: ['chapelRuins', 'the carter among them, whose kneeling oxen settled the matter for good'],
        oraShpelle: ['chapelRuins', 'rests easy — the ground is respected now without another trial needed'],
        durham: ['informant', 'carries the whole telling away with her, cavern and chapel both, in High Albania'],
      },
    },
  ],
}
