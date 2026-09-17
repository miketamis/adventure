import assert from 'node:assert/strict'
import test from 'node:test'
import {
  auditExceptionClaimKey,
  auditExceptionRegistryIssues,
  auditExceptionUsageIssues,
  defineAuditExceptionRegistry,
} from './audit-exceptions.mjs'

const validRecord = (overrides = {}) => ({
  id: 'known-legacy-edge',
  rule: 'sample-rule',
  targets: ['source->destination'],
  rationale: 'This exact legacy edge is temporarily retained because its replacement requires a separate authored transition.',
  evidence: 'scripts/exampleaudit.mjs: exact source->destination fixture',
  owner: 'narrative',
  reviewTrigger: 'when the source, destination or authored transition changes',
  scope: { kind: 'exact-targets', maximumTargets: 1 },
  ...overrides,
})

const registry = (entries) => defineAuditExceptionRegistry({
  rules: { 'sample-rule': { targetKind: 'edge' } },
  entries,
})

test('accepts a complete, exact, live and bounded exception', () => {
  const subject = registry([validRecord()])
  assert.deepEqual(auditExceptionRegistryIssues(subject, {
    validTargetsByRule: { 'sample-rule': new Set(['source->destination']) },
  }), [])
  assert.deepEqual(auditExceptionUsageIssues(subject, new Set([
    auditExceptionClaimKey('sample-rule', 'source->destination'),
  ])), [])
})

test('rejects malformed, duplicate, broad and scope-growing records', () => {
  const subject = registry([
    validRecord({ evidence: '', targets: ['source->destination', 'other->*'], scope: { kind: 'exact-targets', maximumTargets: 1 } }),
    validRecord(),
  ])
  const issues = auditExceptionRegistryIssues(subject)
  assert.ok(issues.some((issue) => issue.includes('missing evidence/source')))
  assert.ok(issues.some((issue) => issue.includes('duplicate exception id')))
  assert.ok(issues.some((issue) => issue.includes('not exact')))
  assert.ok(issues.some((issue) => issue.includes('exact scope has')))
  assert.ok(issues.some((issue) => issue.includes('duplicates sample-rule target')))
})

test('accepts source as evidence and rejects a padded maximum scope', () => {
  const sourceBacked = validRecord({ evidence: undefined, source: 'src/game/exampleRegistry.js: reviewed exact edge record' })
  assert.deepEqual(auditExceptionRegistryIssues(registry([sourceBacked])), [])

  const padded = validRecord({ scope: { kind: 'exact-targets', maximumTargets: 2 } })
  assert.ok(auditExceptionRegistryIssues(registry([padded]))
    .some((issue) => issue.includes('exact scope has 1 targets instead of its reviewed 2')))
})

test('rejects stale, unused and unregistered exception use', () => {
  const subject = registry([validRecord()])
  const unused = auditExceptionUsageIssues(subject, new Set())
  assert.ok(unused.some((issue) => issue.includes('unused or stale')))

  const unregistered = auditExceptionUsageIssues(subject, new Set([
    auditExceptionClaimKey('sample-rule', 'different->edge'),
  ]))
  assert.ok(unregistered.some((issue) => issue.includes('unused or stale')))
  assert.ok(unregistered.some((issue) => issue.includes('unregistered used exception')))
})
