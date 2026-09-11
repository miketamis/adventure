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
- Classify scene prose through the shared presentation contract as immediate-essential, optional ambient, or observation-gated. Entry must retain immediate footing, active danger, and an ordinary way forward; a coherent optional 1–2-line detail may move behind a same-place look/listen/inspect action.
- Author progressive perception through the shared observation registry and `observed:<id>` state, never a bespoke node or one-off flag. An attention action is zero-time, disappears after use, persists across save/reload for the run, and may reveal a detail-dependent optional route; it must not hide every ordinary movement or required quest action. Keep at most two simultaneous attention actions in a scene and extend `scripts/observationaudit.mjs` with the content change.
- A normal story scene is one continuous browser-scroll surface: never paginate it, and never silently discard core prose. Mark only genuinely optional atmosphere with `ambient(...)`; an ambient line may fill spare room in a compact scene but may not extend an already crowded scroll or displace a reveal-bearing line. Debug mode must retain the full source prose and expose the normal-play projection.
- Prefer one short sensory environmental sentence that naturally conveys time, season, or weather. When authored prose already conveys a dimension, mark that exact dimension with `describesEnvironment(...)` so the generic fallback disappears; do not pile a second weather/status sentence on top.

## Immersive environment narration

- Prefer authored scene prose that reveals the current time, season, or weather through what the player sees happening in that place.
- Generated environment prose is a transition fallback per dimension, not a mandatory header: the opening transition from unknown conditions communicates each initial time, season, and weather value once, except where visible authored prose already conveys that dimension. Thereafter, narrate a generic fact only when its value actually changes since it was last communicated. A visible authored `describesEnvironment('time' | 'season' | 'weather', line)` records that dimension and replaces its generic twin. Persist this narration snapshot so movement under unchanged conditions, revisits, and save/reload do not repeat an acknowledged transition.
- Keep this contract metadata-driven. Do not infer environmental meaning from Albanian tokens or English text, and do not remove unrelated fallback dimensions.
- When adding or changing environmental scene prose, extend `scripts/storycontextaudit.mjs` so the visible-line case and its remaining fallbacks are pinned.
- Keep transition fallback decisions and their persisted snapshot in the shared environment-narration contract; do not copy change-detection into components or infer communication from ordinary token text. Scope communicated snapshots by the canonical clock domain (`world` or the bound tale), so a detour into the living world and a return to frozen tale time can never masquerade as forward or backward environmental change.
- Distinguish an opening state from a later transition in the Albanian itself: the opening may say that it is spring or raining, while a later weather onset says that it starts to rain or snow and a later time/season line uses change-oriented wording. Preserve the previous snapshot in the shared plan so this wording cannot drift from the real state transition.

## Immersive health narration

- Treat health prose as transition context, not permanent scene boilerplate. Establish the initial heart count once and show a full-health line again only when the count changes; keep one- and two-heart warnings visible while wounded, and always retain the line while its self-heal affordance remains relevant. Persist the last communicated count so unchanged movement and reloads stay quiet.
- Every player-facing heart decrement must commit atomically with the shared blocking consequence contract: identify the exact attempted answer/action, explain why it failed in that context, and show the correct answer, safe reasoning, or exact reviewed grammar pattern before an explicit return to play. Missing explanation metadata fails closed without applying the penalty or any paired story/progression mutation. Keep debug-only health controls as an explicit audited exemption, and extend `scripts/heartconsequenceaudit.mjs` whenever a decrement source changes.

## Immersive inventory narration

- Treat the pack, purse, and companions as remembered story context rather than permanent ledgers. Establish positive opening holdings once; thereafter narrate acquisitions, losses, and money changes once, while retaining only a held object or companion that enables a real action in the current scene. Persist the communicated snapshot so unchanged movement and reloads stay quiet, and join money-changing actions to their resulting balance.
- Derive actionable holdings from the same item, tag, affordance, and choice requirements that gate the real action. Do not maintain a second scene-specific relevance list or let a generated carry line claim a quantity or grammatical form the canonical inventory and item catalog do not support.

## Train progression integrity

- A grammatical/function word or a sense sharing its Albanian spelling with another dictionary sense may enter Train only through an explicitly reviewed, natural Albanian situation that uniquely identifies its job. Account for every same-spelling contrast, keep learner-visible cues outside the target, use a fluent full-English retrieval cue and distinct sense-specific options, and fail closed rather than awarding evidence from a bare ambiguous form; `scripts/contextquestionaudit.mjs` must exercise every emitted context variant.
- Saving a newly discovered word completes guided recognition because the learner has deliberately paired that word with its meaning. Its first Train stage is four-choice independent Albanian-to-English recognition; Albanian selection, typed spelling, strict retention, and reviewed forms unlock only from that word's exact saved evidence, and lifetime token totals may not substitute for a productive proof.
- Personal and place names are pronounceable world knowledge, never discoverable vocabulary, token rewards, or word/form Train targets. Meaning-bearing Albanian titles and mythic kinds remain trainable lexical senses; classify every name/title candidate explicitly in the shared trainability registry and audit the save/reducer boundary.
- A word-stage miss must schedule easier support after a disjoint round without erasing all earlier proofs or immediately oscillating the durable stage. Keep word stages, gates, transitions, answer tolerance, spacing, and the debug walkthrough in the shared production registry.
- A harder phrase exercise may unlock only from phrase-specific evidence for the skills it requires. Recognition totals or general player ability must never skip cloze, ordering, contextual word spelling, or supported whole-phrase production.
- Restarting the story preserves the durable learner profile: saved vocabulary, backed token balances, word/form/phrase proofs and remediation, spacing, listening/matching progress, and CEFR evidence. It clears only the current Train question/consequence and the resettable world attempt through the shared reset-policy helper. Save migration must recover vocabulary implied by durable evidence, and no token may survive without at least as much monotonic correct-practice evidence.
- Keep exercise families, variants, mix weights, gates, transitions, spacing, and remediation in the production progression registries. Builders and the debug Learning graph must consume those same objects; do not copy thresholds into UI code.
- Never schedule consecutive Train questions that share an Albanian word. When no disjoint question exists, show the caught-up state instead of silently repeating the only target.
- Treat production, listening, and matching as separate evidence tracks. Wrong production answers must back off to targeted support after a disjoint round; retained strict recall must be spaced.
- Any new Train kind, mode, variant, or unlock rule must be represented in the debug Learning graph and covered by `scripts/learningprogressionaudit.mjs` in the same change.
- Every Train question must identify exactly one target: mark it, name its exact surface in the instruction, or show one unambiguous gap. Difficulty may remove scaffolding or translation, never the task referent. Progression and difficulty labels are authoring metadata and remain debug-only.
- A distractor must be genuinely incompatible with the exact sentence and meaning shown. Never mark a grammatical or semantically valid alternative wrong merely because another answer is more idiomatic or better matches the editorial translation; remove the ambiguous option or explicitly accept every valid answer.
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
- A choice must never reveal a positive money reward before the player commits to it; exact payout previews are debug-only. The resulting scene must join the canonical transaction prose to the new total balance, including a zero-balance sentence when appropriate, rather than showing an unexplained purse total before the payment.
- Living-world prices and rewards use the current nominal value printed on Albanian money. "Old lek" may appear as believable dialogue only when the same scene makes the 10:1 conversion explicit; game effects and affordability always use the nominal amount.
- Movement and appointments must preserve physical continuity. A conversation choice cannot silently teleport the player; moving NPCs need a location, timing policy, late/missed reactions, and persistence tests. Once the player learns an NPC’s name, later authored dialogue should use that name where a natural speaker tag appears.
- Classify every recurring runtime NPC identity as either `discoverable` or `known-by-context`. A discoverable proper name needs an anonymous descriptor, an authored reveal choice, and persistent named/anonymous surfaces; a contextual role or collective must not manufacture a hidden name gate.
- Do not turn ordinary dialogue, information, shopping, travel, rewards, or tasks into runs of mandatory same-place “continue” choices. A reviewed linear exception is reserved for a brief physical action and its immediate consequence when returning agency mid-beat would be implausible; record the exact chain and reason in the shared narrative-flow registry.
- Choices must never reveal their fluent English answer before the learner acts. Accessibility labels obey the same answer boundary as visible copy.

## Conversation agency and character presence

- A substantial ordinary NPC conversation starts with a short lived beat and player-chosen topics, not a multi-fact monologue followed by a lone leave button. Use the shared conversation-hub contract so questions may be asked in any order, the latest answer replaces the previous answer, exhausted questions retire or deliberately change, and leaving remains voluntary at every point. A player who chooses a specifically labelled story or performance may receive that requested telling without turning it into a question hub.
- Never place an NPC question and the traveller's unchosen reply in the same scene line. Explicit player speech and voluntary acts must be selectable, or must be the immediate, matching consequence of the option just chosen; passive perception and unavoidable physical consequences remain narration.
- Give a recurring person one concise, distinctive first-encounter portrait at their canonical meeting place. Choose only details that fit their role, location, lore and present activity—such as clothing, posture, a carried object, voice, work marks or one memorable feature—and use the shared appearance registry so the portrait does not repeat on every visit. Prefer useful present-day person-description vocabulary; do not generic-fill every NPC from one template or reveal a discoverable name inside the portrait. The portrait node must match the NPC's registered placed node, walking route or explicit encounter scene, and tale casts must enter at their actual tale beat rather than accumulating in a shared overworld hub. Keep unconditional portrait density to at most four in a tale scene and at most two in a shared hub.
- Retire a projected first-encounter portrait through the persisted per-NPC seen ledger, never through location familiarity. A route-based portrait may enter that ledger only while the NPC is actually present; keep the just-recorded portrait latched for the current encounter, clear that latch on departure, preserve seen identities across save/reload and story restarts, and exercise absent-first-visit, arrival, reload and revisit behavior in `scripts/npcappearanceaudit.mjs`.
- Merge adjacent facts perceived in the same instant into one natural sensory sentence, especially when a time/weather/season line can absorb a bare static adjective about the same person, object or place. Do not render a state table as consecutive `X is …` lines.

## Quest and stateful-mechanics integrity

- Model ordinary overworld quests in the shared quest registry and concurrent quest map, using stable IDs and explicit offer, accept, decline, abandon, objective, completion, reward, and item-retention policies. Do not create a singleton current quest or parallel readiness flags.
- Derive objective readiness from canonical live state. A delivery quest checks the actual inventory at hand-in, accepts items acquired before or after the offer through any believable route, and becomes not-ready again if an objective item is spent elsewhere.
- Apply quest activation, advances, costs, item consumption, completion, and rewards through the same atomic effect transaction as ordinary choices. Stale or repeated actions must not duplicate an advance, payout, item cost, completion, or consequence.
- Accepting a quest returns control to ordinary free roam unless movement is explicitly spoken and physically represented. An incomplete return may give a short contextual reminder but must not trap the player; a hand-in that moves somewhere must say so in the Albanian action.
- Keep one canonical authority for each mechanic: physical objects and lek in inventory, health in hearts, time/weather/season in the clock projection, location in nodeId, learned NPC identity in knowledge, lasting consequences in worldFacts, and quest lifecycle in quests. Save normalization must remove or migrate shadow aliases, and reset behavior must be deliberate and audited.
- Every quest addition or lifecycle change must extend `scripts/questaudit.mjs`; every new state channel or cross-system mutation must extend `scripts/canonicalstateaudit.mjs` in the same change.
