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

export default defineConfig({
  // served from https://miketamis.github.io/adventure/
  base: '/adventure/',
  define: {
    __BUILD_COMMIT__: JSON.stringify(buildCommit),
  },
  plugins: [react()],
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
