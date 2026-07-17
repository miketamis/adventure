// ===========================================================================
// NPC REGISTRY — assembler. The actual entries live in ONE FILE PER AREA/TALE
// in src/game/data/npcs/*.js (see data/npcs/_SCHEMA.md for the contract):
//   core-village.js / core-world.js — the standing world cast
//   tale-<taleId>.js                — each tale's cast, owned by that tale
// Adding NPCs never edits a shared file, so parallel agents cannot conflict.
//
// Cast→NPC links resolve from BOTH sides so a tale can reuse a core NPC
// without editing the core file:
//   • npc.tales = { taleId: castId }        (the NPC claims the role)
//   • tale.cast[].npc = 'npcId'             (the tale claims the NPC)
// ===========================================================================
import { TALES } from './taleBeats.js'

const modules = import.meta.glob('./data/npcs/*.js', { eager: true })

export const NPC_REGISTRY = {}
for (const m of Object.values(modules)) {
  for (const [id, npc] of Object.entries(m.default || {})) NPC_REGISTRY[id] = npc
}

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
