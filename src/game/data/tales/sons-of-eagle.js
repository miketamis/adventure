// ===========================================================================
// TALE: Sons of the Eagle — the national origin/etymology legend — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// THIS LEGEND IS ALREADY STAGED in the game: content.js's shqipe1 → shqipe2 →
// shqipe3 → shqipeFund (a 'good' ending titled "Son of the Eagle"), reached
// off the ACT V long-way-home stretch (udhaKthimit) near the Buna/Rozafa
// crossing. Uniquely among the game's tale-vignettes, that scene casts the
// PLAYER directly as the legend's own founder-hero (second person: "you climb
// to the nest… the eagle gives you eyes and strength… you are the son of the
// eagle") rather than having the player watch or help a separate named hero —
// see tale-sons-of-eagle.js's note on the 'youth' cast member/NPC.
//
// NO ALBANIAN ORIGINAL WAS FOUND for this specific legend (see `albanian`
// below) — it is a short, modern etymology legend (attested in English via
// Wikipedia and a USC Digital Folklore Archive family oral-history transcript
// it cites), not a text that turned up in any of the 19th–20th-century
// Albanian folklore collections on hand. None has been invented.
// ===========================================================================

export default {
  id: 'sons-of-eagle',
  title: 'Sons of the Eagle — why Albanians are Shqiptarë',
  source:
    'Wikipedia, "The Tale of the Eagle" (as cited by the game\'s own folklore card), in turn citing the USC Digital Folklore Archive\'s "The Tale of the Eagle" (folklore.usc.edu) — a family oral telling recorded by a USC student from her father, who had it from his grandmother in Albania; both pages read directly; all lines paraphrased',
  // where the tale comes from — anchors should prefer this region's mirrors
  origin: {
    region:
      'no region is named in the telling at all — this is a pan-Albanian national origin/etymology legend, not a Tosk- or Gheg-localised folktale. The game\'s existing crag vignette places it in the northern highlands near the Buna/Rozafa crossing (see places below); a placeless national legend does not contradict that siting',
    collector:
      'an oral family tradition — informant "D.S.," an Albanian immigrant, telling a story he had from his own grandmother — recorded by his daughter for a University of Southern California student folklore-collection project, and independently retold (in fuller, more polished form) on Wikipedia',
    published: 'USC Digital Folklore Archive, folklore.usc.edu (undated online entry); Wikipedia article, revised through August 2024',
  },
  // the ALBANIAN ORIGINAL — genuinely not found; see the search recorded here
  albanian: {
    status: 'missing',
    why:
      'Searched all local corpora for an Albanian original of this etymology legend (a hunter, an eagle\'s nest, a snake, the naming of "Shqiptar"/"Shqipëria"): grepped shqipon*/shqiptar/shqip across pralla-popullore-shqiptare-1954.sq.txt (484KB, 50 tales — the only hits are an unrelated "mbretëresha e shqiponjave" eagle-queen tale and scattered generic word-uses; no youth-serpent-eaglet narrative anywhere in it), dozon-manuel-langue-chkipe.fr-sq.txt, hahn-albanesische-studien.de-sq.txt, jarnik-zur-albanischen-sprachenkunde.de-sq.txt, meyer-kurzgefasste-grammatik.de-sq.txt and lambertz-albanische-marchen.de-sq.txt (zero shqipon* hits in any of these five). Checked fishta-lahuta-e-malcis.sq.txt too: "Shqypni"/"Shqyptar" occur only in general patriotic verses, never alongside gjarpër/fole/shqiponjë in the same passage. Ran an archive.org full-text advancedsearch for shqiptar+shqiponja+legjenda: 0 results. Conclusion: this specific etymology legend — as sourced here from Wikipedia, itself citing one family\'s oral telling collected by a USC student folklore project — has no locatable published 19th–20th-century Albanian folk-collection text behind it; it reads as a modern/diaspora retelling of the standard "Shqipëtar = son of the eagle" folk etymology rather than a piece lifted from Mitko, Dozon, Hahn, Jarnik, Meyer, Lambertz or the 1954 Tirana anthology. One close analog was checked and ruled out: docs/references/meyer-qerozi-scurfhead.sq.txt §12 has a 19th-century Albanian "grateful eagle" motif — a hero saves eaglets from a snake that climbed their tree, and the mother eagle rewards him — but there it resolves as an ATU301 "carry the hero back up from the underworld" bargain, part of the separate Qerozi/Scurfhead tale (already used by scripts/../tales/scurfhead.js), with no naming/kingship payoff; it is not a source for this legend. No Albanian original found — none invented.',
  },
  // where the two English source variants disagree (no Albanian-vs-translation
  // question here, since no Albanian original was found) — plus how the game's
  // own compressed in-engine text (content.js) relates to the fuller telling
  // the beats below restore
  discrepancies: [
    'THE REWARD\'S WORDING (¶4): Wikipedia has the eagle promise "the sharpness of my eyes and the powerful strength of my wings… you will become invincible"; the USC family telling it draws on has the milder "the sharpness of my eyes and the powerful strength of my wings… you will be called the strongest." Same gift, softer claim in the family telling. The beats follow Wikipedia, the source folklore.js actually cites.',
    'THE TWO HEADS (¶6.2): only Wikipedia\'s text adds "The two heads on the eagle represent the north and the south" — the USC family telling it cites has no such line. This reads as a later editorial gloss conflating the tale\'s ONE eagle with the separate double-headed eagle of the Albanian flag/coat of arms (a Byzantine-derived heraldic emblem, not a detail of this plot). The beats keep the sentence, since it is part of the cited source, but flag it here as heraldry appended to the story rather than an event in it.',
    'THE SPOKEN BARGAIN, COMPRESSED IN-GAME: the fuller English telling gives the eagle\'s challenge and the hunter\'s answer as direct speech (¶2-4: "why do you kidnap my child?" / "the child is mine because I saved it…" / "give me back my child, and I will give you…"). The game\'s own staged text (content.js shqipe3) compresses all of this into two silent lines — "the eagle returns," "the eagle gives you eyes and strength" — for pacing. The beats below restore the full spoken exchange from the source telling; nothing here contradicts what is staged, it only unpacks it.',
  ],
  // sentence counts of the six paragraphs of the fuller English telling
  // (Wikipedia's own paragraph breaks; its opening one-sentence editorial
  // framing — "The Tale of the Eagle is an Albanian folk tale that explains
  // how Albania and Albanians received their indigenous name" — is the
  // encyclopedia's own header note, not part of the told story, and is not
  // counted as a numbered paragraph here)
  paragraphs: [10, 1, 1, 2, 3, 2],
  cast: [
    { id: 'youth', name: 'the hunter', note: 'unnamed until the very end, when the people crown and name him Shqipëtar', npc: 'shqipetariPare' },
    { id: 'eagle', name: 'the great eagle', note: 'mother of the eaglet; repays a life saved with eyes, wings and her own name', npc: 'shqiponjaShkembit' },
    { id: 'eaglet', name: 'the eaglet', note: 'the nestling whose near-death is the hinge the whole legend turns on', npc: 'shqiponjaVogel' },
    { id: 'serpent', name: 'the serpent', note: 'carried into the nest for dead; wakes to strike; dies to the hunter\'s arrow', npc: 'gjarpriShkembit' },
    { id: 'people', name: 'the people of the land', note: 'crown the hunter king and give his and their new names', npc: 'populliVendit' },
  ],
  // anchor = the game location this tale place inhabits. THIS LEGEND IS
  // ALREADY BUILT — every place below is an EXISTING node of the game's own
  // shqipe1→shqipeFund crag quest, reached off the long-way-home stretch
  // (udhaKthimit) near the Buna/Rozafa crossing in the north.
  places: [
    { id: 'road', emoji: '🛤️', name: 'the mountain road home', note: 'the highland stretch the hunter is walking when the eagle first catches his eye',
      anchor: { status: 'existing', node: 'udhaKthimit', mirror: 'the road down from the high country toward the Buna/Rozafa crossing, on the game\'s own long-way-home stretch',
        mold: 'the open homeward road hosts whichever traveller is passing through at the time — a hunter crossing it on his own business contradicts nothing else staged on this stretch',
        sharedWith: ['the whole ACT V long-way-home stretch'] } },
    { id: 'crag', emoji: '🪨', name: 'the eagle\'s crag', note: 'the bare rock shelf where the eagle nests, first seen from below',
      anchor: { status: 'existing', node: 'shqipe1', mirror: 'a nesting crag in the northern highlands above the same road',
        mold: 'a single eagle\'s eyrie on an unclaimed crag: nothing else is staged here, so this one nesting eagle and her eaglet own it outright',
        conflicts: 'NOT Baba Tomor\'s she-eagles circling the summit (majaEagle) — a different mountain (Tomorr, in the south) and a different tale\'s birds; that crag hosts a flock, this one a single nesting mother' } },
    { id: 'nest', emoji: '🪺', name: 'up in the nest', note: 'the eaglet\'s nest itself, reached by climbing the crag',
      anchor: { status: 'existing', node: 'shqipe2', mirror: 'the nest atop the same crag',
        mold: 'the nest is the crag\'s one private spot: whoever climbs up meets only the eaglet and whatever the mother eagle has left there with it' } },
    { id: 'bargain', emoji: '🤝', name: 'the eagle\'s return', note: 'partway down from the crag, where the eagle overtakes the hunter and strikes her bargain',
      anchor: { status: 'existing', node: 'shqipe3', mirror: 'the open track just below the crag, on the way back to the road',
        mold: 'the spot where the eagle catches up with anyone carrying her chick off — the bargain plays out here; the years that follow are narrated only in the ending blurb, never staged as their own scene' } },
    { id: 'kingdom', emoji: '👑', name: 'the eagle-named kingdom', note: 'offstage in time as much as in space — years later, the land that crowns him',
      anchor: { status: 'existing', node: 'shqipeFund', mirror: 'the ending tableau the game plays out at the same spot — a compressed epilogue, not a separately drawn city',
        mold: 'the coronation is narrated, not staged as its own city: whichever kingdom the founder later rules stays offstage in every telling of this legend, and the ending screen simply states the outcome' } },
  ],
  items: [
    { id: 'bow', emoji: '🏹', name: 'the hunter\'s bow', note: 'draws and kills the waking serpent in the same instant it rears to strike' },
    { id: 'gift', emoji: '👁️', name: 'the eagle\'s gift', note: 'no object at all — eyesight and wing-strength, given, not made or carried' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md). You
  // become the hunter on the road home; the CHOICE at the eagle's bargain — give
  // her little one back or keep it — decides whether you earn her name (become the
  // first of the Sons of the Eagle) or stay only a hunter. become:'sons-of-eagle'
  // is carried on the road entry (udhaKthimit "ec rrugës" → shqipe1).
  play: {
    entry: 'hunt',
    stance: 'embodied',
    as: 'youth',
    role:
      'You are the hunter on the long road home — the one the oldest story remembers. Save the eaglet a waking serpent means to devour; then how you answer the great eagle\'s bargain — give her little one back, or keep it — decides whether your whole people take her name for their own, or you remain only a good hunter who might have been their first king.',
    enter:
      'on the road home you find an eaglet a waking serpent means to devour, and the great eagle who returns will offer you a bargain that could name your whole people',
    from: 'shqipe1',
    ending: 'shqipeFund',
    scenes: {
      shqipe1: 'hunt',
      shqipe2: 'climb',
      shqipeBarter: 'bargain',
      shqipeFund: 'crowned',
    },
    divergences: [
      { beat: 'bargain', note: 'The legend\'s hunter always gives the eaglet back — that honour IS the point. The game makes it a real choice and adds the branch he never takes (keep the eaglet → the secret ending "A Hunter, No More"): you can forfeit the eagle\'s bargain, and with it the name that would have made your people the Sons of the Eagle.' },
      { beat: 'crowned', note: 'You embody "the hunter"; earning the eagle\'s name is the identity you become — the first Shqiptar. The people\'s crowning and the founding of Shqipëria are compressed into the closing tableau rather than played out as a reign.' },
      { note: 'The tale names no region — it is a pan-Albanian national origin/etymology legend. The game sites it on the northern road home toward the Buna/Rozafa crossing (a placeless legend does not contradict the siting), and frames it as the drought-hero\'s epilogue: decline the eagle and you simply go home victorious from the drought.' },
      { beat: 'crowned', note: 'The double-headed eagle of the emblem (read as the land\'s north and south) is kept in the tale record but not drawn as a game object; the eagle\'s "gift" is eyesight and wing-strength — a blessing, never a carried item.' },
    ],
  },
  beats: [
    {
      id: 'hunt', title: 'A hunter on the mountain road',
      note: 'A young hunter makes his way alone through the high country. Above and ahead of him, unseen, an eagle already carries a snake toward her own crag, where her one eaglet waits.',
      lines: [
        ['1.1', 'A young hunter is making his way alone through the high mountains.'],
      ],
      cast: {
        youth: ['road', 'walks the mountain road alone, bow in hand'],
        eagle: ['crag', 'nests on a crag ahead with her one eaglet — not yet seen by the hunter'],
        eaglet: ['crag', 'waits alone in the nest'],
        serpent: ['crag', 'just now snatched up by the eagle, carried in live to the nest'],
        people: ['kingdom', 'live under no king of this line — not yet, and not yet even aware of him'],
      },
      items: { bow: ['youth', 'slung ready at his shoulder'] },
    },
    {
      id: 'crag', title: 'A great bird on the crag',
      note: 'Overhead, a huge eagle wheels down onto the crag gripping a live snake in her beak; this rock is her own eyrie, and before long she is gone from it again.',
      lines: [
        ['1.2', 'Overhead, a great eagle circles down and lands on the lip of a crag.'],
        ['1.3', 'It is no ordinary bird — huge, and gripping a live snake in its beak.'],
        ['1.4', 'That crag is where her own nest sits, and before long she is off again, gone from view.'],
      ],
      cast: {
        youth: ['crag', 'looks up and sees the great bird settle, then fly off again'],
        eagle: ['crag', 'drops the snake into the nest and wheels away'],
        serpent: ['crag', 'lies stunned in the nest, not truly dead'],
      },
    },
    {
      id: 'climb', title: 'The snake wakes',
      note: 'The hunter climbs up to look and finds the eaglet toying with the snake as though it were dead — until the snake revives, fangs bared, and lunges. He drops it with a single arrow.',
      lines: [
        ['1.5', 'The hunter climbs up to look, and finds a lone eaglet in the nest, batting at the limp snake as if it were a toy.'],
        ['1.6', 'But the snake has only been stunned, not killed.'],
        ['1.7', 'Then, out of nowhere, the snake is alive after all — fangs bared, body coiled, venom aimed straight at the eaglet.'],
        ['1.8', 'The hunter snatches out his bow, looses an arrow, and drops the snake dead on the spot.'],
      ],
      cast: {
        youth: ['nest', 'climbs to the nest, then draws his bow the instant the snake rears'],
        eaglet: ['nest', 'plays with the fallen snake, then cowers as it rears to strike'],
        serpent: ['nest', '☠ shot dead the instant it rears to strike the eaglet'],
      },
      items: { bow: ['youth', 'drawn and loosed in the same breath the snake wakes'] },
      exit: ['serpent'],
    },
    {
      id: 'bargain', title: "The eagle's bargain",
      note: 'He carries the eaglet off toward home until the great eagle catches up and confronts him over it; he tells her plainly that he is the one who killed the snake she left alive. She strikes a bargain instead of a fight: hand the eaglet back, and she will sharpen his eyes to match her own and lend him the power behind her wingbeat, along with her very name. He agrees, and for the rest of his life she circles above him through hunt and battle alike.',
      lines: [
        ['1.9', 'He scoops up the eaglet and sets off for home with it under his arm.'],
        ['1.10', 'Before he is far along, a great beating of wings sounds close above his head.'],
        ['2.1', "'Why have you carried off my little one?' the eagle cries down at him."],
        ['3.1', "'He is mine now — I am the one who killed the snake you left alive,' the hunter answers back."],
        ['4.1', "'Give her back, and you'll have earned yourself a debt from me: sharp eyes like mine, wings as strong as mine, both yours from this day on.'"],
        ['4.2', "'No one will ever defeat you, and my own name will be given to you.'"],
        ['5.1', "He weighs the bargain a moment, then loosens his grip and lets the eaglet go free into its mother's talons."],
        ['5.2', "As the years pass under her wing, he never again knows defeat — his arrows drop the forest's wild game, and his sword clears away the raiders and enemies threatening his people."],
        ['5.3', 'Not once in all those years does she lose sight of him, always somewhere overhead, steering him clear of danger.'],
      ],
      cast: {
        youth: ['bargain', 'carries the eaglet off, then hands it back and lives out his life under the eagle\'s wing'],
        eagle: ['bargain', 'overtakes him, strikes her bargain, and never after leaves his side'],
        eaglet: ['bargain', 'carried off, then handed straight back to its mother'],
      },
      items: { gift: ['youth', 'given on the spot: the eagle\'s eyes and wings, made his own'] },
    },
    {
      id: 'crowned', title: 'Named for the eagle',
      note: 'His deeds leave the whole country in awe: they lift him up as their king and give him the eagle\'s own name, Shqipëtar, Son of the Eagle, then take Shqipëria, Land of the Eagles, as the name for their whole country too.',
      lines: [
        ['6.1', 'His deeds leave the whole nation awed, and it is they who lift him up as king and give him a new name — Shqipëtar, Son of the Eagle, since shqipe or shqiponjë is the Albanian word for that bird — so that his realm itself becomes known as Shqipëria, the Land of the Eagles.'],
        ['6.2', "(The eagle's two heads, in the emblem that follows this telling, are read as standing for the land's north and south.)"],
      ],
      cast: {
        youth: ['kingdom', 'crowned king by the people, and takes the eagle\'s own name: Shqipëtar'],
        eagle: ['kingdom', 'still wheels above the man she once forgave — and now above a king'],
        people: ['kingdom', 'awed by his feats, raise him up as king and take the eagle\'s name for themselves'],
      },
    },
  ],
}
