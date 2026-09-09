import {
  applyFixtureAction,
  canonicalFixtureActionId,
  fixtureActionTransition,
  fixtureSupportsAction,
} from './worldFixtures.js'
import { civilDayOffsetAtClock } from './environment.js'

// Pure state helpers for authored effects and interaction limits. This module
// deliberately knows nothing about STORY or UI: gameState supplies the owning
// scene/tale clock at the reducer edge.

const isRecord = (value) => value != null && typeof value === 'object' && !Array.isArray(value)
const finiteInteger = (value) => Number.isFinite(value) ? Math.floor(value) : null
const UNSAFE_RECORD_IDS = new Set(['__proto__', 'prototype', 'constructor'])
const nonEmptyId = (value) => typeof value === 'string' && value.trim() && value.trim() === value &&
  !UNSAFE_RECORD_IDS.has(value)
  ? value
  : null
const exactInteger = (value) => Number.isSafeInteger(value) ? value : null
const own = (record, id) => Object.prototype.hasOwnProperty.call(record || {}, id)
const countAt = (record, id) => {
  const value = own(record, id) ? record[id] : 0
  return Number.isSafeInteger(value) && value >= 0 ? value : 0
}

const inventoryEffect = (raw, legacy = false) => {
  const id = nonEmptyId(raw.id)
  const delta = exactInteger(raw.delta)
  // `lek` is a resource stored in inventory for legacy UI compatibility, but
  // authored effects must use the resource channel so affordability cannot be
  // bypassed. Hearts are never inventory entries.
  return id && !['lek', 'hearts'].includes(id) && delta != null && delta !== 0
    ? { type: 'inventory', id, delta, legacy }
    : null
}

function canonicalTypedEffect(raw) {
  if (!isRecord(raw)) return null
  if (raw.type === 'item' || raw.type === 'inventory') return inventoryEffect(raw)
  if (raw.type === 'flag') {
    const id = nonEmptyId(raw.id)
    if (own(raw, 'value') && typeof raw.value !== 'boolean') return null
    return id ? { type: 'flag', id, value: raw.value !== false } : null
  }
  if (raw.type === 'learn' || raw.type === 'knowledge') {
    const id = nonEmptyId(raw.id)
    return id ? { type: 'learn', id } : null
  }
  if (raw.type === 'resource') {
    const id = ['hearts', 'lek'].includes(raw.id) ? raw.id : null
    const delta = exactInteger(raw.delta)
    const set = exactInteger(raw.set)
    const hasDelta = delta != null && delta !== 0
    const hasSet = set != null && set >= 0
    return id && hasDelta !== hasSet
      ? hasDelta
        ? { type: 'resource', id, delta }
        : { type: 'resource', id, set }
      : null
  }
  if (raw.type === 'fixture') {
    const id = nonEmptyId(raw.id)
    // clear/deactivate were the first draft vocabulary. Keep them as save- and
    // content-compatible aliases for the generalized fixture action.
    if (own(raw, 'action') && typeof raw.action !== 'string') return null
    const requestedAction = ['clear', 'deactivate'].includes(raw.action)
      ? 'extinguish'
      : raw.action ?? 'activate'
    const action = canonicalFixtureActionId(requestedAction)
    return id && action
      ? { type: 'fixture', id, action }
      : null
  }
  return null
}

// Legacy scalar fields remain first-class adapters. Existing authored content
// therefore keeps its exact mutation order while new choices may express any
// number of typed effects in one array.
export function optionEffectsOf(option) {
  const effects = []
  if (option?.consumes != null) effects.push(inventoryEffect({ id: option.consumes, delta: -1 }, true))
  if (option?.grant != null) effects.push(inventoryEffect({ id: option.grant, delta: 1 }, true))
  if (option?.lek != null && option.lek !== 0) {
    const delta = exactInteger(option.lek)
    effects.push(delta == null ? null : { type: 'resource', id: 'lek', delta, legacy: true })
  }
  if (option?.hearts != null && option.hearts !== 0) {
    const delta = exactInteger(option.hearts)
    effects.push(delta == null ? null : { type: 'resource', id: 'hearts', delta, legacy: true })
  }
  if (option?.activateFixture != null) {
    const id = nonEmptyId(option.activateFixture)
    effects.push(id ? { type: 'fixture', id, action: 'activate', legacy: true } : null)
  }
  if (!Array.isArray(option?.effects)) return effects
  for (const raw of option.effects) effects.push(canonicalTypedEffect(raw))
  return effects
}

export function optionEffectsAreValid(option, isFixture = () => true) {
  if (option?.effects != null && !Array.isArray(option.effects)) return false
  const effects = optionEffectsOf(option)
  if (effects.some((effect) => effect == null)) return false
  return effects.every((effect) => effect.type !== 'fixture' ||
    (isFixture(effect.id) && fixtureSupportsAction(effect.id, effect.action)))
}

export function optionInventoryIds(option) {
  return new Set(optionEffectsOf(option)
    .filter((effect) => effect?.type === 'inventory')
    .map((effect) => effect.id))
}

export function optionLekDelta(option) {
  return optionEffectsOf(option)
    .filter((effect) => effect?.type === 'resource' && effect.id === 'lek')
    // A set operation is not a price and therefore contributes no affordability
    // delta. The resolver will still apply it after the choice is committed.
    .reduce((sum, effect) => sum + (effect.delta ?? 0), 0)
}

// Affordability follows authored effect order, just like inventory costs. A
// later `set` cannot retroactively pay an earlier cost, while a set that occurs
// first may fund a later one. This is also used by item actions, which do not
// otherwise pass through the ordinary choice-price gate.
export function optionLekAvailability(state, option) {
  let balance = countAt(state?.inventory, 'lek')
  for (const effect of optionEffectsOf(option)) {
    if (effect?.type !== 'resource' || effect.id !== 'lek') continue
    const before = balance
    balance = effect.set ?? (balance + effect.delta)
    if (balance < 0) {
      return {
        ok: false,
        reason: 'insufficient-lek',
        have: before,
        need: -balance,
      }
    }
  }
  return { ok: true, balance }
}

export function itemUseEffectsOption(item) {
  if (item?.use?.effects != null && !Array.isArray(item.use.effects)) {
    return { effects: item.use.effects }
  }
  const effects = []
  // Using a carried object is one atomic transaction. Keeping its ordinary
  // one-item consumption beside the authored effects means a use can never
  // pass validation with one copy and then drive the count negative when it
  // also consumes another ingredient (or the same item) of its own.
  const itemId = nonEmptyId(item?.id)
  if (itemId) effects.push({ type: 'inventory', id: itemId, delta: -1 })
  const hasTypedEffects = Array.isArray(item?.use?.effects)
  if (hasTypedEffects) effects.push(...item.use.effects)
  const legacy = item?.use?.effect
  // Explicit typed effects replace the legacy adapter, matching the public
  // item metadata helper and preventing a gradual migration from applying a
  // healing reward twice.
  if (!hasTypedEffects && Number.isFinite(legacy?.hearts) && legacy.hearts !== 0) {
    effects.unshift({ type: 'resource', id: 'hearts', delta: Math.floor(legacy.hearts) })
  }
  return { effects }
}

// Every item cost fails closed before reducer mutation. Legacy `consumes`
// usually has a matching `requires` visibility gate, but the transaction does
// not rely on that redundant authoring convention for inventory safety.
export function canApplyOptionEffects(state, option, isFixture = () => true, context = {}) {
  return optionEffectAvailability(state, option, isFixture, context).ok
}

// One diagnostic result drives the reducer gate and its player-facing lock
// text. Authors therefore cannot add a new typed effect which silently leaves
// a grey button with no explanation.
export function optionEffectAvailability(state, option, isFixture = () => true, context = {}) {
  if (!optionEffectsAreValid(option, isFixture)) {
    return { ok: false, reason: 'invalid-effect' }
  }
  const lekAvailability = optionLekAvailability(state, option)
  if (!lekAvailability.ok) return lekAvailability
  const inventory = state.inventory || {}
  const projectedInventory = { ...inventory }
  for (const effect of optionEffectsOf(option)) {
    if (effect.type !== 'inventory') continue
    const before = countAt(projectedInventory, effect.id)
    const after = before + effect.delta
    if (after < 0) {
      return {
        ok: false,
        reason: 'missing-item',
        itemId: effect.id,
        have: Math.max(0, before),
        need: Math.max(1, -after),
      }
    }
    projectedInventory[effect.id] = after
  }

  // If the owning clock is available, fail closed on state-sensitive fixture
  // actions (for example activating an already-bright lamp or refuelling one
  // which has never been lit). Simulate in authored order for composed effects.
  if (Number.isFinite(context.fixtureClock)) {
    let fixtures = state.fixtures || {}
    for (const effect of optionEffectsOf(option)) {
      if (effect.type !== 'fixture') continue
      if (context.canActOnFixture && !context.canActOnFixture(effect.id)) {
        return { ok: false, reason: 'fixture-out-of-reach', fixtureId: effect.id, action: effect.action }
      }
      const transition = fixtureActionTransition(fixtures, effect.id, effect.action, context.fixtureClock)
      if (!transition.applied) {
        return {
          ok: false,
          reason: 'fixture-state',
          fixtureId: effect.id,
          action: effect.action,
          fixtureReason: transition.reason,
          fixtureStage: transition.before,
        }
      }
      fixtures = transition.fixtures
    }
  }
  return { ok: true }
}

const clamp = (value, min, max = Infinity) => Math.max(min, Math.min(max, value))

export function learnKnowledge(knowledge, id, atClock, source) {
  if (!nonEmptyId(id) || own(knowledge, id)) return knowledge || {}
  return {
    ...(knowledge || {}),
    [id]: {
      atClock: Math.max(0, finiteInteger(atClock) ?? 0),
      source: nonEmptyId(source),
    },
  }
}

export function applyOptionEffects(state, option, context = {}) {
  let inventory = state.inventory || {}
  let flags = state.flags || {}
  let knowledge = state.knowledge || {}
  let fixtures = state.fixtures || {}
  let hearts = state.hearts

  for (const effect of optionEffectsOf(option)) {
    if (!effect) continue
    if (effect.type === 'inventory') {
      if (inventory === state.inventory) inventory = { ...inventory }
      inventory[effect.id] = countAt(inventory, effect.id) + effect.delta
      continue
    }
    if (effect.type === 'flag') {
      if (flags === state.flags) flags = { ...flags }
      if (effect.value) flags[effect.id] = true
      else delete flags[effect.id]
      continue
    }
    if (effect.type === 'learn') {
      knowledge = learnKnowledge(knowledge, effect.id, context.atClock, context.source)
      continue
    }
    if (effect.type === 'fixture') {
      if ((!context.canActOnFixture || context.canActOnFixture(effect.id)) &&
          fixtureSupportsAction(effect.id, effect.action)) {
        fixtures = applyFixtureAction(
          fixtures,
          effect.id,
          effect.action,
          Math.max(0, finiteInteger(context.fixtureClock) ?? 0),
        )
      }
      continue
    }
    if (effect.type === 'resource' && effect.id === 'lek') {
      if (inventory === state.inventory) inventory = { ...inventory }
      inventory.lek = Math.max(0, effect.set ?? (countAt(inventory, 'lek') + effect.delta))
      continue
    }
    if (effect.type === 'resource' && effect.id === 'hearts') {
      hearts = clamp(effect.set ?? ((Number.isFinite(hearts) ? hearts : 0) + effect.delta), 0, context.maxHearts ?? 3)
      continue
    }
  }
  return { ...state, inventory, flags, knowledge, fixtures, hearts }
}

// On embodiment entry the traveller's pack is suspended. Preserve only new
// tale props granted by the threshold, including multiple typed grants.
export function entryInventoryFromOption(option) {
  const inventory = {}
  for (const effect of optionEffectsOf(option)) {
    if (effect?.type !== 'inventory') continue
    inventory[effect.id] = Math.max(0, countAt(inventory, effect.id) + effect.delta)
    if (inventory[effect.id] === 0) delete inventory[effect.id]
  }
  return inventory
}

export function normalizeKnowledge(value, maxClock = Infinity) {
  const next = {}
  if (!isRecord(value)) return next
  for (const [id, learned] of Object.entries(value)) {
    if (!nonEmptyId(id) || learned == null || learned === false) continue
    const rawClock = isRecord(learned) ? finiteInteger(learned.atClock) : 0
    const atClock = clamp(rawClock ?? 0, 0, maxClock)
    const source = isRecord(learned) ? nonEmptyId(learned.source) : null
    next[id] = { atClock, source }
  }
  return next
}

export const INTERACTION_SCOPES = Object.freeze(['scene', 'day', 'tale', 'run'])

export function interactionSpecOf(option) {
  if (option?.interaction == null) return null
  if (!isRecord(option.interaction)) return false
  const id = nonEmptyId(option.interaction.id)
  const suppliedScope = option.interaction.scope
  const hasScope = own(option.interaction, 'scope')
  const hasOnce = own(option.interaction, 'once')
  const hasMaxUses = own(option.interaction, 'maxUses')
  const hasCooldown = own(option.interaction, 'cooldownHours')
  const hasTaleId = own(option.interaction, 'taleId')
  if (hasScope && !INTERACTION_SCOPES.includes(suppliedScope)) return false
  if (hasOnce && typeof option.interaction.once !== 'boolean') return false
  const scope = suppliedScope || 'run'
  const suppliedMaxUses = option.interaction.maxUses
  if (option.interaction.once === true && hasMaxUses && exactInteger(suppliedMaxUses) !== 1) return false
  const maxUsesRaw = option.interaction.once === true
    ? 1
    : !hasMaxUses
      ? Infinity
      : exactInteger(suppliedMaxUses)
  const cooldownRaw = !hasCooldown
    ? 0
    : exactInteger(option.interaction.cooldownHours)
  const taleId = nonEmptyId(option.interaction.taleId)
  if (hasTaleId && (!taleId || scope !== 'tale')) return false
  if (!id || maxUsesRaw == null || maxUsesRaw < 1 || cooldownRaw == null || cooldownRaw < 0 ||
      (maxUsesRaw === Infinity && cooldownRaw === 0)) return false
  return { id, scope, maxUses: maxUsesRaw, cooldownHours: cooldownRaw, taleId }
}

function interactionScopeKey(spec, context) {
  const clock = Math.max(0, finiteInteger(context.clock) ?? 0)
  // A story "scene" is the authored node, not one visit instance. Its ledger
  // entry therefore survives leaving and returning during the same run. This
  // makes scene-scoped discoveries and conversations genuinely one-per-place;
  // authors who want repeat visits should use a day scope or a cooldown.
  if (spec.scope === 'scene') {
    const nodeId = nonEmptyId(context.nodeId)
    return nodeId ? `scene:${nodeId}` : null
  }
  if (spec.scope === 'day') return `day:${civilDayOffsetAtClock(clock)}`
  if (spec.scope === 'tale') {
    const taleId = spec.taleId || nonEmptyId(context.taleId)
    return taleId ? `tale:${taleId}` : null
  }
  return 'run'
}

export function interactionAvailability(ledger, option, context = {}) {
  const spec = interactionSpecOf(option)
  if (spec == null) return { ok: true, tracked: false }
  if (spec === false) return { ok: false, tracked: true, reason: 'invalid' }
  const scopeKey = interactionScopeKey(spec, context)
  if (!scopeKey) return {
    ok: false,
    tracked: true,
    reason: spec.scope === 'scene' ? 'unbound-scene' : 'unbound-tale',
    spec,
  }
  const entry = ledger?.[spec.id]?.[scopeKey]
  const uses = Number.isFinite(entry?.uses) ? Math.max(0, Math.floor(entry.uses)) : 0
  const lastAtClock = Number.isFinite(entry?.lastAtClock) ? Math.floor(entry.lastAtClock) : null
  const clock = Math.max(0, finiteInteger(context.clock) ?? 0)
  if (uses >= spec.maxUses) return { ok: false, tracked: true, reason: 'max-uses', spec, scopeKey, uses, lastAtClock }
  if (lastAtClock != null && clock - lastAtClock < spec.cooldownHours) {
    return {
      ok: false,
      tracked: true,
      reason: 'cooldown',
      spec,
      scopeKey,
      uses,
      lastAtClock,
      remainingHours: spec.cooldownHours - (clock - lastAtClock),
    }
  }
  return { ok: true, tracked: true, spec, scopeKey, uses, lastAtClock }
}

export function recordInteractionUse(ledger, availability, atClock) {
  if (!availability?.tracked || !availability.ok || !availability.spec || !availability.scopeKey) {
    return ledger || {}
  }
  const current = ledger || {}
  const byScope = current[availability.spec.id] || {}
  return {
    ...current,
    [availability.spec.id]: {
      ...byScope,
      [availability.scopeKey]: {
        uses: availability.uses + 1,
        lastAtClock: Math.max(
          availability.lastAtClock ?? 0,
          Math.max(0, finiteInteger(atClock) ?? 0),
        ),
      },
    },
  }
}

export function normalizeInteractionLedger(value, maxClock = Infinity) {
  const next = {}
  if (!isRecord(value)) return next
  for (const [id, scopes] of Object.entries(value)) {
    if (!nonEmptyId(id) || !isRecord(scopes)) continue
    const cleanScopes = {}
    for (const [scopeKey, entry] of Object.entries(scopes)) {
      if (!/^(run|scene:.+|day:\d+|tale:.+)$/.test(scopeKey) || !isRecord(entry)) continue
      const uses = finiteInteger(entry.uses)
      const lastAtClock = finiteInteger(entry.lastAtClock)
      if (uses == null || uses < 1 || lastAtClock == null || lastAtClock < 0) continue
      cleanScopes[scopeKey] = {
        uses,
        lastAtClock: Math.min(lastAtClock, maxClock),
      }
    }
    if (Object.keys(cleanScopes).length) next[id] = cleanScopes
  }
  return next
}
