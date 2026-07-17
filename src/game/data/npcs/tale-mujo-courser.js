// NPCs new to "Mujo's Courser" (Gjogu i Mujit) — see ../npcs/_SCHEMA.md for
// the format contract. This file is owned by its tale: agents editing other
// tales must not touch it. Mujo himself is NOT duplicated here — he is the
// core NPC `mujo` in core-world.js, linked from the tale file's cast. Halili
// is likewise NOT duplicated here — tale-muji-e-behuri.js's `halili` entry is
// the registry's canonical Sokol Halili; this tale's own cast just links
// `npc: 'halili'` (see mujo-courser.js) rather than redefining him, matching
// the pattern ali-bajraktari.js and mujo-avenges-halil.js already use.
// ===========================================================================

export default {
  ajkuna: {
    name: 'Ajkuna', glyph: '👩', kind: 'human',
    role: 'Mujo\'s wife, keeper of Jutbina\'s hearth and stable',
    backstory:
      'Mujo\'s wife at Jutbina: the one who confirms his midnight dream of the courser\'s birth, and who raises the foal in strict secrecy for three full years on his order — wheat instead of barley, wine instead of water, never once let into daylight. The songs will later make her the mother of Omer and the singer of the cycle\'s own great lament (death-of-omer) — this tale is years before that grief, and this is her first appearance in the cycle\'s own timeline.',
    folklore: ['mujo-courser'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'mujo-courser': 'ajkuna' },
  },
  krajloKapedani: {
    name: 'Krajlo Kapedani', glyph: '👑', kind: 'human',
    role: 'the Captain King of the courser song, the Krajl across the frontier',
    backstory:
      'The Slav king whose jealousy over Mujo\'s courser sets the whole song moving: he first tries to ring Mujo in with his own army, then buys Arnaut Osmani\'s plan to steal the horse outright, and ends the tale resigned to having Mujo himself as a son-in-law by trickery. "Krajl" and "Kapidan" are epic TITLES the songs give many different antagonists, not one ruler — this Krajlo Kapedani is a distinct figure from the Krajl who fathers Rusha of the Zuku Bajraktar song (rusha1/rushaFund) and from the captain slain in Mujo Avenges Halili (mejdan1/mujoHak1); none of them the same man.',
    folklore: ['mujo-courser'],
    location: { status: 'planning', plan: 'the Krajl\'s court across the frontier (proposed "krajlia", off the jutbina hub)' },
    tales: { 'mujo-courser': 'krajl' },
  },
  arnautOsmaniGjogut: {
    name: 'Arnaut Osmani', glyph: '🐍', kind: 'human',
    role: 'Mujo\'s own neighbor at Jutbina, who sells him out for a king\'s purse',
    backstory:
      'A highlander of Jutbina itself, close enough to Mujo to be asked as his son\'s kumbar (godfather) at the hair-cutting feast — and it is exactly that trust he sells to the Krajl for three hundred purses, engineering the theft of Mujo\'s own courser down to the smallest detail. Once the plan lands he vanishes from the song for good, unpunished within it; NOT a foreign spy — the betrayal cuts deeper for coming from inside the hamlet. NOT the besieged hero of arnaut-osmani.js\'s own eponymous song (that Osmani endures a Krajl\'s dungeon and frees his eleven companions by a corpse-trick) and NOT the envious duelling companion of gjeto-basho-muji.js\'s own entry (arnautOsmaniMejdanit) — the epic gives this same popular name to more than one man across its songs, exactly as it does with Zuku and with Halili elsewhere in this registry. This song\'s Osmani alone is the inside man who sells out his own neighbor.',
    folklore: ['mujo-courser'],
    location: { status: 'planning', plan: 'his own household within Jutbina (proposed "osmani", off the jutbina hub)' },
    tales: { 'mujo-courser': 'osmani' },
  },
  raspodini: {
    name: 'Çoban Raspodini', glyph: '🐑', kind: 'human',
    role: 'the Slavic shepherd whose face and clothes let Mujo walk unknown into the Kingdom',
    backstory:
      'A shepherd of the Krajl\'s own highlands, said to favor Mujo closely enough that people remarked on it. Mujo trades caps with him on a false pretext, then kills him outright and takes his clothes and his crook — the disguise that carries the whole second half of the song. He never speaks again after the trade of caps; the disguise is the last anyone hears of him.',
    folklore: ['mujo-courser'],
    location: { status: 'placed', node: 'mali1' },
    tales: { 'mujo-courser': 'raspodini' },
  },
  rushaKrajlise: {
    name: 'Rusha', glyph: '👸', kind: 'human',
    role: 'the Krajl\'s daughter, given as a bride down the frontier road and captured whole',
    backstory:
      'Daughter of Krajlo Kapedani, dressed in her bridal garments and sent out with three hundred armed escorts under the man she knows only as Shepherd Raspodini — who is Mujo in disguise, and who halts the whole train in an open meadow and claims her for his own household. NOT the Rusha of the Zuku Bajraktar song (rusha1/rushaFund), who is won by a sworn besa from her father\'s own tower — "Rusha" is a stock name the songs give more than one Krajl\'s daughter, and this one is taken by the courser song\'s own raid, not by any oath.',
    folklore: ['mujo-courser'],
    location: { status: 'planning', plan: 'the Krajl\'s court across the frontier (proposed "krajlia", off jutbina) — brought to Jutbina at the tale\'s end' },
    tales: { 'mujo-courser': 'rusha' },
  },
  galiqeGalani: {
    name: 'Galiqe Galani', glyph: '🗯️', kind: 'human',
    role: 'a courtier of the Krajl\'s court who misjudges Mujo',
    backstory:
      'Speaks up once, at the Krajl\'s own council, to dismiss the rider on the plain as no fighter — only Mujo breaking in a colt, easily taken prisoner. He is wrong, the king\'s whole army fails to take Mujo, and Galiqe Galani is never heard from again in the song.',
    folklore: ['mujo-courser'],
    location: { status: 'planning', plan: 'the Krajl\'s court (proposed "krajlia"/"fusha", off jutbina) — a single scene, then gone' },
    tales: { 'mujo-courser': 'galiqe' },
  },
  shkina: {
    name: 'shkina', glyph: '👵', kind: 'human',
    role: 'a Slavic woman of the wedding party who recognizes Mujo',
    backstory:
      'Among the Krajl\'s own people at the wedding feast, she alone looks closely enough to know Gjeto Basho Mujo behind the shepherd\'s disguise and warns the escorts outright — who laugh her down as a foolish old woman making a Turk out of a Slav. She is proven right within the day, but no one believed her in time.',
    folklore: ['mujo-courser'],
    location: { status: 'planning', plan: 'among the Krajl\'s people across the frontier (proposed "krajlia", off jutbina)' },
    tales: { 'mujo-courser': 'shkina' },
  },
  shkjaKrushqit: {
    name: 'treqind krushqit', glyph: '🏇', kind: 'collective',
    role: 'the Krajl\'s three hundred armed wedding escorts',
    backstory:
      'Three hundred picked men of the Krajl\'s own people, saddled and armed to escort Rusha down the frontier road — led, unknowingly, by Mujo himself in Raspodini\'s clothes. When he throws off the disguise in an open meadow, not one of them dares lift a hand against him; all three hundred are marched to Jutbina as captives. NOT the village\'s own wedding-train (krushqit, core-village.js) — a foreign war-band forced into a wedding party, not a hamlet\'s own joyful custom.',
    folklore: ['mujo-courser'],
    location: { status: 'planning', plan: 'the Krajl\'s own people across the frontier (proposed "krajlia"/"fusha", off jutbina) — captured whole and brought to Jutbina' },
    tales: { 'mujo-courser': 'escort' },
  },
}
