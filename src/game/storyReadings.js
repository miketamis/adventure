import { STORY, lineOf } from './content.js'
import { ACHIEVEMENT_RULE_BY_ID } from './achievementRules.js'
import { NODE_REGION } from './regions.js'
import { NPC_FIRST_ENCOUNTERS } from './npcAppearance.js'

// These receipts mean only that a reviewed story surface was presented. They
// are not retrieval proof or CEFR evidence. Saves contain content identifiers,
// never copied prose; an edited surface invalidates its old receipt naturally.
export const STORY_READING_POLICY = Object.freeze({ version: 1, recentEndingVisits: 4, maxRunVisits: 768 })

const fingerprint = (line) => JSON.stringify((line || []).map((token) => [
  token.id || '', token.al || '', token.en || '', Boolean(token.paren),
]))
const digest = (value) => {
  let left = 2166136261
  let right = 5381
  for (const char of value) {
    left = Math.imul(left ^ char.charCodeAt(0), 16777619) >>> 0
    right = (Math.imul(right, 33) ^ char.charCodeAt(0)) >>> 0
  }
  return left.toString(16).padStart(8, '0') + right.toString(16).padStart(8, '0')
}
const catalog = new Map()
const isStoryNode = (id) => typeof id === 'string' && Object.hasOwn(STORY, id)
const nodeCatalog = (nodeId) => {
  if (!isStoryNode(nodeId)) return new Map()
  const node = STORY[nodeId]
  // Portrait modules register lazily in the browser and explicitly in audits.
  // A newly registered portrait must be available without resetting receipts.
  const portraits = Object.values(NPC_FIRST_ENCOUNTERS)
    .filter((spec) => spec.nodeId === nodeId)
    .flatMap((spec) => spec.portraitLines.map((variant) => variant.line))
  const cached = catalog.get(nodeId)
  if (cached?.portraitCount === portraits.length) return cached.lines
  const lines = new Map()
  for (const line of [...node.text.map(lineOf), ...portraits]) {
    const signature = fingerprint(line)
    const id = `${nodeId}@${digest(signature)}`
    if (lines.has(id) && fingerprint(lines.get(id)) !== signature) throw new Error(`Story reading collision: ${id}`)
    lines.set(id, line)
  }
  catalog.set(nodeId, { portraitCount: portraits.length, lines })
  return lines
}

export const storyReadingReceiptIds = (nodeId, lines) => {
  const registered = nodeCatalog(nodeId)
  return [...new Set((lines || []).flatMap((line) => {
    const id = `${nodeId}@${digest(fingerprint(line))}`
    return registered.has(id) ? [id] : []
  }))]
}

export const storyReadingLineForId = (id) => {
  if (typeof id !== 'string' || id.length > 160) return null
  const nodeId = id.split('@')[0]
  return nodeCatalog(nodeId).get(id) || null
}

const safeIds = (value, nodeId = null) => [...new Set(Array.isArray(value) ? value : [])]
  .filter((id) => storyReadingLineForId(id) && (!nodeId || id.startsWith(`${nodeId}@`)))

// App restores state before the lazy Story view registers NPC portraits. Keep
// strictly shaped source IDs through that phase; only resolved registry lines
// may become questions. Unknown/stale IDs never count as assessed material.
const savedIds = (value, nodeId = null) => [...new Set(Array.isArray(value) ? value : [])]
  .filter((id) => typeof id === 'string' && /^[A-Za-z][A-Za-z0-9-]*@[a-f0-9]{16}$/.test(id) &&
    isStoryNode(id.split('@')[0]) && (!nodeId || id.startsWith(`${nodeId}@`)))

export function normalizeStoryReadings(value) {
  if (!Array.isArray(value)) return []
  return value.slice(-STORY_READING_POLICY.maxRunVisits).flatMap((visit) => {
    if (!isStoryNode(visit?.nodeId) || !Number.isSafeInteger(visit.turn) || visit.turn < 0 ||
        !Number.isSafeInteger(visit.run) || visit.run < 1) return []
    const lineIds = savedIds(visit.lineIds, visit.nodeId)
    return lineIds.length ? [{ nodeId: visit.nodeId, turn: visit.turn, run: visit.run, lineIds }] : []
  })
}

export function normalizeAchievementReadings(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(Object.entries(value).flatMap(([id, receipt]) => {
    const achievement = Object.hasOwn(ACHIEVEMENT_RULE_BY_ID, id) && ACHIEVEMENT_RULE_BY_ID[id]
    if (!achievement || receipt?.version !== STORY_READING_POLICY.version ||
        typeof receipt.visit !== 'string' || receipt.visit.length > 180) return []
    const [run, turn, nodeId, ...extra] = receipt.visit.split(':')
    if (extra.length || !isStoryNode(nodeId) || !/^[1-9]\d*$/.test(run) || !/^\d+$/.test(turn) ||
        !Number.isSafeInteger(Number(run)) || !Number.isSafeInteger(Number(turn)) ||
        (achievement.kind !== 'area' && nodeId !== id)) return []
    const lineIds = savedIds(receipt.lineIds).filter((lineId) =>
      achievement.kind !== 'area' || NODE_REGION[lineId.split('@')[0]] === achievement.region)
    if (achievement.kind !== 'area' && !lineIds.some((lineId) => lineId.startsWith(`${id}@`))) return []
    return lineIds.length ? [[id, { version: STORY_READING_POLICY.version, visit: receipt.visit, lineIds }]] : []
  }))
}

export function mergeAchievementReadings(...values) {
  const merged = {}
  for (const value of values) for (const [id, receipt] of Object.entries(normalizeAchievementReadings(value))) {
    const previous = merged[id]
    const [run, turn] = receipt.visit.split(':').map(Number)
    const [oldRun, oldTurn] = previous?.visit.split(':').map(Number) || [-1, -1]
    if (run > oldRun || (run === oldRun && turn >= oldTurn)) merged[id] = receipt
  }
  return merged
}

export function recordStoryReadings(state, lineIds, { endingNodeIds = null } = {}) {
  const ids = safeIds(lineIds, state.nodeId)
  if (!ids.length) return state
  const run = state.storyRunSequence || 1
  const visitKey = `${run}:${state.turn}:${state.nodeId}`
  const visits = normalizeStoryReadings(state.storyReadings).filter((visit) => visit.run === run)
  const previous = visits.at(-1)
  const sameVisit = previous?.nodeId === state.nodeId && previous.turn === state.turn && previous.run === run
  const merged = [...new Set([...(sameVisit ? previous.lineIds : []), ...ids])]
  const unchanged = sameVisit && merged.length === previous.lineIds.length
  if (!unchanged) {
    if (sameVisit) visits.pop()
    visits.push({ nodeId: state.nodeId, turn: state.turn, run, lineIds: merged })
  }
  const achievementReadings = { ...(state.achievementReadings || {}) }
  let changedAchievement = false
  for (const achievement of Object.values(ACHIEVEMENT_RULE_BY_ID)) {
    if (!state.eligible?.[achievement.id] || state.earned?.[achievement.id]) continue
    const isEnding = achievement.kind !== 'area'
    if (isEnding && state.nodeId !== achievement.id) continue
    const existing = achievementReadings[achievement.id]
    // An offered test's route is immutable through retries, world travel and
    // reload. A later actual arrival may replace it with that new lived route.
    const unresolved = existing?.lineIds?.some((id) => !storyReadingLineForId(id))
    if (existing && !unresolved && (!isEnding || existing.visit === visitKey)) continue
    const relevant = isEnding
      ? visits.filter((visit) => !endingNodeIds || endingNodeIds.includes(visit.nodeId))
        .slice(-STORY_READING_POLICY.recentEndingVisits).reverse()
      : visits.filter((visit) => NODE_REGION[visit.nodeId] === achievement.region).reverse()
    const recorded = safeIds(relevant.flatMap((visit) => visit.lineIds))
    if (!recorded.length) continue
    achievementReadings[achievement.id] = {
      version: STORY_READING_POLICY.version,
      visit: visitKey,
      lineIds: recorded,
    }
    changedAchievement = true
  }
  if (unchanged && !changedAchievement) return state
  return {
    ...state,
    storyReadings: visits.slice(-STORY_READING_POLICY.maxRunVisits),
    achievementReadings,
  }
}

export const achievementReadingLines = (state, achievementId) => {
  const ids = state?.achievementReadings?.[achievementId]?.lineIds
  if (!Array.isArray(ids) || ids.some((id) => !storyReadingLineForId(id))) return []
  return safeIds(ids).map((id) => ({ id, line: storyReadingLineForId(id) }))
}
