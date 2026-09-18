import assert from 'node:assert/strict'
import { STORY, lineOf } from '../../src/game/content.js'
import { albanianTextOf } from '../../src/game/language.js'
import { canonicalPlayerActionId } from '../../src/game/playerActionRuntime.js'
import { resolveRevealLine } from '../../src/game/revealResolver.js'
import { NPC_FIRST_ENCOUNTERS } from '../../src/game/npcAppearance.js'
import { PLAYABLE_FORM_INVENTORY } from '../../src/game/formInventory.js'
import { PLACE_OF } from '../../src/components/nodePositions.js'
import {
  canChoose, currentStoryState, hasCond, newRun, normalizeSavedState, reducer,
  storyScenePresentationForState, trainablePhraseSenses,
} from '../../src/game/gameState.js'
import { speechChoiceActOf } from '../../src/game/speechChoices.js'
import { commitProjectedOption, settleProjectedState } from './story-projections.mjs'
import { recordPresentedStoryReadings } from './comprehension-journeys.mjs'

const reload = (state) => normalizeSavedState(JSON.parse(JSON.stringify(state)), newRun())
const lines = (state) => storyScenePresentationForState(state).normalEntries.map(({ line }) => line)
const prose = (state) => lines(state).map(albanianTextOf).join('\n')
const project = (input) => {
  const state = settleProjectedState(input)
  return recordPresentedStoryReadings(reducer(state, {
    type: 'NARRATE_NPC_APPEARANCES', nodeId: state.nodeId, turn: state.turn,
  }))
}
// Entry fixtures position a new run at each public tale approach. Subsequent
// actions, observations, role changes, world facts and receipts are reducer
// results. Only the exact action/reveal vocabulary receives lexical support.
const prepare = (state, option) => {
  const reveal = option.reveal ? resolveRevealLine(STORY[state.nodeId].text.map(lineOf), option).line : []
  const ids = new Set([...trainablePhraseSenses(option.text), ...trainablePhraseSenses(reveal || [])])
  const discovered = { ...state.discovered }, mana = { ...state.mana }, practiced = { ...state.practiced }
  for (const id of ids) {
    discovered[id] = true
    mana[id] = Math.max(30, mana[id] || 0)
    practiced[id] = Math.max(mana[id], practiced[id] || 0)
  }
  return { ...state, discovered, mana, practiced }
}
const ordered = (text, fragments) => {
  let position = -1
  for (const fragment of fragments) {
    const next = text.indexOf(fragment, position + 1)
    assert.ok(next > position, `missing or out-of-order consequence: ${fragment}\n${text}`)
    position = next
  }
}
const beeSetup = (state) => {
  const text = prose(state)
  assert.match(text, /një nga tri vajzat.*thërret te shtrati/)
  assert.doesNotMatch(text, /ti ndihmon|ti këndon|ti bën një qilim|sjell.*bukë|bekon|bëhesh|bëhet një (?:bletë|merimangë|gjinkallë)/i)
  for (const id of ['nenaTriMotrave', 'motraMerimanga', 'motraGjinkalla', 'motraBleta']) {
    assert.ok(lines(state).some((line) => line.npcAppearance?.npcId === id), `${id}: first encounter missing from normal setup`)
  }
}

export function checkFourArcsCausality(check) {
  const completed = new Map(), visitedEdges = new Set()
  const take = (input, actionId) => {
    const before = project(input)
    const candidates = STORY[before.nodeId].options.map((option, index) => ({ option, index }))
      .filter(({ option }) => !option.confuser && canonicalPlayerActionId(before.nodeId, option) === actionId)
      .map(({ option, index }) => ({ option, index, state: prepare(before, option) }))
      .filter(({ option, state }) => canChoose(currentStoryState(state), option))
    assert.equal(candidates.length, 1, `${before.nodeId}: expected one legal ${actionId}`)
    const { option, index, state } = candidates[0]
    const next = commitProjectedOption(state, option)
    assert.notEqual(next, state, `${actionId}: reducer rejected the action`)
    assert.equal(next.nodeId, option.to)
    assert.equal(next.turn, state.turn + 1)
    assert.ok(next.actionSpeech, `${actionId}: accepted action lost the continuous audio handoff`)
    visitedEdges.add(`${state.nodeId}:${index}->${option.to}`)
    return project(next)
  }
  const begin = (nodeId) => project({ ...newRun(), nodeId, clock: 9 })
  const finish = (state, nodeId, verify) => {
    assert.equal(state.nodeId, nodeId)
    assert.equal(state.ended, STORY[nodeId].end)
    assert.ok(Object.keys(state.storyReadings || {}).length, `${nodeId}: route has no normal reading receipts`)
    for (const current of [state, reload(state)]) verify(current)
    completed.set(nodeId, state)
  }

  let beeFirst
  check('Bee setup and all three choices preserve the chosen daughter’s causal sequence', () => {
    for (const [action, ending] of [
      ['bleta1:ndihmo-nene', 'bletaFund'],
      ['bleta1:bej-nje-qilim', 'merimangaFund'],
      ['bleta1:kendo', 'gjinkallaFund'],
    ]) {
      let state = take(begin('gjizar1'), 'bee-visit-mother')
      assert.equal(state.embodying?.taleId || state.embodying, 'bee-spider-cicada')
      beeSetup(state)
      beeSetup(reload(state))
      beeFirst ||= state
      state = take(state, action)
      finish(state, ending, (current) => {
        const text = prose(current)
        assert.doesNotMatch(text, /nëna (?:ka vdekur|vdes|është e vdekur)|nuk shkon te nëna/i)
        if (ending === 'bletaFund') {
          ordered(text, ['ti ndihmon nënën', 'ajo qetësohet', 'Nëna thotë', 'ti bëhesh një bletë'])
          assert.doesNotMatch(text, /merimangë|gjinkallë/)
        } else if (ending === 'merimangaFund') {
          ordered(text, ['ti bën një qilim', 'Nëna thotë', 'ti bëhesh një merimangë'])
          assert.doesNotMatch(text, /gjinkallë|një bletë|ti ndihmon/)
        } else {
          ordered(text, ['ti këndon', 'Nëna thotë', 'ti bëhesh një gjinkallë'])
          assert.doesNotMatch(text, /merimangë|një bletë|ti ndihmon/)
        }
      })
    }
  })
  check('Bee checks reject premature authored help and premature portrait delivery', () => {
    STORY.bleta1.text.push(STORY.bletaFund.text[0])
    try { assert.throws(() => beeSetup({ ...beeFirst }), /ti ndihmon/) }
    finally { STORY.bleta1.text.pop() }
    const portrait = NPC_FIRST_ENCOUNTERS.motraBleta.portraitLines[0].line
    const previous = portrait.slice()
    try {
      portrait.splice(0, portrait.length, ...lineOf(STORY.bletaFund.text[0]))
      assert.throws(() => beeSetup({ ...beeFirst }), /ti ndihmon/)
    } finally { portrait.splice(0, portrait.length, ...previous) }
    beeSetup(beeFirst)
  })

  check('Aga Ymer returns to captivity only after choosing the kept besa', () => {
    for (const [action, ending] of [['agaymer2:mban-bese', 'agaYmerFund'], ['agaymer2:rri-ne-shtepi', 'agaYmerStay']]) {
      let state = take(begin('agaYmer1'), 'agaymer1:degjo-trim')
      for (const current of [state, reload(state)]) {
        assert.match(prose(current), /unë jam kthyer në shtëpi/)
        assert.doesNotMatch(prose(current), /unë kthehem në burg|ti kthehesh në burg/)
      }
      state = take(state, action)
      finish(state, ending, (current) => {
        const text = prose(current)
        if (ending === 'agaYmerFund') ordered(text, [
          'ti mban besën dhe kthehesh në burg', 'Bija e mbretit dhe shokët',
          'mirë se erdhe', 'Mbreti të fal', 'ti kthehesh në shtëpi',
        ])
        else {
          assert.match(text, /ti rri në shtëpi me gruan, por nuk mban besën/)
          assert.doesNotMatch(text, /kthehesh në burg|Mbreti të fal/)
        }
      })
    }
  })

  const rushaApproach = () => take(take(begin('odaJutbina'), 'observation:jutbina-krajl-talk'), 'odajutbina:shko-tek-rusha-ne-kulle-e-link-krajl')
  check('Rusha request precedes her oath and authorizes no drinking or travel', () => {
    let state = rushaApproach()
    const request = STORY.rusha1.options.find((option) => option.playerAction?.id === 'rusha-request-besa')
    assert.equal(speechChoiceActOf(request), null, 'summary imperative masquerades as the player’s exact words')
    for (const current of [state, reload(state)]) {
      assert.match(prose(current), /Kafeja pret para teje; Rusha ende nuk ka dhënë fjalën/)
      assert.doesNotMatch(prose(current), /ti kërkon një besë|Rusha të jep fjalën|ti pi kafenë/)
    }
    const previousClock = state.clock
    state = take(state, 'rusha-request-besa')
    assert.equal(state.clock, previousClock, 'a same-room request advances the world')
    assert.ok(state.flags.rushaOathRequested)
    finish(state, 'rushaFund', (current) => {
      ordered(prose(current), ['ti kërkon një besë nga Rusha', 'ajo duhet të bëjë si i thua ti', 'Rusha të jep fjalën', 'Filxhani me kafe rri para teje'])
      assert.doesNotMatch(prose(current), /vullnet|Mujo|Mujit|ti pi|Jutbin|hip|kalë/)
    })
    for (const altered of [
      { ...state, flags: { ...state.flags, rushaOathRequested: false } },
      { ...state, choiceIndex: 1 },
      { ...state, cameFrom: null },
    ]) for (const current of [altered, reload(altered)]) {
      assert.doesNotMatch(prose(current), /ti kërkon një besë/, 'unproved arrival invented the new request')
    }
  })
  check('Rusha alternative seizure and voluntary departure remain distinct', () => {
    const state = take(rushaApproach(), 'rusha1:merr-rusha-pa-bese')
    finish(state, 'rushaKeq', (current) => {
      ordered(prose(current), ['ti merr Rushën pa besë', 'Krajli të godet dhe ti vdes'])
      assert.equal(Boolean(current.flags.rushaOathRequested), false)
    })
    const returned = take(rushaApproach(), 'rusha1:kthehu-ne-jutbina')
    assert.equal(returned.nodeId, 'jutbina')
    assert.equal(returned.ended, null)
    assert.equal(Boolean(returned.flags.rushaOathRequested), false)
    assert.equal(reload(returned).nodeId, 'jutbina')
  })

  const fightApproach = () => {
    let state = begin('bregu')
    for (const action of ['observation:coast-tower', 'bregu:degjo-motra', 'balozmotra:degjo-motra',
      'baloztribut:degjo-motra', 'balozzgjedh:jep-shpate-trim', 'balozzgjedh:shko-ne-det-me-trim']) state = take(state, action)
    assert.match(prose(state), /Trimi është mbi kalë/)
    assert.match(prose(state), /me një armë në dorë/)
    assert.doesNotMatch(prose(state), /me një gur në dorë|hedh një gur|bie në gjunjë|pret kokën/)
    return state
  }
  check('Gjergj owns the horse response and both strikes; the player chooses to stay', () => {
    let state = fightApproach()
    const battlefield = PLACE_OF[state.nodeId]
    const previousClock = state.clock
    state = take(state, 'baloz-stand-by-hero')
    assert.equal(PLACE_OF[state.nodeId], battlefield, 'standing beside the hero relocates the battle')
    assert.equal(state.clock, previousClock)
    assert.ok(state.flags.stoodByGjergj)
    for (const current of [state, reload(state)]) {
      ordered(prose(current), ['ti rri pranë trimit', 'Balozi hedh armën', 'kali i trimit bie në gjunjë', 'arma kalon mbi kokën e trimit', 'Trimi godet balozin me armën e tij', 'pastaj nxjerr shpatën dhe pret kokën'])
      assert.doesNotMatch(prose(current), /ti vrapo|ti godet|ti pret|hedh një gur/)
    }
    for (const altered of [
      { ...state, flags: { ...state.flags, stoodByGjergj: false } },
      { ...state, choiceIndex: 1 },
      { ...state, cameFrom: null },
    ]) for (const current of [altered, reload(altered)]) {
      assert.doesNotMatch(prose(current), /ti rri pranë trimit/, 'unproved arrival invented the new stance')
      assert.match(prose(current), /kali i trimit bie në gjunjë/)
    }
    state = take(state, 'balozkoke:kthehu-ne-kulle')
    finish(state, 'balozFitore', (current) => {
      assert.equal(PLACE_OF[current.nodeId], PLACE_OF.bregu, 'the return invents another tower for the hero')
      assert.notEqual(PLACE_OF[current.nodeId], battlefield, 'the tower return never leaves the battlefield')
      ordered(prose(current), ['ti kthehesh në kullë', 'Trimi përqafon motrën', 'zemra e trimit dhe zemra e motrës ndalojnë bashkë', 'një varr për dy'])
      assert.ok(hasCond(current, 'fact:coastalBalozDefeated'))
      assert.doesNotMatch(prose(current), /ti gërmon|ti varros/)
    })
    const knee = PLAYABLE_FORM_INVENTORY.gju.find(({ al }) => al === 'gjunjë')
    assert.equal(knee?.source, 'playable')
    assert.equal(knee?.gloss, 'knees')
    assert.equal(knee?.tag, 'attestedSurface', 'one observed plural invented a full noun paradigm')
  })
  check('Fleeing the Baloz produces that pursuer’s exact capture and death', () => {
    const state = take(fightApproach(), 'balozlufte:ik-shpejt')
    finish(state, 'bregHumb', (current) => {
      ordered(prose(current), ['ti ikën', 'Balozi është më i shpejtë', 'ai të kap pranë detit', 'Balozi të ha'])
      assert.equal(Boolean(current.flags.stoodByGjergj), false)
      assert.equal(hasCond(current, 'fact:coastalBalozDefeated'), false)
    })
  })
  assert.equal(completed.size, 9, 'the four-arc certification handoff lost an ending')
  return { completed, visitedEdges }
}
