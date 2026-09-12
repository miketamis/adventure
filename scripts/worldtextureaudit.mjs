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
import { PLACE_NODES, PLACE_OF } from '../src/components/nodePositions.js'
import { NODE_REGION } from '../src/game/regions.js'

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
    river: 23,
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

// A brief state-transition formula can appropriately recur because it names
// the same event. These are explicit exceptions, not a blanket duplicate
// allowance for interchangeable atmospheric templates.
const REVIEWED_REPEATABLE_ENVIRONMENT_SURFACES = Object.freeze({
  'nata vjen.': { maximumPlaces: 12, reason: 'canonical transition into night' },
  'dielli vjen.': { maximumPlaces: 8, reason: 'canonical transition into daylight' },
  'çadra të mban të thatë.': { maximumPlaces: 8, reason: 'shared umbrella affordance in rain' },
  'çadra të mban të thatë në stuhi.': { maximumPlaces: 8, reason: 'shared umbrella affordance in a storm' },
})

// A one-token wildcard catches the common template failure where an author
// changes only the final place noun. Existing beginner constructions are
// capped at the reviewed baseline; a new place cannot silently copy them.
const REVIEWED_REPEATABLE_ENVIRONMENT_PATTERNS = Object.freeze({
  'diell|*|.': { maximumPlaces: 6, reason: 'reviewed daylight-transition baseline; do not extend it to new places' },
  'eshte|agim|:|nje|drite|e_art|arte|bie|mbi|*|.': { maximumPlaces: 5, reason: 'reviewed beginner dawn construction; freeze rather than reward further noun swaps' },
  'eshte|muzg|:|qiell|behet|i_art|kuq|mbi|*|.': { maximumPlaces: 4, reason: 'reviewed beginner dusk construction; freeze rather than reward further noun swaps' },
  'diell|eshte|mbi|*|.': { maximumPlaces: 3, reason: 'reviewed beginner daylight location frame; no further place substitutions' },
  'eshte|muzg|:|qiell|mbi|*|behet|i_art|kuq|dhe|i_art|arte|.': { maximumPlaces: 3, reason: 'reviewed red-and-gold dusk frame; no further place substitutions' },
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
for (const nodeId of Object.keys(STORY)) {
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

for (const [surface, places] of environmentSurfacePlaces) {
  if (places.size <= 2) continue
  const review = REVIEWED_REPEATABLE_ENVIRONMENT_SURFACES[surface]
  assert.ok(review, `authored environment template repeats at ${places.size} places: “${surface}”`)
  assert.ok(
    places.size <= review.maximumPlaces,
    `reviewed environment formula exceeds its ${review.maximumPlaces}-place limit: “${surface}”`,
  )
  assert.ok(review.reason.length >= 30, `repeat exception has no concrete rationale: “${surface}”`)
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
for (const [pattern, record] of environmentWildcardPatterns) {
  if (record.places.size <= 2 || record.surfaces.size <= 1) continue
  const everySurfaceIsReviewed = [...record.surfaces].every(
    (surface) => REVIEWED_REPEATABLE_ENVIRONMENT_SURFACES[surface],
  )
  if (everySurfaceIsReviewed) continue
  const review = REVIEWED_REPEATABLE_ENVIRONMENT_PATTERNS[pattern]
  assert.ok(review, `one-token environment template repeats at ${record.places.size} places: “${pattern}”`)
  assert.ok(
    record.places.size <= review.maximumPlaces,
    `reviewed environment pattern exceeds its ${review.maximumPlaces}-place limit: “${pattern}”`,
  )
  assert.ok(review.reason.length >= 40, `repeat-pattern exception has no concrete rationale: “${pattern}”`)
}

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
