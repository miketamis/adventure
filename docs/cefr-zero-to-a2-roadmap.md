# Zero-to-A2 outcome contract

## Decision

The game now implements a guided zero-to-A2 curriculum and an internal A1/A2 readiness profile across all seven communicative modes. A learner can move from exact word and phrase knowledge through transfer preparation into held-out listening, reading, speaking, writing and mediation tasks. A2 remains locked behind A1.

That distinction matters. CEFR is an action-oriented proficiency profile, not a word-count scale. Its A2 global description combines understanding high-frequency language, handling simple routine exchanges, and describing one’s background and immediate environment. The Companion Volume also treats listening, reading, production, interaction and mediation as related but distinct activity types. A learner’s profile is normally uneven.

The product claim is deliberately narrower than certification:

> Report A1-ready or A2-ready only as an internal seven-mode profile, never as an accredited or independently verified level.

Open writing, speaking and mediation evidence uses an explicit learner self-review rubric. The browser captures and replays speech locally, but it does not independently judge Albanian pronunciation or unrestricted language quality. Native-speaker review, true-beginner piloting and external standard-setting are still required before any certified CEFR claim.

The executable source of truth is `src/game/cefrProgression.js`; `node scripts/cefraudit.mjs` prints the live preparation inventory and checks this contract.

## What the game already does well

- A large Albanian story graph makes reading central to play.
- The practical lane covers greetings, identity, family, needs, plans, time, weather, directions, buying, food, lodging, care, repair and ordinary objects.
- Whole phrases move from cloze to arrangement, contextual spelling, complete typed production and spaced strict recall.
- Listening and matching have separate mastery tracks, and phrase playback uses continuous audio.
- Reviewed word forms and noun-role correction give unusually strong morphological support for a beginner game.
- Practical phrases must be grounded in playable story situations.

These foundations now feed 21 guided transfer mechanics and 122 held-out capstone situations. Preparation evidence stays separate from first-attempt capstone evidence, so rehearsing a known phrase cannot itself open a level gate.

## Current estimated completion profile

This is a curriculum estimate, not a certificate and not a prediction for every player.

| Mode | Likely result after genuine mastery of current content | Why the claim stops there |
|---|---|---|
| Reading | Held-out A1/A2 reception windows with new notices, lists, correspondence and practical texts | Internally scored choice evidence; cut scores are not externally standard-set. |
| Listening | Held-out A1/A2 messages with gist/detail gates, seven speaker identities and two acoustic synthetic voices | Character identity is not independent acoustic variation; the bank has two actual TTS voices. |
| Spoken interaction | Recorded A1/A2 exchanges with follow-ups, repair and ordinary problems | Recordings stay local; task success and intelligibility are learner-self-reviewed. |
| Spoken production | Recorded descriptions and connected accounts with duration and content floors | The browser does not independently rate pronunciation, range or control. |
| Written interaction | Learner-authored replies, apologies, news and changed arrangements | Communicative criteria are explicit, but the learner applies the open-response rubric. |
| Written production | A1 sentences and A2 connected 50–80 word accounts | Structure is measured automatically; adequacy and comprehensibility are learner-self-reviewed. |
| Mediation | Held-out source-and-listener and collaborative relay tasks | Open relay quality is learner-self-reviewed rather than human-rated. |
| Language control | Exact word/phrase ladders, reviewed forms and guided recombination feed the capstones | An internal pass is readiness evidence, not accreditation or a population-level outcome guarantee. |

The honest shorthand is **a complete internal A1-ready/A2-ready path with self-reviewed performance evidence**. It is no longer only a syllabus boundary, but it is still not a certified CEFR result.

## Implemented quest architecture

Do not build a detached exam tab. Add two recurring, optional-but-required-for-milestone quest threads to the lived world.

### A1: the village day

1. **Bridge and inn voices.** Two familiar-world speakers give new combinations of name, destination, need, price and time. The player listens and acts; no transcript is shown before the attempt.
2. **Market and door texts.** The player reads a stall list, inn notice and meeting note to find one predictable fact.
3. **Short spoken encounters.** Elira, an innkeeper and a trader ask about identity, location, destination, need and price. The player records a reply before a supportive second prompt is revealed.
4. **Guest-room introduction.** The player records simple sentences about where they live and a person they know.
5. **Messenger board.** The player writes and answers a short greeting/location/thanks note in their own words.
6. **Relay for Elira.** Elira cannot see an inn or market notice, so the player tells her its time, place or price.

The A1 gate opens only when all seven activity modes pass. Reception requires at least two independent windows at 80%; productive and interactive modes require at least two passing performances; at least three speech recordings must be intelligible to a supportive listener. A high reading score cannot compensate for missing speech.

### A2: roads, guests and changed plans

1. **Town-crier and traveller messages.** New, short announcements cover road conditions, weather, market hours, a feast, lodging and a changed meeting. Seven story speaker identities are mapped across two acoustic Albanian TTS voices, with separate gist and detail questions.
2. **The working town in writing.** The player uses unfamiliar inn tariffs, stall lists, route notices, invitations, personal letters and appointment notes to take consequential actions.
3. **Six routine spoken problems.** Buying goods, finding a room, following directions, visiting the healer, accepting or declining an invitation, and changing a meeting each become a four-to-six-turn role-play with a supportive but not fully predictable follow-up.
4. **The guest’s story.** At supper the learner describes family, home, work or learned craft, a daily routine and one recent journey or event as a short connected recording.
5. **Courier correspondence.** The learner exchanges notes about news, feelings, needs, an apology and a meeting whose place or time changes.
6. **A connected account.** The learner writes Elira or the innkeeper 50–80 words about what happened, the present problem and what should happen next, using simple connectors.
7. **The healer’s instruction.** The learner relays the main point of a new instruction or announcement, then helps two characters agree on the next practical action.

The A2 gate requires A1 first. Reception again requires two independent 80% windows, with both gist and detail represented. Each productive, interactive and mediation mode requires at least three passing tasks. At least five recordings must meet the intelligibility floor. No cross-skill averaging is allowed.

## Implemented guided preparation layer

The capstones are not the learner’s first exposure to their task type. The following mechanics are implemented before their corresponding gates:

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
- objective structure floors such as word count, sentence count, turn count and recording duration;
- repeated evidence, spacing and non-compensatory mode gates.

The browser can **train** but should not claim to validate these unaided:

- overall pronunciation, stress, rhythm and intelligibility;
- spontaneous spoken interaction from an automatic transcript alone;
- the adequacy of an unrestricted written response from surface-form matching alone;
- whether an open dialogue, written response or relay fully met its communicative goal without a learner or human rubric review;
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

## Release and validation sequence

1. **Implemented:** held-out task records, immutable first-attempt evidence, local persistence and non-compensatory A1-before-A2 gates.
2. **Implemented:** A1/A2 guided preparation, speech record/replay, open response self-review and lore-grounded capstone situations.
3. **Implemented:** two acoustic listening voices mapped across multiple persistent story speakers, with the distinction visible in Debug and audited.
4. **Required before stronger claims:** independent Albanian specialist review of stimuli, alternatives, rubrics and pronunciation guidance.
5. **Required before stronger claims:** pilot A1 and A2 per mode with true beginners and adjust task difficulty without weakening the descriptors.
6. **Required for certification:** externally relate and standard-set the cut scores; until then use only the internal **A1-ready/A2-ready** profile wording.

## Official basis

- [Council of Europe: CEFR overview](https://www.coe.int/en/web/common-european-framework-reference-languages)
- [Council of Europe: CEFR global scale](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale)
- [Council of Europe: CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors)
- [Council of Europe: CEFR Companion Volume (2020)](https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4)
- [Council of Europe: assessment](https://www.coe.int/en/web/common-european-framework-reference-languages/assessment)
- [Council of Europe: classroom assessment](https://www.coe.int/en/web/common-european-framework-reference-languages/classroom-assessment)
- [Council of Europe: action orientation in the classroom](https://www.coe.int/en/web/common-european-framework-reference-languages/action-orientation-in-the-classroom)
- [Council of Europe: learners as social agents](https://www.coe.int/en/web/common-european-framework-reference-languages/the-user/learners-as-a-social-agent)
- [Council of Europe: mediation](https://www.coe.int/en/web/common-european-framework-reference-languages/mediation)
- [Council of Europe: language-specific Reference Level Descriptions](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-reference-level-descriptions-language-by-language-components-and-forerunners)
- [Council of Europe: Reference Level Descriptions developed so far](https://www.coe.int/en/web/common-european-framework-reference-languages/reference-level-descriptions-rlds-developed-so-far)
