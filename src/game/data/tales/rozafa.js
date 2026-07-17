// ===========================================================================
// TALE: Rozafa — the walled-up wife (Legend) — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it.
// ===========================================================================

export default {
  id: 'rozafa',
  title: 'The Legend of Rozafat Castle',
  source:
    'Thimi Mitko (1820-1890) first recorded the legend in Bleta shqypëtare (Alexandria, 1878); ' +
    'this telling is Mitrush Kuteli\'s literary retelling in Tregime të moçme shqiptare ' +
    '(Tiranë: Naim Frashëri, 1965, repr. 1987/1998) · read in R. Elsie\'s translation ' +
    '("The Legend of Rozafat Castle"); all lines paraphrased',
  // where the legend is set and first recorded — a NORTHERN (Gheg) legend;
  // anchors below prefer this region's own mirrors (the castle at Shkodra)
  origin: {
    region: 'North Albania (Gheg) — Shkodra, on the Buna, under Mount Valdanuz',
    collector: 'Thimi Mitko (first recorded the Albanian version, 1878); this retelling by Mitrush Kuteli, 1965',
    published: 'Tregime të moçme shqiptare, Tiranë 1965 (repr. 1987, 1998)',
  },
  // THE ALBANIAN ORIGINAL — re-hunted 2026-07-15 and found: a PROSE telling of
  // this same legend (posted alongside the sung ballad already on file) that
  // tracks Elsie's five paragraphs closely enough to pin line by line. It is
  // NOT confirmed to be Kuteli's own 1965 wording (see discrepancies below for
  // the concrete places it diverges) — Kuteli's own text is still in
  // copyright and Mitko's 1878 recording is still nowhere digitized — so this
  // is documented as an independent, widely-circulated Albanian-language
  // telling of the same named legend, not a scan of one scholarly edition.
  albanian: {
    title: '«Rozafat» (prose) + «Kanga e kalasë së Shkodrës» (verse companion, same page)',
    source:
      'vogelushet.blogspot.com, "Për vogëlushët, për fëmijët tanë" (children\'s-folklore blog, poster "Arta"), ' +
      'post "Rozafat" (18 June 2008) — a prose telling of the legend, plus (posted on the same page, section ' +
      '«Në vargje») the sung Geg ballad already on file from the 2026-07-14 search. Most beat lines below quote ' +
      'the prose; a few (marked in-line) quote the verse instead, where the prose compresses past a beat the ' +
      'verse still carries whole. Neither is confirmed to be Kuteli\'s own copyrighted 1965 wording — see ' +
      'discrepancies for the concrete divergences from Elsie\'s English.',
    local: 'docs/references/rozafa-legjenda-e-rozafes.sq.txt',
  },
  discrepancies: [
    'THE WIFE\'S NAME (used throughout): "Rozafa" is Kuteli\'s own naming in his 1965 retelling — NEITHER Albanian ' +
      'text on file names her: the prose calls her only "nusja e vogël" (the young/small bride), the verse only ' +
      '"gjelinë" (daughter-in-law/bride). The tale follows "Rozafa" because it is the name the castle, the ' +
      'FOLKLORE card, and this game\'s own placed NPC already carry.',
    'THE OLD MAN (¶1.5-1.17): the prose telling calls the price-namer "një plak i mirë" — a GOOD old man — which ' +
      'matches Elsie/Kuteli\'s plain "an old man." The companion sung ballad instead calls the very same figure a ' +
      '"shenjt i gjallë" — a living saint. plakuKalase\'s backstory follows the ballad\'s stronger reading (a ' +
      'saint\'s authority, not an old man\'s guess, is why the brothers never once doubt him); the beat lines below ' +
      'quote whichever of the two texts covers that sentence, so both readings of him are on the record.',
    'THE WALL\'S LASTING TRACE (¶5.3): Elsie\'s translation ends on tears alone; the FOLKLORE card and the game\'s ' +
      'own staged kalaRozafa node instead say white MILK still seeps from the stone. The newly found prose ' +
      'reconciles the two: "gurët janë të lagur dhe plot myk nga lotët e gjiri i nuses së vogël" — the stones are ' +
      'wet with BOTH the tears and the breast(-milk) of the young bride, in one clause. The beat line follows ' +
      'Elsie\'s own printed sentence (tears) for the English, but the pinned Albanian carries both.',
    'THE MIDDLE WIFE\'S EXCUSE (¶2.7): Elsie has her claim a visit to her own parents; the prose instead has her say ' +
      '"sot unë duhet të shkoj për buajtje" — today I must go tend the cattle/buffalo. The beat line\'s English ' +
      'follows Elsie; the pinned Albanian is the prose\'s own (different) excuse.',
    'THE TOOL THAT FALLS (¶3.6): Elsie\'s "axe" (matching this tale\'s sopata item) renders the prose\'s "cekani" — ' +
      'a hammer/mallet, not an axe. The beat and the item keep Elsie\'s axe; the pinned Albanian says hammer.',
    'THE TWO ELDER BROTHERS (¶1.18-1.19): Elsie narrates the eldest and the second brother breaking the besa in ' +
      'two matched sentences; the prose collapses both into one shared sentence ("Dy vëllezërit e mëdhenj e ' +
      'shkelën besën...") without distinguishing eldest from second. Both beat lines below therefore pin ' +
      'overlapping halves of that same Albanian sentence.',
    'REJECTED VARIANTS (genuinely different plots — noted, not pinned to any line here): the 1954 Tirana corpus ' +
      '(docs/references/pralla-popullore-shqiptare-1954.sq.txt, lines 5941-5964) has a DIFFERENT immurement tale — ' +
      'a bridge, not a castle, near Dibër, with no named characters at all — genuinely another local telling of ' +
      'the same motif, not this one. Hecquard\'s French prose summary (Histoire et description de la Haute ' +
      'Albanie, 1858; local: docs/references/hecquard-haute-albanie.fr.txt, ~lines 1595-1646) makes the builder a ' +
      'man named Rosa and the immured figure his own NURSING SISTER Pha, not a brother\'s wife — a different family ' +
      'shape entirely. A Romanian-published variant (Cetatea Rozafat, Bucureşti 1974) moves the castle to ' +
      'Podgorica, has God rather than an old man name the price, and calls the youngest brother Gjergj. All three ' +
      'are real tellings; pinning any of them to Elsie\'s sentences here would misquote a different variant, so ' +
      'none is used.',
  ],
  // sentence counts of Elsie's translation's 5 narrative paragraphs (Elsie\'s
  // own scholarly headnote on comparative Balkan immurement legends is NOT
  // numbered here — it is his commentary, not the tale itself)
  paragraphs: [20, 11, 8, 7, 3],
  // THE GAME PROJECTION — you embody "a brother"; the besa choice (kalaNate)
  // decides which one. The wall always takes a wife (the legend is fixed); only
  // who you are, and what you carry, is yours. Endings clear `embodying`.
  play: {
    entry: 'fog',
    stance: 'embodied',
    as: 'husband',   // the youngest — the canonical keep-besa spine; the elder path is the alternate secret ending
    role:
      'You are one of three brothers raising a wall that will not hold. The price the old man names, and the besa you swear on it, decide which brother you are — the youngest who keeps his word and walls his own wife, or an elder who breaks it and is spared while another man\'s wife goes into the stone.',
    enter: 'the wall you and your brothers raise keeps falling by night, and an old man is about to name the terrible price of making it hold',
    from: 'kalaMjegull',
    ending: 'kalaFundBesa',
    scenes: {
      kalaMjegull: 'fog', kalaPlak: 'oldMan', kalaNate: 'besa', kalaMengjes: 'errand',
      kalaNgjitje: 'climb', kalaLutje: 'plea', kalaMur: 'walled', kalaFundBesa: 'walled',
    },
    divergences: [
      { beat: 'besa', note: 'You embody "a brother" and your besa choice assigns which one — the folktale fixes each brother\'s role (two break the oath, the youngest keeps it); the game lets your choice decide whether you are the honourable youngest or a spared elder.' },
      { beat: 'walled', note: 'The wall always takes a wife — the game will not change the legend\'s outcome, only who you are and what you carry. Keep the besa and it is your own wife; break it and you stand by as the youngest\'s wife is walled.' },
      { beat: 'fog', note: 'The build-by-day / fall-by-night rhythm is played on the world clock: you work the wall, night falls and it comes down, dawn shows it fallen again — until a life is sealed in and, the first night after, the wall no longer falls.' },
      { beat: 'walled', note: 'The white milk still seeping from the stone follows the oral/lore reading; Elsie\'s printed text ends on the mother\'s tears alone.' },
    ],
  },
  cast: [
    { id: 'eldest', name: 'the eldest brother', note: 'first to hear the old man\'s price — and first to break the besa', npc: 'vellaMadh' },
    { id: 'middle', name: 'the second brother', note: 'swears the same besa, breaks it the same night', npc: 'vellaMesit' },
    { id: 'husband', name: 'the youngest brother', note: 'the only one who keeps his word — so it is his own wife who comes', npc: 'vellaVogel' },
    { id: 'rozafa', name: 'Rozafa', note: 'the youngest brother\'s wife — the one wife never warned, and so the one who climbs the hill', npc: 'rozafa' },
    { id: 'eldestWife', name: 'the eldest\'s wife', note: 'forewarned by her own husband; pleads illness the one morning it matters', npc: 'gruaMadhe' },
    { id: 'middleWife', name: 'the second\'s wife', note: 'forewarned too; claims a visit to her own parents', npc: 'gruaMesit' },
    { id: 'mother', name: 'the brothers\' mother', note: 'keeps the house below the hill; asks each daughter-in-law in perfect innocence', npc: 'nenaVellezerve' },
    { id: 'son', name: 'Rozafa\'s small son', note: 'still nursing the morning his mother climbs the hill', npc: 'djaliRozafes' },
    { id: 'oldMan', name: 'the old man', note: 'names the wall\'s price, once, and is never seen again', npc: 'plakuKalase' },
  ],
  // anchor = the game location this tale place inhabits (see _SCHEMA.md).
  // REUSE over invention, under THE SHARING RULE. This is a NORTHERN (Gheg)
  // legend fixed to one real hill — Rozafa Castle at Shkodra — which the game
  // already stages across a six-node chain culminating at kalaRozafa, the
  // exact node the core 'rozafa' NPC is placed on.
  places: [
    { id: 'kalaja', emoji: '🏰', name: 'the castle on the Buna', note: 'Mount Valdanuz above the river, where the brothers raise a wall that will not hold',
      anchor: { status: 'existing', node: 'kalaMur', mirror: 'Rozafa Castle above the Buna at Shkodra — the real hill this legend explains',
        mold: 'the founding hill, walked as ONE embodied arc: you (a brother) build the doomed wall (kalaMjegull), the old man names the price and you swear the besa (kalaPlak), the wife climbs (kalaNgjitje), makes her one plea (kalaLutje), and is sealed into the stone whose milk still runs (kalaMur — where the core \'rozafa\' NPC and the whole cast stand). The besa in stone owns this hill.',
        sharedWith: ['nastradin (the Vezir who garrisons these SAME finished walls centuries later, never their builder)', 'gjergj-elez-alia (a proposed farrier-town below the walls, not the walls themselves)'],
        conflicts: 'this founding legend owns the fortress and its besa alone — no other trio of builder-brothers and no other walled bride may be staged here; gjergj-elez-alia\'s own conflicts note already concedes the fortress to Rozafa.' } },
    { id: 'shtepia', emoji: '🏠', name: 'the brothers\' house', note: 'the mother\'s hearth on the road at the castle\'s foot, where the besa choice is made and the meal set out',
      anchor: { status: 'existing', node: 'udhaKthimit', mirror: 'a Shkodra hearth on the road at the castle\'s very foot — the last ground before the climb to the walls',
        mold: 'a household beside the same open road sons-of-eagle stages here — a door on that road contests its travellers no more than any roadside house does: a mother, three wives, one small son, one morning\'s walk below where the brothers build. The night besa-choice (kalaNate) and the dawn errand (kalaMengjes) stand here.',
        conflicts: 'NOT the mountain build-site (kalaMur, where the wall rises and the walling happens); NOT fshatiJeta — that is the game\'s central Tosk village, the wrong region for this Gheg household at Shkodra.',
        sharedWith: ['sons-of-eagle (udhaKthimit — the same open homeward road, its own hunter passing through)'] } },
  ],
  items: [
    { id: 'ushqimi', emoji: '🍞', name: 'bread, water and wine', note: 'the morning meal — whichever wife carries it up the hill decides the wall\'s price' },
    { id: 'sopata', emoji: '🪓', name: 'the youngest brother\'s axe', note: 'flung down the mountainside the instant he sees his own wife climbing toward him' },
  ],
  beats: [
    {
      id: 'fog', title: 'Fog on the Buna',
      note: 'Fog hides the river for three days and nights; when it lifts, three brothers are seen raising a castle whose wall will not hold past nightfall.',
      lines: [
        ['1.1', 'For three full days and nights, a fog swallows the Buna, and no one can see the river at all.', "I ra mjegulla Bunës dhe e mbuloi të tërë qytetin. Kjo mjegull mbeti aty tri ditë e tri netë. [sic — this prose says the fog covers \"the whole town,\" not \"the river\"]"],
        ['1.2', 'Then a hard wind rises and tears the mist apart, and Mount Valdanuz stands clear again.', "Pas tri ditësh e tri netësh fryu një erë e hollë dhe e ngriti mjegullën."],
        ['1.3', 'Three brothers are up there, hard at work raising a castle.', "Aty majë kodrës punonin tre vëllezër e ndërtonin një kështjellë."],
        ['1.4', 'Night after night, whatever wall they have raised that day comes down again, and the castle never gets any closer to finished.', "Por, muri që ndërtonin ditën, u shembej natën..."],
      ],
      cast: {
        eldest: ['kalaja', 'labors on the wall by day, watches it fall again by night'],
        middle: ['kalaja', 'labors beside his brothers'],
        husband: ['kalaja', 'youngest of the three, works the same doomed wall'],
        mother: ['shtepia', 'keeps the brothers\' house below the hill'],
        eldestWife: ['shtepia', 'at home'],
        middleWife: ['shtepia', 'at home'],
        rozafa: ['shtepia', 'at home, nursing her small son'],
        son: ['shtepia', 'still at the breast'],
        oldMan: ['kalaja', 'wanders the roads nearby (not yet met)'],
      },
      items: { ushqimi: ['shtepia', 'kept in the house, sent up the hill each morning'] },
    },
    {
      id: 'oldMan', title: 'A stranger\'s greeting',
      note: 'An old man passing wishes the brothers success, is pressed to share what he knows, and — once he learns they are all married — agrees, reluctantly, to name the secret.',
      lines: [
        ['1.5', 'One day an old man walks past and calls out a blessing on their labor.', "Na shkon aty një plak i mirë dhe u thotë: -Puna e mbarë o tre vëllezër!"],
        ['1.6', 'And the same to you, they answer him, though luck is against us.', "-Të mbarë paç o plak i mirë. Po ku e sheh ti të mbarën tonë?"],
        ['1.7', 'Every day we build, they tell him, and every night it falls.', "Ditën punojmë e natën shembet."],
        ['1.8', 'Do you happen to know any way to make a wall hold, they ask?', "A di ta thuash ndonjë fjalë të mirë: c'të bëjmë që ti mbajmë muret në këmbë?"],
        ['1.9', 'I do, says the old man, but telling you would shame me.', "-Unë e di, por kam gjynah-ë. [from the companion sung ballad — this prose telling skips the shame/marriage exchange entirely]"],
        ['1.10', 'Then let the shame fall on us, they say — we are the ones who need it built.', "-At gjynah-ë le’mi ne. [sung ballad, as 1.9]"],
        ['1.11', 'He thinks it over a while, then asks whether the three of them have wives.', "-A jini të tre t’martuem, A i kini të trija vashat? [sung ballad, as 1.9]"],
        ['1.12', 'We do, they say — each one of us.', "-Na të tre vashat i kena. [sung ballad, as 1.9]"],
        ['1.13', 'Now tell us, they press him, what must be done.', "-Atëherë, tha plaku, dëgjoni. [sic — the prose gives this transition line to the old man (\"listen\") rather than a distinct plea from the brothers]"],
      ],
      cast: {
        oldMan: ['kalaja', 'met at last — presses them for their trouble, then relents'],
      },
    },
    {
      id: 'besa', title: 'The price of a wall',
      note: 'The old man names his price — the wife who brings tomorrow\'s meal must be walled in alive — and swears the brothers to silence. That same night two of them break the oath at home; only the youngest keeps it.',
      lines: [
        ['1.14', 'If the castle truly matters to you, he says, swear first that none of you will breathe a word of this to your wives.', "por duhet ta mbani në fshehtësi dhe të mos i tregoni askujt as edhe vashave tuaja në shtëpi."],
        ['1.15', 'Whichever of them carries you tomorrow\'s meal, he tells them, must be buried alive inside the wall.', "Nesër cila vashë të vijë për të sjellë ushqimin, nga tre kunatat, duhet ta merrni dhe ta murosni të gjallë në muret e kështjellës."],
        ['1.16', 'Only a life sealed into the stone will make it hold for good, he says.', "Atëherë do ta shihni se muri do të ngrihet dhe do të qëndrojë përgjithmonë."],
        ['1.17', 'With that the old man turns and goes on his way.', "Kaq tha plaku dhe u zhduk."],
        ['1.18', 'That evening the eldest brother cannot hold his tongue: he tells his wife everything, and warns her above all to stay clear of the building site.', "Vëllezërit të mërzitur kthehen në shtëpi. Dy vëllezërit e mëdhenj e shkelën besën dhe u treguan grave të veta. [sic — the prose narrates both elder brothers together in one sentence, not the eldest alone]"],
        ['1.19', 'The second brother does the very same, confessing the whole bargain to his own wife.', "Ata u thanë vashave të mos vinin për të sjellë ushqimin të nesërmen. [continues the same shared sentence — see 1.18]"],
        ['1.20', 'Only the youngest holds his tongue, and his wife goes to bed knowing nothing of it.', "Vetëm vëllai i vogël e mbajti besën. Ai nuk i tregoi vashës së vet."],
      ],
      cast: {
        oldMan: ['kalaja', 'gone, his bargain struck — not seen again'],
        eldest: ['shtepia', 'home for the night, and breaks the besa before he sleeps'],
        middle: ['shtepia', 'home for the night, and breaks the besa in his turn'],
        husband: ['shtepia', 'home for the night, and keeps his word'],
        eldestWife: ['shtepia', 'now knows the secret her husband swore to keep'],
        middleWife: ['shtepia', 'now knows it too'],
        rozafa: ['shtepia', 'still knows nothing'],
      },
    },
    {
      id: 'errand', title: 'Whichever wife comes with the bread',
      note: 'Next morning the brothers return to the wall. At home their unwitting mother asks each wife in turn to carry the meal up the hill; the two who were warned find excuses, and only the youngest agrees.',
      lines: [
        ['2.1', 'Early the next day the three brothers are back at the wall.', "Në mëngjes, si gjithmonë vëllezërit shkuan në punë"],
        ['2.2', 'Axes ring, stone breaks under the blows, the wall climbs higher — and with every course laid, three hearts beat a little faster.', "dhe filluan të prisnin... [sic — the prose replaces the axe/heartbeat imagery with a plain \"and began to wait\"]"],
        ['2.3', 'Back home, their mother has no idea what was sworn on the mountain.', "Nëna e djemve në shtëpi nuk dinte gjë."],
        ['2.4', 'She turns to the eldest\'s wife: the men need their bread, water and wine carried up, daughter.', "Ajo i kërkon nuses së madhe t'u shpjerë trimave ushqimin."],
        ['2.5', 'Forgive me, mother, the young woman says, but I cannot go today.', "Nusja e madhe ankohet se ishte e sëmurë"],
        ['2.6', 'I am not well, she tells her.', "dhe kështu nuk shkon. [sic — reported speech in the prose, not a direct quote as in Elsie]"],
        ['2.7', 'The mother asks the second wife next, who begs off too, saying she is promised at her own parents\' house that day.', "I tha dhe të dytës. E reja e dytë i thotë: -Jo zonja nënë, sot unë duhet të shkoj për buajtje. [sic — the prose's excuse is going to tend the cattle, not visiting her parents; see discrepancies]"],
        ['2.8', 'So she turns last to the youngest, with the same request: bread, water, wine, for the men on the hill.', "I vjen rradha nuses së vogël. -O nusja e vogël, trimat duan bukë, ujë dhe kungullin me verë."],
        ['2.9', 'The girl rises at once, saying she would gladly carry it up, only she worries her small son will want the breast and cry for her while she is away.', "-Po zonja nënë, përgjigjet nusja e vogël, por kam djalin e vogël që po qan."],
        ['2.10', 'Go on then, say the other two, we will keep the boy well minded.', "Dy kunatat e mëdha i premtuan se do të kujdesen për djalin."],
        ['2.11', 'He will not so much as whimper, they promise.', "-Na djaloçin ta shikojmë, Kurr na tokë s’ta lëshojmë. [from the companion sung ballad — the prose only reports the promise, without this direct-quote detail]"],
      ],
      cast: {
        eldest: ['kalaja', 'back at the wall, saying nothing of the night before'],
        middle: ['kalaja', 'back at the wall beside him'],
        husband: ['kalaja', 'back at the wall, dreading how the day will end'],
        mother: ['shtepia', 'sends the meal up as she always has, asking who will carry it'],
        eldestWife: ['shtepia', 'pleads illness and is spared'],
        middleWife: ['shtepia', 'pleads a visit to her own parents and is spared'],
        rozafa: ['shtepia', 'agrees to go, though it means leaving her son'],
        son: ['shtepia', 'left in his aunts\' care'],
      },
      items: { ushqimi: ['rozafa', 'gathered up — bread, water and wine, hers now to carry'] },
    },
    {
      id: 'climb', title: 'Up the hill with the meal',
      note: 'She sets out with the food, kisses her son goodbye, and climbs to the building site. Her greeting is met with silence: the axes stop, and her husband hurls his own axe down the slope before the eldest tells her the truth.',
      lines: [
        ['3.1', 'So the youngest wife gathers the bread, the water and the wine, kisses her boy on both cheeks, and starts up the mountain.', "Ajo e mori bukën, ujin dhe kungullin me verë, puthi djalin në të dy faqet, dhe niset."],
        ['3.2', 'Up the slope of Valdanuz she goes, straight toward the three men at their work.', "Kur arrin tek vendi i punës,"],
        ['3.3', 'Good luck to the work, she calls out as she comes near.', "përshëndet trimat. -Puna e mbarë o trima!"],
        ['3.4', 'But something is suddenly very wrong.', "Vëllezërit kur e panë, ndalën punën."],
        ['3.5', 'The axes fall silent, three hearts begin pounding, and all three men go pale.', "Fytyrat iu zbehen"],
        ['3.6', 'At the sight of his own wife climbing toward him, the youngest brother flings his axe down the mountainside and curses the stones and the wall together.', "dhe burrit të saj i ra cekani nga dora. [sic — a hammer (\"cekan\"), not an axe; see discrepancies]"],
        ['3.7', 'She wants to know why he would curse good stone like that — what could possibly be wrong?', "Nusja e vogël i thotë: -C'ke ti, im zot? Pse e mallkon gurin dhe murin?"],
        ['3.8', 'His brothers only give a bitter smile, and the eldest tells her plainly: an unlucky star stood over her birth, sister, for they swore to wall her up alive.', "Hidhet kunati i madh dhe i thotë: -Ti paske lindur në ditë të zezë, moj kunata e vogël. Ne duhet të murojmë të gjallë vajzën qe do na sillte sot për të ngrënë, vetëm në këtë mënyrë kështjella do të qëndrojë e nuk do të shembet më."],
      ],
      cast: {
        rozafa: ['kalaja', 'arrives with the meal and learns the price'],
        son: ['shtepia', 'kept by his two aunts'],
        husband: ['kalaja', 'throws down his axe the moment he sees her coming'],
        eldest: ['kalaja', 'tells her the truth to her face'],
        middle: ['kalaja', 'stands by, saying nothing'],
      },
      items: {
        sopata: ['kalaja', 'flung down the mountainside the instant he sees her'],
        ushqimi: ['kalaja', 'carried all the way up to the building site, set down and forgotten the moment the price is named'],
      },
    },
    {
      id: 'plea', title: 'One request',
      note: 'She accepts her fate without a fight, asking only that the wall leave her right eye, hand, foot and breast free — so she can go on watching, holding, rocking and nursing her son from within the stone.',
      lines: [
        ['4.1', 'The young wife takes the news calmly: if that is what was sworn, she says, she will not fight it.', "-Shëndosh ju o tim' kunetër, [sic — the prose has her bless her in-laws directly, without a separate line of calm acceptance]"],
        ['4.2', 'But she asks one thing of them first.', "por unë po ju lë një porosi:"],
        ['4.3', 'When they raise the stone around her, she says, they must leave open her right eye, her right hand, her right foot, and her right breast.', "Kur të më muroni, syrin e djathtë të ma lini jashtë që të shikoj tim bir,"],
        ['4.4', 'Her son is still small, she reminds them.', "dorën e djathtë të ma lini jashtë që ta ledhatoj, [sic — the prose has no separate \"my son is still small\" line; quoted here is the next body-part clause, since the Albanian pairs each part directly with its function rather than listing all four parts first]"],
        ['4.5', 'When he cries for her, she says, that eye will watch over him, that hand will comfort him, that foot will rock his cradle, and that breast will go on feeding him until he is weaned.', "këmbën e djathtë të ma lini jashtë që ti përkund djepin, dhe gjirin e djathtë të ma lini jashtë që ta mëkoj kur të qajë."],
        ['4.6', 'Let the rest of her turn to stone, she says, so long as the castle stands.', "Gjiri im u nguroftë, kështjella jonë gjithmonë qëndroftë,"],
        ['4.7', 'And let her son grow into a hero great enough to rule the whole world, she asks.', "djali im trimëroftë, u bëftë mbret e mbretëroftë!"],
      ],
      cast: {
        rozafa: ['kalaja', 'accepts her fate and names her one condition'],
      },
    },
    {
      id: 'walled', title: 'The wall that never fell again',
      note: 'The brothers wall her into the foundation exactly as she asked. This time the castle holds and keeps rising — and to this day, the legend says, the stone at its foot still runs damp with a mother\'s tears.',
      lines: [
        ['5.1', 'The brothers do what they swore: they take her up and shut her into the wall, stone by stone.', "Vëllezërit e morën nusen e vogël dhe e muruan në themel të kështjellës."],
        ['5.2', 'This time nothing falls — the wall holds, and keeps climbing, course upon course.', "Muret u ngritën e u lartuan e nuk u shembën më as natë e as ditë."],
        ['5.3', 'And they say that to this day, low on the castle wall, the stone still runs damp and green with mildew — the mother\'s tears for the son she left behind, never dry.', "Por, rrëzë mureve të kështjellës edhe sot e kësaj dite, gurët janë të lagur dhe plot myk nga lotët e gjiri i nuses së vogël që vazhdon të pikojë për birin e saj. [this Albanian names BOTH tears and milk/breast in one clause — see discrepancies]"],
      ],
      cast: {
        rozafa: ['kalaja', 'sealed into the wall forever — eye, hand, foot and breast left free; her voice still answers from the stone'],
        eldest: ['kalaja', 'stands beside the finished wall, saying nothing more'],
        middle: ['kalaja', 'stands beside it too'],
        husband: ['kalaja', 'lives on beside the wall that took his wife'],
        son: ['kalaja', 'brought to the foot of the wall, where the legend says he is never truly without her'],
      },
      items: { ushqimi: ['kalaja', 'left where she set it down — its errand overtaken by the price it revealed'] },
    },
  ],
}
