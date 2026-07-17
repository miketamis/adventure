// ===========================================================================
// TALE: The Bee, the Spider and the Cicada — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it.
//
// The numbered original here is FRENCH — the tale's canonical printed source
// is the anonymous «La légende de l'Abeille» (Ève, Paris, 28 March 1926,
// p. 2); no English translation and no Albanian folk original exist in any
// findable public-domain source (see albanian.why). All line paraphrases are
// my own English words made from the French; the raw French transcription
// lives in docs/references/eve-1926-la-legende-de-l-abeille.fr.txt.
// ===========================================================================

export default {
  id: 'bee-spider-cicada',
  title: 'The Bee, the Spider and the Cicada',
  source:
    'anonymous, «La légende de l\'Abeille», Ève — journal féminin illustré du dimanche (Paris), № 267, 28 March 1926, p. 2 · read in the Gallica/BnF facsimile (French); all lines paraphrased',
  // where the tale comes from — anchors should prefer this region's mirrors.
  // The French piece localises it no further than "the old legends of the
  // country" — a pan-Albanian house-and-hive legend, so it anchors at the
  // player's own village, where the game already stages it (bleta1).
  origin: {
    region: 'pan-Albanian (no region printed; the girls\' names are given in Gheg-looking forms — Mârûnang)',
    collector: 'anonymous journalist, Ève (Paris), from gallica.bnf.fr',
    published: 'Paris, 28 March 1926 (Ève № 267, p. 2)',
  },
  // No Albanian original found — the lines carry NO third element by design.
  albanian: {
    status: 'missing',
    why:
      'the tale\'s canonical printed source is FRENCH (Ève 1926, transcribed to docs/references/eve-1926-la-legende-de-l-abeille.fr.txt). Searched for an Albanian folk original: local corpora (pralla-popullore-shqiptare-1954, Dozon, Hahn — incl. his Elbassan myth section, Jarnik, Meyer, Lambertz, Fishta) have no merimangë/gjinkallë tale (Dozon-Mitko No. 8 is a DIFFERENT fable, bumblebee visits spider); archive.org full-text has 0 hits for «gjinkalla»; the tale is not among Elsie\'s 26 folktales or 15 legends on albanianliterature.net. The only Albanian texts online are Aurenc Bebja\'s 2023 back-translation of the French article (darsiani.com, copyrighted) and a modern literary retelling of an oral four-sister variant (P. Hysi, botasot.info) — back-translation or a modern author\'s prose, not the folk original, so none of it may feed the Q() quote system.',
  },
  // where tellings disagree — the rewrite should decide per case which
  // reading our world tells
  discrepancies: [
    'THE MOTHER\'S DEATH: the French never says she dies — she is «très vieille et malade» and the cake «la réconforta». But the game\'s own fork-scene says it outright («një nënë vdes këtu», gjizar1) and the ending blurb treats the scene as her deathbed. The beats follow the game: she dies eased after the blessing, and the first candle of the bee\'s wax burns for her.',
    'THE FOUR-SISTER VARIANT: a living oral variant (heard by P. Hysi from the teller Ismet Korita; botasot.info) has FOUR daughters — a fly (Mushka) between spider and cicada, cursed «kurrë të mos pjellësh» (never to give birth); its spider-curse adds the wind tearing the web to pieces, and the sick mother asks for compresses, not a cake. The beats follow the three-sister 1926 telling, which is what the lore card retells.',
    'THE CICADA\'S NAME: the French prints «Rigjal (la Cigale)» — not the standard gjinkallë; likely the journalist\'s garbling of a dialect word. The beats use the game\'s standard gjinkalla.',
    'ANCESTORS vs THE DEAD: the blessing says «la lumière des ancêtres» (light of the ANCESTORS) while the closing line has the wax burn «pour les cierges des morts» (candles of the DEAD). Same idea, two words — the lore card merges them; the beats keep both readings where each line falls.',
  ],
  // sentence counts of the French original's 3 paragraphs. Counting note:
  // in ¶2 the printed dialogue turn at the dash («…mon chant. — Chante,
  // chante…») is counted as two sentences (2.4 the cicada's reply, 2.5 the
  // mother's curse) — two utterances, two beats of the story.
  paragraphs: [3, 8, 1],
  cast: [
    { id: 'nena', name: 'nëna plakë', note: 'the old sick mother whose word makes and unmakes — two curses, one blessing', npc: 'nenaTriMotrave' },
    { id: 'merimanga', name: 'Merimanga', note: 'the eldest — vain, loom-bound; the spider ever since', npc: 'motraMerimanga' },
    { id: 'gjinkalla', name: 'Gjinkalla', note: 'the second — careless, singing her days away; the cicada ever since', npc: 'motraGjinkalla' },
    { id: 'bleta', name: 'Bleta', note: 'the youngest — dutiful, never idle; blessed into the bee', npc: 'motraBleta' },
  ],
  // anchor = the game location this tale place inhabits. The game ALREADY
  // stages this tale at the gjizar1 lane-fork (scenes bleta1 / bletaFund /
  // merimangaFund alias to its map spot), so the tale anchors are the
  // village's own places.
  places: [
    { id: 'home', emoji: '🏠', name: 'the mother\'s house', note: 'the one-room house at the lane fork where the whole tale plays',
      anchor: { status: 'existing', node: 'gjizar1', mirror: 'a lane-fork house at the edge of old Tirana\'s mëhalla',
        mold: 'the parting lanes at the village\'s edge, and the dying mother\'s one-room house standing on them: three daughters, a loom in the corner, a hive in the yard — the game\'s own scene says «një nënë vdes këtu», and the tale\'s three endings (bleta1/bletaFund/merimangaFund) already share this spot',
        conflicts: 'NOT the Kordha widow\'s bare cottage (the three-friends home proposal at fshatiJeta) — that hearth holds one son and nothing else long sold; this house holds three daughters, a loom and a hive. NOT vatra — the vitore hearth-house belongs to its serpent-keeping family.' } },
    { id: 'hive', emoji: '🐝', name: 'the yard hive', note: 'the skep in the yard — the reason no one blasphemes in this house',
      anchor: { status: 'proposed', node: 'gjizar1', mirror: 'the courtyard straw skep every old Albanian house kept',
        mold: 'the hive of the mother\'s house: honey for the living, wax for the dead — a hive makes a house holy-mouthed',
        proposal: 'draw a straw skep (koshere) in the yard of the mother\'s house at the gjizar1 fork; the bee-blessing ending (bletaFund) becomes its scene, and the blaspheme-ban line belongs on it' } },
    { id: 'grass', emoji: '🌾', name: 'the summer grass', note: 'the grass stem where the cicada sings and dries',
      anchor: { status: 'existing', node: 'fshatiSheshi', mirror: 'the village square of old Tirana on a summer night',
        mold: 'on warm nights a cicada sings in the dark here — the square\'s own night-line («një gjinkalla këndon në errësirë»); its grassy edge is her stem. Night song beside the day\'s square-life — nothing clashes',
        sharedWith: ['the village-life quarter (square scenes, wedding, the old man\'s bench)'] } },
    { id: 'graves', emoji: '🕯️', name: 'the graves', note: 'where the bee\'s wax burns for the dead',
      anchor: { status: 'existing', node: 'varret1', mirror: 'the village graveyard on the hill above the church',
        mold: 'candles for the dead burn here — the widow keeps a forty-day flame («dyzet ditë qiriu ka zjarr»); every candle is the bee\'s wax, so the graveyard and the hive are two ends of one thread',
        sharedWith: ['the graveyard candle scene (varret1/varretFund)'] } },
  ],
  items: [
    { id: 'pelhura', emoji: '🕸️', name: 'the unfinished web', note: 'the cloth on the loom — cursed never to be finished' },
    { id: 'kulaci', emoji: '🫓', name: 'the little cake', note: 'baked by the youngest — the last comfort of the sickbed' },
    { id: 'dylli', emoji: '🕯️', name: 'the wax', note: 'the bee\'s wax — candles for the dead' },
    { id: 'mjalti', emoji: '🍯', name: 'the honey', note: 'the bee\'s honey — food of the living' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md). You
  // become one of a dying woman's three daughters; the CHOICE when she calls —
  // tend her, weave on, or sing on — decides which sister you are and the fate her
  // last breath fixes: the bee (blessed), the spider (endless web), or the cicada
  // (sing till death). become:'bee-spider-cicada' rides the entry into bleta1.
  play: {
    entry: 'motrat',
    stance: 'embodied',
    as: 'bleta',
    role:
      'You are one of a dying woman\'s three daughters. When she calls from her bed, your answer — tend her, or weave on, or sing on — decides which sister you are, and the fate her last breath fixes on you: the spider at her web that never finishes, the cicada who sings until she dries on the grass, or the bee, wax for the dead and honey for the living.',
    enter:
      'a dying woman calls from her bed, and you are one of her three daughters — how you answer will decide which of them you are',
    from: 'bleta1',
    ending: 'bletaFund',
    scenes: {
      bleta1: 'motrat',
      merimangaFund: 'pelhura',
      gjinkallaFund: 'kenga',
      bletaFund: 'bleta',
    },
    divergences: [
      { beat: 'motrat', note: 'The folktale fixes each daughter\'s nature (vain eldest, careless second, dutiful youngest); the game makes it a three-way fork and your ONE answer to the dying mother assigns which sister you are — tend her → the bee (the good ending), weave on → the spider (endless web), sing on → the cicada (sing until you die). The two neglectful fates are the mother\'s curse; only the bee is her blessing.' },
      { beat: 'bleta', note: 'You embody "a daughter"; the mother\'s dying words are the transformation. Her blessing on the bee — "the light of the ancestors and the food of the living" — is staged as the wax for the dead\'s candles and the honey for the living that close the good ending.' },
      { beat: 'kosherja', note: 'The framing devotion — that in a house which keeps a hive no one will ever blaspheme — is kept in the tale record rather than staged as a scene; the hive itself is the proposed, unshown home of the blessed bee.' },
    ],
  },
  beats: [
    {
      id: 'kosherja', title: 'A house that keeps a hive',
      note: 'The frame the legend hangs on: Albanians revere the bee to the edge of worship — where a hive stands, no tongue in that house blasphemes. This is the legend of why.',
      lines: [
        ['1.1', 'Albanians keep for the bee a devotion close to worship — in a house with hives, no one will ever blaspheme.'],
      ],
      cast: {
        nena: ['home', 'lies sick on her bed, too weak to turn over'],
        merimanga: ['home', 'sits at the loom in the corner, tending her own beauty between rows'],
        gjinkalla: ['home', 'idles about the yard, singing the day away'],
        bleta: ['home', 'sweeps, fetches, kneads — loses no moment of the day'],
      },
      items: { pelhura: ['home', 'half-woven on the loom, growing by the day'] },
    },
    {
      id: 'motrat', title: 'Three daughters',
      note: 'Among the country\'s old legends, one is about the bees themselves: a very old, sick woman and her three daughters — the vain weaver, the careless singer, and the one who was never idle.',
      lines: [
        ['1.2', 'Among the old legends of the country there is a curious one about the bees themselves: a woman, very old and very sick, had three daughters.'],
        ['1.3', 'The eldest, Merimanga the Spider, was vain and tended nothing but herself; the second, Gjinkalla the Cicada, more careless still, sang her days away; the third, Bleta the Bee, worked hard and lost not a moment of the day.'],
      ],
      cast: {
        nena: ['home', 'worsens on her bed; her calls for help begin'],
      },
    },
    {
      id: 'pelhura', title: 'The web that would not wait',
      note: 'Too weak to turn over, the mother calls her eldest — and the loom answers for her. The curse holds to this day: weave on forever, and never finish.',
      lines: [
        ['2.1', 'Too sick to turn over on her bed, the poor old woman called her eldest daughter — who answered that she was weaving her cloth and could not be disturbed.'],
        ['2.2', 'Then the mother spoke: weave on forever, and never be able to finish.'],
        ['2.3', 'And so the spider spins a web without end.'],
      ],
      cast: {
        nena: ['home', 'called her eldest and got the loom\'s answer; speaks the first curse'],
        merimanga: ['home', 'the spider now — spins in the rafters of the house a web she can never finish'],
      },
      items: { pelhura: ['home', 'cursed with its weaver — a web without end, never to be done'] },
    },
    {
      id: 'kenga', title: 'Sing until you die',
      note: 'The second daughter will not break off her song, so the song becomes her sentence: the cicada sings her one summer and dies dried out, her back fastened to a stem of grass — and every summer sings again.',
      lines: [
        ['2.4', 'The second daughter answered: I am singing, and I cannot break off my song.'],
        ['2.5', 'Sing then, said the old mother — sing until you die of it.'],
        ['2.6', 'And the cicada sings still, and dies dried out, her back fastened to a little stem of grass.'],
      ],
      cast: {
        nena: ['home', 'two daughters lost to loom and song; speaks the second curse'],
        gjinkalla: ['grass', 'the cicada now — sings the summer out on a grass stem, drying where she clings'],
      },
    },
    {
      id: 'kulaci', title: 'The cake and the blessing',
      note: 'The third daughter tends the sickbed and bakes a little cake that eases the old woman — and the mother\'s last word is a blessing: you shall be the light of the ancestors and the food of the living.',
      lines: [
        ['2.7', 'The third daughter tended her mother and baked her a little cake that comforted her.'],
        ['2.8', 'Then the mother said: be blessed — you shall be the light of the ancestors and the food of the living.'],
      ],
      cast: {
        bleta: ['home', 'tends the sickbed and bakes the little cake; the blessing falls on her'],
        nena: ['home', 'comforted at last; blesses her youngest — light of the ancestors, food of the living'],
      },
      items: { kulaci: ['nena', 'warm from the hearth — the last comfort of the sickbed'] },
    },
    {
      id: 'bleta', title: 'Wax for the dead, honey for the living',
      note: 'So the bee was made — the one creature whose work feeds both worlds: wax for the candles of the dead, sweet honey for the living. The mother goes to her rest under the first of those candles, and no one blasphemes in a house that keeps a hive.',
      lines: [
        ['3.1', 'And the bee makes wax for the candles of the dead, and sweet honey for the living...'],
      ],
      cast: {
        bleta: ['hive', 'the bee now — works the yard skep, filling comb for both worlds'],
        nena: ['home', '☠ dies eased and blessed; the first candle of her daughter\'s wax burns for her'],
      },
      items: {
        dylli: ['graves', 'burning as candles for the dead — forty days a flame'],
        mjalti: ['home', 'sweet on the table of the living'],
      },
      exit: ['nena'],
    },
  ],
}
