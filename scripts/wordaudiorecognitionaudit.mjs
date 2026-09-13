import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { audioSlug } from '../src/game/audio.js'
import { wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { learningActivityEquivalenceMatrix } from '../src/game/learningActivityCoverage.js'
import { TRAIN_EXERCISE_EXAMPLES } from '../src/game/trainingExampleRegistry.js'
import { TRAIN_EXERCISE_FAMILIES } from '../src/game/trainingProgression.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import {
  WORD_ASPECT_REGISTRY_VERSION,
  advanceWordProgress,
  normalizeWordProgress,
} from '../src/game/wordProgression.js'

// Use a non-inflecting target so this focused audit reaches the auditory
// aspects without bypassing the earlier reviewed-form aspect that nouns own.
const targetId = 'ketu'
const discoveredIds = ['ketu', 'tani', 'brenda', 'larg', 'aty']
const lexicalProof = {
  wins: 2,
  attempts: 2,
  correctAttempts: 2,
  dueAfterRound: 0,
  lastAttemptKey: 'audio-recognition-foundation',
  lastAttemptRound: 0,
  temporal: {},
}
let progress = normalizeWordProgress({
  aspectRegistryVersion: WORD_ASPECT_REGISTRY_VERSION,
  aspectProofs: { 'lemma|lexical-meaning-recognition': lexicalProof },
})
const progressionOptions = wordProgressionOptionsForSense(targetId)

const build = (round) => buildWordQuestion({
  discoveredIds,
  targetId,
  wordProgress: { [targetId]: progress },
  currentRound: round,
  rng: () => 0.271828,
  debugTrace: true,
})

let question = build(1)
assert.equal(question.wordStageId, 'auditory-surface-recognition')
assert.equal(question.familyId, TRAIN_EXERCISE_FAMILIES.wordAudioRecognition.id)
assert.equal(question.kind, TRAIN_EXERCISE_FAMILIES.wordAudioRecognition.kind)
assert.equal(question.variantId, 'audio-to-written-word')
assert.equal(question.stimulusMode, 'audio-only')
assert.equal(question.requiresCompletedAudio, true)
assert.equal(question.field, 'al')
assert.equal(question.promptText, undefined)
assert.equal(question.options.length, 4)
assert.ok(question.options.every((id) => discoveredIds.includes(id)), 'an unsaved answer option entered audio recognition')
assert.ok(existsSync(`public/audio/${audioSlug(question.audioSurface)}.mp3`), 'the target has no complete-word MP3')
assert.equal(question.debugSelection.build.audioRequired, true)

const rejected = advanceWordProgress(progress, 1, {
  correct: true,
  stageId: question.wordStageId,
  tier: question.tier,
  mode: question.mode,
  direction: question.dir,
  variantId: question.variantId,
  targetFormKey: null,
  aspectTargets: question.aspectTargets,
  questionKey: 'audio-surface-without-completion',
  round: 2,
}, progressionOptions)
assert.equal(rejected.accepted, false, 'a click without completed audio wrote listening evidence')

const accepted = advanceWordProgress(progress, 1, {
  correct: true,
  stageId: question.wordStageId,
  tier: question.tier,
  mode: question.mode,
  direction: question.dir,
  variantId: question.variantId,
  targetFormKey: null,
  aspectTargets: question.aspectTargets,
  audioCompleted: true,
  questionKey: 'audio-surface-completed',
  round: 2,
}, progressionOptions)
assert.equal(accepted.accepted, true)
assert.equal(accepted.progress.aspectProofs['lemma|auditory-surface-recognition'].wins, 1)
progress = accepted.progress

question = build(3)
assert.equal(question.wordStageId, 'auditory-surface-discrimination')
assert.equal(question.variantId, 'audio-surface-discrimination')
assert.equal(question.audioRecognitionSubvariantId, 'saved-word-audio-choice')
const secondSurface = advanceWordProgress(progress, 3, {
  correct: true,
  stageId: question.wordStageId,
  tier: question.tier,
  mode: question.mode,
  direction: question.dir,
  variantId: question.variantId,
  targetFormKey: null,
  aspectTargets: question.aspectTargets,
  audioCompleted: true,
  questionKey: 'audio-surface-second-completed',
  round: 4,
}, progressionOptions)
assert.equal(secondSurface.accepted, true)
assert.equal(secondSurface.progress.aspectProofs['lemma|auditory-surface-discrimination'].wins, 1)
progress = secondSurface.progress

question = build(5)
assert.equal(question.wordStageId, 'auditory-meaning-recognition')
assert.equal(question.variantId, 'audio-to-word-meaning')
assert.equal(question.stimulusMode, 'audio-only')
assert.equal(question.requiresCompletedAudio, true)
assert.equal(question.field, 'en')
assert.equal(question.options.length, 4)
assert.ok(question.options.every((id) => discoveredIds.includes(id)))

const claim = learningActivityEquivalenceMatrix().find(({ id }) => id === 'audio-written-meaning-match')
assert.equal(claim.level, 'direct')
assert.ok(claim.equivalents.every(({ value }) => value), 'coverage points at a non-production registry row')
for (const id of [
  'auditory-surface-recognition', 'audio-to-written-word',
  'auditory-surface-discrimination', 'audio-surface-discrimination',
  'reviewed-sound-contrast',
  'auditory-meaning-recognition', 'audio-to-word-meaning',
]) assert.ok(TRAIN_EXERCISE_EXAMPLES[id], `Debug Learning lacks ${id}`)

const practiceSource = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
assert.match(practiceSource, /q\.stimulusMode === 'audio-only'/)
assert.match(practiceSource, /q\.requiresCompletedAudio && !wordAudioCompleted/)
assert.match(practiceSource, /audioCompleted: q\.requiresCompletedAudio \? wordAudioCompleted : undefined/)
const audioSource = readFileSync(new URL('../src/game/audio.js', import.meta.url), 'utf8')
assert.doesNotMatch(audioSource, /speechSynthesis|SpeechSynthesisUtterance/)

console.log('✓ complete-word MP3 recognition progresses from written Albanian matching to meaning, with saved options and completion-gated listening evidence.')
