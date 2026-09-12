import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execFileSync } from 'node:child_process'

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
  if (path.includes('/node_modules/')) return 'react-vendor'
  if (path.endsWith('/src/game/content.js')) return 'story-graph'
  if (
    path.endsWith('/src/game/stateMechanics.js') ||
    path.endsWith('/src/game/everydayAlbanian.js') ||
    path.endsWith('/src/game/quests.js') ||
    path.endsWith('/src/game/economy.js') ||
    path.endsWith('/src/game/phraseProgression.js') ||
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

const stripStoryReadings = (code, ast) => {
  const ranges = new Map()
  const collectReadings = (node) => walkAst(node, (candidate) => {
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
      isStaticReading
    ) ranges.set(reading.start, reading.end)
  })

  // Readings in each node's authored text array.
  walkAst(ast, (candidate) => {
    if (candidate.type !== 'VariableDeclarator' || candidate.id?.name !== 'STORY') return
    for (const storyNode of candidate.init?.properties || []) {
      if (storyNode.type !== 'Property' || storyNode.value?.type !== 'ObjectExpression') continue
      for (const field of storyNode.value.properties) {
        if (field.type === 'Property' && astPropertyName(field.key) === 'text') {
          collectReadings(field.value)
        }
      }
    }
  })

  // Reviewed text appended after the main object, including additions made in
  // loops for responsive weather and item affordances.
  walkAst(ast, (candidate) => {
    if (
      candidate.type !== 'CallExpression' ||
      astPropertyName(candidate.callee?.property) !== 'push'
    ) return
    const container = candidate.callee.object
    const root = memberExpressionRoot(container?.object)
    if (
      container?.type === 'MemberExpression' &&
      astPropertyName(container.property) === 'text' &&
      root?.type === 'Identifier' && root.name === 'STORY'
    ) candidate.arguments.forEach(collectReadings)
  })

  let transformed = code
  for (const [start, end] of [...ranges.entries()].sort(([left], [right]) => right - left)) {
    transformed = `${transformed.slice(0, start)}''${transformed.slice(end)}`
  }
  return transformed
}

// Source and audit runs retain R('English', tokens). Production removes only
// reviewed STORY-text literals from the eager graph; debug mode hydrates those
// readings from the deferred corpus. Dynamic/generated readings remain intact.
const deferStoryReadings = () => ({
  name: 'defer-reviewed-story-readings',
  apply: 'build',
  transform(code, rawId) {
    const id = rawId.split('?')[0].replaceAll('\\', '/')
    if (!id.endsWith('/src/game/content.js')) return null
    return { code: stripStoryReadings(code, this.parse(code)), map: null }
  },
})

export default defineConfig({
  // served from https://miketamis.github.io/adventure/
  base: '/adventure/',
  define: {
    __BUILD_COMMIT__: JSON.stringify(buildCommit),
  },
  plugins: [deferStoryReadings(), react()],
  build: {
    rollupOptions: {
      output: { manualChunks: authoredChunk },
    },
    // The largest authored datasets are intentionally substantial. The stricter
    // raw and gzip release budgets live in scripts/bundleaudit.mjs; this limit
    // keeps Vite's generic warning useful for chunks the project has not
    // explicitly measured.
    chunkSizeWarningLimit: 800,
  },
})
