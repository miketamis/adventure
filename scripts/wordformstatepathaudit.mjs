// Independent end-to-end contract for the lexical/form ladder. This begins at
// a blank save, travels through the same question builder and reducer actions
// used by Train, and serializes after every turn. Pure registry assertions
// alone cannot catch a question that the UI can build but the reducer rejects.

import assert from 'node:assert/strict'
import { DICT } from '../src/game/content.js'
import {
  formTrackForSense,
  reviewedFormTargets,
} from '../src/game/formInventory.js'
import {
  newRun,
  normalizeSavedState,
  reducer,
} from '../src/game/gameState.js'
import { trainMissConsequence } from '../src/game/consequenceBuilders.js'
import { isTrainableSense, lexicalTrainability } from '../src/game/lexicalTrainability.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import {
  WORD_CONTEXT_LATE_PROOF,
  WORD_INITIAL_REVIEW_GAP,
  WORD_MIN_INTERVENING_ROUNDS,
  WORD_PROGRESSION_POLICY,
  WORD_STAGE_DEFINITIONS,
  wordProgressPlan,
} from '../src/game/wordProgression.js'

const EXPECTED_STAGE_ORDER = [
  'meaning-recognition',
  'controlled-lemma-retrieval',
  'reviewed-form-contrast',
  'contextual-form-selection',
  'word-form-construction',
  'contextual-typed-recall',
  'strict-spaced-recall',
]
const STAGE = Object.freeze(Object.fromEntries(WORD_STAGE_DEFINITIONS.map((definition) => [definition.id, definition])))
const lower = (value) => value.normalize('NFC').toLocaleLowerCase('sq')
const clone = (value) => JSON.parse(JSON.stringify(value))
let disjointSequence = 0

assert.deepEqual(WORD_STAGE_DEFINITIONS.map(({ id }) => id), EXPECTED_STAGE_ORDER)
assert.equal(WORD_PROGRESSION_POLICY.productionBeginsAt, 'word-form-construction')
for (const definition of WORD_STAGE_DEFINITIONS.slice(0, 4)) {
  assert.equal(definition.mode, 'choice', `${definition.id}: a selection stage is not a choice`)
  assert.notEqual(definition.evidenceTrack, 'production', `${definition.id}: selection is mislabeled as production`)
}
for (const definition of WORD_STAGE_DEFINITIONS.slice(4)) {
  assert.equal(definition.evidenceTrack, 'production', `${definition.id}: generative/typed work lacks production evidence`)
}
assert.deepEqual(
  STAGE['controlled-lemma-retrieval'].variants.map(({ distractors }) => distractors + 1),
  [2, 4],
  'controlled retrieval is not a two-choice then four-choice internal ramp',
)

const optionsFor = (id) => ({
  context: DICT[id].ctx,
  answerSurface: DICT[id].al,
  reviewedForms: reviewedFormTargets(id),
  trainability: lexicalTrainability(id),
})

const persisted = (state) => normalizeSavedState(clone(state), newRun())

const blankSavedWord = (id) => {
  const fresh = newRun()
  const state = reducer(fresh, { type: 'DISCOVER', id })
  assert.notStrictEqual(state, fresh, `${id}: blank-save discovery was rejected`)
  assert.equal(state.discovered[id], true, `${id}: discovery was not persisted`)
  assert.deepEqual(state.wordProgress[id]?.wins, {}, `${id}: saving invented Train wins`)
  return persisted(state)
}

const questionFor = (state, id, { excludeLast = true } = {}) => buildWordQuestion({
  discoveredIds: [id],
  mana: state.mana,
  wordProgress: state.wordProgress,
  currentRound: state.trainRound,
  excludeWords: excludeLast ? state.trainLastWords : [],
  rng: () => 0.271828,
})

const completeDisjointRound = (state) => persisted(reducer(state, {
  type: 'TRAIN_ROUND_COMPLETE',
  wordKeys: ['ujë'],
  questionKey: `word-form-state-audit:disjoint:${disjointSequence++}`,
}))

const nextDueQuestion = (startingState, id) => {
  let state = startingState
  for (let turn = 0; turn < 100; turn++) {
    const question = questionFor(state, id)
    if (question) return { state, question }
    const plan = wordProgressPlan(state.wordProgress[id], state.trainRound, optionsFor(id))
    const targetExcluded = (state.trainLastWords || []).some((word) =>
      lower(DICT[id].al).split(/\s+/u).includes(lower(word)),
    )
    assert.ok(!plan.due || targetExcluded,
      `${id}: ${plan.stageId}/${plan.variantId || plan.contextVariantId || 'base'} is due but builder returned null`)
    state = completeDisjointRound(state)
  }
  assert.fail(`${id}: no question became due after 100 disjoint rounds`)
}

const resultAction = (question, correct, overrides = {}) => ({
  type: 'PRACTICE_WORD_RESULT',
  correct,
  id: question.answerId,
  tier: question.tier,
  mode: question.mode,
  direction: question.dir,
  wordStageId: question.wordStageId,
  variantId: question.variantId ?? null,
  targetFormKey: question.targetFormKey ?? null,
  questionKey: question.questionKey,
  wordKeys: question.lexicalSurfaces || [DICT[question.answerId].al],
  ...(!correct ? {
    consequence: trainMissConsequence({
      source: question.targetFormKey ? 'train-form' : 'train-word',
      questionKey: question.questionKey,
      attemptedEn: 'audit miss',
      reasonCode: 'audit-word-miss',
      reason: 'The audit answer does not match this exact word question.',
      correctAl: question.surface || DICT[question.answerId].al,
      correctEn: DICT[question.answerId].en,
    }),
  } : {}),
  ...overrides,
})

const answerQuestion = (state, question, correct = true) => {
  const beforeRound = state.trainRound
  let next = reducer(state, resultAction(question, correct))
  assert.notStrictEqual(next, state,
    `${question.answerId}: reducer rejected ${question.wordStageId}/${question.variantId || 'base'}`)
  assert.equal(next.trainRound, beforeRound + 1, `${question.answerId}: accepted result did not complete one round`)
  assert.equal(next.mana[question.answerId] || 0, (state.mana[question.answerId] || 0) + (correct ? 1 : 0),
    `${question.answerId}: token reward did not match correctness`)
  if (!correct && next.pendingHeartConsequence) {
    next = reducer(next, {
      type: 'ACKNOWLEDGE_HEART_CONSEQUENCE',
      eventId: next.pendingHeartConsequence.eventId,
    })
  }
  const restored = persisted(next)
  assert.deepEqual(restored.wordProgress[question.answerId], next.wordProgress[question.answerId],
    `${question.answerId}: progress changed across save normalization`)
  assert.equal(questionFor(restored, question.answerId), null,
    `${question.answerId}: the same word was immediately scheduled again`)
  return restored
}

const reachQuestion = (startingState, id, predicate, maxAnswers = 180) => {
  let state = startingState
  const observed = []
  for (let index = 0; index < maxAnswers; index++) {
    const due = nextDueQuestion(state, id)
    state = due.state
    const question = due.question
    observed.push(question)
    if (predicate(question, state)) return { state, question, observed }
    state = answerQuestion(state, question)
  }
  assert.fail(`${id}: target question did not appear after ${maxAnswers} successful answers`)
}

// Non-inflecting path: saving supplies no independent proof, recognition starts
// with four choices, controlled Albanian retrieval expands 2 -> 4, then true
// construction precedes tolerant typing and delayed exact retention.
let simple = blankSavedWord('tani')
const simpleQuestions = []
for (let index = 0; index < 5; index++) {
  const due = nextDueQuestion(simple, 'tani')
  simple = due.state
  simpleQuestions.push(due.question)
  simple = answerQuestion(simple, due.question)
}
assert.deepEqual(simpleQuestions.map(({ wordStageId }) => wordStageId), [
  'meaning-recognition',
  'meaning-recognition',
  'controlled-lemma-retrieval',
  'controlled-lemma-retrieval',
  'controlled-lemma-retrieval',
])
assert.deepEqual(simpleQuestions.map(({ options }) => options.length), [4, 4, 2, 4, 4])
assert.deepEqual(simpleQuestions.map(({ variantId }) => variantId), [
  'four-choice-meaning',
  'four-choice-meaning',
  'controlled-retrieval-two-choice',
  'controlled-retrieval-four-choice',
  'controlled-retrieval-four-choice',
])

let due = nextDueQuestion(simple, 'tani')
simple = due.state
assert.equal(due.question.wordStageId, 'word-form-construction')
assert.equal(due.question.kind, 'word-construction')
assert.equal(due.question.targetReference?.valid, true)
assert.ok(due.question.targetReference.meaningCue)
assert.ok(due.question.construction.answerPieceIds.length >= 2, 'construction is not decomposed into learner-controlled pieces')
assert.ok(due.question.construction.pieces.some(({ distractor }) => distractor), 'construction has no distractor chunks')
const assembled = due.question.construction.answerPieceIds.map((pieceId) =>
  due.question.construction.pieces.find(({ id }) => id === pieceId)?.text || '',
).join('')
assert.equal(assembled, due.question.answerValue, 'construction tiles cannot assemble the exact answer')
simple = answerQuestion(simple, due.question)

due = nextDueQuestion(simple, 'tani')
simple = due.state
assert.equal(due.question.wordStageId, 'contextual-typed-recall')
assert.equal(due.question.kind, 'word-spelling')
assert.equal(due.question.answerTolerance, 'beginner')
assert.equal(due.question.targetReference?.valid, true)
assert.equal(due.question.targetReference.context, due.question.typingContext)
simple = answerQuestion(simple, due.question)
const typedRound = simple.trainRound

due = nextDueQuestion(simple, 'tani')
simple = due.state
assert.equal(due.question.wordStageId, 'strict-spaced-recall')
assert.equal(due.question.answerTolerance, 'strict')
assert.equal(due.question.targetReference?.valid, true)
assert.ok(simple.trainRound - typedRound >= WORD_INITIAL_REVIEW_GAP,
  'strict recall appeared before the initial retention interval')

// Variant identity is evidence: an old supported two-choice answer cannot be
// submitted as the later expanded four-choice proof.
let variants = blankSavedWord('ketu')
for (let index = 0; index < 3; index++) {
  const step = nextDueQuestion(variants, 'ketu')
  variants = answerQuestion(step.state, step.question)
}
let expanded = nextDueQuestion(variants, 'ketu')
variants = expanded.state
assert.equal(expanded.question.variantId, 'controlled-retrieval-four-choice')
const staleVariant = reducer(variants, resultAction(expanded.question, true, {
  variantId: 'controlled-retrieval-two-choice',
  questionKey: `${expanded.question.questionKey}:forged-variant`,
}))
assert.strictEqual(staleVariant, variants, 'two-choice evidence was accepted for the four-choice retrieval variant')

// A miss preserves prior exact evidence and inserts easier support only after
// a disjoint round; repairing support returns to the still-unproved variant.
const winsBeforeMiss = clone(variants.wordProgress.ketu.wins)
variants = answerQuestion(variants, expanded.question, false)
assert.deepEqual(variants.wordProgress.ketu.wins, winsBeforeMiss, 'a miss erased earlier exact wins')
assert.ok(variants.wordProgress.ketu.remediation, 'a harder-stage miss did not schedule support')
assert.ok(variants.wordProgress.ketu.remediation.dueAfterRound - variants.trainRound >= WORD_MIN_INTERVENING_ROUNDS)
let repair = nextDueQuestion(variants, 'ketu')
variants = repair.state
assert.equal(repair.question.wordStageId, variants.wordProgress.ketu.remediation.stageId)
variants = answerQuestion(variants, repair.question)
expanded = nextDueQuestion(variants, 'ketu')
assert.equal(expanded.question.variantId, 'controlled-retrieval-four-choice',
  'support repair skipped the still-unproved expanded retrieval')

// Reviewed noun path: meaning and role precede contextual surface choice,
// construction, typing and retention. All proof is scoped to the exact
// surface+role row, including syncretic spellings such as the first two fshat
// rows; context-gap proof remains a separate evidence track.
let noun = blankSavedWord('fshat')
let reached = reachQuestion(noun, 'fshat', (question) => question.wordStageId === 'reviewed-form-contrast')
noun = reached.state
const firstFormQuestion = reached.question
const firstFormKey = firstFormQuestion.targetFormKey
assert.equal(firstFormQuestion.kind, 'forms')
assert.ok(firstFormQuestion.formTarget.context.al)
assert.ok(firstFormQuestion.formTarget.context.en)
assert.ok(firstFormQuestion.formTarget.context.alGap.includes('__'))
assert.ok(firstFormQuestion.options.length >= 2 && firstFormQuestion.options.length <= 4)
assert.equal(new Set(firstFormQuestion.options.map(({ label }) => label)).size, firstFormQuestion.options.length)
assert.ok(firstFormQuestion.options.every(({ label }) => !label.includes('→')), 'noun roles were presented as an arrow ladder')

const forgedForm = reducer(noun, resultAction(firstFormQuestion, true, {
  targetFormKey: 'fshat::not-the-reviewed-target',
  questionKey: `${firstFormQuestion.questionKey}:forged-form`,
}))
assert.strictEqual(forgedForm, noun, 'reducer accepted evidence for a different form target')
noun = answerQuestion(noun, firstFormQuestion)
assert.equal(noun.wordProgress.fshat.formProofs[firstFormKey].wins['reviewed-form-contrast'], 1)
assert.equal(noun.wordProgress.fshat.wins['reviewed-form-contrast'], undefined,
  'form proof leaked into word-global evidence')

due = nextDueQuestion(noun, 'fshat')
noun = due.state
assert.equal(due.question.wordStageId, 'contextual-form-selection')
assert.equal(due.question.targetFormKey, firstFormKey)
assert.ok(due.question.context.alGap.includes('__'))
assert.equal(new Set(due.question.options.map(({ value }) => lower(value))).size, due.question.options.length)
noun = answerQuestion(noun, due.question)

due = nextDueQuestion(noun, 'fshat')
noun = due.state
assert.equal(due.question.kind, 'ctx', 'reviewed context proof did not interpose before first construction')
assert.equal(due.question.contextReview, true)
assert.equal(noun.wordProgress.fshat.contextWins[WORD_CONTEXT_LATE_PROOF], undefined)
const proofBeforeContext = clone(noun.wordProgress.fshat.formProofs[firstFormKey])
noun = answerQuestion(noun, due.question)
assert.equal(noun.wordProgress.fshat.contextWins[WORD_CONTEXT_LATE_PROOF], 1)
assert.deepEqual(noun.wordProgress.fshat.formProofs[firstFormKey], proofBeforeContext,
  'context-gap evidence changed exact form evidence')

due = nextDueQuestion(noun, 'fshat')
noun = due.state
assert.equal(due.question.wordStageId, 'word-form-construction')
assert.equal(due.question.targetFormKey, firstFormKey)
noun = answerQuestion(noun, due.question)

due = nextDueQuestion(noun, 'fshat')
noun = due.state
assert.equal(due.question.wordStageId, 'contextual-typed-recall')
assert.equal(due.question.targetFormKey, firstFormKey)
const exactProofBeforeMiss = clone(noun.wordProgress.fshat.formProofs[firstFormKey].wins)
noun = answerQuestion(noun, due.question, false)
assert.deepEqual(noun.wordProgress.fshat.formProofs[firstFormKey].wins, exactProofBeforeMiss,
  'form-production miss erased exact role evidence')
assert.equal(noun.wordProgress.fshat.remediation.targetFormKey, firstFormKey,
  'form remediation lost the exact target')

repair = nextDueQuestion(noun, 'fshat')
noun = repair.state
assert.equal(repair.question.targetFormKey, firstFormKey,
  'easier support question cannot return to its exact form target')
noun = answerQuestion(noun, repair.question)
due = nextDueQuestion(noun, 'fshat')
noun = due.state
assert.equal(due.question.wordStageId, 'contextual-typed-recall')
assert.equal(due.question.targetFormKey, firstFormKey)
noun = answerQuestion(noun, due.question)
const formTypedRound = noun.trainRound

due = nextDueQuestion(noun, 'fshat')
noun = due.state
assert.equal(due.question.wordStageId, 'strict-spaced-recall')
assert.equal(due.question.targetFormKey, firstFormKey)
assert.ok(noun.trainRound - formTypedRound >= WORD_INITIAL_REVIEW_GAP,
  'exact noun retention was not spaced')
noun = answerQuestion(noun, due.question)

due = nextDueQuestion(noun, 'fshat')
noun = due.state
assert.equal(due.question.wordStageId, 'reviewed-form-contrast')
assert.notEqual(due.question.targetFormKey, firstFormKey, 'completed form proof unlocked no next exact form')
assert.equal(noun.wordProgress.fshat.formProofs[due.question.targetFormKey], undefined,
  'one form’s evidence was copied to the next form')

// Representative class coverage. Explicitly reviewed verb forms use the lane;
// class members without enough reviewed role/meaning contrasts skip only the
// conditional stages and proceed to construction without deadlock.
const representativeTracks = [
  ['fshat', 'noun', true],
  ['filloj', 'verb', true],
  ['rendesishem', 'adjective', false],
  ['ti', 'pronoun', false],
  ['te_link', 'other-inflecting', false],
  ['tani', 'non-inflecting', false],
]
const lexicalProof = {
  wins: { 'meaning-recognition': 2, 'controlled-lemma-retrieval': 3 },
  contextWins: { [WORD_CONTEXT_LATE_PROOF]: 1 },
  dueAfterRound: 0,
}
for (const [id, expectedClass, expectsLane] of representativeTracks) {
  assert.equal(formTrackForSense(id).wordClass, expectedClass, `${id}: representative class drifted`)
  assert.equal(reviewedFormTargets(id).length > 0, expectsLane, `${id}: reviewed-form eligibility drifted`)
  const question = buildWordQuestion({
    discoveredIds: [id],
    wordProgress: { [id]: lexicalProof },
    currentRound: 0,
    rng: () => 0.314159,
  })
  assert.ok(question, `${id}: class-specific lane skip deadlocked the builder`)
  assert.equal(question.wordStageId, expectsLane ? 'reviewed-form-contrast' : 'word-form-construction')
}

// Exhaustive entry-state check: after lexical evidence, every trainable sense
// either enters a buildable reviewed form lane or explicitly skips it and
// enters generative construction. Every construction’s canonical tiles must
// reproduce its exact answer, including spaces and punctuation in multiword
// lexical units.
let reviewedLaneCount = 0
let skippedLaneCount = 0
for (const id of Object.keys(DICT).filter(isTrainableSense)) {
  const forms = reviewedFormTargets(id)
  const question = buildWordQuestion({
    discoveredIds: [id],
    wordProgress: { [id]: lexicalProof },
    currentRound: 0,
    rng: () => 0.161803,
  })
  assert.ok(question, `${id}: post-lexical progression has no buildable question`)
  if (forms.length) {
    reviewedLaneCount += 1
    assert.equal(question.wordStageId, 'reviewed-form-contrast', `${id}: reviewed form meaning/role was skipped`)
    assert.ok(question.options.length >= 2 && question.options.length <= 4,
      `${id}: reviewed form contrast fell outside the controlled 2–4 range`)
  } else {
    skippedLaneCount += 1
    assert.equal(question.wordStageId, 'word-form-construction', `${id}: unavailable form lane did not skip cleanly`)
    assert.equal(question.targetReference?.valid, true, `${id}: construction has no target reference`)
    assert.ok(question.targetReference.meaningCue, `${id}: construction has no learner-visible meaning cue`)
    const exact = question.construction.answerPieceIds.map((pieceId) =>
      question.construction.pieces.find(({ id: candidate }) => candidate === pieceId)?.text || '',
    ).join('')
    assert.equal(exact, question.answerValue, `${id}: construction pieces cannot generate the exact lexical unit`)
  }
}

console.log('✓ blank saves traverse recognition, controlled retrieval, construction, tolerant typing and spaced strict recall.')
console.log('✓ exact noun-form proofs, context-gap evidence, remediation and save round-trips remain separate.')
console.log(`✓ ${reviewedLaneCount} reviewed form lanes build; ${skippedLaneCount} unavailable lanes skip without deadlock.`)
