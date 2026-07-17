// ===========================================================================
// TALE: Sari Salltëk — the dragon-slaying dervish — see ../tales/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it.
// ===========================================================================

export default {
  id: 'sari-salltek',
    title: 'Sari Salltëk — the dragon-slaying dervish',
    source:
      'Jules Alexandre Degrand, Souvenirs de la Haute-Albanie (Paris 1901), pp. 236-243 · read in R. Elsie\'s translation (Oral Literature | Legends, legend_02.html); all lines paraphrased',
    // where the tale comes from — anchors should prefer this region's mirrors
    origin: { region: 'Central Albania (Krujë, Gheg-speaking) — the town at the mountain\'s foot, associated with the legend since at least Ibn Battuta (14th c.)', collector: 'Jules Alexandre Degrand, French traveller and geographer in the northern highlands', published: 'Paris, 1901' },
    // the ALBANIAN ORIGINAL — genuinely unfindable (see why below). Degrand
    // recorded the legend directly in FRENCH from local testimony; no known
    // Albanian-language publication of THIS telling survives on any corpus at
    // hand. Do not invent or back-translate Albanian for this tale.
    albanian: {
      status: 'missing',
      why: 'Grepped every local corpus for "Salltek"/"Saltik"/"Sallëk"/"Sarisalltek" and for "Krujë"+"kuçedër": pralla-popullore-shqiptare-1954.sq.txt (the 1954 Tirana corpus, 50 tales), dozon-manuel-langue-chkipe.fr-sq.txt, hahn-albanesische-studien.de-sq.txt, jarnik-zur-albanischen-sprachenkunde.de-sq.txt, meyer-kurzgefasste-grammatik.de-sq.txt, lambertz-albanische-marchen.de-sq.txt, fishta-lahuta-e-malcis.sq.txt — zero matches (the only "dervish" hits are Ariu edhe Dervishi\'s own dervish, and Fishta\'s unrelated "Dervish Pasha"). Also ran archive.org full-text search for "Sari Salltekut", "Sarrë Salltëk", "Sari Sallteku", "legjenda e Sari", "Sari Saltiku" — zero hits beyond an unrelated YouTube transcript. The core legend itself (per Elsie\'s own headnote) was recorded by Degrand directly in French from oral testimony in 1901; no Albanian-language print of this specific telling is known to survive.',
    },
    // no translation-vs-Albanian conflict is possible here (no Albanian text
    // survives to compare) — these are the interpretive calls made reading
    // Elsie's English alone
    discrepancies: [
      'THE SCHOLARLY PREAMBLE IS NOT THE TALE: Elsie\'s page opens with his own framing essay — Sari Salltëk\'s disputed ties to Haji Bektash Veli, Ibn Battuta\'s 1330s attestations, the seven-graves motif, his identification with St Spyridon of Corfu — before giving Degrand\'s actual narrated legend. That essay is background commentary, not narrated action; it sits outside the numbered ¶1-2 below (which cover only Degrand\'s two story paragraphs) and is not beat-mapped.',
      'THE DAUGHTER IS THE VICTIM (¶1.7): "the tearful daughter of the prince... on her way to the Kulshedra to be sacrificed" is the SAME girl named in ¶1.1 — today\'s lot has simply fallen on the prince\'s own child. The beats keep her as one continuous character, never a separate unnamed victim.',
      'ONE TOWN, FOUR MOODS (¶1.4, ¶2.2-3, ¶2.10-11): the failed champions before Salltëk, the false claimants after, the mockers, and the would-be assassins years later are never distinguished as separate groups in the English — the beats read all of them as Krujë\'s own townspeople, at four different moments in one long relationship with the dervish.',
    ],
    // sentence counts of the tale's 2 narrative paragraphs (Elsie's translation;
    // his own preamble essay is not counted — see discrepancies)
    paragraphs: [16, 17],
    cast: [
      { id: 'salltek', name: 'Sari Salltëk', note: 'the old wandering dervish — wooden sword, cypress branch, and later a mule', npc: 'sariSalltek' },
      { id: 'prince', name: 'the prince of Krujë', note: 'a Christian lord whose town pays the mountain\'s toll in lives', npc: 'princiKrujes' },
      { id: 'maiden', name: 'the prince\'s daughter', note: 'today\'s lot falls to her; she is the one who proves the dervish afterward', npc: 'vajzaPrincit' },
      { id: 'kulshedra', name: 'the Krujë Kulshedra', note: 'suns itself in a ruined church atop the mountain; devours whoever the lot names', npc: 'kulshedraKrujes' },
      { id: 'disciple', name: 'the loyal disciple', note: 'carries the dervish\'s daily bread up the mountain — and, once, a warning', npc: 'dishepulli' },
      { id: 'townsfolk', name: 'the people of Krujë', note: 'draw the lot, fail the apple test, mock the old man, then plot his death', npc: 'krujaFolk' },
    ],
    // anchor = the game location this tale place inhabits, under THE SHARING
    // RULE (see _SCHEMA.md). The map has no dedicated Krujë node yet, so most
    // places here are PROPOSED at the nearest existing spot (exactly how
    // three-friends already stages Berat at shpirag1) — the mirror/mold say
    // what should eventually be drawn, without contradicting what already
    // lives at the node they borrow.
    places: [
      { id: 'road', emoji: '🛤️', name: 'the open road', note: 'the road into Krujë — every wanderer\'s tale sets out this way',
        anchor: { status: 'existing', node: 'start', mirror: 'the road out of old Tirana at the tanners\' bridge',
          mold: 'the open road hosts every traveller\'s setting-out; a lone dervish walking toward Krujë crosses it like anyone else — roads accumulate stories, they never clash' } },
      { id: 'town', emoji: '🏘️', name: 'Krujë', note: 'the walled hill-town below the dervish\'s mountain',
        anchor: { status: 'proposed', node: 'fshatiSheshi', mirror: 'Krujë itself — the game\'s standing village square stands in for the town at the mountain\'s foot; the square already keeps a church and a mosque side by side, matching Krujë\'s own Christian-then-Bektashi history',
          mold: 'a lord\'s market town: its crowd gathers for a decree, a mockery, or years later a conspiracy — the square already hosts every tale\'s crowd, and this one asks nothing it cannot give',
          conflicts: 'NOT pallatiZi — that is the grieving queen\'s own household (goose-girl, maiden-promised-sun), a mother and a stolen daughter; this prince keeps no such grief and rules a different kind of house. NOT kala1/Rozafa — Rozafa is the north\'s own walled citadel with its own three-brothers walling legend; Krujë is its own town, not a stand-in for Shkodra.',
          proposal: 'draw Krujë\'s own square and citadel gate at fshatiSheshi\'s edge when a dedicated node is built' } },
      { id: 'mountain', emoji: '⛰️', name: 'the mountain path', note: 'the climb from town to the dragon-scorched summit',
        anchor: { status: 'proposed', node: 'mali1', mirror: 'Mali i Krujës, the dervish\'s own guardian height above the town — pinned at mali1 only as the nearest EXISTING spot, since no dedicated Krujë node exists yet. mali1 is not a blank wildcard: its own default text unconditionally opens "You are on Mount Tomorr" (src/game/content.js) and regions.js labels the whole area "Mount Tomorr" — three-friends\' own anchor for this identical node correctly marks it status:\'existing\'. This proposal does not contest that; it borrows Tomorr\'s own address for Krujë the same way legjenda-e-prespes borrows it for Lake Prespa, each honest that a second, unbuilt elsewhere-place is riding along on Tomorr\'s pin until the map reaches it, never that the peak itself is secretly Krujë',
          mold: 'a climbing path up a scorched, arid crest — thirst, a struck spring, three dragon-charges turned aside; this is Krujë\'s own climb, narrated as its own separate, un-drawn summit even though the pin it borrows already belongs to Tomorr in the game\'s own text — the same borrowed-pin honesty legjenda-e-prespes keeps for its own elsewhere-lake at this node',
          conflicts: 'NOT maja (Zojz\'s own peak) or tomorStuhi (Baba Tomor\'s storm-duel) — those are already-drawn Tomorr scenes elsewhere on the massif, not proposals sharing this node, so a lower Krujë crag never crowds them. NOT a denial of mali1\'s own existing Tomorr identity (three-friends\' status:\'existing\' anchor at this same node, and content.js\'s own unconditional "You are on Mount Tomorr" line) — that identity stands, unchallenged; Krujë simply rides the same placeholder pin the way legjenda-e-prespes\'s Prespa lake already does, each an honestly separate elsewhere-place, never a rival claim to be Tomorr itself',
          sharedWith: ['three-friends (mali1\'s own existing anchor — Mount Tomorr, status:\'existing\', the hub\'s actual built identity)', 'legjenda-e-prespes (a second proposed elsewhere-mountain, Lake Prespa, riding the same borrowed pin, honest about the same non-claim)', 'the wider kreshnik-cycle tales anchoring mali1 as its own existing "grazing heights above Jutbina" facet of the same built massif (ali-bajraktari, mujo-strength, gjeto-basho-muji, and others) — a second true facet of mali1 itself, not a separate elsewhere-place'],
          proposal: 'draw Krujë\'s own summit — parched ground, a struck spring, a ruined church\'s stones — as its own node above mali1' } },
      { id: 'cave', emoji: '🕳️', name: 'the dragon\'s cave', note: 'the Kulshedra\'s den in the ruined church, later the dervish\'s own cell',
        anchor: { status: 'proposed', node: 'mali1', mirror: 'the real cave still shown on Krujë\'s citadel hill, venerated to this day as Sari Salltëk\'s own — pinned at mali1 only as the nearest EXISTING spot, since no dedicated Krujë node exists yet',
          mold: 'one cave, two eras: a Kulshedra\'s lair first, then a holy man\'s hermitage for years after — the seven tongues, the watermelon\'s seeds, all keep to this one, still-undrawn address; NOT mali1\'s own already-built cave-branch (katallan1, below) — a wholly different ogre legend sharing only "a cave off the mountain," not this one',
          conflicts: 'NOT arushe1/pylli1 — that hermit-dervish (bear-dervish\'s dervishi) is a wood\'s-edge trickster with no strength and no shrine; a different dervish, a different legend, sharing only the word "dervish." NOT mujo-avenges-halil\'s own proposed cave at this same mali1 node — that is a lone kreshnik\'s siege-refuge, deliberately kept general ("any future frontier tale needing a mountain cave can share it without conflict"); two different un-drawn caves riding the same borrowed pin, never the same address. NOT katallan1 — mali1 already has a fully built, already-named cave one option-click away ("shko në shpellën" in mali1\'s own options, src/game/content.js): a one-eyed, kneeless man-eating giant, blinded and escaped by hiding among the rams, Albania\'s own Cyclops tale-type. That is a separate node (katallan1) reached FROM mali1, not mali1 itself, so a future dedicated Krujë cave built off mali1 would not overwrite it — but this proposal must not be read as claiming mali1\'s own existing cave-branch already IS the Kulshedra\'s den; it is a wholly unrelated legend at its own address',
          sharedWith: ['mujo-avenges-halil (a second, unrelated cave proposed at the same node, kept general enough to hold both)'],
          proposal: 'draw the cave and its ruined-church mouth as its own node once Krujë\'s summit is built' } },
      { id: 'sea', emoji: '🌊', name: 'the crossing to Corfu', note: 'the water Salltëk rides out over at the tale\'s end',
        anchor: { status: 'existing', node: 'deti1', mirror: 'the open Adriatic off the shore village — the same crossing every coastal tale keeps',
          mold: 'the deep between Albania and Corfu: whoever the roads send seaward departs from here without needing the shore to belong to them alone',
          sharedWith: ['gjergj-elez-alia', 'snake-bridegroom'] } },
    ],
    items: [
      { id: 'sword', emoji: '🗡️', name: 'the wooden sword', note: 'girded at his belt from the day he arrived — the blade that beheads a Kulshedra seven times over' },
      { id: 'tongues', emoji: '👅', name: 'the seven tongues', note: 'cut from the dragon\'s seven heads and pocketed — his proof against every false claimant' },
      { id: 'apples', emoji: '🍎', name: 'the three apples', note: 'held in the girl\'s own hands; only the true rescuer\'s palms ever receive them' },
      { id: 'watermelon', emoji: '🍉', name: 'the watermelon', note: 'the disciple\'s last-minute gift, hurled at the cave roof in fury — its seeds and red juice remain a charm to this day' },
    ],
    // how the game stages this tale — the WITNESS projection (see _SCHEMA.md). The
    // dragon-slaying saint's legend, heard in the underworld-well country: how the old
    // dervish went in place of the girl the lot named, slew the seven-headed Kulshedra
    // with a wooden sword and cut out its seven tongues to expose the false claimant.
    // No embodiment — a narrated legend of a saint who lies in seven graves in seven lands.
    play: {
      entry: 'threat',
      stance: 'witness',
      role:
        'You hear the legend of Sari Salltëk, the old dervish who came to a town that paid the seven-headed Kulshedra its yearly tribute in lives. When the lot named a girl for the cave, he went in her place, slew the dragon with a wooden sword, and cut out its seven tongues — so that when a false hero claimed the deed, the tongues gave the lie and proved who had truly done it. He refused the king\'s daughter and every reward and walked on; they say he lies in seven graves in seven lands.',
      from: 'sari1',
      ending: 'sariFund',
      scenes: {
        sari1: 'battle',
        sari2: 'reward',
        sariFund: 'departure',
      },
      divergences: [
        { note: 'The game\'s WITNESS stance on a dragon-slaying saint\'s legend rather than a played hero-arc: it is told in the underworld-well country (reached from pusi), the wooden-sword slaying and the seven-tongues proof against the false claimant its heart. No figure embodied — the saint is spoken of, not stepped into.' },
        { beat: 'reward', note: 'The signature motif — a false hero brings the seven heads and claims the maiden, but the dervish produces the seven cut-out tongues and the truth stands — is staged as the proof; "cut the tongues, lest another steal your glory."' },
        { beat: 'watermelon', note: "The saint's lesser miracles (delousing the girl to tears, striking water from the rock), his refusal of the king's daughter, the disciple's watermelon hurled at the cave roof, and the four-strides-to-Corfu departure are kept in the tale record and compressed; the seven-graves-in-seven-lands belief closes it." },
      ],
    },
    beats: [
      {
        id: 'threat', title: 'A town that pays in lives',
        note: 'Krujë\'s Christian prince has one sorrow: a Kulshedra denned in the mountain cave above town, sunning itself daily in a ruined church and forcing the town to feed it by lot. Champions have died trying to kill it.',
        lines: [
          ['1.1', 'Once in Krujë a Christian prince ruled, father to a beautiful daughter.'],
          ['1.2', 'His happiness was spoiled by one thing only: a fearsome Kulshedra denned in a cave atop the mountain above the town.'],
          ['1.3', 'Each day the dragon sunned itself among a ruined church\'s stones and demanded the town draw lots for a man or woman to devour.'],
          ['1.4', 'Many champions had tried and failed to kill it.'],
        ],
        cast: {
          prince: ['town', 'rules the town from its square, powerless against the mountain'],
          maiden: ['town', 'his daughter, not yet named by the day\'s lot'],
          townsfolk: ['town', 'draw the daily lot; their best men have already died trying to kill the beast'],
          kulshedra: ['cave', 'suns itself among the ruined church\'s stones, devouring whoever the lot names'],
          salltek: ['road', 'a wandering dervish, not yet arrived'],
          disciple: ['town', 'one face among the townspeople, not yet chosen for anything'],
        },
      },
      {
        id: 'arrival', title: 'The old dervish',
        note: 'An aged dervish, wooden sword and cypress branch in hand, reaches Krujë, hears what the mountain demands, and resolves to climb it.',
        lines: [
          ['1.5', 'One day an old white-bearded dervish reached the town, a wooden sword at his belt and a cypress branch in hand.'],
          ['1.6', 'Told of the monster, he made up his mind to climb to its cave.'],
        ],
        cast: {
          salltek: ['town', 'arrives, hears of the Kulshedra, and resolves to climb the mountain'],
        },
      },
      {
        id: 'meeting', title: 'The girl the lot named',
        note: 'Climbing the next day, Salltëk meets the prince\'s own daughter on her way up to be devoured — today\'s lot fell on her. He promises not to leave her side.',
        lines: [
          ['1.7', 'Setting out up the mountain the next day, he came upon the prince\'s own daughter, weeping her way toward the sacrifice the lot had named her for.'],
          ['1.8', 'Don\'t weep, he told her — they would go on together and he would not leave her side.'],
        ],
        cast: {
          salltek: ['mountain', 'climbs the mountain path'],
          maiden: ['mountain', 'walks up in tears — today\'s sacrifice'],
        },
      },
      {
        id: 'delousing', title: 'Lice and tears',
        note: 'She picks through his hair as they climb; the ease of it lulls him to sleep in her lap, until her crying wakes him again.',
        lines: [
          ['1.9', 'Along the way the old man asked her to pick through his lice-ridden hair.'],
          ['1.10', 'She obliged, and the ease of it lulled him to sleep in her lap, until her weeping stirred him again.'],
        ],
        cast: {
          salltek: ['mountain', 'lets her pick through his hair, then sleeps in her lap'],
          maiden: ['mountain', 'deloused him, and her tears wake him again'],
        },
      },
      {
        id: 'spring', title: 'Water from the rock',
        note: 'By sunset they reach the parched summit; her thirst is fierce, so he drives his staff into the cliff and a spring gushes out.',
        lines: [
          ['1.11', 'By sunset they had climbed to the summit, its ground baked bare by the dragon\'s burning breath.'],
          ['1.12', 'The heat there was fierce enough that the girl began to beg for water.'],
          ['1.13', 'So the old man drove his staff into the rock, and a spring broke out of the stone.'],
        ],
        cast: {
          salltek: ['mountain', 'strikes his staff into the cliff; a spring breaks out of the rock'],
          maiden: ['mountain', 'drinks at the new spring, her thirst finally answered'],
        },
      },
      {
        id: 'battle', title: 'Seven heads, seven tongues',
        note: 'The Kulshedra charges them three times and fails each time; Salltëk chases it into its own cave and kills it, taking all seven tongues as proof.',
        lines: [
          ['1.14', 'Once they had drunk their fill, the blazing Kulshedra rushed them three separate times, and each time failed to touch them.'],
          ['1.15', 'Then the dervish ran the beast down into its own cave, cut it apart with his wooden sword, and pocketed all seven of its tongues after severing its seven heads.'],
        ],
        cast: {
          salltek: ['cave', 'chases the Kulshedra into its den and kills it with the wooden sword'],
          maiden: ['cave', 'watches the beast fall, unharmed through all three charges'],
          kulshedra: ['cave', '☠ cut down and beheaded seven times over'],
        },
        items: {
          sword: ['salltek', 'drawn and bloodied — the blade that ended the Kulshedra'],
          tongues: ['salltek', 'cut from the seven heads and pocketed as proof'],
        },
        exit: ['kulshedra'],
      },
      {
        id: 'sendHome', title: 'Go home to your father',
        note: 'Salltëk sends the girl back down to Krujë alone; he stays behind at the cave, keeping the tongues as his only proof.',
        lines: [
          ['1.16', 'He sent the girl back down to her father.'],
        ],
        cast: {
          maiden: ['town', 'sent back down to her father, safe'],
          salltek: ['cave', 'stays behind at the dragon\'s empty den'],
        },
      },
      {
        id: 'reward', title: 'A reward, and false claims',
        note: 'Overjoyed, the prince offers his daughter\'s hand to whoever saved her — not yet knowing who that was. Young men lie about the kill and fail the girl\'s apple test; when the dervish is finally sent for, the town laughs at him, but she puts the three apples in his own hands.',
        lines: [
          ['2.1', 'Delighted his daughter was safe, the prince declared her hand the reward for her rescuer — though no one yet knew who that was.'],
          ['2.2', 'One young man after another stepped up falsely claiming the kill, and each was turned away without the three apples the girl held.'],
          ['2.3', 'When at last someone thought to send for the old dervish, the crowd only laughed, sure no such graybeard could have downed the dragon.'],
          ['2.4', 'But the girl stepped forward and set the three apples in his hands herself, one after another.'],
        ],
        cast: {
          prince: ['town', 'declares his daughter\'s hand the reward, still not knowing the rescuer'],
          townsfolk: ['town', 'false claimants step up and fail; then mock the old dervish when he is sent for'],
          salltek: ['town', 'summoned down from the mountain; mocked, then proven by the girl herself'],
          maiden: ['town', 'gives the three apples into Salltëk\'s hands, one by one'],
        },
        items: {
          apples: ['salltek', 'given into his hands by the girl herself — proof no false claimant could take'],
        },
      },
      {
        id: 'refusal', title: 'Keep your daughter',
        note: 'Salltëk lays the seven tongues before the prince as final proof, then refuses the girl\'s hand — a dervish does not marry against a woman\'s will — and asks only to live out his days in the cave, fed daily. The prince agrees; a disciple is charged with carrying his food.',
        lines: [
          ['2.5', 'To settle the matter, the dervish laid the Kulshedra\'s seven tongues before the prince.'],
          ['2.6', 'Even so, he would not take the girl\'s hand, saying it was against a dervish\'s way to marry any woman unwilling.'],
          ['2.7', 'Keep your daughter, he said, and keep your wealth besides.'],
          ['2.8', 'All he wanted was to make his home in the dragon\'s cave, with a little food carried up to him daily.'],
          ['2.9', 'The prince granted it, and so the dervish settled there.'],
        ],
        cast: {
          salltek: ['cave', 'settles into the dragon\'s old den as his own hermitage'],
          prince: ['town', 'grants the dervish\'s one request instead of his daughter\'s hand'],
          disciple: ['cave', 'appointed to carry the dervish\'s food up the mountain each day'],
        },
        items: {
          tongues: ['salltek', 'shown to the prince as final proof, then kept as his own trophy'],
        },
      },
      {
        id: 'envy', title: 'Years of envy',
        note: 'Years pass in the cave. Krujë grows envious and afraid of the old dervish\'s power, and resolves to strike first.',
        lines: [
          ['2.10', 'Some years on, though, envy of the old man\'s power began to spread through Krujë.'],
          ['2.11', 'Fearing he meant them harm too, the townspeople plotted to strike first and kill him.'],
        ],
        cast: {
          townsfolk: ['town', 'grow envious of the dervish\'s power over the years; plot to kill him first'],
        },
      },
      {
        id: 'warning', title: 'A watermelon and a warning',
        note: 'The disciple who brings his food gets wind of the plot and rushes up to warn him: eat this watermelon and flee — the killers are already on their way.',
        lines: [
          ['2.12', 'But the disciple who climbed up with his food each day got wind of it and rushed to warn him in time.'],
          ['2.13', 'Take this watermelon, he said — eat it and get away, because killers are already on their way up.'],
        ],
        cast: {
          disciple: ['cave', 'races up with a watermelon and a warning: killers are on the way'],
        },
      },
      {
        id: 'watermelon', title: 'A parting gift',
        note: 'Furious at the town\'s ingratitude, Salltëk carves the melon and hurls it at the cave roof — a "gift" thrown back at them. Ever after, the cave keeps watermelon seeds and a red juice the people of Krujë drink as a charm.',
        lines: [
          ['2.14', 'Cutting the melon open, the dervish burned with anger at how his neighbors had repaid him.'],
          ['2.15', 'He flung it hard against the cave\'s roof, calling out that they could keep it back as a parting gift.'],
          ['2.16', 'To this day, they say, watermelon seeds and a red juice linger in that cave, kept as a charm by Krujë\'s people.'],
        ],
        cast: {
          salltek: ['cave', 'hurls the carved watermelon at the roof in fury at Krujë\'s betrayal'],
        },
        items: {
          watermelon: ['cave', 'shattered against the roof — its seeds and red juice remain a charm to this day'],
        },
      },
      {
        id: 'departure', title: 'Four strides to Corfu',
        note: 'Sari Salltëk mounts his mule, climbs to the very peak, and in four great strides is gone — over the sea to Corfu, his hoofprints left behind at Krujë, Shijak, and Durrës.',
        lines: [
          ['2.17', 'Then Sari Salltëk mounted his mule, climbed to the very peak, and in four bounding strides was gone to Corfu, his hoofprints left behind at Krujë, Shijak, and Durrës.'],
        ],
        cast: {
          salltek: ['sea', 'rides out over the water toward Corfu, gone from Krujë for good'],
        },
      },
    ],
}
