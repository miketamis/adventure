// NPCs new to "Zuku Bajraktar" / "Zuku merr Rushën" — see ../npcs/_SCHEMA.md
// for the format contract. This file is owned by its tale: agents editing
// other tales must not touch it. Mujo is NOT duplicated here — he is the core
// NPC `mujo` in core-world.js, linked from the tale file's cast.
// ===========================================================================

export default {
  // zuku — Zuku Bajraktari — is the shared canonical figure in core-kreshnik.js
  // (kept at node zuku1); this, his fullest song, reuses it by the cast npc link.
  nenaZukut: {
    name: 'e ëma e Zukut', glyph: '🔥', kind: 'human',
    role: 'the mother who blinded her own son for a captive she desired',
    backstory:
      'Unnamed in the song, she desires her son\'s own prisoner the moment she sees him through a locked door, and buys his promise of marriage with a plot: taunt Zuku into being bound with ten ropes (as his legendary father once was), then blind both the boy and his courser with heated pokers and abandon them on the mountain. When Zuku returns as a disguised beggar to kill the baloz and reveal himself, she defends her dead lover and then begs for her own life — and is bound instead to a felled beech at the crossroads and burned. NOT the crossroads crone of three-friends (a different region, a different old woman, a different fate) — this mother\'s crime and death are hers alone.',
    folklore: ['zuku-bajraktar'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'zuku-bajraktar': 'nenaZukut' },
  },
  balozSedelija: {
    name: 'Baloz Sedelija', glyph: '⚔️', kind: 'human',
    role: 'the captured shkja captain who plots with Zuku\'s own mother',
    backstory:
      'A Slavic frontier fighter Zuku takes alive after killing his companion Smilaliq Alija in the same skirmish. Locked in the innermost chamber of Zuku\'s own house, he is too afraid of his captor\'s strength to accept the mother\'s offer of freedom and marriage outright — until she promises to blind the boy herself. He feasts and sleeps in the house he was a prisoner in, and is cut down by the very hero he feared the moment that hero walks back in as a beggar. "Baloz" here names a RANK among the shkja fighters (a captain), not a species — NOT the core Balozi i Detit (the sea-champion of Gjergj Elez Alia\'s song), who is a wholly different, semi-mythic figure from a different sea and a different story; this Baloz Sedelija rides, talks, plots and dies exactly like the human captain he is.',
    folklore: ['zuku-bajraktar'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'zuku-bajraktar': 'balozSedelija' },
  },
  smilaliqAlija: {
    name: 'Smilaliq Alija', glyph: '🏹', kind: 'human',
    role: 'the shkja raider cut down at the very start of the song',
    backstory:
      'One of two shkja fighters Zuku\'s ora points out to him through his field-glass on an empty mountain pasture. He falls to Zuku\'s sabre in the same stroke that takes Baloz Sedelija prisoner alive — a single line of the song, and no more.',
    folklore: ['zuku-bajraktar'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'zuku-bajraktar': 'smilaliqAlija' },
  },
  oratMalit: {
    name: 'orët e malit', glyph: '🌸', kind: 'collective',
    role: 'Zuku\'s guardian ora and her kind — warn him at the hunt, heal him on the mountain',
    backstory:
      'Zuku\'s own ora (his personal guardian spirit) watches over him unseen from the song\'s first lines, correcting his curse on an empty pasture by pointing out real game through his field-glass. Later, blinded and abandoned, it is the mountain\'s oras — her own kind, drawn by his courser\'s cries — who find him, bind him to a sworn vow of vengeance, and restore his sight with three drops from a crushed mountain flower. Treated here as one guardian kind rather than two separate figures, since the song itself never distinguishes them. NOT the world-below Fatet (the three Fates who weigh the lost) and NOT any single named Zana — an ora is a personal guardian spirit, met here only in Zuku\'s own story.',
    folklore: ['zuku-bajraktar', 'ora'],
    location: { status: 'placed', node: 'zuku1' },
    tales: { 'zuku-bajraktar': 'oratMalit' },
  },
  mikuZukut: {
    name: 'miku i Zukut', glyph: '🧑‍🤝‍🧑', kind: 'human',
    role: 'the wise friend who plans the beggar\'s disguise',
    backstory:
      'Zuku\'s one true friend, at whose house the healed but weakened hero rests ten days and nights to recover his strength. On hearing of the sworn vow of vengeance, he is the one who devises the plan that gets Zuku past his own mother\'s door unrecognized: rags, a torn sack, a beggar\'s staff, and a little grain to gather at her feet. Never named beyond "miku," and never seen again once the plan is set in motion.',
    folklore: ['zuku-bajraktar'],
    location: { status: 'placed', node: 'zuku2' },
    tales: { 'zuku-bajraktar': 'mikuZukut' },
  },
  gjoguZukut: {
    name: 'gjogu i Zukut', glyph: '🐴', kind: 'creature',
    role: 'Zuku\'s first courser — blinded alongside his rider, then set loose',
    backstory:
      'Ridden out to the hunt at the song\'s start, blinded with heated pokers the same midnight as his rider, and abandoned with him at the mountain\'s peak. He and Zuku weep and lament together, each too weak and blind to help the other, until his own shrieking neigh — deafening the whole mountain pasture — draws the oras who heal Zuku (though the song never says whether the courser\'s own sight was ever restored). Sent to wander free while Zuku goes disguised as a beggar, he is somehow at his rider\'s side again by the final reckoning, exactly as Zuku himself boasts to his mother. NOT gjogSeteVjet, the seven-year courser kept in the cellar for the second ride — two different mounts for two different rides — NOT gjogu, Mujo\'s own oracular grey (core-kreshnik.js), and NOT gjoguGjergjit, the war-courser of Gjergj Elez Alia\'s own song.',
    folklore: ['zuku-bajraktar'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'zuku-bajraktar': 'gjogu' },
  },
  // agatJutbines — the Agas of Jutbina — is the shared canonical figure in core-kreshnik.js.
  rusha: {
    name: 'Rusha', glyph: '👰', kind: 'human',
    role: 'the Krajl\'s daughter across the frontier, won by a besa and a horse-race',
    backstory:
      'Kept in her father the Krajl\'s tower across the frontier, she will not open her door by night to any voice that might be Gjeto Basho Mujo or young Halil Aga — only when Zuku raises his hand to her window and she knows his coat-sleeve and the ring he once gave her does she let him in. She refuses even his coffee until he has her besa that she\'ll do as he says; once she gives her word she dresses in her finest, fills her pockets with ducats, and rides home behind him to Jutbina — and is very nearly lost to Mujo\'s counter-claim before a cadi\'s horse-race settles it in Zuku\'s favor. NOT the game\'s own generic "rusha1" scene\'s unnamed nod to a besa of "free will" — the song\'s own besa is a promise of obedience, freely given.',
    folklore: ['zuku-bajraktar'],
    location: { status: 'placed', node: 'rusha1' },
    tales: { 'zuku-bajraktar': 'rusha' },
  },
  krajliRushes: {
    name: 'Krajli', glyph: '👑', kind: 'human',
    role: 'Rusha\'s father, ruling his tower across the frontier',
    backstory:
      'The Slav king in whose kulla Rusha is kept — named only by his standing title, never staged directly in either song, and never so much as mentioned reacting to his daughter\'s ride to Jutbina. "Krajl" names a standing office of the frontier\'s Slavic enemy across many kreshnik songs, the way "kulshedra" names a kind and not one beast; NOT the Krajl who once held Muji alone at the game\'s own halil1/halilFund tower, and NOT the Krajl of tale-arnaut-osmani\'s coal-and-corpse song — each song\'s Krajl is his own man, and this one is Rusha\'s father alone.',
    folklore: ['zuku-bajraktar'],
    location: { status: 'placed', node: 'rusha1' },
    tales: { 'zuku-bajraktar': 'krajli' },
  },
  kadiu: {
    name: 'kadiu', glyph: '⚖️', kind: 'human',
    role: 'the Ottoman-appointed judge caught between two threats',
    backstory:
      'Called on only after the Kanun\'s own pleqësia (council of elders) fails to settle whose bride Rusha is, the cadi is threatened with death by Mujo and then by Zuku in turn, whichever way he might rule. Three sleepless days and nights he puzzles over it until, he says, God himself sends him the answer: a horse-race on the war grounds, the maiden to whoever\'s courser reaches her first. Never named beyond his office, and never seen again once the race is run.',
    folklore: ['zuku-bajraktar'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'zuku-bajraktar': 'kadiu' },
  },
  gjogSeteVjet: {
    name: 'gjogu shtatë-vjeçar', glyph: '🐎', kind: 'creature',
    role: 'the courser kept seven years in Zuku\'s own cellar, saddled for the ride to Rusha',
    backstory:
      'Shut away seven years in the dark cellar of Zuku\'s house, never once seeing sunlight, until the mother comes down in tears to saddle it for her son\'s ride into the Krajl\'s land — and the courser, feeling the cellar "drip" for the first time, learns from her why: it fears for both their lives. It carries Zuku by night to Rusha\'s kulla and back, and wins the deciding race on the war grounds outright when Mujo\'s own courser shies at the last stride. NOT gjoguZukut, the courser blinded alongside Zuku in the first song — a different mount for a different ride, kept safe at home the whole time that story unfolded.',
    folklore: ['zuku-bajraktar'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'zuku-bajraktar': 'gjogSeteVjet' },
  },
}
