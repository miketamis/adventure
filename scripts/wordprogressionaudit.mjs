import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { DICT } from '../src/game/content.js'
import { audioSlug } from '../src/game/audio.js'
import {
  REVIEWED_CONTEXT_QUALITY,
  reviewedContextEligibilityForSense,
  reviewedFormTargets,
  wordProgressionOptionsForSense,
} from '../src/game/formInventory.js'
import { lexicalTrainability } from '../src/game/lexicalTrainability.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import {
  WORD_CAPABILITY_IDS,
  WORD_CONTEXT_EXERCISE_CONCEPT,
  WORD_CONTEXT_LATE_PROOF,
  WORD_CONTEXT_VARIANTS,
  WORD_PROGRESSION_POLICY,
  WORD_STAGE_DEFINITIONS,
  advanceWordProgress,
  migrateWordProgressV3,
  wordCapabilitySnapshot,
  wordContextAlignment,
} from '../src/game/wordProgression.js'

assert.deepEqual(WORD_STAGE_DEFINITIONS.map(({ id }) => id), [
  'meaning-recognition', 'controlled-lemma-retrieval', 'reviewed-form-contrast',
  'contextual-form-selection', 'word-form-construction', 'contextual-typed-recall',
  'strict-spaced-recall',
])
assert.equal(WORD_PROGRESSION_POLICY.productionBeginsAt, 'word-form-construction')
assert.deepEqual(WORD_STAGE_DEFINITIONS[1].variants.map(({ id }) => id), [
  'controlled-retrieval-two-choice', 'controlled-retrieval-four-choice',
])
assert.ok(WORD_STAGE_DEFINITIONS.slice(0, 4).every(({ evidenceTrack }) => evidenceTrack !== 'production'))
assert.ok(WORD_STAGE_DEFINITIONS.slice(4).every(({ evidenceTrack }) => evidenceTrack === 'production'))

const run = (id, { stopWhen, max = 30 } = {}) => {
  let progress = null
  let round = 0
  const seen = []
  const options = wordProgressionOptionsForSense(id)
  for (let index = 0; index < max; index++) {
    const question = buildWordQuestion({
      discoveredIds: [id], wordProgress: { [id]: progress }, currentRound: round, rng: () => 0.314,
    })
    assert.ok(question, `${id}: due progression returned no question`)
    seen.push(question)
    if (stopWhen?.(question, progress)) return { progress, round, seen, question }
    const result = advanceWordProgress(progress, round, {
      correct: true,
      stageId: question.wordStageId,
      tier: question.tier,
      mode: question.mode,
      direction: question.dir,
      variantId: question.variantId ?? null,
      targetFormKey: question.targetFormKey ?? null,
      questionKey: `word-progression-audit:${id}:${index}`,
      round: round + 1,
    }, options)
    assert.equal(result.accepted, true, `${id}: ${result.reason}`)
    progress = result.progress
    round = Math.max(round + 1, progress.dueAfterRound)
  }
  return { progress, round, seen }
}

const early = run('po_yes', { stopWhen: (question) => question.wordStageId === 'word-form-construction' })
assert.deepEqual(early.seen.slice(0, 5).map(({ variantId }) => variantId), [
  'marked-context-recognition', 'marked-context-recognition',
  'mirrored-controlled-retrieval', 'mirrored-controlled-retrieval', 'mirrored-controlled-retrieval',
])
assert.deepEqual(early.seen.slice(0, 5).map(({ options }) => options.length), [4, 4, 2, 4, 4])
assert.equal(early.question.variantId, WORD_CONTEXT_LATE_PROOF)
assert.equal(early.question.contextReview, true)
assert.equal(early.question.evidenceTrack, 'recognition')
const firstPo = early.seen[0]
assert.equal(firstPo.ctx.al, DICT.po_yes.ctx.al)
assert.equal(firstPo.ctx.en, DICT.po_yes.ctx.en)
assert.equal(firstPo.promptProfile.showEnglishContext, false,
  'English context solved Albanian-to-meaning recognition before the learner read Albanian')
assert.equal(new Set(Object.values(firstPo.optionLabels)).size, 4)
assert.ok(Object.values(firstPo.optionLabels).includes('confirms: yes'))
assert.equal(firstPo.audioSurface, DICT.po_yes.ctx.al)
assert.ok(existsSync(`public/audio/${audioSlug(firstPo.audioSurface)}.mp3`), 'po_yes exchange lacks continuous audio')

for (const [id, entry] of Object.entries(DICT).filter(([, value]) => value.ctx)) {
  const normalized = entry.ctx.al.toLocaleLowerCase('sq').replace(/[“”"'.!?:,;]/gu, '').trim()
  const focus = entry.ctx.focus.toLocaleLowerCase('sq')
  assert.notEqual(normalized, `ti thua ${focus}`, `${id}: context is only a “you say target” wrapper`)
  assert.notEqual(normalized, `ju thoni ${focus}`, `${id}: context is only a “you say target” wrapper`)
}

for (const [id] of Object.entries(DICT).filter(([senseId]) => lexicalTrainability(senseId).trainable)) {
  const eligibility = reviewedContextEligibilityForSense(id)
  if (!eligibility.requiresReviewedContext) continue
  assert.equal(eligibility.eligible, true, `${id}: ${eligibility.gaps.join('; ')}`)
  assert.equal(DICT[id].ctx.quality, REVIEWED_CONTEXT_QUALITY)
  assert.equal(wordProgressionOptionsForSense(id).trainability.trainable, true)
}

const rejectedWithoutReviewedContext = advanceWordProgress(null, 0, {
  correct: true,
  stageId: 'meaning-recognition',
  tier: 0,
  mode: 'choice',
  direction: 'al2en',
  variantId: 'four-choice-meaning',
  questionKey: 'forged-unreviewed-context',
  round: 1,
}, { trainability: { trainable: false, reason: 'context review required' } })
assert.equal(rejectedWithoutReviewedContext.accepted, false)
assert.equal(rejectedWithoutReviewedContext.reason, 'not-trainable')

const conceptIds = new Set(WORD_CONTEXT_VARIANTS.map(({ exerciseConceptId }) => exerciseConceptId))
assert.deepEqual([...conceptIds], [WORD_CONTEXT_EXERCISE_CONCEPT])
const ambiguous = { al: 'po, po', en: '__', focus: 'po' }
assert.equal(wordContextAlignment(ambiguous).reason, 'ambiguous-target')
const malformed = { al: 'ti thua po', en: 'you say yes', focus: 'po' }
assert.equal(wordContextAlignment(malformed).usable, false)

const nounOptions = wordProgressionOptionsForSense('fshat')
assert.equal(nounOptions.reviewedForms.length, reviewedFormTargets('fshat').length)
const nounSnapshot = wordCapabilitySnapshot(null, 0, nounOptions)
assert.equal(nounSnapshot.hasReviewedFormLane, true)
assert.deepEqual(Object.keys(nounSnapshot.capabilities), [...WORD_CAPABILITY_IDS])
const simpleSnapshot = wordCapabilitySnapshot(null, 0, wordProgressionOptionsForSense('po_prog'))
assert.equal(simpleSnapshot.hasReviewedFormLane, false)
assert.equal(simpleSnapshot.capabilities['reviewed-form-awareness'].status, 'inapplicable')
assert.equal(simpleSnapshot.capabilities['contextual-form-selection'].status, 'inapplicable')
assert.equal(simpleSnapshot.capabilities['word-form-construction'].status, 'pending')

const nameSnapshot = wordCapabilitySnapshot(null, 0, {
  ...wordProgressionOptionsForSense('elira'),
  trainability: lexicalTrainability('elira'),
})
assert.equal(nameSnapshot.currentStageId, null)
assert.ok(Object.values(nameSnapshot.capabilities).every(({ status }) => status === 'not-trainable'))

const migrated = migrateWordProgressV3({ wins: {
  'independent-word-recognition': 2,
  'guided-word-selection': 1,
  'independent-word-selection': 2,
  'supported-word-spelling': 1,
} }, 8)
assert.equal(migrated.wins['meaning-recognition'], 2)
assert.equal(migrated.wins['controlled-lemma-retrieval'], 3)
assert.equal(migrated.wins['word-form-construction'], undefined, 'old isolated spelling invented construction proof')
assert.deepEqual(migrated.formProofs, {}, 'old form totals invented exact form/role evidence')

for (const id of Object.keys(DICT).filter((senseId) => lexicalTrainability(senseId).trainable)) {
  const options = wordProgressionOptionsForSense(id)
  const snapshot = wordCapabilitySnapshot(null, 0, options)
  assert.deepEqual(Object.keys(snapshot.capabilities), [...WORD_CAPABILITY_IDS], `${id}: incomplete capability snapshot`)
}

console.log('✓ lexical registry, aligned context variants, conditional form capabilities, migration and trainability snapshots are coherent.')
