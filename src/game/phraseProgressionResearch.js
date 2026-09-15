const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

// Debug-only evidence register. Keeping this prose outside phraseProgression.js
// prevents research material from entering the player release shell.
export const PHRASE_PROGRESSION_RESEARCH = deepFreeze([
  { id: 'word-knowledge-dimensions', label: 'Word knowledge has multiple partially independent dimensions, strengthened by contextual encounters.', url: 'https://doi.org/10.1093/applin/aml048' },
  { id: 'incidental-exposure-boundary', label: 'Incidental exposure can support early form and form–meaning familiarity but does not establish productive mastery.', url: 'https://doi.org/10.1017/S0272263117000341' },
  { id: 'multi-component-q-matrix', label: 'Activities can exercise multiple explicit knowledge components rather than one global ability stage.', url: 'https://jedm.educationaldatamining.org/index.php/JEDM/article/view/314' },
  { id: 'retrieval-practice', label: 'Successful effortful retrieval supports durable learning beyond restudy alone.', url: 'https://doi.org/10.1126/science.1152408' },
  { id: 'knowledge-tracing', label: 'Knowledge tracing models changing mastery per knowledge component.', url: 'https://link.springer.com/article/10.1007/BF01099821' },
  { id: 'receptive-productive', label: 'L2 recognition and active recall are distinct levels of vocabulary strength.', url: 'https://doi.org/10.1111/j.0023-8333.2004.00260.x' },
  { id: 'test-format-feedback', label: 'Effortful short-answer retrieval with corrective feedback supports later retention.', url: 'https://doi.org/10.1080/09541440601056620' },
  { id: 'l2-spacing', label: 'Spacing has a substantial effect on second-language vocabulary retention.', url: 'https://doi.org/10.1017/S0272263114000825' },
  { id: 'half-life-regression', label: 'Language-learning recall models use elapsed time plus separate correct and incorrect history.', url: 'https://aclanthology.org/P16-1174/' },
  { id: 'half-life-regression-2026', label: 'A modern HLR evaluation reinforces explicit forgetting and learner-history features.', url: 'https://proceedings.mlr.press/v339/ilidio26a.html' },
  { id: 'learning-efficiency-2024', label: 'Trials needed to reach criterion predict delayed productive and receptive retention.', url: 'https://doi.org/10.1017/S095834402400020X' },
  { id: 'directional-transfer-2024', label: 'Receptive and productive retrieval transfer only partially, so both directions still need practice.', url: 'https://doi.org/10.1080/09658211.2024.2397043' },
  { id: 'content-aware-scheduling-2024', label: 'Content-aware learner models can improve recall calibration and learning efficiency.', url: 'https://aclanthology.org/2024.emnlp-main.784/' },
  { id: 'rolling-horizon-control-2025', label: 'Model-predictive control repeatedly optimizes a bounded future horizon and commits only the first decision.', url: 'https://proceedings.mlr.press/v291/gast25a.html' },
  { id: 'diverse-plan-beam-search-2024', label: 'Bi-criteria beam search can trade computational budget for plan quality and diversity while remaining much cheaper than exact optimization.', url: 'https://ojs.aaai.org/index.php/SOCS/article/view/31557' },
  { id: 'constrained-contextual-bandits-2025', label: 'Contextual online learning can optimize uncertain rewards subject to explicit general constraints.', url: 'https://proceedings.mlr.press/v267/guo25v.html' },
  { id: 'uncertainty-deferral-2026', label: 'Knowledge tracers should expose uncertainty and defer unreliable predictions.', url: 'https://proceedings.mlr.press/v339/mitton26a.html' },
  { id: 'difficulty-caveat', label: 'The 85% result concerns binary classification learning; it is a warning against very-low-success tasks, not a hard language-learning target.', url: 'https://doi.org/10.1038/s41467-019-12552-4' },
])

// A model card, not a marketing claim. It records where the current cold-start
// scheduler follows the evidence and where real, consented interaction data is
// still required before a learned model could honestly be called calibrated.
export const PHRASE_PROGRESSION_RESEARCH_ALIGNMENT = deepFreeze([
  {
    id: 'independent-word-aspects', status: 'implemented',
    evidenceIds: ['word-knowledge-dimensions', 'multi-component-q-matrix'],
    systemResponse: 'Word meaning, grammatical form, contextual inference, listening-to-orthography, construction and typed recall keep independent target-scoped proofs in a branching prerequisite graph.',
  },
  {
    id: 'exposure-is-not-mastery', status: 'implemented',
    evidenceIds: ['incidental-exposure-boundary', 'retrieval-practice'],
    systemResponse: 'Replay-safe story and phrase co-exposure can only give an unproven weak word a bounded retrieval-priority boost; it cannot unlock, prove, protect from heart risk or claim CEFR evidence.',
  },
  {
    id: 'separate-skill-evidence', status: 'implemented',
    evidenceIds: ['knowledge-tracing', 'directional-transfer-2024'],
    systemResponse: 'Production, listening and meaning matching keep independent phrase-level mastery; transfer never silently promotes another skill.',
  },
  {
    id: 'graduated-retrieval', status: 'implemented',
    evidenceIds: ['test-format-feedback', 'receptive-productive'],
    systemResponse: 'The same phrase advances from focused cloze to arrangement, word spelling, full production and strict spaced recall, with targeted feedback after misses.',
  },
  {
    id: 'learning-efficiency', status: 'implemented',
    evidenceIds: ['learning-efficiency-2024'],
    systemResponse: 'Correct and incorrect phrase rounds are retained separately and alter item priority; a fast learner is not forced through global ability gates.',
  },
  {
    id: 'content-aware-selection', status: 'implemented',
    evidenceIds: ['content-aware-scheduling-2024'],
    systemResponse: 'Scheduling uses the phrase’s actual lexical focus, practical-vocabulary weight, task demand and word overlap instead of treating cards as anonymous IDs.',
  },
  {
    id: 'future-aware-diverse-planning', status: 'implemented',
    evidenceIds: ['rolling-horizon-control-2025', 'diverse-plan-beam-search-2024'],
    systemResponse: 'Train enumerates every builder-certified current graph route, plans up to twenty-four rounds with state-deduplicated beam dynamic programming, commits one activity, observes the real result and replans. A bounded exhaustive oracle measures first-choice parity and lexicographic regret on small complete spaces.',
  },
  {
    id: 'constrained-local-personalization', status: 'calibration-needed',
    evidenceIds: ['half-life-regression', 'constrained-contextual-bandits-2025'],
    systemResponse: 'Local expected-gain and uncertainty signals are late soft objectives only. Story-goal deadlines, remediation, reviewed prerequisites, no-repeat rules and all diversity objectives outrank them; representative consented outcomes are still required before learning a contextual policy.',
  },
  {
    id: 'forgetting-model', status: 'calibration-needed',
    evidenceIds: ['half-life-regression', 'half-life-regression-2026', 'l2-spacing'],
    systemResponse: 'Strict retention now requires both disjoint Train rounds and persisted real elapsed time. The interpretable HLR/IRT-ready features and intervals remain transparent cold-start defaults until consented delayed outcomes can calibrate them.',
  },
  {
    id: 'uncertainty', status: 'calibration-needed',
    evidenceIds: ['uncertainty-deferral-2026'],
    systemResponse: 'Cold start exposes a wide heuristic uncertainty interval, preserves hard evidence gates and falls back to support after errors. Uncertainty can never award mastery; representative player data is still required for calibrated probabilities.',
  },
])

export const PHRASE_PROGRESSION_MODEL_CARD = deepFreeze({
  classification: 'research-aligned, interpretable and uncalibrated cold-start scheduler',
  sotaClaim: false,
  reason: 'Empirical SOTA is a measured comparison on representative learner outcomes; it cannot be established from architecture or citations alone.',
  calibrationRequirement: 'Consent-based, privacy-reviewed interaction telemetry with delayed-retention outcomes, calibration error, learning-efficiency and subgroup checks.',
})
