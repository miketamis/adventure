// NPCs: the village (walking routes + placed figures) — see ../npcs/_SCHEMA.md for the format contract.
// One file per area/tale so parallel agents never collide.

export default {
  // ── the village: walking routes (live schedules in npcs.js) ──────────────
  elira: {
    name: 'Elira', glyph: '👩', kind: 'human',
    role: 'the traveller’s first acquaintance and a resident of the village square',
    backstory: 'Elira meets the traveller at the old bridge while leaving the village. She keeps a promise to wait briefly on the far bank or meet at an agreed hour in the square, then continues along the real river road and remains a familiar face in the village.',
    folklore: [],
    location: { status: 'walking', route: ['start', 'fshatiLumi', 'fshatiSheshi'] },
  },
  gruaUji: {
    name: 'gruaja me ujë', glyph: '🏺', kind: 'human',
    role: 'the water-carrier of the village',
    backstory: 'When the old well went dry she became the village\'s water: every daylight hour she walks spring → river bank → square with the full jugs and back down with the empty ones. At night the spring is quiet, and so is she.',
    folklore: [],
    location: { status: 'walking', route: ['kroi1', 'fshatiLumi', 'fshatiSheshi'] },
  },
  krushqit: {
    name: 'krushqit me nusen', glyph: '🐎', kind: 'collective',
    role: 'the wedding train, riding the bride in',
    backstory: 'An old dasma runs for days and the riding never stops: the krushqit go out over the tanners\' bridge and bring the bride in on horseback, up through the river quarter to the square and the long feast.',
    folklore: ['dasma'],
    location: { status: 'walking', route: ['start', 'fshatiLumi', 'fshatiSheshi', 'dasma1'] },
  },
  plakaPyllit: {
    name: 'plaka e ftohtë', glyph: '👵', kind: 'mythic',
    role: 'the cold old woman of the night forest',
    backstory: 'At nightfall she comes out of the deep wood to the road-end clearing; a burning fire draws her to sit, and the guest arc opens. The tales hold she is an Ora in an old woman\'s shape — wait beside her too long and she may prove a Shtriga instead. NOT the crossroads crone (plakaUdhekryqit) — this one never leaves the trees.',
    folklore: ['ora', 'shtriga'],
    location: { status: 'walking', route: ['pylliLoop', 'lendina'] },
  },
  xhindet: {
    name: 'Xhindët', glyph: '👣', kind: 'collective',
    role: 'the unseen ones of the dark hours',
    backstory: 'Out of the dry well\'s mouth after dark, across the sleeping square and river quarter to the mill, then back before light. The village never sees them; a night-walking stranger might.',
    folklore: ['xhindet'],
    location: { status: 'walking', route: ['pusiThate', 'fshatiSheshi', 'fshatiLumi', 'mulli1'] },
  },
  plakuSheshit: {
    name: 'plaku i sheshit', glyph: '👴', kind: 'human',
    role: 'the old man of the square — and the oda\'s evening host',
    backstory: 'He keeps a fixed day you can set a clock by: mornings on the square watching the dry well, every evening in the oda among the men. The oda\'s welcome, the travellers\' tales, the long nights of the lahutë — his hearth hosts them all.',
    folklore: ['mikpritja-oda'],
    location: { status: 'walking', route: ['fshatiSheshi', 'oda1'] },
  },
  bari: {
    name: 'bariu me dhitë', glyph: '🐐', kind: 'human',
    role: 'the shepherd of the village flock',
    backstory: 'At the homes around first light, out at the pasture with the goats through the working day (his guard-the-flock wage lives there), home again at dusk.',
    folklore: ['stani'],
    location: { status: 'walking', route: ['fshatiJeta', 'bariu'] },
  },
  femijet: {
    name: 'fëmijët me dordolecin', glyph: '🧒', kind: 'collective',
    role: 'the children with the rain-child',
    backstory: 'They roam between the square and the back lanes with their dordolec rain-game — help them wherever you catch them.',
    folklore: ['dordoleci'],
    location: { status: 'walking', route: ['fshatiSheshi', 'fshatiLanes'] },
  },

  // ── the village: placed figures ───────────────────────────────────────────
  plaka: {
    name: 'plaka te porta', glyph: '🚪', kind: 'human',
    role: 'the old woman at the gate of Aga Ymer\'s kulla',
    backstory: 'She keeps the gate of the tower where, in the village\'s prose telling, Aga Ymer\'s wife waited nine years and nine days. She has watched one faith kept to its exact sworn deadline; she does not expect yours to be shorter.',
    folklore: ['aga-ymer'],
    location: { status: 'placed', node: 'plaka' },
  },
  agaYmer: {
    name: 'Aga Ymeri', glyph: '🗡️', kind: 'human',
    role: 'the man who came back after nine years and nine days',
    backstory: 'Married one night before the Sultan\'s war-letter reached him, he fought, lost his horse, took a wound, and was held prisoner in a foreign king\'s land for a ransom his own Sultan never sent. This village arc follows Kuteli\'s prose telling: his wife waits exactly nine years and nine days. The separately recorded sung Ulcinj ballad followed by “Kostandini i Vogël” gives a three-year vow; these are named variants, not one blurred chronology. Freed on nothing but his sworn word, he rode home the very day his wife was to be remarried, was known by the scar on his arm, then rode straight back into the captor\'s cell; the astonished king freed him outright. The kulla in the back lanes is his. NOT Gjergj Elez Alia (bregu) and NOT the dead brother of Constantine and Doruntine — a living captive\'s ransom-word, not a dead brother\'s besa sworn to the grave.',
    folklore: ['aga-ymer', 'besa'],
    location: { status: 'placed', node: 'agaYmer1' },
    tales: { 'aga-ymer': 'ymer', 'kostandini-i-vogel': 'agaYmer' },
  },
  tregtari: {
    name: 'tregtari', glyph: '⚖️', kind: 'human',
    role: 'the merchant of the surface Gjakova pazar stall',
    backstory: 'Bread, salt, a lahutë on the wall, and a fair price for mountain tea — Gjakova\'s standing trade outside the cavern. He buys what the roads bring and sells what the roads need.',
    folklore: [],
    location: { status: 'placed', node: 'tregtari' },
  },
  sheruesi: {
    name: 'sheruesi', glyph: '🌿', kind: 'human',
    role: 'the healer of living surface Gjakova',
    backstory: 'Outside the cavern, in living Gjakova, a healer keeps herbs for travellers and townspeople. Ask, pay, be whole; the dead city below has no healer and no inhabitants.',
    folklore: [],
    location: { status: 'placed', node: 'sheruesi' },
  },
  bujtinari: {
    name: 'bujtinari', glyph: '🛏️', kind: 'human',
    role: 'the innkeeper of the surface Gjakova bujtina',
    backstory: 'A bed for the night, coffee with the guest, a fortune read in the cup — his inn serves travellers in living Gjakova, outside the cavern whose ancient city below has no inhabitants.',
    folklore: [],
    location: { status: 'placed', node: 'bujtina' },
  },
  kostandini: {
    name: 'Kostandini', glyph: '🐎', kind: 'mythic',
    role: 'the dead rider who kept his besa',
    backstory: 'He promised his mother he would bring his sister home, and the grave did not excuse him: Kostandin i vdekur rode by night with Doruntina behind him, and lay back down when the word was kept. His stone stands by the church.',
    folklore: ['kostandin-doruntina', 'besa'],
    location: { status: 'placed', node: 'kostandin1' },
  },

}
