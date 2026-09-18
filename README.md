# Aventura Shqip — an Albanian-learning adventure

A roguelike, choose-your-own-adventure word game for learning Albanian (fluent
language: English). The story is written in Albanian. Unknown clickable words
begin as local English glosses and flip to Albanian as they are discovered.
Fluent whole-line English readings are editorial metadata and remain available
only in debug mode, so ordinary play never prints the completed answer beside
the Albanian.

## Run

Requires Node.js 22.12+.

```bash
npm install
npx playwright install chromium # once, for the real-browser performance gate
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run test:performance # input-to-paint budgets across normal and debug play
npm run check    # graph, world, language, accessibility, assets and bundle gates
npm run certify  # all strict declared-scope certification gates
```

## How it plays

- **Story** (`📖`): unknown clickable words appear as local word glosses while
  preserving Albanian structure. Even grammatical particles (`të` → *of/to*,
  `i` → *the*) are real, learnable words; only punctuation is not clickable.
  Passages used by a response task stay in Albanian, with explicit **Word help**
  available. The complete natural-English reading is debug-only.
- **Discover**: click any word to save that *sense*. Saved words render in
  Albanian everywhere they appear (`ti` → `ti`). Starting a living new run
  preserves them. Death may unsave only weak, scarcely practised vocabulary;
  its tokens and exact Train progress remain intact for rediscovery.
- **Hover hints**: hovering an *undiscovered* word shows its Albanian. Hovering
  or focusing a discovered word shows its tokenised Albanian dictionary
  definition; hovering or clicking also replays its pronunciation.
- **Train** (`🎯`): adaptive practice independently develops meaning, listening,
  grammatical-form, agreement, construction, spelling, phrase and retention
  evidence. Activities range from matching and staged form decisions to audio
  construction, cloze, ordering, speaking rehearsal and independent production.
  A focused activity rewards only its target; each correct target answer mints
  a **training token** (◆) for that word.
- **Continue the story**: most paths require discovering every word in the action
  and holding one token for each different trainable word; choosing spends those
  tokens. Four village encounters—the bread price, a guest's request, water news
  and a later meeting—use a response task instead. Complete the task, then choose
  the story action. Money, item, timing and source-word discovery requirements
  still apply; only the chosen action changes the world.
- **Hidden path**: some passages have a secret option (`secret: true`). It's obscured
  ("🔒 a hidden path…") until you've discovered *every word in the passage text*, then
  it reveals (✨) and can be pursued like any other path. It leads to a bonus ending.
- **Inventory** (`🎒`): you start with nothing. Pick items up in the story (e.g.
  *take the bread*). To **use** an item you must "say" its Albanian use-phrase —
  e.g. `ha bukë` (*eat bread*) — so every word must be discovered and you
  spend one token per different word.
- **New run**: `⟳ new run` returns you to the opening with a fresh world attempt
  (location, inventory, hearts, visits and run-local observations reset). Saved
  vocabulary, training tokens, aspect/form/phrase progress, achievements and
  lasting world changes carry across living restarts. Death applies the narrow
  weak-word consequence described above without erasing learning evidence.
- **Character tales** (`🎭`): entering a named role requires confirmation. You
  remain that person until the tale ends; unrelated roles, private scenes and
  incompatible deeds stay locked. Public roads remain explorable, with a focus
  card naming the waiting objective and its direction. Tale time waits during a
  detour while living-world time advances, and returning restores the exact
  scene. Traveller health and belongings wait outside the role.
- **Living world**: weather, season, travelling people and completed-tale
  consequences change with world time and are narrated inside the story. The
  world map, route vectors, distances and conditions dashboard are debugging
  tools and are never part of the ordinary player interface.
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
  to use it) and a `use.effect` (e.g. `{ hearts: 3 }`).
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
- `src/components/Token.jsx` — one word (gloss / discovered / particle + audio)
- `src/components/StoryView.jsx` — passage + selectable paths
- `src/components/PracticeView.jsx` — training questions
- `src/components/WorldMapView.jsx` — debug-only world-map renderer
- `src/components/ReleaseErrorBoundary.jsx` — safe recovery for shell and lazy-view failures
- `src/performance.js` — delegated interaction, reducer, persistence and long-task monitor
- `src/App.jsx` — shell, top bar, tabs, role state and blocking passages
- `tests/performance/` — production-build browser responsiveness suite
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
