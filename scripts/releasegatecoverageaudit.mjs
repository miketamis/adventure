// Meta-audit for the release graph. Adding an `*audit.mjs` file is not enough:
// every audit must be transitively reachable from `npm run check`, which is the
// normal integrity stage used by certification and deployment.
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { childProcessFailed } from './lib/child-process-result.mjs'

const npmRunCommandPattern = /^npm(?:\.cmd)?\s+run(?:-script)?\s+([A-Za-z0-9:_-]+)(?:\s|$)/
const auditCommandPattern = /^node\s+(?:\.\/)?scripts\/([A-Za-z0-9_.-]*audit\.mjs)(?:\s|$)/
const unsafeShellControlPattern = /\|\||[;\r\n]|(?<!\|)\|(?!\|)|(?<!&)&(?!&)/

const commandSegments = (command) => String(command || '')
  .split(/\s*&&\s*/)
  .map((segment) => segment.trim())
  .filter(Boolean)

export function analyzeReleaseGraph({ scripts, auditFiles, root = 'check' }) {
  const visited = new Set()
  const visiting = []
  const missingScripts = new Set()
  const invokedAudits = new Set()
  const cycles = []
  const unsafeCommands = new Set()

  const visit = (name) => {
    if (visiting.includes(name)) {
      cycles.push([...visiting.slice(visiting.indexOf(name)), name].join(' -> '))
      return
    }
    if (visited.has(name)) return
    if (typeof scripts[name] !== 'string') {
      missingScripts.add(name)
      return
    }

    visiting.push(name)
    const command = scripts[name]
    if (unsafeShellControlPattern.test(command)) unsafeCommands.add(name)
    for (const segment of commandSegments(command)) {
      const audit = segment.match(auditCommandPattern)
      if (audit) invokedAudits.add(`scripts/${audit[1]}`)
      const npmRun = segment.match(npmRunCommandPattern)
      if (npmRun) visit(npmRun[1])
    }
    visiting.pop()
    visited.add(name)
  }

  visit(root)
  const declaredAudits = new Set(auditFiles)
  return {
    visited: [...visited].sort(),
    missingScripts: [...missingScripts].sort(),
    cycles: [...new Set(cycles)].sort(),
    unsafeCommands: [...unsafeCommands].sort(),
    unreachableAudits: [...declaredAudits].filter((file) => !invokedAudits.has(file)).sort(),
    missingAuditFiles: [...invokedAudits].filter((file) => !declaredAudits.has(file)).sort(),
  }
}

// Regression fixtures: prove transitive discovery and prove that a future
// orphan, dangling npm script, cycle or missing audit target fails closed.
const fixtureFiles = ['scripts/firstaudit.mjs', 'scripts/secondaudit.mjs']
assert.deepEqual(analyzeReleaseGraph({
  scripts: {
    check: 'npm run audit',
    audit: 'node scripts/firstaudit.mjs && npm run audit:second',
    'audit:second': 'node ./scripts/secondaudit.mjs',
  },
  auditFiles: fixtureFiles,
}), {
  visited: ['audit', 'audit:second', 'check'],
  missingScripts: [],
  cycles: [],
  unsafeCommands: [],
  unreachableAudits: [],
  missingAuditFiles: [],
})
assert.deepEqual(analyzeReleaseGraph({
  scripts: { check: 'node scripts/firstaudit.mjs' },
  auditFiles: fixtureFiles,
}).unreachableAudits, ['scripts/secondaudit.mjs'])
assert.deepEqual(analyzeReleaseGraph({
  scripts: { check: 'npm run audit:missing' },
  auditFiles: [],
}).missingScripts, ['audit:missing'])
assert.deepEqual(analyzeReleaseGraph({
  scripts: { check: 'npm run audit', audit: 'npm run check' },
  auditFiles: [],
}).cycles, ['check -> audit -> check'])
assert.deepEqual(analyzeReleaseGraph({
  scripts: { check: 'node scripts/missingaudit.mjs' },
  auditFiles: [],
}).missingAuditFiles, ['scripts/missingaudit.mjs'])
assert.deepEqual(analyzeReleaseGraph({
  scripts: { check: 'echo scripts/firstaudit.mjs' },
  auditFiles: ['scripts/firstaudit.mjs'],
}).unreachableAudits, ['scripts/firstaudit.mjs'])
for (const command of [
  'node scripts/firstaudit.mjs || true',
  'node scripts/firstaudit.mjs; true',
  'node scripts/firstaudit.mjs | true',
  'node scripts/firstaudit.mjs & true',
]) {
  assert.deepEqual(analyzeReleaseGraph({
    scripts: { check: command },
    auditFiles: ['scripts/firstaudit.mjs'],
  }).unsafeCommands, ['check'], `${command}: swallowed or detached audit failure looked safe`)
}

// Regression fixtures for nested child gates: a launch error or null status is
// failure, just like an ordinary nonzero exit. Only exact zero is success.
assert.equal(childProcessFailed({ status: 0 }), false)
assert.equal(childProcessFailed({ status: 1 }), true)
assert.equal(childProcessFailed({ status: null }), true)
assert.equal(childProcessFailed({ status: null, error: new Error('spawn failed') }), true)

const root = resolve(import.meta.dirname, '..')
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const auditFiles = readdirSync(resolve(root, 'scripts'))
  .filter((file) => file.endsWith('audit.mjs'))
  .map((file) => `scripts/${file}`)
  .sort()
const report = analyzeReleaseGraph({ scripts: packageJson.scripts || {}, auditFiles })
const failures = [
  ...report.missingScripts.map((name) => `reachable npm script is undefined: ${name}`),
  ...report.cycles.map((cycle) => `reachable npm script cycle: ${cycle}`),
  ...report.unsafeCommands.map((name) =>
    `reachable npm script can swallow or detach a release-gate failure: ${name}`),
  ...report.unreachableAudits.map((file) => `audit is not reachable from npm run check: ${file}`),
  ...report.missingAuditFiles.map((file) => `npm run check names a missing audit file: ${file}`),
]

if (failures.length) {
  console.error(`\nRELEASE-GATE COVERAGE FAILED (${failures.length})`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`✓ all ${auditFiles.length} audit scripts are transitively reachable from npm run check; graph fixtures fail closed.`)
}
