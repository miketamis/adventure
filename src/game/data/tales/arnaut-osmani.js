// ===========================================================================
// TALE: Arnaut Osmani — see ../tales/_SCHEMA.md for the format contract. This
// file is owned by its tale: agents editing other tales must not touch it.
//
// A KRESHNIK SONG, not a prose tale — song no. 13 of the Kângë Kreshnikësh
// cycle (Palaj–Kurti, Visaret e Kombit II). English and Albanian would run
// close to line-for-line in the bilingual edition, so "paragraphs" here are
// 13 narrative strophes chosen by content (the source page itself runs the
// 190 lines as one continuous block, no stanza breaks marked), and a
// "sentence" is a punctuation-bounded verse unit of 1–7 lines, matching the
// game's other kreshnik songs (mujo-strength, gjergj-elez-alia). Jutbina is
// already the game's own kreshnik hub (src/game/content.js) — these beats
// bookend there and propose a new "Krajl's dungeon" branch off it for
// everything in between; see the `burgu` place below for why the game's
// EXISTING Krajl-tower nodes (halil1/halilFund, rusha1, kulle1/kulle2) are
// each the wrong mold for this particular captivity. The song's first beat
// stages the band at the mountain pastures (`bjeshka`/mali1) — one more
// momentary crossing of that shared "wanderers' flank" — before the second
// beat drags them off to the dungeon; that first beat's own board is the
// only place bjeshka is ever actually stood on.
// ===========================================================================

export default {
  id: 'arnaut-osmani',
  title: 'Arnaut Osmani',
  source:
    'Recorded in Shala (District of Shkodra); Visaret e Kombit II, ed. B. Palaj & D. Kurti (Tirana 1937), pp. 130–135, repr. Folklor shqiptar II, Epika legjendare (Cikli i kreshnikëve) I, ed. Q. Haxhihasani (Tirana 1966), pp. 161–165 · read in R. Elsie & J. Mathie-Heck\'s translation (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Shala, District of Shkodra',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare (Cikli i kreshnikëve) I, 1966',
  },
  // THE ALBANIAN ORIGINAL — the live site's HTTPS is broken, but the PDF is
  // still reachable over plain HTTP (the Wayback Machine never crawled this
  // one file, unlike its neighbours in the same cycle — but the recipe that
  // works for every other kreshnik song here works for this one too):
  // curl -sL -m 25 -o v13.pdf "http://www.albanianliterature.net/oralverse/verse_09_AL/verse_09_AL_13.pdf"
  // then pdftotext. 190 verse lines recovered, matching the citation below
  // line for line (Recorded in Shala; Visaret e Kombit II, pp. 130–135).
  albanian: {
    title: '«Arnaut Osmani»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 130–135, in the embedded Albanian PDF Elsie & Mathie-Heck published beside their translation — fetched directly over plain HTTP (the live site\'s HTTPS is broken; plain http:// still serves the file; the Wayback Machine itself never captured this one PDF); the edition\'s Gheg orthography kept verbatim (already modern-alphabet; no transliteration needed); the source PDF\'s curly elision-apostrophes normalized to straight \' to match this project\'s other Palaj–Kurti transcriptions',
    local: 'docs/references/palaj-kurti-arnaut-osmani.sq.txt',
  },
  discrepancies: [
    'THE GUARD\'S TITLE (¶12.1): AL «Ma ka thirrë balozin me shpatë» names the guard a balloz — the same word this game\'s wider mythology uses for the sea-giant Balozi i Detit — and Elsie\'s own English keeps the loanword too ("He called a baloz with a sabre," "Slew the baloz like a madman"). It is these beats themselves, not Elsie, that simplify him down to a plain "guard" (see the roja NPC entry for why this balloz is not that one).',
    'THE COUNT OF THE FREED (¶13.2): AL «Dymbdhetë agët trimi i pshtoi!» reads literally "the hero freed the twelve Agas," reusing the same formulaic number as the raid\'s opening capture (¶1.4) — and Elsie\'s own English likewise says "the dozen Agas," folding Osmani into his own count. Beats instead credit him with freeing his eleven companions, since a man cannot free himself; neither the Albanian nor Elsie spells this out; it\'s implied, not contradicted.',
    'THE KING\'S OTHER TITLE (¶2.3): AL «Kqyr ça tha Krajle Kapitani!» calls him "Krajl Kapitani" ("Captain King") this one time only — and Elsie\'s own translation keeps the title too ("Hear how the Captain King did answer"). These beats fold it back into the plain "the king" used everywhere else in the song, since it surfaces just this once and never recurs.',
  ],
  // 13 narrative strophes (authored divisions — the source page has no stanza
  // breaks); sentence counts per strophe. 190 verse lines total, 60 sentences.
  paragraphs: [5, 7, 3, 6, 5, 4, 4, 3, 3, 6, 5, 4, 5],
  cast: [
    { id: 'osmani', name: 'Arnaut Osmani', note: 'the Aga who confesses to everything, then plays dead to win his companions\' freedom', npc: 'arnautOsmani' },
    { id: 'halili', name: 'Sokol Halili', note: 'Mujo\'s brother — one of the twelve taken in the same raid, freed in his own turn', npc: 'sokolHalili' },
    { id: 'agat', name: 'the ten Agas', note: 'the rest of the raiding company, chained beside Osmani and Halili throughout', npc: 'agatOsmanit' },
    { id: 'king', name: 'the Krajl', note: 'the foreign king whose palace was burned; tests the "corpse" three ways before he\'ll believe it', npc: 'krajliOsmanit' },
    { id: 'daughter', name: 'the king\'s daughter', note: 'Osmani\'s old sweetheart; finds him, hides his smile, then talks her father into freeing him', npc: 'vajzaKrajliOsmanit' },
    { id: 'roja', name: 'the guard with the sabre', note: 'posted over the body at the last moment; the first man Osmani kills once free', npc: 'rojaKrajliOsmanit' },
    { id: 'maidens', name: 'the thirty maidens', note: 'dance the last test around the body; carried home as brides once Osmani wins free', npc: 'vajzatTridhjeteOsmanit' },
  ],
  // anchor = the game location this tale place inhabits — REUSE over
  // invention, under THE SHARING RULE. This is a NORTHERN (Gheg) frontier
  // song of Jutbina's own kreshnik cycle: mirrors are Jutbina and the high
  // pastures above it, and a NEW dungeon-tower for the enemy Krajl (see below
  // for why the game's three EXISTING Krajl/tower nodes are each the wrong
  // mold to reuse here).
  places: [
    { id: 'jutbina', emoji: '🏘️', name: 'the Plain of Jutbina', note: 'the frontier hamlet — where the raid sets out from, and where the freed company rides home',
      anchor: { status: 'existing', node: 'jutbina', mirror: 'Jutbina, the kreshnik hub the game already names "where the lahutë sings the Songs of the Kreshnikë"',
        mold: 'the hub already gathers Mujo\'s strength-origin, the Tanusha raid, Zuku\'s two songs and a mejdan under one roof — "the scattered highland epic is gathered" here, exactly the role this song\'s bookends play too',
        sharedWith: ['mujo-strength', 'the already-built halil1/rusha1/zuku1/mejdan1 side-quests (siblings at the same hub, not shared scenes)'] } },
    { id: 'bjeshka', emoji: '⛰️', name: 'the mountain pastures', note: 'the high ground above Jutbina where Osmani\'s band mustered before the ambush that took them',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank',
        mold: 'a bare, empty flank where wanderers cross paths — nobody owns the open mountainside (three-friends\' own words for this spot, already reused once for mujo-strength\'s "muji-halili" scene); the tale\'s own first beat stages Osmani\'s band standing here a moment before the Slav raiders fall on them and drag them off to the dungeon',
        sharedWith: ['three-friends (reserved this spot for "muji-halili")', 'mujo-strength', 'sari-salltek'] } },
    { id: 'burgu', emoji: '⛓️', name: 'the Krajl\'s dungeon-tower', note: 'nine years, then six more: the cell, the false death, the three ordeals, the dance, and the blade',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'a foreign castle across the frontier, wherever the raid carried the twelve',
        mold: 'a NEW Krajl and a NEW tower, proposed as a fourth branch off the Jutbina hub (alongside halil1/rusha1/zuku1) — this Krajl holds a dozen Agas together and is undone from the inside by one prisoner\'s trick, not the lone-captive-freed-from-outside pattern the hub already tells',
        conflicts: 'NOT halil1/halilFund (that tower holds Muji ALONE and is broken from outside by Halili riding in — here Halili himself is one of the twelve INSIDE, freed by Osmani\'s trick; sharing the node would contradict both stories\' captives and their means of freedom). NOT rusha1 (a different Krajl\'s tower where his daughter Rusha lives free and serves coffee — no dungeon, no captives, no torture there). NOT kulle1/kulle2 (the blood-feud kulla in the village-life quarter, an unrelated Kanun custom-vignette, not a kreshnik song at all).',
        proposal: 'draw a new option off jutbina ("shko te burgu i krajlit" or similar) leading to this dungeon-tower: a cell for the two sentences and the false death, then a courtyard for the body-tests, the dance of thirty maidens, and the blade' } },
    { id: 'raidedPalace', emoji: '🔥', name: 'the Krajl\'s burnt palace', note: 'palace, kulla and forest — burned before the song\'s first line',
      anchor: { status: 'offstage', mirror: 'the Krajl\'s own seat, somewhere across the frontier, before this song opens',
        mold: 'never staged — the raid itself precedes the song entirely; it exists only as Osmani\'s own boast in the dungeon, never played' } },
  ],
  items: [
    { id: 'prangat', emoji: '⛓️', name: 'the Agas\' shackles', note: 'clapped on all twelve at the capture, doubled down on after the confession, struck off only when Osmani springs up whole' },
    { id: 'shpata', emoji: '🗡️', name: 'the guard\'s sabre', note: 'held bare over what may or may not be a corpse — torn out of the air, it wins their freedom' },
  ],
  // EMBODIED projection — a compact staged arc off the Jutbina hub: you ARE
  // Arnaut Osmani in the Krajl's dungeon, at the choice that decides whether the
  // whole company walks free. become:'arnaut-osmani' on the jutbina "rri me
  // osmani" threshold; the entry node osmaniBurg holds the cell, the confession,
  // and the choice, and flows only to the two endings (mold-lock safe).
  play: {
    entry: 'confession',
    stance: 'embodied',
    as: 'osmani',
    role: 'You are Arnaut Osmani, youngest of twelve Agas rotted nine years in irons in a foreign Krajl\'s dungeon, your companions chained beside you. The Krajl demands to know who burned his palace. Take every crime on yourself alone to spare the rest — then trick your way free: play dead, endure the corpse-tests without a flicker, spring up when the shackles come off, and cut the whole company loose. Or lose your nerve and try to flee alone, and be run down and thrown back for years more.',
    enter:
      'nine years in a foreign Krajl\'s dungeon, your companions in irons beside you, when the Krajl comes down demanding to know who wronged him',
    from: 'osmaniBurg',
    ending: 'osmaniLiri',
    scenes: {
      osmaniBurg: 'confession',
      osmaniLiri: 'homecoming',
      osmaniRob: 'secondSentence',
    },
    divergences: [
      { beat: 'confession', note: 'The song\'s hinge — Osmani owning every crime alone to spare his companions, then earning six more years for the boast — becomes the player\'s own choice at osmaniBurg: take the blame and trick the Krajl (mashtro), or flee alone (ik). The whole cell, the nine years in irons, and the taunt-and-sentence exchange are compressed onto this one entry board.' },
      { beat: 'homecoming', note: 'The good ending osmaniLiri folds the long middle of the song — the feigned death, the serpents-fire-and-nails ordeals, the dance of thirty maidens, and the sabre torn out of the air — into its outcome: the trick lands, the irons fall, and you lead the freed company home to Jutbina. The player chooses to take the blame; surviving the corpse-test is implied by the trick succeeding rather than played ordeal by ordeal.' },
      { beat: 'secondSentence', note: 'Built from scratch — a divergence the song never takes: flee alone and the Krajl runs you down (kap) and throws you back for more years, your companions still chained. Canonical Osmani frees all eleven by owning the crimes and playing dead; this bad ending osmaniRob is the road the clever prisoner refuses.' },
    ],
  },
  beats: [
    {
      id: 'muster', title: 'A band rides up to the high pastures',
      note: 'Osmani gathers eleven companions and leads them up into the mountain pastures above Jutbina — free ground, for the little while that lasts.',
      lines: [
        ['1.1', 'Grant us your blessing, Almighty God, before the telling starts.', "Lum për ty, o i lumi zot!"],
        ['1.2', 'Word came of what befell Arnaut Osmani.', "Ça ka ba Arnaut Osmani?"],
        ['1.3', 'Twelve strong, Osmani\'s band made the climb up onto the mountain pastures above Jutbina,', "Dymbdhetë shokë i ka bashkue, / N'bjeshkë të nalta trimi ka dalë,"],
      ],
      cast: {
        osmani: ['bjeshka', 'leads his band up onto the high pastures'],
        halili: ['bjeshka', 'rides up with the band'],
        agat: ['bjeshka', 'the other ten Agas, riding up together'],
        king: ['burgu', 'holds his own distant tower; this band hasn\'t crossed him yet'],
        daughter: ['burgu', 'grown up in her father\'s tower; not yet met'],
        roja: ['burgu', 'keeps the king\'s tower; not yet met'],
        maidens: ['burgu', 'maidens of the king\'s own household; not yet met'],
      },
    },
    {
      id: 'raid', title: 'Twelve Agas taken',
      note: 'Slav raiders fall on the whole band and drag them off in chains for nine years, and the king demands to know who burned down his palace.',
      lines: [
        ['1.4', 'where the Slav raiders fell on his twelve Agas, clapped irons on their feet, and left them to rot in prison nine years.', "Dymbdhetë agët shkjetë ja kanë xanë, / Jau kanë shti burgagijtë n'kambë, / N'burg nandë vjet i paskan lanë."],
        ['1.5', 'The king finally turned on them and demanded to know which of them had burned down his palace.', "Shka ka qitë krajli e i ki' pvetë: / - I cili jush sarajet m'i dojtë?"],
      ],
      cast: {
        osmani: ['burgu', 'seized on the mountain pastures with his band; nine years in irons, now faced with the king\'s question'],
        halili: ['burgu', 'seized alongside Osmani; chained the same nine years'],
        agat: ['burgu', 'the other ten Agas, chained beside them'],
        king: ['burgu', 'holds the twelve and demands to know who burned his palace'],
      },
      items: { prangat: ['osmani', 'clapped round every Aga\'s feet the day of the capture'] },
    },
    {
      id: 'confession', title: 'Halili denies it; Osman owns it all',
      note: 'Sokol Halili swears he had no part in the raid; young Osman Aga steps forward and claims every crime himself — the burnt palace, the ruined tower, the felled forest — and, pressed further, a still darker deed against the king\'s own parents.',
      lines: [
        ['2.1', 'Halili was the first to speak up, swearing he\'d had no hand at all in that raiding party.', "Atherë foli Sokole Halili: / - Un n'at çetë, krajl, vetë s'jo' kenë."],
        ['2.2', 'Next Osman Aga, the youngest of them, stepped up and begged the king, in God\'s own name, to spare the rest of the company — the palace burned, the kulla brought down, the forest felled, all of it was his doing alone.', "Qysh ka folë ai Osman Aga i ri? / - Pash nji zot, krajl, qi t'ka dhanë, / Kurrkand n'qafë ti mos me marrë, / Vetë sarajet t'i kam djegë, / Vetë un kullat t'i kam shembë / Edhe landët un t'i kam pre."],
        ['2.3', 'The king pressed him further: fine, you burned my palace — but what of my herds, what of my goods?', "Kqyr ça tha Krajle Kapitani! / - Mirë se kullat ti m'i dogje, / Gjanë e mallin ku ma çove?"],
        ['2.4', 'I drove it all off to Jutbina, king, Osman answered.', "- Tanë n'Jutbinë, krajl, ta kam çue."],
        ['2.5', 'So you plundered my goods too, said the king — and what became of my father, my mother?', "- Mirë se mallin ti ma more, / Babë e nanë ti ç'm'i bane?"],
        ['2.6', 'Osman answered that he marched the pair to Jutbina as well, put out a public call for someone to ransom them, and when no coin ever came, he was left without a plan.', "- Tha, n'Jutbinë të dy i kam çue, / N'dorë t'tallallit i kam qitë, / Kurr 'i grosh s'kam mujtë me i shitë; / Çajren vedit për ta s'dijta,"],
        ['2.7', 'So I smeared them with tar and feathers and burned them where they stood — such are the customs of war.', "N'zyft e n'pezhkve, krajl, t'i ljeva, / Nuri krajl, un të dy i dogja, / Si zanat qi lufta e ka pasë."],
      ],
      cast: {
        osmani: ['burgu', 'names himself alone for it all: the palace, the kulla, the forest, the herds — and a savage revenge on the king\'s own parents when no ransom came'],
        halili: ['burgu', 'denies any part in the raid'],
        agat: ['burgu', 'stand chained, saying nothing while Osmani takes the blame'],
        king: ['burgu', 'presses him question after question for the truth'],
      },
    },
    {
      id: 'secondSentence', title: 'A second sentence',
      note: 'The king answers the boast with fresh chains: six more years in the dark, never to see daylight again.',
      lines: [
        ['3.1', 'The king\'s answer came at once.', "Ç'kish qitë krajli e kish thanë?"],
        ['3.2', 'Let this be the honor I pay you, Agas — back into prison with you, where the sun will never find you again.', "- Shum hejdi, agaj, due me u ba, / Thellë në burg un due me u shti, / Dritë as diell mos t'shofë me sy."],
        ['3.3', 'Once more their feet were bound in irons, though this term was set at only six years.', "Jau ka shti burgagijtë n'kambë, / Sall gjashtë vjet tek kenkan ba"],
      ],
      cast: {
        king: ['burgu', 'answers the boast with six more years in chains'],
        osmani: ['burgu', 'shackled again for six more years'],
        halili: ['burgu', 'shackled again beside him'],
        agat: ['burgu', 'shackled again with the rest'],
      },
    },
    {
      id: 'plan', title: 'The plan: play dead',
      note: 'Twelve days into the new sentence Osmani despairs aloud that age and weakness have caught up with them — his companions insist otherwise, though even they have no scheme to offer. Osmani swears he would not flinch in seven blazing ovens, and lays out his plan: feign death tonight, and wail loud enough at midnight and at dawn for the king himself to hear.',
      lines: [
        ['4.1', 'By the twelfth night, the silence broke — it was Osmani who turned to the men around him and finally spoke.', "Edhe mbushen dymbdhetë ditë e net, / Flet Osmani me shokë të vet:"],
        ['4.2', 'God help us, my brothers — our time is running out, our strength is failing, we are growing old and hollowed by dread; which of you has the wit to get us out of this black hole?', "- I madhi zot, shokë, u vraftë, / Mot tuj shkue e forca tuj u lshue, / Tuj u plakë e mendja tue u lanë, / Tuj u plakë e mnera tue u hi, / Si s'ma msuet mue nji kopili, / Si të dalim prej ktij burgut të zi."],
        ['4.3', 'The men answered him steadily: our time is not spent, our strength is not gone, we are not old, we are not afraid — only not one of us can think up a trick, and if the king turns on us now, it means a rope round every neck.', "Sa mirë shokët Osmanit i kanë thanë! / - Se shko moti, forca s'na ka lshue, / Se jem' plakë, mendja s'na ka lanë, / Se jem' plakë, mnera s'na ka hi, / Por s'po ka kush nesh ban ndoi kopili; / Provë të mdha krajli ka me ba, / N'qafë vedin kanë me e marrë."],
        ['4.4', 'Arnaut Osmani swore by God: shove me into seven blazing ovens and I would not so much as blink — and do you know what I mean to do, my brothers?', "Be n'zotin Arnauti ka ba: / - N'shtatë furra t'kuquna me m'shti, / Qërpiku i synit nji herë s'ka me m'u dridhë, / Por a di shka, more shokët e mij,"],
        ['4.5', 'Tonight I\'ll lie still and feign death, as if it had already taken me — God willing, they\'ll lower me into the earth while I\'m still breathing.', "Po provoj sonte m'u shtirë, / Kesh se deka mue m'ka ardhë, / Se ishalla n'dhe mue gjallë po m'shtinë;"],
        ['4.6', 'When midnight comes, scream and raise an uproar; when the morning light comes, howl and wail in grief, loud enough that the king hears it in his own palace.', "Sa t'vijë koha për mjesnatë, / Merrni brimën tuj piskatë; / Kur t'vijë koha nëpër dritë, / Merrni brimën tue bërtitë, / Nisni brimë e nisni gjamë, / Qi me e ndie krajli n'saraj."],
      ],
      cast: {
        osmani: ['burgu', 'swears he would not flinch in seven blazing ovens, then lays out the plan: feign death tonight, and wail for the king to hear'],
        halili: ['burgu', 'answers with the others: no trick to offer, but no despair either'],
        agat: ['burgu', 'answer with Halili: no trick to offer, but no despair either'],
      },
    },
    {
      id: 'fakeDeath', title: 'The false death, and the true wailing',
      note: 'Osmani lies down as if dead, arms crossed on his chest, and his companions keen over him in one long line until, after the third round of lament, the king wakes and questions them — running through every homesick complaint a prisoner might have.',
      lines: [
        ['5.1', 'Osmani stretched himself out and crossed his arms on his chest, and all his companions gathered close.', "Kambët Arnauti m'i ka shtri, / M'i ka mbledhë ai duerët mbi parzëm, / M'u kanë mbledhë shokët për rreth tij,"],
        ['5.2', 'Standing in a single line, they screamed and keened together, crying out in grief: pity us now, for our brother is gone.', "Po rreshtohen tanë për 'i rresht, / Kanë marrë brimë edhe piskamë, / Kanë nisë gjamën tuj gjamue: / - Mjeri u për ty, vllau i em o vlla!"],
        ['5.3', 'Not until the third round of wailing did the king stir in his chamber and wake to question them.', "Kur kanë lshue gjamën e tretë, / I ndien krajli n'odë të vet, / I ndien krajli e po pëvetë:"],
        ['5.4', 'So what troubles you, wretched prisoners, he wanted to know — is homesickness gnawing at you, do you ache for the people you left behind, is it your mother and father you long for, a sister, a brother,', "- Ç'kini ju, more rob të tretun? / A ju ka ra malli i shpisë, / A ju ka ra malli i robnisë, / A u ra n'mend për babë e nanë, / A u ra n'mend për motër e vlla,"],
        ['5.5', 'do you miss the feast of Saint George, does your shaggy beard trouble you, or the mud you stand knee-deep in, or a shirt with no clean one to wear, or is it only daylight you miss?', "A u ra n'mend për shnjërgja t'bardhë, / A jau ka mërzitë balta deri n'gju, / A jau ka merzitë mjekrra për pa u rrue, / A jau kanë mërzitë kmishat për pa u ndrrue, / A jau ka merzitë drita për pa dalë?"],
      ],
      cast: {
        osmani: ['burgu', 'lies still as a corpse, arms crossed on his chest'],
        halili: ['burgu', 'keens in the mourning line with the others'],
        agat: ['burgu', 'wail together in one long line until the king wakes to question them'],
        king: ['burgu', 'wakes and runs through every homesick complaint a prisoner might have'],
      },
    },
    {
      id: 'oneOfUs', title: 'One of us has died',
      note: 'None of that, the Agas answer — one of their own has died, and there is no one to bury him. Unconvinced, the king sends his own daughter down with the keys to see for himself.',
      lines: [
        ['6.1', 'The captive Agas gave their answer.', "Ça kanë thanë agët e ngujuem?"],
        ['6.2', 'None of that troubles us, king — one of our own has died, and who will dig him a grave? He is rotting there in the cell.', "- Asnji asosh, krajl, nuk asht, / Por nji shoq ne na ka dekë / E s'po dijmë ku me e shti n'dhe, / Se hapsanen po na e qelbson."],
        ['6.3', 'The king did not take their word for it. He called for his daughter instead, put the dungeon keys in her hand, and told her quietly:', "Besë s'e xen krajli, se ka dekë, / Por ma thrret çikën e vet, / Çilcat n'dorë çikës ja ka dhanë / Edhe t'vogël te i ka thanë:"],
        ['6.4', 'go down into that grim dungeon and see for yourself what has happened.', "- Ulu 'i herë te ai burg i zi / Edhe kqyr se ça ka ndodhë!"],
      ],
      cast: {
        halili: ['burgu', 'answers with the others that one of their own has died'],
        agat: ['burgu', 'answer the king: one of their own has died, and no one to bury him'],
        king: ['burgu', 'unconvinced, sends his own daughter down with the dungeon keys'],
        daughter: ['burgu', 'takes the keys from her father, sent to see for herself'],
      },
    },
    {
      id: 'daughterFinds', title: 'Her old sweetheart, dead',
      note: 'The daughter unlocks the cell and finds the corpse — Arnaut Osmani, once her own beloved. She returns to her father and begs to bury him, offering her obedience in exchange.',
      lines: [
        ['7.1', 'Keys in hand, she went down to the cell, worked the lock twice to spring it, and pushed the door open into the dark.', "Ka marrë çilcat çika, n'derë ka shkue, / Dy herë çilc edhe e ka zhdry. / Kur ka nisë n'at burg me hi,"],
        ['7.2', 'There lay Arnaut Osmani — the very boy who had once been her sweetheart.', "Arnautin ma shef shtri; / Bash jaran ma kish pasë at djalë,"],
        ['7.3', 'She went back up to her father and spoke.', "Para krajlit çika ka dalë, / Ka qitë krajlit e i ka thanë:"],
        ['7.4', 'It isn\'t any of the Agas at fault, father — it\'s Arnaut Osmani who is gone, young Osman Aga lies dead. Grant me leave to bury him, and you\'ll have my obedience in whatever you ask of me.', "- Kurrnja asqil ndër agaj nuk janë, / Vig ma kin trimin Osman, / Vig ma kin Osman Agën e ri, / A ma fal qi n'dhe ta shti, / Se n'ma dhaç n'dhe me e mblue, / Si t'më thuejsh kam me t'ndigjue."],
      ],
      cast: {
        daughter: ['burgu', 'unlocks the cell and finds her own former sweetheart dead — and begs her father to let her bury him'],
        osmani: ['burgu', 'lies motionless before the one person who once loved him'],
        king: ['burgu', 'hears his daughter\'s plea and still doesn\'t believe it'],
      },
    },
    {
      id: 'bodyBrought', title: 'The king puts the body to the test',
      note: 'Still unconvinced, the king sends a hundred soldiers down; the ten best carry the body up before him — and, ever cunning, he sets about testing whether the death is real.',
      lines: [
        ['8.1', 'But the king would not believe even her, and sent a hundred soldiers to the jail; the ten best of them went down into the dungeon,', "Aspak besë krajli s'e ka xanë, / Njiqind vetë n'derë t'burgut i ka çue, / Dhetë ma t'fortit mbrendë n'burg i ka shti."],
        ['8.2', 'found Arnaut Osmani\'s body, and carried it up before the king,', "Krejt i dekun Arnauti ishte gja, / Jashtë e qitën, krajli ma ka pa."],
        ['8.3', 'who, being a cunning man, set about testing whether the corpse was truly dead.', "Por sa kopil krajli ishte kanë, / Ka nisë provë e provë po ban:"],
      ],
      cast: {
        king: ['burgu', 'sends a hundred soldiers down; the body is carried up before him for testing'],
        osmani: ['burgu', 'carried up before the king, still playing dead'],
      },
    },
    {
      id: 'ordeals', title: 'Serpents, fire, and nails',
      note: 'Three ordeals in turn — venomous serpents at his throat, two bonfires that split his skin front and back, twenty nails driven through fingers and toes until the blood runs out — and through every one, Osmani gives no sign of life.',
      lines: [
        ['9.1', 'He gathered nine serpents warmed in the sun and coiled them round the hero\'s neck; badly bitten as he was, he never once let on that he lived.', "I ka mbledhë nandë gjarpij shullanit, / N'gjyks gjarpijt trimit ja ka vu, / Se sa fort gjarpnat e kanë qokatë, / Se sa gjallë ish kanë, për t'gjallë s'â ndie."],
        ['9.2', 'He built two great bonfires and set Osmani between them until the skin split on his back and his chest; still he gave no sign of life.', "I ka ndezë dy zjarma t'mdhaj / E ndërmjet Osmanin ma shtjen, / Para e mbrapa lkura m'i pelset, / Gjallë ish kanë, për t'gjallë s'â ndie."],
        ['9.3', 'Not satisfied even then, the king gathered twenty sharp nails and drove them into fingers and toes until the blood was all but gone from him — and still Osmani showed nothing.', "Aspak besë krajli s'ki' xanë. / M'i ka marrë njizet maje gozhdash, / Për nën thoj fell ja ka shti, / Der qi gjaku m'i ka dalë, / Gjallë ish kanë, për t'gjallë s'â ndie."],
      ],
      cast: {
        king: ['burgu', 'puts the body through serpents, fire, and the nail'],
        osmani: ['burgu', 'endures serpents at his throat, two bonfires that split his skin, and twenty nails through fingers and toes without a flicker'],
      },
    },
    {
      id: 'dance', title: 'Thirty maidens dance around the body',
      note: 'Suspicious to the last, the king orders one more test: thirty maidens dressed in their finest dance and sing around the corpse. At his head, the king\'s daughter catches him stealing a glance and the ghost of a smile — she hides his face at once, but the other maidens have already seen it, and she must talk them down.',
      lines: [
        ['10.1', 'Still the king would not believe it, and, suspicious as ever, demanded one last trial.', "As hiç krajli besë s'kish xanë, / Se i pabesë fort ish kanë! / Po don krajli edhe 'i provë me e ba:"],
        ['10.2', 'Thirty of the loveliest maidens were chosen, fitted out in fine garments and shoes, and stationed at the head of the body, where they danced, sang, and made merry all around him.', "M'i ka zgjedhë tridhetë çika t'mira, / Mirë po i veshë e mirë po i mbathë. / Te kryet t'deknit ja ka çue, / Për rreth t'deknit bashkë po kcejnë, / Për rreth t'deknit po lodrojnë, / Për rreth t'deknit mirë po kndojnë."],
        ['10.3', 'The king\'s daughter stood at his head, and Osmani, watching her closely, let one eye slide toward her — the faintest smile crossed his lips, one side of his mustache twitching.', "Çika e krajlit tu kryet i ka qillue, / Mirë Osmani e ka hetue, / Me njen' sy ma ka shikjue, / Buzën gaz m'iu ka ba. / Mirë po i qeshë njana anë mustakut."],
        ['10.4', 'She alone caught it, and at once threw the shroud back over his face.', "Çika e krajlit asht kujtue, / Përmbi ftyrë rubën ka lshue."],
        ['10.5', 'But the other maidens had seen too, and cried out: by the Lord who made us, this lad — Osman Aga — has smiled!', "Ç'kanë qitë shoqet e i kanë thanë? / - Pasha at zot qi na ka dhanë, / Njetash qeshi Osman Aga i ri."],
        ['10.6', 'Curse you, girls, the daughter snapped back — he is already dead, his sins forgiven, his soul long fled his body.', "- Zoti u vraftë, çika, u ka thanë, / Se ky djalë 'i herë ka dekë, / Krejt gjynahet zoti ja ka falë, / Shpirti n'gaz, shoqe, i ka dalë."],
      ],
      cast: {
        king: ['burgu', 'orders one last test: thirty maidens dancing round the body'],
        maidens: ['burgu', 'dance and sing around the corpse in their finest clothes'],
        daughter: ['burgu', 'catches Osmani\'s stolen glance and hidden smile, covers his face, and talks the other maidens down'],
        osmani: ['burgu', 'lets one eye slide toward her and can\'t quite hold back a smile'],
      },
    },
    {
      id: 'plea', title: 'Fear a dead man\'s curse',
      note: 'She turns on her father: further torment of a corpse three days unburied is a sin on his own head; let the shackles come off at last. Even so, he still will not quite believe her.',
      lines: [
        ['11.1', 'Then she turned and spoke to her father.', "Ça i ka thanë çika babës s'vet?"],
        ['11.2', 'By the God who made you, father, you will bring sin on yourself if you go on torturing this body with trial after trial —', "- Pash at zot, krajl, qi t'ka dhanë. / Po gjynah ty si s'asht tue t'ardhë, / Për t'dekun njerin me e mundue / E gjithëfarë provësh n'te me i provue."],
        ['11.3', 'he has died, he has already passed, can you not smell the corpse turning? Three days he has lain there unburied — does a dead man hold no fear for you at all?', "Paj ka dekë e ka mbarue, / Era e keqe ktij â tuj ardhë, / Se tash tri dit ka ndejë mbi tokë, / A thue t'deknit, krajl, po i tutesh?"],
        ['11.4', 'Strike the bonds from his feet, take the shackles off his hands!', "Hiqja prangat prej kambet / Edhe duerët me ja shpengue!"],
        ['11.5', 'Even then, the king was still not fully persuaded.', "As hiç krajli s'ka besue,"],
      ],
      cast: {
        daughter: ['burgu', 'warns her father that tormenting a corpse three days unburied is a sin on his own head, and begs the shackles off'],
        king: ['burgu', 'still not quite convinced, even by his own daughter'],
      },
    },
    {
      id: 'blade', title: 'The sabre in the air',
      note: 'A guard is set over the body with a drawn sabre while the shackles come off; the instant they do, Osmani springs up, wrenches the blade from the guard\'s hand, cuts him down, and — taken for a dead man risen — cuts down everyone in reach before anyone can gather their wits.',
      lines: [
        ['12.1', 'The king posted a guard over him with a bared sabre and, under that blade, had the shackles struck away.', "Ma ka thirrë balozin me shpatë, / Ndër sy t'tij Osmanin e ka lirue,"],
        ['12.2', 'The irons came off his feet, the bonds off his hands, the sabre held ready above his head — and Osmani watched it all closely.', "Ja ka hjekë bylegitë prej kambësh, / Ja ka hjekë prangat prej duerësh, / Përmbi kryet shpatën ja ka lshue! / Sa mirë Osmani shpatën e ka hetue,"],
        ['12.3', 'The moment he was free he leapt up, tore the sabre out of the air, and cut the guard down like a man possessed,', "Fluturim në kambë asht çue, / Shpatën n'dorë ai po ma merr, / Si i tërbuem balozin e pret."],
        ['12.4', 'and no one dared stand against him — they thought a dead man had risen, and terror froze them where they stood while he cut down every last one.', "Kurrkuj n'mend s'po i bjen me qindrue, / Gjithë kujtojnë se i dekni u ngjall, / Mnerë e madhe t'gjithve u ka hi. / Të tanë dekun i ka ba,"],
      ],
      cast: {
        king: ['burgu', 'posts a guard with a drawn sabre and has the shackles struck off'],
        roja: ['burgu', '☠ cut down instantly, the first to fall to the seized blade'],
        osmani: ['burgu', 'springs up the instant he\'s free, tears the sabre away, and cuts down everyone within reach'],
      },
      items: { prangat: ['burgu', 'struck off Osmani\'s hands and feet at last'], shpata: ['osmani', 'torn from the guard\'s hand and turned on the whole household'] },
      exit: ['roja'],
    },
    {
      id: 'homecoming', title: 'Home to Jutbina',
      note: 'Osmani maims the king himself, burns the palace to the ground, frees his eleven companions, and carries off the thirty maidens along with the daughter who saved him — thirty new brides for Jutbina\'s young men, and a bride of his own. Nine days of feasting close the song, with the singer\'s own disclaimer that he has this only at second hand.',
      lines: [
        ['13.1', 'He put out one of the king\'s eyes, hacked off an arm, and razed the palace to the ground.', "Synin krajlit ja verboi, / Krahin krajlit ja shkurtoi, / Rrash me tokë kullat i rrenoi,"],
        ['13.2', 'He freed his eleven fellow Agas and gathered up all thirty maidens,', "Dymbdhetë agët trimi i pshtoi! / Tridhetë çikat po i bashkon,"],
        ['13.3', 'and led the whole company home to Jutbina, where the maidens became wives for thirty of its young men, and he himself kept the king\'s daughter.', "N'at Jutbinë t'tana po i çon, / Tridhetë djelm po m'i marton, / Çikën e krajlit për vedi e ndalon,"],
        ['13.4', 'There was feasting and music both — nine days and nights the wedding lasted.', "Ban denam e ban dyzen, / Darsëm ban nandë ditë e net!"],
        ['13.5', 'I was not there myself to see it, mind — I only tell it as it was told to me; these are old, old stories, and may God\'s grace rest on us all.', "Se atje un nuk jam kenë, / Si kam ndie e si m'kanë thanë; / Se kto janë prralla prej motit, / Ndimën paçim na prej zotit!"],
      ],
      cast: {
        king: ['burgu', 'blinded in one eye, his arm cut off, his palace burned to the ground around him'],
        osmani: ['jutbina', 'leads the freed company home and weds the daughter who saved him'],
        halili: ['jutbina', 'freed at last, riding home with his brothers'],
        agat: ['jutbina', 'freed with him, riding home together'],
        daughter: ['jutbina', 'carried off as Osmani\'s own bride'],
        maidens: ['jutbina', 'brought home as brides for thirty of Jutbina\'s young men'],
      },
      items: { shpata: ['osmani', 'carried home, the blade that won their freedom'], prangat: ['jutbina', 'left behind for good — freedom\'s only proof needed'] },
    },
  ],
}
