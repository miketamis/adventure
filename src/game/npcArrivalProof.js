import { STORY, lineOf } from './content.js'
import { NPCS } from './npcs.js'
import { EMBODIMENT_QUESTS } from './embodiment.js'
import { transitionInfo } from './worldModel.js'
import { initialNpcTravelWindow } from './npcRouteTiming.js'
import { observationIdOfLine } from './observations.js'

// Structural authoring proof for the first leg of an exact living-world NPC
// journey. The release audit independently commits the same action through
// the reducer and checks its normal visible arrival; no saved actor state or
// fabricated projection can stand in for this schedule contract.
export function proveStartedNpcArrival({ story, sourceId, option, entry, consequence }) {
  if (story !== STORY || !STORY[sourceId]?.options.includes(option)
      || !STORY[option.to]?.text.includes(entry) || Array.isArray(entry)
      || entry.negate || [].concat(entry.none || []).length || option.become) return false
  const conditions = [].concat(entry.cond || [])
  if (conditions.length !== 1 || !/^npc:[^:]+$/.test(conditions[0])) return false
  const npcId = conditions[0].slice(4)
  const npc = NPCS[npcId]
  if (!npc || !Array.isArray(npc.route) || npc.activePhases
      || ![].concat(option.startsNpc || []).includes(npcId)
      || [].concat(option.requires || []).some((condition) => /^embodying(?::|$)/.test(condition))) return false
  if (Object.values(EMBODIMENT_QUESTS).some((quest) =>
    npc.route.some((nodeId) => quest.nodes.includes(nodeId)))) return false
  const semantic = option.actionSemantics
  if (semantic?.kind !== 'accompaniment' || !(
    consequence.kind === 'participant' && semantic.participantIds?.includes(consequence.id)
    || consequence.kind === 'motion' && semantic.journeyId === consequence.id
  )) return false
  const line = lineOf(entry)
  if (line.scenePriority === 'ambient' || observationIdOfLine(line) || !line.semanticFacts?.some((fact) =>
    fact.kind === consequence.kind && fact.id === consequence.id)) return false
  const journey = initialNpcTravelWindow(npcId, npc, STORY,
    (from, candidate) => transitionInfo(from, candidate).hours)
  return Boolean(journey && journey.from === sourceId && journey.to === option.to
    && npc.route[Math.floor(journey.hours / npc.stepHours)] === option.to)
}
