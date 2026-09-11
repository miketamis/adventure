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
import coreVillageNpcs from '../src/game/data/npcs/core-village.js'
import { PLACE_OF } from '../src/components/nodePositions.js'
import { EMBODIMENT_QUESTS } from '../src/game/embodiment.js'
import {
  REVIEWED_NARRATIVE_CORRIDORS,
  REVIEWED_UNGATED_AGENCY_CHOICES,
} from '../src/game/narrativeFlow.js'
import {
  NPC_IDENTITY_MODES,
  npcIdentityConditionId,
  npcIdentityKnowledgeId,
  npcIdentityPolicy,
} from '../src/game/npcIdentity.js'

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
  let match = id.match(/^flag:([^:]+):(morning|day|evening|night)$/)
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

const assertNamedElira = (nodeId, status) => {
  const active = new Set([npcIdentityConditionId('elira'), status])
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
// into a run of mandatory “continue” buttons. Scan the full non-embodied story
// graph so new corridors cannot appear without a written narrative review.
const embodiedNodes = new Set(Object.values(EMBODIMENT_QUESTS).flatMap((quest) => quest.nodes || []))
const liveLinearCorridors = []
for (const [nodeId, node] of Object.entries(STORY)) {
  if (node.end || embodiedNodes.has(nodeId)) continue
  const firstOptions = realOptionsOf(nodeId)
  if (firstOptions.length !== 1) continue
  const middleId = firstOptions[0].to
  if (STORY[middleId]?.end || embodiedNodes.has(middleId) || PLACE_OF[nodeId] !== PLACE_OF[middleId]) continue
  const middleOptions = realOptionsOf(middleId)
  if (middleOptions.length !== 1) continue
  liveLinearCorridors.push([nodeId, middleId, middleOptions[0].to])
}

const reviewIds = REVIEWED_NARRATIVE_CORRIDORS.map((review) => review.id)
assert.equal(new Set(reviewIds).size, reviewIds.length, 'narrative corridor review ids are not unique')
assert.equal(REVIEWED_NARRATIVE_CORRIDORS.length, 8,
  'the eight individually reviewed baseline corridors changed without a migration review')

const consequenceSignature = (option) => JSON.stringify({
  to: option.to,
  grant: option.grant || null,
  consumes: option.consumes || null,
  effects: option.effects || [],
  questAction: option.questAction || null,
})

for (const review of REVIEWED_NARRATIVE_CORRIDORS) {
  assert.equal(review.nodes.length, 3, `${review.id}: review must name the full three-node chain`)
  for (const nodeId of review.nodes) assert.ok(STORY[nodeId], `${review.id}: missing reviewed node ${nodeId}`)
  assert.ok(typeof review.reason === 'string' && review.reason.trim().length >= 80,
    `${review.id}: corridor decision needs a concrete written reason`)

  if (review.disposition === 'agency-restored') {
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
  } else {
    assert.equal(review.disposition, 'continuous-beat', `${review.id}: unknown corridor disposition`)
    assert.equal(review.category, 'combat-resolution',
      `${review.id}: only an immediate embodied action resolution may remain linear`)
  }
}

const corridorAgencyNodes = [...new Set(REVIEWED_NARRATIVE_CORRIDORS
  .filter((review) => review.disposition === 'agency-restored')
  .flatMap((review) => review.agencyAt || []))].sort()
assert.deepEqual(Object.keys(REVIEWED_UNGATED_AGENCY_CHOICES).sort(), corridorAgencyNodes,
  'the canonical ungated-choice reviews must cover every restored-agency decision exactly')
const agencyPurposes = new Set(['answer', 'exit', 'accept', 'decline', 'rescue', 'flee', 'listen', 'descend'])
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

const allowedContinuousBeats = REVIEWED_NARRATIVE_CORRIDORS
  .filter((review) => review.disposition === 'continuous-beat')
  .map((review) => review.nodes.join('>'))
  .sort()
assert.deepEqual(liveLinearCorridors.map((nodes) => nodes.join('>')).sort(), allowedContinuousBeats,
  `unreviewed mandatory same-place corridor(s):\n${liveLinearCorridors.map((nodes) => nodes.join(' -> ')).join('\n')}`)

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
  assert.deepEqual(coreVillageNpcs[npcId]?.identity, policy,
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

for (const status of ['rendezvous:eliraFollow:on-time', 'rendezvous:eliraFollow:late']) {
  assertNamedElira('eliraBreg', status)
}
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
    const apology = readings.findIndex((reading) => reading.startsWith('You say, “Sorry.'))
    const request = readings.findIndex((reading) => reading.startsWith('Then Elira asks,'))
    assert.ok(reaction < apology && apology < request, 'Elira’s late-meeting reaction, apology and request are out of order')
  }
}

console.log('✅ narrative flow: condition-aware prose, opening cohesion and learned NPC naming pass')
