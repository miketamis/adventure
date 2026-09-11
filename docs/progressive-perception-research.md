# Progressive perception: engine research and project contract

This note records the design comparison behind the observation and environment-narration systems. It is an engineering constraint, not a claim that this game should imitate a parser UI.

## What mature interactive-fiction systems suggest

| Engine/pattern | Useful documented behavior | Mapping here | Decision |
| --- | --- | --- | --- |
| [Inform actions and rulebooks](https://ganelson.github.io/inform-website/book/WI_12_1.html) | Examining is an action with normal visibility/access checks and before/instead/after rules. | Observation is a canonical typed effect and ordinary choice, checked by the same reducer boundary as movement and item use. | Implemented now. |
| [Inform memory and knowledge](https://ganelson.github.io/inform-website/book/RB_5_5.html) | `seen`, `familiar`, and `known` are distinct; descriptions and even a character's displayed name may change with knowledge. | `observations` records local attention; `knowledge` records durable facts; `npcIdentity` separately controls learned names. | Keep the three ledgers distinct. Do not collapse them into `visited`. |
| [Inform time](https://ganelson.github.io/inform-website/book/RB_4_1.html) and [time of day](https://ganelson.github.io/inform-website/book/WI_9_6.html) | Actions may take different durations, including no time for review; time can drive shops and NPC activity without being constantly printed. | Observation actions use `durationHours: 0`; routes retain their own travel duration; NPC schedules and environment conditions use the shared clock. | Implemented now. |
| [Inform state-based scenes](https://ganelson.github.io/inform-website/book/WI_10_9.html) | Scene boundaries follow durable state conditions, reducing continuity errors when revisiting a place later. | Observation conditions, quests, fixtures, rendezvous, NPC positions, and world facts remain independent state machines composed at the choice boundary. | Existing architecture retained; audits cover cross-system composition. |
| [ink choices and read counts](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#conditional-choices) | Choices may be once-only or sticky, conditional on prior content, and queried by visit/read count. `TURNS_SINCE` can prevent repeated checking. | A same-place observation is once-only for the run, disappears immediately, and exposes its lines/routes through `observed:<id>`. | Implemented now. No cooldown is needed for a one-shot action. |
| [ink wide choice organisation](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#example-organisation-of-wide-choice-points) | Large parallel action sets should be grouped/filtered while exits remain available. | The shared policy caps simultaneous observation affordances at two, while the audit requires an ordinary route to remain. | Implemented now. |
| [ink list state](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md#part-5-advanced-state-tracking) | Reusable enumerated state is preferable to piles of unrelated booleans when objects can move through known stages. | Timed fixtures and quests already use reusable state machines; observations intentionally remain small immutable records rather than bespoke flags. | Existing architecture retained. |
| [ChoiceScript variables and conditions](https://www.choiceofgames.com/make-your-own-games/choicescript-intro/) | Earlier decisions should alter later text and choices through explicit variables. | Revealed prose and detail-dependent choices consume the same observation condition. | Implemented now. |
| [ChoiceScript Quicktest and Randomtest](https://www.choiceofgames.com/make-your-own-games/testing-choicescript-games-automatically/) | Exhaustive branch checks and deterministic randomized play find different failures; hit counts expose dead content. | `observationaudit.mjs` exhausts every beat structurally; `statefuzzaudit.mjs` commits attention actions in every possible order within each scene and checks stale replay/save repair. | Implemented now. |
| [SugarCube state, history, and saves](https://www.motoslave.net/sugarcube/2/docs/#guide-state-sessions-and-saving) | Story variables, navigation moments, history, and save serialization have different lifetimes; same-passage mutations require care. | The observation and last-narrated-environment ledgers live in canonical saved reducer state, so same-place actions survive reload without relying on component-local state. | Implemented now. |
| [SugarCube visited/history APIs](https://www.motoslave.net/sugarcube/2/docs/#functions-function-visited) | A passage visit is useful history, but it is not a substitute for all world state. | `visited` remains navigation history; looking at the mountain is explicit observation evidence. | Implemented now. |
| [Harlowe reveal patterns](https://twine2.neocities.org/2/#macro_show) | A link can reveal a hidden hook in place rather than navigate to a new passage. | Observation actions reveal prose in the current node without teleporting or creating a fake sub-location. | Implemented now. |
| [Dialog's action/choice and undo model](https://github.com/Dialog-IF/dialog/blob/main/readme.txt) | Choice-mode de-duplicates choices; visibility is recomputed after room/object movement; undo is defined at an intelligible action boundary. | Generated observation IDs are unique, visibility is derived after each reducer commit, and stale action replays are rejected. | Implemented now; player-facing undo remains a separate product decision. |

## Current invariant

- Entry prose contains immediate footing, active danger, and enough context to choose.
- Optional detail is one coherent beat of one or two lines, revealed by `look`, `listen`, `inspect`, or `ask` without moving or advancing time.
- The action disappears once observed. The result persists across revisit and save/reload for the current run.
- A detail-dependent optional route may share the observation condition, but every affected scene retains an ordinary non-observation route and required character thresholds are not gated.
- No scene exposes more than two attention actions. This limits click-spam and keeps the useful Albanian action phrases legible.
- Time, season, and weather are narrated per dimension only when the value changes. Visible authored environmental prose records the same communication and suppresses its generic duplicate.
- Fluent English readings remain editorial/debug metadata; observation options obey the same learning-surface boundary as every other story choice.

## Follow-up candidates, not part of this increment

1. Add a general `perceivable` object/entity layer only when interactions need independent object location, container, or multi-stage state. The current line-beat registry is smaller and sufficient for static scene details.
2. Add world-change invalidation or versioned re-observation only when a detail can materially change after it was seen. Key it to a fixture/world-fact stage rather than clearing all observations.
3. Add an author-facing observation coverage panel with randomized traversal hit counts if the debug view needs editorial discovery analytics. Release audits already guarantee reachability and non-dead-end behavior.
4. Decide player-facing undo separately. Learning attempts, timed appointments, and durable consequences need an explicit policy; silently adopting passage-history rewind would conflict with those systems.
