# CEFR external-validation protocol

The game may report an **internally audited A1-ready/A2-ready profile**. It may not report a certified, accredited or independently verified CEFR level until the human studies registered in `src/game/cefrExternalValidation.js` are complete.

## Private study workspace

Create an ignored study workspace with:

```sh
node scripts/cefr-validation.mjs --scaffold=.private/validation/pilot-001
```

The command refuses to write outside `.private/validation/`, refuses to overwrite an existing study and creates pending templates only. It also exports a hashed private copy of the current held-out task bank for qualified reviewers. That catalog contains answers, must never be served to players and must never enter Git. The command does not generate reviews, participants, ratings, results or approvals.

After qualified humans have supplied the study material, validate its structure with:

```sh
node scripts/cefr-validation.mjs --check=.private/validation/pilot-001
```

This check verifies schema and instrument presence. It cannot determine that a person is qualified, consent was valid, a rating was honest or a CEFR decision is defensible. Those judgments belong to the documented external reviewers.

Raw learner writing, recordings, private notes, consent records and identities must never enter Git. Use study-scoped pseudonymous participant and reviewer IDs. Publish only privacy-reviewed aggregate results with uncertainty, attrition and exclusions visible.

## Required sequence

1. Independent Albanian specialists review the complete assessment bank and resolve disagreements.
2. True beginners test usability and learnability from zero prior Albanian.
3. Unfamiliar Albanian listeners rate speech comprehensibility independently; recording or ASR output is never treated as a pass.
4. Delayed, unseen-context post-tests measure retention and transfer.
5. A preregistered comparison tests the game against a credible time-and-content-matched baseline.
6. Subgroup analysis checks access, attrition, listening and false-blocking with privacy-safe reporting.
7. An independent Albanian/CEFR panel relates the seven non-compensatory modes and cut decisions to external performance.

Every incomplete or inconclusive step remains visibly pending. A repository audit must never convert missing human evidence into a passing claim.

## Acoustic breadth

Azure currently exposes two reproducibly configured `sq-AL` voices to this project. Character identities do not create additional acoustic voices, and rate or pitch modifications must not be counted as new speakers. Run `node scripts/tts-download.mjs --list-voices` against the configured Speech resource before declaring another voice. If the provider supplies no additional Albanian voice, breadth remains blocked until a separately licensed and human-reviewed recording pack exists.
