// Player-journey release checks. These exercise the contracts a real first run
// and the anthology endgame depend on, rather than treating graph reachability
// as proof that the learning loop can actually be completed.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { STORY, START_NODE, WORLD_HUB, DICT, ENDINGS, lineOf } from '../src/game/content.js'
import { ACHIEVEMENTS } from '../src/game/achievements.js'
import { testFor } from '../src/game/comprehension.js'
import { englishReadingIssues } from '../src/game/language.js'
import {
  START_CLOCK,
  canChoose,
  canSpeak,
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
} from '../src/game/gameState.js'
import { practiceReturnOption } from '../src/game/practiceReturn.js'
import { trainQuestionWordKeys } from '../src/game/phrasePractice.js'
import { enumerateTrainActivityCandidates } from '../src/game/trainCandidateContract.js'
import {
  TRAIN_ACTION_GOAL_POLICY,
  trainActionGoalEmergencyTargetIds,
  trainActionLastResortProposal,
  trainActionGoalPriorityTargetIds,
  trainActionPracticeQueue,
} from '../src/game/trainActionGoal.js'
import {
  initialTrainPlanningState,
  planTrainFuture,
  transitionTrainPlanningState,
} from '../src/game/trainFuturePlanner.js'
import {
  optionTrainingIdentity,
  resolveTrainingTarget,
  trainingTargetForOption,
} from '../src/game/trainingTarget.js'
import { resolveRevealLine } from '../src/game/revealResolver.js'
import { isOptionRevealed } from '../src/game/revealVisibility.js'
import { optionReadingVisible, storyReadingVisible } from '../src/components/storyMechanicsPresentation.js'

const checks = []
const check = (name, test) => {
  try {
    test()
    checks.push({ name, ok: true })
  } catch (error) {
    checks.push({ name, ok: false, error: error.message })
  }
}

const stateAt = (nodeId, extra = {}) => ({
  nodeId,
  clock: START_CLOCK,
  cameFrom: null,
  cameFromPhase: null,
  familiar: false,
  heard: {},
  rumor: false,
  trail: [],
  discovered: {},
  inventory: {},
  mana: {},
  practiced: {},
  visited: {},
  earned: {},
  eligible: {},
  attempts: {},
  dismissedTests: {},
  pendingTest: null,
  hearts: 3,
  healedAt: {},
  turn: 1,
  fixtures: {},
  npcStarted: {},
  worldFacts: {},
  view: 'story',
  ended: null,
  embodying: null,
  embodimentOriginNode: null,
  embodimentFocusNode: null,
  embodimentWorldNode: null,
  embodimentPaused: false,
  embodimentClock: null,
  embodimentInventorySnapshot: null,
  embodimentInventoryIsolated: null,
  embodimentHeartsSnapshot: null,
  embodimentArrivalSnapshot: null,
  pendingEmbodiment: null,
  timePassage: null,
  debug: false,
  loreFocus: null,
  ...extra,
})

const discover = (state, tokens) => {
  let next = state
  for (const id of phraseSenses(tokens)) next = reducer(next, { type: 'DISCOVER', id })
  return next
}

const trainOnce = (state, tokens) => {
  let next = state
  for (const id of phraseSenses(tokens)) {
    assert.equal(next.discovered[id], true, `practice was offered before '${id}' was discovered`)
    next = reducer(next, { type: 'PRACTICE_CORRECT', id })
  }
  return next
}

check('a fresh learner can discover, train and spend the opening bridge phrase', () => {
  const option = STORY[START_NODE].options.find((candidate) => candidate.to === 'fshatiLumi')
  assert.ok(option && !option.confuser && !option.reveal, 'the visible opening bridge choice disappeared')
  let state = stateAt(START_NODE)
  assert.equal(canSpeak(state, option.text).allDiscovered, false)
  state = discover(state, option.text)
  assert.equal(canSpeak(state, option.text).allDiscovered, true)
  assert.equal(canSpeak(state, option.text).enoughMana, false)
  state = trainOnce(state, option.text)
  assert.equal(canChoose(state, option), true)
  const before = Object.fromEntries(phraseSenses(option.text).map((id) => [id, state.mana[id]]))
  state = reducer(state, {
    type: 'CHOOSE', option, targetNode: STORY[option.to],
    fromNodeId: state.nodeId, fromTurn: state.turn,
  })
  assert.equal(state.nodeId, 'fshatiLumi')
  assert.equal(state.visited.fshatiLumi, true)
  assert.equal(state.turn, 2)
  for (const id of Object.keys(before)) assert.equal(state.mana[id], before[id] - 1, `${id} was not spent once`)
})

check('the opening forest path unlocks from its signpost sentence, not a later forest mention', () => {
  const node = STORY[START_NODE]
  const option = node.options.find((candidate) => candidate.to === 'lendina')
  const resolution = resolveRevealLine(node.text.map(lineOf), option)
  assert.equal(resolution.status, 'selected')
  assert.equal(option.revealOccurrence, 1)
  const ids = phraseSenses(resolution.line)
  assert.ok(ids.includes('pyll') && ids.includes('rruge'), 'the chosen cue is not the forest-road signpost')
  let state = stateAt(START_NODE)
  assert.equal(ids.every((id) => state.discovered[id]), false)
  assert.equal(isOptionRevealed(state, option, node), false)
  assert.equal(
    isOptionRevealed({ ...state, visited: { lendina: true } }, option, node),
    false,
    'a prior visit from another route bypassed this scene\'s undiscovered signpost',
  )
  assert.equal(
    isOptionRevealed({ ...state, cameFrom: 'lendina' }, option, node),
    true,
    'an immediate retreat stopped being available',
  )

  // Knowing and funding the action text alone must not let a stale or forged
  // caller bypass the signpost sentence that the Story screen still hides.
  const actionKnown = discover(state, option.text)
  const hiddenTrainingTarget = trainingTargetForOption(START_NODE, option)
  assert.strictEqual(reducer(actionKnown, {
    type: 'BEGIN_OPTION_TRAINING', target: hiddenTrainingTarget,
  }), actionKnown, 'Train advertised an action before its reveal sentence was known')

  const actionReady = trainOnce(actionKnown, option.text)
  assert.equal(canChoose(actionReady, option), true)
  assert.strictEqual(reducer(actionReady, {
    type: 'CHOOSE', option, targetNode: STORY[option.to],
    fromNodeId: actionReady.nodeId, fromTurn: actionReady.turn,
  }), actionReady, 'the reducer accepted a route before its reveal sentence was known')

  // A real immediate retreat is the sole reveal bypass; it remains usable at
  // the state boundary so the player cannot be stranded after crossing here.
  const retreatReady = { ...actionReady, cameFrom: 'lendina' }
  assert.equal(reducer(retreatReady, {
    type: 'CHOOSE', option, targetNode: STORY[option.to],
    fromNodeId: retreatReady.nodeId, fromTurn: retreatReady.turn,
  }).nodeId, 'lendina')

  state = discover(state, resolution.line)
  assert.equal(ids.every((id) => state.discovered[id]), true)
  assert.equal(isOptionRevealed(state, option, node), true)
  state = discover(state, option.text)
  state = trainOnce(state, option.text)
  assert.equal(canChoose(state, option), true)
  assert.equal(reducer(state, {
    type: 'CHOOSE', option, targetNode: STORY[option.to],
    fromNodeId: state.nodeId, fromTurn: state.turn,
  }).nodeId, 'lendina')
})

check('training recommendations use the same reveal boundary as the Story screen', () => {
  const practiceReturn = readFileSync(new URL('../src/game/practiceReturn.js', import.meta.url), 'utf8')
  const story = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.match(practiceReturn, /isOptionRevealed\(practiceState, option, node\)/)
  assert.match(story, /isOptionRevealed\(storyState, opt, node, lines\)/)
})

check('Train returns only to the exact story option that opened it', () => {
  const node = STORY[START_NODE]
  const greeting = node.options.find((option) => option.to === 'bisedaUra1')
  const bridge = node.options.find((option) => option.to === 'fshatiLumi')
  assert.ok(greeting && bridge, 'opening choices needed by the hand-off test disappeared')

  let state = stateAt(START_NODE)
  state = discover(discover(state, greeting.text), bridge.text)
  assert.equal(canSpeak(state, greeting.text).enoughMana, false)
  assert.equal(canSpeak(state, bridge.text).enoughMana, false)

  const target = trainingTargetForOption(START_NODE, bridge)
  assert.deepEqual(Object.keys(target).sort(), ['nodeId', 'optionIdentity'])
  assert.equal(resolveTrainingTarget(target), bridge)
  state = reducer(state, { type: 'BEGIN_OPTION_TRAINING', target })
  assert.equal(state.view, 'practice')
  assert.deepEqual(state.practiceTarget, target)

  // One practice session can fund several sibling options. Only the option
  // whose own Train button launched the session gets the return affordance.
  state = trainOnce(trainOnce(state, greeting.text), bridge.text)
  assert.equal(canChoose(state, greeting), true)
  assert.equal(canChoose(state, bridge), true)
  assert.equal(practiceReturnOption(state), bridge)

  const restored = normalizeSavedState(JSON.parse(JSON.stringify(state)), stateAt(START_NODE))
  assert.deepEqual(restored.practiceTarget, target, 'an exact practice hand-off did not survive its save')
  assert.equal(practiceReturnOption(restored), bridge)

  const leftPractice = reducer(state, { type: 'SET_VIEW', view: 'dictionary' })
  assert.equal(leftPractice.practiceTarget, null, 'view navigation retained a spent hand-off')
  assert.equal(practiceReturnOption(leftPractice), null)
  const returned = reducer(state, { type: 'SET_VIEW', view: 'story' })
  assert.equal(returned.practiceTarget, null, 'returning to Story retained a spent hand-off')
  const genericPractice = reducer(returned, { type: 'SET_VIEW', view: 'practice' })
  assert.equal(genericPractice.practiceTarget, null, 'the general Train tab inherited an old option')
  assert.equal(practiceReturnOption(genericPractice), null)

  const stale = {
    ...state,
    practiceTarget: { nodeId: START_NODE, optionIdentity: 'option-v1:{"retired":true}' },
  }
  assert.equal(practiceReturnOption(stale), null, 'a stale target fell back to an affordable sibling')
  assert.equal(
    normalizeSavedState(stale, stateAt(START_NODE)).practiceTarget,
    null,
    'save normalization retained a retired target',
  )

  const reset = reducer({ ...state, hearts: 0 }, { type: 'RESET' })
  assert.equal(reset.practiceTarget, null, 'a new run retained the previous option target')

  const practiceSource = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
  const storySource = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.match(practiceSource, /const returnOption = practiceReturnOption\(state\)/)
  assert.doesNotMatch(practiceSource, /const affordable =/)
  assert.match(storySource, /type: 'BEGIN_OPTION_TRAINING'/)
})

check('a zero-token action word preempts caught-up even while ordinarily spaced', () => {
  const option = STORY[START_NODE].options.find((candidate) => candidate.to === 'fshatiLumi')
  const target = trainingTargetForOption(START_NODE, option)
  const discoveredIds = ['kalo', 'ure', 'rruge', 'shtepi', 'uje', 'buke']
  let state = {
    ...newRun(),
    nodeId: START_NODE,
    discovered: Object.fromEntries(discoveredIds.map((id) => [id, true])),
    mana: { kalo: 1 },
    practiced: { kalo: 1, ure: 1 },
    trainRound: 2,
    wordProgress: {
      ure: {
        wins: { 'meaning-recognition': 1 },
        dueAfterRound: 99,
        lastAttemptRound: 1,
        lastAttemptKey: 'ure:prior',
      },
    },
  }
  state = reducer(state, { type: 'BEGIN_OPTION_TRAINING', target })
  assert.equal(state.practiceTarget.optionIdentity, target.optionIdentity)
  state = {
    ...state,
  }
  assert.deepEqual(trainActionGoalPriorityTargetIds(state), ['ure'])
  assert.deepEqual(trainActionGoalEmergencyTargetIds(state), [])

  const enumeration = enumerateTrainActivityCandidates({
    state,
    discoveredIds,
    nowMs: 1,
    forceGoalTargetIds: trainActionGoalPriorityTargetIds(state),
    debugTrace: true,
  })
  const forced = enumeration.proposals.find(({ rewardIds }) => rewardIds.includes('ure'))
  assert.ok(forced, 'due spacing produced caught-up while the requested action still had a zero-token word')
  const question = forced.materialize()
  assert.equal(question.goalEmergency, true)
  state = reducer(state, {
    type: 'PRACTICE_WORD_RESULT',
    correct: true,
    id: question.answerId,
    tier: question.tier,
    mode: question.mode,
    direction: question.dir,
    wordStageId: question.wordStageId,
    variantId: question.variantId,
    targetFormKey: question.targetFormKey,
    aspectTargets: question.aspectTargets,
    questionKey: question.questionKey,
    wordKeys: trainQuestionWordKeys(question),
    attemptedAtMs: 1,
    responseDurationMs: 1000,
  })
  assert.equal(state.mana.ure, 1, 'the forced goal question did not award its real canonical token')
  assert.equal(state.trainGoalSession.progressRounds, 1)
  assert.equal(state.trainGoalSession.activitiesSinceGoalOpportunity, 0)
  assert.equal(practiceReturnOption(state), option)

  const restored = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
  assert.equal(restored.trainGoalSession.activitiesSinceGoalOpportunity, 0,
    'the action-goal service window did not survive reload')
})

check('a blocked requested word uses another saved action before asking for more words', () => {
  const node = STORY[START_NODE]
  const bridge = node.options.find((candidate) => candidate.to === 'fshatiLumi')
  const greeting = node.options.find((candidate) => candidate.to === 'bisedaUra1')
  const discoveredIds = ['kalo', 'ure', 'pershendetje', 'rruge', 'shtepi', 'uje', 'buke']
  let state = {
    ...newRun(),
    nodeId: START_NODE,
    discovered: Object.fromEntries(discoveredIds.map((id) => [id, true])),
    mana: { kalo: 1 },
    practiced: { kalo: 1, ure: 1, pershendetje: 1 },
    trainRound: 3,
    trainLastWords: ['urë'],
    wordProgress: {
      ure: {
        wins: { 'meaning-recognition': 1 }, dueAfterRound: 99,
        lastAttemptRound: 2, lastAttemptKey: 'ure:prior',
      },
      pershendetje: {
        wins: { 'meaning-recognition': 1 }, dueAfterRound: 99,
        lastAttemptRound: 1, lastAttemptKey: 'pershendetje:prior',
      },
    },
  }
  state = reducer(state, {
    type: 'BEGIN_OPTION_TRAINING',
    target: trainingTargetForOption(START_NODE, bridge),
  })
  const queue = trainActionPracticeQueue(state)
  assert.deepEqual(queue.currentRemainingWordIds, ['ure'])
  assert.deepEqual(queue.otherRemainingWordIds, ['pershendetje'])
  assert.equal(queue.otherActions[0].target.optionIdentity, optionTrainingIdentity(greeting))
  assert.deepEqual(queue.allRemainingWordIds, ['ure', 'pershendetje'])

  const enumeration = enumerateTrainActivityCandidates({
    state,
    discoveredIds,
    forceGoalTargetIds: queue.allRemainingWordIds,
    nowMs: 1,
    debugTrace: true,
  })
  const planningState = initialTrainPlanningState({
    currentRound: state.trainRound,
    lastWordKeys: state.trainLastWords,
    goalRemaining: queue.priorityRemainingWordIds,
    alternateGoalRemaining: queue.otherRemainingWordIds,
    goalMaximumDiversionRounds: queue.maximumDiversionRounds,
  })
  const plan = planTrainFuture({
    proposals: enumeration.proposals,
    planningState,
    seed: 'alternate-action-bridge',
  })
  assert.ok(plan.candidate, 'the scheduler fell through to the add-more-words screen')
  assert.ok(plan.candidate.rewardIds.includes('pershendetje'),
    'the saved sibling action did not supply the bridge activity')
  assert.ok(!plan.candidate.wordKeys.includes('urë'), 'the previous Albanian word was repeated')

  let requestedPlanningState = transitionTrainPlanningState(
    planningState,
    plan.candidate,
    'correct',
  )
  let requestedGoalRound = 1
  while (requestedPlanningState.goalRemaining.length &&
    requestedGoalRound < TRAIN_ACTION_GOAL_POLICY.maximumActivitiesPerTokenOpportunity) {
    const nextPlan = planTrainFuture({
      proposals: enumeration.proposals,
      planningState: requestedPlanningState,
      seed: `alternate-action-requested:${requestedGoalRound}`,
    })
    assert.ok(nextPlan.candidate,
      'the requested action fell through to add-more-words during its practice window')
    requestedGoalRound++
    requestedPlanningState = transitionTrainPlanningState(
      requestedPlanningState,
      nextPlan.candidate,
      'correct',
    )
  }
  assert.deepEqual(requestedPlanningState.goalRemaining, [],
    'the requested action was not served by repeated production replanning')
  assert.ok(
    requestedGoalRound >= TRAIN_ACTION_GOAL_POLICY.minimumNonGoalActivitiesBeforeTokenOpportunity + 1 &&
      requestedGoalRound <= TRAIN_ACTION_GOAL_POLICY.maximumActivitiesPerTokenOpportunity,
    `the requested action token was not paced inside its bounded window (round ${requestedGoalRound})`,
  )

  const bridgeQuestion = plan.candidate.materialize()
  const afterBridge = reducer(state, {
    type: 'PRACTICE_WORD_RESULT',
    correct: true,
    id: bridgeQuestion.answerId,
    tier: bridgeQuestion.tier,
    mode: bridgeQuestion.mode,
    direction: bridgeQuestion.dir,
    wordStageId: bridgeQuestion.wordStageId,
    variantId: bridgeQuestion.variantId,
    targetFormKey: bridgeQuestion.targetFormKey,
    aspectTargets: bridgeQuestion.aspectTargets,
    questionKey: bridgeQuestion.questionKey,
    wordKeys: trainQuestionWordKeys(bridgeQuestion),
    attemptedAtMs: 1,
    responseDurationMs: 1000,
  })
  assert.equal(afterBridge.mana.pershendetje, 1,
    'the reducer rejected the sibling action\'s early-due token reward')

  const requestedActionDoneState = {
    ...state,
    mana: { ...state.mana, ure: 1 },
  }
  const siblingQueue = trainActionPracticeQueue(requestedActionDoneState)
  assert.deepEqual(siblingQueue.currentRemainingWordIds, [])
  assert.deepEqual(siblingQueue.priorityRemainingWordIds, ['pershendetje'])
  const siblingEnumeration = enumerateTrainActivityCandidates({
    state: requestedActionDoneState,
    discoveredIds,
    forceGoalTargetIds: siblingQueue.allRemainingWordIds,
    nowMs: 1,
  })
  let siblingPlanningState = initialTrainPlanningState({
    currentRound: requestedActionDoneState.trainRound,
    lastWordKeys: requestedActionDoneState.trainLastWords,
    goalRemaining: siblingQueue.priorityRemainingWordIds,
    goalMaximumDiversionRounds: siblingQueue.maximumDiversionRounds,
  })
  let siblingGoalRound = 0
  while (siblingPlanningState.goalRemaining.length &&
    siblingGoalRound < TRAIN_ACTION_GOAL_POLICY.maximumActivitiesPerTokenOpportunity) {
    const siblingPlan = planTrainFuture({
      proposals: siblingEnumeration.proposals,
      planningState: siblingPlanningState,
      seed: `requested-action-complete:${siblingGoalRound}`,
    })
    assert.ok(siblingPlan.candidate,
      'the sibling action fell through to add-more-words during its practice window')
    siblingGoalRound++
    siblingPlanningState = transitionTrainPlanningState(
      siblingPlanningState,
      siblingPlan.candidate,
      'correct',
    )
  }
  assert.deepEqual(siblingPlanningState.goalRemaining, [],
    'the sibling action was not served by repeated production replanning')
  assert.ok(
    siblingGoalRound >= TRAIN_ACTION_GOAL_POLICY.minimumNonGoalActivitiesBeforeTokenOpportunity + 1 &&
      siblingGoalRound <= TRAIN_ACTION_GOAL_POLICY.maximumActivitiesPerTokenOpportunity,
    `the sibling action token was not paced inside its bounded window (round ${siblingGoalRound})`,
  )

  const completedQueue = trainActionPracticeQueue({
    ...state,
    mana: { ...state.mana, ure: 1, pershendetje: 1 },
  })
  assert.equal(completedQueue.needsMoreWords, true)
  assert.deepEqual(completedQueue.priorityRemainingWordIds, [])
  assert.equal(TRAIN_ACTION_GOAL_POLICY.terminalMessage, 'Add more words in Story to keep training.')

  const practiceSource = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
  assert.doesNotMatch(practiceSource, /needs a different-word round first/)
  assert.match(practiceSource, /TRAIN_ACTION_GOAL_POLICY\.terminalMessage/)
})

check('the water-carrier action exhausts e and me before the Train terminal screen', () => {
  const node = STORY.gruaUji1
  const eAction = node.options.find((option) =>
    (option.text || []).some((token) => token.id === 'e_obj'))
  const meAction = node.options.find((option) =>
    option.confuser && (option.text || []).some((token) => token.id === 'me'))
  assert.ok(eAction && meAction, 'the screenshot actions are missing from the water-carrier scene')

  const discoveredIds = [...new Set(node.options.flatMap((option) => option.text || [])
    .map((token) => token.id).filter(Boolean))]
  let state = {
    ...newRun(),
    nodeId: 'gruaUji1',
    discovered: Object.fromEntries(discoveredIds.map((id) => [id, true])),
    mana: Object.fromEntries(discoveredIds.map((id) => [id, 1])),
    practiced: Object.fromEntries(discoveredIds.map((id) => [id, 1])),
  }
  state.mana = { ...state.mana, e_obj: 0, me: 0 }
  state = reducer(state, {
    type: 'BEGIN_OPTION_TRAINING',
    target: trainingTargetForOption('gruaUji1', eAction),
  })

  const completeNextRequiredWord = (expectedId) => {
    const queue = trainActionPracticeQueue(state)
    assert.equal(queue.needsMoreWords, false,
      `Train reached its terminal state before testing ${expectedId}`)
    const enumeration = enumerateTrainActivityCandidates({
      state,
      discoveredIds,
      forceGoalTargetIds: queue.allRemainingWordIds,
      nowMs: 1,
      debugTrace: true,
    })
    const planningState = initialTrainPlanningState({
      currentRound: state.trainRound,
      lastWordKeys: state.trainLastWords,
      goalRemaining: queue.priorityRemainingWordIds,
      alternateGoalRemaining: queue.currentRemainingWordIds.length
        ? queue.otherRemainingWordIds : [],
      goalMaximumDiversionRounds: queue.maximumDiversionRounds,
      goalDiversionsUsed: TRAIN_ACTION_GOAL_POLICY.minimumNonGoalActivitiesBeforeTokenOpportunity,
    })
    const future = planTrainFuture({
      proposals: enumeration.proposals,
      planningState,
      seed: `water-carrier-${expectedId}`,
    })
    const proposal = future.candidate || trainActionLastResortProposal(
      enumeration.proposals,
      queue.priorityRemainingWordIds,
    )
    assert.ok(proposal?.rewardIds.includes(expectedId),
      `${expectedId} did not outrank the terminal screen`)
    const targetTrace = proposal.builderTrace?.candidates?.find(({ id }) => id === expectedId)
    assert.equal(targetTrace?.contextSupport?.goalOverride, true)
    assert.ok(targetTrace.contextSupport.undiscoveredIds.length > 0,
      `${expectedId} fixture no longer exercises the unsaved support-word gate`)
    const question = proposal.materialize()
    assert.equal(question.kind, 'ctx', `${expectedId} lost its reviewed disambiguating context`)
    state = reducer(state, {
      type: 'PRACTICE_WORD_RESULT',
      correct: true,
      id: question.answerId,
      tier: question.tier,
      mode: question.mode,
      direction: question.dir,
      wordStageId: question.wordStageId,
      variantId: question.variantId,
      targetFormKey: question.targetFormKey,
      aspectTargets: question.aspectTargets,
      questionKey: question.questionKey,
      wordKeys: trainQuestionWordKeys(question),
      attemptedAtMs: 1,
      responseDurationMs: 1000,
    })
    assert.equal(state.mana[expectedId], 1, `${expectedId} did not receive its action token`)
  }

  const openingQueue = trainActionPracticeQueue(state)
  assert.deepEqual(openingQueue.currentRemainingWordIds, ['e_obj'])
  assert.deepEqual(openingQueue.otherRemainingWordIds, ['me'])
  assert.equal(openingQueue.otherActions[0].confuser, true,
    'the visible impossible action was still excluded from action-word practice')

  completeNextRequiredWord('e_obj')
  assert.deepEqual(trainActionPracticeQueue(state).priorityRemainingWordIds, ['me'])
  completeNextRequiredWord('me')
  assert.equal(trainActionPracticeQueue(state).needsMoreWords, true,
    'Train did not reach its terminal state after both visible-action deficits were funded')

  const repeatQueue = { priorityRemainingWordIds: ['me'] }
  const repeatEnumeration = enumerateTrainActivityCandidates({
    state: { ...state, mana: { ...state.mana, me: 0 } },
    discoveredIds,
    forceGoalTargetIds: ['me'],
    nowMs: 1,
  })
  const meProposal = repeatEnumeration.proposals.find(({ rewardIds }) => rewardIds.includes('me'))
  assert.ok(meProposal)
  const blockedFuture = planTrainFuture({
    proposals: [meProposal],
    planningState: initialTrainPlanningState({
      currentRound: state.trainRound,
      lastWordKeys: meProposal.wordKeys,
      goalRemaining: ['me'],
      goalMaximumDiversionRounds: 7,
    }),
    seed: 'water-carrier-last-resort',
  })
  assert.equal(blockedFuture.candidate, null,
    'the fixture no longer reaches the ordinary no-shared-word rejection')
  assert.equal(trainActionLastResortProposal(
    [meProposal], repeatQueue.priorityRemainingWordIds,
  ), meProposal, 'the last missing visible-action token lost to a false terminal screen')
})

check('authored story-option training identities are unambiguous', () => {
  for (const [nodeId, node] of Object.entries(STORY)) {
    const seen = new Set()
    for (const option of node.options || []) {
      if (option.confuser) continue
      const identity = optionTrainingIdentity(option)
      assert.ok(identity && !seen.has(identity), `${nodeId}: duplicate real option training identity`)
      seen.add(identity)
      assert.equal(resolveTrainingTarget({ nodeId, optionIdentity: identity }), option)
    }
  }
})

check('a normal story journey cannot use the full English line as an answer key', () => {
  const story = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  assert.equal(storyReadingVisible(0, false), false)
  assert.equal(storyReadingVisible('environment', false), false)
  assert.equal(storyReadingVisible(0, true), true, 'debug lost its editorial reading inspector')
  assert.equal(optionReadingVisible(false), false, 'normal play leaked a complete action translation')
  assert.equal(optionReadingVisible(true), true, 'debug lost its reviewed action inspector')
  assert.match(story, /storyReadingVisible\(i, state\.debug\)/)
  assert.match(story, /optionReadingVisible\(state\.debug\)/)
  assert.match(story, /const sceneSummary = state\.debug && lines\[0\]/)
  assert.match(story, /<Token/)
})

check('every ending has a mechanically valid way back into play', () => {
  assert.ok(STORY[WORLD_HUB], `world hub '${WORLD_HUB}' is missing`)
  for (const ending of ENDINGS) {
    const node = STORY[ending.id]
    assert.ok(node?.end, `${ending.id}: ending registry points to a non-ending`)
    if (node.end === 'bad') continue
    if (node.returnTo) assert.ok(STORY[node.returnTo], `${ending.id}: returnTo '${node.returnTo}' is missing`)
    const state = stateAt(ending.id, { ended: node.end, eligible: { [ending.id]: true } })
    const returned = reducer(state, { type: 'RETURN_TO_WORLD', to: node.returnTo })
    assert.equal(returned.ended, null, `${ending.id}: ending state did not clear`)
    assert.ok(STORY[returned.nodeId] && !STORY[returned.nodeId].end, `${ending.id}: returned to another ending`)
  }
})

check('every required anthology achievement has a real comprehension gate', () => {
  const endingIds = new Set(ENDINGS.filter((ending) => ending.kind !== 'bad').map((ending) => ending.id))
  const achievementEndingIds = new Set(ACHIEVEMENTS.filter((achievement) => achievement.kind !== 'area').map((achievement) => achievement.id))
  assert.deepEqual(achievementEndingIds, endingIds, 'non-bad endings and tale achievements differ')
  for (const achievement of ACHIEVEMENTS) {
    const questions = testFor(achievement, 0)
    assert.ok(Array.isArray(questions) && questions.length > 0, `${achievement.id}: no playable comprehension test`)
    for (const [index, question] of questions.entries()) {
      assert.ok(question.albanian && question.correct, `${achievement.id} question ${index + 1}: incomplete prompt/answer`)
      assert.ok(Array.isArray(question.options) && question.options.length >= 3, `${achievement.id} question ${index + 1}: no meaningful choices`)
      assert.equal(new Set(question.options).size, question.options.length, `${achievement.id} question ${index + 1}: duplicate choices`)
      assert.ok(question.options.includes(question.correct), `${achievement.id} question ${index + 1}: answer is not selectable`)
      for (const answer of question.options) {
        assert.deepEqual(
          englishReadingIssues(answer),
          [],
          `${achievement.id} question ${index + 1}: malformed English choice '${answer}'`,
        )
      }
    }
  }
})

check('bad fates are optional and cannot block anthology completion', () => {
  const fateIds = new Set(ENDINGS.filter((ending) => ending.kind === 'bad').map((ending) => ending.id))
  assert.ok(fateIds.size > 0)
  assert.equal(ACHIEVEMENTS.some((achievement) => fateIds.has(achievement.id)), false)
  const achievementsView = readFileSync(new URL('../src/components/AchievementsView.jsx', import.meta.url), 'utf8')
  assert.match(achievementsView, /anthologyComplete\s*=\s*got\s*===\s*ACHIEVEMENTS\.length/)
  assert.match(achievementsView, /Bad fates are\s*\n?\s*optional records/)
})

check('the onboarding, collection, guide and readiness journey are debug-only for now', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  const practice = readFileSync(new URL('../src/components/PracticeView.jsx', import.meta.url), 'utf8')
  const gameState = readFileSync(new URL('../src/game/gameState.js', import.meta.url), 'utf8')
  const guide = readFileSync(new URL('../src/components/GuideView.jsx', import.meta.url), 'utf8')
  assert.match(app, /state\.debug && tab\('endings'/)
  assert.match(app, /state\.debug && tab\('guide'/)
  assert.match(app, /state\.debug && state\.view === 'story' && state\.turn <= 2/)
  assert.match(app, /state\.debug && state\.view === 'endings' && <AchievementsView/)
  assert.match(app, /state\.debug && state\.view === 'guide' && <GuideView/)
  assert.equal((practice.match(/state\.debug && <CefrEntry/g) || []).length, 4)
  assert.match(practice, /if \(state\.debug && showCefr\)/)
  assert.match(gameState, /DEBUG_ONLY_VIEWS = new Set\(\['map', 'endings', 'guide', 'debug'\]\)/)

  const normal = stateAt(START_NODE)
  for (const view of ['map', 'endings', 'guide', 'debug']) {
    assert.equal(reducer(normal, { type: 'SET_VIEW', view }), normal, `normal play opened ${view}`)
    assert.equal(
      normalizeSavedState({ ...normal, view }, stateAt(START_NODE)).view,
      'story',
      `normal save resumed on ${view}`,
    )
  }

  const debug = stateAt(START_NODE, { debug: true })
  for (const view of ['map', 'endings', 'guide', 'debug']) {
    const opened = reducer(debug, { type: 'SET_VIEW', view })
    assert.equal(opened.view, view, `debug could not open ${view}`)
    assert.equal(reducer(opened, { type: 'TOGGLE_DEBUG' }).view, 'story', `debug off stranded ${view}`)
  }

  for (const phrase of ['Discover a word', 'Train it', 'Choose a path', 'Character tales', 'Finishing the anthology', 'Folklore and sources']) {
    assert.ok(guide.includes(phrase), `guide omits '${phrase}'`)
  }
})

check('the world map is reachable only during an explicit debug session', () => {
  const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  assert.match(app, /\{state\.debug && tab\('map', '🗺 Map'\)\}/)
  assert.match(app, /\{state\.debug && state\.view === 'map' && <AtlasView state=\{state\} \/>\}/)
  assert.match(app, /\{state\.debug && state\.view === 'debug' && <DebugView state=\{state\} dispatch=\{dispatch\} \/>\}/)

  const normal = reducer(stateAt(START_NODE), { type: 'SET_VIEW', view: 'map' })
  assert.equal(normal.view, 'story', 'normal play opened the debug atlas')
  const normalDebug = reducer(stateAt(START_NODE), { type: 'SET_VIEW', view: 'debug' })
  assert.equal(normalDebug.view, 'story', 'normal play opened the diagnostic screen')

  const debugMap = reducer(
    stateAt(START_NODE, { debug: true }),
    { type: 'SET_VIEW', view: 'map' },
  )
  assert.equal(debugMap.view, 'map', 'debug mode could not open the atlas')
  const debugOff = reducer(debugMap, { type: 'TOGGLE_DEBUG' })
  assert.equal(debugOff.debug, false)
  assert.equal(debugOff.view, 'story', 'turning debug off left the atlas active')

  const debugScreen = reducer(
    stateAt(START_NODE, { debug: true }),
    { type: 'SET_VIEW', view: 'debug' },
  )
  assert.equal(debugScreen.view, 'debug', 'debug mode could not open its diagnostic screen')
  const debugScreenOff = reducer(debugScreen, { type: 'TOGGLE_DEBUG' })
  assert.equal(debugScreenOff.debug, false)
  assert.equal(debugScreenOff.view, 'story', 'turning debug off left diagnostics active')
})

check('all option words have dictionary entries and can enter the learning loop', () => {
  const missing = []
  let realOptions = 0
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const [index, option] of (node.options || []).entries()) {
      if (option.confuser) continue
      realOptions++
      for (const id of phraseSenses(option.text)) if (!DICT[id]) missing.push(`${nodeId}[${index}] '${id}'`)
    }
  }
  assert.ok(realOptions >= 850, `only ${realOptions} real choices were inspected`)
  assert.deepEqual(missing, [])
})

const failures = checks.filter((entry) => !entry.ok)
for (const entry of checks) console.log(`${entry.ok ? '✅' : '❌'} ${entry.name}${entry.error ? ` — ${entry.error}` : ''}`)
console.log(`\n${failures.length ? `❌ ${failures.length} player-journey check(s) failed` : `✅ all ${checks.length} player-journey checks pass`}`)
if (failures.length) process.exitCode = 1
