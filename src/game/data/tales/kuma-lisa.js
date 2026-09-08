// ===========================================================================
// TALE: The Wolf, the Vixen and the Honey-Pot (von Hahn 89) — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
// ===========================================================================

export default {
  id: 'kuma-lisa',
  title: 'The Wolf, the Vixen and the Honey-Pot',
  references: [
    { role: 'facsimile', citation: 'Johann Georg von Hahn, Griechische und albanesische Märchen (1864) — Internet Archive scan', url: 'https://archive.org/details/griechischeunda00hahngoog', note: 'Selected German witness, volume II, no. 89.' },
    { role: 'catalog', citation: 'Griechische und albanesische Märchen (1864) — Open Library record', url: 'https://openlibrary.org/works/OL13087296W/Griechische_und_albanesische_M%C3%A4rchen' },
    { role: 'variant', citation: 'Gustav Weigand, Albanesische Grammatik im südgegischen Dialekt (1913) — Google Books scan', url: 'https://play.google.com/store/books/details?id=dtiN--PfJKcC', note: 'Contains Albanian Elbasan text no. 52, a distinct three-pot variant; not Hahn no. 89.' },
    { role: 'analogue', citation: 'ATU 15, “The Theft of Butter by Playing Godfather” — Folklore Database', url: 'https://folkloredatabase.com/db_atu.php?atu=15' },
  ],
  source:
    'J. G. von Hahn, Griechische und albanesische Märchen No. 89 (Leipzig 1864) · read in the German original — no English translation exists; all lines paraphrased from the German',
  // the tale TYPE (ATU 15, "Theft of Butter/Honey by Playing Godfather") is
  // pan-Balkan; Hahn printed his text among the Greek animal tales, and the
  // Albanian-soil twin is Weigand's Elbasan text — central Albania, the same
  // region as the game's forest staging
  origin: {
    region: 'pan-Balkan animal-tale type (ATU 15); von Hahn prints it in his Greek animal-tale section (Epirus collections) — the Albanian-soil twin is Weigand\'s Nr. 52 from Elbasan, central Albania',
    collector: 'Johann Georg von Hahn, Austrian consul — the founder of Albanology',
    published: 'Griechische und albanesische Märchen, vol. II, Nr. 89, Leipzig 1864',
  },
  // NO ALBANIAN ORIGINAL OF HAHN 89 EXISTS — it was printed in German only.
  // Weigand Nr. 52 is locally transcribed Albanian, but is a distinct variant.
  albanian: {
    status: 'missing',
    why: 'von Hahn 89 sits in the GREEK animal-tale section of his 1864 collection and was printed in German only; no Albanian text of that selected witness exists. An Albanian-language analogue is now locally transcribed from Gustav Weigand, Albanesische Grammatik im südgegischen Dialekt (Leipzig 1913), text Nr. 52 from Elbasan, at docs/references/weigand-1913-zonja-skile-ujku.sq.txt. It is a different telling: three honey pots, two false christenings named Zanafilla and Marosha, followed by priest-and-barber revenge. Its sentences therefore cannot be presented as the Albanian original of Hahn\'s one-tub, three-christening, root-or-leg tale. Nothing in the 1954 Tirana corpus, Dozon, Jarník or Meyer supplies Hahn\'s exact plot in Albanian, so the selected beat lines remain correctly marked missing rather than splicing the analogue into them.',
    local: 'docs/references/hahn-89-ujku-dhelpra-mjalti.de.txt',
    variants: [
      {
        title: 'Weigand No. 52, «Tierfabel: Fuchs und Wolf» (Elbasan, 1913, pp. 152–153)',
        local: 'docs/references/weigand-1913-zonja-skile-ujku.sq.txt',
        external: 'https://play.google.com/store/books/details?id=dtiN--PfJKcC',
        note: 'The exact Albanian Elbasan analogue is locally transcribed from the primary page images. It has three honey pots, two false christenings named Zanafilla and Marosha, and the later priest/barber revenge. It is not the same telling as Hahn 89, so it remains a documented variant rather than being spliced into the selected beats.',
      },
    ],
  },
  // no Albanian text to disagree with — these record where the tellings
  // (lore card / game staging / Hahn / Weigand) diverge and which reading
  // the beats follow
  discrepancies: [
    'HONEY, NOT BUTTER: von Hahn 89 has a tub of HONEY and a basket of white loaves eaten during field work. There is no sleeping wolf, no mouth-smearing and no counter-accusation: the fox denies the theft, sends the wolf back to search, and bolts down a hole. The lore card and playable scenes now follow that selected witness.',
    'THE CHRISTENING-NAMES (¶2.5, 3.7, 4.9): Hahn\'s names are German diminutives — Anfanginchen, Mittinchen, Stülpinchen ("Little Beginning / Little Halfway / Little Tipped-Over": the level of the honey). The only ALBANIAN names on record come from the Elbasan variant (Weigand Nr. 52, via Lambertz): «Zanafilla» ("beginning-girl") and «Marosha» ("end-girl") — that telling has only two visits. Quoted here for the record, NOT as beat-line Albanian: no verbatim Albanian sentence of the tale survives.',
    'WHOSE STORE (¶1.2): in Hahn the two buy the field TOGETHER and the provisions are shared; in the Elbasan variant the WOLF alone is the householder laying up three pots of honey for the winter (the lore card\'s "for the winter" echoes that variant). The beats follow Hahn: a shared store, which makes the theft a cheat between partners.',
    'THE ENDING (¶7.6): Hahn ends at the root-or-leg escape. The Elbasan variant runs on — the fox beaten half-dead, revived in the priest\'s bread-sack, the wolf coaxed into "ministering" in church and having all his teeth pulled with the barber\'s tongs, and the fox\'s last laugh: "that is the revenge for that time!". The beats end where Hahn ends.',
    'THE NAMES OF THE PAIR (¶1.1): Hahn\'s animals carry human names — Herr Nicola and Frau Marja, and the wolf greets the fox as "Frau Gevatterin" (godmother). The Balkan tradition behind the card\'s title names the fox Kuma Lisa, "godmother fox", and the game\'s scene introduces her by that name (dhelpra quhet Kuma Lisa). Same figure; the registry entry holds both names.',
  ],
  // sentence counts of the original's 7 scene-paragraphs (von Hahn 1864;
  // Hahn's tiny dialogue-paragraphs grouped as in the reference file)
  paragraphs: [3, 5, 7, 9, 4, 2, 6],
  cast: [
    { id: 'dhelpra', name: 'Frau Marja — the she-fox', note: '"Kuma Lisa" of the Balkan tellings; godmother by pretence only', npc: 'kumaLisa' },
    { id: 'ujku', name: 'Herr Nicola — the wolf', note: 'the fox\'s field-partner: strong, trusting, and fed last', npc: 'ujkuNikolla' },
  ],
  // anchor = the game location this tale place inhabits (see _SCHEMA.md).
  // The game ALREADY stages this tale: the forest fox scene (pylliLoop →
  // dhelpra1 → dhelpra2 → the dhelpraFund/dhelpraKeq endings, whose
  // ENDING_LORE maps to this very card) — so the tale's stage anchors to its
  // own telling, and no other story can clash there.
  places: [
    { id: 'ara', emoji: '🌾', name: 'the bought field', note: 'the plot the pair bought together and dig side by side',
      anchor: { status: 'existing', node: 'dhelpra1', mirror: 'a woodland-edge working plot in central Albania — the Elbasan country of the tale type\'s Albanian twin (Weigand Nr. 52)',
        mold: 'a fox and a wolf laid up a tub of honey and white loaves together and the fox ate them under cover of invented christenings; the game\'s fox scene is this tale\'s staging',
        sharedWith: ['the dhelpra1 fox scene (ENDING_LORE dhelpraFund/dhelpraKeq → kuma-lisa)'] } },
    { id: 'kacuba', emoji: '🌿', name: 'the bush cache', note: 'where the honey-tub and the white loaves are hidden — and where every "christening" really happens',
      anchor: { status: 'existing', node: 'dhelpra2', mirror: 'any field-side thicket where working folk stash the midday meal',
        mold: 'the hidden store beside the worked ground — emptied in secret and found upended at mealtime; the game\'s accusation scene plays here without adding a telltale smear',
        sharedWith: ['the dhelpra2 accusation scene'] } },
    { id: 'vrima', emoji: '🕳️', name: 'the fox\'s hole', note: 'the bolt-hole where the pursuit ends — root or leg',
      anchor: { status: 'proposed', node: 'dhelpra2', mirror: 'a burrow under forest roots, too narrow for anything but a fox',
        mold: 'a bolt-hole only the fox fits — every pursuit of her ends at its mouth, hauling roots',
        conflicts: 'NOT the wolf den or a traveller\'s cave: this is a fox-width root burrow attached only to the field-side chase',
        proposal: 'draw a root-tangled fox-hole beside the fox scene (nearest spot today: dhelpra2); the root-or-leg escape plays at its mouth' } },
    { id: 'pagezimi', emoji: '⛪', name: 'the christening', note: 'the christening the fox is forever called to — it does not exist',
      anchor: { status: 'offstage', mirror: 'no church, no font, no child — the christening exists only inside the fox\'s lie',
        mold: 'never staged because it never happens: every walk "to the christening" is really the bush cache; any story that stages a REAL christening is telling a different event and does not share this one',
        conflicts: 'NOT the village church by Kostandini\'s stone (kostandin1) — anchoring the lie to a real church would make the lie true, and that church\'s one story is a kept besa, not a false godmother' } },
  ],
  items: [
    { id: 'vozaMjalte', emoji: '🍯', name: 'the tub of honey', note: 'the shared provision — licked to "Beginning", to "Halfway", and tipped over at the end' },
    { id: 'buketBardha', emoji: '🍞', name: 'the white loaves', note: 'a basketful packed for the field season — finished with the honey on the third "christening"' },
    { id: 'kerraba', emoji: '🪝', name: 'the hooked stick', note: 'the wolf\'s crook, poked down the bolt-hole — it caught roots when she cried leg, and legs when she cried root' },
  ],
  // how the game stages this tale — a COMPANION/judgment projection (see _SCHEMA.md).
  // You travel beside Kuma Lisa, but can still expose or support her lie. Either
  // way, her head start and root-or-leg trick retain Hahn's fixed escape.
  play: {
    entry: 'ortaket',
    stance: 'companion',
    with: 'dhelpra',
    role:
      'You work and travel beside the she-fox Kuma Lisa while she tricks her partner, the wolf Herr Nicola. Their honey and white loaves vanish during her three invented christenings; when the wolf accuses her, you may support the denial or expose it, but the fox still makes for her hole and survives by calling roots legs and her real leg a root.',
    from: 'dhelpra1',
    ending: 'dhelpraFund',
    scenes: {
      dhelpra1: 'ortaket',
      dhelpra2: 'zbulimi',
      dhelpraFund: ['mohimi', 'vrima'],
    },
    divergences: [
      { beat: 'zbulimi', note: 'The player is an invented companion and third voice in a source scene containing only fox and wolf. Choosing to expose or support Kuma Lisa is therefore a game counterfactual; both routes keep Hahn\'s facts that the honey and white loaves are gone, the tub is upside down, the fox denies the theft, and nothing is smeared on the wolf.' },
      { beat: 'zanafilla', note: 'The folktale\'s signature sequence — three trips to the honey and three godchild names that mark the falling level, Little Beginning, Little Halfway and Little Tipped-Over — is compressed in the short playable entry and recounted in its ending.' },
      { beat: 'vrima', note: 'Both playable judgments converge on Hahn\'s root-or-leg escape: while the wolf searches, the fox reaches her hole and defeats his hooked stick by calling each root her leg and her real leg a root.' },
    ],
  },
  beats: [
    {
      id: 'ortaket', title: 'Partners in a field',
      note: 'A wolf named Herr Nicola and a she-fox named Frau Marja buy a field together, hide their provisions — a tub of honey, a basket of white loaves — in a bush, and dig. The fox gets hungry, is too proud to say so, and invents a call to a christening.',
      lines: [
        ['1.1', 'There was once a wolf called Herr Nicola, and a she-fox called Frau Marja.'],
        ['1.2', 'The two of them bought a field together and set off to work it, packing a tub of honey and a basket of white loaves as provisions; they hid the food in a bush and began to dig.'],
        ['1.3', 'A good stretch of digging in, the fox grew hungry — but she was ashamed to admit it to Herr Nicola, so she thought up a ruse: she made as if someone were calling her to a christening, and shouted, "Yes indeed, yes indeed, I\'m on my way!"'],
      ],
      cast: {
        dhelpra: ['ara', 'drops her digging mid-row, crying "I\'m on my way!" to nobody at all'],
        ujku: ['ara', 'digs the new-bought field, honest and hungry-later'],
      },
      items: {
        vozaMjalte: ['kacuba', 'full to the brim, hidden in the bush'],
        buketBardha: ['kacuba', 'a basketful, hidden beside the honey'],
      },
    },
    {
      id: 'zanafilla', title: 'Little Beginning',
      note: 'First "christening": the wolf waves her off, the fox eats at the bush until she can hold no more, and comes back with the child\'s name ready — Little Beginning.',
      lines: [
        ['2.1', 'Who is calling you, asked Herr Nicola — and she answered that she was wanted to hold a child over the font; she would go, but come back soon.'],
        ['2.2', '"Off you go then," said Herr Nicola, "but see that you\'re quick about it."'],
        ['2.3', 'So Frau Marja went off, stole round to where the honey-tub and the white loaves were hidden, and ate until she could eat no more.'],
        ['2.4', 'Then she went back to Herr Nicola, who greeted her: "Welcome, godmother — and what name did you give the child?"'],
        ['2.5', '"Little Beginning," she answered.'],
      ],
      cast: {
        dhelpra: ['ara', 'back from the "christening", licking her whiskers — the child is named Little Beginning'],
        ujku: ['ara', 'digs on alone; welcomes the godmother home with a courteous question'],
      },
      items: { vozaMjalte: ['kacuba', 'licked down from the brim — a beginning made'] },
    },
    {
      id: 'gjysma', title: 'Little Halfway',
      note: 'The craving comes back, and so does the call. Second visit to the bush, second name: Little Halfway — the honey\'s own level, told to the wolf\'s face.',
      lines: [
        ['3.1', 'They fell back to work, and after a while Frau Marja\'s craving for the honey returned, and she cried out, "Yes indeed, yes indeed, I\'m on my way!"'],
        ['3.2', 'Herr Nicola asked: "But who is calling you this time?"'],
        ['3.3', '"Ah — I\'m to stand godmother once again."'],
        ['3.4', '"Go then, but see you come back soon."'],
        ['3.5', 'So Frau Marja crept to the honey, ate all she could hold, and came back to the field.'],
        ['3.6', 'Herr Nicola asked her what name she had given the child this time.'],
        ['3.7', 'And she answered: "Little Halfway!"'],
      ],
      cast: {
        dhelpra: ['ara', 'home from the second "christening" — this child is called Little Halfway'],
        ujku: ['ara', 'asks the child\'s name and is told, without knowing it, the level of his honey'],
      },
      items: { vozaMjalte: ['kacuba', 'eaten down to the middle'] },
    },
    {
      id: 'permbysja', title: 'Little Tipped-Over',
      note: 'A third call — even the wolf finds it strange now, but "they love me, Herr Nicola." The fox finishes the honey and the loaves, tips the tub upside down, and names the last child for the deed.',
      lines: [
        ['4.1', 'When they had worked a while longer, Frau Marja once more made as if she heard someone calling, and shouted, "Yes indeed, yes indeed, I\'m on my way!"'],
        ['4.2', '"Who can be calling you yet again?" asked Herr Nicola.'],
        ['4.3', '"Ah, I\'m wanted for a godmother one more time."'],
        ['4.4', '"Strange, that — they call for you without a pause!"'],
        ['4.5', '"That is because they love me, Herr Nicola!"'],
        ['4.6', '"Well, go then — but be quick about coming back."'],
        ['4.7', 'So Frau Marja stole to the honey one last time, ate it and the white loaves down to nothing, turned the tub upside down, and then came back to Herr Nicola.'],
        ['4.8', 'He asked her what name she had given the child.'],
        ['4.9', '"Little Tipped-Over," answered Frau Marja.'],
      ],
      cast: {
        dhelpra: ['ara', '"they love me, Herr Nicola" — home from the third christening: Little Tipped-Over'],
        ujku: ['ara', 'finds the endless calls odd, and swallows the answer whole'],
      },
      items: {
        vozaMjalte: ['kacuba', 'empty, upside down'],
        buketBardha: ['kacuba', 'eaten to the last crumb'],
      },
    },
    {
      id: 'zbulimi', title: 'An upturned tub',
      note: 'Mealtime at last. The wolf goes to the bush, finds the tub upended and the loaves gone, and runs back roaring: you ate it all, so now I eat you.',
      lines: [
        ['5.1', 'They dug on a while longer; at last Herr Nicola said, "Shall we eat now, or later?"'],
        ['5.2', '"Let\'s eat now!" said Frau Marja.'],
        ['5.3', 'So Herr Nicola went to the bush where the honey and the white loaves had been hidden — and found the tub turned upside down.'],
        ['5.4', 'At that he flew into a rage, ran at Frau Marja and roared: "You have eaten up the white loaves and the honey, and for that I am now going to eat you."'],
      ],
      cast: {
        ujku: ['ara', 'back from the bush in a fury: "you ate it all — now I eat you"'],
        dhelpra: ['ara', 'meets the accusation without so much as a blink'],
      },
    },
    {
      id: 'mohimi', title: 'Look again',
      note: 'The fox denies everything to his face and sends him back for a better look. He goes — with a promise of what happens if he finds nothing.',
      lines: [
        ['6.1', '"I certainly never ate them, Herr Nicola! You can\'t have looked properly — go back and search again with better eyes."'],
        ['6.2', '"Very well, I\'ll do that," said he, "but if I find nothing, you know what\'s in store for you."'],
      ],
      cast: {
        dhelpra: ['ara', 'denies it all and sends the searcher back — buying the head start she needs'],
        ujku: ['kacuba', 'turns the bush over a second time, his promise hanging in the air'],
      },
    },
    {
      id: 'vrima', title: 'Root or leg',
      note: 'While the wolf searches, the fox bolts down a hole. He sees her tail vanish, fetches a hooked stick, and fishes: at every root she shrieks "my little leg!", at her actual leg she jeers "pull the root, you donkey!" — until he gives up, and the fox goes free.',
      lines: [
        ['7.1', 'While Herr Nicola searched a second time, Frau Marja slipped away and hid herself down a hole.'],
        ['7.2', 'And when the wolf came back, he caught sight of her just as she was slipping in.'],
        ['7.3', 'So he took a hooked stick to drag her out with.'],
        ['7.4', 'Whenever the hook snagged on a root, the fox shrieked: "Ow, ow, my little leg! Ow, ow, my little leg!"'],
        ['7.5', 'But whenever it gripped her actual foot, she jeered: "Pull on the root, you donkey! Pull on the root, you donkey!"'],
        ['7.6', 'And so it went on a long while, until the wolf finally wearied and went away — and that is how Frau Marja got free of Herr Nicola.'],
      ],
      cast: {
        dhelpra: ['vrima', 'safe down the hole — "my little leg!" at every root, "pull the root, you donkey!" at every leg'],
        ujku: ['ara', 'gave up the crook at last and trudged off across the cheated field, hungry twice over'],
      },
      items: { kerraba: ['ujku', 'cut for the hole and worked in vain — it caught every root and no fox'] },
    },
  ],
}
