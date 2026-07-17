// ===========================================================================
// TALE: Syri i Kaltër — the Blue Eye spring — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it.
// ===========================================================================

export default {
  id: 'syri-kalter',
  title: 'Syri i Kaltër — the Blue Eye spring',
  source:
    'oral legend of the deep south (Delvinë–Sarandë) · no Elsie translation exists for this legend — read in Albanian regional-press transcriptions of local oral tradition; all lines are my own translation into English, paraphrased',
  // this is a place-origin LEGEND, not an Elsie folktale: Elsie's Albanian
  // Literature site has no page for it (index_legends.html's 15 legends are
  // Baba Tomor, Sari Salltëk, Aga Ymeri, Gjergj Elez Alia, Mujo/Halili,
  // Rozafa, Scanderbeg, Shega/Vllastar, The Lover's Grave, Ali Dost Dede,
  // Jabal-i Alhama, the Hoti/Triepshi/Kastrati/Kelmendi tribe foundings and
  // the Kastrati revenge — no Blue Eye); FOLKLORE cites only Wikipedia, whose
  // English article is pure geography with no legend content at all.
  origin: {
    region: 'South Albania (the deep south — Sarandë/Delvinë, Vlorë County)',
    collector: 'oral tradition, credited to a resident of Mesopotam village near Sarandë',
    published: 'first set down in regional web press, 2010 (Kuriozitete.net / Shqipëria.com)',
  },
  albanian: {
    title: 'Legjenda e Syrit të Kaltër',
    source:
      'Kuriozitete.net, «Legjenda e Syrit të Kaltër» (posted 06-10-2010), reprinted verbatim as «Gjarpëri i Syrit te Kalter» at Shqipëria.com (~2010) — an oral account credited to a resident of Mesopotam village, 20 km from Sarandë. A second, independently circulating telling ("Një herë e në një kohë, fryu një erë…", Saranda Web 2017 & 2023, Bordo.al 2019) diverges in several details — see `discrepancies`.',
    local: 'docs/references/syri-kalter-legjenda.sq.txt',
  },
  discrepancies: [
    'THE ARRIVAL (¶1.1): the primary telling has the serpent travel overland, «ka dalë nga Saranda në Delvinë» (came up out of Saranda into Delvinë); the widely-reprinted "wind" telling instead opens with a storm-wind stirring the sea until it casts the serpent onto Mount Sopot from a rain-cloud — a sea-born arrival rather than an overland one. The beats follow the overland reading.',
    'THE DONKEYS (¶1.6): the primary telling has the old man load TWO donkeys with sacks of eshkë (tinder-straw); the "wind" telling — and every English tourist retelling checked — has only ONE. The beats follow the primary telling\'s two donkeys; the game\'s own existing scene (udhaSyri) compresses this to one, which is not a contradiction so much as the same folk compression the "wind" telling already shows.',
    'THE DYING CRY (¶1.8): the primary telling has the burning serpent cry «Dil mama det, dil motër Bistricë» (come out, mother sea — come out, sister Bistrica, addressing the river as sister). The "wind" telling instead has it cry «Ku je ti det, që më bëre kokën dhe ti lumë, vëllai im…!» (where are you, sea, that broke my head, and you, river, my brother — addressing the river as brother) and adds that the sea set out from Vivar and the river from Sopot but arrived too late.',
    'THE AFTERMATH (not in the primary telling): only the "wind" telling adds an etiology for a second real feature — the serpent\'s death-thrash beats its tail against the mountainside, leaving the still-visible bare scar (the "unusual parallel lines of trees... right at the snowline" that another retelling, invest-in-albania.org, says local children still point to), and states that ever since, the sea and the mountain are bound to each other "like father and son." The beats do not stage this scar as its own place; it is noted here as color only.',
    'THE EYE ITSELF (¶1.10): the primary telling\'s actual words are «doli Syri i Kaltër dhe gjarpëri ngordhi pasi shpërtheu uji» (the Blue Eye came out, and the serpent died as the water burst forth) — terser than the "eye falls out" image FOLKLORE\'s summary uses, but it leans on the pun already built into "Syri" (eye/spring). That the eye is literally understood to fall and become the water is not an invention: the game\'s own existing scene at this exact spot (udhaSyri) already states it outright — «syri i gjarprit bie dhe bëhet ujë» (the serpent\'s eye falls and becomes water). Beat line 1.10 makes that reading explicit, matching what is already staged.',
  ],
  // one continuous paragraph in the source (an oral account quoted whole, no
  // paragraph breaks) — 10 sentences
  paragraphs: [10],
  cast: [
    { id: 'gjarpri', name: 'the serpent', note: 'man-eating, come up toward Delvinë from the sea — dies burning from within; its eye becomes the spring', npc: 'gjarpriSopotit' },
    { id: 'plaku', name: 'the old man', note: 'wise elder of Sopot who feeds the serpent fire instead of flesh, saving Delvinë and Sopot both', npc: 'plakuEshkes' },
    { id: 'gratëVrisit', name: 'the women of Vrisi', note: 'water-carriers taken at the little spring — the rampage\'s first victims', npc: 'gratëVrisit' },
    { id: 'çobanëtSopotit', name: 'the shepherds of Sopot', note: 'two shepherds and their flocks, eaten on the parched slope', npc: 'çobanëtSopotit' },
  ],
  // anchor = the game location this tale place inhabits. REUSE over invention,
  // under THE SHARING RULE. This legend's own climax (an old man's burning
  // donkey kills a man-eating serpent whose fallen eye becomes an endless
  // spring people call Syri i Kaltër) is ALREADY staged almost word for word
  // at udhaSyri/syriFund, on the dry-riverbed spur of the drought arc — this
  // tale supplies that scene's full backstory rather than inventing new map.
  places: [
    { id: 'vrisi', emoji: '🏺', name: 'the bridge of Vrisi', note: 'the small spring in Delvinë where the serpent\'s rampage begins',
      anchor: { status: 'offstage', mirror: 'the historic spring and bridge of Vrisi in the town of Delvinë, south Albania',
        mold: 'the rampage\'s first bite — women and children fetching water for home; never its own built node, only the backstory the legend opens on, upstream of the parched ground (sopot) and the spring (spring) the game actually stages' } },
    { id: 'sopot', emoji: '⛰️', name: 'Sopot\'s parched slope', note: 'the high ground above Delvinë the serpent rampaged across, and where the old man springs his trap',
      anchor: { status: 'existing', node: 'udhaThate', mirror: 'Mali i Gjerë ("Sopot" locally), the ridge above Delvinë the Blue Eye rises at the foot of',
        mold: 'the parched approach every telling of the drought arc already crosses — dry ground, a dry riverbed, a lubia holding water nearby; this legend\'s rampage (whole flocks and two shepherds eaten, crops ruined) and the old man\'s fire-trick play out along this same stretch, just upstream of where the spring itself bursts',
        conflicts: 'NOT mali1/Mount Tomorr — Tomorr is the OTHER, still-standing holy mountain of the south (Baba Tomor\'s own peak, three-friends\' mountain); Sopot/Mali i Gjerë is a distinct real ridge near Delvinë, so this legend borrows the nearest EXISTING parched-ground node rather than Tomorr\'s identity' } },
    { id: 'spring', emoji: '💧', name: 'Syri i Kaltër — the Blue Eye', note: 'where the serpent dies and its fallen eye becomes an endless spring',
      anchor: { status: 'existing', node: 'udhaSyri', mirror: 'the real Syri i Kaltër spring at Muzinë, Finiq municipality (between Delvinë and Sarandë), the deep south\'s karst wonder',
        mold: 'already staged, almost word for word: an old man feeds the serpent a burning donkey, it eats it and dies, its eye falls and becomes water, and the people name it the Blue Eye — the secret ending syriFund lets any wanderer kneel right there today and drink from a spring that never runs dry',
        conflicts: 'shares this spur with the Lubia\'s den (lubia1) — a DIFFERENT southern water-monster (many-headed, regrows when cut, wants a maiden, never dies to fire alone); the "wind" telling of THIS very legend uses "lubia" as a common noun for a monster\'s lair, not a claim the two beasts are one and the same',
        sharedWith: ['the drought arc\'s own secret ending, syriFund'] } },
    { id: 'deti', emoji: '🌊', name: 'the sea', note: 'the serpent\'s own mother, called on as it burns and dies',
      anchor: { status: 'offstage', mirror: 'the Ionian/Adriatic deep off Sarandë\'s coast',
        mold: 'never staged — only addressed, in the serpent\'s dying cry, as kin; if ever staged, the generic deep-sea anchor (detiThelle1) is the compatible spot, since drowned and sea-born things there never clash',
        conflicts: 'NOT bregu — Gjergj Elez Alia\'s shore tower is the north Adriatic coast (Ulqin); this legend\'s sea is the far south\'s Ionian coast, a different shore entirely' } },
  ],
  items: [
    { id: 'eshka', emoji: '🔥', name: 'the burning tinder-straw', note: 'the old man\'s trick — sacks of kindling loaded on two donkeys and set alight' },
  ],
  // how the game stages this tale — the WITNESS projection (see _SCHEMA.md). A
  // place-origin legend woven into the drought exploration: you come to the Blue
  // Eye (udhaSyri) and learn why it weeps — the giant serpent, the old man's
  // fire-donkey trick, the eye that burst into the spring. NO become/mold-lock —
  // udhaSyri is a shared hub (the drought-hero reaches the Eye here for water, the
  // crossover ending syriFund).
  play: {
    entry: 'advent',
    stance: 'witness',
    role:
      'The old people near Saranda tell how a giant serpent devoured the women at the bridge of Vrisi, whole flocks, and two shepherds at Sopot — until a wise old man fed it two fire-laden donkeys, and the burning serpent fled to the low ground where its own falling eye broke open as the spring men call Syri i Kaltër, the Blue Eye. You come to the Eye and learn why it weeps clear and cold.',
    from: 'udhaSyri',
    ending: 'syriFund',
    scenes: {
      udhaThate: 'rampage',
      udhaSyri: 'trick',
      syriFund: 'spring',
    },
    divergences: [
      { note: 'The game\'s WITNESS stance on a place-origin legend woven into the drought quest: the Blue Eye node (udhaSyri) is a SHARED hub — the drought-hero reaches it here for water (the crossover ending syriFund, "a spring that does not stop") — so no figure is embodied and the hub stays open. You witness the legend at the spring rather than playing the old man.' },
      { beat: 'trick', note: "The heart of the legend — the wise old man loads two donkeys with tinder-straw, sets them alight, and the serpent swallows them instead of him and burns from within — is kept in the telling at the spring; the serpent's agonised cry «come out, mother sea — come out, sister Bistrica!» and the Vrisi/Sopot rampage are compressed." },
      { beat: 'spring', note: "The ending the player reaches (syriFund) is the drought-quest crossover — you drink the endless deep-blue spring the dying serpent's eye created and lead its water home — rather than the serpent's death staged as its own screen; the Eye's origin is the reward's backstory." },
    ],
  },
  beats: [
    {
      id: 'advent', title: 'A serpent bound for Delvinë',
      note: 'An ordinary day in the deep south: women fill their jugs at Vrisi, two shepherds mind their flocks on Sopot\'s dry slope, an old man goes about his business — and, unseen, a giant serpent is already coming up toward Delvinë.',
      lines: [
        ['1.1', 'They say a giant serpent had come up out of Saranda, making for Delvinë.', 'Flitet se ka qenë një gjarpër që ka dalë nga Saranda në Delvinë.'],
      ],
      cast: {
        gjarpri: ['deti', 'is said to have come up out of Saranda already, making for Delvinë'],
        plaku: ['sopot', 'goes about an ordinary day on Sopot\'s slope, not yet needed'],
        gratëVrisit: ['vrisi', 'fill their jugs at the small spring, as every day'],
        çobanëtSopotit: ['sopot', 'mind their flocks on the parched high ground, not yet aware'],
      },
    },
    {
      id: 'vrisi', title: 'The water that was never carried home',
      note: 'At the bridge of Vrisi the serpent finds the village\'s water-carriers and takes them all in an instant.',
      lines: [
        ['1.2', 'At the bridge of Vrisi stood a small spring, where women and children were filling their jugs to carry home.', 'Tek ura e Vrisit ishte një burim i vogël, kishte gra dhe fëmijë që mbushinin ujë për në shtëpi.'],
        ['1.3', 'In that instant the serpent arrived and devoured every one of them.', 'Në atë moment vjen gjarpri dhe i ha ata njerëzit.'],
      ],
      cast: {
        gjarpri: ['vrisi', 'arrives at the little spring and devours the women and children there'],
        gratëVrisit: ['vrisi', '☠ taken at the spring, mid-errand'],
      },
      exit: ['gratëVrisit'],
    },
    {
      id: 'rampage', title: 'Up the parched slope',
      note: 'The serpent climbs toward Sopot, emptying pastures of whole flocks and finally the two shepherds themselves, ruining the standing crops as it goes. The old man watches the ruin mount and begins turning over a plan.',
      lines: [
        ['1.4', 'From there it set off toward Sopot, swallowing whole flocks of livestock on the way.', 'Më pas u nis për në Sopot ku rrugës hëngri kope të tëra me bagëti.'],
        ['1.5', 'At Sopot it went on to eat two shepherds besides.', 'Pastaj vajti në Sopot ku hëngri dhe dy çobanë.'],
      ],
      cast: {
        gjarpri: ['sopot', 'climbs toward Sopot, swallowing whole flocks along the way, then both shepherds besides'],
        çobanëtSopotit: ['sopot', '☠ eaten with their flocks'],
        plaku: ['sopot', 'watches the ruin mount and starts turning over a plan'],
      },
      exit: ['çobanëtSopotit'],
    },
    {
      id: 'plan', title: 'Two donkeys, a sack of tinder',
      note: 'The old man loads two donkeys with sacks of tinder-straw and sets them ablaze by the serpent\'s lair.',
      lines: [
        ['1.6', 'A wise old man had two donkeys loaded with sacks of tinder-straw and set them alight.', 'Një plak i mençur tha të ngarkonin dy gomerë me eshkë dhe e ndezën.'],
      ],
      cast: {
        plaku: ['sopot', 'loads two donkeys with sacks of tinder-straw and sets them ablaze by the serpent\'s lair'],
      },
      items: { eshka: ['plaku', 'lit and burning, strapped to the two donkeys'] },
    },
    {
      id: 'trick', title: 'The meal that was fire',
      note: 'The serpent comes for the man who lit the fire and swallows the burning donkeys in his place — and burns from within, crying out to the sea and the river for water they cannot bring in time.',
      lines: [
        ['1.7', 'When the serpent came to eat the man who had lit the fire, fate turned aside its hunger — it swallowed the donkeys instead.', 'Kur vajti gjarpëri për të ngrënë personin që ndezi eshkën, fati ndodhi që hëngri gomarët.'],
        ['1.8', 'Then the fire caught inside it, and in its agony it cried out: "Come out, mother sea — come out, sister Bistrica!"', 'Pastaj gjarpëri u ndez për ujë dhe në këtë moment tha: Dil mama det, dil motër Bistricë.'],
      ],
      cast: {
        gjarpri: ['sopot', 'swallows the burning donkeys meant for the old man, catches fire within, and cries out to the sea and the river'],
        plaku: ['sopot', 'escapes the ambush he laid, unharmed'],
      },
      items: { eshka: ['gjarpri', 'burning inside the serpent\'s belly'] },
    },
    {
      id: 'spring', title: 'The eye that still weeps',
      note: 'Burning, the serpent drags itself toward where the Blue Eye now stands and dies there as its own eye breaks open into a spring that has never stopped running since. Any wanderer who follows the dry riverbed down can still kneel at that very spot and drink.',
      lines: [
        ['1.9', 'From there it made straight for where the Blue Eye is now.', 'Më pas u nis drejt Syrit të Kaltër.'],
        ['1.10', 'The instant it arrived, the Blue Eye — its own falling eye — broke open there, and the serpent died as the water came bursting out.', 'Sa arriti atje doli Syri i Kaltër dhe gjarpëri ngordhi pasi shpërtheu uji.'],
      ],
      cast: {
        gjarpri: ['spring', '☠ dies where it falls; its eye breaks open into the spring'],
        plaku: ['sopot', 'goes home — the serpent is done, and the water is running again'],
      },
      items: { eshka: ['spring', 'spent — burned to nothing inside the dead serpent, under the new water'] },
      exit: ['gjarpri'],
    },
  ],
}
