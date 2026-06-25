# Aventura Shqip — an Albanian-learning adventure

A roguelike, choose-your-own-adventure word game for learning Albanian (fluent
language: English). The story is written in Albanian but shown as a word-for-word
English gloss; as you discover words they flip to Albanian, so the text slowly
becomes the real language.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## How it plays

- **Story** (`📖`): each passage is Albanian shown word-for-word in English, e.g.
  *"you are in a forest of big"* for `ti je në një pyll të madh`. The English is a
  literal gloss — it deliberately doesn't read like natural English, so you learn
  the Albanian structure. Even grammatical particles (`të` → *of/to*, `i` → *the*)
  are real, learnable words; only punctuation isn't clickable.
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
- **Roguelike**: `⟳ new run` wipes everything and starts fresh.

## Where the content lives

All vocabulary and the branching story are data, in
[`src/game/content.js`](src/game/content.js):

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
- `src/components/Token.jsx` — one word (gloss / discovered / particle + peek)
- `src/components/StoryView.jsx` — passage + selectable paths
- `src/components/PracticeView.jsx` — training questions
- `src/components/InventoryView.jsx` — bag + item use (gated by token phrase)
- `src/App.jsx` — shell, top bar, tabs, mana wallet
