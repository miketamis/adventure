import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { DICT } from '../src/game/content.js'
import { audioSlug } from '../src/game/audio.js'
import { ALBANIAN_CONSTRUCTION_CHUNKS } from '../src/game/formPractice.js'
import { wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import {
  WORD_STAGE_DEFINITIONS,
  advanceWordProgress,
} from '../src/game/wordProgression.js'
import {
  wordSpellingAttempt,
  wordSpellingRepairMessage,
} from '../src/game/wordSpellingPolicy.js'

const stageById = Object.fromEntries(WORD_STAGE_DEFINITIONS.map((stage) => [stage.id, stage]))
const expectedStages = [
  ['auditory-word-construction', 'word-audio-construction', 'audio-letter-construction'],
  ['auditory-word-spelling', 'word-audio-spelling', 'audio-typed-spelling'],
]
for (const [stageId, familyId, variantId] of expectedStages) {
  const stage = stageById[stageId]
  assert.ok(stage, `${stageId}: missing production registry row`)
  assert.equal(stage.familyId, familyId)
  assert.equal(stage.variant?.id, variantId)
  assert.equal(stage.stimulusMode, 'audio-only')
  assert.equal(stage.requiresCompletedAudio, true)
  assert.equal(stage.answerTolerance, 'repair')
}

for (const chunk of ALBANIAN_CONSTRUCTION_CHUNKS) {
  assert.ok(existsSync(`public/audio/${audioSlug(chunk)}.mp3`), `${chunk}: recorded grapheme sound is missing`)
}

const id = 'tani'
const discoveredIds = [id, 'sot', 'dje', 'neser']
const options = wordProgressionOptionsForSense(id)
const maximumSetupSteps = WORD_STAGE_DEFINITIONS.reduce((sum, stage) => {
  if (Array.isArray(stage.variants)) {
    return sum + stage.variants.reduce((variantSum, variant) => variantSum + (variant.gateWins || 1), 0)
  }
  return sum + (stage.gate?.wins || 1)
}, 0) + WORD_STAGE_DEFINITIONS.length
let progress = null
let round = 0
const auditory = []
for (let step = 0; step < maximumSetupSteps && auditory.length < 2; step++) {
  const question = buildWordQuestion({
    discoveredIds, targetId: id, wordProgress: { [id]: progress }, currentRound: round, rng: () => 0.271,
  })
  if (!question) {
    round += 1
    continue
  }
  if (question.wordStageId.startsWith('auditory-word-')) auditory.push(question)
  const result = advanceWordProgress(progress, round, {
    correct: true,
    stageId: question.wordStageId,
    tier: question.tier,
    mode: question.mode,
    direction: question.dir,
    variantId: question.variantId,
    targetFormKey: question.targetFormKey,
    aspectTargets: question.aspectTargets,
    audioCompleted: question.requiresCompletedAudio ? true : undefined,
    questionKey: `auditory-spelling-audit:${step}`,
    round: round + 1,
  }, options)
  assert.equal(result.accepted, true, `${question.wordStageId}: ${result.reason}`)
  progress = result.progress
  round = Math.max(round + 1, progress.dueAfterRound)
}

assert.deepEqual(auditory.map(({ wordStageId }) => wordStageId), [
  'auditory-word-construction', 'auditory-word-spelling',
])
const [construction, spelling] = auditory
for (const question of auditory) {
  assert.equal(question.stimulusMode, 'audio-only')
  assert.equal(question.audioSurface, DICT[id].al)
  assert.equal(question.requiresCompletedAudio, true)
  assert.equal(question.targetReference.presentation, 'audio-only')
  assert.equal(question.typingCue, undefined, `${question.wordStageId}: English answer cue leaked`)
  assert.equal(question.context, undefined, `${question.wordStageId}: prompt/context answer leaked`)
  assert.ok(existsSync(`public/audio/${audioSlug(question.audioSurface)}.mp3`))
}
assert.ok(construction.construction.pieces.some(({ distractor }) => distractor), 'audio construction has no distractor chunks')
assert.equal(spelling.typingAnswer, DICT[id].al)

// Audio completion is a reducer-level evidence boundary, not merely a disabled
// button. A forged result cannot turn a play click or failed clip into proof.
const beforeAudio = (() => {
    // Recover the progress immediately before the first auditory question.
    let value = null
    let currentRound = 0
    for (let index = 0; index < maximumSetupSteps; index++) {
      const q = buildWordQuestion({ discoveredIds, targetId: id, wordProgress: { [id]: value }, currentRound, rng: () => 0.271 })
      if (!q) { currentRound += 1; continue }
      if (q.wordStageId === 'auditory-word-construction') return { value, currentRound, q }
      const next = advanceWordProgress(value, currentRound, {
        correct: true, stageId: q.wordStageId, tier: q.tier, mode: q.mode, direction: q.dir,
        variantId: q.variantId, targetFormKey: q.targetFormKey, aspectTargets: q.aspectTargets,
        audioCompleted: q.requiresCompletedAudio ? true : undefined,
        questionKey: `auditory-gate-setup:${index}`, round: currentRound + 1,
      }, options)
      assert.equal(next.accepted, true)
      value = next.progress
      currentRound = Math.max(currentRound + 1, value.dueAfterRound)
    }
    assert.fail('could not reach auditory construction')
  })()

const gateFixture = beforeAudio.value
const gateRound = beforeAudio.currentRound
const gateQuestion = beforeAudio.q
const forged = advanceWordProgress(gateFixture, gateRound, {
  correct: true, stageId: gateQuestion.wordStageId, tier: gateQuestion.tier, mode: gateQuestion.mode,
  direction: gateQuestion.dir, variantId: gateQuestion.variantId, targetFormKey: gateQuestion.targetFormKey,
  aspectTargets: gateQuestion.aspectTargets, questionKey: 'forged-without-finished-audio', round: gateRound + 1,
}, options)
assert.equal(forged.accepted, false)
assert.equal(forged.reason, 'plan-mismatch')

const close = wordSpellingAttempt('përshëndetë', 'përshëndetje', 'repair')
assert.equal(close.repairRequired, true)
assert.equal(close.correct, false)
assert.match(wordSpellingRepairMessage(close), /Change “ë” to “je”/)
assert.equal(wordSpellingAttempt('përshëndetë', 'përshëndetje', 'strict').repairRequired, false)
assert.equal(wordSpellingAttempt('përshëndetje', 'përshëndetje', 'repair').correct, true)

const practiceSource = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
assert.match(practiceSource, /await playPhrase\(q\.audioSurface\)/,
  'word stimulus does not await the complete generated MP3')
assert.match(practiceSource, /if \(piece\?\.text && piece\.text !== ' '\) playWord\(piece\.text\)/,
  'tapping a construction tile does not play its generated grapheme MP3')
assert.match(practiceSource, /if \(result\.repairRequired\)[\s\S]*?answerCommitted\.current = false[\s\S]*?return/,
  'near spelling does not remain on the same question for exact repair')

console.log('✓ recorded-word construction and typed spelling precede cue-led spelling, fail closed on missing playback, and repair near misses without false proof.')
