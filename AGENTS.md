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

## Immersive environment narration

- Prefer authored scene prose that reveals the current time, season, or weather through what the player sees happening in that place.
- Generated environment prose is a fallback per dimension, not a mandatory header. Mark an authored token line with `describesEnvironment('time' | 'season' | 'weather', line)` so normal play omits only the matching generic fact while that line is visible.
- Keep this contract metadata-driven. Do not infer environmental meaning from Albanian tokens or English text, and do not remove unrelated fallback dimensions.
- When adding or changing environmental scene prose, extend `scripts/storycontextaudit.mjs` so the visible-line case and its remaining fallbacks are pinned.
