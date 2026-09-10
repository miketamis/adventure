# Zero-to-A2 outcome contract

## Decision

The current game has strong A1 foundations and emerging A2 **content coverage**. It does not yet demonstrate that a learner has completed A1 or A2 across all communicative modes.

That distinction matters. CEFR is an action-oriented proficiency profile, not a word-count scale. Its A2 global description combines understanding high-frequency language, handling simple routine exchanges, and describing one’s background and immediate environment. The Companion Volume also treats listening, reading, production, interaction and mediation as related but distinct activity types. A learner’s profile is normally uneven.

The product claim therefore remains:

> A1 foundations with emerging A2 coverage; no completed CEFR level is yet evidenced across all modes.

The shortest route to a defensible outcome is not another large vocabulary tranche. It is a compact, lore-grounded transfer and performance layer that uses the existing curriculum in unfamiliar tasks.

The executable source of truth is `src/game/cefrProgression.js`; `node scripts/cefraudit.mjs` prints the live preparation inventory and checks this contract.

## What the game already does well

- A large Albanian story graph makes reading central to play.
- The practical lane covers greetings, identity, family, needs, plans, time, weather, directions, buying, food, lodging, care, repair and ordinary objects.
- Whole phrases move from cloze to arrangement, contextual spelling, complete typed production and spaced strict recall.
- Listening and matching have separate mastery tracks, and phrase playback uses continuous audio.
- Reviewed word forms and noun-role correction give unusually strong morphological support for a beginner game.
- Practical phrases must be grounded in playable story situations.

These are valuable prerequisites. They cannot alone prove CEFR transfer because the learner has already seen every target and the correct response is fixed.

## Current estimated completion profile

This is a curriculum estimate, not a certificate and not a prediction for every player.

| Mode | Likely result after genuine mastery of current content | Why the claim stops there |
|---|---|---|
| Reading | A2-like comprehension of familiar, game-supported narrative; A1+/A2- transfer estimate | There is no held-out set of notices, lists, instructions, correspondence and short texts without gloss support. |
| Listening | Strong A1 and emerging A2 for rehearsed phrases | Listening uses the known phrase bank, learner-triggered replay and one synthetic voice; unfamiliar messages, announcements and speaker variation are not assessed. |
| Spoken interaction | Useful A2-oriented phrase repertoire, but no evidenced level | Selecting or typing a known choice does not test live turn-taking, repair, intelligibility or response to an unexpected follow-up. |
| Spoken production | No evidenced level | The game does not capture a connected spoken description of family, home, work, routine or experience. |
| Written interaction | A1-oriented repertoire, but no evidenced level | The game has no learner-authored greeting, reply, apology, news update or meeting arrangement. |
| Written production | A1+/A2- fixed-sentence spelling and recall; no open-production evidence | Exact phrase typing does not test a connected series of the learner’s own sentences. |
| Mediation | No evidenced level | No task asks the learner to find a main point and relay it for a character who cannot access the source. |
| Language control | Broad beginner vocabulary and strong reviewed-form exposure | A2 permits errors, but the game must still test creative recombination, simple cohesion and intelligible pronunciation rather than infer them from form counts. |

The honest overall shorthand is **strong A1 / emerging A2**. The game is close to an A2 syllabus boundary, but not a few nouns away from a full A2 learner-outcome claim.

## The smallest coherent quest architecture

Do not build a detached exam tab. Add two recurring, optional-but-required-for-milestone quest threads to the lived world.

### A1: the village day

1. **Bridge and inn voices.** Two familiar-world speakers give new combinations of name, destination, need, price and time. The player listens and acts; no transcript is shown before the attempt.
2. **Market and door texts.** The player reads a stall list, inn notice and meeting note to find one predictable fact.
3. **Three short spoken encounters.** Elira, an innkeeper and a trader ask about identity, location, destination, need and price. The player records an answer; the next question depends on its communicative intent.
4. **Guest-room introduction.** The player records simple sentences about where they live and a person they know.
5. **Messenger board.** The player writes and answers a short greeting/location/thanks note in their own words.
6. **Relay for Elira.** Elira cannot see an inn or market notice, so the player tells her its time, place or price.

The A1 gate opens only when all seven activity modes pass. Reception requires at least two independent windows at 80%; productive and interactive modes require at least two passing performances; at least three speech recordings must be intelligible to a supportive listener. A high reading score cannot compensate for missing speech.

### A2: roads, guests and changed plans

1. **Town-crier and traveller messages.** New, short announcements cover road conditions, weather, market hours, a feast, lodging and a changed meeting. They use at least three clear standard-Albanian voices and include separate gist and detail questions.
2. **The working town in writing.** The player uses unfamiliar inn tariffs, stall lists, route notices, invitations, personal letters and appointment notes to take consequential actions.
3. **Six routine spoken problems.** Buying goods, finding a room, following directions, visiting the healer, accepting or declining an invitation, and changing a meeting each become a four-to-six-turn role-play with a supportive but not fully predictable follow-up.
4. **The guest’s story.** At supper the learner describes family, home, work or learned craft, a daily routine and one recent journey or event as a short connected recording.
5. **Courier correspondence.** The learner exchanges notes about news, feelings, needs, an apology and a meeting whose place or time changes.
6. **A connected account.** The learner writes Elira or the innkeeper 50–80 words about what happened, the present problem and what should happen next, using simple connectors.
7. **The healer’s instruction.** The learner relays the main point of a new instruction or announcement, then helps two characters agree on the next practical action.

The A2 gate requires A1 first. Reception again requires two independent 80% windows, with both gist and detail represented. Each productive, interactive and mediation mode requires at least three passing tasks. At least five recordings must meet the intelligibility floor. No cross-skill averaging is allowed.

## Required training additions

The capstones cannot be the learner’s first exposure to their task type. Add these mechanics before their corresponding gates:

- **Listen for gist, then detail:** first choose the situation or intent, then recover a time, place, person, price or action.
- **Slot recombination:** rebuild familiar frames with a different person, tense/time expression, place, object or reason. The result must be meaningful, not merely a new token order.
- **Multiple acceptable replies:** dialogue and writing should grade communicative intent and required details; exact-string equality remains suitable only for spelling drills.
- **Past, present and near-future sequencing:** describe what happened, what is happening and what will happen next inside one coherent quest.
- **Connectors:** repeatedly use `dhe`, `por` and a reviewed causal connector in learner-authored speech and writing.
- **Record, replay and retry:** speaking practice needs a private local playback loop, a model played separately, and feedback that does not expose a transcript before the attempt.
- **Conversation repair:** allow the learner to ask for repetition, slower speech, clarification or meaning, and make those moves affect the next turn.
- **Scan and relay:** find a concrete fact in a short source and communicate it to an NPC who does not have that source.

## Browser assessment boundary

The browser can assess some evidence reliably:

- choice of gist, detail and world action after held-out listening or reading;
- information retrieval from short texts;
- word order, spelling and reviewed grammatical forms;
- presence of required meanings in constrained free text, provided acceptable alternatives are authored and reviewed;
- whether a dialogue task reached its communicative goal;
- repeated evidence, spacing and non-compensatory mode gates.

The browser can **train** but should not claim to validate these unaided:

- overall pronunciation, stress, rhythm and intelligibility;
- spontaneous spoken interaction from an automatic transcript alone;
- the adequacy of an unrestricted written response from surface-form matching alone;
- CEFR cut scores before piloting and standard-setting.

For speech, capture the learner’s audio and use transcription only as one task-completion signal. Intelligibility needs a validated Albanian speech measure or a human-rated sample. A learner may complete the game alone, but the public product label should be **A1-ready/A2-ready** until the tasks, rubrics and cut scores are reviewed by Albanian specialists, piloted with true beginners and externally related to CEFR.

This caution is especially important for Albanian. CEFR itself is language-independent, while language-specific Reference Level Descriptions identify the forms and vocabulary expected at each level. The Council of Europe’s published list does not currently provide an assessed Albanian A1/A2 Reference Level Description, so the Albanian grammar and lexical blueprint needs its own expert review rather than being inferred from another language.

## Performance rubric

Open speaking and writing use the same four-point dimensions:

1. task fulfilment;
2. comprehensibility;
3. useful range for the task;
4. control of simple structures;
5. cohesion.

Every dimension must reach 2/3. Task fulfilment and comprehensibility are critical: neither may be averaged away. A2 still allows systematic basic mistakes when the intended message remains clear. Spoken evidence additionally applies the level’s intelligibility floor; written evidence applies an orthographic-comprehensibility floor rather than demanding perfect spelling.

## Release sequence

1. Ship task records, held-out content separation and local evidence storage without changing the existing Train gates.
2. Add the A1 village-day training scenes and task variants.
3. Add speech recording/replay and meaning-based free-response scoring; arrange specialist review before enabling an A1-ready badge.
4. Pilot the A1 gate with true beginners and adjust task difficulty, not the level descriptor.
5. Add the A2 road/guest/changed-plan arc and its held-out forms.
6. Pilot A2 per mode, standard-set the cut scores, and only then consider a public CEFR-aligned outcome claim.

## Official basis

- [Council of Europe: CEFR overview](https://www.coe.int/en/web/common-european-framework-reference-languages)
- [Council of Europe: CEFR global scale](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale)
- [Council of Europe: CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors)
- [Council of Europe: CEFR Companion Volume (2020)](https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4)
- [Council of Europe: tests and examinations](https://www.coe.int/en/web/common-european-framework-reference-languages/tests-and-examinations)
- [Council of Europe: language-specific Reference Level Descriptions](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-reference-level-descriptions-language-by-language-components-and-forerunners)
- [Council of Europe: Reference Level Descriptions developed so far](https://www.coe.int/en/web/common-european-framework-reference-languages/reference-level-descriptions-rlds-developed-so-far)
