#!/usr/bin/env node
// Reproducible provenance ledger for held-out listening assets. The assigned
// voice comes from the task registry; the hash pins the actual MP3 bytes. This
// cannot acoustically prove which voice is inside a file, so voice changes must
// always regenerate through tts-download.mjs before writing the manifest.

import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { audioSlug } from '../src/game/audio.js'
import { CEFR_ACOUSTIC_BREADTH } from '../src/game/cefrExternalValidation.js'
import { CEFR_TASKS } from '../src/game/cefrTasks.js'

const ROOT = resolve(new URL('..', import.meta.url).pathname)
const MANIFEST_PATH = resolve(ROOT, 'docs/validation/cefr-listening-audio-manifest.json')
const WRITE = process.argv.includes('--write')

const listeningTasks = CEFR_TASKS.filter(({ mode, stimulus }) =>
  mode === 'listening' && stimulus?.kind === 'continuous-audio')

const entries = listeningTasks.map((task) => {
  const slug = audioSlug(task.stimulus.scriptSq)
  const relativePath = `public/audio/${slug}.mp3`
  const path = resolve(ROOT, relativePath)
  assert.ok(existsSync(path), `${task.id} has no audio asset at ${relativePath}`)
  const bytes = readFileSync(path)
  return {
    taskId: task.id,
    locale: task.voice.locale,
    speakerIdentityId: task.voice.speakerIdentityId,
    acousticVoiceId: task.voice.acousticVoiceId,
    scriptSlug: slug,
    relativePath,
    bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex'),
  }
})

const expected = {
  schemaVersion: 1,
  generator: 'scripts/cefr-listening-manifest.mjs',
  synthesisPipeline: 'scripts/tts-download.mjs --force-cefr',
  provider: CEFR_ACOUSTIC_BREADTH.provider,
  locale: CEFR_ACOUSTIC_BREADTH.locale,
  reproducibleVoiceIds: CEFR_ACOUSTIC_BREADTH.reproducibleVoiceIds,
  evidenceBoundary: 'This ledger pins task assignment and bytes; it does not replace listening checks or human comprehensibility review.',
  entries,
}

if (WRITE) {
  mkdirSync(dirname(MANIFEST_PATH), { recursive: true })
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(expected, null, 2)}\n`)
  console.log(`Wrote ${entries.length} listening assets to ${MANIFEST_PATH}`)
} else {
  assert.ok(existsSync(MANIFEST_PATH), 'listening manifest is missing; run with --write after verified synthesis')
  const actual = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
  assert.deepEqual(actual, expected, 'held-out listening task assignments or MP3 bytes drifted from the manifest')
  console.log(`✓ ${entries.length} held-out listening assets match their voice-assignment and SHA-256 manifest`)
}
