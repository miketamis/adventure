# Performance monitoring

The performance suite measures the player-visible delay from an input to the next rendered frame across the whole application. It is deliberately centralized: a delegated listener and the browser Event Timing API cover current and future buttons, links, inputs, forms and interactive map markers without adding a timer to every component.

## What is measured

- input delay, handler time, presentation delay and total interaction duration;
- reducer, structured-analytics and local-persistence work;
- React commit duration where the active React build exposes profiler timings;
- browser long tasks, first and largest contentful paint, and layout shift;
- every performance surface and privacy-safe control group encountered during the session.

Event Timing's duration ends after the next rendering update, so it captures the delay the player actually feels rather than only the JavaScript callback. Browsers without Event Timing use a delegated two-frame fallback. See the [W3C Event Timing specification](https://www.w3.org/TR/event-timing/) for the underlying duration model.

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
- the live Debug Performance panel.

The shared budgets live in `PERFORMANCE_BUDGETS` inside `src/performance.js`; the runtime panel, static audit and browser gate consume that same object. The browser harness uses Playwright's supported `webServer` configuration to test the production output. See [Playwright's web-server documentation](https://playwright.dev/docs/test-webserver).
