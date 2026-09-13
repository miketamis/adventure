// Canonical narrow payloads for projection-disposition reviews. Both lore
// audits consume these exact functions so item-level context cannot drift.
import { createHash } from 'node:crypto'

const stable = (value) => {
  if (Array.isArray(value)) return value.map(stable)
  if (value && typeof value === 'object') return Object.fromEntries(
    Object.keys(value).sort().map((key) => [key, stable(value[key])]),
  )
  return value
}

const sha256 = (value) => createHash('sha256').update(value).digest('hex')
const mappedBeatIds = (mapped) => Array.isArray(mapped) ? mapped : [mapped]

// Canonical, per-item payloads for projection dispositions. The stored
// digest for an omission binds the exact source beat plus the precise way the
// current projection does (or does not) expose it. A proposed-place digest
// binds the complete anchor claim and the projection scope in which it remains
// unbuilt. Including the unique tale/item ids makes copied review hashes fail.
export const omissionReviewContextPayload = (tale, beatId) => {
  const beat = (tale?.beats || []).find((item) => item.id === beatId)
  const ordered = (tale?.beats || []).map((item) => item.id)
  const entryIndex = ordered.indexOf(tale?.play?.entry)
  const finaleId = tale?.play?.finale || ordered.at(-1)
  const finaleIndex = ordered.indexOf(finaleId)
  const sceneNodes = Object.entries(tale?.play?.scenes || {})
    .filter(([, mapped]) => mappedBeatIds(mapped).includes(beatId))
    .map(([node]) => node)
    .sort()
  const learnRoutes = tale?.play?.learn?.[beatId] || []
  const divergenceNotes = (tale?.play?.divergences || [])
    .filter((item) => item.beat === beatId)
    .map((item) => item.note)
  return stable({
    schema: 1,
    kind: 'omitted-source-beat',
    taleId: tale?.id,
    beat: beat ? { id: beat.id, title: beat.title, note: beat.note, lines: beat.lines } : null,
    projection: {
      declared: tale?.play ? 'play' : tale?.projection?.status || 'undeclared',
      entry: tale?.play?.entry,
      finale: finaleId,
      stance: tale?.play?.stance,
      role: tale?.play?.role,
      inPlayableSpan: entryIndex !== -1 && finaleIndex !== -1 && entryIndex <= ordered.indexOf(beatId) && ordered.indexOf(beatId) <= finaleIndex,
      representation: sceneNodes.length ? 'enacted' : learnRoutes.length ? 'learned' : 'not-enacted-or-learned',
      sceneNodes,
      learnRoutes,
      divergenceNotes,
    },
  })
}

export const placeReviewContextPayload = (tale, placeId) => {
  const place = (tale?.places || []).find((item) => item.id === placeId)
  const anchor = place?.anchor
  return stable({
    schema: 1,
    kind: 'proposed-unbuilt-place',
    taleId: tale?.id,
    place: place ? {
      id: place.id,
      name: place.name,
      note: place.note,
      anchor: anchor ? {
        status: anchor.status,
        node: anchor.node,
        mirror: anchor.mirror,
        mold: anchor.mold,
        proposal: anchor.proposal,
        conflicts: anchor.conflicts,
        sharedWith: anchor.sharedWith,
      } : null,
    } : null,
    projection: {
      declared: tale?.play ? 'play' : tale?.projection?.status || 'undeclared',
      entry: tale?.play?.entry,
      finale: tale?.play?.finale || tale?.beats?.at(-1)?.id,
      stance: tale?.play?.stance,
      role: tale?.play?.role,
      buildStatus: anchor?.status,
      nearestBuiltNode: anchor?.node,
    },
  })
}

export const omissionReviewContextHash = (tale, beatId) =>
  sha256(JSON.stringify(omissionReviewContextPayload(tale, beatId)))

export const placeReviewContextHash = (tale, placeId) =>
  sha256(JSON.stringify(placeReviewContextPayload(tale, placeId)))
