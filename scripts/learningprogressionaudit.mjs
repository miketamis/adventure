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
  TRAIN_EXERCISE_FAMILIES,
  TRAIN_NOUN_ENDING_CORRECTION_POLICY,
  TRAIN_QUESTION_MIX_POLICY,
  TRAIN_SCHEDULER_SAFEGUARDS,
  TRAIN_WORD_FORM_POLICY,
  debugLearningLanes,
} from '../src/game/trainingProgression.js'
import { TRAIN_EXERCISE_EXAMPLES } from '../src/game/trainingExampleRegistry.js'
import { buildWordQuestion } from '../src/game/wordPractice.js'
import { wordProgressionOptionsForSense } from '../src/game/formInventory.js'
import {
  WORD_CONTEXT_EXERCISE_CONCEPT,
  WORD_CONTEXT_VARIANTS,
  WORD_PROGRESSION_POLICY,
  WORD_STAGE_DEFINITIONS,
  advanceWordProgress,
  wordProgressionSnapshot,
} from '../src/game/wordProgression.js'

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
  for (const definition of WORD_STAGE_DEFINITIONS) {
    assert.ok(TRAIN_EXERCISE_EXAMPLES[definition.id], `missing lexical-stage example for ${definition.id}`)
  }
})

check('every learning question step opens a structured example dialog', () => {
  const component = read('src/components/DebugLearningProgression.jsx')
  const styles = read('src/styles.css')
  const exampleIds = new Set([
    ...allDefinitions.map(({ id }) => id),
    ...WORD_STAGE_DEFINITIONS.map(({ id }) => id),
    ...wordFamilies.flatMap(({ variants }) => variants.map(({ id }) => id)),
  ])
  for (const id of exampleIds) {
    const example = TRAIN_EXERCISE_EXAMPLES[id]
    assert.ok(example?.instruction, `${id} has no question instruction`)
    assert.ok(example?.prompt, `${id} has no example prompt`)
    assert.ok(example?.response, `${id} has no expected interaction`)
  }
  for (const definition of WORD_STAGE_DEFINITIONS.filter(({ mode }) => mode === 'choice')) {
    const count = TRAIN_EXERCISE_EXAMPLES[definition.id].choices.length
    if (definition.variants) {
      assert.ok(definition.variants.some(({ distractors }) => count === distractors + 1),
        `${definition.id} example does not mirror one of its controlled choice variants`)
    } else if (definition.variant.choiceRange) {
      assert.ok(count >= definition.variant.choiceRange[0] && count <= definition.variant.choiceRange[1],
        `${definition.id} example falls outside its reviewed choice range`)
    } else {
      assert.equal(count, definition.variant.distractors + 1,
        `${definition.id} example does not mirror its choice count`)
    }
  }
  for (const definition of PHRASE_STAGE_DEFINITIONS.listening) {
    assert.equal(
      TRAIN_EXERCISE_EXAMPLES[definition.id].tiles.length,
      4 + definition.variant.distractors,
      `${definition.id} example does not mirror its distractor count`,
    )
  }
  for (const definition of PHRASE_STAGE_DEFINITIONS.matching) {
    assert.equal(
      TRAIN_EXERCISE_EXAMPLES[definition.id].pairs.length,
      definition.variant.pairs,
      `${definition.id} example does not mirror its pair count`,
    )
  }
  assert.match(component, /function ExampleQuestionDialog/)
  assert.match(component, /function ExampleQuestionPreview/)
  assert.match(component, /<dialog/)
  assert.match(component, /dialog\.showModal\(\)/)
  assert.match(component, /onCancel=/)
  assert.match(component, /aria-label=\{`Example question for \$\{label\}`\}/)
  assert.match(component, /exampleId=\{definition\.id\}/)
  assert.match(component, /exampleId=\{variant\.id\}/)
  assert.match(styles, /\.dbg-learning-example-dialog::backdrop/)
  assert.match(styles, /\.dbg-learning-example-button:focus-visible/)
})

check('the word walkthrough and builder share the exact lexical stage registry', () => {
  const guide = read('src/components/GuideView.jsx')
  const component = read('src/components/DebugLearningProgression.jsx')
  const exampleOptions = wordProgressionOptionsForSense('fshat')
  const entry = wordProgressionSnapshot(null, 0, exampleOptions)
  assert.equal(entry.stages.length, WORD_STAGE_DEFINITIONS.length)
  assert.equal(WORD_STAGE_DEFINITIONS[0].id, 'meaning-recognition')
  assert.match(WORD_PROGRESSION_POLICY.principle, /Train begins with four-choice meaning recognition/)
  assert.equal(WORD_PROGRESSION_POLICY.productionBeginsAt, 'word-form-construction')
  entry.stages.forEach((stage, index) => assert.equal(stage.definition, WORD_STAGE_DEFINITIONS[index]))
  const question = buildWordQuestion({ discoveredIds: ['fshat'], currentRound: 0, rng: () => 0.2 })
  assert.equal(question.tier, WORD_STAGE_DEFINITIONS[0].tier)
  assert.equal(question.mode, WORD_STAGE_DEFINITIONS[0].mode)
  assert.equal(question.wordStageId, 'meaning-recognition')
  assert.equal(question.options.length, WORD_STAGE_DEFINITIONS[0].variant.distractors + 1)
  const advanced = advanceWordProgress(null, 0, {
    correct: true,
    tier: question.tier,
    mode: question.mode,
    direction: question.dir,
    stageId: question.wordStageId,
    variantId: question.variantId,
    targetFormKey: question.targetFormKey,
    questionKey: question.questionKey,
    round: 1,
  }, exampleOptions)
  assert.equal(advanced.accepted, true)
  assert.equal(wordProgressionSnapshot(advanced.progress, 1, exampleOptions).next.baseStage, 0)
  assert.equal(advanced.progress.wins['meaning-recognition'], 1)

  // Traverse the production builder, not a duplicate list of debug steps. This
  // sequence is the behavioral contract the deterministic fshat walkthrough
  // must expose, including the context proof that interposes at the same base
  // tier before spelling.
  let progress = null
  let round = 0
  const observed = []
  for (let attempt = 0; attempt < 18; attempt++) {
    const built = buildWordQuestion({
      discoveredIds: ['fshat'],
      wordProgress: { fshat: progress },
      currentRound: round,
      rng: () => 0.2,
    })
    assert.ok(built, `fshat walkthrough stopped before retained spelling at attempt ${attempt}`)
    observed.push(built.variantId || built.wordStageId)
    if (built.wordStageId === 'strict-spaced-recall') break
    const result = advanceWordProgress(progress, round, {
      correct: true,
      stageId: built.wordStageId,
      tier: built.tier,
      mode: built.mode,
      direction: built.dir,
      variantId: built.variantId ?? null,
      targetFormKey: built.targetFormKey ?? null,
      questionKey: built.questionKey,
      round: round + 1,
    }, exampleOptions)
    assert.equal(result.accepted, true, `production rejected fshat walkthrough attempt ${attempt}`)
    progress = result.progress
    round = progress.dueAfterRound
  }
  assert.deepEqual(observed, [
    'marked-context-recognition',
    'marked-context-recognition',
    'mirrored-controlled-retrieval',
    'mirrored-controlled-retrieval',
    'mirrored-controlled-retrieval',
    'class-specific-form-contrast',
    'reviewed-form-in-context',
    'unmarked-context-recognition',
    'letter-and-chunk-construction',
    'contextual-typed-recall',
    'strict-spaced-recall',
  ])
  assert.match(component, /const progressionOptions = exampleWordProgressionOptions\(\)/)
  assert.match(component, /wordProgressionSnapshot\(null, 0, progressionOptions\)/)
  assert.match(component, /advanceWordProgress\(progress, round,[\s\S]+\}, progressionOptions\)/)
  assert.match(component, /wordPlanCheckpoint\(after\.next\)/)
  assert.match(component, /contextSnapshot=\{snapshot\.context\}/)
  assert.match(component, /separate context proof/)
  assert.ok(WORD_PROGRESSION_POLICY.evidenceBoundary.doesNotProve.includes('CEFR attainment'))
  assert.match(guide, /first Train question asks you to recognise it among four/)
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

check('typed noun-ending correction is derived from the real production ladder', () => {
  assert.deepEqual(
    TRAIN_NOUN_ENDING_CORRECTION_POLICY.phraseProductionStages,
    PHRASE_STAGE_DEFINITIONS.production.filter((definition) => definition.mode === 'type'),
  )
  assert.deepEqual(
    TRAIN_NOUN_ENDING_CORRECTION_POLICY.phraseProductionStages.map(({ id }) => id),
    ['focus-spelling', 'independent-production', 'strict-retention'],
  )
  assert.equal(TRAIN_NOUN_ENDING_CORRECTION_POLICY.diagnosticKind, 'word')
  assert.equal(TRAIN_NOUN_ENDING_CORRECTION_POLICY.immediateFeedback.id, 'exact-paradigm')
  assert.ok(TRAIN_NOUN_ENDING_CORRECTION_POLICY.phraseProductionStages.every(
    (definition) => definition.remediation.afterDisjointRound,
  ))
  const component = read('src/components/DebugLearningProgression.jsx')
  assert.match(component, /data-noun-ending-branch="exact-reviewed-form"/)
  assert.match(component, /noun-ending miss → immediate exact-form sheet/)
})

check('debug graph derives the shared context-gap family from production variants', () => {
  const component = read('src/components/DebugLearningProgression.jsx')
  const examplesSource = read('src/game/trainingExampleRegistry.js')
  assert.equal(TRAIN_EXERCISE_FAMILIES.wordContext.variants, WORD_CONTEXT_VARIANTS)
  assert.equal(WORD_PROGRESSION_POLICY.contextVariant.variants, WORD_CONTEXT_VARIANTS)
  assert.ok(WORD_CONTEXT_VARIANTS.every(
    (variant) => variant.exerciseConceptId === WORD_CONTEXT_EXERCISE_CONCEPT,
  ))
  assert.deepEqual(
    WORD_CONTEXT_VARIANTS.map(({ evidenceTrack }) => evidenceTrack),
    ['recognition', 'controlled-retrieval', 'recognition'],
  )
  for (const { id } of WORD_CONTEXT_VARIANTS) {
    assert.equal(
      [...examplesSource.matchAll(new RegExp(`'${id}':`, 'g'))].length,
      1,
      `${id} has a duplicate or missing debug example key`,
    )
  }
  assert.equal(
    WORD_CONTEXT_VARIANTS.find(({ id }) => id === 'unmarked-context-recognition').unlock.stageId,
    'word-form-construction',
  )
  assert.match(component, /WORD_CONTEXT_EXERCISE_CONCEPT/)
  assert.match(component, /WORD_CONTEXT_VARIANTS\.map/)
  assert.match(component, /variant\.unlock/)
  assert.match(component, /WORD_STAGE_DEFINITIONS\.find/)
  assert.match(component, /Shared contextual-completion progression/)
  assert.doesNotMatch(component, /Parallel homonym path/)
})

check('word-form, mix and no-repeat policies are shared with the real builders', () => {
  assert.equal(FORMS_UNLOCK_THRESHOLD, TRAIN_WORD_FORM_POLICY.practiceWinsRequired)
  assert.equal(FORMS_UNLOCK_THRESHOLD, 0, 'a lifetime reward total still gates the integrated form ladder')
  assert.equal(TRAIN_SCHEDULER_SAFEGUARDS.noImmediateSharedWords, true)
  assert.equal(TRAIN_SCHEDULER_SAFEGUARDS.repeatWhenNoDisjointTargetExists, false)
  assert.equal(TRAIN_SCHEDULER_SAFEGUARDS.exhaustedPoolOutcome, 'caught-up')
  assert.ok(TRAIN_QUESTION_MIX_POLICY.phraseShare > 0 && TRAIN_QUESTION_MIX_POLICY.phraseShare < 1)
  assert.equal(TRAIN_QUESTION_MIX_POLICY.wordDirection.source, 'word-stage-definition')

  const practice = read('src/components/PracticeView.jsx')
  assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.wordMeaning/)
  assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.wordContext/)
  assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.wordForms/)
  assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.wordFormContext/)
  assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.wordConstruction/)
  assert.match(practice, /TRAIN_EXERCISE_FAMILIES\.wordSpelling/)
  assert.match(practice, /buildWordQuestion/)
  assert.match(practice, /formsCorrection/)
  assert.match(practice, /WORD_ALBANIAN_TO_ENGLISH\.id/)
  assert.match(practice, /TRAIN_QUESTION_MIX_POLICY\.phraseShare/)
  assert.equal(TRAIN_QUESTION_MIX_POLICY.formShareWithinWordRounds, 0)
  assert.match(practice, /TRAIN_SCHEDULER_SAFEGUARDS\.exhaustedPoolOutcome/)
  assert.doesNotMatch(practice, /modeRoll < 0\.65|Math\.random\(\) < 0\.35|ZERO_TOKEN_BOOST/)
  assert.doesNotMatch(practice, /albanianToEnglishShare/)
  assert.deepEqual(
    [...practice.matchAll(/kind:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]),
    ['forms-correction', 'forms-correction'],
    'only the registered noun-remediation surface may use a literal local kind',
  )

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
  assert.match(component, /data-word-form-gate="reviewed-form-lane"/)
  assert.match(component, /data-walkthrough-state="independent"/)
  assert.match(component, /buildWalkthroughSteps\(phrase\)/)
  assert.match(component, /buildWordWalkthroughSteps\(\)/)
  assert.match(component, /wordProgressionSnapshot/)
  assert.match(component, /advanceWordProgress/)
  assert.match(component, /advancePhraseProduction\(progress, focusIds/)
  assert.match(component, /aria-pressed=/)
  assert.match(component, /never your save/)
  assert.doesNotMatch(component, /\bstate\./)
  assert.match(saveStatus, /data-learning-state="current-save"/)
  assert.match(saveStatus, /state\.phraseProductionProgress/)
  assert.match(debug, /<DebugLearningSaveStatus state=\{state\}\s*\/>/)
  assert.match(debug, /<DebugLearningEvidenceInspector state=\{state\}\s*\/>/)
  assert.match(debug, /<DebugLearningProgression\s*\/>/)
  assert.doesNotMatch(debug, /<DebugLearningProgression\s+state=/)
  assert.match(component, /data-word-form-gate="reviewed-form-lane"/)
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
