// ===========================================================================
// TALE: Why the Tortoise Carries her House — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it.
//
// The numbered witness here is a MODERN ALBANIAN retelling. No reviewed
// public-domain narrative is imported for this tale (see albanian.why).
// The selected passage is from Hajdar Mallaku's essay «Plaka dhe breshka»
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
    'Albanian etiological legend in a selected modern retelling: Hajdar Mallaku, «Plaka dhe breshka (Prekja e mitit dhe realitetit)», PrizrenPress (Prizren), 6 Nov 2022 · read in Albanian; all lines paraphrased into my own English. Distinct modern variant: «Breshka në letërsi, mitologji e bestytni shqiptare», Koha Jonë (Tiranë), 14 July 2021. These publication locations do not establish the oral collection region.',
  references: [
    {
      role: 'selected-witness',
      citation: 'Hajdar Mallaku, “Plaka dhe breshka (Prekja e mitit dhe realitetit),” PrizrenPress (6 November 2022)',
      url: 'https://prizrenpress.com/plaka-dhe-breshka/',
      note: 'The exact modern Albanian telling selected for the beat record; linked for inspection but not quoted into gameplay because it remains copyrighted.',
    },
    {
      role: 'variant',
      citation: '“Breshka në letërsi, mitologji e bestytni shqiptare,” Koha Jonë (14 July 2021)',
      url: 'https://kohajone.com/kuriozitete/breshka-ne-letersi-mitologji-e-bestytni-shqiptare/',
      note: 'A distinct Albanian variant adding the night theft and explaining why the tortoise hides; not used as the selected witness.',
    },
    {
      role: 'variant',
      citation: 'Myzafere Mustafa, “Poezia për fëmijë e Anton Çettës,” Zemra Shqiptare',
      url: 'https://www.zemrashqiptare.net/myzafere-mustafa-poezia-per-femije-e-anton-cettes-60135.html',
      note: 'Documents Anton Çetta’s different chicken-hiding form of the transformation tale; comparative only.',
    },
  ],
  // Publication context is known; an oral informant and collection region
  // are not established by these records. The village anchors describe the
  // game's chosen setting, not a claimed place of origin for the legend.
  origin: {
    region: 'modern retellings published in Prizren and Tirana; oral collection region not established here',
    collector: 'selected modern retelling by Hajdar Mallaku; no oral informant or collection date established in this record',
    published: 'PrizrenPress (Prizren), 6 November 2022',
  },
  // No reviewed public-domain Albanian narrative is imported into this
  // project's corpus. Modern Albanian witnesses exist; they are paraphrased.
  albanian: {
    status: 'missing',
    why:
      'No reviewed public-domain Albanian narrative of this legend is imported into the project. This is a limit of the selected corpus, not a claim that no older Albanian witness exists. Modern Albanian witnesses are available: Mallaku/PrizrenPress 2022 supplies the selected telling, and Koha Jonë 2021 supplies a distinct variant. Both are copyrighted journalism; the beat lines are English paraphrases, carry no Albanian third element, and cannot feed the Q() quote system. The traditional tortoise riddle at the dry-river bridge is a separate text, not the missing narrative.',
  },
  // where the tellings (and the game\'s own scene) disagree — which reading
  // the beats follow, per case
  discrepancies: [
    'BREAD vs THE MEAT-POT: in Mallaku\'s selected telling the guest receives bread and salt while the host withholds the meat. The game begins before any gift: bread and meat are cooking and the hungry guest waits outside. The player may give the guest meat or hide it. Sharing is a game alternative; no earlier gift of bread and salt is performed in either playable branch. The selected source identifies the shell as the earthen pot.',
    'WHO SPEAKS THE CURSE (reconciled): Mallaku gives the sentence to the deity of Albanian hospitality, and the Koha Jonë variant to God. The playable ending now keeps guest and deity distinct: the mortal guest cries out, his case reaches heaven, and Perëndia speaks the curse.',
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
  // The game stages this tale: fshatiJeta's warm-house entry leads
  // to breshka1 (the guest at the door, the choice, the two endings
  // breshkaMire / breshkaFund), and the elder\'s riddle about her waits at
  // the dry-river bridge — so the anchors are those built spots.
  places: [
    { id: 'shtepia', emoji: '🏠', name: 'the stingy wife\'s house', note: 'her hearth, her pot, her one guest — the whole tale plays here',
      anchor: { status: 'existing', node: 'breshka1', mirror: 'a hearth-house in old Tirana\'s village-life quarter — the game\'s village stands in for the legend\'s any-village',
        mold: 'the house of the playable tale: bread and meat cook while a hungry guest waits outside. Kanun §602 frames the encounter. The player chooses to give meat or hide it; no bread or salt has already been given. Sharing leads to the game alternative breshkaMire, while hiding leads to the transformation in breshkaFund',
        conflicts: 'NOT vatra — the vitore hearth-house belongs to its serpent-keeping family and its fire that never dies. NOT gjizar1 — the lane-fork house is the bee tale\'s: an old, sick mother and three daughters. NOT the three-friends widow-cottage proposal at fshatiJeta — a widow who sold the house bare for her son cannot be the crone with a full meat-pot for one.' } },
    { id: 'rruga', emoji: '🛤️', name: 'the guest\'s road', note: 'the roads the hungry traveller walks — arrival and departure land here',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of old Tirana at the tanners\' bridge',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash',
        sharedWith: ['three-friends', 'half-rooster', 'the whole travel spine'] } },
    { id: 'ura', emoji: '🌉', name: 'the dry-river bridge', note: 'where the tale\'s afterlife lives: a breshkë in the bank grass and an elder\'s riddle about her',
      anchor: { status: 'existing', node: 'ura', mirror: 'the game\'s stone bridge over a dry riverbed, where the elder asks the separate tortoise riddle',
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
  // become the host while food cooks and a hungry guest waits. The CHOICE —
  // give meat or hide it — leads to a blessing or the tortoise transformation.
  // The Kanun's §602 is slotted as a Q()
  // quote. become:'tortoise' rides the entry (fshatiJeta → breshka1).
  play: {
    entry: 'dera',
    stance: 'embodied',
    as: 'plaka',
    role:
      'You are the host in a house where bread and meat are cooking. A hungry guest waits outside and asks for food. The game offers a choice to give him meat or hide it: sharing leads to a blessing, while hiding leads to the divine curse and tortoise transformation. No gift has been made before the choice.',
    enter:
      'you are the host while bread and meat cook, and a hungry guest waits outside asking for food; the saying that the house belongs to God and the guest frames your choice',
    from: 'breshka1',
    ending: 'breshkaFund',
    scenes: {
      breshka1: ['dera', 'thirrja'],
      breshkaFund: ['mallkimi', 'vegshi'],
    },
    divergences: [
      { beat: 'dera', note: 'In Mallaku\'s selected telling the guest receives bread and salt but not the meat. The game starts before any gift and offers a different choice: give meat for "Food for the Guest" (breshkaMire), or hide it and reach the tortoise transformation. The sharing branch is a game alternative, not an ending found in the selected telling.' },
      { beat: 'kodi', note: 'The most famous sentence of the Kanun of Lekë Dukagjini — §602, «Shpija e Shqyptarit âsht e Zotit dhe e mikut», the house of the Albanian belongs to God and the guest — is slotted word-for-word as a Q() quote in the setup, grounding the whole moral test.' },
      { beat: 'rrashta', note: "The selected source reads the shell's winding lines as a mark of guilt. That detailed shell image remains source commentary rather than an enacted beat: the game shows the divine curse, transformation and house carried on her back. The deity is the game's zoti (God), an unseen judge rather than a staged figure." },
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
