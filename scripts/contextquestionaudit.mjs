import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { DICT } from '../src/game/dictionary.js'
import { audioSlug } from '../src/game/audio.js'
import {
  REVIEWED_CONTEXT_QUALITY,
  reviewedContextEligibilityForSense,
  wordProgressionOptionsForSense,
} from '../src/game/formInventory.js'
import { lexicalTrainability } from '../src/game/lexicalTrainability.js'
import {
  PRACTICE_TARGET_KIND,
  contextualChoiceLabel,
  practiceTargetKind,
} from '../src/game/practiceContrasts.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import {
  WORD_CONTEXT_LATE_PROOF,
  advanceWordProgress,
} from '../src/game/wordProgression.js'

const lower = (value) => String(value || '').normalize('NFC').toLocaleLowerCase('sq')
const words = (value) => lower(value).match(/[\p{L}\p{M}]+/gu) || []
const sorted = (values) => [...values].sort()
const sameSurfaceSiblingIds = (id) => Object.keys(DICT).filter((candidate) =>
  candidate !== id && lower(DICT[candidate]?.al) === lower(DICT[id]?.al),
)
const requiredContextIds = Object.keys(DICT).filter((id) => {
  if (!lexicalTrainability(id).trainable) return false
  const eligibility = reviewedContextEligibilityForSense(id)
  return eligibility.requiresReviewedContext
})

assert.ok(requiredContextIds.length > 0, 'no context-dependent senses were audited')

for (const id of requiredContextIds) {
  const entry = DICT[id]
  const context = entry.ctx
  const eligibility = reviewedContextEligibilityForSense(id)
  assert.equal(eligibility.eligible, true, `${id}: ${eligibility.gaps.join('; ')}`)
  assert.equal(context.quality, REVIEWED_CONTEXT_QUALITY, `${id}: context is not explicitly reviewed`)
  assert.match(context.al, /[.!?]$/u, `${id}: Albanian context must be a complete punctuated utterance`)
  assert.match(context.retrieval.en, /[.!?]$/u, `${id}: retrieval cue must be a complete punctuated English utterance`)
  assert.equal(context.en.split('__').length - 1, 1, `${id}: English review line needs exactly one gap`)
  assert.equal(context.retrieval.en.includes('__'), false, `${id}: full retrieval cue still contains a gap`)
  assert.doesNotMatch(lower(context.al), /\b(?:ti thua|ju thoni|ti përgjigjesh|fjala është)\b/u,
    `${id}: meta-language wrapper is not a lived context`)

  assert.ok(['everyday-standard', 'epic-folk'].includes(context.register), `${id}: unreviewed language register`)
  assert.ok(Array.isArray(context.cueTokens) && context.cueTokens.length > 0, `${id}: no learner-visible cue tokens declared`)
  const alWords = words(context.al)
  for (const cue of context.cueTokens) {
    const cueWords = words(cue)
    assert.ok(cueWords.length > 0, `${id}: empty cue token`)
    assert.ok(cueWords.every((token) => alWords.includes(token)), `${id}: declared cue “${cue}” is absent from the Albanian line`)
    assert.notEqual(lower(cue), lower(context.focus), `${id}: target itself cannot be its disambiguating cue`)
  }
  assert.ok(typeof context.rationale === 'string' && context.rationale.length >= 24, `${id}: context rationale is not substantive`)

  const siblings = sameSurfaceSiblingIds(id)
  assert.deepEqual(sorted(context.contrastIds || []), sorted(siblings), `${id}: same-surface contrast coverage drifted`)
  assert.deepEqual(sorted(Object.keys(context.contrastRationales || {})), sorted(siblings), `${id}: sibling-specific rationale coverage drifted`)
  for (const siblingId of siblings) {
    assert.ok(context.contrastRationales[siblingId].length >= 24, `${id}: ${siblingId} contrast rationale is not substantive`)
  }

  if (entry.enAll?.includes('/')) {
    assert.ok(context.distractorLabels?.al2en?.[id], `${id}: broad dictionary gloss leaks into a sense-specific context answer`)
  }
  const answerLabel = context.distractorLabels?.al2en?.[id] || contextualChoiceLabel(id, entry.enAll ?? entry.en)
  assert.ok(answerLabel && !/^the$/iu.test(answerLabel), `${id}: context answer label is not sense-specific`)
  if (context.register === 'epic-folk') {
    assert.match(answerLabel, /folk|epic/iu, `${id}: a folk-only usage is presented as ordinary everyday language`)
  }
}

const expectedContextSequence = [
  'marked-context-recognition',
  'marked-context-recognition',
  'mirrored-controlled-retrieval',
  'mirrored-controlled-retrieval',
  'mirrored-controlled-retrieval',
  WORD_CONTEXT_LATE_PROOF,
]
let emittedQuestionCount = 0

for (const id of requiredContextIds) {
  let progress = null
  let round = 0
  const emitted = []
  const progressionOptions = wordProgressionOptionsForSense(id)
  assert.equal(progressionOptions.trainability.trainable, true, `${id}: reviewed sense stayed excluded from Train`)

  for (let attempt = 0; attempt < 40; attempt++) {
    const question = buildWordQuestion({
      discoveredIds: [id],
      wordProgress: { [id]: progress },
      currentRound: round,
      rng: () => 0.314159,
    })
    assert.ok(question, `${id}: progression stopped before its independent context proof`)
    if (question.kind === 'ctx') {
      emitted.push(question)
      emittedQuestionCount += 1
      assert.equal(question.answerId, id)
      assert.equal(question.ctx.authoredAl, DICT[id].ctx.al)
      assert.equal(question.ctx.authoredEn, DICT[id].ctx.en)
      assert.equal(question.options.length, question.dir === 'en2al' && emitted.length === 3 ? 2 : 4,
        `${id}/${question.variantId}: wrong real choice range`)
      assert.equal(new Set(Object.values(question.optionLabels)).size, question.options.length,
        `${id}/${question.variantId}: learner-visible options are not distinct`)

      if (question.dir === 'al2en') {
        assert.equal(question.promptProfile.showEnglishContext, false,
          `${id}/${question.variantId}: English grammar or translation gives away the answer`)
        for (const siblingId of sameSurfaceSiblingIds(id)) {
          assert.ok(question.options.includes(siblingId), `${id}/${question.variantId}: same-spelling sense ${siblingId} is missing`)
        }
      } else {
        const optionSurfaces = question.options.map((optionId) => lower(DICT[optionId].al))
        assert.equal(new Set(optionSurfaces).size, optionSurfaces.length,
          `${id}/${question.variantId}: Albanian retrieval contains duplicate written answers`)
      }
      if (question.audioSurface) {
        assert.equal(question.audioSurface, DICT[id].ctx.al)
        assert.ok(existsSync(`public/audio/${audioSlug(question.audioSurface)}.mp3`),
          `${id}: continuous context audio is missing`)
      }
      if (question.variantId === WORD_CONTEXT_LATE_PROOF) break
    }

    const advanced = advanceWordProgress(progress, round, {
      correct: true,
      stageId: question.wordStageId,
      tier: question.tier,
      mode: question.mode,
      direction: question.dir,
      variantId: question.variantId ?? null,
      targetFormKey: question.targetFormKey ?? null,
      questionKey: `context-question-audit:${id}:${attempt}`,
      round: round + 1,
    }, progressionOptions)
    assert.equal(advanced.accepted, true, `${id}: ${advanced.reason}`)
    progress = advanced.progress
    round = Math.max(round + 1, progress.dueAfterRound)
  }

  assert.deepEqual(emitted.map(({ variantId }) => variantId), expectedContextSequence,
    `${id}: not every production context variant was exercised`)
  assert.equal(emitted.filter(({ dir }) => dir === 'al2en').length, 3)
  assert.equal(emitted.filter(({ dir }) => dir === 'en2al').length, 3)
  assert.ok(emitted.every(({ promptProfile }) => promptProfile.targetKind === practiceTargetKind(id)))
  if (practiceTargetKind(id) === PRACTICE_TARGET_KIND.function) {
    assert.ok(emitted.every(({ promptProfile }) => promptProfile.targetKind === PRACTICE_TARGET_KIND.function))
  }
}

assert.equal(emittedQuestionCount, requiredContextIds.length * expectedContextSequence.length)
console.log(`✓ ${requiredContextIds.length} required senses and ${emittedQuestionCount} real context-question states are natural, reviewed, disambiguating and fail-closed.`)
