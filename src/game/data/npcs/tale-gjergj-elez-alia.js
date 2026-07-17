// NPCs: Gjergj Elez Alia (the wounded hero and the Baloz) — see ../npcs/_SCHEMA.md.
// The hero, his sister and the Baloz are CORE figures (core-world.js) — linked
// from the tale's cast, not duplicated here. This file holds only the figures
// unique to the song.

export default {
  nallbanProbatini: {
    name: 'nallbani probatin', glyph: '🔨', kind: 'human',
    role: 'the farrier blood-brother who turned lecher',
    backstory: 'A probatin (sworn blood-brother) of Gjergj\'s house, and a farrier of the sheher. When Gjergj\'s courser is brought to be shod for the fight, he names his price as the maiden herself — a besa betrayed for lust. The song sets his greed against his sworn brother, the honest farrier.',
    folklore: ['gjergj-elez-alia', 'vellameri'],
    location: { status: 'planning', plan: 'the proposed sheher of the two farriers (near kalaRozafa) — a smithy on the castle road; unbuilt until the Gjergj arc is staged' },
    tales: { 'gjergj-elez-alia': 'nallbanProbatini' },
  },
  nallbanJarani: {
    name: 'nallbani jaran', glyph: '⚒️', kind: 'human',
    role: 'the honest farrier who shod the courser as his own',
    backstory: 'The second farrier of the sheher (Elsie calls him the blacksmith), who shoes Gjergj\'s war-horse "as if it were his own" and asks nothing dishonourable — the foil to the lecher probatin. Plain craft kept faithfully is its own kind of besa.',
    folklore: ['gjergj-elez-alia'],
    location: { status: 'planning', plan: 'the proposed sheher of the two farriers (near kalaRozafa) — the second smithy; unbuilt until the Gjergj arc is staged' },
    tales: { 'gjergj-elez-alia': 'nallbanJarani' },
  },
  gjoguGjergjit: {
    name: 'gjogu i Gjergjit', glyph: '🐎', kind: 'creature',
    role: 'the war-courser who kneels at the killing stroke',
    backstory: 'Gjergj\'s dapple-grey (gjogu), nine years idle in the stall while his master lay wounded. In the mejdan he kneels at the exact instant the Baloz\'s cudgel flies, so the blow passes over — the horse\'s wit wins the duel as much as the hero\'s arm. The kreshnik courser is always half-oracle.',
    folklore: ['gjergj-elez-alia', 'mujo-courser'],
    location: { status: 'planning', plan: 'stabled at the shore kulla (bregu), fights at the war grounds (balozLufte); a mount, drawn with the hero when staged' },
    tales: { 'gjergj-elez-alia': 'gjoguGjergjit' },
  },
  shoketGjergjit: {
    name: 'shokët e Gjergjit', glyph: '🛡️', kind: 'collective',
    role: 'the thirty companions — heirs of the house and keepers of the amanet',
    backstory: 'Gjergj\'s band of companions (shokë), who hold the amanet (dying charge): when brother and sister die on the same day they are washed, wrapped and laid in ONE grave under the linden, as Gjergj asked. They are the witnesses who make the ending a rite, not just a death.',
    folklore: ['gjergj-elez-alia', 'besa'],
    location: { status: 'planning', plan: 'gather at the shore kulla (bregu); dig the double grave (balozFitore); a chorus, staged with the hero' },
    tales: { 'gjergj-elez-alia': 'shoketGjergjit' },
  },
  qyqjaGjames: {
    name: 'qyqja e gjëmës', glyph: '🐦', kind: 'creature',
    role: 'the cuckoo of the lament',
    backstory: 'The mourning bird of the coda: she searches every pasture for Gjergj and, finding him gone, carries the gjamë (the men\'s keening) across the mountains. In Gheg lament the cuckoo IS grief given wings — she puts the passing wayfarer under oath that no songs be sung on this mountain, only mourning.',
    folklore: ['gjergj-elez-alia', 'gjama-e-burrave', 'cuckoo'],
    location: { status: 'planning', plan: 'ranges the mountain pastures above the shore; a voice of the coda, not a fixed spot' },
    tales: { 'gjergj-elez-alia': 'qyqjaGjames' },
  },
  shtegtariMalit: {
    name: 'shtegtari i malit', glyph: '🚶', kind: 'human',
    role: 'the mountain wayfarer bound by the cuckoo\'s oath',
    backstory: 'A passer-by on the mountain whom the cuckoo puts under oath: no songs here, only the gjamë for Gjergj. He is the one who carries the news down — the living ear the lament needs so the grief does not die on the ridge.',
    folklore: ['gjergj-elez-alia'],
    location: { status: 'planning', plan: 'the mountain paths above the shore (near the mali1 / bregu edge); a passing figure' },
    tales: { 'gjergj-elez-alia': 'shtegtariMalit' },
  },
}
