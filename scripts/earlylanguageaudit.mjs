// Release gate for the opening layers of practical Albanian.
//
// The eight-function centre is adapted from the Spanish Layers Method without
// pretending that Albanian has separate ser/estar verbs. Player-owned actions
// must establish every function early and repeat it. The surrounding top-300
// frequency layer must also be reachable along the conversation, village and
// forest openings instead of living in only one preferred route.

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { DICT, START_NODE, STORY, lineOf } from '../src/game/content.js'
import {
  ALBANIAN_ONION_CORE,
  EARLY_LANGUAGE_ROUTES,
  EARLY_ONION_POLICY,
  EARLY_TOP_300_POLICY,
} from './data/early_language_policy.mjs'
import { phraseSenses } from '../src/game/gameState.js'
import {
  TOP_1000_EXCLUSIONS,
  TOP_1000_EXISTING_FORMS,
  TOP_1000_ORTHOGRAPHIC_VARIANTS,
} from './data/sq_top1000_review.mjs'

const normalize = (value) => String(value || '')
  .toLocaleLowerCase('sq')
  .normalize('NFC')
  .replace(/[^a-zA-ZçÇëË'\s]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
const deaccent = (value) => value.normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/ë/g, 'e')
  .replace(/ç/g, 'c')

function reachableNodeDepths(rootNodeId, maxDepth, { stopBefore = [] } = {}) {
  const stopped = new Set(stopBefore)
  const depths = new Map([[rootNodeId, 0]])
  const queue = [rootNodeId]
  for (let cursor = 0; cursor < queue.length; cursor += 1) {
    const nodeId = queue[cursor]
    if (depths.get(nodeId) >= maxDepth) continue
    for (const option of STORY[nodeId]?.options || []) {
      if (option.confuser || !option.to || stopped.has(option.to) || depths.has(option.to)) continue
      depths.set(option.to, depths.get(nodeId) + 1)
      queue.push(option.to)
    }
  }
  return depths
}

function actionMatches(core, senses) {
  const senseSet = new Set(senses)
  const hasCoreSense = core.senseIds.some((id) => senseSet.has(id))
  if (!hasCoreSense) return false
  if (core.matchKind === 'sense') return true

  // Albanian jam covers both Spanish ser and estar. Keep the two learning
  // functions distinct through the meaning carried by the same action: an
  // origin/name frame is identity; the remaining copular actions establish a
  // condition, judgement or location.
  const identity = senseSet.has('quhem')
    || senseSet.has('nga')
    || (senseSet.has('une') && senseSet.has('jam'))
  if (core.matchKind === 'identity-be') return identity
  if (core.matchKind === 'state-location-be') return !identity
  throw new Error(`Unknown onion-core match kind: ${core.matchKind}`)
}

function actionsIn(depths) {
  const actions = []
  for (const [nodeId, depth] of depths) {
    for (const [optionIndex, option] of (STORY[nodeId]?.options || []).entries()) {
      if (option.confuser) continue
      actions.push({
        nodeId,
        optionIndex,
        depth,
        senses: phraseSenses(option.text || []),
      })
    }
  }
  return actions
}

assert.deepEqual(ALBANIAN_ONION_CORE.map((entry) => entry.id), [
  'want', 'go', 'have', 'have-to', 'can', 'do-make', 'be-identity', 'be-state-location',
], 'the reviewed eight-function centre changed')
assert.equal(new Set(ALBANIAN_ONION_CORE.map((entry) => entry.id)).size, 8)
for (const core of ALBANIAN_ONION_CORE) {
  assert.ok(core.firstPerson && core.secondPerson, `${core.id}: missing I/you anchor forms`)
  for (const senseId of core.senseIds) assert.ok(DICT[senseId], `${core.id}: unknown sense ${senseId}`)
}

const firstActionDepths = reachableNodeDepths(START_NODE, EARLY_ONION_POLICY.firstActionMaxDepth)
const firstActions = actionsIn(firstActionDepths)
const repeatedDepths = reachableNodeDepths(START_NODE, EARLY_ONION_POLICY.repeatedActionMaxDepth)
const repeatedActions = actionsIn(repeatedDepths)

const coreSummary = []
for (const core of ALBANIAN_ONION_CORE) {
  const firstDepth = firstActions
    .filter((action) => actionMatches(core, action.senses))
    .reduce((best, action) => Math.min(best, action.depth), Infinity)
  const repeatedCount = repeatedActions.filter((action) => actionMatches(core, action.senses)).length
  assert.ok(firstDepth <= EARLY_ONION_POLICY.firstActionMaxDepth,
    `${core.id}: no player action by depth ${EARLY_ONION_POLICY.firstActionMaxDepth}`)
  assert.ok(repeatedCount >= EARLY_ONION_POLICY.minimumRepeatedActions,
    `${core.id}: ${repeatedCount} early actions; expected at least ${EARLY_ONION_POLICY.minimumRepeatedActions}`)
  coreSummary.push(`${core.id}=${repeatedCount}`)
}

const frequencyLines = readFileSync(new URL('./data/sq_frequency_50k.txt', import.meta.url), 'utf8')
  .trim().split('\n')
const topTokens = frequencyLines.slice(0, EARLY_TOP_300_POLICY.limit)
  .map((line) => line.split(/\s+/)[0])
assert.equal(topTokens.length, EARLY_TOP_300_POLICY.limit)

const reviewFamilyByToken = new Map()
for (const registry of [TOP_1000_EXISTING_FORMS, TOP_1000_ORTHOGRAPHIC_VARIANTS]) {
  for (const [senseId, tokens] of Object.entries(registry)) {
    for (const token of tokens.split(/\s+/).filter(Boolean)) reviewFamilyByToken.set(token, senseId)
  }
}
const excludedTokens = new Set(Object.values(TOP_1000_EXCLUSIONS)
  .flatMap((entry) => entry.tokens.split(/\s+/).filter(Boolean)))
const ignoredClitics = new Set(EARLY_TOP_300_POLICY.ignoredSingleLetterClitics)
const eligibleTokens = topTokens.filter((token) => !ignoredClitics.has(token) && !excludedTokens.has(token))

const dictIdsBySurface = new Map()
for (const [senseId, entry] of Object.entries(DICT)) {
  for (const surface of [entry.al, ...(entry.forms || []).map((form) => form.al)]) {
    for (const token of normalize(surface).split(/\s+/).filter(Boolean)) {
      const ids = dictIdsBySurface.get(token) || []
      ids.push(senseId)
      dictIdsBySurface.set(token, ids)
    }
  }
}

function languageIn(depths) {
  const surfaces = new Set()
  const deaccentedSurfaces = new Set()
  const senses = new Set()
  const add = (tokens) => {
    for (const token of tokens || []) {
      if (token.id) senses.add(token.id)
      for (const part of normalize(token.al).split(/\s+/).filter(Boolean)) {
        surfaces.add(part)
        deaccentedSurfaces.add(deaccent(part))
      }
    }
  }
  for (const nodeId of depths.keys()) {
    for (const entry of STORY[nodeId]?.text || []) add(lineOf(entry))
    for (const option of STORY[nodeId]?.options || []) if (!option.confuser) add(option.text)
  }
  return { surfaces, deaccentedSurfaces, senses }
}

function coversToken(language, token) {
  if (language.surfaces.has(token) || language.deaccentedSurfaces.has(deaccent(token))) return true
  const reviewedFamily = reviewFamilyByToken.get(token)
  if (reviewedFamily && language.senses.has(reviewedFamily)) return true
  return (dictIdsBySurface.get(token) || []).some((senseId) => language.senses.has(senseId))
}

const routeCoverage = []
for (const route of EARLY_LANGUAGE_ROUTES) {
  assert.ok(STORY[route.rootNodeId], `${route.id}: missing route root ${route.rootNodeId}`)
  const depths = reachableNodeDepths(route.rootNodeId, EARLY_ONION_POLICY.routeMaxDepth, {
    stopBefore: [START_NODE],
  })
  const routeActions = actionsIn(depths)
  for (const core of ALBANIAN_ONION_CORE) {
    const count = routeActions.filter((action) => actionMatches(core, action.senses)).length
    assert.ok(count >= EARLY_ONION_POLICY.minimumActionsPerRoute,
      `${route.id}/${core.id}: ${count} action(s); expected at least ${EARLY_ONION_POLICY.minimumActionsPerRoute}`)
  }
  const language = languageIn(depths)
  const covered = new Set(eligibleTokens.filter((token) => coversToken(language, token)))
  assert.ok(covered.size >= EARLY_TOP_300_POLICY.minimumEligiblePerRoute,
    `${route.id}: ${covered.size}/${eligibleTokens.length} useful top-300 targets early; `
      + `expected at least ${EARLY_TOP_300_POLICY.minimumEligiblePerRoute}`)
  routeCoverage.push({ ...route, covered })
}

const acrossRoutes = eligibleTokens.filter((token) =>
  routeCoverage.some((route) => route.covered.has(token))).length
const inTwoRoutes = eligibleTokens.filter((token) =>
  routeCoverage.filter((route) => route.covered.has(token)).length >= 2).length
assert.ok(acrossRoutes >= EARLY_TOP_300_POLICY.minimumEligibleAcrossRoutes,
  `${acrossRoutes}/${eligibleTokens.length} useful top-300 targets occur across early routes; `
    + `expected at least ${EARLY_TOP_300_POLICY.minimumEligibleAcrossRoutes}`)
assert.ok(inTwoRoutes >= EARLY_TOP_300_POLICY.minimumEligibleInTwoRoutes,
  `${inTwoRoutes}/${eligibleTokens.length} useful top-300 targets occur in two early routes; `
    + `expected at least ${EARLY_TOP_300_POLICY.minimumEligibleInTwoRoutes}`)

console.log(`Onion centre: 8/8 functions appear as player actions by depth ${EARLY_ONION_POLICY.firstActionMaxDepth}; `
  + `repetition by depth ${EARLY_ONION_POLICY.repeatedActionMaxDepth}: ${coreSummary.join(', ')}.`)
console.log(`Top ${EARLY_TOP_300_POLICY.limit}: ${eligibleTokens.length} useful targets after `
  + `${ignoredClitics.size} single-letter clitic shards and ${topTokens.filter((token) => excludedTokens.has(token)).length} reviewed exclusions.`)
for (const route of routeCoverage) {
  console.log(`  ${route.label}: ${route.covered.size}/${eligibleTokens.length} by ${EARLY_ONION_POLICY.routeMaxDepth} choices without changing opening road`)
}
console.log(`  multiple directions: ${inTwoRoutes}/${eligibleTokens.length} in at least two routes; ${acrossRoutes}/${eligibleTokens.length} across the three-route union`)
console.log('Early language onion audit passed.')
