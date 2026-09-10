# Repository working rules

## Checkpoint discipline

- Commit after each coherent, verified increment instead of allowing unrelated work to accumulate in one large working tree.
- Push each verified checkpoint to the configured upstream before beginning the next increment, then verify that the upstream branch resolves to the local commit. A local commit is not a completed checkpoint.
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
- A normal story scene is one continuous browser-scroll surface: never paginate it, and never silently discard core prose. Mark only genuinely optional atmosphere with `ambient(...)`; an ambient line may fill spare room in a compact scene but may not extend an already crowded scroll or displace a reveal-bearing line. Debug mode must retain the full source prose and expose the normal-play projection.
- Prefer one short sensory environmental sentence that naturally conveys time, season, or weather. When authored prose already conveys a dimension, mark that exact dimension with `describesEnvironment(...)` so the generic fallback disappears; do not pile a second weather/status sentence on top.

## Immersive environment narration

- Prefer authored scene prose that reveals the current time, season, or weather through what the player sees happening in that place.
- Generated environment prose is a fallback per dimension, not a mandatory header. Mark an authored token line with `describesEnvironment('time' | 'season' | 'weather', line)` so normal play omits only the matching generic fact while that line is visible.
- Keep this contract metadata-driven. Do not infer environmental meaning from Albanian tokens or English text, and do not remove unrelated fallback dimensions.
- When adding or changing environmental scene prose, extend `scripts/storycontextaudit.mjs` so the visible-line case and its remaining fallbacks are pinned.

## Train progression integrity

- Saving a newly discovered word completes guided recognition because the learner has deliberately paired that word with its meaning. Its first Train stage is four-choice independent Albanian-to-English recognition; Albanian selection, typed spelling, strict retention, and reviewed forms unlock only from that word's exact saved evidence, and lifetime token totals may not substitute for a productive proof.
- A word-stage miss must schedule easier support after a disjoint round without erasing all earlier proofs or immediately oscillating the durable stage. Keep word stages, gates, transitions, answer tolerance, spacing, and the debug walkthrough in the shared production registry.
- A harder phrase exercise may unlock only from phrase-specific evidence for the skills it requires. Recognition totals or general player ability must never skip cloze, ordering, contextual word spelling, or supported whole-phrase production.
- Keep exercise families, variants, mix weights, gates, transitions, spacing, and remediation in the production progression registries. Builders and the debug Learning graph must consume those same objects; do not copy thresholds into UI code.
- Never schedule consecutive Train questions that share an Albanian word. When no disjoint question exists, show the caught-up state instead of silently repeating the only target.
- Treat production, listening, and matching as separate evidence tracks. Wrong production answers must back off to targeted support after a disjoint round; retained strict recall must be spaced.
- Any new Train kind, mode, variant, or unlock rule must be represented in the debug Learning graph and covered by `scripts/learningprogressionaudit.mjs` in the same change.
- Keep noun part-of-speech classification independent of the paradigm table. Every declared noun must have either a complete reviewed paradigm or an explicit backlog entry; a missing paradigm must never make a noun look non-inflecting or enter noun-role practice through guessed endings.

## Practical-language grounding

- Prioritize reusable, present-day Albanian for introductions, needs, directions, time, weather, food, buying, help, plans, apologies, conversation repair, and ordinary objects. A practical phrase belongs in Train only when the player can encounter or say it in a believable story situation; `scripts/conversationaudit.mjs` is the release gate.
- Keep folklore and practical language mutually reinforcing. Do not add a detached phrasebook scene, a modern object with no plausible world role, or language that exists only to satisfy a frequency count.
- A designated high-value practical object must have a dictionary sense, appear in playable language outside its definition, and participate in a believable human action or affordance in the story. A shop listing, inventory blurb, passive atmospheric prop, or folklore-only mention is not sufficient; update the designated ledger in `scripts/everydayitemaudit.mjs` with the content change.
- A focused cloze or spelling question rewards only its target word. Whole-phrase rewards belong only to an exercise that actually requires the whole phrase. Listening questions must not expose the English answer, and complete phrases must use continuous phrase audio rather than stitched isolated words.
- Every construction exercise needs plausible distractors. A one-word greeting remains a word exercise; it must not masquerade as a whole-phrase exercise.

## Dictionary and grammatical-form integrity

- Every public dictionary sense must have a real story, option, item, environment, or Train use. Definitions must distinguish the sense in clear Albanian-learning English; placeholders, circular glosses, and generic filler fail the quality gate.
- Model inflection by reviewed grammatical roles appropriate to the word class, not by appending every possible-looking suffix. Never invent a noun paradigm, verb conjugation, adjective agreement form, or pronoun case form to make a coverage number rise.
- A used inflected surface must be attached to its correct dictionary sense and be reachable by the relevant learning path. Correction sheets must use the exact reviewed paradigm for the missed word, explain the transferable class rule and its limits, and label forms by grammatical job rather than implying a memorization order.
- Keep class-specific coverage and remaining editorial scope explicit in the form audits. “Complete” means complete for the declared reviewed roles, never every theoretically possible form of every Albanian word.

## Immersion and debug boundaries

- Normal play must communicate health, money, time, weather, season, carried objects, companions, and consequences through Albanian story prose when relevant. Diagnostic ledgers, the map/atlas, build hash, raw counters, full English readings, and authoring metadata are debug-only.
- Movement and appointments must preserve physical continuity. A conversation choice cannot silently teleport the player; moving NPCs need a location, timing policy, late/missed reactions, and persistence tests. Once the player learns an NPC’s name, later authored dialogue should use that name where a natural speaker tag appears.
- Choices must never reveal their fluent English answer before the learner acts. Accessibility labels obey the same answer boundary as visible copy.
