const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

// Debug-only evidence register. Keeping this prose outside phraseProgression.js
// prevents research material from entering the player release shell.
export const PHRASE_PROGRESSION_RESEARCH = deepFreeze([
  { id: 'knowledge-tracing', label: 'Knowledge tracing models changing mastery per knowledge component.', url: 'https://link.springer.com/article/10.1007/BF01099821' },
  { id: 'receptive-productive', label: 'L2 recognition and active recall are distinct levels of vocabulary strength.', url: 'https://doi.org/10.1111/j.0023-8333.2004.00260.x' },
  { id: 'test-format-feedback', label: 'Effortful short-answer retrieval with corrective feedback supports later retention.', url: 'https://doi.org/10.1080/09541440601056620' },
  { id: 'l2-spacing', label: 'Spacing has a substantial effect on second-language vocabulary retention.', url: 'https://doi.org/10.1017/S0272263114000825' },
  { id: 'half-life-regression', label: 'Language-learning recall models use elapsed time plus separate correct and incorrect history.', url: 'https://aclanthology.org/P16-1174/' },
  { id: 'half-life-regression-2026', label: 'A modern HLR evaluation reinforces explicit forgetting and learner-history features.', url: 'https://proceedings.mlr.press/v339/ilidio26a.html' },
  { id: 'learning-efficiency-2024', label: 'Trials needed to reach criterion predict delayed productive and receptive retention.', url: 'https://doi.org/10.1017/S095834402400020X' },
  { id: 'directional-transfer-2024', label: 'Receptive and productive retrieval transfer only partially, so both directions still need practice.', url: 'https://doi.org/10.1080/09658211.2024.2397043' },
  { id: 'content-aware-scheduling-2024', label: 'Content-aware learner models can improve recall calibration and learning efficiency.', url: 'https://aclanthology.org/2024.emnlp-main.784/' },
  { id: 'uncertainty-deferral-2026', label: 'Knowledge tracers should expose uncertainty and defer unreliable predictions.', url: 'https://proceedings.mlr.press/v339/mitton26a.html' },
  { id: 'difficulty-caveat', label: 'The 85% result concerns binary classification learning; it is a warning against very-low-success tasks, not a hard language-learning target.', url: 'https://doi.org/10.1038/s41467-019-12552-4' },
])

// A model card, not a marketing claim. It records where the current cold-start
// scheduler follows the evidence and where real, consented interaction data is
// still required before a learned model could honestly be called calibrated.
export const PHRASE_PROGRESSION_RESEARCH_ALIGNMENT = deepFreeze([
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
    id: 'forgetting-model', status: 'calibration-needed',
    evidenceIds: ['half-life-regression', 'half-life-regression-2026', 'l2-spacing'],
    systemResponse: 'Expanded review gaps and lapse backoff are active. Learner/item/context parameters remain transparent defaults until consented outcome data can calibrate them.',
  },
  {
    id: 'uncertainty', status: 'calibration-needed',
    evidenceIds: ['uncertainty-deferral-2026'],
    systemResponse: 'Cold start defers difficulty through hard evidence gates and falls back to support after errors. A probabilistic uncertainty model requires representative player data.',
  },
])

export const PHRASE_PROGRESSION_MODEL_CARD = deepFreeze({
  classification: 'research-aligned, interpretable cold-start scheduler',
  sotaClaim: false,
  reason: 'Empirical SOTA is a measured comparison on representative learner outcomes; it cannot be established from architecture or citations alone.',
  calibrationRequirement: 'Consent-based, privacy-reviewed interaction telemetry with delayed-retention outcomes, calibration error, learning-efficiency and subgroup checks.',
})
