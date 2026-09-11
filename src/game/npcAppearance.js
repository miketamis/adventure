// First-encounter portraits give a person one memorable, useful detail without
// turning every return into a repeated character card. Portrait definitions
// live in one data module per NPC source partition; the runtime and audits
// consume this single registry and projection contract.

import { DICT, declaredStoryGlosses } from './dictionary.js'
import { npcIdentityConditionId } from './npcIdentity.js'
import { NPCS } from './npcs.js'

const APPEARANCES = {}
const DETAIL_KINDS = new Set([
  'age', 'build', 'clothing', 'colour', 'condition', 'face', 'hair', 'movement',
  'posture', 'carried-object', 'voice', 'work-marks', 'hands', 'memorable-feature',
  'location', 'collective-contrast', 'material', 'companion', 'form',
])
const PLACEMENT_KINDS = new Set(['insert-after', 'replace'])
const PRESENCE_POLICIES = new Set(['authored', 'runtime'])

const list = (value) => value == null ? [] : Array.isArray(value) ? value : [value]
const lineOf = (entry) => Array.isArray(entry) ? entry : entry?.line

const stableId = (value, label) => {
  if (typeof value !== 'string' || !/^[a-z][a-zA-Z0-9-]*$/.test(value)) {
    throw new Error(`${label} must be a stable lower-camel/kebab id`)
  }
  return value
}

const formSurfaces = (entry) => (entry.forms || []).map((form) => form.al.toLowerCase())

// Portrait modules cannot import content.js without creating a cycle. These
// token constructors enforce the same dictionary/sense/form boundary as w/wf
// while keeping each partition independently editable.
export function npcWord(id, al = null, en = null) {
  const entry = DICT[id]
  if (!entry) throw new Error(`npcWord('${id}'): unknown dictionary sense`)
  const surface = al ?? entry.al
  if (entry.forms && !formSurfaces(entry).includes(surface.toLowerCase())) {
    throw new Error(`npcWord('${id}', '${surface}'): undeclared reviewed form`)
  }
  if (en != null && entry.enAll && !declaredStoryGlosses(entry).includes(en)) {
    throw new Error(`npcWord('${id}', '${surface}', '${en}'): undeclared reviewed sense`)
  }
  return {
    id,
    al: surface,
    en: en ?? entry.en,
    formTag: entry.forms?.find((form) => form.al.toLowerCase() === surface.toLowerCase())?.tag,
  }
}

export const npcPunctuation = (en) => ({ en, paren: true })

export function npcPortraitLine(reading, ...tokens) {
  const line = tokens.length === 1 && Array.isArray(tokens[0]) ? tokens[0] : tokens
  return Object.assign(line, { reading })
}

const normalizeVariant = (npcId, variant) => {
  const line = lineOf(variant)
  if (!Array.isArray(line) || !line.length) throw new Error(`NPC '${npcId}' has an empty portrait line`)
  if (!line.reading) throw new Error(`NPC '${npcId}' portrait needs a reviewed whole-line English reading`)
  return Object.freeze({
    line,
    required: Object.freeze(list(variant?.required)),
    excluded: Object.freeze(list(variant?.excluded)),
    known: typeof variant?.known === 'boolean' ? variant.known : null,
  })
}

export function defineNpcFirstEncounter({
  npcId,
  nodeId,
  sourcePartition = 'legacy-embedded',
  details,
  practicalWordIds = [],
  portraitLines = [],
  placement = null,
  embedded = false,
  presence = null,
}) {
  stableId(npcId, 'NPC appearance id')
  stableId(nodeId, 'NPC appearance node id')
  if (APPEARANCES[npcId]) throw new Error(`Duplicate first-encounter portrait: ${npcId}`)
  const kinds = [...new Set(details || [])]
  if (!kinds.length || kinds.some((kind) => !DETAIL_KINDS.has(kind))) {
    throw new Error(`NPC '${npcId}' needs reviewed appearance details (${[...DETAIL_KINDS].join(', ')})`)
  }
  if (!practicalWordIds.length) throw new Error(`NPC '${npcId}' portrait teaches no practical description word`)
  const variants = portraitLines.map((variant) => normalizeVariant(npcId, variant))
  if (!embedded && !variants.length) throw new Error(`NPC '${npcId}' has no projected portrait line`)
  if (!embedded && (!placement || !PLACEMENT_KINDS.has(placement.kind))) {
    throw new Error(`NPC '${npcId}' needs a reviewed insert-after/replace placement`)
  }
  if (!embedded && NPCS[npcId] && !PRESENCE_POLICIES.has(presence)) {
    throw new Error(`Runtime NPC '${npcId}' needs an explicit authored/runtime portrait presence policy`)
  }
  if (presence != null && !PRESENCE_POLICIES.has(presence)) {
    throw new Error(`NPC '${npcId}' has an invalid portrait presence policy`)
  }
  if (placement && (!Number.isInteger(placement.lineIndex) || placement.lineIndex < 0)) {
    throw new Error(`NPC '${npcId}' portrait placement needs a non-negative source line index`)
  }
  const spec = Object.freeze({
    npcId,
    nodeId,
    sourcePartition,
    details: Object.freeze(kinds),
    practicalWordIds: Object.freeze([...new Set(practicalWordIds)]),
    portraitLines: Object.freeze(variants),
    placement: placement ? Object.freeze({ ...placement }) : null,
    embedded: embedded === true,
    presence,
  })
  APPEARANCES[npcId] = spec
  return spec
}

export const NPC_FIRST_ENCOUNTERS = APPEARANCES

export function npcFirstEncounterLine(spec, lineOrEntry) {
  const entry = Array.isArray(lineOrEntry) ? { line: lineOrEntry } : lineOrEntry
  const { cond, none, negate, ...rest } = entry
  if (negate && Array.isArray(cond)) {
    throw new Error(`NPC '${spec.npcId}' first-encounter line cannot compose a NAND condition`)
  }
  return {
    ...rest,
    cond: negate ? [] : [].concat(cond || []),
    none: [...[].concat(none || []), ...(negate && cond ? [cond] : []), 'again'],
    npcAppearance: Object.freeze({ npcId: spec.npcId, kind: 'first-encounter' }),
  }
}

const variantVisible = (spec, variant, has) => {
  if (variant.required.some((id) => !has(id)) || variant.excluded.some(has)) return false
  if (variant.known == null) return true
  const identityCondition = npcIdentityConditionId(spec.npcId)
  if (!identityCondition) throw new Error(`NPC '${spec.npcId}' has a named portrait variant but no discoverable identity`)
  return variant.known ? has(identityCondition) : !has(identityCondition)
}

const SAFE_LEDGER_ID = /^[a-z][a-zA-Z0-9-]{0,119}$/

const truthLedger = (value) => {
  const normalized = {}
  if (!value || typeof value !== 'object' || Array.isArray(value)) return normalized
  for (const [id, seen] of Object.entries(value)) {
    if (seen === true && SAFE_LEDGER_ID.test(id)) normalized[id] = true
  }
  return normalized
}

// `npcPortraitsSeen` is durable character memory. `activeNpcPortraits` is the
// current encounter latch: it keeps a newly introduced portrait on screen
// after the first paint has atomically recorded it as seen, then resets when
// the encounter ends. Keeping these two jobs separate prevents both a
// one-frame portrait flash and a portrait repeating on a later visit.
export const normalizeNpcPortraitsSeen = (value) => truthLedger(value)

export const normalizeActiveNpcPortraits = (value, seen = null) => {
  if (!value || typeof value !== 'object' || Array.isArray(value) ||
      typeof value.nodeId !== 'string' || !SAFE_LEDGER_ID.test(value.nodeId)) return null
  const seenLedger = seen == null ? null : truthLedger(seen)
  const npcIds = [...new Set(Array.isArray(value.npcIds) ? value.npcIds : [])]
    .filter((id) => SAFE_LEDGER_ID.test(id) && (!seenLedger || seenLedger[id]))
  return npcIds.length ? { nodeId: value.nodeId, npcIds } : null
}

const portraitPresenceMatches = (spec, has) =>
  spec.presence !== 'runtime' || has(`npc:${spec.npcId}`)

const sameActivePortraits = (left, right) => {
  if (left == null || right == null) return left === right
  return left.nodeId === right.nodeId &&
    left.npcIds.length === right.npcIds.length &&
    left.npcIds.every((id, index) => id === right.npcIds[index])
}

// Project portraits into the visible source lines without mutating STORY or
// shifting address-pinned reading/reveal indices. The per-NPC durable ledger,
// rather than location familiarity, decides who still needs an introduction.
// A route-based person enters that ledger only while actually present.
export function planNpcFirstEncounterLines(
  node,
  visibleSourceLines,
  has,
  seenValue = {},
  activeValue = null,
) {
  const seen = normalizeNpcPortraitsSeen(seenValue)
  const activeState = normalizeActiveNpcPortraits(activeValue, seen)
  if (!node) {
    return {
      lines: visibleSourceLines,
      activeNpcIds: [],
      needsCommit: activeState != null,
      nextSeen: seen,
      nextActive: null,
    }
  }
  const activeHere = new Set(activeState?.nodeId === node.id ? activeState.npcIds : [])
  const active = Object.values(APPEARANCES)
    .filter((spec) => !spec.embedded && spec.nodeId === node.id)
    .filter((spec) => portraitPresenceMatches(spec, has))
    .filter((spec) => !seen[spec.npcId] || activeHere.has(spec.npcId))
    .sort((a, b) => a.npcId.localeCompare(b.npcId))
    .map((spec) => ({
      spec,
      variant: spec.portraitLines.find((candidate) => variantVisible(spec, candidate, has)),
    }))
    .filter(({ variant }) => variant)
  const bySourceIndex = new Map()
  for (const item of active) {
    const siblings = bySourceIndex.get(item.spec.placement.lineIndex) || []
    siblings.push(item)
    bySourceIndex.set(item.spec.placement.lineIndex, siblings)
  }
  const indexBySourceLine = new Map(node.text.map((entry, index) => [lineOf(entry), index]))
  const projected = []
  const projectedNpcIds = []
  for (const sourceLine of visibleSourceLines) {
    const sourceIndex = indexBySourceLine.get(sourceLine)
    const items = bySourceIndex.get(sourceIndex) || []
    const replacements = items.filter(({ spec }) => spec.placement.kind === 'replace')
    const insertions = items.filter(({ spec }) => spec.placement.kind === 'insert-after')
    if (!replacements.length) projected.push(sourceLine)
    for (const { spec, variant } of replacements) {
      Object.assign(variant.line, {
        npcAppearance: Object.freeze({ npcId: spec.npcId, kind: 'first-encounter' }),
        scenePriority: 'immediate-essential',
      })
      projected.push(variant.line)
      projectedNpcIds.push(spec.npcId)
    }
    for (const { spec, variant } of insertions) {
      Object.assign(variant.line, {
        npcAppearance: Object.freeze({ npcId: spec.npcId, kind: 'first-encounter' }),
        scenePriority: 'immediate-essential',
      })
      projected.push(variant.line)
      projectedNpcIds.push(spec.npcId)
    }
  }
  const activeNpcIds = [...new Set(projectedNpcIds)]
  const nextSeen = { ...seen }
  for (const npcId of activeNpcIds) nextSeen[npcId] = true
  const nextActive = activeNpcIds.length ? { nodeId: node.id, npcIds: activeNpcIds } : null
  const learnedSomeone = activeNpcIds.some((npcId) => !seen[npcId])
  return {
    lines: projected,
    activeNpcIds,
    needsCommit: learnedSomeone || !sameActivePortraits(activeState, nextActive),
    nextSeen,
    nextActive,
  }
}

export const projectNpcFirstEncounterLines = (
  node,
  visibleSourceLines,
  has,
  seenValue = {},
  activeValue = null,
) => planNpcFirstEncounterLines(
  node,
  visibleSourceLines,
  has,
  seenValue,
  activeValue,
).lines

export const npcPortraitLines = () => Object.values(APPEARANCES)
  .flatMap((spec) => spec.portraitLines.map((variant) => variant.line))
