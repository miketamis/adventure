// ===========================================================================
// TALE: The Swallow (dallëndyshja) — see ../tales/_SCHEMA.md for the format
// contract. This file is owned by its tale: agents editing other tales must
// not touch it.
//
// The numbered original here is a MODERN ALBANIAN telling — no 19th/20th-
// century collected text of this legend has surfaced anywhere (see
// albanian.why). The fullest printed telling is Përparim Hysi's «Pse
// dallëndyshja e bën folenë te "koka e njeriut"?» (Bota Sot, 1 August 2023;
// reprinted the same day, word for word, on fjalaelire.com). It is modern
// copyrighted journalism, so all lines are my own-words English paraphrases
// and NO verbatim Albanian third element is carried (nothing here may feed
// the Q() quote system). The raw Albanian extract is kept at
// docs/references/hysi-2023-pse-dallendyshja.sq.txt for reference only.
// ===========================================================================

export default {
  id: 'swallow',
  title: 'The Swallow (dallëndyshja)',
  source:
    'Përparim Hysi, «Pse dallëndyshja e bën folenë te "koka e njeriut"?», Bota Sot (Tiranë), 1 August 2023 · read in the Albanian original; all lines paraphrased into my own English (see albanian.why for why no line carries the Albanian itself)',
  // where the tale comes from — anchors should prefer this region's mirrors.
  // The fable names no region at all; it is told wherever the custom of
  // never harming a swallow's nest is kept, which is everywhere in Albania.
  origin: {
    region: 'pan-Albanian (no region named in the source — an everyone\'s-house etiology, not a local one)',
    collector: 'Përparim Hysi, a present-day folklore-recording writer, from the oral tradition — his own line: «ka ardhur gojë pas goje, përmjet të moshuarëve» (it has come mouth to mouth, through the elders who tell it)',
    published: 'Bota Sot (Tiranë), 1 August 2023; reprinted the same day on Fjala e Lirë (ed. Prof. Dr Fatmir Terziu)',
  },
  // NO PUBLIC-DOMAIN ALBANIAN FOLK ORIGINAL FOUND — the lines carry no third
  // element by design.
  albanian: {
    status: 'missing',
    why:
      'the only full telling found anywhere is Hysi\'s own 2023 article (and its same-day word-for-word reprint on fjalaelire.com) — modern copyrighted journalism recording an oral legend, not a 19th/20th-century collected folk text, so it cannot feed the Q() quote system as a public-domain original (the same standard already set for the bee-spider-cicada and tortoise tales). Searched exhaustively for an older Albanian original: pralla-popullore-shqiptare-1954 (grep dallëndyshe/dallendyshe/dallandyshe and OCR variants — 0 hits); Dozon\'s Contes albanais and Manuel de la langue chkipe (grep "hirondelle" — only the unrelated "swallow\'s milk" plant/place-name entries between two mountains, no tale); Jarník, Meyer, Lambertz — nothing. Von Hahn\'s Griechische und albanesische Märchen Vol. 2 (its own table of contents, "Albanesische Märchen" Nos. 95-107 — cuckoo and creation-wolf are Nos. 104-105 of that very list, confirming the numbering) has no Schwalbe tale anywhere beside them, and the archive.org full text of the whole two-volume work has zero hits for "Schwalbe"; von Hahn\'s Albanesische Studien mentions the swallow only in spring first-swallow-of-the-year superstition (a bit of bread left by the bed), never this legend. Robert Elsie\'s own 26 cached folktales and 15 cached legends on albanianliterature.net, and his full 117-page anthology "Albanian Folktales and Legends" (both editions\' complete tables of contents checked page by page) have no swallow tale either — the lore card\'s citation of "Albanian Literature: Folktales" is the site\'s generic front page, not a specific tale page, exactly as with the bee-spider-cicada and tortoise cards. The legend is genuinely oral (Hysi\'s own words say so), but no collected pre-2000 printing of it has surfaced anywhere searched.',
    local: 'docs/references/hysi-2023-pse-dallendyshja.sq.txt',
  },
  // where the telling disagrees with the game's own lore card and built
  // scene — the rewrite decides per case which reading our world tells
  discrepancies: [
    'AN ACCIDENT, NOT A THREAT (¶2.3-2.6): the lore card summarises "a serpent threatens to sink a ship unless it learns whose blood is sweetest" — but Hysi\'s telling has the ship ALREADY torn open by a sudden accident, with the serpent VOLUNTEERING to plug the leak in exchange for its price. The stakes are the same (comply or everyone drowns), but the serpent is a bargainer hired mid-disaster, not the disaster\'s author. The beats follow Hysi: the hole opens on its own, and the serpent only afterward names its fee.',
    'THE SHIP IS NEVER STAGED: the game\'s own vignette (gjizar2\'s back lane → dallendyshe1 → dallendysheFund) compresses the whole fable into an overheard scrap of animal-lore in the village, with no ship, captain or passengers anywhere in it. The beats keep Hysi\'s ship as the tale\'s own mythic-time setting (an offstage place, "anija"), and let the story surface into the game\'s present tense only at its climax and close — exactly where the built scene already stages it (see the anchors).',
    'THE FORKED TAIL IS NOT IN THIS TELLING: the game\'s own already-built secret ending (dallendysheFund, content.js — not this file\'s to edit) says the cheated serpent "struck at the swallow as she fled and tore her tail into the fork she has worn ever since"; the lore card repeats the same line. Hysi\'s telling has no such strike at all — his serpent curses her future NESTS only ("I will not leave you so much as one fledgling"), and the swallow answers by choosing to nest at man\'s head, full stop. Both endings agree on the RESULT (the swallow is marked, and forever after nests on man\'s house), so nothing is contradicted, only unproven by this source. The beats follow Hysi\'s telling for every numbered line; the final beat\'s note records the tail-strike as the game\'s own established coda, kept exactly as already built but not given a numbered line of its own, since no source in hand stages it.',
    '"AT THE HEAD OF MAN," LITERALLY (¶3.1): the lore card renders the swallow\'s answer as nesting "at the head of the house" — but Hysi\'s Albanian says «koka e njeriut», the head of MAN himself, not «koka e shtëpisë», the house\'s own head (its gable). The beats keep the more literal, more startling image: she builds directly over the doorway, at the height of a man\'s own head, which is also of course the gable-end of the house — the two readings meet at the same rafter.',
    'HOW THE HOLE WAS ACTUALLY PLUGGED (¶2.8): Hysi is specific that the serpent "coiled itself into a tight knot" («u mblodh "kutullac"») to seal the leak — a small physical detail the lore card\'s summary skips entirely. The beats keep it: the serpent buys its price with its own body, not merely a promise.',
  ],
  // sentence counts of the numbered original\'s 3 paragraphs — the frame
  // sentence that states the puzzle (¶1), the legend proper (¶2, by far the
  // longest — the ship, the wager, the tongue, the curse), and the etiology
  // that closes it (¶3). Hysi\'s own opening ("I haven\'t seen a swallow this
  // year...") and closing aside ("I write this now because the mosquitoes
  // have multiplied") are the essayist\'s own frame around the legend, not
  // the legend itself, and are not numbered — exactly as the tortoise tale
  // left out its essay\'s unrelated opening and closing asides.
  paragraphs: [4, 15, 4],
  cast: [
    { id: 'dallendyshja', name: 'Dallëndyshja', note: 'the swallow — cuts the mosquito\'s tongue mid-word and saves mankind; cursed for it, and answers by nesting at man\'s own head', npc: 'dallendyshja' },
    { id: 'mushkonja', name: 'Mushkonja', note: 'the mosquito — finds whose blood is sweetest and is silenced before she can say it; buzzes ever after', npc: 'mushkonja' },
    { id: 'gjarpri', name: 'Gjarpri i anijes', note: 'the ship-serpent — plugs the leak for a price, is cheated of the answer, and curses the swallow instead', npc: 'gjarpriAnijes' },
    { id: 'udhetaret', name: 'udhëtarët e anijes', note: 'the captain and passengers — saved twice over without ever knowing it', npc: 'udhetaretAnijes' },
  ],
  // anchor = the game location this tale place inhabits (see _SCHEMA.md).
  // The game ALREADY stages this tale as an overheard back-lane vignette
  // (gjizar2's spot → dallendyshe1 → dallendysheFund, a secret ending) —
  // exactly where "Gjon the cuckoo" and "the king's golden chick" are also
  // overheard on the same lane. The fable names no region, so its anchors
  // are pan-Albanian: the village's own back lane, and an offstage ship.
  places: [
    { id: 'anija', emoji: '⛵', name: 'the storm-holed steamship', note: 'mid-crossing when the hull tears open — the wager is struck here, out of sight of any shore',
      anchor: { status: 'offstage', mirror: 'a passenger "vapor" of Hysi\'s telling — already a steamship, not a sailing ship of the older tales, and named to no particular sea',
        mold: 'the fable\'s own mythic-time stage: a holed hull, a captain\'s alarm, and three animal passengers nobody else notices — never drawn, since the game folds the whole crossing into the back lane\'s overheard vignette instead',
        conflicts: 'NOT deti1 — deti1 hosts REAL staged sea crossings (the Baloz\'s horizon, the Wind\'s carry over the water); this ship never actually comes onstage, so it may not claim that spot' } },
    { id: 'rruga', emoji: '🏘️', name: 'the back lane', note: 'where the fight and the curse are overheard, any day you pass',
      anchor: { status: 'existing', node: 'dallendyshe1', mirror: 'a back lane of the game\'s own village — pan-Albanian lore has no home region to itself, so it settles wherever bird-tales already gather',
        mold: 'the lane\'s own line already carries the climax («një dallëndyshe lufton një gjarpër»; «një mushkonjë ndihmon gjarprin»; «një dallëndyshe pre gjuhën e mushkonjës»; «gjarpri është i keq me dallëndyshen») — the mythic-time wager surfaces here, present tense, as an ambient scrap of animal-lore; bird-tellings accumulate on this lane without clashing',
        conflicts: 'NOT gjizar1 or cuckoo1 — those are the lane-fork house (the bee tale\'s dying mother) and the sewing house (Gjon and the Kjükje\'s scissors) respectively; this fable owns its own dedicated spot one step further down the same lane',
        sharedWith: ['cuckoo (Gjon\'s cry, next door at cuckoo1)', 'gjizar (the king\'s golden-chick errand, at gjizar2)'] } },
    { id: 'streha', emoji: '🪺', name: 'the eave at the head of man', note: 'where the swallow makes good on her answer — the story\'s own resolution, playable today',
      anchor: { status: 'existing', node: 'dallendysheFund', mirror: 'the gable-eave over any village doorway — the swallow\'s promised nesting-place made literal',
        mold: 'the built ending\'s own lines say it plainly: «njeriu është i sigurt»; «dallëndyshe rri në shtëpi» — man is safe, and the swallow lives in the house from that day on; this is the fable\'s permanent resting state, not a one-time event',
        sharedWith: ['the back-lane thread (dallendyshe1 → dallendysheFund is one continuous scene)'] } },
  ],
  items: [
    { id: 'vrima', emoji: '🕳️', name: 'the hole in the hull', note: 'torn open without warning — would have drowned every soul aboard, until the serpent named its price' },
    { id: 'gjuha', emoji: '👅', name: 'the mosquito\'s tongue', note: 'bitten clean off before the fatal word finished — the reason she can only buzz to this day' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md). You
  // become the swallow at the fatal instant; the CHOICE — bite the mosquito's tongue
  // before it names man's blood, or let it speak — decides whether you become the
  // friend of the house or doom mankind to the serpent. The ship & the hull-hole are
  // kept offstage (as the tale's own framing). become:'swallow' rides the entry from
  // the gjizar bird-hub ("ndihmo dallëndyshen" → dallendyshe1).
  play: {
    entry: 'gjuha',
    stance: 'embodied',
    as: 'dallendyshja',
    role:
      'You are the swallow. The serpent wants the sweetest blood there is, and the mosquito has just found it — man\'s — and is crying the answer out. Bite the prying tongue before the word finishes and you become the friend of the house forever; let it speak, and mankind is the serpent\'s prey for good.',
    enter:
      'you are the swallow, and the mosquito is about to tell the serpent whose blood is sweetest — man\'s — with the word half out of its mouth',
    from: 'dallendyshe1',
    ending: 'dallendysheFund',
    scenes: {
      dallendyshe1: 'gjuha',
      dallendysheFund: 'streha',
    },
    divergences: [
      { beat: 'gjuha', note: 'The legend\'s swallow always bites the tongue — that mercy IS the tale. The game makes it a real choice and adds the branch she never takes (let the mosquito speak → the secret ending "The Word Let Slip"): mankind can be doomed to the serpent, and the swallow never earns her place in the house.' },
      { beat: 'anija', note: 'The ship, its passengers, and the hull-hole the serpent plugs for its price are kept offstage — the game enters at the fatal instant on deck, distilling the fable to the swallow\'s single decisive act, exactly as the source frames it ("a small tale... it touches something every person can feel is true").' },
      { beat: 'mallkimi', note: "The serpent's curse and the swallow's retort are compressed into the ending's image — the cheated serpent tears her tail into its fork, and she answers by nesting at the head of man, dear as bread." },
    ],
  },
  beats: [
    {
      id: 'anija', title: 'A fact worth wondering about',
      note: 'The puzzle the whole tale answers: swallows nest inside our own houses, and no one ever asks why. Before the story proper begins, everyone who will matter to it is already aboard one ordinary ship, crossing the water like any other day.',
      lines: [
        ['1.1', 'Here is a small tale about swallows — one that reads almost like a folk-story.'],
        ['1.2', 'It touches something every person in the world can feel is true.'],
        ['1.3', 'The plain fact at the bottom of it: swallows build their nests inside our own houses.'],
        ['1.4', 'Yet we never once stop to ask ourselves why that should be so.'],
        ['2.1', 'A great many passengers were once travelling together aboard a steamship.'],
        ['2.2', 'Besides the people, the story goes, a swallow, a mosquito, and a serpent were riding along as well.'],
      ],
      cast: {
        dallendyshja: ['anija', 'rides along with the other passengers, nothing yet asked of her'],
        mushkonja: ['anija', 'rides along too, an ordinary mosquito lost in the crowd'],
        gjarpri: ['anija', 'coiled somewhere below decks, unnoticed'],
        udhetaret: ['anija', 'a shipful of ordinary people, crossing the water like any other day'],
      },
    },
    {
      id: 'avari', title: 'The hole in the hull',
      note: 'Out in open water, without warning, the hull tears open. The captain sounds the alarm: there is exactly one way through this — seal the hole, or everyone drowns together.',
      lines: [
        ['2.3', 'When the ship was out in open water, disaster struck all at once.'],
        ['2.4', 'A round hole tore open in the hull — small as it was, it had to be sealed at once, or ship and passengers alike would go under.'],
        ['2.5', 'The captain sounded the alarm; there was only one choice left: seal the hole, or everyone aboard would be lost together.'],
      ],
      cast: {
        udhetaret: ['anija', 'thrown into panic as the alarm goes up — every life aboard now hangs on the next few minutes'],
        gjarpri: ['anija', 'takes in the danger along with everyone else — and sees its chance'],
      },
      items: { vrima: ['anija', 'torn open in the hull — the water already coming in'] },
    },
    {
      id: 'kembimi', title: "A serpent's price",
      note: 'The serpent offers to plug the hole itself — but only for a reward: the sweetest blood there is. The mosquito volunteers to go find it, and the serpent coils its own body tight into the breach.',
      lines: [
        ['2.6', 'At that the serpent spoke up: I will plug the hole myself — but as my reward I want to drink the sweetest blood there is!'],
        ['2.7', 'I will go and find that blood myself, said the mosquito, and took to the air.'],
        ['2.8', 'The serpent coiled itself into a tight knot and sealed the hole.'],
      ],
      cast: {
        gjarpri: ['anija', 'names its price and plugs the leak with its own coiled body'],
        mushkonja: ['anija', 'takes wing to search out the sweetest blood alive, on the serpent\'s behalf'],
        udhetaret: ['anija', 'saved from drowning without ever knowing the bargain that saved them'],
        dallendyshja: ['anija', 'watches the mosquito go — the only one aboard who guesses what it will find'],
      },
      items: { vrima: ['gjarpri', 'sealed shut by the serpent\'s own coiled body'] },
    },
    {
      id: 'gjuha', title: 'Whose blood is sweetest',
      note: 'The mosquito tastes animal, bird, and man, and finds man\'s blood the sweetest of all — but the swallow cuts her tongue off in mid-word, before the serpent can ever learn the answer.',
      lines: [
        ['2.9', 'The mosquito went hunting for the sweetest blood, and after tasting animal, bird, and man in turn, found that man\'s blood was the sweetest of all.'],
        ['2.10', 'She flew back to the ship and cried out: O serpent, the sweetest blood belongs to ma—'],
        ['2.11', '— and before the word was even finished, the swallow snapped forward and bit the mosquito\'s tongue clean off.'],
        ['2.12', 'After that the mosquito could only manage a thin buzz.'],
      ],
      cast: {
        mushkonja: ['anija', '☠ not dead, but silenced forever — her tongue gone before she could name mankind'],
        dallendyshja: ['anija', 'strikes the instant the fatal word begins — mankind is spared by one snap of her beak'],
        gjarpri: ['anija', 'still waiting on the answer it will now never hear'],
      },
      items: { gjuha: ['mushkonja', 'bitten away mid-word — the reason she can only buzz from now on'] },
    },
    {
      id: 'mallkimi', title: 'The curse and the retort',
      note: 'The serpent never learns whose blood was sweetest, but it sees exactly what the swallow did, and curses her nests forever. She answers at once: she will build hers at the very head of man himself. This is the exchange the back lane still plays out today, present tense, for anyone who stops to listen.',
      lines: [
        ['2.13', 'The serpent never did learn whose blood was sweetest, but it saw exactly what the swallow had done, and turned on her in fury.'],
        ['2.14', 'You who cut out the mosquito\'s tongue, it hissed, will never escape my curse.'],
        ['2.15', 'I will not leave you so much as one fledgling in your nest.'],
        ['3.1', 'As for me, the swallow answered, be as angry as you like — I will build my nest right at the very head of man.'],
      ],
      cast: {
        gjarpri: ['rruga', 'cheated of its answer, curses every nest the swallow will ever build'],
        dallendyshja: ['rruga', 'answers the curse on the spot — her nest will sit at the very head of man'],
        mushkonja: ['rruga', 'only a buzz left to her, whatever she might have wanted to add'],
      },
    },
    {
      id: 'streha', title: 'Ever the friend of man',
      note: 'From that day, swallows have nested in every house, dear to people as bread itself, and no one has ever torn one down. Mosquitoes still only buzz, and serpents, for their part, still hold their old grudge against man alone. (The game\'s own already-built ending remembers one blow more than this telling does: the cheated serpent striking the fleeing swallow and tearing her tail into the fork she wears since — kept here as the established coda, though no source in hand stages the strike itself.)',
      lines: [
        ['3.2', 'And from that day on, swallows have nested in our houses, and no one has ever torn one down.'],
        ['3.3', 'They are held as dear to us as bread itself.'],
        ['3.4', 'To this day the mosquito can only buzz, and the serpent, for its part, still strikes at man alone.'],
      ],
      cast: {
        dallendyshja: ['streha', 'nests at the very head of man, exactly as she promised — safe under every eave, a sin to harm'],
        mushkonja: ['rruga', 'still only a buzz, heard any day you pass the back lane'],
        gjarpri: ['anija', 'back in the water, its old grudge against man unspent to this day'],
        udhetaret: ['anija', 'sailed on to wherever they were bound, never learning how nearly they were named'],
      },
    },
  ],
}
