// NPCs: the Kostandini i Vogël / Aga Ymeri cast — see ../npcs/_SCHEMA.md for
// the format contract. One file per area/tale so parallel agents never
// collide.
//
// REUSED (not defined here, linked via cast[].npc in the tale file):
//   agaYmer, plaka (core-village) — the hero and the gate-keeper of his kulla;
//   krushqit (core-village) — the wedding train, here riding a DIFFERENT bride
//   to a DIFFERENT groom than the village's own dasma, on the same standing
//   route (roads and wedding-trains accumulate stories, they never clash).
//
// KNOWN UPSTREAM BUG (out of THIS file's scope — do not "fix" it here by
// renaming this tale's own npc reference away from 'agaYmer'; that would only
// paper over the real cause): src/game/data/npcs/tale-aga-ymer.js ALSO
// defines a bare 'agaYmer' id for its own, separate protagonist (a different
// retelling — Elsie's "nine years"/Pashë Veli prose version, placed at node
// kalaRozafa). npcRegistry.js's glob-merge is last-file-wins alphabetically,
// and 'tale-aga-ymer.js' sorts after 'core-village.js', so at runtime
// NPC_REGISTRY.agaYmer resolves to tale-aga-ymer.js's character, not to
// core-village.js's tower-keeper at node agaYmer1 that THIS tale's places
// anchors (dungeon/besaChoice/freedom) assume. tale-aga-ymer.js's own other
// cast members already use unique suffixed ids (nusjaYmerit, mbretiHuaj,
// pashaVeliu) — 'agaYmer' is its only bare, collision-prone id, and the fix
// belongs there (rename it), not in this tale's file, which the schema bars
// us from editing.
//
// NOT the core NPC 'kostandini' (Kostandin i vdekur, Doruntina's dead-riding
// BROTHER) — the folklore card is explicit that this is a different legend:
// a returning HUSBAND, not a besa-bound brother. No relation, no sharing.

export default {
  nusja: {
    name: 'nusja e Aga Ymerit', glyph: '👰', kind: 'human',
    role: 'Aga Ymer\'s wife — the bride who waited, then almost didn\'t',
    backstory: 'Wed one night before the war took him, she swore to wait for Aga Ymer and did — three years, by her own sworn word, sworn harder than her mother-in-law\'s week or her father-in-law\'s fortnight. When the years ran out she let herself be promised again, and was already riding to her second wedding when a travel-worn stranger stopped the train at the White Spring. She knew nothing of him — one night is not enough to know a face — until he bared the mark on his arm. NOT the gate-keeper (plaka), who only ever watched her wait; NOT any bride of the village\'s own dasma (krushqit carries brides for every wedding, hers included, without the trains ever being the same story).',
    folklore: ['kostandini-i-vogel', 'aga-ymer'],
    location: { status: 'placed', node: 'plaka' },
    tales: { 'kostandini-i-vogel': 'wife' },
  },
  mbretiZaptor: {
    name: 'mbreti zaptues', glyph: '👑', kind: 'human',
    role: 'the foreign king who held Aga Ymer captive',
    backstory: 'His armies broke Aga Ymer\'s in the third battle and his dungeon held him three years running. He priced a hero\'s freedom in silver he knew a penniless captive couldn\'t raise — until his own daughter\'s besa, not coin, bought the release he never expected kept. When Aga Ymer rode back into his power on the very day sworn, the debt was the only thing he tore up. NOT mbretiHuaj (tale-binoshet\'s foreign king) or mbretiMermer (the Sun-quest\'s marble king) — a third, unrelated foreign throne.',
    folklore: ['kostandini-i-vogel', 'aga-ymer'],
    location: { status: 'placed', node: 'agaYmer1' },
    tales: { 'kostandini-i-vogel': 'king' },
  },
  bijaMbretit: {
    name: 'bija e mbretit', glyph: '🕊️', kind: 'human',
    role: 'the foreign king\'s daughter — the one who believed a besa over a ransom',
    backstory: 'She marked the captive who cheered the other prisoners and played the lute through his own bad years, and when his lute at last fell silent she asked why. Told his dream, she staked her father\'s besa (and her own neck, when he doubted) on a wager: an Albanian keeps his word even at the cost of his life — and she was proven right the hour he rode back through the gate on the day he\'d sworn. Already present, unnamed, in the game\'s own agaYmer1/agaYmerFund text ("bija e mbretit fal trimin").',
    folklore: ['kostandini-i-vogel', 'aga-ymer'],
    location: { status: 'placed', node: 'agaYmer1' },
    tales: { 'kostandini-i-vogel': 'princess' },
  },
  // id kept distinct from the historical Ali Pashë Tepelena's own npc id
  // ('aliPasha', defined in tale-ali-pashe-tepelena.js) — same common Ottoman
  // title-name, but two unrelated figures: that one the 1740-1822 Lion of
  // Ioannina, this one a bit-part groom in a sung ballad. A bare 'aliPasha'
  // id here would silently overwrite the historical figure's registry entry
  // (last-loaded-wins glob merge in npcRegistry.js), so this tale's own groom
  // keeps a tale-specific suffix instead.
  aliPashaYmerit: {
    name: 'Ali Pasha', glyph: '🤵', kind: 'human',
    role: 'the groom riding to a wedding that never reaches him',
    backstory: 'Told the first husband was three years dead, he sent his krushqit to fetch home a bride who never arrives — she turns back at the White Spring for the man she came with. He never appears in the flesh; the bride sends him a parting blessing instead of herself (children of his own, one day, with Aga Ymer and her both standing godparent) rather than a curse, and the story lets him keep his dignity offstage.',
    folklore: ['kostandini-i-vogel'],
    location: { status: 'planning', plan: 'would stand in his own distant household, waiting for a bride who never arrives — never staged; the wedding-road interception at the White Spring (fshatiLumi) is as close as the story comes to him' },
    tales: { 'kostandini-i-vogel': 'rival' },
  },
  shoketBurgut: {
    name: 'shokët e burgut', glyph: '⛓️', kind: 'collective',
    role: 'Aga Ymer\'s fellow captives in the foreign dungeon',
    backstory: 'They shared his three years in the dark cell, were cheered by his lute same as he cheered himself, and lamented losing him when the king\'s daughter set him loose. One of their number carried him the news from home that broke his nerve. The ballad frees Aga Ymer alone at the end and says nothing more of them — unlike Robert Elsie\'s prose retelling, which frees all nine companions alongside him.',
    folklore: ['kostandini-i-vogel', 'aga-ymer'],
    location: { status: 'placed', node: 'agaYmer1' },
    tales: { 'kostandini-i-vogel': 'captives' },
  },
}
