// ===========================================================================
// NPCs new to "Kënga e Halil Garrisë" (The Song of Halil Garria) — see
// ../npcs/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it.
//
// REUSED (not defined here, linked via cast[].npc in the tale file):
//   krushqit (core-village) — the wedding train, here riding a DIFFERENT
//   bride to a DIFFERENT groom than the village's own dasma, on the same
//   standing route (roads and wedding-trains accumulate stories, they never
//   clash — kostandini-i-vogel already reuses the same NPC the same way).
//
// NOT the core NPC 'kostandini' (Kostandin i vdekur, tale-constantine-
// doruntine's own dead brother) — per that tale's own discrepancies note,
// Robert Elsie's headnote treats "Halil Garria" as simply the north's name
// for the same besa-motif, but the actual recovered ballad text (Fishta's
// Gomsiqe recording, 152 verses — see ../tales/halil-garria.js) diverges from
// Kostandini's southern ballad in every particular that matters: a besa SOLD
// for fifty purses of gold rather than a mother's grief-curse, a sister who
// rides home reading three false excuses out of her risen brother rather
// than three riddling birds, and a MOTHER who dies alongside the daughter at
// the grave rather than at her own door. Same family shape (nine brothers,
// one sister), same deep motif (the dead keep besa; only the living forget)
// — but a different hero, a different family, a different region's telling.
// Treated here exactly as kostandini-i-vogel treated Aga Ymeri against the
// SAME core npc: parallel, not identical; kept separate.
//
// ALSO NOT Halili, Mujo's sworn brother of the Kângë Kreshnikësh cycle
// (already staged at jutbina/halil1, in the SAME mountain massif as this
// tale's proposed anchors) — a frontier warrior with his own marriage-arc,
// sharing nothing with this ballad's Halil Garria but a common given name.
// ===========================================================================

export default {
  halilGarria: {
    name: 'Halil Garria', glyph: '🪦', kind: 'human',
    role: 'the brother who sold a besa, then kept a besa, even from the grave',
    backstory:
      'Sworn together with his eight brothers, by God, never to marry their one sister off — until a night\'s lodging with a wealthy stranger and the offer of fifty purses of gold turned his own oath against itself. He took the gold and gave the stranger his besa for her hand; by the time he reached home the regret had already set in, and the SECOND besa he swore his sister that same night — that Halil would come see her within nine days, and come bring her home within nine weeks — is the one death itself could not excuse him from. He was already lying in his grave when her mountain bird found it, seven years on; God\'s own pity raised him, and he rode nine days on his grey horse to keep the word the living Halil never managed to. He lied to his sister the whole road home — about the smell of earth on him, about his silent flute, about the ruined houses, about nine white graves — until, almost at the door, he slipped away one last time to lie back down in the ground he had risen from. NOT Kostandini (core npc, tale-constantine-doruntine\'s own dead brother — a separate, southern-sourced besa-ballad with its own mother\'s curse) and NOT Halili the kreshnik of Jutbina (Mujo\'s sworn brother, a frontier warrior with no part in this story) — three different men who share, between them, only a name or a motif, never a single tale.',
    folklore: ['halil-garria'],
    location: { status: 'planning', plan: 'rides between the proposed hamlet and grave pinned near mali1, and the offstage road to the lord\'s household' },
    tales: { 'halil-garria': 'halil' },
  },
  motraGarris: {
    name: 'motra e Halilit', glyph: '💔', kind: 'human',
    role: 'the one sister among nine brothers — sold, kept waiting, then widowed of her whole family in one homecoming',
    backstory:
      'The only daughter in a house of nine sons, promised away by her own brother\'s besa for fifty purses of gold she never saw and, at first, never knew about. Carried nine days from home and left to wait — nine days, then nine weeks, then seven full years — she finally leaned against a beech tree and sent a mountain bird after her brother when he never once came; it was that same grief, carried to his grave, that woke him. She rode home at his side reading every wrong sign about him (the earth-smell, the silent flute, the birds\' own warning) and being lied to at each one, found her mother alone in a house of nine fresh graves, and died in her mother\'s arms at Halil\'s own graveside the moment both women understood, together, who had truly carried her home. NOT motraGjergjit (core npc, Gjergj Elez Alia\'s sister, who nursed her own brother through nine wounds in a shore tower) — an unrelated figure in an unrelated tale.',
    folklore: ['halil-garria'],
    location: { status: 'planning', plan: 'taken from the proposed hamlet to the offstage lord\'s household, then rides the offstage road home again' },
    tales: { 'halil-garria': 'motra' },
  },
  nenaGarris: {
    name: 'e ëma e Halilit', glyph: '👵', kind: 'human',
    role: 'the mother of nine sons and one daughter, left at the end with none of them',
    backstory:
      'Raised nine sons and a single daughter in the highland houses her sons built for themselves; lost the daughter to a marriage her own youngest son arranged for gold, and then — the ballad never quite says how — lost every one of her sons besides, and buried them with her own hands. When her daughter came home years later at a dead man\'s side insisting his name, she refused to believe it, went looking hand in hand with her, and found only a headstone — and, for one moment, an arm reaching up out of the ground for an answer. NOT nenaKostandinit (tale-constantine-doruntine\'s own mother, whose curse wakes a different dead son in a separately-sourced, southern ballad) — the same grief, a different mother, a different family, a different region\'s telling.',
    folklore: ['halil-garria'],
    location: { status: 'planning', plan: 'keeps the proposed hamlet through the whole tale; never leaves it' },
    tales: { 'halil-garria': 'nena' },
  },
  vellezeritGarris: {
    name: 'tetë vëllezërit e Halilit', glyph: '👥', kind: 'collective',
    role: "Halil's eight brothers, sworn to the same oath he broke, and dead before the tale is over",
    backstory:
      'Eight more sons in the same house, bound to the same oath their youngest brother sold for gold; the ballad shows them only grieving, together, the night their sister is taken, and afterward as nine white graves on a hillside their sister is lied to about twice on the road home before the truth reaches her from their own mother\'s mouth. What became of them the ballad never quite says outright — only that, sometime after their sister left, they were struck down one after another and buried, all nine, by their own mother\'s hands. NOT vellezeritKostandinit (tale-constantine-doruntine\'s own eight brothers, who fall together in one year of war in a separate, southern-sourced ballad) — the same family shape, sworn to a similar besa, but a different family entirely.',
    folklore: ['halil-garria'],
    location: { status: 'planning', plan: 'keeps the proposed hamlet, then the proposed grave beside it' },
    tales: { 'halil-garria': 'vellezerit' },
  },
  zotniuFisnik: {
    name: 'zotnia i pasun', glyph: '💰', kind: 'human',
    role: "the wealthy lord who bought Halil's sister for fifty purses of gold",
    backstory:
      'A grand and wealthy man who gave Halil Garria a night\'s lodging, heard over the after-dinner talk that his young guest had an unmarried sister, and priced her at fifty purses before the evening was out. He sent ninety mounted riders to fetch his bride home and is never seen or spoken of again once she is taken — the ballad has no further use for him, and neither, in the end, does the bride who rides straight back out of his household and never once looks back toward it.',
    folklore: ['halil-garria'],
    location: { status: 'planning', plan: 'would stand in his own distant household, nine days down the road — never staged; the ballad only ever speaks of him, and only once he already has what he paid for' },
    tales: { 'halil-garria': 'zotnia' },
  },
  zoguIMalit: {
    name: 'zogu i malit', glyph: '🐦', kind: 'collective',
    role: 'the mountain bird(s) who carry an unanswered besa, and name the road of the living and the dead',
    backstory:
      'A bird of the highlands, spoken to like a person and trusted with a message no human courier could carry: seven years searching, it is the one who finds Halil already lying in his grave and tells him plainly that his besa is still owed. Later — the same bird, or its own kind, the ballad does not say which — a pair of mountain birds sing over the road he rides with his sister and are the only ones bold enough to say outright what he now is: "the living travels the road with the dead." Halil waves them off both times as empty mountain-fairy chatter. Not a named individual, but the class of talking highland bird every besa-ballad of this kind seems to need one of.',
    folklore: ['halil-garria'],
    location: { status: 'planning', plan: 'wanders the proposed hamlet\'s heights and the road beyond it — never a fixed perch' },
    tales: { 'halil-garria': 'zoku' },
  },
}
