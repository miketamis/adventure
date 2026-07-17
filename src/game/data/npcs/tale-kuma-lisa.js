// NPCs: the Kuma Lisa tale (kuma-lisa) cast — see ../npcs/_SCHEMA.md for the
// format contract. One file per area/tale so parallel agents never collide.
// Both figures are staged by the game's own forest fox scene (dhelpra1/2).

export default {
  // ── The Wolf, the Vixen and the Honey-Pot (kuma-lisa) ─────────────────────
  kumaLisa: {
    name: 'Kuma Lisa, dhelpra', glyph: '🦊', kind: 'creature',
    role: 'the trickster she-fox of the Balkan tales — godmother by pretence only',
    backstory: 'Von Hahn christens her Frau Marja; the Balkans call her Kuma Lisa, the godmother-fox. She bought a field with the wolf, hid the honey and the white loaves with him — then ate the store alone across three invented christenings, naming each "child" for the level of the honey (the Elbasan telling keeps two names in Albanian: Zanafilla and Marosha). Caught, she denied it to his face; pursued, she went down a hole and had the wolf hauling roots while her leg sat in his hook. Her tricks are old and simple, and they beat no one but the one who believes her. An animal outright — NOT a shape of any Ora, Zana or Shtriga.',
    folklore: ['kuma-lisa'],
    location: { status: 'placed', node: 'dhelpra1' },
    tales: { 'kuma-lisa': 'dhelpra' },
  },
  ujkuNikolla: {
    name: 'ujku Nikollë', glyph: '🐺', kind: 'creature',
    role: 'Herr Nicola — the wolf who went partners with the fox, and was fed last',
    backstory: 'A wolf with a man\'s name and a farmer\'s plans: he bought a field with the fox, stashed a tub of honey and a basket of white loaves for the work-season, and dug on trustingly through three "christenings". He found the tub upside down, believed the invented names, granted the second search — and wore himself out at her bolt-hole, pulling roots on command. Of the first wolf\'s devouring kind (ujkuPare) but NOT that wolf, and NOT the hungry wolf of the deep forest (the shokuUjk arc): this one\'s appetite is for honey, and in the game\'s staged butter variant he is the guiltless beast wronged when the fox cries thief with the butter on his sleeping mouth.',
    folklore: ['kuma-lisa', 'wolf'],
    location: { status: 'placed', node: 'dhelpra1' },
    tales: { 'kuma-lisa': 'ujku' },
  },
}
