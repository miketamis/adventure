import { NPCS } from './npcs.js'

export const CEFR_PREPARATION_PLACE_LABELS = Object.freeze({
  start: 'bridge approach',
  kroi1: 'village spring',
  pazariFshatit: 'market stall in the square',
  bisedaUra1: 'near side of the bridge',
  fshatiSheshi: 'village square',
  bujtina: 'village inn',
  bisedaUraPlan: 'bridge meeting place',
  fshatiLumi: 'riverbank below the village',
})

export function cefrPreparationLoreLabels(activity, state = {}) {
  const nodeId = activity?.loreAnchor?.nodeId
  const npcId = activity?.loreAnchor?.npcId
  const place = CEFR_PREPARATION_PLACE_LABELS[nodeId] || null
  let companion = null
  if (npcId === 'elira' && !state.knowledge?.['npcName:elira']) companion = 'the woman from the bridge'
  else if (npcId) companion = NPCS[npcId]?.name || null
  return { place, companion }
}
