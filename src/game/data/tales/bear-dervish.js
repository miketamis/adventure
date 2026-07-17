// ===========================================================================
// TALE: The Bear and the Dervish — see ../tales/_SCHEMA.md for the format
// contract. This file is owned by its tale: agents editing other tales must
// not touch it.
// ===========================================================================

export default {
  id: 'bear-dervish',
  title: 'The Bear and the Dervish',
  source:
    'Auguste Dozon, Manuel de la langue chkipe ou albanaise (Paris 1879), repr. Folklor shqiptar 1, Proza popullore (Tirana 1963) · read in R. Elsie\'s translation; all lines paraphrased',
  // where the tale comes from — anchors should prefer this region's mirrors
  origin: { region: 'South Albania (Tosk)', collector: 'Auguste Dozon, French consul at Janina', published: 'Paris, 1879' },
  // the ALBANIAN ORIGINAL: every beat line's third element is the verbatim
  // Albanian for that ¶.sentence (transliterated from Dozon's French-based
  // transcription; raw OCR text in `local`).
  albanian: {
    title: '«Ariu edhe dervishi» (Dozon prints only the French title, «L\'ours et le derviche»)',
    source:
      'Dozon 1879, chrestomathie III, pp. 25–28 — his pre-standard French-based transcription transliterated here to modern orthography (œ→ë, ou→u, u→y, y→j, gy→gj, ky→q, ç→sh, tç→ç, lh→ll, rh→rr, ts→c, dj→xh), light OCR repair noted in the reference file',
    local: 'docs/references/dozon-ariu-edhe-dervishi.sq.txt',
  },
  // where Elsie's translation and Dozon's Albanian disagree — the rewrite
  // should decide per case which reading our world tells
  discrepancies: [
    'VËLLAMË (¶1.10): the Albanian is «u bënë vëllamë këta të dy» — the two swore BLOOD-BROTHERHOOD, not Elsie\'s "decided to make friends"; the midnight axe is thus oath-treachery, and the beats follow the Albanian.',
    'THREE PAILS, NOT PIECES (¶1.6): Elsie\'s "three pieces of goat\'s cheese" is «tre shekuj me gjizë» — three milking-PAILS of curd (Dozon\'s own vocabulary: «çékye, seau à traire»); and the crushing trick palms a «top gjizë» from a «torbë» (a bag), not Elsie\'s basket.',
    'THE SPRING EXCUSE (¶3.9): Elsie adds "because it fills up so slowly"; the Albanian has only «mejtonem që ngre gurrën\' me gjithë shkëmb, po s\'e siell dot mirë» — he ponders carrying spring-and-cliff whole but "it doesn\'t carry well". The beats follow the Albanian.',
    'SO MANY SHEEP (¶4.3): Elsie\'s "a huge mutton" is the plural boast «hëngra kaqë dhën» — "I ate that many SHEEP" — with the teller\'s wink Elsie drops: «(pa le të mos të kish ngrënë as një)», though he had eaten not one.',
    'THE THIEVES\' PLEA (¶10.4): the Albanian adds «po zgjidh-na që të vemi t\'a zëmë gjëkunt» — "untie us and we\'ll go catch him somewhere" — which Elsie omits; it is WHY the thieves march in the priest\'s posse. The beats keep it.',
    'THE END IN THE CAULDRON (¶6.8): Elsie has the bear "boiled to death"; the Albanian gives the mechanics — «i ep dervishi një të shtytur, edhe kështu u doq brënda në kazan» — one shove, and he scalded in the cauldron (the game\'s own staging, arusheFund, says «arusha vdes» outright).',
  ],
  // sentence counts of the original's 10 paragraphs (Elsie's translation)
  paragraphs: [10, 13, 21, 5, 9, 8, 8, 13, 4, 8],
  cast: [
    { id: 'dervish', name: 'the dervish', note: 'a weak little holy wanderer — every deed of his a bluff', npc: 'dervishi' },
    { id: 'bear', name: 'the bear', note: 'the sheep-thief of the wood: strong, credulous, and treacherous', npc: 'arusha' },
    { id: 'shepherd', name: 'the shepherd', note: 'keeper of the robbed flock; pays in gjizë, milk and one kid', npc: 'bari' },
    { id: 'bearMother', name: 'the bear\'s mother', note: 'keeps the den-house; whets the axe without a question', npc: 'nenaAriut' },
    { id: 'bearSister', name: 'the bear\'s sister', note: 'overhears the axe order and warns the guest', npc: 'motraAriut' },
    { id: 'wolf', name: 'the wolf', note: 'ate the kid; sold to the priest as a shepherd in a pair of trousers', npc: 'ujkuGrykes' },
    { id: 'priest', name: 'the priest', note: 'came out of Sunday service and bought a wolf', npc: 'prifti' },
    { id: 'thieves', name: 'the thieves', note: 'could not divide their loot, so the dervish divided it for them', npc: 'hajdutet' },
    { id: 'villagers', name: 'the village', note: 'the dervish\'s neighbours, who come when he calls', npc: 'fshataretDervishit' },
  ],
  // anchor = the game location this tale place inhabits, under THE SHARING
  // RULE (see _SCHEMA.md). This tale is special: the game ALREADY STAGES it —
  // the arushe vignette (arushe1…arusheFund) off the forest edge (pylli1) IS
  // "the dervish and the bear", so the core anchors are the staging's own nodes.
  places: [
    { id: 'kopeja', emoji: '🐑', name: 'the flock at the pasture', note: 'the shepherd\'s grazing ground the bear robs daily',
      anchor: { status: 'existing', node: 'bariu', mirror: 'a Tosk village\'s grazing commons under the wood',
        mold: 'ONE pasture, ONE shepherd, one mixed flock (the game scene grazes goats, the tale robs its sheep — dhen e dhi under one bari); the guard-the-flock wage lives here, and a flock once thinned five-six head a day by a bear is exactly a flock that pays for guarding',
        sharedWith: ['the bariu/punaBariu wage vignette'] } },
    { id: 'buzaPyllit', emoji: '🧀', name: 'the bet ground at the wood\'s edge', note: 'where the dervish steps into the bear\'s sheep-road',
      anchor: { status: 'existing', node: 'arushe1', mirror: 'the forest edge above the pasture — bear country beginning where the grazing ends',
        mold: 'THE game staging of this very tale: a dervish and a bear sit here mid-bet (arushe1), and the cheese-squeeze scene (arushe2, «dervish shtrydh një djathë. ujë del.») plays the stone-bluff — the staging squeezes water where Dozon crushes three balls «si miell»; same bluff, wetter telling',
        sharedWith: ['the arushe vignette (arushe1…arusheFund)'] } },
    { id: 'lisat', emoji: '🌳', name: 'the stand of tied lisa', note: 'the woodcutting ground — and the ox-roast camp by its trunks',
      anchor: { status: 'existing', node: 'arushePeme', mirror: 'a working oak-wood above a southern pasture',
        mold: 'the tree-bluff\'s own staging: the game compresses the rope-round-all-the-lisat into the lift-a-forest boast («arushë ngre një pemë. dervish thotë: unë ngre një pyll!»); the roasting fire and the spit sit by these trunks',
        sharedWith: ['the arushe vignette (arushePeme)'] } },
    { id: 'gurra', emoji: '⛲', name: 'the gurrë under the cliff', note: 'the spring at the shkëmb\'s foot — goatskin bluff and homeward wrestle',
      anchor: { status: 'proposed', node: 'arushePeme', mirror: 'a cliff-foot gurrë — every Tosk pasture wood keeps one',
        mold: 'the watering place of the wood\'s edge: whoever camps at the lisat fetches water here, and the path between them carries the wrestle',
        conflicts: 'NOT kroi1 — the village spring belongs to the water-carrier\'s daily round, and the tale needs wild water under a cliff, an hour\'s sulk from the camp. NOT uji — that watched spring is the world below\'s trial of love\'s road, another register entirely',
        proposal: 'draw the gurrë under a shkëmb a step past the tied-lisat stand (nearest spot today: arushePeme); the goatskin bluff and the wrestle play on its path' } },
    { id: 'shtepiaAriut', emoji: '🐻', name: 'the bear\'s den-house', note: 'mother, sister, sufra, axe — and the cauldron',
      anchor: { status: 'existing', node: 'arusheNate', mirror: 'the housed beast-den of the animal tales — a hearth kept by she-bears',
        mold: 'the bear\'s house as the game already stages it: the night of blood («natën arushë do gjak. arushë godit këtu.») and the great milk-cauldron stand in one place (arusheNate), and the boiling end plays next door (arusheFund)',
        sharedWith: ['the arushe vignette (arusheNate/arusheFund)'] } },
    { id: 'gryka', emoji: '🐺', name: 'the wolves\' defile', note: 'the den-gorge where night catches the dervish and his kid',
      anchor: { status: 'proposed', node: 'pylliThelle', mirror: 'a rocky grykë of the deep wood where wolves den',
        mold: 'a den-gorge in the deep forest: wolves nest here and take what the night brings — compatible with the deep forest hosting a hungry prowler (creation-wolf\'s mold names no wolf; dens don\'t clash with prowlers)',
        conflicts: 'NOT the shokuUjk wolf-meeting itself — that arc\'s wolf comes OUT to a traveller\'s fire; this is the hole such a wolf comes from, and whether the two are one beast no tale has settled',
        proposal: 'draw the rocky defile with a den-mouth off the deep forest (nearest spot today: pylliThelle); the kid-theft night and the trousers trap play at its mouth' } },
    { id: 'kisha', emoji: '⛪', name: 'the church above the village', note: 'Sunday service, the priest at the door, his pen behind',
      anchor: { status: 'existing', node: 'kisha1', mirror: 'the hilltop parish church above a village\'s lanes',
        mold: 'the game\'s own church: it keeps its Sunday service and its blessing-priest at the door («një prift rri te derë. prifti jep një bekim.»), with a pen of dhen behind the parish house; Kostandini\'s stone and the graves keep their own legends beside it — a duped priest and a kept besa never touch',
        conflicts: 'the teqe next door is NOT the dervish\'s home — the priest must meet a stranger («e she prifti këtë të huaj»), and a teqe-mate across the yard would be no stranger; the dervish dens at the wood\'s edge, below the parish\'s daily sight' } },
    { id: 'udha', emoji: '🛤️', name: 'the open road', note: 'the roads between — the thieves\' lis-trunk, the priest\'s manhunt',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of the village at the tanners\' bridge',
        mold: 'the open road hosts every traveller and every setting-out — the thieves\' quarrel, the tying at the roadside lis and the rifle-hunt are passages; roads accumulate stories, they never clash',
        sharedWith: ['three-friends.road', 'the whole travel spine'] } },
    { id: 'shtepiaDervishit', emoji: '🏡', name: 'the dervish\'s hut', note: 'his door at the wood\'s edge — the finale\'s siege and rescue',
      anchor: { status: 'proposed', node: 'arushe1', mirror: 'a hermit-dervish\'s hut outside a Tosk village — the holy man of the margins',
        mold: 'the wood\'s-edge hut of the village\'s own holy trickster: the parish up the hill barely knows him, the lanes below owe him the bear — so when he cries out, the village comes to HIS door',
        conflicts: 'NOT the teqe by the church — see the kisha anchor: the tale needs the priest meeting a stranger, and the finale needs the crowd running OUT of the village to him',
        proposal: 'draw the dervish\'s hut beside his own staging at the wood\'s edge (nearest spot today: arushe1); the posse\'s descent and the village rescue play at its door' } },
    { id: 'fshati', emoji: '🏘️', name: 'the village', note: 'the lanes and square the cry empties',
      anchor: { status: 'existing', node: 'fshatiSheshi', mirror: 'the village square — the crowd every tale borrows',
        mold: 'the square hosts the village\'s comings and goings, and tales share it without clashing; when the wood\'s dervish cries out, it empties toward the forest edge',
        sharedWith: ['bee-spider-cicada.grass', 'the village-life quarter'] } },
  ],
  items: [
    { id: 'gjiza', emoji: '🧀', name: 'the three pails of gjizë', note: 'the dervish\'s whole fee in advance — and his "stone"' },
    { id: 'lekura', emoji: '💧', name: 'the goatskin bag', note: 'water-skin at the gurrë, milk-skin at the end' },
    { id: 'sepata', emoji: '🪓', name: 'the den-house axe', note: 'whetted for a guest; felt as a fleabite' },
    { id: 'kazani', emoji: '🍲', name: 'the milk cauldron', note: 'the strength-bath the bear begged for' },
    { id: 'keci', emoji: '🐐', name: 'the kid goat', note: 'the only wages the dervish would name' },
    { id: 'breket', emoji: '👖', name: 'the dervish\'s trousers', note: 'wolf-trap, wolf-bundle, and the goods sold' },
    { id: 'hiset', emoji: '🪙', name: 'the thieves\' shares', note: 'stolen money, divided into one pocket' },
  ],
  // how the game stages this tale — the COMPANION projection (see _SCHEMA.md). You
  // fall in with the little dervish who cannot beat the bear by strength, and your
  // choice is to back his CUNNING (crush a "stone" that runs like water, shrug his
  // blows off as fleabites, coax him into a milk-cauldron) or take the bear head-on
  // by force and be lost. No mold-lock — a loose forest vignette you can walk out of.
  play: {
    entry: 'cheese',
    stance: 'companion',
    with: 'dervish',
    role:
      'You fall in with a little dervish who can never beat the bear of these woods by strength — so he beats it by wit: he crushes a white cheese in his fist and swears it a stone he wrung the water from, shrugs off the beast\'s mightiest cuffs as mere fleabites, and at the last coaxes it into a cauldron and boils it in milk. Back his cunning, or take the bear head-on and be lost. In the mountains the cunning man outlives the strong.',
    from: 'arushe1',
    ending: 'arusheFund',
    scenes: {
      arushe1: 'lion',
      arushe2: 'cheese',
      arusheFund: 'cauldron',
    },
    divergences: [
      { beat: 'cheese', note: 'You travel as the dervish\'s companion, and the choice is cunning vs force: back his tricks (squeeze the "stone" that runs like water, the fleabite shrug, the milk-cauldron) and the cunning man wins, or fight the bear yourself and be lost (humbur). No become / mold-lock — this is a loose forest vignette, not a bound arc.' },
      { beat: 'trees', note: 'The tall-tale boasts the dervish bluffs the bear with — an ox is beneath me, I could throw all the trees at once, I\'d carry off the whole spring, cliff and all, which way shall I throw YOU — are compressed to the signature cheese-squeeze and the milk-cauldron that finish the beast.' },
      { beat: 'shares', note: 'The comic coda (the bear\'s wages of one kid, the "shepherd sold in a pair of trousers", the thieves\' loot divided into one pocket, and the village thrashing that answers) is kept in the tale record, not staged — the game ends on the cunning kill, "the cunning man outlives the strong."' },
    ],
  },
  beats: [
    {
      id: 'flock', title: 'Five or six a day',
      note: 'A bear thins a shepherd\'s flock day after day. A passing dervish hears the trouble and names his whole fee in advance: nothing till the beast is dead — only three pails of gjizë.',
      lines: [
        ['1.1', 'There is a shepherd with a flock of sheep.', "Qe një çoban që kish një kope me dhën;"],
        ['1.2', 'A bear has taken against him: day in, day out it comes and lifts five or six head.', "ky kish ndezur me një ari që i vinte dita nga dit' edhe i merrte nga pesë nga gjashtë dhën."],
        ['1.3', 'One day a dervish passes the flock.', "Një dit' na shkon një dervish nga ajo kope;"],
        ['1.4', 'The shepherd greets him and pours out the trouble: the bear comes daily, there is no remedy.', "këtij (si u përshëndosh me çobanë) i thotë çobani që: «një ari s'na lë në hall tënë, po dita nga dit' na vjen edhe to na marrë, s'është çare, nga pesë nga gjashtë dhën»."],
        ['1.5', 'Faith for faith, says the dervish — I will kill him for you.', "Dervishi i thotë që: «fet për fet unë t'a vras,"],
        ['1.6', 'He will take nothing before the deed — nothing but three pails of gjizë.', "edhe gjë-kafshë pa vrarë s'dua, po veçme tre shekuj me gjizë»;"],
        ['1.7', 'The shepherd hands the pails over; and the bear, true to habit, comes down for his sheep.', "edhe çobani i dha shekujtë që kërkoi dervishi. Ariu pas zakonit që kish erdhi që të merrtej dhën."],
      ],
      cast: {
        dervish: ['kopeja', 'hears the shepherd\'s trouble; pockets his fee of curd'],
        shepherd: ['kopeja', 'counts his losses; pays three pails of gjizë in advance'],
        bear: ['buzaPyllit', 'on his usual sheep-road down from the wood'],
        bearMother: ['shtepiaAriut', 'keeps the den-house hearth (not yet met)'],
        bearSister: ['shtepiaAriut', 'about the den-house chores (not yet met)'],
        wolf: ['gryka', 'dens in the wolves\' defile (not yet met)'],
        priest: ['kisha', 'keeps his church and his pen of dhen (not yet met)'],
        thieves: ['udha', 'work the roads with stolen purses (not yet met)'],
        villagers: ['fshati', 'about the lanes and the square — the dervish\'s neighbours'],
      },
      items: { gjiza: ['dervish', 'three pails of curd, carried off in the torba'] },
    },
    {
      id: 'cheese', title: 'The stone that ran like flour',
      note: 'The dervish steps into the bear\'s path and proposes a trial of strength. Ball by palmed ball, he grinds "this very stone" to flour; the bear fails on a real white stone — and the two swear vëllamë.',
      lines: [
        ['1.8', 'The dervish steps out in front of the bear and opens a wrangle: which of the two is the stronger?', "Me të ardhur i del përpara ariut dervishi edhe si e poqi zuri të hahej me arinë, cili është m'i shëndoshë."],
        ['1.9', 'The bear names himself — so the dervish says he can grind him like this stone, and palming ball after ball of gjizë from his bag, crushes all three to flour.', "Ariu thoshtë veten' e tij më të shëndoshë. Dervishi gjene i thotë që: «unë të tret si edhe këtë gurin'», edhe atë çast nxori nga torb' e tij (me një tertip që mos t'a shinte ariu) një top gjizë, pastaj edhe tjetërin' edhe tjetërin' edhe që të tre i bëri si miell."],
        ['1.10', 'The amazed bear tries a real white stone, cannot crumble it — and the two swear themselves vëllamë.', "U çudit ariu shumë edhe mori dhe ai një gur të bardhë, po nuk' e bëri dot thërime si edhe dervishi. Ahere u bënë vëllamë këta të dy."],
      ],
      cast: {
        dervish: ['buzaPyllit', 'grinds "stones" to flour, three curd-balls at a time'],
        bear: ['buzaPyllit', 'fails on a true stone; swears brotherhood with the grinder'],
      },
      items: { gjiza: ['buzaPyllit', 'crushed ball by ball to flour — the "stone" that gave way'] },
    },
    {
      id: 'lion', title: 'An ox is beneath me',
      note: 'Hunger comes. Asked to fetch an ox, the dervish sniffs that nothing under a lion is worth his trouble — so the errands swap: the bear lugs home an ox, the dervish strolls to the wood.',
      lines: [
        ['2.1', 'After a while hunger takes the bear: let the dervish fetch some ox to eat while he goes to the wood to cut fuel.', "Pas një çikë e mori uria arinë edhe i thotë dervishit të merrte ndonjë ka të hanin' edhe ky të vinte në pyll të prite dru."],
        ['2.2', 'Go for your own ox, says the dervish — he does not stoop to oxen.', "Dervishi i thotë që: «hiq ti për ka, se unë s'e bën kabull të merr një ka,"],
        ['2.3', 'Nothing under a lion will do for him.', "se unë dua si ndonjë asllan»."],
        ['2.4', 'The trick spares him the ox-haul, and he saunters off for wood instead.', "Me këta tertipe shpëtoi dervishi nga zameti që to të hiqte me ka, edhe vate për dru."],
        ['2.5', 'The bear reaches a herd, snatches an ox and slings it over his shoulder.', "Ariu me të vatur më një ergele rrëmbeu një ka edhe e hodhi në krah'."],
      ],
      cast: {
        dervish: ['lisat', 'gone to the wood, the ox-errand dodged'],
        bear: ['lisat', 'back at camp with a whole ox across his shoulder'],
      },
    },
    {
      id: 'trees', title: 'All the trees at once',
      note: 'In the wood the dervish ropes every lis into one bundle, as if to tear the forest out at a single haul. The bear, come looking, rates him a thousand times the better man — and carries the two branches himself.',
      lines: [
        ['2.6', 'The dervish, reaching the wood, takes a cord and ties all the lisa together, playing at tearing them out in one haul.', "Po dervishi posaqë vate për dru, ç'bëri: merr një pe edhe lidh gjithë lisat' edhe bënej sikur donte t'i çkulte me një heresh (me një të hequr)."],
        ['2.7', 'The bear waits, gives up waiting, and comes into the wood to find him making ready — as if — to uproot the lot at once.', "Pret ariu dervishin', po më s'dukej. U ngrit e vate vetë në pyll edhe e gjen dervishin' që bënej hazër gjoja të çkultej me një herë lisat'."],
        ['2.8', 'The bear marvels to himself: this one turns out a thousand times my better.', "Çuditej ariu me vetë të tij edhe thoshtë që: ky qenka një mijë herë m'i mirë nga unë."],
        ['2.9-10', 'What do you want with a whole wood, he asks — take a couple of branches and come along.', "I thotë pastaj dervishit: «ç'do gjithë këto dru që ke niet t'i çkulç? merr nja dy dega edhe hajde»."],
        ['2.11-12', 'Two sticks are beneath my sort, says the dervish — take them yourself if you want them.', "Po ai i thotë që: «unë s'jam i tilli të marr dy dru, po në do merr ti»."],
        ['2.13', 'The bear snaps two branches off a lis at once, and back at camp they slaughter the ox.', "edhe atë çast çkuli ariu dy dega nga një lis, edhe kthenen' tek kishin' kanë, e zuri ariu edhe e preu kanë."],
      ],
      cast: {
        dervish: ['lisat', 'stands over his roped forest, too grand for two sticks'],
        bear: ['lisat', 'breaks the branches himself; slaughters the ox at camp'],
      },
    },
    {
      id: 'spring', title: 'The whole spring, cliff and all',
      note: 'The roast needs water. The dervish volunteers for the spring, fills the goatskin — and cannot lift it. When the bear comes after him, he is "pondering" whether to carry off the spring with its cliff, since only a bag would shame him.',
      lines: [
        ['3.1', 'Now the ox wants roasting.', "Po pastaj lipsej që t'a piqin'."],
        ['3.2', 'The dervish says he will go for water.', "I thotë ariut dervishi që: «unë të vete për ujë"],
        ['3.3', 'The bear should turn the meat — and mind not to tire himself.', "edhe ti dridh mishtë, që të mos të lodheç»."],
        ['3.4', 'He says it only because he could never turn so huge an ox on a spit.', "(i tha këtë, se s'munte të dridhte një ka kaqë të math),"],
        ['3.5', 'He takes a goatskin and goes to a spring — a gurrë at the foot of a cliff.', "merr një lëkurë edhe vate më një gurrë (ajo gurrë qe më një shkëmb),"],
        ['3.6', 'He fills it, tries to swing it to his shoulder, cannot hold it — and only steadies it so it will not burst.', "mbush lëkurën', po me të hedhur në krahë, nukë muntej t'a mbantej e lëshon lëkurën' nga krahatë edhe e mban sa të mos të çponej."],
        ['3.7', 'The bear waits an hour, a second — then sets off himself for the spring the dervish took.', "Priti ariu një sahat, të dytën', më së fundmi u nis vetë edhe vete në atë gurrën' kish vatur edhe dervishi."],
        ['3.8', 'Why so long delayed, he asks?', "Me të vatur i thotë: «pse u mbodhise kaqë shumë?»"],
        ['3.9', 'The dervish is pondering: he means to lift the spring with the whole cliff, but it does not carry well.', "Dervishi i thotë që: «mejtonem që ngre gurrën' me gjithë shkëmb, po s'e siell dot mirë,"],
        ['3.10', 'To come home with just a skin-bag would shame him — so let the bear carry it, if a bag is all it is to be.', "se të vinj vetëm me lëkurën' më vjen turp, po ngri-e ti makar lëkurën'»."],
        ['3.11', 'The bear swings the bag to his own shoulder, and the two set off.', "edhe ariu e heth në krahë edhe nisen' që të dy."],
      ],
      cast: {
        dervish: ['gurra', 'caught unable to lift the bag — mid-bluff about the cliff'],
        bear: ['gurra', 'shoulders the goatskin himself, shamed on the dervish\'s behalf'],
      },
      items: { lekura: ['bear', 'the full water-skin, on the bear\'s shoulder'] },
    },
    {
      id: 'wrestle', title: 'Which way shall I throw you?',
      note: 'On the walk back the bear wants a wrestle. One hug starts the dervish\'s eyes from his head — and asked what ails him, he is only deciding which throw would leave fewer pieces of bear. The bear begs off.',
      lines: [
        ['3.12', 'As they walk, the bear proposes a wrestle.', "Tek ecin' i thotë ariu dervishit: «hajde të zihemi»,"],
        ['3.13', 'Get away, says the dervish — you are no match for me.', "po dervishi i thotë që: «ikë këtej, se s'e ha dot me mua»,"],
        ['3.14', 'They grapple all the same.', "po më së fundi zihen'."],
        ['3.15', 'One squeeze of the bear\'s arms and the dervish\'s eyes start from his head.', "E shtrëngon ariu dervishinë një herë me kaqë fuqi sa i këcyen' sytë,"],
        ['3.16', 'The bear sees the face gone blood-red, the started eyes, and asks what is wrong.', "e she ariu dervishin' nga surati që qe i kuq posi gjak edhe syt' e tij i kishin' këcyer. E pyet e i thotë: «pse u bëre kështu?»"],
        ['3.17', 'Nothing, says the dervish — he only cannot decide what to do.', "I thotë dervishi që: «edhe unë s'di seç të bën,"],
        ['3.18', 'Thrown to this side, the bear would come apart in pieces.', "të të heth nga kjo anë, bënesh copëra,"],
        ['3.19', 'Thrown to the other — worse still.', "të të heth nga tjetëra ca më keq»."],
        ['3.20', 'Mercy, cries the bear then — let me go!', "I thotë ahere ariu: «aman, lërmë»,"],
        ['3.21', 'And the dervish lets him go.', "edhe e la."],
      ],
      cast: {
        dervish: ['gurra', 'released from the hug, gravely choosing which way NOT to throw a bear'],
        bear: ['gurra', 'begs off the wrestle he asked for; carries the water on'],
      },
    },
    {
      id: 'feast', title: 'Two bites and the axe',
      note: 'At the roast the dervish is full after two bites — he "ate that many sheep" fetching the water. The bear brings his guest home, and at his own door orders mother and sister to whet the axe: the friend is stronger than he, so the friend must die.',
      lines: [
        ['4.1', 'Soon they are back where the ox is, and they lay out and eat.', "Pas pak vanë tek kishin kanë edhe shtruan' e hanë."],
        ['4.2', 'Two bites and the dervish is full; the bear asks why he does not eat.', "Me të ngrënë dy kafshitë dervishi u ngop, e e pyet ariu që: «pse nukë ha?»"],
        ['4.3', 'No room now, he answers — he ate that many sheep going for the water (and had eaten not one).', "Përgjigjet që: «tani s'kam një çikë që hëngra kaqë dhën kur vajta për ujë» (pa le të mos të kish ngrënë as një)."],
        ['4.4', 'The meal done, the bear invites him home — friends as they now are — and takes him to his house.', "Si sosnë nga buka, i thotë dervishit ariu: «hajde të vemi në shtëpi time si miq që jemi», edhe e mori në shtëpi."],
        ['4.5', 'Once there he orders his mother and sister to whet the axe: he means to kill the friend he brought, to be rid of one stronger than himself.', "Me të vatur porositi ariu nënen' edhe motrën' që kish të mbrehinë sëpatën', se to të vrinte miknë që solli, që të shpëtonte nga ai që ishtej m'i shëndoshë nga vetë e tij,"],
      ],
      cast: {
        dervish: ['shtepiaAriut', 'guest of his vëllami — "full" on two bites'],
        bear: ['shtepiaAriut', 'orders the axe whetted for the guest under his roof'],
        bearMother: ['shtepiaAriut', 'set to whetting the axe, asking nothing'],
        bearSister: ['shtepiaAriut', 'set to whetting the axe — and hearing every word'],
      },
      items: { sepata: ['shtepiaAriut', 'being whetted for a sleeping guest'], lekura: ['shtepiaAriut', 'emptied at the roast, hung by the door'] },
    },
    {
      id: 'axe', title: 'A couple of fleas',
      note: 'The sister carries the warning. The dervish feigns bedding down and hides under a donkey\'s saddle; at midnight the bear sinks three or four axe-blows into the empty bed. At dawn the guest walks out: he slept very well — but for two fleas that stung at midnight.',
      lines: [
        ['5.1', 'The bear\'s sister, having heard it all, goes herself and tells the dervish so-and-so.', "edhe motr' e ariut me të dëgjuar vet' e i thotë dervishit kështu dhe kështu."],
        ['5.2', 'At dark the bear has the sufra laid; they eat their fill and lie down to sleep.', "Si u ngris porositi ariu e shtruanë sufrën' edhe si hëngrë mirë mirë ranë e flejtnë."],
        ['5.3', 'The dervish makes as if to go where his bed is laid — and slips instead under a donkey\'s pack-saddle.', "Dervishi bëri sikur vate atje ku kishin' shtruar, po ky vat' e u psheh në një samar t'një gomari që kishin'."],
        ['5.4', 'At midnight the bear rises, takes the axe, and deals the bed three or four blows.', "U ngrit ariu në mes të natës', edhe me të marrë sëpatën' i ep tri katër sëpata"],
        ['5.5', 'Sure he has cut the guest down, he goes back and lies down again.', "edhe pandehu se e preu edhe vate prap' e ra."],
        ['5.6', 'Before full light the bear is up and out for wood.', "Pa gdhirë mirë ngrihet' ariu edhe vate për dru."],
        ['5.7', 'Coming home, he sees the dervish step out of the house to meet him.', "Me të kthyer she dervishin' që i dolli përpara."],
        ['5.8', 'His eyes fly open, astonishment complete — he asks how the night passed.', "Posaqë e pa hapi sytë edhe u çudit me funt. E pyet qysh shkoi atë natë;"],
        ['5.9', 'Very well indeed, says the dervish — only some couple of fleas stung him about midnight.', "i thotë që: «fort mirë shkova, po veçme nja dy pleshta në mes të natës' më gjëmbuan'»."],
      ],
      cast: {
        dervish: ['shtepiaAriut', 'slept under the pack-saddle; reports two fleas'],
        bear: ['shtepiaAriut', 'axed an empty bed; stares at a living guest'],
        bearSister: ['shtepiaAriut', 'the warning delivered — watches it save a life'],
        bearMother: ['shtepiaAriut', 'keeps the hearth; the axe is back in its corner'],
      },
      items: { sepata: ['shtepiaAriut', 'three-four blows sunk into an empty bed'] },
    },
    {
      id: 'cauldron', title: 'Strength, while the milk boils',
      note: 'Axe-blows felt as fleabites break the bear: he confesses the night and begs to be made as strong. Easily done — a skin of milk. The flock\'s shepherd grieves to see him alive one more time; the cauldron boils; three dips and one shove end the tale\'s bear.',
      lines: [
        ['6.1', 'The bear marvels beyond bearing: his axe-strokes had passed for fleas.', "U çudit me vetë të tij shumë ariu, që sëpatat' i dukeshin' si pleshta,"],
        ['6.2', 'He can hold it no longer and confesses everything he did in the night.', "edhe më s'duroi po i tregon më së fundi ata që i bëri ariu atij natën' që shkoi,"],
        ['6.3', 'Then he begs the dervish to make him strong like himself.', "edhe i bën rixha dervishit që t'a bënte dhe atë të shëndoshë si veten'."],
        ['6.4', 'The easiest of matters, says the dervish — all he needs is a skinful of milk.', "Edhe dervishi i thotë që: «kjo punë është kollajçime, po veçme një lëkurë me qumësht të dua»."],
        ['6.5', 'The bear goes to the shepherd\'s flock — whose keeper is bitterly sorry to see him not yet dead.', "Niset ariu edhe vete nga kope e çobanit. Me të vatur atje u helmua shumë çobani që s'e kish ngordhur akoma."],
        ['6.6', 'He returns with the milk, and at the dervish\'s orders lights a fire and sets over it a cauldron filled with it.', "Kthenet' ariu nde dervishi me lëkurë me qumësht edhe pas porosisë dervishit ndezi zjarr edhe vuri përmbi zjarr një kazan mbushur me qumësht."],
        ['6.7', 'When the milk is at a hard boil: put your head in, says the dervish, and you will come out strong.', "Si zjeu qumështi mirë mirë, i thotë dervishi që: «vërë kokën' brënda që të shëndosheç»."],
        ['6.8', 'A first dip scalds him, a second, and at the third the dervish gives one shove — and the bear cooks in his own cauldron.', "E vuri herën' e parë kokën', po e dogji, e vuri dhe të dytën', po me të vënë dhe të tretën' i ep dervishi një të shtytur, edhe kështu u doq brënda në kazan."],
      ],
      cast: {
        bear: ['shtepiaAriut', '☠ shoved at the third dip — boiled in his own milk-cauldron'],
        dervish: ['shtepiaAriut', 'orders fire, milk and the dipping — and gives the shove'],
        shepherd: ['kopeja', 'grieves to see the bear still alive; yields the milk'],
        bearMother: ['shtepiaAriut', 'keeps the den-house as the cauldron boils'],
        bearSister: ['shtepiaAriut', 'keeps the den-house as the cauldron boils'],
      },
      items: {
        lekura: ['shtepiaAriut', 'carried back full of milk from the flock'],
        kazani: ['shtepiaAriut', 'boiling over the fire — then holding the bear'],
      },
      exit: ['bear'],
    },
    {
      id: 'kid', title: 'Wages of one kid',
      note: 'The dervish brings the shepherd his news and, offered anything, takes one kid goat. Night catches him in a wolves\' defile, a wolf gulps the kid — and the furious dervish hangs his own trousers over the den-mouth, bags the wolf, and walks on with the bundle.',
      lines: [
        ['7.1', 'Then the dervish returns to the shepherd and reports the bear killed.', "Pastaj kthenet' nde çobani dervishi e i tregon që e vrau arinë;"],
        ['7.2', 'The shepherd, at a loss how to honour him, asks him to name anything he wants.', "ahere çobani s'dinte seç t'i bënte (e s'dij se ku t'a vij), edhe i thotë ç'dojë."],
        ['7.3', 'The dervish takes nothing at all but one kid, and goes off from there with it.', "Po dervishi gjëkafshë tjetër s'i mori po veçme një kec, edhe shkon së andejsmi me gjithë kec,"],
        ['7.4', 'Night catches him in a wolves\' defile.', "edhe e zuri nata më një grykë ujku."],
        ['7.5', 'In the night, while the dervish sleeps, the wolf snatches the kid and eats it.', "Ujku natën', si flejti dervishi, i rrëmbeu kecin' edhe e ha."],
        ['7.6', 'In his fury the dervish pulls off his trousers and stops the mouth of the wolf\'s den with them.', "Dervishi nga inati zbath brekët' edhe zë vrimën' e shpellës' ujkut."],
        ['7.7-8', 'The wolf, coming out, is tied up in the trousers — and off the dervish goes, bundle and all.', "Me të dalë ujku e lidh në brekë edhe shkon me gjithë 'të."],
      ],
      cast: {
        dervish: ['gryka', 'kid-less, trouser-less, and carrying a bagged wolf'],
        shepherd: ['kopeja', 'pays the bear-slayer the one kid he named'],
        wolf: ['gryka', 'trussed in the trouser-bundle on the dervish\'s shoulder'],
      },
      items: {
        keci: ['gryka', '☠ snatched and swallowed by the wolf in the night'],
        breket: ['dervish', 'pulled off, hung over the den-mouth — now a wolf-bundle'],
      },
    },
    {
      id: 'sale', title: 'A shepherd in a pair of trousers',
      note: 'Sunday brings him to a village as church lets out. He has a shepherd to sell — a very good one, no wages beyond his food — here, in the trousers. The priest takes the bundle home; by morning not a sheep is left, and the priest slings a rifle.',
      lines: [
        ['8.1', 'He walks on and turns up at a village on a Sunday.', "Shkon edhe degdiset më një fshat ditën' e dielë."],
        ['8.2', 'As church empties, the priest spies the stranger and asks where from, and what for.', "Me të dalë kisha e she prifti këtë të huaj edhe e pyet nga erdhi edhe pse erdhi."],
        ['8.3', 'I have come, says he, to sell a shepherd.', "Ky i thotë që: «erdha për të shitur një çoban,"],
        ['8.4-6', 'A very good shepherd — who beyond his food asks for nothing at all.', "edhe ky çoban është shum' i mirë edhe veç hamjes' s'do gjëkafshë»."],
        ['8.7', 'And where do you keep this shepherd, asks the priest?', "Prifti e pyet: «ku e ke çobanë?»"],
        ['8.8', 'Right here in my trousers — and he hands the "shepherd" over; the priest takes him straight home.', "I thotë që: «e kam brënda në brekë», edhe e dha priftit (çobanë), edhe prifti me të parë e merr e e shpie në vënt të tij."],
        ['8.9', 'The dervish walks on out of that village, leaving the priest his shepherd.', "Ky dervishi shkon nga ai fshati edhe i la priftit çobanë."],
        ['8.10', 'Next morning the priest opens the shutters to see whether the new man has the sheep out to pasture.', "Të nesërmen' prifti hap kanatet' që të shinte çobanë e ri, se a i kish nxjerrë dhëntë për të kullosur,"],
        ['8.11', 'There is nothing to see: the shepherd, being the wolf he was, has left not one sheep.', "po me të hapur kanatet' nukë she gjëkafshë, se çobani si ujk që qe, s'kish lënë ndonjë dhën."],
        ['8.12', 'He goes out to the pen where the animals were kept — not a sheep there either.', "Vete n'atë vënt që kish bagëtinë, po nukë she as një dhën."],
        ['8.13', 'That instant he slings a rifle over his shoulder and sets out to find the dervish.', "Atë çast merr një dyfek në krahë edhe niset' të gjente dervishin'."],
      ],
      cast: {
        dervish: ['udha', 'gone from the village, the sale behind him'],
        priest: ['udha', 'rifle on shoulder, hunting the man who sold him a wolf'],
        wolf: ['kisha', 'ate the parish pen bare in one night — gone by first light'],
      },
      items: { breket: ['kisha', 'the emptied "shepherd"-bundle, left in the priest\'s yard'] },
    },
    {
      id: 'shares', title: 'Dividing the loot',
      note: 'On the road, thieves deadlocked over stolen money hand the split to the passing holy man. He dislikes squabbles: better to tie them all to the tree-trunk first — then share after share goes into one pocket, and he bolts.',
      lines: [
        ['9.1', 'Meanwhile, on the road, the dervish has come upon some thieves who cannot see how to divide the money they have stolen.', "Po dervishi në mes të udhësë na gjeti ca hajdutë që s'dinin' se qysh të ndanin' ca para që kishin' vjedhur."],
        ['9.2', 'At the sight of a dervish they hand him the coins — let the holy man divide.', "Me të parë dervishin' i apin' paratë që t'i ndante ai si dervishi që qe."],
        ['9.3', 'He wants no squabbling, he tells them — better he tie the lot of them to the foot of the lis first.', "Po dervishi u tha që: «unë s'dua sherr, po është më mirë që t'ju lidh juve që jini më një bythë lisi»."],
        ['9.4', 'Tied fast, they watch the first man\'s share go into his pocket, then the next, then every share of all of them — and off he bolts.', "Si i lidhi merr hisenë e njërit edhe e heth në xhep të tij, merr dhe hisenë tjetërit, dhe kështu si mori hisenë e gjithëve, e heth në xhep edhe kërcet."],
      ],
      cast: {
        dervish: ['udha', 'pockets full of hise, cutting for home ahead of the hue and cry'],
        thieves: ['udha', 'tied to the lis-trunk, robbed share by share'],
        wolf: ['gryka', 'back to the den-gorge, fed for a week'],
      },
      items: { hiset: ['dervish', 'every hise of the stolen money, in one xhep'] },
    },
    {
      id: 'thrashed', title: 'The village answers',
      note: 'The rifle-bearing priest finds the tied thieves, unties them into a posse, and the hunt ends at the dervish\'s own door — where one cry brings the whole village down on priest and thieves alike.',
      lines: [
        ['10.1', 'Casting up and down the road, the priest happens on the very thieves the dervish tied.', "Prifti si shkon andej këtej na degdiset tek qenë ata hajdutë që i kish lidhur dervishi."],
        ['10.2', 'Has a dervish passed along this road, he asks?', "I pyet prifti ata që: «a shkoi një dervish nga këjo udha?"],
        ['10.3', 'For he sold me a shepherd that ate all my sheep.', "se ky më dha një çoban që më hëngri gjithë dhëntë»."],
        ['10.4', 'He passed all right, they say — he tied us up too; untie us and we will go take him somewhere.', "Këta i thonë që: «shkoi edhe ai na lidhi edhe neve, po zgjidh-na që të vemi t'a zëmë gjëkunt»."],
        ['10.5', 'Off they set, priest and all; searching the road ahead they find nothing.', "Nisen' këta me gjithë priftin' edhe si e kërkuan' përpara s'e gjetnë,"],
        ['10.6', 'So they go and fall upon the dervish\'s own house.', "venë edhe pllakosin' në shtëpi të dervishit."],
        ['10.7', 'The moment he sees them, the dervish cries out to the village.', "Dervishi posaqë i pa i thërret fshatit,"],
        ['10.8', 'And the village, at the cry, falls on the house in its turn, seizes priest and thieves, and thrashes them soundly.', "edhe fshati me të dëgjuar pllakos në shtëpi të dervishit edhe i zunë ata edhe i llanisnë."],
      ],
      cast: {
        dervish: ['shtepiaDervishit', 'calls the village from his own doorstep'],
        priest: ['shtepiaDervishit', 'stormed the hut — and is thrashed by the parish\'s own village'],
        thieves: ['shtepiaDervishit', 'untied into the posse; beaten at the hunt\'s end'],
        villagers: ['shtepiaDervishit', 'answer one cry to the wood\'s edge; thrash priest and thieves alike'],
      },
    },
  ],
}
