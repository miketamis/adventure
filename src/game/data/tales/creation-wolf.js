// ===========================================================================
// TALE: Why the Wolf Devours (von Hahn 105) — see ../tales/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it.
// ===========================================================================

export default {
  id: 'creation-wolf',
  title: 'Why the Wolf Devours',
  source:
    'J. G. von Hahn, Albanesische Studien (Jena 1854) / Griechische und albanesische Märchen No. 105 (1864) · read in the German original — no English translation exists; all lines paraphrased from the German',
  // von Hahn's myth-notes come from his central-Albanian consular travels; the
  // neighbouring notes in the same 1854 section are tagged (Elbassan)
  origin: {
    region: 'Central Albania (von Hahn\'s myth-notes; the neighbouring notes in the same section are tagged Elbasan)',
    collector: 'Johann Georg von Hahn, Austrian consul — the founder of Albanology',
    published: 'Albanesische Studien, Jena 1854; repr. as Märchen No. 105, Leipzig 1864',
  },
  // NO ALBANIAN NARRATIVE ORIGINAL EXISTS — von Hahn recorded the myth in
  // German only. The one verbatim Albanian sentence the sources preserve is
  // the curse itself, kept as line 1.1's third element.
  albanian: {
    status: 'missing',
    why: 'von Hahn recorded this myth in German only — no Albanian narrative text was ever published. Checked: his own Albanesische Studien 1854 prints it in German with just the curse in Albanian; Lambertz 1922 pp. 89–90 only summarizes Hahn in German; nothing in the 1954 Tirana corpus, Dozon, Jarník or Meyer; archive.org full-text (2026-07-14) finds no «krijimi i ujkut» / «haje ujk» / «ha krijuesin» text. The ONE verbatim Albanian sentence preserved is the curse — «Haje, ujk, e plase, Shën Mëhill!» (Hahn 1854/1864 "Haj e, uk, e pljass e, sche Mehil!"; Lambertz 1922 "Haje uk e plase Shemhil!"; transliterated to modern orthography) — kept as line 1.1\'s third element. Raw extracts + provenance: docs/references/hahn-erschaffung-des-wolfes.de-sq.txt',
    local: 'docs/references/hahn-erschaffung-des-wolfes.de-sq.txt',
  },
  // variant differences (no Albanian text to disagree with, so these record
  // where the tellings diverge and which reading the beats follow)
  discrepancies: [
    'DOUGH, NOT CLAY (¶2.3): von Hahn is explicit — the Devil «machte sich einen Teig an … knetete daraus eine Wolfsgestalt», a DOUGH mixed as he had watched God work; the game\'s own staging (ujkuLind1: «djalli bën një ujk nga baltë») and the lore card say clay. The beats follow von Hahn: dough.',
    'NO BEGGING (¶4.1-2): the lore card (and the widespread Balkan variant) has the Devil beg God to animate the wolf, and God breathe it alive; in von Hahn the Devil never asks — God, «dieses vergeblichen Beginnens überdrüssig», strikes the figure with a switch unprompted and speaks the word. The switch-blow carries von Hahn\'s own etiology: it is why the wolf is «in der Mitte wie eingeknickt», kinked in the middle. The beats follow von Hahn.',
    'THE CURSE (¶1.1): von Hahn\'s curse is «Haje, ujk, e plase, Shën Mëhill!»; the wolf lore card\'s "worst curse" is «Të hângtë ujku!» — related but distinct formulas. Line 1.1 keeps von Hahn\'s, transliterated from his transcription ("Haj e, uk, e pljass e, sche Mehil"; Lambertz 1922 "Haje uk e plase Shemhil").',
    'PRINTINGS (¶5.1): the 1854 Studien aims the curse only at the Devil; the Märchen printing (1864/1918) adds «oder einem andern, den er ebenso lieb hat» — "or anyone else he loves just as much." The beats follow the fuller Märchen text.',
  ],
  // sentence counts of the original's 5 paragraphs (von Hahn 1918 = 1864 text)
  paragraphs: [2, 3, 3, 3, 2],
  cast: [
    { id: 'rrefimtari', name: 'the teller', note: 'the oda\'s evening host, repeating the oldest curse in the language', npc: 'plakuSheshit' },
    { id: 'zoti', name: 'our Lord', note: 'Zoti — shapes the first pair, humours the Devil, and speaks the word that makes the wolf live', npc: 'zoti' },
    { id: 'djalli', name: 'the Devil', note: 'watched the making of man, boasted he could better it, kneaded a wolf of dough — and was its first meal', npc: 'djalli' },
    { id: 'ujku', name: 'the wolf', note: 'the Devil\'s dough, alive at God\'s word, kinked in the middle from the switch — devours ever since', npc: 'ujkuPare' },
    { id: 'ciftiPare', name: 'the first man and woman', note: 'God\'s fresh handiwork — the "cheap trick" the Devil sneered at', npc: 'ciftiPare' },
    { id: 'shenMehilli', name: 'Saint Michael', note: 'named in the curse; the tale itself admits nobody could say why', npc: 'shenMehilli' },
  ],
  // anchor = the game location this tale place inhabits (see _SCHEMA.md).
  // The game ALREADY stages this myth: the deep-forest wolf arc tells it in
  // its own voice (pylliThelle → shokuUjk → ujkuLind1 → the ujkuFund secret
  // ending, whose ENDING_LORE maps to this very tale) — so the myth's stage
  // anchors to its telling, and no other story can clash there.
  places: [
    { id: 'oda', emoji: '🔥', name: 'the oda fire', note: 'the guest-room where the curse is repeated and the myth told — the tale\'s frame',
      anchor: { status: 'existing', node: 'oda1', mirror: 'the evening oda of a central-Albanian village — von Hahn gathered his myth-notes at such firesides',
        mold: 'the oda hosts the evening\'s tellings — tales accumulate by this fire like guests, they never clash; plaku i sheshit hosts',
        sharedWith: ['mikpritja-oda', 'the lahutë evenings'] } },
    { id: 'fillimi', emoji: '🌅', name: 'the world\'s first morning', note: 'the ground where God shaped the first pair and the Devil kneaded his answer',
      anchor: { status: 'existing', node: 'ujkuLind1', mirror: 'nowhere on any map — the dawn of the world; the game reaches it through the wolf\'s own telling in the deep forest',
        mold: 'the creation ground exists only inside tellings of THIS myth — the node IS the game\'s staging of it (the befriended wolf recounting its own making), so co-location is self-sharing',
        sharedWith: ['the ujkuFund secret ending (ENDING_LORE → creation-wolf)'] } },
    { id: 'pylli', emoji: '🌲', name: 'the wolf\'s forest', note: 'where the wolf has hunted since the first morning — "that is why the wolf devours"',
      anchor: { status: 'existing', node: 'pylliThelle', mirror: 'the deep beech forest above the village — central Albania, the tale\'s own region',
        mold: 'the deep forest hosts A hungry wolf; the myth explains the appetite of every wolf without naming this one — so the fed wolf may still prove a drangue in wolf\'s hide (the ujkuUje ending) without clashing',
        sharedWith: ['the wolf-encounter arc (shokuUjk / eaten / ujkuUje)'] } },
    { id: 'qielli', emoji: '☁️', name: 'heaven', note: 'where the Lord withdraws, and Saint Michael keeps his unexplained watch',
      anchor: { status: 'offstage', mirror: 'the sky sworn by in oaths, above the cloud-plateau',
        mold: 'never staged — the tale names Michael only inside the curse and says itself that nobody knows why; if heaven is ever drawn, the sky above the Sun\'s plateau is the nearest ceiling',
        conflicts: 'NOT diellShtepi1 — the Sun\'s compound belongs to Dielli (his tree, his stag-road, his promised maiden), and this tale\'s Lord is not the Sun; staging God there would fuse two theologies' } },
  ],
  items: [
    { id: 'brumi', emoji: '🥣', name: 'the Devil\'s dough', note: 'mixed and kneaded as God\'s work was watched — a wolf-shape its maker calls more perfect than man' },
    { id: 'thupra', emoji: '🌿', name: 'the Lord\'s switch', note: 'one blow to the side — the reason every wolf since is kinked in the middle' },
  ],
  // how the game stages this tale — the WITNESS projection (see _SCHEMA.md). A
  // cosmogony no traveller-soul can step into (you are neither the Lord nor the
  // Devil), so it is TOLD, not embodied: the village storyteller (plakuSheshit)
  // recounts it at the hearth and you listen, and the verbatim Gheg curse it
  // explains — «Të hângtë ujku!» — is slotted word-for-word at the ending.
  play: {
    entry: 'sfida',
    stance: 'witness',
    role:
      'You sit at the hearth as the old man tells the origin of the oldest curse: how the Devil, boasting he could create as well as God, kneaded a wolf that would not live — until the Lord gave it breath with the words that doomed its own maker, "devour your creator."',
    from: 'ujkuLind1',
    ending: 'ujkuFund',
    scenes: {
      ujkuLind1: 'sfida',
      ujkuFund: 'thupra',
    },
    divergences: [
      { note: 'This is the game\'s WITNESS stance — a cosmogony about the Lord and the Devil that the traveller-soul cannot embody, so the village storyteller recounts it and you listen (the third stance beside embodied and companion). No become, no mold-lock: hearing a myth leaves you free.' },
      { beat: 'sfida', note: 'The five original beats (the curse-frame, the Devil\'s boast, the breath that would not take, the Lord\'s verdict, and the moral of why Albanians repeat the curse) are compressed into the two staged nodes — the Devil\'s hubris and clay wolf, then the fatal words and the wolf turning on its maker.' },
      { beat: 'thupra', note: 'The verbatim Gheg curse the fable exists to explain — «Të hângtë ujku!», "may the wolf eat you" — is kept word-for-word as a Q() quote at the ending. The buckled-wolf etiology (the Lord\'s switch) and Archangel Michael\'s unexplained role stay in the tale record, unstaged.' },
    ],
  },
  beats: [
    {
      id: 'mallkimi', title: 'The oldest curse',
      note: 'By the oda fire the teller repeats the curse — eat him, wolf, and burst him, Saint Michael! — and names its target: the Devil. Then the telling rewinds to the world\'s first morning to explain it.',
      lines: [
        ['1.1', '"Eat him, wolf, and make him burst, Saint Michael!" — so runs the curse.', "«Haje, ujk, e plase, Shën Mëhill!»"],
        ['1.2', 'It is meant for the Devil, and this is the story behind it.'],
      ],
      cast: {
        rrefimtari: ['oda', 'repeats the curse by the fire and begins the how of it'],
        zoti: ['fillimi', 'at the world\'s first morning, shaping the first man and woman'],
        djalli: ['fillimi', 'hangs at the Lord\'s elbow, unimpressed'],
        ciftiPare: ['fillimi', 'taking shape under the Lord\'s hands'],
        ujku: ['fillimi', 'not yet — only flour and water waiting to become a boast'],
        shenMehilli: ['qielli', 'keeps heaven; why the curse calls his name, no one has ever known'],
      },
    },
    {
      id: 'sfida', title: 'The Devil bids to be a maker',
      note: 'The Devil watches the first pair being made and calls it no great feat — he could create too. The Lord, in a good humour, lets him try; the Devil mixes a dough the way he saw it done and kneads a wolf, boasting it the more perfect creature.',
      lines: [
        ['2.1', 'When our Lord made the first human pair, the Devil stood by and sniffed that the trick was nothing much — he could create just as well himself.'],
        ['2.2', 'The Lord happened to be in a good humour, so he gave him leave to try his art.'],
        ['2.3', 'The Devil mixed himself a dough the way he had watched our Lord do it, kneaded a wolf-shape out of it, and declared such a creature far more perfect than the Lord\'s handiwork.'],
      ],
      cast: {
        djalli: ['fillimi', 'kneads his dough into a wolf and boasts it better than man'],
        zoti: ['fillimi', 'in good humour, watches the rival maker at work'],
        ciftiPare: ['fillimi', 'stand new-made while their maker is mocked'],
        ujku: ['fillimi', 'a kneaded shape of dough now — flanks, jaws, no life'],
      },
      items: { brumi: ['fillimi', 'mixed and kneaded into a wolf-shape'] },
    },
    {
      id: 'fryma', title: 'A breath that would not take',
      note: 'Give your creature life, says the Lord, as I gave mine. The Devil blows into the dough-wolf until his breath fails and his black head goes red and blue with the strain — for nothing.',
      lines: [
        ['3.1', '"But you must also give your creature life," said the Lord, "as I did with mine."'],
        ['3.2', 'So the Devil set to and blew into his creature until his breath gave out and his black head turned red and blue with the strain.'],
        ['3.3', 'It was all for nothing.'],
      ],
      cast: {
        djalli: ['fillimi', 'blows himself red and blue into the lifeless dough-wolf'],
        zoti: ['fillimi', 'watches the vain puffing run its course'],
      },
    },
    {
      id: 'thupra', title: 'Devour your creator',
      note: 'The Lord tires of the spectacle. One switch-blow to the figure\'s side — the kink every wolf carries to this day — and one word: creature, devour your creator. The wolf lives, and its first meal is its maker.',
      lines: [
        ['4.1', 'At last the Lord grew weary of the futile business.'],
        ['4.2', 'He struck the wolf-figure in the side with a switch — which is why the wolf looks buckled in the middle — and said: "Creature, devour your creator."'],
        ['4.3', 'And the wolf lived, and the first one it swallowed was the one who had shaped it.'],
      ],
      cast: {
        zoti: ['fillimi', 'deals the switch-blow and speaks the word'],
        ujku: ['fillimi', 'alive at the word — turns jaws-first on its maker'],
        djalli: ['fillimi', '☠ the wolf\'s first meal — devoured by his own creature'],
      },
      items: {
        thupra: ['zoti', 'one blow dealt — the kink in every wolf since'],
        brumi: ['fillimi', 'dough no longer — become the living wolf'],
      },
      exit: ['djalli'],
    },
    {
      id: 'fjala', title: 'The Lord\'s words, kept',
      note: 'Back at the fire: that is why an Albanian repeats the Lord\'s words to curse the Devil — or anyone he loves just as much. And what Archangel Michael has to do with it, nobody could tell the collector.',
      lines: [
        ['5.1', 'And that is why an Albanian repeats the Lord\'s words whenever he wishes evil on the Devil — or on anyone else he loves just as much.'],
        ['5.2', 'But what part Archangel Michael plays in the matter, nobody could tell us.'],
      ],
      cast: {
        rrefimtari: ['oda', 'ends the telling with the collector\'s own shrug about Michael'],
        ujku: ['pylli', 'gone to the woods with its appetite — devouring ever since'],
        zoti: ['qielli', 'withdrawn to heaven, his word abroad in every mouth'],
        ciftiPare: ['fillimi', 'set walking into the new world — every teller at every fire is their child'],
        shenMehilli: ['qielli', 'still in the curse, still unexplained'],
      },
    },
  ],
}
