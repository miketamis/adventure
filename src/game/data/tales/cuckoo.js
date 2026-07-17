// ===========================================================================
// TALE: The Origin of the Cuckoo — Gjon and the Cuckoo (von Hahn 104) — see
// ../tales/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
// ===========================================================================

export default {
  id: 'cuckoo',
  title: 'The Origin of the Cuckoo — Gjon and the Cuckoo',
  source:
    'J. G. von Hahn, Albanesische Studien (Jena 1854) / Griechische und albanesische Märchen No. 104 (1864) · read in the German original — no English translation exists; all lines paraphrased from the German',
  // von Hahn's own note to No. 104 names both tellings' homes: "Aus Ljabowo
  // in der Rica und Elbassan" — the scissors detail is the Rica's, the
  // murder-and-flower telling Elbasan's (Studien I, p. 165)
  origin: {
    region: 'Elbasan (Central Albania) and Labovë in the Rica (the south) — a central telling and a southern one agreeing',
    collector: 'Johann Georg von Hahn, Austrian consul — the founder of Albanology',
    published: 'Albanesische Studien, Jena 1854; repr. as Märchen No. 104, Leipzig 1864',
  },
  // NO ALBANIAN NARRATIVE ORIGINAL EXISTS — von Hahn recorded the tale in
  // German only. The verbatim Albanian the sources preserve: the two
  // bird-cries and the cuckoo-flower song, kept on lines 1.4 and 3.1-3.5.
  albanian: {
    status: 'missing',
    why: 'von Hahn recorded the tale in German only — no Albanian narrative text was ever published. The verbatim Albanian that DOES survive inside it is kept: the two bird-cries printed in the German text («Gjon! Gjon!» / «Ku? Ku?», line 1.4) and the five units of the cuckoo-flower song, which the 1854 Studien prints in von Hahn\'s Greek-alphabet Albanian — transliterated to modern orthography (token-by-token workings + raw OCR of two scans in the local file) for lines 3.1-3.5. Searched for a narrative text: the 1954 Tirana corpus has no Gjon/qyqe tale («qyqja» only as grief-interjection), Dozon/Jarník/Meyer nothing, Lambertz 1922 only CITES his own «Gjon- und Kjükjatexte» (the one known Albanian printing, the saga «Gjokthi und Qyqja» in the 1914 Shkodra Jesuit calendar, is not digitised anywhere findable), Fishta uses qyqja/qyqe only as the mourning idiom; archive.org (2026-07-14) «qyqja dhe gjoni» / «gjoni dhe qyqja» / «u be qyqe» / «motra u be qyqe» — zero hits.',
    local: 'docs/references/hahn-entstehung-des-kukuks.de-sq.txt',
  },
  // where the tellings diverge — which reading the beats follow, per case
  discrepancies: [
    'ONE BROTHER OR TWO (¶1.1): the lore card compresses the family to a single brother Gjon ("he becomes the little Gjon-bird"); von Hahn is explicit there were TWO brothers who both bore the name — the murdered one, and the survivor whom grief turned into the bird. The beats follow von Hahn; the card\'s poignancy survives intact, since the name the bird cries for his brother is also his own.',
    'MURDER vs ACCIDENT (¶1.2-3): the 1854 Studien (Elbasan) knows only that the second Gjon "was murdered — the closer circumstances were not to be learned here"; the scissors-slip is the Rica telling, which the 1864 Märchen adopts as the story. The beats follow the Märchen: an accident of absorbed hands, no murderer.',
    'THE SONG\'S DARKER DEATH (¶3.4-5): the song asks the flower whether she saw her brother «kë e therin posi ka» — slaughtered like an ox, blood in the spoon, flesh in the cup — a butchering, not a scissors-slip; the verse plainly remembers Elbasan\'s murder variant. Kept verbatim: the beats let the song contradict its frame exactly as the original does.',
    'BIRD OR FLOWER (¶2.1): Elbasan also tells that the sister became not the cuckoo but the blue cuckoo-flower — lul\' e qyqes (Tosk: buk\' e qyqe, "cuckoo\'s bread"). The tale itself keeps both endings side by side and so do the beats: bird in beat 3, flower in beats 4-6.',
  ],
  // sentence counts of the original's 4 paragraphs (von Hahn 1918 = 1864
  // text; ¶3 is the song — its 8 verse lines group into 5 sentence units)
  paragraphs: [4, 2, 5, 1],
  cast: [
    { id: 'qyqja', name: 'Qyqja', note: 'the sister — her scissors slip; grief makes her the cuckoo who asks «Ku? Ku?» by day (or, in the second telling, the blue cuckoo-flower)', npc: 'qyqjaMotra' },
    { id: 'gjoni', name: 'Gjoni', note: 'the surviving brother — grief makes him the gjon-bird who cries the shared name «Gjon! Gjon!» by night', npc: 'gjonZogu' },
    { id: 'gjoniVrare', name: 'Gjoni tjetër', note: 'the other brother, who bore the same name — the flying scissors find his heart', npc: 'gjoniVrare' },
    { id: 'grate', name: 'the village women', note: 'they find the blue flower in the open grass, sing it the old charm, and offer their hands', npc: 'grateLendines' },
  ],
  // anchor = the game location this tale place inhabits (see _SCHEMA.md).
  // The game ALREADY stages this tale: the back lane's own telling
  // (cuckoo1 → cuckooFund, aliased onto the gjizar2 spot, reached by the
  // «dëgjo Gjon» option) — so the house anchors to its telling. The tale is
  // central-Albanian (Elbasan), the same country as the game's village.
  places: [
    { id: 'shtepia', emoji: '🪡', name: 'the sewing house', note: 'the siblings\' house where the sister sat at her needlework',
      anchor: { status: 'existing', node: 'cuckoo1', mirror: 'a needlework house on a back lane of old Tirana\'s mëhalla — the game\'s village stands in the tale\'s own central Albania, a day\'s ride from Elbasan',
        mold: 'a modest house whose door opens on the back lane: a sister at her sewing, two brothers who share one name — the lane already tells this story (cuckoo1/cuckooFund alias here, and the lane scene itself says «një zog tjetër thotë: Gjon!»); bird-tellings accumulate on this lane without clashing (the swallow-and-serpent telling is its neighbour)',
        conflicts: 'NOT gjizar1 — the lane-FORK house belongs to the bee tale\'s dying mother and her three daughters; this is a different house one lane back: three siblings, nobody sick, and death arrives by accident, not age',
        sharedWith: ['the back-lane threads (the king\'s golden chick, the swallow and the serpent)'] } },
    { id: 'pylli', emoji: '🌲', name: 'the calling woods', note: 'where the two birds cry across the trees — she by day, he by night — and never meet',
      anchor: { status: 'existing', node: 'pylli1', mirror: 'the beech woods on the hills above the village — central Albania, the tale\'s own country',
        mold: 'the great wood hosts every voice and every wanderer: the bear-and-dervish pair and the three brothers keep its floor, the birds its canopy — a day-cry and a night-cry own no ground and clash with nothing; the game\'s own clock (ditë/natë) is what keeps the two calls apart',
        sharedWith: ['the bear-and-dervish thread', 'the forest arcs'] } },
    { id: 'fusha', emoji: '🌼', name: 'the flower meadow', note: 'the open grass where the women find the blue cuckoo-flower and sing',
      anchor: { status: 'existing', node: 'lendina', mirror: 'a lëndinë — the open meadow every village keeps at the wood\'s edge, where the spring flowers come up',
        mold: 'the quiet meadow (the scene\'s own line: «këtu është një vend i qetë») — open grass, flowers, resting travellers; the women\'s spring flower-rite needs only the undisturbed grass, and quiet places accumulate quiet rites',
        sharedWith: ['the forest-camp scenes (besaFire aliases here)'] } },
  ],
  items: [
    { id: 'gersherat', emoji: '✂️', name: 'the sister\'s scissors', note: 'working blades, opening and closing all day — one slip of them makes the whole tale' },
    { id: 'lulja', emoji: '🪻', name: 'lul\' e qyqes — the cuckoo-flower', note: 'the blue flower of the second telling; Tosk calls it buk\' e qyqe, cuckoo\'s bread' },
  ],
  // how the game stages this tale — the embodied projection (see _SCHEMA.md). You
  // become the sister; the accident of the scissors is yours, and the CHOICE of how
  // your grief transforms you — call for Gjon forever (the cuckoo) or lie down in
  // the field (the blue cuckoo-flower) — is the tale's own two variants made a fork.
  // become:'cuckoo' rides the entry (the gjizar bird-hub "degjo gjon" → cuckoo1).
  play: {
    entry: 'gjinia',
    stance: 'embodied',
    as: 'qyqja',
    role:
      'You are the sister — the Kjükje. By a terrible slip of your scissors your brother Gjon lies dead, and the shape your grief takes is yours: the cuckoo who calls "Ku? Ku?" — "where? where?" — down all the years, or the blue cuckoo-flower that lays its little head in the women\'s open hands.',
    enter:
      'you are the sister at her sewing, and your brother Gjon is about to step too close to the working scissors',
    from: 'cuckoo1',
    ending: 'cuckooFund',
    scenes: {
      cuckoo1: 'gjinia',
      cuckooFund: 'zogjte',
      cuckooLule: 'lulja',
    },
    divergences: [
      { beat: 'zogjte', note: 'The tale tells two endings — grief makes the sister the cuckoo, "or else" the blue cuckoo-flower. The game makes that the player\'s fork: call for Gjon forever (become the cuckoo, with the Gjon-bird answering by night) or lie down in the field (become the flower). Both are secret transformation-endings; neither undoes the death.' },
      { beat: 'gjinia', note: 'The original has TWO brothers both named Gjon (the sister kills one; the survivor becomes the Gjon-bird). The game keeps one brother Gjon for clarity — the surviving Gjon-bird that answers "Gjon! Gjon!" by night is folded into the cuckoo ending.' },
      { beat: 'kenga', note: 'The women\'s song to the cuckoo-flower (five lines in Von Hahn\'s German) has no locatable Albanian original, so it is not slotted as a verbatim Q() quote — the women\'s singing and the flower bowing its head into their palms are narrated instead.' },
    ],
  },
  beats: [
    {
      id: 'gjinia', title: 'Two Gjons and one sister',
      note: 'One house, three siblings: the Kjükje at her needlework, and two brothers who both answer to the one name, Gjon. Out at the meadow the village women go about their work, no part in the tale yet.',
      lines: [
        ['1.1', 'Gjon and the Kjükje were brother and sister — and they had a second brother, who bore the very same name, Gjon.'],
      ],
      cast: {
        qyqja: ['shtepia', 'sits at her needlework, scissors going all day'],
        gjoni: ['shtepia', 'about the house he shares with a brother of his own name'],
        gjoniVrare: ['shtepia', 'the other Gjon — not yet at his sister\'s shoulder'],
        grate: ['fusha', 'about their field-work on the open grass — no part in the tale yet'],
      },
      items: { gersherat: ['qyqja', 'in her working hand, opening and closing'] },
    },
    {
      id: 'gersherat', title: 'The scissors fly out',
      note: 'He steps up to her shoulder while she works; she is sunk so deep in the sewing she never notices him. The blades fly out mid-stroke and take him straight in the heart — no anger anywhere in it, and a brother dead of it all the same.',
      lines: [
        ['1.2', 'One day that brother stepped up close to her while she was busy with her scissors — and she was so sunk in the work that she never noticed him.'],
        ['1.3', 'All at once she flung the scissors outward, and the blades caught this Gjon square in the heart, so that he died of it.'],
      ],
      cast: {
        gjoniVrare: ['shtepia', '☠ steps to her shoulder unseen — the flying blades find his heart'],
        qyqja: ['shtepia', 'looks up from the work too late; her own hand has done it'],
        gjoni: ['shtepia', 'comes running to a brother already past help'],
      },
      items: { gersherat: ['shtepia', 'dropped where the work fell — no hand takes them up again'] },
      exit: ['gjoniVrare'],
    },
    {
      id: 'zogjte', title: 'Grief makes two birds',
      note: 'The two left alive grieve past what a body can hold: he becomes the little bird that bears his own name, she the cuckoo. Ever since, the night belongs to his cry and the day to hers — the clock itself keeps brother and sister apart, and the two calls cross the same woods forever without meeting.',
      lines: [
        ['1.4', 'Brother and sister grieved over his death so hard that Gjon was changed into the bird that bears his name and the Kjükje into the cuckoo — and from then on the gjon calls his brother by name in the night, "Gjon! Gjon!", while the cuckoo asks the daylight "Ku? Ku?" — which is to say: where are you?', "«Gjon! Gjon!» «Ku? Ku?»"],
      ],
      cast: {
        gjoni: ['pylli', 'the gjon-bird now — cries the shared name into the dark, natë after natë'],
        qyqja: ['pylli', 'the cuckoo now — asks the daylight «Ku? Ku?», where, where, and flies before the answer comes'],
      },
    },
    {
      id: 'lulja', title: 'Or else a blue flower',
      note: 'Elbasan keeps a second ending beside the first: the sister became no cuckoo but the blue flower that carries the cuckoo\'s name. And the flower is not left alone — when the women find one in the open grass, there is a song that must be sung to it.',
      lines: [
        ['2.1', 'But it is also told that the sister was changed into no cuckoo at all, but into the blue flower that is called the cuckoo-flower.'],
        ['2.2', 'And when the women come upon such a flower out in the fields, this is what they sing to it:'],
      ],
      cast: {
        qyqja: ['fusha', 'in the second telling she is here instead: the blue cuckoo-flower among the meadow grass'],
        grate: ['fusha', 'come upon the flower in the open grass and kneel to sing'],
        gjoni: ['pylli', 'either telling leaves him the night-bird, still calling'],
      },
      items: { lulja: ['fusha', 'found in the open grass — the sister, wearing petals'] },
    },
    {
      id: 'kenga', title: 'The song to the cuckoo-flower',
      note: 'The charm calls her by her own name three times, then asks her the terrible questions — herself, and the brother butchered like an ox — and ends by asking for her hands. The verse remembers a bloodier death than the frame tells: blood in the spoon, flesh in the cup.',
      lines: [
        ['3.1', 'Cuckoo, cuckoo, cuckoo-beyond-all-cuckoos! — her own name, three times over.', "«Qyqe, qyqe, paraqyqe!»"],
        ['3.2', 'Did you see me?', "«Pe mu?»"],
        ['3.3', 'Did you see yourself?', "«Pe ty?»"],
        ['3.4', 'Did you see Gjon, your brother — him they slaughtered like an ox?', "«Pe Gjonin, tyt vëlla, kë e therin posi ka?»"],
        ['3.5', 'Blood in the spoon, flesh in the cup — give me those two hands of yours.', "«Gjak në lugë, mish në kupë — nemi dy ato duar.»"],
      ],
      cast: {
        grate: ['fusha', 'sing the whole charm over the flower, name to hands'],
        qyqja: ['fusha', 'the flower, sung to by her own name'],
      },
      items: { lulja: ['fusha', 'sung to — asked for her two hands'] },
    },
    {
      id: 'duart', title: 'The flower lays down its head',
      note: 'The singer holds both open palms out to the flower — and of itself it lays its little head down on them: a grieving sister still answering a kind touch. Meanwhile the woods keep the first ending going, night by night.',
      lines: [
        ['4.1', 'Then the woman holds her two flat palms up to the flower, and of its own accord it lays its little head down upon them.'],
      ],
      cast: {
        grate: ['fusha', 'hold out flat palms and take the little head\'s weight'],
        qyqja: ['fusha', 'answers the only way a flower can — laying her head in a human hand'],
        gjoni: ['pylli', 'still the night\'s: the shared name goes out over the trees, unanswered by day'],
      },
      items: { lulja: ['fusha', 'head laid of itself on the offered palms'] },
    },
  ],
}
