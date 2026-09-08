const DIRECTIONS = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
}

// Choose the closest marker in the requested visual direction. A strong
// sideways penalty makes arrow travel feel spatial instead of following DOM
// order when several markers sit in the same general direction.
export function nextMapMarker(markers, currentId, key) {
  const direction = DIRECTIONS[key]
  const current = markers.find((marker) => marker.id === currentId)
  if (!direction || !current) return null

  const [vx, vy] = direction
  return markers
    .filter((marker) => marker.id !== currentId)
    .map((marker) => {
      const dx = marker.x - current.x
      const dy = marker.y - current.y
      const forward = dx * vx + dy * vy
      if (forward <= 0) return null
      const sideways = Math.abs(dx * vy - dy * vx)
      const distance = Math.hypot(dx, dy)
      return { marker, score: distance + sideways * 2.5 }
    })
    .filter(Boolean)
    .sort((a, b) => a.score - b.score || a.marker.id.localeCompare(b.marker.id))[0]?.marker || null
}
