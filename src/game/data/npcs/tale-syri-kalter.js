// NPCs: the Syri i Kaltër (Blue Eye) legend cast — see ../npcs/_SCHEMA.md for
// the format contract. One file per area/tale so parallel agents never collide.

export default {
  gjarpriSopotit: {
    name: 'gjarpri i Sopotit', glyph: '🐍', kind: 'creature',
    role: 'the man-eating serpent that became the Blue Eye',
    backstory: 'Come up out of the deep south to feed — the little spring at Vrisi in Delvinë first, then whole flocks and two shepherds on the parched slope of Sopot — until a wise old man loaded two donkeys with burning tinder and let the serpent swallow the fire instead of him. It died where it fell, and its eye became the spring that still cries: Syri i Kaltër. NOT the core gjarpri of the world-below\'s threshold (a different serpent, a different guardian duty, a different era) — a kulshedra/gjarpër is a KIND, not a name, and this one is long dead, spent into standing water.',
    folklore: ['syri-kalter'],
    location: { status: 'placed', node: 'udhaSyri' },
    tales: { 'syri-kalter': 'gjarpri' },
  },
  plakuEshkes: {
    name: 'plaku i eshkës', glyph: '👴', kind: 'human',
    role: 'the wise old man who fed the serpent fire instead of flesh',
    backstory: 'When the serpent had already eaten the water-women of Vrisi, whole flocks, and two shepherds besides, he loaded two donkeys with sacks of tinder-straw and set them ablaze by its lair on Sopot\'s slope — so when it came for the man who lit the fire, it swallowed the burning donkeys instead, and burned from within until it died. NOT plaku i sheshit (the village square\'s old man) or plaka e udhëkryqit (the crossroads crone) — a different old man, a different deed, a different corner of the country.',
    folklore: ['syri-kalter'],
    location: { status: 'placed', node: 'udhaThate' },
    tales: { 'syri-kalter': 'plaku' },
  },
  gratëVrisit: {
    name: 'gratë e Vrisit', glyph: '🏺', kind: 'collective',
    role: 'the women and children fetching water at the bridge of Vrisi',
    backstory: 'Every day they filled their jugs at the small spring by the bridge of Vrisi in Delvinë, the way village water-women always have — until the serpent came up from Saranda and took them all in a moment, the rampage\'s first victims.',
    folklore: ['syri-kalter'],
    location: { status: 'planning', plan: 'the little spring at the bridge of Vrisi in Delvinë — not a built node; folded into the legend as told at udhaSyri/udhaThate' },
    tales: { 'syri-kalter': 'gratëVrisit' },
  },
  çobanëtSopotit: {
    name: 'çobanët e Sopotit', glyph: '🐑', kind: 'collective',
    role: 'the two shepherds of Sopot\'s slope',
    backstory: 'They minded their flocks on the parched high ground of Sopot, the way shepherds always have there — until the serpent came up from Vrisi devouring whole flocks along the way and ate the two of them besides, ruining the standing crops as it went.',
    folklore: ['syri-kalter'],
    location: { status: 'placed', node: 'udhaThate' },
    tales: { 'syri-kalter': 'çobanëtSopotit' },
  },
}
