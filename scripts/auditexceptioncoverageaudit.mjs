// Repository-wide ownership gate for deterministic audit exceptions.
//
// Identifier matching only finds review candidates; it never decides that a
// declaration is safe. Every candidate must either belong to a named audit
// that uses the shared exact-exception contract, or have an exact positive
// classification below. Stale classifications fail so this cannot become an
// accumulating ignore list.
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const SUSPECT_IDENTIFIER_PATTERN = /^(?=[A-Z][A-Z0-9_]*$)[A-Z0-9_]*(?:ALLOW_?LIST|WHITE_?LIST|EXCEPTIONS?|EXEMPTIONS?|WAIVERS?|GRANDFATHER|BACKLOG|FIXTURES?)[A-Z0-9_]*$/

// These audits own true rule exceptions. The identifier lists are exact and
// intentionally include imported canonical exception records/rules as well as
// locally defined registries. A new owner or registry must be reviewed here.
export const STRUCTURED_GATE_OWNERS = Object.freeze({
  'scripts/audit.mjs': Object.freeze(['DEEP_AUDIT_EXCEPTIONS', 'EXCEPTION_RULES']),
  'scripts/cefrtaskaudit.mjs': Object.freeze(['CEFR_LEXICAL_EXCEPTIONS']),
  'scripts/consequencecoherenceaudit.mjs': Object.freeze(['LOCAL_ONLY_FIXTURE_EXCEPTIONS']),
  'scripts/heartconsequenceaudit.mjs': Object.freeze(['HEART_CONSEQUENCE_EXCEPTIONS']),
  'scripts/inflectionpolicyaudit.mjs': Object.freeze(['GENERATED_FORM_EXCEPTIONS']),
  'scripts/languageaudit.mjs': Object.freeze(['OPTION_READING_EXCEPTIONS']),
  'scripts/mapaudit.mjs': Object.freeze([
    'STRUCTURAL_EXCEPTIONS',
    'STRUCTURAL_EXCEPTION_RULES',
    'STRUCTURAL_EXCEPTION_REGISTRY',
    'MAP_LAYOUT_EXCEPTION_RULES',
    'MAP_LAYOUT_EXCEPTION_REGISTRY',
  ]),
  'scripts/narrativeflowaudit.mjs': Object.freeze(['NARRATIVE_FLOW_EXCEPTIONS']),
  'scripts/storystats.mjs': Object.freeze([
    'COMPACT_ENDING_EXCEPTIONS',
    'UNGATED_CHOICE_EXCEPTIONS',
  ]),
  'scripts/worldaudit.mjs': Object.freeze([
    'STRUCTURAL_EXCEPTIONS',
    'STRUCTURAL_EXCEPTION_RULES',
    'STRUCTURAL_EXCEPTION_REGISTRY',
    'WORLD_LAYOUT_EXCEPTION_RULES',
    'WORLD_LAYOUT_EXCEPTION_REGISTRY',
  ]),
  'scripts/worldtextureaudit.mjs': Object.freeze(['WORLD_TEXTURE_EXCEPTIONS']),
})

// Spread results are accepted only inside these exact collectors, and only
// while each collector still reaches its file's terminal failure path. Direct
// assertions and failure-loop iteration are recognized structurally below.
const COLLECTED_VALIDATION_SINKS = Object.freeze({
  'scripts/audit.mjs': Object.freeze([{
    start: "add('structured deep-audit exceptions are exact, bounded and live', [",
    end: '// ---- report',
    requiredSinks: Object.freeze(['if (c.fails.length)', 'process.exit(failed || childProcessFailed(map) ? 1 : 0)']),
  }]),
  'scripts/mapaudit.mjs': Object.freeze([{
    start: 'const exceptionIssues = [',
    end: 'section(!exceptionIssues.length',
    requiredSinks: Object.freeze(['if (!ok) failures++', 'process.exitCode = failures ? 1 : 0']),
  }]),
  'scripts/storystats.mjs': Object.freeze([{
    start: 'const compactExceptionIssues = [',
    end: '// ---- deepest structural route',
    requiredSinks: Object.freeze(['compactExceptionIssues.length ||', 'process.exitCode = 1']),
  }]),
  'scripts/worldaudit.mjs': Object.freeze([{
    start: 'const malformedExceptions = [',
    end: 'if (malformedExceptions.length)',
    requiredSinks: Object.freeze([
      "if (malformedExceptions.length) fail('exceptions.invalid'",
      'process.exitCode = counts.errors || (strict && counts.warnings) ? 1 : 0',
    ]),
  }]),
})

// Exact false-positive classifications. These declarations describe positive
// runtime state, fail-closed editorial work queues, or fixture integrity; none
// suppresses a release-audit violation. Each record must still name a live
// declaration, so removing or renaming it forces this table to be cleaned up.
export const DECLARATION_CLASSIFICATIONS = Object.freeze([
  {
    file: 'scripts/conversationhubaudit.mjs',
    identifier: 'LEGACY_SUPPLIED_REPLY_BACKLOG',
    kind: 'editorial-backlog',
    rationale: 'An exact equality assertion makes any newly detected supplied reply fail until this explicit migration queue is reviewed.',
  },
  {
    file: 'scripts/fixtureactionaudit.mjs',
    identifier: 'FIXTURE_ACTION_IDS',
    kind: 'positive-registry',
    rationale: 'This canonical action-id registry is required to match every timed fixture action surface and does not suppress an audit finding.',
  },
  {
    file: 'scripts/fixtureactionaudit.mjs',
    identifier: 'TIMED_WORLD_FIXTURE_ISSUES',
    kind: 'positive-integrity-report',
    rationale: 'This imported diagnostics array must be empty; it reports malformed positive world fixtures and never suppresses a failure.',
  },
  {
    file: 'scripts/fixtureactionaudit.mjs',
    identifier: 'TIMED_WORLD_FIXTURES',
    kind: 'positive-registry',
    rationale: 'This is the canonical registry of interactive timed world objects whose complete action surface is asserted by the audit.',
  },
  {
    file: 'scripts/consequencecoherenceaudit.mjs',
    identifier: 'TIMED_WORLD_FIXTURES',
    kind: 'positive-registry',
    rationale: 'This is the canonical registry of timed world objects enumerated to prove that each fixture has a downstream state consumer.',
  },
  {
    file: 'scripts/mechanicsaudit.mjs',
    identifier: 'TIMED_WORLD_FIXTURES',
    kind: 'positive-registry',
    rationale: 'This positive world-object registry is enumerated for valid effects and complete authored activation, not used to excuse failures.',
  },
  {
    file: 'scripts/statefuzzaudit.mjs',
    identifier: 'TIMED_WORLD_FIXTURES',
    kind: 'positive-registry',
    rationale: 'This positive world-object registry supplies fuzzable canonical fixture states and does not bypass a state invariant.',
  },
  {
    file: 'scripts/worldentityaudit.mjs',
    identifier: 'TIMED_WORLD_FIXTURES',
    kind: 'positive-registry',
    rationale: 'This positive world-object registry is joined to canonical entities so every authored fixture receives an identity.',
  },
  {
    file: 'scripts/inflectionpolicyaudit.mjs',
    identifier: 'NOUN_PARADIGM_BACKLOG_IDS',
    kind: 'editorial-backlog',
    rationale: 'This fail-closed language-work queue prevents an unreviewed noun paradigm from being treated as complete or trainable.',
  },
  {
    file: 'scripts/languageaudit.mjs',
    identifier: 'LIST_BACKLOG',
    kind: 'cli-control',
    rationale: 'This command-line reporting flag only prints missing-form editorial work and never changes pass or fail decisions.',
  },
  {
    file: 'scripts/namedentitylearningaudit.mjs',
    identifier: 'NOUN_PARADIGM_BACKLOG',
    kind: 'editorial-backlog',
    rationale: 'This classified noun-review queue is enumerated to keep proper names out of lexical training, not to suppress a finding.',
  },
  {
    file: 'scripts/nodelen.mjs',
    identifier: 'TIMED_WORLD_FIXTURES',
    kind: 'positive-registry',
    rationale: 'This positive world-object registry expands valid fixture-state combinations while measuring projected scene length.',
  },
  {
    file: 'scripts/nounparadigmaudit.mjs',
    identifier: 'NOUN_NUMBER_POLICIES',
    kind: 'positive-registry',
    rationale: 'This audit-only editorial registry explains exact singular-only or plural-only role inventories; the audit checks live, stale-free agreement while runtime remains owned solely by NOUN_FORMS.',
  },
  {
    file: 'scripts/nounparadigmaudit.mjs',
    identifier: 'NOUN_PARADIGM_BACKLOG',
    kind: 'editorial-backlog',
    rationale: 'This grouped noun-review queue is checked for complete, unique membership and cannot make an incomplete paradigm pass.',
  },
  {
    file: 'scripts/nounparadigmaudit.mjs',
    identifier: 'NOUN_PARADIGM_BACKLOG_IDS',
    kind: 'editorial-backlog',
    rationale: 'This flattened noun-review queue must exactly equal the grouped backlog and remains disjoint from completed paradigms.',
  },
  {
    file: 'scripts/quotecheck.mjs',
    identifier: 'GAME_TRANSLATION_FIXTURES',
    kind: 'positive-integrity-report',
    rationale: 'These exact regression expectations must equal the public displayed-line translations and cannot suppress a mismatch.',
  },
])

const classificationKey = (file, identifier) => `${file}\u0000${identifier}`

// Remove comments and string bodies before discovering declarations. Newlines
// are preserved for stable debugging, while identifiers and import bindings
// remain available to the deliberately small syntax scanner below.
export function codeSkeleton(source) {
  let output = ''
  let state = 'code'
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index]
    const next = source[index + 1]
    if (state === 'code') {
      if (char === '/' && next === '/') { output += '  '; index += 1; state = 'line-comment'; continue }
      if (char === '/' && next === '*') { output += '  '; index += 1; state = 'block-comment'; continue }
      if (char === '/' && (!output.trimEnd() || '=([{,:;!&|?'.includes(output.trimEnd().at(-1)))) {
        output += ' '
        state = 'regex'
        continue
      }
      if (char === "'") { output += ' '; state = 'single-quote'; continue }
      if (char === '"') { output += ' '; state = 'double-quote'; continue }
      if (char === '`') { output += ' '; state = 'template'; continue }
      output += char
      continue
    }
    if (char === '\n') {
      output += '\n'
      if (state === 'line-comment') state = 'code'
      continue
    }
    output += ' '
    if (char === '\\' && ['single-quote', 'double-quote', 'template', 'regex', 'regex-class'].includes(state)) {
      if (index + 1 < source.length) { output += ' '; index += 1 }
      continue
    }
    if ((state === 'single-quote' && char === "'") ||
        (state === 'double-quote' && char === '"') ||
        (state === 'template' && char === '`')) state = 'code'
    if (state === 'regex' && char === '[') state = 'regex-class'
    else if (state === 'regex-class' && char === ']') state = 'regex'
    else if (state === 'regex' && char === '/') state = 'code'
    if (state === 'block-comment' && char === '*' && next === '/') {
      output += ' '
      index += 1
      state = 'code'
    }
  }
  return output
}

export function declaredIdentifiers(source) {
  const skeleton = codeSkeleton(source)
  const identifiers = new Set()
  for (const match of skeleton.matchAll(/\b(?:export\s+)?(?:const|let|var|function|class)\s+([A-Za-z_$][\w$]*)/g)) {
    identifiers.add(match[1])
  }
  for (const match of skeleton.matchAll(/\bimport\s*\{([\s\S]*?)\}\s*from\b/g)) {
    for (const rawBinding of match[1].split(',')) {
      const binding = rawBinding.trim()
      if (!binding) continue
      const local = binding.split(/\s+as\s+/).at(-1)?.trim()
      if (/^[A-Za-z_$][\w$]*$/.test(local)) identifiers.add(local)
    }
  }
  return identifiers
}

const matchingCallEnd = (skeleton, openIndex) => {
  let depth = 0
  for (let index = openIndex; index < skeleton.length; index += 1) {
    if (skeleton[index] === '(') depth += 1
    else if (skeleton[index] === ')') {
      depth -= 1
      if (depth === 0) return index
    }
  }
  return -1
}

const collectedValidationIsFailClosed = (file, source, start) =>
  (COLLECTED_VALIDATION_SINKS[file] || []).some((sink) => {
    const rangeStart = source.indexOf(sink.start)
    const rangeEnd = source.indexOf(sink.end, Math.max(0, rangeStart + sink.start.length))
    return rangeStart >= 0 && rangeEnd > rangeStart && start > rangeStart && start < rangeEnd &&
      sink.requiredSinks.every((marker) => source.includes(marker))
  })

export function validationConsumptionIssues(file, source) {
  const skeleton = codeSkeleton(source)
  const issues = []
  const strictAssertImported = /import\s+assert\s+from\s+['"]node:assert\/strict['"]/.test(source)
  const failureFunctionIsTerminal = /const\s+fail\s*=\s*\([^)]*\)\s*=>\s*failures\.push\s*\(/.test(skeleton) &&
    /if\s*\(failures\.length\)[\s\S]*?process\.exitCode\s*=\s*1/.test(skeleton)
  for (const validationName of ['auditExceptionRegistryIssues', 'auditExceptionUsageIssues']) {
    const callPattern = new RegExp(`\\b${validationName}\\s*\\(`, 'g')
    for (const match of skeleton.matchAll(callPattern)) {
      const openIndex = skeleton.indexOf('(', match.index)
      const closeIndex = matchingCallEnd(skeleton, openIndex)
      const before = skeleton.slice(0, match.index)
      const after = closeIndex < 0 ? '' : skeleton.slice(closeIndex + 1, closeIndex + 500)
      const asserted = strictAssertImported && /assert\.deepEqual\(\s*$/.test(before.slice(-200))
      const loopPrefix = /for\s*\(\s*const\s+[A-Za-z_$][\w$]*\s+of\s*$/.test(before.slice(-250))
      const loopBody = after.match(/^\s*\)\s*(?:\{[\s\S]{0,400}?\}|[^;\n]+[;\n])/)?.[0] || ''
      const pushedCollector = loopBody.match(/\b([A-Za-z_$][\w$]*)\.push\s*\(/)?.[1]
      const pushedCollectorIsTerminal = Boolean(pushedCollector) &&
        source.includes(`${pushedCollector}.length`) &&
        /process\.exitCode\s*=\s*1/.test(skeleton)
      const iteratedIntoFailure = loopPrefix &&
        ((/\bfail\s*\(/.test(loopBody) && failureFunctionIsTerminal) || pushedCollectorIsTerminal)
      const collected = /\.\.\.\s*$/.test(before.slice(-20)) &&
        collectedValidationIsFailClosed(file, source, match.index)
      if (!asserted && !iteratedIntoFailure && !collected) {
        issues.push(`${file}: ${validationName} result is ignored or has no recognized fail-closed consumer`)
      }
    }
  }
  return issues
}

export function analyzeAuditExceptionCoverage({
  sources,
  structuredOwners = STRUCTURED_GATE_OWNERS,
  classifications = DECLARATION_CLASSIFICATIONS,
}) {
  const issues = []
  const sourceEntries = Object.entries(sources).sort(([left], [right]) => left.localeCompare(right))
  const declaredByFile = new Map(sourceEntries.map(([file, source]) => [file, declaredIdentifiers(source)]))
  const candidates = new Set()
  for (const [file, identifiers] of declaredByFile) {
    for (const identifier of identifiers) {
      if (SUSPECT_IDENTIFIER_PATTERN.test(identifier)) candidates.add(classificationKey(file, identifier))
    }
  }

  const positiveClassifications = new Map()
  for (const record of classifications) {
    const key = classificationKey(record.file, record.identifier)
    if (positiveClassifications.has(key)) issues.push(`${record.file}: duplicate classification for ${record.identifier}`)
    positiveClassifications.set(key, record)
    if (!['positive-registry', 'positive-integrity-report', 'editorial-backlog', 'cli-control'].includes(record.kind)) {
      issues.push(`${record.file}: ${record.identifier} has unknown classification kind '${record.kind}'`)
    }
    if ((record.rationale?.trim().length || 0) < 60) {
      issues.push(`${record.file}: ${record.identifier} classification rationale is not concrete enough`)
    }
    if (!declaredByFile.get(record.file)?.has(record.identifier)) {
      issues.push(`${record.file}: stale classification for ${record.identifier}`)
    }
  }

  const sharedUsers = new Set()
  for (const [file, source] of sourceEntries) {
    const skeleton = codeSkeleton(source)
    const declared = declaredByFile.get(file)
    if (declared?.has('defineAuditExceptionRegistry') || /\bdefineAuditExceptionRegistry\s*\(/.test(skeleton)) {
      sharedUsers.add(file)
      if (!/\bdefineAuditExceptionRegistry\s*\(/.test(skeleton)) {
        issues.push(`${file}: imports the shared contract but defines no exception registry`)
      }
      if (!/\bauditExceptionRegistryIssues\s*\(/.test(skeleton)) {
        issues.push(`${file}: shared exception contract has no registry validation`)
      }
      if (!/\bauditExceptionUsageIssues\s*\(/.test(skeleton)) {
        issues.push(`${file}: shared exception contract has no usage/staleness validation`)
      }
      issues.push(...validationConsumptionIssues(file, source))
    }
  }

  for (const [file, identifiers] of Object.entries(structuredOwners)) {
    if (!sources[file]) {
      issues.push(`${file}: known exception-bearing audit is missing`)
      continue
    }
    if (!sharedUsers.has(file)) issues.push(`${file}: known exception-bearing audit omitted the shared contract`)
    for (const identifier of identifiers) {
      const key = classificationKey(file, identifier)
      if (!declaredByFile.get(file)?.has(identifier)) {
        issues.push(`${file}: stale structured-exception identifier ${identifier}`)
      } else if (!candidates.has(key)) {
        issues.push(`${file}: structured-exception identifier ${identifier} no longer matches the declaration scanner`)
      }
    }
  }
  for (const file of sharedUsers) {
    if (!structuredOwners[file]) issues.push(`${file}: shared-contract audit is omitted from structured ownership`)
  }

  for (const key of candidates) {
    const separator = key.indexOf('\u0000')
    const file = key.slice(0, separator)
    const identifier = key.slice(separator + 1)
    const structured = structuredOwners[file]?.includes(identifier)
    if (!structured && !positiveClassifications.has(key)) {
      issues.push(`${file}: unclassified legacy allowlist/exception/waiver candidate ${identifier}`)
    }
  }
  return [...new Set(issues)].sort()
}

// Focused fail-closed fixtures: missing validation, an anonymous allowlist,
// ownership omission, and stale positive classifications must all be detected.
const validFixtureSource = `
  import assert from 'node:assert/strict'
  import {
    auditExceptionRegistryIssues,
    auditExceptionUsageIssues,
    defineAuditExceptionRegistry,
  } from './lib/audit-exceptions.mjs'
  const SAMPLE_EXCEPTIONS = defineAuditExceptionRegistry({ rules: {}, entries: [] })
  assert.deepEqual(auditExceptionRegistryIssues(SAMPLE_EXCEPTIONS), [])
  assert.deepEqual(auditExceptionUsageIssues(SAMPLE_EXCEPTIONS, new Set()), [])
`
const fixtureOwners = { 'scripts/sampleaudit.mjs': ['SAMPLE_EXCEPTIONS'] }
assert.deepEqual(analyzeAuditExceptionCoverage({
  sources: { 'scripts/sampleaudit.mjs': validFixtureSource },
  structuredOwners: fixtureOwners,
  classifications: [],
}), [])
assert.ok(analyzeAuditExceptionCoverage({
  sources: { 'scripts/sampleaudit.mjs': validFixtureSource.replace('assert.deepEqual(auditExceptionUsageIssues(SAMPLE_EXCEPTIONS, new Set()), [])', '') },
  structuredOwners: fixtureOwners,
  classifications: [],
}).some((issue) => issue.includes('no usage/staleness validation')))
const ignoredValidationFixtureSource = validFixtureSource
  .replace('assert.deepEqual(auditExceptionRegistryIssues(SAMPLE_EXCEPTIONS), [])',
    'auditExceptionRegistryIssues(SAMPLE_EXCEPTIONS)')
  .replace('assert.deepEqual(auditExceptionUsageIssues(SAMPLE_EXCEPTIONS, new Set()), [])',
    'auditExceptionUsageIssues(SAMPLE_EXCEPTIONS, new Set())')
const ignoredValidationIssues = analyzeAuditExceptionCoverage({
  sources: { 'scripts/sampleaudit.mjs': ignoredValidationFixtureSource },
  structuredOwners: fixtureOwners,
  classifications: [],
})
assert.ok(ignoredValidationIssues.some((issue) => issue.includes('auditExceptionRegistryIssues result is ignored')))
assert.ok(ignoredValidationIssues.some((issue) => issue.includes('auditExceptionUsageIssues result is ignored')))
assert.ok(analyzeAuditExceptionCoverage({
  sources: { 'scripts/sampleaudit.mjs': `${validFixtureSource}\nconst SILENT_ALLOWLIST = new Set()` },
  structuredOwners: fixtureOwners,
  classifications: [],
}).some((issue) => issue.includes('unclassified legacy')))
assert.ok(analyzeAuditExceptionCoverage({
  sources: { 'scripts/sampleaudit.mjs': validFixtureSource },
  structuredOwners: {},
  classifications: [],
}).some((issue) => issue.includes('omitted from structured ownership')))
assert.ok(analyzeAuditExceptionCoverage({
  sources: { 'scripts/nonstandardgate.mjs': validFixtureSource },
  structuredOwners: {},
  classifications: [],
}).some((issue) => issue.includes('scripts/nonstandardgate.mjs: shared-contract audit is omitted')),
'a non-audit-named release script escaped shared-contract ownership coverage')
assert.ok(analyzeAuditExceptionCoverage({
  sources: { 'scripts/sampleaudit.mjs': validFixtureSource },
  structuredOwners: fixtureOwners,
  classifications: [{
    file: 'scripts/sampleaudit.mjs',
    identifier: 'REMOVED_BACKLOG',
    kind: 'editorial-backlog',
    rationale: 'This deliberately stale fixture classification must be rejected by the coverage analyzer.',
  }],
}).some((issue) => issue.includes('stale classification')))

const root = resolve(import.meta.dirname, '..')
const sources = Object.fromEntries(readdirSync(resolve(root, 'scripts'))
  .filter((file) => file.endsWith('.mjs'))
  .sort()
  .map((file) => [`scripts/${file}`, readFileSync(resolve(root, 'scripts', file), 'utf8')]))
const issues = analyzeAuditExceptionCoverage({ sources })
if (issues.length) {
  console.error(`\nAUDIT-EXCEPTION COVERAGE FAILED (${issues.length})`)
  for (const issue of issues) console.error(`- ${issue}`)
  process.exitCode = 1
} else {
  console.log(`✓ ${Object.keys(STRUCTURED_GATE_OWNERS).length} exception-bearing audits use registry and usage validation; ${DECLARATION_CLASSIFICATIONS.length} exact positive declarations are classified and live.`)
}
