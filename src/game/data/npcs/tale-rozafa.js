// NPCs: "Rozafa — the walled-up wife" (Legend) — see ../npcs/_SCHEMA.md for the
// format contract. This file is owned by its tale: agents editing other tales
// must not touch it. The wife herself, Rozafa, is a CORE npc (core-world.js,
// node 'kalaRozafa') and is reused here via cast[].npc in ../tales/rozafa.js —
// she is NOT redefined below.

export default {
  vellaMadh: {
    name: 'vëllai i madh', glyph: '🔨', kind: 'human',
    role: 'the eldest of the three castle-building brothers',
    backstory: 'The eldest of the three who raise Rozafa\'s castle above the Buna. First to hear the old man\'s price, and first to break the besa sworn over it — that same evening he tells his own wife everything, and it is his mouth that later tells the truth to his youngest brother\'s wife, to her face.',
    folklore: ['rozafa'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { rozafa: 'eldest' },
  },
  vellaMesit: {
    name: 'vëllai i mesit', glyph: '⛏️', kind: 'human',
    role: 'the second of the three castle-building brothers',
    backstory: 'The middle brother — no bolder than the eldest. He swears the same besa on the mountain and breaks it the same night, telling his own wife the whole bargain. His wife\'s excuse (a visit to her own parents) is what spares her the wall, not his silence.',
    folklore: ['rozafa'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { rozafa: 'middle' },
  },
  vellaVogel: {
    name: 'vëllai i vogël', glyph: '🪓', kind: 'human',
    role: 'the youngest brother — Rozafa\'s husband, and the only one who keeps his word',
    backstory: 'The youngest of the three, and the only one who keeps the besa: he tells his wife nothing of the wall\'s price, which is exactly why it is his own Rozafa who climbs the hill with the meal. He knows the instant he sees her coming, and flings his axe down the mountainside before a word passes between them.',
    folklore: ['rozafa'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { rozafa: 'husband' },
  },
  gruaMadhe: {
    name: 'gruaja e vëllait të madh', glyph: '🤒', kind: 'human',
    role: 'the eldest brother\'s wife',
    backstory: 'Forewarned by her own husband\'s broken besa, she pleads illness the one morning it matters and is spared — not through any virtue of her own, only because her husband could not keep silent.',
    folklore: ['rozafa'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { rozafa: 'eldestWife' },
  },
  gruaMesit: {
    name: 'gruaja e vëllait të mesit', glyph: '🚪', kind: 'human',
    role: 'the second brother\'s wife',
    backstory: 'Told the secret just as her sister-in-law was, she claims a visit to her own parents on the one morning it counts, and is spared in her turn.',
    folklore: ['rozafa'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { rozafa: 'middleWife' },
  },
  nenaVellezerve: {
    name: 'nëna e vëllezërve', glyph: '🧓', kind: 'human',
    role: 'the three brothers\' mother, who keeps their house below the hill',
    backstory: 'Knows nothing of the besa sworn on the mountain — it is her own hand that sends the morning meal up the hill every day, and hers that asks, in perfect innocence, which daughter-in-law will carry it. She never learns that her own question is what sends her favorite daughter-in-law to the wall.',
    folklore: ['rozafa'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { rozafa: 'mother' },
  },
  djaliRozafes: {
    name: 'djali i Rozafës', glyph: '👶', kind: 'human',
    role: 'Rozafa\'s small son, still nursing the morning she climbs the hill',
    backstory: 'Still at the breast when his mother is walled into the castle\'s foundation. His two aunts promise he won\'t even cry while she is gone; the legend\'s own telling insists he never truly loses her — her walled-in eye, hand, foot and breast go on watching, holding, rocking and feeding him after the stone closes.',
    folklore: ['rozafa'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { rozafa: 'son' },
  },
  plakuKalase: {
    name: 'plaku i kalasë', glyph: '🕯️', kind: 'mythic',
    role: 'the stranger who names the wall\'s price, once, and is never seen again',
    backstory: 'Kuteli\'s telling (and Elsie\'s translation of it) calls him only "an old man," but the sung Geg ballad of the very same legend calls the price-namer a "shenjt i gjallë" — a living saint — and it is a saint\'s authority the brothers\' castle obeys, not an old man\'s guess. NOT Baba Tomor (the south\'s sky-father, fixed forever on his own holy mountain) and NOT plakuSheshit (the village\'s own flesh-and-blood elder) — this is a nameless, one-time tester of a besa, gone the moment his bargain is struck.',
    folklore: ['rozafa'],
    location: { status: 'placed', node: 'kalaMur' },
    tales: { rozafa: 'oldMan' },
  },
}
