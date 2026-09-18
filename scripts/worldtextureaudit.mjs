// Whole-world editorial coverage. This deliberately counts physical places,
// not raw dialogue nodes: adding ten paragraphs in one room cannot make the
// travelled world feel broader. The metrics pair authored environment detail
// with condition-aware return/state prose and a reviewed lived-world lexicon.

import assert from 'node:assert/strict'
import { STORY, DEFS, ITEMS, lineOf } from '../src/game/content.js'
import { DICT } from '../src/game/dictionary.js'
import { LIVED_WORLD_VOCABULARY } from '../src/game/data/livedWorldVocabulary.js'
import { authoredEnvironmentDimensions } from '../src/game/environmentNarration.js'
import { albanianTextOf } from '../src/game/language.js'
import { observationIdOfLine } from '../src/game/observations.js'
import { DEPARTURE_CONTEXTS, isUnchartedStoryNode } from '../src/game/departureContexts.js'
import { departureContextIssues } from '../src/game/departureContextValidation.js'
import { PLACE_NODES, PLACE_OF } from '../src/components/nodePositions.js'
import { NODE_REGION } from '../src/game/regions.js'
import {
  auditExceptionClaimKey,
  auditExceptionFor,
  auditExceptionRegistryIssues,
  auditExceptionUsageIssues,
  defineAuditExceptionRegistry,
} from './lib/audit-exceptions.mjs'

// These are reviewed floors, raised only after a whole-story pass. Region
// floors stop a richly described village from masking an empty sky realm or
// underworld. They are intentionally inspectable in one place.
const WORLD_TEXTURE_REVIEW = Object.freeze({
  minimumAuthoredEnvironmentPlaces: 119,
  minimumResponsivePlaces: 138,
  minimumTexturedPlaces: 154,
  // The original nine-place floor measured any authored familiarity branch,
  // including a first(...) line that merely retires. Keep that floor, but
  // separately require prose that is positively gated by again(...).
  minimumFamiliarityAwarePlaces: 29,
  minimumExplicitReturnPlaces: 6,
  minimumObservationPlaces: 21,
  minimumDimensionPlaces: Object.freeze({ time: 85, weather: 49, season: 20 }),
  minimumTexturedPlacesByRegion: Object.freeze({
    castle: 6,
    forest: 15,
    lake: 4,
    mountain: 35,
    princeland: 1,
    // Canonical-place consolidation removed three invented river locations.
    // The remaining 22 physical places are all now textured.
    river: 22,
    sea: 11,
    sky: 8,
    underworld: 12,
    village: 39,
  }),
  minimumEnvironmentPlacesByRegion: Object.freeze({
    castle: 5,
    forest: 12,
    lake: 4,
    mountain: 29,
    princeland: 0,
    river: 13,
    sea: 9,
    sky: 7,
    underworld: 4,
    village: 36,
  }),
  maximumUntexturedPlacesByRegion: Object.freeze({
    castle: 1,
    forest: 4,
    lake: 0,
    mountain: 7,
    princeland: 2,
    river: 4,
    sea: 3,
    sky: 8,
    underworld: 15,
    village: 9,
  }),
})

const repeatedSurfaceTarget = (surface) => `environment-surface:${surface}`
const repeatedPatternTarget = (pattern) =>
  `one-token-environment-signature:${pattern.replaceAll('*', '<variable-token>')}`

// These are the only reviewed duplicate-texture waivers. Each claim pins the
// exact live places (and, for structural signatures, exact authored surfaces)
// so neither a new noun substitution nor a same-sized place swap can hide
// behind a historical maximum.
const WORLD_TEXTURE_EXCEPTIONS = defineAuditExceptionRegistry({
  rules: {
    'repeated-environment-surface': { targetKind: 'exact Albanian environment surface' },
    'repeated-environment-pattern': { targetKind: 'exact one-variable token signature' },
  },
  entries: [
    {
      id: 'night-arrival-transition-repeats',
      rule: 'repeated-environment-surface',
      targets: [repeatedSurfaceTarget('nata vjen.')],
      rationale: 'This short line names the same transition into night in every location, so variation would imply a different event rather than add useful local texture.',
      evidence: 'The authored surface is currently live at exactly ten canonical places spanning the village, mountain, castle, river, sky and tale routes.',
      owner: 'world-texture',
      reviewTrigger: 'Review whenever the exact surface or any member of its pinned canonical-place set changes.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      maximumPlaces: 10,
      reviewedPlaces: ['fshatiSheshi', 'jutbina', 'kalaNate', 'katallan1', 'lendina', 'lumi', 'maja', 'qiellDiell', 'udha', 'uraNata'],
    },
    {
      id: 'daylight-arrival-transition-repeats',
      rule: 'repeated-environment-surface',
      targets: [repeatedSurfaceTarget('dielli vjen.')],
      rationale: 'This short line names the same transition into daylight in each scene, and its repetition is event language rather than interchangeable local atmosphere.',
      evidence: 'The authored surface is currently live at exactly five canonical places: kalaNate, lendina, qiellDiell, tsHyrje and uraNata.',
      owner: 'world-texture',
      reviewTrigger: 'Review whenever the exact surface or any member of its pinned canonical-place set changes.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      maximumPlaces: 5,
      reviewedPlaces: ['kalaNate', 'lendina', 'qiellDiell', 'tsHyrje', 'uraNata'],
    },
    {
      id: 'umbrella-rain-affordance-repeats',
      rule: 'repeated-environment-surface',
      targets: [repeatedSurfaceTarget('çadra të mban të thatë.')],
      rationale: 'The repeated sentence communicates one inventory affordance under rain, so the stable wording reinforces the same usable umbrella consequence across routes.',
      evidence: 'The surface is currently live at exactly six canonical places: fshatiLumi, fshatiSheshi, pusiThate, rrugaDetit, sheshi and udhekryq.',
      owner: 'world-texture',
      reviewTrigger: 'Review whenever the umbrella behavior, exact surface, or pinned canonical-place set changes.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      maximumPlaces: 6,
      reviewedPlaces: ['fshatiLumi', 'fshatiSheshi', 'pusiThate', 'rrugaDetit', 'sheshi', 'udhekryq'],
    },
    {
      id: 'umbrella-storm-affordance-repeats',
      rule: 'repeated-environment-surface',
      targets: [repeatedSurfaceTarget('çadra të mban të thatë në stuhi.')],
      rationale: 'The repeated sentence communicates the same umbrella affordance during a storm, where stable wording reinforces one concrete inventory consequence.',
      evidence: 'The surface is currently live at exactly six canonical places: fshatiLumi, fshatiSheshi, pusiThate, rrugaDetit, sheshi and udhekryq.',
      owner: 'world-texture',
      reviewTrigger: 'Review whenever the umbrella behavior, exact surface, or pinned canonical-place set changes.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      maximumPlaces: 6,
      reviewedPlaces: ['fshatiLumi', 'fshatiSheshi', 'pusiThate', 'rrugaDetit', 'sheshi', 'udhekryq'],
    },
    {
      id: 'daylight-transition-one-token-pattern',
      rule: 'repeated-environment-pattern',
      targets: [repeatedPatternTarget('diell|*|.')],
      rationale: 'The two daylight-transition surfaces share one beginner construction, but this exact six-place baseline is frozen so another verb substitution cannot extend it.',
      evidence: 'The signature covers “dielli vjen” and “dielli kthehet” at kalaNate, lendina, qiellDiell, tsHyrje, uraNata and veraDite1.',
      owner: 'world-texture',
      reviewTrigger: 'Review whenever a covered surface or canonical place changes, even if the total remains six.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      maximumPlaces: 6,
      reviewedPlaces: ['kalaNate', 'lendina', 'qiellDiell', 'tsHyrje', 'uraNata', 'veraDite1'],
      reviewedSurfaces: ['dielli kthehet.', 'dielli vjen.'],
    },
    {
      id: 'dawn-light-one-token-pattern',
      rule: 'repeated-environment-pattern',
      targets: [repeatedPatternTarget('eshte|agim|:|nje|drite|e_art|arte|bie|mbi|*|.')],
      rationale: 'This beginner dawn frame varies only its final landmark, so its exact existing places are accepted but any additional noun-swapped copy must fail review.',
      evidence: 'The signature currently covers five canonical places and four exact surfaces naming kullat, malet, pemët and ujin.',
      owner: 'world-texture',
      reviewTrigger: 'Review whenever a covered dawn surface or canonical place changes, or another landmark is substituted.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      maximumPlaces: 5,
      reviewedPlaces: ['jutbina', 'kroi1', 'mali1', 'mali3', 'pylliLoop'],
      reviewedSurfaces: ['është agim: një dritë e artë bie mbi kullat.', 'është agim: një dritë e artë bie mbi malet.', 'është agim: një dritë e artë bie mbi pemët.', 'është agim: një dritë e artë bie mbi ujin.'],
    },
    {
      id: 'red-sky-dusk-one-token-pattern',
      rule: 'repeated-environment-pattern',
      targets: [repeatedPatternTarget('eshte|muzg|:|qiell|behet|i_art|kuq|mbi|*|.')],
      rationale: 'This dusk construction varies only its final landmark; the exact four-place baseline is accepted while any further noun substitution remains a release failure.',
      evidence: 'The signature currently covers bariu, ktheu3, lumi and udhaKthimit through the exact kalanë, malet and malin surfaces.',
      owner: 'world-texture',
      reviewTrigger: 'Review whenever a covered dusk surface or canonical place changes, or another landmark is substituted.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      maximumPlaces: 4,
      reviewedPlaces: ['bariu', 'ktheu3', 'lumi', 'udhaKthimit'],
      reviewedSurfaces: ['është muzg: qielli bëhet i kuq mbi kalanë.', 'është muzg: qielli bëhet i kuq mbi malet.', 'është muzg: qielli bëhet i kuq mbi malin.'],
    },
    {
      id: 'sun-over-landmark-one-token-pattern',
      rule: 'repeated-environment-pattern',
      targets: [repeatedPatternTarget('diell|eshte|mbi|*|.')],
      rationale: 'This daylight location frame differs only in its final landmark, so the current three places are the complete reviewed scope rather than a reusable template.',
      evidence: 'The signature currently covers deti1, ktheu1 and mali1 through the exact botën, detin and majë surfaces.',
      owner: 'world-texture',
      reviewTrigger: 'Review whenever a covered daylight surface or canonical place changes, or another landmark is substituted.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      maximumPlaces: 3,
      reviewedPlaces: ['deti1', 'ktheu1', 'mali1'],
      reviewedSurfaces: ['dielli është mbi botën.', 'dielli është mbi detin.', 'dielli është mbi majë.'],
    },
    {
      id: 'red-gold-dusk-one-token-pattern',
      rule: 'repeated-environment-pattern',
      targets: [repeatedPatternTarget('eshte|muzg|:|qiell|mbi|*|behet|i_art|kuq|dhe|i_art|arte|.')],
      rationale: 'This red-and-gold dusk frame varies only one landmark, so its three exact places are frozen and cannot silently grow through another noun swap.',
      evidence: 'The signature currently covers bregu, mali1 and mali3 through the exact detin and malet authored surfaces.',
      owner: 'world-texture',
      reviewTrigger: 'Review whenever a covered dusk surface or canonical place changes, or another landmark is substituted.',
      scope: { kind: 'exact-targets', maximumTargets: 1 },
      maximumPlaces: 3,
      reviewedPlaces: ['bregu', 'mali1', 'mali3'],
      reviewedSurfaces: ['është muzg: qielli mbi detin bëhet i kuq dhe i artë.', 'është muzg: qielli mbi malet bëhet i kuq dhe i artë.'],
    },
  ],
})

const idsOf = (value) => value == null ? [] : [].concat(value)
const conditionIdsOf = (entry) => Array.isArray(entry)
  ? []
  : [...idsOf(entry.cond), ...idsOf(entry.none)]
const positiveConditionIdsOf = (entry) => Array.isArray(entry) || entry.negate
  ? []
  : idsOf(entry.cond)

const PHYSICAL_RESPONSE_CONDITIONS = new Set(['again', 'day', 'dawn', 'dusk', 'night'])
const PHYSICAL_RESPONSE_PREFIXES = Object.freeze([
  'from:',
  'became:',
  'weather:',
  'season:',
  'fact:',
  'fixture:',
  'visited:',
  'rendezvous:',
  'npcAt:',
  'npc:',
  'festival:',
])
const itemIds = new Set(Object.keys(ITEMS))
const isPhysicalResponseCondition = (id) => PHYSICAL_RESPONSE_CONDITIONS.has(id) ||
  itemIds.has(id) || PHYSICAL_RESPONSE_PREFIXES.some((prefix) => id.startsWith(prefix))

assert.equal(isPhysicalResponseCondition('greeting:morning'), false, 'a greeting became physical responsiveness')
assert.equal(isPhysicalResponseCondition('knows:npcName:elira'), false, 'a learned name became physical responsiveness')
assert.equal(isPhysicalResponseCondition('arrival:money'), false, 'transaction copy became physical responsiveness')
assert.equal(isPhysicalResponseCondition('weather:rain'), true, 'weather stopped counting as physical responsiveness')
assert.deepEqual(positiveConditionIdsOf({ cond: 'again', negate: true }), [], 'first(...) became explicit return prose')
assert.deepEqual(positiveConditionIdsOf({ cond: 'again' }), ['again'], 'again(...) stopped counting as explicit return prose')

// A greeting may legitimately suppress the generic time fallback, but saying
// “good morning” does not give the room a sensory identity. Name-substitution
// branches are similarly conversational rather than environmental texture.
const DIALOGUE_CONDITION_PREFIXES = Object.freeze(['greeting:', 'knows:'])
const GREETING_WORD_IDS = new Set(['mirmengjes', 'mirdita', 'mirembrema'])
const isDialogueOnlyEnvironmentEntry = (entry, line) => {
  const conditions = conditionIdsOf(entry)
  if (conditions.some((id) => DIALOGUE_CONDITION_PREFIXES.some((prefix) => id.startsWith(prefix)))) return true
  const words = line.filter((token) => token?.id)
  return words.length > 0 && words.every((token) => GREETING_WORD_IDS.has(token.id))
}

const tokenPatternOf = (line) => line.map((token) => token?.id || token?.en || '').join('|')

const physicalPlaces = Object.keys(PLACE_NODES)
const physicalPlaceSet = new Set(physicalPlaces)
assert.deepEqual(departureContextIssues(STORY), [],
  'uncharted outcomes have malformed, stale or unregistered canonical departures')
for (const departure of DEPARTURE_CONTEXTS) {
  assert.ok(physicalPlaceSet.has(PLACE_OF[departure.from]),
    `${departure.id}: departure origin has no canonical physical place`)
}
const unchartedNodes = Object.keys(STORY).filter(isUnchartedStoryNode)
for (const nodeId of Object.keys(STORY)) {
  if (isUnchartedStoryNode(nodeId)) {
    assert.equal(PLACE_OF[nodeId], undefined, `${nodeId}: uncharted outcome was assigned a physical place`)
    assert.equal(NODE_REGION[nodeId], undefined, `${nodeId}: uncharted outcome was assigned a physical region`)
    assert.ok(!physicalPlaceSet.has(nodeId) && !Object.values(PLACE_NODES).some((members) => members.includes(nodeId)),
      `${nodeId}: uncharted outcome contributes to physical-place coverage`)
    continue
  }
  assert.ok(PLACE_OF[nodeId], `${nodeId}: story node has no canonical physical place`)
  assert.ok(physicalPlaceSet.has(PLACE_OF[nodeId]), `${nodeId}: canonical place ${PLACE_OF[nodeId]} is absent`)
}
const environmentPlaces = new Set()
const communicatedEnvironmentPlaces = new Set()
const responsivePlaces = new Set()
const familiarityAwarePlaces = new Set()
const explicitReturnPlaces = new Set()
const observationPlaces = new Set()
const livedVocabularyPlaces = new Set()
const dimensionPlaces = Object.fromEntries(
  ['time', 'weather', 'season'].map((dimension) => [dimension, new Set()]),
)
const storyTokenPlaces = new Map()
const optionTokenPlaces = new Map()
const environmentSurfacePlaces = new Map()
const environmentPatternEntries = []

const addTokenPlace = (map, id, place) => {
  if (!map.has(id)) map.set(id, new Set())
  map.get(id).add(place)
}

for (const [nodeId, node] of Object.entries(STORY)) {
  // Departure prose can describe an outcome without establishing another
  // travelled physical place. It earns no place, texture or vocabulary breadth.
  if (isUnchartedStoryNode(nodeId)) continue
  const place = PLACE_OF[nodeId]
  for (const entry of node.text || []) {
    const line = lineOf(entry)
    const dimensions = authoredEnvironmentDimensions([line])
    if (dimensions.size) {
      communicatedEnvironmentPlaces.add(place)
      for (const dimension of dimensions) dimensionPlaces[dimension].add(place)
      if (!isDialogueOnlyEnvironmentEntry(entry, line)) {
        environmentPlaces.add(place)
        const surface = albanianTextOf(line).toLocaleLowerCase('sq').trim()
        if (!environmentSurfacePlaces.has(surface)) environmentSurfacePlaces.set(surface, new Set())
        environmentSurfacePlaces.get(surface).add(place)
        environmentPatternEntries.push({ place, surface, pattern: tokenPatternOf(line), line })
      }
    }

    const conditions = conditionIdsOf(entry)
    if (conditions.some(isPhysicalResponseCondition)) responsivePlaces.add(place)
    if (conditions.includes('again')) familiarityAwarePlaces.add(place)
    if (positiveConditionIdsOf(entry).includes('again')) explicitReturnPlaces.add(place)
    if (observationIdOfLine(line)) observationPlaces.add(place)

    for (const token of line.filter((candidate) => candidate?.id)) {
      addTokenPlace(storyTokenPlaces, token.id, place)
      if (LIVED_WORLD_VOCABULARY[token.id]) livedVocabularyPlaces.add(place)
    }
  }
  for (const option of node.options || []) {
    if (!Array.isArray(option.text)) continue
    for (const token of option.text.filter((candidate) => candidate?.id)) {
      addTokenPlace(optionTokenPlaces, token.id, place)
      if (LIVED_WORLD_VOCABULARY[token.id]) livedVocabularyPlaces.add(place)
    }
  }
}

// Vocabulary breadth is reported and gated separately. A conversational
// adverb in one dialogue must not turn an otherwise bare location into a
// “textured” place.
const texturedPlaces = new Set([
  ...environmentPlaces,
  ...responsivePlaces,
  ...observationPlaces,
])

assert.ok(
  environmentPlaces.size >= WORLD_TEXTURE_REVIEW.minimumAuthoredEnvironmentPlaces,
  `only ${environmentPlaces.size} physical places carry authored environment prose`,
)
assert.ok(
  responsivePlaces.size >= WORLD_TEXTURE_REVIEW.minimumResponsivePlaces,
  `only ${responsivePlaces.size} physical places respond to route, return or world state`,
)
assert.ok(
  texturedPlaces.size >= WORLD_TEXTURE_REVIEW.minimumTexturedPlaces,
  `only ${texturedPlaces.size} physical places have environment, state or observation texture`,
)
assert.ok(
  familiarityAwarePlaces.size >= WORLD_TEXTURE_REVIEW.minimumFamiliarityAwarePlaces,
  `only ${familiarityAwarePlaces.size} physical places change after their first visit`,
)
assert.ok(
  explicitReturnPlaces.size >= WORLD_TEXTURE_REVIEW.minimumExplicitReturnPlaces,
  `only ${explicitReturnPlaces.size} physical places show explicit return prose`,
)
assert.ok(
  observationPlaces.size >= WORLD_TEXTURE_REVIEW.minimumObservationPlaces,
  `only ${observationPlaces.size} physical places carry an authored observation`,
)
for (const [dimension, minimum] of Object.entries(WORLD_TEXTURE_REVIEW.minimumDimensionPlaces)) {
  assert.ok(
    dimensionPlaces[dimension].size >= minimum,
    `${dimension} is authored at only ${dimensionPlaces[dimension].size} physical places`,
  )
}

const regionMetrics = {}
for (const place of physicalPlaces) {
  const region = NODE_REGION[place]
  assert.ok(region, `${place}: canonical physical place has no reviewed region`)
  const metrics = regionMetrics[region] ||= { places: 0, textured: 0, environment: 0, responsive: 0, observation: 0, livedVocabulary: 0, familiarity: 0, explicitReturn: 0 }
  metrics.places += 1
  if (texturedPlaces.has(place)) metrics.textured += 1
  if (environmentPlaces.has(place)) metrics.environment += 1
  if (responsivePlaces.has(place)) metrics.responsive += 1
  if (observationPlaces.has(place)) metrics.observation += 1
  if (livedVocabularyPlaces.has(place)) metrics.livedVocabulary += 1
  if (familiarityAwarePlaces.has(place)) metrics.familiarity += 1
  if (explicitReturnPlaces.has(place)) metrics.explicitReturn += 1
}
for (const [region, minimum] of Object.entries(WORLD_TEXTURE_REVIEW.minimumTexturedPlacesByRegion)) {
  assert.ok(regionMetrics[region], `${region}: reviewed region disappeared`)
  assert.ok(
    regionMetrics[region].textured >= minimum,
    `${region} textures only ${regionMetrics[region].textured}/${regionMetrics[region].places} physical places`,
  )
}
assert.deepEqual(
  Object.keys(regionMetrics).sort(),
  Object.keys(WORLD_TEXTURE_REVIEW.minimumTexturedPlacesByRegion).sort(),
  'a region was added without an explicit world-texture floor',
)
assert.deepEqual(
  Object.keys(WORLD_TEXTURE_REVIEW.minimumEnvironmentPlacesByRegion).sort(),
  Object.keys(WORLD_TEXTURE_REVIEW.minimumTexturedPlacesByRegion).sort(),
  'a region has no explicit authored-environment floor',
)
for (const [region, minimum] of Object.entries(WORLD_TEXTURE_REVIEW.minimumEnvironmentPlacesByRegion)) {
  assert.ok(
    regionMetrics[region].environment >= minimum,
    `${region} carries authored environment at only ${regionMetrics[region].environment}/${regionMetrics[region].places} physical places`,
  )
}
for (const [region, maximum] of Object.entries(WORLD_TEXTURE_REVIEW.maximumUntexturedPlacesByRegion)) {
  const untextured = regionMetrics[region].places - regionMetrics[region].textured
  assert.ok(
    untextured <= maximum,
    `${region} has ${untextured} untextured physical places; reviewed maximum is ${maximum}`,
  )
}

const usedWorldTextureExceptionClaims = new Set()
const repeatedSurfaceTargets = new Set()
for (const [surface, places] of environmentSurfacePlaces) {
  if (places.size <= 2) continue
  const target = repeatedSurfaceTarget(surface)
  repeatedSurfaceTargets.add(target)
  const review = auditExceptionFor(
    WORLD_TEXTURE_EXCEPTIONS,
    'repeated-environment-surface',
    target,
  )
  assert.ok(review, `authored environment template repeats at ${places.size} places: “${surface}”`)
  assert.equal(
    review.maximumPlaces,
    review.reviewedPlaces.length,
    `${review.id}: place limit is not the exact reviewed place set`,
  )
  assert.deepEqual(
    [...places].sort(),
    [...review.reviewedPlaces].sort(),
    `${review.id}: repeated surface changed its exact reviewed canonical-place set`,
  )
  usedWorldTextureExceptionClaims.add(
    auditExceptionClaimKey('repeated-environment-surface', target),
  )
}

const environmentWildcardPatterns = new Map()
for (const entry of environmentPatternEntries) {
  const tokens = entry.pattern.split('|')
  for (let index = 0; index < tokens.length; index += 1) {
    if (!entry.line[index]?.id) continue
    const pattern = tokens.map((token, tokenIndex) => tokenIndex === index ? '*' : token).join('|')
    const record = environmentWildcardPatterns.get(pattern) || { places: new Set(), surfaces: new Set() }
    record.places.add(entry.place)
    record.surfaces.add(entry.surface)
    environmentWildcardPatterns.set(pattern, record)
  }
}
const repeatedPatternTargets = new Set()
for (const [pattern, record] of environmentWildcardPatterns) {
  if (record.places.size <= 2 || record.surfaces.size <= 1) continue
  const everySurfaceIsReviewed = [...record.surfaces].every(
    (surface) => usedWorldTextureExceptionClaims.has(auditExceptionClaimKey(
      'repeated-environment-surface',
      repeatedSurfaceTarget(surface),
    )),
  )
  if (everySurfaceIsReviewed) continue
  const target = repeatedPatternTarget(pattern)
  repeatedPatternTargets.add(target)
  const review = auditExceptionFor(
    WORLD_TEXTURE_EXCEPTIONS,
    'repeated-environment-pattern',
    target,
  )
  assert.ok(review, `one-token environment template repeats at ${record.places.size} places: “${pattern}”`)
  assert.equal(
    review.maximumPlaces,
    review.reviewedPlaces.length,
    `${review.id}: place limit is not the exact reviewed place set`,
  )
  assert.deepEqual(
    [...record.places].sort(),
    [...review.reviewedPlaces].sort(),
    `${review.id}: repeated pattern changed its exact reviewed canonical-place set`,
  )
  assert.deepEqual(
    [...record.surfaces].sort(),
    [...review.reviewedSurfaces].sort(),
    `${review.id}: repeated pattern changed its exact reviewed authored surfaces`,
  )
  usedWorldTextureExceptionClaims.add(
    auditExceptionClaimKey('repeated-environment-pattern', target),
  )
}

assert.deepEqual(
  auditExceptionRegistryIssues(WORLD_TEXTURE_EXCEPTIONS, {
    validTargetsByRule: {
      'repeated-environment-surface': repeatedSurfaceTargets,
      'repeated-environment-pattern': repeatedPatternTargets,
    },
  }),
  [],
  'world-texture exception registry is malformed, stale, duplicate or out of scope',
)
assert.deepEqual(
  auditExceptionUsageIssues(WORLD_TEXTURE_EXCEPTIONS, usedWorldTextureExceptionClaims),
  [],
  'world-texture exceptions are unused, stale or unregistered',
)

for (const [id, review] of Object.entries(LIVED_WORLD_VOCABULARY)) {
  assert.ok(DICT[id], `${id}: lived-world ledger points at no dictionary sense`)
  assert.ok(typeof review.domain === 'string' && review.domain.length >= 12, `${id}: lived-world domain is not editorially specific`)
  assert.ok(Number.isSafeInteger(review.minimumPlaces) && review.minimumPlaces >= 1, `${id}: invalid physical-place floor`)
  assert.ok(Array.isArray(DEFS[id]), `${id}: lived-world word has no in-language definition`)
  const definitionWords = DEFS[id].filter((token) => token?.id)
  assert.ok(definitionWords.length >= 2, `${id}: in-language definition is too thin to distinguish the sense`)
  assert.ok(definitionWords.every((token) => token.id !== id), `${id}: in-language definition is circular`)
  assert.ok(!albanianTextOf(DEFS[id]).includes('___'), `${id}: in-language definition still contains a placeholder`)
  const storyPlaces = storyTokenPlaces.get(id) || new Set()
  const optionPlaces = optionTokenPlaces.get(id) || new Set()
  const places = new Set([...storyPlaces, ...optionPlaces])
  assert.ok(
    places.size >= review.minimumPlaces,
    `${id} (${review.domain}) occurs at only ${places.size}/${review.minimumPlaces} required physical places`,
  )
  assert.ok(storyPlaces.size >= 1, `${id}: lived-world sense appears only in choice labels, never in story context`)
}

console.log('=== Aventura Shqip — whole-world texture ===')
console.log(`physical places: ${physicalPlaces.length}`)
console.log(`uncharted outcomes excluded: ${unchartedNodes.length} · validated canonical departures: ${DEPARTURE_CONTEXTS.length}`)
console.log(`environment communicated (including greetings): ${communicatedEnvironmentPlaces.size}`)
console.log(`authored environment: ${environmentPlaces.size}`)
console.log(`state/route responsive: ${responsivePlaces.size}`)
console.log(`observation-bearing: ${observationPlaces.size}`)
console.log(`lived-vocabulary bearing: ${livedVocabularyPlaces.size}`)
console.log(`textured union: ${texturedPlaces.size}`)
console.log(`familiarity-aware: ${familiarityAwarePlaces.size} · explicit return prose: ${explicitReturnPlaces.size}`)
console.log(`dimensions: ${Object.entries(dimensionPlaces).map(([id, places]) => `${id} ${places.size}`).join(' · ')}`)
for (const [region, metrics] of Object.entries(regionMetrics).sort(([left], [right]) => left.localeCompare(right))) {
  console.log(`${region}: ${metrics.textured}/${metrics.places} textured · ${metrics.environment} environment · ${metrics.responsive} responsive · ${metrics.observation} observation · ${metrics.livedVocabulary} lived-vocabulary · ${metrics.familiarity} familiarity · ${metrics.explicitReturn} explicit-return`)
}
console.log(`lived-world vocabulary: ${Object.keys(LIVED_WORLD_VOCABULARY).length} reviewed senses grounded in playable places`)
console.log('✅ whole-world texture floors, regional breadth, reuse and vocabulary grounding pass')
