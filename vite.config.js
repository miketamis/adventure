import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execFileSync } from 'node:child_process'
import { factorStoryTokens } from './scripts/lib/factor-story-tokens.mjs'

const buildCommit = process.env.GITHUB_SHA || execFileSync(
  'git',
  ['rev-parse', 'HEAD'],
  { encoding: 'utf8' },
).trim()

// Keep large, stable authored datasets out of the release shell. Story and
// dictionary data are fetched for first play; research/lore catalogs remain
// on demand. Independent chunks let browsers cache either kind without a
// one-line UI repair invalidating the whole anthology payload.
const authoredChunk = (id) => {
  const path = id.replaceAll('\\', '/')
  // PostHog starts after the application shell. Keep it out of the eager React
  // vendor chunk so its replay runtime remains an independently cached asset.
  if (path.includes('/node_modules/posthog-js/') || path.includes('/node_modules/@posthog/')) {
    return 'analytics-vendor'
  }
  if (path.includes('/node_modules/')) return 'react-vendor'
  // Replay-safe transition encoding is required from first play, but it is a
  // stable subsystem rather than shell/UI code. Keep it in the eager closure
  // without making every small App edit invalidate or inflate the shell.
  if (path.endsWith('/src/game/playtestAnalytics.js')) return 'playtest-analytics'
  // The bounded interaction monitor is shared by the shell and deferred Train
  // and diagnostics routes. Cache that stable instrumentation independently
  // from navigation/UI changes. It remains eager: the aggregate bootstrap
  // budgets still account for every byte and may not be relaxed for this split.
  if (path.endsWith('/src/performance.js')) return 'performance-monitor'
  if (path.endsWith('/src/game/content.js')) return 'story-graph'
  if (path.endsWith('/src/game/language.js')) return 'language-runtime'
  if (path.endsWith('/src/components/nodePositions.js')) return 'world-layout'
  if (
    path.endsWith('/src/game/stateMechanics.js') ||
    path.endsWith('/src/game/everydayAlbanian.js') ||
    path.endsWith('/src/game/quests.js') ||
    path.endsWith('/src/game/economy.js') ||
    path.endsWith('/src/game/phraseProgression.js') ||
    path.endsWith('/src/game/adaptiveLearning.js') ||
    path.endsWith('/src/game/learningTelemetry.js') ||
    path.endsWith('/src/game/lexicalTrainability.js') ||
    path.endsWith('/src/game/wordProgression.js') ||
    path.endsWith('/src/game/trainingProgression.js')
  ) return 'state-mechanics'
  if (path.endsWith('/src/game/dictionary.js') || path.endsWith('/src/game/nounForms.js')) {
    return 'dictionary-catalog'
  }
  if (path.endsWith('/src/game/folklore.js')) return 'folklore-catalog'
  if (path.endsWith('/src/game/quotes.js')) return 'quote-register'
  if (path.includes('/src/game/data/npcs/')) return 'npc-catalog'
  // Exact physical source ledgers are debug-only and partitioned for caching.
  if (path.includes('/src/game/data/worldScene3dNodeClaims/')) return `world-node-claims-${path.split('/').at(-1).replace(/\.js$/, '')}`
  return undefined
}

const astPropertyName = (node) => {
  if (!node) return null
  if (node.type === 'Identifier') return node.name
  if (node.type === 'Literal') return String(node.value)
  return null
}

const walkAst = (node, visit) => {
  if (!node || typeof node !== 'object') return
  visit(node)
  for (const [key, child] of Object.entries(node)) {
    if (key === 'start' || key === 'end' || key === 'loc') continue
    if (Array.isArray(child)) child.forEach((entry) => walkAst(entry, visit))
    else if (child && typeof child.type === 'string') walkAst(child, visit)
  }
}

const memberExpressionRoot = (node) => {
  let current = node
  while (current?.type === 'MemberExpression') current = current.object
  return current
}

const stripStoryAuditMetadata = (code, ast) => {
  const replacements = []
  const removeProperty = (properties, index) => {
    const property = properties[index]
    const next = properties[index + 1]
    const previous = properties[index - 1]
    if (next) replacements.push([property.start, next.start, ''])
    else if (previous) replacements.push([previous.end, property.end, ''])
    else replacements.push([property.start, property.end, ''])
  }
  // These notes explain authored conversation topics to source audits. They
  // have no browser consumer; operational topic fields remain untouched.
  // Require explicit literals so a new indirection cannot silently evade this
  // boundary. Other objects' `purpose` fields are runtime data, not this contract.
  const explicitProperties = (node, label) => {
    if (node?.type !== 'ObjectExpression') throw new Error(`${label} requires an explicit object`)
    const seen = new Set()
    for (const property of node.properties) {
      const name = astPropertyName(property.key)
      if (property.type !== 'Property' || property.computed || property.method ||
          property.kind !== 'init' || !name || seen.has(name)) {
        throw new Error(`${label} requires unique explicit properties`)
      }
      seen.add(name)
    }
    return node.properties
  }
  walkAst(ast, (candidate) => {
    if (candidate.type === 'CallExpression' && candidate.callee?.type === 'Identifier' &&
        candidate.callee.name === 'defineConversationHub') {
      if (candidate.arguments.length !== 1) throw new Error('defineConversationHub requires one explicit object')
      const hub = explicitProperties(candidate.arguments[0], 'defineConversationHub')
      const questions = explicitProperties(hub.find((property) => astPropertyName(property.key) === 'questions')?.value,
        'defineConversationHub questions')
      for (const question of questions) {
        const fields = explicitProperties(question.value, 'defineConversationHub question')
        for (const [index, field] of fields.entries()) {
          if (astPropertyName(field.key) !== 'purpose') continue
          if (field.value?.type !== 'Literal' || typeof field.value.value !== 'string' || !field.value.value.trim()) {
            throw new Error('defineConversationHub question purpose requires a nonempty static string')
          }
          removeProperty(fields, index)
        }
      }
    }
    if (
      candidate.type === 'CallExpression' &&
      candidate.callee?.type === 'Identifier' &&
      candidate.callee.name === 'S' &&
      candidate.arguments?.[0]
    ) {
      const line = candidate.arguments[0]
      replacements.push([candidate.start, candidate.end, code.slice(line.start, line.end)])
    }
    if (candidate.type !== 'ObjectExpression') return
    const properties = candidate.properties || []
    for (const [index, property] of properties.entries()) {
      if (property.type !== 'Property' || astPropertyName(property.key) !== 'actionSemantics') continue
      removeProperty(properties, index)
    }
  })
  let transformed = code
  for (const [start, end, replacement] of replacements.sort(([left], [right]) => right - left)) {
    transformed = `${transformed.slice(0, start)}${replacement}${transformed.slice(end)}`
  }
  return transformed
}

const stripStoryReadings = (code, ast) => {
  const readingCalls = new Map()
  const replacements = []
  const collectReadings = (node, reviewedFactory = false) => walkAst(node, (candidate) => {
    const reading = candidate.arguments?.[0]
    const isStaticReading = (
      reading?.type === 'Literal' && typeof reading.value === 'string'
    ) || (
      reading?.type === 'TemplateLiteral' && reading.expressions.length === 0
    )
    if (
      candidate.type === 'CallExpression' &&
      candidate.callee?.type === 'Identifier' &&
      candidate.callee.name === 'R' &&
      reading && (isStaticReading || reviewedFactory)
    ) readingCalls.set(candidate.start, candidate)
  })

  // Readings in each node's authored text and option arrays. Static actions
  // already have address-pinned copies in the deferred reviewed-option
  // registry, which StoryView attaches before it renders. Keeping their second
  // copy in the eager graph wastes bootstrap bytes and exposes debug-only
  // metadata before the debug surface requests it.
  walkAst(ast, (candidate) => {
    if (candidate.type !== 'VariableDeclarator' || candidate.id?.name !== 'STORY') return
    for (const storyNode of candidate.init?.properties || []) {
      if (storyNode.type !== 'Property' || storyNode.value?.type !== 'ObjectExpression') continue
      for (const field of storyNode.value.properties) {
        if (
          field.type === 'Property' &&
          ['text', 'options'].includes(astPropertyName(field.key))
        ) {
          collectReadings(field.value)
        }
      }
    }
  })

  // Reused story fragments live outside the STORY literal so the production
  // graph stores them once. Their readings remain deferred under the same
  // normal-play boundary as inline node text and actions.
  walkAst(ast, (candidate) => {
    if (
      candidate.type === 'VariableDeclarator' &&
      candidate.id?.type === 'Identifier' &&
      candidate.id.name.startsWith('FOREST_ORA_')
    ) collectReadings(candidate.init)
  })

  // Only explicitly marked factories may defer computed English. Their calls
  // materialize address-reviewed story lines during module construction;
  // unmarked money/context builders still own their runtime readings.
  walkAst(ast, (candidate) => {
    if (candidate.type !== 'CallExpression' || candidate.callee?.name !== 'reviewedStoryLineFactory') return
    const factory = candidate.arguments[0]
    if (candidate.arguments.length !== 1 ||
        !['ArrowFunctionExpression', 'FunctionExpression'].includes(factory?.type)) {
      throw new Error('reviewedStoryLineFactory requires one explicit function')
    }
    collectReadings(factory.body, true)
    // The marker is an authoring/build contract, not a runtime indirection.
    replacements.push([candidate.start, factory.start, '('], [factory.end, candidate.end, ')'])
  })

  // Explicit node-keyed line maps are installed as reviewed confuser options.
  // Only their static readings are deferred; the release gate resolves every
  // removed reading to its exact installed option and exercises hydration.
  walkAst(ast, (candidate) => {
    if (candidate.type !== 'CallExpression' || candidate.callee?.name !== 'reviewedStoryLineMap') return
    const lines = candidate.arguments[0]
    if (candidate.arguments.length !== 1 || lines?.type !== 'ObjectExpression') {
      throw new Error('reviewedStoryLineMap requires one explicit object')
    }
    collectReadings(lines)
    replacements.push([candidate.start, lines.start, '('], [lines.end, candidate.end, ')'])
  })

  // Reviewed text and static actions appended after the main object use the
  // same deferred corpora. Generated readings remain owned by their builders.
  walkAst(ast, (candidate) => {
    if (
      candidate.type !== 'CallExpression' ||
      astPropertyName(candidate.callee?.property) !== 'push'
    ) return
    const container = candidate.callee.object
    const root = memberExpressionRoot(container?.object)
    if (
      container?.type === 'MemberExpression' &&
      ['text', 'options'].includes(astPropertyName(container.property)) &&
      root?.type === 'Identifier' && root.name === 'STORY'
    ) candidate.arguments.forEach((argument) => collectReadings(argument))
  })

  for (const candidate of readingCalls.values()) {
    const reading = candidate.arguments[0]
    const firstToken = candidate.arguments[1]
    const composedLineCall = (
      firstToken?.type === 'CallExpression' &&
      firstToken.callee?.type === 'Identifier' &&
      ['L', 'Q'].includes(firstToken.callee.name)
    )
    // R(reading, Q(...)) and R(reading, L(...)) can become the inner line
    // verbatim. Q already owns its quote metadata, and L already owns the
    // array; retaining R('', ...) would add an empty debug-only property to the
    // production graph for no player-facing benefit.
    if (candidate.arguments.length === 2 && composedLineCall) {
      replacements.push([candidate.start, candidate.end, code.slice(firstToken.start, firstToken.end)])
      continue
    }
    const directTokenCall = (
      firstToken?.type === 'CallExpression' &&
      firstToken.callee?.type === 'Identifier' &&
      ['w', 'wf', 'p'].includes(firstToken.callee.name)
    )
    // Direct R(reading, token...) calls need no production metadata wrapper at
    // all: turn them into ordinary L(token...) lines. Other unusual composed
    // calls retain R with an empty reading so their array semantics stay intact.
    const canBecomePlainLine = (
      candidate.arguments.length > 2 ||
      directTokenCall ||
      firstToken?.type === 'SpreadElement'
    )
    if (canBecomePlainLine) {
      replacements.push([candidate.callee.start, candidate.callee.end, 'L'])
      replacements.push([reading.start, firstToken.start, ''])
    } else {
      replacements.push([reading.start, reading.end, "''"])
    }
  }

  let transformed = code
  for (const [start, end, replacement] of replacements.sort(([left], [right]) => right - left)) {
    transformed = `${transformed.slice(0, start)}${replacement}${transformed.slice(end)}`
  }
  return transformed
}

// Source and audit runs retain R('English', tokens). Production removes
// reviewed STORY text/action literals from the eager graph; debug mode hydrates
// those readings from the deferred corpora. Dynamic/generated readings remain
// intact.
const deferStoryReadings = () => ({
  name: 'defer-reviewed-story-readings',
  apply: 'build',
  transform(code, rawId) {
    const id = rawId.split('?')[0].replaceAll('\\', '/')
    if (!id.endsWith('/src/game/content.js')) return null
    const withoutAuditMetadata = stripStoryAuditMetadata(code, this.parse(code))
    return {
      code: stripStoryReadings(withoutAuditMetadata, this.parse(withoutAuditMetadata)),
      map: null,
    }
  },
})

// Factor only after the reading pass has recognized the original token calls.
// This does not move data out of the measured eager closure or change source
// authoring: each generated factory still allocates through the canonical wf.
const factorStoryTokenCalls = () => ({
  name: 'factor-literal-story-tokens',
  apply: 'build',
  transform(code, rawId) {
    const id = rawId.split('?')[0].replaceAll('\\', '/')
    if (!id.endsWith('/src/game/content.js')) return null
    const result = factorStoryTokens(code, this.parse(code))
    return result.code === code ? null : { code: result.code, map: null }
  },
})

export default defineConfig({
  // served from https://miketamis.github.io/adventure/
  base: '/adventure/',
  define: {
    __BUILD_COMMIT__: JSON.stringify(buildCommit),
  },
  plugins: [deferStoryReadings(), factorStoryTokenCalls(), react()],
  build: {
    rollupOptions: {
      output: { manualChunks: authoredChunk },
    },
    // The largest authored datasets are intentionally substantial. The stricter
    // raw and gzip release budgets live in scripts/bundleaudit.mjs; this limit
    // keeps Vite's generic warning useful for chunks the project has not
    // explicitly measured.
    // Decimal-kB counterpart to the binary 899 KiB authored-chunk release
    // ceiling in bundleaudit.mjs.
    chunkSizeWarningLimit: 921,
  },
})
