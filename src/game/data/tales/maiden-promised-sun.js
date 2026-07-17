// ===========================================================================
// TALE: The Maiden Who Was Promised to the Sun — see ../tales/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it.
// ===========================================================================

export default {
  id: 'maiden-promised-sun',
    title: 'The Maiden Who Was Promised to the Sun',
    source:
      'Auguste Dozon, Manuel de la langue chkipe ou albanaise (Paris 1879), chrestomathie tale IX «La fille promise au soleil», repr. Folklor shqiptar 1 (1963) · read in R. Elsie\'s translation (tale 22, FIRST movement, ¶1-7 — the second movement is the separate goose-girl tale); all lines paraphrased',
    // where the tale comes from — anchors should prefer this region's mirrors
    origin: { region: 'South Albania (Tosk)', collector: 'Auguste Dozon, French consul at Janina', published: 'Paris, 1879' },
    // the ALBANIAN ORIGINAL: every beat line's third element is the verbatim
    // Albanian for that ¶.sentence, transliterated from Dozon's French-based
    // transcription to modern orthography (raw text in `local`).
    albanian: {
      title: '«Çupa e taksur Diellit» (editorial — Dozon prints only the French «La fille promise au soleil»; the Albanian is untitled; the name uses the tale\'s own words, ¶1.5 «taksur»)',
      source:
        'Dozon 1879, chrestomathie pp. 39-41 — his French-based transcription transliterated here to modern orthography (œ→ë, ou→u, û→y, y→j, ç→sh, tç→ç, ky→q, gy→gj, lh→ll, rh→rr, ly→l, ts→c); dialect kept as printed (to të = do të, shkolo = shkollë, dredhi = dreri, kshu = kështu, ahere, gjithinë, baçë, vetsh/thretsh/marrsh/zbretsh); obvious OCR garbles fixed (mhoûçi→mbushi, ngf→nga, ourla→uria, troûpœnœ→çupënë, hâte→hash, Kœtoé→Këtë, nônœ→ndonjë)',
      local: 'docs/references/dozon-vajza-premtuar-diellit.sq.txt',
    },
    // where Elsie's translation and Dozon's Albanian disagree — the beats
    // decide per case which reading our world tells
    discrepancies: [
      'THE VOW (¶1.2): the Albanian queen petitions GOD as well as the Sun («i bënte rixha Perëndisë edhe diellit») and asks first for a SON, «makar një çupë» — or at least a girl; Elsie keeps only the Sun and only the daughter. The beats follow the Albanian.',
      'WHO SUMMONS WHOM (¶3.8, ¶3.12-13): in Elsie the Sun summons the Kulshedra "for her" and then tells her to summon a stag; in the Albanian SHE calls some creatures first («si thirri dhe ajo ca shpesëra»), the Sun adds the Kulshedra to the line-up, and after rejecting it says only «thirrë tjetër shpesë» — call another creature — whereupon SHE calls the stag («ajo thirri dredhinë»). The beats follow the Albanian: choosing the stag is the maiden\'s own act. (The in-game diellThirrKul scene follows Elsie — there the Sun names the stag.)',
      'THE OAK (¶4.2): Albanian «hipë në atë lis» — a lis, an OAK; Elsie prints "tree". The pemaDielli spot should be drawn as a wayside oak.',
      'ONE KULSHEDRA OR TWO (¶5.1): the tree-beast enters indefinite — «shkoi një kuçedrë» / Elsie "A Kulshedra happened by" — so it can be read as a second beast; the lore card, the built quest (pemaVdes: "the jaws that had followed them the whole road home") and these beats read ONE: the house Kulshedra, cheated at the carrier-test. The maiden\'s stall «çap në shtëpi edhe kthehu» then sends it home — to the Sun\'s own house.',
      'THE FEE (¶3.19): Elsie "three okas of fresh hay" — the Albanian fee is plain «tri okë bar» (grass/fodder); «të njomë» (fresh) belongs to the stag\'s eating answer (¶3.16), not to the fee. And the telling closes at the reunion: the hay is never shown paid (the game\'s pallatiKthim ending stages the payment; the beats leave it owed).',
      'THE SPLIT: Dozon\'s tale IX runs straight on past this door into the marble-king / false-bride / goose-girl movement, and Elsie translates both halves as one tale 22. This timeline covers the FIRST movement (¶1-7 of the English); the second belongs to the goose-girl lore card and its own tale file. The raw Dozon extract in `local` keeps both movements.',
    ],
    // THE GAME PROJECTION (see _SCHEMA.md → "How the tale becomes playable"):
    // WHERE our world enters this tale and WHO the player is inside it. A pure
    // projection on top of the faithful timeline — never added to cast[]/beats[].
    play: {
      // beat 5 — play picks up when homesickness cracks the cabbage and the Sun
      // opens the road home. Beats 1-4 (the vow, the school-lane demand, the
      // taking, the house Kulshedra) are PROLOGUE the player learns as lore.
      entry: 'cabbage',
      // the player is NOT in Dozon's tale — a wayfarer who tags along and nudges it
      stance: 'companion',
      // you ride the road at the maiden's side; your place each beat is hers
      with: 'maiden',
      role:
        'You are no one in Dozon\'s telling — a traveller the Sun\'s sky-road sweeps up. You ride the maiden\'s rescue at her side and, when it turns on it, speak to the Sun on her behalf; but the escape is hers to make, and you are along for the road home.',
      // the "▶ the game starts here" line — what actually happens at the entry
      // beat (diellKopsht), authored rather than a generic stance template
      enter: 'you find the maiden in the Sun\'s garden, weeping over a cabbage cracked in her hands',
      // THE PLAYTHROUGH ↔ BEATS MAP: which game node enacts which beat, so the
      // 🎭 playthrough view can lay the shortest route beside the folktale. The
      // shortest path is COMPUTED over the story graph (from → ending); a beat
      // whose scene sits off that route shows as "skippable" (e.g. the cabbage:
      // you can go diellShtepi1→diellOda straight to the Sun and never grieve).
      from: 'diellShtepi1',        // the arc's in-game start (the Sun's house)
      ending: 'pallatiKthim',      // the good ending the shortest route heads for
      scenes: {
        diellShtepi1: 'houseGuest',   // beat 4 — arrival; you witness the Kulshedra
        diellKopsht: 'cabbage',       // beat 5 — the garden (OFF the shortest route)
        diellKopshtFol: 'cabbage',    // beat 5 — you speak with the maiden
        diellOda: 'summons',          // beat 6 — you plead with the Sun
        diellThirrKul: 'summons',     // beat 6 — the creatures are put to the test
        rrugaDielli1: 'antlers',      // beat 7 — onto the stag's antlers, up the tree
        pemaDielli: 'oakParley',      // beat 8 — the Kulshedra at the tree
        rrugaDielli2: 'flight',       // beat 9 — the ride home, the road lied to
        pallatiZi: 'door',            // beat 10 — the black palace, the maiden calls
        pallatiKthim: 'door',         // beat 10 — the door opens; the reunion
      },
      // WHERE THE PROLOGUE IS DISCOVERED: the player never plays beats 1-4 —
      // they piece the backstory together in-world by talking to people and
      // arriving in the Sun's house. Each entry = [storyNodeId, who/what tells
      // it]; the Beats view renders them as 🗺 links onto the World map.
      // (beat 2 'schoolRoad' — the school-lane demand & the mother's stalling —
      //  is a KNOWN GAP: no played node tells it yet; the diagram flags it.)
      learn: {
        vow: [
          ['odaPlak', 'the old man of the oda'],
          ['pallatRojePse', 'the palace guard'],
        ],
        schoolRoad: [
          ['diellKopshtFol', 'the maiden recounts it in the garden'],
        ],
        taken: [
          ['odaPlak', 'the old man of the oda'],
          ['pallatRojePse', 'the palace guard'],
          ['pallatRojeZi', 'the guard · black walls'],
        ],
        houseGuest: [
          ['diellShtepi1', 'witnessed in the Sun\'s house'],
        ],
      },
      // HOW THE GAME RETELLS IT — what the game changes or invents to make the
      // folktale playable (distinct from `discrepancies`, which is translation vs
      // the Albanian original). Each { note, beat? } surfaces on the Beats page.
      divergences: [
        { beat: 'summons', note: 'The onlooker you play does not exist in Dozon\'s tale. There, the maiden herself weeps over the cabbage, the Sun himself offers her the road home, and SHE calls the creatures and picks the stag. The game hands your traveller that intercession so the player has a part to play.' },
        { beat: 'taken', note: 'In the telling the Sun simply carries her to his house — there is no road at all. The game invents the sunbeam-road up from the peak of Tomorr so you can climb to reach her.' },
        { beat: 'oakParley', note: 'The tale\'s maiden always gets the morals right — she refuses the Kulshedra and never comes down from the oak. The game turns those into fatal wrong-choices (keep the Kulshedra → eaten; climb down → eaten) so the stakes are yours to lose.' },
        { beat: 'schoolRoad', note: 'The school-lane demand and the mother\'s stalling are never played; the maiden recounts them to you in the garden instead.' },
        { beat: 'cabbage', note: 'The game gates the Sun behind finding her: you must go down to the garden and see her weeping before you can plead with him. The tale has no such gate.' },
        { beat: 'door', note: 'The stag\'s fee of three okas is left owed when the telling ends; the game stages the payment — the queen carries the hay out to the stag at the door.' },
      ],
    },
    // sentence counts of the first movement's 7 paragraphs (Elsie's translation)
    paragraphs: [8, 4, 19, 3, 5, 2, 3],
    cast: [
      { id: 'maiden', name: 'the maiden', note: 'the queen\'s daughter, vowed to the Sun before her birth', npc: 'vajzaDiellit' },
      { id: 'queen', name: 'the queen', note: 'childless until the vow; paints her palace black when it is kept', npc: 'mbretereshaZeze' },
      { id: 'sun', name: 'Dielli, the Sun', note: 'takes what was promised — and guards it; her protector, not her jailer', npc: 'dielli' },
      { id: 'kulshedra', name: 'the house Kulshedra', note: 'lives in the Sun\'s house; wants the girl from the first sniff', npc: 'kulshedraDiellit' },
      { id: 'stag', name: 'the stag (dredhi)', note: 'the honest carrier — grass, cold water, and a fee of three okas', npc: 'dreriDiellit' },
      { id: 'roadFolk', name: 'the road-folk', note: 'everyone the stag meets — they point the Kulshedra down the wrong roads', npc: 'njerezitUdhes' },
    ],
    // anchor = the game location this tale place inhabits, under THE SHARING
    // RULE (see _SCHEMA.md). This quest is BUILT — every staged place has its
    // node. The tale is SOUTHERN (Dozon, Janina Tosk) but names no city, so
    // the game's village stands in for the royal town.
    places: [
      { id: 'blackPalace', emoji: '🏰', name: 'the queen\'s palace', note: 'the mother\'s house: white, then painted black, then open again',
        anchor: { status: 'existing', node: 'pallatiZi', mirror: 'a pasha\'s konak in the game\'s village — Dozon\'s Tosk telling names no city, so old Tirana\'s quarter stands in for the royal town',
          mold: 'the grieving queen\'s palace: a childless queen\'s vow, a stolen daughter, walls dyed black, a bolted door that opens exactly once — for the returned child\'s voice',
          conflicts: 'NOT kala1/Rozafa (a northern walling-legend castle with no queen) and NOT the moat-king\'s Berat (shpirag1) — a wager-court and this locked house of grief cannot be one household',
          sharedWith: ['goose-girl (the same queen and daughter — its marble garden lies beyond the palace lane)'] } },
      { id: 'schoolRoad', emoji: '🏫', name: 'the school lane', note: 'the maiden\'s daily walk; the Sun speaks to her here',
        anchor: { status: 'existing', node: 'fshatiLanes', mirror: 'the back lanes of the village mëhalla — the walk between the palace door and the school',
          mold: 'the lanes host every daily errand of the quarter; the school itself stays offstage at the lane\'s end; a voice out of the sky over a lane contradicts no one',
          sharedWith: ['the village\'s whole daily life'] } },
      { id: 'sunHouse', emoji: '☀️', name: 'the Sun\'s house', note: 'his hall in the sky, where the Kulshedra also lives',
        anchor: { status: 'existing', node: 'diellShtepi1', mirror: 'the Sun\'s compound on the cloud-plateau above Tomorr (the game reaches it on the sunbeam road — an adaptation; the tale gives no road at all, the Sun simply carries her)',
          mold: 'the Sun\'s own hall: he keeps wards there and his word is law indoors — whatever else lives in or visits the compound obeys it while he watches' } },
      { id: 'sunGarden', emoji: '🌱', name: 'the Sun\'s garden', note: 'the cabbage rows below the hall',
        anchor: { status: 'existing', node: 'diellKopsht', mirror: 'the garden terrace of the Sun\'s compound',
          mold: 'a kitchen-garden in the sky: errands, cabbages, and room for homesickness to surface' } },
      { id: 'sunHall', emoji: '🌞', name: 'the Sun\'s chamber', note: 'where the summoned creatures are put to the question',
        anchor: { status: 'existing', node: 'diellOda', mirror: 'the inner oda of the Sun\'s compound',
          mold: 'where the Sun holds audience — every summons, test and judgement here speaks with his voice' } },
      { id: 'stagRoad', emoji: '🛤️', name: 'the stag\'s road home', note: 'the long way down from the sky to the mother\'s door',
        anchor: { status: 'existing', node: 'rrugaDielli1', mirror: 'the sky-road down from the plateau — the game draws the tale\'s unmapped "way home" as this ride',
          mold: 'the road home from the Sun\'s house: stag-tracks, passers-by, a pursuit — roads accumulate travellers, nothing owns them' } },
      { id: 'theOak', emoji: '🌳', name: 'the wayside oak (lis)', note: 'where the maiden waits out the Kulshedra',
        anchor: { status: 'existing', node: 'pemaDielli', mirror: 'a lone wayside oak on the road down — the Albanian says lis, an oak, though Elsie prints only "tree"',
          mold: 'one climbable oak by the stag-road: a refuge with a single rule — come down for no one' } },
      { id: 'wildPasture', emoji: '🌿', name: 'the grazing wilds', note: 'where the summoned creatures come from, and where the stag goes when hunger takes it',
        anchor: { status: 'offstage', mirror: 'the unfenced grazing world under the whole sky',
          mold: 'never staged — the creatures answer the call out of it and drop back into it; nothing there to clash with' } },
    ],
    items: [
      { id: 'cabbage', emoji: '🥬', name: 'the head of cabbage', note: 'it cracked in her hands the way her mother\'s heart cracked' },
      { id: 'hay', emoji: '🌾', name: 'the three okas of grass', note: 'the stag\'s named fee for the ride home — owed at the mother\'s door' },
    ],
    beats: [
      {
        id: 'vow', title: 'A daughter asked of the Sun',
        note: 'A childless queen goes out day after day begging God and the Sun for any child at all — and pledges the child back to the Sun at twelve. A girl is born, and grows, and walks to school.',
        lines: [
          ['1.1', 'Once there was a queen without a child.', "Ish mos ish, ish një mbretëreshë që nukë kish fëmijë;"],
          ['1.2', 'Day after day she went out pleading — to God and to the Sun — for a boy, or failing that a girl.', "delte edhe i bënte rixha Perëndisë edhe diellit, edhe falej edhe lutej t'i japë një djalë, makar një çupë,"],
          ['1.3', 'Her vow: when the child turned twelve, the Sun could take it back.', "edhe kur të bënetë dymbëdhjetë vjeç, ta marrë përsëri dielli."],
          ['1.4', 'A girl was born to the queen — and grew, and went off to school every day.', "Polli mbretëresha një çupë, që vinte në shkolo gjithinë."],
        ],
        cast: {
          maiden: ['blackPalace', 'born of the vow — her twelfth year already owed'],
          queen: ['blackPalace', 'prayed for any child at all; raises the girl the Sun holds a claim on'],
          sun: ['sunHouse', 'heard the vow from the sky; keeps count of her years'],
          kulshedra: ['sunHouse', 'lives in the Sun\'s house, knowing nothing of the girl yet'],
          stag: ['wildPasture', 'grazes far off, unsummoned'],
          roadFolk: ['stagRoad', 'come and go about the world\'s roads'],
        },
      },
      {
        id: 'schoolRoad', title: 'The demand on the school lane',
        note: 'On her walk to school the Sun tells the girl to remind her mother of the promise. The mother plays for time — she is still too small — and the girl carries that answer back up.',
        lines: [
          ['1.5', 'One day on her way to school the Sun spoke to her: tell your mother to hand over what she vowed me.', "Një ditë tek vinte në shkolo, i tha dielli: «thuaj nënësë të më japë atë që më ka taksur»."],
          ['1.6', 'She went home and repeated the Sun\'s words.', "Vate tek e ëma edhe i tha që: «kshu më tha dielli»."],
          ['1.7', 'Tell the Sun she is still small, the mother answered;', "Edhe ajo i tha: «thuaj diellit që është e vogël»;"],
          ['1.8', 'and on her next walk to school the girl passed that answer up.', "edhe kjo, kur vate në shkolo, i tha diellit."],
        ],
        cast: {
          maiden: ['schoolRoad', 'ferries words between her mother and the sky'],
          queen: ['blackPalace', 'plays for time: the promised thing is still too small'],
          sun: ['schoolRoad', 'leans over the school lane to press his claim'],
        },
      },
      {
        id: 'taken', title: 'Taken on the twelfth year',
        note: 'Past her twelfth birthday the Sun comes out on the school walk, snatches her, and carries her to his house. Her mother understands, dyes the palace black, bolts the door and howls alone inside.',
        lines: [
          ['2.1', 'One day, her twelve years full, the Sun came out on the school walk, seized her, and carried her off to his house.', "Një ditë, kur mbushi të dymbëdhjetë vjet, tek vinte në shkolo, dolli dielli edhe e rrëmbeu edhe e shpuri në shtëpi të tij."],
          ['2.2', 'The mother waited and waited; when the girl never came, she understood — the Sun had collected on her own words.', "Pret e ëma çupënë, po si nukë erdhi, kupëtoi që e mori dielli, pas fjalësë që kish thënë."],
          ['2.3', 'She dyed the whole house black, bolted the door, and never opened it,', "Ngjeu në të zeza të tërë shtëpinë edhe mbylli portënë, edhe nuk' e hapte kurrë,"],
          ['2.4', 'but wept and howled inside, alone.', "po qante edhe ulërinte brënda vetëmë."],
        ],
        cast: {
          maiden: ['sunHouse', 'carried off on her twelfth year'],
          sun: ['sunHouse', 'has taken what was vowed into his own hall'],
          queen: ['blackPalace', 'behind a bolted door in a house dyed black'],
        },
      },
      {
        id: 'houseGuest', title: 'Royal blood in the Sun\'s house',
        note: 'A Kulshedra lives in the Sun\'s house too. It scents the girl at once — royal stock — and the Sun draws the one line that holds it: she is my child, do not touch her.',
        lines: [
          ['3.1', 'A Kulshedra also lived in the Sun\'s house.', "Dielli kish dhe një kuçedrë në shtëpi."],
          ['3.2', 'The moment it made the girl out, it said: she carries the smell of royal stock;', "Ajo kuçedra, si kupëtoi çupënë, tha: «më bie erë soj mbret»,"],
          ['3.3', 'and the Sun drew the line: she is my child — do not touch her.', "edhe dielli i tha: «është çupa ime, po mos e nga»."],
        ],
        cast: {
          kulshedra: ['sunHouse', 'scents royal blood; held back by the Sun\'s one sentence'],
          sun: ['sunHouse', 'names the girl his child and forbids the beast to touch her'],
          maiden: ['sunHouse', 'a ward in the house of her taker'],
        },
      },
      {
        id: 'cabbage', title: 'The cabbage and the broken heart',
        note: 'Sent to the garden for a cabbage, she cuts it — and hears her mother\'s heart in the crack of it. The Sun finds her weeping, hears the homesickness, and offers her the road: call the creatures to carry you home.',
        lines: [
          ['3.4', 'One day the Sun sent her down to the garden to fetch a cabbage, and she went.', "Dërgoi një ditë dielli çupënë në baçë të marrë një lakër, edhe ajo vate."],
          ['3.5', 'Cutting it she said: as this cabbage cracks and cries out, so cracks and cries my mother\'s heart — and the tears came.', "Kur preu lakërnë, tha: «qysh kjo lakra, kshu kërcet edhe thret zëmëra e nënes' sime», edhe qante."],
          ['3.6', 'The Sun saw her crying and asked why — was it longing for her mother?', "Dielli, si e pa që qante, e pyeti edhe i tha: «pse qan? mos të mori malli për nënënë?»"],
          ['3.7', 'Badly, she said; and he told her — if you would go to your own house, call the creatures to carry you home.', "Edhe ajo i tha: «më mori shumë»; edhe ay i tha: «në do të vetsh në shtëpi tënde, të thretsh shpesatë të të shpienë në shtëpi»."],
        ],
        cast: {
          maiden: ['sunGarden', 'cuts the cabbage and weeps for her mother'],
          sun: ['sunGarden', 'finds her in tears and opens the road home'],
        },
        items: { cabbage: ['sunGarden', 'cut — it cracked the way her mother\'s heart cracked'] },
      },
      {
        id: 'summons', title: 'The creatures put to the question',
        note: 'She calls creatures; the Sun adds the Kulshedra to the line and runs the test — hungry? thirsty? "Her. Her blood." Rejected. She calls the stag: grass, cold water, and one fee — three okas of grass from her mother.',
        lines: [
          ['3.8', 'She called a few creatures; the Sun called up the Kulshedra as well, and put the question: if hunger took you, what would you eat?', "Si thirri dhe ajo ca shpesëra, thirri edhe kuçedrën dielli edhe i tha: «në të marrtë uria, ç'to të hash?»"],
          ['3.9', 'Her, said the Kulshedra.', "«Këtë to të ha»."],
          ['3.10', 'And if thirst took you, what would you drink?', "«Në të marrtë etia, ç'to të pish?»"],
          ['3.11', 'This one\'s blood.', "«Gjaknë e kësaj to të pi»."],
          ['3.12', 'No carrier, that — seeing it would never bring her home, the Sun told her to call another creature;', "Edhe dielli, si pa që nuk' to ta shpinte në shtëpi, i tha asaj: «thirrë tjetër shpesë»,"],
          ['3.13', 'she called the stag, and the Sun asked it: will you carry this girl to her house?', "edhe ajo thirri dredhinë, edhe e pyeti dielli: «shpie këtë çupë në shtëpi?»"],
          ['3.14', 'I will, it said.', "«E shpie», tha."],
          ['3.15', 'When hunger takes you, what will you eat?', "«Kur të të marrë uria, ç'to të hash?»"],
          ['3.16', 'Fresh grass.', "«Bar të njomë»."],
          ['3.17', 'When thirst takes you, what will you drink?', "«Kur të të marrë etia, ç'to të pish?»"],
          ['3.18', 'Cold water —', "«Ujë të ftohtë;"],
          ['3.19', 'but when I set her home, her mother must give me three okas of grass.', "po kur ta shpie në shtëpi, të më japë e ëma tri okë bar»."],
        ],
        cast: {
          maiden: ['sunHall', 'calls the creatures; her carrier is found'],
          sun: ['sunHall', 'puts the hungry-and-thirsty test to each candidate'],
          kulshedra: ['sunHall', 'answers honestly — her, and her blood — and is passed over'],
          stag: ['sunHall', 'answers grass and cold water; names a fee of three okas'],
        },
      },
      {
        id: 'antlers', title: 'On the stag\'s antlers',
        note: 'The stag loads her onto its antlers and strides off. Hunger takes it mid-journey; it sets her up a wayside oak with one rule — whoever bids you climb down, stay put until I come.',
        lines: [
          ['4.1', 'The stag took the girl and loaded her onto its antlers.', "Mori dredhi çupënë edhe e ngarkoi në brirë."],
          ['4.2', 'Mid-stride hunger took it, and it told her: up into that oak — and should anyone come and bid you climb down, do not climb down until I come;', "Atje tek çapënte, e mori uria edhe i tha çupësë: «hipë në atë lis, edhe në artë njeri edhe të thotë 'zbrit përposh', ti mos të zbretsh, gjersa të vinj unë»;"],
          ['4.3', 'and up the oak she went.', "hipi dhe ajo në lis."],
        ],
        cast: {
          stag: ['wildPasture', 'off grazing, sworn to come back'],
          maiden: ['theOak', 'perched in the oak under one rule: come down for no one'],
          sun: ['sunHouse', 'his part done; the house is his again'],
          kulshedra: ['sunHouse', 'back in its corner of the house, cheated of its answer'],
        },
      },
      {
        id: 'oakParley', title: 'The parley at the oak',
        note: 'A Kulshedra finds her in the oak: come down, let us talk. She refuses — you would eat me — and when it swears otherwise, she stalls it: walk home first, then come back for me. It goes.',
        lines: [
          ['5.1', 'Then a Kulshedra came by, cast about this way and that, and spotted the girl in the oak,', "Ahere shkoi një kuçedrë edhe, si vështoi andej këtej, pa çupënë në lis,"],
          ['5.2', 'and said: climb down, let us talk;', "edhe i tha: «zbrit përposh, të kuvëndojmë»,"],
          ['5.3', 'and she said: I will not — I am afraid you would eat me.', "edhe ajo i tha: «nukë zbres, se më vjen frikë se mos më hash»."],
          ['5.4', 'I will not eat you, the Kulshedra swore; and the girl countered — walk home first, and come back to fetch me.', "Edhe kuçedra i tha: «nukë të ha»; edhe çupa i tha: «çap në shtëpi edhe kthehu të më marrsh»."],
          ['5.5', 'Off the Kulshedra went;', "Shkoi kuçedra;"],
        ],
        cast: {
          kulshedra: ['sunHouse', 'tramps home as bidden — already meaning to come straight back'],
          maiden: ['theOak', 'keeps the branch, and her nerve'],
        },
      },
      {
        id: 'flight', title: 'Come quickly',
        note: 'The stag returns just as the Kulshedra turns back. "Quick — it comes to eat me!" The stag gallops for the palace, telling every soul on the road to lie: say the girl and the stag went another way.',
        lines: [
          ['6.1', 'then came the stag — and she, seeing the Kulshedra on its way back, cried out: quick, take me, a Kulshedra is coming to eat me.', "ahere vinte dredhi, edhe i thirri, se pa kuçedrënë që vinte: «hajde shpejt të më marrsh, se vjen një kuçedrë të më hajë»."],
          ['6.2', 'The stag took her and raced, telling every soul it met on the road: if a Kulshedra passes, show it nothing — say the girl and the stag went down another road.', "E mori dredhi edhe nxiton, edhe ç'do njeri piqte në udhë, i thonte: «në shkoftë ndonjë kuçedrë, mos të rrëfenë udhënë, po t'i thotë që çupa edhe dredhi shkuanë nga tjetër udhë»."],
        ],
        cast: {
          stag: ['stagRoad', 'gallops for the palace, the girl on its antlers'],
          maiden: ['stagRoad', 'carried at speed, watching the road behind'],
          kulshedra: ['stagRoad', 'comes back for her — and is lied down the wrong roads'],
          roadFolk: ['stagRoad', 'meet the stag and pass the false directions on'],
        },
      },
      {
        id: 'door', title: 'Mother, open the door',
        note: 'They knock at the black palace and nobody opens — until the girl calls out: open, mother, it is your daughter. The door that opened for no one opens, and the mother\'s joy is whole. (The stag\'s three okas stand owed.)',
        lines: [
          ['7.1', 'They reached the mother\'s gate and knocked — but she opened for nobody.', "Arritnë në portë të nënës edhe trëngëllitnë, po këjo nukë hapte portënë."],
          ['7.2', 'Another knock, and the girl called: open, mother — it is I, your daughter.', "Ahere trëngëllit edhe i tha çupa: «hap, o nëne, se jam çupa tënde»."],
          ['7.3', 'She opened the door, and at the sight of her girl her joy was whole.', "Hapi portënë ajo edhe u gëzua si pa çupënë e saj."],
        ],
        cast: {
          maiden: ['blackPalace', 'home — the one voice the black door opens for'],
          queen: ['blackPalace', 'opens at last; her grief breaks into joy'],
          stag: ['blackPalace', 'stands at the gate, its three okas owed'],
          kulshedra: ['stagRoad', 'lost down the wrong roads, still hunting'],
        },
        items: { hay: ['blackPalace', 'three okas of grass owed the stag at the door — the telling ends before they are brought'] },
      },
    ],
}
