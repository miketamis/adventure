import { STORY } from './content.js'
import { PROJECTION_BOUNDARY_EDGES } from './worldProjectionBoundaries.js'

// Every structural exception is an exact, reviewable record. `targetKind`
// prevents a node id from silently sanctioning an edge (or vice versa), while
// the record-local exact-target ceiling makes scope growth an explicit edit.
export const STRUCTURAL_EXCEPTION_RULES = Object.freeze({
  'region-containment': Object.freeze({ targetKind: 'node' }),
  'coastline-placement': Object.freeze({ targetKind: 'node' }),
  'direction-language': Object.freeze({ targetKind: 'edge' }),
  'interaction-distance': Object.freeze({ targetKind: 'edge' }),
  'projection-boundary': Object.freeze({ targetKind: 'edge' }),
  'stranded-node': Object.freeze({ targetKind: 'node' }),
  'route-distance': Object.freeze({ targetKind: 'edge' }),
  'named-destination': Object.freeze({ targetKind: 'edge' }),
  'realm-crossing': Object.freeze({ targetKind: 'edge' }),
  'duplicate-route': Object.freeze({ targetKind: 'node' }),
  'stated-place': Object.freeze({ targetKind: 'node' }),
  'same-place-return': Object.freeze({ targetKind: 'edge' }),
})

const reviewedStructuralException = ({ targets, maximumTargets, ...record }) => Object.freeze({
  ...record,
  targets: Object.freeze([...targets]),
  scope: Object.freeze({ kind: 'exact-targets', maximumTargets }),
})

// Keep groups narratively cohesive: one rationale must explain every exact
// target in its record. Unrelated exceptions receive independent review ids.
export const STRUCTURAL_EXCEPTIONS = Object.freeze([
  reviewedStructuralException({
    id: 'opening-bridgehead-forest-fringe',
    rule: 'region-containment',
    targets: ['start'],
    maximumTargets: 1,
    rationale: 'The opening stands at the city bridgehead on the forest-facing bank, so its forest assignment legitimately sits just outside the broad forest ellipse.',
    source: 'content: start bridge prose; nodePositions: start',
    owner: 'world-map',
    reviewTrigger: 'when the opening bridgehead coordinate or its region anchor changes',
  }),
  reviewedStructuralException({
    id: 'sun-stag-return-region-fringe',
    rule: 'region-containment',
    targets: ['rrugaDielli2'],
    maximumTargets: 1,
    rationale: 'The sun-tale return is assigned to the sky quest for story ownership, while its final carried landing is deliberately drawn beside the village.',
    source: 'content: rrugaDielli2 arrival; nodePositions: rrugaDielli2',
    owner: 'world-map',
    reviewTrigger: 'when the sun-tale return is split into separate flight and landing scenes',
  }),
  reviewedStructuralException({
    id: 'baloz-shore-victory-fringe',
    rule: 'region-containment',
    targets: ['balozFitore'],
    maximumTargets: 1,
    rationale: 'Gjergj Elez Alia’s victory remains part of the sea tale but is staged on the Drin shore just beyond the coarse sea-region ellipse.',
    source: 'content: balozFitore shore outcome; nodePositions: balozFitore',
    owner: 'world-map',
    reviewTrigger: 'when the Baloz victory coordinate or sea-region boundary changes',
  }),
  reviewedStructuralException({
    id: 'home-hearth-castle-route-assignment',
    rule: 'region-containment',
    targets: ['shtepia'],
    maximumTargets: 1,
    rationale: 'The homecoming is drawn at the village hearth, while its castle-region assignment preserves the incoming castle-road graph and must not pull that road into the village region.',
    source: 'content: shtepia homecoming; regions: castle return chain',
    owner: 'world-map',
    reviewTrigger: 'when the homecoming gains an independently anchored village return route',
  }),
  reviewedStructuralException({
    id: 'snake-husband-beyond-sea-assignment',
    rule: 'region-containment',
    targets: ['gjarperKulshedra', 'gjarperKulVdes', 'gjarperBurrFund'],
    maximumTargets: 3,
    rationale: 'These consecutive snake-husband scenes occur beyond the sea, but retain the underworld tale assignment needed by the story that introduces the search.',
    source: 'content: gjarperKulshedra through gjarperBurrFund; regions: underworld tale chain',
    owner: 'world-map',
    reviewTrigger: 'when the beyond-sea snake-husband sequence receives its own region anchor',
  }),
  reviewedStructuralException({
    id: 'snake-husband-beyond-drawn-coast',
    rule: 'coastline-placement',
    targets: ['gjarperKulshedra', 'gjarperKulVdes', 'gjarperBurrFund'],
    maximumTargets: 3,
    rationale: 'The sequence explicitly takes place beyond the sea, so its underworld-assigned nodes are intentionally drawn east of the ordinary land coastline.',
    source: 'content: gjarperKulshedra through gjarperBurrFund; WorldMapView coastline',
    owner: 'world-map',
    reviewTrigger: 'when the sequence gains a sea assignment or the drawn coastline changes',
  }),
  reviewedStructuralException({
    id: 'winds-hollow-on-sky-lip',
    rule: 'direction-language',
    targets: ['qiell1->qiellErera1'],
    maximumTargets: 1,
    rationale: 'The ascent language describes the full route toward the storm, while the intermediate winds hollow is drawn on the sky plateau’s lower lip.',
    source: 'content: qiell1 option and qiellErera1 sky-route prose',
    owner: 'world-map',
    reviewTrigger: 'when the winds route gains an intermediate ascent coordinate',
  }),
  reviewedStructuralException({
    id: 'projection-entrance-interactions',
    rule: 'interaction-distance',
    targets: ['pylli1->prespaPyll', 'maja->argjiroKala', 'deti1->aliPashaLiqen'],
    maximumTargets: 3,
    rationale: 'These local-looking perception or conversation actions deliberately cross into an embodied tale setting instead of pretending the distant chart vector is a walk. Sari Salltëk is excluded because its departure is now an explicit follow action.',
    source: 'tale play metadata: Prespa, Argjiro and Ali Pasha projections',
    owner: 'lore',
    reviewTrigger: 'when any projection entrance gains an explicit physical travel action',
  }),
  reviewedStructuralException({
    id: 'embodied-tale-projection-boundaries',
    rule: 'projection-boundary',
    targets: PROJECTION_BOUNDARY_EDGES,
    maximumTargets: 5,
    rationale: 'These exact edges cross between the living world and embodied folklore settings, so their vectors locate scenes without claiming physical travel mileage.',
    source: 'tale play metadata: Prespa, Sari Salltëk, Argjiro and Ali Pasha projections',
    owner: 'lore',
    reviewTrigger: 'when a projection entrance, exit or setting is replaced by an ordinary world route',
  }),
  reviewedStructuralException({
    id: 'gjizar-rescue-return-compression',
    rule: 'stranded-node',
    targets: ['gjizarFund'],
    maximumTargets: 1,
    rationale: 'The ending resumes in the king’s mosque courtyard after the Beauty’s narrated rescue and return, compressing the intervening homeward journey.',
    source: 'content: gjizarTradheti and gjizarFund ending prose',
    owner: 'narrative',
    reviewTrigger: 'when the rescue return is expanded into playable journey scenes',
  }),
  reviewedStructuralException({
    id: 'tomorr-trial-to-well-routes',
    rule: 'route-distance',
    targets: ['tomorZbritje->pusi', 'rrethi->pusi'],
    maximumTargets: 2,
    rationale: 'Both exact edges descend from the Tomorr trial country to the distant well named by the Zana, and their options narrate that long descent.',
    source: 'content: tomorZbritje and rrethi well choices; nodePositions: pusi route vectors',
    owner: 'world-map',
    reviewTrigger: 'when the Tomorr-to-well descent receives an intermediate road scene',
  }),
  reviewedStructuralException({
    id: 'stone-wedding-mountainside-climb',
    rule: 'route-distance',
    targets: ['rrethi->dhia1'],
    maximumTargets: 1,
    rationale: 'The option explicitly climbs from the lower mountain ring to the distant stone wedding high on the mountainside.',
    source: 'content: rrethi stone-wedding choice and dhia1 arrival; nodePositions: exact vector',
    owner: 'world-map',
    reviewTrigger: 'when the stone-wedding climb receives an intermediate mountain scene',
  }),
  reviewedStructuralException({
    id: 'coast-road-homeward-leg',
    rule: 'route-distance',
    targets: ['ktheu3->udhaKthimit'],
    maximumTargets: 1,
    rationale: 'The coast-road vista begins the explicitly narrated long inland return toward the village rather than an instantaneous scene change.',
    source: 'content: ktheu3 homeward choice and udhaKthimit arrival; nodePositions: exact vector',
    owner: 'world-map',
    reviewTrigger: 'when the coast-to-inland return gains an intermediate travel scene',
  }),
  reviewedStructuralException({
    id: 'tomorr-to-sky-ascent-road',
    rule: 'route-distance',
    targets: ['mali1->qiell1', 'qiell1->mali1'],
    maximumTargets: 2,
    rationale: 'The reciprocal edges explicitly climb from Tomorr into the sky realm and return down the same extraordinary route.',
    source: 'content: mali1 and qiell1 ascent/descent choices; nodePositions: reciprocal vectors',
    owner: 'world-map',
    reviewTrigger: 'when the mountain-to-sky threshold gains a separate transition scene',
  }),
  reviewedStructuralException({
    id: 'river-network-long-roads',
    rule: 'route-distance',
    targets: ['lumi->deti1', 'udhekryq->lumi', 'lumi->flocka1', 'flocka1->lumi'],
    maximumTargets: 4,
    rationale: 'These exact roads follow the river between the crossroads, distant sea and lake, with each choice naming the long journey; the lake branch includes its explicit reciprocal walk back to the river.',
    source: 'content: lumi, flocka1 and udhekryq travel choices and arrival prose; nodePositions: river-network vectors',
    owner: 'world-map',
    reviewTrigger: 'when the river, sea or lake road receives an intermediate place',
  }),
  reviewedStructuralException({
    id: 'dead-city-cavern-passages',
    rule: 'route-distance',
    targets: ['shpellaRruget->qyteti'],
    maximumTargets: 1,
    rationale: 'The selected middle road traverses the tale’s explicitly miles-long cavern passage before reaching the dead city.',
    source: 'content: shpellaRruget choice plus qyteti arrival; nodePositions: exact vector',
    owner: 'world-map',
    reviewTrigger: 'when the long cavern receives an intermediate underground scene',
  }),
  reviewedStructuralException({
    id: 'village-crossroads-mountain-roads',
    rule: 'route-distance',
    targets: ['fshatiCaul->mali1', 'mali1->udhekryq', 'udhekryq->mali1'],
    maximumTargets: 3,
    rationale: 'These exact edges are the authored approach and reciprocal road between the village crossroads and the mountain.',
    source: 'content: fshatiCaul, mali1 and udhekryq travel choices; nodePositions: exact vectors',
    owner: 'world-map',
    reviewTrigger: 'when the village-crossroads-mountain road topology changes',
  }),
  reviewedStructuralException({
    id: 'sun-stag-homeward-flight',
    rule: 'route-distance',
    targets: ['pemaDielli->rrugaDielli2', 'rrugaDielli2->fshatiLanes'],
    maximumTargets: 2,
    rationale: 'The stag carries the maiden from the sun tree over the long road home and then completes the run into the village lanes.',
    source: 'content: pemaDielli and rrugaDielli2 carried-return prose; nodePositions: exact vectors',
    owner: 'narrative',
    reviewTrigger: 'when the stag’s carried return gains an intermediate playable stop',
  }),
  reviewedStructuralException({
    id: 'snake-husband-beyond-sea-search',
    rule: 'route-distance',
    targets: ['gjarperKerkim->gjarperKulshedra'],
    maximumTargets: 1,
    rationale: 'The wife’s search explicitly continues beyond the sea before she reaches the distant Kulshedra encounter.',
    source: 'content: gjarperKerkim search choice and gjarperKulshedra arrival; nodePositions: exact vector',
    owner: 'narrative',
    reviewTrigger: 'when the beyond-sea search gains a separate voyage scene',
  }),
  reviewedStructuralException({
    id: 'eagle-tree-walk-home',
    rule: 'route-distance',
    targets: ['shqipe1->udhekryq'],
    maximumTargets: 1,
    rationale: 'The option explicitly sends the traveller far from the eagle’s tree to the crossroads, and the destination confirms that arrival.',
    source: 'content: shqipe1 far-crossroads choice and udhekryq arrival; nodePositions: exact vector',
    owner: 'narrative',
    reviewTrigger: 'when the eagle-tree return gains an intermediate road scene or a different destination',
  }),
  reviewedStructuralException({
    id: 'restored-spring-well-road',
    rule: 'route-distance',
    targets: ['springReturn->pusi2'],
    maximumTargets: 1,
    rationale: 'After the spring returns in the lower realm, the solo exit explicitly climbs the long path to the bottom of the distant well; the destination confirms the completed climb.',
    source: 'content: springReturn solo climb and pusi2 predecessor-specific arrival; nodePositions: exact vector',
    owner: 'narrative',
    reviewTrigger: 'when the restored-spring route gains an intermediate underworld path scene',
  }),
  reviewedStructuralException({
    id: 'well-shaft-ascent-distance',
    rule: 'route-distance',
    targets: ['kthimi->pusi2'],
    maximumTargets: 1,
    rationale: 'The long chart vector is the explicit climb from the world below through the well shaft to the surface.',
    source: 'content: kthimi climb and pusi2 emergence; nodePositions: exact shaft vector',
    owner: 'world-map',
    reviewTrigger: 'when the well ascent receives intermediate shaft coordinates',
  }),
  reviewedStructuralException({
    id: 'sky-realm-extraordinary-passages',
    rule: 'route-distance',
    targets: ['qiell2->qiellPrende', 'qiellErera2->qiell2'],
    maximumTargets: 2,
    rationale: 'These exact sky passages are the fall from the storm peak and the winds carrying the player upward with closed eyes. Seeking the Moon is now a local encounter rather than an invented long crossing.',
    source: 'content: qiell2 and qiellErera2 transition prose; nodePositions: exact vectors',
    owner: 'world-map',
    reviewTrigger: 'when any extraordinary sky passage gains an intermediate scene',
  }),
  reviewedStructuralException({
    id: 'underworld-surface-to-shore-walk',
    rule: 'route-distance',
    targets: ['siperfaqja->bregu'],
    maximumTargets: 1,
    rationale: 'After surfacing from the world below, the traveller explicitly walks the long remaining distance down to the shore.',
    source: 'content: siperfaqja shore choice and bregu arrival; nodePositions: exact vector',
    owner: 'world-map',
    reviewTrigger: 'when the surfaced route to the shore gains an intermediate scene',
  }),
  reviewedStructuralException({
    id: 'tomorr-authored-descents',
    rule: 'route-distance',
    targets: ['tomor3->tomorZbritje', 'tomorBekim->tomorZbritje'],
    maximumTargets: 2,
    rationale: 'Both choices begin the same explicitly narrated descent of Tomorr, either after hearing the warning or declining it.',
    source: 'content: tomor3 and tomorBekim descent choices plus tomorZbritje arrival',
    owner: 'narrative',
    reviewTrigger: 'when the Tomorr descent changes destination or gains an intermediate stop',
  }),
  reviewedStructuralException({
    id: 'bridgehead-glade-forest-road',
    rule: 'route-distance',
    targets: ['start->lendina', 'lendina->start'],
    maximumTargets: 2,
    rationale: 'The reciprocal choices walk the full forest road between the opening bridgehead and the distant glade.',
    source: 'content: start and lendina forest-road choices; nodePositions: reciprocal vectors',
    owner: 'world-map',
    reviewTrigger: 'when the bridgehead-to-glade road gains an intermediate forest node',
  }),
  reviewedStructuralException({
    id: 'sea-surface-deep-dive',
    rule: 'route-distance',
    targets: ['deti1->detiThelle1', 'detiThelle1->deti1'],
    maximumTargets: 2,
    rationale: 'The reciprocal edges are an explicit deep dive from the sea surface and the equally long swim back upward.',
    source: 'content: deti1 and detiThelle1 dive/swim choices; nodePositions: reciprocal vectors',
    owner: 'world-map',
    reviewTrigger: 'when the sea dive receives intermediate depth scenes',
  }),
  reviewedStructuralException({
    id: 'summit-to-kreshnik-destinations',
    rule: 'route-distance',
    targets: ['maja->jutbina', 'maja->kalaMjegull'],
    maximumTargets: 2,
    rationale: 'Both edges leave the bare summit for a distant Kreshnik destination: the Jutbina hamlet or the castle far below.',
    source: 'content: maja destination choices and arrivals; nodePositions: exact vectors',
    owner: 'world-map',
    reviewTrigger: 'when either summit route receives an intermediate mountain scene',
  }),
  reviewedStructuralException({
    id: 'gjizar-underworld-and-return-roads',
    rule: 'route-distance',
    targets: ['gjizar2->gjizarUdha', 'gjizarTradheti->gjizarFund'],
    maximumTargets: 2,
    rationale: 'The first edge takes the explicitly far road into the world below; the second compresses the Beauty’s narrated rescue and return to the king’s town.',
    source: 'content: gjizar2, gjizarUdha, gjizarTradheti and gjizarFund prose; nodePositions: exact vectors',
    owner: 'narrative',
    reviewTrigger: 'when either Gjizar long passage gains an intermediate playable scene',
  }),
  reviewedStructuralException({
    id: 'binoshet-epic-long-marches',
    rule: 'route-distance',
    targets: [
      'binoshetFund->binoshetKasollja', 'binoshetKasollja->binoshetKopshtiZanave',
      'binoshetKuvendi->binoshetLuftaFillon', 'binoshetNata->binoshetZjarri',
      'binoshetZjarri->binoshetTeNena', 'binoshetTeNena->binoshetDyKurorat',
    ],
    maximumTargets: 6,
    rationale: 'These exact epic edges narrate long trail retracing, forest ascent, army march and the company’s three inter-kingdom journeys.',
    source: 'content: Binoshet journey choices and arrivals; nodePositions: exact epic route vectors',
    owner: 'narrative',
    reviewTrigger: 'when the Binoshet travel sequence or any listed kingdom coordinate changes',
  }),
  reviewedStructuralException({
    id: 'projection-entrance-route-distances',
    rule: 'route-distance',
    targets: ['pylli1->prespaPyll', 'pusi->sari1', 'maja->argjiroKala', 'deti1->aliPashaLiqen'],
    maximumTargets: 4,
    rationale: 'These chart-length vectors cross into embodied folklore projections and locate their settings without representing ordinary walked distance.',
    source: 'tale play metadata: Prespa, Sari Salltëk, Argjiro and Ali Pasha projections',
    owner: 'lore',
    reviewTrigger: 'when a projection entrance becomes an ordinary physical route',
  }),
  reviewedStructuralException({
    id: 'maro-reviewed-long-journeys',
    rule: 'route-distance',
    targets: [
      'maroLajmi->maroTetua', 'maroTetua->maroLajmi', 'maroTetua->maroHani',
      'maroKrushqit->maroPallati',
    ],
    maximumTargets: 4,
    rationale: 'These exact Maro edges are narrated cross-village walks, a coach ride or bridal travel rather than instantaneous local transitions.',
    source: 'content: Maro journey choices and arrivals; nodePositions: Maro route vectors',
    owner: 'narrative',
    reviewTrigger: 'when the Maro journey chain or any of its physical coordinates changes',
  }),
  reviewedStructuralException({
    id: 'riddle-wrong-answers-share-setback',
    rule: 'duplicate-route',
    targets: ['riddle1'],
    maximumTargets: 1,
    rationale: 'The two distinct wrong riddle answers intentionally share the same gated setback destination and consequence without pretending to be different routes.',
    source: 'content: riddle1 wrong-answer options',
    owner: 'narrative',
    reviewTrigger: 'when either wrong answer receives a distinct consequence or destination',
  }),
  reviewedStructuralException({
    id: 'village-river-quarter-stated-place',
    rule: 'stated-place',
    targets: ['fshatiLumi'],
    maximumTargets: 1,
    rationale: 'The river quarter visibly stands on the river through town, while the broad downstream river ellipse deliberately does not cover the village bank.',
    source: 'content: fshatiLumi place prose; map: village river and downstream region ellipse',
    owner: 'world-map',
    reviewTrigger: 'when the village river quarter or downstream river ellipse is redrawn',
  }),
  reviewedStructuralException({
    id: 'coffee-house-threshold-returns',
    rule: 'same-place-return',
    targets: ['kafeneja->fshatiSheshi'],
    maximumTargets: 1,
    rationale: 'This return label crosses from the coffee-house interior onto the square even though both scenes intentionally share one compact map place. The nested father conversation now exits locally to the coffee-house first.',
    source: 'content: kafeneja square exit and kafeneja2 local conversation exit; place model: shared square anchor',
    owner: 'narrative',
    reviewTrigger: 'when the coffee-house interior receives a distinct physical place anchor',
  }),
  reviewedStructuralException({
    id: 'ballad-return-and-strike-wording',
    rule: 'same-place-return',
    targets: ['aliBajr1->aliBajrFund'],
    maximumTargets: 1,
    rationale: 'The ballad wording means return and strike the king inside one narrated beat; it is not claiming travel to a place the player had left.',
    source: 'content: aliBajr1 option and aliBajrFund consequence',
    owner: 'lore',
    reviewTrigger: 'when the return-and-strike beat is split into separate actions',
  }),
])

export const structuralExceptionKey = (rule, target) => `${rule}\u0000${target}`

export function exceptionFor(rule, target) {
  return STRUCTURAL_EXCEPTIONS.find((entry) => entry.rule === rule && entry.targets.includes(target)) || null
}

export function exceptionTargetsFor(rule) {
  return STRUCTURAL_EXCEPTIONS
    .filter((entry) => entry.rule === rule)
    .flatMap((entry) => entry.targets)
}

// Referential and review-quality validation is deliberately reusable by every
// release gate. Domain-specific audits additionally report which exact targets
// they consumed, allowing stale sanctions to fail instead of living forever.
export function structuralExceptionRegistryIssues() {
  const issues = []
  const ids = new Set()
  const claims = new Map()
  const realEdges = new Set()
  for (const [from, node] of Object.entries(STORY)) {
    for (const option of node.options || []) {
      if (!option.confuser && option.to && STORY[option.to]) realEdges.add(`${from}->${option.to}`)
    }
  }

  for (const entry of STRUCTURAL_EXCEPTIONS) {
    const label = entry?.id || '?'
    for (const field of ['id', 'rule', 'rationale', 'source', 'owner', 'reviewTrigger']) {
      if (typeof entry?.[field] !== 'string' || !entry[field].trim()) issues.push(`${label}: missing ${field}`)
    }
    if (entry?.id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) issues.push(`${label}: id is not stable kebab-case`)
    if (ids.has(entry?.id)) issues.push(`${label}: duplicate exception id`)
    ids.add(entry?.id)

    const rule = STRUCTURAL_EXCEPTION_RULES[entry?.rule]
    if (!rule) issues.push(`${label}: unknown rule '${entry?.rule}'`)
    if (!Array.isArray(entry?.targets) || entry.targets.length === 0) issues.push(`${label}: targets must be a non-empty array`)
    if (entry?.rationale?.trim().length < 40) issues.push(`${label}: rationale is not concrete enough`)
    if (entry?.source?.trim().length < 20) issues.push(`${label}: source is not specific enough`)
    if (entry?.reviewTrigger?.trim().length < 30) issues.push(`${label}: review trigger is not concrete enough`)
    if (entry?.scope?.kind !== 'exact-targets' || !Number.isInteger(entry?.scope?.maximumTargets) || entry.scope.maximumTargets < 1) {
      issues.push(`${label}: missing exact bounded scope`)
    } else if ((entry.targets?.length ?? 0) > entry.scope.maximumTargets) {
      issues.push(`${label}: scope grew beyond its reviewed ${entry.scope.maximumTargets}-target bound`)
    }

    const localTargets = new Set()
    for (const target of entry?.targets || []) {
      if (typeof target !== 'string' || !target.trim()) {
        issues.push(`${label}: contains an empty target`)
        continue
      }
      if (localTargets.has(target)) issues.push(`${label}: repeats target '${target}'`)
      localTargets.add(target)
      const claim = structuralExceptionKey(entry.rule, target)
      if (claims.has(claim)) issues.push(`${label}: duplicates ${entry.rule} target '${target}' already owned by ${claims.get(claim)}`)
      else claims.set(claim, label)

      if (rule?.targetKind === 'node' && !STORY[target]) issues.push(`${label}: unknown node target '${target}'`)
      if (rule?.targetKind === 'edge' && !realEdges.has(target)) issues.push(`${label}: unknown playable edge target '${target}'`)
    }
  }
  const runtimeProjectionTargets = [...PROJECTION_BOUNDARY_EDGES].sort()
  const reviewedProjectionTargets = exceptionTargetsFor('projection-boundary').sort()
  if (JSON.stringify(runtimeProjectionTargets) !== JSON.stringify(reviewedProjectionTargets)) {
    issues.push('projection-boundary: runtime edges differ from the reviewed structural exception targets')
  }
  return issues
}

export function structuralExceptionUsageIssues(usedClaims, rules = Object.keys(STRUCTURAL_EXCEPTION_RULES)) {
  const used = usedClaims instanceof Set ? usedClaims : new Set(usedClaims || [])
  const reviewedRules = new Set(rules)
  const issues = []
  for (const entry of STRUCTURAL_EXCEPTIONS) {
    if (!reviewedRules.has(entry.rule)) continue
    for (const target of entry.targets) {
      const key = structuralExceptionKey(entry.rule, target)
      if (!used.has(key)) issues.push(`${entry.id}: unused or stale ${entry.rule} target '${target}'`)
    }
  }
  for (const key of used) {
    const separator = key.indexOf('\u0000')
    const rule = key.slice(0, separator)
    const target = key.slice(separator + 1)
    if (reviewedRules.has(rule) && !exceptionFor(rule, target)) issues.push(`unregistered used exception ${rule} target '${target}'`)
  }
  return issues
}
