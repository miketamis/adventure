import { canonicalPlayerActionId } from './playerActionRuntime.js'
import { DEPARTURE_CONTEXTS, departureContextForChoice } from './departureContexts.js'
import { unchartedSiteIssues } from './unchartedSiteValidation.js'

export function departureContextIssues(story) {
  const issues = []
  const keys = new Set()
  const ids = new Set()
  const fields = ['id', 'from', 'to', 'actionId', 'durationHours', 'reason']
  for (const entry of DEPARTURE_CONTEXTS) {
    if (ids.has(entry.id) || typeof entry.id !== 'string' || !entry.id) issues.push(`${entry.id}: missing or duplicate departure id`)
    ids.add(entry.id)
    if (Object.keys(entry).length !== fields.length || Object.keys(entry).some((field) => !fields.includes(field))) issues.push(`${entry.id}: unexpected departure schema fields`)
    const key = `${entry.from}:${entry.actionId}:${entry.to}`
    const options = (story?.[entry.from]?.options || []).filter((option) => !option.confuser && option.to === entry.to && canonicalPlayerActionId(entry.from, option) === entry.actionId)
    if (keys.has(key)) issues.push(`${entry.id}: duplicate departure binding`)
    keys.add(key)
    if (options.length !== 1 || !story?.[entry.to]?.end || story[entry.to].options.length) issues.push(`${entry.id}: departure must bind one real action and a terminal uncharted outcome`)
    if (!entry.reason || !Number.isSafeInteger(entry.durationHours) || entry.durationHours < 0) issues.push(`${entry.id}: missing reviewed departure timing or reason`)
    if (options[0]?.durationHours != null && options[0].durationHours !== entry.durationHours) issues.push(`${entry.id}: departure timing disagrees with authored action`)
  }
  for (const [from, node] of Object.entries(story || {})) for (const option of node.options || []) {
    if (!option.confuser && DEPARTURE_CONTEXTS.some(({ to }) => to === option.to) && !departureContextForChoice(from, option, story)) issues.push(`${from}->${option.to}: unregistered departure action`)
  }
  return [...issues, ...unchartedSiteIssues(story)]
}
