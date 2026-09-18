import assert from 'node:assert/strict'
import { STORY, lineOf } from '../../src/game/content.js'
import gjizar from '../../src/game/data/tales/gjizar.js'
import { NODE_POS, PLACE_OF } from '../../src/components/nodePositions.js'
import { NODE_REGION } from '../../src/game/regions.js'
import { UNCHARTED_SITES, unchartedSiteContextForState, unchartedSiteTransitionForChoice } from '../../src/game/unchartedSites.js'
import { unchartedSiteIssues } from '../../src/game/unchartedSiteValidation.js'
import { worldLocationForState } from '../../src/game/worldLocation.js'
import { routeForChoice } from '../../src/game/worldModel.js'
import { worldActionIssues, worldActionOfOption, worldRelationsForState } from '../../src/game/worldEntities.js'
import { albanianTextOf } from '../../src/game/language.js'
import { authoredStoryConfusers, consequenceForStoryConfuser, storyConfuserCandidates } from '../../src/game/storyConfusers.js'
import { normalizeHeartConsequence } from '../../src/game/heartConsequences.js'
import { newRun, reducer } from '../../src/game/gameState.js'

export function runUnchartedSiteAssertions() {
  assert.deepEqual(unchartedSiteIssues(STORY), [])
  const site = UNCHARTED_SITES.find(({ id }) => id === 'gjizar-beauty-ship')
  assert.ok(site)
  assert.equal(site.source, 'gjizar.harbor; Gjizar kenga 11.3–11.8')
  assert.deepEqual(site.nodes, ['gjizarAnija', 'gjizarFund'])
  const harbor = gjizar.places.find(({ id }) => id === 'harbor')
  assert.equal(harbor.anchor.status, 'offstage', 'source has gained a chart anchor; review uncharted site disposition')
  assert.equal(harbor.anchor.node, undefined)
  const song = gjizar.beats.find(({ id }) => id === 'kenga')
  const clauses = new Map(song.lines.map(([id, english, albanian]) => [id, { english, albanian }]))
  assert.match(clauses.get('11.3').albanian, /cohë të kuqe.*port e pallatit.*papuar/)
  assert.match(clauses.get('11.4').english, /horse.*nightingale.*cloth/)
  assert.match(clauses.get('11.7').english, /ship.*welcomes/)
  assert.match(clauses.get('11.8').english, /Boarding.*bird/)
  assert.equal(song.cast.youngest[0], 'harbor')
  assert.equal(song.cast.beauty[0], 'harbor')
  assert.equal(gjizar.play.scenes.gjizarAnija, 'kenga')
  assert.equal(gjizar.play.scenes.gjizarFund, 'kenga')

  for (const entry of site.transitions) {
    const index = STORY[entry.from].options.findIndex((option) => option.to === entry.to)
    const option = STORY[entry.from].options[index]
    const state = { nodeId: entry.to, cameFrom: entry.from, choiceIndex: index, ended: STORY[entry.to].end || null }
    assert.equal(unchartedSiteTransitionForChoice(entry.from, option, STORY)?.transition, entry)
    assert.equal(unchartedSiteContextForState(state, STORY)?.site, site)
    assert.equal(worldLocationForState(state).siteId, site.id)
    for (const node of site.nodes) for (const table of [NODE_POS, PLACE_OF, NODE_REGION]) assert.equal(table[node], undefined)
    const route = routeForChoice(entry.from, option)
    assert.equal(route.charted, false)
    assert.equal(route.siteTransitionId, entry.id)
    assert.equal(route.duration.hours, entry.durationHours)
    assert.equal(route.samePlace, site.nodes.includes(entry.from))
    for (const field of ['vector', 'dx', 'dy', 'distance', 'toPlace', 'toRegion']) assert.equal(route[field], null)
    const action = worldActionOfOption(entry.from, option)
    assert.equal(action.to, `site:${site.id}`)
    assert.equal(action.siteTransition, entry)
    assert.deepEqual(worldActionIssues(entry.from, option), [])
    assert.equal(unchartedSiteTransitionForChoice(entry.from, { ...option }, STORY), null, 'noncanonical choice clone acquired location authority')
    assert.equal(routeForChoice(entry.from, { ...option }).valid, false)
    assert.ok(worldActionIssues(entry.from, { ...option }).length)
    for (const mutation of [{ durationHours: 9 }, { time: 'night' }, { date: 'summer-day' }, { atHour: 12 }, { to: 'start' }, { playerAction: { id: 'unrelated' } }]) {
      const changed = { ...option, ...mutation }
      const story = { ...STORY, [entry.from]: { ...STORY[entry.from], options: [changed] } }
      assert.equal(unchartedSiteTransitionForChoice(entry.from, changed, story), null, `accepted changed action ${JSON.stringify(mutation)}`)
      assert.ok(unchartedSiteIssues(story).length, `validator accepted changed action ${JSON.stringify(mutation)}`)
    }
    for (const mutation of [{ cameFrom: null }, { choiceIndex: -1 }, { choiceIndex: index + 99 }, { ended: 'wrong' }]) {
      const stale = { ...state, ...mutation }
      assert.equal(unchartedSiteContextForState(stale, STORY), null)
      assert.equal(worldLocationForState(stale).kind, 'unknown')
      assert.equal(worldRelationsForState(stale).some(({ subject, type }) => subject === 'actor:player' && type === 'at'), false)
    }
  }
  const mutations = [
    null, { ...site, id: 12 }, { ...site, source: '' }, { ...site, owner: '' }, { ...site, reviewTrigger: '' },
    { ...site, nodes: [...site.nodes, 'start'] }, { ...site, nodes: ['gjizarAnija', 'gjizarAnija'] },
    { ...site, scope: { ...site.scope, maximumNodes: 99 } },
    { ...site, transitions: [null, site.transitions[1]] },
    ...['id', 'actionId', 'from', 'to'].map((field) => ({ ...site, transitions: [{ ...site.transitions[0], [field]: 1 }, site.transitions[1]] })),
    { ...site, transitions: [site.transitions[0], site.transitions[0]] },
    { ...site, extra: 'unreviewed' },
  ]
  for (const mutation of mutations) assert.ok(unchartedSiteIssues(STORY, [mutation]).length, 'malformed site registry passed')
  assert.ok(unchartedSiteIssues(STORY, [site, site]).length)
  const extraArrival = { ...STORY, start: { ...STORY.start, options: [...STORY.start.options, { ...STORY.gjizarKthim.options[0] }] } }
  assert.ok(unchartedSiteIssues(extraArrival).some((issue) => issue.includes('start->gjizarAnija')))
  const oldEnding = { nodeId: 'gjizarFund', cameFrom: 'gjizarTradheti', choiceIndex: 0, ended: STORY.gjizarFund.end }
  assert.equal(worldLocationForState(oldEnding).kind, 'unknown')
  assert.equal(worldLocationForState(oldEnding).siteId, null)
  for (const [nodeId, target, phrase] of [['gjizarKthim', 'qilim', 'pi qilimin.'], ['gjizarAnija', 'anije', 'pi anijen.']]) {
    assert.equal(STORY[nodeId].options[0].confuser, undefined, 'a confuser displaced the real action')
    const [confuser] = authoredStoryConfusers(STORY[nodeId])
    assert.equal(confuser.optionIndex, 1)
    assert.equal(confuser.option.to, undefined, 'an impossible drinking attempt gained a destination')
    assert.equal(albanianTextOf(confuser.tokens), phrase)
    assert.deepEqual(confuser.tokens.filter(({ id }) => id).map(({ id }) => id), ['pi', target])
    assert.ok(STORY[nodeId].text.some((entry) => lineOf(entry).some(({ id }) => id === target)), 'the impossible action’s object is not established in source prose')
    const state = { nodeId, discovered: { pi: true, [target]: true }, hearts: 3 }
    assert.equal(storyConfuserCandidates(state).some(({ key }) => key === confuser.key), true)
    for (const missing of ['pi', target]) assert.equal(storyConfuserCandidates({ ...state, discovered: { ...state.discovered, [missing]: false } }).length, 0)
    assert.equal(storyConfuserCandidates({ ...state, embodying: 'gjizar' }).length, 0, 'authored distractors bypassed the existing embodiment boundary')
    const consequence = consequenceForStoryConfuser(state, confuser)
    assert.equal(consequence.attempted.al, phrase)
    assert.ok(normalizeHeartConsequence(consequence, 1))
    assert.deepEqual(worldActionIssues(nodeId, confuser.option), [])
    if (nodeId === 'gjizarAnija') {
      assert.equal(unchartedSiteTransitionForChoice(nodeId, confuser.option, STORY), null)
      assert.equal(routeForChoice(nodeId, confuser.option).valid, false)
      assert.ok(worldActionIssues(nodeId, { ...confuser.option }).length)
      assert.ok(worldActionIssues(nodeId, { ...confuser.option, to: 'gjizarFund' }).length)
      // An isolated non-embodied reducer fixture exercises the generic mistake
      // boundary; real Gjizar routes keep the existing no-confusers role policy.
      const before = { ...newRun(), ...state, cameFrom: 'gjizarKthim', choiceIndex: 0,
        mana: { pi: 2, anije: 2 }, practiced: { pi: 2, anije: 2 } }
      const action = { type: 'CONFUSE', fromNodeId: nodeId, fromTurn: before.turn,
        expectedHearts: before.hearts, optionId: confuser.key, optionIndex: confuser.optionIndex }
      const rejectedRole = { ...before, embodying: 'gjizar' }
      assert.strictEqual(reducer(rejectedRole, action), rejectedRole)
      assert.strictEqual(reducer(before, { ...action, optionIndex: 99 }), before)
      const attempted = reducer(before, action)
      assert.notStrictEqual(attempted, before)
      assert.equal(attempted.hearts, before.hearts - 1)
      assert.equal(attempted.pendingHeartConsequence.attempted.al, phrase)
      assert.equal(attempted.pendingHeartConsequence.reason.code, 'impossible-scene-action')
      assert.ok(attempted.pendingHeartConsequence.reasoning)
      for (const field of ['nodeId', 'cameFrom', 'choiceIndex', 'clock', 'turn']) assert.equal(attempted[field], before[field])
      assert.deepEqual(worldLocationForState(attempted), worldLocationForState(before))
      assert.equal(worldLocationForState(attempted).siteId, site.id)
      const acknowledged = reducer(attempted, { type: 'ACKNOWLEDGE_HEART_CONSEQUENCE', eventId: attempted.pendingHeartConsequence.eventId })
      assert.equal(acknowledged.pendingHeartConsequence, null)
      assert.deepEqual(worldLocationForState(acknowledged), worldLocationForState(before))
      assert.equal(acknowledged.clock, before.clock)
    }
  }
  return site.transitions.length
}
