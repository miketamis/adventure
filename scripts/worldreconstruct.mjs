// Deterministic blind reconstruction report for the mythic world chart.
//
// The report deliberately begins at an arbitrary [0,0]: descriptions can
// recover relative geography, never the page's absolute margin. Every other
// coordinate is accumulated from the exact vectors carried by playable
// choices, then checked against NODE_POS.
import { NODE_REGION } from '../src/game/regions.js'
import {
  WORLD_AXES,
  WORLD_MODEL_VERSION,
  buildRouteGraph,
  reconstructChart,
} from '../src/game/worldModel.js'
import { worldDistribution } from './worldmetrics.mjs'

const reconstruction = reconstructChart(buildRouteGraph())
const distributionModel = worldDistribution()
const root = reconstruction.roots[0]
const rows = reconstruction.places
  .map((place) => ({
    place,
    region: NODE_REGION[place] || 'village',
    x: reconstruction.recovered[place][0],
    y: reconstruction.recovered[place][1],
  }))
  .sort((a, b) => a.y - b.y || a.x - b.x || a.place.localeCompare(b.place))

const modes = Object.fromEntries(
  [...new Set(reconstruction.constraints.map((edge) => edge.kind))]
    .sort()
    .map((kind) => [kind, reconstruction.constraints.filter((edge) => edge.kind === kind).length]),
)
const report = {
  schemaVersion: 2,
  worldModelVersion: WORLD_MODEL_VERSION,
  exactUpToGlobalTranslation: true,
  axes: WORLD_AXES,
  origin: { place: root || null, coordinate: [0, 0] },
  counts: {
    places: rows.length,
    constraints: reconstruction.constraints.length,
    components: reconstruction.roots.length,
    conflicts: reconstruction.conflicts.length,
    canonicalMismatches: reconstruction.canonicalMismatches.length,
    modes,
  },
  places: rows,
  projectionLinks: reconstruction.constraints
    .filter((edge) => edge.kind === 'projection')
    .map(({ edge, from, to, dx, dy }) => ({ edge, from, to, dx, dy })),
  distribution: {
    thresholds: distributionModel.thresholds,
    totals: distributionModel.totals,
    regions: distributionModel.regionRows,
    densestNeighborhoods: distributionModel.densestNeighborhoods.map((row) => ({
      place: row.place,
      region: row.region,
      localPlaces: row.localPlaces,
      localScenes: row.localScenes,
    })),
    sparsestPlaces: distributionModel.sparsestPlaces.map((row) => ({
      place: row.place,
      region: row.region,
      nearestPlace: row.nearestPlace,
      nearestDistance: Number(row.nearestDistance.toFixed(2)),
      routeDegree: row.routeDegree,
      distributionReason: row.distributionReason,
    })),
    violations: {
      crowdedNeighborhoods: distributionModel.violations.crowdedNeighborhoods.length,
      hardIsolates: distributionModel.violations.hardIsolates.length,
      unreviewedSparsePlaces: distributionModel.violations.unreviewedSparsePlaces.length,
      unreviewedLongLeaves: distributionModel.violations.unreviewedLongLeaves.length,
      missingRichPlaceCards: distributionModel.violations.missingRichPlaceCards.length,
      missingSceneIdentity: distributionModel.violations.missingSceneIdentity.length,
      malformedCards: distributionModel.violations.malformedCards.length,
      overConcentratedRegions: distributionModel.violations.overConcentratedRegions.length,
      insufficientDensityComparison: distributionModel.violations.insufficientDensityComparison,
      regionDensityRatio: Number(distributionModel.violations.regionDensityRatio.toFixed(3)),
      regionDensityRatioExceeded:
        distributionModel.violations.regionDensityRatio > distributionModel.thresholds.maxRegionScenesPerPlaceRatio,
    },
  },
}

const distributionBroken = Object.entries(report.distribution.violations)
  .some(([key, value]) => key === 'regionDensityRatio'
    ? false
    : typeof value === 'boolean' ? value : value > 0)
const broken = report.counts.components !== 1 || report.counts.conflicts > 0 ||
  report.counts.canonicalMismatches > 0 || distributionBroken
if (process.argv.includes('--json')) {
  console.log(JSON.stringify(report, null, 2))
} else if (process.argv.includes('--check')) {
  console.log(
    `worldreconstruct: ${broken ? 'FAILED' : 'exact'} — ${report.counts.places} places, ` +
    `${report.counts.constraints} route constraints, ${report.counts.components} component; ` +
    `${report.distribution.totals.locationCards} location cards, ${distributionBroken ? 'distribution violations' : 'distribution within policy'}`,
  )
} else {
  console.log('# Blind world-chart reconstruction')
  console.log('')
  console.log(`World model: ${WORLD_MODEL_VERSION}`)
  console.log(`Origin: ${root} = [0, 0]`)
  console.log(`Axes: +x ${WORLD_AXES.xPositive}; -x ${WORLD_AXES.xNegative}; +y ${WORLD_AXES.yPositive}; -y ${WORLD_AXES.yNegative}`)
  console.log(`Result: ${broken ? 'FAILED' : 'exact up to one global page translation'}`)
  console.log(`Coverage: ${report.counts.places} places from ${report.counts.constraints} playable transition constraints in ${report.counts.components} component`)
  const densest = report.distribution.densestNeighborhoods[0]
  const sparsest = report.distribution.sparsestPlaces[0]
  console.log(`Distribution: ${report.distribution.totals.locationCards} location cards; densest ${report.distribution.thresholds.localRadius}-unit neighborhood ${densest.place} (${densest.localPlaces} places / ${densest.localScenes} scenes); widest nearest-neighbor gap ${sparsest.place} (${sparsest.nearestDistance} units, ${sparsest.distributionReason ? 'reviewed' : 'unreviewed'})`)
  console.log(`Regional balance: ${report.distribution.violations.regionDensityRatio.toFixed(2)}× richest-to-sparsest scenes per place among regions with at least ${report.distribution.thresholds.minRegionPlacesForDensityComparison} places (cap ${report.distribution.thresholds.maxRegionScenesPerPlaceRatio.toFixed(2)}×)`)
  console.log('')
  console.log('| Place | Region | x | y |')
  console.log('|---|---:|---:|---:|')
  for (const row of rows) console.log(`| ${row.place} | ${row.region} | ${row.x} | ${row.y} |`)
  if (report.projectionLinks.length) {
    console.log('')
    console.log('Projection links constrain chart placement but are not walked roads:')
    for (const edge of report.projectionLinks) console.log(`- ${edge.edge}: delta(${edge.dx >= 0 ? '+' : ''}${edge.dx},${edge.dy >= 0 ? '+' : ''}${edge.dy})`)
  }
}

process.exitCode = broken ? 1 : 0
