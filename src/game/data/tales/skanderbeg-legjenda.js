// ===========================================================================
// TALE: Scanderbeg and Ballaban — see ../tales/_SCHEMA.md for the format
// contract. This file is owned by its tale: agents editing other tales must
// not touch it.
//
// A LEGEND, not a wonder-tale: a chronicle of one battle of the 25-year war,
// told as history-with-a-hero rather than a journey across a fairy-tale map.
// The game already stages a DIFFERENT Skanderbeg legend — the goat-candle
// lifting of the siege of Krujë — as a traveller's tale at udhetaret
// (skender1 → skender2 → skenderFund, raw content.js, untouched here). This
// tale is another episode of the same national war and is compatible with
// it, not a retelling of it — see the cast note on skanderbeg and the
// anchors' conflicts fields below.
// ===========================================================================

export default {
  id: 'skanderbeg-legjenda',
  title: 'Scanderbeg and Ballaban',
  source:
    'Mitrush Kuteli, Tregime të moçme shqiptare (Tirana: Naim Frashëri, 1965; repr. 1987, 1998) · read in R. Elsie\'s translation ("Scanderbeg and Ballaban," Albanian Literature, legends #7); all lines paraphrased',
  origin: {
    region: 'National — the pan-Albanian resistance of the mid-15th century, not a regional Tosk/Gheg tale',
    collector: 'Mitrush Kuteli (Dhimitër Pasko), retelling 20th-century Albanian oral legend',
    published: 'Tirana: Naim Frashëri, 1965 (Tregime të moçme shqiptare); repr. 1987, 1998',
  },
  albanian: {
    title: '«Skënderbeu dhe Ballabani»',
    source:
      'Kuteli, Tregime të moçme shqiptare, as reprinted in the bilingual school edition "Shqip-Gjermanisht - Tregime të moçme shqiptare" (Qendra e Botimeve për Diasporën, Tirana), pp. 114–125 of the archive.org scan',
    local: 'docs/references/kuteli-skenderbeu-ballabani.sq.txt',
  },
  discrepancies: [
    'FOLKLORE-ID / VARIANT NOTE: the FOLKLORE entry "skanderbeg-legjenda" this tale.id retells summarizes a DIFFERENT episode of the Skanderbeg cycle — the goat-candle ruse that lifts the siege of Krujë, and his death at Lezhë followed by the Ottomans digging up his bones as talismans a decade later. That episode is already staged, word for word, as the traveller\'s tale at udhetaret (content.js: skender1 → skender2 → skenderFund, an "end: secret" ending titled "The Goat-Candles of Krujë"). This tale — Kuteli\'s "Skënderbeu dhe Ballabani," read in Elsie\'s translation — covers a separate battle of the same 25-year war: an unnamed river crossing where Ballaban, an Albanian pasha turned Ottoman, wagers his head on capturing Skanderbeg and is beheaded by his own Sultan for failing. The two are compatible, not contradictory: both are undated episodes of Skanderbeg\'s lifelong resistance, share no named place or fixed year, and this tale\'s own places (river/hill/mountains/empire) are all `offstage`, so nothing here overwrites the goat-candle vignette\'s Krujë setting or its account of the death at Lezhë. The folklore.js summary and this tale\'s beats therefore describe two different legends about the same historical man, not two versions of one legend — see also the cast note on `skanderbeg` in ../npcs/tale-skanderbeg-legjenda.js, which names the goat-candle tale explicitly and says the same.',
    'THE FRAME: Elsie prefaces the legend with his own historical note on the real Skanderbeg, ending "Here is a prose rendition of the tale." That preamble is Elsie\'s own scholarly voice, not the folk narrative — the numbered beats below start at the tale\'s actual first sentence ("Albania was faced with...") and never quote the preamble.',
    'BALLABAN\'S PRICE (¶12.6-8): Elsie\'s English slips to "a hundred thousand ducats" at this one spot, though the Albanian here («nëntëqind mijë dukatë») and every other mention (¶9.2, ¶12.15-16) hold steady at NINE hundred thousand. The beats follow the Albanian\'s consistent figure throughout.',
    'THE HERALD\'S ASIDE (¶7.2): the Albanian gives the Sultan a short confirming exchange with the herald — «— Ashtu? — Po, o mbret i madh.» ("Is that so?" "It is, great Sultan.") — before he asks again why death is sweeter than honey; Elsie\'s translation drops the aside. Kept in the beat\'s Albanian third element.',
    'THE WHITE AVALANCHE (¶13.2): the Albanian explains its own simile — «valishte, sepse arbërit ishin veshur tërë me të bardha» ("white, because the Albanians were dressed all in white") — a clause Elsie\'s "snowy avalanche" leaves as a bare image, without the reason. Kept in the Albanian.',
  ],
  // sentence counts of the English translation's 15 paragraphs (the numbered
  // "prose rendition" only — Elsie's historical preamble is excluded, see
  // discrepancies)
  paragraphs: [6, 3, 8, 6, 4, 22, 18, 10, 4, 7, 6, 19, 12, 15, 4],
  cast: [
    { id: 'skanderbeg', name: 'Skënderbeu', note: 'Gjergj Kastrioti — the national hero who held the empire off for a lifetime of war', npc: 'skenderbeu' },
    { id: 'murati', name: 'Sulltan Murati II', note: 'the elder Sultan, broken invasion after invasion, dies unsatisfied', npc: 'sulltanMurati' },
    { id: 'mehmeti', name: 'Sulltan Mehmeti II', note: 'the Conqueror of Constantinople, Murad\'s crueler son', npc: 'sulltanMehmeti' },
    { id: 'ballaban', name: 'Ballaban Badheri', note: 'the Albanian turncoat pasha who wagers his head on Skanderbeg\'s', npc: 'ballabani' },
    { id: 'lajmetari', name: 'lajmëtari', note: 'the Sultan\'s herald, carries the parley out and the report back', npc: 'lajmetariTurk' },
    { id: 'malesoret', name: 'malësorët e Dukagjinit e Livetës', note: 'the two thousand highlanders who break the encirclement at the ford', npc: 'malesoretVeriut' },
    { id: 'ushtriaShqiptare', name: 'ushtria e Skënderbeut', note: 'his small, hopelessly outnumbered band', npc: 'ushtriaSkenderbeut' },
    { id: 'ushtriaOsmane', name: 'ushtria e madhe osmane', note: 'the Sultan\'s vast host — janissaries, Tatar archers, shield-bearers', npc: 'ushtriaOsmane' },
  ],
  // anchor = the game location this tale place inhabits — REUSE over
  // invention, under THE SHARING RULE. This is a NATIONAL chronicle-legend,
  // not a journey across the fairy-tale map: every place below is OFFSTAGE,
  // exactly like three-friends' kingsRealms or gjergj-elez-alia's krahina —
  // a real, described place the tale never stages as an explorable scene.
  places: [
    { id: 'river', emoji: '🏕️', name: 'the river camp', note: 'the unnamed river where Skanderbeg\'s band feasts, holds the ford, and fights the whole battle',
      anchor: { status: 'offstage', mirror: 'one of the countless river-valleys of the quarter-century war — Kuteli\'s telling never names it, keeping the fight timeless rather than pinned to one campaign or one year',
        mold: 'a real, running river that reddens with blood for one day\'s pitched battle — never staged, and never a fixed spot on the map',
        conflicts: 'NOT lumi (the game\'s own river hub) — lumi\'s whole mold turns on being DRY (the Zana, the bolla-serpent, and the old man\'s buried-gold rumour all depend on that dryness); a legend whose river must run and redden with blood cannot share that dry bed without contradicting it outright' } },
    { id: 'hill', emoji: '⛺', name: 'the Sultan\'s hilltop tent', note: 'the rise across the river where Mehmed watches, orders the charge, and later executes Ballaban',
      anchor: { status: 'offstage', mirror: 'the command rise every besieging Ottoman army pitched a silk tent on, overlooking its target — no single hill of this campaign is named',
        mold: 'the foreign throne\'s eye on the field: a tent, a view of the river, a place the player\'s own road never passes',
        conflicts: 'NOT balozLufte/bregu (Gjergj Elez Alia\'s shore war-grounds) — that field belongs to a dawn duel with a sea-champion on the northern coast; an inland river-battle against the Sultan\'s whole army, fought a lifetime earlier in a different war, cannot share that ground' } },
    { id: 'mountains', emoji: '🏔️', name: 'the highlands', note: 'where Dukagjini and Liveta muster the two thousand who break the encirclement',
      anchor: { status: 'offstage', mirror: 'the northern highland clans — Dukagjin among them — who mustered to Skanderbeg\'s banner alongside the later League of Lezhë',
        mold: 'reinforcements come DOWN from here, but the muster itself is never staged, exactly as the golden examples keep a rally\'s point of origin offstage (three-friends\' kingsRealms, gjergj-elez-alia\'s krahina)',
        conflicts: 'NOT mali1/tomor1/tomor2/tomor3/jutbina (Mount Tomorr and Jutbina\'s kreshnik hamlet) — that massif is the SOUTH\'s holy mountain and Mujo\'s frontier world; this legend\'s highlanders are the NORTH\'s Dukagjin clans and must not borrow the south\'s peak' } },
    { id: 'empire', emoji: '👑', name: 'the Sultan\'s empire', note: 'Edirne, Constantinople, and every conquest before the army ever reaches Albania',
      anchor: { status: 'offstage', mirror: 'the Ottoman court and conquests — Edirne where Murad and Mehmed reign, Constantinople taken in 1453 — everything before the army ever crosses into Albania',
        mold: 'the foreign power\'s own house: Bulgaria, Serbia, Greece, the Danube plains, Constantinople all fall to it before it ever reaches this war; never staged, exactly like three-friends\' offstage kingsRealms',
        conflicts: 'none on record — no other tale claims this ground' } },
  ],
  items: [
    { id: 'shpata', emoji: '🗡️', name: 'Skanderbeg\'s sword', note: 'never leaves his hand — measures the river-ford duel and shatters Ballaban\'s own blade' },
    { id: 'flamuriShqiptar', emoji: '🚩', name: 'the Albanian banner', note: 'waved one-handed through the duel, "for the honor of Albania"' },
    { id: 'flamuriTurk', emoji: '🌙', name: 'the crescent flag', note: 'the Ottoman standard, abandoned and left snagged in the thornbushes of the rout' },
  ],
  // PLAY PROJECTION — how the game actually stages a Skanderbeg legend. Bare
  // WITNESS: the player only hears a traveller's song at a shared hub; no
  // embodiment, no mold-lock, no from/ending/scenes. IMPORTANT DIVERGENCE: the
  // game sings the goat-candle lifting of the siege of Krujë (content.js nodes
  // skender1/skender2/skenderFund), a DIFFERENT episode than this file's beats,
  // which chronicle the river battle against the turncoat pasha Ballaban.
  // PLAY PROJECTION — the game now STAGES a Skanderbeg legend as an embodied
  // arc. IMPORTANT DIVERGENCE: it stages the goat-candle lifting of the siege of
  // Krujë (content.js nodes skender1 → skender2 → skenderFund, plus the invented
  // bad ending skenderKeq), a DIFFERENT episode than this file's fifteen beats,
  // which chronicle the river battle against the turncoat pasha Ballaban. Same
  // hero, same lifelong resistance, two separate legends — so the scenes map onto
  // the nearest beats (the few-against-many stand, the night action, the enemy's
  // terrified flight), and the divergences below record the mismatch.
  play: {
    entry: 'campfire',
    stance: 'embodied',
    as: 'skanderbeg',
    role: 'You are Gjergj Kastrioti — Skënderbeu — defending the castle of Krujë. The enemy has laid siege to it and your men are pitifully few, far too few to meet that host in the open. Tie lit candles to the horns of a whole herd of goats and drive them up the ramparts by night, so the besiegers count a thousand watch-fires along the dark walls and break camp before dawn in fear — the clever trick the folk still love best. Or lead your handful out to fight the siege in open battle, and lose the walls.',
    enter: 'the enemy has laid siege to your castle of Krujë and your men are pitifully few — too few by far to meet that host sword-to-sword in the open',
    from: 'skender1',
    ending: 'skenderFund',
    scenes: {
      skender1: 'campfire',
      skender2: 'battleJoins',
      skenderFund: 'sultanFlees',
    },
    divergences: [
      { beat: 'campfire', note: 'The game stages the goat-candles favourite — the night-lifted siege of Krujë (nodes skender1 → skender2 → skenderFund) — while this file records a wholly different episode of the same war: the river battle against the turncoat pasha Ballaban. Same hero, same lifelong resistance, two separate legends. The three staged scenes therefore map onto the NEAREST beats of the Ballaban chronicle (the few-against-many stand at campfire, the night action at battleJoins, the enemy\'s terrified flight at sultanFlees), not onto beats that literally tell the goat trick — the goat-candle episode has no beat of its own here.' },
      { beat: 'sultanFlees', note: 'Where this file gives a full fifteen-beat chronicle — Murad\'s deathbed, Mehmed the Conqueror, the herald\'s parley, the white avalanche, Ballaban beheaded — the game keeps only a short embodied three-scene arc, staging the goat trick and the enemy breaking camp afraid, and nothing of the Ballaban campaign.' },
      { note: 'The BAD ending "Krujë Falls" (skenderKeq) is invented as the un-heroic counterfactual: refuse the ruse, lead too few men out to open battle, and the walls are lost — exactly as argjiro-gjirokastra and legjenda-e-prespes add the road their heroes never take. The arc is co-located at libriDiell under the sharing rule, and the historical caveat (the candle-goats and the helmet are a people\'s love for its hero, not the ledger of history) is honoured in the tale record, not the game.' },
    ],
  },
  beats: [
    {
      id: 'invasions', title: 'A generation of broken invasions',
      note: 'Invasion after invasion breaks against Albania over the years — the little country becomes a graveyard for whole Ottoman armies, held by Skanderbeg\'s proud, unbowed Albanians.',
      lines: [
        ['1.1', 'A massive Turkish onslaught broke against Albania and was thrown back.', "Ra një shkulm i madh turqërie mbi Arbërinë: u thye."],
        ['1.2', 'A second wave came, bigger and stronger than the first — and broke just the same.', "Ra edhe një tjetër, më i madh e më i fortë: prapë u thye."],
        ['1.3', 'A third followed, then a fourth, a fifth — invasion after invasion beaten back, year upon year.', "Edhe i treti, i katërti, i pesti... U thyen shumë shkulme, shumë vjet me radhë."],
        ['1.4', 'It was the proud, never-tamed Albanians who broke every one of them, under their chieftain Gjergj Kastrioti Skanderbeg, for they fought bravely to defend their land, their honor, and their children\'s lives.', "Gjithë këto shkulme i thyen arbërit krenarë e gjithmonë të pashtruar, që kishin kryezot Gjergj Kastriot Skënderbenë. Sepse arbërit luftonin me trimëri, me që mbronin truallin e tyre, nderin e tyre, jetën e fëmijëve të tyre."],
        ['1.5', 'Across many years and many wars, little Albania became one vast graveyard for the Turkish armies.', "Shumë vjet e në shumë luftra Arbëria e vogël u bë varr i madh për turqërinë."],
        ['1.6', 'Armies marched in and never marched back out — the earth itself seemed to swallow them.', "Ushtritë vinin e s'ktheheshin prapë. I përpintedheu."],
      ],
      cast: {
        skanderbeg: ['river', 'breaks invasion after invasion here, year upon year, chieftain of the resistance'],
        murati: ['empire', 'the reigning Sultan, sending army after army into Albania and losing every one'],
        mehmeti: ['empire', 'a prince still, not yet come to the throne (not yet met)'],
        ballaban: ['empire', 'an Albanian already fighting under the Turkish flag in the Sultan\'s wars (not yet named)'],
        lajmetari: ['empire', 'one of the Sultan\'s many messengers, not yet singled out'],
        malesoret: ['mountains', 'the highland clans of Dukagjin and Liveta, not yet called down'],
        ushtriaShqiptare: ['river', 'the small band that renews itself every year to meet the invasions'],
        ushtriaOsmane: ['empire', 'sent against Albania again and again, broken every time'],
      },
      items: { shpata: ['skanderbeg', 'at his side through every one of these years'] },
    },
    {
      id: 'muratsDeath', title: "Murad's bitter deathbed",
      note: 'Old Sultan Murad marches out himself with an army like the sands of the sea, is broken, tries again with the Janissaries at his head, is broken again, and dies lamenting the one land his conquests never took.',
      lines: [
        ['2.1', 'At last old Sultan Murad himself marched out with an army like the sands of the sea — and even he was broken.', "Pastaj u ngrit e ardhi vetë mbreti i madh i turkut, Murati, me një ushtri si rëra e detit. Edhe ky u thye."],
        ['2.2', 'He gathered a second army, larger still, put his Janissaries at its head, and threw it into the war — only to be broken again.', "Shkoi e mblodhi një ushtri të re, më të madhe se sa të parën, vuri në krye jeniçerët dhe u hodh në luftë, po prapë u thye."],
        ['2.3', 'And so the great Sultan Murad died in bitterness, lamenting on his deathbed that he had conquered Bulgaria, Serbia, Greece and the plains beyond the Danube, yet never little Albania — he had held it once in his very hand, piece by piece, only to have Skanderbeg tear it away.', "Dhe mbreti i madh i turkut, Murati, vdiq tërë helm. «Ah! — tha në çastin e sprasmë — sa keq më vjen që më shkoi jeta kot! Shtrova gjithë botën: pushtova Bullgarinë e Sërbinë, zbrita poshtë në Greqi, hodha Tunën e gjërë, shkela tejmatanë fushat e gjëra të Vllahisë e të Maxharisë e s'munda të mposht Arbërinë e vogël... E shtira një herë në dorë, copa-copa, po ma shkuli Skënderbeu...»"],
      ],
      cast: {
        murati: ['empire', "☠ dies lamenting the one conquest that never came"],
      },
      exit: ['murati'],
    },
    {
      id: 'mehmetRises', title: 'The Conqueror turns west',
      note: 'Murad\'s crueler son Mehmed takes Constantinople, crowns himself "the Conqueror," and — as his father begged with his last breath — raises a vast new army to crush Albania. The very earth shakes and the rivers run dry where it marches.',
      lines: [
        ['3.1', "Murad's throne passed to his son, the great Mehmed — a harder, crueler man than his father.", "Këmbën e Muratit e zuri i biri, mbreti i madh Mehmeti, që ishte edhe më i vrazhdë se sa i ati."],
        ['3.2', 'Mehmed threw himself against Constantinople, that mighty city ringed by three walls, and laid siege to it.', "Ky u hodh e pushtoi Kostandinopojën e fortë të rrethuar me tri palë mure e me shumë pirgje të larta."],
        ['3.3', 'Once he had taken that city — the finest and wealthiest place on earth — he moved his golden throne into it and took for himself the title "the Conqueror."', "Si e pushtoi këtë qytet, më të bukurin e më të begatin e botës, Mehmeti ngriti e vuri aty fronin e tij të artë dhe e quajti veten «Ngadhnjimtar»."],
        ['3.4', "That victory left the whole continent shaking, and next he set out to finish what his father's dying breath had demanded of him: bring Albania under his heel.", "Pas kësaj bëme të madhe që tronditi tërë Europën, vendosi të shkelë e të pushtojë Arbërinë, siç e kish porositur i ati në çastin e sprasmë."],
        ['3.5', 'So the great Mehmed raised a vast new army, horse and foot together, drawn from every corner of his lands, put himself at its head, and set out for Albania.', "Pra, mbreti i madh Mehmeti mblodhi një ushtri të re shumë të madhe, dhe kalorëse dhe këmbësore, nga të gjitha skotat, u vu në krye të saj dhe u nis për në Arbëri."],
        ['3.6', 'The very ground shook wherever this iron- and steel-laden host set its feet.', "Tundej dheu ku shkelte kjo ushtri e rëndë e ngarkuar me hekur e çelik."],
        ['3.7-8', 'Behind it the rivers ran dry, drunk to the last drop by its horses and its men, and not a blade of grass grew again where it had trodden.', "Prapa saj shteronin lumenjtë, që i pinin kuajt e njerëzit, në tokë nuk mbinte më bar."],
      ],
      cast: {
        mehmeti: ['empire', 'crowned, then marching on Albania at the head of a vast new army'],
        ushtriaOsmane: ['empire', 'mustered anew, marching west under the Conqueror himself'],
      },
    },
    {
      id: 'ballabanIntro', title: 'The turncoat pasha',
      note: 'Among the Sultan\'s officers rides a man born to Albania: Ballaban Badheri, who gave up his own people for Ottoman rank and riches, scaled Constantinople\'s wall before anyone else, and now holds a pasha\'s title without a shred of pity for anything Albanian. Even with such a mighty force at his back, Mehmed forgets one thing: Albania has Skanderbeg.',
      lines: [
        ['4.1', "Among the Sultan's own retinue rode a man born Albanian: Ballaban Badheri, who had cast off his own people to command Turkish troops.", "Mbreti i madh i turkut kish marrë me vete edhe Ballaban Badherin, atë arbërin atdhemohonjës dhe e kish vënë të printe përpara."],
        ['4.2', 'Ballaban was indeed a formidable fighter, a son of Albania himself, but he had renounced his own blood and people to fight for the Turks in exchange for rank, glory, and riches.', "Ballabani ishte trim, sepse ishte arbër bir arbëri, po e kish mohuar gjakun dhe fisin e vet dhe luftonte për turkun, që të fitonte ofiqe, lavd, pasuri,"],
        ['4.3', "He had seen action in many campaigns, and it was his hand that raised the crescent standard over Constantinople's walls before any other soldier's.", "ai kish bërë shumë luftra, ish ngjitur i pari në muret e larta të Kostandinopojës dhe kish ngulur atje flamurin me gjysmë hënëzë."],
        ['4.4', 'For this, Sultan Mehmed had made him a pasha and showered him with gifts and honors.', "Mbret Mehmeti e kish bërë pasha Ballabanin dhe e mbante në pekule të madhe, nder për nder."],
        ['4.5', 'But honors won from the Turks left a bitter taste for Albanians, since Ballaban felt nothing for what was Albanian — not the ground he trampled, not the homes he burned, not the blood he spilled.', "Po nderi i turqërisë ishte helm për Arbërinë, sepse Ballabanit nuk i dhimbsej asgjë që ish arbërore: as toka që shkelte, as plëngu që digjte, as gjaku që derdhte."],
        ['4.6', 'With so strong an army behind him, Sultan Mehmed was certain he would finally bring Albania to heel — but Albania had Skanderbeg.', "Me këtë ushtri të fortë mbreti i madh Mehmeti e kish mendjen të fjetur: do ta shtronte Arbërinë. Po Arbëria kish Skënderbenë."],
      ],
      cast: {
        ballaban: ['empire', 'named at last: a pasha riding at the Sultan\'s side, marching on his own homeland'],
      },
    },
    {
      id: 'campfire', title: 'Feasting by the river',
      note: 'Word reaches Skanderbeg that the Turks have crossed into Albania again. He marches out with his pitifully few men and camps by a clear river, where they eat, drink, and laugh as though bound for a wedding rather than a battle.',
      lines: [
        ['5.1-2', 'The moment word reached him that the Turks had set foot on Albanian soil again, Skanderbeg mustered his men — so pitifully few beside the Ottoman flood! — and marched out to meet them, pitching his tents in a broad stretch of shade.', "Kur dëgjoi se turku ish hedhur të shkelte përsëri dheun e Arbërit, Skënderbeu kish mbledhur njerëzit e tij — oh, sa të paktë ishin këta njerëz përpara rrëmetit të turqve e të skotave të tjera! — dhe ish nisur që t'i dalë përpara: ai kish ngritur tendat në një hie shumë të madhe."],
        ['5.3-4', 'His Albanians settled along the bank of a clear-running river, eating, drinking, and laughing as if bound for a wedding feast rather than a battle that could cost them their heads.', "Arbërit ishin ulur e rrinin buzë një lumi të kulluar, aty hanin, pinin, qeshnin, sikur nuk shkonin në luftë, ku mund të linin kryet, po në dasmë e ngazëllime."],
      ],
      cast: {
        skanderbeg: ['river', 'camps with his men in the shade by the clear river'],
        ushtriaShqiptare: ['river', 'feasts, drinks, and laughs as if at a wedding'],
        mehmeti: ['hill', 'newly arrived, pitched on the rise across the river'],
        ballaban: ['hill', 'camped with the Sultan, opposite Skanderbeg'],
        ushtriaOsmane: ['hill', 'pitched on the hill overlooking the river'],
      },
    },
    {
      id: 'heraldRides', title: 'A white flag at the river',
      note: 'A Turkish herald rides up under a white flag and is brought before Skanderbeg to ask where he will give battle. Sent back with a curt answer, the herald reports faithfully to Mehmed: a small band, but every man dancing the sword-dance, unafraid, calling a warrior\'s death the sweetest thing there is.',
      lines: [
        ['6.1-2', 'While the Albanians were still at their meal, a lone Turkish rider appeared with a strip of white cloth raised on a pole, and they spurred out at once to block his approach.', "Dhe ja, tek hanin e pinin bashkë buzë lumit të kulluar, panë një turk që vinte kaluar me flamur të bardhë në dorë. Bënë përpara e i prenë udhën."],
        ['6.3-5', '"State your business — who sent you here?" "The great Sultan sent me to seek an audience with your chieftain, Skanderbeg." "Dismount, then, and follow us."', "— Ç'je ti e ç'kërkon këtej? — Jam lajmëtar i mbretit të madh të turkut e dua të flas me kryezotin e Arbërit, Skënderbenë. — Zbriti kalit dhe eja me ne."],
        ['6.6', 'So they brought him before Skanderbeg.', "E muar e ia shpunë Skënderbeut."],
        ['6.7', 'The herald bowed and delivered his message: "Lord of the Albanians, our all-powerful Sultan sends me to ask where you wish to meet him in battle."', "Lajmëtari iu fal e i tha: — O kryezot i Arbërit, mua më dërgon mbreti i madh i turqërisë, që është më i forti në botë, të të pyes: ku do ti të luftosh me mbretin tonë?"],
        ['6.8', 'Skanderbeg\'s reply was blunt: "Tell your Sultan: if he wants me, let him ride out and find me himself."', "Skënderbeu iu përgjigj shkurt: — Ecë i thuaj le të vijë."],
        ['6.9-12', 'When the herald returned, Sultan Mehmed questioned him closely: "Did you see Skanderbeg?" "I saw him, great Sultan." "And did you see his army?" "I saw it."', "Si u kthye lajmëtari, mbreti i madh Mehmeti e pyeti: — Më thuaj, o lajmëtar besnik, a e pe ti Skënderbenë? — E pashë, o mbret i madh. — Po ushtrinë e tij e pe? — E pashë."],
        ['6.13-15', '"Does Skanderbeg have a large army?" "Not a large one — but every man there had eyes like burning coals: they sang, danced the sword-dance, and could hardly wait for the order to charge."', "— Kish shumë ushtri Skënderbeu? — Ushtri s'kish shumë, po të gjithë ata që ishin e kishin synë pishë: këndonin e hidhnin vallen e shpatave, prisnin pa durim të merrnin urdhër që të turreshin në luftë."],
        ['6.16-19', '"What do you mean by this sword-dance, loyal herald?" the Sultan asked. "It is theirs alone, ruler of land and sea. Watching those oak-tall men spin and lunge with bared blades, hammering steel on steel as though truly locked in combat, would set your own skin crawling. They pulled me into their circle and swung their blades across the top of my head — yet not one nicked me."', "— Ç'është kjo valle e shpatave, o lajmëtar besnik? — Një valle arbërore, o mbret i tokës dhe i detit. Të dridhen mishrat kur i sheh ata burra si lisa që hidhen e vijnë rrotull shpatëzveshur, i përpjekin shpatat njëri me tjetrin si në luftë të vërtetë. Më vunë në mes e zunë të hedhin vallen e shpatave, t'i kryqëzonin mbi kryet time, po nuk më prekën fare."],
        ['6.20-22', '"And then?" "Death holds no terror for the Albanians, great Sultan — least of all a death won in battle. They call it the sweetest way there is to die, falling to the sword in war."', "— Pastaj? — Arbërit s'e kanë për gjë vdekjen, o mbret i madh: aq më fort vdekjen në luftë. Thonë se vdekja në luftë, me shpatë, është më e ëmbël se mjalti..."],
      ],
      cast: {
        lajmetari: ['hill', 'having ridden out to Skanderbeg and back with his report'],
        skanderbeg: ['river', 'answers the herald curtly, then returns to his men'],
        mehmeti: ['hill', 'presses the herald for every detail of the Albanian camp'],
      },
    },
    {
      id: 'heraldReports', title: 'Sweeter than honey',
      note: 'The Sultan half-wishes these fearless men were his own, then presses on: they swear by sword, earth, water, stones, bread and salt, and hold honor as paradise, disgrace as hell. Told Skanderbeg showed no fear at all, Mehmed flies into a rage and vows to mow the Albanians down like grass.',
      lines: [
        ['7.1', 'Sultan Mehmed let out a long breath and thought to himself how he wished such fighters served under his own banner instead.', "Mbreti i madh Mehmeti psherëtiu e tha me vete: «Eh, t'i kisha këta njerëz nën urdhërat e mia, që të luftonin për fronin tim»."],
        ['7.2', 'Then he turned back to the herald: "Is that really so?" "It is, great Sultan." "Then why do they claim that dying in battle tastes sweeter than honey?"', "U kthye përsëri lajmëtarit: — Ashtu? — Po, o mbret i madh. — Përse thonë se vdekja në luftë qënka më e ëmbël se mjalti?"],
        ['7.3-4', '"Because, they say, we fight for our own soil, for our freedom." "They swear by the sword too, great Sultan."', "— Sepse, thonë, ne luftojmë për truallin tonë, për lirinë tonë. Ata, o mbret i madh, betohen për shpatën."],
        ['7.5-8', '"Only the sword?" "No — also the ground beneath them, running water, bare stone, and the loaf and salt of a shared meal. For them there is no far-off paradise or hell, only honor and shame: honor lifts a man to heaven, shame drags him down."', "— Vetëm për shpatën? — Jo, edhe për tokën, për ujët, për gurët. Edhe për bukën e krypën. S'dinë parajsë e skëterrë, po vetëm nder e turp. Nderi, thonë, është parajsë: turpi është skëterrë."],
        ['7.9-10', '"And Skanderbeg himself — how did he seem? Was he afraid?"', "— Po Skënderbeu si t'u duk? A ishte i trembur?"],
        ['7.11-14', '"Not in the least, great Sultan. I found him at supper among his men. He stood to greet me, gripping his sword\'s handle with both fists, every bit the war-god come to earth. His only words to me were the same as before: tell your Sultan, if he wants me, let him ride out and find me himself."', "— Jo, o mbreti i madh: nuk ishte i trembur. Kur vajta unë, e gjeta tek hante e pinte me ushtarët e tij. U ngrit e më priti më këmbë, me të dy duart të mbështetura në dorezën e shpatës, si një perëndi lufte. Më tha shkurt: «Ecë e thuaj le të vijë!»"],
        ['7.15-17', 'Furious, Sultan Mehmed cried out: "I will teach these Albanians the true meaning of death! I will turn my whole army loose on them and cut them down like a field of wheat — then let us see if they can still get up and dance with their swords!"', "Mbreti i madh Mehmeti u nxeh e thirri: — Unë do t'iu tregoj arbërve se ç'është vdekja: do të lëshoj ushtrinë time që t'i kositin si bar. Të shohim pastaj në do të jenë të zotë të ngrihen e të hedhin vallen e shpatave."],
        ['7.18', '"As you command, great Sultan," came the answer.', "— Si të urdhërosh, o mbret i madh."],
      ],
      cast: {
        mehmeti: ['hill', 'enraged, orders the attack'],
        lajmetari: ['hill', 'his report given; steps back from the tale'],
      },
    },
    {
      id: 'drumsOfWar', title: 'The drums of war',
      note: 'Mehmed springs up, orders the drums sounded until the mountains shake, and calls his shield-bearers to ask which of them will bring back Skanderbeg dead or alive. Not one answers — all of them tremble at the mere name.',
      lines: [
        ['8.1', 'Sultan Mehmed shot upright and commanded that the war-drums be struck.', "Mbret Mehmeti kërceu më këmbë edhe bëri urdhër t'u bien daulleve."],
        ['8.2-3', 'At once the drums thundered, filling the whole valley and echoing through the mountain passes as if the last day itself had come.', "Ashtu si tha u bë, u ranë daulleve. Bubulloi tërë fusha, gjëmuan grykat sikur të paskej ardhur dita e pastajme."],
        ['8.4', '"Bring me all my shield-bearers!" the Sultan commanded.', "— Të mblidhen këtu gjithë shqytëtarët e mi!"],
        ['8.5-7', 'The Sultan\'s shield-bearers assembled in a heartbeat and answered together as a single voice: "Long may you reign, great Sultan — every one of us stands ready, waiting only for your word!"', "U mblodhën shqytëtarët e mbretit të madh të turkut e i thanë me një zë: — T'u shtofshin vjetët, o mbret i madh! Ditët tona në të tuat! Presim urdhër."],
        ['8.8', 'Sultan Mehmed, son of the great Murad, said to them: "Tell me, my shield-bearers — which of you has the heart to bring me Skanderbeg, alive or dead?"', "— O ju shqytëtarët e mi — u tha mbreti i madh i turqve Mehmeti, i biri i mbretit të madh Muratit — më thoni kujt nga ju i bën zemra të ma sjellë këtu Skënderbenë o të gjallë o të vdekur."],
        ['8.9-10', 'Every one of them heard him, and not one answered — they trembled at the mere name of the Albanian champion.', "Të gjithë e dëgjuan, asnjë s'u përgjigj, sepse u drodhën kur dëgjuan emrin e kryetrimit arbër."],
      ],
      cast: {
        mehmeti: ['hill', 'demands a volunteer to bring back Skanderbeg'],
        ushtriaOsmane: ['hill', 'his shield-bearers, gathered and silenced by fear of the name'],
      },
    },
    {
      id: 'ballabanBargain', title: "The traitor's bargain",
      note: 'Out of that silence steps Ballaban alone. He strikes his price — nine hundred thousand gold ducats and Albania itself as his pashalik, free rein to kill whomever he pleases — and vows to bring Skanderbeg back that very evening, bound or dead.',
      lines: [
        ['9.1', 'Then out of that silence stepped Ballaban Badheri, the very traitor who had turned his back on his own blood to fight under the Turkish flag: "Name my reward, great Sultan, should I deliver Skanderbeg to you."', "Atëhere, në mes të heshtjes, bëri përpara Ballaban Badheri, ai tradhëtari që kish mohuar gjakun e vet dhe luftonte për flamurin e turkut. — Ç'dhuratë do të më falësh ti mua, o mbret i madh, po të ta sjell Skënderbenë të gjallë a të vdekur?"],
        ['9.2-3', '"I will grant you nine hundred thousand gold ducats, and hand over every Albanian land for you to rule as pasha until your dying day — free to kill or spare whoever you like, in whatever number you choose."', "— Do të të fal nëntëqindmijë dukatë të artë dhe do të të blatoj të gjitha vendet e Arbërit, që t'i sundosh nën hien time, si pashallëk, sa të jesh gjallë. Do të kesh dorë të lirë të vrasësh e të presësh kë të duash e sa të duash."],
        ['9.4', '"By tonight you shall have him — bound, or dead," Ballaban vowed.', "— Sonte e ke të lidhur a të vrarë."],
      ],
      cast: {
        ballaban: ['hill', 'strikes his bargain and steps forward alone to hunt his own countryman'],
      },
    },
    {
      id: 'battleJoins', title: 'The charge and the ford',
      note: 'The signal is given: trumpets, drums, and the whole Ottoman host charges under Mehmed\'s eye from his hilltop tent. Tatar arrows black out the sky; the river runs crimson; the Albanians hold the ford while Skanderbeg watches for the mountain men who are strangely slow in coming.',
      lines: [
        ['10.1', 'The great Sultan rejoiced, knowing that only iron breaks iron — only an Albanian could defeat an Albanian.', "Mbreti i madh i turqve u gëzua shumë: ai e dinte se vetëm hekuri mund ta thyejë hekurin, pra vetëm arbëri mund ta thyente arbërin."],
        ['10.2', 'He raised his hand and gave the signal to attack.', "Ngriti dorën e bëri shenjë të fillojë lufta."],
        ['10.3-4', 'The nine great trumpets of the Janissaries sounded, then the ninety-nine trumpets of the rest of the army, and the war-drums of wild-buffalo and wild-ox hide thundered on.', "Ranë të nëntë buritë e ortasë së madhe të jeniçerëve: pastaj ranë të nëntëdhjetë e nëntë buritë e tjera të ushtrisë. Bubulluan daullet prej lëkure bualli të egër e prej lëkure kau të egër."],
        ['10.5', 'Blades bare, the Turks let loose a roar like a storming sea and threw themselves proudly into the fight, with Sultan Mehmed — conqueror of Constantinople — looking on.', "Turqit nxuar shpatat, lëshuan një vikamë të madhe si suvalë deti dhe u hodhën me mburrje të madhe në luftë, nën sytë e mbretit të madh Mehmetit, ngadhmonjësit të Kostandinopojës."],
        ['10.6-7', 'He himself stayed put before his silk tent on the rise above the river, following the fight with his eyes and counting the minutes until Ballaban delivered Skanderbeg to him, bound or dead.', "Ky rrinte përpara tendës së mëndafshtë majë një bregoreje dhe shikonte: shikonte e priste që Ballaban Badheri t'i shpinte Skënderbenë të lidhur a të vrarë."],
        ['11.1', 'The Tatar bowmen strung three arrows to a string apiece and loosed them all together, darkening the very sky.', "Harkëtarët tatarë shkrehën harqet trishigjetëshe që errësuan qiellin."],
        ['11.2', "The Ottoman host looked like a heaving sea about to swallow Skanderbeg's little band whole.", "Ushtria e turqve dukej si një det valë-valë që sulej ta përpinte ushtrinë e vogël të Skënderbeut."],
        ['11.3-4', 'The battle broke out, and the clear river where the Albanians had camped ran red with blood.', "Krisi lufta. Lumi i kulluar tek kishin qëndruar arbërit u skuq me gjak."],
        ['11.5', 'The Turks tried again and again to cross, and could not, for the Albanians held the ford — riders and horses alike went down.', "Turqit bënin ta kalonin e nuk e kalonin dot. Binin kalorësit megjithë kuaj."],
        ['11.6', 'Skanderbeg kept watching for his men from the mountains, who for some reason were slow in coming — and the battle roared on.', "Skënderbeu priste t'i vinin ushtarë të tjerë nga malet, po këta s'di përse, vononin... Lufta gjëmonte."],
      ],
      cast: {
        ushtriaOsmane: ['river', 'charges the ford under the Tatar volleys and cannot cross'],
        skanderbeg: ['river', 'holds the ford, watching for the mountain men'],
        ushtriaShqiptare: ['river', 'holds the crossing; the river itself runs red'],
        mehmeti: ['hill', 'watches from his silk tent, waiting for Ballaban'],
        malesoret: ['mountains', 'delayed — not yet arrived'],
      },
    },
    {
      id: 'ballabanFords', title: "Ballaban's crossing",
      note: 'Ballaban finds his own ford and leads men across. Skanderbeg cuts him off with three scorching taunts; Ballaban hurls his lance first, wounding Skanderbeg\'s arm and horse. Wounded, encircled, Skanderbeg backs against an oak and holds the mob at swordpoint alone.',
      lines: [
        ['12.1', 'Elsewhere on the bank, Ballaban had located a crossing and was bringing his men over the water.', "Ndërkaq Ballabani gjeti një vend dhe e kaloi lumin në krye të ushtarëve të tij."],
        ['12.2-4', 'Skanderbeg spurred straight at him and roared in Albanian: "There you are, Ballaban Badheri! You traded your own blood for one bowl of the Sultan\'s broth — some hero you\'ve made yourself!"', "Atëhere Skënderbeu i preu udhën atij qenit tradhëtar dhe i thirri arbërisht: — Hajde, hajde, o Ballaban Badheri! Për një lugë çorbe turku tradhëtove fisin tënd. Të lumtë, o burrë i dheu!"],
        ['12.5', 'Ballaban went pale and trembled, but did not fall back.', "Ballabani u verdh, u drodh, po nuk u praps."],
        ['12.6-8', 'Skanderbeg shouted across at him again: "So it\'s nine hundred thousand gold ducats and a pashalic over Albania you\'re after? Step closer, and feel my blade instead."', "Atëhere Skënderbeu i thirri së dyti: — Ti dashke nëntëqind mijë dukatë të artë dhe Vendin e Arbërit pashallëk Turqie. Ja tek i ke nën tehun e shpatës sime. Merri!"],
        ['12.9', 'Ballaban froze where he stood.', "Ballabani ngurroi."],
        ['12.10', 'Skanderbeg called a third time: "Attack, you traitor dog — or I attack first!"', "Skënderbeu i thirri së treti: — O qen tradhëtar: ja qëllo, ja të të qëlloj!"],
        ['12.11', 'The traitor dog came on with his men and struck first, hurling his lance.', "Qeni tradhëtar bëri përpara me të tijtë dhe qëlloi i pari: hodhi një heshtë."],
        ['12.12-14', "Skanderbeg moved to answer the throw, but the reins slipped from his hand — Ballaban had wounded his arm and struck his horse too; he went down to his knees, but sprang back onto his feet in an instant.", "Skënderbeu bëri t'ia kthejë, po i ra freri nga dora: Ballabani i kish plagosur krahun edhe kalin. Skënderbeu ra poshtë, më gjunjë, pastaj aty për aty brofi më këmbë."],
        ['12.15-16', 'The Turkish pack howled with delight and pressed in around him, while Ballaban already pictured that fortune in gold within his grasp.', "Qentë turq lëshuan një thirrmë ngazëllimi, u turrën ta qarkojnë. Ballabanit i xixëlluan afër e afër të nëntëqind mijë dukatët e turkut dhe pashallëku i Arbërisë,"],
        ['12.17-19', 'But Skanderbeg set his back against a great oak and began to play his sword: whoever dared come too near fell cut to pieces; the rest drew back for a moment, then charged again with Ballaban at their head.', "po ndërkaq Skënderbeu kish mbështetur shpatullat tek një lis i madh dhe kish nisur të loste shpatën. Ata që guxuan t'i afrohen ranë përdhe kapule. Të tjerët u prapsën një çast, pastaj u turrën përsëri, me Ballabanin në krye."],
      ],
      cast: {
        ballaban: ['river', 'leads the crossing, wounds Skanderbeg, then leads the renewed charge'],
        skanderbeg: ['river', 'wounded, back to an oak, holding off the mob alone'],
      },
      items: { shpata: ['skanderbeg', 'the only thing keeping the ring of Turks at bay'] },
    },
    {
      id: 'dukagjiniAvalanche', title: "Dukagjini's white avalanche",
      note: 'At the worst moment, two thousand highlanders under Dukagjin and Liveta pour down from the mountains, dressed all in white. Skanderbeg rallies with a grin, sets on the enemy like fire through dry reeds, and disarms — rather than kills — Ballaban, marking him with a cut ear.',
      lines: [
        ['13.1', 'But even as Skanderbeg fought on alone, ringed by the enemy, two thousand highlanders came pouring down from the mountains of Albania, led by Dukagjin and Liveta.', "Po ja, ndërsa Skënderbeu po luftonte fill i vetëm në mes të armiqve, zbritën rrëmbyer nga malet e Arbërisë dymijë malësorë që kishin në krye Dukagjinin e Livetën."],
        ['13.2', 'Bare-bladed, the two thousand swept down like a mountain avalanche that carries off everything before it — white, since the Albanians were dressed all in white.', "Të dymijët vinin shpatëzveshur, si valishte mali që përlan çdo gjë që gjen përpara. Valishte, sepse arbërit ishin veshur tërë me të bardha."],
        ['13.3-4', 'When he saw the highlanders coming, Skanderbeg\'s face broke into a grin and he shouted: "Welcome, Dukagjin! Come round and guard my back while I settle this with the traitor dog, so he can watch me swing the sword with one hand and make our flag fly for Albania\'s honor with the other!"', "Kur i pa trimat malësorë, Skënderbeu bëri buzën më gaz e thirri: — Mirsardhe, o Dukagjin! Pa bëj këtej e më ruaj krahët sa të luftoj me këtë qen tradhëtar, të më shohë se si e luaj me njërën dorë shpatën e se si e bëj flamurin të valojë për nderin e Arbërisë."],
        ['13.5', 'So saying, he threw himself on the enemy like fire through dry reeds.', "Tha kështu e u lëshua mbi armikun si ai zjarri flakëmadh që u bie kallamëve të thatë."],
        ['13.6', 'The ditches filled with headless bodies and heads without bodies.', "Hendeqet u mbushën me krerë pa trungje e trungje pa krerë."],
        ['13.7-8', 'All the rest fell back — only one stood his ground to the end: Ballaban Badheri.', "Të gjithë ranë e u prapsën, vetëm njëri qëndroi gjer në fund: Ballaban Badheri."],
        ['13.9', "Now it was Albanian against Albanian, one on one — one fighting for his country's honor, the other for nine hundred thousand gold ducats and a pashalic.", "Tani luftonin një me një, arbër me arbër: njëri për nderin e vendit të tij, tjetri për nëntëqind mijë dukatë të artë e për pashallëkun e Arbërisë."],
        ['13.10', 'Skanderbeg did not mean to kill the traitor — he meant to take him alive.', "Skënderbeu nuk donte ta vriste tradhëtarin, po ta zinte të gjallë."],
        ['13.11', 'And so it happened: the Albanian blade shattered the Turkish one, and Ballaban was left disarmed, his head hanging.', "Përnjëmend shpata arbëre e theu shpatën turke dhe Ballabani mbeti duarvarur, kryeulur."],
        ['13.12', 'Skanderbeg reached out with his sword, nicked his right ear, and said: "Now go back to your master — dog to dog!"', "Skënderbeu zgjati shpatën, i çiku lehtë veshin e djathtë, ia preu e i tha: — Shko tani tek yt zot, si qeni te qeni!"],
      ],
      cast: {
        malesoret: ['river', 'arrived at last, guarding Skanderbeg\'s back'],
        skanderbeg: ['river', 'rallies, breaks the ring, disarms Ballaban rather than kill him'],
        ballaban: ['river', 'disarmed, marked with a cut ear, sent back to his master'],
        ushtriaOsmane: ['river', 'shattered and routed by the highlanders\' charge'],
      },
      items: {
        flamuriShqiptar: ['skanderbeg', 'waved one-handed through the duel, for Albania\'s honor'],
        shpata: ['skanderbeg', 'shatters Ballaban\'s own blade at the last stroke'],
      },
    },
    {
      id: 'traitorBeheaded', title: 'The traitor beheaded',
      note: 'The Ottoman army breaks and flees; the Albanians hunt it through the gullies. Ballaban limps back bloodied to Mehmed\'s tent, confesses that all of Albania — not one man\'s arm — beat him, and is beheaded on the spot for breaking his word.',
      lines: [
        ['14.1-3', 'The Ottoman army broke and ran; the Albanians hunted them down through gullies and streams, grinding them to nothing — drums smashed and sent rolling, crescent banners left snagged in the thornbushes.', "Ndërkaq ushtritë e turkut kishin marrë arratinë. Arbërit ua prisnin udhën valtheve e përrenjve, i grinin. Daullet ishin shqyer e rrukullisur tejetutje, flamurët me gjysmëhënë kishin mbetur drizave."],
        ['14.4', "Ballaban, bloodied and head bowed, made his way back to his master's tent.", "Ballabani u kthye i gjakosur e kryevarur te tenda e të zot, mbretit të madh të turkut."],
        ['14.5-7', 'The Sultan asked him: "So, Ballaban — a wound clean through your skull! Where has all your boasting gone? Weren\'t you the one who swore you\'d bring me Skanderbeg\'s head by nightfall?"', "Ky e pyeti: — Ballaban kryeplagosur, ç'u bë lëvdata jote? A nuk më the ti se do të ma sillje sot Skënderbenë ja të vrarë, ja të lidhur?"],
        ['14.8-9', 'Ballaban dropped to his knees and begged the great Sultan\'s pardon: "Sultan of Sultans, who rules every land and every sea! Hear me out —"', "Ballabani ra mbë gjunjë, iu fal mbretit të madh dhe pastaj iu përgjigj: — O mbret i mbretërve, që sundon mbi gjithë dherat e mbi gjithë deten! Dëgjo pak, mos dëgjo shumë."],
        ['14.10-11', '"— I could not bring you Skanderbeg, alive or dead, because it was never his arm alone that helped him, but the whole country behind him: the oak he leaned on, the rock, the ridge, the mountain, all of Albania. I have fought in many wars under your banner and beaten many a man, but a man like Skanderbeg I have never met."', "Skënderbenë nuk e solla dot as të lidhur, as të vrarë, sepse atij nuk i ndihmon vetëm krahu, po i ndihmon gjithë vendi, lisi ku mbështeti krahët, shkëmbi, rrahu, mali, gjithë Arbëria. Unë kam luftuar shumë luftra nën hien tate, kam ndeshur e mundur shumë burra, po burrë të këtillë, si Skënderbenë, s'kam parë kurrë."],
        ['14.12-13', 'The Sultan turned on him in a rage: "Ballaban — lower that treacherous head of yours, for I intend to strike it off and settle the score for every soldier this Albanian war has cost me. You swore to me this campaign would end with the Albanians crushed underfoot, and instead you have failed me."', "Mbreti i madh i turkut ia ktheu ashpër: — Ballaban, qasmë kryet e tu që fsheh brenda pabesinë tënde, se dua ta pres, që të shuaj zjarrin e zemrës për tërë këtë ushtri që m'u vra në Arbëri. Ti më pate dhënë fjalën se kësaj here do t'i shtroje arbërit e tu nën këmbët e mia, dhe e shkele këtë fjalë."],
        ['14.14-15', 'He signaled to his Janissaries, and they seized the turncoat, laid him across a log, and struck off his head.', "Atëhere u bëri shenjë jeniçerëve të tij, dhe ata e rrëmbyen qenin atdhemohonjës, Ballaban Badherin, e shtrinë në një trung e i prenë kryet."],
      ],
      cast: {
        ushtriaOsmane: ['river', '☠ broken and hunted down through the gullies'],
        ballaban: ['hill', '☠ confesses the truth, is beheaded by his own Sultan'],
        mehmeti: ['hill', 'takes his failed pasha\'s head himself'],
      },
      items: { flamuriTurk: ['river', 'the crescent banners, abandoned and caught in the thornbushes'] },
      exit: ['ballaban'],
    },
    {
      id: 'sultanFlees', title: 'The Sultan flees',
      note: 'The white avalanche of Albanians closes in on the hilltop itself. Mehmed leaps onto his horse and flees at a gallop, abandoning his silk tent and the flower of his slain army — Skanderbeg and his men have broken the great Ottoman tide once again.',
      lines: [
        ['15.1', 'Still the white avalanche of bare-bladed Albanians was closing in.', "Ndërkaq po afrohej valishta e bardhë e arbërve shpatë-zveshur."],
        ['15.2', "When Sultan Mehmed saw it coming, he leapt onto his horse and fled at a gallop, leaving his silk tent atop the hill and, scattered across the battlefield, the flower of his slain army behind him.", "Mbreti i madh Mehmeti e pa këtë valishte, i hypi kalit e iku vrap, duke lënë majë kodrës shatoren e tij të mëndafshtë dhe, rreth e rrotull, në fushën e luftës, lulen e ushtrisë së tij të vrarë."],
        ['15.3', "The Albanians chased him far, but he ran on in pure terror while the horns rang out to proclaim Skanderbeg's victory.", "Arbërit e ndoqën gjer tej, po mbreti ikte me vrapin e frikës, ndërsa kumbonin brirët që lajmëronin fitoren e Skënderbeut."],
        ['15.4', "Once more Skanderbeg and his men had broken the great Ottoman tide that had poured into Albania.", "Skënderbeu me shokë kish thyer edhe një herë valomën e madhe të turqërisë, që ish derdhur në Arbëri."],
      ],
      cast: {
        mehmeti: ['empire', 'flees the field in terror, back to his own house'],
        ushtriaOsmane: ['empire', 'what remains of it, scattered and beaten'],
        skanderbeg: ['river', 'victorious once again, the tide broken'],
        ushtriaShqiptare: ['river', 'holds the field, the horns proclaiming the win'],
        malesoret: ['river', 'stands with Skanderbeg at the battle\'s end'],
      },
    },
  ],
}
