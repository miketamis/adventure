// ===========================================================================
// TALE: Aga Ymer of Ulcinj — the returning husband — see ../tales/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it.
//
// TWO INDEPENDENT ALBANIAN TELLINGS, ONE TALE-TYPE. The FULLEST telling —
// the one this file's paragraphs/lines number and paraphrase — is Mitrush
// Kuteli's prose "Aga Ymeri of Ulqin", read in Robert Elsie's English
// translation (see `source`). The VERBATIM ALBANIAN comes from a different,
// independently collected source: a 2006 sung ballad, "Ymer Agë Ulqini",
// recorded on the same Ulcinj coast (see `albanian`). The two agree on the
// whole shape of the story — captured at war, a wife's sworn wait, a
// disguised homecoming, recognition by a bodily mark, a kept besa that rides
// back to prison and wins final freedom — but differ on several numbers and
// one whole scene; every such gap is recorded in `discrepancies` rather than
// silently smoothed over.
// ===========================================================================

export default {
  id: 'aga-ymer',
  title: 'Aga Ymer of Ulcinj — the returning husband',
  source:
    'Mitrush Kuteli (ed.), Tregime të moçme shqiptare (Tirana: Naim Frashëri, 1965, repr. 1987, 1998) · read in Robert Elsie\'s English translation, "Aga Ymeri of Ulqin"; all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Ulcinj (Ulqin), the Adriatic coast at the Montenegrin frontier',
    collector: 'Mitrush Kuteli (ed.), of the 1965 prose collection Elsie translated',
    published: 'Tirana, 1965 (repr. 1987, 1998); English translation by Robert Elsie',
  },
  // the ALBANIAN ORIGINAL: a DIFFERENT recording of the SAME tale-type (see
  // the file header above and docs/references/ymer-age-ulqini.sq.txt for the
  // full provenance note) — not Kuteli's own lost Albanian text, but a real,
  // independently collected Albanian telling of Aga Ymer, sung on the same
  // stretch of coast. Its verses are quoted verbatim wherever a beat line's
  // event has a real match in the ballad; `discrepancies` records every place
  // the two tellings disagree instead of silently forcing a match.
  albanian: {
    title: '«Ymer Agë Ulqini»',
    source:
      'sung ballad recorded in Arbnesh/Krajë (the Ulcinj coast), collector Hipi Zhdripi, 2006; sq.wikibooks.org/wiki/Ymer_Agë_Ulqini (CC-BY-SA). Lightly cleaned of scan noise only (stray hyphens joined, grave accents è/ì evened to ë/i, "Tmeri"→"Imeri" [NOT "Ymeri" — inside the sung verses the hero is "Imer(i)" almost without exception; "Ymer" survives only in the collector\'s own title line], "lmer"→"Imer", "rnreti"→"mretit"). The ballad\'s own distinctive Gheg words are kept verbatim — "agja", "erdh", "izën", "mret/mreti/mretit" (its own word for king; never "mbret"), "burk" (its own word for prison — "burg" survives only in the loanword "burgaxhi", which the ballad itself uses), "rabazan" (its own word for a captive; never "rob"), the apocopated Gheg "-ue" participle family (shkue, martue, vra, pre, qerrue, rranue, dek, hi, pa — never the Tosk shkuar/martuar/vrarë/prerë/rrënuar/dekur/hyrë/parë), the vocative "-o" — though the common Gheg article "nji" is in a couple of spots evened to its familiar Tosk twin "një" for on-screen readability. CORRECTED 2026-07-15: an earlier pass had silently re-Tosk-ified several of these apocope forms (burk→burg, vra→vrarë, pre→prerë, qerrue→çuar, rranue→rrënue) across the battles/dungeon/dream/freedom beats without disclosing it here — every beat line has now been re-checked against the ballad text saved in `local` and those forms restored to the file\'s own spelling.',
    local: 'docs/references/ymer-age-ulqini.sq.txt',
  },
  discrepancies: [
    'THE WAITING PERIOD: Kuteli/Elsie\'s prose fixes the wait at "nine years and nine days" throughout (matching the FOLKLORE card\'s own summary, which these beats follow) — the sung ballad instead negotiates down from "three days and three nights" to a final "three years" («Pa t\'nap izën për tri vjet» — ¶1.16-17\'s beat lines quote this exchange for its SHAPE, not its number). Every "nine years" in the English paraphrase corresponds to the ballad\'s "tri vjet" (three years).',
    'THE RANSOM PRICE: the prose names "nine sacks of silver"; the ballad\'s king asks «treqind qese» — three hundred purses of money. Beats follow the prose\'s number, quoting the ballad\'s pledge-and-price stanzas for the scene\'s shape.',
    'THE RECOGNITION TOKEN: the prose is specific — an old horse-bite had left its mark high up his arm, and it was his own mother who had once described that mark to the bride. The ballad is vaguer: an old woman had told the bride only that he "has a mark on his palm/wrist" («e ka nji shenjë në llânë»). Both are a bodily nishan revealed by baring the arm; the beats follow the prose\'s fuller image.',
    'THE MOTHER AT THE FOUNTAIN (¶7) HAS NO BALLAD SCENE: in the ballad, Aga Ymer meets no one at all before the wedding party — halfway home he comes straight on them at "Kroni i Bardh," the White Spring, under a pear tree, and the false-death exchange («Unë pa vij pej Spanjet t\'zezë... Aga Imeri na ka dekë») happens there, then is REPEATED almost word for word when he later speaks to the bride herself. Kuteli\'s prose instead splits that one exchange into two separate meetings — an unmet, unrecognizing mother first, then the wedding party. The beats keep the prose\'s two-meeting shape but pair the mother scene with the ballad\'s own SECOND occurrence of its repeated formula (addressed to the bride in the original) — a real reuse the ballad itself already practises, borrowed a third time here.',
    '"SPAIN" IS NOT SPAIN: Elsie\'s translation has the disguised Aga Ymer twice claim to come "from Spain," which reads oddly for a Balkan captivity — but the ballad confirms this is no mistranslation. It says the same thing: «Unë pa vij pej Spanjet t\'zezë», "I have come from Black Spain." "Spanja e zezë" is a stock formulaic far-off captor-realm in these Kreshnik songs, not the real Iberian kingdom, and the beats keep Elsie\'s literal wording for that reason.',
    'THE NEW GROOM\'S NAME: Elsie\'s prose names him "Pasha Veli" ("that son of a dog"); the ballad names him "Ali Pashë" / "Ali Beu." Both are the same role — the man the besa-bound bride is about to be married off to — under two different collected names for two independently remembered performances. The beats follow the prose\'s "Pashë Veli."',
    'THE BEHEADING THREAT (¶12) IS TOLD, NOT SHOWN, IN THE BALLAD: Kuteli\'s prose stages the king\'s fury and the death sentence as its own suspenseful scene, with the king\'s daughter pleading to wait until dark. The ballad never dramatizes this moment directly — it survives only as the companions\' retrospective line when Aga Ymer returns: «Mreti t\'bin-e e ka fal-e, se mas t\'ardhke Aga Imeri, besa t\'binë ai desht m\'i pre» ("the king had pardoned his daughter — for if Aga Imer had not come back, he meant to have her beheaded for the besa"). The beats keep the prose\'s dramatized scene, quoting that one retrospective ballad line for all of it.',
    'NINE COMPANIONS: Elsie\'s ending has the king free "Aga Ymeri AND his nine companions" in one stroke, implying they too had stayed captive the whole nine years. The ballad\'s companions are not shown as prisoners at all — «Të gjith shôkt i dolën para» ("all his companions came out to greet him") describes free men welcoming him home, not men released alongside him. The beats keep the prose\'s "nine companions," freed together at the end.',
    '"ROB" IS NOT THE BALLAD\'S WORD: Elsie\'s prose speaks simply of a "prisoner"; the ballad itself always uses its own dialect/loan word "rabazan" for that status (battles ¶2.3-4, ransom ¶4.24-25, wedding-party ¶8.2-4 — «rabazan-o e kanë marrë», «tri vjet-o rabazanë», «mirë se vjen ti, rabazan-e»), never the everyday Albanian "rob." Beat lines now quote "rabazan" exactly as printed, flagged [sic] since it reads oddly next to Elsie\'s plain "prisoner."',
    'THE NUMBER OF BATTLES (¶2): Elsie\'s prose describes a single battle in which Aga Ymer\'s horse is killed under him, he fights on wounded, and is captured, all in one clash. The ballad instead counts three separate engagements («luftë të parë... të dytë... të tretë» — the first battle, the second, the third), losing the horse in the first, taking a wound in the second, and being captured only in the third. The beats follow the ballad\'s three-battle count (title "Taken on the third field") for the scene\'s shape.',
    'THE DEPARTURE PREPARATIONS (¶1.4-5): Elsie has Aga Ymer arm himself and bid his own parents farewell before he leaves; the ballad couplet immediately after the letter\'s arrival instead pictures a farewell feast, gathering his companions, and leaving the palace "desolate" («Bani gosti e zijafet e i mblodhi shokët e vet e e la sarajin shkret») — the same leave-taking moment, different concrete detail. Beat 1.1-5 quotes the ballad\'s own couplet, merged with the letter-arrival stanza just before it, for the moment\'s shape rather than its specifics.',
    'THE COMPANIONS\' FAREWELL (¶5): the ballad\'s only "his companions let him go, and in a rush he went home" couplet («Edhe shokt at e kanë lshue. Turr e vrap në shpi ka shkue.») actually falls much earlier in the song — his fellow war-muster companions letting him briefly turn back for his wife\'s besa, before he ever rides for the front. Beat 5.1-5 borrows its shape a second time for the structurally similar moment late in the tale when his fellow PRISONERS see him off and he rides for home with the ransom settled.',
    'THE RIDE HOME\'S LENGTH (¶6): Elsie\'s prose has the horse run itself half to death over a full day and night of hard riding; the ballad compresses the whole journey to a single couplet — «për tre sahat kapi Ulqinë», in three hours he reached Ulqin. Beat 6.1-8 follows Elsie\'s longer, more punishing ride while quoting the ballad\'s couplet for the journey\'s shape, not its stated speed.',
    'THE RECOGNITION MOMENT (¶9.6): Elsie has the bride simply get out of the wedding coach when she sees the mark; the ballad has her swing down off her own horse instead («zdripi ajo kalit të bardhë» — she dismounted the white horse). The beats follow the ballad\'s horse for the recognition itself.',
  ],
  // sentence counts of Elsie's 13 narrative paragraphs (the italicised
  // scholarly headnote comparing Aga Ymeri to Little Constantine/Odysseus,
  // and the closing source-citation paragraph, are not part of the tale and
  // are not numbered)
  paragraphs: [21, 6, 8, 27, 5, 8, 16, 7, 8, 3, 5, 6, 5],
  cast: [
    { id: 'ymer', name: 'Aga Ymer', note: 'the hero — a besa kept twice over: once to his wife, once to his captor', npc: 'agaYmer' },
    { id: 'bride', name: 'his bride', note: 'married one night before the war-letter came; waited the whole term she swore to', npc: 'nusjaYmerit' },
    { id: 'mother', name: 'his mother', note: 'kept the house at Ulqin; did not know her own son at the fountain', npc: 'nenaYmerit' },
    { id: 'king', name: 'the foreign king', note: 'held Aga Ymer for ransom nine years, then freed him outright for keeping his word', npc: 'mbretiHuaj' },
    { id: 'daughter', name: 'the king\'s daughter', note: 'freed her father\'s prisoner on nothing but his word of honour, and nearly paid for it with her life', npc: 'bijaMbretitHuaj' },
    { id: 'groom', name: 'Pashë Veli', note: 'the new match already riding for the bride when Aga Ymer reaches his own door', npc: 'pashaVeliu' },
    { id: 'companions', name: 'his war-companions', note: 'fought and were taken alongside him; freed with him at the very end', npc: 'shoketYmerit' },
    { id: 'weddingParty', name: 'the wedding party', note: 'Pashë Veli\'s krushq, riding to collect the bride', npc: 'krushqitDasmes' },
  ],
  // anchor = the game location this tale place inhabits, under THE SHARING
  // RULE (see _SCHEMA.md). This tale is NORTHERN (Ulcinj, the Montenegrin
  // coast) — mirrors stay north; no southern spot is borrowed.
  places: [
    { id: 'ulqin', emoji: '🏠', name: 'Ulqin — his household and the White Spring', note: 'his home, his mother\'s fountain, and the wayside spring where the wedding party is met',
      anchor: { status: 'proposed', node: 'kalaMur',
        mirror: 'Ulcinj, a real Adriatic town at the Montenegrin frontier — not Shkodra itself, but the nearest drawn spot on this same far-north coast',
        mold: 'a separate coastal household and its roadside spring, understood as its own town of Ulqin temporarily sharing the one drawn northern-coast node — a different family, a different legend, from the castle\'s own walling story',
        conflicts: 'NOT the castle itself — Rozafa\'s walling legend and its three builder-brothers own that stonework and stay untouched; NOT bregu — that shore kulla is Gjergj Elez Alia\'s own nine-wound household (a Nikaj/Tropoja song, a different specific family), and this tale\'s house, mother and bride are not his',
        proposal: 'draw Ulqin\'s own household and, on its road, a spring under a pear tree (Kroni i Bardh) where the wedding party is met' } },
    { id: 'warRoad', emoji: '🛤️', name: 'the open road to war', note: 'the road out, and the road home, and the road back again',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of the village at the tanners\' bridge',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash' } },
    { id: 'sea', emoji: '🌊', name: 'the Adriatic shore', note: 'the water Ulqin sits on — waves, gulls, the last stretch of the ride home',
      anchor: { status: 'existing', node: 'deti1', mirror: 'the open Adriatic off the shore village',
        mold: 'the open sea hosts every coastal tale\'s comings and goings without clash', sharedWith: ['the whole coastal roster'] } },
    { id: 'captivity', emoji: '⛓️', name: 'the foreign king\'s court', note: 'the battle front, the dungeon, the window, and the king\'s own hall — all abroad, all "Spanja e zezë"',
      anchor: { status: 'offstage', mirror: 'the Kreshnik songs\' formulaic "Spanja e zezë" — Black Spain — a stock distant captor-realm, not the real Iberian kingdom (see discrepancies)',
        mold: 'never staged as a drawn scene — the three battles, the dungeon, the daughter\'s window and the king\'s hall exist only in the telling, exactly as three-friends\' offstage "kingsRealms" and ali-pashe-tepelena\'s "europeOffstage" already do for other tales\' distant powers',
        sharedWith: ['the three-friends "kingsRealms" / ali-pashe-tepelena "europeOffstage" pattern'] } },
  ],
  items: [
    { id: 'kali', emoji: '🐎', name: 'the bay horse', note: 'the king\'s daughter\'s own gift — carries him home, and back to his chains, and free again' },
    { id: 'nishani', emoji: '🩹', name: 'the mark on his arm', note: 'a scar from an old horse-bite (the ballad: a mark on the wrist) — the one proof no impostor could fake' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md). A besa
  // tale: the old woman tells the setup (agaYmer1, witnessed), then you BECOME Aga Ymer
  // at the crux (agaYmer2) — freed from captivity only on your besa to return, home at
  // last as your wife is about to wed another, the old scar proving who you are. The
  // CHOICE: keep the besa and ride all the way back to your chains (the captor-king,
  // awed, frees you for good), or stay home and break your word. Shared arc with the
  // variant kostandini-i-vogel ("Little Constantine"). become:'aga-ymer' at agaYmer2.
  play: {
    entry: 'dungeon',
    stance: 'embodied',
    as: 'ymer',
    role:
      'You are Aga Ymer of Ulcinj, nine years and nine days a captive far from home, freed at last only on your besa to return to your chains. You reach your own door as your wife\'s vow to wait runs out and she is about to be wed to another; an old scar on your arm proves who you are. Now: keep your besa and ride all the way back to prison — where the captor-king, awed that a man would return to his cell to keep his word, may free you for good — or stay home and break the word you swore.',
    from: 'agaYmer2',
    ending: 'agaYmerFund',
    scenes: {
      agaYmer1: 'dungeon',
      agaYmer2: 'recognition',
      agaYmerFund: 'freedom',
    },
    divergences: [
      { beat: 'dungeon', note: 'The tale opens witnessed — an old woman tells it with the Tosk formula "Iç mos iç" — and then you step into Aga Ymer himself at the recognition (agaYmer2 is already in his own voice). The battles, the ransom and the wedding-party are compressed into the setup; the crux the game plays is the besa.' },
      { beat: 'freedom', note: 'The ballad\'s own words are slotted verbatim as Q() quotes — the welcome «Mirë se erdhe, Imer Aga!» and the crowd\'s «majte besën qi ke dhanë!» ("you kept the besa you gave") — and the tale closes on the tellers\' formula «U mplak e u trashëgua». Keeping the besa (riding back to the cell) is the honoured path; staying home is the bad ending agaYmerStay.' },
      { note: 'The same game arc tells two source-ballads at once: the Albanian «Aga Ymeri i Ulqinit» and the pan-Balkan «Little Constantine, the returning captive» (the tale kostandini-i-vogel), both the returning-husband-and-the-besa story — reuses kalaMur (Ulcinj) and the lahutë.' },
    ],
  },
  beats: [
    {
      id: 'wedding', title: 'One night a husband',
      note: 'Aga Ymer is barely married when the Sultan\'s war-letter finds him. He does not argue — he arms himself and says his farewells.',
      lines: [
        ['1.1-5', 'Aga Ymer had barely settled into married life — one night with his bride — when the Sultan\'s own letter reached him: report for war at once, the enemy had struck. It was a harsh order, tearing him away from a marriage not even a day old — but a real soldier does not argue with the Sultan. Before he left the house, he saw to two things: that he was properly armed, and that his own parents had heard him say goodbye.', 'Aga Imeri na u martue, sali një natë ma s\'ndej me grue. Na i erdh letra për me shkue, i erdh letra për mirë, për me shkue agja n\'ushtri. Bani gosti e zijafet e i mblodhi shokët e vet e e la sarajin shkret.'],
      ],
      cast: {
        ymer: ['ulqin', 'newly married, then reads the Sultan\'s own summons to war'],
        bride: ['ulqin', 'a bride of one night when the war-letter arrives'],
        mother: ['ulqin', 'keeps the household, not yet knowing how long her son will be gone'],
        king: ['captivity', 'rules his own distant court, not yet met'],
        daughter: ['captivity', 'not yet met'],
        groom: ['ulqin', 'a local pasha in the town, not yet a suitor'],
        companions: ['warRoad', 'mustered for the same war, not yet captured'],
        weddingParty: ['ulqin', 'ordinary townsfolk, not yet a wedding escort'],
      },
      items: { nishani: ['ymer', 'the old scar he has always carried, not yet worth anything to anyone'] },
    },
    {
      id: 'vow', title: 'Nine years and nine days',
      note: 'He turns back once more to take his wife\'s own besa. Her first offer is far too short; only when he explains the distance does she settle on the true term — and its price if he is late.',
      lines: [
        ['1.6-9', 'He turned back to say his own goodbye: the Sultan had called him up and he had to leave at once; when she begged to come with him, he told her no — soldiering was no work for a wife.', 'Gjindja e shpisë ai i la vetë e ç\'u nis Agja me shkue, por për rrugës ai ka kthye; për rrugës ka kthye n\'shpi me i marrë besën vashës ti:'],
        ['1.10-12', 'All he asked was her word not to remarry, and to tell him plainly how long she would hold out for him.', 'S\'isht mulli me shkue, me ardhë, isht ushtri e rrugë e largët. Sa izën pa m\'nep besën maj vashë, sa izën pa m\'nep me ndejë?'],
        ['1.13', 'Nine days, she told him.', 'Vasha i ka thanë me shpejt: - Për tri dit e për tri net. - Xiftë t\'u goja qi pa flet!'],
        ['1.14-15', 'Nine days would come and go before he even reached the front, he told her — it was a long road, and no one could say how long the fighting itself might run.', 'S\'isht mulli me shkue, me ardhë, isht ushtri e rrugë e largët. Sa izën pa m\'nep besën maj vashë, sa izën pa m\'nep me ndejë?'],
        ['1.16-17', 'A love that matched his own, he told her, could hold out nine years and nine days — and not until that whole span had run out should she take him for dead and let herself marry someone else.', 'Atëherë vasha i ka thanë: - Pa t\'nap izën për tri vjet. - Lumtë goja, mirë pa flet!'],
        ['1.18-19', 'She sighed and agreed to the nine years and nine days, and the two of them swore to it on their word of honour.', 'Ati vasha prap i thet: - Masi t\'mushen-o tri vjet, as tri dit e, as tri net, besën ty-o nuk të pres, nuk të pres, veçse martohem.'],
        ['1.20-21', 'He kissed her goodbye and rode off content for the war, his horse raising such a cloud of dust that he seemed to vanish into it.', 'Aga Imeri me shkue u nis.'],
      ],
      cast: {
        ymer: ['ulqin', 'takes his wife\'s besa — nine years and nine days — before he rides for the front'],
        bride: ['ulqin', 'swears the nine years and nine days, and the marriage clause that ends it'],
      },
    },
    {
      id: 'battles', title: 'Taken on the third field',
      note: 'Three battles running: his horse falls, then he is wounded, then he is taken. He is thrown into a foreign dungeon, but treated as the hero he is.',
      lines: [
        ['2.1-2', 'He proved as heroic as promised, but his enemies were many — in the first clash, armored horsemen rode him down and closed in with their blades.', 'Kur ka ra në luftë të parë, edhe kalin ja kanë vra.'],
        ['2.3-4', 'He fought on, killing and wounding many, until his own horse was cut from under him — and kept fighting on foot until his blade itself broke.', 'Kur ka ra në luftë të dytë, edhe Agja varrue isht. Kur ka ra në luftë të tretë, rabazan-o e kanë marrë. [sic — the ballad prints "rabazan," its own word for a captured man, not "rob"]'],
        ['2.5-6', 'He was captured on the spot and locked away below a foreign stronghold ringed by high walls. Even so, he was treated with the respect any true hero is owed.', 'Rrap e zunë, n\'burk e çuen, për tri vjet ata e shkruen; e kanë shtie n\'burk të zi, tri vjet burgun ja kanë pre.'],
      ],
      cast: {
        ymer: ['captivity', 'loses his horse, takes a wound, and is captured in the third battle'],
        companions: ['warRoad', 'scattered in the same rout; some taken captive with him'],
      },
    },
    {
      id: 'dungeon', title: 'A merry prisoner',
      note: 'The years pass, but he keeps his word alive by keeping his own spirits up — eating, drinking, playing his lute for the other captives, until the king\'s daughter herself takes notice of him.',
      lines: [
        ['3.1-2', 'A single day stretched into a week, the weeks piled into months, and the months rolled on for years — through all of it he kept his nerve, banking everything on the nine years and nine days his wife had sworn to.', 'Aga Imeri njehën ditë, njehën ditë e njehën net, derisa u mbushën tri-o vjet.'],
        ['3.3', 'Through it all he kept his appetite, kept his spirits up, kept the other men in the cell laughing, and never put his lute down.', 'Hajt e hajt, kopil kopilit, shëndoshë vetë, katil katilit! Unë ha petulla me mjaltë, unë ha mish edhe pilaf, sarajet i gatis prap; nanë e babë zamanin kanë kapë, vashën e gjej më të mirë, edhe motra ma ka vakt.'],
        ['3.4-8', 'It puzzled the king\'s daughter no end — what kind of man could seem so unbothered about being locked up far from his own country? Aga Ymer of Ulqin, people told her: a tough one, always in good spirits, forever talking up the other prisoners with a song.', 'Kur u mbushën tri-o vjet, shkoi një shoq i ti atje. - Ty ç\'t\'ka gjetë, o Imer aga? Sarajet t\'ishin rranue, nanë e babë t\'ishin qerrue, vasha donte m\'u fejue, motra t\'jote pa u martue.'],
      ],
      cast: {
        ymer: ['captivity', 'holds three years of captivity with a merry, unbroken face'],
        king: ['captivity', 'holds him for ransom, never sent'],
        daughter: ['captivity', 'notices the cheerful prisoner from her own window'],
      },
    },
    {
      id: 'dream', title: 'A black dream',
      note: 'As the promised day nears, his cheer collapses into real despair — he stops eating and playing entirely. The king\'s daughter draws the reason out of him: a dream of everything he loves in ruin.',
      lines: [
        ['4.1-9', 'He stayed hopeful, sure the Sultan would ransom a soldier who had served him so loyally — but sultans forget, and this one never once considered the ransom, while nine years slipped by all the same. As the deadline crept closer, a real gloom settled over him — the color drained from his face, food and drink lost all appeal, and even a laugh was beyond him; when his worried companions pressed him about it he just sat there wordless, staring at the ground.', 'Masi shkoi ai shoq i ti Agja s\'pa ha as s\'pa pi, as dyzenit ma s\'pa i bie. Aga Imeri rri pështetë, rri pështetë për jastëk.'],
        ['4.10-13', 'Missing his music, the king\'s daughter asked after him — and when she learned he had gone days without food or his lute, she sent for him directly.', 'Kur nji ditë, në natje htret, bija e mretit del në penxhere, Aga Imerin p\'i pyeten: - Hajr allah, e Aga Imer, po dyzenit pse s\'pa i bie? Ç\'ke, Imer, qi je idhnue? [sic — the ballad reads "natje htret," an obscure/garbled turn of phrase; kept verbatim rather than back-translated as "early morning"]'],
        ['4.14-15', 'Brought before her, he said only that a bad dream had taken his appetite; she asked what kind of dream.', 'Imer Aga i ka thanë: - Kam nevojë-o m\'u idhnue: natën, mbrëmë, në mesnatë, e kam pa një andërr t\'shtirë,'],
        ['4.16-21', 'The dream, he said, showed his own house burned out and fallen apart, his father gone and unremembered, his mother\'s sight failed entirely, and his wife on the point of taking a new husband — after only the single night the two of them had ever actually had together, with the nine years and nine days she had sworn nearly spent.', 'unë kam pa një andërr të zezë: sarajet m\'ishin rranue, nanë e babë më janë qerrue, vasha e ime m\'isht fejue, motra mbet pa u martue. Se tri vjet-o më kanë shkue.'],
      ],
      cast: {
        ymer: ['captivity', 'stops eating and playing as the promised day nears; tells the king\'s daughter his dream'],
        daughter: ['captivity', 'draws the whole story out of him'],
      },
    },
    {
      id: 'ransom', title: 'A pledge instead of silver',
      note: 'He begs leave to go home before it is too late. The price is more than he could ever pay, so he offers something else — his sworn word — and it is enough.',
      lines: [
        ['4.22-23', 'He asked her one favor: win her father\'s word that he could leave for a handful of days — long enough to reach home, see his wife with his own eyes, and come straight back to his cell.', 'Izën mretit m\'u kërkue, me ju lutë njeri për mue! Tre dëshmitarë me m\'i çue!'],
        ['4.24-25', 'She named the price — nine sacks of silver — and he could only answer that a man nine years a prisoner had no way on earth to raise it.', 'Ç\'ka qitë vajza e i ka thanë: - Ne ke para me t\'lëshue, shtjerja babës tre darzanë, se n\'Ulqin me shkue t\'lëshoj. Ç\'ka qitë agja e i ka thanë: - Paret, i mjeri, ku t\'i marr? Tash tri vjet-o rabazanë, kën nuk njoh e kën nuk dij, por pa i shtie tre darzanë: pa i lanë din e iman, e pa i lanë Ramazan, e pa i lanë Kurban Bajram, n\'daç dy Bajrame e një Ramazan, n\'daç pa i lanë të madhin zot, e të dytin ujt e detit, e të tretin armët e brezit. [sic — the ballad prints "rabazanë," its own word for a captive, not "rob jam"]'],
        ['4.26-27', 'She asked what pledge he could give instead that he would really return — and he gave her his word of honour.', 'Vajza e mretit u ba rrazi edhe mreti besë i xuri me shkue n\'shpi e ka lëshue.'],
      ],
      cast: {
        ymer: ['captivity', 'begs leave to go home, and offers his sworn pledges in place of a ransom he cannot pay'],
        daughter: ['captivity', 'takes his word of honour and wins her father\'s leave for him'],
        king: ['captivity', 'accepts the besa and lets him go'],
      },
      items: { kali: ['ymer', 'the bay horse the king\'s daughter grants him for the road'] },
    },
    {
      id: 'release', title: 'Farewell to the other captives',
      note: 'His fellow prisoners grieve at being left behind; he promises to return and see out the rest of the term with them, then rides for home.',
      lines: [
        ['5.1-5', 'She knew an Albanian valued his word above his own life, so she simply told him to mount the bay horse — three hard days of riding would put him back in Ulqin. The men still locked up with him could hardly believe how their luck had split — him walking free while they stayed behind bars. Don\'t take it so hard, brothers, he told them — he would live to come back, and they would finish out the term together yet. With that, and their blessing, he climbed onto the bay horse and struck out toward Ulqin.', 'Edhe shokt at e kanë lshue. Turr e vrap në shpi ka shkue.'],
      ],
      cast: {
        ymer: ['warRoad', 'rides for Ulqin, promising his fellow captives he will return'],
        companions: ['captivity', 'stay behind, grieving his release'],
      },
    },
    {
      id: 'ride', title: 'The road home',
      note: 'The horse runs itself half to death; nine years of longing pour out in one cry to the town he can finally see.',
      lines: [
        ['6.1-8', 'The horse tore across the high ground and the low at a dead run while he kept driving it on — hurry, hurry, before she\'s married off to someone else — and after a full day and night without stopping it was nearly finished, and so was he, though neither of them let up. Three days and nights into the ride, Ulqin itself finally rose up out of the water ahead of him. He called out to the town by name, half unable to believe it — nine years he had pictured this exact shoreline every single night, aching the whole time just to set foot on its ground again. Surf rolled onto the sand below, a clean wind came off the water, and gulls turned overhead.', 'Sa me shpejt e la gjeti gjumin; e ç\'u nis agja me shkue: për tre sahat kapi Ulqinë.'],
      ],
      cast: {
        ymer: ['sea', 'races the last stretch of coast road toward Ulqin, spent but not stopping'],
      },
    },
    {
      id: 'motherFountain', title: 'A lie to his own mother',
      note: 'At a roadside spring he meets his own mother, who does not know him — and, unable to bear telling her the truth, tells her a worse one: that her son is dead. Through her he learns his wife is about to be married to another man.',
      lines: [
        ['7.1-9', 'His own house came into view looking almost unreal, like something from a dream, and he had to wonder whether he had actually made it back; thirst got the better of him before he reached the door, so he pulled up at a spring by the road, where an old woman sat who — though neither of them knew it — was his own mother. Pleasantries passed between them; she took him for a prisoner from his long, unkept hair and asked what country he\'d escaped from, and he answered Spain.', 'Nisi agja me kuvendue: - Ndesha e mirë, nuse në kalë! Mirë se vjen ti, more djalë, mirë se vjen, o burgaxhi! Ka pa vjen, o burgaxhi? - Unë pa vij pej Spanjet t\'zezë.'],
        ['7.10-16', 'Did he know anything of her own Aga Ymer? He did, he said — their paths had crossed three weeks earlier, right before the man died, and he\'d seen to the burial himself. It broke something in him to watch her cry over it, but he held his tongue rather than take the lie back. He changed the subject instead — who were all these people going by in such a rush, and what was that shooting rolling through the hills? Pashë Veli\'s men, she told him, that son of a dog, out to collect a bride for him; the gunfire was for the wedding itself. Whose bride, he asked. His own son\'s — Aga Ymer\'s wife, she said.', 'Ti qi erdhe, burgaxhi, a je veshur për Aga Imerin, ti për të a ke me dijtë? - Unë jam veshur për të zi, gjithë të zitë për të e kam. Aga Imeri na ka dekë, tash tri dit në dhé ka hi; vetë e lava, vetë e kjava, të shtatat me dorë ja dava.'],
      ],
      cast: {
        ymer: ['ulqin', 'meets his own mother at the roadside spring, unrecognized, and repeats a lie he cannot bear to unsay'],
        mother: ['ulqin', 'weeps for a son she does not know stands in front of her, and unwittingly tells him his wife is being remarried today'],
      },
    },
    {
      id: 'weddingParty', title: 'The same lie, twice',
      note: 'He rides straight for the wedding party and repeats the false report of his own death. The attendants are relieved; the veiled bride weeps.',
      lines: [
        ['8.1', 'Without waiting, he swung back onto the horse and cut across to catch the wedding party.', 'N\'gjysë të rrugës kur ka shkue, vajti e ra te Kroni i Bardhë, një tubë krushq e gjet nën dardhë, ç\'i ka hasë ata me nuse.'],
        ['8.2-4', 'They hailed each other on the road; asked his country he again said Spain, and they in turn asked whether he had any word of Aga Ymer.', 'Ndesha e mirë, o krushqellarë! Mirë se vjen ti, rabazan-e! - Mirë se rrini, krushq darsmorë! Mirë se vjen, o burgaxhi! - Unë pa vij pej Spanjet t\'zezë. [sic — the ballad prints "rabazan-e," not "rob"]'],
        ['8.5-7', 'He gave them the same story he had just given his mother — Aga Ymer dead these three weeks. It was welcome news to the wedding party, though behind her veil the bride could not hold back her tears.', 'Ti qi erdhe, burgaxhi, a je veshur për Aga Imerin, ti për të a ke me dijtë? - Unë jam veshur për të zi, gjithë të zitë për të e kam. Aga Imeri na ka dekë, tash tri dit në dhé ka hi, vetë e lava, vetë e kjava, të shtatat me dorë ja dava.'],
      ],
      cast: {
        ymer: ['ulqin', 'rides up to the wedding party and repeats the same false report'],
        groom: ['ulqin', 'his escort rides ahead to fetch the bride on his behalf'],
        weddingParty: ['ulqin', 'escorts the bride, relieved at the false news of Aga Ymer\'s death'],
        bride: ['ulqin', 'rides with the wedding party, weeping under her veil'],
      },
    },
    {
      id: 'recognition', title: 'The mark on his arm',
      note: 'He asks to speak with the bride, and asks if she would even know her husband if she saw him. Her answer — a mark his own mother once described to her — is the very one on his arm.',
      lines: [
        ['9.1-2', 'Something in him rebelled against his own charade, and he announced Aga Ymer had entrusted him with a message — could he have a moment with the bride? They saw no harm in it and let him through.', 'Amanet, o krushq darsmorë, a kam tehir me folë me nuse? T\'anë shikuen shokë-shokun-e e ja dhanë tehirin: - Hajt e fol, more jabanxhi, s\'isht adet, po fol kadalë!'],
        ['9.3', 'Stepping up beside the bridal coach, he put it to her plainly: if Aga Ymer were standing in front of her, would she even know him?', 'Amanet, moj vashë në kalë: po m\'i pafsh ti Aga Imerin, a kishe m\'i njoftë, moj vashë?'],
        ['9.4', 'Barely, she admitted — one night together before he left, then years spent waiting; all she really had to go on was something his own mother once told her, that a horse\'s bite years back had left its mark high up on his arm.', 'Edhe vasha i ka thanë: - Qyqja unë, e ku ta njoh? Sall një natë me të kam ndenjë, me të një natë kam ndenjë n\'shpi. E zeza unë, gjithç\'ka dij, gjithç\'ka dij, e zeza unë, gjithç\'m\'ka thanë qyqja kadanë, se e ka një shenjë në llânë.'],
        ['9.5', 'He pushed his sleeve up past the elbow so she could see the mark for herself.', 'Aga Imeri shih ç\'ka bani, shih ç\'ka bani Aga Imeri: shpërvoli mangën, qiti llânen.'],
        ['9.6', 'It took her only a heartbeat to place him — she cried out, swung down off the horse without help, and ripped the veil away from her own face.', 'Kur e pa vasha nishanin, zdripi ajo kalit të bardhë me të madhe hapi zanin:'],
        ['9.7', 'She told the wedding party to travel on without her: her real husband had come for her, and Aga Ymer was the only man she would ever call husband again.', 'Udha e mbarë, o krushqellarë! Unë po shkoj mas fatit t\'parë. Një selam te Ali Pasha, atje kjoftë si ka qenë: na majtë zoti shëndenë, për ne m\'faltë zoti një djalë, ty ma t\'parin ta bëj kumbar; për ne m\'faltë zoti dhe çikë, ty ma t\'parin ta bëj mik.'],
        ['9.8', 'He lifted her up onto the horse in front of him, and the two of them set off for home together.', 'Ç\'i qitën krushqit e thanë: - Na, pra, ku do të shkojmë? Na këndojnë kangën, na marrojnë. Muer agja vashën e ti, e muer, e çau në shpi.'],
      ],
      cast: {
        ymer: ['ulqin', 'shows the bride the very scar his own mother described, and is known at once'],
        bride: ['ulqin', 'recognizes him instantly, throws off her veil, and rides home at his side'],
        weddingParty: ['ulqin', 'left to carry the news back to Pashë Veli'],
        groom: ['ulqin', 'left waiting for a bride who will never arrive'],
      },
      items: { nishani: ['ymer', 'bared and read at last — the one proof no impostor could fake'] },
    },
    {
      id: 'returnVow', title: 'Back the way he came',
      note: 'The very next morning, his word to the king\'s daughter still unbroken, he saddles the bay horse and rides back the way he came.',
      lines: [
        ['10.1-3', 'By the next morning he was back on the bay horse, driving it hard on account of the promise he had made the king\'s daughter, and the coast around Ulqin dropped away behind him as he rode through that whole day and the night after it.', 'Vetë u nis me shkue n\'Spanjë, atje ku besën kish dhanë, vajza e mretit ish darzane.'],
      ],
      cast: {
        ymer: ['warRoad', 'keeps his second besa and rides back toward the foreign court'],
        bride: ['ulqin', 'settles into her own house, her husband gone again'],
      },
    },
    {
      id: 'meanwhile', title: 'No word from the prisoner',
      note: 'Back in the foreign king\'s land, days pass with no sign of Aga Ymer. The king demands an account from his daughter, who insists he gave his word and will keep it.',
      lines: [
        ['11.1-3', 'Meanwhile, back in the foreign king\'s land, no one had seen or heard from Aga Ymer for some time; word came back only that the king\'s own daughter had freed him, and that he was expected to return.', 'Km u mush koha me ardh-e, e bija mretit i del para. Mreti pa e peveten t\'bin-e:'],
        ['11.4-5', 'He called her before him and wanted to know at once what had become of his prisoner; she admitted it plainly — she had let him go so he could reach his wife before another man married her, on his sworn promise of three days, and that very day, she reminded her father, was today.', 'A pe gia, mori bi-e? - Po, more bab-o, tash po vjen.'],
      ],
      cast: {
        king: ['captivity', 'has had no word of his prisoner and turns on his own daughter'],
        daughter: ['captivity', 'stands by his word that he will return'],
      },
    },
    {
      id: 'gallows', title: 'Wait until dark',
      note: 'The king, certain no freed prisoner ever comes back, orders his own daughter beheaded for trusting one. She begs only to wait until nightfall.',
      lines: [
        ['12.1', 'Furious, the king declared the man had tricked her and would never be seen again — and gave orders to have his own daughter\'s head struck off.', 'Mreti t\'bin-e e ka fal-e, se mas t\'ardhke Aga Imeri, besa t\'binë ai desht m\'i pre.'],
        ['12.2', 'She asked for only that much time, until nightfall — Aga Ymer would come, she said, and he would never go back on a promise.', 'Mreti t\'bin-e e ka fal-e, se mas t\'ardhke Aga Imeri, besa t\'binë ai desht m\'i pre.'],
        ['12.3-4', 'The king would not hear it — men who slip free of a cell never turn around and come home, he said; leave a caged bird the smallest crack in the door and it is gone for good.', 'Mreti t\'bin-e e ka fal-e, se mas t\'ardhke Aga Imeri, besa t\'binë ai desht m\'i pre.'],
        ['12.5-6', 'She held her ground — he had sworn it to her personally. Promises do not count for much once the wind has had a turn at them, he answered flatly; even a king forgets his own now and again.', 'Mreti t\'bin-e e ka fal-e, se mas t\'ardhke Aga Imeri, besa t\'binë ai desht m\'i pre.'],
      ],
      cast: {
        king: ['captivity', 'orders his own daughter\'s death rather than trust a captive\'s word'],
        daughter: ['captivity', 'begs only to be allowed to wait until dark'],
      },
    },
    {
      id: 'freedom', title: 'A word kept twice',
      note: 'Aga Ymer rides back into the very prison he escaped, exactly as he swore. The king, astonished that a man would ride back to his own chains, frees him outright — and his companions with him.',
      lines: [
        ['13.1-2', 'Far off on the road a rider came into view, driving hard for the gate; before long he had reached it, swung down off a horse lathered white, and stood before the king\'s daughter.', 'Aga Imeri shpejt ja u erdh. - Mirë se erdhe, Ago Imer, se mua baba deshti me m\'pre!'],
        ['13.3', 'He told her plainly that a promise was a promise — he had been her prisoner before, and here he was, handing himself back to her as one again.', 'Të gjithë shokët i dolën përpara: - Mirë se erdhe, Imer Aga! Qenke djalë e pika e djalit, mbajte besën i shqiptarit, mbajte besën qi ke dhanë!'],
        ['13.4', 'The king could hardly believe it — a man who had actually kept his word rather than run — and pronounced him free on the spot.', 'Aga mretit i doli n\'faqe. N\'burk mreti ma s\'e ka shtie, për krejt e fali, u kthye n\'shpi.'],
        ['13.5', 'He told his guards to open the cells for Aga Ymer and the nine men held with him, and let every one of them go wherever they pleased.', 'Aga Imeri erdh n\'Ulqinë, vazhdoi jetën me vashën e ti.'],
      ],
      cast: {
        ymer: ['captivity', 'rides back into the very prison he escaped, exactly as he swore'],
        king: ['captivity', 'frees him outright, astonished a man would ride back to his own chains'],
        daughter: ['captivity', 'saved by the very besa she trusted'],
        companions: ['captivity', 'freed alongside him at last, free to go wherever they wish'],
      },
    },
  ],
}
