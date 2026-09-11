import { NPCS } from './npcs.js'

const own = (record, id) => Object.prototype.hasOwnProperty.call(record || {}, id)

export const NPC_IDENTITY_MODES = Object.freeze({
  DISCOVERABLE: 'discoverable',
  KNOWN_BY_CONTEXT: 'known-by-context',
})

export function npcIdentityPolicy(npcId) {
  return NPCS[npcId]?.identity || null
}

// Discoverable identity is NPC metadata, not an ad-hoc story flag. Future
// persistent characters opt into this same contract by declaring a discoverable
// identity and descriptor; authored reveals and every later reference then
// share one key. Contextual titles never manufacture a knowledge flag.
export function npcIdentitySpec(npcId) {
  const npc = NPCS[npcId]
  if (npc?.identity?.mode !== NPC_IDENTITY_MODES.DISCOVERABLE) return null
  return {
    npcId,
    name: npc.name,
    descriptor: npc.identity.descriptor,
    knowledgeId: `npcName:${npcId}`,
  }
}

export function npcIdentityKnowledgeId(npcId) {
  return npcIdentitySpec(npcId)?.knowledgeId || null
}

export function npcIdentityConditionId(npcId) {
  const knowledgeId = npcIdentityKnowledgeId(npcId)
  return knowledgeId ? `knows:${knowledgeId}` : null
}

export function npcIdentityRevealEffect(npcId) {
  const id = npcIdentityKnowledgeId(npcId)
  if (!id) throw new Error(`NPC '${npcId}' has no discoverable identity contract`)
  return { type: 'learn', id }
}

export function knowsNpcIdentity(state, npcId) {
  const id = npcIdentityKnowledgeId(npcId)
  if (!id || !own(state?.knowledge, id)) return false
  const learned = state.knowledge[id]
  return learned != null && learned !== false
}

export function npcIdentityReference(state, npcId) {
  const identity = npcIdentitySpec(npcId)
  if (!identity) return NPCS[npcId]?.name || null
  return knowsNpcIdentity(state, npcId) ? identity.name : identity.descriptor
}
