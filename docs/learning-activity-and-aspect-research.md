# Learning activity and aspect research

Reviewed 2026-09-13. This note records the design evidence behind the debug-only activity coverage matrix and the independent word-aspect learner model. It is not an efficacy study of this game, a claim of product parity, or evidence that any current threshold predicts CEFR attainment.

## Activity coverage boundary

There is no stable, exhaustive official catalogue of every activity another product may show to every learner. The matrix therefore records only capabilities described by official product pages: recognition and word banks, sentence ordering and writing, graduated listening and dictation, speaking and record/replay, narrative comprehension, target-language immersion, and language use inside an interactive world.

The production equivalents are resolved from the live Train, phrase, preparation, capstone, and word-aspect registries. A row may be direct, composed from several mechanics, a principled alternative, a useful missing candidate, not appropriate for Albanian/the game, or intentionally not claimed. Missing and inappropriate rows deliberately have no fake production reference. The matrix does not create a shadow curriculum or justify detached duplicate games.

Official capability observations:

- [Course and exercise overview](https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/)
- [Teaching-method overview](https://blog.duolingo.com/duolingo-teaching-method/)
- [Listening practice](https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-listening-skills/)
- [Writing practice](https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-writing-skills/)
- [Speaking practice](https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-speaking-skills/)
- [Stories](https://blog.duolingo.com/duolingo-stories-the-journey-to-android/)
- [Varied reading](https://blog.duolingo.com/duolingo-advanced-stories/)
- [Continuous audio narratives](https://blog.duolingo.com/duoradio-listening-practice/)
- [Target-language immersion](https://blog.duolingo.com/new-immersion-exercises-maximize-your-language-learning/)
- [Language use in an interactive world](https://blog.duolingo.com/adventures/)

## Why one word needs several evidence aspects

The learner model should not reduce “knows this word” to a single score. Recognition, retrieval, inflected-form recognition, contextual form selection, spelling, listening-to-orthography, and delayed exact recall place different demands on the learner. One success may support several scheduler decisions, but it should update only the explicitly targeted evidence aspect.

The research supports the underlying principles, not the project's current numeric thresholds:

- [Half-life regression](https://research.duolingo.com/papers/settles.acl16.pdf) models recall as learner-and-item history that decays over elapsed time. That supports per-target spacing and disconfirms lifetime exposure totals as a sufficient mastery signal.
- [Second Language Acquisition Modeling](https://research.duolingo.com/papers/settles.slam18.pdf) treats future token errors as dependent on prior learner interactions and morphosyntactic features. It also distinguishes constructed L2 responses from recognition and notes that new exercises should introduce only a small amount of unknown material.
- [Adaptive and Personalized Exercise Generation](https://aclanthology.org/2023.acl-long.567/) combines knowledge tracing with required exercise properties such as target knowledge and difficulty. That supports choosing a task from current evidence and constraints rather than assigning one global learner level.
- [Investigating Concept Definition and Skill Modeling for Cognitive Diagnosis in Language Learning](https://jedm.educationaldatamining.org/index.php/JEDM/article/view/716) examines how the definition and granularity of language skills affects diagnosis. That cautions against treating the present aspect partition as a universally correct ontology.
- [Retrieval practice produces more learning than elaborative studying](https://pubmed.ncbi.nlm.nih.gov/21574747/) supports requiring successful retrieval and later retrieval, rather than equating passive viewing with durable learning.

## Production rules derived from that evidence

1. Passive story exposure is familiarity only. It may prevent an unfair unseen-word question or help select an introductory task, but never unlocks an aspect, counts as mastery, or supplies CEFR evidence.
2. Each activity declares its target aspect or aspects. Incidental words are prerequisites and context, not rewarded targets.
3. Recognition precedes controlled retrieval; reviewed form recognition precedes form-role selection; supported orthographic construction precedes typed contextual recall; strict exact recall is delayed and separately spaced.
4. Listening-to-spelling is its own evidence path. Continuous generated MP3 completion is required; a play click, interrupted clip, browser text-to-speech, or knowledge gained through reading cannot substitute for auditory transcription evidence.
5. Prerequisites form a directed acyclic graph. Registry order may break ties among eligible tasks, but it must not secretly become the prerequisite model.
6. A miss schedules targeted, easier support after disjoint language rather than erasing unrelated proof or causing immediate oscillation.
7. Saved progress migration is monotonic. Existing valid proof can seed a newly explicit aspect, but migration cannot reduce durable evidence or manufacture stronger evidence than the old record contained.
8. All current mappings, thresholds, weights, and readiness interpretations remain explicitly uncalibrated. Calibration needs consented longitudinal data from true beginners, held-out transfer tasks, delayed outcomes, and analysis for both false advancement and unnecessary repetition.

## Honest next-mechanic inventory

The current debug matrix also records the strongest gaps found in the activity sweep. These are candidates, not promises or hidden claims of coverage: demonstrative-plus-noun gender retrieval, adjective/linking-article agreement, an explicit “a / the / plural” form contrast before spelling, ending-focused construction, audio-to-written/meaning matching, reviewed Albanian sound discrimination, later multi-gap agreement, and a point-to-the-target phase before any truly unmarked context question. Handwriting or script tracing is explicitly not appropriate: Albanian uses the Latin alphabet, while ë/ç, digraphs, sound-to-spelling and typed production are already the relevant demands.

The distractor planner follows the same honesty boundary. It uses successful saved-word evidence for answer-option fairness, never upgrades passive exposure into mastery, moves from clear elimination toward reviewed confusable neighbours, and rejects defensible alternative answers. Its current ranking and bands remain an editorial heuristic, not a calibrated model of learner difficulty.

The debug views exist to make these assumptions inspectable. They must display the scheduler's real registry rows and stored evidence, not independently reconstructed explanations.
