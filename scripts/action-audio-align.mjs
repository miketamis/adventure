// Generate exact word-boundary metadata for the continuous MP3 used by every
// accepted action. Azure supplies word boundaries for a newly synthesized
// reference; a waveform correlation then maps those boundaries onto the
// already committed MP3. The manifest records that MP3's hash, so an audio
// change cannot silently leave stale karaoke timing behind.
import { createHash } from 'node:crypto'
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import sdk from 'microsoft-cognitiveservices-speech-sdk'
import { audioSlug } from '../src/game/audio.js'
import {
  actionTranscriptWords,
  collectAcceptedActionSurfaces,
} from './lib/action-audio-surfaces.mjs'

const ROOT = resolve(import.meta.dirname, '..')
const AUDIO_DIR = resolve(ROOT, 'public/audio')
const OUTPUT = resolve(AUDIO_DIR, 'action-timings.json')
const CONCURRENCY = Math.max(1, Number(process.env.ACTION_ALIGN_CONCURRENCY) || 8)
const ONLY = process.argv.find((value) => value.startsWith('--surface='))?.slice(10) || null
const ALIGNMENT_METHOD = 'azure-word-boundary-correlated-to-stored-mp3'

function loadEnv() {
  const result = {}
  for (const line of readFileSync(resolve(ROOT, '.env'), 'utf8').split('\n')) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (match) result[match[1]] = match[2].trim()
  }
  return result
}

const env = loadEnv()
const key = env.AZURE_TTS_KEY1 || env.AZURE_TTS_KEY2
const region = (env.AZURE_TTS_ENDPOINT || '').replace(/^https?:\/\//, '').split('.')[0]
if (!key || !region) throw new Error('Azure Speech credentials are required to align action audio.')

function synthReference(transcript) {
  return new Promise((resolvePromise, rejectPromise) => {
    const config = sdk.SpeechConfig.fromSubscription(key, region)
    config.speechSynthesisVoiceName = 'sq-AL-AnilaNeural'
    config.speechSynthesisOutputFormat = sdk.SpeechSynthesisOutputFormat.Audio24Khz48KBitRateMonoMp3
    const synthesizer = new sdk.SpeechSynthesizer(config)
    const boundaries = []
    synthesizer.wordBoundary = (_sender, event) => {
      if (String(event.boundaryType) !== 'WordBoundary') return
      boundaries.push({
        charStart: Number(event.textOffset),
        charLength: Number(event.wordLength),
        referenceStartMs: Number(event.audioOffset) / 10_000,
        durationMs: Number(event.duration) / 10_000,
        serviceText: String(event.text || ''),
      })
    }
    synthesizer.speakTextAsync(transcript, (result) => {
      synthesizer.close()
      if (result.reason !== sdk.ResultReason.SynthesizingAudioCompleted) {
        rejectPromise(new Error(`Speech synthesis did not complete: ${result.errorDetails || result.reason}`))
        return
      }
      resolvePromise({ audio: Buffer.from(result.audioData), boundaries })
    }, (error) => {
      synthesizer.close()
      rejectPromise(error instanceof Error ? error : new Error(String(error)))
    })
  })
}

function alignReference(storedPath, referenceAudio, scratchPath) {
  writeFileSync(scratchPath, referenceAudio)
  const result = spawnSync('python3', [
    resolve(ROOT, 'scripts/action_audio_waveform_align.py'),
    storedPath,
    scratchPath,
  ], { encoding: 'utf8', maxBuffer: 1024 * 1024 })
  if (result.status !== 0) throw new Error(result.stderr.trim() || 'Waveform alignment failed.')
  return JSON.parse(result.stdout)
}

const exactVowels = (value) => [...value.toLocaleLowerCase('sq')]
  .filter((letter) => 'aeëiouy'.includes(letter)).length

function wordUnits(transcript, boundaries, alignment) {
  const expected = actionTranscriptWords(transcript)
  if (boundaries.length !== expected.length) {
    throw new Error(`Speech service returned ${boundaries.length} words for ${expected.length}-word transcript.`)
  }
  return boundaries.map((boundary, index) => {
    // Azure occasionally includes adjacent terminal punctuation in
    // `wordLength`; the exact transcript token is the authority for the
    // visible interval while the service offset remains the timing anchor.
    const expectedText = expected[index]
    const text = transcript.slice(boundary.charStart, boundary.charStart + expectedText.length)
    if (text.toLocaleLowerCase('sq') !== expected[index].toLocaleLowerCase('sq')) {
      throw new Error(`Boundary ${index + 1} names “${text}”, expected “${expected[index]}”.`)
    }
    const startMs = Math.max(0, boundary.referenceStartMs + alignment.offsetMs)
    const endMs = Math.min(
      alignment.storedDurationMs,
      Math.max(startMs + 1, startMs + boundary.durationMs),
    )
    const unit = {
      text,
      charStart: boundary.charStart,
      charEnd: boundary.charStart + expectedText.length,
      startMs: Math.round(startMs * 10) / 10,
      endMs: Math.round(endMs * 10) / 10,
      confidence: alignment.correlation,
    }
    // A word containing exactly one written vowel has one timing interval that
    // is also a defensible single-syllable interval. Multi-syllable boundaries
    // are deliberately omitted: the service does not emit Albanian phonemes,
    // and proportional/equal splitting would only look precise.
    unit.syllables = exactVowels(text) === 1
      ? [{ text, startMs: unit.startMs, endMs: unit.endMs, confidence: alignment.correlation }]
      : []
    unit.syllableTiming = unit.syllables.length ? 'word-boundary-is-single-syllable' : 'unavailable'
    return unit
  })
}

async function retry(task, attempts = 4) {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await task()
    } catch (error) {
      lastError = error
      if (attempt < attempts) await new Promise((resolvePromise) => setTimeout(resolvePromise, 500 * attempt))
    }
  }
  throw lastError
}

async function main() {
  const previous = existsSync(OUTPUT) ? JSON.parse(readFileSync(OUTPUT, 'utf8')) : { entries: {} }
  const surfaces = collectAcceptedActionSurfaces().filter((surface) => !ONLY || surface === ONLY)
  if (ONLY && surfaces.length !== 1) throw new Error(`Unknown accepted action surface: ${ONLY}`)
  const scratch = mkdtempSync(join(tmpdir(), 'language-adventure-action-align-'))
  const entries = { ...(previous.entries || {}) }
  let next = 0
  let complete = 0
  const failures = []

  const worker = async () => {
    for (;;) {
      const index = next++
      if (index >= surfaces.length) return
      const transcript = surfaces[index]
      const slug = audioSlug(transcript)
      const storedPath = resolve(AUDIO_DIR, `${slug}.mp3`)
      if (!existsSync(storedPath)) throw new Error(`${transcript}: missing continuous action MP3.`)
      try {
        const stored = readFileSync(storedPath)
        const storedHash = createHash('sha256').update(stored).digest('hex')
        if (
          entries[slug]?.transcript === transcript &&
          entries[slug]?.audioSha256 === storedHash &&
          previous.method === ALIGNMENT_METHOD
        ) {
          complete++
          continue
        }
        const reference = await retry(() => synthReference(transcript))
        const alignment = alignReference(
          storedPath,
          reference.audio,
          resolve(scratch, `${index}.mp3`),
        )
        if (alignment.correlation < 0.96) {
          throw new Error(`correlation ${alignment.correlation} is below the 0.96 release floor`)
        }
        entries[slug] = {
          transcript,
          audioSha256: storedHash,
          storedDurationMs: alignment.storedDurationMs,
          referenceDurationMs: alignment.referenceDurationMs,
          alignmentOffsetMs: alignment.offsetMs,
          alignmentCorrelation: alignment.correlation,
          words: wordUnits(transcript, reference.boundaries, alignment),
        }
        complete++
        if (complete % 25 === 0 || complete === surfaces.length) {
          console.log(`Aligned ${complete}/${surfaces.length} accepted actions.`)
        }
      } catch (error) {
        failures.push(`${transcript}: ${error.message}`)
        console.error(`Alignment failed (${failures.length}): ${transcript}`)
      }
    }
  }

  try {
    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, surfaces.length) }, worker))
    const validSlugs = new Set(collectAcceptedActionSurfaces().map(audioSlug))
    const currentEntries = Object.fromEntries(
      Object.entries(entries).filter(([slug]) => validSlugs.has(slug)),
    )
    writeFileSync(OUTPUT, `${JSON.stringify({
      version: 1,
      method: ALIGNMENT_METHOD,
      entries: currentEntries,
    })}\n`)
    if (failures.length) {
      throw new Error(`${failures.length} action alignments failed:\n${failures.join('\n')}`)
    }
  } finally {
    rmSync(scratch, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
