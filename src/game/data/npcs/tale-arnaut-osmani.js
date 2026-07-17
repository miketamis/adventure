// NPCs new to "Arnaut Osmani" (Palaj–Kurti no. 13 of the Kângë Kreshnikësh) —
// see ../npcs/_SCHEMA.md for the format contract. This file is owned by its
// tale: agents editing other tales must not touch it. Sokol Halili is a NEW
// core-ish figure here (no entry existed before this tale); any future song
// that needs him again should link to `sokolHalili` below rather than
// duplicate him — the way this tale itself reuses `mujo` from core-world.js
// if it ever needed him (it doesn't: Muji never appears in this particular
// song).
// ===========================================================================

export default {
  arnautOsmani: {
    name: 'Arnaut Osmani', glyph: '🔥', kind: 'human',
    role: 'the Aga who played dead to break a dozen chains',
    backstory:
      'One of twelve Agas the Krajl\'s raiders dragged off a mountain pasture near Jutbina — and the only one of them who confessed to every count against him (the burnt palace, the torn-down kulla, the plundered herds, and a savage revenge on the king\'s own parents when no ransom came) rather than let his companions share the blame. Nine years in irons, then six more, and still no way out — until he swore he would not flinch if they threw him into seven blazing ovens, and proved it: three real ordeals of serpents, fire, and the nail, endured without a breath while playing a corpse, until the last shackle came off and he tore a guard\'s own sabre out of the air to cut his way free. NOT the Arnaut Osmani of "Arnaut Osmani and Hyso Radoica" (Palaj–Kurti no. 11, a stolen wife, a duel, and two long-lost brothers reunited) — the epic gives the same popular name to more than one hero across its songs, exactly as it does with Zuku; this is the coals-and-corpse song alone (no. 13).',
    folklore: ['arnaut-osmani', 'kreshnik-epic'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'arnaut-osmani': 'osmani' },
  },
  sokolHalili: {
    name: 'Sokol Halili', glyph: '🏹', kind: 'human',
    role: 'Mujo\'s swift younger brother, taken captive in his own turn',
    backstory:
      'Mujo\'s constant companion and the second pillar the whole kreshnik cycle stands on — young, quick and reckless where his brother is raw strength, with a cycle of songs all his own: marriages, raids, deaths and captures among them. In THIS song he rides out with Arnaut Osmani\'s raiding band and is swept up in the same ambush, one of the twelve Agas chained in a foreign king\'s dungeon for nine years and then six more, and freed only by Osmani\'s trick, having taken no blame and no credit himself. NOT the same captivity as the Krajl who once held Muji alone while Halili rode out to the rescue (the game\'s own halil1/halilFund side-quest at Jutbina, a DIFFERENT tower, a DIFFERENT Krajl, a DIFFERENT rescue) — the frontier songs capture and free their heroes by turns, story by story, and this is one of Halili\'s own turns in the chains.',
    folklore: ['arnaut-osmani', 'kreshnik-epic'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'arnaut-osmani': 'halili' },
  },
  agatOsmanit: {
    name: 'Agallarët e tjerë', glyph: '🧑‍🤝‍🧑', kind: 'collective',
    role: 'the ten other Agas swept up in the same raid',
    backstory:
      'Ten more companions of Arnaut Osmani\'s mountain company, chained beside him and Sokol Halili through both sentences — they answer the king\'s grim question about the missing sunlight in one voice, wail together over Osmani\'s feigned death loud enough to wake the king himself, and ride home free men once his trick has worked. None of them is ever named; the song keeps its whole attention on Osmani and, once, on Halili.',
    folklore: ['arnaut-osmani'],
    location: { status: 'placed', node: 'jutbina' },
    tales: { 'arnaut-osmani': 'agat' },
  },
  krajliOsmanit: {
    name: 'Krajli', glyph: '👑', kind: 'human',
    role: 'the foreign king who tested a corpse three times before he\'d believe it',
    backstory:
      'The Slav king across the frontier whose palace, kulla and forest Osmani\'s raiders burned down — he chains the whole band for nine years, adds six more when the boast doesn\'t shame them into silence, and when word comes that one prisoner has died he tests the body himself: nine serpents, two bonfires, twenty nails, then thirty dancing maidens, refusing to believe even his own daughter until the very last shackle is struck away — and pays for the doubt with an eye, an arm, and his palace. NOT the Krajl who held Muji alone at the game\'s own halil1/halilFund tower, and NOT Rusha\'s father at the game\'s own rusha1 tower — "Krajl" names the standing office of the frontier\'s Slavic royal enemy across many songs, the way "kulshedra" names a kind and not one beast; each song\'s Krajl is his own man.',
    folklore: ['arnaut-osmani', 'kreshnik-epic'],
    location: { status: 'planning', plan: 'lives in the proposed Krajl\'s dungeon-tower off Jutbina (see the arnaut-osmani tale file\'s "burgu" place) — not yet drawn on the map' },
    tales: { 'arnaut-osmani': 'king' },
  },
  vajzaKrajliOsmanit: {
    name: 'vajza e krajlit', glyph: '👸', kind: 'human',
    role: 'the king\'s daughter, Osmani\'s old sweetheart, who saved his life twice over',
    backstory:
      'Once Arnaut Osmani\'s own sweetheart before the raid parted them, she is the one her father sends down with the dungeon keys, the one who finds him lying as if dead, and the one who alone catches the smile he can\'t quite hide from her — she covers his face before the other maidens see, then turns on her own father: torment a body three days unburied, and the sin is his to carry. He frees Osmani\'s shackles at her word, and Osmani carries her home to Jutbina as his bride. NOT Rusha (the game\'s own rusha1 tower, a different Krajl\'s daughter, won by an open besa on the road) and NOT Tanusha, daughter of the Krajl of Kotor whom Halili disguises himself to win — a different girl for each song, though the frontier songs love the pattern: a Krajl\'s daughter, and a hero who wins her against her father\'s will.',
    folklore: ['arnaut-osmani'],
    location: { status: 'planning', plan: 'lives in the proposed Krajl\'s dungeon-tower off Jutbina (see the arnaut-osmani tale file\'s "burgu" place) — not yet drawn on the map' },
    tales: { 'arnaut-osmani': 'daughter' },
  },
  rojaKrajliOsmanit: {
    name: 'rojtari me shpatë', glyph: '🗡️', kind: 'human',
    role: 'the guard set to watch the body with a bared sabre',
    backstory:
      'Posted over what the king still isn\'t sure is a corpse, sabre drawn, the moment the last shackle is struck off — and the first man Osmani kills once he springs up whole, snatching the very blade meant to guard him. He has no other part in the song. NOT Balozi i Detit or any other named Baloz of the game\'s wider mythology — both the Albanian original and Elsie\'s own English keep the word "baloz" for this ordinary guard (a common noun for a formidable fighter, not a proper name), unrelated to the sea-giant of that name; these beats simplify him to a plain "guard" for the English cast note only.',
    folklore: ['arnaut-osmani'],
    location: { status: 'planning', plan: 'lives in the proposed Krajl\'s dungeon-tower off Jutbina (see the arnaut-osmani tale file\'s "burgu" place) — not yet drawn on the map' },
    tales: { 'arnaut-osmani': 'roja' },
  },
  vajzatTridhjeteOsmanit: {
    name: 'tridhjetë vajzat', glyph: '💃', kind: 'collective',
    role: 'thirty maidens of the king\'s household, dressed up to dance around a corpse that may not be one',
    backstory:
      'Chosen for the king\'s last test of the body — finery, dancing and song around what everyone but his daughter takes for a dead man — one of them is the first to notice Osmani\'s stolen smile and blurts it out before the daughter can talk her down. Once Osmani wins free they are carried off to Jutbina and married to thirty of its young men, never named beyond their number.',
    folklore: ['arnaut-osmani'],
    location: { status: 'planning', plan: 'lives in the proposed Krajl\'s dungeon-tower off Jutbina (see the arnaut-osmani tale file\'s "burgu" place) — not yet drawn on the map' },
    tales: { 'arnaut-osmani': 'maidens' },
  },
}
