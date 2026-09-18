import { canonicalPlayerActionId } from './playerActionRuntime.js'
import { UNCHARTED_SITES } from './unchartedSites.js'

export function unchartedSiteIssues(story, sites = UNCHARTED_SITES) {
  const issues = [], ids = new Set(), nodes = new Set(), actions = new Set()
  const record = (value) => value && typeof value === 'object' && !Array.isArray(value)
  const text = (value) => typeof value === 'string' && Boolean(value.trim())
  if (!Array.isArray(sites) || !sites.length) return ['uncharted sites: missing registry']
  const fields = ['id', 'label', 'nodes', 'source', 'rationale', 'owner', 'reviewTrigger', 'scope', 'transitions']
  for (const site of sites) {
    if (!record(site)) { issues.push('uncharted sites: malformed site record'); continue }
    const fail = (message) => issues.push(`${site.id}: ${message}`)
    if (!text(site.id) || ids.has(site.id)) fail('missing or duplicate site id')
    ids.add(site.id)
    if (Object.keys(site).length !== fields.length || Object.keys(site).some((field) => !fields.includes(field))) fail('unexpected site schema')
    for (const field of ['label', 'source', 'rationale', 'owner', 'reviewTrigger']) if (!text(site[field])) fail(`missing ${field}`)
    if (!Array.isArray(site.nodes) || !site.nodes.length || site.nodes.length !== site.scope?.maximumNodes ||
        !Array.isArray(site.transitions) || !site.transitions.length || site.transitions.length !== site.scope?.maximumTransitions ||
        Object.keys(site.scope || {}).sort().join() !== 'maximumNodes,maximumTransitions') { fail('invalid bounded scope'); continue }
    for (const node of site.nodes) {
      if (!text(node) || nodes.has(node) || !story?.[node]) fail(`missing or multiply owned node ${node}`)
      nodes.add(node)
    }
    let entrances = 0
    for (const entry of site.transitions) {
      if (!record(entry)) { fail('malformed transition'); continue }
      if (Object.keys(entry).sort().join() !== 'actionId,durationHours,from,id,to' ||
          ['id', 'actionId', 'from', 'to'].some((field) => !text(entry[field])) || actions.has(entry.id)) fail('invalid or duplicate transition schema/id')
      actions.add(entry.id)
      if (!site.nodes.includes(entry.to) || !story?.[entry.from]) fail(`${entry.id}: transition outside exact site scope`)
      if (!site.nodes.includes(entry.from)) entrances++
      const options = (story?.[entry.from]?.options || []).filter((option) => !option.confuser && option.to === entry.to && canonicalPlayerActionId(entry.from, option) === entry.actionId)
      if (options.length !== 1 || options[0]?.durationHours !== entry.durationHours || options[0]?.time || options[0]?.date || options[0]?.atHour != null ||
          !Number.isSafeInteger(entry.durationHours) || entry.durationHours < 0) fail(`${entry.id}: exact canonical action/timing changed`)
      if (site.nodes.includes(entry.from) && entry.durationHours !== 0) fail(`${entry.id}: same-site speech must remain immediate`)
    }
    if (entrances !== 1) fail('site must have one exact source-bound entrance')
    for (const node of site.nodes) if (!site.transitions.some((entry) => entry?.to === node)) fail(`${node}: no registered arrival`)
  }
  for (const [from, node] of Object.entries(story || {})) for (const option of node.options || []) {
    if (option.confuser || (!nodes.has(from) && !nodes.has(option.to))) continue
    const matches = sites.flatMap((site) => Array.isArray(site?.transitions) ? site.transitions : []).filter((entry) => entry?.from === from && entry.to === option.to && entry.actionId === canonicalPlayerActionId(from, option))
    if (matches.length !== 1) issues.push(`${from}->${option.to}: unregistered or ambiguous uncharted site action`)
  }
  return issues
}
