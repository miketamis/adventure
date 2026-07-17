// ===========================================================================
// TALE: Why the Tortoise Carries her House — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it.
//
// The numbered original here is a MODERN ALBANIAN telling — the legend has no
// findable 19th-century collected text (see albanian.why). The fullest printed
// telling is the legend passage of Hajdar Mallaku's essay «Plaka dhe breshka»
// (PrizrenPress, 6 Nov 2022); a Tirana variant (Koha Jonë, 14 July 2021)
// agrees on the pot-turned-shell and adds the night-theft reading. Both are
// copyrighted journalism, so all lines are my own-words English paraphrases
// and NO verbatim Albanian third element is carried (nothing here may feed
// the Q() quote system).
// ===========================================================================

export default {
  id: 'tortoise',
  title: 'Why the Tortoise Carries her House',
  source:
    'oral etiological legend, pan-Albanian; fullest printed telling: Hajdar Mallaku, «Plaka dhe breshka (Prekja e mitit dhe realitetit)», PrizrenPress (Prizren), 6 Nov 2022 · read in Albanian; all lines paraphrased into my own English. Variant: «Breshka në letërsi, mitologji e bestytni shqiptare», Koha Jonë (Tiranë), 14 July 2021.',
  // where the tale comes from — anchors should prefer this region's mirrors.
  // The legend is pan-Albanian (the numbered telling is Kosovar Gheg — its
  // «veksh» is the Gheg earthen pot; the Tirana variant says «vegsh»); the
  // game ALREADY stages the tale at the player's own village (breshka1), so
  // the anchors are the village's places, as with the other pan-Albanian
  // hearth legends.
  origin: {
    region: 'pan-Albanian (numbered telling: Kosovar Gheg, Prizren; a Tirana variant agrees on the pot-shell)',
    collector: 'no 19th-century collector on record — the legend survives in modern retellings and in the riddle/proverb stock',
    published: 'PrizrenPress (Prizren), 6 November 2022',
  },
  // NO PUBLIC-DOMAIN ALBANIAN FOLK ORIGINAL FOUND — the lines carry no third
  // element by design.
  albanian: {
    status: 'missing',
    why:
      'no collected folk text of the legend exists in any findable public-domain source. Local corpora: pralla-popullore-shqiptare-1954 has no breshkë tale (grep «breshk»/OCR variants, 0 hits); Dozon (Contes albanais + Manuel), Jarník and Meyer have nothing; von Hahn\'s Albanesische Studien carries the tortoise only in trade statistics, the lexicon and his riddle list (No. 51, «a wooden bowl with four spoons» — the tortoise), and his Griechische und albanesische Märchen\'s Albanian Sagen (Nos. 95–107, checked at zeno.org) have no tortoise; Lambertz 1922\'s one tortoise tale is a DIFFERENT type (the bishop-tortoise penance of Zadrima, tale 47); Fishta\'s Lahuta has only the shtriga-riding-sea-tortoise image (the «pula e dreqit» epithet\'s home); archive.org FTS: Durham\'s Some Tribal Origins gives tortoise medicine, egg-magic and the proverb «no plain without a tortoise» but no curse legend; Elsie\'s 26 folktales, his Folktales-and-Legends book (FTS 0 hits) and Garnett have none. The legend IS printed in Albanian — Mallaku/PrizrenPress 2022 (the numbered telling, with the curse formula «E bafsh në shpinë vekshin përgjithmonë!») and Koha Jonë 2021 — but both are modern copyrighted journalism, retellings rather than collected folk texts, so none of it may feed the Q() quote system and the lines carry no third element. The one verbatim folk text that touches the tale is the traditional riddle «Kam samar, po s\'jam gomar» (answer: breshka), which the game already asks word-for-word at the dry-river bridge (riddle1).',
  },
  // where the tellings (and the game\'s own scene) disagree — which reading
  // the beats follow, per case
  discrepancies: [
    'BREAD vs THE MEAT-POT: the lore card ("would not give a crust") and the game\'s scene (breshka1: «thonë: një grua fshehu bukë nga një mik dhe u bë breshka») compress the sin to hiding BREAD, and the card/blurbs render the fused vessel as a baking-pan (saç). The numbered telling is subtler and harsher: the guest IS fed — bread and salt — while the vegsh of meat stays the host\'s own (¶2.2); stinginess by degree, not flat refusal. The beats follow the telling; the game\'s bread-hiding stays its playable shorthand.',
    'WHO SPEAKS THE CURSE: Mallaku has «perëndia e mikpritjes shqiptare» — a deity of hospitality (¶3.1); the Koha Jonë variant has Perëndia (God) himself stick the pot on; the game\'s secret ending (breshkaFund: «miku mallko ty») lets the GUEST curse; and the lore card\'s "some say to God in a beggar\'s shape" fuses guest and god into one figure. The beats keep two figures and give the curse to the Lord of the registry (zoti — Zoti/Perëndia, the same folk God as the wolf-myth\'s): the guest stays mortal, his cry carries the case to heaven. The beggar-shape reading is recorded here, not staged.',
    'THE NIGHT THEFT (variant): Koha Jonë tells it differently — she sees the guest COMING and pulls the simmering meat off the fire to keep it unshared (naming that one of the nation\'s great shames); at night, with the guest asleep, she rises and eats it alone; God sees, and sticks the vegsh on her back; in the morning she sees herself and feels shame, and ever since she pulls into the shell whenever any creature comes near. The beats follow Mallaku\'s open-table version; the variant\'s shame-etiology (why every tortoise still hides at a footstep) is its own gift and is noted, not staged.',
    'THE CURSE FORMULA: Mallaku prints it verbatim — «E bafsh në shpinë vekshin përgjithmonë!» ("may you bear the pot on your back forever!") — but a 2022 essay is not a collected folk text, so the formula stays here as documentation and enters no line\'s third element (see albanian.why).',
    'THE RIDDLE: neither telling carries the riddle the lore card answers with the tale — «Kam samar, po s\'jam gomar» (I have a packsaddle but I\'m no donkey — the tortoise), a genuine traditional gjëegjëzë the game already asks word-for-word at the dry-river bridge (riddle1 → riddleFund, "The Tortoise\'s Answer"). The last beat leaves her under that bridge on purpose.',
  ],
  // sentence counts of the numbered original\'s 3 paragraphs — the LEGEND
  // passage of Mallaku\'s essay (its hospitality-code frame ¶ and the two
  // legend ¶¶). The essay\'s Sisyphus opening and the author\'s Germany
  // memoir fall outside the tale and are not numbered. Counting notes: ¶2.3\'s
  // parenthetical («mbetja e syrit ishte diçka që shiton») and ¶2.4\'s gloss
  // count inside their sentences.
  paragraphs: [2, 4, 3],
  cast: [
    { id: 'plaka', name: 'plaka jomikpritëse', note: 'the stingy old wife — a pot of meat for herself, bread and salt for the guest; the first tortoise', npc: 'plakaBreshka' },
    { id: 'miku', name: 'miku i uritur', note: 'the hungry traveller-guest — fed to the code\'s letter and cheated of its heart; his cry brings the curse', npc: 'mikuUritur' },
    { id: 'perendia', name: 'Perëndia', note: 'the Lord of the folk tellings — Mallaku calls him the deity of hospitality; he hears the cry and speaks the curse', npc: 'zoti' },
  ],
  // anchor = the game location this tale place inhabits (see _SCHEMA.md).
  // The game ALREADY stages this tale: fshatiJeta\'s «bëj bukë» option leads
  // to breshka1 (the guest at the door, the choice, the two endings
  // breshkaMire / breshkaFund), and the elder\'s riddle about her waits at
  // the dry-river bridge — so the anchors are those built spots.
  places: [
    { id: 'shtepia', emoji: '🏠', name: 'the stingy wife\'s house', note: 'her hearth, her pot, her one guest — the whole tale plays here',
      anchor: { status: 'existing', node: 'breshka1', mirror: 'a hearth-house in old Tirana\'s village-life quarter — the game\'s village stands in for the legend\'s any-village',
        mold: 'the house of the tale the game already tells on this spot: the map draws it as a house labeled "the guest", the scene stages a guest at the door and a loaf in the making, its own line says «thonë: një grua fshehu bukë nga një mik dhe u bë breshka», and it quotes Kanun §602 in gold — the wife of that saying lived HERE, and the two endings (breshkaMire/breshkaFund) are her choice replayed',
        conflicts: 'NOT vatra — the vitore hearth-house belongs to its serpent-keeping family and its fire that never dies. NOT gjizar1 — the lane-fork house is the bee tale\'s: a dying mother and three daughters. NOT the three-friends widow-cottage proposal at fshatiJeta — a widow who sold the house bare for her son cannot be the crone with a full meat-pot for one.' } },
    { id: 'rruga', emoji: '🛤️', name: 'the guest\'s road', note: 'the roads the hungry traveller walks — arrival and departure land here',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of old Tirana at the tanners\' bridge',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash',
        sharedWith: ['three-friends', 'half-rooster', 'the whole travel spine'] } },
    { id: 'ura', emoji: '🌉', name: 'the dry-river bridge', note: 'where the tale\'s afterlife lives: a breshkë in the bank grass and an elder\'s riddle about her',
      anchor: { status: 'existing', node: 'ura', mirror: 'a stone bridge over a dry riverbed — every Albanian plain has one, and the proverb Durham heard says no plain is without a tortoise',
        mold: 'the bridge over the dry river where an old man tells a gjëegjëzë — the riddle scene (riddle1 → riddleFund, "The Tortoise\'s Answer") is ABOUT her: «ka samar por nuk është gomar»; the bank grass below is where a breshkë suns and crawls today, her story asked over her head — the riddle and the riddled-about share one spot by definition',
        sharedWith: ['the river travel spine (ura → uraFshaj crossing)'] } },
    { id: 'qielli', emoji: '☁️', name: 'heaven', note: 'the Lord\'s seat — the tale never climbs there; the curse comes down from it',
      anchor: { status: 'offstage', mirror: 'the folk heaven of the myth-notes, above every hearth at once',
        mold: 'never drawn — the Lord watches and curses from offstage, exactly as the creation-wolf registry keeps him: if heaven is ever drawn it sits above the Sun\'s plateau and is NOT the Sun\'s compound',
        conflicts: 'NOT diellShtepi1 — Dielli is his own sworn-by eye with his own house and quest arc; the watch kept on the hearths and the curse of the stingy is Zoti/Perëndia\'s, never the Sun\'s' } },
  ],
  items: [
    { id: 'vegshi', emoji: '🍲', name: 'the vegsh — the earthen meat-pot', note: 'her dinner for one, simmering on the fire; the curse fuses it to her back — the first shell' },
    { id: 'bukaKripa', emoji: '🍞', name: 'bread and salt', note: 'the guest\'s portion — enough to answer the code\'s letter and break its heart' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md). You
  // become the host at your own fire when a hungry guest comes; the CHOICE — set
  // bread before him or hide your pot — keeps your roof or curses you to carry it
  // forever as the first tortoise. The Kanun's §602 is slotted verbatim as a Q()
  // quote. become:'tortoise' rides the entry (fshatiSheshi "bëj bukë" → breshka1).
  play: {
    entry: 'dera',
    stance: 'embodied',
    as: 'plaka',
    role:
      'You are the host at your own fire, baking bread, when a hungry guest comes to the door. The Kanun says your house belongs to God and the guest — set bread before him and keep your roof and your name, or hide your full pot and be cursed to carry your house on your back forever, the first tortoise.',
    enter:
      'you are baking bread at your own fire when a hungry guest comes to the door, and the Kanun\'s oldest law — the house belongs to God and the guest — is about to be tested in you',
    from: 'breshka1',
    ending: 'breshkaFund',
    scenes: {
      breshka1: 'thirrja',
      breshkaFund: 'vegshi',
    },
    divergences: [
      { beat: 'dera', note: 'The legend is only about the stingy old woman who is cursed; the game gives YOU her choice and adds the path she never takes — set bread before the guest and reach the good ending "Bread for the Guest" (breshkaMire), "her opposite and her answer." Hide your pot and you enact the etiology and become the first tortoise.' },
      { beat: 'kodi', note: 'The most famous sentence of the Kanun of Lekë Dukagjini — §602, «Shpija e Shqyptarit âsht e Zotit dhe e mikut», the house of the Albanian belongs to God and the guest — is slotted word-for-word as a Q() quote in the setup, grounding the whole moral test.' },
      { beat: 'rrashta', note: "The shell-plate's winding lines read as the guilt written where she can never put it down are kept in the ending's image; the deity of hospitality who curses her is the game's zoti (God), played as the unseen judge rather than staged as a figure." },
    ],
  },
  beats: [
    {
      id: 'kodi', title: 'The house is God\'s and the guest\'s',
      note: 'The frame the legend hangs on: hospitality raised so high the world called Albanians its champions, and the Kanun wrote it down — §602, the line the game\'s own scene quotes in gold: «Shpija e Shqyptarit âsht e Zotit dhe e mikut».',
      lines: [
        ['1.1', 'Among Albanians the code of the guest was raised mountain-high — champions of hospitality, the world called them — and myth first, then the spoken and the written word, laid up example after example of it.'],
        ['1.2', 'The Kanun itself set the code in law — the house of the Albanian belongs to God and the guest — and the whole household bent together to make the guest easy.'],
      ],
      cast: {
        plaka: ['shtepia', 'keeps her hearth alone; a pot of meat set to simmer for herself as the light goes'],
        miku: ['rruga', 'a hungry traveller on the evening road, no roof yet for the night'],
        perendia: ['qielli', 'keeps the code\'s eye on every hearth below'],
      },
      items: {
        vegshi: ['shtepia', 'on the fire — meat simmering, dinner for one'],
        bukaKripa: ['shtepia', 'in the cupboard — the least a house can offer'],
      },
    },
    {
      id: 'dera', title: 'Bread and salt — and no more',
      note: 'The one code-breaking the legend remembers: the guest is taken in, and served to the code\'s letter only. The pot of meat stays the host\'s own.',
      lines: [
        ['2.1', 'Yet the code was broken once — by an inhospitable old woman, and a deity punished her for it.'],
        ['2.2', 'The old woman had a whole pot of meat for her own dinner; before her guest she set bread and salt.'],
      ],
      cast: {
        miku: ['shtepia', 'taken in at the door; seated at her table with bread and salt before him'],
        plaka: ['shtepia', 'serves the code\'s minimum and keeps the meat back for herself'],
      },
      items: {
        bukaKripa: ['miku', 'set before the guest — the whole of his supper'],
      },
    },
    {
      id: 'thirrja', title: 'The hungry man\'s eye',
      note: 'He blesses her even for the little — but he has SEEN the pot on the fire, and his eye stays caught on it (the telling glosses it: a caught eye is a thing that strikes). His cry goes up past her roof. The telling seals it with the old word on guests: neither hide it nor beg it.',
      lines: [
        ['2.3', 'The hungry guest thanked and blessed her even for that — but he had seen the pot at the fire and his eye had stayed caught on it, and he cried out: hey, o god — this was never the Albanians\' way!'],
        ['2.4', 'For among Albanians the old word ran: for the guest, neither hide it nor beg it — what the house happens to hold is not hidden from him, and what it lacks is not borrowed from a neighbour to dress the table.'],
      ],
      cast: {
        miku: ['shtepia', 'blesses the bread with his eye on the fire — and cries his hunger up to heaven'],
        plaka: ['shtepia', 'unmoved at her hearth, the meat still hers alone'],
        perendia: ['qielli', 'hears the hungry man\'s cry rise off her roof'],
      },
    },
    {
      id: 'mallkimi', title: 'The curse comes down',
      note: 'Heaven is amazed such a thing could happen under an Albanian roof — and the curse is spoken: may you bear the pot on your back forever. (Mallaku prints the formula: «E bafsh në shpinë vekshin përgjithmonë!»)',
      lines: [
        ['3.1', 'The deity of Albanian hospitality, astonished that such a thing could be, cursed the old woman: may you carry the pot on your back forever!'],
      ],
      cast: {
        perendia: ['qielli', 'speaks the curse on the stingy house'],
        plaka: ['shtepia', 'cursed at her own hearth, the pot still warm on the fire'],
      },
    },
    {
      id: 'vegshi', title: 'The pot becomes a shell',
      note: 'She crawls to her pot even so, eats her dinner, and stiffens where she sits: the first tortoise. The pot is her shell now; the roof she would not share, hers to carry wherever she goes, for all her long life.',
      lines: [
        ['3.2', 'And the old woman dragged herself to the pot, ate her dinner, froze where she sat and was changed into the tortoise — and with the pot for a shell she crawls through the whole of her long life.'],
      ],
      cast: {
        plaka: ['shtepia', 'turned tortoise at her own hearth — the vegsh fused to her back, the house hers to carry'],
        miku: ['rruga', 'gone on his way — the road keeps the hungry moving'],
      },
      items: {
        vegshi: ['plaka', 'fused to her back — the first shell, emptied by her own last supper'],
      },
    },
    {
      id: 'rrashta', title: 'Written on her shell',
      note: 'The legend\'s last word: the plated shell and the snaking seam traced across it spell out her own guilt, for every child to read. So the inhospitable are remembered — and the bridge elder still asks her story as a riddle: «Kam samar, po s\'jam gomar».',
      lines: [
        ['3.3', 'The shell-plate and the winding line traced across it mark her guilt — written where she can never put it down.'],
      ],
      cast: {
        plaka: ['ura', 'crawls the dry bank grass below the bridge, slow and shut-in, her sentence read on her back — while the elder above asks the riddle that is her'],
      },
    },
  ],
}
