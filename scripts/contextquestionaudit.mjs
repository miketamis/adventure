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
import { trainCompletionPhrases } from '../src/game/trainCompletion.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import {
  WORD_CONTEXT_LATE_PROOF,
  advanceWordProgress,
} from '../src/game/wordProgression.js'

const lower = (value) => String(value || '').normalize('NFC').toLocaleLowerCase('sq')
const words = (value) => lower(value).match(/[\p{L}\p{M}]+/gu) || []
const sorted = (values) => [...values].sort()
const phraseById = Object.fromEntries(EVERYDAY_PHRASE_DRILLS.map((phrase) => [phrase.id, phrase]))
const sameSurfaceSiblingIds = (id) => Object.keys(DICT).filter((candidate) =>
  candidate !== id && lower(DICT[candidate]?.al) === lower(DICT[id]?.al),
)
const requiredContextIds = Object.keys(DICT).filter((id) => {
  if (!lexicalTrainability(id).trainable) return false
  const eligibility = reviewedContextEligibilityForSense(id)
  return eligibility.requiresReviewedContext
})
const allTrainableIds = Object.keys(DICT).filter((id) => lexicalTrainability(id).trainable)

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

  for (const [direction, rationales] of Object.entries(context.defensibleAlternativeRationales || {})) {
    assert.ok(['al2en', 'en2al'].includes(direction), `${id}: invalid defensible-alternative direction ${direction}`)
    for (const [candidateId, rationale] of Object.entries(rationales)) {
      assert.ok(DICT[candidateId], `${id}: unknown defensible alternative ${candidateId}`)
      assert.ok(rationale.length >= 24, `${id}/${direction}/${candidateId}: alternative rationale is not substantive`)
      const distractors = direction === 'al2en' ? context.distractorIds : context.retrieval.distractorIds
      assert.ok(!distractors.includes(candidateId), `${id}/${direction}: defensible ${candidateId} is still scored wrong`)
    }
  }

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

let emittedQuestionCount = 0
const poProgressContextSources = new Set()

// A distractor must be wrong in the exact displayed utterance, not merely a
// less-preferred translation. Both “po ti?” and “dhe ti?” are natural ways to
// return the question, so “dhe”/“edhe” may never be scored as wrong here.
assert.deepEqual(DICT.po_turn.ctx.retrieval.distractorIds, ['sepse', 'kur', 'ku'])
assert.ok(!DICT.po_turn.ctx.retrieval.distractorIds.some((id) => ['dhe', 'edhe', 'por'].includes(id)),
  'po_turn: a grammatical conversational alternative is being used as a false distractor')

for (const id of requiredContextIds) {
  let progress = null
  let round = 0
  const emitted = []
  const baseProgressionOptions = wordProgressionOptionsForSense(id)
  // This loop certifies every late context variant, rather than simulating a
  // one-word cold start. Keep a full saved option bank so the intervening
  // aspect-driven recognition and retrieval questions can form valid banks;
  // separate scheduler audits pin the known-word gates used in ordinary play.
  const discoveredIds = [...new Set([id, ...allTrainableIds,
    ...(DICT[id].ctx.requires || []),
    ...(DICT[id].ctx.variants || []).flatMap(({ requires = [] }) => requires),
    ...(baseProgressionOptions.reviewedForms || []).flatMap(({ context }) => context?.requires || []),
  ])]
  const progressionOptions = { ...baseProgressionOptions, discoveredIds }
  assert.equal(progressionOptions.trainability.trainable, true, `${id}: reviewed sense stayed excluded from Train`)

  for (let attempt = 0; attempt < 40; attempt++) {
    const question = buildWordQuestion({
      discoveredIds,
      targetId: id,
      wordProgress: { [id]: progress },
      currentRound: round,
      rng: () => 0.314159,
    })
    assert.ok(question, `${id}: progression stopped before its independent context proof`)
    if (question.kind === 'ctx') {
      emitted.push(question)
      emittedQuestionCount += 1
      assert.equal(question.answerId, id)
      const source = question.contextPhraseId ? phraseById[question.contextPhraseId] : DICT[id].ctx
      assert.equal(question.ctx.authoredAl, source.al)
      assert.deepEqual(trainCompletionPhrases(question), [source.al], `${id}: completion must read the whole authored context`)
      assert.equal(question.ctx.authoredEn, question.contextPhraseId
        ? DICT[id].ctx.variants.find(({ phraseId }) => phraseId === question.contextPhraseId).en
        : source.en)
      if (id === 'po_prog') poProgressContextSources.add(question.contextSourceId)
      assert.equal(question.ctx.targetTokenIndices.length, 1,
        `${id}/${question.variantId}: contextual question does not identify exactly one target`)
      assert.equal(question.targetReference?.valid, true,
        `${id}/${question.variantId}: contextual target reference is invalid`)
      assert.ok(['visual-mark', 'named-and-marked-surface', 'single-gap'].includes(question.targetReference.referenceMode),
        `${id}/${question.variantId}: contextual target has no learner-visible reference mode`)
      if (question.promptProfile.contextPresentation === 'marked') {
        assert.equal(question.targetReference.referenceMode, 'visual-mark')
      }
      if (question.promptProfile.contextPresentation === 'named-marked') {
        assert.equal(question.targetReference.referenceMode, 'named-and-marked-surface')
        assert.ok(question.targetReference.instruction.includes(`“${question.ctx.target}”`),
          `${id}/${question.variantId}: named-and-marked prompt does not name its exact target`)
      }
      assert.notEqual(question.promptProfile.contextPresentation, 'unmarked',
        `${id}/${question.variantId}: the removed fake locate presentation was emitted`)
      assert.equal(question.options.length, question.dir === 'en2al' && emitted.length === 3 ? 2 : 4,
        `${id}/${question.variantId}: wrong real choice range`)
      assert.equal(new Set(Object.values(question.optionLabels)).size, question.options.length,
        `${id}/${question.variantId}: learner-visible options are not distinct`)
      for (const defensibleId of Object.keys(
        DICT[id].ctx.defensibleAlternativeRationales?.[question.dir] || {},
      )) {
        assert.ok(!question.options.includes(defensibleId),
          `${id}/${question.variantId}: defensible alternative ${defensibleId} escaped into the live bank`)
      }

      if (question.dir === 'al2en') {
        assert.equal(question.promptProfile.showEnglishContext, false,
          `${id}/${question.variantId}: English grammar or translation gives away the answer`)
        for (const siblingId of sameSurfaceSiblingIds(id)) {
          assert.ok(question.options.includes(siblingId), `${id}/${question.variantId}: same-spelling sense ${siblingId} is missing`)
        }
      } else {
        assert.equal(question.targetReference.referenceMode, 'single-gap')
        assert.equal(question.ctx.al.split('__').length - 1, 1,
          `${id}/${question.variantId}: retrieval surface does not contain exactly one gap`)
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
      aspectTargets: question.aspectTargets,
      audioCompleted: question.requiresCompletedAudio ? true : undefined,
      questionKey: `context-question-audit:${id}:${attempt}`,
      round: round + 1,
    }, progressionOptions)
    assert.equal(advanced.accepted, true, `${id}: ${advanced.reason}`)
    progress = advanced.progress
    round = Math.max(round + 1, progress.dueAfterRound)
  }

  const emittedVariants = emitted.map(({ variantId }) => variantId)
  assert.deepEqual(emittedVariants.slice(0, 2), ['marked-context-recognition', 'marked-context-recognition'])
  assert.ok(emittedVariants.includes('mirrored-controlled-retrieval'), `${id}: controlled context retrieval never appeared`)
  assert.equal(emittedVariants.at(-1), WORD_CONTEXT_LATE_PROOF, `${id}: independent context inference never appeared`)
  assert.equal(emitted.filter(({ dir }) => dir === 'al2en').length, 3)
  assert.ok(emitted.filter(({ dir }) => dir === 'en2al').length >= 1)
  assert.ok(emitted.every(({ promptProfile }) => promptProfile.targetKind === practiceTargetKind(id)))
  if (practiceTargetKind(id) === PRACTICE_TARGET_KIND.function) {
    assert.ok(emitted.every(({ promptProfile }) => promptProfile.targetKind === PRACTICE_TARGET_KIND.function))
  }
}

assert.ok(emittedQuestionCount >= requiredContextIds.length * 4)
for (const id of requiredContextIds.filter((senseId) => practiceTargetKind(senseId) === PRACTICE_TARGET_KIND.function)) {
  const context = DICT[id].ctx
  const variants = context.variants || [context]
  for (const variant of variants) {
    assert.ok(Array.isArray(variant.requires) && variant.requires.length > 0,
      `${id}/${variant.id || 'default'}: grammatical context has no explicit known-word prerequisites`)
    for (const requiredId of variant.requires) assert.ok(DICT[requiredId], `${id}: unknown prerequisite ${requiredId}`)
  }
}
assert.ok(DICT.po_prog.ctx.variants.length >= 6, 'po progressive has too few reviewed everyday situations')
assert.ok(poProgressContextSources.size >= 3, 'po progressive repeated one sentence through its learning ladder')
assert.equal(buildWordQuestion({
  discoveredIds: ['po_prog', 'bie'], targetId: 'po_prog', currentRound: 0, rng: () => 0,
}), null, 'Po bie shi was scheduled before shi was saved')
const forcedActionContext = buildWordQuestion({
  discoveredIds: ['me'],
  targetId: 'me',
  currentRound: 0,
  allowEarlyDueForGoal: true,
  rng: () => 0,
})
assert.equal(forcedActionContext?.ctx?.authoredAl, DICT.me.ctx.al,
  'a missing visible-action token could not use its reviewed context when its support words were unsaved')
assert.equal(forcedActionContext?.kind, 'ctx')
const rainContext = buildWordQuestion({
  discoveredIds: ['po_prog', 'bie', 'shi'], targetId: 'po_prog', currentRound: 0, rng: () => 0,
})
assert.equal(rainContext?.contextPhraseId, 'raining-now')
assert.deepEqual(DICT.po_prog.ctx.variants.find(({ phraseId }) => phraseId === 'raining-now').requires,
  phraseById['raining-now'].requires,
  'grammar context prerequisites drifted from the phrase system')
assert.deepEqual(DICT.po_but.ctx.retrieval.distractorIds, ['sepse', 'prandaj', 'ose'])
assert.deepEqual(DICT.e_conj.ctx.retrieval.distractorIds, ['me', 'ose', 'pa'])
assert.deepEqual(DICT.se.ctx.retrieval.distractorIds, ['sepse', 'nese', 'kur'])
assert.deepEqual(DICT.para_money.ctx.retrieval.distractorIds, ['uje', 'kripe', 'kohe'])
assert.deepEqual(DICT.ndersa.ctx.retrieval.distractorIds, ['sepse', 'prandaj', 'ose'])
assert.deepEqual(DICT.ne.ctx.retrieval.distractorIds, ['nen', 'prane', 'pas'])
console.log(`✓ ${requiredContextIds.length} required senses and ${emittedQuestionCount} real context-question states are natural, reviewed, disambiguating and fail-closed.`)
