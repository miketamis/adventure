// ===========================================================================
// TALE: The Half-Rooster (Gjysmëkokoshi) — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it.
// ===========================================================================

export default {
  id: 'half-rooster',
  title: 'Half Rooster',
  source:
    'Pralla popullore shqiptare, Instituti i Shkencave (Tiranë 1954) per Elsie\'s source note · read in R. Elsie\'s translation (Albanian Folktales and Legends, tale 15); all lines paraphrased',
  // where the tale comes from — anchors should prefer this region's mirrors.
  // The 1954 book's own half-rooster text is central Geg (it follows a tale
  // signed off "Përrallza në Godolesh" — Godolesh, by Elbasan), so the tale
  // stages naturally around our village (= old Tirana).
  origin: {
    region: 'Central Albania (Geg)',
    collector: 'Komisjoni i folklorit, Instituti i Shkencave (red. Zihni Sako)',
    published: 'Tiranë, 1954',
  },
  // THE ALBANIAN ORIGINAL — genuinely hunted (re-hunted 2026-07-14/15,
  // grepping every named source below directly rather than trusting a
  // prior pass's summary of them), genuinely not found:
  albanian: {
    status: 'missing',
    why:
      'Elsie\'s page footer cites exactly "Pralla popullore shqiptare (Tirana: Instituti i Shkencave 1954)". We HAVE that book (docs/references/pralla-popullore-shqiptare-1954.sq.txt, all 50 tales present) and grepped it in full for gjel/kokosh: its ONLY half-rooster text is tale 37 «Gjymsa gjelit» (pp. 175–176, verbatim in docs/references/pralla-1954-gjymsa-gjelit.sq.txt) — a far shorter Geg variant whose plot diverges beat-by-beat from Elsie (fox, wolf and the whirlwind swallowed as millet grains; no frog, no fire, no mouse, no rod-beating, no deaths; ends with a sieve and a dish, nobody dying). The corpus\'s only other "gjel" hits are a bystander cockcrow inside an unrelated xhindet tale (line ~4169) and a DIFFERENT tale two pages later, «Gomari, çeni, mica e gjeli» ("The donkey, the dog, the cat and the rooster", a Bremen-Town-Musicians tale where a rooster is one of four animals) — a false positive for "gjel", not a half-rooster text, ruled out by reading it. Lambertz, Albanische Märchen (1922) no. 60 «Dätlsadäeli» (Shkodra) was this time actually located and extracted in full (previously only noted as existing) — verbatim with provenance in docs/references/lambertz-1922-nr60-dysagjeli-shkodra.sq.txt: its companions section is its OWN different tale (a cat, donkey, ram and wolf outwit a den of wolves — the international Bremen-musicians pattern, per Lambertz\'s own comparative footnote), but it does share Elsie\'s cabbage-garden capture, the money-chest, and the mouse gnawing an escape hole — still missing the frog/oven, stable/horses and fox/geese trials, the rod-beating, the envious old woman, the cat and every death, so it cannot be spliced onto Elsie\'s fuller beats without inventing the rest. The same book\'s Zadrima Halbhahn text (pp. 254 f.) is confirmed German-only again this pass — no accompanying Albanian at that section. Following Lambertz\'s own footnote (pp. 258 f.) to Dozon, Manuel de la langue chkipe (1878) tale VIII "Le coq qui pond de l\'or et la poule qui pond des serpents" (a rooster/hen, gold/serpents variant), CORRECTING an earlier pass\'s claim that our local Dozon file holds only a table-of-contents line and two dictionary examples for it: it in fact holds the FULL running Albanian text of tale VIII (docs/references/dozon-manuel-langue-chkipe.fr-sq.txt, raw OCR lines 1581–1618, re-extracted 2026-07-15 to docs/references/dozon-gjeli-flori-pula-gjarperinj.sq.txt) — a poor man\'s rooster gorges on the king\'s gold, feigns death, and is hung head-down and beaten with a stick so gold pours from its beak; the envious old woman\'s hen, coached by the rooster to eat a serpent instead of learning the real trick, is hung up the same way and disgorges live serpents that devour her. It shares the SHAPE of Elsie\'s ending (a bird that yields gold under a daily beating; an envious neighbour\'s copy-cat animal that ends in disaster) but not the specifics — no half-a-bird split, no belly-swallowed companions, no cabbage-garden capture, no oven/stable/geese/chest trials, and the punishment itself differs (hung head-down vs. beaten across the back; devoured by serpents vs. kills the cat and dies of rage) — so, like the other two variants below, its Albanian cannot be spliced onto Elsie\'s beats (including 8–10) without quoting sentences that describe events the beats don\'t actually contain. Independently re-run archive.org full-text search (advancedsearch.php) this pass for gjysmagjeli, gjysagjeli, gjymsagjeli, gjysmakokoshi, gjysmekokosh, dysagjeli and "gjymsa gjelit" — zero hits for every spelling. No located Albanian source contains Elsie\'s combined plot (frog+fox+wolf+mouse swallowed as belly-companions; oven/stable/geese/chest as the four deaths; the daily rod that pays gold, then the cat\'s vermin and both deaths) verbatim, so rather than pin a different variant\'s sentences onto Elsie\'s (which would feed the Q() quote system false quotes), the Albanian stays declared missing until the exact text Elsie translated surfaces.',
    variants: [
      { title: '«Gjymsa gjelit» (Pralla popullore shqiptare 1954, tale 37, pp. 175–176)',
        local: 'docs/references/pralla-1954-gjymsa-gjelit.sq.txt',
        note: 'a divergent central-Geg variant — fox/wolf/whirlwind swallowed as millet grains, no frog/fire/mouse/rod-beating/deaths — NOT the original of Elsie\'s telling' },
      { title: '«Dätlsadäeli» / Der Halbhahn (Lambertz, Albanische Märchen 1922, no. 60, Shkodra, pp. 252–254)',
        local: 'docs/references/lambertz-1922-nr60-dysagjeli-shkodra.sq.txt',
        note: 'a divergent Shkodra variant in Lambertz\'s 1922 phonetic transcription (badly OCR\'d) — shares the cabbage-garden capture, money-chest and mouse-escape with Elsie, but its companions section is the unrelated Bremen-Town-Musicians tale (cat/donkey/ram/wolf vs. a den of wolves); no frog/oven, stable/horses, fox/geese, rod-beating, envious old woman, cat, or deaths — NOT the original of Elsie\'s telling' },
      { title: '«Gjeli që pjell flori, pula që pjell gjarpërinj» (Dozon, Manuel de la langue chkipe 1879, chrestomathie tale VIII, pp. 38–39)',
        local: 'docs/references/dozon-gjeli-flori-pula-gjarperinj.sq.txt',
        note: 'a divergent tale that shares only the ENDING\'s shape with Elsie — a bird beaten daily for gold, and an envious neighbour\'s copy-cat bird that ends badly — but not its specifics: the rooster here is whole (no half-a-bird split, no belly-swallowed companions, no cabbage-garden capture, no oven/stable/geese/chest trials), it is hung head-down and beaten rather than struck across the back, and the old woman is devoured by serpents rather than dying of her own rage after killing a cat — NOT the original of Elsie\'s telling, and too different in its specific events to source beats 8–10\'s Albanian without misquoting them' },
    ],
  },
  // variant record (the schema's discrepancies slot): where the located
  // Albanian variants and the in-game canon differ from the telling the beats
  // follow (Elsie), with the Albanian quoted where we have it.
  discrepancies: [
    'THE OPENING (¶1–2): in the 1954 Geg variant the couple never separates — they split the ROOSTER between them («Plaku kishte thanë: unë do ta ha gjysmën teme; plaka kishte thanë: jo, unë do ta çoj për fitim» — the old man eats HIS half, the old woman sends HERS out for profit). Elsie has the quarrel, the division cat-to-her / rooster-to-him, and the man eating half his own bird. The beats follow Elsie.',
    'THE COMPANIONS (¶3–4): Elsie\'s frog, fox, wolf and mouse are, in the 1954 variant, a fox, a wolf and the whirlwind (dyrdyli), each swallowed with a recurring formula that varies slightly each time it is said — «banu koqe mel e eja se t\' mar unë» the first two times, «banu koqe mel e eja se të marr unë» the third («become a millet grain and come, I\'ll take you in»). Lambertz\'s Shkodra text (no. 60) has an entirely different companions episode — a cat, a donkey, a ram and a wolf join the Half-Rooster on the road and together rout a den of wolves (the international Bremen-Town-Musicians pattern: „Sa i bukur je!“ says the wolf to the ram, meaning to eat him, before the ram\'s trick kills him) — nobody is swallowed at all. Lambertz\'s Zadrima variant (German only) has wolf, bee, river and cow. The frog-and-fire rescue exists in no located Albanian text (the Zadrima one quenches the oven with swallowed river-water). The beats follow Elsie.',
    'THE COURT TRIALS (¶5–7): the 1954 variant\'s rooster crows from the king\'s roof («Kikiko! T\' bin e mretit me gjo!») and is thrown to the hens (fox loosed), the stallions (wolf loosed) and onto the gold; Lambertz\'s Shkodra text instead sends him alone into a «kopSt laknas» [sic — kopsht laknash, "cabbage garden"; Lambertz\'s 1922 Shkodra phonetic transcription, badly OCR\'d] where he crows for joy, is caught and shut in a money-chest, eats the gold, and has the mouse gnaw him a hole out — one combined trial, not three. Elsie\'s telling reads as the fullest of this family — oven/frog, stable/wolf, geese/fox, chest/mouse — and the beats follow it.',
    'THE ENDING (¶8–10): the 1954 variant ends with the homecoming crow «Kikiki! Ba shosh\' e satac gati!» — sieve and dish held out, the rooster pays the old woman in gold and the cat throws the old man guts; nobody dies. Elsie ends with the daily rod that beats gold out of the rooster, the envious old woman\'s cat vomiting vermin, and the woman killing the cat and dying of rage. The beats follow Elsie.',
    'THE COIN (in-game canon): the lore card and the gjysmegjelFund vignette open with "the king seizes a coin he found" — the international Half-Chick opening; Elsie\'s text has NO seized coin (the rooster is caught crowing, hungry, in the king\'s cabbages) and the only coin is the one he LOSES on the road home (¶8.2), which the cat later finds (¶9.4). The beats follow Elsie; the vignette\'s opening is recorded here for a future reconciliation pass.',
  ],
  // sentence counts of the translation's 10 paragraphs (Elsie's tale 15)
  paragraphs: [4, 6, 12, 9, 7, 7, 3, 7, 6, 3],
  cast: [
    { id: 'gjysmagjeli', name: 'Gjysmagjeli', note: 'the Half-Rooster — one leg, one wing, half a bird and all cunning', npc: 'gjysmagjeli' },
    { id: 'plaku', name: 'the old man', note: 'keeps the rooster after the split; hunger makes him eat half of it', npc: 'plakuGjelit' },
    { id: 'plaka', name: 'the old woman', note: 'keeps the cat after the split; envy is her whole undoing', npc: 'plakaMaces' },
    { id: 'macja', name: 'the cat', note: 'catches birds for the old woman; sent out to copy the rooster and killed for succeeding wrongly', npc: 'macjaPlakes' },
    { id: 'bretkosa', name: 'the frog', note: 'first belly-companion; a pondful of water against the oven', npc: 'bretkosaPellgut' },
    { id: 'dhelpra', name: 'the fox', note: 'second belly-companion; loosed among the king\'s geese', npc: 'dhelpraUdhes' },
    { id: 'ujku', name: 'the wolf', note: 'third belly-companion; loosed among the king\'s horses', npc: 'ujkuUdhes' },
    { id: 'miu', name: 'the mouse', note: 'fourth belly-companion; gnaws the gold-chest open', npc: 'miuArkes' },
    { id: 'mbreti', name: 'the king', note: 'tries four deaths on half a rooster and loses horses, geese and gold', npc: 'mbretiSarajit' },
    { id: 'sherbetoret', name: 'the king\'s servants', note: 'the hands that cut the cabbages and work the four deaths', npc: 'sherbetoretSarajit' },
  ],
  // anchor = the game location this tale place inhabits — REUSE over invention,
  // under THE SHARING RULE. This is a CENTRAL-GEG tale: mirrors are old Tirana.
  places: [
    { id: 'oborri', emoji: '🏚️', name: 'the divided homestead', note: 'one poor yard, two hearths since the quarrel — his hut and hers',
      anchor: { status: 'existing', node: 'gjysmegjel1', mirror: 'a poor mëhalla yard in old Tirana\'s village-life quarter',
        mold: 'the Half-Rooster\'s own yard: the game already keeps him living here («një gjysmëgjel rri këtu») in the village-life quarter — the tale adds the two old people whose split made him, his master\'s hut and the cat-keeping old woman\'s across the yard',
        conflicts: 'NOT vatra (the vitore hearth-house — a rich living hearth, not this stripped pair of hovels) and NOT the three-friends widow\'s cottage at fshatiJeta (her mold is one room, one son — no room in it for a quarrelling old couple)' } },
    { id: 'pellgu', emoji: '🐸', name: 'the pond', note: 'still water at the edge of the village, where the frog drinks its fill',
      anchor: { status: 'existing', node: 'fshatiLumi', mirror: 'the still backwater of the Lana under old Tirana\'s tanners\' bridge (Ura e Tabakëve)',
        mold: 'the village\'s everyday water-edge — tanners\' pits, mill-race, washing stones, frogs in the reed-margin; workaday water hosts every small-creature scene without clashing',
        sharedWith: ['the village-life quarter\'s daily round'] } },
    { id: 'rruga', emoji: '🛤️', name: 'the open road', note: 'the road out of the village where fox, wolf and mouse fall in',
      anchor: { status: 'existing', node: 'start', mirror: 'the road out of old Tirana at the tanners\' bridge',
        mold: 'the open road hosts every traveller and every setting-out — roads accumulate stories, they never clash',
        sharedWith: ['three-friends'] } },
    { id: 'kopshti', emoji: '🥬', name: 'the king\'s cabbage garden', note: 'the vegetable garden under the saraj walls where the crowing gives him away',
      anchor: { status: 'proposed', node: 'udhekryq', mirror: 'the kitchen-gardens under Sulejman Pasha\'s konak in old Tirana',
        mold: 'the walled kitchen-garden of the king\'s saraj: cabbage rows close enough to hide half a rooster, close enough to the windows for a crow to carry',
        conflicts: 'NOT kopshtMermer1 — the marble garden behind the black palace belongs to the Sun-quest\'s stone court and the goose-girl\'s justice; a comic cabbage-hunt cannot share a petrified mourning garden',
        proposal: 'draw the saraj\'s kitchen-garden beside the saraj itself, up the plain road from the crossroads (nearest spot today: udhekryq)' } },
    { id: 'saraji', emoji: '🏯', name: 'the king\'s saraj', note: 'court, oven, stable, goose-yard and treasury — the four deaths are tried here',
      anchor: { status: 'proposed', node: 'udhekryq', mirror: 'Sulejman Pasha\'s konak of old Tirana — the plain\'s own petty court',
        mold: 'a living petty king\'s walled court on the plain: servants, a bread-oven, a stable of horses, a goose-yard, one strong gold-chest — a king mighty enough to be worth outwitting, small enough to be outwitted by half a rooster',
        conflicts: 'NOT pallatiZi (the black palace is the Sun-quest\'s mourning court — its queen weeps and its king is marble; no oven-comedy there), NOT shpirag1/Berat (the moat-king\'s walled city is the SOUTH\'s royal mirror and another tale\'s king — this central-Geg tale must not anchor there), NOT kalaRozafa (the walling legend owns it, wrong region and register)',
        sharedWith: ['snake-bridegroom (its king proposes the SAME saraj/king at this spot: one court, one king, outwitted first by half a rooster then by a snake-suitor)'],
        proposal: 'draw a small walled saraj with garden, stable and goose-yard up the plain road from the crossroads (nearest spot today: udhekryq); the half-rooster\'s court scenes stay narrated from his yard (gjysmegjel1) until it is drawn' } },
  ],
  items: [
    { id: 'floriri', emoji: '🪙', name: 'the belly-hoard', note: 'the king\'s gold, swallowed piece by piece out of the strong chest' },
    { id: 'monedha', emoji: '✨', name: 'the lost gold piece', note: 'one coin dropped on the road home — the cat\'s single honest find' },
    { id: 'thupra', emoji: '🥢', name: 'the rod', note: 'strikes the rooster\'s back each day and gold falls; strikes the cat and vermin come' },
  ],
  // how the game stages this tale — the COMPANION projection (see _SCHEMA.md). You
  // help the plucky half-rooster — one wing, one leg, all cunning — reclaim the coin
  // the king seized: on the road he swallows a frog, a fox, a wolf and a mouse, and
  // looses them one by one to beat the king's traps (the frog drowns the fire, the
  // wolf the horses, the fox the geese, the mouse gnaws the gold-chest). No mold-lock.
  play: {
    entry: 'permesa',
    stance: 'companion',
    with: 'gjysmagjeli',
    role:
      'You help the half-rooster — Gjysmëkokoshi, one wing and one leg and all of him cunning — win back the coin the king seized. Crowing to the palace, he swallows a frog, a fox, a wolf and a mouse whole, and at court looses them one by one to beat each trap: the frog\'s pondful drowns the fire lit beneath him, the wolf goes among the king\'s horses, the fox among the geese, the mouse gnaws the gold-chest open — and he swallows back his coin and a bellyful more. The smallest and half-made outwits the mighty.',
    from: 'gjysmegjel1',
    ending: 'gjysmegjelFund',
    scenes: {
      gjysmegjel1: 'permesa',
      gjysmegjel2: 'zjarri',
      gjysmegjelFund: 'arka',
    },
    divergences: [
      { beat: 'permesa', note: 'You travel as the half-rooster\'s companion through a beloved children\'s tale that runs one way — he was the household rooster split in the old couple\'s quarrel, came alive as half a bird, and set off after the coin the king took. The game distils it to the escapade at court; the choice offered is to follow him or turn back to the village.' },
      { beat: 'lakrat', note: "The four swallowed helpers and the king's four traps (thrown among the cabbages, the fire beneath him, the stable of horses, the yard of geese) are compressed into the single court scene where he looses frog, wolf, fox and mouse in turn and gnaws the chest open." },
      { beat: 'fundi', note: 'The envious coda — the rod that pays gold off the rooster\'s back but only vermin off the copy-cat cat, "one coin, then vermin" — is kept in the tale record, not staged; the game ends on the half-rooster hopping home crowing with the king\'s gold.' },
    ],
  },
  beats: [
    {
      id: 'ndarja', title: 'The quarrel that split a household',
      note: 'Two possessions, one poor household: a rooster and a cat. A single shouting-match, once too often, splits the house in two — the cat to her, the rooster to him. Her cat hunts birds daily; she eats.',
      lines: [
        ['1.1', 'An old husband and wife own exactly two creatures between them — a rooster, and a cat — and nothing more.'],
        ['1.2', 'One day a furious shouting-match ends with them resolving to part for good.'],
        ['1.3', 'They divide what little they have: the cat falls to the woman, the rooster to the man.'],
        ['1.4', 'The cat brings the old woman birds every day, and cooked birds keep her fed.'],
      ],
      cast: {
        gjysmagjeli: ['oborri', 'still a whole rooster, scratching the old man\'s side of the split yard'],
        plaku: ['oborri', 'keeps his half of the yard and one rooster — and goes hungry'],
        plaka: ['oborri', 'keeps her half of the yard and the cat — and eats daily'],
        macja: ['oborri', 'hunts birds for the old woman\'s pot'],
        bretkosa: ['pellgu', 'sits at the pond\'s edge (not yet met)'],
        dhelpra: ['rruga', 'prowls the roadside thickets (not yet met)'],
        ujku: ['rruga', 'ranges the road\'s far stretches (not yet met)'],
        miu: ['rruga', 'skirts the wheel-ruts for spilled grain (not yet met)'],
        mbreti: ['saraji', 'rules his court on the plain'],
        sherbetoret: ['saraji', 'tend oven, stable, goose-yard and treasury'],
      },
      items: {
        thupra: ['oborri', 'a plain rod leaning by the old man\'s door'],
        floriri: ['saraji', 'locked in the strongest chest the king owns'],
      },
    },
    {
      id: 'permesa', title: 'Half of a rooster',
      note: 'The old man, starving, apologizes to his rooster and eats half of it — cooked, one wing and one leg. The other half lives on, and takes the name Half-Rooster.',
      lines: [
        ['2.1', 'The old man, though, has nothing at all to eat.'],
        ['2.2', 'So one day he tells the rooster, sorrowing, that he is at his wits\' end.'],
        ['2.3', 'There is nothing for it: he will have to eat him.'],
        ['2.4', 'The rooster takes his meaning and nods.'],
        ['2.5', 'The old man cuts the bird into two halves, cooks and eats the one, and keeps the other.'],
        ['2.6', 'From that day the living half bears the name Half-Rooster.'],
      ],
      cast: {
        gjysmagjeli: ['oborri', 'half a bird now — one leg, one wing, and a new name'],
        plaku: ['oborri', 'fed once, ashamed, and no better off than before'],
      },
    },
    {
      id: 'bretkosa', title: 'A pondful of frog',
      note: 'Half-Rooster resolves to go out and earn money, and sets off hopping on his one leg. At a pond he recruits the frog, which drinks all the water it can hold and leaps into his belly.',
      lines: [
        ['3.1', 'Half-Rooster decides the time has come to travel and earn some money.'],
        ['3.2', 'Off he sets, hopping along on his single leg.'],
        ['3.3', 'At a pond\'s edge he meets a frog and invites it along.'],
        ['3.4', 'He is on a journey, he says, to make his fortune.'],
        ['3.5', 'The frog agrees to come.'],
        ['3.6', 'It drinks one last drink — every drop it can swallow — and leaps into Half-Rooster\'s belly.'],
      ],
      cast: {
        gjysmagjeli: ['pellgu', 'hops out into the world with a frog aboard'],
        bretkosa: ['pellgu', 'a bellyful of pond inside a bellyful of rooster'],
        plaku: ['oborri', 'left behind with the empty half of the yard'],
      },
    },
    {
      id: 'dhelpra', title: 'A fox for a friend',
      note: 'On the way he hails a fox: let us be friends. The fox asks where he is bound — to see the world — and crawls into his belly too.',
      lines: [
        ['3.7', 'Further along the way, Half-Rooster meets a fox.'],
        ['3.8', 'Fox, he offers, let the two of us be friends.'],
        ['3.9', 'Happily, says the fox — so tell me, little Half-Rooster, where is this road of yours headed?'],
        ['3.10', 'Out to see the world, he answers.'],
        ['3.11', 'Will you come along?'],
        ['3.12', 'The fox will — and crawls into Half-Rooster\'s belly.'],
      ],
      cast: {
        gjysmagjeli: ['rruga', 'on the open road, two companions heavier'],
        bretkosa: ['rruga', 'rides in the belly, pond and all'],
        dhelpra: ['rruga', 'curled in the belly beside the frog'],
      },
    },
    {
      id: 'ujku', title: 'And a wolf',
      note: 'A little further on a wolf asks his road. To make money, dear wolf — and the wolf crawls in after the fox.',
      lines: [
        ['4.1', 'A short way on, a wolf stops him and asks where he is going.'],
        ['4.2', 'To earn some money, dear wolf, says Half-Rooster.'],
        ['4.3', 'Care to come along?'],
        ['4.4', 'Oh yes, says the wolf — and crawls into the belly with the rest.'],
      ],
      cast: {
        gjysmagjeli: ['rruga', 'hops on, a wolf now stowed with the fox and the frog'],
        ujku: ['rruga', 'packed into the belly behind the fox'],
      },
    },
    {
      id: 'miu', title: 'The mouse who laughed',
      note: 'A mouse laughs at the one-legged hopper: aren\'t you tired? Not at all. It hears the plan — see the world, make money — and jumps in last. The belly is close to bursting.',
      lines: [
        ['4.5', 'They travel on and after a while come upon a mouse.'],
        ['4.6', 'The little mouse laughs at him: doesn\'t all that one-legged hopping wear you out, Half-Rooster?'],
        ['4.7', 'Not in the least, he answers.'],
        ['4.8', 'He gives the mouse the same reply he gave the others — out to make his fortune and take in a bit of the world along the way.'],
        ['4.9', 'He talks the mouse into coming too, and in it jumps — into a belly now stretched near to bursting.'],
      ],
      cast: {
        gjysmagjeli: ['rruga', 'a whole menagerie under one half-set of feathers'],
        miu: ['rruga', 'the last and smallest aboard the crowded belly'],
      },
    },
    {
      id: 'lakrat', title: 'Caught in the cabbages',
      note: 'Hunger drives him into a kitchen-garden, crowing. The king orders him taken; the servants ring the garden, cut down every cabbage head to find him, pull him from the last one — and shut him inside the oven to be roasted.',
      lines: [
        ['5.1', 'One day hunger catches up with Half-Rooster.'],
        ['5.2', 'He turns in at a walled kitchen-garden and lets loose with everything his half a voice can crow.'],
        ['5.3', 'Here I am, look at me!'],
        ['5.4', 'The king hears the crowing and orders the rooster caught.'],
        ['5.5', 'Servants pour out and ring the garden round.'],
        ['5.6', 'His crowing never lets up, yet he stays hidden, so head after head of cabbage falls under their knives until every last row lies bare.'],
        ['5.7', 'In the last cabbage of all they find him, seize him, and shove him into the oven to roast.'],
      ],
      cast: {
        gjysmagjeli: ['saraji', 'hauled from the last cabbage and thrust into the hot oven'],
        bretkosa: ['saraji', 'in the belly, pond at the ready'],
        dhelpra: ['saraji', 'in the belly, waiting'],
        ujku: ['saraji', 'in the belly, waiting'],
        miu: ['saraji', 'in the belly, waiting'],
        mbreti: ['saraji', 'has ordered the crowing trespasser caught'],
        sherbetoret: ['kopshti', 'have beheaded a whole garden of cabbages to catch half a rooster'],
      },
    },
    {
      id: 'zjarri', title: 'The frog against the fire',
      note: 'From inside the oven he calls his first friend. The frog leaps out, spews its whole pondful, and drowns the fire.',
      lines: [
        ['6.1', 'In his desperation Half-Rooster cries out: frog, if you\'re any friend of mine, save me now!'],
        ['6.2', 'Out leaps the frog at once, pours out every drop of its swallowed water, and the fire goes dead.'],
      ],
      cast: {
        gjysmagjeli: ['saraji', 'sits unsinged in a drowned oven'],
        bretkosa: ['pellgu', 'her pondful spent on the king\'s fire — hops home to her own water, out of the tale'],
      },
    },
    {
      id: 'stalla', title: 'The wolf in the stable',
      note: 'Next they lock him in the stable for the horses to trample. He calls the wolf, and the wolf bites every horse dead.',
      lines: [
        ['6.3', 'Next the servants shut him in the stable, for the horses\' hooves to trample him to death.'],
        ['6.4', 'Wolf, he cries, if you\'re any friend of mine, save me now!'],
        ['6.5', 'The wolf springs out and bites the horses, one after another, until every one is dead.'],
      ],
      cast: {
        gjysmagjeli: ['saraji', 'stands untrampled among the king\'s dead horses'],
        ujku: ['rruga', 'his work done in the stable — gone over the wall to the open country, out of the tale'],
        sherbetoret: ['saraji', 'find a stable of dead horses where a dead rooster should be'],
      },
    },
    {
      id: 'patat', title: 'The fox among the geese',
      note: 'A third try: penned with the geese, to be pecked to death. He calls the fox; the geese are eaten to the last feather.',
      lines: [
        ['6.6', 'For a third attempt they pen him with the geese, for the beaks to peck him to pieces.'],
        ['6.7', 'But Half-Rooster has one friend left to call on — the fox breaks free and clears the whole pen of geese, down to the last feather.'],
      ],
      cast: {
        gjysmagjeli: ['saraji', 'unpecked in a pen of feathers'],
        dhelpra: ['rruga', 'a bellyful of the king\'s geese — slips off to the thickets, out of the tale'],
        sherbetoret: ['saraji', 'three deaths tried, three flocks of losses counted'],
      },
    },
    {
      id: 'arka', title: 'The gold-chest gnawed open',
      note: 'At their wits\' end, the servants lock him in the strongest gold-chest they have. He swallows all the gold he can hold, calls the mouse, and the mouse gnaws a hole big enough for both to escape.',
      lines: [
        ['7.1', 'With no death left to try, the servants shut him inside their sturdiest strongbox, one filled with gold.'],
        ['7.2', 'Half-Rooster swallows gold piece after gold piece, all he can carry, then calls: mouse, if you\'re any friend of mine, save me now!'],
        ['7.3', 'Free of the crowded belly, the mouse sets its teeth to the chest wall until the hole is wide enough for them both to squeeze through.'],
      ],
      cast: {
        gjysmagjeli: ['saraji', 'out through the gnawed hole, heavy with swallowed gold'],
        miu: ['saraji', 'teeth through the king\'s strongest chest; parts ways at the hole, out of the tale'],
        mbreti: ['saraji', 'left with a drowned oven, dead horses, eaten geese and a holed chest'],
        sherbetoret: ['saraji', 'will find the treasury lighter by a bellyful'],
      },
      items: { floriri: ['gjysmagjeli', 'swallowed out of the king\'s chest, piece by piece'] },
    },
    {
      id: 'kthimi', title: 'Gold under the rod',
      note: 'He hops home fast, losing a single gold piece on the way. His terms to the old man: feed me well, bed me soft, and beat my back with the rod daily. Every blow shakes out a coin, and the old man lives well.',
      lines: [
        ['8.1', 'Half-Rooster hops for home as fast as one leg will carry him.'],
        ['8.2', 'Somewhere on the way, one gold piece slips from him and is lost.'],
        ['8.3', 'Back with the old man he sets his terms: master, from now on feed me full and bed me soft.'],
        ['8.4', 'And take the rod to my back once every day.'],
        ['8.5', 'The old man does exactly as the rooster says.'],
        ['8.6', 'Daily the rooster eats his fill and sleeps soft, and daily the old man lays the rod across his back.'],
        ['8.7', 'At every stroke a gold piece drops out — and on that money the old man begins to live well.'],
      ],
      cast: {
        gjysmagjeli: ['oborri', 'home — fed full, bedded soft, and beaten rich once a day'],
        plaku: ['oborri', 'lives well at last, rod in hand and gold underfoot'],
      },
      items: {
        monedha: ['rruga', 'one coin of the hoard, dropped and lost on the road home'],
        floriri: ['oborri', 'beaten out of the rooster\'s back a piece a day'],
        thupra: ['oborri', 'now the most profitable stick in the village'],
      },
    },
    {
      id: 'macja', title: 'The green-eyed errand',
      note: 'The old woman hears, goes green with envy, and screams her cat out the door to make money too. The cat finds the lost coin and swallows it — then gorges on every crawling thing it meets, mice and snakes and salamanders and bugs alike, and comes home quoting the rooster\'s terms.',
      lines: [
        ['9.1', 'When word of it all reaches the old woman she turns furious — green with envy.'],
        ['9.2', 'She screams at her cat: out with you, you good-for-nothing!'],
        ['9.3', 'Go journey and bring back money!'],
        ['9.4', 'The cat obeys — and on its way finds the very gold piece Half-Rooster lost, and swallows it.'],
        ['9.5', 'It finds plenty more besides — insects, salamanders, snakes, mice — eats the lot, and pads home with a full belly.'],
        ['9.6', 'Aping the rooster, it tells its mistress: feed me daily and bed me soft, for I have journeyed and made money.'],
      ],
      cast: {
        macja: ['oborri', 'home from the road, one coin and a bellyful of vermin the richer'],
        plaka: ['oborri', 'green with envy, waiting on a fortune of her own'],
      },
      items: { monedha: ['macja', 'found on the road and swallowed — the cat\'s one true coin'] },
    },
    {
      id: 'fundi', title: 'One coin, then vermin',
      note: 'She keeps the bargain and plies the rod. Day one shakes out the gold piece; every day after, only salamanders, snakes and mice. In her rage she kills the cat — and then dies herself, of anger and envy.',
      lines: [
        ['10.1', 'The old woman keeps her end of the bargain, taking the rod to its back once each day, exactly as promised.'],
        ['10.2', 'The first day one gold piece falls out; every day after, nothing comes but salamanders, snakes, mice and suchlike creeping things, and her fury grows.'],
        ['10.3', 'In the end her rage kills the cat — and then anger and envy kill the old woman herself.'],
      ],
      cast: {
        macja: ['oborri', '☠ beaten and killed by the mistress it fed for years'],
        plaka: ['oborri', '☠ dead of her own rage and envy, over one coin and a heap of vermin'],
        gjysmagjeli: ['oborri', 'crows on across the yard, worth his weight in daily gold'],
        plaku: ['oborri', 'outlives the quarrel, the split and the spite — comfortably'],
      },
      items: { monedha: ['oborri', 'shaken out on the first day — the only gold the rod ever found in the cat'] },
      exit: ['macja', 'plaka'],
    },
  ],
}
