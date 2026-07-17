// ===========================================================================
// TALE: The Snake and the King's Daughter — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it.
//
// The game ALREADY stages this tale as a told-vignette at the serpent's cave
// (bota2 — gjarperOrigin → gjarperBurr1/2 → gjarperKerkim → gjarperKulshedra
// → gjarperBurrFund, plus the gjarperRefuz/gjarperBurrVdes/gjarperKulVdes
// exits). Three-friends-style, the anchors below are where the tale's WORLD
// places live on the map, not where the vignette is told.
//
// NO ALBANIAN ORIGINAL FOUND (see albanian.why) — lines carry no third
// element by design, and no docs/references extract exists: the only text we
// could transcribe is Elsie's English, which is copyrighted and must not
// enter the repo.
// ===========================================================================

export default {
  id: 'snake-bridegroom',
  title: 'The Snake and the King\'s Daughter',
  source:
    'Instituti i Folklorit archive text, Folklor shqiptar 1 — Proza popullore (Tiranë 1963) · read in R. Elsie\'s translation (tale 13, ATU 425); all lines paraphrased',
  // where the tale comes from — anchors should prefer this region's mirrors.
  // The 1963 volume's redaction is standard Albanian and Elsie's source note
  // names no district, so — maiden-promised-sun-style — the game's village
  // stands in for the royal town.
  origin: {
    region: 'unspecified (the 1963 Tirana redaction prints no district in Elsie\'s source note) — the game\'s village stands in for the royal town',
    collector: 'Instituti i Folklorit, Tirana (archive text; the individual teller/collector is unnamed in Elsie\'s source note)',
    published: 'Tiranë, 1963 (Folklor shqiptar 1, Proza popullore)',
  },
  // No Albanian original found — the lines carry NO third element by design.
  albanian: {
    status: 'missing',
    why:
      'Elsie\'s source is Folklor shqiptar 1, Proza popullore (Tiranë 1963), which is not digitized anywhere reachable: archive.org (metadata + scrape API) has no scan, Google Books holds a metadata-only record with no preview, and the BKSH digital library exposes no working search endpoint. The local corpora have no variant of this tale: the 1954 Pralla popullore shqiptare\'s own bibliography lists all 38 of its tales (no snake-bridegroom; its snake tales — Feniçka, the cave-serpent — are other types; a separate iron-shoes wonder-tale in that same volume, p. ~48, is a "qose"/godfather-elephant tale, not this one — the iron-shoes journey is a stock device, not proof of a match). RE-CHECKED against docs/references/dozon-manuel-langue-chkipe.fr-sq.txt (2026-07): its own table of contents lists all 24 tales by title (Patimé; Les sœurs jalouses; L\'ours et le derviche; Le pou; Mosko et Tosko; La Belle de la terre; Le soulier; Le coq qui pond de l\'or et la poule qui pond des serpents; La fille promise au soleil; La boucle d\'or; La pierre merveilleuse; Le joueur de violon; Le pêcheur; La princesse de la Chine; Le lion aux pièces d\'or; La liouhia et la belle de la terre; Le serpent reconnaissant et la tabatière merveilleuse; Le coffre merveilleux; Le fils ingrat; L\'enfant vendu; La fille changée en garçon; Les diables dupés; Les deux voleurs; Les trois frères et les trois sœurs) — no "serpent époux"/bridegroom title among them. Tale 17, read in full, is the OTHER snake tale already on record: a frozen snake rescued by a poor boy, whose father rewards him with a wonder-snuffbox (not a son born a snake, no bride-condition test, no Kulshedra-abroad rescue) — confirmed a different ATU type, not this one. RE-CHECKED also against docs/references/dozon-contes-albanais.fr.txt (2026-07), Dozon\'s earlier French edition (24 tales, same list, cross-numbered to the Manuel, plus wedding customs at Përmet and an Abeille chkipe supplement): its table of contents carries no serpent-bridegroom title either, and grepping "serpent" across all ~9,200 lines turns up only the same two grateful-snake-and-treasure tales (Le serpent reconnaissant, nos. 9-10, matching the Manuel\'s tale 17 already ruled out) plus one "l\'époux" in the closing essay "Analyse de Psyché" — Dozon\'s own scholarly comparison of the volume\'s motifs to Apuleius\'s Cupid-and-Psyche, noting the animal-bridegroom-by-night motif\'s kinship to that Latin fable in passing, not an Albanian folk text and nothing transcribable. Hahn/Jarnik/Meyer/Lambertz were grepped without a hit (Hahn\'s ATU 425 "Schlangenkind" exists only in his German translation). Web searches under the plausible Albanian titles («Gjarpri dhe e bija e mbretit», «Gjarpri dhe çupa e mbretit») and under motif phrases (këpucë të hekurta, dy kazana me lot, the Kulshedra\'s chant) find only Anton Nikë Berisha\'s modern copyrighted poetic retelling («Gjarpri martohet me vajzën e mbretit», from an Arbëresh teller — a different variant besides) and snake-cult journalism. Nothing found may feed the Q() quote system; back-translating is forbidden.',
  },
  // Where the telling the beats follow (Elsie) and the in-game/lore canon
  // disagree — recorded so the reconciliation pass isn't re-litigated. With
  // the Albanian missing, these quote the game's own Albanian where relevant.
  discrepancies: [
    'WHO BREAKS THE SECRET (¶9.10-11): the lore card and the gjarperBurrFund blurb have the player-wife keep faith ("You kept faith and never betrayed him — but the secret slipped out all the same"); in Elsie SHE bursts it out herself at the wedding, goaded by her mother\'s praise of the dancer. The beats follow Elsie: the outburst is hers, the goad is the queen\'s.',
    'WHOSE WIT FREES HIM (¶15-18): the lore card credits the wife ("frees him not by force but by wit, answering the Kulshedra\'s impossible chores with cleverer tricks"), and the in-game scene hands the salt-water trick to the visiting player («ujë me kripë bëhet lot», gjarperKulshedra); in Elsie every trick is SWIFT\'s — the bread-crust sweep, the salted cauldrons, and the coffin that ends the beast. The beats follow Elsie.',
    'THE MOON\'S GENDER (¶10.20, ¶11.2): Elsie\'s moon is "he" ("ask the moon if he\'s seen him at night"); the game\'s core Hëna (henaPaqe) is she. The beats cast the game\'s Hëna and paraphrase without the pronoun.',
    'THE SEARCH KIT (¶9.17): Elsie names iron shoes, an iron staff and a travelling case; the lore card and the game scene keep only the iron shoes («ti vesh hekur në këmbë», gjarperKerkim). The beats keep all three.',
    'WHO CARRIES HIM OFF (¶9.12, ¶13.8): the lore card says he "vanishes, carried off by a Kulshedra beyond the sea"; Elsie shows only the vanishing, and the FACT of the Kulshedra arrives two houses later, in the Wind\'s answer. The beats follow Elsie\'s order of revelation (the keyframe board, which states world-truth, does place him beyond the sea from the vanishing on).',
    'THE SUN\'S APPETITE (¶10.10-15): core canon\'s Dielli is the oath-keeping all-seeing eye and the maiden tale\'s protector; here he comes home spent, demanding human flesh, then keeps the promise his mother wrings from him. No contradiction is read: his sworn word rules him — the beats keep both the hunger and the kept promise.',
  ],
  // sentence counts of the translation's 19 paragraphs (Elsie's tale 13).
  // Counting note: quoted speech is counted at its own terminal marks — e.g.
  // the king's furious reply in ¶1, naming the suitor a snake, splits into
  // two sentences (1.8, 1.9); reporting clause and quote together count as
  // one when they share one terminal mark.
  paragraphs: [10, 9, 4, 10, 9, 11, 11, 5, 18, 20, 6, 6, 14, 10, 14, 10, 4, 13, 4],
  cast: [
    { id: 'oldWoman', name: 'plaka', note: 'the childless old woman who kept a snake for a son', npc: 'plakaGjarprit' },
    { id: 'snake', name: 'Gjarpri / Shpejti', note: 'the snake bridegroom — snake by day, a man named Swift by night', npc: 'shpejti' },
    { id: 'king', name: 'the king', note: 'sets the three impossible conditions; the saraj\'s petty king', npc: 'mbretiSarajit' },
    { id: 'queen', name: 'the queen', note: 'the bride\'s mother — her weeping, then her praise, goads the secret out', npc: 'mbretereshaSarajit' },
    { id: 'bride', name: 'the king\'s daughter', note: 'the heroine: bride, secret-breaker, iron-shod seeker', npc: 'nusjaGjarprit' },
    { id: 'attendants', name: 'the four hundred horsemen', note: 'conjured from the ring, a rider for every color the earth holds', npc: 'kaloresitUnazes' },
    { id: 'sunMother', name: 'Nëna e Diellit', note: 'the Sun\'s mother — hides the guest, wrings out the promise', npc: 'nenaDiellit' },
    { id: 'sun', name: 'Dielli, the Sun', note: 'sees everything by day — but not Swift; points to the Moon', npc: 'dielli' },
    { id: 'sunChildren', name: 'the sun-children', note: 'fly at the smell of a human; called off by their grandmother', npc: 'femijetDiellit' },
    { id: 'moon', name: 'Hëna, the Moon', note: 'has seen nothing by night; points on to the Wind', npc: 'hena' },
    { id: 'windMother', name: 'the Wind\'s mother', note: 'keeps the Wind\'s hearth; takes the spent girl in', npc: 'nenaEres' },
    { id: 'wind', name: 'Era, the Wind', note: 'knows where the lost are held; carries the girl over the sea', npc: 'era' },
    { id: 'windChildren', name: 'the wind-children', note: 'come blowing round to devour the stranger; called off', npc: 'femijetEres' },
    { id: 'kulshedra', name: 'the over-sea Kulshedra', note: 'keeps Swift beyond the sea; calls her larder "daughter"', npc: 'kulshedraPertejdetit' },
  ],
  // anchor = the game location this tale place inhabits — REUSE over
  // invention, under THE SHARING RULE (see _SCHEMA.md). The tale names no
  // region, so its town-half mirrors the game's own village (old Tirana) and
  // its far half lives beyond the sea, where the map has no nodes yet.
  places: [
    { id: 'cottage', emoji: '🏠', name: 'the old woman\'s cottage — the snake\'s palace', note: 'one room and a hearth; for one midnight of wonders, a palace outsizing the king\'s own',
      anchor: { status: 'proposed', node: 'fshatiJeta', mirror: 'a woodgatherer crone\'s hut at the poor edge of old Tirana\'s village-life quarter, within sight of the saraj across the plain',
        mold: 'a childless crone\'s one-room hut with a foster snake by the hearth — and the memory that for one night of the tale\'s telling it rose into a palace outsizing the king\'s own, and has stood as Swift and his wife\'s home ever since',
        conflicts: 'NOT the three-friends widow\'s cottage (also proposed at fshatiJeta — that hearth holds one human son and everything else long sold; this one holds a snake and a cat: two different crones, two different doors in one quarter). NOT vatra — the vitore hearth-house feeds its luck-serpent milk in the wall and never weds it out; the snake-son rhymes with the house-serpent but is another creature. NOT gjizar1 — the three sisters\' house at the lane fork is claimed by the bee tale.',
        proposal: 'add the snake-mother\'s cottage at the quarter\'s poor edge toward the crossroads plain; the silk path of the tale ran from its door to the saraj\'s' } },
    { id: 'forest', emoji: '🌲', name: 'the firewood forest', note: 'where the old woman gathers her daily load — and the snake rides home in it',
      anchor: { status: 'existing', node: 'pylli1', mirror: 'the edge of the great forest across the bridge from the village',
        mold: 'the great forest\'s edge is common ground — firewood gathering, wanderers, beasts passing; open woodland accumulates stories without owning any',
        sharedWith: ['the dervish-and-bear arc', 'the forest travel spine'] } },
    { id: 'saraj', emoji: '🏯', name: 'the king\'s palace', note: 'stairs a crone can be kicked down, windows that face the lanes — and one marriageable daughter',
      anchor: { status: 'proposed', node: 'udhekryq', mirror: 'Sulejman Pasha\'s konak of old Tirana — the plain\'s own petty court',
        mold: 'the SAME saraj and the SAME petty king as the half-rooster tale: a living walled court on the plain, mighty enough to be worth outwitting and small enough to keep losing to small creatures — half a rooster took his gold, a snake out-palaced him and took his daughter. This tale adds his queen and his only daughter to the household',
        conflicts: 'NOT pallatiZi — the black palace is the Sun-quest\'s mourning court; its lone daughter belongs to the Sun, so the snake\'s bride cannot be hers. NOT shpirag1/Berat — the moat-king is the SOUTH\'s wager-king with another daughter and another fate. NOT kalaRozafa — the walling legend owns it.',
        sharedWith: ['half-rooster (its saraj proposal at this same spot — one court, one king)'],
        proposal: 'the half-rooster tale already proposes the saraj up the plain road from udhekryq; this tale needs no second building — only the king\'s window facing the village edge, and the stairs inside' } },
    { id: 'weddingHouse', emoji: '💍', name: 'the great wedding', note: '"another part of town" — the dasma where the secret breaks',
      anchor: { status: 'existing', node: 'dasma1', mirror: 'the standing village dasma on the square — old Tirana\'s long wedding feast',
        mold: 'the village\'s standing dasma: the long feast every wedding-guest scene shares — guests, dancers and stories accumulate at a wedding, nothing clashes',
        sharedWith: ['the dasma lore arc', 'the krushqit walking route'] } },
    { id: 'road', emoji: '🛤️', name: 'the world\'s roads', note: 'the iron-shoe roaming — days and nights between one door and the next',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of old Tirana at the tanners\' bridge',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash',
        sharedWith: ['three-friends', 'half-rooster'] } },
    { id: 'sunHouse', emoji: '☀️', name: 'the Sun\'s house', note: 'his compound above — his mother\'s table, his children, his dinner-hour homecoming',
      anchor: { status: 'existing', node: 'diellShtepi1', mirror: 'the Sun\'s compound on the cloud-plateau above Tomorr',
        mold: 'the Sun\'s own hall: he keeps wards there and his word is law indoors — whatever else lives in or visits the compound obeys it while he watches. This tale adds his old mother at the table and the sun-children in the yard; the maiden tale\'s house-Kulshedra shares the compound without clashing',
        sharedWith: ['maiden-promised-sun'] } },
    { id: 'moonTerrace', emoji: '🌙', name: 'the Moon\'s terrace', note: 'one short question, one short answer, and onward',
      anchor: { status: 'existing', node: 'henaPaqe', mirror: 'the far terrace of the cloud-plateau where the game already keeps Hëna',
        mold: 'the Moon keeps her own light and her own counsel on the far terrace — travellers\' questions get short true answers and no lodging',
        sharedWith: ['the core Hëna scene'] } },
    { id: 'windHouse', emoji: '🌬️', name: 'the Wind\'s house', note: 'the hearth of the winds — the old mother, the blowing children, breakfast for a tired gale',
      anchor: { status: 'proposed', node: 'qiellErera1', mirror: 'the winds\' corner of the sky, where the game already brews hail and gusts',
        mold: 'the Wind\'s own hearth in the sky\'s weather-quarter: his old mother keeps it and his gusting children tumble round it; Shurdhi\'s hail and i Verbti\'s fire cross the same corner without clashing — the weathers are neighbours, not one being',
        conflicts: 'Era is NOT Shurdhi (the hail-hurler driven off with banged iron) and NOT i Verbti (the fire) — those two own the existing scenes here; the carrying Wind of the wonder-tales is a third neighbour',
        proposal: 'draw the Wind\'s house — a hearth of the winds with the old mother beside it — at the winds\' corner of the sky' } },
    { id: 'sea', emoji: '🌊', name: 'the sea', note: 'crossed in one gust on the Wind\'s back',
      anchor: { status: 'existing', node: 'deti1', mirror: 'the open Adriatic off the shore village',
        mold: 'the open water between the shores: every crossing passes over it and leaves no mark; below, the deep is E Bukura e Detit\'s realm',
        sharedWith: ['bukura-e-detit lore', 'the sea travel spine'] } },
    { id: 'overseaSpring', emoji: '⛲', name: 'the spring beyond the sea', note: 'where the Wind sets her down — and the Kulshedra comes down to drink',
      anchor: { status: 'proposed', node: 'deti1', mirror: 'the far Adriatic shore — the "beyond the sea" horizon the open water already implies, reached only carried on the Wind\'s back',
        mold: 'the far country beyond the horizon: mountains, a spring the Kulshedra drinks at, no living village — the coveting powers\' side of the water',
        conflicts: 'NOT bregu — that shore village is a real settlement on OUR side, a fisherman\'s walk from the open sea, and it is already Gjergj Elez Alia\'s mold (the nine-wounded hero\'s kulla and his sister\'s watch): a lived-in village and an empty far coast beyond a one-way wind-crossing cannot be the same spot. This spring anchors instead to deti1, the open water every crossing departs from — the far shore itself stays undrawn, out past the crossing. NOT uji — the watched spring on the Beauty\'s road belongs to the world below, another world entirely. The Kulshedra here is NOT the Baloz — two different over-sea powers on one far shore, and the Baloz was already dead in the shallows on our side.',
        proposal: 'draw the far shore beyond the water — a mountain spring where the wind sets travellers down; nearest drawn spot today is the open sea (deti1), the crossing this tale\'s wind-ride departs from' } },
    { id: 'kulshedraHouse', emoji: '🐉', name: 'the Kulshedra\'s house', note: 'where Swift is held — good food, impossible chores, and "daughter" for a word',
      anchor: { status: 'proposed', node: 'deti1', mirror: 'a beast\'s hall in the mountains of the far shore',
        mold: 'the over-sea Kulshedra\'s hearth: she fattens her captives, calls them daughter, and sets impossible chores — a larder run like a household',
        conflicts: 'a kulshedra is a KIND, not a name: this beast is NOT kulshedra1 (the world-below duel), NOT the Sun\'s house-Kulshedra, NOT the Kordha tale\'s road or gate beasts. Slaying it contradicts none of them. NOT bregu — the near-shore village is Gjergj Elez Alia\'s hero-tower, a real household within reach of the open sea; this hall stands unreachable in the far mountains past the crossing, so it anchors beyond deti1, not at the near shore.',
        proposal: 'draw the Kulshedra\'s house in the far shore\'s mountains, up from its spring; nearest drawn spot today is the open sea (deti1)' } },
    { id: 'kulshedraForest', emoji: '🪓', name: 'the Kulshedra\'s forests', note: 'her wood-lots on the far shore — the axe, the coffin, the fire',
      anchor: { status: 'proposed', node: 'deti1', mirror: 'the wooded flanks below the beast\'s hall on the far shore',
        mold: 'the Kulshedra\'s own forests: she owns every tree and hears every axe — trespass is answered in person, which is exactly what the coffin trick needs',
        conflicts: 'NOT the village-side firewood forest (pylli1) — that one is common ground on our shore; this one is owned, over the water. NOT bregu — see overseaSpring/kulshedraHouse: the near-shore village belongs to Gjergj Elez Alia\'s hero-tower and cannot double as the Kulshedra\'s far domain.',
        proposal: 'draw a wood-lot below the Kulshedra\'s house on the far shore; nearest drawn spot today is the open sea (deti1)' } },
  ],
  items: [
    { id: 'unaza', emoji: '💍', name: 'the snake\'s ring', note: 'breathed on, it heals legs and raises palaces; dropped in a jug, it says "I am here"' },
    { id: 'hekurat', emoji: '👢', name: 'the iron kit', note: 'a shod pair for the feet, a matching staff, a case for the road — the toll the search demands' },
    { id: 'lekura', emoji: '🐍', name: 'the shed skin', note: 'off at night, on at dawn — the spell\'s hinge' },
    { id: 'kazanet', emoji: '🍲', name: 'the two cauldrons', note: 'unfillable by weeping; filled by salt' },
    { id: 'arkivoli', emoji: '⚰️', name: 'the coffin', note: 'built for a lie, locked on the truth-hater, burned' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md). You are
  // the bride of the serpent who by night sheds his skin and stands a young man and begs
  // you never to tell. The secret slips out and a Kulshedra carries him off beyond the
  // sea — and because you never wronged him you may follow: iron shoes on your feet, you
  // ask the Sun, the Moon and the Wind, cross the water and outwit the she-dragon to win
  // him back a man for good. Embodied but LOOSE (no become — the quest threads the
  // shared sky/underworld hubs). "It is never silence that frees the snake-husband — it
  // is the long, faithful search after he is lost."
  play: {
    entry: 'kushtet',
    stance: 'embodied',
    as: 'bride',
    role:
      'You are wed to a serpent who by night sheds his skin and stands a young man, and who begs you never to speak of it. Keep faith — but the secret slips out as it always does, and a Kulshedra bears him off beyond the sea. Because you never wronged him you can follow: iron shoes on your feet, you ask the Sun, the Moon and the Wind where he is, cross the water where the Wind points, and outwit the she-dragon to bring him home a man for good.',
    from: 'gjarperBurr1',
    ending: 'gjarperBurrFund',
    scenes: {
      gjarperBurr1: 'kushtet',
      gjarperKerkim: 'hekurat',
      gjarperBurrFund: 'kthimi',
    },
    divergences: [
      { beat: 'kushtet', note: 'You embody the bride, loosely (no become/mold-lock — the quest reuses the Sun-quest\'s sky and the underworld, shared hubs). The game\'s "good" path is faithful silence (betray him and he is lost at once, the bad ending gjarperBurrVdes); but as the tale insists, even faithful silence does not keep him — the loss and the long search come regardless.' },
      { beat: 'hekurat', note: 'The iron-shoes quest to the mothers of the Sun, the Moon and the Wind — worn out asking each where he is until the Wind points past the sea — reuses the sky region of the Sun-maiden\'s world (the Sun\'s house, the Moon\'s peace, the winds).' },
      { beat: 'prova', note: 'The Kulshedra\'s many trials beyond the sea (the ring in the water-jug, the broom, the boiling cauldrons, the coffin built for a lie) are compressed into one outwitting; the point the tale makes against the "silence frees the enchanted husband" type is kept — here it is the faithful search, not the kept secret, that wins him.' },
    ],
  },
  beats: [
    {
      id: 'shkarpat', title: 'A snake in the firewood',
      note: 'A childless old woman owns nothing but her cottage and her daily walk to the forest for wood. One day a snake rides home in the bundle — and stays, kept for a son.',
      lines: [
        ['1.1', 'All she owns, this childless woman, is a single-room cottage — nothing else in the world is hers.'],
        ['1.2', 'Wood-gathering fills her days; the forest never runs short of it.'],
        ['1.3', 'A small snake works its way, unseen, into the sticks she is carrying.'],
        ['1.4', 'Never noticing, she hoists the load up and carries it all the way home.'],
        ['1.5', 'Set down on the cottage floor, the bundle falls open and the snake comes wriggling out to join the cat at its games.'],
        ['1.6', 'With no child of her own, she decides to raise it as one.'],
      ],
      cast: {
        oldWoman: ['cottage', 'carries the snake home in her wood-bundle and keeps it for a son'],
        snake: ['cottage', 'crawls from the bundle; plays with the cat by the hearth'],
        king: ['saraj', 'rules the plain\'s petty court'],
        queen: ['saraj', 'keeps the saraj at the king\'s side'],
        bride: ['saraj', 'the king\'s only daughter, unmarried in her father\'s house'],
        attendants: ['cottage', 'not yet in the world — the ring that will breathe them out lies hidden'],
        sunMother: ['sunHouse', 'keeps the Sun\'s table in the compound above'],
        sun: ['sunHouse', 'out on his day\'s round of the sky; home at dinner'],
        sunChildren: ['sunHouse', 'tumble about the compound yard'],
        moon: ['moonTerrace', 'keeps her own light and her own counsel'],
        wind: ['windHouse', 'out gusting across the world; home at breakfast'],
        windMother: ['windHouse', 'keeps the Wind\'s hearth'],
        windChildren: ['windHouse', 'blow round the sky-corner'],
        kulshedra: ['kulshedraHouse', 'hops her far mountains beyond the sea, hoarding no one yet'],
      },
      items: { unaza: ['cottage', 'unrevealed — hidden in the snake\'s keeping'] },
    },
    {
      id: 'lajmesia', title: 'Go ask the king',
      note: 'The snake grows up and names its bride: the king\'s daughter. The old woman gapes — you\'re a snake! — but agrees to go and hear what the king says.',
      lines: [
        ['1.7', 'Fully grown at last, the snake breaks its long silence with a single demand: go to the palace, mother, and win me the king\'s daughter for a wife.'],
        ['1.8-9', 'Of course, my boy, she answers — though she cannot picture any king marrying his one daughter off to a serpent.'],
        ['1.10', 'It makes no difference, he tells her — go regardless, and find out for yourself what answer comes back.'],
      ],
      cast: {
        oldWoman: ['cottage', 'talked into going wooing at the palace'],
        snake: ['cottage', 'grown big; sets his heart on the king\'s daughter'],
      },
    },
    {
      id: 'shkallet', title: 'Down the stairs',
      note: 'Past the guards, up to the king, out with the shameful errand — and down the stairs on the king\'s boot, her leg broken. She limps home cursing; the snake promises to heal it and forbids her to give up.',
      lines: [
        ['2.1', 'Obedient to her son, she sets out for the royal court.'],
        ['2.2', 'Reaching the gate, she is stopped and questioned by the guards, who bar her passage inside.'],
        ['2.3', 'She holds her ground, demanding the king himself and no one less, until the guards finally step aside and let her through.'],
        ['2.4-5', 'Red-faced before the king now, she blurts out the shameful truth — a promise given is a promise kept, and my boy the snake means to have your daughter as his bride.'],
        ['2.6', 'Fury takes the king on the spot; he sends her tumbling down the staircase with a kick, and her leg snaps in the fall.'],
        ['2.7', 'Cursing the snake for the cripple he\'s made of her, she hobbles the whole way back to the cottage.'],
        ['2.8-9', 'The leg is nothing to fret over, the snake tells her — he\'ll mend it himself; only she must not lose her nerve now.'],
      ],
      cast: {
        oldWoman: ['cottage', 'home on a broken leg, cursing her snake-son'],
        king: ['saraj', 'kicked the crone down his own stairs'],
      },
    },
    {
      id: 'sherimi', title: 'The ring heals',
      note: 'The snake produces a ring, breathes on it, and the leg is whole. Sent up a second morning, the old woman is kicked and beaten again — and swears off the palace forever.',
      lines: [
        ['3.1', 'Out comes a ring; one breath on it from the snake, and its silent order mends the old woman\'s shattered leg.'],
        ['3.2', 'Whole again, in that same instant.'],
        ['3.3', 'The very next morning she is sent back up to the palace, and the whole scene repeats itself exactly.'],
        ['3.4', 'Beaten and thrown out a second time, she vows never to set foot near that court again.'],
      ],
      cast: {
        oldWoman: ['cottage', 'healed, sent up again, beaten again; swears off the palace'],
        snake: ['cottage', 'works the ring\'s first wonder on her leg'],
      },
      items: { unaza: ['cottage', 'revealed — one breath on it mended the broken leg'] },
    },
    {
      id: 'kushtet', title: 'The king\'s conditions',
      note: 'The third day — the last time, the snake promises — she goes up once more. The king chuckles and names his terms: a palace as big as his by morning, a silk-spanned path door to door, four hundred horsemen in every hue on earth. The snake: it will all be ready in time.',
      lines: [
        ['4.1-2', 'By the third visit the snake insists again, promising her this truly is the final errand she\'ll run for him.'],
        ['4.3-4', 'Reluctant but won over by that promise, she climbs to the court once more and lays it out plainly: wed your daughter to my son, or misfortune will find me instead.'],
        ['4.5', 'Amused, the king lays down his price.'],
        ['4.6', 'First: turn that cottage of yours into a palace to rival mine, and have it done by morning.'],
        ['4.7', 'Second: lay silk the whole way between our two doorsteps. Third: four hundred mounted attendants, standing ready, each wearing a different color found anywhere on earth.'],
        ['4.8', 'Manage all three overnight, and the wedding is on.'],
        ['4.9', 'She takes her leave glad — this once, nobody kicked or beat her.'],
        ['4.10', 'Back home, she lays the king\'s terms before the snake, who answers with nothing more than: it will all be finished when it needs to be.'],
      ],
      cast: {
        oldWoman: ['cottage', 'brings the three impossibilities home'],
        king: ['saraj', 'names his conditions, chuckling at a snake\'s suit'],
        snake: ['cottage', 'unbothered — promises it will all be finished when the hour comes'],
      },
    },
    {
      id: 'mesnata', title: 'Midnight of the ring',
      note: 'Three breaths on the ring as midnight strikes: a palace outsizing the king\'s own, a silk-laid road door to door, four hundred horsemen in every color there is. His work finished, the snake sets his new guard and turns in for the night.',
      lines: [
        ['5.1', 'Midnight strikes, and with it comes the ring\'s first order: let this cottage rise into a palace outsizing the king\'s own, by the time the words are spoken.'],
        ['5.2', 'Done before the echo fades — a palace stands where the cottage was.'],
        ['5.3', 'Still on her sleeping-mat a breath before, the old woman opens her eyes now inside a proper bed, a bell within reach for calling the maid.'],
        ['5.4', 'A second command follows: silk now, covering the ground all the way to the king\'s threshold.'],
        ['5.5', 'Which is exactly what happens.'],
        ['5.6', 'Third, he calls up an escort: four hundred riders, one in every earthly color, saddled and standing by.'],
        ['5.7', 'And there they stand.'],
        ['5.8', 'Everything ready, the snake settles down for the night.'],
        ['5.9', 'First, though, he sets the horsemen on guard duty circling the palace.'],
      ],
      cast: {
        snake: ['cottage', 'three breaths on the ring — palace, silk, horsemen — then sleeps'],
        oldWoman: ['cottage', 'wakes mid-wonder in a real bed with a maid\'s bell'],
        attendants: ['cottage', 'breathed out of the ring — four hundred strong, on guard around the palace'],
      },
      items: { unaza: ['cottage', 'three breaths spent: a palace, a silk road, an army of grooms'] },
    },
    {
      id: 'fjala', title: 'A given word cannot break',
      note: 'The king wakes to a palace filling his window. The queen confirms what stood there yesterday. He remembers his conditions — and the royal pair fall to lamenting the daughter their own word has promised to a snake.',
      lines: [
        ['6.1', 'Come morning the king looks out and finds an enormous palace filling the view where none stood the day before — whose can it be?'],
        ['6.2', 'He summons the queen to the window: real palace, he asks her, or are his own eyes playing tricks on him?'],
        ['6.3-4', 'Real enough, she assures him — only a poor woman\'s cottage stood on that ground yesterday.'],
        ['6.5', 'The conditions come back to him then, and husband and wife alike sink into grief over what awaits their daughter.'],
        ['6.6', 'A given word binds a king too — the wedding to the snake must go ahead.'],
      ],
      cast: {
        king: ['saraj', 'sees his conditions met out his own window; remembers his word'],
        queen: ['saraj', 'confirms what stood there yesterday; laments with him'],
      },
    },
    {
      id: 'krushqit', title: 'A snake rides for his bride',
      note: 'The fetching day comes. The horsemen set the snake up in the saddle and ride singing to the king; at the palace they lift it down and carry it in — to two parents wishing their daughter dead rather than snake-wed.',
      lines: [
        ['6.7', 'Fetching-day arrives, and the mounted escort saddles up.'],
        ['6.8', 'Perched among the riders in the saddle, the snake is carried toward the king\'s court to the sound of their wedding song.'],
        ['6.9', 'Once there, they lift him down and bear him inside, straight into the king and queen\'s presence.'],
        ['6.10-11', 'Grief crushes them both — sooner their own daughter in the ground, they think, than wed to this; what misfortune, to gain a snake for kin!'],
      ],
      cast: {
        snake: ['saraj', 'rides in the saddle, sung in like any bridegroom'],
        attendants: ['saraj', 'ride the wedding train, ballad and all'],
        king: ['saraj', 'receives a serpent son-in-law in despair'],
        queen: ['saraj', 'thinks death kinder than this wedding'],
        bride: ['saraj', 'dressed for a wedding she dreads'],
      },
    },
    {
      id: 'dhoma', title: 'The skin comes off',
      note: 'The wedding is held; the groom is led to the bride\'s chamber; she screams at the snake — and the snake sheds its skin. A young man stands there, beautiful past bearing, who binds her to one rule: never tell. His name is Shpejt — Swift.',
      lines: [
        ['7.1', 'With the bride lifted up among them, the ceremony goes forward.'],
        ['7.2', 'Once the celebration winds down, it is time to bring the groom into the bride\'s room.'],
        ['7.3', 'The sight of the snake alone is enough to send the girl into a shriek of fright.'],
        ['7.4', 'Then the skin splits away, and where the snake had been stands a young man of such beauty that she can hardly believe her eyes.'],
        ['7.5-6', 'One rule only, he tells her: never breathe a word that by night he walks as a man and by day he wears the snake\'s shape — say it once aloud, and he is beyond finding, forever.'],
        ['7.7-8', 'Not a soul will hear it from me, husband, she vows — only tell me first what to call you!'],
        ['7.9', 'Swift, he answers — that is his name.'],
      ],
      cast: {
        bride: ['cottage', 'wed and carried home; screams at the snake, marvels at the man'],
        snake: ['cottage', 'sheds the skin by night; binds her to the secret; gives the name Shpejt'],
        attendants: ['cottage', 'carried the bride home in state; stand their watch'],
      },
      items: { lekura: ['cottage', 'shed each night at the bedside, back on at every dawn'] },
    },
    {
      id: 'dyshimi', title: 'The lunch of tears',
      note: 'The king\'s messenger finds the daughter alive and well — which the king refuses to believe. A week on he bids the pair to lunch, where the queen weeps over her "poor miserable girl" and the girl answers that she counts herself lucky.',
      lines: [
        ['7.10', 'Come morning, the king dispatches a spy to the palace, wanting proof his daughter still draws breath.'],
        ['7.11', 'The report comes back reassuring — no cause for worry, all is well — yet the king trusts none of it and grows only more suspicious.'],
        ['8.1', 'A week later, a royal messenger arrives at the snake\'s door bearing a lunch invitation for the married pair.'],
        ['8.2-4', 'Seeing the newlyweds arrive, the queen dissolves into tears over her daughter\'s supposed misery, certain the poor girl\'s life must now be nothing but sorrow.'],
        ['8.5', 'Lucky is the only word the girl has for it.'],
      ],
      cast: {
        king: ['saraj', 'sends a spy, then a lunch bidding; believes nothing he hears'],
        queen: ['saraj', 'weeps over a daughter who will not weep'],
        bride: ['saraj', 'comes to lunch glowing — she calls herself lucky'],
        snake: ['saraj', 'comes to lunch as the daytime snake'],
      },
    },
    {
      id: 'vallja', title: 'The dancer from heaven',
      note: 'A great wedding in another part of town. Go ahead, says the snake — I\'ll come after dark, and remember the rule. At nightfall a splendid stranger enters; the guests take him for an angel, and his dancing stops the room.',
      lines: [
        ['9.1', 'Days later, news spreads of a grand wedding on the far side of town, with the royal father and his daughter both counted among the invited.'],
        ['9.2-3', 'Walk on without me, the snake tells her — he\'ll slip in later, once night has turned him back into a man, so that nobody there connects the two.'],
        ['9.4', 'And mind the one rule, he adds: breathe a word of the secret, and she will lose him for good.'],
        ['9.5', 'Off she goes by herself, and only once the light has failed does the snake slip free of its skin, dress in fine clothes, and follow after her.'],
        ['9.6', 'Their entrance draws the whole gathering to its feet, certain that some angel has come among them.'],
        ['9.7-8', 'Once he takes the floor to dance, the whole room falls silent watching — no mortal moves that way, someone murmurs; he must be sent down from the sky itself.'],
      ],
      cast: {
        bride: ['weddingHouse', 'sits among the guests with her husband\'s secret behind her teeth'],
        snake: ['weddingHouse', 'arrives after dark as the splendid stranger; dances the room still'],
        king: ['weddingHouse', 'a guest at the great dasma'],
        queen: ['weddingHouse', 'sits beside her daughter, watching the dancer'],
      },
      items: { lekura: ['cottage', 'left at home with the dark'] },
    },
    {
      id: 'fjalaShkau', title: 'The word slips',
      note: 'The queen leans over: what luck would be yours with such a man! The girl can bear it no longer — that IS my husband, that is Swift — and the word is barely out when Swift is nowhere, gone too swiftly for any eye.',
      lines: [
        ['9.9', 'The queen, seated at her side, sighs that any girl would count herself blessed to call a husband such as him her own.'],
        ['9.10-11', 'It breaks something in her — the words rush out before she can catch them: this dancer, mother, is Swift — her own husband.'],
        ['9.12', 'No sooner is it said than Swift is simply gone — vanished too fast for a single soul in the room to follow.'],
      ],
      cast: {
        queen: ['weddingHouse', 'the goad: praises the dancer to his own wife'],
        bride: ['weddingHouse', 'breaks the one rule — names him aloud before the room'],
        snake: ['kulshedraHouse', 'vanished from among the dancers — held, though none yet know it, by the Kulshedra beyond the sea'],
        kulshedra: ['kulshedraHouse', '"one I had" — keeps her first prisoner now'],
      },
      items: { unaza: ['snake', 'gone with him into thin air'] },
    },
    {
      id: 'hekurat', title: 'Iron shoes',
      note: 'She scans the room for him, breaks down, and rounds on her mother for the ruin she\'s caused. Then the resolve sets in: he\'d once priced out what finding him would take — a shod pair of iron, a staff to match, a travel case. Her parents outfit her for the road, and she sets off walking.',
      lines: [
        ['9.13', 'Search as she might, there\'s no sign of him anywhere, and the tears come.'],
        ['9.14-15', 'Look what you\'ve done to me, mother! she cries — he swore that if his secret ever left her lips he would vanish from her life forever.'],
        ['9.16', 'No option remains but to go looking for him herself.'],
        ['9.17', 'He had told her once what the search would cost: a case for the road, a staff of iron, and shoes shod the same way.'],
        ['9.18', 'Outfitted by her parents with everything on that list, she takes to the road after her husband.'],
      ],
      cast: {
        bride: ['road', 'shod in iron, staff in hand, walking the world after Swift'],
        king: ['saraj', 'fits his daughter out and lets her go'],
        queen: ['saraj', 'watches her daughter walk off in iron shoes'],
      },
      items: { hekurat: ['bride', 'iron shoes, iron staff, travelling case — her parents\' parting gift'] },
    },
    {
      id: 'teDielli', title: 'The Sun\'s table',
      note: 'Days and nights of roaming end at the Sun\'s house — where only his mother and children are home, and the children fly at her to eat her. The old mother calls them off, hears the whole story, warns her of the Sun\'s homecoming hunger, and hides her.',
      lines: [
        ['10.1', 'Days and nights blur together as she wanders on, until the Sun\'s household is finally the door she reaches, seeking his counsel.'],
        ['10.2', 'The Sun himself is out — only his mother and his brood are home, and at the smell of her the little ones rush her at once, eager for a meal.'],
        ['10.3', 'It\'s the mother who intervenes, calling them off and welcoming the stranger inside.'],
        ['10.4', 'What brings you to our door? the old woman wants to know.'],
        ['10.5', 'Everything spills out of her — the whole story — and with it the real question: has the Sun, in all his crossing of the sky, ever laid eyes on her husband?'],
        ['10.6-7', 'Not home yet, the old woman says — they\'ll put the question to him once he\'s in, though she warns that a tired Sun catching the scent of a human might make a meal of her first.'],
        ['10.8', 'Not if you forbid it, she replies — then he won\'t touch me at all.'],
        ['10.9', 'Moved by the girl\'s plight, the old woman tucks her out of sight.'],
      ],
      cast: {
        bride: ['sunHouse', 'hidden by the Sun\'s mother against the homecoming'],
        sunMother: ['sunHouse', 'calls off the sun-children; hears the story; hides the guest'],
        sunChildren: ['sunHouse', 'fly at the smell of a human, and are called off'],
        sun: ['sunHouse', 'still out on the day\'s long round'],
      },
    },
    {
      id: 'pergjigjaDiellit', title: 'Ask the Moon',
      note: 'The Sun comes in to dinner spent, smelling human flesh and demanding it. His mother denies, he insists, she wrings out the promise — and the hidden girl is led out. The all-seeing day has not seen Swift: ask the Moon, who sees the night.',
      lines: [
        ['10.10-11', 'Home at last for his evening meal, worn thin by the day\'s long circuit, the Sun drops into his seat and announces at once that he smells a human close by — fetch it to him, he says, for the day has left him famished.'],
        ['10.12-13', 'No humans here, son — who on earth would ever visit us? his mother tells him.'],
        ['10.14-15', 'There is too, the Sun insists — bring it before me; I only mean to question it, not devour it.'],
        ['10.16', 'Only once she has his word does the mother fetch the hidden girl and bring her before him.'],
        ['10.17-18', 'Swift is who she\'s hunting, she tells him — her husband — and she wonders whether his wide-ranging travels have ever put him in the Sun\'s sight.'],
        ['10.19-20', 'The Sun has no answer for her — his light never caught sight of the man — but he points her toward the Moon, keeper of the dark hours.'],
      ],
      cast: {
        sun: ['sunHouse', 'home spent; smells human; promises, questions — and cannot help; points to the Moon'],
        bride: ['sunHouse', 'brought out of hiding; asks, and takes her first No'],
      },
    },
    {
      id: 'teHena', title: 'The Moon, then the Wind',
      note: 'More days and nights to the Moon — who knows nothing either and points to the Wind. On the last of her strength she reaches the Wind\'s house, where the little wind-children come blowing round to devour her and the old mother calls them off.',
      lines: [
        ['11.1', 'On she walks through days without number, until the Moon\'s own door is finally the one in front of her.'],
        ['11.2', 'The Moon draws a blank too, and sends her onward toward the Wind\'s house instead.'],
        ['11.3', 'So it\'s the Wind\'s door she goes hunting for next.'],
        ['11.4', 'By the time she arrives there her strength has all but run out — she reaches it on fumes.'],
        ['11.5', 'At that hearth she meets the Wind\'s aging mother, and a flock of small gusting children swirl in around her, hungry to feast on the newcomer.'],
        ['11.6', 'The old woman waves the little ones off and brings the girl inside.'],
      ],
      cast: {
        bride: ['windHouse', 'spent to the last step; taken in at the Wind\'s hearth'],
        moon: ['moonTerrace', 'has seen nothing by night; points onward to the Wind'],
        windMother: ['windHouse', 'calls off the wind-children; takes the stranger in'],
        windChildren: ['windHouse', 'come blowing round the stranger, and are called off'],
      },
    },
    {
      id: 'tEres', title: 'Hidden from the gale',
      note: 'The same door, the third time: why have you come, the whole story told, the same warning about a tired homecomer\'s appetite, the same brave answer — and the Wind\'s mother pities her and hides her.',
      lines: [
        ['12.1', 'What has brought you all this way, child? the old woman wants to know.'],
        ['12.2', 'She lays out for this old woman, too, the whole story of the journey and every place it has taken her.'],
        ['12.3-4', 'We can put it to him, the Wind\'s mother offers — though a tired Wind smelling a human the moment he lands might swallow her whole before any question gets asked.'],
        ['12.5', 'Once again she says it plain: he\'ll do her no harm if his mother says so.'],
        ['12.6', 'Touched, the old woman takes her in and keeps her out of sight.'],
      ],
      cast: {
        windMother: ['windHouse', 'hears the whole search; hides the girl against the homecoming'],
      },
    },
    {
      id: 'pertejDetit', title: 'Beyond the sea',
      note: 'The Wind blows in to breakfast, smells human, demands it, promises on his word of honour — and at last somebody KNOWS: your husband is the Kulshedra\'s prisoner beyond the sea. She begs the ride; he fears she\'ll fall, for he is very swift; she will not fall.',
      lines: [
        ['13.1-2', 'Breakfast brings the Wind home, and the scent of a human reaches him instantly: fetch it here, mother, and let me eat — I\'ve worn myself out today.'],
        ['13.3', 'And where would humans come from, here? his mother answers.'],
        ['13.4', 'He won\'t let it go, pressing her again and again, until at last she gives in on one condition: he swears not to eat it, only to bring it forward so he can put his questions to it himself.'],
        ['13.5', 'Bound now by that promise, his mother goes and brings the girl out.'],
        ['13.6', 'The Wind wants to know what has driven her to endure so much.'],
        ['13.7', 'Swift, her husband, is who she\'s after, the girl explains — gone a long while now, and no trace of him anywhere she\'s looked.'],
        ['13.8-9', 'The Wind finally has an answer: a Kulshedra keeps him captive on the far side of the sea, a great distance from where they stand.'],
        ['13.10-11', 'Far or not, she tells him, she means to reach him — will he, out of kindness, carry her across the water with him?'],
        ['13.12', 'He would take her gladly, the Wind says, except he worries she\'d be shaken loose mid-flight — his speed being what it is.'],
        ['13.13-14', 'She promises she\'ll hold on — no falling — and begs him again to carry her along.'],
      ],
      cast: {
        wind: ['windHouse', 'home to breakfast; gives his word of honour; names the captor and the country'],
        bride: ['windHouse', 'hears at last WHERE — and begs the ride over the sea'],
      },
    },
    {
      id: 'kalimi', title: 'On the Wind\'s back',
      note: 'He pities her and swings her up: hold my hair, don\'t look down. One great gust, the whole sea underneath, and she is set down beside a spring on the far shore.',
      lines: [
        ['14.1', 'Won over, the Wind swings her up behind him with a single order: grip his hair tight and keep her eyes up, or the height will turn her stomach.'],
        ['14.2', 'One gust is all it takes to carry them clear across the water, and he leaves her on her feet next to a spring.'],
      ],
      cast: {
        bride: ['overseaSpring', 'set down by the water on the far shore'],
        wind: ['windHouse', 'has set her down beyond the sea and gusted home'],
      },
    },
    {
      id: 'kroi', title: 'One I had, now two',
      note: 'She has barely sat down when a roar rolls out of the mountains. The Kulshedra comes down to the spring, sees her, and hops on one leg chanting its larder-song — then carries her to the house where Swift is kept.',
      lines: [
        ['14.3', 'She has barely lowered herself to rest when the mountains let out a roar fit to shake the ground.'],
        ['14.4', 'Out of the rocks comes a Kulshedra, and the instant it spots her by the water it starts hopping in circles on one leg, crowing that its hoard has grown from one captive to two.'],
        ['14.5', 'The beast snatches her up and drags her back to its lair — the very place Swift has been locked away.'],
      ],
      cast: {
        kulshedra: ['kulshedraHouse', 'snatches the girl at the spring — "one I had, now I have two" — and carries her home'],
        bride: ['kulshedraHouse', 'carried to the beast\'s house, under the same roof as Swift'],
        snake: ['kulshedraHouse', 'the prisoner — and sees his wife walk in'],
      },
    },
    {
      id: 'unazaShtambe', title: 'A ring in the jug',
      note: 'He knows her on sight and dares not speak. Unseen, he drops his ring into a jug she must wash — and washing it, she finds her husband\'s ring in her hands. His first whisper: never speak to me where the Kulshedra can see.',
      lines: [
        ['14.6', 'One glance and he knows his own wife — but the Kulshedra\'s presence keeps every word behind his teeth.'],
        ['14.7', 'With the beast\'s back turned, he slips his ring down into a jug bound for the wash-basin — a message with no words needed.'],
        ['14.8', 'The trick lands.'],
        ['14.9', 'There in the wash-water her fingers close on it, and she knows her own husband\'s ring the instant she feels it.'],
        ['14.10', 'The first moment no one else can hear, he breathes his one rule to her — not a word within the beast\'s hearing, or they\'re both finished.'],
      ],
      cast: {
        snake: ['kulshedraHouse', 'signals with the ring; sets the one rule of survival'],
        bride: ['kulshedraHouse', 'fishes her husband\'s ring from the wash-water; learns the silence'],
      },
      items: { unaza: ['bride', 'fished from the jug — her husband\'s sign, and hers to keep'] },
    },
    {
      id: 'fshesa', title: 'Swept and unswept',
      note: 'The Kulshedra fattens the pair for eating — wife first — and has overheard their whispers. First chore: a house swept in places and unswept in others. Swift\'s answer: sweep with a bread crust and drag it behind you. The beast reads his hand in it at once.',
      lines: [
        ['15.1', 'Good meals are the Kulshedra\'s plan for fattening them both up before the eating starts — the wife to go first, her husband after.'],
        ['15.2', 'Their quiet talk together, it turns out, has not gone unheard by the beast either.'],
        ['15.3', 'It lays down that evening\'s task: some corners of the house left untouched, the rest swept spotless, both true by the time it\'s home for supper.'],
        ['15.4', 'Still puzzling it over, the wife doesn\'t notice her husband stir until he asks what\'s troubling her.'],
        ['15.5', 'She lays out the impossible task and admits she has no idea how it could be done.'],
        ['15.6-9', 'Nothing to it, he tells her — find a stale crust of bread, run it over the floor like a broom, then let it drag behind her as she goes to put it back; one half of the house will end up swept, the other not, exactly as demanded.'],
        ['15.10', 'Exactly so, the wife carries it out.'],
        ['15.11', 'That evening the Kulshedra wants to know if the work is done, and hears back: all finished, yes, mother.'],
        ['15.12', 'A look around confirms it — every corner exactly as ordered.'],
        ['15.13-14', 'Not your doing, the beast snaps — your husband\'s, every bit of it!'],
      ],
      cast: {
        kulshedra: ['kulshedraHouse', 'sets the impossible sweeping — and reads Swift\'s hand in the answer'],
        bride: ['kulshedraHouse', 'calls the beast "mother"; sweeps with a bread crust'],
        snake: ['kulshedraHouse', 'supplies the crust-trick from half-sleep'],
      },
    },
    {
      id: 'kazanet', title: 'Two cauldrons of tears',
      note: 'Second chore, on pain of being devoured: two cauldrons full of tears by evening. She weeps into them in vain until Swift wakes: you\'d fill cauldrons by crying, little fool? Water, a fistful of salt, lids on.',
      lines: [
        ['16.1', 'Next comes a harder order still: two full cauldrons of tears waiting by the time it\'s home for supper, or she herself will be the meal.'],
        ['16.2-3', 'Once alone, she sets the empty cauldrons out and cries into them for all she\'s worth — but no amount of weeping brings the water level up.'],
        ['16.4', 'Waking to find her in tears, her husband wants to know what\'s wrong.'],
        ['16.5', 'Two brimming cauldrons by nightfall or she pays with her own skin, she tells him — that\'s the order she\'s been given.'],
        ['16.6-7', 'Silly girl, he laughs — no amount of crying was ever going to fill those things.'],
        ['16.8', 'Sit down and breathe — he\'ll take it from here.'],
        ['16.9', 'Water fills the cauldrons instead of tears, a scoop of salt worked into each, and the lids pressed down tight.'],
        ['16.10', 'Just as he said, so the young wife does.'],
      ],
      cast: {
        bride: ['kulshedraHouse', 'wept into the cauldrons in vain; salts the water instead'],
        snake: ['kulshedraHouse', 'wakes to her weeping; dictates the salt-water answer'],
      },
      items: { kazanet: ['kulshedraHouse', 'filled with water, salted to pass for tears, lids on'] },
    },
    {
      id: 'prova', title: 'Salt for tears',
      note: 'The evening inspection: two brimming cauldrons, one tongue-tip taste — salty as grief itself. The beast is not fooled about the author: not your idea, daughter; Swift\'s. From that hour it hates him and plans his eating.',
      lines: [
        ['17.1', 'That evening brings the same question from the Kulshedra, and the same answer: every bit of it done, mother.'],
        ['17.2', 'A glance confirms both cauldrons brimming, seemingly with nothing but tears.'],
        ['17.3', 'A quick lick off its tongue tells the beast the truth — salt, not sorrow — and it names the real author on the spot: this has Swift written all over it, not her.'],
        ['17.4', 'From that hour the beast can\'t stand the sight of the young man, and starts scheming how best to make a meal of him.'],
      ],
      cast: {
        kulshedra: ['kulshedraHouse', 'tastes the salt, names the trickster, turns to planning his death'],
        snake: ['kulshedraHouse', 'marked now for the beast\'s table'],
      },
    },
    {
      id: 'arkivoli', title: 'A coffin for Swift',
      note: 'Swift smells the danger, dresses poor, and chops wood in the beast\'s own forests where it cannot find him — until it hears the axe. A poor man, building a coffin for a dead youth named Swift. Overjoyed, the Kulshedra climbs in to inspect the fit; lid, lock, fire.',
      lines: [
        ['18.1', 'Knowing now that he\'s marked, the young man puts on rags and takes an axe deep into the Kulshedra\'s own woodland to cut timber.'],
        ['18.2', 'Every wood the beast owns gets searched, and still it turns up nothing.'],
        ['18.3', 'One day, though, their paths cross while he\'s still at the wood — the sound of his axe brings the beast down on him roaring: whose hand dares touch timber that\'s mine?'],
        ['18.4', 'Only a poor woodcutter, he claims — building a box to bury some young fellow who died not long ago.'],
        ['18.5', 'Who was he, the Kulshedra presses — this dead young fellow?'],
        ['18.6', 'Good-looking sort, the man says — they called him Swift.'],
        ['18.7', 'News of Swift\'s death lights the Kulshedra up with joy — what wonderful news, it crows!'],
        ['18.8', 'It comes right up to the coffin.'],
        ['18.9-10', 'So you knew him, the young man says. — Knew him well enough, comes the answer.'],
        ['18.11', 'Nothing to fear, Your Majesty, he says — step inside and judge for yourself whether the fit is right.'],
        ['18.12', 'Such wonderful news, it says once more, easing itself down into the box.'],
        ['18.13', 'Down slams the lid, the lock clicks shut, and flames are already climbing before the beast understands what\'s happened.'],
      ],
      cast: {
        snake: ['kulshedraForest', 'the "poor coffin-maker" — lid, lock and fire'],
        kulshedra: ['kulshedraForest', '☠ climbs into the coffin rejoicing at Swift\'s death, and burns in it'],
      },
      exit: ['kulshedra'],
      items: { arkivoli: ['kulshedraForest', 'built for a lie, locked on the beast, burned with it'] },
    },
    {
      id: 'kthimi', title: 'Home, and human for good',
      note: 'He stays until the flames have burned clean out, then heads home with news for his wife: pack up, the beast is finished for good. Everything gathered, the two return home to a happy life — and the man once scaled by daylight and human after dark stays human now, permanently.',
      lines: [
        ['19.1', 'Once nothing remains of the Kulshedra but ash, he heads back and delivers the news to his wife: the beast will trouble them no more.'],
        ['19.2', 'Gather what\'s ours, he tells her — it\'s time they went home.'],
        ['19.3', 'Between them they collect everything, turn for home, and settle into a life neither one ever wants to leave again.'],
        ['19.4', 'From that day on, the snakeskin is gone for good — day or night, he is simply a man, and stays one.'],
      ],
      cast: {
        snake: ['cottage', 'home at the snake\'s palace — a man for good, day and night'],
        bride: ['cottage', 'home with Swift; the iron walked through and hung up'],
        oldWoman: ['cottage', 'has her son back — human at last'],
      },
      items: {
        lekura: ['cottage', 'no skin any more — the spell is spent'],
        hekurat: ['cottage', 'walked through; hung up at the journey\'s end'],
        unaza: ['bride', 'kept — the sign that found him'],
      },
    },
  ],
}
