import { CEFR_PREPARATION_ACTIVITIES, CEFR_PREPARATION_MECHANICS } from './cefrPreparation.js'
import { CEFR_CAPSTONE_TASK_FAMILIES } from './cefrProgression.js'
import { PHRASE_STAGE_DEFINITIONS } from './phraseProgression.js'
import { TRAIN_EXERCISE_FAMILIES, TRAIN_QUESTION_MIX_POLICY } from './trainingProgression.js'
import { WORD_LEARNING_ASPECT_BY_ID } from './wordLearningAspects.js'

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

// This is a dated research ledger, not a shadow curriculum. The production
// references below resolve to the live registries used by Train and the CEFR
// preparation path. Official product pages do not promise a stable exhaustive
// taxonomy, so a capability enters this list only when an official page shows
// or describes it.
export const ACTIVITY_COVERAGE_RESEARCHED_ON = '2026-09-13'

export const ACTIVITY_COVERAGE_SOURCES = deepFreeze({
  courseOverview: {
    label: 'Official course and exercise overview',
    url: 'https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/',
    supports: ['recognition before typing', 'word banks', 'listening', 'speaking', 'stories', 'personalised review'],
  },
  teachingMethod: {
    label: 'Official teaching-method overview',
    url: 'https://blog.duolingo.com/duolingo-teaching-method/',
    supports: ['graduated challenge', 'pattern noticing', 'adaptive order and difficulty'],
  },
  listening: {
    label: 'Official listening-practice overview',
    url: 'https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-listening-skills/',
    supports: ['audio with fading text support', 'audio matching', 'missing-word listening', 'dictation'],
  },
  writing: {
    label: 'Official writing-practice overview',
    url: 'https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-writing-skills/',
    supports: ['word banks', 'ordering', 'missing words', 'dictation', 'typed translation', 'story writing'],
  },
  speaking: {
    label: 'Official speaking-practice overview',
    url: 'https://blog.duolingo.com/covering-all-the-bases-duolingos-approach-to-speaking-skills/',
    supports: ['repeat and produce aloud', 'short dialogue', 'sound-focused practice', 'guided and open conversation'],
  },
  stories: {
    label: 'Official Stories overview',
    url: 'https://blog.duolingo.com/duolingo-stories-the-journey-to-android/',
    supports: ['longer narrative reading and listening', 'intermittent comprehension checks'],
  },
  variedReading: {
    label: 'Official varied-reading overview',
    url: 'https://blog.duolingo.com/duolingo-advanced-stories/',
    supports: ['dialogue', 'letters', 'emails', 'notices', 'advertising', 'viewpoint and problem solving'],
  },
  audioNarrative: {
    label: 'Official audio-narrative overview',
    url: 'https://blog.duolingo.com/duoradio-listening-practice/',
    supports: ['continuous audio stories', 'gist and detail checks', 'audio matching', 'select words heard'],
  },
  immersion: {
    label: 'Official target-language immersion overview',
    url: 'https://blog.duolingo.com/new-immersion-exercises-maximize-your-language-learning/',
    supports: ['target-language cloze', 'dialogue completion', 'meaning comprehension without translation'],
  },
  interactiveWorld: {
    label: 'Official interactive-world overview',
    url: 'https://blog.duolingo.com/adventures/',
    supports: ['conversation inside a navigable world', 'practical tasks such as shopping and directions'],
  },
})

export const ACTIVITY_EQUIVALENCE_LEVELS = deepFreeze({
  direct: 'Direct production equivalent',
  composed: 'Covered by a richer combination',
  principledAlternative: 'Same learning purpose, different implementation',
  missingCandidate: 'Useful candidate — not implemented',
  notAppropriate: 'Not appropriate for this language or game',
  intentionallyNotClaimed: 'No equivalence claimed',
})

export const ACTIVITY_EQUIVALENCE_CALIBRATION = 'Uncalibrated qualitative mapping: it records implemented capability overlap, not comparative efficacy, learner mastery, or CEFR attainment.'

const ref = (registry, id) => ({ registry, id })
const train = (id) => ref('train-family', id)
const phrase = (skill, id) => ref('phrase-stage', `${skill}:${id}`)
const preparation = (id) => ref('cefr-preparation-mechanic', id)
const capstone = (id) => ref('cefr-capstone-family', id)
const aspect = (id) => ref('word-learning-aspect', id)

// These are capability equivalences, not screen-by-screen clones. A composed
// result deliberately points at several real mechanics when no single card
// should carry the whole learning burden.
export const LEARNING_ACTIVITY_EQUIVALENCE_CLAIMS = deepFreeze([
  {
    id: 'lexical-recognition', label: 'Recognise a newly introduced word or meaning',
    level: 'direct', sourceIds: ['courseOverview'],
    refs: [train('word-meaning'), aspect('lexical-meaning-recognition')],
    note: 'Saving performs the guided pairing; Train begins with independent Albanian-to-meaning recognition.',
  },
  {
    id: 'retrieval-flashcards', label: 'Retrieve a word instead of merely recognising it',
    level: 'composed', sourceIds: ['writing', 'speaking'],
    refs: [train('word-construction'), train('word-spelling'), aspect('controlled-lemma-retrieval'), aspect('orthographic-construction')],
    note: 'Controlled selection, construction and typed recall provide graduated retrieval without adding a detached flashcard mode.',
  },
  {
    id: 'meaning-matching', label: 'Match Albanian with meanings',
    level: 'direct', sourceIds: ['courseOverview', 'listening'],
    refs: [train('word-matching'), phrase('matching', 'guided-matching'), phrase('matching', 'independent-matching')],
    note: 'Saved-word boards mix one easier anchor with harder retained items; phrase boards have their own evidence track.',
  },
  {
    id: 'word-bank-ordering', label: 'Build a sentence by ordering word tiles',
    level: 'direct', sourceIds: ['courseOverview', 'writing'],
    refs: [train('everyday-phrase'), phrase('production', 'whole-arrangement'), preparation('a1-phrase-composition')],
    note: 'The phrase ladder uses plausible distractors before independent writing.',
  },
  {
    id: 'focused-cloze', label: 'Choose or supply a missing word in context',
    level: 'direct', sourceIds: ['writing', 'immersion'],
    refs: [train('word-context'), train('word-forms'), phrase('production', 'focused-cloze')],
    note: 'The target is explicit, and valid alternative answers may not be used as distractors.',
  },
  {
    id: 'typed-recall', label: 'Type a missing word or a complete sentence',
    level: 'direct', sourceIds: ['courseOverview', 'writing'],
    refs: [train('word-spelling'), phrase('production', 'focus-spelling'), phrase('production', 'independent-production'), phrase('production', 'strict-retention')],
    note: 'Word spelling precedes whole-phrase production; strict recall is independently spaced.',
  },
  {
    id: 'scaffolded-listening', label: 'Move from supported listening to audio without an answer transcript',
    level: 'principledAlternative', sourceIds: ['listening'],
    refs: [phrase('listening', 'guided-listening'), phrase('listening', 'independent-listening'), preparation('a1-audio-meaning')],
    note: 'Continuous phrase MP3s and staged evidence replace runtime speech synthesis; English answers stay hidden.',
  },
  {
    id: 'listen-select-arrange', label: 'Select or arrange words heard in continuous audio',
    level: 'direct', sourceIds: ['listening', 'audioNarrative'],
    refs: [preparation('a1-audio-construction'), preparation('a1-focused-dictation'), phrase('listening', 'guided-listening')],
    note: 'The game uses the heard words to reconstruct meaning or order rather than cloning a standalone audio tile screen.',
  },
  {
    id: 'continuous-dictation', label: 'Write language heard in a complete utterance',
    level: 'direct', sourceIds: ['listening', 'writing'],
    refs: [preparation('a1-focused-dictation'), preparation('a2-delayed-audio-reconstruction')],
    note: 'A1 types one focus from continuous speech; A2 reconstructs after the source is removed.',
  },
  {
    id: 'prompted-speaking', label: 'Repeat, rehearse and produce complete speech aloud',
    level: 'composed', sourceIds: ['speaking'],
    refs: [preparation('a1-record-replay'), preparation('a2-record-replay'), preparation('a2-faded-retelling'), capstone('a1-spoken-portrait'), capstone('a2-spoken-portrait')],
    note: 'Local record/replay supports rehearsal; held-out spoken tasks keep pronunciation self-review distinct from completion.',
  },
  {
    id: 'dialogue-response', label: 'Choose, repair and produce a relevant conversational reply',
    level: 'composed', sourceIds: ['courseOverview', 'speaking', 'immersion'],
    refs: [
      preparation('a1-choice-dialogue'), preparation('a1-multiple-replies'), preparation('a1-conversation-repair'),
      preparation('a2-branching-repair'), preparation('a2-communication-strategies'), preparation('a2-register-pragmatics'),
      preparation('a2-multiple-replies'), preparation('a2-message-replies'), capstone('a2-live-dialogue'),
    ],
    note: 'The response is embedded in a relationship or practical information gap and accepts multiple valid replies where appropriate.',
  },
  {
    id: 'story-comprehension', label: 'Read or hear a narrative and answer meaning questions',
    level: 'principledAlternative', sourceIds: ['stories', 'variedReading', 'audioNarrative'],
    refs: [
      preparation('a1-read-and-act'), preparation('a2-gist-detail'), preparation('a2-scan-information'),
      preparation('a2-main-point-relay'), capstone('a2-unseen-reading'), capstone('a2-unseen-listening'),
    ],
    note: 'Comprehension changes an action, relay or route inside the lore world instead of interrupting a detached story with generic checks.',
  },
  {
    id: 'target-language-immersion', label: 'Understand and respond through Albanian rather than a displayed translation',
    level: 'composed', sourceIds: ['immersion'],
    refs: [
      preparation('a2-slot-recombination'), preparation('a2-meaning-switch-forms'),
      preparation('a2-temporal-sequencing'), preparation('a2-connector-links'),
    ],
    note: 'Meaning, form, time and connectors are recombined through Albanian task material; fluent English remains editorial metadata.',
  },
  {
    id: 'interactive-world-task', label: 'Use language to complete a practical task in a navigable world',
    level: 'principledAlternative', sourceIds: ['interactiveWorld'],
    refs: [
      preparation('a1-scan-relay'), preparation('a2-scan-information'), preparation('a2-main-point-relay'),
      capstone('a1-simple-relay'), capstone('a2-practical-relay'),
    ],
    note: 'The open-world quest and state systems are the primary activity surface; language controls real information, movement and relationships.',
  },
  {
    id: 'adaptive-personalisation', label: 'Choose review from the learner’s current evidence and errors',
    level: 'principledAlternative', sourceIds: ['courseOverview', 'teachingMethod'],
    refs: [
      ref('train-policy', 'question-mix'), aspect('lexical-meaning-recognition'), aspect('grammatical-form-recognition'),
      aspect('controlled-lemma-retrieval'), aspect('contextual-form-selection'), aspect('reviewed-ending-recall'), aspect('contextual-meaning-inference'),
      aspect('orthographic-construction'), aspect('contextual-written-recall'), aspect('spaced-exact-recall'),
    ],
    note: 'Independent per-word aspects, disjoint rounds, targeted remediation and elapsed spacing drive selection; no single global learner level substitutes for evidence.',
  },
  {
    id: 'extended-writing', label: 'Reconstruct replies and build connected writing',
    level: 'composed', sourceIds: ['writing', 'variedReading'],
    refs: [preparation('a1-phrase-composition'), preparation('a2-message-replies'), preparation('a2-paragraph-assembly'), capstone('a2-written-exchange'), capstone('a2-free-writing')],
    note: 'Supported composition leads to held-out messages and connected writing with a revision loop.',
  },
  {
    id: 'grammar-patterns', label: 'Notice a form, identify its job, then use it in meaning',
    level: 'composed', sourceIds: ['teachingMethod'],
    refs: [
      train('word-forms'), train('noun-correction'), preparation('a1-slot-recombination'),
      preparation('a2-meaning-switch-forms'), preparation('a2-register-pragmatics'),
      preparation('a2-temporal-sequencing'), preparation('a2-connector-links'),
    ],
    note: 'One reviewed-form card identifies meaning and job, then uses separate per-form evidence for exact ending choice and ending typing before whole-form spelling; a transferable correction sheet follows a miss.',
  },
  {
    id: 'audio-narrative', label: 'Follow a continuous audio story for point, detail and retelling',
    level: 'composed', sourceIds: ['audioNarrative', 'stories'],
    refs: [preparation('a2-gist-detail'), preparation('a2-delayed-audio-reconstruction'), preparation('a2-faded-retelling'), preparation('a2-main-point-relay')],
    note: 'The sequence separates gist, detail, source-removed reconstruction and retelling instead of treating a play click as listening evidence.',
  },
  {
    id: 'open-conversation', label: 'Sustain guided and less-supported spoken interaction',
    level: 'principledAlternative', sourceIds: ['speaking', 'interactiveWorld'],
    refs: [preparation('a2-branching-repair'), preparation('a2-communication-strategies'), preparation('a2-record-replay'), capstone('a1-live-dialogue'), capstone('a2-live-dialogue')],
    note: 'World-bound dialogue, repair and held-out multi-turn recordings are used without pretending deterministic text checks can certify free speech.',
  },
  {
    id: 'sound-spelling-pronunciation', label: 'Connect sound, spelling and spoken rehearsal',
    level: 'principledAlternative', sourceIds: ['listening', 'speaking'],
    refs: [
      train('word-audio-construction'), train('word-audio-spelling'),
      aspect('auditory-form-construction'), aspect('auditory-typed-recall'),
      preparation('a1-focused-dictation'), preparation('a1-record-replay'), preparation('a2-record-replay'),
    ],
    note: 'Recorded whole-word MP3 tile construction and later typed transcription establish an auditory spelling path; focused phrase dictation and local record/replay extend it. The game deliberately does not invent an automated pronunciation score.',
  },
  {
    id: 'demonstrative-gender-bundle', label: 'Retrieve a noun together with its gender-marked demonstrative',
    level: 'direct', sourceIds: ['teachingMethod', 'writing'],
    refs: [train('word-meaning'), train('word-forms'), aspect('demonstrative-noun-agreement')],
    note: 'The first controlled-retrieval attempt uses one reviewed ky/kjo+noun choice without claiming grammar evidence; a later independently scored aspect splits the demonstrative and noun decisions.',
  },
  {
    id: 'adjective-linking-article-agreement', label: 'Choose adjective agreement and its Albanian linking article in a noun phrase',
    level: 'direct', sourceIds: ['teachingMethod', 'immersion'],
    refs: [train('word-forms'), aspect('adjective-linking-article-agreement')],
    note: 'One staged card first identifies the noun in an Albanian phrase such as “libri i mirë”, then removes and tests i/e; the intermediate meaning choice records no evidence.',
  },
  {
    id: 'paired-form-meaning-contrast', label: 'Contrast forms such as a village, the village and villages before spelling',
    level: 'direct', sourceIds: ['teachingMethod'],
    refs: [train('word-forms'), aspect('grammatical-form-recognition')],
    note: 'The shared staged form card identifies the marked Albanian form from English-only meanings, then asks for that same visible form’s grammatical job; the separate ending activities later test selecting or producing the exact inflected surface.',
  },
  {
    id: 'grammatical-form-odd-one-out', label: 'Find the noun form that differs in number or definiteness',
    level: 'direct', sourceIds: ['teachingMethod'],
    refs: [train('word-forms'), aspect('grammatical-form-odd-one-out')],
    note: 'After exact form recognition, one reviewed-paradigm card presents three unambiguous surfaces sharing number or definiteness and one opposite surface. Syncretic surfaces spanning both categories are excluded rather than marked wrong.',
  },
  {
    id: 'ending-before-whole-spelling', label: 'Select or type the inflectional ending before spelling the complete form',
    level: 'direct', sourceIds: ['writing', 'teachingMethod'],
    refs: [train('word-forms'), aspect('contextual-form-selection'), aspect('reviewed-ending-recall')],
    note: 'For nouns with an exact reviewed common-stem split, Train first chooses and then types only the required ending in an Albanian context. Each form has independent evidence, and the path precedes complete-form construction without guessing a paradigm.',
  },
  {
    id: 'audio-written-meaning-match', label: 'Match continuous Albanian audio to a written word or meaning',
    level: 'direct', sourceIds: ['listening', 'audioNarrative'],
    refs: [train('word-audio-recognition'), aspect('auditory-surface-recognition'), aspect('auditory-meaning-recognition')],
    note: 'A shared audio-only family first matches a complete word MP3 to its written Albanian form, then to its meaning. Every option is a saved reviewed sense and evidence requires completed playback.',
  },
  {
    id: 'albanian-sound-contrast', label: 'Discriminate reviewed Albanian sound contrasts in real words',
    level: 'direct', sourceIds: ['listening', 'speaking'],
    refs: [train('word-audio-recognition'), aspect('auditory-surface-discrimination')],
    note: 'After one general sound-to-spelling proof, a saved reviewed real-word pair narrows the next MP3-only choice to an explicit Albanian sound contrast. No synthetic speech or invented near-spelling is used.',
  },
  {
    id: 'multi-gap-agreement-cloze', label: 'Complete two linked agreement decisions in one Albanian context',
    level: 'direct', sourceIds: ['writing', 'immersion'],
    refs: [train('word-forms'), aspect('linked-noun-agreement-cloze')],
    note: 'After ky/kjo and i/e are independently proven, one staged Albanian-only card completes both gaps around the same reviewed noun; no intermediate phase awards evidence.',
  },
  {
    id: 'handwriting-or-script-tracing', label: 'Handwrite or trace a non-Latin writing system',
    level: 'notAppropriate', sourceIds: ['writing'], refs: [],
    note: 'Albanian uses the Latin alphabet. Accurate ë/ç, digraph recognition and typing are relevant; a script-tracing clone would add interface work without a matching Albanian learning need.',
  },
].map((claim) => ({ ...claim, calibration: ACTIVITY_EQUIVALENCE_CALIBRATION })))

const trainFamiliesById = Object.freeze(Object.fromEntries(
  Object.values(TRAIN_EXERCISE_FAMILIES).map((family) => [family.id, family]),
))
export function resolveLearningActivityReference(reference) {
  if (!reference) return null
  if (reference.registry === 'train-family') return trainFamiliesById[reference.id] || null
  if (reference.registry === 'train-policy' && reference.id === 'question-mix') return TRAIN_QUESTION_MIX_POLICY
  if (reference.registry === 'word-learning-aspect') return WORD_LEARNING_ASPECT_BY_ID[reference.id] || null
  if (reference.registry === 'cefr-preparation-mechanic') return CEFR_PREPARATION_MECHANICS[reference.id] || null
  if (reference.registry === 'cefr-capstone-family') return CEFR_CAPSTONE_TASK_FAMILIES[reference.id] || null
  if (reference.registry === 'phrase-stage') {
    const [skill, id] = reference.id.split(':')
    return PHRASE_STAGE_DEFINITIONS[skill]?.find((stage) => stage.id === id) || null
  }
  return null
}

export function learningActivityEquivalenceMatrix() {
  return LEARNING_ACTIVITY_EQUIVALENCE_CLAIMS.map((claim) => ({
    ...claim,
    sources: claim.sourceIds.map((id) => ACTIVITY_COVERAGE_SOURCES[id]).filter(Boolean),
    equivalents: claim.refs.map((reference) => ({
      reference,
      value: resolveLearningActivityReference(reference),
    })),
  }))
}

export function learningActivityProductionInventory() {
  return {
    trainFamilies: Object.values(TRAIN_EXERCISE_FAMILIES),
    phraseStages: Object.entries(PHRASE_STAGE_DEFINITIONS).flatMap(([skill, stages]) =>
      stages.map((stage) => ({ skill, stage }))),
    wordAspects: Object.values(WORD_LEARNING_ASPECT_BY_ID),
    preparationMechanics: Object.values(CEFR_PREPARATION_MECHANICS),
    preparationActivities: CEFR_PREPARATION_ACTIVITIES,
    capstoneFamilies: Object.entries(CEFR_CAPSTONE_TASK_FAMILIES).map(([id, family]) => ({ id, ...family })),
  }
}
