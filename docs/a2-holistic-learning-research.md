# Holistic A2 learning: research, audit and decisions

Status: implementation decision record, 11 September 2026

## Executive decision

The game should aim for a **credible internal A1-ready and A2-ready profile**, not promise fluency, an accredited certificate, or a guaranteed pass in an external examination. CEFR A2 is a profile of things a learner can do across reception, production, interaction and mediation. It is not established by finishing a story, collecting a vocabulary total, or passing many variants of the same quiz. The [Council of Europe A2 global descriptor](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale) requires understanding high-frequency language, completing simple routine exchanges and describing background, immediate surroundings and immediate needs.

The design therefore needs three kinds of evidence that must not substitute for one another:

1. **Exact learning evidence:** the learner recognises and produces the specific words, reviewed forms and phrases the game taught.
2. **Transfer and durability evidence:** the learner uses that knowledge after delay, in changed contexts, with different meanings, speakers, interlocutors and communicative purposes.
3. **Held-out readiness evidence:** the learner succeeds on an unrevealed task in each CEFR mode without the teaching activity itself awarding the level.

The current increment should land seven high-value preparation capabilities: continuous-audio sound-to-spelling, meaning-switch form choice, pragmatic choice, source-removed reconstruction, immediate cue-faded retelling, compensating/clarification moves, and feedback followed by revision. These are guided rehearsals, not proof of elapsed transfer. The next architectural step is to put those abilities inside world-bound information-gap missions and record genuine delayed, changed-context evidence. High-stakes ASR, accent scoring, LLM scoring and fully open AI chat remain deliberately outside the progression gate.

## Claims boundary

| Claim | Supported wording | Wording to avoid |
|---|---|---|
| Curriculum coverage | “The game provides an internally audited path from zero to A2-ready across seven communicative modes.” | “The game certifies A2.” |
| A completed learner profile | “The learner has met the game’s A2-ready evidence gates.” | “The learner is fluent.” |
| External assessment | “Mastery should prepare the learner for A2-type tasks; external performance still needs validation.” | “Completing the game guarantees an A2 exam pass.” |
| Speaking | “The learner can record, replay, self-review and complete communicative speaking tasks.” | “The browser has verified Albanian pronunciation or intelligibility.” |
| Open writing | “The learner can respond and revise against a task-specific rubric.” | “An unrestricted response is objectively A2 because an automated scorer accepted it.” |

CEFR descriptors can orient curriculum and learning-oriented assessment, but the Council of Europe distinguishes that work from the alignment and validation of tests. Its [assessment guidance](https://www.coe.int/en/web/common-european-framework-reference-languages/assessment) describes assessment as broader than testing and points test providers to a separate alignment process. Stronger public claims require Albanian specialist review, true-beginner pilots, human-rated samples and external standard-setting.

## What A2 requires

The production registry correctly treats the level as a non-compensatory seven-mode profile. The following are concise design paraphrases of the [CEFR Companion Volume](https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4), not replacement descriptors.

| Mode | A2 design target in this game | Evidence implication |
|---|---|---|
| Listening | Understand the point and predictable details of short, clear messages about immediate needs and familiar matters. | Use unrevealed continuous audio; preserve gist and detail as separate requirements. |
| Reading | Find predictable information in short everyday texts, notices, correspondence, lists and instructions. | The answer must change what the player knows or can do, rather than merely repeat a gloss. |
| Spoken interaction | Complete short social and routine exchanges, including suggestions, arrangements, goods/services, directions and simple problems. | Require turns, a communicative goal and a responsive interlocutor; do not award the mode from isolated phrase production. |
| Spoken production | Give a short series of simple sentences about background, everyday life, places, people and events. | Capture an account with content and sequencing, not only pronunciation of prompted lines. |
| Written interaction | Exchange simple news, feelings, needs, thanks, apologies and arrangements. | Require an addressee and a reason to communicate; preserve the original response before feedback. |
| Written production | Produce simple connected language, including short descriptions and accounts. | Require meaningful links, such as the A2 use of “and”, “but” and “because”, not only word count. |
| Mediation | Relay straightforward facts and help another person complete a simple shared task. | Give the learner information the NPC genuinely lacks and make successful relay affect the task. |

Several cross-cutting abilities are easy to miss if the curriculum is reduced to seven labels:

- A2 interaction includes everyday polite forms, invitations, suggestions and apologies; the Companion Volume’s [sociolinguistic descriptors](https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4) make pragmatics part of the target rather than decorative flavour.
- A2 learners can ask for repetition or clarification of key words and can indicate non-understanding. They can also point or use an imperfect available word to keep meaning moving. These are legitimate communication strategies, not failures.
- A2 orthographic control allows reasonable phonetic accuracy for short words in the learner’s oral vocabulary rather than requiring perfect spelling in every communicative task. Exact spelling can still be required in an exercise whose declared target is spelling.
- A2 production links simple phrases into a sequence. Retelling an event and revising a message are therefore more revealing than adding further multiple-choice synonyms.

## Research basis and limits

This is a research-informed design, not a claim that any individual paper proves the game’s whole architecture.

| Evidence | What it supports here | Important limit |
|---|---|---|
| The Council of Europe’s [action-oriented approach](https://www.coe.int/en/web/common-european-framework-reference-languages/action-orientation-in-the-classroom) integrates learning with genuine communicative practices and learner agency; its [social-agent account](https://www.coe.int/en/web/common-european-framework-reference-languages/the-user/learners-as-a-social-agent) separates receptive, productive, interactive and mediation activities. | World tasks should have purposes, other people and consequences; all modes need their own evidence. | CEFR is a framework, not an efficacy trial of this game. |
| Ellis’s [task-based syllabus proposal](https://doi.org/10.1177/003368820303400105) and the Cambridge Element on [task-based language teaching](https://www.cambridge.org/core/elements/taskbased-language-teaching/395B3D3B0F7078DF325579CC8314E38B) distinguish information-gap, jigsaw, problem-solving and other task designs and discuss task complexity and focus. | Build convergent, lore-grounded missions in which different participants hold different information; vary support, conditions and outcome rather than merely adding distractors. | TBLT does not prescribe one universal game progression or numeric gate. |
| A meta-analysis of [48 spaced-practice experiments with 3,411 participants](https://doi.org/10.1111/lang.12479) found a medium-to-large overall effect; longer spacing was better than shorter spacing on delayed tests, while equal and expanding schedules were statistically equivalent. | Keep delayed evidence and spacing first-class; do not treat immediate success as durable mastery. | Effects varied with target, activity, feedback, sessions and retention interval. |
| A study of [dictation, dictogloss and comprehension questions with 142 L2 learners](https://doi.org/10.1177/13621688221117242) found better immediate multiword-item scores after dictation and dictogloss than after comprehension questions, but the advantage diminished at the delayed test, especially for dictation; successful retrieval during reconstruction predicted later recall best. | Add sound-to-spelling and reconstruction, then revisit after delay rather than counting an immediate transcription as mastery. | It studied Chinese learners of English and ten expressions, not Albanian beginners or game quests. |
| Recent meta-analyses report positive effects of task repetition on [oral performance](https://doi.org/10.1016/j.system.2025.103868) and, across 31 studies and 65 samples, on [written complexity, accuracy, lexis and fluency](https://doi.org/10.1016/j.jslw.2025.101255). | Repeat and later retell the same event with a new listener or purpose; keep exact and procedural repetition distinguishable. | Effects and their size vary by task, context, spacing and outcome. Repeating a prompt is not automatically transfer. |
| Meta-analyses of [L2 pragmatics instruction](https://doi.org/10.1093/applin/amac055) and [instruction plus corrective feedback across 39 studies](https://doi.org/10.1075/itl.19012.you) support deliberate pragmatics teaching. | Teach requests, address, invitations, apologies, refusals and repair through contextual choices and consequences. | Results cover different languages, proficiency levels, interventions and measures; Albanian choices still need expert review. |
| A meta-analysis of [95 writing-feedback studies and 200 treatment/control comparisons](https://doi.org/10.1016/j.learninstruc.2024.101961) found that surface feedback improved surface outcomes, deep feedback improved deep outcomes, and their combination improved both overall. | Give feedback that separates form from task fulfilment, then require the learner to revise. | It combines L1, L2 and foreign-language populations and does not validate a particular automatic feedback engine. |
| The ICAP framework predicts deeper learning as engagement moves from passive through active and constructive to interactive modes ([Chi and Wylie, 2014](https://doi.org/10.1080/00461520.2014.965823)). | Prefer reconstruction, explanation, revision and collaboration over another recognition-only duplicate. | This is a broad cognitive framework, not Albanian-specific evidence or a guarantee that every interactive UI is effective. |
| A systematic review/meta-analysis of [talker variability in non-native phonetic learning](https://doi.org/10.1044/2021_JSLHR-21-00181) found a heterogeneous literature, while a later [79-study HVPT meta-analysis](https://doi.org/10.1017/S0272263125100879) found medium-to-large perceptual-training effects and some generalisation to novel stimuli. | Build a real multi-speaker perception lane, with varied phonetic contexts and feedback, instead of relabelling one synthetic voice as many characters. | Multiple talkers are not uniformly better in every design, and evidence is primarily about perception rather than certifying production. |

Two smaller game-related studies are useful as architectural inspiration, not as efficacy guarantees. [Negotiation for Action](https://doi.org/10.1111/j.1540-4781.2009.00927.x) describes meaning negotiation emerging from coordination inside a game world, and a small study of [interactive fiction for L2 learning](https://doi.org/10.1080/09588220903345168) reported tentative benefits of contextual, immersive role-play. Their limited contexts make them reasons to prototype and measure, not reasons to claim the RPG itself causes proficiency.

## Current-state audit

The following executable snapshot was taken on 11 September 2026 with `node scripts/cefraudit.mjs`, before this research increment’s new preparation records were merged:

- 592 story nodes and 193 endings.
- 994 public dictionary senses, 983 used in story, options or items.
- 173 priority practical senses, 118 grounded phrases and 24 practical can-do groups.
- 36 of 118 grounded phrases appear in a non-confuser player choice.
- 2,129 reviewed changing surfaces across 593 senses, including 180 reviewed noun paradigms.
- 3,191 generated audio clips.
- 21 guided transfer mechanics across 23 activities.
- 122 held-out A1/A2 capstone tasks.
- A1 and A2 each cover all seven modes; A2 is gated by A1 and modes do not compensate for one another.
- Open speech, writing and mediation remain learner-self-reviewed.
- Ordinary Train phrase audio uses one synthetic acoustic voice. Held-out listening maps seven character identities onto only two actual acoustic voices.

### Strengths already worth preserving

- The exact word, form and phrase ladders are more rigorous than a completion counter.
- Phrase audio is continuous rather than stitched from isolated word clips.
- Productive, listening and matching evidence are separated.
- Held-out capstone evidence is immutable on first exposure and separate from preparation.
- Reading, practical language and morphology are grounded in a large playable story rather than a detached phrasebook.
- The CEFR gate is non-compensatory: strong reading cannot erase missing interaction or speaking.

### Material gaps found

1. **Sound-to-spelling was implicit, not a dedicated evidence lane.** Listening choices and phrase production did not establish that the learner could segment continuous Albanian audio and recover its written forms.
2. **Reviewed forms did not yet prove meaning-switch transfer.** A learner could know a form in its trained sentence without demonstrating the corresponding grammatical job in a different, meaning-bearing context.
3. **Pragmatics was present in prose but not durable evidence.** The world includes social language, yet the progression could not show that a learner chose an appropriate address or response across relationships and purposes.
4. **Reconstruction was immediate.** Immediate order-building can be a useful scaffold, but it does not establish delayed retrieval.
5. **No explicit repeated-retelling track existed.** Exact phrase recall and a fresh capstone do not show improvement when the same event is told later to a different listener or for a different purpose.
6. **Conversation repair was too prototype-like.** Guided repair existed, but it needed multiple contexts and a world response that actually helps the learner complete the task.
7. **Open-response feedback stopped short of a revision cycle.** Self-review is honest, but a diagnostic response becomes more useful when the learner acts on targeted feedback and preserves both drafts.
8. **Held-out evidence is finite.** Once a fixed task is revealed, it cannot honestly become fresh again. The current bank can be exhausted rather than renewed with equivalent unrevealed forms.
9. **Speaker identity exceeded acoustic variation.** Seven character labels do not equal seven voices; two voices are too narrow for a mature perception lane.
10. **Preparation is still too separable from world action.** The guided layer is lore-labelled, but much of it remains an exercise surface rather than an information gap whose success changes the world.

## Implemented-now priorities

“Implemented now” means these are production requirements for the current learning-registry increment, not optional research ideas. The registry, builders, persistence, Debug Learning view and audits must share the same declarations.

### 1. Sound-to-spelling

The learner hears one continuous Albanian word or short phrase and reconstructs or types what was heard. No English answer or transcript appears before the attempt. Early variants may expose word slots or letter support; later variants remove that support. The evidence record must identify the acoustic source, target surfaces, context and support level so ordinary listening comprehension cannot masquerade as orthographic retrieval.

Immediate dictation is preparation. Durable proof requires a later attempt in a disjoint context. Communicative scoring should accept CEFR-appropriate phonetic spelling when spelling is not the declared target; the exact spelling activity itself can remain strict and provide specific corrective feedback.

### 2. Meaning-switch forms

Use a single reviewed lemma across contexts that change the intended grammatical meaning: for example, “a village”, “the village”, “to/into the village” or “from/of the village”, only where the Albanian construction and reviewed paradigm genuinely support the contrast. The prompt must identify the intended job without giving away the surface. Evidence names the exact sense, lemma, surface, grammatical role and context.

This is not suffix guessing. Every emitted answer must come from reviewed morphology, and feedback must explain the job of the form plus the transferable class pattern and its limits. Mastery requires more than one context; success with one memorised sentence does not unlock all forms of the lemma.

### 3. Pragmatic choice

Practise address, politeness, requests, invitations, apologies, refusals, turn openings/closings and relationship-sensitive variants inside a specific encounter. The NPC’s identity, relationship and purpose are part of the task. A socially mismatched but grammatical form should produce a natural low-stakes reaction and repair opportunity, not arbitrary heart loss.

The grader must accept every reviewed response that is valid for the displayed situation. If `ti` and `ju`, or another pair, can both work under plausible readings, the scenario must disambiguate the relationship or both must be accepted.

### 4. Source-removed reconstruction rehearsal

The implemented preparation asks the learner to hear a meaningful message once, attend to a brief unrelated scene cue, and rebuild it without the source remaining visible. It is an immediate memory-and-segmentation scaffold. A completed activity records guided preparation only; it does not claim that elapsed or changed-context transfer occurred. Revealing the transcript ends that attempt’s eligibility as fresh hidden work.

The target is the message’s useful content and reviewed language, not photographic punctuation memory. True delayed reconstruction still requires an intervening activity or world action plus an evidence receipt for spacing and context, and remains in the architectural backlog below.

### 5. Immediate cue-faded retelling rehearsal

The implemented local recording cycle asks the learner to recount one lore-grounded message with Albanian cue cards, replay it, then immediately try again from scene symbols. It rehearses planning, monitoring and support fading without uploading or scoring speech. It is not labelled or saved as a delayed retell.

The stronger transfer task remains a later retelling after another event, to a different NPC or for a different goal. Exact repetition and procedural repetition are different, and neither should overwrite a held-out first attempt or silently become a CEFR pass by repetition count alone.

### 6. Compensating and clarification

Give the learner useful actions such as “please repeat”, “more slowly”, “what does ___ mean?”, “did you say ___?”, or pointing and asking for an item. A repair move must change the next turn: replay more slowly, isolate the key detail, confirm, spell a word or let the learner point. It should not solve the task automatically; the learner still uses the recovered information.

Appropriate clarification is successful A2 strategy evidence and should not cost a heart. Repeated use across different conversations is necessary before treating the strategy as durable.

### 7. Feedback followed by revision

For low-stakes open speaking or writing, retain the original answer in page memory, show focused feedback, and ask the learner to try again. Separate surface feedback (a reviewed form, spelling or word order issue) from deep/task feedback (missing fact, unclear addressee, broken sequence or unmet communicative purpose). Saved evidence may record that a revision cycle happened, but must not persist the learner's raw text or audio.

This is diagnosis and practice, not automated certification. A learner or reviewed deterministic rubric can confirm the revision; an unvalidated LLM score cannot award CEFR readiness, unlock progression or cause a health consequence.

## Next architectural priorities

### 1. World-bound information-gap missions

Preparation should increasingly become an RPG action rather than a themed worksheet. A robust mission has:

- information that one character, object, notice or audio source has and another character lacks;
- a reason the learner needs to understand or relay it;
- at least one choice about how to obtain, clarify or communicate it;
- a canonical world consequence, such as a route opening, an appointment being kept, the correct item being delivered or an NPC acting on the message;
- a graceful recovery route that teaches rather than dead-ends;
- an equivalent variant so a revealed answer is not the only possible form.

Examples that fit the existing world include carrying a changed meeting time between NPCs, hearing which route is safe and guiding a companion, reading a price/quantity list for someone who cannot see it, or learning which grammatical form distinguishes the intended destination. The quest registry should own mission lifecycle; knowledge, inventory, time, location and NPC identity should remain canonical in their existing state channels.

### 2. Durable multi-context evidence

Add an evidence receipt rather than another global score. At minimum it should identify:

- capability and CEFR mode;
- exact sense/form/phrase targets, where applicable;
- task and world-context IDs;
- support/scaffolding level;
- acoustic speaker/voice for listening;
- immediate, delayed or held-out status;
- communicative outcome and deterministic checks;
- non-content metadata linking an open-response attempt, feedback and revision cycle, while raw text and audio remain ephemeral;
- timestamp/spacing and whether the context is genuinely disjoint.

Mastery rules should require appropriate evidence across multiple contexts and after delay. They must not infer productive ability from lifetime tokens or let repeated exposure to one sentence satisfy transfer.

### 3. Renewable held-out forms

Held-out means unrevealed, not merely labelled “capstone”. Create reviewed banks or constrained generators that vary names, destinations, objects, quantities, times, weather, route states and communicative roles while preserving the same descriptor and difficulty. Each concrete form receives a stable fingerprint. Once shown, its fingerprint can be used for practice but never counted as fresh again.

Renewal must stay editorially bounded. Generated combinations need grammatical review, answer-set validation, continuous audio and world coherence. If no unexposed equivalent remains, the product should say the bank is exhausted rather than recycle a known answer as new evidence.

### 4. Multi-speaker pronunciation lane

Separate **perception across voices** from **learner production**. Expand listening beyond two acoustic voices with genuinely different speakers and phonetic contexts; record the actual voice, not only the character name. Use identification/discrimination, continuous-word segmentation and meaning tasks with feedback. Reuse local recording/replay for production, with model audio played separately.

The aim is intelligibility and robust perception, not native-like accent. Novel-speaker checks belong in held-out perception evidence. Production remains low-stakes self/human-reviewed until an Albanian-specific measure is validated.

## Rejected or deferred

| Item | Decision now | Why | Reconsider only when |
|---|---|---|---|
| High-stakes ASR | Defer as a CEFR gate; allow only low-stakes replay or optional diagnostic hints. | A 50-study [review of ASR in language learning](https://doi.org/10.1016/j.system.2024.103250) finds a heterogeneous evidence base, and research on [inclusive ASR](https://doi.org/10.1016/j.csl.2023.101567) shows performance differences by language, architecture and speaker group. This project has no Albanian-learner validation set or standard-setting study. | Albanian-specific learner data, human benchmarks, subgroup fairness checks and an audited error/recovery policy exist. |
| LLM scoring | Do not let an LLM award a level, durable mastery, hearts or progression. It may later assist non-player-facing editorial review. | A study of four LLMs scoring 119 English-learner essays found model differences and performance fluctuations despite stronger GPT-4 results ([Pack, Barrett and Escalante, 2024](https://doi.org/10.1016/j.caeai.2024.100234)). English essay results do not validate short Albanian speech, writing or mediation. | A fixed model/version is validated on representative Albanian responses against trained human ratings, with reliability, fairness, drift and appeal procedures. |
| Accent scoring | Reject native-likeness as an A2 target. | CEFR A2 concerns whether the learner can communicate; it tolerates limitations and basic mistakes. ASR error can also vary with non-native accent, so a transcript score is not an accent-neutral intelligibility measure. | Only a validated, intelligibility-centred Albanian diagnostic is proposed, and it remains supportive rather than punitive. |
| Generic quiz duplication | Reject as a route to “more coverage”. | More multiple choice on the same cue adds exposure but not the missing action, delay, context or mode. | A new exercise measures a distinct declared capability and appears in the shared progression/debug registry. |
| Fully open AI chat | Defer as a required learning path. | It makes answer validity, lore continuity, privacy, safety, repeatability and evidence provenance difficult to guarantee. The current need is bounded communicative agency, not unlimited text generation. | It can be optional, bounded to reviewed language and world state, reproducibly logged, privacy-reviewed and prevented from awarding high-stakes evidence. |

## Measurement and release contract

The honest progression model is:

`exact knowledge → guided transfer → durable transfer → fresh held-out performance → internal readiness profile`

It is not:

`tokens or story completion → A2`

Release gates for the new work should verify:

1. Each new capability is declared once in the production registry and consumed by builders, persistence, the Debug Learning view and audits.
2. Evidence names the mode and exact target; no cross-mode substitution is possible.
3. Immediate rehearsal, genuinely delayed transfer and fresh held-out attempts remain distinguishable; the current source-removed and cue-faded activities claim only the first.
4. A revealed stimulus cannot be fresh again.
5. Open responses preserve the original, feedback and revision without pretending deterministic surface checks establish holistic quality.
6. Clarification changes the interaction and still requires task completion.
7. World tasks have information, purpose, agency and a canonical consequence.
8. Any automated speech or free-text tool fails safely and cannot impose a heart loss or award CEFR readiness.

Before making claims stronger than “internal A2-ready”, run four validation stages:

1. Albanian linguist review of language, forms, pragmatic alternatives and audio.
2. True-beginner usability and learning pilots, including delayed measures.
3. Trained human rating of representative speech, writing, interaction and mediation samples, with agreement reported.
4. External relation and standard-setting against an appropriate A2 assessment.

## Primary references

### Official CEFR sources

- Council of Europe, [CEFR Companion Volume (2020)](https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4).
- Council of Europe, [CEFR global scale](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale).
- Council of Europe, [CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors).
- Council of Europe, [assessment](https://www.coe.int/en/web/common-european-framework-reference-languages/assessment).
- Council of Europe, [action orientation in the classroom](https://www.coe.int/en/web/common-european-framework-reference-languages/action-orientation-in-the-classroom).
- Council of Europe, [the learner as a social agent](https://www.coe.int/en/web/common-european-framework-reference-languages/the-user/learners-as-a-social-agent).

### Learning and task evidence

- Ellis, [Task-based language learning and teaching](https://doi.org/10.1177/003368820303400105).
- Jackson, [Task-Based Language Teaching](https://www.cambridge.org/core/elements/taskbased-language-teaching/395B3D3B0F7078DF325579CC8314E38B).
- Kim and Webb, [The Effects of Spaced Practice on Second Language Learning: A Meta-Analysis](https://doi.org/10.1111/lang.12479).
- Yu, Boers and Tremblay, [Learning multiword items through dictation and dictogloss](https://doi.org/10.1177/13621688221117242).
- Abdi Tabari et al., [Task repetition and L2 oral performance: A meta-analysis](https://doi.org/10.1016/j.system.2025.103868).
- Abdi Tabari et al., [Task repetition and L2 written performance: A meta-analysis](https://doi.org/10.1016/j.jslw.2025.101255).
- Ren, Li and Lü, [A meta-analysis of the effectiveness of second language pragmatics instruction](https://doi.org/10.1093/applin/amac055).
- Yousefi and Nassaji, [A meta-analysis of instruction and corrective feedback on L2 pragmatics](https://doi.org/10.1075/itl.19012.you).
- Scherer et al., [How effective is feedback for L1, L2, and FL learners’ writing?](https://doi.org/10.1016/j.learninstruc.2024.101961).
- Chi and Wylie, [The ICAP Framework](https://doi.org/10.1080/00461520.2014.965823).
- Zhang, Cheng and Zhang, [The role of talker variability in nonnative phonetic learning](https://doi.org/10.1044/2021_JSLHR-21-00181).
- Uchihara, Karas and Thomson, [High variability phonetic training: a meta-analysis](https://doi.org/10.1017/S0272263125100879).

### Automation boundaries

- Nickolai, Schaefer and Figueroa, [Aggregating the evidence of automatic speech recognition research claims in CALL](https://doi.org/10.1016/j.system.2024.103250).
- Feng et al., [Towards inclusive automatic speech recognition](https://doi.org/10.1016/j.csl.2023.101567).
- Pack, Barrett and Escalante, [Large language models and automated essay scoring of English language learner writing](https://doi.org/10.1016/j.caeai.2024.100234).
