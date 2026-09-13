import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import {
  buildPhraseQuestion,
  phraseQuestionExactAnswer,
} from '../src/game/phrasePractice.js'
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

const stringsOf = (value, path = 'question', out = []) => {
  if (typeof value === 'string') out.push([path, value])
  else if (Array.isArray(value)) value.forEach((item, index) => stringsOf(item, `${path}[${index}]`, out))
  else if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) stringsOf(child, `${path}.${key}`, out)
  }
  return out
}

const steady = () => 0.417
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
assert.match(phraseComponent, /<AcceptedAnswerReview/)
assert.match(phraseComponent, /onContinue=\{onContinue\}/)
assert.doesNotMatch(phraseComponent, /q\.typeScope === 'word' \? q\.typingAnswer : q\.target\.al/)
assert.match(practice, /onContinue=\{next\}/)
assert.match(practice, /result\.correct && !result\.acceptedWithLeeway && !restoresHeart/)
assert.doesNotMatch(practice, /result\.correct \? 1800 : 0/)

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
