// Production-bundle budget. Run after `vite build`.
//
// The anthology deliberately carries a large story graph and a deep source
// archive. The useful release invariant is therefore not "the whole project is
// tiny"; it is that the first playable route stays bounded and optional tools
// remain in lazy chunks. Raw bytes catch accidental inlining, while gzip bytes
// approximate the actual network transfer.
import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { basename, resolve } from 'node:path'

const DIST = resolve('dist')
const ASSETS = resolve(DIST, 'assets')
const AUDIO = resolve(DIST, 'audio')
const KiB = 1024

assert.ok(existsSync(resolve(DIST, 'index.html')), 'dist/index.html is missing; run `npm run build` first')
assert.ok(existsSync(ASSETS), 'dist/assets is missing; run `npm run build` first')
assert.ok(existsSync(AUDIO), 'dist/audio is missing; pronunciation assets were not copied')

const html = readFileSync(resolve(DIST, 'index.html'), 'utf8')
const entryMatch = html.match(/<script[^>]+type="module"[^>]+src="([^"]+\.js)"/)
assert.ok(entryMatch, 'could not identify the production entry script')
const emittedAssetUrls = [...html.matchAll(/(?:src|href)="([^"]*\/assets\/[^"]+)"/g)]
  .map((match) => match[1])
assert.ok(emittedAssetUrls.length > 0, 'index.html does not reference any emitted assets')
assert.ok(emittedAssetUrls.every((url) => url.startsWith('/adventure/assets/')),
  `production assets escaped the GitHub Pages /adventure/ base: ${emittedAssetUrls.join(', ')}`)
assert.match(entryMatch[1], /^\/adventure\/assets\//,
  'production assets must retain the GitHub Pages /adventure/ base path')

const assetRelativePath = entryMatch[1].replace(/^.*?(assets\/)/, '$1')
const entryPath = resolve(DIST, assetRelativePath)
assert.ok(existsSync(entryPath), `entry script does not exist: ${entryMatch[1]}`)

const sizeOf = (path) => {
  const bytes = readFileSync(path)
  return { raw: bytes.length, gzip: gzipSync(bytes, { level: 9 }).length }
}
const display = (bytes) => `${(bytes / KiB).toFixed(1)} KiB`

const entry = sizeOf(entryPath)
const jsFiles = readdirSync(ASSETS)
  .filter((name) => name.endsWith('.js'))
  .map((name) => ({ name, ...sizeOf(resolve(ASSETS, name)) }))
  .sort((a, b) => b.raw - a.raw)
const taleNames = readdirSync(resolve('src/game/data/tales'))
  .filter((name) => name.endsWith('.js') && !name.startsWith('_'))
  .map((name) => name.slice(0, -3))

// A small facade can still hide a very expensive static dependency. Follow the
// production modules' static imports so the ordinary player map cannot silently
// pull in the debug console and its complete source-witness archive again.
const jsByName = new Map(jsFiles.map((file) => [file.name, file]))
const staticDependenciesOf = (name) => {
  const source = readFileSync(resolve(ASSETS, name), 'utf8')
  return [...source.matchAll(/(?:from|import)\s*["']\.\/([^"']+\.js)["']/g)]
    .map((match) => match[1])
    .filter((dependency) => jsByName.has(dependency))
}
const staticClosureOf = (entryName) => {
  const seen = new Set()
  const pending = [entryName]
  while (pending.length) {
    const name = pending.pop()
    if (seen.has(name)) continue
    seen.add(name)
    pending.push(...staticDependenciesOf(name))
  }
  return seen
}
const entryName = basename(entryPath)
const bootstrapNames = staticClosureOf(entryName)
const bootstrap = jsFiles.filter((file) => bootstrapNames.has(file.name))
const lazy = jsFiles.filter((file) => !bootstrapNames.has(file.name))
const totalSize = (files) => files.reduce((sum, file) => ({
  raw: sum.raw + file.raw,
  gzip: sum.gzip + file.gzip,
}), { raw: 0, gzip: 0 })
const bootstrapTotal = totalSize(bootstrap)
const audioFiles = readdirSync(AUDIO)
  .filter((name) => name.endsWith('.mp3'))
  .map((name) => ({ name, raw: readFileSync(resolve(AUDIO, name)).length }))
  .sort((a, b) => b.raw - a.raw)
const audioTotal = audioFiles.reduce((sum, file) => sum + file.raw, 0)
const chunkNamed = (prefix) => {
  const found = jsFiles.filter((file) => file.name.startsWith(`${prefix}-`))
  assert.equal(found.length, 1, `expected one ${prefix} production chunk, found ${found.length}`)
  return found[0]
}

// These are intentional long-lived cache boundaries, not arbitrary filenames.
// If Rollup ever folds one back into the shell, the shell-only budget might
// catch it, but this assertion explains the architectural regression directly.
for (const prefix of ['react-vendor', 'story-graph', 'folklore-catalog', 'quote-register']) {
  const chunk = chunkNamed(prefix)
  assert.ok(bootstrapNames.has(chunk.name), `${prefix} must remain in the initial static closure`)
}
assert.ok(!bootstrapNames.has(chunkNamed('npc-catalog').name),
  'the full NPC catalog should stay deferred until a map/debug surface requests it')

// The release shell is kept independently small, while the full bootstrap
// budget includes its statically imported story graph and authored catalogs.
// This distinguishes a useful cache boundary from pretend byte savings: the
// browser still has to fetch every member of the static closure before play.
const SHELL_RAW_BUDGET = 160 * KiB
const SHELL_GZIP_BUDGET = 55 * KiB
const BOOTSTRAP_RAW_BUDGET = 1_300 * KiB
const BOOTSTRAP_GZIP_BUDGET = 350 * KiB
const BOOTSTRAP_CHUNK_RAW_BUDGET = 700 * KiB
const LAZY_CHUNK_RAW_BUDGET = 600 * KiB
const READING_CHUNK_RAW_BUDGET = 350 * KiB
const READING_CHUNK_GZIP_BUDGET = 100 * KiB
const AUDIO_FILE_BUDGET = 64 * KiB
const AUDIO_TOTAL_BUDGET = 30 * 1024 * KiB

assert.ok(entry.raw <= SHELL_RAW_BUDGET,
  `release shell grew to ${display(entry.raw)} (budget ${display(SHELL_RAW_BUDGET)}); inspect shell imports`)
assert.ok(entry.gzip <= SHELL_GZIP_BUDGET,
  `release shell gzip grew to ${display(entry.gzip)} (budget ${display(SHELL_GZIP_BUDGET)}); inspect shell imports`)
assert.ok(bootstrapTotal.raw <= BOOTSTRAP_RAW_BUDGET,
  `bootstrap grew to ${display(bootstrapTotal.raw)} (budget ${display(BOOTSTRAP_RAW_BUDGET)}); inspect eager imports`)
assert.ok(bootstrapTotal.gzip <= BOOTSTRAP_GZIP_BUDGET,
  `bootstrap gzip grew to ${display(bootstrapTotal.gzip)} (budget ${display(BOOTSTRAP_GZIP_BUDGET)}); inspect eager imports`)

const oversizedBootstrap = bootstrap.filter((file) => file.raw > BOOTSTRAP_CHUNK_RAW_BUDGET)
assert.deepEqual(oversizedBootstrap, [],
  `oversized bootstrap chunks: ${oversizedBootstrap.map((file) => `${file.name} ${display(file.raw)}`).join(', ')}`)

const oversizedLazy = lazy.filter((file) => file.raw > LAZY_CHUNK_RAW_BUDGET)
assert.deepEqual(oversizedLazy, [],
  `oversized lazy chunks: ${oversizedLazy.map((file) => `${file.name} ${display(file.raw)}`).join(', ')}`)

const oversizedAudio = audioFiles.filter((file) => file.raw > AUDIO_FILE_BUDGET)
assert.deepEqual(oversizedAudio, [],
  `oversized pronunciation clips: ${oversizedAudio.map((file) => `${file.name} ${display(file.raw)}`).join(', ')}`)
assert.ok(audioTotal <= AUDIO_TOTAL_BUDGET,
  `pronunciation archive grew to ${display(audioTotal)} (budget ${display(AUDIO_TOTAL_BUDGET)})`)
assert.ok(!/<(?:audio|link)[^>]+audio\//i.test(html),
  'index.html must not eagerly load the on-demand pronunciation archive')

const readingChunks = lazy.filter((file) => file.name.startsWith('reviewedReadings-'))
assert.equal(readingChunks.length, 1,
  'the reviewed English corpus must remain one identifiable deferred chunk')
assert.ok(readingChunks[0].raw <= READING_CHUNK_RAW_BUDGET,
  `reviewed-reading chunk grew to ${display(readingChunks[0].raw)} (budget ${display(READING_CHUNK_RAW_BUDGET)})`)
assert.ok(readingChunks[0].gzip <= READING_CHUNK_GZIP_BUDGET,
  `reviewed-reading gzip grew to ${display(readingChunks[0].gzip)} (budget ${display(READING_CHUNK_GZIP_BUDGET)})`)

const worldMapChunk = chunkNamed('WorldMapView')
assert.ok(worldMapChunk.raw <= 220 * KiB,
  `shared player map grew to ${display(worldMapChunk.raw)}; inspect research/debug imports`)
for (const prefix of ['AtlasView', 'MiniMap']) {
  const viewChunk = chunkNamed(prefix)
  const closure = staticClosureOf(viewChunk.name)
  const forbidden = [...closure].filter((name) =>
    name.startsWith('DebugView-') || taleNames.some((tale) => name.startsWith(`${tale}-`)))
  assert.deepEqual(forbidden, [],
    `${prefix} transitively loads debug/source-witness chunks: ${forbidden.join(', ')}`)
}

// `import.meta.glob` should keep each tale witness independently demand-loaded.
// A collapsed source archive is a regression even if the entry still happens to
// fit its current budget.
const missingTaleChunks = taleNames.filter((tale) =>
  !lazy.some((file) => file.name.startsWith(`${tale}-`)))
assert.deepEqual(missingTaleChunks, [],
  `tale witnesses missing independent chunks: ${missingTaleChunks.join(', ')}`)

console.log('=== Aventura Shqip — production bundle ===')
console.log(`shell:       ${entryName} — ${display(entry.raw)} raw / ${display(entry.gzip)} gzip`)
console.log(`bootstrap:   ${bootstrap.length} cacheable chunks — ${display(bootstrapTotal.raw)} raw / ${display(bootstrapTotal.gzip)} gzip total`)
console.log(`lazy chunks: ${lazy.length}; largest ${lazy[0]?.name || 'none'} ${lazy[0] ? display(lazy[0].raw) : ''}`)
console.log(`readings:    ${readingChunks[0].name} — ${display(readingChunks[0].raw)} raw / ${display(readingChunks[0].gzip)} gzip (deferred)`)
console.log(`player map:  ${worldMapChunk.name} — ${display(worldMapChunk.raw)} raw; no debug/source-witness dependencies`)
console.log(`tale chunks: ${taleNames.length} independently demand-loaded witnesses`)
console.log(`audio:       ${audioFiles.length} on-demand clips — ${display(audioTotal)} total; none loaded by index.html`)
console.log('✅ first-play bundle stays inside the release budget')
