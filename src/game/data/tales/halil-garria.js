// ===========================================================================
// TALE: Kënga e Halil Garrisë — The Song of Halil Garria — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// A KRESHNIK-COUNTRY BESA-BALLAD, not a prose tale — 152 verses, recorded by
// Fr. Gjergj Fishta at Gomsiqe (a village near Pukë) from an unnamed lahutar,
// published in Hylli i Dritës (1924). English and Albanian run close to
// verse-for-verse, so "paragraphs" here are 12 narrative stanza-groups this
// author has divided the verses into, and a "sentence" is a punctuation-
// bounded verse-group (1–8 lines); the Albanian third element is the
// verbatim verse group, lines joined with " / ". No English translation of
// this specific ballad was located anywhere — every English line below is
// this author's own paraphrase made directly from the Albanian original, not
// a rendering of any secondary source.
// ===========================================================================

export default {
  id: 'halil-garria',
  title: 'Kënga e Halil Garrisë — the oath beyond death',
  source:
    'Recorded from an unnamed lahutar of Pukë by Fr. Gjergj Fishta at Gomsiqe; published in the review Hylli i Dritës, 1924 (152 verses) · full verbatim text and scholarly analysis in Timo Mërkuri, "Kënga e Halil Garrisë dhe disa probleme" (fjalaelire.com, Sarandë, November 2020) · all lines are this author\'s own paraphrase made directly from the Albanian, never copied from any existing translation (none was found)',
  origin: {
    region: 'North Albania (Gheg) — Gomsiqe, near Pukë, in the Malësia highlands',
    collector: 'Fr. Gjergj Fishta, from an unnamed lahutar (lute-singer) of Pukë',
    published: 'Hylli i Dritës, 1924',
  },
  // the ALBANIAN ORIGINAL: every beat line's third element is the verbatim
  // verse-group for that ¶.sentence (lightly cleaned; raw text in `local`).
  albanian: {
    title: '«Kënga e Halil Garrisë»',
    source:
      'Recorded by Fr. Gjergj Fishta at Gomsiqe from an unnamed lahutar of Pukë; published in Hylli i Dritës, 1924 (152 verses). Reproduced here from Timo Mërkuri, "Kënga e Halil Garrisë dhe disa probleme," fjalaelire.com (Nov. 2020), which states it publishes Fishta\'s text "pa ndërhyrje në tekst" (without altering it) — the only place the complete verbatim ballad was located after searching every local corpus (pralla-popullore-shqiptare-1954, Dozon, Hahn, Jarnik, Meyer, Lambertz, Fishta\'s own Lahuta e Malcís) and archive.org. Gheg spelling, elisions and the source\'s own (sometimes unpaired) quotation marks are kept exactly as printed; only the rhapsode\'s/editor\'s every-fifth-verse line-count numerals (5-, 10-, 15- … 150-, 152-) — typesetting apparatus, not sung text — have been dropped from the quotations below.',
    local: 'docs/references/fishta-kenga-halil-garrise.sq.txt',
  },
  discrepancies: [
    'THE OTHER VARIANT: the source article states a second, shorter (146-verse) variant of this ballad was recorded in 1951 at Rubik from a miner of Rrejë e Velës, Mirditë, and "is published" — but does not reproduce its text, and no other copy was located. No comparison of the two variants was possible; these beats follow the Fishta/Gomsiqe text alone.',
    'AMBIGUOUS DIALECT (¶4.2, verse 42-43): «Paskan pas të bardhën li, se të nandë vllaznit lija i mbyti» most likely pictures the wedding party carrying a white bridal veil, whose sight overcame the nine brothers with grief — but "li" resists a fully certain reading in this Gheg text. The paraphrase keeps the image general rather than overclaiming a precise object.',
    'AMBIGUOUS DIALECT (¶8.2, verses 89-92): Halil\'s excuse for his silent flute — «nandë fej që kemi pasë, / të nandëve s\'bashku na u kem ra, / të gjithve gjuha cop a ba» — literally suggests nine betrothals or engagements ("fej") entered into all at once, in some crush or fall that bruised everyone\'s tongues; the paraphrase renders this loosely as "nine matches... in the crush" rather than asserting a precise reading of an obscure verse.',
    'THE ARM FROM THE GRAVE (¶12.3, verses 148-149): «Djali gjall ma nuk u ndie, veç se krahin jashtë ka shti» — Mërkuri\'s own analysis flags this couplet as probably a LATER addition to the song, since it implies Halil is somehow still "alive" in the grave at the moment his mother and sister call him, which fits neither the ballad\'s own logic (he rose and rode nine days already, as a dead man, once) nor the Constantine & Doruntine tradition (no re-entry into the grave, no second stirring). The beats keep the couplet as printed — it is the text as it survives — but the scholarly doubt is recorded here.',
    'HALIL GARRIA vs. THE CORE NPC KOSTANDINI: per Robert Elsie\'s own headnote (cited in tale-constantine-doruntine.js\'s discrepancies), "Halil Garria" is sometimes treated as simply the north\'s regional NAME for the same dead-brother ballad figure Elsie translates as Kostandini. The actual recovered ballad text, however, diverges from both Kostandini sources (Elsie\'s Chameria verse and the 1954 Tiranë prose) in the event that starts the tragedy (a besa SOLD for fifty purses of gold, not a mother\'s curse alone), the devices used on the road home (three lies Halil tells about earth, flute and birdsong, rather than three birds reciting one riddling refrain), and the ending (mother AND sister both die together at the grave, rather than the mother alone at the door, or both at the door). Given how much specific detail differs, this tale keeps Halil Garria as his own figure with his own registry NPC, rather than reusing "kostandini" — the same choice tale-kostandini-i-vogel.js already made for its own related-but-distinct besa ballad (Aga Ymeri).',
  ],
  // 12 narrative stanza-groups this author has divided the ballad\'s 152
  // verses into; sentence counts per group
  paragraphs: [4, 5, 3, 3, 3, 3, 4, 4, 3, 3, 4, 4],
  cast: [
    { id: 'halil', name: 'Halil Garria', note: 'sold his sister\'s besa for gold, then kept his own besa to her even from the grave', npc: 'halilGarria' },
    { id: 'motra', name: 'his sister', note: 'the one sister among nine brothers; carried off, then widowed of her whole family in one homecoming', npc: 'motraGarris' },
    { id: 'nena', name: 'their mother', note: 'raised nine sons and one daughter; buried every one of the sons herself', npc: 'nenaGarris' },
    { id: 'vellezerit', name: 'the eight other brothers', note: 'bound to the same oath Halil broke; dead before the tale is over', npc: 'vellezeritGarris' },
    { id: 'zotnia', name: 'the wealthy lord', note: 'buys the sister\'s hand for fifty purses of gold over a single dinner', npc: 'zotniuFisnik' },
    { id: 'zoku', name: 'the mountain bird', note: 'carries the sister\'s reproach to Halil\'s own grave, seven years on', npc: 'zoguIMalit' },
    { id: 'krushq', name: 'the wedding party', note: 'ninety mounted riders who come to take the bride — the SAME krushqit who ride every dasma', npc: 'krushqit' },
  ],
  // anchor = the game location this tale place inhabits. REUSE over
  // invention, under THE SHARING RULE. This tale is NORTHERN (Gomsiqe, near
  // Pukë) — its anchors must not borrow the south's mirrors, and must not be
  // confused with Jutbina, the OTHER northern-highland hamlet this map
  // already stages (home of Mujo and of Halili the kreshnik — a different
  // Halil entirely).
  places: [
    { id: 'home', emoji: '🏘️', name: 'Halil Garria\'s hamlet', note: 'the houses the nine brothers raised for themselves, in the Malësia highlands near Pukë',
      anchor: { status: 'proposed', node: 'mali1', mirror: 'a highland hamlet after Gomsiqe, the village near Pukë where an unnamed lahutar\'s song was written down by Fr. Gjergj Fishta in 1924',
        mold: 'nine brothers\' own houses, raised close together, prosperous enough that even one of their weddings could seat nine hundred guests',
        conflicts: 'NOT mali1\'s own existing mold ("a bare, empty flank where wanderers cross paths — nobody owns the open mountainside," already shared by three-friends/mujo-strength/sari-salltek/legjenda-e-prespes/ali-pashe-tepelena as the map\'s one shared "a mountain, when a tale needs one" hub) — this hamlet is a separate PROPOSED spot pinned here only as the nearest jump-off, the same way those other tales pin their own elsewhere-mountains here without claiming to BE the bare flank. Also NOT Jutbina (jutbina/mujo1/halil1), the OTHER northern hamlet this same mountain massif already stages — home to Mujo and to Halili the kreshnik, a different man who merely shares this ballad\'s hero\'s given name.',
        proposal: 'draw a cluster of stone houses at the northern skirt of these heights, with a small family graveyard a short walk behind them' } },
    { id: 'grave', emoji: '⚰️', name: 'Halil\'s grave', note: 'the family graveyard behind the houses — nine fresh graves, then a mother and sister\'s besides',
      anchor: { status: 'proposed', node: 'mali1', mirror: 'the same proposed hamlet\'s own burying-ground',
        mold: 'a short walk from the houses: nine white graves for nine brothers, and Halil\'s own — the one grave that does not, quite, stay shut',
        conflicts: 'NOT kostandin1 (the existing village-churchyard grave already telling Kostandini\'s own, separately-sourced besa-ballad — see the discrepancies above) — a different dead man, a different family, a different region\'s telling of a shared motif',
        proposal: 'draw nine plain white graves in a row, and Halil\'s own tenth beside them, a short walk behind the hamlet\'s houses',
        sharedWith: ['this tale\'s own "home" place — the two sit a few steps apart, both pinned at mali1 for now'] } },
    { id: 'road', emoji: '🛤️', name: 'the road, nine days each way', note: 'the long road between the hamlet and the lord\'s household',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of old Tirana at the tanners\' bridge',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash',
        sharedWith: ['three-friends', 'constantine-doruntine', 'kostandini-i-vogel', 'the whole travel spine'] } },
    { id: 'suitorHouse', emoji: '💍', name: 'the lord\'s household, nine days off', note: 'where the sister is taken, and where she waits seven years for a brother who is already dead',
      anchor: { status: 'offstage', mirror: 'a wealthy household somewhere down the long road — the ballad never says exactly where',
        mold: 'never staged — like the foreign village in constantine-doruntine or the rival kings\' lands in three-friends, the tale only ever speaks of this place' } },
  ],
  items: [
    { id: 'qesetAri', emoji: '💰', name: 'the fifty purses', note: 'the bride-price that turned Halil\'s own oath against itself' },
    { id: 'gjogu', emoji: '🐎', name: 'the grey horse', note: 'carries Halil living and carries him dead — the song never says which horse is which' },
    { id: 'vorret', emoji: '⚰️', name: 'the nine white graves', note: 'the proof of the family\'s ruin, found in plain sight on the road home' },
  ],
  // EMBODIED projection: you ARE Halil, bound by a besa to a sworn brother whom
  // a Krajl has chained in a foreign burg. The choice is the whole tale in
  // miniature — keep the besa and ride to free him (the good ending, "Halili
  // Keeps His Word"), or abandon him and flee alone (the bad ending, "The Broken
  // Oath"). Entered from jutbina via the "shpeto vëllai" threshold
  // (become:'halil-garria'); the dedicated nodes are halilGarria1 (entry+choice)
  // and its two endings. See ../../content.js.
  play: {
    entry: 'reassure',
    stance: 'embodied',
    as: 'halil',
    role: 'You are Halil Garria, and the whole song lives in one word you gave: your besa, sworn to a brother. A Krajl has taken that brother and chained him in a foreign burg, and now the oath comes due. Ride for the prison and break the iron from his wrists — keep your word whole against a Slav king\'s dungeon — or weigh the road and the risk, turn away, and leave him to rot with the besa broken behind you. In the kreshnik country a man is only as good as his besa.',
    enter: 'a brother you are bound to by besa lies chained in a Krajl\'s foreign burg, and the oath you swore for him has come due',
    from: 'halilGarria1',
    ending: 'halilGarriaFund',
    scenes: {
      halilGarria1: 'reassure',
      halilGarriaFund: 'rising',
      halilGarriaKeq: 'bargain',
    },
    divergences: [
      { beat: 'reassure', note: 'Built from scratch as a besa-rescue distilled from the dead-brother ballad. The full song\'s besa is a sister\'s marriage-oath; the playable arc keeps the ballad\'s true engine — a besa given, then tested to the death — but recasts it as the oath a kreshnik owes a sworn brother, so the choice can be staged as a single frontier decision at Jutbina.' },
      { beat: 'rising', note: 'The good ending, "Halili Keeps His Word," is the ballad\'s own miracle made a choice: in the song God raises the dead Halil to keep an unpaid besa, and here you keep it while living — riding to the burg, breaking the iron, carrying the brother home. The oath held even against a king\'s dungeon.' },
      { beat: 'bargain', note: 'The bad ending, "The Broken Oath," is the road the song\'s Halil takes at the outset when he sells his besa for fifty purses — here you break it not for gold but for your own skin, and the brother stays chained while the oath lies broken behind you. The divergence the doomed ballad never lets its hero escape.' },
    ],
  },
  beats: [
    {
      id: 'vow', title: 'Nine brothers, one sister',
      note: 'Halil Garria and his eight brothers swear together, by God, never to marry their one sister off far from home. The whole world of the tale is placed before the oath is even a day old.',
      lines: [
        ['1.1', "Halil Garria's household counted nine brothers and a single sister, and the young man swore by God that they would never marry her off nine days' journey from home.", "Zot ç’ka than Halil Garrija? / Be mbi zotin trimi bani / “Pse nant vllezën ne q’i jemi / Veç nji motër, tjetër s’kemi / Nand dit udh larg do ta apim?"],
      ],
      cast: {
        halil: ['home', 'young, already sworn with his brothers never to marry his sister off'],
        motra: ['home', 'the one sister among nine brothers'],
        nena: ['home', 'raises nine sons and one daughter in the highland houses'],
        vellezerit: ['home', 'bound to the same oath as their youngest brother'],
        zotnia: ['suitorHouse', 'a wealthy lord, not yet met'],
        zoku: ['road', 'a bird of the highlands, wandering, not yet called'],
        krushq: ['road', 'ride their standing loop, not yet called to any wedding of this tale'],
      },
      items: { gjogu: ['halil', 'his grey horse, saddled for the road'] },
    },
    {
      id: 'guest', title: 'A night under a great roof',
      note: 'Halil sets out from home all the same, and the road carries him to the house of a very wealthy lord, who takes him in for the night.',
      lines: [
        ['1.2', "Then he set out from the house all the same, down a road that carried him far, until he came to lodge with a lord of great consequence.", "A çue djali fill prej shpijet / Shteg të largët tek paska marë / Paska vojt ke nji zotni ma i randi;"],
        ['1.3', "\"Good evening to you, lord,\" he said. \"Welcome, young traveller,\" the lord answered — \"will you not stay the night and sup with us?\"", "“Mbramja mirë more  Zotni” / “Mirë se vjen ti djalë i ri! / A s’na rin sonde për darkë”?"],
        ['1.4', "They brought him inside, and over the meal the two of them spoke together as men of honor do.", "I a dhanë djalit mbrendë me hi / Fjalë burrnie paskan folë."],
      ],
      cast: {
        halil: ['road', 'travels far from home and lodges the night with a great lord'],
        zotnia: ['suitorHouse', 'welcomes the young traveller in for the night'],
      },
    },
    {
      id: 'bargain', title: 'Fifty purses',
      note: 'Over the after-dinner talk the lord asks whether Halil has an unmarried sister. Halil names his own oath never to marry her off — and then, at the offer of fifty purses of gold, breaks it on the spot.',
      lines: [
        ['2.1', "When dinner was over, the old lord of the house put a question to Garria.", "Kur ka ardh koha e mbas darkës / Plaku i shpisë po pëvet Garrinë"],
        ['2.2', "\"By your oath, young man,\" he said, \"is there a girl waiting at your own hearth?\" \"I have one,\" Halil answered — \"my own sister.\"", "“Amanet more djal i ri / Ja a se ke ndoj çik në votër? / “Un e kam nji t’eme motër;"],
        ['2.3', "\"But I have sworn by God never to marry her off as long as I live.\"", "Be mbi zotin por kam ba / Sa t’jem gjallë mos me e martue!”"],
        ['2.4', "\"You strike me as an honest boy,\" said the lord. \"I would give fifty purses of gold for her hand.\"", "“Paj fisnik more djal po m’duke / Pesdhetë qese për ta kjeshë tuj dhanë”"],
        ['2.5', "How quickly the boy's resolve turned — he gave the lord his word, and took the gold.", "Sa shpejt djalit mendja ju ka kthye / Fjalën mikut m’i ka dhanë / Edhe paret m’ia ka marrë."],
      ],
      cast: {
        halil: ['suitorHouse', 'names his own oath, then breaks it for fifty purses of gold'],
        zotnia: ['suitorHouse', "offers fifty purses for the sister's hand and wins Halil's besa"],
      },
      items: { qesetAri: ['halil', 'fifty purses of gold, the price of a broken oath'] },
    },
    {
      id: 'reassure', title: 'A second besa',
      note: 'Halil comes home already sick with regret. His sister senses it at once and presses him — and he answers with a second besa: within nine days he will come see her, within nine weeks he will come bring her home.',
      lines: [
        ['3.1', "By the time he made his trembling way home he was already sick with regret, and his sister sensed at once that something was wrong.", "Kur a dridhë djali në shpi / Se fort niska m’u pendue / Edhe motra vesht ka marrë;"],
        ['3.2', "\"By the God who made you, brother,\" she said, \"why take on so heavy a bargain — will you truly give me away nine days from home?\"", "“Pash nji zot që ty t’ka dhanë / Pse bre vlla me m’marrë kaq rrandë / Nand dit udhë larg q’i don me m’dhanë?”"],
        ['3.3', "\"Come now, sister,\" he told her. \"For the besa I gave for you: within nine days Halil will come and see you with his own eyes; within nine weeks Halil will come and bring you home for a visit.\"", "“Hajt moj motër” i ka thanë / Se për kët bes q’i ta kam dhanë / Kur t’i mbushi plot nand ditë / Vjen Halili e t’shef me sy / Kur t’i mbushish plot nand javë / Vjen Halili e t’mer në t’pam”."],
      ],
      cast: {
        halil: ['home', 'comes home sick with regret, and gives his sister a second besa'],
        motra: ['home', 'senses the trouble in him and presses him for the truth'],
      },
    },
    {
      id: 'taken', title: 'Ninety riders',
      note: 'Ninety mounted wedding-guests arrive to take the bride. The sister is carried off not knowing what she cost, while her brothers are overcome with grief at the parting.',
      lines: [
        ['4.1', "Ninety mounted wedding-riders came for the bride, to part the sister from her brothers.", "Nënd-dhet krushq tek paskan ardhë / Kan ardhë nusen për me marrë / Me da motrën prej vllaznijet."],
        ['4.2', "All ninety were on horseback, carrying the white bridal veil — and grief over it overcame the nine brothers.", "Nand-dhet vet të tan kalori / Paskan pas të bardhën li / Se të nandë vllaznit lija i mbyti."],
        ['4.3', "Of the price her brother had already taken, the sister herself knew nothing at all.", "As kurrgja motra me dijtë."],
      ],
      cast: {
        krushq: ['home', 'ninety strong, ride in to take the bride away'],
        motra: ['suitorHouse', "carried off to the lord's household, still not knowing the price paid for her"],
        vellezerit: ['home', 'overcome with grief as their sister is taken'],
        halil: ['home', 'watches his sister go, the second besa still owed'],
      },
    },
    {
      id: 'waiting', title: 'A bird sent after him',
      note: 'Nine days pass at the lord\'s house with no sign of Halil. The sister sends a mountain bird to reproach him — and the song circles back to name what really happened the night she was taken: her brothers, grieving, in their own courtyard.',
      lines: [
        ['5.1', "When nine full days had run their course, she watched the near road for him — but no one at all came into sight.", "Kur janë mbushur plot nandë ditë / Kundron motra rrugën  s’largut / Por kurkend s’po dan me sy."],
        ['5.2', "So she leaned against a beech tree and spoke to a mountain bird: \"By your oath, mountain bird, carry word to my young brother Halil — tell him his own sister asks: where did you leave the besa you gave me?\"", "At-herë pshetet buz nji ahit / Ban kuvend me nji zog malit: / “Amanet more zogu i malit / M’i  thuej vllaut Halilit të ri / Se jot motër mue më ka thanë: / -“Ku e lae bësën q’i m’ke dhanë?”"],
        ['5.3', "But it was that very night, the song remembers, that the wedding party had ridden her seven hours to her new home — and when the nine brothers turned back into their own courtyard, grief overtook them all.", "Por n’at natë qi ki’n ardh krushqit / Shtat sahat motrën e ki’n përcjell / Kur ki’n kthye n’obor t’sarajit / Të nand vllaznit vran shosho’jn."],
      ],
      cast: {
        motra: ['suitorHouse', 'watches nine days for a brother who never comes, then sends a bird after him'],
        zoku: ['suitorHouse', "takes the sister's message and sets out to find Halil"],
        vellezerit: ['home', 'grieved bitterly the very night she was taken, the song remembers'],
      },
    },
    {
      id: 'rising', title: 'Seven years, and a grave found',
      note: 'Seven years the sister weeps and the bird searches, before it finds a grave at last — Halil\'s own. God takes pity on the unpaid besa and raises him.',
      lines: [
        ['6.1', "Seven years the sister sat and wept. Seven years the bird went flying. Seven years it searched for a grave.", "Shtat vjet motra ndej tuj kja / Shtat vjet zogu tue fluturue / Shtat vjet vorrin tue kërkue:"],
        ['6.2', "\"The grave has caught you with your besa still unpaid,\" it called down to him at last. \"A sister waits for you; a mother waits for you.\"", "“T’ka xan vori me besë të dhanë / T’pret nji motër, t’pret nji nanë”"],
        ['6.3', "God himself was moved to pity. \"Rise up, Halil,\" He said. \"Go and fetch her.\"", "Dhimët te zoti i paska ra: / “Çohu Halil ti! Hajt e mere!”"],
      ],
      cast: {
        motra: ['suitorHouse', 'seven years weeping, still waiting for a brother already dead'],
        zoku: ['grave', "seven years searching; finds Halil's grave at last and delivers the sister's message"],
        halil: ['grave', "found already lying dead in his own grave — the song never says how he died — until God's own pity raises him"],
      },
    },
    {
      id: 'reunion', title: 'Nine days\' ride, and no time for coffee',
      note: 'Risen and mounted on his grey horse, Halil rides nine days to his sister. He greets her warmly but will not stop to rest — they must be on the road for home at once.',
      lines: [
        ['7.1', "At that the boy climbed up out of the grave, mounted the grey horse he had ridden before, journeyed nine days, and stood at last before his sister.", "Qat-herë djali a dalë prej vorrit / Në shpin të gjogut si kish pas ra / Nand ditë udhë larg tue shtegtue / Po i del para tue nga e motra:"],
        ['7.2', "\"Welcome, sister's Halil,\" she greeted him. \"Good to find you, my own sister,\" he answered.", "“Mirëse vjen Halil i motrës” / “Mirë se të gjej moj motra e eme”"],
        ['7.3', "\"Come inside and take a coffee,\" she said. \"No need to press me, sister,\" he told her — \"I have already eaten bread and drunk my coffee. Get ready — let us be on the road for home.\"", "“Hajde mrendë me pi nji kafe” / “S’ke pse m’ton moj motra e eme / Bukë kam ngranë, kafe kam pi / Po shtrëngohu e t’shkojmë në shpi”"],
        ['7.4', "\"Blessed be, sister,\" he said to her; she dressed and made herself ready, and the two of them set off, slow step by step.", "“Po lum motra” i paska thanë / Edhe veshet e shtrëngohet / Marin rrugën dalë-kadalë."],
      ],
      cast: {
        halil: ['suitorHouse', "arrives after nine days' hard riding and presses his sister to leave for home at once"],
        motra: ['suitorHouse', 'greets the brother she waited seven years for, and makes ready to leave with him'],
      },
      items: { gjogu: ['halil', 'the same grey horse, ridden now by a dead man'] },
    },
    {
      id: 'omens', title: 'Three lies on the road',
      note: 'On the road home the sister notices, one by one, that something is wrong with her brother — the smell of earth on him, his silent flute, a pair of birds who name the truth outright. Each time he answers with a fresh lie, and dismisses the birds as fairy chatter.',
      lines: [
        ['8.1', "When they came to a certain landmark, the sister said to her brother: \"You smell of the earth!\" \"Go on, sister — God forgive you,\" he answered. \"We nine brothers have nine houses standing, and we have been laying stone and lime; that is why the earth-smell is on me.\"", "Kur kan shkue der m’nji shej vendit / Na i tha motra t’vllat Halilit: / “Era dhe bre vlla po t’vjen?!” / “Hec moj motër zoti t’vraftë / Se nandë vllazën qi kemi kanë / Nandë saraje kemi m’kambë / Tuj bajtë gur tuj bajtë gëlqere / Prandaj era dhe mue më vjen”."],
        ['8.2', "A little further on she asked him, \"Play me the flute, brother.\" \"Go on, sister,\" he told her — \"we nine brothers made nine matches all at once, and in the crush every one of our tongues took a knock.\"", "Kur kan shkue pak më përtej / “Bjeri fyellit vlla” i ka thanë / “Hec moj motër” djali i ka thanë / “Se nand vllazën qi kem kan / Se nandë fej që kemi pasë / Të nandëve s’bashku na u kem ra / Të gjithve gjuha cop a ba”"],
        ['8.3', "Two mountain birds fell to talking, marvelling at the strange thing they saw that day: \"The living travels the road with the dead!\"", "Ç’po kuvendin dy zogj malit / Me nji çudë që sot po shofin! / “Shkon i gjalli udhës me të dekin”"],
        ['8.4', "\"I hear something, brother,\" the sister said. \"What are the mountain fairies saying?\" \"Go on, sister — God forgive you,\" he told her. \"Pay heed to mountain fairies, and we shall not reach home in three years.\"", "“Ndiej mor vëlla” motra po thotë / “Shka kuvendin zojt e malit?” / “Hec moj motër zoti t’vrafët / Q’i u mba vesh ti zojve t’malit / Për në marsh vesht ti zojt e malit / Për tri vjet ke shpija s’mbrijmë”"],
      ],
      cast: {
        halil: ['road', "answers every one of his sister's questions with a fresh lie"],
        motra: ['road', 'reads the wrong signs in her brother, one after another'],
        zoku: ['road', 'sings the plain truth overhead — the living travels with the dead — and is waved off as fairy chatter'],
      },
    },
    {
      id: 'ruin', title: 'The houses in mourning',
      note: 'Rounding a hill, the sister sees her family\'s houses draped in black and fallen to ruin, the chimneys down — and is told a last lie: nine weddings at once, danced too hard.',
      lines: [
        ['9.1', "As they came round the bend of a hill, she saw her own family's houses — all draped in black, all fallen to ruin.", "Qe po dalin m’ nji lak kodre / Na i ka pa sarajet e veta / Të gjitha zi dhe vrugue."],
        ['9.2', "\"The chimneys have all come down,\" the sister said to her brother.", "“Te fort koniqe kankan rrxue” / Po i thot vllaut o motra e vet."],
        ['9.3', "\"Go on, sister — God forgive you,\" he answered. \"We nine brothers took nine brides, with nine hundred wedding-guests dancing so hard they knocked the chimneys down themselves — and gun-smoke blackened the rest.\"", "“Hec  bre motër zoti t’vraftë! / Prej nand vllazën ne kem kanë / E nandë nuse kemi marrë / Nandqind krushq ne kena pasë / Tan tuj kcye e tuj lodrue / Derë koniqet na i kanë rrxue / E timi i pushkëve na i ka vrugue”."],
      ],
      cast: {
        halil: ['road', 'lies again, blaming the ruin on nine wild weddings at once'],
        motra: ['road', "sees her own family's houses standing in mourning and ruin"],
      },
    },
    {
      id: 'graves', title: 'Nine white graves',
      note: 'She sees nine fresh graves where none stood when she left, and is told a last lie about nine hired builders. A little further on Halil asks her to wait a moment — and slips away, back to his own grave.',
      lines: [
        ['10.1', "They climbed another rise, and there she saw nine white graves — such grief seized her! \"What graves are these, in God's name? I never left these standing here.\"", "Paskan hipur prapë m’nji kodër / Paskan pa nandë vorre t’bardha / Sa trishtim motra ka marrë! / “Po kto vorre zot’ çka janë? / Un’ qetu si paskam lanë”!"],
        ['10.2', "\"Go on, poor sister,\" he told her. \"We nine brothers kept nine master-builders working for us. They have all died, and we buried them.\"", "“Po ti hec mori motër zeza / Pse nand vllazën kemi kanë / Nandë dibranë ne kemi pasë / Të tan kan dekë, ne i kem varrue”."],
        ['10.3', "A little further on, her brother spoke to her: \"Hold the horse a moment, sister — I have a word to say to someone.\"", "Kur kan vojtë pak ma përtej / I vëllaj s’motrës i ka thanë; / “Mbajm’a kalin mori motër / Se po kam nji fjal me ‘i njeri”!"],
      ],
      cast: {
        motra: ['road', 'finds nine white graves where none stood when she left, and is lied to about them too'],
        halil: ['grave', "lies once more, then slips away from his sister and lies back down in his own grave"],
      },
      items: { vorret: ['road', 'nine fresh graves, found in plain sight on the road home'] },
    },
    {
      id: 'threshold', title: 'Nine daughters-in-law',
      note: 'The sister reaches the house alone and finds her mother in mourning. The truth comes out — every brother is dead and buried — and when she names Halil as the one who brought her, her mother refuses to believe a dead man rode with her.',
      lines: [
        ['11.1', "When the girl reached the house alone, she found her mother behind the gate. \"Why are you weeping, mother?\" she said. \"You have nine daughters-in-law now!\"", "Kur ka vojtë vajza ke shpija / Ka gjetë t’amën mbas caranit; / “Çke qi kjan moj nana e eme? / Ti nandë reja i ke marrë”!"],
        ['11.2', "\"Hush, child — God forgive you,\" the mother said. \"Ever since the day you left, my sons have been struck down one after another, and your brothers lie gathered into the earth.\"", "“Shuej bre bi, ty Zoti t’vraftë / Se qysh ditën qi ke shkue ti / Djemt e mi kan vra shojsh’jnë / Vllaznit tue jan mblue me dhe!”"],
        ['11.3', "Then the old woman asked her daughter who had brought her home. \"By my besa,\" she answered, \"I came with Halil.\"", "Po e pvet plaka të bin; / “Me ka erdhe mo’j bi?”-i ka thanë / “Besa erdha me Halilin”"],
        ['11.4', "\"Say no such thing again — God forgive you,\" the mother told her. \"Halil lies dead.\"", "“Mos fol ma, he zoti t’vraftë! / Se Halili gjindet dekun”."],
      ],
      cast: {
        motra: ['home', 'reaches the house alone and finds her mother in mourning'],
        nena: ['home', "reveals that all nine sons are dead and buried, and refuses her daughter's besa"],
      },
    },
    {
      id: 'search', title: 'Down to the grave',
      note: 'Still not believing, the mother wishes only to see Halil with her own eyes. Hand in hand, mother and daughter search the house and find no one — until, at his own grave, he answers their call one last time.',
      lines: [
        ['12.1', "Still the mother pressed her: \"If only I could see Halil with my own eyes, and trade two words with him.\"", "Prapë kuvend nana me t’bin; / “Kesh t’a shof me sy Halilin / E t’i shndroj me ta dy fjalë”"],
        ['12.2', "Hand in hand the two went down to the foot of the stairs — but nowhere could they find the boy.", "Kankan marrun dora doras / E n’fund t’shkallëve kankan ra / Kurkund djalin s’e kan pa."],
        ['12.3', "At last they went to the boy's own grave and called out: \"Halil Garria!\" No further sign of life came from him — only an arm, thrust up out of the earth.", "Paskan vojt tu vorri i djalit / Na i kan thirrë “Halil Garri” / Djali gjall ma nuk u ndie / Veç se krahin jashtë ka shti"],
      ],
      cast: {
        nena: ['grave', 'goes looking for Halil hand in hand with her daughter, and finds only his grave'],
        motra: ['grave', "calls her brother's name at his own graveside"],
        halil: ['grave', 'shows one last sign of life — an arm out of the earth — and then none at all'],
      },
    },
    {
      id: 'end', title: 'Into the same grave',
      note: 'Mother and daughter rise, embrace one last time, and fall dead together into Halil\'s grave — the besa he broke for gold, and the besa he kept from beyond death, both closed here at once.',
      lines: [
        ['12.4', "Mother and daughter rose to their feet, threw their arms around each other in one last embrace, and fell dead together into Halil's grave.", "Nanë e bi janë çue në kambë / Ngryka-ngrykas kankan marrë / N’vorr të Halilit dekun ran."],
      ],
      cast: {
        nena: ['grave', "☠ falls dead into her son's grave, in her daughter's arms"],
        motra: ['grave', '☠ falls dead beside her — the besa kept had cost them everything after all'],
        halil: ['grave', '☠ at rest for good: the besa he broke for gold, and the besa he kept from the grave, both closed together here'],
      },
      exit: ['nena', 'motra', 'halil'],
    },
  ],
}
