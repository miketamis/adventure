// ===========================================================================
// TALE: Kostandini i Vogël — Little Constantine, the returning captive
// (sung in the north as Aga Ymeri, in the south as Ymer Ago, and among the
// Arbëreshë as Konstandini i Vogëlith — one legend, three names). See
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
// ===========================================================================

export default {
  id: 'kostandini-i-vogel',
  title: 'Little Constantine, the returning captive (told here as Aga Ymeri of Ulqin)',
  source:
    '«Ymer Agë Ulqini», the sung Albanian original (collected by Hipi Zhdripi, Arbnesh/Krajë, 2006; sq.wikibooks.org, CC-BY-SA), followed scene for scene · cross-read against Robert Elsie\'s prose translation of Mitrush Kuteli\'s retelling ("Aga Ymeri of Ulqin," in Tregime të moçme shqiptare, Tiranë 1965/1987/1998, archived at albanianliterature.net/legends/legend_03.html) for background only · every English line below is this author\'s own paraphrase of the SUNG text, not of Elsie\'s prose, which is never copied',
  // where the tale comes from — the sung original's own colophon names the
  // region: Krajë, the Albanian-speaking coast around Ulcinj (Montenegro)
  origin: {
    region: 'North Albania (Gheg) — Krajë, the coast around Ulcinj',
    collector: 'Hipi Zhdripi (2006 print collection); the same figure is catalogued by Robert Elsie as "Aga Ymeri of Ulqin," northern Albania\'s own telling of the international "returning husband" ballad',
    published: '2006 (Wikibooks transcription of Zhdripi\'s collection); the same legend is printed in Mitrush Kuteli\'s Tregime të moçme shqiptare (Tiranë, 1965)',
  },
  // the ALBANIAN ORIGINAL: every beat line's third element is the verbatim
  // sung text for that ¶.sentence (lightly cleaned; raw text in `local`).
  albanian: {
    title: '«Ymer Agë Ulqini»',
    source:
      'Ymer Agë Ulqini, collected by Hipi Zhdripi, Arbnesh, Krajë (2006); Albanian Wikibooks (CC-BY-SA) transcription, already saved for the related "aga-ymer" folklore card. Lightly cleaned of OCR noise (è→ë; "Km"→"Kur"; "lmer"→"Imer"; "rnreti"→"mretit"; capital-I/lowercase-l confusions such as "krushqelIar"→"krushqellar" and "fiIl"→"fill") and the sung text\'s trailing metrical filler syllables (-o/-e) dropped for legibility, EXCEPT the vocative "-o" (kept, e.g. "ag-o"). Genuinely unrecoverable OCR garbles are quoted as printed with a bracketed [sic] note rather than guessed at. IMPORTANT CORRECTION: earlier drafts of this file silently standardized the hero\'s name and dozens of Gheg verb-forms to Tosk spelling throughout the beat lines (e.g. "Ymer/Ymeri" for the text\'s own "Imer/Imeri"; "mbret" for its "mret"; "burg" for its "burk"; "-uar" participles — shkuar, martuar, qerruar, rrënuar, fejuar, dekur, hyrë, thënë, etc. — for its own Gheg "-ue/-e" forms — shkue, martue, qerrue, rranue, fejue, dek, hi, than) without disclosing it, so the quoted "Albanian" did not actually match this file. The beat lines have been corrected to the sung text\'s own dialectal spelling throughout (Gheg mb→m is a genuine, consistently-printed reduction here — mret, majt, kumar — not a one-off typo). The collector\'s own title line spells the hero "Ymer"; the sung verses that follow spell him "Imer"/"Imeri" almost without exception (only the corrupted first line "Aga Tmeri" was ambiguous, resolved here to "Imeri" for internal consistency) — the game\'s own English prose and NPC id keep "Aga Ymer" throughout, matching the title and the wider tradition, while the quoted Albanian keeps the sung text\'s own "Imer."',
    local: 'docs/references/ymer-age-ulqini.sq.txt',
  },
  // where the sung original and Robert Elsie's prose retelling disagree —
  // the beats below follow the SUNG text throughout; this is where and why
  discrepancies: [
    'THE DEADLINE (¶3, ¶5, ¶9-10): the sung ballad negotiates a three-stage countdown — his father offers one week, his mother two weeks, both refused, and only his bride\'s raised offer of three years is sworn to and kept as the deadline. Elsie\'s prose (and the game\'s own pre-existing agaYmer1/agaYmerFund text) instead has husband and wife alone swear "nine years and nine days." The beats follow the sung original\'s three-year count; the core NPC file\'s one-line "seven years" gloss and the existing side-quest\'s "nine years and nine days" both predate this fuller sourcing and are simplifications, not contradictions to resolve here.',
    'THE WHITE SPRING (¶12): Elsie\'s prose splits one encounter into two scenes — first an aged mother at a village fountain who fails to know her own son, then separately the wedding party. The sung original has only one meeting: at Kroni i Bardhë, the White Spring, where Aga Ymer finds the wedding train itself resting under a pear tree, the bride among them. The beats follow the sung original — no separate mother-at-the-fountain scene, and Aga Ymer\'s mother is never staged.',
    'THE RIVAL\'S NAME: the sung original names the new groom "Ali Pasha" (once, in the blessing at ¶13.3, "Ali Begu" — «Ali Begut», dative); Elsie\'s prose calls him "Pasha Veli." Both names circulate in the wider tradition; the beats keep the sung text\'s own "Ali Pasha."',
    'THE RELEASED COMPANIONS (¶15-16): Elsie\'s prose has the foreign king free Aga Ymer\'s nine fellow prisoners along with him. The sung original frees Aga Ymer alone and says nothing further of the others. The beats follow the sung original — the captives\' fates go untold.',
    'THE THREE PLEDGES (¶9-10): unique to the sung original, absent from Elsie\'s prose (which has him pledge only "his word of honour" for money he doesn\'t have). Penniless after three years a captive, Aga Ymer instead pledges his faith and his religious observance, and — if that still falls short — God, the sea, and the weapons of his own belt. The beats keep this, the ballad\'s most vivid detail.',
    'TRANSLATION VS. ORIGINAL — NAME FORM: every English line calls the hero "Aga Ymer/Ymeri" (matching the collector\'s own title and the game\'s pre-existing NPC/side-quest text); the sung verses themselves almost always spell him "Imer"/"Imeri" (Gheg Y→I), which is what the quoted Albanian third elements print. This is a spelling difference within one Albanian source, not an English-vs-Albanian mistranslation.',
    'TRANSLATION VS. ORIGINAL — DIALECT: the quoted Albanian is Gheg throughout (mret not mbret, burk not burg, shkue/martue/dek not shkuar/martuar/dekur, pa/kanë pa not parë, etc.) — a real dialectal register the English paraphrase necessarily flattens into plain English, since Gheg vs. Tosk has no clean English equivalent. A few short spans of the 2006 OCR transcription remain genuinely illegible (e.g. ¶8.1\'s "natje htret", ¶8.4\'s "m\'kshu", ¶10.1\'s "m\'jitte", ¶4.4\'s "Rap e xun") — these are quoted as printed with a bracketed [sic] rather than smoothed into confident modern Albanian, so the English paraphrase at those points is built from the surrounding, legible lines and from context, not from the garbled span itself.',
  ],
  // sentence counts of this tale's 16 scene-paragraphs (the sung original's
  // own stanza-groups, numbered by this author — see discrepancies above for
  // why the paragraphing follows the ballad and not Elsie's prose)
  paragraphs: [2, 4, 4, 4, 2, 2, 2, 4, 3, 4, 2, 4, 6, 5, 5, 1],
  cast: [
    { id: 'agaYmer', name: 'Aga Ymeri', note: 'the hero — married one night, then three years lost to war, prison and the road home', npc: 'agaYmer' },
    { id: 'wife', name: 'his wife', note: 'swore to wait three years; was already remarrying when he reached her', npc: 'nusja' },
    { id: 'king', name: 'the foreign king', note: 'holds Aga Ymer captive; freed him on his daughter\'s besa, not on silver', npc: 'mbretiZaptor' },
    { id: 'princess', name: 'the king\'s daughter', note: 'notices his despair, hears his dream, and stakes her father\'s word on his', npc: 'bijaMbretit' },
    { id: 'rival', name: 'Ali Pasha', note: 'the new groom, told the first husband is three years dead', npc: 'aliPashaYmerit' },
    { id: 'captives', name: 'his fellow captives', note: 'share his three years in the dark cell; cheer him, then lament losing him', npc: 'shoketBurgut' },
    { id: 'gatekeeper', name: 'the old woman at the gate', note: 'keeps the tower where his wife waited, then and since', npc: 'plaka' },
    { id: 'weddingParty', name: 'the wedding train', note: 'rides the bride toward Ali Pasha\'s house — the SAME krushqit who ride every dasma', npc: 'krushqit' },
  ],
  // anchor = the game location this tale place inhabits. REUSE over invention,
  // under THE SHARING RULE. This tale is NORTHERN (Ulcinj/Krajë) — its
  // anchors are the game's own pre-existing Aga Ymer side-quest nodes.
  places: [
    { id: 'home', emoji: '🏠', name: 'the kulla at Ulqin', note: 'Aga Ymer\'s tower-house, where the wedding, the countdown, and the homecoming all happen',
      anchor: { status: 'existing', node: 'plaka', mirror: 'Aga Ymer\'s own kulla at Ulcinj, the Adriatic town just across the border from Albania',
        mold: 'already the game\'s own "kulla e Aga Ymerit" (placeMeta.js): the tower where the wife waited and the gate-keeper still watches — this tale is that tower\'s own story',
        sharedWith: ['the already-placed agaYmer/plaka/nusja NPCs'],
        conflicts: ['a bare-id registry collision (out of this tale\'s file scope — see the npc file header): tale-aga-ymer.js also defines an unrelated "agaYmer" npc at node kalaRozafa, which currently wins the last-loaded-wins merge over core-village.js\'s tower-keeper this anchor assumes; not a mold conflict this tale created or can resolve alone'] } },
    { id: 'road', emoji: '🛤️', name: 'the open road', note: 'the road out to war, and the road home again',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of the village',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash',
        sharedWith: ['three-friends', 'the whole travel spine'] } },
    { id: 'warfront', emoji: '⚔️', name: 'the Sultan\'s war', note: 'three battles, offstage: a horse lost, a wound taken, a capture',
      anchor: { status: 'offstage', mirror: 'the unnamed foreign war the letter summons him to',
        mold: 'never staged — the war is only ever reported, never played; it exists just long enough to explain the dungeon' } },
    { id: 'dungeon', emoji: '⛓️', name: 'the foreign king\'s dungeon', note: 'three years caged: the counting, the news from home, the dream, the pledge',
      anchor: { status: 'existing', node: 'agaYmer1', mirror: 'a foreign castle\'s dungeon, wherever the war carried him',
        mold: 'already the game\'s own side-quest home: Aga Ymer\'s captivity and his sworn besa live at this exact node',
        sharedWith: ['the already-built agaYmer1 side-quest text'] } },
    { id: 'springRoad', emoji: '💧', name: 'the White Spring', note: 'Kroni i Bardhë, under a pear tree, halfway down the road to Ulqin — where the wedding train rests, and where he is known',
      anchor: { status: 'existing', node: 'fshatiLumi', mirror: 'a spring by the river crossing, on the road every wedding train rides in',
        mold: 'the river quarter\'s crossing already hosts the water-carrier\'s daily walk and the krushqit\'s standing route (start→fshatiLumi→fshatiSheshi→dasma1); a wedding train resting here, bride included, is exactly what already passes through',
        sharedWith: ['gruaUji\'s route', 'krushqit\'s route'] } },
    { id: 'weddingHouse', emoji: '💍', name: 'Ali Pasha\'s house', note: 'where the second wedding feast waits — and is never reached',
      anchor: { status: 'offstage', mirror: 'the new groom\'s household, down the road the wedding train never finishes',
        mold: 'never staged — the story only ever reaches the procession on the road, never the destination' } },
    { id: 'besaChoice', emoji: '🤝', name: 'the tower, the second time', note: 'the same kulla\'s choice point: keep the besa, or stay',
      anchor: { status: 'existing', node: 'agaYmer2', mirror: 'the same tower at Ulqin, the morning after the reunion',
        mold: 'already the game\'s own choice node: mban besën (keep the besa) leads to agaYmerFund, rri në shtëpi (stay) leads to agaYmerStay — a counterfactual the sung legend itself never takes; these beats follow only the besa-kept branch, since that is the legend',
        sharedWith: ['the already-built agaYmer2 side-quest text'] } },
    { id: 'freedom', emoji: '🗝️', name: 'the dungeon door, opened for good', note: 'the foreign king tears up the debt',
      anchor: { status: 'existing', node: 'agaYmerFund', mirror: 'the same foreign dungeon, its door opened for the last time',
        mold: 'already the game\'s own secret ending for this side-quest — the legend\'s true and only outcome' } },
  ],
  items: [
    { id: 'lahuta', emoji: '🎻', name: 'his lute', note: 'cheers the other prisoners through the good years; falls silent the moment the news breaks him' },
    { id: 'darzanet', emoji: '🤝', name: 'the three pledges', note: 'faith and fasts and feast-days, and if that fails, God, the sea, and his own belt-weapons — offered in place of silver he doesn\'t have' },
    { id: 'nishani', emoji: '🩹', name: 'the mark on his arm', note: 'the one thing that proves him to a wife who shared only one night with him' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md). This is
  // the pan-Balkan "Little Constantine, the returning captive" told IN-GAME AS Aga Ymeri
  // of Ulcinj — it shares the very same arc and nodes as the aga-ymer tale (agaYmer1
  // witnessed setup → agaYmer2 the embodied besa choice → agaYmerFund). You become the
  // returned captive; keep the besa and ride back to your chains, or stay and break it.
  play: {
    entry: 'waiting',
    stance: 'embodied',
    as: 'agaYmer',
    role:
      'You are the captive husband come home after nine years and nine days — freed only on your besa to return — to find your wife\'s vow of waiting run out and a new wedding at your own door. A scar on your arm proves who you are to the wife who shared but one night with you. Keep your besa and ride all the way back to captivity, and the captor-king, awed, may free you for good; or stay, and break the word that alone let you go.',
    from: 'agaYmer2',
    ending: 'agaYmerFund',
    scenes: {
      agaYmer1: 'waiting',
      agaYmer2: 'scar',
      agaYmerFund: 'besaKept',
    },
    divergences: [
      { beat: 'scar', note: 'The game tells this pan-Balkan ballad (Little Constantine / the returning husband) THROUGH its Albanian counterpart, Aga Ymeri of Ulcinj — the same nodes serve both tale files. You witness the old woman\'s setup, then embody the returned captive at the recognition, the scar the one proof no impostor could fake.' },
      { beat: 'besaKept', note: 'The wedding, the years of waiting, the countdown of the vow, the news and despair and the dream-pledge are compressed into the setup; the crux the game plays is the besa — ride back to the cell to keep your word (the honoured ending) or stay home and break it (the bad ending).' },
      { beat: 'home', note: 'Because the game routes this tale through Aga Ymeri, its verbatim ballad-quotes and closing formula live on the shared ending node (agaYmerFund); "not even a homecoming outweighs a sworn besa, and a besa kept can open even a prison door."' },
    ],
  },
  beats: [
    {
      id: 'wedding', title: 'One night, then a letter',
      note: 'Aga Ymeri marries. The next day a letter orders him to war.',
      lines: [
        ['1.1', 'Aga Ymeri married, and spent only a single night with his bride before duty called.', "Aga Imeri na u martue, sali nji natë ma s'ndej me grue."],
        ['1.2', 'A letter reached him ordering him off to the army.', "Na i erth letra për me shkue, i erth letra për miri, për me shkue ag-ja n'ushtri."],
      ],
      cast: {
        agaYmer: ['home', 'married one night, then reads the order to war'],
        wife: ['home', 'newly wed'],
        king: ['dungeon', 'rules his foreign court and dungeon — not yet met'],
        princess: ['dungeon', 'waits in her father\'s court — not yet met'],
        rival: ['weddingHouse', 'keeps his own household, not yet aware of any bride to come'],
        captives: ['dungeon', 'already held in the foreign dungeon — not yet met'],
        gatekeeper: ['home', 'keeps the gate of the tower'],
        weddingParty: ['road', 'ride their standing loop, not yet called to any wedding of this tale'],
      },
      items: {
        lahuta: ['agaYmer', 'carried everywhere, played for good cheer'],
        nishani: ['agaYmer', 'the mark he already bears, hidden under his sleeve'],
      },
    },
    {
      id: 'farewell', title: 'A feast, and a turn in the road',
      note: 'He feasts his friends and sets out — then turns back to take his bride\'s sworn word before he truly leaves.',
      lines: [
        ['2.1', 'He threw a farewell feast and gathered his companions.', "Bani gost e zijafet e i mlodhi shokt e vet"],
        ['2.2', 'He left the household bare behind him and set out to march away.', "e e la sarajin shkret. Gjint i shpisë ai i la vetë e ç'u nis Ag-ja me shkue,"],
        ['2.3', 'But partway down the road he turned back — back home, to take his bride\'s sworn word first.', "por pej rruget ai ka kthye; pej rruget ka kthye n'shpi me i marrë besën vashës ti:"],
        ['2.4', 'He told his companions to wait, that he\'d forgotten something at the house, and ran home at a sprint.', "- Po ndigoni shokt e mi, diç harrova në shtëpi. Edhe shokt at e kanë lshue. Turr e vrap në shpi ka shkue."],
      ],
      cast: {
        agaYmer: ['home', 'back at his own door, about to press for his wife\'s besa'],
        wife: ['home', 'unaware yet why he has run back'],
      },
    },
    {
      id: 'countdown', title: 'Three askings',
      note: 'He asks his father, then his mother, then his bride how long they\'ll wait for him. Only the bride\'s raised offer — three years — is sworn and kept.',
      lines: [
        ['3.1', 'He asked his own father first: how much leave would he give before demanding him home?', "Se ç'pa i thatë ai babës ti: «diç harrova me t'pevetë, sa izën ti, babë, pa m'nep?» Ati baba i ka thanë: «unë t'nap izën për nji javë.» «Mas ti, babë, goja t'u thaftë!»"],
        ['3.2', 'His father offered only a week — not enough for a war down a long road — so he pressed his mother instead, and she offered two.', "S'isht mulli me shkue, me ardhë, isht ushtri e rrugë e larkt. Sa izën pa m'nep, maj nanë? Edhe e ama i ka thanë: «unë pa t'nap per dy javë.» «Mas, maj nanë, goja t'u thaftë!»"],
        ['3.3', 'Neither was enough either, so he turned to his bride: how long would she hold out for him? Three days and three nights, she answered at once.', "Sa pa m'nep besën, maj vashë, sa izën pa m'nep me ndejë? Vasha i ka thanë me shpejt: «për tri dit e për tri net.»"],
        ['3.4', 'He pressed her further, and she raised it to three years — swearing that once those years ran out unanswered, she would wait no longer, but marry.', "At'herë vasha i ka thanë: «pa t'nap izën për tri vjet.» «Lumt goja, mirë pa flet!» Ati vasha prap i thet: «masi t'mushen tri vjet, as tri dit, as tri net besa ty nuk të pres, nuk të pres veçse martohem,»"],
      ],
      cast: {
        agaYmer: ['home', 'wins his wife\'s three-year besa before finally leaving'],
        wife: ['home', 'swears to wait three years, no longer'],
      },
    },
    {
      id: 'toWar', title: 'Three battles',
      note: 'He rides to war. His horse falls in the first battle, he is wounded in the second, and taken captive in the third — thrown into a dungeon for three years.',
      lines: [
        ['4.1', 'And so Aga Ymeri set out for the war at last.', "Aga Imeri me shkue unis."],
        ['4.2', 'In the first battle, his horse was killed under him.', "Kur ka ra ne luftë te parë, edhe kalin ja kan vra."],
        ['4.3', 'In the second, he himself was wounded.', "Kur ka ra në luftë të dytë, edhe Ag-ja varrue isht."],
        ['4.4', 'In the third, he was taken captive and thrown into a dark cell, sentenced to three years.', "Kur ka ra në luftë të tretë, rabazan e kanë marrë. Rap e xun [sic — printed thus, sense 'seized'], n'burk e çuen, për tri vjet ata e shkruen; e kanë shti n'burk të zi, tri vjet burgun ja kanë pre."],
      ],
      cast: {
        agaYmer: ['dungeon', 'captive, three years to serve'],
        wife: ['home', 'left behind, counting from her own promise'],
        captives: ['dungeon', 'joined by a new prisoner'],
      },
    },
    {
      id: 'waiting', title: 'Three years counted',
      note: 'He counts the days and nights in the cell, eating and drinking little, his lute mostly silent.',
      lines: [
        ['5.1', 'Aga Ymeri counted the days, counted the nights, until three years had run their course.', "Aga Imeri njehen dit', njehen dit' e njehen net', der .iu mllshen tri vjet [sic — printed thus; sense 'until three years had run their course']."],
        ['5.2', 'Through them all he ate little, drank little, and rarely touched his lute.', "Se ç'pa ha edhe ç'pa pi, e dyzenit çka pa i bje."],
      ],
      cast: {
        agaYmer: ['dungeon', 'keeps count as the three years wear on'],
        captives: ['dungeon', 'share the wait with him'],
      },
    },
    {
      id: 'news', title: 'Word from home',
      note: 'The moment his sentence is up, a fellow captive reaches him with news: his household is in ruins, his parents undone, his bride about to be promised elsewhere. He denies it furiously and boasts he wants for nothing.',
      lines: [
        ['6.1', 'The day his three years were up, one of his fellow captives came to him with news: the household lay in ruin, his parents were undone, his bride was about to be promised to another, and his sister still unwed.', "Kur u mushen tri vjet, shkan nji shoqi i ti asajta. «Ty ç't'ka gjetë, o Imer aga? Sarajet t'ishin rranue, nanë e babë t'ishin qerrue, vasha donte m'u fejue, motra t'jite pa u martue.»"],
        ['6.2', 'He flared up and called the man a liar, boasting that he still ate honey-cakes and meat and pilaf, that his household would keep, and that he\'d find a finer bride yet.', "«Hajt e hajt, kopil kopilit, shendosh vetë, katil katilit! Unë ha petulla me mjaltë, unë ha mish edhe pilaf, sarajet i gadis prap; nanë e babë zaman' kanë kapë, vashën e gjêj ma të mirë, edhe motra mâ ka vakt.»"],
      ],
      cast: {
        captives: ['dungeon', 'one of their number brings the news; the rest look on'],
        agaYmer: ['dungeon', 'denies it loudly, refusing to believe'],
      },
    },
    {
      id: 'despair', title: 'The boast breaks',
      note: 'The moment his friend is gone, the boast collapses: he stops eating, stops drinking, stops playing, and sits slumped against a cushion.',
      lines: [
        ['7.1', 'But the moment that companion had gone, Aga Ymeri could not eat, could not drink, and would not touch his lute again.', "Masi shkoi ai shoqi j ti [sic — printed thus; sense 'his companion'], Ag-ja s'pa ha as s'pa pi, as dyzenit ma s'pa i bje."],
        ['7.2', 'He sat slumped, leaning against a cushion.', "Aga Imeri rri pështetë, rri pështet për jastek."],
      ],
      cast: {
        agaYmer: ['dungeon', 'silent, unmoving, the news finally landing'],
        captives: ['dungeon', 'watch him fail, unable to help'],
      },
      items: {
        lahuta: ['dungeon', 'set down, untouched'],
      },
    },
    {
      id: 'dream', title: 'A bad dream, confessed',
      note: 'The king\'s daughter notices the silence and asks him why. He tells her of a midnight dream: the household in ruins, his bride promised away, the three years already gone.',
      lines: [
        ['8.1', 'One morning the king\'s daughter, leaning from her window, asked Aga Ymer why his lute had gone quiet — what had soured him?', "Kur nji ditë, në natje htret [sic — printed thus; sense uncertain], bija e mretit del n'penxhere, Aga Imerin p'i peveten: «Hajr allah e Aga Imer, po dyzenit pse s'pa i bje? Ç'ke Imer qi je idhnue?»"],
        ['8.2', 'He answered that he had reason to be troubled: at midnight the night before he had dreamed a bitter dream, a black dream.', "Imer Aga i ka thanë: «kam nevoj m'u idhnue — natën, mram në mjesnatë, e kam pa nji andërr t'shtirë, unë kam pa nji andërr t'zezë —"],
        ['8.3', 'In it his household lay in ruin, his parents were undone, his own bride had been promised to another, his sister was still unwed, and the three sworn years had already run out.', "sarajet m'ishin rranue, nanë e babë më janë qerrue, vasha e jeme m'isht fejue, motra mét pa u martue. Se tri vjet më kanë shkue.»"],
        ['8.4', 'He begged her to win him leave from her father, to be sent home under three pledges instead of ransom.', "«Izën mretit me m'kshu [sic — printed thus; sense 'grant me leave'], me ju lut njér per mue! Tre darzan me m'i çue!»"],
      ],
      cast: {
        princess: ['dungeon', 'hears the silence, asks why, and hears the dream'],
        agaYmer: ['dungeon', 'confesses the dream that has broken him'],
      },
    },
    {
      id: 'pledge', title: 'Three pledges instead of silver',
      note: 'She tells him her father wants payment for his release. He has no money after three years a captive — but offers his faith, his fasts, and if that falls short, God, the sea, and his own weapons as pledge instead.',
      lines: [
        ['9.1', 'She told him she could ask her father, but that release would cost three pledges in place of the silver he had none of, before she could send him home to Ulqin.', "Ç'ka qitë vajza e i ka thanë: «ne ke pare me t'leshue, shtjerja babës tre darzanë, se n'Ulqin me shkue t'lshan.»"],
        ['9.2', 'He answered that he had no way to raise money — three years a prisoner, out of touch with the world.', "Ç'ka qitë ag-ja e i ka thanë: «paret i mjeri ku t'i marr? Tash tri vjet rabazanë, kên nuk njoh e kên nuk dij,"],
        ['9.3', 'Instead he offered three pledges: his faith and his religious observance, his Ramadans and his feast-days — and if that still fell short, God himself, the sea, and the weapons at his own belt.', "por pa i shtie tre darzanë: pa i lâ din e iman, e pa i lâ Ramazan', e pa i lâ Kurban Bajram' — n'dashtë dy Bajrame e 'i Ramazan — n'dasht pa i lâ te madhin zot, e të dytin ujt e detit, e të tretin armt e brezit.»"],
      ],
      cast: {
        princess: ['dungeon', 'names her father\'s price'],
        agaYmer: ['dungeon', 'offers his faith and his God in place of coin'],
      },
      items: {
        darzanet: ['agaYmer', 'the three pledges, offered where silver was owed'],
      },
    },
    {
      id: 'king', title: 'Freed on a besa',
      note: 'He repeats the plea in tears before the king himself, who demands three hundred purses. Aga Ymeri has only the same three pledges — and the king\'s daughter, moved, wins her father\'s word and sets him loose.',
      lines: [
        ['10.1', 'He carried the same plea to the king himself, weeping openly as he told the dream again.', "Ju çue ag-ja shkoi te mretit. Për jastek pa rri pështetë, pa i shin lot' me faculetë [sic — 'shin' printed thus for the expected 'falling']. «Çka ke, ag-o, qi pa kjan?» Ç'ka qitë ag-ja e i ka thanë: «natën, nat në mjesnatë unë e pash nji andërr t'zorshme — sarajet m'ishin rranue, nanë e babë m'ishin qerrue, vasha donte m'u martue, motra m'jitte [sic — garbled; sense 'my sister'] pa u martue. Aman mret me m'leshue!»"],
        ['10.2', 'The king demanded three hundred purses of silver for his freedom.', "Mreti i lypi treqind qese: «Aga Imer, unë të lshaj e me m'dhanë treqind qese pare.»"],
        ['10.3', 'Aga Ymeri answered as before — a poor prisoner three years running has no silver — and offered the same three pledges in its place.', "Aga Imeri ju përgjegj: «unë i mjeri ku t'i marr? Tash tri vjet rabazan, por pa t'shtie tre darzan: pa ta la din e iman, e pa t'là Ramazan', e me te Kurban Bajram, n'daç dy Bajrame e 'j Ramazan, n'daç pa t'là t'madhin zot, e të dytin ujt ë detit, e të tretin armt i brezit.»"],
        ['10.4', 'Pleased, the king\'s daughter won her father\'s besa on it, and Aga Ymeri was set loose for home.', "Vajza e mretit u ba razi, edhe mreti besë i xu — me shkue n'shpi e ka lshue."],
      ],
      cast: {
        king: ['dungeon', 'demands three hundred purses, then gives his besa instead'],
        agaYmer: ['road', 'freed, and already riding for Ulqin'],
        princess: ['dungeon', 'has won her father\'s word on Aga Ymer\'s besa'],
      },
    },
    {
      id: 'ride', title: 'The ride home',
      note: 'He mounts at once and rides hard, reaching Ulqin within three hours.',
      lines: [
        ['11.1', 'He mounted at once and rode for home as fast as the horse could carry him.', "e ç'u nis ag-ja me shkue:"],
        ['11.2', 'Within three hours he had reached Ulqin.', "për tre sahat kapi Ulqinë."],
      ],
      cast: {
        agaYmer: ['road', 'closing on Ulqin at a gallop'],
      },
    },
    {
      id: 'spring', title: 'The White Spring',
      note: 'Halfway home he stops at Kroni i Bardhë and finds a wedding train resting under a pear tree — his own bride among them, riding to marry Ali Pasha. He tells them Aga Ymeri died three days ago, and asks leave to speak with the bride.',
      lines: [
        ['12.1', 'Halfway down the road he stopped at Kroni i Bardhë, the White Spring, and found a wedding party resting there under a pear tree — with the bride among them.', "N'gjysë të rruks kur ka shkue, vajt e ra te Kroni i Bardh; nji tubë krushq e gjet nën dardh, ç'j ka hasë ata me nuse."],
        ['12.2', 'Greetings passed; taken for a freed prisoner fresh off the road, he was asked whether he had word of Aga Ymeri.', "«Ndesha e mirë, o krushqellar! Mirë se vjen ti rabazan!» «Mirë se rrini, krushq darsmor!» «Mirë se vjen, o burgaxhi! Unë pa vij pej Spajet t'zez.» «Ti qi erdhe, burgaxhi, a je vesht për Aga Imerin, ti per tê a ke me dit?»"],
        ['12.3', 'He told them Aga Ymeri had died three days before — that he himself had washed the body, mourned him, and buried him with his own hands.', "«Unë jam vesht për t'zi [sic — OCR obscure], gjith të zitë për tê e kam — Aga Imeri na ka dek, tash tri dit në dhé ka hi; vetë e lava, vetë e kjava, të shtatat me dorë ja dava.»"],
        ['12.4', 'He asked leave to speak with the bride a moment; after a look passed between them, the wedding party granted it.', "«Amanet, o krushq darsmor, a kam tehir me folë me nuse?» T'tanë shikuen shoqishojn e ja dhanë tehirin: «hajt e fol, mar jabanxhi, s'isht adet, por fol kadal!»"],
      ],
      cast: {
        agaYmer: ['springRoad', 'stops the wedding train, still unknown to them'],
        weddingParty: ['springRoad', 'resting under the pear tree, riding the bride to Ali Pasha'],
        wife: ['springRoad', 'among the wedding party, not recognising the traveller'],
      },
    },
    {
      id: 'grief', title: 'The bride\'s answer',
      note: 'The bride blesses the news of her "dead" husband and wishes the new groom health. Asked, she says she could never know Aga Ymeri by sight — only by the mark on his arm his mother once told her of.',
      lines: [
        ['13.1', 'He greeted the bride on her horse; she returned it and asked him the same questions the others had.', "Nisi ag-ja me kuvendue: «ndesha e mirë, nuse në kal!» «Mirë se vjen ti, mare djal, mirë se vjen, o burgaxhi!» «Ka pa vjen, o burgaxhi?» «Unë pa vij pej Spajet t'zez.» «Ti qi erdhe, burgaxhi, a je vesh për Aga Imerin, ti per tê a ke me dit?»"],
        ['13.2', 'He repeated to her that Aga Ymeri had died three days before, and that his own hands had buried him.', "«Unë jam vesht për t'zjft e ti [sic — obscure], gjith te zitë për tê e kam — Aga Imeri na ka dek, tash tri dit në dhé ka hi; vetë e lava, vetë e kjava, të shtatat me dorë ja dava.»"],
        ['13.3', 'She asked a blessing be spoken for the dead man, and wished health instead to her new groom.', "Ç'ka qitë djali e i ka than: «a ma fal nji fill paj?» «Unë ta fali, more djal, për rahmet të Aga Imerit e për shndet të Ali Begut.»"],
        ['13.4', 'He asked whose bride she had been for one night, and for whom the wedding was held today; she named Aga Ymer first, then Ali Pasha.', "Djali nusen p'i pevet: «e kuja ke kjên nj'ere?» «E ati Agës Imer Ag.» «E kuja po bâhej sot?» «E ati çelës, Ali Pash.»"],
        ['13.5', 'He pressed her once more: if she saw Aga Ymeri himself, would she know him?', "«Amanet, moj vashë në kal: po m'i pa ti Aga Imerin a kishnjesh m'i njoftë, moj vash?»"],
        ['13.6', 'She said she could not — unlucky as she was, she had shared only one night with him in the house — but that she had been told he bore a mark on his arm.', "Edhe vasha i ka than: «qyqja unë, e ku ta njah? Sall nji natë me tê kam ndêjë, me tê nji natë kam ndêjë n'shpi. E zeza un, gjith çka dij, gjith çka dij, e zeza un, gjith ç'm'ka thanë qyqja kadnan, se e ka nji shenjë në llân.»"],
      ],
      cast: {
        wife: ['springRoad', 'mourns the man she thinks dead, and names his one true mark'],
        agaYmer: ['springRoad', 'still hidden, presses her for the proof that will unmake his disguise'],
      },
    },
    {
      id: 'scar', title: 'The mark on his arm',
      note: 'He bares his arm; she knows the mark at once, leaps from her horse, and renounces the wedding — sending the new groom a blessing of his own instead of herself. The wedding train scatters, and Aga Ymeri carries his wife home.',
      lines: [
        ['14.1', 'He pushed his sleeve up and let the old mark answer for him.', "Aga Imeri shih çka bani, shih çka bani Aga Imeri: shpërvuel mangën, qiti llânen."],
        ['14.2', 'The moment she saw it she knew him, leapt down off her white horse, and cried out.', "Kur e pa vasha nishanin, zhdrypi ajo kalit t'bardh, me të madhe hapi zanin:"],
        ['14.3', 'Wrong road, wedding-party, she called — I follow my first fate now.', "«Udha e marë, o krushqellar! Unë pa shkoj mas fatit 'par.»"],
        ['14.4', 'She sent Ali Pasha a blessing in her place instead — health and sons of his own one day, with Aga Ymeri and herself to stand as his godparents.', "«Nji selam te Ali Pasha, atje kjoft si ka kjen: ne na majt zoti shndén, për ne m'faltë zoti nji djal, ty ma t'parin d'baj kumar; për ne m'faltë zoti daj çik, ty ma t'parin të baj mik.»"],
        ['14.5', 'Not knowing now where to ride, the wedding train scattered singing, and Aga Ymeri took his true wife and carried her home.', "Ç'qiten krushqit edhe than: «na pa nu se ku da t'shkojm? Na kndojnë kangën, na marrojn.» Muer ag-ja vashën i ti, e muer, e çaj në shpi."],
      ],
      cast: {
        agaYmer: ['home', 'reunited, carries his wife back to his own tower'],
        wife: ['home', 'recognises her husband and turns her back on the second wedding'],
        weddingParty: ['road', 'scatter singing, uncertain now where to ride'],
        rival: ['weddingHouse', 'left with a blessing in place of a bride'],
      },
      items: {
        nishani: ['wife', 'seen and known — the proof no disguise could survive'],
      },
    },
    {
      id: 'besaKept', title: 'Back to the debt',
      note: 'The next day he sets out again to honour his pledge. The king\'s daughter has been watching for him; he arrives before the deadline, hailed by his fellow captives, and the king forgives the whole debt.',
      lines: [
        ['15.1', 'The next day he set out again, back toward the pledge he had sworn to the king\'s daughter.', "Vetë unis me shkue n'Spaj, atje ku besën kish dhan — vajza e mretit ish darzan."],
        ['15.2', 'When the sworn day came due, she watched for him from the court and told her waiting father: he\'s coming now.', "Km u mush koha me ardh, e bija mretit i del para. Mreti pa e peveten t'bin: «a pe gia, mori bi?» «Po, more bab, tash po vjen.»"],
        ['15.3', 'Aga Ymeri arrived, and in his greeting let slip how close her father had come to killing her for trusting him.', "Aga Imeri shpejt ja 'rrini: «mirë se erdhe, Ago Imer, se mue baba desht me m'pre!»"],
        ['15.4', 'His fellow captives came out to hail him — a true son of his people, who had kept the besa he gave.', "Të gjith shokt i dolën para: «mirë se erdhe, Imer Aga! Kjenke djalë e pika e djalit — majte besën i shqyptarit, majte besën qi ke dhan!»"],
        ['15.5', 'Seeing the pledge kept, the king spared his daughter\'s punishment and set Aga Ymeri wholly free.', "Mreti t'bin e ka fal, se mas t'ardhke Aga Imeri, besa t'binë ai desht m'i pre. Aga mretit i doli n'faqe. N'burk mreti ma s'e ka shti, për krejt e fali m'u kthye n'shpi."],
      ],
      cast: {
        agaYmer: ['freedom', 'arrives on the sworn day and is freed outright'],
        princess: ['besaChoice', 'has staked and won her father\'s besa on him'],
        king: ['besaChoice', 'forgives the whole debt, pledge kept'],
        captives: ['besaChoice', 'hail him as a man who kept his word'],
        wife: ['home', 'waits once more, this time for a homecoming that will hold'],
      },
    },
    {
      id: 'home', title: 'Home to Ulqin',
      note: 'Aga Ymeri returns to Ulqin for good and lives out his life there with his wife.',
      lines: [
        ['16.1', 'Aga Ymeri came home to Ulqin at last, and lived out his life there with his wife.', "Aga Imeri erth n'Ulqin, vazhdaj jetën me vashë t'ti."],
      ],
      cast: {
        agaYmer: ['home', 'settled for good'],
        wife: ['home', 'settled for good'],
        gatekeeper: ['home', 'still keeps the gate — the waiting she watched over, kept'],
      },
    },
  ],
}
