// ===========================================================================
// TALE: Gjergj Elez Alia — see ../tales/_SCHEMA.md for the format contract.
// This file is owned by its tale: agents editing other tales must not touch it.
//
// A KRESHNIK SONG, not a prose tale. The bilingual edition runs line-for-line
// (188 verse lines in each language), so the "paragraphs" here are 17
// narrative strophes and a "sentence" is a punctuation-bounded verse unit of
// 1–5 lines; the Albanian third element is the verbatim verse group.
// The game ALREADY STAGES this song as the shore vignette (bregu → balozMotra
// → balozTribut → balozZgjedh → balozLufte → balozKoke → balozFitore) with
// the core NPCs gjergjElez / motraGjergjit / balozi — the beats anchor onto it.
// ===========================================================================

export default {
  id: 'gjergj-elez-alia',
  title: 'Gjergj Elez Alia',
  source:
    'Kângë kreshnikësh sung in Nikaj (District of Tropoja); Visaret e Kombit II, ed. B. Palaj & D. Kurti (Tirana 1937), pp. 42–48 · read in R. Elsie & J. Mathie-Heck\'s translation (Songs of the Frontier Warriors, 2004); all lines paraphrased',
  origin: {
    region: 'North Albania (Gheg) — Nikaj, District of Tropoja',
    collector: 'Bernardin Palaj & Donat Kurti (the Franciscan collectors of the epic)',
    published: 'Tirana, 1937 (Visaret e Kombit II); repr. Folklor shqiptar II, Epika legjendare I, 1966',
  },
  albanian: {
    title: '«Gjergj Elez Alia»',
    source:
      'Visaret e Kombit II (Palaj–Kurti, Tirana 1937), pp. 42–48, in the embedded text of the Albanian PDF Elsie published beside his translation — the edition\'s Gheg orthography kept verbatim (â, nand\', «\'i» = një, konka çue…); only the source\'s straight quotes are set as «»',
    local: 'docs/references/palaj-kurti-gjergj-elez-alia.sq.txt',
  },
  discrepancies: [
    'NINE WOUNDS (¶1.2): AL «Qe nand\' vjet nand\' varra në shtat m\'i ka» — nine years AND nine wounds on his body; Elsie\'s line keeps only the years. The game\'s staged kulla ("një trim ka nëntë plagë") and the beats follow the Albanian.',
    'THE WEAPONS (¶1.4): AL «Armët e brezit ja rendon mbi krye» — the sister ranges his belt-weapons ABOVE HIS HEAD; Elsie hangs them at the foot of the bed. Beats follow the Albanian.',
    'SNAKE AND VIPER (¶4.3): AL «Brevë e gjarpën paçi motër e vlla» — the curse wishes the kulla a snake and a viper FOR SISTER AND BROTHER; Elsie generalises to "tenants". Beats keep the kin-image.',
    'THE FARRIER\'S PRICE (¶8.6): AL «Për n\'m\'i falsh, moj vashë, dy sytë e ballit» — he asks for "the two eyes of your brow", and her retort (¶8.9) answers exactly that image: those eyes were given long ago to her dead parents and to Gjergj. Elsie\'s "your favours" loses the eye-rhyme. Beats keep the eyes.',
    'TWO FARRIERS (¶9.1): the Albanian makes both smiths a nallban (farrier) — one probatin (blood brother), one jaran (friend): «nallbanprobatini» / «nallbanjarani»; Elsie renames the second "blacksmith" to tell them apart. Beats keep the friend-farrier.',
    'THE CLOSING BOAST (¶11.9): AL «Se ktu i thonë-o Gjergj Elez Ali!» — the name-boast closes Gjergj\'s own speech; Elsie recasts it as narration ("Thus spoke his challenge…"). Beats keep it in his mouth.',
    'TWELVE PASH (¶12.3): AL «Dymbëdhetë pash» — twelve arm-spans into the meadow and twelve of dust straight up; Elsie converts the unit to "twenty-four yards" (1 pash ≈ 2 yards). Beats keep the pash.',
    'THE WELL (¶13.2): AL «Me gjithë at m\'nji bunar e ka mbytun» — the trunk is drowned in a WELL (bunar), together with the baloz\'s own steed (at); Elsie gives "a lake" and "the courser". Beats follow the well — the place bunari.',
    'STONE vs CUDGEL (staged vignette): the game\'s balozLufte scene and the lore-card summary arm the baloz with a hurled STONE (gur), where this Nikaj text gives both champions a topuz (cudgel) — variants of the same exchanged blow; the beats follow the text.',
    'AMANET (¶14.4): AL «Amanet motra e Gjergj Elez Alisë!» — the sister is left to the companions as an amanet, a sacred trust of the besa-world; Elsie\'s "assign you" flattens it. Beats keep the amanet.',
  ],
  // 17 strophes of the English translation; sentence counts per strophe
  // (verse units — EN and AL run line-for-line, 188 lines each)
  paragraphs: [5, 6, 4, 6, 6, 8, 4, 9, 5, 4, 9, 6, 3, 4, 3, 4, 5],
  cast: [
    { id: 'gjergj', name: 'Gjergj Elez Alia', note: 'the hero of the nine wounds — nine years abed, one dawn on his feet', npc: 'gjergjElez' },
    { id: 'motra', name: 'the sister', note: 'nine years of spring water, tears and hair-dried blood; the tribute names her last', npc: 'motraGjergjit' },
    { id: 'balozi', name: 'the black baloz', note: 'Balozi i Zi, risen from the sea — his levy taxes roasts, maidens, kreshnik heads and whole regions', npc: 'balozi' },
    { id: 'nallbanProbatini', name: 'the farrier blood brother', note: 'probatin turned lecher — prices the shoeing at the maiden herself', npc: 'nallbanProbatini' },
    { id: 'nallbanJarani', name: 'the friend farrier', note: 'shoes the courser "as if it were his own" (Elsie calls him the blacksmith)', npc: 'nallbanJarani' },
    { id: 'gjogu', name: 'the war-courser', note: 'nine years stabled; kneels at the exact instant the cudgel flies', npc: 'gjoguGjergjit' },
    { id: 'shoket', name: 'the companions', note: 'Gjergj\'s men — heirs of the house, keepers of the amanet, diggers of the one grave', npc: 'shoketGjergjit' },
    { id: 'qyqja', name: 'the cuckoo', note: 'the mourning bird of the coda — searches every pasture and finds no Gjergj', npc: 'qyqjaGjames' },
    { id: 'shtegtari', name: 'the wayfarer', note: 'the mountain passer-by the cuckoo puts under oath: no songs here, only the gjamë', npc: 'shtegtariMalit' },
  ],
  // anchor = the game location this tale place inhabits — REUSE over invention,
  // under THE SHARING RULE. This is a NORTHERN (Gheg) song: mirrors are the
  // northern highlands, Shkodra, and the shore the game already gives the arc.
  places: [
    { id: 'kulla', emoji: '🏰', name: 'the kulla by the shore', note: 'Gjergj\'s tower: the sick-room, the stable, the yard linden he waits under',
      anchor: { status: 'existing', node: 'bregu', mirror: 'a stone kulla of the northern highlands set down by the sea — the song is Nikaj\'s (Tropoja), and its baloz rises from the Adriatic horizon',
        mold: 'the shore village with the nine-wounded hero\'s tower: one hero, one sister, nine years — the game\'s staged baloz vignette (bregu → balozFitore) IS this song compressed, so tale and stage can never clash',
        sharedWith: ['the staged baloz arc (bregu…balozFitore)'] } },
    { id: 'sheher', emoji: '🏘️', name: 'the sheher of the two farriers', note: 'the city the sister rides to — two forges down one lane',
      anchor: { status: 'proposed', node: 'kalaMur', mirror: 'Shkodra, the north\'s market city under Rozafa castle',
        mold: 'the market town BELOW the castle walls: smiths, farriers, the north\'s trades — the hill and the walls stay Rozafa\'s alone',
        conflicts: 'NOT the castle itself — Rozafa\'s walling legend owns the fortress and may not be borrowed for other stories\' stonework; the tale needs only a smithy lane in the town beneath. NOT the village pazar (tregtari) — a Nikaj song\'s «sheher» is the north\'s city, not old Tirana\'s market.',
        proposal: 'draw a smithy lane in the town under Rozafa\'s walls — two forges, the probatin\'s and the jaran\'s' } },
    { id: 'mejdani', emoji: '⚔️', name: 'the war grounds', note: 'fusha e mejdanit — the flat field where the duel is fought at first light',
      anchor: { status: 'existing', node: 'balozLufte', mirror: 'the flat shore-field of the mejdan — the dawn dueling ground of the northern songs',
        mold: 'the ground where the Baloz is answered at dawn; the staged fight and this song\'s duel are one event',
        sharedWith: ['the staged baloz arc'],
        conflicts: 'the staged scene arms the baloz with a hurled STONE where Nikaj\'s text gives both champions a topuz — recorded in discrepancies; same blow, two variants, no second baloz' } },
    { id: 'deti', emoji: '🌊', name: 'the sea', note: 'the water the black baloz rises out of',
      anchor: { status: 'existing', node: 'deti1', mirror: 'the open Adriatic off the shore village',
        mold: 'the horizon of foreign force — what rises from it demands tribute; the open water hosts every tale\'s comings and takings without clash',
        sharedWith: ['bukura-e-detit (her realm is the DEEP, detiThelle1 — the surface horizon is not hers)'] } },
    { id: 'bunari', emoji: '🕳️', name: 'the well by the war grounds', note: 'where the headless trunk and its steed are drowned; the river runs black three years',
      anchor: { status: 'proposed', node: 'balozLufte', mirror: 'the bunar of the song — a dead well at the field\'s edge whose vein feeds the river',
        mold: 'a dead well that took a monster\'s carcass and fouled the river-line for three years — nothing else claims it',
        proposal: 'add a dead well at the war grounds\' edge (and the blood-black river line) for the corpse-drowning scene' } },
    { id: 'varri', emoji: '🪦', name: 'the double grave under the linden', note: 'one wide grave, a cairn, and a linden planted at the head',
      anchor: { status: 'existing', node: 'balozFitore', mirror: 'the one-grave-for-two with a linden at its head that northern song-geography plants by the hero\'s tower',
        mold: 'the coda ground of the staged arc: two hearts stopping together, one grave for two, the lahuta\'s song — exactly this tale\'s ending, already told',
        sharedWith: ['the staged baloz arc'] } },
    { id: 'krahina', emoji: '🏞️', name: 'the taxed country', note: 'the regions the baloz\'s levy walks through, household by household',
      anchor: { status: 'offstage', mirror: 'the coastlands and highland hamlets of the song\'s world',
        mold: 'never staged — the levy\'s victims and Gjergj\'s scattered companions live here between scenes; if ever drawn, it is ordinary countryside, no fixed landmark' } },
    { id: 'varrezaPrinderve', emoji: '🌳', name: 'the parents\' linden', note: 'where mother and father lie rotting, far off',
      anchor: { status: 'offstage', mirror: 'the older family grave under its own linden — lindens shade every grave in this song',
        mold: 'spoken of only in the lament and the sister\'s oath; no scene ever visits — mother and father lie here and nothing more happens' } },
  ],
  items: [
    { id: 'shpata', emoji: '🗡️', name: 'the sword', note: 'of the belt-weapons above the sick-bed; it takes the baloz\'s head' },
    { id: 'topuzi', emoji: '🔨', name: 'the topuz', note: 'Gjergj\'s war cudgel — one true swing, square through the baloz' },
    { id: 'patkojte', emoji: '⚙️', name: 'the bronze shoes', note: 'patkoj prej tumaku, thumba çeliku — the jaran\'s true work on all four feet' },
  ],
  // PLAY — how the game stages this song: the shore baloz vignette
  // (bregu → balozFitore) IS this whole 17-strophe song compressed to seven scenes.
  play: {
    entry: 'nineWounds',
    stance: 'companion',
    with: 'gjergj',
    role:
      'You climb to the shore-tower of Gjergj Elez Alia — nine years bedridden of nine wounds, kept alive only by his devoted sister, who washes them with spring water and dries the blood with her own hair. When the black Baloz risen from the sea demands the coast\'s tribute, and the sister herself, you help Gjergj rise one last time: you put the sword in his hand and stand with him as he goes down to the dawn field and beheads the sea-monster. The danger past, brother and sister embrace and both hearts stop in the same breath, and you lay the two of them in a single grave under one stone.',
    enter: 'you reach the shore-tower where the nine-wounded hero lies abed',
    from: 'bregu',
    ending: 'balozFitore',
    scenes: {
      bregu: 'nineWounds',
      balozMotra: 'nineWounds',
      balozTribut: 'balozRises',
      balozZgjedh: 'tearsForRain',
      balozLufte: 'cudgels',
      balozKoke: 'beheading',
      balozFitore: 'twoHearts',
    },
    divergences: [
      { beat: 'cudgels', note: 'The staged duel and the ending blurb arm the Baloz with a hurled STONE that Gjergj dodges; the Nikaj song gives both champions a topuz (cudgel), buried twelve pash deep in the meadow. Same exchanged blow, two variants — no second monster.' },
      { beat: 'beheading', note: 'The song hauls the headless trunk to a well and drowns it, steed and all, fouling the river black for three years; the game ends the fight at the beheading and simply frees the coast of its tribute — the bunar and the three-year stench are dropped.' },
      { note: 'The outer frame vanishes: the sister\'s ride to the two farriers, the bequest of halls and goods, the sister left to the companions as amanet, and the mourning cuckoo of the coda. The player, not Gjergj\'s scattered men, digs the single grave under one stone.' },
    ],
  },
  beats: [
    {
      id: 'nineWounds', title: 'Nine years, nine wounds',
      note: 'A hero above heroes lies nine years with nine wounds, kept alive by one sister — spring water, her tears, her hair to dry the blood, the parents\' clothes on his body, the weapons ranged above his head.',
      lines: [
        ['1.1', 'A hero above all heroes, this Gjergj Elez Alia!', "Trim mbi trima ay Gjergj Elez Alija!"],
        ['1.2', 'Nine years now he has carried nine wounds on his body (Elsie keeps only the years).', "Qe nand' vjet nand' varra në shtat m'i ka!"],
        ['1.3', 'One sister alone keeps his pillow night and day, washing the nine-year wounds with spring water and with her own tears, drying the blood with the hair of her brow.', "Veç nji motër nat' e ditë te kryet, / Ja lan varrat me ujt e gurrës nandvjeçe, / Ja lan varrat me ata lott e syve, / Ja terë gjakun me ata flokët e ballit,"],
        ['1.4', 'She binds his frame in their mother\'s shawl, dresses him fine in their father\'s clothes, and ranges his belt-weapons above his head (Elsie hangs them at the bed\'s foot).', "Shtatin vllaut ja shtërngon m'ruba të nanës, / N'petka t'babës trupin ja hijeshon, / Armët e brezit ja rendon mbi krye!"],
        ['1.5', 'Every time she turns his body the brother forgets the pain of the wounds — it is his sister\'s pain that strikes him dead to the ground.', "Sa herë trupin motra p'e tërnueke, / Dhimbn e varrëve vllau krejt e harrueke, / Dhimba e motrës dekun n'tokë e lëshueke!"],
      ],
      cast: {
        gjergj: ['kulla', 'nine years down with nine wounds, weapons ranged above his head'],
        motra: ['kulla', 'night and day at the pillow — spring water, tears, her hair for the blood'],
        balozi: ['deti', 'out past the horizon, not yet risen'],
        nallbanProbatini: ['sheher', 'at his forge — blood brother to the house, untested'],
        nallbanJarani: ['sheher', 'at his forge down the same lane — a friend, untested'],
        gjogu: ['kulla', 'nine years stabled, unridden and unshod'],
        shoket: ['krahina', 'at their own hearths, scattered through the country'],
        qyqja: ['krahina', 'a grey bird of the high pastures, no mourner yet'],
        shtegtari: ['krahina', 'walks the mountain paths, only passing through'],
      },
      items: {
        shpata: ['kulla', 'ranged with the belt-weapons above the sick-bed'],
        topuzi: ['kulla', 'by the weapons, nine years unswung'],
      },
    },
    {
      id: 'balozRises', title: 'A black baloz out of the sea',
      note: 'Word runs through the land: a black baloz has risen from the sea and laid a levy on the country — a roast ram and a maiden per household, a kreshnik beheaded daily, a region burned weekly. The turn reaches Gjergj\'s house.',
      lines: [
        ['2.1', 'A cry has gone out and covered the land: a black baloz has come up out of the sea.', "Â dalë zani e paska marrun dhenë, / Se 'i baloz i zi â dalë prej detit."],
        ['2.2', 'A vicious, bullying champion he was, and he has thrown a crushing levy on the country:', "Trim i prapët e belagji qi ish' kanë, / Ja ki' qitun dheut nji rreng të randë:"],
        ['2.3', 'house by house a roast ram, house by house a maiden sent down to him,', "«Tim për tim kah nji dash të pjekun, / Tim për tim kah nji vashë me ja djergun,»"],
        ['2.4', 'day upon day a kreshnik cut down, week upon week a region burned (Elsie: "ravaged").', "«Ditë me ditë kah nji kreshnik me premun, / Javë për javë kah nji krahinë me djegun!»"],
        ['2.5', 'Now the turn has come round to Gjergj, and the hero\'s cheeks have flooded with tears.', "Edhe Gjergjit rendi te i ka ardhë, / Me lot faqet trimit m'iu kanë mbushë."],
        ['2.6', 'How can the honour of the house be let fall into the baloz\'s hand?!', "Erzi i shpisë qysh lshohet n'dorë t'balozit?!"],
      ],
      cast: {
        balozi: ['deti', 'risen from the water; his levy cried through every region'],
        gjergj: ['kulla', 'the levy\'s turn reaches his house; his cheeks flood with tears'],
        shoket: ['krahina', 'pay the ram and dread the maiden-turn under the levy'],
      },
    },
    {
      id: 'lament', title: 'The sister\'s lament',
      note: 'The sister breaks out keening: death has forgotten them — parents rotting under a linden, the brother nine years entombed alive, and now her body claimed by the black baloz. Better the kulla fall in and be their cairn.',
      lines: [
        ['3.1', 'The sister has broken out and cries aloud, weeping over Gjergj through her tears:', "Ja ka nisë e motra e po bërtet, / Krejt me lot Gjergjin p'e loton:"],
        ['3.2', 'how has death managed to forget us, brother? — mother and father rotting under a linden, the brother\'s body entombed nine years in the house,', "- Po qysh mordja, o vlla, me na harrue? / Nanë e tatë kah kalben për nan bli, / Trupi i vllaut vorrue qe nandë vjet në shpi,"],
        ['3.3', 'and the sister\'s body to pass into the black baloz\'s hand?!', "Trupi i motrës n'dorë t'balozit t'zi?!"],
        ['3.4', 'Why doesn\'t the kulla cave in and take us, the house turn into our cairn, and so keep the honour safe?', "Qysh s'u shemka kulla me na xanë, / Qysh s'u kthyeka shpija n'nji muranë, / Me t'pshtue erzin, mori e zeza nanë!"],
      ],
      cast: {
        motra: ['kulla', 'keens over him — better the kulla fall on us than the levy be paid'],
      },
    },
    {
      id: 'tearsForRain', title: 'Tears mistaken for rain',
      note: 'Her grief splits his heart in two. He opens his eyes and rages at the kulla itself — moss take it, snakes keep it, how dare it drip rain on the bedding — and she must tell him: no rain falls; those drops are your sister\'s eyes.',
      lines: [
        ['4.1', 'At her words the man\'s heart parts in two pieces; he turns his two eyes to his sister, two streaks of tears running down his face.', "Dy copësh zemra djalit iu ka da, / Dy sytë në ballë motrës ja ka lshue, / Dy rigë lot për faqe te i kanë shkue."],
        ['4.2', 'Two words he flings at the kulla itself:', "Dy fjalë kullës djali ja ka fjakrue:"],
        ['4.3', 'blacken, you halls of mine — moss smother you bottom to top, and may a snake and a viper be the sister and brother you keep (Elsie: "tenants") —', "- He, ju u nxisha, mori sarajet e mija, / Me lymashk u mbloshi n'fund e n'krye, / Brevë e gjarpën paçi motër e vlla,"],
        ['4.4', 'how could you let raindrops onto the bedding so soon?!', "Pikët ndër shtroje kaq shpejt qysh m'i lshuet?!"],
        ['4.5', 'No, brother, the sister answers him — the fever has worn you out and you don\'t know what you are saying;', "- Jo, more vlla, lum motra, i ka përgjegjë, / T'ka lodhë jermi e s'po di ç'je kah folë;"],
        ['4.6', 'no rain is falling outside — it is your sister\'s eyes that drip on you, brother!', "Se përjashta shi nuk asht tuj ra, / Sytë e motrës po t'pikojnë, more vlla!"],
      ],
      cast: {
        gjergj: ['kulla', 'heart split in two; curses the tower for rain that is her tears'],
      },
    },
    {
      id: 'brotherAsks', title: 'Have I ever left you wanting?',
      note: 'Gjergj presses her hand and asks, more piercingly than ever in nine years: why weep and cut my heart in two — did your brother ever leave you short of food, drink, clothes? Did a hard word ever fall — or a wish for a husband?',
      lines: [
        ['5.1', 'Then Gjergj pressed her hand in his, strokes it gently with his own hands, studies her well with two longing eyes.', "Qatherë Gjergji dorën ja ka shtërngue, / Mirë po e limon me ato duert e shtatit, / Mirë po e kqyrë me ata dy sytë e mallit!"],
        ['5.2', 'Never had the man spoken to her more piercingly:', "Kurr ma thekshim djali s'i ka folë:"],
        ['5.3', 'I charge you, sister — why do you weep? Why do you cut my heart in two?', "- Amanet, mori motër, pse po kan? / Zemrën dysh, mori motër, pse ma dan?"],
        ['5.4', 'Nine years this body has been rotting; your Gjergj gets no other rest — he only trembles like a beech leaf in a sun-warmed glade.', "Qe nandë vjet, qi trupi â tu m'u kalbë, / Gjergji i yt tjetër pushim nuk ka, / Veç si gjethi i ahit n'log t'shullanit."],
        ['5.5', 'Say — did you ever go without food and drink? Did your brother leave you poorly dressed or shod?', "A thue s'pate me ngranë e me pi? / A t'la keq ty vllau për veshë e mbathë?"],
        ['5.6', 'Did he ever weigh on you with a word, wear his poor sister\'s patience down — or has a longing for a husband perhaps come over you?', "A mos t'u randue, ndoiherë, me fjalë, / Motërzezës vllau me iu mërzitë, / Huj për burrë ndoshta qi me t'ra?"],
      ],
      cast: {
        gjergj: ['kulla', 'presses her hand: did I ever leave you wanting — or do you wish a husband?'],
      },
    },
    {
      id: 'sisterAnswers', title: 'Buried alive before married',
      note: 'She lays his hand on her forehead: has the fever squeezed you so? I would go living into the earth before I married. I lacked nothing, and you never spoke a heavier word than today — but nine springs have passed, and how am I to walk to the baloz\'s door?',
      lines: [
        ['6.1', 'How well the sister answers her brother, laying his hand against her forehead:', "Sa mirë motra vllaut po m'i përgjegjë, / Dorën e vllaut tu balli e paska vndue:"],
        ['6.2', 'where are you, my young beech shoot — can the fever truly have squeezed you so hard?', "- Amanet ku je, mori njomzëja e ahit, / Po a kaq fort, thue, jermi t'ka ngushtue?"],
        ['6.3', 'I would go living into the earth before this sister ever married!', "Hisha gjallë në dhe, n't'u martue motra!"],
        ['6.4', 'I have had plenty to eat and to drink, plenty to wear and be shod in — and never a heavier word from you than today\'s!', "Mjaft kam pasë, o vlla, me ngranë, me pi, / Mjaft kam pasë me veshë edhe me mbathë, / Kurr ma randë se sot ti folë nu' m'ke!"],
        ['6.5', 'Other father I have none, nor other mother.', "Tjetër babë nuk kam, as tjetër nanë,"],
        ['6.6', 'Only do not take it hard, brother, for the one grief I must weep out to you today:', "Amanet, more vlla, mos me m'pasë randë, / Për nji dert qi sot po due me t'kajtë!"],
        ['6.7', 'nine springs, and this body of yours never freshened; this frame never stood and made the doorway; and this sister never once withered away (Elsie: never complained).', "Qysh s'u njom ky shtat qe nandë prendvera! / Si s'u mkamb ky trup me dalë tu dera! / Si s'u tha kjo motër, thafta-e vera."],
        ['6.8', 'But I — how am I to walk to the baloz\'s door?', "Po un balozit qysh i shkoj tu dera?"],
      ],
      cast: {
        motra: ['kulla', 'answers: living into the earth before married — but how can I go to the baloz\'s door?'],
      },
    },
    {
      id: 'onHisFeet', title: 'On his feet after nine years',
      note: 'In one bound the man is standing. Take the war-courser, sister — straight to the city, to the farrier my blood brother: bronze shoes, steel nails, for I go out to the baloz. And if he will not shoe it, knock at my friend\'s door.',
      lines: [
        ['7.1', 'At that the man has come up onto his feet in one bound.', "Braf në kambë por djali konka çue."],
        ['7.2', 'Take my courser of the mejdan, sister; ride him straight into the city and go to the farrier — my blood brother.', "- T'e marrsh gjogun, motër, të mejdanit, / Fill n'gjytet me te, motër, të m'bijsh / E t'më shkojsh tu nallbanprobatini!"],
        ['7.3', 'Say: greetings — Gjergj has sent you word: shoe him in shoes of bronze and drive the nails of steel, for I mean to go out to the baloz on the duel-field!', "«Falëmeshndet, thuj Gjergji të ka çue, / Me ma mbathë me patkoj prej tumakut, / Me m'ja shti thumbat prej çelikut, / Se n'mejdan balozit due me i dalë!»"],
        ['7.4', 'And should he not agree to shoe your brother\'s horse, mount up and knock at the friend\'s door instead.', "S'u gjegj gjogun vllathi me ta mbathë, / Hypi atit, bjeri n'derë jaranit."],
      ],
      cast: {
        gjergj: ['kulla', 'up on his feet in one bound; orders the courser shod for the mejdan'],
      },
    },
    {
      id: 'probatin', title: 'The blood brother\'s price',
      note: 'In the sheher the sworn brother answers her greeting crookedly: her eyes\' favour for the shoeing. Her fury scorches him — she set out for a probatin\'s door and found a gypsy\'s; her eyes were given long ago, to the dead parents and to Gjergj.',
      lines: [
        ['8.1', 'Down into the sheher the girl has come, and gone to the farrier blood brother.', "E në sheher çika konka ra / Edhe â shkue tu nallbanprobatini."],
        ['8.2', 'Good speed to your work, kumbar!', "- Puna e mbarë të kjoftë, more kumbar!"],
        ['8.3', 'And good speed to you, maiden from afar!', "- Të mbarë paç, ti mori vasha e largë!"],
        ['8.4', 'Greetings — Gjergj has sent you word: shoe his courser well and truly, set the bronze shoes, drive the steel nails, for he means to go out to the baloz on the duel-field!', "- Falëmeshndet ty Gjergji të ka çue, / Me ma mbathun gjogun mirë e mirë, / Me ma vndue patkojto prej tumakut, / Me m'ja shti thumbat prej çelikut, / Se n'mejdan balozit due me i dalë!"],
        ['8.5', 'Crooked came the farrier blood brother\'s answer:', "Mbrapshtë po folë aj nallbanprobatini:"],
        ['8.6', 'grant me, girl, the two eyes of your brow (Elsie: "your favours"), and I\'ll have brother Gjergj saved from the duel — I\'ll make his courser fly like the wind!', "- Për n'm'i falsh, moj vashë, dy sytë e ballit, / Ta kam pshtue vlla-Gjergjin prej mejdanit, / E baj gjokun me fjurue si era!"],
        ['8.7', 'What fury took the girl at that!', "Se me idhnim çika e kite marrë!"],
        ['8.8', 'What talk is this, man — may your mouth dry up! I set out for the door of a blood brother — nine years the courser has not come this way — and forgive me, it is a gypsy\'s door I have struck!', "- Ç'je kah thue, bre burrë, goja t'u thaftë! / Jam kanë nisë tu dera e probatinit, / Qe nandë vjet, qi gjogu ksajt s'â ra, / M'fal se ndeshkam derën e magjupit!"],
        ['8.9', 'For these eyes I gave away once and for all — to father and mother rotting under the earth, and to my Gjergj, rotting of wounds above it!', "Se kta syj nji herë un ua kam falë / Tatës e nanës, qi kalben për nan dhe, / Gjergjit tem, qi kalbet varrësh mbi dhe!"],
      ],
      cast: {
        motra: ['sheher', 'greets the blood brother — and burns his lewd price to ash with her answer'],
        gjogu: ['sheher', 'led to the faithless forge, still unshod'],
        nallbanProbatini: ['sheher', 'names her eyes as his price for the shoeing — a probatin turned magjup'],
      },
    },
    {
      id: 'jaran', title: 'Shod as if it were his own',
      note: 'The friend-farrier hears the same message and shoes the courser as if it were his own — bronze and steel. By evening the girl turns home and finds her brother waiting in the shade of the linden.',
      lines: [
        ['9.1', 'The sister has gone on to the friend farrier (Elsie makes him a blacksmith).', "A shkue motra tu nallbanjarani."],
        ['9.2', 'Greetings, she says — Gjergj has sent you word: his duel-hour is appointed; shoe this courser the very best you know how!', "- Falëmeshndet, thotë, Gjergji të ka çue, / Kam orokun e mejdanit. / Sa ma mirë ket gjog ti me ma mbathë!"],
        ['9.3', 'He told me: shoes of bronze, and drive the nails of steel — for he goes out to cut against the baloz of the sea!', "Thanë m'ka për patkoj prej tumakut, / Me m'ja shti thumbat prej çelikut, / Se do t'dal m'u pre me baloz t'detit!"],
        ['9.4', 'As if the horse were his very own, he shod it.', "Si per vedi gjogun e ka mbathë"],
        ['9.5', 'And by evening the girl has turned for home, and found her brother waiting in the shade of the linden.', "Edhe n'pramje çika â dredhë në shpi; / Ka gjetë vllan tu e pritë nën hije t'blinit."],
      ],
      cast: {
        nallbanJarani: ['sheher', 'shoes the courser as if it were his own — bronze shoes, steel nails'],
        motra: ['kulla', 'home by evening; finds her brother in the linden\'s shade'],
        gjogu: ['kulla', 'shod for the mejdan, bronze and steel on all four feet'],
        gjergj: ['kulla', 'waits under the yard linden for horse and sister'],
      },
      items: { patkojte: ['gjogu', 'the jaran\'s true work — bronze on all four feet, steel-nailed'] },
    },
    {
      id: 'greetings', title: 'A greeting for the baloz',
      note: 'And what had the hero been doing? Sending the baloz a "greeting" of his own: out early to the duel-field. No maiden has grown here for you, no rams been fattened; one sister is all, and she is not given — who else would bind his wounds?',
      lines: [
        ['10.1', 'And what had the hero, Gjergj Alia, been doing meanwhile?', "Ça kish ba ay trimi Gjergj Alija?"],
        ['10.2', 'A «greeting» of his own he had sent the baloz: come out early to the field of the duel!', "«Falëmeshndet» balozit m'i ka çue: / - Me dalë heret n'at fushën e mejdanit!"],
        ['10.3', 'No girl has happened to grow in this house for you, baloz; the rams of my fold have not been fattened for you;', "Çikë për ty, baloz, nu' m'ka qillue, / Desht e vathit për ty nu' m'janë majë,"],
        ['10.4', 'one sister is all I have, and her I cannot let go — there is no one else to bind the wounds of my body!', "Sall nji motër, nu' po muj me lshue. / Varrët e shtatit s'â kush qi m'i lidhë!"],
      ],
      cast: {
        gjergj: ['kulla', 'his «greeting» gone out to the baloz: dawn, the war grounds, and never the sister'],
        balozi: ['deti', 'holds the summons; will come out at first light'],
      },
    },
    {
      id: 'kanun', title: 'The forefathers\' kanun',
      note: 'At first light the champions meet and trade taunts — "have you climbed out of the grave, Gjergj?" He answers with the old law: arms are handed over first and goods after, and no sister goes to a baloz unfought. Brace yourself: here stands Gjergj Elez Alia.',
      lines: [
        ['11.1', 'As the first light began to whiten the peaks, the champions came out onto the duel-field.', "Sa ka nisun drita me zbardhë majet, / N'fushë të mejdanit trimat konkan dalë."],
        ['11.2', 'Hard words the champions start hurling at one another:', "Keq me fjalë trimat shoshojnë po rrekin:"],
        ['11.3', 'is it out of the grave, Gjergj, that you have climbed…? Why drag me out, man, onto this duel-field?', "- P'a prej vorrit, Gjergj, ti konke çue...? / Pse me m'qitë, bre burrë, n'ket fushë t'mejdanit?"],
        ['11.4', 'How well the hero gave the baloz his answer:', "Sa mirë trimi i ka përgjegjë balozit:"],
        ['11.5', 'bless your mouth, baloz — well said! Nine years I have been walking the grave-road, and a step short of it, baloz, you turned me back.', "- Të lumët goja, baloz, mirë po thue! / Qe nandë vjet qi kam marrë rrugn e vorrit, / Pak pa mrrijtë baloz, ti m'ke dredhue."],
        ['11.6', 'You asked for my sister before any duel; you asked for the sheep without asking their shepherd.', "M'ke lypë motrën para se mejdanin, / M'ke lypë berret para se çobanin"],
        ['11.7', 'So I have turned out on this ground to show you what our forefathers left us for a kanun:', "E jam dredhë n'ket log për me t'kallxue, / Se ne t'parët nji kanu na kanë lanë:"],
        ['11.8', 'arms are handed over first and the goods only after; and never is a sister given to a baloz without first cutting at each other on the duel-field!', "«Armët me dhanë përpara e mandej gjanë, / Kurr balozit motrën mos m'ja dhanë, / Për pa u pre n'at fushën e mejdanit!»"],
        ['11.9', 'So brace yourself, baloz, for your day has come — for the one standing here is called Gjergj Elez Alia! (Elsie recasts this boast as narration.)', "Por shtërngou, baloz, se t'ka ardhë dita, / Se ktu i thonë-o Gjergj Elez Ali!"],
      ],
      cast: {
        gjergj: ['mejdani', 'answers the grave-taunt with the forefathers\' kanun'],
        balozi: ['mejdani', 'out at first light, taunting the man risen from the grave'],
        gjogu: ['mejdani', 'under his rider for the first time in nine years'],
        motra: ['kulla', 'at the tower door, watching the light come up over the peaks'],
      },
      items: {
        shpata: ['gjergj', 'at his belt on the field'],
        topuzi: ['gjergj', 'in his fist at dawn'],
      },
    },
    {
      id: 'cudgels', title: 'The turn of the cudgels',
      note: 'They drive the two coursers head to head. The baloz\'s cudgel flies as Gjergj\'s courser drops to its knees — twelve pash into the meadow, twelve pash of dust. Then Gjergj\'s turn: one true swing takes the baloz square through the middle, and the field shakes.',
      lines: [
        ['12.1', 'They drove the two coursers at each other, head against head.', "E i kanë ba dy gjogat tim me tim"],
        ['12.2', 'The baloz took his aim with the cudgel; Gjergj\'s courser dropped onto its two knees, and the cudgel went whistling away over their heads.', "E n'topuz balozi e ka shinue. / N'dy gjujt gjogu Gjergjit te i ka ra, / Përmbi kryet topuzi i ka fjurue,"],
        ['12.3', 'Twelve pash deep the cudgel buried itself in the meadow; twelve pash straight up the dust rose like a cloud (Elsie converts to twenty-four yards).', "Dymbëdhetë pash m'ledinë u ngul topuzi, / Dymbëdhetë pash përpjetë, si re, u çue pjuhni."],
        ['12.4', 'Then the turn came round to Gjergj.', "Atherë Gjergjit rendi te i ka ardhë."],
        ['12.5', 'How truly the hero swung his cudgel — square through the baloz\'s middle it struck!', "Sa mirë trimi n'topuz qi ka dredhë, / Lik përmjet balozit te i ka ra!"],
        ['12.6', 'The whole field shook when the baloz came down!', "Â trandë fusha kur â rrxue balozi!"],
      ],
      cast: {
        balozi: ['mejdani', 'his cudgel spent twelve pash deep in the meadow; struck down mid-body'],
        gjergj: ['mejdani', 'swings his turn true — the baloz down, the field shaking'],
        gjogu: ['mejdani', 'knelt at the exact instant — the shoeing that saved its rider'],
      },
      items: { topuzi: ['mejdani', 'thrown true — it broke the baloz square through the middle'] },
    },
    {
      id: 'beheading', title: 'The head from the trunk',
      note: 'In an instant the sword is out and the head off. He drags the trunk by the feet and drowns it, steed and all, in a well; the river runs black with the blood, and for three years the whole country stinks of it.',
      lines: [
        ['13.1', 'In an instant the hero has drawn his sword and hacked the head clean from the trunk.', "Meiherë trimi shpatën ma ka nxjerrun, / Kryet me neje trupit ja ka damun,"],
        ['13.2', 'He hauled the carcass off dragging by the feet, and drowned it — steed and all — in a well (Elsie: "a lake", "with the courser").', "Zhag për kambet trupin e ka ngrehun, / Me gjithë at m'nji bunar e ka mbytun,"],
        ['13.3', 'The whole river ran fouled with the blood, and for three years it left the country stinking.', "Të tanë lumën gjaku e ka tërzue, / Për tri vjet krejt vendin e ka qelbun."],
      ],
      cast: {
        gjergj: ['bunari', 'takes the head, drags the trunk, drowns it steed and all'],
        balozi: ['bunari', '☠ headless, drowned in the well with his own steed; the river black for three years'],
      },
      items: { shpata: ['gjergj', 'wet from the one stroke that took the head'] },
      exit: ['balozi'],
    },
    {
      id: 'bequest', title: 'The bequest',
      note: 'The victor turns home and gathers all his companions: hear me — my halls are yours, my money is yours, every good of the house is yours. And the sister of Gjergj Elez Alia is left to you as amanet, a sacred trust.',
      lines: [
        ['14.1', 'Then the hero turned back toward home, and gathered all his companions together:', "Qatherë trimi â nisë me dredhë tu shpija / Edhe shokët të gjithë m'i ka bashkue:"],
        ['14.2', 'Hear me now, my companions!', "- Pa ndigjoni, more shokët e mij!"],
        ['14.3', 'My halls I give over to you! All my money I give over to you! And every good and chattel of the house be yours!', "Falë u kofshin sarajet e mija! / Falë u kofshin tanë paret e mija! / E u koftë falë krejt malli e gjaja e shpisë!"],
        ['14.4', 'And the sister of Gjergj Elez Alia — an amanet, a sacred trust, in your keeping!', "Amanet motra e Gjergj Elez Alisë!"],
      ],
      cast: {
        gjergj: ['kulla', 'gives away halls, money and goods; leaves his sister as amanet'],
        shoket: ['kulla', 'gathered in from the country to hear the bequest'],
        gjogu: ['kulla', 'stabled again, its one errand done'],
      },
      items: {
        shpata: ['kulla', 'hung up — given away with the house'],
        topuzi: ['kulla', 'brought home — given away with the house'],
      },
    },
    {
      id: 'twoHearts', title: 'Two hearts stop at once',
      note: 'The hero spends the last strength of his body taking his poor sister in his arms — and in the same breath both hearts stop. Brother and sister drop down dead; no soul ever left a body better.',
      lines: [
        ['15.1', 'Then the hero gave what strength was left in his body to take his poor sister up in his arms —', "Edhe shtatit trimi i paska dhanun, / Motërzezën ngrykas kesh me e marrun,"],
        ['15.2', 'and in the same instant the two hearts stopped; brother and sister dropped down dead!', "Të dy zemrat priherë por janë ndalun, / Vlla e motër dekun paskan ramun!"],
        ['15.3', 'No one\'s soul ever left the body better than theirs!', "Kurkuj shpirti ma mirë s'i ka dalun!"],
      ],
      cast: {
        gjergj: ['kulla', '☠ his last strength spent on the embrace; his heart stops'],
        motra: ['kulla', '☠ dies in the same embrace, the same instant'],
      },
      exit: ['gjergj', 'motra'],
    },
    {
      id: 'oneGrave', title: 'One grave for two',
      note: 'The companions raise the great gjamë. They open one wide grave for brother and sister in each other\'s arms, finish a fair cairn over it so the two are never forgotten, and set a linden at their head for the summer bird to rest in.',
      lines: [
        ['16.1', 'A great gjamë — the men\'s death-wail — the companions raised for them!', "Gjamë të madhe shokët qi m'i kanë ba!"],
        ['16.2', 'They open one wide, fair grave, to hold brother and sister in each other\'s arms,', "Po ja çilin nji vorr bukur të gjanë, / Vlla e motër ngrykas për me i xanë"],
        ['16.3', 'and a handsome cairn they finished over it, that brother and sister might never be forgotten.', "E 'i muranë të bukur e kahë mbarue, / Vlla e motër kurr mos me u harrue."],
        ['16.4', 'And a fair linden they set at their head, where the summer bird might always come to rest.', "E 'i bli t'bukur, qi m'ja vndojnë tu kryet, / Zogu i verës gjithmonë me pushue."],
      ],
      cast: {
        shoket: ['varri', 'wail the gjamë; dig the wide grave, raise the cairn, plant the linden'],
      },
    },
    {
      id: 'cuckoo', title: 'The cuckoo finds no one',
      note: 'When the mountain leafs again, a cuckoo lights on the cairn and finds the linden withered; on the black hall, and finds the roof fallen in. From a window it puts a passing wayfarer under oath: sing no song here — take up the gjamë — for it has searched every pasture and house and nowhere found Gjergj Elez Alia.',
      lines: [
        ['17.1', 'When the mountain began to break into leaf, the cuckoo stopped on the cairn of the new grave — and found the linden withered in all its branches.', "Kur ka nisun mali me dushkue, / Â ndalë qyqja n'muranë t'vorrit t'ri, / Ka gjetë blinin të tanë degash tha."],
        ['17.2', 'It flew on over a blackened hall, and found the rooftop fallen in to the ground.', "Ka flurue përmbi 'i saraj të zi, / Ka gjetë kulmin të tanë shembë për dhe."],
        ['17.3', 'It perched itself on a window ledge, and put a wayfarer passing by under oath:', "M'nji prezor si m'paska hypë, / Ka përbe shtegtarin kah po shkon:"],
        ['17.4', 'hear me, wayfarer of the mountain! If you come singing this way, hush your song here; if you come weeping this way, take up the gjamë here!', "- Amanet, more shtegtari i malit! / N'kofsh tuj kndue ksajt, kajkën me e pushue. / N'kofsh tu kajtë ksajt, gjamën për me e xanë!"],
        ['17.5', 'For I have hunted everywhere, mountain pasture to mountain pasture; I have wintered everywhere, meadow to low meadow; I have grieved everywhere, house to house — and nowhere did I come upon Gjergj Elez Alia!', "Kah kërkova gjithkund bjeshkë e m'bjeshkë, / Kah verova gjithkund vrri e n'vrri, / Kah mjerova gjithkund shpi e n'shpi, / Kërkund s'ndesha m'Gjergj Elez Ali!"],
      ],
      cast: {
        qyqja: ['kulla', 'from the withered grave-linden to the roofless tower window, charging passers-by to mourn'],
        shtegtari: ['kulla', 'stopped under the ruined tower, put under oath: no song here, only the gjamë'],
        shoket: ['krahina', 'scattered back to their hearths, the house and the memory in their keeping'],
      },
    },
  ],
}
