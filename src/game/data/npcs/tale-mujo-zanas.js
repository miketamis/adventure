// NPCs new to "The Marriage of Gjeto Basho Mujo" (Martesa e Gjeto Basho Mujit,
// aka "Mujo and the Zanas") — see ../npcs/_SCHEMA.md for the format contract.
// This file is owned by its tale: agents editing other tales must not touch
// it. Mujo himself is NOT duplicated here — he is the core NPC `mujo` in
// core-world.js, linked from the tale file's cast.
//
// HALILI: no core entry for Mujo's brother exists in core-world.js, so this
// tale needs its own. By the time this file was written, two sibling tales
// (tale-halil-marriage.js, tale-mujo-avenges-halil.js) had ALREADY and
// independently defined their own top-level `halili` registry entry — a
// three-way collision (Object.assign in beatscoverage.mjs lets the last file
// loaded silently win). To avoid making that worse, this tale's own entry is
// keyed `haliliZanas` instead of `halili`. Whoever eventually promotes Halili
// to core-world.js should reconcile all three entries into one and repoint
// every tale's cast.npc at it.
// ===========================================================================

export default {
  nusjaKrajlit: {
    name: 'nusja e Krajlit', glyph: '👰', kind: 'human',
    role: 'the Krajl\'s daughter, Mujo\'s bride',
    backstory:
      'Won by Mujo on an earlier raid into the Krajl\'s land, never named in the song. Taken captive with her whole wedding train at the high pasture\'s shady meadows, she alone is left untouched when the zanas turn the company to stone — and is carried to their cave to cook and fetch water. There Mujo finds her at a hidden spring and turns her into his own agent: she refuses the zanas\' table until, under oath, they let slip the secret of their power, and it is her message that later brings the zanas to Mujo\'s door to bargain. NOT Rusha (the OTHER Krajl\'s daughter, of the Halili-marriage strand across content.js) — a different bride, a different Krajl, a different song; krajl is a stock title of the frontier cycle, not one man.',
    folklore: ['mujo-zanas'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-zanas': 'bride' },
  },
  krajliDhendrit: {
    name: 'Krajli', glyph: '👑', kind: 'human',
    role: 'the frontier king who weds his daughter to Mujo',
    backstory:
      'Rules the Realm of the Christians across the frontier; welcomes Mujo\'s three-hundred-strong wedding train with a feast and dancing that lasts until midnight, and gives his daughter\'s hand. Never staged again once the wedding train departs. Krajl is the frontier cycle\'s own stock title for a Slavic border king — a KIND, not a name, like kulshedra — so this is a DIFFERENT Krajl from Rusha\'s father (who imprisons Halili elsewhere in the game\'s own content.js) and from the Krajl who later takes Mujo himself captive; each song may set its own Krajl on the far side of the border without any of them contradicting one another.',
    folklore: ['mujo-zanas'],
    location: { status: 'planning', plan: 'somewhere across the frontier, in the Realm of the Christians — never staged as an explorable spot' },
    tales: { 'mujo-zanas': 'krajli' },
  },
  dizdarOsmanAga: {
    name: 'Dizdar Osman Aga', glyph: '🧔', kind: 'human',
    role: 'the old castellan who leads the wedding train — and undoes Mujo\'s own warning',
    backstory:
      'The one elder among Mujo\'s three hundred young Agas, a Dizdar (fortress-castellan) by title, trusted to lead the wedding train to the Krajl\'s land and back. Mujo warns the whole company not to sing, revel, or rest at the high pasture\'s three shady meadows — home to three fierce zanas — but on the homeward leg Osman Aga\'s own boast (he has led brides across these very meadows many times before, always safely) persuades the company to stop anyway, and the zanas turn them all to stone. Restored along with the rest once Mujo wins the zanas\' besa.',
    folklore: ['mujo-zanas'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-zanas': 'dizdari' },
  },
  darsmoretJutbines: {
    name: 'darsmorët e Jutbinës', glyph: '🐎', kind: 'collective',
    role: 'Mujo\'s three hundred wedding riders, turned to stone by the zanas',
    backstory:
      'Three hundred young Agas of Jutbina, dressed in gold with swords and lances agleam, mounted on dapple-grey horses — Mujo\'s own wedding train, sent to fetch his bride from the Krajl\'s land. Warned off the high pasture\'s shady meadows, they cross them safely on the outbound leg but stop to rest there on the way home at their own elder\'s urging; the zanas turn the company to stone (thirty of them, the song narrows to say, among their shattered horses) and hold them until Mujo wins back the zanas\' stolen power. NOT the core village\'s `krushqit` (a much smaller village wedding-train that never leaves the valley, tied to an ordinary vitore hearth-custom) — this is Jutbina\'s own armed muster riding into a foreign realm and back.',
    folklore: ['mujo-zanas', 'kreshnik-epic'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-zanas': 'darsmoret' },
  },
  zanatLugjeve: {
    name: 'zanat e Lugjeve të Verdha', glyph: '🔥', kind: 'mythic',
    role: 'the fierce trio who guard the golden-horned goats of the Green Valleys',
    backstory:
      'Three "zana t\'idhta" — bitter, fierce zanas — who take their rest by turns in the shady meadows of the high pasture above Jutbina and turn to stone anyone who lingers there to sing, revel, or sleep. Their entire power is hidden in three wild goats with horns of gold ducats, kept in the hidden Green Valleys beyond a lightless beech gorge: catch the goats, and the zanas\' own strength drains away to nothing. Hostile on first meeting — unlike the gentler cradle-mother PAIR of mujo-strength\'s zanatShkembit, met by night and quick to reward a kindness — this trio yields to Mujo only when he holds their goats hostage, and swears him a besa in the end. NOT Zana e lumit (the single named Zana of the game\'s own river, zana1) — a different triad entirely, met only on this one mountainside.',
    folklore: ['zana', 'mujo-zanas'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'mujo-zanas': 'zanat' },
  },
  zanaVogel: {
    name: 'zana e vogël', glyph: '🌘', kind: 'mythic',
    role: 'the youngest of the three — the only merciful voice among them',
    backstory:
      'The youngest of the trio at the Green Valleys, and the one crack of mercy in an otherwise fierce sisterhood: when her sisters spring to freeze the captive bride for asking after their power, she alone steps between them and talks them down, then lets the secret of the golden-horned goats slip. Later, when Mujo refuses to trade the goats for anything, she is the one who breaks from her sisters, wipes her own tears in the hair of her brow, takes his hand, and swears him a besa — safe passage forever after in bride-winning, in war with a Baloz, in revelry on their own pastures. Bound now by her own sworn word, she sings the besa\'s fulfillment hand in hand with the eldest zana at the tale\'s close.',
    folklore: ['zana', 'mujo-zanas'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'mujo-zanas': 'zanaVogel' },
  },
  haliliZanas: {
    name: 'Halili', glyph: '🗡️', kind: 'human',
    role: 'Mujo\'s younger brother — the kreshnik cycle\'s second hero',
    backstory:
      'Mujo\'s younger brother — the "djali" (the youngster) Mujo calls on by name the instant the little zana\'s besa is sworn, to open the pen and set the golden-horned goats free. The wider cycle (Kângë Kreshnikësh) knows him as Sokol Halili, Mujo\'s constant second — the one who later rides alone into the Krajl\'s land to free his captured brother, wins his own bride, and is avenged by Mujo in turn — but none of that is staged in this song, which only needs him standing at Jutbina, ready to his brother\'s word. NOT a fresh core figure: two sibling tales (halil-marriage, mujo-avenges-halil) already keep their own `halili` registry entries for their own fuller portraits — this one is kept separately (as `haliliZanas`) rather than colliding with either.',
    folklore: ['muji-halili', 'mujo-zanas'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-zanas': 'halili' },
  },
  gjahtaretJutbines: {
    name: 'gjahtarët e Krahinës', glyph: '🐕', kind: 'collective',
    role: 'three hundred hunters mustered to take the golden-horned goats alive',
    backstory:
      'Hunters and hound-handlers of the whole krahina (district) around Jutbina, gathered overnight at Mujo\'s call with three hundred hunting dogs and seven hundred hounds besides. Warned that the goats must be taken alive — wound even one, Mujo tells them, and none of them will see Jutbina again — they ring the hidden Green Valleys for three days and nights and bring the wild goats out unharmed, then go home with gifts. A different muster from mujo-strength\'s cobanijaJutbines (the lord\'s cowherds, mocking rivals on the plain) though drawn from the same krahina.',
    folklore: ['mujo-zanas'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-zanas': 'gjahtaret' },
  },
}
