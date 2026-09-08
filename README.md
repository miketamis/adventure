# Aventura Shqip — an Albanian-learning adventure

A roguelike, choose-your-own-adventure word game for learning Albanian (fluent
language: English). The story is written in Albanian. Unknown clickable words
begin as literal English glosses and flip to Albanian as they are discovered;
a separate reviewed whole-line reading keeps each sentence understandable in
natural English.

## Run

Requires Node.js 20.19+ (or 22.12+).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run check    # graph, world, language, accessibility, assets and bundle gates
npm run certify  # all strict declared-scope certification gates
```

## How it plays

- **Story** (`📖`): each passage has two English aids. Unknown clickable words
  appear as literal word-for-word glosses, e.g. *"you are in a forest of big"*
  for `ti je në një pyll të madh`; beneath the line, a reviewed natural-English
  reading gives the complete sentence's meaning. The token gloss deliberately
  preserves Albanian structure. Even grammatical particles (`të` → *of/to*,
  `i` → *the*) are real, learnable words; only punctuation isn't clickable.
- **Discover**: click any word to discover that *sense*. Discovered words render
  in Albanian everywhere they appear (`ti` → `ti`). You can never undiscover.
- **Hover hints**: hovering an *undiscovered* word shows its Albanian; with `peak`
  active, hovering a *discovered* word shows its English (prefixed with 👁).
- **Peak** (ability): you start with `peak` for 3 turns. Each path you take spends
  one turn of peak. Drinking a 🧪 **potion** refreshes it (+3 turns).
- **Train** (`🎯`): multiple-choice on your discovered words (Albanian→English or
  English→Albanian). Each correct answer mints a **training token** (◆, your mana)
  for that word.
- **Continue the story**: to take a path, you must have discovered *every* word in
  that answer **and** hold ≥1 token for each. Choosing it spends one token per word.
- **Hidden path**: some passages have a secret option (`secret: true`). It's obscured
  ("🔒 a hidden path…") until you've discovered *every word in the passage text*, then
  it reveals (✨) and can be pursued like any other path. It leads to a bonus ending.
- **Inventory** (`🎒`): you start with nothing. Pick items up in the story (e.g.
  *take the potion*). To **use** an item you must "say" its Albanian use-phrase —
  e.g. `pi eliksir` (*drink potion*) — so every word must be discovered and you
  spend one token per word, exactly like choosing a path.
- **New run**: `⟳ new run` returns you to the opening with a fresh traveller
  (location, inventory, hearts, and word-discovery gates reset). Training tokens,
  practice, places and stories already encountered, achievements, and lasting
  world changes carry across runs.
- **Character tales** (`🎭`): entering a named role requires confirmation. You
  remain that person until the tale ends; unrelated roles, private scenes and
  incompatible deeds stay locked. Public roads remain explorable, with a focus
  card naming the waiting objective and its direction. Tale time waits during a
  detour while living-world time advances, and returning restores the exact
  scene. Traveller health and belongings wait outside the role.
- **World map** (`🗺`): every real route reports elapsed time, distance and a
  vector on one mythic tale-chart. *Forestward/sea-roadward* and
  *highward/deepward* are its two axes, not modern compass bearings. Following
  the displayed vectors reconstructs the map. Weather, season, horizon,
  travelling people and completed-tale consequences change with world time.
- **Evidence**: role confirmations and earned lore cards expose deduplicated,
  role-labelled links to witnesses, translations, variants, scholarship and
  local transcript proofs. Source roles and access or scope qualifications stay
  visible beside their links, including on touch screens. Missing or limited
  evidence is labelled rather than silently reconstructed.

## Where the content lives

The public story facade is [`src/game/content.js`](src/game/content.js). Authored
tales and their evidence live under [`src/game/data/tales`](src/game/data/tales),
with deferred reviewed English under
[`src/game/data/readings`](src/game/data/readings):

- `DICT` — one entry per word/sense (`id`, Albanian `al`, English `en`). A word
  with several meanings just gets several entries with different ids.
- `STORY` — a graph of nodes. Each node has `text` (lines of tokens) and `options`
  (short answers that link to other nodes). An option may set `grant: '<itemId>'`
  to drop an item into the bag, or `secret: true` to stay hidden until every word in
  the node's text is discovered. Endings set `end: 'good' | 'bad'`.
- `ITEMS` — carriable items. Each has a `use.phrase` (the Albanian you must "say"
  to use it) and a `use.effect` (e.g. `{ peakTurns: 3 }`).
- Token helpers: `w(id)` (dictionary word), `wf(id, al, en)` (an inflected surface
  of the same sense, e.g. `shtëpi` → `shtëpia`), `p(en)` (a non-learnable structural
  token — used only for punctuation).

Keep answers short and reuse story vocabulary — that reuse is what makes the words
stick.

## Code map

- `src/game/content.js` — dictionary + story data
- `src/game/gameState.js` — run state, reducer, choose/spend rules
- `src/game/worldModel.js` — canonical places, route vectors and distances
- `src/game/environment.js` — dates, seasons, weather and distant visibility
- `src/game/embodiment.js` — named-role focus, public detours and action locks
- `src/game/language.js` — reviewed whole-line and action readings
- `src/components/Token.jsx` — one word (gloss / discovered / particle + peek)
- `src/components/StoryView.jsx` — passage + selectable paths
- `src/components/PracticeView.jsx` — training questions
- `src/components/WorldMapView.jsx` — shared player/debug map renderer
- `src/components/ReleaseErrorBoundary.jsx` — safe recovery for shell and lazy-view failures
- `src/App.jsx` — shell, top bar, tabs, role state and blocking passages
- `scripts/bundleaudit.mjs` — production bootstrap, lazy-chunk and on-demand asset budgets
- `scripts/certify.mjs` — aggregate strict release certificate

The production build separates the stable story graph, folklore catalog,
quotation register and framework runtime into cacheable chunks. Pronunciation
clips and source-witness modules remain on demand; they are not loaded by the
initial document.

The certification scripts reject unreachable story content, ambiguous
geography, density violations, invalid state transitions, unreviewed language,
missing source dispositions, reveal mismatches, inaccessible labels,
projection-seal drift, missing or malformed pronunciation audio, gaps in the
151-item in-world survival syllabus, and missing non-clitic words in the top
150 Albanian frequency list.
Passing is an internal declared-scope claim, not a substitute for native
Albanian or external folklore-expert review.
