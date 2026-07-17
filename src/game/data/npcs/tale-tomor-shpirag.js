// NPCs: the Baba Tomor & Shpirag legend's NEW cast — see ../npcs/_SCHEMA.md
// for the format contract. Core figures the tale reuses (E Bukura e Dheut,
// E Bukura e Detit) are linked straight from the tale file's own cast[].npc
// and are NOT duplicated here.

export default {
  babaTomor: {
    name: 'Baba Tomor', glyph: '⛰️', kind: 'mythic',
    role: 'the old sky-father of Mount Tomorr — sworn by, eagle-attended, still arms wandering heroes on his slopes',
    backstory: 'The white-bearded old man who IS the mountain: the region\'s peasants swear "për Baba Tomor" as their heaviest oath, and pilgrims still climb to him every August (15th for the Christians\' Assumption, 20th-25th for the Bektashi\'s Abbas Ali). Four long-beaked she-eagles keep his snow-line and are his eyes when his own are shut — the SAME old man and the SAME eagles who arm wandering heroes with a blessed sword against the Kulshedra and warn them of the black and white rams (see tomor1/tomor2/tomor3/majaEagle/tomorBekim in the main quest). In the origin-legend he keeps E Bukura e Dheut as his night-time bride, and when the rival Shpirag creeps on his beloved city of Berat, rides out on his mule with his scythe and is mortally wounded in turn by Shpirag\'s cudgel. A mountain-god\'s death IS his becoming the mountain forever — which is exactly why he can still be climbed, sworn by, and spoken with today; nothing here contradicts his living presence in the main quest. Maximilian Lambertz took him for a surviving Illyrian sky-god.',
    folklore: ['tomor-shpirag'],
    location: { status: 'placed', node: 'tomor1' },
    tales: { 'tomor-shpirag': 'babaTomor' },
  },
  shpiragu: {
    name: 'Shpirag', glyph: '🗿', kind: 'mythic',
    role: 'the rival giant of the mountain across the valley from Tomorr — already known in this world as "the petrified rival of a finished war" (see the goose-girl tale\'s own note)',
    backstory: 'A giant as great as Tomor, holding the facing mountain whose slopes already ran in furrow-like torrents before the war that explains them. He loved the same Earthly Beauty, and the moment Tomor lay content with her, Shpirag slipped down to seize Tomor\'s own city of Berat. The four eagles\' alarm brought Tomor out to meet him: Tomor\'s scythe cut him to the bone in the long stripes still read down his flank today, though Shpirag\'s own cudgel opened craters in Tomor\'s heights before the old sky-father struck him down for good. Both turned wholly to mountain that day — two wounded peaks still facing each other over the gorge the Beauty\'s tears became. Distinct from any petrified WEDDING court (the goose-girl tale\'s marble garden): Shpirag is a petrified WAR, punished by nothing, simply stopped.',
    folklore: ['tomor-shpirag'],
    location: { status: 'placed', node: 'shpirag1' },
    tales: { 'tomor-shpirag': 'shpirag' },
  },
  shqiponjatTomorit: {
    name: 'katër shqiponjat e Tomorit', glyph: '🦅', kind: 'collective',
    role: 'the four long-beaked she-eagles who keep Baba Tomor\'s snow-line',
    backstory: 'Four female eagles circle the old man of the mountain at all hours and perch along his snowy shoulders — his own eyes while his are shut. It was their four voices together that tore him out of sleep the day Shpirag crept on Berat. The same eagles still watch over the summit where wandering heroes come for Tomor\'s blessing (see majaEagle in the main quest).',
    folklore: ['tomor-shpirag'],
    location: { status: 'placed', node: 'majaEagle' },
    tales: { 'tomor-shpirag': 'shqiponjat' },
  },
  eraLindjes: {
    name: 'era e lindjes', glyph: '💨', kind: 'mythic',
    role: 'the East Wind, Baba Tomor\'s faithful servant',
    backstory: 'The wind that carries E Bukura e Dheut up the mountainside to Tomor\'s side every evening and back down to her sister every morning — and, the one day Shpirag came for Berat, the same wind that swept her to safety at the Sea Beauty\'s house on the old man\'s very first word, before he armed himself. She keeps no perch of her own; she goes wherever the mountain sends her.',
    folklore: ['tomor-shpirag'],
    location: { status: 'planning', plan: 'never drawn as her own figure — she moves between tomor1 and detiThelle1 whenever the tale needs her, with no fixed node' },
    tales: { 'tomor-shpirag': 'era' },
  },
}
