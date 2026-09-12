import assert from 'node:assert/strict'
import fs from 'node:fs'
import {
  COLD_START_ADAPTATION_MODEL,
  ELAPSED_SPACING_POLICY,
  coldStartAdaptationSnapshot,
  emptyTemporalEvidence,
  normalizeTemporalEvidence,
  recordTemporalAttempt,
  temporalDue,
} from '../src/game/adaptiveLearning.js'
import {
  LEARNING_TELEMETRY_POLICY,
  appendLearningTelemetryEvent,
  emptyLearningTelemetryState,
  learningTelemetryEvent,
  normalizeLearningTelemetryState,
  setLearningResearchConsent,
} from '../src/game/learningTelemetry.js'
import {
  PHRASE_SKILL_MAX_TIER,
  advancePhraseSkill,
  emptyPhraseSkillProgress,
  phraseSkillPlan,
} from '../src/game/phraseProgression.js'

let passed = 0
const check = (name, fn) => {
  fn()
  passed += 1
  console.log(`✓ ${name}`)
}

check('cold-start features are interpretable, explicit and never claim calibration', () => {
  const snapshot = coldStartAdaptationSnapshot({
    attempts: 2,
    correct: 1,
    lapses: 1,
    lastAttemptAtMs: 1_000,
  }, { nowMs: 3_601_000, stageTier: 5, mode: 'type' })
  assert.equal(COLD_START_ADAPTATION_MODEL.sotaClaim, false)
  assert.equal(snapshot.calibrated, false)
  assert.equal(snapshot.uncertainty, 'high')
  assert.deepEqual(Object.keys(snapshot.features), COLD_START_ADAPTATION_MODEL.featureSchema)
  assert.ok(snapshot.interval[0] < snapshot.estimate && snapshot.estimate < snapshot.interval[1])
  assert.match(snapshot.recommendation, /keep registry stage/)
})

check('normalization drops unknown fields and keeps only compact non-content timing evidence', () => {
  const normalized = normalizeTemporalEvidence({
    attempts: 4,
    correct: 99,
    lapses: 2,
    rawAnswer: 'private answer',
    audio: 'data:audio/mp3;base64,secret',
    transcript: 'private transcript',
  })
  assert.equal(normalized.correct, 4)
  assert.deepEqual(Object.keys(normalized), Object.keys(emptyTemporalEvidence()))
  assert.doesNotMatch(JSON.stringify(normalized), /private|audio|transcript/i)
})

check('strict retention requires its disjoint round and its real elapsed due time', () => {
  const attemptedAtMs = 1_000_000
  const evidence = recordTemporalAttempt(emptyTemporalEvidence(), {
    correct: true,
    attemptedAtMs,
    responseDurationMs: 4_200,
    retention: true,
  })
  assert.equal(evidence.dueAtMs, attemptedAtMs + evidence.reviewIntervalMs)
  assert.equal(temporalDue({ currentRound: 9, dueAfterRound: 10, nowMs: evidence.dueAtMs, dueAtMs: evidence.dueAtMs, requireElapsed: true }), false)
  assert.equal(temporalDue({ currentRound: 10, dueAfterRound: 10, nowMs: evidence.dueAtMs - 1, dueAtMs: evidence.dueAtMs, requireElapsed: true }), false)
  assert.equal(temporalDue({ currentRound: 10, dueAfterRound: 10, nowMs: evidence.dueAtMs, dueAtMs: evidence.dueAtMs, requireElapsed: true }), true)
})

check('listening and matching use the same timestamped, lapse-aware phrase-skill contract', () => {
  for (const skill of ['listening', 'matching']) {
    let progress = emptyPhraseSkillProgress(skill)
    const first = phraseSkillPlan(progress, skill, 0, 1_000_000)
    let result = advancePhraseSkill(progress, skill, 0, {
      correct: true,
      tier: first.tier,
      mode: first.mode,
      questionKey: `${skill}:1`,
      round: 1,
      attemptedAtMs: 1_000_000,
      responseDurationMs: 2_500,
    })
    assert.equal(result.accepted, true)
    assert.equal(result.progress.tier, 1)
    progress = result.progress
    const second = phraseSkillPlan(progress, skill, 2, 1_000_001)
    result = advancePhraseSkill(progress, skill, 2, {
      correct: true,
      tier: second.tier,
      mode: second.mode,
      questionKey: `${skill}:2`,
      round: 3,
      attemptedAtMs: 1_000_001,
      responseDurationMs: 6_000,
    })
    assert.equal(result.progress.tier, PHRASE_SKILL_MAX_TIER[skill])
    assert.equal(result.progress.temporal.attempts, 2)
    assert.equal(result.progress.temporal.dueAtMs, 1_000_001 + ELAPSED_SPACING_POLICY.initialRetentionMs)
    assert.equal(phraseSkillPlan(result.progress, skill, 4, result.progress.temporal.dueAtMs - 1).due, false)
    assert.equal(phraseSkillPlan(result.progress, skill, 4, result.progress.temporal.dueAtMs).due, true)
  }
})

check('optional research instrumentation is off by default and withdrawal erases it', () => {
  const input = learningTelemetryEvent({
    track: 'word',
    targetId: 'fshat',
    stageId: 'meaning-recognition',
    variantId: 'four-choice-meaning',
    tier: 0,
    correct: true,
    attemptedAtMs: 10_000_000,
    responseDurationMs: 4_500,
    rawAnswer: 'must never survive',
  })
  let state = emptyLearningTelemetryState()
  state = appendLearningTelemetryEvent(state, input)
  assert.equal(state.learningTelemetryEvents.length, 0)
  state = setLearningResearchConsent(state, true)
  state = appendLearningTelemetryEvent(state, input)
  assert.equal(state.learningTelemetryEvents.length, 1)
  assert.deepEqual(Object.keys(state.learningTelemetryEvents[0]), [
    'version', 'sequence', 'atMinute', 'track', 'targetId', 'stageId',
    'variantId', 'tier', 'outcome', 'responseBand', 'support',
  ])
  assert.doesNotMatch(JSON.stringify(state), /must never survive/)
  state = setLearningResearchConsent(state, false)
  assert.equal(state.learningResearchConsent, false)
  assert.deepEqual(state.learningTelemetryEvents, [])
  assert.equal(LEARNING_TELEMETRY_POLICY.localOnly, true)
})

check('forged saved analytics are normalized to the same bounded schema', () => {
  const normalized = normalizeLearningTelemetryState({
    learningResearchConsent: true,
    learningTelemetrySequence: 999,
    learningTelemetryEvents: [{
      track: 'word', targetId: 'fshat', stageId: 'meaning-recognition',
      outcome: 'correct', answer: 'secret', audio: 'secret', sequence: 1,
    }],
  })
  assert.equal(normalized.learningTelemetryEvents.length, 1)
  assert.doesNotMatch(JSON.stringify(normalized), /secret|answer|audio/i)
})

check('runtime and Debug Learning read timing and adaptation from the shared registries', () => {
  const phraseProgression = fs.readFileSync('src/game/phraseProgression.js', 'utf8')
  const wordProgression = fs.readFileSync('src/game/wordProgression.js', 'utf8')
  const debug = fs.readFileSync('src/components/DebugLearningProgression.jsx', 'utf8')
  const practice = fs.readFileSync('src/components/PracticeView.jsx', 'utf8')
  const phraseQuestion = fs.readFileSync('src/components/PhrasePracticeQuestion.jsx', 'utf8')
  assert.match(phraseProgression, /coldStartAdaptationSnapshot/)
  assert.match(wordProgression, /coldStartAdaptationSnapshot/)
  assert.match(debug, /PHRASE_PROGRESSION_POLICY\.adaptation/)
  assert.match(practice, /nowMs/)
  assert.match(phraseQuestion, /audioCompleted/)
  assert.match(phraseQuestion, /await playPhrase/)
})

console.log(`\n${passed}/7 adaptive-learning contracts pass.`)
