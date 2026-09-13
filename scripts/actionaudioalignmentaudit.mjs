import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { audioSlug } from '../src/game/audio.js'
import {
  actionTranscriptWords,
  collectAcceptedActionSurfaces,
} from './lib/action-audio-surfaces.mjs'

const ROOT = resolve(import.meta.dirname, '..')
const manifest = JSON.parse(readFileSync(resolve(ROOT, 'public/audio/action-timings.json'), 'utf8'))
const surfaces = collectAcceptedActionSurfaces()

assert.equal(manifest.version, 1)
assert.equal(manifest.method, 'azure-word-boundary-correlated-to-stored-mp3')

for (const transcript of surfaces) {
  const slug = audioSlug(transcript)
  const audioPath = resolve(ROOT, `public/audio/${slug}.mp3`)
  const entry = manifest.entries?.[slug]
  assert.ok(entry, `${transcript}: accepted action has no timing metadata`)
  assert.ok(existsSync(audioPath), `${transcript}: accepted action has no continuous MP3`)
  assert.equal(
    createHash('sha256').update(readFileSync(audioPath)).digest('hex'),
    entry.audioSha256,
    `${transcript}: timing was not aligned against the exact deployed MP3`,
  )
  assert.equal(entry.method, manifest.method)
  assert.ok(entry.alignmentCorrelation >= 0.96, `${transcript}: weak waveform alignment`)
  assert.ok(Number.isFinite(entry.alignmentOffsetMs), `${transcript}: missing measured timing offset`)
  assert.ok(entry.storedDurationMs > 0, `${transcript}: invalid stored duration`)

  const expectedWords = actionTranscriptWords(transcript)
  assert.equal(entry.words.length, expectedWords.length, `${transcript}: word boundary count drifted`)
  let previousStart = -1
  for (const [index, word] of entry.words.entries()) {
    assert.equal(word.text.toLocaleLowerCase('sq'), expectedWords[index].toLocaleLowerCase('sq'))
    assert.equal(transcript.slice(word.charStart, word.charEnd), word.text)
    assert.ok(word.startMs >= previousStart, `${transcript}: word boundaries are not monotonic`)
    assert.ok(word.endMs > word.startMs, `${transcript}: zero-length word boundary`)
    assert.ok(word.endMs <= entry.storedDurationMs, `${transcript}: word exceeds MP3 duration`)
    assert.ok(word.confidence >= 0.96, `${transcript}: word has weak timing confidence`)
    assert.ok(['word-boundary-is-single-syllable', 'unavailable'].includes(word.syllableTiming))
    if (word.syllableTiming === 'unavailable') {
      assert.deepEqual(word.syllables, [], `${transcript}: unreliable syllables were manufactured`)
    } else {
      assert.equal(word.syllables.length, 1)
      assert.equal(word.syllables[0].startMs, word.startMs)
      assert.equal(word.syllables[0].endMs, word.endMs)
    }
    previousStart = word.startMs
  }
}

assert.equal(
  Object.keys(manifest.entries).length,
  new Set(surfaces.map(audioSlug)).size,
  'timing manifest contains stale or non-action entries',
)

const component = readFileSync(resolve(ROOT, 'src/components/ActionKaraoke.jsx'), 'utf8')
assert.match(component, /actionAudioTiming\(action\.al\)/)
assert.match(component, /clock\?\.currentTimeMs/)
assert.match(component, /word\.startMs/)
assert.match(component, /word\.endMs/)
assert.doesNotMatch(component, /--karaoke-progress|boundedProgress/,
  'runtime fell back to an unaligned whole-line sweep')

console.log(`✓ ${surfaces.length} accepted actions use hash-bound, waveform-correlated word timing; unreliable syllable splits are omitted.`)
