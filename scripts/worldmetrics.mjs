// Deterministic content-distribution metrics for the canonical place chart.
// Kept separate from the presentation scripts so CI and the reconstruction
// report apply exactly the same walking-scale thresholds.
import { STORY, lineOf } from '../src/game/content.js'
import { NODE_POS, PLACE_NODES } from '../src/components/nodePositions.js'
import { PLACE_META } from '../src/components/placeMeta.js'
import { NODE_REGION, REGIONS } from '../src/game/regions.js'
import { buildRouteGraph, tokenIds } from '../src/game/worldModel.js'

export const DISTRIBUTION_THRESHOLDS = Object.freeze({
  localRadius: 80,
  maxLocalPlaces: 10,
  maxLocalScenes: 32,
  sparseReviewDistance: 300,
  hardIsolationDistance: 400,
  longLeafRoute: 600,
  locationCardSceneFloor: 5,
  minSceneIdentityTokens: 10,
  maxRegionSceneShare: 0.35,
  // Density comparisons need enough distinct places to describe a region rather
  // than the scene depth of one castle, lake or court. Small named realms still
  // remain covered by the absolute share, place-card and neighborhood gates.
  minRegionPlacesForDensityComparison: 5,
  minRegionsForDensityComparison: 5,
  maxRegionScenesPerPlaceRatio: 2.5,
})

const storyNodesAt = (place) => (PLACE_NODES[place] || []).filter((id) => STORY[id])

export function worldDistribution() {
  const routes = buildRouteGraph().filter((route) => route.valid && !route.samePlace)
  const places = Object.keys(PLACE_NODES).filter((place) => STORY[place]).sort()
  const physicalAdjacency = new Map(places.map((place) => [place, new Map()]))
  for (const route of routes) {
    if (route.kind === 'projection') continue
    const forward = physicalAdjacency.get(route.fromPlace)
    const reverse = physicalAdjacency.get(route.toPlace)
    forward?.set(route.toPlace, Math.min(forward.get(route.toPlace) ?? Infinity, route.distance))
    reverse?.set(route.fromPlace, Math.min(reverse.get(route.fromPlace) ?? Infinity, route.distance))
  }

  const placeRows = places.map((place) => {
    const members = storyNodesAt(place)
    const [x, y] = NODE_POS[place]
    let nearestPlace = null
    let nearestDistance = Infinity
    for (const other of places) {
      if (other === place) continue
      const distance = Math.hypot(NODE_POS[other][0] - x, NODE_POS[other][1] - y)
      if (distance < nearestDistance || (distance === nearestDistance && other < nearestPlace)) {
        nearestPlace = other
        nearestDistance = distance
      }
    }
    const neighborhood = places.filter((other) =>
      Math.hypot(NODE_POS[other][0] - x, NODE_POS[other][1] - y) <= DISTRIBUTION_THRESHOLDS.localRadius)
    const routeDistances = [...(physicalAdjacency.get(place)?.values() || [])]
    const descriptionTokens = new Set(members.flatMap((id) =>
      (STORY[id].text || []).flatMap((entry) => tokenIds(lineOf(entry)))))
    const allTerminal = members.every((id) => STORY[id].end)
    const meta = PLACE_META[place] || null
    return {
      place,
      region: NODE_REGION[place] || 'village',
      coordinate: [x, y],
      scenes: members.length,
      routeDegree: routeDistances.length,
      shortestPhysicalRoute: routeDistances.length ? Math.min(...routeDistances) : null,
      nearestPlace,
      nearestDistance,
      localPlaces: neighborhood.length,
      localScenes: neighborhood.reduce((sum, other) => sum + storyNodesAt(other).length, 0),
      descriptionTokens: descriptionTokens.size,
      allTerminal,
      hasLocationCard: Boolean(meta),
      distributionReason: meta?.distributionReason || null,
      identity: meta ? 'location-card' : allTerminal ? 'terminal-outcome' : 'scene-prose',
    }
  })

  const totalScenes = placeRows.reduce((sum, row) => sum + row.scenes, 0)
  const regionRows = REGIONS.map((region) => {
    const members = placeRows.filter((row) => row.region === region.key)
    const scenes = members.reduce((sum, row) => sum + row.scenes, 0)
    return {
      region: region.key,
      places: members.length,
      scenes,
      sceneShare: totalScenes ? scenes / totalScenes : 0,
      scenesPerPlace: members.length ? scenes / members.length : 0,
    }
  })
  const densityComparableRegions = regionRows.filter((row) =>
    row.places >= DISTRIBUTION_THRESHOLDS.minRegionPlacesForDensityComparison)
  const populatedRegionDensities = densityComparableRegions.map((row) => row.scenesPerPlace)

  const malformedCards = []
  for (const [place, meta] of Object.entries(PLACE_META)) {
    const actual = storyNodesAt(place)
    const listed = (meta.happenings || []).flatMap((happening) => happening.nodes || [])
    const missing = actual.filter((id) => !listed.includes(id))
    const extra = listed.filter((id) => !actual.includes(id))
    const duplicate = listed.filter((id, index) => listed.indexOf(id) !== index)
    if (!meta.name?.trim() || !(meta.happenings || []).length ||
      (meta.happenings || []).some((happening) => !happening.title?.trim() || !(happening.nodes || []).length) ||
      missing.length || extra.length || duplicate.length) {
      malformedCards.push({ place, missing, extra, duplicate })
    }
  }

  const violations = {
    crowdedNeighborhoods: placeRows.filter((row) =>
      row.localPlaces > DISTRIBUTION_THRESHOLDS.maxLocalPlaces || row.localScenes > DISTRIBUTION_THRESHOLDS.maxLocalScenes),
    hardIsolates: placeRows.filter((row) => row.nearestDistance > DISTRIBUTION_THRESHOLDS.hardIsolationDistance),
    unreviewedSparsePlaces: placeRows.filter((row) =>
      row.nearestDistance > DISTRIBUTION_THRESHOLDS.sparseReviewDistance && !row.distributionReason),
    unreviewedLongLeaves: placeRows.filter((row) =>
      !row.allTerminal && row.routeDegree <= 1 && row.shortestPhysicalRoute != null &&
      row.shortestPhysicalRoute > DISTRIBUTION_THRESHOLDS.longLeafRoute && !row.distributionReason),
    missingRichPlaceCards: placeRows.filter((row) =>
      row.scenes >= DISTRIBUTION_THRESHOLDS.locationCardSceneFloor && !row.hasLocationCard),
    missingSceneIdentity: placeRows.filter((row) =>
      !row.hasLocationCard && !row.allTerminal && row.descriptionTokens < DISTRIBUTION_THRESHOLDS.minSceneIdentityTokens),
    malformedCards,
    overConcentratedRegions: regionRows.filter((row) => row.sceneShare > DISTRIBUTION_THRESHOLDS.maxRegionSceneShare),
    insufficientDensityComparison:
      densityComparableRegions.length < DISTRIBUTION_THRESHOLDS.minRegionsForDensityComparison,
    regionDensityRatio: populatedRegionDensities.length
      ? Math.max(...populatedRegionDensities) / Math.min(...populatedRegionDensities)
      : 0,
  }

  return {
    thresholds: DISTRIBUTION_THRESHOLDS,
    totals: {
      places: placeRows.length,
      scenes: totalScenes,
      locationCards: Object.keys(PLACE_META).length,
    },
    placeRows,
    regionRows,
    densityComparableRegions,
    densestNeighborhoods: [...placeRows]
      .sort((a, b) => b.localScenes - a.localScenes || b.localPlaces - a.localPlaces || a.place.localeCompare(b.place))
      .slice(0, 10),
    sparsestPlaces: [...placeRows]
      .sort((a, b) => b.nearestDistance - a.nearestDistance || a.place.localeCompare(b.place))
      .slice(0, 10),
    violations,
  }
}
