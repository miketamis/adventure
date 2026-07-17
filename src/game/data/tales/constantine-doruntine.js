// ===========================================================================
// TALE: Constantine & Doruntine — the besa beyond death — see ../tales/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it.
//
// A BALLAD-TALE, told here in Elsie's VERSE translation of a Chameria (South
// Albania) recording. The game ALREADY STAGES a condensed version of this
// exact legend as the kostandin1 → kostandin2 → kostandin3 → kostandinFund /
// kostandinPushim side-quest, with the core NPC `kostandini` fixed at
// kostandin1 ("his stone stands by the church") — these beats retell the
// fuller ballad behind that vignette, and must stay compatible with it.
// ===========================================================================

export default {
  id: 'constantine-doruntine',
  title: 'The Ballad of Constantine and Dhoqina',
  source:
    'Recorded in Arpica, near Margëlliç (Margariti), Chameria (NW Greece), pub. in Balada shqiptare, ed. Vladimir Zoto (Tiranë: Dasara, 2006), pp. 57–59 · read in R. Elsie\'s translation (Albanian Literature, Oral Verse 4); all lines paraphrased',
  origin: {
    region: 'Pan-Albanian ballad (per Elsie\'s own headnote it is "known wherever Albanian is spoken"); this specific recording: Chameria / South Albania (Tosk) — Arpica, near Margëlliç (Margariti), Epirus, in present-day Greece',
    collector: 'field-recorded for Balada shqiptare, ed. Vladimir Zoto',
    published: 'Tiranë: Dasara, 2006, pp. 57–59; Eng. tr. Robert Elsie',
  },
  // the ALBANIAN ORIGINAL is a DIFFERENT recording of the same ballad type —
  // a plainer 1954 prose telling, the only Albanian text of this legend found
  // in the local corpora (hahn/jarnik/lambertz/dozon/meyer/fishta searched, no
  // hits outside this one passage). Same core figures and besa-curse; its own
  // details diverge from Elsie's verse — see `discrepancies`.
  albanian: {
    title: '«Plaka me nëntë djelm» (The old woman with nine sons)',
    source:
      'Pralla popullore shqiptare, Instituti i Shkencave, Tiranë 1954, p. 137 — a prose recording of the same Kostandin-and-sister ballad type Elsie translates in verse, not a translation of Elsie\'s specific text',
    local: 'docs/references/plaka-nente-djelm-kostandin.sq.txt',
  },
  discrepancies: [
    'FAMILY SIZE: the folklore card (drawing on the English Wikipedia article) says Doruntine is one of thirteen children, with twelve brothers; both primary texts actually in hand — Elsie\'s Chameria ballad AND the 1954 Tiranë prose text — agree on NINE brothers and one sister. Beats follow the two sources actually recovered.',
    'THE ENEMY (¶2.1): Elsie\'s ballad names the war as fought "with Russia"; the Albanian only says «ngjanë luftëra të mëdha» (great wars broke out), naming no enemy. Beats keep Elsie\'s "Russia" as color; the Albanian citation supports only the general war.',
    'THE TOMBSTONE-HORSE (¶4.1): Elsie\'s ballad gives the vivid image of the tombstone turning into a stallion and the grave-soil into a saddle; the Albanian has no transformation at all — simply «u ngrit nga varri» (he rose from the grave). Beats keep Elsie\'s image as color; the Albanian citation supports only the plain rising.',
    'THE REUNION AT THE DANCE: Elsie\'s ballad stages a tender exchange at Doruntina\'s round-dance ("do you not long for your family?"; "good or bad news?"; "come as you are, in those garments"); the Albanian is far terser — «e vate tek e motra, edhe e mori atë» (he went to his sister and took her) — no dance, no dialogue. Not given separate beat lines; the paraphrase stays with the terser, attested version, folded into the rising-and-riding beat.',
    'THE THREE QUESTIONS ON THE ROAD: Elsie\'s ballad has Dhoqina question her brother three times about physical signs — the smell of earth/gunpowder off his shoulders, the glare in his hair/dust of the road, the blackened house/her mother grown old. The Albanian I found has no such dialogue at all; instead it gives THREE BIRDS along the road, singing the same eerie refrain three times over ("the living rides with the dead"), which Doruntina questions and Kostandini turns aside, twice. Both variants share the threefold-sign, twice-explained-away shape; beats follow the ATTESTED Albanian device (the birds) rather than inventing Albanian for Elsie\'s specific dialogue.',
    'ONE DEATH OR TWO (¶8.2-3): the Albanian source kills ONLY the mother, instantly, the moment she sees her daughter\'s finger through the door-gap — Doruntina herself is explicitly left «për jashta derës» (outside the door), alive. Elsie\'s ballad — and the game\'s already-live kostandinFund ending ("both fell dead in the same breath") — has both women\'s hearts stop together. Beats follow Elsie and the existing game canon for consistency; the Albanian citation given supports the mother\'s death only.',
    'THE DAUGHTER\'S NAME: Elsie\'s Chameria ballad calls her Dhoqina (also given as Garantina or Fjoruntina in other regional tellings, per Elsie\'s own headnote); the 1954 Albanian prose text never names her at all (only «e motra» / «çupa» — "the sister" / "the girl"). The game already calls her Doruntina/Doruntine, matching the tale\'s id and its existing NPC and vocabulary; beats use that name throughout.',
    'THE HERO\'S OTHER NAMES: per Elsie\'s headnote, the same dead-brother figure is called Halil Garria in northern Albania, and Ali or Hysen i vogël on occasion among the Muslims of central Albania — regional names for one folk-figure, not separate figures; kept here for color only, never staged.',
  ],
  // Elsie's 91 verse lines are grouped here into 9 narrative paragraphs / 27
  // sentence-units (a "sentence" = a punctuation-bounded verse-group); see the
  // beats below for exactly which verse lines each unit covers.
  paragraphs: [2, 1, 4, 2, 6, 2, 6, 3, 1],
  cast: [
    { id: 'kostandini', name: 'Kostandini', note: 'the ninth and youngest son — the one who swore the besa, the one who kept it from the grave', npc: 'kostandini' },
    { id: 'nena', name: 'the mother', note: 'widowed; loses her daughter to a far marriage and all nine sons to one year of war', npc: 'nenaKostandinit' },
    { id: 'doruntina', name: 'Doruntina', note: 'the only daughter — married far away, ridden home once by her dead brother', npc: 'doruntina' },
    { id: 'vellezerit', name: 'the eight brothers', note: 'Kostandini\'s older brothers, unnamed in every telling; die with him in the same war', npc: 'vellezeritKostandinit' },
    { id: 'princi', name: 'the foreign husband', note: 'never named or seen — his letter starts the whole ballad, seven mountains away', npc: 'dhenderriHuaj' },
  ],
  // anchor = the game location this tale place inhabits. This tale's PRIMARY
  // place is NOT proposed — it is the game's EXISTING kostandin1 side-quest,
  // which already tells a condensed version of this exact legend (see the
  // header comment). Elsie's specific recording is southern (Chameria), but
  // per Elsie's own headnote the ballad "is known wherever Albanian is
  // spoken" — north and south, Kosova, Montenegro, Macedonia, the diaspora —
  // so the game's one common village grave suits it better than any single
  // region's castle would, and the existing anchor is kept as-is.
  places: [
    { id: 'home', emoji: '🪦', name: 'Kostandini\'s grave, by the village church', note: 'the mother\'s vigil, the curse, the rising, and (telescoped into the same ground, as the existing scene already does) the daughter\'s knock at the door',
      anchor: { status: 'existing', node: 'kostandin1', mirror: 'a village churchyard grave beside the parish church — the legend belongs to no one region, so the game\'s one common grave (already carrying Kostandini\'s NPC and its condensed retelling) suits it better than a region-specific castle would',
        mold: 'a mother\'s grief at her dead son\'s grave, the curse that wakes him, and — narrated as one continuous scene, exactly as the existing kostandin1→kostandinFund arc already does — the daughter\'s arrival at the door and the deaths that follow; this tale IS that existing scene, filled out',
        conflicts: 'not shared with any other tale\'s anchor — no other tale file reuses kostandin1' } },
    { id: 'road', emoji: '🛤️', name: 'the road across seven mountains', note: 'the night ride, the three birds that sing of the living and the dead',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of old Tirana at the tanners\' bridge',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash; here it carries a dead man riding by night with his living sister behind him',
        sharedWith: ['three-friends', 'half-rooster', 'snake-bridegroom', 'nastradin', 'tortoise', 'the whole travel spine'] } },
    { id: 'distantVillage', emoji: '💒', name: 'the foreign village, seven days off', note: 'where Doruntina is married and where Kostandini finds her at the round-dance',
      anchor: { status: 'offstage', mirror: 'the far side of the seven mountain ranges this ballad crosses',
        mold: 'never staged — like the rival kings\' lands in three-friends or the krahina of Gjergj Elez Alia, the tale only speaks of this place; the game never visits it' } },
    { id: 'war', emoji: '⚔️', name: 'the war (unnamed fields, or "Russia" per Elsie)', note: 'where all nine brothers fall within the same year',
      anchor: { status: 'offstage', mirror: 'the foreign battlefields of the ballad\'s war — Elsie\'s Chameria variant names Russia, the Albanian source names no enemy',
        mold: 'never staged — like the rival kings\' lands in three-friends; the war is spoken of, not shown' } },
  ],
  items: [
    { id: 'gurVarri', emoji: '🪦', name: 'the gravestone', note: 'Kostandini\'s headstone by the church — the ballad says it becomes his black horse for the one night\'s ride, then a stone again' },
  ],
  // how the game stages this tale — the WITNESS projection (see _SCHEMA.md). The
  // besa CENTREPIECE, and a ballad no traveller-soul can embody (you cannot be a
  // dead man risen), so you hear it at the grieving mother's door — with one
  // intervention: comfort her and let the dead rest (kostandinPushim) instead of
  // letting her curse open the grave. The famous night-ride exchange is a Q() quote.
  play: {
    entry: 'family',
    stance: 'witness',
    role:
      'You come to a grieving mother\'s door and hear the oldest besa-ballad of all: how her son Kostandini swore to bring her married daughter home whenever she wished — alive or dead — and how, when the wars took all nine of her sons and she cursed him at his grave, the besa would not let him lie still. He rose, and rode through the night, and kept his word beyond death itself.',
    from: 'kostandin1',
    ending: 'kostandinFund',
    scenes: {
      kostandin1: 'curse',
      kostandin2: 'rising',
      kostandin3: 'omens',
      kostandinFund: 'threshold',
    },
    divergences: [
      { note: 'The game\'s WITNESS stance on the besa centrepiece: the traveller-soul cannot be a dead man rising, so the ballad is heard at the mother\'s door rather than embodied. But the listener is given one mercy-intervention — comfort her and let the dead rest ("Let the Dead Rest", kostandinPushim) instead of letting her endless curse crack the grave open.' },
      { beat: 'omens', note: 'The legend\'s most famous exchange — riding in the dark, "why do you smell of earth?" / "it is the dust of the road" — is slotted word-for-word as a Q() quote, and the game underlines that Kostandini rises by the power of the besa, not as a lugat (revenant): "the son is not a lugat; the besa wakes the son."' },
      { beat: 'threshold', note: 'The nine dead brothers, the marriage seven mountains away, the birds\' thrice-sung omen, the finger through the door and mother-and-daughter\'s shared death are compressed across the ballad\'s nodes; the storyteller\'s closing wink (this is a tale of the sacred besa, not a horror) frames the whole.' },
    ],
  },
  beats: [
    {
      id: 'family', title: 'Nine sons and a daughter',
      note: 'A widowed mother has raised nine sons — all of them called heroes — and one daughter, still unmarried. A proposal comes from a distant land; her brothers refuse it, but the youngest, Kostandini, presses hardest of all, and in time she is married off far away, over her mother\'s own heart.',
      lines: [
        ['1.1', 'Long ago, a mother had nine sons — every one of them a dashing young hero — and a single daughter, still unmarried and quick as a hawk.', "Qe një plakë që kish nëntë djelm edhe një çupë."],
        ['1.2', 'A proposal came from a distant land asking for her hand; her brothers refused it, but Kostandini, the youngest, pressed for the match harder than all the rest, and in time she was married off to that foreign village, far from her mother\'s heart.', "Këtë çupë martuan ata djelm së largu në një fshat të huaj, thuajse pa dashuri të s'ëmës, e më tepër nga të gjithë Konstandini vuri ngulm për t'a martuar atje."],
      ],
      cast: {
        nena: ['home', 'raises nine sons and one daughter alone in the village'],
        kostandini: ['home', 'the ninth and youngest son; pressed hardest for the far marriage'],
        vellezerit: ['home', 'eight brothers, all of them called heroes; outvoted by their youngest'],
        doruntina: ['distantVillage', 'married off across seven mountain ranges, over her mother\'s heart'],
        princi: ['distantVillage', 'her new husband, whose letter began it all'],
      },
    },
    {
      id: 'war', title: 'The wars take them all',
      note: 'Before long, great wars break out. All nine brothers march off to fight, like every brave man of the land — and within that same year, every one of them is killed. (Elsie\'s variant names the enemy as Russia; the Albanian source names no enemy at all.)',
      lines: [
        ['2.1', 'Before long, great wars broke out, and all nine brothers marched off to fight, like every other brave man of the land — and within that same year, fighting Russia, every one of them was killed.', "Pas ca kohe ngjanë luftëra të mëdha, edhe ata djem vajtën në luftë, si gjithë trimat e tjerë, e u vranë të nëntë atij viti."],
      ],
      cast: {
        kostandini: ['war', '☠ falls with his brothers, within the same year'],
        vellezerit: ['war', '☠ all eight die alongside their youngest brother'],
      },
      exit: ['vellezerit'],
    },
    {
      id: 'curse', title: 'A curse at the grave',
      note: 'Left with no child at all beside her, the grieving mother comes again and again to her sons\' graves — to Kostandini\'s most of all — weeping over him, and crying out the besa he swore her before he left.',
      lines: [
        ['3.1', 'Left with no child at all to comfort her, the grieving mother went again and again to her sons\' graves — to Kostandini\'s most of all — weeping over him.', "E zeza e ëma, helmuar kaqë tepër, duke mos pasur pranë as çupëzën ndonjë që t'i rëkonej asaj, vente mbi varr të djemvet saj, e më tepër të Kostandinit, e thërriste duke qarë mbi të:"],
        ['3.2', '"Kostandini, my son," she cried, "where is the besa you gave me?"', "«O Kostandin, biri im! Ku e ke besën që më dhe?"],
        ['3.3', '"Bring me my daughter, as you swore you would — my heart is scorched, and I want to see her, to quench this fire in me and find some peace."', "Sillmë çupën që m'e martove së largu, se m'u dogj zemra, e dua t'a shoh, që të shuanj këtë zjarr që kam, edhe të halladitem me atë ndopak."],
        ['3.4', '"Did you truly die, my son, and go, and leave your word behind you?"', "Po hy vdiqe edhe shkove, o bir!»"],
      ],
      cast: {
        kostandini: ['home', 'lies buried in his grave by the church, silent through his mother\'s weeping'],
        nena: ['home', 'comes again and again to his grave, and at last cries out the curse'],
      },
      items: { gurVarri: ['home', 'his headstone, standing quiet by the church'] },
    },
    {
      id: 'rising', title: 'The grave opens',
      note: 'Unable to bear her weeping any longer, Kostandini cannot lie still. The ballad says his very tombstone turns into a black horse beneath him; in a single ride across seven mountain ranges he reaches his sister\'s village and takes her, to carry her home. (No dance, no reunion dialogue survives in the Albanian text — it is this terse.)',
      lines: [
        ['4.1-2', 'Unable to bear her endless weeping any longer, Kostandini could not lie still — he rose up out of the grave (the ballad says his very tombstone turned to a black horse beneath him for the ride), and in a single swift crossing of seven mountain ranges he reached his sister, and took her, to carry her home to their mother.', "E Kostandini, pasi s'pushonte e ëma së vajtuari, e së ulëryeri, nga të keqtë që i erdh, u ngrit nga varri, e vate tek e motra, edhe e mori atë, t'ia shpjerë s'ëmës."],
      ],
      cast: {
        kostandini: ['distantVillage', 'crosses seven mountain ranges in one ride; takes his sister to bring her home'],
        doruntina: ['distantVillage', 'taken up by her brother, not yet knowing why'],
        princi: ['distantVillage', 'left behind as his wife is carried off in the night'],
      },
      items: { gurVarri: ['road', 'his own tombstone, ridden as a black horse'] },
    },
    {
      id: 'omens', title: 'Birds along the road',
      note: 'As brother and sister ride the road together, birds break into song above them — three times over, in three different birdsongs — always the same eerie refrain: the living rides with the dead. Twice Doruntina asks what it means; twice Kostandini turns her question aside.',
      lines: [
        ['5.1', 'As brother and sister rode the road together, birds broke into song above them: the living rides with the dead, they seemed to call.', "Udhës tek ecnin të dy, Kostandini me të motrën, namëta u kënduan gajat: «ga, ga, ga, ecën i gjalli me të vdekurin»."],
        ['5.2', 'Alarmed, Doruntina asked her brother what such birds could mean by singing so.', "Atëherë i thotë e motra të vëllait: «Kostandin, vëllai im, ç'thonë kështu këto gala?»"],
        ['5.3', '"It is nothing, sister," he answered — "they are only birds, singing as birds do."', "E ai iu përgjegj: «Nuk është gjë, moj motër, se ata si shpesa që janë po këndojnë»."],
        ['5.4', 'Further along the road, other birds took up the very same call.', "Vanë më tej, e u kënduan arrabelat: «ciu, ciu, ecën i gjalli me të vdekurin»."],
        ['5.5', 'Again she asked what it meant, and again he turned her question aside the same way as before.', "E pyet prapë e motra Kostandinin, po ai u përgjegj përsëri ashtu si edhe më parë."],
        ['5.6', 'Nearing their own village at last, a third flock of birds sang the same eerie warning once more.', "Duke hequr udhë, u afruan te fshati i tyre, e atje pameta u kënduan kën-lezet: «ki, ki, ki, shkon i gjalli me të vdekurin»."],
      ],
      cast: {
        kostandini: ['road', 'rides on beneath the threefold birdsong, answering nothing true'],
        doruntina: ['road', 'questions the strange birds three times, and is turned aside twice'],
      },
      items: { gurVarri: ['road', 'still his mount for the ride home'] },
    },
    {
      id: 'trick', title: 'Go on ahead',
      note: 'As they near the house, Kostandini tells his sister a lie — go on ahead, he says, I\'ll follow right behind you — and the moment she walks on alone, he turns back to his grave.',
      lines: [
        ['6.1', 'As they neared the house, Kostandini told his sister a lie: go on ahead of me, he said — I\'ll follow right behind you.', "Të pastajmen, kur ata u ngasën te shtëpia e tyre, Kostandini gënjeu të motrën duke i thënë: «Shko ti përpara, pa edhe unë po vij pas teje»,"],
        ['6.2', 'And the moment she walked on alone, he turned back to his grave.', "edhe vate prapë në varr."],
      ],
      cast: {
        doruntina: ['home', 'sent on alone to the house, not yet knowing why'],
        kostandini: ['home', 'slips back into his grave the moment she walks on'],
      },
      items: { gurVarri: ['home', 'a stone again, standing quiet by the church'] },
    },
    {
      id: 'door', title: 'Who is there?',
      note: 'Doruntina reaches the door alone and knocks. Her mother will not believe the voice she hears is her own daughter\'s, and demands proof before she opens.',
      lines: [
        ['7.1', 'She went on to the door of the house and knocked.', "Ajo hoqi e vate në derë të shtëpisë, edhe trokiti mbë derët: «tak, tak»."],
        ['7.2', 'Her mother called out: who is there?', "E ëma thirri: «Kush është?»"],
        ['7.3', '"It\'s me, your daughter," she answered. "Open the door."', "«Unë jam, jot bijë, po hape», i tha çupa."],
        ['7.4', '"You are not my daughter," the mother told her.', "E ajo i tha: «Nuk je ti, ime bijë»."],
        ['7.5', '"I am," she insisted once more.', "Çupa i tha përsëri: «Unë jam»."],
        ['7.6', '"Then prove it," said the old woman. "Slip your little finger through the door, so I may see it first, before I open."', "Pasandaj i tha plaka: «Fut gishtin e vogël të dorës nëpër derë, sa të t'a shoh më parë, pa të të hap»."],
      ],
      cast: {
        doruntina: ['home', 'knocks at the door and pleads to be let in'],
        nena: ['home', 'refuses to believe her own daughter\'s voice, and demands proof'],
      },
    },
    {
      id: 'threshold', title: 'The finger through the door',
      note: 'Doruntina slips her finger through the gap. In the Albanian source, the sight kills only the mother, instantly — the daughter is left outside, alive. The ballad Elsie translates, and the game\'s own kostandinFund ending, have both women\'s hearts stop together, and the beats follow that fuller telling.',
      lines: [
        ['8.1', 'Doruntina slipped her finger through the gap in the door.', "Edhe çupa e futi gishtin e saj nëpër derë."],
        ['8.2', 'The instant her mother saw it, her own heart gave out, and she fell dead on the spot.', "Po e ëma, posa e pa atë, vdiq në çast,"],
        ['8.3', 'And in that same breath, the fuller telling of this ballad says, both mother and daughter\'s hearts stopped together, there at the open door.', "edhe ajo për brenda, edhe e bija për jashta derës."],
      ],
      cast: {
        nena: ['home', '☠ her heart gives out the instant she sees the proof'],
        doruntina: ['home', '☠ (per the fuller telling followed here) dies with her mother at the same door'],
        kostandini: ['home', '☠ his besa kept and closed; he rests now for good'],
      },
      exit: ['nena', 'doruntina', 'kostandini'],
    },
    {
      id: 'wink', title: 'The teller\'s wink',
      note: 'The 1954 print closes, as many Albanian folk-prose tales do, with the teller\'s own wink at the audience — a reminder that this was told for delight, not sworn as history.',
      lines: [
        ['9.1', 'And there the old storytellers always add their traditional wink: don\'t mistake this for a true history — it was only told to charm you a little.', "As përrallë s'ju rrëfeva, po desha t'ju gënjeva."],
      ],
      cast: {
        princi: ['distantVillage', 'left alone, never learning why his wife rode off and never returned'],
      },
    },
  ],
}
