// Release contract for the debug-only Train progression diagram. It proves the
// diagram is a view over production scheduler data, not a second curriculum.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { FORMS_UNLOCK_THRESHOLD } from '../src/game/gameState.js'
import {
  PHRASE_EXERCISE_MODES,
  buildPhraseProgressionSnapshot,
  buildPhraseQuestion,
} from '../src/game/phrasePractice.js'
import {
  PHRASE_PROGRESSION_POLICY,
  PHRASE_STAGE_DEFINITIONS,
} from '../src/game/phraseProgression.js'
import {
  PHRASE_PROGRESSION_MODEL_CARD,
  PHRASE_PROGRESSION_RESEARCH,
  PHRASE_PROGRESSION_RESEARCH_ALIGNMENT,
} from '../src/game/phraseProgressionResearch.js'
import {
  TRAIN_EXERCISE_EXAMPLES,
  TRAIN_EXERCISE_FAMILIES,
  TRAIN_QUESTION_MIX_POLICY,
  TRAIN_SCHEDULER_SAFEGUARDS,
  TRAIN_WORD_FORM_POLICY,
  debugLearningLanes,
} from '../src/game/trainingProgression.js'

const checks = []
const check = (name, run) => {
  try {
    run()
    checks.push({ name, ok: true })
    console.log(`✓ ${name}`)
  } catch (error) {
    checks.push({ name, ok: false, error })
    console.log(`✗ ${name}`)
  }
}

const read = (path) => fs.readFileSync(path, 'utf8')
const phrase = EVERYDAY_PHRASE_DRILLS.find((entry) => entry.id === 'going-village')
const snapshot = buildPhraseProgressionSnapshot(phrase, null)
const allDefinitions = Object.values(PHRASE_STAGE_DEFINITIONS).flat()
const wordFamilies = Object.values(TRAIN_EXERCISE_FAMILIES).filter((family) => family.id !== 'everyday-phrase')

check('the example is the requested real phrase and noun', () => {
  assert.equal(phrase.al, 'po shkoj në fshat.')
  assert.equal(phrase.en, 'I am going to the village.')
  assert.ok(phrase.requires.includes('fshat'))
})

check('the graph preserves scheduler stage identity and deterministic entry status', () => {
  const lanes = debugLearningLanes(snapshot)
  assert.equal(lanes.length, Object.keys(PHRASE_STAGE_DEFINITIONS).length)
  for (const lane of lanes) {
    assert.equal(lane.definitions, PHRASE_STAGE_DEFINITIONS[lane.id])
    lane.stages.forEach((stage, index) => {
      assert.equal(stage.definition, PHRASE_STAGE_DEFINITIONS[lane.id][index])
      assert.ok(['passed', 'current', 'locked'].includes(stage.status))
    })
  }
  assert.equal(lanes.find((lane) => lane.id === 'production').stages[0].status, 'current')
  assert.ok(lanes.find((lane) => lane.id === 'listening').stages.every((stage) => stage.status === 'locked'))
  assert.ok(lanes.find((lane) => lane.id === 'matching').stages.every((stage) => stage.status === 'locked'))
})

check('every registered phrase mode, tier and word variant appears in the graph inventory', () => {
  const definitionModes = new Set(allDefinitions.map((definition) => definition.mode))
  assert.deepEqual([...definitionModes].sort(), [...PHRASE_EXERCISE_MODES].sort())
  assert.equal(TRAIN_EXERCISE_FAMILIES.phrase.variants.length, allDefinitions.length)
  TRAIN_EXERCISE_FAMILIES.phrase.variants.forEach((definition, index) => {
    assert.equal(definition, allDefinitions[index])
    assert.ok(TRAIN_EXERCISE_EXAMPLES[definition.id], `missing example for ${definition.id}`)
  })
  for (const family of wordFamilies) {
    assert.ok(family.kind && family.role)
    for (const variant of family.variants) {
      assert.ok(TRAIN_EXERCISE_EXAMPLES[variant.id], `missing example for ${family.id}/${variant.id}`)
    }
  }
})

check('the builders can emit every registered phrase exercise variant', () => {
  for (const definition of allDefinitions) {
    const question = buildPhraseQuestion(EVERYDAY_PHRASE_DRILLS, {}, {}, {}, {
      rng: () => 0.41,
      targetId: phrase.id,
      mode: definition.mode,
      tier: definition.tier,
      distractorPool: EVERYDAY_PHRASE_DRILLS,
    })
    assert.ok(question, definition.id)
    assert.equal(question.kind, TRAIN_EXERCISE_FAMILIES.phrase.kind)
    assert.equal(question.skill, definition.skill)
    assert.equal(question.tier, definition.tier)
    assert.equal(question.mode, definition.mode)
    if (definition.typeScope) assert.equal(question.typeScope, definition.typeScope)
    if (definition.answerTolerance) assert.equal(question.answerTolerance, definition.answerTolerance)
    if (definition.variant?.distractors != null) {
      assert.equal(
        question.bank.filter((tile) => tile.answerIndex == null).length,
        definition.variant.distractors,
      )
    }
    if (definition.variant?.pairs != null) assert.equal(question.phrases.length, definition.variant.pairs)
  }
})

check('all stage cards expose truthful gates and exact pass/miss behavior', () => {
  for (const definition of PHRASE_STAGE_DEFINITIONS.production) {
    assert.ok(definition.gate)
    assert.ok(definition.transition.correct)
    assert.equal('pass' in definition.transition, false, `${definition.id} uses ambiguous one-pass metadata`)
    assert.ok(definition.transition.gateMet != null)
    assert.ok(definition.remediation?.afterDisjointRound)
  }
  for (const skill of ['listening', 'matching']) {
    const definitions = PHRASE_STAGE_DEFINITIONS[skill]
    definitions.forEach((definition, index) => {
      assert.equal(definition.gate.wins, 1)
      assert.equal(definition.transition.wrong, index)
      assert.equal(definition.transition.correct, Math.min(index + 1, definitions.length - 1))
      if (skill === 'matching') {
        assert.equal(definition.availability.kind, 'same-tier-board')
        assert.equal(definition.availability.pairCountFrom, 'variant.pairs')
      }
    })
    assert.equal(definitions.at(-1).transition.maxTierRepeat, true)
  }
})

check('word-form, mix and no-repeat policies are shared with the real builders', () => {
  assert.equal(FORMS_UNLOCK_THRESHOLD, TRAIN_WORD_FORM_POLICY.practiceWinsRequired)
  assert.equal(TRAIN_SCHEDULER_SAFEGUARDS.noImmediateSharedWords, true)
  assert.equal(TRAIN_SCHEDULER_SAFEGUARDS.repeatWhenNoDisjointTargetExists, false)
  assert.equal(TRAIN_SCHEDULER_SAFEGUARDS.exhaustedPoolOutcome, 'caught-up')
  assert.ok(TRAIN_QUESTION_MIX_POLICY.phraseShare > 0 && TRAIN_QUESTION_MIX_POLICY.phraseShare < 1)

  const practice = read('src/components/PracticeView.jsx')
  assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.wordMeaning/)
  assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.wordContext/)
  assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.nounForms/)
  assert.match(practice, /TRAIN_WORD_FORM_POLICY\.correction\.kind/)
  assert.match(practice, /WORD_ALBANIAN_TO_ENGLISH\.id/)
  assert.match(practice, /TRAIN_QUESTION_MIX_POLICY\.phraseShare/)
  assert.match(practice, /TRAIN_QUESTION_MIX_POLICY\.formShareWithinWordRounds/)
  assert.match(practice, /TRAIN_SCHEDULER_SAFEGUARDS\.exhaustedPoolOutcome/)
  assert.doesNotMatch(practice, /modeRoll < 0\.65|Math\.random\(\) < 0\.35|ZERO_TOKEN_BOOST/)
  assert.deepEqual([...practice.matchAll(/kind:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]), [])

  const phrasePractice = read('src/game/phrasePractice.js')
  assert.match(phrasePractice, /TRAIN_EXERCISE_FAMILIES\.phrase\.kind/)
  assert.match(phrasePractice, /TRAIN_QUESTION_MIX_POLICY\.phraseSkill/)
  assert.match(phrasePractice, /PHRASE_STAGE_DEFINITIONS\.listening\[tier\]\.variant\.distractors/)
  assert.match(phrasePractice, /PHRASE_STAGE_DEFINITIONS\.matching\[tier\].*variant\.pairs/s)
  assert.doesNotMatch(phrasePractice, /\[2, 3, 5\]|\[2, 3, 4\]|roll < 0\.62|roll < 0\.84/)
  assert.deepEqual(
    [...phrasePractice.matchAll(/kind:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]).sort(),
    ['broad', 'order', 'word'],
    'an unregistered literal question kind entered the phrase builder',
  )
})

check('the player-facing app cannot eagerly load the debug learning graph', () => {
  const debug = read('src/components/DebugView.jsx')
  const component = read('src/components/DebugLearningProgression.jsx')
  const saveStatus = read('src/components/DebugLearningSaveStatus.jsx')
  const app = read('src/App.jsx')
  assert.match(app, /const DebugView = lazy\(/)
  assert.match(debug, /const DebugLearningProgression = lazy\(/)
  assert.match(debug, /sub === 'learning'/)
  assert.match(component, /buildPhraseProgressionSnapshot/)
  assert.match(component, /debugLearningLanes\(snapshot/)
  assert.match(component, /FORMS_UNLOCK_THRESHOLD/)
  assert.match(component, /data-walkthrough-state="independent"/)
  assert.match(component, /buildWalkthroughSteps\(phrase\)/)
  assert.match(component, /advancePhraseProduction\(progress, focusIds/)
  assert.match(component, /aria-pressed=/)
  assert.match(component, /never your save/)
  assert.doesNotMatch(component, /\bstate\./)
  assert.match(saveStatus, /data-learning-state="current-save"/)
  assert.match(saveStatus, /state\.phraseProductionProgress/)
  assert.match(debug, /<DebugLearningSaveStatus state=\{state\}\s*\/>\s*<DebugLearningProgression\s*\/>/s)
  assert.doesNotMatch(debug, /<DebugLearningProgression\s+state=/)
  assert.match(component, /data-word-form-gate="practice-wins"/)
  assert.match(component, /data-evidence-interlock="phrase-reward-to-word-practice"/)
  assert.match(component, /word or form drills never advance a phrase card/)
})

check('research rationale is primary-linked and product thresholds stay caveated', () => {
  assert.ok(PHRASE_PROGRESSION_RESEARCH.length >= 10)
  assert.ok(PHRASE_PROGRESSION_RESEARCH.every((source) => /^https:\/\//.test(source.url)))
  assert.ok(PHRASE_PROGRESSION_RESEARCH.some((source) => /85%/.test(source.label) && /binary classification/i.test(source.label)))
  const sourceIds = new Set(PHRASE_PROGRESSION_RESEARCH.map(({ id }) => id))
  assert.ok(PHRASE_PROGRESSION_RESEARCH_ALIGNMENT.length >= 6)
  assert.ok(PHRASE_PROGRESSION_RESEARCH_ALIGNMENT.every((item) =>
    ['implemented', 'calibration-needed'].includes(item.status) &&
    item.evidenceIds.every((id) => sourceIds.has(id))))
  assert.equal(PHRASE_PROGRESSION_MODEL_CARD.sotaClaim, false)
  assert.match(PHRASE_PROGRESSION_MODEL_CARD.reason, /cannot be established/i)
  assert.match(PHRASE_PROGRESSION_MODEL_CARD.calibrationRequirement, /privacy-reviewed/i)
  assert.match(PHRASE_PROGRESSION_POLICY.caveat, /product policy pending player telemetry/i)
  assert.match(PHRASE_PROGRESSION_POLICY.caveat, /not a universal SOTA constant/i)
})

const failures = checks.filter((result) => !result.ok)
console.log(`\n${checks.length - failures.length}/${checks.length} learning-progression contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure.name}: ${failure.error.message}`)
  process.exitCode = 1
}
