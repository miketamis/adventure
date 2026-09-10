// Audit the zero-to-A2 product contract.
//
// This is intentionally not a vocabulary-count-to-level calculator. It checks
// that the product's CEFR claim is a profile across communicative modes, that
// the proposed capstones measure unfamiliar transfer, and that A2 cannot hide
// a missing skill behind a strong recognition score.

import assert from 'node:assert/strict'
import { existsSync, readdirSync } from 'node:fs'
import { DICT, ITEMS, STORY, lineOf } from '../src/game/content.js'
import {
  CEFR_CAPSTONE_TASK_FAMILIES,
  CEFR_LEVEL_GATES,
  CEFR_LEVEL_OUTCOMES,
  CEFR_MODES,
  CEFR_OFFICIAL_SOURCES,
  CEFR_PRODUCT_CLAIMS,
  CURRENT_CEFR_EVIDENCE,
  cefrImplementationStatus,
  evaluateCefrLevel,
} from '../src/game/cefrProgression.js'
import {
  EVERYDAY_CAN_DO_GROUPS,
  EVERYDAY_CORE_SENSE_IDS,
  EVERYDAY_PHRASE_DRILLS,
} from '../src/game/everydayAlbanian.js'
import { albanianTextOf } from '../src/game/language.js'
import { PLAYABLE_FORM_INVENTORY, trainingForms } from '../src/game/formInventory.js'
import { NOUN_FORMS } from '../src/game/nounForms.js'
import { PHRASE_STAGE_DEFINITIONS } from '../src/game/phraseProgression.js'
import { TRAIN_EXERCISE_FAMILIES } from '../src/game/trainingProgression.js'
import { audioSlug } from '../src/game/audio.js'
import { CEFR_PREPARATION_ACTIVITIES, CEFR_PREPARATION_MECHANICS } from '../src/game/cefrPreparation.js'
import { CEFR_TASKS_BY_FAMILY } from '../src/game/cefrTasks.js'

const failures = []
const check = (label, fn) => {
  try {
    fn()
    console.log(`✓ ${label}`)
  } catch (error) {
    failures.push(`${label}: ${error.message}`)
    console.error(`✗ ${label}: ${error.message}`)
  }
}

const levels = ['A1', 'A2']
const modeIds = CEFR_MODES.map(({ id }) => id)
const allowedImplementation = new Set(['planned', 'implemented'])
const officialHosts = new Set(['coe.int', 'www.coe.int', 'rm.coe.int'])

check('all cited CEFR sources are official Council of Europe resources', () => {
  assert.ok(Object.keys(CEFR_OFFICIAL_SOURCES).length >= 5)
  for (const [id, source] of Object.entries(CEFR_OFFICIAL_SOURCES)) {
    const url = new URL(source.url)
    assert.ok(officialHosts.has(url.hostname), `${id} uses non-Council host ${url.hostname}`)
    assert.match(source.label, /Council of Europe/, `${id} has no Council attribution`)
  }
})

check('A1 and A2 each define every required communicative mode once', () => {
  for (const level of levels) {
    const outcomes = CEFR_LEVEL_OUTCOMES[level]
    assert.ok(Array.isArray(outcomes), `${level} outcomes missing`)
    assert.deepEqual(outcomes.map(({ mode }) => mode).sort(), [...modeIds].sort(), `${level} mode profile is incomplete`)
  }
})

check('every outcome is unique, sourced and mapped to a same-level capstone', () => {
  const ids = new Set()
  for (const level of levels) {
    for (const outcome of CEFR_LEVEL_OUTCOMES[level]) {
      assert.ok(!ids.has(outcome.id), `duplicate outcome ${outcome.id}`)
      ids.add(outcome.id)
      assert.ok(CEFR_OFFICIAL_SOURCES[outcome.source], `${outcome.id} has unknown source ${outcome.source}`)
      assert.ok(outcome.descriptor.length >= 50, `${outcome.id} descriptor is not meaningful`)
      assert.ok(outcome.taskFamilies.length, `${outcome.id} has no task family`)
      for (const taskId of outcome.taskFamilies) {
        const task = CEFR_CAPSTONE_TASK_FAMILIES[taskId]
        assert.ok(task, `${outcome.id} references missing ${taskId}`)
        assert.equal(task.level, level, `${taskId} is mapped to wrong level`)
        assert.equal(task.mode, outcome.mode, `${taskId} is mapped to wrong mode`)
      }
    }
  }
})

check('every capstone family is held-out, lore-grounded and honestly labelled', () => {
  const referenced = new Set(Object.values(CEFR_LEVEL_OUTCOMES).flatMap((outcomes) =>
    outcomes.flatMap(({ taskFamilies }) => taskFamilies)))
  assert.deepEqual([...referenced].sort(), Object.keys(CEFR_CAPSTONE_TASK_FAMILIES).sort())
  for (const [id, task] of Object.entries(CEFR_CAPSTONE_TASK_FAMILIES)) {
    assert.ok(allowedImplementation.has(task.implementation), `${id}: invalid implementation state`)
    assert.equal(task.implementation, 'implemented', `${id}: shipped family is still labelled planned`)
    assert.equal(task.heldOut, true, `${id}: assessment is not held out from Train`)
    assert.ok(task.loreFrame.length >= 50, `${id}: missing meaningful lore frame`)
    assert.ok(task.trainWith.length >= 2, `${id}: no training path`)
    assert.ok(task.assessWith.length >= 50, `${id}: assessment is underspecified`)
    assert.ok(task.minimumForms >= 2, `${id}: too few independent task forms`)
    if (task.mode.startsWith('spoken')) assert.equal(task.requiresAudioCapture, true, `${id}: spoken evidence has no audio capture`)
  }
})

check('listening distinguishes speaker identities from acoustic voices', () => {
  for (const familyId of ['a1-unseen-listening', 'a2-unseen-listening']) {
    const family = CEFR_CAPSTONE_TASK_FAMILIES[familyId]
    const tasks = CEFR_TASKS_BY_FAMILY[familyId]
    const speakerIdentities = new Set(tasks.map(({ voice }) => voice.id)).size
    const acousticVoices = new Set(tasks.map(({ voice }) => voice.synthesisVoice)).size
    assert.ok(speakerIdentities >= family.minimumSpeakerIdentities, `${familyId}: insufficient speaker identities`)
    assert.ok(acousticVoices >= family.minimumAcousticVoices, `${familyId}: insufficient acoustic voices`)
    assert.equal(acousticVoices, 2, `${familyId}: claims acoustic variation the shipped bank does not have`)
    assert.ok(speakerIdentities > acousticVoices, `${familyId}: speaker identities were confused with acoustic voices`)
  }
})

check('A1 then A2 use non-compensatory mastery gates', () => {
  assert.equal(CEFR_LEVEL_GATES.A1.prerequisite, null)
  assert.equal(CEFR_LEVEL_GATES.A2.prerequisite, 'A1')
  for (const level of levels) {
    const gate = CEFR_LEVEL_GATES[level]
    assert.equal(gate.nonCompensatory, true, `${level} permits compensation across skills`)
    assert.deepEqual([...gate.requiredModes].sort(), [...modeIds].sort(), `${level} omits a required mode`)
    assert.ok(gate.reception.minimumAccuracy >= 0.8, `${level} reception floor is too low`)
    assert.ok(gate.reception.minimumDistinctWindows >= 2, `${level} has no repeat evidence window`)
    assert.ok(gate.performance.minimumPassingTasksPerMode >= (level === 'A1' ? 2 : 3), `${level} has too little performance evidence`)
    assert.ok(gate.performance.dimensions.includes('taskFulfilment'))
    assert.ok(gate.performance.dimensions.includes('comprehensibility'))
    assert.ok(gate.pronunciation.minimumPassingRecordings >= (level === 'A1' ? 3 : 5))
  }
})

const passingEvidenceFor = (level) => {
  const gate = CEFR_LEVEL_GATES[level]
  return CEFR_LEVEL_OUTCOMES[level].flatMap((outcome) => outcome.taskFamilies.flatMap((taskFamily) => {
    if (outcome.mode === 'listening' || outcome.mode === 'reading') {
      return Array.from({ length: gate.reception.minimumDistinctWindows }, (_, window) =>
        Array.from({ length: gate.reception.minimumFormsPerWindow }, (_, index) => ({
          level,
          mode: outcome.mode,
          taskFamily,
          variantId: `window-${window + 1}-form-${index + 1}`,
          windowId: `window-${window + 1}`,
          questionKind: index % 2 ? 'detail' : 'gist',
          heldOut: true,
          correct: true,
        }))).flat()
    }
    return Array.from({ length: gate.performance.minimumPassingTasksPerMode }, (_, index) => ({
      level,
      mode: outcome.mode,
      taskFamily,
      variantId: `performance-${index + 1}`,
      heldOut: true,
      rubric: Object.fromEntries(gate.performance.dimensions.map((dimension) => [dimension, 2])),
      pronunciationPass: outcome.mode.startsWith('spoken'),
    }))
  }))
}

check('the executable gate accepts shipped tasks but blocks missing modes and A2-before-A1', () => {
  const a1Evidence = passingEvidenceFor('A1')
  assert.equal(evaluateCefrLevel('A1', a1Evidence).passed, true, 'complete implemented A1 evidence did not pass')
  const withoutMediation = a1Evidence.filter(({ mode }) => mode !== 'mediation')
  assert.equal(evaluateCefrLevel('A1', withoutMediation).passed, false, 'stronger modes compensated for missing mediation')

  const a2Evidence = passingEvidenceFor('A2')
  assert.equal(evaluateCefrLevel('A2', a2Evidence).passed, false, 'A2 passed without A1')
  assert.equal(evaluateCefrLevel('A2', a2Evidence, {
    achievedLevels: ['A1'],
  }).passed, true, 'complete A2 evidence did not pass after A1')
})

check('implemented evidence and missing evidence cannot masquerade as each other', () => {
  for (const [id, evidence] of Object.entries(CURRENT_CEFR_EVIDENCE)) {
    assert.ok(['implemented', 'partial', 'missing'].includes(evidence.status), `${id}: invalid status`)
    if (evidence.status === 'implemented') assert.ok(evidence.proof.length, `${id}: implemented without proof`)
    if (evidence.status === 'missing') assert.equal(evidence.proof.length, 0, `${id}: missing item advertises proof`)
    assert.ok(evidence.limitation.length >= 40, `${id}: limitation is not explicit`)
  }
  assert.equal(cefrImplementationStatus('A1'), 'implemented')
  assert.equal(cefrImplementationStatus('A2'), 'implemented')
  assert.ok(Object.values(CURRENT_CEFR_EVIDENCE).every(({ status }) => status === 'implemented'))
  assert.match(CEFR_PRODUCT_CLAIMS.current, /learner self-review/i)
  assert.match(CEFR_PRODUCT_CLAIMS.afterInternalGates, /internal seven-mode profile/i)
  assert.match(CEFR_PRODUCT_CLAIMS.afterInternalGates, /never as an accredited/i)
  assert.match(CEFR_PRODUCT_CLAIMS.certificationBoundary, /native-speaker review/i)
  assert.match(CEFR_PRODUCT_CLAIMS.certificationBoundary, /true-beginner piloting/i)
})

check('the existing phrase ladder supplies preparation without declaring CEFR transfer', () => {
  assert.deepEqual(PHRASE_STAGE_DEFINITIONS.production.map(({ mode }) => mode), ['cloze', 'arrange', 'type', 'type', 'type'])
  assert.deepEqual(PHRASE_STAGE_DEFINITIONS.listening.map(({ mode }) => mode), ['listen', 'listen', 'listen'])
  assert.deepEqual(PHRASE_STAGE_DEFINITIONS.matching.map(({ mode }) => mode), ['match', 'match', 'match'])
  assert.equal(TRAIN_EXERCISE_FAMILIES.phrase.variants.length, 11)
  assert.equal(PHRASE_STAGE_DEFINITIONS.production.every(({ id }) => id !== 'free-writing'), true)
})

check('every reviewed phrase retains continuous audio', () => {
  for (const phrase of EVERYDAY_PHRASE_DRILLS) {
    assert.ok(existsSync(`public/audio/${audioSlug(phrase.al)}.mp3`), `${phrase.id} lacks phrase audio`)
  }
})

const normalize = (value) => String(value || '').toLocaleLowerCase('sq').replace(/\s+/g, ' ').trim()
const optionTexts = Object.values(STORY).flatMap((node) => (node.options || [])
  .filter((option) => !option.confuser)
  .map((option) => normalize(albanianTextOf(option.text))))
const phrasesSpokenAsChoices = EVERYDAY_PHRASE_DRILLS.filter((phrase) =>
  optionTexts.some((option) => option.includes(normalize(phrase.al)))).length
const sensesWithTrainableForms = Object.keys(PLAYABLE_FORM_INVENTORY).filter((id) => trainingForms(id).length >= 2).length
const changingFormRows = Object.keys(PLAYABLE_FORM_INVENTORY)
  .filter((id) => trainingForms(id).length >= 2)
  .reduce((total, id) => total + trainingForms(id).length - 1, 0)
const storyEndings = Object.values(STORY).filter(({ end }) => end).length
const audioClipCount = readdirSync('public/audio').filter((file) => file.endsWith('.mp3')).length
const storyTokenSenses = new Set()
for (const node of Object.values(STORY)) {
  for (const entry of node.text || []) for (const token of lineOf(entry)) if (token.id) storyTokenSenses.add(token.id)
  for (const option of node.options || []) for (const token of option.text || []) if (token.id) storyTokenSenses.add(token.id)
}
for (const item of Object.values(ITEMS)) {
  for (const action of Object.values(item)) for (const token of action?.phrase || []) if (token.id) storyTokenSenses.add(token.id)
}

console.log('')
console.log('=== Shipped zero-to-A2 path (internal readiness, not certification) ===')
console.log(`story: ${Object.keys(STORY).length} nodes / ${storyEndings} endings`)
console.log(`dictionary: ${Object.keys(DICT).length} senses; ${storyTokenSenses.size} used in story/options/items`)
console.log(`practical lane: ${EVERYDAY_CORE_SENSE_IDS.length} priority senses / ${EVERYDAY_PHRASE_DRILLS.length} grounded phrases / ${EVERYDAY_CAN_DO_GROUPS.length} can-do groups`)
console.log(`player-choice phrase grounding: ${phrasesSpokenAsChoices}/${EVERYDAY_PHRASE_DRILLS.length} phrases appear in a non-confuser choice`)
console.log(`forms: ${changingFormRows} reviewed changing surfaces across ${sensesWithTrainableForms} senses; ${Object.keys(NOUN_FORMS).length} reviewed noun paradigms`)
console.log(`audio: ${audioClipCount} generated clips; Train phrase audio is single-voice, held-out listening uses exactly 2 acoustic voices across 7 speaker identities`)
console.log(`guided transfer: ${Object.keys(CEFR_PREPARATION_MECHANICS).length} mechanics / ${CEFR_PREPARATION_ACTIVITIES.length} activities`)
console.log('A1 implementation gate: shipped across 7 modes; open performance evidence is learner-self-reviewed')
console.log('A2 implementation gate: shipped across 7 modes and locked behind A1; open performance evidence is learner-self-reviewed')

if (failures.length) {
  console.error(`\n${failures.length} CEFR policy failure(s).`)
  process.exitCode = 1
} else {
  console.log('\n✓ CEFR zero-to-A2 path is internally coherent; its self-review and non-accredited limits remain explicit.')
}
