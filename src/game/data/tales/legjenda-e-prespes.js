// ===========================================================================
// TALE: Legjenda e Prespës — the drowned city of Prespa — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// This is a short place-origin LEGEND, not an Elsie folktale: Elsie's
// Albanian Literature site has no page for it (index_legends.html's 15
// entries — Baba Tomor, Sari Salltëk, Aga Ymeri, Gjergj Elez Alia,
// Mujo/Halili, Rozafa, Scanderbeg, Shega/Vllastar, The Lover's Grave, Ali
// Dost Dede, Jabal-i Alhama, the Hoti/Triepshi/Kastrati/Kelmendi tribe
// foundings and the Kastrati revenge — no Prespa). FOLKLORE's own source
// list confirms this: it cites the Lake Ohrid blog and Wikipedia, not Elsie.
// The whole tale is one short paragraph — the "keyframes over a persistent
// world" here are built the way syri-kalter's are: few lines, several beats.
// ===========================================================================

export default {
  id: 'legjenda-e-prespes',
  title: 'Legjenda e Prespës — the drowned city of Prespa',
  source:
    '"Legjenda e Prespës dhe Ohrit", Protecting Lake Ohrid blog (DMO Albania, in the framework of a UNESCO/EU/Albanian Ministry of Environment project; Newsletter "Protecting Lake Ohrid", 5th ed.), posted 14 August 2017 · no Elsie translation exists for this legend; the blog itself prints the Albanian and an English rendering side by side — every English line here is the game\'s own paraphrase, never copied from the blog\'s wording',
  // where the tale comes from — anchors should prefer this region's mirrors
  origin: {
    region: 'South-East Albania (the Prespa basin, near Korçë — Tosk-speaking)',
    collector: 'a modern retelling of local oral tradition around the lake, written for the "Protecting Lake Ohrid" newsletter/blog',
    published: 'lakeohrid.blogspot.com, 14 August 2017',
  },
  // the ALBANIAN ORIGINAL: every beat line's third element is the verbatim
  // Albanian for that ¶.sentence (only trivial OCR spacing/apostrophe
  // cleanup; raw text in `local`).
  albanian: {
    title: 'Legjenda e Prespës',
    source:
      '"Legjenda e Prespës dhe Ohrit", Protecting Lake Ohrid blog (lakeohrid.blogspot.com), posted 14 August 2017 — the Prespa paragraph only; the same page continues into Ohrid/Struga/Enkelejd material, a different lake\'s lore, not used here (see discrepancies).',
    local: 'docs/references/lakeohrid-blog-legjenda-e-prespes.sq.txt',
  },
  discrepancies: [
    'NO ELSIE TRANSLATION EXISTS: unlike most tales in this game, this legend was never posted at albanianliterature.net, so there is no Elsie English to avoid copying from in the usual sense — the source is a modern bilingual blog post instead, and the English paraphrase below is written independently from its Albanian, in the game\'s own words, only cross-checked against the blog\'s own English for accuracy.',
    'THE PRINCE\'S AND NEREIDA\'S OWN FATES (¶1.8-9): the source says only that "the whole town" went under and "every citizen" drowned — it never states outright whether the prince himself counts among "every citizen," nor what became of Nereida once the water rose. These beats read the prince as drowned with his own town (nothing in the text exempts him, and it is the reading every telling of a forced-marriage flood legend implies), and follow the standard folk logic that a zanë does not drown in her own element: she is written here as the one life the flood did not take, remaining in the water that keeps her sorrow. Both readings go beyond the letter of the source and are flagged here as the beats\' own extrapolation, not a translation.',
    'A DIFFERENT LAKE\'S LORE, SAME PAGE: the blog post carrying this legend continues straight into three more traditions about Lake Ohrid and Struga — a dragon that swallows small boats but always returns the drowned; the hero Strugë who dies fighting a lake-monster; a real sunken Illyrian town of the Enkelejd tribe, said to have gone down in an earthquake. FOLKLORE\'s own summary cites this only as a legend "paralleled by" an Ohrid tradition, never as the same story — none of that material is mined for lines here (kept in the reference file for provenance only), and it is not this tale\'s to narrate.',
  ],
  // one continuous paragraph in the source — 9 sentences
  paragraphs: [9],
  cast: [
    { id: 'princi', name: 'the prince', note: 'the king of Prespa\'s son; forcing the marriage brings the flood', npc: 'princiPrespes' },
    { id: 'nereida', name: 'Nereida', note: 'the zanë of the forest above Prespa, whose warning goes unheeded', npc: 'nereidaPrespes' },
    { id: 'mbreti', name: 'the king of Prespa', note: 'the prince\'s father, ruling the town until the flood takes it whole', npc: 'mbretiPrespes' },
    { id: 'populli', name: 'the people of Prespa', note: 'the whole town, collectively — drowned with it', npc: 'populliPrespes' },
  ],
  // anchor = the game location this tale place inhabits. REUSE over invention,
  // under THE SHARING RULE — see ../tales/_SCHEMA.md. mirror = the real-world
  // place behind it (this tale is the far SOUTH-EAST — Korçë/Prespa basin).
  places: [
    { id: 'pyll', emoji: '🌲', name: 'the forest above Prespa', note: 'where the prince first meets Nereida, and returns again and again to court her',
      anchor: { status: 'existing', node: 'pylli1', mirror: 'the wooded hills above the real Prespa basin, near Korçë in the far south-east',
        mold: 'the great forest every wanderer crosses; this tale adds one more meeting under its trees, alongside binoshet\'s, cuckoo\'s and snake-bridegroom\'s own — a forest never runs out of room for one more story',
        sharedWith: ['binoshet', 'cuckoo', 'snake-bridegroom'] } },
    { id: 'qyteti', emoji: '🏰', name: 'Prespa, the king\'s town', note: 'the great town on the site of today\'s lake, before the flood took it',
      anchor: { status: 'offstage', mirror: 'the town said to have stood where Lake Prespa\'s waters now lie, near Korçë in Albania\'s far south-east',
        mold: 'a whole king\'s town — his court, his son, his subjects, everything the flood will take; never dramatized as its own scene, only the forest visit and the flood\'s aftermath (place "liqeni") are staged; this ground and liqeni\'s are the SAME ground, seen before and after one night',
        conflicts: 'not qyteti, three-friends\' dead city of the world below, despite the coincidence of an English gloss — that is an underworld ruin under a wholly different node (STORY key "qyteti"); this town has no map node at all' } },
    { id: 'liqeni', emoji: '🌊', name: 'Prespa, become a lake', note: 'the same ground, the morning after the flood — Lake Prespa itself',
      anchor: { status: 'proposed', node: 'mali1', mirror: 'Lake Prespa, near Korçë in Albania\'s far south-east — a different lake entirely from every water already on this map (Lake Shkodra/flocka1 in the north; the Osum, tomor-shpirag\'s river, in the south-centre)',
        mold: 'a king\'s whole town, drowned in one night into the still water that bears its name; nothing else is staked to this specific ground, only the wildcard hub it borrows for now — this place and "qyteti"\'s are the same site, before and after',
        conflicts: 'not a claim that mali1 IS Tomorr, Mali i Krujës, or Prespa all at once — three tales now pin proposals here (three-friends\' Tomorr, sari-salltek\'s Krujë, this lake), each honest that the node stands in for an elsewhere-place the map has not yet reached, not that the identities are the same mountain',
        proposal: 'when the map extends south-east to the Korçë/Prespa basin, draw the drowned town under calm water — kulla-roofs still said to show through on the stillest days — with the wooded slope (pylli1\'s own hills, continued) rising just above the shore' } },
  ],
  items: [
    { id: 'pasuria', emoji: '💰', name: 'the wealth of his father\'s land', note: 'every riches of the kingdom, and the place at his side as its next queen — offered, and refused' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md), BUILT
  // FROM SCRATCH (nodes prespaPyll → prespaLiri / prespaFund). You are the king's son;
  // you meet the forest-nymph Nereida and court her, but she warns that marrying her
  // will drown your whole country. The CHOICE: heed her and let her go (your town
  // stands, you rule alone — the good ending), or seize her and wed her (the flood
  // comes, the town drowns, and the water is Lake Prespa — the etiology, the secret
  // ending). become:'legjenda-e-prespes' on the forest threshold (pylli1 "fol me zanën").
  play: {
    entry: 'metInForest',
    stance: 'embodied',
    as: 'princi',
    role:
      'You are the king\'s son, and out walking the woods above your father\'s great town you come face to face with Nereida, a forest-nymph lovelier than any girl you have seen. You court her with every treasure of the kingdom, but she refuses and warns you: marry her, and a great water will drown your whole country. Heed her and let her go, or, blinded by love, seize her and wed her — and lose the town to the flood that becomes Lake Prespa.',
    enter:
      'out walking the woods above your father\'s great town, you come face to face with the forest-nymph Nereida — lovelier than any girl you have ever seen',
    from: 'prespaPyll',
    ending: 'prespaFund',
    scenes: {
      prespaPyll: 'metInForest',
      prespaLiri: 'herWarning',
      prespaFund: 'theFlood',
    },
    divergences: [
      { beat: 'herWarning', note: 'The legend\'s prince never heeds the warning — that is why Lake Prespa exists. The game makes it a real choice and adds the path he never takes: let Nereida go, and your town stands and your people live (the good ending "The Warning Heeded"), though you rule alone and never win her. Seizing her enacts the etiology.' },
      { beat: 'theFlood', note: 'Built from scratch: the great town, the courting visits, the seizing-and-holding until she consents, and the wedding-night deluge are compressed into the forest meeting and the choice; the flood, the whole town and court drowned, and the water named Lake Prespa are the secret ending.' },
      { beat: 'greatTown', note: 'The lake ending is co-located on the forest spot (pylli1) rather than drawn as a distinct south-eastern lake — the real Prespa lies near Korçë, a water the map has not yet reached (distinct from Lake Shkodra and the Osum); the tale record keeps that geography, and Nereida is said to keep the lake still.' },
    ],
  },
  beats: [
    {
      id: 'greatTown', title: 'Once, a great town',
      note: 'Long before the lake, a great town named Prespa stood exactly where its waters lie today. Its king rules, his son is not yet gone into the forest, and the fairy of the woods above is unknown to anyone at all.',
      lines: [
        ['1.1', 'This, first of all, is a story about love.', "Legjenda për Prespën ka të bëjë me një histori dashurie."],
        ['1.2', 'Long ago, a great town stood exactly where the lake lies today.', "Një herë e një kohë Prespa ka qenë një qytet shumë i madh."],
      ],
      cast: {
        princi: ['qyteti', 'grows up his father\'s only heir, not yet gone into the forest'],
        mbreti: ['qyteti', 'rules the great town from his own court'],
        populli: ['qyteti', 'goes about its ordinary life, unaware of anything to come'],
        nereida: ['pyll', 'keeps to the forest above the town, not yet met by anyone'],
      },
      items: { pasuria: ['mbreti', 'the throne and riches of the kingdom, still whole'] },
    },
    {
      id: 'metInForest', title: 'A voice among the trees',
      note: 'Out walking the woods above his father\'s town, the prince comes face to face with a forest nymph whose beauty stops him where he stands — and she gives him her name: Nereida.',
      lines: [
        ['1.3-4', 'Out walking the woods one day, the king\'s son came upon a forest nymph more beautiful than any girl he had ever seen, and when he asked her name she answered: Nereida.', "Duke ecur një ditë nëpër pyll, djali i mbretit takon një zanë me emrin Nereida, bukuria e së cilës e mahniti shumë."],
      ],
      cast: {
        princi: ['pyll', 'walks the woods above the town and comes face to face with Nereida'],
        nereida: ['pyll', 'meets the prince and gives him her name'],
      },
    },
    {
      id: 'everyRiches', title: 'Every treasure of his father\'s land',
      note: 'Struck at once, the prince returns to the forest again and again to win her, laying his whole inheritance and the throne itself at her feet.',
      lines: [
        ['1.5', 'The prince fell in love then and there, and came back to the woods again and again to court her, laying every treasure of his father\'s land at her feet and offering her a place beside him as the kingdom\'s next queen.', "Menjëherë princi ra në dashuri dhe i kërkon dorën për t'u martuar me të duke i ofruar të gjitha pasuritë e tij dhe të bëhej mbretëresha e ardhshme e mbretërisë."],
      ],
      cast: {
        princi: ['pyll', 'returns to the forest again and again, laying his whole inheritance at her feet'],
        nereida: ['pyll', 'hears out each visit, unmoved by the offered wealth'],
      },
      items: { pasuria: ['princi', 'carried out to the forest and offered, visit after visit'] },
    },
    {
      id: 'herWarning', title: 'The warning that went unheard',
      note: 'Nereida turns him down flatly: a marriage between them cannot be made without a disaster falling on him and on his whole country.',
      lines: [
        ['1.6', 'But Nereida refused him outright, telling the king\'s son that if they married, a very great disaster would fall, with grave consequences for his whole country.', "Por Nereida refuzon, duke i thënë djalit të mbretit se, nëse ata martoheshin, do të ndodhte një fatkeqësi shumë e madhe dhe do të kishte pasoja të rënda për vendin e tij."],
      ],
      cast: {
        nereida: ['pyll', 'refuses him plainly, naming the disaster a marriage would bring'],
        princi: ['pyll', 'hears the warning and will not accept it as an answer'],
      },
    },
    {
      id: 'takenAndKept', title: 'Taken, and kept',
      note: 'Blind with love, the prince has her seized and holds her shut away in his own town until, at last, she gives in and agrees to the marriage.',
      lines: [
        ['1.7', 'Blinded by his love for her, the prince had her seized and kept her locked away until she agreed to the marriage.', "I verbuar nga dashuria e zanës, princi e rrëmben dhe e mbajti atë mbyllur deri sa ajo pranoi kërkesën e martesës."],
      ],
      cast: {
        princi: ['qyteti', 'has Nereida seized and brought into the town, held there until she yields'],
        nereida: ['qyteti', 'held confined in the town, until at last she agrees to the marriage'],
      },
    },
    {
      id: 'theFlood', title: 'The lake where the town was',
      note: 'The wedding is barely over when the sky breaks open: a downpour that will not stop until the whole town lies underwater and every soul in it besides Nereida has drowned. What remains is Lake Prespa itself — and the old people say the water still keeps her.',
      lines: [
        ['1.8-9', 'No sooner were they married than the sky broke open in a downpour that would not let up until the whole town lay underwater and every last citizen had drowned — and that water, standing there still today, is Lake Prespa.', "Por shumë shpejt pas martesës ra një shi shumë i madh dhe i rrëmbyer, që mbyti të gjithë qytetin, duke krijuar një liqen, aty ku ndodhet sot liqeni i Prespës."],
      ],
      cast: {
        princi: ['liqeni', '☠ drowned with his own town, on his wedding night'],
        mbreti: ['liqeni', '☠ drowned with the whole court, the same night'],
        populli: ['liqeni', '☠ the whole town drowned together, leaving only the water'],
        nereida: ['liqeni', 'the one life the flood did not take — the old people say she keeps the lake still'],
      },
      items: { pasuria: ['liqeni', 'sunk with the rest of the kingdom, under the new water'] },
      exit: ['princi', 'mbreti', 'populli'],
    },
  ],
}
