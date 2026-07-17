# Tale file contract (`src/game/data/tales/<tale-id>.js`)

One file per tale, `export default { … }`. **You own exactly one tale file and
one `../npcs/tale-<tale-id>.js` file — never edit any other data file.** The
golden example is [three-friends.js](three-friends.js); match its quality
exactly. Verify with `node scripts/beatscoverage.mjs` (must be all ✅ for your
tale) before you finish.

## Required fields

```js
export default {
  id: 'kebab-tale-id',            // = the FOLKLORE entry id it retells
  title: 'English title (Elsie)',
  source: 'collector, collection (year) · translation read; all lines paraphrased',
  origin: { region: 'South Albania (Tosk)' /* etc */, collector: '…', published: '…' },
  albanian: {                     // REQUIRED — the tale's Albanian original
    title: '«Albanian title as printed»',
    source: 'which edition the Albanian text comes from',
    local: 'docs/references/<file>.sq.txt',   // save the RAW extracted text there
  },
  discrepancies: [ '…' ],         // where translation and Albanian disagree —
                                  // quote the Albanian, say which reading beats follow
  paragraphs: [16, 13, …],        // sentence count per ¶ of the ENGLISH translation
  cast: [ { id, name, note, npc: 'npcId' } ],   // npc = registry link (REQUIRED for every cast member;
                                  // reuse a core NPC by id, or define yours in ../npcs/tale-<id>.js)
  places: [ { id, emoji, name, note, anchor } ],
  items: [ { id, emoji, name, note } ],
  play: { entry, stance, as?, with?, finale?, role, enter?, learn?, from?, ending?, scenes?, divergences? },  // OPTIONAL — see below
  beats: [ { id, title, note, lines, cast, items?, exit? } ],
}
```

## How the tale becomes playable (`play`, OPTIONAL)

The beats above are the FAITHFUL source tale. `play` is a separate, optional
projection that records how our game enters it — two facts the Beats view then
marks on the timeline. It is a projection ONLY: never add the player to `cast[]`
or to a beat's keyframes (that would corrupt line coverage and the honest cast
count); prologue-ness and the player's per-beat position are DERIVED by
`playOf(tale)` in [../../taleLib.js](../../taleLib.js).

- **`entry`** — the beat **id** where the playable arc begins. Every beat before
  it is PROLOGUE the player learns as lore but never plays. Authoring rule: entry
  = the first beat where a player choice could matter. `entry === beats[0].id`
  means the whole tale is playable (no prologue). Store the id, never a per-beat
  `played` flag — the split is derived from this one reference.
- **`stance`** — the player's relationship to the tale, one of:
  - `'embodied'` — the player IS a cast member; their choices are that
    character's actions. Requires **`as`** = that cast id (reuses its cast row +
    its NPC link; a mid-tale death falls out of that cast's `exit`).
  - `'companion'` — a NEW presence not in the source who rides along and can act
    on a character's behalf. Set **`with`** = the cast id you accompany; the
    player's place each beat is derived as theirs. (Omit `with` for a
    free-roaming newcomer.)
  - `'witness'` — the player only experiences a fixed legend and changes nothing
    (cosmological/petrification myths). No `as`, no `with`.
- **`with` / `as`** are mutually exclusive by stance (embodied⇒`as`,
  companion⇒`with`). Two-protagonist tales: pick ONE POV hero for `as`, make the
  co-lead a prominent NPC (only use an array if control genuinely alternates).
- **`finale`** — OPTIONAL beat id where the played arc ends; beats after it are
  epilogue lore. Defaults to the last beat, so most tales omit it.
- **`role`** — one SECOND-PERSON sentence naming who the player is and what they
  may do ("You are Kordha…", "You are no one in Dozon's telling — a traveller…").
- **`enter`** — OPTIONAL second-person clause for the "▶ the game starts here"
  divider, describing what actually happens AT the entry beat ("you find the
  maiden in the Sun's garden, weeping over a cracked cabbage"). Write it — the
  fallback is a generic stance template ("you fall in with X") that ignores the
  specific scene. Only shown when there is prologue (entry isn't beat 1).
- **`learn`** — OPTIONAL map `{ beatId: [[nodeId, 'who/what tells it'], …] }`. The
  PROLOGUE isn't played — the player pieces it together in-world by talking to
  people, reading, and witnessing scenes. This records, per beat, the STORY
  node(s) where that backstory is discovered; the Beats view renders each as a
  🗺 link that jumps to the node on the World map. `nodeId` must exist in STORY,
  the `beatId` must be a real beat (usually a prologue one). e.g. Maiden:
  `learn: { vow: [['pallatRojePse', 'the palace guard names the vow']], taken: [['pallatRojeZi', 'the guard: the queen dyes the palace black']], houseGuest: [['diellShtepi1', 'you witness the Kulshedra scent her']] }`.

- **`from` / `ending` / `scenes`** — OPTIONAL, power the **🎭 playthrough** view,
  which lays the game's shortest route to the good ending beside the source
  beats. `scenes` = `{ storyNodeId: beatId }` mapping each game scene to the beat
  it enacts. The view COMPUTES the graph-shortest path from `from` (default
  START_NODE) to `ending` (a good-ending node; auto-detected via ENDING_LORE if
  omitted) and, per beat, shows the on-route scene's real text — or flags the
  beat "off the shortest route" when its scene is skippable (e.g. Maiden beat 5
  "cabbage": `diellShtepi1→diellOda` reaches the Sun without the garden). All
  three nodes/values are lint-checked (nodes ∈ STORY, beat values ∈ beat ids).

- **`divergences`** — OPTIONAL list `[{ note, beat? }]` of how the GAME departs
  from the folktale to make it playable — invented characters/roads, added fatal
  choices, gates, on-screen payoffs the tale leaves implied. This is
  **adaptation** (game vs folktale), distinct from `discrepancies` (translation vs
  the Albanian original). Rendered as its own "🎮 how the game retells it" section
  on the Beats page; an optional `beat` id tags which beat the change touches.

The lint (`scripts/beatscoverage.mjs`) checks: `entry`/`finale` ∈ beat ids,
`stance` ∈ the enum, embodied⇒`as` ∈ cast ids, companion⇒`with` ∈ cast ids (if
given), witness⇒no `as`/`with`, `role` present, and every `learn` node ∈ STORY.

## Beats are KEYFRAMES over a persistent world

- Beat 1 places the ENTIRE cast — everyone exists somewhere, always, even
  characters the tale hasn't introduced yet ("wanders, not yet met").
- Later beats list only who moved or changed activity; the rest carries forward.
- `cast: { castId: ['placeId', 'what they are doing there'] }`
- `items: { itemId: ['placeId' | 'castId', 'state'] }` — an item at a cast id is carried.
- `exit: ['castId']` removes someone AFTER that beat (deaths — final entry says ☠ why).
- A beat's board is where everyone stands as the beat CLOSES.

## TOTAL LINE COVERAGE (hard rule, linted)

Number the English translation's paragraphs and sentences (¶.sentence). Every
sentence maps to EXACTLY ONE beat line:

```js
lines: [ ['1.1', 'own-words English paraphrase.', "Verbatim Albanian sentence."], … ]
```

- Refs may be same-paragraph ranges (`'11.8-11'`) when the Albanian merges them.
- `paragraphs` declares the sentence counts; the lint verifies totality, no dupes.
- **The English paraphrase must be YOUR OWN WORDS** — Elsie's translations are
  copyrighted; never copy his sentences into the repo. **This means genuinely
  re-saying the event, not tense-swapping or synonym-substituting his sentence.**
  A tell-tale failure: if a 6-word run of your paraphrase matches Elsie's page
  word-for-word, it is copied. "A man died leaving his wife with child" →
  "A man dies leaving his wife with child" is NOT a paraphrase (only the tense
  changed). Do instead: "A man dies before his son is even born." Rebuild the
  sentence from the fact, don't edit Elsie's sentence.
- **The Albanian third element is VERBATIM from the original** (public-domain
  folk text) — this feeds the game's Q() quote system, which may only quote
  words the original actually contains. Lightly fix OCR (broken words, quote
  marks → «»); if the source uses a pre-standard transcription (e.g. Dozon
  1879), transliterate to modern orthography (œ→ë, ou→u, y→j, ç→sh, tç→ç,
  ky→q, lh→ll…) and say so in `albanian.source`; keep the RAW text in the
  `local` reference file with a header noting source + extraction date.

## Anchors — THE SHARING RULE (linted)

Every place carries `anchor: { status, node?, mirror, mold, sharedWith?,
conflicts?, proposal? }`. Two stories may occupy one map spot **only if both
can be talking about the same place and figures** — nothing may conflict (two
castle-kings must plausibly be the SAME king). `mold` states that shared truth;
`conflicts` records the options you REJECTED and why.

- `status: 'existing'` — node is the spot itself
- `status: 'proposed'` — not built yet; `node` = nearest existing spot,
  `proposal` = what to draw/write
- `status: 'offstage'` — the tale never stages a scene there; no node
- `mirror` = the real-world place behind it. **Match the tale's `origin`
  region** (our village = old Tirana; Tomorr = the south's mountain; Rozafa =
  Shkodra/north — a southern tale must not anchor to a northern legend-castle).

Look things up (never guess node ids):
- `node -e "…"` with `import { STORY } from './src/game/content.js'` to check nodes/read scenes
- `src/game/regions.js` (REGIONS/NODE_REGION), `src/components/placeMeta.js` (what already happens at a place)
- other tales' anchors: `grep -l "node: '<id>'" src/game/data/tales/*.js` — if you share a spot, your mold must be compatible with theirs.

## Finding the texts

- English (Elsie) — **LOCAL CACHE FIRST**: the Wayback pages are already
  mirrored at `/private/tmp/claude-501/-Users-miketamis-Dev-Langauge-LanguageAdventure/37bfd3be-f825-4168-8e71-1e5a8d34b13e/scratchpad/elsie-cache/`
  (`tale_01.html`…`tale_26.html` + `index_oralverse.html` / `index_legends.html`
  for the epic-song and legend URL lists). Only if your page is missing there:
  `curl -sL "http://web.archive.org/web/2023id_/http://www.albanianliterature.net/folktales/tale_NN.html"`
  (the live site has broken SSL; Wayback is slow ~20s — be patient, retry once).
  The [Source: …] note at the bottom names the Albanian original's collection —
  record it in `origin`/`albanian.source`.
- **EPIC SONGS have downloadable Albanian PDFs** — the kreshnik songs Elsie
  translated in "Songs of the Frontier Warriors / Kângë Kreshnikësh" have their
  Albanian originals (the Palaj–Kurti / Visaret e Kombit texts) as PDFs on the
  live site. HTTPS is broken but **plain HTTP works**: e.g.
  `curl -sL -m 25 -o out.pdf "http://www.albanianliterature.net/oralverse/verse_09_AL/verse_09_AL_NN.pdf"`
  then `pdftotext out.pdf -` (pdftotext is installed). The NN matches the tale's
  English page; check `index_oralverse.html` in the cache for the mapping. This
  is the FIRST thing to try for any Mujo/Halil/kreshnik song before declaring
  Albanian missing. Save the extracted verse to docs/references/palaj-kurti-<id>.sq.txt.
- Albanian originals on disk (grep these FIRST):
  - `docs/references/pralla-popullore-shqiptare-1954.sq.txt` — the 1954 Tirana
    corpus (Mitko/Dozon/etc. tales in modern orthography; noisy OCR)
  - `docs/references/dozon-manuel-langue-chkipe.fr-sq.txt` — Dozon 1879 Albanian
    originals (his French-based transcription)
  - `docs/references/hahn-albanesische-studien.de-sq.txt`, `jarnik-zur-albanischen-sprachenkunde.de-sq.txt`,
    `meyer-kurzgefasste-grammatik.de-sq.txt`, `lambertz-albanische-marchen.de-sq.txt`
- Otherwise try archive.org full-text (curl works). If NO Albanian original is
  findable, set `albanian: { status: 'missing', why: '…what you tried…' }` and
  leave the lines' third element out — the lint will flag it as a known gap.
  Do NOT invent or back-translate Albanian.

## Do not

- Touch `src/game/folklore.js`, `content.js`, any other tale's files, or the
  assemblers (`taleBeats.js`, `npcRegistry.js`).
- Use the in-app browser tools (the pane is shared) — curl/WebFetch only.
- Reproduce Elsie's English or invent Albanian.
