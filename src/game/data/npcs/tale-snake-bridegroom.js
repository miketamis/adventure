// NPCs: the snake-bridegroom tale cast — see ../npcs/_SCHEMA.md for the
// format contract. One file per area/tale so parallel agents never collide.
//
// REUSED (not defined here, linked via cast[].npc in the tale file):
//   dielli (core-world) — the Sun; hena (core-world) — the Moon;
//   mbretiSarajit (tale-half-rooster) — the SAME petty saraj king: half a
//   rooster took his gold, a snake out-palaced him and took his daughter.

export default {
  // ── the snake's household ─────────────────────────────────────────────────
  plakaGjarprit: {
    name: 'plaka me gjarprin', glyph: '🪵', kind: 'human',
    role: 'the childless old woman who kept a snake for a son',
    backstory: 'She owned nothing but a cottage and her daily walk to the forest for wood — until a snake rode home in the bundle and she kept it for the son she never had. Twice kicked down the king\'s stairs for her son\'s wooing (once on a leg the ring had to mend), she woke mid-wonder in a palace with a maid\'s bell, and lived to see her snake come home a man. Distinct from every other crone: NOT the crossroads crone (plakaUdhekryqit), NOT the cold old woman of the forest (plakaPyllit), NOT the gate-keeper (plaka), NOT the cat-keeping old woman (plakaMaces), NOT the three sisters\' dying mother (nenaTriMotrave).',
    folklore: ['snake-bridegroom'],
    location: { status: 'planning', plan: 'lives at the proposed snake-mother\'s cottage at the poor edge of the village-life quarter (fshatiJeta) — the spot that stood one era as the snake\'s palace' },
    tales: { 'snake-bridegroom': 'oldWoman' },
  },
  shpejti: {
    name: 'Shpejti, gjarpri-dhëndër', glyph: '🐍', kind: 'mythic',
    role: 'the snake bridegroom — snake by day, a man named Swift by night',
    backstory: 'A snake that slipped into a woodgatherer\'s bundle and grew up asking for the king\'s daughter; his ring healed a broken leg, raised a palace overnight, spanned a silk road and breathed out four hundred horsemen. By night he shed the skin and stood a young man, Shpejt — on the one rule that his wife never tell; named aloud at a wedding, he vanished to a Kulshedra\'s larder beyond the sea, and there HIS wit (the bread-crust sweep, the salted cauldrons, the coffin) undid the beast and unmade the spell for good. NOT the vitore house-serpent (a luck-snake fed milk in the wall, never wed out), NOT the great serpent of the world-below threshold (gjarpri), NOT Bolla.',
    folklore: ['snake-bridegroom', 'vitore'],
    location: { status: 'planning', plan: 'lives, a man for good, at the proposed snake\'s palace-cottage (fshatiJeta); the game tells his story as the vignette at the serpent\'s cave (gjarperOrigin…gjarperBurrFund at bota2)' },
    tales: { 'snake-bridegroom': 'snake' },
  },
  nusjaGjarprit: {
    name: 'nusja e gjarprit', glyph: '👰', kind: 'human',
    role: 'the king\'s daughter who wed the snake — and walked the world in iron to win him back',
    backstory: 'Promised by her father\'s own unbreakable word, she screamed at the snake and married the man under the skin. Her tongue broke the one rule — goaded by her mother\'s praise of the beautiful dancer — and she paid the old price in full: an iron-shod pair, a matching staff, a case for the road, and the doors of the Sun, the Moon and the Wind, until one gust carried her over the sea. In the Kulshedra\'s house she kept the silence, swept with a bread crust and salted the cauldrons at her husband\'s word, and came home with him for good. NOT the moat-king\'s daughter (princesha, Ylli\'s wife), NOT the Sun\'s maiden (vajzaDiellit).',
    folklore: ['snake-bridegroom'],
    location: { status: 'planning', plan: 'settles with Shpejti at the proposed snake\'s palace-cottage (fshatiJeta)' },
    tales: { 'snake-bridegroom': 'bride' },
  },
  mbretereshaSarajit: {
    name: 'mbretëresha e sarajit', glyph: '👸', kind: 'human',
    role: 'the saraj king\'s wife — the mother whose praise broke the secret',
    backstory: 'Wife of the plain\'s petty king (mbretiSarajit) and mother of the snake\'s bride. She confirmed the overnight palace out the window, lamented the snake-wedding as worse than death, wept over a daughter who called herself lucky — and at the great dasma praised the heaven-sent dancer to his own wife, the goad that burst the secret. NOT the black-palace queen (mbretereshaZeze) — that grieving mother\'s only child belongs to the Sun.',
    folklore: ['snake-bridegroom'],
    location: { status: 'planning', plan: 'keeps the saraj proposed up the plain road from udhekryq, beside the king' },
    tales: { 'snake-bridegroom': 'queen' },
  },
  kaloresitUnazes: {
    name: 'kalorësit e unazës', glyph: '🐎', kind: 'collective',
    role: 'the four hundred horsemen breathed out of the snake\'s ring',
    backstory: 'One midnight breath on the ring and they stood ready — four hundred on horseback, a rider dressed in every color the earth holds. They guarded the overnight palace, rode the bride-fetching train singing a ballad with a snake in the saddle, and carried the bride home in state. Creatures of the ring, not of any king\'s muster: NOT the krushqit of the village dasma (a human wedding train), NOT the saraj\'s servants.',
    folklore: ['snake-bridegroom'],
    location: { status: 'planning', plan: 'stand their watch around the proposed snake\'s palace-cottage (fshatiJeta) in the tale\'s era' },
    tales: { 'snake-bridegroom': 'attendants' },
  },

  // ── the sky households ────────────────────────────────────────────────────
  nenaDiellit: {
    name: 'Nëna e Diellit', glyph: '🕯️', kind: 'mythic',
    role: 'the Mother of the Sun — keeper of his table in the compound above',
    backstory: 'The mother-goddess of the sky keeps the Sun\'s house: she calls off the sun-children, hides desperate guests, and wrings from her tired, flesh-hungry son the promise that makes him answer questions instead of eating the asker. The village knows her too — each spring the girls bury her clay doll with real weeping (the nenaDiellFund rite) so that, mourned, she returns green with the year; the doll dies in the village, the mother keeps the table in the sky.',
    folklore: ['nena-e-diellit', 'dielli', 'snake-bridegroom'],
    location: { status: 'placed', node: 'diellShtepi1' },
    tales: { 'snake-bridegroom': 'sunMother' },
  },
  femijetDiellit: {
    name: 'fëmijët e Diellit', glyph: '🌟', kind: 'collective',
    role: 'the sun-children of the compound above',
    backstory: 'The Sun\'s young tumble about the compound while he rides his day\'s round. They fly at the smell of a human like their father hungers at it — and drop it the moment their grandmother speaks. NOT the maiden tale\'s house-Kulshedra, which shares the same compound with appetites of its own.',
    folklore: ['dielli', 'snake-bridegroom'],
    location: { status: 'placed', node: 'diellShtepi1' },
    tales: { 'snake-bridegroom': 'sunChildren' },
  },
  era: {
    name: 'Era', glyph: '🌬️', kind: 'mythic',
    role: 'the Wind — the carrier who knows where the lost are held',
    backstory: 'The travelling gale of the wonder-tales: out gusting across the world, home to his mother\'s hearth for breakfast, hungry enough to ask for human flesh and honest enough to be bound by his word once given. What the all-seeing day and the night\'s lamp never glimpsed, he knew — the Kulshedra\'s prisoner beyond the sea — and he carried the iron-shod bride over the water in one gust. NOT Shurdhi (the hail-hurler driven off with banged iron) and NOT i Verbti (the fire in the wind): the weathers are neighbours in one sky-corner, not one being.',
    folklore: ['snake-bridegroom', 'shurdhi'],
    location: { status: 'planning', plan: 'lives at the proposed Wind\'s house in the winds\' corner of the sky (qiellErera1)' },
    tales: { 'snake-bridegroom': 'wind' },
  },
  nenaEres: {
    name: 'nëna e Erës', glyph: '🧶', kind: 'mythic',
    role: 'the Wind\'s elderly mother — keeper of the hearth of the winds',
    backstory: 'She keeps the hearth the gale comes home to. Like the Sun\'s mother she calls off the devouring children, hides the desperate guest, and will not bring the human out until her son\'s word of honour is on the table — the third and kindest of the three sky-mothers on the seeker\'s road. NOT Nëna e Diellit: two hearths, two mothers, one courtesy.',
    folklore: ['snake-bridegroom'],
    location: { status: 'planning', plan: 'keeps the proposed Wind\'s house at the winds\' corner of the sky (qiellErera1)' },
    tales: { 'snake-bridegroom': 'windMother' },
  },
  femijetEres: {
    name: 'fëmijët e Erës', glyph: '🍃', kind: 'collective',
    role: 'the little wind-children of the sky-corner',
    backstory: 'The small gusts of the Wind\'s house: they come blowing round any stranger to devour her, and scatter at one word from the old mother. Weather in miniature — appetite and obedience in the same breath.',
    folklore: ['snake-bridegroom'],
    location: { status: 'planning', plan: 'blow about the proposed Wind\'s house at the winds\' corner of the sky (qiellErera1)' },
    tales: { 'snake-bridegroom': 'windChildren' },
  },

  // ── beyond the sea ────────────────────────────────────────────────────────
  kulshedraPertejdetit: {
    name: 'kulshedra e përtej detit', glyph: '🐉', kind: 'creature',
    role: 'the over-sea Kulshedra that kept Swift — and climbed into its own coffin',
    backstory: 'She kept a house in the far shore\'s mountains, drank at its spring, and ran her larder like a household: captives fed fat, called "daughter", set impossible chores — a house swept and unswept, two cauldrons of tears. She read Swift\'s hand in every trick but fell to the last one, climbing into the coffin built "for his corpse" and burning in it. A kulshedra is a KIND, not a name: NOT kulshedraMadhe (the world-below duel), NOT the Sun\'s house-beast (kulshedraDiellit), NOT the Kordha tale\'s road or gate beasts.',
    folklore: ['snake-bridegroom', 'kulshedra'],
    location: { status: 'planning', plan: 'her house and forests are proposed on the far shore beyond the water (nearest drawn spot today: the open sea, deti1); dead in the tale\'s ending — ☠ burned in the coffin' },
    tales: { 'snake-bridegroom': 'kulshedra' },
  },
}
