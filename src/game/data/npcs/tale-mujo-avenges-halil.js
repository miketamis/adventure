// ===========================================================================
// NPCs new to "Halili Avenges Mujo" (Halili merr gjakun e Mujit) — see
// ../npcs/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it. Mujo himself is NOT
// duplicated here — he is the core NPC `mujo` in core-world.js, linked from
// the tale file's cast. His mother is NOT duplicated either — she is
// `nenaMujit`, already defined in ../npcs/tale-mujo-strength.js, reused here
// by the same npc-id (a later chapter of the same standing woman). Three
// more figures are REUSED rather than duplicated, since parallel kreshnik-
// cycle tales had already registered them by the time this file was
// written: Halili himself is `halili` (tale-muji-e-behuri.js's canonical
// entry, which explicitly invites reuse); Mujo's own guardian-fate is
// `oraMujit` (also tale-muji-e-behuri.js — "every Albanian is born with an
// ora... this one belongs to Mujo alone," so the sickbed is simply another
// scene of the same one); and his elder kinsman is `dizdarOsmanAga`
// (tale-mujo-zanas.js's "Dizdar Osman Aga... the one elder among Mujo's
// three hundred young Agas"). All three are linked from this tale's cast
// via `npc:` — see mujo-avenges-halil.js — without editing those files.
// ===========================================================================

export default {
  budAlineTali: {
    name: 'Bud Aline Tali', glyph: '😠', kind: 'human',
    role: 'the aga whose sharp tongue nearly wrecks the çeta',
    backstory:
      'The first to notice Mujo is missing from the raiding party ("here Gjeto Basho Mujo is still missing"), and the one who later mocks Halili to his face as too young and worthless to the çeta — the insult that sends Halili off alone in a fury to take the blood himself. Not cruel exactly, just careless with his mouth; the song never punishes him for it, but it costs the çeta its best fighter for the raid he himself proposed.',
    folklore: ['mujo-avenges-halil'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'mujo-avenges-halil': 'tali' },
  },
  treqindAgallaret: {
    name: 'treqind agallarë', glyph: '⚔️', kind: 'collective',
    role: 'the three hundred Agas of the Jutbina çeta',
    backstory:
      'The raiding party camped at Kunora in the high pastures, three hundred strong with three hundred coursers — every one of them agreeing Mujo is missing and irreplaceable, then greeting his young brother coldly when he arrives in Mujo\'s place. (Tali, who speaks the sharpest words among them, is broken out as his own figure — this is the rest of the band.) NOT `cobanijaJutbines`, the mocking cowherds of Mujo\'s boyhood in the strength-song — a different life-stage, a different mockery, decades apart.',
    folklore: ['mujo-avenges-halil'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'mujo-avenges-halil': 'agallaret' },
  },
  gjarpriShtratit: {
    name: 'gjarpni i shtratit', glyph: '🐍', kind: 'creature',
    role: 'the healing serpent coiled over Mujo\'s wounds',
    backstory:
      'Sent by God to Mujo\'s sickbed, ridged-backed and slender-pawed, it cleans his wounds three times a day with nine kinds of medicine carried under its tongue, and sings him into a painless trance when the hurt grows too great — a strange, otherworldly song that lets him dream himself back on the mountain, hunting and swimming, until the dream lifts and the pain returns with it. A kind, not a name: NOT `gjarpri`, the great serpent that guards the world below\'s threshold, nor `bolla`, the river-serpent that sleeps the year through — three different serpents doing three different work.',
    folklore: ['mujo-avenges-halil', 'ora'],
    location: { status: 'placed', node: 'mujo1' },
    tales: { 'mujo-avenges-halil': 'gjarpri' },
  },
  ujkuBesnik: {
    name: 'uku i shtratit', glyph: '🐺', kind: 'creature',
    role: 'the fierce wolf that guards Mujo\'s feet',
    backstory:
      'Curled at the foot of Mujo\'s sickbed, it lets no one at all come near — bares its teeth and half-rises at the first stranger\'s eyes, and only Mujo\'s own shout stops Dizdar from drawing steel on it. Faithful, not wild: one of the three guardians (with the ora and the serpent) that keep the wounded hero through the days his brother is away. NOT the mythic First Wolf of the creation legend (`Ujku i Parë`, the Devil\'s clay given breath) — an ordinary guard-beast doing an extraordinary watch, nothing more.',
    folklore: ['mujo-avenges-halil'],
    location: { status: 'placed', node: 'mujo1' },
    tales: { 'mujo-avenges-halil': 'ujku' },
  },
  zanatBesatare: {
    name: 'zanat e besës', glyph: '🌕', kind: 'collective',
    role: 'the zanas who answer Mujo\'s old blood-oath',
    backstory:
      'The wider host of mountain-fairies Mujo bound himself to as their probatin (blood brother) the night they nursed him his strength — sworn to come whenever he is "pressed." This is that oath\'s first payment: three of them see Halili surrounded in the cave and fly at once to Mujo\'s bedside, shame him awake, bind his wounds, and send him to break the siege. NOT `zanatShkembit`, the one specific PAIR of cradle-mothers met just once at the cliff and never restaged — this is the broader sisterhood their gratitude opened the door to, called on this one time the debt comes due.',
    folklore: ['mujo-avenges-halil', 'zana', 'mujo-strength'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'mujo-avenges-halil': 'zanat' },
  },
  llabutani: {
    name: 'Llabutani', glyph: '👑', kind: 'human',
    role: 'the Krajl who ambushed Mujo — and dies for it',
    backstory:
      'A king of the Kingdom across the frontier, his white three-story kulla at its far end. He struck Mujo down by stealth in the high pastures — ten arrows in the body, three in the heart, a fair fight he never offered — and boasted afterward of hunting down Mujo\'s "seven hearts" one by one with his own sabre. Halili answers the boast in kind: takes his daughter, then kills him with a cudgel-blow at his own cave-mouth. One king of many across the songs — NOT the Krajl of Kotor (Tanusha\'s father, `halil-marriage`) and NOT the unnamed Krajl whose daughter is won by besa (the game\'s own Zuku Bajraktar vignette, `rusha1`) — the kreshnik cycle gives every Krajl his own tower and his own daughter, and none of the three share blood or story.',
    folklore: ['mujo-avenges-halil'],
    location: { status: 'planning', plan: 'rules the proposed white kulla down the frontier road from Kunora (see the tale\'s `kulla` place anchor)' },
    tales: { 'mujo-avenges-halil': 'llabutani' },
  },
  rushaLlabutanit: {
    name: 'Rusha e Llabutanit', glyph: '😢', kind: 'human',
    role: "Llabutani's daughter, taken as the price of the ambush",
    backstory:
      'Found alone in her father\'s kulla when Halili rides in demanding payment of an old debt; seized and carried off weeping through the town at a gallop, she is the blood-price for Mujo\'s wounding, not a bride freely won. "Rusha" is a stock bride-name the songs give more than one Krajl\'s daughter — NOT the game\'s own Rusha of `rusha1`, who gives Zuku Bajraktar her besa and rides to Jutbina a willing wife, and NOT `rushaKrajlise` (tale-mujo-courser.js), daughter of a different king (Krajlo Kapedani) taken in a different raid. Three Rushas, three fathers, three fates — one chooses to go, this one is taken in vengeance, weeping. Never conflate them.',
    folklore: ['mujo-avenges-halil'],
    location: { status: 'planning', plan: "kept in Llabutani's proposed kulla until Halili carries her off toward Jutbina" },
    tales: { 'mujo-avenges-halil': 'rusha' },
  },
  shkinaShtateZemra: {
    name: 'shkina me shtatë zemra', glyph: '👵', kind: 'human',
    role: "the old woman who shames Llabutani to his face",
    backstory:
      'One of the weeping old women Llabutani finds at his kulla when he comes home to a stolen daughter and no idea why — the boldest of them, and the only one who dares tell the king to his face that Mujo (as she believes) has shamed the whole Kingdom. Llabutani answers her with a boast about hunting down Mujo\'s seven hearts one by one; it is the last boast he ever makes.',
    folklore: ['mujo-avenges-halil'],
    location: { status: 'planning', plan: "an old servant-woman of Llabutani's proposed kulla" },
    tales: { 'mujo-avenges-halil': 'shkina' },
  },
  shkjaKrajlise: {
    name: 'shkjenia e Krajlisë', glyph: '🛡️', kind: 'collective',
    role: "Llabutani's warriors, mustered against one boy",
    backstory:
      'The Kingdom\'s fighting men, called to arms at Llabutani\'s cry after Halili\'s raid: they storm the mountain, corner Halili in a cave, and cannot take him — thirty falling to a single blow, the survivors fleeing at the first sound of Mujo\'s courser. A "shkja" host in the songs\' own word for the frontier\'s Slav enemy; distinct in every tale that stages them, since every Krajl in the cycle keeps his own.',
    folklore: ['mujo-avenges-halil'],
    location: { status: 'planning', plan: "mustered from Llabutani's proposed kulla down the frontier road" },
    tales: { 'mujo-avenges-halil': 'shkjaCeta' },
  },
}
