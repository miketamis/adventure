import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

// Vite eagerly loads these same source-partition modules through
// npcAppearanceRegistry.js. Node audits use this tiny adapter so both
// environments populate the single shared registry without maintaining a
// second hand-written manifest.
export async function loadNpcAppearancePartitions() {
  const root = resolve(import.meta.dirname, '../../src/game/data/npcAppearances')
  const files = (await readdir(root)).filter((name) => name.endsWith('.js')).sort()
  for (const file of files) await import(pathToFileURL(resolve(root, file)))
  return files
}
