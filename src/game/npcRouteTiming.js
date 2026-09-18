// A started journey can spend several initial slots on its departure leg.
// Only the exact canonical start action proves that interval; residence
// elsewhere never counts toward a later journey's travel time.
export function initialNpcTravelWindow(npcId, npc, story, hoursOf) {
  if (!npc?.once || !Array.isArray(npc.route) || !Number.isSafeInteger(npc.stepHours) || npc.stepHours < 1) return null
  const slots = npc.route.findIndex((nodeId) => nodeId !== npc.route[0])
  if (slots < 2) return null
  const from = npc.route[0]
  const to = npc.route[slots]
  if (Object.values(story).some((node) => [].concat(node.startsNpc || []).includes(npcId))) return null
  const starters = Object.entries(story).flatMap(([nodeId, node]) => (node.options || [])
    .filter((option) => !option.confuser && [].concat(option.startsNpc || []).includes(npcId))
    .map((option) => ({ nodeId, option })))
  if (starters.length !== 1 || starters[0].nodeId !== from || starters[0].option.to !== to) return null
  const hours = slots * npc.stepHours
  const option = starters[0].option
  if (option.time || option.date || option.atHour != null || hoursOf(from, option) !== hours) return null
  return { from, to, hours, lastSourceIndex: slots - 1 }
}
