# Playtest analytics and replay

## Purpose

The playtest system joins two records under one anonymous browser session:

- PostHog session replay reconstructs the visible DOM, pointer, touch, click and scroll activity.
- The versioned game event protocol records reducer-accepted actions, safe checkpoints, story choices, Train scheduling, question/option impressions, categorical selections, outcomes and audio lifecycle events.

The semantic event stream is the durable research record. Visual replay is a short-lived diagnostic aid and must not be treated as a substitute for question impressions or canonical reducer state.

## Consent and privacy

Recruitment consent is handled by the playtest organiser before the link is shared. For a fresh browser, anonymous gameplay research and visual replay therefore start enabled with no first-visit interruption. A player may independently disable either class at any time from the normal-play Privacy button, and a previously saved opt-out remains respected. The app remains playable when both are disabled.

The client intentionally disables PostHog autocapture, automatic page views, exception autocapture, console capture, heatmaps, dead-click autocapture, performance capture and person profiles. With the organiser-managed consent default in force, it sends one explicit `$pageview` for the anonymous browser session and clean path, allowing PostHog Web Analytics to count visitors without capturing query parameters or enabling automatic interaction collection. It starts replay programmatically and stops it immediately if the player opts out.

Every form value is masked. Textareas, rendered learner responses, accepted-answer comparisons, feedback controls and microphone areas are blocked from replay. Structured events contain IDs, categories, booleans, bounded counts and timings; they never contain typed answers, learner audio, transcripts, prompts, names, phone numbers, email addresses, private conversations, exception messages or stack traces.

Changing both preferences to off stops recording and opts the browser out of PostHog capture. This stops future collection; deleting already-received research data remains an operational PostHog task.

## Deployment configuration

Local development reads these ignored `.env` values:

```text
VITE_POSTHOG_KEY
VITE_POSTHOG_HOST
```

GitHub Pages reads repository variables with the same names. The project token is a public client token; never substitute a PostHog personal API key. The project created by the wizard currently uses the US ingestion host. If the study's consent, DPA or residency decision requires EU hosting, select an EU PostHog project and replace both deployment variables before recruiting players.

Study links may use categorical identifiers:

```text
https://miketamis.github.io/adventure/?study=pilot-1&cohort=true-beginner
```

The client removes query strings and fragments from URLs before ordinary custom events leave the browser. Valid study and cohort IDs are retained separately as event dimensions.

## Event protocol

Every custom event includes:

- `event_schema_version`
- `replay_protocol_version`
- deployed `build_commit`
- `analytics_session_id`
- `study_id` and `cohort_id`
- a stable `event_receipt`
- `game_run_id` and `state_sequence` where game state applies

The primary events are:

- consent-gated `$pageview` for PostHog's visitor metric;
- `playtest_session_started` and `playtest_session_ended`
- `surface_presented`
- `story_choice_presented`
- `state_transition_committed`
- `run_checkpoint_recorded`
- `train_scheduler_decided`
- `train_question_presented`
- `train_option_presented`
- `train_attempt_completed`
- `audio_playback_completed`
- `playtest_feedback_prompted`, `playtest_feedback_submitted`, and `playtest_feedback_dismissed`
- `technical_issue_occurred`

All accepted game mutations pass through the canonical reducer before capture. Rejected, stale, locked and duplicate actions do not become committed transitions. Each committed transition includes before/after safe-state hashes and an allowlisted action payload. A checkpoint is emitted at session/run start, every 25 structured transitions, and at an ending.

Export the custom events from PostHog as JSON or newline-delimited JSON, then reconstruct and verify the structured timeline locally:

```sh
npm run analytics:replay -- path/to/posthog-events.json
npm run analytics:replay -- path/to/posthog-events.json --session <anonymous-session-id> --json
```

The verifier groups events into runs, checks duplicate receipts, sequence gaps, transition hash continuity and checkpoint hashes, then prints only the allowlisted structured timeline. Use `build_commit` to pair a run with its exact deployed game version when deeper reducer inspection is needed.

## Feedback check-in

The automatic check-in waits until the player has at least five engaged minutes and twelve meaningful story, discovery or Train actions, then waits for the ordinary Story surface with no game consequence or audio overlay. It appears at most once per deployed build. A Feedback button remains available for voluntary later ratings.

The check-in records only:

- enjoyment from 1–5;
- perceived Albanian difficulty;
- intent to continue;
- zero or more predefined friction categories;
- engaged minutes, meaningful-action count and current scene context.

It has no open text field and is itself excluded from visual replay.

## Distractor analysis

`train_option_presented` is the denominator: one event per rendered option and phase. It carries the target/question IDs, option position, correct/distractor role, planner version and the same compact contrast dimensions used by the production planner. `train_attempt_completed` supplies the selected categorical option ID and outcome.

Join the events by `question_id`. For each target/option pair report exposure count, wrong selections, temptation rate, response time, learner prior evidence, position, direction, activity, stage and build. Never rank a distractor without minimum exposure and an uncertainty interval. A high error rate among well-practised learners is an ambiguity alert, not automatically a good distractor.

Recommended derived measures:

- temptation rate among weak/unproven learners;
- selection leakage among well-practised learners;
- the novice-minus-practised discrimination gap;
- directional confusion asymmetry;
- position-adjusted selection rate;
- recurrence after correction;
- next-spaced-retrieval repair rate;
- abandonment or last-heart harm after the miss.

## Initial PostHog views

Build these saved views before the first moderated study:

1. Activation funnel: session start → word discovery → Train question → correct Train completion → available story choice → scene movement.
2. Story friction: choice impressions by availability, locked attempts, node exits, revisits, confusers, deaths and endings.
3. Distractor laboratory: target/option exposures, selections, temptation, mastery leakage, position and contrast dimensions.
4. Train health: activity mix, scheduler choice, accuracy, response bands, remediation, protected misses, heart loss and recovery.
5. Audio reliability: asset ID, kind, completion, interruption, mute and elapsed playback time.
6. Feedback: enjoyment, difficulty, continuation intent and friction tags by build, cohort and progress depth.
7. Data quality: schema/build distribution, state-sequence gaps, duplicate receipts, missing attempt/impression joins and state-hash failures found by the local replayer.

## Playtest question inventory

Treat this as the analysis backlog before watching individual recordings. Every answer should be
segmented by `build_commit`, study/cohort, prior target evidence and relevant activity variant so a
content change is not confused with a learner difference.

### Reach, activation and the core loop

- How many real sessions and runs started, and does `$pageview` agree with session starts?
- Where do new players first stop: before a word discovery, before Train, during the first card, or after returning to Story?
- How long and how many actions does it take to discover the first word, finish the first Train card, earn the first token and take the first funded story action?
- What proportion completes the whole discover → Train → return → story-action loop once, twice and three times?
- When Story sends a player to Train for a locked action, how many unrelated rounds occur before the needed token is offered and earned?
- Do players voluntarily switch among Story, Train and Dictionary, or only move when blocked?
- Which initial behavior best predicts reaching a second location, returning another day or reaching an ending?
- Are repeat sessions continuing durable learning or repeatedly starting over at the same point?

### Story comprehension, agency and progression

- Which scenes are reached, revisited, backed out of or abandoned, and how long does each scene hold attention?
- For every shown choice, what is its selection share after controlling for position and availability?
- Which choices are routinely unavailable because of undiscovered words, missing tokens, money, role state or another world constraint?
- Do players understand how to unlock a desired choice, as shown by a matching Train visit and later successful return?
- Which confusers are selected, at what heart state, and do players recover, restart or quit afterward?
- Which branches, observations, NPC interactions, quests, items, transactions, deaths and endings are never or rarely reached?
- Where do players loop between nodes, revisit without taking a new action or repeatedly open the same surface?
- Which state changes produce unexpected downstream behavior in the visual replay?
- Do alternative routes lead to meaningfully different play, or do most runs collapse onto one path?
- How many runs end voluntarily, by death, by reset, by page exit or at each authored ending?

### Learning and progression

- Which exact word senses are discovered, saved, practised, rewarded and later used in a story action?
- Which words convert well from story exposure to independent recognition, and which are discovered but never trained?
- What are accuracy, response-time band, support use and heart cost by word, aspect, stage, direction, tier, family and variant?
- Which words succeed in recognition but fail in context, listening, spelling, inflection or phrase production?
- Does a correction improve the next disjoint attempt and the next spaced retrieval, or does the same error recur?
- How much passive exposure precedes first success, and where does more exposure stop helping?
- Are accepted-with-leeway spellings later recalled exactly?
- Which reviewed forms, noun roles and phrase skills create disproportionate misses or long pauses?
- Do matching boards reinforce weak words or merely reward already-strong anchors?
- How often do protected first attempts prevent damage, and what happens on the next attempt for that same aspect and level?
- Does the seven-answer recovery combo change persistence, accuracy or risk-taking near low health?
- Which activities are completed correctly but fail to transfer into the corresponding story action?

### Distractors and answer quality

- For each target word and exact activity variant, which distractor receives the most wrong selections per exposure?
- Which distractors tempt beginners but are rejected by practised learners—the intended discrimination pattern?
- Which distractors continue attracting well-practised learners, suggesting ambiguity, a misleading cue or a bad answer key?
- Does temptation change by Albanian-to-English versus English-to-Albanian direction, context, stage or grammatical phase?
- Are near semantic contrasts, same-surface senses or orthographically similar forms more effective than broad contrasts?
- Is a distractor only effective in one screen position or beside one specific set of alternatives?
- Does selecting a distractor predict the same confusion on the next question, later in the run or after a correction?
- Which distractors cause heart loss, feedback marked “unfair answer,” a rapid reset or session abandonment?
- Which options are exposed too rarely to judge, and what confidence interval surrounds every temptation estimate?
- Which questions have multiple plausible options even if the current key accepts only one? Treat high practised-learner leakage as a review queue, not a success metric.

### Scheduler and content balance

- What candidates were available at each Train decision, which route won and how often does each family actually appear?
- Does the future planner satisfy story-action goals inside its promised opportunity bound?
- How often is a remediation, due item or weak aspect eligible but not selected, and why?
- Are activity, target, modality and difficulty distributions balanced over a run rather than only in aggregate?
- Does the caught-up state appear because the learner is genuinely caught up or because every builder rejected its candidate?
- Which scheduler choices lead to the strongest immediate success, delayed retention and return-to-story conversion?
- Are any target words, phrase skills or form lanes effectively starved?

### Difficulty, health and pacing

- Where do hearts fall, recover or reach zero, and which exact question/action preceded the change?
- Are first-attempt protections and later miss costs applied consistently for each aspect and level?
- Which scenes or Train sequences create long stalls, rapid guessing, repeated corrections or exits?
- Does perceived difficulty agree with measured accuracy, latency, support use and heart pressure?
- Is the game too easy for practised learners while still too punishing for new learners?
- How do money, inventory and token shortages affect forward motion and session length?
- At what engaged minute and progress depth do enjoyment and intent-to-continue decline?

### Audio and interaction quality

- Which word and phrase assets complete, fail, time out, are interrupted or are skipped because the game is muted?
- Do audio-required exercises fail more often after an interrupted or failed playback?
- Do players replay audio before answering, answer before completion or abandon after a failure? The current protocol records outcomes; add an explicit replay-start event only if this count becomes a priority.
- In visual replay, where does the pointer search, hesitate, oscillate or miss an intended control?
- Which layouts create excessive scrolling, especially immediately before an incorrect or abandoned action?
- Are mobile/browser-specific interaction problems visible in PostHog's standard environment properties and replay?

### Feedback and qualitative triage

- What are enjoyment, difficulty and intent-to-continue distributions by build, cohort and progress depth?
- Which friction tags co-occur with low enjoyment, long response times, heart loss or abandonment?
- Do milestone responses differ from voluntary Feedback-button responses?
- What proportion dismisses the check-in, and is it appearing at a disruptive story moment despite its guard conditions?
- For each low-rating segment, what recurring behavior is visible across several replays rather than one anecdotal session?

### Instrumentation and inference quality

- Are any question attempts missing their question or option impressions?
- Are there duplicate receipts, state-sequence gaps, broken before/after hash chains or invalid checkpoint hashes?
- Do page views without session starts indicate blockers/configuration failures, and do session starts without page views indicate a regression in the manual pageview path?
- Are particular builds, cohorts or browsers missing replay while still sending structured events?
- Did an event-schema or content build change alter a metric definition mid-study?
- Are conclusions based on enough independent players and exposures, rather than many events from one player?
- Which findings are descriptive correlations, and which require a randomized content or distractor experiment before making a causal claim?

The protocol deliberately does not collect demographics, names, free-text feedback, typed answers or
microphone audio. Questions requiring those inputs need a separately designed study rather than an
extra property silently added to this stream.

## Operational retention

Before recruiting players, the research owner must set and document the PostHog project region, member access, retention and deletion procedure. The intended starting policy is 30 days for visual replay and 90 days for structured playtest events, with aggregate findings retained only after small-cell review. If the PostHog plan cannot enforce these periods automatically, calendar the deletions before recruitment rather than silently accepting vendor defaults.
