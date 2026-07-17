// ===========================================================================
// TALE: Zuku Bajraktar — the standard-bearer and the bride won by besa —
// see ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// TWO KRESHNIK SONGS, one standard-bearer's name, two different reckonings
// (the folklore card names both): "Zuku Bajraktar" (Elsie/Mathie-Heck no. 10,
// Palaj-Kurti no. 11) — his own mother, in league with a captive she desires,
// has the too-strong Zuku blinded; an ora heals him and he burns her for it —
// and "Zuku Captures Rusha" (no. 14, Palaj-Kurti no. 18) — taunted by Mujo, he
// rides for the Krajl's daughter and wins her by a besa and a horse-race, not
// the sword. Verse lines run close to 1:1 EN/AL (see the reference file), so
// "paragraphs" here are narrative strophes and a "sentence" is a punctuation-
// bounded verse-group of 1-7 lines; the Albanian third element is the verbatim
// verse group, lines joined with " / ". The game ALREADY STAGES condensed
// versions of both songs as side-quests off Jutbina — zuku1/zuku2/zukuFund
// (the blinded hero) and rusha1/rushaFund/rushaKeq (the besa-won bride) — the
// beats anchor onto that exact ground; this file gives the full songs behind
// both.
// ===========================================================================

export default {
  id: 'zuku-bajraktar',
  title: 'Zuku Bajraktar — the standard-bearer and the bride won by besa',
  source:
    'Two songs of the Kângë Kreshnikësh: "Zuku Bajraktar" (recorded in Shala, District of Shkodra) and "Zuku merr Rushën" (sung by Dedë Zefi of Curraj i Epërm, District of Tropoja); Visaret e Kombit II, ed. B. Palaj & D. Kurti (Tirana 1937), pp. 89-96 and 140-145, repr. Folklor shqiptar II, Epika legjendare I, ed. Q. Haxhihasani (Tirana 1966), pp. 126-132 and 169-174 · read in R. Elsie & J. Mathie-Heck\'s translation (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Shala and Curraj i Epërm, District of Shkodra / Tropoja',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare I, 1966',
  },
  albanian: {
    title: '«Zuku Bajraktar» / «Zuku merr Rushën»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 89-96 and 140-145, in the embedded Albanian PDFs Elsie & Mathie-Heck published beside their translations — the edition\'s Gheg orthography kept verbatim (already modern-alphabet; no transliteration needed), apostrophes marking the source\'s own elisions',
    local: 'docs/references/palaj-kurti-zuku-bajraktar.sq.txt',
  },
  discrepancies: [
    'THE UNCLE, NOT THE GRANDFATHER (¶9.1): AL «Si nuk je ma trim se axha» — axha is the paternal UNCLE; Elsie\'s translation gives "your granddad." The beats follow the Albanian and keep "uncle."',
    'WHOSE EYES, AT LINE 105 OF SONG 1 (¶12.2): the Albanian\'s dative pronoun (“…ja verbon”) is genuinely ambiguous on the page as to father/it; the courser\'s own laments in the very next lines confirm it is the COURSER blinded alongside Zuku, matching Elsie\'s reading. Noted here only because the raw text invites the misreading.',
    'THE BESA RUSHA SWEARS (¶48.2): the game\'s existing folklore card glosses this as Zuku refusing "to carry her off until she swore that she came of her own free will" — but the verse itself has him demand only «besën e zotit, qi si t\'tham ke me m\'ndigjue» ("your besa that you\'ll do just as I tell you") — an oath of OBEDIENCE, not a stated free choice. The beats follow the verse\'s own wording; the free-will reading is the frame later tellings (including this game\'s own rushaFund blurb) put on it.',
    'WHAT A "BALOZ" IS HERE: nothing in either song calls Baloz Sedelija a sea-monster or gives him any monstrous trait — he rides, talks, plots and dies exactly like the human shkja captain he is introduced as. The game\'s own pre-existing zukuFund side-quest blurb borrows the sea-monster image from the core Balozi i Detit / Gjergj-Elez-Alia baloz; this tale\'s Baloz Sedelija is a distinct, fully human enemy captain — "baloz" names a RANK here, not a species (see balozSedelija\'s NPC entry).',
  ],
  // Song 1 "Zuku Bajraktar": 30 strophes (¶1-30). Song 2 "Zuku merr Rushën"
  // continues the same numbering: 28 strophes (¶31-58). Sentence counts below.
  paragraphs: [
    2, 2, 3, 3, 2, 2, 3, 3, 3, 3, 4, 3, 3, 3, 2, 2, 2, 3, 3, 3, 1, 4, 4, 3, 4, 3, 3, 2, 3, 4,
    1, 3, 2, 1, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 3, 4, 2, 3, 3, 1, 2, 2, 2, 1, 2, 2, 2, 3,
  ],
  cast: [
    { id: 'zuku', name: 'Zuku Bajraktari', note: 'the standard-bearer — blinded by his own mother, healed by the oras, who also rides for Rusha across the frontier', npc: 'zuku' },
    { id: 'nenaZukut', name: 'e ëma e Zukut', note: 'unnamed in both songs; desires her son\'s own captive and has the boy blinded for him', npc: 'nenaZukut' },
    { id: 'balozSedelija', name: 'Baloz Sedelija', note: 'the shkja captain Zuku takes prisoner — and who takes Zuku\'s mother instead', npc: 'balozSedelija' },
    { id: 'smilaliqAlija', name: 'Smilaliq Alija', note: 'the other shkja raider, cut down at the very start', npc: 'smilaliqAlija' },
    { id: 'oratMalit', name: 'orët e malit', note: 'Zuku\'s guardian ora and her kind — warn him at the hunt, heal his blinded eyes on the mountain', npc: 'oratMalit' },
    { id: 'mikuZukut', name: 'miku i Zukut', note: 'the wise companion who plans the beggar\'s disguise', npc: 'mikuZukut' },
    { id: 'gjogu', name: 'gjogu i Zukut', note: 'blinded alongside his rider, abandoned, then set free to wander', npc: 'gjoguZukut' },
    { id: 'mujo', name: 'Gjeto Basho Mujo', note: 'the elder kreshnik of Jutbina — taunts Zuku into the ride, then loses Rusha to a shying courser', npc: 'mujo' },
    { id: 'agatJutbines', name: 'tridhetë agët', note: 'Jutbina\'s assembled warriors, feasting when Mujo\'s boast starts it all', npc: 'agatJutbines' },
    { id: 'rusha', name: 'Rusha', note: 'the Krajl\'s daughter across the frontier — gives Zuku her besa and rides home with him', npc: 'rusha' },
    { id: 'krajli', name: 'Krajli', note: 'Rusha\'s father, ruling his tower across the frontier — never staged directly in either song', npc: 'krajliRushes' },
    { id: 'kadiu', name: 'kadiu', note: 'the judge who must decide between two warriors who each threaten to kill him', npc: 'kadiu' },
    { id: 'gjogSeteVjet', name: 'gjogu shtatë-vjeçar', note: 'a second courser, kept shut in Zuku\'s own cellar seven years, saddled for the ride to Rusha', npc: 'gjogSeteVjet' },
  ],
  // anchor = the game location this tale place inhabits. This is a NORTHERN
  // (Gheg) frontier song-pair: mirrors are Jutbina and its own highland
  // ground, never a southern legend-site.
  places: [
    { id: 'bjeshka', emoji: '⛰️', name: 'the high pastures', note: 'the mountain flank Zuku hunts before anything goes wrong',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank (the spot mujo-strength and three-friends already share)',
        mold: 'a bare, empty flank where wanderers cross paths — nobody owns the open mountainside; Zuku\'s own hunting ground before the reckoning begins',
        sharedWith: ['three-friends', 'mujo-strength', 'sari-salltek'] } },
    { id: 'kulla', emoji: '🏘️', name: 'Zuku\'s mother\'s kulla', note: 'a household tower at Jutbina — nine chambers, a cellar, and one door that should never open',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'one private household tower among Jutbina\'s own kullas — this family\'s own walls, not the hub\'s shared plain and not any neighbor\'s house',
        mold: 'a highland household kulla with its nine chambers and a cellar beneath — home to Zuku, his mother, and (in the second song) the horse she keeps shut away seven years. The hub already hosts several separate family towers side by side: Mujo\'s own hearth and stable (mujo-courser.home), Ali\'s own kulla (ali-bajraktari.home), Osmani\'s neighboring house (mujo-courser.osmani). This is one more — a stone\'s throw from the open ledina where the Agas feast, and further still from the cadi\'s seat — never the same walls as any of those, and never the communal ground jutbina\'s own base text describes',
        sharedWith: ['mujo-courser (home — a different family\'s hearth)', 'ali-bajraktari (home — a different family\'s kulla)', 'mujo-courser (osmani — a third, neighboring household)'],
        proposal: 'draw a household kulla just off the main jutbina node, one among the "towers of the frontier-warriors" jutbina\'s own text already names' } },
    { id: 'maja', emoji: '🌑', name: 'the mountain\'s peak', note: 'where a blinded boy and his blinded courser are left to the bears and wolves',
      anchor: { status: 'existing', node: 'zuku1', mirror: 'the drought-cracked mountain where you found the blinded hero — the game\'s own zukuFund blurb already names this exact ground',
        mold: 'the peak where a blinded hero and his blinded courser are abandoned, and where the mountain\'s own oras find and heal him; this tale IS the full song the game\'s zuku1/zuku2/zukuFund side-quest condenses',
        sharedWith: ['the staged zuku1/zuku2/zukuFund side-quest'] } },
    { id: 'mikuShtepia', emoji: '🏠', name: 'a friend\'s house', note: 'where Zuku rests ten days and hears the beggar\'s plan',
      anchor: { status: 'proposed', node: 'zuku2', mirror: 'a companion\'s household somewhere in the same highlands',
        mold: 'a friend\'s hearth where a wounded hero is nursed back to strength before he acts — matches the moment the game\'s own zuku2 already stages ("the hero sees again... swears a besa")',
        proposal: 'draw a second highland household near zuku1/zuku2 for the friend who plans the disguise' } },
    { id: 'kryqi', emoji: '🪵', name: 'the crossroads', note: 'where a felled beech becomes a stake',
      anchor: { status: 'proposed', node: 'zukuFund', mirror: 'a crossroads in Zuku\'s own northern hills',
        mold: 'a crossroads that has seen one particular execution — a beech-wood stake, tar and fire; distinct physical ground from udhekryq so the two old women of two different regions never have to share one spot',
        conflicts: 'NOT udhekryq — that hub is the SOUTHERN seven-way crossroads with its own old woman\'s kulla already established by three-friends; this is a northern tale (Shala/Tropoja) and needs its own ground',
        proposal: 'draw a small northern crossroads near zukuFund, marked by the stake of four beech-quarters — nowhere near udhekryq' } },
    { id: 'ledina', emoji: '🔥', name: 'the meadow', note: 'where the thirty Agas light a fire and drink',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'the communal meadow just inside Jutbina\'s own towers, where the hamlet\'s own lahutë already sings — a different stretch of open ground from the frontier plain further out',
        mold: 'the open ground where the thirty Agas of Jutbina light a fire, drink, and talk of an evening — the everyday gathering-place jutbina\'s own base text already implies with its lahutë and its towers. NOT mujo-courser\'s fusha, the open BORDER plain toward the Krajl\'s Kingdom used for the courser\'s first showing and the wedding-train\'s reveal — that plain lies out at the frontier\'s edge, while this meadow sits inside the hamlet itself, close by the household kullas',
        conflicts: 'NOT the game\'s existing "lendina" node — that is the forest clearing far to the south near the game\'s starting road, a different region and a different clearing entirely',
        sharedWith: ['jutbina\'s own base text (the lahutë that already sings there)', 'mujo-courser (fusha — a different open ground: the outer frontier plain, not this inner meadow)'],
        proposal: 'draw a meadow just outside jutbina\'s own towers for the Agas\' fire' } },
    { id: 'kullaRusha', emoji: '🏰', name: 'Rusha\'s kulla', note: 'the Krajl\'s tower across the frontier',
      anchor: { status: 'existing', node: 'rusha1', mirror: 'the Krajl\'s tower where Rusha waits — the game\'s own rusha1 node already stages exactly this',
        mold: 'this tale IS the full song the game\'s rusha1/rushaFund/rushaKeq side-quest condenses into one choice; the full song has Zuku demand Rusha\'s besa of obedience before he\'ll drink her coffee, and she gives it freely',
        sharedWith: ['the staged rusha1/rushaFund/rushaKeq side-quest'] } },
    { id: 'oborriKadiut', emoji: '⚖️', name: 'the cadi\'s seat', note: 'where a judge is threatened by both sides of a dispute',
      anchor: { status: 'proposed', node: 'jutbina', mirror: 'a judge\'s seat somewhere near the frontier hamlet — its own bench, apart from any household or the open meadow',
        mold: 'a cadi (Ottoman-appointed judge) hears disputes the pleqësia — the Kanun\'s own council of elders — cannot settle; a different kind of justice from the besa-brokering pleqësia scenes already staged elsewhere. This is the first and only judge\'s bench proposed anywhere at the hub: no other tale anchored at jutbina stations a cadi (checked every tale file for "kadi" — none), so there is no other seat of formal justice here to reconcile with',
        conflicts: 'no conflict found — no other jutbina-anchored tale stages a formal judge',
        proposal: 'draw a small judgment-seat near jutbina for the cadi, apart from both the household kullas and the open meadow' } },
    { id: 'fushaMejdanit', emoji: '🏇', name: 'the war grounds', note: 'where a horse-race decides a bride',
      anchor: { status: 'existing', node: 'mejdan1', mirror: 'the frontier\'s own war-grounds — the game\'s mejdan1 already names this the duelling ground',
        mold: 'a mejdan is any contest the frontier settles here, not only the captain\'s single combat the game\'s own mejdan2/besaVella/besaThyer already stage; a horse-race for a bride plays out on the same open ground, at a different time, without contradicting the captain\'s own duel',
        conflicts: 'does not touch the captain or his besa — a different day, a different contest, the same field' } },
  ],
  items: [
    { id: 'shpata', emoji: '🗡️', name: 'Zuku\'s sabre', note: 'the same blade from the hunt, later sharpened and dipped in poison for the vengeance' },
    { id: 'lulja', emoji: '🌼', name: 'the mountain flower', note: 'three drops from its crushed petals restore Zuku\'s blinded eyes' },
    { id: 'unaza', emoji: '💍', name: 'the ring', note: 'the ring Zuku once gave Rusha — proof of who he is, shown at her window' },
  ],
  // PLAY PROJECTION — how the game stages this tale (see _SCHEMA.md).
  // EMBODIED as Zuku across two condensed side-quests off Jutbina: the blinded-
  // hero thread (zuku1/zuku2/zukuFund ← lament/healing/friend, lived as prologue
  // lore) and the bride-won-by-besa thread you actually play (rusha1/rushaFund/
  // rushaKeq). The whole choice turns on one oath; the fuller songs run behind it.
  play: {
    entry: 'besa',
    stance: 'embodied',
    as: 'zuku',
    role: 'You are Zuku Bajraktari, boy standard-bearer of Jutbina — so strong that your own mother had you blinded and left for dead on the mountain, until an ora\'s flower gave back your sight for a sworn vow of vengeance. Healed, you ride by night into the Krajl\'s land to win Rusha, the daughter across the frontier, on the strength of a boast you made among the thirty Agas. It all turns on a single besa: bind her with God\'s own oath before you carry her home and the bride is yours; reach for her without it, and a bride seized by force is war, and your head stays behind on the Krajl\'s stair.',
    enter: 'rusha pours you coffee in the krajl\'s tower, and you will not drink until she swears you the besa',
    from: 'rusha1',
    ending: 'rushaFund',
    scenes: { zuku1: 'lament', zuku2: 'healing', zukuFund: 'friend', rusha1: 'besa', rushaFund: 'besa', rushaKeq: 'ride' },
    divergences: [
      { note: 'The projection folds two separate Kreshnik songs into one embodied arc. The whole first song\'s engine — the captured Baloz, the mother\'s treachery, the midnight blinding, the beggar\'s-disguise vengeance and the fiery execution at the crossroads — never plays; the game opens on the already-blinded hero at the mountain (lament, healing, friend) before the Rusha ride.' },
      { beat: 'besa', note: 'The game splits the oath into a moral fork the song never offers: demand Rusha\'s besa and win her (rushaFund), or seize her without it and die on the Krajl\'s stair (rushaKeq). In the song she simply gives her word — an oath to obey, which the ending reframes as her coming \'of her free will.\'' },
      { beat: 'race', note: 'The song\'s whole second half — Mujo\'s rival claim to Rusha, the cadi trapped between two death-threats, and the courser-race where Mujo\'s own mount shies at the last instant so Zuku catches the bride — is cut. The game ends the moment Rusha rides home behind you.' },
    ],
  },
  beats: [
    // ==================== SONG 1: ZUKU BAJRAKTAR ============================
    {
      id: 'hunt', title: 'An empty pasture, and two raiders',
      note: 'Zuku rides out to hunt and finds nothing, cursing the mountain — until his own ora corrects him and points out a band of shkja raiders. He cuts one down and captures the other, Baloz Sedelija, alive.',
      lines: [
        ['1.1', 'Zuku Bajraktar came into the world already marked as fine stock by God\'s own favor, and from the start his whole ambition was to grow into his father\'s likeness.', "Kur ish kenë Zuku Bajraktar, / Djalë të mirë zoti e ki' falë / Edhe si babën dote me e ba."],
        ['1.2', 'One morning, they say, the lad rose, saddled and girded his horse, took up his rifle, seized his cudgel and sabre, and mounted his courser to hunt the mountain pastures.', "Tha, ishte çue djali n'sabah, / Po e shilon atin, e po e shtërngon, / Po ma merr pushkën në dorë, / Po ma merr topuzin e shpatën / E në shpinë gjogut m'i ka hypë, / Don me dalë në bjeshkë për me gjue."],
        ['2.1', 'He roamed pasture after pasture but found no game to shoot, not one shkja fighter to cut down.', "Sa shum bjeshkën djali e ka shetitë, / As s'ka gjetë gje me gjue, / As s'ka gjetë ndoi shkja me e pre!"],
        ['2.2', 'Zuku turned his frustration on the empty slope and cursed it outright: let no animal ever graze there again, and let no war-band ever cross it either.', "Ka nisë Zuku bjeshkën ma ka namë: / - Gjoe n'ket bjeshkë kurr mos e gjetët, / As mos dalët kurr çetë n'ket bjeshkë!"],
        ['3.1', 'But his ora had long been at his side, watching over him, and now she spoke up.', "Ora e Zukut ngjat ka qillue, / Ajo Zukun mirë ma ka prigjue. / Ç'ka qitë ora e ka thanë?"],
        ['3.2', 'Stop your cursing, Zuku, the ora told him — take up your field-glass instead, and you\'ll spot something truly worth pursuing: a raiding party of shkjas on the move.', "- Mo', bre Zuko, bjeshkën për me e namë, / Se me e vu turbinë në sy, / Ti po sheh-o gjoe me gjue, / Ti po i sheh shkjete tuj çetue."],
        ['3.3', 'Zuku raised the field-glass and there indeed was game to hunt — the shkjas out on their sortie.', "Ma ka vu turbinë në sy, / Ki' pa gjoe për me gjue, / Ki' pa shkjetë tuj çetue,"],
        ['4.1', 'He rode straight for them and came upon two fearsome shkja fighters: Smilaliq Alija, and Baloz Sedelija.', "Fill te shkjetë ai paska shkue / E m'ka ndeshë dy shkje fort t'mdhaj: / Njani ish Smilaliq Alija, / Tjetri ish Baloz Sedelija."],
        ['4.2', 'God favored the lad: he cut down Smilaliq Alija and took Baloz Sedelija alive as his prisoner.', "Zoti t'mbarën djalit ja ka dhanë, / Po ma pret Smilaliq Alinë, / E xen rob Baloz Sedelinë"],
        ['4.3', 'And so he came home, his captive with him.', "E te shpija me te po bjen"],
      ],
      cast: {
        zuku: ['bjeshka', 'rides out hunting, alone, and grows short-tempered with an empty pasture'],
        oratMalit: ['bjeshka', 'Zuku\'s own guardian ora watches unseen and warns him not to curse empty pastures'],
        nenaZukut: ['kulla', 'keeps her son\'s tower-house at Jutbina, not yet aware of what he will bring home'],
        balozSedelija: ['bjeshka', 'one of two shkja raiders Zuku is about to run down'],
        smilaliqAlija: ['bjeshka', 'rides at Sedelija\'s side — about to fall to Zuku\'s sabre'],
        mikuZukut: ['mikuShtepia', 'keeps his own house in the highlands, not yet needed'],
        gjogu: ['bjeshka', 'Zuku\'s courser, ridden out to the hunt'],
        mujo: ['ledina', 'feasts elsewhere among the Agas of Jutbina — no part yet of Zuku\'s reckoning'],
        agatJutbines: ['ledina', 'the thirty Agas of Jutbina, gathered at their own fire, elsewhere'],
        rusha: ['kullaRusha', 'waits in her father the Krajl\'s tower, far across the frontier'],
        krajli: ['kullaRusha', 'rules his tower across the frontier, offstage'],
        kadiu: ['oborriKadiut', 'keeps his own seat of judgment, not yet needed'],
        gjogSeteVjet: ['kulla', 'shut in the dark cellar of Zuku\'s own house, seven years unseen by the sun'],
      },
      items: { shpata: ['zuku', 'slung over his shoulder for the hunt'] },
      exit: ['smilaliqAlija'],
    },
    {
      id: 'warning', title: 'Nine chambers, and one that must not open',
      note: 'Zuku locks his captive in the innermost chamber and warns his mother never to open it. But she spies on the baloz through the door — and desires him.',
      lines: [
        ['5.1', 'He shut his prisoner in a chamber behind a trapdoor, hands and feet bound.', "E po e ndryn n'oda me qepeng, / Kambash e duerësh ma paska lidhë."],
        ['5.2', 'Then Zuku told his mother: open any of the other nine chambers you like — but never open this last one.', "Ç'ka qitë nanës Zuku e i ka thanë? / - Ti nandë odat ke me i çilë, / Njat ma t'fundshmen ruej se e çil."],
        ['6.1', 'But see what the wretched mother did — she peered at the baloz through the door and, staring, wanted him for herself.', "Kqyr çka ban nana, kjoftë e zezë! / Për dollapit balozin ma shikjon, / Kqyr sa fort balozit m'i lakmon"],
        ['6.2', 'She came close and asked him: shall I open this door and free you of your chains?', "E ç'ka qitë balozit e i ka thanë: / - A po don derën me ta çilë, / A po don hekurat me t'i zgidhë?"],
      ],
      cast: {
        zuku: ['kulla', 'locks his captive away and warns his mother never to open the last chamber'],
        balozSedelija: ['kulla', 'shut in the innermost chamber, bound hand and foot'],
        nenaZukut: ['kulla', 'spies on the captive through the door and wants him for herself'],
        gjogu: ['kulla', 'back home from the hunt, still Zuku\'s own'],
      },
    },
    {
      id: 'bargain', title: 'A bargain in the dark',
      note: 'The baloz, more afraid of Zuku than desperate for freedom, makes the mother swear to marry him first — and she offers the one thing that will settle his fear: she will blind her own son.',
      lines: [
        ['7.1', 'The baloz answered: for God\'s own sake, be quick — open the door, loose these irons.', "Ç'ka qitë balozi e i ka thanë? / - Ne kujtosh hatrin e zotit, / Shpejt derën ti ma çil, / Ma shpejt hekurat ti m'i zgidh."],
        ['7.2', 'The wretched woman answered: first swear me your word before God, that you\'ll take me as your wife.', "E ç'ka qitë kuçka e ka thanë? / - 'I besë t'zotit, Baloz, me ma dhanë, / Grue për vedi mue me m'marrë."],
        ['7.3', 'Hear what Baloz Sedelija answered: I cannot take you as my wife, for your son is far too great a hero, and I am too afraid of him — I fear he\'ll catch and kill the two of us.', "Kqyr ça i tha Baloz Sedelija! / - Grue për vedi un nuk muj me t'marrë. / Se fort t'mirë 'i djalë ma ke / E sa fort frigën ja kam, / Se drue djali t'dyve po na pret."],
        ['8.1', 'The wretched woman answered: dealing with my son is easy — I can trick him well enough, tie his hands and feet.', "Ça ka qitë kuçka e ka thanë? / - Na me djalë kollaj po bajmë, / Se n'mujsha djalin për me e rre, / Kambësh e duerësh për me e lidhë,"],
        ['8.2', 'I\'ll gouge out the boy\'s two eyes, and blind his courser too — set him on the horse\'s back, carry him to the mountain\'s peak, and leave them there alone for the bears or wolves to eat.', "Të dy sytë djalit po ja qorroj, / Të dy sytë atit po ja verboj / E n'shpinë t'atit djalin kam me e vu / E n'maje t'bjeshkës djalin kam me e qitë / E njatje vetun kam me e lanë, / Harushë a ujk atje po ka me e ngranë."],
        ['8.3', 'At that the baloz gave his word before God: then I will take you as my wife.', "Besën e zotit q'atherë Balozi ja ka dhanë: / - Grue për vedi un kam me t'marrë!"],
      ],
      cast: {
        nenaZukut: ['kulla', 'strikes her bargain with the captive — his freedom for her plot against her own son'],
        balozSedelija: ['kulla', 'agrees to marry her once Zuku is dealt with'],
      },
    },
    {
      id: 'taunt', title: 'The father\'s ten ropes',
      note: 'Returning to her son, the mother taunts him as no true hero, unfit to match his father\'s strength — and the boy, stung, dares her to bind him with ten ropes just as his father once was.',
      lines: [
        ['9.1', 'What did the mother then say to her boy? God damn you, my own son — you\'re no hero like your uncle, nor as strong as your father was.', "Ç'ka qitë nana djalit e i ka thanë? / - Zoti t'vraftë, more djali i em, / Si nuk je ma trim se axha, / Si nuk je ma i fortë se baba,"],
        ['9.2', 'He could tear up beech trees three hundred years old, and heft a boulder of three thousand okë — there was nothing he left undone, no ten-year-old boy he didn\'t outgrow, no seven-year-old girl he failed to carry off.', "Zhgulte ahat treqind vjeç, / Rrokte shkambin tri mij okësh, / Gja pa ba ai nuk ka lanë, / Djalë dhetë vjeç m'u rritë s'ka lanë, / Çikë shtatë vjeç pa grabitë s'ka lanë."],
        ['9.3', 'Every time he went to battle he never once took a captive alive — and the one time they tried to bind him in ten ropes, he snapped every one of them at once.', "Se herë në luftë ai qi ka ra, / Kurrnji rob xanë gjallë s'e ka. / M'dhetë konopë at me e pa' lidhë, / Dhetë konopë i ka kputë meihera."],
        ['10.1', 'Stung, the boy answered his mother: I mean to become just like my father — no, greater still.', "Â dredhë djali e nanës i ka thanë: / - Edhe un si baba due m'u ba / Edhe ma trim se baba due me kenë,"],
        ['10.2', 'I may be only thirteen, but three shkjas have already fallen to my blade, and I\'ve dragged a baloz home alive besides.', "Se sod s'jam por trembdhetë vjeç / E tre shkje shpatë i kam pre / E nji baloz gjallë e kam xanë,"],
        ['10.3', 'Bind me with ten ropes, mother — I\'ll break every one, just as my father did.', "Me dhetë konopë, nanë, me m'lidhë, / Dhetë konopë si baba i kputi."],
      ],
      cast: {
        nenaZukut: ['kulla', 'taunts Zuku with his father\'s legendary strength to bait him into the ropes'],
        zuku: ['kulla', 'stung, boasts he can break ten ropes as his father did, and dares her to try'],
      },
    },
    {
      id: 'blinding', title: 'Bound, blinded, abandoned',
      note: 'The ropes hold. His mother shackles him for real, feasts with the baloz, and at midnight blinds them both with heated pokers, leaving them alone at the mountain\'s peak.',
      lines: [
        ['11.1', 'With ten ropes now around him, the boy strained against them, but this time the bindings held fast.', "Me dhetë konopë nana e ki' lidhë, / Nuk ka mujtë Zuku për me i kputë."],
        ['11.2', 'The harder the boy strained against them, the deeper they cut into his skin, until he began screaming from the pain.', "E sa fort djali qi ka hjekë, / Aq ma fort mishin ja kanë pre, / Ka nisë brimën atherë me bërtitë,"],
        ['11.3', 'But his mother did not free him — instead she clamped his feet in iron shackles and locked chains onto his hands.', "Porse djalin nana s'e ka zgidhë / E ja ven hekurat n'kambë / E m'ja shtjen burgitë n'dorë"],
        ['11.4', 'Then she went in to the baloz herself, brought him wine and raki, and the two of them ate and drank their fill.', "E te Balozi vetë ka hi / E po i qet venë e raki. / Mirë kanë ngranë, ma mirë kanë pi."],
        ['12.1', 'When white midnight came, what did Zuku\'s mother do? She heated iron pokers red in the fire.', "Kur â ardhë mjesnata e bardhë, / Nana e Zukut ç'ka qitë e ka ba? / M'i ka kuqë hekurat m'zjarm"],
        ['12.2', 'With them she put out her son\'s two eyes, and his courser\'s two eyes as well, then set the boy on the horse\'s back and lashed his legs beneath its belly.', "E t'dy sytë djalit ja qorron / E t'dy sytë atit ja verbon / E n'shpinë t'gjogut djalin e ka vu / E dy kambët nën bark ja ka lidhë"],
        ['12.3', 'She left him alone at the mountain\'s peak, the wretched boy, for the bears or wolves to devour.', "E n'maje t'bjeshkës djalin e ka qitë, / Njatje vetun djalin e ka lanë, / Harushë a ujk t'shkretin për me e ngranë."],
      ],
      cast: {
        nenaZukut: ['kulla', 'binds her son for real, then blinds him and his courser at midnight'],
        zuku: ['maja', 'blinded by his own mother\'s hand and left alone at the mountain\'s peak'],
        gjogu: ['maja', 'blinded alongside his rider and abandoned with him'],
      },
      items: { shpata: ['kulla', 'left behind — a blinded boy carries no blade'] },
    },
    {
      id: 'lament', title: 'Two blind voices on the mountain',
      note: 'Boy and courser weep together, neither able to help the other — until the courser\'s cries carry far enough to reach the mountain\'s own oras.',
      lines: [
        ['13.1', 'Have mercy, Almighty God — how loudly the boy wept, and how loudly the courser shrieked!', "Aman zot, more i lumi zot, / Sa t'madhe djali po bërtet, / Sa t'madhe gjogu po pisket!"],
        ['13.2', 'What\'s wrong, courser, why are you crying, Zuku asked — if I still had my eyes, we\'d have done great deeds together, but now my mother has blinded me and, wretched as I am, I don\'t know where to lead you.', "- Ça ke, gjog, tha Zuku, qi bërtet, / Si t'i kishe un sytë si i kam pasë, / Shumë trimnitë me ty i kishe ba; / Por tash nana sytë m'i ka verbue, / Nuk po dij i shkreti kah me t'çue."],
        ['13.3', 'The courser answered: where can I find water to drink, or a branch of leaves to eat? Hunger has worn me down and I can\'t see which way to go either.', "Ça ka folë gjogu e ka thanë? / - Ku ta marr un pak uj me pi, / Ku ta marr 'i krah dushk me ngranë, / Se fort uja m'ka lodhë, / Nuk po shof as un kah po shkoj."],
        ['14.1', 'So loudly did the courser neigh that the sound deafened the whole cursed mountain pasture.', "E sa rreptë gjogu po hingllon, / Bjeshkët e nemta t'gjitha po i shurdhon,"],
        ['14.2', 'Word of the cries reached the oras who kept that mountain, and they appeared at Zuku\'s side to ask what calamity had befallen him.', "Orët e malit ma kanë ndie, / Ma kanë ndie e Zukut i kanë dalë para, / Paskan nisë Zukun me ma pvetë: / - Çfarë gazepit ty, djalë, t'ka gjetë?"],
        ['14.3', 'I cannot even tell you, oras, he said — my mouth is choked with foam, my tongue has grown short, for my own mother blinded me.', "- Nuk muj, orë, thotë me u kallxue, / Se goja e eme m'asht shkrumue, / Se gjuha m'asht shkurtue, / Se nana e eme m'ka verbue."],
      ],
      cast: {
        zuku: ['maja', 'weeps blind beside his blinded courser, the two of them lamenting together'],
        gjogu: ['maja', 'can\'t find water, food, or the way — shrieks until the sound reaches the mountain\'s oras'],
        oratMalit: ['maja', 'drawn by the courser\'s cries, find Zuku and ask what has happened to him'],
      },
    },
    {
      id: 'healing', title: 'A vow, and a mountain flower',
      note: 'The oras will heal him only for a sworn vow of vengeance. He swears it, and three drops from a mountain flower give him back his sight exactly as it was.',
      lines: [
        ['15.1', 'The oras answered him: swear before God that you will bring a dark reckoning on your mother, and we will restore your two eyes to what they were.', "Kanë qitë orët e m'i kanë thanë: / - Besën e zotit me na e dhanë, / Qi 'i nam t'zi n'nanën me e ba, / Të dy sytë na po t'i shndoshim / E t'dy sytë t'i bajmë si i ke pasë."],
        ['15.2', 'The boy swore his word before God: I will bring that dark reckoning on my mother, for whoever does to a son what she did to me shall not stay alive on this earth.', "Besën e zotit djali jau ki' dhanë: / - Nji nam të zi në nanë kam me ba, / Se kush ban n'djalë shka bani ajo nanë, / Kurrkund gjallë mbi tokë s'do lanë,"],
        ['16.1', 'At once the oras listened to him, searched the mountain for its flowers, and plucked a mountain blossom, which they pressed onto the boy\'s eyes.', "Njatherë orët po e ndigjojnë, / Malit barin po e kërkojnë, / Ma kanë kputë nji lulzë malit, / Ma kanë shtrydhë përmbi sy t'djalit;"],
        ['16.2', 'Only three drops fell, one washing was enough, and they gave the boy back his sight — his eyes exactly as they had been.', "Sall tri pikë qi m'i kanë ra, / Sall nji herë ja kanë la, / E kanë ba djalin me pa, / Ja kanë kthye sytë si i ki' pasë."],
      ],
      cast: {
        oratMalit: ['maja', 'bind Zuku to a vow of vengeance, then heal his blinded eyes with a mountain flower'],
        zuku: ['maja', 'swears vengeance on his mother and receives his sight back, three drops and one washing'],
      },
      items: { lulja: ['maja', 'plucked by the oras, pressed to Zuku\'s eyes, its work done'] },
    },
    {
      id: 'friend', title: 'Ten days at a friend\'s hearth',
      note: 'The oras vanish and Zuku makes for his one true friend\'s house, resting ten days until his strength returns — then hears the plan that will get him past his own mother\'s door.',
      lines: [
        ['17.1', 'The oras vanished and the boy set out, and made his way to the house of his one true friend, where he rested ten days and nights until a little strength returned to his body.', "Janë zhdukë orët e djali asht fillue / E m'ka shkue tu 'i mik i vet / E m'ka ndejë dhetë dit e net, / Kesh t'i hijë n'trup pak kyvet."],
        ['17.2', 'Then he told his friend: I have sworn before God that I will bring a dark reckoning on my mother.', "Ka nisë mikut e po m'i thotë: / - Besën e zotit orvet jau kam dhanë, / Se 'i nam t'zi n'nanën due me ba."],
        ['18.1', 'How wisely his friend answered him, and how well he taught the boy what to do!', "Sa i meçem miku i qillon, / Sa mirë djalin miku po ma mson!"],
        ['18.2', 'Dress poorly, Zuku, put on ragged clothes and shoes, take a torn sack with you, make yourself look just like a beggar, and go down to your mother, so that you may find some way inside her house.', "- Keq m'u veshë, Zuku, keq m'u mbathë / E me marre nji strajcë të shkyeme, / Krejt si lypc, Zuku, ke m'u ba, / Der te nana ke me ra, / Si t'mundesh n'shpi me hi."],
        ['18.3', 'So the boy dressed himself poorly, took a staff in his hand, slung the sack well under his arm, and put a little grain inside it.', "Keq asht veshë djali, keq asht mbathë / E 'i shkop n'dorë djali e ka marrë, / Mirë ma ven strajcën nën krah, / Nja pak drithë mbrendë na ka qitë."],
      ],
      cast: {
        zuku: ['mikuShtepia', 'rests ten days at his friend\'s house until his strength returns, then hears the plan for a beggar\'s disguise'],
        mikuZukut: ['mikuShtepia', 'nurses Zuku back to strength and teaches him the beggar\'s ruse'],
        gjogu: ['mikuShtepia', 'rests alongside Zuku, not yet released'],
      },
    },
    {
      id: 'beggar', title: 'A beggar at his mother\'s door',
      note: 'Zuku sends his courser off to wander free, disguises himself as a beggar, and comes to his own mother\'s door — where she doesn\'t know her son, and grudges him even a night\'s shelter, until the baloz himself shames her into it.',
      lines: [
        ['19.1', 'He said two words to his courser: you go your way, and I\'ll go mine, for today I must take a reckoning no one has ever taken before.', "Dy fjalë gjogut m'ja ka thanë: / - Un n'njanë anë, gjog, ti n'anë tjetër, / Se un do t'marr sod nji gjak t'vjetër, / Qi kurr ksi gjaku kuj s'i ra me marrë."],
        ['19.2', 'Understand what I\'m telling you, my good courser? Wander off and vanish, my white one — when my time comes, I\'ll hunt you down door by door if I must.', "A thue ndjeve, more gjogu i em i mirë, / Hup ku t'mundesh, more gjogu i em i bardhë, / Se n'baftë dita e eme për me ardhë, / Derë n'derë un ty prap kam me t'lypë."],
        ['19.3', 'So Zuku made himself into a beggar and went to his mother\'s own door — and his mother did not know her son.', "Si lypc Zuku kenka ba / E n'derë s'amës i ka vojtë. / Djalin e vet nana s'e ka njoftë,"],
        ['20.1', 'She threw a little grain into his sack, but it was torn, and the grain spilled out onto the ground, so Zuku bent down to gather it.', "Pak drithë në strajcë ja ka qitë. / Strajca e shkyeme n'tokë i â derdhë. / Asht ulë Zuku për me e mbledhë,"],
        ['20.2', 'He drew out the gathering until darkness came, then turned to his mother with a plea: allow him shelter till morning! She refused outright — he could not come inside.', "Njaty nata e ka xanë / Edhe s'amës i kishte thanë: / - Aman, mbrendë sande me m'lanë! / Kqyr, e ama ça i ka thanë: / - Nuk po muj un mbrendë me t'lanë."],
        ['20.3', 'Before God, Zuku pleaded again: let me stay the night — the climb to this kulla has ruined my knees, and I fear the mountain beasts will eat me before I reach that far village in the dark.', "Be në zotin Zuku ka ba. / - Aman, sande mbrendë për me m'lanë, / Se 'i tërmale qi qitka te kjo kullë, / Mue dy gjujt tek m'i ka kputë / E po drue se m'hanë rrugës bishët e malit. / Deri t'kapem natën te qaj katundi i largtë."],
        ['21.1', 'Then the baloz called out to the mother: why haven\'t you let the beggar in? You shame me — I\'ve never once turned a guest from my door. Get up and open it at once!', "Ç'ka qitë balozi kuçkës e i ka thanë? / - Njat lypc mbrendë pse s'ma ke lanë? / A ke dashtë mue me m'koritë, / Se kurr mik jashtë un nuk kam qitë, / Çou me t'shpejtë derën me ja çilë!"],
      ],
      cast: {
        zuku: ['kulla', 'dressed as a beggar, gathers spilled grain at his own mother\'s door, and begs a night\'s shelter'],
        gjogu: ['maja', 'set loose to wander free while Zuku goes in disguise'],
        nenaZukut: ['kulla', 'doesn\'t know her own son, but grudges even a beggar\'s night'],
        balozSedelija: ['kulla', 'shames the mother into opening the door for the beggar'],
      },
    },
    {
      id: 'vigil', title: 'A poor bed, and a watchful night',
      note: 'Fed bread he dares not eat and bedded on straw and house-beams, Zuku waits out the night while his mother and the baloz feast and fall asleep — then arms himself and breaks in.',
      lines: [
        ['22.1', 'So they opened the door, sat the boy down by the fire, and set bread and salt before him.', "Qatherë derën ja kanë çilë, / Ndër unë t'zjarmit djalin ma kanë vu, / Bukë e krypë Zukut i kanë qitë."],
        ['22.2', 'He left the bread untouched, wary of whatever trick his own mother might be playing.', "Aspak bukën s'e kërkon, / Se fort sherrin nanës po m'ja dron."],
        ['22.3', 'When it came time to sleep, they made him a poor bed — a little straw laid down for him, and the house beams themselves for a cover.', "Kur â ba vakti me ra, / Keq po i shtrojnë e keq po e mblojnë. / Për me i shtrue i shtrojnë do kashtë, / Për me e mblue janë trenët e shpisë."],
        ['22.4', 'The baloz then went to lie with the mother; well did the two of them eat and drink, and greatly did they enjoy themselves, until at last they both fell asleep.', "M'anesh me nanën balozi ka dalë, / Mirë kanë ngranë e mirë kanë pi, / Qef të madh t'dy qi po e bajnë, / Der kanë shkue të dy me fjetë."],
        ['23.1', 'When white midnight came, the boy rose quietly to his feet and quietly opened his own chest.', "Kur â ardhë mjesnata e bardhë. / Mirë m'asht çue djali në kambë, / Mirë ma çilte arkën e vet."],
        ['23.2', 'He put on his fine Hungarian dress, buckled the golden sabre to his side, and drew its edge across a whetstone before dipping the blade in poison.', "Mirë m'i veshte petkat maxharisht / Edhe shpatën ma njesh prej florinit / E tehin ma mrehë e ma helmatisë."],
        ['23.3', 'With a single kick he broke down the door, but neither of the two sleepers woke.', "Dik me shtjelma derën e ka thye, / Asnjanit gjumi s'i ka dalë;"],
        ['23.4', 'So with two kicks more he struck the porch floor, and this time the sleep left the woman.', "Me dy shtjelma meiherë për çardak ka rrahë / E sa mirë gjumi grues i ka dalë."],
      ],
      cast: {
        zuku: ['kulla', 'fed and bedded poorly, waits out the night watching his mother and the baloz feast and fall asleep'],
        nenaZukut: ['kulla', 'feasts with the baloz and falls asleep beside him'],
        balozSedelija: ['kulla', 'feasts and falls asleep, unaware of the beggar by the fire'],
      },
      items: { shpata: ['kulla', 'drawn from Zuku\'s own chest at midnight, sharpened and dipped in poison'] },
    },
    {
      id: 'reckoning', title: 'No son to embrace',
      note: 'The mother knows her son and rises to embrace him — but Zuku turns her away, reveals himself, and cuts down the baloz in two strokes.',
      lines: [
        ['24.1', 'The mother knew her son at once, and rose to her feet like a viper to embrace him.', "Fort mirë nana t'birin ma ka njoftë, / N'kambë asht çue hidra për me e rrokë."],
        ['24.2', 'You have no son here to embrace, Zuku told her — go embrace the man you took instead, for if you\'d truly wanted to embrace your son, you\'d have known his very eyes.', "- Nuk ka djalë qi rrok, Zuku i ka thanë, / Por rrok burrin qi ke marrë, / Se, me pa' dashtë djalin me rrokë, / Sytë e shkruem si tut ti i kishe pa."],
        ['24.3', 'I am no beggar begging alms — I am, by my besa, the son born to house and hearth, whose father is dead and whose mother is the blackest thing there is.', "Nuk jam kenë lypc me lypsi, / Por besa djalë i lem me plang e shpi, / Tata dekë e nana si â ma zi."],
        ['25.1', 'In a flash he drew his sabre from its sheath, drove a kick into the baloz, and gave a great warrior\'s cry: rise, shkja, and God confound you!', "Vring përjashta shpatën ma ka xjerrë, / Shtjelm balozit po m'i bjen, / T'madhe trimit po m'i thrret: / - Çou, ti shkja, kryet mos e çosh,"],
        ['25.2', 'Name the eyes you dared to put out! Name the hands and feet you dared to tie! Now learn exactly who Zuku Bajraktar is!', "Sytë e ballit kuj ja ke verbue, / Kambësh e duersh ç'djalë ti ke lidhë? / Tash ta njifsh Zukun Bajraktar!"],
        ['25.3', 'The baloz sprang to his feet, but Zuku struck him only twice, and sent his head and his arm crashing to the ground.', "Qatherë balozi n'kambë asht cue, / Sall dy herë Zuku n'te ka sjellë, / Krye e krah në tokë ja ka qitë,"],
        ['25.4', 'He seized the head by its whiskers and sent it tumbling and bumping down the stairs.', "Për mustakut at krye e ka kapë / E n'fund t'shkallve e ka tretë"],
      ],
      cast: {
        zuku: ['kulla', 'reveals himself to his mother, then draws his sabre and kills the baloz with two strokes'],
        balozSedelija: ['kulla', '☠ killed by Zuku — two strokes take his head and his arm'],
      },
      exit: ['balozSedelija'],
    },
    {
      id: 'judgment', title: 'Choose your death',
      note: 'Zuku turns on his mother, refuses her excuses for the baloz, and — his courser and his sight both his own again — offers her a choice of how she will die.',
      lines: [
        ['26.1', 'Then he turned his eyes on his own mother. Don\'t be like this, she told him — he was not a bad husband, he was a friend of your forefathers.', "E nanës s'vet synin ja ka dredhë. / - Mo, bre, ashtu, nana i ka thanë, / Se ka kenë nji burrë i mirë, / Se mik shpijet t'parët ta kanë pasë."],
        ['26.2', 'Spare me those words, mother — better I\'d never had you at all. Since when does one of my father\'s old companions get to disgrace him inside his own grave?', "- Leni fjalët, moj nanë, e nanë mos t'paça, / Po çfarë mikut t'parët ma kanë pasë, / Qi ky babën s'dekunit ma ka shnjerzue."],
        ['26.3', 'But you\'re a woman like every other woman — nothing you say can be trusted, for you had one only son, and blinded his two eyes for the sake of a man.', "Po ti grue je si t'tana gratë, / Kurrkund puna nuk t'pelqen me fjalë, / Se 'i djalë t'vetëm si ke pasë, / T'dy sytë djalit për 'i burrë ja ke verbue."],
        ['27.1', 'Tell me one thing, mother, if you can — how does your soul wish to leave you today? Painted with sulfur and pitch and set alight at the feet? Or bound to my courser\'s tail?', "A din shka, moj nanë, ti me m'kallxue? / Si don shpirti ty sot me t'dalë? / A me t'lye me surfur e me peshkve / E për kambet zjarmin me ta dhanë, / A po don me t'lidhë për bishtit t'gjogatit,"],
        ['27.2', 'For you see, mother, I still have my courser, and I still have the eyes I always had — the two eyes you tore out of me, which the ora has since given back to me.', "Se edhe unë gjogun si e kam pasë e kam, / Se edhe sytë si i kam pasë i kam, / Se dy sytë mue, nanë, m'i pate xjerrë, / E dy sytë prep ora m'i ka kthye."],
        ['27.3', 'The earth itself cannot bear a mother like you — never once, for as long as the sun has given its light, has a mother blinded her own son\'s two eyes.', "Nanë si ty, toka randë e ka, / Se kah ban dielli dritë s'â ndie. / Se nana djalit dy sytë ja xjerrë."],
        ['28.1', 'Son, she pleaded, treating your own mother this way will bring the shame down on you, not me.', "- Mo, bre birë, kshtu nanës, me ja ba, / Se ti vedin po e marron."],
        ['28.2', 'You did to me what you find yourself in now, he answered — I mean to do to you exactly what you did to me, so think well on what death you wish for yourself.', "- Si ke ba, moj nanë, ti po gjen. / Ça ke ba n'mue, due me të ba, / Por mendo se ç'dekë i dishron vetit."],
      ],
      cast: {
        zuku: ['kulla', 'turns on his mother, refuses her excuses, and offers her a choice of how she will die'],
        nenaZukut: ['kulla', 'pleads for the baloz\'s memory, then for her own life, and is refused both'],
        gjogu: ['kulla', 'back at Zuku\'s side by the time of the reckoning — how, the song never says'],
      },
    },
    {
      id: 'execution', title: 'A beech at the crossroads',
      note: 'The mother flees to the neighbours; they beg for her life, but Zuku will not be moved. He fells a two-hundred-year beech, plants it at the crossroads, and burns her there for ten days and nights.',
      lines: [
        ['29.1', 'The mother fled among the neighbours and told them all of her trouble: farewell, friends and neighbours, for you will never lay eyes on me again.', "A nisë nana, ka shkue ndër kojshi / Edhe shokve gjithsi po u kallxon: / - Lamtumirë, o shokë e kojshi, / Se na s'shifna ma me sy."],
        ['29.2', 'All the neighbours fell at the boy\'s feet and, one after another, told him: don\'t do this to your mother, Zuku!', "Të tanë shokët ndër kambë djalit m'i bijnë, / T'tanë me rend djalit po m'i thonë: / - Mo, kshtu nanës, Zuku, me ja ba!"],
        ['29.3', 'I am doing nothing to her, friends, but what she has already done to me — and he would not listen to a word of it.', "- Nuk po i baj, o shokë, veç ça m'ka ba: / Kurr 'i grimë djali s'po i ndigjon,"],
        ['30.1', 'Sabre tucked under his arm, he strode into the woods, cut down a young beech that had stood two centuries, split the trunk into four lengths, and set them crosswise at the crossroads.', "Por ma merr shpatën nën krah, / Shkon mbrendë n'ashtë e m'rrxon nji ah, / Nji ah t'vogël dyqind vjeç, / Katër copash ma laton, / N'katër rrugë kryq ai ma ka ngulë"],
        ['30.2', 'To them he bound his mother — a captivity and a marvel, so that all might know their fill of her black misfortune.', "E për ta nanën ka lidhë, / Qi robni e mrekulli, / Me u ngi me kob të zi;"],
        ['30.3', 'He coated her in pitch and brimstone, lit the fire at her head and her feet alike, meaning to drive the wickedness from her very soul, and let her burn there ten full days and nights.', "N'zyft e n'peshkve ma ka lye, / N'fund e n'krye zjarm i ka dhanë, / Me i dalë shpirti për gazep / E ma la dhetë ditë e net."],
        ['30.4', 'May God spare every other man a mother like that! May the world settle back to how it always was, and may God send us his help.', "Nanë si kte zoti kuj mos ja dhashtë! / Atje kjoftë si ç'â kenë motit, / Ne na ardhtë ndima prej zotit!"],
      ],
      cast: {
        nenaZukut: ['kryqi', '☠ bound to a felled beech at the crossroads, tarred, and burned ten days and nights'],
        zuku: ['kryqi', 'refuses every neighbour\'s plea for mercy and carries out the sentence himself'],
      },
      exit: ['nenaZukut'],
    },

    // ==================== SONG 2: ZUKU CAPTURES RUSHA =======================
    {
      id: 'boast', title: 'A boast among the Agas',
      note: 'The thirty Agas of Jutbina feast and talk; Mujo taunts them that none was ever born who could touch Rusha\'s kulla and live to tell it. Zuku answers that he already has, three nights running.',
      lines: [
        ['31.1', 'Thirty Agas, they say, had gathered together and lit a fire in the meadow; they took up their drink and drank, and the drink loosened talk among them until they were deep in conversation.', "Tridhetë agë, tha, bashkë janë ba / E e kanë ndezë zjarmin n'ledinë, / Kanë marrë pijen e po pijnë, / Pija n'llaf i ka qitë; / Kanë marrë llafin e po llafiten,"],
        ['32.1', 'Then Mujo spoke up among them: let me season this talk of yours!', "Ka qitë Muja e u paska thanë: / - Ju jau xisha llafin, qi po bani!"],
        ['32.2', 'No lad has ever been born in Jutbina, no sister has ever rocked such a brother, no mare has ever foaled a horse fit for the mejdan, that could carry me by night into the Krajl\'s own land, all the way to Rusha\'s kulla, to lay so much as a hand upon its wall.', "Nana djalë n'Jutbinë s'ka ba, / Motra vlla nuk ka përkundë. / Pela maz s'ka ba mejdanit, / Për me i ra gjogut në shpinë, / Për me hi natën n'Krajli, / Tu kulla Rushës me m'i vojtë, / Sall me dorë kullat me ja prekë."],
        ['32.3', 'So hear me, my companions — let\'s make ourselves a plough and a ploughshare instead, and go work the land as farmers.', "Në m'ndigjoshi, more shokët e mij, / Po e punojmë nji pallë e nji parmendë / E po himë tokët e po i punojmë."],
        ['33.1', 'Then Zuku Bajraktari cut in, swearing by the very God who gave him life: Mujo—', "Atherë foli Zuko Bajraktari: / - Pasha 'i zot, Muj, qi m'ka dhanë,"],
        ['33.2', '—I myself was born right here in Jutbina, my own sister rocked me as a child, my own mare foaled the horse I ride to the mejdan, and by night I did mount and ride into the Krajl\'s land, all the way to Rusha\'s kulla — and I slept three nights with Rusha there.', "Nana djalë mue m'ka ba, / Motra vlla mue m'ka përkundë. / Pela gjog gjogun tem ka ba / E i kam ra gjogut tem në shpinë / E jam hi natën në Krajli / E tu kullat Rushës i kam vojtë / E tri net me Rushën un kam fjetë."],
      ],
      cast: {
        zuku: ['ledina', 'sits with the thirty Agas as the fire and the drink loosen everyone\'s tongue'],
        mujo: ['ledina', 'taunts the gathered Agas that none of them would dare touch Rusha\'s kulla'],
        agatJutbines: ['ledina', 'feast, drink, and talk long into the night'],
      },
    },
    {
      id: 'vow', title: 'A head, or the bride',
      note: 'Mujo mocks the claim as fever-talk; furious, Zuku swears before them all that he will have Rusha or leave his head behind.',
      lines: [
        ['34.1', 'Mujo\'s answer came swearing on his own Maker: Zuku, merely setting eyes on that tower would have laid you low with fever for three years running, and for three years it wouldn\'t have loosened its grip.', "Çka ka qitë Muji e ka thanë? / - Pasha 'i zot, Zuku, qi m'ka dhanë, / Sall me sy kullat me ja pa / Tri vjet ethet të kishin marrë, / Për tri vjet nuk t'kishin lshue,"],
        ['35.1', 'At that Zuku sprang to his feet — how furiously the man spoke out!', "Halla, n'kambë Zuku kenka çue, / Sa me idhnim burri ka folë!"],
        ['35.2', 'Zuku swore then by the God who gave him breath: were you not the foremost among us, Mujo, I would not stomach talk like that from you — I\'ll either win Rusha for myself, or leave my own head behind in the Krajl\'s country.', "- Pasha 'i zot, Muj, qi m'ka dhanë, / Mos me kenë ma i madhi ndër ne, / Qato fjalë nuk t'i duroj, / Ndo po e la kryet n'Krajli, / Ndo po e marr Rushën e krajlit."],
      ],
      cast: {
        mujo: ['ledina', 'mocks Zuku\'s claim, warns he\'d have caught fever just from looking at the kulla'],
        zuku: ['ledina', 'springs up in fury and swears before the Agas: Rusha, or his head left behind'],
      },
    },
    {
      id: 'mother1', title: 'A cup of coffee, untouched',
      note: 'Zuku goes home; his mother makes him the finest coffee she knows, but he won\'t touch it until he\'s told her the vow he has sworn — and she counsels him to forget it.',
      lines: [
        ['36.1', 'Zuku went straight home, and his mother came out to meet him and brought him into her own chamber.', "Fill te shpija Zuku kenka shkue, / Para nana m'i ka dalë, / Mbrendë n'odë e ka shti,"],
        ['36.2', 'She brewed him coffee sweetened with sugar and swore before God: I have never brewed better coffee than this — yet the boy would not touch it at all.', "Ja pjek kafen me sheqer; / Be n'zotin nana i ka ba, / Kurr ma t'mira kafet s'i pjek. / As hiç djali kafen nuk ja merr."],
        ['37.1', 'His mother pressed him with a string of guesses: had a friend or blood-brother died on him, had some baloz called him out to a duel, was he headed off to fight at the mejdan — what had put him in such a temper today?', "E ka qitë e ama e i ka thanë: / - A t'ka dekë mik a probatin, / A t'ka dalë baloz n'mejdan, / A ke nisë mejdanit me i pritue? / Çfarë idhnimit, djalë, sot t'paska ra?"],
        ['38.1', 'Zuku answered his mother, swearing on his Maker: no friend or blood-brother of his had died, no baloz had called him to a duel, and he wasn\'t setting out for the mejdan at all.', "Nanës s'vet Zuku i ka thanë: / - Pasha 'i zot, nanë, qi m'ka dhanë, / As s'm'ka dekë mik as probatin, / As s'm'ka dalë baloz n'mejdan, / Mos o zot mejdanit me i pritue;"],
        ['38.2', 'But I have given my word among my companions: either I will have royal Rusha, or I\'ll leave my head behind in the Krajl\'s land.', "Por llaf ndër shokë si kam ba, / Ndo me e lanë kryet n'Krajli, / Ndo me marrë Rushën e krajlit."],
        ['39.1', 'Hear then what the mother answered her son: by the breast I gave you, by all the greatness I built in you, keep away, my son, from the world\'s vain pleasures, and keep away from false counsel — God has already given us riches enough.', "Kqyr e ama djalit ça i ka thanë! / - Pash gjitë, bir, qi t'kam dhanë, / E pash majën, qi t'kam ba, / Hiqmu, bir, hallajkosh s'dheut, / Hiqmu, bir, divanesh s'remta, / Se pare boll zoti na ka falë"],
        ['39.2', 'Your own mother will write you a good letter and send it from village to village, from town to town, to find you a fine girl of good family, and pay her bride-price honestly for you.', "E p'e shkrue lokja 'i letër t'mirë, / E p'e qes katund m'katund, / E p'e qes shehër m'shehër. / Ta xe lokja nji çikë të mirë / E ta xe n'nji oxhak të mirë / E ta la me pare t'hallallit."],
      ],
      cast: {
        zuku: ['kulla', 'goes home, refuses his mother\'s coffee, and tells her of his sworn vow'],
        nenaZukut: ['kulla', 'presses her son for the cause of his fury, then begs him to give up the vow'],
      },
    },
    {
      id: 'horse', title: 'The seven-year courser',
      note: 'Zuku holds to his vow and sends his mother to the cellar. There a courser shut away seven years weeps with her at the danger ahead — then she saddles it in gold for his ride.',
      lines: [
        ['40.1', 'Zuku Bajraktari spoke again, calling his Maker to witness: either royal Rusha would be his, or his head would stay behind in the Krajl\'s country.', "Atherë foli Zuke Bajraktari: / - Pasha 'i zot, nanë, qi m'ka dhanë, / Ndo po e la kryet n'Krajli, / Ndo po e marr Rushën e Krajlit."],
        ['40.2', 'Go down, mother, into that dark cellar, and pick me out a courser I would be glad to ride.', "Hajt e hin, nanë, n'at burgun e terrtë / E ma zgidh, tha, nji gjog për qef."],
        ['41.1', 'In tears did the mother go down, and this is what the courser said to her.', "M'â nisë nana, tha, tue lotue / E ç'ka qitë ai gjog asaj e i ka thanë?"],
        ['41.2', 'For seven years now I\'ve been shut in this cellar, never once seeing the light of the sun, and never once has the cellar leaked — but today, it says, the cellar has begun to drip.', "- Tash shtatë vjet n'njet burg qi jam kanë, / Drit'n e diellit askurr s'e kam pa, / Askurr burgu mue nuk m'ka pikue, / Sot ka nisë, tha, burgu me pikue."],
        ['42.1', 'What did the mother answer? The cellar has not begun to drip — it is I myself, courser, who am weeping, for Zuku means to go into the Krajl\'s land.', "Ç'ka qitë nana e i ka thanë? / - S'ka nisë burgu ty me t'pikue, / Por jam vetë, gjog, tue lotue, / Se n'Krajli Zuku don me shkue."],
        ['42.2', 'I fear that before long they will cut off Zuku\'s head, and you too, courser, they will capture — they\'ll pile a heavy load on your back and knock the shoes clean off your hooves.', "Besa shpejt, tha, Zukun kanë me e pre / Edhe ty, tha, gjog, kanë me t'marrë / E samarin ty kanë me ta vu / E barrë t'randë me ty kanë me bajtë, / Tanë patkojt, tha, gjok ty kanë me t'ra."],
        ['43.1', 'What did the courser answer? If we still have the luck we\'ve always had, we\'ll come home to Jutbina safe and sound.', "E ç'ka qitë gjogu e ka thanë? / - Si n'e paçim baftin, qi e kem' pasë, / Na n'Jutbinë shndosh, tha, kem' me ardhë."],
        ['43.2', 'What did the mother answer? If your luck holds and you come home safe, I\'ll feed you rice in place of barley, and give you wine in place of water.', "E ç'ka qitë nana e i ka thanë? / - Për ne e paçi baftin për me pshtue, / N'vend t'elbit oriz ti ke me ngranë, / N'vend t'ujit venë ty kam me t'dhanë."],
        ['44.1', 'The mother set to saddling the courser herself: a golden saddle set on its back, straps of patent leather cinched tight, reins of silk buckled on, and then she brought it up the staircase to where Zuku waited.', "Ka nisë nana gjogun me e shilue, / Po m'ja ven shalën prej florinit, / E m'ja ven bilanat telatinit, / E m'ja ven frenin prej brishimit, / E n'fund t'shkallve Zukut ja ka çue,"],
        ['44.2', 'So loudly did the courser whinny that the sound of it deafened all Jutbina.', "E sa t'madhe gjogu ka hingllue, / T'gjithë Jutbinën gjogu ma ka shurdhue!"],
      ],
      cast: {
        zuku: ['kulla', 'refuses his mother\'s counsel and sends her down to the cellar for a courser'],
        nenaZukut: ['kulla', 'weeps as she saddles the seven-year courser for her son\'s ride'],
        gjogSeteVjet: ['kulla', 'freed from seven years in the dark cellar, saddled in gold for the ride'],
      },
    },
    {
      id: 'ride', title: 'Smoke and dust to the Krajl\'s land',
      note: 'By night Zuku rides for Rusha\'s kulla and knocks — but she won\'t open for anyone who might be Mujo or Halili, until he raises his hand to the window and she knows his sleeve and his ring.',
      lines: [
        ['45.1', 'When the dusk of night was falling, what did Zuku Bajraktari do?', "N'muzg të natës, nata tuj ra, / Ça ka ba Zuke Bajraktari?"],
        ['45.2', 'He leapt onto his courser\'s back, and the two of them raised smoke and dust behind them as he rode by night into the Krajl\'s land.', "I ka ra gjogut në shpinë, / Tym e mjegull gjogun e ka ba / E â hi natën n'Krajli"],
        ['45.3', 'He came to Rusha\'s kulla, knocked at her door, and called: open the door, Rusha, and let me in!', "E tu kullat Rushës i ka ra / E n'derë Rushës i ka cokatë. / - Çilma derën, Rushe, mbrendë t'hi!"],
        ['46.1', 'She refused him: the door stays shut, since you could well be Gjeto Basho Mujo himself.', "- Nuk muj derën, thotë, me ta çilë, / Ndoshti je Gjeto Bashe Muja."],
        ['46.2', 'Open the door and let me in, he said, for I am not the one you speak of.', "- Çilma derën mbrenda t'hi, / Se un s'jam ai qi po thue."],
        ['46.3', 'She refused again: the door stays shut, since you could just as well be young Halil Aga.', "- Nuk muj derën, thotë, me ta çilë, / Ndoshti je Halil Aga i ri."],
        ['46.4', 'Open the door and let me in — I am not young Halil Aga, he said — I am Zuku Bajraktari.', "- Çilma derën mbrenda t'hi, / Se un nuk jam Halil Aga i ri, / Por un jam Zuke Bajraktari."],
        ['47.1', 'If you are truly Zuku, as you say — hold your hand out to where my window is, and let me judge for myself: I\'ll know your coat-sleeve, and I\'ll know the very ring I once placed in your hand.', "- Ti, në kjosh Zuka si po thue, / E çon dorën përsipri xhamit, / Se ta njof mangën e xhamadanit, / Se ta njof mhyrin qi t'kam dhanë."],
        ['47.2', 'Up went his hand toward her window, and at once she recognized the sleeve of his coat and the very ring she\'d once given him.', "E çon dorën përsipri xhamit, / Mirë ja njef mangën e xhamadanit, / Mirë ja njef mhyrin, qi i ki' dhanë."],
      ],
      cast: {
        zuku: ['kullaRusha', 'rides by night to Rusha\'s kulla and proves who he is at her window'],
        gjogSeteVjet: ['kullaRusha', 'carries Zuku through the night in smoke and dust'],
        rusha: ['kullaRusha', 'won\'t open her door until she knows Zuku\'s sleeve and the ring she gave him'],
      },
      items: { unaza: ['rusha', 'kept since Zuku gave it to her — now the proof at the window'] },
    },
    {
      id: 'besa', title: 'Coffee, on one condition',
      note: 'Rusha opens her door — but Zuku won\'t drink her coffee until she swears to do as he says. She gives her word, and by the next nightfall they ride together for Jutbina.',
      lines: [
        ['48.1', 'So she opened the door, led his courser down into the stable, brought him up into her own chamber, and made him coffee sweetened with sugar.', "Njatherë derën, tha, ja ka çilë / E n'podrum, tha, gjogun ja ka shti, / E n'odë nalt Zukun e ka hipë, / Ja ka pjekë kafen me sheqer,"],
        ['48.2', 'But Zuku would not touch it at all — first give me your word before God, he said, that you\'ll do exactly as I tell you.', "As hiç Zuku kafen nuk ja merr, / «Pa ma dhanë,» thotë, «besën e zotit, / Qi si t'tham ke me m'ndigjue.»"],
        ['48.3', 'Rusha gave him her word before God, and only then did he drink her coffee, and he rested there a day and a night.', "Besën e zotit Rushja ja ka dhanë. / Atherë kafen e ka pi, / 'I natë e 'i ditë aty ka pushue."],
        ['49.1', 'The next evening, as night was darkening, Zuku leapt onto the back of his courser.', "Ne e nesret mbrama, nata kur â errë. / N'shpinë t'gjogut Zuku paska kcye,"],
        ['49.2', 'Rusha dressed and shod herself finely, filled her pockets with gold ducats, and Zuku set her up behind him on the courser.', "Mirë asht veshë Rushja e mirë asht mbathë / E i ka mbushë xhepat me duket / E n'vithe t'gjogut Zuku e ka hipë,"],
        ['49.3', 'Smoke and dust rose up behind them, and by the time light broke, they had come safe to Jutbina.', "Tym e mjegull gjogun e kanë ba, / Shndosh n'Jutbinë, tha, drita u ka çilë."],
      ],
      cast: {
        zuku: ['jutbina', 'won\'t drink Rusha\'s coffee until she swears to obey him, then rides her home to Jutbina by the next nightfall'],
        rusha: ['jutbina', 'gives her besa, dresses in her finest, and rides home behind Zuku'],
        gjogSeteVjet: ['jutbina', 'carries them both home to Jutbina by first light'],
      },
    },
    {
      id: 'claim', title: 'Mujo\'s claim',
      note: 'Word reaches Gjeto Basho Mujo, who flies into a rage and sends Zuku word that Rusha belongs to him.',
      lines: [
        ['50.1', 'When Gjeto Basho Mujo heard of it, such fury seized the man that he sent Zuku word: Rusha belonged to him.', "Kur ka ndie Gjeto Basho Muja, / Sa idhnim trimi ka marrë / E fjalë Zukut i ka çue, / Qi «për mue Rushja ka ardhë.»"],
      ],
      cast: {
        mujo: ['jutbina', 'hears of it and, in a fury, sends Zuku word that Rusha belongs to him'],
      },
    },
    {
      id: 'cadi', title: 'A judge between two threats',
      note: 'No council of elders will settle the dispute, so both warriors go to the cadi — and each threatens to break his neck if the verdict favors the other.',
      lines: [
        ['51.1', 'God have mercy — so many councils of elders took up her case, and none of them dared to settle it, so the two rivals went before the cadi themselves.', "Aman zot, shum pleqninë kanë qitë, / Kush s'â dalë pleqninë me jau da, / Te kadija t'dy kenkan vojtë."],
        ['51.2', 'They told the cadi: understand this — many councils have gathered over her, and none has dared to settle it; God has made you a man of sense, so it is you who must judge this matter for us, or else we\'ll break your neck in two.', "- A merr vesh, kadisë i kanë thanë, / Shum pleqni për Rushën qi kanë qitë, / Kush s'â dalë pleqninë me na e da; / Ty t'mêçëm zotynë t'ka falë, / Qet pleqni ke me na e da, / Ndo dy copësh qafën ta kputim."],
        ['52.1', 'The two warriors went back to their homes, but Mujo turned aside and went alone to the cadi.', "Të dy n'shpi trimat kanë shkue, / Tjetër anë Muja kenka sjellë, / Te kadija kenka vojtë."],
        ['52.2', 'Mujo pressed the cadi to grasp one plain fact: Rusha had come to Jutbina on his account, no one else\'s — so should the verdict hand her over to Zuku instead, the judge could count on losing his own neck.', "- A merr vesh, kadisë m'i kanë thanë, / A merr vesh, more kadi, / Për mue Rushja qi ka ardhë; / Nusen Zukut me m'ja qitë, / Un dy copësh qafën ta kputi!"],
        ['53.1', 'Then to the other side went Zuku: understand, cadi — I won Rusha for myself, and how bitterly I suffered to win her.', "Tjetrës anë Zuku kenka vojtë: / - A m'merr vesh, more kadi, / Unë për vedi Rushën e kam marrë, / Se sa keq mbas saj qi kam hjekë;"],
        ['53.2', 'Should the cadi instead rule for Gjeto Basho Mujo, Zuku warned, that same neck would be broken in half.', "Me m'ja qitë nusen Gjeto Basho Mujit, / Dy copësh qafën ta kputi!"],
        ['54.1', 'The cadi was seized with horror — leave the matter unsettled, and the two of them together would cut his neck; give the bride to Zuku, and Gjeto Basho Mujo would break it; give her instead to Mujo Bylykbashi, and Zuku Bajraktari would break it just the same.', "Sa n'gazep kadija kenka ra! / Paj me e lanë pleqninë për pa e da, / Të dy bashkë kadinë po e presin; / Me m'ja qitë nusen Zuke Bajraktarit, / Po ma preke Gjeto Basho Muji; / Me m'ja qitë Mujit Bylykbash, / Paj, po e pret Zuke Bajraktari."],
      ],
      cast: {
        mujo: ['oborriKadiut', 'threatens to kill the cadi unless the judgment goes his way'],
        zuku: ['oborriKadiut', 'threatens the same if it doesn\'t'],
        kadiu: ['oborriKadiut', 'trapped between two warriors who\'ll each kill him for the wrong verdict'],
      },
    },
    {
      id: 'race', title: 'A race for the bride',
      note: 'God sends the cadi his answer: a horse-race on the war grounds. Mujo reaches Rusha first — but his own courser shies away at the last instant, and Zuku catches the bride instead.',
      lines: [
        ['55.1', 'For three full days and nights the cadi wrestled with the case without once shutting his eyes, until God finally showed him a way through it, and he summoned the two rivals before him.', "Ndej kadija tri dit e net, / Për tri net nuk ka mbyllë sy / E zotynë pleqninë ja ka pru. / E ka çue t'dy e i ka thirrë,"],
        ['55.2', 'The cadi told them: take Rusha with you, and set her up at the head of the war grounds, and measure your coursers to an equal distance, and let them both loose at once — whichever of you catches the bride first, to him let the bride be given.', "E ka qitë kadija e u ka thanë: / - Me vedi Rushën ta merrni / E ta qitni n'krye t'fushës s'mejdanit / E t'i matni gjogat barabar, / T'dy përiherë gjogat t'i lshoni; / Cilli ta kapë nusen ma parë, / Qatij nusja i kjoftë për hajr!"],
        ['56.1', 'Both warriors made straight for home, took the bride along with them, and swung up onto their coursers.', "Fill tu shpija trimat jane vojtë / E me veti nusen e kanë marrë / E n'shpinë gjogavet u kanë ra;"],
        ['56.2', 'They came out onto the war grounds, set Rusha up at the head of the field, took their places at the far end, and measured their coursers to an equal distance.', "Kenkan dalë n'at fushë t'mejdanit, / N'krye të fushës Rushën e kanë qitë, / N'fund të fushës të dy kanë ra / E i kanë matë gjogat barabar,"],
        ['57.1', 'The moment they let the two coursers loose together, Mujo was there first — but as he reached to seize the bride, God Almighty turned against him.', "T'dy përiherit i kanë lshue, / 'I sahat para Muja â vojtë. / Kur ka ba nusen për me e kapë, / Zotynë t'mbrapshtën ja ka dhanë,"],
        ['57.2', 'Mujo\'s courser took fright and shied away, turning back, so that Zuku came on and caught the bride himself, and set her up behind him on his own courser.', "Gjogu i Mujës kenka trembë / E përmbrapa gjogu ka dredhë. / Ish vojtë Zuku e nusen e kish kapë, / N'vithe t'gjogut nusen e ka qitë."],
      ],
      cast: {
        kadiu: ['oborriKadiut', 'sends the two rivals to the war grounds to settle it by a race of coursers'],
        zuku: ['fushaMejdanit', 'rides for Rusha as Mujo\'s courser shies at the last moment and turns back'],
        mujo: ['fushaMejdanit', 'reaches first but loses everything when his own courser balks'],
        rusha: ['fushaMejdanit', 'set at the head of the field, won at last by Zuku'],
        gjogSeteVjet: ['fushaMejdanit', 'wins the race Mujo\'s own courser refuses to finish'],
      },
    },
    {
      id: 'lament2', title: 'Mujo\'s bitter little song',
      note: 'Zuku rides off with Rusha behind him; Mujo is left with nothing but a bitter song for the courser that failed him.',
      lines: [
        ['58.1', 'What did Gjeto Basho Muja do then? He let out a small song of his own: where are you now, my courser, by the very luck I wish you—', "Ça ka ba Gjeto Bashe Muja? / E ka lshue një kangë të vogël: / - Ku je, gjog, tha, hajrin ta pasha,"],
        ['58.2', '—many a baloz have we cut down together, many brave deeds have we done together, but whoever betrays a comrade, may God never again grant him good fortune!', "Shumë balozat me ty i kam pre, / Shumë trimnitë me ty i kam ba, / Por kush iu çoftë shoqit për t'lig, / Kurr zotynë mbarë mos ja dhashtë!"],
        ['58.3', 'So they have told it to me — for I myself was not there to see it.', "Kshtu m'kanë thanë, / Se atje un s'jam kanë."],
      ],
      cast: {
        zuku: ['fushaMejdanit', 'rides off with Rusha behind him, the bride won'],
        mujo: ['fushaMejdanit', 'left with a bitter little song for the courser that failed him'],
      },
    },
  ],
}
