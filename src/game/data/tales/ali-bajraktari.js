// ===========================================================================
// TALE: Ali Bajraktari or the Word of Honour — see ../tales/_SCHEMA.md for
// the format contract. This file is owned by its tale: agents editing other
// tales must not touch it.
//
// A KRESHNIK SONG, not a prose tale — one of the Kângë Kreshnikësh (Songs of
// the Frontier Warriors). The lore card (folklore.js) cites two Palaj–Kurti
// numbers, "Ali Bajraktari / Besa" (no. 13) and "The Wedding of Ali
// Bajraktari" (no. 14) — but the fullest English telling findable, Robert
// Elsie & Janice Mathie-Heck's own published translation, runs the wedding
// and the besa as ONE continuous song (see discrepancies below). No scene
// for this song exists in the game yet; the halil-marriage chain
// (mujo1→mujoFund) and the death-of-omer chain (omer1-omerFund) already
// stage Jutbina itself, so this tale's own places are PROPOSED, a new
// chain to build off that same hub, exactly as mujo-courser's own places
// are. "Paragraphs" here are 25 narrative movements of my own division (the
// source prints the poem as one continuous block of verse, 332 lines after
// cleanup, no strophe numbers), and a "sentence" is one clause or one line
// of speech.
//
// ALBANIAN ORIGINAL: recovered 2026-07-15 over PLAIN HTTP — the live site's
// HTTPS is broken, but http:// works fine (a prior pass here wrongly claimed
// the site refuses the connection outright; it does not). Fetched with
// `curl -sL -m 30 -o v.pdf "http://www.albanianliterature.net/oralverse/verse_09_AL/verse_09_AL_12.pdf"`
// (7-page PDF, HTTP 200 first try, no Wayback needed), extracted with
// pdftotext, and saved raw to docs/references/palaj-kurti-ali-bajraktari.sq.txt.
// Every beat line below now carries the verbatim Albanian third element.
// ===========================================================================

export default {
  id: 'ali-bajraktari',
  title: 'Ali Bajraktari or the Word of Honour',
  source:
    'Sung by Palok Ujka of Kastrat (District of Malësia e Madhe); Visaret e Kombit, vol. II, ed. Bernardin Palaj & Donat Kurti (Tirana 1937), pp. 108-117; repr. Folklor shqiptar II, Epika legjendare (Cikli i kreshnikëve), Vëllimi i parë, ed. Qemal Haxhihasani (Tirana 1966), pp. 142-149 · read in R. Elsie & J. Mathie-Heck\'s translation (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Kastrat, District of Malësia e Madhe',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare I, 1966',
  },
  // THE ALBANIAN ORIGINAL — recovered over plain HTTP (see file header). A
  // prior pass here wrongly declared it unrecoverable; it was one curl away.
  albanian: {
    title: '«Ali Bajraktari (Besa)»',
    source:
      'Sung by Palok Ujka of Kastrat (District of Malësia e Madhe); Visaret e Kombit, vol. II, ed. Bernardin Palaj & Donat Kurti (Tirana 1937), pp. 108-117; repr. Folklor shqiptar II, Epika legjendare (Cikli i kreshnikëve), Vëllimi i parë, ed. Qemal Haxhihasani (Tirana 1966), pp. 142-149. PDF retrieved plain-HTTP from albanianliterature.net/oralverse/verse_09_AL/verse_09_AL_12.pdf, 2026-07-15. Gheg dialect, already modern orthography as printed — no transliteration performed.',
    local: 'docs/references/palaj-kurti-ali-bajraktari.sq.txt',
  },
  discrepancies: [
    'THE TWO SONGS THAT BECOME ONE: the lore card (folklore.js) cites two separate Palaj-Kurti numbers — no. 13 "Ali Bajraktari / Besa" and no. 14 "The Wedding of Ali Bajraktari." Robert Elsie\'s own published translation, the fullest English telling findable (Visaret e Kombit II, pp. 108-117), runs the wedding and the besa as ONE continuous song, "Ali Bajraktari or the Word of Honour." The beats follow this single combined telling; both halves of the lore card\'s summary are present within it.',
    'TWO AGED MOTHERS: late in the song, the household matron who greets the disguised Ali warmly calls him hers, as though Ali\'s own mother were still alive — yet Ali\'s own outburst to the king states plainly that his mother has died. The beats read these as two different women: Ali\'s own mother dies offstage during the three years\' wait (nenaAliut), and the matron who later greets him at Jutbina is Mujo and Halili\'s own mother (the core NPC nenaMujit, already the household\'s matriarch in the marriage and strength songs), grieving a "son" the way the whole household has come to. The Albanian even calls BOTH women by the same term of endearment, «baxhi» ("auntie" / dear old one) — Ali uses it of his own dead mother («kam pasë lanë nanën baxhi», 16.4) and the beggar-Ali greets Mujo\'s mother with it too («Mirë se të gjej, mori baxhi!», 20.1) — one more sign the song means two different women under one shared title, not one.',
    'WHERE THE MOTHER\'S DEATH IS ACTUALLY REVEALED: a prior pass here assumed the bride\'s own final letter (14.3/15.1-3) breaks the news of Ali\'s mother\'s death. It does not — the Albanian letter text (lines 161-165) says only that the bride has "waited with mother" the whole time and is now taking Halili as husband; nothing there says the mother has died. The death is instead revealed three beats later, in Ali\'s own outburst to the king (16.3-4): «Mora vesht se nana më ka dekë, / S\'ka kush nanën ma shtje n\'dhe, / Zogj e sorra nanën kanë me ma ngranë» ("I learned that mother has died on me, there is no one to lay her in the earth, crows and ravens will eat her") — Ali\'s own private grief, spoken only to the king, and never once connected aloud to the letter that triggered his scream. The beats follow the Albanian: 15.2\'s English gloss still says "his own mother has died," but its Albanian third element quotes the letter\'s real (unrelated) line and flags the mismatch inline; the death itself is sourced honestly at 16.4.',
    'THE UNSPOKEN GRIEF: to the king, Ali names only his mother\'s death as his reason for needing leave; the very letter that breaks him also carries his bride\'s remarriage, which he never once mentions aloud. The beats keep this exactly as the song leaves it — a private grief spoken only in part.',
    'WHY JUTBINA: the song never explains how Ali\'s widowed bride ends up dressed by thirty maidens under Mujo and Halili\'s own roof — the same frontier hub the game already gives them — an unexplained gap typical of oral-epic compression. The beats read it as hospitality: with Ali\'s own mother dead and Ali given up for lost, the wider frontier krahina (the very muster the bride threatens to call down on the false Ali at her own door) takes her in, and Halili, the cycle\'s other unmarried standard-bearer, steps forward to marry her.',
  ],
  // 25 narrative movements of my own division (332 verse lines total after
  // cleanup, no strophe breaks in the source); sentence counts per movement
  paragraphs: [3, 3, 4, 5, 3, 3, 4, 5, 4, 6, 4, 3, 4, 3, 3, 4, 4, 6, 3, 3, 6, 3, 5, 6, 2],
  cast: [
    { id: 'ali', name: 'Ali Bajraktari', note: 'a widow\'s only son, standard-bearer of his own frontier kulla — the word of honour kept twice over', npc: 'ali' },
    { id: 'nena', name: 'Ali\'s mother', note: 'the widow who raised him begging door to door; swears him the besa, and dies waiting', npc: 'nenaAliut' },
    { id: 'nusja', name: 'Ali\'s bride', note: 'unnamed in the song; sees through one impostor at her own door, waits three years for the other', npc: 'nusjaAliut' },
    { id: 'krajl', name: 'the king', note: 'catches Ali asleep on a hunt and jails him for good; relents only when his own daughter stands bail', npc: 'krajliAliut' },
    { id: 'rojat', name: 'the king\'s guards', note: 'ride down and bind the sleeping Ali at the king\'s word', npc: 'rojatHungareze' },
    { id: 'shkja', name: 'the double', note: 'dressed in Ali\'s own clothes and given his own horse and sabre to steal the bride by trick', npc: 'shkjaZevendesi' },
    { id: 'vajza', name: 'the king\'s daughter', note: 'stands bail for a prisoner\'s bare word — the only one in the hall who trusts it', npc: 'vajzaKrajlit' },
    { id: 'mujo', name: 'Mujo', note: 'greets the disguised Ali as a guest, weeps for his "death," and rides after the eloping pair once he understands', npc: 'mujo' },
    { id: 'halili', name: 'Halili', note: 'Mujo\'s brother, meant to marry the widowed bride; raises the alarm on the escape, wanting only the courser back', npc: 'halili' },
    { id: 'nenaMujit', name: 'Mujo and Halili\'s own mother', note: 'greets the beggar warmly on the veranda — the household\'s OTHER aged mother, not Ali\'s own', npc: 'nenaMujit' },
  ],
  // anchor = the game location this tale place inhabits. This is a NORTHERN
  // (Gheg) frontier song — mirrors are Jutbina and the frontier it faces,
  // never a southern legend-site, per THE SHARING RULE (reuse over invention).
  places: [
    { id: 'home', emoji: '🏘️', name: 'Ali\'s own kulla', note: 'a lone frontier household, his mother\'s hearth and his bride\'s barred door',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'a lone frontier kulla somewhere within the wider Jutbina krahina — the same frontier community whose muster the bride threatens to call down',
        mold: 'a border household of its own, separate from Mujo and Halili\'s own hearth: one widow, one son, one bride, and a door sworn shut to everyone but its master',
        conflicts: 'NOT Mujo\'s own stable/hearth or Osmani\'s household (mujo-courser\'s "home"/"osmani") — a third, separate kulla within the same broad krahina, its own family entirely',
        proposal: 'add a household node off jutbina for Ali\'s own isolated kulla and its barred door' } },
    { id: 'bjeshka', emoji: '⛰️', name: 'the high mountain spring', note: 'the bare flank above Jutbina, where Ali rests and is caught asleep',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank',
        mold: 'a bare, empty flank where wanderers cross paths — nobody owns the open mountainside; this tale adds a shaded spring where a tired rider stops to drink, and unwisely, sleeps',
        sharedWith: ['three-friends (reserved "muji-halili")', 'mujo-strength', 'mujo-courser', 'muji-e-behuri', 'mujo-avenges-halil', 'halil-marriage (the ora and the goats)', 'sari-salltek'] } },
    { id: 'mbretnia', emoji: '👑', name: 'the king\'s own kingdom', note: 'the hunting ground turned dungeon, and the hall where a besa is struck',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'the rival Christian Kingdom across the frontier — the kreshnik songs\' own standing enemy realm, seen here from its own side: a king\'s hunting party, his dungeon, his hall',
        mold: '"Krajl" is an epic TITLE the songs give many different antagonists, not one ruler — this tale\'s own king, his Hungarian guards, his dungeon and his daughter are their own court, none of them the same man or hall as Krajlo Kapedani (mujo-courser), the Krajl of New Kotor (halil-marriage), the Krajl of Zuku Bajraktar (rusha1/rushaFund), or the captain of Mujo Avenges Halili (mejdan1/mujoHak1)',
        conflicts: 'NOT any of those four already-claimed Krajl-courts, and NOT Arnaut Osmani\'s own burgu (a twelve-Aga dungeon undone from inside, a different shape of captivity entirely) — a sixth, separate king\'s realm',
        proposal: 'add a new node chain off jutbina (paralleling the halil-marriage and mujo-courser chains) for this king\'s hunting ground, his dungeon tower, and his hall' } },
    { id: 'jutbina', emoji: '🏘️', name: 'Mujo and Halili\'s own household', note: 'the hamlet hub where the beggar\'s disguise unfolds and the reunion is feasted',
      anchor: { status: 'existing', node: 'jutbina', mirror: 'Jutbina\'s own towers and plain — the hamlet the game already gives Mujo and Halili',
        mold: 'the hamlet\'s own hearth: this tale\'s second half plays out at Mujo and Halili\'s own door, courtyard and veranda — a beggar\'s welcome, alms for a dead man\'s soul, and a bride known again by an old mark on his brow',
        sharedWith: ['mujo-strength (the hamlet itself)', 'the halil-marriage chain', 'the death-of-omer chain', 'mujo-courser (its own home/pazar/fusha/osmani)', 'muji-e-behuri', 'mujo-avenges-halil'] } },
    { id: 'nusesFamilja', emoji: '❔', name: 'the bride\'s own family', note: 'wherever she is fetched from — never named',
      anchor: { status: 'offstage', mirror: 'wherever within the krahina Ali\'s mother\'s own attendants rode to fetch the bride — the song never says',
        mold: 'never staged — the attendants are sent out, and return with the finest maiden; that is all the song tells' } },
  ],
  items: [
    { id: 'kali', emoji: '🐎', name: 'Ali\'s own horse and sabre', note: 'stripped from him at the spring and handed to his double for the door-trick — never reclaimed' },
    { id: 'gjogu', emoji: '🐴', name: 'Mujo\'s own courser', note: 'lent, riderless, to carry Ali and his bride clear through the trap door — and ridden straight back by Mujo himself in the chase' },
    { id: 'lemosha', emoji: '🪙', name: 'alms for a dead man\'s soul', note: 'gold pressed into the beggar\'s own hand by Mujo, Halili and their mother, each mourning a man who is holding out his own palm' },
  ],
  // WITNESS projection — this Kreshnik song is referenced (heard at Jutbina),
  // not yet built as its own playable arc; a full build would embody Ali.
  play: {
    entry: 'double',
    stance: 'embodied',
    as: 'ali',
    role: 'You are Ali Bajraktari, standard-bearer of your own frontier kulla, held far from home. While you are away a Slav has dressed in your own clothes and taken your own horse, and now stands as a false Ali at your own barred door — the door your besa sworn to your mother keeps shut to everyone but you. Return and unmask the double, cut him down at the threshold he has usurped, and keep your word of honour twice over — or stay away, and let the impostor keep your door, your name, and the bride the oath was sworn over.',
    enter: 'a Slav double, in your own clothes and on your own horse, has taken your place at your own barred door while you are held far off — and to the people who cannot tell the difference, he is Ali now',
    from: 'aliBajr1',
    ending: 'aliBajrFund',
    scenes: {
      aliBajr1: 'double',
      aliBajrFund: 'wordKeptTwice',
      aliBajrKeq: 'deceived',
    },
    divergences: [
      { beat: 'double', note: 'Built from scratch. The whole first half of the song — the widow\'s son, the wedding, the besa sworn on the barred door, the hunt where Ali is caught asleep and jailed by the king — is compressed into the setup: you are simply Ali, held far off, with a Slav double already standing in your clothes at your own door. The playable stake is the one true hinge, return or stay away.' },
      { beat: 'wordKeptTwice', note: 'The song\'s long disguise-and-unmasking (Ali begging alms for his own soul, known at last by the mark beneath his hair) is staged as the good ending\'s turn: you come home and cut the false Ali down at the threshold, the people see the true standard-bearer, and the word of honour is kept twice over — the besa on the door and the name given back to its owner.' },
      { beat: 'deceived', note: 'The bad ending is the road the song never takes: you flee instead of coming home, and the double\'s lie stands. The Slav keeps the house, the barred door, your name, and the bride the besa was sworn over — the opened-door deception made permanent because no true Ali ever returns to undo it.' },
    ],
  },
  beats: [
    {
      id: 'birth', title: 'A widow\'s only son',
      note: 'A childless widow is granted a son by God and raises him hard, begging bread door to door — by twelve he has flocks and land of his own.',
      lines: [
        ['1.1', 'A widow with no husband is granted a son by God, and gives the boy a name to carry: Ali Bajraktari.', 'Ishte kenë njajo grueja e vejë, / Nji jetim zoti ja kish lanë, / Emën t’bukur nana i kish njitë, / Për emën i thojshin Ali Bajraktari.'],
        ['1.2', 'She raises him through real hardship, begging bread at other people\'s doors and dressing him in whatever rags she can find on the bushes.', 'Me gazep nana e kishte rritë, / E kish rritë me lypë të dyervet, / E kish veshë me floqe mbledhë ndër ferra.'],
        ['1.3', 'By the time he turns twelve, God has granted him flocks and land of his own.', 'Dymbdhetë vjeç djali ishte ba, / Gja e mall zoti i kishte dhanë,'],
      ],
      cast: {
        ali: ['home', 'grows up poor, raised on his mother\'s begging and rags'],
        nena: ['home', 'raises him alone, door to door for bread'],
        nusja: ['nusesFamilja', 'not yet met, waiting in her own family'],
        krajl: ['mbretnia', 'rules his own kingdom across the frontier, not yet met'],
        rojat: ['mbretnia', 'the king\'s own guards, not yet met'],
        shkja: ['mbretnia', 'waits unnamed in the king\'s own household, not yet met'],
        vajza: ['mbretnia', 'the king\'s own daughter, not yet met'],
        mujo: ['jutbina', 'kreshnik of Jutbina, not yet met'],
        halili: ['jutbina', 'Mujo\'s own brother, not yet met'],
        nenaMujit: ['jutbina', 'keeps the household\'s hearth, not yet met'],
      },
      items: { kali: ['ali', 'grows with him — his own horse and sabre, a boy\'s own inheritance'] },
    },
    {
      id: 'wedding', title: 'A bride brought home',
      note: 'His mother arranges a marriage; three weeks later, attendants fetch home the finest bride they can find.',
      lines: [
        ['2.1', 'His mother arranges a fine match for him and sets the wedding three weeks off.', 'Nji nuse t’bukur nana ja fejon, / Për tri javë orokun ja kish da.'],
        ['2.2', 'When the three weeks are up, she sends attendants out to fetch the bride.', 'Kur ishin mbushë plot tri javë, / Ka çue nana krushqit e nusen ja kish marrë,'],
        ['2.3', 'They return with the loveliest maiden to be found.', 'Kurrkund shoqja nuses s’i kish dalë!'],
      ],
      cast: {
        ali: ['home', 'married, still a young man'],
        nusja: ['home', 'brought home as the finest bride the attendants could find'],
      },
    },
    {
      id: 'seclusion', title: 'Shut behind his own door',
      note: 'Married, Ali develops one strange habit: for three years he never once leaves his own house, and his puzzled mother finally asks why.',
      lines: [
        ['3.1', 'Once married, Ali falls into one strange habit: for three whole years he never once sets foot outside his own house.', 'Por nji gabim djali e kish ba. / Për tri vjet jashtë deret nuk kish dalë'],
        ['3.2', 'His mother finally puts it to him — he lives shut in like a prisoner of his own walls.', 'Nana e vet ka qitë e i ka thanë: / - Ç’se t’martova, bir, të burgtova,'],
        ['3.3', 'He never once visits a friend.', 'Kurr ndër shokë, ti bir, nuk shkove,'],
        ['3.4', 'He has stopped seeing his own uncles and his late father\'s own companions.', 'As te dajat, bir, nuk dole, / Miqt e babës ti i harrove.'],
      ],
      cast: {
        ali: ['home', 'shut inside his own house for three years running'],
        nena: ['home', 'puzzled, finally asks her son why'],
        nusja: ['home', 'married into a house that never opens'],
      },
    },
    {
      id: 'besa', title: 'A besa for a barred door',
      note: 'Ali snaps at his mother, blaming her for too young a bride, and explains: his house sits right on the frontier, and he fears raiders the moment his back is turned. He makes her swear an oath — bar every visitor except himself — and she swears it exactly as asked.',
      lines: [
        ['4.1', 'Ali turns on his mother and tells her sharply to hold her tongue — the whole trouble is her own doing, marrying him to a bride so young.', 'I biri nanës ka qitë e i ka thanë: / - Lene zanin, nanë, zoti t’vraftë! / Sherret tueja, nanë, të tana janë, / Se tepër t’re nusen ma ke marrë'],
        ['4.2', 'He reminds her that their house sits right on the open frontier.', 'E n’kufi shpinë un e kam'],
        ['4.3', 'He is afraid that the moment he leaves, raiders will come, wreck the house, carry off his bride, and leave him with nothing but the road.', 'E sarajin vetëm un me e lanë, / Drue sarajin shkjau ka me ma djegë / Edhe nusen ka me ma grabitë, / E n’rrugë t’madhe t’mjerin ka me m’qitë.'],
        ['4.4', 'So he demands her besa: while he is gone, no visitor whatsoever gets past that threshold — only he himself may enter.', 'Besën e zotit në daç me ma dhanë, / Qi kurrkuj derën nuk ja çilë, / Për pa ardhë Alija, yt bir, / Due me dalë miqt, due me i shetitë.'],
        ['4.5', 'She swears it exactly as he asks — the door for no one else.', 'Besën e zotit nana ja ka dhanë, / Qi kurrkuj derën nuk ja çili / Për pa ardhë Alija em bir.'],
      ],
      cast: {
        ali: ['home', 'wins his mother\'s besa before he\'ll set out at all'],
        nena: ['home', 'swears the besa exactly as asked'],
      },
    },
    {
      id: 'departure', title: 'A curse on his own roof',
      note: 'Ali dresses, mounts, and rides out, cursing his own house as he goes, until he reaches the high mountain pastures, stops at a spring, drinks, and falls asleep.',
      lines: [
        ['5.1', 'Ali dresses, mounts his own courser, and finally sets out.', 'Ishte veshë Alija, ishte mbathë. / Në shpinë gjogut i kish ra / E ish nisë rrugën e e kish marrë.'],
        ['5.2', 'Looking back once at his own house, he curses it — may it know no luck, may the king\'s own crowbar strip its very roof-tiles.', 'Ishte kthye sarajin e e kish kqyrë, / Ka fillue sarajin e ma nemë: / - Ty saraj, thotë, hajri mos t’u pat, / Me qyski krajli të rrenoftë, / Qeremijat në Krajlni t’i çoftë,'],
        ['5.3', 'Then he rides on.', 'Ishte nisë djali, rrugës ka shkue.'],
        ['6.1', 'He comes at last to the high mountain pastures and stops to rest in the shade by a spring.', 'Nelt në bjeshkë kur ka dalë, / Ka ndeshë nji mriz e nji krue, / Ka xanë vend Alija me pushue,'],
        ['6.2', 'He drinks the cold water gladly.', 'Uj në gurrë asht ulë e ka pi;'],
        ['6.3', 'And there, resting, sleep takes him.', 'Uji prej boret në zemër i ka ra, / Gjumi i randë tu gurra e ka marrë.'],
      ],
      cast: {
        ali: ['bjeshka', 'rides out cursing his own house, then sleeps by a mountain spring'],
        nena: ['home', 'keeps the besa behind the barred door'],
        nusja: ['home', 'waits behind the barred door'],
      },
    },
    {
      id: 'captured', title: 'Caught asleep',
      note: 'The king, out hunting the same mountains, finds the sleeping stranger and orders his guards to seize him and claim his bride. They bind Ali and throw him into prison for good.',
      lines: [
        ['7.1', 'The king happens to be hunting those very mountains and comes upon the sleeping stranger.', 'Në bjeshkë krajli tuj gjue ishte kenë, / Sa mirë Alinë e kish pa!'],
        ['7.2', 'He points his guards at the stranger dozing by the water, unaware anyone is even nearby — the moment, he says, to seize him captive and lay claim to his bride.', 'Ç’ka qitë maxharvet e u ka thanë? / - Kqyrnie turkun, tu gurra ka ardhë, / Aspak beh ne nuk asht tuj na ba. / Ka ardhë koha turkun rob me e xanë, / Ka ardhë koha nusen me ja marrë.'],
        ['7.3', 'The guards ride down and bind the sleeping Ali before he can wake.', 'Përpjetë bjeshkës maxhart kishin dalë, / Kambësh e duerësh Alinë fjetun e kin lidhë,'],
        ['7.4', 'They carry him off and throw him into prison, meant to hold him there forever.', 'Thellë në burg Alinë e kin shti, / Për gjithmonë burgun ja kin pre.'],
      ],
      cast: {
        krajl: ['mbretnia', 'hunts the mountains, finds Ali asleep, and gives the order'],
        rojat: ['mbretnia', 'bind the sleeping Ali and carry him down to the dungeon'],
        ali: ['mbretnia', 'seized asleep, thrown into the king\'s own prison for good'],
      },
    },
    {
      id: 'double', title: 'A double dressed as Ali',
      note: 'The king gathers his people, picks a lookalike, dresses him in Ali\'s own clothes and mounts him on Ali\'s own horse with Ali\'s own sabre, and promises him riches if he can take the bride by trick. The double rides for Ali\'s own door.',
      lines: [
        ['8.1', 'The king calls his own people together.', 'Kqyr çka bani krajli për me ba! / Të tanë popullin aty e ka mbledhë'],
        ['8.2', 'He picks out a young man close enough to Ali\'s own look to pass for him.', 'E nji djalë si Alinë e ka gjetë,'],
        ['8.3', 'He dresses the double in Ali\'s own clothes and mounts him on Ali\'s own horse, sabre and all.', 'Ja ka pre petkat si t’Alisë, / Ja ka dhanë gjog e shpatë të tijat'],
        ['8.4', 'He promises the double riches for life if he can take the bride hostage by the trick.', 'E ç’ka qitë djalit e i ka thanë? / - Se në mujsh nusen me ja marrë, / Për gjithmonë zenjin kam me t’ba!'],
        ['8.5', 'The double rides straight for Ali\'s own door and calls out that Ali has come home.', 'Ishte nisë djali e kishte shkue. / Në derë nanës s’Alisë i ka trokllue. / - Ulu, nanë, thotë, derën me m’ja çilë, / Se ka ardhë Alija, yt bir,'],
      ],
      cast: {
        krajl: ['mbretnia', 'stages the whole trick'],
        shkja: ['home', 'rides to Ali\'s own door, dressed as him'],
        ali: ['mbretnia', 'imprisoned, knowing nothing of the trick'],
      },
      items: { kali: ['shkja', 'handed over for the disguise — Ali\'s own horse and sabre on another man\'s back'] },
    },
    {
      id: 'suspicion', title: 'Not her husband\'s voice',
      note: 'The overjoyed mother tells the bride to open, but the bride looks out first, sees through the disguise at once, and calls the impostor out: wrong voice, wrong horse.',
      lines: [
        ['9.1', 'Overjoyed, the mother calls to the bride to go and open the door — her son is home.', '- Lumja nana, t’madhe ka britë, / Ulu, nuse, derën, thotë, me e çilë, / Se ka ardhë Alija, em bir.'],
        ['9.2', 'The bride, well brought-up and wary, looks out the window first.', 'Bi sojnike nusja kish qillue, / Në pinxhere kryet e ka qitë,'],
        ['9.3', 'She sees through the disguise at once and warns her mother-in-law: this is no husband of hers.', 'Sa mirë shkjanë e ka pa, / Be në zotin nanës i kish ba: / - Djali i yt, burri i em nuk asht, / Por po asht shkjau, i biri i shkinës, / Qi ka ardhë mue me m’grabitë!'],
        ['9.4', 'She calls down to the impostor by what he is — his voice too rough for Ali\'s own, his horse too pale to be Ali\'s own courser.', 'Atherë nusja shkjaut i ka thanë: / - Ik andej, shkjau, i biri i shkinës, / Se nuk je Alija i ynë, / Por je shkjau, i biri i shkinës, / Qi kë ardhë mue me m’grabitë, / Se ma t’trashë zanin ma ke, / Ma i zbërdhuktë gjogu tek asht.'],
      ],
      cast: {
        nena: ['home', 'overjoyed, urges the bride to open'],
        nusja: ['home', 'checks first, and sees through the trick'],
        shkja: ['home', 'caught out at the door'],
      },
    },
    {
      id: 'deceived', title: 'A door opened by a lie',
      note: 'The impostor talks his way past her suspicion, cold water for his voice, beech leaves for his horse\'s colour, and threatens to break in. Frightened, she nearly rings the alarm instead, but he talks her out of that too, and she opens the door, only to be caught on the veranda as she tries to flee back up the stairs.',
      lines: [
        ['10.1', 'The impostor answers smoothly: the cold spring water roughened his voice, and beech leaves have paled his courser\'s coat.', 'Prap ç’ka qitë shkjau e i ka thanë: / - Ulu, nuse, derën me ma çilë, / Se uji i borës zanin ma ka çartë, / Gjethi i ahit gjogun e ka zbardhë,'],
        ['10.2', 'Force his way past the threshold, he swears, and he will leave nothing of her but scattered pieces.', 'Se, në basha un mbrendë me hi, / Copë me grimë un ty kam me t’gri.'],
        ['10.3', 'Frightened, she almost yields, but stalls: she means to climb the tower first and fire a shot to call the whole krahina to arms before she will open.', 'Tuta nusen pak e kish marrë. / Ç’ka qitë djalit prep e i ka thanë? / - Po dal n’beden t’sarajit, / Po e shprazi pushkën habertare, / Të marrin vesht Jutbinë e Krahinë, / Ata ktu kanë me ardhë, / Atherë derën kam me ta çilë.'],
        ['10.4', 'He talks her out of it — no man of Jutbina has come by in ages, he tells her, and locking out an only son would only bring her shame.', 'Prep ç’ka qitë djali e i ka thanë? / - Sa herë jashtë un qi kam me dalë, / Nuk kanë vakt agajt ktu me ardhë; / T’tanë Jutbina jashtë tek ka dalë, / T’tanë me ne janë tuj qeshë, / Kah s’ja çilni derën djalit t’vetëm.'],
        ['10.5', 'Taken in, she opens the door, then turns at once to flee back up the stairs.', 'Atherë nusja ishte trathtue, / Ishte ulë, derën e e kish çilë, / N’vrap për shkallë nelt ka hipë,'],
        ['10.6', 'But he catches her on the veranda before she can climb clear.', 'Për mbas saj shkjau asht njitë, / Në çardak nusen e ka xanë,'],
      ],
      cast: {
        nusja: ['home', 'deceived into opening, and caught on her own veranda'],
        shkja: ['home', 'talks his way in and seizes her'],
      },
    },
    {
      id: 'cryForHelp', title: 'A cry that scares him off',
      note: 'She cries out to arms, and even with his hand already on her, the impostor loses his nerve and flees empty-handed. He reports back to the king, half-lying that he truly had her, and praises her beauty.',
      lines: [
        ['11.1', 'She cries out for the frontier to arm itself.', '- Ju, kushtrim, nusja ka bërtitë.'],
        ['11.2', 'Even with his hand already closed on her, the impostor panics and lets go, fleeing without her.', 'Mera e madhe shkjaut i ka hi, / Dorën mbas grushti nuses ja ka kapë, / Ishte dredhë pa nuse e ka ikë.'],
        ['11.3', 'Back before the king, he swears he truly had his hand on her — only her own cry for help drove him off.', 'Fill te krajli shkjau ka dalë, / Be në zotin shkjau i ka ba, / Qi dorën n’dorë ja kam pasë kapë, / Por”kushtrim” nusja ka britë, / Mera e madhe më ka hi, / M’asht dhanë ika e kam ikë.'],
        ['11.4', 'He adds that he has never seen a fairer face.', 'Be në zotin prap krajlit i ka ba: / - Ç’se kam le, ma t’bukur nuk kam pa!'],
      ],
      cast: {
        nusja: ['home', 'drives him off with her own cry'],
        shkja: ['mbretnia', 'flees back and reports, half-truthfully'],
        krajl: ['mbretnia', 'hears the failed report'],
      },
    },
    {
      id: 'letter', title: 'Choose another husband',
      note: 'The king tells the double patience will win her yet, then writes the bride himself: Ali is his prisoner for good, so she should choose another husband.',
      lines: [
        ['12.1', 'The king tells the double not to worry — patience will win her slowly and surely.', 'Atherë krajli ç’ka qitë e i ka thanë: / - Aspak merak, djalë, mos u ban, / Dalëkadalë e jona ka me kenë.'],
        ['12.2', 'He writes the bride a letter of his own: she may be Ali\'s bride, but Ali is his prisoner for good, and she should choose herself a new husband.', 'Atherë krajli nji letër e shkruen, / Ç’ka qitë n’letër e po i shkruen: / - Ti qi je nusja e Alisë, / Merre ‘i burrë ku t’duesh vetë, / Se Alinë në burg e ke / E për gjithmonë burgun ja kam pre.'],
        ['12.3', 'He sends it to her.', 'Fill n’dorë t’nuses ja ka çue. [the source actually places this line before the quoted letter text above, not after — reordered here to match the English split into two sentences]'],
      ],
      cast: {
        krajl: ['mbretnia', 'writes and sends the bride his own letter'],
        shkja: ['mbretnia', 'reassured, done with his part'],
        nusja: ['home', 'about to receive it'],
      },
    },
    {
      id: 'vow', title: 'Three years, on her own word',
      note: 'The bride reads the letter in tears; her mother-in-law asks what\'s wrong, since she has never once cried over a letter before. The bride explains, and vows to wait three years, writing and trying every way to free him, but to remarry if that fails.',
      lines: [
        ['13.1', 'The bride reads the letter and weeps over it.', 'Letra nuses në dorë i ka ra, / T’tanë me lot e mjera e ka kja.'],
        ['13.2', 'Her mother-in-law asks what it says — she has watched the bride read many letters, but never once seen her cry over one.', 'Nana e vet ka qitë e e ka pvetë: / - Ajo letër, nuse, zot, ç’do t’jetë? / Shum letra, nuse, ti ke marrë, / Por asnji me lot nuk e ke kja.'],
        ['13.3', 'The bride explains: Ali is imprisoned for good.', 'Atherë nusja nanës i ka thanë: / - Po thonë, se Alinë e kanë xanë / Edhe n’burg e kanë shti, / Për gjithmonë burgun ja kanë pre;'],
        ['13.4', 'She vows to wait three full years, writing to him and trying every way she can to free him — but if three years pass and nothing works, she will take another husband.', 'Por tri vjet, nanë, un due me e pritë, / Tri vjet, nanë, me letra due me e lypë, / Si në mujsha kudo të gjallë me e gjetë, / Me ty, nanë, kam me dekë; / Si n’mos mujsha me e gjetë për tri vjet, / Atherë nji burrë tash e zgiedh.'],
      ],
      cast: {
        nusja: ['home', 'vows to wait three years before she\'ll remarry'],
        nena: ['home', 'asks after the letter, still alive'],
      },
    },
    {
      id: 'choice', title: 'Mother\'s died, and the wait is over',
      note: 'Three years pass unanswered, and the bride chooses Halili instead. She writes one final letter: if Ali still lives he must answer now, she has waited long enough, and in three weeks she\'ll be wed. (The mother\'s own death is never in this letter — Ali reveals it himself, later, to the king.)',
      lines: [
        ['14.1', 'Three years go by without a single answer to her letters.', 'Tri vjet rresht me letra e ka lypë, / Kurr xhevap nusja nuk kish marrë.'],
        ['14.2', 'She chooses to marry Sokol Halili instead.', 'Atherë nusja asht fejue, / Fejue e ka Sokol Halili.'],
        ['14.3', 'She sits down to write one final letter.', 'Por prep nusja nji letër e ka shkrue. / Ç’ka qitë n’letër e i ka thanë?'],
        ['15.1', 'If Ali is still alive, she tells him, he must answer at once.', '- Si në kjosh, Ali, kund gjallë. / Sa ma parë xhevap mue me m’dhanë,'],
        ['15.2', 'His own mother has died in the meantime, and she has waited long enough.', 'Se gjithmonë me nanën kam me t’ndejë, [sic — the letter\'s own words say only "for I have waited with mother the whole time," not that the mother has died; see the discrepancies note "WHERE THE MOTHER\'S DEATH IS ACTUALLY REVEALED" — that news comes later, at 16.4]'],
        ['15.3', 'In three weeks, she writes, she will be taken as Halili\'s bride.', 'Se un nji burrë e kam xanë, / Para tri javve krushqit vijnë me m’marrë.'],
      ],
      cast: {
        nusja: ['jutbina', 'gives up the wait, chooses Halili, and sends one last letter'],
        nena: ['home', '☠ dead sometime during the three years — Ali does not yet know it; he learns it only later, from his own grief when the king questions his scream (see the "scream" beat)'],
        halili: ['jutbina', 'agreed on, sight unseen, once the three years run out'],
      },
      exit: ['nena'],
    },
    {
      id: 'scream', title: 'A scream that shakes the walls',
      note: 'Ali reads the letter and screams so hard the prison itself seems to shake. The king comes down guessing at trivial causes, but Ali names the true reason: his mother, dead and unburied, with no one left to dig her grave.',
      lines: [
        ['16.1', 'Ali reads the letter.', 'Ajo letër Alisë në dorë i ka ra. / Ka fillue letrën e e ka kndue,'],
        ['16.2', 'He lets out a scream so raw the very walls of the prison seem to shake.', 'Sa t’madhe Alija ka britë, / Sa tjegullat krajlit i janë dridhë.'],
        ['16.3', 'The king comes down and guesses at small things — is it his uncut beard, the mud he has stood in, his one dirty shirt?', 'Atherë krajli ka qitë e ka pvetë: / - Ç’ke, Ali, kaq t’madhe si bërtet? / A t’ka mërzitë mjekra për pa u rrue, / A balta deri n’gju, / A kmishat pa i ndrrue?'],
        ['16.4', 'Ali tells him none of that matters — his own mother has died alone and unburied, and there is no one left to dig her grave.', 'Ç’ka qitë Alija e i ka thanë? / - Asnji asosh, krajl, nuk janë. / S’ma ka mërzitë mjekrra pa u rrue, / S’ma ka mërzitë balta der n’gju, / S’ma ka mërzitë vesha pa u ndrrue; / Por kam pasë lanë nanën baxhi, / E kam lanë vetun në shpi. / Mora vesht se nana më ka dekë, / S’ka kush nanën ma shtje n’dhe, / Zogj e sorra nanën kanë me ma ngranë.'],
      ],
      cast: {
        ali: ['mbretnia', 'breaks down over the letter'],
        krajl: ['mbretnia', 'comes to ask what is wrong'],
      },
    },
    {
      id: 'bail', title: 'Six days, on my word alone',
      note: 'Ali has no bail to offer but his own word of honour — six days, and he\'ll return. The king won\'t trust it until his own daughter offers to take Ali\'s whole sentence on herself. Persuaded, the king lets him go.',
      lines: [
        ['17.1', 'Ali tells the king he has no bail to give but his own word of honour — grant him six days, and he swears by God he will be back.', 'Në daç besë mue me m’xanë, / Njimend qefil s’kam ku me t’marrë, / Por nji qefil po ta nap të madh, / Se po t’nap zotin, qi m’ka dhanë, / Qi sot gjashtë ditë ktu prep kam me kanë.'],
        ['17.2', 'The king will not trust a prisoner\'s bare word.', 'Aspak krajli besë nuk i ka xanë.'],
        ['17.3', 'The king\'s own daughter speaks up: she will stand bail herself, and take on Ali\'s whole sentence if he fails to return.', 'E bija e krajlit babës i ka thanë: / - Për Alinë qefil jam vetë, / T’tanë gazepet un kam me i hjekë, / N’kjoftë se Alija sot gjashtë dit nuk vjen.'],
        ['17.4', 'Persuaded, the king agrees and lets Ali go.', 'Atherë krajli e ka lshue, / Për shpi Alija asht fillue.'],
      ],
      cast: {
        ali: ['mbretnia', 'wins six days on his own sworn word'],
        krajl: ['mbretnia', 'refuses, then relents'],
        vajza: ['mbretnia', 'stands bail on his behalf'],
      },
    },
    {
      id: 'beggarAtMujos', title: 'A beggar at Mujo\'s door',
      note: 'Ali reaches Jutbina in a beggar\'s rags and meets Mujo first. Asked for news of Ali Bajraktari, he claims he shared Ali\'s cell, that Ali died there and he threw the bones out the window himself, but that Ali left one last word for his bride. Weeping, Mujo hands him a hundred gold coins for the dead man\'s soul, and tells him how to reach the guarded bride.',
      lines: [
        ['18.1', 'Ali reaches Jutbina in a beggar\'s rags and finds Mujo first.', 'Kur te shpija Alija ka shkue, / Ka ndeshë n’Bylykbashe Mujin.'],
        ['18.2', 'They trade greetings, and Mujo, taking him for a stranger, welcomes him and asks where he is from and bound.', '- Mirë se të gjej, i thotë, burri dai! / - Mirë së vjen, lypsi fukara! / Ka qitë Muji e ma pvetë: / - Për kah shkon, ti lyps, a prej kah vjen?'],
        ['18.3', 'Ali tells him only that he was let out of prison that very day, giving no name of his own.', 'Qet Alija Mujit e i ka thane: / - Fill prej burgut sot kam dalë.'],
        ['18.4', 'Mujo asks if he has any word of Ali Bajraktari, taken by the king three years back.', '- Po a din gja mue me m’kuvendë, / Për Ali Bajraktarin? / Tesh tri vjet krajli na e ka xanë.'],
        ['18.5', 'Ali claims he shared that very cell, that Ali died there and rotted, that he threw the bones out the window with his own hands, but that Ali left one last message meant for his bride.', 'Atherë Alija ka qitë e i ka thanë: / - N’nji burg me Alinë kam ndejë, / N’burg Alija ka dekë, / Për pinxhere eshtnit ja kam tretë, / Se pat nisë hapsanen me ma qelbë; / Por nji fjalë Alija amanet ma ka lanë, / Vetëm nuses me ja thanë.'],
        ['18.6', 'Weeping, Mujo presses a hundred gold coins into his hand for the dead man\'s soul, and tells him: thirty maidens now guard the bride\'s own room, and if they will not open, he need only shout Mujo\'s own name.', 'Lott për faqe Mujit po i bijnë / E e ka shti dorën në xhep, / Ja ka falë njiqind orum të verdhë, / Për shpirt t’Alisë po ja nep. / Prep Muji i ka thanë: / - Tridhetë dada nusen janë tu e veshë, / Si në bashin derën mos me e çilë, / T’madhe,”Mujo” ke me thirrë.'],
      ],
      cast: {
        ali: ['jutbina', 'arrives disguised, and spins the false tale of Ali\'s own death for Mujo'],
        mujo: ['jutbina', 'weeps for the man he believes dead, pays for his soul, and hands over the way in'],
      },
      items: { lemosha: ['ali', 'a hundred gold coins pressed into his own hand — alms for his own soul'] },
    },
    {
      id: 'almsCollected', title: 'Alms for his own soul',
      note: 'In the courtyard he meets Halili, the same exchange, the same false report, fifty more gold coins. On the veranda he meets the household\'s own aged mother, who weeps and empties her pocket too.',
      lines: [
        ['19.1', 'In the courtyard Ali meets Halili, and the same exchange plays out between them.', 'Kur n’oborr Alija ka vojtë, / Kishte ndeshë n’Sokole Halilin. / - Mirë se të gjej, burri dai! / - Mirë se vjen, lypsi fukara! / Ka fillue Halili e e pvetë: / - Për kah shkon, ti lyps, a prej kah vjen? / Atherë Alija i ka thanë: / - Prej Krajlnijet jam tue ardhë, / Sot prej burgut un kam dalë. / - A din gja, lyps, me na kuvendë / Për Ali Bajraktarin?'],
        ['19.2', 'Ali repeats the same false report — Ali died in that cell, and he threw the bones out with his own hands.', 'Tesh tri vjet krajli na e ka xanë. / - Bashkë n’nji burg me Alinë kam kanë, / Alija n’burg ka dekë, / Për pinxhere eshtnit ja kam tretë, / Se pat nisë hapsanen me ma qelbë.'],
        ['19.3', 'Weeping, Halili hands over fifty gold coins for the dead man\'s soul.', 'Lott për faqe Halilit i bijnë / E e ka shti dorën në xhep, / Ja ka falë pesdhetë orum të verdhë, / Për shpirt t’Alisë po ja nep.'],
        ['20.1', 'On the veranda he meets the household\'s own aged mother.', 'N’derë t’çardakut kur ka hi, / Na ka ndeshë nanën baxhi.'],
        ['20.2', 'She, too, asks after Ali and hears the very same false report.', '- Mirë se të gjej, mori baxhi! / - Mirë se vjen, lypsi fukara! / Atherë nana ka nisë e e ka pvetë: / - Për kah shkon, ti lyps, a prej kah vjen? / - Fill prej krajlit jam tue erdhë, / Sot prej burgut un kam dalë. / - Pash zotin, lyps, qi të ka dhanë, / A din gja mue me m’kuvendë / Për Ali Bajraktarin, djalin tem? / - Ti, mori baxhi, kjosh vetë, / Se Alija në burg t’ka dekë. / Për pinxhere eshtnit ja kam tretë, / Se pat nisë hapsanen me ma qelbë.'],
        ['20.3', 'She weeps and empties her own pocket of coins for his soul as well.', 'Lott për faqe nanës po i bijnë / E e ka shti dorën në xhep, / Ja ka falë paret pa njehë, / Për shpirt t’birit po ja nep.'],
      ],
      cast: {
        ali: ['jutbina', 'keeps up the disguise, collecting alms for his own soul from Halili and the household\'s own mother'],
        halili: ['jutbina', 'weeps and pays too, still no wiser'],
        nenaMujit: ['jutbina', 'weeps and gives what she has'],
      },
      items: { lemosha: ['ali', 'grown heavier still — coins from Halili and the household\'s own mother besides'] },
    },
    {
      id: 'markOnBrow', title: 'The mark beneath his hair',
      note: 'The guarding maids won\'t open for him; he calls out loudly, and Mujo clears the room. The bride, not recognizing the beggar, hears the same false report and weeps too, until she spots an old mark on his forehead beneath his long hair. He brushes the hair aside; she knows him at once, and sends him to bathe.',
      lines: [
        ['21.1', 'Ali climbs to the bride\'s own room, but the guarding maids refuse to let him in.', 'Në derë t’odës Alija ka shkue, / Derën e odës dadat s’ja kin çilë.'],
        ['21.2', 'He calls out loudly, as Mujo told him to.', 'Sa t’madhe Alija ka thirrë!'],
        ['21.3', 'Mujo comes at once, clears out all thirty maidens, and lets him through.', 'Atherë Muji nelt ka hipë, / Tridhetë dadat jashtë i ka qitë, / Mbrendë Alinë e ka shti.'],
        ['21.4', 'The bride, not knowing the ragged man before her, asks the same question she has asked all day.', 'Atherë nusja ka qitë e e ka pvetë: / - Për kah shkon, ti lyps, a prej kah vjen?'],
        ['21.5', 'She hears the same false report, that her own husband died in that cell, and weeps in her turn.', '- Fill prej Krajlnijet jam tue ardhë / E tesh prej burgut un kam dalë, / - Po a din gja, ti, mue me m’kuvendë / Për Ali Bajraktarin, burrin tem, / Qe tash tri vjet rob krajli e ka xanë. / - Bashkë n’nji burg me te kam ndejë / Edhe Alija n’burg ka dekë, / Për pinxhere eshtnit ja kam tretë. / Lott për faqe nuses po m’i bijnë.'],
        ['21.6', 'His long hair has hidden it all this while, but she spots the mark above his brow; he sweeps his hair back, and she knows her real husband on the spot, sending him to wash.', 'Nji shej n’ballë Alija e kish, / Flokët e mdhaj shejin ja kin xanë, / Përpjetë flokvet u ka dhanë. / Sa mirë nusja shejin ja ka pa / Edhe nusja atherë ish kujtue, / N’hamanxhik e ka çue,'],
      ],
      cast: {
        ali: ['jutbina', 'known by the mark on his own brow'],
        nusja: ['jutbina', 'recognizes her true husband beneath the disguise'],
        mujo: ['jutbina', 'clears the room for him, still none the wiser'],
      },
    },
    {
      id: 'trapDoor', title: 'Through the trap door',
      note: 'Washed and dressed, Ali and his bride slip away together through a trap door and ride off on Mujo\'s own courser. Halili spots them and warns Mujo it was a Slav thief, caring nothing for the bride, only for the courser.',
      lines: [
        ['22.1', 'Washed and dressed in fresh clothes, Ali and his bride slip out together through a trap door.', 'Asht la Alija e ndrrue, / Për kapanxhjet me nuse janë ulë,'],
        ['22.2', 'They mount Mujo\'s own courser and ride off.', 'Në shpinë gjogut t’Mujit i kanë hipë / E janë nisë të dy me ikë,'],
        ['22.3', 'Halili spots them going and hurries to warn Mujo: that was no beggar at all, but a Slav thief — he cares nothing for the bride, only for getting the courser back.', 'Halili atherë i ka pa, / Ka qitë Mujit e i ka thanë: / - Ky s’kje lypsi fukara, / Por kenka kenë shkjau i biri i shkinës. / Mirë për nuse dert s’po kam, / Gjogun tand ku kem’ me e marrë?'],
      ],
      cast: {
        ali: ['bjeshka', 'rides off with his own bride, on Mujo\'s own courser'],
        nusja: ['bjeshka', 'escapes with him at last'],
        halili: ['jutbina', 'raises the alarm, still thinking him a thief'],
        mujo: ['jutbina', 'hears Halili\'s warning'],
      },
      items: { gjogu: ['ali', 'carries the eloping pair clear of Jutbina'] },
    },
    {
      id: 'reconciled', title: 'Only his own',
      note: 'Mujo tells Halili not to be a fool, the man has only taken back what\'s his own, then mounts Halili\'s pony and gallops after them, catching up on the mountain. Ali swears he\'s taken nothing but his own; Mujo answers warmly with a double celebration, and six days of feasting follow.',
      lines: [
        ['23.1', 'Mujo tells Halili not to be a fool — the man has only taken back what already belonged to him.', 'Atherë Muji Halilit i ka thanë: / - Largou, more budalla i marrë, / Se i zoti gjanë e vet m’duket se ka marrë.'],
        ['23.2', 'Mujo mounts Halili\'s own pony and gallops after the pair, catching them on the high mountain pastures.', 'Në shpinë t’mazit t’Halilit Muji ka hipë, / Vrap mazit i ka dhanë, / Nalt në bjeshkë Muji e ka xanë.'],
        ['23.3', 'Fearing pursuit, Ali swears by God he has taken nothing that was not already his own.', 'Atherë Alija i ka thanë: / - Pasha zotin, Mujo, qi m’ka dhanë, / Gjanë teme un kam marrë.'],
        ['23.4', 'Mujo answers warmly: let there be two celebrations instead of trouble — one for the bride won back, one for Ali\'s own safe return.', 'Atherë Muji prëp i ka thanë: / - Na dy darsma, Ali, duem me ba, / Nji për nuse qi ke marrë / E tjetrën pse po e dijmë se je gjallë.'],
        ['23.5', 'Six days of feasting follow.', 'Gjashtë dit darsëm kanë ba,'],
      ],
      cast: {
        mujo: ['bjeshka', 'catches them, and turns the chase into a welcome'],
        ali: ['jutbina', 'feasts at Jutbina for six days, safe at last'],
        nusja: ['jutbina', 'feasts alongside him'],
        halili: ['jutbina', 'feasts too, his suspicion undone'],
      },
      items: { gjogu: ['jutbina', 'brought back home once the chase turns to celebration'] },
    },
    {
      id: 'wordKeptTwice', title: 'Word of honour, twice kept',
      note: 'The sixth day arrives, and Ali breaks the news to his bride — the king\'s own daughter staked her word on his return, and honouring that pledge matters more than staying, even in Jutbina. He rides for the Kingdom, where the king\'s own servants mistake him for an honoured guest.',
      lines: [
        ['24.1', 'The sixth day comes round, and Ali breaks the news to his bride: duty is calling him away, back across the frontier.', 'Kur janë mbushë plot gjashtë dit, / Alija nuses i ka thanë: / - Prep n’Krajli m’duhet me dalë,'],
        ['24.2', 'He gave the king his own word of honour to return within six days.', 'Pse besën e zotit krajlit ja kam dhanë, / Sot gjashtë dit aty prep me kanë.'],
        ['24.3', 'The king only freed him at all because his own daughter stood bail, promising to take his sentence herself if he failed to return — and Ali will not betray a trust like that, even if it costs him everything he has just won back.', 'Aspak besë krajli s’më ka xanë, / E bija e krajlit qefil m’asht ba. / Atherë krajli m’ka lanë me ardhë / E s’mundi në rrenë çikën me ë lanë, / me e dijtë se ma n’Jutbinë s’kam me ardhë.'],
        ['24.4', 'He mounts his courser and rides back to the Kingdom.', 'Në shpinë gjogut i ka ra, / Në Krajli Alija prep ka dalë,'],
        ['24.5', 'The king\'s own servants come out to receive him, mistaking him for an honoured guest.', 'Tevabija përpara i ka dalë, / Duen gjogun Alisë me ja marrë, / Se kujtojnë, se mysafir asht.'],
        ['24.6', 'Ali sets them straight: he is no guest — tell the king only that he has come back, exactly as sworn.', 'Atherë Alija ka thanë: / - Mysafir un nuk jam, / Diftoni krajlit, se kam ardhë,'],
      ],
      cast: {
        ali: ['mbretnia', 'rides back exactly as sworn, correcting the servants who mistake him for a guest'],
        nusja: ['jutbina', 'stays behind, waiting once more'],
        krajl: ['mbretnia', 'not yet told his prisoner has returned'],
      },
    },
    {
      id: 'freedForGood', title: 'Freedom for a kept word',
      note: 'The king comes down himself, sees Ali standing at the door exactly as promised, and praises him for keeping his word. Ali sets off for home again, this time for good.',
      lines: [
        ['25.1', 'The king comes down to the door himself, sees Ali standing there, and praises him: he has kept his own word exactly.', 'Atherë krajli në derë ka dalë / E Alinë aty e ka pa, / Ka qitë Alisë e i ka thanë: / - Hajt, Ali, t’kjoftë rruga e mbarë, / Se besnik ti kenke kanë.'],
        ['25.2', 'And so Ali sets off for home again — this time for good.', 'E në shpi Alija prep ka dalë.'],
      ],
      cast: {
        krajl: ['mbretnia', 'praises Ali and frees him for good'],
        vajza: ['mbretnia', 'her own bail no longer needed'],
        ali: ['jutbina', 'comes home free at last'],
        nusja: ['jutbina', 'reunited with him for good'],
      },
    },
  ],
}
