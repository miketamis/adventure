// Meta-audit for repository policy ownership.
//
// AGENTS.md remains the human-readable authority. The manifest gives every
// top-level rule a stable semantic ID and an explicit enforcement owner. This
// audit makes policy drift visible: prose cannot be added, removed, reordered,
// or edited without updating its coverage record.
import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  RULE_COVERAGE_REQUIREMENTS,
  RULE_ENFORCEMENT_CLASSES,
  RULE_GATE_MANIFEST,
} from './rule-gate-manifest.mjs'

const normalizeRuleText = (text) => String(text).replace(/\s+/g, ' ').trim()
const fingerprintRule = (text) => createHash('sha256')
  .update(normalizeRuleText(text))
  .digest('hex')
  .slice(0, 16)

export function parseAgentRules(markdown) {
  const lines = String(markdown).split(/\r?\n/)
  const rules = []
  let currentSection = ''
  let bullet = 0

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]
    const sectionMatch = line.match(/^##\s+(.+?)\s*$/)
    if (sectionMatch) {
      currentSection = sectionMatch[1]
      bullet = 0
      continue
    }

    if (/^\s+-\s+/.test(line) && !line.startsWith('- ')) {
      throw new Error(`nested AGENTS.md rule bullets are unsupported at line ${index + 1}`)
    }
    if (!line.startsWith('- ')) continue
    if (!currentSection) throw new Error(`AGENTS.md rule outside a section at line ${index + 1}`)

    const prose = [line.slice(2)]
    while (index + 1 < lines.length && /^\s{2,}\S/.test(lines[index + 1]) && !/^\s+-\s+/.test(lines[index + 1])) {
      prose.push(lines[index + 1].trim())
      index += 1
    }
    bullet += 1
    const normalizedText = normalizeRuleText(prose.join(' '))
    rules.push({
      section: currentSection,
      bullet,
      line: index + 2 - prose.length,
      fingerprint: fingerprintRule(normalizedText),
      normalizedText,
    })
  }

  return rules
}

const coordinate = ({ section, bullet }) => `${section}\u0000${bullet}`
const idPattern = /^[a-z][a-z0-9-]*(?:\.[a-z0-9][a-z0-9-]*)+$/
const ownerPattern = /^[a-z][a-z0-9-]*$/
const auditPathPattern = /^scripts\/[A-Za-z0-9_.-]+audit\.mjs$/
const fingerprintPattern = /^[0-9a-f]{16}$/

export function analyzeRuleManifest(actualRules, manifest) {
  const failures = []
  const ids = new Map()
  const coordinates = new Map()

  for (const rule of manifest) {
    if (!rule || typeof rule !== 'object') {
      failures.push('manifest contains a non-object rule record')
      continue
    }
    ids.set(rule.id, (ids.get(rule.id) || 0) + 1)
    const source = rule.source || {}
    const key = coordinate(source)
    coordinates.set(key, (coordinates.get(key) || 0) + 1)

    if (!idPattern.test(rule.id || '')) failures.push(`malformed stable rule ID: ${String(rule.id)}`)
    if (source.file !== 'AGENTS.md') failures.push(`${rule.id}: source file must be AGENTS.md`)
    if (!source.section || typeof source.section !== 'string') failures.push(`${rule.id}: missing source section`)
    if (!Number.isInteger(source.bullet) || source.bullet < 1) failures.push(`${rule.id}: invalid source bullet`)
    if (!Number.isInteger(source.line) || source.line < 1) failures.push(`${rule.id}: invalid source line`)
    if (!fingerprintPattern.test(source.fingerprint || '')) failures.push(`${rule.id}: invalid source fingerprint`)
    if (!RULE_ENFORCEMENT_CLASSES.includes(rule.enforcementClass)) {
      failures.push(`${rule.id}: invalid enforcement class ${String(rule.enforcementClass)}`)
    }
    if (!ownerPattern.test(rule.owner || '')) failures.push(`${rule.id}: invalid owner ${String(rule.owner)}`)
    if (!Array.isArray(rule.owningAudits)) {
      failures.push(`${rule.id}: owningAudits must be an array`)
    } else {
      const uniqueAudits = new Set(rule.owningAudits)
      if (uniqueAudits.size !== rule.owningAudits.length) failures.push(`${rule.id}: duplicate owning audit`)
      for (const audit of rule.owningAudits) {
        if (!auditPathPattern.test(audit)) failures.push(`${rule.id}: malformed owning audit path ${String(audit)}`)
      }
      if (rule.enforcementClass === 'executable' && rule.owningAudits.length === 0) {
        failures.push(`${rule.id}: executable rule has no owning audit`)
      }
    }
    const expectedCoverage = RULE_COVERAGE_REQUIREMENTS[rule.enforcementClass]
    if (rule.coverageRequirement !== expectedCoverage) {
      failures.push(`${rule.id}: coverage requirement must be ${String(expectedCoverage)}`)
    }
  }

  for (const [id, count] of ids) {
    if (count > 1) failures.push(`duplicate stable rule ID: ${String(id)}`)
  }
  for (const [key, count] of coordinates) {
    if (count > 1) failures.push(`duplicate AGENTS.md rule mapping: ${key.replace('\u0000', ' bullet ')}`)
  }

  const actualByCoordinate = new Map(actualRules.map((rule) => [coordinate(rule), rule]))
  const manifestByCoordinate = new Map(manifest.map((rule) => [coordinate(rule?.source || {}), rule]))
  for (const actual of actualRules) {
    const key = coordinate(actual)
    const mapped = manifestByCoordinate.get(key)
    if (!mapped) {
      failures.push(`unmapped AGENTS.md rule: ${actual.section} bullet ${actual.bullet} (line ${actual.line})`)
      continue
    }
    if (mapped.source.line !== actual.line) {
      failures.push(`${mapped.id}: stale source line ${mapped.source.line}; actual line is ${actual.line}`)
    }
    if (mapped.source.fingerprint !== actual.fingerprint) {
      failures.push(`${mapped.id}: stale source prose fingerprint for ${actual.section} bullet ${actual.bullet}`)
    }
  }
  for (const mapped of manifest) {
    if (!actualByCoordinate.has(coordinate(mapped?.source || {}))) {
      failures.push(`stale manifest rule: ${String(mapped?.id)} maps no AGENTS.md bullet`)
    }
  }

  return failures
}

const npmRunCommandPattern = /^npm(?:\.cmd)?\s+run(?:-script)?\s+([A-Za-z0-9:_-]+)(?:\s|$)/
const auditCommandPattern = /^node\s+(?:\.\/)?(scripts\/[A-Za-z0-9_.-]*audit\.mjs)(?:\s|$)/
const commandSegments = (command) => String(command || '')
  .split(/\s*&&\s*/)
  .map((segment) => segment.trim())
  .filter(Boolean)

export function traceCheckAudits(scripts, rootScript = 'check') {
  const visited = new Set()
  const visiting = []
  const audits = new Set()
  const missingScripts = new Set()
  const cycles = new Set()

  const visit = (name) => {
    if (visiting.includes(name)) {
      cycles.add([...visiting.slice(visiting.indexOf(name)), name].join(' -> '))
      return
    }
    if (visited.has(name)) return
    const command = scripts[name]
    if (typeof command !== 'string') {
      missingScripts.add(name)
      return
    }

    visiting.push(name)
    for (const segment of commandSegments(command)) {
      const auditMatch = segment.match(auditCommandPattern)
      if (auditMatch) audits.add(auditMatch[1])
      const npmRunMatch = segment.match(npmRunCommandPattern)
      if (npmRunMatch) visit(npmRunMatch[1])
    }
    visiting.pop()
    visited.add(name)
  }

  visit(rootScript)
  return {
    audits,
    missingScripts: [...missingScripts].sort(),
    cycles: [...cycles].sort(),
  }
}

// Regression fixtures prove the failure modes this gate is meant to own.
const fixtureText = '# Rules\n\n## Section\n\n- Keep one rule.\n- Keep another rule.\n'
const fixtureRules = parseAgentRules(fixtureText)
const fixtureManifest = fixtureRules.map((rule, index) => ({
  id: `fixture.rule-${index + 1}`,
  source: { file: 'AGENTS.md', ...rule },
  enforcementClass: 'process',
  owner: 'fixture-owner',
  owningAudits: [],
  coverageRequirement: 'workflow-review',
}))
assert.deepEqual(analyzeRuleManifest(fixtureRules, fixtureManifest), [])
assert.ok(analyzeRuleManifest(fixtureRules, [...fixtureManifest, fixtureManifest[0]])
  .some((failure) => failure.startsWith('duplicate stable rule ID:')))
assert.ok(analyzeRuleManifest(fixtureRules, [
  ...fixtureManifest,
  { ...fixtureManifest[0], id: 'fixture.duplicate-coordinate' },
]).some((failure) => failure.startsWith('duplicate AGENTS.md rule mapping:')))
assert.ok(analyzeRuleManifest(fixtureRules, fixtureManifest.slice(1))
  .some((failure) => failure.startsWith('unmapped AGENTS.md rule:')))
assert.ok(analyzeRuleManifest(fixtureRules, fixtureManifest.map((rule, index) => index === 0
  ? { ...rule, source: { ...rule.source, fingerprint: '0000000000000000' } }
  : rule)).some((failure) => failure.includes('stale source prose fingerprint')))
assert.ok(analyzeRuleManifest(fixtureRules, [
  ...fixtureManifest,
  {
    ...fixtureManifest[0],
    id: 'fixture.stale-rule',
    source: { ...fixtureManifest[0].source, bullet: 3 },
  },
]).some((failure) => failure.startsWith('stale manifest rule:')))
assert.deepEqual(traceCheckAudits({
  check: 'npm run audit',
  audit: 'node scripts/firstaudit.mjs && npm run audit:nested',
  'audit:nested': 'node ./scripts/secondaudit.mjs',
}).audits, new Set(['scripts/firstaudit.mjs', 'scripts/secondaudit.mjs']))

const root = resolve(import.meta.dirname, '..')
const agentsPath = resolve(root, 'AGENTS.md')
const packagePath = resolve(root, 'package.json')
const actualRules = parseAgentRules(readFileSync(agentsPath, 'utf8'))
const failures = analyzeRuleManifest(actualRules, RULE_GATE_MANIFEST)
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))
const graph = traceCheckAudits(packageJson.scripts || {})

for (const name of graph.missingScripts) failures.push(`npm run check reaches missing npm script: ${name}`)
for (const cycle of graph.cycles) failures.push(`npm run check contains a script cycle: ${cycle}`)

const namedAudits = [...new Set(RULE_GATE_MANIFEST.flatMap((rule) => rule.owningAudits))].sort()
for (const audit of namedAudits) {
  if (!existsSync(resolve(root, audit))) failures.push(`manifest names missing owning audit: ${audit}`)
  if (!graph.audits.has(audit)) failures.push(`owning audit is not reachable from npm run check: ${audit}`)
}

if (failures.length) {
  console.error(`\nRULE-GATE COVERAGE FAILED (${failures.length})`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  const classCounts = Object.fromEntries(RULE_ENFORCEMENT_CLASSES.map((name) => [
    name,
    RULE_GATE_MANIFEST.filter((rule) => rule.enforcementClass === name).length,
  ]))
  console.log(`✓ ${actualRules.length} AGENTS.md rules mapped (${classCounts.executable} executable, ${classCounts.process} process, ${classCounts.editorial} editorial); ${namedAudits.length} owning audits exist and are reachable from npm run check.`)
}
