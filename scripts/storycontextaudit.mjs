import { checkCoastContinuity } from './lib/coast-continuity-tests.mjs'
import { checkWaterDialogue } from './lib/water-dialogue-tests.mjs'
// Release contract for moving player state out of the permanent HUD and into
// ordinary Albanian story prose, including phase-sensitive greeting choices.

import assert from 'node:assert/strict'
import fs from 'node:fs'
import { STORY, describesEnvironment, lineOf, moneyOutcomeLineOf, visibleLines, w } from '../src/game/content.js'
import {
  arrivalOptionOf,
  canChoose,
  currentStoryState,
  hasCond,
  hasRequiredItem,
  isOptionRevealed,
  environmentNarrationScopeOf,
  newRun,
  normalizeSavedState,
  phraseSenses,
  reducer,
  storyScenePresentationForState,
  trainablePhraseSenses,
} from '../src/game/gameState.js'
import { albanianTextOf } from '../src/game/language.js'
import {
  authoredEnvironmentDimensions,
  environmentStoryLine,
  planEnvironmentNarration,
  moneyTransactionStoryLine,
  purseStoryLine,
} from '../src/game/storyContext.js'
import { civilDayPartAtClock, civilHourAtClock, greetingPeriodAtClock } from '../src/game/environment.js'
import { storyReadingVisible } from '../src/components/storyMechanicsPresentation.js'
import { observationConditionId, observationIdOfLine } from '../src/game/observations.js'
import { normalizeHealthNarrationState, planHealthNarration } from '../src/game/healthNarration.js'
import { resolveRevealLine } from '../src/game/revealResolver.js'

const failures = []
let checkCount = 0
const check = (name, fn) => {
  checkCount += 1
  try {
    fn()
    console.log(`✓ ${name}`)
  } catch (error) {
    failures.push(`${name}: ${error.message}`)
    console.log(`✗ ${name}`)
  }
}

checkWaterDialogue(check)
checkCoastContinuity(check)

const periodClock = Object.freeze({ morning: 0, day: 6, evening: 12, night: 16 })
const greetingScenes = Object.freeze({
  tregtari: ['morning', 'day', 'evening', 'night'],
  bujtina: ['morning', 'day', 'evening', 'night'],
  sheruesi: ['morning', 'day', 'evening', 'night'],
  udhetariHuaj: ['morning', 'day', 'evening', 'night'],
  kroiGrate2: ['morning', 'day', 'evening'],
})

check('civil time, season and weather become ordinary Albanian story lines', () => {
  const cases = [
    [0, 'spring', 'clear', 'në këtë mëngjes pranvere, qielli është pa re.'],
    [6, 'summer', 'cloud', 'në këtë mesditë vere, qielli është me re.'],
    [7, 'autumn', 'storm', 'në këtë pasdite vjeshte, ka stuhi.'],
    [13, 'winter', 'rain', 'në këtë mbrëmje dimri, po bie shi.'],
    [18, 'winter', 'snow', 'në këtë natë dimri, po bie borë.'],
  ]
  for (const [clock, season, weather, expected] of cases) {
    assert.equal(albanianTextOf(environmentStoryLine({ clock, season, weather })), expected)
  }
  assert.equal(
    albanianTextOf(environmentStoryLine({ clock: 13, season: 'spring', weather: 'rain' }, { enclosed: true })),
    'në këtë mbrëmje pranvere, jashtë po bie shi.',
  )
})

check('authored environmental prose replaces only its declared generic fallback', () => {
  const environment = { clock: 13, season: 'spring', weather: 'rain' }
  const immersiveTime = describesEnvironment('time', [w('muzg')])
  assert.deepEqual([...authoredEnvironmentDimensions([immersiveTime])], ['time'])
  assert.equal(
    albanianTextOf(environmentStoryLine(environment, { omit: authoredEnvironmentDimensions([immersiveTime]) })),
    'në këtë pranverë, po bie shi.',
  )

  const allAuthored = describesEnvironment(['time', 'season', 'weather'], [w('muzg')])
  assert.equal(environmentStoryLine(environment, { omit: authoredEnvironmentDimensions([allAuthored]) }), null)
  assert.equal(
    albanianTextOf(environmentStoryLine(environment, { enclosed: true, omit: ['time'] })),
    'në këtë pranverë, jashtë po bie shi.',
  )

  // Token choice is not presentation metadata: an unmarked line that happens
  // to contain a time word must not suppress a fallback by accident.
  assert.deepEqual([...authoredEnvironmentDimensions([[w('muzg')]])], [])
  assert.throws(() => describesEnvironment('temperature', [w('muzg')]), /dimensions must use/)
})

check('environment fallback is transition-driven per dimension and survives reload', () => {
  const initialEnvironment = { clock: 0, season: 'spring', weather: 'rain' }
  const first = planEnvironmentNarration(
    initialEnvironment,
    undefined,
    { nodeId: 'start', turn: 1, authoredDimensions: ['time'] },
  )
  assert.deepEqual(first.fallbackDimensions, ['season', 'weather'],
    'fresh state did not introduce its unknown season and weather')
  assert.deepEqual(first.omitDimensions, ['time'])
  assert.equal(
    albanianTextOf(environmentStoryLine(initialEnvironment, { omit: first.omitDimensions })),
    'në këtë pranverë, po bie shi.',
  )
  assert.deepEqual(first.nextState.scopes.world.communicated, {
    time: 'morning',
    season: 'spring',
    weather: 'rain',
  })

  // A pre-ledger save also starts from unknown conditions, so it communicates
  // the current environment once instead of remaining contextless.
  const legacySave = { ...newRun() }
  delete legacySave.environmentNarration
  const migrated = normalizeSavedState(legacySave, newRun())
  const migratedFirst = planEnvironmentNarration(
    initialEnvironment,
    migrated.environmentNarration,
    { nodeId: 'start', turn: 1, authoredDimensions: [] },
  )
  assert.deepEqual(migratedFirst.fallbackDimensions, ['time', 'season', 'weather'])
  assert.deepEqual(migratedFirst.omitDimensions, [])

  // Version 1 silently stored an opening baseline without presenting it. Drop
  // that false communication record once so existing runs receive the corrected
  // unknown-to-known opening context too.
  const previousPolicySave = {
    ...newRun(),
    environmentNarration: {
      version: 1,
      communicated: { time: 'morning', season: 'spring', weather: 'rain' },
      active: null,
    },
  }
  const upgraded = normalizeSavedState(previousPolicySave, newRun())
  const upgradedFirst = planEnvironmentNarration(
    initialEnvironment,
    upgraded.environmentNarration,
    { nodeId: 'start', turn: 1, authoredDimensions: ['time'] },
  )
  assert.deepEqual(upgradedFirst.fallbackDimensions, ['season', 'weather'])

  const unscopedSave = {
    ...newRun(),
    environmentNarration: {
      version: 2,
      communicated: { time: 'night', season: 'winter', weather: 'storm' },
      active: null,
    },
  }
  const scopedMigration = normalizeSavedState(unscopedSave, newRun())
  assert.deepEqual(scopedMigration.environmentNarration.scopes, {},
    'an unscoped clock snapshot was guessed into the living world')

  const initialState = newRun()
  const committedState = reducer(initialState, {
    type: 'NARRATE_ENVIRONMENT',
    nodeId: initialState.nodeId,
    turn: initialState.turn,
    authoredDimensions: ['time'],
  })
  assert.notEqual(committedState, initialState)
  assert.deepEqual(
    Object.keys(committedState.environmentNarration.scopes.world.communicated).sort(),
    ['season', 'time', 'weather'],
  )
  assert.equal(reducer(committedState, {
    type: 'NARRATE_ENVIRONMENT',
    nodeId: initialState.nodeId,
    turn: initialState.turn,
    authoredDimensions: ['time'],
  }), committedState, 'same presentation acknowledged itself twice')

  // The initial transition remains visible for this presentation on rerender.
  const rerender = planEnvironmentNarration(
    initialEnvironment,
    first.nextState,
    { nodeId: 'start', turn: 1, authoredDimensions: ['time'] },
  )
  assert.equal(rerender.needsCommit, false)
  assert.deepEqual(rerender.fallbackDimensions, ['season', 'weather'])

  // Movement under unchanged conditions is silent.
  const unchangedMove = planEnvironmentNarration(
    initialEnvironment,
    first.nextState,
    { nodeId: 'lendina', turn: 2, authoredDimensions: [] },
  )
  assert.deepEqual(unchangedMove.fallbackDimensions, [])

  // Only the changed weather is narrated; a visible authored time line records
  // the new time itself and suppresses its generic twin.
  const partialChange = planEnvironmentNarration(
    { clock: 6, season: 'spring', weather: 'storm' },
    unchangedMove.nextState,
    { nodeId: 'pylliLoop', turn: 3, authoredDimensions: ['time'] },
  )
  assert.deepEqual(partialChange.fallbackDimensions, ['weather'])
  assert.deepEqual(partialChange.omitDimensions.sort(), ['season', 'time'])
  assert.equal(partialChange.nextState.scopes.world.communicated.time, 'noon')
  assert.equal(
    albanianTextOf(environmentStoryLine(
      { clock: 6, season: 'spring', weather: 'storm' },
      {
        omit: partialChange.omitDimensions,
        transitionFrom: partialChange.previousSnapshot,
      },
    )),
    'fillon një stuhi.',
  )

  const state = { ...newRun(), environmentNarration: partialChange.nextState }
  const loaded = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
  const afterReload = planEnvironmentNarration(
    { clock: 6, season: 'spring', weather: 'storm' },
    loaded.environmentNarration,
    { nodeId: 'pylliLoop', turn: 3, authoredDimensions: ['time'] },
  )
  assert.equal(afterReload.needsCommit, false)
  assert.deepEqual(afterReload.fallbackDimensions, ['weather'])

  // Once that transition has been shown, moving again under the same values is
  // silent rather than repeating it on every card.
  const afterAcknowledgedMove = planEnvironmentNarration(
    { clock: 6, season: 'spring', weather: 'storm' },
    partialChange.nextState,
    { nodeId: 'mali1', turn: 4, authoredDimensions: [] },
  )
  assert.deepEqual(afterAcknowledgedMove.fallbackDimensions, [])
})

check('the reducer persists separate world and embodied-tale narration domains', () => {
  let world = newRun()
  assert.equal(environmentNarrationScopeOf(world), 'world')
  world = reducer(world, {
    type: 'NARRATE_ENVIRONMENT', nodeId: world.nodeId, turn: world.turn,
    scopeId: 'world', authoredDimensions: [],
  })
  const worldSnapshot = world.environmentNarration.scopes.world.communicated

  let tale = {
    ...world,
    nodeId: 'agaYmer2',
    embodying: 'aga-ymer',
    embodimentClock: 1,
    embodimentPaused: false,
    turn: world.turn + 1,
  }
  assert.equal(environmentNarrationScopeOf(tale), 'tale:aga-ymer')
  tale = reducer(tale, {
    type: 'NARRATE_ENVIRONMENT', nodeId: tale.nodeId, turn: tale.turn,
    scopeId: 'tale:aga-ymer', authoredDimensions: [],
  })
  assert.deepEqual(Object.keys(tale.environmentNarration.scopes).sort(), ['tale:aga-ymer', 'world'])
  assert.deepEqual(tale.environmentNarration.scopes.world.communicated, worldSnapshot)

  const loadedTale = normalizeSavedState(JSON.parse(JSON.stringify(tale)), newRun())
  assert.deepEqual(loadedTale.environmentNarration, tale.environmentNarration)
  const paused = {
    ...loadedTale,
    nodeId: 'start',
    embodimentPaused: true,
    clock: world.clock,
    turn: loadedTale.turn + 1,
  }
  assert.equal(environmentNarrationScopeOf(paused), 'world')
  const returned = reducer(paused, {
    type: 'NARRATE_ENVIRONMENT', nodeId: paused.nodeId, turn: paused.turn,
    scopeId: 'world', authoredDimensions: [],
  })
  assert.deepEqual(returned.environmentNarration.scopes.world.communicated, worldSnapshot)
  assert.deepEqual(returned.environmentNarration.scopes.world.active.fallbackDimensions, [])

  const resumed = {
    ...returned,
    nodeId: 'agaYmer2',
    embodimentPaused: false,
    turn: returned.turn + 1,
  }
  const resumedNarration = reducer(resumed, {
    type: 'NARRATE_ENVIRONMENT', nodeId: resumed.nodeId, turn: resumed.turn,
    scopeId: 'tale:aga-ymer', authoredDimensions: [],
  })
  assert.deepEqual(resumedNarration.environmentNarration.scopes['tale:aga-ymer'].active.fallbackDimensions, [],
    'resuming a frozen tale emitted a backward transition')
})

check('health prose appears on change and remains while wounded or healable', () => {
  const opening = planHealthNarration(3, undefined, {
    nodeId: 'start', turn: 1, keepVisible: false,
  })
  assert.equal(opening.visible, true, 'opening health was not established')

  const rerender = planHealthNarration(3, opening.nextState, {
    nodeId: 'start', turn: 1, keepVisible: false,
  })
  assert.equal(rerender.visible, true, 'opening health vanished during its own presentation')
  assert.equal(rerender.needsCommit, false)

  const unchangedMove = planHealthNarration(3, opening.nextState, {
    nodeId: 'lendina', turn: 2, keepVisible: false,
  })
  assert.equal(unchangedMove.visible, false, 'full health repeated without changing')
  const reloadedQuiet = planHealthNarration(
    3,
    normalizeHealthNarrationState(JSON.parse(JSON.stringify(unchangedMove.nextState))),
    { nodeId: 'lendina', turn: 2, keepVisible: false },
  )
  assert.equal(reloadedQuiet.visible, false, 'reload repeated unchanged full health')

  const wounded = planHealthNarration(2, unchangedMove.nextState, {
    nodeId: 'lendina', turn: 2, keepVisible: true,
  })
  assert.equal(wounded.visible, true, 'heart loss was not narrated')
  const woundedMove = planHealthNarration(2, wounded.nextState, {
    nodeId: 'fshatiLumi', turn: 3, keepVisible: true,
  })
  assert.equal(woundedMove.visible, true, 'wounded warning did not remain visible')

  const healed = planHealthNarration(3, woundedMove.nextState, {
    nodeId: 'fshatiLumi', turn: 3, keepVisible: false,
  })
  assert.equal(healed.visible, true, 'healing change was not narrated')
  const healedMove = planHealthNarration(3, healed.nextState, {
    nodeId: 'fshatiSheshi', turn: 4, keepVisible: false,
  })
  assert.equal(healedMove.visible, false, 'full health remained permanent after its change beat')
})

check('restored village wells keep people and consequences consistent with the visible water', () => {
  const prose = (state) => storyScenePresentationForState(state).entries.map(({ line }) => albanianTextOf(line))
  for (const restored of [false, true]) {
    const worldFacts = restored ? { villageWellsRestored: true } : {}
    for (const known of [false, true]) {
      for (const resolved of [false, true]) {
        const state = {
          ...newRun(), nodeId: 'fshatiSheshi', clock: 3, worldFacts,
          npcStarted: { elira: 0 },
          knowledge: known ? { 'npcName:elira': true } : {},
          flags: resolved ? { eliraOpeningResolved: true } : { eliraFollowPlan: true },
          rendezvous: { eliraFollow: { metAtClock: 3 } },
        }
        const lines = prose(state)
        const person = known ? 'Elira' : 'gruaja'
        const expected = resolved
          ? known ? 'Elira rri afër pusit.' : 'gruaja që takove te ura rri afër pusit.'
          : `${person} të sheh dhe pret afër pusit.`
        assert.ok(lines.includes(expected), `square/${restored}/${known}/${resolved}: Elira lost her well-side position`)
        assert.equal(lines.some((line) => /pus.*thatë/.test(line)), !restored,
          `square/${restored}/${known}/${resolved}: well description contradicts its canonical water state`)
        assert.equal(lines.includes('ti je në shesh: uji është përsëri në pus.'), restored)
      }
    }

    const wellState = { ...newRun(), nodeId: 'pusiThate', clock: 3, worldFacts, flags: { heardDryWellWoman: true } }
    assert.ok(prose(wellState).includes('një plakë rri pranë pusit.'),
      `well/${restored}: the speaking old woman has no visible introduction`)
    assert.equal(prose({ ...wellState, clock: 16 }).some((line) => /plak[ëa]/.test(line)), false,
      `well/${restored}: the daytime woman remained after nightfall`)

    const umbrella = STORY.pusiThate.options.find((option) =>
      albanianTextOf(option.text) === 'hap çadrën.' && [].concat(option.requires || []).includes('weather:rain'))
    assert.ok(umbrella, 'well: missing canonical rain umbrella action')
    const sheltered = { ...wellState, cameFrom: 'pusiThate', choiceIndex: STORY.pusiThate.options.indexOf(umbrella) }
    assert.ok(prose(sheltered).includes('ti hap çadrën pranë pusit; ajo të mban të thatë.'),
      `well/${restored}: umbrella consequence assigns stale dryness to the well`)
  }
})

check('the children explain their rain song without undoing restored village water', () => {
  const question = STORY.dordolecBiseda.options.find((option) => option.conversationHub?.questionId === 'reason')
  assert.ok(question, 'missing rain-song explanation question')
  for (const restored of [false, true]) {
    const state = {
      ...newRun(), nodeId: 'dordolecBiseda', clock: 3,
      worldFacts: restored ? { villageWellsRestored: true } : {},
    }
    for (const id of phraseSenses(question.text)) {
      state.discovered[id] = true
      state.mana[id] = 1
    }
    const answered = reducer(state, {
      type: 'CHOOSE', option: question, targetNode: STORY.dordolecBiseda,
      fromNodeId: state.nodeId, fromTurn: state.turn,
    })
    assert.notEqual(answered, state, `children/${restored}: rain-song question was rejected`)
    const lines = storyScenePresentationForState(answered).entries.map(({ line }) => albanianTextOf(line))
    assert.ok(lines.includes('ata thonë: Fshati ka nevojë për shi. nëse shiu vonon, toka mbetet e thatë.'),
      `children/${restored}: the requested rain explanation was not shown`)
    assert.equal(lines.some((line) => /[Pp]usi.*thatë/.test(line)), false,
      `children/${restored}: the answer claimed that the well is still dry`)
  }
})

check('dry and restored well routes require every sense in their exact visible signpost', () => {
  for (const restored of [false, true]) {
    const state = {
      ...newRun(), nodeId: 'fshatiSheshi', clock: 6, cameFrom: 'udhekryq', trail: [],
      visited: { pusiThate: true },
      worldFacts: restored ? { villageWellsRestored: { atClock: 4, source: 'syriFund' } } : {},
    }
    const variants = STORY.fshatiSheshi.options.filter((option) => option.to === 'pusiThate')
    const live = variants.filter((option) => hasRequiredItem(currentStoryState(state), option))
    assert.equal(live.length, 1, `well/${restored}: expected exactly one state-appropriate route`)
    const option = live[0]
    const source = resolveRevealLine(STORY.fshatiSheshi.text.map(lineOf), option).line
    assert.equal(source, lineOf(STORY.fshatiSheshi.text[restored ? 1 : 0]),
      `well/${restored}: the route uses a different source sentence`)
    assert.ok(storyScenePresentationForState(state).sourceLines.includes(source),
      `well/${restored}: the route source is hidden`)
    for (const id of [...trainablePhraseSenses(source), ...trainablePhraseSenses(option.text)]) {
      state.discovered[id] = true
      state.mana[id] = 20
    }
    assert.equal(isOptionRevealed(currentStoryState(state), option), true)
    for (const id of trainablePhraseSenses(source)) {
      const missing = { ...state, discovered: { ...state.discovered } }
      delete missing.discovered[id]
      assert.equal(isOptionRevealed(currentStoryState(missing), option), false,
        `well/${restored}: visited destination bypassed the undiscovered source sense ${id}`)
      assert.equal(reducer(missing, {
        type: 'CHOOSE', option, targetNode: STORY.pusiThate,
        fromNodeId: missing.nodeId, fromTurn: missing.turn,
      }), missing, `well/${restored}: reducer accepted an undiscovered signpost sense ${id}`)
    }
    for (const stale of variants.filter((entry) => entry !== option)) {
      assert.equal(canChoose(currentStoryState(state), stale), false)
      assert.equal(reducer(state, {
        type: 'CHOOSE', option: stale, targetNode: STORY.pusiThate,
        fromNodeId: state.nodeId, fromTurn: state.turn,
      }), state, `well/${restored}: stale water-state route was accepted`)
    }
    const arrived = reducer(state, {
      type: 'CHOOSE', option, targetNode: STORY.pusiThate,
      fromNodeId: state.nodeId, fromTurn: state.turn,
    })
    assert.equal(arrived.nodeId, 'pusiThate', `well/${restored}: learned current route was rejected`)
    assert.equal(arrived.actionSpeech?.al, 'shko në pus', 'well route changed its recorded Albanian')
  }
})

check('restored-water choices preserve saved square action arrivals', () => {
  // These are the compiled choice addresses persisted before the restored
  // routes were added. A same-place target match alone cannot detect a shifted
  // bottle/umbrella choice, so pin both the action identity and visible outcome.
  const arrivals = [
    [25, 'world-item:drink-bottle-fshati-sheshi', 'ti pi ujin nga shishja.', { shishe: 1 }, {}],
    [26, 'world-item:open-umbrella-fshati-sheshi-rain', 'ti hap çadrën në sheshin e fshatit; ajo të mban të thatë.', { cader: 1 }, { 'umbrellaOpen:fshatiSheshi': true }],
    [27, 'world-item:open-umbrella-fshati-sheshi-storm', 'ti hap çadrën në sheshin e fshatit; ajo të mban të thatë.', { cader: 1 }, { 'umbrellaOpen:fshatiSheshi': true }],
  ]
  for (const [choiceIndex, actionId, outcome, inventory, flags] of arrivals) {
    for (const restored of [false, true]) {
      const saved = {
        ...newRun(), nodeId: 'fshatiSheshi', cameFrom: 'fshatiSheshi', choiceIndex,
        clock: 6, turn: 2, inventory, flags,
        worldFacts: restored ? { villageWellsRestored: { atClock: 4, source: 'syriFund' } } : {},
      }
      const loaded = normalizeSavedState(JSON.parse(JSON.stringify(saved)), newRun())
      assert.equal(loaded.choiceIndex, choiceIndex, `${actionId}: saved arrival was discarded`)
      assert.equal(arrivalOptionOf(loaded)?.playerAction?.id, actionId,
        `${actionId}: saved index resolves to a different accepted action`)
      const prose = storyScenePresentationForState(loaded).entries.map(({ line }) => albanianTextOf(line))
      assert.ok(prose.includes(outcome), `${actionId}: saved action lost its visible consequence`)
      assert.equal(prose.includes('ti pi ujin nga shishja.'), choiceIndex === 25,
        `${actionId}: reload narrates drinking water for an umbrella action`)
      assert.equal(loaded.actionSpeech, null, `${actionId}: reload replayed accepted-action audio`)
    }
  }
})

check('returning from each water-restoring ending keeps the old man and well story current', () => {
  const prose = (state) => storyScenePresentationForState(state).entries.map(({ line }) => albanianTextOf(line))
  const prepare = (state) => {
    const next = { ...state, discovered: { ...state.discovered }, mana: { ...state.mana } }
    const node = STORY[state.nodeId]
    for (const line of [...node.text.map(lineOf), ...node.options.map((option) => option.text)]) {
      for (const id of trainablePhraseSenses(line)) {
        next.discovered[id] = true
        next.mana[id] = 50
      }
    }
    return next
  }
  const travel = (state, destination) => {
    const ready = prepare(state)
    const options = STORY[ready.nodeId].options.filter((option) => !option.confuser && option.to === destination &&
      canChoose(currentStoryState(ready), option) && isOptionRevealed(currentStoryState(ready), option))
    assert.equal(options.length, 1, `${ready.nodeId} -> ${destination}: no unique playable route`)
    const option = options[0]
    const next = reducer(ready, {
      type: 'CHOOSE', option, targetNode: STORY[destination],
      fromNodeId: ready.nodeId, fromTurn: ready.turn,
    })
    assert.equal(next.nodeId, destination, `${ready.nodeId} -> ${destination}: reducer rejected route`)
    return next
  }
  // RETURN_TO_WORLD uses each real ending's production effects. In particular,
  // the Blue Eye restores wells without proving watered fields or a dead dragon.
  const restoringEndings = Object.values(STORY).filter((node) => node.worldEffects?.includes('villageWellsRestored'))
  assert.ok(restoringEndings.length >= 4, 'water-restoration coverage omitted production endings')
  for (const endingId of [null, ...restoringEndings.map((node) => node.id)]) {
    let state = endingId
      ? reducer({ ...newRun(), nodeId: endingId, clock: 4, ended: STORY[endingId].end }, { type: 'RETURN_TO_WORLD' })
      : { ...newRun(), nodeId: 'udhekryq', clock: 4 }
    const restored = Boolean(state.worldFacts.villageWellsRestored)
    const defeated = Boolean(state.worldFacts.kulshedraDefeated)
    state = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
    for (const destination of ['fshatiSheshi', 'rrugaOdes', 'oda1', 'oda2']) state = travel(state, destination)
    assert.equal(state.embodying, null, `${endingId}: review accidentally entered a frozen tale`)
    const atGuestRoom = prose(state)
    assert.equal(atGuestRoom.includes('fshati është i thatë.'), !restored)
    assert.equal(atGuestRoom.includes('sepse nuk ka ujë, gjithë fshati im vdes.'), !restored)
    assert.equal(atGuestRoom.includes('Plaku buzëqesh dhe thotë: Pusi ka ujë përsëri.'), restored)
    if (restored) assert.equal(atGuestRoom.some((line) => /gjelbër|gjelbra|gjelbërta/.test(line)), false,
      `${endingId}: well restoration invented an independent field condition`)
    const ready = prepare(state)
    const follow = STORY.oda2.options.find((option) => option.to === 'fshatiBesa' && hasRequiredItem(ready, option))
    const invitation = resolveRevealLine(STORY.oda2.text.map(lineOf), follow).line
    assert.ok(storyScenePresentationForState(ready).sourceLines.includes(invitation),
      `${endingId}: accompaniment is bound to a hidden invitation`)
    assert.ok(invitation.some((token) => token.id === 'ngre') && invitation.some((token) => token.id === 'vjen'),
      `${endingId}: accompaniment is not bound to the old man's offered departure`)
    state = travel(state, 'fshatiBesa')
    const atWell = prose(state)
    assert.ok(atWell.includes('ti ecën me plakun te pusi. ai tregon dhe thotë:'))
    assert.equal(atWell.includes('kulshedra poshtë mban ujin dhe Bukurën.'), !restored && !defeated)
    assert.equal(atWell.includes('Uji është përsëri në fshat, por kulshedra ende mban Bukurën poshtë.'), restored && !defeated)
    assert.equal(atWell.includes('Kulshedra ka vdekur.'), defeated)
    assert.equal(atWell.includes('Plaku thotë: mbaj fjalën, gjithmonë.'), defeated)
    assert.equal(atWell.some((line) => /Bukur[ae].*sigurt/.test(line)), false,
      `${endingId}: dragon defeat invented proof that the Beauty is safe`)
    assert.equal(atWell.some((line) => /pus.*thatë/.test(line)), false,
      `${endingId}: the well's fixed location carried a stale water state`)
    const afterReload = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
    assert.deepEqual(prose(afterReload), atWell, `${endingId}: reload changed the narrated world outcome`)
    assert.equal(travel(state, 'fshatiCaul').nodeId, 'fshatiCaul', `${endingId}: the besa choice lost its consequence`)
    assert.equal(travel(state, 'nastradin1').nodeId, 'nastradin1', `${endingId}: the ordinary exit disappeared`)
  }
})

check('opening and authored weather scenes prefer their visible immersive descriptions', () => {
  const phaseClocks = { dawn: 0, day: 3, dusk: 13, night: 15 }
  for (const [phase, clock] of Object.entries(phaseClocks)) {
    const state = { ...newRun(), nodeId: 'start', clock }
    const lines = visibleLines(STORY.start, (id) => hasCond(state, id))
    const dimensions = authoredEnvironmentDimensions(lines)
    assert.equal(dimensions.has('time'), true, `start/${phase}: time fallback was not replaced`)
    assert.equal(
      albanianTextOf(environmentStoryLine({ clock, season: 'spring', weather: 'clear' }, { omit: dimensions })),
      'në këtë pranverë, qielli është pa re.',
      `start/${phase}: unrelated environment facts disappeared`,
    )
  }

  const authoredWeatherNodes = [
    'tomorProva',
    'tomorStuhi',
    'maliStuhi',
    'dordolecFund',
    'shurdhi1',
    'qiellErera1',
  ]
  for (const nodeId of authoredWeatherNodes) {
    const dimensions = authoredEnvironmentDimensions(STORY[nodeId].text.map(lineOf))
    assert.equal(dimensions.has('weather'), true, `${nodeId}: authored weather does not replace its generic echo`)
  }

  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const entry of node.text) {
      const dimensions = lineOf(entry).environmentDimensions || []
      assert.equal(new Set(dimensions).size, dimensions.length, `${nodeId}: duplicate environment dimension`)
      assert.ok(dimensions.every((dimension) => ['time', 'season', 'weather'].includes(dimension)), `${nodeId}: invalid environment dimension`)
    }
  }
})

check('Rozafa withdrawal describes dawn only for the wife who stayed home', () => {
  for (const clock of [0, 6]) {
    for (const kept of [false, true]) {
      const state = {
        ...newRun(), nodeId: 'kalaFundTurp', cameFrom: 'kalaNgjitje', clock,
        flags: kept ? { besaMbajtur: true } : { rozafaWifeWarned: true },
      }
      const lines = storyScenePresentationForState(state).normalEntries.map(({ line }) => line)
      const prose = lines.map(albanianTextOf).join('\n')
      const dimensions = [...authoredEnvironmentDimensions(lines)]
      const describesDawn = clock === 0 && !kept
      assert.deepEqual(dimensions, describesDawn ? ['time'] : [])
      assert.equal(prose.includes('në agim gruaja rri te vatra.'), describesDawn)
      assert.equal(prose.includes('Gruaja jote rri te vatra në shtëpi.'), clock === 6 && !kept)
      assert.equal(prose.includes('Besa është mbajtur. Rozafa është gruaja jote.'), kept)
      const environment = { clock, season: 'spring', weather: 'rain' }
      const plan = planEnvironmentNarration(environment, undefined, {
        nodeId: state.nodeId, turn: state.turn, authoredDimensions: dimensions,
      })
      assert.deepEqual(plan.fallbackDimensions, describesDawn
        ? ['season', 'weather'] : ['time', 'season', 'weather'])
      assert.equal(albanianTextOf(environmentStoryLine(environment, { omit: plan.omitDimensions })),
        describesDawn ? 'në këtë pranverë, po bie shi.'
          : clock === 0 ? 'në këtë mëngjes pranvere, po bie shi.'
            : 'në këtë mesditë pranvere, po bie shi.')
      const restored = normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
      const restoredLines = storyScenePresentationForState(restored).normalEntries.map(({ line }) => line)
      assert.deepEqual([...authoredEnvironmentDimensions(restoredLines)], dimensions)
      const restoredProse = restoredLines.map(albanianTextOf).join('\n')
      for (const branchLine of ['në agim gruaja rri te vatra.', 'Gruaja jote rri te vatra në shtëpi.',
        'Besa është mbajtur. Rozafa është gruaja jote.']) {
        assert.equal(restoredProse.includes(branchLine), prose.includes(branchLine),
          'reload changed the wife or dawn branch')
      }
    }
  }
})

check('3D review keeps environmental prose in the actual house and outdoor scene', () => {
  const cases = [
    ['agaYmer1', 0, 'night', 'natën, shtëpia bëhet më e ftohtë rreth plakës.'],
    ['syriKeq1', 1, 'dusk', 'Në muzg, bëhet errët para shtëpisë.'],
  ]
  for (const [nodeId, index, condition, text] of cases) {
    const target = lineOf(STORY[nodeId].text[index])
    assert.equal(albanianTextOf(target), text)
    assert.ok(visibleLines(STORY[nodeId], (id) => id === condition).includes(target))
    assert.deepEqual([...authoredEnvironmentDimensions([target])], ['time'])
    assert.equal(albanianTextOf(environmentStoryLine({ clock: 0, season: 'spring', weather: 'rain' },
      { omit: authoredEnvironmentDimensions([target]) })), 'në këtë pranverë, po bie shi.')
  }
})

check('every authored environment line is reachable and preserves undeclared fallbacks', () => {
  const fallbackByOmission = Object.freeze({
    '': 'në këtë mëngjes pranvere, po bie shi.',
    season: 'në këtë mëngjes, po bie shi.',
    'season+time': 'po bie shi.',
    'season+time+weather': null,
    'season+weather': 'është mëngjes.',
    time: 'në këtë pranverë, po bie shi.',
    'time+weather': 'është pranverë.',
    weather: 'është një mëngjes pranvere.',
  })
  let markedLines = 0
  for (const [nodeId, node] of Object.entries(STORY)) {
    for (const entry of node.text) {
      const target = lineOf(entry)
      if (!target.environmentDimensions?.length) continue

      // Construct the smallest truth assignment which makes this one wrapper
      // visible.  This catches a line accidentally buried by its own when(),
      // unless(), until() or whenUnless() metadata without guessing from prose.
      const conditional = !Array.isArray(entry)
      const conditionIds = conditional ? [].concat(entry.cond || []) : []
      const required = new Set(conditional && !entry.negate ? conditionIds : [])
      const observationId = observationIdOfLine(target)
      if (observationId) required.add(observationConditionId(observationId))
      const excluded = new Set([
        ...(conditional && entry.negate ? conditionIds : []),
        ...(conditional ? [].concat(entry.none || []) : []),
      ])
      const visible = visibleLines(node, (id) => required.has(id) && !excluded.has(id))
      assert.ok(visible.includes(target), `${nodeId}: marked line cannot become visible`)

      const visibleDimensions = [...authoredEnvironmentDimensions(visible)].sort()
      const expected = fallbackByOmission[visibleDimensions.join('+')]
      assert.ok(visibleDimensions.join('+') in fallbackByOmission,
        `${nodeId}: no pinned fallback case for ${visibleDimensions.join('+')}`)
      const fallback = environmentStoryLine(
        { clock: 0, season: 'spring', weather: 'rain' },
        { omit: visibleDimensions },
      )
      assert.equal(fallback ? albanianTextOf(fallback) : null, expected,
        `${nodeId}: an authored line suppressed an unrelated environment fact`)
      markedLines++
    }
  }
  assert.ok(markedLines >= 100, `only ${markedLines} authored environment lines were exercised`)
})

check('a positive lek balance is narrated exactly and zero stays silent', () => {
  assert.equal(purseStoryLine(0), null)
  assert.equal(purseStoryLine(-3), null)
  assert.equal(albanianTextOf(purseStoryLine(1)), 'ti ke 1 lek.')
  assert.equal(albanianTextOf(purseStoryLine(17)), 'ti ke 17 lekë.')
})

check('a money-changing arrival joins the action to the exact resulting balance', () => {
  const eliraOption = STORY.eliraShesh.options.find((option) => option.questAction?.action === 'accept')
  const knownOutcome = moneyOutcomeLineOf(eliraOption, (id) => id === 'knows:npcName:elira')
  const unknownOutcome = moneyOutcomeLineOf(eliraOption, () => false)
  assert.equal(
    albanianTextOf(moneyTransactionStoryLine(knownOutcome, 1_400)),
    'Elira të jep tetëqind lekë. Tani ke 1400 lekë.',
  )
  assert.equal(
    albanianTextOf(moneyTransactionStoryLine(unknownOutcome, 800)),
    'Gruaja të jep tetëqind lekë. Tani ke 800 lekë.',
  )
  assert.equal(
    albanianTextOf(moneyTransactionStoryLine(unknownOutcome, 808)),
    'Gruaja të jep tetëqind lekë. Tani ke 808 lekë.',
  )
})

check('each social encounter has one right greeting and three contextual distractors', () => {
  for (const [nodeId, periods] of Object.entries(greetingScenes)) {
    for (const period of periods) {
      const state = { ...newRun(), nodeId, clock: periodClock[period] }
      const visible = STORY[nodeId].options.filter((option) =>
        option.contextGreeting && hasRequiredItem(state, option),
      )
      assert.equal(visible.length, 4, `${nodeId}/${period}: expected four greeting choices`)
      assert.equal(visible.filter((option) => !option.confuser).length, 1, `${nodeId}/${period}: right-answer count`)
      assert.equal(visible.filter((option) => option.confuser).length, 3, `${nodeId}/${period}: distractor count`)
      assert.ok(visible.some((option) => albanianTextOf(option.text) === 'natën e mirë!'), `${nodeId}/${period}: no good-night distractor`)
    }
  }
})

check('all 24 civil hours narrate and accept the same greeting period', () => {
  const correctGreeting = Object.freeze({
    morning: 'mirëmëngjes!',
    day: 'mirëdita!',
    evening: 'mirëmbrëma!',
    night: 'mirëmbrëma!',
  })
  const narratedPart = Object.freeze({
    morning: 'në këtë mëngjes',
    noon: 'në këtë mesditë',
    afternoon: 'në këtë pasdite',
    evening: 'në këtë mbrëmje',
    night: 'në këtë natë',
  })
  for (let clock = 0; clock < 24; clock++) {
    const state = { ...newRun(), nodeId: 'tregtari', clock }
    const dayPart = civilDayPartAtClock(clock)
    const period = greetingPeriodAtClock(clock)
    const narrated = albanianTextOf(environmentStoryLine({ clock, season: 'spring', weather: 'clear' }))
    assert.ok(narrated.startsWith(narratedPart[dayPart]), `${civilHourAtClock(clock)}:00 narration drifted`)
    const right = STORY.tregtari.options.filter((option) =>
      option.contextGreeting && !option.confuser && hasRequiredItem(state, option),
    )
    assert.equal(right.length, 1, `${civilHourAtClock(clock)}:00 must expose exactly one correct greeting`)
    assert.equal(albanianTextOf(right[0].text), correctGreeting[period], `${civilHourAtClock(clock)}:00 greeting contradicts narration`)

    const spokenGreetings = visibleLines(STORY.tregtari, (id) => hasCond(state, id))
      .map(albanianTextOf)
      .filter((line) => Object.values(correctGreeting).includes(line))
    assert.deepEqual(spokenGreetings, [correctGreeting[period]], `${civilHourAtClock(clock)}:00 trader says a contradictory greeting`)
  }
})

check('a correct greeting records the spoken reply and an incorrect one costs one heart', () => {
  let state = { ...newRun(), nodeId: 'tregtari', clock: periodClock.evening, visited: { tregtari: true } }
  const visible = STORY.tregtari.options.filter((option) =>
    option.contextGreeting && hasRequiredItem(state, option),
  )
  const correct = visible.find((option) => !option.confuser)
  const wrong = visible.find((option) => option.confuser)
  for (const id of phraseSenses(correct.text)) {
    state.discovered[id] = true
    state.mana[id] = 1
  }
  for (const id of phraseSenses(wrong.text)) {
    state.discovered[id] = true
    state.mana[id] = 1
  }
  const answered = reducer(state, {
    type: 'CHOOSE', option: correct, targetNode: STORY.tregtari,
    fromNodeId: state.nodeId, fromTurn: state.turn,
  })
  assert.equal(answered.flags.greetedTrader, true)
  assert.equal(answered.flags['greetedTrader:evening'], undefined,
    'the completed greeting persisted an obsolete period-specific flag')
  assert.equal(answered.clock, state.clock, 'a spoken response consumed an invented hour')
  assert.equal(STORY.tregtari.options.filter((option) =>
    option.contextGreeting && hasRequiredItem(answered, option),
  ).length, 0, 'the completed greeting remained in the action list')
  assert.equal(reducer(state, {
    type: 'CONFUSE',
    optionId: `opt-${STORY.tregtari.options.indexOf(wrong)}`,
    optionIndex: STORY.tregtari.options.indexOf(wrong),
    expectedHearts: state.hearts,
    fromNodeId: state.nodeId,
    fromTurn: state.turn,
    consequence: {
      source: 'story-confuser',
      eventId: 'story-context:greeting-miss',
      attempted: { al: 'natën e mirë!' },
      reason: { code: 'wrong-time-greeting', text: 'This farewell does not fit the current greeting exchange.' },
      correction: { al: 'mirëmbrëma!', en: 'Good evening!' },
    },
  }).hearts, state.hearts - 1)
  assert.equal(wrong.contextGreeting.correct, false)
})

check('normal play hides diagnostic counters while debug keeps the inspectors', () => {
  const app = fs.readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
  const story = fs.readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
  const debugHeader = fs.readFileSync(new URL('../src/components/DebugHeaderStats.jsx', import.meta.url), 'utf8')
  assert.match(app, /state\.debug \? \([\s\S]*?<DebugHeaderStats state=\{state\}[^>]+>[\s\S]*?<\/Suspense>\s*\) : activeQuest \? \(/)
  assert.match(debugHeader, /<span className="stat">turn <b>\{state\.turn\}<\/b>/)
  assert.doesNotMatch(app, /<span className="stat">turn/,
    'diagnostic turn counter escaped its lazy debug-only boundary')
  assert.match(story, /state\.debug && <WorldContext/)
  assert.match(story, /setting: narrationSettingForScene\(state\.nodeId\)/)
  assert.match(story, /planEnvironmentNarration\(/)
  assert.match(story, /omit: environmentNarration\.omitDimensions/)
  assert.match(story, /type: 'NARRATE_ENVIRONMENT'/)
  assert.match(story, /environmentLine && renderLine\(environmentLine, 'environment'\)/)
  const canonicalProjection = fs.readFileSync(new URL('../src/game/gameState.js', import.meta.url), 'utf8')
  assert.match(story, /storyScenePresentationForState\(state\)/)
  assert.match(canonicalProjection, /add\('purse', purse\)/)
  assert.match(story, /presentedEntries\.map\(\(entry\) => renderLine\(entry\.line, entry\.renderKey\)\)/)
  assert.match(story, /if \(!hasRequiredItem\(storyState, opt\)\) return/)
})

check('all whole-line English readings are debug-only', () => {
  assert.equal(storyReadingVisible('hearts', false), false)
  assert.equal(storyReadingVisible('hearts'), false)
  assert.equal(storyReadingVisible('hearts', true), true)
  assert.equal(storyReadingVisible('environment', false), false)
  assert.equal(storyReadingVisible('environment', true), true)
  assert.equal(storyReadingVisible(0, false), false)
  assert.equal(storyReadingVisible(0, true), true)
})

console.log(`\n${checkCount - failures.length}/${checkCount} story-context contracts pass.`)
if (failures.length) {
  for (const failure of failures) console.log(`  - ${failure}`)
  process.exitCode = 1
}
