// Compact storage only: callers still receive the exact address-to-pair API.
// Explicit indices preserve legitimate unreviewed gaps; sparse or duplicate
// storage entries are malformed, never an instruction to renumber story lines.
const denseArray = (value) => Array.isArray(value) &&
  Reflect.ownKeys(value).length === value.length + 1 &&
  Array.from({ length: value.length }, (_, index) => Object.hasOwn(value, index)).every(Boolean)
const tuple = (value, length) => denseArray(value) && value.length === length

export function expandReviewedReadingNodes(groups) {
  if (!denseArray(groups)) throw new Error('Reviewed-reading groups must be a dense array')
  const readings = {}
  const nodes = new Set()
  for (const group of groups) {
    if (!tuple(group, 2) || typeof group[0] !== 'string' || !/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(group[0]) ||
        nodes.has(group[0]) || !denseArray(group[1]) || group[1].length === 0) {
      throw new Error('Invalid or duplicate reviewed-reading node group')
    }
    const [nodeId, entries] = group
    nodes.add(nodeId)
    for (const entry of entries) {
      if (!tuple(entry, 2) || !Number.isSafeInteger(entry[0]) || entry[0] < 0 ||
          !tuple(entry[1], 2) || entry[1].some((part) => typeof part !== 'string' || !part.trim())) {
        throw new Error(`Invalid reviewed-reading entry for ${nodeId}`)
      }
      const [index, pair] = entry
      const address = `${nodeId}.text[${index}]`
      if (Object.hasOwn(readings, address)) throw new Error(`Duplicate reviewed-reading address: ${address}`)
      // Keep every address independently owned even if a caller reuses a pair.
      readings[address] = [...pair]
    }
  }
  return readings
}
