// Pronunciation coverage is part of the player-facing language contract.
// Every Albanian surface that can render a pronunciation control must resolve
// to a non-empty MP3 in the production public directory.
import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { DICT, STORY } from '../src/game/content.js'
import { audioSlug } from '../src/game/audio.js'
import { EVERYDAY_PHRASE_DRILLS } from '../src/game/everydayAlbanian.js'
import { collectAudioSurfaces } from './lib/audio-surfaces.mjs'

const AUDIO_DIR = resolve('public/audio')
const surfaces = collectAudioSurfaces(DICT, STORY, EVERYDAY_PHRASE_DRILLS)
const byFile = new Map()

for (const surface of surfaces) {
  const file = `${audioSlug(surface)}.mp3`
  const group = byFile.get(file) || []
  group.push(surface)
  byFile.set(file, group)
}

const files = new Set(readdirSync(AUDIO_DIR).filter((name) => name.endsWith('.mp3')))
const missing = [...byFile.keys()].filter((file) => !files.has(file))
const collisions = [...byFile.entries()].filter(([, group]) =>
  new Set(group.map((surface) => surface.toLocaleLowerCase('sq'))).size > 1)
const malformed = []

for (const file of byFile.keys()) {
  if (!files.has(file)) continue
  const bytes = readFileSync(resolve(AUDIO_DIR, file))
  const hasId3 = bytes.subarray(0, 3).toString('ascii') === 'ID3'
  const hasMpegFrame = bytes.length >= 2 && bytes[0] === 0xff && (bytes[1] & 0xe0) === 0xe0
  if (bytes.length < 2048 || (!hasId3 && !hasMpegFrame)) malformed.push(file)
}

const stale = [...files].filter((file) => !byFile.has(file)).sort()
assert.deepEqual(collisions, [],
  `distinct pronunciation surfaces share a filename: ${collisions.map(([file, group]) => `${file}: ${group.join(' / ')}`).join(', ')}`)
assert.deepEqual(missing, [],
  `missing pronunciation clips:\n${missing.map((file) => `  ${file}: ${byFile.get(file).join(' / ')}`).join('\n')}`)
assert.deepEqual(malformed, [], `malformed pronunciation clips: ${malformed.join(', ')}`)
assert.deepEqual(stale, [], `unreferenced pronunciation clips: ${stale.join(', ')}`)

console.log('=== Aventura Shqip — pronunciation audio ===')
console.log(`${surfaces.length} authored surfaces · ${byFile.size} case-folded clips · 0 collisions · 0 missing · 0 malformed · 0 stale`)
console.log('✅ every playable Albanian surface has pronunciation audio')
