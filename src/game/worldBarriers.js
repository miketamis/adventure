// Barrier evidence is used by the deferred world inspector and release audits.
// First-play route timing and visibility remain in worldModel.js.
import { NODE_REGION } from './regions.js'

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
