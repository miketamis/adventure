import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Keep large, stable authored datasets out of the release shell. They are still
// fetched for the first playable scene, but independent chunks let browsers
// parse/cache them separately and stop a one-line UI repair from invalidating
// the whole anthology payload.
const authoredChunk = (id) => {
  const path = id.replaceAll('\\', '/')
  if (path.includes('/node_modules/')) return 'react-vendor'
  if (path.endsWith('/src/game/content.js')) return 'story-graph'
  if (path.endsWith('/src/game/nounForms.js')) return 'noun-forms'
  if (path.endsWith('/src/game/folklore.js')) return 'folklore-catalog'
  if (path.endsWith('/src/game/quotes.js')) return 'quote-register'
  if (path.includes('/src/game/data/npcs/')) return 'npc-catalog'
  return undefined
}

export default defineConfig({
  // served from https://miketamis.github.io/adventure/
  base: '/adventure/',
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
