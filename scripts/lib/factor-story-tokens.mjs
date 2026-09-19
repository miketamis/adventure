import { Buffer } from 'node:buffer'

const byteLength = (value) => Buffer.byteLength(value, 'utf8')

const walk = (node, visit) => {
  if (!node || typeof node.type !== 'string') return
  visit(node)
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach((child) => walk(child, visit))
    else if (value && typeof value.type === 'string') walk(value, visit)
  }
}

// Only binding positions count. A property named wf, for example in
// { wf: otherName }, does not shadow the module's token helper.
const patternNames = (pattern, names = []) => {
  if (!pattern) return names
  switch (pattern.type) {
    case 'Identifier': names.push(pattern.name); break
    case 'RestElement': patternNames(pattern.argument, names); break
    case 'AssignmentPattern': patternNames(pattern.left, names); break
    case 'ArrayPattern': pattern.elements.forEach((element) => patternNames(element, names)); break
    case 'ObjectPattern':
      pattern.properties.forEach((property) => patternNames(
        property.type === 'RestElement' ? property.argument : property.value, names,
      ))
      break
  }
  return names
}

const functionTypes = new Set(['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'])

const canonicalBinding = (ast) => {
  const exports = ast.body.filter((statement) => statement.type === 'ExportNamedDeclaration')
  const candidates = exports.flatMap((statement) => {
    const declaration = statement.declaration
    if (declaration?.type === 'FunctionDeclaration' && declaration.id?.name === 'wf') {
      return [{ statement, binding: declaration }]
    }
    if (declaration?.type !== 'VariableDeclaration') return []
    return declaration.declarations.filter((binding) =>
      binding.id?.type === 'Identifier' && binding.id.name === 'wf',
    ).map((binding) => ({ statement, binding }))
  })
  if (!candidates.length) return null
  if (candidates.length !== 1) throw new Error('Token factoring requires one canonical exported wf binding')
  const candidate = candidates[0]
  const declaration = candidate.statement.declaration
  // Keep the supported source contract deliberately narrow: the production
  // token helper is a sole exported const, not a mutable or hoisted binding.
  if (declaration.type !== 'VariableDeclaration' || declaration.kind !== 'const' ||
      declaration.declarations.length !== 1 || !functionTypes.has(candidate.binding.init?.type)) {
    throw new Error('Token factoring requires a sole exported const wf function declaration')
  }
  return candidate
}

const assertUnshadowed = (ast, canonical) => walk(ast, (node) => {
  let bindings = []
  if (node.type === 'VariableDeclarator' && node !== canonical.binding) bindings = patternNames(node.id)
  if (functionTypes.has(node.type)) {
    bindings = node.params.flatMap((parameter) => patternNames(parameter))
    if (node !== canonical.binding && node.id) bindings.push(node.id.name)
  }
  if (node.type === 'CatchClause') bindings = patternNames(node.param)
  if (['ClassDeclaration', 'ClassExpression'].includes(node.type) && node.id) bindings = [node.id.name]
  if (['ImportSpecifier', 'ImportDefaultSpecifier', 'ImportNamespaceSpecifier'].includes(node.type)) {
    bindings = [node.local.name]
  }
  if (bindings.includes('wf')) {
    throw new Error(`Token factoring cannot prove wf scope safety: shadow binding at ${node.start}`)
  }
})

const literalArguments = (call) => {
  const args = call.arguments
  if (args.length !== 2 && args.length !== 3) return null
  if (args.slice(0, 2).some((argument) => argument.type !== 'Literal' || typeof argument.value !== 'string')) return null
  if (args.length === 3 && (args[2].type !== 'Literal' ||
      (typeof args[2].value !== 'string' && args[2].value !== null))) return null
  return args.map((argument) => argument.value)
}

/**
 * Build-only compression of exact, repeated wf argument tuples. The generated
 * factory calls wf at the original evaluation site: dictionary lookup, errors,
 * allocation, and argument arity remain owned by the original helper.
 *
 * Pass a fresh ESTree AST for this exact code, after metadata/readings deferral.
 * Unsupported calls remain source-identical. A shadow binding fails closed;
 * a reduced fixture/module without the canonical export is an explicit no-op.
 * The byte estimate selects candidates only; the release gate measures gzip.
 */
export function factorStoryTokens(code, ast, { minOccurrences = 3, minSavingsBytes = 1 } = {}) {
  if (typeof code !== 'string' || ast?.type !== 'Program' || !Array.isArray(ast.body)) {
    throw new TypeError('Token factoring requires source text and its Program AST')
  }
  if (!Number.isSafeInteger(minOccurrences) || minOccurrences < 2 ||
      !Number.isSafeInteger(minSavingsBytes) || minSavingsBytes < 1) {
    throw new TypeError('Token factoring thresholds must require repeated calls and positive byte savings')
  }
  const stats = {
    eligibleCalls: 0, dynamicCalls: 0, earlyCalls: 0,
    factories: 0, replacedCalls: 0, estimatedSavingsBytes: 0, reason: null,
  }
  const canonical = canonicalBinding(ast)
  if (!canonical) return { code, stats: { ...stats, reason: 'no-canonical-binding' } }
  assertUnshadowed(ast, canonical)

  const insertionAt = canonical.statement.end
  const names = new Set()
  const groups = new Map()
  walk(ast, (node) => {
    if (node.type === 'Identifier') names.add(node.name)
    if (node.type !== 'CallExpression' || node.callee?.type !== 'Identifier' ||
        node.callee.name !== 'wf' || node.optional) return
    const args = literalArguments(node)
    if (!args) { stats.dynamicCalls++; return }
    // Leave the canonical initializer and the preceding source untouched.
    // Generated factories are hoisted, so later builders still reach wf's
    // own initialization boundary even when they are called early.
    if (node.start < insertionAt) { stats.earlyCalls++; return }
    stats.eligibleCalls++
    const key = JSON.stringify(args)
    if (!groups.has(key)) groups.set(key, { args, calls: [] })
    groups.get(key).calls.push(node)
  })

  const declarations = []
  const replacements = []
  let nextName = 0
  for (const group of groups.values()) {
    if (group.calls.length < minOccurrences) continue
    let name
    do { name = `_wfToken${nextName++}` } while (names.has(name))
    const replacement = `${name}()`
    const declaration = `\nfunction ${name}(){return wf(${group.args.map((value) => JSON.stringify(value)).join(',')});}`
    const saving = group.calls.reduce((total, call) =>
      total + byteLength(code.slice(call.start, call.end)) - byteLength(replacement), 0,
    ) - byteLength(declaration) - (declarations.length ? 0 : 1)
    if (saving < minSavingsBytes) continue
    names.add(name)
    declarations.push(declaration)
    for (const call of group.calls) replacements.push({ start: call.start, end: call.end, text: replacement })
    stats.factories++
    stats.replacedCalls += group.calls.length
    stats.estimatedSavingsBytes += saving
  }
  if (!declarations.length) return { code, stats: { ...stats, reason: 'no-profitable-groups' } }
  // A trailing newline separates our declarations from a following line
  // comment or statement; include it in the reported exact source-byte delta.
  replacements.push({ start: insertionAt, end: insertionAt, text: `${declarations.join('')}\n` })
  let transformed = code
  for (const { start, end, text } of replacements.sort((left, right) => right.start - left.start)) {
    transformed = transformed.slice(0, start) + text + transformed.slice(end)
  }
  stats.estimatedSavingsBytes = byteLength(code) - byteLength(transformed)
  return { code: transformed, stats }
}
