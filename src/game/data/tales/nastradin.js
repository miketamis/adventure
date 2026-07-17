// ===========================================================================
// TALE: Nastradin Hoxha — the trickster sage (the Albanian Nasreddin) — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
// ===========================================================================

export default {
  id: 'nastradin',
  title: 'Nastradin Hoxha — the Mule with a Foal, the Three Figs, and the Doomsday Cow',
  source:
    'Pralla popullore shqiptare, Instituti i Shkencave, Tiranë 1954 — the book\'s three Nastradin anecdotes (pp. 188–190, 194–196) · read in the Albanian original directly (no English translation exists); all lines paraphrased from the Albanian',
  // where the cycle comes from — anchors prefer this region's mirrors: the
  // texts are GHEG (northern), a vezir-and-kala world; the Vezir's fortress
  // mirrors Rozafa under the Bushati vezirs, the pasture is the hodja's own
  // village (his yard is already staged in the game at nastradin1)
  origin: {
    region: 'North Albania (Gheg) — the pan-Balkan Nasreddin cycle on Albanian soil; the 1954 corpus prints all three anecdotes in Gheg',
    collector: 'Komisjoni i folklorit, Instituti i Shkencave (red. Zihni Sako)',
    published: 'Pralla popullore shqiptare, Tiranë 1954, pp. 188–190 & 194–196',
  },
  // the ALBANIAN ORIGINAL — here the Albanian IS the numbered original: the
  // beats paraphrase it sentence by sentence (¶1–5 the mule, ¶6 the figs,
  // ¶7–12 the cow; the ¶ splits are documented in the local reference file)
  albanian: {
    title: '«Mushka me zog» · «Tre fiq në qerre» · «Lopa e Nastradinit e marrimi i botës»',
    source:
      'Pralla popullore shqiptare, Instituti i Shkencave, Tiranë 1954, pp. 188–190 & 194–196 (Gheg text; quoted lightly OCR-cleaned, raw scan text in the local file)',
    local: 'docs/references/pralla-1954-nastradini.sq.txt',
  },
  // no translation to disagree with — these record where the LORE CARD, the
  // game's staged scenes and the 1954 Albanian text diverge, and which
  // reading the beats follow
  discrepancies: [
    'THE CARD\'S TWO CLASSICS ARE NOT THESE ANECDOTES: the lore card cites the borrowed cauldron ("it gave birth" / "the cauldron died") and the smell-of-soup-paid-with-the-sound-of-a-coin judgment — the two pan-Balkan classics the game already stages at the hodja\'s yard (nastradin1→nastradinUrte/nastradinFund and nastradinGjyq1→nastradinGjyqFund). No provenanced ALBANIAN text of either exists to build beats on: the 1954 corpus\'s only Nastradin texts are these three; Lambertz (Albanische Märchen 1922) translates into German the 12 anecdotes Hil Mosi ("Sakoli") printed in Kalendari i shoqnisë «Dija» 1908 pp. 61–64 — neither classic among them; Dozon, Hahn, Jarník and Meyer print no Nastradin; archive.org and Google Books full-text turn up only unprovenanced modern web tellings (searched 2026-07-14). The canonical public-domain English of the cauldron classic is G. Borrow, The Turkish Jester (1884). The beats follow the corpus cycle — same figure, same blade of logic: the Vezir\'s mule that "must come back with a foal" is the cauldron-logic held up to power (there a pot may bear and die because greed pocketed the "child"; here a mule must foal because a Vezir said so), and the staged yard-scenes keep telling the card\'s two classics.',
    'THE VEZIR\'S WELCOME (¶2.3): the scan reads «Veziri e pret me nji kalë turecka» — "kalë" (horse) makes no sense as a welcome; the likeliest reading is «kafé turecka», a Turkish coffee, the proper reception. The beat line quotes the printed text; the paraphrase reads it as the coffee-welcome.',
    'THE VEZIR\'S SELF-INDICTMENT (¶3.3): the scan strands fragments of this sentence on broken lines («pa farë», «rrugë të», «madhe?»); the beat line quotes it reassembled in reading order: «Për mue qi burgosi këdo pa farë dhimbje, që vras e pres, grebis gjanë e tjervet e i qes në rrugë të madhe?».',
    'THE THIRD TITLE (¶7 head): the tale-head misprints «marlmi botës»; the book\'s own table of contents reads «Lopa e Nastradinit e marrimi i botës» — "Nastradin\'s cow and the fooling of the world". The beats follow the table of contents.',
    'THE ERA JUMP (¶7.1): between the Vezir anecdotes and the cow anecdote Nastradin has grown old («Plakë e mbetë Nastradini») — the cycle spans years, and the mule\'s twelvemonth wager is never resolved on the page: «deri atëherë o des un, o cof mushka e na merr të keqen ase han dreqi Vezirin» is the tale\'s own last word on it. The beats keep the gap and leave the wager unresolved.',
  ],
  // sentence counts of the cycle's 12 paragraphs (the 1954 Albanian text;
  // ¶ boundaries documented in the local reference file)
  paragraphs: [10, 11, 8, 6, 13, 10, 7, 16, 6, 5, 7, 6],
  cast: [
    { id: 'nastradini', name: 'Nastradin Hoxha', note: 'the wise-fool hodja — poor, quick, and never once out-tricked', npc: 'nastradini' },
    { id: 'veziri', name: 'the Vezir', note: 'power in the fortress; his friendship is a gift with a tail', npc: 'veziriKalase' },
    { id: 'gjindja', name: 'the bazaar crowd', note: 'the town under the fortress — they see everything and ask the right question', npc: 'gjindjaPazarit' },
    { id: 'treZotnit', name: 'the three grand townsmen', note: 'gold-stiff gentlemen who set out to cheat the uncheatable', npc: 'treZotnit' },
  ],
  // anchor = the game location this tale place inhabits (see _SCHEMA.md).
  // The game ALREADY stages the hodja: his yard is nastradin1 ("oborri i
  // hoxhës"), where the lore card's two classics play — so the cycle's home
  // anchors there, and the Vezir world anchors north (Gheg, like the text).
  places: [
    { id: 'oborri', emoji: '🏡', name: 'oborri i hoxhës — Nastradin\'s yard', note: 'the hodja\'s home at the village edge',
      anchor: { status: 'existing', node: 'nastradin1', mirror: 'a poor hodja\'s yard in old Tirana\'s mëhalla (Gheg central Albania — the village of the game)',
        mold: 'the hodja\'s yard: one poor, famous trickster at home in it — the game already stages his two pan-Balkan classics here (the borrowed cauldron, the smell of the food), and every Nastradin anecdote may come home to this yard without clashing: one figure, one repertoire',
        sharedWith: ['the staged nastradin scenes (ENDING_LORE nastradinFund/nastradinUrte/nastradinGjyqFund → nastradin)'] } },
    { id: 'kalaja', emoji: '🏰', name: 'kalaja e Vezirit — the Vezir\'s fortress', note: 'the kala the summons comes from',
      anchor: { status: 'existing', node: 'kalaMur', mirror: 'Rozafa castle at Shkodra — the seat of the Bushati vezirs in the late Ottoman age',
        mold: 'one fortress, many ages: the walling legend owns its FOUNDING (the three builder-brothers, Rozafa walled in), and centuries later a Vezir garrisons the finished castle — the anecdotes\' Vezir is a late occupant of the walls the legend paid for, never their builder',
        conflicts: 'the Vezir must NOT be conflated with the walling-time king staged at kala2 (different era, different figure) nor with the marble king (a southern garden-palace king, wrong region and wrong story); rejected inventing a separate Gheg fortress — the map has one northern kala and Rozafa really was the vezirate\'s seat',
        sharedWith: ['rozafa (the walling legend staging at kala1/kalaRozafa)'] } },
    { id: 'pazari', emoji: '🧺', name: 'pazari nën kala — the bazaar under the fortress', note: 'the town lane where the mule is paraded',
      anchor: { status: 'proposed', node: 'kalaMur', mirror: 'Shkodra\'s old bazaar between Rozafa and the Buna',
        mold: 'the market lane below the fortress gate: the town the Vezir rules and the crowd whose gossip carries his name further than his edicts — bazaars accumulate traders, marvels and stories without clashing',
        proposal: 'draw a bazaar lane at the fortress\'s foot (stalls, the crowd, the road up to the gate) — nearest existing spot today is kala1 itself' } },
    { id: 'udha', emoji: '🛤️', name: 'the road north', note: 'the road of the fearful walk to the summons',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of old Tirana at the tanners\' bridge',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash; here it carries a poor man talking himself in and out of his fear',
        sharedWith: ['three-friends road', 'the whole travel spine'] } },
    { id: 'fusha', emoji: '🌾', name: 'fusha e lame — the threshing-field pasture', note: 'where old Nastradin grazes his one cow, and the doomsday feast burns',
      anchor: { status: 'existing', node: 'bariu', mirror: 'the village grazing ground outside old Tirana\'s mëhalla',
        mold: 'the open pasture where the village grazes its beasts: the shepherd\'s goats by working day — and, in the anecdote\'s era, old Nastradin\'s one wretched cow; open grazing ground is shared by every herder without clash, and the threshing-floor at its middle can host a fire',
        sharedWith: ['the shepherd\'s pasture vignette (bariu/punaBariu)'] } },
    { id: 'katundi', emoji: '🏘️', name: 'katundi — the village quarter', note: 'the households the feast\'s cauldron is borrowed from',
      anchor: { status: 'existing', node: 'fshatiJeta', mirror: 'old Tirana\'s living quarter — the mëhalla of many households',
        mold: 'a quarter of many hearths that lend and borrow between them — the doomsday feast\'s cauldron is hunted up off a neighbour\'s hearth, the same lending web the hodja\'s staged cauldron-comedy plays on; a quarter holds many homes, so the widow\'s bare cottage (three-friends) and the lending hearths coexist',
        sharedWith: ['three-friends home (the proposed widow\'s cottage)'] } },
    { id: 'kodrinat', emoji: '🌄', name: 'the knolls', note: 'the brushy rises the townsmen scatter over for firewood',
      anchor: { status: 'offstage', mirror: 'the low hills around any threshing-floor',
        mold: 'never staged — they exist only as the direction the three gents scatter to gather wood while their clothes burn; if ever drawn, they are the pasture\'s brushy rim' } },
  ],
  items: [
    { id: 'mushka', emoji: '🐴', name: 'the Vezir\'s mule', note: 'a splendid mule, given "with a tail": due back in a year — with a foal' },
    { id: 'qerrjaFiq', emoji: '🐂', name: 'the ox-cart with three figs', note: 'a huge basket, a yoke of oxen, and exactly three figs — for show' },
    { id: 'lopa', emoji: '🐄', name: 'the one cow', note: 'old Nastradin\'s "qyqe lope" — a drop of broth so the bread isn\'t dry' },
    { id: 'kazani', emoji: '🍲', name: 'the borrowed cauldron', note: 'a neighbour hearth\'s great kazan — the village lends and borrows it' },
    { id: 'teshat', emoji: '🧥', name: 'the townsmen\'s finery', note: 'gold-stiff coats, silvered belt-arms, watches and chains' },
    { id: 'paret', emoji: '🪙', name: 'the pocket money', note: 'what the finery\'s pockets held — the price of a slaughtered cow' },
  ],
  // how the game stages this tale — the WITNESS/judgment projection (see _SCHEMA.md).
  // An ANTHOLOGY of the wise-fool's paradoxes, not one arc: you witness the renowned
  // hoxha and your choice resolves each puzzle the clever way (his) or the foolish
  // one — the borrowed cauldron that "gave birth" and then "died" (so its owner
  // cannot object), and the man made to pay for the SMELL of food with the SOUND of
  // his coins. No embodiment/become — a run of witnessed vignettes at the Vezir's
  // castle (reuses kalaMur, where the finished Rozafa walls are now garrisoned).
  play: {
    entry: 'mushka',
    stance: 'witness',
    role:
      'You come upon Nastradin Hoxha, the wise fool of a thousand tales, matched against the Vezir and his court. A cauldron he borrowed has "given birth" to a little pot — and later "died"; a cook demands gold from a poor man who only smelled his food. Weigh each paradox as the hoxha would, and no one cheats Nastradin; weigh it as a fool would, and the joke is on you.',
    from: 'nastradin1',
    ending: 'nastradinGjyqFund',
    scenes: {
      nastradin1: 'mushka',
      nastradin2: 'pazari',
      nastradinGjyq1: 'gjyqi',
      nastradinGjyqFund: 'fundi',
    },
    divergences: [
      { note: 'The game\'s WITNESS stance on an ANTHOLOGY of Nastradin\'s wit rather than one plot: two of the classic paradoxes are staged as puzzles you resolve — the borrowed cauldron that gives birth to a small pot (so you keep it) and later "dies" (so its owner cannot demand it back), and the smell-of-food trial. There is no single hero-arc to embody; you sit where the hoxha sits and judge.' },
      { beat: 'gjyqi', note: 'The signature ruling — a man is dragged before the judge for eating the SMELL of a cook\'s food, and Nastradin has him pay with the SOUND of his coins ("you ate the smell, you hear the gold") — is the good/clever ending "The Sound of the Coin"; hand the cook real gold instead and the fool\'s ending "Paid for the Smell" follows.' },
      { note: 'The wider anthology — the mule due back "with a foal", the ox-cart bearing exactly three figs, old Nastradin\'s one doomsday cow, the townsmen\'s pocketed finery — is kept in the tale record; the Vezir\'s castle reuses kalaMur, the finished Rozafa walls a garrison holds centuries after the walling.' },
    ],
  },
  beats: [
    {
      id: 'thirrja', title: 'The summons',
      note: 'The Vezir sends for Nastradin. The whole road there he argues with himself — flight would convict him, the claws are the claws — and goes in the end because a man only dies once.',
      lines: [
        ['1.1', 'One day the Vezir sends word: Nastradin is summoned to the fortress.', "Çon Veziri nji herë e thrret Nastradinin në kala."],
        ['1.2', 'Knotted up with fear, he sets out, talking to himself the whole road.', "Nastradini, ba grusht prej frike, niset me shkue e rrugës thotë vetmeveti:"],
        ['1.3', 'Why would he have called me, Lord — what can he want with me?', "«Pse do të më ket thirrë, he Zot?! Shka do të ket aj me mue?"],
        ['1.4', 'Has someone denounced me?', "Mos më ka paditë kush?"],
        ['1.5', 'What if he means to shorten me by a head? God forbid!', "Uh! shka asht aj oco! Po me ba me më shkurtue kryet?! Prite Zot!"],
        ['1.6', 'Blacker still: must I walk on my own feet into that beast\'s claws?', "Shka asht edhe ma zi, po më duhet me shkue me kambë te mija me ra ndër thoj t'asajë bishë?"],
        ['1.7', 'I am caught alive and cornered!', "Kam ra gjallë e ngusht!"],
        ['1.8', 'And if I simply don\'t go? Go where — which way would I run?', "Po mos me shkue aspak? Po mirë po, kahë t'ia mbajë!"],
        ['1.9', 'Or maybe he means no harm at all — and by running I\'d make myself guilty for nothing.', "Mandej ndoshta s'ka të keq me mue, e me ba me ikë, po baj fajtuer vedin pa kenë!"],
        ['1.10', 'With God\'s luck I\'ll go then, come what may — a man only dies once!', "Në baft të Zotit po shkoj, e të dalë ku të dalë... nji herë vaç kam me dekë!»"],
      ],
      cast: {
        nastradini: ['udha', 'walks to the summons, talking himself in and out of his fear'],
        veziri: ['kalaja', 'waits in the fortress, curious about the famous trickster'],
        gjindja: ['pazari', 'trade and gossip in the lane under the fortress'],
        treZotnit: ['pazari', 'parade their gold-stiff clothes about the bazaar (not yet met)'],
      },
      items: {
        mushka: ['kalaja', 'the Vezir\'s own splendid mule, stabled'],
        kazani: ['katundi', 'a neighbour hearth\'s great cauldron, lent and borrowed as the village needs'],
        teshat: ['treZotnit', 'worn — gold-stiff coats, silvered belt-arms, watches on chains'],
        paret: ['treZotnit', 'riding in the finery\'s pockets'],
      },
    },
    {
      id: 'dera', title: 'Who are you?',
      note: 'Legs shaking, he is let in. Asked his NAME he plays the harmless poor man so long — nobody\'s enemy, yes is yes and no is no — that the Vezir is worn to a thread before he finally gets "Nastradini".',
      lines: [
        ['2.1', 'Legs trembling, he reaches the fortress door and asks to be let in to the Vezir.', "Tuj iu dridhë kambët mërrini tu dera e kalas e lypë me e shti mbrendë tu Veziri."],
        ['2.2', 'They lead him through.', "I prijnë e e shtinë."],
        ['2.3', 'The Vezir receives him — a Turkish coffee (so the likeliest reading; the scan prints «kalë») — and asks: who are you?', "Veziri e pret me nji kalë turecka e i thotë: «Kush je ti?»"],
        ['2.4', 'Lord, a poor man, he answers — no one under God, nothing to his soul, alive by his nails, his arms\' toil and the sweat of his brow.', "— Zoto, un jam njeri i vorfën, pa kurrkend nen Zotin, pa gja mbas shpirti, qi rrnoj gjallë me thoj të durvet, me mundë të krahvet e me djersë të ballit."],
        ['2.5', 'A quiet man who minds his work, makes trouble for nobody, muddies nobody\'s water.', "Jam njeri i qetë, rri në punë teme, kuj sherr s'i baj, as nuk turbulloj ujë me kambë!"],
        ['2.6', 'Enough, enough — tell me your name!', "— Mjeft, mjeft, po më kallxo si të thonë emni?"],
        ['2.7', 'My name? Of course, of course — only know first that I never harmed a soul, everyone knows my meekness, not to praise myself, ask whoever you like, wherever you like…', "— Mue a? Po të kallxoj, posi, posi... por t'a dish se kuj gja nuk i kam ba... nuk jam i zoti për të keqa të kuj... gjith kush e njef urtin tem... s'po tham me levdue veten... por mundesh me pvetë ku të duesh e ke të duesh... Mos kjoftë si po tham, short qafën..."],
        ['2.8', '…and I have never in my life said one thing for another: raised from a boy on yes is yes and no is no!', "Deri më sot s'e kam thanë kur nji send për'ni tjetër. Unë jam mësue qysh i vogël: pohin po, e johin jo! E s'lot ndryshej!"],
        ['2.9', 'THE NAME, man, the name! Drop the antics and say what they call you.', "— Emnin more, emnin! Leni ojnat e më kallxo si të thonë."],
        ['2.10', 'Me? At once, at once — what an honour, to see the Vezir with my own eyes, to converse mouth to mouth, to tell him my name… They call me, Lord, Nastradini…', "— Mue a? Po njitash, njitash... Për mue a nderë e madhe me ia pa sytë Vezirit, me kuvendë gojagojas me ty, me të kallxue si më thonë... Mue Zoto më thonë Nastradini..."],
        ['2.11', 'Truly, truly, groans the Vezir — you have worn my soul to pieces already. Anyway…', "— Vërtevert, vërtevert... më ke mërzitë shpirtin tash i copë! Nejse..."],
      ],
      cast: {
        nastradini: ['kalaja', 'let in trembling; plays the harmless poor man to exhaustion'],
        veziri: ['kalaja', 'worn to a thread before he even gets the name'],
      },
    },
    {
      id: 'nami', title: 'What do folk say of me?',
      note: 'Pressed for the truth about his own name in the town, the Vezir indicts himself — I jail, kill, plunder — and Nastradin flatters and flatters until the barb lands: you are good for us because we have become fit for you.',
      lines: [
        ['3.1', 'Now tell me without tricks, says the Vezir: what do people say about me?', "— Po më difto pa zhigla: shka flasin gjindja për mue?"],
        ['3.2', 'About you? Nothing but the best.', "— Për ty a? Ma mirë s'ka."],
        ['3.3', 'Well of ME — who left nothing undone? who jails whom he pleases without a pang, kills and cuts, rakes in other men\'s goods and throws them on the highway? They CANNOT speak well of me…', "— Mirë për mue, qi nuk la gja pa ba? Për mue qi burgosi këdo pa farë dhimbje, që vras e pres, grebis gjanë e tjervet e i qes në rrugë të madhe? S'kan si me folë mirë për mue..."],
        ['3.4', 'Oh yes — all of them, great and small, men and women, old and young: your fame is everywhere, they swear by your head…', "— Po, po, të gjithë flasin mirë për ty... i madh e i vogël... trim e grue... plak e i ri... lanë nam për ty... bajnë be në krye tand..."],
        ['3.5', 'Never mind them — you, Nastro: what do YOU say of me?', "— Nejse, nejse... Po ti, Nastro, shka thue për mue?"],
        ['3.6', 'I? I say you have no equal on the face of the earth, and happy our hearts that we live under your shadow…', "— Un? Un tham se nuk e ke kund shoqin mbi fytyrë të tokës, e lumë zemra e jonë qi jem nën hije tande..."],
        ['3.7', 'Nastro, Nastro — you are not telling me the truth. Speak without fear, speak your heart: how can I be GOOD?', "— Nastro, Nastro, nuk je kahë më kuvendë të vërtetën... Fol pa drojë, fol shka ke në zemër... Si mund të jem i mirë unë?"],
        ['3.8', 'Do you know why you are good for us? Because we have become fit for you!', "— A e din pse je i mirë për ne? Pse jena ba ilaik për ty!"],
      ],
      cast: {
        nastradini: ['kalaja', 'flatters and flatters, then lands the barb: we have earned you'],
        veziri: ['kalaja', 'hears his own crimes from his own mouth — and the answer that fits them'],
      },
    },
    {
      id: 'mushka', title: 'A gift with a tail',
      note: 'The Vezir relishes the answer, names Nastradin among his few friends and, "in sign of love", lends him his mule to ride the lands — due back at the year\'s end WITH A FOAL. Nastradin swears he\'ll return her exactly so.',
      lines: [
        ['4.1', 'The apt reply delights the Vezir, and he turns to him again:', "Vezirit ia pat anda ketë gjegje me vend e siellet e i thotë prep:"],
        ['4.2', 'Know, Nastro, that I keep few friends — but among those few you shall now be one.', "— Nastro, do ta dijsh se un kam miq pak; por nder ata pak miq do të jesh edhe ti."],
        ['4.3', 'I, the Vezir\'s friend? I am far too small, Lord — even in a dream the honour would be too great…', "— Un miku i Vezirit? Jam teper i vogël, Zoto! Un m'e pa anderr kishte me kenë nderë tepër e madhe, josema..."],
        ['4.4', 'From today you are my dear friend — and in sign of my love, take my mule: ride her through the lands and enjoy yourself…', "— Po, ti ke me kenë sot e mbrapa miku i im i dashtun... e në shej dashtnije po t'ap mushkën teme me shetitë nëpër dhena e me ba qef me te..."],
        ['4.5', '…and at the year\'s end you will return her to me WITH A FOAL. Understood?', "Në krye të vjetës ke me m'a kthye mushkën me zog. A more vesh?"],
        ['4.6', 'Long life and honour to you, a white face upon you — why, of course I\'ll return the mule with a foal at the twelvemonth\'s end!', "— T'u rritët jeta e ndera e paç faqen e bardhë, se mushkën posi s'po t'a kthej me zog në krye të motmotit?"],
      ],
      cast: {
        nastradini: ['kalaja', 'named the Vezir\'s friend; takes the mule — and the impossible condition'],
        veziri: ['kalaja', 'grants the mule, due back in a year with a foal'],
      },
      items: { mushka: ['nastradini', 'led away by the hand — a gift with a tail'] },
    },
    {
      id: 'pazari', title: 'Either I die, or the mule, or the Vezir',
      note: 'Down in the bazaar he charges through town astride the mule while the crowd pries. He knows perfectly well mules don\'t foal — but a year is 365 days: by then I die, or the mule croaks, or the devil eats the Vezir. Meanwhile: free riding.',
      lines: [
        ['5.1', 'Nastradin takes the mule and comes down from the fortress leading her by the hand.', "Merr Nastradini mushkën, ulet prej kalaje me të për dore."],
        ['5.2', 'Reaching the bazaar he leaps astride and goes smoke-and-fog through the length of the town.', "Të ramen në pazar, këcen maje sojë e tym e miegull për te gjatë të qytetit."],
        ['5.3', 'People see him and marvel.', "E shofin gjindja e habiten."],
        ['5.4', 'Someone asks: Nastro — where did YOU get a mule like that?', "Dikush e pëvetë: — Po ti, Nastro, ku e more këtë farë mushke?"],
        ['5.5', 'Why, the Vezir gave her to me — as a friend!', "— Madje mue ma ka dhanë Veziri për mik!"],
        ['5.6', 'The Vezir, a friend? Since when are you and the Vezir friends?', "— Veziri për mik? Po kur u bane mik me Vezirin?"],
        ['5.7', 'Friends, friends… when luck comes it opens the door… true, he gave her with a tail on it… but… never mind…', "— Për mik, për mik... Kur vjen nafaka çil derën... Njimend ka dhanë me i bisht... por... nejse..."],
        ['5.8', 'What tail?', "— Po çfarë bishti?"],
        ['5.9', 'The dear old Vezir told me to bring her back at the year\'s end with a foal.', "— Vezir loci më ka thanë me ia kthye në krye të motmotit me zog."],
        ['5.10', 'Return a MULE with a foal?! Have you ever heard of a mule foaling?!', "— Me i kthye mushkën me zog?! Po a ke ndi kurr se pjell mushka?!"],
        ['5.11', 'True enough, friend — I too know a mule doesn\'t foal. But a year from today is three hundred and sixty-five days…', "— Fjala e jote asht, lumë shoq; edhe unë e di se mushka nuk pjell, por deri sot një vjet janë treqind e gjashtëdhjetë e pesë dit..."],
        ['5.12', '…and by then either I die, or the mule croaks and takes the ill-luck with her, or the devil eats the Vezir…', "Piii, deri atëherë o des un, o cof mushka e na merr të keqen ase han dreqi Vezirin..."],
        ['5.13', 'For now I ride about and enjoy myself royally — and then God will set it right.', "Per tash njiherë po shëtis e po baj kokrrën e qejfit me mushkë; mandej e ban Zoti mirë."],
      ],
      cast: {
        nastradini: ['pazari', 'rides the mule through town, doing the arithmetic of a year out loud'],
        gjindja: ['pazari', 'marvel and pry: since when is HE the Vezir\'s friend?'],
      },
      items: { mushka: ['nastradini', 'ridden smoke-and-fog through the town — a year of free enjoyment begun'] },
    },
    {
      id: 'fiq', title: 'Three figs by ox-cart',
      note: 'Another day he yokes his oxen, loads a huge basket holding exactly three figs, and delivers them to the Vezir as a poor man\'s gift. Asked, in jest, how such figs are eaten, he demonstrates: krrup, krrup, krrup — all three, himself.',
      lines: [
        ['6.1', 'One day Nastradin takes three figs, sets them in a huge basket for show, yokes the oxen to the cart, the basket aboard, and straight to the Vezir.', "Nastradini një ditë merr tre fiq, i shtjen në një kosh të madh për bind, mërthen qetë në qerre, koshin me ta e fill e tu Veziri."],
        ['6.2', 'The Vezir is told Nastradin has come with cart and oxen and wants a word.', "I lajmojnë Vezirit se ka ardhë Nastradini me qerre e me qe e don me folë."],
        ['6.3', 'Reckoning he has come about something, the Vezir hurries out.', "Vezirit ia pret mendja se për dishka ka ardhë e del me të shpejtë."],
        ['6.4', 'The moment Nastradin sees him, he salutes and speaks up quickly:', "Sa e sheh Nastradini Vezirin, falet me te e i thotë me të shpejtë:"],
        ['6.5', 'Blessed lord — being poor, I have never yet brought you anything.', "— Lumë zotnija, kahë jam i vorfën, s'të kam prue gja kur."],
        ['6.6', 'Today God granted me these three figs, and I have brought them to you as a gift.', "Sot më ka ba zoti nafakë njekëta tre fiq e t'i kam pru dhanti."],
        ['6.7', 'Seeing three figs delivered by ox-cart, the Vezir asks, as a joke: Nastro — and how are these three figs eaten?', "Veziri, kahë sheh se ka prue tre fiq me qerre, sjellet e i thotë si në lojë: — Nastro, po këta tre fiq si hahen?"],
        ['6.8', 'These? Easy work, my lord — watch, I\'ll teach you.', "— Këta a? A punë e kollajtë, lum zotnija, po të msoj unë, shih."],
        ['6.9', 'And he seizes the figs one after another and pops them into his own mouth: krrup, krrup, krrup.', "Nastradini kapë tre fiqt njanin mbas tjetri, i shtjen në gojë: krrup, krrup, krrup."],
        ['6.10', 'The Vezir is left open-mouthed at the unexpected play.', "Veziri mbet me gojë hapë prej këso loje së papritme."],
      ],
      cast: {
        nastradini: ['kalaja', 'delivers three figs by ox-cart — and eats all three before the Vezir'],
        veziri: ['kalaja', 'left open-mouthed at the lesson'],
      },
      items: { qerrjaFiq: ['kalaja', 'the huge basket empty — the three figs went krrup, krrup, krrup'] },
    },
    {
      id: 'lopa', title: 'The old man and the cow',
      note: 'Years on, Nastradin is old, fit for no other work, herding one wretched cow on the pasture. Three grand townsmen pass, know him for the trickster no one ever cheated — a living fox — and plot the doomsday trick to make him slaughter her.',
      lines: [
        ['7.1', 'Grown old and fit for no other work, Nastradin goes out day after day to the field to watch one wretched cow.', "Plakë e mbetë Nastradini, kahë s'a i zoti me ba punë tjetër, del ditë për ditë në fushë me ruejtë nji qyqe lope."],
        ['7.2', 'One day three townsmen pass that way — great gentlemen, dressed as grandly as no one else.', "Kur qe po kalojnë atypari tre qytetas, zotni të mdhaj, veshë mathë si ata e kurrkush."],
        ['7.3', 'Seeing Nastro, they say to one another:', "Kur shofin Nastron, i thonë shoqishojt:"],
        ['7.4', 'There\'s that swindler who lets no one pass uncheated! Shall WE cheat HIM for once?', "— Qe aj batakçija që s'len pa rrejtë! A e rrejmë edhe na nji herë?"],
        ['7.5', 'Faith, Nastro is hard to cheat — no one has managed it to this day; he is a living fox, he\'d sell and buy the three of us a hundred times over.', "— Besa besës, asht zor m'e rrejtë Nastron; deri më sot s'ka dalë kush m'e rrejtë. Asht dhelpen e gjallë. Aj na shet e na blen nji qind herë."],
        ['7.6', 'Let\'s talk him into slaughtering the cow today — by telling him tomorrow is the end of the world and the day of judgment.', "— Po i mbushim menden me pre sot lopën, tuj i thanë se neser a mbarimi i botës e dita e gjygjit."],
        ['7.7', 'Let\'s try it then, come what may — though I fear he\'ll spring the trap on us, as he has sprung it on so many.', "— Po ia nisim nji herë e të dalë ku të dalë; por drue se po na qet në kurthë, sikur ka qitë shumkend deri tash."],
      ],
      cast: {
        nastradini: ['fusha', 'grown old; herds his one wretched cow on the pasture'],
        treZotnit: ['fusha', 'pass by, recognize the unfoolable trickster, and plot the doomsday trick'],
      },
      items: {
        lopa: ['fusha', 'his one poor cow — a drop of broth so the bread isn\'t dry'],
        mushka: ['kalaja', 'long gone back or gone under — the twelvemonth wager lost to the years (the tale never says)'],
      },
    },
    {
      id: 'gjyqi', title: 'Tomorrow the world ends',
      note: 'Grim-faced, they sell him the lie. He mourns nothing — his meadow is eaten, death is a lid of gold — pities THEM in their flower of youth, and agrees to everything: since no one needs anything tomorrow, slaughter the cow and feast today.',
      lines: [
        ['8.1', 'They approach him bitter and grim-faced: well met, Nastro!', "I aviten Nastradinit idhshem e zymtë në ftyrë e i thonë: — Mirë se të gjejmë, Nastro!"],
        ['8.2', 'Welcome, welcome, sirs!', "— Mirë se vini, mirë se vini, zotni!"],
        ['8.3', 'What are you doing out here on this field?', "— Shka je kahë ban këtu në kët fushë?"],
        ['8.4', 'Why — being fit for no other work, I pass my time watching this sorry cow.', "— Paj, kah s'jam i zoti për tjetër punë, po kaloj mot tuj ruejtë njiketë lopë të keqe."],
        ['8.5', 'And what do you need the cow for, poor wretch?', "— Po lopa shka të duhet, more i shkretë?"],
        ['8.6', 'For a drop of broth — to wet my crust and not eat the bread dry.', "— Për nji pikë lëng, sa me njye kashatën e mos me hangër bukën thatë."],
        ['8.7', 'Fair enough. But — have you not HEARD?', "— S'ka ma mirë. Po ti a nuk ke ndi gja a?"],
        ['8.8', 'No, indeed, not I. God turn it to good! Has something bad happened?', "— Jo, madje, un jo. Po, hejr e baftë zoti! A ka ba gja e keqe?"],
        ['8.9', 'The blackest of the black — for us, for you, for everyone: TOMORROW the world ends and the day of judgment comes! Woe, we are lost!', "— Si a zi e ma zi për ne, për ty e për gjithkendin! Nesër soset bota e bahet dita e gjyqit! Mo', zo', ma keq për ne, se kena sharrue!"],
        ['8.10', 'Men, what are you saying! Then I pity YOU far more, in the flower of your youth — for myself, truly, I have no great grief: I have already eaten my meadow.', "— Mo', bre burra, shka jeni kah thoni! Ma fort po më dhimbeni ju, qi kenkeni në lule të djelmënis, se për veti, mana, s'po kam gjithaq dert: un tashma e kam hangër livadhin tem."],
        ['8.11', 'I, my good sirs, have not seen a good day since I fell to this earth — death to me is a lid of gold.', "Un, lum zotnit e mi, s'kam pa ditë të mirë kurr se kam le e ra në tokë, prande deka për mue asht kapak florini."],
        ['8.12', 'Nor does anything of mine weep after me.', "Gja mbrapa edhe nuk më kjan."],
        ['8.13', 'Well then — since tomorrow we all end, you won\'t be needing the cow any more either.', "— Pra mbasi neser po mbarojmë, as lopa nuk ka me t'u dashtë ma gja."],
        ['8.14', 'No, no — that much is clear: no cow for me, and for you no goods and no riches.', "— Jo, jo, asht e dijtun: as mue lopa as ju gjaja e malli qi keni."],
        ['8.15', 'Know what we\'ll do today? We take and slaughter your cow — you\'ll need her no more, here or after — we skin her ourselves, make meat of her, and eat and drink and make merry today, the last day, and tomorrow we die and end on a full stomach!', "— A di shka po bajmë sot? Po marrim e presim lopën tande, qi nuk të duhet gja ma këtu e mbrapa; po e rjepim na vetë, po e bajmë mish; po ham e po pijmë e po bajmë qejf sot, qi asht e mbramja ditë, e neser po desim e po mbarojmë ngishem fare!"],
        ['8.16', 'Nothing could be better than what you\'ve thought of, says Nastradin.', "— S'ka ma mirë se keni mendue."],
      ],
      cast: {
        nastradini: ['fusha', 'hears the world ends tomorrow; mourns nothing and agrees to everything'],
        treZotnit: ['fusha', 'sell the doomsday lie and sentence the cow to the feast'],
      },
    },
    {
      id: 'akshiu', title: 'The renowned cook',
      note: 'The cow is slaughtered and quartered, a cauldron hunted up in the village, a fire lit on the threshing-floor. Nastradin claims the cooking — no feast was ever boiled without him — and sends them for plenty of wood: an old cow boils long. Overjoyed, they strip off their gold-stiff finery and scatter over the knolls.',
      lines: [
        ['9.1', 'They slaughter the cow and quarter her; they hunt up a cauldron in the village, light a fire in the middle of the threshing-field and set the meat to boil.', "Marrin e presin lopën, e bajnë kortarë kortarë; kerkojnë e gjejnë nji kazan në katund, ndezin zjermin mjedis fushës së lame e nisin m'e zi."],
        ['9.2', 'Nastradin turns to them: my good sirs — a shame to boast — but I have always been a renowned cook.', "Nastradini siellet e u thotë: — Lum zotnit e mi, marre me thanë, un kam kenë gjithëherë akshi i permendun."],
        ['9.3', 'No wedding was ever held, no feast celebrated, without me called in to boil the meats.', "S'a ba kund darsëm, as s'u lutë kund festë pa më thirrë mue me zi haenat."],
        ['9.4', 'Will you let me, today, boil the meat of my own cow?', "A po m'a leni mue sot t'a zij mishin e lopës seme?"],
        ['9.5', 'All you need do is bring me wood enough till it boils soft — the cow was getting on in years, and she\'ll take a good long boiling.', "Ju s'keni tjetër, veçse me më prue dru mjeft, derisa të zihet e të shkrihet, pse lopa ka qenë pak e shtyeme në mot e ka me ngjatë bukur fort m'u zi."],
        ['9.6', 'The three gents — overjoyed at having (they think) finally cheated Nastro, never dreaming what awaits them — strip off their gold-stiff garments, take off the belt-arms dressed in gold and silver, the watches and the chains, leave it all in a heap, and scatter over the knolls to gather wood for the boiling.', "Tre zotnit, shend e verë pse ia kishin dalë m'e rrejtë Nastron, pa mendue aspak se shka po i gjen, zdeshin petkat e ngrime n'ar, hjekin armët e brezit veshë n'ar e argjand, sahatet e qostekët e i lanë grumbull, mandej shpërndahen nëpër do kodrina me mbledhë dru për me zi lopën."],
      ],
      cast: {
        nastradini: ['fusha', 'appointed cook over his own cow; sends the gents for firewood'],
        treZotnit: ['kodrinat', 'stripped to their shirts, scattered over the knolls gathering wood'],
      },
      items: {
        lopa: ['fusha', '☠ slaughtered and quartered — boiling in the borrowed cauldron'],
        kazani: ['fusha', 'hunted up in the village; over the fire on the threshing-floor'],
        teshat: ['fusha', 'left in a heap by the fire — gold-stiff coats, arms, watches and chains'],
        paret: ['fusha', 'still in the pockets of the heap'],
      },
    },
    {
      id: 'zjermi', title: 'Wood enough',
      note: 'The fire well caught, he goes through the pockets — the money is the price of his slaughtered cow — and feeds the clothes to the flames one by one. He calls the gents in from the wood-gathering; they rest by the fire smirking at their triumph, until a light wind cuts them and there is nothing to put on.',
      lines: [
        ['10.1', 'When he sees the fire has caught well, Nastradin looks through the clothes\' pockets: the money he finds he takes as the due price of the slaughtered cow — and the clothes he feeds into the fire one by one, and burns them all.', "Nastradini, kur shef se a ndezë zjermi mirë, merr e kqyrë nëpër xhepa të teshavet; paret që gjet i merr për hak të lopës së therme, e teshat i shtje në zjerm ka nja ka nja e i djeg krejt."],
        ['10.2', 'A while later he calls to the gents: bless your arms — you have carried wood enough, no more is needed.', "Njatje vonë u thotë zotnivet: — U lumshin krahët, se keni bartë dru mjeft e s'a nevoja ma."],
        ['10.3', 'The gents sit and rest around the fire, eyeing the meat-cauldron, winking at one another and smirking — thinking they have at last out-cheated the man whom, to that day, no one had ever cheated.', "Zotnit ulen e pushojnë rreth zjermi, kqyrin kazanin e mishit, i losin synin shoqishojt e bajnë buzën në gaz, kahë kujtojnë se i kan dalë me rrejtë tekembramja nji nieri qi deri atë ditë s'ia kishte dalë kush m'e rrejtë kurr."],
        ['10.4', 'A light wind begins to cut them, and they go looking for their clothes to put on.', "Një erë e lehtë nis me i pre, e kërkojnë teshat me i veshë."],
        ['10.5', 'Search here, search there — nothing!', "Lyp këndej, s'ka!"],
      ],
      cast: {
        nastradini: ['fusha', 'pockets emptied, clothes burned; tends the cauldron with a straight face'],
        treZotnit: ['fusha', 'back from the knolls; rest, smirk — then shiver: the clothes are gone'],
      },
      items: {
        paret: ['nastradini', 'taken as the due price of the slaughtered cow'],
        teshat: ['fusha', '☠ burned one by one to keep the fire alive'],
      },
    },
    {
      id: 'mbrojtja', title: 'The cook\'s defense',
      note: 'Asked where the clothes went, he remembers slowly: the wood ran short, so he fed them to the fire — after all, tomorrow the world ends, and for that same business his poor cow died too. Do men act like fickle women? Hold out one day; today we make merry — a man only dies once.',
      lines: [
        ['11.1', 'Vexed, they turn on Nastro: who has taken our clothes, that we cannot find them — have you covered them up somewhere?', "Mërzitshëm sjellen e pëvesin Nastron: — Nastro, po teshat ç'na i ka marrë, si s'po mund t'i gjejmë? A mos i ke mlue ti kund njeti?"],
        ['11.2', 'The clothes?… Which clothes?… Ah yes, now it comes back to me: before you returned, the wood began to run short — and so as not to let the fire die, I took them and fed them in.', "— Teshat?... Po cilat tesha?... Po, po, tash po më bjen në mend... Sa ishi ju pa ardhë, filluen me më mungue drutë, e per mos m'e lanë zjermin m'u fikë, mora e i shtina në zjerm."],
        ['11.3', 'What have you DONE, man? Burned clothes so costly? Have your eyes burst and your head\'s wits fled, to commit a madness without an equal anywhere?', "— Shka ke ba, more? Na ke djegë teshat aq të kushtueshme? Po ty a të kan plasë sytë e ballit e luajtë mentë e kresë, qi e ke ba këtë marri të pakurrkund-shoqe?"],
        ['11.4', 'My wits have not budged, by my besa — I only reckoned you would need the clothes no more, since tomorrow the world ends and the day of judgment comes.', "— Un luejtë menç aspak, besa; por mendova se teshat nuk u duhen ma gja, mbasi nesër maron bota e bahet dita e gjygjit."],
        ['11.5', 'For that same business we killed my poor cow — and I could hardly spare the wretch.', "Per kte punë mbytmë edhe lopën e shkretë, pse un rand e tepër s'e kam pasë të ngratën."],
        ['11.6', 'Are men to act like fickle women?! Hold out one day more — I am staying without my cow, who kept my household, surely you can last without clothes till tomorrow.', "Burrat a bajnë si gra të këqija?! Qindroni nji ditë ma... Un po rri pa lopë, qi më ka tha konakun, josema jo pa tesha deri nesër."],
        ['11.7', 'Today we eat and drink and make right merry — and tomorrow let come what comes: a man only dies once.', "Sot po ham e po pijmë e po bajmë kokrrën e qefit, e mandej nesër të bahet shka të bahet — nji herë kemi për të dekë."],
      ],
      cast: {
        nastradini: ['fusha', 'explains with perfect doomsday logic; invites them to the feast'],
        treZotnit: ['fusha', 'half-naked and aghast, listening to their own lie recited back'],
      },
    },
    {
      id: 'fundi', title: 'No one cheats Nastradin',
      note: 'One of them, bitter as poison, blurts the truth: there is no judgment day — we only meant to cheat you. Nastradin has his last word — so the world was to end for my cow but not for your clothes? — and the gents slink off while he buys three new cows with their money.',
      lines: [
        ['12.1', 'One of them, galled and bitter as a drop of poison, can hold back no longer and cuts Nastradin short:', "Njani nder ta, pezmatue e ba si pika e helmit, s'mund të pritet ma e sjellet e ia pret Nastradinit:"],
        ['12.2', 'What ill luck was ours today, to run into YOU — of whom no one ever saw the good, only ever the mischief! What judgment day tomorrow?! We only meant to play with you and cheat you, you luckless wretch!', "— Po çë rrezik patëm na sot me u ndeshë në ty, qi nuk t'a ka pa kush hejrin kurr, por gjithmonë sherrin? Po ç'ditë gjygji nesër?! Po na kena dashtë me luejtë me ty e me të rrejtë, more i panafakë!"],
        ['12.3', 'Well now! So you had reckoned the world ends tomorrow for me and for my cow — but not for your clothes.', "— Hajde! Paski pasë kujtue se nesër maron bota për mue e për lopën teme, e jo per tesha të tueja."],
        ['12.4', 'Know this, men: no one has ever cheated Nastradin to this day, and no one will till he goes to rot in his grave.', "Ia dijni, burra, se Nastradinin s'e ka rrejtë kush kurr deri sot, as nuk ka m'e rrejtë deri të shkojë m'u kalbë në vorr."],
        ['12.5', 'A good road to you — you have come off very well.', "Udha e mbarë u kjoftë, se jeni da teper mirë."],
        ['12.6', 'The gents set off with their heads at their feet — and Nastradin bought three more cows with their money.', "Zotnit u nisne me krye nder kambë, e Nastradini bleu tri lopë të tjera me pare të tyne."],
      ],
      cast: {
        nastradini: ['fusha', 'last word said; the feast is his, and three new cows besides'],
        treZotnit: ['fusha', 'confess the trick and slink off half-naked, heads at their feet'],
      },
      items: { paret: ['nastradini', 'spent: three new cows graze where one was slaughtered'] },
    },
  ],
}
