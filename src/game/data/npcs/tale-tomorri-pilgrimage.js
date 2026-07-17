// NPCs: Mount Tomorr's pilgrimage & cult — see ../npcs/_SCHEMA.md for the
// format contract. Baba Tomor himself is the tomor-shpirag tale's own figure
// and is reused here by npc id, not duplicated. This file holds only the
// figures NEW to the pilgrimage: the martyr-saint, the tekke's founder, and
// the pilgrims themselves.

export default {
  abazAliu: {
    name: 'Abaz Aliu', glyph: '🐎', kind: 'mythic',
    role: 'the martyr-saint who returns to Tomorr each August on his white horse',
    backstory: 'Abbas ibn Ali, standard-bearer and half-brother to Imam Hysejn, fell at Karbala in the year 680 at the age of thirty-five, cut down carrying water to a besieged camp — a life the Bektashi read as mercy\'s own door, closed too soon. Centuries later a monk from Haji Bektash\'s own house in Turkey climbed Mount Tomorr and raised him a second, empty grave at its southern peak, and belief holds that he himself returns to that peak every year, five days each August, on a white horse (a detail from Wikipedia\'s own account of the legend, not the tekke\'s own page — see the tale\'s discrepancies), to bless the mountain and everyone who climbs it. Distinct from Baba Tomor: the old man IS the mountain and never leaves it; Abaz Aliu is a guest who arrives and departs, a martyr from a war a world away whose name the mountain only later took up. His own footprint — not the horse\'s — is shown at five separate stones across the villages of Skrapar, not on the peak alone; the tekke\'s own page names one, at Bargullas, a print of his hand.',
    folklore: ['tomorri-pilgrimage', 'sari-salltek'],
    location: { status: 'placed', node: 'maja' },
    tales: { 'tomorri-pilgrimage': 'abazAliu' },
  },
  dervishIljazi: {
    name: 'Dervish Iljazi', glyph: '🕌', kind: 'human',
    role: 'the dervish who rebuilt the Kulmak tekke, 1915-1916',
    backstory: 'A historical figure, not a mythic one: when Greek armed bands burned the mountain\'s dervish-lodge in 1914, Dervish Iljazi rebuilt it as the new Kulmak tekke over 1915 and 1916, on the southeastern shoulder of Tomorr below Abaz Aliu\'s own tomb. The tekke he built is the one the pilgrims still climb to every August. NOT Sari Salltëk\'s own wandering dervish of Krujë (sariSalltek) — a builder and a founder, not a dragon-slayer, and a world away in the north.',
    folklore: ['tomorri-pilgrimage'],
    location: { status: 'placed', node: 'maja' },
    tales: { 'tomorri-pilgrimage': 'dervishIljazi' },
  },
  pelegrinetTomorrit: {
    name: 'pelegrinët e Tomorrit', glyph: '🥾', kind: 'collective',
    role: 'the thousands who climb Tomorr each August, of every faith',
    backstory: 'Christians climb on the 15th of August for the Virgin\'s Assumption; Bektashi believers climb the 20th through the 25th for Abaz Aliu; and both, along with those who hold no name for it at all, have climbed for the mountain itself since long before either feast was fixed to a date. They come from every corner of the Albanian world and beyond — Kosovo, Macedonia, Italy, Greece, the diaspora as far as the United States — carrying the lambs they will share as kurban at the tekke. One long relationship with one mountain, not four separate crowds.',
    folklore: ['tomorri-pilgrimage', 'kurbani'],
    location: { status: 'placed', node: 'maja' },
    tales: { 'tomorri-pilgrimage': 'pelegrinet' },
  },
}
