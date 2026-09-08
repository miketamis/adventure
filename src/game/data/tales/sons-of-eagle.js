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
// below) — it is a short, modern etymology legend attested in English through
// a USC Digital Folklore Archive family performance, not a text that turned up in any of the 19th–20th-century
// Albanian folklore collections on hand. None has been invented.
// ===========================================================================

export default {
  id: 'sons-of-eagle',
  title: 'Sons of the Eagle — why Albanians are Shqiptarë',
  source:
    'D. S., “The Tale of the Eagle,” a family oral performance recorded by Shane Suxho, USC Digital Folklore Archive (17 May 2022) — the Albanian informant learned it from his grandmother before emigrating; read directly at folklore.usc.edu/the-tale-of-the-eagle; all lines paraphrased',
  references: [
    {
      role: 'selected-witness',
      citation: 'D. S., “The Tale of the Eagle,” collected by Shane Suxho, USC Digital Folklore Archive (17 May 2022)',
      url: 'http://folklore.usc.edu/the-tale-of-the-eagle/',
      note: 'The exact English-language family performance selected for the beat record.',
    },
    {
      role: 'source-text',
      citation: 'USC Digital Folklore Archive, Shane Suxho collector archive',
      url: 'http://folklore.usc.edu/author/ssuxho/',
      note: 'Collector-index preservation route reproducing the complete selected entry; it is a mirror within the same archive, not independent attestation.',
    },
    {
      role: 'scholarship',
      citation: 'Bardhyl Demiraj, “Shqiptar – The Generalization of this Ethnic Name in the 18th Century,” Ludwig Maximilian University of Munich',
      url: 'https://www.albanologie.uni-muenchen.de/downloads/publikationen-demiraj/berarbeitet_shqiptar-the-gene.pdf',
      note: 'Historical-linguistic corrective: the eagle-derived name belongs to folk etymology and should not be presented as settled word history.',
    },
  ],
  // where the tale comes from — anchors should prefer this region's mirrors
  origin: {
    region:
      'no region is named in the telling at all — this is a pan-Albanian national origin/etymology legend, not a Tosk- or Gheg-localised folktale. The game\'s existing crag vignette places it in the northern highlands near the Buna/Rozafa crossing (see places below); a placeless national legend does not contradict that siting',
    collector:
      'Shane Suxho recording informant “D. S.,” an Albanian immigrant retelling the story he learned from his own grandmother',
    published: 'USC Digital Folklore Archive, 17 May 2022',
  },
  // the ALBANIAN ORIGINAL — genuinely not found; see the search recorded here
  albanian: {
    status: 'missing',
    why:
      'The selected witness is the 2022 USC Digital Folklore Archive family performance in English. No Albanian transcript of that performance exists. Searches of the 1954 Tirana corpus, Dozon, Hahn, Jarník, Meyer, Lambertz, Fishta and the Internet Archive found no older Albanian text of the same hunter–snake–eaglet naming plot. Meyer\'s Qerozi has the related grateful-eagle motif but no naming or kingship outcome, so it is not spliced into this legend. The absence of Albanian wording is disclosed; no line is back-translated or invented.',
  },
  // Wikipedia adds several flourishes absent from the recorded family
  // performance. They are documented here and deliberately excluded from the
  // faithful timeline below.
  discrepancies: [
    'THE REWARD\'S WORDING: a later encyclopedia retelling intensifies the family performance\'s promise that the hunter will be called the strongest into an assertion that he becomes invincible. The beats keep the informant\'s milder wording.',
    'WHICH EAGLE STAYS: the family performance says the rescued eaglet remains attached to the hunter and follows him once both are older. Earlier game text made the mother eagle his lifelong guardian. The beats and playable ending now follow the informant: the mother grants the gift, and the grown rescued bird becomes his companion.',
    'NO TWO-HEADED CODA: the north-and-south interpretation of the emblem appears only in the later encyclopedia expansion, not in the recorded family performance. It is excluded rather than presented as part of this tale.',
    'THE CROWNING: the recorded performance simply says the hunter became king and came to be called Albanian. It does not stage a crowd choosing or bestowing either title. The timeline keeps that concise outcome and does not invent a coronation scene.',
    'THE SPOKEN BARGAIN, COMPRESSED IN-GAME: the fuller English telling gives the eagle\'s challenge and the hunter\'s answer as direct speech (¶2-4: "why do you kidnap my child?" / "the child is mine because I saved it…" / "give me back my child, and I will give you…"). The game\'s own staged text (content.js shqipe3) compresses all of this into two silent lines — "the eagle returns," "the eagle gives you eyes and strength" — for pacing. The beats below restore the full spoken exchange from the source telling; nothing here contradicts what is staged, it only unpacks it.',
  ],
  // Twelve sentences in the informant's single spoken narrative paragraph;
  // interviewer prompts and the student's interpretation are not tale text.
  paragraphs: [12],
  cast: [
    { id: 'youth', name: 'the hunter', note: 'unnamed until the very end, when the people crown and name him Shqipëtar', npc: 'shqipetariPare' },
    { id: 'eagle', name: 'the great eagle', note: 'mother of the eaglet; repays a life saved with eyes, wings and her own name', npc: 'shqiponjaShkembit' },
    { id: 'eaglet', name: 'the eaglet', note: 'the rescued nestling who remains attached to the hunter and later follows him as a grown eagle', npc: 'shqiponjaVogel' },
    { id: 'serpent', name: 'the serpent', note: 'carried into the nest for dead; wakes to strike; dies to the hunter\'s arrow', npc: 'gjarpriShkembit' },
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
    { id: 'kingdom', emoji: '👑', name: 'the eagle-named kingdom', note: 'offstage in time as much as in space — years later, the land he rules',
      anchor: { status: 'existing', node: 'shqipeFund', mirror: 'the ending tableau the game plays out at the same spot — a compressed epilogue, not a separately drawn city',
        mold: 'the reign is narrated, not staged as its own city: whichever kingdom the founder later rules stays offstage, and the ending screen simply states the outcome' } },
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
      shqipe2: ['crag', 'climb'],
      shqipeBarter: 'bargain',
      shqipeFund: 'crowned',
    },
    divergences: [
      { beat: 'crag', note: 'The climb and discovery share the shqipe2 scene with the snake rescue; one playable node covers both consecutive source beats.' },
      { beat: 'bargain', note: 'The legend\'s hunter always gives the eaglet back — that honour IS the point. The game makes it a real choice and adds the branch he never takes (keep the eaglet → the secret ending "A Hunter, No More"): you can forfeit the eagle\'s bargain, and with it the name that would have made your people the Sons of the Eagle.' },
      { beat: 'crowned', note: 'You embody “the hunter”; earning the eagle\'s name is the identity you become. His later reign and the naming of the land are compressed into the closing tableau rather than played out as a separate city or reign.' },
      { note: 'The tale names no region — it is a pan-Albanian national origin/etymology legend. The game sites it on the northern road home toward the Buna/Rozafa crossing (a placeless legend does not contradict the siting), and frames it as the drought-hero\'s epilogue: decline the eagle and you simply go home victorious from the drought.' },
      { beat: 'crowned', note: 'The eagle\'s “gift” is eyesight and wing-strength — a blessing, never a carried item. The two-headed-emblem gloss from the later encyclopedia expansion is not part of this projection.' },
    ],
  },
  beats: [
    {
      id: 'hunt', title: 'A hunter on the mountain road',
      note: 'A boy hunting in the mountains sees a huge eagle carry what looks like a dead snake to her nest on a cliff.',
      lines: [
        ['1.1', 'A boy is hunting in the mountains when he sees a huge eagle fly to a cliffside nest with what appears to be a dead snake in her beak.'],
      ],
      cast: {
        youth: ['crag', 'hunts in the mountains below the cliff, bow in hand'],
        eagle: ['crag', 'lands at her cliffside nest with the snake'],
        eaglet: ['crag', 'waits in the nest'],
        serpent: ['crag', 'lies in the nest, mistaken for dead'],
      },
      items: { bow: ['youth', 'slung ready at his shoulder'] },
    },
    {
      id: 'crag', title: 'A great bird on the crag',
      note: 'Once the mother flies away, the hunter climbs to the nest and finds her chick beside the motionless snake.',
      lines: [
        ['1.2', 'After the mother eagle leaves, the boy climbs to the nest and finds her chick there with the apparently dead snake.'],
      ],
      cast: {
        youth: ['nest', 'climbs the cliff and reaches the nest'],
        eagle: ['road', 'flies out of sight'],
        eaglet: ['nest', 'stays beside the snake'],
      },
    },
    {
      id: 'climb', title: 'The snake wakes',
      note: 'The snake is alive. The hunter draws at once, kills it, and saves the chick.',
      lines: [
        ['1.3', 'The snake is not dead, so the hunter draws his bow, kills it, and saves the young eagle.'],
      ],
      cast: {
        youth: ['nest', 'draws and kills the living snake'],
        eaglet: ['nest', 'saved by the hunter'],
        serpent: ['nest', '☠ killed by the hunter\'s arrow'],
      },
      items: { bow: ['youth', 'drawn and loosed against the snake'] },
      exit: ['serpent'],
    },
    {
      id: 'bargain', title: "The eagle's bargain",
      note: 'The hunter carries the chick toward home. Its mother catches him, hears why he claims it, and offers her sight, wing-strength, and name in exchange. He returns the chick, which remains attached to him for saving its life.',
      lines: [
        ['1.4', 'He takes the young eagle and starts home, until the beat of the mother\'s great wings overtakes him.'],
        ['1.5', 'The mother eagle demands to know why he took her child.'],
        ['1.6', 'He answers that the chick belongs with him because he saved it from the snake she had failed to kill.'],
        ['1.7', 'She offers a bargain: return her child, and she will give him eyes as keen as hers and the strength carried in her wings.'],
        ['1.8', 'She promises that he will be called the strongest and will bear her name.'],
        ['1.9', 'The boy returns the chick to its mother, but the young eagle remains bound to him by the life he saved.'],
      ],
      cast: {
        youth: ['bargain', 'carries the chick off, accepts the bargain, and returns it'],
        eagle: ['bargain', 'overtakes him and grants the gift in exchange for her child'],
        eaglet: ['bargain', 'returned to its mother but attached to the hunter who saved it'],
      },
      items: { gift: ['youth', 'given on the spot: the eagle\'s eyes and wings, made his own'] },
    },
    {
      id: 'crowned', title: 'Named for the eagle',
      note: 'When hunter and rescued eagle are grown, the bird follows him through hunt and battle. Strengthened by the gift, he becomes king; he and the land take the eagle-name.',
      lines: [
        ['1.10', 'After both have grown, the rescued eagle follows the hunter, now a man.'],
        ['1.11', 'Made exceptionally strong by the mother\'s gift, he brings down beasts with his bow and enemies of the land with his sword while the grown eagle flies above him.'],
        ['1.12', 'He becomes king and is called Albanian, understood in the telling as Son of the Eagle, while his country becomes Albania, the Land of Eagles.'],
      ],
      cast: {
        youth: ['kingdom', 'becomes king and bears the eagle-name'],
        eaglet: ['kingdom', 'grown now, follows the man who saved it and flies above his deeds'],
      },
    },
  ],
}
