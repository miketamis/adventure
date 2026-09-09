// Visible prose should read as a lived scene, not as a database dump. This
// audit is condition-aware: mutually exclusive time, route, rendezvous and
// greeting variants are not treated as lines the player could see together.

import assert from 'node:assert/strict'
import {
  STORY,
  lineOf,
  visibleLines,
} from '../src/game/content.js'
import { albanianTextOf, englishReadingOf } from '../src/game/language.js'

const RUN_LENGTH = 4

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
  const active = new Set(['knows:npcName:elira', status])
  const lines = visibleLines(STORY[nodeId], (id) => active.has(id))
  const readings = lines.map(englishReadingOf)
  const anonymousSpeech = readings.filter((reading) => /^(?:Then )?(?:She|The woman) (?:says|asks)\b/.test(reading))
  assert.deepEqual(anonymousSpeech, [], `${nodeId}/${status}: learned Elira is still called “she” or “the woman”`)
  assert.ok(readings.some((reading) => /\bElira (?:says|asks)\b/.test(reading)), `${nodeId}/${status}: Elira is not named`)
  return readings
}

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
