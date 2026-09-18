import { STORY, lineOf, w, wf, p, lekTokens } from './content.js'
import { BREAD_PRICE } from './economy.js'
import { albanianTextOf } from './language.js'
import { canonicalPlayerActionId } from './playerActionRuntime.js'
import { evaluateControlledSelections } from './controlledResponses.js'
import { rendezvousDueClock, rendezvousSpecOf } from './stateMechanics.js'

export const STORY_LEARNING_VERSION = 1
const digest = (value) => {
  let left = 2166136261
  let right = 5381
  for (const char of value) {
    left = Math.imul(left ^ char.charCodeAt(0), 16777619) >>> 0
    right = (Math.imul(right, 33) ^ char.charCodeAt(0)) >>> 0
  }
  return left.toString(16).padStart(8, '0') + right.toString(16).padStart(8, '0')
}
const optionalAudio = (id, al) => ({ key: `${id}@${digest(al)}`, al, optional: true })
const choice = (id, tokens) => ({ id, tokens, label: albanianTextOf(tokens) })
const question = (id, prompt, choices, correctId) => ({
  id, prompt, choices, acceptedChoiceIds: [correctId], options: choices, correctId,
})

// These reused, public scenes exercise a precise skill. They cannot issue
// held-out assessment evidence, vocabulary proofs, tokens or overall CEFR status.
export const STORY_LEARNING_ENCOUNTERS = Object.freeze([
  {
    id: 'market-bread-price', version: 1, nodeId: 'tregtari',
    title: 'Read the price', instruction: 'Choose the price of one bread.',
    levelAlignment: 'A1', mode: 'reading', preparationMechanicIds: ['a1-read-and-act'],
    capstoneFamilyIds: ['a1-unseen-reading'], capstoneEligible: false,
    sourceSlots: [['bread-price']],
    actions: [{ id: 'tregtari:blej-buke', to: 'blerjaBuke' }],
    questions: [question('price', 'Sa kushton një bukë?', [
      choice(`amount-${BREAD_PRICE}`, lekTokens(BREAD_PRICE)),
      choice('amount-200', lekTokens(200)), choice('amount-300', lekTokens(300)),
    ], `amount-${BREAD_PRICE}`)],
    feedbackEnglish: `One bread costs ${BREAD_PRICE} lek.`,
  },
  {
    id: 'guest-bread-request', version: 1, nodeId: 'sofraMikut2',
    title: 'Listen or read the request', instruction: 'Choose what the guest is asking for.',
    levelAlignment: 'A1', mode: 'supported-reading-response', alwaysSupported: true,
    preparationMechanicIds: ['a1-choice-dialogue', 'a1-audio-meaning'],
    capstoneFamilyIds: [], capstoneEligible: false,
    sourceSlots: [['request-unknown', 'request-known']],
    actions: [{ id: 'story:sofra-mikut2:po_yes-merr', to: 'sofraMikut2' }],
    audio: optionalAudio('guest-bread-request:v1:request', 'më jep bukën, të lutem.'),
    questions: [question('requestedObject', 'What is he asking for?', [
      choice('bread', [wf('buke', 'bukën')]), choice('salt', [wf('kripe', 'kripën')]),
      choice('water', [wf('uje', 'ujin')]),
    ], 'bread')],
    feedbackEnglish: 'He asked for the bread.',
  },
  {
    id: 'guest-water-news', version: 1, nodeId: 'sofraMikut2',
    title: 'Understand the news', instruction: 'Choose the reported problem and Elira’s advice.',
    levelAlignment: 'A2', mode: 'reading',
    preparationMechanicIds: ['a2-gist-detail', 'a2-scan-information'],
    capstoneFamilyIds: ['a2-unseen-reading'], capstoneEligible: false,
    sourceSlots: [
      ['news-unknown', 'news-known', 'news-restored-unknown', 'news-restored-known'],
      ['elder-knows', 'elder-knows-restored'], ['traveller-advice'], ['elira-advice'],
    ],
    actions: [
      { id: 'soframikut2:nuk-jam-dakord-mendoj-se-duhet-te-subj-pyet-plake', to: 'sofraVendimPlaka' },
      { id: 'soframikut2:po-yes-jam-dakord', to: 'sofraVendimPusi' },
    ],
    questions: [
      question('problem', 'What problem did the traveller hear about?', [
        choice('water-blocked', [wf('kulshedra', 'Kulshedra'), w('e_obj'), w('ka'), wf('kap', 'zënë'), wf('uje', 'ujin'), p('.')]),
        choice('road-closed', [wf('rruge', 'Rruga'), w('eshte'), w('mbyllur'), p('.')]),
        choice('well-full', [wf('pus', 'Pusi'), w('ka'), w('uje'), p('.')]),
      ], 'water-blocked'),
      question('adviser', 'Who does Elira suggest asking first?', [
        choice('village-elder', [wf('plake', 'plakën'), w('e_link'), wf('fshat', 'fshatit')]),
        choice('traveller', [wf('udhetar', 'udhëtarin')]), choice('trader', [wf('tregtar', 'tregtarin')]),
      ], 'village-elder'),
    ],
    feedbackEnglish: 'The traveller heard that the Kulshedra has seized the water. Elira suggests asking the village’s old woman first. Either opinion remains your choice.',
  },
  {
    id: 'elira-later-meeting', version: 1, nodeId: 'bisedaKroi',
    title: 'Confirm the plan', instruction: 'Confirm when and where you will meet.',
    levelAlignment: 'A2', mode: 'reading-application', difficultyClaim: 'controlled-two-constraint',
    preparationMechanicIds: ['a2-branching-repair', 'a2-scan-information'],
    capstoneFamilyIds: ['a2-unseen-reading'], capstoneEligible: false,
    sourceSlots: [['proposal-unknown', 'proposal-known']],
    actions: [{ id: 'bisedakroi:po-yes-neser-ne-ore-nente-ne-shesh', to: 'start' }],
    questions: [
      question('dayTime', 'When will you meet?', [
        choice('tomorrow-nine', [w('neser'), w('ne'), wf('ore', 'orën'), w('nente')]),
        choice('today-nine', [w('sot'), w('ne'), wf('ore', 'orën'), w('nente')]),
        choice('tomorrow-seven', [w('neser'), w('ne'), wf('ore', 'orën'), w('shtate')]),
      ], 'tomorrow-nine'),
      question('place', 'Where will you meet?', [
        choice('square', [w('ne'), w('shesh')]), choice('bridge', [wf('tek', 'te'), wf('ure', 'ura')]),
        choice('well', [wf('tek', 'te'), wf('pus', 'pusi')]),
      ], 'square'),
    ],
    feedbackEnglish: 'She proposed tomorrow at nine in the square.',
  },
].map((entry) => Object.freeze({ ...entry,
  sourceIds: entry.sourceSlots.flat(), minimumSourceLines: entry.sourceSlots.length,
})))

export const STORY_LEARNING_BY_ID = Object.freeze(Object.fromEntries(
  STORY_LEARNING_ENCOUNTERS.map((entry) => [entry.id, entry]),
))
export const STORY_LEARNING_SUPPORT_IDS = Object.freeze([
  'word-help', 'printed-request', 'correction', 'legacy-source', 'debug-reading',
])
const record = (value) => value !== null && typeof value === 'object' &&
  (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null)
const count = (value) => Number.isSafeInteger(value) && value >= 0 ? value : 0
const supportIdsOf = (value) => Array.isArray(value)
  ? [...new Set(value.filter((id) => STORY_LEARNING_SUPPORT_IDS.includes(id)))] : []
const addSupport = (ids, id) => [...new Set([...ids, id])]
export const emptyStoryLearningState = () => ({
  storyLearningVersion: STORY_LEARNING_VERSION, storyLearningEvidence: {}, storyLearningScene: null,
})

export function storyLearningBindingForOption(state, option) {
  const entry = STORY_LEARNING_BY_ID[option?.learningEncounter]
  return entry && entry.nodeId === state.nodeId && STORY[state.nodeId]?.options?.includes(option) &&
    entry.actions.some((action) => action.id === canonicalPlayerActionId(state.nodeId, option) && action.to === option.to)
    ? entry : null
}

export function storyLearningSourceForLine(state, line) {
  const source = line?.storyLearningSource
  const entry = STORY_LEARNING_BY_ID[source?.encounterId]
  return entry?.nodeId === state.nodeId && entry.sourceIds.includes(source.sourceId) &&
    STORY[state.nodeId].text.some((authored) => lineOf(authored) === line)
    ? source : null
}

// A stable source ID names one authored sentence, even across mutually
// exclusive variants. Count alone cannot establish a complete passage.
export function storyLearningSourceIds(entry, sourceLines) {
  const slots = entry?.sourceSlots
  if (!Array.isArray(slots) || !slots.length || slots.some((slot) =>
    !Array.isArray(slot) || !slot.length || slot.some((id) => typeof id !== 'string' || !id))) return null
  const ids = slots.flat()
  if (!Array.isArray(entry.sourceIds) || new Set(ids).size !== ids.length || ids.length !== entry.sourceIds.length ||
      ids.some((id, index) => id !== entry.sourceIds[index])) return null
  const authored = STORY[entry.nodeId]?.text.map(lineOf)
    .filter((line) => line.storyLearningSource?.encounterId === entry.id) || []
  const authoredIds = authored.map((line) => line.storyLearningSource.sourceId)
  if (authoredIds.length !== ids.length || new Set(authoredIds).size !== ids.length ||
      authoredIds.some((id) => !ids.includes(id))) return null
  if (!Array.isArray(sourceLines) || sourceLines.length !== slots.length ||
      sourceLines.some((line, index) => !authored.includes(line) ||
        !slots[index].includes(line.storyLearningSource?.sourceId))) return null
  return sourceLines.map((line) => line.storyLearningSource.sourceId)
}

// Automatic, narrow binding identity: no manual seal and no whole-world hash.
// An edited source, response choice, audio surface or bound action invalidates
// only that encounter's old permission. No saved record contains this prose.
export function storyLearningSourceSignature(nodeId) {
  return digest(JSON.stringify(STORY[nodeId]?.text.filter((entry) => lineOf(entry).storyLearningSource)
    .map((entry) => ({ source: lineOf(entry).storyLearningSource, entry })) || []))
}
export function storyLearningBindingSignature(entry, boundOptions) {
  return digest(JSON.stringify({
    sources: STORY[entry.nodeId].text.filter((authored) =>
      lineOf(authored).storyLearningSource?.encounterId === entry.id)
      .map((authored) => ({ source: lineOf(authored).storyLearningSource, authored })),
    questions: entry.questions.map(({ id, prompt, choices, acceptedChoiceIds }) =>
      ({ id, prompt, choices, acceptedChoiceIds })),
    sourceSlots: entry.sourceSlots, audio: entry.audio || null, boundOptions,
  }))
}

// Context values are recomputed from the live canonical option. A content edit
// invalidates a stale permission; neither a caller nor a receipt owns a price
// or a rendezvous. Unsupported future variants fail closed until authored.
export function storyLearningContext(state, entry, boundOptions, sourceLines) {
  if (!entry || boundOptions.length !== entry.actions.length) return null
  const sourceIds = storyLearningSourceIds(entry, sourceLines)
  if (!sourceIds) return null
  let objective
  if (entry.id === 'market-bread-price') {
    const option = boundOptions[0]
    if (option.lek !== -BREAD_PRICE || option.grant !== 'buke') return null
    objective = `bread:${-option.lek}`
  } else if (entry.id === 'guest-bread-request') {
    // Visibility and the action's exclusions use canonical hasCond, including
    // legacy saved flags. Do not duplicate that authority with raw flag reads.
    objective = 'served-bread-request'
  } else if (entry.id === 'guest-water-news') {
    objective = 'reported-water:elira-elder-first'
  } else {
    const plan = rendezvousSpecOf(boundOptions[0])
    if (!plan || plan.id !== 'eliraSquare' || plan.npcId !== 'elira' || plan.kind !== 'meeting' ||
        plan.atHour !== 9 || plan.dayOffset !== 1 || plan.placeId !== 'fshatiSheshi') return null
    const dueAtClock = rendezvousDueClock(state.clock, plan)
    if (dueAtClock == null) return null
    objective = JSON.stringify([dueAtClock, plan.id, plan.npcId, plan.placeId,
      plan.atHour, plan.dayOffset, plan.graceHours, plan.leaveAfterHours])
  }
  return `${entry.id}:v${entry.version}:${storyLearningBindingSignature(entry, boundOptions)}:${objective}:${JSON.stringify(sourceIds)}`
}

export function storyLearningSceneMatches(state, scene = state.storyLearningScene) {
  return record(scene) && scene.run === state.storyRunSequence && scene.nodeId === state.nodeId && scene.turn === state.turn
}
const attemptIdFor = (state, entry, attempt) =>
  `${entry.id}:v${entry.version}:r${state.storyRunSequence}:t${state.turn}:a${attempt}`

function normalizedEvidenceEntry(raw, entry) {
  if (!record(raw) || raw.version !== entry.version) return { version: entry.version, started: 0, attempts: 0,
    correct: 0, independentCorrect: 0, supportedCorrect: 0, audioCompletions: 0, supportIds: [], firstResult: null }
  const attempts = count(raw.attempts)
  const correct = Math.min(attempts, count(raw.correct))
  const first = raw.firstResult
  const firstResult = record(first) && first.version === entry.version &&
    Number.isSafeInteger(first.run) && first.run > 0 && Number.isSafeInteger(first.turn) && first.turn > 0 &&
    typeof first.contextKey === 'string' && first.contextKey.startsWith(`${entry.id}:v${entry.version}:`) &&
    typeof first.correct === 'boolean' && ['independent', 'supported', 'practice'].includes(first.mode)
    ? { version: entry.version, run: first.run, turn: first.turn, contextKey: first.contextKey,
        correct: first.correct, mode: entry.alwaysSupported ? 'supported' : first.mode } : null
  return { version: entry.version, started: Math.max(attempts, count(raw.started)), attempts, correct,
    independentCorrect: entry.alwaysSupported ? 0 : Math.min(correct, count(raw.independentCorrect), firstResult?.mode === 'independent' && firstResult.correct ? 1 : 0),
    supportedCorrect: Math.min(correct, count(raw.supportedCorrect)), audioCompletions: entry.audio ? count(raw.audioCompletions) : 0,
    supportIds: supportIdsOf(raw.supportIds), firstResult }
}

export function normalizeStoryLearningEvidence(saved) {
  const evidence = {}
  for (const entry of STORY_LEARNING_ENCOUNTERS) {
    const raw = saved?.storyLearningEvidence?.[entry.id]
    // Older visited maps reset with the world. Their absence cannot prove a
    // learner never saw a glossed source in a previous run.
    const legacy = saved?.storyLearningVersion !== STORY_LEARNING_VERSION
    if (!raw && !legacy) continue
    evidence[entry.id] = normalizedEvidenceEntry(raw, entry)
    if (legacy) evidence[entry.id].supportIds = addSupport(evidence[entry.id].supportIds, 'legacy-source')
  }
  return evidence
}

export function storyLearningEpisode(state, entry, contextKey) {
  const scene = state.storyLearningScene
  if (!storyLearningSceneMatches(state, scene) || !record(scene.episodes)) return null
  const raw = scene.episodes[entry.id]
  const evidence = normalizedEvidenceEntry(state.storyLearningEvidence?.[entry.id], entry)
  if (!record(raw) || raw.version !== entry.version || raw.contextKey !== contextKey ||
      !Number.isSafeInteger(raw.attempt) || raw.attempt < 1 || raw.attempt > evidence.started ||
      raw.attemptId !== attemptIdFor(state, entry, raw.attempt) ||
      !['answering', 'feedback', 'complete'].includes(raw.phase)) return null
  const ownSupportIds = supportIdsOf(raw.supportIds)
  if (ownSupportIds.length !== raw.supportIds?.length) return null
  const supportIds = [...new Set([...ownSupportIds, ...evidence.supportIds])]
  if (entry.alwaysSupported && !supportIds.includes('printed-request')) return null
  const audioCompletions = entry.audio && record(raw.audioCompletions)
    ? { [entry.audio.key]: count(raw.audioCompletions[entry.audio.key]) } : {}
  let result = null
  if (raw.phase !== 'answering') {
    const verdict = evaluateControlledSelections(entry.questions, raw.result?.selections)
    if (!verdict.valid || verdict.correct !== (raw.phase === 'complete') ||
        raw.result?.correct !== verdict.correct) return null
    result = { correct: verdict.correct, selections: { ...raw.result.selections },
      incorrectIds: verdict.incorrectIds, feedbackEnglish: entry.feedbackEnglish }
  }
  const previousSelections = {}
  if (supportIds.includes('correction') && evidence.attempts > 0 && record(raw.previousSelections)) for (const q of entry.questions) {
    if (q.acceptedChoiceIds.includes(raw.previousSelections[q.id])) previousSelections[q.id] = raw.previousSelections[q.id]
  }
  return { version: entry.version, contextKey, attempt: raw.attempt, attemptId: raw.attemptId,
    phase: raw.phase, supported: supportIds.length > 0, supportIds, audioCompletions, result, previousSelections }
}

const storedEpisode = ({ supported: _supported, ...episode }) => ({
  ...episode,
  result: episode.result ? { correct: episode.result.correct, selections: episode.result.selections } : null,
})

export function normalizeStoryLearningScene(state, savedScene, resolveTask) {
  if (!storyLearningSceneMatches(state, savedScene) || !record(savedScene.episodes)) return null
  const candidate = { ...state, storyLearningScene: savedScene }
  const episodes = {}
  for (const entry of STORY_LEARNING_ENCOUNTERS) {
    if (entry.nodeId !== state.nodeId) continue
    const task = resolveTask(candidate, entry.id)
    if (task?.episode) episodes[entry.id] = storedEpisode(task.episode)
  }
  if (!Object.keys(episodes).length) return null
  return { run: state.storyRunSequence, nodeId: state.nodeId, turn: state.turn,
    activeEncounterId: episodes[savedScene.activeEncounterId] ? savedScene.activeEncounterId : null, episodes }
}

export function storyLearningSourceActionMatches(state, action) {
  return action.fromNodeId === state.nodeId && action.fromTurn === state.turn &&
    action.fromRun === state.storyRunSequence && state.view === 'story' &&
    state.hearts > 0 && !state.ended && !state.timePassage && !state.pendingEmbodiment
}

export function reduceStoryLearning(state, action, task) {
  if (!task?.sourceAvailable || action.encounterId !== task.id || !task.contextKey ||
      !storyLearningSourceActionMatches(state, action)) return state
  if (action.type === 'SUBMIT_STORY_LEARNING' && !task.availability.ok) return state
  const entry = STORY_LEARNING_BY_ID[task.id]
  let evidence = normalizedEvidenceEntry(state.storyLearningEvidence?.[entry.id], entry)
  let episode = task.episode
  const scene = storyLearningSceneMatches(state) ? state.storyLearningScene : {
    run: state.storyRunSequence, nodeId: state.nodeId, turn: state.turn, activeEncounterId: null, episodes: {},
  }
  if (action.type === 'BEGIN_STORY_LEARNING') {
    if (action.supportId != null && action.supportId !== 'word-help') return state
    if (!episode || episode.phase === 'feedback') {
      const supportIds = [...new Set([...evidence.supportIds, ...(episode?.supportIds || []),
        ...(entry.alwaysSupported ? ['printed-request'] : []), ...(state.debug ? ['debug-reading'] : [])])]
      evidence = { ...evidence, started: evidence.started + 1 }
      const previousSelections = {}
      for (const q of entry.questions) if (q.acceptedChoiceIds.includes(episode?.result?.selections[q.id])) {
        previousSelections[q.id] = episode.result.selections[q.id]
      }
      episode = { version: entry.version, contextKey: task.contextKey, attempt: evidence.started,
        attemptId: attemptIdFor(state, entry, evidence.started), phase: 'answering',
        supportIds, audioCompletions: {}, result: null, previousSelections }
    }
    if (action.supportId) episode = { ...episode, supportIds: addSupport(episode.supportIds, action.supportId) }
  } else {
    if (!episode || action.attemptId !== episode.attemptId || scene.activeEncounterId !== entry.id) return state
    if (action.type === 'CLOSE_STORY_LEARNING') return { ...state, storyLearningScene: { ...scene, activeEncounterId: null } }
    if (action.type === 'REVEAL_STORY_LEARNING_SUPPORT') {
      if (action.supportId !== 'word-help' || episode.supportIds.includes(action.supportId)) return state
      episode = { ...episode, supportIds: addSupport(episode.supportIds, action.supportId) }
    } else if (action.type === 'STORY_LEARNING_AUDIO_COMPLETE') {
      if (!entry.audio || action.audioKey !== entry.audio.key || episode.audioCompletions[entry.audio.key]) return state
      episode = { ...episode, audioCompletions: { ...episode.audioCompletions,
        [entry.audio.key]: (episode.audioCompletions[entry.audio.key] || 0) + 1 } }
      evidence = { ...evidence, audioCompletions: evidence.audioCompletions + 1 }
    } else if (action.type === 'SUBMIT_STORY_LEARNING') {
      if (episode.phase !== 'answering' || !record(action.response) ||
          Reflect.ownKeys(action.response).length !== 1 || !Object.hasOwn(action.response, 'selections')) return state
      const responseDescriptor = Object.getOwnPropertyDescriptor(action.response, 'selections')
      if (!responseDescriptor || !Object.hasOwn(responseDescriptor, 'value')) return state
      const selections = responseDescriptor.value
      const verdict = evaluateControlledSelections(entry.questions, selections)
      if (!verdict.valid) return state
      const supported = episode.supportIds.length > 0 || state.debug
      const mode = supported ? 'supported' : evidence.firstResult ? 'practice' : 'independent'
      const firstResult = evidence.firstResult || { version: entry.version, run: state.storyRunSequence,
        turn: state.turn, contextKey: task.contextKey, correct: verdict.correct, mode }
      evidence = { ...evidence, firstResult, attempts: evidence.attempts + 1,
        correct: evidence.correct + Number(verdict.correct),
        independentCorrect: evidence.independentCorrect + Number(verdict.correct && mode === 'independent'),
        supportedCorrect: evidence.supportedCorrect + Number(verdict.correct && mode === 'supported') }
      episode = { ...episode, phase: verdict.correct ? 'complete' : 'feedback',
        supportIds: verdict.correct ? episode.supportIds : addSupport(episode.supportIds, 'correction'),
        result: { correct: verdict.correct, selections: { ...selections } } }
    } else return state
  }
  evidence = { ...evidence, supportIds: [...new Set([...evidence.supportIds, ...episode.supportIds])] }
  return { ...state, storyLearningVersion: STORY_LEARNING_VERSION,
    storyLearningEvidence: { ...state.storyLearningEvidence, [entry.id]: evidence },
    storyLearningScene: { ...scene, activeEncounterId: entry.id,
      episodes: { ...scene.episodes, [entry.id]: storedEpisode(episode) } } }
}

// A same-place action may leave another completed reading intact. Revalidate
// its exact source and objective before rebinding only that permission to the
// new turn. Pending answers and the action's own encounter always expire.
export function carryCompletedStoryLearning(previous, next, chosenEncounterId, resolveTask) {
  if (previous.nodeId !== next.nodeId || previous.storyRunSequence !== next.storyRunSequence ||
      !storyLearningSceneMatches(previous)) return next
  const episodes = {}
  for (const entry of STORY_LEARNING_ENCOUNTERS) {
    if (entry.nodeId !== next.nodeId || entry.id === chosenEncounterId) continue
    const before = resolveTask(previous, entry.id)
    if (before?.episode?.phase !== 'complete') continue
    const after = resolveTask(next, entry.id)
    if (!after?.availability.ok || before.contextKey !== after.contextKey ||
        before.sourceLines.length !== after.sourceLines.length ||
        before.sourceLines.some((line, index) => line !== after.sourceLines[index])) continue
    episodes[entry.id] = storedEpisode({ ...before.episode,
      attemptId: attemptIdFor(next, entry, before.episode.attempt) })
  }
  return Object.keys(episodes).length ? { ...next, storyLearningScene: {
    run: next.storyRunSequence, nodeId: next.nodeId, turn: next.turn, activeEncounterId: null, episodes,
  } } : next
}

export function recordStoryLearningDebugSupport(state) {
  const entries = STORY_LEARNING_ENCOUNTERS.filter((entry) => entry.nodeId === state.nodeId)
  if (!entries.length) return state
  const evidence = { ...state.storyLearningEvidence }
  let scene = state.storyLearningScene
  for (const entry of entries) {
    const prior = normalizedEvidenceEntry(evidence[entry.id], entry)
    evidence[entry.id] = { ...prior, supportIds: addSupport(prior.supportIds, 'debug-reading') }
    if (storyLearningSceneMatches(state, scene) && scene.episodes?.[entry.id]) {
      const episode = scene.episodes[entry.id]
      scene = { ...scene, episodes: { ...scene.episodes,
        [entry.id]: { ...episode, supportIds: addSupport(supportIdsOf(episode.supportIds), 'debug-reading') } } }
    }
  }
  return { ...state, storyLearningEvidence: evidence, storyLearningScene: scene }
}
