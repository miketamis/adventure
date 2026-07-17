// ===========================================================================
// TALE: Mali i Tomorrit — the sacred mountain & pilgrimage — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// NOT a wonder-tale with a plot: a LEGEND/CUSTOM about a mountain that is
// still climbed, and a living pilgrimage. The paragraphs below are the
// agent's OWN chronological arrangement of a modern institutional source's
// thematic blocks (oldest cult layer first, then the saint's own life, then
// the mountain's growing history down to today) — not that source's own
// visual layout, which jumps between eras freely. See taleLib.coverageOf:
// beat order carries no numbering requirement, only total coverage.
//
// The game ALREADY stages this pilgrimage's PAGAN layer directly: qiell1 /
// qiellDem1 / qiell2 narrate a white-bull kurban climbed to Zojz, and node
// 'maja' already has an old man saying "in summer people climb here and eat
// a kurban" (content.js, Mount Tomorr region). This tale is the layer laid
// on TOP of that — the historical Bektashi tekke, its dervish-founder, and
// the saint pilgrims climb for today — not a replacement for the pagan
// scene, exactly as the game's own zojzBekim ending already says: "the
// kurban the pilgrims share at the tekke now is a lamb, not a bull."
// ===========================================================================

export default {
  id: 'tomorri-pilgrimage',
  title: 'Mali i Tomorrit — the sacred mountain & pilgrimage',
  source:
    'Kryegjyshata Botërore Bektashiane (World Headquarters of the Bektashi Order), official bilingual page "Mali Tomorr dhe gjurmët e Abaz Aliut" / "The Tomorr Mountain and the Footprint of Abbas Ali" (kryegjyshataboterorebektashiane.org, fetched 2026-07-15), plus one paragraph from the same body\'s news article on the 2023 pilgrimage ceremony; read in the Order\'s own English translation where one exists, all lines paraphrased in the agent\'s own words',
  origin: {
    region: 'South-Central Albania (Berat / Skrapar, Mount Tomorr) — the same massif as tomor-shpirag, a place-cult legend of the mountain itself',
    collector: 'The Bektashi Order\'s own World Headquarters, publishing its living tradition\'s own account of the mountain it administers',
    published: 'kryegjyshataboterorebektashiane.org (current institutional website; the tekke it describes was itself rebuilt 1915-1916)',
  },
  albanian: {
    title: '«Mali Tomorr dhe gjurmët e Abaz Aliut»',
    source:
      'Kryegjyshata Botërore Bektashiane, https://kryegjyshataboterorebektashiane.org/mali-tomorrit-dhe-gjurmet-e-abaz-aliut/ (fetched 2026-07-15); the kurban sentence (¶8) from the same body\'s https://kryegjyshataboterorebektashiane.org/ceremonia-tradicionale-ne-malin-e-tomorrit/ (22 August 2023). Already in standard modern orthography — no transliteration needed. Straight quote marks normalized to «».',
    local: 'docs/references/kryegjyshata-tomorri-abaz-aliut.sq.txt',
  },
  discrepancies: [
    'THE EDWARD LEAR EPIGRAPH is not used: the source page opens with a scenic quotation attributed to Edward Lear (the 19th-century English travel-writer who really did cross Albania and really did describe Tomorr). Since Lear wrote in English, the Albanian on the page is itself a translation of his words, and the page\'s own "English" is a second, independent re-translation back out of that Albanian — not Lear\'s original sentences. Rather than quote a twice-translated paraphrase as if it were an original, the epigraph is left out of the beat lines entirely (kept, for the record, in the docs/references extract).',
    'A DIFFERENT, RICHER VARIANT OF ¶3 (Wikipedia, "Tomorr"): English Wikipedia\'s "Cult and pilgrimage" section tells a fuller version of the same founding legend — Haji Bektash Veli himself, seeing Christian pilgrims climb for the Assumption, travels to Abbas ibn Ali\'s actual grave at Karbala, digs up an arm bone, and throws it onto Tomorr\'s peak, making the mountain the saint\'s SECOND grave outright. The Bektashi Order\'s own page (this tale\'s actual source) tells it more simply — an unnamed "Haxhi Baba" from Haji Bektash\'s tekke raises a symbolic, bone-less cenotaph — with no arm-bone and no Haji Bektash Veli in person. No Albanian original of the arm-bone telling was found (only Elsie-derived English on Wikipedia), so the beats follow the Order\'s own simpler, sourced telling; the richer version is recorded here only as background, per the schema\'s rule against inventing or back-translating Albanian.',
    'FOUR SCATTERED FEASTS, ONE MOUNTAIN: read separately, the source\'s paragraphs describe an ancient pagan cult (¶1), a Bektashi martyr-cult (¶2-4, ¶7-9), and a national-poetic Rilindja cult (¶4-5) as if unconnected topics on one web page. The beats read them as successive LAYERS on one mountain, not competing claims — exactly how the game\'s own zojzBekim ending already treats it ("the kurban the pilgrims share at the tekke now is a lamb, not a bull for the old god"). Nothing here retires the pagan layer; it explains what else stands beside it.',
    'THE WHITE HORSE IS FROM A DIFFERENT SOURCE: the belief that Abaz Aliu "returns each August on his white horse" (cast note, and the mythic-figure\'s NPC entry) is not in the Kryegjyshata Bektashiane page this tale otherwise follows — docs/references/kryegjyshata-tomorri-abaz-aliut.sq.txt has zero hits for kalë/horse. It comes from English Wikipedia\'s "Tomorr" article ("Abbas ibn Ali... went to Albania on a white horse... continues to return to Mount Tomorr... each year"), the same secondary source folklore.js\'s own pre-existing summary already draws on. The five named footprint-stones (Bargullas, Novaj, Kajcë, Rodhes, Taronin) are NOT tied to that horse in either source — the primary page calls all five simply "Gjurma e Abaz Aliut" (the saint\'s own footprint), specifying a hand\'s print only for Bargullas — so the item and beat notes describe those five as the saint\'s own footprints, keeping the white-horse detail attached only to the general returning-pilgrim legend, not to these specific stones.',
  ],
  // sentence counts of the agent's own 9-paragraph chronological arrangement
  // (oldest cult layer → the saint's own life → his tomb raised → the poets'
  // tribute → the tekke's modern history → today's pilgrim numbers → its
  // teachings → its kurban → its footprints across the district)
  paragraphs: [5, 6, 1, 1, 3, 1, 3, 1, 6],
  cast: [
    { id: 'babaTomor', name: 'Baba Tomor', note: 'the mountain\'s oldest name — sworn by across every faith long before any of the others arrived', npc: 'babaTomor' },
    { id: 'abazAliu', name: 'Abaz Aliu', note: 'the Bektashi martyr of Karbala, given a second grave on Tomorr\'s peak; said to return each August on his white horse', npc: 'abazAliu' },
    { id: 'dervishIljazi', name: 'Dervish Iljazi', note: 'the dervish who rebuilt the burned lodge as the Kulmak tekke, 1915-1916', npc: 'dervishIljazi' },
    { id: 'pelegrinet', name: 'pelegrinët', note: 'the thousands of every faith who climb each August 20-25 — and, the legend holds, since Antiquity', npc: 'pelegrinetTomorrit' },
  ],
  // anchor = the game location this tale place inhabits, under THE SHARING
  // RULE (see _SCHEMA.md). This is SOUTH-CENTRAL — the same massif as
  // tomor-shpirag and three-friends' own mountain.
  places: [
    { id: 'slope', emoji: '⛰️', name: "Baba Tomor's own ground", note: 'the mountain\'s base, where the old sky-father already lives',
      anchor: { status: 'existing', node: 'tomor1', mirror: "Mount Tomorr's peak above Berat, the region's holiest mountain",
        mold: 'the same old sky-father\'s own ground tomor-shpirag already stages — this tale never contradicts him, only shows the dervishes calling the same mountain holy under a different name',
        sharedWith: ['tomor-shpirag', 'the main quest\'s Tomorr arc'] } },
    { id: 'peak', emoji: '🕌', name: "Abaz Aliu's tomb and the Kulmak tekke", note: 'the southern summit, 2,417m, where the tekke and the empty tomb stand',
      anchor: { status: 'proposed', node: 'maja', mirror: 'the real Kulmak tekke and Abbas Ali türbe on Tomorr\'s southern peak',
        mold: 'the SAME summit the main quest already gives an old man saying "in summer people climb here and eat a kurban" (content.js, node maja) — this tale explains whose feast that now is without changing a word of the existing scene; nothing here is the Sky-realm\'s separate Zojz summit (qiell2), which sits in its own region',
        proposal: 'add the small round stone tekke and Abaz Aliu\'s türbe to the existing peak scene' } },
    { id: 'lindja', emoji: '🏜️', name: 'the distant east', note: "Arabia and Karbala, where Abaz Aliu lived and died — seven centuries before Tomorr ever hears his name",
      anchor: { status: 'offstage', mirror: 'Karbala, in today\'s Iraq, and the wider Islamic world of the 7th century',
        mold: 'a real, distant place the tale only ever describes, never stages — like skanderbeg-legjenda\'s own offstage Ottoman empire' } },
    { id: 'skrapar', emoji: '🐾', name: 'the villages of Skrapar', note: "the district around Tomorr where Abaz Aliu's own footprints are shown in the rock, one of them his hand's",
      anchor: { status: 'offstage', mirror: 'the real villages of Bargullas, Novaj, Kajcë, Rodhes and Taronin in the Skrapar district around Tomorr',
        mold: 'scattered stones across the district, never staged individually — a detail the legend keeps but the map does not draw, exactly like tomor-shpirag\'s own Sinja hoofprint' } },
    { id: 'crossroads', emoji: '🪧', name: 'the seven-way crossroads', note: 'where every pilgrim\'s road converges before the last climb',
      anchor: { status: 'existing', node: 'udhekryq', mirror: 'the parting of the ways every Albanian road-tale needs',
        mold: 'THE crossroads every region is reached through; pilgrims from every province and every era pass here on their way up — roads accumulate stories, they never clash',
        sharedWith: ['the whole travel spine'] } },
  ],
  items: [
    { id: 'kurbani', emoji: '🐑', name: 'the votive lamb', note: 'carried up by the pilgrims themselves, slaughtered and shared out at the tekke' },
    { id: 'gjurma', emoji: '👣', name: "the saint's footprints", note: "five stones across Skrapar, each shown as a footprint of Abaz Aliu himself — a hand's print at Bargullas among them" },
  ],
  // how the game stages this tale — the WITNESS projection (see _SCHEMA.md). Not a
  // hero-narrative but the living DEVOTIONAL LORE of the sacred mountain, EXPERIENCED
  // by climbing the shared main-quest Tomorr slopes (tomor1 → the summit maja, where
  // Baba Tomor arms wandering heroes and the eagles keep the peak). No embodiment (you
  // cannot be a saint or the mountain) and no become — these are shared hubs; the
  // pilgrimage is surfaced through them and the area-tomorr achievement.
  play: {
    entry: 'antiquity',
    stance: 'witness',
    role:
      'Mount Tomorr has been holy since before memory — sworn by above Bible or Qur\'an, crowned by the empty tomb of Abaz Ali, the martyr of Karbala whose Bektashi tekke fills each 20–25 August with thousands of pilgrims of every faith, who share the kurban and read the saint\'s footprints across Skrapar. You climb the sacred mountain the dervishes call the very ribcage of God.',
    from: 'tomor1',
    scenes: {
      tomor1: 'antiquity',
      maja: 'tomb',
      majaEagle: 'pilgrims',
      tomorBekim: 'teaching',
    },
    divergences: [
      { note: 'The game\'s WITNESS stance on living devotional lore rather than a folktale: no saint or mountain to embody, so the pilgrimage is experienced by CLIMBING the shared Tomorr slopes (the same tomor1/maja/majaEagle/tomorBekim where Baba Tomor of the deep-myth tomor-shpirag legend arms wandering heroes) and is surfaced through the area-tomorr achievement. No become — the mountain is open world you pass through freely.' },
      { beat: 'karbala', note: 'The history proper — Abaz Ali, martyr of Karbala (648 AH); the fifteenth-century Haxhi Baba and the empty tomb; the tekke burned by armed bands and rebuilt by Dervish Iljazi as the Kulmak tekke in 1915–16; Naim Frashëri\'s verse "Abaz Aliu took Tomorr for his own" — is kept in the tale record and the Folklore tab, not staged as playable scenes.' },
      { beat: 'footprints', note: "The saint's five footprints across Skrapar (Bargullas, Novaj, Kajcë near Prishtë, Rodhes, Çepan's mountain at Taronin) and the dervishes' teaching (this peak is God's own ribcage; Abaz Ali was mercy's dervish) live in the record; the game keeps Baba Tomor and his four eagles as the peak's staged, standing presence, the mountain-figure this devotion crowns." },
    ],
  },
  beats: [
    {
      id: 'antiquity', title: 'Since Antiquity',
      note: 'The oath and the belief outgrow any one faith: peasants of both religions already swear "për Baba Tomor," and the poets read the peak as Dodona\'s own oldest shrine, carried south to the Illyrians\' holy ground.',
      lines: [
        ['1.1', "The vow itself belongs to no single faith: across the whole country, believers of both religions swear «Për Baba Tomor» — by Father Tomor.", "...Në të gjithë vendin tek njerëzit e të dyja besimeve është përhapur beja «Për Baba Tomor»."],
        ['1.2', 'And just as widely held is the belief that this peak has been a place of worship since Antiquity itself.', "Siç është i përhapur edhe mendimi, se këtu ka qënë vend kulti që nga Lashtësia."],
        ['1.3', 'The poet Naim Frashëri turned that very thought into verse, in a poem about his country\'s history: as Herodotus tells it, in ages past, God once kept a house on Tomor.', "Poeti ynë i madh Naim bej Frashëri, në një poezi që e trajton historinë e vendit i ka dhënë një formulim poetik këtij mendimi: «Thotë Herodoti / Qe një kohë/ Kish në Tomor/ Shtëpi Zoti»."],
        ['1.4', 'The poet reasoned that famous Dodona, which once stood at the foot of a mountain itself called Tomaros or Tamaros, had — in its own way — stood on this very peak as well.', "Poeti mendon se Dodona e famshme që banohej rrëzë një mali që quhej gjithashtu Tomaros apo Tamaros, ka qëndruar edhe në majën tonë."],
        ['1.5', 'And indeed, wrote Eqerem bej Vlora, so majestic a summit might have been shaped for no purpose but holiness.', "Dhe vërtet kjo majë madhështore sikur është krijuar enkas për shënjtëri."],
      ],
      cast: {
        babaTomor: ['slope', 'the old god the peasants already swear by — the mountain\'s oldest name'],
        abazAliu: ['lindja', 'not yet born, far off in Arabia — his own martyrdom seven centuries still to come'],
        dervishIljazi: ['skrapar', 'not yet born — the tekke he will one day rebuild does not exist for a thousand years yet'],
        pelegrinet: ['crossroads', 'climb this mountain in some form every era, long before either later faith puts a date on it'],
      },
    },
    {
      id: 'karbala', title: 'A martyr of Karbala',
      note: 'Long before he ever touches Albanian soil, Abaz Aliu lives and dies seven centuries earlier and a continent away — Imam Ali\'s own son, cut down at thirty-five carrying water to a besieged camp.',
      lines: [
        ['2.1', 'In the year 648, on the fourth of October, Abaz Ali came into a family already devoted to knowledge and learning.', "Abaz Aliu lindi në 4 tetor të vitit 648 dhe u rrit në një familje, që ishte vatër e dijes dhe shkencës."],
        ['2.2', 'His own teachers were three: Imam Ali, Imam Hasan, and Imam Hysejn.', "Ai mori dije nga Imam Aliu(a.s.), Imam Hasani(a.s.) dhe Imam Hysejni(a.s.)."],
        ['2.3', 'To believers he stands for justice itself — Allah\'s own divine purity, given to all mankind.', "Abaz Aliu përfaqeson drejtësinë, pastërtinë hyjnore të Allahut për të gjithë njerëzimin."],
        ['2.4', 'His life\'s deeds were themselves a war on evil: on wickedness and deceit, on Yazid, on Muawiyah, on Sufyan, on the Devil himself.', "Vepra e Tij dëshmoi luftën ndaj së keqes, së ligës, mashtrimit, Jezidit, Mavijes, Sufjanit e Djallit."],
        ['2.5', 'Karbala\'s martyrs left the future one gift: hope, and hope\'s own boundless possibility.', "Dëshmorët e Qerbelasë dhanë shpresë për të ardhmen dhe mundësitë e pakufishme të shpresës."],
        ['2.6', 'That, in the end, was their gift and his own: dead at Karbala at just thirty-five, a martyr like the rest.', "Ky ishte mesazhi i tyre dhe i Abaz Aliut, i cili ra dëshmor në moshën 35 vjeçare, në betejën e Qerbelasë."],
      ],
      cast: {
        abazAliu: ['lindja', 'born, raised, taught by the three Imams — and martyred at Karbala at thirty-five, his own story finished before Tomorr ever hears his name'],
      },
    },
    {
      id: 'tomb', title: 'The empty tomb on the peak',
      note: 'Centuries later, a monk from Haji Bektash\'s own house in Turkey carries Abaz Aliu\'s name up Tomorr and gives the mountain a second grave, for a man buried, in truth, at Karbala.',
      lines: [
        ['3.1', 'In the fifteenth century a monk — a Haxhi Baba — came to Mount Tomorr from Haji Bektash\'s own tekke in Turkey and raised Abaz Aliu a symbolic, empty tomb at 2,417 metres — the height where his shrine still stands today.', "Në shek. XV erdhi në malin e Tomorrit Haxhi Babai, nga Teqeja e Haxhi Bektashit (Turqi), që ngriti varrin kenotaf, simbolik, të Abaz Aliut në lartësinë 2417 m dhe ku më pas u ngrit mekali i tij."],
      ],
      cast: {
        abazAliu: ['peak', 'given a second grave here, centuries after the first — no bones, only the mountain\'s own promise'],
      },
    },
    {
      id: 'poem', title: '"Abaz Ali took Tomorr for his own"',
      note: 'Four centuries later, Albania\'s own national poets put the same claim into verse for the Rilindja — mountain and martyr now one name in the country\'s songs.',
      lines: [
        ['4.1', "Naim Frashëri set it in verse: Abaz Aliu claimed the mountain as his own, drew near to dwell beside us, and Albania's old poverty lifted — because the Lord had grown to love her.", "Abaz Aliu zu Tomorrë, / Erdhi afër nesh, / Shqipëria s'mbet e gjorë, / Se Zoti e desh..."],
      ],
      cast: {
        abazAliu: ['peak', 'now the subject of the nation\'s own poets, not only the dervishes\''],
      },
    },
    {
      id: 'tekke', title: 'The tekke burns, and rises again',
      note: 'Tomorr becomes the whole nation\'s symbol in the Rilindja years; the mountain\'s first lodge is burned by Greek irregulars in 1914, and Dervish Iljazi rebuilds it two years later as the Kulmak tekke.',
      lines: [
        ['5.1', "During Albania's own national awakening, Tomorr grew into a symbol of the Albanians' unity and brotherhood.", "Gjatë Rilindjes Kombëtare, Tomorri u bë simbol i bashkimit dhe vëllazërimit të shqiptarëve."],
        ['5.2', 'A dervish lodge had stood on the mountain since 1908 or 1909, until Greek armed bands burned it down in 1914.', "Në vitin 1908 - 1909 ka patur një Dervishije, e cila u dogj nga andartët grekë më 1914."],
        ['5.3', 'Dervish Iljazi rebuilt it as the new Kulmak tekke, over 1915 and 1916.', "Teqenë e re të Kulmakut e ringriti në vitet 1915 - 1916 Dervish Iliazi."],
      ],
      cast: {
        dervishIljazi: ['peak', 'rebuilds the burned lodge as the new Kulmak tekke, 1915-1916'],
      },
    },
    {
      id: 'pilgrims', title: 'Thousands each August',
      note: 'Every year, from the 20th to the 25th of August, the tekke Dervish Iljazi rebuilt fills with pilgrims from every corner of the Albanian world and beyond.',
      lines: [
        ['6.1', 'The mountain fills with pilgrims each twentieth to twenty-fifth of August — a crowd thousands strong, gathered from Albania and Kosovo, Macedonia, Italy and Greece, and even as far off as the United States.', "Në datat 20 deri 25 gusht të çdo viti në malin e Tomorrit vijnë mijëra pelegrinë nga Shqipëria, Kosova, Maqedonia, Italia, Greqia e deri nga SHBA."],
      ],
      cast: {
        pelegrinet: ['peak', 'arrive by the thousand, the twentieth to the twenty-fifth of every August'],
      },
    },
    {
      id: 'teaching', title: 'What the dervishes teach',
      note: 'Two teachings a pilgrim hears at the tekke: the mountain itself as God\'s own chest, and Abaz Aliu as mercy\'s own door.',
      lines: [
        ['7.1', "An elder taught that this mountain is itself God's own ribcage: to pray here is to step inside it, sheltered under His hand, sure at last the truth is real, the old thirst of love quenched, the peak's own spring wind drawn deep into your spirit.", "Këtu, në këtë mal, në kraharorin e Zotit njeriu, duke u lutur, mbrojtje merr prej Tij, ndjen dhe beson të vërtetën, shuan etjen e dashurisë, merr flladin pranveror në shpirt."],
        ['7.2', "All his life, the order's own living head has said of him, Abaz Ali was mercy's own door, help to whoever needed it.", "Ai gjatë gjithë jetës së Tij ishte dera e mëshirës dhe ndihma e nevojtarëve."],
        ['7.3', "Tenderness looked out through his eyes, they say — and anyone with business to settle with his brother Hysejn first had to travel the road that ran through Abaz Aliu.", "Sytë e Tij ishin të ëmbël e të dashur dhe madje, edhe nëse dikush kishte ndonjë punë me Hesejnin(a.s.), duhej të kalonte nga rruga e Abaz Aliut(a.s.)."],
      ],
      cast: {
        abazAliu: ['peak', 'the subject of every teaching the pilgrims hear at the tekke'],
      },
    },
    {
      id: 'kurban', title: 'The shared kurban',
      note: 'The feast is not prayer alone: pilgrims bring their own lambs, and the mountain\'s central rite is meat shared out among everyone who climbed.',
      lines: [
        ['8.1', "The festival — known too as Abaz Ali's own feast on Mount Tomorr — comes wrapped in the slaughter of the kurbans the pilgrims themselves carry up, and in every kind of festivity besides.", "Festa që njihet edhe si festa e Abaz Aliut në Malin e Tomorit shoqërohet me therjen e kurbaneve, që i sjellin besimtarët dhe me aktivitete të ndryshme artistike."],
      ],
      cast: {
        pelegrinet: ['peak', 'bring their own lambs up the mountain to be slaughtered and shared'],
      },
      items: { kurbani: ['pelegrinet', 'carried up by the pilgrims themselves, to be shared at the tekke'] },
    },
    {
      id: 'footprints', title: 'Footprints across Skrapar',
      note: 'Belief does not stop at the peak: across the villages of Skrapar, five separate stones are shown as Abaz Aliu\'s own footprints — one of them his hand\'s — the saint\'s road written into the whole district, not the mountain alone.',
      lines: [
        ['9.1', "The footprints of Abaz Ali, they say, are scattered the whole district over:", "Gjurmët e Abaz Aliut:"],
        ['9.2', "near Bargullas, a hand's own print, sunk into the rock.", "Gjurma e Abaz Aliut (dora në shkëmb) afër Bargullasit, Skrapar."],
        ['9.3', "at Novaj's own stone slab, another.", "Gjurma e Abaz Aliut në Dërrasën e Novajt, Skrapar."],
        ['9.4', 'at Kajcë\'s slab, near Prishtë, a third.', "Gjurma e Abaz Aliut, Dërrasa e Kajcës, afër Prishtës, Skrapar."],
        ['9.5', 'at Rodhes, a fourth.', "Gjurma e Abaz Aliut, Rodhes, Skrapar."],
        ['9.6', "and on Çepan's own mountain, at Taronin, a fifth — the saint's road laid across the whole district in stone.", "Gjurma e Abaz Aliut, Taroninë, mali i Çepanit, Skrapar."],
      ],
      cast: {
        abazAliu: ['skrapar', 'remembered, in belief, by five separate stones across the district — not the peak alone'],
      },
      items: { gjurma: ['skrapar', "five stones scattered across the district, each shown as the saint's own footprint — not his horse's, which belongs to the separate returning-pilgrim legend"] },
    },
  ],
}
