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
  'grammatical-form-odd-one-out': {
    instruction: 'Which Albanian noun form is not plural?', prompt: 'Three forms share one reviewed grammatical feature.', promptLang: 'sq',
    choices: ['fshatra', 'fshatrat', 'fshatrave', 'fshatin'], response: 'Choose “fshatin”; the other three are plural while it is singular.',
  },
  'reviewed-form-odd-one-out': {
    instruction: 'Which Albanian noun form does not belong?', prompt: 'Use the reviewed number or definiteness contrast.', promptLang: 'sq',
    choices: ['fshatra', 'fshatrat', 'fshatrave', 'fshatin'], response: 'Choose the one exact surface with the opposite reviewed category.',
  },
  'number-odd-one-out': {
    instruction: 'Which Albanian noun form is not plural?', prompt: 'Three plural forms and one singular form.', promptLang: 'sq',
    choices: ['fshatra', 'fshatrat', 'fshatrave', 'fshatin'], response: 'Choose “fshatin”.',
  },
  'definiteness-odd-one-out': {
    instruction: 'Which Albanian noun form is not definite?', prompt: 'Three definite forms and one indefinite form.', promptLang: 'sq',
    choices: ['fshatin', 'fshatit', 'fshatrat', 'fshat'], response: 'Choose “fshat”.',
  },
  'auditory-surface-recognition': {
    instruction: 'Listen, then choose the written Albanian word.', prompt: 'continuous complete-word MP3', audio: 'fshat',
    choices: ['fshat', 'urë', 'rrugë', 'shtëpi'], response: 'After the recording finishes, choose “fshat”. No transcript appears before the answer.',
  },
  'reviewed-sound-contrast': {
    instruction: 'Listen carefully, then choose the Albanian word you hear.', prompt: '🔊 complete-word MP3', promptLang: 'sq',
    choices: ['çaj', 'qaj'], response: 'Choose the recorded real word; both options are saved and the reviewed contrast is ç / q at the start.',
  },
  'auditory-surface-discrimination': {
    instruction: 'Listen carefully, then choose the Albanian word you hear.', prompt: 'continuous complete-word MP3', audio: 'çaj',
    choices: ['çaj', 'qaj'], response: 'Choose “çaj”; this proof is separate from the earlier general sound-to-spelling match.',
  },
  'audio-surface-discrimination': {
    instruction: 'Listen carefully, then choose the Albanian word you hear.', prompt: 'continuous complete-word MP3', audio: 'çaj',
    choices: ['çaj', 'qaj'], response: 'Use the reviewed real-word sound contrast when its partner is saved; otherwise use a fresh four-word saved set.',
  },
  'audio-to-written-word': {
    instruction: 'Listen, then choose the written Albanian word.', prompt: 'continuous complete-word MP3', audio: 'fshat',
    choices: ['fshat', 'urë', 'rrugë', 'shtëpi'], response: 'Choose the saved Albanian word that matches the recording.',
  },
  'auditory-meaning-recognition': {
    instruction: 'Listen, then choose what the Albanian word means.', prompt: 'continuous complete-word MP3', audio: 'fshat',
    choices: ['village', 'bridge', 'road', 'house'], response: 'After the recording finishes, choose “village”. The Albanian transcript remains hidden.',
  },
  'audio-to-word-meaning': {
    instruction: 'Listen, then choose what the Albanian word means.', prompt: 'continuous complete-word MP3', audio: 'fshat',
    choices: ['village', 'bridge', 'road', 'house'], response: 'Choose the meaning of the recorded saved word without seeing its spelling.',
  },
  'mixed-five-pair-board': {
    instruction: 'Match the Albanian words to their meanings', prompt: 'A mixed saved-word board', promptLang: 'sq',
    pairs: [
      { al: 'fshat', en: 'village', difficultyBand: 'easy' },
      { al: 'urë', en: 'bridge', difficultyBand: 'medium-hard' },
      { al: 'rrugë', en: 'road', difficultyBand: 'medium-hard' },
      { al: 'vonë', en: 'late', difficultyBand: 'very-hard' },
      { al: 'prit', en: 'wait', difficultyBand: 'very-hard' },
    ],
    response: 'Match all five pairs: one relative easy anchor, two medium-hard words and two highest-challenge words from the eligible saved pool.',
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
  'demonstrative-noun-whole-choice': {
    instruction: 'Which Albanian noun phrase means this?', prompt: 'this book', promptLang: 'en',
    choices: ['ky libër', 'kjo urë'],
    response: 'Choose “ky libër”. This whole-bundle step records lexical retrieval for libër, not a separate grammar success.',
  },
  'demonstrative-noun-agreement': {
    instruction: 'Choose the demonstrative, then the noun.', prompt: 'this book', promptLang: 'en',
    choices: ['ky', 'kjo'],
    phases: [
      { id: 'choose-demonstrative', choices: ['ky', 'kjo'], response: 'Choose “ky”; no evidence is recorded yet.' },
      { id: 'choose-noun', prompt: 'ky __', choices: ['libër', 'urë', 'shtëpi', 'fshat'], response: 'Choose “libër”; completing both parts records one agreement result.' },
    ],
    response: 'Complete both parts of the same reviewed noun phrase; only the complete activity records demonstrative-agreement evidence.',
  },
  'demonstrative-noun-split-choice': {
    instruction: 'Choose the demonstrative, then the noun.', prompt: 'this book', promptLang: 'en',
    choices: ['ky', 'kjo'],
    phases: [
      { id: 'choose-demonstrative', choices: ['ky', 'kjo'], response: 'Choose “ky”.' },
      { id: 'choose-noun', prompt: 'ky __', choices: ['libër', 'urë', 'shtëpi', 'fshat'], response: 'Choose “libër”.' },
    ],
    response: 'The determiner and noun are separate decisions on one card, using a reviewed gender frame.',
  },
  'adjective-linking-article-agreement': {
    instruction: 'Identify the noun, choose its linking article, then identify the article’s job.', prompt: '[libri] i mirë', promptLang: 'sq',
    choices: ['book', 'bridge', 'road', 'house'],
    phases: [
      { id: 'identify-agreement-noun', choices: ['book', 'bridge', 'road', 'house'], response: 'Choose “book”; no evidence is recorded yet.' },
      { id: 'choose-linking-article', prompt: 'libri __ mirë', choices: ['i', 'e'], response: 'Choose “i”; no evidence is recorded yet.' },
      { id: 'identify-linking-article-job', prompt: 'libri [i] mirë', choices: ['links this masculine noun to its adjective', 'links a feminine noun to its adjective'], response: 'Choose the masculine agreement job; completing all three phases records one result.' },
    ],
    response: 'Meaning is established before the exact article and its grammatical job are tested; only the complete chain records agreement evidence.',
  },
  'adjective-linking-article-staged': {
    instruction: 'Identify the noun, choose its linking article, then identify the article’s job.', prompt: '[libri] i mirë', promptLang: 'sq',
    choices: ['book', 'bridge', 'road', 'house'],
    phases: [
      { id: 'identify-agreement-noun', choices: ['book', 'bridge', 'road', 'house'], response: 'Identify libri as “book”.' },
      { id: 'choose-linking-article', prompt: 'libri __ mirë', choices: ['i', 'e'], response: 'Choose “i”.' },
      { id: 'identify-linking-article-job', prompt: 'libri [i] mirë', choices: ['links this masculine noun to its adjective', 'links a feminine noun to its adjective'], response: 'Identify the agreement job.' },
    ],
    response: 'No English sentence is displayed; the later phases ask for the reviewed Albanian form and why it fits.',
  },
  'linked-noun-agreement-cloze': {
    instruction: 'Complete both agreement gaps in the same Albanian noun phrase.', prompt: '__ libër __ mirë', promptLang: 'sq',
    choices: ['ky', 'kjo'],
    phases: [
      { id: 'choose-linked-demonstrative', prompt: '__ libër __ mirë', choices: ['ky', 'kjo'], response: 'Choose “ky”; no evidence is recorded yet.' },
      { id: 'choose-linked-article', prompt: 'ky libër __ mirë', choices: ['i', 'e'], response: 'Choose “i”; completing both linked decisions records one result.' },
    ],
    response: 'The card combines two previously proved agreement decisions without displaying an English answer.',
  },
  'reviewed-form-contrast': {
    instruction: 'Identify what the marked Albanian form means, then identify its grammatical job.', prompt: '[Fshati] është këtu.', promptLang: 'sq',
    choices: ['the noun · subject', 'the noun · object', 'of / to / from the noun', 'the nouns · plural'],
    phases: [
      { id: 'identify-form-meaning', choices: ['village', 'bridge', 'river', 'house'], response: 'Choose “village”; no evidence is recorded yet.' },
      { id: 'identify-marked-form-job', choices: ['the noun · subject', 'the noun · object', 'of / to / from the noun', 'the nouns · plural'], response: 'Choose “the noun · subject”.' },
    ],
    response: 'Complete both phases; the first records nothing, and only the complete meaning-and-job activity records exact per-form evidence and awards one target token.',
  },
  'contextual-form-selection': {
    instruction: 'Choose only the ending that completes the marked noun.', prompt: 'Fshat__ është këtu.', promptLang: 'sq',
    choices: ['no added ending', '-i', '-in', '-it'], response: 'Choose “-i”; the exact reviewed form is “fshati”.',
  },
  'reviewed-ending-choice': {
    instruction: 'Choose only the ending that completes the marked noun.', prompt: 'Fshat__ është këtu.', promptLang: 'sq',
    choices: ['no added ending', '-i', '-in', '-it'], response: 'Choose “-i”; only the ending is tested.',
  },
  'reviewed-ending-recall': {
    instruction: 'Type only the ending that completes the marked noun.', prompt: 'Fshat__ është këtu.', promptLang: 'sq',
    input: 'Type only the missing ending…', response: 'Type “i”; the exact reviewed form is “fshati”.',
  },
  'reviewed-ending-typed': {
    instruction: 'Type only the ending that completes the marked noun.', prompt: 'Fshat__ është këtu.', promptLang: 'sq',
    input: 'Type only the missing ending…', response: 'Type “i”; this is independent ending recall, not whole-word spelling.',
  },
  'auditory-word-construction': {
    instruction: 'Listen, then build the Albanian word.', prompt: 'continuous recording only', audio: 'fshat',
    tiles: ['f', 'sh', 'a', 't', 'v', 'ë', 'i'],
    response: 'Play the complete word, then tap f · sh · a · t. Each tapped tile plays its own recorded Albanian sound.',
  },
  'audio-letter-construction': {
    instruction: 'Listen, then build the Albanian word.', prompt: 'continuous recording only', audio: 'fshat',
    tiles: ['f', 'sh', 'a', 't', 'v', 'ë', 'i'],
    response: 'Build “fshat” from the supplied recorded-sound tiles; no English cue is shown.',
  },
  'auditory-word-spelling': {
    instruction: 'Listen, then type the Albanian word.', prompt: 'continuous recording only', audio: 'fshat',
    input: 'Type the word you heard…',
    response: 'Type “fshat” exactly. A close early attempt opens an immediate repair instead of awarding proof or costing a heart.',
  },
  'audio-typed-spelling': {
    instruction: 'Listen, then type the Albanian word.', prompt: 'continuous recording only', audio: 'fshat',
    input: 'Type the word you heard…', response: 'Type “fshat” exactly after its complete recorded MP3 finishes.',
  },
  'word-form-construction': {
    instruction: 'Build the Albanian word or form.', prompt: 'Po shkoj në ___.', promptLang: 'sq',
    tiles: ['f', 'sh', 'a', 't', 'v', 'ë', 'i'], response: 'Build “fshat”; only this target earns a token.',
  },
  'contextual-typed-recall': {
    instruction: 'Write the missing word in Albanian.', prompt: 'Po shkoj në ___.', promptLang: 'sq',
    input: 'Type the missing Albanian word…', response: 'Type “fshat” exactly; a close attempt stays open for a guided repair.',
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
    instruction: 'First tap “fshat” in the Albanian sentence.', prompt: 'Po shkoj në fshat.', promptLang: 'sq',
    choices: ['Po', 'shkoj', 'në', 'fshat'],
    phases: [
      { id: 'locate-context-target', response: 'Tap “fshat”; no evidence is recorded and the same occurrence is now marked in green.' },
      { id: 'analyse-context-target', choices: ['village', 'bridge', 'river', 'house'], response: 'Choose “village”; only this completed analysis records contextual evidence.' },
    ],
    response: 'Locate the exact named surface before analysing its meaning; a wrong token fails the activity rather than allowing unlimited guessing.',
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
