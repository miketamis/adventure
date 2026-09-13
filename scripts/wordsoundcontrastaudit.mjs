import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { audioSlug } from '../src/game/audio.js'
import { DICT } from '../src/game/content.js'
import { wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import {
  REVIEWED_WORD_SOUND_CONTRASTS,
  reviewedSoundContrastFor,
  validateReviewedWordSoundContrast,
} from '../src/game/wordSoundContrasts.js'
import { WORD_ASPECT_REGISTRY_VERSION, normalizeWordProgress } from '../src/game/wordProgression.js'

assert.ok(REVIEWED_WORD_SOUND_CONTRASTS.length >= 10, 'reviewed sound-contrast bank is too narrow')
for (const contrast of REVIEWED_WORD_SOUND_CONTRASTS) {
  assert.deepEqual(validateReviewedWordSoundContrast(contrast), [], `${contrast.id}: invalid reviewed sound contrast`)
  for (const senseId of contrast.senseIds) {
    assert.ok(existsSync(`public/audio/${audioSlug(DICT[senseId].al)}.mp3`), `${contrast.id}/${senseId}: missing complete-word MP3`)
  }
}

const targetId = 'ku'
const discoveredIds = ['caj', 'qaj', 'ku', 'kur', 'pyll', 'yll']
assert.equal(reviewedSoundContrastFor(targetId, ['ku']), null, 'an unsaved contrast partner entered Train')
assert.equal(reviewedSoundContrastFor(targetId, discoveredIds).partnerId, 'kur')

const progress = normalizeWordProgress({
  aspectRegistryVersion: WORD_ASPECT_REGISTRY_VERSION,
  aspectProofs: {
    'lemma|lexical-meaning-recognition': { wins: 2, attempts: 2, correctAttempts: 2 },
    'lemma|auditory-surface-recognition': { wins: 1, attempts: 1, correctAttempts: 1 },
  },
})
const question = buildWordQuestion({
  discoveredIds,
  targetId,
  wordProgress: { [targetId]: progress },
  currentRound: 4,
  rng: () => 0.271828,
  debugTrace: true,
})
assert.equal(question.wordStageId, 'auditory-surface-discrimination')
assert.equal(question.variantId, 'audio-surface-discrimination', 'the live reducer stage identity drifted for the contrast subvariant')
assert.equal(question.audioRecognitionSubvariantId, 'reviewed-sound-contrast')
assert.equal(question.soundContrast.id, 'ku-kur')
assert.deepEqual(new Set(question.options), new Set(['ku', 'kur']))
assert.ok(question.options.every((id) => discoveredIds.includes(id)))
assert.equal(question.requiresCompletedAudio, true)
assert.equal(question.stimulusMode, 'audio-only')
assert.match(question.distractorPolicy, /reviewed real-word contrast/)
assert.equal(question.debugSelection.build.soundContrastId, 'ku-kur')

const noPartnerQuestion = buildWordQuestion({
  discoveredIds: ['ku', 'caj', 'qaj', 'pyll'],
  targetId,
  wordProgress: { [targetId]: progress },
  currentRound: 4,
  rng: () => 0.271828,
})
assert.equal(noPartnerQuestion.audioRecognitionSubvariantId, 'saved-word-audio-choice')
assert.equal(noPartnerQuestion.options.length, 4, 'missing contrast partner did not fall back to the full saved-word activity')

const options = wordProgressionOptionsForSense(targetId)
assert.equal(options.trainability.trainable, true)

console.log(`✓ ${REVIEWED_WORD_SOUND_CONTRASTS.length} real-word MP3 contrasts use saved partners and fall back safely when a partner is unavailable.`)
