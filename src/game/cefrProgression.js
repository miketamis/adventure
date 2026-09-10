// CEFR A1/A2 outcome and capstone policy.
//
// This registry is deliberately separate from the phrase scheduler. The Train
// scheduler answers "has this exact word or phrase been retained?"; CEFR asks
// whether a learner can accomplish unfamiliar communicative tasks. Phrase
// mastery is preparation for these gates, never a substitute for them.

const deepFreeze = (value) => {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value
  for (const child of Object.values(value)) deepFreeze(child)
  return Object.freeze(value)
}

export const CEFR_OFFICIAL_SOURCES = deepFreeze({
  framework: {
    label: 'Council of Europe — CEFR framework',
    url: 'https://www.coe.int/en/web/common-european-framework-reference-languages',
  },
  descriptors: {
    label: 'Council of Europe — CEFR descriptors',
    url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors',
  },
  globalScale: {
    label: 'Council of Europe — CEFR global scale',
    url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale',
  },
  companionVolume: {
    label: 'Council of Europe — CEFR Companion Volume (2020)',
    url: 'https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4',
  },
  assessment: {
    label: 'Council of Europe — tests and examinations',
    url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/tests-and-examinations',
  },
  referenceLevels: {
    label: 'Council of Europe — language-specific Reference Level Descriptions',
    url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-reference-level-descriptions-language-by-language-components-and-forerunners',
  },
})

export const CEFR_MODES = deepFreeze([
  { id: 'listening', label: 'Listening reception' },
  { id: 'reading', label: 'Reading reception' },
  { id: 'spokenInteraction', label: 'Spoken interaction' },
  { id: 'spokenProduction', label: 'Spoken production' },
  { id: 'writtenInteraction', label: 'Written interaction' },
  { id: 'writtenProduction', label: 'Written production' },
  { id: 'mediation', label: 'Mediation' },
])

// Concise paraphrases of the official descriptors used to define the product
// target. They are outcomes, not claims about the current build.
export const CEFR_LEVEL_OUTCOMES = deepFreeze({
  A1: [
    {
      id: 'a1-listening-familiar', mode: 'listening',
      descriptor: 'Recognise familiar words and very basic phrases about the learner, familiar people and immediate surroundings when speech is slow and clear.',
      source: 'companionVolume', taskFamilies: ['a1-unseen-listening'],
    },
    {
      id: 'a1-reading-simple', mode: 'reading',
      descriptor: 'Understand familiar names, words and very simple sentences in short public and personal texts.',
      source: 'companionVolume', taskFamilies: ['a1-unseen-reading'],
    },
    {
      id: 'a1-spoken-exchange', mode: 'spokenInteraction',
      descriptor: 'Ask and answer simple questions about immediate needs and very familiar topics with a cooperative partner who can repeat or rephrase.',
      source: 'companionVolume', taskFamilies: ['a1-live-dialogue'],
    },
    {
      id: 'a1-spoken-description', mode: 'spokenProduction',
      descriptor: 'Use simple phrases and sentences to describe where the learner lives and people the learner knows.',
      source: 'companionVolume', taskFamilies: ['a1-spoken-portrait'],
    },
    {
      id: 'a1-written-exchange', mode: 'writtenInteraction',
      descriptor: 'Post or send short, simple greetings and personal statements and respond to a comment in a very simple way.',
      source: 'companionVolume', taskFamilies: ['a1-written-exchange'],
    },
    {
      id: 'a1-written-sentences', mode: 'writtenProduction',
      descriptor: 'Write simple isolated phrases and sentences about familiar people, places and needs.',
      source: 'companionVolume', taskFamilies: ['a1-free-writing'],
    },
    {
      id: 'a1-relay-predictable', mode: 'mediation',
      descriptor: 'Convey simple, predictable information from a short sign, notice, poster or programme and invite a contribution with simple language.',
      source: 'companionVolume', taskFamilies: ['a1-simple-relay'],
    },
  ],
  A2: [
    {
      id: 'a2-listening-main-point', mode: 'listening',
      descriptor: 'Understand high-frequency language about immediate personal relevance and catch the main point of short, clear messages and announcements.',
      source: 'companionVolume', taskFamilies: ['a2-unseen-listening'],
    },
    {
      id: 'a2-reading-everyday', mode: 'reading',
      descriptor: 'Read very short, simple texts; locate predictable information in everyday material; and understand short simple personal correspondence.',
      source: 'companionVolume', taskFamilies: ['a2-unseen-reading'],
    },
    {
      id: 'a2-spoken-routine', mode: 'spokenInteraction',
      descriptor: 'Handle short social exchanges and simple routine tasks that require a direct exchange of information on familiar topics and activities.',
      source: 'globalScale', taskFamilies: ['a2-live-dialogue'],
    },
    {
      id: 'a2-spoken-series', mode: 'spokenProduction',
      descriptor: 'Give a short series of simple phrases and sentences about family, other people, living conditions, background and present or recent work.',
      source: 'companionVolume', taskFamilies: ['a2-spoken-portrait'],
    },
    {
      id: 'a2-written-social-task', mode: 'writtenInteraction',
      descriptor: 'Conduct a basic written social exchange, express feelings, actions or needs, respond with thanks or apology, and make simple arrangements.',
      source: 'companionVolume', taskFamilies: ['a2-written-exchange'],
    },
    {
      id: 'a2-written-connected', mode: 'writtenProduction',
      descriptor: 'Write a series of simple phrases and sentences linked with basic connectors such as and, but and because.',
      source: 'companionVolume', taskFamilies: ['a2-free-writing'],
    },
    {
      id: 'a2-relay-main-point', mode: 'mediation',
      descriptor: 'Relay the main point of short, clearly expressed everyday information and collaborate in a simple practical task while asking for repetition when needed.',
      source: 'companionVolume', taskFamilies: ['a2-practical-relay'],
    },
  ],
})

// These are the smallest coherent assessment families, framed as ordinary
// events in the existing world. Variants are held out from Train so the gate
// measures transfer rather than memory for one of the 120 reviewed phrases.
// `planned` is intentional and must not be presented as shipped functionality.
export const CEFR_CAPSTONE_TASK_FAMILIES = deepFreeze({
  'a1-unseen-listening': {
    level: 'A1', mode: 'listening', implementation: 'planned',
    loreFrame: 'At the bridge and inn, recognise a new greeting, name, destination, price or time spoken slowly by a traveller.',
    trainWith: ['continuous phrase audio', 'word audio', 'listening construction'],
    assessWith: 'held-out audio followed by meaning or action selection; no transcript or English answer before the attempt',
    minimumForms: 12, minimumVoices: 2, heldOut: true,
  },
  'a1-unseen-reading': {
    level: 'A1', mode: 'reading', implementation: 'planned',
    loreFrame: 'Read new names, prices and one-line notices on a market board, inn door and meeting note.',
    trainWith: ['story reading', 'dictionary definitions', 'short grounded phrases'],
    assessWith: 'held-out one-line text followed by a concrete choice or information lookup',
    minimumForms: 12, minimumTextTypes: 3, heldOut: true,
  },
  'a1-live-dialogue': {
    level: 'A1', mode: 'spokenInteraction', implementation: 'planned',
    loreFrame: 'Answer Elira, an innkeeper and a trader aloud about identity, immediate needs, destination and price.',
    trainWith: ['choice dialogue', 'listen-and-repeat', 'conversation repair'],
    assessWith: 'recorded two-turn role-play whose next prompt depends on the learner response',
    minimumForms: 4, minimumTurns: 2, requiresAudioCapture: true, heldOut: true,
  },
  'a1-spoken-portrait': {
    level: 'A1', mode: 'spokenProduction', implementation: 'planned',
    loreFrame: 'Introduce yourself at the guest-room and describe where you live and one person you know.',
    trainWith: ['substitution frames', 'listen-record-replay', 'pronunciation comparison'],
    assessWith: '20–35 second recorded response to a visual prompt, without a completed model beside it',
    minimumForms: 2, minimumSeconds: 20, requiresAudioCapture: true, heldOut: true,
  },
  'a1-written-exchange': {
    level: 'A1', mode: 'writtenInteraction', implementation: 'planned',
    loreFrame: 'Leave and answer short guest-book or messenger-board notes: greeting, location, feeling and thanks.',
    trainWith: ['phrase construction', 'short reply frames'],
    assessWith: 'free typed reply scored for communicative intent, not exact-string identity',
    minimumForms: 3, minimumWords: 8, heldOut: true,
  },
  'a1-free-writing': {
    level: 'A1', mode: 'writtenProduction', implementation: 'planned',
    loreFrame: 'Write a short note naming yourself, a familiar person, a place and an immediate need.',
    trainWith: ['focus spelling', 'whole phrase recall', 'sentence recombination'],
    assessWith: 'free typed 3-sentence note scored with a short criterion rubric',
    minimumForms: 2, minimumWords: 20, heldOut: true,
  },
  'a1-simple-relay': {
    level: 'A1', mode: 'mediation', implementation: 'planned',
    loreFrame: 'Tell Elira the time, place or price written on a short inn or market notice.',
    trainWith: ['information matching', 'time, place and price phrases'],
    assessWith: 'select or produce the required fact for a character who cannot see the source',
    minimumForms: 3, heldOut: true,
  },
  'a2-unseen-listening': {
    level: 'A2', mode: 'listening', implementation: 'planned',
    loreFrame: 'Follow new market, weather, road, feast and lodging messages from traders, travellers and the town crier.',
    trainWith: ['tiered listening construction', 'continuous phrase audio', 'gist-before-detail practice'],
    assessWith: 'held-out short messages and announcements with separate main-point and detail questions',
    minimumForms: 24, minimumVoices: 3, minimumTopicFamilies: 6, heldOut: true,
  },
  'a2-unseen-reading': {
    level: 'A2', mode: 'reading', implementation: 'planned',
    loreFrame: 'Use new inn tariffs, stall lists, route notices, invitations, personal letters and appointment notes to act in the world.',
    trainWith: ['story reading', 'scan-for-information tasks', 'short correspondence'],
    assessWith: 'held-out texts requiring gist and predictable fact retrieval without word glosses',
    minimumForms: 24, minimumTextTypes: 6, heldOut: true,
  },
  'a2-live-dialogue': {
    level: 'A2', mode: 'spokenInteraction', implementation: 'planned',
    loreFrame: 'Resolve a purchase, room request, route problem, healer visit, invitation and changed meeting plan aloud.',
    trainWith: ['branching intent practice', 'repair phrases', 'slot recombination'],
    assessWith: 'recorded 4–6 turn role-play with at least one unpredictable but supportive follow-up',
    minimumForms: 6, minimumTurns: 4, requiresAudioCapture: true, heldOut: true,
  },
  'a2-spoken-portrait': {
    level: 'A2', mode: 'spokenProduction', implementation: 'planned',
    loreFrame: 'At a guest supper, describe family, home, work or learned craft, daily routine and one recent journey or event.',
    trainWith: ['sentence frames', 'connector practice', 'past/present/future recombination', 'record-and-replay'],
    assessWith: '45–75 second recorded series of simple connected sentences from a fresh prompt',
    minimumForms: 3, minimumSeconds: 45, requiresAudioCapture: true, heldOut: true,
  },
  'a2-written-exchange': {
    level: 'A2', mode: 'writtenInteraction', implementation: 'planned',
    loreFrame: 'Exchange courier notes about news, feelings, needs, apology and a meeting whose time or place changes.',
    trainWith: ['message reconstruction', 'multiple acceptable replies', 'conversation repair'],
    assessWith: 'free typed exchange with a responsive second turn and no displayed full-answer translation',
    minimumForms: 4, minimumWords: 25, heldOut: true,
  },
  'a2-free-writing': {
    level: 'A2', mode: 'writtenProduction', implementation: 'planned',
    loreFrame: 'Write Elira or an innkeeper a short connected account of what happened, the present problem and what should happen next.',
    trainWith: ['guided paragraph assembly', 'connectors', 'past/present/future sequencing'],
    assessWith: 'free typed 50–80 word note using simple connectors; meaning is scored independently from form accuracy',
    minimumForms: 3, minimumWords: 50, heldOut: true,
  },
  'a2-practical-relay': {
    level: 'A2', mode: 'mediation', implementation: 'planned',
    loreFrame: 'Relay a healer’s instruction, crier’s announcement or traveller’s route warning, then help two characters agree on the practical next step.',
    trainWith: ['identify the main point', 'fact selection', 'ask-for-repetition and agreement phrases'],
    assessWith: 'held-out source followed by a concise relay and one collaborative response',
    minimumForms: 4, heldOut: true,
  },
})

// Honest inventory of the evidence already implemented. Partial evidence can
// prepare learners for a CEFR outcome but cannot open a level gate.
export const CURRENT_CEFR_EVIDENCE = deepFreeze({
  groundedPracticalCurriculum: {
    status: 'implemented',
    proof: ['EVERYDAY_CORE_SENSE_IDS', 'EVERYDAY_PHRASE_DRILLS', 'EVERYDAY_CAN_DO_GROUPS'],
    limitation: 'Coverage and story grounding do not demonstrate transfer to an unfamiliar task.',
  },
  stagedPhraseRetrieval: {
    status: 'implemented',
    proof: ['PHRASE_STAGE_DEFINITIONS', 'TRAIN_EXERCISE_FAMILIES'],
    limitation: 'All answers are tied to a known reviewed word or phrase.',
  },
  continuousPhraseListening: {
    status: 'implemented',
    proof: ['playPhrase', 'public/audio'],
    limitation: 'The current phrase bank uses one synthetic voice and has no held-out message or announcement assessment.',
  },
  reviewedSurfacePractice: {
    status: 'implemented',
    proof: ['buildFormInventory', 'NOUN_FORMS'],
    limitation: 'Reviewed surfaces support form learning but do not by themselves prove generative grammatical control.',
  },
  unseenListeningAndReading: {
    status: 'missing', proof: [],
    limitation: 'No assessment bank is held out from story and Train exposure.',
  },
  openWrittenProduction: {
    status: 'missing', proof: [],
    limitation: 'Typed practice expects a known answer rather than a learner-authored connected message.',
  },
  spokenInteractionAndProduction: {
    status: 'missing', proof: [],
    limitation: 'The browser does not capture or evaluate learner speech.',
  },
  mediationTasks: {
    status: 'missing', proof: [],
    limitation: 'No task asks the learner to relay unseen information for another character or collaborate from it.',
  },
})

const criterionRubric = deepFreeze({
  dimensions: ['taskFulfilment', 'comprehensibility', 'range', 'control', 'cohesion'],
  scale: [0, 1, 2, 3],
  passFloorEachDimension: 2,
  criticalDimensions: ['taskFulfilment', 'comprehensibility'],
})

export const CEFR_LEVEL_GATES = deepFreeze({
  A1: {
    prerequisite: null,
    requiredModes: CEFR_MODES.map(({ id }) => id),
    nonCompensatory: true,
    reception: { minimumAccuracy: 0.8, minimumDistinctWindows: 2, minimumFormsPerWindow: 6 },
    performance: { ...criterionRubric, minimumPassingTasksPerMode: 2 },
    pronunciation: {
      requirement: 'Familiar words and phrases are intelligible to a supportive listener; a content transcript alone is insufficient evidence.',
      minimumPassingRecordings: 3,
    },
  },
  A2: {
    prerequisite: 'A1',
    requiredModes: CEFR_MODES.map(({ id }) => id),
    nonCompensatory: true,
    reception: { minimumAccuracy: 0.8, minimumDistinctWindows: 2, minimumFormsPerWindow: 12, requireGistAndDetail: true },
    performance: { ...criterionRubric, minimumPassingTasksPerMode: 3 },
    pronunciation: {
      requirement: 'Everyday speech is generally intelligible; the listener may occasionally need repetition. A content transcript alone is insufficient evidence.',
      minimumPassingRecordings: 5,
    },
  },
})

export const CEFR_PRODUCT_CLAIMS = deepFreeze({
  current: 'A1 foundations with emerging A2 coverage; no completed CEFR level is yet evidenced across all modes.',
  afterInternalGates: 'A1-ready or A2-ready, reported as a seven-mode profile.',
  certificationBoundary: 'Do not market a certified CEFR level until Albanian tasks, rubrics and cut scores have received native-speaker review, piloting and external standard-setting.',
})

export const CEFR_EVIDENCE_VERSION = 1

export function cefrImplementationStatus(level) {
  const outcomes = CEFR_LEVEL_OUTCOMES[level] || []
  const families = outcomes.flatMap(({ taskFamilies }) => taskFamilies)
  if (!families.length) return 'undefined'
  return families.every((id) => CEFR_CAPSTONE_TASK_FAMILIES[id]?.implementation === 'implemented')
    ? 'implemented'
    : 'planned'
}

const passingRubric = (rubric, gate) => gate.dimensions.every((dimension) =>
  Number(rubric?.[dimension]) >= gate.passFloorEachDimension)

const distinctByVariant = (events) => {
  const byVariant = new Map()
  for (const event of events) {
    if (!event?.taskFamily || !event?.variantId) continue
    const key = `${event.taskFamily}:${event.variantId}`
    if (byVariant.has(key)) continue
    byVariant.set(key, event)
  }
  return [...byVariant.values()]
}

/**
 * Evaluate a proposed capstone evidence ledger against the product gates.
 *
 * Evidence records are intentionally small and local-first:
 * `{ level, mode, taskFamily, variantId, windowId, heldOut, correct, rubric,
 *    pronunciationPass }`.
 *
 * Planned task families block the real gate. Tests and the future capstone can
 * supply `implementationByTask` to exercise the evaluator or mark a shipped
 * family without creating a second set of gate thresholds.
 */
export function evaluateCefrLevel(level, evidence = [], {
  achievedLevels = [],
  implementationByTask = {},
} = {}) {
  const outcomes = CEFR_LEVEL_OUTCOMES[level] || []
  const gate = CEFR_LEVEL_GATES[level]
  if (!gate) return { level, passed: false, reason: 'undefined-level', modes: {} }

  const prerequisiteMet = !gate.prerequisite || achievedLevels.includes(gate.prerequisite)
  const modes = {}
  for (const mode of gate.requiredModes) {
    const taskIds = outcomes.filter((outcome) => outcome.mode === mode)
      .flatMap((outcome) => outcome.taskFamilies)
    const implementationReady = taskIds.length > 0 && taskIds.every((taskId) =>
      (implementationByTask[taskId] ?? CEFR_CAPSTONE_TASK_FAMILIES[taskId]?.implementation) === 'implemented')
    const attempts = (Array.isArray(evidence) ? evidence : []).filter((event) =>
      event?.level === level && event.mode === mode && event.heldOut === true && taskIds.includes(event.taskFamily))

    if (mode === 'listening' || mode === 'reading') {
      const windows = new Map()
      for (const event of distinctByVariant(attempts)) {
        if (!event.windowId) continue
        const list = windows.get(event.windowId) || []
        list.push(event)
        windows.set(event.windowId, list)
      }
      const passingWindows = [...windows.entries()].filter(([, rows]) => {
        if (rows.length < gate.reception.minimumFormsPerWindow) return false
        if (gate.reception.requireGistAndDetail) {
          const kinds = new Set(rows.map(({ questionKind }) => questionKind))
          if (!kinds.has('gist') || !kinds.has('detail')) return false
        }
        return rows.filter(({ correct }) => correct === true).length / rows.length >= gate.reception.minimumAccuracy
      }).map(([windowId]) => windowId)
      modes[mode] = {
        passed: implementationReady && passingWindows.length >= gate.reception.minimumDistinctWindows,
        implementationReady,
        passingWindows,
      }
      continue
    }

    const passingTasks = distinctByVariant(attempts).filter((event) => passingRubric(event.rubric, gate.performance))
    modes[mode] = {
      passed: implementationReady && passingTasks.length >= gate.performance.minimumPassingTasksPerMode,
      implementationReady,
      passingTasks: passingTasks.map(({ variantId }) => variantId),
    }
  }

  const pronunciationPasses = distinctByVariant((Array.isArray(evidence) ? evidence : []).filter((event) =>
    event?.level === level && event.heldOut === true &&
    ['spokenInteraction', 'spokenProduction'].includes(event.mode) && event.pronunciationPass === true))
  const pronunciationMet = pronunciationPasses.length >= gate.pronunciation.minimumPassingRecordings
  const allModesMet = gate.requiredModes.every((mode) => modes[mode]?.passed)
  return {
    level,
    passed: prerequisiteMet && allModesMet && pronunciationMet,
    prerequisiteMet,
    allModesMet,
    pronunciationMet,
    modes,
  }
}
