// Canonical structural vocabulary for the world.
//
// NODE_AT remains the source of authored coordinates and REGIONS remains the
// source of region membership.  This module adds the missing *meaning* of
// those coordinates: axes, route classes, barriers, sightlines and documented
// exceptions.  Both runtime features and the CI audit can therefore ask the
// same questions instead of inventing their own distance/direction rules.
import { STORY } from './content.js'
import { NODE_POS, PLACE_OF } from '../components/nodePositions.js'
import { NODE_REGION, REGIONS, isWander } from './regions.js'

export const WORLD_MODEL_VERSION = 3

// This is a mythic composite chart, not a survey map of Albania. Its axes are
// narrative: the forest is to the left, the sea-road to the right, the divine
// heights above and the world below beneath. Never turn these into N/E/S/W
// claims; real-world mirrors live in the tale records instead.
export const WORLD_AXES = Object.freeze({
  unit: 'chart-unit',
  xPositive: 'sea-roadward',
  xNegative: 'forestward',
  yPositive: 'deepward',
  yNegative: 'highward',
  screenTop: 'highward',
  screenRight: 'sea-roadward',
  verticalUpDeltaY: -1,
  geographicCardinalsSupported: false,
})

export const ROUTE_THRESHOLDS = Object.freeze({
  samePlace: 0,
  local: 48,
  short: 180,
  medium: 500,
  long: 900,
  horizon: 1150,
})

export const MOVEMENT_VERBS = new Set([
  'ec', 'shko', 'kthehu', 'ik', 'hyr', 'dil', 'kalo', 'ngjit', 'ngjitu',
  'zbrit', 'hip', 'fluturo', 'vrapo', 'not', 'lundro', 'ndiq',
])

export const INTERACTION_VERBS = new Set([
  'fol', 'degjo', 'merr', 'jep', 'prek', 'tund', 'pi', 'ha', 'beso',
  'lufto', 'ndihmo', 'pyet', 'thote', 'zgjedh', 'kendo', 'luaj', 'prit',
  'rri', 'fle', 'puth', 'hap', 'ndiz', 'bej', 'mbaj', 'lidh', 'pre',
  'hidh', 'sheh',
])

export const DIRECTION_WORDS = Object.freeze({
  left: ['majtas'],
  right: ['djathtas'],
  up: ['lart', 'ngjit', 'ngjitu', 'ngjitem', 'hip'],
  down: ['poshte', 'zbrit', 'zbres', 'zbrite'],
  north: ['veri'],
  south: ['jug'],
  east: ['lindje'],
  west: ['perendim'],
})

export const DISTANCE_WORDS = new Set(['larg', 'afer', 'gjate', 'shpejt'])

// A barrier crossing is an authored piece of geography, not merely a line
// which happens to connect two sides of a river.  `sides` deliberately names
// region identities instead of relying on a brittle x-coordinate cutoff.
export const WORLD_BARRIERS = Object.freeze([
  {
    id: 'central-river',
    label: 'the river between the forest roads and the settled village',
    sides: ['forest', 'village'],
    crossings: [
      {
        edge: ['start', 'fshatiLumi'],
        structure: 'Ura e Tabakeve bridgehead',
        reason: 'The opening prose explicitly crosses the bridge in both directions.',
      },
    ],
  },
  {
    id: 'fshaj-river',
    label: 'the dry river at the Fshaj bridge',
    sides: ['river', 'castle'],
    crossings: [
      {
        edge: ['ura', 'uraFshaj'],
        structure: 'Ura e Fshajt',
        reason: 'Both shores are joined by the named bridge scene.',
      },
      {
        edge: ['binoshetNata', 'binoshetZjarri'],
        structure: 'the river-city road bridge',
        reason: 'After recovering in the ancestral kingdom, Zjerma explicitly crosses the bridge to reach Bardhakuqja\'s river city at dawn.',
      },
      {
        edge: ['binoshetZjarri', 'binoshetTeNena'],
        structure: 'the river-city road bridge',
        reason: 'After Bardhakuqja\'s fire ordeal, the couple explicitly crosses the same bridge on the road to the twins\' mother in the ancestral kingdom.',
      },
      {
        edge: ['binoshetTeNena', 'binoshetDyKurorat'],
        structure: 'the river-city road bridge',
        reason: 'After the three-month stay, the couple explicitly recrosses the bridge to reach Bardhakuqja\'s father in the river kingdom.',
      },
    ],
  },
])

// Exceptions are records, not silent allowlists.  An exception must say what
// invariant it relaxes, why the story needs it and who should review it.
export const STRUCTURAL_EXCEPTIONS = Object.freeze([
  {
    id: 'opening-conversation-walk-to-square',
    rule: 'route-distance',
    edges: ['bisedaShesh->fshatiSheshi'],
    reason: 'The final spoken time choice commits the pair to their arranged meeting; the edge includes the walk from the bridgehead to the square, where the arrival dialogue resumes.',
    source: 'content: bisedaShesh choice and fshatiSheshi arrival lines',
    owner: 'language-curriculum',
    review: 'if the opening conversation gains a separate bridge-crossing leg',
  },
  {
    id: 'wolf-carries-sleeper-to-den',
    rule: 'interaction-distance',
    edges: ['gjumi->shokuUjk', 'gjumi->eaten'],
    reason: 'The encounter begins at the sleeping place, then the narrated scene carries the traveller to the wolf\'s deep-forest den.',
    source: 'content: gjumi outcome prose',
    owner: 'narrative',
    review: 'when the wolf encounter gains an explicit journey node',
  },
  {
    id: 'sun-stag-carries-maiden-home',
    rule: 'interaction-distance',
    edges: ['pemaDielli->rrugaDielli2'],
    reason: 'The player speaks at the tree and the stag then carries the maiden over the entire road home before the target scene opens.',
    source: 'content: pemaDielli option and rrugaDielli2 arrival',
    owner: 'narrative',
    review: 'when the flight home gains intermediate journey scenes',
  },
  {
    id: 'winds-hollow-on-sky-lip',
    rule: 'direction-language',
    edges: ['qiell1->qiellErera1'],
    reason: 'The ascent language describes the route through the sky realm; the intermediate winds hollow is drawn on the plateau lip before the route reaches the higher storm node.',
    source: 'content: qiell1 and qiellErera1 sky-route prose',
    owner: 'world-map',
    review: 'when the winds route gains an intermediate ascent coordinate',
  },
  {
    id: 'embodied-tale-projections',
    rule: 'interaction-distance',
    edges: ['pylli1->prespaPyll', 'pusi->sari1', 'sari1->pusi', 'maja->argjiroKala', 'deti1->aliPashaLiqen'],
    reason: 'These choices deliberately cross from the overworld frame into an embodied folklore projection at its geographically distinct setting.',
    source: 'tale play metadata: legjenda-e-prespes, sari-salltek and argjiro-gjirokastra',
    owner: 'lore',
    review: 'when projection entrances receive a dedicated transition treatment',
  },
])

export const tokenIds = (tokens = []) => tokens.filter((token) => token && token.id).map((token) => token.id)

export function chartDirection(dx, dy) {
  if (dx === 0 && dy === 0) return null
  // Clockwise chart angle from highward. Labels are deliberately non-cardinal.
  const degrees = (Math.atan2(dx, -dy) * 180 / Math.PI + 360) % 360
  const names = [
    'highward', 'high-seaward', 'sea-roadward', 'deep-seaward',
    'deepward', 'deep-forestward', 'forestward', 'high-forestward',
  ]
  return { degrees, label: names[Math.round(degrees / 45) % 8] }
}

export function distanceBand(distance) {
  if (distance === 0) return 'same-place'
  if (distance <= ROUTE_THRESHOLDS.local) return 'local'
  if (distance <= ROUTE_THRESHOLDS.short) return 'short'
  if (distance <= ROUTE_THRESHOLDS.medium) return 'medium'
  if (distance <= ROUTE_THRESHOLDS.long) return 'long'
  return 'expedition'
}

export function durationForDistance(distance, option = {}) {
  // A target phase is a wait *after* travel, not a substitute for travel. Keep
  // both facts in one record so “reach it at night” cannot collapse a four-hour
  // road to the default one-hour action. Explicit durations remain authoritative.
  const timing = {
    targetPhase: option.time || null,
    targetHour: Number.isInteger(option.atHour) && option.atHour >= 0 && option.atHour <= 23
      ? option.atHour
      : null,
  }
  if (Number.isSafeInteger(option.durationHours) && option.durationHours >= 0) {
    return { kind: 'hours', hours: option.durationHours, ...timing }
  }
  // Every ordinary action advances the current game clock by one hour.
  const hours = distance <= ROUTE_THRESHOLDS.local ? 1
    : distance <= ROUTE_THRESHOLDS.short ? 1
      : distance <= ROUTE_THRESHOLDS.medium ? 2
        : distance <= ROUTE_THRESHOLDS.long ? 4
          : 8
  return { kind: 'hours', hours, ...timing }
}

const signed = (value) => `${value >= 0 ? '+' : ''}${value}`

/**
 * Exact, cardinal-free vector prose. Distance bands are useful orientation,
 * but only the two signed chart deltas let another person reproduce the same
 * layout. `code` is deliberately stable for audits/exporters; `label` is the
 * plain-language version shown beside a choice.
 */
export function chartVector(dx, dy) {
  const horizontal = dx === 0
    ? '0 on the forest/sea-road axis'
    : `${Math.abs(dx)} ${dx > 0 ? WORLD_AXES.xPositive : WORLD_AXES.xNegative}`
  const vertical = dy === 0
    ? '0 on the height/depth axis'
    : `${Math.abs(dy)} ${dy > 0 ? WORLD_AXES.yPositive : WORLD_AXES.yNegative}`
  return Object.freeze({
    dx,
    dy,
    code: `delta(${signed(dx)},${signed(dy)})`,
    label: `${horizontal}, ${vertical}`,
  })
}

export function routeForChoice(from, option) {
  const to = option?.to
  const ids = tokenIds(option?.text)
  const verb = ids[0] || null
  const start = NODE_POS[from]
  const finish = NODE_POS[to]
  if (!to || !STORY[to]) {
    return { from, to, valid: false, kind: 'invalid', reason: 'choice has no real story destination', tokenIds: ids }
  }
  if (!start || !finish) {
    return { from, to, valid: false, kind: 'unplaced', reason: 'one or both story nodes have no coordinate', tokenIds: ids }
  }
  const dx = finish[0] - start[0]
  const dy = finish[1] - start[1]
  const distance = Math.hypot(dx, dy)
  const samePlace = PLACE_OF[from] === PLACE_OF[to]
  const movementVerb = MOVEMENT_VERBS.has(verb)
  const interactionVerb = INTERACTION_VERBS.has(verb)
  const edge = `${from}->${to}`
  const projection = exceptionFor('interaction-distance', edge)?.id === 'embodied-tale-projections'
  // Physical identity comes from PLACE_OF, never from a distance threshold.
  // Two nearby coordinates remain two places; otherwise a player following
  // the prose would quietly lose sixteen shops, banks, thresholds and paths.
  const kind = samePlace
    ? 'local'
    : projection
      ? 'projection'
      : movementVerb
        ? 'journey'
        : 'scene-shift'
  const vector = chartVector(dx, dy)
  return {
    from,
    to,
    valid: true,
    kind,
    reason: samePlace
      ? `both scenes share the authored place '${PLACE_OF[from]}'`
      : projection
        ? 'an embodied tale threshold changes setting; its chart placement is shown but the vector is not a walked road'
        : movementVerb
          ? `option begins with movement verb '${verb}'`
          : interactionVerb
            ? `the interaction is followed by a narrated transition`
            : 'story transition between distinct mapped places',
    tokenIds: ids,
    verb,
    movementVerb,
    interactionVerb,
    projection,
    spatial: !projection,
    wander: isWander(option),
    samePlace,
    fromPlace: PLACE_OF[from],
    toPlace: PLACE_OF[to],
    fromRegion: NODE_REGION[from] || 'village',
    toRegion: NODE_REGION[to] || 'village',
    dx,
    dy,
    distance,
    distanceBand: distanceBand(distance),
    direction: chartDirection(dx, dy),
    vector,
    // A projection's delta locates its tale setting; it is explicitly not
    // mileage walked by the player and must not consume an expedition day.
    duration: durationForDistance(projection ? 0 : distance, option),
  }
}

/**
 * Stable runtime summary for StoryView/gameState. Accepts the current node id
 * and an ordinary STORY option; it does not import game state and cannot form
 * a reducer cycle.
 */
export function transitionInfo(from, option) {
  const route = routeForChoice(from, option)
  return {
    valid: route.valid,
    kind: route.kind,
    direction: route.direction?.label || 'here',
    distanceBand: route.distanceBand || 'unknown',
    fromPlace: route.fromPlace || null,
    toPlace: route.toPlace || null,
    dx: Number.isFinite(route.dx) ? route.dx : null,
    dy: Number.isFinite(route.dy) ? route.dy : null,
    vectorCode: route.vector?.code || null,
    vectorLabel: route.vector?.label || null,
    projection: Boolean(route.projection),
    spatial: route.spatial !== false,
    hours: route.duration?.kind === 'hours' ? route.duration.hours : null,
    targetPhase: route.duration?.targetPhase || null,
    targetHour: route.duration?.targetHour ?? null,
    label: route.valid
      ? route.samePlace
        ? `here at ${route.fromPlace}`
        : `${route.projection ? 'tale projection' : route.kind === 'scene-shift' ? 'narrated shift' : route.distanceBand}, ${route.direction?.label || 'unoriented'}; ${route.vector.label}`
      : route.reason,
  }
}

export function buildRouteGraph(story = STORY) {
  const routes = []
  for (const [from, node] of Object.entries(story)) {
    for (const option of node.options || []) {
      if (option.confuser) continue
      routes.push(routeForChoice(from, option))
    }
  }
  return routes
}

/**
 * Rebuild the canonical place chart using only the exact vectors attached to
 * playable choices. The recovered chart is normalized to [0,0] at each
 * component root, because relative descriptions cannot determine a global
 * page offset. A projection edge is still a chart-placement constraint, but
 * remains marked non-spatial so nobody mistakes it for a road.
 */
export function reconstructChart(routes = buildRouteGraph()) {
  const places = [...new Set(Object.keys(STORY).map((id) => PLACE_OF[id]).filter(Boolean))].sort()
  const adjacency = new Map(places.map((place) => [place, []]))
  const constraints = []
  for (const route of routes) {
    if (!route.valid || route.samePlace) continue
    const constraint = {
      edge: `${route.from}->${route.to}`,
      from: route.fromPlace,
      to: route.toPlace,
      dx: route.dx,
      dy: route.dy,
      kind: route.kind,
      spatial: route.spatial,
    }
    constraints.push(constraint)
    adjacency.get(constraint.from)?.push(constraint)
    adjacency.get(constraint.to)?.push({
      ...constraint,
      from: constraint.to,
      to: constraint.from,
      dx: -constraint.dx,
      dy: -constraint.dy,
      reverseOf: constraint.edge,
    })
  }

  const roots = []
  const recovered = {}
  const conflicts = []
  const canonicalMismatches = []
  const preferredRoot = PLACE_OF.start
  const orderedPlaces = preferredRoot
    ? [preferredRoot, ...places.filter((place) => place !== preferredRoot)]
    : places
  for (const root of orderedPlaces) {
    if (recovered[root]) continue
    roots.push(root)
    recovered[root] = [0, 0]
    const queue = [root]
    for (let head = 0; head < queue.length; head++) {
      const from = queue[head]
      const at = recovered[from]
      for (const edge of adjacency.get(from) || []) {
        const expected = [at[0] + edge.dx, at[1] + edge.dy]
        if (!recovered[edge.to]) {
          recovered[edge.to] = expected
          queue.push(edge.to)
        } else if (recovered[edge.to][0] !== expected[0] || recovered[edge.to][1] !== expected[1]) {
          conflicts.push({ edge: edge.edge, place: edge.to, recovered: recovered[edge.to], expected })
        }
      }
    }
    const rootCanonical = NODE_POS[root]
    for (const place of queue) {
      const expected = [NODE_POS[place][0] - rootCanonical[0], NODE_POS[place][1] - rootCanonical[1]]
      if (recovered[place][0] !== expected[0] || recovered[place][1] !== expected[1]) {
        canonicalMismatches.push({ place, recovered: recovered[place], expected, root })
      }
    }
  }

  return {
    roots,
    places,
    constraints,
    recovered,
    conflicts,
    canonicalMismatches,
  }
}

export function exceptionFor(rule, edge) {
  return STRUCTURAL_EXCEPTIONS.find((entry) => entry.rule === rule && entry.edges.includes(edge)) || null
}

export function crossingFor(from, to) {
  const regions = new Set([NODE_REGION[from] || 'village', NODE_REGION[to] || 'village'])
  for (const barrier of WORLD_BARRIERS) {
    if (!barrier.sides.every((side) => regions.has(side))) continue
    const crossing = barrier.crossings.find(({ edge }) =>
      (edge[0] === from && edge[1] === to) || (edge[0] === to && edge[1] === from))
    return { barrier, crossing: crossing || null }
  }
  return null
}

// `humbur` is a shared, liminal darkness reached by failures in several
// regions. It deliberately keeps the forest branch's region identity for
// progression, but its map point is a sealed fate-space: it has no surface
// weather or horizon. Ordinary caves use their surrounding macro-region unless
// they descend into the explicitly underworld-assigned core.
const ENCLOSED_SCENES = new Set(['humbur'])
export const isEnclosedScene = (nodeId) =>
  NODE_REGION[nodeId] === 'underworld' || ENCLOSED_SCENES.has(nodeId)

function horizonAt(nodeId, environment = {}) {
  const env = environment.environment || environment.world || environment
  const phase = env.phase || environment.phase || 'day'
  const weather = env.weather || environment.weather || 'clear'
  const season = env.season || environment.season || 'spring'
  const originRegion = NODE_REGION[nodeId] || env.region || environment.region || 'village'
  const weatherRange = weather === 'storm' ? 380
    : weather === 'rain' || weather === 'snow' ? 650
      : weather === 'cloud' ? 900
        : ROUTE_THRESHOLDS.horizon
  const terrainRange = isEnclosedScene(nodeId) ? 0
    : originRegion === 'forest' ? Math.min(weatherRange, 900)
      : originRegion === 'mountain' || originRegion === 'sky' ? weatherRange * 1.18
        : originRegion === 'sea' ? weatherRange * 1.1
          : weatherRange
  // Season changes an actual obstruction only where the model can justify it:
  // the deciduous forest canopy. Bare winter branches open longer views; full
  // summer leaf closes them. Other terrain already varies through the regional
  // weather roll, so avoid inventing a universal seasonal visibility rule.
  const seasonRangeScale = originRegion === 'forest'
    ? season === 'winter' ? 1.25 : season === 'summer' ? 0.85 : 1
    : 1
  const phaseRange = phase === 'night' ? terrainRange * 0.72
    : phase === 'dusk' || phase === 'dawn' ? terrainRange * 0.9
      : terrainRange
  const range = phaseRange * seasonRangeScale
  return { env, phase, weather, season, originRegion, seasonRangeScale, range }
}

// A runtime-ready sightline model.  It intentionally returns the hidden
// landmarks too, with reasons, so prose and map rendering can make the same
// decision and tests can explain disagreements.
export function sightlinesFrom(nodeId, environment = {}) {
  const origin = NODE_POS[nodeId]
  if (!origin) return []
  const { phase, weather, season, range } = horizonAt(nodeId, environment)
  return REGIONS
    .filter((region) => region.label)
    .map((region) => {
      const dx = region.cx - origin[0]
      const dy = region.cy - origin[1]
      const distance = Math.hypot(dx, dy)
      const here = NODE_REGION[nodeId] === region.key
      // The vertical tale-chart locates the world below but does not turn the
      // ground into glass. Surface places can never report the underworld as a
      // horizon landmark merely because its chart centre is numerically near;
      // only a scene already inside that sealed realm can name it as "here".
      const sealedRealm = region.key === 'underworld' && !here
      const visible = here || (!sealedRealm && distance <= range)
      return {
        key: region.key,
        label: region.label,
        visible,
        reason: here
          ? 'current region'
          : sealedRealm
            ? 'sealed below the surface, not on the horizon'
            : visible
              ? `within the ${weather}/${phase}/${season} horizon`
              : `beyond the ${weather}/${phase}/${season} horizon`,
        distance,
        direction: chartDirection(dx, dy),
        phase,
        weather,
        season,
      }
    })
}

const LUMINOUS_WORDS = new Set(['drite', 'diell', 'hene', 'yll', 'zjarr', 'kuq', 'ar', 'arte'])

// `larg` is polysemous in the story: it also means "away for nine years",
// "leave", "work abroad", or simply intensifies a journey. Weather must never
// erase those facts. Only these attributable visual observations are horizon
// claims. Required token sets identify a line without coupling the model to
// its exact punctuation or inflection.
export const DISTANT_SIGHTLINES = Object.freeze([
  { id: 'bridge-village-light', node: 'start', target: 'fshatiLumi', requires: ['larg', 'fshat', 'drite', 'vogel'], luminous: true },
  { id: 'river-distant-stone-speaker', node: 'lumi', target: 'fshehur', requires: ['larg', 'plak', 'gur', 'ar'] },
  { id: 'river-still-lake', node: 'lumi', target: 'flocka1', requires: ['larg', 'liqen'] },
  { id: 'waystone-distant-sea', node: 'lamtumira', target: 'deti1', requires: ['larg', 'poshte', 'sheh', 'det'] },
  { id: 'waystone-sunlit-sea', node: 'guriUdhes', target: 'deti1', requires: ['dite', 'det', 'larg', 'drite', 'diell'], luminous: true },
  { id: 'forest-sacred-summit', node: 'pylliLoop', target: 'maja', requires: ['larg', 'maja', 'shenjte'], rangeScale: 1.8 },
  { id: 'forest-fire-cave', node: 'pylliLoop', target: 'stihi1', requires: ['larg', 'shpelle', 'zjarr'], luminous: true },
  { id: 'forest-three-brothers', node: 'pylliLoop', target: 'pylli1', requires: ['larg', 'tre', 'vella'] },
  { id: 'summit-jutbina-tower', node: 'maja', target: 'jutbina', requires: ['larg', 'kulle', 'jutbina'] },
  { id: 'summit-other-mountain', node: 'maja', target: 'shpirag1', requires: ['larg', 'mal', 'tjeter'] },
  { id: 'summit-distant-castle', node: 'maja', target: 'argjiroKala', requires: ['larg', 'kala'], rangeScale: 1.8 },
  { id: 'mountain-lost-crossroads', node: 'maliHumbur', target: 'udhekryq', requires: ['larg', 'poshte', 'udhekryq'] },
  { id: 'river-lost-crossroads', node: 'lumiHumbur', target: 'udhekryq', requires: ['larg', 'udhekryq'] },
  { id: 'moat-road-palace', node: 'kordhaUdha', target: 'kordhaPallat', requires: ['larg', 'pallat', 'bukura'] },
  { id: 'market-sea', node: 'tregDet', target: 'deti1', requires: ['larg', 'det'] },
  { id: 'crossroads-village', node: 'udhekryq', target: 'fshatiSheshi', requires: ['larg', 'fshat'] },
  { id: 'sky-cloud-summit', node: 'qiellDem1', target: 'maja', requires: ['larg', 'lart', 're', 'maja'] },
])

export function distantSightlineFor(nodeId, tokens) {
  const ids = Array.isArray(tokens) && tokens.every((token) => typeof token === 'string')
    ? tokens
    : tokenIds(tokens)
  return DISTANT_SIGHTLINES.find((entry) => entry.node === nodeId && entry.requires.every((id) => ids.includes(id))) || null
}

/**
 * Visibility gate for existing description lines. Only registered visual
 * observations react to the horizon; non-visual uses of `larg` remain facts.
 * Clear daylight is broad, storms close every authored far view, and clear
 * night preserves only a far light, moon, star, fire or luminous detail.
 */
export function isDistantLineVisible(nodeId, tokens, environment = {}) {
  const ids = Array.isArray(tokens) && tokens.every((token) => typeof token === 'string')
    ? tokens
    : tokenIds(tokens)
  if (!ids.includes('larg')) return true
  const sightline = distantSightlineFor(nodeId, ids)
  // Non-visual uses of "far" are time, action or reported fact, not weather.
  if (!sightline) return true
  const origin = NODE_POS[nodeId]
  const target = NODE_POS[sightline.target]
  if (!origin || !target) return false
  const { phase, weather, range } = horizonAt(nodeId, environment)
  const luminous = sightline.luminous || ids.some((id) => LUMINOUS_WORDS.has(id))
  if (weather === 'storm' || weather === 'snow') return false
  if (phase === 'night' && !luminous) return false
  const distance = Math.hypot(target[0] - origin[0], target[1] - origin[1])
  return distance <= range * (sightline.rangeScale || 1)
}
