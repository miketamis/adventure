// Runtime needs only these exact non-spatial edges. Rich rationale, ownership,
// evidence and stale-scope validation live in the release-only structural
// exception registry, which imports this single authoritative target list.
export const PROJECTION_BOUNDARY_EDGES = Object.freeze([
  'pylli1->prespaPyll',
  'pusi->sari1',
  'sari1->pusi',
  'maja->argjiroKala',
  'deti1->aliPashaLiqen',
])

const PROJECTION_BOUNDARY_EDGE_SET = new Set(PROJECTION_BOUNDARY_EDGES)

export const isProjectionBoundary = (from, to) =>
  PROJECTION_BOUNDARY_EDGE_SET.has(`${from}->${to}`)
