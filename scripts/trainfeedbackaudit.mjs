import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import {
  buildPhraseQuestion,
  phraseQuestionExactAnswer,
} from '../src/game/phrasePractice.js'
import { trainCompletionPhrases } from '../src/game/trainCompletion.js'
import { DICT } from '../src/game/dictionary.js'
import { playableContextForSense, reviewedFormTargets } from '../src/game/formInventory.js'
import { collectAudioSurfaces } from './lib/audio-surfaces.mjs'
import { acceptedAnswerComparison } from '../src/game/acceptedAnswerFeedback.js'
import {
  TRAIN_HEALTH_POLICY,
  trainCorrectWillRestoreHeart,
  trainHealthPlanForQuestion,
  trainHeartRiskText,
  trainRecoveryPlanForState,
  trainRecoveryStatusText,
} from '../src/game/trainHealthPolicy.js'

const root = new URL('../', import.meta.url)
const source = (path) => readFileSync(new URL(path, root), 'utf8')
const phraseComponent = source('src/components/PhrasePracticeQuestion.jsx')
const practice = source('src/components/PracticeView.jsx')
const acceptedReview = source('src/components/AcceptedAnswerReview.jsx')
const blockingModal = source('src/components/BlockingModal.jsx')

const stringsOf = (value, path = 'question', out = []) => {
  if (typeof value === 'string') out.push([path, value])
  else if (Array.isArray(value)) value.forEach((item, index) => stringsOf(item, `${path}[${index}]`, out))
  else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) stringsOf(child, `${path}.${key}`, out)
  }
  return out
}

const steady = () => 0.417
const completionAudio = new Set(collectAudioSurfaces(DICT, {}))
for (const id of Object.keys(DICT)) {
  const contexts = [DICT[id].ctx, playableContextForSense(id), ...reviewedFormTargets(id).map(({ context }) => context)].filter(Boolean)
  for (const context of contexts) {
    if (!context.al) continue
    for (const question of [
      { ctx: { al: context.alGap || '__', authoredAl: context.al } },
      { context },
      { typingContext: context },
      { formExerciseMode: 'same-root-grammar-matching', pairs: [{ context: context.al }] },
    ]) {
      assert.deepEqual(trainCompletionPhrases(question), [context.al], `${id}: completion lost its full context`)
      assert.ok(completionAudio.has(context.al), `${id}: completed context omitted from generated audio inventory`)
    }
  }
}
assert.deepEqual(trainCompletionPhrases({ surface: 'libër' }), [], 'Isolated word activities remain word-only')
let built = 0
for (const phrase of EVERYDAY_PHRASE_DRILLS) {
  for (const tier of [0, 2, 3, 4]) {
    const question = buildPhraseQuestion(
      EVERYDAY_PHRASE_DRILLS,
      {}, {}, {},
      { targetId: phrase.id, mode: tier === 0 ? 'cloze' : 'type', tier, distractorPool: EVERYDAY_PHRASE_DRILLS, rng: steady },
    )
    assert.ok(question, `${phrase.id}/production-${tier}: could not build representative Train question`)
    const exact = phraseQuestionExactAnswer(question)
    assert.ok(exact, `${phrase.id}/production-${tier}: missing exact Albanian feedback answer`)
    assert.equal(exact.includes('undefined'), false, `${phrase.id}/production-${tier}: exact answer contains undefined`)
    for (const [path, text] of stringsOf(question)) {
      assert.equal(/\bundefined\b/i.test(text), false, `${phrase.id}/production-${tier}: ${path} contains player-hostile undefined text`)
    }
    built += 1
  }
}

const comparison = acceptedAnswerComparison(
  'jam mire falimendarit po ti',
  'Jam mirë, faleminderit. Po ti?',
)
assert.equal(comparison.attempt, 'jam mire falimendarit po ti')
assert.equal(comparison.answer, 'Jam mirë, faleminderit. Po ti?')
assert.match(comparison.explanation, /“mire” should be “mirë”/)
assert.match(comparison.explanation, /“falimendarit” should be “faleminderit”/)
assert.equal(comparison.kind, 'spelling')
assert.match(comparison.title, /exact spelling/)
const orderComparison = acceptedAnswerComparison(
  'nuk mund të vij tani nesër takohemi',
  'Nuk mund të vij tani. Takohemi nesër?',
)
assert.equal(orderComparison.kind, 'order')
assert.match(orderComparison.title, /exact word order/)
assert.match(orderComparison.explanation, /All the words are here/)
assert.match(phraseComponent, /<AcceptedAnswerReview/)
assert.match(phraseComponent, /onContinue=\{onContinue\}/)
assert.ok(phraseComponent.includes(': `“${q.target.al}”`'), 'Phrase success must display the whole Albanian phrase, including cloze and word typing')
assert.ok(phraseComponent.includes('q.phrases.map((phrase) => `“${phrase.al}”`)'), 'Matched phrase feedback must retain every complete phrase')
assert.match(practice, /await playPhrase\(phrase\)/)
assert.match(practice, /generation\.current !== completionGeneration/)
// Exercise the production completion handler with controlled continuous audio.
const completionStart = practice.indexOf('const onPhraseComplete = useCallback(')
const completionEnd = practice.indexOf('\n  }, [dispatch, q, scheduleNextQuestion, state])', completionStart)
assert.ok(completionStart >= 0 && completionEnd > completionStart)
const completionBody = practice.slice(practice.indexOf('\n', completionStart), completionEnd)
const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor
const runCompletion = new AsyncFunction(
  'trainCompletionPhrases', 'result', 'q', 'generation', 'mounted', 'state', 'trainCorrectWillRestoreHeart',
  'trainHealthPlanForQuestion', 'setAcceptedLeewayReview', 'setAwaitingRecoveryContinue',
  'phraseNounEndingRefresher', 'trainMissConsequence', 'dispatch', 'playPhrase', 'scheduleNextQuestion',
  completionBody,
)
for (const mode of ['cloze', 'type', 'arrange', 'listen', 'match']) {
  const fullPhrase = EVERYDAY_PHRASE_DRILLS[0]
  const q = { mode, target: fullPhrase, phrases: mode === 'match' ? [fullPhrase, EVERYDAY_PHRASE_DRILLS[1]] : undefined }
  const played = []
  const scheduled = []
  let finishAudio
  const pending = runCompletion(
    trainCompletionPhrases, { correct: true }, q, { current: 1 }, { current: true }, {}, () => false,
    () => ({}), () => {}, () => {}, () => null, () => null, () => {},
    (al) => { played.push(al); return new Promise((resolve) => { finishAudio = resolve }) },
    (delay) => scheduled.push(delay),
  )
  assert.deepEqual(played, [fullPhrase.al], `${mode}: completion must play the complete recording`)
  assert.deepEqual(scheduled, [], `${mode}: must wait for the audio`)
  finishAudio(true)
  if (mode === 'match') {
    await Promise.resolve()
    assert.deepEqual(played, q.phrases.map(({ al }) => al))
    assert.deepEqual(scheduled, [])
    finishAudio(false) // Missing/muted audio must still allow progression.
  }
  await pending
  assert.deepEqual(scheduled, [1900])
}
const wordCompletionStart = practice.indexOf('const finishWordActivity = async ')
const wordCompletionEnd = practice.indexOf('\n  const onPick = ', wordCompletionStart)
assert.ok(wordCompletionStart >= 0 && wordCompletionEnd > wordCompletionStart)
const wordCompletionBody = practice.slice(practice.indexOf('\n', wordCompletionStart), wordCompletionEnd).replace(/\n  }\s*$/, '')
const runWordCompletion = new AsyncFunction(
  'correct', 'restoresHeart', 'delay', 'generation', 'mounted', 'completionPhrases',
  'playPhrase', 'playWord', 'scheduleNextQuestion', 'q', 'DICT', wordCompletionBody,
)
for (const outcome of ['completed', 'failed', 'unmounted', 'stale', 'restored-heart']) {
  const played = []
  const scheduled = []
  const generation = { current: 1 }
  const mounted = { current: true }
  const phrase = EVERYDAY_PHRASE_DRILLS[0].al
  let finishAudio
  const pending = runWordCompletion(
    true, outcome === 'restored-heart', 1200, generation, mounted, [phrase],
    (al) => { played.push(al); return new Promise((resolve) => { finishAudio = resolve }) },
    () => assert.fail('A contextual answer must not play an isolated word'),
    (delay) => scheduled.push(delay), {}, DICT,
  )
  assert.deepEqual(played, [phrase])
  assert.deepEqual(scheduled, [], `${outcome}: contextual activity advanced before audio finished`)
  if (outcome === 'unmounted') mounted.current = false
  if (outcome === 'stale') generation.current++
  finishAudio(outcome !== 'failed')
  await pending
  assert.deepEqual(scheduled, ['completed', 'failed'].includes(outcome) ? [1200] : [])
}
assert.doesNotMatch(phraseComponent, /q\.typeScope === 'word' \? q\.typingAnswer : q\.target\.al/)
assert.match(practice, /onContinue=\{next\}/)
assert.match(practice, /if \(!result\.acceptedWithLeeway && !restoresHeart\) scheduleNextQuestion\(1900\)/)
assert.doesNotMatch(practice, /result\.correct \? 1800 : 0/)
assert.match(acceptedReview, /<BlockingModal/)
assert.match(acceptedReview, /title=\{comparison\.title\}/)
assert.match(acceptedReview, /onClick=\{onContinue\}>Continue/)
assert.doesNotMatch(acceptedReview, /onDismiss=/)
assert.match(acceptedReview, /appMain\?\.setAttribute\('inert', ''\)/)
assert.match(acceptedReview, /appMain\?\.setAttribute\('aria-hidden', 'true'\)/)
assert.match(blockingModal, /createPortal\(/)
assert.match(blockingModal, /role="dialog"/)
assert.match(blockingModal, /aria-modal="true"/)
assert.match(blockingModal, /document\.addEventListener\('keydown', onKeyDown\)/)

const protectedPlan = trainHealthPlanForQuestion({ hearts: 2 }, {
  aspectTargets: [{ targetId: 'fshat', aspectId: 'spelling', level: 'first' }],
})
assert.equal(protectedPlan.protectedAttempt, true)
assert.match(trainHeartRiskText(protectedPlan), /2 of 3 hearts left/)
assert.match(trainHeartRiskText(protectedPlan), /will not cost a heart/)
const lethalPlan = trainHealthPlanForQuestion({
  hearts: 1,
  trainStageExposures: { 'aspect:fshat:spelling:first': 1 },
}, {
  aspectTargets: [{ targetId: 'fshat', aspectId: 'spelling', level: 'first' }],
})
assert.equal(lethalPlan.missEndsRun, true)
assert.match(trainHeartRiskText(lethalPlan), /ends this run/)
const recovery = trainRecoveryPlanForState({
  hearts: 2,
  trainHealingStreak: TRAIN_HEALTH_POLICY.recoveryCorrectCompletions - 1,
})
assert.equal(trainCorrectWillRestoreHeart(recovery), true)
assert.match(trainRecoveryStatusText(recovery), new RegExp(`${TRAIN_HEALTH_POLICY.recoveryCorrectCompletions - 1}/${TRAIN_HEALTH_POLICY.recoveryCorrectCompletions}`))
assert.match(practice, /trainHeartRiskText\(trainHealth\)/)
assert.match(practice, /trainHealth\.missEndsRun/)
assert.match(practice, /trainRecoveryStatusText\(recoveryPlan\)/)
assert.match(practice, /recoveryPlan\.correctCombo\} in a row/)
assert.match(practice, /className={`card practice train-card \$\{trainRiskClass\}`}/)
assert.match(practice, /role="progressbar"/)
assert.match(practice, /Continue training/)

// A scored form-role phase may show only Albanian context before the answer.
// English correction remains legitimate after an attempt; the active form
// branch itself must not render the context's role-bearing English gloss.
const formRenderStart = practice.indexOf("{grammarPhaseQuestion ? (")
const formRenderEnd = practice.indexOf(') : isAudioWord ?', formRenderStart)
const activeFormRender = practice.slice(formRenderStart, formRenderEnd)
assert.ok(formRenderStart >= 0 && formRenderEnd > formRenderStart, 'could not locate active form render branch')
assert.doesNotMatch(activeFormRender, /context\.en|learnerMeaning|formTarget\.gloss/)

for (const file of [phraseComponent, practice]) {
  assert.equal(file.includes("'undefined'"), false, 'Train component contains learner-facing literal undefined')
  assert.equal(file.includes('"undefined"'), false, 'Train component contains learner-facing literal undefined')
  assert.equal(file.includes('`undefined`'), false, 'Train component contains learner-facing literal undefined')
}

console.log(`✓ ${built} representative phrase questions have exact feedback; leeway, health risk, recovery combo, and form-role answer boundaries are guarded.`)
