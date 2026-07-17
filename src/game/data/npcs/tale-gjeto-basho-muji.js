// NPCs new to "Muji i varruem" (Mujo Wounded, Palaj–Kurti no. 22 of the Kângë
// Kreshnikësh) — see ../npcs/_SCHEMA.md for the format contract. This file is
// owned by its tale: agents editing other tales must not touch it. Mujo
// himself is NOT duplicated here — he is the core NPC `mujo` in
// core-world.js, linked from the tale file's cast. Three figures this song
// already has good homes for are REUSED rather than duplicated: the courser
// `gjogu` and the "thirty Agas" collective `agetMujit` (both already defined
// in tale-muji-e-behuri.js) and `zuku` (Zuku Bajraktari, also defined there)
// — this song simply links to them via its own cast[].npc, exactly as this
// schema's registry is designed to allow (see ../npcs/_SCHEMA.md and
// scripts/beatscoverage.mjs's NPC_OF_CAST resolution). Only the three figures
// below are new: this song's own Arnaut Osmani (a different portrayal of
// that popular name than arnaut-osmani.js's or mujo-courser.js's own), the
// three zanas who answer Mujo's standing blood-oath THIS time, and the
// unnamed shepherd who breaks Mujo's own death to his face.
// ===========================================================================

export default {
  arnautOsmaniMejdanit: {
    name: 'Arnaut Osmani', glyph: '🩸', kind: 'human',
    role: 'the companion whose envy costs Mujo an omen ignored',
    backstory:
      "One of Mujo's own duelling companions at Jutbina — the one who laughs off the grieving courser's warning as an old man losing his nerve, needles Mujo into riding out anyway, and then, standing over him with nine bullets in his body, refuses his dying request outright and gloats that he'll take his arms, his courser, and his bride for his own. NOT the Arnaut Osmani who endures burning coals for a besa under a Krajl's dungeon (arnaut-osmani.js's own entry) and NOT the Jutbina neighbor who sells Mujo's courser to a foreign king for three hundred purses (mujo-courser.js's own entry) — the epic gives the same popular name to more than one man across its songs, exactly as it does with Zuku and with Halili elsewhere in this same registry. This is the duelling-day song alone (no. 22): Mujo himself cuts this one down the day he rides home alive after all.",
    folklore: ['gjeto-basho-muji', 'kreshnik-epic'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'gjeto-basho-muji': 'osmani' },
  },
  zanatShpetimit: {
    name: 'zanat e shpëtimit', glyph: '✨', kind: 'mythic',
    role: "three zanas who answer the grieving courser's cry",
    backstory:
      "Three zanas of the night who hear Mujo's own courser wailing itself hoarse over its fallen rider and take flight at once — binding his nine wounds one by one, breathing his own life back into his body, and setting him on the very horse that mourned him. NOT `zanatShkembit` (mujo-strength's cradle-mother PAIR, met once at the cliff, who first nursed Mujo his strength and bound him their probatin) and NOT `zanatBesatare` or the `kreshnik-epic` tale's own `zanat` (each an independent song's own telling of the zanas keeping that same old oath) — the kreshnik songs replay Mujo's standing blood-bond with the zanas story by story, as this whole registry already does more than once; this is the wounding-song's own payment of that debt, nothing more claimed and nothing contradicted.",
    folklore: ['gjeto-basho-muji', 'mujo-strength', 'kreshnik-epic'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'gjeto-basho-muji': 'zanat' },
  },
  bariuUdhes: {
    name: 'bariu i bjeshkës', glyph: '🐑', kind: 'human',
    role: "the shepherd who breaks the news of Mujo's own death — to Mujo",
    backstory:
      "A shepherd of the high pastures between the duelling ground and Jutbina, met by chance on Mujo's own ride home — he has no notion that the rider asking after the news is the very man all Jutbina is already mourning, and answers plainly: a black day for the hamlet, Gjeto Basho Mujo is slain, though a son has just been born to him. A single scene in this one song; he is never staged again.",
    folklore: ['gjeto-basho-muji'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'gjeto-basho-muji': 'bariu' },
  },
}
