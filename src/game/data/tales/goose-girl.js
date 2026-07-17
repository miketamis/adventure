// ===========================================================================
// TALE: The Goose-Girl and the Marble King — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it. This is the SECOND movement of Dozon's tale IX (= Elsie
// tale 22); the first movement is the separate maiden-promised-sun tale.
// ===========================================================================

export default {
  id: 'goose-girl',
    title: 'The Goose-Girl and the Marble King',
    source:
      'Auguste Dozon, Manuel de la langue chkipe ou albanaise (Paris 1879), chrestomathie tale IX «La fille promise au soleil», SECOND movement, repr. Folklor shqiptar 1 (1963) · read in R. Elsie\'s translation (tale 22, ¶8-12, renumbered here ¶1-5 — the first movement is the maiden-promised-sun tale); all lines paraphrased',
    // where the tale comes from — anchors should prefer this region's mirrors
    origin: { region: 'South Albania (Tosk)', collector: 'Auguste Dozon, French consul at Janina', published: 'Paris, 1879' },
    // the ALBANIAN ORIGINAL: every beat line's third element is the verbatim
    // Albanian for that ¶.sentence, transliterated from Dozon's French-based
    // transcription to modern orthography (raw text in `local`).
    albanian: {
      title: '«Mbreti i mermertë» (editorial — Dozon prints both movements as one untitled tale under the French «La fille promise au soleil»; this half is named from its own words, ¶2.2 «një mbret që ish bërë si mermer»)',
      source:
        'Dozon 1879, chrestomathie pp. 40-41 (the second movement of tale IX) — his French-based transcription transliterated here to modern orthography (œ→ë, ou→u, û/lone u→y, y→j, ç→sh, tç→ç, ky→q, gy→gj, lh→ll, rh→rr, ly→l, ts→c, ndz→nx, digy-→dëgj-); dialect kept as printed (to të = do të, çupa, ahere, baçë, kshu, ish, neri = njeri, nerëz, parathire = window, fjejtur, hysmeqarka = maidservant, kalive = hut, talas = a run-up, gjau = ngjau, fletsh/vësh/zgjonsh/ruanj, e zona = e zonja); obvious OCR garbles fixed (mâ\'Jhœs→mëhallës per Dozon\'s French «les filles du quartier», rûri→hyri, douk→duke, se paré/se të…→sa, flyorifi→florinj, e nuira→e mora, viute→vinte, voiiri→vuri, kalhlve→kalive, ndcéntour→ndenjtur, pouçfm→pushim, nœmœrônte→numëronte); one word is NOT Albanian and is disclosed rather than transliterated: the parenthetical at the very end, «(ou : e bœri tsingra mingra)», uses Dozon\'s own French "ou" ("or") to bracket an alternate phrase he also heard — rendered here as Albanian «(ose: e bëri cingra mingra)» so the whole line reads in one language; the bracketed alternate itself (cingra mingra, "smithereens") is his transcription, kept verbatim',
      local: 'docs/references/dozon-mbreti-mermerte.sq.txt',
    },
    // where Elsie's translation and Dozon's Albanian disagree — the beats
    // decide per case which reading our world tells
    discrepancies: [
      'TWO WEEKS, NOT THREE (¶2.4): the Albanian counts «të tri netet edhe të tri ditat edhe DY javë» — the seller passes with a week of vigil still to run, which is why a watcher is bought at all (her instruction is likewise «mos të fletsh dy a tri dit», days, not Elsie\'s nights). Elsie prints "three days, three nights and three weeks passed", contradicting his own ¶4.2 where the king wakes only "when three weeks were up". The beats follow the Albanian: the servant is bought FOR the last week.',
      'A SHOVELFUL, NOT A HANDFUL (¶3.4): Albanian «nxori një lopatë me florinj» — she pays a lopatë, a shovel-load of gold; Elsie renders it "a handful of gold coins". The beats keep the shovel (where a locked garden keeps its gold, neither text says).',
      'WHO BUILDS THE HUT (¶4.10): Albanian «mbreti e vuri edhe i bëri një kalive për të ndenjtur» — the KING sets her to the geese and has the hut made for her; Elsie has her build it herself. The beats follow the Albanian.',
      'PAGES, NOT A BOOK (¶2.2-3): the Albanian girl reads the scroll itself («edhe këjo e këndon») and then keeps awake over written pages («merrte kartëra edhe këndonte»); Elsie gives her "a book" (as does the built kopshtMermer2 scene, libri). The beats say pages.',
      'THE MEASURED PIECE (¶4.11, ¶5.1-2): three touches Elsie smooths away — she counts her woes one by one («numëronte një nga një hallëtë e saj»), the king hears the weeping two or three times before he comes («si dëgjoi dy tri herë»), and the execution is measured, not counted: «e bëri copëra, m\'e madhja copë ish kaqë» — the biggest piece was THIS big (Dozon\'s own variant: «e bëri cingra mingra», smithereens) — against Elsie\'s "a thousand pieces". The beats follow the Albanian.',
      'THE SPLIT: Dozon\'s tale IX runs both movements as one text and Elsie translates them as one tale 22. This file covers ONLY the second movement (Elsie\'s ¶8-12 = ¶1-5 here); the rescue arc before it is the maiden-promised-sun tale. The raw extract in `local` keeps the whole text with the split point marked.',
    ],
    // sentence counts of the second movement's 5 paragraphs (Elsie's translation)
    paragraphs: [7, 4, 9, 11, 2],
    cast: [
      { id: 'maiden', name: 'the maiden', note: 'the queen\'s daughter, home from the Sun\'s house — and shut in again within days', npc: 'vajzaDiellit' },
      { id: 'queen', name: 'the queen', note: 'the black paint barely off her walls when grief finds her a second time', npc: 'mbretereshaZeze' },
      { id: 'girls', name: 'the girls of the quarter', note: 'çupat e mëhallës — they borrow her, lose her, and carry the news home', npc: 'cupatMehalles' },
      { id: 'marbleKing', name: 'the marble king', note: 'stone mid-court, a scroll open in his hand; wakes owing his life', npc: 'mbretiMermer' },
      { id: 'marbleFolk', name: 'the marble court', note: 'people and beasts frozen around their king', npc: 'njerezitMermerte' },
      { id: 'seller', name: 'the servant-seller', note: 'a peddler of maidservants; his price is whatever you care to give', npc: 'shitesiHysmeqarkave' },
      { id: 'servant', name: 'the hysmeqarka', note: 'bought for the last watch; steals clothes, place and king', npc: 'hysmeqarka' },
    ],
    // anchor = the game location this tale place inhabits, under THE SHARING
    // RULE (see _SCHEMA.md). This movement is BUILT as the Sun quest's Act II —
    // every staged place has its node off the palace lane. The tale is SOUTHERN
    // (Dozon, Janina Tosk) and names no city: the game's village stands in.
    places: [
      { id: 'blackPalace', emoji: '🏰', name: 'the queen\'s palace', note: 'the mother\'s house — black-era just ended, grief about to return',
        anchor: { status: 'existing', node: 'pallatiZi', mirror: 'a pasha\'s konak in the game\'s village — Dozon\'s Tosk telling names no city, so old Tirana\'s quarter stands in for the royal town',
          mold: 'the grieving queen\'s palace: its bolted-black era ended at the returned daughter\'s voice, and this tale opens in the days right after — same queen, same daughter, the door open at last, and the same walls hear her weep anew when the garden shuts the girl in',
          sharedWith: ['maiden-promised-sun (the same palace, days earlier — its mold\'s one-opening door belongs to the black era this tale follows)'] } },
      { id: 'lane', emoji: '🛤️', name: 'the palace lane', note: 'the quarter\'s lane between palace and garden; the peddler\'s road too',
        anchor: { status: 'existing', node: 'fshatiLanes', mirror: 'the back lanes of the village mëhalla — the maiden\'s old school lane, now her playmates\' lane',
          mold: 'the lanes host every daily errand of the quarter — girls at play here-and-there, a peddler crying wares under a garden wall: lane traffic accumulates, nothing clashes',
          sharedWith: ['maiden-promised-sun (the school lane)', 'the village\'s whole daily life'] } },
      { id: 'gardenGate', emoji: '🚪', name: 'the garden door', note: 'the great door that opens for one girl only — and only once',
        anchor: { status: 'existing', node: 'kopshtMermer1', mirror: 'the built Act II gate off the palace lane — the game already stages the girls at play and the door that will not open',
          mold: 'a locked garden door off the palace lane: it opens for the chosen girl alone and shuts on her heels; everyone else shoves for nothing' } },
      { id: 'marbleGarden', emoji: '🗿', name: 'the marble garden', note: 'the frozen court: marble folk, marble beasts, the king and his scroll',
        anchor: { status: 'existing', node: 'kopshtMermer2', mirror: 'the built Act II interior — the game\'s marble people, marble king and vigil scroll',
          mold: 'a garden of the almost-living: a whole court struck to marble around a king whose open scroll names the one price of waking — three days, three nights, three weeks of vigil',
          sharedWith: ['half-rooster REJECTED it for its cabbage-hunt (its own conflicts note) — the garden belongs to this tale\'s stone court and justice'] } },
      { id: 'gooseHut', emoji: '🪿', name: 'the goose-run and hut', note: 'the kalive the king had built; where the geese and the truth are kept',
        anchor: { status: 'existing', node: 'patatGruaja', mirror: 'the built goose-tending scene of Act II (the hut, the geese, the listening stone)',
          mold: 'the goose-yard at the edge of the waked king\'s court: a hut small enough for one girl and her counted sorrows, near enough the court for a king to overhear' } },
      { id: 'peddlerRoads', emoji: '🧳', name: 'the peddler\'s roads', note: 'wherever maidservants are bought and sold — offstage',
        anchor: { status: 'offstage', mirror: 'the trading roads beyond the village',
          mold: 'never staged — the seller exists only below the garden window; his roads, his train and his other wares stay out of every telling' } },
    ],
    items: [
      { id: 'scroll', emoji: '📜', name: 'the king\'s scroll (karta)', note: 'open in his marble hand: the vigil\'s terms, and the sleeper\'s one proof' },
      { id: 'gold', emoji: '🪙', name: 'the shovelful of gold', note: 'the servant\'s price — where a locked garden keeps its gold, the tale does not say' },
      { id: 'rope', emoji: '🪢', name: 'the rope (tërkuza)', note: 'lowered from the window — the only thing ever to cross the wall both ways' },
      { id: 'clothes', emoji: '👗', name: 'the maiden\'s clothes (robat)', note: 'a queen\'s daughter\'s dress; whoever wears it is believed' },
    ],
    // how the game stages this tale — the embodied projection (see _SCHEMA.md). ACT II
    // of the Sun-maiden: you embody the SAME maiden (with:maiden in Act I → as:maiden
    // here) in the marble-king rescue. A locked marble garden opens for you alone; keep
    // the vigil and the stone king wakes — but buy a servant to watch while you sleep and
    // she steals your place. Set to the geese, your CHOICE (weep your true tale where the
    // king can hear, or stay silent) decides vindication or a silent life among the geese.
    // become:'goose-girl' rides the marble-court threshold (kopshtMermer1 "prek derën").
    play: {
      entry: 'marbleCourt',
      stance: 'embodied',
      as: 'maiden',
      role:
        'You are the maiden of the black palace, and a locked marble garden opens for you alone — a court of people turned to stone, a sleeping marble king, and a scroll promising his life to whoever keeps the vigil three days, three nights, three weeks. Keep it and wake him; but worn out at the last, buy a servant to watch while you sleep and she steals your place, dresses in your clothes and marries the king you woke — until, set to the geese, you weep your true tale where he can overhear.',
      enter:
        'a locked marble garden opens for you alone — a court of people turned to stone, a sleeping marble king, and a scroll promising his life to whoever keeps the long vigil',
      from: 'kopshtMermer2',
      ending: 'mbretiDrejtesi',
      scenes: {
        kopshtMermer2: 'marbleCourt',
        mermerZgjim: 'vigil',
        mermerTradheti: 'stolenPlace',
        patatGruaja: 'geese',
        mbretiDrejtesi: 'counted',
      },
      divergences: [
        { beat: 'stolenPlace', note: 'Act II of the Sun-maiden\'s tale (Dozon IX / Elsie 22): you embody the SAME maiden — companion of the Sun-quest, embodied here — in the marble-king rescue. The false-bride betrayal is the tale\'s own fixed turn (worn out, you buy a servant to watch and she steals your place); the game adds the fatal alternative of simply sleeping through the vigil (mermerSli), which the tale\'s patient heroine never does.' },
        { beat: 'counted', note: 'The Grimm goose-girl weeps her woes to an iron stove; here the maiden weeps to a stone that listens, and the good ending turns on whether she SPEAKS her tale aloud where the king overhears (sing to the geese) or keeps it behind her teeth (the bad ending "The Silent Goose-Girl") — a truth never spoken changes nothing.' },
        { beat: 'marbleCourt', note: 'Reuses the Sun-quest\'s own world — the black palace (pallatiZi), its grieving queen, and the marble court — as the maiden\'s second movement; the false bride is executed as in Dozon\'s text, and "the patient one is known in the end, however long the lie wears her clothes."' },
      ],
    },
    beats: [
      {
        id: 'borrowed', title: 'Lent out to play',
        note: 'Days after the black door opened, the quarter\'s girls hear the queen\'s daughter is home and come asking for her. Her mother hands her over to be enjoyed "here and there".',
        lines: [
          ['1.1', 'Word reaches the girls of the quarter that the queen\'s daughter is home; they come asking her mother to lend them the girl for their fun — and she lets her go.', "Çupat' e mëhallës, si dëgjuanë që erdhi çupa e mbretëreshës, erdhë edhe i thanë s'ëmësë: «lë-na çupënë t'a gëzojmë këtu e atje», edhe ajo ua dha."],
        ],
        cast: {
          maiden: ['lane', 'lent out to her playmates, days into being home'],
          queen: ['blackPalace', 'lets her daughter out — the black paint barely off the walls'],
          girls: ['lane', 'sweep the queen\'s daughter off to enjoy her, here and there'],
          marbleKing: ['marbleGarden', 'stands marble mid-court, scroll open in his hand — as he has past anyone\'s memory'],
          marbleFolk: ['marbleGarden', 'people and beasts frozen around their king'],
          seller: ['peddlerRoads', 'tramps the trading roads, servants in tow (not yet come)'],
          servant: ['peddlerRoads', 'walks unsold in the seller\'s train'],
        },
        items: {
          scroll: ['marbleGarden', 'open in the marble king\'s hand'],
          clothes: ['maiden', 'her own dress, on her back'],
        },
      },
      {
        id: 'oneDoor', title: 'The door that opened once',
        note: 'The girls bring her to a garden whose great door opens for nobody. All of them shove for nothing — then she takes a run at it, the door lets her through, and slams shut on her heels.',
        lines: [
          ['1.2', 'She is walked to a garden ringed by a single door — one that nothing has ever managed to force.', "Ato, si e muarë, e shpunë më një baçë; n'atë baçë ish një portë e madhe, që nukë hapej."],
          ['1.3', 'The whole pack of them leans into it together, and not an inch gives.', "Zunë të tëra çupat edhe shtytnin portënë, po nukë mundnin t'a hapinë."],
          ['1.4-5', 'Then she goes too: one push at a run and it swings wide, lets her in — and the moment she is inside it shuts again.', "Ahere vate dhe këjo edhe, si shtyti portënë, u hap, edhe, posa hyri ajo brënda — se kish marrë shumë talas që të haptë portënë — u mbyll (porta),"],
        ],
        cast: {
          girls: ['gardenGate', 'shove the door in a pack, then watch it open for her alone'],
          maiden: ['marbleGarden', 'inside — the door shut on her heels'],
        },
      },
      {
        id: 'blackAgain', title: 'Grief a second time',
        note: 'The door will not give her back. The girls trail home heartsick with the story, and the mother who had just scrubbed the black off her walls weeps without stop.',
        lines: [
          ['1.6', 'With no second chance at that door and the girl plainly shut inside it, her playmates trail home crushed, find her mother, and spill the whole thus-and-thus of it.', "edhe këto çupat, si panë që nukë hapej porta që të marrinë çupënë, iknë duke helmuar edhe vanë në shtëpi të saj edhe i thanë s'ëmësë që kshu kshu gjau."],
          ['1.7', 'At those words the mother falls to weeping without stop.', "Edhe e ëma, si dëgjoi këtë fjalë, qante pa pushim."],
        ],
        cast: {
          girls: ['blackPalace', 'bring the mother the kshu-kshu of it, heartsick'],
          queen: ['blackPalace', 'weeps without stop — her daughter lost a second time'],
        },
      },
      {
        id: 'marbleCourt', title: 'A garden of the almost-living',
        note: 'Inside: people and creatures struck to marble, and among them a marble king holding an open written scroll. She reads the terms — three weeks, three days and three nights running with no sleep at all buy his waking, and his hand.',
        lines: [
          ['2.1', 'In there the girl finds people and creatures all turned to something like marble,', "Atje brënda tek hyri çupa gjeti nerëz edhe shpesëra që ishin bërë si mermer,"],
          ['2.2', 'and a king besides, marble like the rest, one hand holding a scroll left open and written out; she reads it, and its promise runs: whichever woman has it in her to keep her eyes open three weeks, three days and three nights running becomes his bride, and by her waking he lives again.', "gjeti akoma edhe një mbret që ish bërë si mermer edhe mbante në dorë një kartë të shkruar edhe të hapur, edhe këjo e këndon, edhe thonte (karta) kshu: «cilja është e zona mos të flerë tri dit e tri net edhe tri javë, atë to t'a marr grua, se to të ngjallem»."],
        ],
        cast: {
          maiden: ['marbleGarden', 'reads the scroll in the marble hand'],
          marbleKing: ['marbleGarden', 'stone; his scroll does his only talking'],
        },
      },
      {
        id: 'vigil', title: 'The sleepless reading',
        note: 'She settles into the watch with written pages for company. Three nights, three days and two of the three weeks pass without sleep.',
        lines: [
          ['2.3', 'So she stays sleepless, taking up written pages and reading them.', "Edhe ajo rrinte pa gjumë (pa fjejtur) edhe merrte kartëra edhe këndonte."],
          ['2.4', 'Three nights and three days pass, and week wears after week —', "Kur shkuanë të tri netet edhe të tri ditat edhe dy javë, [sic — DY javë: two of the three weeks done, one to run; Elsie prints \"three weeks passed\"]"],
        ],
        cast: {
          maiden: ['marbleGarden', 'keeps awake over her pages — two weeks down, one to go'],
        },
      },
      {
        id: 'window', title: 'A shovelful of gold',
        note: 'A seller of maidservants passes below the garden window. His price: whatever you care to give. Down goes a shovel-load of gold; down goes a rope; up comes a servant.',
        lines: [
          ['3.1', 'and then a man comes past selling maidservants.', "ahere shkoi një neri që shite hysmeqarka."],
          ['3.2', 'She comes out at the window and calls down the question: how much for a servant?', "Dolli dhe ajo në parathire edhe e pyeti: «sa pare kërkon për një hysmeqarkë?»"],
          ['3.3', 'Whatever you care to give, he answers.', "Edhe ay i tha: «sa të duash»."],
          ['3.4', 'She digs out a whole shovel\'s worth of gold and sends it over the sill toward him,', "Edhe këjo nxori një lopatë me florinj edhe ia hodhi,"],
          ['3.5', 'then sends a rope out over the wall; the servant grips it, and up she comes.', "edhe zbriti një tërkuzë edhe u var hysmeqarka edhe e ngriti."],
        ],
        cast: {
          seller: ['lane', 'cries his wares below the garden window; paid past arguing, walks on'],
          servant: ['marbleGarden', 'hauled up the wall on the rope — bought'],
          maiden: ['marbleGarden', 'buys herself a watcher with a shovel of gold'],
        },
        items: {
          gold: ['seller', 'thrown down from the window — his price and then some'],
          rope: ['marbleGarden', 'lowered and hauled in once; the wall crossed both ways'],
        },
      },
      {
        id: 'lastWatch', title: 'Wake me when he wakes',
        note: 'Her orders: stay awake two or three days so I can sleep a little; the king\'s scroll tells you why; and when he comes to life, wake me too. She lays out everything the scroll says — and sleeps.',
        lines: [
          ['3.6', 'She tells her: you are not to sleep these two or three days, so I can sleep a little,', "Pastaj i tha kësaj: «mos të fletsh dy a tri dit, po të fle unë një çikë,"],
          ['3.7', 'for I have gone a long, long time without sleep — it is all by the scroll the king holds in his hand;', "se kam shumë kohë pa gjumë, pas kësaj kartës që mban mbreti në dorë,"],
          ['3.8', 'the instant he stirs alive again, shake me awake as well.', "edhe kur të ngjallet mbreti, të më zgjonsh edhe mua»;"],
          ['3.9', 'She lays out for her everything the king\'s scroll says, then lies down and is asleep.', "edhe i rrëfeu të tëra ato që thonte karta e mbretit, edhe ra e fjejti."],
        ],
        cast: {
          servant: ['marbleGarden', 'takes the last watch — told everything, including what waking is worth'],
          maiden: ['marbleGarden', 'asleep at the very end of her vigil'],
        },
      },
      {
        id: 'stolenPlace', title: 'The stolen clothes',
        note: 'The servant strips the sleeper\'s dress and wears it. On the third week the king comes to life to a woman claiming the vigil; he marries her, and the true keeper is explained away — a bought servant, brought along out of fear.',
        lines: [
          ['4.1', 'The servant sets to it: she takes the clothes off the sleeper and puts them on herself, so that the king, when he comes to life, will take HER to wife.', "Edhe këjo hysmeqarka zuri edhe i nxori robatë asaj edhe i vuri vetë, që, kur të ngjallet mbreti, të marrë atë grua."],
          ['4.2', 'Three weeks to the day, and the stone king breathes again. Who are you? he wants to know.', "Si shkuanë të tri javëtë, u ngjall mbreti. «Ç'je ti?» i tha."],
          ['4.3', 'She answers: for three weeks, three days and three nights running, I never once closed my eyes —', "«Unë jam», i tha, «që kam tri dit e tri net e tri javë pa gjumë»,"],
          ['4.4', 'and he takes her for his wife.', "edhe ay e mori grua."],
          ['4.5', 'Then he asks: and this one sleeping — what is she?', "Pastaj e pyeti: «këjo që fle, ç'është?»"],
          ['4.6-7', 'A servant, she says, bought out of nothing but her own fear.', "Edhe ajo i tha: «është një hysmeqarkë që e mora, se më vinte frikë»."],
        ],
        cast: {
          servant: ['marbleGarden', 'in the stolen dress: vigil-keeper to the waking king, wife by the lie'],
          marbleKing: ['marbleGarden', 'alive again — and married to the wrong woman'],
          maiden: ['marbleGarden', 'asleep in a servant\'s clothes, renamed a servant while she dreams'],
        },
        items: {
          clothes: ['servant', 'stripped off the sleeper and worn — the lie\'s whole costume'],
        },
      },
      {
        id: 'geese', title: 'Set me to the geese',
        note: 'The true maiden wakes — to the king asking his wife what to do with "the servant". It is she herself who answers: put me to guarding the geese. The king does, and has a little hut made for her to live in.',
        lines: [
          ['4.8', 'Then the other one wakes too — just as the king turns to his wife: this servant of yours, so what do we do about her?', "Ahere u zgjua dhe këjo. I thotë mbreti gruasë: «këtë hysmeqarkë, ç't'a bëjmë?»"],
          ['4.9', 'She heard; and it was she who answered him: set me to guard the geese.', "Edhe ajo, si dëgjoi, i tha: «të më vësh të ruanj patet»,"],
          ['4.10', 'So the king puts her to the geese, and a little hut is made for her to live in.', "edhe mbreti e vuri, edhe i bëri një kalive për të ndenjtur. [sic — the KING has the kalive built; Elsie has her build the hut herself]"],
        ],
        cast: {
          maiden: ['gooseHut', 'goose-girl by her own word — a queen\'s daughter in a kalive'],
          marbleKing: ['marbleGarden', 'rules his waked court; has the goose-girl\'s hut built'],
          servant: ['marbleGarden', 'queen for now, in clothes that are not hers'],
        },
      },
      {
        id: 'counted', title: 'The woes counted one by one',
        note: 'In the hut she weeps without stop, counting her sorrows one by one. The king catches the weeping once, twice, three times — and comes to ask. Thus and thus it went with me. He takes her to wife; the false bride is killed and cut to pieces, the biggest piece this big.',
        lines: [
          ['4.11', 'There where she sits she weeps without stop, counting over her woes one by one.', "Atje tek rrinte, qante pa pushim edhe numëronte një nga një hallëtë e saj."],
          ['5.1', 'The king, having caught that weeping two or three times, comes to her and asks: why do you cry?', "Mbreti, si dëgjoi dy tri herë atë që qante, vate edhe i tha: «pse qan?»"],
          ['5.2', 'Thus and thus it all went with me, she tells him — and the king takes that woman to wife, and the servant he has killed and cut to pieces, the biggest piece THIS big.', "Edhe ajo i tha që: «kshu kshu më gjanë». Pastaj mbreti mori atë grua, edhe hysmeqarkënë e vrau edhe e bëri copëra — m'e madhja copë ish kaqë (ose: e bëri cingra mingra)."],
        ],
        cast: {
          maiden: ['marbleGarden', 'wife at last to the king she truly woke'],
          marbleKing: ['marbleGarden', 'heard the count of woes, learned the truth, and righted it in full'],
          servant: ['marbleGarden', '☠ killed and cut to pieces — the biggest piece this big'],
        },
        exit: ['servant'],
      },
    ],
}
