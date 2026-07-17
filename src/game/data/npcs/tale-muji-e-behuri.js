// NPCs new to "Muji e Behuri" (Mujo and Behuri, Palaj-Kurti song no. 7) — see
// ../npcs/_SCHEMA.md for the format contract. This file is owned by its tale:
// agents editing other tales must not touch it. Mujo himself is NOT duplicated
// here — he is the core NPC `mujo` in core-world.js, linked from the tale
// file's cast. Sokol Halili has no core entry anywhere yet, so this file
// defines the canonical one; any future tale that needs him should link here
// the same way three-friends links bukuraDheut in core-world.js.
// ===========================================================================

export default {
  // halili (Sokol Halili) and zuku (Zuku Bajraktari) are shared canonical
  // figures in core-kreshnik.js — this tale reuses them by their cast npc links.
  osmanAga: {
    name: 'Dizdar Osman Aga', glyph: '🪖', kind: 'human',
    role: 'the grey-headed old aga whose wounded pride splits the çeta',
    backstory:
      'An old aga who rides out with his own thirty men alongside Mujo\'s band — proud, quick to feel slighted, and certain Mujo has stolen glory that should have been shared. When Mujo will not yield, the old man tears the çeta in two and rides for New Kotor vowing plunder, a head, or a bride for some lucky boy of Jutbina. He and his whole company are ambushed and beheaded at Behur Kapidani\'s kulla before the song is half done — his own pride is what puts him on that road alone.',
    folklore: ['muji-e-behuri', 'kreshnik-epic'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'muji-e-behuri': 'osman' },
  },
  behuri: {
    name: 'Behur Kapidani', glyph: '🛡️', kind: 'human',
    role: 'the Slav captain whose kulla stands across the frontier',
    backstory:
      'A frontier captain of the Krajl\'s side — "Behuri the Captain" — who keeps a fortified kulla across the border with his two daughters, guarded by thirty pandours. He ambushes and beheads Dizdar Osman Aga\'s whole splinter çeta, mounting their thirty heads on his own walls, then duels Mujo in single combat for a full day until an ora\'s trick and a poisoned dagger end him. NOT the Krajl himself (a king, ranked above any captain) and NOT the sea-champion Balozi (core NPC `balozi`) — Behuri is a LAND lord with his own tower, his own daughters, and his own grudge, distinct from both.',
    folklore: ['muji-e-behuri', 'kreshnik-epic'],
    location: { status: 'planning', plan: 'a fortified kulla across the frontier from Jutbina, never drawn — no map node yet; if built, the nearest jump-off is the shared mountain hub (mali1)' },
    tales: { 'muji-e-behuri': 'behuri' },
  },
  vajzatBehurit: {
    name: 'çikat e Behurit', glyph: '👭', kind: 'collective',
    role: "Behuri's two daughters, captured at the mountain spring",
    backstory:
      'Behur Kapidani\'s two daughters, sent up to the high pastures under Peak of Xhuri to cool themselves at a spring, guarded by thirty pandours. Mujo\'s ambush kills every guard; Halili takes the two girls prisoner, and they travel with the çeta the rest of the song — through their own father\'s death, unknowing at first — until the return to Jutbina, where the song closes on a wedding and "brides the fairest ever seen there."',
    folklore: ['muji-e-behuri'],
    location: { status: 'planning', plan: "kept at their father's kulla when not staged; the same unbuilt spot as `behuri`" },
    tales: { 'muji-e-behuri': 'vajzat' },
  },
  oraMujit: {
    name: "ora e Mujit", glyph: '🕊️', kind: 'mythic',
    role: "Mujo's own guardian ora, met at the wayside fountain",
    backstory:
      'Every Albanian is born with an ora, a personal guardian-fate for life — this is MUJO\'S own, met once at a mountain fountain (where she forbids him to drink before he has killed Behur Kapidani) and once again mid-duel, when pinned to the ground he calls the mountain oras to keep their promise and she comes flying to whisper the trick that wins the fight. NOT `fatet` (the three Fates of the world below, who weigh the dead) and not any other tale\'s ora — every person\'s ora is their own, and this one belongs to Mujo alone.',
    folklore: ['ora', 'muji-e-behuri'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'muji-e-behuri': 'ora' },
  },
  // gjogu — Mujo's oracular grey courser — is the shared canonical figure in core-kreshnik.js.
  agetMujit: {
    name: 'Agët e Mujit', glyph: '🏇', kind: 'collective',
    role: "the rank-and-file agas of Mujo's own çeta",
    backstory:
      'The thirty agas of Jutbina (less Halili and Zuku, who ride and act apart from the pack) who answer Mujo\'s call to raid, camp twice under the great fir tree, spring the ambush at Kozhar, and wait out Mujo\'s duel with Behur Kapidani at the high pastures — three of them faint dead away when he rides back with the captain\'s head.',
    folklore: ['muji-e-behuri', 'kreshnik-epic'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'muji-e-behuri': 'agetMujit' },
  },
  agetOsmanit: {
    name: 'Agët e Dizdar Osman Agës', glyph: '🐴', kind: 'collective',
    role: "Osman's own thirty agas, riding to a slaughter",
    backstory:
      "Dizdar Osman Aga's own company of thirty, who ride with him for New Kotor when he splits from Mujo's çeta in wounded pride. Every one of them is ambushed and beheaded at Behur Kapidani's kulla; Mujo finds their thirty heads and thirty sabres hanging in a room walled in blood, and knows them at a glance for his own agas and commanders.",
    folklore: ['muji-e-behuri'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'muji-e-behuri': 'agetOsmanit' },
  },
}
