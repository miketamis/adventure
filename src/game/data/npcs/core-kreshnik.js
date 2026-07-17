// SHARED FRONTIER-EPIC CAST — the kreshnik figures who are genuinely THE SAME
// man (or horse, or band) across more than one song, held as ONE canonical
// registry entry the tales share by linking `npc: '<id>'` from their cast.
// See ../npcs/_SCHEMA.md for the format contract and the sharing rule: nothing
// in a backstory here may contradict any tale that reuses the entry.
//
// Consolidated out of the individual tale-*.js files (which used to each carry
// their own copy, silently shadowing one another in the glob-merge):
//   halili       — Sokol Halili, Mujo's younger brother
//   zuku         — Zuku Bajraktari, the standard-bearer
//   agatJutbines — the Agas of Jutbina (Mujo & Halili's own band)
//   gjogu        — Mujo's oracular grey courser
// Mujo himself stays the core NPC `mujo` in core-world.js. Coursers and Krajls
// that merely SHARE a generic name but are DIFFERENT figures keep their own
// ids in their own tale files (gjoguZukut, krajli, krajliRushes, …).
// ===========================================================================

export default {
  halili: {
    name: 'Sokol Halili', glyph: '🦅', kind: 'human',
    role: "kreshnik of Jutbina — Mujo's younger brother, the frontier's second pillar",
    backstory:
      "Muji's inseparable younger brother and fellow aga of Jutbina — \"Sokol\" (\"Falcon\") for the youth and dash he brings where Muji is raw strength. He keeps the night watch no one else will keep, argues the çeta whole when pride would split it, and in his own signature song rides to his death and back for Tanusha, a bride glimpsed once at a truce. Across the wider cycle he and Muji read as one figure in two bodies: in one song Halili rides alone into a Krajl's land to break his brother out of a tower, in another it is Muji who must take the blood for Halili's death — each telling its own episode of one long life, none a fixed timeline. This is the CANONICAL registry entry for Sokol Halili: every kreshnik tale that needs him links here rather than redefining him.",
    folklore: ['sokol-halili', 'kreshnik-epic', 'halil-marriage', 'muji-e-behuri', 'mujo-avenges-halil'],
    location: { status: 'placed', node: 'jutbina' },
    tales: {
      'kreshnik-epic': 'halili',
      'halil-marriage': 'halili',
      'muji-e-behuri': 'halil',
      'ali-bajraktari': 'halili',
      'mujo-avenges-halil': 'halil',
      'mujo-courser': 'halili',
    },
  },
  zuku: {
    name: 'Zuku Bajraktari', glyph: '🚩', kind: 'human',
    role: "the young standard-bearer of Jutbina — Halili's bosom friend",
    backstory:
      "A young bajraktar (standard-bearer) of Jutbina and Halili's closest companion — the two keep the first night's watch together and alone see the zanas dance at the spring. His own songs give him two reckonings: blinded as a boy by his own mother in league with a captive, his eyes healed by a mountain ora for a sworn vengeance he rides back disguised to take; and, goaded by Mujo's boast that no lad of Jutbina has ever touched Rusha's kulla, winning Rusha for good by her besa and a cadi's horse-race. In yet another song (Muji e Behuri) he rides off with Dizdar Osman Aga's splinter çeta and is slaughtered at Behur Kapidani's kulla, his severed head flung into the courtyard — the kreshnik songs are independent episodes of one long life, not one fixed timeline, the way Mujo himself dies in one song and rides again in the next. The epic gives more than one song to this single standard-bearer's name, exactly as it does with Arnaut Osmani.",
    folklore: ['zuku-bajraktar', 'muji-e-behuri'],
    location: { status: 'placed', node: 'zuku1' },
    tales: {
      'zuku-bajraktar': 'zuku',
      'muji-e-behuri': 'zuku',
      'gjeto-basho-muji': 'zuku',
    },
  },
  agatJutbines: {
    name: 'agët e Jutbinës', glyph: '🛡️', kind: 'collective',
    role: "the Agas of Jutbina — Mujo and Halili's own sworn fighting men",
    backstory:
      "Jutbina's own assembled warriors and Mujo and Halili's sworn band — the men who feast around the meadow fire, needle Mujo about his unmarried brother, and arm to the last man out of the tribe's honour the moment word comes that one of their own is taken. Named among them are Basho Jona, the old aga who never wanted any bride at all, and Osman Aga, who offers Halili his pick of thirty maidens before the boy refuses every one. Their number is sung both ways — three hundred strong when the Marriage of Halili musters them to ride, thirty when they gather to hear Mujo's boast about Rusha — the frontier songs keep no fixed count for the band. NOT cobanijaJutbines (mujo-strength's hired herdsmen, a lower rank mocked for besting Mujo at wrestling) — the agas are Jutbina's own fighting men.",
    folklore: ['halil-marriage', 'zuku-bajraktar', 'kreshnik-epic'],
    location: { status: 'placed', node: 'jutbina' },
    tales: {
      'halil-marriage': 'agat',
      'zuku-bajraktar': 'agatJutbines',
    },
  },
  gjogu: {
    name: 'gjogu i Mujës', glyph: '🐎', kind: 'mythic',
    role: "Mujo's oracular grey courser",
    backstory:
      "Mujo's own steel-grey warhorse and the frontier's oracular courser (folklore card mujo-courser): swift as the wind, grieving, and able to read danger before its rider can. It speaks and warns — smoke on the wind that means his kulla is already burning in one song, weeping and pawing the ground the night the çeta first quarrels in another — and does its own share of the killing, teeth and hooves both: it carries Halili into a Krajl's mountains and kicks a tower door off its steel hinges, breathes flame to reach Behur Kapidani's kulla, dodges lance and cudgel through a day-long duel, and rolls the dead captain's weight off its pinned rider at the end. Distinct from Zuku's coursers (gjoguZukut, blinded alongside his rider; gjogSeteVjet, the seven-year cellar horse) and from gjoguGjergjit of Gjergj Elez Alia's song — this grey is Mujo's alone, one duty at a time of what its own dedicated song makes a whole legend.",
    folklore: ['mujo-courser', 'kreshnik-epic', 'muji-e-behuri'],
    location: { status: 'placed', node: 'jutbina' },
    tales: {
      'kreshnik-epic': 'gjogu',
      'muji-e-behuri': 'gjogu',
      'gjeto-basho-muji': 'gjogu',
    },
  },
}
