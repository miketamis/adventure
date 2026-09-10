// Release contract for the debug-only CEFR path. The screen must remain a
// projection of production registries and live evidence, never a second set
// of hand-copied gates or a player-facing answer surface.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DICT } from '../src/game/content.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import {
  CEFR_IMPLEMENTATION_BY_FAMILY,
  cefrFamilyReachability,
  cefrProfile,
  cefrWindowIdForTask,
  performanceEvidenceFor,
  receptionEvidenceFor,
} from '../src/game/cefrAssessment.js'
import {
  CEFR_CAPSTONE_TASK_FAMILIES,
  CEFR_LEVEL_GATES,
  CEFR_LEVEL_OUTCOMES,
  CEFR_MODES,
  CEFR_PRODUCT_CLAIMS,
  CURRENT_CEFR_EVIDENCE,
} from '../src/game/cefrProgression.js'
import {
  CEFR_PREPARATION_ACTIVITIES,
  CEFR_PREPARATION_CAPABILITIES,
  CEFR_PREPARATION_EXAMPLES,
  CEFR_PREPARATION_MECHANICS,
  CEFR_PREPARATION_STAGES,
  preparationMechanicsForCapstone,
  preparationPlan,
} from '../src/game/cefrPreparation.js'
import { CEFR_TASKS, CEFR_TASKS_BY_FAMILY } from '../src/game/cefrTasks.js'
import { PHRASE_STAGE_DEFINITIONS } from '../src/game/phraseProgression.js'
import { WORD_STAGE_DEFINITIONS } from '../src/game/wordProgression.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8')
const component = read('src/components/DebugCefrProgression.jsx')
const capstone = read('src/components/CefrCapstone.jsx')
const debug = read('src/components/DebugView.jsx')
const app = read('src/App.jsx')
const styles = read('src/styles.css')

const checks = []
const check = (name, run) => {
  try {
    run()
    checks.push(name)
    console.log(`✓ ${name}`)
  } catch (error) {
    console.error(`✗ ${name}`)
    throw error
  }
}

const groupBy = (items, keyFor) => items.reduce((map, item) => {
  const key = keyFor(item)
  map.set(key, [...(map.get(key) || []), item])
  return map
}, new Map())

const passingEvidence = (task) => {
  if (['listening', 'reading'].includes(task.mode)) {
    return receptionEvidenceFor(task, Object.fromEntries(task.questions.map((question) => [
      question.id,
      question.acceptedChoiceIds[0],
    ])))
  }
  return performanceEvidenceFor(
    task,
    Object.fromEntries(task.rubric.dimensions.map((dimension) => [dimension, 2])),
    {
      pronunciationPass: true,
      recordingCaptured: ['spokenInteraction', 'spokenProduction'].includes(task.mode),
    },
  )
}

check('the debug CEFR surface is lazy and impossible to reach outside debug mode', () => {
  assert.match(debug, /const DebugCefrProgression = lazy\(\(\) => import\('\.\/DebugCefrProgression\.jsx'\)\)/)
  assert.match(debug, /sub === 'cefr'/)
  assert.match(debug, /<DebugCefrProgression state=\{state\} \/>/)
  assert.match(app, /state\.debug && state\.view === 'debug' && <DebugView/)
  const imports = fs.readdirSync(path.join(root, 'src/components'))
    .filter((name) => name.endsWith('.jsx'))
    .filter((name) => read(`src/components/${name}`).includes("./DebugCefrProgression.jsx"))
  assert.deepEqual(imports, ['DebugView.jsx'])
})

check('the diagram consumes each production registry instead of copying thresholds', () => {
  for (const symbol of [
    'CEFR_LEVEL_GATES', 'CEFR_LEVEL_OUTCOMES', 'CEFR_MODES', 'CEFR_CAPSTONE_TASK_FAMILIES',
    'CEFR_TASKS', 'CEFR_TASKS_BY_FAMILY', 'CEFR_IMPLEMENTATION_BY_FAMILY',
    'CURRENT_CEFR_EVIDENCE', 'CEFR_PREPARATION_STAGES', 'CEFR_PREPARATION_MECHANICS',
    'CEFR_PREPARATION_ACTIVITIES', 'CEFR_PREPARATION_CAPABILITIES',
    'preparationMechanicsForCapstone', 'preparationPlan', 'WORD_STAGE_DEFINITIONS',
    'PHRASE_STAGE_DEFINITIONS', 'wordProgressionSnapshot', 'advanceWordProgress',
    'advancePhraseProduction', 'buildPhraseProgressionSnapshot', 'cefrProfile',
    'cefrWindowIdForTask', 'cefrFamilyReachability', 'liveCefrPreparationEvidence',
  ]) assert.ok(component.includes(symbol), `debug diagram does not consume ${symbol}`)
  assert.doesNotMatch(component, /minimumAccuracy:\s*|minimumDistinctWindows:\s*|minimumPassingTasksPerMode:\s*/)
})

check('A1 then A2 cover all seven modes, outcomes, gates and implementation states', () => {
  assert.equal(CEFR_MODES.length, 7)
  for (const level of ['A1', 'A2']) {
    assert.deepEqual(
      [...new Set(CEFR_LEVEL_OUTCOMES[level].map(({ mode }) => mode))].sort(),
      CEFR_MODES.map(({ id }) => id).sort(),
    )
    assert.deepEqual([...CEFR_LEVEL_GATES[level].requiredModes].sort(), CEFR_MODES.map(({ id }) => id).sort())
  }
  assert.equal(CEFR_LEVEL_GATES.A2.prerequisite, 'A1')
  assert.ok(Object.values(CEFR_CAPSTONE_TASK_FAMILIES).every(({ implementation }) => implementation === 'implemented'))
  assert.ok(Object.values(CURRENT_CEFR_EVIDENCE).every(({ status }) => status === 'implemented'))
  assert.match(CEFR_PRODUCT_CLAIMS.current, /learner self-review/i)
  assert.match(CEFR_PRODUCT_CLAIMS.afterInternalGates, /never as an accredited/i)
  assert.match(component, /Declared/)
  assert.match(component, /Renderer/)
  assert.match(component, /Blockers:/)
})

check('every preparation stage, mechanic, activity, capability and capstone mapping is visible', () => {
  assert.equal(CEFR_PREPARATION_STAGES.length, 7)
  assert.equal(Object.keys(CEFR_PREPARATION_MECHANICS).length, 21)
  assert.ok(CEFR_PREPARATION_ACTIVITIES.length >= Object.keys(CEFR_PREPARATION_MECHANICS).length)
  assert.deepEqual(Object.keys(CEFR_PREPARATION_EXAMPLES).sort(), Object.keys(CEFR_PREPARATION_MECHANICS).sort())
  assert.match(component, /CEFR_PREPARATION_STAGES\.map/)
  assert.match(component, /activities\.map/)
  assert.match(component, /CEFR_PREPARATION_CAPABILITIES\.map/)
  assert.match(component, /preparationMechanicsForCapstone\(familyId\)/)
  assert.match(component, /data-preparation-stage=/)
  assert.match(component, /data-preparation-mechanic=/)
  assert.match(component, /data-preparation-activity=/)
  for (const level of ['A1', 'A2']) {
    const plan = preparationPlan(level, {})
    assert.equal(plan.length, Object.values(CEFR_PREPARATION_MECHANICS).filter((item) => item.level === level).length)
  }
  for (const familyId of Object.keys(CEFR_CAPSTONE_TASK_FAMILIES)) {
    assert.ok(preparationMechanicsForCapstone(familyId).length > 0, `${familyId} has no source-driven preparation mapping`)
  }
  const implementedCapabilities = new Set(Object.values(CEFR_PREPARATION_MECHANICS)
    .flatMap(({ capabilities }) => capabilities))
  assert.deepEqual([...implementedCapabilities].sort(), [...CEFR_PREPARATION_CAPABILITIES].sort())
})

check('the real village phrase, noun forms and exact word/phrase ladders drive the walkthrough', () => {
  const phrase = EVERYDAY_PHRASE_DRILLS.find(({ id }) => id === 'going-village')
  assert.equal(phrase.al, 'po shkoj në fshat.')
  assert.equal(phrase.en, 'I am going to the village.')
  assert.ok(phrase.requires.includes('fshat'))
  assert.ok(DICT.fshat.forms.length >= 4)
  assert.match(component, /const EXAMPLE_PHRASE_ID = 'going-village'/)
  assert.match(component, /const EXAMPLE_WORD_ID = 'fshat'/)
  assert.match(component, /word\.forms\.map/)
  assert.match(component, /WORD_STAGE_DEFINITIONS\.map/)
  assert.match(component, /PHRASE_STAGE_DEFINITIONS\.production\.map/)
})

check('the walkthrough is interactive, deterministic, save-independent and separates preparation from attainment', () => {
  assert.match(component, /useMemo\(buildWalkthrough, \[\]\)/)
  assert.match(component, /aria-pressed=\{selected === index\}/)
  assert.match(component, /onClick=\{\(\) => setSelected\(index\)\}/)
  assert.match(component, /independent of save/)
  assert.match(component, /Preparation events never enter the held-out CEFR evidence ledger/)
  assert.match(component, /Compact live-save profile · separate from the example/)
  assert.doesNotMatch(component, /\bdispatch\b|localStorage|sessionStorage|CEFR_RECORD_EVIDENCE/)

  const allEvidence = CEFR_TASKS.flatMap(passingEvidence)
  const profile = cefrProfile(allEvidence)
  assert.equal(profile.A1.passed, true)
  assert.equal(profile.A2.passed, true)
})

check('every task and every stimulus/response variant has a visible inventory route', () => {
  const families = new Set(CEFR_TASKS.map(({ familyId }) => familyId))
  assert.deepEqual([...families].sort(), Object.keys(CEFR_CAPSTONE_TASK_FAMILIES).sort())
  assert.ok(Object.values(CEFR_IMPLEMENTATION_BY_FAMILY).every((status) => status === 'implemented'))
  assert.match(component, /visible\.map\(\(task\) =>/)
  assert.match(component, /data-task-id=\{task\.id\}/)
  assert.match(component, /task\.stimulus\.kind/)
  assert.match(component, /task\.response\.kind/)
  assert.match(component, /task\.questions\?\.map/)
  assert.match(component, /cefrWindowIdForTask\(task\)/)
  assert.ok(new Set(CEFR_TASKS.map(({ stimulus }) => stimulus.kind)).size > 1)
  assert.ok(new Set(CEFR_TASKS.map(({ response }) => response.kind)).size > 1)
})

check('listening breadth reports speaker identities and acoustic voices separately', () => {
  for (const familyId of ['a1-unseen-listening', 'a2-unseen-listening']) {
    const tasks = CEFR_TASKS_BY_FAMILY[familyId]
    const family = CEFR_CAPSTONE_TASK_FAMILIES[familyId]
    const speakers = new Set(tasks.map(({ voice }) => voice.id)).size
    const acoustics = new Set(tasks.map(({ voice }) => voice.synthesisVoice)).size
    assert.ok(speakers >= family.minimumSpeakerIdentities)
    assert.ok(acoustics >= family.minimumAcousticVoices)
    assert.equal(acoustics, 2)
    assert.ok(speakers > acoustics)
  }
  assert.match(component, /speaker identities/)
  assert.match(component, /acoustic voices/)
})

check('every assessment family keeps a real first-attempt miss budget', () => {
  for (const [familyId, tasks] of Object.entries(CEFR_TASKS_BY_FAMILY)) {
    const { level, mode } = CEFR_CAPSTONE_TASK_FAMILIES[familyId]
    const gate = CEFR_LEVEL_GATES[level]
    if (['listening', 'reading'].includes(mode)) {
      const windows = groupBy(tasks, cefrWindowIdForTask)
      assert.ok(windows.size >= gate.reception.minimumDistinctWindows)
      for (const [windowId, windowTasks] of windows) {
        const forms = windowTasks.reduce((total, task) => total + task.questions.length, 0)
        const missBudget = forms - Math.ceil(forms * gate.reception.minimumAccuracy)
        assert.ok(forms >= gate.reception.minimumFormsPerWindow, `${windowId} lacks the required evidence forms`)
        assert.ok(missBudget >= 1, `${windowId} has no realistic first-attempt miss budget`)
        assert.ok((forms - 1) / forms >= gate.reception.minimumAccuracy, `${windowId} cannot survive one miss`)
      }
    } else {
      const missBudget = tasks.length - gate.performance.minimumPassingTasksPerMode
      assert.ok(missBudget >= 1, `${familyId} has no fresh performance miss budget`)
    }
  }
  assert.match(component, /further misses remain possible/)
  assert.match(component, /fresh chances/)
  assert.match(component, /practice\/reset required/)
  assert.match(component, /Assessment route exhausted:/)
  assert.match(component, /rehearsing a revealed task cannot rewrite it into a pass/)
})

check('the shared reachability evaluator reports fresh, passed and exhausted states', () => {
  for (const [familyId, tasks] of Object.entries(CEFR_TASKS_BY_FAMILY)) {
    const fresh = cefrFamilyReachability(familyId, [])
    assert.equal(fresh.reachable, true, `${familyId} is not reachable from a fresh bank`)
    assert.equal(fresh.freshTasks, tasks.length)
    assert.ok(fresh.windows.length || fresh.missBudget >= 1)

    const passed = cefrFamilyReachability(familyId, tasks.flatMap(passingEvidence))
    assert.equal(passed.passed, true, `${familyId} cannot pass with perfect first evidence`)

    const failedEvidence = tasks.flatMap((task) => passingEvidence(task).map((event) =>
      ['listening', 'reading'].includes(task.mode)
        ? { ...event, correct: false }
        : {
            ...event,
            rubric: Object.fromEntries(task.rubric.dimensions.map((dimension) => [dimension, 0])),
            pronunciationPass: false,
          }))
    const exhausted = cefrFamilyReachability(familyId, failedEvidence)
    assert.equal(exhausted.reachable, false, `${familyId} hides an exhausted first-attempt bank`)
    assert.equal(exhausted.reason, 'first-attempt-bank-exhausted')
    assert.equal(exhausted.freshTasks, 0)
  }
  assert.match(capstone, /cefrFamilyReachability\(familyId, evidence\)/)
  assert.match(capstone, /future fresh circuit is needed/)
  assert.doesNotMatch(capstone, /reachability\.windows\.map|missBudget|freshTasks/)
  assert.doesNotMatch(capstone, /tasks\.length\s*-\s*gate|minimumPassingTasksPerMode\s*-/)
})

check('normal capstone labels use authored presentation copy rather than internal anchor ids', () => {
  assert.match(capstone, /task\.storyAnchor\.placeLabel/)
  assert.match(capstone, /task\.storyAnchor\.npcLabel/)
  assert.doesNotMatch(capstone, /task\.storyAnchor\.location(?![A-Za-z])/)
  assert.doesNotMatch(capstone, /task\.storyAnchor\.npc(?![A-Za-z])/)
})

check('the compact live profile and reachability derive from normalized live evidence', () => {
  assert.match(component, /const liveEvidence = state\.cefrEvidence \|\| \[\]/)
  assert.match(component, /cefrProfile\(liveEvidence\)/)
  assert.match(component, /cefrFamilyReachability\(familyId, evidence\)/)
  const assessment = read('src/game/cefrAssessment.js')
  assert.match(assessment, /export function cefrFamilyReachability/)
  assert.match(assessment, /normalizeCefrEvidence\(evidence\)/)
  assert.match(assessment, /freshTasks = tasks\.filter/)
  assert.match(component, /first-attempt budget/i)
})

check('the debug surface is labelled, keyboard-operable, scroll-safe and responsive', () => {
  for (const label of [
    'dbg-cefr-title', 'dbg-cefr-live-title', 'dbg-cefr-walkthrough-title',
    'dbg-cefr-preparation-graph-title', 'dbg-cefr-families-title',
    'dbg-cefr-preparation-title', 'dbg-cefr-inventory-title',
  ]) assert.ok(component.includes(label), `missing accessible section label ${label}`)
  assert.match(component, /role="group" aria-label="Deterministic CEFR walkthrough checkpoint"/)
  assert.match(component, /role="status"/)
  assert.match(component, /tabIndex="0" role="region"/)
  assert.match(component, /<caption>/)
  assert.match(component, /scope="col"/)
  assert.match(component, /scope="row"/)
  assert.match(styles, /\.dbg-cefr-table-scroll:focus-visible/)
  assert.match(styles, /@media \(max-width: 820px\)[\s\S]*\.dbg-cefr-/)
  assert.match(styles, /@media \(max-width: 560px\)[\s\S]*\.dbg-cefr-/)
})

check('the honest baseline inventory remains visible alongside the shipped path', () => {
  assert.ok(Object.keys(CURRENT_CEFR_EVIDENCE).length > 0)
  assert.match(component, /Object\.entries\(CURRENT_CEFR_EVIDENCE\)\.map/)
  assert.match(component, /Current curriculum evidence and its declared limit/)
})

console.log(`\nCEFR debug audit passed: ${checks.length} contracts, ${CEFR_MODES.length} modes, ${CEFR_PREPARATION_STAGES.length} preparation stages, ${Object.keys(CEFR_PREPARATION_MECHANICS).length} preparation mechanics, ${CEFR_TASKS.length} held-out tasks.`)
