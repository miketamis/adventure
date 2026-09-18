// ===========================================================================
// NPC REGISTRY — assembler. The actual entries live in ONE FILE PER AREA/TALE
// in src/game/data/npcs/*.js (see data/npcs/_SCHEMA.md for the contract):
//   core-village.js / core-world.js — the standing world cast
//   tale-<taleId>.js                — each tale's cast, owned by that tale
// Edit NPC records in their owning partition. A new or renamed partition
// must also update npcRegistryData.js; the 3D release gate compares its import
// manifest with the directory so no partition can silently disappear.
//
// Cast→NPC links resolve from BOTH sides so a tale can reuse a core NPC
// without editing the core file:
//   • npc.tales = { taleId: castId }        (the NPC claims the role)
//   • tale.cast[].npc = 'npcId'             (the tale claims the NPC)
// ===========================================================================
import { TALES } from './taleBeats.js'

import { NPC_REGISTRY } from './npcRegistryData.js'
export { NPC_REGISTRY } from './npcRegistryData.js'

// reverse lookup: taleId → castId → npcId (Beats cast links resolve with this)
export const NPC_OF_CAST = {}
for (const [npcId, npc] of Object.entries(NPC_REGISTRY)) {
  for (const [taleId, castId] of Object.entries(npc.tales || {})) {
    ;(NPC_OF_CAST[taleId] ||= {})[castId] = npcId
  }
}
for (const [taleId, tale] of Object.entries(TALES)) {
  for (const c of tale.cast || []) {
    if (c.npc && NPC_REGISTRY[c.npc]) (NPC_OF_CAST[taleId] ||= {})[c.id] = c.npc
  }
}
