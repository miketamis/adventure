# NPC file contract (`src/game/data/npcs/*.js`)

One file per area or tale, `export default { npcId: { … } }`. A tale's agent
owns ONLY its `tale-<tale-id>.js` file. `core-village.js` / `core-world.js`
hold the standing world cast — **never edit them**; to reuse a core figure
(E Bukura e Dheut, the Sun, a Kulshedra…) link it from your TALE file's cast:
`{ id: 'beauty', …, npc: 'bukuraDheut' }`.

## Entry format

```js
npcId: {
  name: 'Albanian display name', glyph: '🗡️',
  kind: 'human' | 'mythic' | 'creature' | 'collective',
  role: 'one line: what they are in the world',
  backstory: 'their CANON — 2-4 sentences. Everything any story reuses must
              agree with this. Note distinctions from similar figures
              ("NOT the forest crone — this one keeps the crossroads").',
  folklore: ['lore-card-ids'],
  location: {
    status: 'placed'   // fixed map node → node: 'nodeId'
          | 'walking'  // clock route → route: ['nodeId', …] (see src/game/npcs.js)
          | 'planning' // not on the map yet → plan: 'where they will live'
  },
  tales: { 'tale-id': 'castId' },   // roles this npc plays in beat timelines
}
```

## The sharing rule for PEOPLE

Two tales may use one figure only if both can be talking about the entry
written here — nothing may contradict the backstory. If the figures merely
resemble each other (three different crones, two different kulshedras), make
SEPARATE entries and write the distinction into both backstories. A kulshedra
is a KIND, not a name; E Bukura e Dheut is SERIAL (won by hero after hero,
returns to her palace, each tale its own era).

Every cast member of every tale MUST resolve to a registry entry
(`node scripts/beatscoverage.mjs` enforces it).
