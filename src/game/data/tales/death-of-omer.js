// ===========================================================================
// TALE: The Death of Omer & Ajkuna's Lament — see ../tales/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it.
//
// TWO epic songs of the Kângë Kreshnikësh cycle, told back to back exactly as
// the folklore card does: "Deka e Omerit" (verse_09_19) and "Ajkuna kjan
// Omerin" (verse_09_20). English and Albanian run close to line-for-line
// (201 + 90 lines), so "paragraphs" here are narrative scene-groups and a
// "sentence" is a punctuation-bounded verse unit of 1-6 lines; the Albanian
// third element is the verbatim verse group, lines joined with " / ". The
// game ALREADY STAGES this exact story as the night-and-day sequence off
// Jutbina (mujo1 → omer1 → omer2 → omerFund), with Mujo as the core NPC
// `mujo` (never duplicated) — the beats keyframe the fuller epic onto those
// same four nodes.
// ===========================================================================

export default {
  id: 'death-of-omer',
  title: 'The Death of Omer & Ajkuna\'s Lament',
  source:
    'Sung by Lulash Zefi ("Deka e Omerit") and Mirash Gjoni ("Ajkuna kjan Omerin"), both of Curraj i Epërm (District of Tropoja); Visaret e Kombit II, ed. B. Palaj & D. Kurti (Tirana 1937), pp. 218-223 & 224-226, repr. Folklor shqiptar II, Epika legjendare I, ed. Q. Haxhihasani (Tirana 1966), pp. 242-246 & 247-249 · read in R. Elsie & J. Mathie-Heck\'s translation (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Curraj i Epërm, District of Tropoja',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare I, 1966',
  },
  albanian: {
    title: '«Deka e Omerit» & «Ajkuna kjan Omerin»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 218-223 & 224-226, in the embedded Albanian PDFs Elsie & Mathie-Heck published beside their translation — Gheg orthography kept as printed (already modern-alphabet); one OCR/typesetting slip fixed (see discrepancies)',
    local: 'docs/references/palaj-kurti-vdekja-e-omerit-ajkuna-kjan.sq.txt',
  },
  discrepancies: [
    'THE BLACK THRESHING-FLOOR (¶20.2): the Albanian pictures Ajkuna kneeling at «rrahi i zi» — the black threshing-floor, a real mountain landmark of grain and grief — where Elsie\'s English generalizes to "the black earth." The beats keep the threshing-floor.',
    'SEVEN OMERS, OR EIGHT? (¶1.4 vs ¶14.1): Ajkuna counts seven Omers dead before this one («shtatë Omera»); Mujo\'s curse over the grave counts eight («tetë Omera»). Both English and Albanian preserve the mismatch in both songs — the tradition itself never resolves whose count is right, and the beats keep both numbers exactly as sung rather than picking one.',
    '"HOMERI" (¶22.4): the Albanian PDF prints «Mor Homeri i nanës» where every other refrain in the same lament reads «Omeri» (¶21.4, ¶23.2) — almost certainly a scan/typesetting slip for the boy\'s own name. Quoted here as «Omeri», matching the refrain\'s own pattern; the raw reference file keeps the PDF\'s own "Homeri" with a note.',
    'ONE GRAVE, TOLD TWICE: "Death of Omer" has Mujo and Halili alone dig the grave the moment the boy dies, in the high pastures (¶13); "Ajkuna Mourns Omer" opens with Mujo taking twelve companions back to dig a grave in the Green Valleys, as if for the first time (¶17). Two independently-collected songs retelling one event, not a plot hole in either — the beats stage the second digging as Mujo\'s later return to finish the grave properly with mourners, not a second death.',
    'SHE COMES HOME, NOT DEATH AT THE GRAVESIDE: the folklore card\'s own summary says Ajkuna\'s heart "breaks at the graveside," and the game\'s already-staged omerFund ending closes on her asleep by the grave. The actual epic (both songs) has the mountain oras intervene, calm her, and lead her back to Jutbina (¶24) — she is not left to die there. The beats follow the fuller epic and carry her home; the staged ending\'s more ambiguous close is compatible (grief overwhelms her before she is comforted) but the beats do not end the tale on death.',
  ],
  // 24 scene-groups across both songs; sentence counts per group
  paragraphs: [4, 5, 5, 6, 4, 4, 5, 4, 4, 5, 3, 5, 2, 6, 4, 2, 6, 5, 3, 4, 4, 4, 2, 2],
  cast: [
    { id: 'mujo', name: 'Mujo', note: 'Gjeto Basho Mujo — Omer\'s father, the frontier\'s foremost kreshnik', npc: 'mujo' },
    { id: 'halil', name: 'Halili', note: 'Sokol Halili — Mujo\'s younger brother, sent to scout the Rugged Peak', npc: 'halilVellaiMujit' },
    { id: 'ajkuna', name: 'Ajkuna', note: 'Mujo\'s wife, Omer\'s mother — has already buried seven sons of that name', npc: 'ajkunaGruaMujit' },
    { id: 'omer', name: 'Omer', note: 'Mujo and Ajkuna\'s son — not yet grown, sent alone against a whole Kingdom', npc: 'omeriMujit' },
    { id: 'popi', name: 'the priest', note: 'the Slavic priest of the border chapel, shot at dawn', npc: 'popiKishes' },
    { id: 'grueShkine', name: 'the Slavic woman', note: 'sketches false portraits at the chapel window to lure Omer out', npc: 'grueShkine' },
    { id: 'shkjet', name: 'the Slavs of the Kingdom', note: 'besiege the chapel, then are routed by Mujo and Halili', npc: 'shkjetKrajlise' },
    { id: 'oret', name: 'the mountain oras', note: 'comfort Ajkuna at the grave and lead her home to Jutbina', npc: 'oretBjeshkes' },
  ],
  // anchor = the game location this tale place inhabits. This is a NORTHERN
  // (Gheg) frontier song of the kreshnik cycle: mirrors are Jutbina and its
  // own high pastures, never a southern legend-site. All four staging nodes
  // (mujo1/omer1/omer2/omerFund) already exist and already tell exactly this
  // story in miniature — the beats keyframe the fuller epic onto them.
  places: [
    { id: 'branch', emoji: '🔀', name: 'where the two heroes stay', note: 'the branching scene naming Omer as Mujo\'s son — the household the tale opens in, and the tale\'s own doorway into the story',
      anchor: { status: 'existing', node: 'mujo1', mirror: 'the game\'s own hub between the two Jutbina epics',
        mold: 'the node already reads "here dwell two heroes... Omer is a son of Mujo" and already branches to "dëgjo omer" — this tale IS that branch, keyframed from its very first line',
        sharedWith: ['halil-marriage (the sibling branch, "ndihmo halil")'] } },
    { id: 'home', emoji: '🏘️', name: 'Ajkuna and Mujo\'s hearth at Jutbina', note: 'the household at Jutbina where Ajkuna waits for word, presses for the truth, and is later cast out',
      anchor: { status: 'existing', node: 'jutbina', mirror: 'Jutbina, the kreshnik hub the game already names "where the lahutë sings the Songs of the Kreshnikë"',
        mold: 'jutbina already dwells Mujo and Halili; its own "ndihmo mujo" option is one hop from the actual branch into this tale ("dëgjo omer" lives at mujo1, not here) — our beats keyframe the household itself: the hearth Ajkuna keeps while the men are one step away at that branch',
        sharedWith: ['mujo-strength (the hamlet\'s founding memory)', 'halil-marriage (mujo1/mujo2…)'] } },
    { id: 'bjeshka', emoji: '⛰️', name: 'the high pastures and the chapel beyond the border', note: 'where Omer takes his stand and is carried, dying, back up into the mountains',
      anchor: { status: 'existing', node: 'omer1', mirror: 'the high frontier pastures and the Kingdom\'s edge beyond them',
        mold: 'the game already compresses child Omer\'s fight, his wounds and his death into this exact node ("omer lufton dhe ka shumë plagë... omer vdes... mujo e mban") — our beats are its keyframes: the ride out, the chapel, the siege, the lying portraits, the rescue, the door, the last words',
        conflicts: 'NOT mali1/mujiZana1 — those already belong to mujo-strength\'s own night-vignette (the zana milk and the boulder), a different mountain scene decades earlier; this is the tale\'s own dedicated node, already built for exactly this raid and death' } },
    { id: 'grave', emoji: '🪦', name: 'Omer\'s grave in the Green Valleys', note: 'the mountain grave dug the day he died, and dug again with mourners the second song remembers',
      anchor: { status: 'existing', node: 'omer2', mirror: 'the mountain grave and Green Valleys (Lugjet e Verdha) of the frontier songs',
        mold: 'the game already stages the grave, the great stone, and the mother hearing of it despite Mujo\'s hiding it ("hëna di dhe nuk flet") — our beats keyframe the digging (twice, per both songs), Mujo\'s curse on the pastures, and Ajkuna\'s own walk here after she is driven from the house' } },
    { id: 'lament', emoji: '🌲', name: 'the beech tree over the grave', note: 'where Ajkuna keens for her son, comforted at last by the mountain oras',
      anchor: { status: 'existing', node: 'omerFund', mirror: 'the graveside of Ajkuna\'s Lament, the ending the game already stages',
        mold: 'omerFund already IS this scene: tears, the walk to the grave, the curse of the moon, mourning Omer and "the sons" (bijtë, plural — the tradition\'s many lost Omers); our beats carry it through to the fuller epic\'s own close, where the mountain oras comfort her and lead her back to Jutbina' } },
  ],
  items: [
    { id: 'pushka', emoji: '🔫', name: 'Omer\'s rifle', note: 'the boy\'s one weapon in the chapel — kills the priest, holds the door against a whole Kingdom' },
    { id: 'skica', emoji: '🖼️', name: 'the two false portraits', note: 'sketched at the chapel window to lure Omer out with word his father and uncle were slain' },
    { id: 'gur', emoji: '🪨', name: 'Omer\'s tombstone', note: 'a boulder hewn from the cliff, too heavy for three thousand men to lift' },
  ],
  // how the game stages this tale — a witnessed tragedy off Jutbina. You never
  // embody anyone: you come upon the frontier and the lahutë sings Omer's death
  // and Ajkuna's lament at you. The played thread keyframes the fuller epic onto
  // the four existing nodes (omer1 → omer2 → omerFund), changing nothing.
  play: {
    entry: 'dishes',
    stance: 'witness',
    // witness: NO as/with
    role: 'You come upon the frontier of Jutbina where the lahutë carries the Songs of the Kreshnikë. You hear how Omer, Mujo\'s boy, rode alone against a whole Kingdom, took nine wounds holding a chapel door, and died in his father\'s arms up in the high pastures. You witness Mujo carry him home and bury him under a beech, and his mother Ajkuna\'s grief swell into the song itself. You change nothing — the tale is already sung, and you are only its listener.',
    from: 'omer1',
    ending: 'omerFund',
    scenes: { omer1: 'siege', omer2: 'grave', omerFund: 'underBeech' },
    divergences: [
      { note: 'The two-song epic (201 + 90 verses) compresses to a handful of staged moments off Jutbina — the siege, the grave, the lament. The witnessed thread (dishes → siege → grave → underBeech) keyframes the fuller song onto four nodes; the ride out, the lying portraits, and Mujo\'s curse on the pastures pass by as lore, not played scenes.' },
      { beat: 'grave', note: 'Two independently-collected songs each tell one burial: the first has Mujo and Halili dig the grave the instant Omer dies in the peaks (¶13); the second opens with twelve companions digging it anew in the Green Valleys as if for the first time (¶17). The game stages a single grave at omer2, folding both diggings into one.' },
      { beat: 'comforted', note: 'The epic does not end in death: the mountain oras hush Ajkuna\'s wailing, dry her tears, and lead her home to Jutbina (¶24). The game\'s staged omerFund ending is more ambiguous — her heart breaks at the graveside and she lies down beside her son — closing on grief rather than on comfort.' },
    ],
  },
  beats: [
    {
      id: 'dishes', title: 'Three dishes',
      note: 'Mujo orders three separate meals made before he rides out with his son. Ajkuna begs him not to take Omer yet — she has already buried seven sons of that name in graves she cannot even find.',
      lines: [
        ['1.1', 'Mujo turns to his wife with an order: get up and cook three separate meals, one for each of them.', "Grues s'vet Muji m'i kishte thanë: / - Çou tri shujtë gadi me na i ba!"],
        ['1.2', 'Halili\'s cup should hold sweetened syrup, Omer\'s should hold his mother\'s own milk, and his own nothing more than plain well water.', "Njat temen me uj prej bunarit, / Njat t'Halilit me lang prej sheqerit / E njat t'Omerit me tamël prej gjiut."],
        ['1.3', 'Invoking God\'s own name, she pleads with him to keep the boy home a while longer.', "Grueja Mujit ka qitë e i ka thanë: / - Pash at zot, Mujo, qi t'ka dhanë, / Mos Omerin shpijet me ma tretë,"],
        ['1.4', 'Seven sons before this one bore the name Omer, she reminds him, and every one of them lies dead somewhere in these mountains, in graves she was never even shown.', "Se shtatë Omera t'mirë si i pata, / Shtatë Omera jam kah kjaj e ngrata / E s'po dij as vorret ku po i kanë, / Se t'shtatët dekun n'bjeshkë ti m'i ke lanë."],
      ],
      cast: {
        mujo: ['branch', 'orders three separate dishes made before he rides out — the two heroes\' own household'],
        halil: ['branch', 'still under his brother\'s roof, not yet sent to scout'],
        ajkuna: ['branch', 'begs Mujo not to take Omer from the house yet'],
        omer: ['branch', 'the boy the whole household is arguing over'],
        popi: ['bjeshka', 'tends the Slavic chapel across the border, not yet met'],
        grueShkine: ['bjeshka', 'lives in the Kingdom across the border, not yet met'],
        shkjet: ['bjeshka', 'garrison the Kingdom across the border, not yet met'],
        oret: ['grave', 'keep the high pastures always, not yet met'],
      },
      items: { pushka: ['omer', 'the boy\'s rifle, carried from the start'] },
    },
    {
      id: 'reply', title: 'No death sweeter than battle',
      note: 'Mujo answers her: no death is sweeter than one met in battle, unbeaten. He may be riding to his own death today, but he will not leave his son untaught.',
      lines: [
        ['2.1', 'Mujo turns back with an answer of his own.', "Muji grues çka qitë e i ka thanë?"],
        ['2.2', 'Sons lost to battle need no tears from her, he tells her, and neither do the living ones still out raiding — grief has no place for either.', "- Mos kjaj djelmt qi n'luftë kanë dekë, / Mos kjaj t'gjallët, qi n'bjeshkë duen me çetue,"],
        ['2.3', 'To his mind, a warrior could ask for no finer end than falling in combat with his honor still whole.', "Se dekë ma e amël, s'asht se n'luftë m'u pre, / N'luftë m'u pre pa i lanë marre vedit."],
        ['2.4', 'So let her finish the cooking, he says — he means to take the boy up into the mountains today, and whatever becomes of him, Omer will not go without learning the trade.', "Tri shujtë gadi prandej me na i ba, / Se n'bjeshkë sot un po due me dalë, / Ndoshta e kam exhelin me dekë / E pa zanat Omeri po m'jet."],
        ['2.5', 'Should the child cry for his mother\'s milk along the way, syrup will do instead; should sleep take him, Mujo\'s own bandolier will serve as his blanket.', "Kur t'i bijë huj djalit gji me pi, / Lang sheqerit i ap sa t'duej m'u ngi; / Kur t'i bijë huj djalit për me fjetë, / N'petë t'sylahit e vndoj me fjetë."],
      ],
      cast: {
        mujo: ['branch', 'answers Ajkuna: no death sweeter than falling unbeaten in battle; readies to leave with the boy'],
      },
    },
    {
      id: 'ride', title: 'Three days, no çeta',
      note: 'The meals made, the three ride hard for the high pastures. Three days pass without a single raiding band in sight, so Mujo sends Halili alone to the Rugged Peak to scout.',
      lines: [
        ['3.1', 'With that settled, she gets up and puts the three meals together.', "Qatherë grueja tri shujtë i ka gatue."],
        ['3.2', 'The two heroes swing up onto their horses and gallop off toward the high pastures in a cloud of raised dust.', "N'shpinë gjogave trimat m'u kanë kcye, / Tim e mjegull gjogat m'i kanë ba, / N'maje t'bjeshkës fort shpejt kanë dalë,"],
        ['3.3', 'Three full days go by with the pastures searched top to bottom, yet not one raiding party turns up.', "Tri dit rresht npër bjeshkë janë ndalë, / Kurrkund çetë me sy s'kanë pa."],
        ['3.4', 'Mujo finally decides to post Halili up on the Rugged Peak instead, where a wider view might turn up some sign of the Slavs — and tells him not to linger there.', "Dikur vonë Muji ka thanë: / - Ti, Halil, n'Maje t'rreptë me dalë! / Si n'mujsh kund çetë shkjaut me pa, / Sa ma parë ti ktu me ardhë!"],
        ['3.5', 'Without delay Halili swings onto his horse and cuts straight along the ridge line toward the peak.', "Shpejt Halili asht çue n'kambë, / Në shpinë gjogut i ka hipë, / Ka marrë rrugën nëpër kreshtë, / Nëpër kreshtë drejtë Majes s'rreptë."],
      ],
      cast: {
        mujo: ['bjeshka', 'rides out with Omer, three days searching the pastures for a raiding band'],
        halil: ['bjeshka', 'rides along, then climbs the Rugged Peak alone to scout'],
        omer: ['bjeshka', 'rides at his father\'s side'],
      },
    },
    {
      id: 'orders', title: 'The white chapel across the border',
      note: 'Alone with his son, Mujo lays out the raid: a white kulla on the flat land is really the Slavs\' own chapel — break in if it\'s shut, wait if it\'s open, and be ready for Sunday\'s crowd.',
      lines: [
        ['4.1', 'With just the two of them now, Mujo puts a question to young Aga Omer: does raiding the Kingdom frighten him at all?', "- Ti Omer, Omer Aga i ri, / A thue tutesh për me ra n'Krajli?"],
        ['4.2', 'That white kulla standing out on the flatland, he explains, is no ordinary building — it serves the Slavs as their chapel.', "N'Fushë t'Krajlisë â 'i kullë e bardhë, / Kulla e bardhë asht kisha e shkjaut;"],
        ['4.3', 'Should Omer find its door standing open when he arrives, he is to keep his distance and go no closer.', "N'kjoftë se dera e çilun ka qillue, / Mos guxo kishës me iu afrue;"],
        ['4.4', 'But a bolted door is his signal to force his way through, shut himself inside, and stay on guard — the Slavs, Mujo warns, will look for some trick to draw him back out into the open.', "N'kjoftë se dera mbyllun ka me kenë, / Shpërthe derën e mbrendë ngujoju / E ruej se t'rrejnë shkjetë për me dalë, / Ruej se t'rrejnë shkjetë për me t'gri;"],
        ['4.5', 'Since the next day falls on a Sunday, crowds of Slavs are bound to turn up at the chapel — and that is Omer\'s cue to start shooting from cover.', "Se, kur t'dalë nesër drita, daltë e bardhë, / Shkje t'pafarë tu kisha kanë me ardhë, / Pse ditë e dielle nesër ka qillue, / Pushkën shkjeve prej kishet me ua fillue,"],
        ['4.6', 'Mujo, for his part, will take position where the three roads meet and block anyone from getting through.', "N'tri rrugë kryq un due m'u shtërngue, / Nuk la kend asajt me kalue."],
      ],
      cast: {
        mujo: ['bjeshka', 'lays out the plan: the white chapel across the flat land, what to do if its door is shut or open'],
        omer: ['bjeshka', 'listens to his father\'s orders for the raid'],
      },
    },
    {
      id: 'chapel', title: 'Into the chapel',
      note: 'Omer rides off alone for the white kulla, finds its door shut, and breaks his way in — barring it behind him to spend the whole night inside, unseen.',
      lines: [
        ['5.1', 'Quick as a falcon taking flight, Omer leaps onto his horse and races off in a haze of dust until the chapel comes into view across from him.', "Si sokol Omeri n'kambë asht çue, / M'i ka kcye gjogut në shpinë, / Tim e mjegull gjogun e ka ba. / Kundruell kishës djali kur ka dalë,"],
        ['5.2', 'He pulls up his white horse, shields his eyes with one hand for lack of a field-glass, and finds the door closed tight.', "M'ja ka ndalë vrapin gjogut t'bardhë, / Dorën ballit ja ka vndue, / Pse turbi me vedi s'i ka qillue, / Derën e kishës mbyllun e ka gjetë."],
        ['5.3', 'Undaunted, he walks straight up, drives the door open with a single kick, and slips inside.', "Sa trimnisht tu kisha ka vojtë, / Me nji shtjelm derën e ka thye / Edhe mbrendë Omeri asht ngujue"],
        ['5.4', 'He drops the bar back across the door and passes the whole night there by himself.', "E përmbrapa derën e ka ndry / E gjithë natën vetun ka ndejë."],
      ],
      cast: {
        omer: ['bjeshka', 'rides alone to the chapel, kicks the shut door in, and bars it behind him for the night'],
      },
    },
    {
      id: 'siege', title: 'The priest, and the siege',
      note: 'At dawn Omer shoots the priest coming to open the chapel. The alarm brings the whole Kingdom down on the building — nine bullets find him before anyone can force the door.',
      lines: [
        ['6.1', 'As the first light breaks, he catches sight of the priest making his way toward the chapel.', "Kur ka nisë drita për me dalë, / Ka pa popin n'kishë kah don me ardhë."],
        ['6.2', 'One shot from Omer\'s rifle and the man falls dead where he stands.', "Djali popin n'pushkë e paska gjue, / Dekun n'tokë popin e paska lshue."],
        ['6.3', 'Word of it spreads across the whole Kingdom in an instant, and the Slavs converge on the chapel from every side, throwing themselves at it without let-up.', "N'tanë Krajlninë u qit meiherë kushtrimi, / Gjithë rreth kishën shkjetë ma kanë rrethue, / S'po pushojnë trimat tue luftue;"],
        ['6.4', 'Not one of them manages to break through the door or catch a glimpse of what is happening within — where Omer already carries nine bullet wounds and is barely still breathing.', "Por kush mbrendë s'ka mujtë me hi, / Por kush mbrendë s'ka mujtë me pa. / Nja nandë plumbe Omerit m'i kanë ra, / Shpirti t'mjerit gadi i ka dalë."],
      ],
      cast: {
        popi: ['bjeshka', '☠ shot dead by Omer at first light, coming to open the chapel'],
        shkjet: ['bjeshka', 'ring the chapel at the alarm and fight to break in, in vain'],
        omer: ['bjeshka', 'holds the barred chapel alone, nine bullets in his body'],
      },
      exit: ['popi'],
    },
    {
      id: 'trick', title: 'The lying portraits',
      note: 'A Slavic woman sketches Mujo\'s face, then Halili\'s with a rope at the throat, calling each dead in turn to lure Omer out. He sees through the first lie; his uncle\'s portrait is what finally breaks him.',
      lines: [
        ['7.1', 'A Slavic woman comes up with a scheme: she draws a likeness of Mujo\'s face and props it in the chapel window, calling for Omer to show himself now that, so she claims, his father has fallen.', "Ç'ish kujtue nji shkinë, e vrafti zoti! / Ja ka shkrue syretin n'Mujin, / Ja ka qitë me e pa n'prezore. / - Del, Omer, me pa i gjallë në je, / Se na Mujin sot-o ta kem' pre!"],
        ['7.2', 'Omer shouts back at her to clear off — whatever happens to Mujo is no concern of his.', "Ka qitë Omeri e i ka thanë: / - Ik, mori shkinë, shkina e palame, / Se un për Mujin nuk kam dert."],
        ['7.3', 'Undeterred, she sketches Halili next, a noose drawn around his throat this time, and tells Omer his uncle has been killed and strung up too.', "Ja ka qitë syretin n'Halilin, / Syretin me konop në fyt. / - Del, Omer, zoti të vraftë, / Se vra e furë Halilin të kena."],
        ['7.4', 'None of it is true — both men are very much alive out there, still busy cutting down Slavs, and the whole display is nothing more than bait to draw the boy into the open where he can be killed.', "Shndosh e mirë Muji e Halili ishin, / Nji sahat pushueshëm trimat s'rrijshin / Edhe mjaft shkje vra qi kishin; / Por Omerin dojshin për me rre, / As jasht t'dale për me e vra."],
        ['7.5', 'This time the picture works: at the sight of his uncle\'s face his vision blurs and he takes it for the truth.', "Kur ja qiten syretin e Halilit, / Atherë drita iu turbullue / E kujtoi se â dekë e shkue."],
      ],
      cast: {
        grueShkine: ['bjeshka', 'sketches Mujo\'s face, then Halili\'s with a rope at the neck, to lure Omer out with a lie'],
        omer: ['bjeshka', 'refuses her first lie, but the second — Halili hanged — dims his sight with grief'],
        mujo: ['bjeshka', 'unhurt, still cutting down Slavs at the crossroads — the trick is a lie'],
        halil: ['bjeshka', 'unhurt, still fighting — the trick is a lie'],
      },
      items: { skica: ['bjeshka', 'the two false portraits, held to the chapel window'] },
    },
    {
      id: 'groan', title: 'The groan that crosses the mountain',
      note: 'Omer\'s groan shakes the ground and reaches Halili on the peak. He races down and finds Mujo at the crossroads — both fear the worst.',
      lines: [
        ['8.1', 'A groan tears out of Omer loud enough to shake the earth, and it carries clear across to where Halili stands.', "Nji gjamë përdhe Omeri e ka lshue, / Fill në vesh Halilit te i ka shkue."],
        ['8.2', 'Halili comes down off the mountain at a run and catches up with Mujo, still holding his post at the crossroads.', "Për tposhtë trimi shpejt asht fillue. / N'tri rrugë kryq Mujin e ka gjetë."],
        ['8.3', 'Something is wrong, Halili tells him — that sound he just caught on the wind was Omer\'s own voice in pain.', "- Zo', nji gjamë, Mujo, çka do t'jetë? / Gjamët e Omerit përdhe mue m'kanë ardhë."],
        ['8.4', 'He swears it before God: whatever has happened, the boy is in real danger.', "Be në zotin Halili i ka ba, / Fort ngusht Omeri po asht."],
      ],
      cast: {
        halil: ['bjeshka', 'hears Omer\'s groan shake the ground, races down to Mujo at the three crossroads'],
        mujo: ['bjeshka', 'meets Halili at the crossroads; both fear the worst for Omer'],
      },
    },
    {
      id: 'rescue', title: 'The ride to the rescue',
      note: 'Mujo and Halili ride so hard the beech leaves are said to fall, fall on the besieging Slavs, and scatter them for good.',
      lines: [
        ['9.1', 'The two of them are moving within moments — up on their horses and racing hard toward the Kingdom until the chapel finally comes into sight.', "Halla, n'kambë trimat kankan çue, / Në shpinë gjogave u kanë hipë, / E kanë marrë rrugën e janë nisë. / Kundruell fushës së Krajlisë kur kanë ra,"],
        ['9.2', 'Mujo pushes his horse so violently that, as the story tells it, leaves shake loose from the beech trees along the way.', "Sa t'madhe Muj i asht hallakatë, / Gjethi i ahit, thonë, për tokë ka ra,"],
        ['9.3', 'Sheer panic breaks out among the Slavs and they scatter in every direction.', "Mnera e madhe shkjetë i ka marre, / Ika e madhe shkjevet u asht dhanë."],
        ['9.4', 'With fortune clearly on their side, the two brothers cut down as many as they can catch and send the rest running, then turn back toward the chapel once the ground around it is clear.', "Kanë fillue trimat tue luftue, / Po don zoti vllaznet me u ndimue, / Po don zoti e u asht dhanë e mbara, / Shum kanë vra, ma shum kanë vu përpara, / Larg prej kishet si i kanë largue, / Kanë kthye prap e kishës iu kanë afrue."],
      ],
      cast: {
        mujo: ['bjeshka', 'rides so hard the beech leaves are said to fall, and falls on the Slavs at the chapel'],
        halil: ['bjeshka', 'rides at his brother\'s side into the rescue'],
        shkjet: ['bjeshka', 'broken and scattered before the two heroes, the survivors driven off'],
      },
    },
    {
      id: 'door', title: 'Prove you are Mujo and Halili',
      note: 'Mujo calls Omer to open up. The boy, nine wounds in his body, swears he\'ll trust no voice but theirs — let them prove it by breaking the door down themselves.',
      lines: [
        ['10.1', 'Mujo calls out to him: is he still breathing in there? Open the door!', "T'madhe Muji ka bërtitë: / - A je gjallë, Omer Aga i ri? / Çou ti derën neve me na çilë!"],
        ['10.2', 'From inside, Omer swears an oath: only his father or his uncle will get that door opened.', "Be në zotin Omeri ka ba, / Qi kurrkuj un derën nuk ja çili, / Për pa ardhë Muji, ndo Halili."],
        ['10.3', 'Well, here they both are, Mujo answers back — get up, Omer, it is truly Mujo and Halili at your door.', "Atherë Muji i ka thanë: / - Çou, Omer, derën me na e çilë, / Se ktu asht Muji me Halilin!"],
        ['10.4', 'Nine holes shot through my body, Omer calls back — getting up to work the door myself just is not possible.', "Kqyr çka ka thanë Omeri i ri! / - Nandë varrë pushket n'shtat i kam, / Nuk po muj derën me jau çilë,"],
        ['10.5', 'But if his visitors really are who they claim, he tells them to prove it by smashing the door in with their own hands — because he would sooner die than open it for anyone else.', "Po, si n'kjoshi ju Muji e Halili, / Shtjelm derës ju për me i ra, / Copë e grimë derën ju po e bani; / Por n'mos kjoshi Muji e Halili, / Gjallë s'u la derën për me e çilë."],
      ],
      cast: {
        mujo: ['bjeshka', 'calls Omer to open the door, then answers his challenge: it is truly Mujo and Halili'],
        omer: ['bjeshka', 'answers from inside: nine wounds keep him from rising; let them prove themselves by breaking it down'],
      },
    },
    {
      id: 'carried', title: 'The door breaks; to the mountains',
      note: 'Mujo shatters the door, and the two carry Omer up into the mountains, strapped fast to his father\'s courser.',
      lines: [
        ['11.1', 'In a fury, Mujo throws his whole weight against the door until it splinters apart.', "Me idhnim Muji derës shtjelm i ka ra, / Copë e grimë derën e ka ba."],
        ['11.2', 'The two step inside at last and murmur a blessing over his wounds.', "Atherë trimat mbrendë kanë hi, / Ja kanë ba për hajr varrët Omerit,"],
        ['11.3', 'Mujo settles him across his own saddle, ties him down securely so he will not slip, and the three set out climbing toward the high pastures.', "N'vithe t'gjogut Muji e ka vu / E për vedi me kollana e ka njeshë / E kanë marrë bjeshkën përpjetë."],
      ],
      cast: {
        mujo: ['bjeshka', 'breaks the door down, sets Omer on his own courser, and straps him fast for the ride up'],
        halil: ['bjeshka', 'helps carry his nephew up toward the high pastures'],
        omer: ['bjeshka', 'carried, badly wounded, strapped to Mujo\'s courser'],
      },
    },
    {
      id: 'lastWords', title: 'Omer\'s last words',
      note: 'In the high pastures Omer speaks for the last time: a message of comfort for his mother, and a plea to hide his death from her. Then his spirit leaves him.',
      lines: [
        ['12.1', 'Not until they are up among the high pastures does Omer finally find his voice again.', "Nalt në bjeshkë trimat kur kanë dalë, / Ma ka folë Omeri nji fjalë:"],
        ['12.2', 'Stop here a moment, he asks of his father — he can feel his life slipping away, and there are things he needs to say before it does.', "- Pash 'i zot, Mujo, qi t'ka dhanë, / Vend me xanë e ktu m'u ndalë, / Se kah don shpirti për me dalë / E 'i amanet due me ta lanë,"],
        ['12.3', 'Take word to my mother, he says — tell her I send my love, and that I have only gone off to stay a while with my uncles.', "Nji fjalë nanës me m'ja thanë, / Nji fjalë nanës me m'ja çue, / Thuej \"Omerin tu daja e kam çue\","],
        ['12.4', 'Keep the truth of my death from her, he begs, because the grief of it would be more than she could bear, and she would only wear herself out hunting for where I am buried.', "Se jam dekë mos me i diftue, / Se m'ka dashtë e nis me vajtue, / Se m'ka dashtë e nis me mjerue, / Me mjerue e vorrin tuj ma lypë."],
        ['12.5', 'With those words spoken, life goes out of him.', "Atherë shpirti Omerit i ka dalë"],
      ],
      cast: {
        omer: ['bjeshka', '☠ speaks his last words — a message of comfort for his mother, and a plea to hide his death from her — and dies'],
        mujo: ['bjeshka', 'hears his son\'s dying wish'],
        halil: ['bjeshka', 'hears it too'],
      },
      exit: ['omer'],
    },
    {
      id: 'grave', title: 'The grave',
      note: 'Mujo and Halili dig Omer\'s grave right there in the mountains, and set over it a boulder three thousand men together could not lift.',
      lines: [
        ['13.1', 'Right there among the peaks the two men break ground for his grave and split a great stone loose from the rock face.', "Edhe n'bjeshkë vorrin ja kanë ba / E e kanë shkepë nji gur prej malit"],
        ['13.2', 'That stone becomes his marker once it is lowered over the grave — a weight three thousand men together would never manage to lift.', "E e kanë lshue mbi vorr të djalit, / Tri mijë burra mos me mujtë me e luejtë."],
      ],
      cast: {
        mujo: ['grave', 'digs Omer\'s grave in the mountains and sets a boulder over it that three thousand men could not lift'],
        halil: ['grave', 'helps hew the great stone from the cliffside'],
      },
      items: { gur: ['grave', 'set over the grave — too heavy for three thousand men'] },
    },
    {
      id: 'curse', title: 'Mujo curses the pastures',
      note: 'Mujo curses the mountain barren and lays one wish each on the peaks, the birds, the shepherds, and the wolf packs: never trouble this grave, or the boy would long for home.',
      lines: [
        ['14.1', 'Mujo turns on the mountain itself with a curse: eight sons carrying the name Omer he has raised, all eight now lying dead in this same ground.', "E ç'ka qitë Muji e ka thanë? / - Hej medet, tha, mori bjeshkë, / Se tetë Omera t'mirë si i paç / E tetë Omera ndër ju t'dekun i laç."],
        ['14.2', 'Let these slopes go dry and nameless from now on, he says — nothing green sprouting here again, and not a soul ever tasting your springs.', "Ju u thaçin Bjeshkët e thata, / Dushk as bar ndër ju kurr mos daltë, / As uj ndër ju kurr mos u piftë!"],
        ['14.3', 'To the peaks he leaves one demand: hold back every snowslide, and never let one so much as brush against his son\'s stone, or the boy will feel it even in death.', "Amanet, maje, jau paça lanë: / Ortek boret ksajt mos me rrxue, / As ktij vorrit mos t'i afrohet, / Omeri i ri m'merohet."],
        ['14.4', 'To the birds, silence is his one request — no birdsong over this ground, for it would only trouble young Omer to hear it.', "Amanet, zogj, jau paça lanë: / Kurr ksajt, mos me kndue, / Omeri i ri e m'merohet."],
        ['14.5', 'To the shepherds, he asks that their flocks graze elsewhere entirely — the sound of bells and pipes drifting over would stir up a homesickness in the boy that death cannot cure.', "Amanet, çobaj, jau paça lanë: / Kurr gjanë ksajt mos me e pru, / Ndien Omeri kumbonët tuj tingllue, / Ndien baritë fejve kah u binë, / Asht i ri e përmallohet."],
        ['14.6', 'And to the wolves passing through, he asks quiet as well — no howling near this spot, for his young son rests here, and even a wolf\'s cry might pull at him with longing for home.', "Amanet, mor llavë, jau paça lanë: / Kur t'u qesin rruga ksajt me ra, / Mos me britë, as dajre mos me ba, / Pse kam Omerin ktu djalë të ri, / M'përmallohet e malli e merr për shpi."],
      ],
      cast: {
        mujo: ['grave', 'curses the pastures barren and lays one wish each on the peaks, the birds, the shepherds, and the wolf packs — never trouble this grave'],
      },
    },
    {
      id: 'lie', title: 'Home, and the lie',
      note: 'Mujo and Halili ride home. Ajkuna asks after her son at once, already fearing the worst.',
      lines: [
        ['15.1', 'Turning their horses back toward Jutbina, the two ride home — and the moment they arrive Ajkuna is asking after her boy.', "U kanë hypë gjogave në shpinë / E n'shpi trimat kur kanë shkue, / Ka fillue grueja e i ka pvetë:"],
        ['15.2', 'Is Omer, too, among those the mountains have taken this time, she wants to know.', "- Po Omerin, zo', ç'e ka gjetë? / A thue n'bjeshkë edhe ai si tjerët ka dekë?"],
        ['15.3', 'Taking her by the hand, Mujo offers her a half-truth — that they simply left the boy behind with his uncles.', "Ka marrë Muji e grues i ka thanë: / - Na te dajat Omerin e kem' lanë."],
        ['15.4', 'She will not have it, and swears back at him — her son would never have stayed away from her on his own; whatever happened, the mountains have claimed him.', "Be në zotin prap grueja te u ka ba: / - Se pa mue Omeri n'daja s'â kanë, / Por në bjeshkë dekun si e keni lanë."],
      ],
      cast: {
        mujo: ['home', 'rides home and tells Ajkuna only that Omer stayed behind with his uncles'],
        halil: ['home', 'rides home with his brother'],
        ajkuna: ['home', 'asks after Omer, already fearing the worst'],
      },
    },
    {
      id: 'confess', title: 'Halili\'s answer',
      note: 'Halili tells her plainly at last: they left Omer dead in the mountains, and built him a tombstone there.',
      lines: [
        ['16.1', 'It falls to Halili to give her the truth straight: the mountains are where they buried her son.', "- Mori nuse, Halili i ka thanë: / Na Omerin n'bjeshkë dekun si e kem' lanë"],
        ['16.2', 'A stone marks the spot now, he adds — and asks only that she and the household keep their own health up.', "Edhe vorrin n'bjeshkë ja kem' punue, / Ti veç shndosh me gjithë kta robt tu!"],
      ],
      cast: {
        halil: ['home', 'tells her plainly at last: they left Omer dead in the mountains, and built him a tombstone there'],
      },
    },
    {
      id: 'digAgain', title: 'A blessing, and the digging',
      note: 'The second song opens its own telling of the burial: some time after, Mujo takes twelve companions back to the Green Valleys to finish the grave properly, with the zanas keening and his fellows mourning around him.',
      lines: [
        ['17.1', 'The second song opens with its own praise to God — before His hand shaped them, the singer says, they were nothing at all.', "Lum për ty, o i madhi zot, / Qi s'jem' kanë e zoti na ka dhanë!"],
        ['17.2', 'Daylight comes up thin and grey that morning, and even once the sun climbs high it gives off no real warmth.', "Drita â dalë e dritë s'po ban, / Ka le dielli e nu' po xe!"],
        ['17.3', 'Twelve men fall in behind Gjeto Basho Mujo as he heads down toward the Green Valleys, to the spot where the Slavs cut his son down.', "Ça ka ba, zot, Gjeto Basho Muji? / Dymbdhetë shokë trimi i ka marrë, / N'Lugje t'verdha kur ka dalë, / Djalin shkjetë ja paskan vra."],
        ['17.4', 'He puts the boy into the ground with his own hands, refusing to let any of the others so much as lift a shovel.', "Djalin n'dhe Muja e ka shti, / Kurrkush ngjat nuk ka qillue. / Muji vorrin tue e rmue,"],
        ['17.5', 'Nothing marks the moment but the zanas\' own weeping, the grief of his companions, the covering stones, and a ring of beech trees standing witness — even the nightingales seem to grieve the boy properly.', "Veçse zanat tue lotue, / Veçse shokët qi po e gjamojnë, / Veçse gurt qi po e mbulojnë / Edhe ahat qi e rrethojnë. / Mirë bylbylat djalin po e vajtojnë!"],
        ['17.6', 'That done, Mujo turns his back on the grave and makes for home.', "Â dredhë Muja e n'shpi ka shkue,"],
      ],
      cast: {
        mujo: ['grave', 'returns to the grave in the Green Valleys with twelve companions to finish it, digging it himself while the others mourn'],
      },
    },
    {
      id: 'asksAgain', title: 'The mother\'s question, and the lie',
      note: 'Ajkuna asks again where her son is. Mujo repeats the same lie, then — sworn at a second time — admits the Slavs killed her son, but forbids her to mourn under his own roof.',
      lines: [
        ['18.1', 'No sooner is he back than she is asking again — did he find their son, and is he the one they left behind in the Green Valleys?', "Nana e djalit p'e pëvetë: / - Mujo djalin ç'ma ka gjetë, / N'Lugje t'verdha a thue ka mbetë?"],
        ['18.2', 'He repeats the old story — the boy never stayed in the Green Valleys at all, only went off to stop with his uncles for a time.', "- N'Lugje t'verdha nuk t'ka mbetë, / Por ka shkue me bujtë tu dajat."],
        ['18.3', 'She calls on God to make him answer honestly: what has really become of her child?', "Be në zotin Mujit m'i ka ba: / - Aman, Mujo, djalin ç'ma ke ba?"],
        ['18.4', 'Mujo gives in at last — she may grieve, he tells her, but only out gathering wood, never here under his roof; yes, the Slavs killed her son, plainly enough.', "Atherë trimi ka qitë e i ka thanë: / - Me e vajtue kur t'shkojsh për dru, / Zhurmë n'konak nuk due me m'ba, / Se shkjetë djalin ta kanë vra!"],
        ['18.5', 'If she needs to see it for herself, the Green Valleys is where they put him in the ground.', "N'Lugje t'verdha n'daç me e pa, / Aty djalin n'dhe ta kena shti."],
      ],
      cast: {
        mujo: ['home', 'comes home again and repeats the same lie, then admits under her oath that the Slavs killed her son — but forbids her to wail under his own roof'],
        ajkuna: ['home', 'presses him again, and is told to go mourn only out in the forest'],
      },
    },
    {
      id: 'expelled', title: 'Cast out; curses the moon',
      note: 'Mujo drives her from the house. Alone on the road to the Green Valleys, she curses the moon for sending her no word the night her son died.',
      lines: [
        ['19.1', 'She cries out at the unfairness of a mother left with no son at all — and Mujo has her out of the house before the words finish leaving her mouth.', "- Qyqja nana e padjalë! / Ka nisë grueja me bërtitë, / Sa shpejt jashta Muji e paska qitë."],
        ['19.2', 'She sets off down the road with no one beside her, nothing but the night sky overhead to take in her crying.', "Qyqe vetëm rrugën ma paska marrë, / Kanë xanë vend hyjt vajin për me e ndie."],
        ['19.3', 'Once she reaches the Green Valleys she rounds on the moon itself — cursing it for staying dark and silent that night instead of calling her up in time to share a single grave with her boy.', "Kur ka dalë ndër Lugje t'verdha, / Atherë hanën nana ka mallkue: / - T'u shkimtë drita ty, o mori han-e, / Qi s'ma çove at natë nji fjalë, / N'Lugje t'verdha shpejt me dalë, / Bashkë me hi n'nji vorr me djalë!"],
      ],
      cast: {
        ajkuna: ['grave', 'driven from the house, walks alone to the Green Valleys and curses the moon for sending her no word that night'],
        mujo: ['home', 'stays behind at Jutbina'],
      },
    },
    {
      id: 'wouldHaveBegged', title: 'What she would have begged',
      note: 'She imagines the grave she would have dug herself beside him, begging room of the mountain — and curses the moon again for leaving her childless.',
      lines: [
        ['20.1', 'One grave might not have room for two, she admits, and her son might well have refused it anyway — but she would have opened a second pit for herself, right at his side.', "Ndoshta vorri t'dyve s'na kish xanë, / Ndoshta djali ngjat nuk m'kishte lanë, / Nji vorr t'ri, por kishe çilë për bri,"],
        ['20.2', 'She pictures herself begging the mountain\'s own beech tree for space, begging its stone for space too, and finally dropping to her knees at the black threshing-floor.', "Ahit t'malit rixha i kishe ba, / Gurit t'malit rixha i kishe ba, / Rrahit t'zi ndër kambë i kishe ra."],
        ['20.3', '\'These pastures stretch wide enough for anyone,\' they would have told her, \'take whatever ground suits you — just spare me the little hollow I need\' — and that much, at least, they surely would have allowed her.', "\"Ka qillue bjeshka e gjanë / Gjith ku t'dueni vend me xanë, / Por mue gropën me ma lanë\", / Se aqe vend ma kishin falë."],
        ['20.4', 'A curse on you, moon, she says — what right did you have to leave a mother with no child at all?', "Mallkue kjosh, o mori hanë, / Qysh me e lanë nanën t'padjalë?"],
      ],
      cast: {
        ajkuna: ['grave', 'imagines the grave she would have begged the mountain for, beside her son, and curses the moon again for leaving her childless'],
      },
    },
    {
      id: 'underBeech', title: 'At the grave, under the beech',
      note: 'She finds the grave shaded by a three-hundred-year beech, leans against its branches weeping, and calls to her son to rise and greet her.',
      lines: [
        ['21.1', 'At her son\'s grave stands a beech already three centuries old, its branches spread wide, and the loveliest of them arches directly over the stone.', "Kur ka shkue te vorri i djalit, / Ka pa ahin treqind vjeç, / Ahi ishte rrema-rrema, / Nja ma t'bukrin mbi vorr qi p'e shtri,"],
        ['21.2', 'She rests herself against the tree, and her tears go dripping straight down onto the grave marker.', "Mirë po pshtetet për degë t'ahit, / Pikon lodja mbi vorr t'djalit,"],
        ['21.3', 'Even the birds of the mountain go quiet, breaking off their singing just to look at her.', "Kanë lanë kangën zogjt e malit, / Kanë lanë kangën me veshtrue!"],
        ['21.4', 'Does he not know his own mother has come, she asks him — will he not rise up and welcome her, her precious one?', "Po a s'e din se kush ka ardhë, / Qi nuk çohesh për m'u falë, / More i miri i nanës-ooo?!"],
      ],
      cast: {
        ajkuna: ['lament', 'finds the grave under a great old beech, leans against its branches weeping — the mountain birds fall silent to watch her'],
      },
    },
    {
      id: 'riseOnce', title: 'Rise, just once',
      note: 'She begs Omer to rise from his dark grave just once and speak to her, and asks the moon and stars why they cannot even see him for the beech tree in the way.',
      lines: [
        ['22.1', 'She pleads for just one moment: let him climb out of that black pit and say something to the woman who raised him — he has never once made her wait like this before.', "Amanet, o more bir, / Del nji herë ksi burgut t'errët, / Fol me nanën qi t'ka rritë, / S'm'ke lanë kurr kaq shumë me pritë!"],
        ['22.2', 'Moonlight spills down across the forest, and the countless stars turn to the sun with a question — has he been spotted? — only to be told a beech tree is blocking the view.', "Ka lshue hana rrezet n'pyllë, / Kanë shkrepë hyjzit nëpër qiellë, / Pvesin diellin: \"A e ke pa?\" / \"Nuk po m'len nji ah m'e pa.\""],
        ['22.3', 'What made you take him from me, she demands — they tell her black soil now seals his grave shut, keeping every bit of light from reaching inside.', "Amanet, pse i lae m'u djerrë? / Thuej m'kanë mblue me dhe të zi, / Drita e juej mbrendë mos me hi,"],
        ['22.4', 'So that no cry of hers can reach him and no tear of hers can be seen — oh, her Omer, her own heart\'s treasure.', "Vaji i nanës-o mos m'u ndie, / Lodja e nanës-o veç me m'rri, / Mor Omeri i nanës-ooo!"],
      ],
      cast: {
        ajkuna: ['lament', 'begs Omer to rise just once from his dark grave and speak to her, asking why the light can no longer reach him'],
      },
    },
    {
      id: 'wouldYouRide', title: 'Would you ride again',
      note: 'She offers to bring him his courser, to ride to the springs or up to the zanas, and promises to guard his tombstone herself.',
      lines: [
        ['23.1', 'Shall she fetch his horse for him, she wonders aloud — let him take it out to play again, water it at the cool spring, or ride up where the zanas live.', "A thue gjogun me ta pru? / Del ndoiherë për me lodrue, / Bjen ndër gurra me u freskue, / Kërkon majet bashkë me zana,"],
        ['23.2', 'She herself, she promises, will keep watch over his stone from now on, her own dear treasure.', "Se ty vorrin ta rue nana, / More i miri i nanës-ooo!"],
      ],
      cast: {
        ajkuna: ['lament', 'offers to bring him his courser to ride again, and promises to keep watch over his tombstone herself'],
      },
    },
    {
      id: 'comforted', title: 'The mountain oras comfort her',
      note: 'The mountain oras cannot bear her grief any longer — they hush her wailing, calm her heart, dry her tears, and lead her back down to Jutbina themselves.',
      lines: [
        ['24.1', 'It is more than the mountain oras can stand to witness any longer — gently they quiet her cries and ease the pounding in her chest.', "Orët e bjeshkës ma s'und p'e ndiejnë, / Fjalën n'gojë po ja këthejnë dalë, / Zemrën s'rrahmi ja kanë ndalë,"],
        ['24.2', 'They wipe every tear from her eyes, tend to her face with a gentle hand, and walk her the whole way back down to Jutbina themselves.', "Lott ndër sy mirë po ja krijnë, / Ftyrën lotsh mirë po ja shijnë, / Vetë e bajnë e e çojnë n'Jutbinë."],
      ],
      cast: {
        oret: ['lament', 'cannot bear her grief any longer — hush her wailing, calm her heart, and dry her tears'],
        ajkuna: ['home', 'is led gently back to Jutbina by the mountain oras'],
      },
    },
  ],
}
