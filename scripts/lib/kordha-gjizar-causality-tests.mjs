import assert from 'node:assert/strict'
import { STORY, lineOf } from '../../src/game/content.js'
import { albanianTextOf } from '../../src/game/language.js'
import { embodimentIdentity, embodimentQuest } from '../../src/game/embodiment.js'
import { canonicalPlayerActionId } from '../../src/game/playerActionRuntime.js'
import { resolveRevealLine } from '../../src/game/revealResolver.js'
import { NODE_POS, PLACE_OF, PLACE_NODES } from '../../src/components/nodePositions.js'
import { PLACE_META } from '../../src/components/placeMeta.js'
import { NODE_REGION } from '../../src/game/regions.js'
import { worldLocationForState } from '../../src/game/worldLocation.js'
import { routeForChoice } from '../../src/game/worldModel.js'
import { worldRelationsForState } from '../../src/game/worldEntities.js'
import {
  canChoose, currentStoryState, hasCond, newRun, normalizeSavedState, reducer,
  storyScenePresentationForState, trainablePhraseSenses,
} from '../../src/game/gameState.js'
import { recordPresentedStoryReadings } from './comprehension-journeys.mjs'
import { commitProjectedOption, settleProjectedState } from './story-projections.mjs'

const reload = (state) => normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
const lines = (state) => storyScenePresentationForState(state).normalEntries.map(({ line }) => line)
const prose = (state) => lines(state).map(albanianTextOf).join('\n')
const prepare = (state, option) => {
  const reveal = option.reveal ? resolveRevealLine(STORY[state.nodeId].text.map(lineOf), option).line : []
  const ids = new Set([...trainablePhraseSenses(option.text), ...trainablePhraseSenses(reveal || [])])
  const discovered = { ...state.discovered }, mana = { ...state.mana }, practiced = { ...state.practiced }
  for (const id of ids) {
    discovered[id] = true
    mana[id] = Math.max(20, mana[id] || 0)
    practiced[id] = Math.max(mana[id], practiced[id] || 0)
  }
  return { ...state, discovered, mana, practiced }
}
const ordered = (text, parts) => {
  let previous = -1
  for (const part of parts) {
    const position = text.indexOf(part)
    assert.ok(position > previous, `Missing or out-of-order causal beat ${JSON.stringify(part)} in:\n${text}`)
    previous = position
  }
}

// The only fixture setup is a public threshold and backed lexical practice.
// Roles, items, story flags, durations, arrival receipts and endings all come
// from accepted production reducer actions; forks reuse those earned states.
export function checkKordhaGjizarCausality(check) {
  const completed = new Map(), visitedEdges = new Set(), stages = new Map(), choicePoints = new Map()
  const take = (input, actionId) => {
    const candidates = STORY[input.nodeId].options.filter((option) => !option.confuser &&
      canonicalPlayerActionId(input.nodeId, option) === actionId)
      .map((option) => ({ option, state: prepare(input, option) }))
      .filter(({ option, state }) => canChoose(currentStoryState(state), option))
    assert.equal(candidates.length, 1, `${input.nodeId}: expected one legal ${actionId}`)
    const { option, state } = candidates[0]
    const before = recordPresentedStoryReadings(state)
    const after = commitProjectedOption(before, option)
    assert.ok(after !== before, `${actionId}: reducer rejected route`)
    assert.equal(after.nodeId, option.to)
    assert.equal(after.cameFrom, before.nodeId)
    assert.equal(after.choiceIndex, STORY[before.nodeId].options.indexOf(option))
    assert.equal(after.turn, before.turn + 1)
    assert.ok(after.actionSpeech, `${actionId}: accepted action lost karaoke handoff`)
    visitedEdges.add(`${before.nodeId}:${after.choiceIndex}->${after.nodeId}`)
    return recordPresentedStoryReadings(settleProjectedState(after))
  }
  const finish = (label, state) => {
    assert.ok(STORY[state.nodeId].end)
    assert.equal(state.ended, STORY[state.nodeId].end)
    completed.set(label, state)
    return state
  }

  check('Kordha enters as the sword-bearer and swears before travelling', () => {
    const entry = take({ ...newRun(), nodeId: 'pylli1', clock: 3 }, 'pylli1:fol-me-vella')
    assert.equal(embodimentIdentity(entry), 'Kordha')
    assert.ok(hasCond(entry, 'shpataKordhes'))
    assert.equal(hasCond(entry, 'flag:kordhaBesaSworn'), false)
    assert.match(prose(entry), /Shpata jote është me ty; dy burra rrinë pranë teje/)
    assert.match(prose(entry), /jeta jote është në shpatën tënde/)
    assert.doesNotMatch(prose(entry), /ti premton|tre vëllezër|Ylli|Deti/)
    const travel = STORY.kordha1.options[1]
    assert.equal(canChoose(currentStoryState(prepare(entry, travel)), travel), false)
    const sworn = take(entry, 'kordha-swear-besa')
    for (const state of [sworn, reload(sworn)]) {
      assert.ok(hasCond(state, 'flag:kordhaBesaSworn'))
      assert.match(prose(state), /ti premton një besë; ti dhe dy burrat jeni vëllezër/)
    }
    stages.set('kordha-entry', entry)
    choicePoints.set('kordha-entry', entry)
    stages.set('kordha-sworn', sworn)
    stages.set('kordha-moat', take(reload(sworn), 'kordha1:ec-me-vella-tek-hendek-i-link-mbret'))
  })

  check('Kordha crosses with two companions and the sword makes the chosen kill', () => {
    const moat = stages.get('kordha-moat')
    assert.match(prose(moat), /Vëllai që zhytet hedh një gur në anën tjetër/)
    assert.match(prose(moat), /unë ju mbaj të dy mbi hendekun/)
    assert.doesNotMatch(prose(moat), /ti kërcen|ti kalon|mbi shpatulla/)
    finish('kordha-lone-moat', take(moat, 'kordhamoat:kerce-vetem'))
    const crossed = take(moat, 'kordhamoat:kerce-me-vella')
    for (const state of [crossed, reload(crossed)]) {
      assert.match(prose(state), /Vëllai që kërcen të mban ty dhe vëllanë tjetër/)
      assert.match(prose(state), /ti je në anën tjetër të hendekut; uji i zi rri poshtë/)
      assert.match(prose(state), /Penda jote e bardhë është një shenjë për vëllezërit/)
      assert.doesNotMatch(prose(state), /tre vëllezër|vëllai lë një pendë/)
    }
    const palace = take(reload(crossed), 'kordhaudha:shko-ne-pallat')
    assert.doesNotMatch(prose(palace), /ti lufton|vret kulshedrën/)
    finish('kordha-lone-palace', take(palace, 'kordhapallat:hyr-vetem'))
    const spring = take(palace, 'kordhapallat:lufto-kulshedra-me-vella')
    ordered(prose(spring), ['ti lufton me dy vëllezërit', 'me shpatën tënde vret kulshedrën', 'pallati rri i qetë'])
    finish('kordha-hand-spring', take(spring, 'kordhaprova:pi-me-dore'))
    const secret = take(spring, 'kordhaprova:pi-pa-dore')
    assert.match(prose(secret), /Bukura të pyet: ku është fuqia jote/)
    ordered(prose(secret), ['janë larg', 'gjithsesi, ruajnë pendën tënde'])
    assert.doesNotMatch(prose(secret), /ti i tregon|Plaka merr|nuk të lënë vetëm/)
    stages.set('kordha-crossed', crossed)
    stages.set('kordha-secret', secret)
  })

  check('Kordha silence and disclosure have separate, ordered outcomes through reload', () => {
    const quiet = finish('kordha-kept-secret', take(stages.get('kordha-secret'), 'kordha2:rri-i-art-qete'))
    const disclosed = finish('kordha-disclosed-secret', take(stages.get('kordha-secret'), 'kordha2:fol-per-fuqi'))
    for (const state of [quiet, reload(quiet)]) {
      assert.match(prose(state), /ti rri i qetë dhe nuk flet për shpatën/)
      assert.doesNotMatch(prose(state), /lufton|vëllezërit dhe ti|Plaka merr|zhytet|shkon në det/)
    }
    for (const state of [disclosed, reload(disclosed)]) {
      ordered(prose(state), ['ti i tregon Bukurës', 'Vëllezërit të tregojnë më vonë',
        'Bukura i tregon plakës', 'Plaka merr shpatën dhe e hedh në det',
        'ti bie dhe mbyll sytë', 'Penda jote ka gjak', 'dy vëllezërit vijnë te ti',
        'Vëllai që zhytet shkon në det dhe sjell shpatën', 'ti zgjohesh i shëndoshë'])
      assert.equal(state.hearts, 3)
    }
    for (const state of [quiet, disclosed]) for (const mutation of [
      { cameFrom: null }, { choiceIndex: -1 }, { cameFrom: 'kordha1', choiceIndex: 0 },
    ]) assert.doesNotMatch(prose({ ...state, ...mutation }), /ti i tregon Bukurës|ti rri i qetë dhe nuk flet|Plaka merr/)
    const exited = take(stages.get('kordha-crossed'), 'kordhaudha:kthehu-ne-pyll')
    assert.equal(exited.nodeId, 'pylli1')
    assert.doesNotMatch(prose(exited), /ti premton një besë|Vëllai që kërcen të mban/)
    assert.ok(STORY.kordha1.options.every((option) => option.confuser || option.to !== 'pylli1'),
      'opening restores a local exit that the role boundary rejects; normal play already exposes Pause')
    const paused = reducer(stages.get('kordha-entry'), { type: 'PAUSE_EMBODIMENT' })
    assert.equal(paused.nodeId, 'pylli1')
    assert.equal(paused.embodimentPaused, true)
    assert.equal(reducer(reload(paused), { type: 'RESUME_EMBODIMENT' }).nodeId, 'kordha1')
  })

  check('Gjizar earns the helpers, three-month bargain and quiet theft through actual actions', () => {
    let state = take({ ...newRun(), nodeId: 'gjizar2', clock: 13 }, 'gjizar2:shko-larg-ne-rruge')
    assert.equal(embodimentIdentity(state), 'the youngest prince')
    assert.ok(lines(state).some((line) => line.npcAppearance?.npcId === 'egershania'), 'actual wild-woman portrait is absent')
    for (const id of ['gjizarudha:heq-morra-nga-flok-e-link-saj',
      'story:gjizar-udha:hap-zjarr-e_link-furre-me-gjethe',
      'gjizarudha:ngre-sy-e-link-luan-noun', 'story:gjizar-udha:lufto-shqiponje']) state = take(state, id)
    const beforeStay = state
    state = take(state, 'gjizar-three-month-stay')
    assert.ok(hasCond(state, 'flag:gjizarThreeMonthsStayed'))
    assert.equal(state.timePassage, null)
    assert.equal(currentStoryState(state).conditionClock - currentStoryState(beforeStay).conditionClock, 2160)
    const palace = take(reload(state), 'gjizarudha:fluturo-me-motra-tek-pallat')
    finish('gjizar-noisy-theft', take(palace, 'gjizarpallat:thirr-zog'))
    state = palace
    for (const id of ['story:gjizar-pallat:ndiz-kater-qiri', 'gjizarpallat:shuaj-kater-qiri',
      'story:gjizar-pallat:merr-kafaz-ngadale', 'gjizarpallat:kthehu-me-tre-shqiponje-tek-gur']) state = take(state, id)
    assert.equal(state.nodeId, 'gjizarTradheti')
    assert.ok(hasCond(state, 'flag:gjizarCageTaken'))
    assert.equal(hasCond(state, 'flag:gjizarRingsTaken'), false)
    stages.set('gjizar-stones', state)
  })

  check('Gjizar agreement names the shared father and remains distinct from betrayal', () => {
    const stones = stages.get('gjizar-stones')
    finish('gjizar-left-rings', take(stones, 'gjizar-leave-rings'))
    const rings = take(stones, 'gjizartradheti:merr-unaze')
    finish('gjizar-refused-brothers', take(rings, 'gjizar-refuse-brothers'))
    assert.match(prose(rings), /shkojmë bashkë te babai ynë/)
    assert.doesNotMatch(prose(rings), /hedhin në një pus|pusi është/)
    const agreed = take(rings, 'gjizar-agree-with-brothers')
    for (const state of [agreed, reload(agreed)]) {
      assert.match(prose(state), /unë do të shkoj me ju te babai ynë/)
      assert.match(prose(state), /ne shkojmë tani te babai ynë/)
      assert.equal(hasCond(state, 'flag:gjizarWentWithBrothers'), false)
      assert.doesNotMatch(prose(state), /hedhin në një pus|Njerëzit e mbretit/)
    }
    assert.equal(agreed.clock, rings.clock)
    const well = take(reload(agreed), 'gjizar-go-with-brothers')
    for (const state of [well, reload(well)]) {
      assert.match(prose(state), /me vëllezërit te babai yt/)
      assert.match(prose(state), /Njerëzit e mbretit rrinë mbi pusin\. një ul një litar/)
      assert.doesNotMatch(prose(state), /berber|kafene|presin pranë teje|Mbreti arrin|Bukura kërkon/)
    }
    const localLater = { ...well, cameFrom: null, choiceIndex: null }
    assert.match(prose(localLater), /Njerëzit e mbretit rrinë mbi pusin/)
    assert.doesNotMatch(prose(localLater), /ata kërkojnë ujë|hedhin në një pus/)
    const remained = finish('gjizar-remained-in-well', take(well, 'gjizartradheti:rri-ne-pus'))
    assert.match(prose(remained), /Vëllezërit kanë zogun tani/)
    assert.doesNotMatch(prose(remained), /vëllezërit marrin zogun/)
    stages.set('gjizar-well', well)
  })

  check('Gjizar recovery precedes the song; truthful testimony requires a separate choice', () => {
    const well = stages.get('gjizar-well')
    const recovered = take(well, 'gjizar-climb-king-rope')
    choicePoints.set('gjizar-home', recovered)
    assert.equal(recovered.nodeId, 'gjizarKthim')
    assert.equal(recovered.ended, null)
    assert.equal(recovered.clock - well.clock, 48, 'the narrated one or two days of recovery do not advance world time')
    assert.equal(currentStoryState(recovered).conditionClock - currentStoryState(well).conditionClock, 48)
    assert.notEqual(PLACE_OF.gjizarKthim, PLACE_OF.gjizarTradheti, 'the king’s home is falsely moved into the well')
    assert.deepEqual(PLACE_NODES.gjizarKthim, ['gjizarKthim'])
    assert.deepEqual(PLACE_META.gjizarKthim.happenings.flatMap(({ nodes }) => nodes), ['gjizarKthim'])
    for (const state of [recovered, reload(recovered)]) {
      ordered(prose(state), ['ti ngjitesh lart nëpër litarin', 'nga njerëzit e mbretit të tërheq',
        'ata të sjellin në shtëpi', 'nuk ke zë', 'Babai yt të tregon çfarë ndodhi më parë',
        'Vëllai i madh tha', 'një top goditi pallatin', 'pas një ose dy ditësh',
        'zëri yt kthehet', 'ti flet dhe Gjizar fillon të këndojë', 'një qilim i kuq', 'një kalë pret te dera'])
      assert.doesNotMatch(prose(state), /ti i tregon Bukurës|dasma vjen|Gjizar të sheh|të pyet|ti shkon me kalë/)
      assert.ok(lines(state).every((line) => !line.npcAppearance), 'rescue injects an unrelated king/prince portrait')
      assert.equal(state.clock, recovered.clock)
      assert.equal(currentStoryState(state).conditionClock, currentStoryState(recovered).conditionClock)
    }
    const aboard = take(reload(recovered), 'gjizar-ride-to-ship')
    assert.equal(aboard.nodeId, 'gjizarAnija')
    assert.equal(aboard.clock - recovered.clock, 1)
    assert.equal(currentStoryState(aboard).conditionClock - currentStoryState(recovered).conditionClock, 1)
    for (const state of [aboard, reload(aboard)]) {
      ordered(prose(state), ['ti shkon me kalë mbi qilimin e kuq', 'Bukura del dhe të pret', 'Në anije, Bukura të pyet: si e ke marrë zogun?'])
      assert.doesNotMatch(prose(state), /ti i tregon Bukurës|dasma vjen|unë do të martohem/)
      assert.deepEqual(worldLocationForState(state), worldLocationForState(aboard))
    }
    // Browser fixtures inherit the reached ship and add only backed lexical
    // resources for the live answer and its visible sentence gate.
    choicePoints.set('gjizar-question', prepare(aboard, STORY.gjizarAnija.options[0]))
    const paused = reducer(aboard, { type: 'PAUSE_EMBODIMENT' })
    assert.notStrictEqual(paused, aboard)
    assert.equal(paused.embodimentPaused, true)
    assert.equal(paused.embodimentFocusNode, 'gjizarAnija')
    const resumed = reducer(reload(paused), { type: 'RESUME_EMBODIMENT' })
    assert.equal(resumed.nodeId, 'gjizarAnija')
    assert.equal(resumed.embodimentPaused, false)
    assert.equal(prose(resumed), prose(aboard))
    assert.equal(currentStoryState(resumed).conditionClock, currentStoryState(aboard).conditionClock)
    assert.deepEqual(worldLocationForState(resumed), worldLocationForState(aboard))
    const married = finish('gjizar-truth-and-marriage', take(resumed, 'gjizar-tell-truth'))
    assert.equal(married.clock, resumed.clock, 'truthful answer silently consumes travel time')
    assert.equal(currentStoryState(married).conditionClock, currentStoryState(resumed).conditionClock)
    for (const state of [married, reload(married)]) ordered(prose(state), [
      'ti i tregon Bukurës të drejtën për zogun', 'unë do të martohem me ty', 'pastaj dasma vjen'])
    for (const state of [aboard, resumed, married, reload(married)]) {
      const location = worldLocationForState(state)
      assert.equal(location.kind, 'uncharted')
      assert.equal(location.siteId, 'gjizar-beauty-ship')
      for (const key of ['placeId', 'regionId', 'position']) assert.equal(location[key], null)
      for (const table of [NODE_POS, PLACE_OF, NODE_REGION, PLACE_META]) assert.equal(table[state.nodeId], undefined)
      assert.ok(worldRelationsForState(state).some(({ subject, type, target }) => subject === 'actor:player' && type === 'at' && target === 'site:gjizar-beauty-ship'))
    }
    const shipSpeech = routeForChoice('gjizarAnija', STORY.gjizarAnija.options[0])
    assert.equal(shipSpeech.samePlace, true)
    assert.equal(shipSpeech.fromSiteId, shipSpeech.toSiteId)
    assert.equal(shipSpeech.duration.hours, 0)
    assert.equal(shipSpeech.vector, null)
    for (const state of [recovered, married]) for (const mutation of [
      { cameFrom: null }, { choiceIndex: -1 }, { cameFrom: 'gjizarTradheti', choiceIndex: 2 },
    ]) assert.doesNotMatch(prose({ ...state, ...mutation }), /ti ngjitesh lart nëpër litarin|ti i tregon Bukurës|dasma vjen/)
    for (const state of [aboard, married]) for (const mutation of [
      { cameFrom: null }, { choiceIndex: -1 }, { choiceIndex: 999 }, { cameFrom: 'gjizarTradheti', choiceIndex: 0 }, { ended: 'failure' },
    ]) {
      const stale = { ...state, ...mutation }
      assert.equal(worldLocationForState(stale).kind, 'unknown')
      assert.equal(worldLocationForState(stale).siteId, null)
      assert.equal(worldRelationsForState(stale).some(({ subject, type }) => subject === 'actor:player' && type === 'at'), false)
    }
  })

  check('all ten Kordha and Gjizar endings retain real route receipts after reload', () => {
    const expected = ['three-friends', 'gjizar'].flatMap((id) => embodimentQuest(id).endings).sort()
    assert.deepEqual([...completed.values()].map(({ nodeId }) => nodeId).sort(), expected)
    for (const state of completed.values()) {
      const restored = reload(state)
      assert.equal(restored.cameFrom, state.cameFrom)
      assert.equal(restored.choiceIndex, state.choiceIndex)
      assert.equal(restored.ended, state.ended)
      assert.ok(visitedEdges.has(`${state.cameFrom}:${state.choiceIndex}->${state.nodeId}`))
      assert.ok(state.storyReadings.length > 0, `${state.nodeId}: no actually presented source receipts`)
      assert.deepEqual(restored.storyReadings, state.storyReadings)
    }
  })
  return { completed, visitedEdges, choicePoints }
}
