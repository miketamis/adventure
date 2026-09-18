// Visible prose should read as a lived scene, not as a database dump. This
// audit is condition-aware: mutually exclusive time, route, rendezvous and
// greeting variants are not treated as lines the player could see together.

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import {
  STORY,
  lineOf,
  visibleLines,
} from '../src/game/content.js'
import { albanianTextOf, englishReadingOf } from '../src/game/language.js'
import { NPCS } from '../src/game/npcs.js'
import { NPC_REGISTRY } from '../src/game/npcRegistryData.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import {
  ORDINARY_RESULT_CATEGORIES,
  REVIEWED_NARRATIVE_CORRIDORS,
  REVIEWED_UNGATED_AGENCY_CHOICES,
  REVIEWED_UNGATED_RESULT_CHOICES,
} from '../src/game/narrativeFlow.js'
import {
  NPC_IDENTITY_MODES,
  npcIdentityConditionId,
  npcIdentityKnowledgeId,
  npcIdentityPolicy,
} from '../src/game/npcIdentity.js'
import {
  auditExceptionClaimKey,
  auditExceptionFor,
  auditExceptionRegistryIssues,
  auditExceptionUsageIssues,
  defineAuditExceptionRegistry,
} from './lib/audit-exceptions.mjs'

const continuousCorridorTarget = (nodes) => `mandatory-corridor:${nodes.join('>')}`
const ordinaryResultExceptionTarget = (category, sourceNode, resultNode) =>
  `ordinary-result:${category}:${sourceNode}->${resultNode}`

// Positive agency restorations stay in the production narrative registry.
// These are the only true waivers: one indivisible combat consequence and two
// exact ordinary-result edges whose bounded continuations are still causal.
const NARRATIVE_FLOW_EXCEPTIONS = defineAuditExceptionRegistry({
  rules: {
    'continuous-narrative-corridor': { targetKind: 'exact live three-node mandatory corridor' },
    'ordinary-result-agency': { targetKind: 'exact categorized source-to-result edge' },
  },
  entries: [
    {
      id: 'kulshedra-finishing-blow',
      rule: 'continuous-narrative-corridor',
      targets: [continuousCorridorTarget(['kulshLufte2', 'fitorja', 'springReturn'])],
      rationale: 'Cutting the final head, seeing the Kulshedra fall and watching the released water run are one immediate physical consequence where an unrelated action cannot plausibly intervene.',
      evidence: 'The live graph contains exactly kulshLufte2 to fitorja to springReturn, and the first two nodes preserve the same combat-resolution place before the water release.',
      owner: 'narrative-flow',
      reviewTrigger: 'Review whenever any node, edge, physical place, option count or immediate combat consequence changes.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      category: 'combat-resolution',
      nodes: ['kulshLufte2', 'fitorja', 'springReturn'],
      maximumEdges: 2,
    },
    {
      id: 'eagle-well-ascent-is-one-physical-beat',
      rule: 'ordinary-result-agency',
      targets: [ordinaryResultExceptionTarget(ORDINARY_RESULT_CATEGORIES.GIFT, 'ngjitja2', 'ngjitja3')],
      rationale: 'Feeding the exhausted eagle happens during one uninterrupted ascent; the next and only act is climbing over the well rim at dawn, not choosing a new service or conversation.',
      evidence: 'ngjitja3 visibly establishes the end of night and the illuminated well rim before the player completes the same ascent to siperfaqja.',
      owner: 'narrative-flow',
      reviewTrigger: 'Review when ngjitja3 gains another action, moves away from the well rim, or separates feeding from the ascent.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      category: ORDINARY_RESULT_CATEGORIES.GIFT,
      sourceNode: 'ngjitja2',
      resultNode: 'ngjitja3',
      maximumGenuineContinuations: 1,
    },
    {
      id: 'arta-warning-resolves-as-an-ending-beat',
      rule: 'ordinary-result-agency',
      targets: [ordinaryResultExceptionTarget(ORDINARY_RESULT_CATEGORIES.DIALOGUE, 'uraNata', 'uraMengjes')],
      rationale: 'Warning the bride is the tale-defining moral choice: dawn visibly confirms that she stayed home, and the applicable route closes that ending instead of beginning an ordinary conversation hub.',
      evidence: 'uraMengjes preserves two mutually exclusive causal branches: the warned-bride branch reaches uraArtesShpetim, while keeping the besa proceeds toward uraGropa.',
      owner: 'narrative-flow',
      reviewTrigger: 'Review when either dawn branch gains an intervening activity, stops leading directly to its ending, or ceases to be mutually exclusive.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      category: ORDINARY_RESULT_CATEGORIES.DIALOGUE,
      sourceNode: 'uraNata',
      resultNode: 'uraMengjes',
      maximumGenuineContinuations: 2,
    },
  ],
})

const RUN_LENGTH = 4

const realOptionsOf = (nodeId) => (STORY[nodeId]?.options || [])
  .filter((option) => !option.confuser && option.to && STORY[option.to])

const requiredOf = (entry) => (
  Array.isArray(entry) || entry.negate ? [] : [].concat(entry.cond || [])
)
const excludedOf = (entry) => {
  if (Array.isArray(entry)) return []
  return [
    ...(entry.none || []),
    ...(entry.negate && !Array.isArray(entry.cond) ? [entry.cond] : []),
  ]
}

// Return [exclusive family, value]. Two different values in one family cannot
// be true in the same rendered scene. `from:a|b` values are alternatives, so
// two route requirements remain compatible only when their sets overlap.
const exclusiveSlot = (id) => {
  // The reducer exposes exactly one accepted action receipt for the current
  // arrival. Distinct action-bound consequence lines therefore cannot render
  // together, even when they lead back to the same physical scene.
  let match = id.match(/^arrival:action:(.+)$/)
  if (match) return ['arrival-action', match[1]]
  // A conversation question first clears every response flag in its hub and
  // then sets exactly one current response. Treat those generated conditions
  // as one exclusive slot so density checks model the real hub reducer instead
  // of pretending that answers to several different questions render at once.
  match = id.match(/^flag:conversation:([^:]+):response:(.+)$/)
  if (match) return [`conversation-response:${match[1]}`, match[2]]
  match = id.match(/^flag:([^:]+):(morning|day|evening|night)$/)
  if (match) return [`greeting-result:${match[1]}`, match[2]]
  match = id.match(/^greeting:(.+)$/)
  if (match) return ['greeting', match[1]]
  match = id.match(/^rendezvous:([^:]+):(.+)$/)
  if (match) return [`rendezvous:${match[1]}`, match[2]]
  match = id.match(/^(phase|weather|season):(.+)$/)
  if (match) return [match[1], match[2]]
  if (['dawn', 'morning', 'day', 'dusk', 'evening', 'night'].includes(id)) {
    return ['time-phase', id]
  }
  if (id.startsWith('from:')) return ['arrival-route', new Set(id.slice(5).split('|'))]
  return null
}

const canAppearTogether = (entries) => {
  const required = new Set()
  const excluded = new Set()
  const slotValues = new Map()

  for (const entry of entries) {
    for (const id of requiredOf(entry)) {
      if (excluded.has(id)) return false
      required.add(id)
      const slot = exclusiveSlot(id)
      if (!slot) continue
      const [family, value] = slot
      if (!slotValues.has(family)) {
        slotValues.set(family, value)
      } else {
        const previous = slotValues.get(family)
        if (previous instanceof Set && value instanceof Set) {
          const overlap = new Set([...previous].filter((candidate) => value.has(candidate)))
          if (!overlap.size) return false
          slotValues.set(family, overlap)
        } else if (previous !== value) {
          return false
        }
      }
    }
    for (const id of excludedOf(entry)) {
      if (required.has(id)) return false
      excluded.add(id)
    }
  }
  return true
}

const pronounSubjects = new Set(['ajo', 'ai', 'ata', 'ato', 'ti', 'une', 'ne_pron', 'ju'])
const discourseLeads = new Set(['pastaj', 'dhe', 'por', 'tani', 'megjithate', 'prandaj'])
const introductoryLeads = new Set([
  'ne', 'prane', 'pas', 'para', 'nga', 'me', 'per', 'kur', 'ndersa',
  'brenda', 'jashte', 'atje', 'ketu',
])

const explicitSubjectOf = (line) => {
  const tokens = line.filter((token) => token.id)
  let index = 0

  // In “Near the water, she …”, the subject follows the introductory phrase.
  if (introductoryLeads.has(tokens[0]?.id)) {
    const comma = line.findIndex((token) => token.paren && token.en === ',')
    if (comma >= 0) index = line.slice(0, comma + 1).filter((token) => token.id).length
  }
  while (discourseLeads.has(tokens[index]?.id)) index += 1

  const token = tokens[index]
  if (!token) return null
  if (pronounSubjects.has(token.id)) return token.id
  if (['defNom', 'indefNom'].includes(token.formTag)) return token.id
  if (/^\p{Lu}/u.test(token.al || '')) return token.id
  return null
}

const roboticRuns = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (let start = 0; start <= node.text.length - RUN_LENGTH; start += 1) {
    const entries = node.text.slice(start, start + RUN_LENGTH)
    const lines = entries.map(lineOf)
    if (lines.some((line) => line.quoteId) || !canAppearTogether(entries)) continue
    const subjects = lines.map(explicitSubjectOf)
    if (subjects[0] && subjects.every((subject) => subject === subjects[0])) {
      roboticRuns.push(
        `${nodeId}.text[${start}–${start + RUN_LENGTH - 1}] (${subjects[0]}): ` +
        lines.map(albanianTextOf).join(' / '),
      )
    }
  }
}
assert.deepEqual(
  roboticRuns,
  [],
  `four simultaneously visible lines repeat one explicit subject:\n${roboticRuns.join('\n')}`,
)

// Pin the opening failure that prompted this rule without tying it to one exact
// English wording: bridge, river and destination must share a perceptual beat.
const openingEntries = STORY.start.text
for (let start = 0; start <= openingEntries.length - 3; start += 1) {
  const entries = openingEntries.slice(start, start + 3)
  if (!canAppearTogether(entries)) continue
  const idSets = entries.map((entry) => new Set(lineOf(entry).filter((token) => token.id).map((token) => token.id)))
  const landmarks = ['ure', 'lume', 'fshat']
  const fragmented = landmarks.every((id) => idSets.some((ids) => ids.has(id)))
    && idSets.every((ids) => landmarks.filter((id) => ids.has(id)).length <= 1)
  assert.equal(fragmented, false, 'the opening splits bridge, river and village into separate fact lines')
}

const assertNamedElira = (nodeId, status, arrivalConditions = []) => {
  const active = new Set([npcIdentityConditionId('elira'), status, ...arrivalConditions])
  const lines = visibleLines(STORY[nodeId], (id) => active.has(id))
  const readings = lines.map(englishReadingOf)
  const anonymousSpeech = readings.filter((reading) => /^(?:Then )?(?:She|The woman) (?:says|asks)\b/.test(reading))
  assert.deepEqual(anonymousSpeech, [], `${nodeId}/${status}: learned Elira is still called “she” or “the woman”`)
  assert.ok(readings.some((reading) => /\bElira (?:says|asks)\b/.test(reading)), `${nodeId}/${status}: Elira is not named`)
  return readings
}

// Identity-aware story surfaces must be authored as anonymous/named pairs on
// the generic NPC identity contract. This catches a future recurring NPC whose
// name leaks before an introduction, disappears after it, or uses an ad-hoc
// condition that save/reset behavior cannot consistently preserve.
const identityPairCounts = new Map()
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const [surface, entries] of [['line', node.text], ['option', node.options]]) {
    for (const entry of entries) {
      if (!entry.npcIdentity) continue
      const { npcId, known } = entry.npcIdentity
      const identityCondition = npcIdentityConditionId(npcId)
      const npc = NPCS[npcId]
      assert.ok(npc?.identity?.descriptor, `${nodeId}: ${npcId} has an identity surface but no descriptor contract`)
      assert.equal(typeof known, 'boolean', `${nodeId}: ${npcId} identity surface has no known/unknown variant`)

      const required = surface === 'line' ? requiredOf(entry) : [].concat(entry.requires || [])
      const excluded = surface === 'line' ? excludedOf(entry) : [].concat(entry.unless || [])
      assert.equal(required.includes(identityCondition), known,
        `${nodeId}: ${surface} ${npcId} known variant has the wrong identity requirement`)
      assert.equal(excluded.includes(identityCondition), !known,
        `${nodeId}: ${surface} ${npcId} anonymous variant has the wrong identity exclusion`)

      const reading = englishReadingOf(surface === 'line' ? lineOf(entry) : entry.text)
      assert.equal(new RegExp(`\\b${npc.name}\\b`, 'u').test(reading), known,
        `${nodeId}: ${surface} ${npcId} ${known ? 'known' : 'anonymous'} reading is ${JSON.stringify(reading)}`)

      const key = `${nodeId}:${surface}:${npcId}`
      const counts = identityPairCounts.get(key) || { known: 0, anonymous: 0 }
      counts[known ? 'known' : 'anonymous'] += 1
      identityPairCounts.set(key, counts)
    }
  }
}
for (const [key, counts] of identityPairCounts) {
  assert.equal(counts.known, counts.anonymous,
    `${key}: identity-aware surfaces are not paired (${counts.known} named, ${counts.anonymous} anonymous)`)
}
assert.ok(identityPairCounts.size > 0, 'no authored NPC identity surfaces were audited')

// A scene may hold the player for a brief, indivisible physical result, but it
// must not turn ordinary dialogue, shopping, travel, rewards or information
// into a run of mandatory “continue” buttons. Scan the whole story graph,
// including embodied tales: tale identity cannot exempt a forced corridor.
const liveLinearCorridors = []
for (const [nodeId, node] of Object.entries(STORY)) {
  if (node.end) continue
  const firstOptions = realOptionsOf(nodeId)
  if (firstOptions.length !== 1) continue
  const middleId = firstOptions[0].to
  if (STORY[middleId]?.end || PLACE_OF[nodeId] !== PLACE_OF[middleId]) continue
  const middleOptions = realOptionsOf(middleId)
  if (middleOptions.length !== 1) continue
  liveLinearCorridors.push([nodeId, middleId, middleOptions[0].to])
}

// Same-place scans miss the more disorienting version of the problem: a run
// of mandatory buttons that walks the player through several graph locations
// without ever restoring agency. Discover maximal multi-edge chains across
// canonical places. Every surviving chain must be the exact node sequence of
// a reviewed continuous physical beat; adding a node or redirecting an edge
// invalidates that review instead of silently widening it.
const spatialLinearCorridorsOf = (story, placeOf, excludedNodes = new Set()) => {
  const realOptions = (nodeId) => (story[nodeId]?.options || [])
    .filter((option) => !option.confuser && option.to && story[option.to])
  const incoming = new Map(Object.keys(story).map((nodeId) => [nodeId, []]))
  for (const nodeId of Object.keys(story)) {
    for (const option of realOptions(nodeId)) incoming.get(option.to)?.push(nodeId)
  }
  const corridors = []
  for (const [nodeId, node] of Object.entries(story)) {
    if (node.end || excludedNodes.has(nodeId) || realOptions(nodeId).length !== 1) continue
    const predecessors = incoming.get(nodeId) || []
    if (predecessors.length === 1
      && !story[predecessors[0]]?.end
      && !excludedNodes.has(predecessors[0])
      && realOptions(predecessors[0]).length === 1) continue

    const nodes = [nodeId]
    const seen = new Set(nodes)
    let currentId = nodeId
    while (realOptions(currentId).length === 1) {
      const destinationId = realOptions(currentId)[0].to
      if (!destinationId
        || seen.has(destinationId)
        || story[destinationId]?.end
        || excludedNodes.has(destinationId)) break
      nodes.push(destinationId)
      seen.add(destinationId)
      currentId = destinationId
    }
    if (nodes.length < 3) continue
    const crossesPlace = nodes.slice(1).some((id, index) => placeOf[id] !== placeOf[nodes[index]])
    if (crossesPlace) corridors.push(nodes)
  }
  return corridors
}

assert.deepEqual(spatialLinearCorridorsOf({
  a: { options: [{ to: 'b' }] },
  b: { options: [{ to: 'c' }] },
  c: { options: [{ to: 'd' }, { to: 'e' }] },
  d: { options: [] },
  e: { options: [] },
}, { a: 'road', b: 'road', c: 'market', d: 'market', e: 'market' }), [['a', 'b', 'c']],
'the spatial funnel regression fixture no longer detects a multi-edge forced relocation')

const liveSpatialCorridors = spatialLinearCorridorsOf(STORY, PLACE_OF)
const liveContinuousCorridorTargets = new Set([
  ...liveLinearCorridors.map(continuousCorridorTarget),
  ...liveSpatialCorridors.map(continuousCorridorTarget),
])
const usedNarrativeFlowExceptionClaims = new Set()
const assertReviewedContinuousCorridor = (nodes, scanner) => {
  const target = continuousCorridorTarget(nodes)
  const review = auditExceptionFor(
    NARRATIVE_FLOW_EXCEPTIONS,
    'continuous-narrative-corridor',
    target,
  )
  assert.ok(review, `${scanner}: unreviewed mandatory corridor ${nodes.join(' -> ')}`)
  assert.deepEqual(review.nodes, nodes, `${review.id}: reviewed corridor nodes changed`)
  assert.equal(review.maximumEdges, nodes.length - 1,
    `${review.id}: reviewed corridor edge bound changed`)
  assert.equal(review.category, 'combat-resolution',
    `${review.id}: only an immediate combat resolution may remain linear`)
  for (const nodeId of review.nodes) {
    assert.ok(STORY[nodeId], `${review.id}: missing reviewed node ${nodeId}`)
  }
  usedNarrativeFlowExceptionClaims.add(
    auditExceptionClaimKey('continuous-narrative-corridor', target),
  )
}
for (const nodes of liveSpatialCorridors) {
  assertReviewedContinuousCorridor(nodes, 'multi-place scan')
}

const reviewIds = REVIEWED_NARRATIVE_CORRIDORS.map((review) => review.id)
assert.equal(new Set(reviewIds).size, reviewIds.length, 'narrative corridor review ids are not unique')
assert.equal(REVIEWED_NARRATIVE_CORRIDORS.length, 9,
  'the nine positive agency-restoration corridor reviews changed without a migration review')

const consequenceSignature = (option) => JSON.stringify({
  to: option.to,
  grant: option.grant || null,
  consumes: option.consumes || null,
  effects: option.effects || [],
  questAction: option.questAction || null,
  playerAction: option.playerAction?.id || null,
})

// Raw authored option counts can hide a forced sequence when flags reveal one
// button at a time on a same-node loop. Explore the flags that those local
// actions themselves mutate and inspect every reachable stage. Requirements
// outside that local flag set are treated as already satisfied: the question
// here is whether, once the player reaches this interaction, it ever reduces
// to a disguised Continue button.
const localFlagEffectsOf = (option) => (option.effects || [])
  .filter((effect) => effect.type === 'flag' && typeof effect.id === 'string')
  .map((effect) => ({ id: `flag:${effect.id}`, value: effect.value !== false }))

const stagedSingleChoiceStatesOf = (story) => {
  const failures = []
  for (const [nodeId, node] of Object.entries(story)) {
    const genuine = (node.options || []).filter((option) =>
      !option.confuser && option.to && story[option.to])
    // A completed conversation hub is deliberately allowed to retire every
    // question and leave only its voluntary exit. That is closure, not a
    // disguised Continue corridor, and its own contract audits the exit.
    if (genuine.some((option) => option.conversationHub)) continue
    const localFlags = new Set(genuine
      .filter((option) => option.to === nodeId)
      .flatMap(localFlagEffectsOf)
      .map((effect) => effect.id))
    if (!localFlags.size || genuine.length < 2) continue

    const queue = [{ flags: new Set(), depth: 0 }]
    const seen = new Set()
    const stages = []
    let maximumMutationDepth = 0
    while (queue.length) {
      const { flags, depth } = queue.shift()
      const key = [...flags].sort().join('|')
      if (seen.has(key)) continue
      seen.add(key)
      maximumMutationDepth = Math.max(maximumMutationDepth, depth)
      const visible = genuine.filter((option) => (
        [].concat(option.requires || []).every((id) => !localFlags.has(id) || flags.has(id))
        && [].concat(option.unless || []).every((id) => !localFlags.has(id) || !flags.has(id))
      ))
      stages.push({ key, visible })
      for (const option of visible.filter((candidate) => candidate.to === nodeId)) {
        const next = new Set(flags)
        for (const effect of localFlagEffectsOf(option)) {
          if (effect.value) next.add(effect.id)
          else next.delete(effect.id)
        }
        if ([...next].some((id) => !flags.has(id)) || [...flags].some((id) => !next.has(id))) {
          queue.push({ flags: next, depth: depth + 1 })
        }
      }
    }
    // One optional local action followed by an exit is common and does not by
    // itself form a corridor. Two or more consecutive state mutations are the
    // structural case that static option-count audits used to miss.
    if (maximumMutationDepth < 2) continue
    for (const { key, visible } of stages) {
      if (visible.length === 1) {
        failures.push(`${nodeId} [${key || 'initial'}] -> ${visible[0].to}: ${albanianTextOf(visible[0].text)}`)
      }
    }
  }
  return failures
}

assert.deepEqual(stagedSingleChoiceStatesOf({
  trial: {
    options: [
      { text: [{ al: 'first' }], unless: 'flag:firstDone', effects: [{ type: 'flag', id: 'firstDone' }], to: 'trial' },
      { text: [{ al: 'second' }], requires: 'flag:firstDone', unless: 'flag:secondDone', effects: [{ type: 'flag', id: 'secondDone' }], to: 'trial' },
      { text: [{ al: 'finish' }], requires: 'flag:secondDone', to: 'finish' },
    ],
  },
  finish: { end: 'good', options: [] },
}), [
  'trial [initial] -> trial: first',
  'trial [flag:firstDone] -> trial: second',
  'trial [flag:firstDone|flag:secondDone] -> finish: finish',
],
'the conditional-corridor regression fixture no longer sees one-button flag stages')
assert.deepEqual(stagedSingleChoiceStatesOf({
  optional: {
    options: [
      { text: [{ al: 'take' }], unless: 'flag:taken', effects: [{ type: 'flag', id: 'taken' }], to: 'optional' },
      { text: [{ al: 'leave' }], to: 'finish' },
    ],
  },
  finish: { end: 'good', options: [] },
}), [], 'one optional local action plus an exit is incorrectly treated as a forced corridor')

const stagedSingleChoiceStates = stagedSingleChoiceStatesOf(STORY)
assert.deepEqual(stagedSingleChoiceStates, [],
  `flag-sequenced interaction(s) expose only one genuine action at a reachable stage:\n${stagedSingleChoiceStates.join('\n')}`)

// Ordinary results are detected from the action that produced them, not from
// node names or English copy. This keeps shopping, rewards, quest hand-ins,
// healing, lodging, gifts and authored social results on one graph contract,
// while endings and unrelated physical narration remain outside its scope.
const ordinaryResultCategoryValues = new Set(Object.values(ORDINARY_RESULT_CATEGORIES))
assert.deepEqual([...ordinaryResultCategoryValues].sort(), [
  'dialogue', 'gift', 'healing', 'information', 'lodging', 'reward', 'shopping', 'task',
], 'ordinary-result categories changed without a narrative-flow review')

const optionTokenIds = (option) => new Set((option?.text || [])
  .map((token) => token.id)
  .filter(Boolean))

const ordinaryResultCategoryOf = (sourceId, option) => {
  if (option?.ordinaryResultCategory) return option.ordinaryResultCategory
  const tokenIds = optionTokenIds(option)
  if ((option?.lek || 0) < 0 && (option.time || option.atHour != null)) {
    return ORDINARY_RESULT_CATEGORIES.LODGING
  }
  if (Number(option?.hearts) > 0) return ORDINARY_RESULT_CATEGORIES.HEALING
  if ((option?.lek || 0) < 0) return ORDINARY_RESULT_CATEGORIES.SHOPPING
  if ((option?.lek || 0) > 0 || option?.earns) return ORDINARY_RESULT_CATEGORIES.REWARD
  if (option?.questAction) return ORDINARY_RESULT_CATEGORIES.TASK
  if (option?.playerIntents?.includes('transfer') || (tokenIds.has('jep') && option?.consumes)) {
    return ORDINARY_RESULT_CATEGORIES.GIFT
  }
  if (option?.intent === 'speech' || option?.playerIntents?.includes('speech')) {
    return option.to !== sourceId ? ORDINARY_RESULT_CATEGORIES.DIALOGUE : null
  }
  return null
}

const choiceEntry = (option) => ({
  cond: [].concat(option.requires || []),
  none: [].concat(option.unless || []),
})
const hasConsequenceDistinctChoicePair = (options) => options.some((left, index) =>
  options.slice(index + 1).some((right) =>
    canAppearTogether([choiceEntry(left), choiceEntry(right)])
      && consequenceSignature(left) !== consequenceSignature(right)))

for (const exception of NARRATIVE_FLOW_EXCEPTIONS.entries
  .filter((entry) => entry.rule === 'ordinary-result-agency')) {
  assert.ok(ordinaryResultCategoryValues.has(exception.category),
    `${exception.id}: unknown ordinary-result category`)
  assert.ok(STORY[exception.sourceNode], `${exception.id}: missing source node`)
  assert.ok(STORY[exception.resultNode], `${exception.id}: missing result node`)
  assert.deepEqual(exception.targets, [ordinaryResultExceptionTarget(
    exception.category,
    exception.sourceNode,
    exception.resultNode,
  )], `${exception.id}: target does not exactly match its categorized edge`)
  assert.ok(Number.isInteger(exception.maximumGenuineContinuations)
    && exception.maximumGenuineContinuations >= 1,
  `${exception.id}: continuation bound must be a positive integer`)
}

const ordinaryResultExceptionTargets = new Set()
const ordinaryResultFailures = []
for (const [sourceId, source] of Object.entries(STORY)) {
  for (const [optionIndex, option] of (source.options || []).entries()) {
    if (option.confuser || !option.to || !STORY[option.to] || STORY[option.to].end) continue
    const category = ordinaryResultCategoryOf(sourceId, option)
    if (!category) continue
    assert.ok(ordinaryResultCategoryValues.has(category),
      `${sourceId}.options[${optionIndex}]: unknown ordinary-result category ${JSON.stringify(category)}`)

    const resultOptions = realOptionsOf(option.to)
    if (hasConsequenceDistinctChoicePair(resultOptions)) continue
    const target = ordinaryResultExceptionTarget(category, sourceId, option.to)
    ordinaryResultExceptionTargets.add(target)
    const exception = auditExceptionFor(
      NARRATIVE_FLOW_EXCEPTIONS,
      'ordinary-result-agency',
      target,
    )
    if (exception) {
      assert.equal(resultOptions.length, exception.maximumGenuineContinuations,
        `${exception.id}: result no longer matches its exact reviewed continuation scope`)
      usedNarrativeFlowExceptionClaims.add(
        auditExceptionClaimKey('ordinary-result-agency', target),
      )
      continue
    }
    ordinaryResultFailures.push(
      `${category}: ${sourceId}.options[${optionIndex}] -> ${option.to} has ` +
      `${resultOptions.length} genuine continuation(s) and no simultaneous consequence-distinct pair`,
    )
  }
}
assert.deepEqual(ordinaryResultFailures, [],
  `ordinary result screen(s) remove agency:\n${ordinaryResultFailures.join('\n')}`)

const ungatedResultReviewIds = REVIEWED_UNGATED_RESULT_CHOICES.map((review) => review.id)
assert.equal(new Set(ungatedResultReviewIds).size, ungatedResultReviewIds.length,
  'ungated-result review ids are not unique')
const ungatedResultScopes = new Set()
const ungatedResultPurposes = new Set(['accept', 'browse', 'return', 'stay', 'travel'])
for (const review of REVIEWED_UNGATED_RESULT_CHOICES) {
  const label = `ungated-result review ${review.id}`
  for (const field of ['id', 'rule', 'category', 'sourceNode', 'resultNode', 'rationale', 'evidence', 'owner', 'reviewTrigger']) {
    assert.ok(typeof review[field] === 'string' && review[field].trim(), `${label}: missing ${field}`)
  }
  assert.equal(review.rule, 'ungated-result-agency', `${label}: wrong rule`)
  assert.ok(ordinaryResultCategoryValues.has(review.category), `${label}: unknown category`)
  assert.ok(review.rationale.length >= 100, `${label}: rationale is not concrete enough`)
  assert.ok(review.evidence.length >= 80, `${label}: evidence is not concrete enough`)
  assert.ok(review.reviewTrigger.length >= 50, `${label}: review trigger is not concrete enough`)
  assert.ok(STORY[review.sourceNode], `${label}: missing source node`)
  assert.ok(STORY[review.resultNode], `${label}: missing result node`)
  const scope = `${review.category}:${review.sourceNode}->${review.resultNode}`
  assert.equal(ungatedResultScopes.has(scope), false, `${label}: duplicate review scope ${scope}`)
  ungatedResultScopes.add(scope)

  const incoming = realOptionsOf(review.sourceNode).filter((option) => option.to === review.resultNode)
  assert.equal(incoming.length, 1, `${label}: exact reviewed incoming edge changed`)
  assert.equal(ordinaryResultCategoryOf(review.sourceNode, incoming[0]), review.category,
    `${label}: incoming action no longer has its reviewed result category`)

  assert.ok(Array.isArray(review.options) && review.options.length >= 2,
    `${label}: reviewed option scope must contain at least two choices`)
  const options = realOptionsOf(review.resultNode)
  assert.equal(options.length, review.options.length, `${label}: reviewed choice count changed`)
  assert.ok(new Set(options.map(consequenceSignature)).size >= 2,
    `${label}: reviewed result no longer has consequence-distinct agency`)
  options.forEach((option, index) => {
    const expected = review.options[index]
    assert.deepEqual(Object.keys(expected || {}).sort(), ['purpose', 'to'],
      `${label}[${index}]: option review must pin only exact destination and purpose`)
    assert.ok(ungatedResultPurposes.has(expected.purpose), `${label}[${index}]: unknown option purpose`)
    assert.equal(option.reveal, undefined, `${label}[${index}]: reviewed result choice gained a reveal gate`)
    assert.equal(option.to, expected.to, `${label}[${index}]: reviewed result destination changed`)
  })
}

for (const review of REVIEWED_NARRATIVE_CORRIDORS) {
  assert.equal(review.nodes.length, 3, `${review.id}: review must name the full three-node chain`)
  for (const nodeId of review.nodes) assert.ok(STORY[nodeId], `${review.id}: missing reviewed node ${nodeId}`)
  assert.ok(typeof review.reason === 'string' && review.reason.trim().length >= 80,
    `${review.id}: corridor decision needs a concrete written reason`)
  assert.equal(review.disposition, 'agency-restored',
    `${review.id}: a true corridor waiver leaked into the positive restoration registry`)
  assert.ok(review.agencyAt?.length, `${review.id}: agency restoration names no decision node`)
  for (const nodeId of review.agencyAt) {
    assert.ok(review.nodes.includes(nodeId), `${review.id}: agency node ${nodeId} is outside the reviewed chain`)
    const options = realOptionsOf(nodeId)
    assert.ok(options.length >= 2, `${review.id}/${nodeId}: mandatory corridor returned`)
    assert.ok(new Set(options.map(consequenceSignature)).size >= 2,
      `${review.id}/${nodeId}: choices do not produce distinct consequences`)
  }
  assert.equal(liveLinearCorridors.some((nodes) => nodes.join('>') === review.nodes.join('>')), false,
    `${review.id}: reviewed mandatory corridor returned`)
}

const corridorAgencyNodes = [...new Set(REVIEWED_NARRATIVE_CORRIDORS
  .filter((review) => review.disposition === 'agency-restored')
  .flatMap((review) => review.agencyAt || []))].sort()
assert.deepEqual(Object.keys(REVIEWED_UNGATED_AGENCY_CHOICES).sort(), corridorAgencyNodes,
  'the canonical ungated-choice reviews must cover every restored-agency decision exactly')
const agencyPurposes = new Set(['answer', 'exit', 'accept', 'decline', 'rescue', 'flee', 'listen', 'descend', 'travel', 'stay'])
for (const [nodeId, review] of Object.entries(REVIEWED_UNGATED_AGENCY_CHOICES)) {
  assert.ok(review.reason.length >= 100, `${nodeId}: ungated agency review needs a concrete reason`)
  const expectedCorridors = REVIEWED_NARRATIVE_CORRIDORS
    .filter((corridor) => corridor.agencyAt?.includes(nodeId))
    .map((corridor) => corridor.id)
    .sort()
  assert.deepEqual([...review.corridors].sort(), expectedCorridors,
    `${nodeId}: ungated review is detached from its narrative corridor`)
  const options = realOptionsOf(nodeId)
  assert.equal(options.length, review.options.length, `${nodeId}: reviewed choice count changed`)
  options.forEach((option, index) => {
    const expected = review.options[index]
    assert.equal(option.reveal, undefined, `${nodeId}[${index}]: agency choice gained a reveal gate`)
    assert.equal(option.to, expected.to, `${nodeId}[${index}]: reviewed agency destination changed`)
    assert.ok(agencyPurposes.has(expected.purpose), `${nodeId}[${index}]: unknown agency purpose`)
  })
}

for (const nodes of liveLinearCorridors) {
  assertReviewedContinuousCorridor(nodes, 'same-place scan')
}
assert.deepEqual(
  auditExceptionRegistryIssues(NARRATIVE_FLOW_EXCEPTIONS, {
    validTargetsByRule: {
      'continuous-narrative-corridor': liveContinuousCorridorTargets,
      'ordinary-result-agency': ordinaryResultExceptionTargets,
    },
  }),
  [],
  'narrative-flow exception registry is malformed, stale, duplicate or out of scope',
)
assert.deepEqual(
  auditExceptionUsageIssues(NARRATIVE_FLOW_EXCEPTIONS, usedNarrativeFlowExceptionClaims),
  [],
  'narrative-flow exceptions are unused, stale or unregistered',
)

// Every person or group that physically recurs on the live NPC clock must say
// whether its label is learned in dialogue or simply visible from context.
// This is intentionally closed: adding a new recurring NPC without making the
// narrative identity decision fails here instead of leaking a name by default.
const identityModes = new Set(Object.values(NPC_IDENTITY_MODES))
for (const [npcId, npc] of Object.entries(NPCS)) {
  const policy = npcIdentityPolicy(npcId)
  assert.ok(policy, `${npcId}: recurring NPC has no identity classification`)
  assert.ok(identityModes.has(policy.mode), `${npcId}: unknown identity mode ${JSON.stringify(policy.mode)}`)
  assert.ok(typeof policy.reason === 'string' && policy.reason.trim().length >= 24,
    `${npcId}: identity classification needs an explanatory reason`)
  assert.deepEqual(NPC_REGISTRY[npcId]?.identity, policy,
    `${npcId}: NPC catalog and runtime identity metadata drifted`)

  const knowledgeId = `npcName:${npcId}`
  const revealOptions = Object.values(STORY).flatMap((node) => node.options)
    .filter((option) => (option.effects || []).some((effect) => (
      effect.type === 'learn' && effect.id === knowledgeId
    )))
  const identitySurfaces = [...identityPairCounts]
    .filter(([key]) => key.endsWith(`:${npcId}`))

  if (policy.mode === NPC_IDENTITY_MODES.DISCOVERABLE) {
    assert.ok(typeof policy.descriptor === 'string' && policy.descriptor.trim(),
      `${npcId}: discoverable identity has no anonymous descriptor`)
    assert.notEqual(policy.descriptor.toLocaleLowerCase(), npc.name.toLocaleLowerCase(),
      `${npcId}: discoverable descriptor gives away the NPC name`)
    assert.equal(npcIdentityKnowledgeId(npcId), knowledgeId,
      `${npcId}: discoverable identity does not use the shared knowledge key`)
    assert.ok(revealOptions.length > 0, `${npcId}: discoverable identity has no authored reveal option`)
    assert.ok(identitySurfaces.length > 0,
      `${npcId}: discoverable identity has no persistent anonymous/named story surfaces`)

    const revealNames = revealOptions.filter((option) => {
      const destination = STORY[option.to]
      return destination?.text.some((entry) => englishReadingOf(lineOf(entry)).includes(npc.name))
    })
    assert.ok(revealNames.length > 0,
      `${npcId}: identity knowledge is granted without an authored destination that reveals ${npc.name}`)
  } else {
    assert.equal(policy.descriptor, undefined,
      `${npcId}: contextual title should not carry a hidden-name descriptor`)
    assert.equal(npcIdentityKnowledgeId(npcId), null,
      `${npcId}: contextual title manufactured a name-knowledge key`)
    assert.deepEqual(revealOptions, [], `${npcId}: contextual title has an authored name reveal`)
    assert.deepEqual(identitySurfaces, [], `${npcId}: contextual title uses discoverable-name variants`)
  }
}

const contentSource = readFileSync(fileURLToPath(new URL('../src/game/content.js', import.meta.url)), 'utf8')
assert.equal(contentSource.includes("'knows:npcName:elira'"), false,
  'story content bypasses the generic NPC identity helper with an Elira-specific condition')

assertNamedElira('eliraBreg', 'rendezvous:eliraFollow:on-time', ['from:fshatiLumi'])
assertNamedElira('eliraBreg', 'rendezvous:eliraFollow:late')
for (const status of [
  'rendezvous:eliraFollow:on-time',
  'rendezvous:eliraFollow:late',
  'rendezvous:eliraFollow:missed',
  'rendezvous:eliraSquare:on-time',
  'rendezvous:eliraSquare:late',
  'rendezvous:eliraSquare:missed',
]) {
  const readings = assertNamedElira('eliraShesh', status)
  if (status === 'rendezvous:eliraSquare:late') {
    const reaction = readings.findIndex((reading) => reading.startsWith('Elira asks, “Why were you late?'))
    assert.ok(reaction >= 0, 'Elira’s late-meeting reaction disappeared')
    assert.equal(readings.some((reading) => reading.startsWith('Then Elira asks,')), false,
      'Elira asks for help before the player chooses whether to apologise')
    const apology = STORY.eliraShesh.options.find((option) =>
      albanianTextOf(option.text) === 'më fal. kam gabuar.')
    assert.ok(apology && apology.intent === 'speech',
      'the late-meeting apology is not an explicit player speech choice')
    const afterApology = visibleLines(STORY.eliraShesh, (id) => new Set([
      npcIdentityConditionId('elira'), status, 'flag:eliraLateApologyGiven',
    ]).has(id)).map(englishReadingOf)
    const reassurance = afterApology.findIndex((reading) => reading.startsWith('Elira says, “Do not worry.'))
    const request = afterApology.findIndex((reading) => reading.startsWith('Then Elira asks,'))
    assert.ok(reaction < reassurance && reassurance < request,
      'Elira’s late-meeting reaction, chosen apology consequence and request are out of order')
  }
}

console.log('✅ narrative flow: condition-aware prose, opening cohesion and learned NPC naming pass')
