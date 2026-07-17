// ===========================================================================
// TALE: Rrëmbimi i së shoqes së Mujit — Mujo's Wife is Kidnapped — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// This IS the song the folklore card 'kreshnik-epic' summarizes: "when Muji
// is taken and thrown in a tower, the swift younger Halili rides alone into
// the Krajl's land, breaks into the prison and carries his brother home."
// Song no. 21 of Palaj-Kurti's own collection (no. 15 of Elsie & Mathie-
// Heck's English selection). A KRESHNIK SONG, not a prose tale — English and
// Albanian run line-for-line (429 Albanian verse-lines to 428 English lines:
// the source's last two lines merge into Elsie's one closing line), so
// "paragraphs" here are 19 narrative strophes and each numbered sentence is a
// punctuation-bounded verse group of 1–6 lines; the Albanian third element is
// the verbatim verse group, lines joined with " / ". The game ALREADY STAGES
// this exact song as the halil1 → halilFund/halilKeq branch off Jutbina, with
// Mujo and Halili as the core NPCs `mujo` (core-world.js) and `halili` (this
// tale's own registry entry) — the beats anchor onto that branch in full.
// ===========================================================================

export default {
  id: 'kreshnik-epic',
  title: "Mujo's Wife is Kidnapped",
  source:
    'Sung by Mëhill Prêka of Curraj i Epërm (District of Tropoja); Visaret e Kombit II, ed. B. Palaj & D. Kurti (Tirana 1937), pp. 159–169 (n. 21 of the collection) · read in R. Elsie & J. Mathie-Heck\'s translation "Mujo\'s Wife is Kidnapped" (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Curraj i Epërm, District of Tropoja',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare I, 1966',
  },
  albanian: {
    title: '«Rrëmbimi i së shoqes së Mujit»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 159–169, in the Albanian PDF Elsie & Mathie-Heck published beside their translation — NOT present in the Wayback Machine under this path (CDX search of the whole albanianliterature.net domain, 2026-07-15, found no capture for verse_09_AL_15.pdf, though sibling files 01/02/03/06/08/09/17/20 are archived); retrieved instead from the live site directly over plain HTTP (the site\'s HTTPS handshake fails). Gheg dialect, already modern-orthography as printed by Elsie/Mathie-Heck — no transliteration performed; straight apostrophes mark the source\'s own elisions.',
    local: 'docs/references/palaj-kurti-rrembimi-gruas-mujit.sq.txt',
  },
  discrepancies: [
    'THE FINAL RECKONING\'S FAMILY (¶19.2, EN "Slew his sister and his daughter"): Elsie\'s English leaves "his" ambiguous — the Krajl\'s family or Mujo\'s own. The identical formula appears twice earlier (¶3.11 and ¶5.3) unambiguously naming MUJO\'s own sister and daughter, seized alongside Mehreme in the raid on his kulla — on that internal precedent the beats read the closing line the same way: Mujo\'s own household, swept into the years of captivity and cut down with the wife who betrayed him, not the Krajl\'s family. A harsh reading, but the one the poem\'s own repetition supports.',
    'HOW THE COURSER GOT HOME (between ¶10.6 and ¶16.2): Mujo rides his own courser into the Kingdom, is drugged and bound there — yet Halili "takes and readies Mujo\'s courser" back at Jutbina before riding to the rescue. The Albanian is as silent on the gap as the English; the beats keep the silence rather than invent an explanation Elsie himself does not give.',
  ],
  // 19 strophes; sentence counts per strophe (verse units — EN and AL run
  // close to line-for-line, 428/429 lines total)
  paragraphs: [10, 9, 13, 8, 6, 8, 7, 11, 8, 6, 11, 8, 19, 7, 8, 6, 5, 4, 5],
  cast: [
    { id: 'mujo', name: 'Mujo', note: 'Gjeto Basho Mujo — captured this time, not the captor', npc: 'mujo' },
    { id: 'halili', name: 'Halili', note: "Sokol Halili — Mujo's younger brother, who rides out alone", npc: 'halili' },
    { id: 'krajli', name: 'Krajle Kapidani', note: 'the Captain King — burns the kulla, takes the wife, dies for both', npc: 'krajli' },
    { id: 'mehreme', name: 'Meremja Turkinë', note: "Mujo's own wife — captured, remarried, and a traitor", npc: 'mehreme' },
    { id: 'gruaKrajlit', name: "the king's first wife", note: 'demoted to a servant, then freed into Mujo\'s own household', npc: 'gruaKrajlit' },
    { id: 'familjaMujos', name: "Mujo's sister and daughter", note: 'seized alongside Mehreme; share her end besides', npc: 'familjaMujos' },
    { id: 'gjogu', name: 'gjogu i Mujës', note: "Mujo's oracular courser — speaks once, fights twice", npc: 'gjogu' },
    { id: 'zanat', name: 'the sworn sister-zanas', note: "Mujo's probatin from Fuqija e Mujit, carrying his last message", npc: 'zanat' },
    { id: 'agët', name: 'the thirty Agas', note: 'offer Mujo everything money can rebuild — except his honour', npc: 'agët' },
  ],
  // anchor = the game location this tale place inhabits — REUSE over invention,
  // under THE SHARING RULE. This is a NORTHERN (Gheg) frontier song, sung by
  // the SAME singer (Mëhill Prêka) as mujo-strength — mirrors are Jutbina and
  // its own highland pastures, exactly as that tale already anchored them.
  places: [
    { id: 'jutbina', emoji: '🏘️', name: 'the Plain of Jutbina', note: "the frontier hamlet's open plain and towers",
      anchor: { status: 'existing', node: 'jutbina', mirror: 'Jutbina, the kreshnik hub the game already names "where the lahutë sings the Songs of the Kreshnikë" — the same hamlet mujo-strength.js already anchors',
        mold: 'the frontier hamlet where Mujo and Halili dwell; roads and homecomings accumulate here without clashing',
        sharedWith: ['mujo-strength', 'halil-marriage (mujo1/mujo2…)', 'binoshet (kopshtiZanave)'] } },
    { id: 'mujosKulla', emoji: '🏯', name: "Mujo's kulla", note: "the brothers' own home tower, burned and rebuilt within this one song",
      anchor: { status: 'existing', node: 'mujo1', mirror: 'Mujo\'s own kulla at Jutbina — the game\'s own "mujo1" node, already home to Mujo, Halili, and (per the halil-marriage strand) young Omer',
        mold: 'the brothers\' home tower — in THIS song burned to a stump by the Krajl\'s raiders while Mujo is away, its household carried off, and standing again by the song\'s own end',
        sharedWith: ['halil-marriage (mujo1/mujo2/mujo3/mujo4, the Tanusha strand)'] } },
    { id: 'krajlKulla', emoji: '🗼', name: "the Krajl's tower", note: 'twelve masons, twelve years, three hundred gilded chambers — and, in the end, a prison',
      anchor: { status: 'existing', node: 'halil1', mirror: 'the Krajl\'s fortress across the frontier — the game\'s OWN halil1/halilFund/halilKeq branch, whose existing "good" ending already tells this exact song in miniature: "The Krajl took Muji of Jutbina and threw him in a tower... so Halili rode alone into the Krajl\'s land, broke into the prison, fought his way through, and carried his brother home"',
        mold: 'a Krajl\'s tower where Muji was once held and Halili once rode to free him — this tale is that song, told in full',
        conflicts: 'NOT rusha1 (Zuku\'s song\'s Krajl tower) — per tale-arnaut-osmani.js\'s own note, "Krajl" names the standing office of the frontier\'s Slavic royal enemy across many songs, not one man; each song\'s Krajl is his own man, a different daughter, a different tale' } },
    { id: 'bjeshka', emoji: '⛰️', name: 'the mountain pastures', note: 'the high road between Jutbina and the Kingdom',
      anchor: { status: 'existing', node: 'mali1', mirror: 'the grazing heights above Jutbina — the frontier massif\'s own bare flank, the exact spot three-friends set aside for "muji-halili" and mujo-strength already staged',
        mold: 'a bare, empty flank where wanderers cross paths — nobody owns the open mountainside; this song\'s king hunts here, and both brothers cross it riding either way',
        sharedWith: ['three-friends', 'mujo-strength', 'sari-salltek'] } },
    { id: 'krajlRealms', emoji: '👑', name: "the Krajl's three kingdoms", note: 'searched for three hundred kinless men; never staged',
      anchor: { status: 'offstage', mirror: 'the Krajl\'s wider dominion, three kingdoms combed for the friendless and the landless',
        mold: 'never staged — the levy happens off the road, named only in the telling' } },
    { id: 'mejdan', emoji: '⚔️', name: 'the war-grounds of the Seven Kingdoms', note: 'the death Mujo demands and never gets',
      anchor: { status: 'offstage', mirror: 'the shared dueling ground (mejdan1) every kreshnik\'s duel is fought on',
        mold: 'never visited in this song — Mujo only NAMES it, demanding to die witnessed among the Seven Kingdoms rather than butchered quietly in his captor\'s bedroom' } },
  ],
  items: [
    { id: 'lahuta', emoji: '🎻', name: 'the lahutë', note: "Mujo's one dying wish — its song carries clean across the mountains" },
    { id: 'turbina', emoji: '🔭', name: 'the tower field-glass', note: "Mehreme's own spyglass, turned twice — once on the king, once on his death riding in" },
    { id: 'prangat', emoji: '⛓️', name: 'the iron shackles', note: "lock Mujo hand and foot until his brother's courser breaks the door" },
  ],
  // How the GAME stages this song: not as the full 19-strophe epic but as the
  // compact halil1 → halilFund branch off Jutbina. The player rides beside young
  // Halili — roused at midnight, then backing him into the Krajl's tower to free
  // the jailed Mujo. Entry is the waking; the freeing is the payoff.
  play: {
    entry: 'wakingHalili',
    stance: 'companion',
    with: 'halili',
    role: "You ride at Sokol Halili's side. A Krajl has seized Gjeto Basho Mujo and thrown him in a foreign tower, and this once the elder kreshnik cannot break his own chains — so the youngest brother is left alone at Jutbina. You help rouse him at midnight and back him as he takes up Mujo's own courser and rides into the Krajl's land: into the prison, through the guards, and home again with his brother. The youngest Kreshnik proving himself.",
    enter: "the zanas hammer at Halili's door in the black of midnight",
    from: 'halil1',
    ending: 'halilFund',
    scenes: { halil1: 'wakingHalili', halilFund: 'freed' },
    divergences: [
      { beat: 'wakingHalili', note: "The game opens the branch at the rescue: three lines — a Krajl takes Mujo, Mujo is in prison, Halili is alone. The song's whole first half (the king's boast, the wife's retort, the terrible vow, the muster of three hundred kinless men, the burned kulla) is never played." },
      { note: "Why Mujo is jailed changes. In the song he rides in alone and his own wife Mehreme drugs him with nine-year raki and shackles him in his sleep; the game just says 'a Krajl takes Mujo' — no traitor wife, no self-inflicted capture." },
      { beat: 'freed', note: "The good ending stops at the rescue and the ride home. The song's homecoming is far harsher — Mujo cuts down Mehreme and his own sister and daughter besides, takes the king's first wife, and burns the tower; the game ends at 'Halili carries his brother home.'" },
    ],
  },
  beats: [
    {
      id: 'boast', title: "A king's boast",
      note: "In his fortress across the frontier, the Captain King boasts to his wife that no man alive is his equal — while at Jutbina, Mujo's whole household still stands untouched.",
      lines: [
        ['1.1', 'Praise to you, Almighty God!', "T'lumit zot, more, i kjoshim falë,"],
        ['1.2', 'We were nothing at all until you gave us life.', "Si s'jem' kanë e jetën na e ka dhanë!"],
        ['1.3', 'See now what the Captain King did — God had made him a fine man indeed.', "Kqyr çka bani Krajle Kapidani! / Burrë të mirë zoti e ka falë,"],
        ['1.4', 'He set twelve master masons to raising a splendid tower, and gave them twelve years to finish it.', "Kullë të mirë paj krajli kishte nisë, / Dymbdhetë mjeshtra vndue m'ta i ka, / Dymbdhetë vjet m'ta lanë i ka,"],
        ['1.5', 'Vast beyond telling — three hundred rooms gilded in gold, doors and ceilings forged in steel, twelve storeys standing: the king had built himself a marvel.', "Sa të gjanë kullën qi e ka nisë, / Treqind oda m'ta si i ka da, / Po i mbaron odat prej florinit, / Dyerët e mblojën po ja vndon çelikut, / Dymbdhetë ketesh përpjetë e ka çue, / Bukuri prej krajli e ka punue!"],
        ['1.6', 'He took his ease in an upper chamber laid with royal cushions, his coffee-pot set to warm over the fire.', "Në sobë t'epër krajli ka pushue, / Me minder krajlit ja kanë shtrue, / E ka shti xhezmen në zjarm,"],
        ['1.7', "He called down loudly for his wife: 'Come up to my chamber, quickly, bride!'", "Nuses s'vet t'madhe te i ka thirrë: / - Shpejt në sobë, moj nuse, mue me m'ardhë!"],
        ['1.8', 'She hurried up to him — and hear now what he told her.', "Shpejt në sobë nusja te i ka ardhë. / Kqyre krajli atherë çka i ka thanë!"],
        ['1.9', "'No man alive is my equal,' he said, 'and no woman living is yours,'", "- Kurrkund shoqin për burrë nuk e kam, / Kurrkund shoqen për grue ti s'ma ke,"],
        ['1.10', "'no kulla is the equal of mine, no sabre matches my sabre, and no man's horse is a match for my own.'", "Kullës seme shoqja nuk i bahet / E s'ma ka shoqen shpata e mejdanit, / Gjogu shoqin kurrkund-o nuk ma ka."],
      ],
      cast: {
        krajli: ['krajlKulla', 'boasts to his wife that no man alive matches his tower, his sabre, or his horse'],
        gruaKrajlit: ['krajlKulla', 'his own wife, summoned up to hear the boast'],
        mujo: ['mujosKulla', 'dwells at Jutbina with his household, not yet provoked'],
        halili: ['mujosKulla', "at his brother's side"],
        mehreme: ['mujosKulla', "Mujo's own wife, keeping his kulla"],
        familjaMujos: ['mujosKulla', "Mujo's sister and daughter, at home in the kulla"],
        gjogu: ['mujosKulla', "Mujo's oracular courser, stabled at the kulla"],
        zanat: ['bjeshka', 'dwell in the high pastures, not yet called on'],
        agët: ['jutbina', 'the thirty Agas of Jutbina, wandering, not yet gathered'],
      },
      items: {
        turbina: ['krajlKulla', "the tower's own field-glass"],
        prangat: ['krajlKulla', 'iron shackles kept in the tower'],
        lahuta: ['mujosKulla', "hangs at Mujo's kulla, not yet asked for"],
      },
    },
    {
      id: 'retort', title: "The wife's honest answer",
      note: 'His wife answers honestly — and by every measure she names, Mujo beats him.',
      lines: [
        ['2.1', "Hear how his wife answered: 'Will you give me leave to speak, my king?'", "Kqyr e shoqja atherë çka i ka thanë! / - A m'ep izën, krajl-o, për me folë?"],
        ['2.2', "The king gave her leave, and she began: 'No one alive is without his equal —'", "Edhe krajli izë i ka dhanë, / Ja ka nisë grueja te i ka thanë: / - Kurrkund shoq i pashoq nuk â,"],
        ['2.3', "'were you to lay eyes on Gjeto Basho Mujo, you'd count yourself lucky to herd his cattle.'", "Por, me pa ti Gjeto Basho Mujin, / Rrogtar lopësh ti gja nuk i duhesh,"],
        ['2.4', 'His moustache spans two black rams, and his arms are like two branching oaks.', "I ka musteqet sa dy deshë galana, / I ka krahët sa dy lisa me rrema;"],
        ['2.5', "Set beside his Mehreme, the Turkish woman, I wouldn't be fit to nurse her child.", "Me ja pa njat Meremet Turkinë, / Për dadë t'ditës kurrgja nuk i duhem;"],
        ['2.6', 'Beside his fighting sabre, yours would look like a bread-knife.', "Me ja pa paj shpatën e mejdanit, / Brigjak bukësh e jotja qi po të duket;"],
        ['2.7', 'Beside his warhorse, yours would look like a wooden donkey.', "Me ja pa gjogun e mejdanit, / Magar drush i yti qi po t'duket;"],
        ['2.8', 'Beside his kulla and his halls, yours would look like a pantry shed.', "Me ja pa kullat e sarajet, / Çerranik paj tuat qi po t'duken;"],
        ['2.9', 'And should you ever face him on some hillside, he\'d break your leg and your arm both.', "Paj për s'kundërt me e pa m'ndoi kodër, / Ja m'then kambën, ja m'then dorën."],
      ],
      cast: {
        gruaKrajlit: ['krajlKulla', "answers the king's boast: beside Mujo, his whiskers, arms, sabre, horse, and kulla all shame him"],
      },
    },
    {
      id: 'vow', title: 'A terrible oath',
      note: "Stung silent for an hour, the king swears a terrible oath: an army of the friendless, raised to level Mujo's kulla and strip him of everything he owns.",
      lines: [
        ['3.1', 'The words cut the king to the quick — for a whole hour he said nothing at all.', "Sa keq krajlit m'i ka ardhë, / Nji sahat krajli nuk ka folë!"],
        ['3.2', 'When at last he spoke, it was to swear a mighty oath:', "Kur ka qitë krajli e ka folë, / Ma ka ba nji be fort t'madhe:"],
        ['3.3', "'By the God who made me, I'd cut you down this instant, were it not for my own people watching —'", "- Pasha 'i zot mue qi m'ka dhanë, / Marrja e hallkut po m'len pa t'pre;"],
        ['3.4', "'but the day spring breaks, I'll comb all three of my kingdoms and raise three hundred outcasts to my banner —'", "Veç kur t'dalë vera, kjoftë e bardhë, / N'tri krahinë s'e la për pa dalë, / Me i bashkue treqind deberdera,"],
        ['3.5', "'men with no land and no pasture, no mother, no father, no brother, no sister, no nephew, no uncle, none of them promised or wed —'", "T'tanë pa tokë e t'tanë pa vrri, / Të pananë, të tanë të pababë, / Të pamotër, të tanë të pavlla, / Te panipa, të tanë të padajë, / Të pafejuem, të tanë të pamartuem,"],
        ['3.6', "'men who'd pity neither Turk nor Christian, and leave no one behind them.'", "Mos t'u dhimben turkut as kaurrit, / Mos të kenë kurrkend shokësh mbrapa"],
        ['3.7', "'I'll clothe every one of them, shave them, dress them anew,'", "E t'i veshi të tanë e t'i mbathi / E t'i rruej të tanë e t'i ndrroj,"],
        ['3.8', "'and feed all three hundred on beef for a hundred days —'", "Njiqind dit të treqindt si t'i mbajë, / Mish tarokut të tanë të hanë"],
        ['3.9', "'then set them against Mujo's kulla, burn his tower and his halls, and level his kulla flat to the ground —'", "E tu kullat Mujos për me i ramë / A t'ja djegu kullat e sarajet, / Rrash me tokë kullat qi t'ja baj"],
        ['3.10', "'leaving nothing standing but a dead stump for a cuckoo to sing on, day and night —'", "E ja la si cung të thatë, / Me kndue qyqja ditë e natë"],
        ['3.11', "'Mehreme rides out with me when it's done, and the girl and the woman who share his blood go with her,'", "E t'i marr Meremet Turkinë / T'ja marr motrën e të binë;"],
        ['3.12', "'his war-sabre is forfeit, his ducat-gold throne is forfeit, and not one copper vessel stays in that house!'", "T'ja marr shpatën e mejdanit, / T'ja marr selinë prej dukatit, / T'ja marr remet ka t'i kenë!"],
        ['3.13', 'At that, his wife withdrew and said no more.', "Mbrapan grueja kenka dredhë."],
      ],
      cast: {
        krajli: ['krajlKulla', "swears to raise an army of the kinless and raze Mujo's kulla to the ground"],
      },
    },
    {
      id: 'muster', title: 'Three hundred outcasts',
      note: "Spring comes; the king combs his three kingdoms for three hundred men with no one left to mourn them, arms and feeds them a hundred days, and marches them on Jutbina.",
      lines: [
        ['4.1', 'Spring came and broke into leaf; he fed his courser its fill of grass and leaves, and rode out through his three kingdoms searching.', "Kenka dalë vera, kjoftë e bardhë, / Ju ka ngi gjogu dushk e bar, / M'tri krahina krajli kenka dalë,"],
        ['4.2', 'He gathered every soul in his lands and picked out three hundred outcasts from among them.', "Krejt miletin krajli e ka bashkue, / I ka zgjedhë treqind deberdera,"],
        ['4.3', 'Not one had mother or father, brother or sister, nephew or uncle.', "Të pananë, të tanë të pababë, / Të pamotër, të tanë të pavlla, / Të panipa, të tanë të padajë,"],
        ['4.4', 'None were promised or married, none had kin to mourn them, and none would pity Turk or Christian either.', "Të pafejuem, të tanë t'pamartuem, / Qi s'po kanë kurkand për mbrapa, / Qi s'po i dhimben turkut as kaurrit."],
        ['4.5', 'He brought them all to his own kulla, fed and reclothed them, and armed them well.', "Tha, tu kullat krajli i ka bashkue, / I ka la krajli e i ka ndrrue, / Sa mirë krajli n'armë i ka shtërngue,"],
        ['4.6', 'A hundred days he kept them, feeding them beef and wine without fail, day after day.', "Njiqind dit krajli i ka mbajtë, / Mish tarokut krajli u ka qitë, / Mish e venë po për gjithë ditë."],
        ['4.7', "The men fell to boasting of each other's strength; the king clothed them further still and armed them heavier yet.", "Kanë nisë djelmt-o m'u qeftue! / Te i ka veshë krajli, te i ka mbathë, / Fort ma mirë krajli i ka armatisë,"],
        ['4.8', 'Then he mounted his own courser and led all three hundred straight down on Jutbina.', "I ka kcye gjogut në shpinë, / Treqind vetve u ka pri, / Në Jutbinë krajli kenka ra,"],
      ],
      cast: {
        krajli: ['jutbina', 'leads his three hundred landless men south to Jutbina'],
      },
    },
    {
      id: 'burning', title: 'The kulla burned',
      note: "With Mujo away at his uncles', the king burns the kulla to a stump and carries off Mehreme, Mujo's sister and daughter, his throne, and his vessels — then goes home to a hero's welcome.",
      lines: [
        ["5.1", "As luck would have it, Mujo was visiting kin just then, and no one at all was left inside the tower.", "Taksirat paj Muji e ki' pasë, / Ai te dajat na ka qillue, / Kullën vetëm e ka lanë."],
        ["5.2", 'The king burned the kulla down and levelled it flat, leaving nothing but a dead stump with a cuckoo singing on it.', "Edhe djegë kullat si ja ka, / Rrash me tokë kullat ja ka ba / E e ka lanë si cung të thatë, / Me kndue qyqja ditë e natë;"],
        ["5.3", 'Mehreme he dragged off with him, the daughter and the sister too, and into his saddlebags went the gold-ducat throne and every last copper vessel of the house.', "Ja ka marrë Meremet Turkinë, / Ja ka marrë t'motrën e të binë, / Ja ka marrë selinë prej dukatit, / Ja ka marrë remet te i ki' pasë."],
        ["5.4", 'He turned back for his own Kingdom, reached home whole and safe, and set about preparing a feast.', "Ka marrë rrugën prej krajlive, / Shndosh e mirë tu shpija â vojtë. / Shum denam krajli kish' ba,"],
        ["5.5", 'He called all his people together, welcomed them, and fed them well.', "Gjith miletin bashkue ma ka, / M'i ka pritë, m'i ka gostitë,"],
        ["5.6", "They praised him for his safe return and for taking Mujo's own wife besides: 'Long live the Captain King,' they cried.", "Për shyqyr qi shndosh ka ardhë, / Qi edhe gruen Mujos ja ka marrë. / Burrë i fort Krajle Kapidani!"],
      ],
      cast: {
        krajli: ['krajlKulla', "burns Mujo's kulla to a stump and brings the captives home to a feast"],
        mehreme: ['krajlKulla', 'carried off with the household'],
        familjaMujos: ['krajlKulla', 'carried off alongside Mehreme'],
      },
    },
    {
      id: 'newBride', title: "A new bride, an old wife demoted",
      note: "Home again, the king reminds his own wife of an old boast kept — and demotes her to a servant so he can marry Mujo's captured wife in her place.",
      lines: [
        ['6.1', 'And what did the king have in mind next?', "Çka qitë krajli e ka ba?"],
        ['6.2', "Back in his palace, he called loudly for his own wife: 'Come up to my chamber, quickly!'", "N'saraj t'vet krajli kenka hi, / Nuses s'vet të madhe te i ka thirrë: / - Shpejt në sobë, moj nuse, për me m'ardhë!"],
        ['6.3', "'Do you remember what you told me, a year gone by?'", "A din, nuse, vjet se çka m'ke thanë?"],
        ['6.4', "'Every word I answered you has come true — I am the Captain King, and I've kept my word well.'", "Fjala e eme sa mirë m'ka dalë! / Qe un jam Krajle Kapidani!"],
        ['6.5', "'God gave me strong fighting men — and do you know now what I've done to Mujo?'", "Se burrë t'fortë zoti mue m'ka falë, / A din Mujos un se shka i kam ba?"],
        ['6.6', "'I've decided to make you my own housemaid from this day on.'", "Për dadë t'ditës me t'lanë kam da"],
        ['6.7', "'You'll rise and wash my feet, and drink the water after; and every night we sit to dinner, you'll hold the torch between your teeth to light the table.'", "Edhe kambët shpejt me m'i la, / Ujët e kambve për me e pi. / Sa herë darkë t'kena me ngranë, / Ke me mbajtë pishën me dhambë / Edhe dritë, ke me na ba."],
        ['6.8', "So the king married Mujo's own wife, and made his own former wife into a servant.", "Gruen e Mujos krajli marrë e ka, / Hysmeqare t'ven e ka ba."],
      ],
      cast: {
        krajli: ['krajlKulla', "marries Mehreme in his own wife's place"],
        mehreme: ['krajlKulla', "made the Captain King's new wife"],
        gruaKrajlit: ['krajlKulla', "demoted to a servant at her own husband's table"],
      },
    },
    {
      id: 'nightmare', title: 'A black dream',
      note: "Still away at his uncles', Mujo wakes from a black dream of wolves and a burning kulla; Halili doubts it, but Mujo won't let it go.",
      lines: [
        ['7.1', "Mujo's bad luck held — he was still away, staying with his uncles.", "Taksirat Muja e ki' pasë, / Paj te dajat ka qillue."],
        ['7.2', 'One morning Mujo rose, still heavy with sleep,', "N'nadjet Muja kenka çue, / Sa mahmurrshëm Muja qi ka ndjehë,"],
        ['7.3', "and called loudly to Halili: 'Get up, Halili — up now, don't lift your head slow!'", "Ai Halilit t'madhe i ka thirrë: / - Çou, Halil, e kryet ti mos e çosh!"],
        ['7.4', "'I've dreamed a black dream, Halili — a great wolf-pack came down off the mountain and ate both our coursers whole,'", "'I andërr t'zezë, Halil, qi e kam pa, / 'I llavë e madhe prej bjeshket â ra, / Të dy gjogat hangër qi na i ka."],
        ['7.5', "'and we've left our own kulla standing empty, boy — I fear the king has burned it to the ground.'", "Kullat vetëm, djalë, i kem' lanë, / Drue se krajli djegë na i ka."],
        ['7.6', "Halili answered back: 'It's bitter cold out on the pastures now, the leaves are already down — maybe the dream means nothing at all.'", "Çka ka qitë Halili e ka thanë? / - Shum e ftoftë bjeshka po m'asht, / Qetash asht gjethi tue ra, / Ndoshta andrra s'kallxon gja."],
        ['7.7', "Mujo answered: 'If this dream turns out to mean nothing at all, I'll never trust another dream again.'", "Ka qitë Muji e ka thanë: / - Gja kjo andërr mos me kallxue, / Kurr ma andrret s'kam me u besue."],
      ],
      cast: {
        mujo: ['bjeshka', 'wakes from a black dream and rouses Halili'],
        halili: ['bjeshka', 'doubts the dream, then rides out with his brother anyway'],
      },
    },
    {
      id: 'ruins', title: 'Smoke on the wind',
      note: "Riding for Jutbina, the two kreshniks smell smoke on the wind — and Mujo's own courser, speaking for once, confirms the worst before they even arrive.",
      lines: [
        ['8.1', 'Face and hands rinsed clean at the spring, the two brothers leapt to the saddle and pointed their coursers toward Jutbina.', "Duerët e faqet kreshnikët i kanë la / E u kanë kcye gjogave n'shpinë / E e kanë marrë rrugën për Jutbinë."],
        ['8.2', 'Halfway there, the smell of the burning kulla reached them.', "N'at gjysë rruget kur kanë marrë, / Erën kullës ja ka ndie."],
        ['8.3', "Hear what Mujo said to Halili: 'There's a smell of char on the wind.'", "Kqyr Halilit trimi çka i ka thanë! / - Era shkrum m'gitet se â tue ardhë."],
        ['8.4', "And Halili's answer: 'I caught it long before you did — I only didn't dare say so.'", "Çka i ka thanë Halili Mujit? / - Fort kaherë erën e kam ndie, / Por s'kam guxue me ta xanë me gojë."],
        ['8.5', 'Their coursers churned up smoke and dust behind them.', "Tym me mjegull gjogat i kanë ba,"],
        ['8.6', 'The horses were ridden near to bursting, foam at both their mouths, their hides running with sweat.', "Bash me plasë gjogat ishin ba, / Shkumë për gojet, qi kanë qitë, / Bytym djers u kullon shtati."],
        ['8.7', "Then, by God's own doing, a wonder happened: the courser opened its mouth and spoke —", "Hyqmet zoti e ka ba, / Me gojë gjogu kishte folë:"],
        ['8.8', "'There's no cause to run me to bursting, Mujo — the gallop does you no good today,'", "- S'ke bre, Muj, pse m'ban me plasë, / Sot dobi vrapi s'po t'ban,"],
        ['8.9', "'for the shkja has already fallen on your kulla, burned it to ashes, and taken your wife besides.'", "Se ndër kulla shkjau na ka ra / Edhe kullat djegë na i ka / Edhe gruen ty ta ka marrë."],
        ['8.10', 'When they reached the house at last, they found the kulla levelled and burnt to ash.', "Kundra shpijave dalë te m'u kanë, / Rrash me tokë kullat pa i kanë,"],
        ['8.11', "Mujo's grief broke over him like nothing before.", "Sa fort Muja kenka lodhë!"],
      ],
      cast: {
        mujo: ['mujosKulla', 'reaches the ruin and breaks down in grief'],
        halili: ['mujosKulla', "arrives at his brother's side"],
        gjogu: ['mujosKulla', 'speaks a warning on the road, then carries them both to the ruin'],
      },
    },
    {
      id: 'rebuke', title: "What money can't rebuild",
      note: "Thirty Agas offer to rebuild everything the king destroyed — but Mujo asks the one thing they can't buy back: his honour. Ashamed, they leave him.",
      lines: [
        ['9.1', 'Thirty Agas gathered and came before Mujo to speak.', "Tridhet agë iu kanë bashkue, / Para Mujos i kanë dalë:"],
        ['9.2', "'Welcome, Gjeto Basho Mujo,' they hailed him, and wished good health to both him and Halili.", "- Ti hoshgjelden, Gjeto Basho Muja! / Edhe kryet Mujës ja kanë shndoshë: / - Ti shndosh, Mujo me Halilin!"],
        ['9.3', "'Don't lose heart over this, Mujo — we'll raise you a finer kulla still, find you a better wife, a better throne, buy you finer vessels, and give you herds and goods to spare.'", "E m'u lodhë, Muj, mos u lodh, / Se edhe kullat t'i bajmë ma t'mira / Edhe gruen ta marrim ma t'mirë / E selinë ta gjejmë ma t'mirë / Edhe remet t'i blejmë ma t'mira, / Gja e mall me t'falë, na t'falim."],
        ['9.4', 'And what did Gjeto Basho Mujo answer?', "Kqyr çka foli Gjeto Basho Muja!"],
        ['9.5', "'My honour to you, Agas — build me a finer kulla if you can, arrange me a finer wedding, find me a finer throne,'", "- U rritët ndera, agve u ka thanë, / Njimend kullat m'i bani ma t'mira, / Edhe martesën ma bini ma t'mirë, / E selinë ma gjeni ma t'mirë,"],
        ['9.6', "'raise me my halls and my vessels again — but tell me this: where will you go to buy back my honour?'", "Po m'i ngrehni kullat e sarajet, / Po m'i bini remet ka i kam pasë, / Marren teme ku delni me e marrë?"],
        ['9.7', "The Agas bowed their heads and stood in silence, shamed by the truth in his words.", "Atherë agët kryet e kanë ugjë, / Kurrnja gojën çilë nuk e ka, / Kaq nen marre agët ishin ra,"],
        ['9.8', "Stung that they had never fought at his side, and now angry at Mujo besides, they turned and went back to Jutbina.", "Si luftue agët mos t'kin pasë. / Fort inat Mujos ja kin pase, / Në Jutbinë agët t'gjith kanë dredhë."],
      ],
      cast: {
        mujo: ['mujosKulla', "refuses the Agas' offer — no rebuilt kulla restores his honour"],
        agët: ['mujosKulla', 'offer to rebuild everything money can buy; leave ashamed when Mujo asks for his honour back'],
      },
    },
    {
      id: 'ridesAlone', title: 'Riding alone',
      note: 'Mujo sends Halili home, arms himself alone rather than live with the shame, and rides straight into the Kingdom after his wife.',
      lines: [
        ['10.1', "Hear what Mujo told Halili: 'Damn you, young Aga — I'm leaving you here at home now.'", "Kqyre Muja Halilit çka i ka thanë! / - Zoti t'vraftë, Halil Aga i ri, / Paj tu shpija un ty due me t'lanë."],
        ['10.2', 'He left Halili at the house and set out himself, a broken man.', "E tu shpija Halilin e ka lanë. / Ka nisë burri e kenka prishë,"],
        ['10.3', 'The weary kreshnik thought only of taking poison and ending himself — the shame was more than he could bear to carry.', "Me vra vehten kreshniku â lodhë, / Me pi zehrin kreshniku ka nisë. / Marre vedit nuk po don me i lanë!"],
        ['10.4', 'Instead he took his own war-courser, well armoured as it was, his fighting sabre, his cannon, and his flintlock.', "E ka marrë at gjogun e mejdanit / E sa mirë kenka armatisë! / E ka marrë shpatën e mejdanit, / E ka marrë top e xhiverdare,"],
        ['10.5', "Hear what he told his courser: 'Cursed be every grain I ever fed you, if you fail me now in the Kingdom!'", "Kqyre gjogut atherë çka i ka thanë! / - T'kjoftë haram maja, qi t'kam ba, / T'kjoftë haram tagjija, qi t'kam dhanë, / Në Krajlni ti n'kjosh qi me m'lanë!"],
        ['10.6', "Up onto the saddle he climbed, a haze of dust trailing behind, and crossed clean over the border, making straight for the king's own gate.", "I ka kcye gjogut në shpinë, / Tim e mjegull gjogun e ka ba, / Në Krajlni Muja kenka hi, / Kenka vojtë tu Krajle Kapidani."],
      ],
      cast: {
        mujo: ['krajlKulla', 'rides alone into the Kingdom, armed and desperate'],
        halili: ['mujosKulla', 'sent home, left behind'],
        gjogu: ['krajlKulla', "carries Mujo into the Kingdom"],
      },
    },
    {
      id: 'betrayed', title: 'His own wife\'s hand',
      note: "With the king off hunting, Mujo reaches the palace — and the wife who seems overjoyed to see him drugs him with old raki and binds him in irons while he sleeps.",
      lines: [
        ['11.1', 'The king himself was away in the mountain pastures, out hunting with three hundred of his own men,', "Paj, krajli në bjeshkë qi m'ish kanë, / Me gjatue krajli m'kishte dalë, / Treqind shkje me vedi i kish pasë,"],
        ['11.2', 'taking many bears alive and slaughtering game besides.', "Shum harusha t'gjalla i kishte kapë, / Shum gje t'egra krajli kishte vra."],
        ['11.3', 'Mujo reached the palace, and his own wife caught sight of him — she seemed overjoyed at the sight.', "Tuk sarajet Muja i ka ra, / E shoqja e Mujës, paj, Mujën e ka pa / E sa fort e shoqja iu ka gzue!"],
        ['11.4', 'But see now how deep her betrayal ran!', "Kqyre Mujin sa fort e ka tradhtue!"],
        ['11.5', 'She wept and spoke with him sweetly, the tears running down her face — but her whole aim was to trick him.', "Muhabet, paj, Mujos i ka ba, / Lott për faqe grues qi po i shkojnë, / Paj, po do Mujin kesh po e rre,"],
        ['11.6', 'She poured him raki nine years aged; he drank and fell into a sleep so heavy he could not shake it off.', "Ja ka qitë rakinë e nandë vjete, / Gjumi i randë, tha, Mujin e ka marrë, / Aspak gjumi Mujos nuk po i del."],
        ['11.7', 'With every breath the sleeping hero let out, fire and embers flew from his mouth, and the whole palace shook.', "Sa herë burri frymë po ep, / Flakë e prush për gojet qi po qet / E sarajet sa fort qi po i dridhë."],
        ['11.8', 'And with every breath he drew back in, every door in the palace blew open.', "Sa herë burri frymë po ngrehë, / Tana dyertë meiheri po çilen."],
        ['11.9', 'See now what his own wife did next!', "Kqyr e shoqja atherë çka ka ba!"],
        ['11.10', 'She clapped irons on his arms and shackles on his feet, bound him fast, and locked it all shut with steel padlocks.', "Ja ka shti hekurat në dorë, / Ja ka shti prangat në kambë, / Paj, sa mirë Mujin e ka lidhë, / Ja ka vndue drynat prej çelikut,"],
        ['11.11', 'Then she raised the field-glass to her eye, scanned the mountain pastures, and saw the king already riding home.', "E ka marrë turbinë në sy, / Po i shikjon bjeshkët për s'gjanit, / Mirë po e shef krajlin tue ardhë."],
      ],
      cast: {
        krajli: ['bjeshka', 'out hunting with three hundred men'],
        mujo: ['krajlKulla', 'drugged and bound by his own wife'],
        mehreme: ['krajlKulla', 'binds Mujo, then watches the mountains for the king'],
      },
      items: {
        prangat: ['mujo', 'locked hand and foot with steel padlocks'],
        turbina: ['mehreme', "raised to watch for the king's return"],
      },
    },
    {
      id: 'biggerGame', title: 'Something bigger',
      note: "The king comes home to a wife bragging of a catch bigger than his — and it takes his own disbelief to drag out of her exactly whom she's caught.",
      lines: [
        ['12.1', "When the king reached the palace door, she called out: 'Welcome home, my king — what game have you brought back?'", "N'derë t'sarajit krajli kur asht ra, / - Ti hoshgjelden, krajl-o, i ka thanë, / Ti çfarë gjeje, krajlo, na ke xanë?"],
        ['12.2', "'Five bears I caught alive,' he said, 'thirty wild goats I killed, and ten wild roebuck besides.'", "- Pesë harusha t'gjalla i kam xanë, / Tridhetë dhi t'egra i kam vra, / Dhetë kaproj t'egjer i kam kapë."],
        ['12.3', "'That's quite a haul,' she laughed, 'but I've caught something bigger still!'", "Shum gje krajli, tha, e ka xanë. / Sa t'madhe grueja kish pa' keshë! / - Gje ma t'madhe un qi kam xanë!"],
        ['12.4', "The king answered: 'Damn you, Mehreme — what shameless talk is this? Were it not for my own people, I'd cut you down for it. Since when do women catch game indoors?'", "Kqyre krajli atherë çka i ka thanë? / - Zoti t'vraftë, Meremet Turkinë, / Fort në krye fjala, qi m'ka ra, / Marrja e hallkut po m'len për pa t'pre, / Gratë mbrendë gje kur kanë xanë?"],
        ['12.5', "Mehreme answered plainly: 'I've taken Gjeto Basho Mujo prisoner!'", "Kqyr çka foli Meremet Turkina! / - Kam xanë rob Gjeto Basho Mujin!"],
        ['12.6', "'Damn you for your nonsense,' he said. 'Do you even know who Gjeto Basho Mujo is?'", "- Zoti t'vraftë, grue, te i ka thanë, / A di ç'asht Gjeto Basho Muja?"],
        ['12.7', "'No man alive is stronger; I could never have taken him myself. You could never have bound Mujo unless you tricked him first.'", "Kurrkund burrë ma t'fortë qi nuk ka, / Kurr nuk muj un për me e xanë, / Për pa muajtë ti për me e rre, / S'mundesh Mujin për me e lidhë."],
        ['12.8', "'Come to my chamber, my king,' she said, 'Mujo's hands and feet are already bound — do with him whatever you please.'", "- Paj, në sobë, Krajlo, për me ardhë, / Kambësh e duerësh Mujin ta kam lidhë, / Si të duesh me te për me ba."],
      ],
      cast: {
        krajli: ['krajlKulla', "returns from the hunt to Mehreme's boast"],
      },
    },
    {
      id: 'mocked', title: 'Bound and mocked',
      note: "The king finds Mujo bound, gloats over everything he's taken, embraces Mehreme before his eyes, and offers him a death with no witnesses — until Mujo's own defiance buys him one request.",
      lines: [
        ['13.1', 'The king went in, made his way to her chamber, and there found Mujo,', "Atherë krajli mbrenda kenka hi, / Paj, në sobë krajli kenka vojtë, / Në sobë Mujin e ka gjetë,"],
        ['13.2', 'hands and feet bound fast, sunk in a heavy sleep. The king shouted loudly at him, but the hero slept straight through it.', "Kambësh e durësh Mujin ta kam lidhë, / Gjumë i randë Mujin e ki' marrë / Edhe thirrë Mujos fort i ka. / Aspak burrit gjumi s'i ka dalë!"],
        ['13.3', 'See what the king did next!', "Kqyre krajli atherë çka ka ba!"],
        ['13.4', "He kicked Mujo hard, and Mujo finally woke. 'Do you know what's happened to you, Mujo?' the king asked him.", "Sa fort shkelm, paj, Mujos i ka ra, / Mujos gjumi na i ka dalë. / Ka marrë Mujos e i ka thanë: / - A din, Mujo, çka t'ka gjetë?"],
        ['13.5', "'You don't even know whose hands you've fallen into, do you?'", "A po njef, se kush jam vetë?"],
        ['13.6', "'I am the Captain King, standing before you!'", "Un, po, jam Krajle Kapidani,"],
        ['13.7', "'I'm the one who burned your kulla to ashes and levelled it flat. I have your Mehreme now,'", "Kullat tua t'i kam djegë, / Rrash me tokë kullat t'i kam ba, / Ta kam marrë Meremet Turkinë,"],
        ['13.8', "'your sister and your daughter too, your golden throne, and every one of your copper vessels.'", "T'kam marrë motrën edhe binë, / Ta kam marrë selinë prej dukatit, / T'i kam marrë remet kah i ke pasë."],
        ['13.9', "The king called out for Mujo's wife: 'Come to the chamber, quickly!'", "Grues s'Mujës krajli i ka thirrë: / - Shpejt në sobë, grue, për me m'ardhë."],
        ['13.10', "He took her in his arms, kissed her on both eyes, and began his love-play with her right there before Mujo's bound eyes.", "Edhe ngrykë, paj, gruen ja ka marrë, / Të dy sytë, tha, krajli ja puthë, / Ja ka nisë lodërs e po luen."],
        ['13.11', 'Mujo clenched his teeth so hard the whole palace shook.', "Dhambët për dhambë Muja i ka shtërngue, / Gjithë sarajet meiherë janë dridhë."],
        ['13.12', 'What came out of the king\'s mouth next?', "Kqyre krajli atherë çka i ka thanë!"],
        ['13.13', "'Shall I have your head off, Mujo, or would you rather I hanged you instead?'", "- A po don, bre Mujo, për me t'pre, / A po don, bre Mujo, për me t'vjerrë?"],
        ['13.14', 'Those words struck Mujo like poison — he turned bitter as a viper and tried to rise, but the shackles held him fast.', "N'krye kto fjalë Mujos i kanë ra, / Idhtë si gjarpni burri asht ba, / Ka marrë burri m'u çue n'kambë, / Veçse prangat s'e kanë lanë."],
        ['13.15', "Then Gjeto Basho Mujo spoke: 'Damn you, king,' he said. 'I'm no stolen cow —'", "Atherë foli Gjeto Basho Muji: / - Zoti t'vraftë, krajlit i ka thanë. / Lopë e vjedhun qillue s'kam,"],
        ['13.16', "'my name is Gjeto Basho Mujo. If I'm to die, let it be on the war-grounds, where the Seven Kingdoms battle the sultan —'", "Se mue m'thonë Gjeto Basho Muja, / Due m'u pre në fushë t'mejdanit, / Tu përpiqen shtatë krajlnitë e mbreti,"],
        ['13.17', "'for God made me an honest man, and the whole world knows my name.'", "Se burrë t'mirë zoti m'ka pasë falë, / T'gjithë dylnjeja zanin ma ka ndie."],
        ['13.18', "'How could I die where no one sees it?!'", "Qysh m'u pre kurrkush për pa m'pa?!"],
        ['13.19', "The king seethed and rolled his eyes round and round, but found no answer to Mujo's words.", "Ka nisë krajli me turfllue, / Rreth e rrokull synin e ka sjellë, / Fjalve të Mujit ndesh veç s'u ka ra."],
      ],
      cast: {},
    },
    {
      id: 'lastWish', title: 'One last wish',
      note: "Mujo asks for nothing but the lahutë, and sings for three hours — long and clear enough for his sworn sister-zanas, far off in the mountains, to hear every word of his message.",
      lines: [
        ['14.1', "Hear what Mujo asked of him instead — one favour, and one only: 'My one wish is for the lahutë.'", "Kqyre Muja atherë çka ka thanë? / Nji rixha krajlit ja ka lypë, / Fort qefli për lahutë, qi m'ish kanë,"],
        ['14.2', 'The king called his people in, freed Mujo\'s hands, and handed him a lahutë carved of maple,', "Milet krajli i ka dhanë, / Edhe duerët krajli ja ka zgidhë, / Ja ka çue lahutën prej palmje,"],
        ['14.3', 'its body wrapped in donkey-hide, its bow cut from cornel-wood, its single string spun from horsehair.', "Ma kish pasë zhargun prej magari, / Ma kish pasë dorcën prej thane, / M'i kish pasë qymet kali shale."],
        ['14.4', 'Mujo took the lahutë, tuned its string, and played — his fingers sure on the neck, his voice truer still — and sang on for three whole hours.', "Merr lahutës Muja për me i ra, / N'dyzen Muja e ka vndue. / Mirë ai gishtat na i shtërnon, / Por ma mirë me za i ndimon, / Tre sahat zani po i shkon."],
        ['14.5', 'His singing rang out so clear that the mountain zanas heard it from their own cliffs.', "Sa piskame, tha, burri qi ka kndue, / E kanë ndie zanat në shkamb."],
        ['14.6', "Mujo called out to the zanas with this — 'sworn sisters, a prisoner now, in a tighter corner than I've ever stood,'", "Kqyre zanave Muja çka u ka thanë! / - Probatesha, zana, xanë u kam, / Kurr ma ngusht kanë edhe nuk jam,"],
        ['14.7', "'Get this to Halili for me, I beg you — they've got both my wrists and my ankles bound, and tomorrow it's the killing field, where the Seven Kingdoms take on the sultan's men.'", "Kambë e dorë lidhë si m'i kanë, / Nesër pritem n'fushë t'mejdanit, / Tu t'përpiqen shtatë krajlnitë e mbreti / E xhevapë Halilit për me i dhanë."],
      ],
      cast: {
        zanat: ['bjeshka', "hear Mujo's song carry across the mountains"],
      },
      items: {
        lahuta: ['mujo', 'freed to his hands — his one dying wish'],
      },
    },
    {
      id: 'wakingHalili', title: "Waking Halili",
      note: "The zanas hurry to Halili's door at midnight and can't rouse him — until his prayers are done — before they can give him Mujo's message.",
      lines: [
        ['15.1', 'Off the zanas flew to find Halili, rapping on his door in the black of midnight and shouting his name again and again — yet not one word came back.', "Kqyre zanat atherë çka kanë ba! / Te Halili atherë te janë shkue / N'pikë të natës zanat kanë trokllue / Edhe thirrë Halilit i kanë / E përgjegjë Halili nuk ka. / E sa fort thirrë qi m'i kanë,"],
        ['15.2', "The zanas began to worry. Hear what they wondered: 'Could Halili be out somewhere — out chasing women, perhaps?'", "Kanë nisë nakël për m'u ba. / Kqyre zanat atherë çka kanë thanë! / - A thue Halili ktu s'ka qillue? / N'kjoftë qillue Halili tue kurvnue,"],
        ['15.3', "'If so, may God curse his whole night!'", "Zoti t'mbarën kurr mos ja dhashtë;"],
        ['15.4', "'Or could he be out thieving instead?'", "N'kjoftë qillue Halili tue vjedhë,"],
        ['15.5', "'If so, may God curse that night too!'", "Zoti t'mbarën kurr mos ja dhashtë;"],
        ['15.6', "'But if he's at his prayers instead, may God grant every one of them.'", "Për në kjoftë zotit tuj i u lutë, / Zoti t'mbarën Halilit ja dhashtë!"],
        ['15.7', 'Halili, as it happened, heard every word of it — and the moment his prayer was done, he ran straight to the door.', "Sa mirë Halili qi po i ndie! / Paj, Halili lutën kur po e krye, / Shpejt e shpejt në derë ka dalë,"],
        ['15.8', "The zanas gave him the message straight: 'Tomorrow Gjeto Basho Mujo dies on the war-grounds, where the Seven Kingdoms fight the sultan.'", "Xhevapë Halilit zanat te i kanë dhanë: / - Nesër pritet Gjeto Basho Muja, / Te t'përpiqen shtatë krajlnitë e mbreti."],
      ],
      cast: {
        zanat: ['mujosKulla', "knock at Halili's door at midnight with Mujo's message"],
        halili: ['mujosKulla', 'rises from his prayers to hear it'],
      },
    },
    {
      id: 'haliliRides', title: "Halili rides",
      note: "Halili arms himself, takes up Mujo's own courser — somehow already home, though the song never explains it — and rides into the Kingdom's mountains to cut down the king's whole army.",
      lines: [
        ['16.1', 'See what Halili did then — he dressed, armed himself with his fighting sabre, took up his cannon and his flintlock,', "Kqyr Halili atherë çka ka ba! / Kenka veshë djali, kenka mbathë, / Ma ka marrë shpatën e mejdanit, / E ka marrë top e xhiverdare,"],
        ['16.2', 'and readied Mujo\'s own courser — home again at Jutbina, though the song never says how — and set off for the Kingdom, smoke and dust rising behind him.', "E ka marrë gjogun të Mujës, / E ka marrë rrugën për Krajli. / Tim e mjegull gjokun e ka ba,"],
        ['16.3', "He reached the Kingdom's own mountains and ran straight into the Captain King's men — battle broke out at once, with a din and an uproar like nothing before.", "Kenka dalë në bjeshkë t'krajlive, / Ish kenë ndeshë n'Krajle Kapidanin. / Sa shpejt lufta aty kenka ngrehë! / Shum potera aty kenka ba!"],
        ['16.4', "Halili fought hard, and Mujo's own courser fought right alongside him.", "Mirë Halili aty po na lufton, / Gjogu i Mujës Halilit po i ndimon."],
        ['16.5', "See what Mujo's courser did — it tore into the soldiers with its teeth and lashed out behind it with its hooves,", "Gjogu i Mujës, kqyre, çka ka ba! / Krejt asqerin në dhambë po e han / E sa shkelma mbrapan qi po qet,"],
        ['16.6', "leaving the king's men in heaps of dead; Halili cut down the whole army, and the king himself broke and ran.", "Aq të dekun krajlit ja ka ba. / Gjithë asqerin Halili po e pret. / Paj, tha, krajli sa turr kenka ikë!"],
      ],
      cast: {
        zanat: ['bjeshka', 'return to the high pastures, message delivered'],
        halili: ['krajlKulla', "cuts down the king's whole army with Mujo's own courser fighting at his side"],
        gjogu: ['krajlKulla', 'fights alongside Halili, teeth and hooves both'],
        krajli: ['krajlKulla', 'routed, fleeing his own battle'],
      },
    },
    {
      id: 'reckoningTower', title: 'A dove and a raven',
      note: "Watching from the tower, Mehreme mistakes the rider for an omen — until the king's own first wife names him true: Sokol Halili, and the king's death riding with him.",
      lines: [
        ['17.1', 'And what of Mehreme, the Turkish woman?', "Kqyr çka bani Meremet Turkina!"],
        ['17.2', "She hurried up onto the wall and pressed the field-glass to her eye, then called down to the king's first wife: 'Come look, curse you, sister — white wings out there, and hard on its tail a raven, chasing!'", "Kenka dalë n'beden të kullës, / Ma ka marrë turbinë në sy, / Grues s'krajlit ajo çka i ka thanë? / - Zoti t'vraftë, mori ortake e ndry, / Për me e pa nji pllumb me sy, / Se ç'po e ndjekë nji korb i zi."],
        ['17.3', "The first wife answered her: 'Damn you instead, Mehreme — is it that you don't know, or that you won't see?'", "Atherë grueja m'i ka thanë: / - Zoti t'vraftë, Meremet Turkinë, / A s'po don ti, a s'po din?"],
        ['17.4', "'That's no dove and that's no raven — that's Sokol Halili running down the Captain King himself, and he means to take his head. God's own lightning has been loosed!'", "Ai nuk asht, jo, pllumb i bardhë, / Ai nuk asht, jo, korb i zi, / Ai asht Sokole Halili, / Â kah ndjekë Krajle Kapidanin / E po don kryet me ja marrë. / Sa vetimë zoti e ka ba!"],
        ['17.5', "The two of them came together in the palace garden — Halili caught the king by the arm and struck his head from his shoulders with the sabre.", "N'bahçe t'krajlit t'dy tek janë ra / E në krah krajlit ja ka ngjitë, / Kryet për tokë me shpatë ja ka qitë."],
      ],
      cast: {
        mehreme: ['krajlKulla', 'spies the rider from the tower, uneasy'],
        gruaKrajlit: ['krajlKulla', "names Halili true, and welcomes the king's death"],
        halili: ['krajlKulla', 'runs the king down in his own garden and takes his head'],
        krajli: ['krajlKulla', '☠ beheaded in his own garden'],
      },
      items: {
        turbina: ['mehreme', "turned once more, on the king's own death riding in"],
      },
      exit: ['krajli'],
    },
    {
      id: 'freed', title: 'A door of steel',
      note: "Mujo's own courser knows his voice through a door of solid steel — and Halili finally has his brother loose.",
      lines: [
        ['18.1', "See how Mujo answered — his own courser had reached the palace gate, and Mujo cried out to it in a great voice,", "Kqyre Muja aherë çka ka ba! / N'derë t'sarajit gjogu kur ka vojtë, / T'madhe gjogut i ka britë."],
        ['18.2', 'and the courser knew his voice at once — two kicks against the door, and though it was forged of solid steel, it gave way easily.', "Sa mirë n'za gjogu ma ka njoftë, / Me dy shkelma derës qi po i bjen, / Krejt çelikut dera ka qillue, / Kollaj derën e ka thye."],
        ['18.3', 'Halili swung down off the courser and hurried in to Mujo — found him still bound in his shackles, and had him loose in no time at all.', "Prej gjogut Halili ka zdrypë, / Te Muja Halili â shkue, / Lidhun Mujën e ka gjetë, / Sa shpejt Mujën e ka zgidhë!"],
        ['18.4', "See how Mujo's own courser answered — it whinnied loud and long, worn with worry for its master.", "Kqyre gjogu i Mujës çka ka ba! / Sa fort gjogu Mujës po i hingllon, / Për Mujën gjogu ish mërzitë."],
      ],
      cast: {
        mujo: ['krajlKulla', 'freed from his shackles at last'],
        gjogu: ['krajlKulla', 'kicks the steel door in at the sound of Mujo\'s voice'],
      },
      items: {
        prangat: ['krajlKulla', 'struck off Mujo at last'],
      },
    },
    {
      id: 'homecoming', title: 'The reckoning, and the road home',
      note: "Mujo settles every account at once — Mehreme and his own captive household dead, the king's wronged first wife taken for his own, the tower burned — and rides home to a hero's welcome at Jutbina.",
      lines: [
        ['19.1', 'And what did Mujo do next?', "Kqyre Muja atherë çka ka ba!"],
        ['19.2', 'He killed Mehreme, the Turkish woman, killed his own sister and daughter along with her, and took the king\'s own wife for himself instead,', "E ka pre at Meremet Turkinë, / E ka pre t'motrën e të binë, / Gruen e krajlit Muja e ka marrë,"],
        ['19.3', 'took the golden throne, his own fighting sabre besides, burned the tower and its halls, and levelled the kulla flat.', "Ja ka marrë selinë prej dukatit, / Ja ka marrë shpatën e mejdanit, / Ja ka djegë kullat e sarajet, / Rrash me tokë kullat ja ka ba,"],
        ['19.4', 'They rode home safe to Jutbina, and the whole hamlet turned out to feast in their honour.', "Shndosh e mirë n'Jutbinë kanë ra, / Mbarë Jutbina për ta denam ka ba."],
        ['19.5', 'God bless whoever hears this told — so the singers say it, for none of them were there to see it themselves.', "Kush ndigjoftë, zoti e ndimoftë! / Kshtu m'kanë thanë, / Se atje nuk jam kanë!"],
      ],
      cast: {
        mehreme: ['krajlKulla', '☠ killed for her betrayal'],
        familjaMujos: ['krajlKulla', '☠ killed alongside her'],
        gruaKrajlit: ['jutbina', "freed, and taken home as Mujo's own"],
        mujo: ['jutbina', 'home at Jutbina, his honour and his sabre both restored'],
        halili: ['jutbina', "home at his brother's side"],
        gjogu: ['jutbina', 'home safe, all three of them'],
      },
      exit: ['mehreme', 'familjaMujos'],
    },
  ],
}
