# NPC Overhaul — everyone is an NPC

*Design doc, 2026-07-10. No code changed yet.*

## The diagnosis

The game has ~60 characters but only 7 live in the NPC system (`src/game/npcs.js`).
The "NPC system" today is **only a position system**: routes derived from the clock,
surfaced as `npc:`/`npcAt:` virtual items. Everything a character *says or does* lives
in story nodes. That split is the root cause of most of the location weirdness:

| Weirdness | Root cause |
|---|---|
| Trader says *mirmëngjes!* at midnight; shop open 24/7 | Static characters are baked into node prose — no schedule, no phase awareness |
| Miller says *shihemi nesër!* verbatim on every visit; plaku retells his life story fresh each time | No character memory — conversations are stateless nodes, restart from the top |
| You "talk to the old man" but the system teleports you to `sheshiPlak` — a fake place; the clock ticks and by derivation he's already walked to the oda while still talking to you | Conversations are world-graph nodes; NPC presence is only checked at the door, not during |
| gruaUji walks the world but you can barely talk to her; the trader talks plenty but can never move | Two disjoint implementations — walkers get positions but little content, statics get content but no position |
| A `when('npc:x')` line appears/vanishes and the player doesn't know why; some prose mentions a character the presence system says is elsewhere | Sighting lines are hand-scattered per node; nothing enforces prose ↔ presence consistency |
| 114 of 161 mapped nodes are aliases stacked on 47 real places | Conversation steps and vignettes are all "places" in `NODE_AT` |

The engine idiom to fix it already exists and is the best thing about this codebase:
**everything is a virtual item through `hasCond()`** — time phases, fire states,
`from:`, `became:`, `npc:`. The overhaul is four small extensions of that idiom, not
a new subsystem.

## What deliberately does NOT change

- **Conversation steps stay story nodes.** Every non-ending node carries three
  hand-authored confusers, mana costs, word discovery, minimap position, audit
  coverage. A parallel dialogue-tree UI would orphan all of that. Dialogue stays
  node-shaped; what changes is that nodes become *owned by* characters.
- **Story-arc characters stay in their branches.** Aga Ymer, Kordha, the Katallan,
  the Baloz, Kostandin — these exist inside one epic arc each. They are *events*,
  not residents. They can opt into memory marks (below) but don't need schedules.
  **Rule of thumb: can the player meet them on more than one occasion/place/hour?
  → NPC. Do they exist inside one arc? → story branch.**
- **Pure atmosphere stays pure.** The krushqit procession and the Xhindët are
  *better* untalkable — being observational is their design. Not every character
  needs a dialogue.
- **The clock-derivation principle.** Nothing gets ticked or stored per-NPC; a
  static character is just the degenerate case of the existing formula.

## The four engine extensions

### 1. Statics get schedules — presence is derived for *everyone*

A static character is a walking NPC with a route of length 1:

```js
tregtari: {
  name: 'tregtari', glyph: '🧺',
  route: ['sheshi'],                        // his stall stands on the square
  activePhases: ['dawn', 'day', 'dusk'],    // stalls shut at night
},
```

`npcNodeOf()` already handles this (modulo over length 1); mapaudit's edge rule
passes trivially. Immediately:

- `npc:tregtari` gates the buy/sell options — **the shop closes at night with zero
  new machinery**, and the night square gets one new line ("dyqanet janë mbyllur").
- Every character appears on the debug map via `liveNpcs()` for free.
- Day/night finally reaches the village interiors: the oda fills in the evening
  (it's an evening institution — by day it should be empty), the mill runs by day,
  the healer sleeps.

Proposed roster additions and schedules (to be tuned):

| Character | Route | Active phases | Note |
|---|---|---|---|
| tregtari | sheshi | dawn/day/dusk | stall shut at night |
| mulliri (old miller) | mulli1 | day | grinds while the water runs; home at night |
| sheruesi | sheruesi's house | **always** | deliberate: the healer answers the night knock — hearts-restore must never be phase-locked |
| bujtina host | bujtina | always | inns keep nights; that's their point |
| plaka (village elder) | fshatiJeta | dawn/day/dusk | |
| burrat e odës (oda men) | oda1 | dusk/night | oda empty by day — big coherence win |
| dervish | his node | dawn/day | open question: dawn prayers as flavour? |

(Exact node ids to be fixed against content during migration; `sheruesi`-style
"the scene node is also the place" cases resolve as: the *place* is the route node,
the scene becomes owned, next section.)

### 2. Scenes belong to characters: `npc:` field on nodes + presence pinning

A conversation node declares its owner:

```js
sheshiPlak: { id: 'sheshiPlak', npc: 'plakuSheshit', text: [...], options: [...] },
```

Engine consequences:

- **Pinning:** while `state.nodeId` is a node owned by NPC X, `npcNodeOf(X)`
  returns the player's position. He cannot clock-walk away mid-sentence. The
  moment you step out, normal derivation resumes — and if the hour moved him on,
  *that's now a feature* ("plaku ngrihet dhe shkon" as a `when()` line at the
  return node), not a lie.
- **Entry is presence-gated by construction:** a lint (not runtime magic) checks
  that every option leading into an owned scene carries `requires: 'npc:<owner>'`.
  The existing hand-written gates already do this for walkers; statics get it
  when their options gain the gate in migration.
- **Map aliases become checkable:** an owned scene must alias (in `NODE_AT`) to a
  node on its owner's route. Mapaudit rule, catches misplaced conversations
  forever.
- **Prose honesty lint:** a character-noun in a non-owned node's prose
  (plaku/gruaja/tregtari/bariu…) must sit inside a `when('npc:…')` /
  `when('npcAt:…')` gate. Same wordlist mechanism as the existing prose lint.

### 3. Character memory: `met:` and `told:` virtual items

Two new prefixes through the same `hasCond()` switch, backed by one new per-run
map `state.npcMemory` (defaults merge safely into old saves via `loadState()`):

- `met:<npc>` — stamped on first entry to any scene the NPC owns.
- `told:<npc>:<key>` — a node (or an option) carries `marks: 'told:plaku:biri'`;
  entering it stamps the flag.

Both usable everywhere `when()/unless()/requires/unless` already work. What this buys,
in the game's own idiom:

- **Greetings that know you.** `unless('met:tregtari')` → "mirëdita, i huaj!";
  `when('met:tregtari')` → "o, ti je! eja, eja!" — genuinely useful Albanian
  (formal vs familiar address) that the survival-core cares about.
- **Stories told once.** The plaku's three-part life story marks
  `told:plakuSheshit:biri`; on revisit the opening line is a short
  acknowledgment ("të tregova për birin tim…") and the "dëgjo plakun" option is
  `unless`-hidden or leads to a different, shorter exchange. Same for the
  miller's *shihemi nesër* — next day he can actually say "erdhe përsëri!".
- **Quest feedback for free.** The bariu quest's silent outcome becomes
  `when('told:bari:ndihmove', …)` thank-you lines whenever you meet him again,
  anywhere on his route.

Persistence decision: **per-run** (in `baseRun()`), like inventory — a new run is
a new stranger. (Revisit later if runs feel too forgetful; the storage shape
doesn't change.)

### 4. Phase-aware speech (content pattern + lint, no engine change)

Greeting lines inside owned scenes get phase gates:

```js
when(['dawn'], L(w('mirmengjes'), p('!'))),
when(['day'],  L(w('miredita'),  p('!'))),
when(['dusk', 'night'], L(w('mirembrema'), p('!'))),
```

This is exactly the vocabulary distinction the game exists to teach, currently
taught wrong (mirmëngjes at midnight). New prose lint: any greeting token in an
npc-owned scene must be phase-gated.

## What each weirdness maps to

From the full character audit (15 issues found):

- Verbatim repetition, no memory (miller, plaku, Aga Ymer's ballad) → **#3 marks**
- Statics ignore time of day (trader's morning greeting, 24/7 shop) → **#1 + #4**
- Mid-conversation walk-away / conversation nodes as fake places → **#2 pinning + ownership**
- Walkers content-poor vs statics position-poor → **#1 unification** (one roster,
  both get scenes)
- Unexplained appearing/vanishing `when()` lines, prose mentioning absent people →
  **#2 prose-honesty lint**
- Silent quest outcomes (bariu) → **#3 told: flags**
- plakaPyllit's Shtriga turn without warning → content fix in her owned scenes,
  now that she can own scenes (a `when('met:plakaPyllit')` foreshadow line)
- Identity ambiguity ("plaka" = elder? forest crone? well woman?) → the roster
  forces distinct ids; the audit's naming collisions get resolved during migration

Not solved here (out of scope, noted for later): supernatural beings acting like
shopkeepers (Zana's mundanity) — that's story voice, not systems; missing item
sources (mish/qumësht givers) — economy pass.

## Migration plan

Each phase lands green on `node scripts/audit.mjs` before the next starts.

- **Phase 0 — engine (~60 lines):** `npc:` node field + pinning in `npcNodeOf`;
  `met:`/`told:` prefixes in `hasCond`; `marks:` stamping in the CHOOSE reducer;
  `npcMemory: {}` in `baseRun()`. No content changes; all existing behaviour
  identical (no node has `npc:` yet).
- **Phase 1 — two pilots:**
  - *plakuSheshit* (walker with existing 3-scene monologue): own `sheshiPlak1–3`,
    add `told:` marks + revisit short-forms, verify pinning feels right.
  - *tregtari* (static): add to roster with day schedule, gate stall options on
    `npc:tregtari`, night line at sheshi, phase-gated greetings.
- **Phase 2 — roster sweep:** every static character from the audit's Type-2 list
  into `npcs.js` with schedules per the table above; their scenes get `npc:`
  ownership; their entry options get presence gates.
- **Phase 3 — content quality pass:** memory marks on every repeat monologue;
  met/unmet greeting pairs; talk-scenes for the walkers that deserve them
  (gruaUji beyond one node; bariu thank-you), explicit "atmosphere-only"
  exemptions for krushqit/xhindet.
- **Phase 4 — lints (mapaudit #21–24):** owned-scene entry gates; owned-scene
  map alias on owner's route; prose-honesty (ungated character nouns); greeting
  phase-gating. These make the whole thing self-enforcing, standard-#16-style.

## Risks / open questions

- **Pinning vs the clock:** the world clock still ticks during conversation
  (fire burns down, other NPCs walk) — only the interlocutor is pinned. Believed
  right; watch the pilot.
- **Shop closed at night could soft-lock a hungry player** — audit the bread
  sources by phase (bujtina stays open as the night valve).
- **`met:` per-run vs cross-run** — starting per-run; revisit after play.
- **Sighting lines** (the `when('npc:x')` "you see her at the spring" lines) stay
  hand-authored per node — auto-injection was considered and rejected: placement
  within a scene's prose is craft, and the coverage lint (#24, every route stop
  has a sighting line or exemption) gets the consistency without the genericity.
