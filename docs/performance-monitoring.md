# Performance monitoring

The performance suite measures the player-visible delay from an input to the next rendered frame across the whole application. It is deliberately centralized: a delegated listener and the browser Event Timing API cover current and future buttons, links, inputs, forms and interactive map markers without adding a timer to every component.

## What is measured

- input delay, handler time, presentation delay and total interaction duration;
- reducer, structured-analytics and local-persistence work;
- elapsed Train enumeration, its individual blocking slices, future planning and selected-card materialization;
- React commit duration where the active React build exposes profiler timings;
- browser long tasks, first and largest contentful paint, and layout shift;
- every performance surface and privacy-safe control group encountered during the session.

Event Timing's duration ends after the next rendering update. That measures responsiveness, but an intermediate loading screen can paint before an activity is ready. The large-learner browser gate therefore also times the complete transition from the actual navigation input to a visible, non-inert playable card across a paint opportunity. It records this inside the browser: Playwright's assertion polling can notice a completed card hundreds of milliseconds late. Host waiting time remains a separate diagnostic, and timeouts fail explicitly. A delayed-card fixture proves that loading indicators, inert cards and invisible ancestors cannot finish the measurement. Browsers without Event Timing use a delegated two-frame fallback. See the [W3C Event Timing specification](https://www.w3.org/TR/event-timing/) for the underlying duration model.

## Privacy boundary

Control identifiers may use only developer-authored `data-performance-id`, `data-map-id`, `id`, `name`, role, element type and stable CSS classes. The monitor never reads visible text, accessible labels, titles, form values or placeholders. Complete rolling measurements remain in memory. With structured analytics enabled, only samples above the reviewed slow threshold emit a bounded `interaction_performance_observed` event.

## Local diagnostics

Unlock debug mode, open **Debug**, then choose **Performance**. The panel shows session INP, long tasks, surface percentiles, slow controls, application operations and observed/interacted control coverage. **Reset measurements** starts a clean local sample.

## Automated gates

Install the Chromium runtime once, build, and run the suite:

```bash
npx playwright install chromium
npm run build
npm run test:performance
```

`npm run check` runs the same browser suite after the structural audits and production bundle audit. CI installs Chromium before certification. The Playwright configuration serves `dist/`, warms one-time lazy chunks before steady-state assertions, and exercises:

- normal Story, Train and Dictionary navigation;
- Story word discovery and a real Train answer;
- the privacy modal and global sound control;
- debug play with the large world minimap mounted;
- the live Debug Performance panel;
- the complete saved vocabulary with 5,000 exposure receipts, including leaving Train while a question is being built;
- muted scene changes with an unavailable timing download, plus exactly one reducer evaluation per accepted spoken action.

The shared budgets live in `PERFORMANCE_BUDGETS` inside `src/performance.js`; the runtime panel, static audit and browser gate consume that same object. The browser harness uses Playwright's supported `webServer` configuration to test the production output. See [Playwright's web-server documentation](https://playwright.dev/docs/test-webserver).

## September 2026 investigation

Local Chromium profiling reproduced Train opening at 4.25 seconds with 500 saved words and 8.30 seconds with all 978 trainable senses. The final build measured 0.85 and 0.84 seconds respectively with the same host-observed benchmark; that older measurement includes assertion-polling delay. The full-vocabulary run's longest browser task fell from 8.18 seconds to 58 ms. The expensive work was repeated dictionary/grammatical-form derivation and distractor ranking. Fixed-content indexes, exact pruning of candidates that cannot win, and omission of unused debug records remove this duplication. Whole-bank audits compare optimized and exhaustive distractor choices; production candidate and question snapshots were also compared against the previous implementation.

The UI now drains the same certified candidate generator with a 12 ms slice budget, yielding between targets through a request-local message channel. Individual targets finish before yielding. Obsolete learning inputs cancel its current work. Preparation can continue while Story is visible, but only a current card that actually mounts in Train may record an activity presentation. The synchronous auditor and asynchronous UI share the complete enumeration order and seeded choices. The two-second full-bank readiness ceiling is separate from the existing 150 ms operation and 250 ms long-task ceilings; it does not permit a two-second browser freeze.

An experienced 500-word profile exposed another repeated cost: eight matching proposals took 653 ms. Preparing eligibility once and retaining compact pairwise facts only within that enumeration reduced this to 59 ms, including preparation. Every seeded board, receipt key and full debug trace was compared against the previous implementation. The largest matching work step fell from 85 to 32 ms. The final browser run loaded an experienced 500-word activity in 0.84 seconds, with a longest task of 58 ms; that profile has its own readiness regression case.

Each enumeration also reuses one learner-evidence lookup across all distractor pools, while fixed dictionary features bind each target's contrast ranking once. Losing candidates are pruned before label, answer-validity and exclusion work, using the same exact comparator bounds and seeded draws. Phrase comparison reuses only public dictionary spellings; typed answers never enter its persistent lookup. With Chromium's CPU rate throttled by two, first-card readiness measured 1.32 seconds for the full vocabulary, 0.96 seconds on the following load, and 1.30 seconds for the experienced profile. All four readiness, cancellation and measurement-validity browser tests passed under that throttle without changing the two-second budget.

Storage was not the dominant cost: serializing a synthetic 800-word, 2 MB learner save took about 1.8 ms, parsing 3.3 ms, and normalization 9.4 ms. Transition analytics on that profile took 66.4 ms before the fix and 5.0 ms after reusing unchanged projections. Opted-out analytics now skips that work entirely. The save format is unchanged, and receipts still flush on hide/unload.

Scene exposure bookkeeping also scaled poorly with history: 20 exposures with 25,000 existing receipts took 247 ms. One validated batch now takes about 5.2 ms and reuses untouched records. Muted actions bypass audio loading, while audible actions retain the validated destination privately until continuous playback completes or fails safely. Reload, cancellation, exact question parity, receipt deduplication and the audio commit boundary have executable regression coverage.

These are local synthetic-profile measurements, not promises for every device or network. Reproduce the browser coverage with `npm run test:performance -- tests/performance/large-learner.spec.mjs`; its attached timing report includes readiness, operation groups and long tasks.

## Preparing before the next interaction

Ordinary screens now warm after the current scene has painted. Train prepares a complete canonical decision while Story remains usable, then prepares the following activity from the accepted result while the completed card, recording, or blocking correction stays visible. Navigation and answer advancement publish only a complete current card. A superseded navigation never consumes a question or records presentation; a completed correction still requires its explicit acknowledgement. Reloading directly into a saved Train route uses the existing application boot surface until the first card is ready, without a second Train loading screen; a saved blocking correction must be acknowledged before that card mounts.

The in-memory preparation cache compares immutable learner maps and exact bounded scheduling history, goals, run identity and exclusions. It never serializes the save to make a cache key. Prepared decisions expire within 30 seconds or at the next known spacing deadline, whichever arrives first; health is attached from the current state at display. One separately bounded canonical candidate bank can serve a different same-scene action goal when every enumeration input is identical. Only the inexpensive goal selection runs again, and the original bank timestamp and expiry remain truthful. The last displayed word set remains remembered across an unanswered Story detour. Preparation neither writes storage nor grants exposure, mastery, rewards, audio completion or analytics impressions.

The browser regression cases separately measure cold preparation, warm navigation and the next activity after a correction. Local full-vocabulary measurements were **32.3 ms** for warmed Train and **46.8 ms** from correction acknowledgement to the replacement card; both observed zero loading placeholders. The ready-card check requires a changed, interactive card, so the retained completed card cannot accidentally count as readiness. Both warm paths have a 500 ms ceiling, while cold full-bank construction retains the existing two-second ceiling and all blocking-slice/long-task gates.

Current-scene action recordings and the selected exercise's exact recorded surfaces preload silently into a bounded 48-element audio cache, requesting at most six surfaces per warmup. Muted play downloads no speculative audio. Preloaded metadata uses the recording's real duration watchdog, so a long complete clip cannot be cut short by the five-second network-start timeout. Tale confirmation and earned source notes share the same exact, retryable tale resource; cold task/modal openings retain the source while their code and data finish loading.
