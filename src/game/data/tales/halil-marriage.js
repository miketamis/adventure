// ===========================================================================
// TALE: The Marriage of Halili (Martesa e Halilit) — see ../tales/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it.
//
// A KRESHNIK SONG, not a prose tale — one of the Kângë Kreshnikësh (Songs of
// the Frontier Warriors), sung by the same singer as "Fuqija e Mujit"
// (mujo-strength): Mëhill Prêka of Curraj i Epërm. "Paragraphs" here are 33
// narrative strophes and a "sentence" is a punctuation-bounded verse unit of
// 1-6 lines (own-words paraphrase — Elsie's translation is never copied; the
// Albanian third element is the verbatim verse group, lines joined with " / ").
// The game ALREADY STAGES a condensed five-screen version of this exact song
// off Jutbina (mujo1 → mujo2 → mujo3 → mujo4 → mujoFund, with its own ending
// blurb quoting the same folklore summary this tale expands) — the beats
// anchor onto that existing chain rather than inventing parallel geography.
// Mujo is the core NPC `mujo` (never duplicated); their mother is `nenaMujit`
// from ../npcs/tale-mujo-strength.js (reused by id, not duplicated either).
// ===========================================================================

export default {
  id: 'halil-marriage',
  title: 'The Marriage of Halili',
  source:
    'Sung by Mëhill Prêka of Curraj i Epërm (District of Tropoja); Visaret e Kombit, vol. II, ed. Bernardin Palaj & Donat Kurti (Tirana, 1937), pp. 23-41; repr. Folklor shqiptar II, Epika legjendare (Cikli i kreshnikëve), Vëllimi i parë, ed. Qemal Haxhihasani (Tirana, 1966), pp. 71-86 · read in Robert Elsie & Janice Mathie-Heck\'s translation, "The Marriage of Halili" (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Curraj i Epërm, District of Tropoja',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare I, 1966',
  },
  // ALBANIAN ORIGINAL RECOVERED — a prior pass on this tale declared it
  // missing after only checking the Wayback Machine (no snapshot of
  // verse_09_AL_05.pdf exists there) and a stray cached file that turned out
  // to be an HTML error page saved with a .pdf extension, not a real fetch
  // attempt. The schema's OWN recipe — plain HTTP straight at the live site,
  // bypassing its broken HTTPS cert — retrieves the genuine 14-page facsimile
  // without any trouble: `curl -sL -m 25 -o v.pdf
  // "http://www.albanianliterature.net/oralverse/verse_09_AL/verse_09_AL_05.pdf"`
  // returned HTTP 200 and an 83,956-byte PDF; `pdftotext -layout v.pdf -`
  // extracts the full song cleanly. Raw extract + provenance header saved to
  // `local` below.
  albanian: {
    title: '«Martesa e Halilit»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 23-41, in the embedded Albanian PDF Elsie & Mathie-Heck published beside their translation (verse_09_AL/verse_09_AL_05.pdf, fetched live over plain HTTP 2026-07-15) — the edition\'s Gheg orthography kept verbatim (already modern-alphabet; no transliteration needed); apostrophes mark the source\'s own elisions. Three suspected font/extraction glitches ("In" for "Ia" at lines 32, 40, 41 of the raw PDF text) corrected in the beat quotes only, per the schema\'s OCR-fix allowance — see `local` for the uncorrected raw text and full note.',
    local: 'docs/references/palaj-kurti-halil-marriage.sq.txt',
  },
  discrepancies: [
    'THE RING (¶11.3-4): the game\'s own already-built scene (content.js node mujo3: «unaza ka fytyrën e Halilit», "the ring has Halili\'s face") commits to the ring bearing Halili\'s own likeness — a portrait-ring. The Albanian original is, if anything, even less committal than Elsie\'s English: «E \'i unazë n\'tokë rrotullohet» (a ring simply "rolls on the ground") is one line, then a separate sentence has her sit up and recognize a face — «Kur ka pa ftyrën e djalit: - Po ket ftyrë, zot, ku e kam pa, / Qi po m\'giet me t\'Halilit?!» ("when she saw the young man\'s face: \'this face, oh God, where have I seen it — that it seems to me it\'s Halili\'s?!\'") — nothing in the Albanian ties the face to the ring itself. The beats follow the game\'s own already-committed reading (a portrait ring), since content.js treats it as settled fact.',
    'THE THREE HUNDRED MAIDENS (folklore.js summary vs. this fuller telling): the lore card compresses "Halil disguises himself among her three hundred maidens" into the same beat as the tent-night discovery. In the fuller song these are separate scenes days apart — Halili is caught alone, at midnight, inside Tanusha\'s own tent (no maidens present); only afterward, dressed in her own gown, does he pass among the three hundred at the morning wash, and later still ride disguised in the guarded cortege to New Kotor, where the Krajl himself literally miscounts them («Treqind çika qi po i njehë, / Nji ma tepër qi po i del» — "three hundred maidens he counted, and one too many came out"). The beats keep this fuller sequence; the lore card\'s single phrase is read as covering the whole camp-to-cortege stretch, not one instant.',
    'THE QUEEN\'S OWN NATURE (¶21.5): the Albanian is more specific than Elsie\'s English, and arguably more damning. Elsie renders it "she was no mother… a dragua-slaying monster" (implying, in English, something that SLAYS dragons — almost heroic). The original reads «Po, por nana s\'ish kenë nanë, / Ish kenë bishë qi hate drangujt» — "but the mother was no mother, she was a beast that used to DEVOUR drangs" (drangs being the legendary champions born to fight the kulshedra, not dragons themselves) — a beast that preys on heroes, not one that kills monsters. Genuinely ambiguous whether the old song means only a fierce epithet for a mother turned traitor, or something more literally supernatural; the beats keep that ambiguity rather than resolving it, and mbreteresha\'s registry entry is written kind: \'human\' with the ambiguity named in her own backstory, not settled.',
    'A HERO\'S OATH, SOFTENED IN TRANSLATION (¶3.4): where Halili cuts Mujo off, the Albanian has him say «Prapou, Mujë, se m\'ka ardhë dita e dekës!» — literally "Get back, Mujo, for my day of death has come!" — a much harder line than Elsie\'s smoothed-over "Leave me alone, for I speak now or never." The beats keep Elsie\'s general sense (Halili insists on having his say) without repeating the softened phrase; the verbatim Albanian third element preserves the harder original.',
    'MINOR NAMED FIGURES WITHOUT A CAST ENTRY: Jera (the maid who explains the approaching riders, ¶1.4), Basho Jona and Osman Aga (individual Agas who speak, ¶4.1-4.2), and Vukë Harambashi (Mujo\'s blood brother, named as Halili\'s intended contact, ¶7.1-7.2 — but the ora tells Halili he has long since left for other lands before Halili ever arrives, ¶9.3) are all named in the lines but never tracked on a beat board. Jera and the individual Agas speak for the collective `agat` and are folded into its lines; Vukë Harambashi never physically appears at all, so the plan that names him is narrated in full but he is given no place of his own.',
  ],
  // sentence counts of the English translation's 33 narrative strophes
  paragraphs: [8, 7, 4, 6, 2, 4, 3, 4, 5, 5, 4, 4, 2, 2, 2, 3, 3, 2, 3, 2, 5, 3, 4, 2, 4, 2, 3, 3, 3, 2, 2, 2, 3],
  cast: [
    { id: 'halili', name: 'Halili', note: '"Sokol Halili" — Mujo\'s young, unmarried brother', npc: 'halili' },
    { id: 'mujo', name: 'Mujo', note: 'elder kreshnik of Jutbina, Halili\'s own brother', npc: 'mujo' },
    { id: 'nena', name: 'their mother', note: 'Mujo and Halili\'s mother, who tips the courser back to Halili', npc: 'nenaMujit' },
    { id: 'agat', name: 'the Agas of Jutbina', note: 'three hundred fighting men, Mujo and Halili\'s own', npc: 'agatJutbines' },
    { id: 'tanusha', name: 'Tanusha', note: 'the Krajl\'s daughter of New Kotor, Halili\'s bride', npc: 'tanusha' },
    { id: 'krajli', name: 'the Krajl of New Kotor', note: 'Tanusha\'s father, the Captain King', npc: 'krajliKotor' },
    { id: 'mbreteresha', name: 'the queen of New Kotor', note: 'Tanusha\'s mother', npc: 'mbreteresha' },
    { id: 'ora', name: 'the mountain ora', note: 'guides Halili to the Danube crossing', npc: 'oraDanubes' },
    { id: 'dhia', name: 'the three wild goats', note: 'voice the sun, the moon, and the zana\'s protection', npc: 'dhitZanat' },
    { id: 'jovani', name: 'Jovani', note: 'stops for Tanusha weeping in the street', npc: 'jovani' },
    { id: 'gruaja', name: 'the countrywoman of Kotor', note: 'sends the message that reaches Mujo', npc: 'gruaJaKrahines' },
  ],
  // anchor = the game location this tale place inhabits. This is a NORTHERN
  // (Gheg) frontier song, same singer as mujo-strength — and the game already
  // stages a condensed version of THIS song at Jutbina's own mujo1..mujoFund
  // chain, so every place below reuses that chain rather than proposing new
  // parallel geography (per THE SHARING RULE — reuse over invention).
  places: [
    { id: 'jutbina', emoji: '🏘️', name: 'the Plain of Jutbina', note: 'Mujo and Halili\'s home, towers and open plain',
      anchor: { status: 'existing', node: 'jutbina', mirror: 'Jutbina — the game\'s own kreshnik hub',
        mold: 'already Mujo and Halili\'s home in-game, and already the seed of this exact song — the game\'s mujo1→mujoFund chain narrates a condensed telling of the very story these beats expand in full',
        sharedWith: ['mujo-strength', 'the death-of-omer arc (planned, omer1/omer2/omerFund)', 'the zuku-bajraktar arc (planned, rusha1/rushaFund/rushaKeq)', 'the mujo-avenges-halil arc (planned, halil1/halilFund/halilKeq)'] } },
    { id: 'bjeshka', emoji: '⛰️', name: 'the high mountain pastures', note: 'the bare flank Halili crosses toward the frontier',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank (three-friends\' and mujo-strength\'s own words for this spot)',
        mold: 'a bare, empty flank where wanderers cross paths — nobody owns the open mountainside; three-friends set this spot aside for exactly a "muji-halili" use, mujo-strength already claimed it once for Mujo\'s own cowherd years, and this tale claims it again for Halili\'s own crossing — the mountain hosts every kreshnik traveller and never runs out of room',
        sharedWith: ['three-friends (reserved "muji-halili")', 'mujo-strength', 'sari-salltek'] } },
    { id: 'lumiDanub', emoji: '🌊', name: 'the Danube ford', note: 'the wide frontier river and the Krajl\'s border camp on its far bank',
      anchor: { status: 'proposed', node: 'mujo2', mirror: 'the Danube — the Kângë Kreshnikësh\'s own name for the river the heroes cross into "the Realm of the Christians"',
        mold: 'the border river and the tented camp on its bank — mujo2 already narrates Halili\'s approach to exactly this frontier ("Tanusha stays far… guarded by the Sun, the Moon and the Zana… I hide among the maidens"); a fuller scene here would draw the fog bank, the scarlet pavilion, the oak by the water, and the flat washing-stones the poem itself describes',
        proposal: 'draw a riverbank camp off mujo2: tents on the far shore, an oak with roots down to the water, washing-stones for the maidens' } },
    { id: 'kullaTanushes', emoji: '🏯', name: 'Tanusha\'s kulla', note: 'her own twelve-floor tower on the sea-cliffs of New Kotor',
      anchor: { status: 'existing', node: 'mujo3', mirror: 'New Kotor\'s own royal quarter — the walled town the Kângë Kreshnikësh always sets across the frontier from Jutbina',
        mold: 'mujo3 already narrates exactly this tower\'s two events — Halili hidden among the maidens, and the Krajl catching him — so the beats keep both events at the one spot the game already built for them',
        conflicts: 'NOT kalaRozafa (an Albanian legend-castle with its own walling story and its own three builder-brothers, not a foreign Krajl\'s seaside tower). NOT bregu/balozLufte (Gjergj Elez Alia\'s own shore and the Baloz\'s battle — a different frontier story, a different sea).' } },
    { id: 'burgKotor', emoji: '⛓️', name: 'the town below', note: 'New Kotor\'s streets, church square, dungeon and hall',
      anchor: { status: 'existing', node: 'mujo4', mirror: 'the town under Tanusha\'s tower — the same New Kotor, seen from its streets and square',
        mold: 'mujo4 already narrates exactly this stretch — the Krajl leaving Halili in the dark, Halili singing, Mujo hearing the song from afar and the agas coming — so the beats keep the captivity, the stake, and the rescue-call at the spot the game already built' } },
    { id: 'fushaMbretit', emoji: '⚔️', name: 'the reeds and the Krajl\'s hall', note: 'the coastline where Mujo\'s men hide, and the final battle',
      anchor: { status: 'existing', node: 'mujoFund', mirror: 'the field before New Kotor\'s hall, where the frontier settles its debts',
        mold: 'mujoFund already narrates exactly this fight — Mujo against the Krajl, Halili striking the killing blow, Tanusha won — so the beats keep the rescue battle at the spot the game already built' } },
  ],
  items: [
    { id: 'gjogu', emoji: '🐎', name: 'the courser', note: 'Mujo\'s own horse, lent to Halili — finds its own way to Vukë Harambashi, and later swims a message home' },
    { id: 'unaza', emoji: '💍', name: 'the ring', note: 'bears Halili\'s own likeness — the token that lets Tanusha know him' },
    { id: 'rrobat', emoji: '👗', name: 'the maiden\'s garments', note: 'Tanusha\'s own gold-threaded gown, Halili\'s disguise among her three hundred maidens' },
    { id: 'lahuta', emoji: '🎻', name: 'the lahutë', note: 'given to Halili at the stake for his last song — the song that summons Mujo' },
  ],
  // HOW THE GAME STAGES THIS SONG: the condensed five-screen chain off Jutbina
  // (mujo1 → mujo2 → mujo3 → mujo4 → mujoFund) is a witness telling — you hear
  // the song rather than embody Halili — so no `as`/`with` and no `become`.
  // scenes map each existing STORY node onto the beat it condenses.
  play: {
    entry: 'winterRefuge',
    stance: 'witness',
    // witness: NO as/with
    role:
      'You hear the frontier song of how young Sokol Halili won his bride. Taunted for going unwed, he wants only Tanusha, the Krajl of New Kotor\'s daughter, glimpsed once at a truce — and rides for her guarded on the road by the Sun, the Moon and the Zana, slipping in among her three hundred maidens in a borrowed gown. But the queen\'s betrayal throws him into a dungeon, and from the stake his last song on the lahutë carries home to Jutbina, summoning Mujo and the Agas to storm the town and carry both Halili and his bride away by force.',
    from: 'mujo1',
    ending: 'mujoFund',
    scenes: {
      mujo1: 'askedAboutHalili',
      mujo2: 'guardiansJourney',
      mujo3: 'tanushaWakes',
      mujo4: 'fiveMinutesSong',
      mujoFund: 'mujoOnslaught',
    },
    divergences: [
      { note: 'The game telescopes the whole 33-strophe song into a five-screen chain off Jutbina — the winter refuge, Halili\'s vow and mountain-melting curse, the guarded journey, the tent-night, the disguise among three hundred maidens, the cortège to New Kotor, the queen\'s betrayal, the dungeon and the rescue battle all collapse into five beats. The tale record keeps the full sequence the screens only gesture at.' },
      { beat: 'tanushaWakes', note: 'In the game\'s mujo3, Tanusha knows Halili by a ring bearing his own likeness — a portrait-ring. The original song is far less committal: a ring merely rolls loose on the floor, and in a separate line she recognises the face beside her — nothing ties that face to the ring itself. The beats follow the game\'s already-settled reading.' },
      { beat: 'guardiansJourney', note: 'The game frames the Sun, the Moon and the Zana as the guard Halili must slip past to reach Tanusha. In the song they are his protectors, not his enemy — three wild goats voice the promise and a mountain ora escorts him to the Danube; the real danger is the queen\'s own betrayal, not the celestial guard.' },
    ],
  },
  beats: [
    {
      id: 'winterRefuge', title: 'A gale off the mountain',
      note: 'Deep winter grips Jutbina; a storm blinds three hundred Agas returning from a hunt, and Mujo takes them all in for the night.',
      lines: [
        ['1.1', 'Deep winter grips Jutbina, and the water-maids driving cattle to the river and the springs find both frozen solid.', "Lum për ty, o i lumi zot! / Fort po shndritë njaj diell e pak po xe’! / Ç’p’e merr frima rrapin e Jutbinës! / Borë e madhe qi ka ra, / Randojnë ahat për me u thye, / Kin çetinat vetëm kreshtat, / Ushtojnë lugjet prej ortiqesh, / Prej ortiqesh, kah po bijnë ndër gropa. / Janë ra vashat me gja n’lumë, / Kanë gjetë lumën tanë ngri akull; / Kanë nisë vashat me lypë krojet, / Kanë gjetë krojet tanë ngri hej."],
        ['1.2', 'They fear the whole herd will die before any thaw frees the water.', "Ça kanë qitun e kanë thanë? / - Kur t’bajë zoti me e lirue, / Gjaja e gjallë, druem, ka mbarue!"],
        ['1.3', 'Then they spot armed travellers coming down off the snowy passes and wonder aloud if it is a wedding party.', "Po, zot, ç’janë njata shtegtarë, / Veshë e mbathë porsi zotnij? / Mos janë nisë trimat për me çetue, / Qi ata qafat kurr s’mund i kalojnë!"],
        ['1.4', 'Jera tells them no — the zana have gone to ground in the river for the winter, so this can only be Mujo coming back from a hunt with his own fighters.', "Ka qitë Jera edhe u ka thanë: / - O nuk janë, jo, krushq darsmorë, / Se ata paresh ranë n’lumë; / Ka dalë Muji me kreshnikë, / A thue ndeshet m’ndoi gja malit!"],
        ['1.5', 'But cloud suddenly swallows the sun, and a gale drives blinding snow into the warriors\' faces just as they reach the river.', "T’kjoshim falë, o i madhi zot, / Sa shpejt diellin ma xu reja! / Shpejt ma endi ‘i pëlhurë t’gjanë e t’gjatë! / E i ka veshun majet rreth e rrokull, / Qi, kur janë kapë trimat tu lumi, / Kaq përzi i ka frima plajm e re, / Askurrnja shoshojnë trimat s’p’e njofin."],
        ['1.6', 'Half-blind and freezing, the men lose sight of one another — until they make out Mujo\'s own tower by the water.', "Ia ngri trimat me sharrue, / Por n’breg t’lumit - kulla e Mujit,"],
        ['1.7', 'Mujo takes them all in for the night and piles the fire high enough to warm three hundred heroes at once.', "T’tanë për darkë Muji i ka ndalë. / Kqyr shka bani Gjeto Basho Muji! / E ka vu nji barrë dru t’vogël n’zjarm, / Treqind vetë priherë m’u xe,"],
        ['1.8', 'He brings out raki and wine, and the warmed men fall to talking, joking, and laughing.', "Atherë trimi u ka avit bucelat, / Atherë trimi u ka avitë fuçijat. / Ia bucelat plot raki, / Ia fuçijat plot me venë. / Sa shpejt frima burrave u ka ardhë! / Sa shpejt gjaku trimave po u xehet! / Kanë marrë llafin e po llafiten, / Kanë marrë gazin e po gazmojnë,"],
      ],
      cast: {
        halili: ['jutbina', 'idle at the fire among the Agas, mocked as usual for going unmarried'],
        mujo: ['jutbina', 'hosts the storm-caught Agas at his own kulla, the fire piled high'],
        nena: ['jutbina', 'keeps the hearth, watching over both her sons'],
        agat: ['jutbina', 'blinded and frozen by a sudden gale, thaw out at Mujo\'s own fire'],
        tanusha: ['lumiDanub', 'the Krajl\'s only daughter, not yet met'],
        krajli: ['burgKotor', 'rules New Kotor, not yet met'],
        mbreteresha: ['burgKotor', 'queen of New Kotor, not yet met'],
        ora: ['bjeshka', 'watches the frontier crossing, unseen, not yet met'],
        dhia: ['bjeshka', 'three wild goats of the high pastures, not yet met'],
        jovani: ['burgKotor', 'a man of New Kotor, not yet met'],
        gruaja: ['burgKotor', 'a countrywoman with her own kulla, not yet met'],
      },
      items: { gjogu: ['mujo', 'Mujo\'s own courser, saddled at Jutbina'] },
    },
    {
      id: 'askedAboutHalili', title: 'Why is the boy still unwed?',
      note: 'Warmed and merry, the Agas put a question to Mujo: why, with all his peers married, has Halili never taken a bride?',
      lines: [
        ['2.1', 'As guests at his hearth, the warriors put a question to Mujo: why, with all his peers long married, has he never found a bride for his brother Halili?', "Kanë nisë trimat Mujin p’e pëvetin: / - N’votër tande kem’ qillue, / Mos na ki randë për nji fjalë! / Pash nji zot, Mujë, qi t’ka dhanë, / Qysh Halilin s’e martove? / Janë martue krejt moca e tij, / Djelm e çika zotynë u ka falë, / Djelt e tyne n’lojë t’tanë janë dalë."],
        ['2.2', 'Is it the expense that holds him back, they ask, or the trouble of arranging a wedding?', "A t’u dhimtën paret për me i dhanë? / A t’u dhimten darsmat për me i ba?"],
        ['2.3', 'They worry for the boy besides — he keeps wandering toward New Kotor, and one day the enemy will take him alive and shame the whole tribe.', "Tutna djalin dikush po na rre. / Shpesh e shpesh po bje’ n’Kotorre t’reja, / Rob të gjallë djalin p’e xanë. / Le’ konakun, Mujë, qi s’po ta fikin, / Ma zi fisin, Mujë, po na koritin."],
        ['2.4', 'Mujo answers calmly: neither cost nor trouble has ever worried him.', "As be m’zotin trimi nuk ka ba. / - Faqebardhë, more shokë, ju kjoshi, / Se mirë hallin po ma diki, burra! / Mana paret s’m’u kanë dhimët me i dhanun! / Mana, darsmat s’m’u kanë dhimët me i bamun!"],
        ['2.5', 'What brother would grudge his own kin a wedding, he says — Halili is no thief but a proven hero.', "Ju t’pavllazën, shokë, s’kini qillue, / Kuj po i dhimen darsmat për vlla t’vet? / Ky edhe s’asht, or burra, cub flligshtish, / Mirë e njihni, se â daji trimnish."],
        ['2.6', 'Yet should Halili ever bring dishonour on them, Mujo swears the sun itself should be darkened for him.', "Qi për n’dashtë me m’pru marren te shpija, / He, ktij zoti i shkimët hisen e diellit!"],
        ['2.7', 'And should he shame the tribe, let lightning strike him down and the earth spit his own body from the grave.', "E n’pastë menden me na koritë fisin, / Gjujma, re, qetash me kokërr rrfeje! / Zirma tokë, përjashta n’natë të vorrit!"],
      ],
      cast: {
        agat: ['jutbina', 'press Mujo, warm and merry now, on why Halili still goes unwed'],
        mujo: ['jutbina', 'answers calmly for his brother, swearing a hard oath on his own behalf'],
      },
    },
    {
      id: 'halilVow', title: 'Only Tanusha, or no one',
      note: 'Halili swears he would rather die unmarried than take any woman of Jutbina — he wants only Tanusha, glimpsed once at a truce, and launches into her praises until Mujo silences him.',
      lines: [
        ['3.1', 'Halili swears before them all: every woman of Jutbina, and of the whole krahina besides, is like a sister to him — he would rather die unmarried than take one of them.', "At be m’zotin djali por ka ba: / - Kah kam vlla e kah kam motër, / Deksha para, n’u martosha! / Se gjithë grat e Krahinës, ku janë, / Se gjithë vashat e Jutbinës, ku janë, / Bash si motra qi po m’duken."],
        ['3.2', 'He wants no one but Tanusha, the king\'s daughter — a face he saw only once, across the frontier at a parley, and has carried with him ever since.', "Dheu m’ka mlue e fat s’i qita vedit, / Po s’e mora Tanushën e krajlit. / E un Tanushën vetë e ko’ pa, / Kur kem’ pasë besë me Krajli."],
        ['3.3', 'He launches into a long praise of her beauty — her brows, her eyes, her face, her teeth, her neck, her figure, even her hands.', "Gja ma t’mirë s’shef njeri nën ket diell! / Vetulla e saj ndrejt si fiskaja, / Shteku i ballit si shteku i malit, / Kur merr hana me pranue, / Syni i saj si kokrra e qershisë, / E ka qerpikun si krahi dallndyshës, / Ftyra e saj si kuqet molla n’degë, / Hunda ndrejt si kalemi i Tushës, / Goja e vogël si lula qi shpërthen, / Dhamët e bardhë si gurzit e lumit, / Fill mbas shiut kur po i shndritë dielli, / Qafa e saj si qafa e pllumbit, / Shtati i saj si ‘i shtat çetinet, / Misht e dorës porsi rremi i shemshirit."],
        ['3.4', 'Mujo claps a hand over his mouth to stop him, and Halili only grows more indignant, insisting he will have his say now or never.', "Atherë djali ma s’â pritë pa folë. / Dorën gojës Muji ja ka vndue, / Aq ma tepër djali â pezmatue. / - Prapou, Mujë, se m’ka ardhë dita e dekës!"],
      ],
      cast: {
        halili: ['jutbina', 'swears he will have Tanusha or no one, and praises her until Mujo silences him'],
      },
    },
    {
      id: 'curseAndThaw', title: 'A curse the mountains obey',
      note: 'The Agas offer alternatives — Halili refuses them all, swears he will marry only the grave sooner than any woman of the krahina, and curses the mountain passes for keeping him from Tanusha. The mountains and the sea answer him, and the whole winter melts in three weeks.',
      lines: [
        ['4.1', 'Old Basho Jona speaks up: he himself never married simply because he never wanted to.', "- Rend me rend, Mujo, po flasim, / Ka britë t’madhe plaku Basho Jona. / - S’e kam lanë, or shokë, për mik, pse s’gjeta, / S’e kam lanë për pare, pse nuk pata, / S’e kam lanë për vashë, pse nu’ mund hasa, / Veç s’kam dashtë vetë m’u martue!"],
        ['4.2', 'Osman Aga offers a plan instead — tomorrow the thirty Agas will gather thirty maidens, and Halili may pick the fairest of them.', "- Pa ndigjo, more ti djalë, / Ka folë plaku Osman Aga, / Ditë e madhe nesër ka qillue, / Tridhetë agë kanë me u bashkue, / Tridhetë vasha t’i kanë pru, / Njat ma t’mirën ke me e zgjedhë, / Tridhetë agë për hajr ta bajmë!"],
        ['4.3', 'Halili cuts him off, furious: every girl of Jutbina is a sister to him, and no man may marry his own sister.', "S’p’e len djali plakun ma me folë. / - Zoti u vraftë, more agët e Jutbinës! / Po ku â ndie n’mjet tokës e t’qiellës, / Se muer vllau motrën e vet? / Qi tanë bijat e Krahinës ku janë, / Tanë si motra qi po m’duken."],
        ['4.4', 'He swears by God he will marry only the earth and a tombstone before any bride of the krahina — he will wait to his own funeral night sooner than break that oath.', "Nji be t’madhe qi kam ba, / Nji be t’madhe n’emën t’zotit, / Njatij t’lumit qi vran e kthiell, / Rendon tokë e rendon qiell, / Qi, ja martohem me gur e dhe, / Ja e kam marrë Tanushën e Krajlit. / E a ndigjuet, ju agët e Jutbinës? / Ndeja kuk si natën e vorrit / E n’Krahinë cok s’u martova!"],
        ['4.5', 'He curses the high passes themselves for shutting his road into Christian lands, and wishes aloud he had power enough to drown the mountains under the sea and strip every snowdrift bare.', "Por n’qafë m’paçi, mori bjeshkët e nalta, / Kurrku’ ‘i shtek qi nuk ma lat, / Për me dalun deri n’at Krajli! / Kjeçë tuj e ba nji hjeksi t’vogël, / T’mujshe detit me i pri der’ ndër qafa, / Me ma dejë krejt ata borë, / Sall sa t’dal me qitë kunorë,"],
        ['4.6', 'His companions only laugh and mock him as the "steer of Kotor" — a boy who has never yet proven his courage.', "Qaq fort gazin shokët qi po ma vndojnë, / Ma kanë ngjitë»taraku i Kotorrit» / E frima e gjallë s’u lanka peng për log!"],
        ['5.1', 'The mountains hear him, and the sea heeds his curse: a sirocco sweeps up from the coast and buries the passes in storm-cloud.', "Sa mirë nama bjeshkët m’i paska gjue! / Sa shpejt deti djalin ka ndigjue! / E e ka çue nji frimë të fortë, / E e ka çue nji frimë të xetë, / E e ka lëshue krejt ren e zezë."],
        ['5.2', 'For three days the snowslides thunder into the chasms, and within three weeks the whole range lies bare — the river carries every drop of it down to the sea.', "Binë ortiqet nëpër gropa, / Ushtojnë malet si prej motit. / Por tri dit e ma s’ka ngjatë, / Â shkri bora e ka ra n’lume. / Por tri javë e ma s’ka ngjatë, / Shka e ka ba luma ata t’bardhë? / T’bardhët e bjeshkëve krejt e ka mbytë n’det!"],
      ],
      cast: {
        halili: ['jutbina', 'refuses every offered bride and curses the passes; mocked as the "steer of Kotor"'],
        agat: ['jutbina', 'laugh off Halili\'s curse — until the mountains themselves answer it'],
      },
    },
    {
      id: 'courserCounsel', title: 'The courser given after all',
      note: 'Spring comes; Halili asks for Mujo\'s courser and is refused, so he saddles his own horse instead — until their mother rebukes Mujo, who relents and sends Halili off with the horse and a plan: seek out his own blood brother Vukë Harambashi across the border.',
      lines: [
        ['6.1', 'Spring comes to the mountains — the snow gone, the beech woods in blossom — and Halili asks Mujo for the loan of his courser.', "Lum për ty, o i madhi zot, / Ç’po këndojnë bylbylat n’mal! / Ç’po lodrojnë fmija npër fushë! / - Shpejt me dalë te tbani, / Se ka shpërthye ahi! / Atherë djali Mujit i ka thanë: / - Qetash gjogun, Mujë, ti me ma dhanë!"],
        ['6.2', 'Mujo refuses, so Halili mounts his own horse instead and sets off alone for Tanusha.', "Aspak gjogun Muji s’ja ka dhanë. / Gjogut t’vet në shpinë i ka ra / Edhe â nisë Tanushën për me marrë."],
        ['6.3', 'Their mother scolds Mujo for refusing him: should the boy come to grief anywhere across the border for lack of the better horse, he will carry that regret his whole life.', "Kur ka ba Muji m’u dredhë, / Mirë po i flet nana e motnueme: / - Po ti ç’bane, more bir, / Gjogun djalit qi s’ja dhae? / Rrezik djali me ba me e pasë / E n’Krajli gja me ta gjetë, / Sa t’jesh gjallë djalit ja kujton!"],
        ['6.4', 'Mujo turns back at once, calls Halili to stop, and hands over the courser after all.', "Sa shpejt Muji kenka dredhë! / - Ndal, Halil, djalit i ka thanë. / Gjogun e vet Muji ja ka dhanë"],
        ['7.1', 'With the horse he gives good counsel too: let the courser choose its own way once across the border, and it will carry Halili straight to Mujo\'s own blood brother, Vukë Harambashi.', "E ‘i msim t’mirë qi ja ka dhanë: / - Udha e mbarë të kjoftë tash, more vlla! / N’megje t’krajlive kur t’bajsh për me dalë, / Kurrkund kryet gjogut mos me ja ndalë, / Gjogu t’çon te Vuke Harambashi."],
        ['7.2', 'Halili is to ask Vukë, in Mujo\'s name, for money and weapons to help win Tanusha.', "Probatin Vukën vetë e kam pas, / «Falëmeshndet Muji, thuej, t’ka çue; / Për nji punë, ti vllath, sot me m’ndimue, / Me m’ndimue me grosh e me shpatë, / Me m’ndimue Tanushën për me e marrë!»"],
        ['7.3', 'Halili mounts up, the brothers wish each other well, and he vanishes toward Christian lands almost before the words are out.', "Atherë djali i ka kcye gjogut n’shpinë. / - T’mirë u pashim, Muji i ka thanë. / Ka marrë dromin për Krajli, / Dy herë djalin kurrkush s’e ka pa."],
      ],
      cast: {
        halili: ['jutbina', 'asks for the courser, is refused, saddles his own horse — until Mujo relents'],
        mujo: ['jutbina', 'refuses the courser, is talked round by their mother, and sends Halili off with it and a plan'],
        nena: ['jutbina', 'tells Mujo plainly he will regret sending his brother out on the lesser horse'],
      },
      items: { gjogu: ['halili', 'lent after all, with counsel to let it choose its own way'] },
    },
    {
      id: 'guardiansJourney', title: 'Guarded by the sun, the moon, and the goats',
      note: 'Halili rides day and night through empty mountains, protected in turn by the sun, the moon, and the oras — three wild goats voice the promise, badly startling him — and at the river\'s edge a mountain ora names the Danube and points him across to the camp.',
      lines: [
        ['8.1', 'He rides through desolate mountains and beech forests day and night without meeting a soul, and the sun, the moon, and the oras each declare him under their own protection.', "Kalojnë male e kalojnë lugje, / Kalojnë breshtë e kalojnë ashtë, / Kalojnë dit e kalojnë net, / N’rob t’zotit kurrkund s’hasin. / Po thotë dielli:»Â ndorja e eme!» / Ka thanë hana:»Â ndorja e eme!» / Kanë thanë orët:»Â ndorja e jonë!»"],
        ['8.2', 'A goat\'s voice rises from the mountainside, promising that the sun will guard him by day, the moon by night, and the zana his weapons.', "Zot, a flet dhija në mal? / Paska folë dhija në mal! / Ça ka qitun e ka thanë? / - Sa t’bajë dritë ka ndoren dielli, / T’errmen natë, ka ndoren hana, / Armët e brezit ja rue zana!"],
        ['8.3', 'The voice startles Halili badly — how can goats speak? — and it answers: we are no mere goats, but three wild goats who share these cliffs with the zana.', "Fort Halili m’asht frigue. / - Ç’asht ky za, - zot, nëpër çeta? / P’a thue flasin dhitë e malit? / - Mos gabo, se s’jem’ dhi malit, / Se na jem’ tri dhi prej shkamit, / Qi rrijmë bashkë me zana!"],
        ['8.4', 'Reassured, Halili accepts the omen: his eyes to the sun\'s keeping, his legs to the moon\'s, his weapons\' honour to the zana, and his soul to the oras when he dies.', "Sa mirë djali u ka përgjegjë: / - Mirë p’e di se â logu i zanave / E fjalës suej un nuk i luej! / Syni i jem me ndore t’diellit, / Kamba e eme ndorja e hanës, / Erzi i armve ndorja e zanës, / Deka e eme me orë çue!"],
        ['9.1', 'High in the pastures he finds a vast river stretching from one sea to the other, hidden in fog — his courser shies at the water\'s edge, startled by something crouched below the rock face.', "Kur ka dalë n’bjeshkën ma t’naltën, / Na e ka pa ‘i lum t’gjanë e t’gjatë, / I gjatë ishte det e n’det, / Andej lumet veç e lpe. / Ka ba gjogut me i dhanë uj, / Tre pash gjogu â dredhë përmbrapa. / Paka ‘i njeri për buzë shkami."],
        ['9.2', 'An ora asks where he means to go; he answers that he seeks Vukë Harambashi, somewhere beyond the border in the Christians\' own country.', "Sa mirë ora p’e pëvetë: / - Kah je nisë, djalo, me shkue? / Ndejshëm djali fort qi po i përgjegjë: / - Për Krajli ‘i herë jam drejtue, / Der tu Vuku i Harambashit!"],
        ['9.3', 'She laughs, and tells him she has watched over him like her own eyesight since the Green Valleys — but Vukë Harambashi left that land long ago, so he will not find him there.', "Fort ka qeshë ajo ora e malit! / Kërkund djali s’po kujtohet, / Ç’asht aj njeri, qi po i flet. / Sa mirë ora e paska msue! / - Pa mba vesh, or djalë i ri, / P’e di mirë, pse kah je dalë, / Se t’kam pa ndër Lugje t’verdha, / Se t’kam dashtë si sytë e ballit, / T’kam ruejtë natën, t’kam ruejtë ditën, / M’ke pas hije për mbas trupit. / Aty Vukën ti s’e gje’, / Aj kah mat â dyndë Krajlijet;"],
        ['9.4', 'She names the river the Danube and points him across it, to a white encampment with a scarlet pavilion at its heart — his own courser, given free rein, will carry him straight to the princess.', "Por avitu ‘i herë prej mejet! / A p’e shef qat lumë të gjanë? / Atje i thonë»Te lumi i Tunës». / Ndale synin n’at breg lumit, / Merr teposhtën der’ tu hijet! / A po i shef do çadra t’bardha? / N’mejdis t’tyne ‘i shatorr t’kuq? / Frenin gjogut mos m’ja ndalë, / Fill t’ka çue te e bija e krajlit!"],
        ['9.5', 'With that the ora vanishes into the mountains, and Halili rides on to the flatland as the sun sets and darkness falls.', "Ora â shdukë e hupë në mal, / Djali â shdukë e ra në fushë. / A varë dielli me pranue. / Qatherë dita m’konka errë."],
      ],
      cast: {
        halili: ['bjeshka', 'rides day and night through empty mountains, guarded by the sun, the moon, and the oras'],
        dhia: ['bjeshka', 'startle Halili with the goats\' own promise — sun by day, moon by night, zana over his weapons'],
        ora: ['bjeshka', 'shows herself once at the river\'s edge and points him across to the camp'],
      },
    },
    {
      id: 'tentNight', title: 'A hand through the canvas',
      note: 'At midnight Halili crosses the Danube, cuts a slit in the royal pavilion, and reaches inside — only to lay his hand on a sleeping stranger\'s forehead by mistake. It belongs to the king\'s own daughter.',
      lines: [
        ['10.1', 'The nightingales wonder why the moon is so late — the goats answer that it is busy tonight, guarding Halili.', "Lum për ty, o i lumi zot, / Ke falë ditën me punue, / Ka falë natën me pushue! / - Ça ka hana, qi s’po del? / Kanë pëvetë bylbylat malit. / - Pritni pak, more zojt e malit, / Ju me kndue, tjetër punë s’keni, / Hana sande ka ndollë xanë, / Ka nji ndore me përcjellë! / Ka përgjegjë dhija në shkam."],
        ['10.2', 'He reaches the riverbank, ties his horse in a thicket of young beech, and searches out the scarlet pavilion in the twilight.', "Qatherë djali sa kish ra n’breg t’lumit. / Ka lidhë gjogun mbrendë n’nji imshtë, / Imshta ishte tanë ahishtë, / Vetë shatorret npër muzg t’natës po i lypë. / Kur ka mrrijtë te çadra e kuqe,"],
        ['10.3', 'He takes cover behind an oak whose roots reach down to the river and waits there, growing impatient for midnight to come.', "Qatherë djali por ka ngulë, / Ka xanë vend përmbas nji lisit; / Rrajët e lisit shpërda n’lumë. / Sa fort djali po mërzitet! / Ça ka qitun e ka thanë? / - Po si s’erdh kurr kjo mesnatë?"],
        ['10.4', 'When midnight finally arrives, he creeps to the pavilion on all fours, cuts a slit in the canvas with his dagger, and reaches a hand inside.', "Kur ka falë zotyn mesnatën, / Sa urtisht djali qi p’e mësyn! / Ma ka xjerrë thikën ma t’preftën, / Kambadoras asht avitë / Edhe e pritka nji copë shatorr. / Ka ba dorë mbrendë me shti,"],
        ['10.5', 'By mistake, the hand he lays finds a sleeping forehead — and it belongs to the king\'s own daughter.', "Aty djali ka gabue, / Se aty dora ndeshë n’ball t’njerit, / Njeri ishte e bija e krajlit."],
      ],
      cast: {
        halili: ['lumiDanub', 'crosses at dusk, hides by an oak till midnight, then cuts into the royal tent'],
        tanusha: ['lumiDanub', 'asleep in her pavilion at the camp, unaware anyone has crossed the river'],
      },
      items: { unaza: ['tanusha', 'worn as she sleeps'] },
    },
    {
      id: 'tanushaWakes', title: 'A ring on the floor',
      note: 'Startled awake, Tanusha sends her three hundred maids back to bed with a lie about a bad dream — then finds a ring loose on the floor and recognizes the face beside her.',
      lines: [
        ['11.1', 'Startled awake, Tanusha cries out, and all three hundred of her handmaids come running to ask what is wrong.', "Ka lshue vasha nji brimë t’keqe / Edhe ndejë a çue prej tremet. / Treqind çika pr ‘i fjalë janë mbledhë. / Ç’kje kjo britmë Tanushës po i thonë, / Qi kso vigme kurr s’ke ba?"],
        ['11.2', 'She calms them with a lie — only a nightmare of a vampire — and sends them back to their own beds.', "Sa butë vasha u ka përgjegjun çikavet! / Shkoni e bini, mori shoqe, / Si lugat dishka m’u shti / E prej tremet gjumi m’duel! / Meiherë çikat kenkan shkepë,"],
        ['11.3', 'Settling again, she finds a ring rolled loose on the floorboards beside her, and sitting up sees the young man\'s face before her.', "Meiherë vasha â ulë me ra / E ‘i unazë n’tokë rrotullohet. / Shpejt e çon Tanusha toket. / Kur ka pa ftyrën e djalit:"],
        ['11.4', 'She cannot place it at first — then realizes it can only be the face of Halili.', "- Po ket ftyrë, zot, ku e kam pa, / Qi po m’giet me t’Halilit?!"],
      ],
      cast: {
        tanusha: ['lumiDanub', 'wakes with a cry, lies her maids back to sleep, then knows the face beside her'],
      },
      items: { unaza: ['lumiDanub', 'rolled loose onto the floorboards — the very ring that bears Halili\'s own likeness'] },
    },
    {
      id: 'revealCheck', title: 'A courtyard checked for danger',
      note: 'Halili admits himself, but will not go further until he has checked the dark path and courtyard are empty — then Tanusha draws him inside, wagering both their lives.',
      lines: [
        ['12.1', 'Halili can no longer hold his tongue and asks Tanusha outright whether she will keep his secret.', "Tjetër djali s’asht durue: / - Zoti t’vraftë, Tanushës po i thotë, / Po a je nieri qi ke besë?"],
        ['12.2', 'She scolds him for the risk he has taken — even with three hundred lives in him he would not survive discovery — but bids him come inside anyway: together they will either perish or find a way out.', "- T’thashin krahët, more djalë i ri, / Sa fort fell qi paske hi / Treqind shpirtna n’trup me i pasë, / Kurrnja drita s’ta ka xanë. / Hajde mbrendë, kopil, po i thotë, / Se ja desim t’dy përnjiherë, / Ja kem’ pshtue t’dy përnjiherë."],
        ['12.3', 'He holds back a moment, draws his blade, and checks the path and courtyard for any sign of danger before he answers her.', "Sa mirë djali nuk po ngutet! / - Ndal nji herë, çikës i ka thanë. / E t’m’ka nxjerrë shpatën prej millit. / Ka xënë priten n’shtek t’shatorrit, / Ka lshue synin rreth oborrit, / Rob i gjallë asajt nuk shifet."],
        ['12.4', 'Finding no one stirring, he returns to the tent, and Tanusha takes his hand and draws him in.', "Atherë djali mbrendë ka hi. / E ka marrë vasha për doret, / Shpejt e shpejt te ‘i odë i prin."],
      ],
      cast: {
        halili: ['lumiDanub', 'admits himself, checks the dark courtyard is empty, then lets her draw him inside'],
        tanusha: ['lumiDanub', 'risks everything on his secret and pulls him into her own tent'],
      },
    },
    {
      id: 'disguiseDawn', title: 'A gown for a hero',
      note: 'In her own chamber Tanusha dresses Halili in her finest gold-threaded gown before the household wakes — by dawn he passes for a maiden.',
      lines: [
        ['13.1', 'In her own chamber she lays out her trousseau of gold-threaded gowns and tells Halili to dress quickly — if he is found as he is come morning, the king will have them both killed.', "Oda ishte mbushë me pajë. / Tu ‘i kanë zgiedhë ‘i parë petka ma t’mirat. / T’gjithë ngri n’ari si kokan kanë / E Halilit para ja ka shtrue. / - Çou, Halil, shpejto m’u veshë, / Se me t’xanë drita qysh je, / T’dyvet krajli veç na pret!"],
        ['13.2', 'Disguised, he passes for a maiden just as the first light of dawn breaks.', "Krejt si çikë djali po dan. / Ka nisë drita me lbardhë terrin, / Marrtas dielli kenka çue."],
      ],
      cast: {
        halili: ['lumiDanub', 'dressed in Tanusha\'s own gold-threaded garments, passing for a maiden as dawn breaks'],
      },
      items: { rrobat: ['halili', 'the gold-threaded gown that hides him among the king\'s three hundred maidens'] },
    },
    {
      id: 'washingCover', title: 'The orphan of Dumlika',
      note: 'The king\'s maids come down to wash wool at the river and press Tanusha about her new companion; she covers for Halili with a story of a penniless orphan promised to a pasha.',
      lines: [
        ['14.1', 'At dawn the king\'s maids carry great loads of wool down to the river and set to washing and singing on the rocks.', "Zot, ç’po bajnë çikat e krajlit, / Qi kaq heret kenkan çue? / Po ngarkojnë lesh sa ku munden, / Për me ra deri n’at lumë; / Po shpërndahen gurve t’lumit, / Gurve t’lumit, kah po lajnë, / Herë po lajnë, herë po këndojnë. / Del Tanusha n’at breg lumit, / Vetë e dyta gisht për gisht, / Vend po xanë te gurt e lumit."],
        ['14.2', 'Tanusha comes down to join them, a strange girl\'s hand in hers, and the other maids press her: who is this companion, fairer even than the rest of them, with a zana\'s eyes and a mountain pine\'s figure?', "Kanë qitë çikat e e kanë pvetë: / - Amanet, mori e bukra e dheut, / Po kjo vashë n’dorë qysh t’ka ra, / Qi ne pahin krejt na paska marrë?! / Syni i saj si syni i zanës, / Balli i saj si balli i hanës, / Shtati i saj porsi hala n’bjeshkë, / Kurrkund shoqen nën ket diell s’e paska!"],
        ['15.1', 'Tanusha answers that nothing on earth is truly without its equal — this girl, she says, is only a poor, luckless orphan promised to the Pasha of Dumlika, who lacks the dowry to go to him and has come to beg something from her father\'s palace.', "- Zoti u vraftë, mori treqind çika, / Gja e pashoqe s’asht n’ket jetë. / Fukare, e mjera ka qillue, / E ka xanë Pasha i Dumlikës, / Por kjo pajë s’ka ku me marrë, / Baba dekë e kalbë nën dhe, / Nana mbetë rrugash mbi dhe, / Ja ka msy kullën tatës krajl, / A s’â send ndoi pare me ja falë."],
        ['15.2', 'She tells the maids to keep to their washing and their silence, and none of them presses further.', "Por ju lani, u pastë Tanusha, / Lani lesh e mos u tallni! / Askurrnja ma s’po e pëvetë, / Por po lajnë lesh gurve t’lumit, / Kush po lan e kush po kjan prej dhimet."],
      ],
      cast: {
        tanusha: ['lumiDanub', 'brings her disguised companion down to the washing-rocks and covers for her with a story'],
      },
    },
    {
      id: 'queenNightmare', title: 'A black wolf among the sheep',
      note: 'In New Kotor, the queen wakes shaking from a nightmare of a black wolf among three hundred sheep and sends the Krajl to the Danube at once.',
      lines: [
        ['16.1', 'In New Kotor the queen wakes shaking from a nightmare: three hundred sheep, and among them a black wolf as big as a ram.', "Lum për ty, o i lumi zot, / Se ç’do t’bajë krajlica n’at Kotorr! / ‘I andërr t’vshtirë e paska pa, / Paka n’andërr nji tufë berresh, / Tufa ishte treqind delesh, / N’mjedis t’tufës nji uk të zi, / Uk i zi si ‘i dash galan."],
        ['16.2', 'She rouses the king — their only child, whom he has not even seen in a year — and begs him to ready his best horse and go to her at once.', "Tremshem grueja konka çue, / Fill tu krajli konka shkue: / - Çou, bre krajl, ty zoti të vraftë, / Se nji çikë zoti t’ka falë, / Tjetër djalë n’votër nuk ke / E qe ‘i motmot me sy nuk e ke pa. / Hypi gjogut, ku t’jet ma i shpejti, / Se ‘i andër t’vshtirë sonte kam pa."],
        ['16.3', 'The king agrees it must be done, for in the very same dream he saw a wolf come out of Jutbina and carry off all three hundred maidens.', "- Hajre kjoftë, i britka krajli. / - Se ishte çue nji uk Jutbinet / E treqind çikat i kish përda."],
      ],
      cast: {
        mbreteresha: ['burgKotor', 'wakes shaking from a black-wolf dream and sends the Krajl to the Danube at once'],
      },
    },
    {
      id: 'kingOutwitted', title: 'One maiden too many',
      note: 'The Krajl rides to the Danube camp, counts one maiden more than he brought, and believes his own daughter\'s cover story without question.',
      lines: [
        ['17.1', 'The king rides at once to the Danube, arms himself, and counts the maidens — finding one more than he brought, and the fairest of them all.', "Meiherë krajli asht mërthye, / Mirë e shtërngon dorinë e mejdanit, / Mirë shtërngohet me hekurat e shtatit. / Ka marrë rrugën, qi çon te bregu i Tunës. / Treqind çika qi po i njehë, / Nji ma tepër qi po i del, / Ajo ma e bukura qi m’ishte ndër shoqe."],
        ['17.2', 'He asks Tanusha who this extra girl is; she repeats the same story of the penniless orphan promised to the Pasha of Dumlika.', "- Oj Tanushë, lum baba, i ka thanë, / Po kjo çikë n’dorë kah t’ka ra, / Qi n’dynje shoqen s’e paska? / - Fukare e ngrata ka qillue, / Tata dekë e nana mbetë rrugash, / E ka xanë Pasha i Dumlikës / E pa pajë, qyqja ka ndodhë, / Fill ka ardhë e ka msy ty, / A s’â send ndoi pare me ja falë!"],
        ['17.3', 'The king believes it without question and gives orders to set off for New Kotor, the strange maiden coming along with the rest.', "Sa mirë krajli asht pshtjellue! / Tash po nisna për Kotorre t’reja, / Ti me vedi çikën ke me e marrë!"],
      ],
      cast: {
        krajli: ['lumiDanub', 'rides out, counts one maiden too many, and believes his own daughter\'s story'],
      },
    },
    {
      id: 'kullaKotor', title: 'The finest kulla in Kotor',
      note: 'The whole cortege travels three days to New Kotor, where Tanusha claims the finest kulla of all — twelve floors on the sea-cliffs — with Halili still disguised among the guarded maidens.',
      lines: [
        ['18.1', 'At the king\'s trumpet call the three hundred maidens mount up, and the whole cortege sets out for New Kotor, Tanusha riding in the last row still hand in hand with Halili, too closely guarded by the army for any escape.', "Ka dhanë emër krajli me bujri: / - Treqind çikat me u shtërngue! / Shpejt meqaret i kanë ngarkue, / Për Kotorr tek janë fillue. / Asht Tanusha n’t’mramin rresht / Me Halilin gisht për gisht, / Djali m’gjog, vasha n’dori, / Mirë ushtrija qi po i rue. / Kërkund giasë s’po i shofin për me hikun."],
        ['18.2', 'The journey takes three full days before the column reaches New Kotor, where each maiden is housed in a manor of her own; Tanusha claims the grandest kulla in the place for herself — twelve storeys perched on the sea cliffs, some three hundred paces across, its face built of unhewn stone and its foundations of marble, with running water, gardens, and small boats of its own — the kind of tower a stranger might mistake for paradise.', "Mbas tri ditsh e mbas tri netsh, / Â kapë çeta te Kotorret e reja, / Treqind çika janë shkepë ndër koniqe, / E ka zgjedhë Tanusha ‘i kullë ma t’mirën, / N’breg të detit, përmbi ‘i shkam, / Dymdhetë ketesh kulla e naltë, / Kërkund shoqen nuk e kishte. / Treqind hapash kulla e gjanë, / Të tana ballet guri s’lmue, / Anash krejt guri s’latue, / Latue shkami prej mermerit. / Aty gurrat me u flladitë, / Aty kopshti me u mahitë, / Aty velat me velzue, / Me velzue për shpinë të detit. / Kur po hin njeri n’at kullë, / Me kujtue se ka ndrrue jetë."],
      ],
      cast: {
        krajli: ['kullaTanushes', 'leads the whole cortege home to New Kotor'],
        tanusha: ['kullaTanushes', 'reaches New Kotor and claims the finest kulla of all'],
        halili: ['kullaTanushes', 'rides in among three hundred guarded maidens, still disguised, no chance to slip away'],
      },
    },
    {
      id: 'signalPlan', title: 'A courser sent over the waves',
      note: 'Three days pass without food or drink; Tanusha proposes signalling Jutbina by sending the courser swimming ahead while they follow by boat.',
      lines: [
        ['19.1', 'She and Halili settle into the tower, three days and nights passing without food or drink.', "Me Halilin mrendë kanë hi, / Paskan ndejë tri dit e net, / As kanë hangër, as kanë pi."],
        ['19.2', 'Tanusha wonders how to reach Jutbina at all, and proposes a plan: send the courser swimming ahead across the water while they themselves row and sail a boat behind it — though she admits she is afraid to tell her own mother anything.', "- Qysh ja bajmë me kthye n’Jutbinë? / Sa mirë vasha asht kujtue! / - Me i dhanë gjogut shpinë e detit. / Na po himë m’nji barkë me rrema, / Na po himë m’nji barkë me vela; / Ti vozit, un drejto velat! / Na çon zoti ‘i freski t’hollë, / Na i shtyn velat për Krahinë, / Aty n’breg gjogu na pret, / Se un drue nanës me i kallxue!"],
        ['19.3', 'They send the courser out over the waves.', "I kanë dhanë gjogut shpinën e detit."],
      ],
      cast: {
        tanusha: ['kullaTanushes', 'settles into the tower with Halili, then sends the courser swimming ahead'],
      },
      items: { gjogu: ['kullaTanushes', 'sent out over the waves, riderless, swimming for home'] },
    },
    {
      id: 'queenVisit', title: 'A mother goes to see for herself',
      note: 'The queen spots the loose courser from shore, curses the Krajl for his indifference, and sets out alone for the coast.',
      lines: [
        ['20.1', 'The queen of Kotor sees the loose courser from shore and wonders at it, then rushes to the king to curse him: three days their daughter has been in Kotor and neither of them has gone to see her.', "Por ç’ka ba shkina e Kotorrit? / Kish pa gjogun mjedis valës detit, / Fill te krajli kenka shkue. / - Zoti t’vraftë, krajlit i ka thanë, / Tash tri dit çika n’Kotorr â ardhë / E as un as ti me sy s’e kemi pa!"],
        ['20.2', 'He waves her off — she may visit if she likes, he has no time — so she sets out alone for the tower on the coast.', "- Hajt sa t’duesh, për n’daç me e pa, / Se mue ngaeja kurkund sot s’ma qet! / Sa fort shpejt krajlica gadi â ba! / E ka marrë rrugën e bregut t’detit / Për me shkue te kulla e bukur,"],
      ],
      cast: {
        mbreteresha: ['burgKotor', 'spots the loose courser from shore and sets out alone for the coast'],
      },
    },
    {
      id: 'discovered', title: 'No mother at all',
      note: 'The queen talks her way past the locked door with false tenderness — and recoils in horror the instant she sees Halili.',
      lines: [
        ['21.1', 'She finds the kulla locked, and calls up sweetly that her mother has come and will die of longing if Tanusha does not open the door.', "Aty m’gjeka kullën xanë. / Sa mirë zanin, shkina, e ka t’hollue! / - Oj Tanushë, lum nana, m’i ka thirrë, / Çilma derën ‘i herë synin ta shof, / Se malli i yt â kah m’çon n’tjetër jetë!"],
        ['21.2', 'Behind the door Tanusha panics and asks Halili what to do; he tells her she must open it for God\'s sake, though she is too frightened to obey at once.', "Â dridhë çika për mbas deret. / - Po si m’thue, Halil, me ba? / - Çilja derën, n’bafti t’zotit! / Kurkund zemra s’i ban me shdry derën."],
        ['21.3', 'She stalls with an excuse — she is unwell and cannot come down — but the queen swears she once suffered the very same illness herself and can heal her, and pleads to be let in as a true mother.', "Sa shpejt n’mend i ra çikës edhe ‘i fjalë! / Pa ndigjo, lum nana, i thotë, / Po qysh t’dal, e mjera, derën me ta çilë, / Me ket dergjë, qi shtatin ma ka kputë! / - Hajt, moj bi, lum nana, i thotë, / Vetë, t’pastë lokja, e re qi kam kanë / E qaso dergje shumherë qi m’ka ra; / Por po t’ap besën e zotit, / Se ty dergjen nana ta ka shndoshë. / Por çilm derën e mos m’len me pritë, / Se ti nanën nanë ke për ta pasë!"],
        ['21.4', 'Deceived and still trembling, Tanusha comes down with the tell-tale ropes and sail still in hand and opens the door to her.', "Â rrejtë bija e zemra hiç s’po i rre, / N’bahti t’zotit, tek ka ra për shkallësh, / Aspak penin doret s’e ka hjekun, / Aspak velin m’anesh s’e ka tretun / Edhe derën nanës ja paska çilun."],
        ['21.5', 'But this is no ordinary mother — she is called, in the song\'s own words, no mother at all but "a dragua-slaying monster" — and the moment she spots Halili she recoils like a snake, curses her daughter for sheltering brigands, and slams the door to run straight back to the king.', "Po, por nana s’ish kenë nanë, / Ish kenë bishë qi hate drangujt. / Kur ka pa shkina Sokol Halilin, / Â dredhë mrapësht si dredhet gjarpni. / - Zoti t’vraftë, moj bi, si t’paska vra! / P’a me cuba kullen e ke mbushë? / Edhe derën e ka shkrepë, / Fill tu krajli tek â shkue."],
      ],
      cast: {
        mbreteresha: ['kullaTanushes', 'talks her way past the locked door — and recoils at the sight of Halili'],
        tanusha: ['kullaTanushes', 'lets her mother in against her own fear, still holding the tell-tale ropes'],
        halili: ['kullaTanushes', 'discovered the moment the queen sees him'],
      },
    },
    {
      id: 'captured', title: 'The streets, and the dungeon',
      note: 'The Krajl storms the fortress by force, jails Halili, and casts his own daughter into the streets.',
      lines: [
        ['22.1', 'She tells the king they are undone — brigands from Jutbina have taken his towers and dishonoured his maidens.', "- Ke mbame, Krajl Kapedane! / T’kanë ardhë cubat e Jutbinës / E ty kullat t’i kanë zaptue, / Erzin marrë, çikat shnjerzue!"],
        ['22.2', 'Enraged, the king arms himself, storms the coast and the fortress by force, and seizes both of them before Halili can put up any real fight.', "- T’u thaftë goja! Ç’je kah thue? / Ka britë t’madhe Shkjau i Kotorrit / Edhe ftyra zjarm i paska marrun. / Shpejt konka shterngue / E e rrethueka krejt bregun e detit / E e ka msye kullën e shkamit. / - Hiç s’po i nepet djalit me qindrue. / T’dy për krahit krajli i ka kapun."],
        ['22.3', 'He rages at Tanusha for shaming him with a man of Jutbina, throws Halili into prison, and casts his own daughter into the streets, telling her the road she chose has blocked her own home with thorns forever.', "- Si m’shnjerzove kshtu, Tanushë, mjerë baba! / Qysh me ndejë me cuba të Jutbinës? / N’burgje t’fella Haliln e ka ndry, / Rrugën e madhe Tanushës ja ka dhanë. / Qetash udha e marë t’kjoftë, mori bi, / Se kto janë rrugat, qi ke dashtë me marrë! / E ruej se e msy tjetër derën e shpisë, / Se babës e vedit ja ke mbyllë me ferrë!"],
      ],
      cast: {
        krajli: ['burgKotor', 'storms the fortress, jails Halili in his dungeon, and casts his own daughter out'],
        halili: ['burgKotor', 'dragged off to New Kotor\'s dungeon'],
        tanusha: ['burgKotor', 'thrown into the streets, told her own home is closed to her'],
      },
    },
    {
      id: 'jovanHelp', title: 'A stranger stops',
      note: 'Tanusha weeps unaided in the street — the watchmen keep everyone else away — until Jovani stops and walks her to a countrywoman who can help.',
      lines: [
        ['23.1', 'Tanusha sits weeping by the roadside, and though everyone pities her, none dare help her past the king\'s own watchmen.', "Qatherë vajin ka marrë çika e rrugën, / Ka matrë gjamën e fort po gjamon, / Krejt e mjeron rrugën, kah po shkon. / Kanë dalë gjindja me veshtrue ata vaj, / As me iu avitë kurrkush nuk po guxon, / Kaq rojë t’madhe krajli i kishte vu."],
        ['23.2', 'At the edge of town Jovani stops and asks kindly what has happened to her.', "Kur ka mrrijtë te kryet e Kotorrit, / Mirë p’e ndalë Jovani e p’e pvetë. / - Ç’â kta vaj, Tanushë, lum motra, i thotë, / Se kso britmet kurr nuk kemi ndi! / Ktheu njiherë e t’himë mbrendë në shpi, / Ty dishka po deshtka sot me t’gjetë!"],
        ['23.3', 'She tells him she can never go home again — her own mother laid the accusation, her father cast her out, and Halili is now a prisoner who will rot unless Mujo comes to save him.', "- S’ke pse mton, Jovan, për me dredhue, / Rob kanë xanë Halilin e Mujit / E mue rrugat tata m’i ka dhanë, / Ma për t’gjallë te shpija mos me kthye! / - Po ty, bi, hjeksinë kush ta ka ba? / - At mos pritsha, Jovan, me kanë! / Nana qi m’paditi. / Por amanet, Jovan, ta paça lanë, / Nji fjalë Mujit tu dera me ja çue, / Qi me i ra mbrapa Halilit sa ma parë, / Ndryshej djali n’burgje t’u ka kalbë!"],
        ['23.4', 'Jovani admits he does not know the way to Mujo\'s home himself, but he knows a countrywoman with a newly built kulla at the edge of Kotor, and leads her there, meeting the woman just as she returns from the fountain.', "Mirë Jovani e ka drejtue: / - Unë Mujit shtek as gjurmë s’i di, / Por e ka ksajt nji bij Krahinet, / E ka kullën shi në krye t’Kotorrit, / Derën e re, t’ndreqme sivjet. / Fill tu dera Jovani e ka përcjellë / E tu dera gruen e paskan hasë, / Kah po kthete me bulirë prej kronit."],
      ],
      cast: {
        tanusha: ['burgKotor', 'weeps by the roadside, unaided, until Jovani stops and hears her out'],
        jovani: ['burgKotor', 'stops for the weeping stranger and walks her to a woman who might help'],
      },
    },
    {
      id: 'messageMujo', title: 'A rider through the night',
      note: 'The countrywoman takes Tanusha in and hires a trusted rider who reaches Mujo by morning with the whole story.',
      lines: [
        ['24.1', 'The woman asks what is wrong, and Tanusha pours out her whole grief — cast out, Halili jailed, no hope left but Mujo.', "- Shka t’ka gjetë, Tanushë-motra? / - Mue m’ka gjetë shka mos t’gjetët kushi: / Tata rrugat m’i ka dhanë, / Derën e shpisë ma mos me e msye, / Rob m’kanë xanë at Halilin e Mujit; / Tutem, djali ka sharrue, / Po s’erdh Muji për me e pshtue."],
        ['24.2', 'The woman comforts her — if Mujo is alive, within three days he will see them married — and sends a trusted messenger racing through the night to Jutbina, who reaches Mujo by morning and tells him everything.', "Grue prej fisit qi kish kanë. / Sa meiherë ja shndoshka zemrën: / - Qi n’kjoftë Muji i gjallë e për të gjallë, / Sot tri dit t’ka pri me qitë kunorë. / E ka gjetë nji njeri beset, / Meiherë Mujit natën ja ka nisun. / N’nesret nadje djali â kapë tu kulla, / Nji kah nji krejt punët ja kallxon Mujit."],
      ],
      cast: {
        gruaja: ['burgKotor', 'takes Tanusha in and hires a trusted rider to carry word to Jutbina overnight'],
        tanusha: ['burgKotor', 'leaves her fate to the messenger\'s speed'],
      },
    },
    {
      id: 'mujoRallies', title: 'The tribe\'s own honour',
      note: 'Mujo laughs at the "steer of Kotor" — then calls every Aga to arms, not for Halili\'s sake but for Jutbina\'s.',
      lines: [
        ['25.1', 'Mujo bursts out laughing — "steer of Kotor," did he not warn him — and says he would not lift a finger for Halili if not for the honour of the whole tribe.', "T’madhe burri paska nisë me qeshë: / - A t’kam thanë, taraku i Kotorrit, / Se Kotorret kanë me ta hangër kryet! / Mos me m’ardhë marrja e Jutbinës, / Tybe n’zotin kambën nuk e luejta!"],
        ['25.2', 'He gives out a battle cry from the parapet, and the Agas gather at once.', "Â dalë trimi në beden t’kullës, / Me ‘i kushtrim ka thirrë Jutbinë e Krahinë: / - Për nji punë, qi sot ka ndodhë, / «Kushtrim, djalë, për me çetue!» / Meiherë trimat kenkan mbledhë. / - Hajre, Mujë, kanë qitë agët e kanë thanë."],
        ['25.3', 'He tells them plainly: Sokol Halili is taken in New Kotor, and though he would not move for the boy alone, Jutbina\'s honour is at stake — arm yourselves, for no worse day has ever faced them.', "- S’kam shka u thom, more agët e mij, / Veç m’koriti Sokole Halili! / E kanë xanë mbrendë në Kotorre t’reja, / Qi tybe n’zotin mbrapa n’i bie, / Mos me m’ardhë marrja e Jutbinës! / Me u shtërngue, burra, si t’mundi, / Se dita e dekës ma e vshtirë ndryshej nuk vjen!"],
        ['25.4', 'Three hundred Agas take up their weapons.', "Treqind agët mirë janë shtërngue,"],
      ],
      cast: {
        mujo: ['jutbina', 'hears the news by morning, laughs at the "steer of Kotor," then calls every Aga to arms'],
        agat: ['jutbina', 'arm to the man at Mujo\'s battle cry, three hundred strong'],
      },
    },
    {
      id: 'ambushReeds', title: 'Silent in the reeds',
      note: 'The Agas ride to New Kotor as if shot from a bow and hide, utterly silent, in the coastal reeds.',
      lines: [
        ['26.1', 'When they ride out the beech trees seem to shake and the rivers seem to boil, their coursers flying so fast they land in New Kotor almost at once.', "Kanë ba ashtat trimat me ushtue, / Kanë ba lumet trimat m’u turbllue, / Kanë ba gjogat trimat me flurue / E t’janë kapë te Kotorret e reja."],
        ['26.2', 'In the coastal reeds Mujo positions his men and orders total silence, and every one of them waits, hidden and still.', "N’shevarinë t’detit kur kanë ra, / Npër ranë t’detit Muji i ka shpërda: / - Ver me gojë mos guxo kush me ba! / Sa mirë agët janë mshehë e t’gjith pa za po rrijnë. / Të lumët na për zotin t’lumin, / Se shum njeri kenka mbledhë / Ndër ato Kotorre t’reja!"],
      ],
      cast: {
        mujo: ['fushaMbretit', 'rides the whole way in what feels like an instant, then hides his men in the reeds'],
        agat: ['fushaMbretit', 'wait hidden and silent in the coastal reeds'],
      },
    },
    {
      id: 'stakeTaunt', title: 'Before the whole town',
      note: 'On a Sunday the Krajl gathers all of New Kotor to mock the shackled Halili before the church — and Halili answers him like a true man.',
      lines: [
        ['27.1', 'The king calls his people together on a Sunday before the church, where Halili stands in the square in irons, mocked by the whole town.', "Me kushtrim krajli i ka thirrë, / Tanë Kotorri tu kisha janë ra. / Ditë e dielle si m’kish qillue, / N’mjedis t’logut nji djalë i ri, / Hekrat duersh, bugagitë kambësh, / Aj asht Halil Aga i zi, / Mbarë Kotorret me ta qi po qeshen."],
        ['27.2', 'The king asks if he can already see death in his own eyes — has he ever faced worse than this?', "Mbet e i foli Krajle Kapedani: / - A p’e shef, Halil, dekën me sy? / Kurr ma ngusht, Halil, a thue, je kanë?"],
        ['27.3', 'Halili answers like a true man: no one is truly lost until he is dead, and worse than death itself is betraying a friend, breaking a promise, or failing a guest — and whenever he has fallen into danger before, God has always given him the strength to break free.', "Sa kuvend burrash djali paska shtrue: / - Pa nigjo, more Krajle Kapedane! / S’â ngusht njeri deri n’ditë të dekës, / Deka vjen mbas mikut t’pre, / Deka vjen mbas besës s’thyeme, / A ‘i kue bukë mos t’kesh për mik. / Sa ma ngusht, krajli, qi ka kanë, / Qaq ma lirë zoti ma ka ba!"],
      ],
      cast: {
        krajli: ['burgKotor', 'gathers the whole town on a Sunday to mock the shackled Halili before the church'],
        halili: ['burgKotor', 'stands bound in the square and answers the Krajl\'s taunt like a true man'],
      },
    },
    {
      id: 'fiveMinutesSong', title: 'One last song, by custom',
      note: 'Halili begs five minutes free of his shackles to sing, by the custom of his fathers, before his death — the Krajl grants it and hands him a lahutë.',
      lines: [
        ['28.1', 'The king tells him to speak his last words, for his life ends at this stake.', "- Fjaln e mbrame, n’e paç, për me folë, / Se ty jeta m’njat hu t’u ka sosë!"],
        ['28.2', 'Halili curses the king back and begs five minutes of freedom instead — by the tradition of his fathers a man should not die asleep in bed, but singing, sword in hand.', "- Zoti t’vraftë, bre Krajle Kapedani, / Se zoti e di, per kâ e ke ngulë at hu! / Pesë dekika liri për me m’dhanë! / Tjetër t’mirë ne t’parët nu’ na kanë lanë, / Kurrnja nesh veç mos me dekë në t’shtrueme, / Por me shpata m’u pre tuj këndue."],
        ['28.3', 'The king grants it nobly, has him freed of his shackles, and hands him a lahutë.', "Sa burrnisht krajli e ka çue! / - Gjithë sa t’duesh, Halil, me kndue! / Edhe duert mirë ja shpengojnë, / Ja kanë dhanë lahutën n’dorë."],
        ['29.1', 'None of the Kotor crowd understands him, singing as he does in the tongue of his own people.', "Kurkush djalin vesht s’und e ka marrë, / Krejt p’e kndon kangën n’gjuhë të parve:"],
        ['29.2', 'He sings that his final hour has come, and calls out to the sun and the zana: where is the protection they promised him?', "«E kshtu drita e mbrame m’paska ardhun - o! / Dielli xanë e majet xanë! / Ku e latë ndoren, more diell? / Ku e ke ndoren, mori zanë? / P’a kjo â besa, qi m’patët dhanë?"],
        ['29.3', 'He asks the sun for one last answer by its own light, and begs it to carry word back to the mountains — wake the oras, set the beechwoods alight, and tell the great zana that Halili has perished.', "A po m’gjegjesh, more diell? / Pash njat dritë, qi t’flakron n’ballë, / Amanet ta paça lanë, / Amanet për t’mramen herë! / Kërkoe bjeshkën krep e m’krep, / Kërkoi mrizet gjithku janë, / Ndezi ashtat anemanë, / Zirjau gjumin orve n’mal, / Zanës s’madhe falëmeshndet, / Thuej:»Halili qetash mbet!»"],
      ],
      cast: {
        halili: ['burgKotor', 'begs five minutes free of his shackles to sing one last song, by his fathers\' own custom'],
        krajli: ['burgKotor', 'grants it and has him freed of his irons and handed a lahutë'],
      },
      items: { lahuta: ['halili', 'given by the Krajl\'s own order for one last song'] },
    },
    {
      id: 'birdCall', title: 'Word carried by a bird',
      note: 'Halili sings his last hour in a tongue none of Kotor understands, and begs a passing bird to carry word to Mujo.',
      lines: [
        ['30.1', 'A bird flies down and lands on a beech branch, and Halili begs it, by whatever wings it has left, to carry word to Gjeto Basho Mujo.', "Ka flurue nji zog prej malit, / U ndal Zogu n’degë të nji ahit. / - Amanet, more zogu i malit, / A ke flatra me flutrue? / Pash njat degë, ku rri pushue, / Falëmeshndet Gjeto Basho Mujit!"],
        ['30.2', 'He curses Mujo should he be sleeping through this or off hunting in the mountains, and begs that if he is anywhere near, he hear this — Halili\'s very worst hour.', "E ate gjumi n’e pastë xanë, / Kurr kryet shndosh-o mos e çoftë! / Për n’kjoftë bjeshkve kah çeton, / Kurr te shpija shndosh mos voftë! / E për n’kjoftë kund ksajt tuj ndi, / Kurr ma ngusht vedin s’e di!"],
      ],
      cast: {
        halili: ['burgKotor', 'sings his last hour in a tongue none of Kotor understands, and calls a bird to Mujo'],
      },
    },
    {
      id: 'mujoOnslaught', title: 'A shriek that topples towers',
      note: 'Mujo breaks from the reeds with a shriek that shakes the town to its foundations; Halili, freed of his shackles, claims the kill he swore.',
      lines: [
        ['31.1', 'Mujo has already reached the flatland, and at his shriek the towers themselves crash down, the sea floods over dry land, and the mountains roar like a storm.', "Qaty Muji për fushë â dalë / E e ka ha nji piskamë t’madhe, / Janë shemë kullat der’ n’themele! / E t’â trandun deti me hi mbrendë, / Kanë gjimue malet, si për mot t’lig,"],
        ['31.2', 'No one can hide from the onslaught — the heroes tear into the enemy and their horses alike, until corpses flow out to the sea and the warriors wade through the bloodshed, Mujo himself never tiring.', "Kurrnja trimat nuk p’e lanë me hikë. / Luftë e rrebtë aty qi po bahet, / Me dhambë trimat duen shoshojnë me shkye, / Me dhambë gjogat duen shoshojnë me marrë. / Notojnë kurmat fellë në det, / Notojnë trupat nëpër gjak, / Hiç s’po lodhet Gjeto Basho Muji."],
        ['32.1', 'As Mujo closes on the king, Halili calls out to leave him be — the king is his by oath, to die at this very stake.', "Sa fellë trimi m’paska hi! / - Ruej, bre Mujë, se krajlin po ma çartë, / Fort ka britun Sokole Halili, / Zgidhmi kush prangat prej dore, / Se kam ba be n’t’lumin zot, / Qe ky hu shpirtin me ja marrë!"],
        ['32.2', 'Mujo frees him of his shackles, and Halili falls on the king with fury, taking him alive only to kill him at the stake exactly as he swore.', "Muji djalin e ka shpengue. / Â turrë djali si i tërbue, / Gjallë me dorë krajlin ka xanë, / Me shpinë n’hu ditt i mbaroi."],
      ],
      cast: {
        mujo: ['fushaMbretit', 'breaks from the reeds with a shriek that topples towers, and tears through the town'],
        agat: ['fushaMbretit', 'wade through the onslaught at Mujo\'s side'],
        halili: ['fushaMbretit', 'freed of his shackles, calls off Mujo and takes the killing blow himself'],
        krajli: ['fushaMbretit', '☠ taken alive and killed at his own stake, exactly as Halili swore'],
      },
      exit: ['krajli'],
    },
    {
      id: 'ruins', title: 'A mother betrayed her daughter',
      note: 'The warriors burn New Kotor to ash; before he turns for home, Mujo tells the ruined town plainly why.',
      lines: [
        ['33.1', 'Fired by the slaughter, the warriors burn the whole town to ash, and Mujo in his rage shows no pity for tower, body, or child — it takes three risings of the sun and three of the moon before the flames go out.', "Qatherë burrat kanë rrokë unat, / Shpejt qyteti ka marrë zjarr, / Ka marrë zjarr krejt n’fund e n’maje. / Sa fort Muji m’asht tërbue! / Aspak dhimbë trimi s’po ka, / As për kulla qi rrenohen, / As për t’dekun qi shkrumbohen, / As për fmij mbrendë kah po digjen. / Tri herë dielli ka pranue, / Tri herë hana ka ague, / Kurkund zjarmi me pushue."],
        ['33.2', 'As the hero turns to leave, he tells the ruined town: when travellers by land and sea ask why the Realm was so destroyed, answer them — a mother betrayed her own daughter.', "Kur ka ba trimi me dredhë, / Kenka sjellë prej Kotorresh t’reja: / - A po ndieni, mori troje të rrenueme? / Drumi i juej për tokë ë det. / Kushdo t’pvesë për tokë e det: / «Po pse krajli u ka lanë shkret?» / Trathtoi binë, thoni, nana e vet!"],
      ],
      cast: {
        mujo: ['fushaMbretit', 'shows no pity as New Kotor burns to ash, then tells the ruined town plainly why'],
        agat: ['fushaMbretit', 'burn the town with him, fired by the day\'s slaughter'],
      },
    },
    {
      id: 'homecoming', title: 'A wedding, not a grave',
      note: 'So Mujo saved his brother — and Halili, home at Jutbina at last, marries the orphaned Tanusha: one of the rare frontier songs that ends this way.',
      lines: [
        ['33.3', 'So Mujo saved his brother, and Halili married the orphan maiden — one of the rare frontier songs that ends in a wedding, not a grave.', "Ka nxjerrë Mujin vllan e vet! / Muer Halili ‘i vashë mbetë shkret!"],
      ],
      cast: {
        mujo: ['jutbina', 'brings his brother home, the tribe\'s own honour answered'],
        halili: ['jutbina', 'marries Tanusha at Jutbina at last'],
        tanusha: ['jutbina', 'wed into Jutbina, far from the father who cast her out'],
        agat: ['jutbina', 'home from New Kotor with Mujo and Halili'],
      },
    },
  ],
}
