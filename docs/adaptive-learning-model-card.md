# Adaptive learning model card

Status: implemented cold-start policy; **not calibrated**, **not a SOTA claim**.

## Purpose

Train schedules reviewed Albanian words, exact grammatical forms and complete everyday phrases. The scheduler preserves the authored prerequisite ladders while recording enough non-content evidence to support real elapsed review and, after ethical learner studies, offline calibration.

The production source of truth is split deliberately:

- `src/game/wordProgression.js` owns word/form stages and their evidence gates;
- `src/game/phraseProgression.js` owns phrase production, listening and matching stages;
- `src/game/adaptiveLearning.js` owns the shared temporal evidence, elapsed-time rule and interpretable cold-start feature schema;
- builders and Debug Learning consume those registries rather than copying thresholds into components.

## Current decision rule

Ordinary supported steps require at least one disjoint Train round. Strict retention requires **both** its round gap and a real elapsed interval. The initial elapsed interval is four hours, doubles only after a correct strict retrieval, contracts after a lapse and is capped at thirty days. These are cautious product defaults, not fitted Albanian learning constants.

The displayed cold-start estimate combines:

- elapsed hours since the last attempt;
- attempt count and smoothed accuracy;
- lapse rate;
- authored stage difficulty;
- support exposure;
- exercise mode.

Its output always says `calibrated: false` and includes a wide uncertainty interval when evidence is sparse. High uncertainty fails soft: the scheduler keeps the registry stage, offers targeted support after a miss and refuses to skip prerequisites or manufacture mastery.

## Evidence tracks

Word, exact-form, phrase-production, phrase-listening and phrase-matching attempts retain their own timestamp, response duration, correct/attempt/lapse counts, support exposure, next elapsed due time and last-question guard. Old listening/matching tier saves migrate without invented attempts or timestamps.

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

The feature contract is informed by trainable half-life regression for language learning ([Settles & Meeder, 2016](https://aclanthology.org/P16-1174/)), content-aware adaptive practice ([KARL, EMNLP 2024](https://aclanthology.org/2024.emnlp-main.784/)), second-language spacing evidence ([Nakata et al.](https://doi.org/10.1111/lang.12479)) and recent work on exposing uncertainty rather than silently trusting a knowledge tracer ([Mitton et al., 2026](https://proceedings.mlr.press/v339/mitton26a.html)). None of those sources validates the current coefficients for Albanian beginners.

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
