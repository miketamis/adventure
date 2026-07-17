// NPCs new to "The Death of Omer & Ajkuna's Lament" — see ../npcs/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it. Mujo himself is NOT duplicated here — he is
// the core NPC `mujo` in core-world.js, linked from the tale file's cast.
// ===========================================================================

export default {
  halilVellaiMujit: {
    name: 'Sokol Halili', glyph: '🦅', kind: 'human',
    role: 'kreshnik of Jutbina, Mujo\'s younger brother',
    backstory:
      'Mujo\'s own blood brother and the frontier\'s second hero — the fast, reckless younger half of the pair, sent alone into the Kingdom to win his own bride in "The Marriage of Halili," and here sent to scout the Rugged Peak while Mujo minds young Omer. He hears his nephew\'s dying groan from a mountain away, rides beside Mujo to the rescue, and is the one who finally tells Ajkuna the plain truth her husband won\'t. NOT a separate "Halil" of any other cycle — the one sworn brother of Mujo the whole kreshnik cycle turns on.',
    folklore: ['kreshnik-epic', 'halil-marriage', 'death-of-omer', 'mujo-avenges-halil'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'death-of-omer': 'halil' },
  },
  ajkunaGruaMujit: {
    name: 'Ajkuna', glyph: '😢', kind: 'human',
    role: 'Mujo\'s wife, Omer\'s mother',
    backstory:
      'Wife to Gjeto Basho Mujo and mother to a line of sons all named Omer, each raised knowing his father\'s trade and each lost to it in turn — seven before this one, by her own count; eight, by her husband\'s, cursing the pastures afterward. Kept from this son\'s death first by a lie and then by her husband\'s bare roof, she walks alone to his grave in the Green Valleys and curses the moon for its silence; only the mountain oras keep her from breaking there for good, and lead her home. NOT nenaMujit (Mujo\'s OWN mother, who raised him a cowherd and never appears again after his youth) — a different woman, a different grief, a generation apart.',
    folklore: ['kreshnik-epic', 'death-of-omer', 'vajtim'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'death-of-omer': 'ajkuna' },
  },
  omeriMujit: {
    name: 'Omer', glyph: '🏹', kind: 'human',
    role: 'Mujo\'s son, barely a man, killed on his first raid',
    backstory:
      'The latest in a line of sons Mujo and Ajkuna have named Omer and lost in turn — sent alone against a border chapel full of Slavs to prove himself, he holds the barred door through nine gunshot wounds and dies asking only that his mother be spared the truth, and told instead that he has gone to stay with his uncles. NOT the earlier Omers his mother still mourns and cannot find the graves of — this is the one the songs actually follow, from the three dishes to the tombstone.',
    folklore: ['kreshnik-epic', 'death-of-omer'],
    location: { status: 'placed', node: 'omer1' },
    tales: { 'death-of-omer': 'omer' },
  },
  popiKishes: {
    name: 'prifti i kishës', glyph: '⛪', kind: 'human',
    role: 'the Slavic priest of the border chapel',
    backstory:
      'Keeper of the white kulla-chapel on the flat land across the border from Jutbina — walks to open it at first light on what he does not know is his last Sunday, and is shot dead by the boy holed up inside before he ever reaches the door. Never named beyond his office; his death is what raises the whole Kingdom against Omer. NOT prifti in tale-bear-dervish.js (a village priest a world away, with no quarrel of his own) — a different man, a different tale.',
    folklore: ['death-of-omer'],
    location: { status: 'placed', node: 'omer1' },
    tales: { 'death-of-omer': 'popi' },
  },
  grueShkine: {
    name: 'shkinja e prezores', glyph: '🖋️', kind: 'human',
    role: 'a Slavic woman of the Kingdom who tricks Omer with two false portraits',
    backstory:
      'During the siege of the chapel she sketches Mujo\'s likeness and holds it to the window, then Halili\'s with a rope drawn at the throat, telling the barred boy each in turn is dead — hoping to draw him out to be killed. Omer sees through the first lie; the second, his uncle\'s portrait, is what finally dims his sight with grief, though both men are alive and unhurt outside. Never named beyond what she is to the Kingdom\'s side of the story; no other tale in this world uses her.',
    folklore: ['death-of-omer'],
    location: { status: 'placed', node: 'omer1' },
    tales: { 'death-of-omer': 'grueShkine' },
  },
  shkjetKrajlise: {
    name: 'shkjetë e Krajlisë', glyph: '⚔️', kind: 'collective',
    role: 'the Slavic soldiers of the Kingdom across the border',
    backstory:
      'Rally in their hundreds to avenge their priest, ring the chapel where Omer holds out alone, and cannot force the door; when Mujo and Halili come down on them in the rescue, God grants the brothers the field, and the shkjet who are not cut down break and run for good. The Kingdom\'s standing army wherever the frontier songs need a mass of foreign spears — not any one named rival.',
    folklore: ['kreshnik-epic', 'death-of-omer'],
    location: { status: 'placed', node: 'omer1' },
    tales: { 'death-of-omer': 'shkjet' },
  },
  oretBjeshkes: {
    name: 'orët e bjeshkës', glyph: '✨', kind: 'mythic',
    role: 'the mountain oras of the Green Valleys, who comfort Ajkuna at the grave',
    backstory:
      'Fate-spirits of the high pastures where Omer lies buried — they cannot bear to watch Ajkuna keen herself to pieces over his grave, so they still her wailing mouth, calm her breaking heart, dry her tears, and walk her back down to Jutbina themselves. A kind, not a name: NOT orët e Gjakovës (tale-gjakova-cavern.js\'s guardian-oras, a world away at the dead city\'s bazaar) and NOT the forest crone of the road-end clearing (plakaPyllit, core-village.js, who may or may not be an Ora at all) — these belong only to this one grief, in these Green Valleys.',
    folklore: ['ora', 'death-of-omer'],
    location: { status: 'placed', node: 'omer2' },
    tales: { 'death-of-omer': 'oret' },
  },
}
