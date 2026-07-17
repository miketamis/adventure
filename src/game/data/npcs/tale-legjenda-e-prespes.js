// NPCs: the Legjenda e Prespës (drowned city of Prespa) cast — see
// ../npcs/_SCHEMA.md for the format contract. One file per area/tale so
// parallel agents never collide.

export default {
  princiPrespes: {
    name: 'princi i Prespës', glyph: '🤴', kind: 'human',
    role: "Prespa's own king's son — the marriage he forced brought the flood",
    backstory: "Heir to the town of Prespa, in the far south-east near Korçë. He met a zanë of the forest above his father's court, could not take her warning for an answer, had her seized and held until she agreed to marry him — and drowned with his own town on his wedding night. NOT any hero of this game's main quest: this prince's whole line and town end with him.",
    folklore: ['legjenda-e-prespes'],
    location: { status: 'planning', plan: "grew up in Prespa's own court (never built as its own scene); the one staged appearance is the forest above it (pylli1), courting Nereida" },
    tales: { 'legjenda-e-prespes': 'princi' },
  },
  nereidaPrespes: {
    name: 'Nereida', glyph: '💧', kind: 'mythic',
    role: 'the zanë of the forest above Prespa, whose warning went unheeded',
    backstory: "A zanë met in the woods above the town of Prespa; refused the prince's marriage offer with a plain warning of disaster, and was taken and held until she gave in. NOT Zana e lumit (the river's own Zana, a fair arms-giver to wandering heroes) — a different zanë, of a different water, whose one story ends with a whole town underwater. The old people say a zanë never truly drowns: hers is the one life the flood did not take, and the lake that bears her sorrow is where she is said to remain.",
    folklore: ['legjenda-e-prespes'],
    location: { status: 'planning', plan: 'met in the forest above the town (pylli1); after the flood, said to remain in the waters of Lake Prespa itself, once a dedicated node reaches that corner of the map' },
    tales: { 'legjenda-e-prespes': 'nereida' },
  },
  mbretiPrespes: {
    name: 'mbreti i Prespës', glyph: '👑', kind: 'human',
    role: "Prespa's own king — ruled the town until the flood took it whole",
    backstory: "Father to the prince who forced the marriage; ruled Prespa from its own court until his son's wedding night, when the flood drowned court and king together with the whole town. NOT mbretiMermer or the moat-king of three-friends — a separate king, of a separate southern town, whose whole line ends with this flood.",
    folklore: ['legjenda-e-prespes'],
    location: { status: 'planning', plan: "rules Prespa's own court (never built as its own scene); drowns with the whole town at the tale's end" },
    tales: { 'legjenda-e-prespes': 'mbreti' },
  },
  populliPrespes: {
    name: 'populli i Prespës', glyph: '🏘️', kind: 'collective',
    role: 'the whole town of Prespa, together',
    backstory: "Everyone who lived in the town of Prespa, going about an ordinary life until the one night their king's son's wedding brought a flood that spared no one else. Their town is the lake's own bed.",
    folklore: ['legjenda-e-prespes'],
    location: { status: 'planning', plan: "goes about ordinary life in Prespa's own town (never built as its own scene); drowns whole at the tale's end" },
    tales: { 'legjenda-e-prespes': 'populli' },
  },
}
