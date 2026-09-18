// Audit-only semantic joins. Full tale records stay outside the player bundle.
import { normalizeNpcDepiction } from './npcAppearance.js'

export function npcDepictionIssues(spec, npc, tales, story) {
  if (!spec.depiction) return []
  const issues = []
  let depiction
  try { depiction = normalizeNpcDepiction(spec.depiction) } catch (error) { return [error.message] }
  const tale = tales[depiction.taleId]
  if (!tale) return ['narrated depiction names no source tale']
  const cast = tale.cast.filter((entry) => entry.npc
    ? entry.npc === spec.npcId
    : npc?.tales?.[tale.id] === entry.id)
  if (cast.length !== 1) issues.push('narrated depiction has no unique source cast identity')
  const place = tale.places.find((entry) => entry.id === depiction.placeId)
  if (place?.anchor?.status === 'proposed' && story[place.anchor.node]) {
    // A proposed source place is not the nearest built node named by its
    // planning record. A narrated portrait may introduce that cast member
    // without inventing a physical occupant or borrowing nearby geometry.
    if (npc?.location?.status !== 'planning' || !npc.location.plan?.trim()
      || ['node', 'route', 'encounters'].some((key) => Object.hasOwn(npc.location, key))) {
      issues.push('unbuilt narrated source place requires an unlocated planning identity')
    }
  } else if (place?.anchor?.status === 'existing' && story[place.anchor.node]) {
    if (npc?.location?.status !== 'placed' || npc.location.node !== place.anchor.node) {
      issues.push('narrated source place differs from the catalogue physical home')
    }
  } else {
    issues.push('narrated source place has no reviewed existing or proposed anchor')
  }
  if (!story[spec.nodeId] || !tale.play?.scenes?.[spec.nodeId]) {
    issues.push('narrated portrait is outside the tale’s authored scene projection')
  }
  if (spec.presence != null) issues.push('narrated portrait asserts a physical presence policy')
  let located = false
  for (const id of depiction.beatIds) {
    const beat = tale.beats.find((entry) => entry.id === id)
    if (!beat?.lines?.length) {
      issues.push(`narrated source beat '${id}' is missing or empty`)
      continue
    }
    const location = beat.cast?.[cast[0]?.id]?.[0]
    if (location === depiction.placeId) located = true
    else if (location) issues.push(`source beat '${id}' places the depicted identity elsewhere`)
  }
  if (!located) issues.push('no cited source beat locates the depicted identity at the source place')
  return issues
}
