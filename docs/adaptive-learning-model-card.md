# Adaptive learning model card

Status: implemented cold-start policy; **not calibrated**, **not a SOTA claim**.

## Purpose

Train schedules reviewed Albanian words, exact grammatical forms and complete everyday phrases. Words use an independently evidenced capability graph; cumulative whole-phrase production keeps its authored prerequisite sequence. Both record enough non-content evidence to support real elapsed review and, after ethical learner studies, offline calibration.

The production source of truth is split deliberately:

- `src/game/wordLearningAspects.js` owns the word-capability nodes, target scopes, minimal prerequisite edges and activity bindings;
- `src/game/wordProgression.js` owns persisted per-aspect proofs, scoring, spacing and targeted remediation;
- `src/game/wordExposure.js` owns replay-safe passive familiarity evidence, which is never mastery;
- `src/game/phraseProgression.js` owns phrase production, listening and matching stages;
- `src/game/adaptiveLearning.js` owns the shared temporal evidence, elapsed-time rule and interpretable cold-start feature schema;
- `src/game/trainCandidateContract.js` enumerates every builder-certified route before selection;
- `src/game/trainFuturePlanner.js` owns hard constraints, the rolling-horizon diversity objective and the bounded exact oracle;
- builders and Debug Learning consume those registries rather than copying thresholds into components.

## Current decision rule

Ordinary supported steps require at least one disjoint Train round. Word activities are selected from a branching capability graph: every applicable aspect whose own minimal prerequisites pass is scored from its own proof strength, failures, spacing and uncertainty. Registry order breaks only exact score ties; it is not an unlock sequence. Strict retention requires **both** its round gap and a real elapsed interval. The initial elapsed interval is four hours, doubles only after a correct strict retrieval, contracts after a lapse and is capped at thirty days. These are cautious product defaults, not fitted Albanian learning constants.

The displayed cold-start estimate combines:

- elapsed hours since the last attempt;
- attempt count and smoothed accuracy;
- lapse rate;
- authored stage difficulty;
- support exposure;
- exercise mode.

Its output always says `calibrated: false` and includes a wide uncertainty interval when evidence is sparse. High uncertainty fails soft: the scheduler keeps the registry stage, offers targeted support after a miss and refuses to skip prerequisites or manufacture mastery.

Selection uses a receding-horizon plan: Train simulates as far as its explicit 24-round, state and time budgets permit, commits only the first activity, observes the actual answer and replans. Hard feasibility and the story-action token deadline come first. When the requested action's next word cannot legally repeat, the earliest bridge that also funds another same-node action whose vocabulary is saved wins before unrelated diversity; after the requested action is funded, those alternate-action deficits become the primary plan. The remaining objective is lexicographic across target, word, learning-aspect, evidence-track, modality, family, activity-format and difficulty diversity, followed by diminishing-return novelty. Local expected learning gain and uncertainty reduction are deliberately late soft terms. For small candidate spaces, a separate exhaustive dynamic-programming oracle reports hard-constraint violations, avoidable caught-up states, first-choice parity, diversity deltas and the first objective where the bounded beam loses to exact search.

## Evidence tracks

Word meaning, grammatical-form recognition, controlled retrieval, contextual inference, listening-to-orthography, construction, typed recall, exact-form, phrase-production, phrase-listening and phrase-matching attempts retain separate evidence. Each aspect records timestamps, response duration, correct/attempt/lapse counts, support exposure, next elapsed due time and last-question guard. Old word-stage and listening/matching saves migrate into only semantically equivalent aspect proofs without inventing a stronger capability.

Passive exposure has a separate durable counter. Normal projected story prose, visible story choices, and non-target words in a successfully completed phrase activity can raise familiarity with replay-safe receipts. A recurring but still-unproven word receives a small bounded priority boost so Train is more likely to convert that familiarity into retrieval evidence. Exposure cannot complete a prerequisite, award a proof, skip production, reduce heart risk or contribute CEFR evidence.

Listening evidence is accepted only after the continuous phrase clip reports successful completion. Muted, interrupted, rejected or failed playback awards no listening evidence.

## Privacy boundary

Scheduling evidence remains in the local learner profile because it is required for the player’s own review plan. The optional research-event log is separate and off by default. Explicit consent retains at most 512 local events containing only:

- public authored target and stage IDs;
- correct/wrong outcome;
- minute-rounded event time;
- broad response-time band;
- tier, variant and support flag.

It stores no answer, prompt, transcript, audio, free response, person name, phone number or private-conversation text. It has no network transport. Withdrawing consent immediately erases the local event log. Any future export or server collection requires a separate privacy review, participant notice, retention policy and consent flow.

## Research basis

The feature contract is informed by multidimensional word knowledge and contextual encounters ([Webb, 2007](https://doi.org/10.1093/applin/aml048)), the limited early form/form–meaning gains produced by incidental exposure ([Malone, 2018](https://doi.org/10.1017/S0272263117000341)), multi-skill knowledge-component modelling ([Pardos & Dadu, 2018](https://jedm.educationaldatamining.org/index.php/JEDM/article/view/314)), retrieval practice ([Karpicke & Roediger, 2008](https://doi.org/10.1126/science.1152408)), trainable half-life regression for language learning ([Settles & Meeder, 2016](https://aclanthology.org/P16-1174/)), content-aware adaptive practice ([KARL, EMNLP 2024](https://aclanthology.org/2024.emnlp-main.784/)), rolling-horizon control ([Gast & Narasimha, 2025](https://proceedings.mlr.press/v291/gast25a.html)), quality-and-diversity beam planning ([Zhong, Shati & Cohen, 2024](https://ojs.aaai.org/index.php/SOCS/article/view/31557)), constrained contextual bandits ([Guo, Zu & Liu, 2025](https://proceedings.mlr.press/v267/guo25v.html)), second-language spacing evidence ([Nakata et al.](https://doi.org/10.1111/lang.12479)) and recent work on exposing uncertainty rather than silently trusting a knowledge tracer ([Mitton et al., 2026](https://proceedings.mlr.press/v339/mitton26a.html)). None of those sources validates the current coefficients for Albanian beginners.

## Required validation before calibration

1. Obtain consented true-beginner data with delayed outcomes rather than only immediate retries.
2. Pre-register a baseline comparison against the fixed registry scheduler.
3. Fit parameters offline; do not silently train on-device or change a learner’s gates during the study.
4. Evaluate recall calibration, learning efficiency and delayed transfer on held-out learners and unseen contexts.
5. Check error and support rates across relevant demographic, device and accessibility groups.
6. Retain the fixed scheduler whenever the learned model is unavailable, out of distribution or insufficiently certain.
7. Publish the evaluation and update this model card before describing the scheduler as calibrated or state of the art.

## Known limitations

- Response duration is influenced by interruption, disability, device and reading behavior; it cannot independently lower mastery or cause a heart loss.
- Public authored IDs are not learner content, but event timing is still personal metadata and remains consent-gated.
- The cold-start estimate is explanatory diagnostics, not a CEFR score.
- Open speaking/writing content and audio remain outside this model, and self-review does not become objective proficiency evidence.
- Four hours and thirty days are conservative defaults that require learner validation.
