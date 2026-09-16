// Albanian adaptation of the Layers Method's eight-function centre. The
// Spanish source teaches querer, ir, tener, tener que, poder, hacer, ser and
// estar. Albanian uses jam for both of the final functions, so identity and
// state/location remain separate learning jobs even though their forms overlap.
// These records describe productive functions, not eight artificially distinct
// dictionary headwords. The release audit records the I/you anchors, checks
// every function in early player-owned actions, then checks continued
// repetition along every opening route. This release-only policy stays outside
// the player bundle.
export const ALBANIAN_ONION_CORE = Object.freeze([
  Object.freeze({
    id: 'want', label: 'want', al: 'dua / do; dua të… / do të…',
    firstPerson: 'dua', secondPerson: 'do', senseIds: Object.freeze(['do', 'dua']),
    matchKind: 'sense',
  }),
  Object.freeze({
    id: 'go', label: 'go', al: 'shkoj / shkon',
    firstPerson: 'shkoj', secondPerson: 'shkon', senseIds: Object.freeze(['shko']),
    matchKind: 'sense',
  }),
  Object.freeze({
    id: 'have', label: 'have', al: 'kam / ke',
    firstPerson: 'kam', secondPerson: 'ke', senseIds: Object.freeze(['ka', 'ke']),
    matchKind: 'sense',
  }),
  Object.freeze({
    id: 'have-to', label: 'have to / must', al: 'duhet të…',
    firstPerson: 'duhet të…', secondPerson: 'duhet të…', senseIds: Object.freeze(['duhet']),
    matchKind: 'sense',
  }),
  Object.freeze({
    id: 'can', label: 'can', al: 'mund të…',
    firstPerson: 'mund të…', secondPerson: 'mund të…', senseIds: Object.freeze(['mund']),
    matchKind: 'sense',
  }),
  Object.freeze({
    id: 'do-make', label: 'do / make', al: 'bëj / bën',
    firstPerson: 'bëj', secondPerson: 'bën', senseIds: Object.freeze(['bej']),
    matchKind: 'sense',
  }),
  Object.freeze({
    id: 'be-identity', label: 'be: identity or origin', al: 'jam / je',
    firstPerson: 'jam', secondPerson: 'je', senseIds: Object.freeze(['jam', 'je', 'eshte']),
    matchKind: 'identity-be',
  }),
  Object.freeze({
    id: 'be-state-location', label: 'be: state or location', al: 'jam / je',
    firstPerson: 'jam', secondPerson: 'je', senseIds: Object.freeze(['jam', 'je', 'eshte']),
    matchKind: 'state-location-be',
  }),
])

export const EARLY_ONION_POLICY = Object.freeze({
  firstActionMaxDepth: 3,
  repeatedActionMaxDepth: 5,
  minimumRepeatedActions: 4,
  routeMaxDepth: 12,
  minimumActionsPerRoute: 2,
})

export const EARLY_LANGUAGE_ROUTES = Object.freeze([
  Object.freeze({ id: 'conversation', label: 'bridge conversation', rootNodeId: 'bisedaUra1' }),
  Object.freeze({ id: 'village', label: 'village road', rootNodeId: 'fshatiLumi' }),
  Object.freeze({ id: 'forest', label: 'forest road', rootNodeId: 'lendina' }),
])

// A subtitle-frequency list is a surface-form corpus, not a clean list of
// lemmas. Ignore single-letter clitic shards and the existing reviewed
// exclusions; accept an exact early surface or its reviewed dictionary family.
export const EARLY_TOP_300_POLICY = Object.freeze({
  limit: 300,
  minimumEligiblePerRoute: 260,
  minimumEligibleInTwoRoutes: 280,
  minimumEligibleAcrossRoutes: 290,
  ignoredSingleLetterClitics: Object.freeze(['s', 'u', 'a', 't', 'ç', 'e', 'i']),
})
