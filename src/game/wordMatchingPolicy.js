const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

// Word matching is retrieval reinforcement, not another capability proof that
// can advance the lexical aspect graph. A board is deliberately heterogeneous: one
// dependable anchor, two middle challenges and two highest-challenge saved
// words. The builder derives those relative bands from the learner's real
// evidence and the reviewed contrast registry.
export const WORD_MATCHING_POLICY = deepFreeze({
  id: 'mixed-five-pair-board',
  label: 'Adaptive five-pair board',
  mode: 'match',
  pairCount: 5,
  composition: {
    easy: 1,
    'medium-hard': 2,
    'very-hard': 2,
  },
  unlock: {
    stageId: 'meaning-recognition',
    wins: 2,
  },
  evidenceTrack: 'matching-reinforcement',
})
