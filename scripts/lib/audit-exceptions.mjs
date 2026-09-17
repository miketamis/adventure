// Shared contract for narrow release-audit exceptions.
//
// Audit-specific modules own the semantic rule and its exact targets. This
// helper owns the review-quality, bounded-scope and lifecycle invariants so a
// release gate cannot quietly fall back to an anonymous allowlist.

const REQUIRED_FIELDS = Object.freeze([
  'id',
  'rule',
  'rationale',
  'owner',
  'reviewTrigger',
])

const asSet = (value) => value instanceof Set ? value : new Set(value || [])

export const auditExceptionClaimKey = (rule, target) => `${rule}\u0000${target}`

const freezeEntry = (entry) => Object.freeze({
  ...entry,
  targets: Object.freeze([...(entry?.targets || [])]),
  scope: Object.freeze({ ...(entry?.scope || {}) }),
})

export function defineAuditExceptionRegistry({ rules, entries }) {
  return Object.freeze({
    rules: Object.freeze({ ...(rules || {}) }),
    entries: Object.freeze((entries || []).map(freezeEntry)),
  })
}

export function auditExceptionFor(registry, rule, target) {
  return registry.entries.find((entry) =>
    entry.rule === rule && entry.targets.includes(target)) || null
}

export function auditExceptionTargetsFor(registry, rule) {
  return registry.entries
    .filter((entry) => entry.rule === rule)
    .flatMap((entry) => entry.targets)
}

export function auditExceptionRegistryIssues(registry, { validTargetsByRule = {} } = {}) {
  const issues = []
  const ids = new Set()
  const claims = new Map()
  const rules = registry?.rules || {}

  for (const [rule, definition] of Object.entries(rules)) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rule)) {
      issues.push(`rule '${rule}' is not stable kebab-case`)
    }
    if (typeof definition?.targetKind !== 'string' || !definition.targetKind.trim()) {
      issues.push(`rule '${rule}' has no target kind`)
    }
  }

  for (const entry of registry?.entries || []) {
    const label = entry?.id || '?'
    for (const field of REQUIRED_FIELDS) {
      if (typeof entry?.[field] !== 'string' || !entry[field].trim()) {
        issues.push(`${label}: missing ${field}`)
      }
    }
    if (entry?.id && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id)) {
      issues.push(`${label}: id is not stable kebab-case`)
    }
    if (ids.has(entry?.id)) issues.push(`${label}: duplicate exception id`)
    ids.add(entry?.id)

    if (!rules[entry?.rule]) issues.push(`${label}: unknown rule '${entry?.rule}'`)
    const evidence = typeof entry?.evidence === 'string' && entry.evidence.trim()
      ? entry.evidence
      : entry?.source
    if (typeof evidence !== 'string' || !evidence.trim()) {
      issues.push(`${label}: missing evidence/source`)
    }
    if ((entry?.rationale?.trim().length || 0) < 60) {
      issues.push(`${label}: rationale is not concrete enough`)
    }
    if ((evidence?.trim().length || 0) < 40) {
      issues.push(`${label}: evidence is not specific enough`)
    }
    if ((entry?.reviewTrigger?.trim().length || 0) < 40) {
      issues.push(`${label}: review trigger is not concrete enough`)
    }
    if (!Array.isArray(entry?.targets) || entry.targets.length === 0) {
      issues.push(`${label}: targets must be a non-empty array`)
    }
    if (entry?.scope?.kind !== 'exact-targets' ||
        !Number.isInteger(entry?.scope?.maximumTargets) ||
        entry.scope.maximumTargets < 1) {
      issues.push(`${label}: missing exact bounded scope`)
    } else if ((entry.targets?.length || 0) !== entry.scope.maximumTargets) {
      issues.push(`${label}: exact scope has ${entry.targets?.length || 0} targets instead of its reviewed ${entry.scope.maximumTargets}`)
    }

    const localTargets = new Set()
    const validTargets = validTargetsByRule instanceof Map
      ? validTargetsByRule.get(entry?.rule)
      : validTargetsByRule[entry?.rule]
    for (const target of entry?.targets || []) {
      if (typeof target !== 'string' || !target.trim()) {
        issues.push(`${label}: contains an empty target`)
        continue
      }
      if (target.includes('*')) issues.push(`${label}: target '${target}' is not exact`)
      if (localTargets.has(target)) issues.push(`${label}: repeats target '${target}'`)
      localTargets.add(target)

      const claim = auditExceptionClaimKey(entry.rule, target)
      if (claims.has(claim)) {
        issues.push(`${label}: duplicates ${entry.rule} target '${target}' already owned by ${claims.get(claim)}`)
      } else {
        claims.set(claim, label)
      }
      if (validTargets && !asSet(validTargets).has(target)) {
        issues.push(`${label}: unknown ${entry.rule} target '${target}'`)
      }
    }
  }
  return issues
}

export function auditExceptionUsageIssues(registry, usedClaims, rules = Object.keys(registry.rules)) {
  const used = asSet(usedClaims)
  const reviewedRules = new Set(rules)
  const issues = []
  for (const entry of registry.entries) {
    if (!reviewedRules.has(entry.rule)) continue
    for (const target of entry.targets) {
      const claim = auditExceptionClaimKey(entry.rule, target)
      if (!used.has(claim)) {
        issues.push(`${entry.id}: unused or stale ${entry.rule} target '${target}'`)
      }
    }
  }
  for (const claim of used) {
    const separator = claim.indexOf('\u0000')
    const rule = separator < 0 ? '' : claim.slice(0, separator)
    const target = separator < 0 ? claim : claim.slice(separator + 1)
    if (!reviewedRules.has(rule)) continue
    if (!auditExceptionFor(registry, rule, target)) {
      issues.push(`unregistered used exception ${rule} target '${target}'`)
    }
  }
  return issues
}
