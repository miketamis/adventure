const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

// Debug-only render data. The learning progression audit joins every entry to
// the production exercise registries and checks their choice, distractor and
// board sizes. Keeping this catalogue in the lazy debug graph prevents example
// prose from increasing the ordinary player's initial bundle.
export const TRAIN_EXERCISE_EXAMPLES = deepFreeze({
  al2en: {
    instruction: 'What does this Albanian word mean?', prompt: 'fshat', promptLang: 'sq',
    choices: ['village', 'river'], response: 'Choose “village”.',
  },
  en2al: {
    instruction: 'Choose the Albanian word.', prompt: 'village', promptLang: 'en',
    choices: ['fshat', 'urë'], response: 'Choose “fshat”.',
  },
  'meaning-recognition': {
    instruction: 'What does this Albanian word mean?', prompt: 'fshat', promptLang: 'sq',
    choices: ['village', 'bridge', 'river', 'house'], response: 'Choose “village” among three plausible meanings.',
  },
  'four-choice-meaning': {
    instruction: 'What does this Albanian word mean?', prompt: 'fshat', promptLang: 'sq',
    choices: ['village', 'bridge', 'river', 'house'], response: 'Choose “village” among three plausible meanings.',
  },
  'controlled-lemma-retrieval': {
    instruction: 'Choose the Albanian word.', prompt: 'village', promptLang: 'en',
    choices: ['fshat', 'urë'], response: 'Choose “fshat”; this is controlled selection, not independent production.',
  },
  'controlled-retrieval-two-choice': {
    instruction: 'Choose the Albanian word.', prompt: 'village', promptLang: 'en',
    choices: ['fshat', 'urë'], response: 'Choose “fshat” with one plausible distractor.',
  },
  'controlled-retrieval-four-choice': {
    instruction: 'Choose the Albanian word.', prompt: 'village', promptLang: 'en',
    choices: ['fshat', 'urë', 'lumë', 'shtëpi'], response: 'Choose “fshat” among three plausible distractors.',
  },
  'reviewed-form-contrast': {
    instruction: 'What job does the highlighted form have here?', prompt: 'Po shkoj në [fshat].', promptLang: 'sq',
    choices: ['a village · after a direction', 'the village · subject', 'the village · object', 'of / to / from the village'],
    response: 'Choose the reviewed grammatical job shown by this exact context.',
  },
  'contextual-form-selection': {
    instruction: 'Choose the form that completes this sentence.', prompt: 'Po shkoj në ___.', promptLang: 'sq',
    choices: ['fshat', 'fshati', 'fshatin', 'fshatit'], response: 'Choose “fshat” for this reviewed role.',
  },
  'word-form-construction': {
    instruction: 'Build the Albanian word or form.', prompt: 'Po shkoj në ___.', promptLang: 'sq',
    tiles: ['f', 'sh', 'a', 't', 'v', 'ë', 'i'], response: 'Build “fshat”; only this target earns a token.',
  },
  'contextual-typed-recall': {
    instruction: 'Write the missing word in Albanian.', prompt: 'Po shkoj në ___.', promptLang: 'sq',
    input: 'Type the missing Albanian word…', response: 'Type “fshat”; beginner letter leeway applies.',
  },
  'strict-spaced-recall': {
    instruction: 'Write the missing word in Albanian.', prompt: 'Po shkoj në ___.', promptLang: 'sq',
    input: 'Type the missing Albanian word…', response: 'Type “fshat” exactly after the review gap.',
  },
  'marked-context-recognition': {
    instruction: 'Choose what the marked word means here.', prompt: 'Po shkoj në [fshat]. · I am going to the __.', promptLang: 'sq',
    choices: ['village', 'bridge', 'river', 'house'], response: 'Choose “village” from the marked Albanian context.',
  },
  'mirrored-controlled-retrieval': {
    instruction: 'Complete the Albanian sentence from the English context.', prompt: 'I am going to the village. · Po shkoj në _____.',
    choices: ['fshat', 'urë', 'lumë', 'shtëpi'], response: 'Choose “fshat” for the Albanian gap.',
  },
  'unmarked-context-recognition': {
    instruction: 'Find the target from context, then choose its meaning.', prompt: 'Po shkoj në fshat. · I am going to the __.', promptLang: 'sq',
    choices: ['village', 'bridge', 'river', 'house'], response: 'Find “fshat” without a visual mark, then choose “village”.',
  },
  'independent-word-recognition': {
    instruction: 'What does this Albanian word mean?', prompt: 'fshat', promptLang: 'sq',
    choices: ['village', 'bridge', 'river', 'house'], response: 'Choose “village” among three distractors.',
  },
  'guided-word-selection': {
    instruction: 'Choose the Albanian word.', prompt: 'village', promptLang: 'en',
    choices: ['fshat', 'urë'], response: 'Choose “fshat”; one distractor is shown.',
  },
  'independent-word-selection': {
    instruction: 'Choose the Albanian word.', prompt: 'village', promptLang: 'en',
    choices: ['fshat', 'urë', 'lumë', 'shtëpi'], response: 'Choose “fshat” among three distractors.',
  },
  'supported-word-spelling': {
    instruction: 'Write this word in Albanian.', prompt: 'village', promptLang: 'en',
    input: 'Type your Albanian answer…', response: 'Type “fshat”; beginner spelling leeway applies.',
  },
  'retained-word-spelling': {
    instruction: 'Write this word in Albanian.', prompt: 'village', promptLang: 'en',
    input: 'Type your Albanian answer…', response: 'Type “fshat” exactly after the review gap.',
  },
  'identify-lemma': {
    instruction: 'Which word is this a form of?', prompt: 'fshatin', promptLang: 'sq',
    choices: ['village', 'bridge', 'river', 'road'], response: 'Choose “village”.',
  },
  'identify-job': {
    instruction: 'What job does this noun form have?', prompt: 'fshatin', promptLang: 'sq',
    choices: ['the village · object', 'the village · subject', 'a village', 'of / to / from the village'],
    response: 'Choose “the village · object”.',
  },
  'exact-paradigm': {
    instruction: 'Quick ending refresher', prompt: 'fshat · fshati · fshatin · fshatit', promptLang: 'sq',
    pairs: [
      { al: 'fshat', en: 'base form · one / a' },
      { al: 'fshati', en: 'the noun · subject' },
      { al: 'fshatin', en: 'the noun · object' },
      { al: 'fshatit', en: 'of / to / from the noun' },
    ],
    response: 'Review the same noun in four labelled grammatical jobs; this is not a memorisation ladder.',
  },
  'focused-cloze': {
    instruction: 'Complete the phrase.', prompt: 'Po shkoj në _____.', promptLang: 'sq',
    choices: ['fshat', 'urë', 'qytet', 'shtëpi'], response: 'Choose “fshat”; only that focus word is rewarded.',
  },
  'whole-arrangement': {
    instruction: 'Build the Albanian phrase.', prompt: 'I am going to the village.', promptLang: 'en',
    tiles: ['në', 'dua', 'fshat', 'po', 'jam', 'shkoj', 'nga'], response: 'Arrange “po · shkoj · në · fshat”; three tiles are distractors.',
  },
  'focus-spelling': {
    instruction: 'Write the missing word in Albanian.', prompt: 'Po shkoj në _____.', promptLang: 'sq',
    input: 'Type the missing word…', response: 'Type “fshat” in this sentence; only that focus word is rewarded.',
  },
  'independent-production': {
    instruction: 'Write this in Albanian.', prompt: 'I am going to the village.', promptLang: 'en',
    input: 'Type the complete Albanian phrase…', response: 'Type “po shkoj në fshat.” with beginner spelling leeway.',
  },
  'strict-retention': {
    instruction: 'Write this in Albanian.', prompt: 'I am going to the village.', promptLang: 'en',
    input: 'Type the complete Albanian phrase…', response: 'Type “po shkoj në fshat.” exactly after the review gap.',
  },
  'guided-listening': {
    instruction: 'Listen, then build what you hear.', prompt: 'continuous Albanian audio', audio: 'po shkoj në fshat.',
    tiles: ['në', 'fshat', 'po', 'jam', 'shkoj', 'nga'], response: 'Build “po · shkoj · në · fshat”; no English cue is shown.',
  },
  'independent-listening': {
    instruction: 'Listen, then build what you hear.', prompt: 'continuous Albanian audio', audio: 'po shkoj në fshat.',
    tiles: ['dua', 'fshat', 'nga', 'po', 'jam', 'shkoj', 'në'], response: 'Build the heard phrase from a larger word bank.',
  },
  'mastered-listening': {
    instruction: 'Listen, then build what you hear.', prompt: 'continuous Albanian audio', audio: 'po shkoj në fshat.',
    tiles: ['jam', 'po', 'tek', 'fshat', 'dua', 'shkoj', 'në', 'nga', 'tani'], response: 'Build the heard phrase from the largest word bank.',
  },
  'guided-matching': {
    instruction: 'Match each Albanian phrase to its meaning.', prompt: 'Albanian phrase cards', promptLang: 'sq',
    pairs: [
      { al: 'po shkoj në fshat.', en: 'I am going to the village.' },
      { al: 'takohemi më vonë.', en: 'We will meet later.' },
    ],
    response: 'Match both Albanian lines to their English meanings.',
  },
  'independent-matching': {
    instruction: 'Match each Albanian phrase to its meaning.', prompt: 'Larger phrase board', promptLang: 'sq',
    pairs: [
      { al: 'po shkoj në fshat.', en: 'I am going to the village.' },
      { al: 'takohemi më vonë.', en: 'We will meet later.' },
      { al: 'më duhet ujë.', en: 'I need water.' },
    ],
    response: 'Match all three phrase pairs.',
  },
  'mastered-matching': {
    instruction: 'Match each Albanian phrase to its meaning.', prompt: 'Largest phrase board', promptLang: 'sq',
    pairs: [
      { al: 'po shkoj në fshat.', en: 'I am going to the village.' },
      { al: 'takohemi më vonë.', en: 'We will meet later.' },
      { al: 'më duhet ujë.', en: 'I need water.' },
      { al: 'prit pak, të lutem.', en: 'Wait a moment, please.' },
    ],
    response: 'Match all four phrase pairs.',
  },
})
