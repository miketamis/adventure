# Repository working rules

## Checkpoint discipline

- Commit after each coherent, verified increment instead of allowing unrelated work to accumulate in one large working tree.
- Before every commit, inspect the staged file list and staged diff, run the checks appropriate to the change, and confirm that the commit contains only project material.
- Keep checkpoint commits focused and use a message that states the player-facing or engineering outcome.

## Private research boundary

- Never add, stage, commit, or publish private conversations, WhatsApp exports, screenshots, phone numbers, participant names, or transcript-derived raw text.
- `chatScreenshot/` and `.private/` are local research inputs only. They must remain ignored by Git and must never become build or test dependencies.
- Public curriculum and story content may use aggregate findings and independently authored standard-Albanian examples. Do not copy distinctive private messages into tracked files.
- Before every commit that changes language content, verify the ignored private paths are untracked and scan the staged changes for private-chat markers.

## Learning-surface answer boundary

- Fluent whole-line and whole-action English readings are editorial metadata and must remain debug-only. Ordinary play may expose the Albanian, local word glosses, and explicit feedback after an attempt, but must not place the completed English answer beside an active story sentence or choice.
- Accessible names must follow the same rule: normal-play controls announce the Albanian choice, never a hidden fluent English answer.

## Scene prose and density

- Write each location as a coherent lived beat, not a stack of database facts. Combine details that the player perceives together; avoid runs of short “X is…” sentences, repeated subjects, redundant signposts, and state facts that do not affect the scene.
- A normal story card must use the shared scene-presentation budget. Core prose may paginate but must never be silently discarded. Mark only genuinely optional atmosphere with `ambient(...)`; an ambient line may fill spare room but may not create another page or displace a reveal-bearing line. Debug mode must retain the full source prose and expose the normal-play projection.
- Prefer one short sensory environmental sentence that naturally conveys time, season, or weather. When authored prose already conveys a dimension, mark that exact dimension with `describesEnvironment(...)` so the generic fallback disappears; do not pile a second weather/status sentence on top.

## Immersive environment narration

- Prefer authored scene prose that reveals the current time, season, or weather through what the player sees happening in that place.
- Generated environment prose is a fallback per dimension, not a mandatory header. Mark an authored token line with `describesEnvironment('time' | 'season' | 'weather', line)` so normal play omits only the matching generic fact while that line is visible.
- Keep this contract metadata-driven. Do not infer environmental meaning from Albanian tokens or English text, and do not remove unrelated fallback dimensions.
- When adding or changing environmental scene prose, extend `scripts/storycontextaudit.mjs` so the visible-line case and its remaining fallbacks are pinned.

## Train progression integrity

- A harder phrase exercise may unlock only from phrase-specific evidence for the skills it requires. Recognition totals or general player ability must never skip cloze, ordering, contextual word spelling, or supported whole-phrase production.
- Keep exercise families, variants, mix weights, gates, transitions, spacing, and remediation in the production progression registries. Builders and the debug Learning graph must consume those same objects; do not copy thresholds into UI code.
- Never schedule consecutive Train questions that share an Albanian word. When no disjoint question exists, show the caught-up state instead of silently repeating the only target.
- Treat production, listening, and matching as separate evidence tracks. Wrong production answers must back off to targeted support after a disjoint round; retained strict recall must be spaced.
- Any new Train kind, mode, variant, or unlock rule must be represented in the debug Learning graph and covered by `scripts/learningprogressionaudit.mjs` in the same change.
