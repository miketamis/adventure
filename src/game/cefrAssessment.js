import {
  CEFR_CAPSTONE_TASK_FAMILIES,
  CEFR_LEVEL_GATES,
  CEFR_MODES,
  evaluateCefrLevel,
} from './cefrProgression.js'
import { CEFR_TASKS, CEFR_TASKS_BY_FAMILY } from './cefrTasks.js'
import {
  CEFR_EVIDENCE_VERSION,
  cefrEvidenceKey,
  clampCefrRubric,
  emptyCefrState,
  normalizeStoredCefrEvidence,
} from './cefrEvidenceState.js'

export { cefrEvidenceKey, emptyCefrState }

// The renderer and this registry form one implementation contract. A family is
// eligible for the internal readiness gate only when every stimulus and
// response kind in its live task bank is handled here and audited.
export const CEFR_SUPPORTED_STIMULUS_KINDS = Object.freeze([
  'continuous-audio',
  'written-text',
  'branching-dialogue',
  'visual-prompt',
  'incoming-note',
  'scene-prompt',
  'fresh-topic-card',
  'source-and-listener',
  'source-and-collaboration',
])

export const CEFR_SUPPORTED_RESPONSE_KINDS = Object.freeze([
  'choice',
  'recorded-dialogue',
  'recorded-monologue',
  'free-text',
  'short-relay',
  'free-text-exchange',
  'relay-and-reply',
])

const stimulusKinds = new Set(CEFR_SUPPORTED_STIMULUS_KINDS)
const responseKinds = new Set(CEFR_SUPPORTED_RESPONSE_KINDS)
const levelIds = new Set(['A1', 'A2'])
const modeIds = new Set(CEFR_MODES.map(({ id }) => id))
const taskById = new Map(CEFR_TASKS.map((task) => [task.id, task]))

export const CEFR_IMPLEMENTATION_BY_FAMILY = Object.freeze(Object.fromEntries(
  Object.entries(CEFR_TASKS_BY_FAMILY).map(([familyId, tasks]) => [
    familyId,
    tasks.length > 0 && tasks.every((task) =>
      task.heldOut === true &&
      stimulusKinds.has(task.stimulus?.kind) &&
      responseKinds.has(task.response?.kind))
      ? 'implemented'
      : 'planned',
  ]),
))

export function cefrWindowIdForTask(task) {
  if (!task) return null
  if (!['listening', 'reading'].includes(task.mode)) return `${task.level}:${task.mode}:performance`
  const family = CEFR_TASKS_BY_FAMILY[task.familyId] || []
  const index = family.findIndex(({ id }) => id === task.id)
  if (index < 0) return null
  const split = Math.ceil(family.length / 2)
  return `${task.level}:${task.mode}:window-${index < split ? 1 : 2}`
}

// Persist assessment evidence, never learner text or audio. Any record that
// cannot be tied back to the current held-out bank fails closed on load.
export function normalizeCefrEvidence(value) {
  const byKey = new Map()
  for (const raw of normalizeStoredCefrEvidence(value)) {
    const task = taskById.get(raw.taskId)
    if (!task || task.heldOut !== true || raw.heldOut !== true) continue
    if (raw.level !== task.level || raw.mode !== task.mode || raw.taskFamily !== task.familyId) continue
    if (!levelIds.has(raw.level) || !modeIds.has(raw.mode)) continue
    if (typeof raw.variantId !== 'string' || !raw.variantId.startsWith(task.id)) continue
    const expectedWindow = cefrWindowIdForTask(task)
    if (raw.windowId !== expectedWindow) continue

    const reception = ['listening', 'reading'].includes(task.mode)
    let event
    if (reception) {
      const questionId = raw.variantId.slice(task.id.length + 1)
      const question = task.questions?.find(({ id }) => id === questionId)
      if (!question || !['gist', 'detail'].includes(raw.questionKind)) continue
      if (raw.questionKind !== question.kind || typeof raw.correct !== 'boolean') continue
      event = {
        level: task.level,
        mode: task.mode,
        taskFamily: task.familyId,
        taskId: task.id,
        variantId: `${task.id}:${question.id}`,
        windowId: expectedWindow,
        heldOut: true,
        questionKind: question.kind,
        correct: raw.correct,
        attempt: raw.attempt,
      }
    } else {
      event = {
        level: task.level,
        mode: task.mode,
        taskFamily: task.familyId,
        taskId: task.id,
        variantId: task.id,
        windowId: expectedWindow,
        heldOut: true,
        rubric: clampCefrRubric(raw.rubric),
        pronunciationPass: ['spokenInteraction', 'spokenProduction'].includes(task.mode)
          ? raw.pronunciationPass === true && raw.recordingCaptured === true
          : undefined,
        recordingCaptured: ['spokenInteraction', 'spokenProduction'].includes(task.mode)
          ? raw.recordingCaptured === true
          : undefined,
        attempt: raw.attempt,
      }
    }
    const key = cefrEvidenceKey(event)
    if (!byKey.has(key)) byKey.set(key, event)
  }
  return [...byKey.values()].slice(-300)
}

export function mergeCefrEvidence(current, additions) {
  const previous = normalizeCefrEvidence(current)
  const normalizedAdditions = normalizeCefrEvidence(additions)
  const byKey = new Map(previous.map((event) => [cefrEvidenceKey(event), event]))
  for (const event of normalizedAdditions) {
    const key = cefrEvidenceKey(event)
    // A revealed assessment form is no longer held out. Preserve the first
    // completed result; later rehearsal may teach, but cannot rewrite the
    // original transfer evidence into a pass.
    if (!byKey.has(key)) byKey.set(key, event)
  }
  return [...byKey.values()].slice(-300)
}

export function receptionEvidenceFor(task, answers) {
  const windowId = cefrWindowIdForTask(task)
  return (task?.questions || []).flatMap((question) => {
    const picked = answers?.[question.id]
    if (typeof picked !== 'string') return []
    return [{
      level: task.level,
      mode: task.mode,
      taskFamily: task.familyId,
      taskId: task.id,
      variantId: `${task.id}:${question.id}`,
      windowId,
      heldOut: true,
      questionKind: question.kind,
      correct: question.acceptedChoiceIds.includes(picked),
      attempt: 1,
    }]
  })
}

export function performanceEvidenceFor(task, rubric, {
  pronunciationPass = false,
  recordingCaptured = false,
} = {}) {
  if (!task || ['listening', 'reading'].includes(task.mode)) return []
  return [{
    level: task.level,
    mode: task.mode,
    taskFamily: task.familyId,
    taskId: task.id,
    variantId: task.id,
    windowId: cefrWindowIdForTask(task),
    heldOut: true,
        rubric: clampCefrRubric(rubric),
    pronunciationPass: ['spokenInteraction', 'spokenProduction'].includes(task.mode)
      ? pronunciationPass === true && recordingCaptured === true
      : undefined,
    recordingCaptured: ['spokenInteraction', 'spokenProduction'].includes(task.mode)
      ? recordingCaptured === true
      : undefined,
    attempt: 1,
  }]
}

export function cefrProfile(evidence) {
  const normalized = normalizeCefrEvidence(evidence)
  const A1 = evaluateCefrLevel('A1', normalized, {
    achievedLevels: [],
    implementationByTask: CEFR_IMPLEMENTATION_BY_FAMILY,
  })
  const A2 = evaluateCefrLevel('A2', normalized, {
    achievedLevels: A1.passed ? ['A1'] : [],
    implementationByTask: CEFR_IMPLEMENTATION_BY_FAMILY,
  })
  return { A1, A2, achieved: { A1: A1.passed, A2: A2.passed } }
}

export function cefrModeProgress(level, mode, evidence) {
  const tasks = CEFR_TASKS.filter((task) => task.level === level && task.mode === mode)
  const events = normalizeCefrEvidence(evidence).filter((event) =>
    event.level === level && event.mode === mode)
  const completedTasks = new Set(events.flatMap((event) => {
    if (['listening', 'reading'].includes(mode)) {
      const task = taskById.get(event.taskId)
      const taskEvents = events.filter(({ taskId }) => taskId === event.taskId)
      return task?.questions?.every(({ id }) =>
        taskEvents.some(({ variantId }) => variantId === `${task.id}:${id}`)) ? [task.id] : []
    }
    return [event.taskId]
  }))
  return { completed: completedTasks.size, total: tasks.length }
}

const distinctEvidenceVariants = (events) => [...new Map(
  events.map((event) => [event.variantId, event]),
).values()]

const rubricPasses = (event, gate) => gate.performance.dimensions.every((dimension) =>
  Number(event.rubric?.[dimension]) >= gate.performance.passFloorEachDimension)

// First-attempt reachability is shared by the normal capstone and its debug
// diagram. A revealed task is never counted as fresh, even if only part of a
// malformed evidence record survived normalization. `missBudget` answers how
// many additional fresh variants could fail while an all-used bank can still
// meet the gate; it is not a promise that a learner should attempt them all.
export function cefrFamilyReachability(familyId, evidence = []) {
  const family = CEFR_CAPSTONE_TASK_FAMILIES[familyId]
  const tasks = CEFR_TASKS_BY_FAMILY[familyId] || []
  if (!family || !tasks.length) {
    return { familyId, passed: false, reachable: false, freshTasks: 0, windows: [], reason: 'missing-family' }
  }
  const gate = CEFR_LEVEL_GATES[family.level]
  const events = normalizeCefrEvidence(evidence).filter((event) => event.taskFamily === familyId)
  const attemptedTaskIds = new Set(events.map(({ taskId }) => taskId))
  const freshTasks = tasks.filter(({ id }) => !attemptedTaskIds.has(id))
  const implementationReady = CEFR_IMPLEMENTATION_BY_FAMILY[familyId] === 'implemented'

  if (['listening', 'reading'].includes(family.mode)) {
    const windowIds = [...new Set(tasks.map(cefrWindowIdForTask))]
    const windows = windowIds.map((windowId) => {
      const windowTasks = tasks.filter((task) => cefrWindowIdForTask(task) === windowId)
      const current = distinctEvidenceVariants(events.filter((event) => event.windowId === windowId))
      const freshQuestions = windowTasks
        .filter(({ id }) => !attemptedTaskIds.has(id))
        .flatMap((task) => task.questions || [])
      const correct = current.filter(({ correct: isCorrect }) => isCorrect === true).length
      const finalForms = current.length + freshQuestions.length
      const finalCorrectIfPerfect = correct + freshQuestions.length
      const currentKinds = new Set(current.map(({ questionKind }) => questionKind))
      const possibleKinds = new Set([...currentKinds, ...freshQuestions.map(({ kind }) => kind)])
      const hasRequiredKinds = !gate.reception.requireGistAndDetail ||
        (possibleKinds.has('gist') && possibleKinds.has('detail'))
      const passed = current.length >= gate.reception.minimumFormsPerWindow &&
        correct / current.length >= gate.reception.minimumAccuracy &&
        (!gate.reception.requireGistAndDetail ||
          (currentKinds.has('gist') && currentKinds.has('detail')))
      const reachable = passed || (hasRequiredKinds &&
        finalForms >= gate.reception.minimumFormsPerWindow &&
        finalCorrectIfPerfect / finalForms >= gate.reception.minimumAccuracy)
      return {
        id: windowId,
        attempted: current.length,
        correct,
        freshForms: freshQuestions.length,
        passed,
        reachable,
        missBudget: reachable ? Math.max(0, Math.floor(
          finalCorrectIfPerfect - (gate.reception.minimumAccuracy * finalForms) + 1e-9,
        )) : 0,
      }
    })
    const passingWindows = windows.filter(({ passed }) => passed).length
    const reachableWindows = windows.filter(({ reachable }) => reachable).length
    return {
      familyId,
      implementationReady,
      passed: implementationReady && passingWindows >= gate.reception.minimumDistinctWindows,
      reachable: implementationReady && reachableWindows >= gate.reception.minimumDistinctWindows,
      freshTasks: freshTasks.length,
      windows,
      reason: !implementationReady
        ? 'implementation-blocked'
        : reachableWindows < gate.reception.minimumDistinctWindows ? 'first-attempt-bank-exhausted' : null,
    }
  }

  const current = distinctEvidenceVariants(events)
  const passing = current.filter((event) => rubricPasses(event, gate)).length
  const required = gate.performance.minimumPassingTasksPerMode
  const passed = implementationReady && passing >= required
  const reachable = implementationReady && (passed || passing + freshTasks.length >= required)
  return {
    familyId,
    implementationReady,
    passed,
    reachable,
    freshTasks: freshTasks.length,
    passing,
    attempted: current.length,
    required,
    missBudget: reachable ? Math.max(0, passing + freshTasks.length - required) : 0,
    windows: [],
    reason: !implementationReady
      ? 'implementation-blocked'
      : !reachable ? 'first-attempt-bank-exhausted' : null,
  }
}

export function nextCefrTask(level, mode, evidence) {
  const tasks = CEFR_TASKS.filter((task) => task.level === level && task.mode === mode)
  if (!tasks.length) return null
  const normalized = normalizeCefrEvidence(evidence)
  // Once a held-out form has been completed it is never presented as fresh
  // transfer evidence again. If the bank is exhausted, return to ordinary
  // Train; a later release can add a genuinely unseen form.
  return tasks.find((task) => !normalized.some(({ taskId }) => taskId === task.id)) || null
}

export function openResponseMetrics(text, response = {}) {
  const trimmed = typeof text === 'string' ? text.trim() : ''
  const words = trimmed ? trimmed.split(/\s+/u).filter(Boolean).length : 0
  const sentences = trimmed ? trimmed.split(/[.!?]+/u).filter((part) => part.trim()).length : 0
  const turns = trimmed ? trimmed.split(/\n\s*\n|\n-{2,}\n/u).filter((part) => part.trim()).length : 0
  const minimumWords = Math.max(0, finiteInteger(response.minimumWords))
  const minimumSentences = Math.max(0, finiteInteger(response.minimumSentences))
  const minimumTurns = Math.max(0, finiteInteger(response.requiredTurns ?? response.minimumTurns))
  return {
    words,
    sentences,
    turns: Math.max(turns, trimmed ? 1 : 0),
    minimumWords,
    minimumSentences,
    minimumTurns,
    wordFloorMet: words >= minimumWords,
    sentenceFloorMet: sentences >= minimumSentences,
    turnFloorMet: Math.max(turns, trimmed ? 1 : 0) >= minimumTurns,
  }
}

// The learner checks communicative concepts, not a single canonical sentence.
// Structural floors are objective; the remaining analytic dimensions are an
// explicit self-review because the app performs no server-side language or
// speech judgement.
export function selfReviewedRubric(task, {
  requirementChecks = {},
  dimensionChecks = {},
  structureMet = true,
} = {}) {
  const requirements = task?.requirements || []
  const fulfilled = requirements.filter(({ id }) => requirementChecks[id] === true).length
  const allRequirements = requirements.length > 0 && fulfilled === requirements.length
  const score = (id) => dimensionChecks[id] === true ? 2 : 1
  return {
    taskFulfilment: allRequirements && structureMet ? 2 : fulfilled > 0 ? 1 : 0,
    comprehensibility: score('comprehensibility'),
    range: score('range'),
    control: score('control'),
    cohesion: score('cohesion'),
  }
}

export function normalizeCefrState(saved) {
  const currentVersion = saved?.cefrEvidenceVersion === CEFR_EVIDENCE_VERSION
  return {
    cefrEvidenceVersion: CEFR_EVIDENCE_VERSION,
    cefrEvidence: currentVersion ? normalizeCefrEvidence(saved?.cefrEvidence) : [],
  }
}
