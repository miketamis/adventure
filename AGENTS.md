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
