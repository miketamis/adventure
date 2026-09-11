// Structural world audit. Readable output is the default; pass --json for CI.
// Ordinary runs fail on contradictions/integrity errors and keep explicitly
// recorded design debt visible as warnings. `--strict` is the release claim:
// it fails on either errors or unresolved warnings. Reviewed source limits and
// deliberate offstage/source-only decisions remain visible as qualifications,
// but are not mislabeled as structural defects.
import { readFileSync, readdirSync } from 'node:fs'
import { STORY, lineOf } from '../src/game/content.js'
import { NODE_AT, NODE_POS, PLACE_OF, PLACE_NODES } from '../src/components/nodePositions.js'
import { PLACE_META } from '../src/components/placeMeta.js'
import { playerMapLabel } from '../src/components/mapLabels.js'
import { NODE_REGION, REGION_NODES, REGIONS, REGION_OVERRIDES } from '../src/game/regions.js'
import { worldDistribution } from './worldmetrics.mjs'
import {
  PLACE_PROJECTION_REVIEWS,
  PROJECTION_DISPOSITIONS,
  PROJECTION_OMISSION_REVIEWS,
} from '../src/game/data/tales/_projectionLedger.js'
import { SELECTED_WITNESS_REVIEWS } from '../src/game/data/tales/_sourceLedger.js'
import { FESTIVAL_IDS, phaseAtCivilHour } from '../src/game/environment.js'
import {
  DISTANT_SIGHTLINES,
  DIRECTION_WORDS,
  DISTANCE_WORDS,
  MOVEMENT_VERBS,
  ROUTE_THRESHOLDS,
  STRUCTURAL_EXCEPTIONS,
  WORLD_AXES,
  WORLD_MODEL_VERSION,
  buildRouteGraph,
  crossingFor,
  distantSightlineFor,
  exceptionFor,
  isEnclosedScene,
  isDistantLineVisible,
  reconstructChart,
  routeForChoice,
  sightlinesFrom,
  tokenIds,
  transitionInfo,
} from '../src/game/worldModel.js'

const diagnostics = []
const strict = process.argv.includes('--strict')
const add = (severity, code, message, data = undefined) => diagnostics.push({ severity, code, message, ...(data === undefined ? {} : { data }) })
const ok = (code, message, data) => add('pass', code, message, data)
const warn = (code, message, data) => add('warning', code, message, data)
const fail = (code, message, data) => add('error', code, message, data)

const ids = Object.keys(STORY)
const routes = buildRouteGraph()
const realOptions = Object.values(STORY).flatMap((node) => (node.options || []).filter((option) => !option.confuser))
const storyViewSource = readFileSync(new URL('../src/components/StoryView.jsx', import.meta.url), 'utf8')
const worldContextSource = readFileSync(new URL('../src/components/WorldContext.jsx', import.meta.url), 'utf8')

// 1. Referential and coordinate integrity.
const badRefs = routes.filter((route) => !route.valid)
if (badRefs.length) fail('route.invalid', `${badRefs.length} real choices lack a valid, placed destination`, badRefs)
else ok('route.valid', `all ${routes.length} real choices resolve to placed story destinations`)

const missingPositions = ids.filter((id) => !NODE_POS[id])
if (missingPositions.length) fail('map.unplaced', `${missingPositions.length} story nodes are unplaced`, missingPositions)
else ok('map.placed', `all ${ids.length} story nodes have canonical coordinates`)

const badAliases = Object.entries(NODE_AT).filter(([, value]) => typeof value === 'string' && !NODE_AT[value])
if (badAliases.length) fail('map.alias-target', 'map aliases point at unknown anchors', badAliases)
else ok('map.alias-target', 'every same-place alias resolves to an authored anchor')

// 2. Every transition has an inspectable route contract, including explicit
// non-spatial reasons for the large number of same-place scene changes.
const routeContractMissing = routes.filter((route) => route.valid && (
  !route.kind || !route.reason || !route.duration || !route.vector ||
  route.vector.dx !== route.dx || route.vector.dy !== route.dy ||
  (route.distance > 0 && !route.direction)
))
if (routeContractMissing.length) fail('route.contract', `${routeContractMissing.length} choices lack route classification`, routeContractMissing)
else ok('route.contract', `all ${routes.length} choices have kind, reason, exact vector, distance, duration and chart direction where applicable`, Object.fromEntries(
  [...new Set(routes.map((route) => route.kind))].sort().map((kind) => [kind, routes.filter((route) => route.kind === kind).length]),
))

// Time is part of the route contract. `atHour` is civil time (0..23), while
// phase ids retain the story clock's dawn-first partition. Reject fractions,
// coercible strings and exact hours that contradict their accompanying phase.
const timingErrors = []
let exactHourRoutes = 0
for (const [from, node] of Object.entries(STORY)) {
  for (const option of (node.options || []).filter((candidate) => !candidate.confuser)) {
    const edge = `${from}->${option.to}`
    if (option.durationHours != null && (!Number.isSafeInteger(option.durationHours) || option.durationHours < 0)) {
      timingErrors.push({ edge, field: 'durationHours', value: option.durationHours })
    }
    if (option.time != null && !['dawn', 'day', 'dusk', 'night'].includes(option.time)) {
      timingErrors.push({ edge, field: 'time', value: option.time })
    }
    if (option.date != null && !FESTIVAL_IDS.includes(option.date)) {
      timingErrors.push({ edge, field: 'date', value: option.date })
    }
    if (option.atHour != null) {
      exactHourRoutes++
      if (!Number.isInteger(option.atHour) || option.atHour < 0 || option.atHour > 23) {
        timingErrors.push({ edge, field: 'atHour', value: option.atHour })
      } else if (option.time && phaseAtCivilHour(option.atHour) !== option.time) {
        timingErrors.push({ edge, field: 'time+atHour', value: { time: option.time, atHour: option.atHour } })
      }
      const route = routeForChoice(from, option)
      if (route.valid && route.duration?.targetHour !== option.atHour) {
        timingErrors.push({ edge, field: 'route.targetHour', value: route.duration?.targetHour })
      }
    }
  }
}

// An explicitly authored journey duration must have an equally explicit
// transition. It may be spoken in the player's choice, expanded by a sourced
// time-passage card, or narrated immediately in the destination's opening.
// This catches the old failure where “Yes, I can help” silently moved the
// traveller from the river bank to the square two hours later.
const explicitJourneyErrors = []
const explicitJourneys = Object.entries(STORY).flatMap(([from, node]) => (
  (node.options || []).filter((option) => !option.confuser && Number.isFinite(option.durationHours))
    .map((option) => ({ route: routeForChoice(from, option), option }))
)).filter(({ route }) => route.valid && !route.samePlace)
for (const { route, option } of explicitJourneys) {
  if (!option || option.durationHours <= 0 || route.movementVerb || option.timePassage) continue
  const openingNarratesMovement = (STORY[route.to]?.text || []).slice(0, 2).some((entry) => (
    tokenIds(lineOf(entry)).some((id) => MOVEMENT_VERBS.has(id))
  ))
  if (!openingNarratesMovement) explicitJourneyErrors.push({
    edge: `${route.from}->${route.to}`,
    durationHours: option.durationHours,
    optionTokens: tokenIds(option.text),
  })
}
if (explicitJourneyErrors.length) {
  fail('prose.explicit-journey', 'timed place changes occur without choice, passage or arrival movement prose', explicitJourneyErrors)
} else {
  ok('prose.explicit-journey', `${explicitJourneys.filter(({ route }) => route.duration.hours > 0).length} explicitly timed place changes narrate their movement`)
}
if (timingErrors.length) fail('route.timing-contract', `${timingErrors.length} choices have malformed or contradictory timing`, timingErrors)
else if (exactHourRoutes === 0) fail('route.timing-contract', 'the exact civil-hour route mechanic has no playable authored expression')
else ok('route.timing-contract', `all route durations, phases, observances and ${exactHourRoutes} exact civil-hour targets are valid`)

// "Same place" is an identity claim, not a fuzzy distance band. Exact
// reconstruction also requires every authored place to occupy one unique grid
// point and every visible "here" choice to keep that identity.
const falseLocal = routes.filter((route) => route.valid && route.kind === 'local' && !route.samePlace)
if (falseLocal.length) fail('route.false-local', `${falseLocal.length} distinct places are mislabeled as local`, falseLocal)
else ok('route.false-local', 'only true aliases are classified as same-place transitions')

const coordinateOwners = new Map()
const coordinateCollisions = []
const invalidCoordinates = []
for (const place of Object.keys(PLACE_NODES)) {
  const coordinate = NODE_POS[place]
  if (!coordinate?.every(Number.isInteger)) invalidCoordinates.push({ place, coordinate })
  const key = coordinate?.join(',')
  if (key && coordinateOwners.has(key)) coordinateCollisions.push({ coordinate, places: [coordinateOwners.get(key), place] })
  else if (key) coordinateOwners.set(key, place)
}
if (invalidCoordinates.length) fail('map.coordinate-domain', 'canonical place coordinates must be finite integer chart units', invalidCoordinates)
else ok('map.coordinate-domain', 'every canonical place uses exact integer chart units')
if (coordinateCollisions.length) fail('map.coordinate-collision', 'distinct authored places share a coordinate and should be aliases', coordinateCollisions)
else ok('map.coordinate-collision', 'no two distinct authored places silently occupy the same point')

const regionKeys = new Set(REGIONS.map((region) => region.key))
const invalidRegionOverrides = Object.entries(REGION_OVERRIDES).filter(([id, region]) =>
  !STORY[id] || !regionKeys.has(region) || NODE_REGION[id] !== region)
if (invalidRegionOverrides.length) fail('map.region-overrides', 'an explicit semantic region assignment is stale or was not applied', invalidRegionOverrides)
else ok('map.region-overrides', `all ${Object.keys(REGION_OVERRIDES).length} semantic region assignments resolve exactly`)

// The innermost cavern is sealed topology, not overlap between broad map
// ellipses. A scene placed in that core must use underworld weather/horizons.
const underworldRegion = REGIONS.find((region) => region.key === 'underworld')
const wrongRealmCore = Object.keys(PLACE_NODES).filter((place) => {
  const coordinate = NODE_POS[place]
  if (!coordinate || !underworldRegion) return false
  const normalized = Math.hypot(
    (coordinate[0] - underworldRegion.cx) / underworldRegion.rx,
    (coordinate[1] - underworldRegion.cy) / underworldRegion.ry,
  )
  return normalized <= 0.82 && !isEnclosedScene(place)
})
if (wrongRealmCore.length) fail('map.realm-core', 'places drawn inside the sealed lower realm inherited surface conditions', wrongRealmCore)
else ok('map.realm-core', 'every place in the sealed lower-realm core uses underworld conditions')

const hereRelocations = routes.filter((route) => route.valid && route.tokenIds.includes('ketu') && !route.samePlace)
if (hereRelocations.length) fail('prose.here-relocation', `${hereRelocations.length} choices say “here” but change physical place`, hereRelocations)
else ok('prose.here-relocation', 'every choice that says “here” remains at the same authored place')

const reconstruction = reconstructChart(routes)
if (reconstruction.roots.length !== 1) fail('map.reconstruction-components', `route descriptions split the chart into ${reconstruction.roots.length} disconnected components`, reconstruction.roots)
else ok('map.reconstruction-components', `one starting origin reaches all ${reconstruction.places.length} authored places`)
if (reconstruction.conflicts.length || reconstruction.canonicalMismatches.length) {
  fail('map.reconstruction-consistency', 'accumulated route vectors do not reproduce the canonical chart', {
    conflicts: reconstruction.conflicts,
    mismatches: reconstruction.canonicalMismatches,
  })
} else {
  ok('map.reconstruction-consistency', `${reconstruction.constraints.length} transition constraints reproduce all ${reconstruction.places.length} places exactly, up to page translation`)
}

const transitionVectorErrors = []
for (const [from, node] of Object.entries(STORY)) {
  for (const option of node.options || []) {
    if (option.confuser) continue
    const route = routeForChoice(from, option)
    const info = transitionInfo(from, option)
    if (!route.valid || !info.valid) continue
    if (info.dx !== route.dx || info.dy !== route.dy || info.vectorCode !== route.vector.code || info.vectorLabel !== route.vector.label) {
      transitionVectorErrors.push({ edge: `${from}->${option.to}`, route: route.vector, runtime: info })
    }
  }
}
if (transitionVectorErrors.length) fail('route.runtime-vector', 'runtime route prose loses an exact canonical vector', transitionVectorErrors)
else ok('route.runtime-vector', 'every playable transition exposes its exact canonical vector to the runtime')

// Player labels are part of the reconstructable chart too. Two distinct
// physical places must not collapse into one identically named entry, and an
// internal node key must never be the only name exposed by the atlas.
const playerPlaceLabels = Object.keys(PLACE_NODES).map((place) => ({
  place,
  label: playerMapLabel(place).trim(),
}))
const placesByLabel = new Map()
for (const row of playerPlaceLabels) {
  const key = row.label.toLocaleLowerCase('en')
  if (!placesByLabel.has(key)) placesByLabel.set(key, [])
  placesByLabel.get(key).push(row.place)
}
const ambiguousPlayerLabels = [...placesByLabel.entries()]
  .filter(([, places]) => places.length > 1)
  .map(([label, places]) => ({ label, places }))
const unsafePlayerLabels = playerPlaceLabels.filter(({ place, label }) =>
  !label || label === place || label === 'Known story place')
if (ambiguousPlayerLabels.length || unsafePlayerLabels.length) {
  fail('map.player-labels', 'the player atlas cannot uniquely name every physical place', {
    ambiguous: ambiguousPlayerLabels,
    unnamedOrInternal: unsafePlayerLabels,
  })
} else {
  ok('map.player-labels', `all ${playerPlaceLabels.length} physical places have distinct natural atlas labels`)
}

// 3. Direction words must agree with the chart.  Small perpendicular offsets
// are ambiguous and warn; a clear move in the opposite direction is an error.
const hasAny = (ids, words) => words.some((word) => ids.includes(word))
const directionalErrors = []
const directionalAmbiguous = []
for (const route of routes) {
  if (!route.valid || route.wander || route.distance <= ROUTE_THRESHOLDS.local) continue
  const t = route.tokenIds
  const checks = [
    ['left', hasAny(t, DIRECTION_WORDS.left), route.dx, -1],
    ['right', hasAny(t, DIRECTION_WORDS.right), route.dx, 1],
    ['up', hasAny(t, DIRECTION_WORDS.up), route.dy, WORLD_AXES.verticalUpDeltaY],
    ['down', hasAny(t, DIRECTION_WORDS.down), route.dy, -WORLD_AXES.verticalUpDeltaY],
    ['north', hasAny(t, DIRECTION_WORDS.north), route.dy, 1],
    ['south', hasAny(t, DIRECTION_WORDS.south), route.dy, -1],
    ['east', hasAny(t, DIRECTION_WORDS.east), route.dx, 1],
    ['west', hasAny(t, DIRECTION_WORDS.west), route.dx, -1],
  ]
  for (const [word, present, delta, expectedSign] of checks) {
    if (!present) continue
    const item = { edge: `${route.from}->${route.to}`, word, dx: route.dx, dy: route.dy, option: t.join(' ') }
    if (Math.abs(delta) <= ROUTE_THRESHOLDS.local) directionalAmbiguous.push(item)
    else if (Math.sign(delta) !== expectedSign && !exceptionFor('direction-language', item.edge)) directionalErrors.push(item)
  }
}
if (directionalErrors.length) fail('prose.direction', `${directionalErrors.length} directional choices contradict their coordinates`, directionalErrors)
else ok('prose.direction', 'directional choice wording agrees with the map')
if (directionalAmbiguous.length) warn('prose.direction-ambiguous', `${directionalAmbiguous.length} directional choices barely move on the named axis`, directionalAmbiguous)

const unsupportedCardinals = routes.filter((route) => route.valid && [
  ...DIRECTION_WORDS.north, ...DIRECTION_WORDS.south,
  ...DIRECTION_WORDS.east, ...DIRECTION_WORDS.west,
].some((word) => route.tokenIds.includes(word)))
if (unsupportedCardinals.length) warn('prose.cardinal-unsupported', 'cardinal wording appears on a deliberately non-cardinal mythic chart', unsupportedCardinals.map((route) => `${route.from}->${route.to}`))
else ok('prose.cardinal-unsupported', 'no route asks the mythic chart to imply real-world cardinal bearings')

// Chart directions on reciprocal edges must be opposites, independent of wording.
const routeByEdge = new Map(routes.filter((route) => route.valid).map((route) => [`${route.from}->${route.to}`, route]))
const reciprocalErrors = []
for (const route of routes) {
  const reverse = routeByEdge.get(`${route.to}->${route.from}`)
  if (!route.direction || !reverse?.direction || `${route.from}->${route.to}` > `${route.to}->${route.from}`) continue
  const angularDifference = Math.abs(((route.direction.degrees - reverse.direction.degrees + 540) % 360) - 180)
  const oppositionError = Math.abs(180 - angularDifference)
  if (oppositionError > 0.001 || route.dx !== -reverse.dx || route.dy !== -reverse.dy) {
    reciprocalErrors.push({ edge: `${route.from}<->${route.to}`, forward: route.vector, reverse: reverse.vector })
  }
}
if (reciprocalErrors.length) fail('route.reciprocal-bearing', 'reciprocal routes do not have exact inverse vectors', reciprocalErrors)
else ok('route.reciprocal-bearing', 'every reciprocal route has an exact inverse vector and opposite bearing')

// 4. Named barriers must be crossed through named structures.
const barrierBypasses = []
for (const route of routes) {
  // Fleeing and returning still move through the physical world; they do not
  // gain permission to cross a river off-screen merely because they are wander
  // fallbacks in the region-assignment algorithm.
  if (!route.valid || !route.movementVerb) continue
  const result = crossingFor(route.from, route.to)
  if (result && !result.crossing) barrierBypasses.push({
    edge: `${route.from}->${route.to}`,
    barrier: result.barrier.id,
    option: route.tokenIds.join(' '),
  })
}
if (barrierBypasses.length) fail('barrier.bypass', `${barrierBypasses.length} movement choices bypass a named river crossing`, barrierBypasses)
else ok('barrier.crossings', 'every movement across a named barrier uses an authored crossing')

// 5. Interaction choices should remain local unless a documented narrative
// transition describes how the destination changes.
const farInteractions = []
for (const route of routes) {
  if (!route.valid || route.wander || !route.interactionVerb || route.distance <= 400) continue
  const edge = `${route.from}->${route.to}`
  if (!exceptionFor('interaction-distance', edge)) farInteractions.push({ edge, distance: Math.round(route.distance), option: route.tokenIds.join(' ') })
}
if (farInteractions.length) fail('route.far-interaction', `${farInteractions.length} interactions teleport to distant places without a recorded narrative transition`, farInteractions)
else ok('route.far-interaction', 'distant post-interaction scene changes are explicitly documented')

// 6. Density is measured by physical place, not by node count.  A crowded
// place is allowed only when its location card separates the happenings.
const placeRows = Object.entries(PLACE_NODES).map(([place, members]) => ({
  place,
  scenes: members.filter((id) => STORY[id]).length,
  hasLocationCard: Boolean(PLACE_META[place]),
})).filter((row) => row.scenes)
const unstructuredCrowds = placeRows.filter((row) =>
  row.scenes > 8 && (!row.hasLocationCard || !PLACE_META[row.place]?.densityReason))
if (unstructuredCrowds.length) fail('density.unstructured-place', 'places with more than eight scenes need a location card and an explicit single-site reason', unstructuredCrowds)
else ok('density.location-cards', 'every place above the hard density limit has a reviewed single-site reason',
  placeRows.filter((row) => row.scenes > 8).map((row) => ({ ...row, reason: PLACE_META[row.place].densityReason })))

const regionRows = REGIONS.map((region) => {
  const nodes = REGION_NODES[region.key] || []
  const places = new Set(nodes.map((id) => PLACE_OF[id]).filter(Boolean))
  return { region: region.key, scenes: nodes.length, places: places.size }
})
const thinRegions = regionRows.filter((row) => row.region !== 'sky' && (row.scenes < 7 || row.places < 3))
if (thinRegions.length) warn('density.thin-region', `${thinRegions.length} regions are below the content-floor target (7 scenes / 3 places)`, thinRegions)
else ok('density.region-floor', 'every region meets the minimum content presence target')

// Region totals do not reveal whether the player's immediate surroundings are
// empty or unreadably crowded. Apply the same fixed walking-scale policy used
// by the reconstruction report, then require explicit review notes for remote
// authored destinations rather than filling them with invented lore.
const distribution = worldDistribution()
const distributionViolations = distribution.violations
if (distributionViolations.crowdedNeighborhoods.length) {
  fail('distribution.local-pressure', 'walking-scale neighborhoods exceed the place or scene pressure cap', distributionViolations.crowdedNeighborhoods)
} else {
  const peak = distribution.densestNeighborhoods[0]
  ok('distribution.local-pressure', `the densest ${distribution.thresholds.localRadius}-unit neighborhood stays within ${distribution.thresholds.maxLocalPlaces} places and ${distribution.thresholds.maxLocalScenes} scenes`, {
    place: peak.place,
    localPlaces: peak.localPlaces,
    localScenes: peak.localScenes,
  })
}
if (distributionViolations.hardIsolates.length) {
  fail('distribution.hard-isolate', `places may not be more than ${distribution.thresholds.hardIsolationDistance} chart units from every other place`, distributionViolations.hardIsolates)
} else ok('distribution.hard-isolate', 'no authored place is spatially detached from the rest of the chart')

const unreviewedSparse = [
  ...distributionViolations.unreviewedSparsePlaces,
  ...distributionViolations.unreviewedLongLeaves,
]
if (unreviewedSparse.length) {
  fail('distribution.sparse-review', 'remote places and long nonterminal leaf routes require a location card with an authored distribution reason', unreviewedSparse)
} else {
  ok('distribution.sparse-review', 'every remote place and long nonterminal leaf route has a reviewed identity and spacing reason')
}
if (distributionViolations.missingRichPlaceCards.length) {
  fail('distribution.rich-place-identity', `places with ${distribution.thresholds.locationCardSceneFloor} or more scenes require a complete location card`, distributionViolations.missingRichPlaceCards)
} else ok('distribution.rich-place-identity', `all places with ${distribution.thresholds.locationCardSceneFloor} or more scenes have authored local identity cards`)

if (distributionViolations.missingSceneIdentity.length) {
  fail('distribution.scene-identity', 'un-carded, nonterminal places do not carry enough distinct descriptive vocabulary to identify themselves', distributionViolations.missingSceneIdentity)
} else ok('distribution.scene-identity', `every un-carded nonterminal place has at least ${distribution.thresholds.minSceneIdentityTokens} distinct description tokens`)

if (distributionViolations.malformedCards.length) {
  fail('distribution.card-coverage', 'location cards omit, duplicate, or misplace authored scenes', distributionViolations.malformedCards)
} else ok('distribution.card-coverage', `all ${distribution.totals.locationCards} location cards account for every scene at their physical place exactly once`)

if (distributionViolations.overConcentratedRegions.length) {
  fail('distribution.region-share', `a region exceeds ${Math.round(distribution.thresholds.maxRegionSceneShare * 100)}% of all scenes`, distributionViolations.overConcentratedRegions)
} else ok('distribution.region-share', `no region holds more than ${Math.round(distribution.thresholds.maxRegionSceneShare * 100)}% of the world's scenes`)

if (distributionViolations.insufficientDensityComparison) {
  fail('distribution.region-density-coverage', 'too few broad regions remain in the scenes-per-place balance check', {
    comparable: distribution.densityComparableRegions.length,
    minimum: distribution.thresholds.minRegionsForDensityComparison,
    minimumPlaces: distribution.thresholds.minRegionPlacesForDensityComparison,
  })
} else ok('distribution.region-density-coverage', `${distribution.densityComparableRegions.length} broad regions remain under density comparison`)

if (distributionViolations.regionDensityRatio > distribution.thresholds.maxRegionScenesPerPlaceRatio) {
  fail('distribution.region-density-ratio', 'a broad region has too many scenes per place relative to another broad region', {
    ratio: distributionViolations.regionDensityRatio,
    maximum: distribution.thresholds.maxRegionScenesPerPlaceRatio,
    minimumPlaces: distribution.thresholds.minRegionPlacesForDensityComparison,
    regions: distribution.densityComparableRegions,
  })
} else ok('distribution.region-density-ratio', `broad-region scenes-per-place density ratio is ${distributionViolations.regionDensityRatio.toFixed(2)}, within the ${distribution.thresholds.maxRegionScenesPerPlaceRatio.toFixed(2)} cap (minimum ${distribution.thresholds.minRegionPlacesForDensityComparison} places)`)

// 7. Reconstruction coverage: every revealed physical choice must surface the
// canonical route contract. Native Albanian direction/distance wording remains
// a useful authorship metric, but generated route prose closes the structural
// gap now rather than waiting for hundreds of duplicated hand annotations.
const journeys = routes.filter((route) => route.valid && route.kind === 'journey' && route.movementVerb)
const placedTransitions = routes.filter((route) => route.valid && !route.samePlace)
const wordedJourneys = journeys.filter((route) => {
  const vocabulary = Object.values(DIRECTION_WORDS).flat()
  return route.tokenIds.some((id) => vocabulary.includes(id) || DISTANCE_WORDS.has(id))
})
const wordingRatio = journeys.length ? wordedJourneys.length / journeys.length : 1
const routeGuidanceMounted = storyViewSource.includes('transitionInfo(state.nodeId, opt)') &&
  storyViewSource.includes('route-note') && storyViewSource.includes('e.route.label')
if (!routeGuidanceMounted) fail('prose.route-guidance', 'StoryView does not render the canonical route contract beside travel choices')
else ok('prose.route-guidance', `all ${placedTransitions.length} place-changing choices receive exact two-axis chart guidance; ${journeys.length} are explicit journeys`, {
  nativeWording: `${wordedJourneys.length}/${journeys.length}`,
  nativeCoverage: Number((wordingRatio * 100).toFixed(1)),
})

const exactHourGuidanceMounted = storyViewSource.includes('targetHour: opt.atHour ?? null') &&
  storyViewSource.includes('arrive at ${formatCivilHour(targetHour)}') &&
  storyViewSource.includes('wait for ${festivalLabel(e.date)}')
if (!exactHourGuidanceMounted) fail('prose.exact-hour-guidance', 'exact civil-hour arrivals are missing from choice route notes')
else ok('prose.exact-hour-guidance', 'exact civil-hour and festival-hour targets are visible before a player commits')

const civilClockMounted = worldContextSource.includes('String(calendar.hour).padStart(2, \'0\')') &&
  worldContextSource.includes('PHASE[phase] || phase') &&
  worldContextSource.includes(':00')
if (!civilClockMounted) fail('environment.civil-clock-display', 'world conditions do not show exact civil time beside the derived phase')
else ok('environment.civil-clock-display', 'world and tale conditions display the converted civil HH:00 beside the matching phase')

// 8. Sightline readiness: expose deterministic phase/weather output and report
// how much existing far-view prose reacts to conditions.
const farLines = []
for (const [nodeId, node] of Object.entries(STORY)) {
  for (const entry of node.text || []) {
    const tokens = lineOf(entry)
    const lineTokens = tokenIds(tokens)
    if (!lineTokens.includes('larg')) continue
    farLines.push({
      node: nodeId,
      tokens,
      tokenIds: lineTokens,
      sightline: distantSightlineFor(nodeId, lineTokens),
      conditioned: !Array.isArray(entry),
      condition: Array.isArray(entry) ? null : entry.cond,
    })
  }
}
const conditionedFar = farLines.filter((line) => line.conditioned)
const horizonLines = farLines.filter((line) => line.sightline)
const nonVisualFarLines = farLines.filter((line) => !line.sightline)
const sightlineProbe = ids.slice(0, 12).flatMap((id) => ['day', 'night'].flatMap((phase) => ['clear', 'cloud', 'storm'].flatMap((weather) => sightlinesFrom(id, { phase, weather, season: 'spring' }))))
if (sightlineProbe.some((line) => typeof line.visible !== 'boolean' || !line.reason)) fail('sightline.contract', 'sightline model returned an incomplete record')
else ok('sightline.contract', 'sightline results are deterministic across phase, weather and season inputs')
const surfaceUnderworldLeaks = ids.filter((id) =>
  NODE_REGION[id] !== 'underworld' &&
  sightlinesFrom(id, { phase: 'day', weather: 'clear', season: 'spring' })
    .some((line) => line.key === 'underworld' && line.visible))
if (surfaceUnderworldLeaks.length) fail('sightline.realm-barrier', 'surface horizons expose the sealed world below', surfaceUnderworldLeaks)
else ok('sightline.realm-barrier', 'the world below never appears on a surface horizon')
const underworldSurfaceLeaks = ids.filter((id) =>
  isEnclosedScene(id) &&
  sightlinesFrom(id, { phase: 'day', weather: 'clear', season: 'spring' })
    .some((line) => line.key !== NODE_REGION[id] && line.visible))
if (underworldSurfaceLeaks.length) fail('sightline.surface-barrier', 'lower-realm scenes expose a surface horizon through rock', underworldSurfaceLeaks)
else ok('sightline.surface-barrier', 'the sealed world below never exposes a surface horizon')

const horizonSignature = (nodeId, environment) => sightlinesFrom(nodeId, environment)
  .filter((line) => line.visible)
  .map((line) => line.key)
  .sort()
  .join('|')
const seasonalSightlineChanges = ids.filter((id) =>
  horizonSignature(id, { phase: 'day', weather: 'clear', season: 'winter' }) !==
  horizonSignature(id, { phase: 'day', weather: 'clear', season: 'summer' }))
if (!seasonalSightlineChanges.length) fail('sightline.season', 'season is displayed but never changes a distant view')
else ok('sightline.season', `${seasonalSightlineChanges.length} forest scenes gain or lose a clear-day horizon as the leaf canopy changes`)

const visibilityCount = (id, environment) => sightlinesFrom(id, environment).filter((line) => line.visible).length
const nonMonotonicHorizons = ids.flatMap((id) => ['spring', 'summer', 'autumn', 'winter'].flatMap((season) => {
  const day = visibilityCount(id, { phase: 'day', weather: 'clear', season })
  const dusk = visibilityCount(id, { phase: 'dusk', weather: 'clear', season })
  const night = visibilityCount(id, { phase: 'night', weather: 'clear', season })
  const cloud = visibilityCount(id, { phase: 'day', weather: 'cloud', season })
  const rain = visibilityCount(id, { phase: 'day', weather: 'rain', season })
  const storm = visibilityCount(id, { phase: 'day', weather: 'storm', season })
  return dusk > day || night > dusk || cloud > day || rain > cloud || storm > rain
    ? [{ id, season, day, dusk, night, cloud, rain, storm }]
    : []
}))
if (nonMonotonicHorizons.length) fail('sightline.monotonic', 'worse light or weather reveals more geography', nonMonotonicHorizons)
else ok('sightline.monotonic', 'dusk, night, cloud, rain and storm never reveal more geography than clearer conditions')
const unmatchedSightlineRules = DISTANT_SIGHTLINES.filter((rule) => !horizonLines.some((line) => line.sightline.id === rule.id))
const invalidSightlineTargets = DISTANT_SIGHTLINES.filter((rule) => !STORY[rule.node] || !NODE_POS[rule.node] || !NODE_POS[rule.target])
const horizonFailures = horizonLines.filter((line) => {
  const clearDay = isDistantLineVisible(line.node, line.tokens, { phase: 'day', weather: 'clear', season: 'spring' })
  const stormDay = isDistantLineVisible(line.node, line.tokens, { phase: 'day', weather: 'storm', season: 'spring' })
  return !clearDay || stormDay
})
const falseFarSightlines = horizonLines.filter((line) => {
  const target = NODE_POS[line.sightline.target]
  const origin = NODE_POS[line.node]
  return Math.hypot(target[0] - origin[0], target[1] - origin[1]) < 120
})
const nonVisualWeatherLoss = nonVisualFarLines.filter((line) => !isDistantLineVisible(line.node, line.tokens, { phase: 'night', weather: 'storm', season: 'winter' }))
if (unmatchedSightlineRules.length || invalidSightlineTargets.length || horizonFailures.length || falseFarSightlines.length || nonVisualWeatherLoss.length) {
  fail('sightline.distant-line', 'distant prose is not cleanly separated into mapped observations and non-visual uses', {
    unmatchedRules: unmatchedSightlineRules,
    invalidTargets: invalidSightlineTargets,
    horizonFailures: horizonFailures.map((line) => ({ node: line.node, rule: line.sightline?.id, tokens: line.tokenIds })),
    falseFarSightlines: falseFarSightlines.map((line) => ({ node: line.node, target: line.sightline.target, tokens: line.tokenIds })),
    nonVisualWeatherLoss: nonVisualWeatherLoss.map((line) => ({ node: line.node, tokens: line.tokenIds })),
  })
} else {
  ok('sightline.distant-line', `${horizonLines.length} mapped horizon observations react to conditions; ${nonVisualFarLines.length} non-visual uses of “far” remain factual in bad weather`)
}
const distantGateMounted = storyViewSource.includes('isDistantLineVisible(state.nodeId, line, environment)')
if (!distantGateMounted) fail('prose.sightline-coverage', 'StoryView does not apply the shared phase/weather gate to distant description lines')
else ok('prose.sightline-coverage', `all ${horizonLines.length} attributable distant observations use the live horizon`, {
  semanticFarUses: nonVisualFarLines.length,
  individuallyAuthoredConditions: `${conditionedFar.length}/${farLines.length}`,
})

// 9. Every exception has enough evidence to be reviewed and names real edges.
const malformedExceptions = []
for (const entry of STRUCTURAL_EXCEPTIONS) {
  for (const field of ['id', 'rule', 'reason', 'source', 'owner', 'review']) if (!entry[field]) malformedExceptions.push(`${entry.id || '?'}: missing ${field}`)
  for (const edge of entry.edges || []) if (!routeByEdge.has(edge)) malformedExceptions.push(`${entry.id}: unknown edge ${edge}`)
}
if (malformedExceptions.length) fail('exceptions.invalid', 'structural exception records are incomplete', malformedExceptions)
else ok('exceptions.valid', `all ${STRUCTURAL_EXCEPTIONS.length} structural exceptions are attributable and reviewable`)

// 10. Lore traceability beyond line coverage: playable scene mappings must be
// complete enough to trace each projection to an original beat. Absence and
// compression are not automatically debt: reviewed selected-language witnesses,
// justified proposed anchors and explicit source-only timelines are valid
// dispositions. Only an unresolved or unreviewed state warns.
const tales = []
for (const file of readdirSync(new URL('../src/game/data/tales', import.meta.url))) {
  if (!file.endsWith('.js') || file.startsWith('_')) continue
  const tale = (await import(`../src/game/data/tales/${file}`)).default
  if (tale?.id) tales.push(tale)
}
const loreErrors = []
const loreDebt = { unreviewedSourceWitness: [], locatedUnalignedSource: [], unresolvedProposedPlaces: [], unresolvedProjectionBeats: [], noProjectionDisposition: [] }
const loreQualifications = { reviewedNonAlbanianOrSynthesis: [], justifiedProposedPlaces: [], sourceOnlyTimelines: [] }
for (const tale of tales) {
  const beats = new Set((tale.beats || []).map((beat) => beat.id))
  if (!tale.origin) loreErrors.push(`${tale.id}: missing origin`)
  if (tale.albanian?.status === 'missing') {
    if (SELECTED_WITNESS_REVIEWS[tale.id]) loreQualifications.reviewedNonAlbanianOrSynthesis.push(tale.id)
    else loreDebt.unreviewedSourceWitness.push(tale.id)
  }
  if (tale.albanian?.status === 'located') loreDebt.locatedUnalignedSource.push(tale.id)
  for (const place of tale.places || []) {
    if (!place.anchor?.mirror || !place.anchor?.mold) loreErrors.push(`${tale.id}.${place.id}: missing mirror or mold`)
    if (place.anchor?.status === 'proposed') {
      const key = `${tale.id}.${place.id}`
      if (PLACE_PROJECTION_REVIEWS[key]?.disposition === PROJECTION_DISPOSITIONS.JUSTIFIED) loreQualifications.justifiedProposedPlaces.push(key)
      else loreDebt.unresolvedProposedPlaces.push(key)
    }
  }
  if (!tale.play) {
    if (tale.projection?.status === 'source-only' && tale.projection.reason) loreQualifications.sourceOnlyTimelines.push(tale.id)
    else loreDebt.noProjectionDisposition.push(tale.id)
  }
  for (const [scene, mappedBeats] of Object.entries(tale.play?.scenes || {})) {
    if (!STORY[scene]) loreErrors.push(`${tale.id}: projection names unknown scene ${scene}`)
    for (const beat of (Array.isArray(mappedBeats) ? mappedBeats : [mappedBeats])) {
      if (!beats.has(beat)) loreErrors.push(`${tale.id}: scene ${scene} names unknown beat ${beat}`)
    }
  }
  for (const divergence of tale.play?.divergences || []) if (!divergence.note) loreErrors.push(`${tale.id}: unrecorded play divergence`)
}
for (const review of Object.values(PROJECTION_OMISSION_REVIEWS)) {
  if (review.disposition !== PROJECTION_DISPOSITIONS.JUSTIFIED) loreDebt.unresolvedProjectionBeats.push(`${review.taleId}.${review.beatId}`)
}
if (loreErrors.length) fail('lore.traceability', `${loreErrors.length} lore claims cannot be traced`, loreErrors)
else ok('lore.traceability', `all ${tales.length} tale records keep origin, place-mirror and playable-beat traceability`)
if (Object.values(loreDebt).some((items) => items.length)) warn('lore.debt', 'unresolved source or projection decisions remain', loreDebt)
else ok('lore.dispositions', `${loreQualifications.reviewedNonAlbanianOrSynthesis.length} source qualifications, ${loreQualifications.justifiedProposedPlaces.length} proposed anchors and ${loreQualifications.sourceOnlyTimelines.length} source-only timelines are explicitly reviewed`, loreQualifications)

const counts = {
  passes: diagnostics.filter((item) => item.severity === 'pass').length,
  warnings: diagnostics.filter((item) => item.severity === 'warning').length,
  errors: diagnostics.filter((item) => item.severity === 'error').length,
}

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ version: 2, worldModelVersion: WORLD_MODEL_VERSION, counts, diagnostics }, null, 2))
} else {
  for (const item of diagnostics) {
    console.log(`${item.severity === 'pass' ? '✅' : item.severity === 'warning' ? '⚠️ ' : '❌'} ${item.code}: ${item.message}`)
    if (item.severity !== 'pass' && item.data !== undefined) console.log('   ' + JSON.stringify(item.data))
  }
  console.log(`\nworldaudit: ${counts.passes} passed, ${counts.warnings} warnings, ${counts.errors} errors`)
  if (strict) console.log(`strict structural certification: ${counts.errors || counts.warnings ? 'FAIL' : 'PASS'}`)
}

process.exitCode = counts.errors || (strict && counts.warnings) ? 1 : 0
